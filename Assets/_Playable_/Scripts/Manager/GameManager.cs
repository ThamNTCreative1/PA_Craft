using System.Collections;
using UnityEngine;
using UnityEngine.UI;

namespace Playable
{
    public class GameManager : MonoBehaviour
    {
        public static GameManager Instance;

        [Header("Luna Field")] [LunaPlaygroundField("Total Event For CTA")] [SerializeField]
        private int _totalEvent;

        [LunaPlaygroundField("End Time")] [SerializeField]
        private int _endTime = 30;

        [LunaPlaygroundAsset("Background Music")] [SerializeField]
        private AudioClip _backgroundMusic;

        [SerializeField] private Texture2D _backgroundTexture;

        [SerializeField] private Button _btnBlock;
        [SerializeField] private Image _background;

        [Header("UI Field")] [SerializeField] private FailPanel _failPanel;
        [SerializeField] private WinPanel _winPanel;

        [LunaPlaygroundField("Applovin")] [SerializeField]
        private bool _isApplovin;

        private int _quantityEvent;
        public int EndTime => _endTime;

        private void Awake()
        {
            Instance = this;
        }

        private void Start()
        {
            _btnBlock.onClick.AddListener(ShowCta);
            // _btnBlock.gameObject.SetActive(false);
            if (_backgroundTexture) _background.sprite = CreateSprite(_backgroundTexture);
            if (_backgroundMusic) AudioManager.Instance.PlayMusic(_backgroundMusic);
            CountdownEndGame();
        }

        private void OnDestroy()
        {
            if (_btnBlock != null) _btnBlock.onClick.RemoveListener(EndGame);
            if (Instance == this) Instance = null;
        }

        public void EndGame()
        {
            Debug.Log("End Game");
            _btnBlock.gameObject.SetActive(true);
            Luna.Unity.LifeCycle.GameEnded();
            if (!_isApplovin) ShowCta();
        }

        private void ShowCta()
        {
            Luna.Unity.Playable.InstallFullGame();
        }

        protected void CountEvent()
        {
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
        }

        public void ShowFailPanel()
        {
            _failPanel.Show();
        }
    }
}