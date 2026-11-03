using System;
using System.IO;
using System.Linq;
using Minigames.StealAnEgg.GamePlay;
using UnityEditor;
using UnityEngine;
using Object = UnityEngine.Object;

// Builds the 3-head dragon pet (Volcano_Guard model) from the Lunar Dragon pet. Runs once, rerun via the menu.
public static class ThreeHeadDragonPetSetup
{
    private const string MarkerPath = "Library/ThreeHeadDragonPetSetup.done";
    private const string ReportPath = "Library/ThreeHeadDragonPetSetup.txt";
    private const string TemplatePath = "Assets/MiniGames/StealAnEgg/Prefabs/Monsters/Cosmic/Eternal Lunar Dragon Variant.prefab";
    private const string ModelPath = "Assets/MiniGames/StealAnEgg/Models/Monsters/Volcano/Volcano_Guard.fbx";
    private const string Folder = "Assets/MiniGames/StealAnEgg/Prefabs/Monsters/Volcano";
    private const string PrefabPath = Folder + "/3Head Dragon Variant.prefab";

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

    [MenuItem("Tools/Playable/Build 3Head Dragon Pet")]
    public static void Run()
    {
        try
        {
            File.WriteAllText(ReportPath, Build());
        }
        catch (Exception e)
        {
            File.WriteAllText(ReportPath, "FAILED: " + e);
        }
        File.WriteAllText(MarkerPath, "done");
    }

    private static string Build()
    {
        var model = AssetDatabase.LoadAssetAtPath<GameObject>(ModelPath);
        var clips = AssetDatabase.LoadAllAssetsAtPath(ModelPath).OfType<AnimationClip>()
            .Where(c => !c.name.StartsWith("__preview__")).ToArray();
        var run = clips.FirstOrDefault(c => c.name == "run");
        var sleep = clips.FirstOrDefault(c => c.name == "sleep");
        if (model == null || run == null) return $"missing model={model != null} run={run != null}";

        if (!AssetDatabase.IsValidFolder(Folder))
            AssetDatabase.CreateFolder("Assets/MiniGames/StealAnEgg/Prefabs/Monsters", "Volcano");
        if (AssetDatabase.LoadAssetAtPath<GameObject>(PrefabPath) == null && !AssetDatabase.CopyAsset(TemplatePath, PrefabPath))
            return "copy failed";

        var root = PrefabUtility.LoadPrefabContents(PrefabPath);
        try
        {
            // Replace the Lunar model (the object carrying the animator) with the 3-head dragon.
            var oldAnim = root.GetComponentInChildren<SAE_MonsterAnimator>(true);
            var oldGo = oldAnim.gameObject;
            var parent = oldGo.transform.parent;
            var controller = oldGo.GetComponent<Animator>().runtimeAnimatorController;
            float targetHeight = Height(oldGo);
            Object.DestroyImmediate(oldGo);

            var go = (GameObject)PrefabUtility.InstantiatePrefab(model, parent);
            go.name = "3Head Dragon";
            go.transform.localPosition = Vector3.zero;
            go.transform.localRotation = Quaternion.identity;
            go.transform.localScale = Vector3.one;
            float height = Height(go);
            if (height > 0.01f && targetHeight > 0.01f)
                go.transform.localScale = Vector3.one * (targetHeight / height);

            var animator = go.GetComponent<Animator>();
            if (animator == null) animator = go.AddComponent<Animator>();
            animator.runtimeAnimatorController = controller;
            animator.applyRootMotion = false;
            animator.cullingMode = AnimatorCullingMode.CullCompletely;
            if (go.GetComponent<SAE_MonsterAnimator>() == null) go.AddComponent<SAE_MonsterAnimator>();

            var monster = root.GetComponent<SAE_Monster>();
            var so = new SerializedObject(monster);
            so.FindProperty("id").stringValue = Guid.NewGuid().ToString();
            so.FindProperty("displayment.name").stringValue = "3-Head Dragon";
            so.FindProperty("displayment.thumbnail").objectReferenceValue = null;
            so.FindProperty("_animation.idle").objectReferenceValue = sleep != null ? sleep : run;
            so.FindProperty("_animation.walk").objectReferenceValue = run;
            so.ApplyModifiedPropertiesWithoutUndo();

            root.name = "3Head Dragon Variant";
            PrefabUtility.SaveAsPrefabAsset(root, PrefabPath, out bool saved);
            return $"saved={saved} scale={go.transform.localScale.x:0.###} lunarHeight={targetHeight:0.###} " +
                   $"dragonHeight={height:0.###} clips={string.Join(",", clips.Select(c => c.name))}";
        }
        finally
        {
            PrefabUtility.UnloadPrefabContents(root);
        }
    }

    private static float Height(GameObject go)
    {
        var renderers = go.GetComponentsInChildren<Renderer>(true);
        if (renderers.Length == 0) return 0f;
        var b = renderers[0].bounds;
        foreach (var r in renderers) b.Encapsulate(r.bounds);
        return b.size.y;
    }
}
