using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UI;

// Luna Playworks integration only: playground fields, lifecycle, CTA, end card. Gameplay lives in 00 SCRIPTS/Gameplay.
public class LunaController : MonoBehaviour
{
    [LunaPlaygroundField("Limit Time Play?")] public bool LimitTimePlay;
    [LunaPlaygroundField("Time Play")] public float TimePlay = 60;
    [LunaPlaygroundAsset("BGM")] public AudioClip BGM;
    [Tooltip("Steal Egg scene: 0 = human (game player), 1 = gugugaga.")]
    [LunaPlaygroundField("Type Player: 0 Human, 1 Gugugaga")] public int TypePlayer = 0;
    [Tooltip("Steal Egg scene: which Spooky guards the egg (0..8).")]
    [LunaPlaygroundField("Type Spooky: 0 -> 8")] public int TypeSpooky = 0;
    [Tooltip("Player run speed (0 = keep the scene value).")]
    [LunaPlaygroundField("Player Speed")] public float PlayerSpeed = 0;
    [Tooltip("Spooky chase speed (0 = keep the scene value).")]
    [LunaPlaygroundField("Spooky Speed")] public float SpookySpeed = 0;
    [Tooltip("How many times the player may be caught and start over; the next catch shows the end card. -1 = unlimited.")]
    [LunaPlaygroundField("Player Reset Count")] public int PlayerResetCount = 3;
    [Tooltip("0 = play the whole game; 1 = the first click anywhere goes to the store (end card at once); 2 = going to the store as soon as the egg is stolen.")]
    [LunaPlaygroundField("CTA Mode: 0 Play all, 1 First click, 2 After steal")] public int CtaMode = 0;

    [SerializeField] private AudioSource musicSource;
    [SerializeField, Range(0, 1)] private float musicVolume = 0.5f;
    [SerializeField] private List<Button> CTA = new List<Button>();
    [Tooltip("End UI: the end display (background, title). Shown with the End Card when the game ends.")]
    [SerializeField] private GameObject endUI;
    [Tooltip("End Card: the PLAY NOW button.")]
    [SerializeField] private GameObject endCard;
    [Tooltip("Full-screen invisible click catcher on top of the UI, active only in CTA Mode 1.")]
    [SerializeField] private GameObject firstClickZone;

    private bool ended;
    public bool Ended { get { return ended; } }

    private void Start()
    {
        if (BGM && musicSource) { musicSource.clip = BGM; musicSource.loop = true; musicSource.volume = musicVolume; musicSource.Play(); }
        foreach (Button b in CTA) if (b) b.onClick.AddListener(ClickCTA);
        if (endUI) endUI.SetActive(false);
        if (endCard) endCard.SetActive(false);
        if (firstClickZone) firstClickZone.SetActive(CtaMode == 1);
        StartCoroutine(EndAfterTime());
    }

    // Luna's GameEnded is sent only when TimePlay runs out (never from the end card / end UI / CTA).
    private bool gameEndedSent;
    private void SendGameEnded()
    {
        if (gameEndedSent) return;
        gameEndedSent = true;
        Luna.Unity.LifeCycle.GameEnded();
    }

    // Game over: the End UI together with the End Card.
    public void ShowEndUI()
    {
        ended = true;
        if (endUI) endUI.SetActive(true);
        if (endCard) endCard.SetActive(true);
    }

    // Only the End Card (PLAY NOW button).
    public void ShowEndCard()
    {
        ended = true;
        if (endCard) endCard.SetActive(true);
    }

    // CTA Mode 1: the first click anywhere (FirstClickCta on firstClickZone).
    public void FirstClick()
    {
        if (firstClickZone) firstClickZone.SetActive(false);
        GoToStore();
    }

    // CTA Mode 2: called by the gameplay when the egg is stolen.
    public void OnEggStolen()
    {
        if (CtaMode == 2) GoToStore();
    }

    // Store + the End Card (PLAY NOW) on screen.
    private void GoToStore()
    {
        ShowEndCard();
        ClickCTA();
    }

    public void ClickCTA()
    {
        Luna.Unity.Playable.InstallFullGame();
    }

    private IEnumerator EndAfterTime()
    {
        yield return new WaitForSeconds(TimePlay);
        SendGameEnded();
        if (LimitTimePlay && !ended) ShowEndUI();
    }
}
