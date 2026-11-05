using UnityEditor;
using UnityEngine;

public class MaterialReplacerWindow : EditorWindow
{
    private GameObject targetObject;
    private Material targetMaterial;

    [MenuItem("Tools/Material/Replace Materials")]
    static void Open()
    {
        GetWindow<MaterialReplacerWindow>("Material Replacer");
    }

    private void OnGUI()
    {
        GUILayout.Space(10);

        GUILayout.Label("Target", EditorStyles.boldLabel);

        targetObject = (GameObject)EditorGUILayout.ObjectField(
            "Root Object",
            targetObject,
            typeof(GameObject),
            true);

        targetMaterial = (Material)EditorGUILayout.ObjectField(
            "Material",
            targetMaterial,
            typeof(Material),
            false);

        GUILayout.Space(15);

        GUI.enabled = targetObject != null;

        int meshCount = targetObject == null ? 0 :
            targetObject.GetComponentsInChildren<MeshRenderer>(true).Length;

        int skinnedCount = targetObject == null ? 0 :
            targetObject.GetComponentsInChildren<SkinnedMeshRenderer>(true).Length;

        EditorGUILayout.HelpBox(
            $"MeshRenderer : {meshCount}\n" +
            $"SkinnedMeshRenderer : {skinnedCount}",
            MessageType.Info);

        GUI.enabled = targetObject != null && targetMaterial != null;

        if (GUILayout.Button("Replace All Materials", GUILayout.Height(35)))
        {
            ReplaceMaterials();
        }

        GUI.enabled = true;
    }

    private void ReplaceMaterials()
    {
        int changedRenderer = 0;

        //--------------------------------------------------
        // MeshRenderer
        //--------------------------------------------------

        foreach (MeshRenderer renderer in targetObject.GetComponentsInChildren<MeshRenderer>(true))
        {
            Undo.RecordObject(renderer, "Replace Materials");

            Material[] mats = renderer.sharedMaterials;

            for (int i = 0; i < mats.Length; i++)
                mats[i] = targetMaterial;

            renderer.sharedMaterials = mats;

            EditorUtility.SetDirty(renderer);

            changedRenderer++;
        }

        //--------------------------------------------------
        // SkinnedMeshRenderer
        //--------------------------------------------------

        foreach (SkinnedMeshRenderer renderer in targetObject.GetComponentsInChildren<SkinnedMeshRenderer>(true))
        {
            Undo.RecordObject(renderer, "Replace Materials");

            Material[] mats = renderer.sharedMaterials;

            for (int i = 0; i < mats.Length; i++)
                mats[i] = targetMaterial;

            renderer.sharedMaterials = mats;

            EditorUtility.SetDirty(renderer);

            changedRenderer++;
        }

        AssetDatabase.SaveAssets();

        Debug.Log($"Done! Replaced materials on {changedRenderer} Renderers.");
    }
}