using UnityEngine;

// Góc nhìn thứ 3 sau lưng nhân vật (giống ref):
// - Joystick: di chuyển theo hướng camera, nhân vật quay mặt theo hướng đi.
// - Kéo màn hình: xoay camera.
// - Camera chỉ va chạm với vật cản thật (thân cây, block đã đặt), bỏ qua lá cây / hoa.
[RequireComponent(typeof(CharacterWalker))]
public class ThirdPersonController : MonoBehaviour
{
    public Camera cam;
    public VirtualJoystick joystick;
    public float pivotHeight = 1.25f;
    public Vector3 camOffset = new Vector3(0.55f, 0.15f, -3.8f);          // màn hình ngang
    public Vector3 camOffsetPortrait = new Vector3(0.35f, 0.1f, -4.8f);   // màn hình dọc
    public float startPitch = 16f;
    public float moveSpeed = 2.6f;
    public float turnSpeed = 720f;
    public float lookSensitivity = 0.2f;
    public float stepHeight = 0.8f;      // leo được 1 block
    public float maxDrop = 0.8f;         // xuống được 1 block, không rơi xuống sông
    public float bodyRadius = 0.25f;
    public float camMinDistance = 1.6f;
    public float camFollowSharpness = 12f;
    public LayerMask groundMask = ~0;
    public bool inputEnabled;

    CharacterWalker walker;
    float yaw, pitch;
    bool controlling;
    float camDist = -1f;
    float groundHeight;

    void Awake() { walker = GetComponent<CharacterWalker>(); pitch = startPitch; }

    public float Yaw { get { return controlling ? yaw : transform.eulerAngles.y; } }

    public void BeginControl()
    {
        yaw = transform.eulerAngles.y; pitch = startPitch;
        walker.Stop(); walker.externalControl = true; walker.externalMoving = false;
        controlling = true; inputEnabled = true; camDist = -1f;
        groundHeight = transform.position.y;
    }

    public void EndControl() { inputEnabled = false; walker.externalMoving = false; }

    static bool IgnoreForCamera(Collider c)
    {
        if (c == null) return true;
        string n = c.name;
        return n.Contains("Leaves") || n.Contains("Grass") && !n.Contains("Block") || n.Contains("Flower") || n.Contains("Vines") || n.Contains("Lily");
    }

    // Vị trí camera mong muốn (không làm mượt)
    public void GetCameraPose(out Vector3 pos, out Quaternion rot)
    {
        float y = controlling ? yaw : transform.eulerAngles.y;
        rot = Quaternion.Euler(pitch, y, 0f);
        Vector3 piv = transform.position + Vector3.up * pivotHeight;
        Vector3 off = Screen.height > Screen.width ? camOffsetPortrait : camOffset;
        Vector3 full = piv + rot * off;
        Vector3 d = full - piv; float len = d.magnitude;
        float allowed = len;
        if (len > 0.01f)
        {
            var hits = Physics.RaycastAll(piv, d / len, len + 0.2f, groundMask);
            for (int i = 0; i < hits.Length; i++)
            {
                if (IgnoreForCamera(hits[i].collider)) continue;
                if (hits[i].distance - 0.2f < allowed) allowed = hits[i].distance - 0.2f;
            }
        }
        allowed = Mathf.Max(camMinDistance, allowed);
        pos = piv + d / Mathf.Max(0.001f, len) * Mathf.Min(len, allowed);
    }

    public void AddLook([Bridge.Ref] Vector2 screenDelta)
    {
        if (!inputEnabled) return;
        float k = lookSensitivity * 1080f / Mathf.Max(1f, Mathf.Min(Screen.width, Screen.height));
        yaw += screenDelta.x * k;
        pitch = Mathf.Clamp(pitch - screenDelta.y * k, -20f, 55f);
    }

    void Update()
    {
        if (!controlling) return;
        bool moving = false;
        if (inputEnabled && joystick != null)
        {
            Vector2 j = joystick.Value;
            if (j.sqrMagnitude > 0.01f)
            {
                Quaternion yr = Quaternion.Euler(0, yaw, 0);
                Vector3 dir = (yr * Vector3.forward * j.y + yr * Vector3.right * j.x);
                dir.y = 0f;
                float mag = Mathf.Min(1f, j.magnitude);
                dir.Normalize();
                // quay mặt theo hướng đi
                transform.rotation = Quaternion.RotateTowards(transform.rotation, Quaternion.LookRotation(dir), turnSpeed * Time.deltaTime);
                moving = TryMove(dir * moveSpeed * mag * Time.deltaTime);
                // trượt dọc vật cản nếu bị chặn thẳng
                if (!moving)
                {
                    Vector3 a = new Vector3(dir.x, 0, 0), b = new Vector3(0, 0, dir.z);
                    moving = TryMove(a * moveSpeed * mag * Time.deltaTime) || TryMove(b * moveSpeed * mag * Time.deltaTime);
                }
                walker.speedMultiplier = Mathf.Max(0.6f, mag);
            }
        }
        walker.externalMoving = moving;
    }

    bool TryMove(Vector3 mv)
    {
        if (mv.sqrMagnitude < 1e-8f) return false;
        Vector3 np = transform.position + mv;
        RaycastHit h;
        if (!FindGround(np, out h)) return false;
        float dy = h.point.y - groundHeight;
        if (dy > stepHeight) return false;     // tường cao
        if (-dy > maxDrop) return false;       // hố / sông sâu
        // vật cản ngang thân (bỏ qua lá, hoa)
        RaycastHit[] hs = Physics.RaycastAll(transform.position + Vector3.up * 0.9f, mv.normalized, mv.magnitude + bodyRadius, groundMask);
        for (int i = 0; i < hs.Length; i++) if (!IgnoreForCamera(hs[i].collider)) return false;
        groundHeight = h.point.y;
        np.y = transform.position.y;
        transform.position = np;
        return true;
    }

    bool FindGround(Vector3 p, out RaycastHit best)
    {
        best = default(RaycastHit);
        p.y = groundHeight;
        var hs = Physics.RaycastAll(p + Vector3.up * (stepHeight + 0.05f), Vector3.down, stepHeight + 3f, groundMask);
        float top = float.NegativeInfinity; bool ok = false;
        for (int i = 0; i < hs.Length; i++)
        {
            if (IgnoreForCamera(hs[i].collider)) continue;
            if (hs[i].point.y > top) { top = hs[i].point.y; best = hs[i]; ok = true; }
        }
        return ok;
    }

    void LateUpdate()
    {
        if (!controlling) return;
        Vector3 feet = transform.position;
        feet.y = Mathf.Lerp(feet.y, groundHeight, 1f - Mathf.Exp(-18f * Time.deltaTime));
        transform.position = feet;
        if (cam == null) return;
        Vector3 p; Quaternion r;
        GetCameraPose(out p, out r);
        // làm mượt khoảng cách để camera không giật khi đi qua vật cản
        Vector3 piv = transform.position + Vector3.up * pivotHeight;
        float target = (p - piv).magnitude;
        camDist = camDist < 0f ? target : Mathf.Lerp(camDist, target, 1f - Mathf.Exp(-camFollowSharpness * Time.deltaTime));
        Vector3 dir = (p - piv).normalized;
        cam.transform.SetPositionAndRotation(piv + dir * camDist, r);
    }
}
