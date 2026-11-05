using DG.Tweening;
using UnityEngine;

namespace Playable
{
    public sealed class ScaleHandHint : MonoBehaviour
    {
        [SerializeField] private float _pulseScale = 1.15f;
        [SerializeField] private float _duration = 0.45f;
        private Tween _pulse;
        private void OnEnable()
        {
            transform.localScale = Vector3.one;
            _pulse = transform.DOScale(_pulseScale, _duration)
                .SetEase(Ease.InOutSine).SetLoops(-1, LoopType.Yoyo);
        }
        private void OnDisable()
        {
            if (_pulse != null) { _pulse.Kill(); _pulse = null; }
            transform.localScale = Vector3.one;
        }
    }
}
