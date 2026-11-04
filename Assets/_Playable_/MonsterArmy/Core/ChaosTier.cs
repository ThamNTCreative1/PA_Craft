namespace Playable.MonsterArmy.Core
{
    /// <summary>
    /// Mức hoành tráng của màn hình tại một thời điểm. Càng đông quái càng dữ dội —
    /// đây là thứ khiến thả con thứ 10 "đã" hơn con thứ 3 một cách nhìn thấy được.
    /// </summary>
    public readonly struct ChaosLevel
    {
        public ChaosLevel(float shakeAmplitude, int maxConcurrentExplosions,
            bool showComboText, bool screenFlash, bool burningBorder)
        {
            ShakeAmplitude = shakeAmplitude;
            MaxConcurrentExplosions = maxConcurrentExplosions;
            ShowComboText = showComboText;
            ScreenFlash = screenFlash;
            BurningBorder = burningBorder;
        }

        public float ShakeAmplitude { get; }
        public int MaxConcurrentExplosions { get; }
        public bool ShowComboText { get; }
        public bool ScreenFlash { get; }
        public bool BurningBorder { get; }
    }

    public static class ChaosTier
    {
        /// <summary>
        /// Trần cứng bảo vệ khung hình. Vượt quá thì vụ nổ mới được gộp vào vụ đang
        /// chạy gần nhất thay vì sinh thêm object — xem ExplosionPool.
        /// </summary>
        public const int MaxConcurrentExplosionsCap = 32;

        public static ChaosLevel ForLiveMonsters(int liveCount)
        {
            if (liveCount >= 18) return new ChaosLevel(0.42f, MaxConcurrentExplosionsCap, true, true, true);
            if (liveCount >= 10) return new ChaosLevel(0.28f, 24, true, true, false);
            if (liveCount >= 5) return new ChaosLevel(0.16f, 14, true, false, false);
            return new ChaosLevel(0.07f, 6, false, false, false);
        }
    }
}
