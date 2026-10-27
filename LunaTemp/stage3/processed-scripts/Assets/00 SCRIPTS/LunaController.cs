using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UI;

public class LunaController : MonoBehaviour
{
    public static LunaController Ins { get; private set; }
    [LunaPlaygroundField("Time Play", 0)]
    [SerializeField, Min(0)] private float TimePlay = 0;
    [LunaPlaygroundField("Count Play", 1)]
    [SerializeField, Min(0)] private int Count = 0;
    [LunaPlaygroundAsset("Logo 200x126", 2)]
    [SerializeField] private Texture2D Logo;
    [LunaPlaygroundField("CTA High")] public float YPosCTA;
    [SerializeField] private RectTransform CTA;
    [LunaPlaygroundField("Title Text")] public string TitleText;
    [SerializeField] private Text title;
    [LunaPlaygroundAsset("Background Music", 3)]
    [SerializeField] private AudioClip BackgroundMusic;
    [LunaPlaygroundField("Light Intensity", 4)]
    [SerializeField, Range(0f, 5f)] private float Intensity = 1f;

    [Header("Saved scene references")]
    [SerializeField] private GameController game;
    [SerializeField] private BuildProgressUI hud;
    [SerializeField] private BuildTouchControls controls;
    [SerializeField] private List<Button> ctaButton;
    [SerializeField] private RawImage logoImage;
    [SerializeField] private AudioSource musicSource;
    [SerializeField] private GameObject tutorial;
    [SerializeField] private Light directionalLight;
    [SerializeField] private GameObject endCard;
    private Coroutine timePlayRoutine;
    private bool counting;
    public int InteractionCount { get; private set; }
    public bool IsCTAActive { get; private set; }

    void Awake()
    {
        Ins = this;
        title.text = TitleText;
        ctaButton.ForEach(b => b.onClick.AddListener(ClickCTA));
    }
    void OnEnable()
    {
        if (game != null) game.GuideBuildAccepted += OnGuideBuild;
        if (hud != null) hud.BlockSlotClicked += OnCountedClick;
        if (controls != null) controls.FlyClicked += OnCountedClick;
    }
    void Start()
    {
        Vector3 pos = CTA.localPosition;
        pos.y = YPosCTA;
        CTA.localPosition = pos;


        Intensity = Mathf.Clamp(Intensity, 0, 5);
        if (directionalLight != null) directionalLight.intensity = Intensity;
        if (logoImage != null && Logo != null) logoImage.texture = Logo;
        if (musicSource != null && BackgroundMusic != null)
        {
            musicSource.clip = BackgroundMusic; musicSource.loop = true; musicSource.Play();
        }
        StartCoroutine(CountTimePlay());
        if (Count <= 0) ShowEndCard();
    }

    IEnumerator CountTimePlay()
    {
        yield return new WaitForSeconds(TimePlay);
        Luna.Unity.LifeCycle.GameEnded();
        ShowEndCard();
    }
    void StopTimePlay()
    {
        if (timePlayRoutine == null) return;
        StopCoroutine(timePlayRoutine);
        timePlayRoutine = null;
    }
    void OnGuideBuild()
    {
        if (IsCTAActive) return;
        counting = true;
        OnCountedClick();
    }
    void OnCountedClick()
    {
        if (!counting || IsCTAActive) return;
        InteractionCount++;
        if (Count > 0 && InteractionCount >= Count) ShowEndCard();
    }
    public void ShowEndCard()
    {
        endCard.SetActive(true);
    }
    public void ClickCTA()
    {
        Luna.Unity.Playable.InstallFullGame();
    }
    void OnDisable()
    {
        StopTimePlay();
        if (game != null) game.GuideBuildAccepted -= OnGuideBuild;
        if (hud != null) hud.BlockSlotClicked -= OnCountedClick;
        if (controls != null) controls.FlyClicked -= OnCountedClick;
    }
    void OnDestroy() { if (Ins == this) Ins = null; }
}
