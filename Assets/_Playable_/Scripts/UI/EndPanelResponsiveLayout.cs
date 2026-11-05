using UnityEngine;

namespace Playable
{
    [DisallowMultipleComponent]
    public sealed class EndPanelResponsiveLayout : MonoBehaviour
    {
        [SerializeField] private RectTransform _title;
        [SerializeField] private RectTransform _button;
        [SerializeField] private Vector2 _titleBaseSize = new Vector2(1353.5f, 676.76f);
        [SerializeField] private Vector2 _buttonBaseSize = new Vector2(901.22f, 300.97f);

        private RectTransform _root;
        private Vector2 _lastRootSize;

        private void OnEnable()
        {
            _root = transform as RectTransform;
            if (_root == null || _title == null || _button == null ||
                _titleBaseSize.x <= 0f || _titleBaseSize.y <= 0f ||
                _buttonBaseSize.x <= 0f || _buttonBaseSize.y <= 0f)
            {
                Debug.LogError("End panel layout needs a RectTransform root, title/button references and positive base sizes.", this);
                enabled = false;
                return;
            }
            ApplyLayout();
        }

        private void LateUpdate()
        {
            if (_root.rect.size != _lastRootSize) ApplyLayout();
        }

        private void ApplyLayout()
        {
            _lastRootSize = _root.rect.size;
            float fit = Mathf.Max(0f, Mathf.Min(_lastRootSize.x * 0.9f / 1360f,
                _lastRootSize.y * 0.88f / 1120f));
            _title.anchorMin = _title.anchorMax = new Vector2(0.5f, 0.5f);
            _title.pivot = new Vector2(0.5f, 0.5f);
            _title.sizeDelta = _titleBaseSize * fit;
            _title.anchoredPosition = new Vector2(0f, 200f) * fit;
            _button.anchorMin = _button.anchorMax = new Vector2(0.5f, 0.5f);
            _button.pivot = new Vector2(0.5f, 0.5f);
            _button.sizeDelta = _buttonBaseSize * fit;
            _button.anchoredPosition = new Vector2(0f, -340f) * fit;
            // Button localScale belongs to the existing CTA pulse tween.
        }
    }
}
