using UnityEngine;

/// <summary>
/// First-person adaptation of minecraft-version_7 PlayerMotor.
/// Keeps its camera-relative input, exponential acceleration, gravity and auto-jump,
/// without the VoxelPlay/HAVIGAME or third-person character dependencies.
/// Position is the camera eye; collision covers the whole standing body.
/// </summary>
[System.Serializable]
public sealed class BuildPlayerMotor
{
    public float walkSpeed = 2f;
    public float flySpeed = 4f;
    public float movementSharpness = 15f;
    public float airAcceleration = 30f;
    public float gravity = 30f;
    public float jumpSpeed = 10f;
    public float eyeHeight = 1.6f;
    public float bodyHeight = 1.8f;
    public float maxFlyHeight = 20f;
    public bool autoJump = true;

    public Vector3 Velocity { get; private set; }
    public bool Grounded { get; private set; }
    private float jumpCooldown;
    private const float Skin = .015f;

    public void Stop() { Velocity = Vector3.zero; }

    public Vector3 Move(Vector3 eye, Vector3 input, float vertical, bool flying,
        bool jump, float radius, float deltaTime)
    {
        input = Vector3.ClampMagnitude(input, 1f);
        if(BuildCollisionWorld.Active!=null)
        {
            Vector3 offset=Vector3.up*(bodyHeight*.5f-eyeHeight);
            eye=BuildCollisionWorld.Active.ResolveOverlap(eye+offset,new Vector3(radius,bodyHeight*.5f,radius))-offset;
        }
        // Bound simulation steps, not sweep distance, for stable low-frame-rate movement.
        float remaining = Mathf.Min(deltaTime, .2f);
        while (remaining > .00001f)
        {
            float dt = Mathf.Min(remaining, .02f);
            remaining -= dt;
            jumpCooldown = Mathf.Max(0, jumpCooldown - dt);
            BuildCollisionWorld.Hit ground;
            Grounded = Velocity.y <= 0 && Cast(eye, radius, Vector3.down, .08f, out ground)
                && ground.normal.y >= .65f;
            Vector3 velocity = Velocity;
            if (flying)
            {
                Vector3 desired = (input + Vector3.up * vertical) * flySpeed;
                if (eye.y >= maxFlyHeight && desired.y > 0) desired.y = 0;
                velocity = Vector3.Lerp(velocity, desired, 1f - Mathf.Exp(-movementSharpness * dt));
            }
            else
            {
                Vector3 horizontal = new Vector3(velocity.x, 0, velocity.z);
                horizontal = Grounded
                    ? Vector3.Lerp(horizontal, input * walkSpeed, 1f - Mathf.Exp(-movementSharpness * dt))
                    : Vector3.MoveTowards(horizontal, input * walkSpeed, airAcceleration * dt);
                velocity = horizontal + Vector3.up * (Grounded ? -2f : velocity.y - gravity * dt);
                if (Grounded && jumpCooldown <= 0 &&
                    (jump || (autoJump && ShouldAutoJump(eye, input, radius))))
                {
                    velocity.y = jumpSpeed;
                    Grounded = false;
                    jumpCooldown = .3f;
                }
            }
            if (flying && velocity.y > 0)
                velocity.y = Mathf.Min(velocity.y, Mathf.Max(0, maxFlyHeight - eye.y) / dt);
            Velocity = velocity;
            eye = Sweep(eye, velocity * dt, radius);
            jump = false;
        }
        return eye;
    }

    private bool ShouldAutoJump(Vector3 eye, Vector3 input, float radius)
    {
        if (input.sqrMagnitude < .04f) return false;
        Vector3 direction = input.normalized;
        BuildCollisionWorld.Hit wall;
        if (!Cast(eye, radius, direction, .15f, out wall) || wall.normal.y > .2f) return false;
        float feet = eye.y - eyeHeight;
        Vector3 probe = wall.point + direction * .15f;
        probe.y = feet + 1.1f;
        BuildCollisionWorld.Hit top;
        if (!Raycast(probe, Vector3.down, 1.1f, out top)) return false;
        float step = top.point.y - feet;
        if (step < .05f || step > 1.05f || top.normal.y < .65f) return false;
        BuildCollisionWorld.Hit ceiling;
        return !Cast(eye, radius, Vector3.up, step + .1f, out ceiling);
    }

    private bool Raycast([Bridge.Ref] Vector3 start,[Bridge.Ref] Vector3 direction,float distance,out BuildCollisionWorld.Hit hit)
    {
        if(BuildCollisionWorld.Active!=null)
            return BuildCollisionWorld.Active.Cast(start,Vector3.zero,direction,distance,out hit);
        RaycastHit physicsHit;
        bool found=Physics.Raycast(start,direction,out physicsHit,distance,Physics.DefaultRaycastLayers,QueryTriggerInteraction.Ignore);
        hit=new BuildCollisionWorld.Hit{distance=physicsHit.distance,normal=physicsHit.normal,point=physicsHit.point};
        return found;
    }

    private bool Cast([Bridge.Ref] Vector3 eye, float radius, [Bridge.Ref] Vector3 direction, float distance, out BuildCollisionWorld.Hit hit)
    {
        if(BuildCollisionWorld.Active!=null)
            return BuildCollisionWorld.Active.Cast(eye+Vector3.up*(bodyHeight*.5f-eyeHeight),
                new Vector3(radius,bodyHeight*.5f,radius),direction,distance,out hit);
        Vector3 feet = eye - Vector3.up * eyeHeight;
        Vector3 bottom = feet + Vector3.up * radius;
        Vector3 top = feet + Vector3.up * Mathf.Max(radius, bodyHeight - radius);
        RaycastHit physicsHit;
        bool found=Physics.CapsuleCast(bottom, top, radius, direction, out physicsHit, distance,
            Physics.DefaultRaycastLayers, QueryTriggerInteraction.Ignore);
        hit=new BuildCollisionWorld.Hit{distance=physicsHit.distance,normal=physicsHit.normal,point=physicsHit.point};
        return found;
    }

    private Vector3 Sweep([Bridge.Ref] Vector3 eye, [Bridge.Ref] Vector3 movement, float radius)
    {
        for (int pass = 0; pass < 4 && movement.sqrMagnitude > .0000001f; pass++)
        {
            float distance = movement.magnitude;
            Vector3 direction = movement / distance;
            BuildCollisionWorld.Hit hit;
            if (!Cast(eye, radius, direction, distance + Skin, out hit))
            {
                eye += movement;
                break;
            }
            float travel = Mathf.Min(distance, Mathf.Max(0, hit.distance - Skin));
            eye += direction * travel;
            movement = Vector3.ProjectOnPlane(movement - direction * travel, hit.normal);
            if (Vector3.Dot(Velocity, hit.normal) < 0)
                Velocity = Vector3.ProjectOnPlane(Velocity, hit.normal);
        }
        return eye;
    }
}
