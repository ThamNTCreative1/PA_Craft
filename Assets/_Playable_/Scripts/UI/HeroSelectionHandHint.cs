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
        [SerializeField, Min(1f)] private float _targetPulseScale = 1.08f;
        [SerializeField, Min(0f)] private float _minEdgeGap = 4f;

        private int _index;
        private bool _running, _moving, _basesCached;
        private Sequence _hop;
        private Tween _pulse;
        private Vector3 _restLocalPosition, _restScale;
        private Vector3[] _targetBaseScales;
        private Vector3[] _corners;
        private Rect[] _bounds;

        private void Awake()
        {
            _targetBaseScales = new Vector3[4];
            _corners = new Vector3[4];
            _bounds = new Rect[4];
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
            for (int i = 0; i < 4; i++) _targetBaseScales[i] = _targets[i].localScale;
            _basesCached = true;
            CacheBounds();
            _running = true;
            _hand.gameObject.SetActive(true);
            _hand.SetAsLastSibling();
            StartDwell(0);
        }

        private void CacheBounds()
        {
            for (int i = 0; i < 4; i++)
            {
                _targets[i].GetWorldCorners(_corners);
                Vector2 min = new Vector2(float.PositiveInfinity, float.PositiveInfinity);
                Vector2 max = new Vector2(float.NegativeInfinity, float.NegativeInfinity);
                for (int c = 0; c < 4; c++)
                {
                    Vector2 point = _hand.parent.InverseTransformPoint(_corners[c]);
                    min = Vector2.Min(min, point);
                    max = Vector2.Max(max, point);
                }
                _bounds[i] = Rect.MinMaxRect(min.x, min.y, max.x, max.y);
            }
        }

        private float PeakFor(int index)
        {
            Rect a = _bounds[index];
            Vector3 pivot = _hand.parent.InverseTransformPoint(_targets[index].position);
            float peak = Mathf.Max(1f, _targetPulseScale);
            for (int i = 0; i < 4; i++)
            {
                if (i == index) continue;
                Rect b = _bounds[i];
                if (a.yMin < b.yMax && a.yMax > b.yMin)
                {
                    if (b.xMin >= a.xMax) peak = LimitPeak(peak, b.xMin - a.xMax, a.xMax - pivot.x);
                    else if (b.xMax <= a.xMin) peak = LimitPeak(peak, a.xMin - b.xMax, pivot.x - a.xMin);
                }
                if (a.xMin < b.xMax && a.xMax > b.xMin)
                {
                    if (b.yMin >= a.yMax) peak = LimitPeak(peak, b.yMin - a.yMax, a.yMax - pivot.y);
                    else if (b.yMax <= a.yMin) peak = LimitPeak(peak, a.yMin - b.yMax, pivot.y - a.yMin);
                }
            }
            return peak;
        }

        private float LimitPeak(float peak, float gap, float pivotDistance)
        {
            if (pivotDistance <= 0.001f) return peak;
            return Mathf.Max(1f, Mathf.Min(peak, 1f + (gap - _minEdgeGap) / pivotDistance));
        }

        private Vector3 PointFor(int index)
        {
            Rect rect = _targets[index].rect;
            Vector3 point = new Vector3(Mathf.Lerp(rect.xMin, rect.xMax, _targetPoint.x),
                Mathf.Lerp(rect.yMin, rect.yMax, _targetPoint.y), 0f);
            return _hand.parent.InverseTransformPoint(_targets[index].TransformPoint(point));
        }

        private void StartDwell(int index)
        {
            if (!_running) return;
            _index = index;
            _moving = false;
            _hand.localScale = _restScale;
            _hand.localPosition = PointFor(index);
            float duration = Mathf.Max(0.01f, _pulseDuration);
            _pulse = DOTween.Sequence().SetUpdate(true)
                .Append(_hand.DOScale(_restScale * _pulseScale, duration).SetEase(Ease.InOutSine))
                .Join(_targets[index].DOScale(_targetBaseScales[index] * PeakFor(index), duration).SetEase(Ease.InOutSine))
                .SetLoops(-1, LoopType.Yoyo);
            int next = (index + 1) % 4;
            _hop = DOTween.Sequence().SetUpdate(true)
                .AppendInterval(Mathf.Max(0.01f, _dwellDuration))
                .AppendCallback(() => BeginMove(next));
        }

        private void BeginMove(int next)
        {
            if (!_running) return;
            if (_pulse != null) { _pulse.Kill(); _pulse = null; }
            RestoreTargets();
            _moving = true;
            float duration = Mathf.Max(0.01f, _moveDuration);
            _hop = DOTween.Sequence().SetUpdate(true)
                .Append(_hand.DOLocalMove(PointFor(next), duration).SetEase(Ease.OutQuad))
                .Join(_hand.DOScale(_restScale, duration).SetEase(Ease.OutQuad))
                .OnComplete(() => StartDwell(next));
        }

        private void LateUpdate()
        {
            if (_running && !_moving) _hand.localPosition = PointFor(_index);
        }

        public void Realign()
        {
            if (!_running) return;
            if (_hop != null) { _hop.Kill(); _hop = null; }
            if (_pulse != null) { _pulse.Kill(); _pulse = null; }
            RestoreTargets();
            CacheBounds();
            StartDwell(_index);
        }

        private void RestoreTargets()
        {
            if (!_basesCached || _targets == null) return;
            for (int i = 0; i < _targets.Length && i < 4; i++)
                if (_targets[i] != null) _targets[i].localScale = _targetBaseScales[i];
        }

        public void Stop()
        {
            _running = false;
            _moving = false;
            if (_hop != null) { _hop.Kill(); _hop = null; }
            if (_pulse != null) { _pulse.Kill(); _pulse = null; }
            RestoreTargets();
            if (_hand == null) return;
            _hand.localPosition = _restLocalPosition;
            _hand.localScale = _restScale;
            _hand.gameObject.SetActive(false);
        }

        private void OnDisable() { Stop(); }
        private void OnDestroy() { Stop(); }
    }
}
