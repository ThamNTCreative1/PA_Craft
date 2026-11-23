using UnityEngine;

namespace Playable.PetRescue
{
    /// On-screen controls: fixed joystick (bottom-left) and Jump button (bottom-right). Swiping anywhere else rotates the camera.
    /// Lays them out per orientation and reports their screen-space zones to the input router.
    public sealed class RescueControlsView : MonoBehaviour
    {
        [SerializeField] private RectTransform _root, _stickBase, _stickKnob, _jumpButton, _canvasRect;
        [SerializeField] private float _knobTravel = .55f;
        private bool _visible = true;
        private float _jumpPress, _jumpPulse;

        public RectTransform StickBase { get { return _stickBase; } }

        private void Validate()
        {
            if (_root == null || _stickBase == null || _stickKnob == null || _jumpButton == null || _canvasRect == null)
                throw new System.InvalidOperationException("Pet Rescue controls references are incomplete.");
        }

        /// Safe-area insets of the last layout, in canvas units (notch / rounded corners / home indicator).
        public float LeftInset { get; private set; }
        public float RightInset { get; private set; }
        public float BottomInset { get; private set; }
        /// Landscape phones can be rotated either way, so both sides keep at least this fraction of the width
        /// even when the runtime reports no safe area (Luna/web often does not).
        public const float LandscapeMinInset = .07f;
        /// Landscape UI is drawn a bit larger (the landscape canvas is 1920 units tall, so everything reads small).
        public const float LandscapeUiScale = 1.25f;
        public static float UiScale(int width, int height) { return width > height ? LandscapeUiScale : 1; }

        public void ApplyScreenLayout(int width, int height, Rect safeArea)
        {
            Validate();
            ApplyScreenLayout(width, height, safeArea, _canvasRect.lossyScale.x);
        }

        /// Portrait (canvas 1080 wide) vs landscape (canvas 1920 tall): corner offsets and sizes in canvas units,
        /// pushed inside the safe area. `scaleFactor` converts screen pixels to canvas units.
        public void ApplyScreenLayout(int width, int height, Rect safeArea, float scaleFactor)
        {
            Validate();
            bool landscape = width > height;
            float scale = Mathf.Max(.0001f, scaleFactor);
            float left = Mathf.Max(0, safeArea.xMin), right = Mathf.Max(0, width - safeArea.xMax), bottom = Mathf.Max(0, safeArea.yMin);
            if (landscape) { float side = Mathf.Max(Mathf.Max(left, right), width * LandscapeMinInset); left = right = side; }
            LeftInset = left / scale; RightInset = right / scale; BottomInset = bottom / scale;
            Vector2 stick = landscape ? new Vector2(330, 360) : new Vector2(215, 330), jump = landscape ? new Vector2(-330, 340) : new Vector2(-190, 300);
            float ui = UiScale(width, height);
            if (landscape) { stick *= ui; jump *= ui; }
            Place(_stickBase, new Vector2(0, 0), stick + new Vector2(LeftInset, BottomInset), landscape ? 320 * ui : 280);
            _stickKnob.anchorMin = _stickKnob.anchorMax = _stickBase.anchorMin;
            _stickKnob.sizeDelta = _stickBase.sizeDelta * .45f;
            Place(_jumpButton, new Vector2(1, 0), jump + new Vector2(-RightInset, BottomInset), landscape ? 250 * ui : 210);
        }

        private static void Place(RectTransform rect, Vector2 anchor, Vector2 position, float size)
        {
            if (rect.anchorMin != anchor) { rect.anchorMin = anchor; rect.anchorMax = anchor; }
            if (rect.anchoredPosition != position) rect.anchoredPosition = position;
            if (rect.pivot != new Vector2(.5f, .5f)) rect.pivot = new Vector2(.5f, .5f);
            if (size > 0 && rect.sizeDelta.x != size) rect.sizeDelta = new Vector2(size, size);
        }

        /// Screen-pixel zones for the input router (overlay canvas: world position = screen pixels).
        public void GetZones(out Vector2 stickCenter, out float stickRadius, out Rect jumpRect)
        {
            Validate();
            stickCenter = RectTransformUtility.WorldToScreenPoint(null, _stickBase.position);
            stickRadius = _stickBase.rect.width * .5f * _stickBase.lossyScale.x;
            Vector3[] corners = Corners;
            _jumpButton.GetWorldCorners(corners);
            jumpRect = Rect.MinMaxRect(corners[0].x, corners[0].y, corners[2].x, corners[2].y);
        }
        private static readonly Vector3[] Corners = new Vector3[4];

        /// `showStick` is false while the tutorial ring covers the joystick (avoids a doubled knob).
        public void Show(Vector2 stick, bool showStick, bool jumpPressed, bool jumpHint, float dt)
        {
            Validate();
            SetVisible(true);
            if (_stickBase.gameObject.activeSelf != showStick) { _stickBase.gameObject.SetActive(showStick); _stickKnob.gameObject.SetActive(showStick); }
            _stickKnob.anchoredPosition = _stickBase.anchoredPosition + Vector2.ClampMagnitude(stick, 1) * (_stickBase.sizeDelta.x * .5f * _knobTravel);
            if (jumpPressed) _jumpPress = .15f;
            _jumpPress = Mathf.Max(0, _jumpPress - dt);
            _jumpPulse = jumpHint ? _jumpPulse + dt : 0;
            float scale = _jumpPress > 0 ? .88f : jumpHint ? 1 + Mathf.Abs(Mathf.Sin(_jumpPulse * 7)) * .18f : 1;
            _jumpButton.localScale = new Vector3(scale, scale, 1);
        }

        public void Hide() { Validate(); SetVisible(false); }

        private void SetVisible(bool value)
        {
            if (_visible == value && _root.gameObject.activeSelf == value) return;
            _visible = value; _root.gameObject.SetActive(value);
        }
    }
}
