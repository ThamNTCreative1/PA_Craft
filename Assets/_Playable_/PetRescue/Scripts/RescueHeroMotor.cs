using UnityEngine;

namespace Playable.PetRescue
{
    /// Free XZ movement on the flat field (the flow passes a world-space stick) with a jump arc.
    public sealed class RescueHeroMotor : MonoBehaviour
    {
        [LunaPlaygroundField("Player Speed", 2, "Game Settings")]
        [SerializeField] private float _speed = 4.5f;
        [SerializeField] private float _radius = .3f, _deadZone = .12f, _turnSharpness = 14;
        [SerializeField] private float _knockbackDistance = 2.5f, _knockbackTime = .25f, _stunTime = .8f;
        [SerializeField] private float _jumpSpeed = 7, _gravity = 22;
        [SerializeField] private Animator _animator;
        private Transform _visual;
        private Quaternion _visualRest = Quaternion.identity;
        private bool _stopped, _running;
        private float _stun, _knockElapsed;
        private Vector3 _knockDirection;
        private float _vy;

        public bool Stunned { get { return _stun > 0; } }
        /// Actually moved this frame under player control (drives footsteps and tutorial).
        public bool Moving { get; private set; }
        public float Radius { get { return _radius; } }
        public float StunTime { get { return _stunTime; } }
        public float KnockbackDistance { get { return _knockbackDistance; } }
        public bool Airborne { get { return transform.position.y > .0001f || _vy > 0; } }
        /// Feet height above the ground.
        public float Height { get { return transform.position.y; } }
        public float JumpSpeed { get { return _jumpSpeed; } }

        public bool TryJump()
        {
            if (_stopped || _stun > 0 || Airborne) return false;
            _vy = _jumpSpeed; SetRunning(false);
            return true;
        }

        private void Vertical(float dt)
        {
            if (!Airborne) return;
            _vy -= _gravity * dt;
            Vector3 p = transform.position; p.y = Mathf.Max(0, p.y + _vy * dt);
            if (p.y <= 0) _vy = 0;
            transform.position = p;
        }

        public void Initialize(Transform visual)
        {
            _visual = visual;
            if (_visual != null) _visualRest = _visual.localRotation;
            if (_animator == null) throw new System.InvalidOperationException("Hero Animator is required.");
            _animator.applyRootMotion = false; _animator.speed = 1;
        }

        public void Move(float dt, Vector2 stick, RescueArena arena)
        {
            Moving = false;
            if (_stopped) return;
            Vertical(dt);
            if (_stun > 0) { TickStun(dt, arena); return; }
            float magnitude = stick.magnitude;
            if (magnitude <= _deadZone) { SetRunning(false); return; }
            float drive = Mathf.Clamp01((magnitude - _deadZone) / (1 - _deadZone) * 1.6f);
            Vector3 direction = new Vector3(stick.x / magnitude, 0, stick.y / magnitude);
            Vector3 before = transform.position;
            Vector3 after = arena.Slide(before, direction * (_speed * drive * dt), _radius);
            transform.position = after;
            Vector3 moved = after - before; moved.y = 0;
            Moving = moved.sqrMagnitude > .0000001f;
            transform.rotation = Quaternion.Slerp(transform.rotation, Quaternion.LookRotation(direction), 1 - Mathf.Exp(-_turnSharpness * dt));
            // No jump clip: the idle pose reads as a jump while airborne.
            SetRunning(!Airborne);
        }

        /// Blast push away from `origin` (ease-out over the knockback time) followed by a stun that ignores input.
        public void Knockback(Vector3 origin)
        {
            if (_stopped) return;
            Vector3 away = transform.position - origin; away.y = 0;
            _knockDirection = away.sqrMagnitude > .0001f ? away.normalized : -transform.forward;
            _knockElapsed = 0; _stun = _stunTime;
            SetRunning(false);
        }

        private void TickStun(float dt, RescueArena arena)
        {
            if (_knockElapsed < _knockbackTime)
            {
                float s0 = _knockElapsed / _knockbackTime;
                _knockElapsed = Mathf.Min(_knockbackTime, _knockElapsed + dt);
                float s1 = _knockElapsed / _knockbackTime;
                float distance = _knockbackDistance * (EaseOut(s1) - EaseOut(s0));
                transform.position = arena.Slide(transform.position, _knockDirection * distance, _radius);
            }
            _stun = Mathf.Max(0, _stun - dt);
            if (_visual == null) return;
            float wobble = _stun > 0 ? Mathf.Sin(_stun * 40) * 12 * (_stun / _stunTime) : 0;
            _visual.localRotation = _visualRest * Quaternion.Euler(0, 0, wobble);
        }

        private static float EaseOut(float s) { return 1 - (1 - s) * (1 - s); }

        public void Stop()
        {
            _stopped = true; Moving = false; _vy = 0;
            Vector3 p = transform.position; p.y = 0; transform.position = p;
            if (_visual != null) _visual.localRotation = _visualRest;
            if (_animator != null) _animator.SetBool("Running", false);
        }

        private void SetRunning(bool value)
        {
            if (_running == value) return;
            _running = value; _animator.SetBool("Running", value);
        }
    }
}
