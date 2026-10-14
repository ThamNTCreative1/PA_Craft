using System;
using ECM2;
using Minigames.Runtimes.Controls;
using UnityEngine;
using UnityEngine.UI;

namespace Playable
{
    // Keeps the source ECM2 serialized movement settings and ladder state machine.
    public sealed class ClimbPlayer : Character
    {
        [SerializeField] private Joystick _joystick;
        [SerializeField] private Button _jumpButton;
        [SerializeField] private Transform _model;
        [SerializeField] private Transform _towerBase;
        [SerializeField] private float _towerHeight = 2271.36f;
        [SerializeField] private float _baseClimbSpeed = 1.875f;
        private LadderClimbAbility _ladder;
        private AutoLadderClimbAbility _autoLadder;
        private Quaternion _modelRotation;
        private Quaternion _rotationFrom;
        private Quaternion _rotationTo;
        private float _rotationElapsed;
        private bool _isRotating;
        private bool _wasClimbing;
        private bool _rotated;
        private bool _tutorialPaused;
        private bool _autoLadderWasEnabled;
        public Vector2 JoystickDirection => _joystick != null ? _joystick.Direction : Vector2.zero;

        public void SetTutorialPaused(bool paused)
        {
            if (_tutorialPaused == paused) return;
            _tutorialPaused = paused;
            if (paused)
            {
                _autoLadderWasEnabled = _autoLadder != null && _autoLadder.enabled;
                if (_autoLadder != null) _autoLadder.enabled = false;
                SetMovementDirection(Vector3.zero);
                SetVelocity(Vector3.zero);
            }
            else if (_autoLadder != null) _autoLadder.enabled = _autoLadderWasEnabled;
        }
#if UNITY_LUNA
        private RectTransform _jumpRect;
        private Canvas _jumpCanvas;
#endif

        public event Action ClimbStarted;
        public event Action JumpedFromLadder;
        public event Action Landed;
        public bool IsClimbing => _ladder != null && _ladder.IsClimbing();
        public bool IsDropping { get; private set; }
        public bool InputEnabled { get; set; } = true;
        public float Height => Mathf.Max(0f, transform.position.y - (_towerBase != null ? _towerBase.position.y : 0f));
        public float Progress => _towerHeight > 0f ? Mathf.Clamp01(Height / _towerHeight) : 0f;
        public float ClimbSpeed => _ladder != null ? _ladder.climbingSpeed : 0f;

        protected override void Awake()
        {
            base.Awake();
#if UNITY_LUNA
            // ECM2 writes Transform directly; a 30 ms fixed tick visibly steps
            // against the browser's faster rendering loop. Simulate once per frame.
            enableAutoSimulation = false;
#endif
            _ladder = GetComponent<LadderClimbAbility>();
            _autoLadder = GetComponent<AutoLadderClimbAbility>();
#if UNITY_LUNA
            if (_jumpButton != null)
            {
                _jumpRect = _jumpButton.transform as RectTransform;
                _jumpCanvas = _jumpButton.GetComponentInParent<Canvas>();
            }
#endif
            if (_model != null) _modelRotation = _model.localRotation;
        }

        protected override void OnEnable()
        {
            base.OnEnable();
#if !UNITY_LUNA
            if (_jumpButton != null) _jumpButton.onClick.AddListener(Jump);
#endif
        }

        protected override void OnDisable()
        {
#if !UNITY_LUNA
            if (_jumpButton != null) _jumpButton.onClick.RemoveListener(Jump);
#endif
            _isRotating = false;
            base.OnDisable();
        }

        public void SetClimbSpeedMultiplier(float multiplier)
        {
            if (_ladder == null) _ladder = GetComponent<LadderClimbAbility>();
            _ladder.climbingSpeed = _baseClimbSpeed * Mathf.Max(0f, multiplier);
        }

        private void Update()
        {
            if (_tutorialPaused) return;
#if UNITY_LUNA
            ReadJumpInput();
#endif
            Vector2 input = _joystick != null ? _joystick.Direction : Vector2.zero;
#if UNITY_EDITOR
            var keyboard = new Vector2(Input.GetAxisRaw("Horizontal"), Input.GetAxisRaw("Vertical"));
            if (keyboard.sqrMagnitude > 0f) input = Vector2.ClampMagnitude(keyboard, 1f);
            if (Input.GetKeyDown(KeyCode.Space)) Jump();
#endif
            Vector3 direction = new Vector3(input.x, 0f, input.y);
            if (camera != null) direction = direction.relativeTo(cameraTransform);
            SetMovementDirection(InputEnabled && !IsDropping ? direction : Vector3.zero);

            if (_rotated && !IsDropping && direction.sqrMagnitude > 0.01f)
            {
                BeginModelRotation(_modelRotation);
                _rotated = false;
            }
            UpdateModelRotation();
#if UNITY_LUNA
            float frameTime = Mathf.Min(Time.deltaTime, 0.1f);
            if (frameTime > 0f)
            {
                // Match the project's configured 30 ms physics step ceiling. Using
                // 1/60 here doubles collision queries on ordinary 17-30 ms frames
                // and adds still more work when the browser is already slow.
                int steps = Mathf.Clamp(Mathf.CeilToInt(frameTime / 0.03f), 1, 4);
                float stepTime = frameTime / steps;
                for (int i = 0; i < steps; i++) Simulate(stepTime);
            }
#endif
        }

#if UNITY_LUNA
        private void ReadJumpInput()
        {
            if (!InputEnabled || IsDropping || _jumpButton == null || _jumpRect == null ||
                !_jumpButton.isActiveAndEnabled || !_jumpButton.IsInteractable()) return;

            // Use the same direct input path as the Luna joystick. Process only
            // a new press, and do not also consume its emulated mouse event.
            if (Input.touchCount > 0)
            {
                for (int i = 0; i < Input.touchCount; i++)
                {
                    Touch touch = Input.GetTouch(i);
                    if (touch.phase == TouchPhase.Began && IsJumpButtonHit(touch.position))
                    {
                        Jump();
                        return;
                    }
                }
            }
            else if (Input.GetMouseButtonDown(0) && IsJumpButtonHit(Input.mousePosition))
                Jump();
        }

        private bool IsJumpButtonHit(Vector2 screenPosition)
        {
            Camera uiCamera = _jumpCanvas != null && _jumpCanvas.renderMode != RenderMode.ScreenSpaceOverlay
                ? _jumpCanvas.worldCamera : null;
            Vector2 localPoint;
            return RectTransformUtility.ScreenPointToLocalPointInRectangle(
                _jumpRect, screenPosition, uiCamera, out localPoint) && _jumpRect.rect.Contains(localPoint);
        }
#endif

        private void BeginModelRotation(Quaternion target)
        {
            if (_model == null) return;
            _rotationFrom = _model.localRotation;
            _rotationTo = target;
            _rotationElapsed = 0f;
            _isRotating = true;
        }

        private void UpdateModelRotation()
        {
            if (!_isRotating || _model == null) return;
            _rotationElapsed += Time.deltaTime;
            float t = Mathf.Clamp01(_rotationElapsed / 0.25f);
            // Match the previous tween's OutQuad easing without a DOTween
            // quaternion shortcut that is missing from the Luna runtime.
            _model.localRotation = Quaternion.Slerp(_rotationFrom, _rotationTo, t * (2f - t));
            if (t >= 1f) _isRotating = false;
        }

        private void LateUpdate()
        {
            bool climbing = IsClimbing;
            if (climbing && !_wasClimbing) ClimbStarted?.Invoke();
            _wasClimbing = climbing;
            if (IsDropping)
            {
                SetMovementDirection(Vector3.zero);
                if (IsGrounded())
                {
                    IsDropping = false;
                    _autoLadder.enabled = true;
                    _autoLadder.SetAutoClimbing(false);
                    _ladder.SetAutoClimbMode(false);
                    SetMovementMode(MovementMode.Walking);
                    Landed?.Invoke();
                }
            }
        }

        public override void Jump()
        {
            if (!InputEnabled || IsDropping || _tutorialPaused) return;
            if (!IsClimbing) { base.Jump(); return; }
            IsDropping = true;
            _rotated = true;
            Vector3 velocity = -transform.forward * 10f;
            velocity.y = 5f;
            PauseGroundConstraint();
            LaunchCharacter(velocity, true, true);
            _autoLadder.enabled = false;
            SetMovementMode(MovementMode.Falling);
            SetMovementDirection(Vector3.zero);
            BeginModelRotation(_modelRotation * Quaternion.Euler(0f, 180f, 0f));
            JumpedFromLadder?.Invoke();
        }
    }
}
