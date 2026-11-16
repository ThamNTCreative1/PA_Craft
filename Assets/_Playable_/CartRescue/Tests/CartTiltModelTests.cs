using System;
using NUnit.Framework;
using Playable.CartRescue.Core;

namespace Playable.CartRescue.Tests
{
    public class CartTiltModelTests
    {
        private const float Dt = 1f / 60f;

        private static CartTiltModel Run(float load, float accel, int steps, CartTiltModel model = null)
        {
            model = model ?? new CartTiltModel(TiltConfig.Default);
            for (int i = 0; i < steps; i++) model.Step(load, accel, Dt);
            return model;
        }

        [Test]
        public void ZeroLoadZeroAccel_StaysLevel()
        {
            CartTiltModel m = Run(0f, 0f, 200);

            Assert.AreEqual(0f, m.Angle, 1e-6f);
        }

        [Test]
        public void PositiveLoad_TiltsPositiveAndClamped()
        {
            CartTiltModel m = Run(10f, 0f, 300);

            Assert.Greater(m.Angle, 0f);
            Assert.LessOrEqual(m.Angle, TiltConfig.Default.MaxTiltRad + 1e-5f);
        }

        [Test]
        public void MaxTilt_Is18Degrees()
        {
            Assert.AreEqual(18f * (float)Math.PI / 180f, TiltConfig.Default.MaxTiltRad, 1e-5f);
        }

        [Test]
        public void AccelRight_TiltsNegative()
        {
            CartTiltModel m = Run(0f, 20f, 10);

            Assert.Less(m.Angle, 0f);
        }

        [Test]
        public void ReleasedFromTilt_ReturnsToLevel()
        {
            CartTiltModel m = Run(2f, 0f, 120);
            Assert.Greater(Math.Abs(m.Angle), 0.01f);

            Run(0f, 0f, 600, m);

            Assert.Less(Math.Abs(m.Angle), 0.005f);
        }
    }
}
