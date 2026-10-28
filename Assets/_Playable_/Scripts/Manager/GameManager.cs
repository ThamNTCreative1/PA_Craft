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
        private bool _applovin;

        [LunaPlaygroundAsset("Background Music")] [SerializeField]
        private AudioClip _backgroundMusic;

        [LunaPlaygroundAsset("Background Texture")] [SerializeField]
        private Texture2D _backgroundTexture;

        [SerializeField] private Button _btnBlock;
        [SerializeField] private Image _background;

        [Header("UI Field")] [SerializeField] private FailPanel _failPanel;
        [SerializeField] private WinPanel _winPanel;

        private int _quantityEvent = 0;
        public bool HasEnded { get; private set; }

        private void Awake()
        {
            Instance = this;
        }

        private void Start()
        {
            _btnBlock.onClick.AddListener(ShowCTA);
            _btnBlock.gameObject.SetActive(false);
            // Tutorial controls use their own sorting canvases. CTA must receive
            // clicks above them even when the event limit is reached mid-tutorial.
            Canvas ctaCanvas = _btnBlock.GetComponent<Canvas>();
            if (ctaCanvas == null) ctaCanvas = _btnBlock.gameObject.AddComponent<Canvas>();
            ctaCanvas.overrideSorting = true;
            ctaCanvas.sortingOrder = 32760;
            if (_btnBlock.GetComponent<GraphicRaycaster>() == null)
                _btnBlock.gameObject.AddComponent<GraphicRaycaster>();

            if (_backgroundTexture) _background.sprite = CreateSprite(_backgroundTexture);
            if (_backgroundMusic) AudioManager.Instance.PlayMusic(_backgroundMusic);
            CountdownEndGame();
        }


        public void EndGame()
        {
            if (HasEnded) return;
            HasEnded = true;
            Debug.Log("End Game");
            _btnBlock.gameObject.SetActive(true);
            Luna.Unity.LifeCycle.GameEnded();
            if (!_applovin) Luna.Unity.Playable.InstallFullGame();
        }

        public void ShowCTA()
        {
            Luna.Unity.Playable.InstallFullGame();
        }

        public void CountEvent()
        {
            if (_ignoreCountEvent || HasEnded) return;
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
