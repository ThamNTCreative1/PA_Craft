using System.IO;
using Playable;
using TMPro;
using UnityEditor;
using UnityEditor.SceneManagement;
using UnityEngine;
using UnityEngine.UI;

// Creates "Btn Drop" (a copy of the steal button) and assigns it to GameController. Runs once, rerun via the menu.
public static class DropButtonSetup
{
    private const string MarkerPath = "Library/DropButtonSetup.done";
    private const string ReportPath = "Library/DropButtonSetup.txt";
    private const string ButtonName = "Btn Drop";

    [InitializeOnLoadMethod]
    private static void AutoRunOnce()
    {
        if (File.Exists(MarkerPath)) return;
        EditorApplication.delayCall += () =>
        {
            if (EditorApplication.isPlayingOrWillChangePlaymode) return;
            Run();
        };
    }

    [MenuItem("Tools/Playable/Create Drop Button")]
    public static void Run()
    {
        var controller = Object.FindFirstObjectByType<GameController>(FindObjectsInactive.Include);
        if (controller == null)
        {
            File.WriteAllText(ReportPath, "ABORT: GameController not found in the open scene.");
            return;
        }

        var so = new SerializedObject(controller);
        var steal = so.FindProperty("_stealButton").objectReferenceValue as Button;
        if (steal == null)
        {
            File.WriteAllText(ReportPath, "ABORT: GameController has no steal button.");
            return;
        }

        Transform parent = steal.transform.parent;
        Transform existing = parent != null ? parent.Find(ButtonName) : null;
        GameObject go = existing != null ? existing.gameObject : Object.Instantiate(steal.gameObject, parent);
        go.name = ButtonName;
        go.SetActive(false);
        var button = go.GetComponent<Button>();
        button.onClick = new Button.ButtonClickedEvent();   // wired in code (GameController.DropEgg)
        int labels = 0;
        foreach (var tmp in go.GetComponentsInChildren<TMP_Text>(true)) { tmp.text = "DROP"; labels++; }
        foreach (var text in go.GetComponentsInChildren<Text>(true)) { text.text = "DROP"; labels++; }

        so.FindProperty("_dropButton").objectReferenceValue = button;
        so.ApplyModifiedPropertiesWithoutUndo();

        var scene = controller.gameObject.scene;
        EditorSceneManager.MarkSceneDirty(scene);
        bool saved = EditorSceneManager.SaveScene(scene);
        File.WriteAllText(ReportPath, $"{ButtonName} ready under '{(parent != null ? parent.name : "-")}', labels={labels}, scene saved={saved}");
        File.WriteAllText(MarkerPath, "done");
    }
}
