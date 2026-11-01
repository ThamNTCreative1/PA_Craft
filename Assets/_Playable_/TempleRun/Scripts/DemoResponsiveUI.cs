using UnityEngine;

namespace Playable.TempleRun
{
    /// <summary>Fits the demo HUD to the available screen, independently of CanvasScaler.</summary>
    [ExecuteAlways]
    public class DemoResponsiveUI : MonoBehaviour
    {
        public RectTransform canvasRect;
        public RectTransform hotbar;
        public RectTransform title;
        [Tooltip("Stable design dimensions; independent of sprite packing and build texture resolution.")]
        public Vector2 titleDesignSize = new Vector2(2148f, 732.08f);
        [Range(0.1f, 1f)] public float portraitTitleWidth = 0.87f;
        [Range(0.1f, 1f)] public float landscapeTitleWidth = 0.58f;
        private const float TitlePulseMax = 1.08f;
        [Range(0.5f, 1f)] public float portraitHotbarWidth = 0.92f;
        [Range(0.3f, 0.8f)] public float landscapeHotbarWidth = 0.55f;
        private Vector2 _lastSize;
        private Rect _lastSafeArea;
        private Vector2 _lastScreenSize;

        private void OnEnable() { RefreshLayout(); }
        private void LateUpdate()
        {
            if (canvasRect != null && (_lastSize != canvasRect.rect.size || _lastSafeArea != Screen.safeArea ||
                _lastScreenSize != new Vector2(Screen.width, Screen.height)))
                RefreshLayout();
        }

        public void RefreshLayout()
        {
            if (canvasRect == null || Screen.width <= 0 || Screen.height <= 0) return;
            Vector2 size = canvasRect.rect.size;
            if (size.x <= 0 || size.y <= 0) return;
            Rect safe = Screen.safeArea;
            if (safe.width <= 0 || safe.height <= 0) safe = new Rect(0, 0, Screen.width, Screen.height);
            float left = safe.xMin / Screen.width * size.x;
            float bottom = safe.yMin / Screen.height * size.y;
            float width = safe.width / Screen.width * size.x;
            float height = safe.height / Screen.height * size.y;
            float centerX = left + width * 0.5f - size.x * 0.5f;
            bool portrait = size.y >= size.x;
            if (hotbar != null)
            {
                // Authored strip including its shadow is 822 units wide, -58..95 high.
                float scale = Mathf.Min(width * (portrait ? portraitHotbarWidth : landscapeHotbarWidth) / 822f,
                    height * (portrait ? 0.15f : 0.19f) / 153f);
                hotbar.anchorMin = hotbar.anchorMax = new Vector2(0.5f, 0);
                hotbar.pivot = new Vector2(0.5f, 0.5f);
                hotbar.localScale = Vector3.one * scale;
                hotbar.anchoredPosition = new Vector2(centerX, bottom + height * 0.025f + 58f * scale);
            }
            if (title != null)
            {
                // Do not derive UI size from sprite.rect/pixelsPerUnit: exported
                // textures and atlases can have different metadata in Luna.
                Vector2 native = titleDesignSize;
                float maxWidth = width * (portrait ? portraitTitleWidth : landscapeTitleWidth);
                float maxHeight = height * (portrait ? 0.19f : 0.26f);
                float fit = Mathf.Min(1f, Mathf.Min(maxWidth / Mathf.Max(1f, native.x),
                    maxHeight / Mathf.Max(1f, native.y)) / TitlePulseMax);
                float w = native.x * fit;
                float h = native.y * fit;
                // Position, anchors and pivot are authored in the scene/Inspector.
                var parent = title.parent as RectTransform;
                Vector2 stretch = parent != null
                    ? Vector2.Scale(title.anchorMax - title.anchorMin, parent.rect.size) : Vector2.zero;
                title.sizeDelta = new Vector2(w, h) - stretch;
            }
            _lastSize = size;
            _lastSafeArea = Screen.safeArea;
            _lastScreenSize = new Vector2(Screen.width, Screen.height);
        }
    }
}
