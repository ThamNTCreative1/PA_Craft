using DG.Tweening;
using UnityEngine;

namespace Playable.TempleRun
{
    public class RunnerDemoIntro : MonoBehaviour
    {
        public GameObject room;
        public GameObject title;
        public GameObject[] gameplayRoots;
        public Transform coin;
        public Camera introCamera;
        public Transform arm;
        public AudioClip backgroundMusic;
        [Range(0f, 1f)] public float musicVolume = 0.4f;
        public float jumpHeight = 0.35f;
        public float jumpDuration = 0.8f;
        private Vector3 _coinPosition, _coinScale, _titleScale;
        private Tween _jumpTween, _titleTween;
        private bool _gameEnded;
        private int _lastCtaFrame = -1;

        private void Awake()
        {
            if (coin != null) { _coinPosition = coin.localPosition; _coinScale = coin.localScale; }
            if (title != null) _titleScale = title.transform.localScale;
        }

        private void OnEnable()
        {
            if (coin != null)
                _jumpTween = coin.DOLocalJump(_coinPosition, jumpHeight, 1, jumpDuration)
                    .SetEase(Ease.Linear).SetLoops(-1, LoopType.Restart).SetUpdate(true);
            if (title != null)
                _titleTween = title.transform.DOScale(_titleScale * 1.08f, 0.55f)
                    .SetEase(Ease.InOutSine).SetLoops(-1, LoopType.Yoyo).SetUpdate(true);
        }

        private void Start()
        {
            if (AudioManager.Instance != null && backgroundMusic != null)
            {
                AudioManager.Instance.SetMusicVolume(musicVolume);
                AudioManager.Instance.PlayMusic(backgroundMusic);
            }
        }

        private void Update()
        {
            if (arm != null && introCamera != null)
            {
                Vector3 p = arm.localPosition;
                p.x = Mathf.Tan(introCamera.fieldOfView * 0.5f * Mathf.Deg2Rad) * introCamera.aspect * p.z * 0.8f;
                arm.localPosition = p;
            }
            // Global input intentionally includes taps over the title and hotbar.
            if (Input.GetMouseButtonDown(0)) ShowCTA();
        }

        public void ShowCTA()
        {
            if (_lastCtaFrame == Time.frameCount) return;
            _lastCtaFrame = Time.frameCount;
            if (!_gameEnded)
            {
                _gameEnded = true;
                Luna.Unity.LifeCycle.GameEnded();
            }
            Debug.Log("[DemoIntro] Show CTA");
            Luna.Unity.Playable.InstallFullGame();
        }

        // Preserve existing UnityEvent bindings while routing straight to the store.
        public void BeginRun() { ShowCTA(); }

        private void OnDisable()
        {
            if (_jumpTween != null) _jumpTween.Kill();
            if (_titleTween != null) _titleTween.Kill();
            if (coin != null) { coin.localPosition = _coinPosition; coin.localScale = _coinScale; }
            if (title != null) title.transform.localScale = _titleScale;
        }
    }
}
