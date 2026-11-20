using UnityEngine;

// Nest guardian (source Chicken): idles and wanders around its nest; when its eggs are stolen it shows the "!"
// and chases the thief. Catching the thief knocks them down and the eggs go back; then it walks home.
// When the thief survives the run timer, it gives up and walks home.
public class Monster : MonoBehaviour
{
    private enum State { Idle, Wander, Chase, Return }

    [SerializeField] private GridAgent agent;
    [SerializeField] private Animator animator;
    [SerializeField] private Nest nest;
    [SerializeField] private GameObject exclamation;
    [SerializeField] private AudioSource audioSource;
    [SerializeField] private AudioClip[] angryClips;
    [Tooltip("Source RandomAudioPlayer: one of these every minDelay..maxDelay seconds.")]
    [SerializeField] private AudioClip[] ambientClips;
    [Tooltip("Pause between two ambient sounds (counted from the END of the previous one).")]
    [SerializeField] private float minSoundDelay = 1.5f;
    [SerializeField] private float maxSoundDelay = 1.5f;
    [SerializeField, Range(0, 1)] private float ambientVolume = 0.5f;
    [Tooltip("Ambient sounds only when the player is this close (2D audio in Luna).")]
    [SerializeField] private Transform listener;
    [SerializeField] private float hearDistance = 25f;
    [Tooltip("Source StartAgry: the monster shows the \"!\" and waits this long before it starts chasing.")]
    [SerializeField] private float angerDelay = 1f;

    [Header("Source Chicken values")]
    [SerializeField] private float minIdleTime = 2;
    [SerializeField] private float maxIdleTime = 5;
    [SerializeField] private float minWalkTime = 3;
    [SerializeField] private float maxWalkTime = 7;
    [SerializeField] private float wanderRadius = 5;
    [SerializeField] private float walkSpeed = 2f;
    [Tooltip("Source defaultSpeed 6 x (1 + speedMultiply 0.2).")]
    [SerializeField] private float chaseSpeed = 7.2f;
    [SerializeField] private float returnSpeed = 4f;
    [SerializeField] private float catchDistance = 1.4f;
    [Tooltip("Home = within this distance of the nest (eggs can only be stolen then).")]
    [SerializeField] private float homeRadius = 7f;

    private State state = State.Idle;
    private float timer;
    private float soundTimer;
    // PlayOneShot does not show in AudioSource.isPlaying: the end of the last ambient sound is tracked here.
    private float ambientEndTime;
    private float angerTimer;
    private Thief target;

    public bool IsHome
    {
        get
        {
            if (state == State.Chase || state == State.Return) return false;
            Vector3 d = transform.position - nest.Position; d.y = 0;
            return d.magnitude <= homeRadius;
        }
    }

    public bool IsChasing { get { return state == State.Chase; } }
    public Thief Target { get { return target; } }
    public float ChaseSpeed { get { return chaseSpeed; } set { chaseSpeed = value; } }
    public float ReturnSpeed { get { return returnSpeed; } set { returnSpeed = value; } }

    // Spooky choice (Luna TypeSpooky): the active model's Animator.
    public void SetAnimator(Animator newAnimator) { animator = newAnimator; }

    // Round restart (Steal Egg flow): straight back at the nest, calm.
    public void ResetToNest([Bridge.Ref] Vector3 position, [Bridge.Ref] Quaternion rotation)
    {
        target = null;
        agent.Stop();
        transform.position = position;
        transform.rotation = rotation;
        state = State.Idle;
        timer = Random.Range(minIdleTime, maxIdleTime);
        if (exclamation) exclamation.SetActive(false);
    }

    private void Start()
    {
        if (exclamation) exclamation.SetActive(false);
        timer = Random.Range(minIdleTime, maxIdleTime);
        soundTimer = Random.Range(minSoundDelay, maxSoundDelay);
    }

    public void StartChase(Thief thief)
    {
        target = thief;
        state = State.Chase;
        angerTimer = angerDelay;
        agent.Stop();
        if (exclamation) exclamation.SetActive(true);
        bool near = listener == null || (listener.position - transform.position).sqrMagnitude <= hearDistance * hearDistance;
        if (near && audioSource && angryClips != null && angryClips.Length > 0) audioSource.PlayOneShot(angryClips[Random.Range(0, angryClips.Length)]);
    }

    public void GiveUp()
    {
        target = null;
        GoHome();
    }

    private void GoHome()
    {
        state = State.Return;
        agent.Speed = returnSpeed;
        agent.SetDestination(nest.Position, true);
    }

    private void Update()
    {
        float dt = Time.deltaTime;
        switch (state)
        {
            case State.Chase:
                if (target == null || target.CarryingFrom != nest) { GiveUp(); break; }
                if (angerTimer > 0)
                {
                    angerTimer -= dt;
                    agent.FaceTowards(target.transform.position, dt);
                    if (angerTimer > 0) break;
                    agent.Speed = chaseSpeed;
                    agent.SetDestination(target.transform.position, true);
                }
                agent.SetDestination(target.transform.position, false);
                Vector3 d = target.transform.position - transform.position; d.y = 0;
                if (d.magnitude <= catchDistance)
                {
                    Thief caught = target;
                    target = null;
                    caught.Caught();
                    GoHome();
                }
                break;
            case State.Return:
                if (agent.Arrived(0.6f))
                {
                    agent.Stop();
                    state = State.Idle;
                    timer = Random.Range(minIdleTime, maxIdleTime);
                    if (exclamation) exclamation.SetActive(false);
                    nest.OnMonsterHome();
                }
                break;
            case State.Idle:
                timer -= dt;
                if (timer <= 0)
                {
                    state = State.Wander;
                    timer = Random.Range(minWalkTime, maxWalkTime);
                    agent.Speed = walkSpeed;
                    agent.SetDestination(agent.Grid ? agent.Grid.RandomPointNear(nest.Position, wanderRadius) : nest.Position, true);
                }
                break;
            case State.Wander:
                timer -= dt;
                if (agent.Arrived(0.4f) && timer > 0)
                    agent.SetDestination(agent.Grid ? agent.Grid.RandomPointNear(nest.Position, wanderRadius) : nest.Position, true);
                if (timer <= 0)
                {
                    agent.Stop();
                    state = State.Idle;
                    timer = Random.Range(minIdleTime, maxIdleTime);
                }
                break;
        }
        if (animator) animator.SetFloat("Speed", agent.CurrentSpeed);

        // Ambient calls: one at a time (also while chasing)
        if (Time.time < ambientEndTime) return;
        soundTimer -= dt;
        if (soundTimer <= 0)
        {
            soundTimer = Random.Range(minSoundDelay, maxSoundDelay);
            bool near = listener == null || (listener.position - transform.position).sqrMagnitude <= hearDistance * hearDistance;
            if (near && audioSource && ambientClips != null && ambientClips.Length > 0)
            {
                AudioClip clip = ambientClips[Random.Range(0, ambientClips.Length)];
                if (clip)
                {
                    audioSource.PlayOneShot(clip, ambientVolume);
                    ambientEndTime = Time.time + clip.length;
                }
            }
        }
    }
}
