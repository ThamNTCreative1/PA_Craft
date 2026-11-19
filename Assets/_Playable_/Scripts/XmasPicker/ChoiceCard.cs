using System;
using UnityEngine;
using UnityEngine.UI;

namespace Playable
{
    public class ChoiceCard : MonoBehaviour
    {
        [SerializeField] private Button _button;
        [SerializeField] private Image _icon;

        public event Action Clicked;

        private void Awake()
        {
            _button.onClick.AddListener(OnClick);
        }

        private void OnDestroy()
        {
            _button.onClick.RemoveListener(OnClick);
        }

        public void Bind(Sprite icon)
        {
            _icon.sprite = icon;
            _icon.enabled = icon != null;
        }

        public void SetInteractable(bool value)
        {
            _button.interactable = value;
        }

        private void OnClick()
        {
            if (Clicked != null) Clicked();
        }
    }
}
