using UnityEngine;

namespace Playable.PetRescue
{
    /// A pet wanders around its home until the hero collects it, then trails the hero.
    public sealed class RescuePetFollower : MonoBehaviour
    {
        private const float Radius = .25f, Spacing = .6f;
        [SerializeField] private Animator _animator;
        [SerializeField] private float _roamRange = 2.5f, _walkSpeed = 1.2f, _followSpeed = 5.5f;
        private Transform _hero;
        private RescuePetFollower[] _companions;
        private RescueArena _arena;
        private System.Random _random;
        private Vector3 _home, _waypoint, _followOffset;
        private Quaternion _restRotation;
        private float _pause, _sprint, _vy, _height;
        private const float Gravity = 22;
        private bool _stopped, _running;

        public int Id { get; private set; }
        public bool Collected { get; private set; }
        public Vector3 Home { get { return _home; } }
        public float RoamRange { get { return _roamRange; } }

        public void Initialize(int id, Transform hero, RescuePetFollower[] companions, RescueArena arena, int seed)
        {
            if (_animator == null) throw new System.InvalidOperationException("Pet Animator is required: " + name);
            Id = id; _hero = hero; _companions = companions; _arena = arena;
            _random = new System.Random(seed);
            _home = transform.position; _waypoint = _home; _restRotation = transform.rotation;
            _pause = Range(0, .6f);
            _animator.applyRootMotion = false;
        }

        public void Tick(float dt)
        {
            if (_stopped) return;
            Vector3 before = transform.position;
            Vector3 after = Collected ? FollowStep(before, dt) : WanderStep(before, dt);
            if (_height > 0 || _vy > 0) { _vy -= Gravity * dt; _height = Mathf.Max(0, _height + _vy * dt); if (_height <= 0) _vy = 0; }
            after.y = _height;
            transform.position = after;
            Vector3 motion = after - before; motion.y = 0;
            bool moving = motion.sqrMagnitude > .000001f;
            SetRunning(moving);
            if (moving)
            {
                float yaw = Mathf.Atan2(motion.x, motion.z) * Mathf.Rad2Deg;
                transform.rotation = Quaternion.Slerp(transform.rotation, Quaternion.Euler(0, yaw, 0) * _restRotation, 1 - Mathf.Exp(-10 * dt));
            }
        }

        private Vector3 WanderStep(Vector3 p, float dt)
        {
            if (_pause > 0) { _pause -= dt; return p; }
            Vector3 to = _waypoint - p; to.y = 0;
            float distance = to.magnitude;
            if (distance < .15f) { PickWaypoint(); _pause = Range(.5f, 1.5f); return p; }
            float speed = _walkSpeed * (_sprint > 0 ? 2.5f : 1);
            _sprint = Mathf.Max(0, _sprint - dt);
            Vector3 next = _arena.Slide(p, to / distance * Mathf.Min(distance, speed * dt), Radius);
            // Blocked by a wall or the border: choose another spot instead of pushing forever.
            if ((next - p).sqrMagnitude < .0000001f) { PickWaypoint(); _pause = Range(.2f, .6f); }
            return Separate(next, dt);
        }

        private Vector3 FollowStep(Vector3 p, float dt)
        {
            Vector3 target = _hero.position + _hero.rotation * _followOffset;
            Vector3 to = target - p; to.y = 0;
            float distance = to.magnitude;
            if (distance < .05f) return p;
            float speed = Mathf.Max(_followSpeed, distance * 3);
            // Collected pets glide over trunks rather than getting stuck behind them; the border still holds.
            return _arena.ClampInside(Separate(p + to / distance * Mathf.Min(distance, speed * dt), dt), Radius);
        }

        private Vector3 Separate(Vector3 p, float dt)
        {
            for (int i = 0; i < _companions.Length; i++)
            {
                var other = _companions[i];
                if (other == this || !other.gameObject.activeInHierarchy) continue;
                Vector3 apart = p - other.transform.position; apart.y = 0;
                float distance = apart.magnitude;
                if (distance > .001f && distance < Spacing) p += apart / distance * Mathf.Min(Spacing - distance, 3 * dt);
            }
            return p;
        }

        private void PickWaypoint()
        {
            for (int attempt = 0; attempt < 6; attempt++)
            {
                float angle = Range(0, Mathf.PI * 2), radius = _roamRange * Mathf.Sqrt(Range(0, 1));
                Vector3 candidate = _home + new Vector3(Mathf.Cos(angle) * radius, 0, Mathf.Sin(angle) * radius);
                if (_arena.IsFree(candidate.x, candidate.z, Radius)) { _waypoint = candidate; return; }
            }
            _waypoint = _home;
        }

        /// Collected pets trail the hero in a two-column line; `slot` is the collection order.
        public void Collect(int slot)
        {
            if (Collected) return;
            Collected = true; _pause = 0;
            float side = (slot % 2 == 0 ? -1 : 1) * (.45f + .15f * (slot / 2));
            _followOffset = new Vector3(side, 0, -(1 + .45f * slot));
        }

        /// A nearby blast sends a wandering pet sprinting away.
        public void ScatterFrom(Vector3 origin)
        {
            if (Collected || _stopped) return;
            Vector3 away = transform.position - origin; away.y = 0;
            if (away.sqrMagnitude < .0001f) away = Vector3.forward;
            _waypoint = _arena.ClampInside(transform.position + away.normalized * 3, Radius);
            _pause = 0; _sprint = 1;
        }

        /// Collected pets hop together with the hero's jump.
        public void Hop(float speed)
        {
            if (!Collected || _stopped || _height > 0 || _vy > 0) return;
            _vy = speed * .85f;
        }

        public void Stop() { _stopped = true; SetRunning(false); }

        private float Range(float min, float max) { return min + (float)_random.NextDouble() * (max - min); }

        private void SetRunning(bool value)
        {
            if (_running == value) return;
            _running = value; _animator.SetBool("Running", value);
        }
    }
}
