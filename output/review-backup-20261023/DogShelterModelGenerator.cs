using System.Collections.Generic;
using System.IO;
using UnityEditor;
using UnityEngine;

/// <summary>Creates reusable prefab assets for every modular dog-shelter building piece.</summary>
public static class DogShelterModelGenerator
{
    private const string RootFolder = "Assets/3D Models/Dog Shelter";
    private const string PrefabFolder = RootFolder + "/Prefabs";
    private const string MaterialFolder = RootFolder + "/Materials";

    private static readonly string[] Styles =
    {
        "Glow Base",
        "Pink Carpet",
        "Pale Base",
        "Fence X",
        "Fence Z",
        "Stone Column",
        "Glass X",
        "Glass Z",
        "White Roof Slab",
        "Pink Roof Panel",
        "Lantern",
        "Sign Base",
        "Bone Horizontal",
        "Bone Diagonal",
        "Water Basin",
        "Water Fill",
        "Fire Stage 1",
        "Fire Stage 2",
        "Fire Stage 3",
        "Fire Stage 4",
        "Fire Panel Front",
        "Fire Panel Right",
        "Fire Panel Back"
    };

    [MenuItem("Tools/CEBB/Create Dog Shelter Models")]
    public static void CreateModels()
    {
        EnsureFolder("Assets", "3D Models");
        EnsureFolder("Assets/3D Models", "Dog Shelter");
        EnsureFolder(RootFolder, "Prefabs");
        EnsureFolder(RootFolder, "Materials");

        var temporaryMaterials = new List<Material>();
        var solidMaterials = new Dictionary<Color, Material>();
        int created = 0;

        foreach (string style in Styles)
        {
            var block = new BuildBlock
            {
                type = style,
                visualStyle = style,
                color = Color.white
            };

            GameObject model = SampleBlockVisuals.Create(
                block,
                false,
                temporaryMaterials,
                (color, texture) => GetOrCreateSolidMaterial(color, texture, solidMaterials));
            model.name = ToAssetName(style);
            PersistRendererMaterials(model, style);

            string prefabPath = $"{PrefabFolder}/{ToAssetName(style)}.prefab";
            PrefabUtility.SaveAsPrefabAsset(model, prefabPath);
            Object.DestroyImmediate(model);
            created++;
        }

        foreach (Material material in temporaryMaterials)
            if (material != null && !AssetDatabase.Contains(material)) Object.DestroyImmediate(material);

        AssetDatabase.SaveAssets();
        AssetDatabase.Refresh();
        Debug.Log($"Created {created} modular dog shelter models in {PrefabFolder}.");
    }

    private static Material GetOrCreateSolidMaterial(Color color, Texture texture,
        Dictionary<Color, Material> cache)
    {
        if (texture == null && cache.TryGetValue(color, out Material cached)) return cached;

        Shader shader = Shader.Find("Universal Render Pipeline/Lit");
        if (shader == null) shader = Shader.Find("Standard");
        var material = new Material(shader)
        {
            color = color,
            mainTexture = texture,
            name = texture != null ? texture.name : "Solid_" + ColorUtility.ToHtmlStringRGB(color)
        };
        if (texture == null) cache[color] = material;
        return material;
    }

    private static void PersistRendererMaterials(GameObject model, string style)
    {
        var persisted = new Dictionary<Material, Material>();
        int materialIndex = 0;
        foreach (Renderer renderer in model.GetComponentsInChildren<Renderer>(true))
        {
            Material[] materials = renderer.sharedMaterials;
            for (int i = 0; i < materials.Length; i++)
            {
                Material source = materials[i];
                if (source == null || AssetDatabase.Contains(source)) continue;
                if (!persisted.TryGetValue(source, out Material asset))
                {
                    string fileName = $"{ToAssetName(style)}_{materialIndex++:00}_{ToAssetName(source.name)}.mat";
                    string path = $"{MaterialFolder}/{fileName}";
                    asset = AssetDatabase.LoadAssetAtPath<Material>(path);
                    if (asset == null)
                    {
                        asset = new Material(source);
                        AssetDatabase.CreateAsset(asset, path);
                    }
                    else
                    {
                        EditorUtility.CopySerialized(source, asset);
                        EditorUtility.SetDirty(asset);
                    }
                    persisted.Add(source, asset);
                }
                materials[i] = asset;
            }
            renderer.sharedMaterials = materials;
        }
    }

    private static void EnsureFolder(string parent, string name)
    {
        string path = parent + "/" + name;
        if (!AssetDatabase.IsValidFolder(path)) AssetDatabase.CreateFolder(parent, name);
    }

    private static string ToAssetName(string value)
    {
        foreach (char invalid in Path.GetInvalidFileNameChars()) value = value.Replace(invalid, '_');
        return value.Replace(' ', '_');
    }
}
