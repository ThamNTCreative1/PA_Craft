using DG.Tweening;
using TMPro;
using UnityEngine;
using UnityEngine.UI;

namespace Playable.CannonLaunch
{
    /// <summary>
    /// UI: tiền, Download, FIRE!, 2 thẻ Upgrade, bàn tay hướng dẫn, chữ "+$135" bay lên, end card.
    /// Vị trí / kích thước của mọi phần tử do người dựng tự đặt trong scene — script KHÔNG xếp bố cục,
    /// chỉ chạy hiệu ứng dựa trên vị trí / scale đã đặt (lưu lại lúc Awake).
    /// </summary>
    [DisallowMultipleComponent]
    public sealed class CannonHud : MonoBehaviour
    {
        // Vị trí đầu ngón tay so với tâm target (tỉ lệ bề ngang / chiều cao target).
        private const float HandTipX = 0.36f;
        private const float HandTipY = 0.3f;

        [SerializeField] private RectTransform _money;
        [SerializeField] private TMP_Text _moneyText;
        [SerializeField] private RectTransform _downloadButton;
        [SerializeField] private RectTransform _fireButton;
        [SerializeField] private RectTransform[] _cards;
        [SerializeField] private TMP_Text[] _cardPrices;
        [SerializeField] private CanvasGroup[] _cardGroups;
        [SerializeField] private RectTransform _hand;
        [SerializeField] private TMP_Text _popup;
        [SerializeField] private RectTransform _endCard;
        [SerializeField] private RectTransform _endCardContent;
        [SerializeField] private RectTransform _endCardButton;
        [SerializeField] private CanvasGroup _endCardGroup;

        private RectTransform _root;
        private RectTransform _handTarget;
        private float _handClock;
        private float _shownMoney;
        private Tween _moneyTween;

        // Scale / vị trí gốc đã đặt trong scene — hiệu ứng luôn quay về đúng các giá trị này.
        private Vector3 _downloadScale;
        private Vector3 _fireScale;
        private Vector3[] _cardScales;
        private Vector3 _moneyScale;
        private Vector3 _popupScale;
        private Vector2 _popupPosition;
        private Vector3 _contentScale;
        private Vector3 _endButtonScale;

        private void Awake()
        {
            _root = (RectTransform)transform;
            _downloadScale = _downloadButton.localScale;
            _fireScale = _fireButton.localScale;
            _moneyScale = _money.localScale;
            _cardScales = new Vector3[_cards.Length];
            for (int i = 0; i < _cards.Length; i++)
            {
                _cardScales[i] = _cards[i].localScale;
            }
            if (_popup != null)
            {
                _popupScale = _popup.rectTransform.localScale;
                _popupPosition = _popup.rectTransform.anchoredPosition;
            }
            _contentScale = _endCardContent.localScale;
            _endButtonScale = _endCardButton.localScale;
        }

        private void Start()
        {
            _downloadButton.DOScale(_downloadScale * 1.06f, 0.5f).SetEase(Ease.InOutSine).SetLoops(-1, LoopType.Yoyo);
            _fireButton.DOScale(_fireScale * 1.06f, 0.45f).SetEase(Ease.InOutSine).SetLoops(-1, LoopType.Yoyo);
            if (_popup != null) _popup.gameObject.SetActive(false);
            SetCardsVisible(false, false);
        }

        private void LateUpdate()
        {
            AnimateHand();
        }

        // ------------------------------------------------------------------ API

        public void SetMoney(int value, bool animate)
        {
            _moneyTween?.Kill();
            if (!animate)
            {
                _shownMoney = value;
                _moneyText.text = "$" + value;
                return;
            }
            _moneyTween = DOTween.To(() => _shownMoney, x =>
            {
                _shownMoney = x;
                _moneyText.text = "$" + Mathf.RoundToInt(x);
            }, value, 0.6f).SetEase(Ease.OutQuad);
            _money.DOKill(true);
            _money.localScale = _moneyScale;
            _money.DOPunchScale(_moneyScale * 0.15f, 0.35f, 6, 0.6f);
        }

        public void SetFireEnabled(bool enabled)
        {
            _fireButton.gameObject.SetActive(enabled);
        }

        public void SetCardsVisible(bool visible, bool animate)
        {
            for (int i = 0; i < _cards.Length; i++)
            {
                RectTransform card = _cards[i];
                card.DOKill();
                card.gameObject.SetActive(visible);
                if (visible && animate)
                {
                    card.localScale = Vector3.zero;
                    card.DOScale(_cardScales[i], 0.35f).SetEase(Ease.OutBack).SetDelay(i * 0.08f);
                }
                else card.localScale = _cardScales[i];
            }
        }

        public void SetCard(int index, int price, bool affordable)
        {
            _cardPrices[index].text = "$" + price;
            _cardGroups[index].alpha = affordable ? 1f : 0.55f;
        }

        public void PunchCard(int index)
        {
            RectTransform card = _cards[index];
            card.DOKill(true);
            card.localScale = _cardScales[index];
            card.DOPunchScale(_cardScales[index] * 0.12f, 0.3f, 6, 0.6f);
        }

        public void ShakeCard(int index)
        {
            RectTransform card = _cards[index];
            card.DOKill(true);
            card.localScale = _cardScales[index];
            card.DOShakeAnchorPos(0.3f, 14f, 20);
        }

        /// <summary>Đưa bàn tay chỉ vào target (null = ẩn).</summary>
        public void PointHand(RectTransform target)
        {
            _handTarget = target;
            if (_hand != null) _hand.gameObject.SetActive(target != null);
        }

        public RectTransform FireButton => _fireButton;
        public RectTransform Card(int index) => _cards[index];

        public void ShowPopup(string text)
        {
            if (_popup == null) return;
            RectTransform r = _popup.rectTransform;
            r.DOKill();
            _popup.DOKill();
            _popup.text = text;
            _popup.gameObject.SetActive(true);
            _popup.alpha = 1f;
            // Bay lên từ đúng vị trí đã đặt trong scene.
            r.anchoredPosition = _popupPosition;
            r.localScale = _popupScale * 0.3f;
            Sequence s = DOTween.Sequence();
            s.Append(r.DOScale(_popupScale, 0.35f).SetEase(Ease.OutBack));
            s.Join(r.DOAnchorPosY(_popupPosition.y + _root.rect.height * 0.06f, 1.2f).SetEase(Ease.OutQuad));
            s.Insert(0.8f, _popup.DOFade(0f, 0.4f));
            s.OnComplete(() => _popup.gameObject.SetActive(false));
        }

        public void ShowEndCard()
        {
            PointHand(null);
            _fireButton.gameObject.SetActive(false);
            _downloadButton.gameObject.SetActive(false);
            SetCardsVisible(false, false);
            _endCard.gameObject.SetActive(true);
            _endCardGroup.alpha = 0f;
            _endCardGroup.DOFade(1f, 0.35f);
            _endCardContent.localScale = _contentScale * 0.6f;
            _endCardContent.DOScale(_contentScale, 0.45f).SetEase(Ease.OutBack);
            _endCardButton.localScale = _endButtonScale;
            _endCardButton.DOScale(_endButtonScale * 1.08f, 0.5f).SetEase(Ease.InOutSine).SetLoops(-1, LoopType.Yoyo).SetDelay(0.45f);
        }

        // ------------------------------------------------------------------ hand

        private void AnimateHand()
        {
            if (_hand == null || _handTarget == null || !_handTarget.gameObject.activeInHierarchy)
            {
                if (_hand != null && _hand.gameObject.activeSelf && (_handTarget == null || !_handTarget.gameObject.activeInHierarchy))
                    _hand.gameObject.SetActive(false);
                return;
            }
            if (!_hand.gameObject.activeSelf) _hand.gameObject.SetActive(true);

            // Toạ độ tâm target trong hệ của cha bàn tay (đều là con của Layout Root).
            Vector3 world = _handTarget.TransformPoint(_handTarget.rect.center);
            Vector2 local = ((RectTransform)_hand.parent).InverseTransformPoint(world);
            _handClock += Time.deltaTime;
            float t = Mathf.Repeat(_handClock, 0.9f) / 0.9f;
            float press = Mathf.Sin(t * Mathf.PI * 2f) * 0.5f + 0.5f;
            float size = _hand.rect.height;
            // Đầu ngón tay chạm góc dưới-phải của target, thân bàn tay chĩa xuống-phải → không đè lên chữ.
            // Nhấn lên-xuống tại chỗ (chỉ trục dọc), không trôi ngang.
            Rect tr = _handTarget.rect;
            Vector2 tip = new Vector2(tr.width * HandTipX, -tr.height * HandTipY);
            _hand.anchoredPosition = local + tip + new Vector2(0f, -press * size * 0.1f);
            _hand.localScale = Vector3.one * Mathf.Lerp(1f, 0.9f, press);
        }

        private void OnDestroy()
        {
            _moneyTween?.Kill();
            if (_downloadButton != null) _downloadButton.DOKill();
            if (_fireButton != null) _fireButton.DOKill();
            if (_money != null) _money.DOKill();
            if (_endCardContent != null) _endCardContent.DOKill();
            if (_endCardButton != null) _endCardButton.DOKill();
            if (_cards != null) foreach (RectTransform card in _cards) if (card != null) card.DOKill();
        }
    }
}
