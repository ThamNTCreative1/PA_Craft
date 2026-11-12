using System;
using System.Collections.Generic;
using System.Linq;
using UnityEditor;
using UnityEngine;
using Playable;

public static class DinosaurGroundingSetup
{
    // Store sole vertices in bone space once; runtime follows only these contacts.
    public static void Bake(GameObject root)
    {
        var contacts = new List<Transform>();
        var points = new List<Vector3>();
        var weights = new List<float>();
        foreach (var renderer in root.GetComponentsInChildren<SkinnedMeshRenderer>(true))
        {
            var mesh = renderer.sharedMesh;
            var vertices = mesh.vertices;
            var skin = mesh.boneWeights;
            var candidates = new Dictionary<int, List<int>>();
            for (int i = 0; i < vertices.Length; i++)
            {
                var w = skin[i];
                int[] indices = { w.boneIndex0, w.boneIndex1, w.boneIndex2, w.boneIndex3 };
                float[] values = { w.weight0, w.weight1, w.weight2, w.weight3 };
                int dominant = indices[Array.IndexOf(values, values.Max())];
                string bone = renderer.bones[dominant].name;
                if (!(bone.StartsWith("Leg_") && bone.EndsWith(".002")) &&
                    !(bone.StartsWith("Leg_") && (bone.EndsWith(".003") || bone.EndsWith(".004") || bone.EndsWith(".005"))) &&
                    !(bone.StartsWith("Forearm_") && (bone.EndsWith(".002") || bone.EndsWith(".003"))) &&
                    !(bone.StartsWith("Hind_") && (bone.EndsWith(".002") || bone.EndsWith(".003"))) &&
                    !(bone.StartsWith("Foreleg_") && bone.EndsWith(".001")) &&
                    !(bone.StartsWith("Hind_") && bone.EndsWith(".001"))) continue;
                if (!candidates.ContainsKey(dominant)) candidates.Add(dominant, new List<int>());
                candidates[dominant].Add(i);
            }
            foreach (var group in candidates.Values)
                foreach (int i in group)
                {
                    var w = skin[i];
                    int[] indices = { w.boneIndex0, w.boneIndex1, w.boneIndex2, w.boneIndex3 };
                    float[] values = { w.weight0, w.weight1, w.weight2, w.weight3 };
                    for (int j = 0; j < 4; j++)
                    {
                        contacts.Add(renderer.bones[indices[j]]);
                        points.Add(mesh.bindposes[indices[j]].MultiplyPoint3x4(vertices[i]));
                        weights.Add(values[j]);
                    }
                }
        }
        if (points.Count == 0) throw new Exception("No sole contacts found for " + root.name);
        var grounding = root.GetComponent<CreatureGrounding>();
        if (grounding == null) grounding = root.AddComponent<CreatureGrounding>();
        var serialized = new SerializedObject(grounding);
        serialized.FindProperty("_visual").objectReferenceValue = root.GetComponentInChildren<Animator>(true).transform;
        var bones = serialized.FindProperty("_contactBones");
        var positions = serialized.FindProperty("_contactPoints");
        var influences = serialized.FindProperty("_contactWeights");
        bones.arraySize = positions.arraySize = influences.arraySize = points.Count;
        for (int i = 0; i < points.Count; i++)
        {
            bones.GetArrayElementAtIndex(i).objectReferenceValue = contacts[i];
            positions.GetArrayElementAtIndex(i).vector3Value = points[i];
            influences.GetArrayElementAtIndex(i).floatValue = weights[i];
        }
        serialized.ApplyModifiedPropertiesWithoutUndo();
    }

    public static void Apply()
    {
        foreach (string name in new[] { "T-Rex Guard", "Ankylosaurus Hatchling" })
        {
            string path = StealHatchSceneSetup.Output + "/" + name + ".prefab";
            var root = PrefabUtility.LoadPrefabContents(path);
            try { Bake(root); PrefabUtility.SaveAsPrefabAsset(root, path); }
            finally { PrefabUtility.UnloadPrefabContents(root); }
        }
        var raising = UnityEngine.Object.FindFirstObjectByType<EggRaisingController>();
        var serialized = new SerializedObject(raising);
        var ground = (Transform)serialized.FindProperty("_hatchGround").objectReferenceValue;
        var position = ground.position; position.y = 0; ground.position = position;
        UnityEditor.SceneManagement.EditorSceneManager.MarkSceneDirty(raising.gameObject.scene);
        UnityEditor.SceneManagement.EditorSceneManager.SaveScene(raising.gameObject.scene);
        AssetDatabase.SaveAssets();
    }
}
