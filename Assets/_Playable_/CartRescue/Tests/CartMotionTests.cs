using System;
using NUnit.Framework;
using Playable.CartRescue.Core;

namespace Playable.CartRescue.Tests
{
    public class CartMotionTests
    {
        private const float Dt = 1f / 60f;

        private static void Run(CartMotion m, int steps)
        {
            for (int i = 0; i < steps; i++) m.Step(Dt);
        }

        [Test]
        public void Drag_FollowsFingerAndStops()
        {
            var m = new CartMotion(MotionConfig.Default, 0f);
            m.BeginDrag(0f);
            m.Drag(3f);

            Run(m, 120);

            Assert.AreEqual(3f, m.X, 0.05f);
            Assert.AreEqual(0f, m.Speed, 0.1f);
        }

        [Test]
        public void Drag_KeepsGrabOffset()
        {
            var m = new CartMotion(MotionConfig.Default, 1f);
            m.BeginDrag(2f);
            m.Drag(4f);

            Run(m, 120);

            Assert.AreEqual(3f, m.X, 0.05f);
        }

        [Test]
        public void Release_CoastsAndSlowsDown()
        {
            var m = new CartMotion(MotionConfig.Default, 0f);
            m.BeginDrag(0f);
            m.Drag(3f);
            Run(m, 6);
            m.EndDrag();
            float prev = m.Speed;
            Assert.Greater(prev, 0.5f);

            for (int i = 0; i < 180; i++)
            {
                m.Step(Dt);
                Assert.LessOrEqual(m.Speed, prev + 1e-5f);
                prev = m.Speed;
            }
            Assert.Less(m.Speed, 0.05f);
        }

        [Test]
        public void Drag_ClampedToRange()
        {
            MotionConfig c = MotionConfig.Default;
            var m = new CartMotion(c, 0f);
            m.BeginDrag(0f);
            m.Drag(100f);

            Run(m, 300);

            Assert.AreEqual(c.MaxX, m.X, 1e-4f);
            Assert.AreEqual(0f, m.Speed, 1e-4f);
        }

        [Test]
        public void Drive_ReachesTargetSpeed_IgnoresMaxX()
        {
            MotionConfig c = MotionConfig.Default;
            var m = new CartMotion(c, 0f);
            m.Drive(7f);

            Run(m, 600);

            Assert.AreEqual(7f, m.Speed, 1e-3f);
            Assert.Greater(m.X, c.MaxX + 10f);
        }

        [Test]
        public void CoastIntoWall_DecelerationBounded()
        {
            MotionConfig c = MotionConfig.Default;
            var m = new CartMotion(c, c.MaxX - 3f);
            m.BeginDrag(m.X);
            m.Drag(m.X + 1.2f);
            Run(m, 8);
            m.EndDrag();
            float maxDecel = 0f;

            for (int i = 0; i < 240; i++)
            {
                m.Step(Dt);
                if (m.Speed >= 0f) maxDecel = Math.Max(maxDecel, -m.Accel);
            }

            Assert.LessOrEqual(m.X, c.MaxX + 1e-4f);
            Assert.LessOrEqual(maxDecel, c.MaxCoastDecel + 0.5f);
        }

        [Test]
        public void FastRelease_DecelerationBounded()
        {
            MotionConfig c = MotionConfig.Default;
            var m = new CartMotion(c, c.MinX);
            float finger = m.X;
            m.BeginDrag(finger);
            for (int i = 0; i < 40; i++)
            {
                finger += 12f * Dt;
                m.Drag(finger);
                m.Step(Dt);
            }
            m.EndDrag();
            float maxDecel = 0f;

            for (int i = 0; i < 30; i++)
            {
                m.Step(Dt);
                maxDecel = Math.Max(maxDecel, -m.Accel);
            }

            Assert.LessOrEqual(maxDecel, c.MaxCoastDecel + 0.5f);
        }

        [Test]
        public void DragTargetBeyondMax_StopsSmoothlyAtMax()
        {
            MotionConfig c = MotionConfig.Default;
            var m = new CartMotion(c, c.MaxX - 2f);
            m.BeginDrag(m.X);
            m.Drag(m.X + 50f);
            float maxDecel = 0f;

            for (int i = 0; i < 240; i++)
            {
                m.Step(Dt);
                maxDecel = Math.Max(maxDecel, -m.Accel);
            }

            Assert.AreEqual(c.MaxX, m.X, 0.01f);
            Assert.LessOrEqual(maxDecel, 15f);
        }

        [Test]
        public void DriveThenZero_StopsGently()
        {
            var m = new CartMotion(MotionConfig.Default, 0f);
            m.Drive(7f);
            Run(m, 180);
            m.Drive(0f);

            Run(m, 180);

            Assert.AreEqual(0f, m.Speed, 1e-3f);
        }

        [Test]
        public void ScreenDrag_PixelDeltaToWorld_IndependentOfCamera()
        {
            // 1920 px chiều cao, orthoSize 8 → 16 world / 1920 px.
            Assert.AreEqual(5f + 16f * 240f / 1920f, ScreenDrag.WorldX(5f, 100f, 340f, 8f, 1920f), 1e-4f);
            Assert.AreEqual(5f, ScreenDrag.WorldX(5f, 100f, 100f, 8f, 1920f), 1e-6f);
        }

        [Test]
        public void Accel_PositiveWhenSpeedingUpRight()
        {
            var m = new CartMotion(MotionConfig.Default, 0f);
            m.BeginDrag(0f);
            m.Drag(3f);

            Run(m, 3);

            Assert.Greater(m.Accel, 0f);
        }
    }
}
