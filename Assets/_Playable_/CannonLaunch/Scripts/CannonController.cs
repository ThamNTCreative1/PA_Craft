using DG.Tweening;
using UnityEngine;
using UnityEngine.UI;

namespace Playable.CannonLaunch
{
    /// <summary>
    /// Luồng chơi "Cannon Launch":
    ///  1. Nhân vật nằm trong nòng pháo trên pháo đài. Tay hướng dẫn chỉ nút FIRE!.
    ///  2. FIRE! → pháo nổ, nhân vật bay theo đường vòng cung, lộn vòng, rơi gần → +$135.
    ///  3. Hiện 2 thẻ Upgrade (Power / Income). Mỗi lần nâng cấp (cộng dồn) thì lần bắn sau bay xa hơn.
    ///  4. Đủ _upgradesToWall lần nâng cấp → lần bắn tiếp theo bay trúng tường, tường đổ → end card → CTA.
    /// Nút Download luôn mở store.
    /// </summary>
    public sealed class CannonController : MonoBehaviour
    {
        private enum State { Ready, Flying, Ended }

        private const int Power = 0;
        private const int Income = 1;

        [Header("Refs")]
        [SerializeField] private GameManager _gameManager;
        [SerializeField] private CannonCamera _camera;
        [SerializeField] private CannonHud _hud;
        [SerializeField] private Button _fireButton;
        [SerializeField] private Button[] _cardButtons;
        [SerializeField] private Button _downloadButton;
        [SerializeField] private Transform _barrel;
        [SerializeField] private Transform _muzzle;
        [SerializeField] private Transform _character;
        [SerializeField] private Transform _characterModel;
        [SerializeField] private Animator _characterAnimator;
        [SerializeField] private Transform _flightFocus;
        [SerializeField] private BrickWall _wall;

        [Header("FX")]
        [SerializeField] private GameObject _muzzleFx;
        [SerializeField] private GameObject _landFx;
        [SerializeField] private GameObject _wallHitFx;
        [SerializeField] private GameObject _moneyFx;

        [Header("Audio")]
        [SerializeField] private AudioClip _fireClip;
        [SerializeField] private AudioClip _whooshClip;
        [SerializeField] private AudioClip _landClip;
        [SerializeField] private AudioClip _coinClip;
        [SerializeField] private AudioClip _buyClip;
        [SerializeField] private AudioClip _wallClip;
        [SerializeField] private AudioClip _denyClip;
        [Tooltip("Bắn hụt: nhân vật rơi xuống đất trước khi tới tường.")]
        [SerializeField] private AudioClip _failClip;
        [Tooltip("Tường đổ.")]
        [SerializeField] private AudioClip _collapseClip;

        [Header("Economy")]
        [LunaPlaygroundField("First Reward", 1, "Economy")] [SerializeField] private int _baseReward = 135;
        [SerializeField] private int _rewardPerIncome = 45;
        [SerializeField] private int _rewardPerUpgrade = 25;
        [SerializeField] private int[] _powerCosts = { 35, 90, 150, 220 };
        [SerializeField] private int[] _incomeCosts = { 125, 200, 300, 420 };
        [LunaPlaygroundField("Upgrades To Wall", 2, "Economy")] [SerializeField] private int _upgradesToWall = 3;

        [Header("Flight")]
        [Tooltip("Toạ độ Z điểm rơi theo số lần đã nâng cấp (0, 1, 2...). Đủ _upgradesToWall thì bay vào tường.")]
        [SerializeField] private float[] _landingZ = { 13f, 23f, 34f };
        [SerializeField] private float _characterHalfHeight = 1.16f;
        [SerializeField] private float _lyingHeight = 0.3f;
        [SerializeField] private float _spinSpeed = 600f;
        [SerializeField] private float _endCardDelay = 2.2f;
        [SerializeField] private Vector3 _wallShotOffset = new Vector3(6f, 5.5f, -15f);

        private State _state = State.Ready;
        private int _money;
        private readonly int[] _levels = new int[2];
        private int _upgrades;
        private int _fires;
        private int _boughtThisRound;

        private Vector3 _seatPosition;
        private Quaternion _seatRotation;
        private Vector3 _barrelRest;

        // Đường bay hiện tại.
        private Vector3 _from;
        private Vector3 _to;
        private float _apex;
        private float _duration;
        private float _clock;
        private bool _toWall;
        private float _spinAngle;

        private void Start()
        {
            _seatPosition = _character.position;
            _seatRotation = _character.rotation;
            _barrelRest = _barrel.localPosition;

            _fireButton.onClick.AddListener(OnFire);
            for (int i = 0; i < _cardButtons.Length; i++)
            {
                int index = i;
                _cardButtons[i].onClick.AddListener(() => OnCard(index));
            }
            if (_downloadButton != null) _downloadButton.onClick.AddListener(OnDownload);
            if (_gameManager != null) _gameManager.GameEnded += OnGameEnded;

            _hud.SetMoney(0, false);
            RefreshCards();
            UpdateHand();
        }

        private void OnDestroy()
        {
            if (_gameManager != null) _gameManager.GameEnded -= OnGameEnded;
            if (_character != null) _character.DOKill();
            if (_barrel != null) _barrel.DOKill();
        }

        private void OnDownload()
        {
            if (_gameManager != null) _gameManager.ShowCTA();
        }

        /// <summary>Hết End Time (Luna) → vẫn bật end card.</summary>
        private void OnGameEnded()
        {
            if (_state == State.Ended) return;
            _state = State.Ended;
            _hud.ShowEndCard();
        }

        // ------------------------------------------------------------------ economy

        private int Cost(int kind)
        {
            int[] table = kind == Power ? _powerCosts : _incomeCosts;
            return table[Mathf.Min(_levels[kind], table.Length - 1)];
        }

        private void RefreshCards()
        {
            for (int i = 0; i < 2; i++) _hud.SetCard(i, Cost(i), _money >= Cost(i));
        }

        private void OnCard(int kind)
        {
            if (_state != State.Ready || _fires == 0) return;
            int cost = Cost(kind);
            if (_money < cost)
            {
                _hud.ShakeCard(kind);
                Play(_denyClip, 0.7f);
                return;
            }
            _money -= cost;
            _levels[kind]++;
            _upgrades++;
            _boughtThisRound++;
            _hud.SetMoney(_money, true);
            _hud.PunchCard(kind);
            Play(_buyClip, 0.9f);
            RefreshCards();
            UpdateHand();
        }

        private void UpdateHand()
        {
            if (_state != State.Ready)
            {
                _hud.PointHand(null);
                return;
            }
            // Lần đầu: chỉ FIRE!. Sau đó: chưa mua gì trong lượt mà còn đủ tiền → chỉ thẻ (ưu tiên Power).
            if (_fires > 0 && _boughtThisRound == 0 && _upgrades < _upgradesToWall)
            {
                if (_money >= Cost(Power)) { _hud.PointHand(_hud.Card(Power)); return; }
                if (_money >= Cost(Income)) { _hud.PointHand(_hud.Card(Income)); return; }
            }
            _hud.PointHand(_hud.FireButton);
        }

        // ------------------------------------------------------------------ fire

        private void OnFire()
        {
            if (_state != State.Ready) return;
            _state = State.Flying;
            _fires++;
            _boughtThisRound = 0;
            _hud.PointHand(null);
            _hud.SetFireEnabled(false);
            _hud.SetCardsVisible(false, false);

            Play(_fireClip, 1f);
            Play(_whooshClip, 0.7f);
            _camera.Shake(0.3f, 0.3f);
            Spawn(_muzzleFx, _muzzle.position, _muzzle.rotation, 2f);
            Vector3 back = -_barrel.forward * 0.5f;
            _barrel.DOKill(true);
            _barrel.localPosition = _barrelRest;
            _barrel.DOPunchPosition(back, 0.35f, 4, 0.5f);

            _toWall = _upgrades >= _upgradesToWall;
            _from = _character.position + _character.up * _characterHalfHeight;
            if (_toWall)
            {
                Vector3 front = _wall.FrontCenter;
                _to = new Vector3(front.x, Mathf.Max(1.6f, front.y - 0.6f), front.z - 0.4f);
            }
            else
            {
                int stage = Mathf.Clamp(_upgrades, 0, _landingZ.Length - 1);
                _to = new Vector3(Random.Range(-0.6f, 0.6f), _characterHalfHeight * 0.6f, _landingZ[stage]);
            }
            float distance = Vector3.Distance(_from, _to);
            _duration = 0.85f + distance * 0.028f;
            _apex = 2.5f + distance * 0.16f;
            _clock = 0f;
            _spinAngle = 0f;

            if (_characterAnimator != null) _characterAnimator.enabled = false;
            _flightFocus.position = _from;
            _camera.Follow(_flightFocus);
        }

        private void Update()
        {
            if (_state != State.Flying || _clock < 0f) return;
            _clock += Time.deltaTime;
            float t = Mathf.Clamp01(_clock / _duration);
            Vector3 center = Vector3.Lerp(_from, _to, t) + Vector3.up * (_apex * 4f * t * (1f - t));
            _flightFocus.position = center;

            // Lộn vòng quanh tâm người (gốc nhân vật ở chân).
            _spinAngle += _spinSpeed * Time.deltaTime;
            Quaternion rot = Quaternion.Euler(_spinAngle, 0f, 0f) * Quaternion.Euler(0f, 180f, 0f);
            _character.rotation = rot;
            _character.position = center - rot * (Vector3.up * _characterHalfHeight);

            if (t >= 1f)
            {
                _clock = -1f;
                if (_toWall) HitWall(center);
                else Land(center);
            }
        }

        private void Land(Vector3 center)
        {
            Play(_landClip, 1f);
            Play(_failClip, 0.9f);
            _camera.Shake(0.15f, 0.25f);
            Vector3 ground = new Vector3(center.x, 0.05f, center.z);
            Spawn(_landFx, ground, Quaternion.identity, 2.5f);

            // Nằm ngửa, trượt thêm một đoạn về phía trước.
            Quaternion lying = Quaternion.Euler(-90f, 180f, 0f);
            Vector3 rest = new Vector3(center.x, _lyingHeight, center.z + 1.6f);
            _character.DOKill();
            Sequence s = DOTween.Sequence();
            s.Append(_character.DORotateQuaternion(lying, 0.18f));
            s.Join(_character.DOMove(new Vector3(center.x, _lyingHeight + 0.5f, center.z + 0.6f), 0.18f).SetEase(Ease.OutQuad));
            s.Append(_character.DOMove(rest, 0.45f).SetEase(Ease.OutQuad));
            s.AppendCallback(() => Reward(rest));
            s.AppendInterval(1.1f);
            s.AppendCallback(Reload);
        }

        private void Reward(Vector3 at)
        {
            int reward = _baseReward + _levels[Income] * _rewardPerIncome + _upgrades * _rewardPerUpgrade;
            _money += reward;
            _hud.SetMoney(_money, true);
            _hud.ShowPopup("+$" + reward);
            Spawn(_moneyFx, at + Vector3.up * 0.8f, Quaternion.identity, 2.5f);
            Play(_coinClip, 1f);
        }

        /// <summary>Đưa nhân vật về lại nòng pháo, mở thẻ Upgrade.</summary>
        private void Reload()
        {
            if (_state == State.Ended) return;
            _camera.ReturnHome(true);
            _character.DOKill();
            _character.position = _seatPosition;
            _character.rotation = _seatRotation;
            _characterModel.localScale = Vector3.zero;
            _characterModel.DOScale(1f, 0.35f).SetEase(Ease.OutBack).SetDelay(0.35f);
            if (_characterAnimator != null) _characterAnimator.enabled = true;

            _state = State.Ready;
            _hud.SetFireEnabled(true);
            _hud.SetCardsVisible(true, true);
            RefreshCards();
            UpdateHand();
        }

        private void HitWall(Vector3 center)
        {
            Play(_wallClip, 1f);
            Play(_landClip, 1f);
            Play(_collapseClip, 1f);
            _camera.Shake(0.45f, 0.5f);
            Spawn(_wallHitFx, center, Quaternion.identity, 3f);
            _wall.Collapse(center, 16f);
            // Camera lùi ra xa, nhìn toàn cảnh tường đổ.
            // Camera nhìn vào chỗ nhân vật nằm (bật ngược ~3m) để end card không che nhân vật, vẫn thấy gạch văng phía sau.
            _flightFocus.position = new Vector3(0f, 1.5f, center.z - 6.5f);
            _camera.SetFollowOffset(_wallShotOffset);

            // Nhân vật bật ngược lại rồi nằm ra đất.
            Quaternion lying = Quaternion.Euler(-90f, 180f, 0f);
            Vector3 rest = new Vector3(center.x, _lyingHeight, center.z - 3f);
            _character.DOKill();
            Sequence s = DOTween.Sequence();
            s.Append(_character.DOJump(rest, 1.6f, 1, 0.7f));
            s.Join(_character.DORotateQuaternion(lying, 0.5f));
            DOVirtual.DelayedCall(_endCardDelay, ShowEndCard, false);
        }

        private void ShowEndCard()
        {
            if (_state == State.Ended) return;
            _state = State.Ended;
            _hud.ShowEndCard();
            if (_gameManager != null) _gameManager.EndGame();
        }

        // ------------------------------------------------------------------ helpers

        private static void Spawn(GameObject prefab, Vector3 position, Quaternion rotation, float life)
        {
            if (prefab == null) return;
            // Gọi qua Object.* vì hàm static — compiler của Luna không tự hiểu Destroy/Instantiate của MonoBehaviour.
            GameObject go = Object.Instantiate(prefab, position, rotation);
            if (life > 0f) Object.Destroy(go, life);
        }

        private static void Play(AudioClip clip, float volume)
        {
            if (clip == null || AudioManager.Instance == null) return;
            AudioManager.Instance.PlayOneShot(clip, volume);
        }
    }
}
