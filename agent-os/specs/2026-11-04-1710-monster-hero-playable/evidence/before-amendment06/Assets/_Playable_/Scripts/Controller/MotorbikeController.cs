using UnityEngine;

namespace Playable
{
    [RequireComponent(typeof(Rigidbody), typeof(CapsuleCollider))]
    public class MotorbikeController : MonoBehaviour, IDrivableVehicle
    {
        [Header("Motobike 4 References")]
        [SerializeField] private Transform _visual;
        [SerializeField] private Transform _riderSeat;
        [SerializeField] private Transform _cameraTarget;
        [SerializeField] private Transform[] _wheels;
        [SerializeField] private RuntimeAnimatorController _riderController;
        [SerializeField] private AudioSource _engine;
        [Header("Drive Feel")]
        [SerializeField] private float _maxForwardSpeed = 13f;
        [SerializeField] private float _maxReverseSpeed = 3f;
        [SerializeField] private float _acceleration = 6f;
        [SerializeField] private float _braking = 14f;
        [SerializeField] private float _coastDeceleration = 5f;
        [SerializeField] private float _grip = 22f;
        [SerializeField] private float _wheelBase = 2.15f;
        [SerializeField] private float _lowSpeedSteerAngle = 38f;
        [SerializeField] private float _highSpeedSteerAngle = 15f;
        [SerializeField] private float _steerSmoothTime = 0.14f;
        [SerializeField] private float _leanAngle = 22f;
        [SerializeField] private float _wheelRadius = 0.46f;
        [Header("Ground")]
        [SerializeField] private LayerMask _groundMask = ~0;
        [SerializeField] private float _gravity = 24f;
        [SerializeField, Min(0f)] private float _stepHeight = 0.3f;
        [SerializeField, Min(0f)] private float _lateralGrip = 45f;
        private Rigidbody _body;
        private CapsuleCollider _capsule;
        private PlayerController _rider;
        private Vector2 _input;
        private float _steer, _steerVelocity;
        private bool _exitRequested;
        private Vector3 _groundNormal = Vector3.up;
        private Quaternion _visualRest;
        private PhysicsMaterial _material;
        private readonly RaycastHit[] _hits = new RaycastHit[32];
        private readonly Collider[] _stepOverlaps = new Collider[32];
        public Transform CameraTarget => _cameraTarget != null ? _cameraTarget : transform;
        public float Speed => _body != null ? Vector3.ProjectOnPlane(_body.linearVelocity, Vector3.up).magnitude : 0;
        public float MaxSpeed => _maxForwardSpeed;
        public bool IsDriven => _rider != null;
        public PlayerController Rider => _rider;
        public bool IsGrounded { get; private set; }

        [Header("Engine Sound")]
        [SerializeField, Range(0f, 1f)] private float _engineIdleVolume = 0.18f;
        [SerializeField, Range(0f, 1f)] private float _engineDriveVolume = 0.5f;
        [SerializeField, Range(0.1f, 3f)] private float _engineIdlePitch = 0.85f;
        [SerializeField, Range(0.1f, 3f)] private float _engineDrivePitch = 1.8f;

        private void UpdateEngineSound()
        {
            if (_engine == null || _rider == null) return;
            float load = Mathf.Clamp01(Speed / Mathf.Max(0.1f, _maxForwardSpeed) + Mathf.Abs(_input.y) * 0.25f);
            float blend = 1f - Mathf.Exp(-5f * Time.deltaTime);
            _engine.pitch = Mathf.Lerp(_engine.pitch, Mathf.Lerp(_engineIdlePitch, _engineDrivePitch, load), blend);
            _engine.volume = Mathf.Lerp(_engine.volume, Mathf.Lerp(_engineIdleVolume, _engineDriveVolume, load), blend);
        }

        private void StartEngineSound()
        {
            if (_engine == null || _engine.clip == null) return;
            _engine.loop = true;
            _engine.pitch = _engineIdlePitch;
            _engine.volume = _engineIdleVolume;
            _engine.Play();
        }

        private void Awake()
        {
            _body = GetComponent<Rigidbody>();
            _capsule = GetComponent<CapsuleCollider>();
            _body.mass = 180f;
            _body.useGravity = false;
            _body.isKinematic = true;
#if UNITY_LUNA
            _body.interpolation = RigidbodyInterpolation.Extrapolate;
#else
            _body.interpolation = RigidbodyInterpolation.Interpolate;
#endif
            _body.collisionDetectionMode = CollisionDetectionMode.ContinuousSpeculative;
            // Steering owns yaw; collisions must not add a spin at curb edges.
            _body.constraints = RigidbodyConstraints.FreezeRotation;
            _material = new PhysicsMaterial() { staticFriction = 0, dynamicFriction = 0,
                bounciness = 0, frictionCombine = PhysicsMaterialCombine.Minimum, bounceCombine = PhysicsMaterialCombine.Minimum };
            _capsule.material = _material;
            if (_visual != null) _visualRest = _visual.localRotation;
            if (_engine != null) { _engine.playOnAwake = false; _engine.Stop(); }
        }
        private void Update()
        {
            _input = _rider != null && _rider.IsWorking && !_exitRequested
                ? new Vector2(_rider.ReadSteerInput(), _rider.ReadDriveInput()) : Vector2.zero;
            if (_exitRequested && Speed < 0.5f) TryDismount();
        }
        private bool GroundAt(Vector3 local, out RaycastHit best)
        {
            int count = Physics.RaycastNonAlloc(transform.TransformPoint(local), Vector3.down, _hits, 1.15f,
                _groundMask, QueryTriggerInteraction.Ignore);
            best = default; float distance = float.MaxValue;
            for (int i = 0; i < count; i++)
            {
                var h = _hits[i];
                if (h.collider.transform.IsChildOf(transform) || h.normal.y < 0.55f || h.distance >= distance) continue;
                best = h; distance = h.distance;
            }
            return distance < float.MaxValue;
        }
        private void FixedUpdate()
        {
            if (_rider == null || _body.isKinematic) return;
            bool front = GroundAt(new Vector3(0, 0.65f, _wheelBase * 0.45f), out RaycastHit frontHit);
            bool rear = GroundAt(new Vector3(0, 0.65f, -_wheelBase * 0.45f), out RaycastHit rearHit);
            IsGrounded = front || rear;
            Vector3 normal = front && rear ? (frontHit.normal + rearHit.normal).normalized : front ? frontHit.normal : rear ? rearHit.normal : Vector3.up;
            _groundNormal = Vector3.Slerp(_groundNormal, normal, 1f - Mathf.Exp(-12f * Time.fixedDeltaTime));
            Vector3 velocity = _body.linearVelocity;
            float current = Vector3.Dot(velocity, transform.forward);
            float target = _input.y >= 0 ? _input.y * _maxForwardSpeed : _input.y * _maxReverseSpeed;
            bool reversing = current * target < -0.05f;
            float acceleration = _exitRequested || reversing ? _braking : Mathf.Abs(_input.y) < 0.01f ? _coastDeceleration : _acceleration;
            float speed = Mathf.MoveTowards(current, target, acceleration * Time.fixedDeltaTime);
            float steering = _exitRequested ? 0 : _input.x;
            _steer = Mathf.SmoothDamp(_steer, steering, ref _steerVelocity, _steerSmoothTime, Mathf.Infinity, Time.fixedDeltaTime);
            float angle = Mathf.Lerp(_lowSpeedSteerAngle, _highSpeedSteerAngle, Mathf.Clamp01(Mathf.Abs(current) / _maxForwardSpeed));
            float yawRate = IsGrounded ? Mathf.Clamp(current / _wheelBase * Mathf.Tan(_steer * angle * Mathf.Deg2Rad) * Mathf.Rad2Deg, -110, 110) : 0;
            Quaternion rotation = _body.rotation * Quaternion.Euler(0, yawRate * Time.fixedDeltaTime, 0);
            _body.angularVelocity = Vector3.zero;
            _body.MoveRotation(rotation);
            Vector3 forward = rotation * Vector3.forward;
            // Follow the slope vertically without letting a cross-slope turn the bike sideways.
            Vector3 slopeForward = forward;
            slopeForward.y = -Vector3.Dot(forward, _groundNormal) / Mathf.Max(0.55f, _groundNormal.y);
            Vector3 desired = slopeForward.normalized * speed;
            Vector3 planar = new Vector3(velocity.x, 0, velocity.z);
            if (IsGrounded)
            {
                Vector3 right = rotation * Vector3.right;
                float along = Mathf.MoveTowards(Vector3.Dot(planar, forward), Vector3.Dot(desired, forward), _grip * Time.fixedDeltaTime);
                float sideways = Mathf.MoveTowards(Vector3.Dot(planar, right), 0, _lateralGrip * Time.fixedDeltaTime);
                planar = forward * along + right * sideways;
            }
            // Preserve real collision response and falling velocity. Input cannot accelerate a bike in mid-air.
            float vertical = velocity.y - _gravity * Time.fixedDeltaTime;
            if (IsGrounded) vertical = Mathf.Max(vertical, desired.y - 2f);
            if (IsGrounded && !_exitRequested && Mathf.Abs(_input.y) > 0.01f && Mathf.Abs(speed) > 0.05f)
            {
                if (TryStep(forward * Mathf.Sign(speed), Mathf.Abs(speed))) vertical = Mathf.Max(0, vertical);
            }
            _body.linearVelocity = new Vector3(planar.x, vertical, planar.z);
        }
        private bool TryStep(Vector3 direction, float speed)
        {
            if (_stepHeight <= 0) return false;
            Vector3 scale = transform.lossyScale;
            scale = new Vector3(Mathf.Abs(scale.x), Mathf.Abs(scale.y), Mathf.Abs(scale.z));
            int axis = _capsule.direction;
            float axialScale = axis == 0 ? scale.x : axis == 1 ? scale.y : scale.z;
            float radiusScale = axis == 0 ? Mathf.Max(scale.y, scale.z) : axis == 1 ? Mathf.Max(scale.x, scale.z) : Mathf.Max(scale.x, scale.y);
            float radius = _capsule.radius * radiusScale;
            float halfSegment = Mathf.Max(0, _capsule.height * axialScale * 0.5f - radius);
            Vector3 capsuleAxis = _body.rotation * (axis == 0 ? Vector3.right : axis == 1 ? Vector3.up : Vector3.forward);
            Vector3 center = _body.position + _body.rotation * Vector3.Scale(_capsule.center, scale);
            Vector3 a = center + capsuleAxis * halfSegment;
            Vector3 b = center - capsuleAxis * halfSegment;
            Vector3 feet = center - Vector3.up * (Mathf.Abs(capsuleAxis.y) * halfSegment + radius);
            float reach = Mathf.Abs(Vector3.Dot(capsuleAxis, direction)) * halfSegment + radius + speed * Time.fixedDeltaTime + 0.08f;
            if (!StepRay(feet + Vector3.up * 0.06f, direction, reach, out RaycastHit wall) || wall.normal.y > 0.55f) return false;
            Vector3 sample = feet + direction * (wall.distance + 0.08f) + Vector3.up * (_stepHeight + 0.06f);
            if (!StepRay(sample, Vector3.down, _stepHeight + 0.06f, out RaycastHit top) || top.normal.y < 0.65f) return false;
            float rise = top.point.y - feet.y;
            if (rise < 0.02f || rise > _stepHeight) return false;
            Vector3 lift = Vector3.up * (rise + 0.02f);
            // Check the lift path and the next physics position before stepping.
            int count = Physics.CapsuleCastNonAlloc(a, b, radius * 0.95f, Vector3.up, _hits, lift.y, ~0, QueryTriggerInteraction.Ignore);
            if (count == _hits.Length) return false;
            for (int i = 0; i < count; i++)
                if (!_hits[i].collider.transform.IsChildOf(transform)) return false;
            Vector3 offset = lift + direction * (speed * Time.fixedDeltaTime);
            count = Physics.OverlapCapsuleNonAlloc(a + offset, b + offset, radius, _stepOverlaps, ~0, QueryTriggerInteraction.Ignore);
            if (count == _stepOverlaps.Length) return false;
            for (int i = 0; i < count; i++)
                if (!_stepOverlaps[i].transform.IsChildOf(transform)) return false;
            _body.position += lift;
            return true;
        }
        private bool StepRay(Vector3 origin, Vector3 direction, float distance, out RaycastHit best)
        {
            int count = Physics.RaycastNonAlloc(origin, direction, _hits, distance, _groundMask, QueryTriggerInteraction.Ignore);
            best = default;
            float nearest = float.PositiveInfinity;
            if (count == _hits.Length) return false;
            for (int i = 0; i < count; i++)
            {
                var hit = _hits[i];
                if (hit.collider.transform.IsChildOf(transform) || hit.distance >= nearest) continue;
                best = hit;
                nearest = hit.distance;
            }
            return nearest < float.PositiveInfinity;
        }
        private void LateUpdate()
        {
            float signedSpeed = _body != null ? Vector3.Dot(_body.linearVelocity, transform.forward) : 0;
            if (_visual != null)
            {
                float lean = -_steer * _leanAngle * Mathf.Clamp01(Mathf.Abs(signedSpeed) / 5f) * Mathf.Sign(signedSpeed);
                float pitch = Mathf.Asin(Mathf.Clamp(Vector3.Dot(transform.forward, _groundNormal), -1, 1)) * Mathf.Rad2Deg;
                _visual.localRotation = Quaternion.Slerp(_visual.localRotation, _visualRest * Quaternion.Euler(pitch, 0, lean), 1f - Mathf.Exp(-9f * Time.deltaTime));
            }
            if (_rider != null)
            {
                _rider.transform.localPosition = Vector3.zero;
                _rider.transform.localRotation = Quaternion.identity;
            }
            if (_wheels != null)
                foreach (var wheel in _wheels) if (wheel != null) wheel.Rotate(Vector3.right, signedSpeed / Mathf.Max(0.1f, _wheelRadius) * Mathf.Rad2Deg * Time.deltaTime, Space.Self);
            UpdateEngineSound();
        }
        public bool TryMount(PlayerController player, bool ignoreDistance = false)
        {
            if (_rider != null || player == null || player.IsRiding || !player.IsWorking || _riderSeat == null) return false;
            if (!ignoreDistance && (player.transform.position - transform.position).sqrMagnitude > 25f) return false;
            _rider = player; _exitRequested = false; _steer = _steerVelocity = 0;
            player.BeginRide(_riderSeat, _riderController);
            _body.isKinematic = false;
#if UNITY_LUNA
            _body.collisionDetectionMode = CollisionDetectionMode.ContinuousSpeculative;
#else
            _body.collisionDetectionMode = CollisionDetectionMode.ContinuousDynamic;
#endif
            _body.linearVelocity = Vector3.zero; _body.angularVelocity = Vector3.zero;
            if (player.CameraController != null) player.CameraController.FollowVehicle(this);
            StartEngineSound();
            return true;
        }
        public void RequestDismount() { if (_rider != null) _exitRequested = true; }
        public bool TryDismount()
        {
            if (_rider == null || Speed > 0.6f) return false;
            Vector3[] offsets = { Vector3.right * 1.5f, Vector3.left * 1.5f, Vector3.right * 2f, Vector3.left * 2f };
            foreach (var offset in offsets)
            {
                Vector3 origin = transform.TransformPoint(offset) + Vector3.up * 2f;
                if (!Physics.Raycast(origin, Vector3.down, out RaycastHit hit, 5f, _groundMask, QueryTriggerInteraction.Ignore) || hit.normal.y < 0.65f) continue;
                Vector3 position = hit.point + Vector3.up * 0.06f;
                if (!_rider.CanStandAt(position)) continue;
                ReleaseRider(position);
                return true;
            }
            // No free landing spot: let the player drive to a clear area and try again.
            _exitRequested = false;
            return false;
        }
        private void ReleaseRider(Vector3 position)
        {
            var player = _rider;
            _rider = null; _input = Vector2.zero; _exitRequested = false;
            _body.linearVelocity = Vector3.zero; _body.angularVelocity = Vector3.zero;
            _body.isKinematic = true;
            player.EndRide(position, Quaternion.Euler(0, transform.eulerAngles.y, 0));
            if (player.CameraController != null) player.CameraController.FollowPlayer(player);
            if (_engine != null) _engine.Stop();
        }
        private void OnDisable()
        {
            if (_engine != null) _engine.Stop();
            if (_rider != null) ReleaseRider(transform.position + transform.right * 1.5f + Vector3.up);
        }
        private void OnDestroy() { if (_material != null) Destroy(_material); }
    }
}
