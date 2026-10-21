using Playable;
using TMPro;
using UnityEditor;
using UnityEditor.SceneManagement;
using UnityEngine;
using UnityEngine.UI;
using Object = UnityEngine.Object;

public static class BlockCraftCastlePolish
{
    [MenuItem("Tools/Block Craft/Polish Castle UI")]
    public static void Apply()
    {
        if (EditorApplication.isPlaying) return;
        var stages = Object.FindFirstObjectByType<BlockCraftStages>();
        if (stages == null) throw new System.InvalidOperationException("Open Gameplay.");
        var data = new SerializedObject(stages);
        var first = ((GameObject)data.FindProperty("_buildStage").objectReferenceValue).transform;
        var second = ((GameObject)data.FindProperty("_castleStage").objectReferenceValue).transform;
        foreach (string name in new[] { "App Icon", "Brand Block", "Brand Craft", "Download" })
            Remove(second.Find(name));
        Remove(first.Find("Download Hit Area"));
        data.FindProperty("_download").objectReferenceValue = null;
        var build = stages.GetComponent<BlockCraftBuildController>();
        var buildData = new SerializedObject(build);
        buildData.FindProperty("_download").objectReferenceValue = null;
        buildData.ApplyModifiedPropertiesWithoutUndo();

        // Use the exact same pointer asset, dimensions and card-relative offset as stage one.
        var sourceHand = (RectTransform)buildData.FindProperty("_tutorial").objectReferenceValue;
        var sourceButton = (Button)buildData.FindProperty("_materialButtons").GetArrayElementAtIndex(0).objectReferenceValue;
        var targetButton = (Button)data.FindProperty("_weapons").GetArrayElementAtIndex(1).objectReferenceValue;
        var hand = (RectTransform)data.FindProperty("_hand").objectReferenceValue;
        hand.sizeDelta = sourceHand.sizeDelta;
        hand.pivot = sourceHand.pivot;
        hand.anchoredPosition = ((RectTransform)targetButton.transform).anchoredPosition +
            sourceHand.anchoredPosition - ((RectTransform)sourceButton.transform).anchoredPosition;
        hand.localScale = Vector3.one;
        hand.GetComponent<Image>().sprite = sourceHand.GetComponent<Image>().sprite;
        if (sourceHand.GetComponent<BlockCraftTapTutorial>() == null)
            sourceHand.gameObject.AddComponent<BlockCraftTapTutorial>();
        if (hand.GetComponent<BlockCraftTapTutorial>() == null)
            hand.gameObject.AddComponent<BlockCraftTapTutorial>();
        Remove(second.Find("Selection Ring"));
        data.FindProperty("_ring").objectReferenceValue = null;
        data.ApplyModifiedPropertiesWithoutUndo();

        var font = AssetDatabase.LoadAssetAtPath<TMP_FontAsset>("Assets/TextMesh Pro/Fonts/FFFFORWA SDF.asset");
        if (font == null) throw new System.InvalidOperationException("Pixel font is missing.");
        string materialPath = "Assets/_Playable_/BlockCraft/Art/WeaponLabel.mat";
        var material = AssetDatabase.LoadAssetAtPath<Material>(materialPath);
        if (material == null)
        {
            material = new Material(font.material);
            material.name = "WeaponLabel";
            AssetDatabase.CreateAsset(material, materialPath);
        }
        material.SetFloat(ShaderUtilities.ID_OutlineWidth, 0.32f);
        material.SetColor(ShaderUtilities.ID_OutlineColor, Color.black);
        string[] names = { "turret", "minigun", "water_gun", "blue_pistol", "protogun", "cake" };
        string[] titles = { "TURRET", "MINIGUN", "WATER\nGUN", "BLUE\nPISTOL", "PROTOGUN", "CAKE" };
        for (int i = 0; i < names.Length; i++)
        {
            var card = second.Find("Select " + names[i]);
            Remove(card.Find("Label"));
            var rect = Rect("Label", card, 14, 178, 236, 72);
            var text = rect.gameObject.AddComponent<TextMeshProUGUI>();
            text.font = font;
            text.fontSharedMaterial = material;
            text.text = titles[i];
            text.color = Color.white;
            text.fontSize = 27;
            text.extraPadding = true;
            text.UpdateMeshPadding();
            text.alignment = TextAlignmentOptions.Center;
            text.raycastTarget = false;
            text.enableAutoSizing = false;
            text.overflowMode = TextOverflowModes.Overflow;
            var icon = card.Find("Icon").GetComponent<RectTransform>();
            icon.pivot = new Vector2(0.5f, 0.5f);
            icon.anchoredPosition = new Vector2(132, -97);
            icon.sizeDelta = new Vector2(224, 148);
        }
        // Reuse the background's own stone pixels as foreground occluders.
        // The gaps between battlements remain open, revealing the monster behind them.
        Remove(second.Find("Castle Foreground"));
        var foreground = Rect("Castle Foreground", second, 0, 0, 1124, 1080);
        var monster = (Animator)data.FindProperty("_castleMonster").objectReferenceValue;
        // Lower the standing pose so both feet are behind the solid parapet,
        // rather than showing in the gap between the two battlements.
        ((RectTransform)monster.transform).anchoredPosition = new Vector2(190, -374);
        foreground.SetSiblingIndex(monster.transform.GetSiblingIndex() + 1);
        var background = second.Find("Castle Background").GetComponent<Image>();
        Patch(foreground, background.sprite.texture, "Left Battlement", 190, 442, 33, 27);
        Patch(foreground, background.sprite.texture, "Right Battlement", 253, 442, 26, 27);
        Patch(foreground, background.sprite.texture, "Solid Parapet", 0, 469, 279, 39);
        first.gameObject.SetActive(false);
        second.gameObject.SetActive(true);
        EditorUtility.SetDirty(material);
        AssetDatabase.SaveAssets();
        EditorSceneManager.MarkSceneDirty(stages.gameObject.scene);
        EditorSceneManager.SaveScene(stages.gameObject.scene);
        Debug.Log("Castle polished: branding removed, foreground occlusion, readable labels, synchronized tutorial.");
    }

    private static void Patch(Transform parent, Texture texture, string name, float x, float y, float w, float h)
    {
        var image = Rect(name, parent, x, y, w, h).gameObject.AddComponent<RawImage>();
        image.texture = texture;
        image.uvRect = new Rect(x / 1124, 1 - (y + h) / 1080, w / 1124, h / 1080);
        image.raycastTarget = false;
    }

    private static void Remove(Transform target)
    {
        if (target != null) Undo.DestroyObjectImmediate(target.gameObject);
    }

    private static RectTransform Rect(string name, Transform parent, float x, float y, float w, float h)
    {
        var rect = new GameObject(name, typeof(RectTransform)).GetComponent<RectTransform>();
        rect.SetParent(parent, false);
        rect.anchorMin = rect.anchorMax = rect.pivot = new Vector2(0, 1);
        rect.anchoredPosition = new Vector2(x, -y);
        rect.sizeDelta = new Vector2(w, h);
        return rect;
    }
}
