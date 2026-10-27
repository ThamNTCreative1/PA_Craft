using UnityEngine;
using UnityEngine.UI;

// Thanh túi đồ kiểu Minecraft + tên block hiện lên khi chọn.
public class HotbarUI : MonoBehaviour
{
    public Image[] slotIcons;
    public Button[] slotButtons;
    public RectTransform selectFrame;
    public Text itemName;
    public float nameShowTime = 1.6f;

    BlockPlacer placer;
    float nameT, nudgeT;

    public RectTransform Slot(int i) { return slotButtons[i].transform as RectTransform; }

    public void Setup(BlockDef[] defs, BlockPlacer p)
    {
        placer = p;
        for (int i = 0; i < slotIcons.Length; i++)
        {
            bool on = defs != null && i < defs.Length;
            slotIcons[i].enabled = on;
            if (on) { slotIcons[i].sprite = defs[i].icon; slotIcons[i].preserveAspect = true; }
            int idx = i;
            slotButtons[i].onClick.RemoveAllListeners();
            slotButtons[i].onClick.AddListener(() => placer.Select(idx));
        }
        selectFrame.gameObject.SetActive(false);
        if (itemName != null) itemName.gameObject.SetActive(false);
    }

    public void SetSelected(int i)
    {
        selectFrame.gameObject.SetActive(true);
        selectFrame.anchoredPosition = Slot(i).anchoredPosition;
        var d = placer.Selected;
        if (itemName != null && d != null)
        {
            itemName.text = string.IsNullOrEmpty(d.displayName) ? d.name.Replace('_', ' ') : d.displayName;
            itemName.gameObject.SetActive(true); nameT = nameShowTime;
        }
    }

    public void Nudge() { nudgeT = 0.4f; }

    void Update()
    {
        if (itemName != null && nameT > 0f)
        {
            nameT -= Time.deltaTime;
            var c = itemName.color; c.a = Mathf.Clamp01(nameT / 0.4f); itemName.color = c;
            if (nameT <= 0f) itemName.gameObject.SetActive(false);
        }
        if (nudgeT > 0f)
        {
            nudgeT -= Time.deltaTime;
            float s = 1f + Mathf.Sin(nudgeT * 40f) * 0.05f;
            transform.localScale = new Vector3(s, s, 1f);
            if (nudgeT <= 0f) transform.localScale = Vector3.one;
        }
    }
}
