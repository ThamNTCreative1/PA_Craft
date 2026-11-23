using UnityEngine;

namespace Playable.PetRescue
{
    /// Multi-touch router on the old Input Manager.
    /// A finger that begins on the joystick drives the stick, one that begins on the Jump button jumps once,
    /// and any other finger rotates the camera. Each role owns at most one finger; the mouse is the editor fallback.
    public sealed class RescuePointerInput : MonoBehaviour
    {
        private const int None = int.MinValue, MouseId = -1;
        /// The joystick can be grabbed a little outside its drawn ring.
        public const float GrabScale = 1.35f;
        private Vector2 _stickCenter;
        private float _stickRadius = 1;
        private Rect _jumpRect;
        private int _stickFinger = None, _lookFinger = None, _jumpFinger = None;
        private float _lookLastX;
        private Vector2 _stickLast, _lookLast;
        // Handoff memory: a role released within the last frames can be re-taken by a nearby contact.
        private enum Role { None, Stick, Look }
        private Role _releasedRole;
        private Vector2 _releasedAt;
        private int _frame, _releasedFrame;
        /// Frames during which a released joystick/camera finger can be re-taken by a reappearing contact.
        public const int HandoffFrames = 2;
        /// Max distance (in stick radii) between the released point and the reappearing contact.
        public const float HandoffRadii = 3;

        public bool Pressed { get; private set; }
        public Vector2 Stick { get; private set; }
        /// Horizontal camera drag this frame, in screen pixels.
        public float LookDelta { get; private set; }
        public bool JumpPressed { get; private set; }
        public bool StickHeld { get { return _stickFinger != None; } }
        public bool LookHeld { get { return _lookFinger != None; } }

        public void SetZones(Vector2 stickCenter, float stickRadius, Rect jumpRect)
        {
            _stickCenter = stickCenter; _stickRadius = Mathf.Max(1, stickRadius); _jumpRect = jumpRect;
        }

        public void Cancel()
        {
            _stickFinger = _lookFinger = _jumpFinger = None; _releasedRole = Role.None;
            Stick = Vector2.zero; LookDelta = 0; Pressed = false; JumpPressed = false;
        }
        private void OnDisable() { Cancel(); }
        private void OnApplicationFocus(bool focus) { if (!focus) Cancel(); }

        public void BeginFrame() { Pressed = false; JumpPressed = false; LookDelta = 0; _frame++; }

        public void Sample()
        {
            BeginFrame();
            int count = Input.touchCount;
            if (count > 0)
            {
                // Fingers that vanished without an Ended phase (or a mouse-owned role once real touches arrive) are
                // released; the handoff memory lets the same physical finger keep its role under its new id.
                if (!Present(_stickFinger, count)) Release(_stickFinger);
                if (!Present(_lookFinger, count)) Release(_lookFinger);
                if (!Present(_jumpFinger, count)) Release(_jumpFinger);
                for (int i = 0; i < count; i++)
                {
                    Touch t = Input.GetTouch(i);
                    Contact(t.fingerId, t.position, t.phase == TouchPhase.Ended || t.phase == TouchPhase.Canceled);
                }
                return;
            }
            // No touches: release touch fingers, then use the mouse.
            if (_stickFinger != MouseId) Release(_stickFinger);
            if (_lookFinger != MouseId) Release(_lookFinger);
            if (_jumpFinger != MouseId) Release(_jumpFinger);
            bool held = Input.GetMouseButton(0) || Input.GetMouseButtonDown(0);
            Contact(MouseId, Input.mousePosition, !held);
        }

        /// One contact update. A contact the router has not seen yet starts a role (also when the runtime missed Began).
        public void Contact(int id, Vector2 position, bool released)
        {
            if (released) { Release(id); return; }
            if (id == _stickFinger) { _stickLast = position; Stick = StickFrom(position); return; }
            if (id == _lookFinger) { LookDelta += position.x - _lookLastX; _lookLastX = position.x; _lookLast = position; return; }
            if (id == _jumpFinger) return;
            // Runtime handoff (touch ↔ simulated mouse, or a spurious Ended): the reappearing contact keeps the
            // role it had, even far outside the joystick, instead of starting a new one. No new press/jump fires.
            if (_releasedRole != Role.None && _frame - _releasedFrame <= HandoffFrames &&
                (position - _releasedAt).magnitude <= _stickRadius * HandoffRadii)
            {
                Role role = _releasedRole; _releasedRole = Role.None;
                if (role == Role.Stick && _stickFinger == None) { _stickFinger = id; _stickLast = position; Stick = StickFrom(position); return; }
                if (role == Role.Look && _lookFinger == None) { _lookFinger = id; _lookLastX = position.x; _lookLast = position; return; }
            }
            // New contact: pick a role by where it starts.
            if (_jumpRect.Contains(position))
            {
                if (_jumpFinger != None) return;
                _jumpFinger = id; JumpPressed = true; Pressed = true; return;
            }
            if ((position - _stickCenter).magnitude <= _stickRadius * GrabScale)
            {
                if (_stickFinger != None) return;
                _stickFinger = id; _stickLast = position; Stick = StickFrom(position); Pressed = true; return;
            }
            if (_lookFinger != None) return;
            _lookFinger = id; _lookLastX = position.x; _lookLast = position; Pressed = true;
        }

        private Vector2 StickFrom(Vector2 position)
        {
            return Vector2.ClampMagnitude((position - _stickCenter) / _stickRadius, 1);
        }

        private void Release(int id)
        {
            if (id == None) return;
            if (id == _stickFinger) { _stickFinger = None; Stick = Vector2.zero; Remember(Role.Stick, _stickLast); }
            if (id == _lookFinger) { _lookFinger = None; Remember(Role.Look, _lookLast); }
            if (id == _jumpFinger) _jumpFinger = None;
        }

        private void Remember(Role role, Vector2 at) { _releasedRole = role; _releasedAt = at; _releasedFrame = _frame; }

        /// While real touches exist, a mouse-owned role counts as gone (the runtime switched from its simulated mouse).
        private static bool Present(int id, int count)
        {
            if (id == None) return true;
            if (id == MouseId) return false;
            for (int i = 0; i < count; i++) if (Input.GetTouch(i).fingerId == id) return true;
            return false;
        }
    }
}
