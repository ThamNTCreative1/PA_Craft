using System;
using System.IO;
using System.Linq;
using Playable;
using UnityEditor;
using UnityEditor.Animations;
using UnityEditor.SceneManagement;
using UnityEngine;
using Object = UnityEngine.Object;

// Swaps the Yeti boss model for the Dark Dragon (Idle <-> Fly on IsRun). Runs once, rerun via the menu.
public static class DarkDragonBossSetup
{
    private const string MarkerPath = "Library/DarkDragonBossSetup.done";
    private const string ReportPath = "Library/DarkDragonBossSetup.txt";
    private const string ModelPath = "Assets/Game/Models/Mounts/Dragon.fbx";
    private const string ControllerPath = "Assets/_Playable_/3D Model/Animal/Steal an egg/Anim Guard/DarkDragon.controller";
    private const string BossName = "Yeti";

    [InitializeOnLoadMethod]
    private static void AutoRunOnce()
    {
        if (File.Exists(MarkerPath)) return;
        EditorApplication.delayCall += () =>
        {
            if (EditorApplication.isPlayingOrWillChangePlaymode) return;
            Run();
        };
    }

    [MenuItem("Tools/Playable/Replace Yeti With Dark Dragon")]
    public static void Run()
    {
        string result;
        try { result = Build(); }
        catch (Exception e) { result = "FAILED: " + e; }
        File.WriteAllText(ReportPath, result);
        File.WriteAllText(MarkerPath, "done");
    }

    private static string Build()
    {
        var model = AssetDatabase.LoadAssetAtPath<GameObject>(ModelPath);
        var clips = AssetDatabase.LoadAllAssetsAtPath(ModelPath).OfType<AnimationClip>()
            .Where(c => !c.name.StartsWith("__preview__")).ToArray();
        var idle = clips.FirstOrDefault(c => c.name.EndsWith("Idle"));
        var fly = clips.FirstOrDefault(c => c.name.EndsWith("Fly"));
        if (model == null || idle == null || fly == null)
            return $"ABORT model={model != null} idle={idle != null} fly={fly != null} clips={string.Join(",", clips.Select(c => c.name))}";

        var controller = BuildController(idle, fly);

        var monster = Object.FindObjectsByType<Monster>(FindObjectsInactive.Include, FindObjectsSortMode.None)
            .FirstOrDefault(m => m.name == BossName);
        if (monster == null) return "ABORT: no Monster named " + BossName + " in the open scene";

        var so = new SerializedObject(monster);
        var animProp = so.FindProperty("_animator");
        var oldAnimator = (Animator)animProp.objectReferenceValue;
        if (oldAnimator == null) return "ABORT: Yeti has no animator assigned";

        // Old model: the animator's object, or the outermost prefab instance holding it.
        var oldGo = PrefabUtility.GetOutermostPrefabInstanceRoot(oldAnimator.gameObject);
        if (oldGo == null || oldGo == monster.gameObject) oldGo = oldAnimator.gameObject;

        // Boss objects start inactive; renderer bounds are only valid while active.
        bool wasActive = monster.gameObject.activeSelf;
        monster.gameObject.SetActive(true);
        var parent = oldGo.transform.parent;
        int sibling = oldGo.transform.GetSiblingIndex();
        Vector3 pos = oldGo.transform.localPosition;
        Quaternion rot = oldGo.transform.localRotation;
        var oldBounds = Bounds(oldGo);

        var go = (GameObject)PrefabUtility.InstantiatePrefab(model, parent);
        go.name = "Dark Dragon";
        go.transform.SetSiblingIndex(sibling);
        go.transform.localPosition = pos;
        go.transform.localRotation = rot;
        go.transform.localScale = Vector3.one;
        var newBounds = Bounds(go);
        float scale = newBounds.size.y > 0.001f ? oldBounds.size.y / newBounds.size.y : 1f;
        go.transform.localScale = Vector3.one * scale;
        // Feet on the same ground level as the old model.
        go.transform.position += Vector3.up * (oldBounds.min.y - Bounds(go).min.y);

        var animator = go.GetComponent<Animator>();
        if (animator == null) animator = go.AddComponent<Animator>();
        animator.runtimeAnimatorController = controller;
        animator.applyRootMotion = false;
        animator.cullingMode = AnimatorCullingMode.AlwaysAnimate;

        string oldName = oldGo.name;
        Object.DestroyImmediate(oldGo);
        monster.gameObject.SetActive(wasActive);

        animProp.objectReferenceValue = animator;
        so.ApplyModifiedPropertiesWithoutUndo();
        monster.gameObject.name = "Dark Dragon";

        var scene = monster.gameObject.scene;
        EditorSceneManager.MarkSceneDirty(scene);
        bool saved = EditorSceneManager.SaveScene(scene);
        return $"replaced '{oldName}' -> Dark Dragon, scale={scale:0.###} oldSize={oldBounds.size} " +
               $"dragonSize@1={newBounds.size} clips={string.Join(",", clips.Select(c => c.name))} sceneSaved={saved}";
    }

    private static AnimatorController BuildController(AnimationClip idle, AnimationClip fly)
    {
        var ac = AssetDatabase.LoadAssetAtPath<AnimatorController>(ControllerPath);
        if (ac != null) return ac;

        ac = AnimatorController.CreateAnimatorControllerAtPath(ControllerPath);
        ac.AddParameter("IsRun", AnimatorControllerParameterType.Bool);
        var sm = ac.layers[0].stateMachine;
        var idleState = sm.AddState("Idle");
        idleState.motion = idle;
        var moveState = sm.AddState("Move");
        moveState.motion = fly;
        sm.defaultState = idleState;

        var toMove = idleState.AddTransition(moveState);
        toMove.hasExitTime = false;
        toMove.duration = 0.15f;
        toMove.AddCondition(AnimatorConditionMode.If, 0, "IsRun");
        var toIdle = moveState.AddTransition(idleState);
        toIdle.hasExitTime = false;
        toIdle.duration = 0.15f;
        toIdle.AddCondition(AnimatorConditionMode.IfNot, 0, "IsRun");
        AssetDatabase.SaveAssets();
        return ac;
    }

    private static Bounds Bounds(GameObject go)
    {
        var rs = go.GetComponentsInChildren<Renderer>(true);
        if (rs.Length == 0) return new Bounds(go.transform.position, Vector3.zero);
        var b = rs[0].bounds;
        foreach (var r in rs) b.Encapsulate(r.bounds);
        return b;
    }
}
