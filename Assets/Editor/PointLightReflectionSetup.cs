using UnityEngine;
using UnityEditor;
using UnityEditor.SceneManagement;

public static class PointLightReflectionSetup
{
    static int Mark(GameObject root)
    {
        int count = 0;
        foreach (Light light in root.GetComponentsInChildren<Light>(true))
        {
            if (light.type != LightType.Point) continue;
            var marker = light.GetComponent<PointLightReflectionExclusion>();
            if (marker == null) marker = light.gameObject.AddComponent<PointLightReflectionExclusion>();
            marker.source = light;
            EditorUtility.SetDirty(marker);
            count++;
        }
        return count;
    }

    [MenuItem("Tools/Craft/Prepare Point Light Reflection Exclusions")]
    public static void Prepare() { Debug.Log(Bake()); }

    public static string Bake()
    {
        if (EditorApplication.isPlaying) return "Stop Play Mode first.";
        const string path = "Assets/Resources/ReferenceHouseGameplay.prefab";
        var root = PrefabUtility.LoadPrefabContents(path);
        int prefabCount;
        try { prefabCount=Mark(root); PrefabUtility.SaveAsPrefabAsset(root,path); }
        finally { PrefabUtility.UnloadPrefabContents(root); }
        var scene = EditorSceneManager.GetActiveScene();
        int sceneCount=0;
        foreach (var go in scene.GetRootGameObjects()) sceneCount+=Mark(go);
        EditorSceneManager.MarkSceneDirty(scene);
        EditorSceneManager.SaveScene(scene);
        AssetDatabase.SaveAssets();
        return "Point light markers: gameplay prefab="+prefabCount+", scene="+sceneCount;
    }
}
