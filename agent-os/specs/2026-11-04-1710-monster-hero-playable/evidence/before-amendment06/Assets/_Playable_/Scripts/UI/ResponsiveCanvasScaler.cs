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


        private CanvasScaler _canvasScaler;
        private Vector2Int _lastScreenSize;

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
            Vector2Int currentScreenSize = new Vector2Int(Screen.width, Screen.height);
            if (currentScreenSize == _lastScreenSize)
            {
                return;
            }

            ApplyScaleSettings();
        }

        private void OnValidate()
        {
            _canvasScaler = GetComponent<CanvasScaler>();
            ApplyScaleSettings();
        }

        public void ApplyScaleSettings()
        {
            if (_canvasScaler == null)
            {
                return;
            }

            if (Screen.height == 0)
            {
                return;
            }

            float aspectRatio = (float)Screen.width / Screen.height;

            _canvasScaler.uiScaleMode = CanvasScaler.ScaleMode.ScaleWithScreenSize;
            _canvasScaler.referenceResolution = _referenceResolution;
            _canvasScaler.screenMatchMode = CanvasScaler.ScreenMatchMode.MatchWidthOrHeight;
            _canvasScaler.matchWidthOrHeight = GetMatchValue(aspectRatio);

            _lastScreenSize = new Vector2Int(Screen.width, Screen.height);
        }

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

            return _squareMatch;
        }
    }
}