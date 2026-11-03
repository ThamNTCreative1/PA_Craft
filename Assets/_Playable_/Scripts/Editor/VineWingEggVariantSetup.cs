using System;
using System.IO;
using System.Linq;
using System.Text;
using Minigames.StealAnEgg.GamePlay;
using UnityEditor;
using UnityEditor.SceneManagement;
using UnityEngine;
using Object = UnityEngine.Object;

// Builds "VineWing_Egg Variant" (hatches the 3-head dragon) and swaps every egg in the open scene to it.
// Runs once, rerun via the menu.
public static class VineWingEggVariantSetup
{
    private const string MarkerPath = "Library/VineWingEggVariantSetup.done";
    private const string ReportPath = "Library/VineWingEggVariantSetup.txt";
    private const string EggFolder = "Assets/MiniGames/StealAnEgg/Prefabs/Eggs/";
    private const string TemplatePath = EggFolder + "Eternal Lunar Dragon_Egg Variant.prefab";
    private const string ChickenPath = EggFolder + "Chicken_Egg Variant.prefab";
    private const string VariantPath = EggFolder + "VineWing_Egg Variant.prefab";
    private const string ModelPath = EggFolder + "VineWingEgg_Model.prefab";
    private const string PetPath = "Assets/MiniGames/StealAnEgg/Prefabs/Monsters/Volcano/3Head Dragon Variant.prefab";

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

    [MenuItem("Tools/Playable/Build VineWing Egg + Replace Scene Eggs")]
    public static void Run()
    {
        var log = new StringBuilder();
        try
        {
            log.AppendLine(BuildVariant());
            log.AppendLine(ReplaceSceneEggs());
        }
        catch (Exception e)
        {
            log.AppendLine("FAILED: " + e);
        }
        File.WriteAllText(ReportPath, log.ToString());
        File.WriteAllText(MarkerPath, "done");
    }

    private static string BuildVariant()
    {
        var model = AssetDatabase.LoadAssetAtPath<GameObject>(ModelPath);
        var pet = AssetDatabase.LoadAssetAtPath<GameObject>(PetPath);
        if (model == null || pet == null) return $"ABORT: model={model != null} pet={pet != null}";

        if (AssetDatabase.LoadAssetAtPath<GameObject>(VariantPath) == null && !AssetDatabase.CopyAsset(TemplatePath, VariantPath))
            return "ABORT: copy failed";

        var root = PrefabUtility.LoadPrefabContents(VariantPath);
        try
        {
            var egg = root.GetComponentInChildren<SAE_Egg>(true);
            var so = new SerializedObject(egg);
            var rendererProp = so.FindProperty("_renderer");
            var oldRenderer = (MeshRenderer)rendererProp.objectReferenceValue;

            // Swap the Lunar egg mesh for the VineWing model, matching the old egg's body height.
            var oldGo = oldRenderer.gameObject;
            var parent = oldGo.transform.parent;
            Vector3 oldPos = oldGo.transform.localPosition;
            Bounds oldBounds = oldRenderer.bounds;
            float targetHeight = oldBounds.size.y;
            Object.DestroyImmediate(oldGo);

            var go = (GameObject)PrefabUtility.InstantiatePrefab(model, parent);
            go.name = "VineWingEgg";
            go.transform.localPosition = oldPos;
            go.transform.localRotation = Quaternion.identity;   // model is authored upright, glow facing -Z
            var mesh = go.GetComponent<MeshFilter>().sharedMesh;
            var renderer = go.GetComponent<MeshRenderer>();
            // Mesh body is 1 unit tall (wings stick out above), so scale the body to the old egg height.
            float scale = targetHeight / parent.lossyScale.y;
            go.transform.localScale = Vector3.one * scale;
            // Pivot is at the bottom: sit the new egg on the old egg's bottom, same XZ centre.
            Vector3 p = go.transform.position;
            go.transform.position = new Vector3(oldBounds.center.x, oldBounds.min.y, oldBounds.center.z);
            float oldBottom = oldBounds.min.y - p.y;

            rendererProp.objectReferenceValue = renderer;
            so.FindProperty("id").stringValue = Guid.NewGuid().ToString();
            so.FindProperty("eggName").stringValue = "VineWing Egg";
            so.FindProperty("thumbnail").objectReferenceValue = null;
            var monsters = so.FindProperty("monsters");
            monsters.arraySize = 1;
            monsters.GetArrayElementAtIndex(0).FindPropertyRelative("obj").objectReferenceValue = pet;
            monsters.GetArrayElementAtIndex(0).FindPropertyRelative("rate").intValue = 100;
            so.ApplyModifiedPropertiesWithoutUndo();

            root.name = "VineWing_Egg Variant";
            PrefabUtility.SaveAsPrefabAsset(root, VariantPath, out bool saved);
            return $"variant saved={saved} scale={scale:0.###} oldHeight={targetHeight:0.###} oldPos={oldPos} bottomShift={oldBottom:0.###} meshBounds={mesh.bounds}";
        }
        finally
        {
            PrefabUtility.UnloadPrefabContents(root);
        }
    }

    private static string ReplaceSceneEggs()
    {
        var variant = AssetDatabase.LoadAssetAtPath<GameObject>(VariantPath);
        var sources = new[] { ChickenPath, TemplatePath };
        var log = new StringBuilder();
        var roots = Object.FindObjectsByType<SAE_Egg>(FindObjectsInactive.Include, FindObjectsSortMode.None)
            .Select(e => PrefabUtility.GetOutermostPrefabInstanceRoot(e.gameObject))
            .Where(r => r != null && r.scene.IsValid())
            .Where(r => sources.Contains(PrefabUtility.GetPrefabAssetPathOfNearestInstanceRoot(r)))
            .Distinct().ToList();

        var settings = new PrefabReplacingSettings
        {
            logInfo = false,
            objectMatchMode = ObjectMatchMode.ByHierarchy,
            prefabOverridesOptions = PrefabOverridesOptions.KeepAllPossibleOverrides,
        };
        foreach (var r in roots)
        {
            PrefabUtility.ReplacePrefabAssetOfPrefabInstance(r, variant, settings, InteractionMode.AutomatedAction);
            r.name = "VineWing_Egg Variant";
            log.AppendLine($"  replaced at {r.transform.position}");
        }

        if (roots.Count == 0) return "no scene eggs found";
        var scene = roots[0].scene;
        EditorSceneManager.MarkSceneDirty(scene);
        bool saved = EditorSceneManager.SaveScene(scene);
        return $"{roots.Count} scene eggs replaced, scene saved={saved}\n" + log;
    }
}
