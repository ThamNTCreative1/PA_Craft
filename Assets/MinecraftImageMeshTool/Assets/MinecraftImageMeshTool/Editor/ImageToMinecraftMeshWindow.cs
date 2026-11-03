using System;
using System.Collections.Generic;
using System.IO;
using UnityEditor;
using UnityEngine;

namespace MinecraftImageMeshTool.Editor
{
    public sealed class ImageToMinecraftMeshWindow : EditorWindow
    {
        private const string OutputFolder = "Assets/GeneratedMinecraftMeshes";
        private const string VertexColorShaderName = "MinecraftImageMesh/VertexColorLit";

        private enum HeightMode
        {
            Flat,
            Brightness,
            Alpha
        }

        [SerializeField] private Texture2D sourceImage;
        [SerializeField] private int maxImageDimension = 64;
        [SerializeField] private float voxelSize = 1f;
        [SerializeField] private float alphaThreshold = 0.1f;
        [SerializeField] private HeightMode heightMode = HeightMode.Flat;
        [SerializeField] private int maxHeight = 8;
        [SerializeField] private bool saveMeshAsset = true;
        [SerializeField] private string assetName = "MinecraftImageMesh";

        [MenuItem("Tools/Minecraft Mesh/Image To Mesh")]
        public static void Open()
        {
            GetWindow<ImageToMinecraftMeshWindow>("Image To Minecraft Mesh");
        }

        private void OnGUI()
        {
            EditorGUILayout.LabelField("Source", EditorStyles.boldLabel);
            sourceImage = (Texture2D)EditorGUILayout.ObjectField("Source Image", sourceImage, typeof(Texture2D), false);

            EditorGUILayout.Space(8);
            EditorGUILayout.LabelField("Voxel Mesh", EditorStyles.boldLabel);
            maxImageDimension = EditorGUILayout.IntSlider("Max Image Dimension", maxImageDimension, 8, 256);
            voxelSize = EditorGUILayout.Slider("Voxel Size", voxelSize, 0.05f, 5f);
            alphaThreshold = EditorGUILayout.Slider("Alpha Threshold", alphaThreshold, 0f, 1f);
            heightMode = (HeightMode)EditorGUILayout.EnumPopup("Height Mode", heightMode);

            using (new EditorGUI.DisabledScope(heightMode == HeightMode.Flat))
            {
                maxHeight = EditorGUILayout.IntSlider("Max Height", maxHeight, 1, 32);
            }

            EditorGUILayout.Space(8);
            EditorGUILayout.LabelField("Output", EditorStyles.boldLabel);
            saveMeshAsset = EditorGUILayout.Toggle("Save Mesh Asset", saveMeshAsset);
            using (new EditorGUI.DisabledScope(!saveMeshAsset))
            {
                assetName = EditorGUILayout.TextField("Asset Name", assetName);
            }

            EditorGUILayout.Space(12);
            using (new EditorGUI.DisabledScope(sourceImage == null))
            {
                if (GUILayout.Button("Generate Mesh", GUILayout.Height(32)))
                {
                    Generate();
                }
            }
        }

        private void Generate()
        {
            if (sourceImage == null)
            {
                EditorUtility.DisplayDialog("Missing image", "Assign a source image first.", "OK");
                return;
            }

            Texture2D readable = null;
            try
            {
                readable = CreateReadableCopy(sourceImage, maxImageDimension);
                Mesh mesh = BuildMesh(readable);
                mesh.name = GetSafeAssetName();

                Material material = CreateVertexColorMaterial();
                GameObject generatedObject = new GameObject(mesh.name);
                MeshFilter meshFilter = generatedObject.AddComponent<MeshFilter>();
                MeshRenderer meshRenderer = generatedObject.AddComponent<MeshRenderer>();
                meshFilter.sharedMesh = mesh;
                meshRenderer.sharedMaterial = material;

                if (saveMeshAsset)
                {
                    SaveAssets(mesh, material);
                }

                Selection.activeGameObject = generatedObject;
                if (SceneView.lastActiveSceneView != null)
                {
                    SceneView.lastActiveSceneView.FrameSelected();
                }
            }
            catch (Exception exception)
            {
                Debug.LogException(exception);
                EditorUtility.DisplayDialog("Mesh generation failed", exception.Message, "OK");
            }
            finally
            {
                if (readable != null)
                {
                    DestroyImmediate(readable);
                }
            }
        }

        private Mesh BuildMesh(Texture2D texture)
        {
            int width = texture.width;
            int depth = texture.height;
            int[,] columnHeights = new int[width, depth];
            Color32[,] columnColors = new Color32[width, depth];

            for (int z = 0; z < depth; z++)
            {
                for (int x = 0; x < width; x++)
                {
                    Color32 color = texture.GetPixel(x, z);
                    float alpha = color.a / 255f;
                    if (alpha < alphaThreshold)
                    {
                        columnHeights[x, z] = 0;
                        continue;
                    }

                    columnColors[x, z] = color;
                    columnHeights[x, z] = ResolveHeight(color, alpha);
                }
            }

            List<Vector3> vertices = new List<Vector3>();
            List<int> triangles = new List<int>();
            List<Color32> colors = new List<Color32>();

            for (int z = 0; z < depth; z++)
            {
                for (int x = 0; x < width; x++)
                {
                    int height = columnHeights[x, z];
                    if (height == 0)
                    {
                        continue;
                    }

                    Color32 color = columnColors[x, z];
                    for (int y = 0; y < height; y++)
                    {
                        AddVisibleVoxelFaces(vertices, triangles, colors, columnHeights, color, x, y, z);
                    }
                }
            }

            if (vertices.Count == 0)
            {
                throw new InvalidOperationException("No voxels were generated. Lower the alpha threshold or use an image with visible pixels.");
            }

            Mesh mesh = new Mesh();
            if (vertices.Count > 65535)
            {
                mesh.indexFormat = UnityEngine.Rendering.IndexFormat.UInt32;
            }

            mesh.SetVertices(vertices);
            mesh.SetTriangles(triangles, 0);
            mesh.SetColors(colors);
            mesh.RecalculateNormals();
            mesh.RecalculateBounds();
            return mesh;
        }

        private int ResolveHeight(Color32 color, float alpha)
        {
            if (heightMode == HeightMode.Flat)
            {
                return 1;
            }

            float value = alpha;
            if (heightMode == HeightMode.Brightness)
            {
                value = ((color.r / 255f) * 0.2126f) + ((color.g / 255f) * 0.7152f) + ((color.b / 255f) * 0.0722f);
            }

            return Mathf.Max(1, Mathf.CeilToInt(value * maxHeight));
        }

        private void AddVisibleVoxelFaces(
            List<Vector3> vertices,
            List<int> triangles,
            List<Color32> colors,
            int[,] columnHeights,
            Color32 color,
            int x,
            int y,
            int z)
        {
            if (!IsOccupied(columnHeights, x + 1, y, z))
            {
                AddFace(vertices, triangles, colors, color, x, y, z, VoxelFace.PositiveX);
            }

            if (!IsOccupied(columnHeights, x - 1, y, z))
            {
                AddFace(vertices, triangles, colors, color, x, y, z, VoxelFace.NegativeX);
            }

            if (!IsOccupied(columnHeights, x, y + 1, z))
            {
                AddFace(vertices, triangles, colors, color, x, y, z, VoxelFace.PositiveY);
            }

            if (!IsOccupied(columnHeights, x, y - 1, z))
            {
                AddFace(vertices, triangles, colors, color, x, y, z, VoxelFace.NegativeY);
            }

            if (!IsOccupied(columnHeights, x, y, z + 1))
            {
                AddFace(vertices, triangles, colors, color, x, y, z, VoxelFace.PositiveZ);
            }

            if (!IsOccupied(columnHeights, x, y, z - 1))
            {
                AddFace(vertices, triangles, colors, color, x, y, z, VoxelFace.NegativeZ);
            }
        }

        private bool IsOccupied(int[,] columnHeights, int x, int y, int z)
        {
            if (y < 0)
            {
                return false;
            }

            int width = columnHeights.GetLength(0);
            int depth = columnHeights.GetLength(1);
            if (x < 0 || x >= width || z < 0 || z >= depth)
            {
                return false;
            }

            return y < columnHeights[x, z];
        }

        private enum VoxelFace
        {
            PositiveX,
            NegativeX,
            PositiveY,
            NegativeY,
            PositiveZ,
            NegativeZ
        }

        private void AddFace(
            List<Vector3> vertices,
            List<int> triangles,
            List<Color32> colors,
            Color32 color,
            int x,
            int y,
            int z,
            VoxelFace face)
        {
            int start = vertices.Count;
            float x0 = x * voxelSize;
            float x1 = (x + 1) * voxelSize;
            float y0 = y * voxelSize;
            float y1 = (y + 1) * voxelSize;
            float z0 = z * voxelSize;
            float z1 = (z + 1) * voxelSize;

            switch (face)
            {
                case VoxelFace.PositiveX:
                    vertices.Add(new Vector3(x1, y0, z0));
                    vertices.Add(new Vector3(x1, y1, z0));
                    vertices.Add(new Vector3(x1, y1, z1));
                    vertices.Add(new Vector3(x1, y0, z1));
                    break;
                case VoxelFace.NegativeX:
                    vertices.Add(new Vector3(x0, y0, z1));
                    vertices.Add(new Vector3(x0, y1, z1));
                    vertices.Add(new Vector3(x0, y1, z0));
                    vertices.Add(new Vector3(x0, y0, z0));
                    break;
                case VoxelFace.PositiveY:
                    vertices.Add(new Vector3(x0, y1, z1));
                    vertices.Add(new Vector3(x1, y1, z1));
                    vertices.Add(new Vector3(x1, y1, z0));
                    vertices.Add(new Vector3(x0, y1, z0));
                    break;
                case VoxelFace.NegativeY:
                    vertices.Add(new Vector3(x0, y0, z0));
                    vertices.Add(new Vector3(x1, y0, z0));
                    vertices.Add(new Vector3(x1, y0, z1));
                    vertices.Add(new Vector3(x0, y0, z1));
                    break;
                case VoxelFace.PositiveZ:
                    vertices.Add(new Vector3(x1, y0, z1));
                    vertices.Add(new Vector3(x1, y1, z1));
                    vertices.Add(new Vector3(x0, y1, z1));
                    vertices.Add(new Vector3(x0, y0, z1));
                    break;
                case VoxelFace.NegativeZ:
                    vertices.Add(new Vector3(x0, y0, z0));
                    vertices.Add(new Vector3(x0, y1, z0));
                    vertices.Add(new Vector3(x1, y1, z0));
                    vertices.Add(new Vector3(x1, y0, z0));
                    break;
            }

            triangles.Add(start);
            triangles.Add(start + 1);
            triangles.Add(start + 2);
            triangles.Add(start);
            triangles.Add(start + 2);
            triangles.Add(start + 3);

            colors.Add(color);
            colors.Add(color);
            colors.Add(color);
            colors.Add(color);
        }

        private Texture2D CreateReadableCopy(Texture2D source, int maxDimension)
        {
            int targetWidth = source.width;
            int targetHeight = source.height;
            int longestSide = Mathf.Max(targetWidth, targetHeight);
            if (longestSide > maxDimension)
            {
                float scale = maxDimension / (float)longestSide;
                targetWidth = Mathf.Max(1, Mathf.RoundToInt(source.width * scale));
                targetHeight = Mathf.Max(1, Mathf.RoundToInt(source.height * scale));
            }

            RenderTexture previous = RenderTexture.active;
            RenderTexture renderTexture = RenderTexture.GetTemporary(targetWidth, targetHeight, 0, RenderTextureFormat.ARGB32);
            renderTexture.filterMode = FilterMode.Point;

            try
            {
                Graphics.Blit(source, renderTexture);
                RenderTexture.active = renderTexture;

                Texture2D readable = new Texture2D(targetWidth, targetHeight, TextureFormat.RGBA32, false);
                readable.filterMode = FilterMode.Point;
                readable.ReadPixels(new Rect(0, 0, targetWidth, targetHeight), 0, 0);
                readable.Apply();
                return readable;
            }
            finally
            {
                RenderTexture.active = previous;
                RenderTexture.ReleaseTemporary(renderTexture);
            }
        }

        private Material CreateVertexColorMaterial()
        {
            Shader shader = Shader.Find(VertexColorShaderName);
            if (shader == null)
            {
                shader = Shader.Find("Sprites/Default");
            }

            Material material = new Material(shader);
            material.name = GetSafeAssetName() + "_Material";
            return material;
        }

        private void SaveAssets(Mesh mesh, Material material)
        {
            if (!AssetDatabase.IsValidFolder(OutputFolder))
            {
                Directory.CreateDirectory(OutputFolder);
                AssetDatabase.Refresh();
            }

            string safeName = GetSafeAssetName();
            string meshPath = AssetDatabase.GenerateUniqueAssetPath($"{OutputFolder}/{safeName}.asset");
            string materialPath = AssetDatabase.GenerateUniqueAssetPath($"{OutputFolder}/{safeName}_Material.mat");

            AssetDatabase.CreateAsset(mesh, meshPath);
            AssetDatabase.CreateAsset(material, materialPath);
            AssetDatabase.SaveAssets();
            AssetDatabase.Refresh();
        }

        private string GetSafeAssetName()
        {
            string rawName = string.IsNullOrWhiteSpace(assetName) ? "MinecraftImageMesh" : assetName.Trim();
            foreach (char invalid in Path.GetInvalidFileNameChars())
            {
                rawName = rawName.Replace(invalid, '_');
            }

            return rawName;
        }
    }
}
