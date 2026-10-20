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

        [LunaPlaygroundField("Total Event For CTA", 2, "End Game")] [SerializeField]
        private int _totalEvent;

        [Header("Audio & Visual")] [LunaPlaygroundAsset("Background Music", 1, "Audio & Visual")] [SerializeField]
        private AudioClip _backgroundMusic;

        [SerializeField]
        private Texture2D _backgroundTexture;

        [Header("Ad Network")] [LunaPlaygroundField("Applovin", 1, "Ad Network")] [SerializeField]
        private bool _isApplovin;

        [Header("UI References")] [SerializeField] private Button _btnBlock;
        [SerializeField] private Image _background;
        [SerializeField] private FailPanel _failPanel;
        [SerializeField] private WinPanel _winPanel;
        [SerializeField] private TMP_Text _countdownText;

        public int EndTime => _endTime;
        public float RemainingTime { get; private set; }
        public bool HasEnded { get; private set; }
        public event System.Action CountdownExpired;
        private Coroutine _countdownRoutine;
        private int _displayedSeconds = -1;

        private int _shownGameplayCtas;
        private int _quantityEvent = 0;

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
            CountdownEndGame();
        }


        public void EndGame()
        {
            if (HasEnded) return;
            HasEnded = true;
            Debug.Log("End Game");
            if (_btnBlock != null) _btnBlock.gameObject.SetActive(true);
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
            yield return new WaitForSeconds(1);
            if (!_isApplovin) ShowCTA();
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
