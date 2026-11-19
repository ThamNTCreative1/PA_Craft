using UnityEngine;

namespace Playable
{
    /// <summary>
    /// Keeps the RectTransform at its design size and scales it down uniformly (never up) so the whole design
    /// fits inside the parent rect, e.g. the missions popup on very wide/short screens such as 20:9 landscape.
    /// </summary>
    [ExecuteAlways]
    [RequireComponent(typeof(RectTransform))]
    public sealed class UIFitScaler : MonoBehaviour
    {
        [SerializeField] private Vector2 _designSize = new Vector2(1240f, 1120f);

        private RectTransform _rect;
        private Vector2 _lastParentSize;

        private void OnEnable()
        {
            _rect = (RectTransform)transform;
            _lastParentSize = Vector2.zero;
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
            if (parent == null || _designSize.x <= 0f || _designSize.y <= 0f) return;
            Vector2 parentSize = parent.rect.size;
            if (parentSize == _lastParentSize) return;
            _lastParentSize = parentSize;

            _rect.anchorMin = _rect.anchorMax = new Vector2(0.5f, 0.5f);
            _rect.pivot = new Vector2(0.5f, 0.5f);
            _rect.sizeDelta = _designSize;
            _rect.anchoredPosition = Vector2.zero;
            float scale = Mathf.Min(1f, Mathf.Min(parentSize.x / _designSize.x, parentSize.y / _designSize.y));
            _rect.localScale = new Vector3(scale, scale, 1f);
        }
    }
}
