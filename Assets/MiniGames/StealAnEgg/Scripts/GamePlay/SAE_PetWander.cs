using UnityEngine;

namespace Minigames.StealAnEgg.GamePlay
{
    /// <summary>
    /// Kinematic version of SAE_MonsterMoveInCoopRandomly + SAE_MonsterMovement: the pet roams to random points
    /// inside an area, snaps to the ground and drives the idle/walk blend. Adds small hops for liveliness.
    /// </summary>
    public class SAE_PetWander : MonoBehaviour
    {
        [SerializeField] private float moveSpeed = 2.5f;
        [SerializeField] private float acceleration = 4f;
        [SerializeField] private float stopDistance = 0.3f;
        [SerializeField] private float rotateSpeed = 8f;
        [SerializeField] private Vector2 idleTimeRange = new Vector2(0.5f, 2f);

        [Header("Hop")]
        [SerializeField, Range(0f, 1f)] private float hopChance = 0.35f;
        [SerializeField] private float hopHeight = 0.6f;
        [SerializeField] private float hopDuration = 0.35f;

        private static readonly RaycastHit[] GroundHits = new RaycastHit[8];

        private SAE_MonsterAnimator animator;
        private Bounds area;
        private float speed;
        private float idleTimer;
        private float hopTimer;
        private int hopsLeft;
        private float groundY;
        private Vector3 destination;
        private bool moving;
        private Transform anchor;
        private float anchorRadius;

        /// <summary>area: world bounds to roam in (only XZ is used). size: pet scale; distances grow with it,
        /// speed with its square root so a big pet strides further without zipping around.</summary>
        public void SetValue(Bounds area, float startDelay = 1f, int startHops = 2, float size = 1f)
        {
            this.area = area;
            idleTimer = startDelay;
            hopsLeft = startHops;
            if (size > 0f && !Mathf.Approximately(size, 1f))
            {
                float speedScale = Mathf.Sqrt(size);
                moveSpeed *= speedScale;
                acceleration *= speedScale;
                stopDistance *= size;
            }
        }

        /// <summary>No hops at all: the pet only walks on the ground.</summary>
        public void DisableHops()
        {
            hopChance = 0f;
            hopsLeft = 0;
            hopTimer = 0f;
        }

        /// <summary>Roam within radius of the anchor (e.g. the player) instead of a fixed area; follows it as it moves.</summary>
        public void SetAnchor(Transform anchor, float radius)
        {
            this.anchor = anchor;
            anchorRadius = Mathf.Max(0.1f, radius);
        }

        private void Start()
        {
            animator = GetComponentInChildren<SAE_MonsterAnimator>();
            groundY = transform.position.y;
            if (area.size == Vector3.zero) area = new Bounds(transform.position, new Vector3(6f, 0f, 6f));
        }

        private void Update()
        {
            float dt = Time.deltaTime;
            UpdateHop(dt);

            if (!moving)
            {
                speed = Mathf.MoveTowards(speed, 0f, acceleration * dt);
                idleTimer -= dt;
                if (idleTimer <= 0f || TooFarFromAnchor()) PickDestination();
            }
            else
            {
                Vector3 offset = destination - transform.position;
                offset.y = 0f;
                float distance = offset.magnitude;
                if (distance <= stopDistance)
                {
                    moving = false;
                    idleTimer = Random.Range(idleTimeRange.x, idleTimeRange.y);
                    if (Random.value < hopChance) hopsLeft++;
                }
                else
                {
                    // Ease out near the target, like SAE_MonsterMovement.
                    float targetSpeed = moveSpeed * Mathf.Clamp01(distance / (stopDistance * 4f + 0.01f));
                    speed = Mathf.MoveTowards(speed, Mathf.Max(targetSpeed, moveSpeed * 0.3f), acceleration * dt);
                    Vector3 direction = offset / distance;
                    transform.position += direction * (speed * dt);
                    transform.rotation = Quaternion.Slerp(transform.rotation, Quaternion.LookRotation(direction),
                        rotateSpeed * dt);
                }
            }

            SnapToGround();
            if (animator != null) animator.UpdateAnimation(speed / moveSpeed);
        }

        private void PickDestination()
        {
            if (anchor != null)
            {
                Vector2 offset = Random.insideUnitCircle * anchorRadius;
                Vector3 center = anchor.position;
                destination = new Vector3(center.x + offset.x, transform.position.y, center.z + offset.y);
            }
            else
            {
                Vector3 min = area.min, max = area.max;
                destination = new Vector3(Random.Range(min.x, max.x), transform.position.y, Random.Range(min.z, max.z));
            }
            moving = true;
        }

        private bool TooFarFromAnchor()
        {
            if (anchor == null) return false;
            Vector3 offset = transform.position - anchor.position;
            offset.y = 0f;
            return offset.sqrMagnitude > anchorRadius * anchorRadius;
        }

        private void UpdateHop(float dt)
        {
            if (hopTimer <= 0f)
            {
                if (hopsLeft <= 0) return;
                hopsLeft--;
                hopTimer = hopDuration;
            }

            hopTimer = Mathf.Max(0f, hopTimer - dt);
        }

        private void SnapToGround()
        {
            Vector3 position = transform.position;
            int count = Physics.RaycastNonAlloc(new Vector3(position.x, groundY + 3f, position.z), Vector3.down,
                GroundHits, 10f, ~0, QueryTriggerInteraction.Ignore);
            float best = float.MaxValue;
            for (int i = 0; i < count; i++)
            {
                // Skip self and moving bodies (player, monsters); ground is static.
                if (GroundHits[i].collider.transform.IsChildOf(transform) ||
                    GroundHits[i].collider.attachedRigidbody != null) continue;
                if (GroundHits[i].distance < best)
                {
                    best = GroundHits[i].distance;
                    groundY = GroundHits[i].point.y;
                }
            }

            float hop = hopTimer > 0f ? Mathf.Sin((1f - hopTimer / hopDuration) * Mathf.PI) * hopHeight : 0f;
            position.y = groundY + hop;
            transform.position = position;
        }
    }
}
