using DG.Tweening;
using UnityEngine;

namespace Playable
{
    /// <summary>
    /// Animation bàn tay hướng dẫn cho tutorial: hand di chuyển từ 1 offset về tâm rồi pulse
    /// scale+rotate liên tục, đồng thời efx (con của hand) scale 0→1 xuyên suốt 1 vòng lặp.
    /// Cả 2 nằm chung 1 Sequence nên khi loop Restart, efx tự đồng bộ lại với hand.
    /// </summary>
    public class TutorialPointer : MonoBehaviour
    {
        [Tooltip("Object bàn tay, hiện cạnh vị trí tutorial")] [SerializeField]
        private RectTransform _hand;

        [Tooltip("Hiệu ứng ánh sáng xung quanh bàn tay (con của hand)")] [SerializeField]
        private RectTransform _efx;

        [Header("Hand Move")] [Tooltip("Vị trí khởi đầu của bàn tay, lệch so với tâm")] [SerializeField]
        private Vector3 _handStartOffset = new Vector3(25, -50, 0);

        [Tooltip("Thời gian bàn tay di chuyển từ offset về tâm")] [SerializeField]
        private float _moveDuration = 0.7f;

        [Header("Hand Pulse")] [Tooltip("Tỉ lệ scale nhỏ nhất khi bàn tay nhấp")] [SerializeField]
        private float _pulseScale = 0.85f;

        [Tooltip("Thời gian mỗi lần nhấp")] [SerializeField]
        private float _pulseDuration = 0.4f;

        [Tooltip("Góc xoay Z khi bàn tay nhấp (độ)")] [SerializeField]
        private float _pulseRotationZ = 7.5f;

        [Tooltip("Trì hoãn trước khi bàn tay nhấp")] [SerializeField]
        private float _delayBeforePulse = 0.5f;

        [Tooltip("Giữ bàn tay sau nhấp trước khi scale về bình thường")] [SerializeField]
        private float _holdAfterPulse = 1f;

        [Header("Efx")] [SerializeField] private float _duration = 0.5f;

        private Sequence _animSequence;
        private Tween _efxTween;

        public bool IsPlaying => gameObject.activeSelf;

        public void Show()
        {
            gameObject.SetActive(true);

            KillTweens();
            _animSequence = DOTween.Sequence();

            transform.localScale = Vector3.one;
            transform.localRotation = Quaternion.identity;
            _hand.localPosition = _handStartOffset;
            _hand.localRotation = Quaternion.identity;
            _hand.localScale = Vector3.one;

            Sequence handSequence = DOTween.Sequence();
            handSequence.Append(_hand.DOLocalMove(Vector3.zero, _moveDuration));
            handSequence.AppendInterval(_delayBeforePulse).Append(_hand.DOScale(_pulseScale, _pulseDuration));
            handSequence.Join(_hand.DOLocalRotate(new Vector3(0, 0, _pulseRotationZ), _pulseDuration));
            handSequence.AppendInterval(_holdAfterPulse);
            handSequence.Append(_hand.DOScale(1f, _pulseDuration));

            _animSequence.Append(handSequence);

            _animSequence.SetLoops(-1, LoopType.Restart);

            _efx.localScale = Vector3.zero;
            _efxTween = _efx.DOScale(Vector3.one, _duration).SetEase(Ease.Linear).SetLoops(-1, LoopType.Restart);
        }

        public void Stop()
        {
            KillTweens();
            if (this != null)
            {
                gameObject.SetActive(false);
            }
        }

        private void OnDisable()
        {
            KillTweens();
        }

        private void OnDestroy()
        {
            KillTweens();
        }

        private void KillTweens()
        {
            _animSequence?.Kill();
            _animSequence = null;
            _efxTween?.Kill();
            _efxTween = null;
        }
    }
}
