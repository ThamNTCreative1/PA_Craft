using System.IO;
using System.Text;
using Minigames.StealAnEgg.GamePlay;
using Playable;
using TMPro;
using UnityEditor;
using UnityEditor.SceneManagement;
using UnityEngine;
using UnityEngine.SceneManagement;
using UnityEngine.UI;

// Wires the steal -> hatch -> claim flow into the Gameplay scene. Runs once automatically, rerun via the menu.
[InitializeOnLoad]
public static class HatchFlowSetup
{
    private const string ScenePath = "Assets/_Playable_/Scenes/Gameplay.unity";
    private const string MarkerPath = "Library/HatchFlowSetup.done";
    private const string ReportPath = "Library/HatchFlowSetup.txt";
    private const string Root = "Assets/MiniGames/StealAnEgg/";

    static HatchFlowSetup()
    {
        if (File.Exists(MarkerPath)) return;
        EditorApplication.delayCall += TryAutoRun;
    }

    private static void TryAutoRun()
    {
        if (EditorApplication.isPlayingOrWillChangePlaymode || EditorApplication.isCompiling)
        {
            EditorApplication.playModeStateChanged -= OnPlayModeChanged;
            EditorApplication.playModeStateChanged += OnPlayModeChanged;
            return;
        }

        Run();
    }

    private static void OnPlayModeChanged(PlayModeStateChange change)
    {
        if (change != PlayModeStateChange.EnteredEditMode) return;
        EditorApplication.playModeStateChanged -= OnPlayModeChanged;
        EditorApplication.delayCall += TryAutoRun;
    }

    [MenuItem("Tools/Playable/Setup Hatch Flow")]
    public static void Run()
    {
        var log = new StringBuilder();
        try
        {
            Scene scene = SceneManager.GetActiveScene();
            if (scene.path != ScenePath)
            {
                if (scene.isDirty)
                {
                    Report(log.AppendLine($"ABORT: active scene '{scene.path}' has unsaved changes; open {ScenePath} and rerun Tools/Playable/Setup Hatch Flow."), false);
                    return;
                }

                scene = EditorSceneManager.OpenScene(ScenePath, OpenSceneMode.Single);
            }

            var controller = Object.FindFirstObjectByType<GameController>(FindObjectsInactive.Include);
            if (controller == null)
            {
                Report(log.AppendLine("ABORT: GameController not found."), false);
                return;
            }

            var so = new SerializedObject(controller);
            var player = so.FindProperty("_player").objectReferenceValue as Component;
            var egg = so.FindProperty("_egg").objectReferenceValue as Component;
            var stealButton = so.FindProperty("_stealButton").objectReferenceValue as Button;

            // Finish line + Home spot.
            var homeProp = so.FindProperty("_home");
            var hatchHomeProp = so.FindProperty("_hatchHome");
            Transform home = homeProp.objectReferenceValue as Transform;
            if (home == null)
            {
                home = FindByName("Home", "Flag", "Finish");
                if (home == null) home = CreateFinishLine(player, egg, log);
                homeProp.objectReferenceValue = home;
                log.AppendLine($"_home = {home.name} at {home.position}");
            }

            Transform hatchHome = hatchHomeProp.objectReferenceValue as Transform;
            if (hatchHome == null)
            {
                hatchHome = GetOrCreate("HatchHome", null).transform;
                if (player != null)
                {
                    // Player's start is the home base; the finish line sits between it and the egg.
                    hatchHome.position = player.transform.position;
                }
                hatchHomeProp.objectReferenceValue = hatchHome;
                log.AppendLine($"_hatchHome = HatchHome at {hatchHome.position}");
            }

            // Egg break pool (break FX, crack sound, open sound).
            var poolGo = GetOrCreate("EggBreakPool", null);
            var pool = GetOrAdd<SAE_EggBreakPool>(poolGo);
            var openSource = GetOrAdd<AudioSource>(poolGo);
            openSource.playOnAwake = false;
            openSource.clip = Load<AudioClip>("Sounds/EggOpen1.mp3", log);
            var poolSo = new SerializedObject(pool);
            poolSo.FindProperty("sample").objectReferenceValue = Load<GameObject>("FXs/EggBreak/[Fx] EggBreak.prefab", log);
            poolSo.FindProperty("eggCrackSoundSample").objectReferenceValue = Load<GameObject>("Prefabs/EggBreakHotspot.prefab", log);
            poolSo.FindProperty("eggOpenCompletedSound").objectReferenceValue = openSource;
            poolSo.ApplyModifiedPropertiesWithoutUndo();
            log.AppendLine("EggBreakPool ready");

            // Incubator.
            var incubatorGo = GetOrCreate("EggIncubator", null);
            var incubator = GetOrAdd<SAE_EggIncubator>(incubatorGo);
            var incSo = new SerializedObject(incubator);
            var eggPrefab = Load<GameObject>("Prefabs/Eggs/Chicken_Egg Variant.prefab", log);
            var displayPrefab = Load<GameObject>("Prefabs/IncubateTimeDisplayment.prefab", log);
            incSo.FindProperty("eggPrefab").objectReferenceValue = eggPrefab ? eggPrefab.GetComponent<SAE_Egg>() : null;
            incSo.FindProperty("displaymentPrefab").objectReferenceValue = displayPrefab ? displayPrefab.GetComponent<SAE_IncubateTimeDisplayment>() : null;
            incSo.FindProperty("eggContainer").objectReferenceValue = incubatorGo.transform;
            incSo.FindProperty("hatchingTime").floatValue = 3f;
            incSo.FindProperty("autoHatch").boolValue = false;
            incSo.ApplyModifiedPropertiesWithoutUndo();
            so.FindProperty("_incubator").objectReferenceValue = incubator;
            log.AppendLine("EggIncubator ready");

            // Popup buttons cloned from the steal button so they share its look.
            if (stealButton == null)
            {
                log.AppendLine("WARN: _stealButton missing, buttons not created.");
            }
            else
            {
                so.FindProperty("_hatchButton").objectReferenceValue = CloneButton(stealButton, "Btn Hatch", "HATCH", log);
                so.FindProperty("_openButton").objectReferenceValue = CloneButton(stealButton, "Btn Open", "OPEN", log);
                so.FindProperty("_claimMoreButton").objectReferenceValue = CloneButton(stealButton, "Btn Claim More", "CLAIM MORE", log);
            }

            so.ApplyModifiedPropertiesWithoutUndo();
            EditorSceneManager.MarkSceneDirty(scene);
            bool saved = EditorSceneManager.SaveScene(scene);
            log.AppendLine(saved ? "Scene saved." : "WARN: scene save failed.");
            Report(log, true);
        }
        catch (System.Exception e)
        {
            Report(log.AppendLine("ERROR: " + e), false);
        }
    }

    private static Transform CreateFinishLine(Component player, Component egg, StringBuilder log)
    {
        var line = GetOrCreate("Home", null).transform;
        if (player != null && egg != null)
        {
            line.position = Vector3.Lerp(egg.transform.position, player.transform.position, 0.7f);
        }
        log.AppendLine("WARN: no finish line found, created placeholder 'Home' between egg and player start.");
        return line;
    }

    private static Button CloneButton(Button source, string name, string label, StringBuilder log)
    {
        Transform parent = source.transform.parent;
        Transform existing = parent != null ? parent.Find(name) : null;
        GameObject go = existing != null ? existing.gameObject : Object.Instantiate(source.gameObject, parent);
        go.name = name;
        go.SetActive(false);

        var button = go.GetComponent<Button>();
        button.onClick = new Button.ButtonClickedEvent();

        bool labelled = false;
        foreach (var tmp in go.GetComponentsInChildren<TMP_Text>(true)) { tmp.text = label; labelled = true; }
        foreach (var text in go.GetComponentsInChildren<Text>(true)) { text.text = label; labelled = true; }
        if (!labelled)
        {
            var labelGo = new GameObject("Label", typeof(RectTransform));
            labelGo.transform.SetParent(go.transform, false);
            var rect = (RectTransform)labelGo.transform;
            rect.anchorMin = Vector2.zero;
            rect.anchorMax = Vector2.one;
            rect.offsetMin = rect.offsetMax = Vector2.zero;
            var tmp = labelGo.AddComponent<TextMeshProUGUI>();
            tmp.text = label;
            tmp.alignment = TextAlignmentOptions.Center;
            tmp.enableAutoSizing = true;
            tmp.fontStyle = FontStyles.Bold;
            log.AppendLine($"{name}: steal button had no text, added TMP label.");
        }

        log.AppendLine($"{name} ready ({label})");
        return button;
    }

    private static T GetOrAdd<T>(GameObject go) where T : Component
    {
        var c = go.GetComponent<T>();
        return c != null ? c : go.AddComponent<T>();
    }

    private static GameObject GetOrCreate(string name, Transform parent)
    {
        var found = FindByName(name);
        return found != null ? found.gameObject : new GameObject(name);
    }

    private static Transform FindByName(params string[] names)
    {
        foreach (var t in Object.FindObjectsByType<Transform>(FindObjectsInactive.Include, FindObjectsSortMode.None))
        {
            if (t.parent != null && t.GetComponentInParent<Canvas>(true) != null) continue;
            foreach (var n in names)
                if (string.Equals(t.name, n, System.StringComparison.OrdinalIgnoreCase)) return t;
        }
        return null;
    }

    private static T Load<T>(string relative, StringBuilder log) where T : Object
    {
        var asset = AssetDatabase.LoadAssetAtPath<T>(Root + relative);
        if (asset == null) log.AppendLine("WARN: missing asset " + Root + relative);
        return asset;
    }

    private static void Report(StringBuilder log, bool done)
    {
        File.WriteAllText(ReportPath, log.ToString());
        if (done) File.WriteAllText(MarkerPath, System.DateTime.Now.ToString("O"));
        Debug.Log("[HatchFlowSetup]\n" + log);
    }
}
