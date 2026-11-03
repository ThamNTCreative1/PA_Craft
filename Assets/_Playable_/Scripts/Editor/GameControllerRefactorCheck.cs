using System;
using System.IO;
using System.Reflection;
using Playable;
using UnityEditor;
using UnityEditor.SceneManagement;
using UnityEngine;
using UnityEngine.SceneManagement;
using UnityEngine.UI;

public static class GameControllerRefactorCheck
{
    const BindingFlags Flags = BindingFlags.Instance | BindingFlags.NonPublic;
    static void Set(object o, string n, object v) => o.GetType().GetField(n, Flags).SetValue(o, v);
    static void Call(object o, string n, params object[] args) => o.GetType().GetMethod(n, Flags).Invoke(o, args);
    static void Check(bool condition, string message) { if (!condition) throw new Exception(message); }

    [MenuItem("Tools/Playable/Validate Egg Interaction")]
    public static void Run()
    {
        if (EditorApplication.isPlayingOrWillChangePlaymode || EditorApplication.isCompiling) return;
        Scene scene = EditorSceneManager.NewPreviewScene();
        var root = new GameObject("Egg interaction validation");
        SceneManager.MoveGameObjectToScene(root, scene);
        try
        {
            var p = new GameObject("Player"); p.transform.SetParent(root.transform);
            var player = p.AddComponent<PlayerController>(); Call(player, "Awake");
            var primary = p.GetComponent<CapsuleCollider>();
            var secondary = p.AddComponent<BoxCollider>();
            var m = new GameObject("Monster"); m.transform.SetParent(root.transform);
            var monster = m.AddComponent<Monster>(); Call(monster, "Awake");
            var eggObject = new GameObject("Egg"); eggObject.transform.SetParent(root.transform);
            eggObject.transform.localScale = new Vector3(2, 3, 4);
            var solid = eggObject.AddComponent<BoxCollider>();
            var disabled = eggObject.AddComponent<SphereCollider>(); disabled.enabled = false;
            var body = eggObject.AddComponent<Rigidbody>();
            var egg = eggObject.AddComponent<Egg>();
            var hold = new GameObject("Hold"); hold.transform.SetParent(p.transform);
            var home = new GameObject("Home"); home.transform.SetParent(root.transform); home.transform.position = Vector3.right * 20;
            var buttonObject = new GameObject("Steal", typeof(RectTransform), typeof(Button)); buttonObject.transform.SetParent(root.transform);
            var button = buttonObject.GetComponent<Button>();
            var controller = root.AddComponent<GameController>();
            Set(controller, "_player", player); Set(controller, "_monster", monster);
            Set(controller, "_egg", egg); Set(controller, "_eggHoldPoint", hold.transform); Set(controller, "_home", home.transform);
            Set(controller, "_stealButton", button);
            Call(controller, "Awake"); Call(controller, "OnEnable"); Call(controller, "Start");
            var trigger = egg.GetComponentInChildren<EggPickupTrigger>(true);
            Physics.SyncTransforms();
            Check(!buttonObject.activeSelf && !egg.CanSteal, "Hidden until trigger enters");
            Call(trigger, "OnTriggerEnter", solid);
            Check(!egg.CanSteal, "Ignore non-player collider");
            Call(trigger, "OnTriggerEnter", primary);
            Check(buttonObject.activeSelf && controller.State == GameController.GameState.CanStealEgg, "Show on player enter");
            Call(trigger, "OnTriggerEnter", primary); Call(trigger, "OnTriggerEnter", secondary);
            Call(trigger, "OnTriggerExit", primary);
            Check(buttonObject.activeSelf, "Keep visible while another player collider overlaps");
            Call(trigger, "OnTriggerExit", secondary);
            Check(!buttonObject.activeSelf, "Hide when last collider exits, ignoring repeated enter");
            Call(trigger, "OnTriggerStay", primary);
            p.transform.position = Vector3.right * 100; Physics.SyncTransforms(); controller.StealEgg();
            Check(!egg.IsHeld && !buttonObject.activeSelf, "Reject stale contact after teleport");
            p.transform.position = Vector3.zero; Physics.SyncTransforms();
            Call(trigger, "OnTriggerEnter", primary);
            primary.enabled = false; Call(egg, "FixedUpdate");
            Check(!buttonObject.activeSelf, "Disabled player collider clears range"); primary.enabled = true;
            Physics.SyncTransforms(); Call(trigger, "OnTriggerEnter", primary);
            button.onClick.Invoke(); controller.StealEgg();
            Check(egg.IsHeld && controller.State == GameController.GameState.Escaping && egg.transform.parent == hold.transform, "Pick up once via button");
            Check(!buttonObject.activeSelf && !trigger.gameObject.activeSelf && body.isKinematic && !solid.enabled && !disabled.enabled, "Held egg disables pickup and physics");
            Set(controller, "_restartDelay", 0f);
            p.transform.position = Vector3.right * 5;
            m.transform.position = Vector3.right * 4;
            Call(monster, "Attack");
            Check(controller.State == GameController.GameState.Lost && !player.IsWorking &&
                  monster.State == Monster.MonsterState.Attacking, "Caught player waits while monster attacks");
            Call(controller, "Update"); Physics.SyncTransforms();
            Check(controller.State == GameController.GameState.LookingForEgg && player.IsWorking &&
                  monster.State == Monster.MonsterState.Idle, "Caught round automatically restarts with an idle monster");
            Check(p.transform.position == Vector3.zero && m.transform.position == Vector3.zero,
                  "Restart restores player and monster positions");
            Check(!egg.IsHeld && !egg.CanSteal && !buttonObject.activeSelf && trigger.gameObject.activeSelf, "Reset clears pickup contacts");
            Check(solid.enabled && !disabled.enabled && !body.isKinematic && body.useGravity && egg.transform.localScale == new Vector3(2, 3, 4), "Restore original egg physics and scale");
            Call(trigger, "OnTriggerStay", primary); Check(buttonObject.activeSelf, "Stay restores overlap after reset");
            button.onClick.Invoke();
            Check(egg.IsHeld && controller.State == GameController.GameState.Escaping, "Can steal again after being caught");
            Call(monster, "Attack"); Call(controller, "Update"); Physics.SyncTransforms();
            Check(!egg.IsHeld && player.IsWorking && monster.State == Monster.MonsterState.Idle,
                  "Automatic restart works on consecutive rounds");
            Call(trigger, "OnTriggerStay", primary);
            Call(controller, "OnDisable"); Check(!buttonObject.activeSelf, "Disabled controller hides button");
            Call(controller, "OnEnable"); Check(buttonObject.activeSelf, "Enable restores current trigger state");
            egg.enabled = false; Call(egg, "OnDisable"); Check(!buttonObject.activeSelf, "Disabled egg hides button");
            File.WriteAllText("Library/GameControllerRefactorCheck.txt", "PASS: trigger enter/exit/stay, player filtering, multiple colliders, stale contact, disabled collider, button pickup, duplicate pickup, physics restore, reset, controller/egg disable.");
        }
        catch (Exception e)
        {
            File.WriteAllText("Library/GameControllerRefactorCheck.txt", e.ToString());
            throw;
        }
        finally { UnityEngine.Object.DestroyImmediate(root); EditorSceneManager.ClosePreviewScene(scene); }
    }
}
