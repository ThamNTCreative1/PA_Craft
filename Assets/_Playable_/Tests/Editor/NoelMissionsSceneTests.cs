using Game.Events.Noel;
using NUnit.Framework;
using Playable;
using UnityEditor;
using UnityEditor.SceneManagement;
using UnityEngine;
using UnityEngine.SceneManagement;

/// <summary>Static wiring checks of the approved Noel missions scene setup (spec 2026-11-18-1600-noel-missions).</summary>
public class NoelMissionsSceneTests
{
    private const string ScenePath = "Assets/_Playable_/Scenes/Gameplay.unity";
    private Scene _scene;
    private bool _openedHere;

    [OneTimeSetUp]
    public void Open()
    {
        _scene = SceneManager.GetSceneByPath(ScenePath);
        if (!_scene.isLoaded)
        {
            _scene = EditorSceneManager.OpenScene(ScenePath, OpenSceneMode.Additive);
            _openedHere = true;
        }
    }

    [OneTimeTearDown]
    public void Close()
    {
        if (_openedHere) EditorSceneManager.CloseScene(_scene, true);
    }

    private GameObject Root(string name)
    {
        foreach (var go in _scene.GetRootGameObjects()) if (go.name == name) return go;
        return null;
    }

    [Test]
    public void OldMapRemoved_NoelEnvironmentPresent()
    {
        Assert.IsNull(Root("CityMap_Cropped"));
        Assert.IsNotNull(Root("CityMap_Noel"));
        Assert.IsNotNull(Root("[Noel] Snowfall"));
        Assert.IsNotNull(Root("[Noel] Christmas Trees"));
    }

    [Test]
    public void MissionManager_OrderIsPaintballFishingCar()
    {
        var manager = Root("Missions").GetComponent<MissionManager>();
        var missions = new SerializedObject(manager).FindProperty("_missions");
        Assert.AreEqual(3, missions.arraySize);
        Assert.IsInstanceOf<PaintballMissionController>(missions.GetArrayElementAtIndex(0).objectReferenceValue);
        Assert.IsInstanceOf<FishingMissionController>(missions.GetArrayElementAtIndex(1).objectReferenceValue);
        Assert.IsInstanceOf<CarMissionController>(missions.GetArrayElementAtIndex(2).objectReferenceValue);
        for (int i = 0; i < 3; i++)
        {
            var so = new SerializedObject(missions.GetArrayElementAtIndex(i).objectReferenceValue);
            Assert.IsNotNull(so.FindProperty("_spawnPoint").objectReferenceValue, "spawn point " + i);
        }
    }

    [Test]
    public void JournalRows_PointToMissionsInOrder()
    {
        var rows = Root("Canvas").transform.Find("MissionsJournalPanel").GetComponentsInChildren<MissionRowView>(true);
        Assert.AreEqual(3, rows.Length);
        System.Array.Sort(rows, (a, b) => ((RectTransform)b.transform).anchoredPosition.y.CompareTo(((RectTransform)a.transform).anchoredPosition.y));
        string[] ids = { "fire_paintball", "go_fishing", "drive_car_distance" };
        for (int i = 0; i < 3; i++)
        {
            var so = new SerializedObject(rows[i]);
            Assert.AreEqual(ids[i], so.FindProperty("_missionId").stringValue);
            Assert.IsNotNull(so.FindProperty("_mission").objectReferenceValue);
        }
    }

    [Test]
    public void FishingMission_IsWired()
    {
        var mission = Root("Missions").transform.Find("FishingMission").GetComponent<FishingMissionController>();
        var so = new SerializedObject(mission);
        Assert.IsNotNull(so.FindProperty("_fishing").objectReferenceValue);
        Assert.IsNotNull(so.FindProperty("_hud").objectReferenceValue);
        Assert.IsTrue(mission.IsAvailable);
        var controller = new SerializedObject(so.FindProperty("_fishing").objectReferenceValue);
        Assert.IsNotNull(controller.FindProperty("_player").objectReferenceValue);
        Assert.IsNotNull(controller.FindProperty("_line").objectReferenceValue);
        Assert.Greater(controller.FindProperty("_fishModels").arraySize, 0);
    }

    [Test]
    public void SkinSelector_HasThreeCompleteSkinsMatchingPlayerRig()
    {
        var selector = Root("[Noel] Skin Selector").GetComponent<NoelSkinSelector>();
        var so = new SerializedObject(selector);
        var player = (PlayerController)so.FindProperty("_player").objectReferenceValue;
        Assert.IsNotNull(player);
        int bones = player.GetComponentInChildren<SkinnedMeshRenderer>(true).bones.Length;
        var skins = so.FindProperty("_skins");
        Assert.AreEqual(3, skins.arraySize);
        string[] parts = { "body", "head", "leftArm", "rightArm", "leftLeg", "rightLeg" };
        for (int i = 0; i < skins.arraySize; i++)
        {
            var e = skins.GetArrayElementAtIndex(i);
            Assert.IsNotNull(e.FindPropertyRelative("material").objectReferenceValue);
            foreach (var p in parts)
            {
                var mesh = (Mesh)e.FindPropertyRelative(p).objectReferenceValue;
                Assert.IsNotNull(mesh, "skin " + i + " " + p);
                Assert.AreEqual(bones, mesh.bindposes.Length, "skin " + i + " " + p);
            }
        }
    }

    [Test]
    public void CarMission_VehicleReferencesAreWired()
    {
        var action = new SerializedObject(Root("Player").GetComponent<PlayerAction>());
        var cars = action.FindProperty("_cars");
        Assert.AreEqual(1, cars.arraySize, "PlayerAction._cars");
        Assert.IsNotNull(cars.GetArrayElementAtIndex(0).objectReferenceValue, "PlayerAction._cars[0]");
        Assert.IsNotNull(action.FindProperty("_carArrow").objectReferenceValue, "PlayerAction._carArrow");

        var game = new SerializedObject(Root("GameController").GetComponent<GameController>());
        Assert.IsNotNull(game.FindProperty("_carRide").FindPropertyRelative("_panel").objectReferenceValue, "_carRide._panel");
        Assert.IsNotNull(game.FindProperty("_carRide").FindPropertyRelative("_firstRideHint").objectReferenceValue, "_carRide._firstRideHint");
    }

    [Test]
    public void MotorbikeRemovedFromScene()
    {
        foreach (var root in _scene.GetRootGameObjects())
            foreach (var t in root.GetComponentsInChildren<Transform>(true))
            {
                string n = t.name.ToLowerInvariant();
                Assert.IsFalse(n.Contains("moto") || n.Contains("bike"), "motorbike object left: " + t.name);
            }
        Assert.IsNull(Object.FindFirstObjectByType<MotorbikeController>(FindObjectsInactive.Include));
        Assert.AreEqual(0, new SerializedObject(Root("Player").GetComponent<PlayerAction>()).FindProperty("_motorbikes").arraySize);
    }

    [Test]
    public void SnowfallFollowsPlayer()
    {
        var snow = Root("[Noel] Snowfall").GetComponent<NoelSnowfall>();
        Assert.IsNotNull(new SerializedObject(snow).FindProperty("target").objectReferenceValue);
    }
}
