using System;
using UnityEngine;
using UnityEngine.UI;

namespace Playable
{
    [RequireComponent(typeof(Rigidbody), typeof(CapsuleCollider))]
    public class PlayerController : MonoBehaviour
    {
        [SerializeField] private bool _isWorking = true;
        [Header("References")]
        [SerializeField] private Rigidbody _rigidbody;
        [SerializeField] private CapsuleCollider _capsuleCollider;
        [SerializeField] private UltimateJoystick _moveJoystick;
        [SerializeField] private CameraController _cameraController;
        [SerializeField] private Animator _animator;
        [SerializeField] private Button _btnJump;
        [SerializeField] private DriveHoldButton _forwardButton;
        [SerializeField] private DriveHoldButton _reverseButton;
        [SerializeField] private DriveHoldButton _leftButton;
        [SerializeField] private DriveHoldButton _rightButton;
        [SerializeField] private GameController _gameController;
        [Header("Animation")]
        [SerializeField] private string _isJumpParam = "isJump";
        [SerializeField] private string _speedParam = "speed";
        [SerializeField] private float _airborneAnimationDelay = 0.08f;
        [Header("Movement")]
        [SerializeField] private float _moveRate = 4.5f;
        [SerializeField] private float _rotationSmooth = 14f;
        [SerializeField] private float _acceleration = 28f;
        [SerializeField] private float _deceleration = 35f;
        [SerializeField] private float _airControlMultiplier = 0.6f;
        [SerializeField, Range(0, 0.5f)] private float _inputDeadZone = 0.1f;
        [SerializeField] private float _stepHeight = 0.55f;
        [Header("Jump")]
        [SerializeField] private float _jumpHeight = 1.2f;
        [SerializeField] private float _gravity = -20f;
        [SerializeField] private float _fallGravityMultiplier = 1.6f;
        [SerializeField] private float _maxFallRate = 30f;
        [SerializeField] private float _jumpGroundIgnoreDuration = 0.15f;
        [SerializeField] private float _jumpBufferDuration = 0.15f;
        [SerializeField] private float _coyoteTime = 0.1f;
        [Header("Ground")]
        [SerializeField] private LayerMask _groundMask = ~0;
        [SerializeField] private float _groundCheckDistance = 0.12f;
        [SerializeField, Range(0, 75)] private float _maxSlope = 50f;
        private Vector2 _moveInput;
        private Vector3 _groundNormal = Vector3.up;
        private float _lastGroundedTime = float.NegativeInfinity;
        private float _lastJumpRequestTime = float.NegativeInfinity;
        private float _ignoreGroundUntil;
        private bool _isGrounded, _followCameraYaw;
        private float _cameraYaw;
        private bool _aiming;
        private float _aimYaw;
        private bool _hasSpeed, _hasJump;
        private float _animationSpeed, _airborneTime, _groundedTime;
        private bool _jumpAnimation;
        private Transform _originalParent;
        private RuntimeAnimatorController _onFootController;
        private Vector3 _originalScale;
        private PhysicsMaterial _movementMaterial;
        private readonly RaycastHit[] _groundHits = new RaycastHit[32];
        private readonly Collider[] _overlaps = new Collider[32];
        public bool IsGrounded => _isGrounded;
        public bool IsRiding { get; private set; }
        public Vector3 Velocity => IsRiding || _rigidbody == null ? Vector3.zero : _rigidbody.linearVelocity;
        public UltimateJoystick MoveJoystick => _moveJoystick;
        public CameraController CameraController => _cameraController;
        public event Action MovementRequested;
        public bool IsWorking { get => _isWorking; set { _isWorking = value; if (!value) _moveInput = Vector2.zero; } }

        public RuntimeAnimatorController SetOnFootAnimator(RuntimeAnimatorController controller)
        {
            if (_animator == null || IsRiding) return null;
            RuntimeAnimatorController previous = _animator.runtimeAnimatorController;
            _animator.runtimeAnimatorController = controller;
            _animator.Rebind();
            _animator.Update(0);
            return previous;
        }

        private void Awake()
        {
            if (_rigidbody == null) _rigidbody = GetComponent<Rigidbody>();
            if (_capsuleCollider == null) _capsuleCollider = GetComponent<CapsuleCollider>();
            _rigidbody.useGravity = false;
            _rigidbody.isKinematic = false;
            ConfigureWalkingPhysics();
            _rigidbody.constraints = RigidbodyConstraints.FreezeRotation;
            _movementMaterial = new PhysicsMaterial() { dynamicFriction = 0, staticFriction = 0,
                bounciness = 0, frictionCombine = PhysicsMaterialCombine.Minimum, bounceCombine = PhysicsMaterialCombine.Minimum };
            _capsuleCollider.material = _movementMaterial;
            if (_animator == null) _animator = GetComponentInChildren<Animator>();
            if (_animator != null)
            {
                _animator.applyRootMotion = false;
#if UNITY_LUNA
                // Luna does not support Animator.parameters. Names are configured
                // against the on-foot controller; an empty name disables a parameter.
                _hasSpeed = !string.IsNullOrEmpty(_speedParam);
                _hasJump = !string.IsNullOrEmpty(_isJumpParam);
#else
                foreach (var p in _animator.parameters)
                {
                    if (p.name == _speedParam && p.type == AnimatorControllerParameterType.Float) _hasSpeed = true;
                    if (p.name == _isJumpParam && p.type == AnimatorControllerParameterType.Bool) _hasJump = true;
                }
#endif
            }
            if (_btnJump != null) _btnJump.onClick.AddListener(OnJumpButtonPressed);
        }
        private void OnDestroy()
        {
            if (_btnJump != null) _btnJump.onClick.RemoveListener(OnJumpButtonPressed);
            if (_movementMaterial != null) Destroy(_movementMaterial);
        }
        private void ConfigureWalkingPhysics()
        {
#if UNITY_LUNA
            // Playworks recommends extrapolation + speculative contacts for camera-follow jitter.
            _rigidbody.interpolation = RigidbodyInterpolation.Extrapolate;
            _rigidbody.collisionDetectionMode = CollisionDetectionMode.ContinuousSpeculative;
#else
            _rigidbody.interpolation = RigidbodyInterpolation.Interpolate;
            _rigidbody.collisionDetectionMode = CollisionDetectionMode.ContinuousDynamic;
#endif
        }
        public Vector2 ReadMoveInput()
        {
            Vector2 input = _moveJoystick != null ? new Vector2(_moveJoystick.HorizontalAxis, _moveJoystick.VerticalAxis) : Vector2.zero;
#if UNITY_EDITOR || UNITY_STANDALONE
            Vector2 keys = new Vector2(Input.GetAxisRaw("Horizontal"), Input.GetAxisRaw("Vertical"));
            if (keys.sqrMagnitude > 0.01f) input = keys;
#endif
            input = Vector2.ClampMagnitude(input, 1);
            return input.sqrMagnitude < _inputDeadZone * _inputDeadZone ? Vector2.zero : input;
        }
        public float ReadDriveInput()
        {
            float input = (_forwardButton != null && _forwardButton.IsHeld ? 1f : 0f)
                - (_reverseButton != null && _reverseButton.IsHeld ? 1f : 0f);
#if UNITY_EDITOR || UNITY_STANDALONE
            if (Input.GetKey(KeyCode.W) || Input.GetKey(KeyCode.S))
                input = (Input.GetKey(KeyCode.W) ? 1f : 0f) - (Input.GetKey(KeyCode.S) ? 1f : 0f);
#endif
            return input;
        }
        private void SetDrivingControls(bool riding)
        {
            if (_moveJoystick != null) _moveJoystick.gameObject.SetActive(!riding);
            if (_forwardButton != null) { _forwardButton.Release(); _forwardButton.gameObject.SetActive(riding); }
            if (_reverseButton != null) { _reverseButton.Release(); _reverseButton.gameObject.SetActive(riding); }
            if (_leftButton != null) { _leftButton.Release(); _leftButton.gameObject.SetActive(riding); }
            if (_rightButton != null) { _rightButton.Release(); _rightButton.gameObject.SetActive(riding); }
            if (_gameController != null) _gameController.SetRiding(riding);
        }
        private void Start() { SetDrivingControls(false); }
        public float ReadSteerInput()
        {
            float input = (_rightButton != null && _rightButton.IsHeld ? 1f : 0f)
                - (_leftButton != null && _leftButton.IsHeld ? 1f : 0f);
#if UNITY_EDITOR || UNITY_STANDALONE
            if (Input.GetKey(KeyCode.A) || Input.GetKey(KeyCode.D))
                input = (Input.GetKey(KeyCode.D) ? 1f : 0f) - (Input.GetKey(KeyCode.A) ? 1f : 0f);
#endif
            return input;
        }
        private void Update()
        {
            if (IsRiding) return;
            _moveInput = ReadMoveInput();
            if (!_isWorking && _moveInput.sqrMagnitude > 0) MovementRequested?.Invoke();
#if UNITY_EDITOR || UNITY_STANDALONE
            if (Input.GetKeyDown(KeyCode.Space)) OnJumpButtonPressed();
#endif
            if (_animator == null) return;
            Vector3 planar = Velocity; planar.y = 0;
            // Smooth explicitly so the same parameter values reach Unity and Luna.
            float speed = planar.magnitude;
            if (speed < 0.05f) speed = 0;
            _animationSpeed = Mathf.Lerp(_animationSpeed, speed, 1f - Mathf.Exp(-Time.deltaTime / 0.08f));
            if (_hasSpeed) _animator.SetFloat(_speedParam, _animationSpeed);
            if (_hasJump) _animator.SetBool(_isJumpParam, _jumpAnimation);
        }
        private void FixedUpdate()
        {
            if (IsRiding || _rigidbody.isKinematic) return;
            Vector3 velocity = _rigidbody.linearVelocity;
            RaycastHit ground = default;
            _isGrounded = Time.time >= _ignoreGroundUntil && velocity.y <= 0.5f && ProbeGround(out ground);
            if (_isGrounded)
            {
                _groundNormal = ground.normal;
                _lastGroundedTime = Time.time;
            }
            else _groundNormal = Vector3.up;
            Vector2 input = _isWorking ? _moveInput : Vector2.zero;
            Quaternion yaw = Quaternion.Euler(0, _cameraController != null ? _cameraController.Yaw : 0, 0);
            Vector3 direction = yaw * new Vector3(input.x, 0, input.y);
            Vector3 desired = direction * _moveRate;
            if (_isGrounded) desired = Vector3.ProjectOnPlane(desired, _groundNormal).normalized * desired.magnitude;
            Vector3 planar = new Vector3(velocity.x, 0, velocity.z);
            Vector3 target = new Vector3(desired.x, 0, desired.z);
            planar = Vector3.MoveTowards(planar, target, (input.sqrMagnitude > 0 ? _acceleration : _deceleration)
                * (_isGrounded ? 1f : _airControlMultiplier) * Time.fixedDeltaTime);
            float vertical = _isGrounded ? Mathf.Min(velocity.y, -2f) + Mathf.Max(0, desired.y) : velocity.y;
#if UNITY_LUNA
            // Use a small ground adhesion velocity, rather than carrying a fall into the floor.
            // Preserve the slope's vertical component in both travel directions.
            if (_isGrounded) vertical = desired.y - 0.5f;
#endif
            bool jumped = _isWorking && Time.time - _lastJumpRequestTime <= _jumpBufferDuration &&
                (_isGrounded || Time.time - _lastGroundedTime <= _coyoteTime);
            if (jumped)
            {
                vertical = Mathf.Sqrt(2f * Mathf.Abs(_gravity) * _jumpHeight);
                _lastJumpRequestTime = _lastGroundedTime = float.NegativeInfinity;
                _ignoreGroundUntil = Time.time + _jumpGroundIgnoreDuration;
                _isGrounded = false;
            }
            else if (!_isGrounded) vertical = Mathf.Max(-_maxFallRate, vertical + _gravity *
                (vertical < 0 ? _fallGravityMultiplier : 1) * Time.fixedDeltaTime);
            // Debounce both edges: a single missed ground probe must not restart the jump clip.
            _airborneTime = _isGrounded ? 0 : _airborneTime + Time.fixedDeltaTime;
            _groundedTime = _isGrounded ? _groundedTime + Time.fixedDeltaTime : 0;
            if (jumped || (!_isGrounded && _airborneTime >= _airborneAnimationDelay)) _jumpAnimation = true;
            if (_groundedTime >= 0.06f) _jumpAnimation = false;
            if (_isGrounded && direction.sqrMagnitude > 0.001f) TryStep(direction.normalized);
            _rigidbody.linearVelocity = new Vector3(planar.x, vertical, planar.z);
            if (_aiming || _followCameraYaw || direction.sqrMagnitude > 0.001f)
            {
                // Aim owns a separate request so camera callbacks cannot clear it on Luna.
                Quaternion rotation = _aiming ? Quaternion.Euler(0, _aimYaw, 0) :
                    _followCameraYaw ? Quaternion.Euler(0, _cameraYaw, 0) : Quaternion.LookRotation(direction);
                _rigidbody.MoveRotation(Quaternion.Slerp(_rigidbody.rotation, rotation, 1f - Mathf.Exp(-_rotationSmooth * Time.fixedDeltaTime)));
            }
        }
        private bool ProbeGround(out RaycastHit best)
        {
            CapsuleAt(_rigidbody.position, out Vector3 bottom, out _, out float radius);
            int count = Physics.SphereCastNonAlloc(bottom + Vector3.up * 0.05f, radius * 0.9f, Vector3.down, _groundHits,
                _groundCheckDistance + radius * 0.1f + 0.05f, _groundMask, QueryTriggerInteraction.Ignore);
            best = default; float distance = float.MaxValue;
            for (int i = 0; i < count; i++)
            {
                var hit = _groundHits[i];
                if (hit.collider.transform.IsChildOf(transform) || hit.normal.y < Mathf.Cos(_maxSlope * Mathf.Deg2Rad) || hit.distance >= distance) continue;
                best = hit; distance = hit.distance;
            }
            return distance < float.MaxValue;
        }
        private void TryStep(Vector3 direction)
        {
            CapsuleAt(_rigidbody.position, out Vector3 bottom, out Vector3 top, out float radius);
            Vector3 feet = bottom - Vector3.up * radius;
            float reach = radius + _moveRate * Time.fixedDeltaTime + 0.12f;
            if (!Physics.Raycast(feet + Vector3.up * 0.1f, direction, out RaycastHit wall, reach, _groundMask, QueryTriggerInteraction.Ignore)
                || wall.collider.transform.IsChildOf(transform) || wall.normal.y > 0.5f) return;
            Vector3 sample = feet + direction * reach + Vector3.up * (_stepHeight + 0.1f);
            if (!Physics.Raycast(sample, Vector3.down, out RaycastHit step, _stepHeight, _groundMask, QueryTriggerInteraction.Ignore)
                || step.normal.y < Mathf.Cos(_maxSlope * Mathf.Deg2Rad)) return;
            float rise = step.point.y - feet.y;
            if (rise <= 0.02f || rise > _stepHeight) return;
            Vector3 lift = Vector3.up * (rise + 0.02f);
            if (!CanStandAt(_rigidbody.position + lift + direction * 0.08f)) return;
            _rigidbody.position += lift;
        }
        private void CapsuleAt(Vector3 position, out Vector3 bottom, out Vector3 top, out float radius)
        {
            Vector3 scale = transform.lossyScale;
            radius = _capsuleCollider.radius * Mathf.Max(Mathf.Abs(scale.x), Mathf.Abs(scale.z));
            float half = Mathf.Max(radius, _capsuleCollider.height * Mathf.Abs(scale.y) * 0.5f);
            Vector3 center = position + Quaternion.Euler(0, transform.eulerAngles.y, 0) * Vector3.Scale(_capsuleCollider.center, scale);
            bottom = center - Vector3.up * (half - radius); top = center + Vector3.up * (half - radius);
        }
        public bool CanStandAt(Vector3 position)
        {
            CapsuleAt(position, out Vector3 bottom, out Vector3 top, out float radius);
            int count = Physics.OverlapCapsuleNonAlloc(bottom, top, radius * 0.92f, _overlaps, ~0, QueryTriggerInteraction.Ignore);
            if (count == _overlaps.Length) return false;
            for (int i = 0; i < count; i++) if (!_overlaps[i].transform.IsChildOf(transform)) return false;
            return true;
        }
        public void OnJumpButtonPressed()
        {
            if (IsRiding) return;
            if (!_isWorking) { MovementRequested?.Invoke(); return; }
            _lastJumpRequestTime = Time.time;
        }
        public void SetMoveJoystick(UltimateJoystick joystick) { _moveJoystick = joystick; }
        public void SetCameraController(CameraController controller) { _cameraController = controller; }
        public void SetCameraYaw(float yaw) { _followCameraYaw = true; _cameraYaw = yaw; }
        public void StopFollowingCameraYaw() { _followCameraYaw = false; }
        public void SetAimYaw(float yaw) { _aiming = true; _aimYaw = yaw; }
        public void StopAiming() { _aiming = false; }
        public void Teleport(Transform destination) { if (destination != null) Teleport(destination.position, destination.rotation); }
        public void Teleport(Vector3 position, Quaternion rotation)
        {
            _moveInput = Vector2.zero;
            _lastJumpRequestTime = _lastGroundedTime = float.NegativeInfinity;
            _isGrounded = false;
            _animationSpeed = _airborneTime = _groundedTime = 0;
            _jumpAnimation = false;
            if (!_rigidbody.isKinematic) { _rigidbody.linearVelocity = Vector3.zero; _rigidbody.angularVelocity = Vector3.zero; }
            _rigidbody.position = position; _rigidbody.rotation = rotation;
            transform.SetPositionAndRotation(position, rotation);
        }
        public void BeginDrive()
        {
            if (IsRiding) return;
            _moveInput = Vector2.zero;
            IsRiding = true;
            gameObject.SetActive(false);
        }

        public void EndDrive(Vector3 position, Quaternion rotation)
        {
            gameObject.SetActive(true);
            IsRiding = false;
            Teleport(position, rotation);
        }

        public void BeginRide(Transform seat, RuntimeAnimatorController rideController)
        {
            if (IsRiding || seat == null) return;
            _originalParent = transform.parent;
            _originalScale = transform.localScale;
            _rigidbody.linearVelocity = Vector3.zero; _rigidbody.angularVelocity = Vector3.zero;
            _rigidbody.interpolation = RigidbodyInterpolation.None;
            _rigidbody.isKinematic = true; _capsuleCollider.enabled = false;
            _moveInput = Vector2.zero; IsRiding = true;
            transform.SetParent(seat, false);
            transform.localPosition = Vector3.zero; transform.localRotation = Quaternion.identity;
            if (_btnJump != null) _btnJump.gameObject.SetActive(false);
            SetDrivingControls(true);
            if (_animator != null && rideController != null)
            {
                _onFootController = _animator.runtimeAnimatorController;
                _animator.runtimeAnimatorController = rideController;
                _animator.Rebind();
                _animator.Update(0);
            }
        }

        public void EndRide(Vector3 position, Quaternion rotation)
        {
            if (!IsRiding) return;
            transform.SetParent(_originalParent, true);
            transform.localScale = _originalScale;
            IsRiding = false; _rigidbody.isKinematic = false;
            ConfigureWalkingPhysics();
            Teleport(position, rotation); _capsuleCollider.enabled = true;
            if (_animator != null && _onFootController != null)
            {
                _animator.runtimeAnimatorController = _onFootController;
                _onFootController = null;
                _animator.Rebind();
                if (_hasSpeed) _animator.SetFloat(_speedParam, 0);
                if (_hasJump) _animator.SetBool(_isJumpParam, false);
                _animator.Update(0);
            }
            if (_btnJump != null) _btnJump.gameObject.SetActive(true);
            SetDrivingControls(false);
        }
    }
}
