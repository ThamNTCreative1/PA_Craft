using DG.Tweening;
using UnityEngine;

namespace Playable
{
    [RequireComponent(typeof(RectTransform))]
    public class BlockCraftTapTutorial : MonoBehaviour
    {
        [SerializeField] private Vector2 _startOffset = new Vector2(100, -100);
        [SerializeField] private float _moveDuration = 0.55f;
        [SerializeField] private float _pressDuration = 0.18f;
        [SerializeField] private float _pressedScale = 0.8f;
        private RectTransform _rect;
        private Vector2 _target;
        private Sequence _sequence;
        public int CompletedLoops { get; private set; }

        private void Awake()
        {
            _rect = (RectTransform)transform;
            _target = _rect.anchoredPosition;
        }

        private void OnEnable()
        {
            if (!Application.isPlaying) return;
            CompletedLoops = 0;
            _rect.anchoredPosition = _target + _startOffset;
            _rect.localScale = Vector3.one;
            _sequence = DOTween.Sequence().SetUpdate(true)
                .Append(_rect.DOAnchorPos(_target, _moveDuration).SetEase(Ease.OutQuad))
                .Append(_rect.DOScale(_pressedScale, _pressDuration).SetEase(Ease.OutQuad))
                .AppendInterval(0.3f)
                .SetLoops(-1, LoopType.Restart)
                .OnStepComplete(() => CompletedLoops++);
        }

        private void OnDisable()
        {
            _sequence?.Kill();
            _sequence = null;
            if (_rect == null) return;
            _rect.anchoredPosition = _target;
            _rect.localScale = Vector3.one;
        }
    }
}
