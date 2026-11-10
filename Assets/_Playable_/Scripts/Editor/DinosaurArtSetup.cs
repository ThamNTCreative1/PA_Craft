using System;
using System.Linq;
using System.Reflection;
using Playable;
using UnityEditor;
using UnityEditor.SceneManagement;
using UnityEngine;
using Object = UnityEngine.Object;

/// <summary>Replace supplied art while preserving the current route and gameplay settings.</summary>
public static class DinosaurArtSetup
{
    const BindingFlags Flags = BindingFlags.Static | BindingFlags.NonPublic;
    const string Output = StealHatchSceneSetup.Output;
    static T Get<T>(Object target, string name)
    {
        return (T)target.GetType().GetField(name, BindingFlags.Instance | BindingFlags.NonPublic).GetValue(target);
    }
    static void Set(Object target, string name, object value)
    {
        target.GetType().GetField(name, BindingFlags.Instance | BindingFlags.NonPublic).SetValue(target, value);
        EditorUtility.SetDirty(target);
        PrefabUtility.RecordPrefabInstancePropertyModifications(target);
    }
    static GameObject Spawn(string name, Transform old)
    {
        var go = (GameObject)PrefabUtility.InstantiatePrefab(AssetDatabase.LoadAssetAtPath<GameObject>(Output + "/" + name + ".prefab"));
        go.transform.SetParent(old.parent, false);
        go.transform.SetPositionAndRotation(old.position, old.rotation);
        return go;
    }
    [MenuItem("Tools/Playable/Steal and Hatch/Apply Dinosaur Art")]
    public static void Apply()
    {
        var scene = EditorSceneManager.GetActiveScene();
        if (EditorApplication.isPlaying || scene.path != "Assets/_Playable_/Scenes/Gameplay.unity")
            throw new Exception("Open Gameplay in Edit mode first.");
        System.IO.Directory.CreateDirectory("Temp/StealHatch");
        EditorSceneManager.SaveScene(scene, "Temp/StealHatch/Before-Dinosaur-Art.unity", true);
        StealHatchSceneSetup.PrepareArt();
        var flow = Object.FindFirstObjectByType<StealHatchController>();
        var raising = Object.FindFirstObjectByType<EggRaisingController>();
        var oldGuard = Get<Monster>(flow, "_guard");
        var guard = Spawn("T-Rex Guard", oldGuard.transform).GetComponent<Monster>();
        foreach (string field in new[] { "_patrolCenter", "_patrolRadii", "_moveSpeed", "_patrolSpeed", "_chaseDelay", "_attackDistance", "_patrolWalkDuration", "_patrolRestDuration" })
            Set(guard, field, Get<object>(oldGuard, field));
        Set(flow, "_guard", guard);
        ConfigureHomeSafety(flow);
        Object.DestroyImmediate(oldGuard.gameObject);
        var eggs = Get<Egg[]>(flow, "_eggs");
        string[] names = { "Amber Stone Egg", "Steel Vanguard Egg", "Sunstone Monolith Egg", "Umber Terraced Egg" };
        for (int i = 0; i < eggs.Length; i++)
        {
            var old = eggs[i];
            eggs[i] = Spawn(names[i], old.transform).GetComponent<Egg>();
            Object.DestroyImmediate(old.gameObject);
        }
        Set(flow, "_eggs", eggs);
        Set(raising, "_hatchlings", new[] { AssetDatabase.LoadAssetAtPath<GameObject>(Output + "/Ankylosaurus Hatchling.prefab").GetComponent<PenWanderer>() });
        var map = GameObject.Find("Steal and Hatch Map").transform;
        var previous = map.Find("Photo 2 - Guarded Nests");
        float start = previous.position.z;
        var endWall = map.Find("Guarded Nests - Galaxy End Wall");
        float end = endWall != null ? endWall.position.z : start + previous.GetComponent<MeshFilter>().sharedMesh.bounds.size.z * previous.localScale.z;
        foreach (string name in new[] { "Guarded Nests - Original Galaxy", "Guarded Nests - Galaxy End Wall", "Desert End Wall", "Desert End Wall Collider" })
        {
            var child = map.Find(name);
            if (child != null) Object.DestroyImmediate(child.gameObject);
        }
        Object.DestroyImmediate(previous.gameObject);
        var source = AssetDatabase.LoadAssetAtPath<GameObject>("Assets/_Playable_/3D Model/Animal/Steal an egg/Map_Steal_Eggs.prefab");
        var materials = source.GetComponent<MeshRenderer>().sharedMaterials;
        var section = (GameObject)typeof(StealHatchSceneSetup).GetMethod("CutSection", Flags).Invoke(null,
            new object[] { source.GetComponent<MeshFilter>().sharedMesh, materials, map, "Photo 2 - Guarded Nests", 1931.06f, 2436.09f, .4f, start });
        section.transform.localScale = new Vector3(1, 1, (end - start) / (505.03f * .4f));
        var wall = GameObject.CreatePrimitive(PrimitiveType.Cube);
        wall.name = "Desert End Wall";
        wall.transform.SetParent(map, false);
        wall.transform.position = new Vector3(0, 7.2f, end);
        wall.transform.localScale = new Vector3(65, 14.6f, 2);
        ConfigureWallMaterial(wall, materials.First(m => m.name == "Dirt Surface 11"));
        wall.layer = LayerMask.NameToLayer("Ground");
        AssetDatabase.SaveAssets();
        EditorSceneManager.MarkSceneDirty(scene);
        EditorSceneManager.SaveScene(scene);
    }

    public static void ConfigureHomeSafety(StealHatchController flow)
    {
        var grounds = flow.gameObject.scene.GetRootGameObjects()
            .SelectMany(root => root.GetComponentsInChildren<Renderer>(true))
            .Where(renderer => renderer.name == "Photo 1 - Home" || renderer.name == "Home - Original Green Arena")
            .ToArray();
        if (grounds.Length == 0) throw new Exception("Home ground renderers were not found.");
        Set(flow, "_homeGrounds", grounds);
    }

    public static void ConfigureWallMaterial(GameObject wall, Material floor)
    {
        // The cube's unit UVs stretch the floor checks across the entire wall.
        // Tile by world dimensions and use the map's unlit palette on vertical faces.
        const string path = Output + "/Materials/Desert Wall Sand.mat";
        var material = AssetDatabase.LoadAssetAtPath<Material>(path);
        if (material == null)
        {
            material = new Material(Shader.Find("Playable/Egg Unlit"));
            AssetDatabase.CreateAsset(material, path);
        }
        material.SetColor("_Color", floor.color);
        material.SetTexture("_MainTex", floor.mainTexture);
        material.SetTextureScale("_MainTex", new Vector2(wall.transform.lossyScale.x * .3f, wall.transform.lossyScale.y * .3f));
        EditorUtility.SetDirty(material);
        wall.GetComponent<Renderer>().sharedMaterial = material;
    }
}
