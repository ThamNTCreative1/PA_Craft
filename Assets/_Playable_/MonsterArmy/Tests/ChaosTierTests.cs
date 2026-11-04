using NUnit.Framework;
using Playable.MonsterArmy.Core;

namespace Playable.MonsterArmy.Tests
{
    public class ChaosTierTests
    {
        [TestCase(0)]
        [TestCase(1)]
        [TestCase(4)]
        public void Tier1_HasSixExplosionsAndNoComboText(int live)
        {
            ChaosLevel level = ChaosTier.ForLiveMonsters(live);

            Assert.AreEqual(6, level.MaxConcurrentExplosions);
            Assert.IsFalse(level.ShowComboText);
            Assert.IsFalse(level.ScreenFlash);
            Assert.IsFalse(level.BurningBorder);
        }

        [TestCase(5)]
        [TestCase(9)]
        public void Tier2_HasFourteenExplosionsAndComboText(int live)
        {
            ChaosLevel level = ChaosTier.ForLiveMonsters(live);

            Assert.AreEqual(14, level.MaxConcurrentExplosions);
            Assert.IsTrue(level.ShowComboText);
            Assert.IsFalse(level.ScreenFlash);
        }

        [TestCase(10)]
        [TestCase(17)]
        public void Tier3_HasTwentyFourExplosionsAndFlash(int live)
        {
            ChaosLevel level = ChaosTier.ForLiveMonsters(live);

            Assert.AreEqual(24, level.MaxConcurrentExplosions);
            Assert.IsTrue(level.ShowComboText);
            Assert.IsTrue(level.ScreenFlash);
            Assert.IsFalse(level.BurningBorder);
        }

        [TestCase(18)]
        [TestCase(500)]
        public void Tier4_HasBurningBorder(int live)
        {
            ChaosLevel level = ChaosTier.ForLiveMonsters(live);

            Assert.AreEqual(32, level.MaxConcurrentExplosions);
            Assert.IsTrue(level.BurningBorder);
            Assert.IsTrue(level.ScreenFlash);
            Assert.IsTrue(level.ShowComboText);
        }

        [Test]
        public void ExplosionBudget_NeverExceedsCap()
        {
            for (int live = 0; live <= 2000; live++)
            {
                Assert.LessOrEqual(
                    ChaosTier.ForLiveMonsters(live).MaxConcurrentExplosions,
                    ChaosTier.MaxConcurrentExplosionsCap,
                    "frame rate protection: the cap is hard at " + ChaosTier.MaxConcurrentExplosionsCap);
            }
        }

        [Test]
        public void ShakeAmplitude_IncreasesMonotonicallyWithLiveCount()
        {
            float previous = -1f;
            foreach (int live in new[] { 0, 4, 5, 9, 10, 17, 18, 100 })
            {
                float amplitude = ChaosTier.ForLiveMonsters(live).ShakeAmplitude;
                Assert.GreaterOrEqual(amplitude, previous);
                previous = amplitude;
            }

            Assert.Greater(ChaosTier.ForLiveMonsters(18).ShakeAmplitude,
                ChaosTier.ForLiveMonsters(0).ShakeAmplitude,
                "dropping the 10th monster must feel bigger than the 3rd");
        }

        [Test]
        public void ForLiveMonsters_NegativeCount_ReturnsTier1()
        {
            ChaosLevel level = ChaosTier.ForLiveMonsters(-5);

            Assert.AreEqual(6, level.MaxConcurrentExplosions);
            Assert.IsFalse(level.BurningBorder);
        }

        [Test]
        public void MonsterStats_EveryKindHasPositiveHealthAndDamage()
        {
            foreach (MonsterKind kind in System.Enum.GetValues(typeof(MonsterKind)))
            {
                MonsterStats stats = MonsterStats.For(kind);

                Assert.Greater(stats.Health, 0f, kind + " health");
                Assert.Greater(stats.Damage, 0f, kind + " damage");
                Assert.Greater(stats.MoveSpeed, 0f, kind + " move speed");
                Assert.Greater(stats.AttackRange, 0f, kind + " attack range");
                Assert.Greater(stats.AttackInterval, 0f, kind + " attack interval");
            }
        }

        [Test]
        public void MonsterStats_TankHasHighestHealth()
        {
            float tank = MonsterStats.For(MonsterKind.Tank).Health;

            foreach (MonsterKind kind in System.Enum.GetValues(typeof(MonsterKind)))
            {
                if (kind == MonsterKind.Tank) continue;
                Assert.Less(MonsterStats.For(kind).Health, tank, kind + " must be squishier than Tank");
            }
        }

        // --- Nhóm vũ khí: mỗi lối đánh rút ngẫu nhiên trong đúng nhóm của nó ---

        [Test]
        public void EveryKind_HasAWeaponCategory()
        {
            foreach (MonsterKind kind in System.Enum.GetValues(typeof(MonsterKind)))
            {
                WeaponCategory category = MonsterStats.CategoryFor(kind);
                Assert.IsTrue(System.Enum.IsDefined(typeof(WeaponCategory), category), kind.ToString());
            }
        }

        [Test]
        public void MeleeKinds_GetMeleeWeapons()
        {
            Assert.AreEqual(WeaponCategory.Melee, MonsterStats.CategoryFor(MonsterKind.Brute));
            Assert.AreEqual(WeaponCategory.Melee, MonsterStats.CategoryFor(MonsterKind.Tank));
        }

        [Test]
        public void RangedKinds_GetGuns()
        {
            Assert.AreEqual(WeaponCategory.Gun, MonsterStats.CategoryFor(MonsterKind.Gunner));
            Assert.AreEqual(WeaponCategory.Gun, MonsterStats.CategoryFor(MonsterKind.Laser));
        }

        [Test]
        public void BomberGetsExplosives()
        {
            Assert.AreEqual(WeaponCategory.Explosive, MonsterStats.CategoryFor(MonsterKind.Bomber));
        }

        [Test]
        public void CategoryFor_UnknownKind_Throws()
        {
            Assert.Throws<System.ArgumentOutOfRangeException>(
                () => MonsterStats.CategoryFor((MonsterKind)99));
        }

        [Test]
        public void MonsterStats_GunnerOutrangesBrute()
        {
            Assert.Greater(
                MonsterStats.For(MonsterKind.Gunner).AttackRange,
                MonsterStats.For(MonsterKind.Brute).AttackRange,
                "ranged units must visibly hang back from melee units");
        }
    }
}
