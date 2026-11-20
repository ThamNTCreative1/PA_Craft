using UnityEngine;

// Bot player (source NPC_Chicken on the NPC players): wanders, rests now and then, goes for a free nest and steals
// the eggs, then runs away from the monster until the run timer is over. Knocked down when caught, like the player.
public class BotController : MonoBehaviour
{
    private enum State { Wander, Rest, GoToNest }

    [SerializeField] private GridAgent agent;
    [SerializeField] private Thief thief;
    [SerializeField] private Animator animator;
    [SerializeField] private Nest[] nests;

    [Header("Source NPC_Chicken values")]
    [SerializeField] private float minSpeed = 6f;
    [SerializeField] private float maxSpeed = 7.5f;
    [SerializeField] private float runAwayDistance = 50f;
    [SerializeField] private float runAwayUpdateInterval = 1f;
    [SerializeField] private float nestApproachDistance = 1.2f;
    [SerializeField] private float minRestTime = 2f;
    [SerializeField] private float maxRestTime = 5f;
    [SerializeField] private float minWanderBeforeNest = 5f;
    [SerializeField] private float maxWanderBeforeNest = 15f;
    [SerializeField] private float wanderRadius = 25f;
    [Tooltip("Chance per wander point to rest instead of going on.")]
    [SerializeField] private float restProbability = 0.25f;
    [Tooltip("Run animation speed at the bot's run speed.")]
    [SerializeField] private float runAnimSpeed = 1.1f;

    private State state = State.Wander;
    private float timer;
    private float runAwayTimer;
    private Nest targetNest;
    private float speed;

    private void Start()
    {
        speed = Random.Range(minSpeed, maxSpeed);
        agent.Speed = speed;
        timer = Random.Range(minWanderBeforeNest, maxWanderBeforeNest);
        PickWanderPoint();
    }

    private void PickWanderPoint()
    {
        if (agent.Grid) agent.SetDestination(agent.Grid.RandomPointNear(transform.position, wanderRadius), true);
    }

    private void Release()
    {
        if (targetNest && targetNest.reservedBy == thief) targetNest.reservedBy = null;
        targetNest = null;
    }

    private Nest FindFreeNest()
    {
        Nest best = null;
        float bestScore = float.MaxValue;
        for (int i = 0; i < nests.Length; i++)
        {
            Nest n = nests[i];
            if (n == null || !n.CanSteal || n.reservedBy != null) continue;
            float score = (n.Position - transform.position).sqrMagnitude * Random.Range(0.6f, 1.4f);
            if (score < bestScore) { bestScore = score; best = n; }
        }
        return best;
    }

    private void Update()
    {
        float dt = Time.deltaTime;
        if (!thief.CanMove)
        {
            agent.Stop();
            Release();
            state = State.Wander;
            timer = Random.Range(minWanderBeforeNest, maxWanderBeforeNest);
            Animate();
            return;
        }

        if (thief.IsCarrying)
        {
            // Run away from the chasing monster
            agent.Speed = speed;
            runAwayTimer -= dt;
            if (runAwayTimer <= 0 || agent.Arrived(1f))
            {
                runAwayTimer = runAwayUpdateInterval;
                Monster m = thief.CarryingFrom.Monster;
                Vector3 away = transform.position - (m ? m.transform.position : thief.CarryingFrom.Position);
                away.y = 0;
                if (away.sqrMagnitude < 0.01f) away = transform.forward;
                Vector3 goal = transform.position + away.normalized * runAwayDistance;
                if (agent.Grid && !agent.Grid.IsWalkable(goal)) goal = agent.Grid.RandomPointNear(transform.position + away.normalized * runAwayDistance * 0.5f, runAwayDistance * 0.5f);
                agent.SetDestination(goal, true);
            }
            Animate();
            return;
        }

        switch (state)
        {
            case State.Wander:
                agent.Speed = speed * 0.6f;
                timer -= dt;
                if (agent.Arrived(1f) || !agent.HasDestination)
                {
                    if (Random.value < restProbability) { state = State.Rest; agent.Stop(); runAwayTimer = Random.Range(minRestTime, maxRestTime); }
                    else PickWanderPoint();
                }
                if (timer <= 0)
                {
                    Nest n = FindFreeNest();
                    if (n != null)
                    {
                        targetNest = n;
                        n.reservedBy = thief;
                        state = State.GoToNest;
                        agent.Speed = speed;
                        agent.SetDestination(n.Position, true);
                    }
                    else timer = 3f;
                }
                break;
            case State.Rest:
                runAwayTimer -= dt;
                if (runAwayTimer <= 0) { state = State.Wander; PickWanderPoint(); }
                break;
            case State.GoToNest:
                if (targetNest == null || !targetNest.CanSteal)
                {
                    Release();
                    state = State.Wander;
                    timer = Random.Range(minWanderBeforeNest, maxWanderBeforeNest);
                    PickWanderPoint();
                    break;
                }
                agent.Speed = speed;
                agent.SetDestination(targetNest.Position, false);
                if (agent.Arrived(nestApproachDistance))
                {
                    Nest n = targetNest;
                    Release();
                    agent.Stop();
                    thief.Steal(n);
                    state = State.Wander;
                    timer = Random.Range(minWanderBeforeNest, maxWanderBeforeNest);
                }
                break;
        }
        Animate();
    }

    private void Animate()
    {
        if (animator == null) return;
        float s = agent.CurrentSpeed;
        animator.SetFloat("Speed", s > 0.2f ? 1f : 0f);
        animator.SetFloat("RunAnimSpeed", Mathf.Clamp(s / Mathf.Max(0.1f, speed), 0.5f, 1.2f) * runAnimSpeed);
        animator.SetBool("Grounded", true);
    }
}
