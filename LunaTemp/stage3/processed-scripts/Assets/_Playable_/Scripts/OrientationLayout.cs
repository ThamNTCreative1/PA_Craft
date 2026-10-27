using UnityEngine;

// Đổi vị trí UI theo màn hình dọc / ngang.
public class OrientationLayout : MonoBehaviour
{
    [System.Serializable]
    public class Entry
    {
        public RectTransform target;
        public Vector2 portraitPos;
        public Vector2 landscapePos;
        public float portraitScale = 1f;
        public float landscapeScale = 1f;
    }
    public Entry[] entries;
    int lastW, lastH;

    void OnEnable() { Apply(); }

    void Update() { if (Screen.width != lastW || Screen.height != lastH) Apply(); }

    void Apply()
    {
        lastW = Screen.width; lastH = Screen.height;
        bool land = Screen.width > Screen.height;
        if (entries == null) return;
        for (int i = 0; i < entries.Length; i++)
        {
            var e = entries[i]; if (e.target == null) continue;
            e.target.anchoredPosition = land ? e.landscapePos : e.portraitPos;
            e.target.localScale = Vector3.one * (land ? e.landscapeScale : e.portraitScale);
        }
    }
}
