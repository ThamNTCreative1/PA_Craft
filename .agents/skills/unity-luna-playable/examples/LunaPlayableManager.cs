using System.Collections;
using UnityEngine;
using UnityEngine.UI;
#if UNITY_EDITOR || LUNA
using Luna.Unity;
#endif

/// <summary>
/// Production-ready boilerplate template for Unity Luna Playable Ads.
/// Handles:
/// - Luna Playground configurable variables
/// - Gameplay lifecycle (LifeCycle.GameStarted, LifeCycle.GameEnded)
/// - Store CTA redirect (Playable.InstallFullGame)
/// - Idle hint animation & auto-advance timer
/// - First-touch audio unlock
/// </summary>
public class LunaPlayableManager : MonoBehaviour
{
    public static LunaPlayableManager Instance { get; private set; }

    [Header("Luna Playground Variables")]
    [LunaPlaygroundField("Playable Settings", "Store URL", "")]
    [SerializeField] private string storeUrl = "";

    [LunaPlaygroundField("Playable Settings", "Idle Timeout (Seconds)", 5.0f)]
    [SerializeField] private float idleTimeout = 5.0f;

    [LunaPlaygroundField("Playable Settings", "Auto End Card Timeout (Seconds)", 20.0f)]
    [SerializeField] private float autoEndCardTimeout = 20.0f;

    [LunaPlaygroundField("Playable Settings", "Enable Sound", true)]
    [SerializeField] private bool soundEnabled = true;

    [Header("UI Panels & Hints")]
    [SerializeField] private GameObject tutorialHand;
    [SerializeField] private GameObject endCardPanel;
    [SerializeField] private Button ctaButton;

    private float _idleTimer = 0f;
    private bool _isAdEnded = false;
    private bool _audioUnlocked = false;

    private void Awake()
    {
        if (Instance == null) Instance = this;
        else Destroy(gameObject);

        if (endCardPanel != null) endCardPanel.SetActive(false);
        if (ctaButton != null) ctaButton.onClick.AddListener(OnCtaClicked);
    }

    private void Start()
    {
#if UNITY_EDITOR || LUNA
        LifeCycle.GameStarted();
#endif
        AudioListener.pause = !soundEnabled;
    }

    private void Update()
    {
        if (_isAdEnded) return;

        // 1. Audio unlock on first touch
        if (!_audioUnlocked && (Input.GetMouseButtonDown(0) || Input.touchCount > 0))
        {
            _audioUnlocked = true;
            if (soundEnabled) AudioListener.pause = false;
        }

        // 2. Idle timer tracking
        _idleTimer += Time.deltaTime;

        if (_idleTimer >= idleTimeout && tutorialHand != null && !tutorialHand.activeSelf)
        {
            tutorialHand.SetActive(true);
        }

        if (_idleTimer >= autoEndCardTimeout)
        {
            EndPlayable(true);
        }

        // 3. Reset idle on player touch
        if (Input.GetMouseButtonDown(0) || (Input.touchCount > 0 && Input.GetTouch(0).phase == TouchPhase.Began))
        {
            ResetIdle();
        }
    }

    public void ResetIdle()
    {
        _idleTimer = 0f;
        if (tutorialHand != null) tutorialHand.SetActive(false);
    }

    /// <summary>
    /// Call when game objective is achieved or failed
    /// </summary>
    public void EndPlayable(bool isWin)
    {
        if (_isAdEnded) return;
        _isAdEnded = true;

#if UNITY_EDITOR || LUNA
        LifeCycle.GameEnded();
#endif

        if (tutorialHand != null) tutorialHand.SetActive(false);
        if (endCardPanel != null) endCardPanel.SetActive(true);

        // Start pulsating animation on CTA button if present
        if (ctaButton != null)
        {
            StartCoroutine(PulseButton(ctaButton.transform));
        }
    }

    public void OnCtaClicked()
    {
#if UNITY_EDITOR || LUNA
        Playable.InstallFullGame(storeUrl);
#endif
    }

    private IEnumerator PulseButton(Transform buttonTransform)
    {
        Vector3 baseScale = buttonTransform.localScale;
        Vector3 targetScale = baseScale * 1.12f;

        while (_isAdEnded)
        {
            // Scale Up
            for (float t = 0; t < 0.4f; t += Time.deltaTime)
            {
                buttonTransform.localScale = Vector3.Lerp(baseScale, targetScale, t / 0.4f);
                yield return null;
            }
            // Scale Down
            for (float t = 0; t < 0.4f; t += Time.deltaTime)
            {
                buttonTransform.localScale = Vector3.Lerp(targetScale, baseScale, t / 0.4f);
                yield return null;
            }
            yield return new WaitForSeconds(0.2f);
        }
    }
}
