using System;
using TMPro;
using UnityEngine;
using UnityEngine.UI;
using UnityEngine.EventSystems;

namespace Playable.PetRescue
{
    public sealed class RescueEndcardView : MonoBehaviour, IPointerClickHandler
    {
        [SerializeField] private RectTransform _card, _viewport;
        [SerializeField] private TMP_Text _title, _message;
        [SerializeField] private Button _installButton;
        private Action _install, _gestureInstall;
        private bool _shown, _clicked, _won;
        public void Initialize(Action install, Action gestureInstall = null)
        {
            if (_card == null || _viewport == null || _title == null || _message == null || _installButton == null || install == null)
                throw new InvalidOperationException("Pet Rescue endcard references are incomplete.");
            _install = install; _gestureInstall = gestureInstall ?? install;
            _installButton.onClick.RemoveListener(OnInstall);
            _installButton.onClick.AddListener(OnInstall);
            // The card may be left enabled in the Editor while its layout is tuned; gameplay always starts without it.
            if (!_shown) gameObject.SetActive(false);
        }
        public void Show(bool won)
        {
            if (_shown) return;
            _shown = true; _won = won;
            _title.text = won ? "HERD SAVED!" : "HERD LOST!";
            _message.text = won ? "Keep your herd together in the full game." : "Too few made it - lead them all in the full game.";
            gameObject.SetActive(true);
            transform.SetAsLastSibling();
            Resize();
            if (!won) _install?.Invoke();
        }
        private void OnEnable() { Resize(); }
        private void OnRectTransformDimensionsChange() { Resize(); }
        private void Resize()
        {
            if (_card == null || _viewport == null) return;
            var size = new Vector2(Mathf.Min(860,_viewport.rect.width*.88f),Mathf.Min(500,_viewport.rect.height*.76f));
            if (_card.sizeDelta != size) _card.sizeDelta = size;
        }
        public void OnPointerClick(PointerEventData eventData)
        {
            if (_shown && !_won && eventData.button == PointerEventData.InputButton.Left) OnInstall();
        }
        private void OnInstall()
        {
            if (!_shown || (_won && _clicked) || _gestureInstall == null) return;
            if (_won) { _clicked = true; _installButton.interactable = false; }
            _gestureInstall();
        }
        private void OnDestroy()
        {
            if (_installButton != null) _installButton.onClick.RemoveListener(OnInstall);
            _install = null; _gestureInstall = null;
        }
    }
}
