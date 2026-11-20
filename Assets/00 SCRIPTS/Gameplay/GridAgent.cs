using System.Collections.Generic;
using UnityEngine;

// Moves a monster or bot along NavGrid paths (replaces NavMeshAgent). The owner sets Speed and the destination;
// the path is refreshed every repathInterval. The height follows the baked ground height; turns face the motion.
public class GridAgent : MonoBehaviour
{
    [SerializeField] private NavGrid grid;
    [SerializeField] private float repathInterval = 0.5f;
    [SerializeField] private float turnSpeed = 540f;
    [SerializeField] private float heightFollow = 12f;
    [Tooltip("Corner reached at this distance.")]
    [SerializeField] private float cornerTolerance = 0.3f;

    public float Speed = 3f;
    public float CurrentSpeed { get; private set; }
    public bool HasDestination { get { return hasDestination; } }
    public Vector3 Destination { get { return destination; } }
    public NavGrid Grid { get { return grid; } }

    private readonly List<Vector3> path = new List<Vector3>();
    private int index;
    private Vector3 destination;
    private bool hasDestination;
    private float repathTimer;

    private void Start()
    {
        repathTimer = Random.Range(0f, repathInterval);
    }

    public void SetDestination(Vector3 target, bool repathNow)
    {
        destination = target;
        hasDestination = true;
        if (repathNow || path.Count == 0) Repath();
    }

    public void Stop()
    {
        hasDestination = false;
        path.Clear();
        CurrentSpeed = 0;
    }

    // Close to the destination (horizontally).
    public bool Arrived(float tolerance)
    {
        Vector3 d = destination - transform.position; d.y = 0;
        return d.sqrMagnitude <= tolerance * tolerance;
    }

    public float RemainingDistance
    {
        get { Vector3 d = destination - transform.position; d.y = 0; return d.magnitude; }
    }

    private void Repath()
    {
        repathTimer = repathInterval;
        index = 0;
        if (grid == null || !grid.FindPath(transform.position, destination, path))
        {
            path.Clear();
            path.Add(destination);
        }
    }

    private void Update()
    {
        float dt = Time.deltaTime;
        if (dt <= 0) return;
        if (!hasDestination) { CurrentSpeed = 0; return; }
        repathTimer -= dt;
        if (repathTimer <= 0) Repath();

        Vector3 pos = transform.position;
        float stepLeft = Speed * dt;
        Vector3 moveDir = Vector3.zero;
        while (stepLeft > 0 && index < path.Count)
        {
            Vector3 corner = path[index];
            Vector3 d = corner - pos; d.y = 0;
            float dist = d.magnitude;
            if (dist <= cornerTolerance && index < path.Count - 1) { index++; continue; }
            if (dist < 0.0001f) { index++; continue; }
            float m = Mathf.Min(stepLeft, dist);
            moveDir = d / dist;
            pos += moveDir * m;
            stepLeft -= m;
            if (m >= dist) index++;
        }
        float moved = Speed * dt - stepLeft;
        CurrentSpeed = moved / dt;
        if (grid) pos.y = Mathf.Lerp(transform.position.y, grid.HeightAt(pos), Mathf.Clamp01(heightFollow * dt));
        transform.position = pos;
        if (moveDir.sqrMagnitude > 0.0001f)
            transform.rotation = Quaternion.RotateTowards(transform.rotation, Quaternion.LookRotation(moveDir, Vector3.up), turnSpeed * dt);
    }

    // Face a point (when standing).
    public void FaceTowards(Vector3 point, float dt)
    {
        Vector3 d = point - transform.position; d.y = 0;
        if (d.sqrMagnitude > 0.0001f)
            transform.rotation = Quaternion.RotateTowards(transform.rotation, Quaternion.LookRotation(d.normalized, Vector3.up), turnSpeed * dt);
    }
}
