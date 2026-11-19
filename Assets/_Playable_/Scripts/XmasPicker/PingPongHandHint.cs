using DG.Tweening;
using UnityEngine;

namespace Playable
{
    // Tutorial hand that slides between two cards and "taps" on each one.
    // Size and tip offset are relative to the card, so it fits portrait and landscape.
    public class PingPongHandHint : MonoBehaviour
    {
        [SerializeField] private RectTransform _hand;
        [SerializeField] private Vector2 _tipOffset = new Vector2(0.08f, -0.12f);
        [SerializeField] private float _handSizeOfCard = 0.42f;
        [SerializeField] private float _moveTime = 0.6f;
        [SerializeField] private float _tapTime = 0.18f;
        [SerializeField] private float _tapScale = 0.85f;

        private Sequence _loop;
        private RectTransform _a, _b;
        private Vector2 _lastCardSize;

        public void Play(RectTransform a, RectTransform b)
        {
            Stop();
            _a = a;
            _b = b;
            _lastCardSize = a.rect.size;
            float side = Mathf.Min(_lastCardSize.x, _lastCardSize.y) * _handSizeOfCard;
            _hand.sizeDelta = new Vector2(side, side * 1.17f);
            _hand.gameObject.SetActive(true);
            _hand.localScale = Vector3.one;
            Vector3 pa = TipPosition(a);
            Vector3 pb = TipPosition(b);
            _hand.position = pa;
            _loop = DOTween.Sequence()
                .Append(Tap())
                .Append(_hand.DOMove(pb, _moveTime).SetEase(Ease.InOutSine))
                .Append(Tap())
                .Append(_hand.DOMove(pa, _moveTime).SetEase(Ease.InOutSine))
                .SetLoops(-1);
        }

        public void Stop()
        {
            if (_loop != null)
            {
                _loop.Kill();
                _loop = null;
            }
            _hand.DOKill();
            _hand.gameObject.SetActive(false);
            _a = null;
            _b = null;
        }

        private void LateUpdate()
        {
            // Screen rotated / resized while showing: restart with the new card layout.
            if (_loop != null && _a != null && _a.rect.size != _lastCardSize) Play(_a, _b);
        }

        private void OnDestroy()
        {
            Stop();
        }

        private Tween Tap()
        {
            return _hand.DOScale(_tapScale, _tapTime).SetEase(Ease.OutQuad).SetLoops(2, LoopType.Yoyo);
        }

        private Vector3 TipPosition(RectTransform card)
        {
            Rect r = card.rect;
            Vector2 local = r.center + new Vector2(_tipOffset.x * r.width, _tipOffset.y * r.height);
            return card.TransformPoint(local);
        }
    }
}
