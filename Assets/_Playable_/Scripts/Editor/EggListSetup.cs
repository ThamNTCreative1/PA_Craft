using System.IO;
using System.Linq;
using System.Text;
using Playable;
using UnityEditor;
using UnityEditor.SceneManagement;
using UnityEngine;

// Fills GameController._eggs with every stealable Egg in the open scene. Runs once, rerun via the menu.
public static class EggListSetup
{
    private const string MarkerPath = "Library/EggListSetup.done";
    private const string ReportPath = "Library/EggListSetup.txt";

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

    [MenuItem("Tools/Playable/Assign All Eggs")]
    public static void Run()
    {
        var log = new StringBuilder();
        var controller = Object.FindFirstObjectByType<GameController>(FindObjectsInactive.Include);
        if (controller == null)
        {
            File.WriteAllText(ReportPath, "ABORT: GameController not found in the open scene.");
            return;
        }

        var eggs = Object.FindObjectsByType<Egg>(FindObjectsInactive.Include, FindObjectsSortMode.None)
            .OrderBy(e => e.transform.position.x).ToList();
        var so = new SerializedObject(controller);
        var list = so.FindProperty("_eggs");
        list.arraySize = eggs.Count;
        for (int i = 0; i < eggs.Count; i++)
        {
            list.GetArrayElementAtIndex(i).objectReferenceValue = eggs[i];
            log.AppendLine($"{eggs[i].name} at {eggs[i].transform.position}");
        }

        so.ApplyModifiedPropertiesWithoutUndo();
        var scene = controller.gameObject.scene;
        EditorSceneManager.MarkSceneDirty(scene);
        log.AppendLine(EditorSceneManager.SaveScene(scene) ? "Scene saved." : "WARN: scene save failed.");
        File.WriteAllText(ReportPath, $"{eggs.Count} eggs assigned\n" + log);
        File.WriteAllText(MarkerPath, "done");
        Debug.Log("[EggListSetup] " + eggs.Count + " eggs assigned\n" + log);
    }
}
