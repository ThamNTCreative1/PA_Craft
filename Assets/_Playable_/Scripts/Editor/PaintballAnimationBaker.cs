using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using UnityEditor;
using UnityEditor.Animations;
using UnityEditor.SceneManagement;
using UnityEngine;
using UnityEngine.Animations;
using UnityEngine.Playables;
using UnityEngine.SceneManagement;

namespace Playable.Editor
{
    // Retarget once in the Editor; the playable only samples Transform curves.
    public static class PaintballAnimationBaker
    {
        private const string Folder = "Assets/_Playable_/Animations/Luna";
        private const string Paintball = "Assets/_Playable_/Animations/Paintball/";
        private const string AvatarPath = "Assets/GameAsset/Model/Character/Player/Character.fbx";
        private const int SampleRate = 30;

        [MenuItem("Playable/Animations/Export Standalone Gun Clips")]
        public static void ExportStandaloneGunClips()
        {
            if (EditorApplication.isPlaying) throw new InvalidOperationException("Stop Play Mode before exporting.");
            string destination = Folder + "/Standalone";
            Directory.CreateDirectory(destination);
            AssetDatabase.Refresh();
            var idle = AssetDatabase.LoadAssetAtPath<AnimationClip>(Folder + "/Player_idle_-5252816984213320552.anim");
            var run = AssetDatabase.LoadAssetAtPath<AnimationClip>(Folder + "/Player_run_6200578666267062213.anim");
            var hold = AssetDatabase.LoadAssetAtPath<AnimationClip>(Folder + "/Player_AssaultRifleIdle_7400000.anim");
            var draw = AssetDatabase.LoadAssetAtPath<AnimationClip>(Folder + "/Player_AssaultRifleEquipFromIdle_7400000.anim");
            if (idle == null || run == null || hold == null || draw == null)
                throw new InvalidOperationException("Bake Generic player clips before exporting standalone clips.");
            ExportFullBody(idle, hold, "Idle_Gun", idle.length, true, destination);
            ExportFullBody(run, hold, "Run_Gun", run.length, true, destination);
            ExportFullBody(idle, draw, "Draw_Gun", draw.length, false, destination);
            AssetDatabase.SaveAssets();
        }

        private static void ExportFullBody(AnimationClip legs, AnimationClip arms, string name,
            float duration, bool loop, string destination)
        {
            var output = new AnimationClip { name = name, frameRate = SampleRate };
            // Flatten the upper-body pose into the same clip as the locomotion.
            // This composition happens only at export; playback needs a single state.
            var bindings = AnimationUtility.GetCurveBindings(legs)
                .Concat(AnimationUtility.GetCurveBindings(arms)).Distinct().ToArray();
            foreach (var binding in bindings)
            {
                if (binding.type != typeof(Transform))
                    throw new InvalidOperationException("Expected only baked Transform curves.");
                var source = binding.path.Contains("/mixamorig:Spine") ? arms : legs;
                var curve = AnimationUtility.GetEditorCurve(source, binding);
                if (curve == null) throw new InvalidOperationException("Missing bone curve: " + binding.path);
                var samples = new AnimationCurve();
                int frames = Mathf.Max(1, Mathf.CeilToInt(duration * SampleRate));
                for (int frame = 0; frame <= frames; frame++)
                {
                    float time = duration * frame / frames;
                    float sampleTime = source.isLooping && time > source.length
                        ? Mathf.Repeat(time, source.length) : Mathf.Min(time, source.length);
                    samples.AddKey(time, curve.Evaluate(sampleTime));
                }
                AnimationUtility.SetEditorCurve(output, binding, Reduce(samples, 0.0003f));
            }
            var settings = AnimationUtility.GetAnimationClipSettings(legs);
            settings.startTime = 0;
            settings.stopTime = duration;
            settings.loopTime = loop;
            settings.loopBlend = loop;
            AnimationUtility.SetAnimationClipSettings(output, settings);
            AnimationUtility.SetAnimationEvents(output, AnimationUtility.GetAnimationEvents(arms));
            output.EnsureQuaternionContinuity();
            string path = destination + "/" + name + ".anim";
            var existing = AssetDatabase.LoadAssetAtPath<AnimationClip>(path);
            if (existing == null) AssetDatabase.CreateAsset(output, path);
            else
            {
                EditorUtility.CopySerialized(output, existing);
                UnityEngine.Object.DestroyImmediate(output);
                EditorUtility.SetDirty(existing);
            }
        }

        [MenuItem("Playable/Animations/Assign Standalone Paintball Controller")]
        public static void AssignStandalonePaintballController()
        {
            ExportStandaloneGunClips();
            string folder = Folder + "/Standalone";
            var idle = AssetDatabase.LoadAssetAtPath<AnimationClip>(Folder + "/Player_idle_-5252816984213320552.anim");
            var jump = AssetDatabase.LoadAssetAtPath<AnimationClip>(Folder + "/Player_jump_start_-9070578397753738753.anim");
            var hold = AssetDatabase.LoadAssetAtPath<AnimationClip>(Folder + "/Player_AssaultRifleIdle_7400000.anim");
            var fire = AssetDatabase.LoadAssetAtPath<AnimationClip>(Folder + "/Player_AssaultRifleFire_7400000.anim");
            var reload = AssetDatabase.LoadAssetAtPath<AnimationClip>(Folder + "/Player_AssaultRifleReloadMid_7400000.anim");
            ExportFullBody(idle, fire, "Fire_Gun", fire.length, false, folder);
            ExportFullBody(idle, reload, "Reload_Gun", reload.length, false, folder);
            ExportFullBody(jump, hold, "Jump_Gun", jump.length, false, folder);
            string path = folder + "/PaintballStandalone.controller";
            var controller = AssetDatabase.LoadAssetAtPath<AnimatorController>(path);
            if (controller == null)
            {
                controller = AnimatorController.CreateAnimatorControllerAtPath(path);
                controller.AddParameter("speed", AnimatorControllerParameterType.Float);
                controller.AddParameter("isJump", AnimatorControllerParameterType.Bool);
                var machine = controller.layers[0].stateMachine;
                string[] names = { "Idle", "Run", "Jump", "Equip", "Fire", "Reload" };
                string[] clips = { "Idle_Gun", "Run_Gun", "Jump_Gun", "Draw_Gun", "Fire_Gun", "Reload_Gun" };
                var states = new AnimatorState[names.Length];
                for (int i = 0; i < names.Length; i++)
                {
                    states[i] = machine.AddState(names[i], new Vector3(250 * (i % 3), 100 * (i / 3), 0));
                    states[i].motion = AssetDatabase.LoadAssetAtPath<AnimationClip>(folder + "/" + clips[i] + ".anim");
                    states[i].iKOnFeet = false;
                    states[i].writeDefaultValues = false;
                }
                machine.defaultState = states[0];
                for (int i = 0; i < states.Length; i++)
                {
                    // Actions finish their clip before returning to locomotion.
                    bool action = i >= 3;
                    if (i != 2)
                    {
                        var transition = FullBodyTransition(states[i], states[2], action);
                        transition.AddCondition(AnimatorConditionMode.If, 0, "isJump");
                    }
                    if (i != 1)
                    {
                        var transition = FullBodyTransition(states[i], states[1], action);
                        transition.AddCondition(AnimatorConditionMode.IfNot, 0, "isJump");
                        transition.AddCondition(AnimatorConditionMode.Greater, 0.1f, "speed");
                    }
                    if (i != 0)
                    {
                        var transition = FullBodyTransition(states[i], states[0], action);
                        transition.AddCondition(AnimatorConditionMode.IfNot, 0, "isJump");
                        transition.AddCondition(AnimatorConditionMode.Less, 0.1001f, "speed");
                    }
                }
            }
            var scene = SceneManager.GetActiveScene();
            var weapon = scene.GetRootGameObjects().SelectMany(r => r.GetComponentsInChildren<PlayerPaintballController>(true)).Single();
            SetReference(weapon, "_armedAnimator", controller);
            AssetDatabase.SaveAssets();
            EditorSceneManager.MarkSceneDirty(scene);
            EditorSceneManager.SaveScene(scene);
        }

        private static AnimatorStateTransition FullBodyTransition(AnimatorState from, AnimatorState to, bool exit)
        {
            var transition = from.AddTransition(to);
            transition.hasExitTime = exit;
            transition.exitTime = 1f;
            transition.hasFixedDuration = true;
            transition.duration = 0.08f;
            return transition;
        }

        [MenuItem("Playable/Animations/Bake Generic Player and NPCs")]
        public static void BakeAndAssign()
        {
            if (EditorApplication.isPlaying) throw new InvalidOperationException("Stop Play Mode before baking.");
            var scene = SceneManager.GetActiveScene();
            var animators = scene.GetRootGameObjects().SelectMany(r => r.GetComponentsInChildren<Animator>(true)).ToArray();
            var player = animators.Single(a => a.GetComponent<PlayerController>() != null);
            var npcs = animators.Where(a => a.runtimeAnimatorController != null &&
                a.runtimeAnimatorController.name == "NpcPaintball").ToArray();
            if (npcs.Length != 5) throw new InvalidOperationException("Expected five Paintball NPC animators.");
            Directory.CreateDirectory(Folder);
            AssetDatabase.Refresh();
            var report = new StringBuilder();
            var clips = new Dictionary<string, AnimationClip>();
            var onFoot = BakeController(player, "Assets/GameAsset/Model/Character/Player city.controller", "Player", clips, report);
            var armed = BakeController(player, Paintball + "PlayerPaintball.controller", "Player", clips, report);
            var rider = BakeController(player, "Assets/_Playable_/Animations/MotorbikeRider.controller", "Player", clips, report);
            var npc = BakeController(npcs[0], Paintball + "NpcPaintball.controller", "NPC", clips, report);

            // Assign only after every clip/controller has baked successfully.
            Undo.RecordObject(player, "Use Generic player animations");
            player.runtimeAnimatorController = onFoot;
            player.avatar = null;
            player.applyRootMotion = false;
            EditorUtility.SetDirty(player);
            SetReference(player.GetComponent<PlayerPaintballController>(), "_armedAnimator", armed);
            foreach (var a in npcs)
            {
                Undo.RecordObject(a, "Use Generic NPC animations");
                a.runtimeAnimatorController = npc;
                a.avatar = null;
                a.applyRootMotion = false;
                EditorUtility.SetDirty(a);
            }
            foreach (var root in scene.GetRootGameObjects())
                foreach (var bike in root.GetComponentsInChildren<MotorbikeController>(true))
                    SetReference(bike, "_riderController", rider);
            AssetDatabase.SaveAssets();
            EditorSceneManager.MarkSceneDirty(scene);
            EditorSceneManager.SaveScene(scene);
            Directory.CreateDirectory("Temp/LunaGenericAnimation");
            File.WriteAllText("Temp/LunaGenericAnimation/bake.txt", report.ToString());
            Debug.Log("Generic animation bake complete: " + clips.Count + " clips. See Temp/LunaGenericAnimation/bake.txt");
        }

        private static void SetReference(UnityEngine.Object target, string field, UnityEngine.Object value)
        {
            var data = new SerializedObject(target);
            data.FindProperty(field).objectReferenceValue = value;
            data.ApplyModifiedProperties();
        }

        private static AnimatorController BakeController(Animator rig, string sourcePath, string prefix,
            Dictionary<string, AnimationClip> clips, StringBuilder report)
        {
            var source = AssetDatabase.LoadAssetAtPath<AnimatorController>(sourcePath);
            string destination = Folder + "/" + Path.GetFileName(sourcePath);
            if (AssetDatabase.LoadAssetAtPath<AnimatorController>(destination) == null &&
                !AssetDatabase.CopyAsset(sourcePath, destination)) throw new InvalidOperationException("Cannot copy " + sourcePath);
            var target = AssetDatabase.LoadAssetAtPath<AnimatorController>(destination);
            var layers = target.layers;
            for (int i = 0; i < layers.Length; i++)
            {
                CopyMotions(rig, source.layers[i].stateMachine, layers[i].stateMachine, prefix, clips, report, target);
                layers[i].iKPass = false;
                if (source.layers[i].avatarMask != null) layers[i].avatarMask = BakeUpperBodyMask(rig);
            }
            target.layers = layers;
            // CopyAsset also copies the old embedded trees. Remove only unreachable
            // trees from this generated controller so source Humanoid clips cannot leak into export.
            var usedTrees = new HashSet<BlendTree>();
            foreach (var layer in layers) CollectTrees(layer.stateMachine, usedTrees);
            foreach (var tree in AssetDatabase.LoadAllAssetsAtPath(destination).OfType<BlendTree>())
                if (!usedTrees.Contains(tree)) UnityEngine.Object.DestroyImmediate(tree, true);
            EditorUtility.SetDirty(target);
            return target;
        }

        private static void CollectTrees(AnimatorStateMachine machine, HashSet<BlendTree> used)
        {
            foreach (var state in machine.states) CollectTree(state.state.motion as BlendTree, used);
            foreach (var child in machine.stateMachines) CollectTrees(child.stateMachine, used);
        }

        private static void CollectTree(BlendTree tree, HashSet<BlendTree> used)
        {
            if (tree == null || !used.Add(tree)) return;
            foreach (var child in tree.children) CollectTree(child.motion as BlendTree, used);
        }

        private static void CopyMotions(Animator rig, AnimatorStateMachine source, AnimatorStateMachine target,
            string prefix, Dictionary<string, AnimationClip> clips, StringBuilder report, AnimatorController owner)
        {
            for (int i = 0; i < source.states.Length; i++)
            {
                var state = target.states[i].state;
                state.motion = BakeMotion(rig, source.states[i].state.motion, prefix, clips, report, owner);
                state.iKOnFeet = false;
                EditorUtility.SetDirty(state);
            }
            for (int i = 0; i < source.stateMachines.Length; i++)
                CopyMotions(rig, source.stateMachines[i].stateMachine, target.stateMachines[i].stateMachine,
                    prefix, clips, report, owner);
        }

        private static Motion BakeMotion(Animator rig, Motion motion, string prefix,
            Dictionary<string, AnimationClip> clips, StringBuilder report, AnimatorController owner)
        {
            if (motion == null) return null;
            var tree = motion as BlendTree;
            if (tree != null)
            {
                var copy = UnityEngine.Object.Instantiate(tree);
                copy.name = tree.name;
                AssetDatabase.AddObjectToAsset(copy, owner);
                var children = copy.children;
                for (int i = 0; i < children.Length; i++)
                    children[i].motion = BakeMotion(rig, children[i].motion, prefix, clips, report, owner);
                copy.children = children;
                EditorUtility.SetDirty(copy);
                return copy;
            }
            var clip = motion as AnimationClip;
            if (clip == null) throw new InvalidOperationException("Unsupported motion " + motion.name);
            string guid;
            long id;
            AssetDatabase.TryGetGUIDAndLocalFileIdentifier(clip, out guid, out id);
            string key = prefix + "_" + guid + "_" + id;
            AnimationClip baked;
            if (clips.TryGetValue(key, out baked)) return baked;
            baked = BakeClip(rig, clip, Folder + "/" + prefix + "_" + clip.name.Replace('/', '_') + "_" + id + ".anim", report);
            clips.Add(key, baked);
            return baked;
        }

        private static AvatarMask BakeUpperBodyMask(Animator rig)
        {
            string path = Folder + "/UpperBody.mask";
            var mask = AssetDatabase.LoadAssetAtPath<AvatarMask>(path);
            if (mask == null) { mask = new AvatarMask(); AssetDatabase.CreateAsset(mask, path); }
            mask.AddTransformPath(rig.transform, true);
            for (int i = 0; i < mask.transformCount; i++)
                mask.SetTransformActive(i, mask.GetTransformPath(i).Contains("/mixamorig:Spine"));
            for (int i = 0; i < (int)AvatarMaskBodyPart.LastBodyPart; i++)
                mask.SetHumanoidBodyPartActive((AvatarMaskBodyPart)i, false);
            EditorUtility.SetDirty(mask);
            return mask;
        }

        private static AnimationClip BakeClip(Animator sourceRig, AnimationClip source, string path, StringBuilder report)
        {
            var preview = EditorSceneManager.NewPreviewScene();
            GameObject clone = null;
            PlayableGraph graph = default(PlayableGraph);
            try
            {
                clone = UnityEngine.Object.Instantiate(sourceRig.gameObject);
                SceneManager.MoveGameObjectToScene(clone, preview);
                foreach (var script in clone.GetComponentsInChildren<MonoBehaviour>(true)) UnityEngine.Object.DestroyImmediate(script);
                clone.SetActive(true);
                clone.transform.SetPositionAndRotation(Vector3.zero, Quaternion.identity);
                var animator = clone.GetComponent<Animator>();
                animator.enabled = true;
                animator.runtimeAnimatorController = null;
                animator.avatar = AssetDatabase.LoadAllAssetsAtPath(AvatarPath).OfType<Avatar>().First();
                animator.applyRootMotion = false;
                animator.cullingMode = AnimatorCullingMode.AlwaysAnimate;
                animator.Rebind();
                // Exclude weapons, collider objects and mesh objects from the baked curves.
                var bones = clone.GetComponentsInChildren<Transform>(true).Where(t =>
                    t != clone.transform && (t.name.StartsWith("mixamorig:") || t.name == "Armature.001")).ToArray();
                var curves = new AnimationCurve[bones.Length, 7];
                var previous = new Quaternion[bones.Length];
                for (int b = 0; b < bones.Length; b++)
                    for (int c = 0; c < 7; c++) curves[b, c] = new AnimationCurve();
                graph = PlayableGraph.Create("Generic animation bake");
                graph.SetTimeUpdateMode(DirectorUpdateMode.Manual);
                var playable = AnimationClipPlayable.Create(graph, source);
                playable.SetApplyFootIK(false);
                playable.SetApplyPlayableIK(false);
                AnimationPlayableOutput.Create(graph, "Bake", animator).SetSourcePlayable(playable);
                graph.Play();
                int steps = Mathf.Max(1, Mathf.CeilToInt(source.length * SampleRate));
                for (int frame = 0; frame <= steps; frame++)
                {
                    float time = source.length * frame / steps;
                    playable.SetTime(time);
                    graph.Evaluate(0f);
                    for (int b = 0; b < bones.Length; b++)
                    {
                        var p = bones[b].localPosition;
                        var q = bones[b].localRotation;
                        if (frame > 0 && Quaternion.Dot(previous[b], q) < 0) q = new Quaternion(-q.x, -q.y, -q.z, -q.w);
                        previous[b] = q;
                        for (int c = 0; c < 3; c++) curves[b, c].AddKey(time, p[c]);
                        for (int c = 0; c < 4; c++) curves[b, c + 3].AddKey(time, q[c]);
                    }
                }
                var output = new AnimationClip { name = source.name, frameRate = SampleRate };
                string[] properties = { "m_LocalPosition.x", "m_LocalPosition.y", "m_LocalPosition.z",
                    "m_LocalRotation.x", "m_LocalRotation.y", "m_LocalRotation.z", "m_LocalRotation.w" };
                int changing = 0;
                for (int b = 0; b < bones.Length; b++)
                {
                    string bonePath = AnimationUtility.CalculateTransformPath(bones[b], clone.transform);
                    for (int c = 0; c < 7; c++)
                    {
                        var curve = Reduce(curves[b, c], 0.0003f);
                        if (curve.keys.Max(k => k.value) - curve.keys.Min(k => k.value) > 0.001f) changing++;
                        AnimationUtility.SetEditorCurve(output, EditorCurveBinding.FloatCurve(bonePath, typeof(Transform), properties[c]), curve);
                    }
                }
                var settings = AnimationUtility.GetAnimationClipSettings(source);
                settings.startTime = 0;
                settings.stopTime = source.length;
                AnimationUtility.SetAnimationClipSettings(output, settings);
                AnimationUtility.SetAnimationEvents(output, AnimationUtility.GetAnimationEvents(source));
                output.EnsureQuaternionContinuity();
                if (source.length > 0.1f && changing == 0) throw new InvalidOperationException("Bake produced no motion: " + source.name);
                var existing = AssetDatabase.LoadAssetAtPath<AnimationClip>(path);
                if (existing == null) AssetDatabase.CreateAsset(output, path);
                else { EditorUtility.CopySerialized(output, existing); UnityEngine.Object.DestroyImmediate(output); output = existing; }
                EditorUtility.SetDirty(output);
                report.AppendLine(path + " | humanoid=" + output.humanMotion + " | changingCurves=" + changing + " | length=" + output.length + " | events=" + output.events.Length);
                return output;
            }
            finally
            {
                if (graph.IsValid()) graph.Destroy();
                if (clone != null) UnityEngine.Object.DestroyImmediate(clone);
                EditorSceneManager.ClosePreviewScene(preview);
            }
        }

        private static AnimationCurve Reduce(AnimationCurve source, float tolerance)
        {
            var keys = source.keys;
            var keep = new SortedSet<int> { 0, keys.Length - 1 };
            ReduceRange(keys, 0, keys.Length - 1, tolerance, keep);
            var result = new AnimationCurve(keep.Select(i => keys[i]).ToArray());
            for (int i = 0; i < result.length; i++)
            {
                AnimationUtility.SetKeyLeftTangentMode(result, i, AnimationUtility.TangentMode.Linear);
                AnimationUtility.SetKeyRightTangentMode(result, i, AnimationUtility.TangentMode.Linear);
            }
            return result;
        }

        private static void ReduceRange(Keyframe[] keys, int first, int last, float tolerance, SortedSet<int> keep)
        {
            float max = tolerance;
            int split = -1;
            for (int i = first + 1; i < last; i++)
            {
                float t = (keys[i].time - keys[first].time) / (keys[last].time - keys[first].time);
                float error = Mathf.Abs(keys[i].value - Mathf.Lerp(keys[first].value, keys[last].value, t));
                if (error > max) { max = error; split = i; }
            }
            if (split < 0) return;
            keep.Add(split);
            ReduceRange(keys, first, split, tolerance, keep);
            ReduceRange(keys, split, last, tolerance, keep);
        }
    }
}
