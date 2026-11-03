using System;
using System.Collections.Generic;
using DG.Tweening;
using UnityEngine;

namespace Playable
{
    public class HandTutorial : MonoBehaviour
    {
        [Header("Joystick hint")]
        [Tooltip("Hand that circles around the joystick until the player moves.")]
        [SerializeField] private RectTransform _joystickHand;
        [Tooltip("\"SWIPE TO MOVE\" label above the joystick.")]
        [SerializeField] private GameObject _joystickLabel;
        [SerializeField] private PlayerController _player;
        [SerializeField, Min(1f)] private float _joystickRadius = 60f;
        [SerializeField, Min(0.1f)] private float _joystickLoopDuration = 1.6f;

        [Header("Camera hint")]
        [Tooltip("Hand that swipes left/right on the look area until the camera is rotated.")]
        [SerializeField] private RectTransform _cameraHand;
        [Tooltip("\"SWIPE TO VIEW\" label in the middle of the screen.")]
        [SerializeField] private GameObject _cameraLabel;
        [SerializeField] private TouchController _touchController;
        [SerializeField, Min(1f)] private float _cameraSwipeDistance = 160f;
        [SerializeField, Min(0.1f)] private float _cameraSwipeDuration = 0.9f;

        [Header("Button hints")]
        [SerializeField] private RectTransform _stealHand;
        [SerializeField] private RectTransform _hatchHand;
        [SerializeField] private RectTransform _openHand;
        [SerializeField] private RectTransform _claimHand;
        [SerializeField, Min(0.1f)] private float _pressDuration = 0.4f;
        [SerializeField, Range(0.1f, 1f)] private float _pressedScale = 0.8f;

        private Tween _joystickTween;
        private Tween _cameraTween;
        private readonly Dictionary<RectTransform, Tween> _pressTweens = new Dictionary<RectTransform, Tween>();
        private readonly Dictionary<RectTransform, Vector3> _handScales = new Dictionary<RectTransform, Vector3>();
        private Vector2 _joystickHandOrigin;
        private Vector2 _cameraHandOrigin;
        private bool _cached;
        private bool _cameraLearned;
        private bool _joystickLearned;
        private bool _cameraPending;
        private bool _tutorialActive;

        /// <summary>Raised once the joystick and camera hints of a round are done (or skipped).</summary>
        public event Action MovementTutorialCompleted;

        private void CacheLayout()
        {
            if (_cached) return;
            if (_joystickHand != null) _joystickHandOrigin = _joystickHand.anchoredPosition;
            if (_cameraHand != null) _cameraHandOrigin = _cameraHand.anchoredPosition;
            foreach (RectTransform hand in new[] { _stealHand, _hatchHand, _openHand, _claimHand })
                if (hand != null) _handScales[hand] = hand.localScale;
            _cached = true;
        }

        private void OnEnable()
        {
            if (_touchController != null) _touchController.OnLookDelta += HandleLook;
        }

        /// <summary>
        /// Shown at round start: joystick first, then the camera swipe once the player has moved.
        /// Each hint is shown only until the player has done it once (not again after a reset).
        /// </summary>
        public void ShowMovementTutorial()
        {
            CacheLayout();
            HideHints();
            _cameraPending = !_cameraLearned && _cameraHand != null;
            _tutorialActive = true;

            if (_joystickHand == null || _joystickLearned)
            {
                if (_cameraPending) ShowCameraHint();
                else CompleteTutorial();
                return;
            }
            _joystickHand.gameObject.SetActive(true);
            if (_joystickLabel != null) _joystickLabel.SetActive(true);
            _joystickTween = DOVirtual.Float(0f, Mathf.PI * 2f, _joystickLoopDuration, angle =>
            {
                _joystickHand.anchoredPosition = _joystickHandOrigin +
                    new Vector2(Mathf.Cos(angle), Mathf.Sin(angle)) * _joystickRadius;
            }).SetEase(Ease.Linear).SetLoops(-1, LoopType.Restart);
        }

        private void Update()
        {
            // Joystick hint stays until the player actually moves, then the camera hint follows.
            if (_joystickHand == null || !_joystickHand.gameObject.activeSelf) return;
            if (_player == null || !_player.HasMoveInput) return;
            _joystickLearned = true;
            HideJoystickHint();
            if (_cameraPending) ShowCameraHint();
            else CompleteTutorial();
        }

        private void ShowCameraHint()
        {
            _cameraPending = false;
            if (_cameraHand == null || _cameraLearned) return;
            _cameraTween?.Kill();
            _cameraHand.gameObject.SetActive(true);
            if (_cameraLabel != null) _cameraLabel.SetActive(true);
            Vector2 from = _cameraHandOrigin + Vector2.left * (_cameraSwipeDistance * 0.5f);
            _cameraHand.anchoredPosition = from;
            _cameraTween = _cameraHand.DOAnchorPos(from + Vector2.right * _cameraSwipeDistance, _cameraSwipeDuration)
                .SetEase(Ease.InOutSine).SetLoops(-1, LoopType.Yoyo);
        }

        private void HandleLook(Vector2 delta)
        {
            if (delta.sqrMagnitude < 0.01f) return;
            _cameraLearned = true;
            _cameraPending = false;
            bool wasShowing = _cameraHand != null && _cameraHand.gameObject.activeSelf;
            HideCameraHint();
            if (wasShowing) CompleteTutorial();
        }

        private void HideJoystickHint()
        {
            _joystickTween?.Kill();
            _joystickTween = null;
            if (_joystickLabel != null) _joystickLabel.SetActive(false);
            if (_joystickHand == null) return;
            _joystickHand.anchoredPosition = _joystickHandOrigin;
            _joystickHand.gameObject.SetActive(false);
        }

        private void HideCameraHint()
        {
            _cameraTween?.Kill();
            _cameraTween = null;
            if (_cameraLabel != null) _cameraLabel.SetActive(false);
            if (_cameraHand == null) return;
            _cameraHand.anchoredPosition = _cameraHandOrigin;
            _cameraHand.gameObject.SetActive(false);
        }

        /// <summary>Hides the joystick/camera hints; if they were still running the tutorial counts as done.</summary>
        public void HideMovementTutorial()
        {
            HideHints();
            CompleteTutorial();
        }

        private void HideHints()
        {
            CacheLayout();
            HideJoystickHint();
            HideCameraHint();
            _cameraPending = false;
        }

        private void CompleteTutorial()
        {
            if (!_tutorialActive) return;
            _tutorialActive = false;
            MovementTutorialCompleted?.Invoke();
        }

        public void SetStealHintVisible(bool visible)
        {
            if (visible) HideMovementTutorial();
            SetPressHint(_stealHand, visible);
        }

        public void SetHatchHintVisible(bool visible) => SetPressHint(_hatchHand, visible);
        public void SetOpenHintVisible(bool visible) => SetPressHint(_openHand, visible);
        public void SetClaimHintVisible(bool visible) => SetPressHint(_claimHand, visible);

        private void SetPressHint(RectTransform hand, bool visible)
        {
            CacheLayout();
            if (hand == null) return;
            _pressTweens.TryGetValue(hand, out Tween tween);
            if (visible && tween != null && tween.IsActive()) return;

            tween?.Kill();
            _pressTweens.Remove(hand);
            Vector3 scale = _handScales.TryGetValue(hand, out Vector3 s) ? s : Vector3.one;
            hand.localScale = scale;
            hand.gameObject.SetActive(visible);
            if (!visible) return;

            _pressTweens[hand] = hand.DOScale(scale * _pressedScale, Mathf.Max(0.1f, _pressDuration))
                .SetEase(Ease.InOutSine).SetLoops(-1, LoopType.Yoyo);
        }

        public void HideAll()
        {
            HideMovementTutorial();
            SetStealHintVisible(false);
            SetHatchHintVisible(false);
            SetOpenHintVisible(false);
            SetClaimHintVisible(false);
        }

        private void OnDisable()
        {
            if (_touchController != null) _touchController.OnLookDelta -= HandleLook;
            HideAll();
        }
    }
}
