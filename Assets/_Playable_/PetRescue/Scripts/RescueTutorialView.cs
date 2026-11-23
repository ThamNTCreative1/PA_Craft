using UnityEngine;
using UnityEngine.UI;
using TMPro;
using DG.Tweening;

namespace Playable.PetRescue
{
    public sealed class RescueTutorialView : MonoBehaviour
    {
        [SerializeField] private GameObject _group;
        [SerializeField] private TMP_Text _prompt;
        [SerializeField] private RectTransform _cue;
        [SerializeField] private RectTransform _leftArrow, _rightArrow;
        [SerializeField] private GameObject _goalHint;
        private Vector2 _origin;
        private float _handAspect;
        private Tween _titlePulse;
        private bool _jumpMode, _originReady;
        private TMP_Text _hintText;
        private string _goalText;
        private Vector2 _arrowOrigin;
        private const float JumpTravel = 70;
        private const string JumpText = "SWIPE UP TO JUMP!";
        public bool JumpVisible { get { return _jumpMode; } }
        public void ShowSwipe()
        {
            CaptureOrigin();
            var image = _cue.GetComponent<Image>();
            _handAspect = image.sprite.rect.width / image.sprite.rect.height;
            Present(false);
            _prompt.gameObject.SetActive(true); _prompt.text = "LEAD THE HERD";
            // Preview scenes lay out the UI without creating runtime-only tween state.
            if (Application.isPlaying)
                _titlePulse = _prompt.rectTransform.DOScale(1.06f,.55f).SetEase(Ease.InOutSine).SetLoops(-1,LoopType.Yoyo).SetUpdate(true);
            PositionArrows();
        }
        /// Crater hint: the hand flicks upward under an up arrow; the small hint line below the hand asks for a jump.
        /// The headline is left untouched.
        public void ShowJump() { CaptureOrigin(); Present(true); }
        public void HideJump() { if (_jumpMode) Hide(); }
        public void OnSteered() { if (!_jumpMode) Hide(); }
        public void Hide()
        {
            StopPulse(); RestoreSwipeLayout(); _jumpMode = false;
            _group.SetActive(false); _prompt.gameObject.SetActive(false);
        }
        private void Present(bool jump)
        {
            StopPulse(); RestoreSwipeLayout(); _jumpMode = jump;
            _group.SetActive(true);
            _leftArrow.gameObject.SetActive(!jump); _rightArrow.gameObject.SetActive(true);
            if (!jump) return;
            if (_hintText != null) _hintText.text = JumpText;
            // The right ">>" arrow turned to point up, placed above the hand's flick range.
            _arrowOrigin = _rightArrow.anchoredPosition;
            float handHeight = _cue.rect.height;
            _rightArrow.localRotation = Quaternion.Euler(0, 0, 90);
            _rightArrow.anchoredPosition = _origin + Vector2.up * (handHeight * .5f + JumpTravel + 40);
        }
        private void RestoreSwipeLayout()
        {
            if (_hintText == null && _goalHint != null) { _hintText = _goalHint.GetComponent<TMP_Text>(); if (_hintText != null) _goalText = _hintText.text; }
            if (!_jumpMode) return;
            if (_hintText != null) _hintText.text = _goalText;
            _rightArrow.localRotation = Quaternion.identity; _rightArrow.anchoredPosition = _arrowOrigin;
            if (_originReady) { _cue.anchoredPosition = _origin; _cue.localRotation = Quaternion.identity; }
        }
        private void CaptureOrigin()
        {
            if (_originReady) return;
            _origin = _cue.anchoredPosition; _originReady = true;
        }
        private void OnDisable() { StopPulse(); }
        private void StopPulse()
        {
            if (_titlePulse != null) { _titlePulse.Kill(); _titlePulse = null; }
            if (_prompt != null) _prompt.rectTransform.localScale = Vector3.one;
        }
        private void PositionArrows()
        {
            float width = Mathf.Min(_cue.rect.width, _cue.rect.height * _handAspect);
            _leftArrow.anchoredPosition = _origin + new Vector2(-(width*.5f+60+12+_leftArrow.rect.width*.5f),0);
            _rightArrow.anchoredPosition = _origin + new Vector2(width*.5f+60+12+_rightArrow.rect.width*.5f,0);
        }
        public void Tick(float dt)
        {
            if (!_group.activeSelf) return;
            if (_jumpMode)
            {
                // Repeated upward flick: rise fast, then reset to the start.
                float t = Mathf.Repeat(Time.unscaledTime * 1.4f, 1);
                _cue.anchoredPosition = _origin + Vector2.up * Mathf.SmoothStep(-20, JumpTravel, Mathf.Min(1, t * 1.6f));
                _cue.localRotation = Quaternion.identity;
                return;
            }
            float swipe = Mathf.Sin(Time.unscaledTime * 2.5f);
            _cue.anchoredPosition = _origin + Vector2.right * swipe * 60;
            _cue.localRotation = Quaternion.Euler(0,0,-swipe * 6);
            PositionArrows();
        }
    }
}
