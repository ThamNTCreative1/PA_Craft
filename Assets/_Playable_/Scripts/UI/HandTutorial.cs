using DG.Tweening;
using UnityEngine;

namespace Playable
{
    public class HandTutorial : MonoBehaviour
    {
        [Header("Move hint")]
        [SerializeField] private RectTransform _infinityGraphic;
        [SerializeField] private RectTransform _moveHand;
        [SerializeField, Min(0.1f)] private float _loopDuration = 2f;
        [SerializeField] private Vector2 _pathSize = new Vector2(0.4f, 0.3f);
        [SerializeField] private HandTutorial _cameraTutorial;
        [SerializeField] private bool _diagonalMovement;
        [SerializeField] private Vector2 _swipeOffset = new Vector2(70f, 70f);
        [SerializeField] private GameObject _movementLabel;
        [SerializeField] private Joystick _joystick;
        [SerializeField] private TouchController _lookInput;

        [Header("Steal hint")]
        [SerializeField] private RectTransform _stealHand;
        [SerializeField, Min(0.1f)] private float _pressDuration = 0.4f;
        [SerializeField, Range(0.1f, 1f)] private float _pressedScale = 0.8f;

        private Tween _moveTween;
        private Tween _pressTween;
        private Vector2 _moveHandOrigin;
        private Vector3 _stealHandScale;
        private bool _cached;
        private bool _movementVisible;
        private float _movementTime;
        private bool _dismissArmed;
        private int _shownFrame;
        private HandTutorial _nextMovementTutorial;
        private bool _waitForClimbSwipe;

        public void ShowClimbTutorial()
        {
            HideMovementTutorial();
            ShowOwnMovementTutorial();
            _waitForClimbSwipe = true;
            if (_movementLabel != null)
            {
                var label = _movementLabel.GetComponent<TMPro.TMP_Text>();
                if (label != null) label.text = "Swipe to climb the tower";
            }
        }
        private void CacheLayout()
        {
            if (_cached) return;
            if (_moveHand != null) _moveHandOrigin = _moveHand.anchoredPosition;
            if (_stealHand != null) _stealHandScale = _stealHand.localScale;
            _cached = true;
        }

        public void ShowMovementTutorial()
        {
            HideMovementTutorial();
            if (_cameraTutorial != null && _cameraTutorial != this)
            {
                _cameraTutorial._nextMovementTutorial = this;
                _cameraTutorial.ShowOwnMovementTutorial();
            }
            else ShowOwnMovementTutorial();
        }

        private void ShowOwnMovementTutorial()
        {
            gameObject.SetActive(true);
            enabled = true;
            CacheLayout();
            _moveTween?.Kill();
            _moveTween = null;
            if (_moveHand == null) return;

            _movementVisible = true;
            _movementTime = 0f;
            // A pointer already held while the playable starts must be released first.
            _dismissArmed = false;
            _shownFrame = Time.frameCount;
            if (_movementLabel != null) _movementLabel.SetActive(true);
            SetInfinityVisible(!_diagonalMovement);
            _moveHand.gameObject.SetActive(true);
            var handImage = _moveHand.GetComponent<UnityEngine.UI.Image>();
            if (handImage != null) handImage.enabled = true;
            _moveHand.anchoredPosition = _moveHandOrigin;
        }

        private void Update()
        {
            if (!_movementVisible) return;
            _movementTime += Time.unscaledDeltaTime;
            if (_moveHand != null)
            {
                float phase = _movementTime / Mathf.Max(0.1f, _loopDuration);
                if (_diagonalMovement)
                    _moveHand.anchoredPosition = _moveHandOrigin + _swipeOffset * (0.5f - 0.5f * Mathf.Cos(phase * Mathf.PI));
                else if (_infinityGraphic != null)
                {
                    float angle = phase * Mathf.PI * 2f;
                    Vector2 size = _infinityGraphic.rect.size;
                    _moveHand.anchoredPosition = _moveHandOrigin + new Vector2(
                        Mathf.Sin(angle) * size.x * _pathSize.x, Mathf.Sin(angle * 2f) * size.y * _pathSize.y);
                }
            }
            if (_waitForClimbSwipe) return;
            if (!_dismissArmed)
            {
                if (Time.frameCount > _shownFrame && !Input.GetMouseButton(0)
                    && !Input.GetMouseButtonDown(0) && Input.touchCount == 0) _dismissArmed = true;
                return;
            }
            if (Input.GetMouseButtonDown(0))
            {
                AdvanceMovementTutorial();
                return;
            }
            for (int i = 0; i < Input.touchCount; i++)
            {
                if (Input.GetTouch(i).phase != TouchPhase.Began) continue;
                AdvanceMovementTutorial();
                return;
            }
        }

        private void SetInfinityVisible(bool visible)
        {
            if (_infinityGraphic == null) return;
            // The camera hint graphic also hosts this component and its hand.
            // Hide only its graphic so OnDisable cannot cancel the new tutorial.
            if (_infinityGraphic == transform || transform.IsChildOf(_infinityGraphic))
            {
                var graphic = _infinityGraphic.GetComponent<UnityEngine.UI.Image>();
                if (graphic != null) graphic.enabled = visible;
            }
            else _infinityGraphic.gameObject.SetActive(visible);
        }

        public void HideMovementTutorial()
        {
            _nextMovementTutorial = null;
            HideOwnMovementTutorial();
            if (_cameraTutorial != null && _cameraTutorial != this) _cameraTutorial.HideMovementTutorial();
        }

        private void AdvanceMovementTutorial()
        {
            HandTutorial next = _nextMovementTutorial;
            _nextMovementTutorial = null;
            HideOwnMovementTutorial();
            // The next step waits for release before accepting a new press, so
            // the camera dismissal cannot also dismiss the joystick this frame.
            if (next != null) next.ShowOwnMovementTutorial();
        }

        private void HideOwnMovementTutorial()
        {
            _waitForClimbSwipe = false;
            CacheLayout();
            _movementVisible = false;
            _moveTween?.Kill();
            _moveTween = null;
            if (_moveHand != null) _moveHand.anchoredPosition = _moveHandOrigin;
            SetInfinityVisible(false);
            if (_moveHand != null) _moveHand.gameObject.SetActive(false);
            if (_movementLabel != null) _movementLabel.SetActive(false);
            // The camera tutorial uses its own RectTransform as the infinity graphic.
            // Deactivate the whole root only after explicit dismissal, not OnDisable.
            if (_infinityGraphic == transform) gameObject.SetActive(false);
        }

        public void SetStealHintVisible(bool visible)
        {
            CacheLayout();
            if (visible) HideMovementTutorial();
            if (_stealHand == null) return;
            if (visible && _pressTween != null && _pressTween.IsActive()) return;

            _pressTween?.Kill();
            _pressTween = null;
            _stealHand.localScale = _stealHandScale;
            _stealHand.gameObject.SetActive(visible);
            if (!visible) return;

            _pressTween = _stealHand.DOScale(_stealHandScale * _pressedScale, Mathf.Max(0.1f, _pressDuration))
                .SetEase(Ease.InOutSine).SetLoops(-1, LoopType.Yoyo);
        }

        public void HideAll()
        {
            HideMovementTutorial();
            SetStealHintVisible(false);
        }

        private void OnDisable()
        {
            // A parent UI object may be temporarily disabled during initialization.
            // Only explicit dismissal/game-state changes should hide either tutorial.
            _moveTween?.Kill();
            _moveTween = null;
            _pressTween?.Kill();
            _pressTween = null;
        }
    }
}
