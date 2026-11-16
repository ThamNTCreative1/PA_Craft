using System;
using NUnit.Framework;
using Playable.CartRescue.Core;

namespace Playable.CartRescue.Tests
{
    public class DeckSolverTests
    {
        private const float Dt = 1f / 60f;
        private const float W = 0.45f;
        private static readonly float Deg = (float)Math.PI / 180f;

        private static DeckSolver NewDeck(params float[] positions)
        {
            var deck = new DeckSolver(DeckConfig.Default);
            foreach (float s in positions) deck.Add(s, 0f, W);
            return deck;
        }

        private static void Run(DeckSolver deck, float tilt, float accel, float speed, int steps)
        {
            for (int i = 0; i < steps; i++) deck.Step(tilt, accel, speed, Dt);
        }

        private static float[] Sorted(DeckSolver deck)
        {
            var s = new float[deck.Count];
            for (int i = 0; i < s.Length; i++) s[i] = deck.Position(i);
            Array.Sort(s);
            return s;
        }

        private static void AssertValid(DeckSolver deck, string context)
        {
            float half = DeckConfig.Default.HalfLength;
            float[] s = Sorted(deck);
            for (int i = 0; i < s.Length; i++)
                Assert.LessOrEqual(Math.Abs(s[i]) + W, half + 1e-4f, context + ": rider off deck at " + s[i]);
            for (int i = 1; i < s.Length; i++)
                Assert.GreaterOrEqual(s[i] - s[i - 1], 2 * W - 1e-4f, context + ": overlap " + s[i - 1] + " / " + s[i]);
        }

        [Test]
        public void InitialThree_Level_StayPut()
        {
            DeckSolver deck = NewDeck(-1f, 0f, 1f);

            Run(deck, 0f, 0f, 0f, 120);

            Assert.AreEqual(-1f, deck.Position(0), 1e-4f);
            Assert.AreEqual(0f, deck.Position(1), 1e-4f);
            Assert.AreEqual(1f, deck.Position(2), 1e-4f);
            Assert.AreEqual(0f, deck.LoadMoment, 1e-4f);
        }

        [Test]
        public void Tilted_RidersSlideDownhill_AndPileAgainstWall()
        {
            DeckSolver deck = NewDeck(-1.5f, -0.5f, 0.5f, 1.4f);
            float[] before = Sorted(deck);

            Run(deck, 12f * Deg, 0f, 0f, 600);

            float[] after = Sorted(deck);
            for (int i = 0; i < before.Length - 1; i++) Assert.Greater(after[i], before[i]);
            Assert.AreEqual(2f - W, after[3], 0.01f);
            for (int i = 1; i < after.Length; i++) Assert.AreEqual(2 * W, after[i] - after[i - 1], 0.01f);
        }

        [Test]
        public void AccelTowardLowSide_PushesRidersBack()
        {
            DeckSolver deck = NewDeck(-1.5f, -0.5f, 0.5f, 1.4f);
            Run(deck, 12f * Deg, 0f, 0f, 600);
            float piled = Sorted(deck)[3];

            Run(deck, 12f * Deg, 25f, 0f, 30);

            Assert.Less(Sorted(deck)[3], piled - 0.05f);
        }

        [Test]
        public void AddRider_OnTopOfExisting_IsSeparated()
        {
            DeckSolver deck = NewDeck(0f);
            deck.Add(0f, 0f, W);

            Run(deck, 0f, 0f, 0f, 1);

            Assert.GreaterOrEqual(Math.Abs(deck.Position(1) - deck.Position(0)), 2 * W - 1e-4f);
        }

        [Test]
        public void AddRider_PastEdge_IsClamped()
        {
            DeckSolver deck = NewDeck(3f);

            Run(deck, 0f, 0f, 0f, 1);

            Assert.LessOrEqual(deck.Position(0), 2f - W + 1e-4f);
        }

        [Test]
        public void AddRider_IsValidImmediately_BeforeAnyStep()
        {
            DeckSolver deck = NewDeck(-1f, 0f, 1f);

            deck.Add(1.1f, 1.5f, W);

            AssertValid(deck, "right after Add");
        }

        [Test]
        public void LevelAndStill_ForSettleTime_SnapsToSlots()
        {
            DeckSolver deck = NewDeck(-1.45f, -0.4f, 0.6f, 1.55f);
            int frames = 0;
            DeckEvent e = DeckEvent.None;
            while (e != DeckEvent.Settled && frames < 200)
            {
                e = deck.Step(0f, 0f, 0f, Dt);
                frames++;
            }

            Assert.AreEqual(DeckEvent.Settled, e);
            Assert.LessOrEqual(frames * Dt, DeckConfig.Default.SettleTime + 2 * Dt);
            Run(deck, 0f, 0f, 0f, 60);
            var used = new bool[4];
            for (int i = 0; i < 4; i++)
            {
                int slot = deck.Slot(i);
                Assert.GreaterOrEqual(slot, 0);
                Assert.IsFalse(used[slot], "slot used twice");
                used[slot] = true;
                Assert.AreEqual(DeckConfig.Default.Slots[slot], deck.Position(i), 0.01f);
            }
            Assert.IsTrue(deck.IsSettled);
        }

        [Test]
        public void NotSettled_WithThreeRiders()
        {
            DeckSolver deck = NewDeck(-1f, 0f, 1f);

            for (int i = 0; i < 120; i++) Assert.AreNotEqual(DeckEvent.Settled, deck.Step(0f, 0f, 0f, Dt));
            Assert.IsFalse(deck.IsSettled);
        }

        private static DeckSolver SettledDeck()
        {
            DeckSolver deck = NewDeck(-1.5f, -0.5f, 0.5f, 1.5f);
            Run(deck, 0f, 0f, 0f, 60);
            Assert.IsTrue(deck.IsSettled);
            return deck;
        }

        [Test]
        public void Settled_GentleAccel_StaysLocked()
        {
            DeckSolver deck = SettledDeck();

            for (int i = 0; i < 60; i++)
                Assert.AreNotEqual(DeckEvent.Unlocked, deck.Step(0f, 0.5f * DeckConfig.Default.UnlockAccel, 1f, Dt));

            Assert.IsTrue(deck.IsSettled);
        }

        [Test]
        public void Settled_HardJerk_Unlocks()
        {
            DeckSolver deck = SettledDeck();
            int unlocks = 0;

            for (int i = 0; i < 10; i++)
                if (deck.Step(0f, 1.5f * DeckConfig.Default.UnlockAccel, 1f, Dt) == DeckEvent.Unlocked) unlocks++;

            Assert.AreEqual(1, unlocks);
            Assert.IsFalse(deck.IsSettled);
            for (int i = 0; i < 4; i++) Assert.AreEqual(-1, deck.Slot(i));
        }

        [Test]
        public void Fuzz_RandomJerks_NeverLeavesDeckOrOverlaps()
        {
            var rng = new Random(1234);
            DeckSolver deck = NewDeck(-1f, 0f, 1f);
            deck.Add(1.6f, -2f, W);

            for (int i = 0; i < 5000; i++)
            {
                float tilt = (float)(rng.NextDouble() * 2 - 1) * 18f * Deg;
                float accel = (float)(rng.NextDouble() * 2 - 1) * 60f;
                deck.Step(tilt, accel, accel * 0.1f, Dt);
                AssertValid(deck, "step " + i);
            }
        }
    }
}
