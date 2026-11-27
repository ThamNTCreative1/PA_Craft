using DG.Tweening;
using UnityEngine;
using UnityEngine.UI;

namespace Playable.CutRope
{
    /// <summary>
    /// Luồng chơi "Cut the rope!":
    ///  1. Vật nặng treo trên dây đung đưa, bàn tay hướng dẫn vuốt qua dây.
    ///  2. Người chơi vuốt cắt (hoặc chạm vào) dây → dây đứt, vật rơi.
    ///  3. Vật trúng đầu nhân vật bên dưới → nhân vật ngã lăn ra, choáng.
    ///  4. End card → bấm để mở store. Nút Download luôn mở store.
    /// </summary>
    public sealed class CutRopeController : MonoBehaviour
    {
        private enum State { Waiting, Falling, Landed, Ended }

        [Header("Refs")]
        [SerializeField] private GameManager _gameManager;
        [SerializeField] private CutRopeCamera _camera;
        [SerializeField] private CutRopeHud _hud;
        [SerializeField] private Button _downloadButton;
        [SerializeField] private RopeView _rope;
        [SerializeField] private Transform _ropeTop;
        [SerializeField] private Transform _weight;
        [SerializeField] private Transform _shadow;
        [SerializeField] private Transform _character;
        [SerializeField] private Transform _characterModel;
        [SerializeField] private Animator _characterAnimator;
        // Độ cao đỉnh đầu / tâm đầu theo toạ độ local của _character (chưa nhân scale). Tính sẵn trong Editor
        // (CutRopeSetup) vì Renderer.bounds của SkinnedMeshRenderer trên Luna không đáng tin → trước đây
        // vật bị coi là chạm đầu ngay khi cắt dây.
        [SerializeField] private float _headTopLocal = 1.72f;
        [SerializeField] private float _headCenterLocal = 1.47f;

        [Header("FX")]
        [SerializeField] private GameObject _hitFx;
        [SerializeField] private GameObject _stunFx;
        [SerializeField] private GameObject _dustFx;

        [Header("Audio")]
        [SerializeField] private AudioClip _cutClip;
        [SerializeField] private AudioClip _impactClip;
        [SerializeField] private AudioClip _landClip;
        [SerializeField] private AudioClip _ohNoClip;

        [Header("Text")]
        [LunaPlaygroundField("Title", 1, "Text")] [SerializeField] private string _titleText = "CUT THE ROPE!";
        [LunaPlaygroundField("Title After Cut", 2, "Text")] [SerializeField] private string _afterCutText = "LOOK OUT!";

        [Header("Tuning")]
        [SerializeField] private float _swingAngle = 3.5f;
        [SerializeField] private float _swingSpeed = 1.7f;
        [SerializeField] private float _gravity = 26f;
        [SerializeField] private float _tapRadius = 0.07f;
        [SerializeField] private float _endCardDelay = 2f;

        private State _state = State.Waiting;
        private Vector3 _hangOffset;
        private float _swingClock;
        private float _velocity;
        private float _headTop;
        private bool _hitCharacter;
        private float _startHeight;
        private Vector3 _shadowScale;
        private Material _shadowMaterial;
        private Color _shadowColor;

        private bool _pressing;
        private Vector2 _pressStart;
        private Vector2 _lastPointer;
        private float _pressTravel;

        private void Start()
        {
            _hangOffset = _weight.position - _ropeTop.position;
            _startHeight = _weight.position.y;
            _headTop = _character.TransformPoint(new Vector3(0f, _headTopLocal, 0f)).y;
            // Chặn an toàn: điểm va chạm luôn thấp hơn đáy vật lúc treo, để vật luôn rơi một đoạn.
            _headTop = Mathf.Clamp(_headTop, 0.5f, _startHeight - 0.5f);
            if (_shadow != null)
            {
                _shadowScale = _shadow.localScale;
                Renderer r = _shadow.GetComponent<Renderer>();
                if (r != null)
                {
                    _shadowMaterial = r.material;
                    _shadowColor = _shadowMaterial.color;
                }
            }

            _hud.SetTitle(_titleText);
            if (_downloadButton != null) _downloadButton.onClick.AddListener(OnDownload);
            if (_gameManager != null) _gameManager.GameEnded += OnGameEnded;
        }

        private void OnDestroy()
        {
            if (_downloadButton != null) _downloadButton.onClick.RemoveListener(OnDownload);
            if (_gameManager != null) _gameManager.GameEnded -= OnGameEnded;
            if (_character != null) _character.DOKill();
            if (_characterModel != null) _characterModel.DOKill();
            if (_weight != null) _weight.DOKill();
        }

        private void OnDownload()
        {
            if (_gameManager != null) _gameManager.ShowCTA();
        }

        /// <summary>Hết End Time (Luna) trước khi người chơi cắt → vẫn bật end card.</summary>
        private void OnGameEnded()
        {
            if (_state == State.Ended) return;
            _state = State.Ended;
            _hud.ShowEndCard();
        }

        private void Update()
        {
            switch (_state)
            {
                case State.Waiting:
                    Swing();
                    HandleInput();
                    _hud.UpdateHand(ScreenOf(_rope.PointAt(0.45f)), !_pressing);
                    break;
                case State.Falling:
                    Fall();
                    break;
            }
            UpdateShadow();
        }

        private void Swing()
        {
            _swingClock += Time.deltaTime;
            float angle = Mathf.Sin(_swingClock * _swingSpeed) * _swingAngle;
            Quaternion q = Quaternion.Euler(0f, 0f, angle);
            _weight.position = _ropeTop.position + q * _hangOffset;
            _weight.rotation = q;
        }

        // ------------------------------------------------------------------ input

        private void HandleInput()
        {
            Vector2 pointer = Input.mousePosition;
            if (Input.GetMouseButtonDown(0))
            {
                if (IsOverDownload(pointer)) return;
                _pressing = true;
                _pressStart = _lastPointer = pointer;
                _pressTravel = 0f;
            }

            if (!_pressing) return;

            if (Input.GetMouseButton(0))
            {
                int link = _rope.HitBySwipe(_camera.Camera, _lastPointer, pointer);
                _pressTravel += Vector2.Distance(_lastPointer, pointer);
                _lastPointer = pointer;
                if (link >= 0)
                {
                    CutAt(link);
                    return;
                }
            }

            if (Input.GetMouseButtonUp(0))
            {
                _pressing = false;
                float shortSide = Mathf.Min(Screen.width, Screen.height);
                // Chạm (không vuốt) gần dây cũng tính là cắt — đúng với tut "tap dây".
                if (_pressTravel < shortSide * 0.04f)
                {
                    int link = _rope.HitByTap(_camera.Camera, pointer, shortSide * _tapRadius);
                    if (link >= 0) CutAt(link);
                }
            }
        }

        private bool IsOverDownload(Vector2 pointer)
        {
            if (_downloadButton == null || !_downloadButton.gameObject.activeInHierarchy) return false;
            return RectTransformUtility.RectangleContainsScreenPoint((RectTransform)_downloadButton.transform, pointer, null);
        }

        private Vector2 ScreenOf(Vector3 world)
        {
            Vector3 s = _camera.Camera.WorldToScreenPoint(world);
            return new Vector2(s.x, s.y);
        }

        // ------------------------------------------------------------------ flow

        private void CutAt(int link)
        {
            _pressing = false;
            _rope.Cut(link);
            _hud.UpdateHand(Vector2.zero, false);
            _hud.SetTitle(_afterCutText);
            Play(_cutClip, 1f);
            _velocity = 0f;
            _state = State.Falling;
            // Vật xoay thẳng lại trong lúc rơi.
            _weight.DORotate(Vector3.zero, 0.35f);
        }

        private void Fall()
        {
            _velocity -= _gravity * Time.deltaTime;
            Vector3 p = _weight.position;
            p.y += _velocity * Time.deltaTime;

            if (!_hitCharacter && p.y <= _headTop)
            {
                p.y = _headTop;
                _hitCharacter = true;
                _velocity *= 0.35f;
                HitCharacter();
            }

            if (p.y <= 0f)
            {
                p.y = 0f;
                _weight.position = p;
                Land();
                return;
            }
            _weight.position = p;
        }

        private void HitCharacter()
        {
            Play(_impactClip, 1f);
            Play(_ohNoClip, 0.9f);
            _camera.Shake(0.25f, 0.35f);
            Spawn(_hitFx, new Vector3(_character.position.x, _headTop, _character.position.z - 0.4f), 1.4f);

            if (_characterAnimator != null) _characterAnimator.enabled = false;

            // Bẹp xuống rồi ngã nghiêng sang phải, trượt ra khỏi chỗ vật rơi.
            Sequence s = DOTween.Sequence();
            s.Append(_characterModel.DOScale(new Vector3(1.15f, 0.65f, 1.15f), 0.08f));
            s.Append(_characterModel.DOScale(Vector3.one, 0.25f).SetEase(Ease.OutBack));
            s.Insert(0.05f, _character.DORotate(new Vector3(0f, 0f, -88f), 0.55f).SetEase(Ease.OutBounce));
            s.Insert(0.05f, _character.DOMove(_character.position + new Vector3(0.95f, 0f, 0.1f), 0.45f).SetEase(Ease.OutQuad));
            s.AppendCallback(SpawnStun);
        }

        private void SpawnStun()
        {
            // _character đã nằm nghiêng nên TransformPoint trả đúng vị trí đầu sau khi ngã.
            Vector3 head = _character.TransformPoint(new Vector3(0f, _headCenterLocal, 0f));
            Spawn(_stunFx, head + new Vector3(0.1f, 0.45f, -0.1f), 0f);
        }

        private void Land()
        {
            _state = State.Landed;
            Play(_landClip, 1f);
            _camera.Shake(0.18f, 0.3f);
            Spawn(_dustFx, new Vector3(_weight.position.x, 0.05f, _weight.position.z - 0.3f), 2.5f);
            // Nảy nhẹ rồi nằm yên, hơi lệch cho tự nhiên.
            Sequence s = DOTween.Sequence();
            s.Append(_weight.DOMoveY(0.25f, 0.12f).SetEase(Ease.OutQuad));
            s.Append(_weight.DOMoveY(0f, 0.14f).SetEase(Ease.InQuad));
            s.Join(_weight.DORotate(new Vector3(0f, 8f, 0f), 0.26f));
            DOVirtual.DelayedCall(_endCardDelay, ShowEndCard, false);
        }

        private void ShowEndCard()
        {
            if (_state == State.Ended) return;
            _state = State.Ended;
            _hud.ShowEndCard();
            if (_gameManager != null) _gameManager.EndGame();
        }

        private void UpdateShadow()
        {
            if (_shadow == null) return;
            Vector3 p = _weight.position;
            _shadow.position = new Vector3(p.x, 0.02f, p.z);
            float k = Mathf.Clamp01(p.y / Mathf.Max(0.01f, _startHeight));
            _shadow.localScale = _shadowScale * Mathf.Lerp(1.15f, 0.7f, k);
            if (_shadowMaterial != null)
            {
                Color c = _shadowColor;
                c.a = _shadowColor.a * Mathf.Lerp(1f, 0.45f, k);
                _shadowMaterial.color = c;
            }
        }

        private static void Spawn(GameObject prefab, Vector3 position, float life)
        {
            if (prefab == null) return;
            // Gọi qua Object.* vì hàm static — compiler của Luna không tự hiểu Destroy/Instantiate của MonoBehaviour.
            GameObject go = Object.Instantiate(prefab, position, Quaternion.identity);
            if (life > 0f) Object.Destroy(go, life);
        }

        private static void Play(AudioClip clip, float volume)
        {
            if (clip == null || AudioManager.Instance == null) return;
            AudioManager.Instance.PlayOneShot(clip, volume);
        }
    }
}
