using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using UnityEditor;
using UnityEditor.SceneManagement;
using UnityEngine;
using UnityEngine.Rendering;
using Object = UnityEngine.Object;

/// <summary>Editor-only converter. Output uses Unity's built-in Standard, never a generated shader.</summary>
public sealed class URPToStandardWindow : EditorWindow
{
    string output = "Assets/StandardConverted";
    bool portableTextures = true;
    Vector2 scroll;
    string report = "Select GameObjects, prefabs, materials, or folders, then Analyze.";

    [MenuItem("Tools/Material/URP to Built-in Standard")]
    public static void Open() => GetWindow<URPToStandardWindow>("URP to Standard");

    void OnGUI()
    {
        EditorGUILayout.LabelField("URP → Built-in Standard", EditorStyles.boldLabel);
        EditorGUILayout.HelpBox("Creates new Standard materials and prefab copies. Scene objects receive the new materials and support Undo. Source material assets stay unchanged. No custom shader is created.", MessageType.Info);
        output = EditorGUILayout.TextField("Output folder", output);
        portableTextures = EditorGUILayout.ToggleLeft("Make procedural textures portable (.legosmart, etc.)", portableTextures);
        EditorGUILayout.HelpBox("Supports URP Lit, Simple Lit, Unlit and Baked Lit. Custom shaders / Shader Graph / world-projection effects are skipped and reported: Standard cannot reproduce their logic automatically. Unlit is approximated with emission. Specular workflow is approximated by metallic Standard.", MessageType.Warning);
        using (new EditorGUI.DisabledScope(EditorApplication.isPlayingOrWillChangePlaymode || EditorApplication.isCompiling))
        {
            if (GUILayout.Button("Analyze selection")) Analyze();
            if (GUILayout.Button("Convert selection to Standard")) ConvertSelection();
            EditorGUILayout.Space();
            EditorGUILayout.LabelField("Project render pipeline", EditorStyles.boldLabel);
            EditorGUILayout.LabelField(GraphicsSettings.currentRenderPipeline ? "SRP active" : "Built-in active");
            EditorGUILayout.HelpBox("Changing pipeline affects every scene. Use this after converting the materials you need.", MessageType.Info);
            if (GUILayout.Button("Set project and all Quality levels to Built-in")) SwitchPipeline();
        }
        scroll = EditorGUILayout.BeginScrollView(scroll);
        EditorGUILayout.TextArea(report, GUILayout.ExpandHeight(true));
        EditorGUILayout.EndScrollView();
    }

    static IEnumerable<Object> Targets()
    {
        var result = new HashSet<Object>();
        foreach (var selected in Selection.objects)
        {
            var path = AssetDatabase.GetAssetPath(selected);
            if (AssetDatabase.IsValidFolder(path))
            {
                foreach (var guid in AssetDatabase.FindAssets("t:Material t:Prefab", new[] { path }))
                    result.Add(AssetDatabase.LoadMainAssetAtPath(AssetDatabase.GUIDToAssetPath(guid)));
            }
            else if (selected is GameObject || selected is Material) result.Add(selected);
        }
        // Avoid converting a child twice when its parent is also selected.
        return result.Where(o => !(o is GameObject g) || !result.OfType<GameObject>().Any(p => p != g && g.transform.IsChildOf(p.transform))).ToArray();
    }

    static IEnumerable<Material> Materials(GameObject root)
    {
        foreach (var r in root.GetComponentsInChildren<Renderer>(true))
            foreach (var m in r.sharedMaterials) if (m) yield return m;
        foreach (var c in root.GetComponentsInChildren<MonoBehaviour>(true))
        {
            if (!c || c.GetType().Name != "SAE_MaterialSwaper") continue;
            var p = new SerializedObject(c).FindProperty("materials");
            if (p == null || !p.isArray) continue;
            for (int i = 0; i < p.arraySize; i++)
                if (p.GetArrayElementAtIndex(i).objectReferenceValue is Material m) yield return m;
        }
    }

    void Analyze()
    {
        var all = new HashSet<Material>();
        foreach (var target in Targets())
            if (target is Material m) all.Add(m);
            else if (target is GameObject g) all.UnionWith(Materials(g));
        report = "Unique materials: " + all.Count + "\n" + string.Join("\n", all.Select(m =>
            (SAE_StandardConversion.Supports(m) ? "SUPPORTED: " : "SKIP: ") + m.name + " — " + (m.shader ? m.shader.name : "Missing shader")));
    }

    void ConvertSelection()
    {
        try
        {
            var targets = Targets().ToArray();
            if (targets.Length == 0) { report = "Select GameObjects, prefabs, materials, or folders first."; return; }
            var converter = new SAE_StandardConversion(output, portableTextures);
            Undo.IncrementCurrentGroup();
            int undo = Undo.GetCurrentGroup();
            Undo.SetCurrentGroupName("Convert to Built-in Standard");
            try
            {
                foreach (var target in targets)
                {
                    if (target is Material material) { converter.Convert(material); continue; }
                    var go = target as GameObject;
                    if (!go) continue;
                    if (EditorUtility.IsPersistent(go))
                    {
                        string source = AssetDatabase.GetAssetPath(go);
                        if (!source.EndsWith(".prefab", StringComparison.OrdinalIgnoreCase))
                        { converter.Messages.Add("SKIP model asset: drag it into a scene first: " + source); continue; }
                        var contents = PrefabUtility.LoadPrefabContents(source);
                        try
                        {
                            converter.ConvertHierarchy(contents);
                            // Flatten nested/variant prefab links so the copy does not depend on old URP material overrides.
                            if (PrefabUtility.IsPartOfPrefabInstance(contents))
                                PrefabUtility.UnpackPrefabInstance(contents, PrefabUnpackMode.Completely, InteractionMode.AutomatedAction);
                            PrefabUtility.SaveAsPrefabAsset(contents, AssetDatabase.GenerateUniqueAssetPath(converter.Output + "/" + SafeName(go.name) + "_Standard.prefab"));
                        }
                        finally { PrefabUtility.UnloadPrefabContents(contents); }
                    }
                    else
                    {
                        converter.ConvertHierarchy(go);
                        EditorSceneManager.MarkSceneDirty(go.scene);
                    }
                }
                AssetDatabase.SaveAssets();
                report = "Created " + converter.MaterialCount + " Standard materials and " + converter.TextureCount + " portable textures.\nScene changes can be undone; created assets remain in " + converter.Output + ".\n" + string.Join("\n", converter.Messages);
            }
            finally { Undo.CollapseUndoOperations(undo); }
        }
        catch (Exception e) { report = "Stopped: " + e.Message + "\nCompleted assets remain in the output folder."; Debug.LogException(e); }
    }

    internal static string SafeName(string name)
    {
        foreach (char c in Path.GetInvalidFileNameChars()) name = name.Replace(c, '_');
        return name.Replace('/', '_').Replace('\\', '_');
    }

    void SwitchPipeline()
    {
        // Project settings have broader scope than a selected object's conversion.
        if (!EditorUtility.DisplayDialog("Switch entire project to Built-in?", "All scenes and Quality levels will use Built-in. Any remaining URP materials may stop rendering. A settings backup will be saved outside Assets.", "Switch", "Cancel")) return;
        string backup = "StandardConversionBackups/" + DateTime.Now.ToString("yyyyMMdd_HHmmss_fff");
        Directory.CreateDirectory(backup);
        File.Copy("ProjectSettings/GraphicsSettings.asset", backup + "/GraphicsSettings.asset");
        File.Copy("ProjectSettings/QualitySettings.asset", backup + "/QualitySettings.asset");
        var quality = new SerializedObject(AssetDatabase.LoadAllAssetsAtPath("ProjectSettings/QualitySettings.asset")[0]);
        var levels = quality.FindProperty("m_QualitySettings");
        for (int i = 0; i < levels.arraySize; i++)
            levels.GetArrayElementAtIndex(i).FindPropertyRelative("customRenderPipeline").objectReferenceValue = null;
        quality.ApplyModifiedProperties();
        QualitySettings.renderPipeline = null;
        GraphicsSettings.defaultRenderPipeline = null;
        AssetDatabase.SaveAssets();
        report = "Project now uses Built-in. Settings backup: " + backup;
    }
}

public sealed class SAE_StandardConversion
{
    public readonly string Output;
    public readonly List<string> Messages = new List<string>();
    readonly bool portable;
    readonly Dictionary<Material, Material> materials = new Dictionary<Material, Material>();
    readonly Dictionary<Texture, Texture> textures = new Dictionary<Texture, Texture>();
    public int MaterialCount => materials.Count;
    public int TextureCount => textures.Count;

    public SAE_StandardConversion(string folder, bool portableTextures)
    {
        folder = folder.Replace('\\', '/').TrimEnd('/');
        if (!folder.StartsWith("Assets/", StringComparison.Ordinal) || folder.Split('/').Any(p => p == ".." || p == "." || string.IsNullOrWhiteSpace(p)))
            throw new ArgumentException("Output must be a folder inside Assets, e.g. Assets/StandardConverted.");
        Output = folder;
        portable = portableTextures;
        EnsureFolder(Output + "/Materials");
        EnsureFolder(Output + "/Textures");
    }

    static void EnsureFolder(string path)
    {
        if (AssetDatabase.IsValidFolder(path)) return;
        string parent = path.Substring(0, path.LastIndexOf('/'));
        EnsureFolder(parent);
        AssetDatabase.CreateFolder(parent, path.Substring(path.LastIndexOf('/') + 1));
    }

    public static bool Supports(Material material)
    {
        if (!material || !material.shader) return false;
        switch (material.shader.name)
        {
            case "Standard":
            case "Standard (Specular setup)":
            case "Universal Render Pipeline/Lit":
            case "Universal Render Pipeline/Simple Lit":
            case "Universal Render Pipeline/Unlit":
            case "Universal Render Pipeline/Baked Lit": return true;
            default: return false;
        }
    }

    public void ConvertHierarchy(GameObject root)
    {
        foreach (var renderer in root.GetComponentsInChildren<Renderer>(true))
        {
            var slots = renderer.sharedMaterials;
            for (int i = 0; i < slots.Length; i++) slots[i] = Convert(slots[i]);
            Undo.RecordObject(renderer, "Assign Standard materials");
            renderer.sharedMaterials = slots;
            EditorUtility.SetDirty(renderer);
            PrefabUtility.RecordPrefabInstancePropertyModifications(renderer);
        }
        foreach (var component in root.GetComponentsInChildren<MonoBehaviour>(true))
        {
            if (!component || component.GetType().Name != "SAE_MaterialSwaper") continue;
            var so = new SerializedObject(component);
            var palette = so.FindProperty("materials");
            if (palette == null || !palette.isArray) continue;
            for (int i = 0; i < palette.arraySize; i++)
            {
                var entry = palette.GetArrayElementAtIndex(i);
                entry.objectReferenceValue = Convert(entry.objectReferenceValue as Material);
            }
            so.ApplyModifiedProperties();
            PrefabUtility.RecordPrefabInstancePropertyModifications(component);
        }
    }

    static float Float(Material m, string p, float fallback = 0) => m.HasProperty(p) ? m.GetFloat(p) : fallback;
    static Color ColorValue(Material m, string p, Color fallback) => m.HasProperty(p) ? m.GetColor(p) : fallback;

    public Material Convert(Material source)
    {
        if (!source) { Messages.Add("SKIP missing material slot."); return null; }
        if (materials.TryGetValue(source, out var cached)) return cached;
        if (!Supports(source)) { Messages.Add("SKIP unsupported shader: " + source.name + " / " + (source.shader ? source.shader.name : "missing")); return source; }
        bool urp = source.shader.name.StartsWith("Universal Render Pipeline/");
        bool unlit = source.shader.name.EndsWith("/Unlit");
        bool specular = source.shader.name == "Standard (Specular setup)" || (source.shader.name.EndsWith("/Lit") && Float(source, "_WorkflowMode", 1) == 0);
        var target = new Material(Shader.Find("Standard")) { name = source.name.Replace(" (Instance)", ""), enableInstancing = source.enableInstancing, doubleSidedGI = source.doubleSidedGI };
        string baseMap = urp ? "_BaseMap" : "_MainTex";
        var color = ColorValue(source, urp ? "_BaseColor" : "_Color", Color.white);
        target.SetColor("_Color", color);
        CopyTexture(source, baseMap, target, "_MainTex");
        target.SetFloat("_Metallic", specular ? 0 : Float(source, "_Metallic"));
        float smoothness = Float(source, urp ? "_Smoothness" : "_Glossiness", 0.5f);
        target.SetFloat("_Glossiness", smoothness);
        target.SetFloat("_GlossMapScale", smoothness);
        CopyTexture(source, "_MetallicGlossMap", target, "_MetallicGlossMap");
        if (!specular && target.GetTexture("_MetallicGlossMap")) target.EnableKeyword("_METALLICGLOSSMAP");
        if (specular) Messages.Add("Approximation: specular workflow → dielectric Standard: " + source.name);
        CopyTexture(source, "_BumpMap", target, "_BumpMap");
        target.SetFloat("_BumpScale", Float(source, "_BumpScale", 1));
        if (target.GetTexture("_BumpMap")) target.EnableKeyword("_NORMALMAP");
        CopyTexture(source, "_OcclusionMap", target, "_OcclusionMap");
        target.SetFloat("_OcclusionStrength", Float(source, "_OcclusionStrength", 1));
        CopyTexture(source, "_ParallaxMap", target, "_ParallaxMap");
        target.SetFloat("_Parallax", Float(source, "_Parallax", 0.02f));
        if (target.GetTexture("_ParallaxMap")) target.EnableKeyword("_PARALLAXMAP");
        foreach (string p in new[] { "_DetailAlbedoMap", "_DetailNormalMap", "_DetailMask" }) CopyTexture(source, p, target, p);
        target.SetFloat("_DetailNormalMapScale", Float(source, "_DetailNormalMapScale", 1));
        target.SetFloat("_UVSec", Float(source, "_UVSec"));
        if (target.GetTexture("_DetailAlbedoMap") || target.GetTexture("_DetailNormalMap")) target.EnableKeyword("_DETAIL_MULX2");
        bool emission = source.IsKeywordEnabled("_EMISSION") || unlit;
        CopyTexture(source, unlit ? baseMap : "_EmissionMap", target, "_EmissionMap");
        target.SetColor("_EmissionColor", unlit ? color : ColorValue(source, "_EmissionColor", Color.black));
        if (unlit) { target.SetColor("_Color", new Color(0, 0, 0, color.a)); target.SetFloat("_Glossiness", 0); Messages.Add("Approximation: Unlit → emissive Standard: " + source.name); }
        if (emission) target.EnableKeyword("_EMISSION");
        target.globalIlluminationFlags = emission ? source.globalIlluminationFlags & ~MaterialGlobalIlluminationFlags.EmissiveIsBlack : MaterialGlobalIlluminationFlags.EmissiveIsBlack;
        if (Float(source, "_SpecularHighlights", 1) == 0 || unlit) target.EnableKeyword("_SPECULARHIGHLIGHTS_OFF");
        if (Float(source, urp ? "_EnvironmentReflections" : "_GlossyReflections", 1) == 0 || unlit) target.EnableKeyword("_GLOSSYREFLECTIONS_OFF");
        if (Float(source, "_SmoothnessTextureChannel") == 1) target.EnableKeyword("_SMOOTHNESS_TEXTURE_ALBEDO_CHANNEL_A");
        int mode = urp ? (Float(source, "_Surface") > 0 ? (Float(source, "_Blend") == 1 ? 3 : 2) : Float(source, "_AlphaClip") > 0 ? 1 : 0) : (int)Float(source, "_Mode");
        SetMode(target, mode);
        target.SetFloat("_Cutoff", Float(source, "_Cutoff", 0.5f));
        if (urp && Float(source, "_Surface") > 0 && Float(source, "_Blend") >= 2) Messages.Add("Approximation: additive/multiply → alpha transparency: " + source.name);
        if (urp && Float(source, "_Cull", 2) != 2) Messages.Add("Standard is back-face culled; double-sided/front-cull not reproduced: " + source.name);
        if (Float(source, "_ClearCoatMask") > 0) Messages.Add("Standard does not reproduce clear coat: " + source.name);
        var queueProperty = new SerializedObject(source).FindProperty("m_CustomRenderQueue");
        if (queueProperty != null && queueProperty.intValue >= 0)
            target.renderQueue = queueProperty.intValue;
        AssetDatabase.CreateAsset(target, AssetDatabase.GenerateUniqueAssetPath(Output + "/Materials/" + URPToStandardWindow.SafeName(target.name) + ".mat"));
        materials.Add(source, target);
        return target;
    }

    static void SetMode(Material m, int mode)
    {
        m.SetFloat("_Mode", mode);
        m.SetOverrideTag("RenderType", mode == 0 ? "Opaque" : mode == 1 ? "TransparentCutout" : "Transparent");
        m.SetInt("_SrcBlend", (int)(mode == 2 ? BlendMode.SrcAlpha : BlendMode.One));
        m.SetInt("_DstBlend", (int)(mode >= 2 ? BlendMode.OneMinusSrcAlpha : BlendMode.Zero));
        m.SetInt("_ZWrite", mode >= 2 ? 0 : 1);
        if (mode == 1) m.EnableKeyword("_ALPHATEST_ON");
        if (mode == 2) m.EnableKeyword("_ALPHABLEND_ON");
        if (mode == 3) m.EnableKeyword("_ALPHAPREMULTIPLY_ON");
        m.renderQueue = mode >= 2 ? 3000 : mode == 1 ? 2450 : -1;
    }

    void CopyTexture(Material from, string sourceProperty, Material to, string destination)
    {
        if (!from.HasProperty(sourceProperty)) return;
        var texture = from.GetTexture(sourceProperty);
        if (texture && portable)
        {
            string path = AssetDatabase.GetAssetPath(texture);
            // Native texture files and .asset files are already portable. Scripted imports need their generated output detached.
            bool procedural = string.IsNullOrEmpty(path) || AssetImporter.GetAtPath(path) is UnityEditor.AssetImporters.ScriptedImporter;
            if (procedural && texture is Texture2D)
            {
                if (!textures.TryGetValue(texture, out var copy))
                {
                    copy = Object.Instantiate(texture);
                    copy.name = texture.name;
                    copy.hideFlags = HideFlags.None;
                    AssetDatabase.CreateAsset(copy, AssetDatabase.GenerateUniqueAssetPath(Output + "/Textures/" + URPToStandardWindow.SafeName(copy.name) + ".asset"));
                    textures.Add(texture, copy);
                }
                texture = copy;
            }
            else if (procedural) Messages.Add("Texture requires manual export (not Texture2D): " + texture.name);
        }
        to.SetTexture(destination, texture);
        to.SetTextureScale(destination, from.GetTextureScale(sourceProperty));
        to.SetTextureOffset(destination, from.GetTextureOffset(sourceProperty));
    }
}
