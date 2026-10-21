using Playable;
using UnityEditor;
using UnityEditor.SceneManagement;
using UnityEngine;

public static class BlockCraftAudioSetup
{
    [MenuItem("Tools/Block Craft/Update Gameplay Audio")]
    public static void Apply()
    {
        if (EditorApplication.isPlaying) return;
        var controller = Object.FindFirstObjectByType<BlockCraftBuildController>();
        if (controller == null) throw new System.InvalidOperationException("Open Gameplay.");
        var source = controller.GetComponent<AudioSource>();
        if (source == null) source = controller.gameObject.AddComponent<AudioSource>();
        source.clip = AssetDatabase.LoadAssetAtPath<AudioClip>("Assets/Sound/ButtonClose.ogg");
        source.playOnAwake = false;
        source.loop = false;
        source.spatialBlend = 0;
        source.volume = 1;
        var build = new SerializedObject(controller);
        build.FindProperty("_buttonAudio").objectReferenceValue = source;
        build.ApplyModifiedPropertiesWithoutUndo();
        var stages = new SerializedObject(controller.GetComponent<BlockCraftStages>());
        stages.FindProperty("_buttonAudio").objectReferenceValue = source;
        stages.ApplyModifiedPropertiesWithoutUndo();
        var explosion = new SerializedObject(controller.GetComponent<BlockCraftDetonation>());
        var explosionSource = (AudioSource)explosion.FindProperty("_audio").objectReferenceValue;
        explosionSource.clip = AssetDatabase.LoadAssetAtPath<AudioClip>("Assets/_Playable_/Sound/682065__pnmcarrierailfan__explo-hit-metal-03.mp3");
        explosionSource.playOnAwake = false;
        explosionSource.loop = false;
        explosionSource.spatialBlend = 0;
        if (source.clip == null || explosionSource.clip == null)
            throw new System.InvalidOperationException("Missing gameplay audio clips.");
        EditorUtility.SetDirty(source);
        EditorUtility.SetDirty(explosionSource);
        EditorSceneManager.MarkSceneDirty(controller.gameObject.scene);
        EditorSceneManager.SaveScene(controller.gameObject.scene);
        Debug.Log("Gameplay audio saved: ButtonClose on both stages; explo-hit-metal-03 on TNT explosion.");
    }
}
