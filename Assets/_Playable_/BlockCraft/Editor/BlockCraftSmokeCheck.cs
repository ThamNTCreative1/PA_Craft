using System;
using System.IO;
using System.Collections.Generic;
using Playable;
using UnityEditor;
using UnityEngine;
using UnityEngine.UI;
using UnityEngine.EventSystems;

/// <summary>Editor-only integration check; never calls the install CTA.</summary>
[InitializeOnLoad]
public static class BlockCraftSmokeCheck
{
    private const string Pending = "BlockCraftSmokeCheck.Pending";
    private static double _next;
    private static int _step;
    private static int _initial;
    private static BlockCraftBuildController _controller;
    private static Button[] _buttons;
    private static GameManager _manager;
    private static Animator _monster;
    private static float _idleTime;

    static BlockCraftSmokeCheck()
    {
        EditorApplication.playModeStateChanged += OnPlayMode;
    }

    [MenuItem("Tools/Block Craft/Check Build Interaction")]
    public static void Run()
    {
        if (EditorApplication.isPlaying) throw new InvalidOperationException("Stop Play Mode before running this check.");
        _step = 0;
        SessionState.SetBool(Pending, true);
        EditorApplication.isPlaying = true;
    }

    private static void OnPlayMode(PlayModeStateChange state)
    {
        if (state != PlayModeStateChange.EnteredPlayMode || !SessionState.GetBool(Pending, false)) return;
        SessionState.SetBool(Pending, false);
        _next = 2.3;
        EditorApplication.update += Tick;
    }

    private static void Tick()
    {
        if (!EditorApplication.isPlaying || Time.time < _next) return;
        try
        {
            if (_step == 0)
            {
                _controller = UnityEngine.Object.FindFirstObjectByType<BlockCraftBuildController>();
                var data = new SerializedObject(_controller);
                var tutorial = ((RectTransform)data.FindProperty("_tutorial").objectReferenceValue).GetComponent<BlockCraftTapTutorial>();
                if (tutorial.CompletedLoops < 2 || !tutorial.gameObject.activeInHierarchy)
                    throw new Exception("Build tutorial did not loop twice.");
                var array = data.FindProperty("_materialButtons");
                _buttons = new Button[array.arraySize];
                for (int i = 0; i < _buttons.Length; i++)
                    _buttons[i] = (Button)array.GetArrayElementAtIndex(i).objectReferenceValue;
                _manager = (GameManager)data.FindProperty("_gameManager").objectReferenceValue;
                _monster = UnityEngine.Object.FindFirstObjectByType<Animator>();
                _idleTime = _monster.GetCurrentAnimatorStateInfo(0).normalizedTime;
                for (int i = 0; i < 4; i++) Tap(_buttons[i]);
                if (tutorial.gameObject.activeSelf) throw new Exception("Build tutorial did not hide on tap.");
                _step = 1;
                _next = Time.time + 3.4;
                return;
            }
            var explosion = _controller.GetComponent<BlockCraftDetonation>();
            if (_step == 1)
            {
                var tutorial = (RectTransform)new SerializedObject(_controller).FindProperty("_tutorial").objectReferenceValue;
                if (!tutorial.gameObject.activeInHierarchy)
                    throw new Exception("Build tutorial did not return after two idle seconds.");
                if (_controller.BuiltRows != 4 || explosion.HasSpawned)
                    throw new Exception("TNT must not spawn before the fifth row.");
                Tap(_buttons[4]);
                _step = 2;
                _next = Time.time + 1.5;
                return;
            }
            if (_step == 2)
            {
                var tutorial = (RectTransform)new SerializedObject(_controller).FindProperty("_tutorial").objectReferenceValue;
                if (tutorial.gameObject.activeSelf)
                    throw new Exception("Build tutorial returned before two seconds after the latest tap.");
                if (_controller.BuiltRows != 5 || explosion.HasSpawned || !_buttons[5].interactable)
                    throw new Exception("Fifth tap must leave five rows waiting for the sixth tap, without TNT.");
                Tap(_buttons[5]);
                _controller.BuildRow(0); // Seventh tap must be ignored.
                _step = 5;
                _next = Time.time + 0.9;
                return;
            }
            if (_step == 5)
            {
                if (_controller.BuiltRows != 5 || !explosion.HasSpawned || explosion.HasExploded)
                    throw new Exception("Sixth tap must spawn TNT above the five material rows.");
                _step = 3;
                _next = Time.time + 1.15;
                return;
            }
            if (_step == 3)
            {
                var tutorial = (RectTransform)new SerializedObject(_controller).FindProperty("_tutorial").objectReferenceValue;
                if (tutorial.gameObject.activeSelf)
                    throw new Exception("Build tutorial must stay hidden during detonation.");
                if (!explosion.HasExploded) throw new Exception("TNT did not explode after its fuse.");
                ScreenCapture.CaptureScreenshot("Temp/BlockCraftBackup/tnt-explosion.png");
                _step = 4;
                _next = Time.time + 4.2;
                return;
            }
            if (!explosion.IsFinished || _controller.IsBuilding || _controller.BuiltRows != 5)
                throw new Exception("Explosion did not finish or extra rows were built.");
            var cells = new SerializedObject(_controller).FindProperty("_cells");
            for (int i = 0; i < cells.arraySize; i++)
                if (((Image)cells.GetArrayElementAtIndex(i).objectReferenceValue).gameObject.activeSelf)
                    throw new Exception("Debris was not cleaned up.");
            foreach (var button in _buttons)
                if (button.interactable) throw new Exception("Build input should stay locked after detonation.");
            var stages = _controller.GetComponent<BlockCraftStages>();
            if (stages != null)
            {
                if (!stages.CastleVisible || !stages.CastleMonster.gameObject.activeInHierarchy ||
                    stages.CastleMonster.GetCurrentAnimatorStateInfo(0).normalizedTime <= 0)
                    throw new Exception("Castle stage or its monster idle did not activate.");
                var weapons = new SerializedObject(stages).FindProperty("_weapons");
                var stageData = new SerializedObject(stages);
                var tutorial = ((RectTransform)stageData.FindProperty("_hand").objectReferenceValue).GetComponent<BlockCraftTapTutorial>();
                if (tutorial.CompletedLoops < 2 || !tutorial.gameObject.activeInHierarchy)
                    throw new Exception("Castle tutorial did not loop twice.");
                for (int i = 0; i < weapons.arraySize; i++)
                {
                    var label = ((Button)weapons.GetArrayElementAtIndex(i).objectReferenceValue).transform.Find("Label").GetComponent<TMPro.TMP_Text>();
                    if (label.fontSize != 27 || label.fontSharedMaterial.GetFloat(TMPro.ShaderUtilities.ID_OutlineWidth) < 0.3f)
                        throw new Exception("Weapon label size or outline is incorrect.");
                }
                Tap((Button)weapons.GetArrayElementAtIndex(0).objectReferenceValue);
                if (stages.SelectedWeapon != 0 || !_manager.HasEnded)
                    throw new Exception("Castle button must select a weapon and end gameplay immediately.");
                if (tutorial.gameObject.activeSelf) throw new Exception("Castle tutorial did not hide on tap.");
                for (int i = 0; i < weapons.arraySize; i++)
                    if (((Button)weapons.GetArrayElementAtIndex(i).objectReferenceValue).interactable)
                        throw new Exception("Castle buttons must lock after selection.");
                stages.SelectWeapon(1);
                if (stages.SelectedWeapon != 0) throw new Exception("Repeat selection must be ignored.");
                // Exit Play Mode below before the delayed install CTA opens.
                ScreenCapture.CaptureScreenshot("Temp/BlockCraftBackup/castle-stage-runtime.png");
            }
            else if (_monster.GetCurrentAnimatorStateInfo(0).normalizedTime <= _idleTime + 1)
                throw new Exception("Monster idle stopped.");
            Finish("PASS: build tutorial returns after two idle seconds, resets on tap and stays hidden during TNT; build, castle transition and endgame pass. Exited before delayed CTA.");
        }
        catch (Exception exception) { Finish("FAIL: " + exception); }
    }

    private static void Tap(Button button)
    {
        Canvas.ForceUpdateCanvases();
        var canvas = button.GetComponentInParent<Canvas>();
        var rect = (RectTransform)button.transform;
        var pointer = new PointerEventData(EventSystem.current)
        {
            position = RectTransformUtility.WorldToScreenPoint(canvas.worldCamera, rect.TransformPoint(rect.rect.center)),
            button = PointerEventData.InputButton.Left
        };
        var hits = new List<RaycastResult>();
        EventSystem.current.RaycastAll(pointer, hits);
        if (hits.Count == 0 || hits[0].gameObject.GetComponentInParent<Button>() != button)
            throw new Exception("UI raycast blocked for " + button.name);
        ExecuteEvents.ExecuteHierarchy(hits[0].gameObject, pointer, ExecuteEvents.pointerClickHandler);
    }

    private static void Finish(string result)
    {
        EditorApplication.update -= Tick;
        Directory.CreateDirectory("Temp/BlockCraftBackup");
        File.WriteAllText("Temp/BlockCraftBackup/interaction-check.txt", result);
        Debug.Log(result);
        EditorApplication.isPlaying = false;
    }
}
