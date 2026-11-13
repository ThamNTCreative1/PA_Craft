using UnityEngine;
using UnityEngine.UI;

namespace CEBB.Playable
{
    // Ordinary Text graphics are exported by Luna; UI mesh-effect Outline is not.
    // The four border graphics are authored in the scene, so no runtime cloning is needed.
    [ExecuteAlways]
    [DefaultExecutionOrder(200)]
    public sealed class LunaTextOutline : MonoBehaviour
    {
        public Text source;
        public Text[] borders;
        public Color effectColor = new Color(0, 0, 0, .9f);
        public Vector2 effectDistance = new Vector2(2, -2);
        public bool useGraphicAlpha = true;

        private void OnEnable() { Sync(); }
        private void LateUpdate() { Sync(); }
        public void Refresh() { Sync(); }
        private void OnDisable()
        {
            if (borders == null) return;
            for (int i = 0; i < borders.Length; i++)
                if (borders[i] != null) borders[i].gameObject.SetActive(false);
        }

        private void Sync()
        {
            if (source == null || borders == null) return;
            RectTransform rect = source.rectTransform;
            Color color = effectColor;
            if (useGraphicAlpha) color.a *= source.color.a;
            bool visible = source.enabled && source.gameObject.activeInHierarchy;
            for (int i = 0; i < borders.Length; i++)
            {
                Text border = borders[i];
                if (border == null) continue;
                border.gameObject.SetActive(visible);
                if (!visible) continue;
                border.text = source.text;
                border.font = source.font;
                border.fontStyle = source.fontStyle;
                border.fontSize = source.fontSize;
                border.alignment = source.alignment;
                border.supportRichText = source.supportRichText;
                border.resizeTextForBestFit = source.resizeTextForBestFit;
                border.resizeTextMinSize = source.resizeTextMinSize;
                border.resizeTextMaxSize = source.resizeTextMaxSize;
                border.horizontalOverflow = source.horizontalOverflow;
                border.verticalOverflow = source.verticalOverflow;
                border.color = color;
                border.raycastTarget = false;
                RectTransform target = border.rectTransform;
                target.anchorMin = rect.anchorMin;
                target.anchorMax = rect.anchorMax;
                target.pivot = rect.pivot;
                target.sizeDelta = rect.sizeDelta;
                target.localRotation = rect.localRotation;
                target.localScale = rect.localScale;
                Vector3 offset = new Vector3((i < 2 ? 1 : -1) * effectDistance.x,
                    (i % 2 == 0 ? 1 : -1) * effectDistance.y, 0);
                target.anchoredPosition3D = rect.anchoredPosition3D + offset;
            }
        }
    }
}
