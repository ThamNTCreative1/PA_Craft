using DG.Tweening;
using UnityEngine;
using UnityEngine.UI;

namespace Playable
{
    public class EggSelectionPanel : MonoBehaviour
    {
        [SerializeField] private EggRaisingController _game;
        [SerializeField] private Button[] _cards;
        [SerializeField] private RectTransform _title;
        [SerializeField] private RectTransform _hand;
        private Sequence _hint;
        private Vector3[] _cardScales;
        private RectTransform _rect;
        private Vector2 _lastSize;
        private void Awake()
        {
            _rect = (RectTransform)transform;
            _cardScales = new Vector3[_cards.Length];
            for (int i = 0; i < _cards.Length; i++)
            {
                _cardScales[i] = _cards[i].transform.localScale;
                int index = i;
                _cards[i].onClick.AddListener(() => _game.SelectEgg(index));
            }
        }
        private void OnEnable() { _lastSize = Vector2.zero; }
        private void OnDisable() { StopHint(); }
        private void StopHint()
        {
            _hint?.Kill();
            _hint = null;
            if (_cardScales == null) return;
            for (int i = 0; i < _cards.Length; i++)
                if (_cards[i] != null) _cards[i].transform.localScale = _cardScales[i];
        }
        private void PlayHint(float scale)
        {
            StopHint();
            if (!Application.isPlaying || _hand == null || _cards.Length == 0) return;
            _hand.SetAsLastSibling();
            _hand.sizeDelta = new Vector2(160f, 180f) * scale;
            Vector2 offset = new Vector2(55f, -110f) * scale;
            _hand.anchoredPosition = ((RectTransform)_cards[0].transform).anchoredPosition + offset;
            _hint = DOTween.Sequence().SetUpdate(true);
            for (int i = 0; i < _cards.Length; i++)
            {
                var card = (RectTransform)_cards[i].transform;
                _hint.Append(_hand.DOAnchorPos(card.anchoredPosition + offset, .45f).SetEase(Ease.InOutSine));
                _hint.Append(card.DOScale(_cardScales[i] * 1.08f, .22f).SetEase(Ease.OutQuad));
                _hint.Append(card.DOScale(_cardScales[i], .22f).SetEase(Ease.InOutSine));
                _hint.AppendInterval(.2f);
            }
            _hint.AppendInterval(.35f).SetLoops(-1, LoopType.Restart);
        }
        private void LateUpdate() { if (_rect.rect.size != _lastSize) Layout(); }
        public void Layout()
        {
            if (_rect == null) _rect = (RectTransform)transform;
            _lastSize = _rect.rect.size;
            bool portrait = _lastSize.y > _lastSize.x;
            float scale = Mathf.Min(_lastSize.x / (portrait ? 1080f : 1920f), _lastSize.y / (portrait ? 1920f : 1080f));
            _title.sizeDelta = new Vector2(900f, 200f) * scale;
            _title.anchoredPosition = new Vector2(0, (portrait ? 690f : 350f) * scale);
            for (int i = 0; i < _cards.Length; i++)
            {
                var rect = (RectTransform)_cards[i].transform;
                rect.sizeDelta = new Vector2(460f, 620f) * scale * (portrait ? 1f : .88f);
                rect.anchoredPosition = portrait
                    ? new Vector2(i % 2 == 0 ? -250f : 250f, i < 2 ? 175f : -485f) * scale
                    : new Vector2((i - 1.5f) * 455f, -85f) * scale;
            }
            PlayHint(scale);
        }
    }
}
