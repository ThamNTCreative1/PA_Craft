using UnityEngine;

// Start tutorial, one hint after the other (as in the Steal Egg playable TE_V06):
// 1. hand circling on the joystick + "Use the joystick to move"   -> until the player has moved
// 2. hand swiping on the screen   + "Swipe to turn the camera"    -> until the camera was turned
// 3. "Go to the eggs!" pulsing (the red arrow line leads there)   -> until the first eggs are stolen
// The hand on the Steal button presses while the button shows, until the first steal.
// The texts and hands are scene objects; this only shows/hides them and animates the hands.
public class TutorialHints : MonoBehaviour
{
    [SerializeField] private PlayerMotor motor;
    [SerializeField] private ThirdPersonCamera cameraRig;
    [SerializeField] private Thief player;

    [Header("Step 1: move")]
    [SerializeField] private GameObject moveHint;
    [Tooltip("Hand image under moveHint; its fingertip circles at this radius (the joystick ring).")]
    [SerializeField] private RectTransform moveHand;
    [SerializeField] private float moveRadius = 70f;
    [SerializeField] private GameObject moveText;
    [Tooltip("Seconds of running needed to count as moved.")]
    [SerializeField] private float moveNeeded = 0.5f;

    [Header("Step 2: turn the camera")]
    [SerializeField] private GameObject cameraHint;
    [SerializeField] private RectTransform cameraHand;
    [SerializeField] private float swipeDistance = 160f;
    [SerializeField] private GameObject cameraText;
    [Tooltip("Degrees of camera turn needed.")]
    [SerializeField] private float turnNeeded = 45f;

    [Header("Step 3: go to the eggs")]
    [SerializeField] private GameObject goText;

    [Header("Steal button")]
    [Tooltip("The hand on the Steal the eggs button (NestSelector/Icon/MobileInput).")]
    [SerializeField] private RectTransform holdHand;

    private float movedTime;
    private bool moved, turned, stole;
    private Vector2 holdHandStart;

    private void Start()
    {
        if (holdHand) holdHandStart = holdHand.anchoredPosition;
        Refresh();
    }

    private void Update()
    {
        if (!moved && motor && motor.Speed > 0.1f) { movedTime += Time.deltaTime; if (movedTime >= moveNeeded) moved = true; }
        if (moved && !turned && cameraRig && cameraRig.TurnedDegrees >= turnNeeded) turned = true;
        if (!stole && player && player.IsCarrying) stole = true;
        Refresh();
    }

    private void Refresh()
    {
        bool step1 = !moved, step2 = moved && !turned, step3 = moved && turned && !stole;
        Show(moveHint, step1); Show(moveText, step1);
        Show(cameraHint, step2); Show(cameraText, step2);
        Show(goText, step3);

        float t = Time.time;
        if (step1 && moveHand) moveHand.anchoredPosition = new Vector2(Mathf.Sin(t * 2.5f), Mathf.Cos(t * 2.5f)) * moveRadius;
        if (step2 && cameraHand) cameraHand.anchoredPosition = new Vector2(Mathf.Lerp(-swipeDistance, swipeDistance, Mathf.PingPong(t * 0.8f, 1f)), 0);
        if (step3 && goText) goText.transform.localScale = Vector3.one * (1f + 0.12f * Mathf.Sin(t * 5f));

        if (holdHand)
        {
            // Press and hold: down, stay, back up (until the first steal)
            float p = stole ? 0f : Mathf.Repeat(t, 1.2f);
            float down = p < 0.2f ? p / 0.2f : p < 0.9f ? 1f : p < 1.1f ? 1f - (p - 0.9f) / 0.2f : 0f;
            holdHand.anchoredPosition = holdHandStart + new Vector2(-6f, -10f) * down;
            holdHand.localScale = Vector3.one * (1f - 0.1f * down);
        }
    }

    private static void Show(GameObject go, bool on)
    {
        if (go && go.activeSelf != on) go.SetActive(on);
    }
}
