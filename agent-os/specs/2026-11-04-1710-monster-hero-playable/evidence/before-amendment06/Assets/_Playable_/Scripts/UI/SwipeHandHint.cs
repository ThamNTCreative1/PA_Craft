using UnityEngine;

namespace Playable
{
    [RequireComponent(typeof(RectTransform))]
    public class SwipeHandHint : MonoBehaviour
    {
        [SerializeField] private float _distance = 90f;
        [SerializeField, Min(0.1f)] private float _duration = 1.2f;
        private RectTransform _rect;
        private Vector2 _origin;
        private float _elapsed;

        private void OnEnable()
        {
            _rect = (RectTransform)transform;
            _origin = _rect.anchoredPosition;
            _elapsed = 0;
        }
        private void Update()
        {
            _elapsed += Time.unscaledDeltaTime;
            _rect.anchoredPosition = _origin + Vector2.right *
                (Mathf.Sin(_elapsed * Mathf.PI / _duration) * _distance);
        }
        private void OnDisable()
        {
            if (_rect != null) _rect.anchoredPosition = _origin;
        }
    }
}
