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

        [Header("Joystick hint")]
        [SerializeField] private TouchController _lookInput;
        [SerializeField] private UltimateJoystick _joystick;
        [SerializeField] private RectTransform _joystickHint;
        [SerializeField] private RectTransform _joystickHand;
        [SerializeField, Min(1f)] private float _swipeDistance = 100f;
        private int _movementStep;
        private Tween _joystickTween;

        [Header("Steal hint")]
        [SerializeField] private RectTransform _stealHand;
        [SerializeField, Min(0.1f)] private float _pressDuration = 0.4f;
        [SerializeField, Range(0.1f, 1f)] private float _pressedScale = 0.8f;

        private Tween _moveTween;
        private Tween _pressTween;
        private Vector2 _moveHandOrigin;
        private Vector3 _stealHandScale;
        private bool _cached;

        private void CacheLayout()
        {
            if (_cached) return;
            if (_moveHand != null) _moveHandOrigin = _moveHand.anchoredPosition;
            if (_stealHand != null) _stealHandScale = _stealHand.localScale;
            _cached = true;
        }

        public void ShowMovementTutorial()
        {
            CacheLayout();
            HideMovementTutorial();
            if (_infinityGraphic == null || _moveHand == null) return;

            _movementStep = 1;

            _infinityGraphic.gameObject.SetActive(true);
            _moveHand.gameObject.SetActive(true);
            _moveTween = DOVirtual.Float(0f, Mathf.PI * 2f, Mathf.Max(0.1f, _loopDuration), angle =>
            {
                Vector2 size = _infinityGraphic.rect.size;
                _moveHand.anchoredPosition = _moveHandOrigin + new Vector2(
                    Mathf.Sin(angle) * size.x * _pathSize.x,
                    Mathf.Sin(angle * 2f) * size.y * _pathSize.y);
            }).SetEase(Ease.Linear).SetLoops(-1, LoopType.Restart);
        }

        private void OnEnable()
        {
            if (_lookInput != null) _lookInput.OnLookDelta += HandleLook;
        }

        private void HandleLook(Vector2 delta)
        {
            if (_movementStep != 1 || delta.sqrMagnitude < 1f) return;
            HideMovementTutorial();
            if (_joystickHint == null || _joystickHand == null) return;
            _movementStep = 2;
            _joystickHint.gameObject.SetActive(true);
            _joystickHand.anchoredPosition = Vector2.zero;
            _joystickTween = _joystickHand.DOAnchorPosY(_swipeDistance, 1f)
                .SetEase(Ease.InOutSine).SetLoops(-1, LoopType.Restart);
        }

        private void LateUpdate()
        {
            if (_joystick == null || _joystick.JoystickBase == null) return;
            Vector3 center = _joystick.JoystickBase.position;
            // Both hints use the joystick's actual position after its responsive layout runs.
            if (_infinityGraphic != null)
            {
                Vector3 position = _infinityGraphic.position;
                position.y = center.y;
                _infinityGraphic.position = position;
            }
            if (_joystickHint != null) _joystickHint.position = center;
            if (_movementStep == 2 && new Vector2(_joystick.HorizontalAxis, _joystick.VerticalAxis).sqrMagnitude > .01f)
                HideMovementTutorial();
        }

        public void HideMovementTutorial()
        {
            CacheLayout();
            _movementStep = 0;
            _joystickTween?.Kill();
            _joystickTween = null;
            if (_joystickHint != null) _joystickHint.gameObject.SetActive(false);
            _moveTween?.Kill();
            _moveTween = null;
            if (_moveHand != null) _moveHand.anchoredPosition = _moveHandOrigin;
            if (_infinityGraphic != null) _infinityGraphic.gameObject.SetActive(false);
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
            if (_lookInput != null) _lookInput.OnLookDelta -= HandleLook;
            HideAll();
        }
    }
}
