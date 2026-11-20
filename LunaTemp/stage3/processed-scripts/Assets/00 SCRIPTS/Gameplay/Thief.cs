using UnityEngine;

// Steals eggs (the player and the bot players; source Player + NestSelector). Carrying: the eggs are held in front,
// the nest's monster chases, and a run timer counts down. Survive the timer = escaped (the eggs are kept, reward);
// caught = knocked down (lying pose, then stand up) and the eggs go back to the nest.
public class Thief : MonoBehaviour
{
    [SerializeField] private bool isPlayer;
    [SerializeField] private ThiefGame game;
    [SerializeField] private Animator animator;
    [Tooltip("The eggs held in front of the chest (source EggsObject).")]
    [SerializeField] private GameObject eggsVisual;
    [SerializeField] private AudioSource audioSource;
    [SerializeField] private AudioClip[] deathClips;
    [SerializeField] private float knockTime = 1.5f;
    [Tooltip("Control comes back this long after standing up starts: source BackStandUp event OnStandingUpAnimationEnded at 3.00 s, clip speed 2.")]
    [SerializeField] private float standUpTime = 1.5f;

    private Nest carryingFrom;
    private float surviveLeft;
    private bool knocked;
    private float knockTimer;
    private float standTimer;

    public bool IsPlayer { get { return isPlayer; } }
    public Nest CarryingFrom { get { return carryingFrom; } }
    public bool IsCarrying { get { return carryingFrom != null; } }
    public float SurviveLeft { get { return surviveLeft; } }
    public bool IsKnocked { get { return knocked || standTimer > 0; } }
    public bool CanMove { get { return !knocked && standTimer <= 0; } }

    private void Start()
    {
        if (eggsVisual) eggsVisual.SetActive(false);
    }

    public void Steal(Nest nest)
    {
        if (nest == null || !nest.CanSteal || carryingFrom != null || !CanMove) return;
        nest.TakeEggs();
        nest.reservedBy = null;
        carryingFrom = nest;
        surviveLeft = game ? game.SurviveTime : 10f;
        if (eggsVisual) eggsVisual.SetActive(true);
        if (animator) animator.SetBool("Carry", true);
        if (nest.Monster) nest.Monster.StartChase(this);
        if (game) game.OnSteal(this);
    }

    public void Caught()
    {
        if (carryingFrom != null) carryingFrom.ReturnEggs();
        carryingFrom = null;
        if (eggsVisual) eggsVisual.SetActive(false);
        knocked = true;
        knockTimer = knockTime;
        if (animator) { animator.SetBool("Carry", false); animator.SetBool("Knocked", true); }
        if (audioSource && deathClips != null && deathClips.Length > 0) audioSource.PlayOneShot(deathClips[Random.Range(0, deathClips.Length)]);
        if (game) game.OnCaught(this);
    }

    // The eggs are brought home (Steal Egg flow: the coop is the finish, no run timer).
    public void Deliver()
    {
        if (carryingFrom != null) Escape();
    }

    // Per character (Luna TypePlayer): seconds lying down, and seconds from standing up starting to control back.
    public void SetKnockTimes(float lying, float standUp)
    {
        knockTime = lying;
        standUpTime = standUp;
    }

    // Character choice (Luna TypePlayer): which model's Animator and held-eggs object this thief uses.
    public void SetVisuals(Animator newAnimator, GameObject newEggsVisual)
    {
        if (eggsVisual && eggsVisual != newEggsVisual) eggsVisual.SetActive(false);
        animator = newAnimator;
        eggsVisual = newEggsVisual;
        if (eggsVisual) eggsVisual.SetActive(carryingFrom != null);
    }

    // Back to the start after being caught: not knocked, not carrying.
    public void ResetState()
    {
        if (carryingFrom != null) carryingFrom.ReturnEggs();
        carryingFrom = null;
        knocked = false;
        knockTimer = 0;
        standTimer = 0;
        if (eggsVisual) eggsVisual.SetActive(false);
        if (animator) { animator.SetBool("Carry", false); animator.SetBool("Knocked", false); }
    }

    private void Escape()
    {
        Nest nest = carryingFrom;
        carryingFrom = null;
        if (eggsVisual) eggsVisual.SetActive(false);
        if (animator) animator.SetBool("Carry", false);
        if (nest && nest.Monster) nest.Monster.GiveUp();
        if (game) game.OnEscaped(this);
    }

    private void Update()
    {
        float dt = Time.deltaTime;
        if (knocked)
        {
            knockTimer -= dt;
            if (knockTimer <= 0)
            {
                knocked = false;
                standTimer = standUpTime;
                if (animator) animator.SetBool("Knocked", false);
            }
            return;
        }
        if (standTimer > 0) { standTimer -= dt; return; }
        if (carryingFrom != null)
        {
            surviveLeft -= dt;
            if (surviveLeft <= 0) Escape();
        }
    }
}
