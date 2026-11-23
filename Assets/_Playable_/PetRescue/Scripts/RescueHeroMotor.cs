using UnityEngine;

namespace Playable.PetRescue
{
    public sealed class RescueHeroMotor : MonoBehaviour
    {
        [LunaPlaygroundField("Player Speed", 2, "Game Settings")]
        [SerializeField] private float _speed = 3.5f;
        [LunaPlaygroundField("Swipe Sensitivity", 3, "Game Settings")]
        [SerializeField] private float _swipeSensitivity = 4.5f;
        [SerializeField] private float _xLimit = 2.5f, _stopZ = 73;
        private const float MaxStep = .02f;
        [SerializeField] private float _gravity = 22, _jumpSpeed = 9.5f, _radius = .3f;
        [SerializeField] private Animator _animator;
        private Transform _visual;
        private bool _stopped, _running, _grounded = true, _jumping, _movingOnGround;
        private float _vy, _airSpeed;
        /// Standing on a lowered crater tile: the hero waits for a swipe-up.
        public bool InPit { get { return InPitAt(transform.position.y); } }
        public bool Airborne { get { return !_grounded; } }
        public bool Landed { get; private set; }
        /// Actually running on the ground (not stuck, blocked or airborne).
        public bool RunningOnGround { get { return _movingOnGround; } }
        public float JumpSpeed { get { return _jumpSpeed; } }
        public float Gravity { get { return _gravity; } }
        public void Initialize(Transform visual)
        {
            _visual = visual;
            if (_animator == null) throw new System.InvalidOperationException("Hero Animator is required.");
            _animator.applyRootMotion = false; _animator.speed = 1;
        }
        public bool TryJump(RescueCourse course)
        {
            if (_stopped || !InPit) return false;
            Vector3 p = transform.position;
            float targetZ = p.z;
            while (targetZ < _stopZ && (course.HeightAt(p.x, targetZ) < -.01f || course.HeightAt(p.x, targetZ + .5f) < -.01f)) targetZ += .25f;
            targetZ = Mathf.Min(_stopZ, targetZ + .5f);
            float riseToRim = (_jumpSpeed - Mathf.Sqrt(_jumpSpeed * _jumpSpeed - 2 * _gravity * (-RescueCourse.StepHeight - p.y))) / _gravity;
            float landOnRoad = (_jumpSpeed + Mathf.Sqrt(_jumpSpeed * _jumpSpeed + 2 * _gravity * p.y)) / _gravity;
            _airSpeed = Mathf.Max(_speed, (targetZ - p.z) / Mathf.Max(.1f, landOnRoad - riseToRim));
            _vy = _jumpSpeed; _grounded = false; _jumping = true;
            return true;
        }
        public void Advance(float dt, float normalizedDelta, RescueCourse course)
        {
            Landed = false;
            if (_stopped) return;
            Vector3 p = transform.position, before = p;
            bool stuck = InPit;
            // Fixed sub-steps keep the jump arc and rim checks identical at low frame rates.
            int steps = Mathf.Max(1, Mathf.CeilToInt(dt / MaxStep));
            float step = dt / steps, stepDelta = normalizedDelta / steps;
            for (int i = 0; i < steps; i++) Step(ref p, step, stepDelta, course);
            transform.position = p;
            Vector2 moved = new Vector2(p.x - before.x, p.z - before.z);
            _movingOnGround = _grounded && moved.sqrMagnitude > .0000001f;
            // The run cycle never stops during play: against a wall or in a pit the hero runs in place
            // (footsteps only play while actually moving).
            SetRunning(true);
            if (_visual != null) _visual.localRotation = Quaternion.Euler(0, stuck ? 0 : Mathf.Clamp(normalizedDelta * 200, -15, 15), 0);
        }
        private void Step(ref Vector3 p, float dt, float normalizedDelta, RescueCourse course)
        {
            // Ground that dropped away under the feet starts the fall before any horizontal move.
            if (_grounded && course.HeightAt(p.x, p.z) < p.y - .001f) { _grounded = false; _vy = 0; }
            // A falling (not jumping) hero measures steps from the ground below, so a crater that opens
            // under the feet cannot be skipped by running onto its far rim mid-fall.
            float feet = _grounded || _jumping ? p.y : Mathf.Min(p.y, course.HeightAt(p.x, p.z));
            // In a pit the hero keeps running straight along the floor (no steering) until the crater wall stops him.
            if (!InPitAt(p.y))
            {
                float x = Mathf.Clamp(p.x + normalizedDelta * _swipeSensitivity, -_xLimit, _xLimit);
                if (!course.IsBlocked(x, p.z, feet, _radius)) p.x = x;
            }
            float z = Mathf.Min(_stopZ, p.z + (_jumping ? _airSpeed : _speed) * dt);
            if (!course.IsBlocked(p.x, z, feet, _radius)) p.z = z;
            float ground = course.HeightAt(p.x, p.z);
            if (_grounded && ground < p.y - .001f) { _grounded = false; _vy = 0; }
            if (_grounded) { p.y = ground; return; }
            _vy -= _gravity * dt; p.y += _vy * dt;
            // Rising past a slightly higher terrace only lifts the feet; landing happens on the way down.
            if (p.y <= ground && _vy > 0) p.y = ground;
            else if (p.y <= ground) { p.y = ground; _vy = 0; _grounded = true; _jumping = false; Landed = true; }
        }
        private bool InPitAt(float y) { return _grounded && y < -RescueCourse.StepHeight; }
        public void Stop()
        {
            _stopped = true;
            if (_animator != null) { _animator.SetBool("Running", false); _animator.speed = 0; }
        }
        private void SetRunning(bool value)
        {
            if (_running == value) return;
            _running = value; _animator.SetBool("Running", value);
        }
    }
}
