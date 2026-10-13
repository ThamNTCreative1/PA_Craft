using DG.Tweening;
using UnityEngine;
using UnityEngine.UI;

namespace Playable
{
    public class GameController : MonoBehaviour
    {
        public enum GameState
        {
            LookingForEgg,
            CanStealEgg,
            Escaping,
            Lost,
            Won
        }

        [Header("Gameplay References")] [SerializeField]
        private PlayerController _player;

        [SerializeField] private Monster _monster;

        [Header("Boss Selection")]
        [LunaPlaygroundField("Use Oni Tiger")] [SerializeField] private bool _useOniTiger = true;
        [LunaPlaygroundField("Use Titan Guard")] [SerializeField] private bool _useTitanGuard;
        [LunaPlaygroundField("Use Cosmic Dragon")] [SerializeField] private bool _useCosmicDragon;
        [SerializeField] private Monster _oniTiger;
        [SerializeField] private Monster _titanGuard;
        [SerializeField] private Monster _cosmicDragon;
        [SerializeField] private Egg _egg;
        [SerializeField] private Transform _eggHoldPoint;

        [Tooltip("Finish line across the world X axis at Home Z. Cross from the starting side while carrying the egg to win.")] [SerializeField]
        private Transform _home;

        [Header("UI")] [SerializeField] private Button _stealButton;
        [SerializeField] private GameObject _title;
        [SerializeField] private GameObject _runUI;

        [Header("Restart")] [SerializeField, Min(0f)]
        private float _restartDelay = 1f;


        [Header("Tutorial")] [Tooltip("Guide from Player to Egg, then to the finish flag (Home).")] [SerializeField]
        private TutorialLineIndicator _tutorialLineIndicator;
        [SerializeField] private HandTutorial _handTutorial;

        private Vector3 _playerStartPosition;
        private Quaternion _playerStartRotation;
        private Vector3 _monsterStartPosition;
        private Quaternion _monsterStartRotation;
        private Transform _playerTransform;
        private Rigidbody _playerBody;
        private bool _initialized;
        private bool _started;
        private float _homeApproachSign;
        private float _restartTimer;

        public GameState State { get; private set; }

        private void Awake()
        {
            SelectBoss();
            if (_home != null) SetActiveIfChanged(_home.gameObject, false);
            CacheInitialState();
        }

        private void SelectBoss()
        {
            // Resolve conflicting Playground toggles deterministically; keep one boss active.
            Monster selected = null;
            if (_useCosmicDragon && _cosmicDragon != null) selected = _cosmicDragon;
            else if (_useTitanGuard && _titanGuard != null) selected = _titanGuard;
            else if (_useOniTiger && _oniTiger != null) selected = _oniTiger;
            if (selected == null) selected = _oniTiger != null ? _oniTiger : _monster;
            if (_oniTiger != null) _oniTiger.gameObject.SetActive(_oniTiger == selected);
            if (_titanGuard != null) _titanGuard.gameObject.SetActive(_titanGuard == selected);
            if (_cosmicDragon != null) _cosmicDragon.gameObject.SetActive(_cosmicDragon == selected);
            _monster = selected;
        }

        private void OnEnable()
        {
            if (!_initialized) return;
            if (_stealButton != null)
            {
                _stealButton.onClick.AddListener(StealEgg);
            }

            if (_monster != null)
            {
                _monster.OnPlayerReached += HandlePlayerCaught;
            }

            _egg.RangeChanged += RefreshEggState;
            RefreshEggState();
            RefreshUI();
            RefreshTutorial();
        }

        private void Start()
        {
            _started = true;
            ResetGame();
            _title.transform.DOScale(new Vector3(1.2f, 1.2f, 1.2f), 0.5f).SetEase(Ease.Linear)
                .SetLoops(-1, LoopType.Yoyo);
        }

        private void OnDisable()
        {
            HideTutorial();
            if (_handTutorial != null) _handTutorial.HideAll();
            if (_egg != null) _egg.RangeChanged -= RefreshEggState;
            if (_stealButton != null) SetActiveIfChanged(_stealButton.gameObject, false);
            if (_stealButton != null)
            {
                _stealButton.onClick.RemoveListener(StealEgg);
            }

            if (_monster != null)
            {
                _monster.OnPlayerReached -= HandlePlayerCaught;
            }
        }

        private void Update()
        {
            if (!_initialized || !_started)
            {
                return;
            }

            if (State == GameState.Lost)
            {
                _restartTimer -= Time.deltaTime;
                if (_restartTimer <= 0f) ResetGame();
                return;
            }

            CheckFinishFlag();
        }

        private void CheckFinishFlag()
        {
            if (State != GameState.Escaping || _egg == null || !_egg.IsHeld ||
                _playerTransform == null || _home == null) return;

            // The finish line spans the road, independent of lateral distance or jump height.
            float distanceFromLine = (_playerTransform.position.z - _home.position.z) * _homeApproachSign;
            if (distanceFromLine <= 0f) Win();
        }

        public void StealEgg()
        {
            if (!_initialized || !_started || !isActiveAndEnabled ||
                State != GameState.CanStealEgg || _eggHoldPoint == null ||
                _egg == null || _player == null || _monster == null)
            {
                return;
            }

            if (!_egg.TryPickUp(_player, _eggHoldPoint))
            {
                RefreshEggState();
                return;
            }

            _player.SetCarryingEgg(true);
            SetActiveIfChanged(_home.gameObject, true);
            SetActiveIfChanged(_title, false);
            _monster.StartChasing(_playerTransform);
            SetState(GameState.Escaping);
            CheckFinishFlag();
        }

        public void ResetGame()
        {
            // Start runs after Player/Monster Awake, avoiding initialization-order dependencies.
            if (!_initialized || !_started || _player == null || _monster == null || _egg == null) return;

            _restartTimer = 0f;
            if (_home != null) SetActiveIfChanged(_home.gameObject, false);
            SetActiveIfChanged(_title, true);
            _player.ResetPlayer(_playerStartPosition, _playerStartRotation);
            _player.IsWorking = true;
            _monster.ResetMonster(_monsterStartPosition, _monsterStartRotation);

            _egg.ResetEgg();
            HideTutorial();
            SetState(GameState.LookingForEgg);
            if (_handTutorial != null) _handTutorial.ShowMovementTutorial();
            RefreshUI();
            RefreshTutorial();
        }

        private void HandlePlayerCaught()
        {
            if (!_initialized || !_started || !isActiveAndEnabled || State != GameState.Escaping)
            {
                return;
            }

            // Resolve arrival first if the monster callback runs before our Update this frame.
            CheckFinishFlag();
            if (State != GameState.Escaping) return;
            SetState(GameState.Lost);
            _restartTimer = Mathf.Max(0f, _restartDelay);
            StopPlayer();
            // The monster remains in Attacking until the round resets.
        }

        private void Win()
        {
            if (State != GameState.Escaping) return;
            SetState(GameState.Won);
            StopPlayer();
            _monster.Stop();
            if (GameManager.Instance != null) GameManager.Instance.ShowWinPanel();
            else Debug.LogError("GameManager is required to show the win panel.", this);
        }

        private void SetState(GameState newState)
        {
            if (State == newState) return;
            State = newState;
            RefreshUI();
            RefreshTutorial();
        }

        private void RefreshTutorial()
        {
            if (_tutorialLineIndicator == null) return;

            Transform target = null;
            if (_initialized && _started && isActiveAndEnabled && _playerTransform != null)
            {
                if (State == GameState.LookingForEgg || State == GameState.CanStealEgg)
                    target = _egg != null ? _egg.transform : null;
                else if (State == GameState.Escaping)
                    target = _home;
            }

            if (target != null) _tutorialLineIndicator.StartDraw(target, _playerTransform);
            else _tutorialLineIndicator.StopDraw();
        }

        private void HideTutorial()
        {
            if (_tutorialLineIndicator != null) _tutorialLineIndicator.StopDraw();
        }

        private void RefreshUI()
        {
            if (_handTutorial != null)
            {
                _handTutorial.SetStealHintVisible(State == GameState.CanStealEgg);
                if (State == GameState.Escaping || State == GameState.Lost || State == GameState.Won)
                    _handTutorial.HideMovementTutorial();
            }

            if (_stealButton != null)
            {
                SetActiveIfChanged(_stealButton.gameObject, State == GameState.CanStealEgg);
            }

            if (_runUI != null)
            {
                SetActiveIfChanged(_runUI, State == GameState.Escaping);
            }
        }

        private void CacheInitialState()
        {
            if (_player == null || _monster == null || _egg == null || _eggHoldPoint == null || _home == null)
            {
                Debug.LogError("GameController requires Player, Monster, Egg, Egg Hold Point and Home references.",
                    this);
                if (_stealButton != null) SetActiveIfChanged(_stealButton.gameObject, false);
                if (_runUI != null) SetActiveIfChanged(_runUI, false);
                enabled = false;
                return;
            }

            _playerTransform = _player.transform;
            if (_tutorialLineIndicator == null)
                _tutorialLineIndicator = GetComponentInChildren<TutorialLineIndicator>(true);
            _playerBody = _player.GetComponent<Rigidbody>();
            _playerStartPosition = _playerTransform.position;
            _homeApproachSign = _playerStartPosition.z >= _home.position.z ? 1f : -1f;
            _playerStartRotation = _playerTransform.rotation;
            _monsterStartPosition = _monster.transform.position;
            _monsterStartRotation = _monster.transform.rotation;
            _egg.BindPlayer(_player);

            _initialized = true;
        }

        private void RefreshEggState()
        {
            if (!_initialized || !_started || !isActiveAndEnabled) return;
            if (State != GameState.LookingForEgg && State != GameState.CanStealEgg) return;
            SetState(_egg != null && _egg.CanSteal ? GameState.CanStealEgg : GameState.LookingForEgg);
        }

        private void StopPlayer()
        {
            if (_player != null) _player.IsWorking = false;
            if (_playerBody == null || _playerBody.isKinematic) return;
            // Stopping input alone leaves the last horizontal physics velocity active.
            Vector3 velocity = _playerBody.linearVelocity;
            velocity.x = 0f;
            velocity.z = 0f;
            _playerBody.linearVelocity = velocity;
        }

        private static void SetActiveIfChanged(GameObject target, bool active)
        {
            if (target.activeSelf != active) target.SetActive(active);
        }

    }
}
