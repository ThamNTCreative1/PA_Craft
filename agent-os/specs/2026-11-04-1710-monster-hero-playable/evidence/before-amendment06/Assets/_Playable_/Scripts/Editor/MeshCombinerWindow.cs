using System.Collections.Generic;
using System.IO;
using System.Linq;
using UnityEditor;
using UnityEngine;

namespace Playable.EditorTools
{
    public class MeshCombinerWindow : EditorWindow
    {
        private GameObject _sourceRoot;
        private string _saveFolder = "Assets/_Playable_/Generated";
        private string _assetName = "CombinedMesh";
        private bool _disableSourceAfterCombine = true;
        private float _faceTouchEpsilon = 0.001f;

        [MenuItem("Tools/Mesh/Mesh Combiner")]
        public static void ShowWindow()
        {
            GetWindow<MeshCombinerWindow>("Mesh Combiner");
        }

        private void OnGUI()
        {
            EditorGUILayout.LabelField("Source", EditorStyles.boldLabel);
            _sourceRoot = (GameObject)EditorGUILayout.ObjectField("Root Object", _sourceRoot, typeof(GameObject), true);

            EditorGUILayout.Space(8f);
            EditorGUILayout.LabelField("Output", EditorStyles.boldLabel);
            _saveFolder = EditorGUILayout.TextField("Save Folder", _saveFolder);
            _assetName = EditorGUILayout.TextField("Asset Name", _assetName);
            _disableSourceAfterCombine = EditorGUILayout.Toggle("Disable Source", _disableSourceAfterCombine);

            EditorGUILayout.Space(12f);
            using (new EditorGUI.DisabledScope(_sourceRoot == null))
            {
                if (GUILayout.Button("Combine Meshes", GUILayout.Height(32f)))
                {
                    CombineSelectedHierarchy();
                }
            }
        }

        private void CombineSelectedHierarchy()
        {
            if (_sourceRoot == null)
            {
                EditorUtility.DisplayDialog("Missing Source", "Assign a root object first.", "OK");
                return;
            }

            List<MeshPart> meshParts = CollectMeshParts(_sourceRoot);
            if (meshParts.Count == 0)
            {
                EditorUtility.DisplayDialog(
                    "No Mesh Found",
                    "The selected object hierarchy does not contain any MeshFilter + MeshRenderer pairs.",
                    "OK");
                return;
            }

            Directory.CreateDirectory(_saveFolder);
            string meshAssetPath =
                AssetDatabase.GenerateUniqueAssetPath(Path.Combine(_saveFolder, _assetName + ".asset"));

            Dictionary<Material, List<CombineInstance>> combineByMaterial =
                new Dictionary<Material, List<CombineInstance>>();
            for (int i = 0; i < meshParts.Count; i++)
            {
                MeshPart part = meshParts[i];
                if (part.Mesh == null || part.Material == null)
                {
                    continue;
                }

                if (!combineByMaterial.TryGetValue(part.Material, out List<CombineInstance> combineList))
                {
                    combineList = new List<CombineInstance>();
                    combineByMaterial.Add(part.Material, combineList);
                }

                combineList.Add(new CombineInstance
                {
                    mesh = part.Mesh,
                    subMeshIndex = part.SubMeshIndex,
                    transform = part.LocalMatrix,
                    lightmapScaleOffset = part.LightmapScaleOffset,
                    realtimeLightmapScaleOffset = part.RealtimeLightmapScaleOffset
                });
            }

            Mesh combinedMesh = new Mesh
            {
                name = _assetName
            };

            List<Mesh> tempMeshes = new List<Mesh>();
            List<CombineInstance> finalCombineInstances = new List<CombineInstance>();
            List<Material> finalMaterials = new List<Material>();

            foreach (KeyValuePair<Material, List<CombineInstance>> pair in combineByMaterial)
            {
                int materialVertexCount = CalculateVertexCount(pair.Value);
                Mesh materialMesh = new Mesh
                {
                    name = _assetName + "_" + pair.Key.name
                };

                if (materialVertexCount > 65535)
                {
                    materialMesh.indexFormat = UnityEngine.Rendering.IndexFormat.UInt32;
                }

                materialMesh.CombineMeshes(pair.Value.ToArray(), true, true, true);
                tempMeshes.Add(materialMesh);

                finalCombineInstances.Add(new CombineInstance
                {
                    mesh = materialMesh,
                    subMeshIndex = 0,
                    transform = Matrix4x4.identity
                });
                finalMaterials.Add(pair.Key);
            }

            int finalVertexCount = 0;
            for (int i = 0; i < tempMeshes.Count; i++)
            {
                finalVertexCount += tempMeshes[i] != null ? tempMeshes[i].vertexCount : 0;
            }

            if (finalVertexCount > 65535)
            {
                combinedMesh.indexFormat = UnityEngine.Rendering.IndexFormat.UInt32;
            }

            combinedMesh.CombineMeshes(finalCombineInstances.ToArray(), false, false, false);

            for (int i = 0; i < tempMeshes.Count; i++)
            {
                DestroyImmediate(tempMeshes[i]);
            }

            AssetDatabase.CreateAsset(combinedMesh, meshAssetPath);
            AssetDatabase.SaveAssets();

            GameObject combinedObject = new GameObject(_assetName);
            Undo.RegisterCreatedObjectUndo(combinedObject, "Create Combined Mesh");
            combinedObject.transform.SetPositionAndRotation(Vector3.zero, Quaternion.identity);
            combinedObject.transform.localScale = Vector3.one;

            MeshFilter meshFilter = combinedObject.AddComponent<MeshFilter>();
            meshFilter.sharedMesh = combinedMesh;

            MeshRenderer meshRenderer = combinedObject.AddComponent<MeshRenderer>();
            meshRenderer.sharedMaterials = finalMaterials.ToArray();

            if (_disableSourceAfterCombine)
            {
                Undo.RecordObject(_sourceRoot, "Disable Source Root");
                _sourceRoot.SetActive(false);
            }

            Selection.activeGameObject = combinedObject;
            EditorGUIUtility.PingObject(combinedObject);
        }

        private static List<MeshPart> CollectMeshParts(GameObject sourceRoot)
        {
            List<MeshPart> parts = new List<MeshPart>();
            MeshFilter[] meshFilters = sourceRoot.GetComponentsInChildren<MeshFilter>(true);

            for (int i = 0; i < meshFilters.Length; i++)
            {
                MeshFilter meshFilter = meshFilters[i];
                MeshRenderer meshRenderer = meshFilter.GetComponent<MeshRenderer>();

                if (meshRenderer == null || meshFilter.sharedMesh == null)
                {
                    continue;
                }

                Material[] materials = meshRenderer.sharedMaterials;
                int subMeshCount = Mathf.Min(meshFilter.sharedMesh.subMeshCount, materials.Length);
                Matrix4x4 localMatrix = meshFilter.transform.localToWorldMatrix;
                Bounds worldBounds = meshRenderer.bounds;

                for (int subMeshIndex = 0; subMeshIndex < subMeshCount; subMeshIndex++)
                {
                    Material material = materials[subMeshIndex];
                    if (material == null)
                    {
                        continue;
                    }

                    parts.Add(new MeshPart
                    {
                    Mesh = meshFilter.sharedMesh,
                    Material = material,
                    SubMeshIndex = subMeshIndex,
                    LocalMatrix = localMatrix,
                    WorldBounds = worldBounds,
                    LightmapScaleOffset = meshRenderer.lightmapScaleOffset,
                    RealtimeLightmapScaleOffset = meshRenderer.realtimeLightmapScaleOffset
                });
            }
            }

            return parts;
        }

        private static int CalculateVertexCount(List<CombineInstance> combineInstances)
        {
            int vertexCount = 0;

            for (int i = 0; i < combineInstances.Count; i++)
            {
                if (combineInstances[i].mesh == null)
                {
                    continue;
                }

                vertexCount += combineInstances[i].mesh.vertexCount;
            }

            return vertexCount;
        }

        private Mesh BuildSurfaceMesh(MeshPart part, List<MeshPart> allParts, int currentIndex)
        {
            Mesh sourceMesh = part.Mesh;
            if (sourceMesh == null)
            {
                return null;
            }

            int[] sourceTriangles = sourceMesh.GetTriangles(part.SubMeshIndex);
            if (sourceTriangles == null || sourceTriangles.Length == 0)
            {
                return null;
            }

            Vector3[] vertices = sourceMesh.vertices;
            Bounds localBounds = sourceMesh.bounds;
            float localEpsilon = Mathf.Max(localBounds.size.magnitude, 1f) * 0.001f;

            List<int> keptTriangles = new List<int>(sourceTriangles.Length);
            for (int i = 0; i < sourceTriangles.Length; i += 3)
            {
                int i0 = sourceTriangles[i];
                int i1 = sourceTriangles[i + 1];
                int i2 = sourceTriangles[i + 2];

                if (i0 < 0 || i0 >= vertices.Length || i1 < 0 || i1 >= vertices.Length || i2 < 0 ||
                    i2 >= vertices.Length)
                {
                    continue;
                }

                MeshFace face;
                if (TryGetTriangleFace(vertices[i0], vertices[i1], vertices[i2], localBounds, localEpsilon, out face) &&
                    IsFaceOccluded(part, allParts, currentIndex, face, _faceTouchEpsilon))
                {
                    continue;
                }

                keptTriangles.Add(i0);
                keptTriangles.Add(i1);
                keptTriangles.Add(i2);
            }

            if (keptTriangles.Count == 0)
            {
                return null;
            }

            Mesh mesh = Object.Instantiate(sourceMesh);
            mesh.name = sourceMesh.name + "_Surface";
            mesh.subMeshCount = 1;
            mesh.SetTriangles(keptTriangles, 0);
            mesh.RecalculateBounds();
            return mesh;
        }

        private static bool TryGetTriangleFace(Vector3 v0, Vector3 v1, Vector3 v2, Bounds bounds, float epsilon,
            out MeshFace face)
        {
            if (IsNear(v0.x, bounds.min.x, epsilon) && IsNear(v1.x, bounds.min.x, epsilon) &&
                IsNear(v2.x, bounds.min.x, epsilon))
            {
                face = MeshFace.Left;
                return true;
            }

            if (IsNear(v0.x, bounds.max.x, epsilon) && IsNear(v1.x, bounds.max.x, epsilon) &&
                IsNear(v2.x, bounds.max.x, epsilon))
            {
                face = MeshFace.Right;
                return true;
            }

            if (IsNear(v0.y, bounds.min.y, epsilon) && IsNear(v1.y, bounds.min.y, epsilon) &&
                IsNear(v2.y, bounds.min.y, epsilon))
            {
                face = MeshFace.Bottom;
                return true;
            }

            if (IsNear(v0.y, bounds.max.y, epsilon) && IsNear(v1.y, bounds.max.y, epsilon) &&
                IsNear(v2.y, bounds.max.y, epsilon))
            {
                face = MeshFace.Top;
                return true;
            }

            if (IsNear(v0.z, bounds.min.z, epsilon) && IsNear(v1.z, bounds.min.z, epsilon) &&
                IsNear(v2.z, bounds.min.z, epsilon))
            {
                face = MeshFace.Back;
                return true;
            }

            if (IsNear(v0.z, bounds.max.z, epsilon) && IsNear(v1.z, bounds.max.z, epsilon) &&
                IsNear(v2.z, bounds.max.z, epsilon))
            {
                face = MeshFace.Front;
                return true;
            }

            face = default;
            return false;
        }

        private bool IsFaceOccluded(MeshPart current, List<MeshPart> allParts, int currentIndex, MeshFace face,
            float epsilon)
        {
            Bounds currentBounds = current.WorldBounds;

            for (int i = 0; i < allParts.Count; i++)
            {
                if (i == currentIndex)
                {
                    continue;
                }

                MeshPart other = allParts[i];
                if (other.Mesh == null)
                {
                    continue;
                }

                Bounds otherBounds = other.WorldBounds;
                switch (face)
                {
                    case MeshFace.Left:
                        if (IsNear(otherBounds.max.x, currentBounds.min.x, epsilon) &&
                            Overlaps(otherBounds.min.y, otherBounds.max.y, currentBounds.min.y, currentBounds.max.y,
                                epsilon) &&
                            Overlaps(otherBounds.min.z, otherBounds.max.z, currentBounds.min.z, currentBounds.max.z,
                                epsilon))
                        {
                            return true;
                        }

                        break;
                    case MeshFace.Right:
                        if (IsNear(otherBounds.min.x, currentBounds.max.x, epsilon) &&
                            Overlaps(otherBounds.min.y, otherBounds.max.y, currentBounds.min.y, currentBounds.max.y,
                                epsilon) &&
                            Overlaps(otherBounds.min.z, otherBounds.max.z, currentBounds.min.z, currentBounds.max.z,
                                epsilon))
                        {
                            return true;
                        }

                        break;
                    case MeshFace.Bottom:
                        if (IsNear(otherBounds.max.y, currentBounds.min.y, epsilon) &&
                            Overlaps(otherBounds.min.x, otherBounds.max.x, currentBounds.min.x, currentBounds.max.x,
                                epsilon) &&
                            Overlaps(otherBounds.min.z, otherBounds.max.z, currentBounds.min.z, currentBounds.max.z,
                                epsilon))
                        {
                            return true;
                        }

                        break;
                    case MeshFace.Top:
                        if (IsNear(otherBounds.min.y, currentBounds.max.y, epsilon) &&
                            Overlaps(otherBounds.min.x, otherBounds.max.x, currentBounds.min.x, currentBounds.max.x,
                                epsilon) &&
                            Overlaps(otherBounds.min.z, otherBounds.max.z, currentBounds.min.z, currentBounds.max.z,
                                epsilon))
                        {
                            return true;
                        }

                        break;
                    case MeshFace.Back:
                        if (IsNear(otherBounds.max.z, currentBounds.min.z, epsilon) &&
                            Overlaps(otherBounds.min.x, otherBounds.max.x, currentBounds.min.x, currentBounds.max.x,
                                epsilon) &&
                            Overlaps(otherBounds.min.y, otherBounds.max.y, currentBounds.min.y, currentBounds.max.y,
                                epsilon))
                        {
                            return true;
                        }

                        break;
                    case MeshFace.Front:
                        if (IsNear(otherBounds.min.z, currentBounds.max.z, epsilon) &&
                            Overlaps(otherBounds.min.x, otherBounds.max.x, currentBounds.min.x, currentBounds.max.x,
                                epsilon) &&
                            Overlaps(otherBounds.min.y, otherBounds.max.y, currentBounds.min.y, currentBounds.max.y,
                                epsilon))
                        {
                            return true;
                        }

                        break;
                }
            }

            return false;
        }

        private static bool IsNear(float a, float b, float epsilon)
        {
            return Mathf.Abs(a - b) <= epsilon;
        }

        private static bool Overlaps(float minA, float maxA, float minB, float maxB, float epsilon)
        {
            return maxA >= minB - epsilon && maxB >= minA - epsilon;
        }

        private static List<BlockSource> CollectBlockSources(GameObject sourceRoot)
        {
            List<BlockSource> blocks = new List<BlockSource>();
            if (sourceRoot == null)
            {
                return blocks;
            }

            Matrix4x4 rootWorldToLocal = sourceRoot.transform.worldToLocalMatrix;
            MeshRenderer[] renderers = sourceRoot.GetComponentsInChildren<MeshRenderer>(true);

            for (int i = 0; i < renderers.Length; i++)
            {
                MeshRenderer renderer = renderers[i];
                if (renderer == null)
                {
                    continue;
                }

                MeshFilter meshFilter = renderer.GetComponent<MeshFilter>();
                if (meshFilter == null || meshFilter.sharedMesh == null)
                {
                    continue;
                }

                Material material = GetPrimaryMaterial(renderer.sharedMaterials);
                if (material == null)
                {
                    continue;
                }

                blocks.Add(new BlockSource
                {
                    LocalBounds = TransformBoundsToLocal(renderer.bounds, rootWorldToLocal),
                    Material = material
                });
            }

            return blocks;
        }

        private static Material GetPrimaryMaterial(Material[] materials)
        {
            if (materials == null)
            {
                return null;
            }

            for (int i = 0; i < materials.Length; i++)
            {
                if (materials[i] != null)
                {
                    return materials[i];
                }
            }

            return null;
        }

        private static Bounds TransformBoundsToLocal(Bounds worldBounds, Matrix4x4 rootWorldToLocal)
        {
            Vector3[] corners = GetBoundsCorners(worldBounds);
            Vector3 first = rootWorldToLocal.MultiplyPoint3x4(corners[0]);
            Bounds localBounds = new Bounds(first, Vector3.zero);

            for (int i = 1; i < corners.Length; i++)
            {
                localBounds.Encapsulate(rootWorldToLocal.MultiplyPoint3x4(corners[i]));
            }

            return localBounds;
        }

        private static Vector3[] GetBoundsCorners(Bounds bounds)
        {
            Vector3 min = bounds.min;
            Vector3 max = bounds.max;

            return new[]
            {
                new Vector3(min.x, min.y, min.z),
                new Vector3(min.x, min.y, max.z),
                new Vector3(min.x, max.y, min.z),
                new Vector3(min.x, max.y, max.z),
                new Vector3(max.x, min.y, min.z),
                new Vector3(max.x, min.y, max.z),
                new Vector3(max.x, max.y, min.z),
                new Vector3(max.x, max.y, max.z)
            };
        }

        private static List<float> CollectUniqueEdges(IEnumerable<float> values)
        {
            List<float> edges = new List<float>();
            foreach (float value in values)
            {
                bool exists = false;
                for (int i = 0; i < edges.Count; i++)
                {
                    if (Mathf.Abs(edges[i] - value) <= 0.0001f)
                    {
                        exists = true;
                        break;
                    }
                }

                if (!exists)
                {
                    edges.Add(value);
                }
            }

            edges.Sort();
            return edges;
        }

        private static int FindEdgeIndex(List<float> edges, float value)
        {
            for (int i = 0; i < edges.Count; i++)
            {
                if (Mathf.Abs(edges[i] - value) <= 0.0001f)
                {
                    return i;
                }
            }

            return -1;
        }

        private static Material GetOccupancy(Material[,,] occupancy, int axis, int slice, int u, int v)
        {
            int x;
            int y;
            int z;

            if (axis == 0)
            {
                x = slice;
                y = u;
                z = v;
            }
            else if (axis == 1)
            {
                x = u;
                y = slice;
                z = v;
            }
            else
            {
                x = u;
                y = v;
                z = slice;
            }

            if (x < 0 || y < 0 || z < 0 ||
                x >= occupancy.GetLength(0) ||
                y >= occupancy.GetLength(1) ||
                z >= occupancy.GetLength(2))
            {
                return null;
            }

            return occupancy[x, y, z];
        }

        private static void MergeFaceMask(
            FaceMaskCell?[,] mask,
            int axis,
            int slice,
            List<float> xs,
            List<float> ys,
            List<float> zs,
            Dictionary<Material, GreedyMeshBuilder> builders)
        {
            int sizeU = mask.GetLength(0);
            int sizeV = mask.GetLength(1);
            bool[,] used = new bool[sizeU, sizeV];
            List<float>[] edges = { xs, ys, zs };

            // Must match GetOccupancy's per-axis (u, v) -> (x, y, z) convention exactly.
            // axis 0: x=slice, y=u, z=v  -> u=Y(1), v=Z(2)
            // axis 1: x=u, y=slice, z=v  -> u=X(0), v=Z(2)
            // axis 2: x=u, y=v, z=slice  -> u=X(0), v=Y(1)
            // NOTE: this is NOT the simple cyclic (axis+1)%3 / (axis+2)%3 formula for axis 1 -
            // using that formula there swaps u/v against GetOccupancy and produces
            // wrongly sized/positioned quads on Top/Bottom faces (the "bitten block" bug).
            int uAxis;
            int vAxis;
            switch (axis)
            {
                case 0:
                    uAxis = 1;
                    vAxis = 2;
                    break;
                case 1:
                    uAxis = 0;
                    vAxis = 2;
                    break;
                default:
                    uAxis = 0;
                    vAxis = 1;
                    break;
            }

            for (int v = 0; v < sizeV; v++)
            {
                for (int u = 0; u < sizeU; u++)
                {
                    if (used[u, v] || !mask[u, v].HasValue)
                    {
                        continue;
                    }

                    FaceMaskCell cell = mask[u, v].Value;
                    int width = 1;
                    while (u + width < sizeU &&
                           !used[u + width, v] &&
                           mask[u + width, v].HasValue &&
                           SameFace(mask[u + width, v].Value, cell))
                    {
                        width++;
                    }

                    int height = 1;
                    bool expand = true;
                    while (v + height < sizeV && expand)
                    {
                        for (int dx = 0; dx < width; dx++)
                        {
                            if (used[u + dx, v + height] ||
                                !mask[u + dx, v + height].HasValue ||
                                !SameFace(mask[u + dx, v + height].Value, cell))
                            {
                                expand = false;
                                break;
                            }
                        }

                        if (expand)
                        {
                            height++;
                        }
                    }

                    for (int yy = 0; yy < height; yy++)
                    {
                        for (int xx = 0; xx < width; xx++)
                        {
                            used[u + xx, v + yy] = true;
                        }
                    }

                    float plane = edges[axis][slice];
                    float u0 = edges[uAxis][u];
                    float u1 = edges[uAxis][u + width];
                    float v0 = edges[vAxis][v];
                    float v1 = edges[vAxis][v + height];

                    Vector3 a;
                    Vector3 b;
                    Vector3 c;
                    Vector3 d;
                    Vector3 normal;
                    BuildQuad(axis, plane, u0, u1, v0, v1, cell.Flip, out a, out b, out c, out d, out normal);

                    if (!builders.TryGetValue(cell.Material, out GreedyMeshBuilder builder))
                    {
                        builder = new GreedyMeshBuilder();
                        builders.Add(cell.Material, builder);
                    }

                    builder.AddQuad(a, b, c, d, normal, cell.Flip, new Vector2(Mathf.Abs(u1 - u0), Mathf.Abs(v1 - v0)));
                }
            }
        }

        private static bool SameFace(FaceMaskCell a, FaceMaskCell b)
        {
            return a.Material == b.Material && a.Flip == b.Flip;
        }

        private static void BuildQuad(
            int axis,
            float plane,
            float u0,
            float u1,
            float v0,
            float v1,
            bool flip,
            out Vector3 a,
            out Vector3 b,
            out Vector3 c,
            out Vector3 d,
            out Vector3 normal)
        {
            if (axis == 0)
            {
                a = new Vector3(plane, u0, v0);
                b = new Vector3(plane, u0, v1);
                c = new Vector3(plane, u1, v1);
                d = new Vector3(plane, u1, v0);
                normal = flip ? Vector3.left : Vector3.right;
                return;
            }

            if (axis == 1)
            {
                a = new Vector3(u0, plane, v0);
                b = new Vector3(u1, plane, v0);
                c = new Vector3(u1, plane, v1);
                d = new Vector3(u0, plane, v1);
                normal = flip ? Vector3.down : Vector3.up;
                return;
            }

            a = new Vector3(u0, v0, plane);
            b = new Vector3(u1, v0, plane);
            c = new Vector3(u1, v1, plane);
            d = new Vector3(u0, v1, plane);
            normal = flip ? Vector3.back : Vector3.forward;
        }

        private bool TryCombineSelectedHierarchyGreedy(GameObject sourceRoot)
        {
            List<BlockSource> blocks = CollectBlockSources(sourceRoot);
            if (blocks.Count == 0)
            {
                return false;
            }

            List<float> xs = CollectUniqueEdges(blocks.Select(b => b.LocalBounds.min.x)
                .Concat(blocks.Select(b => b.LocalBounds.max.x)));
            List<float> ys = CollectUniqueEdges(blocks.Select(b => b.LocalBounds.min.y)
                .Concat(blocks.Select(b => b.LocalBounds.max.y)));
            List<float> zs = CollectUniqueEdges(blocks.Select(b => b.LocalBounds.min.z)
                .Concat(blocks.Select(b => b.LocalBounds.max.z)));

            if (xs.Count < 2 || ys.Count < 2 || zs.Count < 2)
            {
                return false;
            }

            int nx = xs.Count - 1;
            int ny = ys.Count - 1;
            int nz = zs.Count - 1;
            Material[,,] occupancy = new Material[nx, ny, nz];

            for (int i = 0; i < blocks.Count; i++)
            {
                BlockSource block = blocks[i];
                int x0 = FindEdgeIndex(xs, block.LocalBounds.min.x);
                int x1 = FindEdgeIndex(xs, block.LocalBounds.max.x);
                int y0 = FindEdgeIndex(ys, block.LocalBounds.min.y);
                int y1 = FindEdgeIndex(ys, block.LocalBounds.max.y);
                int z0 = FindEdgeIndex(zs, block.LocalBounds.min.z);
                int z1 = FindEdgeIndex(zs, block.LocalBounds.max.z);

                if (x0 < 0 || x1 < 0 || y0 < 0 || y1 < 0 || z0 < 0 || z1 < 0)
                {
                    continue;
                }

                for (int x = x0; x < x1; x++)
                {
                    for (int y = y0; y < y1; y++)
                    {
                        for (int z = z0; z < z1; z++)
                        {
                            if (occupancy[x, y, z] == null)
                            {
                                occupancy[x, y, z] = block.Material;
                            }
                        }
                    }
                }
            }

            Dictionary<Material, GreedyMeshBuilder> builders = new Dictionary<Material, GreedyMeshBuilder>();
            for (int axis = 0; axis < 3; axis++)
            {
                int sizeA = axis == 0 ? nx : axis == 1 ? ny : nz;
                int sizeU = axis == 0 ? ny : axis == 1 ? nx : nx;
                int sizeV = axis == 0 ? nz : axis == 1 ? nz : ny;

                for (int slice = 0; slice <= sizeA; slice++)
                {
                    FaceMaskCell?[,] mask = new FaceMaskCell?[sizeU, sizeV];

                    for (int v = 0; v < sizeV; v++)
                    {
                        for (int u = 0; u < sizeU; u++)
                        {
                            Material negative = GetOccupancy(occupancy, axis, slice - 1, u, v);
                            Material positive = GetOccupancy(occupancy, axis, slice, u, v);

                            if (negative == null && positive == null)
                            {
                                continue;
                            }

                            if (negative != null && positive != null)
                            {
                                continue;
                            }

                            if (negative != null)
                            {
                                mask[u, v] = new FaceMaskCell
                                {
                                    Material = negative,
                                    Flip = false
                                };
                            }
                            else if (positive != null)
                            {
                                mask[u, v] = new FaceMaskCell
                                {
                                    Material = positive,
                                    Flip = true
                                };
                            }
                        }
                    }

                    MergeFaceMask(mask, axis, slice, xs, ys, zs, builders);
                }
            }

            if (builders.Count == 0)
            {
                return false;
            }

            Directory.CreateDirectory(_saveFolder);
            string meshAssetPath =
                AssetDatabase.GenerateUniqueAssetPath(Path.Combine(_saveFolder, _assetName + ".asset"));

            List<Mesh> tempMeshes = new List<Mesh>();
            List<CombineInstance> finalCombineInstances = new List<CombineInstance>();
            List<Material> finalMaterials = new List<Material>();

            foreach (KeyValuePair<Material, GreedyMeshBuilder> pair in builders)
            {
                Mesh materialMesh = pair.Value.Build(_assetName + "_" + pair.Key.name);
                if (materialMesh == null)
                {
                    continue;
                }

                tempMeshes.Add(materialMesh);
                finalCombineInstances.Add(new CombineInstance
                {
                    mesh = materialMesh,
                    subMeshIndex = 0,
                    transform = Matrix4x4.identity
                });
                finalMaterials.Add(pair.Key);
            }

            if (finalCombineInstances.Count == 0)
            {
                for (int i = 0; i < tempMeshes.Count; i++)
                {
                    DestroyImmediate(tempMeshes[i]);
                }

                return false;
            }

            Mesh combinedMesh = new Mesh
            {
                name = _assetName
            };

            int finalVertexCount = 0;
            for (int i = 0; i < tempMeshes.Count; i++)
            {
                finalVertexCount += tempMeshes[i] != null ? tempMeshes[i].vertexCount : 0;
            }

            if (finalVertexCount > 65535)
            {
                combinedMesh.indexFormat = UnityEngine.Rendering.IndexFormat.UInt32;
            }

            combinedMesh.CombineMeshes(finalCombineInstances.ToArray(), false, false, false);

            for (int i = 0; i < tempMeshes.Count; i++)
            {
                DestroyImmediate(tempMeshes[i]);
            }

            AssetDatabase.CreateAsset(combinedMesh, meshAssetPath);
            AssetDatabase.SaveAssets();

            GameObject combinedObject = new GameObject(_assetName);
            Undo.RegisterCreatedObjectUndo(combinedObject, "Create Combined Mesh");
            combinedObject.transform.SetPositionAndRotation(Vector3.zero, Quaternion.identity);
            combinedObject.transform.localScale = Vector3.one;

            MeshFilter meshFilter = combinedObject.AddComponent<MeshFilter>();
            meshFilter.sharedMesh = combinedMesh;

            MeshRenderer meshRenderer = combinedObject.AddComponent<MeshRenderer>();
            meshRenderer.sharedMaterials = finalMaterials.ToArray();

            if (_disableSourceAfterCombine)
            {
                Undo.RecordObject(_sourceRoot, "Disable Source Root");
                _sourceRoot.SetActive(false);
            }

            Selection.activeGameObject = combinedObject;
            EditorGUIUtility.PingObject(combinedObject);
            return true;
        }

        private struct BlockSource
        {
            public Bounds LocalBounds;
            public Material Material;
        }

        private struct FaceMaskCell
        {
            public Material Material;
            public bool Flip;
        }

        private sealed class GreedyMeshBuilder
        {
            private readonly List<Vector3> _vertices = new List<Vector3>();
            private readonly List<Vector3> _normals = new List<Vector3>();
            private readonly List<Vector2> _uvs = new List<Vector2>();
            private readonly List<int> _triangles = new List<int>();

            public void AddQuad(Vector3 a, Vector3 b, Vector3 c, Vector3 d, Vector3 normal, bool flip, Vector2 uvSize)
            {
                int startIndex = _vertices.Count;
                _vertices.Add(a);
                _vertices.Add(b);
                _vertices.Add(c);
                _vertices.Add(d);

                _normals.Add(normal);
                _normals.Add(normal);
                _normals.Add(normal);
                _normals.Add(normal);

                _uvs.Add(new Vector2(0f, 0f));
                _uvs.Add(new Vector2(0f, uvSize.y));
                _uvs.Add(new Vector2(uvSize.x, uvSize.y));
                _uvs.Add(new Vector2(uvSize.x, 0f));

                if (!flip)
                {
                    _triangles.Add(startIndex + 0);
                    _triangles.Add(startIndex + 1);
                    _triangles.Add(startIndex + 2);
                    _triangles.Add(startIndex + 0);
                    _triangles.Add(startIndex + 2);
                    _triangles.Add(startIndex + 3);
                }
                else
                {
                    _triangles.Add(startIndex + 0);
                    _triangles.Add(startIndex + 2);
                    _triangles.Add(startIndex + 1);
                    _triangles.Add(startIndex + 0);
                    _triangles.Add(startIndex + 3);
                    _triangles.Add(startIndex + 2);
                }
            }

            public Mesh Build(string name)
            {
                if (_vertices.Count == 0)
                {
                    return null;
                }

                Mesh mesh = new Mesh
                {
                    name = name
                };

                if (_vertices.Count > 65535)
                {
                    mesh.indexFormat = UnityEngine.Rendering.IndexFormat.UInt32;
                }

                mesh.SetVertices(_vertices);
                mesh.SetNormals(_normals);
                mesh.SetUVs(0, _uvs);
                mesh.SetTriangles(_triangles, 0);
                mesh.RecalculateBounds();
                return mesh;
            }
        }

        private struct MeshPart
        {
            public Mesh Mesh;
            public Material Material;
            public int SubMeshIndex;
            public Matrix4x4 LocalMatrix;
            public Bounds WorldBounds;
            public Vector4 LightmapScaleOffset;
            public Vector4 RealtimeLightmapScaleOffset;
        }

        private enum MeshFace
        {
            Left,
            Right,
            Bottom,
            Top,
            Back,
            Front
        }
    }
}
