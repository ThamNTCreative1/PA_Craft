using UnityEngine;

namespace Playable
{
    /// <summary>Positions gameplay headings; action buttons retain their authored layout.</summary>
    public sealed class StealHatchLayout : MonoBehaviour
    {
        [SerializeField] private RectTransform _title, _run;
        private Vector2 _lastSize;
        private void OnEnable() { _lastSize = Vector2.zero; }
        private void LateUpdate()
        {
            Vector2 size = ((RectTransform)transform).rect.size;
            if (size == _lastSize) return;
            _lastSize = size;
            bool landscape = size.x > size.y;
            Place(_title, new Vector2(.5f, .89f), new Vector2(landscape ? 630 : 760, 135));
            Place(_run, new Vector2(.5f, .89f), new Vector2(landscape ? 550 : 680, 135));
        }
        private static void Place(RectTransform rect, Vector2 anchor, Vector2 size)
        {
            if (rect == null) return;
            rect.anchorMin = rect.anchorMax = anchor;
            rect.pivot = new Vector2(.5f, .5f);
            rect.anchoredPosition = Vector2.zero;
            rect.sizeDelta = size;
            rect.localScale = Vector3.one;
        }
    }
}
