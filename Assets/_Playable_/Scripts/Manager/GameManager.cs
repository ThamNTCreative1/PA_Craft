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
        [SerializeField] private bool _stealAndHatchMode;
        [SerializeField] private FailPanel _stealHatchCta;
        private bool _storeOpened;
        public bool HasEnded => _gameEnded;
        public bool IsStealAndHatchMode => _stealAndHatchMode;
        public event System.Action GameplayEnded;

        [SerializeField] private HomeRewardPopup _homeRewardPopup;
        private Coroutine _endCountdown;
        private float _timerStartedAt;
        private Tween _pendingCta;
        private bool _gameEnded;

        [Header("End Game")] [LunaPlaygroundField("End Time", 1, "End Game")] [SerializeField]
        private int _endTime = 30;

        [LunaPlaygroundField("Total Event For CTA", 2, "End Game")] [SerializeField]
        private int _totalEvent;

        [Header("Audio & Visual")] [LunaPlaygroundAsset("Background Music", 1, "Audio & Visual")] [SerializeField]
        private AudioClip _backgroundMusic;

        [LunaPlaygroundAsset("Background Texture", 2, "Audio & Visual")] [SerializeField]
        private Texture2D _backgroundTexture;

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
            _btnBlock.onClick.AddListener(ShowCTA);
            _btnBlock.gameObject.SetActive(false);

            if (_stealAndHatchMode)
            {
                if (_stealHatchCta != null) _stealHatchCta.gameObject.SetActive(false);
                if (_failPanel != null) _failPanel.gameObject.SetActive(false);
            }
            if (_backgroundTexture) _background.sprite = CreateSprite(_backgroundTexture);
            if (_backgroundMusic) AudioManager.Instance.PlayMusic(_backgroundMusic);
            if (!_eggRaisingMode) CountdownEndGame();
        }


        public void EndGame()
        {
            if (_gameEnded) return;
            CancelPendingEnd();
            Debug.Log("End Game");
            _btnBlock.gameObject.SetActive(true);
            NotifyGameEnded();
            if (_stealAndHatchMode && _failPanel != null)
            {
                _btnBlock.gameObject.SetActive(false);
                if (_stealHatchCta != null) _stealHatchCta.gameObject.SetActive(false);
                _failPanel.transform.SetAsLastSibling();
                _failPanel.Show();
            }
        }

        public void ShowCTA()
        {
            _storeOpened = true;
            CancelPendingEnd();
            Debug.Log("Show CTA");
            Luna.Unity.Playable.InstallFullGame();
        }

        public void CompleteEggRaising()
        {
            if (_stealAndHatchMode) return;
            CancelPendingEnd();
            // The egg CTA panel owns input; keep the full-screen blocker out of its way.
            _btnBlock.gameObject.SetActive(false);
            NotifyGameEnded();
        }

        private void NotifyGameEnded()
        {
            if (_gameEnded) return;
            _gameEnded = true;
            GameplayEnded?.Invoke();
            Luna.Unity.LifeCycle.GameEnded();
        }

        public void CompleteStealAndHatch(bool caught)
        {
            if (_gameEnded) return;
            CancelPendingEnd();
            NotifyGameEnded();
            _btnBlock.gameObject.SetActive(true);
            FailPanel panel = caught ? _failPanel : _stealHatchCta;
            FailPanel otherPanel = caught ? _stealHatchCta : _failPanel;
            if (otherPanel != null) otherPanel.gameObject.SetActive(false);
            if (panel != null)
            {
                panel.transform.SetAsLastSibling();
                panel.Show();
            }
            EnableStoreClickBlocker();
        }

        private void EndToStore()
        {
            if (_gameEnded) return;
            CancelPendingEnd();
            NotifyGameEnded();
            if (_failPanel != null) _failPanel.gameObject.SetActive(false);
            if (_stealHatchCta != null) _stealHatchCta.gameObject.SetActive(false);
            if (_winPanel != null) _winPanel.gameObject.SetActive(false);
            ResetGameplayCtas();
            EnableStoreClickBlocker();
            ShowCTA();
        }

        private void EnableStoreClickBlocker()
        {
            _btnBlock.gameObject.SetActive(true);
            // Both terminal cards install on a tap anywhere, including their artwork.
            _btnBlock.interactable = true;
            var clickSurface = _btnBlock.GetComponent<Image>();
            if (clickSurface != null)
            {
                clickSurface.color = Color.clear;
                clickSurface.raycastTarget = true;
            }
            _btnBlock.transform.SetAsLastSibling();
            // The gameplay touch canvas can otherwise intercept the terminal card.
            var parentCanvas = _btnBlock.transform.parent.GetComponentInParent<Canvas>();
            int topOrder = parentCanvas != null ? parentCanvas.rootCanvas.sortingOrder : 0;
            var storeCanvas = _btnBlock.GetComponent<Canvas>();
            if (storeCanvas == null) storeCanvas = _btnBlock.gameObject.AddComponent<Canvas>();
            storeCanvas.overrideSorting = true;
            storeCanvas.sortingOrder = topOrder + 1;
            if (_btnBlock.GetComponent<GraphicRaycaster>() == null)
                _btnBlock.gameObject.AddComponent<GraphicRaycaster>();
        }

        private void CancelPendingEnd()
        {
            if (_endCountdown != null) StopCoroutine(_endCountdown);
            _endCountdown = null;
            _pendingCta?.Kill();
            _pendingCta = null;
        }

        public void ResetGameplayCtas()
        {
            if (_homeRewardPopup != null) _homeRewardPopup.Hide();
        }

        public void CompleteHome()
        {
            if (_stealAndHatchMode) return;
            CancelPendingEnd();
            if (_homeRewardPopup != null) _homeRewardPopup.ShowOpen();
        }

        public void CountEvent()
        {
            if (_gameEnded) return;
            _quantityEvent++;
            // Zero leaves completion to the timer and gameplay checkpoints.
            if (_totalEvent > 0 && _quantityEvent >= _totalEvent)
            {
                EndToStore();
            }
        }

        public void CountdownEndGame()
        {
            CancelPendingEnd();
            // Zero disables the timer for creatives driven by gameplay checkpoints.
            if (_eggRaisingMode || _gameEnded || _endTime <= 0) return;
            _timerStartedAt = Time.realtimeSinceStartup;
            _endCountdown = StartCoroutine(IECountdownEndGame());
        }

        private IEnumerator IECountdownEndGame()
        {
            yield return new WaitForSecondsRealtime(_endTime);
            _endCountdown = null;
            EndToStore();
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
            if (!_isApplovin) _pendingCta = DOVirtual.DelayedCall(1, ShowCTA);
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
            if (_gameEnded)
            {
                ShowCTA();
                return;
            }
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
            if (!_eggRaisingMode) CountdownEndGame();
        }

        private void OnDestroy()
        {
            CancelPendingEnd();
            if (_btnBlock != null) _btnBlock.onClick.RemoveListener(ShowCTA);
            if (Instance == this) Instance = null;
        }
    }
}
