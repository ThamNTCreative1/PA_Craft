using System.Collections.Generic;
using DG.Tweening;
using Minigames.StealAnEgg.GamePlay;
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
            Won,
            ReturningHome,
            CanHatch,
            Incubating,
            ReadyToOpen,
            Hatching,
            Claim,
            Recovering,
            Revive
        }

        [Header("Gameplay References")]
        [SerializeField]
        private PlayerController _player;

        [SerializeField] private Monster _monster;

        [Header("Boss Selection")]
        [LunaPlaygroundField("Type Boss 0->3")] public int TypeBoss;
        [SerializeField] private List<Monster> listBoss;
        [SerializeField] private Egg _egg;
        [Tooltip("All stealable eggs; Egg above is included automatically.")]
        [SerializeField] private List<Egg> _eggs = new List<Egg>();
        [SerializeField] private Transform _eggHoldPoint;

        [Tooltip("Finish line across the world X axis at Home Z. Cross from the starting side while carrying the egg to stop the chase.")]
        [SerializeField]
        private Transform _home;

        [Header("Hatch")]
        [Tooltip("Home spot where the egg is incubated. Falls back to the finish line when empty.")]
        [SerializeField] private Transform _hatchHome;
        [Tooltip("Used only when Hatch Home has no collider.")]
        [SerializeField, Min(0.1f)] private float _hatchRadius = 2.5f;
        [Tooltip("Extra XZ margin around the Home collider bounds.")]
        [SerializeField, Min(0f)] private float _hatchMargin = 0.3f;
        [Tooltip("How far in front of the player the incubated egg is placed.")]
        [SerializeField, Min(0f)] private float _hatchEggDistance = 3f;
        [Tooltip("The hatched pet roams within this distance of the player (follows the player).")]
        [SerializeField, Min(0.5f)] private float _petRoamRadius = 8f;
        [SerializeField] private SAE_EggIncubator _incubator;
        [SerializeField] private Button _hatchButton;
        [SerializeField] private Button _openButton;
        [SerializeField] private Button _claimMoreButton;

        [Header("Caught")]
        [Tooltip("Full-screen red image that flashes when the monster catches the player.")]
        [SerializeField] private Image _caughtFlash;
        [SerializeField, Range(0f, 1f)] private float _caughtFlashAlpha = 0.55f;
        [SerializeField, Min(0f)] private float _caughtFlashIn = 0.12f;
        [SerializeField, Min(0f)] private float _caughtFlashOut = 0.6f;
        [SerializeField] private AudioClip _caughtSound;

        [Header("Revive")]
        [Tooltip("Dark full-screen overlay shown when the player runs out of resets (Luna: Player Reset Count).")]
        [SerializeField] private GameObject _revivePanel;
        [SerializeField] private Button _reviveButton;

        [Header("UI")][SerializeField] private Button _stealButton;
        [Tooltip("Shown while escaping: drops the egg, the monster takes it back instead of chasing.")]
        [SerializeField] private Button _dropButton;
        [SerializeField] private GameObject _title;
        [SerializeField] private GameObject _runUI;

        [Header("Restart")]
        [SerializeField, Min(0f)]
        private float _restartDelay = 1f;


        [Header("Tutorial")]
        [Tooltip("Guide from Player to Egg, then to the finish flag, then to Home.")]
        [SerializeField]
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
        private SAE_IncubateEggHandler _incubatingEgg;
        private Collider[] _hatchHomeColliders;
        private readonly List<Egg> _allEggs = new List<Egg>();
        private Egg _carriedEgg;
        private int _playerResets;
        private Egg _droppedEgg;

        public GameState State { get; private set; }

        private Transform HatchHome => _hatchHome != null ? _hatchHome : _home;

        private void Awake()
        {
            SelectBoss();
            if (_home != null) SetActiveIfChanged(_home.gameObject, false);
            CacheInitialState();
        }

        private void SelectBoss()
        {
            // Resolve conflicting Playground toggles deterministically; keep one boss active.
            _monster = listBoss[Mathf.Clamp(TypeBoss, 0, listBoss.Count - 1)];
            _monster.gameObject.SetActive(true);
        }

        private void OnEnable()
        {
            if (!_initialized) return;
            if (_stealButton != null)
            {
                _stealButton.onClick.AddListener(StealEgg);
            }

            if (_dropButton != null) _dropButton.onClick.AddListener(DropEgg);
            if (_hatchButton != null) _hatchButton.onClick.AddListener(HatchEgg);
            if (_openButton != null) _openButton.onClick.AddListener(OpenEgg);
            if (_claimMoreButton != null) _claimMoreButton.onClick.AddListener(ClaimMore);
            if (_reviveButton != null) _reviveButton.onClick.AddListener(Revive);

            if (_incubator != null)
            {
                _incubator.OnIncubaterCompleted += HandleIncubateCompleted;
                _incubator.OnPetHatched += HandlePetHatched;
            }

            if (_monster != null)
            {
                _monster.OnPlayerReached += HandlePlayerCaught;
                _monster.OnReturned += HandleMonsterReturned;
            }

            if (_handTutorial != null) _handTutorial.MovementTutorialCompleted += ShowTitle;

            foreach (Egg egg in _allEggs) egg.RangeChanged += RefreshEggState;
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
            foreach (Egg egg in _allEggs)
                if (egg != null) egg.RangeChanged -= RefreshEggState;
            if (_stealButton != null) SetActiveIfChanged(_stealButton.gameObject, false);
            if (_dropButton != null) SetActiveIfChanged(_dropButton.gameObject, false);
            if (_stealButton != null)
            {
                _stealButton.onClick.RemoveListener(StealEgg);
            }

            if (_dropButton != null) _dropButton.onClick.RemoveListener(DropEgg);
            if (_hatchButton != null) _hatchButton.onClick.RemoveListener(HatchEgg);
            if (_openButton != null) _openButton.onClick.RemoveListener(OpenEgg);
            if (_claimMoreButton != null) _claimMoreButton.onClick.RemoveListener(ClaimMore);
            if (_reviveButton != null) _reviveButton.onClick.RemoveListener(Revive);

            if (_incubator != null)
            {
                _incubator.OnIncubaterCompleted -= HandleIncubateCompleted;
                _incubator.OnPetHatched -= HandlePetHatched;
            }

            if (_monster != null)
            {
                _monster.OnPlayerReached -= HandlePlayerCaught;
                _monster.OnReturned -= HandleMonsterReturned;
            }

            if (_handTutorial != null) _handTutorial.MovementTutorialCompleted -= ShowTitle;
        }

        /// <summary>"Steal an egg" appears only after the move/camera tutorial is done.</summary>
        private void ShowTitle()
        {
            if (_title == null) return;
            if (State != GameState.LookingForEgg && State != GameState.CanStealEgg) return;
            SetActiveIfChanged(_title, true);
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
                // After the attack both the player and the monster snap back to their start positions.
                if (_restartTimer <= 0f) ResetAfterCaught();
                return;
            }

            CheckFinishFlag();
            CheckHatchHome();
        }

        private void CheckFinishFlag()
        {
            if (State != GameState.Escaping || _carriedEgg == null || !_carriedEgg.IsHeld ||
                _playerTransform == null || _home == null) return;

            // The finish line spans the road, independent of lateral distance or jump height.
            float distanceFromLine = (_playerTransform.position.z - _home.position.z) * _homeApproachSign;
            if (distanceFromLine <= 0f) ReachFinishLine();
        }

        private void ReachFinishLine()
        {
            if (State != GameState.Escaping) return;
            // Safe behind the line: the monster gives up and walks back to the egg spot.
            _monster.ReturnTo(_monsterStartPosition, _monsterStartRotation);
            SetState(GameState.ReturningHome);
            CheckHatchHome();
        }

        private void CheckHatchHome()
        {
            if (State != GameState.ReturningHome && State != GameState.CanHatch) return;
            Transform hatchHome = HatchHome;
            if (hatchHome == null || _playerTransform == null) return;

            SetState(IsPlayerInHome(hatchHome) ? GameState.CanHatch : GameState.ReturningHome);
        }

        private bool IsPlayerInHome(Transform hatchHome)
        {
            Vector3 playerPosition = _playerTransform.position;
            if (_hatchHomeColliders == null || _hatchHomeColliders.Length == 0)
            {
                Vector3 offset = playerPosition - hatchHome.position;
                offset.y = 0f;
                return offset.sqrMagnitude <= _hatchRadius * _hatchRadius;
            }

            // Anywhere inside Home counts; height is ignored so jumping still triggers it.
            foreach (Collider homeCollider in _hatchHomeColliders)
            {
                if (homeCollider == null || !homeCollider.enabled) continue;
                Bounds bounds = homeCollider.bounds;
                if (Mathf.Abs(playerPosition.x - bounds.center.x) <= bounds.extents.x + _hatchMargin &&
                    Mathf.Abs(playerPosition.z - bounds.center.z) <= bounds.extents.z + _hatchMargin)
                    return true;
            }

            return false;
        }

        public void StealEgg()
        {
            if (!_initialized || !_started || !isActiveAndEnabled ||
                State != GameState.CanStealEgg || _eggHoldPoint == null ||
                _player == null || _monster == null)
            {
                return;
            }

            Egg egg = FindNearestEgg(true);
            if (egg == null || !egg.TryPickUp(_player, _eggHoldPoint))
            {
                RefreshEggState();
                return;
            }

            _carriedEgg = egg;

            _player.SetCarryingEgg(true);
            SetActiveIfChanged(_home.gameObject, true);
            SetActiveIfChanged(_title, false);
            _monster.StartChasing(_playerTransform);
            SetState(GameState.Escaping);
            CheckFinishFlag();
        }

        /// <summary>Drops the carried egg at the player's feet; the monster goes for the egg instead of the player.</summary>
        public void DropEgg()
        {
            if (!_initialized || State != GameState.Escaping || _carriedEgg == null || !_carriedEgg.IsHeld) return;

            Egg egg = _carriedEgg;
            _carriedEgg = null;
            _player.SetCarryingEgg(false);
            egg.Drop(FindGroundPoint(_playerTransform.position));
            _droppedEgg = egg;
            if (_home != null) SetActiveIfChanged(_home.gameObject, false);
            SetState(GameState.Recovering);
            _monster.Fetch(egg.transform, HandleDroppedEggReached);
        }

        private void HandleDroppedEggReached()
        {
            if (State != GameState.Recovering) return;
            // The monster takes the egg (it disappears) and walks back to its spot.
            if (_droppedEgg != null) SetActiveIfChanged(_droppedEgg.gameObject, false);
            _monster.ReturnTo(_monsterStartPosition, _monsterStartRotation);
        }

        private void HandleMonsterReturned()
        {
            if (State != GameState.Recovering) return;
            // Back home: the egg reappears at its original place and can be stolen again.
            if (_droppedEgg != null)
            {
                SetActiveIfChanged(_droppedEgg.gameObject, true);
                _droppedEgg.ResetEgg();
                _droppedEgg = null;
            }

            SetState(GameState.LookingForEgg);
            RefreshEggState();
        }

        public void HatchEgg()
        {
            if (!_initialized || State != GameState.CanHatch) return;
            if (_incubator == null)
            {
                Debug.LogError("GameController requires an SAE_EggIncubator to hatch the egg.", this);
                return;
            }

            StopPlayer();
            _player.SetCarryingEgg(false);
            // Incubate at the size the stolen egg had while carried.
            SAE_Egg stolenType = _carriedEgg != null ? _carriedEgg.GetComponentInChildren<SAE_Egg>(true) : null;

            // Place the egg right in front of the player, wherever they stand inside Home (as in the original game).
            Vector3 forward = _playerTransform.forward;
            forward.y = 0f;
            if (forward.sqrMagnitude < 0.0001f) forward = Vector3.forward;
            forward.Normalize();
            Vector3 eggPosition = FindGroundPoint(_playerTransform.position + forward * _hatchEggDistance);
            Quaternion eggRotation = Quaternion.LookRotation(-forward);
            // Clone the stolen egg's prefab asset (chicken, dragon...), not the carried scene egg:
            // Luna can only instantiate assets. Falls back to the incubator's Egg Prefab.
            SAE_Egg incubatePrefab = _carriedEgg != null ? _carriedEgg.IncubatePrefab : null;
            if (incubatePrefab != null)
                _incubatingEgg = _incubator.IncubateEgg(incubatePrefab, eggPosition, eggRotation,
                    stolenType != null ? stolenType.transform.lossyScale : (Vector3?)null);
            else
                _incubatingEgg = stolenType != null
                    ? _incubator.IncubateEgg(eggPosition, eggRotation, stolenType.transform.lossyScale)
                    : _incubator.IncubateEgg(eggPosition, eggRotation);
            if (_incubatingEgg != null)
            {
                StripStealComponents(_incubatingEgg.gameObject);
                if (_carriedEgg != null) _incubator.SetPetScale(_incubatingEgg, _carriedEgg.PetScale);
            }
            // Hide the carried egg only after cloning it, otherwise the clone would spawn inactive.
            if (_carriedEgg != null) SetActiveIfChanged(_carriedEgg.gameObject, false);
            SetState(GameState.Incubating);
        }

        /// <summary>The incubated egg is cloned from the stolen one; it must not be stealable again.</summary>
        private static void StripStealComponents(GameObject incubated)
        {
            foreach (EggPickupTrigger trigger in incubated.GetComponentsInChildren<EggPickupTrigger>(true))
            {
                // The trigger may sit on the egg root itself: then remove only the component, not the egg.
                if (trigger.gameObject == incubated || trigger.GetComponent<SAE_Egg>() != null)
                {
                    Destroy(trigger);
                }
                else
                {
                    Destroy(trigger.gameObject);
                }
            }
            foreach (Egg stealable in incubated.GetComponentsInChildren<Egg>(true))
                Destroy(stealable);
        }

        private Vector3 FindGroundPoint(Vector3 point)
        {
            // Feet height is the fallback when nothing solid is below the point.
            Collider playerCollider = _player.GetComponent<Collider>();
            float groundY = playerCollider != null ? playerCollider.bounds.min.y : _playerTransform.position.y;

            RaycastHit[] hits = Physics.RaycastAll(point + Vector3.up * 3f, Vector3.down, 20f, ~0,
                QueryTriggerInteraction.Ignore);
            float bestDistance = float.MaxValue;
            foreach (RaycastHit hit in hits)
            {
                if (hit.collider.GetComponentInParent<PlayerController>() != null) continue;
                if (hit.distance >= bestDistance) continue;
                bestDistance = hit.distance;
                groundY = hit.point.y;
            }

            point.y = groundY;
            return point;
        }

        public void OpenEgg()
        {
            if (!_initialized || State != GameState.ReadyToOpen || _incubatingEgg == null) return;
            SetState(GameState.Hatching);
            _incubator.Hatch(_incubatingEgg);
        }

        private void ResetAfterCaught()
        {
            int limit = GameManager.Instance != null ? GameManager.Instance.PlayerResetCount : -1;
            if (limit >= 0 && _playerResets >= limit)
            {
                // Out of resets: dark screen + Revive popup that opens the store.
                SetState(GameState.Revive);
                HideTutorial();
                if (_handTutorial != null) _handTutorial.HideAll();
                if (GameManager.Instance != null) GameManager.Instance.EndGame();
                return;
            }

            _playerResets++;
            ResetGame(false);
        }

        public void Revive()
        {
            if (!_initialized || State != GameState.Revive || GameManager.Instance == null) return;
            GameManager.Instance.ShowCTA();
        }

        public void ClaimMore()
        {
            // The button stays up after the tap: every tap opens the CTA again.
            if (!_initialized || (State != GameState.Claim && State != GameState.Won)) return;
            if (GameManager.Instance == null)
            {
                Debug.LogError("GameManager is required to open the CTA.", this);
                return;
            }

            if (State == GameState.Claim)
            {
                SetState(GameState.Won);
                GameManager.Instance.EndGame();
            }
            GameManager.Instance.ShowCTA();
        }

        private void HandleIncubateCompleted(SAE_IncubateEggHandler handler)
        {
            if (handler != _incubatingEgg || State != GameState.Incubating) return;
            SetState(GameState.ReadyToOpen);
        }

        private void HandlePetHatched(SAE_Monster pet)
        {
            _incubatingEgg = null;
            if (pet != null)
            {
                float size = _incubator != null && _incubator.LastPetScale > 0f ? _incubator.LastPetScale : 1f;
                var wander = pet.gameObject.AddComponent<SAE_PetWander>();
                wander.SetValue(GetPetArea(pet.transform.position, size), 1f, 0, size);
                wander.DisableHops();
                wander.SetAnchor(_playerTransform, _petRoamRadius);
            }
            if (State != GameState.Hatching) return;
            SetState(GameState.Claim);
        }

        private Bounds GetPetArea(Vector3 petPosition, float petSize = 1f)
        {
            // A bigger pet needs a bigger yard to show it walking.
            float minSize = 4f * Mathf.Sqrt(Mathf.Max(1f, petSize));
            const float edge = 0.5f;
            var area = new Bounds(petPosition, Vector3.zero);
            if (_hatchHomeColliders != null)
            {
                bool first = true;
                foreach (Collider homeCollider in _hatchHomeColliders)
                {
                    if (homeCollider == null) continue;
                    if (first) area = homeCollider.bounds;
                    else area.Encapsulate(homeCollider.bounds);
                    first = false;
                }
            }

            // Keep the pet off Home's edges, but give it room to roam even if Home is small.
            Vector3 size = area.size;
            size.x = Mathf.Max(size.x - edge * 2f, minSize);
            size.z = Mathf.Max(size.z - edge * 2f, minSize);
            area.size = size;
            return area;
        }

        public void ResetGame()
        {
            ResetGame(false);
        }

        private void ResetGame(bool monsterRunsBack)
        {
            // Start runs after Player/Monster Awake, avoiding initialization-order dependencies.
            if (!_initialized || !_started || _player == null || _monster == null || _allEggs.Count == 0) return;

            _restartTimer = 0f;
            if (_home != null) SetActiveIfChanged(_home.gameObject, false);
            // Without a tutorial the title shows right away; otherwise after it (see ShowTitle).
            SetActiveIfChanged(_title, _handTutorial == null);
            _player.ResetPlayer(_playerStartPosition, _playerStartRotation);
            _player.IsWorking = true;
            if (monsterRunsBack) _monster.ReturnTo(_monsterStartPosition, _monsterStartRotation);
            else _monster.ResetMonster(_monsterStartPosition, _monsterStartRotation);

            _carriedEgg = null;
            _droppedEgg = null;
            foreach (Egg egg in _allEggs)
            {
                SetActiveIfChanged(egg.gameObject, true);
                egg.ResetEgg();
            }
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
            PlayCaughtFeedback();
            // The monster remains in Attacking until the round resets.
        }

        private void PlayCaughtFeedback()
        {
            if (_caughtSound != null && AudioManager.Instance != null) AudioManager.Instance.PlaySound(_caughtSound);
            if (_caughtFlash == null) return;

            // Red fade in, then out.
            _caughtFlash.DOKill();
            Color color = _caughtFlash.color;
            color.a = 0f;
            _caughtFlash.color = color;
            _caughtFlash.gameObject.SetActive(true);
            DOTween.Sequence()
                .Append(_caughtFlash.DOFade(_caughtFlashAlpha, _caughtFlashIn))
                .Append(_caughtFlash.DOFade(0f, _caughtFlashOut))
                .OnComplete(() => _caughtFlash.gameObject.SetActive(false))
                .SetTarget(_caughtFlash).SetLink(_caughtFlash.gameObject);
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
                {
                    Egg nearest = FindNearestEgg(false);
                    target = nearest != null ? nearest.transform : null;
                }
                else if (State == GameState.Escaping)
                    target = _home;
                else if (State == GameState.ReturningHome)
                    target = HatchHome;
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
                _handTutorial.SetHatchHintVisible(State == GameState.CanHatch);
                _handTutorial.SetOpenHintVisible(State == GameState.ReadyToOpen);
                _handTutorial.SetClaimHintVisible(State == GameState.Claim || State == GameState.Won);
                if (State != GameState.LookingForEgg && State != GameState.CanStealEgg)
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

            if (_dropButton != null)
            {
                SetActiveIfChanged(_dropButton.gameObject, State == GameState.Escaping);
            }

            if (_revivePanel != null) SetActiveIfChanged(_revivePanel, State == GameState.Revive);
            SetPopupVisible(_reviveButton, State == GameState.Revive);
            SetPopupVisible(_hatchButton, State == GameState.CanHatch);
            SetPopupVisible(_openButton, State == GameState.ReadyToOpen);
            SetPopupVisible(_claimMoreButton, State == GameState.Claim || State == GameState.Won);
        }

        private static void SetPopupVisible(Button button, bool visible)
        {
            if (button == null) return;
            GameObject target = button.gameObject;
            if (target.activeSelf == visible) return;

            Transform t = target.transform;
            t.DOKill();
            if (!visible)
            {
                t.localScale = Vector3.one;
                target.SetActive(false);
                return;
            }

            // Pop in, then keep pulsing to draw the tap.
            target.SetActive(true);
            t.localScale = Vector3.zero;
            DOTween.Sequence()
                .Append(t.DOScale(Vector3.one, 0.3f).SetEase(Ease.OutBack))
                .Append(t.DOScale(Vector3.one * 1.1f, 0.5f).SetEase(Ease.InOutSine).SetLoops(-1, LoopType.Yoyo))
                .SetTarget(t).SetLink(target);
        }

        private void CacheInitialState()
        {
            _allEggs.Clear();
            if (_egg != null) _allEggs.Add(_egg);
            foreach (Egg egg in _eggs)
                if (egg != null && !_allEggs.Contains(egg)) _allEggs.Add(egg);

            if (_player == null || _monster == null || _allEggs.Count == 0 || _eggHoldPoint == null || _home == null)
            {
                Debug.LogError("GameController requires Player, Monster, Egg, Egg Hold Point and Home references.",
                    this);
                if (_stealButton != null) SetActiveIfChanged(_stealButton.gameObject, false);
                if (_runUI != null) SetActiveIfChanged(_runUI, false);
                enabled = false;
                return;
            }

            if (_incubator == null || _hatchButton == null || _openButton == null || _claimMoreButton == null)
                Debug.LogError("GameController hatch flow needs Incubator, Hatch, Open and Claim More buttons.", this);

            _playerTransform = _player.transform;
            if (HatchHome != null)
            {
                _hatchHomeColliders = HatchHome.GetComponentsInChildren<Collider>(true);
                // Home is an area the player walks into, not an obstacle.
                foreach (Collider homeCollider in _hatchHomeColliders) homeCollider.isTrigger = true;
            }

            if (_tutorialLineIndicator == null)
                _tutorialLineIndicator = GetComponentInChildren<TutorialLineIndicator>(true);
            _playerBody = _player.GetComponent<Rigidbody>();
            _playerStartPosition = _playerTransform.position;
            _homeApproachSign = _playerStartPosition.z >= _home.position.z ? 1f : -1f;
            _playerStartRotation = _playerTransform.rotation;
            _monsterStartPosition = _monster.transform.position;
            _monsterStartRotation = _monster.transform.rotation;
            var guardPoints = new List<Vector3>(_allEggs.Count);
            foreach (Egg egg in _allEggs)
            {
                egg.BindPlayer(_player);
                guardPoints.Add(egg.transform.position);
            }

            _monster.SetGuardPoints(guardPoints);

            SetPopupVisible(_hatchButton, false);
            SetPopupVisible(_openButton, false);
            SetPopupVisible(_claimMoreButton, false);
            SetPopupVisible(_reviveButton, false);
            if (_revivePanel != null) SetActiveIfChanged(_revivePanel, false);

            _initialized = true;
        }

        private void RefreshEggState()
        {
            if (!_initialized || !_started || !isActiveAndEnabled) return;
            if (State != GameState.LookingForEgg && State != GameState.CanStealEgg) return;
            SetState(FindNearestEgg(true) != null ? GameState.CanStealEgg : GameState.LookingForEgg);
        }

        private Egg FindNearestEgg(bool stealableOnly)
        {
            Egg nearest = null;
            float bestSqr = float.MaxValue;
            foreach (Egg egg in _allEggs)
            {
                if (egg == null || !egg.isActiveAndEnabled || egg.IsHeld) continue;
                if (stealableOnly && !egg.CanSteal) continue;
                float sqr = _playerTransform != null
                    ? (egg.transform.position - _playerTransform.position).sqrMagnitude
                    : 0f;
                if (sqr >= bestSqr) continue;
                bestSqr = sqr;
                nearest = egg;
            }

            return nearest;
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
