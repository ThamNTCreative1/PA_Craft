using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using UnityEditor;
using UnityEditor.Animations;
using UnityEngine;
using UnityEngine.Animations;
using UnityEngine.Playables;

public static class StealEggPlayerBoneClips
{
    const string Sources = "Assets/PlayableGenerated/Original/PlayerClips/";
    const string Output = "Assets/PlayableGenerated/PlayerBoneClips/";
    const string AvatarModel = "Assets/Game/Assets/Characters/Imports/Model2/W.base_character.fbx";

    public static void Apply(StealEggGame game)
    {
        var controller = (AnimatorController)game.playerAnimator.runtimeAnimatorController;
        var states = controller.layers[0].stateMachine.states;
        Directory.CreateDirectory(Output);
        var avatar = AssetDatabase.LoadAllAssetsAtPath(AvatarModel).OfType<Avatar>().First(a => a.isHuman);
        var clips = new Dictionary<AnimatorState, AnimationClip>();
        foreach (var entry in states)
        {
            var source = AssetDatabase.LoadAssetAtPath<AnimationClip>(Sources + entry.state.name + ".anim");
            if (!source || !source.humanMotion) throw new InvalidOperationException("Missing humanoid source: " + entry.state.name);
            clips.Add(entry.state, Bake(game.playerAnimator, avatar, source));
        }
        foreach (var pair in clips)
        {
            pair.Key.motion = pair.Value;
            EditorUtility.SetDirty(pair.Key);
            foreach (var transition in pair.Key.transitions)
            {
                transition.hasFixedDuration = true;
                transition.duration = .12f;
                EditorUtility.SetDirty(transition);
            }
        }
        foreach (var animator in game.npcModels.Select(n => n.GetComponentInChildren<Animator>(true)).Append(game.playerAnimator))
        {
            if (!animator || animator.runtimeAnimatorController != controller) continue;
            animator.avatar = null;
            EditorUtility.SetDirty(animator);
        }
        AssetDatabase.SaveAssets();
    }

    static AnimationClip Bake(Animator original, Avatar avatar, AnimationClip source)
    {
        var rig = UnityEngine.Object.Instantiate(original);
        var graph = PlayableGraph.Create();
        try
        {
            rig.avatar = avatar;
            rig.runtimeAnimatorController = null;
            rig.cullingMode = AnimatorCullingMode.AlwaysAnimate;
            rig.applyRootMotion = false;
            rig.Rebind();
            var bones = Enumerable.Range(0, (int)HumanBodyBones.LastBone)
                .Select(i => rig.GetBoneTransform((HumanBodyBones)i)).Where(b => b).Distinct().ToArray();
            var hips = rig.GetBoneTransform(HumanBodyBones.Hips);
            var playback = AnimationClipPlayable.Create(graph, source);
            AnimationPlayableOutput.Create(graph, "Sample", rig).SetSourcePlayable(playback);
            graph.SetTimeUpdateMode(DirectorUpdateMode.Manual);
            graph.Play();
            var clip = new AnimationClip { name = source.name, frameRate = source.frameRate };
            int frames = Mathf.Max(1, Mathf.CeilToInt(source.length * source.frameRate));
            var poses = new Quaternion[bones.Length, frames+1];
            var positions = new Vector3[frames+1];
            for (int f=0; f<=frames; f++)
            {
                playback.SetTime(source.length * f / frames);
                graph.Evaluate(0);
                positions[f] = hips.localPosition;
                for (int b=0; b<bones.Length; b++) poses[b,f] = bones[b].localRotation;
            }
            for (int b=0; b<bones.Length; b++)
            {
                string path = AnimationUtility.CalculateTransformPath(bones[b], rig.transform);
                for (int axis=0; axis<4; axis++)
                    AddCurve(clip,path,"m_LocalRotation."+"xyzw"[axis],frames,source.length,f => poses[b,f][axis]);
                if (bones[b]==hips)
                    for (int axis=0; axis<3; axis++)
                        AddCurve(clip,path,"m_LocalPosition."+"xyz"[axis],frames,source.length,f => positions[f][axis]);
            }
            clip.EnsureQuaternionContinuity();
            AnimationUtility.SetAnimationClipSettings(clip,AnimationUtility.GetAnimationClipSettings(source));
            string file = Output + source.name + ".anim";
            var saved = AssetDatabase.LoadAssetAtPath<AnimationClip>(file);
            if (!saved) { AssetDatabase.CreateAsset(clip,file); return clip; }
            EditorUtility.CopySerialized(clip,saved);
            UnityEngine.Object.DestroyImmediate(clip);
            EditorUtility.SetDirty(saved);
            return saved;
        }
        finally { graph.Destroy(); UnityEngine.Object.DestroyImmediate(rig.gameObject); }
    }

    static void AddCurve(AnimationClip clip,string path,string property,int frames,float length,Func<int,float> value)
    {
        var keys = new List<Keyframe>();
        for (int f=0; f<=frames; f++)
        {
            float v = value(f);
            if (f>0 && f<frames && Mathf.Abs(value(f-1)-v)<.000001f && Mathf.Abs(value(f+1)-v)<.000001f) continue;
            keys.Add(new Keyframe(length*f/frames,v));
        }
        AnimationUtility.SetEditorCurve(clip,EditorCurveBinding.FloatCurve(path,typeof(Transform),property),new AnimationCurve(keys.ToArray()));
    }
}
