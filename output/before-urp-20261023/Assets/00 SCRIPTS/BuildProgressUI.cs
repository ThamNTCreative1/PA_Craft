using UnityEngine;
using UnityEngine.UI;

/// <summary>Minimal on-screen progress and control hints for the prototype.</summary>
public class BuildProgressUI : MonoBehaviour
{
    private GameController controller;
    [SerializeField] private Font font;
    private Text label;
    public Font ControlFont => font;
    private int lastBuilt = -1;

    public void Initialize(GameController gameController)
    {
        controller = gameController;
        var canvasObject = new GameObject("Build Progress Canvas", typeof(RectTransform), typeof(Canvas), typeof(CanvasScaler));
        canvasObject.transform.SetParent(transform, false);
        canvasObject.GetComponent<Canvas>().renderMode = RenderMode.ScreenSpaceOverlay;
        var scaler = canvasObject.GetComponent<CanvasScaler>();
        scaler.uiScaleMode = CanvasScaler.ScaleMode.ScaleWithScreenSize;
        scaler.referenceResolution = new Vector2(720, 1280);
        var panel = new GameObject("Progress", typeof(RectTransform), typeof(Image));
        panel.transform.SetParent(canvasObject.transform, false);
        var rect = panel.GetComponent<RectTransform>();
        rect.anchorMin = rect.anchorMax = new Vector2(.5f, 1);
        rect.pivot = new Vector2(.5f, 1); rect.anchoredPosition = new Vector2(0, -20);
        rect.sizeDelta = new Vector2(650, 100);
        panel.GetComponent<Image>().color = new Color(0, 0, 0, .55f);
        panel.GetComponent<Image>().raycastTarget = false;
        var textObject = new GameObject("Label", typeof(RectTransform), typeof(Text));
        textObject.transform.SetParent(panel.transform, false);
        var textRect = textObject.GetComponent<RectTransform>();
        textRect.anchorMin = Vector2.zero; textRect.anchorMax = Vector2.one;
        textRect.offsetMin = new Vector2(12, 8); textRect.offsetMax = new Vector2(-12, -8);
        label = textObject.GetComponent<Text>();
#if !UNITY_LUNA
        if (font == null) font = Resources.GetBuiltinResource<Font>("LegacyRuntime.ttf");
#endif
        label.font = font; label.fontSize = 24; label.alignment = TextAnchor.MiddleCenter;
        label.color = Color.white; label.raycastTarget = false;
    }

    private void Update()
    {
        if (controller == null || label == null || controller.TotalBlocks == 0 || lastBuilt == controller.BuiltBlocks) return;
        lastBuilt = controller.BuiltBlocks;
        label.text = controller.IsComplete ? "Building complete!" :
            $"{controller.CurrentPartName}   {controller.BuiltBlocks}/{controller.TotalBlocks}\nJoystick: move   Drag: look   Tap: build";
    }
}
