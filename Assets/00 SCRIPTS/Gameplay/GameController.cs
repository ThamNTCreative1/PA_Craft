using UnityEngine;
using UnityEngine.UI;

// Steal Egg flow (as the SAEHR KingKong playable): walk to the Spooky's nest, hold Steal, the Spooky chases ("RUN!!"),
// run back the other way into the home coop: the player walks to the home nest and puts the egg in (the egg flies from
// the hands into the nest), then WIN + PLAY NOW. Caught = red flash, and as the original game: knocked down where
// the player stands (lying, then standing up), the baby goes back to the nest and the Spooky walks home; once up, the
// player goes for the egg again from there (Player Reset Count times, then the end card).
// Luna choices (LunaController): TypePlayer (human / gugugaga), TypeSpooky (0..8), PlayerSpeed, SpookySpeed.
public class GameController : ThiefGame
{
    private enum Phase { GoToEgg, Escaping, Caught, Delivering, Won }

    [SerializeField] private LunaController luna;
    [SerializeField] private Thief player;
    [SerializeField] private PlayerMotor motor;
    [SerializeField] private Nest nest;
    [SerializeField] private Monster spooky;
    [SerializeField] private GuideLine guide;
    [SerializeField] private StealPrompt stealPrompt;
    [Tooltip("Start tutorial (turn camera, joystick): the \"Steal an egg\" title and the arrow show once it is done.")]
    [SerializeField] private StealEggTutorial tutorial;
    [SerializeField] private ThirdPersonCamera cameraRig;
    [Tooltip("Light camera shake when caught: strength (m) and duration (s).")]
    [SerializeField] private float caughtShakeStrength = 0.25f;
    [SerializeField] private float caughtShakeTime = 0.45f;

    [Header("Places")]
    [Tooltip("Home coop area: centre (this transform) and size (x, z) — carrying the eggs inside it wins.")]
    [SerializeField] private Transform homeArea;
    [SerializeField] private Vector2 homeSize = new Vector2(10, 8);
    [Tooltip("Where the arrow line leads while running home.")]
    [SerializeField] private Transform homeTarget;
    [Tooltip("Eggs shown in the coop once they are brought home.")]
    [SerializeField] private GameObject homeEggs;

    [Header("Putting the egg in the home nest")]
    [Tooltip("The home nest (centre).")]
    [SerializeField] private Transform homeNest;
    [Tooltip("The egg in the home nest (under homeEggs): flies there from the hands.")]
    [SerializeField] private Transform homeEgg;
    [Tooltip("The held egg of each player model (the visible baby under its EggsObject): where the flight starts.")]
    [SerializeField] private Transform[] playerEggItems;
    [Tooltip("The player stops this far from the nest centre.")]
    [SerializeField] private float standDistance = 1.4f;
    [SerializeField] private float walkSpeed = 6f;
    [Tooltip("Walking gives up after this long (blocked): the egg is put in from where the player is.")]
    [SerializeField] private float walkTimeout = 2.5f;
    [SerializeField] private float turnTime = 0.3f;
    [SerializeField] private float placeTime = 0.55f;
    [SerializeField] private float placeArcHeight = 0.8f;
    [Tooltip("Seconds from the egg landing to the End UI.")]
    [SerializeField] private float endUIDelay = 1.5f;
    [Tooltip("Confetti (particle systems, play on awake) switched on when the egg lands in the home nest.")]
    [SerializeField] private GameObject winConfetti;
    [Tooltip("Camera pitch while the egg is put in.")]
    [SerializeField] private float deliverCameraPitch = 32f;
    [Tooltip("Camera yaw from straight behind the player (degrees): from the side, so the nest is not hidden by the body.")]
    [SerializeField] private float deliverCameraSide = 55f;
    [SerializeField] private float deliverCameraTurn = 3f;

    [Header("Rules")]
    [SerializeField] private float stealRadius = 2.5f;
    [SerializeField] private float stealHoldTime = 1f;

    [Header("Characters (Luna TypePlayer / TypeSpooky)")]
    [SerializeField] private GameObject[] playerModels;
    [SerializeField] private Animator[] playerAnimators;
    [SerializeField] private GameObject[] playerEggs;
    [Tooltip("Run clip speed of each player model at 8 m/s (scaled with the run speed).")]
    [SerializeField] private float[] playerRunAnimAt8 = { 1.2f, 1.2f };
    [Tooltip("Seconds lying down after a catch, per player model.")]
    [SerializeField] private float[] playerLyingTime = { 1.5f, 1f };
    [Tooltip("Seconds from standing up starting to control back, per player model (match the StandUp state speed).")]
    [SerializeField] private float[] playerStandUpTime = { 1.5f, 0.5f };
    [SerializeField] private GameObject[] spookyModels;
    [SerializeField] private Animator[] spookyAnimators;

    [Header("UI")]
    [Tooltip("\"Steal an egg\" title (until the eggs are taken).")]
    [SerializeField] private GameObject title;
    [Tooltip("\"RUN!!\" banner while carrying the eggs.")]
    [SerializeField] private GameObject runBanner;
    [Tooltip("Full-screen red image flashed when caught.")]
    [SerializeField] private Image caughtFlash;
    [SerializeField] private float caughtFlashAlpha = 0.55f;

    [Header("Audio")]
    [SerializeField] private AudioSource sfx;
    [SerializeField] private AudioClip stealClip;
    [SerializeField] private AudioClip winClip;
    [Tooltip("Played with winClip when the egg lands in the home nest (\"wow\").")]
    [SerializeField] private AudioClip winWowClip;
    [Tooltip("Played every time the player is caught (\"ugh\").")]
    [SerializeField] private AudioClip caughtClip;
    [SerializeField] private AudioSource chaseMusic;

    private Phase phase = Phase.GoToEgg;
    private float stealProgress;
    private int deliverStep;
    private float deliverTimer;
    private Quaternion turnFrom, turnTo;
    private Vector3 eggFromPos, eggToPos, eggToLocal, eggFromScale, eggToScale;
    private Quaternion eggFromRot, eggToRot;
    private float flashTime = -1;
    private int resets;
    private bool goalShown;

    public override float SurviveTime { get { return 1e9f; } }

    private void Start()
    {
        ApplyCharacters();
        ApplySpeeds();
        if (homeEggs) homeEggs.SetActive(false);
        if (caughtFlash) SetFlash(0);
        StartRound();
    }

    private void ApplyCharacters()
    {
        int p = luna ? Mathf.Clamp(luna.TypePlayer, 0, playerModels.Length - 1) : 0;
        for (int i = 0; i < playerModels.Length; i++) if (playerModels[i]) playerModels[i].SetActive(i == p);
        player.SetVisuals(playerAnimators[p], playerEggs[p]);
        if (p < playerLyingTime.Length && p < playerStandUpTime.Length) player.SetKnockTimes(playerLyingTime[p], playerStandUpTime[p]);
        motor.SetAnimator(playerAnimators[p]);

        int s = luna ? Mathf.Clamp(luna.TypeSpooky, 0, spookyModels.Length - 1) : 0;
        for (int i = 0; i < spookyModels.Length; i++) if (spookyModels[i]) spookyModels[i].SetActive(i == s);
        spooky.SetAnimator(spookyAnimators[s]);
    }

    private void ApplySpeeds()
    {
        if (luna && luna.PlayerSpeed > 0) motor.RunSpeed = luna.PlayerSpeed;
        if (luna && luna.SpookySpeed > 0) { spooky.ChaseSpeed = luna.SpookySpeed; spooky.ReturnSpeed = luna.SpookySpeed; }
        int p = luna ? Mathf.Clamp(luna.TypePlayer, 0, playerRunAnimAt8.Length - 1) : 0;
        motor.RunAnimSpeed = playerRunAnimAt8[p] * Mathf.Max(1f, motor.RunSpeed / 8f);
    }

    private void StartRound()
    {
        phase = Phase.GoToEgg;
        stealProgress = 0;
        if (runBanner) runBanner.SetActive(false);
        goalShown = false;
        if (title) title.SetActive(false);
        if (guide) guide.SetTarget(null);
        UpdateGoal();
    }

    // "Steal an egg" + the arrow to the nest: only after the start tutorial.
    private void UpdateGoal()
    {
        if (goalShown || (tutorial && !tutorial.Done)) return;
        goalShown = true;
        if (title) title.SetActive(true);
        if (guide) guide.SetTarget(nest.transform);
    }

    private void Update()
    {
        float dt = Time.deltaTime;
        switch (phase)
        {
            case Phase.GoToEgg: UpdateGoal(); UpdateSteal(dt); break;
            case Phase.Escaping: if (InHome(player.transform.position)) Win(); break;
            case Phase.Caught:
                // Lying, then standing up (Thief knock + stand-up times): play on once the player can move again
                if (player.CanMove) GetUp();
                break;
            case Phase.Delivering: UpdateDelivery(dt); break;
        }
        if (chaseMusic)
        {
            bool chase = phase == Phase.Escaping;
            if (chase && !chaseMusic.isPlaying) chaseMusic.Play();
            else if (!chase && chaseMusic.isPlaying) chaseMusic.Stop();
        }
        UpdateFlash(dt);
    }

    // At the nest: the Steal button shows; holding it fills it, full = the eggs are taken.
    private void UpdateSteal(float dt)
    {
        bool near = false;
        if (!player.IsCarrying && player.CanMove && nest.CanSteal)
        {
            Vector3 d = nest.Position - player.transform.position; d.y = 0;
            near = d.sqrMagnitude <= stealRadius * stealRadius;
        }
        if (!near)
        {
            stealProgress = 0;
            if (stealPrompt) stealPrompt.Hide();
            return;
        }
        bool held = (stealPrompt && stealPrompt.IsHeld) || Input.GetKey(KeyCode.E);
        stealProgress = held ? stealProgress + dt / Mathf.Max(0.01f, stealHoldTime) : 0;
        if (stealPrompt) stealPrompt.Show(nest.transform, Mathf.Clamp01(stealProgress));
        if (stealProgress >= 1f)
        {
            stealProgress = 0;
            if (stealPrompt) stealPrompt.Hide();
            player.Steal(nest);
        }
    }

    private bool InHome(Vector3 p)
    {
        if (homeArea == null) return false;
        Vector3 local = Quaternion.Inverse(homeArea.rotation) * (p - homeArea.position);
        return Mathf.Abs(local.x) <= homeSize.x * 0.5f && Mathf.Abs(local.z) <= homeSize.y * 0.5f;
    }

    public override void OnSteal(Thief thief)
    {
        if (thief != player) return;
        phase = Phase.Escaping;
        stealProgress = 0;
        if (stealPrompt) stealPrompt.Hide();
        if (sfx && stealClip) sfx.PlayOneShot(stealClip);
        if (title) title.SetActive(false);
        if (runBanner) runBanner.SetActive(true);
        if (guide) guide.SetTarget(homeTarget);
        if (luna) luna.OnEggStolen();
    }

    public override void OnCaught(Thief thief)
    {
        if (thief != player || phase != Phase.Escaping) return;
        phase = Phase.Caught;
        if (runBanner) runBanner.SetActive(false);
        if (guide) guide.SetTarget(null);
        flashTime = 0;
        if (cameraRig) cameraRig.Shake(caughtShakeStrength, caughtShakeTime);
        if (sfx && caughtClip) sfx.PlayOneShot(caughtClip);
    }

    public override void OnEscaped(Thief thief)
    {
    }

    // Home: the Spooky gives up, the player walks to the nest (no control), faces it and puts the egg in.
    private void Win()
    {
        phase = Phase.Delivering;
        motor.Frozen = true;
        spooky.GiveUp();
        if (runBanner) runBanner.SetActive(false);
        if (guide) guide.SetTarget(null);
        Vector3 away = player.transform.position - homeNest.position; away.y = 0;
        if (away.sqrMagnitude < 0.01f) away = Vector3.forward;
        Vector3 stand = homeNest.position + away.normalized * standDistance;
        stand.y = player.transform.position.y;
        motor.WalkTo(stand, walkSpeed);
        deliverStep = 0;
        deliverTimer = 0;
    }

    private void UpdateDelivery(float dt)
    {
        deliverTimer += dt;
        TurnCameraToNest(dt);
        switch (deliverStep)
        {
            case 0: // walk to the nest
                if (!motor.AutoMoving || deliverTimer >= walkTimeout)
                {
                    motor.StopWalk();
                    Vector3 look = homeNest.position - player.transform.position; look.y = 0;
                    turnFrom = player.transform.rotation;
                    turnTo = look.sqrMagnitude > 0.0001f ? Quaternion.LookRotation(look.normalized, Vector3.up) : turnFrom;
                    NextStep();
                }
                break;
            case 1: // face the nest
            {
                float k = Mathf.Clamp01(deliverTimer / Mathf.Max(0.01f, turnTime));
                motor.Teleport(player.transform.position, Quaternion.Slerp(turnFrom, turnTo, Mathf.SmoothStep(0f, 1f, k)));
                if (k >= 1f) { StartEggFlight(); NextStep(); }
                break;
            }
            case 2: // the egg flies from the hands into the nest
            {
                float k = Mathf.Clamp01(deliverTimer / Mathf.Max(0.01f, placeTime));
                float e = Mathf.SmoothStep(0f, 1f, k);
                Vector3 p = Vector3.Lerp(eggFromPos, eggToPos, e);
                p.y += placeArcHeight * 4f * e * (1f - e);
                homeEgg.position = p;
                homeEgg.rotation = Quaternion.Slerp(eggFromRot, eggToRot, e);
                homeEgg.localScale = Vector3.Lerp(eggFromScale, eggToScale, e);
                if (k >= 1f)
                {
                    homeEgg.localPosition = eggToLocal;
                    homeEgg.rotation = eggToRot;
                    if (sfx && winClip) sfx.PlayOneShot(winClip);
                    if (sfx && winWowClip) sfx.PlayOneShot(winWowClip);
                    if (winConfetti) winConfetti.SetActive(true);
                    NextStep();
                }
                break;
            }
            case 3: // landed: a small bounce, then the End UI
            {
                float b = Mathf.Clamp01(deliverTimer / 0.25f);
                homeEgg.localScale = eggToScale * (1f + 0.18f * Mathf.Sin(b * Mathf.PI));
                if (deliverTimer >= endUIDelay)
                {
                    phase = Phase.Won;
                    if (luna) luna.ShowEndUI();
                }
                break;
            }
        }
    }

    private void NextStep()
    {
        deliverStep++;
        deliverTimer = 0;
    }

    // The home egg starts at the held egg (same world pose and size); the held one is hidden.
    private void StartEggFlight()
    {
        if (homeEggs) homeEggs.SetActive(true);
        eggToLocal = homeEgg.localPosition;
        eggToPos = homeEgg.position;
        eggToRot = homeEgg.rotation;
        eggToScale = homeEgg.localScale;
        int p = luna ? Mathf.Clamp(luna.TypePlayer, 0, playerEggItems.Length - 1) : 0;
        Transform held = playerEggItems.Length > 0 ? playerEggItems[p] : null;
        Vector3 parentScale = homeEgg.parent ? homeEgg.parent.lossyScale : Vector3.one;
        if (held)
        {
            eggFromPos = held.position;
            eggFromRot = held.rotation;
            Vector3 hs = held.lossyScale;
            eggFromScale = new Vector3(hs.x / parentScale.x, hs.y / parentScale.y, hs.z / parentScale.z);
        }
        else
        {
            eggFromPos = eggToPos + Vector3.up;
            eggFromRot = eggToRot;
            eggFromScale = eggToScale;
        }
        homeEgg.position = eggFromPos;
        homeEgg.rotation = eggFromRot;
        homeEgg.localScale = eggFromScale;
        player.Deliver();
    }

    // From behind and to the side of the player, looking at the nest.
    private void TurnCameraToNest(float dt)
    {
        if (cameraRig == null) return;
        Vector3 d = homeNest.position - player.transform.position; d.y = 0;
        if (d.sqrMagnitude < 0.0001f) return;
        float targetYaw = Mathf.Atan2(d.x, d.z) * Mathf.Rad2Deg + deliverCameraSide;
        float k = 1f - Mathf.Exp(-deliverCameraTurn * dt);
        cameraRig.SetView(Mathf.LerpAngle(cameraRig.Yaw, targetYaw, k), Mathf.Lerp(cameraRig.Pitch, deliverCameraPitch, k));
    }

    private void GetUp()
    {
        resets++;
        int limit = luna ? luna.PlayerResetCount : -1;
        // Over the limit: the End Card shows (transparent, every tap = store); the game itself goes on as usual behind it.
        if (limit >= 0 && resets > limit && luna && !luna.Ended) luna.ShowEndCard();
        StartRound();
    }

    // Red flash: fade in fast, out slower (Image colour alpha, no CanvasGroup).
    private void UpdateFlash(float dt)
    {
        if (caughtFlash == null || flashTime < 0) return;
        flashTime += dt;
        const float fadeIn = 0.12f, fadeOut = 0.6f;
        float a = flashTime < fadeIn ? flashTime / fadeIn : 1f - (flashTime - fadeIn) / fadeOut;
        if (flashTime >= fadeIn + fadeOut) { a = 0; flashTime = -1; }
        SetFlash(Mathf.Clamp01(a) * caughtFlashAlpha);
    }

    private void SetFlash(float alpha)
    {
        Color c = caughtFlash.color; c.a = alpha; caughtFlash.color = c;
        bool on = alpha > 0.001f;
        if (caughtFlash.gameObject.activeSelf != on) caughtFlash.gameObject.SetActive(on);
    }
}
