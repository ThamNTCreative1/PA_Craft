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

/// <summary>Scene integration checks using the real UI, triggers, player physics and elapsed time.</summary>
public static class StealHatchPlayCheck
{
    const BindingFlags Fields = BindingFlags.Instance | BindingFlags.NonPublic;
    static StealHatchController flow;
    static EggRaisingController raising;
    static PlayerController player;
    static Monster guard;
    static Button action;
    static UltimateJoystick joystick;
    static GameManager manager;
    static Egg[] eggs;
    static int stage;
    static string mode, prefix;
    static float started, stageAt, hatchAt, endAt, returnStart;
    static Vector3 beforeMove;
    static bool captured;
    public static string Result { get; private set; }
    static T Get<T>(object o, string n) => (T)o.GetType().GetField(n, Fields).GetValue(o);
    static void Check(bool condition, string message) { if (!condition) throw new Exception(message); }
    static void Axes(float horizontal, float vertical)
    {
        typeof(UltimateJoystick).GetField("<HorizontalAxis>k__BackingField", Fields).SetValue(joystick, horizontal);
        typeof(UltimateJoystick).GetField("<VerticalAxis>k__BackingField", Fields).SetValue(joystick, vertical);
    }
    static void Teleport(Vector3 position, float yaw)
    {
        var body = player.GetComponent<Rigidbody>(); body.linearVelocity = Vector3.zero;
        body.position = position; body.rotation = Quaternion.Euler(0, yaw, 0);
        player.transform.SetPositionAndRotation(position, body.rotation);
        Get<CameraController>(flow, "_camera").SetTarget(player);
        Physics.SyncTransforms();
    }
    static void Capture(string name) => ScreenCapture.CaptureScreenshot(prefix + "-" + name + ".png");
    static void Stage(int value) { stage = value; stageAt = Time.realtimeSinceStartup; captured = false; }
    public static void Run(string testMode)
    {
        if (!EditorApplication.isPlaying) throw new Exception("Enter Play mode first.");
        EditorApplication.update -= Tick;
        flow = Object.FindFirstObjectByType<StealHatchController>();
        raising = Object.FindFirstObjectByType<EggRaisingController>();
        player = Get<PlayerController>(flow, "_player"); guard = Get<Monster>(flow, "_guard");
        action = Get<Button>(flow, "_action"); joystick = Object.FindFirstObjectByType<UltimateJoystick>();
        manager = GameManager.Instance; eggs = Get<Egg[]>(flow, "_eggs");
        mode = testMode; started = Time.realtimeSinceStartup; stage = 0; stageAt = started;
        // Travel is skipped in these controlled interaction checks. The separate untouched timer case
        // verifies the real 30s deadline; do not let Editor rendering stalls mask interaction failures.
        if (mode != "timer") typeof(GameManager).GetMethod("CancelPendingEnd", Fields).Invoke(manager, null);
        Directory.CreateDirectory("Temp/StealHatch"); prefix = "Temp/StealHatch/" + Screen.width + "x" + Screen.height + "-" + mode;
        Result = "Running " + mode; EditorApplication.update += Tick;
    }
    static void Complete(string details)
    {
        Axes(0, 0);
        Result = "PASS " + Screen.width + "x" + Screen.height + " " + mode + ": " + details;
        File.AppendAllText("Temp/StealHatch/results.txt", Result + Environment.NewLine);
        Debug.Log(Result); EditorApplication.update -= Tick;
    }
    static void Tick()
    {
        try
        {
            Check(EditorApplication.isPlaying && flow != null, "Play mode interrupted.");
            float elapsed = Time.realtimeSinceStartup - stageAt;
            Check(Time.realtimeSinceStartup - started < 35f, "Integration check exceeded 35 seconds.");
            if (mode == "timer")
            {
                if (!captured) { Capture("untouched-start"); captured = true; }
                float timerElapsed = Time.realtimeSinceStartup - Get<float>(manager, "_timerStartedAt");
                if (timerElapsed < 29.8f) Check(!manager.HasEnded, "Timer fired before 30 real seconds.");
                if (manager.HasEnded)
                {
                    Check(timerElapsed >= 29.95f && timerElapsed < 31.5f, "Timeout must be 30 real seconds from entry.");
                    Check(Get<bool>(manager, "_storeOpened"), "Timeout opens the store immediately.");
                    Check(!Get<FailPanel>(manager, "_stealHatchCta").gameObject.activeSelf, "Timeout hides the endcard.");
                    Check(Get<Button>(manager, "_btnBlock").gameObject.activeSelf, "Timeout enables the store blocker.");
                    Check(!Get<FailPanel>(manager, "_failPanel").gameObject.activeSelf, "Timeout hides the fail popup.");
                    Check(!player.IsWorking && flow.State == StealHatchController.Phase.Ending, "Timeout freezes gameplay.");
                    Complete("30s timeout from entry, store opened, blocker enabled, endcard hidden.");
                }
                return;
            }
            if (stage == 0 && elapsed >= .2f)
            {
                Check(flow.State == StealHatchController.Phase.Seeking && flow.StolenCount == 0, "Start seeking, without selection.");
                Check(Get<GameObject>(raising, "_selection") == null, "Egg selection must be removed.");
                Check(eggs.Length == 4 && Object.FindObjectsByType<PenWanderer>(FindObjectsSortMode.None).Length == 2, "Four eggs and two initial pen residents.");
                Check(Mathf.Abs(guard.transform.position.y) < .25f, "Guard remains on the ground.");
                Check(guard.State == Monster.MonsterState.Patrolling || guard.State == Monster.MonsterState.PatrolResting, "Cerberus patrols before stealing.");
                var tutorial = Get<HandTutorial>(flow, "_tutorial");
                Check(Get<RectTransform>(tutorial, "_infinityGraphic").gameObject.activeSelf, "Camera tutorial must appear first.");
                Capture("home-camera-tutorial");
                var touch = Object.FindFirstObjectByType<TouchController>();
                var pointer = new PointerEventData(EventSystem.current) { pointerId = -1, position = new Vector2(Screen.width * .7f, Screen.height * .5f) };
                touch.OnPointerDown(pointer);
                pointer.position += Vector2.right * Mathf.Max(120f, Time.unscaledDeltaTime * 120f);
                touch.OnDrag(pointer); touch.OnPointerUp(pointer);
                Check(Get<RectTransform>(tutorial, "_joystickHint").gameObject.activeSelf, "Camera drag must reveal joystick hint.");
                beforeMove = player.transform.position; Axes(0, 1); Stage(1);
            }
            else if (stage == 1 && elapsed > .2f)
            {
                Axes(0, 0);
                Check((player.transform.position - beforeMove).sqrMagnitude > 4f, "Real joystick input must move the unchanged player.");
                Check(!Get<RectTransform>(Get<HandTutorial>(flow, "_tutorial"), "_joystickHint").gameObject.activeSelf, "Joystick movement dismisses its tutorial.");
                Teleport(new Vector3(0, 1.2f, eggs[0].transform.position.z - 38), 0); Stage(2);
            }
            else if (stage == 2 && elapsed > .3f)
            {
                Capture("cerberus-and-five-nests");
                Teleport(new Vector3(0, 1.2f, eggs[0].transform.position.z - 5.5f), 0); Stage(3);
            }
            else if (stage == 3 && elapsed > .25f)
            {
                Check(action.gameObject.activeSelf && eggs[0].CanSteal, "Pickup trigger exposes STEAL near the egg.");
                Check(Get<TMPro.TMP_Text>(flow, "_actionLabel").text == "STEAL", "Steal label.");
                Capture("steal-button");
                action.onClick.Invoke(); action.onClick.Invoke();
                Check(flow.StolenCount == 1 && eggs[0].IsHeld && player.IsCarryingEgg, "First pickup occurs once and carries the egg.");
                Check(flow.State == StealHatchController.Phase.Escaping, "First steal starts escape.");
                Check(guard.State == Monster.MonsterState.WaitingToChase || guard.State == Monster.MonsterState.Chasing, "Guard pursues after theft.");
                Stage(4);
            }
            else if (stage == 4 && elapsed > Get<float>(guard, "_chaseDelay") + .1f)
            {
                if (mode == "caught" || mode == "click")
                {
                    guard.transform.position = player.transform.position + Vector3.right * 2;
                    Physics.SyncTransforms(); Stage(10); return;
                }
                var gate = Get<Transform>(flow, "_homeGate");
                Teleport(new Vector3(0, 1.2f, gate.position.z + 12), 180);
                guard.transform.position = new Vector3(10, 0, gate.position.z + 55);
                Physics.SyncTransforms();
                returnStart = guard.transform.position.z;
                Axes(0, 1); Stage(5);
            }
            else if (stage == 5)
            {
                Vector3 toNest = player.transform.position - Get<Transform>(raising, "_nest").position;
                toNest.y = 0;
                if (flow.State == StealHatchController.Phase.Raising && toNest.sqrMagnitude < 49f)
                {
                    Axes(0, 0);
                    Check(elapsed < 1f, "Player passes through the actual pen gate.");
                    Check(guard.State == Monster.MonsterState.ReturningToNest, "Home makes Cerberus return to its nests.");
                    returnStart = guard.transform.position.z;
                    Check(action.gameObject.activeSelf, "HATCH is offered inside home.");
                    Capture("hatch-at-home"); action.onClick.Invoke(); action.onClick.Invoke();
                    Check(raising.State == EggRaisingController.Phase.Incubating && !action.interactable, "HATCH begins incubation, early OPEN is rejected.");
                    Check(player.IsWorking && !player.IsCarryingEgg, "Player remains mobile after placing egg.");
                    hatchAt = Time.time; Stage(6);
                }
                else Check(elapsed < 1f, "Home gate traversal blocked.");
            }
            else if (stage == 6)
            {
                if (elapsed > .15f) Check(guard.transform.position.z > returnStart, "Guard actually travels back toward the nests.");
                if (Time.time - hatchAt < 1.95f) Check(raising.State == EggRaisingController.Phase.Incubating, "OPEN unlocked before 2s.");
                if (!captured && elapsed >= .8f) { Capture("incubation-countdown"); captured = true; }
                if (raising.State == EggRaisingController.Phase.Ready)
                {
                    Check(Time.time - hatchAt >= 1.95f && Time.time - hatchAt < 2.3f, "Incubation must last 2s.");
                    Check(action.interactable, "OPEN enabled after 2s.");
                    Check(Get<RectTransform>(Get<HandTutorial>(flow, "_tutorial"), "_stealHand").gameObject.activeSelf, "OPEN hand tutorial restored.");
                    Capture("open-ready"); action.onClick.Invoke(); action.onClick.Invoke(); Stage(7);
                }
            }
            else if (stage == 7)
            {
                if (elapsed < .3f) Check(Object.FindObjectsByType<PenWanderer>(FindObjectsSortMode.None).Length == 2, "Aura precedes the hatchling; two residents remain.");
                if (!captured && elapsed >= .2f) { Capture("hatch-aura"); captured = true; }
                if (flow.State == StealHatchController.Phase.Seeking)
                {
                    var hatchlings = Object.FindObjectsByType<PenWanderer>(FindObjectsSortMode.None);
                    Check(hatchlings.Length == 3 && hatchlings.Count(w => w.name.Contains("Cosmic Dragon")) == 1, "One Cosmic Dragon hatches alongside two residents.");
                    Check(Get<GameObject>(flow, "_stealTitle").activeSelf, "STEAL AN EGG returns after opening.");
                    Check(Get<TutorialLineIndicator>(flow, "_line").GetComponent<LineRenderer>().positionCount == 2, "A new guide line points to a remaining egg.");
                    beforeMove = hatchlings.First(w => w.name.Contains("Cosmic Dragon")).transform.position;
                    Capture("cosmic-dragon-in-pen"); Stage(8);
                }
            }
            else if (stage == 8 && elapsed > 2.5f)
            {
                var dragon = Object.FindObjectsByType<PenWanderer>(FindObjectsSortMode.None).First(w => w.name.Contains("Cosmic Dragon"));
                Check((dragon.transform.position - beforeMove).sqrMagnitude > .1f, "Hatched dragon walks around the pen.");
                if (guard.State == Monster.MonsterState.Patrolling || guard.State == Monster.MonsterState.PatrolResting)
                {
                    Teleport(new Vector3(eggs[1].transform.position.x, 1.2f, eggs[1].transform.position.z - 5), 0); Stage(9);
                }
            }
            else if (stage == 9 && elapsed > .25f)
            {
                Check(action.gameObject.activeSelf, "Second remaining egg can be stolen."); action.onClick.Invoke();
                Check(flow.StolenCount == 2 && manager.HasEnded, "Second pickup ends gameplay immediately.");
                Check(Get<FailPanel>(manager, "_stealHatchCta").gameObject.activeSelf, "Second pickup shows the existing CTA artwork.");
                Check(!Get<bool>(manager, "_storeOpened"), "Automatic store waits 1s.");
                endAt = Time.realtimeSinceStartup; Capture("second-egg-cta"); Stage(11);
            }
            else if (stage == 10 && elapsed > .1f)
            {
                Check(manager.HasEnded && !player.IsWorking, "Caught means immediate terminal failure.");
                Check(Get<FailPanel>(manager, "_failPanel").gameObject.activeSelf, "FAIL panel is shown.");
                Check(Get<Button>(Get<FailPanel>(manager, "_failPanel"), "_retryButton").gameObject.activeInHierarchy, "Retry artwork remains visible.");
                endAt = Time.realtimeSinceStartup; Capture("caught-fail-with-retry");
                if (mode == "click")
                {
                    var pointer = new PointerEventData(EventSystem.current) { pointerId = -1, position = new Vector2(10, 10), button = PointerEventData.InputButton.Left };
                    var hits = new System.Collections.Generic.List<RaycastResult>(); EventSystem.current.RaycastAll(pointer, hits);
                    Check(hits.Count > 0, "Full-screen end card receives arbitrary touch.");
                    ExecuteEvents.ExecuteHierarchy(hits[0].gameObject, pointer, ExecuteEvents.pointerClickHandler);
                    Check(Get<bool>(manager, "_storeOpened") && flow.StolenCount == 1, "Touch anywhere opens store without retrying.");
                    Complete("caught => FAIL + Retry artwork; arbitrary corner touch installs immediately, no retry.");
                }
                else Stage(11);
            }
            else if (stage == 11)
            {
                float sinceEnd = Time.realtimeSinceStartup - endAt;
                if (sinceEnd < .75f) Check(!Get<bool>(manager, "_storeOpened"), "Store delay is shorter than 1s.");
                if (Get<bool>(manager, "_storeOpened"))
                {
                    Check(sinceEnd >= .75f && sinceEnd < 1.3f, "Store opens after approximately 1s.");
                    Complete(mode == "caught" ? "caught => immediate FAIL, Retry visible, auto-store 1s, no retry." :
                        "camera/joystick tutorials; actual pickup; gate traversal; guard returns/patrols; 2s incubation; aura then one wandering Cosmic Dragon; renewed guide; second steal => CTA then auto-store 1s.");
                }
            }
        }
        catch (Exception error)
        {
            if (joystick != null) Axes(0, 0);
            Result = "FAIL " + mode + " stage " + stage + ": " + error.Message;
            File.AppendAllText("Temp/StealHatch/results.txt", Result + Environment.NewLine);
            Debug.LogError(Result); EditorApplication.update -= Tick;
        }
    }
}
