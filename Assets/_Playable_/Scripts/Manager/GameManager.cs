using System;
using UnityEngine;
using UnityEngine.UI;

namespace Playable
{
    public class GameManager : MonoBehaviour
    {
        public static GameManager Instance;

        [LunaPlaygroundField("End Time", fieldOrder: 1, fieldSection: "Gameplay")]
        [SerializeField, Min(1)] private int _endTime = 30;
        [LunaPlaygroundAsset("Background Music", 1, "Audio")]
        [SerializeField] private AudioClip _backgroundMusic;
        [LunaPlaygroundAsset("Win Sound", 2, "Audio")]
        [SerializeField] private AudioClip _winSound;
        [LunaPlaygroundAsset("Fail Sound", 3, "Audio")]
        [SerializeField] private AudioClip _failSound;
        [SerializeField] private AudioSource _endAudio;
        [SerializeField] private Texture2D _backgroundTexture;
        [SerializeField] private Image _background;
        [SerializeField] private Button _btnBlock;
        [SerializeField] private WinPanel _winPanel;
        [SerializeField] private FailPanel _failPanel;
        [SerializeField] private GameObject _timeoutPanel;
        [LunaPlaygroundField("Auto CTA Delay", fieldOrder: 1, fieldSection: "EndCard")]
        [SerializeField, Min(0f)] private float _autoCtaDelay = 5f;

        private float _elapsed;
        private bool _timerArmed;
        private int _endedFrame;
        private bool _autoInstalled;
        private float _autoCtaAt = -1f;
        private Sprite _backgroundSprite;

        public event Action Ended;
        public int EndTime => _endTime;
        public bool IsEnded { get; private set; }

        private void Awake()
        {
            Instance = this;
        }

        private void Start()
        {
            if (_btnBlock != null)
            {
                _btnBlock.onClick.AddListener(RequestInstall);
                _btnBlock.gameObject.SetActive(false);
            }
            if (_backgroundTexture != null && _background != null)
            {
                _backgroundSprite = Sprite.Create(_backgroundTexture,
                    new Rect(0f, 0f, _backgroundTexture.width, _backgroundTexture.height),
                    new Vector2(0.5f, 0.5f));
                _background.sprite = _backgroundSprite;
            }
            if (_backgroundMusic != null && AudioManager.Instance != null)
                AudioManager.Instance.PlayMusic(_backgroundMusic);
            if (LunaServices.Controller == null)
                Debug.LogError("Assign one LunaController to the gameplay scene.", this);
        }

        private void Update()
        {
            if (IsEnded)
            {
                if (!_autoInstalled && _autoCtaAt >= 0f && Time.realtimeSinceStartup >= _autoCtaAt)
                {
                    _autoInstalled = true;
                    RequestInstall();
                }
                if (_btnBlock != null && Time.frameCount > _endedFrame)
                    _btnBlock.interactable = true;
                return;
            }

            if (_timerArmed)
            {
                _elapsed += Time.unscaledDeltaTime;
                if (_elapsed >= _endTime) EndWithTimeout();
            }
        }

        public void BeginCombatTimer()
        {
            if (_timerArmed || IsEnded) return;
            _elapsed = 0f;
            _timerArmed = true;
        }

        public void EndWithWin()
        {
            if (!TryBeginEnd()) return;
            if (_winPanel != null)
            {
                _winPanel.transform.SetAsLastSibling();
                _winPanel.Show();
            }
            else Debug.LogError("Win endcard is not assigned.", this);
            PlayEndSound(_winSound);
            FinishEnd();
        }

        public void EndWithLose()
        {
            if (!TryBeginEnd()) return;
            if (_failPanel != null)
            {
                _failPanel.transform.SetAsLastSibling();
                _failPanel.Show();
            }
            else Debug.LogError("Lose endcard is not assigned.", this);
            PlayEndSound(_failSound);
            FinishEnd();
        }

        public void EndWithTimeout()
        {
            if (!TryBeginEnd()) return;
            if (_timeoutPanel != null) _timeoutPanel.SetActive(true);
            else Debug.LogError("Timeout endcard is not assigned.", this);
            FinishEnd();
        }

        private bool TryBeginEnd()
        {
            if (IsEnded) return false;
            IsEnded = true;
            _endedFrame = Time.frameCount;
            Ended?.Invoke();
            return true;
        }

        private void PlayEndSound(AudioClip clip)
        {
            if (_endAudio == null || clip == null)
            {
                Debug.LogError("GameManager needs an end AudioSource and the matching Win/Fail Sound clip.", this);
                return;
            }
            _endAudio.PlayOneShot(clip);
        }

        private void FinishEnd()
        {
            if (_btnBlock != null)
            {
                _btnBlock.interactable = false;
                _btnBlock.gameObject.SetActive(true);
            }
            if (LunaServices.Controller != null) LunaServices.Controller.NotifyGameEnded();
            else Debug.LogError("Cannot report GameEnded: LunaController is not registered.", this);
            _autoCtaAt = Time.realtimeSinceStartup + _autoCtaDelay;
        }

        public void RequestInstall()
        {
            if (!IsEnded || Time.frameCount <= _endedFrame) return;
            if (LunaServices.Controller != null) LunaServices.Controller.InstallFullGame();
            else Debug.LogError("Cannot open store: LunaController is not registered.", this);
        }

        private void OnDestroy()
        {
            if (_btnBlock != null) _btnBlock.onClick.RemoveListener(RequestInstall);
            if (_backgroundSprite != null) Destroy(_backgroundSprite);
            if (Instance == this) Instance = null;
        }
    }
}
