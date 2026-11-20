using UnityEngine;
using UnityEngine.UI;

namespace Playable
{
    public enum TapToBuildTheme
    {
        Default = 0,
        Green = 1,
        Red = 2
    }

    [LunaPlaygroundSection("Appearance", 4)]
    public sealed class TapToBuildThemeSelector : MonoBehaviour
    {
        [LunaPlaygroundField("Theme", 1, "Appearance")]
        [SerializeField] private TapToBuildTheme _theme = TapToBuildTheme.Default;
        [SerializeField] private Image _background;
        [SerializeField] private Image _title;
        [SerializeField] private Sprite _defaultBackground;
        [SerializeField] private Sprite _defaultTitle;
        [SerializeField] private Sprite _greenBackground;
        [SerializeField] private Sprite _redBackground;
        [SerializeField] private Sprite _greenTitle;
        [SerializeField] private Sprite _redTitle;
        [SerializeField] private Image _housePanel;
        [SerializeField] private Sprite _defaultHousePanel;
        [SerializeField] private Sprite _festiveHousePanel;
        [SerializeField] private GameObject _houseArtwork;
        [SerializeField] private Image[] _accentImages;
        [SerializeField] private Sprite[] _defaultAccents;
        [SerializeField] private Sprite[] _festiveAccents;
        [SerializeField] private OrientationLayout _layout;
        [SerializeField, Range(0f, 0.2f)] private float _festiveTopInset = 0.06f;

        private TapToBuildTheme _appliedTheme;

        private void OnEnable()
        {
            Apply();
        }

        private void Update()
        {
            if (_theme != _appliedTheme) Apply();
        }

        public void Apply()
        {
            Sprite background = _defaultBackground;
            Sprite title = _defaultTitle;
            switch (_theme)
            {
                case TapToBuildTheme.Green:
                    background = _greenBackground;
                    title = _redTitle;
                    break;
                case TapToBuildTheme.Red:
                    background = _redBackground;
                    title = _greenTitle;
                    break;
            }

            if (_background == null || _title == null || background == null || title == null) return;
            _background.sprite = background;
            _title.sprite = title;
            bool festive = _theme == TapToBuildTheme.Green || _theme == TapToBuildTheme.Red;
            if (_layout != null)
                _layout.SetGameplayTopInset((RectTransform)transform, festive ? _festiveTopInset : 0f);
            if (_housePanel != null)
                _housePanel.sprite = festive ? _festiveHousePanel : _defaultHousePanel;
            if (_houseArtwork != null) _houseArtwork.SetActive(true);
            Sprite[] accents = festive ? _festiveAccents : _defaultAccents;
            if (_accentImages != null && accents != null)
            {
                for (int i = 0; i < _accentImages.Length && i < accents.Length; i++)
                    if (_accentImages[i] != null && accents[i] != null) _accentImages[i].sprite = accents[i];
            }
            _appliedTheme = _theme;
        }
    }
}
