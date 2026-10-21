using Playable;
using UnityEditor;
using UnityEditor.SceneManagement;
using UnityEngine;
using UnityEngine.UI;

public static class BlockCraftTntBuilder
{
    [MenuItem("Tools/Block Craft/Bind Explosion Monster")]
    public static void BindMonster()
    {
        if (EditorApplication.isPlaying) return;
        var stages = Object.FindFirstObjectByType<BlockCraftStages>();
        var stageData = new SerializedObject(stages);
        var first = (GameObject)stageData.FindProperty("_buildStage").objectReferenceValue;
        var monster = first.GetComponentInChildren<Animator>(true);
        if (monster == null) throw new System.InvalidOperationException("Scene 1 monster missing.");
        var effect = stages.GetComponent<BlockCraftDetonation>();
        var data = new SerializedObject(effect);
        data.FindProperty("_monster").objectReferenceValue = monster.gameObject;
        data.ApplyModifiedPropertiesWithoutUndo();
        EditorSceneManager.MarkSceneDirty(stages.gameObject.scene);
        EditorSceneManager.SaveScene(stages.gameObject.scene);
        Debug.Log("Scene 1 monster bound to TNT explosion.");
    }

    [MenuItem("Tools/Block Craft/Install TNT Sequence")]
    public static void Install()
    {
        if (EditorApplication.isPlaying) return;
        var controller = Object.FindFirstObjectByType<BlockCraftBuildController>();
        if (controller == null) throw new System.InvalidOperationException("Open Gameplay.");
        var existing = controller.GetComponent<BlockCraftDetonation>();
        if (existing != null) return;
        var effect = controller.gameObject.AddComponent<BlockCraftDetonation>();
        var data = new SerializedObject(controller);
        var cell = (Image)data.FindProperty("_cells").GetArrayElementAtIndex(0).objectReferenceValue;
        var wall = cell.transform.parent;
        if (wall.GetComponent<RectMask2D>() == null) wall.gameObject.AddComponent<RectMask2D>();
        Transform layout = wall.parent;
        var fx = new GameObject("TNT Explosion", typeof(RectTransform), typeof(RectMask2D)).GetComponent<RectTransform>();
        fx.SetParent(layout, false);
        fx.anchorMin = fx.anchorMax = fx.pivot = new Vector2(0, 1);
        fx.sizeDelta = new Vector2(1124, 1080);
        var flash = MakeImage("Flash", fx, Vector2.zero, new Vector2(1124, 1080));
        var fire = new Image[7];
        const string path = "Assets/_Playable_/BlockCraft/Art/Explosion.png";
        if (!System.IO.File.Exists(path))
            AssetDatabase.CopyAsset("Assets/Epic Toon FX/Textures/explosion.png", path);
        var importer = (TextureImporter)AssetImporter.GetAtPath(path);
        importer.textureType = TextureImporterType.Sprite;
        importer.spriteImportMode = SpriteImportMode.Single;
        importer.alphaIsTransparency = true;
        importer.mipmapEnabled = false;
        importer.SaveAndReimport();
        var sprite = AssetDatabase.LoadAssetAtPath<Sprite>(path);
        for (int i = 0; i < fire.Length; i++)
        {
            fire[i] = MakeImage("Fire " + i, fx, new Vector2(400 + i * 68, -510 + (i % 2) * 70), new Vector2(350, 350));
            fire[i].rectTransform.pivot = new Vector2(0.5f, 0.5f);
            fire[i].sprite = sprite;
        }
        var audio = fx.gameObject.AddComponent<AudioSource>();
        audio.playOnAwake = false;
        audio.clip = AssetDatabase.LoadAssetAtPath<AudioClip>("Assets/_Playable_/Sound/682065__pnmcarrierailfan__explo-hit-metal-03.mp3");
        audio.volume = 0.65f;
        var settings = new SerializedObject(effect);
        settings.FindProperty("_tnt").objectReferenceValue = AssetDatabase.LoadAssetAtPath<Sprite>("Assets/_Playable_/BlockCraft/Art/build_blocks/tnt.png");
        settings.FindProperty("_flash").objectReferenceValue = flash;
        settings.FindProperty("_audio").objectReferenceValue = audio;
        var array = settings.FindProperty("_fire");
        array.arraySize = fire.Length;
        for (int i = 0; i < fire.Length; i++) array.GetArrayElementAtIndex(i).objectReferenceValue = fire[i];
        settings.ApplyModifiedPropertiesWithoutUndo();
        data.FindProperty("_detonation").objectReferenceValue = effect;
        data.ApplyModifiedPropertiesWithoutUndo();
        EditorSceneManager.MarkSceneDirty(controller.gameObject.scene);
        EditorSceneManager.SaveScene(controller.gameObject.scene);
    }

    private static Image MakeImage(string name, Transform parent, Vector2 position, Vector2 size)
    {
        var image = new GameObject(name, typeof(RectTransform), typeof(Image)).GetComponent<Image>();
        image.transform.SetParent(parent, false);
        image.rectTransform.anchorMin = image.rectTransform.anchorMax = image.rectTransform.pivot = new Vector2(0, 1);
        image.rectTransform.anchoredPosition = position;
        image.rectTransform.sizeDelta = size;
        image.raycastTarget = false;
        image.gameObject.SetActive(false);
        return image;
    }
}
