using UnityEngine;

// Third person camera (source Cinemachine 3rd Person Follow + CameraController): orbits the player's Center point,
// turned by dragging the right touch zone (or the right mouse button). Keeps its distance when the view is blocked.
public class ThirdPersonCamera : MonoBehaviour
{
    [SerializeField] private Transform cam;
    [Tooltip("Player/Center (source FixCameraPoint).")]
    [SerializeField] private Transform followTarget;
    [SerializeField] private Transform player;
    [SerializeField] private PlayerMotor motor;
    [SerializeField] private ScreenDeltaInputSystem lookArea;

    [SerializeField] private float cameraDistance = 7f;
    [SerializeField] private float minDistance = 1.5f;
    [SerializeField] private float cameraRadius = 0.2f;
    [SerializeField] private float cameraReturnSpeed = 12f;
    [SerializeField] private float minPitch = -20f;
    [SerializeField] private float maxPitch = 70f;
    [SerializeField] private float defaultPitch = 12f;
    [SerializeField] private Vector2 lookSensitivity = new Vector2(0.25f, 0.15f);
    [Tooltip("Degrees per pixel for the right mouse button drag.")]
    [SerializeField] private float mouseSensitivity = 4f;
    [Tooltip("Swing the camera back behind the running player. Off: the camera turns only when the player drags.")]
    [SerializeField] private bool autoReturn = false;
    [SerializeField] private float autoReturnDelay = 1.5f;
    [SerializeField] private float autoReturnSpeed = 1.5f;

    private float yaw, pitch;
    private float currentDistance = -1;
    private float lastLookTime;
    private float shakeTime, shakeDuration, shakeStrength;

    [Header("Shake")]
    [Tooltip("Shakes per second (smooth noise).")]
    [SerializeField] private float shakeFrequency = 25f;

    // Light camera shake (e.g. when the player is caught): offset fades out over 'duration'.
    public void Shake(float strength, float duration)
    {
        shakeStrength = strength;
        shakeDuration = Mathf.Max(0.01f, duration);
        shakeTime = shakeDuration;
    }

    [Header("Start view")]
    [Tooltip("Start with startYaw / startPitch instead of behind the player (player yaw, defaultPitch).")]
    [SerializeField] private bool useStartView = false;
    [SerializeField] private float startYaw = 0f;
    [SerializeField] private float startPitch = 12f;

    private void Start()
    {
        yaw = useStartView ? startYaw : (player ? player.eulerAngles.y : 0);
        pitch = useStartView ? Mathf.Clamp(startPitch, minPitch, maxPitch) : defaultPitch;
        UpdateCamera();
    }

    // Settings "Mouse sensitivity" slider (source CAMERA_SENSITIVITY, default 200): scales the drag/mouse turn speed.
    public float SensitivityScale = 1f;
    // Degrees the player has turned the camera so far (tutorial).
    public float TurnedDegrees { get; private set; }

    public float Yaw { get { return yaw; } }
    public float Pitch { get { return pitch; } }

    public void SetView(float newYaw, float newPitch)
    {
        yaw = newYaw;
        pitch = Mathf.Clamp(newPitch, minPitch, maxPitch);
        lastLookTime = Time.time;
        UpdateCamera();
    }

    private void LateUpdate()
    {
        Vector2 look = lookArea ? lookArea.ConsumeDelta() : Vector2.zero;
        if (look == Vector2.zero && Input.GetMouseButton(1))
            look = new Vector2(Input.GetAxis("Mouse X"), Input.GetAxis("Mouse Y")) * mouseSensitivity / Mathf.Max(0.0001f, lookSensitivity.x);
        if (look.sqrMagnitude > 0)
        {
            TurnedDegrees += Mathf.Abs(look.x * lookSensitivity.x * SensitivityScale) + Mathf.Abs(look.y * lookSensitivity.y * SensitivityScale);
            yaw = Mathf.Repeat(yaw + look.x * lookSensitivity.x * SensitivityScale + 180f, 360f) - 180f;
            pitch = Mathf.Clamp(pitch - look.y * lookSensitivity.y * SensitivityScale, minPitch, maxPitch);
            lastLookTime = Time.time;
        }
        else if (autoReturn && player && motor && motor.Speed > 0.1f && Time.time - lastLookTime > autoReturnDelay)
        {
            // Swing back behind the running player (not when running towards the camera)
            float s = autoReturnSpeed * Time.deltaTime;
            Vector3 camFwd = Quaternion.Euler(0, yaw, 0) * Vector3.forward;
            float facing = (Vector3.Dot(Vector3.ProjectOnPlane(player.forward, Vector3.up).normalized, camFwd) + 1f) * 0.5f;
            yaw = Mathf.LerpAngle(yaw, player.eulerAngles.y, s * facing);
            pitch = Mathf.Lerp(pitch, defaultPitch, s);
        }
        UpdateCamera();
    }

    private void UpdateCamera()
    {
        if (followTarget == null || cam == null) return;
        Quaternion rotation = Quaternion.Euler(pitch, yaw, 0);
        Vector3 pivot = followTarget.position;
        Vector3 back = rotation * Vector3.back;
        float distance = cameraDistance;
        if (currentDistance < 0 || distance < currentDistance) currentDistance = distance;
        else currentDistance = Mathf.MoveTowards(currentDistance, distance, cameraReturnSpeed * Time.deltaTime);
        cam.position = pivot + back * currentDistance;
        cam.rotation = rotation;
        if (shakeTime > 0)
        {
            shakeTime -= Time.deltaTime;
            float fade = Mathf.Clamp01(shakeTime / shakeDuration);
            // Irregular shake from mixed sines (no PerlinNoise: keep to basic Mathf for Luna)
            float n = Time.time * shakeFrequency;
            float x = Mathf.Sin(n * 1.0f) * 0.6f + Mathf.Sin(n * 2.3f + 1.7f) * 0.4f;
            float y = Mathf.Sin(n * 1.3f + 0.9f) * 0.6f + Mathf.Sin(n * 2.9f + 2.3f) * 0.4f;
            Vector3 offset = new Vector3(x, y, 0) * shakeStrength * fade * fade;
            cam.position += rotation * offset;
        }
    }
}
