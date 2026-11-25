using UnityEngine;
using UnityEngine.EventSystems;

// Port of three.js OrbitControls (enableDamping, dampingFactor 0.05) used by the reference playable.
public class BoxingRingOrbit : MonoBehaviour
{
    public Vector3 target = new Vector3(0f, 2f, 0f);
    public Vector3 portraitPosition = new Vector3(22f, 28f, 30f);
    public Vector3 landscapePosition = new Vector3(18f, 16f, 24f);
    public float dampingFactor = 0.05f;
    public float minDistance = 5f;
    public float maxDistance = 40f;
    public float maxPolarAngle = Mathf.PI / 2f + 0.1f;

    float theta, phi, radius;
    float dTheta, dPhi;
    float scale = 1f;
    int lastW, lastH;
    Vector2 lastMouse;
    bool dragging;
    float lastPinch;

    void Start() { ResetView(); }

    public void ResetView()
    {
        lastW = Screen.width; lastH = Screen.height;
        Vector3 p = Screen.width < Screen.height ? portraitPosition : landscapePosition;
        Vector3 off = p - target;
        radius = off.magnitude;
        theta = Mathf.Atan2(off.x, off.z);
        phi = Mathf.Acos(Mathf.Clamp(off.y / radius, -1f, 1f));
        dTheta = dPhi = 0f; scale = 1f;
        Apply();
    }

    bool OverUI()
    {
        return EventSystem.current != null && EventSystem.current.IsPointerOverGameObject();
    }

    void LateUpdate()
    {
        if (Screen.width != lastW || Screen.height != lastH) ResetView();

        float h = Mathf.Max(1, Screen.height);
        if (Input.touchCount >= 2)
        {
            dragging = false;
            float d = (Input.GetTouch(0).position - Input.GetTouch(1).position).magnitude;
            if (lastPinch > 0f && d > 0f) scale *= lastPinch / d;
            lastPinch = d;
        }
        else
        {
            lastPinch = 0f;
            if (Input.GetMouseButtonDown(0)) { dragging = !OverUI(); lastMouse = Input.mousePosition; }
            if (Input.GetMouseButtonUp(0)) dragging = false;
            if (dragging && Input.GetMouseButton(0))
            {
                Vector2 m = Input.mousePosition;
                Vector2 delta = m - lastMouse;
                lastMouse = m;
                dTheta -= 2f * Mathf.PI * delta.x / h;
                dPhi += 2f * Mathf.PI * delta.y / h;
            }
        }
        float wheel = Input.mouseScrollDelta.y;
        if (wheel > 0f) scale *= 0.95f; else if (wheel < 0f) scale /= 0.95f;

        float k = 1f - Mathf.Pow(1f - dampingFactor, Time.deltaTime * 60f);
        theta += dTheta * k;
        phi += dPhi * k;
        dTheta *= (1f - k);
        dPhi *= (1f - k);
        Apply();
    }

    void Apply()
    {
        phi = Mathf.Clamp(phi, 0.0001f, Mathf.Min(Mathf.PI - 0.0001f, maxPolarAngle));
        radius = Mathf.Clamp(radius * scale, minDistance, maxDistance);
        scale = 1f;
        float s = Mathf.Sin(phi);
        Vector3 off = new Vector3(radius * s * Mathf.Sin(theta), radius * Mathf.Cos(phi), radius * s * Mathf.Cos(theta));
        transform.position = target + off;
        transform.LookAt(target, Vector3.up);
    }
}
