using UnityEngine;

[DisallowMultipleComponent]
public sealed class ButtonScalePulse : MonoBehaviour
{
    [SerializeField, Min(1f)] private float maxScale = 1.05f;
    [SerializeField, Min(0.01f)] private float halfCycleDuration = 0.5f;
    private float elapsed;

    public void StopPulse()
    {
        enabled = false;
        transform.localScale = Vector3.one;
    }

    private void OnEnable()
    {
        elapsed = 0f;
        transform.localScale = Vector3.one;
    }

    private void Update()
    {
        float duration = Mathf.Max(0.01f, halfCycleDuration);
        elapsed = (elapsed + Time.unscaledDeltaTime) % (duration * 2f);
        float t = Mathf.PingPong(elapsed / duration, 1f);
        float scale = Mathf.Lerp(1f, maxScale, Mathf.SmoothStep(0f, 1f, t));
        transform.localScale = new Vector3(scale, scale, 1f);
    }

    private void OnDisable()
    {
        transform.localScale = Vector3.one;
    }
}
