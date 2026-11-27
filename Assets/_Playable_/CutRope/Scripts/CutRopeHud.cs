using DG.Tweening;
using TMPro;
using UnityEngine;
using UnityEngine.UI;

namespace Playable.CutRope
{
    /// <summary>
    /// UI của playable: tiêu đề trên cùng, nút Download dưới đáy, bàn tay hướng dẫn vuốt qua dây,
    /// end card. Kích thước tính theo vùng an toàn nên chạy đúng cả dọc lẫn ngang.
    /// </summary>
    [ExecuteAlways, DisallowMultipleComponent]
    public sealed class CutRopeHud : MonoBehaviour
    {
        private const float ButtonAspect = 3.1f;

        [SerializeField] private TMP_Text _title;
        [SerializeField] private RectTransform _downloadButton;
        [SerializeField] private RectTransform _hand;
        [SerializeField] private RectTransform _endCard;
        [SerializeField] private RectTransform _endCardContent;
        [SerializeField] private RectTransform _endCardButton;
        [SerializeField] private CanvasGroup _endCardGroup;
        [SerializeField] private Image _endCardIcon;
        [SerializeField] private Sprite _gameIcon;
        [SerializeField] private float _handSwipe = 230f;
        [SerializeField] private float _handLoop = 1.5f;

        private RectTransform _root;
        private Rect _lastRect;
        private Rect _lastSafe;
        private Graphic[] _handGraphics;
        private float _handClock;
        private Tween _titleTween;
        private Tween _buttonTween;
        private Tween _endButtonTween;

        [SerializeField] private Vector2 _endButtonPortrait = new Vector2(0f, -770f);
        [SerializeField] private Vector2 _endButtonLandscape = new Vector2(0f, -490f);

        [Tooltip("Màn dọc: khoảng hạ tiêu đề xuống từ mép trên (tỉ lệ chiều cao màn) — né tai thỏ.")]
        [SerializeField] private float _portraitTitleOffset = 0.05f;

        private bool _portrait = true;

        public RectTransform DownloadButton => _downloadButton;

        private void OnEnable()
        {
            _root = (RectTransform)transform;
            _lastRect = default;
            Refresh();
        }

        private void Start()
        {
            if (!Application.isPlaying) return;
            if (_endCardIcon != null)
            {
                _endCardIcon.sprite = _gameIcon;
                _endCardIcon.gameObject.SetActive(_gameIcon != null);
            }
            _titleTween = _title.rectTransform.DOScale(1.04f, 0.55f).SetEase(Ease.InOutSine).SetLoops(-1, LoopType.Yoyo);
            _buttonTween = _downloadButton.DOScale(1.07f, 0.5f).SetEase(Ease.InOutSine).SetLoops(-1, LoopType.Yoyo);
        }

        private void LateUpdate()
        {
            if (_root == null) _root = (RectTransform)transform;
            if (_root.rect != _lastRect || Screen.safeArea != _lastSafe) Refresh();
        }

        public void SetTitle(string value)
        {
            _title.text = value;
            _title.rectTransform.DOKill();
            _title.rectTransform.localScale = Vector3.one * 1.2f;
            _titleTween = _title.rectTransform.DOScale(1f, 0.35f).SetEase(Ease.OutBack);
        }

        /// <summary>Đặt bàn tay vuốt ngang qua điểm screenPoint (pixel màn hình), chạy vòng lặp.</summary>
        public void UpdateHand(Vector2 screenPoint, bool visible)
        {
            if (_hand == null) return;
            if (_hand.gameObject.activeSelf != visible) _hand.gameObject.SetActive(visible);
            if (!visible) return;
            if (_handGraphics == null) _handGraphics = _hand.GetComponentsInChildren<Graphic>(true);

            var parent = (RectTransform)_hand.parent;
            Vector2 local;
            RectTransformUtility.ScreenPointToLocalPointInRectangle(parent, screenPoint, null, out local);

            _handClock += Time.deltaTime;
            float t = Mathf.Repeat(_handClock, _handLoop) / _handLoop;
            // 0–0.15: hiện + nhấn xuống, 0.15–0.6: vuốt qua dây, 0.6–0.8: mờ dần, phần còn lại: nghỉ.
            float move = Mathf.SmoothStep(0f, 1f, Mathf.InverseLerp(0.15f, 0.6f, t));
            float alpha = t < 0.15f ? t / 0.15f : t < 0.6f ? 1f : Mathf.Clamp01(1f - (t - 0.6f) / 0.2f);
            float press = t < 0.15f ? Mathf.Lerp(1.15f, 1f, t / 0.15f) : 1f;
            float scale = Mathf.Min(_root.rect.width, _root.rect.height) / 1080f;
            float swipe = _handSwipe * scale;
            _hand.anchoredPosition = local + new Vector2(Mathf.Lerp(-swipe, swipe, move), Mathf.Lerp(swipe * 0.25f, -swipe * 0.25f, move));
            _hand.localScale = Vector3.one * press;
            for (int i = 0; i < _handGraphics.Length; i++)
            {
                Color c = _handGraphics[i].color;
                c.a = alpha;
                _handGraphics[i].color = c;
            }
        }

        public void ShowEndCard()
        {
            _hand.gameObject.SetActive(false);
            _title.gameObject.SetActive(false);
            _downloadButton.gameObject.SetActive(false);
            _endCard.gameObject.SetActive(true);
            Refresh();
            _endCardGroup.alpha = 0f;
            _endCardGroup.DOFade(1f, 0.35f);
            _endCardContent.localScale = Vector3.one * 0.6f;
            _endCardContent.DOScale(ContentScale(), 0.45f).SetEase(Ease.OutBack);
            _endButtonTween = _endCardButton.DOScale(1.08f, 0.5f).SetEase(Ease.InOutSine).SetLoops(-1, LoopType.Yoyo).SetDelay(0.45f);
        }

        private float ContentScale()
        {
            if (_root == null) return 1f;
            Rect r = _root.rect;
            // Dọc: nội dung end card thiết kế ở khung 1000 x 1900, nút Download giữa đáy.
            // Ngang: nút dạt sang phải (_endButtonLandscape) nên chỉ cần khung 2300 x 1250 → chữ to hơn,
            // phần giữa đáy chừa cho nhân vật đang nằm.
            return _portrait ? Mathf.Min(r.width / 1000f, r.height / 1900f) : Mathf.Min(r.width / 2300f, r.height / 1250f);
        }

        public void Refresh()
        {
            if (_root == null || _title == null || Screen.width <= 0 || Screen.height <= 0) return;
            _lastRect = _root.rect;
            _lastSafe = Screen.safeArea;

            Rect safe = _lastSafe;
            if (safe.width <= 0f || safe.height <= 0f) safe = new Rect(0f, 0f, Screen.width, Screen.height);
            float w = _lastRect.width * safe.width / Screen.width;
            float h = _lastRect.height * safe.height / Screen.height;
            Vector2 c = new Vector2(
                (safe.center.x / Screen.width - 0.5f) * _lastRect.width,
                (safe.center.y / Screen.height - 0.5f) * _lastRect.height);

            bool portrait = h >= w;
            _portrait = portrait;
            if (_endCardButton != null) _endCardButton.anchoredPosition = portrait ? _endButtonPortrait : _endButtonLandscape;
            float shortSide = Mathf.Min(w, h);
            float m = shortSide * 0.04f;
            float top = c.y + h * 0.5f - m;
            float bottom = c.y - h * 0.5f + m;

            if (portrait)
            {
                // Dọc: tiêu đề giữa trên cùng, nút Download giữa đáy.
                float titleH = Mathf.Min(h * 0.07f, w * 0.12f);
                Place(_title.rectTransform, w * 0.7f, titleH, new Vector2(c.x, top - titleH * 0.5f - h * _portraitTitleOffset));

                float buttonW = Mathf.Min(w * 0.5f, h * 0.085f * ButtonAspect);
                float buttonH = buttonW / ButtonAspect;
                Place(_downloadButton, buttonW, buttonH, new Vector2(c.x, bottom + buttonH * 0.5f + h * 0.02f));
            }
            else
            {
                // Ngang: tiêu đề giữa trên cùng, nút Download giữa đáy. Camera (CutRopeCamera) chừa lề
                // trên/dưới nên xà và nhân vật không bị UI đè.
                float titleH = Mathf.Min(h * 0.11f, w * 0.06f);
                Place(_title.rectTransform, Mathf.Min(w * 0.45f, titleH * 7f), titleH, new Vector2(c.x, top - titleH * 0.5f));

                float buttonW = Mathf.Min(w * 0.24f, h * 0.13f * ButtonAspect);
                float buttonH = buttonW / ButtonAspect;
                Place(_downloadButton, buttonW, buttonH, new Vector2(c.x, bottom + buttonH * 0.5f));
            }

            float handSize = shortSide * (portrait ? 0.2f : 0.17f);
            if (_hand != null) _hand.sizeDelta = new Vector2(handSize, handSize);

            if (_endCardContent != null && _endCard != null && _endCard.gameObject.activeSelf && Application.isPlaying
                && !DOTween.IsTweening(_endCardContent))
                _endCardContent.localScale = Vector3.one * ContentScale();
            else if (_endCardContent != null && !Application.isPlaying)
                _endCardContent.localScale = Vector3.one * ContentScale();
        }

        private static void Place(RectTransform rect, float width, float height, Vector2 position)
        {
            if (rect == null) return;
            rect.anchorMin = rect.anchorMax = new Vector2(0.5f, 0.5f);
            rect.sizeDelta = new Vector2(width, height);
            rect.anchoredPosition = position;
        }

        private void OnDestroy()
        {
            _titleTween?.Kill();
            _buttonTween?.Kill();
            _endButtonTween?.Kill();
            if (_title != null) _title.rectTransform.DOKill();
            if (_endCardContent != null) _endCardContent.DOKill();
        }
    }
}
