using System;
using TMPro;
using UnityEngine;
using UnityEngine.UI;

namespace Playable
{
    public sealed class HeroCardView : MonoBehaviour
    {
        [SerializeField] private Button _button;
        [SerializeField] private Image _portrait;
        [SerializeField] private TMP_Text _label;
        public HeroId Id { get; private set; }
        public event Action<HeroCardView> Clicked;
        public void Bind(HeroRoster.HeroEntry entry)
        {
            Id = entry.Id;
            _portrait.sprite = entry.Portrait;
            _label.text = entry.DisplayName;
        }
        private void OnEnable() { _button.onClick.AddListener(OnClicked); }
        private void OnDisable() { _button.onClick.RemoveListener(OnClicked); }
        private void OnClicked() { Clicked?.Invoke(this); }
    }
}
