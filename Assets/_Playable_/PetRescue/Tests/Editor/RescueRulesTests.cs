using NUnit.Framework;

namespace Playable.PetRescue.Tests
{
    public class RescueRulesTests
    {
        [Test] public void ClockWaitsForFirstTouchAndInputCannotRestartIt()
        {
            var r = new RescueRules(15,3,6);
            r.Tick(120); Assert.AreEqual(15,r.Remaining); Assert.AreEqual(RescueRules.Phase.Waiting,r.State);
            r.Start();r.Tick(2);r.Start();Assert.AreEqual(13,r.Remaining);
        }
        [Test] public void NoInputNeverConsumesTimeAndRunningReachesDeadline()
        {
            var r=new RescueRules(15,3,3);r.Tick(300);Assert.AreEqual(RescueRules.Phase.Waiting,r.State);Assert.AreEqual(15,r.Remaining);
            r.Start();r.Tick(14.999f);Assert.AreEqual(RescueRules.Phase.Running,r.State);r.Tick(.01f);Assert.AreEqual(RescueRules.Phase.Lost,r.State);Assert.AreEqual(0,r.Remaining);
            r.Start();Assert.AreEqual(RescueRules.Phase.Lost,r.State);
        }
        [Test] public void LateFirstTapStillReceivesTheFullFifteenSeconds()
        {
            var r=new RescueRules(15,3,3);r.Tick(25);Assert.AreEqual(15,r.Remaining);r.Start();r.Tick(5);
            Assert.AreEqual(10,r.Remaining);r.Start();Assert.AreEqual(10,r.Remaining);r.Tick(10);
            Assert.AreEqual(RescueRules.Phase.Lost,r.State);Assert.AreEqual(15,r.Elapsed);
        }
        [Test] public void LossAndRescueAreMutuallyExclusiveAndIdempotent()
        {
            var r = new RescueRules(15,3,6); r.Start();
            Assert.IsTrue(r.LosePet(0));Assert.IsFalse(r.LosePet(0));Assert.IsFalse(r.RescuePet(0));
            Assert.IsTrue(r.RescuePet(1));Assert.IsFalse(r.RescuePet(1));Assert.IsFalse(r.LosePet(1));
            Assert.AreEqual(1,r.Rescued);Assert.AreEqual(5,r.Alive);
        }
        [Test] public void ThirdRescueBeforeDeadlineWinsAndCannotBeOverwritten()
        {
            var r=new RescueRules(15,3,6);r.Start();r.Tick(14.999f);r.RescuePet(0);r.RescuePet(1);
            Assert.AreEqual(RescueRules.Phase.Running,r.State);r.RescuePet(2);r.Tick(15);r.LosePet(3);
            Assert.AreEqual(RescueRules.Phase.Won,r.State);Assert.AreEqual(6,r.Alive);
        }
        [Test] public void ExactDeadlineTakesPriorityOverGoal()
        {
            var r=new RescueRules(15,3,6);r.Start();r.RescuePet(0);r.RescuePet(1);r.Tick(15);
            Assert.IsFalse(r.RescuePet(2));Assert.AreEqual(RescueRules.Phase.Lost,r.State);
        }
        [Test] public void InvalidPetAndNegativeTimeFailClearly()
        {
            var r=new RescueRules(15,3,6);
            Assert.Throws<System.ArgumentOutOfRangeException>(()=>r.LosePet(6));
            Assert.Throws<System.ArgumentOutOfRangeException>(()=>r.Tick(-1));
        }
        [Test] public void LosingOneOfThreePetsWaitsForTimeoutAndCannotWin()
        {
            var r=new RescueRules(15,3,3);r.Start();r.LosePet(0);r.RescuePet(1);r.RescuePet(2);
            Assert.AreEqual(RescueRules.Phase.Running,r.State);r.Tick(15);
            Assert.AreEqual(RescueRules.Phase.Lost,r.State);Assert.AreEqual(2,r.Rescued);
        }
    }
}
