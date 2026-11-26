using UnityEditor;
using UnityEditor.SceneManagement;
using UnityEngine;

// Every 3D AudioSource in the scene gets a PlayableSpatialAudio holding its falloff (Luna has no 3D audio).
public static class StealEggSpatialAudioSetup
{
    [MenuItem("Steal Egg/Set up distance audio")]
    static void Menu(){Apply();EditorSceneManager.SaveScene(EditorSceneManager.GetActiveScene());}

    static AudioSource Child(Transform root,string name)
    {
        if(!root)return null;
        foreach(AudioSource a in root.GetComponentsInChildren<AudioSource>(true))if(a.name==name)return a;
        return null;
    }
    public static void Apply()
    {
        AudioListener listener=Object.FindFirstObjectByType<AudioListener>();
        if(!listener)throw new System.Exception("No AudioListener in the scene.");
        int count=0;
        foreach(AudioSource source in Object.FindObjectsByType<AudioSource>(FindObjectsInactive.Include,FindObjectsSortMode.None))
        {
            PlayableSpatialAudio spatial=source.GetComponent<PlayableSpatialAudio>();
            // Already set up: the AudioSource values were copied before (its blend stays 3D in the scene).
            if(!spatial)
            {
                if(source.spatialBlend<=0)continue;
                spatial=source.gameObject.AddComponent<PlayableSpatialAudio>();
                spatial.volume=source.volume;spatial.minDistance=source.minDistance;spatial.maxDistance=source.maxDistance;
                spatial.linear=source.rolloffMode!=AudioRolloffMode.Logarithmic;
            }
            spatial.source=source;spatial.listener=listener.transform;
            EditorUtility.SetDirty(spatial);count++;
        }
        // Guardian loops, switched by StealEggGame (snore while still, run while moving).
        StealEggGame game=Object.FindFirstObjectByType<StealEggGame>();
        if(game)
        {
            SerializedObject so=new SerializedObject(game);SerializedProperty zones=so.FindProperty("zones");
            for(int i=0;i<zones.arraySize;i++)
            {
                SerializedProperty zone=zones.GetArrayElementAtIndex(i);
                Transform guardian=(Transform)zone.FindPropertyRelative("guardian").objectReferenceValue;
                zone.FindPropertyRelative("sleepSound").objectReferenceValue=Child(guardian,"SleepSound");
                zone.FindPropertyRelative("runSound").objectReferenceValue=Child(guardian,"RunSound");
                zone.FindPropertyRelative("catchSound").objectReferenceValue=guardian?guardian.GetComponent<AudioSource>():null;
            }
            so.ApplyModifiedPropertiesWithoutUndo();
        }
        EditorSceneManager.MarkSceneDirty(EditorSceneManager.GetActiveScene());
        Debug.Log("Distance audio: "+count+" AudioSources.");
    }
}
