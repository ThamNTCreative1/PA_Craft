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

        [LunaPlaygroundField("End Time")] [SerializeField]
        private int _endTime = 30;

        [LunaPlaygroundAsset("Background Music")] [SerializeField]
        private AudioClip _backgroundMusic;

        [LunaPlaygroundAsset("Background Texture")] [SerializeField]
        private Texture2D _backgroundTexture;

        [SerializeField] private Button _btnBlock;
        [SerializeField] private Image _background;

        [LunaPlaygroundField("Applovin")] [SerializeField]
        private bool _isApplovin;

        public bool IsApplovin => _isApplovin;
        public bool HasEnded { get; private set; }
        public event System.Action GameEnded;
        private Coroutine _countdown;

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
            if (HasEnded) return;
            HasEnded = true;
            if (_countdown != null) StopCoroutine(_countdown);
            _countdown = null;
            Debug.Log("End Game");
            _btnBlock.gameObject.SetActive(true);
            Luna.Unity.LifeCycle.GameEnded();
            GameEnded?.Invoke();
        }

        public void ShowCTA()
        {
            Debug.Log("Show CTA");
            Luna.Unity.Playable.InstallFullGame();
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
            if (HasEnded || _countdown != null) return;
            _countdown = StartCoroutine(IECountdownEndGame());
        }

        private IEnumerator IECountdownEndGame()
        {
            yield return new WaitForSeconds(_endTime);
            _countdown = null;
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
