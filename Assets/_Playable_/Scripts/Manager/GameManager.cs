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

        [SerializeField] private Texture2D _backgroundTexture;

        [SerializeField] private Button _btnBlock;
        [SerializeField] private Image _background;

        [LunaPlaygroundField("Applovin")] [SerializeField]
        private bool _isApplovin;

        [Header("UI Field")] [SerializeField] private FailPanel _failPanel;
        [SerializeField] private WinPanel _winPanel;

        private int _quantityEvent = 0;
        private Coroutine _endGameCountdown;
        public int TotalEvents => Mathf.Max(0, _totalEvent);
        public bool HasEnded { get; private set; }
        public int EventCount => _quantityEvent;

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

            if (_backgroundTexture && _background != null) _background.sprite = CreateSprite(_backgroundTexture);
            if (_backgroundMusic) AudioManager.Instance.PlayMusic(_backgroundMusic);
            CountdownEndGame();
        }


        public void EndGame()
        {
            if (HasEnded) return;
            HasEnded = true;
            if (_endGameCountdown != null)
            {
                StopCoroutine(_endGameCountdown);
                _endGameCountdown = null;
            }

            Debug.Log("End Game");
            if (_btnBlock != null) _btnBlock.gameObject.SetActive(true);
            Luna.Unity.LifeCycle.GameEnded();
            if (!_isApplovin) Luna.Unity.Playable.InstallFullGame();
        }

        public void CountEvent()
        {
            if (HasEnded) return;
            _quantityEvent++;
            if (_quantityEvent >= _totalEvent)
            {
                EndGame();
            }
        }

        private void ShowCTA()
        {
            Luna.Unity.Playable.InstallFullGame();
        }

        public void CountdownEndGame()
        {
            if (HasEnded || _endGameCountdown != null) return;
            _endGameCountdown = StartCoroutine(IECountdownEndGame());
        }

        private IEnumerator IECountdownEndGame()
        {
            yield return new WaitForSeconds(Mathf.Max(0, _endTime));
            _endGameCountdown = null;
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