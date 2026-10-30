using DG.Tweening;
using UnityEngine;

namespace Playable.TempleRun
{
    [DisallowMultipleComponent]
    public class RunnerButtonPulse : MonoBehaviour
    {
        [SerializeField, Range(1f, 1.3f)] private float _scaleMultiplier = 1.08f;
        [SerializeField, Min(0.1f)] private float _duration = 0.5f;
        private Vector3 _baseScale;
        private Tween _tween;

        private void OnEnable()
        {
            _baseScale = transform.localScale;
            _tween = transform.DOScale(_baseScale * _scaleMultiplier, _duration)
                .SetEase(Ease.InOutSine)
                .SetLoops(-1, LoopType.Yoyo)
                .SetUpdate(true);
        }

        private void OnDisable()
        {
            if (_tween != null) _tween.Kill();
            _tween = null;
            transform.localScale = _baseScale;
        }
    }
}
