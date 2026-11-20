using UnityEngine;

// Player movement (source PlayerController + PlayerMovement, which used a CharacterController and Cinemachine).
// Camera-relative run with the joystick (or WASD / arrows), jump with the Jump button (or Space).
// Same workarounds as the Luna-tested FMCharacter (BAH): grounded from the actual vertical motion (Luna's
// CollisionFlags / isGrounded are unreliable), walls clipped with rays, manual step-up (Luna ignores stepOffset).
public class PlayerMotor : MonoBehaviour
{
    [SerializeField] private CharacterController controller;
    [SerializeField] private Animator animator;
    [SerializeField] private Thief thief;
    [SerializeField] private Transform cameraTransform;
    [SerializeField] private PlayableJoystick joystick;
    [SerializeField] private AudioSource audioSource;
    [SerializeField] private AudioClip jumpClip;

    [Header("Footsteps")]
    [Tooltip("One of these (random, not the same twice) per step while running on the ground.")]
    [SerializeField] private AudioClip[] footstepClips;
    [Tooltip("Seconds between steps at full run speed (slower running = longer).")]
    [SerializeField] private float footstepInterval = 0.2f;
    [SerializeField, Range(0, 1)] private float footstepVolume = 0.6f;
    [Tooltip("Random pitch +- this per step.")]
    [SerializeField] private float footstepPitchJitter = 0.08f;
    [Tooltip("Separate source for the steps (its pitch is varied), so the jump sound keeps its pitch.")]
    [SerializeField] private AudioSource footstepSource;

    [Header("Movement")]
    [SerializeField] private float runSpeed = 8f;
    [Tooltip("Degrees per second the run direction swings round to the input direction.")]
    [SerializeField] private float rotationRate = 900f;
    [SerializeField] private float jumpImpulse = 13f;
    [Tooltip("Source WorldCharacteristic.WORLD_GRAVITY.")]
    [SerializeField] private float gravity = 39.24f;
    [Tooltip("Run animation speed at full run speed (Running clip played faster/slower).")]
    [SerializeField] private float runAnimSpeed = 1.2f;
    [Tooltip("Highest step climbed when walking (Luna ignores CharacterController.stepOffset).")]
    [SerializeField] private float stepHeight = 0.5f;
    [Tooltip("Hits with a normal steeper than this (normal.y below it) count as walls.")]
    [SerializeField] private float wallNormalY = 0.7f;
    [Tooltip("Below this height the player is put back at the respawn point (source TriggerDeath + TeleportToSpawn).")]
    [SerializeField] private float killHeight = -10f;
    [SerializeField] private Transform respawnPoint;

    private readonly float[] wallHeights = new float[3];
    private float footstepTimer;
    private int lastFootstep = -1;
    private Vector3 horizontalVelocity;
    private Vector3 runDirection;
    private float verticalSpeed;
    private bool grounded = true;
    private bool jumpQueued;

    public float Speed { get { return horizontalVelocity.magnitude; } }
    public bool IsGrounded { get { return grounded; } }
    public float RunSpeed { get { return runSpeed; } set { runSpeed = value; } }
    public float JumpImpulse { get { return jumpImpulse; } set { jumpImpulse = value; } }
    // Run clip playback speed at full run speed (raise it with the run speed so the feet don't slide).
    public float RunAnimSpeed { get { return runAnimSpeed; } set { runAnimSpeed = value; } }
    // Character choice (Luna TypePlayer): the active model's Animator.
    public void SetAnimator(Animator newAnimator) { animator = newAnimator; }
    // Stop running at once (end of the round).
    public bool Frozen;

    private bool InputEnabled { get { return !Frozen && (thief == null || thief.CanMove); } }

    public void Jump() { if (InputEnabled) jumpQueued = true; }

    // Jumps actually made (tutorial).
    public int JumpCount { get; private set; }

    // Scripted walk (cut scenes): goes to the point at 'speed' m/s, ignoring the input (also while Frozen).
    private bool autoMove;
    private Vector3 autoTarget;
    private float autoSpeed;
    public bool AutoMoving { get { return autoMove; } }

    public void WalkTo(Vector3 point, float speed)
    {
        autoTarget = point;
        autoSpeed = speed;
        autoMove = true;
    }

    public void StopWalk()
    {
        autoMove = false;
    }

    public void Teleport(Vector3 position, Quaternion rotation)
    {
        controller.enabled = false;
        transform.position = position;
        transform.rotation = rotation;
        controller.enabled = true;
        verticalSpeed = 0;
        horizontalVelocity = Vector3.zero;
        runDirection = Vector3.zero;
    }

    private Vector2 ReadMoveInput()
    {
        if (!InputEnabled) return Vector2.zero;
        Vector2 value = joystick ? joystick.Value : Vector2.zero;
        if (value.sqrMagnitude < 0.0001f)
        {
            float h = 0, v = 0;
            if (Input.GetKey(KeyCode.A) || Input.GetKey(KeyCode.LeftArrow)) h -= 1;
            if (Input.GetKey(KeyCode.D) || Input.GetKey(KeyCode.RightArrow)) h += 1;
            if (Input.GetKey(KeyCode.S) || Input.GetKey(KeyCode.DownArrow)) v -= 1;
            if (Input.GetKey(KeyCode.W) || Input.GetKey(KeyCode.UpArrow)) v += 1;
            value = Vector2.ClampMagnitude(new Vector2(h, v), 1);
        }
        return value;
    }

    private void Update()
    {
        float dt = Time.deltaTime;
        if (dt <= 0) return;
        if (InputEnabled && Input.GetKeyDown(KeyCode.Space)) jumpQueued = true;
        if (!InputEnabled && joystick) joystick.ResetInput();

        // Camera-relative input on the ground plane
        Vector2 input = ReadMoveInput();
        Vector3 forward = Vector3.forward;
        if (cameraTransform)
        {
            forward = Vector3.ProjectOnPlane(cameraTransform.forward, Vector3.up);
            if (forward.sqrMagnitude < 0.0001f) forward = Vector3.ProjectOnPlane(cameraTransform.up, Vector3.up);
        }
        forward.Normalize();
        Vector3 right = Vector3.Cross(Vector3.up, forward);
        Vector3 moveDirection = Vector3.ClampMagnitude(forward * input.y + right * input.x, 1);
        float autoLeft = -1;
        if (autoMove)
        {
            Vector3 to = Flat(autoTarget - transform.position);
            autoLeft = to.magnitude;
            if (autoLeft < 0.1f) { autoMove = false; moveDirection = Vector3.zero; autoLeft = -1; }
            else moveDirection = to / autoLeft * Mathf.Clamp01(autoSpeed / Mathf.Max(0.01f, runSpeed));
        }

        if (moveDirection.sqrMagnitude > 0.0001f)
        {
            Vector3 target = moveDirection.normalized;
            if (runDirection.sqrMagnitude < 0.0001f) runDirection = transform.forward;
            runDirection = Vector3.ProjectOnPlane(runDirection, Vector3.up);
            if (runDirection.sqrMagnitude < 0.0001f) runDirection = target;
            runDirection.Normalize();
            float angle = Vector3.SignedAngle(runDirection, target, Vector3.up);
            if (Mathf.Abs(angle) > 179.5f) angle = 180f;
            float turn = Mathf.Clamp(angle, -rotationRate * dt, rotationRate * dt);
            runDirection = (Quaternion.AngleAxis(turn, Vector3.up) * runDirection).normalized;
            horizontalVelocity = runDirection * (moveDirection.magnitude * runSpeed);
            // Scripted walk: don't step past the point
            if (autoLeft > 0 && horizontalVelocity.magnitude * dt > autoLeft) horizontalVelocity = horizontalVelocity.normalized * (autoLeft / dt);
        }
        else
        {
            runDirection = Vector3.zero;
            horizontalVelocity = Vector3.zero;
        }

        // Jump and gravity
        if (grounded && verticalSpeed < 0) verticalSpeed = -2f;
        if (jumpQueued && grounded)
        {
            verticalSpeed = jumpImpulse;
            JumpCount++;
            grounded = false;
            if (audioSource && jumpClip) audioSource.PlayOneShot(jumpClip);
        }
        jumpQueued = false;
        verticalSpeed -= gravity * dt;

        bool wasGrounded = grounded;
        Vector3 start = transform.position;
        Vector3 step = ClipByWalls(horizontalVelocity * dt);
        float expected = verticalSpeed * dt;
        controller.Move(step + Vector3.up * expected);
        float moved = transform.position.y - start.y;
        grounded = controller.isGrounded || (verticalSpeed <= 0 && moved > expected * 0.5f);
        if (verticalSpeed > 0 && moved < expected * 0.5f) verticalSpeed = 0;
        if (wasGrounded && verticalSpeed <= 0 && step.sqrMagnitude > 1e-6f && Flat(transform.position - start).magnitude < step.magnitude * 0.5f)
            if (StepUp(step)) grounded = true;

        if (transform.position.y < killHeight && respawnPoint) Teleport(respawnPoint.position, respawnPoint.rotation);

        // Face the run direction
        Vector3 face = runDirection.sqrMagnitude > 0.0001f ? runDirection : transform.forward;
        face = Vector3.ProjectOnPlane(face, Vector3.up);
        if (face.sqrMagnitude > 0.0001f) transform.rotation = Quaternion.LookRotation(face.normalized, Vector3.up);

        UpdateFootsteps(dt);

        if (animator)
        {
            float s = runSpeed > 0 ? Mathf.Clamp01(Speed / runSpeed) : 0;
            animator.SetFloat("Speed", s);
            animator.SetFloat("RunAnimSpeed", Mathf.Max(0.5f, s) * runAnimSpeed);
            animator.SetBool("Grounded", grounded);
            animator.SetFloat("VelY", verticalSpeed);
        }
    }

    private static Vector3 Flat(Vector3 v) { v.y = 0; return v; }

    // A step sound every footstepInterval (scaled by the speed) while running on the ground.
    private void UpdateFootsteps(float dt)
    {
        if (footstepSource == null || footstepClips == null || footstepClips.Length == 0) return;
        // footstepTimer = seconds since the last step; the step interval follows the CURRENT speed every frame
        // (a slow start must not hold back the steps once running).
        if (!grounded || Speed < 0.5f) { footstepTimer = 1e3f; return; }
        footstepTimer += dt;
        float k = runSpeed > 0 ? Mathf.Clamp(Speed / runSpeed, 0.3f, 1f) : 1f;
        if (footstepTimer < footstepInterval / k) return;
        footstepTimer = 0;
        int i = Random.Range(0, footstepClips.Length);
        if (i == lastFootstep && footstepClips.Length > 1) i = (i + 1) % footstepClips.Length;
        lastFootstep = i;
        footstepSource.pitch = 1f + Random.Range(-footstepPitchJitter, footstepPitchJitter);
        if (footstepClips[i]) footstepSource.PlayOneShot(footstepClips[i], footstepVolume);
    }

    // Rays along the horizontal move at ankle, waist and head height: a steep face closer than the capsule radius
    // + the step takes the part of the step that goes into it away, so the character slides along it.
    private Vector3 ClipByWalls(Vector3 step)
    {
        Vector3 flat = Flat(step);
        if (flat.sqrMagnitude < 1e-8f || controller == null) return step;
        float radius = controller.radius;
        Vector3 feet = transform.position + controller.center - Vector3.up * (controller.height * 0.5f);
        wallHeights[0] = stepHeight + 0.15f;
        wallHeights[1] = controller.height * 0.5f;
        wallHeights[2] = controller.height - 0.3f;
        for (int pass = 0; pass < 2; pass++)
        {
            float len = flat.magnitude;
            if (len < 1e-5f) break;
            Vector3 dir = flat / len;
            float nearest = float.MaxValue;
            Vector3 normal = Vector3.zero;
            for (int h = 0; h < wallHeights.Length; h++)
            {
                RaycastHit[] hits = Physics.RaycastAll(feet + Vector3.up * wallHeights[h], dir, radius + len + 0.1f);
                for (int i = 0; i < hits.Length; i++)
                {
                    Collider c = hits[i].collider;
                    if (c == null || c.isTrigger || c.transform.IsChildOf(transform)) continue;
                    if (hits[i].normal.y > wallNormalY) continue;
                    if (hits[i].distance < nearest) { nearest = hits[i].distance; normal = hits[i].normal; }
                }
            }
            if (nearest == float.MaxValue) break;
            Vector3 n = Flat(normal);
            n = n.sqrMagnitude > 1e-6f ? n.normalized : -dir;
            float free = Mathf.Max(0f, nearest - radius - 0.02f);
            Vector3 toWall = dir * Mathf.Min(len, free);
            Vector3 rest = flat - toWall;
            float into = Vector3.Dot(rest, n);
            if (into < 0) rest -= n * into;
            flat = toWall + rest;
        }
        return new Vector3(flat.x, step.y, flat.z);
    }

    // Up by at most stepHeight, across, back down onto the step; reverted when it got no further or hangs in the air.
    private bool StepUp(Vector3 step)
    {
        Vector3 before = transform.position;
        controller.Move(Vector3.up * stepHeight);
        float rose = transform.position.y - before.y;
        if (rose > 0.01f)
        {
            Vector3 mid = transform.position;
            controller.Move(step);
            float across = Flat(transform.position - mid).magnitude;
            Vector3 top = transform.position;
            controller.Move(Vector3.down * (rose + 0.05f));
            bool landed = transform.position.y > top.y - rose - 0.04f;
            if (across > step.magnitude * 0.5f && landed) return true;
        }
        controller.enabled = false;
        transform.position = before;
        controller.enabled = true;
        return false;
    }
}
