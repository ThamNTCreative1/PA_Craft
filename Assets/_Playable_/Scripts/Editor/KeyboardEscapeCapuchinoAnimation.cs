using System;
using System.Linq;
using UnityEngine;
using UnityEditor;
using UnityEditor.SceneManagement;
using Playable.KeyboardEscape;

public static partial class KeyboardEscapeBuilder
{
    public static string BakeCapuchinoWalk()
    {
        if(EditorApplication.isPlaying) throw new InvalidOperationException("Exit Play Mode before baking");
        var game=UnityEngine.Object.FindFirstObjectByType<EscapeGame>();
        var giant=game.giants[0];
        var model=AssetDatabase.LoadAssetAtPath<GameObject>(Root+"/Source/Giants/Ballerina Capuchina/Ballerina Capuchina.fbx");
        var source=AssetDatabase.LoadAllAssetsAtPath(Root+"/Source/ECM2/Shared Assets/Models/UnityCharacter/Animations/HumanoidWalk.fbx").OfType<AnimationClip>().First(c=>!c.name.StartsWith("__preview__"));
        if(!source.humanMotion) throw new InvalidOperationException("Walking source must use Humanoid import for retargeting");
        var target=UnityEngine.Object.Instantiate(model);
        try
        {
            var bones=target.GetComponentsInChildren<Transform>().Where(t=>t!=target.transform).ToArray();
            int frames=Mathf.CeilToInt(source.length*30);
            var rotations=new Quaternion[bones.Length,frames+1];
            var positions=new Vector3[bones.Length,frames+1];
            AnimationMode.StartAnimationMode();
            for(int frame=0;frame<=frames;frame++)
            {
                AnimationMode.BeginSampling();
                AnimationMode.SampleAnimationClip(target,source,source.length*frame/frames);
                AnimationMode.EndSampling();
                for(int b=0;b<bones.Length;b++){rotations[b,frame]=bones[b].localRotation;positions[b,frame]=bones[b].localPosition;}
            }
            AnimationMode.StopAnimationMode();
            var clip=AssetDatabase.LoadAssetAtPath<AnimationClip>(Root+"/Prefabs/Giant Walk 0.anim");
            Undo.RecordObject(clip,"Retarget Capuchino walk");clip.ClearCurves();clip.frameRate=30;
            for(int b=0;b<bones.Length;b++)
            {
                string path=AnimationUtility.CalculateTransformPath(bones[b],target.transform);
                for(int axis=0;axis<7;axis++)
                {
                    var keys=new Keyframe[frames+1];
                    for(int frame=0;frame<=frames;frame++)
                    {
                        float value=axis<4?rotations[b,frame][axis]:positions[b,frame][axis-4];
                        // Keep the retargeted motion in place; movement is owned by EscapeGiant.
                        if(axis==4||axis==6) value-=(positions[b,frames][axis-4]-positions[b,0][axis-4])*frame/frames;
                        keys[frame]=new Keyframe(source.length*frame/frames,value);
                    }
                    string property=axis<4?"m_LocalRotation."+"xyzw"[axis]:"m_LocalPosition."+"xyz"[axis-4];
                    AnimationUtility.SetEditorCurve(clip,EditorCurveBinding.FloatCurve(path,typeof(Transform),property),new AnimationCurve(keys));
                }
            }
            clip.EnsureQuaternionContinuity();
            var settings=AnimationUtility.GetAnimationClipSettings(clip);settings.loopTime=true;AnimationUtility.SetAnimationClipSettings(clip,settings);
            EditorUtility.SetDirty(clip);
            giant.animator.avatar=null;giant.animator.applyRootMotion=false;giant.animator.cullingMode=AnimatorCullingMode.AlwaysAnimate;EditorUtility.SetDirty(giant.animator);
            AssetDatabase.SaveAssets();EditorSceneManager.MarkSceneDirty(game.gameObject.scene);EditorSceneManager.SaveScene(game.gameObject.scene);
            return "Retargeted walk: "+bones.Length+" bones, "+(frames+1)+" samples";
        }
        finally {if(AnimationMode.InAnimationMode())AnimationMode.StopAnimationMode();UnityEngine.Object.DestroyImmediate(target);}
    }
}
