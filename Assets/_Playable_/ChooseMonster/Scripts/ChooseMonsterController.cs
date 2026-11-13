using System.Collections;
using DG.Tweening;
using UnityEngine;
using UnityEngine.UI;

namespace Playable.ChooseMonster
{
    /// <summary>
    /// Luồng playable "Choose Your Monster":
    ///   Chọn (tap 1 trong 2 cổng; con quái đứng sau mặt cổng mờ) → player chạy xuyên cổng vào chỗ con quái
    ///   → "nhập xác" (player biến mất, quái nháy sáng) → quái quay lưng đi tiếp tới trước boss
    ///   → hiện nút "Fight!" (CTA, bấm là mở store).
    /// Boss ẩn trong lúc chọn để người chơi không thấy trước.
    /// </summary>
    [DisallowMultipleComponent]
    public sealed class ChooseMonsterController : MonoBehaviour
    {
        private enum State { Choose, Travel, End }

        private static readonly int SpeedHash = Animator.StringToHash("Speed");

        [SerializeField] private GameManager _gameManager;
        [SerializeField] private ShotCamera _shot;
        [SerializeField] private ChooseAudio _audio;
        [SerializeField] private MonsterGate[] _gates;
        [SerializeField] private Transform _player;
        [SerializeField] private Animator _playerAnimator;
        [SerializeField] private FighterView _boss;
        [SerializeField] private Transform _battleSpot;

        [SerializeField] private RectTransform _title;
        [SerializeField] private ScreenAnchor _hand;
        [SerializeField] private HealthBarView _monsterBar;
        [SerializeField] private ScreenAnchor _monsterBarAnchor;
        [SerializeField] private HealthBarView _bossBar;
        [SerializeField] private ScreenAnchor _bossBarAnchor;
        [SerializeField] private RectTransform _fightButton;
        [SerializeField] private Image _flashOverlay;

        [SerializeField] private float _playerSpeed = 4.2f;
        [SerializeField] private Vector3 _portalSize = new Vector3(2.9f, 5.2f, 0.2f);
        [SerializeField] private float _monsterSpeed = 6.5f;
        // Trục Z của camera lúc gặp boss (camera nhìn ngang dọc trục X nên Z quyết định lệch trái/phải).
        [SerializeField] private float _battleCameraZ = 28f;

        private State _state;
        private float _inputReadyAt;
        private float _handTimer;
        private int _handIndex;
        private Bounds _chooseBounds;
        private Bounds _bossBounds;
        private Sequence _handTween;

        // Lúc chọn: camera thấp, ngay sau lưng player (mặt cổng + khung che boss phía xa).
        private static readonly Vector2 ChoosePortrait = new Vector2(11f, 0f);
        private static readonly Vector2 ChooseLandscape = new Vector2(9f, 0f);
        private static readonly Vector2 BattlePortrait = new Vector2(10f, -90f);
        private static readonly Vector2 BattleLandscape = new Vector2(8f, -90f);
        private static readonly ShotCamera.Margins ChooseMarginsPortrait = new ShotCamera.Margins(0.16f, 0.02f, -0.02f);
        private static readonly ShotCamera.Margins ChooseMarginsLandscape = new ShotCamera.Margins(0.13f, 0.02f, 0.14f);
        private static readonly ShotCamera.Margins BattleMarginsPortrait = new ShotCamera.Margins(0.12f, 0.2f, 0.02f);
        private static readonly ShotCamera.Margins BattleMarginsLandscape = new ShotCamera.Margins(0.14f, 0.24f, 0.08f);

        private void Start()
        {
            _bossBounds = RenderBounds(_boss.gameObject);
            _boss.gameObject.SetActive(false);

            Vector3 playerStart = _player.position;
            // Bounds của SkinnedMeshRenderer rộng hơn người thật nhiều — dùng hộp cố định cho nhân vật.
            _chooseBounds = new Bounds(playerStart + Vector3.up * 0.9f, new Vector3(1f, 1.8f, 1f));
            // Khung sát: chỉ lấy ô cửa cổng + con quái (bỏ phần đá xây trên đỉnh cổng) để camera zoom gần.
            for (int i = 0; i < _gates.Length; i++)
            {
                _chooseBounds.Encapsulate(new Bounds(_gates[i].Portal.SurfacePosition, _portalSize));
                _chooseBounds.Encapsulate(RenderBounds(_gates[i].Monster.gameObject));
            }

            if (_gameManager != null) _gameManager.GameEnded += OnGameEnded;
            if (_flashOverlay != null) _flashOverlay.gameObject.SetActive(false);

            _monsterBarAnchor.Bind(_shot.Camera, null, Vector3.zero);
            _bossBarAnchor.Bind(_shot.Camera, _boss.transform, Vector3.up * (_boss.Height + 0.9f));
            Show(_monsterBar.transform, false);
            Show(_bossBar.transform, false);
            _bossBar.SetInstant(1f);

            // Hết giờ do GameManager lo (field Luna "End Time"): đếm từ Start, hết giờ thì mở store.
            BeginChoose();
        }

        private void OnDestroy()
        {
            if (_gameManager != null) _gameManager.GameEnded -= OnGameEnded;
            _handTween?.Kill();
        }

        // ------------------------------------------------------------------ choose

        private void BeginChoose()
        {
            _state = State.Choose;
            _inputReadyAt = Time.time + 0.6f;
            SetPlayerSpeed(0f);

            for (int i = 0; i < _gates.Length; i++) _gates[i].Portal.Open(0.05f + i * 0.15f);

            PopIn(_title, 0.15f);

            _handIndex = _gates.Length - 1;
            _handTimer = -0.7f;
            Show(_hand.transform, false);

            _shot.SetShot(_chooseBounds, ChoosePortrait, ChooseLandscape, ChooseMarginsPortrait,
                ChooseMarginsLandscape, true);
        }

        private void Update()
        {
            if (_state != State.Choose) return;
            UpdateHand();
            if (Input.GetMouseButtonDown(0) && Time.time >= _inputReadyAt)
            {
                MonsterGate gate = PickGate(Input.mousePosition);
                if (gate != null) StartCoroutine(TravelRoutine(gate));
            }
        }

        private void UpdateHand()
        {
            _handTimer += Time.deltaTime;
            if (_handTimer < 0f) return;
            RectTransform rect = (RectTransform)_hand.transform;
            if (rect.gameObject.activeSelf && _handTimer < 1.6f) return;
            _handTimer = 0f;
            _handIndex = (_handIndex + 1) % _gates.Length;
            MonsterActor monster = _gates[_handIndex].Monster;
            _hand.Bind(_shot.Camera, monster.transform, Vector3.up * monster.Height * 0.45f);
            Show(rect, true);
            _handTween?.Kill();
            _handTween = Press(rect);
        }

        private MonsterGate PickGate(Vector3 screen)
        {
            Camera cam = _shot.Camera;
            MonsterGate best = null;
            float bestDistance = float.MaxValue;
            for (int i = 0; i < _gates.Length; i++)
            {
                Vector3 p = cam.WorldToScreenPoint(_gates[i].Portal.SurfacePosition);
                float d = ((Vector2)p - (Vector2)screen).sqrMagnitude;
                if (d < bestDistance)
                {
                    bestDistance = d;
                    best = _gates[i];
                }
            }
            return best;
        }

        // ------------------------------------------------------------------ travel

        private IEnumerator TravelRoutine(MonsterGate gate)
        {
            _state = State.Travel;
            _audio.Click();
            _handTween?.Kill();
            Show(_hand.transform, false);
            HideScaled(_title);

            // Con quái còn lại đứng yên tại chỗ (giữ nguyên Idle), cổng của nó cũng giữ nguyên.

            // Player chạy xuyên mặt cổng tới đúng chỗ con quái đứng, camera bám sau lưng.
            PortalView portal = gate.Portal;
            MonsterActor monster = gate.Monster;
            float gateZ = portal.SurfacePosition.z;
            _shot.Follow(_player, new Vector3(0f, 2.3f, -4.2f), 1.3f, 3f);
            Vector3 start = _player.position;
            Vector3 target = new Vector3(monster.transform.position.x, start.y, monster.transform.position.z - 0.1f);
            Vector3 dir = target - start;
            dir.y = 0f;
            _player.DORotateQuaternion(Quaternion.LookRotation(dir), 0.2f);
            SetPlayerSpeed(1f);
            _audio.PlayerSteps();
            float duration = dir.magnitude / _playerSpeed;
            float crossAt = Mathf.Clamp01((gateZ - start.z) / Mathf.Max(0.01f, target.z - start.z)) * duration;
            DOVirtual.DelayedCall(crossAt, () =>
            {
                portal.Surge();
                _audio.Portal();
            }, false);
            yield return _player.DOMove(target, duration).SetEase(Ease.Linear).WaitForCompletion();

            // Nhập xác: player biến mất vào trong thân quái, quái nháy sáng.
            _player.gameObject.SetActive(false);
            SetPlayerSpeed(0f);
            _audio.StopSteps();
            monster.Flash();
            FlashScreen();
            _audio.Possess();
            _boss.gameObject.SetActive(true);
            yield return new WaitForSeconds(0.45f);

            // Quái quay lưng lại rồi đi tiếp xuyên ra khỏi cổng.
            monster.FaceTowards(monster.transform.position + Vector3.forward, 0.5f);
            yield return new WaitForSeconds(0.5f);
            monster.SetWalking(true);
            _audio.MonsterSteps();
            _shot.Follow(monster.transform, new Vector3(0f, 3.4f, -6.2f), monster.Height * 0.7f, 4f);

            Vector3 exit = new Vector3(monster.transform.position.x, monster.transform.position.y, gateZ + 5f);
            yield return monster.transform.DOMove(exit, Vector3.Distance(monster.transform.position, exit) / _monsterSpeed)
                .SetEase(Ease.Linear).WaitForCompletion();

            Vector3 spot = _battleSpot.position;
            monster.FaceTowards(spot, 0.3f);
            float walk = Vector3.Distance(exit, spot) / _monsterSpeed;
            Tween approach = monster.transform.DOMove(spot, walk).SetEase(Ease.Linear);

            Bounds battle = _bossBounds;
            battle.Encapsulate(new Bounds(spot + Vector3.up * monster.Height * 0.5f,
                new Vector3(monster.Reach * 2f, monster.Height, monster.Reach * 2f)));
            // Chừa chỗ cho thanh máu trên đầu.
            battle.Encapsulate(new Vector3(battle.center.x, _bossBounds.max.y + 0.8f, battle.center.z));
            yield return new WaitForSeconds(Mathf.Max(0f, walk - 1.4f));
            // Màn dọc hẹp: nhìn ngang cả con boss dài thì mọi thứ quá nhỏ → chỉ khung quái + nửa trước boss
            // (đuôi boss được phép ra khỏi khung).
            Bounds portraitBattle = new Bounds(spot + Vector3.up * monster.Height * 0.5f,
                new Vector3(monster.Reach * 2f, monster.Height, monster.Reach * 2f));
            Vector3 bossFront = new Vector3(_bossBounds.center.x, _bossBounds.center.y, _bossBounds.min.z + _bossBounds.size.z * 0.45f);
            portraitBattle.Encapsulate(new Bounds(bossFront, new Vector3(_bossBounds.size.x, _bossBounds.size.y, _bossBounds.size.z * 0.1f)));
            portraitBattle.Encapsulate(new Vector3(portraitBattle.center.x, _bossBounds.max.y + 0.8f, portraitBattle.center.z));
            _shot.SetShot(portraitBattle, battle, BattlePortrait, BattleLandscape, BattleMarginsPortrait, BattleMarginsLandscape, false);
            _shot.LockZ(_battleCameraZ);
            yield return approach.WaitForCompletion();

            monster.SetWalking(false);
            _audio.StopSteps();
            monster.FaceTowards(_boss.transform.position, 0.3f);
            yield return new WaitForSeconds(0.3f);
            _audio.Roar();
            _shot.Shake(0.25f, 0.4f);

            _monsterBar.Setup(gate.Portrait, string.Empty);
            _monsterBarAnchor.Bind(_shot.Camera, monster.transform, Vector3.up * (monster.Height + 0.7f));
            Show(_monsterBar.transform, true);
            Show(_bossBar.transform, true);
            yield return new WaitForSeconds(0.5f);

            // GameManager.EndGame bật nút Fight (_btnBlock); hiệu ứng nút nằm ở Animator trên nút trong scene.
            if (_gameManager != null) _gameManager.EndGame();
            else
            {
                Show(_fightButton, true);
                OnGameEnded();
            }
        }

        // ------------------------------------------------------------------ end

        private void OnGameEnded()
        {
            _state = State.End;
            _handTween?.Kill();
            Show(_hand.transform, false);
            // Không tự bật nút Fight ở đây: hết End Time thì GameManager mở store luôn (không cần nút).
        }

        // ------------------------------------------------------------------ helpers

        private void SetPlayerSpeed(float speed)
        {
            if (_playerAnimator != null && _playerAnimator.runtimeAnimatorController != null)
                _playerAnimator.SetFloat(SpeedHash, speed);
        }

        private void FlashScreen()
        {
            if (_flashOverlay == null) return;
            _flashOverlay.gameObject.SetActive(true);
            DOVirtual.Float(0.85f, 0f, 0.4f, a => _flashOverlay.color = new Color(1f, 1f, 1f, a))
                .OnComplete(() => _flashOverlay.gameObject.SetActive(false));
        }

        private static Sequence Press(RectTransform rect)
        {
            rect.DOKill();
            rect.localScale = Vector3.one;
            return DOTween.Sequence()
                .Append(rect.DOScale(0.82f, 0.22f).SetEase(Ease.OutQuad))
                .Append(rect.DOScale(1f, 0.3f).SetEase(Ease.OutBack))
                .SetLoops(-1)
                .SetTarget(rect);
        }

        private static void PopIn(RectTransform rect, float delay)
        {
            if (rect == null) return;
            rect.DOKill();
            rect.gameObject.SetActive(true);
            rect.localScale = Vector3.zero;
            rect.DOScale(1f, 0.4f).SetEase(Ease.OutBack).SetDelay(delay);
        }

        /// <summary>Thu nhỏ rồi tắt; huỷ tween pop-in còn treo để nó không bật lại phần tử.</summary>
        private static void HideScaled(RectTransform rect)
        {
            if (rect == null || !rect.gameObject.activeSelf) return;
            rect.DOKill();
            rect.DOScale(0f, 0.2f).SetEase(Ease.InBack).OnComplete(() => rect.gameObject.SetActive(false));
        }

        private static void Show(Transform rect, bool visible)
        {
            if (rect != null) rect.gameObject.SetActive(visible);
        }

        private static Bounds RenderBounds(GameObject root)
        {
            Renderer[] renderers = root.GetComponentsInChildren<Renderer>(false);
            Bounds bounds = new Bounds(root.transform.position, Vector3.zero);
            bool init = false;
            for (int i = 0; i < renderers.Length; i++)
            {
                if (renderers[i] is ParticleSystemRenderer) continue;
                if (!init)
                {
                    bounds = renderers[i].bounds;
                    init = true;
                }
                else bounds.Encapsulate(renderers[i].bounds);
            }
            return bounds;
        }
    }
}
