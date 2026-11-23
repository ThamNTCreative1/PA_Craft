using UnityEngine;
using TMPro;
using DG.Tweening;

namespace Playable.PetRescue
{
    /// Tutorial visuals only: joystick hint (ring + knob + hand on the fixed joystick) with "SWIPE TO MOVE" right above it,
    /// a hand tapping the Jump button with "TAP TO JUMP" above it,
    /// nearest-pet pointer and the one-shot TNT/Jump warning.
    public sealed class RescueTutorialView : MonoBehaviour
    {
        public const string DragText = "SWIPE TO MOVE", JumpText = "TAP TO JUMP";
        public const float JumpLabelWidth = 400;
        public const float TextGap = 6, TextWidth = 460, TextHeight = 80, EdgeMargin = 16;
        [SerializeField] private RectTransform _group, _ring, _knob, _hand;
        [SerializeField] private TMP_Text _title;
        [SerializeField] private RectTransform _petPointer, _tntWarning;
        [SerializeField] private RectTransform _canvasRect;
        [SerializeField] private RectTransform _stickTarget, _jumpTarget;
        [SerializeField] private RectTransform _jumpHint, _jumpHand;
        [SerializeField] private TMP_Text _jumpLabel;
        [SerializeField] private Camera _camera;
        private const float HandOrbit = .33f, PointerLift = 1.6f, TntLift = 1.4f, EdgeInset = .1f;
        private bool _ready, _drag, _jumpTap;
        private float _leftInset, _rightInset, _ui = 1;
        private Tween _titlePulse;

        private void Prepare()
        {
            if (_ready) return;
            if (_group == null || _ring == null || _knob == null || _hand == null || _title == null ||
                _petPointer == null || _tntWarning == null || _canvasRect == null || _camera == null || _stickTarget == null ||
                _jumpTarget == null || _jumpHint == null || _jumpHand == null || _jumpLabel == null)
                throw new System.InvalidOperationException("Pet Rescue tutorial references are incomplete.");
            _ready = true;
        }

        /// The "SWIPE TO MOVE" block sits right above the fixed joystick (bottom edge = joystick top + a small gap),
        /// centered on it but kept inside the safe screen edge. Call after the controls layout with its insets (canvas units).
        public void ApplyScreenLayout(int width, int height, float leftInset = 0, float rightInset = 0)
        {
            _leftInset = leftInset; _rightInset = rightInset; _ui = RescueControlsView.UiScale(width, height);
            if (_group == null || _stickTarget == null) return;
            if (_group.anchorMin != Vector2.zero) { _group.anchorMin = Vector2.zero; _group.anchorMax = Vector2.zero; }
            if (_group.pivot != new Vector2(.5f, 0)) _group.pivot = new Vector2(.5f, 0);
            Vector2 stick = _stickTarget.anchoredPosition;
            var position = new Vector2(Mathf.Max(stick.x, _leftInset + TextWidth * _ui * .5f + EdgeMargin), stick.y + _stickTarget.sizeDelta.y * .5f + TextGap);
            if (_group.anchoredPosition != position) _group.anchoredPosition = position;
            if (_group.sizeDelta != new Vector2(TextWidth, TextHeight)) _group.sizeDelta = new Vector2(TextWidth, TextHeight);
            Vector3 groupScale = new Vector3(_ui, _ui, 1);
            if (_group.localScale != groupScale) _group.localScale = groupScale;
            LayoutJumpLabel();
        }

        /// "TAP TO JUMP" sits right above the Jump button, centered on it but kept inside the right screen edge.
        /// The label and the button share the bottom-right anchor, so their anchored positions are comparable.
        private void LayoutJumpLabel()
        {
            if (_jumpLabel == null || _jumpTarget == null) return;
            var label = _jumpLabel.rectTransform;
            Vector2 jump = _jumpTarget.anchoredPosition;
            var position = new Vector2(Mathf.Min(jump.x, -(_rightInset + JumpLabelWidth * _ui * .5f + EdgeMargin)), jump.y + _jumpTarget.sizeDelta.y * .5f + TextGap);
            if (label.anchorMin != Vector2.right) { label.anchorMin = Vector2.right; label.anchorMax = Vector2.right; }
            if (label.pivot != new Vector2(.5f, 0)) label.pivot = new Vector2(.5f, 0);
            if (label.anchoredPosition != position) label.anchoredPosition = position;
            if (label.sizeDelta != new Vector2(JumpLabelWidth, TextHeight)) label.sizeDelta = new Vector2(JumpLabelWidth, TextHeight);
            Vector3 labelScale = new Vector3(_ui, _ui, 1);
            if (label.localScale != labelScale) label.localScale = labelScale;
        }

        /// TAP TO JUMP step: hand tapping the Jump button + label above it.
        public void SetJumpTap(bool visible)
        {
            Prepare();
            _jumpTap = visible;
            if (_jumpHint.gameObject.activeSelf != visible) _jumpHint.gameObject.SetActive(visible);
            if (_jumpLabel.text != JumpText) _jumpLabel.text = JumpText;
            if (visible) { LayoutJumpLabel(); Tick(0); }
        }

        /// Joystick hint; the "SWIPE TO MOVE" title shows on the first step only (the idle re-prompt is hand-only).
        public void SetHint(bool drag, bool withTitle)
        {
            Prepare();
            _drag = drag;
            if (_group.gameObject.activeSelf != drag) _group.gameObject.SetActive(drag);
            if (_title.text != DragText) _title.text = DragText;
            bool title = drag && withTitle;
            if (_title.gameObject.activeSelf != title)
            {
                _title.gameObject.SetActive(title);
                StopPulse();
                // Preview scenes lay out the UI without creating runtime-only tween state.
                if (title && Application.isPlaying)
                    _titlePulse = _title.rectTransform.DOScale(1.06f, .55f).SetEase(Ease.InOutSine).SetLoops(-1, LoopType.Yoyo).SetUpdate(true);
            }
            if (drag) Tick(0);
        }

        public void SetPetPointer(bool visible, Vector3 world)
        {
            Prepare();
            if (_petPointer.gameObject.activeSelf != visible) _petPointer.gameObject.SetActive(visible);
            if (!visible) return;
            Vector2 local; bool onScreen = ToCanvas(world + Vector3.up * PointerLift, out local);
            Rect safe = Inset(_canvasRect.rect, EdgeInset);
            float bob = Mathf.Abs(Mathf.Sin(Time.unscaledTime * 5)) * 18;
            if (onScreen && safe.Contains(local))
            {
                _petPointer.localScale = new Vector3(_ui, _ui, 1);
                _petPointer.anchoredPosition = local + Vector2.up * bob;
                _petPointer.localRotation = Quaternion.identity;   // sprite points down at the pet
                return;
            }
            // Off-screen: pin to the safe edge and point toward the pet.
            Vector2 direction = (local - safe.center); if (!onScreen) direction = -direction;
            if (direction.sqrMagnitude < .01f) direction = Vector2.up;
            _petPointer.localScale = new Vector3(_ui, _ui, 1);
            _petPointer.anchoredPosition = ClampToRectEdge(safe, direction);
            _petPointer.localRotation = Quaternion.Euler(0, 0, Mathf.Atan2(direction.y, direction.x) * Mathf.Rad2Deg + 90);
        }

        public void SetTntWarning(bool visible, Vector3 world)
        {
            Prepare();
            if (_tntWarning.gameObject.activeSelf != visible) _tntWarning.gameObject.SetActive(visible);
            if (!visible) return;
            Vector2 local;
            if (!ToCanvas(world + Vector3.up * TntLift, out local)) local = Vector2.zero;
            // Keep the whole label on screen: the pivot is bottom-center, so clamp by half width and full height.
            Rect safe = Inset(_canvasRect.rect, .03f); Vector2 size = _tntWarning.rect.size;
            local.x = Mathf.Clamp(local.x, safe.xMin + size.x * .5f, safe.xMax - size.x * .5f);
            local.y = Mathf.Clamp(local.y, safe.yMin, safe.yMax - size.y - 260);
            _tntWarning.anchoredPosition = local;
            float pulse = 1 + Mathf.Abs(Mathf.Sin(Time.unscaledTime * 8)) * .15f;
            _tntWarning.localScale = new Vector3(pulse * _ui, pulse * _ui, 1);
        }

        public void Hide()
        {
            Prepare(); StopPulse(); _drag = false;
            _group.gameObject.SetActive(false); _petPointer.gameObject.SetActive(false); _tntWarning.gameObject.SetActive(false);
            _title.gameObject.SetActive(false);
            _jumpTap = false; _jumpHint.gameObject.SetActive(false);
        }

        public void Tick(float dt)
        {
            if (!_ready) return;
            float t = Time.unscaledTime;
            if (_jumpTap)
            {
                // Fingertip on the button center; a quick press-and-lift loop (dips and shrinks on the tap).
                float tap = Mathf.Repeat(t * 1.6f, 1), press = tap < .25f ? Mathf.Sin(tap / .25f * Mathf.PI) : 0;
                _jumpHand.position = _jumpTarget.position + new Vector3(0, -press * 18 * _canvasRect.lossyScale.y, 0);
                float scale = (1 - press * .12f) * _ui;
                _jumpHand.localScale = new Vector3(scale, scale, 1);
            }
            if (!_group.gameObject.activeSelf) return;
            if (_drag)
            {
                // Ring matches the fixed joystick; the knob and the fingertip circle inside it like a thumb steering.
                _ring.position = _stickTarget.position;
                float size = _stickTarget.rect.width * _stickTarget.lossyScale.x;
                _ring.sizeDelta = Vector2.one * size / Mathf.Max(.0001f, _ring.lossyScale.x);
                _knob.sizeDelta = _ring.sizeDelta * .45f;
                Vector3 orbit = new Vector3(Mathf.Cos(t * 2.6f), Mathf.Sin(t * 2.6f) * .8f, 0) * (size * HandOrbit);
                _knob.position = _ring.position + orbit;
                _hand.position = _knob.position;
            }
        }

        private bool ToCanvas(Vector3 world, out Vector2 local)
        {
            Vector3 screen = _camera.WorldToScreenPoint(world);
            bool front = screen.z > 0;
            RectTransformUtility.ScreenPointToLocalPointInRectangle(_canvasRect, screen, null, out local);
            if (!front) return false;
            return true;
        }

        public static Rect Inset(Rect rect, float fraction)
        {
            float dx = rect.width * fraction, dy = rect.height * fraction;
            return new Rect(rect.xMin + dx, rect.yMin + dy, rect.width - dx * 2, rect.height - dy * 2);
        }

        public static Vector2 ClampToRectEdge(Rect rect, Vector2 direction)
        {
            Vector2 half = rect.size * .5f;
            float scale = Mathf.Min(half.x / Mathf.Max(.0001f, Mathf.Abs(direction.x)), half.y / Mathf.Max(.0001f, Mathf.Abs(direction.y)));
            return rect.center + direction * scale;
        }

        private void OnDisable() { StopPulse(); }
        private void StopPulse()
        {
            if (_titlePulse != null) { _titlePulse.Kill(); _titlePulse = null; }
            if (_title != null) _title.rectTransform.localScale = Vector3.one;
        }
    }
}
