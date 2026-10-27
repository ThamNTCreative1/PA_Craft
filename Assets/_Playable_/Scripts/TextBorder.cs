using UnityEngine;
using UnityEngine.UI;

// Viền chữ không dùng Outline/Shadow (Luna bỏ các component đó khi build):
// tạo các bản sao Text màu tối, lệch 8 hướng, nằm phía sau chữ gốc và luôn đồng bộ nội dung.
[RequireComponent(typeof(Text))]
[DisallowMultipleComponent]
public class TextBorder : MonoBehaviour
{
    public Color color = new Color(0.12f, 0.12f, 0.12f, 1f);
    public float size = 4f;
    public bool eightDirections = true;

    Text src;
    Text[] copies;
    Vector2[] offsets;
    RectTransform rt;

    void Awake()
    {
        src = GetComponent<Text>();
        rt = (RectTransform)transform;
        Build();
    }

    void Build()
    {
        if (copies != null) return;
        offsets = eightDirections
            ? new[] { new Vector2(-1, -1), new Vector2(0, -1), new Vector2(1, -1), new Vector2(-1, 0), new Vector2(1, 0), new Vector2(-1, 1), new Vector2(0, 1), new Vector2(1, 1) }
            : new[] { new Vector2(-1, 0), new Vector2(1, 0), new Vector2(0, -1), new Vector2(0, 1) };
        copies = new Text[offsets.Length];
        var parent = transform.parent;
        int idx = transform.GetSiblingIndex();
        for (int i = 0; i < offsets.Length; i++)
        {
            var go = new GameObject(name + "_Border" + i, typeof(RectTransform));
            var crt = (RectTransform)go.transform;
            crt.SetParent(parent, false);
            crt.SetSiblingIndex(idx); // nằm trước chữ gốc => vẽ phía sau
            var t = go.AddComponent<Text>();
            t.raycastTarget = false;
            copies[i] = t;
        }
        Sync();
    }

    void OnEnable() { SetCopiesActive(true); }
    void OnDisable() { SetCopiesActive(false); }
    void OnDestroy()
    {
        if (copies == null) return;
        for (int i = 0; i < copies.Length; i++) if (copies[i] != null) Destroy(copies[i].gameObject);
    }

    void SetCopiesActive(bool on)
    {
        if (copies == null) return;
        for (int i = 0; i < copies.Length; i++) if (copies[i] != null) copies[i].gameObject.SetActive(on);
    }

    void LateUpdate() { Sync(); }

    void Sync()
    {
        if (copies == null || src == null) return;
        Color c = color; c.a *= src.color.a;
        for (int i = 0; i < copies.Length; i++)
        {
            var t = copies[i]; if (t == null) continue;
            var crt = (RectTransform)t.transform;
            crt.anchorMin = rt.anchorMin; crt.anchorMax = rt.anchorMax; crt.pivot = rt.pivot;
            crt.sizeDelta = rt.sizeDelta;
            crt.localScale = rt.localScale;
            crt.localRotation = rt.localRotation;
            crt.anchoredPosition = rt.anchoredPosition + offsets[i] * size * rt.localScale.x;
            if (t.text != src.text) t.text = src.text;
            t.font = src.font; t.fontSize = src.fontSize; t.fontStyle = src.fontStyle;
            t.alignment = src.alignment;
            t.horizontalOverflow = src.horizontalOverflow; t.verticalOverflow = src.verticalOverflow;
            t.resizeTextForBestFit = src.resizeTextForBestFit;
            t.color = c;
        }
    }
}
