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
        public void Bind(BoxCollider pen)
        {
            _pen = pen;
            _idle = Random.Range(.5f, 1.2f);
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
