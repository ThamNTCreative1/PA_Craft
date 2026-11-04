using System;

namespace Playable.MonsterArmy.Core
{
    /// <summary>
    /// Năm loại quái trong thanh chọn. Mỗi loại khác nhau rõ về đòn đánh và kiểu nổ
    /// để màn hình đa dạng — xem spec mục 5.4.
    /// </summary>
    public enum MonsterKind
    {
        Brute,
        Gunner,
        Bomber,
        Laser,
        Tank
    }

    /// <summary>
    /// Nhóm vũ khí trong kho SSPGame: Art/Characters/Weapons/{CanChien,Sung,ChatNo}.
    /// Mỗi nhân vật rút ngẫu nhiên một món trong nhóm hợp với lối đánh của nó —
    /// ngẫu nhiên hoàn toàn thì sẽ có xạ thủ cầm cây chổi.
    /// </summary>
    public enum WeaponCategory
    {
        Melee,
        Gun,
        Explosive
    }

    public readonly struct MonsterStats
    {
        public MonsterStats(float health, float damage, float moveSpeed, float attackRange, float attackInterval)
        {
            Health = health;
            Damage = damage;
            MoveSpeed = moveSpeed;
            AttackRange = attackRange;
            AttackInterval = attackInterval;
        }

        public float Health { get; }
        public float Damage { get; }
        public float MoveSpeed { get; }
        public float AttackRange { get; }
        public float AttackInterval { get; }

        /// <summary>
        /// Chỉ số khởi điểm. Cân bằng bằng cách chơi thử, không bằng bảng tính:
        /// một đợt quái phải sống đủ lâu để gặm thấy rõ máu boss, nhưng chết đủ
        /// nhanh để người chơi phải thả thêm.
        /// </summary>
        public static WeaponCategory CategoryFor(MonsterKind kind)
        {
            switch (kind)
            {
                case MonsterKind.Brute:
                case MonsterKind.Tank:
                    return WeaponCategory.Melee;
                case MonsterKind.Gunner:
                case MonsterKind.Laser:
                    return WeaponCategory.Gun;
                case MonsterKind.Bomber:
                    return WeaponCategory.Explosive;
                default:
                    throw new ArgumentOutOfRangeException(nameof(kind), kind, null);
            }
        }

        public static MonsterStats For(MonsterKind kind)
        {
            switch (kind)
            {
                //                         health damage  speed  range  interval
                case MonsterKind.Brute:  return new MonsterStats(60f, 12f, 2.2f, 0.8f, 0.6f);
                case MonsterKind.Gunner: return new MonsterStats(35f, 7f, 1.8f, 5.0f, 0.4f);
                case MonsterKind.Bomber: return new MonsterStats(40f, 22f, 1.6f, 3.5f, 1.4f);
                case MonsterKind.Laser:  return new MonsterStats(30f, 9f, 1.7f, 6.5f, 0.9f);
                case MonsterKind.Tank:   return new MonsterStats(180f, 5f, 1.2f, 0.9f, 1.0f);
                default: throw new ArgumentOutOfRangeException(nameof(kind), kind, null);
            }
        }
    }
}
