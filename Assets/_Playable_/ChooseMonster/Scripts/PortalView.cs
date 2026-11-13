using DG.Tweening;
using UnityEngine;

namespace Playable.ChooseMonster
{
    /// <summary>
    /// Mặt cổng phép: 2 lớp xoáy quay ngược chiều + lõi sáng phập phồng + tia sáng bị hút vào tâm.
    /// Surge() làm cổng "cuộn trào" mạnh lên một nhịp khi có thứ đi qua.
    /// Mặt nền đục nên mọi thứ phía sau cổng bị che khi nhìn từ phía người chơi.
    /// </summary>
    [DisallowMultipleComponent]
    public sealed class PortalView : MonoBehaviour
    {
        [SerializeField] private Transform _surface;
        [SerializeField] private Transform _swirlA;
        [SerializeField] private Transform _swirlB;
        [SerializeField] private Transform _core;
        [SerializeField] private ParticleSystem _sparks;
        [SerializeField] private float _speedA = 70f;
        [SerializeField] private float _speedB = -130f;

        private Vector3 _surfaceScale;
        private Vector3 _coreScale;
        private bool _cached;
        private float _surge;
        private Tween _tween;

        public Vector3 SurfacePosition => _surface != null ? _surface.position : transform.position;

        private void Awake()
        {
            Cache();
        }

        private void Cache()
        {
            if (_cached) return;
            _cached = true;
            _surfaceScale = _surface != null ? _surface.localScale : Vector3.one;
            _coreScale = _core != null ? _core.localScale : Vector3.one;
        }

        private void Update()
        {
            float dt = Time.deltaTime;
            float boost = 1f + _surge * 2.5f;
            if (_swirlA != null) _swirlA.Rotate(0f, 0f, _speedA * boost * dt, Space.Self);
            if (_swirlB != null) _swirlB.Rotate(0f, 0f, _speedB * boost * dt, Space.Self);
            if (_core != null)
            {
                float pulse = 1f + Mathf.Sin(Time.time * 5f) * 0.08f + _surge * 0.45f;
                _core.localScale = _coreScale * pulse;
            }
            _surge = Mathf.Max(0f, _surge - dt * 1.4f);
        }

        public void Open(float delay)
        {
            Cache();
            if (_surface == null) return;
            _tween?.Kill();
            _surface.gameObject.SetActive(true);
            _surface.localScale = new Vector3(0.05f, 0.05f, 1f);
            _tween = _surface.DOScale(_surfaceScale, 0.5f).SetDelay(delay).SetEase(Ease.OutBack);
        }

        public void Close(float delay)
        {
            Cache();
            if (_surface == null) return;
            _tween?.Kill();
            _tween = _surface.DOScale(new Vector3(0.02f, 0.02f, 1f), 0.35f).SetDelay(delay).SetEase(Ease.InBack)
                .OnComplete(() => _surface.gameObject.SetActive(false));
        }

        public void Surge()
        {
            _surge = 1f;
            if (_sparks != null) _sparks.Emit(40);
            if (_surface == null) return;
            _tween?.Complete();
            _surface.localScale = _surfaceScale;
            _tween = _surface.DOPunchScale(new Vector3(_surfaceScale.x * 0.08f, _surfaceScale.y * 0.08f, 0f), 0.4f, 6, 0.6f);
        }

        private void OnDestroy()
        {
            _tween?.Kill();
        }
    }
}
