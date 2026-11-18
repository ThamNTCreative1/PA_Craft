using System;
using UnityEngine;

namespace Playable
{
    /// <summary>
    /// Minimal fishing loop ported from party-craft FishingController (no Opsive/HAVIGAME/PrimeTween/inventory):
    /// hold to charge → release to cast → wait (nibbles) → bite → tap fast to reel → fish shown over the head → ready again.
    /// Update-driven so pausing simply stops the clock.
    /// </summary>
    public sealed class FishingController : MonoBehaviour
    {
        [SerializeField] private FishingRules _rules = new FishingRules();
        [SerializeField] private Transform _player;
        [SerializeField] private FishingLineView _line;
        [SerializeField] private GameObject _rod;
        [SerializeField] private Transform _rodPivot;
        [SerializeField] private float _rodCastAngle = 60f;
        [SerializeField] private float _waterHeight = 11.5f;
        [SerializeField] private float _castArcHeight = 1.5f;
        [Tooltip("Rotates the cast to the rod side so the bobber is not hidden behind the player.")]
        [SerializeField] private float _castYawOffset = 18f;
        [SerializeField] private float _catchHeight = 2.4f;
        [SerializeField] private float _cancelMoveDistance = 0.6f;
        [SerializeField] private GameObject[] _fishModels;
        [SerializeField] private AudioSource _sfx;
        [SerializeField] private AudioClip _castClip;
        [SerializeField] private AudioClip _biteClip;
        [SerializeField] private AudioClip _reelClip;
        [SerializeField] private AudioClip _catchClip;

        public event Action<FishingState> StateChanged;

        public FishingState State { get; private set; }
        public float Charge01 { get; private set; }
        public float Progress01 { get; private set; }
        public float Tension01 => _rules.timeLimit > 0f ? Mathf.Clamp01(_elapsed / _rules.timeLimit) : 0f;

        private bool _paused;
        private float _timer;
        private float _waitTime;
        private float _nibbleA = -1f;
        private float _nibbleB = -1f;
        private float _elapsed;
        private float _nextSurge;
        private float _sway;
        private int _pendingTaps;
        private Vector3 _anchor;
        private Vector3 _castTarget;
        private Vector3 _landing;
        private Vector3 _catchStart;
        private GameObject _fish;
        private Quaternion _rodRestRotation;

        private void Awake()
        {
            if (_rodPivot != null) _rodRestRotation = _rodPivot.localRotation;
            HideFish();
            if (_rod != null) _rod.SetActive(false);
            State = FishingState.None;
        }

        public void Begin()
        {
            if (_rod != null) _rod.SetActive(true);
            _paused = false;
            ResetToReady();
        }

        public void End()
        {
            HideFish();
            if (_line != null) _line.SetVisible(false);
            if (_rod != null) _rod.SetActive(false);
            ResetRod();
            SetState(FishingState.None);
        }

        public void SetPaused(bool paused)
        {
            _paused = paused;
        }

        /// <summary>Button down: start charging, or one reel tap while fighting.</summary>
        public void Press()
        {
            if (_paused) return;
            if (State == FishingState.Ready)
            {
                Charge01 = 0f;
                SetState(FishingState.Charging);
            }
            else if (State == FishingState.Fighting)
            {
                _pendingTaps++;
                Play(_reelClip);
            }
        }

        /// <summary>Button up: release the charged cast.</summary>
        public void Release()
        {
            if (_paused || State != FishingState.Charging) return;
            StartCast();
        }

        private void Update()
        {
            if (_paused || State == FishingState.None) return;
            float dt = Time.deltaTime;
            _timer += dt;

            switch (State)
            {
                case FishingState.Charging:
                    Charge01 = _rules.ChargeStep(Charge01, dt);
                    if (_rodPivot != null)
                        _rodPivot.localRotation = _rodRestRotation * Quaternion.Euler(-_rodCastAngle * 0.5f * Charge01, 0f, 0f);
                    break;
                case FishingState.Casting:
                    UpdateCasting();
                    break;
                case FishingState.Waiting:
                    if (MovedAway()) { ResetToReady(); break; }
                    UpdateWaiting();
                    break;
                case FishingState.Fighting:
                    if (MovedAway()) { ResetToReady(); break; }
                    UpdateFighting(dt);
                    break;
                case FishingState.Catching:
                    UpdateCatching();
                    break;
                case FishingState.Escaped:
                    if (_timer >= _rules.escapedMessageTime) ResetToReady();
                    break;
            }
        }

        private void StartCast()
        {
            if (_player == null || _line == null || _line.RodTip == null) { ResetToReady(); return; }
            _anchor = _player.position;
            Vector3 forward = _player.forward;
            forward.y = 0f;
            if (forward.sqrMagnitude < 0.001f) forward = Vector3.forward;
            forward = Quaternion.Euler(0f, _castYawOffset, 0f) * forward.normalized;
            _castTarget = _player.position + forward * _rules.CastDistance(Charge01);
            _castTarget.y = _waterHeight;
            _landing = Vector3.Lerp(_castTarget, new Vector3(_anchor.x, _waterHeight, _anchor.z), 0.6f);
            _line.SetBobberPosition(_line.RodTip.position);
            _line.SetVisible(true);
            Play(_castClip);
            SetState(FishingState.Casting);
        }

        private void UpdateCasting()
        {
            float duration = Mathf.Max(0.05f, _rules.castDuration);
            float t = Mathf.Clamp01(_timer / duration);
            Vector3 p = Vector3.Lerp(_line.RodTip.position, _castTarget, t);
            p.y += Mathf.Sin(t * Mathf.PI) * _castArcHeight;
            _line.SetBobberPosition(p);
            if (_rodPivot != null)
                _rodPivot.localRotation = _rodRestRotation * Quaternion.Euler(Mathf.Lerp(-_rodCastAngle * 0.5f, _rodCastAngle * 0.4f, t), 0f, 0f);
            if (t < 1f) return;

            ResetRod();
            _waitTime = _rules.RollWait(UnityEngine.Random.value);
            int nibbles = _rules.RollNibbles(UnityEngine.Random.value);
            _nibbleA = nibbles >= 1 ? _waitTime * UnityEngine.Random.Range(0.2f, 0.45f) : -1f;
            _nibbleB = nibbles >= 2 ? _waitTime * UnityEngine.Random.Range(0.55f, 0.8f) : -1f;
            SetState(FishingState.Waiting);
        }

        private void UpdateWaiting()
        {
            float dip = Mathf.Sin(_timer * 3f) * 0.04f;
            if (IsNibbling(_nibbleA) || IsNibbling(_nibbleB)) dip -= 0.15f;
            _line.SetBobberPosition(_castTarget + Vector3.up * dip);
            if (_timer < _waitTime) return;

            Progress01 = _rules.startProgress;
            _elapsed = 0f;
            _pendingTaps = 0;
            _sway = 0f;
            _nextSurge = _rules.RollSurgeDelay(UnityEngine.Random.value);
            Play(_biteClip);
            SetState(FishingState.Fighting);
        }

        private bool IsNibbling(float at)
        {
            return at >= 0f && _timer >= at && _timer < at + 0.25f;
        }

        private void UpdateFighting(float dt)
        {
            _elapsed += dt;
            float surgeSide = 0f;
            if (_elapsed >= _nextSurge)
            {
                Progress01 = _rules.ApplySurge(Progress01);
                _nextSurge = _elapsed + _rules.RollSurgeDelay(UnityEngine.Random.value);
                surgeSide = UnityEngine.Random.value < 0.5f ? -1f : 1f;
            }
            Progress01 = _rules.StepFight(Progress01, dt, _pendingTaps);
            _pendingTaps = 0;

            _sway = Mathf.MoveTowards(_sway, surgeSide * 0.9f, dt * 3f);
            Vector3 side = Vector3.Cross(Vector3.up, (_castTarget - _anchor).normalized);
            Vector3 p = Vector3.Lerp(_castTarget, _landing, Progress01) + side * _sway;
            p.y = _waterHeight - 0.1f + Mathf.Sin(_elapsed * 20f) * 0.05f;
            _line.SetBobberPosition(p);

            if (_rules.IsCaught(Progress01)) StartCatch();
            else if (_rules.IsEscaped(Progress01, _elapsed))
            {
                _line.SetVisible(false);
                SetState(FishingState.Escaped);
            }
        }

        private void StartCatch()
        {
            HideFish();
            int index = FishingRules.PickIndex(_fishModels != null ? _fishModels.Length : 0, UnityEngine.Random.value);
            _fish = index >= 0 ? _fishModels[index] : null;
            _catchStart = _line.Bobber != null ? _line.Bobber.position : _castTarget;
            if (_fish != null)
            {
                _fish.transform.position = _catchStart;
                _fish.SetActive(true);
                _line.SetBobberVisible(false);
            }
            Play(_catchClip);
            SetState(FishingState.Catching);
        }

        private void UpdateCatching()
        {
            float reel = Mathf.Max(0.05f, _rules.reelInDuration);
            float t = Mathf.Clamp01(_timer / reel);
            Vector3 overHead = _player.position + Vector3.up * _catchHeight;
            Vector3 p = Vector3.Lerp(_catchStart, overHead, t);
            p.y += Mathf.Sin(t * Mathf.PI) * 1f;
            _line.SetBobberPosition(p);
            if (_fish != null)
            {
                _fish.transform.position = p;
                _fish.transform.Rotate(0f, 180f * Time.deltaTime, 0f, Space.World);
            }
            if (_timer < reel + _rules.catchHold) return;
            ResetToReady();
        }

        private bool MovedAway()
        {
            if (_player == null) return false;
            Vector3 d = _player.position - _anchor;
            d.y = 0f;
            return d.sqrMagnitude > _cancelMoveDistance * _cancelMoveDistance;
        }

        private void ResetToReady()
        {
            HideFish();
            ResetRod();
            if (_line != null) _line.SetVisible(false);
            Charge01 = 0f;
            Progress01 = 0f;
            _elapsed = 0f;
            SetState(FishingState.Ready);
        }

        private void ResetRod()
        {
            if (_rodPivot != null) _rodPivot.localRotation = _rodRestRotation;
        }

        private void HideFish()
        {
            if (_fishModels == null) return;
            for (int i = 0; i < _fishModels.Length; i++)
                if (_fishModels[i] != null) _fishModels[i].SetActive(false);
            _fish = null;
        }

        private void Play(AudioClip clip)
        {
            if (_sfx != null && clip != null) _sfx.PlayOneShot(clip);
        }

        private void SetState(FishingState state)
        {
            State = state;
            _timer = 0f;
            if (StateChanged != null) StateChanged(state);
        }
    }
}
