using System.Linq;
using UnityEditor;
using UnityEditor.Animations;
using UnityEngine;

/// <summary>Extracts just the gameplay rig, skin and clips from the reference project.</summary>
public static class OriginalPlayerSetup
{
    const string Folder="Assets/3D Models/Player/";
    public static string Build()
    {
        var source=AssetDatabase.LoadAssetAtPath<GameObject>("Assets/Editor/PlayerSource/Skeleton.fbx");
        var skin=AssetDatabase.LoadAssetAtPath<GameObject>("Assets/Editor/PlayerSource/S_Base_06.fbx");
        var root=Object.Instantiate(source);
        root.name="Player";
        try
        {
            var animator=root.GetComponent<Animator>();
            var avatar=Object.Instantiate(animator.avatar);
            avatar.name="Player Avatar";
            AssetDatabase.CreateAsset(avatar,Folder+"PlayerAvatar.asset");
            animator.avatar=avatar;
            animator.applyRootMotion=false;
            animator.cullingMode=AnimatorCullingMode.AlwaysAnimate;
            var texture=(TextureImporter)AssetImporter.GetAtPath(Folder+"Player.png");
            texture.maxTextureSize=256;texture.filterMode=FilterMode.Point;texture.mipmapEnabled=false;
            texture.SaveAndReimport();
            var material=new Material(Shader.Find("Universal Render Pipeline/Lit"));
            material.name="Player";material.mainTexture=AssetDatabase.LoadAssetAtPath<Texture2D>(Folder+"Player.png");
            material.SetFloat("_Smoothness",0);material.SetFloat("_Metallic",0);
            AssetDatabase.CreateAsset(material,Folder+"Player.mat");
            var bones=root.GetComponentsInChildren<Transform>(true).ToDictionary(t=>t.name);
            foreach(var original in skin.GetComponentsInChildren<SkinnedMeshRenderer>())
            {
                var r=Object.Instantiate(original.gameObject,root.transform).GetComponent<SkinnedMeshRenderer>();
                r.name=original.name;
                r.bones=original.bones.Select(b=>bones[b.name]).ToArray();
                r.rootBone=bones[original.rootBone.name];
                var mesh=Object.Instantiate(original.sharedMesh);
                mesh.name=original.name;
                AssetDatabase.CreateAsset(mesh,Folder+mesh.name+".asset");
                r.sharedMesh=mesh;r.sharedMaterial=material;
                r.updateWhenOffscreen=true;
            }
            var controller=AnimatorController.CreateAnimatorControllerAtPath(Folder+"Player.controller");
            var clips=AssetDatabase.LoadAllAssetsAtPath("Assets/Editor/PlayerSource/Skeleton.fbx").OfType<AnimationClip>().ToArray();
            foreach(string name in new[]{"Idle","Walk","Run","Jump","Fall","Fly","Fly_Idle","Build"})
            {
                var clip=Object.Instantiate(clips.First(c=>c.name==name));clip.name=name;
                AnimationUtility.SetAnimationEvents(clip,new AnimationEvent[0]);
                var settings=AnimationUtility.GetAnimationClipSettings(clip);
                settings.loopTime=name!="Jump" && name!="Build";
                AnimationUtility.SetAnimationClipSettings(clip,settings);
                AssetDatabase.CreateAsset(clip,Folder+name+".anim");
                var state=controller.layers[0].stateMachine.AddState(name);state.motion=clip;
                if(name=="Idle")controller.layers[0].stateMachine.defaultState=state;
            }
            animator.runtimeAnimatorController=controller;
            var visual=root.AddComponent<BuildPlayerVisual>();
            var so=new SerializedObject(visual);
            so.FindProperty("animator").objectReferenceValue=animator;
            var renderers=root.GetComponentsInChildren<Renderer>();
            var body=so.FindProperty("body");body.arraySize=renderers.Length;
            for(int i=0;i<renderers.Length;i++)body.GetArrayElementAtIndex(i).objectReferenceValue=renderers[i];
            so.ApplyModifiedPropertiesWithoutUndo();
            PrefabUtility.SaveAsPrefabAsset(root,Folder+"Player.prefab");
            AssetDatabase.SaveAssets();
            return "Saved original skin, rig, eight animation clips and Player prefab.";
        }
        finally { Object.DestroyImmediate(root); }
    }
}
