using System;
using System.IO;
using System.Linq;
using System.Reflection;
using Playable;
using UnityEditor;
using UnityEngine;
using UnityEngine.EventSystems;
using UnityEngine.UI;
using Object = UnityEngine.Object;

// Scene integration checks: real player physics, UI events, elapsed time, tutorial order and spawned prefabs.
public static class EggRaisingPlayCheck
{
    const BindingFlags Fields = BindingFlags.Instance | BindingFlags.NonPublic;
    static EggRaisingController game;
    static Button action;
    static UltimateJoystick joystick;
    static HandTutorial tutorial;
    static int stage, choice;
    static float started, stageTime;
    static bool screenshotTaken;
    static string prefix;
    public static string Result { get; private set; }
    static T Get<T>(object o, string field) => (T)o.GetType().GetField(field, Fields).GetValue(o);
    static void Check(bool value, string message) { if (!value) throw new Exception(message); }
    static void Axis(float value) => typeof(UltimateJoystick).GetField("<VerticalAxis>k__BackingField", Fields).SetValue(joystick, value);
    static void SideAxis(float value) => typeof(UltimateJoystick).GetField("<HorizontalAxis>k__BackingField", Fields).SetValue(joystick, value);
    static void Capture(string suffix) => ScreenCapture.CaptureScreenshot(prefix + "-" + suffix + ".png");

    public static void Resolution(int width, int height)
    {
        var asm = typeof(Editor).Assembly;
        var type = asm.GetType("UnityEditor.GameViewSizes");
        var singleton = typeof(ScriptableSingleton<>).MakeGenericType(type);
        var sizes = singleton.GetProperty("instance").GetValue(null, null);
        var group = type.GetMethod("GetGroup").Invoke(sizes, new object[] { 0 });
        var sizeType = asm.GetType("UnityEditor.GameViewSize");
        var enumType = asm.GetType("UnityEditor.GameViewSizeType");
        var size = Activator.CreateInstance(sizeType, new object[] { Enum.ToObject(enumType, 1), width, height, "Egg " + width + "x" + height });
        group.GetType().GetMethod("AddCustomSize").Invoke(group, new[] { size });
        int count = (int)group.GetType().GetMethod("GetTotalCount").Invoke(group, null);
        var view = EditorWindow.GetWindow(asm.GetType("UnityEditor.GameView"));
        view.GetType().GetProperty("selectedSizeIndex", Fields | BindingFlags.Public).SetValue(view, count - 1, null);
    }

    public static void Run(int index)
    {
        Check(EditorApplication.isPlaying, "Enter Play mode first.");
        game = Object.FindFirstObjectByType<EggRaisingController>();
        Check(game.State == EggRaisingController.Phase.Selecting, "A fresh scene is required.");
        choice = index;
        action = Get<Button>(game, "_action");
        tutorial = Get<HandTutorial>(game, "_tutorial");
        joystick = Object.FindFirstObjectByType<UltimateJoystick>();
        Directory.CreateDirectory("Temp/EggRaisingChecks");
        prefix = "Temp/EggRaisingChecks/" + Screen.width + "x" + Screen.height + "-egg" + choice;
        Check(!Get<PlayerController>(game, "_player").IsWorking, "Selection must block movement.");
        Check(!Get<RectTransform>(tutorial, "_infinityGraphic").gameObject.activeSelf, "Movement hint hidden before selection.");
        Check(Object.FindObjectsByType<PenWanderer>(FindObjectsSortMode.None).Length == 2, "Exactly two initial residents.");
        Capture("selection");
        started = Time.time; stageTime = started; stage = 0; Result = "Running egg " + choice;
        EditorApplication.update -= Tick; EditorApplication.update += Tick;
    }

    static void Tick()
    {
        try
        {
            if (!EditorApplication.isPlaying || game == null) throw new Exception("Play mode interrupted.");
            Check(Time.time - started < 20, "Gameplay timed out, including entrance traversal.");
            float elapsed = Time.time - stageTime;
            if (stage == 0 && elapsed > .3f)
            {
                var panel = Get<GameObject>(game, "_selection").GetComponent<EggSelectionPanel>();
                Get<Button[]>(panel, "_cards")[choice].onClick.Invoke();
                Check(game.State == EggRaisingController.Phase.Carrying, "Selection should enter Carrying.");
                Check(!action.gameObject.activeSelf, "Hatch hidden outside pen.");
                Check(Get<RectTransform>(tutorial, "_infinityGraphic").gameObject.activeSelf, "Camera tutorial appears first.");
                var touch = Object.FindFirstObjectByType<TouchController>();
                var e = new PointerEventData(EventSystem.current) { pointerId = -1, position = new Vector2(1500, 500) };
                touch.OnPointerDown(e); e.position += new Vector2(0, 3); touch.OnDrag(e); touch.OnPointerUp(e);
                Check(Get<RectTransform>(tutorial, "_joystickHint").gameObject.activeSelf, "Camera drag must reveal joystick tutorial.");
                Axis(1); stage = 1;
            }
            else if (stage == 1 && action.gameObject.activeSelf)
            {
                Axis(0);
                Check(!Get<RectTransform>(tutorial, "_joystickHint").gameObject.activeSelf, "Joystick movement dismisses its hint.");
                Capture("hatch");
                stageTime = Time.time; stage = 2;
            }
            else if (stage == 2 && elapsed > .35f)
            {
                action.onClick.Invoke();
                Check(game.State == EggRaisingController.Phase.Incubating && !action.interactable, "Hatch locks Open.");
                action.onClick.Invoke();
                Check(game.State == EggRaisingController.Phase.Incubating, "Early Open must be ignored.");
                Check(Get<PlayerController>(game, "_player").IsWorking, "Player stays mobile after Hatch.");
                SideAxis(1);
                stageTime = Time.time; screenshotTaken = false; stage = 3;
            }
            else if (stage == 3)
            {
                if (elapsed > .35f) SideAxis(0);
                if (elapsed > .6f) Check(!action.gameObject.activeSelf, "Open hides after walking away from egg.");
                if (elapsed < 2.9f) Check(!action.interactable && game.State == EggRaisingController.Phase.Incubating, "Open unlocked early.");
                if (!screenshotTaken && elapsed > 1.5f) { Capture("countdown"); screenshotTaken = true; }
                if (game.State == EggRaisingController.Phase.Ready)
                {
                    Check(elapsed >= 2.95f, "Incubation shorter than 3 seconds.");
                    Check(action.interactable && !action.gameObject.activeSelf, "Ready Open stays hidden while away.");
                    game.Act();
                    Check(game.State == EggRaisingController.Phase.Ready, "Distant Open must be rejected.");
                    var player = Get<PlayerController>(game, "_player");
                    var position = Get<Transform>(game, "_nest").position + Vector3.forward * 3f;
                    position.y = player.transform.position.y;
                    player.GetComponent<Rigidbody>().position = position;
                    player.transform.position = position;
                    stageTime = Time.time; stage = 6;
                }
            }
            else if (stage == 6 && elapsed > .2f)
            {
                Check(action.gameObject.activeSelf && Get<RectTransform>(tutorial, "_stealHand").gameObject.activeSelf, "Returning to egg restores Open and hand.");
                Capture("open-ready"); stageTime = Time.time; stage = 4;
            }
            else if (stage == 4 && elapsed > .35f)
            {
                action.onClick.Invoke(); action.onClick.Invoke();
                Check(game.State == EggRaisingController.Phase.Revealing, "Open enters reveal.");
                var monsters = Object.FindObjectsByType<PenWanderer>(FindObjectsSortMode.None);
                Check(monsters.Length == 3, "Exactly one hatchling, including repeated clicks.");
                string expected = Get<PenWanderer[]>(game, "_hatchlings")[choice].name;
                Check(monsters.Any(x => x.name == expected + "(Clone)"), "Correct selected monster must hatch.");
                stageTime = Time.time; screenshotTaken = false; stage = 5;
            }
            else if (stage == 5)
            {
                var cta = Get<FailPanel>(game, "_cta");
                if (elapsed < 2.9f) Check(!cta.gameObject.activeSelf, "CTA must wait 3 seconds.");
                if (!screenshotTaken && elapsed > 1) { Capture("hatched"); screenshotTaken = true; }
                if (game.State == EggRaisingController.Phase.Complete)
                {
                    Check(elapsed >= 2.95f && cta.gameObject.activeSelf, "CTA appears after reveal.");
                    Check(!Get<PlayerController>(game, "_player").IsWorking, "CTA blocks movement.");
                    Capture("cta");
                    Result = "PASS egg " + choice + " at " + Screen.width + "x" + Screen.height + ": selection, tutorial, entrance, mobile incubation, proximity Open, correct hatchling, 3s CTA.";
                    File.AppendAllText("Temp/EggRaisingChecks/results.txt", Result + Environment.NewLine);
                    EditorApplication.update -= Tick; Debug.Log(Result);
                }
            }
        }
        catch (Exception error)
        {
            if (joystick != null) { Axis(0); SideAxis(0); }
            Result = "FAIL: " + error.Message; EditorApplication.update -= Tick;
            File.AppendAllText("Temp/EggRaisingChecks/results.txt", Result + Environment.NewLine);
            Debug.LogError(Result);
        }
    }
}
