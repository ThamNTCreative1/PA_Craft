using System;
using TMPro;
using UnityEngine;
using UnityEngine.UI;
using UnityEngine.EventSystems;

namespace Playable.PetRescue
{
    /// Endcard for both outcomes. The store opens only from a user tap (button or card/backdrop); the view never auto-opens it.
    public sealed class RescueEndcardView : MonoBehaviour, IPointerClickHandler
    {
        public const string WinTitle = "PETS LOVE YOU!", WinMessage = "Collect every pet in the full game!";
        public const string TimeUpTitle = "TIME'S UP!", TimeUpMessage = "So close! Collect all the pets in the full game.";
        [SerializeField] private RectTransform _card, _viewport;
        [SerializeField] private TMP_Text _title, _message;
        [SerializeField] private Button _installButton;
        private Action _gestureInstall;
        private bool _shown;
        public bool Shown { get { return _shown; } }

        public void Initialize(Action gestureInstall)
        {
            if (_card == null || _viewport == null || _title == null || _message == null || _installButton == null || gestureInstall == null)
                throw new InvalidOperationException("Pet Rescue endcard references are incomplete.");
            _gestureInstall = gestureInstall;
            _installButton.onClick.RemoveListener(OnInstall);
            _installButton.onClick.AddListener(OnInstall);
            // The card may be left enabled in the Editor while its layout is tuned; gameplay always starts without it.
            if (!_shown) gameObject.SetActive(false);
        }

        public void Show(bool won)
        {
            if (_shown) return;
            _shown = true;
            _title.text = won ? WinTitle : TimeUpTitle;
            _message.text = won ? WinMessage : TimeUpMessage;
            gameObject.SetActive(true);
            transform.SetAsLastSibling();
            Resize();
        }

        private void OnEnable() { Resize(); }
        private void OnRectTransformDimensionsChange() { Resize(); }
        private void Resize()
        {
            if (_card == null || _viewport == null) return;
            var size = new Vector2(Mathf.Min(860, _viewport.rect.width * .88f), Mathf.Min(500, _viewport.rect.height * .76f));
            if (_card.sizeDelta != size) _card.sizeDelta = size;
            // Landscape canvases match height (1920 units tall), so the card is scaled up to stay readable.
            Rect view = _viewport.rect;
            Vector3 scale = Vector3.one * (view.width > view.height ? Mathf.Min(1.5f, view.height * .7f / Mathf.Max(1, size.y)) : 1);
            if (_card.localScale != scale) _card.localScale = scale;
        }

        public void OnPointerClick(PointerEventData eventData)
        {
            if (eventData.button == PointerEventData.InputButton.Left) OnInstall();
        }

        private void OnInstall()
        {
            if (!_shown || _gestureInstall == null) return;
            _gestureInstall();
        }

        private void OnDestroy()
        {
            if (_installButton != null) _installButton.onClick.RemoveListener(OnInstall);
            _gestureInstall = null;
        }
    }
}
