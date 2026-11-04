using System;

namespace Playable.MonsterArmy.Core
{
    /// <summary>
    /// Máu boss với sàn không thể xuyên thủng. Boss không bao giờ chết — playable
    /// luôn kết thúc bằng CTA lúc hết giờ, không có trạng thái thắng.
    ///
    /// Để người chơi không nhận ra trò bịp, máu vẫn tụt thật; chỉ khi lọt vào dải
    /// nguy hiểm sát sàn thì sát thương mới giảm dần. Cộng với <see cref="Drain"/>
    /// gắn vào đòn Roar của boss, người chơi đọc ra "boss càng yếu càng lì" chứ
    /// không phải "thanh máu bị khoá".
    /// </summary>
    public sealed class BossHealthModel
    {
        /// <summary>Bề rộng dải giảm sát thương, tính theo phần trăm máu tối đa phía trên sàn.</summary>
        public const float FalloffBand = 0.25f;

        /// <summary>Hệ số sát thương tại đúng sàn. Khác 0 để thanh máu luôn còn nhúc nhích.</summary>
        public const float MinDamageMultiplier = 0.05f;

        private readonly float _floorHealth;

        public BossHealthModel(float maxHealth, float minHealthPercent = 0.10f)
        {
            if (maxHealth <= 0f) throw new ArgumentOutOfRangeException(nameof(maxHealth));

            MaxHealth = maxHealth;
            FloorPercent = Clamp01(minHealthPercent);
            _floorHealth = MaxHealth * FloorPercent;
            Current = MaxHealth;
        }

        public float MaxHealth { get; }
        public float Current { get; private set; }
        public float Percent => Current / MaxHealth;
        public float FloorPercent { get; }
        public bool IsAtFloor => Percent <= FloorPercent + 0.0001f;

        /// <summary>Trừ máu và trả về lượng thực sự bị trừ sau khi áp hệ số giảm.</summary>
        public float ApplyDamage(float rawDamage)
        {
            if (!(rawDamage > 0f)) return 0f;

            float effective = rawDamage * DamageMultiplier();
            float before = Current;
            Current = Math.Max(_floorHealth, Current - effective);
            return before - Current;
        }

        /// <summary>
        /// Hút sinh lực từ xác quái (đòn Roar). Trả về lượng hồi thực tế.
        /// Không xác nào thì hồi 0 — không NaN, không vượt máu tối đa.
        /// </summary>
        public float Drain(int corpseCount, float healthPerCorpse)
        {
            if (corpseCount <= 0 || !(healthPerCorpse > 0f)) return 0f;

            float before = Current;
            Current = Math.Min(MaxHealth, Current + corpseCount * healthPerCorpse);
            return Current - before;
        }

        /// <summary>
        /// 1.0 khi còn xa sàn; giảm tuyến tính xuống <see cref="MinDamageMultiplier"/>
        /// trong dải <see cref="FalloffBand"/> ngay trên sàn.
        /// </summary>
        private float DamageMultiplier()
        {
            float headroom = (Percent - FloorPercent) / FalloffBand;
            if (headroom >= 1f) return 1f;
            if (headroom <= 0f) return MinDamageMultiplier;
            return MinDamageMultiplier + (1f - MinDamageMultiplier) * headroom;
        }

        private static float Clamp01(float value)
        {
            if (value < 0f) return 0f;
            return value > 1f ? 1f : value;
        }
    }
}
