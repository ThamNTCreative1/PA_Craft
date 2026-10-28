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
        private bool _hasEnded;

        private void Awake()
        {
            Instance = this;
        }

        private void Start()
        {
            // Keep CTA above tutorial canvases, including highlighted hotbar buttons.
            Canvas ctaCanvas = _btnBlock.GetComponent<Canvas>();
            if (ctaCanvas == null) ctaCanvas = _btnBlock.gameObject.AddComponent<Canvas>();
            ctaCanvas.overrideSorting = true;
            ctaCanvas.sortingOrder = short.MaxValue;
            if (_btnBlock.GetComponent<GraphicRaycaster>() == null)
                _btnBlock.gameObject.AddComponent<GraphicRaycaster>();

            _btnBlock.onClick.AddListener(ShowCTA);
            _btnBlock.gameObject.SetActive(false);

            if (_backgroundTexture) _background.sprite = CreateSprite(_backgroundTexture);
            if (_backgroundMusic) AudioManager.Instance.PlayMusic(_backgroundMusic);
            CountdownEndGame();
        }
        

        public void EndGame()
        {
            if (_hasEnded) return;
            _hasEnded = true;

            Debug.Log("End Game");
            // Let the CTA receive input even while tutorial UI groups are locked.
            CanvasGroup ctaGroup = _btnBlock.GetComponent<CanvasGroup>();
            if (ctaGroup == null) ctaGroup = _btnBlock.gameObject.AddComponent<CanvasGroup>();
            ctaGroup.ignoreParentGroups = true;
            ctaGroup.interactable = true;
            ctaGroup.blocksRaycasts = true;
            ctaGroup.alpha = 1f;
            _btnBlock.transform.SetAsLastSibling();
            _btnBlock.gameObject.SetActive(true);
            Canvas ctaCanvas = _btnBlock.GetComponent<Canvas>();
            ctaCanvas.enabled = true;
            ctaCanvas.overrideSorting = true;
            ctaCanvas.sortingOrder = short.MaxValue;
            _btnBlock.enabled = true;
            _btnBlock.interactable = true;
            if (_btnBlock.targetGraphic != null)
            {
                _btnBlock.targetGraphic.raycastTarget = true;
                // The fullscreen blocker is transparent but must remain a raycast target.
                _btnBlock.targetGraphic.canvasRenderer.cullTransparentMesh = false;
                _btnBlock.targetGraphic.SetAllDirty();
            }
            Luna.Unity.LifeCycle.GameEnded();
            if ( !_isApplovin) Luna.Unity.Playable.InstallFullGame();
        }

        private void ShowCTA()
        {
            Debug.Log("CTA clicked");
            Luna.Unity.Playable.InstallFullGame();
        }


        public void CountEvent()
        {
            if (_ignoreCountEvent || _hasEnded) return;
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
