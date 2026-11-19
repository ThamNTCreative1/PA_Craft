using NUnit.Framework;
using Playable;
using UnityEditor;
using UnityEditor.SceneManagement;
using UnityEngine;
using UnityEngine.SceneManagement;

/// <summary>Static wiring checks for the Xmas vehicle/pet picker (spec 2026-11-19-1500-xmas-vehicle-pet-picker).</summary>
public class XmasPickerSceneTests
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
    public void UnrelatedObjectsRemoved_MapSnowDecorKept()
    {
        Assert.IsNull(Root("Player"));
        Assert.IsNull(Root("Missions"));
        Assert.IsNull(Root("[Noel] Fishing Sea"));
        Assert.IsNull(Root("[Noel] Skin Selector"));
        Assert.IsNull(Root("Canvas").transform.Find("GamePanel"));
        Assert.IsNull(Root("Canvas").transform.Find("MissionsJournalPanel"));
        foreach (var n in new[] { "CityMap_Noel", "[Noel] Snow City", "[Noel] Snow Buildings", "[Noel] Snow Extra",
                     "[Noel] Christmas Trees", "[Noel] Roadside Gifts and Snowmen", "[Noel] Snowfall", "GameController" })
            Assert.IsNotNull(Root(n), n);
    }

    [Test]
    public void Flow_HasVehicleThenPetSteps()
    {
        var flow = Root("XmasPicker").GetComponent<XmasPickerFlow>();
        var so = new SerializedObject(flow);
        var steps = so.FindProperty("_steps");
        Assert.AreEqual(2, steps.arraySize);
        var vehicle = steps.GetArrayElementAtIndex(0);
        var pet = steps.GetArrayElementAtIndex(1);
        Assert.AreEqual("CHOOSE YOUR VEHICLE", vehicle.FindPropertyRelative("_title").stringValue);
        Assert.IsFalse(vehicle.FindPropertyRelative("_endsGame").boolValue);
        Assert.AreEqual("CHOOSE YOUR PET", pet.FindPropertyRelative("_title").stringValue);
        Assert.IsTrue(pet.FindPropertyRelative("_endsGame").boolValue);
        foreach (var side in new[] { "_left", "_right" })
        {
            Assert.IsNotNull(vehicle.FindPropertyRelative(side + "._display").objectReferenceValue, "vehicle display " + side);
            Assert.IsNotNull(vehicle.FindPropertyRelative(side + "._icon").objectReferenceValue, "vehicle icon " + side);
            Assert.IsNotNull(pet.FindPropertyRelative(side + "._icon").objectReferenceValue, "pet icon " + side);
        }
        foreach (var f in new[] { "_landPoint", "_cards", "_drop", "_anyTapCatcher", "_clickSfx" })
            Assert.IsNotNull(so.FindProperty(f).objectReferenceValue, f);
    }

    [Test]
    public void Views_AreWired()
    {
        var view = Root("Canvas").transform.Find("PickerPanel").GetComponent<ChoiceCardsView>();
        var so = new SerializedObject(view);
        foreach (var f in new[] { "_group", "_title", "_left", "_right", "_hand" })
            Assert.IsNotNull(so.FindProperty(f).objectReferenceValue, f);
        var drop = new SerializedObject(Root("XmasPicker").GetComponent<DropPresenter>());
        foreach (var f in new[] { "_audio", "_landFx", "_whooshSfx", "_landSfx" })
            Assert.IsNotNull(drop.FindProperty(f).objectReferenceValue, f);
    }

    [Test]
    public void EndTime_Is30Seconds_AndCameraIsFixed()
    {
        var gm = new SerializedObject(Root("GameManager").GetComponent<GameManager>());
        Assert.AreEqual(30, gm.FindProperty("_endTime").intValue);
        Assert.IsNull(Root("Camera_Controller").GetComponent<CameraController>());
    }
}
