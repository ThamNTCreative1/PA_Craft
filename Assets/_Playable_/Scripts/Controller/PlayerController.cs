using System;
using UnityEngine;
using UnityEngine.UI;

namespace Playable
{
    [RequireComponent(typeof(Rigidbody))]
    [RequireComponent(typeof(CapsuleCollider))]
    public class PlayerController : MonoBehaviour
    {
        [SerializeField] private bool _isWorking = true;

        [Header("References")] [SerializeField]
        private Rigidbody _rigidbody;

        [SerializeField] private CapsuleCollider _capsuleCollider;
        [SerializeField] private UltimateJoystick _moveJoystick;
        [SerializeField] private CameraController _cameraController;
        [SerializeField] private Animator _animator;
        [SerializeField] private Animator _animatorHorse;

        [Header("Alternative Player Model")]
        [SerializeField] private Transform _base03Model;
        [SerializeField] private Animator _base03Animator;
        private Transform _defaultModel;
        private Animator _defaultAnimator;

        [Header("Animation")] [SerializeField] private string _speedParam = "Speed";
        [SerializeField] private string _isJumpParam = "isJump";
        [SerializeField] private string _isFlyParam = "isFly";
        [SerializeField] private string _isTransformParam = "isTransform";

        [Header("Input")] [SerializeField] private Button _btnJump;
        [SerializeField] private Button _btnFly;
        [SerializeField] private GameObject _btnFlyUp;
        [SerializeField] private GameObject _btnFlyDown;
        [SerializeField] private Button _btnSpeed;
        [SerializeField] private Button _btnTransform;

        [Tooltip("Chặn double-fire onClick khi 1 lần chạm bắn 2 sự kiện (hay gặp trên WebGL/Luna)")] [SerializeField]
        private float _buttonDebounce = 0.15f;

        [Header("Button Icons")]
        [Tooltip("Image con của ButtonFly. Bỏ trống thì tự lấy Image đầu tiên trong con của nút")]
        [SerializeField]
        private Image _iconFly;

        [SerializeField] private Sprite _iconFlyNormal;
        [SerializeField] private Sprite _iconFlyActive;

        [Tooltip("Image con của ButtonTransform. Bỏ trống thì tự lấy Image đầu tiên trong con của nút")]
        [SerializeField]
        private Image _iconTransform;

        [SerializeField] private Sprite _iconTransformNormal;
        [SerializeField] private Sprite _iconTransformActive;

        [Tooltip("Image con của ButtonSpeed. Bỏ trống thì tự lấy Image đầu tiên trong con của nút")]
        [SerializeField]
        private Image _iconSpeed;

        [SerializeField] private Sprite _iconSpeedNormal;
        [SerializeField] private Sprite _iconSpeedActive;

        [Header("Movement")] [SerializeField] private float _moveSpeed = 4f;
        [SerializeField] private float _rotationSmooth = 12f;
        [SerializeField] private float _airControlMultiplier = 0.6f;
        [SerializeField, Range(0f, 0.5f)] private float _inputDeadZone = 0.1f;

        [Header("Jump")] [SerializeField] private float _jumpHeight = 1.2f;
        [SerializeField] private float _gravity = -20f;
        [SerializeField] private float _coyoteTime = 0.15f;
        [SerializeField] private float _jumpBufferTime = 0.15f;

        [Tooltip(
            "Chặn vận tốc rơi tối đa. Không có clamp thì _verticalVelocity cộng dồn vô hạn khi " +
            "_isGrounded kẹt false (vd ground-check lỗi) -> mỗi step di chuyển xa hơn độ dày collider " +
            "-> Discrete collision bỏ lỡ va chạm -> player xuyên thẳng qua sàn.")]
        [SerializeField]
        private float _maxFallSpeed = 25f;

        [Tooltip("Phải rời đất lâu hơn ngần này mới bật anim jump. Chống nhấp nháy khi chạy qua mấp mô")]
        [SerializeField]
        private float _jumpAnimGrace = 0.12f;

        [Tooltip("Bật khi Animator ĐÃ có transition Run <-> Jump. Tắt thì ép Speed = 0 lúc bay để vào được state Jump")]
        [SerializeField]
        private bool _keepSpeedWhileAirborne = false;

        [Header("Ground Check")] [SerializeField]
        private LayerMask _groundMask = ~0;

        [SerializeField] private float _groundCheckDistance = 0.1f;

        [Header("Physics")]
        [Tooltip("Continuous rất nặng khi va chạm MeshCollider. Player đi 4 m/s thì Discrete là đủ")]
        [SerializeField]
        private bool _useContinuousCollision = false;

        [Tooltip("Đứng yên trên đất thì ngừng ghi velocity để Rigidbody được ngủ")] [SerializeField]
        private bool _allowSleepWhenIdle = true;

        [Header("Fly")] [SerializeField] private float _flyHeight = 2f;
        [SerializeField] private float _flySpeed = 3f;
        [SerializeField] private float _minFlyAboveGround = 0.3f;

        [Tooltip("Giới hạn độ cao bay tối đa, tính từ mặt đất ngay dưới player (giống _minFlyAboveGround " +
                 "nhưng chặn trên). Người chơi giữ nút Fly Up cũng không bay cao hơn mốc này.")]
        [SerializeField]
        private float _maxFlyAboveGround = 15f;

        [SerializeField] private float _flyGroundSampleInterval = 0.1f;

        [Header("Speed Boost")] [SerializeField]
        private float _speedMultiplier = 2f;

        [Header("Transform")] [SerializeField] private GameObject _horse;
        [SerializeField] private Transform _modelPlayer;
        [SerializeField] private Transform _mountPoint;

        private Transform _transform;
        private Vector2 _moveInput;
        private Vector3 _verticalVelocity;
        private bool _isGrounded;
        private int _speedParamHash;
        private int _isJumpParamHash;
        private int _isFlyParamHash;
        private int _isTransformParamHash;
        private bool _hasAnimator;
        private bool _hasHorseAnimator;
        private float _scaledGroundRadius;
        private float _scaledCapsuleHeight;
        private float _groundCheckBottomOffset;
        private float _groundCheckLegacySphereRadius;
        private float _appliedSpeed = -1f;
        private bool _appliedJumpPlayer;
        private bool _appliedJumpHorse;
        private bool _appliedFly;
        private bool _appliedTransform;
        private float _flyGroundHeight;
        private float _flyGroundSampleTime;
        private bool _isFlying;
        private bool _isLanding;
        private bool _flyUp;
        private bool _flyDown;
        private float _coyoteTimer;
        private float _jumpBufferTimer;
        private float _airborneTime;
        private float _flyStartHeight;
        private float _currentFlyHeight;
        private bool _isSpeedBoost;
        private bool _isTakingOff;
        private bool _isTransformed;
        private bool _pendingTransformAfterLanding;
        private bool _followCameraYaw;
        private float _cameraYaw;
        private float _lastFlyPressTime = float.NegativeInfinity;
        private float _lastSpeedPressTime = float.NegativeInfinity;
        private float _lastTransformPressTime = float.NegativeInfinity;
        public bool IsGrounded => _isGrounded;
        public Vector3 Velocity { get; private set; }

        /// <summary>Bắn đúng 1 lần khi player transform (cưỡi ngựa) chuyển từ tắt sang bật.</summary>
        public event Action OnTransformedOn;

        private float CurrentSpeedMultiplier =>
            _isSpeedBoost ? _speedMultiplier : 1f;
        


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
            _defaultModel = _modelPlayer;
            _defaultAnimator = _animator;
            _hasHorseAnimator = _animatorHorse != null;

            if (_hasAnimator)
            {
                _speedParamHash = Animator.StringToHash(_speedParam);
                _isJumpParamHash = Animator.StringToHash(_isJumpParam);
                _isFlyParamHash = Animator.StringToHash(_isFlyParam);
                _isTransformParamHash = Animator.StringToHash(_isTransformParam);
            }

            CacheCapsuleSize();
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
            _groundCheckBottomOffset = (_capsuleCollider.height * 0.5f) - _capsuleCollider.radius;
            _groundCheckLegacySphereRadius = _capsuleCollider.radius * 0.95f;
        }

        // Applied once by MapController at startup, before player input is processed.
        public void SelectPlayerModel(bool useBase03)
        {
            if (_defaultModel == null || (useBase03 && (_base03Model == null || _base03Animator == null)))
            {
                return;
            }

            _defaultModel.gameObject.SetActive(!useBase03);
            if (_base03Model != null)
            {
                _base03Model.gameObject.SetActive(useBase03);
            }

            _modelPlayer = useBase03 ? _base03Model : _defaultModel;
            _animator = useBase03 ? _base03Animator : _defaultAnimator;
            _hasAnimator = _animator != null;
            _appliedSpeed = -1f;
        }

        private void Start()
        {
            if (_btnJump != null) _btnJump.onClick.AddListener(OnJumpButtonPressed);
            if (_btnFly != null) _btnFly.onClick.AddListener(OnFlyButtonPressed);
            if (_btnSpeed != null) _btnSpeed.onClick.AddListener(OnSpeedButtonPressed);
            if (_btnTransform != null)
            {
                _btnTransform.gameObject.SetActive(false);
            }

            if (_horse != null)
            {
                _horse.SetActive(false);
            }

            ResolveIconTargets();
            RefreshFlyIcon();
            RefreshTransformIcon();
            RefreshSpeedIcon();
        }

        /// <summary>
        /// Tự tìm Image icon trong con của nút nếu chưa gán tay trong Inspector.
        /// Bỏ qua Image của chính nút (background) bằng cách chỉ lấy Image nằm ở con.
        /// </summary>
        private void ResolveIconTargets()
        {
            if (_iconFly == null && _btnFly != null)
            {
                _iconFly = FindChildIcon(_btnFly.transform);
            }

            if (_iconTransform == null && _btnTransform != null)
            {
                _iconTransform = FindChildIcon(_btnTransform.transform);
            }

            if (_iconSpeed == null && _btnSpeed != null)
            {
                _iconSpeed = FindChildIcon(_btnSpeed.transform);
            }
        }

        private Image FindChildIcon(Transform buttonTransform)
        {
            Image[] images = buttonTransform.GetComponentsInChildren<Image>(true);

            for (int i = 0; i < images.Length; i++)
            {
                if (images[i].transform != buttonTransform)
                {
                    return images[i];
                }
            }

            return null;
        }

        private void RefreshFlyIcon()
        {
            ApplyIcon(_iconFly, _iconFlyNormal, _iconFlyActive, _isFlying);
        }

        private void RefreshTransformIcon()
        {
            ApplyIcon(_iconTransform, _iconTransformNormal, _iconTransformActive, _isTransformed);
        }

        private void RefreshSpeedIcon()
        {
            ApplyIcon(_iconSpeed, _iconSpeedNormal, _iconSpeedActive, _isSpeedBoost);
        }

        private void ApplyIcon(Image target, Sprite normalSprite, Sprite activeSprite, bool isActive)
        {
            if (target == null)
            {
                return;
            }

            Sprite sprite = isActive ? activeSprite : normalSprite;

            // Gán sprite làm dirty canvas -> chỉ gán khi thật sự đổi.
            if (sprite != null && target.sprite != sprite)
            {
                target.sprite = sprite;
            }
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
            if (_isFlying)
            {
                FlyUpdate();
                return;
            }

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

        public void SetCameraYaw(float yaw)
        {
            _followCameraYaw = true;
            _cameraYaw = yaw;
        }

        public void StopFollowingCameraYaw()
        {
            _followCameraYaw = false;
        }

        private void CheckGround()
        {
            if (_isFlying)
            {
                _isGrounded = false;
                return;
            }

            bool grounded = ProbeGround();

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
            if (_isFlying) return;
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

            if (_followCameraYaw)
            {
                RotateTowards(Quaternion.Euler(0f, _cameraYaw, 0f));
            }

            /*
             * PLAYER ĐỨNG YÊN TRÊN GROUND
             */
            if (!hasInput && _isGrounded && !_isFlying)
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

            if (!_followCameraYaw && hasInput)
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
                (_moveSpeed * CurrentSpeedMultiplier * control);

            Vector3 vel = _rigidbody.linearVelocity;

            vel.x = horizontalMotion.x;
            vel.z = horizontalMotion.z;

            /*
             * VERTICAL
             */
            if (_isFlying)
            {
                vel.y = 0f;
            }
            else if (_isGrounded)
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
        /// Hướng di chuyển ngang theo trục camera (yaw), dùng chung cho đi bộ (Move) và bay ngang
        /// (FlyUpdate). Trả về Vector3.zero nếu input rỗng.
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
            RotateTowards(Quaternion.LookRotation(moveDirection, Vector3.up));
        }

        private void RotateTowards(Quaternion targetRotation)
        {
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
            if (!_hasAnimator)
            {
                return;
            }

            // isJump chỉ bật khi đã rời đất đủ lâu. Chạy nhanh trên map block hay mất tiếp đất
            // 1-2 frame; nếu bật ngay thì Animator liên tục nhảy Run -> Idle -> Jump -> Idle -> Run.
            bool isJumping = !_isFlying && _airborneTime >= _jumpAnimGrace;

            float speed = 0f;

            if (_isGrounded || (_keepSpeedWhileAirborne && !_isFlying))
            {
                Vector3 velocity = Velocity;
                speed = Mathf.Sqrt(velocity.x * velocity.x + velocity.z * velocity.z);
            }

            bool useHorse = _isTransformed && _hasHorseAnimator;

            if (!Mathf.Approximately(speed, _appliedSpeed))
            {
                _appliedSpeed = speed;

                if (useHorse) _animatorHorse.SetFloat(_speedParamHash, speed);
                else _animator.SetFloat(_speedParamHash, speed);
            }

            if (_appliedFly != _isFlying)
            {
                _appliedFly = _isFlying;
                _animator.SetBool(_isFlyParamHash, _isFlying);
            }

            if (_appliedTransform != _isTransformed)
            {
                _appliedTransform = _isTransformed;
                _animator.SetBool(_isTransformParamHash, _isTransformed);
            }

            // _appliedJumpPlayer/_appliedJumpHorse tách riêng vì 2 Animator độc lập - dùng chung 1 biến
            // cache (như trước) sẽ đẩy nhầm giá trị cho animator không active mỗi khi transform đổi
            // animator đích, gây animation isJump kẹt sai trạng thái sau khi transform.
            if (useHorse)
            {
                if (_appliedJumpHorse != isJumping)
                {
                    _appliedJumpHorse = isJumping;
                    _animatorHorse.SetBool(_isJumpParamHash, isJumping);
                }
            }
            else
            {
                if (_appliedJumpPlayer != isJumping)
                {
                    _appliedJumpPlayer = isJumping;
                    _animator.SetBool(_isJumpParamHash, isJumping);
                }
            }
        }

        /// <summary>
        /// Chặn double-fire onClick trên WebGL/WebView (Luna có thể bắn onClick 2 lần cho 1 lần chạm) -
        /// lệnh bấm thứ 2 đến trong vòng _buttonDebounce giây kể từ lệnh trước sẽ bị bỏ qua.
        /// </summary>
        private bool TryConsumeButtonPress(ref float lastPressTime)
        {
            float now = Time.unscaledTime;

            if (now - lastPressTime < _buttonDebounce)
            {
                return false;
            }

            lastPressTime = now;
            return true;
        }

        private void OnFlyButtonPressed()
        {
            if (!_isWorking) return;
            if (!TryConsumeButtonPress(ref _lastFlyPressTime)) return;

            ToggleFly();
        }

        private void OnSpeedButtonPressed()
        {
            if (!_isWorking) return;
            if (!TryConsumeButtonPress(ref _lastSpeedPressTime)) return;

            ToggleSpeed();
        }

        private void OnTransformButtonPressed()
        {
            if (!_isWorking) return;
            if (!TryConsumeButtonPress(ref _lastTransformPressTime)) return;

            ToggleTransform();
        }

        private void ToggleFly()
        {
            // Đang giữa quá trình hạ cánh thì bỏ qua - bấm lại lúc này sẽ bị hiểu nhầm.
            if (_isLanding)
            {
                return;
            }

            if (_isFlying)
            {
                // Bắt đầu hạ cánh - GIỮ _isFlying = true để FixedUpdate() tiếp tục gọi FlyUpdate() xử
                // lý _isLanding mỗi step. Trước đây set _isFlying = false ngay tại đây khiến
                // FixedUpdate không bao giờ gọi lại FlyUpdate() nữa - toàn bộ logic hạ cánh mượt (snap
                // xuống đất, phục hồi gravity, refresh icon, transform sau khi hạ cánh) thành dead code,
                // player chỉ rơi bằng gravity/Move() bình thường thay vì đi đúng qua luồng landing.
                _isLanding = true;

                _flyUp = false;
                _flyDown = false;
                _btnFlyUp.SetActive(false);
                _btnFlyDown.SetActive(false);
                _btnJump.gameObject.SetActive(true);

                return;
            }

            // Bắt đầu cất cánh. Untransform TRƯỚC khi set _isFlying = true - ToggleTransform() có guard
            // chặn chạy lúc đang fly, nên phải gọi trong khi _isFlying vẫn còn false để dismount được.
            if (_isTransformed) ToggleTransform();

            _isFlying = true;
            _isTakingOff = true;
            _isLanding = false;

            _flyStartHeight = _transform.position.y;
            _currentFlyHeight = _flyStartHeight;
            _flyGroundSampleTime = 0f;

            // Zero velocity + tắt gravity trước khi FlyUpdate() bắt đầu ép vị trí bằng MovePosition -
            // nếu không, gravity vẫn tích luỹ vận tốc rơi cho Rigidbody mỗi step, giành quyền set vị trí
            // với MovePosition cùng lúc và gây rung. Bật lại useGravity khi hạ cánh xong.
            _rigidbody.linearVelocity = Vector3.zero;
            _rigidbody.useGravity = false;

            _btnFlyUp.SetActive(true);
            _btnFlyDown.SetActive(true);
            _btnJump.gameObject.SetActive(false);

            RefreshFlyIcon();
        }

        private void FlyUpdate()
        {
            float flySpeed = _flySpeed * CurrentSpeedMultiplier;

            if (_isLanding)
            {
                // Dùng chung raycast throttle (_flyGroundSampleInterval) với lúc bay ngang thay vì
                // bắn tia mới mỗi FixedUpdate - landing kéo dài vài trăm ms, không cần độ chính xác
                // từng frame.
                if (TryGetFlyGroundHeight(out float groundHeight))
                {
                    // Mathf.Max trước đây chỉ chặn không cho xuống dưới mặt đất, không thực sự hạ dần
                    // xuống - _currentFlyHeight sẽ đứng yên mãi (không bao giờ chạm đất), khiến toàn bộ
                    // luồng hạ cánh treo lơ lửng vô thời hạn. Dùng MoveTowards giống hệt cách _isTakingOff
                    // leo lên, để hạ dần đúng tốc độ flySpeed.
                    _currentFlyHeight = Mathf.MoveTowards(
                        _currentFlyHeight,
                        groundHeight,
                        flySpeed * Time.fixedDeltaTime);

                    if (Mathf.Abs(_currentFlyHeight - groundHeight) <= 0.02f)
                    {
                        _currentFlyHeight = groundHeight;

                        _isFlying = false;
                        _isLanding = false;

                        _verticalVelocity.y = 0f;

                        // Trả lại gravity cho ApplyGravity()/Move() xử lý bình thường sau khi hạ cánh, và
                        // đồng bộ icon Fly - trước đây thiếu dòng dưới nên hạ cánh tự động không refresh
                        // icon, icon kẹt ở trạng thái "đang bay".
                        _rigidbody.useGravity = true;

                        RefreshFlyIcon();

                        // Bấm Transform lúc đang fly không transform ngay - ToggleTransform() đặt cờ này
                        // và trigger hạ cánh; giờ đã chạm đất (_isFlying vừa về false) nên transform thật.
                        if (_pendingTransformAfterLanding)
                        {
                            _pendingTransformAfterLanding = false;
                            ToggleTransform();
                        }
                    }
                }
            }
            else
            {
                if (_isTakingOff)
                {
                    // Clamp target cất cánh theo _maxFlyAboveGround - phòng trường hợp _flyHeight được
                    // set cao hơn giới hạn bay cho phép.
                    float target = _flyStartHeight + Mathf.Min(_flyHeight, _maxFlyAboveGround);

                    _currentFlyHeight = Mathf.MoveTowards(
                        _currentFlyHeight,
                        target,
                        flySpeed * Time.fixedDeltaTime);

                    if (Mathf.Abs(_currentFlyHeight - target) < 0.02f)
                    {
                        _currentFlyHeight = target;
                        _isTakingOff = false;
                    }
                }
                else
                {
                    if (_flyUp)
                        _currentFlyHeight += flySpeed * Time.fixedDeltaTime;

                    if (_flyDown)
                        _currentFlyHeight -= flySpeed * Time.fixedDeltaTime;

                    if (TryGetFlyGroundHeight(out float groundHeight))
                    {
                        float minAllowedHeight = groundHeight + _minFlyAboveGround;
                        float maxAllowedHeight = groundHeight + _maxFlyAboveGround;

                        _currentFlyHeight = Mathf.Clamp(_currentFlyHeight, minAllowedHeight, maxAllowedHeight);
                    }
                }
            }

            /*
             * BAY NGANG - dùng chung hướng tính theo camera với lúc đi bộ (ComputeMoveDirection), cùng
             * tốc độ với bay dọc (flySpeed) để không cần thêm tham số tốc độ ngang riêng cho fly.
             */
            Vector3 moveDirection = ComputeMoveDirection(_moveInput);

            if (_followCameraYaw)
            {
                RotateTowards(Quaternion.Euler(0f, _cameraYaw, 0f));
            }
            else if (moveDirection.sqrMagnitude > 0.0001f)
            {
                RotateTowards(moveDirection);
            }

            Vector3 position = _rigidbody.position;
            position += moveDirection * flySpeed * Time.fixedDeltaTime;
            position.y = _currentFlyHeight;

            _rigidbody.MovePosition(position);

            _verticalVelocity.y = 0f;
        }

        /// <summary>
        /// Lấy cao độ mặt đất khi bay. Chỉ raycast lại mỗi _flyGroundSampleInterval giây
        /// thay vì mỗi FixedUpdate (50 lần/giây).
        /// </summary>
        private bool TryGetFlyGroundHeight(out float groundHeight)
        {
            if (Time.time < _flyGroundSampleTime)
            {
                groundHeight = _flyGroundHeight;
                return true;
            }

            if (Physics.Raycast(
                    _transform.position,
                    Vector3.down,
                    out RaycastHit hit,
                    100f,
                    _groundMask,
                    QueryTriggerInteraction.Ignore))
            {
                _flyGroundHeight = hit.point.y;
                _flyGroundSampleTime = Time.time + _flyGroundSampleInterval;

                groundHeight = _flyGroundHeight;
                return true;
            }

            groundHeight = 0f;
            return false;
        }

        public void OnFlyUpDown()
        {
            _flyUp = true;
        }

        public void OnFlyUpUp()
        {
            _flyUp = false;
        }

        public void OnFlyDownDown()
        {
            _flyDown = true;
        }

        public void OnFlyDownUp()
        {
            _flyDown = false;
        }

        private void ToggleSpeed()
        {
            _isSpeedBoost = !_isSpeedBoost;
            RefreshSpeedIcon();
        }

        private void ToggleTransform()
        {
            // Đang bay thì không transform ngay - phải hạ cánh trước (đổi model tức thì nhưng độ cao
            // bay đổi dần dần sẽ lệch pha). Đặt cờ để FlyUpdate() tự gọi lại ToggleTransform() thật ngay
            // khi chạm đất (_isFlying đã về false lúc đó). ToggleFly() tự no-op nếu đã đang hạ cánh rồi.
            if (_isFlying)
            {
                _pendingTransformAfterLanding = true;
                ToggleFly();
                return;
            }

            _isTransformed = !_isTransformed;

            // Đổi animator đích -> ép đẩy lại Speed ở frame kế tiếp. isJump không cần ép vì
            // _appliedJumpPlayer/_appliedJumpHorse đã tách riêng theo từng animator, mỗi animator tự
            // giữ đúng lịch sử của nó.
            _appliedSpeed = -1f;

            RefreshTransformIcon();

            if (_isTransformed)
            {
                _horse.SetActive(true);
                _horse.transform.localPosition = Vector3.zero;

                _modelPlayer.SetParent(_mountPoint);

                _modelPlayer.localPosition = Vector3.zero;
                _modelPlayer.localRotation = Quaternion.identity;

                OnTransformedOn?.Invoke();
            }
            else
            {
                _modelPlayer.SetParent(transform);
                _modelPlayer.localPosition = Vector3.zero;
                _modelPlayer.localRotation = Quaternion.identity;
                _horse.SetActive(false);
            }
        }

    }
}
