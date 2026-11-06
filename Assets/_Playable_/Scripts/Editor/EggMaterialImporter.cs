using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using UnityEditor;
using UnityEngine;

/// <summary>Extracts supplied egg materials and restores embedded texture bindings Unity omits.</summary>
public static class EggMaterialImporter
{
    const string Root = "Assets/_Playable_/3D Model/Egg";
    static readonly Dictionary<string, string> Textures = new Dictionary<string, string>
    {
        { "Amber Stone Egg/Stone _ golden ochre", "Stone_Ochre" },
        { "Amber Stone Egg/Stone _ pale limestone", "Stone_Limestone" },
        { "Amber Stone Egg/Stone _ smoky taupe", "Stone_Taupe" },
        { "Prism Unicorn Egg/Crystal _ cyan and azure", "Prism_cyan_and_azure" },
        { "Prism Unicorn Egg/Crystal _ fuchsia to violet", "Prism_fuchsia_to_violet" },
        { "Prism Unicorn Egg/Crystal _ violet and periwinkle", "Prism_violet_and_periwinkle" },
        { "Prism Unicorn Egg/Shell _ rose ombre", "Prism_rose_ombre" },
        { "Umber Terraced Egg/Cap _ dark roast", "Umber_Cap" },
        { "Umber Terraced Egg/Shell _ dark umber", "Umber_Shell" },
        { "Umber Terraced Egg/Stones _ pale ochre", "Umber_Ochre" },
        { "Winged Egg/Wood _ Amber", "Wood_Amber" },
        { "Winged Egg/Wood _ Copper", "Wood_Copper" },
        { "Winged Egg/Wood _ Honey", "Wood_Honey" }
    };

    static string SafeName(string name) => string.Concat(name.Select(c =>
        Path.GetInvalidFileNameChars().Contains(c) ? '_' : c));

    [MenuItem("Tools/Playable/Steal and Hatch/Import Egg Materials")]
    public static void Import()
    {
        if (EditorApplication.isPlaying) throw new InvalidOperationException("Use Edit mode to import egg materials.");
        int materialCount = 0, textureCount = 0, runtimeCount = 0;
        var models = AssetDatabase.FindAssets("t:Model", new[] { Root })
            .Select(AssetDatabase.GUIDToAssetPath).Where(p => p.EndsWith(".fbx", StringComparison.OrdinalIgnoreCase)).ToArray();
        foreach (string path in models)
        {
            string egg = Path.GetFileNameWithoutExtension(path);
            string materialFolder = Root + "/Materials/" + egg;
            string textureFolder = Root + "/Textures/" + egg;
            Directory.CreateDirectory(materialFolder);
            var importer = (ModelImporter)AssetImporter.GetAtPath(path);
            var requiredTextures = Textures.Where(p => p.Key.StartsWith(egg + "/", StringComparison.Ordinal)).ToArray();
            if (requiredTextures.Length > 0)
            {
                Directory.CreateDirectory(textureFolder);
                if (requiredTextures.Any(p => !File.Exists(textureFolder + "/" + p.Value + ".png")))
                    importer.ExtractTextures(textureFolder);
            }
            AssetDatabase.Refresh();
            var model = AssetDatabase.LoadAssetAtPath<GameObject>(path);
            var materials = model.GetComponentsInChildren<Renderer>(true).SelectMany(r => r.sharedMaterials).Distinct().ToArray();
            if (materials.Any(m => m == null)) throw new InvalidOperationException("Missing material slot in " + path);
            foreach (var source in materials)
            {
                string destination = materialFolder + "/" + SafeName(source.name) + ".mat";
                var material = AssetDatabase.LoadAssetAtPath<Material>(destination);
                if (material == null)
                {
                    material = new Material(source) { name = source.name };
                    AssetDatabase.CreateAsset(material, destination);
                }
                if (Textures.TryGetValue(egg + "/" + source.name, out string textureName))
                {
                    var texture = AssetDatabase.LoadAssetAtPath<Texture2D>(textureFolder + "/" + textureName + ".png");
                    if (texture == null) throw new InvalidOperationException("Missing embedded texture: " + egg + "/" + textureName);
                    var settings = (TextureImporter)AssetImporter.GetAtPath(AssetDatabase.GetAssetPath(texture));
                    if (settings.wrapMode != TextureWrapMode.Clamp)
                    {
                        settings.wrapMode = TextureWrapMode.Clamp;
                        settings.SaveAndReimport();
                    }
                    material.mainTexture = texture;
                    material.color = Color.white;
                    textureCount++;
                }
                EditorUtility.SetDirty(material);
                importer.AddRemap(new AssetImporter.SourceAssetIdentifier(typeof(Material), source.name), material);

                // Existing combined gameplay prefabs refer to these assets directly.
                string runtimePath = StealHatchSceneSetup.Output + "/Materials/" +
                    AssetDatabase.AssetPathToGUID(path).Substring(0, 8) + "_" + SafeName(source.name) + ".mat";
                var runtime = AssetDatabase.LoadAssetAtPath<Material>(runtimePath);
                if (runtime != null)
                {
                    runtime.SetColor("_Color", material.color);
                    runtime.SetTexture("_MainTex", material.mainTexture);
                    runtime.mainTextureScale = material.mainTextureScale;
                    runtime.mainTextureOffset = material.mainTextureOffset;
                    EditorUtility.SetDirty(runtime);
                    runtimeCount++;
                }
                materialCount++;
            }
            importer.SaveAndReimport();
        }
        AssetDatabase.SaveAssets();
        Debug.Log($"Egg import complete: {models.Length} models, {materialCount} materials, {textureCount} texture bindings, {runtimeCount} gameplay materials updated.");
    }
}
