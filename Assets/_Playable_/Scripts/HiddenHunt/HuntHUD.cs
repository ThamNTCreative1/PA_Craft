using DG.Tweening;
using TMPro;
using UnityEngine;
using UnityEngine.UI;

namespace Playable
{
    [ExecuteAlways]
    public sealed class HuntHUD : MonoBehaviour
    {
        [SerializeField] private CanvasScaler _scaler;
        [SerializeField] private RectTransform _safeArea, _banner, _counter, _joystick, _fire;
        [SerializeField] private TMP_Text _instruction, _count;
        [SerializeField] private RectTransform _fireHand, _moveHand, _infinity, _lookHand;
        private Tween _textPulse, _handTween, _countTween;
        private TMP_Text _lookAroundText;
        private Tween _lookAroundPulse;
        private int _width, _height;
        private Rect _safe;
        private bool _lookTutorial, _moveTutorial;
        // Extra inset for playable webviews that report the full screen as their safe area.
        private float TopInstructionY => Screen.height > Screen.width ? -200f : -140f;
        private void OnEnable() { RefreshLayout(); }
        private void Update()
        {
            if (_width != Screen.width || _height != Screen.height || _safe != Screen.safeArea) RefreshLayout();
        }
        public void RefreshLayout()
        {
            if (!_scaler || !_safeArea || Screen.height <= 0) return;
            _width = Screen.width; _height = Screen.height; _safe = Screen.safeArea;
            bool portrait = _height > _width;
            _scaler.referenceResolution = portrait ? new Vector2(1080, 1920) : new Vector2(1920, 1080);
            _scaler.matchWidthOrHeight = portrait ? 0f : 1f;
            _safeArea.anchorMin = new Vector2(_safe.xMin / _width, _safe.yMin / _height);
            _safeArea.anchorMax = new Vector2(_safe.xMax / _width, _safe.yMax / _height);
            _safeArea.offsetMin = _safeArea.offsetMax = Vector2.zero;
            _banner.sizeDelta = new Vector2(portrait ? 660 : 700, 108);
            _counter.anchoredPosition = new Vector2(-60, portrait ? -235 : -180);
            _joystick.anchoredPosition = new Vector2(250, 280);
            _fire.anchoredPosition = new Vector2(-250, 280);
            _infinity.anchorMin = _infinity.anchorMax = new Vector2(0.5f, 0f);
            _infinity.anchoredPosition = new Vector2(0, _joystick.anchoredPosition.y);
            _lookHand.sizeDelta = new Vector2(60, 75);
            _moveHand.sizeDelta = new Vector2(75, 90);
            if (_lookAroundText != null)
                _lookAroundText.rectTransform.anchoredPosition = new Vector2(18, TopInstructionY);
            LayoutInstruction();
        }
        public void SetCount(int value)
        {
            _count.text = value + "/5";
            _countTween?.Kill(); _counter.localScale = Vector3.one;
            if (value > 0) _countTween = _counter.DOPunchScale(Vector3.one * 0.16f, 0.3f, 1, 0.4f);
        }
        private void SetText(string text)
        {
            HideTutorial();
            _banner.gameObject.SetActive(true);
            _instruction.text = text;
            _textPulse = _instruction.transform.DOScale(1.075f, 0.48f).SetLoops(-1, LoopType.Yoyo).SetEase(Ease.InOutSine);
        }
        public void ShowShoot()
        {
            SetText("Tap to Shoot!");
            _fireHand.gameObject.SetActive(true);
            _handTween = _fireHand.DOScale(0.82f, 0.4f).SetLoops(-1, LoopType.Yoyo).SetEase(Ease.InOutSine);
        }
        public void ShowTurning()
        {
            HideTutorial();
            if (_lookAroundText == null)
            {
                _lookAroundText = Instantiate(_instruction, _safeArea);
                _lookAroundText.name = "Look Around Instruction";
                _lookAroundText.raycastTarget = false;
                _lookAroundText.rectTransform.anchorMin = _lookAroundText.rectTransform.anchorMax = new Vector2(0.5f, 1f);
            }
            _lookAroundText.text = "Look around!";
            _lookAroundText.gameObject.SetActive(true);
            _lookAroundText.rectTransform.anchoredPosition = new Vector2(18, TopInstructionY);
            _lookAroundPulse?.Kill();
            _lookAroundText.transform.localScale = Vector3.one;
            _lookAroundPulse = _lookAroundText.transform.DOScale(1.075f, 0.48f)
                .SetLoops(-1, LoopType.Yoyo).SetEase(Ease.InOutSine);
        }
        public void ShowLook()
        {
            SetText("Swipe to look");
            _lookTutorial = true;
            _textPulse?.Kill();
            _instruction.transform.localScale = Vector3.one;
            LayoutInstruction();
            _infinity.gameObject.SetActive(true);
            _lookHand.gameObject.SetActive(true);
            // Anchor the animation at the index fingertip in icon_hand.png.
            _lookHand.pivot = new Vector2(0.23f, 0.97f);
            _lookHand.anchorMin = _lookHand.anchorMax = new Vector2(0.5f, 0.5f);
            _lookHand.anchoredPosition = Vector2.zero;
            _handTween = DOVirtual.Float(0, 4, 2.8f, phase =>
                _lookHand.anchoredPosition = InfinityPoint(phase))
                .SetLoops(-1).SetEase(Ease.Linear);
        }
        private Vector2 InfinityPoint(float phase)
        {
            int segment = Mathf.Min(3, Mathf.FloorToInt(phase));
            float t = phase - segment;
            float side = segment < 2 ? 1f : -1f;
            bool outward = segment % 2 == 0;
            // Two rounded lobes following the center of the infinity sprite's stroke.
            Vector2 center = Vector2.zero;
            Vector2 edge = new Vector2(side * 0.435f, 0);
            Vector2 a = new Vector2(side * 0.255f, (outward ? 1 : -1) * 0.53f);
            Vector2 b = new Vector2(side * 0.435f, (outward ? 1 : -1) * 0.53f);
            Vector2 start = outward ? center : edge;
            Vector2 end = outward ? edge : center;
            Vector2 c1 = outward ? a : b;
            Vector2 c2 = outward ? b : a;
            float u = 1 - t;
            Vector2 point = u * u * u * start + 3 * u * u * t * c1 + 3 * u * t * t * c2 + t * t * t * end;
            return Vector2.Scale(point, _infinity.rect.size);
        }
        private void LayoutInstruction()
        {
            if (_lookTutorial)
            {
                _banner.anchorMin = _banner.anchorMax = _infinity.anchorMin;
                _banner.anchoredPosition = _infinity.anchoredPosition + new Vector2(0,
                    _infinity.rect.height * 0.5f + 12f + _instruction.rectTransform.rect.height * 0.5f);
                _instruction.rectTransform.anchoredPosition = Vector2.zero;
            }
            else if (_moveTutorial)
            {
                _banner.anchorMin = _banner.anchorMax = _joystick.anchorMin;
                _banner.anchoredPosition = _joystick.anchoredPosition + new Vector2(0,
                    _joystick.rect.height * (1f - _joystick.pivot.y) + 12f + _instruction.rectTransform.rect.height * 0.5f);
                _instruction.rectTransform.anchoredPosition = Vector2.zero;
            }
            else
            {
                _banner.anchorMin = _banner.anchorMax = new Vector2(0.5f, 1f);
                _banner.anchoredPosition = new Vector2(0, TopInstructionY);
                _instruction.rectTransform.anchoredPosition = new Vector2(18, 0);
            }
        }
        public void ShowMove()
        {
            SetText("Swipe to move");
            _moveTutorial = true;
            _textPulse?.Kill();
            _instruction.transform.localScale = Vector3.one;
            LayoutInstruction();
            _moveHand.gameObject.SetActive(true);
            _moveHand.anchoredPosition = new Vector2(25, -40);
            _handTween = _moveHand.DOAnchorPos(new Vector2(25, 60), 0.65f).SetLoops(-1, LoopType.Yoyo).SetEase(Ease.InOutSine);
        }
        public void HideTutorial()
        {
            _lookTutorial = _moveTutorial = false;
            LayoutInstruction();
            _textPulse?.Kill(); _handTween?.Kill();
            _instruction.transform.localScale = Vector3.one;
            _fireHand.localScale = Vector3.one;
            _banner.gameObject.SetActive(false);
            _fireHand.gameObject.SetActive(false); _moveHand.gameObject.SetActive(false);
            _infinity.gameObject.SetActive(false); _lookHand.gameObject.SetActive(false);
        }
        public void HideAllTutorials()
        {
            HideTutorial();
            _lookAroundPulse?.Kill();
            if (_lookAroundText != null) _lookAroundText.gameObject.SetActive(false);
        }
        private void OnDisable() { _textPulse?.Kill(); _handTween?.Kill(); _countTween?.Kill(); _lookAroundPulse?.Kill(); }
    }
}
