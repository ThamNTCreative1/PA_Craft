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
    // IAP popup once the player has walked IAPDistance metres. 0: off, 1: hand on $7.99, 2: hand on $0.99,
    // 3: buttons read "10 eggs" / "1 egg", hand on 10 eggs, 4: the same, hand on 1 egg.
    [LunaPlaygroundField("IAP Version")] public int IAPVersion = 1;
    [LunaPlaygroundField("IAP Distance")] public float IAPDistance = 6;

    [SerializeField] private AudioSource musicSource;
    [SerializeField] private List<Button> CTA;
    [SerializeField] private GameObject endCard;
    [SerializeField] private IAPPopupView iapPopup;

    public bool EndCardVisible { get { return endCard && endCard.activeSelf; } }
    public bool IAPVisible { get { return iapPopup && iapPopup.gameObject.activeSelf; } }
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
        if (iapPopup) iapPopup.gameObject.SetActive(false);
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

    // Gameplay reports the distance walked so far: past IAPDistance the IAP popup opens and stays (its buttons go to the store).
    private bool iapShown;
    public void PlayerWalked(float distance)
    {
        if (iapShown || IAPVersion <= 0 || !iapPopup || distance < IAPDistance) return;
        iapShown = true;
        iapPopup.Show(IAPVersion, ClickCTA);
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
