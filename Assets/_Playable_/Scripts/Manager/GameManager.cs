using System.Collections;
using System.Collections.Generic;
using DG.Tweening;
using UnityEngine;
using UnityEngine.UI;

namespace Playable
{
    public class GameManager : MonoBehaviour
    {
        public static GameManager Instance;

        [Header("Luna Field")]
        [Tooltip("Count screen taps and open the CTA after Tap Count To CTA taps.")]
        [LunaPlaygroundField("LimitTap?")] [SerializeField]
        private bool _limitTap;

        [Tooltip("Taps on the screen before the CTA opens (only when LimitTap? is on). 0 = CTA button shown right away.")]
        [LunaPlaygroundField("Tap Count To CTA")] [SerializeField]
        private int _tapCountToCTA;

        [Tooltip("How many times the player may be caught and reset; the next catch shows the Revive popup. -1 = unlimited.")]
        [LunaPlaygroundField("Player Reset Count")] [SerializeField]
        private int _playerResetCount = 3;

        [Tooltip("Player move speed. 0 = keep the scene value.")]
        [LunaPlaygroundField("Player Speed")] [SerializeField]
        private float _playerSpeed = 100f;

        [Tooltip("Boss chase / return speed (patrol keeps its own speed). 0 = keep the scene value.")]
        [LunaPlaygroundField("Boss Speed")] [SerializeField]
        private float _bossSpeed = 100f;

        [LunaPlaygroundField("End Time")] [SerializeField]
        private int _endTime = 30;

        [LunaPlaygroundAsset("Background Music")] [SerializeField]
        private AudioClip _backgroundMusic;

        [LunaPlaygroundAsset("Background Texture")] [SerializeField]
        private Texture2D _backgroundTexture;

        [Header("Speed Targets")]
        [Tooltip("Objects that take Player Speed / Boss Speed. Assigned in the scene (Luna has no FindObjectsByType).")]
        [SerializeField] private PlayerController _player;
        [SerializeField] private List<Monster> _bosses = new List<Monster>();

        [SerializeField] private Button _btnBlock;
        [SerializeField] private Image _background;

        [LunaPlaygroundField("Applovin")] [SerializeField]
        private bool _isApplovin;

        [Header("UI Field")] [SerializeField] private FailPanel _failPanel;
        [SerializeField] private WinPanel _winPanel;

        public int PlayerResetCount => _playerResetCount;
        private int _tapCount;
        private bool _tapCTADone;

        private void Awake()
        {
            Instance = this;
        }

        private void Start()
        {
            _btnBlock.onClick.AddListener(ShowCTA);
            // LimitTap? with 0 taps: the full-screen CTA button is up from the start, any tap opens the store.
            _btnBlock.gameObject.SetActive(_limitTap && _tapCountToCTA <= 0);

            if (_backgroundTexture) _background.sprite = CreateSprite(_backgroundTexture);
            if (_backgroundMusic) AudioManager.Instance.PlayMusic(_backgroundMusic);
            ApplySpeeds();
            CountdownEndGame();
        }

        private void ApplySpeeds()
        {
            if (_playerSpeed > 0f && _player != null) _player.MoveSpeed = _playerSpeed;
            if (_bossSpeed <= 0f) return;
            foreach (Monster boss in _bosses)
                if (boss != null) boss.MoveSpeed = _bossSpeed;
        }

        private void Update()
        {
            if (!_limitTap || _tapCountToCTA <= 0 || _tapCTADone) return;

            // One touch also fires a simulated mouse click; count touches when there are any.
            int taps = 0;
            if (Input.touchCount > 0)
            {
                for (int i = 0; i < Input.touchCount; i++)
                    if (Input.GetTouch(i).phase == TouchPhase.Began) taps++;
            }
            else if (Input.GetMouseButtonDown(0))
            {
                taps = 1;
            }

            if (taps == 0) return;
            _tapCount += taps;
            if (_tapCount < _tapCountToCTA) return;

            // Limit reached: the full-screen CTA button takes over, the next tap opens the store.
            _tapCTADone = true;
            _btnBlock.gameObject.SetActive(true);
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

        public void CountdownEndGame()
        {
            StartCoroutine(IECountdownEndGame());
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