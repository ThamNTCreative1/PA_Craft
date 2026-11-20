using UnityEngine;

// Pulses this object's scale (big - small - big), e.g. the PLAY NOW button.
public class PulseScale : MonoBehaviour
{
    [SerializeField] private float minScale = 0.9f;
    [SerializeField] private float maxScale = 1.1f;
    [Tooltip("Seconds for one small -> big -> small cycle.")]
    [SerializeField] private float period = 0.8f;

    private Vector3 baseScale;
    private float startTime;

    private void Awake()
    {
        baseScale = transform.localScale;
    }

    private void OnEnable()
    {
        startTime = Time.unscaledTime;
    }

    private void Update()
    {
        float k = 0.5f + 0.5f * Mathf.Sin((Time.unscaledTime - startTime) / Mathf.Max(0.05f, period) * Mathf.PI * 2f);
        transform.localScale = baseScale * Mathf.Lerp(minScale, maxScale, k);
    }
}
