using UnityEngine;

namespace Playable.PetRescue
{
    public sealed class RescuePetFollower : MonoBehaviour
    {
        private const float Radius = .25f, Gravity = 22, UnstickTime = .4f;
        [SerializeField] private Animator _animator;
        [SerializeField] private Vector3 _offset;
        private Transform _hero;
        private bool _stopped;
        private bool _running;
        private RescuePetFollower[] _companions;
        private float _travelTime, _vy, _blockedTime;
        private bool _grounded = true, _ghost;
        private Quaternion _restRotation;
        public int Id { get; private set; }
        public bool IsFollowing { get; private set; } = true;
        public void Initialize(int id, Transform hero, RescuePetFollower[] companions)
        {
            Id = id; _hero = hero; _companions = companions; _restRotation = transform.rotation;
            transform.position = hero.position + _offset;
            if (_animator == null) throw new System.InvalidOperationException("Pet Animator is required: " + name);
            _animator.applyRootMotion = false;
        }
        /// Follows the hero. Pets wait while the hero is stuck, jump with the hero and hop up terrace edges.
        public void Advance(float dt, bool heroStuck, RescueCourse course)
        {
            if (!IsFollowing || _stopped) return;
            Vector3 before = transform.position, p = before;
            if (!heroStuck)
            {
                _travelTime += dt;
                Vector3 target = _hero.position + _offset;
                float phase = Id * 2.17f;
                target.x += Mathf.Sin(_travelTime * 1.7f + phase) * .18f;
                target.z += Mathf.Sin(_travelTime * 1.13f + phase * 1.3f) * .12f;
                for (int i = 0; i < _companions.Length; i++)
                {
                    var other = _companions[i];
                    if (other == this || !other.IsFollowing) continue;
                    Vector3 apart = before - other.transform.position; apart.y = 0;
                    float distance = apart.magnitude;
                    if (distance > .001f && distance < .55f) target += apart / distance * (.55f - distance) * .7f;
                }
                target.x = Mathf.Clamp(target.x, -2.6f, 2.6f);
                float trailingLimit = Mathf.Max(2.1f, Mathf.Abs(_offset.z) + .35f);
                target.z = Mathf.Clamp(target.z, _hero.position.z - trailingLimit, _hero.position.z - .5f);
                float k = 1 - Mathf.Exp(-12 * dt);
                float x = Mathf.Lerp(before.x, target.x, k), z = Mathf.Lerp(before.z, target.z, k);
                bool blocked = false;
                if (!_ghost && course.HitsWall(x, before.z, Radius)) { x = before.x; blocked = true; }
                if (!_ghost && course.HitsWall(x, z, Radius)) { z = before.z; blocked = true; }
                _blockedTime = blocked ? _blockedTime + dt : 0;
                if (_blockedTime > UnstickTime) _ghost = true;
                if (_ghost && !course.HitsWall(before.x, before.z, Radius) && _blockedTime == 0) _ghost = false;
                float ahead = course.HeightAt(x, z);
                if (ahead > p.y + .05f)
                {
                    // Hop up a crater terrace instead of walking through its side.
                    if (_grounded) { _vy = Mathf.Sqrt(2 * Gravity * (ahead - p.y + .35f)); _grounded = false; }
                    if (p.y < ahead - .05f) { x = before.x; z = before.z; }
                }
                p.x = x; p.z = z;
            }
            float ground = course.HeightAt(p.x, p.z);
            if (_grounded && ground < p.y - .001f) { _grounded = false; _vy = 0; }
            if (_grounded) p.y = ground;
            else
            {
                _vy -= Gravity * dt; p.y += _vy * dt;
                if (p.y <= ground && _vy <= 0) { p.y = ground; _vy = 0; _grounded = true; }
            }
            transform.position = p;
            SetRunning(!heroStuck || !_grounded);
            Vector3 motion = p - before; motion.y = 0;
            if (motion.sqrMagnitude > .000001f)
            {
                float yaw = Mathf.Clamp(Mathf.Atan2(motion.x, Mathf.Max(.04f, motion.z)) * Mathf.Rad2Deg, -28, 28);
                transform.rotation = Quaternion.Slerp(transform.rotation, Quaternion.Euler(0, yaw, 0) * _restRotation, 1 - Mathf.Exp(-8 * dt));
            }
        }
        /// Jumps together with the hero.
        public void Jump(float speed)
        {
            if (!IsFollowing || _stopped || !_grounded) return;
            // A pet already on the road only needs a small celebratory hop.
            _vy = transform.position.y > -.01f ? speed * .6f : speed; _grounded = false;
        }
        public void MarkLost() { IsFollowing = false; SetRunning(false); gameObject.SetActive(false); }
        public void MarkRescued() { IsFollowing = false; SetRunning(false); }
        public void Stop() { _stopped = true; SetRunning(false); }
        private void SetRunning(bool value)
        {
            if (_running == value) return;
            _running = value; _animator.SetBool("Running", value);
        }
    }
}
