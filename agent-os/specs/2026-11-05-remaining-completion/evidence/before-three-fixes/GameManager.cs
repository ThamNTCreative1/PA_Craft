using System;
using System.Collections;
using UnityEngine;
using UnityEngine.UI;

namespace Playable
{
    public class GameManager : MonoBehaviour
    {
        public static GameManager Instance;

        [LunaPlaygroundField("End Time")]
        [SerializeField, Min(1)] private int _endTime = 30;
        [LunaPlaygroundAsset("Background Music")]
        [SerializeField] private AudioClip _backgroundMusic;
        [SerializeField] private Texture2D _backgroundTexture;
        [SerializeField] private Image _background;
        [SerializeField] private Button _btnBlock;
        [SerializeField] private WinPanel _winPanel;
        [SerializeField] private FailPanel _failPanel;
        [SerializeField] private GameObject _timeoutPanel;
        [SerializeField, Min(0f)] private float _autoCtaDelay = 1f;

        private float _elapsed;
        private int _endedFrame;
        private bool _autoInstalled;
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
                if (_btnBlock != null && Time.frameCount > _endedFrame)
                    _btnBlock.interactable = true;
                return;
            }

            _elapsed += Time.unscaledDeltaTime;
            if (_elapsed >= _endTime) EndWithTimeout();
        }

        public void EndWithWin()
        {
            if (!TryBeginEnd()) return;
            if (_winPanel != null) _winPanel.Show();
            else Debug.LogError("Win endcard is not assigned.", this);
            FinishEnd();
        }

        public void EndWithLose()
        {
            if (!TryBeginEnd()) return;
            if (_failPanel != null) _failPanel.Show();
            else Debug.LogError("Lose endcard is not assigned.", this);
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

        private void FinishEnd()
        {
            if (_btnBlock != null)
            {
                _btnBlock.interactable = false;
                _btnBlock.gameObject.SetActive(true);
            }
            if (LunaServices.Controller != null) LunaServices.Controller.NotifyGameEnded();
            else Debug.LogError("Cannot report GameEnded: LunaController is not registered.", this);
            StartCoroutine(AutoInstall());
        }

        private IEnumerator AutoInstall()
        {
            yield return new WaitForSecondsRealtime(_autoCtaDelay);
            if (_autoInstalled) yield break;
            _autoInstalled = true;
            RequestInstall();
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
