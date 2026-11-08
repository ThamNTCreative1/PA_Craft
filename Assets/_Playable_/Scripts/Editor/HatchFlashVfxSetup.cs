using UnityEditor;
using UnityEngine;
using UnityEngine.Rendering;

/// <summary>Builds a short radial light flash using native particles, without runtime layout or camera effects.</summary>
public static class HatchFlashVfxSetup
{
    static Material Material(string name, float rays, float glow)
    {
        string path = StealHatchSceneSetup.Output + "/Materials/" + name + ".mat";
        var mat = AssetDatabase.LoadAssetAtPath<Material>(path);
        if (mat == null)
        {
            mat = new Material(Shader.Find("Legacy Shaders/Particles/Alpha Blended"));
            AssetDatabase.CreateAsset(mat, path);
        }
        // Bake the procedural shape in the editor so Luna only samples a texture.
        mat.shader = Shader.Find("Legacy Shaders/Particles/Alpha Blended");
        mat.shaderKeywords = new string[0];
        mat.SetColor("_TintColor", new Color(.35f, .45f, .5f, .35f));
        mat.mainTexture = BakeTexture(name, rays, glow);
        EditorUtility.SetDirty(mat);
        return mat;
    }

    static Texture2D BakeTexture(string name, float rays, float glow)
    {
        const int size = 512;
        string path = StealHatchSceneSetup.Output + "/Materials/" + name + ".png";
        var texture = new Texture2D(size, size, TextureFormat.RGBA32, false);
        var pixels = new Color[size * size];
        for (int y = 0; y < size; y++)
        for (int x = 0; x < size; x++)
        {
            float px = ((x + .5f) / size - .5f) * 2;
            float py = ((y + .5f) / size - .5f) * 2;
            float radius = Mathf.Sqrt(px * px + py * py);
            float sector = (Mathf.Atan2(py, px) + Mathf.PI) * (16f / (2 * Mathf.PI));
            float index = Mathf.Floor(sector);
            float offset = Mathf.Abs(Mathf.Repeat(sector, 1) - .5f);
            float variation = Mathf.Repeat(Mathf.Sin(index * 37.17f + 1.7f) * 43758.5f, 1);
            float progress = Mathf.Clamp01(radius / Mathf.Lerp(.56f, .96f, variation));
            float width = Mathf.Lerp(.07f, .19f, variation) * 2 * Mathf.Lerp(.35f, 1, progress);
            float ray = Mathf.Clamp01(1 - offset / Mathf.Max(.001f, width));
            ray = ray * ray * (1 - Mathf.SmoothStep(0, 1, Mathf.InverseLerp(.78f, 1, progress)));
            float core = Mathf.Exp(-radius * radius * 38);
            float halo = Mathf.Exp(-radius * radius * 7) * .14f;
            float alpha = Mathf.Clamp01((ray * rays + (core + halo) * glow) * Mathf.Clamp01(1 - radius));
            pixels[y * size + x] = new Color(1, 1, 1, alpha);
        }
        texture.SetPixels(pixels);
        texture.Apply();
        System.IO.File.WriteAllBytes(path, texture.EncodeToPNG());
        Object.DestroyImmediate(texture);
        AssetDatabase.ImportAsset(path);
        var importer = (TextureImporter)AssetImporter.GetAtPath(path);
        importer.textureType = TextureImporterType.Default;
        importer.alphaSource = TextureImporterAlphaSource.FromInput;
        importer.alphaIsTransparency = true;
        importer.mipmapEnabled = false;
        importer.wrapMode = TextureWrapMode.Clamp;
        importer.maxTextureSize = size;
        importer.textureCompression = TextureImporterCompression.Compressed;
        importer.SaveAndReimport();
        return AssetDatabase.LoadAssetAtPath<Texture2D>(path);
    }

    [MenuItem("Tools/Playable/Steal and Hatch/Bake Luna Hatch Materials")]
    public static void BakeMaterials()
    {
        Material("Hatch Flash Rays", 3.6f, .7f);
        Material("Hatch Flash Core", 0, 5f);
        Material("Hatch Flash Halo", 0, 1.4f);
        AssetDatabase.SaveAssets();
    }

    static void Layer(Transform parent, string name, Material material, float size, float life, float delay)
    {
        var go = new GameObject(name);
        go.transform.SetParent(parent, false);
        go.transform.localScale = Vector3.one;
        var ps = go.AddComponent<ParticleSystem>();
        ps.Stop(true, ParticleSystemStopBehavior.StopEmittingAndClear);
        var main = ps.main;
        main.duration = .8f;
        main.loop = false;
        main.playOnAwake = true;
        main.startLifetime = life;
        main.startDelay = delay;
        main.startSpeed = 0;
        main.startSize = size;
        main.startColor = new Color(.7f, .9f, 1f, .65f);
        main.maxParticles = 1;
        main.simulationSpace = ParticleSystemSimulationSpace.Local;
        main.scalingMode = ParticleSystemScalingMode.Hierarchy;
        main.cullingMode = ParticleSystemCullingMode.AlwaysSimulate;
        var shape = ps.shape; shape.enabled = false;
        var emission = ps.emission;
        emission.rateOverTime = 0;
        emission.SetBursts(new[] { new ParticleSystem.Burst(0, 1) });
        var sizeOverLife = ps.sizeOverLifetime;
        sizeOverLife.enabled = true;
        sizeOverLife.size = new ParticleSystem.MinMaxCurve(1, new AnimationCurve(
            new Keyframe(0, .22f), new Keyframe(.12f, .9f), new Keyframe(.35f, 1f), new Keyframe(1, 1.15f)));
        var color = ps.colorOverLifetime;
        color.enabled = true;
        var gradient = new Gradient();
        gradient.SetKeys(new[] { new GradientColorKey(Color.white, 0), new GradientColorKey(new Color(1, .88f, .56f), 1) },
            new[] { new GradientAlphaKey(0, 0), new GradientAlphaKey(1, .06f), new GradientAlphaKey(.85f, .28f), new GradientAlphaKey(0, 1) });
        color.color = gradient;
        var renderer = ps.GetComponent<ParticleSystemRenderer>();
        renderer.renderMode = ParticleSystemRenderMode.Billboard;
        renderer.sharedMaterial = material;
        renderer.maxParticleSize = 1f;
        renderer.shadowCastingMode = ShadowCastingMode.Off;
        renderer.receiveShadows = false;
    }

    [MenuItem("Tools/Playable/Steal and Hatch/Build Hatch Flash")]
    public static void Build()
    {
        var root = new GameObject("Hatch Aura");
        root.transform.localScale = Vector3.one;
        try
        {
            Layer(root.transform, "Radial light shafts", Material("Hatch Flash Rays", 3.6f, .7f), 3.2f, .8f, 0);
            Layer(root.transform, "White ignition flash", Material("Hatch Flash Core", 0, 5f), 1.8f, .24f, 0);
            Layer(root.transform, "Soft light afterglow", Material("Hatch Flash Halo", 0, 1.4f), 4.2f, .6f, .04f);
            PrefabUtility.SaveAsPrefabAsset(root, StealHatchSceneSetup.Output + "/Hatch Aura.prefab");
            AssetDatabase.SaveAssets();
        }
        finally { Object.DestroyImmediate(root); }
    }
}
