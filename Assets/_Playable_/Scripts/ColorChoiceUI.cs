using System;
using UnityEngine;
using UnityEngine.UI;

// Màn chọn màu: tiêu đề 1 dòng viết hoa, 2 card.
// Tay di chuyển lần lượt tới từng card; card nào đang được tay chỉ mới phóng to (nhấn nhấn).
public class ColorChoiceUI : MonoBehaviour
{
    public Text title;
    public Image titleBackdrop;
    public Button pinkCard;
    public Button blueCard;
    public RectTransform hand;
    public int titleMaxFontSize = 64;
    public float moveTime = 0.45f;   // thời gian tay di chuyển giữa 2 card
    public float pointTime = 0.9f;   // thời gian tay dừng trên mỗi card
    public event Action<bool> OnChosen; // true = hồng

    bool done; float t;
    Transform chosen, other;

    void Awake()
    {
        pinkCard.onClick.AddListener(() => Choose(true));
        blueCard.onClick.AddListener(() => Choose(false));
    }

    public void Show()
    {
        gameObject.SetActive(true);
        done = false; t = 0f;
        string s = PlayableConfig.I != null ? PlayableConfig.I.chooseText : title.text;
        title.text = s;
        FitOneLine();
        pinkCard.transform.localScale = Vector3.zero;
        blueCard.transform.localScale = Vector3.zero;
        title.transform.localScale = Vector3.zero;
        hand.gameObject.SetActive(false);
    }

    // Fit using the actual font metrics, including after an orientation change.
    void FitOneLine()
    {
        title.horizontalOverflow = HorizontalWrapMode.Overflow;
        var parent = title.transform.parent as RectTransform;
        float w = (parent != null ? parent.rect.width : 1080f) - 140f; // chừa lề 2 bên + viền chữ
        title.fontSize = titleMaxFontSize;
        float preferred = title.preferredWidth;
        if (preferred > w) title.fontSize = Mathf.Max(20, Mathf.FloorToInt(titleMaxFontSize * w / preferred));
        if (titleBackdrop != null)
        {
            titleBackdrop.rectTransform.anchoredPosition = title.rectTransform.anchoredPosition;
            titleBackdrop.rectTransform.sizeDelta = new Vector2(Mathf.Min(w + 60f, title.preferredWidth + 80f), 116f);
        }
    }

    void OnRectTransformDimensionsChange() { if (title != null) FitOneLine(); }

    void Choose(bool pink)
    {
        if (done) return;
        done = true; t = 0f;
        Sfx.Click();
        chosen = pink ? pinkCard.transform : blueCard.transform;
        other = pink ? blueCard.transform : pinkCard.transform;
        hand.gameObject.SetActive(false);
        if (OnChosen != null) OnChosen(pink);
    }

    static float Back(float x) { x = Mathf.Clamp01(x); float c = 1.7f; return 1f + (c + 1f) * Mathf.Pow(x - 1f, 3) + c * Mathf.Pow(x - 1f, 2); }

    void Update()
    {
        t += Time.deltaTime;
        if (!done)
        {
            title.transform.localScale = Vector3.one * Back(t / 0.35f);
            float pinkIn = Back((t - 0.15f) / 0.35f), blueIn = Back((t - 0.3f) / 0.35f);
            float pinkPulse = 1f, bluePulse = 1f;

            float ht = t - 0.7f;
            if (ht > 0f)
            {
                hand.gameObject.SetActive(true);
                float cycle = 2f * (moveTime + pointTime);
                float c = ht % cycle;
                // 0..point: trên card hồng | ..move: sang xanh | ..point: trên card xanh | ..move: về hồng
                Vector3 a = pinkCard.transform.position, b = blueCard.transform.position;
                float k; bool onPink = false, onBlue = false; float pt = 0f;
                if (c < pointTime) { k = 0f; onPink = true; pt = c; }
                else if (c < pointTime + moveTime) k = Mathf.SmoothStep(0f, 1f, (c - pointTime) / moveTime);
                else if (c < 2f * pointTime + moveTime) { k = 1f; onBlue = true; pt = c - pointTime - moveTime; }
                else k = 1f - Mathf.SmoothStep(0f, 1f, (c - 2f * pointTime - moveTime) / moveTime);

                float u = hand.parent != null ? hand.parent.lossyScale.x : 1f;
                float press = (onPink || onBlue) ? Mathf.Abs(Mathf.Sin(pt / pointTime * Mathf.PI * 2f)) : 0f; // 2 lần nhấn
                hand.position = Vector3.Lerp(a, b, k) + new Vector3(40f, -80f + 14f * (1f - press), 0f) * u;
                hand.localScale = Vector3.one * (1f - 0.08f * press);
                float grow = 1f + 0.1f * Mathf.Sin(Mathf.Clamp01(pt / pointTime) * Mathf.PI);
                if (onPink) pinkPulse = grow;
                if (onBlue) bluePulse = grow;
            }
            else hand.gameObject.SetActive(false);

            pinkCard.transform.localScale = Vector3.one * pinkIn * pinkPulse;
            blueCard.transform.localScale = Vector3.one * blueIn * bluePulse;
        }
        else
        {
            chosen.localScale = Vector3.one * Mathf.Lerp(1.15f, 0f, Mathf.Clamp01((t - 0.35f) / 0.25f));
            other.localScale = Vector3.one * Mathf.Lerp(1f, 0f, Mathf.Clamp01(t / 0.2f));
            title.transform.localScale = Vector3.one * Mathf.Lerp(1f, 0f, Mathf.Clamp01(t / 0.25f));
            if (t > 0.65f) gameObject.SetActive(false);
        }
        if (titleBackdrop != null) titleBackdrop.transform.localScale = title.transform.localScale;
    }
}
