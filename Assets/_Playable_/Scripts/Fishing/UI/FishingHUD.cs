using TMPro;
using UnityEngine;
using UnityEngine.UI;

namespace Playable
{
    /// <summary>
    /// Drives the party-craft FishingHUD prefab (MiniGames/Fishing/Prefabs/UI/FishingHUD.prefab) with this project's
    /// FishingController: action button (CAST → WAIT → TAP! → FASTER!) with power ring and "!" on bite, reel bar that
    /// follows the bobber, first-fight tutorial card, catch popup, hint, message and fight prompt.
    /// </summary>
    public sealed class FishingHUD : MonoBehaviour
    {
        [System.Serializable]
        public struct ActionVisual
        {
            public Sprite sprite;
            public Sprite icon;
            public string label;
            public Color fallbackColor;
        }

        [Header("Controller")]
        [SerializeField] private FishingController _controller;
        [SerializeField] private GameObject _root;

        [Header("Action Button")]
        [SerializeField] private FishingHoldButton _actionButton;
        [SerializeField] private TMP_Text _actionLabel;
        [SerializeField] private Image _actionIcon;
        [SerializeField] private Image _actionFill;
        [SerializeField] private Image _chargeRing;
        [SerializeField] private GameObject _bang;
        [SerializeField] private ActionVisual _castVisual;
        [SerializeField] private ActionVisual _waitVisual;
        [SerializeField] private ActionVisual _fightVisual;
        [SerializeField] private ActionVisual _hurryVisual;
        [SerializeField, Range(0f, 1f)] private float _hurryTension = 0.65f;
        [SerializeField] private Color _ringColor = Color.white;
        [SerializeField] private Color _tapColor = new Color(0.45f, 0.95f, 0.45f, 1f);
        [SerializeField] private Color _hurryColor = new Color(1f, 0.3f, 0.25f, 1f);

        [Header("Reel Bar (follows the bobber)")]
        [SerializeField] private GameObject _reelBar;
        [SerializeField] private Image _reelFill;
        [SerializeField] private Camera _camera;
        [SerializeField] private Transform _reelAnchor;
        [SerializeField] private Vector3 _reelWorldOffset = new Vector3(0f, 0.8f, 0f);

        [Header("Texts")]
        [SerializeField] private TMP_Text _hintLabel;
        [SerializeField] private GameObject _fightPrompt;
        [SerializeField] private TMP_Text _message;
        [SerializeField] private float _messageTime = 1.8f;
        [SerializeField] private string _readyHint = "Hold CAST, release to throw";
        [SerializeField] private string _waitingHint = "Wait for a bite...";
        [SerializeField] private string _fightingHint = "Tap fast to fill the bar!";
        [SerializeField] private string _escapedMessage = "The fish got away!";

        [Header("First Fight Tutorial")]
        [SerializeField] private GameObject _tutorial;
        [SerializeField] private Button _tutorialButton;

        [Header("Catch Popup")]
        [SerializeField] private GameObject _popup;
        [SerializeField] private Image _popupIcon;
        [SerializeField] private TMP_Text _popupName;
        [SerializeField] private TMP_Text _popupRarity;
        [SerializeField] private TMP_Text _popupNote;
        [SerializeField] private GameObject _popupNew;
        [SerializeField] private float _popupTime = 2.4f;
        [SerializeField] private Sprite _fishIcon;
        [SerializeField] private string _fishName = "Bluegill";
        [SerializeField] private string _fishRarity = "COMMON";
        [SerializeField] private string _fishNote = "+1 fish";

        private Sprite _defaultFillSprite;
        private Sprite _defaultIcon;
        private float _lastTapTime = -10f;
        private bool _hurryShown;
        private bool _tutorialSeen;
        private bool _tutorialOpen;
        private bool _caughtBefore;
        private float _messageUntil;
        private float _popupUntil;

        private void Awake()
        {
            if (_actionFill != null) _defaultFillSprite = _actionFill.sprite;
            if (_actionIcon != null) _defaultIcon = _actionIcon.sprite;
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
            if (_tutorialButton != null) _tutorialButton.onClick.AddListener(CloseTutorial);
        }

        private void OnDisable()
        {
            if (_controller != null) _controller.StateChanged -= OnStateChanged;
            if (_actionButton != null)
            {
                _actionButton.Pressed -= OnPressed;
                _actionButton.Released -= OnReleased;
            }
            if (_tutorialButton != null) _tutorialButton.onClick.RemoveListener(CloseTutorial);
        }

        public void Show(bool visible)
        {
            if (_root != null) _root.SetActive(visible);
            if (!visible)
            {
                if (_tutorialOpen) CloseTutorial();
                SetActive(_popup, false);
                if (_message != null) _message.text = string.Empty;
                return;
            }
            if (_controller != null) OnStateChanged(_controller.State);
        }

        private void OnPressed()
        {
            _lastTapTime = Time.time;
            if (_controller != null) _controller.Press();
        }

        private void OnReleased()
        {
            if (_controller != null) _controller.Release();
        }

        private void Update()
        {
            if (_controller == null || _root == null || !_root.activeSelf) return;
            if (_message != null && _message.text.Length > 0 && Time.time >= _messageUntil) _message.text = string.Empty;
            if (_popup != null && _popup.activeSelf && Time.time >= _popupUntil) _popup.SetActive(false);

            FishingState state = _controller.State;
            if (_reelFill != null) _reelFill.fillAmount = _controller.Progress01;
            if (_reelBar != null && _reelBar.activeSelf) FollowBobber();
            UpdateRing(state);
        }

        private void UpdateRing(FishingState state)
        {
            if (_chargeRing == null) return;
            if (state == FishingState.Charging)
            {
                float power = _controller.Charge01;
                _chargeRing.fillAmount = Mathf.Max(0.02f, power);
                _chargeRing.color = Color.Lerp(_tapColor, _hurryColor, power);
                return;
            }

            _chargeRing.fillAmount = 1f;
            if (state != FishingState.Fighting)
            {
                _chargeRing.color = _ringColor;
                return;
            }

            bool hurry = _controller.Tension01 >= _hurryTension;
            if (hurry != _hurryShown)
            {
                _hurryShown = hurry;
                ApplyVisual(hurry ? _hurryVisual : _fightVisual);
            }
            _chargeRing.color = Time.time - _lastTapTime < 0.12f ? _tapColor : hurry ? _hurryColor : _ringColor;
        }

        private void FollowBobber()
        {
            if (_camera == null || _reelAnchor == null) return;
            Vector3 screen = _camera.WorldToScreenPoint(_reelAnchor.position + _reelWorldOffset);
            if (screen.z <= 0f) return;
            _reelBar.transform.position = new Vector3(screen.x, screen.y, 0f); // Screen Space - Overlay canvas
        }

        private void OnStateChanged(FishingState state)
        {
            bool fighting = state == FishingState.Fighting;
            bool waiting = state == FishingState.Casting || state == FishingState.Waiting;
            bool visible = state == FishingState.Ready || state == FishingState.Charging || waiting || fighting;
            if (_actionButton != null) _actionButton.gameObject.SetActive(visible);
            _hurryShown = false;
            ApplyVisual(fighting ? _fightVisual : waiting ? _waitVisual : _castVisual);
            SetActive(_bang, fighting);
            SetActive(_fightPrompt, fighting);
            SetActive(_reelBar, fighting);
            if (_hintLabel != null) _hintLabel.text = HintFor(state);

            if (fighting && !_tutorialSeen) OpenTutorial();
            if (state == FishingState.Catching) ShowCatchPopup();
            if (state == FishingState.Escaped) ShowMessage(_escapedMessage);
        }

        private void OpenTutorial()
        {
            _tutorialSeen = true;
            if (_tutorial == null) return;
            _tutorialOpen = true;
            _tutorial.SetActive(true);
            _controller.SetPaused(true);
        }

        private void CloseTutorial()
        {
            if (!_tutorialOpen) return;
            _tutorialOpen = false;
            SetActive(_tutorial, false);
            if (_controller != null) _controller.SetPaused(false);
        }

        private void ShowCatchPopup()
        {
            if (_popup == null) return;
            if (_popupIcon != null)
            {
                _popupIcon.sprite = _fishIcon;
                _popupIcon.enabled = _fishIcon != null;
            }
            if (_popupName != null) _popupName.text = _fishName;
            if (_popupRarity != null) _popupRarity.text = _fishRarity;
            if (_popupNote != null) _popupNote.text = _fishNote;
            SetActive(_popupNew, !_caughtBefore);
            _caughtBefore = true;
            _popup.SetActive(true);
            _popupUntil = Time.time + _popupTime;
        }

        private void ShowMessage(string text)
        {
            if (_message == null) return;
            _message.text = text;
            _messageUntil = Time.time + _messageTime;
        }

        private void ApplyVisual(ActionVisual visual)
        {
            if (_actionFill != null)
            {
                _actionFill.sprite = visual.sprite != null ? visual.sprite : _defaultFillSprite;
                _actionFill.color = visual.sprite != null ? Color.white : visual.fallbackColor;
            }
            if (_actionIcon != null)
            {
                Sprite icon = visual.icon != null ? visual.icon : _defaultIcon;
                _actionIcon.sprite = icon;
                _actionIcon.enabled = icon != null;
            }
            if (_actionLabel != null) _actionLabel.text = visual.label;
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
                default: return string.Empty;
            }
        }

        private static void SetActive(GameObject go, bool active)
        {
            if (go != null && go.activeSelf != active) go.SetActive(active);
        }
    }
}
