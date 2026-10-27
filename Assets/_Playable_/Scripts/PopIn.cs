using UnityEngine;

// Hiệu ứng phóng to khi xuất hiện.
public class PopIn : MonoBehaviour
{
    public float duration = 0.25f;
    public float overshoot = 1.15f;
    Vector3 target; float t;

    void Awake() { target = transform.localScale; transform.localScale = Vector3.zero; }

    void Update()
    {
        t += Time.deltaTime / Mathf.Max(0.01f, duration);
        float k = t < 0.7f ? Mathf.Lerp(0f, overshoot, t / 0.7f) : Mathf.Lerp(overshoot, 1f, (t - 0.7f) / 0.3f);
        transform.localScale = target * k;
        if (t >= 1f) { transform.localScale = target; Destroy(this); }
    }
}
