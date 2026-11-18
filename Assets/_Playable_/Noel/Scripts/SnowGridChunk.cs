using System.Collections.Generic;
using UnityEngine;


namespace Game.Events.Noel
{
    /// <summary>
    /// Một khối tuyết dạng lưới voxel (ô 0.5 m, dày 0.15 m), tối đa 32×32 ô (16×16 m).
    /// Quy ước: transform.position = GÓC NHỎ NHẤT (minX, mặt đất, minZ) của khối; ô (x, z) chiếm
    /// [x*0.5, (x+1)*0.5] × [z*0.5, (z+1)*0.5] theo toạ độ local, mặt đất ở y = 0. Không xoay, không scale.
    /// Mỗi ô có mức tuyết 0..3 (0 = hết tuyết, 3 = đầy). Mesh tạo lúc chạy (DontSave), không lưu thành asset.
    /// Khối gộp (mái nhà, mặt đất không phẳng): mỗi ô có độ cao riêng so với transform.position.y (cellHeights,
    /// bước 0.01 m) hoặc không có ô (NoCell). Khối không có cellHeights: mọi ô ở y = 0 như cũ.
    /// Trạng thái ô chỉ ở bộ nhớ runtime (không serialize) nên không bao giờ bị lưu vào scene/prefab.
    /// </summary>
    [ExecuteAlways]
    [DisallowMultipleComponent]
    [RequireComponent(typeof(MeshFilter), typeof(MeshRenderer))]
    public class SnowGridChunk : MonoBehaviour
    {
        public const float CellSize = 0.5f;
        public const float Thickness = 0.15f;
        public const int MaxCells = 32;
        public const byte FullLevel = 3;

        /// <summary>Bước độ cao của từng ô (m) trong cellHeights.</summary>
        public const float HeightStep = 0.01f;
        /// <summary>Giá trị cellHeights của ô không có tuyết (ngoài mái / ngoài mặt đất).</summary>
        public const short NoCell = short.MinValue;

        private const float LevelHeight = Thickness / FullLevel;
        private const float NotPending = -1f;

        /// <summary>Tất cả khối đang bật (registry tĩnh, SnowGridManager và SnowTrailPainter dùng).</summary>
        public static readonly List<SnowGridChunk> All = new List<SnowGridChunk>();

        /// <summary>Đồng hồ chung của hệ tuyết (s). SnowGridManager tăng mỗi frame; test có thể tự tăng.</summary>
        public static float Clock { get; private set; }

        public static void AdvanceClock(float dt) => Clock += dt;

        [Tooltip("Số ô theo trục X (mỗi ô 0.5 m, tối đa 32).")]
        [SerializeField] private int sizeX = 32;
        [Tooltip("Số ô theo trục Z (mỗi ô 0.5 m, tối đa 32).")]
        [SerializeField] private int sizeZ = 32;
        [Tooltip("Thời gian (s) trước khi ô bị dẫm bắt đầu đầy lại. <= 0: không đầy lại.")]
        [SerializeField] private float refillSeconds = 30f;
        [Tooltip("Dao động ngẫu nhiên của refillSeconds cho từng ô (0.2 = ±20%).")]
        [Range(0f, 0.5f)]
        [SerializeField] private float refillJitter = 0.2f;
        [Tooltip("Khoảng cách (s) giữa các nấc đầy lại (3 nấc).")]
        [SerializeField] private float refillStepSeconds = 0.5f;
        [Tooltip("Hệ số nhân khoảng cách ẩn khối (SnowQuality.CullDistance × hệ số). Tuyết mái nhà: 1.5 (nhìn thấy từ xa).")]
        [Min(0.1f)]
        [SerializeField] private float cullDistanceScale = 1f;
        [Tooltip("Độ cao từng ô (bước 0.01 m, so với transform.position.y); NoCell = không có ô. Rỗng: mọi ô ở y = 0.")]
        [SerializeField, HideInInspector] private short[] cellHeights;

        // ---- Runtime (không serialize) ----
        private byte[] levels;
        private short[] stateHeights; // cellHeights mà levels đang dựa theo (null nếu khối phẳng)
        private float minBaseY, maxBaseY; // khoảng độ cao (local) của các ô
        private float[] nextStepAt;   // thời điểm (Clock) lên nấc tiếp theo, NotPending nếu đầy
        private float[] clearedAt;    // thời điểm (Clock) ô bị dẫm gần nhất
        private readonly List<int> pending = new List<int>();
        private Mesh mesh;
        private MeshFilter meshFilter;
        private MeshRenderer meshRenderer;

        public int SizeX => sizeX;
        public int SizeZ => sizeZ;
        public int CellCount => sizeX * sizeZ;
        public float CullDistanceScale => cullDistanceScale;
        public bool IsDirty { get; private set; }
        public bool HasPending => pending.Count > 0;
        public MeshRenderer Renderer => meshRenderer;
        public Mesh RuntimeMesh => mesh;
        /// <summary>Khối có độ cao riêng từng ô (khối gộp).</summary>
        public bool HasCellHeights => stateHeights != null;
        /// <summary>Độ cao (local) lớn nhất của đáy các ô.</summary>
        public float MaxBaseHeight => maxBaseY;

        /// <summary>Giới hạn world (XZ theo kích thước lưới, Y từ đáy ô thấp nhất tới mặt tuyết ô cao nhất).</summary>
        public Bounds WorldBounds
        {
            get
            {
                EnsureState();
                Vector3 size = new Vector3(sizeX * CellSize, maxBaseY - minBaseY + Thickness, sizeZ * CellSize);
                return new Bounds(transform.position + new Vector3(size.x * 0.5f, minBaseY + size.y * 0.5f, size.z * 0.5f), size);
            }
        }

        /// <summary>Đặt kích thước (dùng khi dựng prefab). Gọi trong editor, trước khi lưu.</summary>
        public void Configure(int cellsX, int cellsZ) => Configure(cellsX, cellsZ, null);

        /// <summary>
        /// Đặt kích thước và độ cao từng ô (bước <see cref="HeightStep"/>, <see cref="NoCell"/> = không có ô).
        /// heights null hoặc sai độ dài: khối phẳng như cũ. Gọi trong editor, trước khi lưu.
        /// </summary>
        public void Configure(int cellsX, int cellsZ, short[] heights)
        {
            sizeX = Mathf.Clamp(cellsX, 1, MaxCells);
            sizeZ = Mathf.Clamp(cellsZ, 1, MaxCells);
            cellHeights = heights != null && heights.Length == sizeX * sizeZ ? (short[])heights.Clone() : null;
            levels = null;
            if (isActiveAndEnabled) Rebuild();
        }

        private void OnEnable()
        {
            meshFilter = GetComponent<MeshFilter>();
            meshRenderer = GetComponent<MeshRenderer>();
            EnsureState();
            Rebuild();
            All.Add(this);
        }

        private void OnDisable()
        {
            All.Remove(this);
            // SnowGridManager is not used in PA_Craft (approved plan O1-A).
            if (meshFilter != null && meshFilter.sharedMesh == mesh) meshFilter.sharedMesh = null;
            DestroyMesh();
        }

        private void OnValidate()
        {
            sizeX = Mathf.Clamp(sizeX, 1, MaxCells);
            sizeZ = Mathf.Clamp(sizeZ, 1, MaxCells);
        }

        private void EnsureState()
        {
            int count = sizeX * sizeZ;
            short[] heights = cellHeights != null && cellHeights.Length == count ? cellHeights : null;
            if (levels != null && levels.Length == count && stateHeights == heights) return;
            stateHeights = heights;
            minBaseY = 0f;
            maxBaseY = 0f;
            if (heights != null)
            {
                bool any = false;
                for (int i = 0; i < count; i++)
                {
                    if (heights[i] == NoCell) continue;
                    float y = heights[i] * HeightStep;
                    if (!any || y < minBaseY) minBaseY = y;
                    if (!any || y > maxBaseY) maxBaseY = y;
                    any = true;
                }
            }
            levels = new byte[count];
            for (int i = 0; i < count; i++) levels[i] = HasCell(i) ? FullLevel : (byte)0;
            nextStepAt = null;
            clearedAt = null;
            pending.Clear();
            IsDirty = true;
        }

        private void EnsureRefillState()
        {
            if (nextStepAt != null) return;
            int count = levels.Length;
            nextStepAt = new float[count];
            clearedAt = new float[count];
            for (int i = 0; i < count; i++)
            {
                nextStepAt[i] = NotPending;
                clearedAt[i] = float.NegativeInfinity;
            }
        }

        // ------------------------------------------------------------------ Truy vấn ô

        public int GetLevel(int x, int z) => levels[z * sizeX + x];

        /// <summary>Ô có tồn tại không (khối phẳng: luôn có).</summary>
        private bool HasCell(int i) => stateHeights == null || stateHeights[i] != NoCell;

        /// <summary>Độ cao (local) của đáy ô.</summary>
        private float CellBaseY(int i) => stateHeights == null || stateHeights[i] == NoCell ? 0f : stateHeights[i] * HeightStep;

        /// <summary>Ô có tồn tại và worldY nằm trong khoảng [đáy ô - below, mặt tuyết + aboveTop].</summary>
        private bool CellInHeightWindow(int i, float worldY, float below, float aboveTop)
        {
            if (!HasCell(i)) return false;
            float baseY = transform.position.y + CellBaseY(i);
            return worldY >= baseY - below && worldY <= baseY + Thickness + aboveTop;
        }

        /// <summary>Đổi toạ độ world sang ô; false nếu nằm ngoài khối.</summary>
        public bool TryGetCell(Vector3 worldPos, out int x, out int z)
        {
            Vector3 local = worldPos - transform.position;
            x = Mathf.FloorToInt(local.x / CellSize);
            z = Mathf.FloorToInt(local.z / CellSize);
            return x >= 0 && z >= 0 && x < sizeX && z < sizeZ;
        }

        /// <summary>
        /// Có tuyết dưới chân không: ô còn tuyết, hoặc vừa bị dẫm trong <paramref name="recentClearGrace"/> giây
        /// (để bước chân vừa đục ô vẫn tính là "đi trên tuyết").
        /// </summary>
        public bool IsSnowAt(Vector3 worldPos, float recentClearGrace)
        {
            if (!TryGetCell(worldPos, out int x, out int z)) return false;
            int i = z * sizeX + x;
            if (!HasCell(i)) return false;
            if (levels[i] > 0) return true;
            return clearedAt != null && Clock - clearedAt[i] <= recentClearGrace;
        }

        /// <summary>Tìm khối có ô chứa điểm (XZ) với đáy ô trong khoảng chiều cao cho phép (tính theo độ cao của ô).</summary>
        public static SnowGridChunk FindAt(Vector3 worldPos, float below, float aboveTop)
        {
            for (int i = 0; i < All.Count; i++)
            {
                SnowGridChunk c = All[i];
                Vector3 o = c.transform.position;
                if (worldPos.y < o.y + c.minBaseY - below || worldPos.y > o.y + c.maxBaseY + Thickness + aboveTop) continue;
                if (!c.TryGetCell(worldPos, out int x, out int z)) continue;
                if (c.CellInHeightWindow(z * c.sizeX + x, worldPos.y, below, aboveTop)) return c;
            }
            return null;
        }

        // ------------------------------------------------------------------ Dọn tuyết

        /// <summary>
        /// Dọn các ô có tâm cách đoạn from→to (XZ, world) không quá <paramref name="radius"/>,
        /// luôn dọn cả ô chứa điểm <paramref name="to"/>. Trả về true nếu có ô bị dọn.
        /// </summary>
        public bool ClearSegment(Vector3 from, Vector3 to, float radius) =>
            ClearSegment(from, to, radius, float.PositiveInfinity, float.PositiveInfinity);

        /// <summary>
        /// Như trên nhưng chỉ dọn ô có to.y nằm trong [đáy ô - below, mặt tuyết + aboveTop]
        /// (khối gộp: mỗi ô một độ cao, đứng trên mái không dọn tuyết mặt đất bên dưới).
        /// </summary>
        public bool ClearSegment(Vector3 from, Vector3 to, float radius, float below, float aboveTop)
        {
            Vector3 origin = transform.position;
            Vector2 a = new Vector2(from.x - origin.x, from.z - origin.z) / CellSize;
            Vector2 b = new Vector2(to.x - origin.x, to.z - origin.z) / CellSize;
            float r = radius / CellSize;

            int x0 = Mathf.Max(0, Mathf.FloorToInt(Mathf.Min(a.x, b.x) - r));
            int x1 = Mathf.Min(sizeX - 1, Mathf.FloorToInt(Mathf.Max(a.x, b.x) + r));
            int z0 = Mathf.Max(0, Mathf.FloorToInt(Mathf.Min(a.y, b.y) - r));
            int z1 = Mathf.Min(sizeZ - 1, Mathf.FloorToInt(Mathf.Max(a.y, b.y) + r));

            bool changed = false;
            if (x0 <= x1 && z0 <= z1)
            {
                Vector2 ab = b - a;
                float abLen2 = Mathf.Max(ab.sqrMagnitude, 1e-6f);
                float r2 = r * r;
                for (int z = z0; z <= z1; z++)
                {
                    for (int x = x0; x <= x1; x++)
                    {
                        Vector2 p = new Vector2(x + 0.5f, z + 0.5f);
                        float t = Mathf.Clamp01(Vector2.Dot(p - a, ab) / abLen2);
                        if ((a + ab * t - p).sqrMagnitude > r2) continue;
                        int i = z * sizeX + x;
                        if (!CellInHeightWindow(i, to.y, below, aboveTop)) continue;
                        changed |= ClearCellInternal(i);
                    }
                }
            }

            int cx = Mathf.FloorToInt(b.x), cz = Mathf.FloorToInt(b.y);
            if (cx >= 0 && cz >= 0 && cx < sizeX && cz < sizeZ && CellInHeightWindow(cz * sizeX + cx, to.y, below, aboveTop))
                changed |= ClearCellInternal(cz * sizeX + cx);

            if (changed) MarkDirty();
            return changed;
        }

        public bool ClearCell(int x, int z)
        {
            bool changed = ClearCellInternal(z * sizeX + x);
            if (changed) MarkDirty();
            return changed;
        }

        private bool ClearCellInternal(int i)
        {
            if (!HasCell(i)) return false;
            EnsureRefillState();
            clearedAt[i] = Clock;
            if (levels[i] == 0) return false;

            levels[i] = 0;
            if (refillSeconds > 0f)
            {
                if (nextStepAt[i] == NotPending) pending.Add(i);
                nextStepAt[i] = Clock + refillSeconds * (1f + Random.Range(-refillJitter, refillJitter));
            }
            return true;
        }

        /// <summary>Đổ đầy toàn bộ khối ngay lập tức (dùng khi reset / sau test).</summary>
        public void RefillAll()
        {
            for (int i = 0; i < levels.Length; i++) levels[i] = HasCell(i) ? FullLevel : (byte)0;
            if (nextStepAt != null)
            {
                for (int i = 0; i < nextStepAt.Length; i++)
                {
                    nextStepAt[i] = NotPending;
                    clearedAt[i] = float.NegativeInfinity;
                }
            }
            pending.Clear();
            MarkDirty();
        }

        /// <summary>
        /// Cho các ô đang chờ đầy lên nấc khi đến hạn (theo <see cref="Clock"/>). Chỉ duyệt các ô đang chờ.
        /// </summary>
        public void Tick()
        {
            if (pending.Count == 0) return;

            float now = Clock;
            bool changed = false;
            for (int k = pending.Count - 1; k >= 0; k--)
            {
                int i = pending[k];
                if (now < nextStepAt[i]) continue;

                levels[i]++;
                changed = true;
                if (levels[i] >= FullLevel)
                {
                    levels[i] = FullLevel;
                    nextStepAt[i] = NotPending;
                    int last = pending.Count - 1;
                    pending[k] = pending[last];
                    pending.RemoveAt(last);
                }
                else
                {
                    nextStepAt[i] = now + refillStepSeconds;
                }
            }

            if (changed) MarkDirty();
        }

        private void MarkDirty()
        {
            if (IsDirty) return;
            IsDirty = true;
            Rebuild(); // PA_Craft: no SnowGridManager, rebuild immediately (plan O1-A)
        }

        // ------------------------------------------------------------------ Dựng mesh

        // Bộ đệm dùng chung cho mọi khối (chỉ chạy trên main thread) => không cấp phát khi dựng lại
        private static readonly List<Vector3> Verts = new List<Vector3>(4096);
        private static readonly List<Vector3> Normals = new List<Vector3>(4096);
        private static readonly List<Color32> Colors = new List<Color32>(4096);
        private static readonly List<int> Indices = new List<int>(8192);
        private static bool[] visited = new bool[MaxCells * MaxCells];

        private static readonly Color32 TopFullColor = new Color32(255, 255, 255, 255);
        private static readonly Color32 TopLowColor = new Color32(230, 230, 230, 255);   // ~0.9
        private static readonly Color32 WallColor = new Color32(217, 217, 217, 255);     // ~0.85

        /// <summary>Dựng lại mesh từ mức tuyết hiện tại (mặt trên gộp tham lam + vách đứng).</summary>
        public void Rebuild()
        {
            EnsureState();
            IsDirty = false;

            if (mesh == null)
            {
                mesh = new Mesh { name = name + "_SnowGrid", hideFlags = HideFlags.DontSave };
            }
            if (meshFilter == null) meshFilter = GetComponent<MeshFilter>();
            if (meshFilter.sharedMesh != mesh) meshFilter.sharedMesh = mesh;

            Verts.Clear();
            Normals.Clear();
            Colors.Clear();
            Indices.Clear();

            BuildTops();
            BuildWallsX();
            BuildWallsZ();

            // API mảng (tương thích Luna playable). Khối tối đa 32×32 ô nên luôn < 65k đỉnh (index 16-bit).
            mesh.Clear();
            mesh.vertices = Verts.ToArray();
            mesh.normals = Normals.ToArray();
            mesh.colors32 = Colors.ToArray();
            mesh.triangles = Indices.ToArray();
            float height = maxBaseY - minBaseY + Thickness;
            mesh.bounds = new Bounds(
                new Vector3(sizeX * CellSize * 0.5f, minBaseY + height * 0.5f, sizeZ * CellSize * 0.5f),
                new Vector3(sizeX * CellSize, height, sizeZ * CellSize));
        }

        private void BuildTops()
        {
            int count = sizeX * sizeZ;
            System.Array.Clear(visited, 0, count);

            for (int z = 0; z < sizeZ; z++)
            {
                for (int x = 0; x < sizeX; x++)
                {
                    int i = z * sizeX + x;
                    byte h = levels[i];
                    if (h == 0 || visited[i]) continue;
                    short hb = HeightKey(i);

                    // Mở rộng theo X (cùng mức tuyết và cùng độ cao)
                    int w = 1;
                    while (x + w < sizeX && !visited[i + w] && levels[i + w] == h && HeightKey(i + w) == hb) w++;

                    // Mở rộng theo Z khi cả hàng khớp
                    int d = 1;
                    while (z + d < sizeZ)
                    {
                        int row = (z + d) * sizeX + x;
                        bool ok = true;
                        for (int k = 0; k < w; k++)
                        {
                            if (visited[row + k] || levels[row + k] != h || HeightKey(row + k) != hb) { ok = false; break; }
                        }
                        if (!ok) break;
                        d++;
                    }

                    for (int dz = 0; dz < d; dz++)
                    {
                        int row = (z + dz) * sizeX + x;
                        for (int k = 0; k < w; k++) visited[row + k] = true;
                    }

                    float y = CellBaseY(i) + h * LevelHeight;
                    float x0 = x * CellSize, x1 = (x + w) * CellSize;
                    float z0 = z * CellSize, z1 = (z + d) * CellSize;
                    AddQuad(new Vector3(x0, y, z0), new Vector3(x0, y, z1), new Vector3(x1, y, z1), new Vector3(x1, y, z0),
                        Vector3.up, h == FullLevel ? TopFullColor : TopLowColor);
                }
            }
        }

        private short HeightKey(int i) => stateHeights == null ? (short)0 : stateHeights[i];

        /// <summary>
        /// Vách của ô i nhìn sang ô n (n &lt; 0: ngoài khối): từ max(mặt tuyết ô bên cạnh, đáy ô i) lên mặt tuyết ô i.
        /// Ô bên cạnh không có / ngoài khối: vách từ đáy ô i. Trả về false nếu không cần vách.
        /// </summary>
        private bool GetWall(int i, int n, out float top, out float bottom)
        {
            float baseY = CellBaseY(i);
            top = baseY + levels[i] * LevelHeight;
            bottom = baseY;
            if (n >= 0 && HasCell(n)) bottom = Mathf.Max(bottom, CellBaseY(n) + levels[n] * LevelHeight);
            return HasCell(i) && top > bottom;
        }

        /// <summary>Vách hướng -X / +X (mặt phẳng x = hằng), gộp theo Z các ô có cùng (đỉnh, đáy).</summary>
        private void BuildWallsX()
        {
            for (int side = 0; side < 2; side++)
            {
                int dir = side == 0 ? -1 : 1;
                for (int x = 0; x < sizeX; x++)
                {
                    int nx = x + dir;
                    bool inside = nx >= 0 && nx < sizeX;
                    float px = (side == 0 ? x : x + 1) * CellSize;
                    int z = 0;
                    while (z < sizeZ)
                    {
                        if (!GetWall(z * sizeX + x, inside ? z * sizeX + nx : -1, out float top, out float bottom)) { z++; continue; }

                        int start = z;
                        z++;
                        while (z < sizeZ)
                        {
                            if (!GetWall(z * sizeX + x, inside ? z * sizeX + nx : -1, out float top2, out float bottom2)
                                || top2 != top || bottom2 != bottom) break;
                            z++;
                        }

                        float z0 = start * CellSize, z1 = z * CellSize;
                        if (side == 0)
                            AddQuad(new Vector3(px, bottom, z1), new Vector3(px, top, z1), new Vector3(px, top, z0), new Vector3(px, bottom, z0),
                                Vector3.left, WallColor);
                        else
                            AddQuad(new Vector3(px, bottom, z0), new Vector3(px, top, z0), new Vector3(px, top, z1), new Vector3(px, bottom, z1),
                                Vector3.right, WallColor);
                    }
                }
            }
        }

        /// <summary>Vách hướng -Z / +Z (mặt phẳng z = hằng), gộp theo X.</summary>
        private void BuildWallsZ()
        {
            for (int side = 0; side < 2; side++)
            {
                int dir = side == 0 ? -1 : 1;
                for (int z = 0; z < sizeZ; z++)
                {
                    int nz = z + dir;
                    bool inside = nz >= 0 && nz < sizeZ;
                    float pz = (side == 0 ? z : z + 1) * CellSize;
                    int x = 0;
                    while (x < sizeX)
                    {
                        if (!GetWall(z * sizeX + x, inside ? nz * sizeX + x : -1, out float top, out float bottom)) { x++; continue; }

                        int start = x;
                        x++;
                        while (x < sizeX)
                        {
                            if (!GetWall(z * sizeX + x, inside ? nz * sizeX + x : -1, out float top2, out float bottom2)
                                || top2 != top || bottom2 != bottom) break;
                            x++;
                        }

                        float x0 = start * CellSize, x1 = x * CellSize;
                        if (side == 0)
                            AddQuad(new Vector3(x0, bottom, pz), new Vector3(x0, top, pz), new Vector3(x1, top, pz), new Vector3(x1, bottom, pz),
                                Vector3.back, WallColor);
                        else
                            AddQuad(new Vector3(x1, bottom, pz), new Vector3(x1, top, pz), new Vector3(x0, top, pz), new Vector3(x0, bottom, pz),
                                Vector3.forward, WallColor);
                    }
                }
            }
        }

        /// <summary>Thêm quad a-b-c-d (chiều kim đồng hồ khi nhìn từ phía normal).</summary>
        private static void AddQuad(Vector3 a, Vector3 b, Vector3 c, Vector3 d, Vector3 normal, Color32 color)
        {
            int start = Verts.Count;
            Verts.Add(a); Verts.Add(b); Verts.Add(c); Verts.Add(d);
            Normals.Add(normal); Normals.Add(normal); Normals.Add(normal); Normals.Add(normal);
            Colors.Add(color); Colors.Add(color); Colors.Add(color); Colors.Add(color);
            Indices.Add(start); Indices.Add(start + 1); Indices.Add(start + 2);
            Indices.Add(start); Indices.Add(start + 2); Indices.Add(start + 3);
        }

        private void DestroyMesh()
        {
            if (mesh == null) return;
            if (Application.isPlaying) Destroy(mesh);
            else DestroyImmediate(mesh);
            mesh = null;
            IsDirty = false;
        }
    }
}
