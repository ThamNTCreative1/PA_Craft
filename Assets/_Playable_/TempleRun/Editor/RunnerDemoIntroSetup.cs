using UnityEditor;
using UnityEditor.SceneManagement;
using UnityEngine;
using UnityEngine.UI;
using TMPro;

namespace Playable.TempleRun.EditorTools
{
    public static class RunnerDemoIntroSetup
    {
        private const string Folder = "Assets/_Playable_/TempleRun/Generated";
        private static Material Mat(string name, Color color, string texture = null)
        {
            string path = Folder + "/Demo_" + name + ".mat";
            var m = AssetDatabase.LoadAssetAtPath<Material>(path);
            if (m == null) { m = new Material(Shader.Find("Standard")); AssetDatabase.CreateAsset(m, path); }
            m.color = color; m.SetFloat("_Glossiness", 0);
            if (texture != null) m.mainTexture = AssetDatabase.LoadAssetAtPath<Texture2D>("Assets/Texture/vanilla-1.21.4/assets/minecraft/textures/block/" + texture + ".png");
            EditorUtility.SetDirty(m); return m;
        }
        private static Transform Cube(string name, Transform parent, Vector3 pos, Vector3 size, Material mat)
        {
            var go = GameObject.CreatePrimitive(PrimitiveType.Cube); go.name = name;
            go.transform.SetParent(parent, false); go.transform.localPosition = pos; go.transform.localScale = size;
            go.GetComponent<Renderer>().sharedMaterial = mat;
            Object.DestroyImmediate(go.GetComponent<Collider>()); return go.transform;
        }
        public static void Polish()
        {
            var intro = Object.FindFirstObjectByType<RunnerDemoIntro>();
            intro.introCamera = intro.room.GetComponentInChildren<Camera>();
            intro.arm = intro.introCamera.transform.Find("First person arm");
            var titleText = intro.title.GetComponent<TMP_Text>();
            if (titleText != null) titleText.enableWordWrapping = false;
            var previous = intro.room.transform.Find("Warm interior light");
            var light = previous != null ? previous.GetComponent<Light>() : new GameObject("Warm interior light", typeof(Light)).GetComponent<Light>();
            light.transform.SetParent(intro.room.transform, false); light.transform.localPosition = new Vector3(0, 3.2f, -1);
            light.type = LightType.Point; light.range = 12; light.intensity = 1.2f; light.color = new Color(1, 0.9f, 0.75f);
            var gold = Mat("Gold", new Color(1, 0.84f, 0.015f));
            gold.EnableKeyword("_EMISSION"); gold.SetColor("_EmissionColor", new Color(0.55f, 0.4f, 0));
            if (intro.room.transform.Find("Outside tree") == null)
            {
                var tree = new GameObject("Outside tree").transform; tree.SetParent(intro.room.transform, false);
                var leaves = Mat("Leaves", new Color(0.23f, 0.57f, 0.14f), "oak_leaves");
                var bark = Mat("Bark", Color.white, "oak_log");
                for (int i = 0; i < 3; i++)
                {
                    float x = (i - 1) * 2.5f;
                    Cube("Trunk", tree, new Vector3(x, 1.5f, 8 + i), new Vector3(0.7f, 3, 0.7f), bark);
                    Cube("Crown", tree, new Vector3(x, 3.1f, 8 + i), new Vector3(2.4f, 1.7f, 2.4f), leaves);
                }
            }
            AssetDatabase.SaveAssets(); EditorSceneManager.MarkSceneDirty(intro.gameObject.scene); EditorSceneManager.SaveScene(intro.gameObject.scene);
        }
        [MenuItem("Tools/Temple Run/Setup Demo Intro")]
        public static void Apply()
        {
            var ui = Object.FindFirstObjectByType<RunnerUI>();
            var existing = GameObject.Find("DemoIntro");
            if (existing != null) throw new System.InvalidOperationException("Demo intro already exists.");
            var root = new GameObject("DemoIntro");
            var intro = root.AddComponent<RunnerDemoIntro>();
            var room = new GameObject("Room").transform; room.SetParent(root.transform, false); room.position = new Vector3(200, 0, 0);
            intro.room = room.gameObject;
            var wood = Mat("Oak", Color.white, "oak_planks");
            var wall = Mat("Plaster", new Color(0.76f, 0.52f, 0.4f));
            var grass = Mat("Grass", new Color(0.31f, 0.65f, 0.15f), "grass_block_top");
            var dark = Mat("Sleeve", new Color(0.065f, 0.085f, 0.09f));
            var gold = Mat("Gold", new Color(1, 0.84f, 0.015f));
            var ink = Mat("Ink", new Color(0.09f, 0.07f, 0.015f));
            for (int z = -3; z < 6; z++) for (int x = -3; x <= 3; x++)
                Cube("Floor", room, new Vector3(x, -0.15f, z), new Vector3(1, 0.3f, 1), wood);
            Cube("Left wall", room, new Vector3(-3.2f, 2, 1), new Vector3(0.4f, 4, 9), wall);
            Cube("Right wall", room, new Vector3(3.2f, 2, 1), new Vector3(0.4f, 4, 9), wall);
            Cube("Back left", room, new Vector3(-1.95f, 2, 4.5f), new Vector3(2.5f, 4, 0.4f), wall);
            Cube("Back right", room, new Vector3(1.95f, 2, 4.5f), new Vector3(2.5f, 4, 0.4f), wall);
            Cube("Window sill", room, new Vector3(0, 0.7f, 4.5f), new Vector3(1.4f, 1.4f, 0.4f), wall);
            Cube("Window lintel", room, new Vector3(0, 3.5f, 4.5f), new Vector3(1.4f, 1, 0.4f), wall);
            Cube("Ceiling", room, new Vector3(0, 4, 1), new Vector3(7, 0.3f, 9), wall);
            Cube("Table", room, new Vector3(0, 0.85f, 1.9f), new Vector3(1.55f, 0.5f, 2.2f), wood);
            Cube("Table foot", room, new Vector3(0, 0.3f, 1.9f), new Vector3(0.65f, 0.6f, 1.4f), wood);
            Cube("Left bench", room, new Vector3(-2, 0.6f, 2), new Vector3(1.05f, 1.2f, 2.5f), wood);
            Cube("Right bench", room, new Vector3(2, 0.6f, 2), new Vector3(1.05f, 1.2f, 2.5f), wood);
            for (int i = 0; i < 18; i++) Cube("Outside grass", room, new Vector3((i % 6 - 3) * 1.4f, 0.25f * (i % 3), 6 + i / 6 * 1.4f), new Vector3(1.4f, 0.8f, 1.4f), grass);
            var coin = GameObject.CreatePrimitive(PrimitiveType.Cylinder); coin.name = "Smile Coin";
            coin.transform.SetParent(room, false); coin.transform.localPosition = new Vector3(0, 1.75f, 1.7f);
            coin.transform.localRotation = Quaternion.Euler(90, 0, 0); coin.transform.localScale = new Vector3(0.7f, 0.065f, 0.7f);
            coin.GetComponent<Renderer>().sharedMaterial = gold; Object.DestroyImmediate(coin.GetComponent<Collider>());
            // Face pieces share a root so bobbing moves the complete smile.
            var face = new GameObject("Coin Face").transform; face.SetParent(room, false); face.localPosition = coin.transform.localPosition;
            coin.transform.SetParent(face, true); intro.coin = face;
            Cube("Eye L", face, new Vector3(-0.115f, 0.065f, -0.072f), new Vector3(0.035f, 0.085f, 0.015f), ink);
            Cube("Eye R", face, new Vector3(0.115f, 0.065f, -0.072f), new Vector3(0.035f, 0.085f, 0.015f), ink);
            for (int i = -3; i <= 3; i++) Cube("Smile", face, new Vector3(i * 0.04f, -0.13f + i * i * 0.008f, -0.072f), new Vector3(0.045f, 0.025f, 0.015f), ink);
            var camObject = new GameObject("Demo Camera", typeof(Camera), typeof(AudioListener));
            camObject.transform.SetParent(room, false); camObject.transform.localPosition = new Vector3(0, 2.15f, -2.25f);
            camObject.transform.localRotation = Quaternion.Euler(12, 0, 0);
            var cam = camObject.GetComponent<Camera>(); cam.fieldOfView = 60; cam.nearClipPlane = 0.03f;
            cam.clearFlags = CameraClearFlags.SolidColor; cam.backgroundColor = new Color(0.45f, 0.75f, 0.95f);
            intro.introCamera = cam;
            intro.arm = Cube("First person arm", camObject.transform, new Vector3(0.46f, -0.44f, 0.85f), new Vector3(0.24f, 0.65f, 0.26f), dark);
            intro.arm.localRotation = Quaternion.Euler(-20, -15, -12);
            var title = new GameObject("Move to Play", typeof(RectTransform), typeof(TextMeshProUGUI));
            title.transform.SetParent(ui.transform, false); intro.title = title;
            var rt = title.GetComponent<RectTransform>(); rt.anchorMin = new Vector2(0.08f, 0.77f); rt.anchorMax = new Vector2(0.92f, 0.94f); rt.offsetMin = rt.offsetMax = Vector2.zero;
            var label = title.GetComponent<TextMeshProUGUI>(); label.font = AssetDatabase.LoadAssetAtPath<TMP_FontAsset>("Assets/TextMesh Pro/Fonts/FFFFORWA SDF.asset");
            label.text = "Move to Play"; label.alignment = TextAlignmentOptions.Center; label.enableAutoSizing = true; label.fontSizeMin = 25; label.fontSizeMax = 110;
            label.enableWordWrapping = false;
            label.color = new Color(1, 0.78f, 0.025f); label.raycastTarget = false;
            var material = new Material(label.fontSharedMaterial); material.name = "Demo Title Outline";
            material.SetFloat("_OutlineWidth", 0.23f); material.SetColor("_OutlineColor", new Color(0.12f, 0.065f, 0.015f));
            AssetDatabase.CreateAsset(material, Folder + "/DemoTitle.mat"); label.fontSharedMaterial = material;
            string[] gameplayNames = { "TempleRun_GameManager", "TempleRun_Track", "TempleRun_Player", "Main Camera", "TempleRun_Chaser", "TempleRun_EditorPreview (EditorOnly)", "Coin Highlight Light" };
            intro.gameplayRoots = new GameObject[gameplayNames.Length + 2];
            for (int i = 0; i < gameplayNames.Length; i++) { intro.gameplayRoots[i] = GameObject.Find(gameplayNames[i]); if (intro.gameplayRoots[i] != null) intro.gameplayRoots[i].SetActive(false); }
            intro.gameplayRoots[gameplayNames.Length] = ui.hudCounter.gameObject;
            intro.gameplayRoots[gameplayNames.Length + 1] = ui.distanceText.gameObject;
            ui.hudCounter.gameObject.SetActive(false); ui.distanceText.gameObject.SetActive(false);
            ui.ShowMoveHand(false); ui.ShowJumpHand(false); ui.HideEndPanels();
            Undo.RegisterCreatedObjectUndo(root, "Setup demo intro");
            Polish();
            AssetDatabase.SaveAssets(); EditorSceneManager.MarkSceneDirty(ui.gameObject.scene); EditorSceneManager.SaveScene(ui.gameObject.scene);
        }
    }
}
