using TMPro;
using UnityEngine;
using UnityEngine.UI;

namespace Playable
{
    /// <summary>Fishing action button (CAST / REEL), charge + reel bars and hint text. Reads FishingController state only.</summary>
    public sealed class FishingHUD : MonoBehaviour
    {
        [SerializeField] private FishingController _controller;
        [SerializeField] private GameObject _root;
        [SerializeField] private FishingHoldButton _actionButton;
        [SerializeField] private TMP_Text _actionLabel;
        [SerializeField] private TMP_Text _hintLabel;
        [SerializeField] private GameObject _chargeBar;
        [SerializeField] private Image _chargeFill;
        [SerializeField] private GameObject _reelBar;
        [SerializeField] private Image _reelFill;
        [SerializeField] private string _castText = "CAST";
        [SerializeField] private string _reelText = "REEL";
        [SerializeField] private string _readyHint = "Hold CAST, release to throw";
        [SerializeField] private string _waitingHint = "Wait for a bite...";
        [SerializeField] private string _fightingHint = "Tap REEL fast!";
        [SerializeField] private string _caughtHint = "Nice catch!";
        [SerializeField] private string _escapedHint = "The fish got away!";

        private void Awake()
        {
            Show(false);
        }

        private void OnEnable()
        {
            if (_controller != null) _controller.StateChanged += OnStateChanged;
            if (_actionButton != null)
            {
                _actionButton.Pressed += OnPressed;
                _actionButton.Released += OnReleased;
            }
        }

        private void OnDisable()
        {
            if (_controller != null) _controller.StateChanged -= OnStateChanged;
            if (_actionButton != null)
            {
                _actionButton.Pressed -= OnPressed;
                _actionButton.Released -= OnReleased;
            }
        }

        public void Show(bool visible)
        {
            if (_root != null) _root.SetActive(visible);
            if (visible && _controller != null) OnStateChanged(_controller.State);
        }

        private void OnPressed()
        {
            if (_controller != null) _controller.Press();
        }

        private void OnReleased()
        {
            if (_controller != null) _controller.Release();
        }

        private void Update()
        {
            if (_controller == null || _root == null || !_root.activeSelf) return;
            if (_chargeFill != null) _chargeFill.fillAmount = _controller.Charge01;
            if (_reelFill != null) _reelFill.fillAmount = _controller.Progress01;
        }

        private void OnStateChanged(FishingState state)
        {
            bool fighting = state == FishingState.Fighting;
            bool canPress = state == FishingState.Ready || state == FishingState.Charging || fighting;
            if (_actionButton != null) _actionButton.gameObject.SetActive(canPress);
            if (_actionLabel != null) _actionLabel.text = fighting ? _reelText : _castText;
            if (_chargeBar != null) _chargeBar.SetActive(state == FishingState.Charging);
            if (_reelBar != null) _reelBar.SetActive(fighting);
            if (_hintLabel != null) _hintLabel.text = HintFor(state);
        }

        private string HintFor(FishingState state)
        {
            switch (state)
            {
                case FishingState.Ready:
                case FishingState.Charging: return _readyHint;
                case FishingState.Casting:
                case FishingState.Waiting: return _waitingHint;
                case FishingState.Fighting: return _fightingHint;
                case FishingState.Catching: return _caughtHint;
                case FishingState.Escaped: return _escapedHint;
                default: return string.Empty;
            }
        }
    }
}
