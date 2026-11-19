using NUnit.Framework;
using Playable;
using UnityEditor;
using UnityEditor.SceneManagement;
using UnityEngine;
using UnityEngine.SceneManagement;

/// <summary>Static wiring checks for the "Tap to build" Xmas playable (V89).</summary>
public class TapToBuildSceneTests
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
    public void OnlyUiPlayableObjectsRemain()
    {
        foreach (var n in new[] { "CityMap_Noel", "[Noel] Snowfall", "[Noel] Christmas Trees", "XmasPicker", "Player", "Missions" })
            Assert.IsNull(Root(n), n);
        foreach (var n in new[] { "Canvas", "GameManager", "AudioManager", "EventSystem" })
            Assert.IsNotNull(Root(n), n);
    }

    [Test]
    public void Flow_HasFourMaterials_EndCard_AndHint()
    {
        var flow = Root("Canvas").transform.Find("Game").GetComponent<TapToBuildFlow>();
        var so = new SerializedObject(flow);
        var mats = so.FindProperty("_materials");
        Assert.AreEqual(4, mats.arraySize);
        for (int i = 0; i < 4; i++) Assert.IsNotNull(mats.GetArrayElementAtIndex(i).objectReferenceValue, "material " + i);
        foreach (var f in new[] { "_endCard", "_hint", "_clickSfx" })
            Assert.IsNotNull(so.FindProperty(f).objectReferenceValue, f);
    }

    [Test]
    public void EndCard_StartsHidden_AndIsWired()
    {
        var end = Root("Canvas").transform.Find("EndCard");
        Assert.IsFalse(end.gameObject.activeSelf);
        var so = new SerializedObject(end.GetComponent<EndCardView>());
        foreach (var f in new[] { "_group", "_logo", "_button" })
            Assert.IsNotNull(so.FindProperty(f).objectReferenceValue, f);
    }

    [Test]
    public void OrientationLayout_CoversAllBlocks()
    {
        var so = new SerializedObject(Root("Canvas").GetComponent<OrientationLayout>());
        var arr = so.FindProperty("_entries");
        Assert.AreEqual(9, arr.arraySize);
        for (int i = 0; i < arr.arraySize; i++)
            Assert.IsNotNull(arr.GetArrayElementAtIndex(i).FindPropertyRelative("_target").objectReferenceValue, "entry " + i);
    }

    [Test]
    public void EndTime_Is30Seconds()
    {
        var gm = new SerializedObject(Root("GameManager").GetComponent<GameManager>());
        Assert.AreEqual(30, gm.FindProperty("_endTime").intValue);
    }
}
