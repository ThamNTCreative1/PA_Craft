using DG.Tweening;
using UnityEngine;
using UnityEngine.UI;

namespace Playable
{
    public class HomeRewardPopup : MonoBehaviour
    {
        [SerializeField] private Button _openButton;
        [SerializeField] private Button _popup;
        [SerializeField] private RectTransform[] _icons;
        [SerializeField] private RectTransform _hand;
        private Sequence _tutorial;
        private Vector2 _layoutSize;

        private void Awake()
        {
            _openButton.onClick.AddListener(Open);
            _popup.onClick.AddListener(Install);
            Hide();
        }

        public void ShowOpen()
        {
            Hide();
            _openButton.gameObject.SetActive(true);
        }

        private void Open()
        {
            _openButton.gameObject.SetActive(false);
            _popup.gameObject.SetActive(true);
            _popup.transform.SetAsLastSibling();
            Canvas.ForceUpdateCanvases();
            Layout();
        }

        private void Update()
        {
            if (_popup.gameObject.activeSelf &&
                ((RectTransform)_popup.transform).rect.size != _layoutSize) Layout();
        }

        private void Layout()
        {
            StopTutorial();
            _layoutSize = ((RectTransform)_popup.transform).rect.size;
            bool portrait = _layoutSize.y > _layoutSize.x;
            const float size = 500f;
            float step = Mathf.Min(size * 1.25f, (portrait ? _layoutSize.y : _layoutSize.x) * .29f);
            for (int i = 0; i < _icons.Length; i++)
            {
                _icons[i].sizeDelta = Vector2.one * size;
                _icons[i].anchoredPosition = portrait
                    ? new Vector2(0, (1 - i) * step)
                    : new Vector2((i - 1) * step, 0);
            }
            _hand.sizeDelta = Vector2.one * size * .45f;
            Vector2 offset = new Vector2(size * .25f, -size * .32f);
            _hand.anchoredPosition = _icons[0].anchoredPosition + offset;
            _tutorial = DOTween.Sequence().SetUpdate(true);
            for (int i = 0; i < _icons.Length; i++)
            {
                _tutorial.Append(_hand.DOAnchorPos(_icons[i].anchoredPosition + offset, .45f).SetEase(Ease.InOutSine));
                _tutorial.Append(_hand.DOScale(.85f, .18f));
                _tutorial.Join(_icons[i].DOScale(1.12f, .18f));
                _tutorial.Append(_hand.DOScale(1f, .2f));
                _tutorial.Join(_icons[i].DOScale(1f, .2f));
                _tutorial.AppendInterval(.3f);
            }
            _tutorial.SetLoops(-1, LoopType.Yoyo);
        }

        private void Install()
        {
            if (GameManager.Instance == null) return;
            GameManager.Instance.EndGame();
            GameManager.Instance.ShowCTA();
        }

        public void Hide()
        {
            StopTutorial();
            _openButton.gameObject.SetActive(false);
            _popup.gameObject.SetActive(false);
        }

        private void StopTutorial()
        {
            if (_tutorial != null) _tutorial.Kill();
            _tutorial = null;
            if (_hand != null) _hand.localScale = Vector3.one;
            if (_icons != null)
                foreach (var icon in _icons)
                    if (icon != null) icon.localScale = Vector3.one;
        }

        private void OnDisable() { StopTutorial(); }
        private void OnDestroy()
        {
            StopTutorial();
            if (_openButton != null) _openButton.onClick.RemoveListener(Open);
            if (_popup != null) _popup.onClick.RemoveListener(Install);
        }
    }
}
