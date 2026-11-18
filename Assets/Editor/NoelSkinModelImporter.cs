using System;
using System.Linq;
using Game.Events.Noel;
using UnityEditor;
using UnityEngine;

[CustomEditor(typeof(NoelSkinSelector))]
public class NoelSkinSelectorEditor : Editor
{
    public override void OnInspectorGUI()
    {
        EditorGUI.BeginChangeCheck();
        DrawDefaultInspector();
        if (EditorGUI.EndChangeCheck())
        {
            var selector = (NoelSkinSelector)target;
            var player = serializedObject.FindProperty("_player").objectReferenceValue as Component;
            if (player != null)
                Undo.RecordObjects(player.GetComponentsInChildren<SkinnedMeshRenderer>(true), "Change Noel character");
            selector.Apply();
        }
    }
}

public static class NoelSkinModelImporter
{
    [MenuItem("Tools/Noel/Import source characters")]
    public static void Import()
    {
        var selector = UnityEngine.Object.FindFirstObjectByType<NoelSkinSelector>();
        if (selector == null) throw new InvalidOperationException("Open the Gameplay scene first.");
        var so = new SerializedObject(selector);
        var player = so.FindProperty("_player").objectReferenceValue as Component;
        if (player == null) throw new InvalidOperationException("Assign the player first.");
        var targets = player.GetComponentsInChildren<SkinnedMeshRenderer>(true);
        string[] files = { "noel_outfit_elf", "Winter_Puffer_Jacket", "noel_outfit_reindeer", "noel_npc_santa", "noel_outfit_santa", "noel outfit sweater" };
        string[] textures = { "noel_outfit_elf", "Winter_Puffer_Jacket", "noel_outfit_reindeer", "noel_npc_santa", "noel_outfit_santa", "noel_outfit_sweater" };
        string[] fields = { "body", "head", "leftArm", "rightArm", "leftLeg", "rightLeg" };
        string[] parts = { "Body", "Head", "Left Arm", "Right Arm", "Left Leg", "Right Leg" };
        var aliases = new System.Collections.Generic.Dictionary<string,string> {
            {"ORG-shoulder.L","mixamorig:LeftShoulder"}, {"ORG-upper_arm.L","mixamorig:LeftArm"},
            {"ORG-forearm.L","mixamorig:LeftForeArm"}, {"ORG-hand.L","mixamorig:LeftForeArm_end"},
            {"ORG-shoulder.R","mixamorig:RightShoulder"}, {"ORG-upper_arm.R","mixamorig:RightArm"},
            {"ORG-forearm.R","mixamorig:RightForeArm"}, {"ORG-hand.R","mixamorig:RightForeArm_end"},
            {"mixamorig:Spine.001","mixamorig:Spine"} };
        const string root = "Assets/_Playable_/Noel/Skins/";
        if (!AssetDatabase.IsValidFolder(root + "Imported")) AssetDatabase.CreateFolder(root.TrimEnd('/'), "Imported");
        var skins = so.FindProperty("_skins");
        skins.arraySize = files.Length;
        for (int i = 0; i < files.Length; i++)
        {
            var source = AssetDatabase.LoadAssetAtPath<GameObject>(root + "Source/" + files[i] + ".fbx");
            if (source == null) throw new InvalidOperationException("Missing FBX: " + files[i]);
            var sourceRenderers = source.GetComponentsInChildren<SkinnedMeshRenderer>(true);
            var entry = skins.GetArrayElementAtIndex(i);
            entry.FindPropertyRelative("skin").intValue = i + 1;
            var sampleTexture = new Texture2D(2, 2, TextureFormat.RGBA32, false);
            sampleTexture.LoadImage(System.IO.File.ReadAllBytes(root + "Source/" + textures[i] + ".png"));
            for (int j = 0; j < parts.Length; j++)
            {
                var src = sourceRenderers.Single(r => r.name.Contains(parts[j]));
                var dst = targets.Single(r => r.name.Contains(parts[j]));
                var sourceMesh = NoelVoxelSurfaceCleaner.Clean(src.sharedMesh, sampleTexture);
                var targetBind = dst.sharedMesh.bindposes;
                var map = src.bones.Select(b => {
                    string name = aliases.ContainsKey(b.name) ? aliases[b.name] : b.name;
                    int index = Array.FindIndex(dst.bones, t => t.name == name);
                    if (index < 0) throw new InvalidOperationException("Unmapped bone: " + b.name);
                    return index;
                }).ToArray();
                // Retarget each weighted vertex to the existing renderer bind pose.
                var mesh = UnityEngine.Object.Instantiate(sourceMesh);
                mesh.name = files[i] + "_" + fields[j];
                var vertices = sourceMesh.vertices;
                var normals = sourceMesh.normals;
                var weights = sourceMesh.boneWeights;
                for (int k = 0; k < vertices.Length; k++)
                {
                    var w = weights[k];
                    int[] indices = { w.boneIndex0, w.boneIndex1, w.boneIndex2, w.boneIndex3 };
                    float[] amounts = { w.weight0, w.weight1, w.weight2, w.weight3 };
                    Vector3 v = Vector3.zero, n = Vector3.zero;
                    for (int slot = 0; slot < 4; slot++)
                    {
                        if (amounts[slot] <= 0) continue;
                        int bone = indices[slot];
                        var change = targetBind[map[bone]].inverse * sourceMesh.bindposes[bone];
                        v += change.MultiplyPoint3x4(vertices[k]) * amounts[slot];
                        n += change.inverse.transpose.MultiplyVector(normals[k]).normalized * amounts[slot];
                    }
                    vertices[k] = v; normals[k] = n.normalized;
                    weights[k].boneIndex0 = map[w.boneIndex0]; weights[k].boneIndex1 = map[w.boneIndex1];
                    weights[k].boneIndex2 = map[w.boneIndex2]; weights[k].boneIndex3 = map[w.boneIndex3];
                }
                mesh.vertices = vertices;
                mesh.normals = normals;
                mesh.boneWeights = weights;
                mesh.bindposes = targetBind;
                mesh.RecalculateBounds();
                string path = root + "Imported/" + mesh.name + ".asset";
                var existing = AssetDatabase.LoadAssetAtPath<Mesh>(path);
                if (existing == null) AssetDatabase.CreateAsset(mesh, path);
                else
                {
                    // Refresh native vertex/index buffers when the vertex layout changes.
                    existing.Clear();
                    existing.indexFormat = mesh.indexFormat;
                    existing.vertices = mesh.vertices; existing.normals = mesh.normals;
                    existing.uv = mesh.uv; existing.boneWeights = mesh.boneWeights;
                    existing.bindposes = mesh.bindposes; existing.triangles = mesh.triangles;
                    existing.RecalculateBounds();
                    EditorUtility.SetDirty(existing);
                    UnityEngine.Object.DestroyImmediate(mesh); mesh = existing;
                }
                entry.FindPropertyRelative(fields[j]).objectReferenceValue = mesh;
                UnityEngine.Object.DestroyImmediate(sourceMesh);
            }
            UnityEngine.Object.DestroyImmediate(sampleTexture);
            var texture = AssetDatabase.LoadAssetAtPath<Texture2D>(root + "Source/" + textures[i] + ".png");
            if (texture == null) throw new InvalidOperationException("Missing texture " + textures[i]);
            var importer = (TextureImporter)AssetImporter.GetAtPath(AssetDatabase.GetAssetPath(texture));
            importer.filterMode = FilterMode.Point; importer.mipmapEnabled = false; importer.SaveAndReimport();
            var oldMaterial = entry.FindPropertyRelative("material").objectReferenceValue as Material;
            string materialPath = root + "Imported/" + files[i] + ".mat";
            var material = AssetDatabase.LoadAssetAtPath<Material>(materialPath);
            if (material == null) { material = new Material(oldMaterial); AssetDatabase.CreateAsset(material, materialPath); }
            material.mainTexture = texture;
            EditorUtility.SetDirty(material);
            entry.FindPropertyRelative("material").objectReferenceValue = material;
        }
        so.ApplyModifiedProperties();
        selector.Apply();
        foreach (var r in targets) EditorUtility.SetDirty(r);
        AssetDatabase.SaveAssets();
        UnityEditor.SceneManagement.EditorSceneManager.MarkSceneDirty(player.gameObject.scene);
        UnityEditor.SceneManagement.EditorSceneManager.SaveScene(player.gameObject.scene);
        Debug.Log("Imported and bound all six Noel characters.");
    }
}
