using TMPro;
using System.Collections;
using DG.Tweening;
using UnityEngine;
using UnityEngine.UI;

namespace Playable
{
    public class GameManager : MonoBehaviour
    {
        public static GameManager Instance;

        [Header("End Game")] [LunaPlaygroundField("End Time", 1, "End Game")] [SerializeField]
        private int _endTime = 30;

        [Header("Player")] [LunaPlaygroundField("Player Speed", 1, "Player")] [SerializeField] [Min(0.1f)]
        private float _playerSpeed = 5f;

        [LunaPlaygroundField("Replay Count", 2, "Player")] [SerializeField] [Min(0)]
        private int _replayCount = 3;

        private bool _gameplayStarted;
        [SerializeField] private bool _startGameplayAutomatically = true;

        [LunaPlaygroundField("Total Event For CTA", 2, "End Game")] [SerializeField]
        private int _totalEvent;

        [Header("Audio & Visual")] [LunaPlaygroundAsset("Background Music", 1, "Audio & Visual")] [SerializeField]
        private AudioClip _backgroundMusic;

        [SerializeField] private AudioSource _resultAudio;
        [SerializeField] private AudioClip _winSound;
        [SerializeField] private AudioClip _failSound;
        private bool _resultSoundPlayed;
        [SerializeField] private WinScreenConfetti _winConfetti;

        public void PlayWinSound()
        {
            if (!_resultSoundPlayed && _winConfetti) _winConfetti.Play();
            PlayResultSound(_winSound);
        }

        private void PlayResultSound(AudioClip clip)
        {
            if (_resultSoundPlayed) return;
            _resultSoundPlayed = true;
            if (_resultAudio && clip) _resultAudio.PlayOneShot(clip);
        }

        [SerializeField] private Texture2D _backgroundTexture;

        [Header("Ad Network")] [LunaPlaygroundField("Applovin", 1, "Ad Network")] [SerializeField]
        private bool _isApplovin;

        [Header("UI References")] [SerializeField]
        private Button _btnBlock;

        [SerializeField] private Image _background;
        [SerializeField] private FailPanel _failPanel;
        [SerializeField] private WinPanel _winPanel;
        [SerializeField] private TMP_Text _countdownText;

        public int EndTime => _endTime;
        public float PlayerSpeed => Mathf.Max(0.1f, _playerSpeed);
        public int ReplayCount => Mathf.Max(0, _replayCount);
        public int TotalEvent => _totalEvent;
        public event System.Action GameplayEnded;
        public event System.Action RetryRequested;
        public int ReplaysUsed { get; private set; }
        private bool _failVisible;

        public void TryAgain()
        {
            if (!_failVisible) return;
            if (ReplaysUsed >= ReplayCount || RetryRequested == null)
            {
                ShowCTA();
                return;
            }

            _failVisible = false;
            _resultSoundPlayed = false;
            if (_winConfetti) _winConfetti.Clear();
            if (_resultAudio) _resultAudio.Stop();
            ReplaysUsed++;
            StopAllCoroutines();
            _countdownRoutine = null;
            HasEnded = false;
            _gameplayStarted = false;
            _ctaScheduled = _ctaShown = false;
            _quantityEvent = _shownGameplayCtas = 0;
            _displayedSeconds = -1;
            if (_failPanel) _failPanel.gameObject.SetActive(false);
            if (_btnBlock) _btnBlock.gameObject.SetActive(false);
            RetryRequested.Invoke();
            BeginGameplay();
        }

        public float RemainingTime { get; private set; }
        public bool HasEnded { get; private set; }
        public event System.Action CountdownExpired;
        private Coroutine _countdownRoutine;
        private int _displayedSeconds = -1;

        private int _shownGameplayCtas;
        private int _quantityEvent = 0;
        private bool _ctaScheduled;
        private bool _ctaShown;

        private void Awake()
        {
            Instance = this;
        }

        private void Start()
        {
            if (_btnBlock != null)
            {
                _btnBlock.onClick.AddListener(ShowCTA);
                _btnBlock.gameObject.SetActive(false);
            }

            if (_backgroundTexture && _background) _background.sprite = CreateSprite(_backgroundTexture);
            if (_backgroundMusic) AudioManager.Instance.PlayMusic(_backgroundMusic);
            if (_startGameplayAutomatically) BeginGameplay();
        }

        public void BeginGameplay()
        {
            if (_gameplayStarted || HasEnded) return;
            _gameplayStarted = true;
            CountdownEndGame();
        }


        public void EndGame()
        {
            if (HasEnded) return;
            HasEnded = true;
            Debug.Log("End Game");
            ShowBlock();
            GameplayEnded?.Invoke();
            Luna.Unity.LifeCycle.GameEnded();
        }

        public void ShowCTA()
        {
            _ctaShown = true;
            ShowBlock();
            Debug.Log("Show CTA");
            Luna.Unity.Playable.InstallFullGame();
        }

        private void ShowBlock()
        {
            if (_btnBlock == null) return;
            _btnBlock.gameObject.SetActive(true);
            _btnBlock.transform.SetAsLastSibling();
            var canvas = _btnBlock.GetComponent<Canvas>();
            if (canvas == null) canvas = _btnBlock.gameObject.AddComponent<Canvas>();
            canvas.overrideSorting = true;
            canvas.sortingOrder = short.MaxValue;
            if (_btnBlock.GetComponent<GraphicRaycaster>() == null)
                _btnBlock.gameObject.AddComponent<GraphicRaycaster>();
            _btnBlock.interactable = true;
            if (_btnBlock.targetGraphic != null) _btnBlock.targetGraphic.raycastTarget = true;
        }

        public void ResetGameplayCtas()
        {
            _shownGameplayCtas = 0;
        }


        public void CountEvent()
        {
            if (HasEnded) return;
            _quantityEvent++;
            if (_quantityEvent >= _totalEvent)
            {
                EndGame();
                ScheduleCTA();
            }
        }

        public void ScheduleCTA()
        {
            if (_ctaScheduled || _ctaShown || _isApplovin) return;
            _ctaScheduled = true;
            StartCoroutine(ShowCTADelayed());
        }

        private IEnumerator ShowCTADelayed()
        {
            yield return new WaitForSeconds(1f);
            if (!_ctaShown) ShowCTA();
        }

        public void CountdownEndGame()
        {
            if (_countdownRoutine != null) StopCoroutine(_countdownRoutine);
            RemainingTime = Mathf.Max(0, _endTime);
            UpdateCountdownText();
            // Zero disables the timer for creatives driven by gameplay checkpoints.
            if (_endTime <= 0) return;
            _countdownRoutine = StartCoroutine(IECountdownEndGame());
        }

        private IEnumerator IECountdownEndGame()
        {
            while (RemainingTime > 0f && !HasEnded)
            {
                yield return null;
                if (HasEnded) yield break;
                RemainingTime = Mathf.Max(0f, RemainingTime - Time.deltaTime);
                UpdateCountdownText();
            }

            if (HasEnded) yield break;
            if (CountdownExpired != null)
            {
                CountdownExpired.Invoke();
                yield break;
            }

            EndGame();
            ScheduleCTA();
        }

        private void UpdateCountdownText()
        {
            int seconds = Mathf.CeilToInt(RemainingTime);
            if (_countdownText == null || seconds == _displayedSeconds) return;
            _displayedSeconds = seconds;
            _countdownText.text = (seconds / 60).ToString("00") + ":" + (seconds % 60).ToString("00");
        }

        private Sprite CreateSprite(Texture2D texture)
        {
            return Sprite.Create(
                texture,
                new Rect(0f, 0f, texture.width, texture.height),
                new Vector2(0.5f, 0.5f));
        }

        public void ShowWinPanel()
        {
            PlayWinSound();
            EndGame();
            if (!_isApplovin) DOVirtual.DelayedCall(1, ShowCTA);
            if (_winPanel == null) return;
            _winPanel.Show();
        }

        public void ShowFailPanel()
        {
            if (_failVisible) return;
            _failVisible = true;
            PlayResultSound(_failSound);
            HasEnded = true;
            GameplayEnded?.Invoke();
            // A retry is still part of this playable session.
            if (ReplaysUsed >= ReplayCount) Luna.Unity.LifeCycle.GameEnded();
            if (_failPanel == null)
            {
                ScheduleCTA();
                return;
            }

            if (_btnBlock != null) _btnBlock.gameObject.SetActive(false);
            _failPanel.Show();
        }
    }
}