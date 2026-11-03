using UnityEngine;
using UnityEngine.UI;

namespace Playable
{
    [RequireComponent(typeof(CanvasScaler))]
    public class ResponsiveCanvasScaler : MonoBehaviour
    {
        [Header("Reference Resolution")] [SerializeField]
        private Vector2 _referenceResolution = new Vector2(1080f, 1920f);

        [Header("Match Settings")] [SerializeField] [Range(0f, 1f)]
        private float _portraitMatch = 1f;

        [SerializeField] [Range(0f, 1f)] private float _landscapeMatch = 0f;
        [SerializeField] [Range(0f, 1f)] private float _squareMatch = 0.5f;

        [Header("Aspect Ratio Thresholds")] [SerializeField]
        private float _portraitAspectThreshold = 0.7f;

        [SerializeField] private float _landscapeAspectThreshold = 1.3f;

        [Header("Stability")]
        [Tooltip("Chỉ áp dụng lại khi tỉ lệ màn hình đổi hơn ngưỡng này. Tránh rebuild canvas khi trình duyệt co giãn vài pixel")]
        [SerializeField]
        private float _aspectEpsilon = 0.005f;

        private CanvasScaler _canvasScaler;
        private float _lastAspectRatio = -1f;

        private void Awake()
        {
            _canvasScaler = GetComponent<CanvasScaler>();
            ApplyScaleSettings();
        }

        private void OnEnable()
        {
            ApplyScaleSettings();
        }

        private void Update()
        {
            if (Screen.height <= 0)
            {
                return;
            }

            float aspectRatio = (float)Screen.width / Screen.height;

            // Mỗi lần gán property của CanvasScaler là canvas bị đánh dấu dirty và rebuild lại
            // toàn bộ. Trên trình duyệt mobile, thanh địa chỉ ẩn/hiện khi chạm làm Screen.height
            // đổi liên tục -> nếu áp dụng lại mỗi lần thì UI giật/nhảy.
            if (Mathf.Abs(aspectRatio - _lastAspectRatio) < _aspectEpsilon)
            {
                return;
            }

            ApplyScaleSettings();
        }

        private void OnValidate()
        {
            _canvasScaler = GetComponent<CanvasScaler>();
            _lastAspectRatio = -1f;
            ApplyScaleSettings();
        }

        public void ApplyScaleSettings()
        {
            if (_canvasScaler == null || Screen.height <= 0)
            {
                return;
            }

            float aspectRatio = (float)Screen.width / Screen.height;

            if (_canvasScaler.uiScaleMode != CanvasScaler.ScaleMode.ScaleWithScreenSize)
            {
                _canvasScaler.uiScaleMode = CanvasScaler.ScaleMode.ScaleWithScreenSize;
            }

            if (_canvasScaler.referenceResolution != _referenceResolution)
            {
                _canvasScaler.referenceResolution = _referenceResolution;
            }

            if (_canvasScaler.screenMatchMode != CanvasScaler.ScreenMatchMode.MatchWidthOrHeight)
            {
                _canvasScaler.screenMatchMode = CanvasScaler.ScreenMatchMode.MatchWidthOrHeight;
            }

            float match = GetMatchValue(aspectRatio);

            if (!Mathf.Approximately(_canvasScaler.matchWidthOrHeight, match))
            {
                _canvasScaler.matchWidthOrHeight = match;
            }

            _lastAspectRatio = aspectRatio;
        }

        /// <summary>
        /// Nội suy liên tục giữa 3 mốc portrait / square / landscape.
        /// Bản cũ nhảy thẳng 1 -> 0.5 -> 0 khi vượt ngưỡng, nên chỉ cần màn hình đổi
        /// vài pixel quanh ngưỡng là toàn bộ UI đổi tỉ lệ đột ngột.
        /// </summary>
        private float GetMatchValue(float aspectRatio)
        {
            if (aspectRatio <= _portraitAspectThreshold)
            {
                return _portraitMatch;
            }

            if (aspectRatio >= _landscapeAspectThreshold)
            {
                return _landscapeMatch;
            }

            float middleAspect = (_portraitAspectThreshold + _landscapeAspectThreshold) * 0.5f;

            if (aspectRatio <= middleAspect)
            {
                float t = Mathf.InverseLerp(_portraitAspectThreshold, middleAspect, aspectRatio);
                return Mathf.Lerp(_portraitMatch, _squareMatch, t);
            }

            float landscapeT = Mathf.InverseLerp(middleAspect, _landscapeAspectThreshold, aspectRatio);
            return Mathf.Lerp(_squareMatch, _landscapeMatch, landscapeT);
        }
    }
}
