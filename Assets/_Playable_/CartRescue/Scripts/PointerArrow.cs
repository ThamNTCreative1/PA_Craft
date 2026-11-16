using System;
using UnityEngine;

namespace Playable.CartRescue
{
    /// <summary>
    /// Mũi tên UI chỉ từ dòng chữ hướng dẫn vào một điểm world (nhân vật treo dưới drone): luôn nằm ngay trước điểm đó
    /// trên đường nối chữ → điểm, xoay mũi theo hướng đó và nhấp tới lui. Ảnh mũi tên gốc chỉ sang phải.
    /// </summary>
    [DisallowMultipleComponent]
    public sealed class PointerArrow : MonoBehaviour
    {
        [SerializeField] private RectTransform _arrow;
        [SerializeField] private CanvasGroup _group;
        [SerializeField] private RectTransform _from;
        [SerializeField] private RectTransform _canvasRect;
        [SerializeField] private Camera _worldCamera;
        [SerializeField] private float _gap = 150f;
        [SerializeField] private float _travel = 35f;
        [SerializeField] private float _rate = 6f;

        private Func<Vector3> _target;
        private float _t;

        private void Awake() => Hide();

        public void Show(Func<Vector3> worldTarget)
        {
            _target = worldTarget;
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
            Vector2 targetScreen = _worldCamera.WorldToScreenPoint(_target());
            RectTransformUtility.ScreenPointToLocalPointInRectangle(_canvasRect, targetScreen, null, out Vector2 to);
            Vector2 fromScreen = RectTransformUtility.WorldToScreenPoint(null, _from.position);
            RectTransformUtility.ScreenPointToLocalPointInRectangle(_canvasRect, fromScreen, null, out Vector2 from);
            Vector2 dir = to - from;
            if (dir.sqrMagnitude < 1f) dir = Vector2.down;
            dir.Normalize();
            float bob = (Mathf.Sin(_t * _rate) * 0.5f + 0.5f) * _travel;
            _arrow.anchoredPosition = to - dir * (_gap - bob);
            _arrow.localRotation = Quaternion.Euler(0f, 0f, Mathf.Atan2(dir.y, dir.x) * Mathf.Rad2Deg);
            _group.alpha = Mathf.Clamp01(_t / 0.25f) * (_from.gameObject.activeInHierarchy ? 1f : 0f);
        }
    }
}
