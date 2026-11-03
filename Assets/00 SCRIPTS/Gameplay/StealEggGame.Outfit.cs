using System.Collections.Generic;
using UnityEngine;

// Original PlayerOutfit (default hair) and CharacterOutfit (NPCs): hair, face, shirt and pants.
// The baker fills the NPC lists with a single outfit set, so every NPC looks the same.
public partial class StealEggGame
{
    // Attachments (hair, bat) copy the pose of an avatar bone, keeping their bind offset. Luna's mecanim writes the
    // bones' local values but leaves their world matrices stale (world position, TransformPoint), so the bone pose is
    // composed from the local chain up to the character root, which the gameplay moves itself.
    public const string SkinnedHairName="Hair (skinned)";
    private class BoneFollower { public Transform follower, bone, root; public Vector3 position; public Quaternion rotation; }
    private readonly List<BoneFollower> boneFollowers=new List<BoneFollower>();
    private BoneFollower FollowBone(Transform follower,Transform bone,Transform root)
    {
        BoneFollower f=new BoneFollower();f.follower=follower;f.bone=bone;f.root=root;
        BonePose(bone,root,out Vector3 position,out Quaternion rotation);
        f.position=Quaternion.Inverse(rotation)*(follower.position-position);f.rotation=Quaternion.Inverse(rotation)*follower.rotation;
        boneFollowers.Add(f);return f;
    }
    private void UpdateBoneFollowers()
    {
        for(int i=boneFollowers.Count-1;i>=0;i--)
        {
            BoneFollower f=boneFollowers[i];
            if(!f.follower || !f.bone){boneFollowers.RemoveAt(i);continue;}
            BonePose(f.bone,f.root,out Vector3 position,out Quaternion rotation);
            f.follower.SetPositionAndRotation(position+rotation*f.position,rotation*f.rotation);
        }
    }
    private static void BonePose(Transform bone,Transform root,out Vector3 position,out Quaternion rotation)
    {
        position=bone.localPosition;rotation=bone.localRotation;
        Transform t=bone.parent;
        for(;t && t!=root;t=t.parent){position=t.localPosition+t.localRotation*Vector3.Scale(t.localScale,position);rotation=t.localRotation*rotation;}
        if(!t)return;
        position=root.position+root.rotation*Vector3.Scale(root.lossyScale,position);rotation=root.rotation*rotation;
    }
    private static Transform HeadBone(Transform character)
    {
        Animator animator=character.GetComponentInChildren<Animator>(true);
        Transform head=animator && animator.isHuman?animator.GetBoneTransform(HumanBodyBones.Head):null;
        if(head)return head;
        foreach(Transform t in character.GetComponentsInChildren<Transform>(true))if(t.name=="mixamorig:Head")return t;
        return null;
    }

    private void StartOutfits()
    {
        WearHair(player,playerHair);
        if(npcModels!=null)foreach(Transform npc in npcModels)DressRandom(npc);
        DressRandom(exchangeShop);
    }
    private void DressRandom(Transform character)
    {
        if(!Slot(character))return;
        WearHair(character,RandomOf(outfitHairs));
        WearMaterial(character,RandomOf(outfitFaces),"Head");
        WearMaterial(character,RandomOf(outfitShirts),"Body","Hips","Arm","Arm.001");
        WearMaterial(character,RandomOf(outfitPants),"Leg","Leg.001");
    }
    private static Transform Slot(Transform character)
    {
        if(!character)return null;
        foreach(Transform t in character.GetComponentsInChildren<Transform>(true))if(t.name=="HairSlot")return t;
        return null;
    }
    private static T RandomOf<T>(T[] items) where T:Object{return items!=null && items.Length>0?items[Random.Range(0,items.Length)]:null;}
    // Placed at the original HairSlot, then moved under the character root and driven from the head bone.
    private void WearHair(Transform character,GameObject hair)
    {
        Transform slot=Slot(character);
        if(!slot || !hair)return;
        // The bake binds the hair to the head bone as a skinned mesh (StealEggFullGameBaker.BakeSkinnedHair).
        foreach(Transform child in character)if(child.name==SkinnedHairName)return;
        for(int i=slot.childCount-1;i>=0;i--)Destroy(slot.GetChild(i).gameObject);
        GameObject created=Instantiate(hair,slot);created.transform.localPosition=Vector3.zero;
        DisablePhysics(created);
        Transform head=HeadBone(character);
        if(head){created.transform.SetParent(character,true);FollowBone(created.transform,head,character);}
    }
    private static void WearMaterial(Transform character,Material material,params string[] parts)
    {
        if(!material)return;
        foreach(SkinnedMeshRenderer renderer in character.GetComponentsInChildren<SkinnedMeshRenderer>(true))
        {
            if(System.Array.IndexOf(parts,renderer.name)<0)continue;
            Material[] materials=new Material[renderer.sharedMaterials.Length];
            for(int i=0;i<materials.Length;i++)materials[i]=material;
            renderer.sharedMaterials=materials;
        }
    }
}
