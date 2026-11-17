using UnityEngine;

namespace Playable.CartRescue
{
    /// <summary>
    /// Co giãn đều một khối UI có kích thước thiết kế cố định để vừa trong phần (tỉ lệ) của khung cha — dùng cho bảng
    /// chọn map 2x2: cùng một bố cục, tự to nhỏ đúng ở cả màn dọc lẫn ngang.
    /// </summary>
    [ExecuteAlways, DisallowMultipleComponent, RequireComponent(typeof(RectTransform))]
    public sealed class FitInParent : MonoBehaviour
    {
        [SerializeField] private Vector2 _designSize = new Vector2(1100f, 720f);
        [SerializeField] private Vector2 _fill = new Vector2(0.94f, 0.8f);
        [SerializeField] private float _maxScale = 1.4f;

        private RectTransform _rect;
        private Vector2 _lastParent;

        private void OnEnable() => Apply();

        private void LateUpdate()
        {
            var parent = transform.parent as RectTransform;
            if (parent != null && parent.rect.size != _lastParent) Apply();
        }

        private void Apply()
        {
            if (_rect == null) _rect = (RectTransform)transform;
            var parent = transform.parent as RectTransform;
            if (parent == null) return;
            _lastParent = parent.rect.size;
            _rect.sizeDelta = _designSize;
            float s = Mathf.Min(_lastParent.x * _fill.x / _designSize.x, _lastParent.y * _fill.y / _designSize.y);
            _rect.localScale = Vector3.one * Mathf.Min(_maxScale, s);
        }
    }
}
