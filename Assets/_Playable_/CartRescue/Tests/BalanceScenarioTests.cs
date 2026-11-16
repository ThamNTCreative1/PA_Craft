using System;
using System.Collections.Generic;
using NUnit.Framework;
using Playable.CartRescue.Core;

namespace Playable.CartRescue.Tests
{
    /// <summary>
    /// Kịch bản cảm giác chơi chạy đúng code runtime (CartSimulation): thả nhân vật thứ 4 lệch phải, rồi một người
    /// chơi "chăm chú" kéo xe về phía thấp (phản xạ trễ, tốc độ ngón tay khác nhau) cho tới khi xe cân.
    /// </summary>
    public class BalanceScenarioTests
    {
        private const float Dt = 1f / 60f;
        private const float SlotUnit = 1.45f;   // khớp CartRescueSetup.SlotUnit
        private const float Rider = 0.35f;
        private static readonly float Deg = (float)Math.PI / 180f;

        private static CartSimulation Dropped()
        {
            var sim = new CartSimulation(MotionConfig.Default, TiltConfig.Default, DeckConfig.Default, SlotUnit, 0f);
            sim.Deck.Add(-1f, 0f, Rider);
            sim.Deck.Add(0f, 0f, Rider);
            sim.Deck.Add(1f, 0f, Rider);
            sim.Deck.Add(1.55f, 1.5f, Rider);
            return sim;
        }

        [Test]
        public void Drop_IdleStaysTilted_NeverSettles()
        {
            CartSimulation sim = Dropped();

            for (int i = 0; i < 600; i++) Assert.AreNotEqual(DeckEvent.Settled, sim.Step(Dt), "settled by itself at frame " + i);

            Assert.Greater(sim.Tilt.Angle, 8f * Deg);
        }

        /// <returns>Số giây tới khi Settled, hoặc -1.</returns>
        private static float PlayAttentive(CartSimulation sim, float fingerSpeed, float reaction, float limit)
        {
            var seen = new List<float>();
            float settle = DeckConfig.Default.SettleAngleRad;
            MotionConfig mc = MotionConfig.Default;
            bool dragging = false;
            float finger = 0f;
            int lag = (int)(reaction / Dt);
            for (int i = 0; i < (int)(limit / Dt); i++)
            {
                seen.Add(sim.Tilt.Angle);
                float observed = seen[Math.Max(0, i - lag)];
                if (Math.Abs(observed) > settle)
                {
                    if (!dragging)
                    {
                        dragging = true;
                        finger = sim.Motion.X;
                        sim.Motion.BeginDrag(finger);
                    }
                    finger += Math.Sign(observed) * fingerSpeed * Dt;
                    finger = Math.Max(mc.MinX - 1f, Math.Min(mc.MaxX + 1f, finger));
                    sim.Motion.Drag(finger);
                }
                else if (dragging)
                {
                    dragging = false;
                    sim.Motion.EndDrag();
                }
                if (sim.Step(Dt) == DeckEvent.Settled) return i * Dt;
            }
            return -1f;
        }

        [TestCase(2f, 0.15f)]
        [TestCase(2f, 0.3f)]
        [TestCase(2f, 0.5f)]
        [TestCase(4f, 0.15f)]
        [TestCase(4f, 0.3f)]
        [TestCase(4f, 0.5f)]
        [TestCase(7f, 0.15f)]
        public void AttentivePlayer_SettlesWithinFiveSeconds(float fingerSpeed, float reaction)
        {
            CartSimulation sim = Dropped();
            for (int i = 0; i < 180; i++) sim.Step(Dt);

            float t = PlayAttentive(sim, fingerSpeed, reaction, 5f);

            Assert.GreaterOrEqual(t, 0f, "never settled");
            Assert.IsTrue(sim.Deck.IsSettled);
        }

        private static CartSimulation Settled()
        {
            CartSimulation sim = Dropped();
            for (int i = 0; i < 180; i++) sim.Step(Dt);
            Assert.GreaterOrEqual(PlayAttentive(sim, 3f, 0.25f, 6f), 0f);
            for (int i = 0; i < 60; i++) sim.Step(Dt);
            return sim;
        }

        [Test]
        public void SettledThenGentlePushRight_StaysLocked()
        {
            CartSimulation sim = Settled();
            float start = sim.Motion.X;
            sim.Motion.BeginDrag(start);

            for (int i = 0; i < 60; i++)
            {
                sim.Motion.Drag(start + 5f * (i + 1) / 60f);
                Assert.AreNotEqual(DeckEvent.Unlocked, sim.Step(Dt), "unlocked at frame " + i);
            }
            Assert.IsTrue(sim.Deck.IsSettled);
        }

        [Test]
        public void SettledThenPushIntoMaxX_HoldAndRelease_StaysLocked()
        {
            CartSimulation sim = Settled();
            float start = sim.Motion.X;
            sim.Motion.BeginDrag(start);

            for (int i = 0; i < 300; i++)
            {
                sim.Motion.Drag(start + 5f * (i + 1) / 60f); // đẩy nhẹ 5 world/s, vượt quá MaxX
                Assert.AreNotEqual(DeckEvent.Unlocked, sim.Step(Dt), "unlocked while pushing into wall at frame " + i);
            }
            sim.Motion.EndDrag();
            for (int i = 0; i < 120; i++) Assert.AreNotEqual(DeckEvent.Unlocked, sim.Step(Dt), "unlocked after release at frame " + i);
            Assert.AreEqual(MotionConfig.Default.MaxX, sim.Motion.X, 0.05f);
        }

        [Test]
        public void SettledThenSmoothFlingAndRelease_StaysLocked()
        {
            CartSimulation sim = Settled();
            float finger = sim.Motion.X;
            sim.Motion.BeginDrag(finger);

            // Ngón tay tăng tốc đều tới 11 world/s trong 1s rồi buông giữa chừng.
            for (int i = 0; i < 60; i++)
            {
                finger -= 11f * (i + 1) / 60f * Dt;
                sim.Motion.Drag(finger);
                sim.Step(Dt);
            }
            sim.Motion.EndDrag();
            for (int i = 0; i < 240; i++) Assert.AreNotEqual(DeckEvent.Unlocked, sim.Step(Dt), "unlocked after release at frame " + i);
        }

        [Test]
        public void SettledThenHardJerk_Unlocks()
        {
            CartSimulation sim = Settled();
            float start = sim.Motion.X;
            sim.Motion.BeginDrag(start);
            bool unlocked = false;

            for (int i = 0; i < 30; i++)
            {
                sim.Motion.Drag(start - 4f * Math.Min(1f, (i + 1) / 6f));
                if (sim.Step(Dt) == DeckEvent.Unlocked) unlocked = true;
            }

            Assert.IsTrue(unlocked);
        }
    }
}
