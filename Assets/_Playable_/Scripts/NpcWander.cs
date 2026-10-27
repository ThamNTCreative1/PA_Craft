using System.Collections.Generic;
using UnityEngine;

// NPC đi lại quanh người chơi, ưu tiên phía trước mặt, không đứng quá gần,
// không đè nhau, bị bỏ xa thì đi nhanh lại gần.
[RequireComponent(typeof(CharacterWalker))]
public class NpcWander : MonoBehaviour
{
    public static readonly List<NpcWander> All = new List<NpcWander>();

    public Transform player;          // gốc người chơi (chân)
    public Transform view;            // camera, để lấy hướng nhìn
    public float minRadius = 4f, maxRadius = 10f;
    public float coneAngle = 60f;
    public float minPlayerDist = 2.5f;
    public float minNpcDist = 1.6f;
    public float catchUpDist = 12f;
    public float waitMin = 0.4f, waitMax = 1.8f;
    public float groundY = -7.4f;
    public LayerMask groundMask = ~0;

    CharacterWalker walker;
    float waitT;
    bool catchingUp;
    Vector3 lastPos; float stuckT;
    float repathT, progressT;

    void Awake() { walker = GetComponent<CharacterWalker>(); }
    void OnEnable() { All.Add(this); waitT = Random.Range(0f, 1f); lastPos = transform.position; progressT = 0f; stuckT = 0f; repathT = 0f; }
    void OnDisable() { All.Remove(this); }

    void Update()
    {
        if (player == null)
        {
            var tp = FindObjectOfType<ThirdPersonController>();
            if (tp == null) return;
            player = tp.transform;
        }
        if (view == null && Camera.main != null) view = Camera.main.transform;
        var cfg = PlayableConfig.I;
        if (cfg != null) { minRadius = cfg.npcMinRadius; maxRadius = Mathf.Max(cfg.npcMinRadius + 1f, cfg.npcMaxRadius); walker.speed = cfg.npcSpeed; }

        Vector3 pp = player.position;
        repathT = Mathf.Max(0f, repathT - Time.deltaTime);
        float d = Flat(transform.position - pp).magnitude;

        if (d > catchUpDist)
        {
            if ((!catchingUp || !walker.IsMoving) && repathT <= 0f) { catchingUp = true; walker.speedMultiplier = 2.2f; Repath(); }
            return;
        }
        if (catchingUp && d < maxRadius) { catchingUp = false; walker.speedMultiplier = 1f; }

        // quá gần người chơi, hoặc đích nằm sát người chơi -> đi chỗ khác
        if (repathT <= 0f && (d < minPlayerDist || (walker.IsMoving && Flat(walker.Target - pp).magnitude < minPlayerDist)))
        {
            Repath(); return;
        }

        // bị kẹt (đang đi mà không nhích) -> chọn điểm khác
        progressT += Time.deltaTime;
        if (progressT >= 0.4f)
        {
            if (walker.IsMoving && Flat(transform.position - lastPos).sqrMagnitude < 0.0001f) stuckT += progressT; else stuckT = 0f;
            lastPos = transform.position;
            progressT = 0f;
            if (stuckT > 1f && repathT <= 0f) { stuckT = 0f; Repath(); }
        }

        if (!walker.IsMoving)
        {
            waitT -= Time.deltaTime;
            if (waitT <= 0f && repathT <= 0f) { Repath(); waitT = Random.Range(waitMin, waitMax); }
        }
    }

    void Repath()
    {
        walker.MoveTo(PickPoint());
        repathT = 0.65f;
        lastPos = transform.position;
        progressT = 0f;
    }

    static Vector3 Flat(Vector3 v) { v.y = 0; return v; }

    Vector3 PickPoint()
    {
        Vector3 pp = player.position;
        Vector3 fwd = Flat(view != null ? view.forward : player.forward);
        if (fwd.sqrMagnitude < 0.001f) fwd = Vector3.forward;
        fwd.Normalize();
        float baseYaw = Mathf.Atan2(fwd.x, fwd.z) * Mathf.Rad2Deg;

        for (int i = 0; i < 16; i++)
        {
            float cone = i < 10 ? coneAngle : 180f; // nới góc nếu khó tìm
            float yaw = baseYaw + Random.Range(-cone, cone);
            float r = Random.Range(minRadius, maxRadius);
            Vector3 dir = Quaternion.Euler(0, yaw, 0) * Vector3.forward;
            Vector3 p = pp + dir * r;
            Vector3 hitP;
            if (!GroundAt(p, out hitP)) continue;
            if (!FarFromOthers(hitP)) continue;
            // không đi xuyên vật cản (thân cây, block đã đặt) - dùng RaycastAll thay cho Linecast (Luna)
            if (Blocked(transform.position + Vector3.up * 0.5f, hitP + Vector3.up * 0.5f)) continue;
            return hitP;
        }
        // không tìm được điểm hợp lệ: vẫn đi tới 1 điểm ngẫu nhiên gần người chơi để không đứng yên
        Vector3 q = pp + Quaternion.Euler(0, baseYaw + Random.Range(-coneAngle, coneAngle), 0) * Vector3.forward * Random.Range(minRadius, maxRadius);
        q.y = transform.position.y;
        return q;
    }

    static bool Ignore(Collider c)
    {
        if (c == null) return true;
        string n = c.name;
        return n.Contains("Leaves") || n.Contains("Flower") || n.Contains("Vines") || n.Contains("Lily") || n.Contains("Boundar");
    }

    bool Blocked(Vector3 a, Vector3 b)
    {
        Vector3 d = b - a; float len = d.magnitude;
        if (len < 0.01f) return false;
        var hs = Physics.RaycastAll(a, d / len, len, groundMask);
        for (int i = 0; i < hs.Length; i++) if (!Ignore(hs[i].collider)) return true;
        return false;
    }

    // Tìm mặt đất (bỏ qua lá cây); chỉ nhận mặt cỏ ngang mặt đất chính
    bool GroundAt(Vector3 p, out Vector3 hitP)
    {
        hitP = p;
        var hs = Physics.RaycastAll(new Vector3(p.x, groundY + 6f, p.z), Vector3.down, 12f, groundMask);
        float top = float.NegativeInfinity; bool ok = false;
        for (int i = 0; i < hs.Length; i++)
        {
            if (Ignore(hs[i].collider)) continue;
            if (hs[i].point.y > top) { top = hs[i].point.y; hitP = hs[i].point; ok = true; }
        }
        if (!ok) return false;
        return Mathf.Abs(hitP.y - groundY) <= 0.3f; // nước, block đã đặt -> bỏ
    }

    bool FarFromOthers(Vector3 p)
    {
        for (int i = 0; i < All.Count; i++)
        {
            var o = All[i];
            if (o == this) continue;
            Vector3 op = o.walker != null && o.walker.IsMoving ? o.walker.Target : o.transform.position;
            if (Flat(op - p).magnitude < minNpcDist) return false;
        }
        return true;
    }
}
