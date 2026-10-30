using UnityEngine;

namespace Playable
{
    public class EggCtaLayout : MonoBehaviour
    {
        [SerializeField] private RectTransform _title, _button;
        private Vector2 _lastSize;
        private void OnEnable() { _lastSize = Vector2.zero; }
        private void LateUpdate()
        {
            Vector2 size = ((RectTransform)transform).rect.size;
            if (size == _lastSize) return;
            _lastSize = size;
            bool landscape = size.x > size.y;
            // Portrait follows screen width; landscape uses more of the available height.
            float scale = landscape
                ? Mathf.Min(size.x / 1160f, size.y / 760f)
                : size.x / 1080f;
            float titleHeight = 334f * scale;
            float buttonHeight = 172f * scale;
            float gap = 90f * scale;
            _title.sizeDelta = new Vector2(1000f * scale, titleHeight);
            _button.sizeDelta = new Vector2(620f * scale, buttonHeight);
            _title.anchoredPosition = new Vector2(0, (buttonHeight + gap) * .5f);
            _button.anchoredPosition = new Vector2(0, -(titleHeight + gap) * .5f);
        }
    }
}
