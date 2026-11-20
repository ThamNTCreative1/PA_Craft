using UnityEngine;

// Arrow line from the player to a target: a straight line updated every frame (as the ref TutorialLineIndicator).
// With drawFromTarget the line runs target -> player, so the tiled texture is anchored at the target and the
// chevrons stay still on the ground while the player runs (the material flips the texture so they still point
// towards the target).
public class GuideLine : MonoBehaviour
{
    [SerializeField] private LineRenderer line;
    [SerializeField] private Transform from;
    [SerializeField] private float heightOffset = 0.15f;
    [Tooltip("Hide the line when the player is this close to the target.")]
    [SerializeField] private float hideDistance = 2f;
    [Tooltip("Draw target -> player (texture anchored at the target: arrows don't slide).")]
    [SerializeField] private bool drawFromTarget = false;

    private Transform target;
    private readonly Vector3[] points = new Vector3[2];

    public void SetTarget(Transform newTarget)
    {
        target = newTarget;
        if (line) line.enabled = target != null;
    }

    private void LateUpdate()
    {
        if (line == null) return;
        if (target == null || from == null) { if (line.enabled) line.enabled = false; return; }

        Vector3 start = from.position;
        Vector3 end = target.position;
        // The target pivot can be above the ground: keep the line at the player's feet height.
        end.y = start.y;
        Vector3 d = end - start;
        bool show = d.magnitude > hideDistance;
        if (line.enabled != show) line.enabled = show;
        if (!show) return;

        Vector3 up = Vector3.up * heightOffset;
        points[drawFromTarget ? 1 : 0] = start + up;
        points[drawFromTarget ? 0 : 1] = end + up;
        line.positionCount = 2;
        line.SetPositions(points);
    }
}
