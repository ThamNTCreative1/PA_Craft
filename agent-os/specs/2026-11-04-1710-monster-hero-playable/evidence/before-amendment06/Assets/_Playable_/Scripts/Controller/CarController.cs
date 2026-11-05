using UnityEngine;
using UnityEngine.UI;

namespace Playable
{
    [RequireComponent(typeof(Rigidbody))]
    public class CarController : MonoBehaviour, IDrivableVehicle
    {
        [SerializeField] private Rigidbody _body;
        [SerializeField] private Collider _bodyCollider;
        [SerializeField] private Transform _cameraTarget;
        [SerializeField] private Transform[] _wheels;
        [SerializeField] private WheelCollider[] _wheelColliders;
        [SerializeField] private SphereCollider[] _wheelContacts;
        [SerializeField] private GameController _gameController;
        [SerializeField] private Button _exitButton;
        [SerializeField] private DriveHoldButton _forwardButton, _reverseButton, _leftButton, _rightButton, _handbrakeButton;
        [SerializeField] private TouchController _carTouchpad;
        [SerializeField] private TouchController _walkingTouchpad;
        [Header("Drive Feel")]
        [SerializeField] private float _maxForwardSpeed = 13f;
        [SerializeField] private float _maxReverseSpeed = 3f;
        [SerializeField] private float _acceleration = 6f;
        [SerializeField] private float _braking = 14f;
        [SerializeField] private float _coastDeceleration = 5f;
        [SerializeField] private float _handbrakeDeceleration = 24f;
        [SerializeField] private float _lateralGrip = 45f;
        [SerializeField] private float _wheelBase = 2.6f;
        [SerializeField] private float _lowSpeedSteerAngle = 35f;
        [SerializeField] private float _highSpeedSteerAngle = 14f;
        [SerializeField] private float _steerSmoothTime = 0.14f;
        [SerializeField] private float _wheelRadius = 0.4f;
        [SerializeField] private LayerMask _groundMask = ~0;
        [Header("Suspension")]
        [SerializeField, Min(0.01f)] private float _suspensionTravel = 0.22f;
        [SerializeField, Min(1f)] private float _springStrength = 35000f;
        [SerializeField, Min(0f)] private float _springDamper = 4500f;
        [Header("Curb Assistance")]
        [SerializeField, Min(0f)] private float _stepHeight = 0.6f;
        private readonly bool[] _assisting = new bool[4];
        private readonly float[] _supportHeight = new float[4];
        private readonly Vector3[] _ledgePoints = new Vector3[4];
        private readonly RaycastHit[] _curbHits = new RaycastHit[32];
        private Vector3 _assistDirection;
        private BoxCollider _chassis;
        [SerializeField] private bool _logDriveDiagnostics;
        private float _nextDiagnosticLogTime;
        private readonly Quaternion[] _wheelMeshOffsets = new Quaternion[4];
        private PlayerController _rider;
        private PhysicsMaterial _material;
        private Vector2 _input;
        private float _steer, _steerVelocity;
        private bool _exitRequested, _handbrake;
        public Transform CameraTarget => _cameraTarget;
        public float Speed => _body != null ? Vector3.ProjectOnPlane(_body.linearVelocity, Vector3.up).magnitude : 0;
        public float MaxSpeed => _maxForwardSpeed;
        public bool IsDriven => _rider != null;
        public PlayerController Rider => _rider;
        public bool IsGrounded { get; private set; }

        [Header("Engine Sound")]
        [SerializeField] private AudioSource _engine;
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
            if (_engine != null) { _engine.playOnAwake = false; _engine.Stop(); }
            if (_body == null) _body = GetComponent<Rigidbody>();
            _chassis = _bodyCollider as BoxCollider;
            _body.mass = 1000f;
            _body.useGravity = true;
            _body.isKinematic = true;
#if UNITY_LUNA
            _body.interpolation = RigidbodyInterpolation.Extrapolate;
#else
            _body.interpolation = RigidbodyInterpolation.Interpolate;
#endif
            _body.collisionDetectionMode = CollisionDetectionMode.ContinuousSpeculative;
            _body.constraints = RigidbodyConstraints.None;
            _body.angularDamping = 2f;
            _body.centerOfMass = new Vector3(0, 0.35f, 0);
#if !UNITY_LUNA
            // Luna does not expose this Rigidbody property.
            _body.maxDepenetrationVelocity = 1f;
#endif
            _material = new PhysicsMaterial
            {
                staticFriction = 0,
                dynamicFriction = 0,
                bounciness = 0,
                frictionCombine = PhysicsMaterialCombine.Minimum,
                bounceCombine = PhysicsMaterialCombine.Minimum
            };
            if (_bodyCollider != null) _bodyCollider.material = _material;
            if (!ConfigureWheels()) { enabled = false; return; }
            if (_exitButton != null) _exitButton.onClick.AddListener(RequestDismount);
            if (_bodyCollider == null || _cameraTarget == null || _gameController == null ||
                _forwardButton == null || _reverseButton == null || _leftButton == null ||
                _rightButton == null || _handbrakeButton == null || _exitButton == null ||
                _carTouchpad == null || _walkingTouchpad == null)
            {
                Debug.LogError("CarController requires body, camera target, GameController, five hold buttons, Exit and both touchpads.", this);
                enabled = false;
            }
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

        private void Update()
        {
            _input = Vector2.zero;
            _handbrake = false;
            if (_rider != null && _rider.IsWorking)
            {
                // A pending Out request must not prevent driving away from a blocked landing spot.
                _input.y = ReadDriveInput();
                _input.x = (_rightButton.IsHeld ? 1f : 0f) - (_leftButton.IsHeld ? 1f : 0f);
                _handbrake = _handbrakeButton.IsHeld;
#if UNITY_EDITOR || UNITY_STANDALONE
                if (Input.GetKey(KeyCode.A) || Input.GetKey(KeyCode.D))
                    _input.x = (Input.GetKey(KeyCode.D) ? 1f : 0f) - (Input.GetKey(KeyCode.A) ? 1f : 0f);
                _handbrake |= Input.GetKey(KeyCode.Space);
#endif
            }
            if (_exitRequested && Speed < 0.5f) TryDismount();
            UpdateEngineSound();
        }
        private bool ConfigureWheels()
        {
            if (_wheels == null || _wheels.Length != 4 || _wheelColliders == null || _wheelColliders.Length != 4 ||
                _wheelContacts == null || _wheelContacts.Length != 4)
            {
                Debug.LogError("CarController requires four wheel visuals, WheelColliders and rounded contacts.", this);
                return false;
            }
            for (int i = 0; i < 4; i++)
            {
                if (_wheels[i] == null || _wheelColliders[i] == null || _wheelContacts[i] == null)
                {
                    Debug.LogError("CarController has an unassigned wheel reference.", this);
                    return false;
                }
                var wheel = _wheelColliders[i];
                wheel.radius = _wheelRadius;
                wheel.suspensionDistance = _suspensionTravel;
                wheel.suspensionSpring = new JointSpring
                {
                    spring = _springStrength, damper = _springDamper, targetPosition = 0.5f
                };
                _wheelContacts[i].material = _material;
                // Preserve model orientation; the collider supplies suspension position and wheel spin.
                _wheelMeshOffsets[i] = Quaternion.Inverse(wheel.transform.rotation) * _wheels[i].rotation;
            }
            return true;
        }

        private void FixedUpdate()
        {
            if (_rider == null || _body.isKinematic) return;
            IsGrounded = false;
            for (int i = 0; i < _wheelColliders.Length; i++) IsGrounded |= _wheelColliders[i].isGrounded;

            Vector3 forward = transform.forward;
            float current = Vector3.Dot(_body.linearVelocity, forward);
            bool assisted = AssistWheels(current);
            float target = _input.y >= 0 ? _input.y * _maxForwardSpeed : _input.y * _maxReverseSpeed;
            if (_handbrake) target = 0;
            bool reversing = current * target < -0.05f;
            float acceleration = _handbrake ? _handbrakeDeceleration : reversing ? _braking :
                Mathf.Abs(_input.y) < 0.01f ? _coastDeceleration : _acceleration;
            float driveAcceleration = Mathf.Clamp((target - current) / Time.fixedDeltaTime, -acceleration, acceleration);
            _steer = Mathf.SmoothDamp(_steer, _handbrake ? 0 : _input.x, ref _steerVelocity,
                _steerSmoothTime, Mathf.Infinity, Time.fixedDeltaTime);
            float angle = Mathf.Lerp(_lowSpeedSteerAngle, _highSpeedSteerAngle,
                Mathf.Clamp01(Mathf.Abs(current) / Mathf.Max(0.1f, _maxForwardSpeed)));
            bool braking = _handbrake || reversing || Mathf.Abs(_input.y) < 0.01f;
            for (int i = 0; i < _wheelColliders.Length; i++)
            {
                var wheel = _wheelColliders[i];
                wheel.steerAngle = wheel.transform.localPosition.z > 0 ? _steer * angle : 0;
                // As in the source, wheel torque assists the force-driven arcade motor.
                wheel.motorTorque = (IsGrounded || assisted) && !braking && Mathf.Abs(current) < Mathf.Abs(target) ? _input.y * 100f : 0;
                wheel.brakeTorque = braking ? acceleration * _body.mass * _wheelRadius * 0.25f : 0;
            }
            if (IsGrounded || assisted)
            {
                _body.AddForceAtPosition(forward * (driveAcceleration * _body.mass), _body.worldCenterOfMass);
                float sideways = Vector3.Dot(_body.linearVelocity, transform.right);
                _body.AddForce(-transform.right * Mathf.Clamp(sideways / Time.fixedDeltaTime, -_lateralGrip, _lateralGrip), ForceMode.Acceleration);
                float yawRate = Mathf.Clamp(current / _wheelBase * Mathf.Tan(_steer * angle * Mathf.Deg2Rad), -1.92f, 1.92f);
                Vector3 angular = _body.angularVelocity;
                // Steering owns yaw only. The suspension and contacts retain physical pitch and roll.
                angular.y = Mathf.Lerp(angular.y, yawRate, 1f - Mathf.Exp(-12f * Time.fixedDeltaTime));
                _body.angularVelocity = angular;
            }
            if (_logDriveDiagnostics && Time.time >= _nextDiagnosticLogTime)
            {
                _nextDiagnosticLogTime = Time.time + 0.25f;
                Debug.Log($"Car suspension: throttle={_input.y:F2}, grounded={IsGrounded}, speed={current:F2}, up={transform.up}", this);
            }
        }

        private bool AssistWheels(float speed)
        {
            if (_chassis == null || _stepHeight <= 0 || _handbrake || Mathf.Abs(_input.y) < 0.01f || speed * _input.y < -0.05f)
            {
                ClearAssistance();
                return false;
            }
            Vector3 direction = Vector3.ProjectOnPlane(transform.forward * Mathf.Sign(_input.y), Vector3.up).normalized;
            if (Vector3.Dot(direction, _assistDirection) < 0.5f) ClearAssistance();
            _assistDirection = direction;
            bool active = false;
            for (int i = 0; i < 4; i++)
            {
                Vector3 center = _wheelContacts[i].transform.TransformPoint(_wheelContacts[i].center);
                if (!_assisting[i] && IsGrounded) FindLedge(i, center, direction, Mathf.Abs(speed));
                if (!_assisting[i]) continue;
                if (Vector3.Dot(center - _ledgePoints[i], direction) > _wheelRadius + 0.15f)
                {
                    _assisting[i] = false;
                    continue;
                }
                float error = _supportHeight[i] - center.y;
                if (!HasLiftClearance(Mathf.Max(0, error)))
                {
                    _assisting[i] = false;
                    continue;
                }
                float upwardSpeed = _body.GetPointVelocity(center).y;
                // Virtual support at this wheel: spring raises it, damping absorbs the ledge impact.
                float acceleration = Mathf.Clamp(error * 225f - upwardSpeed * 30f + 9.81f, 0, 90f);
                _body.AddForceAtPosition(Vector3.up * (acceleration * _body.mass * 0.25f), center);
                active = true;
            }
            return active;
        }

        private void FindLedge(int index, Vector3 center, Vector3 direction, float speed)
        {
            if (!CurbRay(center + Vector3.up * 0.3f, Vector3.down, 1f, out RaycastHit ground) || ground.normal.y < 0.65f) return;
            Vector3 origin = new Vector3(center.x, ground.point.y + 0.06f, center.z);
            float reach = 0.9f + speed * 0.35f;
            if (!CurbRay(origin, direction, reach, out RaycastHit wall) || wall.normal.y > 0.55f) return;
            Vector3 sample = wall.point + direction * 0.08f;
            sample.y = ground.point.y + _stepHeight + 0.08f;
            if (!CurbRay(sample, Vector3.down, _stepHeight + 0.1f, out RaycastHit top) || top.normal.y < 0.65f) return;
            float rise = top.point.y - ground.point.y;
            if (rise < 0.08f || rise > _stepHeight) return;
            float target = top.point.y + _wheelRadius + 0.05f;
            if (!HasLiftClearance(Mathf.Max(0, target - center.y))) return;
            _supportHeight[index] = target;
            _ledgePoints[index] = wall.point;
            _assisting[index] = true;
        }

        private bool CurbRay(Vector3 origin, Vector3 direction, float distance, out RaycastHit nearest)
        {
            nearest = default;
            int count = Physics.RaycastNonAlloc(origin, direction, _curbHits, distance, _groundMask, QueryTriggerInteraction.Ignore);
            if (count == _curbHits.Length) return false;
            float best = float.PositiveInfinity;
            for (int i = 0; i < count; i++)
            {
                var hit = _curbHits[i];
                if (hit.collider.transform.IsChildOf(transform) || hit.distance >= best) continue;
                best = hit.distance;
                nearest = hit;
            }
            return best < float.PositiveInfinity;
        }

        private bool HasLiftClearance(float rise)
        {
            if (rise < 0.005f) return true;
            Vector3 scale = transform.lossyScale;
            Vector3 half = Vector3.Scale(_chassis.size, scale) * 0.49f;
            half = new Vector3(Mathf.Abs(half.x), Mathf.Abs(half.y), Mathf.Abs(half.z));
            int count = Physics.BoxCastNonAlloc(_chassis.transform.TransformPoint(_chassis.center), half, Vector3.up,
                _curbHits, transform.rotation, rise, ~0, QueryTriggerInteraction.Ignore);
            if (count == _curbHits.Length) return false;
            for (int i = 0; i < count; i++)
                if (!_curbHits[i].collider.transform.IsChildOf(transform)) return false;
            return true;
        }

        private void ClearAssistance()
        {
            for (int i = 0; i < _assisting.Length; i++) _assisting[i] = false;
        }

        private void LateUpdate()
        {
            if (_wheelColliders == null || _wheels == null) return;
            for (int i = 0; i < _wheelColliders.Length; i++)
            {
                if (_wheelColliders[i] == null || _wheels[i] == null) continue;
                _wheelColliders[i].GetWorldPose(out Vector3 position, out Quaternion rotation);
                _wheels[i].SetPositionAndRotation(position, rotation * _wheelMeshOffsets[i]);
            }
        }

        public bool TryMount(PlayerController player, bool ignoreDistance = false)
        {
            if (!isActiveAndEnabled || _rider != null || player == null || player.IsRiding || !player.IsWorking ||
                _cameraTarget == null || _bodyCollider == null || _gameController == null) return false;
            if (!ignoreDistance && (player.transform.position - transform.position).sqrMagnitude > 25f) return false;
            _rider = player;
            _exitRequested = false;
            _steer = _steerVelocity = 0;
            ReleaseInput();
            player.BeginDrive();
            _body.isKinematic = false;
            _body.linearVelocity = Vector3.zero;
            _body.angularVelocity = Vector3.zero;
            if (player.CameraController != null)
            {
                player.CameraController.FollowVehicle(this);
                player.CameraController.SetTouchController(_carTouchpad);
            }
            _gameController.SetDrivingCar(true, this);
            StartEngineSound();
            return true;
        }

        public void RequestDismount() { if (_rider != null) _exitRequested = true; }

        private void TryDismount()
        {
            if (_rider == null) return;
            float side = Mathf.Max(_bodyCollider.bounds.extents.x, _bodyCollider.bounds.extents.z) + 0.7f;
            for (int i = 0; i < 4; i++)
            {
                float offset = side + (i / 2) * 0.7f;
                Vector3 origin = transform.position + transform.right * ((i % 2 == 0 ? 1 : -1) * offset) + Vector3.up * 2f;
                RaycastHit hit;
                if (!Physics.Raycast(origin, Vector3.down, out hit, 5f, _groundMask, QueryTriggerInteraction.Ignore) || hit.normal.y < 0.65f) continue;
                Vector3 position = hit.point + Vector3.up * 0.06f;
                if (!_rider.CanStandAt(position)) continue;
                ReleaseRider(position);
                return;
            }
            // Keep the request pending while allowing input, and retry once slow near free ground.
        }

        private void ReleaseRider(Vector3 position)
        {
            if (_engine != null) _engine.Stop();
            var player = _rider;
            _rider = null;
            _exitRequested = false;
            ReleaseInput();
            _body.linearVelocity = Vector3.zero;
            _body.angularVelocity = Vector3.zero;
            _body.isKinematic = true;
            player.EndDrive(position, Quaternion.Euler(0, transform.eulerAngles.y, 0));
            if (player.CameraController != null)
            {
                player.CameraController.FollowPlayer(player);
                player.CameraController.SetTouchController(_walkingTouchpad);
            }
            _gameController.SetDrivingCar(false, null);
        }

        private void ReleaseInput()
        {
            ClearAssistance();
            _input = Vector2.zero;
            
            _handbrake = false;
            if (_wheelColliders != null)
                for (int i = 0; i < _wheelColliders.Length; i++)
                    if (_wheelColliders[i] != null)
                    {
                        _wheelColliders[i].motorTorque = 0;
                        _wheelColliders[i].brakeTorque = 0;
                    }
            if (_forwardButton != null) _forwardButton.Release();
            if (_reverseButton != null) _reverseButton.Release();
            if (_leftButton != null) _leftButton.Release();
            if (_rightButton != null) _rightButton.Release();
            if (_handbrakeButton != null) _handbrakeButton.Release();
        }

        private void OnDisable()
        {
            if (_engine != null) _engine.Stop();
            if (_rider != null) ReleaseRider(transform.position + transform.right * 3f + Vector3.up);
            ReleaseInput();
        }

        private void OnDestroy()
        {
            if (_exitButton != null) _exitButton.onClick.RemoveListener(RequestDismount);
            if (_material != null) Destroy(_material);
        }
    }
}
