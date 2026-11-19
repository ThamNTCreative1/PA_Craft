using UnityEngine;

namespace Playable
{
    /// <summary>
    /// Keeps the RectTransform at its authored size (e.g. 1920x1080) and scales it uniformly so it always covers
    /// the parent rect, in portrait and landscape. Overflow is cropped by the screen; the center stays centered.
    /// </summary>
    [ExecuteAlways]
    [RequireComponent(typeof(RectTransform))]
    public sealed class UICoverScaler : MonoBehaviour
    {
        [SerializeField] private Vector2 _size = new Vector2(1920f, 1080f);

        private RectTransform _rect;
        private Vector2 _lastParentSize;

        private void OnEnable()
        {
            _rect = (RectTransform)transform;
            Apply();
        }

        private void Update()
        {
            Apply();
        }

        private void Apply()
        {
            if (_rect == null) _rect = (RectTransform)transform;
            RectTransform parent = _rect.parent as RectTransform;
            if (parent == null || _size.x <= 0f || _size.y <= 0f) return;
            Vector2 parentSize = parent.rect.size;
            if (parentSize == _lastParentSize && _rect.sizeDelta == _size) return;
            _lastParentSize = parentSize;

            _rect.anchorMin = _rect.anchorMax = new Vector2(0.5f, 0.5f);
            _rect.pivot = new Vector2(0.5f, 0.5f);
            _rect.sizeDelta = _size;
            _rect.anchoredPosition = Vector2.zero;
            float scale = Mathf.Max(parentSize.x / _size.x, parentSize.y / _size.y);
            _rect.localScale = new Vector3(scale, scale, 1f);
        }
    }
}
