using DG.Tweening;
using TMPro;
using UnityEngine;
using UnityEngine.UI;

namespace Playable.TempleRun
{
    public class RunnerDemoIntro : MonoBehaviour
    {
        // Retained for the existing editor setup utilities.
        public GameObject room, title;
        public GameObject[] gameplayRoots;
        public Transform coin, arm;
        public Camera introCamera;
        public AudioClip backgroundMusic;
        public float musicVolume = 1f, jumpHeight = 0.35f, jumpDuration = 0.8f;
        public GameManager gameManager;
        public HideSeekView view;
        private Sprite _selectionBackgroundSprite;
        public HideSeekActor[] actors;
        public AudioClip selectSound, timeoutSound;
        public Button hiderButton, seekerButton;
        public float selectionTimeout = 10f;
        public bool HasSelected { get; private set; }
        public bool HasEnded { get; private set; }
        public float Remaining { get; private set; }
        private float _selectionRemaining;
        private int _lastCtaFrame = -1;
        private bool _hasGameplayTimeout;

        private void Awake()
        {
            // This intro owns selection/gameplay timers; avoid a second scene-wide timer.
            if (gameManager != null) gameManager.DeferCountdownUntilGameplay();
        }

        private void Start()
        {
            _selectionRemaining = selectionTimeout;
            hiderButton.onClick.AddListener(SelectHider);
            seekerButton.onClick.AddListener(SelectSeeker);
            Texture2D selectionBackgroundTexture = gameManager != null ? gameManager.SelectionBackground : null;
            if (selectionBackgroundTexture != null)
                _selectionBackgroundSprite = Sprite.Create(selectionBackgroundTexture,
                    new Rect(0f, 0f, selectionBackgroundTexture.width, selectionBackgroundTexture.height),
                    new Vector2(0.5f, 0.5f));
            view.SetSelectionBackground(_selectionBackgroundSprite);
            view.ShowSelection();
            if (AudioManager.Instance != null && backgroundMusic != null)
            {
                AudioManager.Instance.SetMusicVolume(musicVolume);
                AudioManager.Instance.PlayMusic(backgroundMusic);
            }
        }

        private void Update()
        {
            if (HasEnded) return;
            if (!HasSelected)
            {
                _selectionRemaining -= Time.deltaTime;
                if (_selectionRemaining <= 0) Expire();
                return;
            }

            if (!_hasGameplayTimeout) return;
            Remaining = Mathf.Max(0, Remaining - Time.deltaTime);
            view.SetTime(Remaining);
            if (Remaining <= 0) Expire();
        }

        public void SelectHider()
        {
            SelectRole(true);
        }

        public void SelectSeeker()
        {
            SelectRole(false);
        }

        private void SelectRole(bool hider)
        {
            if (HasSelected || HasEnded) return;
            HasSelected = true;
            Remaining = gameManager != null ? Mathf.Max(0, gameManager.EndTime) : 30f;
            _hasGameplayTimeout = Remaining > 0f;
            view.ShowGameplay(hider);
            view.SetTime(Remaining);
            foreach (var actor in actors)
                if (actor != null)
                    actor.Begin();
            if (AudioManager.Instance != null) AudioManager.Instance.PlayOneShot(selectSound);
        }

        private void Expire()
        {
            if (AudioManager.Instance != null) AudioManager.Instance.PlayOneShot(timeoutSound);
            ShowCTA();
        }

        public void ShowCTA()
        {
            if (HasEnded) return;
            if (_lastCtaFrame == Time.frameCount) return;
            _lastCtaFrame = Time.frameCount;
            if (!HasEnded)
            {
                HasEnded = true;
                view.StopTutorials();
                foreach (var actor in actors)
                    if (actor != null)
                        actor.Stop();
                Luna.Unity.LifeCycle.GameEnded();
            }

            Debug.Log("[HideSeek] Open store");
            Luna.Unity.Playable.InstallFullGame();
        }

        public void BeginRun()
        {
            SelectHider();
        }

        private void OnDestroy()
        {
            if (_selectionBackgroundSprite != null) Destroy(_selectionBackgroundSprite);
            if (hiderButton != null) hiderButton.onClick.RemoveListener(SelectHider);
            if (seekerButton != null) seekerButton.onClick.RemoveListener(SelectSeeker);
        }
    }
}