using System.Collections;
using DG.Tweening;
using UnityEngine;
using UnityEngine.UI;

namespace Playable
{
    public class GameManager : MonoBehaviour
    {
        public enum GameplayCtaPoint
        {
            Steal,
            PurpleGarden,
            Desert,
            Home
        }

        public static GameManager Instance;

        [Header("Gameplay CTA")] [LunaPlaygroundField("CTA On Steal", 1, "CTA")] [SerializeField]
        private bool _ctaOnSteal;

        [LunaPlaygroundField("CTA On Sakura", 2, "CTA")] [SerializeField]
        private bool _ctaOnSakura;

        [LunaPlaygroundField("CTA On Desert", 3, "CTA")] [SerializeField]
        private bool _ctaOnDesert;

        [LunaPlaygroundField("CTA On Home", 4, "CTA")] [SerializeField]
        private bool _ctaOnHome;

        [SerializeField] private HomeRewardPopup _homeRewardPopup;
        private Coroutine _endCountdown;

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

        private int _shownGameplayCtas;
        private int _quantityEvent = 0;

        private void Awake()
        {
            Instance = this;
        }

        private void Start()
        {
            _btnBlock.onClick.AddListener(ShowCTA);
            _btnBlock.gameObject.SetActive(false);

            if (_backgroundTexture) _background.sprite = CreateSprite(_backgroundTexture);
            if (_backgroundMusic) AudioManager.Instance.PlayMusic(_backgroundMusic);
            CountdownEndGame();
        }


        public void EndGame()
        {
            Debug.Log("End Game");
            _btnBlock.gameObject.SetActive(true);
            Luna.Unity.LifeCycle.GameEnded();
        }

        public void ShowCTA()
        {
            Debug.Log("Show CTA");
            Luna.Unity.Playable.InstallFullGame();
        }

        public void ResetGameplayCtas()
        {
            _shownGameplayCtas = 0;
            if (_homeRewardPopup != null) _homeRewardPopup.Hide();
        }

        public void CompleteHome()
        {
            if (_ctaOnHome)
            {
                TryShowGameplayCTA(GameplayCtaPoint.Home);
                return;
            }
            if (!_ctaOnSteal && !_ctaOnSakura && !_ctaOnDesert)
            {
                if (_endCountdown != null) StopCoroutine(_endCountdown);
                _endCountdown = null;
                if (_homeRewardPopup != null) _homeRewardPopup.ShowOpen();
                return;
            }
            ShowWinPanel();
        }

        public void TryShowGameplayCTA(GameplayCtaPoint point)
        {
            bool enabled = point == GameplayCtaPoint.Steal ? _ctaOnSteal :
                point == GameplayCtaPoint.PurpleGarden ? _ctaOnSakura :
                point == GameplayCtaPoint.Desert ? _ctaOnDesert :
                point == GameplayCtaPoint.Home && _ctaOnHome;
            int bit = 1 << (int)point;
            if (!enabled || (_shownGameplayCtas & bit) != 0) return;
            _shownGameplayCtas |= bit;
            EndGame();
            ShowCTA();
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
            // Zero disables the timer for creatives driven by gameplay checkpoints.
            if (_endTime <= 0) return;
            _endCountdown = StartCoroutine(IECountdownEndGame());
        }

        private IEnumerator IECountdownEndGame()
        {
            yield return new WaitForSeconds(_endTime);
            EndGame();
            yield return new WaitForSeconds(1);
            if (!_isApplovin) ShowCTA();
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
            if (!_isApplovin) DOVirtual.DelayedCall(1, ShowCTA);
            if (_winPanel == null) return;
            _winPanel.Show();
        }

        public void ShowFailPanel()
        {
            EndGame();
            if (!_isApplovin) DOVirtual.DelayedCall(1, ShowCTA);
            if (_failPanel == null) return;
            _failPanel.Show();
        }
    }
}
