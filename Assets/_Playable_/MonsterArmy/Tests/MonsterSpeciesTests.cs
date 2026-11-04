using System;
using System.Collections.Generic;
using NUnit.Framework;
using Playable.MonsterArmy.Core;

namespace Playable.MonsterArmy.Tests
{
    public class MonsterSpeciesTests
    {
        [Test]
        public void Roster_HasSixteenEntries()
        {
            Assert.AreEqual(16, MonsterRoster.Count);
            Assert.AreEqual(16, Enum.GetValues(typeof(MonsterSpecies)).Length);
        }

        [Test]
        public void EverySpecies_HasAnEntry()
        {
            foreach (MonsterSpecies species in Enum.GetValues(typeof(MonsterSpecies)))
            {
                SpeciesInfo info = MonsterRoster.Get(species);
                Assert.AreEqual(species, info.Species);
                Assert.IsNotEmpty(info.Name);
                Assert.IsNotEmpty(info.AssetKey);
            }
        }

        [Test]
        public void EverySpecies_HasAValidCombatKind()
        {
            foreach (MonsterSpecies species in Enum.GetValues(typeof(MonsterSpecies)))
            {
                MonsterKind kind = MonsterRoster.Get(species).Kind;
                Assert.IsTrue(Enum.IsDefined(typeof(MonsterKind), kind), species + " has an unknown kind");
                Assert.Greater(MonsterStats.For(kind).Health, 0f);
            }
        }

        [Test]
        public void AssetKeys_AreAllDistinct()
        {
            var seen = new HashSet<string>();
            foreach (MonsterSpecies species in Enum.GetValues(typeof(MonsterSpecies)))
            {
                string key = MonsterRoster.Get(species).AssetKey;
                Assert.IsTrue(seen.Add(key), "asset key reused: " + key);
            }
        }

        // --- Khoá asset phải khớp đúng cây thư mục Parts/{skin}/{part}/{base}_{part}.png ---

        [Test]
        public void ZombieEntries_AreFlaggedAndPrefixed()
        {
            foreach (MonsterSpecies species in Enum.GetValues(typeof(MonsterSpecies)))
            {
                SpeciesInfo info = MonsterRoster.Get(species);
                Assert.AreEqual(info.AssetKey.StartsWith("Zombie_"), info.IsZombie,
                    info.Species + ": IsZombie must follow the asset key prefix");
            }
        }

        [Test]
        public void BaseKey_StripsTheZombiePrefix()
        {
            SpeciesInfo zombie = MonsterRoster.Get(MonsterSpecies.ZombieCowboyHat);
            Assert.AreEqual("Zombie_Nguoi_CaoBoi", zombie.AssetKey);
            Assert.AreEqual("Nguoi_CaoBoi", zombie.BaseKey, "parts live under the un-prefixed name");

            SpeciesInfo human = MonsterRoster.Get(MonsterSpecies.CowboyMoustache);
            Assert.AreEqual("Nguoi_CaoBoi", human.AssetKey);
            Assert.AreEqual("Nguoi_CaoBoi", human.BaseKey);
        }

        [Test]
        public void SkinFolder_IsZombieOrHuman()
        {
            Assert.AreEqual("Zombie", MonsterRoster.Get(MonsterSpecies.ZombieAlien).SkinFolder);
            Assert.AreEqual("Human", MonsterRoster.Get(MonsterSpecies.RedHelmetWhiteShirt).SkinFolder);
        }

        [Test]
        public void LivingAndUndeadVersions_ShareABaseKey()
        {
            Assert.AreEqual(
                MonsterRoster.Get(MonsterSpecies.RedHelmetWhiteShirt).BaseKey,
                MonsterRoster.Get(MonsterSpecies.ZombieRedHelmet).BaseKey,
                "the zombie is the same character, risen");

            Assert.AreEqual(
                MonsterRoster.Get(MonsterSpecies.CowboyMoustache).BaseKey,
                MonsterRoster.Get(MonsterSpecies.ZombieCowboyHat).BaseKey);
        }

        // --- Hero: nhân vật mặc định đứng sẵn trên sàn ---

        [Test]
        public void Hero_IsTheRedHelmetWhiteShirtHuman()
        {
            SpeciesInfo hero = MonsterRoster.Get(MonsterRoster.HeroSpecies);

            Assert.AreEqual(MonsterSpecies.RedHelmetWhiteShirt, hero.Species);
            Assert.IsFalse(hero.IsZombie, "the starting character is a person, not a monster");
            Assert.AreEqual("Nguoi_MuBaoHiem", hero.AssetKey);
        }

        [Test]
        public void Boss_IsTheDarkAntleredDeer()
        {
            Assert.AreEqual("Zombie_Huou", MonsterRoster.BossAssetKey);
            Assert.AreEqual("Zombie", MonsterRoster.BossSkinFolder);
            Assert.AreEqual("Huou", MonsterRoster.BossBaseKey);
        }

        [Test]
        public void Boss_IsNotInTheSelectableRoster()
        {
            foreach (MonsterSpecies species in Enum.GetValues(typeof(MonsterSpecies)))
                Assert.AreNotEqual(MonsterRoster.BossAssetKey, MonsterRoster.Get(species).AssetKey,
                    "the boss must not be droppable from the hotbar");
        }

        [Test]
        public void DeerMaskPair_DiffersOnlyByShirtColour()
        {
            SpeciesInfo red = MonsterRoster.Get(MonsterSpecies.DeerMaskRedShirt);
            SpeciesInfo black = MonsterRoster.Get(MonsterSpecies.DeerMaskBlackShirt);

            Assert.AreEqual("Nguoi_MatNaHuou_Do", red.AssetKey);
            Assert.AreEqual("Nguoi_MatNaHuou_Den", black.AssetKey);
            Assert.IsFalse(red.IsZombie);
            Assert.IsFalse(black.IsZombie);
        }

        [Test]
        public void Roster_ContainsBothMonstersAndHumans()
        {
            int zombies = 0;
            int humans = 0;

            foreach (MonsterSpecies species in Enum.GetValues(typeof(MonsterSpecies)))
            {
                if (MonsterRoster.Get(species).IsZombie) zombies++;
                else humans++;
            }

            Assert.AreEqual(9, zombies, "9 quái: cú, 2 mặt nạ hươu hồng, 4 zombie mũ, alien, dơi");
            Assert.AreEqual(7, humans, "7 người: hero, 3 mũ, dê, 2 mặt nạ hươu");
        }

        [Test]
        public void Get_UnknownSpecies_Throws()
        {
            Assert.Throws<ArgumentOutOfRangeException>(() => MonsterRoster.Get((MonsterSpecies)999));
        }
    }
}
