using TMPro;
using DG.Tweening;
using UnityEngine;
using UnityEngine.UI;

namespace Playable
{
    public class GameController : MonoBehaviour
    {
        public enum RunState
        {
            Moving,
            JumpTutorial,
            Won,
            Lost
        }

        [SerializeField] private GameManager _gameManager;
        [SerializeField] private PlayerController _player;
        [SerializeField] private Transform _target;
        [SerializeField] private Transform _arrow;
        [SerializeField] private Button _jumpButton;
        [SerializeField] private Button _tryAgainButton;
        [SerializeField] private RectTransform _tutorialHand;
        [SerializeField] private GameObject _movementControls;
        [SerializeField] private HandTutorial _movementTutorial;
        [SerializeField] private TMP_Text _hint;
        [SerializeField] private FailPanel _failPanel;
        [SerializeField, Min(0.1f)] private float _targetRadius = 0.85f;
        [SerializeField] private float _lavaHeight = -1.25f;
        [SerializeField] private float _arrowTravel = 0.45f;
        [SerializeField] private float _arrowDuration = 0.65f;

        public RunState State { get; private set; }
        private Tween _arrowTween;
        private Tween _handTween;
        private Tween _hintTween;
        private Vector3 _hintOriginalScale;
        private Vector3 _arrowOrigin;
        private UltimateJoystick _layoutJoystick;
        private RectTransform _jumpRect;
        private Canvas _controlsCanvas;
        private float _landscapeJumpY;
        private bool _portraitControlsAligned;

        private void Awake()
        {
            _jumpRect = _jumpButton.GetComponent<RectTransform>();
            _landscapeJumpY = _jumpRect.anchoredPosition.y;
            _layoutJoystick = _movementControls.GetComponentInChildren<UltimateJoystick>(true);
            _controlsCanvas = _jumpButton.GetComponentInParent<Canvas>();
        }

        private void AlignPortraitControls()
        {
            if (_jumpRect == null || _layoutJoystick == null || _controlsCanvas == null) return;
            Rect screen = _controlsCanvas.rootCanvas.pixelRect;
            if (screen.height > screen.width)
            {
                var joystickBase = _layoutJoystick.JoystickBase;
                if (joystickBase == null) return;
                Transform parent = _jumpRect.parent;
                float joystickY = parent.InverseTransformPoint(joystickBase.TransformPoint(joystickBase.rect.center)).y;
                float jumpY = parent.InverseTransformPoint(_jumpRect.TransformPoint(_jumpRect.rect.center)).y;
                if (Mathf.Abs(joystickY - jumpY) > 0.01f)
                {
                    Vector2 position = _jumpRect.anchoredPosition;
                    position.y += joystickY - jumpY;
                    _jumpRect.anchoredPosition = position;
                }

                _portraitControlsAligned = true;
            }
            else if (_portraitControlsAligned)
            {
                RestoreJumpPosition();
            }
        }

        private void RestoreJumpPosition()
        {
            if (_jumpRect == null || !_portraitControlsAligned) return;
            Vector2 position = _jumpRect.anchoredPosition;
            position.y = _landscapeJumpY;
            _jumpRect.anchoredPosition = position;
            _portraitControlsAligned = false;
        }

        private void OnEnable()
        {
            Canvas.willRenderCanvases += AlignPortraitControls;
            _jumpButton.onClick.AddListener(OnJumpPressed);
            _tryAgainButton.onClick.AddListener(OnTryAgainPressed);
            _gameManager.CountdownExpired += Lose;
            if (_hint != null && State != RunState.Won && State != RunState.Lost)
            {
                _hintOriginalScale = _hint.rectTransform.localScale;
                _hintTween = _hint.rectTransform.DOScale(_hintOriginalScale * 1.1f, 0.5f)
                    .SetEase(Ease.InOutSine).SetLoops(-1, LoopType.Yoyo);
            }
        }

        private void Start()
        {
            State = RunState.Moving;
            _tutorialHand.gameObject.SetActive(false);
            if (_movementTutorial != null) _movementTutorial.ShowMovementTutorial();
            _arrowOrigin = _arrow.position;
            _arrowTween = _arrow.DOMoveY(_arrowOrigin.y + _arrowTravel, _arrowDuration)
                .SetEase(Ease.InOutSine).SetLoops(-1, LoopType.Yoyo);
        }

        private void Update()
        {
            if (State == RunState.Won || State == RunState.Lost) return;
            // Falling always takes priority, including after the jump hint appeared.
            if (_player.transform.position.y < _lavaHeight)
            {
                Lose();
                return;
            }

            if (State != RunState.Moving || !_player.IsGrounded) return;
            Vector3 delta = _player.transform.position - _target.position;
            if (new Vector2(delta.x, delta.z).sqrMagnitude > _targetRadius * _targetRadius) return;
            State = RunState.JumpTutorial;
            if (_movementTutorial != null) _movementTutorial.HideMovementTutorial();
            _arrowTween?.Kill();
            _arrow.gameObject.SetActive(false);
            if (_hint != null) _hint.text = "Tap JUMP!";
            _tutorialHand.gameObject.SetActive(true);
            _tutorialHand.localScale = Vector3.one;
            _handTween = _tutorialHand.DOScale(0.8f, 0.4f)
                .SetEase(Ease.InOutSine).SetLoops(-1, LoopType.Yoyo);
        }

        private void OnJumpPressed()
        {
            if (State != RunState.JumpTutorial) return;
            if (_player.transform.position.y < _lavaHeight)
            {
                Lose();
                return;
            }

            _player.PlayJumpAnimation();
            State = RunState.Won;
            StopRun();
            _gameManager.EndGame();
            _gameManager.ShowCTA();
        }

        private void OnTryAgainPressed()
        {
            if (State == RunState.Lost) _gameManager.ShowCTA();
        }

        private void Lose()
        {
            if (State == RunState.Won || State == RunState.Lost) return;
            State = RunState.Lost;
            StopRun();
            _failPanel.Show();
            _gameManager.EndGame();
        }

        private void StopRun()
        {
            StopHintPulse();
            _player.IsWorking = false;
            var body = _player.GetComponent<Rigidbody>();
            body.linearVelocity = Vector3.zero;
            body.angularVelocity = Vector3.zero;
            _arrowTween?.Kill();
            _handTween?.Kill();
            if (_movementTutorial != null) _movementTutorial.HideAll();
            _tutorialHand.gameObject.SetActive(false);
            _movementControls.SetActive(false);
        }

        private void OnDisable()
        {
            Canvas.willRenderCanvases -= AlignPortraitControls;
            RestoreJumpPosition();
            StopHintPulse();
            if (_jumpButton != null) _jumpButton.onClick.RemoveListener(OnJumpPressed);
            if (_tryAgainButton != null) _tryAgainButton.onClick.RemoveListener(OnTryAgainPressed);
            if (_gameManager != null) _gameManager.CountdownExpired -= Lose;
            _arrowTween?.Kill();
            _handTween?.Kill();
        }

        private void StopHintPulse()
        {
            if (_hintTween == null) return;
            _hintTween.Kill();
            _hintTween = null;
            if (_hint != null) _hint.rectTransform.localScale = _hintOriginalScale;
        }
    }
}