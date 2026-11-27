using UnityEngine;

namespace Playable.CannonLaunch
{
    /// <summary>
    /// Camera góc sau pháo. Khi bắn thì bám theo nhân vật đang bay (_follow), xong thì quay về chỗ cũ.
    /// FOV đổi theo tỉ lệ màn: dọc rộng hơn để thấy cả pháo lẫn tường, ngang hẹp lại để không quá xa.
    /// </summary>
    [RequireComponent(typeof(Camera))]
    public sealed class CannonCamera : MonoBehaviour
    {
        [SerializeField] private Transform _home;
        [SerializeField] private Vector3 _followOffset = new Vector3(-3.5f, 3.2f, -8.5f);
        [SerializeField] private Vector3 _lookAhead = new Vector3(0f, 0.5f, 6f);
        [SerializeField] private float _followSharpness = 5f;
        [SerializeField] private float _returnSharpness = 3.5f;
        [SerializeField] private float _portraitFov = 62f;
        [SerializeField] private float _landscapeFov = 44f;

        private Camera _camera;
        private Transform _target;
        private float _shakeTime;
        private float _shakeDuration;
        private float _shakeStrength;
        private Vector3 _position;
        private Quaternion _rotation;

        public Camera Camera => _camera;

        private void Awake()
        {
            _camera = GetComponent<Camera>();
            _position = _home.position;
            _rotation = _home.rotation;
            ApplyFov();
        }

        public void Follow(Transform target)
        {
            _target = target;
        }

        /// <summary>Về góc pháo. cut = cắt cảnh ngay (tránh camera lướt xuyên qua nòng pháo khi bay về).</summary>
        public void ReturnHome(bool cut)
        {
            _target = null;
            if (!cut) return;
            _position = _home.position;
            _rotation = _home.rotation;
        }

        /// <summary>Đổi khoảng cách bám theo (vd. lùi xa khi tường đổ để thấy toàn cảnh).</summary>
        public void SetFollowOffset(Vector3 offset)
        {
            _followOffset = offset;
        }

        public void Shake(float strength, float duration)
        {
            _shakeStrength = strength;
            _shakeDuration = duration;
            _shakeTime = duration;
        }

        private void ApplyFov()
        {
            if (Screen.height <= 0) return;
            float aspect = (float)Screen.width / Screen.height;
            // Nội suy mượt giữa dọc (≤ 0.6) và ngang (≥ 1.5) cho các tỉ lệ vuông vức.
            float t = Mathf.InverseLerp(0.6f, 1.5f, aspect);
            _camera.fieldOfView = Mathf.Lerp(_portraitFov, _landscapeFov, t);
        }

        private void LateUpdate()
        {
            ApplyFov();
            float dt = Time.deltaTime;
            Vector3 wantPos;
            Quaternion wantRot;
            float sharp;
            if (_target != null)
            {
                Vector3 p = _target.position;
                wantPos = p + _followOffset;
                wantRot = Quaternion.LookRotation(p + _lookAhead - wantPos);
                sharp = _followSharpness;
            }
            else
            {
                wantPos = _home.position;
                wantRot = _home.rotation;
                sharp = _returnSharpness;
            }
            float k = 1f - Mathf.Exp(-sharp * dt);
            _position = Vector3.Lerp(_position, wantPos, k);
            _rotation = Quaternion.Slerp(_rotation, wantRot, k);

            Vector3 shake = Vector3.zero;
            if (_shakeTime > 0f)
            {
                _shakeTime -= dt;
                float s = Mathf.Clamp01(_shakeTime / _shakeDuration) * _shakeStrength;
                shake = new Vector3(Random.Range(-1f, 1f), Random.Range(-1f, 1f), 0f) * s;
            }
            transform.position = _position + _rotation * shake;
            transform.rotation = _rotation;
        }
    }
}
