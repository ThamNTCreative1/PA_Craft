using System.IO;
using System.Text;
using Playable;
using UnityEditor;
using UnityEditor.SceneManagement;
using UnityEngine;

// Applies the "longer rests, short legs" patrol tuning to every boss in the open scene. Runs once, rerun via the menu.
public static class MonsterPatrolSetup
{
    private const string MarkerPath = "Library/MonsterPatrolSetup.done";
    private const string ReportPath = "Library/MonsterPatrolSetup.txt";

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

    [MenuItem("Tools/Playable/Apply Monster Patrol Tuning")]
    public static void Run()
    {
        var log = new StringBuilder();
        var monsters = Object.FindObjectsByType<Monster>(FindObjectsInactive.Include, FindObjectsSortMode.None);
        foreach (var monster in monsters)
        {
            var so = new SerializedObject(monster);
            so.FindProperty("_patrolWaitRange").vector2Value = new Vector2(3f, 6f);
            so.FindProperty("_patrolMaxStep").floatValue = 4f;
            so.FindProperty("_patrolRadius").floatValue = 2.5f;
            so.ApplyModifiedPropertiesWithoutUndo();
            EditorSceneManager.MarkSceneDirty(monster.gameObject.scene);
            log.AppendLine(monster.name);
        }

        bool saved = monsters.Length > 0 && EditorSceneManager.SaveScene(monsters[0].gameObject.scene);
        File.WriteAllText(ReportPath, $"{monsters.Length} monsters tuned, saved={saved}\n" + log);
        File.WriteAllText(MarkerPath, "done");
    }
}
