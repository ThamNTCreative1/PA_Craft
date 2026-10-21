using System.IO;
using Playable;
using UnityEditor;
using UnityEditor.SceneManagement;
using UnityEngine;
using UnityEngine.EventSystems;
using UnityEngine.UI;

public static class BlockCraftSceneBuilder
{
    private const string Art = "Assets/_Playable_/BlockCraft/Art/";

    [MenuItem("Tools/Block Craft/Normalize Block Icons")]
    public static void NormalizeBlockIcons()
    {
        if (EditorApplication.isPlaying) return;
        var controller = Object.FindFirstObjectByType<BlockCraftBuildController>();
        if (controller == null) throw new System.InvalidOperationException("Open Gameplay.");
        var buttons = new SerializedObject(controller).FindProperty("_materialButtons");
        Transform stage = null;
        for (int i = 0; i < buttons.arraySize; i++)
        {
            var button = (Button)buttons.GetArrayElementAtIndex(i).objectReferenceValue;
            NormalizeIcon(button.transform.Find("Block Icon").GetComponent<Image>());
            stage = button.transform.parent;
        }
        if (stage != null && stage.name == "Scene 1 - Build")
        {
            stage.gameObject.SetActive(true);
            var castle = stage.parent.Find("Scene 2 - Castle");
            if (castle != null) castle.gameObject.SetActive(false);
        }
        EditorSceneManager.MarkSceneDirty(controller.gameObject.scene);
        EditorSceneManager.SaveScene(controller.gameObject.scene);
        Debug.Log("All six block silhouettes normalized to 154 x 176 and centered.");
    }

    private static void NormalizeIcon(Image image)
    {
        // Transparent padding differs between the supplied PNGs. Size the visible
        // silhouette, rather than the full texture rectangle.
        var texture = new Texture2D(2, 2);
        try
        {
            texture.LoadImage(File.ReadAllBytes(AssetDatabase.GetAssetPath(image.sprite)));
            var pixels = texture.GetPixels32();
            int left = texture.width, right = -1, bottom = texture.height, top = -1;
            for (int y = 0; y < texture.height; y++)
                for (int x = 0; x < texture.width; x++)
                {
                    if (pixels[y * texture.width + x].a == 0) continue;
                    left = Mathf.Min(left, x);
                    right = Mathf.Max(right, x);
                    bottom = Mathf.Min(bottom, y);
                    top = Mathf.Max(top, y);
                }
            if (right < left) return;
            float width = 154f * texture.width / (right - left + 1);
            float height = 176f * texture.height / (top - bottom + 1);
            var rect = image.rectTransform;
            Undo.RecordObject(rect, "Normalize block icon");
            Undo.RecordObject(image, "Normalize block icon");
            rect.anchorMin = rect.anchorMax = rect.pivot = new Vector2(0, 1);
            rect.sizeDelta = new Vector2(width, height);
            rect.anchoredPosition = new Vector2(
                132 - (left + right + 1) * 0.5f / texture.width * width,
                -132 + (texture.height - (bottom + top + 1) * 0.5f) / texture.height * height);
            image.preserveAspect = false;
        }
        finally { Object.DestroyImmediate(texture); }
    }

    [MenuItem("Tools/Block Craft/Update Purple Block")]
    public static void UpdatePurpleBlock()
    {
        if (EditorApplication.isPlaying) return;
        var controller = Object.FindFirstObjectByType<BlockCraftBuildController>();
        if (controller == null) throw new System.InvalidOperationException("Open Gameplay.");
        string path = Art + "build_blocks/block_purple_front.png";
        var importer = (TextureImporter)AssetImporter.GetAtPath(path);
        importer.textureType = TextureImporterType.Sprite;
        importer.spriteImportMode = SpriteImportMode.Single;
        importer.mipmapEnabled = false;
        importer.alphaIsTransparency = true;
        importer.filterMode = FilterMode.Point;
        importer.npotScale = TextureImporterNPOTScale.None;
        importer.maxTextureSize = 128;
        importer.SaveAndReimport();
        var data = new SerializedObject(controller);
        var tile = AssetDatabase.LoadAssetAtPath<Sprite>(path);
        data.FindProperty("_frontTiles").GetArrayElementAtIndex(3).objectReferenceValue = tile;
        data.FindProperty("_shadowTiles").GetArrayElementAtIndex(3).objectReferenceValue = tile;
        var button = (Button)data.FindProperty("_materialButtons").GetArrayElementAtIndex(3).objectReferenceValue;
        button.transform.Find("Block Icon").GetComponent<Image>().sprite = Sprite("blocks/block_purple.png");
        NormalizeIcon(button.transform.Find("Block Icon").GetComponent<Image>());
        data.ApplyModifiedProperties();
        EditorSceneManager.MarkSceneDirty(controller.gameObject.scene);
        EditorSceneManager.SaveScene(controller.gameObject.scene);
        Debug.Log("Purple icon and wall tile updated.");
    }

    [MenuItem("Tools/Block Craft/Configure Tap To Build")]
    public static void ConfigureTapToBuild()
    {
        var controller = Object.FindFirstObjectByType<BlockCraftBuildController>();
        var manager = Object.FindFirstObjectByType<GameManager>();
        if (controller == null || manager == null || EditorApplication.isPlaying)
            throw new System.InvalidOperationException("Open Gameplay in Edit Mode.");
        var data = new SerializedObject(controller);
        data.FindProperty("_initialRows").intValue = 0;
        data.ApplyModifiedProperties();
        var cells = data.FindProperty("_cells");
        for (int i = 0; i < cells.arraySize; i++)
            ((Image)cells.GetArrayElementAtIndex(i).objectReferenceValue).gameObject.SetActive(false);
        var settings = new SerializedObject(manager);
        settings.FindProperty("_waitForFirstInteraction").boolValue = true;
        settings.ApplyModifiedProperties();
        EditorSceneManager.MarkSceneDirty(controller.gameObject.scene);
        EditorSceneManager.SaveScene(controller.gameObject.scene);
    }

    [MenuItem("Tools/Block Craft/Build Gameplay Layout")]
    public static void Build()
    {
        var scene = UnityEngine.SceneManagement.SceneManager.GetActiveScene();
        if (scene.path != "Assets/_Playable_/Scenes/Gameplay.unity")
            throw new System.InvalidOperationException("Open Gameplay.unity before building this layout.");
        if (GameObject.Find("BlockCraft Gameplay") != null)
            throw new System.InvalidOperationException("Layout already exists; edit the scene objects directly.");

        foreach (string file in Directory.GetFiles(Art, "*.png", SearchOption.AllDirectories))
        {
            var importer = AssetImporter.GetAtPath(file.Replace('\\', '/')) as TextureImporter;
            if (importer == null) continue;
            importer.textureType = TextureImporterType.Sprite;
            importer.spriteImportMode = SpriteImportMode.Single;
            importer.spritePixelsPerUnit = 100;
            importer.mipmapEnabled = false;
            importer.alphaIsTransparency = true;
            importer.filterMode = FilterMode.Point;
            importer.npotScale = TextureImporterNPOTScale.None;
            importer.maxTextureSize = file.Contains("background") ? 2048 : 1024;
            importer.textureCompression = TextureImporterCompression.Compressed;
            importer.SaveAndReimport();
        }

        var root = new GameObject("BlockCraft Gameplay");
        Undo.RegisterCreatedObjectUndo(root, "Build Block Craft layout");
        var cameraObject = new GameObject("Main Camera", typeof(Camera), typeof(AudioListener));
        cameraObject.transform.SetParent(root.transform);
        cameraObject.tag = "MainCamera";
        cameraObject.transform.position = new Vector3(0, 0, -10);
        Camera camera = cameraObject.GetComponent<Camera>();
        camera.orthographic = true;
        camera.clearFlags = CameraClearFlags.SolidColor;
        camera.backgroundColor = new Color(0.13f, 0.13f, 0.13f);
        var light = new GameObject("Directional Light", typeof(Light));
        light.transform.SetParent(root.transform);
        light.GetComponent<Light>().type = LightType.Directional;
        light.transform.rotation = Quaternion.Euler(50, -30, 0);
        var events = new GameObject("EventSystem", typeof(EventSystem), typeof(StandaloneInputModule));
        events.transform.SetParent(root.transform);

        var canvasObject = new GameObject("Gameplay Canvas", typeof(RectTransform), typeof(Canvas),
            typeof(CanvasScaler), typeof(GraphicRaycaster));
        canvasObject.transform.SetParent(root.transform);
        var canvas = canvasObject.GetComponent<Canvas>();
        canvas.renderMode = RenderMode.ScreenSpaceCamera;
        canvas.worldCamera = camera;
        canvas.planeDistance = 10;
        var scaler = canvasObject.GetComponent<CanvasScaler>();
        scaler.uiScaleMode = CanvasScaler.ScaleMode.ScaleWithScreenSize;
        scaler.referenceResolution = new Vector2(2048, 1080);
        scaler.screenMatchMode = CanvasScaler.ScreenMatchMode.Expand;
        var design = Rect("Reference Layout 2048x1080", canvas.transform, 0, 0, 2048, 1080);
        design.anchorMin = design.anchorMax = new Vector2(0.5f, 0.5f);
        design.pivot = new Vector2(0.5f, 0.5f);
        design.anchoredPosition = Vector2.zero;
        ImageAt("Backdrop and Brand", design, 0, 0, 1124, 884,
            Sprite("backgrounds/scene_background_with_brand.png"));
        var ground = Rect("Ground Tiles", design, 0, 884, 1124, 196);
        ground.gameObject.AddComponent<RectMask2D>();
        for (int row = 0; row < 3; row++)
            for (int col = 0; col < 12; col++)
            {
                var tile = ImageAt("Floor " + row + "-" + col, ground, col * 100, row * 92, 100, 92,
                    Sprite("tiles/floor_tile.png"));
                tile.color = Color.Lerp(Color.white, Color.black, row * 0.36f);
            }

        var wall = Rect("Build Grid - 7 Columns", design, 0, 0, 1124, 884);
        Image[] cells = new Image[42];
        for (int row = 0; row < 6; row++)
            for (int col = 0; col < 7; col++)
            {
                Vector2 p = BlockCraftBuildController.CellPosition(row, col);
                Image cell = ImageAt("Row " + (row + 1) + " Block " + (col + 1),
                    wall, p.x, -p.y, 72, 72, Sprite("build_blocks/wood_light_" +
                    (col == 0 || col == 6 ? "front" : "shadow") + ".png"));
                cell.gameObject.SetActive(false);
                cells[row * 7 + col] = cell;
            }
        ImageAt("Green Character", design, 548, 611, 134, 276, Sprite("sprites/character_green.png"));

        ImageAt("Material Panel", design, 1124, 0, 924, 1080, null).color = new Color32(34, 34, 34, 255);
        ImageAt("Title Top Rule", design, 1124, 101, 924, 3, null).color = new Color32(170, 170, 170, 255);
        ImageAt("Title Bottom Rule", design, 1124, 237, 924, 3, null).color = new Color32(170, 170, 170, 255);
        ImageAt("Tap To Build", design, 1310, 141, 560, 76, Sprite("text/text_tap_to_build.png"));
        string[] names = { "wood_light", "wood_red", "wood_oak", "block_purple", "wood_dark", "brick_red" };
        Button[] buttons = new Button[6];
        for (int i = 0; i < 6; i++)
        {
            float x = 1168 + (i % 3) * 287;
            float y = 299 + (i / 3) * 287;
            var outer = ImageAt("Select " + names[i], design, x, y, 264, 264, null);
            var button = outer.gameObject.AddComponent<Button>();
            button.targetGraphic = outer;
            var colors = button.colors;
            colors.disabledColor = Color.white;
            colors.pressedColor = new Color(0.75f, 0.9f, 0.75f);
            button.colors = colors;
            outer.raycastTarget = true;
            ImageAt("Silver Border", outer.transform, 7, 7, 250, 250, null).color = new Color32(180, 183, 181, 255);
            ImageAt("Inner Bevel", outer.transform, 13, 13, 238, 238, null).color = new Color32(130, 135, 132, 255);
            ImageAt("Card Face", outer.transform, 18, 18, 228, 228, null).color = new Color32(86, 91, 88, 255);
            var icon = ImageAt("Block Icon", outer.transform, 55, 45, 154, 176, Sprite("blocks/" + names[i] + ".png"));
            icon.preserveAspect = true;
            NormalizeIcon(icon);
            buttons[i] = button;
        }
        var tutorial = Rect("Tutorial Pointer", design, 1280, 426, 190, 190);
        var hand = AssetDatabase.LoadAssetAtPath<Sprite>("Assets/Texture/UI/icon_hand.png");
        if (hand != null)
        {
            var image = tutorial.gameObject.AddComponent<Image>();
            image.sprite = hand;
            image.preserveAspect = true;
            image.raycastTarget = false;
        }
        var cta = ImageAt("Download Hit Area", design, 40, 184, 382, 83, null);
        cta.color = Color.clear;
        cta.raycastTarget = true;
        var download = cta.gameObject.AddComponent<Button>();
        download.targetGraphic = cta;
        var controller = root.AddComponent<BlockCraftBuildController>();
        var data = new SerializedObject(controller);
        data.FindProperty("_gameManager").objectReferenceValue = Object.FindFirstObjectByType<GameManager>();
        SetArray(data, "_materialButtons", buttons);
        SetArray(data, "_cells", cells);
        string[] tileNames = { "wood_light", "wood_red", "wood_oak", "block_purple", "wood_dark_orange", "brick_red" };
        Sprite[] fronts = new Sprite[6], shadows = new Sprite[6];
        for (int i = 0; i < 6; i++)
        {
            fronts[i] = Sprite("build_blocks/" + tileNames[i] + "_front.png");
            shadows[i] = i == 3 ? fronts[i] : Sprite("build_blocks/" + tileNames[i] + "_shadow.png");
        }
        SetArray(data, "_frontTiles", fronts);
        SetArray(data, "_shadowTiles", shadows);
        data.FindProperty("_tutorial").objectReferenceValue = tutorial;
        data.FindProperty("_download").objectReferenceValue = download;
        data.ApplyModifiedPropertiesWithoutUndo();
        ConfigureTapToBuild();
        EditorSceneManager.MarkSceneDirty(scene);
        EditorSceneManager.SaveScene(scene);
        Selection.activeGameObject = root;
        Debug.Log("Block Craft layout saved in Gameplay.unity.");
    }

    private static Sprite Sprite(string path)
    {
        var result = AssetDatabase.LoadAssetAtPath<Sprite>(Art + path);
        if (result == null) throw new System.IO.FileNotFoundException(Art + path);
        return result;
    }

    private static RectTransform Rect(string name, Transform parent, float x, float y, float w, float h)
    {
        var go = new GameObject(name, typeof(RectTransform));
        var rect = (RectTransform)go.transform;
        rect.SetParent(parent, false);
        rect.anchorMin = rect.anchorMax = rect.pivot = new Vector2(0, 1);
        rect.anchoredPosition = new Vector2(x, -y);
        rect.sizeDelta = new Vector2(w, h);
        return rect;
    }

    private static Image ImageAt(string name, Transform parent, float x, float y, float w, float h, Sprite sprite)
    {
        var image = Rect(name, parent, x, y, w, h).gameObject.AddComponent<Image>();
        image.sprite = sprite;
        image.raycastTarget = false;
        return image;
    }

    private static void SetArray(SerializedObject data, string field, Object[] values)
    {
        var array = data.FindProperty(field);
        array.arraySize = values.Length;
        for (int i = 0; i < values.Length; i++) array.GetArrayElementAtIndex(i).objectReferenceValue = values[i];
    }
}
