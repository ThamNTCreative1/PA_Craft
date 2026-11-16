using System;
using DG.Tweening;
using Playable.CartRescue.Core;
using UnityEngine;
using UnityEngine.UI;

namespace Playable.CartRescue
{
    /// <summary>
    /// Bàn tay hướng dẫn (UI, Canvas Screen Space Overlay). Ba kiểu lặp: kéo từ A tới B, vuốt qua lại quanh một điểm,
    /// chạm vào một nút. Điểm world được đọc lại mỗi frame (theo xe đang chạy). Chạm màn hình thì ẩn ngay, hiện lại sau
    /// 2s không tương tác (IdleHint) và chạy lại từ đầu chu kỳ.
    /// _hand là khung chứa (pivot = đầu ngón tay) gồm ảnh bàn tay + hiệu ứng nhấn (vòng sóng + tia sáng). Hiệu ứng nhấn
    /// chỉ bật cho kiểu kéo có tapEffect (bước kéo nhân vật từ drone): tay nhấn, đứng yên tới khi hiệu ứng xong rồi mới kéo.
    /// </summary>
    [DisallowMultipleComponent]
    public sealed class TutorialHand : MonoBehaviour
    {
        private enum Mode { None, Drag, Swipe, Tap }

        [SerializeField] private RectTransform _hand;
        [SerializeField] private CanvasGroup _group;
        [SerializeField] private RectTransform _canvasRect;
        [SerializeField] private Camera _worldCamera;
        // Kéo: nhấn xuống → (giữ yên trong lúc hiệu ứng tap, nếu bật) → di chuyển → nhả → mờ dần.
        [SerializeField] private float _pressTime = 0.25f;
        [SerializeField] private float _tapHoldTime = 0.5f;
        [SerializeField] private float _moveTime = 0.95f;
        [SerializeField] private float _releaseTime = 0.25f;
        [SerializeField] private float _fadeTime = 0.3f;
        [SerializeField] private float _swipeCycle = 1.2f;
        [SerializeField] private float _idleDelay = 2f;
        [SerializeField] private RectTransform _tapFx;
        [SerializeField] private Image _tapRing;
        [SerializeField] private Image[] _tapRays;

        private Mode _mode;
        private Func<Vector3> _from;
        private Func<Vector3> _to;
        private float _swipeHalfWidth;
        private RectTransform _tapTarget;
        private IdleHint _hint;
        private float _t;
        private bool _wasVisible;
        private Vector3 _baseScale = Vector3.one;
        private int _tappedCycle = -1;
        private bool _dragTap;

        private void Awake()
        {
            _hint = new IdleHint(_idleDelay);
            _baseScale = _hand.localScale;
            Hide();
        }

        /// <param name="tapEffect">Bật hiệu ứng tap lúc nhấn (tay đứng yên tới khi hiệu ứng xong rồi mới kéo).
        /// Chỉ dùng cho bước kéo nhân vật từ drone.</param>
        public void ShowDrag(Func<Vector3> fromWorld, Func<Vector3> toWorld, bool tapEffect = false)
        {
            _mode = Mode.Drag;
            _from = fromWorld;
            _to = toWorld;
            _dragTap = tapEffect;
            Restart();
        }

        public void ShowSwipe(Func<Vector3> centerWorld, float halfWidthWorld)
        {
            _mode = Mode.Swipe;
            _from = centerWorld;
            _swipeHalfWidth = halfWidthWorld;
            Restart();
        }

        public void ShowTap(RectTransform target)
        {
            _mode = Mode.Tap;
            _tapTarget = target;
            Restart();
        }

        public void Hide()
        {
            _mode = Mode.None;
            _group.alpha = 0f;
            HideTapFx();
        }

        /// <summary>Gọi khi người chơi chạm/kéo.</summary>
        public void Touch() => _hint.Touch();

        private void Restart()
        {
            _t = 0f;
            _tappedCycle = -1;
            HideTapFx();
            _hint = new IdleHint(_idleDelay);
        }

        private void Update()
        {
            if (_mode == Mode.None) return;
            _hint.Tick(Time.deltaTime);
            bool visible = _hint.Visible;
            if (visible && !_wasVisible)
            {
                _t = 0f;
                _tappedCycle = -1;
            }
            _wasVisible = visible;
            if (!visible)
            {
                _group.alpha = 0f;
                return;
            }
            _t += Time.deltaTime;

            switch (_mode)
            {
                case Mode.Drag: UpdateDrag(); break;
                case Mode.Swipe: UpdateSwipe(); break;
                case Mode.Tap: UpdateTap(); break;
            }
        }

        private void UpdateDrag()
        {
            float hold = _dragTap ? _tapHoldTime : 0f;
            float tPress = _pressTime, tHold = tPress + hold, tMove = tHold + _moveTime;
            float tRelease = tMove + _releaseTime, cycle = tRelease + _fadeTime;
            float t = _t % cycle;
            if (_dragTap) TapOnce(Mathf.FloorToInt(_t / cycle), t >= tPress);

            Vector2 a = ToCanvas(_from()), b = ToCanvas(_to());
            float alpha = 1f, scale;
            Vector2 pos;
            if (t < tPress)
            {
                pos = a;
                scale = Mathf.Lerp(1.15f, 0.9f, t / tPress);
                alpha = Mathf.Clamp01(t / 0.12f);
            }
            else if (t < tHold)
            {
                pos = a; // đứng yên trong lúc hiệu ứng tap
                scale = 0.9f;
            }
            else if (t < tMove)
            {
                pos = Vector2.Lerp(a, b, Mathf.SmoothStep(0f, 1f, (t - tHold) / _moveTime));
                scale = 0.9f;
            }
            else if (t < tRelease)
            {
                pos = b;
                scale = Mathf.Lerp(0.9f, 1.1f, (t - tMove) / _releaseTime);
            }
            else
            {
                pos = b;
                scale = 1.1f;
                alpha = 1f - (t - tRelease) / _fadeTime;
            }
            Apply(pos, scale, alpha);
        }

        private void UpdateSwipe()
        {
            float u = (_t % _swipeCycle) / _swipeCycle;
            Vector3 c = _from();
            float k = Mathf.Sin(u * Mathf.PI * 2f);
            Vector2 pos = ToCanvas(c + new Vector3(k * _swipeHalfWidth, 0f, 0f));
            Apply(pos, 0.9f, Mathf.Clamp01(_t / 0.15f));
        }

        private void UpdateTap()
        {
            if (_tapTarget == null) return;
            float u = (_t % 0.9f) / 0.9f;
            Vector2 screen = RectTransformUtility.WorldToScreenPoint(null, _tapTarget.position);
            RectTransformUtility.ScreenPointToLocalPointInRectangle(_canvasRect, screen, null, out Vector2 pos);
            float scale = u < 0.3f ? Mathf.Lerp(1.1f, 0.85f, u / 0.3f) : Mathf.Lerp(0.85f, 1.1f, (u - 0.3f) / 0.7f);
            Apply(pos, scale, 1f);
        }

        /// <summary>Bật hiệu ứng nhấn đúng một lần mỗi chu kỳ, lúc tay vừa nhấn xuống.</summary>
        private void TapOnce(int cycle, bool pressed)
        {
            if (!pressed || cycle == _tappedCycle) return;
            _tappedCycle = cycle;
            PlayTapFx();
        }

        private void HideTapFx()
        {
            if (_tapFx != null) _tapFx.gameObject.SetActive(false);
        }

        private void PlayTapFx()
        {
            if (_tapFx == null) return;
            _tapFx.gameObject.SetActive(true);
            if (_tapRing != null)
            {
                RectTransform ring = _tapRing.rectTransform;
                ring.DOKill();
                _tapRing.DOKill();
                ring.localScale = Vector3.one * 0.25f;
                Color c = _tapRing.color;
                c.a = 0.9f;
                _tapRing.color = c;
                ring.DOScale(1.25f, 0.45f).SetEase(Ease.OutCubic);
                _tapRing.DOFade(0f, 0.45f).SetEase(Ease.InQuad);
            }
            if (_tapRays == null) return;
            for (int i = 0; i < _tapRays.Length; i++)
            {
                Image ray = _tapRays[i];
                if (ray == null) continue;
                RectTransform rect = ray.rectTransform;
                rect.DOKill();
                rect.localScale = new Vector3(1f, 0f, 1f);
                DOTween.Sequence()
                    .Append(rect.DOScaleY(1f, 0.12f).SetEase(Ease.OutBack))
                    .AppendInterval(0.12f)
                    .Append(rect.DOScaleY(0f, 0.18f).SetEase(Ease.InQuad))
                    .SetTarget(rect);
            }
        }

        private void Apply(Vector2 canvasPos, float scale, float alpha)
        {
            _hand.anchoredPosition = canvasPos;
            _hand.localScale = _baseScale * scale;
            _group.alpha = alpha;
        }

        private Vector2 ToCanvas(Vector3 world)
        {
            Vector2 screen = _worldCamera.WorldToScreenPoint(world);
            RectTransformUtility.ScreenPointToLocalPointInRectangle(_canvasRect, screen, null, out Vector2 local);
            return local;
        }
    }
}
