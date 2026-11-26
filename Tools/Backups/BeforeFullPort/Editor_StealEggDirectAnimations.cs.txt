using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using UnityEditor;
using UnityEditor.Animations;
using UnityEngine;

public static class StealEggDirectAnimations
{
    class Leaf
    {
        public Motion motion;
        public float speed = 1, offset;
        public bool mirror;
        public List<AnimatorCondition> conditions = new List<AnimatorCondition>();
    }

    [MenuItem("Steal Egg/Convert animations to direct clip states")]
    public static void Apply()
    {
        if (EditorApplication.isPlaying) throw new InvalidOperationException("Exit Play Mode first.");
        int converted = 0;
        foreach (string guid in AssetDatabase.FindAssets("t:AnimatorController", new[] { "Assets" }))
        {
            string path = AssetDatabase.GUIDToAssetPath(guid);
            var assets = AssetDatabase.LoadAllAssetsAtPath(path);
            var trees = assets.OfType<BlendTree>().ToArray();
            if (trees.Length == 0) continue;
            string backup = "Tools/Backups/BeforeDirectAnimations/" + path;
            Directory.CreateDirectory(Path.GetDirectoryName(backup));
            if (!File.Exists(backup)) File.Copy(path, backup);
            var machines = assets.OfType<AnimatorStateMachine>().ToArray();
            foreach (var state in assets.OfType<AnimatorState>())
            {
                if (!(state.motion is BlendTree)) continue;
                var leaves = new List<Leaf>();
                Flatten(state.motion, new Leaf(), leaves);
                var parent = machines.FirstOrDefault(m => m.states.Any(s => s.state == state));
                if (leaves.Count == 0) { state.motion = null; EditorUtility.SetDirty(state); continue; }
                var originalTransitions = state.transitions;
                var variants = new List<AnimatorState> { state };
                // Keep the original state identity so incoming transitions remain valid.
                if (parent)
                    for (int i = 1; i < leaves.Count; i++)
                    {
                        var variant = parent.AddState(state.name + " / " + leaves[i].motion.name + " " + i,
                            new Vector3(450 + i % 4 * 240, 80 + i / 4 * 80));
                        EditorUtility.CopySerialized(state, variant);
                        variant.name = state.name + " / " + leaves[i].motion.name + " " + i;
                        variant.transitions = new AnimatorStateTransition[0];
                        foreach (var transition in originalTransitions)
                        {
                            var copy = new AnimatorStateTransition();
                            EditorUtility.CopySerialized(transition, copy);
                            AssetDatabase.AddObjectToAsset(copy, path);
                            variant.transitions = variant.transitions.Concat(new[] { copy }).ToArray();
                        }
                        variants.Add(variant);
                    }
                float baseSpeed = state.speed, baseOffset = state.cycleOffset;
                bool baseMirror = state.mirror;
                for (int i = 0; i < variants.Count; i++)
                {
                    var variant = variants[i];
                    variant.motion = leaves[i].motion;
                    variant.speed = baseSpeed * leaves[i].speed;
                    variant.cycleOffset = baseOffset + leaves[i].offset;
                    variant.mirror = baseMirror ^ leaves[i].mirror;
                    for (int j = 0; j < variants.Count; j++)
                    {
                        if (i == j) continue;
                        var transition = variant.AddTransition(variants[j]);
                        transition.hasExitTime = false;
                        transition.hasFixedDuration = true;
                        transition.duration = .08f;
                        transition.conditions = leaves[j].conditions.ToArray();
                    }
                    EditorUtility.SetDirty(variant);
                }
                converted++;
            }
            // Also remove orphaned trees carried over from the original controllers.
            foreach (var tree in trees) UnityEngine.Object.DestroyImmediate(tree, true);
            foreach (var machine in machines) EditorUtility.SetDirty(machine);
            EditorUtility.SetDirty(AssetDatabase.LoadAssetAtPath<AnimatorController>(path));
        }
        AssetDatabase.SaveAssets();
        Debug.Log("Direct clip animation conversion complete: " + converted + " states converted.");
    }

    static void Flatten(Motion motion, Leaf inherited, List<Leaf> leaves)
    {
        if (!motion) return;
        var tree = motion as BlendTree;
        if (!tree) { inherited.motion = motion; leaves.Add(inherited); return; }
        var children = tree.children.Where(c => c.motion).ToArray();
        if (tree.blendType != BlendTreeType.Simple1D && tree.blendType != BlendTreeType.FreeformCartesian2D)
            throw new InvalidOperationException("Unsupported tree: " + tree.name + " / " + tree.blendType);
        foreach (var child in children)
        {
            var leaf = new Leaf { speed = inherited.speed * child.timeScale,
                offset = inherited.offset + child.cycleOffset, mirror = inherited.mirror ^ child.mirror,
                conditions = new List<AnimatorCondition>(inherited.conditions) };
            if (tree.blendType == BlendTreeType.Simple1D)
                AddRange(leaf, tree.blendParameter, child.threshold, children.Select(c => c.threshold));
            else
            {
                // Discrete rows and directions replace continuous 2D interpolation.
                AddRange(leaf, tree.blendParameterY, child.position.y, children.Select(c => c.position.y));
                AddRange(leaf, tree.blendParameter, child.position.x,
                    children.Where(c => Mathf.Approximately(c.position.y, child.position.y)).Select(c => c.position.x));
            }
            Flatten(child.motion, leaf, leaves);
        }
    }

    static void AddRange(Leaf leaf, string parameter, float value, IEnumerable<float> samples)
    {
        float[] sorted = samples.Distinct().OrderBy(v => v).ToArray();
        int index = Array.IndexOf(sorted, value);
        if (index > 0) leaf.conditions.Add(new AnimatorCondition { parameter = parameter,
            mode = AnimatorConditionMode.Greater, threshold = (sorted[index - 1] + value) * .5f });
        if (index < sorted.Length - 1) leaf.conditions.Add(new AnimatorCondition { parameter = parameter,
            mode = AnimatorConditionMode.Less, threshold = (value + sorted[index + 1]) * .5f });
    }
}
