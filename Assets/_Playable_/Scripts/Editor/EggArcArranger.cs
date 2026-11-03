using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using Playable;
using UnityEditor;
using UnityEditor.SceneManagement;
using UnityEngine;

// Lays egg slots on an arc in front of the boss, curving around it (boss = arc centre).
// Slots: current Hierarchy selection, else scene objects whose name contains "slot".
public class EggArcArranger : EditorWindow
{
    private const string MarkerPath = "Library/EggArcArranger.done";
    private const string ReportPath = "Library/EggArcArranger.txt";

    private Transform boss;
    private float radius = 5f;
    private float arcAngle = 150f;
    private bool faceBoss = true;
    private bool snapToGround = true;

    [InitializeOnLoadMethod]
    private static void AutoRunOnce()
    {
        if (File.Exists(MarkerPath)) return;
        EditorApplication.delayCall += () =>
        {
            if (EditorApplication.isPlayingOrWillChangePlaymode) return;
            var log = new StringBuilder();
            var slots = FindSlots(log);
            var bossTransform = FindBoss();
            if (bossTransform == null || slots.Count == 0)
            {
                log.AppendLine("ABORT: boss or slots not found. Open Tools/Playable/Egg Arc Arranger and select the slots.");
                File.WriteAllText(ReportPath, log.ToString());
                File.WriteAllText(MarkerPath, "skipped");
                return;
            }

            Arrange(bossTransform, slots, 5f, 150f, true, true, log);
            EditorSceneManager.SaveScene(bossTransform.gameObject.scene);
            log.AppendLine("Scene saved.");
            File.WriteAllText(ReportPath, log.ToString());
            File.WriteAllText(MarkerPath, "done");
        };
    }

    [MenuItem("Tools/Playable/Egg Arc Arranger")]
    private static void Open()
    {
        var window = GetWindow<EggArcArranger>("Egg Arc");
        window.boss = FindBoss();
    }

    private void OnGUI()
    {
        boss = (Transform)EditorGUILayout.ObjectField("Boss", boss, typeof(Transform), true);
        radius = EditorGUILayout.FloatField("Radius", radius);
        arcAngle = EditorGUILayout.Slider("Arc Angle", arcAngle, 10f, 300f);
        faceBoss = EditorGUILayout.Toggle("Face Boss", faceBoss);
        snapToGround = EditorGUILayout.Toggle("Snap To Ground", snapToGround);

        var log = new StringBuilder();
        var slots = FindSlots(log);
        EditorGUILayout.HelpBox($"{slots.Count} slot(s): " + string.Join(", ", slots.Select(s => s.name)),
            MessageType.Info);

        using (new EditorGUI.DisabledScope(boss == null || slots.Count == 0))
        {
            if (GUILayout.Button("Arrange"))
            {
                Arrange(boss, slots, radius, arcAngle, faceBoss, snapToGround, log);
                EditorSceneManager.MarkSceneDirty(boss.gameObject.scene);
                Debug.Log("[EggArcArranger]\n" + log);
            }
        }
    }

    private static Transform FindBoss()
    {
        var controller = FindFirstObjectByType<GameController>(FindObjectsInactive.Include);
        if (controller == null) return null;
        var so = new SerializedObject(controller);
        var list = so.FindProperty("listBoss");
        if (list == null || list.arraySize == 0) return null;
        int index = Mathf.Clamp(so.FindProperty("TypeBoss").intValue, 0, list.arraySize - 1);
        var monster = list.GetArrayElementAtIndex(index).objectReferenceValue as Monster;
        return monster != null ? monster.transform : null;
    }

    private static List<Transform> FindSlots(StringBuilder log)
    {
        var selected = Selection.transforms.Where(t => t.gameObject.scene.IsValid()).ToList();
        if (selected.Count > 1) return selected.OrderBy(t => t.GetSiblingIndex()).ThenBy(t => t.name).ToList();

        var found = FindObjectsByType<Transform>(FindObjectsInactive.Include, FindObjectsSortMode.None)
            .Where(t => t.name.ToLowerInvariant().Contains("slot") && t.GetComponentInParent<Canvas>(true) == null)
            .ToList();
        // Prefer the deepest-level matches (a parent "EggSlots" holds the actual slots).
        found = found.Where(t => !found.Any(o => o != t && o.IsChildOf(t))).ToList();
        log.AppendLine("Slots by name: " + string.Join(", ", found.Select(t => t.name)));
        return found.OrderBy(t => t.parent != null ? t.parent.GetInstanceID() : 0)
            .ThenBy(t => t.GetSiblingIndex()).ThenBy(t => t.name).ToList();
    }

    private static void Arrange(Transform boss, List<Transform> slots, float radius, float arcAngle, bool faceBoss,
        bool snapToGround, StringBuilder log)
    {
        Vector3 center = boss.position;
        Vector3 forward = boss.forward;
        forward.y = 0f;
        forward = forward.sqrMagnitude > 0.0001f ? forward.normalized : Vector3.forward;

        int count = slots.Count;
        for (int i = 0; i < count; i++)
        {
            // Spread from left to right across the arc, centred on the boss's forward.
            float t = count == 1 ? 0.5f : i / (float)(count - 1);
            float angle = Mathf.Lerp(-arcAngle * 0.5f, arcAngle * 0.5f, t);
            Vector3 direction = Quaternion.AngleAxis(angle, Vector3.up) * forward;
            Vector3 position = center + direction * radius;
            position.y = snapToGround ? GroundY(position, boss, slots, center.y) : slots[i].position.y;

            Undo.RecordObject(slots[i], "Arrange Egg Arc");
            slots[i].position = position;
            if (faceBoss) slots[i].rotation = Quaternion.LookRotation(-direction, Vector3.up);
            log.AppendLine($"{slots[i].name}: angle {angle:0.#} pos {position}");
        }

        log.AppendLine($"Boss {boss.name} at {center}, radius {radius}, arc {arcAngle}");
    }

    private static float GroundY(Vector3 point, Transform boss, List<Transform> slots, float fallback)
    {
        var hits = Physics.RaycastAll(point + Vector3.up * 5f, Vector3.down, 20f, ~0, QueryTriggerInteraction.Ignore);
        float best = float.MaxValue, y = fallback;
        foreach (var hit in hits)
        {
            Transform h = hit.collider.transform;
            if (h.IsChildOf(boss) || slots.Any(s => h.IsChildOf(s)) || hit.collider.attachedRigidbody != null) continue;
            if (hit.distance < best)
            {
                best = hit.distance;
                y = hit.point.y;
            }
        }

        return y;
    }
}
