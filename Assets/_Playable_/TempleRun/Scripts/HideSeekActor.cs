using UnityEngine;
namespace Playable.TempleRun
{
    public class HideSeekActor : MonoBehaviour
    {
        public Transform model;
        public Animator animator;
        public Vector3 pointA, pointB;
        public float speed = 2.3f, phase, jumpEvery = 3.5f;
        public bool reverseDirection;
        public AudioClip stepSound, jumpSound;
        private float _time, _step;
        private bool _running;
        public void Begin() { _running = true; animator.speed = 1.65f; }
        public void Stop() { _running = false; animator.speed = 0; }
        private void Start() { animator.speed = 0; }
        private void Update()
        {
            if (!_running) return;
            _time += Time.deltaTime;
            float distance = Vector3.Distance(pointA, pointB);
            float travel = (_time * speed + phase) / Mathf.Max(0.1f, distance);
            // Both endpoints are authored outside the landscape camera frustum.
            // Restart offscreen so nobody visibly turns around in the shot.
            float t = Mathf.Repeat(travel, 1);
            if (reverseDirection) t = 1 - t;
            transform.position = Vector3.Lerp(pointA, pointB, t);
            Vector3 direction = reverseDirection ? pointA - pointB : pointB - pointA;
            transform.rotation = Quaternion.LookRotation(direction);
            float jump = (_time + phase) % jumpEvery;
            model.localPosition = Vector3.up * (jump < 0.7f ? Mathf.Sin(jump / 0.7f * Mathf.PI) * 0.65f : 0);
            if (jump < Time.deltaTime && AudioManager.Instance != null) AudioManager.Instance.PlayOneShot(jumpSound, 0.12f);
            _step += Time.deltaTime;
            if (_step > 0.36f && jump >= 0.7f)
            {
                _step = 0;
                if (AudioManager.Instance != null) AudioManager.Instance.PlayOneShot(stepSound, 0.06f);
            }
        }
    }
}
