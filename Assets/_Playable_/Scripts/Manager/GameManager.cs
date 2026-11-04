using System.Collections;
using DG.Tweening;
using UnityEngine;
using UnityEngine.UI;

namespace Playable
{
    public class GameManager : MonoBehaviour
    {
        public static GameManager Instance;
        [SerializeField] private bool _eggRaisingMode;

        [SerializeField] private HomeRewardPopup _homeRewardPopup;
        private Coroutine _endCountdown;
        private Coroutine _endcardStore;
        private Tween _pendingCta;
        private bool _gameEnded;
        [SerializeField] private bool _autoStoreAfterEndcard;
        private bool _deferCountdown;
        public bool HasEnded => _gameEnded;
        public event System.Action GameEnded;

        public void DeferCountdownUntilGameplay()
        {
            _deferCountdown = true;
            CancelPendingEnd();
        }

        public void BeginGameplayCountdown()
        {
            _deferCountdown = false;
            CountdownEndGame();
        }

        [Header("End Game")] [LunaPlaygroundField("End Time", 1, "End Game")] [SerializeField]
        private int _endTime = 30;
        [SerializeField] private bool _tapToCtaMode;
        public int EndTime => _endTime;

        [LunaPlaygroundField("Total Event For CTA", 2, "End Game")] [SerializeField]
        private int _totalEvent;

        [Header("Audio & Visual")] [LunaPlaygroundAsset("Background Music", 1, "Audio & Visual")] [SerializeField]
        private AudioClip _backgroundMusic;

        [LunaPlaygroundAsset("Background Texture", 2, "Audio & Visual")] [SerializeField]
        private Texture2D _backgroundTexture;

        [LunaPlaygroundAsset("Selection Background", 3, "Audio & Visual")]
        [SerializeField] private Texture2D _selectionBackground;
        public Texture2D SelectionBackground => _selectionBackground;

        [Header("Ad Network")] [LunaPlaygroundField("Applovin", 1, "Ad Network")] [SerializeField]
        private bool _isApplovin;

        [Header("UI References")] [SerializeField] private Button _btnBlock;
        [SerializeField] private Image _background;
        [SerializeField] private FailPanel _failPanel;
        [SerializeField] private WinPanel _winPanel;

        private int _quantityEvent = 0;
        private int _retryCount;
        public bool IsFirstAttempt => _retryCount == 0;
        [SerializeField] private GameController _gameController;

        private void Awake()
        {
            Instance = this;
        }

        private void Start()
        {
            if (_tapToCtaMode) return;
            _btnBlock.onClick.AddListener(ShowCTA);
            _btnBlock.gameObject.SetActive(false);

            if (_backgroundTexture) _background.sprite = CreateSprite(_backgroundTexture);
            if (_backgroundMusic) AudioManager.Instance.PlayMusic(_backgroundMusic);
            if (!_eggRaisingMode && !_deferCountdown) CountdownEndGame();
        }


        public void EndGame()
        {
            if (_autoStoreAfterEndcard && _gameEnded) return;
            CancelPendingEnd();
            Debug.Log("End Game");
            _btnBlock.gameObject.SetActive(true);
            if (_autoStoreAfterEndcard) _btnBlock.interactable = false;
            NotifyGameEnded();
            if (_autoStoreAfterEndcard)
                _endcardStore = StartCoroutine(IEEndcardStore());
        }

        private IEnumerator IEEndcardStore()
        {
            float readyAt = Time.realtimeSinceStartup + 1f;
            while (Time.realtimeSinceStartup < readyAt) yield return null;
            _endcardStore = null;
            ShowCTA();
        }

        public void ShowCTA()
        {
            CancelPendingEnd();
            if (_autoStoreAfterEndcard && _btnBlock != null) _btnBlock.interactable = true;
            Debug.Log("Show CTA");
            Luna.Unity.Playable.InstallFullGame();
        }

        public void CompleteEggRaising()
        {
            CancelPendingEnd();
            // The egg CTA panel owns input; keep the full-screen blocker out of its way.
            _btnBlock.gameObject.SetActive(false);
            NotifyGameEnded();
        }

        private void NotifyGameEnded()
        {
            if (_gameEnded) return;
            _gameEnded = true;
            Luna.Unity.LifeCycle.GameEnded();
            GameEnded?.Invoke();
        }

        private void CancelPendingEnd()
        {
            if (_endCountdown != null) StopCoroutine(_endCountdown);
            _endCountdown = null;
            if (_endcardStore != null) StopCoroutine(_endcardStore);
            _endcardStore = null;
            _pendingCta?.Kill();
            _pendingCta = null;
        }

        public void ResetHomeReward()
        {
            if (_homeRewardPopup != null) _homeRewardPopup.Hide();
        }

        public void CompleteHome()
        {
            CancelPendingEnd();
            if (_homeRewardPopup != null) _homeRewardPopup.ShowOpen();
        }

        public void CountEvent()
        {
            _quantityEvent++;
            if (_quantityEvent >= _totalEvent)
            {
                EndGame();
            }
        }

        public void CountdownEndGame()
        {
            CancelPendingEnd();
            // Zero disables the timer for creatives driven by gameplay checkpoints.
            if (_eggRaisingMode || _gameEnded || _endTime <= 0) return;
            _endCountdown = StartCoroutine(IECountdownEndGame());
        }

        private IEnumerator IECountdownEndGame()
        {
            yield return new WaitForSeconds(_endTime);
            _endCountdown = null;
            EndGame();
            if (!_autoStoreAfterEndcard && !_isApplovin) _pendingCta = DOVirtual.DelayedCall(1, ShowCTA, false);
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
            EndGame();
            if (!_autoStoreAfterEndcard && !_isApplovin) _pendingCta = DOVirtual.DelayedCall(1, ShowCTA);
            if (_winPanel == null) return;
            _winPanel.Show();
        }

        public void ShowFailPanel()
        {
            // Keep Retry accessible; failure is not the final CTA until retries run out.
            CancelPendingEnd();
            if (_failPanel == null) return;
            _failPanel.Show();
        }

        public void RetryGame()
        {
            if (_failPanel == null || !_failPanel.gameObject.activeSelf) return;
            if (_retryCount >= 3)
            {
                EndGame();
                ShowCTA();
                return;
            }
            if (_gameController == null) return;
            CancelPendingEnd();
            _retryCount++;
            _failPanel.gameObject.SetActive(false);
            _btnBlock.gameObject.SetActive(false);
            _quantityEvent = 0;
            _gameController.ResetGame();
            if (!_eggRaisingMode && !_deferCountdown) CountdownEndGame();
        }

        private void OnDestroy()
        {
            CancelPendingEnd();
            if (_btnBlock != null) _btnBlock.onClick.RemoveListener(ShowCTA);
            if (Instance == this) Instance = null;
        }
    }
}
