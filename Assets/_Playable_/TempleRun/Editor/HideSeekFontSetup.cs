using TMPro;
using UnityEditor;
using UnityEditor.SceneManagement;
using UnityEngine;
using UnityEngine.UI;

namespace Playable.TempleRun.EditorTools
{
    public static class HideSeekFontSetup
    {
        private const string FontPath = "Assets/_Playable_/Font/Arial Rounded MT Bold Regular SDF.asset";

        [MenuItem("Tools/Hide Seek/Apply Rounded Font")]
        public static void Apply()
        {
            var font = AssetDatabase.LoadAssetAtPath<TMP_FontAsset>(FontPath);
            if (font == null) throw new System.InvalidOperationException("Missing font: " + FontPath);
            var scene = UnityEngine.SceneManagement.SceneManager.GetActiveScene();
            foreach (var root in scene.GetRootGameObjects())
            {
                foreach (var view in root.GetComponentsInChildren<HideSeekView>(true))
                {
                    if (view.instructionRoot == null && view.instructionLabel != null)
                        view.instructionRoot = (RectTransform)view.instructionLabel.transform.parent;
                    if (view.instructionRoot != null)
                    {
                        view.instructionLabel = Label(view.instructionRoot, "Rounded instruction", "Find a Spot to Hide", font, 72);
                        var oldImage = view.instructionRoot.GetComponent<Image>();
                        if (oldImage != null) Object.DestroyImmediate(oldImage);
                    }
                    var title = view.selection.transform.Find("Title");
                    if (title != null)
                    {
                        Label(title, "Rounded title", "HIDER OR SNEEKER?", font, 78);
                        var oldImage = title.GetComponent<Image>();
                        if (oldImage != null) Object.DestroyImmediate(oldImage);
                    }
                    EditorUtility.SetDirty(view);
                }

            }
            EditorSceneManager.MarkSceneDirty(scene);
            EditorSceneManager.SaveScene(scene);
        }

        private static TextMeshProUGUI Label(Transform parent, string name, string value, TMP_FontAsset font, float size)
        {
            var child = parent.Find(name);
            if (child != null) return child.GetComponent<TextMeshProUGUI>();
            var text = new GameObject(name, typeof(RectTransform), typeof(TextMeshProUGUI)).GetComponent<TextMeshProUGUI>();
            var rect = text.rectTransform;
            rect.SetParent(parent, false);
            rect.anchorMin = Vector2.zero;
            rect.anchorMax = Vector2.one;
            rect.offsetMin = rect.offsetMax = Vector2.zero;
            text.font = font;
            text.fontStyle = FontStyles.Bold;
            text.characterSpacing = -10f;
            text.text = value;
            text.fontSize = size;
            text.enableAutoSizing = true;
            text.fontSizeMin = 24;
            text.fontSizeMax = size;
            text.enableWordWrapping = false;
            text.alignment = TextAlignmentOptions.Center;
            text.color = Color.white;
            text.raycastTarget = false;
            return text;
        }

    }
}
