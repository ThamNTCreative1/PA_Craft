using System.Collections.Generic;
using UnityEngine;

namespace Game.Events.Noel
{
    /// <summary>
    /// Đặt trên root chứa các SnowGridChunk (chỉ chạy khi Play). Làm 3 việc:
    /// 1) tăng đồng hồ tuyết + cho các ô đầy lại (chỉ khối có ô đang chờ),
    /// 2) dựng lại mesh các khối bẩn, tối đa SnowQuality.RebuildsPerFrame khối mỗi frame,
    /// 3) ẩn MeshRenderer của khối xa người chơi hơn SnowQuality.CullDistance × CullDistanceScale của khối (kiểm tra mỗi 0.5 s).
    /// Registry tĩnh: chỉ cần MỘT manager trong scene, nó xử lý mọi khối (kể cả khối thuộc root khác, vd. tuyết mái nhà).
    /// Không có manager: khối tự dựng lại ngay khi đổi và không đầy lại.
    /// </summary>
    [DisallowMultipleComponent]
    public class SnowGridManager : MonoBehaviour
    {
        public static SnowGridManager Instance { get; private set; }

        [Tooltip("Chu kỳ (s) kiểm tra khoảng cách để ẩn/hiện khối.")]
        [SerializeField] private float cullInterval = 0.5f;

        private static readonly List<SnowGridChunk> Queue = new List<SnowGridChunk>(64);

        private float cullTimer;

        private void OnEnable()
        {
            if (Instance == null) Instance = this;
            cullTimer = 0f;
        }

        private void OnDisable()
        {
            if (Instance != this) return;
            Instance = null;

            // Không còn ai xử lý hàng đợi: dựng lại ngay và hiện lại toàn bộ
            for (int i = 0; i < Queue.Count; i++)
            {
                if (Queue[i] != null && Queue[i].IsDirty) Queue[i].Rebuild();
            }
            Queue.Clear();
            var all = SnowGridChunk.All;
            for (int i = 0; i < all.Count; i++) all[i].Renderer.enabled = true;
        }

        /// <summary>Đưa khối vào hàng đợi dựng lại. false nếu không có manager (người gọi tự dựng).</summary>
        public static bool Enqueue(SnowGridChunk chunk)
        {
            if (Instance == null) return false;
            if (!Queue.Contains(chunk)) Queue.Add(chunk);
            return true;
        }

        public static void Unqueue(SnowGridChunk chunk) => Queue.Remove(chunk);

        private void Update()
        {
            if (Instance != this) return;

            SnowGridChunk.AdvanceClock(Time.deltaTime);
            var all = SnowGridChunk.All;
            for (int i = 0; i < all.Count; i++)
            {
                if (all[i].HasPending) all[i].Tick();
            }

            cullTimer -= Time.deltaTime;
            if (cullTimer <= 0f)
            {
                cullTimer = cullInterval;
                UpdateCulling();
            }

            ProcessQueue(SnowQuality.RebuildsPerFrame);
        }

        private static void ProcessQueue(int budget)
        {
            int i = 0;
            while (budget > 0 && i < Queue.Count)
            {
                SnowGridChunk chunk = Queue[i];
                if (chunk == null || !chunk.IsDirty)
                {
                    Queue.RemoveAt(i);
                    continue;
                }
                // Khối đang bị ẩn: để IsDirty, dựng khi hiện lại (UpdateCulling đưa lại vào hàng đợi)
                if (!chunk.Renderer.enabled)
                {
                    Queue.RemoveAt(i);
                    continue;
                }
                Queue.RemoveAt(i);
                chunk.Rebuild();
                budget--;
            }
        }

        private static void UpdateCulling()
        {
            Transform target = SnowTrailPainter.Local != null ? SnowTrailPainter.Local.transform : null;
            if (target == null)
            {
                Camera cam = Camera.main;
                if (cam == null) return;
                target = cam.transform;
            }

            Vector3 p = target.position;
            float maxDist = SnowQuality.CullDistance;
            var all = SnowGridChunk.All;
            for (int i = 0; i < all.Count; i++)
            {
                SnowGridChunk chunk = all[i];
                Vector3 o = chunk.transform.position;
                // Khoảng cách XZ tới hình chữ nhật của khối
                float dx = Mathf.Max(0f, Mathf.Max(o.x - p.x, p.x - (o.x + chunk.SizeX * SnowGridChunk.CellSize)));
                float dz = Mathf.Max(0f, Mathf.Max(o.z - p.z, p.z - (o.z + chunk.SizeZ * SnowGridChunk.CellSize)));
                float d = maxDist * chunk.CullDistanceScale;
                bool visible = dx * dx + dz * dz <= d * d;

                MeshRenderer r = chunk.Renderer;
                if (r.enabled == visible) continue;
                r.enabled = visible;
                if (visible && chunk.IsDirty && !Queue.Contains(chunk)) Queue.Add(chunk);
            }
        }
    }
}
