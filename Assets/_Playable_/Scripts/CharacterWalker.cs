using System.Collections.Generic;
using UnityEngine;

// Di chuyển nhân vật tới điểm đích + animation đi bộ.
// Dùng clip legacy "walk"/"idle" nếu model có, nếu không thì vung tay chân bằng code.
public class CharacterWalker : MonoBehaviour
{
    public float speed = 1.3f;
    public float speedMultiplier = 1f;
    public float turnSpeed = 480f;
    public float swingAngle = 40f;
    public float swingFreq = 8f;
    public bool bobBody = false; // cho model không có tay chân (pet)
    public bool externalControl;   // true: script khác tự di chuyển, walker chỉ chạy animation
    public bool externalMoving;

    class Limb { public Transform t; public Quaternion baseRot; public float sign; }
    readonly List<Limb> limbs = new List<Limb>();
    Animation anim;
    string curClip;
    Transform bodyRoot; Vector3 bodyBase;
    Vector3 target; bool hasTarget;
    float phase, amp;
    bool facing; Quaternion faceRot;

    public bool IsMoving { get { return hasTarget; } }
    public Vector3 Target { get { return target; } }

    void Awake()
    {
        anim = GetComponentInChildren<Animation>();
        if (anim == null) CollectLimbs();
        if (transform.childCount > 0) { bodyRoot = transform.GetChild(0); bodyBase = bodyRoot.localPosition; }
    }

    void CollectLimbs()
    {
        var all = GetComponentsInChildren<Transform>(true);
        foreach (var t in all)
        {
            string n = t.name.ToLowerInvariant();
            bool arm = n.Contains("arm"), leg = n.Contains("leg");
            if (!arm && !leg) continue;
            if (n.Contains("layer")) continue;
            // chỉ lấy node limb cao nhất
            bool parentIsLimb = false;
            for (var p = t.parent; p != null && p != transform; p = p.parent)
            { string pn = p.name.ToLowerInvariant(); if (pn.Contains("arm") || pn.Contains("leg")) { parentIsLimb = true; break; } }
            if (parentIsLimb) continue;
            bool right = n.Contains("right");
            float s = arm ? (right ? 1f : -1f) : (right ? -1f : 1f);
            limbs.Add(new Limb { t = t, baseRot = t.localRotation, sign = s });
        }
    }

    public void MoveTo(Vector3 p) { target = p; hasTarget = true; facing = false; }
    public void Stop() { hasTarget = false; }
    public void FaceTowards(Vector3 worldPoint)
    {
        Vector3 d = worldPoint - transform.position; d.y = 0;
        if (d.sqrMagnitude < 0.0001f) return;
        faceRot = Quaternion.LookRotation(d); facing = true;
    }

    void Update()
    {
        float dt = Time.deltaTime;
        if (externalControl) return;
        if (hasTarget)
        {
            Vector3 d = target - transform.position; d.y = 0;
            float dist = d.magnitude;
            if (dist < 0.08f) hasTarget = false;
            else
            {
                Quaternion want = Quaternion.LookRotation(d / dist);
                transform.rotation = Quaternion.RotateTowards(transform.rotation, want, turnSpeed * dt);
                float step = Mathf.Min(dist, speed * speedMultiplier * dt);
                Vector3 p = transform.position + d / dist * step;
                p.y = Mathf.Lerp(transform.position.y, target.y, 10f * dt);
                transform.position = p;
            }
        }
        else if (facing)
        {
            transform.rotation = Quaternion.RotateTowards(transform.rotation, faceRot, turnSpeed * dt);
            if (Quaternion.Angle(transform.rotation, faceRot) < 0.5f) facing = false;
        }
        Animate(hasTarget, dt);
    }

    void LateUpdate()
    {
        // Read the controller's movement result after all Update methods.
        if (externalControl) Animate(externalMoving, Time.deltaTime);
    }

    void Animate(bool moving, float dt)
    {
        if (anim != null)
        {
            string c = moving ? "walk" : "idle";
            // Luna: không dùng GetClip / AnimationState.wrapMode / IsPlaying(string) -> tự lặp lại clip.
            // Model có Animation (Unicorn, Skibidi) đều có clip "walk" và "idle".
            if (curClip != c || !anim.isPlaying)
            {
                anim.CrossFade(c, 0.2f);
                curClip = c;
            }
            return;
        }
        amp = Mathf.MoveTowards(amp, moving ? swingAngle : 0f, swingAngle * 6f * dt);
        phase += dt * swingFreq * Mathf.Max(1f, speedMultiplier);
        float s = Mathf.Sin(phase) * amp;
        for (int i = 0; i < limbs.Count; i++)
            limbs[i].t.localRotation = limbs[i].baseRot * Quaternion.Euler(limbs[i].sign * s, 0f, 0f);
        if (bobBody && bodyRoot != null)
            bodyRoot.localPosition = bodyBase + Vector3.up * Mathf.Abs(Mathf.Sin(phase)) * 0.06f * (amp / Mathf.Max(0.01f, swingAngle));
    }
}
