using DG.Tweening;
using TMPro;
using UnityEngine;
using UnityEngine.UI;
namespace Playable.TempleRun
{
    public class HideSeekView : MonoBehaviour
    {
        public GameObject selection, gameplay;
        public RectTransform safeRoot, cards, selectHand, moveHand, joystick;
        public RectTransform instructionRoot;
        public TMP_Text instructionLabel;
        public TMP_Text timer;
        public RectTransform status, jumpButton, characterButton, colorButton;
        private Sequence _selectTween, _moveTween;
        private Tween _pulse;
        private Vector2 _screen;
        private Rect _safeArea;
        private Image _selectionBackground, _selectionOverlay;

        public void SetSelectionBackground(Sprite background)
        {
            if (selection == null) return;
            if (_selectionBackground == null)
            {
                _selectionBackground = selection.GetComponent<Image>();
                if (_selectionBackground == null)
                    _selectionBackground = selection.AddComponent<Image>();
            }
            _selectionBackground.sprite = background;
            _selectionBackground.color = background != null ? Color.white : Color.clear;
            _selectionBackground.type = Image.Type.Simple;
            _selectionBackground.preserveAspect = false;
            _selectionBackground.raycastTarget = true;

            if (_selectionOverlay == null)
            {
                var overlay = new GameObject("Selection Dark Overlay", typeof(RectTransform), typeof(Image));
                var rect = (RectTransform)overlay.transform;
                rect.SetParent(selection.transform, false);
                rect.anchorMin = Vector2.zero;
                rect.anchorMax = Vector2.one;
                rect.offsetMin = rect.offsetMax = Vector2.zero;
                rect.SetAsFirstSibling();
                _selectionOverlay = overlay.GetComponent<Image>();
            }
            _selectionOverlay.color = new Color(0f, 0f, 0f, 0.7f);
            _selectionOverlay.raycastTarget = false;
        }

        public void ShowSelection()
        {
            selection.SetActive(true); gameplay.SetActive(false); RefreshLayout();
            selectHand.anchoredPosition = new Vector2(-220,-70);
            _selectTween = DOTween.Sequence().Append(selectHand.DOScale(0.85f,0.22f)).Append(selectHand.DOScale(1,0.22f))
                .AppendInterval(0.25f).Append(selectHand.DOAnchorPosX(220,0.7f).SetEase(Ease.InOutSine))
                .Append(selectHand.DOScale(0.85f,0.22f)).Append(selectHand.DOScale(1,0.22f))
                .AppendInterval(0.25f).Append(selectHand.DOAnchorPosX(-220,0.7f).SetEase(Ease.InOutSine)).SetLoops(-1);
        }
        public void ShowGameplay(bool hider)
        {
            StopTutorials(); selection.SetActive(false); gameplay.SetActive(true);
            if (instructionLabel != null)
                instructionLabel.text = hider ? "Find a Spot to Hide" : "Find Those Who Are Hiding";
            _pulse = instructionRoot.DOScale(1.06f,0.6f).SetEase(Ease.InOutSine).SetLoops(-1,LoopType.Yoyo);
            moveHand.anchoredPosition = new Vector2(28,-28);
            _moveTween = DOTween.Sequence().Append(moveHand.DOAnchorPos(new Vector2(28,55),0.8f).SetEase(Ease.InOutSine))
                .AppendInterval(0.2f).Append(moveHand.DOAnchorPos(new Vector2(28,-28),0.25f)).AppendInterval(0.25f).SetLoops(-1);
        }
        public void SetTime(float time) { timer.text = Mathf.CeilToInt(time).ToString(); }
        private void LateUpdate()
        {
            if (_screen != new Vector2(Screen.width,Screen.height) || _safeArea != Screen.safeArea)
                RefreshLayout();
        }
        public void RefreshLayout()
        {
            _screen = new Vector2(Screen.width,Screen.height);
            Rect safe = Screen.safeArea;
            _safeArea = safe;
            if (safe.width <= 0 || safe.height <= 0)
                safe = new Rect(0, 0, Screen.width, Screen.height);
            if (Screen.width > 0 && Screen.height > 0)
            {
                safeRoot.anchorMin = new Vector2(safe.xMin / Screen.width,safe.yMin / Screen.height);
                safeRoot.anchorMax = new Vector2(safe.xMax / Screen.width,safe.yMax / Screen.height);
            }
            safeRoot.offsetMin = safeRoot.offsetMax = Vector2.zero;
            bool portrait = Screen.height > Screen.width;
            ApplyOrientation(portrait);
        }
        public void ApplyOrientation(bool portrait)
        {
            var scaler = GetComponent<CanvasScaler>();
            scaler.referenceResolution = portrait ? new Vector2(1080,1920) : new Vector2(1920,1080);
            scaler.screenMatchMode = CanvasScaler.ScreenMatchMode.MatchWidthOrHeight;
            scaler.matchWidthOrHeight = portrait ? 0 : 1;
            cards.localScale = Vector3.one * 1.15f;
            float hudScale = portrait ? 1.3f : 1f;
            if (status != null)
            {
                status.localScale = Vector3.one * hudScale;
                Place(status, new Vector2(0.5f, 0.92f));
            }
            Place(instructionRoot, new Vector2(0.5f, 0.75f));
            joystick.localScale = Vector3.one * hudScale;
            Place(joystick, new Vector2(portrait ? 0.17f : 0.11f, 0.145f));
            // Use one corner and equal canvas-unit spacing so aspect ratio cannot stretch the cluster.
            const float buttonSize = 180f;
            const float buttonGap = 40f;
            float step = (buttonSize + buttonGap) * hudScale;
            Vector2 bottomRight = new Vector2(-(30f + buttonSize * 0.5f), 60f + buttonSize * 0.5f) * hudScale;
            SetControl(jumpButton, hudScale, bottomRight + new Vector2(0, step));
            SetControl(characterButton, hudScale, bottomRight + new Vector2(-step, 0));
            SetControl(colorButton, hudScale, bottomRight);
        }
        private static void Place(RectTransform control, Vector2 anchor)
        {
            control.anchorMin = control.anchorMax = anchor;
            control.anchoredPosition = Vector2.zero;
        }
        private static void SetControl(RectTransform control, float scale, Vector2 position)
        {
            if (control == null) return;
            control.localScale = Vector3.one * scale;
            control.pivot = new Vector2(0.5f, 0.5f);
            control.sizeDelta = new Vector2(180f, 180f);
            Place(control, new Vector2(1f, 0f));
            control.anchoredPosition = position;
        }
        public void StopTutorials()
        {
            _selectTween?.Kill(); _moveTween?.Kill(); _pulse?.Kill();
            if (instructionRoot != null) instructionRoot.localScale = Vector3.one;
        }
        private void OnDestroy() { StopTutorials(); }
    }
}

