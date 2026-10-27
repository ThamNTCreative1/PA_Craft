using System.IO;
using UnityEditor;
using UnityEngine;

public static class LegoSmartTextureBakeUtility
{
    public struct BakeSettings
    {
        public Texture2D BaseMap;
        public Texture2D DetailMap;
        public float DetailAlpha;
        public Color Tint;
        public int OutputSize;
        public bool GenerateMipMaps;
        public bool SRGB;

        public bool BakeFakeNormal;
        public Texture2D NormalMap;
        public Vector3 FakeLightDirection;
        public float Ambient;
        public float NormalStrength;

        public bool AdjustHsl;
        public float HueShift;
        public float Saturation;
        public float Lightness;
    }

    public static Texture2D Bake(BakeSettings settings)
    {
        int size = ResolveOutputSize(settings.BaseMap, settings.OutputSize);
        Texture2D baseReadable = null;
        Texture2D detailReadable = null;
        Texture2D normalReadable = null;

        try
        {
            baseReadable = settings.BaseMap != null
                ? CopyTextureReadable(settings.BaseMap, size, settings.SRGB)
                : CreateSolidColor(size, Color.white, settings.SRGB);

            bool hasDetail = settings.DetailMap != null;
            detailReadable = hasDetail
                ? CopyTextureReadable(settings.DetailMap, size, settings.SRGB)
                : null;

            bool useFakeNormal = settings.BakeFakeNormal && settings.NormalMap != null;
            if (useFakeNormal)
                normalReadable = CopyTextureReadable(settings.NormalMap, size, false);

            Color[] basePixels = baseReadable.GetPixels();
            Color[] detailPixels = hasDetail ? detailReadable.GetPixels() : null;
            Color[] normalPixels = useFakeNormal ? normalReadable.GetPixels() : null;
            Color[] result = new Color[basePixels.Length];

            Vector3 lightDir = settings.FakeLightDirection.sqrMagnitude > 0.0001f
                ? settings.FakeLightDirection.normalized
                : new Vector3(0.35f, 0.8f, 0.45f).normalized;
            float ambient = Mathf.Clamp01(settings.Ambient);
            float strength = Mathf.Max(0f, settings.NormalStrength);
            float detailAlpha = Mathf.Clamp01(settings.DetailAlpha);
            Color tint = settings.Tint;

            for (int i = 0; i < result.Length; i++)
            {
                Color color = basePixels[i];
                if (hasDetail)
                {
                    float alpha = Mathf.Clamp01(detailPixels[i].a * detailAlpha);
                    Color multiplied = basePixels[i] * detailPixels[i];
                    color = Color.Lerp(basePixels[i], multiplied, alpha);
                }

                color *= tint;

                if (useFakeNormal)
                {
                    float shade = EvaluateFakeNormalShade(normalPixels[i], lightDir, ambient, strength);
                    color.r *= shade;
                    color.g *= shade;
                    color.b *= shade;
                }

                if (settings.AdjustHsl)
                    color = ApplyHsl(color, settings.HueShift, settings.Saturation, settings.Lightness);

                result[i] = color;
            }

            Texture2D texture = new Texture2D(size, size, TextureFormat.RGBA32, settings.GenerateMipMaps, !settings.SRGB);
            texture.SetPixels(result);
            texture.Apply(settings.GenerateMipMaps, false);
            return texture;
        }
        finally
        {
            DestroyTemp(baseReadable);
            DestroyTemp(detailReadable);
            DestroyTemp(normalReadable);
        }
    }

    private static Color ApplyHsl(Color color, float hueShift, float saturation, float lightness)
    {
        RgbToHsl(color, out float h, out float s, out float l);
        h = Mathf.Repeat(h + hueShift / 360f, 1f);
        s = Mathf.Clamp01(s * saturation);
        l = Mathf.Clamp01(l * lightness);
        return HslToRgb(h, s, l, color.a);
    }

    public static void RgbToHsl(Color color, out float h, out float s, out float l)
    {
        float r = color.r;
        float g = color.g;
        float b = color.b;
        float max = Mathf.Max(r, Mathf.Max(g, b));
        float min = Mathf.Min(r, Mathf.Min(g, b));
        l = (max + min) * 0.5f;

        float delta = max - min;
        if (delta <= 0.00001f)
        {
            h = 0f;
            s = 0f;
            return;
        }

        s = l > 0.5f ? delta / (2f - max - min) : delta / Mathf.Max(0.00001f, max + min);
        if (Mathf.Approximately(max, r))
            h = (g - b) / delta + (g < b ? 6f : 0f);
        else if (Mathf.Approximately(max, g))
            h = (b - r) / delta + 2f;
        else
            h = (r - g) / delta + 4f;

        h /= 6f;
    }

    private static Color HslToRgb(float h, float s, float l, float a)
    {
        float r;
        float g;
        float b;
        if (s <= 0.00001f)
        {
            r = g = b = l;
        }
        else
        {
            float q = l < 0.5f ? l * (1f + s) : l + s - l * s;
            float p = 2f * l - q;
            r = HueToRgb(p, q, h + 1f / 3f);
            g = HueToRgb(p, q, h);
            b = HueToRgb(p, q, h - 1f / 3f);
        }

        return new Color(r, g, b, a);
    }

    private static float HueToRgb(float p, float q, float t)
    {
        if (t < 0f)
            t += 1f;
        if (t > 1f)
            t -= 1f;
        if (t < 1f / 6f)
            return p + (q - p) * 6f * t;
        if (t < 0.5f)
            return q;
        if (t < 2f / 3f)
            return p + (q - p) * (2f / 3f - t) * 6f;
        return p;
    }

    private static float EvaluateFakeNormalShade(Color packedNormal, Vector3 lightDir, float ambient, float strength)
    {
        Vector3 normal = UnpackNormal(packedNormal);
        normal.x *= strength;
        normal.y *= strength;
        normal.z = Mathf.Lerp(1f, normal.z, Mathf.Clamp01(strength));
        normal.Normalize();

        float ndotl = Mathf.Max(0f, Vector3.Dot(normal, lightDir));
        return ambient + (1f - ambient) * ndotl;
    }

    /// <summary>
    /// Matches Unity UnpackNormalmapRGorAG so both RGB source PNGs and DXT5nm GPU blits decode correctly.
    /// </summary>
    private static Vector3 UnpackNormal(Color packed)
    {
        float x = packed.r * packed.a * 2f - 1f;
        float y = packed.g * 2f - 1f;
        float z = Mathf.Sqrt(Mathf.Max(0f, 1f - x * x - y * y));
        return new Vector3(x, y, z).normalized;
    }

    private static int ResolveOutputSize(Texture2D baseMap, int outputSize)
    {
        if (outputSize > 0)
            return Mathf.ClosestPowerOfTwo(outputSize);

        if (baseMap != null)
            return Mathf.ClosestPowerOfTwo(Mathf.Max(baseMap.width, baseMap.height));

        return 256;
    }

    private static Texture2D CopyTextureReadable(Texture source, int size, bool sRGB)
    {
        Texture2D fromFile = TryLoadSourceFile(source as Texture2D, sRGB);
        if (fromFile != null)
        {
            Texture2D resized = ResizeReadable(fromFile, size, sRGB);
            DestroyTemp(fromFile);
            return resized;
        }

        return BlitTextureReadable(source, size, sRGB);
    }

    private static Texture2D TryLoadSourceFile(Texture2D texture, bool sRGB)
    {
        if (texture == null)
            return null;

        string path = AssetDatabase.GetAssetPath(texture);
        if (string.IsNullOrEmpty(path) || !File.Exists(path))
            return null;

        string extension = Path.GetExtension(path).ToLowerInvariant();
        if (extension != ".png" && extension != ".jpg" && extension != ".jpeg" && extension != ".tga")
            return null;

        byte[] bytes = File.ReadAllBytes(path);
        Texture2D loaded = new Texture2D(2, 2, TextureFormat.RGBA32, false, !sRGB);
        if (!ImageConversion.LoadImage(loaded, bytes, false))
        {
            DestroyTemp(loaded);
            return null;
        }

        return loaded;
    }

    private static Texture2D ResizeReadable(Texture2D source, int size, bool sRGB)
    {
        if (source.width == size && source.height == size)
            return CloneReadable(source, sRGB);

        return BlitTextureReadable(source, size, sRGB);
    }

    private static Texture2D CloneReadable(Texture2D source, bool sRGB)
    {
        Texture2D clone = new Texture2D(source.width, source.height, TextureFormat.RGBA32, false, !sRGB);
        clone.SetPixels(source.GetPixels());
        clone.Apply(false, false);
        return clone;
    }

    private static Texture2D BlitTextureReadable(Texture source, int size, bool sRGB)
    {
        RenderTextureReadWrite readWrite = sRGB ? RenderTextureReadWrite.sRGB : RenderTextureReadWrite.Linear;
        RenderTexture renderTexture = RenderTexture.GetTemporary(size, size, 0, RenderTextureFormat.ARGB32, readWrite);
        Graphics.Blit(source, renderTexture);

        Texture2D readable = new Texture2D(size, size, TextureFormat.RGBA32, false, !sRGB);
        RenderTexture previous = RenderTexture.active;
        RenderTexture.active = renderTexture;
        readable.ReadPixels(new Rect(0, 0, size, size), 0, 0);
        readable.Apply(false, false);
        RenderTexture.active = previous;
        RenderTexture.ReleaseTemporary(renderTexture);
        return readable;
    }

    private static Texture2D CreateSolidColor(int size, Color color, bool sRGB)
    {
        Texture2D texture = new Texture2D(size, size, TextureFormat.RGBA32, false, !sRGB);
        Color[] pixels = new Color[size * size];
        for (int i = 0; i < pixels.Length; i++)
            pixels[i] = color;
        texture.SetPixels(pixels);
        texture.Apply(false, false);
        return texture;
    }

    private static void DestroyTemp(Object obj)
    {
        if (obj != null)
            Object.DestroyImmediate(obj);
    }
}
