using UnityEngine;

namespace Playable
{
    [DefaultExecutionOrder(100)]
    public class CameraController : MonoBehaviour
    {
        public enum ViewMode
        {
            ThirdPerson,
            FirstPerson
        }

        [Header("References")] [SerializeField]
        private PlayerController _target;

        [SerializeField] private TouchController _touchController;
        [SerializeField] private Transform _yawPivot;
        [SerializeField] private Transform _pitchPivot;
        [SerializeField] private Transform _followTarget;
        [SerializeField] private Camera _targetCamera;
        [Header("View")] [SerializeField] private ViewMode _viewMode;
        [SerializeField] private Vector3 _thirdPersonOffset = new Vector3(0, 1.6f, -4.5f);
        [SerializeField] private Vector3 _firstPersonOffset = new Vector3(0, 1.65f, 0);
        [SerializeField, Min(1)] private float _followSmooth = 14f;
        [Header("Look")] [SerializeField] private float _lookSensitivity = 0.18f;
        [SerializeField] private float _initialYawOffset;
        [SerializeField] private float _initialPitch = 12f;
        [SerializeField] private float _pitchMin = -30f;
        [SerializeField] private float _pitchMax = 65f;

        [Header("Obstruction")] [SerializeField]
        private LayerMask _collisionMask = ~0;

        [SerializeField, Min(0.05f)] private float _collisionRadius = 0.23f;

        [Header("Motorbike Follow")]
        [SerializeField, InspectorName("Driving View Offset")]
        [Tooltip(
            "Driving camera offset: X = sideways, Y = anchor height, |Z| = camera distance. Use negative Z for the rear view.")]
        private Vector3 _bikeOffset = new Vector3(0, 1.7f, -6f);

        [SerializeField, InspectorName("Driving Initial Pitch")]
        [Tooltip("Camera pitch in degrees when mounting a vehicle, clamped to Pitch Min/Max.")]
        private float _bikeInitialPitch = 12f;

        [SerializeField] private float _speedPullback = 1.5f;
        private float _yaw, _pitch, _distance;
        private Vector2 _feedback;
        private bool _paintballAim;
        [Header("Paintball Zoom")]
        [SerializeField] private float _paintballZoomFov = 60f;
        [SerializeField] private float _paintballZoomDistance = 2f;
        [SerializeField] private float _paintballZoomShoulder = 1.3f;
        [SerializeField] private float _paintballZoomRate = 10f;
        [Header("Paintball Portrait Framing")]
        [SerializeField, Range(30f, 90f)] private float _paintballPortraitZoomFov = 65f;
        [SerializeField, Min(0.5f)] private float _paintballPortraitZoomDistance = 3f;
        [SerializeField] private float _paintballPortraitZoomShoulder = 0.35f;
        private bool _paintballZoom;
        private float _zoomWeight, _normalFov;
        public void SetPaintballZoom(bool held) { _paintballZoom = _paintballAim && held; }
        public void SetPaintballAim(bool active)
        {
            if (active && !_paintballAim && _targetCamera != null) _normalFov = _targetCamera.fieldOfView;
            if (!active && _paintballAim)
            {
                _paintballZoom = false;
                _zoomWeight = 0;
                if (_targetCamera != null) _targetCamera.fieldOfView = _normalFov;
            }
            _paintballAim = active;
        }
        public void AddFeedback(Vector2 angles) { _feedback = Vector2.ClampMagnitude(_feedback + angles, 4f); }
        public void ClearFeedback() { _feedback = Vector2.zero; }
        private Vector3 _anchorPosition, _anchorVelocity;
        private Transform _followOverride;
#if UNITY_LUNA
        private Transform _lastAnchor;
        private Vector3 _lastAnchorPosition;
#endif
        private IDrivableVehicle _vehicle;
        private readonly RaycastHit[] _hits = new RaycastHit[64];
        public Transform YawPivot => _yawPivot != null ? _yawPivot : transform;
        public ViewMode CurrentViewMode => _viewMode;
        public Camera OutputCamera => _targetCamera;
        public PlayerController Target => _target;
        public float Yaw => _yaw;
        public float Pitch => _pitch;

        private void Awake()
        {
            if (_targetCamera == null) _targetCamera = GetComponentInChildren<Camera>(true);
        }

        private void OnEnable()
        {
            if (_touchController != null) _touchController.OnLookDelta += AddLookInput;
        }

        private void OnDisable()
        {
            SetPaintballAim(false);
            if (_touchController != null) _touchController.OnLookDelta -= AddLookInput;
        }

        private void Start()
        {
            SnapToTarget();
        }

        private void LateUpdate()
        {
            if (_target == null && _followOverride == null) return;
            UpdateCamera(false);
        }

        public void SetTarget(PlayerController target)
        {
            _target = target;
            _vehicle = null;
            _followOverride = null;
            SnapToTarget();
        }

        public void SetFollowTarget(Transform followTarget)
        {
            _followOverride = followTarget;
        }

        public void ClearFollowTarget()
        {
            _followOverride = null;
            _vehicle = null;
        }

        public void FollowVehicle(IDrivableVehicle vehicle)
        {
            SetPaintballAim(false);
            _vehicle = vehicle;
            _followOverride = vehicle != null ? vehicle.CameraTarget : null;
            if (vehicle != null)
            {
                _yaw = 0f;
                _pitch = Mathf.Clamp(_bikeInitialPitch, _pitchMin, _pitchMax);
            }

            if (_target != null) _target.StopFollowingCameraYaw();
        }

        public void FollowPlayer(PlayerController player)
        {
            _target = player;
            _vehicle = null;
            _followOverride = null;
            _anchorVelocity = Vector3.zero;
        }

        public void FollowPlayer(PlayerController player, Transform followTarget, float initialYaw, float initialPitch)
        {
            FollowPlayer(player);
            _followOverride = followTarget;
            _yaw = initialYaw;
            _pitch = Mathf.Clamp(initialPitch, _pitchMin, _pitchMax);
        }

        public void SetTouchController(TouchController controller)
        {
            if (_touchController != null) _touchController.OnLookDelta -= AddLookInput;
            _touchController = controller;
            if (isActiveAndEnabled && _touchController != null) _touchController.OnLookDelta += AddLookInput;
        }

        public void ToggleView()
        {
            SetViewMode(_viewMode == ViewMode.ThirdPerson ? ViewMode.FirstPerson : ViewMode.ThirdPerson);
        }

        public void SetViewMode(ViewMode mode)
        {
            _viewMode = mode;
        }

        public void AddLookInput(Vector2 delta)
        {
            _yaw = Mathf.Repeat(_yaw + delta.x * _lookSensitivity, 360f);
            _pitch = Mathf.Clamp(_pitch - delta.y * _lookSensitivity, _pitchMin, _pitchMax);
        }

        public void SetEntryAngles(float yaw, float pitch)
        {
            _yaw = yaw;
            _pitch = Mathf.Clamp(pitch, _pitchMin, _pitchMax);
            _anchorVelocity = Vector3.zero;
            UpdateCamera(true);
        }

        public void LookAtPoint(Vector3 worldPoint, bool instant = true)
        {
            Vector3 delta = worldPoint - GetAnchor().position;
            if (delta.sqrMagnitude < 0.001f) return;
            _yaw = Mathf.Atan2(delta.x, delta.z) * Mathf.Rad2Deg;
            _pitch = Mathf.Clamp(-Mathf.Atan2(delta.y, new Vector2(delta.x, delta.z).magnitude) * Mathf.Rad2Deg,
                _pitchMin, _pitchMax);
            UpdateCamera(instant);
        }

        public void SnapToTarget()
        {
            Transform anchor = GetAnchor();
            _yaw = anchor.eulerAngles.y + _initialYawOffset;
            _pitch = Mathf.Clamp(_initialPitch, _pitchMin, _pitchMax);
            _anchorPosition = anchor.position;
            _anchorVelocity = Vector3.zero;
            UpdateCamera(true);
        }

        private Transform GetAnchor()
        {
            if (_followOverride != null) return _followOverride;
            if (_followTarget != null && (_target == null || _followTarget.IsChildOf(_target.transform)))
                return _followTarget;
            return _target != null ? _target.transform : transform;
        }

        private void UpdateCamera(bool instant)
        {
            if (_targetCamera == null) return;
            Transform anchorTransform = GetAnchor();
            Vector3 anchor = anchorTransform.position;
#if UNITY_LUNA
            // Carry horizontal target movement into the camera before smoothing.
            // This avoids a second lag behind the Rigidbody's rendered pose while
            // retaining vertical smoothing and smooth transitions between anchors.
            if (!instant && _lastAnchor == anchorTransform)
            {
                Vector3 travel = anchor - _lastAnchorPosition;
                _anchorPosition.x += travel.x;
                _anchorPosition.z += travel.z;
            }
            _lastAnchor = anchorTransform;
            _lastAnchorPosition = anchor;
#endif
            _anchorPosition = instant
                ? anchor
                : Vector3.SmoothDamp(_anchorPosition, anchor, ref _anchorVelocity,
                    1f / Mathf.Max(1f, _followSmooth), Mathf.Infinity, Time.deltaTime);
            Quaternion yawRotation = Quaternion.Euler(0, _yaw, 0);
            _feedback = Vector2.Lerp(_feedback, Vector2.zero, 1f - Mathf.Exp(-10f * Time.deltaTime));
            Quaternion rotation = Quaternion.Euler(_pitch + _feedback.y, _yaw + _feedback.x, 0);
            if (_yawPivot != null) _yawPivot.SetPositionAndRotation(_anchorPosition, yawRotation);
            if (_pitchPivot != null) _pitchPivot.rotation = rotation;
            bool firstPerson = _vehicle == null && _viewMode == ViewMode.FirstPerson;
            if (_target != null)
            {
                if (firstPerson) _target.SetCameraYaw(_yaw);
                else _target.StopFollowingCameraYaw();
            }

            Vector3 offset = _vehicle != null ? _bikeOffset : firstPerson ? _firstPersonOffset : _thirdPersonOffset;
            _zoomWeight = Mathf.MoveTowards(_zoomWeight, _paintballZoom && _vehicle == null ? 1f : 0f,
                Time.deltaTime * _paintballZoomRate);
            // Vertical FOV leaves much less horizontal room in portrait. Blend toward
            // a closer-to-centre shoulder view instead of pushing the player off-screen.
            float portraitWeight = Mathf.Clamp01((1f - _targetCamera.aspect) / (1f - 9f / 16f));
            float zoomFov = Mathf.Lerp(_paintballZoomFov, _paintballPortraitZoomFov, portraitWeight);
            if (_paintballAim) _targetCamera.fieldOfView = Mathf.Lerp(_normalFov, zoomFov, _zoomWeight);
            Vector3 origin = _anchorPosition + Vector3.up * offset.y + yawRotation * Vector3.right * offset.x;
            if (_paintballAim && !firstPerson && _vehicle == null)
            {
                float idleShoulder = Mathf.Lerp(0.7f, 0.35f, portraitWeight);
                float zoomShoulder = Mathf.Lerp(_paintballZoomShoulder, _paintballPortraitZoomShoulder, portraitWeight);
                origin += yawRotation * Vector3.right * Mathf.Lerp(idleShoulder, zoomShoulder, _zoomWeight);
            }
            float wantedDistance = firstPerson ? 0 : Mathf.Abs(offset.z);
            if (_paintballAim && !firstPerson && _vehicle == null)
                wantedDistance = Mathf.Lerp(wantedDistance,
                    Mathf.Lerp(_paintballZoomDistance, _paintballPortraitZoomDistance, portraitWeight), _zoomWeight);
            if (_vehicle != null) wantedDistance += _speedPullback * Mathf.Clamp01(_vehicle.Speed / _vehicle.MaxSpeed);
            Vector3 backward = rotation * Vector3.back;
            float allowed = wantedDistance;
            int count = wantedDistance > 0.001f
                ? Physics.SphereCastNonAlloc(origin, _collisionRadius, backward, _hits, wantedDistance,
                    _collisionMask, QueryTriggerInteraction.Ignore)
                : 0;
            for (int i = 0; i < count; i++)
            {
                var t = _hits[i].collider.transform;
                if ((_target != null && t.IsChildOf(_target.transform)) ||
                    (_vehicle != null && t.IsChildOf(_vehicle.transform))) continue;
                allowed = Mathf.Min(allowed, Mathf.Max(0, _hits[i].distance - 0.08f));
            }

            // Pull in immediately at walls, ease outward when the view becomes clear.
            _distance = instant || allowed < _distance
                ? allowed
                : Mathf.Lerp(_distance, allowed, 1f - Mathf.Exp(-8f * Time.deltaTime));
            _targetCamera.transform.SetPositionAndRotation(origin + backward * _distance, rotation);
        }
    }
}
