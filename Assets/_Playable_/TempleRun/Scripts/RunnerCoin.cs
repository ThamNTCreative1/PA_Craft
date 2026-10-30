using UnityEngine;

namespace Playable.TempleRun
{
    public class RunnerCoin : MonoBehaviour
    {
        public float spinSpeed = 220f;
        public float bobHeight = 0.08f;
        public float bobSpeed = 4f;
        public float collectDuration = 0.22f;

        private float _baseY;
        private float _phase;
        private bool _collecting;
        private float _collectT;
        private Transform _collectTarget;
        private Vector3 _collectStart;
        private Vector3 _baseScale = Vector3.one;
        private bool _hasBaseScale;

        public float BaseY => _baseY;
        public bool IsCollecting => _collecting;

        public void Place(Vector3 position)
        {
            if (!_hasBaseScale)
            {
                _baseScale = transform.localScale;
                _hasBaseScale = true;
            }

            transform.position = position;
            transform.localScale = _baseScale;
            _baseY = position.y;
            _phase = position.z * 0.7f;
            _collecting = false;
        }

        /// <summary>Small "fly into the player" pop, then the coin hides itself (back to the pool).</summary>
        public void Collect(Transform target)
        {
            if (!_hasBaseScale)
            {
                _baseScale = transform.localScale;
                _hasBaseScale = true;
            }

            _collecting = true;
            _collectT = 0f;
            _collectTarget = target;
            _collectStart = transform.position;
        }

        public void ShiftZ(float dz)
        {
            transform.position += new Vector3(0f, 0f, dz);
            _collectStart += new Vector3(0f, 0f, dz);
        }

        private void Update()
        {
            float dt = Time.deltaTime;
            if (_collecting)
            {
                _collectT += dt / Mathf.Max(0.01f, collectDuration);
                float t = Mathf.Clamp01(_collectT);
                Vector3 to = _collectTarget != null ? _collectTarget.position + Vector3.up * 1.4f : _collectStart + Vector3.up;
                Vector3 p = Vector3.Lerp(_collectStart, to, t * t);
                p.y += Mathf.Sin(t * Mathf.PI) * 0.6f;
                transform.position = p;
                float s = t < 0.3f ? Mathf.Lerp(1f, 1.4f, t / 0.3f) : Mathf.Lerp(1.4f, 0f, (t - 0.3f) / 0.7f);
                transform.localScale = _baseScale * s;
                transform.Rotate(0f, spinSpeed * 3f * dt, 0f, Space.World);
                if (t >= 1f)
                {
                    _collecting = false;
                    transform.localScale = _baseScale;
                    gameObject.SetActive(false);
                }

                return;
            }

            transform.Rotate(0f, spinSpeed * dt, 0f, Space.World);
            Vector3 q = transform.position;
            q.y = _baseY + Mathf.Sin(Time.time * bobSpeed + _phase) * bobHeight;
            transform.position = q;
        }
    }
}
