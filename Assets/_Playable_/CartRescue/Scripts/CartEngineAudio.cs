using UnityEngine;

namespace Playable.CartRescue
{
    /// <summary>
    /// Tiếng động cơ xe: một đoạn lặp, âm lượng và cao độ tăng theo tốc độ xe (đứng yên thì im, kéo xe thì nổ máy,
    /// tự chạy thì gầm to). Chỉ bắt đầu phát khi xe chuyển động lần đầu — lúc đó người chơi đã chạm màn hình nên
    /// trình duyệt cho phép phát âm thanh.
    /// </summary>
    [DisallowMultipleComponent]
    public sealed class CartEngineAudio : MonoBehaviour
    {
        [SerializeField] private CartBody _cart;
        [SerializeField] private AudioSource _source;
        [SerializeField] private float _speedForMax = 7f;
        [SerializeField] private float _maxVolume = 0.55f;
        [SerializeField] private float _minPitch = 0.85f;
        [SerializeField] private float _maxPitch = 1.5f;
        [SerializeField] private float _response = 6f;

        private float _volume;
        private float _pitch = 1f;
        private float _fade = 1f;
        private float _fadeSpeed;

        /// <summary>Nhỏ dần về 0 trong <paramref name="seconds"/> (vd. lúc xe đã qua đích và chạy khỏi khung).</summary>
        public void FadeOut(float seconds) => _fadeSpeed = 1f / Mathf.Max(0.01f, seconds);

        private void Awake()
        {
            _source.loop = true;
            _source.volume = 0f;
        }

        private void LateUpdate()
        {
            _fade = Mathf.Max(0f, _fade - _fadeSpeed * Time.deltaTime);
            float k = Mathf.Clamp01(Mathf.Abs(_cart.Speed) / _speedForMax);
            float lerp = 1f - Mathf.Exp(-_response * Time.deltaTime);
            _volume = Mathf.Lerp(_volume, _maxVolume * Mathf.Pow(k, 0.6f), lerp);
            _pitch = Mathf.Lerp(_pitch, Mathf.Lerp(_minPitch, _maxPitch, k), lerp);

            if (!_source.isPlaying)
            {
                if (_volume < 0.01f) return;
                _source.Play();
            }
            _source.volume = _volume * _fade;
            _source.pitch = _pitch;
        }
    }
}
