using UnityEngine;
using UnityEngine.UI;
using TMPro;

// Main game flow (source Player / Message / ValueSystem / RewardAD parts):
// stand at a nest -> the "Steal the eggs" button shows -> hold it until the ring is full -> eggs taken, the monster chases, "It's time to run!" and the
// survival timer -> survive = "You earned 500" popup + coins; caught = eggs back to the nest.
public class HuntGameController : ThiefGame
{
    [SerializeField] private LunaController luna;
    [SerializeField] private Thief player;
    [SerializeField] private Nest[] nests;
    [SerializeField] private StealPrompt stealPrompt;
    [SerializeField] private GuideLine guide;

    [Header("Rules")]
    [Tooltip("Distance from the nest at which stealing starts.")]
    [SerializeField] private float stealRadius = 2.5f;
    [Tooltip("Seconds the Steal button must be held to fill the ring.")]
    [SerializeField] private float stealHoldTime = 1f;
    [Tooltip("Run timer after stealing (survive it to keep the eggs).")]
    [SerializeField] private float surviveTime = 10f;
    [SerializeField] private int reward = 500;
    [SerializeField] private int startCoins = 0;

    [Header("HUD")]
    [SerializeField] private TMP_Text coinsText;
    [Tooltip("Canvas/RunMessage (\"It's time to run!\"), Animator with Show/Hide triggers.")]
    [SerializeField] private Animator runMessage;
    [SerializeField] private float runMessageTime = 2f;
    [Tooltip("Canvas/TimerSurvival.")]
    [SerializeField] private TMP_Text timerText;
    [SerializeField] private string timerFormat = "Survive: {0}";

    [Header("Reward popup (Canvas/RewardX2)")]
    [SerializeField] private GameObject rewardPopup;
    [SerializeField] private Button rewardClose;
    [Tooltip("The x2 button (watch-ad button in the source).")]
    [SerializeField] private Button rewardDouble;

    [Header("Audio")]
    [SerializeField] private AudioSource sfx;
    [SerializeField] private AudioClip stealClip;
    [SerializeField] private AudioClip rewardClip;
    [Tooltip("Looping chase music (Intense Chase) while the player carries eggs.")]
    [SerializeField] private AudioSource chaseMusic;

    private int coins;
    private float shownCoins;
    private float stealProgress;
    private Nest promptNest;
    private float runMessageTimer = -1;
    private bool firstStealDone;

    public override float SurviveTime { get { return surviveTime; } }

    private void Start()
    {
        coins = startCoins;
        shownCoins = coins;
        UpdateCoins();
        if (rewardPopup) rewardPopup.SetActive(false);
        if (timerText) timerText.gameObject.SetActive(false);
        if (runMessage) runMessage.gameObject.SetActive(false);
        if (stealPrompt) stealPrompt.Hide();
        if (rewardClose) rewardClose.onClick.AddListener(CloseReward);
        if (rewardDouble) rewardDouble.onClick.AddListener(DoubleReward);
        if (guide) guide.SetTarget(TutorialNest());
    }

    private Transform TutorialNest()
    {
        Nest best = null;
        float bestD = float.MaxValue;
        for (int i = 0; i < nests.Length; i++)
        {
            if (nests[i] == null) continue;
            if (nests[i].tutorialNest) return nests[i].transform;
            float d = (nests[i].Position - player.transform.position).sqrMagnitude;
            if (d < bestD) { bestD = d; best = nests[i]; }
        }
        return best ? best.transform : null;
    }

    private void Update()
    {
        float dt = Time.deltaTime;
        UpdateSteal(dt);

        if (chaseMusic)
        {
            if (player.IsCarrying && !chaseMusic.isPlaying) chaseMusic.Play();
            else if (!player.IsCarrying && chaseMusic.isPlaying) chaseMusic.Stop();
        }

        if (timerText)
        {
            bool show = player.IsCarrying;
            if (timerText.gameObject.activeSelf != show) timerText.gameObject.SetActive(show);
            if (show) timerText.text = string.Format(timerFormat, Mathf.CeilToInt(player.SurviveLeft));
        }

        if (runMessageTimer >= 0)
        {
            runMessageTimer -= dt;
            if (runMessageTimer < 0 && runMessage) runMessage.SetTrigger("Hide");
        }

        if (Mathf.Abs(shownCoins - coins) > 0.5f)
        {
            shownCoins = Mathf.MoveTowards(shownCoins, coins, Mathf.Max(50f, Mathf.Abs(coins - shownCoins) * 3f) * dt);
            UpdateCoins();
        }
    }

    // Player stands at a stealable nest: the "Steal the eggs" button shows; holding it (or E) fills the ring,
    // full = the eggs are taken. Released early: the ring starts over.
    private void UpdateSteal(float dt)
    {
        Nest near = null;
        if (!player.IsCarrying && player.CanMove)
        {
            float best = stealRadius * stealRadius;
            for (int i = 0; i < nests.Length; i++)
            {
                Nest n = nests[i];
                if (n == null || !n.CanSteal) continue;
                Vector3 d = n.Position - player.transform.position; d.y = 0;
                if (d.sqrMagnitude <= best) { best = d.sqrMagnitude; near = n; }
            }
        }
        if (near != promptNest) { promptNest = near; stealProgress = 0; }
        if (near == null)
        {
            if (stealPrompt) stealPrompt.Hide();
            return;
        }
        bool held = (stealPrompt && stealPrompt.IsHeld) || Input.GetKey(KeyCode.E);
        stealProgress = held ? stealProgress + dt / Mathf.Max(0.01f, stealHoldTime) : 0;
        if (stealPrompt) stealPrompt.Show(near.transform, Mathf.Clamp01(stealProgress));
        if (stealProgress >= 1f)
        {
            stealProgress = 0;
            promptNest = null;
            if (stealPrompt) stealPrompt.Hide();
            player.Steal(near);
        }
    }

    public override void OnSteal(Thief thief)
    {
        if (!thief.IsPlayer) return;
        if (sfx && stealClip) sfx.PlayOneShot(stealClip);
        if (runMessage)
        {
            runMessage.gameObject.SetActive(true);
            runMessage.SetTrigger("Show");
            runMessageTimer = runMessageTime;
        }
        if (!firstStealDone)
        {
            firstStealDone = true;
            if (guide) guide.SetTarget(null);
        }
    }

    public override void OnCaught(Thief thief)
    {
    }

    public override void OnEscaped(Thief thief)
    {
        if (!thief.IsPlayer) return;
        AddCoins(reward);
        if (sfx && rewardClip) sfx.PlayOneShot(rewardClip);
        if (rewardPopup) rewardPopup.SetActive(true);
    }

    public int Coins { get { return coins; } }

    private void AddCoins(int amount)
    {
        coins += amount;
    }

    // Upgrades: pay when there is enough (the counter counts down to the new amount).
    public bool TrySpend(int amount)
    {
        if (amount > coins) return false;
        coins -= amount;
        return true;
    }

    private void UpdateCoins()
    {
        if (coinsText) coinsText.text = Mathf.RoundToInt(shownCoins).ToString();
    }

    public void CloseReward()
    {
        if (rewardPopup) rewardPopup.SetActive(false);
    }

    public void DoubleReward()
    {
        AddCoins(reward);
        CloseReward();
    }
}
