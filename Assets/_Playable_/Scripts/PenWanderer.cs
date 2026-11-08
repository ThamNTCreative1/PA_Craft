using UnityEngine;
namespace Playable
{
    public class PenWanderer : MonoBehaviour
    {
        [SerializeField] private Animator _animator;
        [SerializeField] private float _speed = 1.4f;
        [SerializeField] private float _edgePadding = 3f;
        private BoxCollider _pen;
        private Vector3 _target;
        private float _idle;
        private bool _walking;
        private Transform _nest;
        private float _nestClearance;
        private float _wanderSide;
        public void StayStill()
        {
            _pen = null;
            _nest = null;
            SetWalking(false);
        }

        public void Bind(BoxCollider pen, Transform nest = null, float nestClearance = 7f, bool startImmediately = false)
        {
            _pen = pen;
            _nest = nest;
            _nestClearance = nestClearance;
            if (_nest != null)
            {
                // Reserve a side lane so straight walking paths never cross the nest or its camera view.
                Vector3 local = pen.transform.InverseTransformPoint(transform.position);
                Vector3 nestLocal = pen.transform.InverseTransformPoint(_nest.position);
                _wanderSide = local.x < nestLocal.x ? -1f : 1f;
                var renderers = GetComponentsInChildren<Renderer>();
                float bodyRadius = 0f;
                foreach (var renderer in renderers)
                    bodyRadius = Mathf.Max(bodyRadius, renderer.bounds.extents.x, renderer.bounds.extents.z);
                _nestClearance += bodyRadius / Mathf.Max(.01f, Mathf.Abs(pen.transform.lossyScale.x));
                float halfWidth = Mathf.Max(.1f, pen.size.x * .5f - _edgePadding);
                _nestClearance = Mathf.Min(_nestClearance, halfWidth - .1f);
                local.x = Mathf.Clamp(nestLocal.x + _wanderSide * Mathf.Max(Mathf.Abs(local.x - nestLocal.x), _nestClearance),
                    pen.center.x - halfWidth, pen.center.x + halfWidth);
                Vector3 position = pen.transform.TransformPoint(local);
                position.y = transform.position.y;
                transform.position = position;
            }
            _idle = startImmediately ? 0f : Random.Range(.5f, 1.2f);
            SetWalking(false);
        }
        private void SetWalking(bool walking)
        {
            _walking = walking;
            // Luna supports controller transitions, but not CrossFadeInFixedTime.
            if (_animator != null) _animator.SetBool("IsWalking", walking);
        }
        private void Update()
        {
            if (_pen == null) return;
            if (!_walking)
            {
                _idle -= Time.deltaTime;
                if (_idle > 0f) return;
                Vector3 half = _pen.size * .5f;
                float x = Mathf.Max(.1f, half.x - _edgePadding);
                float z = Mathf.Max(.1f, half.z - _edgePadding);
                Vector3 local = _pen.center + new Vector3(Random.Range(-x, x), 0, Random.Range(-z, z));
                if (_nest != null)
                {
                    float nestX = _pen.transform.InverseTransformPoint(_nest.position).x;
                    float min = _pen.center.x - x, max = _pen.center.x + x;
                    if (_wanderSide < 0f) max = Mathf.Clamp(nestX - _nestClearance, min, max);
                    else min = Mathf.Clamp(nestX + _nestClearance, min, max);
                    local.x = Random.Range(min, max);
                }
                _target = _pen.transform.TransformPoint(local); _target.y = transform.position.y;
                SetWalking(true);
            }
            Vector3 direction = _target - transform.position;
            if (direction.sqrMagnitude < .04f) { _idle = Random.Range(1.2f, 2.8f); SetWalking(false); return; }
            transform.rotation = Quaternion.RotateTowards(transform.rotation, Quaternion.LookRotation(direction), 150f * Time.deltaTime);
            transform.position = Vector3.MoveTowards(transform.position, _target, _speed * Time.deltaTime);
        }
    }
}
