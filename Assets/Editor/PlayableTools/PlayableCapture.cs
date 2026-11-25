#if UNITY_EDITOR
// Installed by Playable Initializer — lets AI agents SEE the scene.
// Menu: Tools/Playable/Capture All  → <project>/PlayableCaptures/{portrait,landscape,tall}.png + layout.txt + capture.json
// Works in Edit mode and Play mode. Screen Space Overlay canvases are rendered too (temporarily switched to
// Screen Space Camera for the capture, then restored). Editor-only: never included in the Luna build.
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using UnityEditor;
using UnityEngine;
using UnityEngine.SceneManagement;

namespace PlayableTools
{
    public static class PlayableCapture
    {
        public const string FolderName = "PlayableCaptures";

        static readonly string[] Names = { "portrait", "landscape", "tall" };
        static readonly int[] Widths = { 1080, 1920, 1170 };
        static readonly int[] Heights = { 1920, 1080, 2532 };

        public static string Folder
        {
            get { return Path.Combine(Directory.GetParent(Application.dataPath).FullName, FolderName); }
        }

        [MenuItem("Tools/Playable/Capture All", false, 1)]
        public static void CaptureAllMenu() { Debug.Log("[PlayableCapture] " + CaptureAll()); }

        [MenuItem("Tools/Playable/Capture Portrait", false, 2)]
        public static void CapturePortraitMenu() { Debug.Log("[PlayableCapture] " + CaptureSet(new[] { 0 })); }

        [MenuItem("Tools/Playable/Open Capture Folder", false, 20)]
        public static void OpenFolder() { Directory.CreateDirectory(Folder); EditorUtility.RevealInFinder(Folder); }

        public static string CaptureAll() { return CaptureSet(new[] { 0, 1, 2 }); }

        static string CaptureSet(int[] which)
        {
            Directory.CreateDirectory(Folder);
            Directory.CreateDirectory(Path.Combine(Folder, "history"));
            var info = new StringBuilder();
            var files = new List<string>();
            string error = null;
            string stamp = DateTime.Now.ToString("yyyyMMdd_HHmmss");
            foreach (int i in which)
            {
                try
                {
                    string f = CaptureOne(Names[i], Widths[i], Heights[i], i == 0);
                    files.Add(Path.GetFileName(f));
                    File.Copy(f, Path.Combine(Folder, "history", stamp + "_" + Names[i] + ".png"), true);
                }
                catch (Exception e)
                {
                    error = (error == null ? "" : error + " | ") + Names[i] + ": " + e.Message;
                }
            }
            var scene = SceneManager.GetActiveScene();
            info.Append("{\n");
            info.AppendFormat("  \"time\": \"{0}\",\n", DateTime.Now.ToString("s"));
            info.AppendFormat("  \"scene\": \"{0}\",\n", Esc(scene.path));
            info.AppendFormat("  \"play_mode\": {0},\n", EditorApplication.isPlaying ? "true" : "false");
            info.AppendFormat("  \"files\": [{0}],\n", string.Join(", ", files.Select(f => "\"" + f + "\"").ToArray()));
            info.AppendFormat("  \"layout\": \"layout.txt\",\n");
            info.AppendFormat("  \"error\": {0}\n", error == null ? "null" : "\"" + Esc(error) + "\"");
            info.Append("}\n");
            File.WriteAllText(Path.Combine(Folder, "capture.json"), info.ToString());
            return error == null
                ? "Captured " + string.Join(", ", files.ToArray()) + " → " + Folder
                : "Capture finished with errors: " + error;
        }

        static T[] Find<T>() where T : UnityEngine.Object
        {
#if UNITY_2023_1_OR_NEWER
            return UnityEngine.Object.FindObjectsByType<T>(FindObjectsSortMode.None);
#else
            return UnityEngine.Object.FindObjectsOfType<T>();
#endif
        }

        static string Esc(string s) { return (s ?? "").Replace("\\", "/").Replace("\"", "'"); }

        static string CaptureOne(string name, int w, int h, bool writeLayout)
        {
            var cams = Camera.allCameras.Where(c => c.enabled && c.gameObject.activeInHierarchy && c.targetTexture == null)
                                        .OrderBy(c => c.depth).ToList();
            if (cams.Count == 0)
            {
                var main = Camera.main;
                if (main == null) throw new Exception("No active camera in the scene");
                cams.Add(main);
            }
            Camera top = cams[cams.Count - 1];
            var rt = RenderTexture.GetTemporary(w, h, 24, RenderTextureFormat.ARGB32);
            var prevActive = RenderTexture.active;
            var canvases = new List<Canvas>();
            var modes = new List<RenderMode>();
            var canvasCams = new List<Camera>();
            var planes = new List<float>();
            var orders = new List<int>();
            try
            {
                foreach (var c in cams) { c.targetTexture = rt; c.ResetAspect(); }
                foreach (var cv in Find<Canvas>())
                {
                    if (!cv.isRootCanvas || !cv.isActiveAndEnabled) continue;
                    bool overlayLike = cv.renderMode == RenderMode.ScreenSpaceOverlay ||
                                       (cv.renderMode == RenderMode.ScreenSpaceCamera && cv.worldCamera == null);
                    if (!overlayLike) continue;
                    canvases.Add(cv); modes.Add(cv.renderMode); canvasCams.Add(cv.worldCamera); planes.Add(cv.planeDistance); orders.Add(cv.sortingOrder);
                    cv.renderMode = RenderMode.ScreenSpaceCamera;
                    cv.worldCamera = top;
                    cv.planeDistance = Mathf.Clamp(top.nearClipPlane + 1f, top.nearClipPlane + 0.01f, top.farClipPlane - 0.01f);
                    cv.sortingOrder = Math.Min(cv.sortingOrder + 30000, 32767);   // overlay is drawn above everything
                }
                Canvas.ForceUpdateCanvases();
                foreach (var c in cams) c.Render();

                RenderTexture.active = rt;
                var tex = new Texture2D(w, h, TextureFormat.RGB24, false);
                tex.ReadPixels(new Rect(0, 0, w, h), 0, 0);
                tex.Apply();
                string file = Path.Combine(Folder, name + ".png");
                File.WriteAllBytes(file, tex.EncodeToPNG());
                UnityEngine.Object.DestroyImmediate(tex);
                if (writeLayout) WriteLayout(cams[0], top, w, h);
                return file;
            }
            finally
            {
                RenderTexture.active = prevActive;
                for (int i = 0; i < canvases.Count; i++)
                {
                    if (canvases[i] == null) continue;
                    canvases[i].sortingOrder = orders[i];
                    canvases[i].renderMode = modes[i];
                    canvases[i].worldCamera = canvasCams[i];
                    canvases[i].planeDistance = planes[i];
                }
                foreach (var c in cams) { if (c != null) { c.targetTexture = null; c.ResetAspect(); } }
                Canvas.ForceUpdateCanvases();
                RenderTexture.ReleaseTemporary(rt);
            }
        }

        // Screen rect (percent of a 1080x1920 portrait screen, origin top-left) of every visible object.
        static void WriteLayout(Camera worldCam, Camera uiCam, int w, int h)
        {
            var sb = new StringBuilder();
            sb.AppendLine("# layout (portrait " + w + "x" + h + ") — x,y = top-left corner in % of screen, w,h in %; origin top-left");
            sb.AppendLine("# path | kind | x% y% w% h% | sorting | extra");
            int n = 0;
            foreach (var r in Find<Renderer>())
            {
                if (n > 400) break;
                if (!r.enabled || !r.gameObject.activeInHierarchy || r is ParticleSystemRenderer) continue;
                if (r.GetComponentInParent<Canvas>() != null) continue;
                var b = r.bounds;
                Vector3 a = worldCam.WorldToViewportPoint(b.min), c = worldCam.WorldToViewportPoint(b.max);
                string extra = "";
                var sr = r as SpriteRenderer;
                if (sr != null && sr.sprite != null) extra = "sprite=" + sr.sprite.name + (sr.color != Color.white ? " color=#" + ColorUtility.ToHtmlStringRGBA(sr.color) : "");
                sb.AppendLine(Line(r.transform, r.GetType().Name, a, c, r.sortingLayerName + "/" + r.sortingOrder, extra));
                n++;
            }
            var corners = new Vector3[4];
            foreach (var rt in Find<RectTransform>())
            {
                if (n > 700) break;
                if (!rt.gameObject.activeInHierarchy) continue;
                var cv = rt.GetComponentInParent<Canvas>();
                if (cv == null || rt.GetComponent<Canvas>() == cv && cv.isRootCanvas) continue;
                var g = rt.GetComponent<UnityEngine.UI.Graphic>();
                if (g == null) continue;
                rt.GetWorldCorners(corners);
                var cam = cv.renderMode == RenderMode.ScreenSpaceOverlay ? null : (cv.worldCamera != null ? cv.worldCamera : uiCam);
                Vector2 p0 = RectTransformUtility.WorldToScreenPoint(cam, corners[0]);
                Vector2 p2 = RectTransformUtility.WorldToScreenPoint(cam, corners[2]);
                float sw = cam != null ? cam.pixelWidth : Screen.width, sh = cam != null ? cam.pixelHeight : Screen.height;
                var a = new Vector3(p0.x / sw, p0.y / sh, 0); var c = new Vector3(p2.x / sw, p2.y / sh, 0);
                string extra = g.GetType().Name;
                var img = g as UnityEngine.UI.Image;
                if (img != null && img.sprite != null) extra += " sprite=" + img.sprite.name;
                var txt = g as UnityEngine.UI.Text;
                if (txt != null) extra += " text=\"" + Esc(txt.text).Replace("\n", " ") + "\"";
                if (!g.enabled) extra += " (disabled)";
                sb.AppendLine(Line(rt, "UI", a, c, "canvas " + cv.sortingOrder, extra));
                n++;
            }
            File.WriteAllText(Path.Combine(Folder, "layout.txt"), sb.ToString());
        }

        static string Line(Transform t, string kind, Vector3 vmin, Vector3 vmax, string sorting, string extra)
        {
            float x = Mathf.Min(vmin.x, vmax.x), y1 = Mathf.Max(vmin.y, vmax.y);
            float w = Mathf.Abs(vmax.x - vmin.x), h = Mathf.Abs(vmax.y - vmin.y);
            bool off = vmax.x < 0 || vmin.x > 1 || vmax.y < 0 || vmin.y > 1;
            return string.Format("{0} | {1} | {2:0} {3:0} {4:0} {5:0} | {6} | {7}{8}", PathOf(t), kind, x * 100, (1 - y1) * 100,
                                 w * 100, h * 100, sorting, extra, off ? " OFFSCREEN" : "");
        }

        static string PathOf(Transform t)
        {
            var parts = new List<string>();
            for (var p = t; p != null && parts.Count < 6; p = p.parent) parts.Insert(0, p.name);
            return string.Join("/", parts.ToArray());
        }
    }
}
#endif
