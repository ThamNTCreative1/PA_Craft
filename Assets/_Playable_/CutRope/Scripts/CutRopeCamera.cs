using UnityEngine;

namespace Playable.CutRope
{
    /// <summary>
    /// Giữ khung hình (xà → sàn, rộng _frameWidth) luôn nằm trọn trong màn hình mọi tỉ lệ,
    /// và rung máy khi vật rơi trúng.
    /// </summary>
    [RequireComponent(typeof(Camera))]
    public sealed class CutRopeCamera : MonoBehaviour
    {
        [SerializeField] private Vector3 _lookAt = new Vector3(0f, 3.3f, 0f);
        [SerializeField] private float _frameHeight = 9.4f;
        [SerializeField] private float _frameWidth = 6.2f;
        [Tooltip("Màn ngang: nhân chiều cao khung để chừa lề cho tiêu đề (trên) và nút Download (dưới) đặt giữa màn.")]
        [SerializeField] private float _landscapeHeightScale = 1.4f;
        [SerializeField] private float _minFov = 30f;
        [SerializeField] private float _maxFov = 75f;

        private Camera _camera;
        private Vector3 _basePosition;
        private float _shakeTime;
        private float _shakeDuration;
        private float _shakeStrength;
        private float _lastAspect = -1f;

        public Camera Camera => _camera;

        private void Awake()
        {
            _camera = GetComponent<Camera>();
            _basePosition = transform.position;
            Fit();
        }

        public void Shake(float strength, float duration)
        {
            _shakeStrength = strength;
            _shakeDuration = duration;
            _shakeTime = duration;
        }

        private void LateUpdate()
        {
            if (Screen.height > 0 && Mathf.Abs((float)Screen.width / Screen.height - _lastAspect) > 0.001f) Fit();

            Vector3 offset = Vector3.zero;
            if (_shakeTime > 0f)
            {
                _shakeTime -= Time.deltaTime;
                float k = Mathf.Clamp01(_shakeTime / _shakeDuration) * _shakeStrength;
                offset = new Vector3(Random.Range(-1f, 1f), Random.Range(-1f, 1f), 0f) * k;
            }
            transform.position = _basePosition + offset;
        }

        private void Fit()
        {
            if (_camera == null || Screen.height <= 0) return;
            float aspect = (float)Screen.width / Screen.height;
            _lastAspect = aspect;
            float distance = Vector3.Distance(_basePosition, _lookAt);
            float frameHeight = aspect > 1f ? _frameHeight * _landscapeHeightScale : _frameHeight;
            float byHeight = 2f * Mathf.Atan(frameHeight * 0.5f / distance) * Mathf.Rad2Deg;
            float byWidth = 2f * Mathf.Atan(_frameWidth * 0.5f / distance / aspect) * Mathf.Rad2Deg;
            _camera.fieldOfView = Mathf.Clamp(Mathf.Max(byHeight, byWidth), _minFov, _maxFov);
            transform.rotation = Quaternion.LookRotation(_lookAt - _basePosition);
        }
    }
}
