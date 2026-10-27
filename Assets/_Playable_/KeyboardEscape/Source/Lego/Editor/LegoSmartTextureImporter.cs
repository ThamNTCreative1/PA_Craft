using UnityEditor;
using UnityEditor.AssetImporters;
using UnityEngine;

[ScriptedImporter(5, "legosmart")]
public sealed class LegoSmartTextureImporter : ScriptedImporter
{
    public Texture2D baseMap;
    public Texture2D detailMap;
    [Range(0f, 1f)] public float detailAlpha = 1f;
    public Color tint = Color.white;
    public int outputSize;
    public bool generateMipMaps = true;
    public bool sRGB = true;
    public FilterMode filterMode = FilterMode.Bilinear;
    public TextureWrapMode wrapMode = TextureWrapMode.Repeat;

    public bool bakeFakeNormal;
    public Texture2D normalMap;
    public Vector3 fakeLightDirection = new Vector3(0.35f, 0.8f, 0.45f);
    [Range(0f, 1f)] public float ambient = 0.35f;
    [Range(0f, 2f)] public float normalStrength = 0.5f;

    public bool adjustHsl;
    [Range(-180f, 180f)] public float hueShift;
    [Range(0f, 2f)] public float saturation = 1f;
    [Range(0f, 2f)] public float lightness = 1f;

    public override void OnImportAsset(AssetImportContext context)
    {
        RegisterDependency(context, baseMap);
        RegisterDependency(context, detailMap);
        RegisterDependency(context, normalMap);

        Texture2D texture = LegoSmartTextureBakeUtility.Bake(new LegoSmartTextureBakeUtility.BakeSettings
        {
            BaseMap = baseMap,
            DetailMap = detailMap,
            DetailAlpha = detailAlpha,
            Tint = tint,
            OutputSize = outputSize,
            GenerateMipMaps = generateMipMaps,
            SRGB = sRGB,
            BakeFakeNormal = bakeFakeNormal,
            NormalMap = normalMap,
            FakeLightDirection = fakeLightDirection,
            Ambient = ambient,
            NormalStrength = normalStrength,
            AdjustHsl = adjustHsl,
            HueShift = hueShift,
            Saturation = saturation,
            Lightness = lightness
        });

        texture.name = System.IO.Path.GetFileNameWithoutExtension(context.assetPath);
        texture.filterMode = filterMode;
        texture.wrapMode = wrapMode;

        context.AddObjectToAsset("main", texture);
        context.SetMainObject(texture);
    }

    private static void RegisterDependency(AssetImportContext context, Texture2D texture)
    {
        if (texture == null)
            return;

        string path = AssetDatabase.GetAssetPath(texture);
        if (string.IsNullOrEmpty(path))
            return;

        context.DependsOnArtifact(path);
    }

    [MenuItem("Assets/Create/Lego/Smart Texture", priority = 301)]
    private static void CreateSmartTextureAsset()
    {
        string folder = GetSelectedFolder();
        string path = AssetDatabase.GenerateUniqueAssetPath($"{folder}/New Lego Smart Texture.legosmart");
        System.IO.File.WriteAllText(path, string.Empty);
        AssetDatabase.ImportAsset(path);
        Object asset = AssetDatabase.LoadMainAssetAtPath(path);
        ProjectWindowUtil.ShowCreatedAsset(asset);
    }

    private static string GetSelectedFolder()
    {
        Object selected = Selection.activeObject;
        if (selected == null)
            return "Assets";

        string path = AssetDatabase.GetAssetPath(selected);
        if (string.IsNullOrEmpty(path))
            return "Assets";

        if (System.IO.Directory.Exists(path))
            return path;

        string folder = System.IO.Path.GetDirectoryName(path)?.Replace('\\', '/');
        return string.IsNullOrEmpty(folder) ? "Assets" : folder;
    }
}
