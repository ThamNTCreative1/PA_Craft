using NUnit.Framework;
using Playable.MonsterArmy.Core;

namespace Playable.MonsterArmy.Tests
{
    public class BossHealthModelTests
    {
        private const float Max = 1000f;
        private const float Floor = 0.10f;

        private static BossHealthModel NewBoss() => new BossHealthModel(Max, Floor);

        /// <summary>Đánh boss xuống còn đúng percent mong muốn để dựng tình huống test.</summary>
        private static BossHealthModel BossAt(float percent)
        {
            BossHealthModel boss = NewBoss();
            // Sát thương bị giảm khi gần sàn, nên phải gặm từng miếng nhỏ cho tới khi chạm mốc.
            int guard = 0;
            while (boss.Percent > percent && guard++ < 100000) boss.ApplyDamage(1f);
            return boss;
        }

        [Test]
        public void FreshBoss_IsAtFullHealth()
        {
            BossHealthModel boss = NewBoss();

            Assert.AreEqual(Max, boss.Current, 0.001f);
            Assert.AreEqual(1f, boss.Percent, 0.001f);
            Assert.AreEqual(Floor, boss.FloorPercent, 0.001f);
            Assert.IsFalse(boss.IsAtFloor);
        }

        [Test]
        public void ApplyDamage_AboveFloor_SubtractsFullAmount()
        {
            BossHealthModel boss = NewBoss();

            float dealt = boss.ApplyDamage(100f);

            Assert.AreEqual(100f, dealt, 0.001f, "no falloff while far above the floor");
            Assert.AreEqual(900f, boss.Current, 0.001f);
        }

        [Test]
        public void ApplyDamage_NearFloor_SubtractsLessThanRaw()
        {
            BossHealthModel boss = BossAt(0.15f);

            float dealt = boss.ApplyDamage(100f);

            Assert.Less(dealt, 100f, "damage must fall off inside the danger band");
            Assert.Greater(dealt, 0f, "the bar must still visibly move");
        }

        [Test]
        public void ApplyDamage_ReturnsAmountActuallySubtracted()
        {
            BossHealthModel boss = BossAt(0.15f);
            float before = boss.Current;

            float dealt = boss.ApplyDamage(100f);

            Assert.AreEqual(before - boss.Current, dealt, 0.001f);
        }

        // --- Review Focus #2: boss already at the floor keeps taking hits ---

        [Test]
        public void ApplyDamage_AtFloor_NeverDropsBelowFloor()
        {
            BossHealthModel boss = BossAt(Floor);

            for (int i = 0; i < 500; i++) boss.ApplyDamage(250f);

            Assert.GreaterOrEqual(boss.Percent, Floor - 0.0001f);
            Assert.IsTrue(boss.IsAtFloor);
        }

        [Test]
        public void ApplyDamage_AtFloor_CurrentStaysPositive()
        {
            BossHealthModel boss = BossAt(Floor);

            for (int i = 0; i < 500; i++) boss.ApplyDamage(250f);

            Assert.Greater(boss.Current, 0f);
        }

        [Test]
        public void ApplyDamage_HugeAmount_ClampsToFloorNotZero()
        {
            BossHealthModel boss = NewBoss();

            boss.ApplyDamage(float.MaxValue);

            Assert.AreEqual(Max * Floor, boss.Current, 0.01f);
            Assert.AreEqual(Floor, boss.Percent, 0.001f);
        }

        [Test]
        public void ApplyDamage_NegativeAmount_IsIgnored()
        {
            BossHealthModel boss = NewBoss();

            float dealt = boss.ApplyDamage(-500f);

            Assert.AreEqual(0f, dealt, 0.001f);
            Assert.AreEqual(Max, boss.Current, 0.001f, "negative damage must not heal the boss");
        }

        // --- Review Focus #3: Roar drains life with no corpses on the field ---

        [Test]
        public void Drain_WithZeroCorpses_HealsNothing()
        {
            BossHealthModel boss = BossAt(0.5f);
            float before = boss.Current;

            float healed = boss.Drain(0, 25f);

            Assert.AreEqual(0f, healed, 0.001f);
            Assert.AreEqual(before, boss.Current, 0.001f);
        }

        [Test]
        public void Drain_WithZeroCorpses_LeavesCurrentFinite()
        {
            BossHealthModel boss = BossAt(0.5f);

            boss.Drain(0, 25f);

            Assert.IsFalse(float.IsNaN(boss.Current));
            Assert.IsFalse(float.IsInfinity(boss.Current));
            Assert.IsFalse(float.IsNaN(boss.Percent));
        }

        [Test]
        public void Drain_CannotExceedMaxHealth()
        {
            BossHealthModel boss = NewBoss();

            float healed = boss.Drain(1000, 500f);

            Assert.AreEqual(0f, healed, 0.001f, "already full, nothing to heal");
            Assert.AreEqual(Max, boss.Current, 0.001f);
        }

        [Test]
        public void Drain_AfterDamage_RaisesPercent()
        {
            BossHealthModel boss = BossAt(0.2f);
            float before = boss.Percent;

            float healed = boss.Drain(4, 25f);

            Assert.AreEqual(100f, healed, 0.001f);
            Assert.Greater(boss.Percent, before, "Roar must visibly push the bar back up");
        }
    }
}
