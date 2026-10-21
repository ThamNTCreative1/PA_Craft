using System.Collections.Generic;
using Playable;
using UnityEditor;
using UnityEditor.SceneManagement;
using UnityEngine;
using UnityEngine.UI;

public static class BlockCraftResponsiveSetup
{
    [MenuItem("Tools/Block Craft/Preview Responsive Layout")]
    public static void Preview()
    {
        var stages = Object.FindFirstObjectByType<BlockCraftStages>();
        var data = new SerializedObject(stages);
        var first = (GameObject)data.FindProperty("_buildStage").objectReferenceValue;
        var second = (GameObject)data.FindProperty("_castleStage").objectReferenceValue;
        var canvas = first.GetComponentInParent<Canvas>().rootCanvas;
        var camera = canvas.worldCamera;
        var layout = stages.GetComponent<BlockCraftResponsiveLayout>();
        bool firstActive = first.activeSelf, secondActive = second.activeSelf;
        var oldTarget = camera.targetTexture;
        var oldActive = RenderTexture.active;
        System.IO.Directory.CreateDirectory("Temp/BlockCraftBackup");
        try
        {
            foreach (var size in new[] { new Vector2Int(540, 960), new Vector2Int(960, 540) })
            {
                var target = new RenderTexture(size.x, size.y, 24);
                camera.targetTexture = target;
                for (int i = 0; i < 2; i++)
                {
                    first.SetActive(i == 0);
                    second.SetActive(i == 1);
                    Canvas.ForceUpdateCanvases();
                    layout.ApplyLayout(((RectTransform)canvas.transform).rect.size);
                    Canvas.ForceUpdateCanvases();
                    camera.Render();
                    RenderTexture.active = target;
                    var texture = new Texture2D(size.x, size.y, TextureFormat.RGB24, false);
                    texture.ReadPixels(new Rect(0, 0, size.x, size.y), 0, 0);
                    texture.Apply();
                    System.IO.File.WriteAllBytes("Temp/BlockCraftBackup/layout-" + size.x + "-stage-" + (i + 1) + ".png", texture.EncodeToPNG());
                    Object.DestroyImmediate(texture);
                }
                camera.targetTexture = oldTarget;
                RenderTexture.active = oldActive;
                Object.DestroyImmediate(target);
            }
        }
        finally
        {
            camera.targetTexture = oldTarget;
            RenderTexture.active = oldActive;
            first.SetActive(firstActive);
            second.SetActive(secondActive);
            Canvas.ForceUpdateCanvases();
            layout.ApplyLayout(((RectTransform)canvas.transform).rect.size);
        }
        Debug.Log("Responsive previews captured for portrait and landscape, both stages.");
    }

    [MenuItem("Tools/Block Craft/Install Responsive Layout")]
    public static void Install()
    {
        if (EditorApplication.isPlaying) return;
        var stages = Object.FindFirstObjectByType<BlockCraftStages>();
        var data = new SerializedObject(stages);
        var first = (GameObject)data.FindProperty("_buildStage").objectReferenceValue;
        var second = (GameObject)data.FindProperty("_castleStage").objectReferenceValue;
        var design = (RectTransform)first.transform.parent;
        var canvas = design.GetComponentInParent<Canvas>().rootCanvas;
        Stretch(design);
        var gameplay = new RectTransform[2];
        var ui = new RectTransform[2];
        var stageObjects = new[] { first, second };
        for (int i = 0; i < stageObjects.Length; i++)
        {
            var stage = (RectTransform)stageObjects[i].transform;
            Stretch(stage);
            gameplay[i] = stage.Find("Gameplay Area") as RectTransform;
            ui[i] = stage.Find("UI Area") as RectTransform;
            if (gameplay[i] != null && ui[i] != null) continue;
            var children = new List<RectTransform>();
            foreach (Transform child in stage) children.Add((RectTransform)child);
            gameplay[i] = Group("Gameplay Area", stage, new Vector2(1124, 1080));
            ui[i] = Group("UI Area", stage, new Vector2(924, 1080));
            foreach (var child in children)
            {
                bool isUi = child.anchoredPosition.x >= 1124;
                child.SetParent(isUi ? ui[i] : gameplay[i], false);
                if (isUi) child.anchoredPosition -= new Vector2(1124, 0);
            }
        }
        Stretch(((Image)data.FindProperty("_fade").objectReferenceValue).rectTransform);
        var layout = stages.GetComponent<BlockCraftResponsiveLayout>();
        if (layout == null) layout = stages.gameObject.AddComponent<BlockCraftResponsiveLayout>();
        var settings = new SerializedObject(layout);
        settings.FindProperty("_canvas").objectReferenceValue = canvas.transform;
        SetArray(settings.FindProperty("_gameplay"), gameplay);
        SetArray(settings.FindProperty("_ui"), ui);
        settings.ApplyModifiedPropertiesWithoutUndo();
        layout.ApplyLayout(((RectTransform)canvas.transform).rect.size);
        EditorSceneManager.MarkSceneDirty(stages.gameObject.scene);
        EditorSceneManager.SaveScene(stages.gameObject.scene);
        Debug.Log("Responsive layout saved for both stages: portrait UI above gameplay.");
    }

    private static RectTransform Group(string name, Transform parent, Vector2 size)
    {
        var rect = new GameObject(name, typeof(RectTransform)).GetComponent<RectTransform>();
        rect.SetParent(parent, false);
        rect.sizeDelta = size;
        return rect;
    }

    private static void Stretch(RectTransform rect)
    {
        rect.anchorMin = Vector2.zero;
        rect.anchorMax = Vector2.one;
        rect.offsetMin = rect.offsetMax = Vector2.zero;
        rect.localScale = Vector3.one;
    }

    private static void SetArray(SerializedProperty array, RectTransform[] values)
    {
        array.arraySize = values.Length;
        for (int i = 0; i < values.Length; i++)
            array.GetArrayElementAtIndex(i).objectReferenceValue = values[i];
    }
}
