using System;
using System.IO;
using System.Linq;
using System.Text;
using Minigames.StealAnEgg.GamePlay;
using UnityEditor;
using UnityEngine;
using Object = UnityEngine.Object;

// Moves each pet's model so the feet (lowest baked vertex over its idle/walk clips) sit on the pet root pivot.
// Runs once, rerun via the menu.
public static class PetFeetAlignSetup
{
    private const string MarkerPath = "Library/PetFeetAlignSetup.done";
    private const string ReportPath = "Library/PetFeetAlignSetup.txt";
    private static readonly string[] PetPaths =
    {
        "Assets/MiniGames/StealAnEgg/Prefabs/Monsters/Volcano/3Head Dragon Variant.prefab",
        "Assets/MiniGames/StealAnEgg/Prefabs/Monsters/Cosmic/Eternal Lunar Dragon Variant.prefab",
        "Assets/MiniGames/StealAnEgg/Prefabs/Monsters/Chicken Variant.prefab",
    };

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

    [MenuItem("Tools/Playable/Align Pet Feet To Pivot")]
    public static void Run()
    {
        var log = new StringBuilder();
        foreach (string path in PetPaths)
        {
            try { log.AppendLine(Align(path)); }
            catch (Exception e) { log.AppendLine(path + " FAILED: " + e.Message); }
        }
        File.WriteAllText(ReportPath, log.ToString());
        File.WriteAllText(MarkerPath, "done");
    }

    private static string Align(string path)
    {
        if (AssetDatabase.LoadAssetAtPath<GameObject>(path) == null) return path + ": not found";
        var root = PrefabUtility.LoadPrefabContents(path);
        try
        {
            var monster = root.GetComponent<SAE_Monster>();
            var model = root.GetComponentInChildren<SAE_MonsterAnimator>(true);
            if (monster == null || model == null) return path + ": no SAE_Monster / model";

            var clips = new[] { monster.Animation.walk, monster.Animation.idle }.Where(c => c != null).ToArray();
            Vector3 before = model.transform.localPosition;

            // Lowest point in the model's parent space, measured over a few frames of each clip.
            float lowest = float.MaxValue;
            var smrs = model.GetComponentsInChildren<SkinnedMeshRenderer>(true);
            var mrs = model.GetComponentsInChildren<MeshFilter>(true);
            var baked = new Mesh();
            Transform space = model.transform.parent;
            foreach (var clip in clips.DefaultIfEmpty(null))
            {
                for (int i = 0; i <= 4; i++)
                {
                    if (clip != null) clip.SampleAnimation(model.gameObject, clip.length * i / 4f);
                    foreach (var smr in smrs)
                    {
                        if (smr.sharedMesh == null) continue;
                        smr.BakeMesh(baked, true);
                        lowest = Mathf.Min(lowest, LowestY(baked.vertices, smr.transform, space));
                    }
                    foreach (var mf in mrs)
                        if (mf.sharedMesh != null)
                            lowest = Mathf.Min(lowest, LowestY(mf.sharedMesh.vertices, mf.transform, space));
                }
            }
            Object.DestroyImmediate(baked);
            if (lowest == float.MaxValue) return path + ": no meshes";

            // Restore the pose the clips may have changed, then shift the model so lowest = 0 (pivot).
            model.transform.localPosition = before;
            var pos = before;
            pos.y -= lowest;
            model.transform.localPosition = pos;

            PrefabUtility.SaveAsPrefabAsset(root, path, out bool saved);
            return $"{Path.GetFileNameWithoutExtension(path)}: lowest={lowest:0.####} modelY {before.y:0.####} -> {pos.y:0.####} saved={saved}";
        }
        finally
        {
            PrefabUtility.UnloadPrefabContents(root);
        }
    }

    private static float LowestY(Vector3[] vertices, Transform from, Transform space)
    {
        float min = float.MaxValue;
        foreach (var v in vertices)
        {
            Vector3 world = from.TransformPoint(v);
            float y = space != null ? space.InverseTransformPoint(world).y : world.y;
            if (y < min) min = y;
        }
        return min;
    }
}
