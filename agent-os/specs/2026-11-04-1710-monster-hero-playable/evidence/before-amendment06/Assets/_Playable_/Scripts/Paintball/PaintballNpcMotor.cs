using UnityEngine;

namespace Playable
{
    public sealed class PaintballNpcMotor : MonoBehaviour
    {
        [SerializeField] private Rigidbody _body;
        [SerializeField] private CapsuleCollider _capsule;
        [SerializeField] private Transform[] _route;
        [SerializeField] private LayerMask _worldMask = ~0;
        private readonly RaycastHit[] _hits = new RaycastHit[32];
        private Vector3 _home;
        private Quaternion _homeRotation;
        private bool _initialized;
        public Vector3 Home => _home;
        public Vector3 Velocity { get; private set; }
        public int RouteCount => _route == null ? 0 : _route.Length;
        public Vector3 RoutePoint(int index) => _route[index].position;

        private void Initialize()
        {
            if (_initialized) return;
            _home = transform.position;
            _homeRotation = transform.rotation;
            _body.isKinematic = true;
            _body.useGravity = false;
            _initialized = true;
        }
        public void ResetToHome()
        {
            Initialize();
            _body.position = _home;
            _body.rotation = _homeRotation;
            transform.SetPositionAndRotation(_home, _homeRotation);
            Stop();
        }
        public void Stop() { Velocity = Vector3.zero; }
        public void Face(Vector3 target)
        {
            Vector3 direction = target - _body.position;
            direction.y = 0;
            if (direction.sqrMagnitude > 0.001f)
                _body.MoveRotation(Quaternion.Slerp(_body.rotation, Quaternion.LookRotation(direction),
                    1f - Mathf.Exp(-10f * Time.fixedDeltaTime)));
        }
        public bool MoveTowards(Vector3 target, float speed)
        {
            Initialize();
            Vector3 delta = target - _body.position;
            delta.y = 0;
            if (delta.sqrMagnitude < 0.09f) { Stop(); return true; }
            Vector3 direction = delta.normalized;
            float distance = Mathf.Min(speed * Time.fixedDeltaTime, delta.magnitude);
            Vector3 center = _body.position + _capsule.center;
            float radius = _capsule.radius * 0.95f;
            float half = Mathf.Max(0f, _capsule.height * 0.5f - radius);
            int count = Physics.CapsuleCastNonAlloc(center + Vector3.up * half, center - Vector3.up * half,
                radius, direction, _hits, distance + 0.08f, _worldMask, QueryTriggerInteraction.Ignore);
            for (int i = 0; i < count; i++)
            {
                if (_hits[i].transform.IsChildOf(transform) || _hits[i].normal.y > 0.65f) continue;
                distance = Mathf.Min(distance, Mathf.Max(0f, _hits[i].distance - 0.08f));
            }
            Vector3 next = _body.position + direction * distance;
            count = Physics.RaycastNonAlloc(next + Vector3.up * 0.65f, Vector3.down, _hits, 1.2f,
                _worldMask, QueryTriggerInteraction.Ignore);
            float highest = float.NegativeInfinity;
            for (int i = 0; i < count; i++)
            {
                if (_hits[i].transform.IsChildOf(transform) || _hits[i].normal.y < 0.65f ||
                    _hits[i].collider.GetComponentInParent<PaintballNpcMotor>() != null ||
                    _hits[i].collider.GetComponentInParent<PlayerController>() != null) continue;
                highest = Mathf.Max(highest, _hits[i].point.y);
            }
            if (float.IsNegativeInfinity(highest) || Mathf.Abs(highest - _body.position.y) > 0.5f)
            { Stop(); return false; }
            next.y = highest + 0.02f;
            Velocity = (next - _body.position) / Time.fixedDeltaTime;
            _body.MovePosition(next);
            Face(target);
            return false;
        }
    }
}
