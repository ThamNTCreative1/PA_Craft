using System;
using System.IO;
using System.Linq;
using TMPro;
using UnityEditor;
using UnityEditor.SceneManagement;
using UnityEngine;
using UnityEngine.UI;

// Every text uses MuseoSans Rounded (the original game's font). Only references to the old FFFFORWA font are
// replaced, so texts already on MuseoSans keep their preset materials (rarity gradients, outlines).
public static class StealEggFontSetup
{
    const string MuseoFolder="Assets/TextMesh Pro/Fonts/Customs/museo-sans-rounded-cufonfonts/";
    const string OldFont="Assets/01 RESOURCES/FFFFORWA.TTF", OldSdf="Assets/01 RESOURCES/FFFFORWA SDF.asset";

    [MenuItem("Steal Egg/Use MuseoSans fonts")]
    public static void Apply()
    {
        if (EditorApplication.isPlaying) throw new InvalidOperationException("Exit Play Mode first.");
        LoadFonts(out Font font, out TMP_FontAsset sdf, out Font oldFont, out TMP_FontAsset oldSdf);
        FillAtlas(sdf);
        int count = 0;
        // Prefabs: rewrite the serialized references in place (imported source prefabs can hold missing scripts).
        AssetDatabase.TryGetGUIDAndLocalFileIdentifier(oldSdf.material, out string oldMatGuid, out long oldMatId);
        AssetDatabase.TryGetGUIDAndLocalFileIdentifier(sdf.material, out string matGuid, out long matId);
        string oldSdfGuid = Guid(oldSdf), sdfGuid = Guid(sdf), oldFontGuid = Guid(oldFont), fontGuid = Guid(font);
        foreach (string guid in AssetDatabase.FindAssets("t:Prefab", new[] { "Assets" }))
        {
            string path = AssetDatabase.GUIDToAssetPath(guid);
            string original = File.ReadAllText(path);
            if (!original.Contains(oldSdfGuid) && !original.Contains(oldFontGuid) && !original.Contains(oldMatGuid)) continue;
            string updated = original
                .Replace("fileID: 11400000, guid: " + oldSdfGuid, "fileID: 11400000, guid: " + sdfGuid)
                .Replace("fileID: " + oldMatId + ", guid: " + oldMatGuid, "fileID: " + matId + ", guid: " + matGuid)
                .Replace("guid: " + oldFontGuid + ", type: 3", "guid: " + fontGuid + ", type: 3");
            if (updated == original) continue;
            File.WriteAllText(path, updated);
            count++;
        }
        AssetDatabase.Refresh();
        var scene = UnityEngine.SceneManagement.SceneManager.GetActiveScene();
        int changed = ApplyToScene(scene);
        if (changed > 0) EditorSceneManager.SaveScene(scene);
        var settings = AssetDatabase.LoadAssetAtPath<TMP_Settings>("Assets/TextMesh Pro/Resources/TMP Settings.asset");
        if (settings)
        {
            var serialized = new SerializedObject(settings);
            serialized.FindProperty("m_defaultFontAsset").objectReferenceValue = sdf;
            serialized.ApplyModifiedPropertiesWithoutUndo();
        }
        AssetDatabase.SaveAssets();
        Debug.Log("MuseoSans applied: " + count + " prefabs, " + changed + " scene texts.");
    }

    // Used by the full-game bake after the original UI is rebuilt.
    public static int ApplyToScene(UnityEngine.SceneManagement.Scene scene)
    {
        LoadFonts(out Font font, out TMP_FontAsset sdf, out Font oldFont, out TMP_FontAsset oldSdf);
        int count = 0;
        foreach (var root in scene.GetRootGameObjects())
        {
            foreach (var text in root.GetComponentsInChildren<TMP_Text>(true))
            {
                if (text.font && text.font != oldSdf) continue;
                text.font = sdf; text.fontSharedMaterial = sdf.material;
                EditorUtility.SetDirty(text); count++;
            }
            foreach (var text in root.GetComponentsInChildren<Text>(true))
            {
                if (text.font == font) continue;
                text.font = font;
                EditorUtility.SetDirty(text); count++;
            }
            foreach (var game in root.GetComponentsInChildren<StealEggGame>(true))
            {
                if (game.uiFont == font) continue;
                game.uiFont = font;
                EditorUtility.SetDirty(game); count++;
            }
        }
        if (count > 0) EditorSceneManager.MarkSceneDirty(scene);
        return count;
    }

    public static Font MuseoFont => AssetDatabase.LoadAssetAtPath<Font>(MuseoFolder + "MuseoSansRounded1000.otf");

    static void LoadFonts(out Font font, out TMP_FontAsset sdf, out Font oldFont, out TMP_FontAsset oldSdf)
    {
        font = MuseoFont;
        sdf = AssetDatabase.LoadAssetAtPath<TMP_FontAsset>(MuseoFolder + "MuseoSansRounded1000 SDF.asset");
        oldFont = AssetDatabase.LoadAssetAtPath<Font>(OldFont);
        oldSdf = AssetDatabase.LoadAssetAtPath<TMP_FontAsset>(OldSdf);
        if (!font || !sdf || !oldFont || !oldSdf) throw new InvalidOperationException("Missing MuseoSans or FFFFORWA font assets.");
    }

    // The playable cannot grow a dynamic atlas at runtime: bake every printable ASCII glyph and freeze it.
    static void FillAtlas(TMP_FontAsset sdf)
    {
        string ascii = new string(Enumerable.Range(32, 95).Select(c => (char)c).ToArray());
        if (sdf.atlasPopulationMode != AtlasPopulationMode.Static || !sdf.HasCharacters(ascii))
        {
            sdf.atlasPopulationMode = AtlasPopulationMode.Dynamic;
            sdf.TryAddCharacters(ascii, out string missing);
            if (!string.IsNullOrEmpty(missing)) Debug.LogWarning("MuseoSans lacks: " + missing);
            sdf.atlasPopulationMode = AtlasPopulationMode.Static;
            EditorUtility.SetDirty(sdf);
        }
    }

    static string Guid(UnityEngine.Object asset) => AssetDatabase.AssetPathToGUID(AssetDatabase.GetAssetPath(asset));
}
