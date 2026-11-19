using DG.Tweening;
using UnityEngine;
using UnityEngine.UI;

namespace Playable
{
    // Tap hint: the hand stays on the target and presses by scaling down around its fingertip pivot;
    // each press releases a thin white ring that grows and fades.
    public class HandTapHint : MonoBehaviour
    {
        [SerializeField] private RectTransform _hand;
        [SerializeField] private Image _ring;
        [SerializeField] private float _pressScale = 0.82f;
        [SerializeField] private float _pressTime = 0.14f;
        [SerializeField] private float _releaseTime = 0.25f;
        [SerializeField] private float _restTime = 0.45f;
        [SerializeField] private float _ringStartScale = 0.3f;
        [SerializeField] private float _ringEndScale = 1.45f;
        [SerializeField] private float _ringTime = 0.38f;
        [SerializeField] private float _ringAlpha = 0.9f;

        private Sequence _loop;

        private void OnEnable()
        {
            _hand.localScale = Vector3.one;
            SetRing(0f, _ringStartScale);
            _loop = DOTween.Sequence()
                .Append(_hand.DOScale(_pressScale, _pressTime).SetEase(Ease.InQuad))
                .AppendCallback(Pulse)
                .Append(_hand.DOScale(1f, _releaseTime).SetEase(Ease.OutSine))
                .AppendInterval(_restTime)
                .SetLoops(-1);
        }

        private void OnDisable()
        {
            if (_loop != null) _loop.Kill();
            _loop = null;
            _ring.DOKill();
            _ring.rectTransform.DOKill();
            _hand.localScale = Vector3.one;
        }

        private void Pulse()
        {
            RectTransform ring = _ring.rectTransform;
            _ring.DOKill();
            ring.DOKill();
            SetRing(_ringAlpha, _ringStartScale);
            ring.DOScale(_ringEndScale, _ringTime).SetEase(Ease.OutQuad);
            _ring.DOFade(0f, _ringTime).SetEase(Ease.InQuad);
        }

        private void SetRing(float alpha, float scale)
        {
            Color c = _ring.color;
            c.a = alpha;
            _ring.color = c;
            _ring.rectTransform.localScale = Vector3.one * scale;
        }
    }
}
