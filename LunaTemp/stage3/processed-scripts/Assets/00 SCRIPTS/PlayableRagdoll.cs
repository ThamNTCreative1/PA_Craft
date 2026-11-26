using UnityEngine;

public class PlayableRagdoll : MonoBehaviour
{
    public Transform player;
    public Animator animator;
    public Rigidbody hips;
    public Rigidbody[] bodies;
    public Collider[] bodyColliders;
    private Transform[] bones;
    private Vector3[] positions;
    private Quaternion[] rotations;
    private Vector3 modelPosition;
    private Quaternion modelRotation;
    private bool active;

    public void Begin([Bridge.Ref] Vector3 force)
    {
        if(active || !hips)return;
        bones=animator.GetComponentsInChildren<Transform>(true);
        positions=new Vector3[bones.Length];rotations=new Quaternion[bones.Length];
        for(int i=0;i<bones.Length;i++){positions[i]=bones[i].localPosition;rotations[i]=bones[i].localRotation;}
        modelPosition=animator.transform.localPosition;modelRotation=animator.transform.localRotation;
        animator.enabled=false;animator.transform.SetParent(null,true);
        foreach(Collider c in bodyColliders)c.enabled=true;
        for(int i=0;i<bodyColliders.Length;i++)for(int j=i+1;j<bodyColliders.Length;j++)Physics.IgnoreCollision(bodyColliders[i],bodyColliders[j],true);
        foreach(Rigidbody body in bodies){body.isKinematic=false;body.useGravity=true;body.linearDamping=.05f;body.angularDamping=.05f;}
        hips.AddForce(force,ForceMode.Impulse);active=true;
    }
    public void Follow()
    {
        if(!active)return;
        // The mesh is detached, so moving the character root cannot drag the ragdoll bones.
        player.position=new Vector3(hips.position.x,player.position.y,hips.position.z);
    }
    public void Recover()
    {
        if(!active)return;
        Vector3 ground=hips.position;
        foreach(Rigidbody body in bodies){body.linearVelocity=Vector3.zero;body.angularVelocity=Vector3.zero;body.isKinematic=true;}
        foreach(Collider c in bodyColliders)c.enabled=false;
        RaycastHit hit;if(Physics.Raycast(ground+Vector3.up*2,Vector3.down,out hit,20))ground.y=hit.point.y;
        else ground.y=player.position.y;
        player.position=ground;
        animator.transform.SetParent(player,false);animator.transform.localPosition=modelPosition;animator.transform.localRotation=modelRotation;
        for(int i=1;i<bones.Length;i++){bones[i].localPosition=positions[i];bones[i].localRotation=rotations[i];}
        animator.enabled=true;active=false;
    }
    private void OnDestroy(){if(active && animator)Destroy(animator.gameObject);}
}
