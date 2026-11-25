using UnityEngine;
using UnityEngine.UI;

namespace CEBB.Playable
{
    // Luna drops UnityEngine.UI.Outline in the build, so the outline is drawn with real
    // Graphic copies placed behind the source (siblings with a lower index).
    // Text: 4 diagonal copies like Unity's Outline. Image: one solid rect grown by `distance` (a stroke).
    [DisallowMultipleComponent]
    public sealed class RocketOutline : MonoBehaviour
    {
        public Color color = new Color(0f, 0f, 0f, 0.5f);
        public float distance = 2f;

        private Graphic source;
        private Text sourceText;
        private Graphic[] copies;
        private string lastText;

        private void Awake() { Build(); }

        private void Build()
        {
            if (copies != null) return;
            source = GetComponent<Graphic>();
            if (source == null || transform.parent == null) return;
            sourceText = source as Text;
            int count = sourceText != null ? 4 : 1;
            copies = new Graphic[count];
            int index = transform.GetSiblingIndex();
            for (int i = 0; i < count; i++)
            {
                GameObject go = new GameObject(name + " outline " + i);
                go.layer = gameObject.layer;
                RectTransform rt = go.AddComponent<RectTransform>();
                rt.SetParent(transform.parent, false);
                rt.SetSiblingIndex(index);
                index++;
                if (sourceText != null)
                {
                    Text t = go.AddComponent<Text>();
                    copies[i] = t;
                }
                else
                {
                    Image img = go.AddComponent<Image>();
                    Image src = source as Image;
                    if (src != null && src.type == Image.Type.Sliced && src.sprite != null) { img.sprite = src.sprite; img.type = Image.Type.Sliced; }
                    copies[i] = img;
                }
                copies[i].raycastTarget = false;
            }
            lastText = null;
            Sync();
        }

        private void OnEnable() { Build(); SetCopiesActive(true); Sync(); }
        private void OnDisable() { SetCopiesActive(false); }
        private void OnDestroy()
        {
            if (copies == null) return;
            for (int i = 0; i < copies.Length; i++) if (copies[i] != null) Destroy(copies[i].gameObject);
        }

        private void SetCopiesActive(bool on)
        {
            if (copies == null) return;
            for (int i = 0; i < copies.Length; i++) if (copies[i] != null && copies[i].gameObject.activeSelf != on) copies[i].gameObject.SetActive(on);
        }

        private void LateUpdate() { Sync(); }

        private void Sync()
        {
            if (copies == null || source == null) return;
            RectTransform s = source.rectTransform;
            Color c = color;
            c.a = color.a * source.color.a;
            bool show = source.enabled;
            for (int i = 0; i < copies.Length; i++)
            {
                Graphic g = copies[i];
                if (g == null) continue;
                RectTransform r = g.rectTransform;
                r.anchorMin = s.anchorMin;
                r.anchorMax = s.anchorMax;
                r.pivot = s.pivot;
                r.localScale = s.localScale;
                r.localRotation = s.localRotation;
                if (sourceText != null)
                {
                    float dx = (i == 0 || i == 2) ? distance : -distance;
                    float dy = (i < 2) ? distance : -distance;
                    r.offsetMin = s.offsetMin + new Vector2(dx, dy);
                    r.offsetMax = s.offsetMax + new Vector2(dx, dy);
                }
                else
                {
                    r.offsetMin = s.offsetMin - new Vector2(distance, distance);
                    r.offsetMax = s.offsetMax + new Vector2(distance, distance);
                }
                if (g.color != c) g.color = c;
                if (g.enabled != show) g.enabled = show;
            }
            if (sourceText != null) SyncText();
        }

        private void SyncText()
        {
            Text s = sourceText;
            for (int i = 0; i < copies.Length; i++)
            {
                Text t = copies[i] as Text;
                if (t == null) continue;
                if (t.font != s.font) t.font = s.font;
                if (t.fontSize != s.fontSize) t.fontSize = s.fontSize;
                if (t.fontStyle != s.fontStyle) t.fontStyle = s.fontStyle;
                if (t.resizeTextForBestFit != s.resizeTextForBestFit) t.resizeTextForBestFit = s.resizeTextForBestFit;
                if (t.resizeTextMinSize != s.resizeTextMinSize) t.resizeTextMinSize = s.resizeTextMinSize;
                if (t.resizeTextMaxSize != s.resizeTextMaxSize) t.resizeTextMaxSize = s.resizeTextMaxSize;
                if (t.alignment != s.alignment) t.alignment = s.alignment;
                if (t.horizontalOverflow != s.horizontalOverflow) t.horizontalOverflow = s.horizontalOverflow;
                if (t.verticalOverflow != s.verticalOverflow) t.verticalOverflow = s.verticalOverflow;
                if (t.supportRichText != s.supportRichText) t.supportRichText = s.supportRichText;
            }
            if (lastText == s.text) return;
            lastText = s.text;
            for (int i = 0; i < copies.Length; i++)
            {
                Text t = copies[i] as Text;
                if (t != null) t.text = lastText;
            }
        }
    }
}
