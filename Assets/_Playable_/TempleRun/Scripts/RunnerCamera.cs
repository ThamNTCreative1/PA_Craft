using UnityEngine;

namespace Playable.TempleRun
{
    /// <summary>Temple Run style chase camera with speed FOV, smooth lane follow and shake.</summary>
    public class RunnerCamera : MonoBehaviour
    {
        public Transform target;
        public RunnerPlayer player;
        public Vector3 offset = new Vector3(0f, 3.4f, -6.2f);
        public Vector3 lookOffset = new Vector3(0f, 1.2f, 6f);
        [Range(0f, 1f)] public float xFollow = 0.65f;
        [Range(0f, 1f)] public float yFollow = 0.45f;
        public float xSmoothTime = 0.12f;
        public float ySmoothTime = 0.18f;

        [Header("Speed feel")]
        public float baseFov = 60f;
        public float maxFov = 68f;
        public float fovMinSpeed = 9f;
        public float fovMaxSpeed = 16f;
        [Tooltip("Camera pulls back a bit at high speed.")]
        public float speedPullBack = 0.8f;

        [Header("Intro shot (looks back at the player and the monster)")]
        public Vector3 introOffset = new Vector3(2.4f, 1.9f, 4.8f);
        public Vector3 introLookOffset = new Vector3(0f, 1.1f, -2.2f);
        [Range(0f, 0.9f)] public float introHold = 0.45f;

        private Camera _cam;
        private float _introDuration;
        private float _introTime = -1f;
        public bool IsIntroPlaying => _introTime >= 0f;
        private float _x, _vx;
        private float _y, _vy;
        private float _shakeTime;
        private float _shakeDuration;
        private float _shakeStrength;
        private float _speedT;
        private bool _initialized;

        private void Awake()
        {
            _cam = GetComponent<Camera>();
        }

        public void ResetRun(float introDuration)
        {
            _shakeTime = 0f;
            PlayIntro(introDuration);
            float speed = player != null && player.IsRunning ? player.Speed : 0f;
            _speedT = Mathf.Clamp01(Mathf.InverseLerp(fovMinSpeed, fovMaxSpeed, speed));
            if (_cam == null) _cam = GetComponent<Camera>();
            if (_cam != null) _cam.fieldOfView = Mathf.Lerp(baseFov, maxFov, _speedT);
            Snap();
        }

        public void Snap()
        {
            if (target == null) return;
            Vector3 t = target.position;
            _x = t.x * xFollow;
            _y = t.y * yFollow;
            _vx = _vy = 0f;
            Apply(t, 0f);
            _initialized = true;
        }

        /// <summary>Starts in front of the player looking back (monster chasing), then swings to the chase view.</summary>
        public void PlayIntro(float duration)
        {
            _introDuration = Mathf.Max(0.1f, duration);
            _introTime = 0f;
        }

        public void ShiftZ(float dz)
        {
            transform.position += new Vector3(0f, 0f, dz);
        }

        public void Shake(float strength, float duration)
        {
            _shakeStrength = strength;
            _shakeDuration = Mathf.Max(0.01f, duration);
            _shakeTime = _shakeDuration;
        }

        private void LateUpdate()
        {
            if (!_initialized || target == null) return;
            float dt = Time.deltaTime;
            // SmoothDamp can produce a NaN velocity at zero delta time.
            // Preserve the camera while the jump tutorial freezes gameplay.
            if (dt <= 0f) return;
            Vector3 t = target.position;
            _x = Mathf.SmoothDamp(_x, t.x * xFollow, ref _vx, xSmoothTime, Mathf.Infinity, dt);
            _y = Mathf.SmoothDamp(_y, t.y * yFollow, ref _vy, ySmoothTime, Mathf.Infinity, dt);

            float speed = player != null ? player.Speed : 0f;
            float targetT = player != null && player.IsRunning ? Mathf.Clamp01(Mathf.InverseLerp(fovMinSpeed, fovMaxSpeed, speed)) : 0f;
            _speedT = Mathf.Lerp(_speedT, targetT, 1f - Mathf.Exp(-3f * dt));
            if (_cam != null) _cam.fieldOfView = Mathf.Lerp(baseFov, maxFov, _speedT);

            Apply(t, dt);
        }

        private void Apply(Vector3 t, float dt)
        {
            // Z is locked to the target so the camera never lags behind at high speed.
            Vector3 pos = new Vector3(_x + offset.x, _y + offset.y, t.z + offset.z - _speedT * speedPullBack);
            Vector3 look = new Vector3(_x + lookOffset.x, _y + lookOffset.y, t.z + lookOffset.z);

            if (_shakeTime > 0f && dt > 0f)
            {
                _shakeTime -= dt;
                float k = _shakeStrength * Mathf.Clamp01(_shakeTime / _shakeDuration);
                pos += new Vector3(Random.Range(-1f, 1f), Random.Range(-1f, 1f), 0f) * k;
            }

            if (_introTime >= 0f)
            {
                // Snap uses dt = 0: initialization must not consume the intro.
                _introTime += dt;
                // Luna maps InverseLerp to an unclamped function. Clamp before smoothstep:
                // a negative hold-phase value otherwise becomes > 1 and overshoots the shot.
                float k = Mathf.Clamp01(Mathf.InverseLerp(_introDuration * introHold, _introDuration, _introTime));
                k = k * k * (3f - 2f * k); // smoothstep
                Vector3 ip = t + introOffset;
                Vector3 il = t + introLookOffset;
                pos = Vector3.Lerp(ip, pos, k);
                look = Vector3.Lerp(il, look, k);
                if (_introTime >= _introDuration) _introTime = -1f;
            }

            transform.position = pos;
            transform.rotation = Quaternion.LookRotation(look - pos, Vector3.up);
        }
    }
}
