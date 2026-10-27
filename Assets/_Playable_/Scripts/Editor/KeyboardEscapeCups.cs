using System.Linq;
using UnityEngine;
using UnityEditor;
using UnityEditor.SceneManagement;
using UnityEngine.UI;
using TMPro;
using Playable.KeyboardEscape;

public static partial class KeyboardEscapeBuilder
{
    public static string SetupCupProgress()
    {
        var scene = UnityEngine.SceneManagement.SceneManager.GetActiveScene();
        var game = scene.GetRootGameObjects().SelectMany(r => r.GetComponentsInChildren<EscapeGame>(true)).First();
        var canvas = game.player.controls.canvas.transform;
        var source = AssetDatabase.LoadAssetAtPath<GameObject>(Root + "/Source/MiniGames/KeyboardEscape/Prefab/UI/KeyboardEscape_GameplayPanel.prefab");
        var score = game.cupProgress;
        if (score) return "Cup progress already configured";
        score = game.gameObject.AddComponent<EscapeCupProgress>(); game.cupProgress = score; score.game = game;
        score.canvasRect = (RectTransform)canvas;
        var total = Object.Instantiate(Find(source.transform, "Trophy Frame").gameObject, canvas);
        total.name = "Cup Total";
        Object.DestroyImmediate(Find(total.transform, "[Button] More Trophy").gameObject);
        var rect = (RectTransform)total.transform;
        rect.anchorMin = rect.anchorMax = new Vector2(.5f, 1);
        rect.anchoredPosition = new Vector2(-70, -55); rect.localScale = Vector3.one;
        score.totalLabel = Find(total.transform, "Text").GetComponent<TMP_Text>();
        score.totalLabel.text = "0";
        var popup = Label("Cup Gain", canvas, new Vector2(.5f, .5f), new Vector2(150, 85), Vector2.zero, 62);
        popup.text = "+1"; score.gainLabel = popup;
        var icon = Rect("Cup Icon", popup.transform, new Vector2(.5f, .5f), new Vector2(64,64), new Vector2(-90,0));
        score.gainIcon = icon.gameObject.AddComponent<Image>();
        score.gainIcon.sprite = Find(total.transform, "Icon").GetComponent<Image>().sprite;
        score.gainIcon.preserveAspect = true;
        popup.gameObject.SetActive(false);
        foreach (var root in new[] {total, popup.gameObject})
        {
            foreach (var t in root.GetComponentsInChildren<Transform>(true)) GameObjectUtility.RemoveMonoBehavioursWithMissingScript(t.gameObject);
            foreach (var graphic in root.GetComponentsInChildren<Graphic>(true)) graphic.raycastTarget = false;
        }
        EditorSceneManager.MarkSceneDirty(scene); EditorSceneManager.SaveScene(scene);
        return "Cup total and gain popup installed; level bar omitted";
    }
}
