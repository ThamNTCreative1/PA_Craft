using UnityEngine;
using UnityEngine.UI;
using DG.Tweening;

namespace Playable
{
    /// <summary>Connects the existing pickup/chase and incubation interactions.</summary>
    public sealed class StealHatchController : MonoBehaviour
    {
        public enum Phase { Seeking, Escaping, Raising, Ending, LeavingHome }
        [SerializeField] private PlayerController _player;
        [SerializeField] private CameraController _camera;
        [SerializeField] private Transform _holdPoint;
        [SerializeField] private Monster _guard;
        [SerializeField] private Egg[] _eggs;
        [SerializeField] private BoxCollider _home;
        [SerializeField] private Renderer[] _homeGrounds;
        [SerializeField] private Transform _homeGate;
        [SerializeField] private EggRaisingController _raising;
        [SerializeField] private TutorialLineIndicator _line;
        [SerializeField] private HandTutorial _tutorial;
        [SerializeField] private Button _action;
        [SerializeField] private TMPro.TMP_Text _actionLabel;
        [SerializeField] private GameObject _stealTitle, _runTitle;
        [SerializeField] private BloodOverlay _blood;
        [SerializeField] private AudioClip _stealSound, _failSound;
        private Egg _candidate;
        private int _stolen;
        [SerializeField, Min(0f)] private float _afterHatchDelay = 2f;
        [SerializeField, Min(.1f)] private float _departureSpeed = 5f;
        private float _departureElapsed;
        private Egg _nextEgg;
        private Vector3 _departureDestination;
        private Tween _stealTitleTween;
        private Vector3 _stealTitleScale;
        private bool _titleScaleCached;

        private void ShowStealTitle(bool visible)
        {
            _stealTitleTween?.Kill();
            if (!_titleScaleCached)
            {
                _stealTitleScale = _stealTitle.transform.localScale;
                _titleScaleCached = true;
            }
            _stealTitle.transform.localScale = _stealTitleScale;
            _stealTitle.SetActive(visible);
            if (visible)
                _stealTitleTween = _stealTitle.transform.DOScale(_stealTitleScale * 1.08f, .55f)
                    .SetEase(Ease.InOutSine).SetLoops(-1, LoopType.Yoyo).SetUpdate(true);
        }
        public Phase State { get; private set; }
        public int StolenCount => _stolen;

        private void OnEnable()
        {
            if (_titleScaleCached && _stealTitle != null && _stealTitle.activeSelf)
                ShowStealTitle(true);
        }

        private void Start()
        {
            State = Phase.Seeking;
            _guard.BindHomeSafety(this);
            foreach (var egg in _eggs) egg.BindPlayer(_player);
            _guard.OnPlayerReached += Caught;
            _guard.ChaseStarted += OnChaseStarted;
            _raising.HatchFinished += Hatched;
            _action.onClick.AddListener(Steal);
            if (GameManager.Instance != null) GameManager.Instance.GameplayEnded += Freeze;
            _player.IsWorking = true;
            _camera.enabled = true;
            _guard.StartPatrolling();
            _runTitle.SetActive(false);
            ShowStealTitle(true);
            _tutorial.ShowMovementTutorial();
            GuideToNextEgg();
        }

        private void Update()
        {
            bool insideHome = InsideHome();
            _player.SetFootstepsSuppressed(insideHome);
            if (_camera != null)
                _camera.SetChaseShake(State == Phase.Escaping && _guard != null &&
                    _guard.State == Monster.MonsterState.Chasing && !insideHome);
            if (State == Phase.LeavingHome)
            {
                UpdateDeparture();
                return;
            }
            if (State == Phase.Seeking)
            {
                _candidate = null;
                float closest = float.MaxValue;
                foreach (var egg in _eggs)
                {
                    if (egg == null || !egg.CanSteal) continue;
                    float distance = (egg.transform.position - _player.transform.position).sqrMagnitude;
                    if (distance < closest) { closest = distance; _candidate = egg; }
                }
                bool available = _candidate != null;
                _actionLabel.text = "STEAL";
                _action.interactable = true;
                _action.gameObject.SetActive(available);
                _tutorial.SetStealHintVisible(available);
            }
            else if (State == Phase.Escaping && insideHome)
            {
                State = Phase.Raising;
                _guard.ReturnToNest();
                _runTitle.SetActive(false);
            }
        }

        public bool IsPlayerSafeAtHome => InsideHome();

        private bool InsideHome()
        {
            if (_homeGrounds != null)
                foreach (var ground in _homeGrounds)
                {
                    if (ground == null) continue;
                    Bounds bounds = ground.bounds;
                    Vector3 position = _player.transform.position;
                    if (position.x >= bounds.min.x && position.x <= bounds.max.x &&
                        position.z >= bounds.min.z && position.z <= bounds.max.z) return true;
                }
            Vector3 p = _home.transform.InverseTransformPoint(_player.transform.position) - _home.center;
            Vector3 half = _home.size * .5f;
            return Mathf.Abs(p.x) <= half.x && Mathf.Abs(p.z) <= half.z;
        }

        public void Steal()
        {
            if (State != Phase.Seeking || _candidate == null) return;
            if (GameManager.Instance != null)
            {
                if (GameManager.Instance.HasEnded) return;
                GameManager.Instance.CountEvent();
                if (GameManager.Instance.HasEnded) return;
            }
            Egg egg = _candidate;
            if (!egg.TryPickUp(_player, _holdPoint)) return;
            _stolen++;
            _player.SetCarryingEgg(true);
            _tutorial.HideAll();
            ShowStealTitle(false);
            _action.gameObject.SetActive(false);
            if (AudioManager.Instance != null) AudioManager.Instance.PlayOneShot(_stealSound);
            if (_stolen >= 2)
            {
                State = Phase.Ending;
                GameManager.Instance.CompleteStealAndHatch(false);
                return;
            }
            State = Phase.Escaping;
            _raising.BeginStolenEgg(egg);
            _guard.StartChasing(_player.transform);
            _runTitle.SetActive(true);
            _line.StartDraw(_homeGate, _player.transform);
        }

        private void Hatched()
        {
            if (State == Phase.Ending) return;
            State = Phase.LeavingHome;
            _candidate = null;
            _departureElapsed = 0f;
            _nextEgg = NextEgg();
            _line.StopDraw();
            _tutorial.HideAll();
            _action.gameObject.SetActive(false);
            _player.SetCinematicMovement(Vector3.zero);
            Vector3 outward = _homeGate.position - _home.transform.TransformPoint(_home.center);
            outward.y = 0f;
            if (outward.sqrMagnitude < .01f) outward = _home.transform.forward;
            _departureDestination = _homeGate.position + outward.normalized * 5f;
        }

        private void UpdateDeparture()
        {
            float previous = _departureElapsed;
            _departureElapsed += Time.deltaTime;
            if (_departureElapsed < _afterHatchDelay) return;
            if (previous <= _afterHatchDelay)
            {
                _raising.ReleaseArrivalCamera();
                _camera.enabled = true;
                _camera.SetCinematicLookTarget(_nextEgg != null ? _nextEgg.transform : null);
                _camera.ShowTutorialView();
            }
            Vector3 delta = _departureDestination - _player.transform.position;
            delta.y = 0f;
            if (delta.magnitude <= .35f || _departureElapsed >= _afterHatchDelay + 12f)
            {
                _player.EndCinematicMovement();
                _camera.SetCinematicLookTarget(null);
                State = Phase.Seeking;
                ShowStealTitle(true);
                GuideToNextEgg();
                return;
            }
            _player.SetCinematicMovement(delta.normalized * Mathf.Min(_departureSpeed,
                delta.magnitude / Mathf.Max(.001f, Time.fixedDeltaTime)));
        }

        private Egg NextEgg()
        {
            Egg target = null;
            float closest = float.MaxValue;
            foreach (var egg in _eggs)
            {
                if (egg == null || egg.IsHeld) continue;
                float distance = (egg.transform.position - _player.transform.position).sqrMagnitude;
                if (distance < closest) { closest = distance; target = egg; }
            }
            return target;
        }

        private void GuideToNextEgg()
        {
            Egg target = NextEgg();
            if (target != null) _line.StartDraw(target.transform, _player.transform);
        }

        private void OnChaseStarted()
        {
            if (State == Phase.Escaping && _camera != null) _camera.SetChaseShake(true);
        }

        private void OnDisable()
        {
            _stealTitleTween?.Kill();
            if (_titleScaleCached && _stealTitle != null) _stealTitle.transform.localScale = _stealTitleScale;
            if (State == Phase.LeavingHome && _player != null) _player.EndCinematicMovement();
            if (_camera != null) _camera.SetCinematicLookTarget(null);
            if (_camera != null) _camera.SetChaseShake(false);
            if (_player != null) _player.SetFootstepsSuppressed(false);
        }

        private void Caught()
        {
            if (State != Phase.Escaping) return;
            // Returning home wins the same-frame race with a contact at the gate.
            if (InsideHome()) { _guard.ReturnToNest(); State = Phase.Raising; return; }
            if (_blood != null) _blood.Show();
            if (AudioManager.Instance != null) AudioManager.Instance.PlayOneShot(_failSound);
            GameManager.Instance.CompleteStealAndHatch(true);
        }

        private void Freeze()
        {
            _player.EndCinematicMovement();
            _camera.SetCinematicLookTarget(null);
            State = Phase.Ending;
            _raising.enabled = false;
            _player.IsWorking = false;
            var body = _player.GetComponent<Rigidbody>();
            body.linearVelocity = Vector3.zero;
            body.angularVelocity = Vector3.zero;
            _player.ShowHomeIdle();
            _camera.enabled = false;
            _guard.Stop();
            _line.StopDraw();
            _tutorial.HideAll();
            _action.gameObject.SetActive(false);
            _runTitle.SetActive(false);
            ShowStealTitle(false);
        }

        private void OnDestroy()
        {
            if (_guard != null)
            {
                _guard.OnPlayerReached -= Caught;
                _guard.ChaseStarted -= OnChaseStarted;
            }
            if (_raising != null) _raising.HatchFinished -= Hatched;
            if (_action != null) _action.onClick.RemoveListener(Steal);
            if (GameManager.Instance != null) GameManager.Instance.GameplayEnded -= Freeze;
        }
    }
}
