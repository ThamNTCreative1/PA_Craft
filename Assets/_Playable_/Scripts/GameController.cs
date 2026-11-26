using System.Collections;
using DG.Tweening;
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

        [Header("Minimap")] [LunaPlaygroundField("Time To Show Map")] [SerializeField, Min(0f)]
        private float _timeToShowMap = 8f;

        [SerializeField] private PlayerAction _playerAction;
        [SerializeField] private GameObject _gamePanel;
        [SerializeField] private GameObject _minimapPanel;
        [SerializeField] private GameObject _textMinimap;

        [Header("Player UI and Tutorials")] [SerializeField]
        private PlayerController _player;

        [SerializeField] private GameObject _playerUI;
        [SerializeField] private GameObject _motorbikeUI;
        [SerializeField] private GameObject _startTutorial;
        [SerializeField] private GameObject _moveTutorial;
        [SerializeField] private GameObject _drivingTutorial;
        private bool _hasShownDrivingTutorial;
        private bool _riding;
        private Vector3 _rideStartPosition;
        private bool _hasDrivingInput;

        private bool _mapCountdownStarted;

        private void Awake()
        {
            Instance = this;
            if (_startTutorial != null) _startTutorial.SetActive(true);
            if (_moveTutorial != null) _moveTutorial.SetActive(true);
            SetRiding(false);
        }

        private void Start()
        {
            if (_minimapPanel != null) _minimapPanel.SetActive(false);
            if (_playerAction != null) _playerAction.CarEntered += OnDrivingStarted;
        }

        private void OnDestroy()
        {
            if (_playerAction != null) _playerAction.CarEntered -= OnDrivingStarted;
            if (Instance == this) Instance = null;
        }

        private void OnDrivingStarted()
        {
            // A successful mount also switches tutorials immediately, including
            // a bike press made while the opening tutorial is still visible.
            SetRiding(true);

            // Count from the first mount only; getting off/on does not reset the deadline.
            if (_mapCountdownStarted || _minimapPanel == null) return;
            _mapCountdownStarted = true;
            StartCoroutine(IEShowMap());
        }

        private IEnumerator IEShowMap()
        {
            if (_timeToShowMap > 0f) yield return new WaitForSeconds(_timeToShowMap);
            // AppLovin: hiện minimap = end game (không tự ra store, chờ người chơi nhấn)
            if (GameManager.Instance != null && GameManager.Instance.AppLovinMode) GameManager.Instance.EndGame();
            else ShowEndScreen();
        }

        private bool _endScreenShown;

        /// <summary>Ẩn UI gameplay và hiện màn kết thúc (minimap + lớp bấm ra store).</summary>
        public void ShowEndScreen()
        {
            if (_endScreenShown) return;
            _endScreenShown = true;
            StopAllCoroutines();
            if (_gamePanel != null) _gamePanel.SetActive(false);
            if (_minimapPanel != null) _minimapPanel.SetActive(true);
            if (_textMinimap != null)
                _textMinimap.transform.DOScale(new Vector3(1.2f, 1.2f, 1.2f), 0.5f).SetEase(Ease.Linear)
                    .SetLoops(-1, LoopType.Yoyo);
        }

        private void Update()
        {
            if (_appliedBrightness != _gameBrightness) ApplyBrightness();
            // Handle the first press before dismissing the tutorial state.
            if (!_riding && ((_startTutorial != null && _startTutorial.activeInHierarchy) ||
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

            if (!_riding || _player == null || _drivingTutorial == null || !_drivingTutorial.activeSelf) return;
            if (!_hasDrivingInput)
            {
                // Seating/physics settling is not the player's first driving action.
                _rideStartPosition = _player.transform.position;
                if (Mathf.Abs(_player.ReadDriveInput()) < 0.01f) return;
                _hasDrivingInput = true;
            }

            Vector3 travel = _player.transform.position - _rideStartPosition;
            travel.y = 0;
            if (travel.sqrMagnitude > 0.0025f) _drivingTutorial.SetActive(false);
        }

        public void DismissStartTutorial()
        {
            if (_startTutorial != null) _startTutorial.SetActive(false);
            if (_moveTutorial != null) _moveTutorial.SetActive(false);
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
                OnDrivingStarted();
            }
            // A missed bike press must not dismiss the tutorial and lose its easy-mount path.
        }

        public void SetRiding(bool riding)
        {
            bool firstRide = riding && !_riding && !_hasShownDrivingTutorial;
            _riding = riding;
            if (_playerUI != null) _playerUI.SetActive(!riding);
            if (_motorbikeUI != null) _motorbikeUI.SetActive(riding);
            if (!riding)
            {
                if (_drivingTutorial != null) _drivingTutorial.SetActive(false);
                return;
            }

            DismissStartTutorial();
            if (!firstRide) return;
            _hasShownDrivingTutorial = true;
            _hasDrivingInput = false;
            if (_player != null) _rideStartPosition = _player.transform.position;
            if (_drivingTutorial != null) _drivingTutorial.SetActive(true);
        }
    }
}