using System.Collections.Generic;
using NUnit.Framework;
using Playable.CartRescue.Core;

namespace Playable.CartRescue.Tests
{
    public class CartFlowTests
    {
        private const float Finish = 30f;

        private static CartFlow At(CartPhase phase)
        {
            var f = new CartFlow(Finish);
            if (phase == CartPhase.HangDrop) return f;
            f.OnDropped();
            if (phase == CartPhase.Balance) return f;
            f.Tick(true, false, 0f);
            if (phase == CartPhase.StartReady) return f;
            f.PressStart();
            if (phase == CartPhase.Driving) return f;
            f.Tick(true, false, Finish);
            return f;
        }

        [Test]
        public void HappyPath_ReachesWin()
        {
            var f = new CartFlow(Finish);
            var seen = new List<CartPhase>();
            f.Changed += p => seen.Add(p);

            Assert.AreEqual(CartPhase.HangDrop, f.Phase);
            f.OnDropped();
            f.Tick(false, false, 0f);
            Assert.AreEqual(CartPhase.Balance, f.Phase);
            f.Tick(true, false, 0f);
            Assert.AreEqual(CartPhase.StartReady, f.Phase);
            Assert.IsTrue(f.PressStart());
            f.Tick(true, false, Finish - 1f);
            Assert.AreEqual(CartPhase.Driving, f.Phase);
            f.Tick(true, false, Finish);

            CollectionAssert.AreEqual(new[] { CartPhase.Balance, CartPhase.StartReady, CartPhase.Driving, CartPhase.Win }, seen);
        }

        [Test]
        public void Balance_Settled_ShowsStartImmediately_AnywhereOnRoad()
        {
            // Cân xong là có nút START, không cần kéo xe tới mốc nào.
            CartFlow f = At(CartPhase.Balance);

            f.Tick(true, false, -3f);

            Assert.AreEqual(CartPhase.StartReady, f.Phase);
        }

        [Test]
        public void StartReady_Unlock_FallsBackToBalance()
        {
            CartFlow f = At(CartPhase.StartReady);

            f.Tick(false, true, 1f);

            Assert.AreEqual(CartPhase.Balance, f.Phase);
        }

        [Test]
        public void PressStart_OutsideStartReady_Ignored()
        {
            CartFlow f = At(CartPhase.Balance);

            Assert.IsFalse(f.PressStart());
            Assert.AreEqual(CartPhase.Balance, f.Phase);
        }

        [Test]
        public void Driving_IgnoresUnlock()
        {
            CartFlow f = At(CartPhase.Driving);

            f.Tick(false, true, 10f);

            Assert.AreEqual(CartPhase.Driving, f.Phase);
        }

        [Test]
        public void CartDraggable_OnlyWhileBalancingOrReady()
        {
            Assert.IsFalse(At(CartPhase.HangDrop).CartDraggable);
            Assert.IsTrue(At(CartPhase.Balance).CartDraggable);
            Assert.IsTrue(At(CartPhase.StartReady).CartDraggable);
            Assert.IsFalse(At(CartPhase.Driving).CartDraggable);
            Assert.IsFalse(At(CartPhase.Win).CartDraggable);
        }
    }
}
