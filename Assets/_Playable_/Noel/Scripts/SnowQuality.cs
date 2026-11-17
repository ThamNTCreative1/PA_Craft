using UnityEngine;

namespace Game.Events.Noel
{
    /// <summary>
    /// Cấu hình lớp tuyết theo mức chất lượng của game (QualitySettings: Low, Medium, High, Cinematic).
    /// </summary>
    public static class SnowQuality
    {
        private static int Level => QualitySettings.GetQualityLevel();

        /// <summary>Máy rất yếu (Low + RAM &lt; 3GB): tuyết tĩnh, không có vệt chân.</summary>
        public static bool TrailsEnabled => !(Level <= 0 && SystemInfo.systemMemorySize < 3000);

        /// <summary>Khoảng cách (m) tối đa từ người chơi tới khối tuyết còn được vẽ.</summary>
        public static float CullDistance => Level <= 0 ? 40f : Level == 1 ? 55f : 70f;

        /// <summary>Số khối tuyết tối đa được dựng lại mesh mỗi frame.</summary>
        public static int RebuildsPerFrame => Level <= 0 ? 1 : 2;

        // ---- Tuyết rơi (noel_snowfall) ở mức Low; các mức khác dùng giá trị của prefab ----

        /// <summary>Mức Low: tuyết rơi nhẹ (ít hạt, vùng rơi nhỏ, bông to hơn).</summary>
        public static bool SnowfallLow => Level <= 0;

        /// <summary>Lượng bông tuyết sinh ra mỗi giây ở mức Low (mức khác: snowAmount của WeatherController).</summary>
        public const float LowSnowfallRate = 90f;

        /// <summary>Số bông tuyết tối đa ở mức Low.</summary>
        public const int LowSnowfallMaxParticles = 750;

        /// <summary>Kích thước vùng rơi quanh người chơi ở mức Low.</summary>
        public static readonly Vector3 LowSnowfallBoxScale = new Vector3(24f, 8f, 24f);

        /// <summary>Hệ số phóng to bông tuyết ở mức Low (bù cho số lượng ít hơn).</summary>
        public const float LowSnowfallSizeMultiplier = 1.5f;

        // ---- Dùng cho SnowSurface cũ (tấm phẳng + mặt nạ), không còn dùng trong prefab ----

        /// <summary>Độ phân giải mặt nạ vệt chân của mỗi tấm (SnowSurface cũ).</summary>
        public static int MaskResolution => Level <= 0 ? 32 : 64;

        /// <summary>Khoảng thời gian (s) giữa 2 lần cho tuyết lấp lại (SnowSurface cũ).</summary>
        public static float RefillTick => Level <= 0 ? 2f : Level == 1 ? 1f : 0.5f;

        /// <summary>Số khung hình tối thiểu giữa 2 lần đẩy mặt nạ lên GPU (SnowSurface cũ).</summary>
        public static int UploadEveryFrames => Level <= 0 ? 4 : 2;
    }
}
