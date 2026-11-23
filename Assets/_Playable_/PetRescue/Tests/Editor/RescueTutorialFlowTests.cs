using NUnit.Framework;

namespace Playable.PetRescue.Tests
{
    public class RescueTutorialFlowTests
    {
        [Test] public void DragHintWithTitleShowsUntilEnoughRealMovementThenTapToJump()
        {
            var flow = new RescueTutorialFlow();
            Assert.AreEqual(RescueTutorialFlow.Step.Drag, flow.Current);
            Assert.IsTrue(flow.DragVisible); Assert.IsTrue(flow.TitleVisible); Assert.IsFalse(flow.PetPointerVisible);
            flow.Tick(1, false, 1); flow.Tick(1, true, .1f);
            Assert.AreEqual(RescueTutorialFlow.Step.Drag, flow.Current, "Idle or a tiny nudge does not complete the drag step");
            flow.Tick(.2f, true, .8f); Assert.AreEqual(RescueTutorialFlow.Step.Drag, flow.Current);
            flow.Tick(.2f, true, .8f);
            Assert.AreEqual(RescueTutorialFlow.Step.Jump, flow.Current, "TAP TO JUMP follows the joystick step (no camera-swipe step)");
            Assert.IsFalse(flow.DragVisible); Assert.IsFalse(flow.TitleVisible); Assert.IsTrue(flow.JumpTapVisible); Assert.IsTrue(flow.JumpHintVisible);
            Assert.IsFalse(flow.PetPointerVisible);
        }

        [Test] public void TapToJumpCompletesOnJumpOrTimeoutAndHasNoIdleHand()
        {
            var a = Dragged(); a.OnJumped();
            Assert.AreEqual(RescueTutorialFlow.Step.FindPet, a.Current); Assert.IsFalse(a.JumpTapVisible); Assert.IsTrue(a.PetPointerVisible);
            var b = Dragged(); b.Tick(RescueTutorialFlow.IdleReprompt + .5f, false, 0);
            Assert.IsTrue(b.JumpTapVisible); Assert.IsFalse(b.DragVisible, "No joystick re-prompt over the jump step");
            b.Tick(RescueTutorialFlow.JumpTimeout, false, 0); Assert.AreEqual(RescueTutorialFlow.Step.FindPet, b.Current, "Timeout fallback");
            var c = new RescueTutorialFlow(); c.OnJumped(); Assert.AreEqual(RescueTutorialFlow.Step.Drag, c.Current, "An early jump does not skip the joystick step");
        }

        [Test] public void PetPointerKeepsGuidingAfterCollectsAndTimeout()
        {
            var a = Started(); a.OnPetCollected();
            Assert.AreEqual(RescueTutorialFlow.Step.Free, a.Current); Assert.IsTrue(a.PetPointerVisible, "Still points to the remaining pets");
            var b = Started(); b.Tick(RescueTutorialFlow.FindPetTimeout + .1f, true, 1);
            Assert.AreEqual(RescueTutorialFlow.Step.Free, b.Current); Assert.IsTrue(b.PetPointerVisible);
        }

        [Test] public void IdleRepromptShowsHandWithoutTitleAndClearsOnMove()
        {
            var flow = Started(); flow.OnPetCollected();
            flow.Tick(RescueTutorialFlow.IdleReprompt - .1f, false, 0); Assert.IsFalse(flow.DragVisible);
            flow.Tick(.2f, false, 0); Assert.IsTrue(flow.DragVisible); Assert.IsFalse(flow.TitleVisible);
            flow.Tick(.016f, true, 1); Assert.IsFalse(flow.DragVisible);
        }

        [Test] public void TntJumpHintShowsOnceForTheFirstHazard()
        {
            var flow = Started();
            flow.OnTntApproached(1, false); Assert.IsFalse(flow.TntWarningVisible, "Approach waits while the pet pointer step runs");
            flow.OnPetCollected();
            flow.OnTntApproached(2, false); Assert.IsTrue(flow.TntWarningVisible); Assert.IsTrue(flow.JumpHintVisible); Assert.AreEqual(2, flow.TntIndex);
            flow.OnTntApproached(5, true); Assert.AreEqual(2, flow.TntIndex, "Second hazard does not restart the warning");
            flow.Tick(RescueTutorialFlow.TntWarningTime + .01f, true, 1); Assert.IsFalse(flow.TntWarningVisible);
            flow.OnTntApproached(5, true); Assert.IsFalse(flow.TntWarningVisible, "Shown only once");
        }

        [Test] public void JumpingAnswersTheHintQuickly()
        {
            var flow = Started(); flow.OnTntApproached(3, true);
            Assert.IsTrue(flow.JumpHintVisible); Assert.AreEqual(3, flow.TntIndex, "A hit shows it even during early steps");
            flow.OnJumped(); flow.Tick(.5f, true, 1); Assert.IsFalse(flow.JumpHintVisible);
        }

        [Test] public void FinishHidesEverything()
        {
            var flow = new RescueTutorialFlow(); flow.OnTntApproached(0, true); flow.Finish();
            Assert.IsFalse(flow.DragVisible || flow.TitleVisible || flow.PetPointerVisible || flow.TntWarningVisible);
            flow.Tick(10, false, 0); Assert.IsFalse(flow.DragVisible);
        }

        private static RescueTutorialFlow Dragged()
        {
            var flow = new RescueTutorialFlow(); flow.Tick(.5f, true, 1);
            Assert.AreEqual(RescueTutorialFlow.Step.Jump, flow.Current);
            return flow;
        }

        private static RescueTutorialFlow Started()
        {
            var flow = Dragged(); flow.OnJumped();
            Assert.AreEqual(RescueTutorialFlow.Step.FindPet, flow.Current);
            return flow;
        }
    }
}
