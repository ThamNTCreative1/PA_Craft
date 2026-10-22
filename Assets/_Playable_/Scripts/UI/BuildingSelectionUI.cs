using UnityEngine;
using UnityEngine.UI;
using TMPro;

namespace Playable
{
    // Runs after GameManager.Start so its full-screen CTA button is immediately enabled.
    [DefaultExecutionOrder(100)]
    public sealed class BuildingSelectionUI : MonoBehaviour
    {
        [SerializeField] private GameManager _manager;
        [SerializeField] private RectTransform _safeArea;
        [SerializeField] private RectTransform _grid;
        [SerializeField] private RectTransform[] _buttons;
        [SerializeField] private TMP_Text _title;
        [SerializeField] private TMP_Text _brand;
        [SerializeField] private TMP_Text _progressLabel;
        [SerializeField] private RectTransform _progress;
        [SerializeField] private Slider _progressSlider;
        [SerializeField] private RectTransform _hand;
        [SerializeField] private Button _block;
        [SerializeField, Min(.1f)] private float _moveDuration = .45f;
        [SerializeField, Min(.1f)] private float _holdDuration = .7f;
        private Vector2 _lastSize;
        private Rect _lastSafeArea;
        private float _handTime;
        private bool _firstHandFrame;

        private void Start()
        {
            _handTime = 0f;
            _firstHandFrame = true;
            _manager.CountdownExpired += OnTimeout;
            _block.onClick.AddListener(OnTap);
            _block.gameObject.SetActive(true);
            _block.transform.SetAsLastSibling();
            _hand.gameObject.SetActive(true);
            _progressSlider.SetValueWithoutNotify(.1f);
            _progressLabel.text = "Progress 10%";
            Canvas.ForceUpdateCanvases();
            RefreshLayout();
            PositionHand(0f);
        }

        private void OnTap() { _manager.EndGame(); }
        private void OnTimeout() { _manager.EndGame(); _manager.ShowCTA(); }
        private void OnDestroy()
        {
            if (_manager != null) _manager.CountdownExpired -= OnTimeout;
            if (_block != null) _block.onClick.RemoveListener(OnTap);
        }

        private void LateUpdate()
        {
            var size = ((RectTransform)transform).rect.size;
            if (size != _lastSize || Screen.safeArea != _lastSafeArea) RefreshLayout();
            if (_manager != null && _manager.HasEnded) return;
            // Hold on button 1 for the first rendered frame. Loading or a slow
            // frame must never advance the tutorial past one or more buttons.
            if (_firstHandFrame)
            {
                _firstHandFrame = false;
                PositionHand(0f);
                return;
            }
            _handTime += Mathf.Min(Time.unscaledDeltaTime, .05f);
            PositionHand(_handTime);
        }

        public void RefreshLayout()
        {
            var root = (RectTransform)transform;
            _lastSize = root.rect.size;
            _lastSafeArea = Screen.safeArea;
            if (Screen.width > 0 && Screen.height > 0)
            {
                _safeArea.anchorMin = new Vector2(_lastSafeArea.xMin / Screen.width, _lastSafeArea.yMin / Screen.height);
                _safeArea.anchorMax = new Vector2(_lastSafeArea.xMax / Screen.width, _lastSafeArea.yMax / Screen.height);
            }
            _safeArea.offsetMin = _safeArea.offsetMax = Vector2.zero;
            LayoutForSize(_safeArea.rect.size);
        }

        // Also used by editor previews; coordinates are local Canvas units.
        public void LayoutForSize(Vector2 size)
        {
            float width = size.x, height = size.y;
            float cell = Mathf.Min(width * .86f / 3.2f, height * .77f / 4.3f);
            float gap = cell * .12f;
            float gridWidth = cell * 3 + gap * 2;
            float gridHeight = cell * 4 + gap * 3;
            _grid.sizeDelta = new Vector2(gridWidth, gridHeight);
            _grid.anchoredPosition = new Vector2(0, -height * .055f);
            for (int i = 0; i < _buttons.Length; i++)
            {
                _buttons[i].sizeDelta = Vector2.one * cell;
                _buttons[i].anchoredPosition = new Vector2((i % 3 - 1) * (cell + gap), (1.5f - i / 3) * (cell + gap));
            }
            _title.rectTransform.sizeDelta = new Vector2(width * .9f, height * .09f);
            _title.rectTransform.anchoredPosition = new Vector2(0, height * .405f);
            _title.fontSize = Mathf.Min(width * .043f, height * .043f);
            if (_brand != null)
            {
            _brand.rectTransform.sizeDelta = new Vector2(width * .18f, height * .07f);
            _brand.rectTransform.anchoredPosition = new Vector2(width * .39f, height * .46f);
            _brand.fontSize = Mathf.Min(width * .025f, height * .026f);
            }
            _progress.sizeDelta = new Vector2(gridWidth * .64f, cell * .18f);
            _progress.anchoredPosition = _grid.anchoredPosition;
            _progressLabel.rectTransform.sizeDelta = new Vector2(gridWidth, cell * .24f);
            _progressLabel.rectTransform.anchoredPosition = _progress.anchoredPosition + new Vector2(0, cell * .19f);
            _progressLabel.fontSize = cell * .145f;
            _hand.sizeDelta = new Vector2(cell * .82f, cell * 1.02f);
            PositionHand(_handTime);
        }

        public void PositionHand(float time)
        {
            if (_buttons == null || _buttons.Length == 0 || _hand == null) return;
            float duration = _holdDuration + _moveDuration;
            int index = Mathf.FloorToInt(time / duration) % _buttons.Length;
            float phase = time % duration;
            Vector3 from = _buttons[index].position;
            Vector3 to = _buttons[(index + 1) % _buttons.Length].position;
            float t = Mathf.Clamp01((phase - _holdDuration) / _moveDuration);
            t = t * t * (3 - 2 * t);
            _hand.position = Vector3.Lerp(from, to, t);
            float pulse = phase < _holdDuration ? 1f - .08f * Mathf.Sin(phase / _holdDuration * Mathf.PI) : 1f;
            _hand.localScale = Vector3.one * pulse;
        }
    }
}
