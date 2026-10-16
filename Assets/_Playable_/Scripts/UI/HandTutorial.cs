using DG.Tweening;
using UnityEngine;
using UnityEngine.Serialization;

namespace Playable
{
    public class HandTutorial : MonoBehaviour
    {
        [Header("Move hint")]
        [FormerlySerializedAs("_infinityGraphic")]
        [SerializeField] private RectTransform _movementRoot;
        [SerializeField] private RectTransform _moveHand;
        [SerializeField] private UltimateJoystick _moveJoystick;
        [SerializeField, Min(0.1f)] private float _loopDuration = 2f;
        [SerializeField] private Vector2 _swipeOffset = new Vector2(0f, 110f);

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
            if (_movementRoot == null || _moveHand == null) return;

            _movementRoot.gameObject.SetActive(true);
            _moveHand.gameObject.SetActive(true);
            float duration = Mathf.Max(0.1f, _loopDuration);
            _moveTween = DOTween.Sequence()
                .Append(_moveHand.DOAnchorPos(_moveHandOrigin + _swipeOffset, duration * 0.85f)
                    .SetEase(Ease.InOutSine))
                .AppendInterval(duration * 0.15f)
                .SetLoops(-1, LoopType.Restart);
        }

        private void Update()
        {
            if (_movementRoot == null || !_movementRoot.gameObject.activeSelf) return;
            if (_moveJoystick != null)
            {
                if (new Vector2(_moveJoystick.HorizontalAxis, _moveJoystick.VerticalAxis).sqrMagnitude > 0.01f)
                    HideMovementTutorial();
                return;
            }
            if (Input.GetMouseButtonDown(0))
            {
                HideMovementTutorial();
                return;
            }

            for (int i = 0; i < Input.touchCount; i++)
            {
                if (Input.GetTouch(i).phase != TouchPhase.Began) continue;
                HideMovementTutorial();
                return;
            }
        }

        public void HideMovementTutorial()
        {
            CacheLayout();
            _moveTween?.Kill();
            _moveTween = null;
            if (_moveHand != null)
            {
                _moveHand.anchoredPosition = _moveHandOrigin;
            }
            if (_moveHand != null) _moveHand.gameObject.SetActive(false);
            if (_movementRoot != null) _movementRoot.gameObject.SetActive(false);
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
            HideAll();
        }
    }
}
