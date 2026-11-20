using UnityEngine;

// Start tutorial of the Steal Egg scene, one step after the other:
// 1. hand swiping left/right on the screen + "Swipe to turn the camera" -> until the camera was turned
// 2. hand circling on the joystick + "Use the joystick to move"       -> until the player has moved
// 3. hand pressing the Jump button + "Tap to jump"                   -> until the player has jumped
// 4. then "Steal an egg" (GameController shows the title and the arrow line once Done is true).
// Turning / moving / jumping count at any time (a step already done is skipped).
// Also pulses the "Steal an egg" title and the "RUN!!" banner, and presses the hand on the Steal button.
// All objects are in the scene; this only shows/hides them and animates.
public class StealEggTutorial : MonoBehaviour
{
    [SerializeField] private PlayerMotor motor;
    [SerializeField] private ThirdPersonCamera cameraRig;
    [Tooltip("Once the game has ended (End Card shown) all hints are hidden.")]
    [SerializeField] private LunaController luna;

    [Header("Step 1: turn the camera")]
    [SerializeField] private GameObject cameraHint;
    [Tooltip("Hand under cameraHint: swipes left and right.")]
    [SerializeField] private RectTransform cameraHand;
    [SerializeField] private float swipeDistance = 160f;
    [SerializeField] private float swipeTime = 1.2f;
    [SerializeField] private GameObject cameraText;
    [Tooltip("Degrees of camera turn needed.")]
    [SerializeField] private float turnNeeded = 45f;

    [Header("Step 2: joystick")]
    [SerializeField] private GameObject moveHint;
    [Tooltip("Hand under moveHint: its fingertip circles at this radius (the joystick ring).")]
    [SerializeField] private RectTransform moveHand;
    [SerializeField] private float moveRadius = 70f;
    [SerializeField] private GameObject moveText;
    [Tooltip("Seconds of running needed to count as moved.")]
    [SerializeField] private float moveNeeded = 0.5f;

    [Header("Step 3: jump")]
    [SerializeField] private GameObject jumpText;
    [Tooltip("Hand pressing the Jump button (a Canvas object, raycast off); its fingertip goes to jumpHandTarget.")]
    [SerializeField] private RectTransform jumpHand;
    [SerializeField] private RectTransform jumpHandTarget;

    [Header("Pulses")]
    [SerializeField] private Transform title;
    [SerializeField] private Transform runBanner;
    [Tooltip("Hand pressing the Steal button: a separate Canvas object (not scaled by the button pulse); its fingertip follows stealHandTarget while the button shows.")]
    [SerializeField] private RectTransform stealHand;
    [SerializeField] private GameObject stealButton;
    [Tooltip("Point of the button the fingertip presses (the ring icon).")]
    [SerializeField] private RectTransform stealHandTarget;

    private float movedTime;
    private bool moved, turned, jumped;

    // All steps done: the "Steal an egg" part starts.
    public bool Done { get { return moved && turned && jumped; } }

    private void Start()
    {
        Refresh();
    }

    private void Update()
    {
        if (!moved && motor && motor.Speed > 0.1f) { movedTime += Time.deltaTime; if (movedTime >= moveNeeded) moved = true; }
        if (!turned && cameraRig && cameraRig.TurnedDegrees >= turnNeeded) turned = true;
        if (!jumped && motor && motor.JumpCount > 0) jumped = true;
        Refresh();
    }

    private void Refresh()
    {
        bool step1 = !turned, step2 = turned && !moved, step3 = turned && moved && !jumped;
        Show(cameraHint, step1); Show(cameraText, step1);
        Show(moveHint, step2); Show(moveText, step2);
        Show(jumpText, step3);
        if (jumpHand) Show(jumpHand.gameObject, step3);

        float t = Time.time;
        if (step1 && cameraHand)
        {
            float k = Mathf.SmoothStep(0f, 1f, Mathf.PingPong(t / Mathf.Max(0.1f, swipeTime) * 2f, 1f));
            cameraHand.anchoredPosition = new Vector2(Mathf.Lerp(-swipeDistance, swipeDistance, k), 0);
        }
        if (step2 && moveHand) moveHand.anchoredPosition = new Vector2(Mathf.Sin(t * 2.5f), Mathf.Cos(t * 2.5f)) * moveRadius;

        if (title && title.gameObject.activeInHierarchy) title.localScale = Vector3.one * (1.1f + 0.1f * Mathf.Sin(t * Mathf.PI * 2f));
        if (runBanner && runBanner.gameObject.activeInHierarchy) runBanner.localScale = Vector3.one * (1f + 0.06f * Mathf.Sin(t * 10f));
    }

    // After GameController.Update has placed the button this frame.
    private void LateUpdate()
    {
        float t = Time.time;
        UpdateJumpHand(t);
        if (stealHand)
        {
            bool show = stealButton && stealButton.activeInHierarchy;
            Show(stealHand.gameObject, show);
            if (show && stealHandTarget)
            {
                // Press: the hand moves in onto the ring, stays, and comes back (position only, no scale)
                float p = Mathf.Repeat(t, 1.2f);
                float down = p < 0.2f ? p / 0.2f : p < 0.9f ? 1f : p < 1.1f ? 1f - (p - 0.9f) / 0.2f : 0f;
                stealHand.position = stealHandTarget.position;
                stealHand.anchoredPosition += new Vector2(18f, -22f) * (1f - down);
            }
        }
    }

    // Jump hand: placed after the layout, presses the button (in and out).
    private void UpdateJumpHand(float t)
    {
        if (jumpHand == null || jumpHandTarget == null || !jumpHand.gameObject.activeSelf) return;
        float p = Mathf.Repeat(t, 1f);
        float down = p < 0.15f ? p / 0.15f : p < 0.45f ? 1f : p < 0.6f ? 1f - (p - 0.45f) / 0.15f : 0f;
        jumpHand.position = jumpHandTarget.position;
        jumpHand.anchoredPosition += new Vector2(22f, -26f) * (1f - down);
    }

    private static void Show(GameObject go, bool on)
    {
        if (go && go.activeSelf != on) go.SetActive(on);
    }
}
