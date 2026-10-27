using System.Linq;
using UnityEngine;
using UnityEngine.UI;
using UnityEditor;
using Playable.KeyboardEscape;

public static partial class KeyboardEscapeBuilder
{
    public static void WireControls(EscapeGame game)
    {
        var player = game.player;
        var controls = player.GetComponent<EscapePlayerInput>();
        if (!controls) controls = player.gameObject.AddComponent<EscapePlayerInput>();
        var joystick = new SerializedObject(player.joystick);
        controls.player = player;
        controls.joystickArea = (RectTransform)joystick.FindProperty("background").objectReferenceValue;
        controls.joystickKnob = (RectTransform)joystick.FindProperty("joystickKnob").objectReferenceValue;
        controls.canvas = player.joystick.GetComponentInParent<Canvas>().rootCanvas;
        var jump = game.GetComponentsInChildren<Button>(true).First(b => b.name == "Jump Button");
        controls.jumpArea = (RectTransform)jump.transform;
        jump.onClick = new Button.ButtonClickedEvent();
        player.controls = controls;
        player.joystick.enabled = false;
        var look = game.GetComponentInChildren<EscapeLookInput>(true);
        look.inputBlockers[0] = controls.joystickArea;
        var touch = look.GetComponent<Playable.TouchController>();
        if (!touch) touch = look.gameObject.AddComponent<Playable.TouchController>();
        var touchSettings = new SerializedObject(touch);
        touchSettings.FindProperty("_fillRightHalfOfParent").boolValue = false;
        touchSettings.FindProperty("_normalizeByDeltaTime").boolValue = false;
        touchSettings.ApplyModifiedPropertiesWithoutUndo();
        touch.externalPointerInput = true;
        var lookRect = (RectTransform)look.transform;
        lookRect.anchorMin = Vector2.zero; lookRect.anchorMax = Vector2.one;
        lookRect.offsetMin = lookRect.offsetMax = Vector2.zero;
        look.touchController = touch;
        controls.touchController = touch;
        controls.lookArea = lookRect;
        controls.speedArea = game.GetComponentInChildren<EscapeHUD>().speedFrame;
        EditorUtility.SetDirty(player);
        EditorUtility.SetDirty(controls);
        EditorUtility.SetDirty(jump);
    }
}
