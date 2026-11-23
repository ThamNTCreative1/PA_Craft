using UnityEngine;

namespace Playable.PetRescue
{
    public sealed class RescuePointerInput : MonoBehaviour
    {
        public const float SwipeUpFraction = .06f;
        private RectTransform _ctaRect;
        private bool _held, _touch;
        private int _finger;
        private float _lastX, _anchorX, _anchorY;
        public void Initialize(RectTransform gameplayRect, RectTransform ctaRect)
        { _ctaRect = ctaRect; Cancel(); }
        public void Cancel() { _held = false; _touch = false; }
        private void OnDisable() { Cancel(); }
        private void OnApplicationFocus(bool focus) { if (!focus) Cancel(); }
        public void Sample(out bool pressed, out float delta, out bool swipeUp)
        {
            pressed = false; delta = 0; swipeUp = false;
            if (Input.touchCount > 0)
            {
                for (int i = 0; i < Input.touchCount; i++)
                {
                    Touch t = Input.GetTouch(i);
                    if (_held && _touch && t.fingerId != _finger) continue;
                    bool released = t.phase == TouchPhase.Canceled || t.phase == TouchPhase.Ended;
                    ProcessContact(t.fingerId,t.position,true,released,Screen.width,Screen.height,out pressed,out delta,out swipeUp);
                    return;
                }
                Cancel(); return;
            }
            if (Input.GetMouseButton(0) || Input.GetMouseButtonDown(0))
                ProcessContact(-1,Input.mousePosition,false,false,Screen.width,Screen.height,out pressed,out delta,out swipeUp);
            else Cancel();
        }
        // A runtime may deliver an active contact after Began or switch to its simulated mouse.
        // Keep one continuous drag across that handoff instead of discarding every move.
        public void ProcessContact(int pointerId, Vector2 position, bool touch, bool released, float viewportWidth, float viewportHeight,
            out bool pressed, out float delta, out bool swipeUp)
        {
            pressed = false; delta = 0; swipeUp = false;
            if (released)
            {
                if (_held && _touch == touch && _finger == pointerId) Cancel();
                return;
            }
            if (_held && _touch == touch && _finger != pointerId) return;
            if (!_held)
            {
                if (!Allowed(position)) return;
                _held = true; pressed = true; Anchor(position);
            }
            else
            {
                delta = (position.x - _lastX) / Mathf.Max(1,viewportWidth);
                float up = position.y - _anchorY, side = Mathf.Abs(position.x - _anchorX);
                float height = Mathf.Max(1,viewportHeight);
                // One swipe-up per upward stroke; moving down or mostly sideways re-arms the stroke.
                if (position.y < _anchorY || side > Mathf.Max(0,up) + height * .03f) Anchor(position);
                else if (up / height >= SwipeUpFraction && up > side) { swipeUp = true; Anchor(position); }
            }
            _touch = touch; _finger = pointerId; _lastX = position.x;
        }
        private void Anchor(Vector2 position) { _anchorX = position.x; _anchorY = position.y; }
        private bool Allowed(Vector2 position)
        {
            // Unity/Luna input coordinates already cover this full-screen playable.
            // Canvas lossyScale/RectTransform coordinates are not browser viewport pixels.
            return _ctaRect == null || !_ctaRect.gameObject.activeInHierarchy ||
                !RectTransformUtility.RectangleContainsScreenPoint(_ctaRect,position);
        }
    }
}
