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
        private Tween _shineTween;
        private RectTransform _line;
        private Vector2 _lineBasePosition;

        private void OnEnable()
        {
            _baseScale = transform.localScale;
            _tween = transform.DOScale(_baseScale * _scaleMultiplier, _duration)
                .SetEase(Ease.InOutSine)
                .SetLoops(-1, LoopType.Yoyo)
                .SetUpdate(true);

            _line = transform.Find("Line") as RectTransform;
            var buttonRect = transform as RectTransform;
            if (_line == null || buttonRect == null) return;
            _lineBasePosition = _line.anchoredPosition;
            var image = _line.GetComponent<UnityEngine.UI.Image>();
            if (image != null) image.raycastTarget = false;
            // Move fully outside the mask before restarting, including the tilted ends.
            _shineTween = DOVirtual.Float(0f, 1f, 1.1f, progress =>
                {
                    float extent = buttonRect.rect.width * 0.5f +
                        Mathf.Abs(_line.rect.width * Mathf.Cos(_line.localEulerAngles.z * Mathf.Deg2Rad)) * 0.5f +
                        Mathf.Abs(_line.rect.height * Mathf.Sin(_line.localEulerAngles.z * Mathf.Deg2Rad)) * 0.5f;
                    _line.anchoredPosition = new Vector2(Mathf.Lerp(-extent, extent, progress), _lineBasePosition.y);
                })
                .SetEase(Ease.Linear)
                .SetLoops(-1, LoopType.Restart)
                .SetUpdate(true);
        }

        private void OnDisable()
        {
            if (_tween != null) _tween.Kill();
            _tween = null;
            _shineTween?.Kill();
            _shineTween = null;
            if (_line != null) _line.anchoredPosition = _lineBasePosition;
            transform.localScale = _baseScale;
        }
    }
}
