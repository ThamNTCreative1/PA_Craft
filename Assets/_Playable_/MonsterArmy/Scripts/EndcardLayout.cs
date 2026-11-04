using UnityEngine;
using UnityEngine.UI;

namespace Playable.MonsterArmy
{
    [ExecuteAlways, DisallowMultipleComponent]
    public sealed class EndcardLayout : MonoBehaviour
    {
        [SerializeField] private RectTransform _title;
        [SerializeField] private RectTransform _button;
        private RectTransform _root;
        private Rect _lastRect, _lastSafeArea;

        private void OnEnable()
        {
            _root = (RectTransform)transform;
            RefreshLayout();
        }

        private void LateUpdate()
        {
            if (_root == null) _root = (RectTransform)transform;
            if (_root.rect != _lastRect || Screen.safeArea != _lastSafeArea) RefreshLayout();
        }

        private void RefreshLayout()
        {
            if (_title == null || _button == null || Screen.width <= 0 || Screen.height <= 0) return;
            _lastRect = _root.rect;
            _lastSafeArea = Screen.safeArea;
            Rect safe = _lastSafeArea;
            if (safe.width <= 0f || safe.height <= 0f) safe = new Rect(0f, 0f, Screen.width, Screen.height);
            float width = _lastRect.width * safe.width / Screen.width;
            float height = _lastRect.height * safe.height / Screen.height;
            Vector2 center = new Vector2(
                (safe.center.x / Screen.width - 0.5f) * _lastRect.width,
                (safe.center.y / Screen.height - 0.5f) * _lastRect.height);
            Image titleImage = _title.GetComponent<Image>();
            float aspect = titleImage != null && titleImage.sprite != null
                ? titleImage.sprite.rect.width / titleImage.sprite.rect.height : 1.5f;
            bool portrait = height > width;
            float titleWidth = Mathf.Min(width * (portrait ? 0.94f : 0.68f),
                height * (portrait ? 0.48f : 0.60f) * aspect);
            float titleHeight = titleWidth / aspect;
            float buttonWidth = Mathf.Min(width * (portrait ? 0.76f : 0.40f), titleWidth * 0.82f);
            Image buttonImage = _button.GetComponent<Image>();
            float buttonAspect = buttonImage != null && buttonImage.sprite != null
                ? buttonImage.sprite.rect.width / buttonImage.sprite.rect.height : 3f;
            float buttonHeight = buttonWidth / buttonAspect;
            float gap = height * (portrait ? 0.025f : 0.02f);
            float totalHeight = titleHeight + gap + buttonHeight;
            Place(_title, new Vector2(titleWidth, titleHeight),
                center + Vector2.up * (totalHeight * 0.5f - titleHeight * 0.5f));
            Place(_button, new Vector2(buttonWidth, buttonHeight),
                center + Vector2.down * (totalHeight * 0.5f - buttonHeight * 0.5f));
        }

        private static void Place(RectTransform rect, Vector2 size, Vector2 position)
        {
            rect.anchorMin = rect.anchorMax = rect.pivot = new Vector2(0.5f, 0.5f);
            rect.sizeDelta = size;
            rect.anchoredPosition = position;
        }
    }
}
