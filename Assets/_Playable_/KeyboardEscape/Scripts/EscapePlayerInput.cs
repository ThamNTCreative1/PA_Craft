using UnityEngine;

namespace Playable.KeyboardEscape
{
    // Read pointer input directly: Luna does not reliably dispatch Button.onClick.
    [DefaultExecutionOrder(-50)]
    public sealed class EscapePlayerInput : MonoBehaviour
    {
        public ScooterPlayer player;
        public RectTransform joystickArea;
        public RectTransform joystickKnob;
        public RectTransform jumpArea;
        public Canvas canvas;
        public TouchController touchController;
        public RectTransform lookArea;
        public RectTransform speedArea;
        public Vector2 Direction { get; private set; }
        private int movementPointer = int.MinValue;
        private int lookPointer = int.MinValue;
        private readonly int[] knownTouches = new int[10];
        private int knownTouchCount;

        private Camera UICamera { get { return canvas.renderMode == RenderMode.ScreenSpaceOverlay ? null : canvas.worldCamera; } }

        private void Update()
        {
            if (player.game.manager.HasEnded) { ResetInput(); return; }
            int count = Input.touchCount;
            if (count > 0)
            {
                bool movementPresent = movementPointer == int.MinValue;
                bool lookPresent = lookPointer == int.MinValue;
                // Luna can deliver the first sampled touch as Moved after a slow frame.
                // Track finger ownership instead of relying only on the Began phase.
                for (int k = knownTouchCount - 1; k >= 0; k--)
                {
                    bool present = false;
                    for (int j = 0; j < count; j++)
                        if (Input.GetTouch(j).fingerId == knownTouches[k]) { present = true; break; }
                    if (!present) { PointerUp(knownTouches[k]); ForgetTouch(knownTouches[k]); }
                }
                for (int i = 0; i < count; i++)
                {
                    Touch touch = Input.GetTouch(i);
                    ProcessTouch(touch);
                    if (touch.fingerId == movementPointer) movementPresent = true;
                    if (touch.fingerId == lookPointer) lookPresent = true;
                }
                if (!movementPresent) ResetMovement();
                if (!lookPresent) ResetLook();
                return;
            }
            knownTouchCount = 0;
            if (movementPointer >= 0) ResetMovement();
            if (lookPointer >= 0) ResetLook();
            Vector2 position = Input.mousePosition;
            if (Input.GetMouseButtonDown(0)) PointerDown(-1, position);
            if (Input.GetMouseButton(0)) PointerMove(-1, position);
            else PointerUp(-1);
        }

        private void ProcessTouch(Touch touch)
        {
            int id = touch.fingerId;
            if (touch.phase == TouchPhase.Ended || touch.phase == TouchPhase.Canceled)
            {
                PointerUp(id);
                ForgetTouch(id);
                return;
            }
            bool known = false;
            for (int k = 0; k < knownTouchCount; k++)
                if (knownTouches[k] == id) { known = true; break; }
            // Capture once per contact. Repeated Began samples must not release a
            // held joystick or reclassify it as camera input after dragging outside.
            if (!known && knownTouchCount < knownTouches.Length)
            {
                knownTouches[knownTouchCount++] = id;
                PointerDown(id, touch.phase == TouchPhase.Moved ? touch.position - touch.deltaPosition : touch.position);
            }
            PointerMove(id, touch.position);
        }

        public void PointerDown(int id, Vector2 position)
        {
            if (player.game.manager.HasEnded) return;
            if (id == movementPointer || id == lookPointer) return;
            if (Contains(jumpArea, position)) { player.Jump(); return; }
            if (ContainsJoystick(position))
            {
                if (movementPointer != int.MinValue) return;
                movementPointer = id;
                PointerMove(id, position);
                return;
            }
            if (Contains(speedArea, position) || lookPointer != int.MinValue || !Contains(lookArea, position)) return;
            lookPointer = id;
            touchController.BeginPointer(id, position);
        }

        public void PointerMove(int id, Vector2 position)
        {
            if (lookPointer == id && movementPointer != id) touchController.MovePointer(id, position);
            if (movementPointer != id) return;
            Vector2 local;
            if (!RectTransformUtility.ScreenPointToLocalPointInRectangle(joystickArea, position, UICamera, out local)) return;
            Vector2 radius = joystickArea.rect.size * 0.5f;
            if (radius.x <= 0 || radius.y <= 0) return;
            local -= joystickArea.rect.center;
            Direction = Vector2.ClampMagnitude(new Vector2(local.x / radius.x, local.y / radius.y), 1f);
            // Handle uses the background's local coordinates, independently of screen aspect.
            joystickKnob.anchoredPosition = Vector2.Scale(Direction, radius);
        }

        public void PointerUp(int id)
        {
            if (movementPointer == id) ResetMovement();
            if (lookPointer == id) ResetLook();
        }

        private bool ContainsJoystick(Vector2 position)
        {
            if (!joystickArea || !joystickArea.gameObject.activeInHierarchy) return false;
            if (Contains(joystickKnob, position)) return true;
            Vector2 local;
            if (!RectTransformUtility.ScreenPointToLocalPointInRectangle(joystickArea, position, UICamera, out local)) return false;
            // Include the handle's full travel envelope, not just its background.
            Rect bounds = joystickArea.rect;
            Vector2 padding = joystickKnob.rect.size * .5f;
            bounds.xMin -= padding.x; bounds.xMax += padding.x;
            bounds.yMin -= padding.y; bounds.yMax += padding.y;
            return bounds.Contains(local);
        }

        private bool Contains(RectTransform area, Vector2 position)
        {
            return area && area.gameObject.activeInHierarchy && RectTransformUtility.RectangleContainsScreenPoint(area, position, UICamera);
        }

        private void ResetInput()
        {
            knownTouchCount = 0;
            ResetMovement();
            ResetLook();
        }
        private void ForgetTouch(int id)
        {
            for (int i = 0; i < knownTouchCount; i++)
                if (knownTouches[i] == id)
                {
                    knownTouches[i] = knownTouches[--knownTouchCount];
                    return;
                }
        }
        private void ResetLook()
        {
            if (touchController) touchController.EndPointer(lookPointer);
            lookPointer = int.MinValue;
        }
        private void ResetMovement()
        {
            movementPointer = int.MinValue;
            Direction = Vector2.zero;
            if (joystickKnob) joystickKnob.anchoredPosition = Vector2.zero;
        }
        private void OnDisable() { ResetInput(); }
        private void OnApplicationFocus(bool focused) { if (!focused) ResetInput(); }
        private void OnApplicationPause(bool paused) { if (paused) ResetInput(); }
    }
}
