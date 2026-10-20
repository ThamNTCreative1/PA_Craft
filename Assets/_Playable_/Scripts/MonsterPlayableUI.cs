using DG.Tweening;
using UnityEngine;
using UnityEngine.UI;

namespace Playable
{
    public class MonsterPlayableUI : MonoBehaviour
    {
        [SerializeField] private Camera _camera;
        [SerializeField] private CanvasScaler _scaler;
        [SerializeField] private RectTransform _title, _tutorial, _hand;
        [SerializeField] private Transform _viewModel;
        [Header("Running arms framing")]
        [SerializeField] private Vector3 _runningOffsetLandscape=new Vector3(0,0.08f,0.1f);
        [SerializeField] private Vector3 _runningOffsetPortrait=new Vector3(0,0.12f,0.3f);
        [SerializeField, Range(0.2f,2f)] private float _runningScaleLandscape=1f;
        [SerializeField, Range(0.2f,2f)] private float _runningScalePortrait=0.85f;
        [Header("Running camera FOV")]
        [SerializeField, Range(30f,110f)] private float _cameraFovLandscape=70f;
        [SerializeField, Range(30f,110f)] private float _cameraFovPortrait=80f;
        private Vector3 _runningViewPosition;
        private Quaternion _runningViewRotation;
        private FirstPersonWeapon _weapon;
        private float _fovVelocity;
        private Tween _titleTween,_handTween;
        private int _width,_height;
        private void Awake()
        {
            _weapon = _viewModel.GetComponent<FirstPersonWeapon>();
            _runningViewPosition=_viewModel.localPosition;
            _runningViewRotation=_viewModel.localRotation;
            UpdateLayout();
            // Build text geometry at startup, not on the frame the weapon is drawn.
            foreach (var text in GetComponentsInChildren<TMPro.TMP_Text>(true))
                text.ForceMeshUpdate(true);
        }
        private void LateUpdate()
        {
            ApplyView(Screen.height>Screen.width);
        }
        private void ApplyView(bool portrait)
        {
            bool holding = _weapon && _weapon.IsHoldingWeapon;
            float targetFov = holding ? 60f : (portrait ? _cameraFovPortrait : _cameraFovLandscape);
            _camera.fieldOfView = Mathf.SmoothDamp(_camera.fieldOfView, targetFov,
                ref _fovVelocity, 0.35f, Mathf.Infinity, Time.deltaTime);
            if (_weapon && _weapon.IsHoldingWeapon)
            {
                // Keep the same vertical perspective and grip anchor in either orientation.
                // Horizontal placement follows the actual aspect ratio, including tablets.
                const float gripDepth = 0.60f;
                float halfHeight = gripDepth * Mathf.Tan(_camera.fieldOfView * 0.5f * Mathf.Deg2Rad);
                var gripInCamera = new Vector3(0.28f * halfHeight * _camera.aspect,
                    -0.44f * halfHeight, gripDepth);
                float referenceYaw = Mathf.Atan(0.28f * Mathf.Tan(30f * Mathf.Deg2Rad) * (9f / 16f));
                float viewYaw = Mathf.Atan2(gripInCamera.x, gripDepth);
                var holdingRotation = Quaternion.Euler(0, (viewYaw - referenceYaw) * Mathf.Rad2Deg, 0)
                    * _runningViewRotation;
                float hiddenAmount = 1f - _weapon.DrawProgress;
                holdingRotation *= Quaternion.Euler(15f * hiddenAmount, 0, 0);
                _viewModel.localPosition = gripInCamera - holdingRotation * _weapon.HoldingPosePosition
                    + Vector3.down * (0.65f * hiddenAmount);
                _viewModel.localRotation = holdingRotation;
                _viewModel.localScale = Vector3.one;
                return;
            }
            var runOffset=portrait ? _runningOffsetPortrait : _runningOffsetLandscape;
            _viewModel.localPosition=_runningViewPosition+runOffset;
            _viewModel.localRotation=_runningViewRotation;
            _viewModel.localScale=Vector3.one*(portrait ? _runningScalePortrait : _runningScaleLandscape);
        }
        private void Update() { if(_width!=Screen.width || _height!=Screen.height) UpdateLayout(); }
        private void UpdateLayout()
        {
            _width=Screen.width; _height=Screen.height;
            bool portrait=_height>_width;
            _scaler.referenceResolution=portrait ? new Vector2(1080,1920) : new Vector2(1920,1080);
            _scaler.matchWidthOrHeight=0.5f;
            _title.anchoredPosition=new Vector2(0,portrait ? -220 : -105);
            _tutorial.anchoredPosition=new Vector2(0,portrait ? 330 : 190);
        }
        public void Show()
        {
            _title.gameObject.SetActive(true); _tutorial.gameObject.SetActive(true);
            _title.localScale=Vector3.one; _hand.localScale=Vector3.one;
            _titleTween=_title.DOScale(1.08f,0.55f).SetEase(Ease.InOutSine).SetLoops(-1,LoopType.Yoyo);
            _handTween=_hand.DOScale(0.82f,0.45f).SetEase(Ease.InOutSine).SetLoops(-1,LoopType.Yoyo);
        }
        public void HideTutorial() { _handTween?.Kill(); _tutorial.gameObject.SetActive(false); }
        public void Hide() { _titleTween?.Kill(); _title.gameObject.SetActive(false); HideTutorial(); }
        private void OnDestroy() { _titleTween?.Kill(); _handTween?.Kill(); }
    }
}
