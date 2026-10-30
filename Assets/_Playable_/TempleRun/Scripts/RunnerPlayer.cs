using UnityEngine;

namespace Playable.TempleRun
{
    /// <summary>
    /// 3-lane runner. Movement and collisions are computed in code (AABB vs obstacles),
    /// so it does not depend on PhysX (safe for Luna playables).
    /// Controls: swipe left/right = change lane, swipe up = jump, swipe down = fast fall.
    /// Keyboard (editor): A/D or arrows, Space/W/Up = jump, S/Down = fast fall.
    /// </summary>
    public class RunnerPlayer : MonoBehaviour
    {
        [Header("Refs")]
        public Animator animator;
        [Tooltip("Visual root of the character (scaled/rotated for juice). Must be a child of this object.")]
        public Transform model;
        [Tooltip("Extra yaw for the model if it does not face +Z.")]
        public float modelYaw;

        [Header("Lanes")]
        public float laneOffset = 2.6f;
        [Tooltip("Time to slide to the next lane (smooth damp).")]
        public float laneChangeTime = 0.11f;
        public float maxLaneSpeed = 30f;
        [Tooltip("Body turns toward the side it is moving to.")]
        public float turnYaw = 14f;
        public float leanRoll = 5f;

        [Header("Jump")]
        public float jumpHeight = 1.7f;
        public float gravity = 34f;
        [Tooltip("Gravity multiplier while falling: makes the jump feel snappy.")]
        public float fallGravityMultiplier = 1.35f;
        public float fastFallSpeed = 22f;
        public float jumpBufferTime = 0.15f;
        public float coyoteTime = 0.1f;

        [Header("Body (meters)")]
        public float halfWidth = 0.35f;
        public float height = 1.7f;
        public float halfDepth = 0.3f;
        [Tooltip("How far below an obstacle top the feet can be and still land on it.")]
        public float stepUp = 0.35f;
        public float coinRadius = 0.95f;

        [Header("Juice")]
        public float squashAmount = 0.08f;
        public float squashRecover = 9f;

        [Header("Input")]
        [Tooltip("Swipe distance as a fraction of screen height.")]
        public float swipeThreshold = 0.035f;

        [Header("Animator params")]
        public string runningParam = "Running";
        public string groundedParam = "Grounded";
        public string verticalSpeedParam = "VerticalSpeed";
        public string runSpeedParam = "RunSpeed";
        [Tooltip("Optional legacy params (old controllers).")]
        public string legacySpeedParam = "Speed";
        public string legacyJumpParam = "IsJump";
        [Tooltip("Enable only for an old controller that contains Speed / IsJump parameters.")]
        public bool useLegacyAnimatorParameters;
        [Tooltip("Speed (m/s) at which the run animation plays at 1x.")]
        public float runAnimReferenceSpeed = 9f;

        [HideInInspector] public bool inputEnabled = true;

        public bool IsGrounded { get; private set; }
        public bool IsAlive { get; private set; }
        public bool IsRunning { get; private set; }
        public float Speed => _speed;
        public TrackGenerator Track => _track;

        private TrackGenerator _track;
        private RunnerGameManager _gm;
        private int _lane;
        private int _prevLane;
        private float _vy;
        private float _vx;
        private float _speed;
        private float _jumpBuffer;
        private float _coyote;
        private float _crashTimer;
        private float _squash; // >0 stretch (jump), <0 squash (land)
        private Vector3 _modelBasePos;
        private Vector3 _modelBaseScale = Vector3.one;
        private Quaternion _modelBaseRot = Quaternion.identity;

        private bool _pRunning, _pGrounded, _pVSpeed, _pRunSpeed, _pLegacySpeed, _pLegacyJump;

        // touch / mouse
        private Vector2 _pointerStart;
        private bool _tracking;
        private bool _swipeConsumed;
        private Vector2 _lastPointer;
        private Vector2 _swipeDirection;
        private float _lastPointerMoveTime;
        private const float SwipePause = 0.12f;

        public void Init(TrackGenerator track, RunnerGameManager gm)
        {
            _track = track;
            _gm = gm;
            if (model != null)
            {
                _modelBasePos = model.localPosition;
                _modelBaseScale = model.localScale;
                // keep the import rotation of the model (e.g. Blender axis fix), only add the yaw
                _modelBaseRot = Quaternion.Euler(0f, modelYaw, 0f) * model.localRotation;
                model.localRotation = _modelBaseRot;
            }

            if (animator == null) animator = GetComponentInChildren<Animator>();
            if (animator != null)
            {
                animator.applyRootMotion = false;
                // Luna returns an empty Animator.parameters array. Use the configured
                // controller contract instead; an empty name disables a parameter.
                _pRunning = !string.IsNullOrEmpty(runningParam);
                _pGrounded = !string.IsNullOrEmpty(groundedParam);
                _pVSpeed = !string.IsNullOrEmpty(verticalSpeedParam);
                _pRunSpeed = !string.IsNullOrEmpty(runSpeedParam);
                _pLegacySpeed = useLegacyAnimatorParameters && !string.IsNullOrEmpty(legacySpeedParam);
                _pLegacyJump = useLegacyAnimatorParameters && !string.IsNullOrEmpty(legacyJumpParam);
            }

            Revive();
        }

        public void SetRunning(bool running)
        {
            IsRunning = running;
            UpdateAnimator();
        }

        public void SetSpeed(float speed)
        {
            _speed = speed;
        }

        /// <summary>Puts the player back on the middle lane, standing, alive.</summary>
        public void Revive()
        {
            IsAlive = true;
            IsRunning = false;
            IsGrounded = true;
            _vy = 0f;
            _vx = 0f;
            _lane = 0;
            _prevLane = 0;
            _crashTimer = 0f;
            _squash = 0f;
            _jumpBuffer = 0f;
            _tracking = false;
            _coyote = 0f;
            Vector3 p = transform.position;
            transform.position = new Vector3(0f, 0f, p.z);
            if (model != null)
            {
                model.localPosition = _modelBasePos;
                model.localRotation = _modelBaseRot;
                model.localScale = _modelBaseScale;
            }

            if (animator != null) animator.speed = 1f;
            UpdateAnimator();
        }

        public void ShiftZ(float dz)
        {
            transform.position += new Vector3(0f, 0f, dz);
        }

        private void Update()
        {
            ReadInput();

            if (!IsAlive)
            {
                AnimateCrash();
                return;
            }

            if (IsRunning) Simulate(Mathf.Min(Time.deltaTime, 0.05f));
            UpdateVisuals(Time.deltaTime);
            UpdateAnimator();
        }

        #region Input

        private void ReadInput()
        {
            if (!IsAlive || !IsRunning || !inputEnabled)
            {
                _tracking = false;
                return;
            }
            if (Input.GetMouseButtonDown(0))
            {
                // The first touch only starts the run; it must not also trigger a jump.
                if (_gm != null && _gm.OnPlayerInput())
                {
                    _tracking = false;
                    return;
                }

                _tracking = true;
                _pointerStart = _lastPointer = Input.mousePosition;
                _lastPointerMoveTime = Time.unscaledTime;
                _swipeConsumed = false;
            }

            if (_tracking && Input.GetMouseButton(0))
            {
                ProcessSwipe(Input.mousePosition, Time.unscaledTime, Mathf.Max(1f, Screen.height * swipeThreshold));
            }

            if (Input.GetMouseButtonUp(0))
            {
                _tracking = false;
            }

            bool left = Input.GetKeyDown(KeyCode.LeftArrow) || Input.GetKeyDown(KeyCode.A);
            bool right = Input.GetKeyDown(KeyCode.RightArrow) || Input.GetKeyDown(KeyCode.D);
            bool up = Input.GetKeyDown(KeyCode.UpArrow) || Input.GetKeyDown(KeyCode.W) || Input.GetKeyDown(KeyCode.Space);
            bool down = Input.GetKeyDown(KeyCode.DownArrow) || Input.GetKeyDown(KeyCode.S);
            if (!(left || right || up || down)) return;
            if (_gm != null && _gm.OnPlayerInput()) return;
            if (left) ChangeLane(-1);
            if (right) ChangeLane(1);
            if (up) RequestJump();
            if (down) FastFall();
        }

        private void ProcessSwipe(Vector2 pos, float now, float threshold)
        {
            // A brief pause arms another swipe without requiring a finger release.
            if (_swipeConsumed && now - _lastPointerMoveTime >= SwipePause)
            {
                _swipeConsumed = false;
                _pointerStart = _lastPointer;
            }
            if ((pos - _lastPointer).sqrMagnitude >= 4f)
            {
                _lastPointerMoveTime = now;
                _lastPointer = pos;
            }

            Vector2 delta = pos - _pointerStart;
            if (_swipeConsumed)
            {
                // Track the end of the current stroke; extending it never changes another lane.
                if (Vector2.Dot(delta, _swipeDirection) > 0f)
                {
                    _pointerStart = pos;
                    return;
                }
                // A reverse/perpendicular stroke must pass the full threshold, avoiding jitter.
                if (delta.magnitude < threshold) return;
            }
            if (delta.magnitude < threshold) return;

            bool horizontal = Mathf.Abs(delta.x) > Mathf.Abs(delta.y);
            _swipeDirection = horizontal ? new Vector2(Mathf.Sign(delta.x), 0f) : new Vector2(0f, Mathf.Sign(delta.y));
            _swipeConsumed = true;
            _pointerStart = pos;
            if (horizontal) ChangeLane(delta.x > 0f ? 1 : -1);
            else if (delta.y > 0f) RequestJump();
            else FastFall();
        }

        private void ChangeLane(int dir)
        {
            if (!IsAlive || !IsRunning || !inputEnabled) return;
            int target = Mathf.Clamp(_lane + dir, -1, 1);
            if (target == _lane) return;
            _prevLane = _lane;
            _lane = target;
            if (_gm != null) _gm.OnLaneChangeInput();
        }

        private void RequestJump()
        {
            if (!IsAlive || !IsRunning || !inputEnabled) return;
            _jumpBuffer = jumpBufferTime;
            if (_gm != null) _gm.OnJumpInput();
        }

        private void FastFall()
        {
            if (!IsAlive || !IsRunning || IsGrounded || !inputEnabled) return;
            _vy = Mathf.Min(_vy, -fastFallSpeed);
            _jumpBuffer = 0f;
        }

        #endregion

        #region Simulation

        private void Simulate(float dt)
        {
            if (dt <= 0f) return;
            Vector3 p = transform.position;

            // forward
            p.z += _speed * dt;

            // lateral: critically damped spring toward the lane = smooth start and stop
            float targetX = _lane * laneOffset;
            p.x = Mathf.SmoothDamp(p.x, targetX, ref _vx, laneChangeTime, maxLaneSpeed, dt);
            if (Mathf.Abs(p.x - targetX) < 0.002f)
            {
                p.x = targetX;
                _vx = 0f;
            }

            // jump (buffered input + coyote time)
            _coyote = IsGrounded ? coyoteTime : _coyote - dt;
            if (_jumpBuffer > 0f)
            {
                _jumpBuffer -= dt;
                if (IsGrounded || _coyote > 0f)
                {
                    _vy = Mathf.Sqrt(2f * gravity * jumpHeight);
                    IsGrounded = false;
                    _coyote = 0f;
                    _jumpBuffer = 0f;
                    _squash = 1f;
                    if (_gm != null) _gm.OnPlayerJump();
                }
            }

            // ground = floor (y = 0) or the top of an obstacle we are standing on
            bool wasGrounded = IsGrounded;
            float fallVy = _vy;
            float ground = GroundHeight(p);
            float g = _vy < 0f ? gravity * fallGravityMultiplier : gravity;
            _vy -= g * dt;
            p.y += _vy * dt;
            // Only land while falling (or standing), so jumping next to an obstacle never snaps us onto it.
            if (p.y <= ground && (_vy <= 0f || ground <= 0f))
            {
                p.y = ground;
                _vy = 0f;
                IsGrounded = true;
                if (!wasGrounded)
                {
                    _squash = -Mathf.Clamp01(-fallVy / 14f);
                    if (_gm != null) _gm.OnPlayerLand();
                }
            }
            else
            {
                IsGrounded = false;
            }

            transform.position = p;

            if (_track == null) return;

            // obstacles
            for (int i = 0; i < _track.ActiveObstacles.Count; i++)
            {
                RunnerObstacle ob = _track.ActiveObstacles[i];
                Vector3 mn = ob.Min;
                Vector3 mx = ob.Max;
                if (mx.x <= p.x - halfWidth || mn.x >= p.x + halfWidth) continue;
                if (mx.z <= p.z - halfDepth || mn.z >= p.z + halfDepth) continue;
                // within stepUp of the top we are landing on it / climbing over its edge, not hitting it
                if (mx.y <= p.y + stepUp || mn.y >= p.y + height) continue;

                // Any solid body collision is fatal, including a lateral lane change.
                Crash();
                return;
            }

            // coins (slightly generous radius = feels good)
            float cy = p.y + height * 0.5f;
            for (int i = _track.ActiveCoins.Count - 1; i >= 0; i--)
            {
                RunnerCoin c = _track.ActiveCoins[i];
                Vector3 cp = c.transform.position;
                if (Mathf.Abs(cp.x - p.x) < coinRadius && Mathf.Abs(cp.z - p.z) < coinRadius &&
                    Mathf.Abs(cp.y - cy) < height * 0.5f + 0.45f)
                {
                    _track.CollectCoin(c, transform);
                    if (_gm != null) _gm.OnCoinCollected();
                }
            }
        }

        private float GroundHeight(Vector3 p)
        {
            float ground = 0f;
            if (_track == null) return ground;
            for (int i = 0; i < _track.ActiveObstacles.Count; i++)
            {
                RunnerObstacle ob = _track.ActiveObstacles[i];
                Vector3 mn = ob.Min;
                Vector3 mx = ob.Max;
                if (mx.x <= p.x - halfWidth || mn.x >= p.x + halfWidth) continue;
                if (mx.z <= p.z - halfDepth || mn.z >= p.z + halfDepth) continue;
                if (mx.y <= p.y + stepUp && mx.y > ground) ground = mx.y;
            }

            return ground;
        }

        public void Crash()
        {
            if (!IsAlive) return;
            IsAlive = false;
            IsRunning = false;
            _crashTimer = 0f;
            if (animator != null) animator.speed = 0f;
            if (_gm != null) _gm.OnPlayerCrash();
        }

        #endregion

        #region Visuals

        private void UpdateVisuals(float dt)
        {
            if (model == null) return;

            // turn toward the lateral movement + small roll, eased by the lateral velocity
            float side = Mathf.Clamp(_vx / 12f, -1f, 1f);
            Quaternion juice = Quaternion.Euler(0f, side * turnYaw, -side * leanRoll);
            model.localRotation = Quaternion.Slerp(model.localRotation, juice * _modelBaseRot, 1f - Mathf.Exp(-18f * dt));

            // squash & stretch
            _squash = Mathf.MoveTowards(_squash, 0f, squashRecover * dt * Mathf.Max(0.2f, Mathf.Abs(_squash)));
            float s = _squash * squashAmount;
            model.localScale = new Vector3(_modelBaseScale.x * (1f - s * 0.6f), _modelBaseScale.y * (1f + s), _modelBaseScale.z * (1f - s * 0.6f));
        }

        private void AnimateCrash()
        {
            if (model == null || _crashTimer > 1f) return;
            _crashTimer += Time.deltaTime;
            float t = Mathf.Clamp01(_crashTimer / 0.35f);
            float e = 1f - (1f - t) * (1f - t); // ease out
            // knocked back: fall onto the back
            model.localRotation = Quaternion.Euler(-80f * e, 0f, 0f) * _modelBaseRot;
            model.localPosition = _modelBasePos + new Vector3(0f, 0.25f * Mathf.Sin(t * Mathf.PI), -0.8f * e);
            model.localScale = _modelBaseScale;
            Vector3 p = transform.position;
            if (p.y > 0f)
            {
                p.y = Mathf.Max(GroundHeight(p), p.y - 6f * Time.deltaTime);
                transform.position = p;
            }
        }

        private void UpdateAnimator()
        {
            if (animator == null || !IsAlive) return;
            bool airborne = IsRunning && !IsGrounded;
            if (_pRunning) animator.SetBool(runningParam, IsRunning);
            if (_pGrounded) animator.SetBool(groundedParam, !airborne);
            if (_pVSpeed) animator.SetFloat(verticalSpeedParam, airborne ? _vy : 0f);
            if (_pRunSpeed) animator.SetFloat(runSpeedParam, Mathf.Clamp(_speed / Mathf.Max(1f, runAnimReferenceSpeed), 1f, 1.3f));
            if (_pLegacySpeed) animator.SetFloat(legacySpeedParam, IsRunning ? 1f : 0f);
            if (_pLegacyJump) animator.SetBool(legacyJumpParam, airborne);
        }

        #endregion
    }
}
