using NUnit.Framework;
using UnityEngine;

namespace Playable.PetRescue.Tests
{
    public class RescueInputTests
    {
        private static readonly Vector2 Center = new Vector2(200, 300);
        private const float Radius = 100;
        private static readonly Rect Jump = new Rect(900, 200, 160, 160);
        private GameObject _object;
        private RescuePointerInput _input;
        [SetUp] public void Open() { _object = new GameObject("Input fixture"); _input = _object.AddComponent<RescuePointerInput>(); _input.SetZones(Center, Radius, Jump); }
        [TearDown] public void Close() { Object.DestroyImmediate(_object); }

        private void Frame(params System.Action[] contacts) { _input.BeginFrame(); foreach (var c in contacts) c(); }

        [Test] public void TouchStartingOnTheJoystickDrivesTheStickFromItsFixedCenter()
        {
            Frame(() => _input.Contact(0, Center + new Vector2(50, 0), false));
            Assert.IsTrue(_input.Pressed); Assert.IsTrue(_input.StickHeld); Assert.AreEqual(.5f, _input.Stick.x, .001f);
            Frame(() => _input.Contact(0, Center + new Vector2(0, 400), false));
            Assert.AreEqual(1, _input.Stick.magnitude, .001f); Assert.AreEqual(1, _input.Stick.y, .001f, "Clamped, center never moves");
            Assert.IsFalse(_input.Pressed, "Press reported once");
            Frame(() => _input.Contact(0, Center, true));
            Assert.IsFalse(_input.StickHeld); Assert.AreEqual(Vector2.zero, _input.Stick);
        }

        [Test] public void JoystickCanBeGrabbedSlightlyOutsideItsRingButNotFarAway()
        {
            Frame(() => _input.Contact(0, Center + new Vector2(Radius * (RescuePointerInput.GrabScale - .05f), 0), false));
            Assert.IsTrue(_input.StickHeld);
            Frame(() => _input.Contact(0, Vector2.zero, true));
            for (int i = 0; i <= RescuePointerInput.HandoffFrames; i++) Frame();   // a genuinely new touch, not a handoff
            Frame(() => _input.Contact(1, Center + new Vector2(Radius * 3, 0), false));
            Assert.IsFalse(_input.StickHeld); Assert.IsTrue(_input.LookHeld, "Far touch rotates the camera instead");
        }

        [Test] public void TouchElsewhereRotatesTheCameraByHorizontalDelta()
        {
            Frame(() => _input.Contact(3, new Vector2(600, 900), false));
            Assert.AreEqual(0, _input.LookDelta); Assert.IsTrue(_input.LookHeld);
            Frame(() => _input.Contact(3, new Vector2(660, 950), false));
            Assert.AreEqual(60, _input.LookDelta, .001f); Assert.AreEqual(Vector2.zero, _input.Stick, "Camera finger never moves the hero");
            Frame(() => _input.Contact(3, new Vector2(640, 950), false));
            Assert.AreEqual(-20, _input.LookDelta, .001f);
            Frame(); Assert.AreEqual(0, _input.LookDelta, "Delta is per frame");
        }

        [Test] public void JumpFiresOncePerTapAndItsFingerDoesNothingElse()
        {
            Frame(() => _input.Contact(5, Jump.center, false));
            Assert.IsTrue(_input.JumpPressed);
            Frame(() => _input.Contact(5, Jump.center + new Vector2(-400, 0), false));
            Assert.IsFalse(_input.JumpPressed); Assert.AreEqual(0, _input.LookDelta); Assert.IsFalse(_input.StickHeld);
            Frame(() => _input.Contact(5, Jump.center, true));
            Frame(() => _input.Contact(6, Jump.center, false)); Assert.IsTrue(_input.JumpPressed, "Next tap jumps again");
        }

        [Test] public void TwoFingersMoveAndLookAtTheSameTime()
        {
            Frame(() => _input.Contact(0, Center, false), () => _input.Contact(1, new Vector2(700, 900), false));
            Frame(() => _input.Contact(0, Center + new Vector2(0, 80), false), () => _input.Contact(1, new Vector2(740, 900), false));
            Assert.AreEqual(.8f, _input.Stick.y, .001f); Assert.AreEqual(40, _input.LookDelta, .001f);
            Frame(() => _input.Contact(2, Center + new Vector2(30, 0), false));
            Assert.AreEqual(.8f, _input.Stick.y, .001f, "A third finger cannot steal the stick");
        }

        [Test] public void DraggingFarKeepsTheStickThroughATouchToMouseHandoff()
        {
            // Finger starts on the joystick and drags far away; the runtime then drops the touch and reports its
            // simulated mouse at the same spot. The joystick must keep steering instead of resetting.
            Frame(() => _input.Contact(0, Center, false));
            Frame(() => _input.Contact(0, Center + new Vector2(600, 0), false));
            Frame(() => _input.Contact(0, Center + new Vector2(600, 0), true));          // spurious Ended
            Assert.AreEqual(Vector2.zero, _input.Stick);
            Frame(() => _input.Contact(-1, Center + new Vector2(620, 10), false));        // simulated mouse
            Assert.IsTrue(_input.StickHeld, "Role handed over"); Assert.IsFalse(_input.LookHeld, "Not turned into a camera swipe");
            Assert.IsFalse(_input.Pressed, "Handoff is not a new press");
            Assert.AreEqual(1, _input.Stick.x, .01f);
            Frame(() => _input.Contact(-1, Center + new Vector2(0, 500), false));
            Assert.AreEqual(1, _input.Stick.y, .01f, "Keeps steering after the handoff");
        }

        [Test] public void MouseOwnedStickHandsBackToARealTouch()
        {
            Frame(() => _input.Contact(-1, Center, false));
            Frame(() => _input.Contact(-1, Center + new Vector2(400, 0), false));
            // Real touches arrive: the mouse role counts as gone and the touch at the same spot takes it.
            Frame(() => _input.Contact(-1, Center + new Vector2(400, 0), true), () => _input.Contact(4, Center + new Vector2(410, 0), false));
            Assert.IsTrue(_input.StickHeld); Assert.IsFalse(_input.LookHeld); Assert.AreEqual(1, _input.Stick.x, .01f);
            Frame(() => _input.Contact(4, Center, true)); Assert.IsFalse(_input.StickHeld, "Real release still releases");
        }

        [Test] public void CameraSwipeAlsoSurvivesAHandoff()
        {
            Frame(() => _input.Contact(2, new Vector2(700, 900), false));
            Frame(() => _input.Contact(2, new Vector2(740, 900), true));
            Frame(() => _input.Contact(-1, new Vector2(745, 900), false));
            Assert.IsTrue(_input.LookHeld); Assert.IsFalse(_input.StickHeld);
            Frame(() => _input.Contact(-1, new Vector2(785, 900), false)); Assert.AreEqual(40, _input.LookDelta, .001f);
        }

        [Test] public void ALaterOrDistantTouchStartsFreshAfterARealRelease()
        {
            Frame(() => _input.Contact(0, Center + new Vector2(50, 0), false));
            Frame(() => _input.Contact(0, Center + new Vector2(50, 0), true));
            for (int i = 0; i <= RescuePointerInput.HandoffFrames; i++) Frame();
            Frame(() => _input.Contact(1, new Vector2(800, 1200), false));
            Assert.IsTrue(_input.LookHeld, "Too late for a handoff: a far touch rotates the camera"); Assert.IsFalse(_input.StickHeld);
        }

        [Test] public void CancelReleasesEveryRole()
        {
            Frame(() => _input.Contact(0, Center, false), () => _input.Contact(1, new Vector2(700, 900), false));
            _input.Cancel();
            Assert.IsFalse(_input.StickHeld); Assert.IsFalse(_input.LookHeld); Assert.AreEqual(Vector2.zero, _input.Stick);
        }
    }
}
