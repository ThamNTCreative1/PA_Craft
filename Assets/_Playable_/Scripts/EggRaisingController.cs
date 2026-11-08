using System;
using UnityEngine;
using UnityEngine.UI;
using TMPro;
namespace Playable
{
    public class EggRaisingController : MonoBehaviour
    {
        public enum Phase { Selecting, Carrying, Incubating, Ready, Revealing, Complete, Placing }
        [SerializeField] private PlayerController _player;
        [SerializeField] private Transform _holdPoint, _nest;
        [SerializeField] private BoxCollider _pen;
        [SerializeField] private TutorialLineIndicator _line;
        [SerializeField] private HandTutorial _tutorial;
        [SerializeField] private CameraController _cameraInput;
        [SerializeField] private GameObject _selection;
        [SerializeField] private Button _action;
        [SerializeField] private TMP_Text _label;
        [SerializeField] private HatchCountdownOutline _countdown;
        [SerializeField] private FailPanel _cta;
        [SerializeField] private GameObject[] _eggs;
        [SerializeField] private PenWanderer[] _hatchlings, _residents;
        [SerializeField] private float _creatureScaleMultiplier = 3f;
        [SerializeField, Min(0f)] private float _nestClearance = 7f;
        [SerializeField, Min(.1f)] private float _openRadius = 8f;
        [SerializeField] private AudioClip _selectSound, _placeSound, _tickSound, _readySound, _hatchSound, _ctaSound;
        [SerializeField] private AudioClip _hatchlingRoar;
        [Header("Steal and hatch")]
        [SerializeField] private bool _stealFlow;
        [SerializeField, Min(.1f)] private float _incubationSeconds = 2f;
        [SerializeField] private GameObject _revealAura;
        [SerializeField] private Transform _hatchGround;
        [SerializeField, Min(.1f)] private float _revealSeconds = 1f;
        [SerializeField, Min(.1f)] private float _hatchShakeSeconds = .75f;
        [Header("Nest arrival")]
        [SerializeField] private NestArrivalSequence _arrival;
        [SerializeField] private Renderer _nestVisual;
        [SerializeField, Min(.1f)] private float _eggJumpSeconds = .65f;
        [SerializeField, Min(0f)] private float _eggJumpHeight = 2.5f;
        private bool _arrivalStarted;
        private Vector3 _jumpStart, _jumpEnd;
        private Quaternion _jumpRotation;
        private Vector3 _eggRestPosition, _eggRestScale;
        private Quaternion _eggRestRotation;
        private bool _shellOpened;
        private PenWanderer _revealedMonster;
        private bool _revealSpawned;
        public event Action HatchFinished;
        public void ReleaseArrivalCamera()
        {
            if (_arrival != null) _arrival.ReleaseForDeparture();
        }
        private GameObject _egg;
        private int _selected, _lastTick;
        private float _elapsed;
        private bool _atPen;
        public Phase State { get; private set; }
        private void Start()
        {
            if (_revealAura != null) _revealAura.SetActive(false);
            State = Phase.Selecting;
            foreach (var resident in _residents)
            {
                if (resident == null) continue;
                resident.transform.localScale *= _creatureScaleMultiplier;
                resident.Bind(_pen, _nest, _nestClearance);
            }
            if (_stealFlow)
            {
                _action.gameObject.SetActive(false);
                _countdown.gameObject.SetActive(false);
                if (_selection != null) _selection.SetActive(false);
                _action.onClick.AddListener(Act);
                return;
            }
            _player.IsWorking = false; _cameraInput.enabled = false;
            _tutorial.HideAll(); _line.StopDraw();
            _action.gameObject.SetActive(false); _countdown.gameObject.SetActive(false);
            _selection.SetActive(true); _cta.gameObject.SetActive(false);
            _action.onClick.AddListener(Act);
        }
        public void SelectEgg(int index)
        {
            if (_stealFlow) return;
            if (State != Phase.Selecting || index < 0 || index >= _eggs.Length) return;
            _selected = index; _egg = Instantiate(_eggs[index], _holdPoint, false);
            _egg.transform.localScale *= _creatureScaleMultiplier;
            _selection.SetActive(false); State = Phase.Carrying;
            UpdateHeldEggRotation();
            _player.SetCarryingEgg(true); _player.IsWorking = true; _cameraInput.enabled = true;
            _tutorial.ShowMovementTutorial(); _line.StartDraw(_nest, _player.transform); Sound(_selectSound);
        }
        public void BeginStolenEgg(Egg egg)
        {
            if (!_stealFlow || egg == null || !egg.IsHeld) return;
            _egg = egg.gameObject;
            _selected = 0;
            _atPen = false;
            _arrivalStarted = false;
            State = Phase.Carrying;
            _label.text = "HATCH";
            _action.interactable = true;
            _action.gameObject.SetActive(false);
            UpdateHeldEggRotation();
        }
        private void LateUpdate()
        {
            if (State == Phase.Carrying) UpdateHeldEggRotation();
        }
        private void UpdateHeldEggRotation()
        {
            // Follow the carrying animation's position without inheriting the hip's tilt.
            if (_egg != null)
                _egg.transform.rotation = Quaternion.Euler(0f, _player.transform.eulerAngles.y, 0f);
        }
        private bool InsidePen()
        {
            Vector3 p = _pen.transform.InverseTransformPoint(_player.transform.position) - _pen.center;
            return Mathf.Abs(p.x) < _pen.size.x * .5f && Mathf.Abs(p.z) < _pen.size.z * .5f;
        }
        private bool NearEgg()
        {
            Vector3 delta = _player.transform.position - _nest.position;
            delta.y = 0f;
            return delta.sqrMagnitude <= _openRadius * _openRadius;
        }
        private void UpdateOpenVisibility()
        {
            bool nearby = NearEgg();
            _action.gameObject.SetActive(nearby);
            _tutorial.SetStealHintVisible(nearby && State == Phase.Ready);
        }
        private void Update()
        {
            if (State == Phase.Carrying)
            {
                bool inside = InsidePen();
                if (_stealFlow && inside && !_arrivalStarted)
                {
                    _arrivalStarted = true;
                    _tutorial.HideAll();
                    _line.StopDraw();
                    if (_arrival != null) _arrival.Begin();
                }
                bool available = inside && (!_stealFlow || NearEgg() && (_arrival == null || !_arrival.IsWalking));
                if (available != _atPen)
                {
                    _atPen = available; _label.text = "HATCH";
                    _action.gameObject.SetActive(available); _tutorial.SetStealHintVisible(available);
                    if (inside) _line.StopDraw(); else _line.StartDraw(_nest, _player.transform);
                }
            }
            else if (State == Phase.Placing)
            {
                _elapsed += Time.deltaTime;
                float t = Mathf.Clamp01(_elapsed / _eggJumpSeconds);
                _egg.transform.SetPositionAndRotation(
                    Vector3.Lerp(_jumpStart, _jumpEnd, t) + Vector3.up * (4f * _eggJumpHeight * t * (1f - t)),
                    Quaternion.Slerp(_jumpRotation, Quaternion.identity, t));
                if (t >= 1f)
                {
                    AddPlacedEggCollider();
                    BeginIncubation();
                    if (_arrival != null) _arrival.Finish();
                }
            }
            else if (State == Phase.Incubating)
            {
                _elapsed += Time.deltaTime; _countdown.Progress = _elapsed / _incubationSeconds;
                int tick = Mathf.FloorToInt(_elapsed);
                if (tick != _lastTick && tick < _incubationSeconds) { _lastTick = tick; Sound(_tickSound); }
                if (_elapsed >= _incubationSeconds)
                {
                    State = Phase.Ready; _action.interactable = true; _countdown.gameObject.SetActive(false);
                    Sound(_readySound);
                }
                UpdateOpenVisibility();
            }
            else if (State == Phase.Ready)
            {
                UpdateOpenVisibility();
            }
            else if (State == Phase.Revealing)
            {
                _elapsed += Time.deltaTime;
                if (_elapsed < _hatchShakeSeconds)
                {
                    ShakeEgg();
                    return;
                }
                if (!_shellOpened) OpenShell();
                float revealElapsed = _elapsed - _hatchShakeSeconds;
                if (_stealFlow)
                {
                    if (!_revealSpawned && revealElapsed >= .4f) SpawnHatchling();
                    if (revealElapsed >= _revealSeconds)
                    {
                        State = Phase.Complete;
                        HatchFinished?.Invoke();
                    }
                    return;
                }
                if (revealElapsed >= 3f)
                {
                    State = Phase.Complete; _cameraInput.enabled = false;
                    _player.IsWorking = false;
                    _player.GetComponent<Rigidbody>().linearVelocity = Vector3.zero;
                    _cta.transform.SetAsLastSibling(); _cta.Show();
                    GameManager.Instance.CompleteEggRaising(); Sound(_ctaSound);
                }
            }
        }
        public void Act()
        {
            if (State == Phase.Carrying && InsidePen())
            {
                if (_egg == null || _stealFlow && (!NearEgg() || _arrival != null && _arrival.IsWalking)) return;
                if (_stealFlow)
                {
                    JumpIntoNest();
                    return;
                }
                State = Phase.Incubating;
                _player.SetCarryingEgg(false);
                // Put the egg ahead of the player, clamped inside the existing pen.
                Vector3 placement = _nest.position;
                if (!_stealFlow)
                {
                    Vector3 local = _pen.transform.InverseTransformPoint(_player.transform.position + _player.transform.forward * 3f);
                    Vector3 half = _pen.size * .5f;
                    local.x = Mathf.Clamp(local.x, _pen.center.x - half.x + 3f, _pen.center.x + half.x - 3f);
                    local.z = Mathf.Clamp(local.z, _pen.center.z - half.z + 3f, _pen.center.z + half.z - 3f);
                    placement = _pen.transform.TransformPoint(local); placement.y = _nest.position.y;
                }
                _nest.position = placement;
                _egg.transform.SetParent(null, true); _egg.transform.SetPositionAndRotation(placement, Quaternion.identity);
                AddPlacedEggCollider();
                BeginIncubation();
            }
            else if (State == Phase.Ready && NearEgg())
            {
                if (_egg == null) return;
                State = Phase.Revealing; _action.gameObject.SetActive(false); _tutorial.HideAll();
                _revealSpawned = false;
                _shellOpened = false;
                _eggRestPosition = _egg.transform.position;
                _eggRestRotation = _egg.transform.rotation;
                _eggRestScale = _egg.transform.localScale;
                // Wobbling the shell is visual; its placed collider must not push the player.
                foreach (var collider in _egg.GetComponents<Collider>()) collider.enabled = false;
                _elapsed = 0f;
            }
        }
        private void BeginIncubation()
        {
            State = Phase.Incubating;
            _tutorial.HideAll(); _line.StopDraw(); _label.text = "OPEN"; _action.interactable = false;
            _countdown.Progress = 0f; _countdown.gameObject.SetActive(true);
            _elapsed = 0f; _lastTick = 0; Sound(_placeSound);
            UpdateOpenVisibility();
        }

        private Bounds EggBounds()
        {
            var renderers = _egg.GetComponentsInChildren<MeshRenderer>();
            Bounds bounds = new Bounds(_egg.transform.position, Vector3.zero);
            for (int i = 0; i < renderers.Length; i++)
            {
                if (i == 0) bounds = renderers[i].bounds;
                else bounds.Encapsulate(renderers[i].bounds);
            }
            return bounds;
        }

        private void JumpIntoNest()
        {
            State = Phase.Placing;
            _player.SetCarryingEgg(false);
            _action.gameObject.SetActive(false);
            _tutorial.HideAll(); _line.StopDraw();
            _egg.transform.SetParent(null, true);
            foreach (var collider in _egg.GetComponentsInChildren<Collider>()) collider.enabled = false;
            _jumpStart = _egg.transform.position;
            _jumpRotation = _egg.transform.rotation;
            // Measure the upright mesh, not its hand pivot, so the shell seats in the nest bowl.
            _egg.transform.rotation = Quaternion.identity;
            Bounds bounds = EggBounds();
            Vector3 seat = _nest.position;
            if (_nestVisual != null)
            {
                Bounds bowl = _nestVisual.bounds;
                float diameter = Mathf.Max(bounds.size.x, bounds.size.z);
                float fit = Mathf.Min(bowl.size.x, bowl.size.z) * .72f;
                if (diameter > fit && diameter > .001f)
                {
                    _egg.transform.localScale *= fit / diameter;
                    bounds = EggBounds();
                }
                seat = new Vector3(bowl.center.x, bowl.min.y + .12f, bowl.center.z);
            }
            _jumpEnd = _egg.transform.position + new Vector3(seat.x - bounds.center.x,
                seat.y - bounds.min.y, seat.z - bounds.center.z);
            _egg.transform.rotation = _jumpRotation;
            _nest.position = seat;
            _elapsed = 0f;
        }

        private void ShakeEgg()
        {
            if (_egg == null) return;
            float progress = Mathf.Clamp01(_elapsed / _hatchShakeSeconds);
            float phase = progress * Mathf.PI * (8f + progress * 4f);
            float wobble = Mathf.Sin(phase);
            float tilt = Mathf.Lerp(4f, 15f, progress);
            _egg.transform.SetPositionAndRotation(
                _eggRestPosition + new Vector3(wobble * .08f, Mathf.Abs(Mathf.Sin(phase * .5f)) * .16f, 0),
                _eggRestRotation * Quaternion.Euler(wobble * tilt * .3f, 0, wobble * tilt));
            float squash = wobble * .045f;
            _egg.transform.localScale = Vector3.Scale(_eggRestScale, new Vector3(1 + squash, 1 - squash, 1 + squash));
        }
        private void OpenShell()
        {
            _shellOpened = true;
            if (_egg != null) Destroy(_egg);
            if (_stealFlow && _revealAura != null)
            {
                _revealAura.SetActive(true);
                foreach (var particles in _revealAura.GetComponentsInChildren<ParticleSystem>(true))
                {
                    particles.Stop(false, ParticleSystemStopBehavior.StopEmittingAndClear);
                    particles.Play(false);
                }
            }
            if (!_stealFlow) SpawnHatchling();
            Sound(_hatchSound);
        }
        private void OnDisable()
        {
            if (_arrival != null) _arrival.Finish();
            if (State == Phase.Placing && _egg != null) _egg.transform.SetPositionAndRotation(_jumpEnd, Quaternion.identity);
            if (State != Phase.Revealing || _shellOpened || _egg == null) return;
            _egg.transform.SetPositionAndRotation(_eggRestPosition, _eggRestRotation);
            _egg.transform.localScale = _eggRestScale;
        }
        private void SpawnHatchling()
        {
            if (_revealSpawned) return;
            _revealSpawned = true;
            Vector3 position = _nest.position;
            if (_stealFlow && _hatchGround != null) position.y = _hatchGround.position.y;
            _revealedMonster = Instantiate(_hatchlings[_selected], position, Quaternion.identity);
            _revealedMonster.transform.localScale *= _creatureScaleMultiplier;
            _revealedMonster.Bind(_pen, startImmediately: true);
            Sound(_hatchlingRoar);
        }
        private void AddPlacedEggCollider()
        {
            var renderers = _egg.GetComponentsInChildren<Renderer>();
            if (renderers.Length == 0) return;
            Bounds bounds = renderers[0].bounds;
            for (int i = 1; i < renderers.Length; i++) bounds.Encapsulate(renderers[i].bounds);
            // Added only after detaching, so the held egg never becomes part of the player's body.
            var collider = _egg.AddComponent<BoxCollider>();
            collider.center = _egg.transform.InverseTransformPoint(bounds.center);
            Vector3 scale = _egg.transform.lossyScale;
            collider.size = new Vector3(bounds.size.x / Mathf.Abs(scale.x),
                bounds.size.y / Mathf.Abs(scale.y), bounds.size.z / Mathf.Abs(scale.z));
            collider.isTrigger = false;
        }
        private void Sound(AudioClip clip) { if (AudioManager.Instance != null) AudioManager.Instance.PlayOneShot(clip); }
        private void OnDestroy() { if (_action != null) _action.onClick.RemoveListener(Act); }
    }
}
