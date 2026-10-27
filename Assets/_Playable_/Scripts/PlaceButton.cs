using UnityEngine;
using UnityEngine.UI;

// Nút PLACE bên phải: mờ khi chưa chọn block, hiện icon block khi đã chọn, viền xanh khi nhắm được chỗ đặt.
public class PlaceButton : MonoBehaviour
{
    public BlockPlacer placer;
    public Image ring;
    public Image icon;
    public Button button;
    public Color disabledColor = new Color(0.25f, 0.25f, 0.25f, 0.45f);
    public Color readyColor = new Color(1f, 0.82f, 0.9f, 1f);
    public Color validColor = new Color(0.45f, 1f, 0.45f, 1f);
    float punch;

    void Awake() { button.onClick.AddListener(OnPress); }

    void OnPress()
    {
        if (placer.PlaceAtTarget()) punch = 0.15f;
        else if (!placer.HasSelection) placer.hotbar.Nudge();
    }

    void Update()
    {
        bool sel = placer.HasSelection;
        icon.enabled = sel;
        if (sel && placer.Selected != null) icon.sprite = placer.Selected.icon;
        ring.color = !sel ? disabledColor : (placer.CanPlace ? validColor : readyColor);
        float s = 1f;
        if (punch > 0f) { punch -= Time.deltaTime; s = 1f - 0.12f * Mathf.Sin(punch / 0.15f * Mathf.PI); }
        transform.localScale = Vector3.one * s;
    }
}
