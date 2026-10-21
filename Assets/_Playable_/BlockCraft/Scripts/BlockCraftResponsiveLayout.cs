using UnityEngine;

namespace Playable
{
    [ExecuteAlways]
    public class BlockCraftResponsiveLayout : MonoBehaviour
    {
        [SerializeField] private RectTransform _canvas;
        [SerializeField] private RectTransform[] _gameplay;
        [SerializeField] private RectTransform[] _ui;

        private void LateUpdate()
        {
            if (_canvas == null || _gameplay == null || _ui == null) return;
            ApplyLayout(_canvas.rect.size);
        }

        public void ApplyLayout(Vector2 size)
        {
            bool portrait = size.y > size.x;
            float scale = portrait
                ? Mathf.Min(size.x / 1124f, size.y / 2160f)
                : Mathf.Min(size.x / 2048f, size.y / 1080f);
            for (int i = 0; i < _gameplay.Length; i++)
            {
                Place(_gameplay[i], portrait ? new Vector2(-562, 0) : new Vector2(-1024, 540), scale);
                Place(_ui[i], portrait ? new Vector2(-462, 1080) : new Vector2(100, 540), scale);
            }
        }

        private static void Place(RectTransform rect, Vector2 position, float scale)
        {
            rect.anchorMin = rect.anchorMax = new Vector2(0.5f, 0.5f);
            rect.pivot = new Vector2(0, 1);
            rect.anchoredPosition = position * scale;
            rect.localScale = Vector3.one * scale;
        }
    }
}
