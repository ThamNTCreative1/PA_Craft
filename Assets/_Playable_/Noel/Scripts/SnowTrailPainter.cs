using UnityEngine;

namespace Game.Events.Noel
{
    /// <summary>
    /// Gắn lên nhân vật CHÍNH (người chơi local). Đi qua lưới tuyết (SnowGridChunk) thì dọn các ô dưới chân.
    /// Quét cả đoạn từ vị trí trước tới vị trí hiện tại nên chạy nhanh cũng không bị đứt vệt.
    /// </summary>
    public class SnowTrailPainter : MonoBehaviour
    {
        /// <summary>Người chơi local đang bật (SnowGridManager dùng để ẩn khối ở xa).</summary>
        public static SnowTrailPainter Local { get; private set; }

        [Tooltip("Ô có tâm cách chân không quá bán kính này (m) sẽ bị dọn. Ô dưới chân luôn bị dọn.")]
        [SerializeField] private float radius = 0.3f;
        [Tooltip("Chỉ dọn khi đã đi được quãng này (m).")]
        [SerializeField] private float minMove = 0.1f;
        [Tooltip("Chân thấp hơn mặt đất quá mức này (m) thì không dọn.")]
        [SerializeField] private float maxDepthBelow = 0.3f;
        [Tooltip("Chân cao hơn mặt tuyết quá mức này (m) thì không dọn (đang nhảy, đứng trên vật khác).")]
        [SerializeField] private float maxHeightAbove = 0.4f;
        [Tooltip("Đoạn di chuyển dài hơn mức này (m) trong 1 frame coi là dịch chuyển tức thời, không quét.")]
        [SerializeField] private float maxSegment = 3f;

        private Vector3 lastPosition;
        private bool hasLast;

        private void OnEnable()
        {
            hasLast = false;
            Local = this;
        }

        private void OnDisable()
        {
            if (Local == this) Local = null;
        }

        private void Update()
        {
            if (!SnowQuality.TrailsEnabled) return;

            Vector3 position = transform.position;
            if (hasLast && (position - lastPosition).sqrMagnitude < minMove * minMove) return;

            // Dịch chuyển xa (hồi sinh, teleport) thì không quét đoạn nối
            Vector3 from = hasLast && (position - lastPosition).sqrMagnitude <= maxSegment * maxSegment ? lastPosition : position;
            float topAbove = SnowGridChunk.Thickness + maxHeightAbove;
            var chunks = SnowGridChunk.All;
            for (int i = 0; i < chunks.Count; i++)
            {
                SnowGridChunk chunk = chunks[i];
                Vector3 o = chunk.transform.position;
                if (position.y < o.y - maxDepthBelow || position.y > o.y + chunk.MaxBaseHeight + topAbove) continue;

                float maxX = o.x + chunk.SizeX * SnowGridChunk.CellSize;
                float maxZ = o.z + chunk.SizeZ * SnowGridChunk.CellSize;
                if (Mathf.Max(from.x, position.x) < o.x - radius || Mathf.Min(from.x, position.x) > maxX + radius) continue;
                if (Mathf.Max(from.z, position.z) < o.z - radius || Mathf.Min(from.z, position.z) > maxZ + radius) continue;

                // Lọc chiều cao theo từng ô (khối gộp có ô ở nhiều độ cao)
                chunk.ClearSegment(from, position, radius, maxDepthBelow, maxHeightAbove);
            }

            lastPosition = position;
            hasLast = true;
        }
    }
}
