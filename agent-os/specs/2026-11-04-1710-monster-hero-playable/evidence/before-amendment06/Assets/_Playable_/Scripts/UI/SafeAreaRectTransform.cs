using UnityEngine;

namespace Playable
{
    [DisallowMultipleComponent]
    [RequireComponent(typeof(RectTransform))]
    public class SafeAreaRectTransform : MonoBehaviour
    {
        [SerializeField] private bool _applyHorizontal = true;
        [SerializeField] private bool _applyVertical = true;
        [SerializeField, Min(0f)] private float _fallbackTopInset;
        [SerializeField, Min(0f)] private float _fallbackLeftInset;
        [SerializeField, Min(1f)] private float _notchAspectThreshold = 2f;

        private RectTransform _rectTransform;
        private Rect _lastSafeArea;
        private int _lastScreenWidth = -1;
        private int _lastScreenHeight = -1;

        private void Awake()
        {
            _rectTransform = transform as RectTransform;
        }
        private void OnEnable()
        {
            ApplySafeArea(true);
        }

        private void Update()
        {
            ApplySafeArea(false);
        }

        private void ApplySafeArea(bool force)
        {
            if (_rectTransform == null || Screen.width <= 0 || Screen.height <= 0) return;

            Rect safeArea = Screen.safeArea;
            if (!force
                && Mathf.Approximately(safeArea.x, _lastSafeArea.x)
                && Mathf.Approximately(safeArea.y, _lastSafeArea.y)
                && Mathf.Approximately(safeArea.width, _lastSafeArea.width)
                && Mathf.Approximately(safeArea.height, _lastSafeArea.height)
                && Screen.width == _lastScreenWidth
                && Screen.height == _lastScreenHeight)
            {
                return;
            }

            _lastSafeArea = safeArea;
            _lastScreenWidth = Screen.width;
            _lastScreenHeight = Screen.height;

            bool hasNativeSafeArea = safeArea.x > 0f
                                     || safeArea.y > 0f
                                     || safeArea.width < Screen.width
                                     || safeArea.height < Screen.height;
            if (!hasNativeSafeArea)
            {
                bool isPortrait = Screen.height >= Screen.width;
                float longSide = Mathf.Max(Screen.width, Screen.height);
                float shortSide = Mathf.Max(1f, Mathf.Min(Screen.width, Screen.height));
                bool mayHaveNotch = longSide / shortSide >= _notchAspectThreshold;
                if (mayHaveNotch)
                {
                    safeArea.x = isPortrait ? 0f : _fallbackLeftInset;
                    safeArea.y = 0f;
                    safeArea.width = Mathf.Max(0f, Screen.width - safeArea.x);
                    safeArea.height = Mathf.Max(0f, Screen.height - (isPortrait ? _fallbackTopInset : 0f));
                }
            }

            Vector2 anchorMin = new Vector2(safeArea.x, safeArea.y);
            Vector2 anchorMax = new Vector2(safeArea.x + safeArea.width, safeArea.y + safeArea.height);
            anchorMin.x /= Screen.width;
            anchorMin.y /= Screen.height;
            anchorMax.x /= Screen.width;
            anchorMax.y /= Screen.height;

            if (!_applyHorizontal)
            {
                anchorMin.x = 0f;
                anchorMax.x = 1f;
            }

            if (!_applyVertical)
            {
                anchorMin.y = 0f;
                anchorMax.y = 1f;
            }

            _rectTransform.anchorMin = anchorMin;
            _rectTransform.anchorMax = anchorMax;
            _rectTransform.offsetMin = Vector2.zero;
            _rectTransform.offsetMax = Vector2.zero;
        }
    }
}