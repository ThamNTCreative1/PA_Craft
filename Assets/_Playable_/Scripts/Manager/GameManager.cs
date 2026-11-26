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

        [LunaPlaygroundField("AppLovin Mode")] [SerializeField]
        private bool _appLovinMode;

        [LunaPlaygroundAsset("Background Music")] [SerializeField]
        private AudioClip _backgroundMusic;

        [LunaPlaygroundAsset("Background Texture")] [SerializeField]
        private Texture2D _backgroundTexture;

        [SerializeField] private Button _btnBlock;
        [SerializeField] private Image _background;

        [Header("UI Field")] [SerializeField] private FailPanel _failPanel;
        [SerializeField] private WinPanel _winPanel;

        private int _quantityEvent;
        private bool _ended;
        public int EndTime => _endTime;
        public bool IsEnded => _ended;
        public bool AppLovinMode => _appLovinMode;

        private void Awake() { Instance = this; }

        private void Start()
        {
            Luna.Unity.Analytics.LogEvent("game_started", 1);
            _btnBlock.onClick.AddListener(OnBlockClicked);
            // _btnBlock.gameObject.SetActive(false);
            if (_backgroundTexture) _background.sprite = CreateSprite(_backgroundTexture);
            if (_backgroundMusic) AudioManager.Instance.PlayMusic(_backgroundMusic);
            CountdownEndGame();
        }

        private void OnDestroy()
        {
            if (_btnBlock != null) _btnBlock.onClick.RemoveListener(OnBlockClicked);
            if (Instance == this) Instance = null;
        }

        public void EndGame()
        {
            if (_ended)
            {
                // Đã kết thúc: mọi lần gọi lại (bấm bất kỳ đâu, nút Win/Fail...) đều mở store
                Luna.Unity.Playable.InstallFullGame();
                return;
            }

            _ended = true;
            Debug.Log("End Game");
            StopAllCoroutines();
            if (GameController.Instance != null) GameController.Instance.ShowEndScreen();
            ShowBlockOverlay();
            Luna.Unity.LifeCycle.GameEnded();
            // AppLovin: chỉ end game, người chơi phải nhấn màn hình mới ra store
            if (!_appLovinMode) Luna.Unity.Playable.InstallFullGame();
        }

        /// <summary>Lớp trong suốt phủ toàn màn hình: nhấn vào đâu cũng ra store.</summary>
        private void ShowBlockOverlay()
        {
            if (_btnBlock == null) return;
            // Bật cả các cha đang tắt (Button Block nằm trong MinimapPanel)
            Transform t = _btnBlock.transform;
            while (t != null)
            {
                if (!t.gameObject.activeSelf) t.gameObject.SetActive(true);
                t = t.parent;
            }
            _btnBlock.transform.SetAsLastSibling();
            Canvas canvas = _btnBlock.GetComponentInParent<Canvas>();
            if (canvas != null) canvas.rootCanvas.sortingOrder = 100;
        }

        private void OnBlockClicked()
        {
            bool wasEnded = _ended;
            if (!wasEnded) EndGame();
            // AppLovin: EndGame không tự ra store, nên lần nhấn này phải mở store
            if (wasEnded || _appLovinMode) Luna.Unity.Playable.InstallFullGame();
        }

        protected void CountEvent()
        {
            _quantityEvent++;
            if (_totalEvent > 0 && _quantityEvent >= _totalEvent)
            {
                EndGame();
            }
        }

        public void CountdownEndGame()
        {
            if (_endTime <= 0) return;
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
