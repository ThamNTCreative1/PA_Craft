using UnityEditor;
using UnityEditor.SceneManagement;
using UnityEngine;
using UnityEngine.UI;
using TMPro;

namespace Playable.TempleRun.EditorTools
{
    public static class RunnerHotbarSetup
    {
        private const string Items = "Assets/Texture/vanilla-1.21.4/assets/minecraft/textures/item/";
        private static RectTransform Rect(string name, Transform parent, Vector2 size, Vector2 pos)
        {
            var r = new GameObject(name, typeof(RectTransform)).GetComponent<RectTransform>();
            r.SetParent(parent, false);
            r.sizeDelta = size;
            r.anchoredPosition = pos;
            return r;
        }
        private static Image Box(string name, Transform parent, Vector2 size, Vector2 pos, Color color)
        {
            var image = Rect(name, parent, size, pos).gameObject.AddComponent<Image>();
            image.color = color;
            image.raycastTarget = false;
            return image;
        }
        private static void PixelIcon(Transform parent, string name, string[] rows, Vector2 pos, Color fill)
        {
            var root = Rect(name, parent, new Vector2(32, 32), pos);
            var icon = root.gameObject.AddComponent<PixelStatusIcon>();
            icon.armor = name.StartsWith("Armor");
            icon.raycastTarget = false;
        }

        [MenuItem("Tools/Temple Run/Setup Demo Hotbar")]
        public static void Apply()
        {
            var ui = Object.FindFirstObjectByType<RunnerUI>();
            if (ui == null) throw new System.InvalidOperationException("Open Gameplay first.");
            var old = ui.transform.Find("DemoHotbar");
            if (old != null) Undo.DestroyObjectImmediate(old.gameObject);
            var root = Rect("DemoHotbar", ui.transform, Vector2.zero, Vector2.zero);
            root.anchorMin = Vector2.zero; root.anchorMax = Vector2.one;
            var hotbar = root.gameObject.AddComponent<RunnerHotbar>();
            hotbar.runnerUI = ui;
            var bar = Rect("Hotbar", root, new Vector2(810, 130), new Vector2(0, 85));
            bar.anchorMin = bar.anchorMax = new Vector2(0.5f, 0);
            hotbar.content = bar.gameObject;
            Box("Shadow", bar, new Vector2(822, 100), new Vector2(0, -8), new Color32(20, 18, 15, 230));
            string[] names = { "stone_axe", "stone_pickaxe", "cooked_beef", "", "carrot", "bread", "wheat", "apple", "stone_shovel" };
            string[] counts = { "", "", "4", "", "", "8", "8", "8", "" };
            hotbar.slots = new RectTransform[9]; hotbar.buttons = new Button[9];
            for (int i = 0; i < 9; i++)
            {
                var slot = Box("Slot " + (i + 1), bar, new Vector2(90, 90), new Vector2((i - 4) * 90, 0), new Color32(24, 25, 22, 255));
                Box("Bevel", slot.transform, new Vector2(84, 84), Vector2.zero, new Color32(140, 142, 130, 255));
                Box("Inset", slot.transform, new Vector2(74, 74), new Vector2(1, -1), new Color32(57, 59, 51, 255));
                slot.raycastTarget = true;
                var button = slot.gameObject.AddComponent<Button>(); button.targetGraphic = slot;
                button.transition = Selectable.Transition.None;
                hotbar.slots[i] = slot.rectTransform; hotbar.buttons[i] = button;
                if (names[i] != "")
                {
                    var icon = Rect(names[i], slot.transform, new Vector2(64, 64), Vector2.zero).gameObject.AddComponent<RawImage>();
                    icon.texture = AssetDatabase.LoadAssetAtPath<Texture2D>(Items + names[i] + ".png");
                    icon.raycastTarget = false;
                    if (icon.texture == null) throw new System.InvalidOperationException("Missing item: " + names[i]);
                }
                if (counts[i] != "")
                {
                    var text = Rect("Count", slot.transform, new Vector2(68, 40), new Vector2(1, -23)).gameObject.AddComponent<TextMeshProUGUI>();
                    text.font = AssetDatabase.LoadAssetAtPath<TMP_FontAsset>("Assets/TextMesh Pro/Fonts/FFFFORWA SDF.asset");
                    text.text = counts[i]; text.fontSize = 27; text.alignment = TextAlignmentOptions.BottomRight;
                    text.raycastTarget = false;
                }
            }
            hotbar.selection = Rect("Selected Slot", bar, new Vector2(94, 94), Vector2.zero);
            Color selected = new Color32(238, 247, 227, 255);
            Box("Top", hotbar.selection, new Vector2(94, 6), new Vector2(0, 44), selected);
            Box("Bottom", hotbar.selection, new Vector2(94, 6), new Vector2(0, -44), selected);
            Box("Left", hotbar.selection, new Vector2(6, 88), new Vector2(-44, 0), selected);
            Box("Right", hotbar.selection, new Vector2(6, 88), new Vector2(44, 0), selected);
            hotbar.Select(3);
            string[] heart = { ".##.##...", "#rr#rr#..", "#r+rrr#..", "#rrrrr#..", ".#rrr#...", "..#r#....", "...#....." };
            string[] armor = { ".##...##.", "#ss#.#ss#", "#sssssss#", ".#ss+ss#.", "..#sss#..", "..#sss#..", "..#####.." };
            for (int i = 0; i < 10; i++)
            {
                PixelIcon(bar, "Heart " + (i + 1), heart, new Vector2(-386 + i * 35, 77), new Color32(239, 35, 43, 255));
                PixelIcon(bar, "Armor " + (i + 1), armor, new Vector2(64 + i * 35, 77), new Color32(177, 187, 192, 255));
            }
            root.SetSiblingIndex(1);
            Undo.RegisterCreatedObjectUndo(root.gameObject, "Setup demo hotbar");
            EditorSceneManager.MarkSceneDirty(ui.gameObject.scene);
            EditorSceneManager.SaveScene(ui.gameObject.scene);
        }
    }
}
