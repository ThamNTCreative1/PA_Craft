using System.Collections;
using DG.Tweening;
using UnityEngine;
using UnityEngine.UI;

namespace Playable
{
    public class GameManager : MonoBehaviour
    {
        public static GameManager Instance;

        [Header("Luna Field")] [LunaPlaygroundField("Total Event For CTA")] [SerializeField]
        private int _totalEvent;

        [LunaPlaygroundField("Ignore Count Event")] [SerializeField]
        private bool _ignoreCountEvent;

        [LunaPlaygroundField("End Time")] [SerializeField]
        private int _endTime = 30;

        [LunaPlaygroundField("Applovin")] [SerializeField]
        private bool _isApplovin;

        [LunaPlaygroundAsset("Background Music")] [SerializeField]
        private AudioClip _backgroundMusic;

        [LunaPlaygroundAsset("Background Texture")] [SerializeField]
        private Texture2D _backgroundTexture;

        [SerializeField] private Button _btnBlock;
        [SerializeField] private Image _background;

        [Header("UI Field")] [SerializeField] private FailPanel _failPanel;
        [SerializeField] private WinPanel _winPanel;

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
            if (!_isApplovin) Luna.Unity.Playable.InstallFullGame();
        }

        private void ShowCTA()
        {
            Luna.Unity.Playable.InstallFullGame();
        }


        public void CountEvent()
        {
            if (_ignoreCountEvent) return;
            _quantityEvent++;
            if (_quantityEvent >= _totalEvent)
            {
                EndGame();
            }
        }

        public void CountdownEndGame()
        {
            StartCoroutine(IECountdownEndGame());
        }

        private IEnumerator IECountdownEndGame()
        {
            yield return new WaitForSeconds(_endTime);
            EndGame();
        }

        protected Sprite CreateSprite(Texture2D texture)
        {
            return Sprite.Create(
                texture,
                new Rect(0f, 0f, texture.width, texture.height),
                new Vector2(0.5f, 0.5f));
        }

        public void ShowWinPanel()
        {
            _winPanel.Show();
            DOVirtual.DelayedCall(1, () => { GameManager.Instance.EndGame(); });
        }

        public void ShowFailPanel()
        {
            _failPanel.Show();
            DOVirtual.DelayedCall(1, () => { GameManager.Instance.EndGame(); });
        }
    }
}