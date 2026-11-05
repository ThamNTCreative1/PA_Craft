using System;
using UnityEngine;

namespace Playable
{
    [DefaultExecutionOrder(-100)]
    public class GameController : MonoBehaviour
    {
        public static GameController Instance;

        [Header("Game Brightness")]
        [LunaPlaygroundField("Game Brightness")]
        [SerializeField, Range(0f, 1f),
         Tooltip("Unlit brightness: 0 = original colors, 0.6 = current look, 1 = brightest.")]
        private float _gameBrightness = 0.6f;

        private float _appliedBrightness = -1f;

        private void OnEnable()
        {
            ApplyBrightness();
        }

        private void OnDisable()
        {
            if (Instance == this) Shader.SetGlobalVector("_PlayableBrightnessOverride", Vector4.zero);
            _appliedBrightness = -1f;
        }

        private void ApplyBrightness()
        {
            _gameBrightness = Mathf.Clamp01(_gameBrightness);
            // A global override updates all bright Unlit materials without cloning or scanning them.
            Shader.SetGlobalVector("_PlayableBrightnessOverride", new Vector4(_gameBrightness, 1f, 0f, 0f));
            _appliedBrightness = _gameBrightness;
        }

        [SerializeField] private PlayerAction _playerAction;

        [Header("Player UI and Tutorials")] [SerializeField]
        private PlayerController _player;

        [SerializeField] private GameObject _playerUI;
        [SerializeField] private RideUIState _motorbikeRide = new RideUIState();
        [SerializeField] private RideUIState _carRide = new RideUIState();
        private CarController _activeCar;
        private Func<float> _readBikeInput, _readCarInput;
        [SerializeField] private GameObject _startTutorial;
        [SerializeField] private GameObject _moveTutorial;
        private bool _riding;
        private int _tutorialShownFrame;

        [Serializable]
        private class RideUIState
        {
            [SerializeField] private GameObject _panel;
            [SerializeField] private GameObject _firstRideHint;
            private bool _hasShownHint, _hasInput, _active;
            private Vector3 _rideStart;

            public void SetActive(bool riding, Transform subject)
            {
                bool first = riding && !_active && !_hasShownHint;
                _active = riding;
                if (_panel != null) _panel.SetActive(riding);
                if (!riding)
                {
                    if (_firstRideHint != null) _firstRideHint.SetActive(false);
                    return;
                }
                if (!first) return;
                _hasShownHint = true;
                _hasInput = false;
                if (subject != null) _rideStart = subject.position;
                if (_firstRideHint != null) _firstRideHint.SetActive(true);
            }

            public void Tick(Transform subject, Func<float> readInput)
            {
                if (!_active || subject == null || readInput == null || _firstRideHint == null || !_firstRideHint.activeSelf) return;
                if (!_hasInput)
                {
                    _rideStart = subject.position;
                    if (Mathf.Abs(readInput()) < 0.01f) return;
                    _hasInput = true;
                }
                Vector3 travel = subject.position - _rideStart;
                travel.y = 0;
                if (travel.sqrMagnitude > 0.0025f) _firstRideHint.SetActive(false);
            }
        }

        private void Awake()
        {
            Instance = this;
            if (_player != null) _readBikeInput = _player.ReadDriveInput;
            _carRide.SetActive(false, null);
            ShowStartTutorial(true);
            SetRiding(false);
        }

        private void Start()
        {
            if (_playerAction != null) _playerAction.MotorbikeMounted += OnDrivingStarted;
        }

        private void OnDestroy()
        {
            if (_playerAction != null) _playerAction.MotorbikeMounted -= OnDrivingStarted;
            if (Instance == this) Instance = null;
        }

        private void OnDrivingStarted()
        {
            SetRiding(true);
        }

        private void Update()
        {
            if (_appliedBrightness != _gameBrightness) ApplyBrightness();
            // Handle the first press before dismissing the tutorial state.
            if (!_riding && Time.frameCount > _tutorialShownFrame &&
                (_player == null || _player.enabled) &&
                ((_startTutorial != null && _startTutorial.activeInHierarchy) ||
                             (_moveTutorial != null && _moveTutorial.activeInHierarchy)))
            {
                if (Input.touchCount > 0)
                {
                    for (int i = 0; i < Input.touchCount; i++)
                    {
                        var touch = Input.GetTouch(i);
                        if (touch.phase != TouchPhase.Began) continue;
                        HandleStartTutorialPress(touch.position);
                        break;
                    }
                }
                else if (Input.GetMouseButtonDown(0)) HandleStartTutorialPress(Input.mousePosition);

                // Walking is the other way to finish the opening tutorial.
                if (!_riding && _player != null && _player.ReadMoveInput().sqrMagnitude > 0.001f)
                    DismissStartTutorial();
            }

            _motorbikeRide.Tick(_player != null ? _player.transform : null, _readBikeInput);
            _carRide.Tick(_activeCar != null ? _activeCar.transform : null, _readCarInput);
        }

        public void DismissStartTutorial()
        {
            if (_startTutorial != null) _startTutorial.SetActive(false);
            if (_moveTutorial != null) _moveTutorial.SetActive(false);
        }

        public void ShowStartTutorial(bool visible)
        {
            _tutorialShownFrame = Time.frameCount;
            if (_startTutorial != null) _startTutorial.SetActive(visible);
            if (_moveTutorial != null) _moveTutorial.SetActive(visible);
        }

        private void HandleStartTutorialPress(Vector2 screen)
        {
            // Give the bike the press while the tutorial is still visible.
            if (_player != null) _player.IsWorking = true;
            if (_playerAction != null && _playerAction.PlayerController != null)
                _playerAction.PlayerController.IsWorking = true;
            if (_playerAction != null && _playerAction.TryMountFromTutorial(screen))
            {
                // Complete the UI transition in this press, even without the event subscription.
                if (!_playerAction.IsInCar) OnDrivingStarted();
                else DismissStartTutorial();
            }
            // Only movement guidance is dismissed; vehicle hints keep their own completion rules.
            DismissStartTutorial();
        }

        public void SetRiding(bool riding)
        {
            _riding = riding;
            if (_playerUI != null) _playerUI.SetActive(!riding);
            _motorbikeRide.SetActive(riding, _player != null ? _player.transform : null);
            if (!riding) return;
            _carRide.SetActive(false, null);
            DismissStartTutorial();
        }

        public void SetDrivingCar(bool riding, CarController car)
        {
            _riding = riding;
            _activeCar = riding ? car : null;
            _readCarInput = _activeCar != null ? (Func<float>)_activeCar.ReadDriveInput : null;
            if (_playerUI != null) _playerUI.SetActive(!riding);
            _carRide.SetActive(riding, _activeCar != null ? _activeCar.transform : null);
            if (!riding) return;
            _motorbikeRide.SetActive(false, null);
            DismissStartTutorial();
        }
    }
}
