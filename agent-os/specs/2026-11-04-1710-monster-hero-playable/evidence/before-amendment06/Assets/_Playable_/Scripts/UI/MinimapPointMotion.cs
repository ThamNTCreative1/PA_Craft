using UnityEngine;

namespace Playable
{
    public class MinimapPointMotion : MonoBehaviour
    {
        [SerializeField] private RectTransform[] _points;
        [SerializeField, Min(0f)] private float _distance = 12f;
        [SerializeField, Min(0.1f)] private float _duration = 0.8f;
        private Vector2[] _origins;
        private float _elapsed;

        private void Awake()
        {
            if (_points == null) _points = new RectTransform[0];
            _origins = new Vector2[_points.Length];
            for (int i = 0; i < _points.Length; i++)
                if (_points[i] != null) _origins[i] = _points[i].anchoredPosition;
        }

        private void OnEnable() { _elapsed = 0f; }

        private void Update()
        {
            _elapsed += Time.unscaledDeltaTime;
            float offset = -_distance * (1f - Mathf.Cos(_elapsed * Mathf.PI / _duration)) * 0.5f;
            for (int i = 0; i < _points.Length; i++)
                if (_points[i] != null) _points[i].anchoredPosition = _origins[i] + Vector2.up * offset;
        }

        private void OnDisable()
        {
            if (_origins == null) return;
            for (int i = 0; i < _points.Length; i++)
                if (_points[i] != null) _points[i].anchoredPosition = _origins[i];
        }
    }
}
