using DG.Tweening;
using UnityEngine;

namespace Playable
{
    public sealed class HeroSelectionHandHint : MonoBehaviour
    {
        [SerializeField] private RectTransform _hand;
        [SerializeField] private RectTransform[] _targets;
        [SerializeField] private Vector2 _targetPoint = new Vector2(0.55f, 0.45f);
        [SerializeField, Min(0.01f)] private float _moveDuration = 0.35f;
        [SerializeField, Min(0.01f)] private float _dwellDuration = 0.8f;
        [SerializeField] private float _pulseScale = 1.15f;
        [SerializeField, Min(0.01f)] private float _pulseDuration = 0.45f;

        private int _index;
        private bool _running;
        private Sequence _hop;
        private Tween _pulse;
        private Vector3 _restLocalPosition;
        private Vector3 _restScale;

        private void Awake()
        {
            if (_hand == null) return;
            _restLocalPosition = _hand.localPosition;
            _restScale = _hand.localScale;
            _hand.gameObject.SetActive(false);
        }

        public void Begin()
        {
            Stop();
            if (_hand == null || _hand.parent == null || _targets == null || _targets.Length != 4)
            {
                Debug.LogWarning("Hero selection hand needs a hand with a parent and four card targets.", this);
                return;
            }
            for (int i = 0; i < _targets.Length; i++)
            {
                if (_targets[i] != null) continue;
                Debug.LogWarning("Hero selection hand target " + i + " is missing.", this);
                return;
            }

            _index = 0;
            _running = true;
            _hand.gameObject.SetActive(true);
            _hand.SetAsLastSibling();
            _hand.localPosition = PointFor(_index);
            _pulse = _hand.DOScale(_restScale * _pulseScale, Mathf.Max(0.01f, _pulseDuration))
                .SetEase(Ease.InOutSine).SetLoops(-1, LoopType.Yoyo).SetUpdate(true);
            ScheduleNext();
        }

        private Vector3 PointFor(int index)
        {
            Rect rect = _targets[index].rect;
            Vector3 point = new Vector3(
                Mathf.Lerp(rect.xMin, rect.xMax, _targetPoint.x),
                Mathf.Lerp(rect.yMin, rect.yMax, _targetPoint.y), 0f);
            return _hand.parent.InverseTransformPoint(_targets[index].TransformPoint(point));
        }

        private void ScheduleNext()
        {
            if (!_running) return;
            int next = (_index + 1) % _targets.Length;
            _hop = DOTween.Sequence().SetUpdate(true)
                .AppendInterval(Mathf.Max(0.01f, _dwellDuration))
                .Append(_hand.DOLocalMove(PointFor(next), Mathf.Max(0.01f, _moveDuration)).SetEase(Ease.OutQuad))
                .OnComplete(() =>
                {
                    _index = next;
                    ScheduleNext();
                });
        }

        public void Realign()
        {
            if (!_running) return;
            if (_hop != null) _hop.Kill();
            _hand.localPosition = PointFor(_index);
            ScheduleNext();
        }

        public void Stop()
        {
            _running = false;
            if (_hop != null) { _hop.Kill(); _hop = null; }
            if (_pulse != null) { _pulse.Kill(); _pulse = null; }
            if (_hand == null) return;
            _hand.localPosition = _restLocalPosition;
            _hand.localScale = _restScale;
            _hand.gameObject.SetActive(false);
        }

        private void OnDisable() { Stop(); }
        private void OnDestroy() { Stop(); }
    }
}
