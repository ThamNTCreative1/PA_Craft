using UnityEngine;
using UnityEngine.UI;

namespace Playable
{
    [RequireComponent(typeof(Rigidbody))]
    [RequireComponent(typeof(CapsuleCollider))]
    public class PlayerController : MonoBehaviour
    {
        [SerializeField] private bool _isWorking = true;
        [Header("References")]
        [SerializeField] private Rigidbody _rigidbody;
        [SerializeField] private CapsuleCollider _capsuleCollider;
        [SerializeField] private UltimateJoystick _moveJoystick;
        [SerializeField] private CameraController _cameraController;
        [SerializeField] private Animator _animator;

        [Header("Animation")]
        [Tooltip("Animator state names (no Animator parameters: states are played directly with Animator.Play).")]
        [SerializeField] private string _idleState = "Idle";
        [SerializeField] private string _runState = "Run";
        [SerializeField] private string _jumpState = "Jump";
        [SerializeField, Min(0f)] private float _runThreshold = 0.1f;

        [Header("Input")]
        [SerializeField] private Button _btnJump;

        [Header("Movement")]
        [SerializeField] private float _moveSpeed = 4f;
        public float MoveSpeed { get => _moveSpeed; set => _moveSpeed = value; }
        /// <summary>True while the joystick (or keyboard in the editor) is pushed.</summary>
        public bool HasMoveInput => _moveInput != Vector2.zero;
        [SerializeField] private float _rotationSmooth = 12f;
        [SerializeField] private float _airControlMultiplier = 0.6f;
        [SerializeField, Range(0f, 0.5f)] private float _inputDeadZone = 0.1f;

        [Header("Jump")]
        [SerializeField] private float _jumpHeight = 1.2f;
        [SerializeField] private float _gravity = -20f;
        [SerializeField] private float _coyoteTime = 0.15f;
        [SerializeField] private float _jumpBufferTime = 0.15f;
        [SerializeField] private float _maxFallSpeed = 25f;
        [SerializeField] private float _jumpAnimGrace = 0.12f;
        [SerializeField] private bool _keepSpeedWhileAirborne = false;

        [Header("Ground Check")]
        [SerializeField] private LayerMask _groundMask = ~0;
        [SerializeField] private float _groundCheckDistance = 0.1f;

        [Header("Physics")]
        [SerializeField] private bool _useContinuousCollision = false;
        [SerializeField] private bool _allowSleepWhenIdle = true;

        private Transform _transform;
        private Vector2 _moveInput;
        private Vector3 _verticalVelocity;
        private bool _isGrounded;
        private string _currentState;
        private bool _hasAnimator;
        private float _scaledGroundRadius;
        private float _scaledCapsuleHeight;
        private float _coyoteTimer;
        private float _jumpBufferTimer;
        private float _airborneTime;

        public bool IsGrounded => _isGrounded;
        public bool IsCarryingEgg { get; private set; }
        public Vector3 Velocity { get; private set; }
        public bool IsWorking
        {
            get => _isWorking;
            set => _isWorking = value;
        }

        private void Awake()
        {
            _transform = transform;

            if (_rigidbody == null)
            {
                _rigidbody = GetComponent<Rigidbody>();
            }

            if (_capsuleCollider == null)
            {
                _capsuleCollider = GetComponent<CapsuleCollider>();
            }

            _rigidbody.useGravity = true;
            _rigidbody.interpolation = RigidbodyInterpolation.Interpolate;
            _rigidbody.collisionDetectionMode = _useContinuousCollision
                ? CollisionDetectionMode.Continuous
                : CollisionDetectionMode.Discrete;
            _rigidbody.constraints = RigidbodyConstraints.FreezeRotation;

            if (_animator == null)
            {
                _animator = GetComponentInChildren<Animator>();
            }

            _hasAnimator = _animator != null;

            CacheCapsuleSize();
        }

        public void SetCarryingEgg(bool isCarrying)
        {
            IsCarryingEgg = isCarrying;
        }

        public void ResetPlayer(Vector3 position, Quaternion rotation)
        {
            SetCarryingEgg(false);
            _moveInput = Vector2.zero;
            _verticalVelocity = Vector3.zero;
            Velocity = Vector3.zero;
            _jumpBufferTimer = 0f;
            _coyoteTimer = 0f;
            _airborneTime = 0f;

            _rigidbody.useGravity = true;
            _rigidbody.linearVelocity = Vector3.zero;
            _rigidbody.angularVelocity = Vector3.zero;
            _isGrounded = false;
            _rigidbody.position = position;
            _rigidbody.rotation = rotation;
            // Update the follow anchor immediately before the camera reads it.
            _transform.SetPositionAndRotation(position, rotation);
            _rigidbody.Sleep();

            if (_btnJump != null) _btnJump.gameObject.SetActive(true);

            UpdateAnimator();
            if (_cameraController != null) _cameraController.SetTarget(this);
        }


        /// <summary>
        /// Scale của player không đổi lúc chạy nên tính sẵn 1 lần, khỏi đọc lossyScale mỗi FixedUpdate.
        /// </summary>
        private void CacheCapsuleSize()
        {
            Vector3 scale = _transform.lossyScale;

            _scaledGroundRadius = _capsuleCollider.radius * Mathf.Max(scale.x, scale.z);
            _scaledCapsuleHeight = _capsuleCollider.height * scale.y;

            // Cache trước để ProbeGround() khỏi đọc property + tính lại phép trừ/nhân mỗi FixedUpdate.
        }

        private void OnEnable()
        {
            if (_btnJump != null) _btnJump.onClick.AddListener(OnJumpButtonPressed);
        }

        private void OnDisable()
        {
            if (_btnJump != null) _btnJump.onClick.RemoveListener(OnJumpButtonPressed);
        }

        private void Update()
        {
            if (!_isWorking) return;
#if UNITY_EDITOR
            if (Input.GetKeyDown(KeyCode.Space))
            {
                OnJumpButtonPressed();
            }
#endif

            _moveInput = _moveJoystick != null
                ? new Vector2(_moveJoystick.HorizontalAxis, _moveJoystick.VerticalAxis)
                : Vector2.zero;

            if (_moveInput.sqrMagnitude < _inputDeadZone * _inputDeadZone)
            {
                _moveInput = Vector2.zero;
            }

#if UNITY_EDITOR
            _moveInput = ApplyEditorKeyboardInput(_moveInput);
#endif

            UpdateAnimator();
        }

        private void FixedUpdate()
        {
            if (!_isWorking) return;

            CheckGround();

            HandleJump();

            ApplyGravity();

            Move(_moveInput);
        }

#if UNITY_EDITOR
        private Vector2 ApplyEditorKeyboardInput(Vector2 moveInput)
        {
            Vector2 keyboardInput = new Vector2(
                Input.GetAxisRaw("Horizontal"),
                Input.GetAxisRaw("Vertical"));

            if (keyboardInput.sqrMagnitude > 0.0001f)
            {
                moveInput = keyboardInput;
            }

            return moveInput;
        }
#endif

        public void OnJumpButtonPressed()
        {
            if (!_isWorking) return;
            _jumpBufferTimer = _jumpBufferTime;
        }

        public void SetMoveJoystick(UltimateJoystick joystick)
        {
            _moveJoystick = joystick;
        }

        public void SetCameraController(CameraController cameraController)
        {
            _cameraController = cameraController;
        }

        private void CheckGround()
        {

            bool grounded = _verticalVelocity.y <= 0f && ProbeGround();

            if (grounded)
            {
                _coyoteTimer = _coyoteTime;
                _airborneTime = 0f;

                if (_verticalVelocity.y < 0f)
                {
                    _verticalVelocity.y = 0f;
                }
            }
            else
            {
                _coyoteTimer -= Time.fixedDeltaTime;
                _airborneTime += Time.fixedDeltaTime;
            }

            _isGrounded = grounded;
        }


        private bool ProbeGround()
        {
            Vector3 center = _transform.TransformPoint(_capsuleCollider.center);

            float bottom =
                _scaledCapsuleHeight * 0.5f -
                _scaledGroundRadius;

            Vector3 origin =
                center +
                Vector3.down * bottom +
                Vector3.up * 0.02f;

            float radius = _scaledGroundRadius * 0.85f;

            // Nới quãng dò theo vận tốc rơi hiện tại - 1 step rơi nhanh (frame bị giật trên máy yếu) có
            // thể đi xa hơn quãng dò cố định, khiến sphere-cast bỏ lỡ sàn và player xuyên sàn.
            float fallDistanceThisStep = Mathf.Max(0f, -_verticalVelocity.y) * Time.fixedDeltaTime;
            float probeDistance = _groundCheckDistance + 0.05f + fallDistanceThisStep;

            return Physics.SphereCast(
                origin,
                radius,
                Vector3.down,
                out _,
                probeDistance,
                _groundMask,
                QueryTriggerInteraction.Ignore
            );
        }

        private void HandleJump()
        {
            _jumpBufferTimer -= Time.fixedDeltaTime;

            if (_jumpBufferTimer <= 0f)
                return;

            if (_coyoteTimer <= 0f)
                return;

            _jumpBufferTimer = 0f;
            _coyoteTimer = 0f;

            _verticalVelocity.y = Mathf.Sqrt(_jumpHeight * -2f * _gravity);

            _isGrounded = false;

            _airborneTime = _jumpAnimGrace;
        }

        private void Move(Vector2 input)
        {
            bool hasInput = input.sqrMagnitude > 0.0001f;

            /*
             * PLAYER ĐỨNG YÊN TRÊN GROUND
             */
            if (!hasInput && _isGrounded)
            {
                Vector3 velocity = _rigidbody.linearVelocity;

                bool alreadyAtRest = velocity.x == 0f && velocity.z == 0f && velocity.y == 0f;

                // Đã đứng yên đúng ý (ngang = 0, y = 0 hệt) thì khỏi ghi lại linearVelocity - để
                // Rigidbody được PhysX tự đưa vào trạng thái sleep thay vì bị "chạm" mỗi FixedUpdate.
                // Dùng == 0f (không phải >= 0f) để dư chấn va gờ địa hình (vel.y dương) không bị hiểu
                // nhầm là "đã nghỉ" rồi bỏ qua việc dọn - xem giải thích ở nhánh dưới.
                if (_allowSleepWhenIdle && alreadyAtRest)
                {
                    Velocity = velocity;
                    return;
                }

                velocity.x = 0f;
                velocity.z = 0f;

                // Ép vel.y = 0 vô điều kiện (không chỉ clamp âm) - đang grounded thật (không phải đang
                // nhảy, vì nhảy luôn set _isGrounded = false ngay) thì không có lý do giữ lại vận tốc
                // dọc nào. Trước đây chỉ clamp âm nên vận tốc dương do va gờ địa hình (Capsule/Discrete
                // vs Mesh Collider hay bị) không được triệt tiêu, gây hiện tượng bật nảy khi di chuyển.
                velocity.y = 0f;

                _rigidbody.linearVelocity = velocity;

                Velocity = velocity;

                return;
            }

            /*
             * TÍNH HƯỚNG DI CHUYỂN
             */
            Vector3 moveDirection = ComputeMoveDirection(input);

            if (hasInput)
            {
                RotateTowards(moveDirection);
            }

            /*
             * AIR CONTROL
             */
            float control =
                _isGrounded
                    ? 1f
                    : _airControlMultiplier;

            Vector3 horizontalMotion =
                moveDirection *
                (_moveSpeed * control);

            Vector3 vel = _rigidbody.linearVelocity;

            vel.x = horizontalMotion.x;
            vel.z = horizontalMotion.z;

            /*
             * VERTICAL
             */
            if (_isGrounded)
            {
                // Ép về 0 vô điều kiện - xem giải thích ở nhánh "PLAYER ĐỨNG YÊN TRÊN GROUND" phía trên,
                // cùng lý do: trước đây chỉ clamp âm nên vận tốc dương do va gờ địa hình gây bật nảy.
                vel.y = 0f;
            }
            else
            {
                vel.y = _verticalVelocity.y;
            }

            _rigidbody.linearVelocity = vel;

            Velocity = vel;
        }

        /// <summary>
        /// Hướng di chuyển ngang theo góc quay của camera.
        /// </summary>
        private Vector3 ComputeMoveDirection(Vector2 input)
        {
            if (input.sqrMagnitude <= 0.0001f)
            {
                return Vector3.zero;
            }

            Transform yawPivot =
                _cameraController != null
                    ? _cameraController.YawPivot
                    : null;

            Vector3 forward =
                yawPivot != null
                    ? yawPivot.forward
                    : _transform.forward;

            Vector3 right =
                yawPivot != null
                    ? yawPivot.right
                    : _transform.right;

            forward.y = 0f;
            right.y = 0f;

            forward.Normalize();
            right.Normalize();

            Vector3 moveDirection =
                forward * input.y +
                right * input.x;

            if (moveDirection.sqrMagnitude > 1f)
            {
                moveDirection.Normalize();
            }

            return moveDirection;
        }

        private void RotateTowards(Vector3 moveDirection)
        {
            Quaternion targetRotation = Quaternion.LookRotation(moveDirection, Vector3.up);
            Quaternion smoothedRotation = Quaternion.Slerp(
                _rigidbody.rotation,
                targetRotation,
                Time.fixedDeltaTime * _rotationSmooth);

            _rigidbody.MoveRotation(smoothedRotation);
        }

        private void ApplyGravity()
        {
            if (_isGrounded)
            {
                _verticalVelocity.y = 0f;
                return;
            }

            _verticalVelocity.y +=
                _gravity * Time.fixedDeltaTime;

            _verticalVelocity.y =
                Mathf.Max(
                    _verticalVelocity.y,
                    -_maxFallSpeed
                );
        }

        /// <summary>
        /// Chỉ đẩy param xuống Animator khi giá trị thật sự đổi - mỗi lệnh Set* là 1 lần gọi native.
        /// </summary>
        private void UpdateAnimator()
        {
            if (!_hasAnimator) return;
            bool isJumping = !_isGrounded && _airborneTime >= _jumpAnimGrace;
            float speed = (_isGrounded || _keepSpeedWhileAirborne)
                ? new Vector2(Velocity.x, Velocity.z).magnitude : 0f;
            string state = isJumping ? _jumpState : speed > _runThreshold ? _runState : _idleState;
            if (state == _currentState || string.IsNullOrEmpty(state)) return;
            _currentState = state;
            _animator.Play(state, 0, 0f);
        }
    }
}
