using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UI;

// Luna Playworks integration only: lifecycle, playground fields, CTA and end card. Gameplay lives in StealEggGame.
public class LunaController : MonoBehaviour
{
    public static LunaController Instance { get; private set; }

    [LunaPlaygroundField("Limit Time Play?")] public bool LimitTimePlay;
    [LunaPlaygroundField("Time Play")] public float TimePlay;
    [LunaPlaygroundAsset("BGM")] public AudioClip BGM;

    [LunaPlaygroundField("Limit Count Click?")] public bool LimitCountClick;
    [LunaPlaygroundField("Count Click")] public int MaxCountClick;
    [LunaPlaygroundField("Limit Count Incubate?")] public bool LimitCountIncubate;
    [LunaPlaygroundField("Count Incubate")] public int MaxCountIncubate;
    [LunaPlaygroundField("Limit Count Hatch?")] public bool LimitCountHatch;
    [LunaPlaygroundField("Count Hatch")] public int MaxCountHatch;

    [SerializeField] private AudioSource musicSource;
    [SerializeField] private List<Button> CTA;
    [SerializeField] private GameObject endCard;

    public bool EndCardVisible { get { return endCard && endCard.activeSelf; } }
    private int clicks, incubates, hatches;

    private void Awake()
    {
        Instance = this;
    }
    private void Start()
    {
        if (BGM && musicSource) { musicSource.clip = BGM; musicSource.loop = true; musicSource.Play(); }
        foreach (Button b in CTA) if (b) b.onClick.AddListener(ClickCTA);
        if (endCard) endCard.SetActive(false);
        StartCoroutine(EndGame());
    }
    private void OnDestroy()
    {
        if (Instance == this) Instance = null;
    }

    private void Update()
    {
        if (Input.GetMouseButtonDown(0)) CountClick();
    }
    private void CountClick()
    {
        if (!LimitCountClick) return;
        clicks++;
        if (clicks >= MaxCountClick) ClickCTA();
    }
    public void EggIncubated()
    {
        incubates++;
        if (LimitCountIncubate && incubates >= MaxCountIncubate) ClickCTA();
    }
    public void EggHatched()
    {
        hatches++;
        if (LimitCountHatch && hatches >= MaxCountHatch) ClickCTA();
    }

    public void ShowEndCard()
    {
        if (endCard) endCard.SetActive(true);
    }
    public void ClickCTA()
    {
        Luna.Unity.Playable.InstallFullGame();
    }
    private IEnumerator EndGame()
    {
        yield return new WaitForSeconds(TimePlay);
        Luna.Unity.LifeCycle.GameEnded();
        if (LimitTimePlay) ShowEndCard();
    }
}
