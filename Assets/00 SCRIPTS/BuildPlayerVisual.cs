using UnityEngine;

/// <summary>Plays the original game's extracted clips on its original rig and skin.</summary>
public sealed class BuildPlayerVisual : MonoBehaviour
{
    [SerializeField] private Animator animator;
    [SerializeField] private Renderer[] body;
    private string currentState;
    private float buildUntil;

    public void PlayBuild() { buildUntil = Time.time + .45f; }

    public void Synchronize(Vector3 feet, float lookYaw, Vector3 velocity, bool grounded,
        bool flying, bool visible)
    {
        transform.position = feet;
        Vector3 horizontal = new Vector3(velocity.x, 0, velocity.z);
        float targetYaw = horizontal.sqrMagnitude > .01f
            ? Mathf.Atan2(horizontal.x, horizontal.z) * Mathf.Rad2Deg : lookYaw;
        transform.rotation = Quaternion.Slerp(transform.rotation, Quaternion.Euler(0,targetYaw,0),
            1f-Mathf.Exp(-20f*Time.deltaTime));
        for (int i=0;i<body.Length;i++) if(body[i]!=null) body[i].enabled=visible;
        string state = Time.time < buildUntil ? "Build"
            : flying ? (horizontal.sqrMagnitude>.04f ? "Fly" : "Fly_Idle")
            : !grounded ? (velocity.y > .1f ? "Jump" : "Fall")
            : horizontal.magnitude > 2.5f ? "Run"
            : horizontal.sqrMagnitude > .01f ? "Walk" : "Idle";
        if (animator!=null && currentState!=state)
        {
            animator.Play(state,0,0f);
            currentState=state;
        }
    }
}
