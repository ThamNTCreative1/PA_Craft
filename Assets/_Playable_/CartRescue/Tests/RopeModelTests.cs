using System;
using NUnit.Framework;
using Playable.CartRescue.Core;

namespace Playable.CartRescue.Tests
{
    public class RopeModelTests
    {
        private const float Dt = 1f / 60f;
        private const float Rest = 2f;
        private const float Max = 6f;

        private static RopeModel NewRope() => new RopeModel(Rest, Max, 20f, 1.5f);

        [Test]
        public void Ungrabbed_HangsBelowAnchorAtRestLength()
        {
            RopeModel rope = NewRope();
            for (int i = 0; i < 600; i++) rope.Step(1f, 5f, 0f, 0f, Dt);

            Assert.AreEqual(1f, rope.X, 0.01f);
            Assert.AreEqual(Rest, 5f - rope.Y, 0.01f);
        }

        [Test]
        public void Grabbed_FollowsTargetWithinMax()
        {
            RopeModel rope = NewRope();
            rope.Grab();
            for (int i = 0; i < 60; i++) rope.Step(0f, 0f, 1.5f, -2.5f, Dt);

            Assert.AreEqual(1.5f, rope.X, 0.02f);
            Assert.AreEqual(-2.5f, rope.Y, 0.02f);
        }

        [Test]
        public void Grabbed_TargetBeyondMax_ClampedOnLine()
        {
            RopeModel rope = NewRope();
            rope.Grab();
            for (int i = 0; i < 60; i++) rope.Step(0f, 0f, 0f, -3f * Max, Dt);

            float dist = (float)Math.Sqrt(rope.X * rope.X + rope.Y * rope.Y);
            Assert.AreEqual(Max, dist, 1e-3f);
            Assert.AreEqual(0f, rope.X, 1e-3f);
        }

        [Test]
        public void ReleaseAfterSideways_Swings()
        {
            RopeModel rope = NewRope();
            rope.Grab();
            for (int i = 0; i < 60; i++) rope.Step(0f, 0f, 1.5f, -1.3f, Dt);
            rope.Release();

            float first = 0f;
            bool flipped = false;
            for (int i = 0; i < 300; i++)
            {
                rope.Step(0f, 0f, 0f, 0f, Dt);
                if (i == 1) first = rope.SwingAngle;
                if (i > 1 && Math.Sign(rope.SwingAngle) != Math.Sign(first) && rope.SwingAngle != 0f) flipped = true;
            }

            Assert.IsTrue(flipped);
        }
    }
}
