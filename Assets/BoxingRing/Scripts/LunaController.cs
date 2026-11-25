using UnityEngine;
using UnityEngine.UI;

public sealed class LunaController : MonoBehaviour
{
    [SerializeField, Min(1), LunaPlaygroundField("Click Count", 0, "CTA")] int clickCount = 3;
    [SerializeField, Min(0.1f), LunaPlaygroundField("End Time (seconds)", 1, "CTA")] float endTime = 20f;
    [SerializeField, LunaPlaygroundAsset("BGM", 2, "CTA")] AudioClip bgm;
    [SerializeField] AudioSource musicSource;
    [SerializeField] Button transparentCta;

    int clicks;
    float remainingTime;
    bool gameEnded;

    public bool IsCtaReady { get; private set; }

    void Awake()
    {
        remainingTime = endTime;
        transparentCta.gameObject.SetActive(false);

        musicSource.clip = bgm;
    }

    void Start()
    {
#if UNITY_LUNA
        Luna.Unity.LifeCycle.GameStarted();
#endif
    }

    void Update()
    {
        if (IsCtaReady || gameEnded) return;
        remainingTime -= Time.unscaledDeltaTime;
        if (remainingTime <= 0f) EnableCta();
    }

    public void RegisterClick()
    {
        if (IsCtaReady || gameEnded) return;
        clicks++;
        if (clicks == 1 && musicSource.clip != null) musicSource.Play();
        if (clicks >= clickCount) EnableCta();
    }

    void EnableCta()
    {
        IsCtaReady = true;
        transparentCta.gameObject.SetActive(true);
    }

    public void OpenCta()
    {
        if (!gameEnded)
        {
            gameEnded = true;
            if (!IsCtaReady) EnableCta();
#if UNITY_LUNA
            Luna.Unity.LifeCycle.GameEnded();
#endif
        }
#if UNITY_LUNA
        Luna.Unity.Playable.InstallFullGame();
#endif
    }
}
