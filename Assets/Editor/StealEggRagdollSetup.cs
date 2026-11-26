using System.Linq;
using UnityEditor;
using UnityEngine;

public static class StealEggRagdollSetup
{
    public static void Configure(StealEggGame game)
    {
        GameObject prefab=AssetDatabase.LoadAssetAtPath<GameObject>("Assets/MiniGames/StealAnEgg/Prefabs/SAE_Player Variant.prefab");
        Animator source=prefab.GetComponentsInChildren<Animator>(true).First(a=>a.name=="Player.base_character");
        Transform target=game.playerAnimator.transform;
        foreach(Rigidbody body in source.GetComponentsInChildren<Rigidbody>(true))
        {
            string path=AnimationUtility.CalculateTransformPath(body.transform,source.transform);
            Transform bone=target.Find(path);if(!bone)throw new System.Exception("Ragdoll bone missing: "+path);
            Rigidbody copy=bone.GetComponent<Rigidbody>();if(!copy)copy=bone.gameObject.AddComponent<Rigidbody>();
            EditorUtility.CopySerialized(body,copy);copy.isKinematic=true;
            foreach(Collider c in body.GetComponents<Collider>())
            {
                Collider dest=(Collider)bone.GetComponent(c.GetType());if(!dest)dest=(Collider)bone.gameObject.AddComponent(c.GetType());
                EditorUtility.CopySerialized(c,dest);dest.enabled=false;
            }
        }
        foreach(CharacterJoint joint in source.GetComponentsInChildren<CharacterJoint>(true))
        {
            Transform bone=target.Find(AnimationUtility.CalculateTransformPath(joint.transform,source.transform));
            CharacterJoint copy=bone.GetComponent<CharacterJoint>();if(!copy)copy=bone.gameObject.AddComponent<CharacterJoint>();
            EditorUtility.CopySerialized(joint,copy);
            if(joint.connectedBody)copy.connectedBody=target.Find(AnimationUtility.CalculateTransformPath(joint.connectedBody.transform,source.transform)).GetComponent<Rigidbody>();
        }
        // Luna's CharacterController sweeps every layer but Ignore Raycast and also hits colliders disabled in the scene:
        // the ragdoll (and hair) colliders above the capsule stopped every jump at once.
        foreach(Collider c in game.player.GetComponentsInChildren<Collider>(true))
            if(!(c is CharacterController))c.gameObject.layer=2;
        PlayableRagdoll rig=game.GetComponent<PlayableRagdoll>();if(!rig)rig=game.gameObject.AddComponent<PlayableRagdoll>();
        rig.player=game.player;rig.animator=game.playerAnimator;rig.bodies=target.GetComponentsInChildren<Rigidbody>(true);
        rig.bodyColliders=rig.bodies.SelectMany(b=>b.GetComponents<Collider>()).ToArray();
        rig.hips=rig.bodies.First(b=>!b.GetComponent<CharacterJoint>());
        game.ragdoll=rig;EditorUtility.SetDirty(game);
    }
}
