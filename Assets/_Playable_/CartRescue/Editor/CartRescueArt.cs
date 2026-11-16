using System;
using System.Collections.Generic;
using System.IO;
using UnityEditor;
using UnityEngine;

namespace Playable.CartRescue.EditorTools
{
    /// <summary>
    /// Dựng Mesh asset + material từ output của Tools~/extract_assets.py (Source/Meshes/*.json + Source/manifest.json).
    /// Dữ liệu mesh giữ nguyên hệ toạ độ Unity của game gốc; mỗi submesh một material (texture chính hoặc màu đơn).
    /// </summary>
    public static class CartRescueArt
    {
        public const string Root = "Assets/_Playable_/CartRescue/";
        private const string Src = Root + "Source/";
        private const string Gen = Root + "Generated/";
        private const string ShaderName = "Legacy Shaders/Diffuse";

        [Serializable] private class MeshJson { public string name; public float[] vertices; public float[] normals; public float[] uv; public SubJson[] submeshes; }
        [Serializable] private class SubJson { public int[] indices; }
        [Serializable] private class Manifest { public Entry[] entries; }
        [Serializable] public class Entry { public string mesh; public MatJson[] materials; }
        [Serializable] public class MatJson { public string name; public string texture; public float[] color; }

        public struct Model
        {
            public Mesh Mesh;
            public Material[] Materials;
        }

        private static Dictionary<string, Model> _cache;

        /// <summary>Tạo (hoặc lấy lại) mọi mesh/material có trong manifest.</summary>
        public static Dictionary<string, Model> BuildAll()
        {
            EnsureFolder(Gen + "Meshes");
            EnsureFolder(Gen + "Materials");
            ConfigureTextures();
            var manifest = JsonUtility.FromJson<Manifest>(File.ReadAllText(Src + "manifest.json"));
            var result = new Dictionary<string, Model>();
            foreach (Entry e in manifest.entries) result[e.mesh] = Build(e);
            AssetDatabase.SaveAssets();
            _cache = result;
            return result;
        }

        public static Model Get(string mesh)
        {
            if (_cache == null || !_cache.ContainsKey(mesh)) BuildAll();
            return _cache[mesh];
        }

        private static Model Build(Entry e)
        {
            var json = JsonUtility.FromJson<MeshJson>(File.ReadAllText(Src + "Meshes/" + e.mesh + ".json"));
            string meshPath = Gen + "Meshes/" + Safe(e.mesh) + ".asset";
            var mesh = AssetDatabase.LoadAssetAtPath<Mesh>(meshPath);
            bool isNew = mesh == null;
            if (isNew) mesh = new Mesh();
            mesh.Clear();
            mesh.name = e.mesh;
            int n = json.vertices.Length / 3;
            var v = new Vector3[n];
            for (int i = 0; i < n; i++) v[i] = new Vector3(json.vertices[i * 3], json.vertices[i * 3 + 1], json.vertices[i * 3 + 2]);
            mesh.indexFormat = n > 65000 ? UnityEngine.Rendering.IndexFormat.UInt32 : UnityEngine.Rendering.IndexFormat.UInt16;
            mesh.vertices = v;
            if (json.uv != null && json.uv.Length == n * 2)
            {
                var uv = new Vector2[n];
                for (int i = 0; i < n; i++) uv[i] = new Vector2(json.uv[i * 2], json.uv[i * 2 + 1]);
                mesh.uv = uv;
            }
            mesh.subMeshCount = json.submeshes.Length;
            for (int s = 0; s < json.submeshes.Length; s++) mesh.SetTriangles(json.submeshes[s].indices, s);
            if (json.normals != null && json.normals.Length == n * 3)
            {
                var nr = new Vector3[n];
                for (int i = 0; i < n; i++) nr[i] = new Vector3(json.normals[i * 3], json.normals[i * 3 + 1], json.normals[i * 3 + 2]);
                mesh.normals = nr;
            }
            else mesh.RecalculateNormals();
            mesh.RecalculateBounds();
            if (isNew) AssetDatabase.CreateAsset(mesh, meshPath);
            else EditorUtility.SetDirty(mesh);

            var mats = new Material[e.materials.Length];
            for (int i = 0; i < mats.Length; i++) mats[i] = MaterialFor(e.materials[i]);
            return new Model { Mesh = mesh, Materials = mats };
        }

        private static Material MaterialFor(MatJson m)
        {
            // Material trùng tên (vd. atlas-LPUP dùng chung cho mọi đạo cụ) chỉ tạo một lần.
            string path = Gen + "Materials/" + Safe(m.name) + ".mat";
            var mat = AssetDatabase.LoadAssetAtPath<Material>(path);
            if (mat == null)
            {
                mat = new Material(Shader.Find(ShaderName));
                AssetDatabase.CreateAsset(mat, path);
            }
            mat.shader = Shader.Find(ShaderName);
            Color c = m.color != null && m.color.Length >= 3 ? new Color(m.color[0], m.color[1], m.color[2], 1f) : Color.white;
            mat.color = c;
            mat.mainTexture = string.IsNullOrEmpty(m.texture) ? null : AssetDatabase.LoadAssetAtPath<Texture2D>(Src + "Textures/" + m.texture + ".png");
            EditorUtility.SetDirty(mat);
            return mat;
        }

        private static void ConfigureTextures()
        {
            foreach (string guid in AssetDatabase.FindAssets("t:Texture2D", new[] { Src + "Textures" }))
            {
                string p = AssetDatabase.GUIDToAssetPath(guid);
                var imp = (TextureImporter)AssetImporter.GetAtPath(p);
                if (imp.filterMode == FilterMode.Point && !imp.mipmapEnabled) continue;
                imp.filterMode = FilterMode.Point;
                imp.mipmapEnabled = false;
                imp.SaveAndReimport();
            }
        }

        public static string Safe(string s) => s.Replace('/', '_').Replace(' ', '_');

        public static void EnsureFolder(string path)
        {
            if (AssetDatabase.IsValidFolder(path)) return;
            string parent = Path.GetDirectoryName(path).Replace('\\', '/');
            EnsureFolder(parent);
            AssetDatabase.CreateFolder(parent, Path.GetFileName(path));
        }
    }
}
