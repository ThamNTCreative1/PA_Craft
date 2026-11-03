using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text.RegularExpressions;
using UnityEditor;
using UnityEngine;

public static class StealEggLunaMeshFilter
{
    [Serializable] class Config { public UnityConfig unity; }
    [Serializable] class UnityConfig { public string[] scenes; public AssetsConfig assets; }
    [Serializable] class AssetsConfig { public string[] includes, export, excludes; }
    [Serializable] class Exclusions { public string[] excludes; }
    const string Report = "Tools/LunaUnusedMeshAssets.txt";
    const string AnimationReport = "Tools/LunaUnusedAnimationAssets.txt";

    [MenuItem("Steal Egg/Update Luna unused mesh exclusions")]
    [MenuItem("Steal Egg/Update Luna unused animation exclusions")]
    public static void Apply()
    {
        if (EditorApplication.isPlaying) throw new InvalidOperationException("Exit Play Mode first.");
        if (UnityEngine.SceneManagement.SceneManager.GetActiveScene().isDirty)
            throw new InvalidOperationException("Save the scene before updating Luna exclusions.");
        string json = File.ReadAllText("luna.json");
        var config = JsonUtility.FromJson<Config>(json);
        var roots = new HashSet<string>(config.unity.scenes ?? new string[0]);
        foreach (string path in (config.unity.assets.includes ?? new string[0]).Concat(config.unity.assets.export ?? new string[0]))
        {
            if (path.Contains("*") || path.Contains("?"))
                throw new InvalidOperationException("Resolve wildcard asset includes before filtering meshes: " + path);
            if (AssetDatabase.IsValidFolder(path))
                foreach (string guid in AssetDatabase.FindAssets("", new[] { path })) roots.Add(AssetDatabase.GUIDToAssetPath(guid));
            else roots.Add(path);
        }
        // Resources can be loaded at runtime without a serialized scene reference.
        foreach (string path in AssetDatabase.GetAllAssetPaths())
            if (path.StartsWith("Assets/") && path.Contains("/Resources/") && !AssetDatabase.IsValidFolder(path)) roots.Add(path);
        var dependencies = new HashSet<string>(AssetDatabase.GetDependencies(roots.Where(File.Exists).ToArray(), true));
        string[] meshFiles = AssetDatabase.FindAssets("t:Mesh", new[] { "Assets" })
            .Select(AssetDatabase.GUIDToAssetPath).Distinct().OrderBy(p => p).ToArray();
        string[] unused = meshFiles.Where(p => !dependencies.Contains(p)).ToArray();
        // Never exclude a whole FBX if its mesh, avatar or any clip is still needed.
        string[] animationFiles = new[] { "t:AnimationClip", "t:AnimatorController", "t:AnimatorOverrideController" }
            .SelectMany(filter => AssetDatabase.FindAssets(filter, new[] { "Assets" }))
            .Select(AssetDatabase.GUIDToAssetPath).Distinct().OrderBy(p => p).ToArray();
        string[] unusedAnimations = animationFiles.Where(p => !dependencies.Contains(p)).ToArray();
        var previous = new HashSet<string>(File.Exists(Report) ? File.ReadAllLines(Report) : new string[0]);
        if (File.Exists(AnimationReport)) previous.UnionWith(File.ReadAllLines(AnimationReport));
        var excludes = (config.unity.assets.excludes ?? new string[0]).Where(p => !previous.Contains(p))
            .Concat(unused).Concat(unusedAnimations)
            .Where(p => !string.IsNullOrWhiteSpace(p)).Distinct().ToArray();
        string serialized = JsonUtility.ToJson(new Exclusions { excludes = excludes }, true);
        string array = serialized.Substring(serialized.IndexOf('['), serialized.LastIndexOf(']') - serialized.IndexOf('[') + 1);
        // Brackets inside quoted filenames (e.g. [SAE_PEM]) are not array delimiters.
        var pattern = new Regex(@"(""assets""\s*:\s*\{[\s\S]*?""excludes""\s*:\s*)\[(?:[^""\[\]]|""(?:\\.|[^""\\])*"")*\]");
        if (pattern.Matches(json).Count != 1) throw new InvalidOperationException("Cannot locate Luna asset exclusions.");
        string updated = pattern.Replace(json, m => m.Groups[1].Value + array, 1);
        Directory.CreateDirectory("Tools/Backups/BeforeMeshExclusions");
        string backup = "Tools/Backups/BeforeMeshExclusions/luna.json";
        if (!File.Exists(backup)) File.Copy("luna.json", backup);
        File.WriteAllText("luna.json", updated);
        File.WriteAllLines(Report, unused);
        File.WriteAllLines("Tools/LunaUsedMeshAssets.txt", meshFiles.Where(dependencies.Contains));
        File.WriteAllLines(AnimationReport, unusedAnimations);
        File.WriteAllLines("Tools/LunaUsedAnimationAssets.txt", animationFiles.Where(dependencies.Contains));
        Debug.Log("Luna mesh filter: excluded " + unused.Length + " unused asset files; kept " + (meshFiles.Length - unused.Length) + ".");
        Debug.Log("Luna animation filter: excluded " + unusedAnimations.Length + " unused asset files; kept " + (animationFiles.Length - unusedAnimations.Length) + ".");
    }
}
