using System.IO;
using UnityEditor;
using UnityEngine;

namespace Playable.EditorTools
{
    // Renders a model to a transparent PNG for the picker cards (editor only, not in build).
    public static class IconSnapshotTool
    {
        private const int Layer = 31;

        public static void Capture(GameObject source, string pngPath, Vector3 viewEuler, int size = 256, float padding = 1.15f)
        {
            Capture(source, pngPath, viewEuler, null, size, padding);
        }

        // overrideColor: renders with a lit Standard material of that colour (for untextured models).
        public static void Capture(GameObject source, string pngPath, Vector3 viewEuler, Color? overrideColor, int size = 256, float padding = 1.15f)
        {
            var root = Object.Instantiate(source);
            root.hideFlags = HideFlags.HideAndDontSave;
            root.transform.position = new Vector3(0f, -5000f, 0f);
            root.transform.rotation = Quaternion.identity;
            foreach (var t in root.GetComponentsInChildren<Transform>(true)) t.gameObject.layer = Layer;
            foreach (var a in root.GetComponentsInChildren<Animator>(true)) a.enabled = false;

            var renderers = root.GetComponentsInChildren<Renderer>(true);
            Material litMat = null;
            GameObject lightGo = null;
            if (overrideColor.HasValue)
            {
                litMat = new Material(Shader.Find("Standard")) { color = overrideColor.Value };
                litMat.SetFloat("_Glossiness", 0.1f);
                foreach (var r in renderers)
                {
                    var mats = new Material[r.sharedMaterials.Length];
                    for (int i = 0; i < mats.Length; i++) mats[i] = litMat;
                    r.sharedMaterials = mats;
                }
                lightGo = new GameObject("IconLight") { hideFlags = HideFlags.HideAndDontSave };
                var light = lightGo.AddComponent<Light>();
                light.type = LightType.Directional;
                light.intensity = 1.1f;
                light.cullingMask = 1 << Layer;
                light.shadows = LightShadows.None;
                lightGo.transform.rotation = Quaternion.Euler(viewEuler.x + 35f, viewEuler.y - 40f, 0f);
            }
            var bounds = renderers[0].bounds;
            foreach (var r in renderers) bounds.Encapsulate(r.bounds);

            var camGo = new GameObject("IconCam") { hideFlags = HideFlags.HideAndDontSave };
            var cam = camGo.AddComponent<Camera>();
            cam.cullingMask = 1 << Layer;
            cam.clearFlags = CameraClearFlags.SolidColor;
            cam.backgroundColor = new Color(0f, 0f, 0f, 0f);
            cam.orthographic = true;
            cam.nearClipPlane = 0.01f;
            cam.farClipPlane = 1000f;
            Quaternion rot = Quaternion.Euler(viewEuler);
            float radius = bounds.extents.magnitude;
            cam.transform.rotation = rot;
            cam.transform.position = bounds.center - rot * Vector3.forward * (radius * 4f);

            // Fit the projected bounds tightly.
            float maxX = 0f, maxY = 0f;
            Vector3 c = bounds.center, e = bounds.extents;
            for (int i = 0; i < 8; i++)
            {
                var corner = c + Vector3.Scale(e, new Vector3((i & 1) == 0 ? -1 : 1, (i & 2) == 0 ? -1 : 1, (i & 4) == 0 ? -1 : 1));
                var local = cam.transform.InverseTransformPoint(corner);
                local -= cam.transform.InverseTransformPoint(c);
                maxX = Mathf.Max(maxX, Mathf.Abs(local.x));
                maxY = Mathf.Max(maxY, Mathf.Abs(local.y));
            }
            cam.orthographicSize = Mathf.Max(maxX, maxY) * padding;

            // Render on black and on white; alpha = 1 - (white - black). Works for any shader's alpha output.
            var ambient = RenderSettings.ambientLight;
            var ambientMode = RenderSettings.ambientMode;
            RenderSettings.ambientMode = UnityEngine.Rendering.AmbientMode.Flat;
            RenderSettings.ambientLight = new Color(0.55f, 0.55f, 0.6f);
            Color[] onBlack = RenderWith(cam, Color.black, size);
            Color[] onWhite = RenderWith(cam, Color.white, size);
            RenderSettings.ambientLight = ambient;
            RenderSettings.ambientMode = ambientMode;

            var result = new Color[onBlack.Length];
            for (int i = 0; i < result.Length; i++)
            {
                Color b = onBlack[i], w = onWhite[i];
                float a = Mathf.Clamp01(1f - ((w.r - b.r) + (w.g - b.g) + (w.b - b.b)) / 3f);
                result[i] = a > 0.001f ? new Color(Mathf.Clamp01(b.r / a), Mathf.Clamp01(b.g / a), Mathf.Clamp01(b.b / a), a) : new Color(0f, 0f, 0f, 0f);
            }
            var tex = new Texture2D(size, size, TextureFormat.RGBA32, false);
            tex.SetPixels(result);
            tex.Apply();

            Directory.CreateDirectory(Path.GetDirectoryName(pngPath));
            File.WriteAllBytes(pngPath, tex.EncodeToPNG());
            Object.DestroyImmediate(tex);
            Object.DestroyImmediate(camGo);
            Object.DestroyImmediate(root);
            if (lightGo != null) Object.DestroyImmediate(lightGo);
            if (litMat != null) Object.DestroyImmediate(litMat);

            AssetDatabase.ImportAsset(pngPath);
            var importer = (TextureImporter)AssetImporter.GetAtPath(pngPath);
            importer.textureType = TextureImporterType.Sprite;
            importer.alphaIsTransparency = true;
            importer.mipmapEnabled = false;
            importer.maxTextureSize = size;
            importer.SaveAndReimport();
        }

        private static Color[] RenderWith(Camera cam, Color background, int size)
        {
            var rt = RenderTexture.GetTemporary(size, size, 24, RenderTextureFormat.ARGB32);
            rt.antiAliasing = 4;
            cam.backgroundColor = background;
            cam.targetTexture = rt;
            cam.Render();
            RenderTexture.active = rt;
            var tex = new Texture2D(size, size, TextureFormat.RGBA32, false);
            tex.ReadPixels(new Rect(0, 0, size, size), 0, 0);
            tex.Apply();
            RenderTexture.active = null;
            cam.targetTexture = null;
            RenderTexture.ReleaseTemporary(rt);
            Color[] pixels = tex.GetPixels();
            Object.DestroyImmediate(tex);
            return pixels;
        }
    }
}
