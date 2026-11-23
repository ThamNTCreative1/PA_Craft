using UnityEngine;

namespace Playable.PetRescue
{
    public sealed class RescueTntHazard : MonoBehaviour
    {
        [SerializeField] private float _hitRadius = .65f, _blastRadius = 1.6f;
        [SerializeField] private GameObject _visual, _burst;
        [SerializeField] private ParticleSystem[] _particles;
        [SerializeField] private RescueCrater _crater;
        [SerializeField] private float _craterDelay = 0;
        private float _effectTime;
        private bool _craterPending;
        /// Ground collapses shortly after the blast so a runner keeps going a few steps before dropping.
        public bool CraterPending { get { return _craterPending; } }
        public bool Armed { get; private set; } = true;
        public float HitFraction(Vector3 from, Vector3 to)
        {
            if (!Armed) return -1;
            Vector2 a = new Vector2(from.x - transform.position.x, from.z - transform.position.z);
            Vector2 d = new Vector2(to.x - from.x, to.z - from.z);
            float c = a.sqrMagnitude - _hitRadius * _hitRadius;
            if (c <= 0) return 0;
            float length = d.sqrMagnitude;
            if (length < .000001f) return -1;
            float b = Vector2.Dot(a, d), discriminant = b * b - length * c;
            if (discriminant < 0) return -1;
            float t = (-b - Mathf.Sqrt(discriminant)) / length;
            return t >= 0 && t <= 1 ? t : -1;
        }
        public bool TryHit(Vector3 from, Vector3 to) { return HitFraction(from, to) >= 0; }
        public bool ContainsBlast(Vector3 position)
        {
            Vector3 d = position - transform.position; d.y = 0;
            // World-space subtraction can round a point exactly on the radius outward.
            return d.sqrMagnitude <= _blastRadius * _blastRadius + .00001f;
        }
        public void Explode()
        {
            if (!Armed) return;
            Armed = false; _visual.SetActive(false);
            _craterPending = _crater != null;
            _burst.SetActive(true); _effectTime = 0;
            for (int i = 0; i < _particles.Length; i++) _particles[i].Play(false);
        }
        public void TickEffect(float dt)
        {
            if (Armed) return;
            _effectTime += dt;
            if (_craterPending && _effectTime >= _craterDelay) { _craterPending = false; _crater.Open(); }
            if (!_burst.activeSelf || _effectTime < .1f) return;
            for (int i = 0; i < _particles.Length; i++)
                if (_particles[i].isPlaying || _particles[i].particleCount > 0) return;
            _burst.SetActive(false);
        }
    }
}
