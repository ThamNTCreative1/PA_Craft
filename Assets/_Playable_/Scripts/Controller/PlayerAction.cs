using System;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.EventSystems;
using UnityEngine.UI;

namespace Playable
{
    public class PlayerAction : MonoBehaviour
    {
        [SerializeField] private PlayerController _playerController;
        [SerializeField] private Camera _interactionCamera;
        [SerializeField] private Button _exitButton;
        [SerializeField] private Arrow _motorbikeArrow;
        [SerializeField] private Arrow _carArrow;
        [SerializeField] private MotorbikeController[] _motorbikes;
        [SerializeField, Min(0.1f)] private float _interactionDistance = 4f;
        [SerializeField] private float _tapMaxMovement = 25f;
        [SerializeField] private float _tapMaxDuration = 0.4f;
        [Header("Tutorial Bike Tap")]
        [SerializeField, Min(0f), Tooltip("Extra tap area around the bike, in pixels at a 1080px screen short side.")]
        private float _tutorialTapPadding = 60f;
        [SerializeField, Min(0f)] private float _tutorialMinTapSize = 120f;
        [SerializeField] private CarController[] _cars;
        private CarController _nearestCar, _mountedCar;
        private Collider[] _tutorialCarColliders;
        private Collider[] _tutorialBikeColliders;
        private readonly RaycastHit[] _tutorialHits = new RaycastHit[32];
        private MotorbikeController _nearest, _mounted;
        private bool _tracking, _dragged, _startedOnUI;
        private int _fingerId;
        private Vector2 _tapStart;
        private float _tapTime;
        private readonly List<RaycastResult> _uiHits = new List<RaycastResult>();
        private PointerEventData _pointer;
        public PlayerController PlayerController => _playerController;
        public bool IsInCar => _mountedCar != null;
        public bool IsOnMotorbike => _mounted != null;
        public bool IsUsingTreadmill => false;
        public event Action MotorbikeMounted;
        public event Action CarMounted;
        private void Awake()
        {
            if (_playerController == null) _playerController = GetComponent<PlayerController>();
            if (_interactionCamera == null && _playerController.CameraController != null) _interactionCamera = _playerController.CameraController.OutputCamera;
            if (_interactionCamera == null) _interactionCamera = Camera.main;
            if (_motorbikes == null) _motorbikes = new MotorbikeController[0];
            _tutorialBikeColliders = new Collider[_motorbikes.Length];
            for (int i = 0; i < _motorbikes.Length; i++)
                if (_motorbikes[i] != null) _tutorialBikeColliders[i] = _motorbikes[i].GetComponent<Collider>();
            if (_cars == null) _cars = new CarController[0];
            _tutorialCarColliders = new Collider[_cars.Length];
            for (int i = 0; i < _cars.Length; i++)
                if (_cars[i] != null) _tutorialCarColliders[i] = _cars[i].GetComponent<Collider>();
            if (_exitButton != null) _exitButton.onClick.AddListener(UseMotorbike);
        }
        private void OnDestroy()
        {
            if (_exitButton != null) _exitButton.onClick.RemoveListener(UseMotorbike);
        }
        private void Update()
        {
            if (_mounted != null && _mounted.Rider != _playerController) _mounted = null;
            if (_mountedCar != null && _mountedCar.Rider != _playerController) _mountedCar = null;
            FindNearestMotorbike();
            FindNearest(_cars, _tutorialCarColliders, ref _nearestCar, _carArrow);
            if (_exitButton != null) _exitButton.gameObject.SetActive(_mounted != null);
            if (_mounted == null && _mountedCar == null && ReadTap(out Vector2 screen))
            {
                TryTapBike(screen);
                if (_mounted == null) TryTapVehicle(_cars, screen, ref _mountedCar, _carArrow, CarMounted, false, false);
            }
        }
        private void FindNearestMotorbike()
        {
            FindNearest(_motorbikes, _tutorialBikeColliders, ref _nearest, _motorbikeArrow);
        }
        private void FindNearest<T>(T[] vehicles, Collider[] colliders, ref T nearest, Arrow arrow) where T : Component, IDrivableVehicle
        {
            nearest = null; float best = float.PositiveInfinity;
            T guide = null;
            if (!_playerController.IsRiding && _playerController.IsWorking)
                foreach (var bike in vehicles)
                {
                    if (bike == null || !bike.gameObject.activeInHierarchy || bike.IsDriven) continue;
                    float distance = (bike.transform.position - transform.position).sqrMagnitude;
                    if (distance >= best) continue;
                    guide = bike; best = distance;
                }
            if (best <= _interactionDistance * _interactionDistance) nearest = guide;
            if (arrow != null)
            {
                arrow.SetTarget(guide != null ? guide.transform : null, _interactionCamera);
                arrow.gameObject.SetActive(guide != null);
            }
        }
        public void UseMotorbike()
        {
            if (_mounted != null) { _mounted.RequestDismount(); return; }
            FindNearestMotorbike();
            if (_nearest != null && _nearest.TryMount(_playerController))
            {
                _mounted = _nearest;
                if (_motorbikeArrow != null) _motorbikeArrow.gameObject.SetActive(false);
                MotorbikeMounted?.Invoke();
            }
        }
        public bool TryMountFromTutorial(Vector2 screen)
        {
            if (_mounted != null || _mountedCar != null) return true;
            _tracking = false;
            TryTapBike(screen, true, true);
            if (_mounted == null) TryTutorialTapArea(screen);
            if (_mounted == null)
            {
                TryTapVehicle(_cars, screen, ref _mountedCar, _carArrow, CarMounted, true, true);
                if (_mountedCar == null) TryTutorialTapArea(_cars, _tutorialCarColliders, screen, ref _mountedCar, _carArrow, CarMounted);
            }
            return _mounted != null || _mountedCar != null;
        }

        private void TryTutorialTapArea(Vector2 screen)
        {
            TryTutorialTapArea(_motorbikes, _tutorialBikeColliders, screen, ref _mounted, _motorbikeArrow, MotorbikeMounted);
        }

        private void TryTutorialTapArea<T>(T[] vehicles, Collider[] colliders, Vector2 screen, ref T mounted, Arrow arrow, Action onMounted) where T : Component, IDrivableVehicle
        {
            if (_interactionCamera == null || !_interactionCamera.pixelRect.Contains(screen)) return;
            float scale = Mathf.Min(Screen.width, Screen.height) / 1080f;
            float padding = _tutorialTapPadding * scale;
            float minSize = _tutorialMinTapSize * scale;
            T selected = null;
            float best = float.PositiveInfinity;
            for (int i = 0; i < vehicles.Length; i++)
            {
                var bike = vehicles[i];
                var collider = colliders[i];
                if (bike == null || !bike.gameObject.activeInHierarchy || bike.IsDriven || collider == null || !collider.enabled) continue;
                Bounds bounds = collider.bounds;
                Vector3 center = _interactionCamera.WorldToScreenPoint(bounds.center);
                if (center.z <= _interactionCamera.nearClipPlane || center.z > 100f) continue;
                Vector2 min = new Vector2(center.x, center.y), max = min;
                bool clipped = false;
                for (int corner = 0; corner < 8; corner++)
                {
                    Vector3 point = bounds.center + Vector3.Scale(bounds.extents,
                        new Vector3((corner & 1) == 0 ? -1 : 1, (corner & 2) == 0 ? -1 : 1, (corner & 4) == 0 ? -1 : 1));
                    Vector3 projected = _interactionCamera.WorldToScreenPoint(point);
                    if (projected.z <= _interactionCamera.nearClipPlane) { clipped = true; break; }
                    min = Vector2.Min(min, projected);
                    max = Vector2.Max(max, projected);
                }
                if (clipped) continue;
                Vector2 rectCenter = (min + max) * 0.5f;
                Vector2 halfSize = Vector2.Max((max - min) * 0.5f + Vector2.one * padding, Vector2.one * (minSize * 0.5f));
                if (Mathf.Abs(screen.x - rectCenter.x) > halfSize.x || Mathf.Abs(screen.y - rectCenter.y) > halfSize.y) continue;
                float distance = (screen - rectCenter).sqrMagnitude;
                if (distance >= best || !IsTutorialBikeVisible(bike, bounds.center)) continue;
                selected = bike; best = distance;
            }
            if (selected == null || !selected.TryMount(_playerController, true)) return;
            mounted = selected;
            if (arrow != null) arrow.gameObject.SetActive(false);
            onMounted?.Invoke();
        }

        private bool IsTutorialBikeVisible(IDrivableVehicle bike, Vector3 center)
        {
            Ray ray = _interactionCamera.ScreenPointToRay(_interactionCamera.WorldToScreenPoint(center));
            int count = Physics.RaycastNonAlloc(ray, _tutorialHits, Vector3.Distance(ray.origin, center) + 0.1f, ~0, QueryTriggerInteraction.Ignore);
            if (count == _tutorialHits.Length) return false;
            float closest = float.PositiveInfinity;
            Transform hitTransform = null;
            for (int i = 0; i < count; i++)
            {
                var hit = _tutorialHits[i];
                if (hit.collider.transform.IsChildOf(transform) || hit.distance >= closest) continue;
                closest = hit.distance; hitTransform = hit.collider.transform;
            }
            return hitTransform != null && hitTransform.IsChildOf(bike.transform);
        }

        private void TryTapBike(Vector2 screen, bool ignoreDistance = false, bool tutorialPress = false)
        {
            TryTapVehicle(_motorbikes, screen, ref _mounted, _motorbikeArrow, MotorbikeMounted, ignoreDistance, tutorialPress);
        }

        private bool TryTapVehicle<T>(T[] vehicles, Vector2 screen, ref T mounted, Arrow arrow, Action onMounted,
            bool ignoreDistance, bool tutorialPress) where T : Component, IDrivableVehicle
        {
            if (_interactionCamera == null || (!tutorialPress && IsOverControls(screen))) return false;
            var hits = Physics.RaycastAll(_interactionCamera.ScreenPointToRay(screen), 100f, ~0, QueryTriggerInteraction.Ignore);
            Array.Sort(hits, (a, b) => a.distance.CompareTo(b.distance));
            foreach (var hit in hits)
            {
                if (hit.collider.transform.IsChildOf(transform)) continue;
                foreach (var vehicle in vehicles)
                {
                    if (vehicle == null || !hit.collider.transform.IsChildOf(vehicle.transform)) continue;
                    if ((!ignoreDistance && (vehicle.transform.position - transform.position).sqrMagnitude > _interactionDistance * _interactionDistance)
                        || !vehicle.TryMount(_playerController, ignoreDistance)) return false;
                    mounted = vehicle;
                    if (arrow != null) arrow.gameObject.SetActive(false);
                    onMounted?.Invoke();
                    return true;
                }
                break;
            }
            return false;
        }
        private bool IsOverControls(Vector2 screen)
        {
            if (EventSystem.current == null) return false;
            if (_pointer == null) _pointer = new PointerEventData(EventSystem.current);
            _pointer.position = screen; _uiHits.Clear();
            EventSystem.current.RaycastAll(_pointer, _uiHits);
            foreach (var hit in _uiHits)
            {
                if (hit.gameObject.GetComponentInParent<Selectable>() != null || hit.gameObject.GetComponentInParent<UltimateJoystick>() != null) return true;
            }
            return false;
        }
        private void BeginTap(Vector2 position, int finger)
        {
            _tracking = true; _dragged = false; _tapStart = position;
            _tapTime = Time.unscaledTime; _fingerId = finger; _startedOnUI = IsOverControls(position);
        }
        private bool ReadTap(out Vector2 screen)
        {
            screen = Vector2.zero;
            if (Input.touchCount > 0)
            {
                for (int i = 0; i < Input.touchCount; i++)
                {
                    var touch = Input.GetTouch(i);
                    if (!_tracking && touch.phase == TouchPhase.Began) BeginTap(touch.position, touch.fingerId);
                    if (!_tracking || touch.fingerId != _fingerId) continue;
                    _dragged |= (touch.position - _tapStart).sqrMagnitude > _tapMaxMovement * _tapMaxMovement;
                    if (touch.phase == TouchPhase.Canceled) { _tracking = false; return false; }
                    if (touch.phase != TouchPhase.Ended) continue;
                    _tracking = false; screen = touch.position;
                    return !_startedOnUI && !_dragged && Time.unscaledTime - _tapTime <= _tapMaxDuration;
                }
                return false;
            }
            if (Input.GetMouseButtonDown(0)) BeginTap(Input.mousePosition, -1);
            if (!_tracking) return false;
            _dragged |= ((Vector2)Input.mousePosition - _tapStart).sqrMagnitude > _tapMaxMovement * _tapMaxMovement;
            if (!Input.GetMouseButtonUp(0)) return false;
            _tracking = false; screen = Input.mousePosition;
            return !_startedOnUI && !_dragged && Time.unscaledTime - _tapTime <= _tapMaxDuration;
        }
        private void OnDisable()
        {
            _tracking = false;
            if (_motorbikeArrow != null) _motorbikeArrow.gameObject.SetActive(false);
            if (_carArrow != null) _carArrow.gameObject.SetActive(false);
        }
    }
}
