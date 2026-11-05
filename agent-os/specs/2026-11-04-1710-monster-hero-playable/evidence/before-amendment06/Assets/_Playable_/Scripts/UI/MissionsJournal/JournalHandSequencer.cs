using DG.Tweening;
using UnityEngine;

namespace Playable
{
    public class JournalHandSequencer : MonoBehaviour
    {
        [SerializeField, Min(0.01f)] private float _moveDuration = 0.4f;
        [SerializeField, Min(0.01f)] private float _holdDuration = 0.8f;
        [SerializeField, Min(0f)] private float _pulseScale = 1.2f;
        [SerializeField, Min(0.01f)] private float _pulseDuration = 0.12f;

        private Sequence _sequence;

        public void Begin(RectTransform[] targets)
        {
            Stop();
            if (targets == null || targets.Length == 0)
            {
                Debug.LogError("JournalHandSequencer requires GO targets in display order.", this);
                return;
            }

            for (int i = 0; i < targets.Length; i++)
            {
                if (targets[i] != null) continue;
                Debug.LogError("JournalHandSequencer has a missing GO target.", this);
                return;
            }

            gameObject.SetActive(true);
            transform.position = targets[0].position;
            transform.localScale = Vector3.one;
            _sequence = DOTween.Sequence();
            for (int i = 0; i < targets.Length; i++)
            {
                _sequence.Append(transform.DOScale(_pulseScale, _pulseDuration).SetEase(Ease.OutQuad));
                _sequence.Append(transform.DOScale(Vector3.one, _pulseDuration).SetEase(Ease.InQuad));
                float remainingHold = Mathf.Max(0f, _holdDuration - 2f * _pulseDuration);
                if (remainingHold > 0f) _sequence.AppendInterval(remainingHold);
                _sequence.Append(transform.DOMove(targets[(i + 1) % targets.Length].position,
                    Mathf.Max(0.01f, _moveDuration)).SetEase(Ease.InOutSine));
            }
            _sequence.SetLoops(-1).SetUpdate(true);
        }

        public void Stop()
        {
            KillSequence();
            gameObject.SetActive(false);
        }

        private void OnDisable()
        {
            KillSequence();
        }

        private void KillSequence()
        {
            if (_sequence != null)
            {
                _sequence.Kill();
                _sequence = null;
            }
            transform.localScale = Vector3.one;
        }
    }
}
