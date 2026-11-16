using System;
using UnityEngine;

namespace Playable.CartRescue
{
    /// <summary>
    /// Mũi tên UI chỉ hướng kéo (bước cân xe: về phía thấp; bước "kéo xe sang phải"): bám theo một điểm world mỗi frame (xe đang chạy),
    /// trượt qua lại theo hướng chỉ + phập phồng. Canvas Screen Space Overlay.
    /// </summary>
    [DisallowMultipleComponent]
    public sealed class WorldArrow : MonoBehaviour
    {
        [SerializeField] private RectTransform _arrow;
        [SerializeField] private CanvasGroup _group;
        [SerializeField] private RectTransform _canvasRect;
        [SerializeField] private Camera _worldCamera;
        [SerializeField] private float _travel = 60f;
        [SerializeField] private float _rate = 5f;
        [SerializeField] private float _fadeIn = 0.25f;

        private Func<Vector3> _target;
        private Func<float> _direction;
        private float _t;
        private Vector3 _baseScale = Vector3.one;

        private void Awake()
        {
            _baseScale = _arrow.localScale;
            Hide();
        }

        /// <param name="direction">+1 chỉ sang phải, −1 chỉ sang trái; đọc lại mỗi frame (null = luôn sang phải).</param>
        public void Show(Func<Vector3> worldPoint, Func<float> direction = null)
        {
            _target = worldPoint;
            _direction = direction;
            _t = 0f;
        }

        public void Hide()
        {
            _target = null;
            _group.alpha = 0f;
        }

        private void LateUpdate()
        {
            if (_target == null) return;
            _t += Time.deltaTime;
            Vector2 screen = _worldCamera.WorldToScreenPoint(_target());
            RectTransformUtility.ScreenPointToLocalPointInRectangle(_canvasRect, screen, null, out Vector2 pos);
            float dir = _direction != null && _direction() < 0f ? -1f : 1f;
            float wave = Mathf.Sin(_t * _rate);
            _arrow.anchoredPosition = pos + new Vector2(dir * Mathf.Max(0f, wave) * _travel, 0f);
            Vector3 scale = _baseScale * (1f + 0.06f * wave);
            scale.x = Mathf.Abs(scale.x) * dir;
            _arrow.localScale = scale;
            _group.alpha = Mathf.Clamp01(_t / _fadeIn);
        }
    }
}
