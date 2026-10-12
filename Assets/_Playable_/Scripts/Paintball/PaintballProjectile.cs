using UnityEngine;

namespace Playable
{
    public sealed class PaintballProjectile : MonoBehaviour
    {
        [SerializeField] private float _speed = 40f;
        [SerializeField] private float _lifeTime = 4f;
        [SerializeField] private float _damage = 10f;
        [SerializeField] private float _radius = 0.05f;
        [SerializeField] private LayerMask _hitMask = ~0;
        [SerializeField] private Transform _visual;
        [SerializeField] private Transform _impact;
        [SerializeField] private ParticleSystem[] _flightParticles;
        [SerializeField] private ParticleSystem[] _impactParticles;
        [SerializeField] private float _impactLifetime = 2f;
        private readonly RaycastHit[] _hits = new RaycastHit[32];
        private PlayerPaintballController _owner;
        private Vector3 _velocity;
        private float _remaining;
        private bool _flying, _paused;
        public bool IsBusy => gameObject.activeSelf;

        public void Launch(PlayerPaintballController owner, Vector3 position, Vector3 velocity)
        {
            _owner = owner;
            _velocity = velocity + owner.Player.Velocity;
            transform.position = position;
            if (velocity.sqrMagnitude > 0.001f) transform.rotation = Quaternion.LookRotation(velocity);
            _remaining = _lifeTime;
            _flying = true;
            _paused = false;
            _visual.gameObject.SetActive(true);
            _impact.gameObject.SetActive(false);
            gameObject.SetActive(true);
            RestartParticles(_flightParticles);
        }

        public float Speed => _speed;
        public void SetPaused(bool paused)
        {
            _paused = paused;
            PauseParticles(_flightParticles, paused);
            PauseParticles(_impactParticles, paused);
        }
        public void ResetProjectile()
        {
            _owner = null;
            _flying = false;
            ClearParticles(_flightParticles);
            ClearParticles(_impactParticles);
            gameObject.SetActive(false);
        }

        private static void ClearParticles(ParticleSystem[] particles)
        {
            if (particles == null) return;
            foreach (var p in particles) if (p != null) p.Stop(false, ParticleSystemStopBehavior.StopEmittingAndClear);
        }
        private static void RestartParticles(ParticleSystem[] particles)
        {
            ClearParticles(particles);
            if (particles == null) return;
            foreach (var p in particles) if (p != null) p.Play(false);
        }
        private static void PauseParticles(ParticleSystem[] particles, bool paused)
        {
            if (particles == null) return;
            foreach (var p in particles)
                if (p != null && p.gameObject.activeInHierarchy)
                { if (paused) p.Pause(false); else if (p.isPaused) p.Play(false); }
        }

        private void FixedUpdate()
        {
            if (_paused) return;
            _remaining -= Time.fixedDeltaTime;
            if (_remaining <= 0f) { ResetProjectile(); return; }
            if (!_flying) return;
            Vector3 travel = _velocity * Time.fixedDeltaTime;
            int count = Physics.SphereCastNonAlloc(transform.position, _radius, travel.normalized,
                _hits, travel.magnitude, _hitMask, QueryTriggerInteraction.Ignore);
            float nearest = float.PositiveInfinity;
            int index = -1;
            for (int i = 0; i < count; i++)
            {
                if (_owner != null && _hits[i].transform.IsChildOf(_owner.Player.transform)) continue;
                if (_hits[i].distance >= nearest) continue;
                nearest = _hits[i].distance;
                index = i;
            }
            if (index >= 0)
            {
                RaycastHit hit = _hits[index];
                var npc = hit.collider.GetComponentInParent<PaintballNpcController>();
                if (npc != null) npc.ReceiveHit(_owner, _damage);
                transform.position = hit.point + hit.normal * 0.02f;
                _visual.gameObject.SetActive(false);
                ClearParticles(_flightParticles);
                _impact.gameObject.SetActive(true);
                _impact.rotation = Quaternion.LookRotation(hit.normal);
                RestartParticles(_impactParticles);
                _flying = false;
                _remaining = _impactLifetime;
                return;
            }
            transform.position += travel;
            _velocity *= Mathf.Clamp01(1f - 0.1f * Time.fixedDeltaTime);
        }
    }
}
