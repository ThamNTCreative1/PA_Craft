using System.IO;
using UnityEditor;
using UnityEngine;

// Builds the VineWing egg model prefab from the generated OBJ + material. Runs once, rerun via the menu.
public static class VineWingEggSetup
{
    private const string MarkerPath = "Library/VineWingEggSetup.done";
    private const string ReportPath = "Library/VineWingEggSetup.txt";
    private const string Folder = "Assets/MiniGames/StealAnEgg/Models/Eggs/VineWingEgg/";
    private const string PrefabPath = "Assets/MiniGames/StealAnEgg/Prefabs/Eggs/VineWingEgg_Model.prefab";

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

    [MenuItem("Tools/Playable/Build VineWing Egg Prefab")]
    public static void Run()
    {
        string objPath = Folder + "VineWingEgg.obj";
        if (AssetImporter.GetAtPath(objPath) is ModelImporter importer &&
            importer.materialImportMode != ModelImporterMaterialImportMode.None)
        {
            importer.materialImportMode = ModelImporterMaterialImportMode.None;
            importer.importNormals = ModelImporterNormals.Import;
            importer.SaveAndReimport();
        }

        var mesh = AssetDatabase.LoadAssetAtPath<Mesh>(objPath);
        var material = AssetDatabase.LoadAssetAtPath<Material>(Folder + "VineWingEgg.mat");
        if (mesh == null || material == null)
        {
            File.WriteAllText(ReportPath, $"missing mesh={mesh != null} material={material != null}");
            return;
        }

        var go = new GameObject("VineWingEgg_Model");
        go.AddComponent<MeshFilter>().sharedMesh = mesh;
        go.AddComponent<MeshRenderer>().sharedMaterial = material;
        PrefabUtility.SaveAsPrefabAsset(go, PrefabPath, out bool saved);
        Object.DestroyImmediate(go);

        File.WriteAllText(ReportPath, $"saved={saved} tris={mesh.triangles.Length / 3} bounds={mesh.bounds}");
        File.WriteAllText(MarkerPath, "done");
    }
}
