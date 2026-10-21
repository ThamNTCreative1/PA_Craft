using System.IO;
using Playable;
using UnityEditor;
using UnityEditor.SceneManagement;
using UnityEngine;
using UnityEngine.UI;

public static class BlockCraftCastleBuilder
{
    private const string Root = "Assets/_Playable_/BlockCraft/";

    [MenuItem("Tools/Block Craft/Update Castle Visuals")]
    public static void UpdateVisuals()
    {
        if (EditorApplication.isPlaying) return;
        var stages = Object.FindFirstObjectByType<BlockCraftStages>();
        if (stages == null) throw new System.InvalidOperationException("Open Gameplay with the castle stage.");
        var data = new SerializedObject(stages);
        var second = ((GameObject)data.FindProperty("_castleStage").objectReferenceValue).transform;
        var background = second.Find("Castle Background").GetComponent<Image>();
        Undo.RecordObject(background, "Update castle background");
        background.sprite = AssetDatabase.LoadAssetAtPath<Sprite>(Root + "Art/castle_scene/castle_background_clean.png");
        background.color = Color.white;
        background.preserveAspect = false;
        string[] names = { "turret", "minigun", "water_gun", "blue_pistol", "protogun", "cake" };
        for (int i = 0; i < names.Length; i++)
        {
            var card = second.Find("Select " + names[i]);
            var icon = card.Find("Icon").GetComponent<Image>();
            var sprite = AssetDatabase.LoadAssetAtPath<Sprite>(Root + "Art/castle_scene/icons/" + names[i] + "_trimmed.png");
            Undo.RecordObject(icon, "Update castle icon");
            Undo.RecordObject(icon.rectTransform, "Fit castle icon");
            icon.sprite = sprite;
            icon.color = Color.white;
            icon.preserveAspect = true;
            // A common centered icon area leaves a separate band for the labels.
            icon.rectTransform.pivot = new Vector2(0.5f, 0.5f);
            icon.rectTransform.anchoredPosition = new Vector2(132, -107);
            icon.rectTransform.sizeDelta = new Vector2(228, 166);
            var label = card.Find("Label").GetComponent<Image>();
            if (label != null)
            {
                var outline = label.GetComponent<UnityEngine.UI.Outline>();
                if (outline == null) outline = label.gameObject.AddComponent<UnityEngine.UI.Outline>();
                outline.effectColor = Color.black;
                outline.effectDistance = new Vector2(1.5f, -1.5f);
                outline.useGraphicAlpha = true;
            }
        }
        ((GameObject)data.FindProperty("_buildStage").objectReferenceValue).SetActive(false);
        second.gameObject.SetActive(true);
        EditorSceneManager.MarkSceneDirty(stages.gameObject.scene);
        EditorSceneManager.SaveScene(stages.gameObject.scene);
        Selection.activeGameObject = second.gameObject;
        Debug.Log("Castle background and six weapon icons refreshed; layout saved.");
        BlockCraftCastlePolish.Apply();
    }

    [MenuItem("Tools/Block Craft/Build Castle Stage")]
    public static void Build()
    {
        if (EditorApplication.isPlaying) return;
        var build = Object.FindFirstObjectByType<BlockCraftBuildController>();
        if (build == null) throw new System.InvalidOperationException("Open Gameplay.");
        if (build.GetComponent<BlockCraftStages>() != null) return;
        foreach (string path in Directory.GetFiles(Root + "Art/castle_scene", "*.png", SearchOption.AllDirectories))
        {
            var importer = (TextureImporter)AssetImporter.GetAtPath(path.Replace('\\', '/'));
            importer.textureType = TextureImporterType.Sprite;
            importer.spriteImportMode = SpriteImportMode.Single;
            importer.mipmapEnabled = false;
            importer.alphaIsTransparency = true;
            importer.filterMode = FilterMode.Point;
            importer.maxTextureSize = path.Contains("background") ? 2048 : 512;
            importer.SaveAndReimport();
        }
        var data = new SerializedObject(build);
        var cell = (Image)data.FindProperty("_cells").GetArrayElementAtIndex(0).objectReferenceValue;
        var layout = cell.transform.parent.parent;
        var children = new Transform[layout.childCount];
        for (int i = 0; i < children.Length; i++) children[i] = layout.GetChild(i);
        var first = Rect("Scene 1 - Build", layout, 0, 0, 2048, 1080);
        foreach (var child in children) child.SetParent(first, false);
        var second = Rect("Scene 2 - Castle", layout, 0, 0, 2048, 1080);
        Img("Castle Background", second, 0, 0, 1124, 1080, "castle_scene/castle_background_clean.png");
        Img("App Icon", second, 36, 55, 112, 113, "ui/app_icon.png");
        Img("Brand Block", second, 176, 54, 149, 49, "text/text_brand_block.png");
        Img("Brand Craft", second, 176, 128, 149, 46, "text/text_brand_craft.png");
        var download = Img("Download", second, 40, 184, 382, 83, "ui/download_button.png");
        download.raycastTarget = true;
        var downloadButton = download.gameObject.AddComponent<Button>();
        downloadButton.targetGraphic = download;
        var monster = (GameObject)PrefabUtility.InstantiatePrefab(AssetDatabase.LoadAssetAtPath<GameObject>(Root + "Prefabs/Monster.prefab"), second);
        var monsterRect = (RectTransform)monster.transform;
        monsterRect.anchoredPosition = new Vector2(190, -346);
        monsterRect.sizeDelta = new Vector2(76, 124);
        monster.transform.Find("Rig").localScale = new Vector3(76f / 192, 124f / 396, 1);

        Img("Weapon Panel", second, 1124, 0, 924, 1080, null).color = new Color32(34, 34, 34, 255);
        Img("Title Top Rule", second, 1124, 116, 924, 3, null).color = Color.gray;
        Img("Title Bottom Rule", second, 1124, 225, 924, 3, null).color = Color.gray;
        Img("Destroy Everything", second, 1210, 145, 760, 68, "text/text_destroy_everything.png").color = new Color(0.7f, 0.7f, 0.7f);
        string[] names = { "turret", "minigun", "water_gun", "blue_pistol", "protogun", "cake" };
        var buttons = new Button[6];
        for (int i = 0; i < names.Length; i++)
        {
            var card = Img("Select " + names[i], second, 1168 + i % 3 * 287, 299 + i / 3 * 287, 264, 264, null);
            card.raycastTarget = true;
            buttons[i] = card.gameObject.AddComponent<Button>();
            buttons[i].targetGraphic = card;
            Img("Border", card.transform, 7, 7, 250, 250, null).color = new Color32(186, 186, 186, 255);
            Img("Face", card.transform, 16, 16, 232, 232, null).color = new Color32(125, 125, 125, 255);
            float height = i == 0 || i == 5 ? 176 : 118;
            float y = i == 0 || i == 5 ? 29 : 65;
            var icon = Img("Icon", card.transform, 25, y, 214, height, "castle_scene/icons/" + names[i] + "_trimmed.png");
            icon.preserveAspect = true;
            var label = Img("Label", card.transform, 18, i == 2 || i == 3 ? 171 : 205, 228, i == 2 || i == 3 ? 75 : 46,
                "text/text_" + names[i] + ".png");
            label.preserveAspect = true;
        }
        var ring = Rect("Selection Ring", second, 1587, 431, 0, 0);
        for (int i = 0; i < 32; i++)
        {
            float a = i * Mathf.PI * 2 / 32;
            var segment = Img("Segment " + i, ring, Mathf.Round(Mathf.Cos(a) * 180 / 12) * 12 - 12,
                Mathf.Round(Mathf.Sin(a) * 180 / 12) * 12 - 8, 28, 16, null);
            segment.color = new Color(1, 1, 1, 0.65f);
        }
        var hand = Img("Minigun Tutorial Hand", second, 1570, 423, 200, 200, null);
        hand.sprite = AssetDatabase.LoadAssetAtPath<Sprite>("Assets/Texture/UI/icon_hand.png");
        hand.preserveAspect = true;
        var fade = Img("Stage Fade", layout, 0, 0, 2048, 1080, null);
        fade.color = Color.black;
        fade.raycastTarget = true;
        fade.gameObject.SetActive(false);
        var stages = build.gameObject.AddComponent<BlockCraftStages>();
        var settings = new SerializedObject(stages);
        settings.FindProperty("_buildStage").objectReferenceValue = first.gameObject;
        settings.FindProperty("_castleStage").objectReferenceValue = second.gameObject;
        settings.FindProperty("_fade").objectReferenceValue = fade;
        settings.FindProperty("_gameManager").objectReferenceValue = data.FindProperty("_gameManager").objectReferenceValue;
        settings.FindProperty("_download").objectReferenceValue = downloadButton;
        settings.FindProperty("_hand").objectReferenceValue = hand.rectTransform;
        settings.FindProperty("_ring").objectReferenceValue = ring;
        settings.FindProperty("_castleMonster").objectReferenceValue = monster.GetComponent<Animator>();
        var array = settings.FindProperty("_weapons");
        array.arraySize = buttons.Length;
        for (int i = 0; i < buttons.Length; i++) array.GetArrayElementAtIndex(i).objectReferenceValue = buttons[i];
        settings.ApplyModifiedPropertiesWithoutUndo();
        var explosion = new SerializedObject(build.GetComponent<BlockCraftDetonation>());
        explosion.FindProperty("_stages").objectReferenceValue = stages;
        explosion.ApplyModifiedPropertiesWithoutUndo();
        // Preview stage two in the Editor; Awake restores stage one on Play.
        first.gameObject.SetActive(false);
        EditorSceneManager.MarkSceneDirty(build.gameObject.scene);
        EditorSceneManager.SaveScene(build.gameObject.scene);
        Selection.activeGameObject = second.gameObject;
    }

    private static RectTransform Rect(string name, Transform parent, float x, float y, float width, float height)
    {
        var rect = new GameObject(name, typeof(RectTransform)).GetComponent<RectTransform>();
        rect.SetParent(parent, false);
        rect.anchorMin = rect.anchorMax = rect.pivot = new Vector2(0, 1);
        rect.anchoredPosition = new Vector2(x, -y);
        rect.sizeDelta = new Vector2(width, height);
        return rect;
    }

    private static Image Img(string name, Transform parent, float x, float y, float w, float h, string asset)
    {
        var image = Rect(name, parent, x, y, w, h).gameObject.AddComponent<Image>();
        if (asset != null) image.sprite = AssetDatabase.LoadAssetAtPath<Sprite>(Root + "Art/" + asset);
        image.raycastTarget = false;
        return image;
    }
}
