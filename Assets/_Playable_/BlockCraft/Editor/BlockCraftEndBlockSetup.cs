using Playable;
using UnityEditor;
using UnityEditor.SceneManagement;
using UnityEngine;
using UnityEngine.UI;

public static class BlockCraftEndBlockSetup
{
    [MenuItem("Tools/Block Craft/Install Fullscreen End Block")]
    public static void Install()
    {
        if (EditorApplication.isPlaying) return;
        var controller = Object.FindFirstObjectByType<BlockCraftBuildController>();
        var data = new SerializedObject(controller);
        var manager = (GameManager)data.FindProperty("_gameManager").objectReferenceValue;
        var cell = (Image)data.FindProperty("_cells").GetArrayElementAtIndex(0).objectReferenceValue;
        var canvas = cell.GetComponentInParent<Canvas>().rootCanvas;
        var managerData = new SerializedObject(manager);
        var button = (Button)managerData.FindProperty("_btnBlock").objectReferenceValue;
        if (button == null)
            button = new GameObject("Button Block", typeof(RectTransform), typeof(Image), typeof(Button)).GetComponent<Button>();
        button.transform.SetParent(canvas.transform, false);
        button.transform.SetAsLastSibling();
        var rect = (RectTransform)button.transform;
        rect.anchorMin = Vector2.zero;
        rect.anchorMax = Vector2.one;
        rect.offsetMin = rect.offsetMax = Vector2.zero;
        rect.localScale = Vector3.one;
        var image = button.GetComponent<Image>();
        image.color = new Color(1, 1, 1, 0);
        image.raycastTarget = true;
        button.targetGraphic = image;
        button.transition = Selectable.Transition.None;
        button.interactable = true;
        button.gameObject.SetActive(false);
        managerData.FindProperty("_btnBlock").objectReferenceValue = button;
        managerData.ApplyModifiedPropertiesWithoutUndo();
        EditorSceneManager.MarkSceneDirty(manager.gameObject.scene);
        EditorSceneManager.SaveScene(manager.gameObject.scene);
        Debug.Log("Fullscreen Button Block saved: alpha 0, raycast enabled, assigned to GameManager.");
    }
}
