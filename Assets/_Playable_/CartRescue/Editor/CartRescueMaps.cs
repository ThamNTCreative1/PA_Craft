using System.Collections.Generic;
using System.IO;
using TMPro;
using UnityEditor;
using UnityEngine;
using UnityEngine.UI;
using Object = UnityEngine.Object;

namespace Playable.CartRescue.EditorTools
{
    /// <summary>
    /// Phần "chọn map" của CartRescueSetup: 4 bối cảnh (Playground / City / Farm / Mansion) dựng từ mesh của game gốc
    /// + khối hộp, cổng GOAL, bảng CHOOSE YOUR MAP (thumbnail chụp từ chính scene), chữ + khung chú thích của màn
    /// chơi tĩnh, và MapSelectFlow điều khiển.
    /// </summary>
    public static partial class CartRescueSetup
    {
        private const float GoalX = 12.2f;   // sát mép phải màn ngang như demo
        private static readonly Rect ShowcaseFocus = new Rect(-11.3f, -0.5f, 27f, 14f);          // ngang: xe ~42%, cổng ~88%
        private static readonly Rect ShowcasePortraitFocus = new Rect(-6.4f, -1f, 20f, 14f);   // chừa trời phía trên cho tiêu đề
        private static readonly Color Yellow = new Color(1f, 0.86f, 0.1f);

        private struct MapContext
        {
            public Transform Root, World;
            public GameObject Room;
            public Camera Camera;
            public CartRescueCamera CameraFit;
            public Light Light;
            public UiRefs Ui;
            public CartBody Cart;
            public DeckRiderView HangRider;
            public RopeHangView Rope;
            public GameManager GameManager;
        }

        private struct ThemeDef
        {
            public string Name, Label;
            public Color Sky, Ambient;
            public float Light;
        }

        private static readonly ThemeDef[] Themes =
        {
            new ThemeDef { Name = "Playground", Label = "PLAYGROUND", Sky = new Color(0.55f, 0.8f, 0.98f), Ambient = new Color(0.64f, 0.64f, 0.68f), Light = 0.9f },
            new ThemeDef { Name = "City", Label = "CITY", Sky = new Color(0.62f, 0.8f, 0.95f), Ambient = new Color(0.64f, 0.64f, 0.68f), Light = 0.9f },
            new ThemeDef { Name = "Farm", Label = "FARM", Sky = new Color(0.68f, 0.86f, 0.98f), Ambient = new Color(0.66f, 0.64f, 0.6f), Light = 0.95f },
            new ThemeDef { Name = "Mansion", Label = "MANSION", Sky = new Color(0.08f, 0.1f, 0.22f), Ambient = new Color(0.4f, 0.42f, 0.55f), Light = 0.6f },
        };

        private static void BuildMaps(MapContext c)
        {
            Transform goal = BuildGoal(c.World);
            var themes = new List<MapTheme>();
            var themesRoot = new GameObject("Maps").transform;
            themesRoot.SetParent(c.World, false);
            for (int i = 0; i < Themes.Length; i++) themes.Add(BuildTheme(themesRoot, Themes[i], i));
            SetRopePreview(c);

            Sprite[] thumbs = LoadThumbnails(c, themes);
            foreach (MapTheme t in themes) t.gameObject.SetActive(false);
            if (c.Room != null) c.Room.SetActive(true);

            List<RectTransform> showcaseUi = BuildShowcaseUi(c, goal);
            BuildSelectPanel(c, thumbs, out CanvasGroup panel, out List<Object> cards, out List<Object> frames);

            // Thứ tự vẽ: bảng chọn map → bàn tay → nút chặn CTA của GameManager trên cùng.
            c.Ui.Hand.transform.SetAsLastSibling();
            c.Ui.Blocker.transform.SetAsLastSibling();

            var flow = c.Root.gameObject.AddComponent<MapSelectFlow>();
            var so = new SerializedObject(flow);
            so.FindProperty("_gameManager").objectReferenceValue = c.GameManager;
            so.FindProperty("_camera").objectReferenceValue = c.Camera;
            so.FindProperty("_cameraFit").objectReferenceValue = c.CameraFit;
            so.FindProperty("_light").objectReferenceValue = c.Light;
            so.FindProperty("_room").objectReferenceValue = c.Room;
            SetArray(so, "_themes", themes.ConvertAll(t => (Object)t));
            so.FindProperty("_selectPanel").objectReferenceValue = panel;
            SetArray(so, "_cards", cards);
            SetArray(so, "_cardFrames", frames);
            so.FindProperty("_hand").objectReferenceValue = c.Ui.Hand;
            so.FindProperty("_rope").objectReferenceValue = c.Rope;
            so.FindProperty("_cart").objectReferenceValue = c.Cart;
            SetArray(so, "_showcaseUi", showcaseUi.ConvertAll(r => (Object)r));
            so.FindProperty("_timerText").objectReferenceValue = _timerLabel;
            so.FindProperty("_showcaseFocus").rectValue = ShowcaseFocus;
            so.FindProperty("_showcasePortraitFocus").rectValue = ShowcasePortraitFocus;
            so.ApplyModifiedPropertiesWithoutUndo();
        }

        // ───────────────────────────── Cổng GOAL ─────────────────────────────

        private static Transform BuildGoal(Transform world)
        {
            var goal = new GameObject("Goal").transform;
            goal.SetParent(world, false);
            goal.localPosition = new Vector3(GoalX, 0f, 0.4f);
            Material black = ColorMaterial("Goal_Black", new Color(0.1f, 0.1f, 0.12f));
            Material white = ColorMaterial("Goal_White", new Color(0.95f, 0.95f, 0.95f));
            Material frame = UnlitColorMaterial("Goal_Frame", new Color(0.35f, 1f, 0.35f));
            const float half = 1.15f, cell = 0.42f;
            int rows = 8;
            foreach (float side in new[] { -half, half })
                for (int r = 0; r < rows; r++)
                for (int col = 0; col < 2; col++)
                    Box(goal, "Post", new Vector3(side + (col - 0.5f) * cell * 0.5f, cell * (r + 0.5f), 0f),
                        new Vector3(cell * 0.5f, cell, cell), (r + col) % 2 == 0 ? black : white);
            float top = cell * rows;
            for (int i = 0; i < 6; i++)
                Box(goal, "Bar", new Vector3(-half + (i + 0.5f) * (2f * half / 6f), top + cell * 0.25f, 0f),
                    new Vector3(2f * half / 6f, cell * 0.5f, cell), i % 2 == 0 ? black : white);
            // Khung + màn sáng xanh bên trong.
            float innerW = 2f * half - cell * 0.5f, innerH = top - 0.1f;
            Box(goal, "FrameL", new Vector3(-innerW * 0.5f, innerH * 0.5f, 0.05f), new Vector3(0.08f, innerH, 0.1f), frame);
            Box(goal, "FrameR", new Vector3(innerW * 0.5f, innerH * 0.5f, 0.05f), new Vector3(0.08f, innerH, 0.1f), frame);
            Box(goal, "FrameT", new Vector3(0f, innerH, 0.05f), new Vector3(innerW, 0.08f, 0.1f), frame);
            var glow = GameObject.CreatePrimitive(PrimitiveType.Quad);
            Object.DestroyImmediate(glow.GetComponent<Collider>());
            glow.name = "Glow";
            glow.transform.SetParent(goal, false);
            glow.transform.localPosition = new Vector3(0f, innerH * 0.5f, 0.1f);
            glow.transform.localScale = new Vector3(innerW, innerH, 1f);
            glow.GetComponent<MeshRenderer>().sharedMaterial = SpriteMaterial("Goal_Glow", new Color(0.3f, 1f, 0.4f, 0.55f));
            var label = new GameObject("LabelAnchor").transform;
            label.SetParent(goal, false);
            label.localPosition = new Vector3(0f, top + 0.9f, 0f);
            return goal;
        }

        // ───────────────────────────── 4 bối cảnh ─────────────────────────────

        private static MapTheme BuildTheme(Transform parent, ThemeDef def, int index)
        {
            var go = new GameObject("Map_" + def.Name);
            go.transform.SetParent(parent, false);
            Transform t = go.transform;
            switch (index)
            {
                case 0: BuildPlayground(t); break;
                case 1: BuildCity(t); break;
                case 2: BuildFarm(t); break;
                case 3: BuildMansion(t); break;
            }
            var theme = go.AddComponent<MapTheme>();
            var so = new SerializedObject(theme);
            so.FindProperty("_label").stringValue = def.Label;
            so.FindProperty("_sky").colorValue = def.Sky;
            so.FindProperty("_ambient").colorValue = def.Ambient;
            so.FindProperty("_lightIntensity").floatValue = def.Light;
            so.ApplyModifiedPropertiesWithoutUndo();
            return theme;
        }

        /// <summary>Đất (khối lớn, mặt trên y = 0) + dải đường phía trước nơi xe đứng.</summary>
        private static void Ground(Transform t, string name, Color ground, Color path)
        {
            Cube(t, "Ground", new Vector3(14f, -20f, 18f), new Vector3(110f, 40f, 44f), UnlitColorMaterial("Map_" + name + "_Ground", ground));
            Cube(t, "Path", new Vector3(14f, -0.04f, -0.6f), new Vector3(110f, 0.1f, 4.6f), UnlitColorMaterial("Map_" + name + "_Path", path));
        }

        private static void Props(Transform t, (string mesh, float x, float z, float yaw, float scale)[] list)
        {
            foreach (var p in list) Model(t, p.mesh, new Vector3(p.x, 0f, p.z), p.yaw, p.scale, groundAlign: true);
        }

        private static void BuildPlayground(Transform t)
        {
            Ground(t, "Playground", new Color(0.45f, 0.72f, 0.32f), new Color(0.72f, 0.56f, 0.36f));
            // Đu quay: thân + bánh cùng hệ toạ độ (tâm bánh ở gốc), nâng chân đế chạm đất.
            var ferris = new GameObject("FerrisWheel").transform;
            ferris.SetParent(t, false);
            ferris.localPosition = new Vector3(11.5f, 0f, 26f);
            ferris.localScale = Vector3.one * 0.5f;
            GameObject stand = Model(ferris, "ferris-wheel-stand", Vector3.zero, 0f, 1f, groundAlign: false);
            Model(ferris, "ferris-wheel-main", Vector3.zero, 0f, 1f, groundAlign: false);
            float lift = -stand.GetComponent<MeshRenderer>().bounds.min.y + ferris.position.y;
            ferris.localPosition += new Vector3(0f, lift, 0f);
            Props(t, new[]
            {
                ("bumper-car-red", -6.5f, 4.5f, 150f, 1f), ("bumper-car_blue", -4.6f, 5.4f, 210f, 1f),
                ("hot-dog-stand", 4.2f, 5f, 180f, 1f), ("bench-old", 9.5f, 3.6f, 180f, 1.1f),
                ("basketball-stand", -10f, 6f, 160f, 1.1f), ("japan-tree-tall", -13f, 10f, 0f, 0.8f),
                ("japan-tree-tall", 17f, 12f, 30f, 0.9f), ("lamp-city", 1.2f, 4.2f, 0f, 0.8f),
                ("mushroom-boletus", -2.5f, 3.4f, 0f, 1.4f), ("grass-long", 6.5f, 3.2f, 0f, 1.2f), ("grass-long", -8.5f, 3.3f, 40f, 1.2f),
            });
        }

        private static void BuildCity(Transform t)
        {
            Ground(t, "City", new Color(0.62f, 0.62f, 0.64f), new Color(0.34f, 0.35f, 0.38f));
            Material window = UnlitColorMaterial("Map_City_Window", new Color(0.7f, 0.86f, 0.98f));
            var buildings = new (float x, float w, float h, Color color)[]
            {
                (-11f, 4f, 9f, new Color(0.85f, 0.45f, 0.35f)), (-6.5f, 4.2f, 12f, new Color(0.55f, 0.65f, 0.82f)),
                (-2f, 4.4f, 8f, new Color(0.9f, 0.8f, 0.55f)), (2.6f, 4.2f, 13f, new Color(0.62f, 0.55f, 0.78f)),
                (7.2f, 4.4f, 9.5f, new Color(0.45f, 0.72f, 0.62f)), (11.8f, 4.2f, 11f, new Color(0.88f, 0.6f, 0.48f)),
                (16.4f, 4.4f, 8.5f, new Color(0.6f, 0.62f, 0.7f)),
            };
            for (int i = 0; i < buildings.Length; i++)
            {
                var b = buildings[i];
                const float z = 11f, depth = 4f;
                Box(t, "Building", new Vector3(b.x, b.h * 0.5f, z), new Vector3(b.w, b.h, depth), ColorMaterial("Map_City_B" + i, b.color));
                for (float y = 1.4f; y < b.h - 0.8f; y += 1.6f)
                for (float x = -b.w * 0.5f + 0.8f; x < b.w * 0.5f - 0.5f; x += 1.1f)
                    Box(t, "Window", new Vector3(b.x + x + 0.25f, y, z - depth * 0.5f - 0.02f), new Vector3(0.55f, 0.8f, 0.04f), window);
            }
            Cube(t, "Sidewalk", new Vector3(14f, 0.06f, 4.6f), new Vector3(110f, 0.12f, 3.2f), UnlitColorMaterial("Map_City_Sidewalk", new Color(0.72f, 0.72f, 0.74f)));
            Props(t, new[]
            {
                ("lamp-city", -7f, 3.6f, 0f, 0.8f), ("lamp-city", 0.5f, 3.6f, 0f, 0.8f), ("lamp-city", 8f, 3.6f, 0f, 0.8f),
                ("car-broken", 11.5f, 5.6f, 90f, 1f), ("bench-old", -3.5f, 4.4f, 180f, 1.1f), ("fountain", -12f, 7f, 0f, 0.6f),
            });
        }

        private static void BuildFarm(Transform t)
        {
            Ground(t, "Farm", new Color(0.52f, 0.74f, 0.32f), new Color(0.6f, 0.44f, 0.28f));
            for (float x = -16f; x < 22f; x += 2f) Model(t, "fence-classic", new Vector3(x, 0f, 3.4f), 0f, 1f, groundAlign: true);
            Props(t, new[]
            {
                ("farm-house", -8.5f, 15f, 25f, 0.7f), ("haystack", 4.8f, 5f, 0f, 1.1f), ("hay-pile", 7f, 6f, 30f, 1f),
                ("hay-cube", 3.2f, 4.4f, 10f, 1.1f), ("hay-cube", 3.4f, 4.4f, -5f, 1.1f), ("horse", 10.5f, 5.5f, 90f, 1.1f),
                ("japan-tree-tall", 15f, 11f, 0f, 0.8f), ("japan-tree-tall", -15f, 9f, 50f, 0.7f), ("farm-flower-bed", -2f, 6.5f, 0f, 0.8f),
            });
        }

        private static void BuildMansion(Transform t)
        {
            Ground(t, "Mansion", new Color(0.16f, 0.24f, 0.2f), new Color(0.28f, 0.27f, 0.3f));
            Props(t, new[]
            {
                ("castle-medieval", 3f, 39f, 0f, 0.36f), ("gate-medieval_medium", -11f, 11f, 0f, 0.45f),
                ("lamp-city", -5f, 3.6f, 0f, 0.8f), ("lamp-city", 5.5f, 3.6f, 0f, 0.8f), ("lamp-city", 11.5f, 3.6f, 0f, 0.8f),
                ("flag-medieval", 10f, 8f, 0f, 0.8f), ("japan-tree-tall", -15f, 9f, 0f, 0.8f), ("mushroom-boletus", -2f, 3.4f, 0f, 1.4f),
            });
            var moon = GameObject.CreatePrimitive(PrimitiveType.Sphere);
            Object.DestroyImmediate(moon.GetComponent<Collider>());
            moon.name = "Moon";
            moon.transform.SetParent(t, false);
            moon.transform.localPosition = new Vector3(12.5f, 3.2f, 42f);
            moon.transform.localScale = Vector3.one * 1.7f;
            moon.GetComponent<MeshRenderer>().sharedMaterial = UnlitColorMaterial("Map_Mansion_Moon", new Color(0.98f, 0.95f, 0.8f));
        }

        // ───────────────────────────── Thumbnail ─────────────────────────────

        /// <summary>Dây treo chưa có vị trí trong Editor (lúc chạy RopeHangView mới vẽ) → đặt sẵn để thumbnail có dây.</summary>
        private static void SetRopePreview(MapContext c)
        {
            var so = new SerializedObject(c.Rope);
            var line = (LineRenderer)so.FindProperty("_rope").objectReferenceValue;
            var anchor = (Transform)so.FindProperty("_anchor").objectReferenceValue;
            line.positionCount = 2;
            line.SetPosition(0, anchor.position);
            line.SetPosition(1, c.HangRider.transform.position + Vector3.up * RiderHeight);
        }

        /// <summary>
        /// Ảnh thẻ chọn map: ưu tiên ảnh người dùng đặt sẵn trong Generated/Thumbs/&lt;Map&gt;-phuc-hoi-mat-dat.png;
        /// thiếu ảnh nào thì chụp từ scene cho map đó (Map_&lt;Map&gt;.png).
        /// </summary>
        private static Sprite[] LoadThumbnails(MapContext c, List<MapTheme> themes)
        {
            var sprites = new Sprite[themes.Count];
            bool missing = false;
            for (int i = 0; i < themes.Count; i++)
            {
                string path = Gen + "Thumbs/" + Themes[i].Name + "-phuc-hoi-mat-dat.png";
                if (File.Exists(path)) sprites[i] = UiSprite(path);
                else missing = true;
            }
            if (!missing) return sprites;
            Sprite[] rendered = RenderThumbnails(c, themes);
            for (int i = 0; i < sprites.Length; i++)
                if (sprites[i] == null) sprites[i] = rendered[i];
            return sprites;
        }

        private static Sprite[] RenderThumbnails(MapContext c, List<MapTheme> themes)
        {
            CartRescueArt.EnsureFolder(Gen + "Thumbs");
            const int w = 1000, h = 580;
            var go = new GameObject("ThumbCam");
            var cam = go.AddComponent<Camera>();
            cam.CopyFrom(c.Camera);
            const float pitch = 10f;
            float aspect = (float)w / h;
            cam.orthographic = true;
            cam.orthographicSize = Mathf.Max(ShowcaseFocus.height * 0.5f * Mathf.Cos(pitch * Mathf.Deg2Rad), ShowcaseFocus.width * 0.5f / aspect) * 1.02f;
            Quaternion rot = Quaternion.Euler(pitch, 0f, 0f);
            go.transform.SetPositionAndRotation(new Vector3(ShowcaseFocus.center.x, ShowcaseFocus.center.y, 0f) - rot * Vector3.forward * 30f, rot);

            Color ambient = RenderSettings.ambientLight;
            float intensity = c.Light.intensity;
            if (c.Room != null) c.Room.SetActive(false);
            var sprites = new Sprite[themes.Count];
            for (int i = 0; i < themes.Count; i++)
            {
                foreach (MapTheme t in themes) t.gameObject.SetActive(false);
                themes[i].Apply(cam, c.Light);
                var rt = new RenderTexture(w, h, 24);
                cam.targetTexture = rt;
                cam.Render();
                RenderTexture.active = rt;
                var tex = new Texture2D(w, h, TextureFormat.RGB24, false);
                tex.ReadPixels(new Rect(0, 0, w, h), 0, 0);
                tex.Apply();
                string path = Gen + "Thumbs/Map_" + Themes[i].Name + ".png";
                File.WriteAllBytes(path, tex.EncodeToPNG());
                RenderTexture.active = null;
                cam.targetTexture = null;
                Object.DestroyImmediate(rt);
                Object.DestroyImmediate(tex);
                AssetDatabase.ImportAsset(path);
                sprites[i] = UiSprite(path, 512);
            }
            Object.DestroyImmediate(go);
            RenderSettings.ambientLight = ambient;
            c.Light.intensity = intensity;
            return sprites;
        }

        // ───────────────────────────── UI: bảng chọn map ─────────────────────────────

        private static void BuildSelectPanel(MapContext c, Sprite[] thumbs, out CanvasGroup group, out List<Object> cards, out List<Object> frames)
        {
            Sprite rounded = AssetDatabase.GetBuiltinExtraResource<Sprite>("UI/Skin/UISprite.psd");
            var panelGo = new GameObject("MapSelect", typeof(RectTransform), typeof(Image), typeof(CanvasGroup));
            panelGo.transform.SetParent(c.Ui.Canvas, false);
            var panel = (RectTransform)panelGo.transform;
            panel.anchorMin = Vector2.zero;
            panel.anchorMax = Vector2.one;
            panel.offsetMin = panel.offsetMax = Vector2.zero;
            panelGo.GetComponent<Image>().color = new Color(0f, 0f, 0f, 0.55f);
            group = panelGo.GetComponent<CanvasGroup>();

            var board = new GameObject("Board", typeof(RectTransform)).GetComponent<RectTransform>();
            board.SetParent(panel, false);
            board.anchorMin = board.anchorMax = new Vector2(0.5f, 0.5f);
            var fit = board.gameObject.AddComponent<FitInParent>();
            var fso = new SerializedObject(fit);
            fso.FindProperty("_designSize").vector2Value = new Vector2(1100f, 800f);
            fso.FindProperty("_fill").vector2Value = new Vector2(0.95f, 0.85f);
            fso.ApplyModifiedPropertiesWithoutUndo();

            TextMeshProUGUI title = HintLine(board, "CHOOSE YOUR MAP", _hintFont, _hintMaterial, Color.white, 345f, 1100f);
            title.fontSize = 66f;

            cards = new List<Object>();
            frames = new List<Object>();
            Vector2 cardSize = new Vector2(520f, 320f);
            Vector2[] positions = { new Vector2(-272f, 120f), new Vector2(272f, 120f), new Vector2(-272f, -228f), new Vector2(272f, -228f) };
            for (int i = 0; i < Themes.Length; i++)
            {
                var cardGo = new GameObject("Card_" + Themes[i].Name, typeof(RectTransform), typeof(Image), typeof(Button));
                cardGo.transform.SetParent(board, false);
                var card = (RectTransform)cardGo.transform;
                card.anchorMin = card.anchorMax = new Vector2(0.5f, 0.5f);
                card.sizeDelta = cardSize;
                card.anchoredPosition = positions[i];
                var frame = cardGo.GetComponent<Image>();
                frame.sprite = rounded;
                frame.type = Image.Type.Sliced;
                frame.pixelsPerUnitMultiplier = 0.35f;
                frame.color = Color.white;

                // Ảnh thẻ chỉ dùng RectTransform + RawImage (không RectMask2D / AspectRatioFitter — Luna không cắt mask):
                // khung vừa đúng thẻ (cách mép 12), phần ảnh thừa so với tỉ lệ khung bị cắt bằng uvRect → phủ kín, không méo.
                var thumbGo = new GameObject("Thumb", typeof(RectTransform), typeof(RawImage));
                var thumbRect = (RectTransform)thumbGo.transform;
                thumbRect.SetParent(card, false);
                thumbRect.anchorMin = Vector2.zero;
                thumbRect.anchorMax = Vector2.one;
                thumbRect.offsetMin = new Vector2(12f, 12f);
                thumbRect.offsetMax = new Vector2(-12f, -12f);
                thumbRect.SetSiblingIndex(0);
                var raw = thumbGo.GetComponent<RawImage>();
                raw.texture = thumbs[i].texture;
                raw.raycastTarget = false;
                raw.uvRect = CoverUv(thumbs[i], cardSize - new Vector2(24f, 24f));

                Image bar = UiImage("LabelBar", card, rounded);
                bar.type = Image.Type.Sliced;
                bar.color = new Color(0.1f, 0.12f, 0.2f, 0.9f);
                bar.rectTransform.anchorMin = new Vector2(0.18f, 0f);
                bar.rectTransform.anchorMax = new Vector2(0.82f, 0f);
                bar.rectTransform.pivot = new Vector2(0.5f, 0f);
                bar.rectTransform.offsetMin = new Vector2(0f, 18f);
                bar.rectTransform.offsetMax = new Vector2(0f, 76f);
                TextMeshProUGUI label = HintLine(bar.rectTransform, Themes[i].Label, _hintFont, _hintMaterial, Color.white, 0f, 340f);
                label.fontSize = 36f;
                label.rectTransform.anchorMin = label.rectTransform.anchorMax = new Vector2(0.5f, 0.5f);
                label.rectTransform.anchoredPosition = Vector2.zero;

                cards.Add(cardGo.GetComponent<Button>());
                frames.Add(frame);
            }
        }

        /// <summary>uvRect kiểu "phủ kín": giữ tỉ lệ ảnh, cắt phần thừa ở 2 bên (hoặc trên/dưới) để vừa khung <paramref name="box"/>.</summary>
        private static Rect CoverUv(Sprite sprite, Vector2 box)
        {
            Rect tr = sprite.textureRect;
            float texW = sprite.texture.width, texH = sprite.texture.height;
            float imgAspect = tr.width / tr.height, boxAspect = box.x / box.y;
            var uv = new Rect(tr.x / texW, tr.y / texH, tr.width / texW, tr.height / texH);
            if (imgAspect > boxAspect)
            {
                float w = uv.width * boxAspect / imgAspect;
                uv.x += (uv.width - w) * 0.5f;
                uv.width = w;
            }
            else
            {
                float h = uv.height * imgAspect / boxAspect;
                uv.y += (uv.height - h) * 0.5f;
                uv.height = h;
            }
            return uv;
        }

        // ───────────────────────────── UI: màn chơi tĩnh ─────────────────────────────

        private static List<RectTransform> BuildShowcaseUi(MapContext c, Transform goal)
        {
            Sprite rounded = AssetDatabase.GetBuiltinExtraResource<Sprite>("UI/Skin/UISprite.psd");
            Sprite knob = AssetDatabase.GetBuiltinExtraResource<Sprite>("UI/Skin/Knob.psd");
            var list = new List<RectTransform>();

            // Tiêu đề + dải phụ "DRAG • DROP • MOVE".
            var header = new GameObject("RescueHeader", typeof(RectTransform)).GetComponent<RectTransform>();
            header.SetParent(c.Ui.Canvas, false);
            header.sizeDelta = new Vector2(1000f, 220f);
            AnchorBy(header, new Vector2(0.5f, 0.86f), new Vector2(0.5f, 0.8f));   // dưới hàng HUD trên cùng
            TextMeshProUGUI title = HintLine(header, "RESCUE <color=#FFDB1A>THEM ALL!</color>", _hintFont, _hintMaterial, Color.white, 40f, 1000f);
            title.enableAutoSizing = true;   // màn dọc hẹp: tự co để không tràn mép
            title.fontSizeMin = 30f;
            title.fontSizeMax = 78f;
            title.rectTransform.sizeDelta = new Vector2(1000f, 120f);
            Image pill = UiImage("Pill", header, rounded);
            pill.type = Image.Type.Sliced;
            pill.color = new Color(0.1f, 0.12f, 0.22f, 0.92f);
            pill.rectTransform.anchorMin = pill.rectTransform.anchorMax = new Vector2(0.5f, 0.5f);
            pill.rectTransform.sizeDelta = new Vector2(600f, 76f);
            pill.rectTransform.anchoredPosition = new Vector2(0f, -58f);
            string[] words = { "DRAG", "DROP", "MOVE" };
            for (int i = 0; i < words.Length; i++)
            {
                TextMeshProUGUI w = HintLine(pill.rectTransform, words[i], _hintFont, _hintMaterial, Color.white, 0f, 220f);
                w.fontSize = 38f;
                w.rectTransform.anchorMin = w.rectTransform.anchorMax = new Vector2(0.5f, 0.5f);
                w.rectTransform.anchoredPosition = new Vector2((i - 1) * 190f, 0f);
                if (i == 0) continue;
                Image dot = UiImage("Dot", pill.rectTransform, knob);
                dot.color = Yellow;
                dot.rectTransform.anchorMin = dot.rectTransform.anchorMax = new Vector2(0.5f, 0.5f);
                dot.rectTransform.sizeDelta = new Vector2(16f, 16f);
                dot.rectTransform.anchoredPosition = new Vector2((i - 1.5f) * 190f, 0f);
            }
            header.gameObject.AddComponent<NotchSafeArea>();
            list.Add(header);

            // Khung "DRAG HIM INTO THE CART!" bên phải nhân vật treo, mũi tên chỉ sang trái vào nhân vật.
            RectTransform dragCallout = Callout(c, "DragCallout", "DRAG HIM", "INTO THE CART!", c.HangRider.transform,
                new Vector3(0f, RiderHeight * 0.6f, 0f), new Vector2(430f, 0f), arrowLeft: true);
            // Mũi tên bám sát mép phải thật của nhân vật (không đè), ở mọi tỉ lệ màn hình.
            var dso = new SerializedObject(dragCallout.GetComponent<WorldAnchoredUI>());
            dso.FindProperty("_snapRenderersRoot").objectReferenceValue = c.HangRider.transform;
            dso.FindProperty("_tip").objectReferenceValue = dragCallout.Find("Arrow");
            dso.FindProperty("_tipGap").floatValue = 6f;
            dso.FindProperty("_tipInset").floatValue = 11f;   // arrow-right.png: 13/130 px trong suốt ở đầu mũi
            dso.ApplyModifiedPropertiesWithoutUndo();
            list.Add(dragCallout);
            // Khung "MOVE THE CART TO THE GOAL!" bên trái cổng, mũi tên chỉ sang phải vào cổng.
            RectTransform goalCallout = Callout(c, "GoalCallout", "MOVE THE CART", "TO THE GOAL!", goal,
                new Vector3(-1.6f, 2.2f, 0f), new Vector2(-215f, 0f), arrowLeft: false);
            // Màn dọc: đặt xuống dưới mặt đường (dưới cổng) để không đè lên nhân vật trên xe.
            var gso = new SerializedObject(goalCallout.GetComponent<WorldAnchoredUI>());
            gso.FindProperty("_usePortraitOffset").boolValue = true;
            gso.FindProperty("_portraitWorldOffset").vector3Value = new Vector3(-9.2f, -1.3f, 0f);   // ngay dưới xe
            gso.FindProperty("_portraitCanvasOffset").vector2Value = new Vector2(0f, -40f);
            gso.ApplyModifiedPropertiesWithoutUndo();
            list.Add(goalCallout);

            // Bảng "GOAL" trên cổng.
            var goalLabel = new GameObject("GoalLabel", typeof(RectTransform), typeof(Image)).GetComponent<RectTransform>();
            goalLabel.SetParent(c.Ui.Canvas, false);
            goalLabel.sizeDelta = new Vector2(190f, 70f);
            var gl = goalLabel.GetComponent<Image>();
            gl.sprite = rounded;
            gl.type = Image.Type.Sliced;
            gl.color = new Color(0.12f, 0.12f, 0.14f, 0.95f);
            gl.raycastTarget = false;
            TextMeshProUGUI goalText = HintLine(goalLabel, "GOAL", _hintFont, _hintMaterial, Yellow, 0f, 190f);
            goalText.fontSize = 44f;
            goalText.rectTransform.anchorMin = goalText.rectTransform.anchorMax = new Vector2(0.5f, 0.5f);
            Follow(goalLabel, c, goal.Find("LabelAnchor"), Vector3.zero, Vector2.zero);
            list.Add(goalLabel);
            BuildHud(c, list);
            return list;
        }

        /// <summary>
        /// HUD như demo: trên-trái hàng 5 mặt cười (số nhân vật cần cứu) + đồng hồ "30" + 2 mặt nhân vật đỏ; trên-phải nút
        /// tạm dừng; dưới-trái joystick; dưới-phải 2 nút tròn (nhân vật / tô màu). Chỉ trang trí — chạm vào đâu cũng CTA.
        /// </summary>
        private static TextMeshProUGUI _timerLabel;

        private static void BuildHud(MapContext c, List<RectTransform> list)
        {
            Sprite knob = AssetDatabase.GetBuiltinExtraResource<Sprite>("UI/Skin/Knob.psd");
            Sprite rounded = AssetDatabase.GetBuiltinExtraResource<Sprite>("UI/Skin/UISprite.psd");
            Sprite smiley = UiSprite(Src + "UI/HUD_FaceHappy.png");
            Sprite brainrot = UiSprite(Src + "UI/HUD_FaceAngry.png");
            var dark = new Color(0.1f, 0.12f, 0.22f, 0.9f);

            // Trên-trái.
            RectTransform top = Corner(c, "HudTopLeft", new Vector2(0f, 1f), new Vector2(30f, -28f), new Vector2(700f, 90f));
            float x = 0f;
            for (int i = 0; i < 5; i++, x += 74f) Icon(top, "Smiley", smiley, new Vector2(x, 0f), 68f, Color.white);
            Image timer = Icon(top, "Timer", knob, new Vector2(x + 8f, 0f), 76f, dark);
            TextMeshProUGUI t = HintLine(timer.rectTransform, "30", _hintFont, _hintMaterial, Color.white, 0f, 76f);
            _timerLabel = t;
            t.fontSize = 36f;
            t.rectTransform.anchorMin = t.rectTransform.anchorMax = new Vector2(0.5f, 0.5f);
            x += 100f;
            for (int i = 0; i < 2; i++, x += 74f) Icon(top, "Enemy", brainrot, new Vector2(x, 0f), 72f, Color.white).preserveAspect = true;
            top.gameObject.AddComponent<NotchSafeArea>();   // màn dọc dáng dài: tránh tai thỏ
            list.Add(top);

            // Trên-phải: nút tạm dừng.
            RectTransform pause = Corner(c, "HudPause", new Vector2(1f, 1f), new Vector2(-30f, -28f), new Vector2(88f, 88f));
            Image pbg = UiImage("Bg", pause, rounded);
            pbg.type = Image.Type.Sliced;
            pbg.color = dark;
            foreach (float bx in new[] { -13f, 13f })
            {
                Image bar = UiImage("Bar", pause, null);
                bar.rectTransform.anchorMin = bar.rectTransform.anchorMax = new Vector2(0.5f, 0.5f);
                bar.rectTransform.sizeDelta = new Vector2(14f, 42f);
                bar.rectTransform.anchoredPosition = new Vector2(bx, 0f);
            }
            pause.gameObject.AddComponent<NotchSafeArea>();
            list.Add(pause);

            // Dưới-trái: joystick.
            RectTransform joy = Corner(c, "HudJoystick", new Vector2(0f, 0f), new Vector2(40f, 40f), new Vector2(220f, 220f));
            Image jbase = UiImage("Base", joy, knob);
            jbase.color = new Color(0.1f, 0.12f, 0.22f, 0.45f);
            Image jknob = UiImage("Knob", joy, knob);
            jknob.rectTransform.anchorMin = jknob.rectTransform.anchorMax = new Vector2(0.5f, 0.5f);
            jknob.rectTransform.sizeDelta = new Vector2(100f, 100f);
            jknob.color = new Color(1f, 1f, 1f, 0.95f);
            list.Add(joy);

            // Dưới-phải: 2 nút tròn có icon.
            list.Add(RoundButton(c, "HudCharacter", new Vector2(-190f, 40f), UiSprite(Src + "UI/HUD_BtnCharacter.png"), knob, dark));
            list.Add(RoundButton(c, "HudPaint", new Vector2(-40f, 40f), UiSprite(Src + "UI/HUD_BtnPaint.png"), knob, dark));
        }

        private static RectTransform Corner(MapContext c, string name, Vector2 anchor, Vector2 pos, Vector2 size)
        {
            var rt = new GameObject(name, typeof(RectTransform)).GetComponent<RectTransform>();
            rt.SetParent(c.Ui.Canvas, false);
            rt.anchorMin = rt.anchorMax = anchor;
            rt.pivot = anchor;
            rt.anchoredPosition = pos;
            rt.sizeDelta = size;
            return rt;
        }

        private static Image Icon(RectTransform parent, string name, Sprite sprite, Vector2 leftCenter, float size, Color color)
        {
            Image img = UiImage(name, parent, sprite);
            var rt = img.rectTransform;
            rt.anchorMin = rt.anchorMax = new Vector2(0f, 0.5f);
            rt.pivot = new Vector2(0f, 0.5f);
            rt.sizeDelta = new Vector2(size, size);
            rt.anchoredPosition = leftCenter;
            img.color = color;
            return img;
        }

        /// <summary>Nút tròn HUD: nền tròn tối + ảnh icon (đã có sẵn vòng viền trắng — Tools~/clean_icons.py).</summary>
        private static RectTransform RoundButton(MapContext c, string name, Vector2 pos, Sprite icon, Sprite circle, Color bg)
        {
            RectTransform rt = Corner(c, name, new Vector2(1f, 0f), pos, new Vector2(130f, 130f));
            Image b = UiImage("Bg", rt, circle);
            b.color = bg;
            b.rectTransform.offsetMin = new Vector2(4f, 4f);
            b.rectTransform.offsetMax = new Vector2(-4f, -4f);
            Image ic = UiImage("Icon", rt, icon);
            ic.preserveAspect = true;
            return rt;
        }

        private static RectTransform Callout(MapContext c, string name, string line1, string line2, Transform target, Vector3 worldOffset, Vector2 canvasOffset, bool arrowLeft)
        {
            Sprite rounded = AssetDatabase.GetBuiltinExtraResource<Sprite>("UI/Skin/UISprite.psd");
            var box = new GameObject(name, typeof(RectTransform), typeof(Image)).GetComponent<RectTransform>();
            box.SetParent(c.Ui.Canvas, false);
            box.sizeDelta = new Vector2(400f, 130f);
            var bg = box.GetComponent<Image>();
            bg.sprite = rounded;
            bg.type = Image.Type.Sliced;
            bg.color = new Color(0.1f, 0.12f, 0.22f, 0.92f);
            bg.raycastTarget = false;
            TextMeshProUGUI a = HintLine(box, line1, _hintFont, _hintMaterial, Color.white, 26f, 400f);
            a.fontSize = 38f;
            TextMeshProUGUI b = HintLine(box, line2, _hintFont, _hintMaterial, Yellow, -26f, 400f);
            b.fontSize = 38f;
            foreach (TextMeshProUGUI t in new[] { a, b })
                t.rectTransform.anchorMin = t.rectTransform.anchorMax = new Vector2(0.5f, 0.5f);

            Image arrow = UiImage("Arrow", box, UiSprite(ArrowPath));
            arrow.color = Yellow;
            arrow.preserveAspect = true;
            var ar = arrow.rectTransform;
            ar.anchorMin = ar.anchorMax = new Vector2(arrowLeft ? 0f : 1f, 0.5f);
            ar.sizeDelta = new Vector2(110f, 90f);
            ar.anchoredPosition = new Vector2(arrowLeft ? -62f : 62f, 0f);
            ar.localScale = new Vector3(arrowLeft ? -1f : 1f, 1f, 1f);
            Follow(box, c, target, worldOffset, canvasOffset);
            return box;
        }

        private static void Follow(RectTransform rect, MapContext c, Transform target, Vector3 worldOffset, Vector2 canvasOffset)
        {
            rect.anchorMin = rect.anchorMax = new Vector2(0.5f, 0.5f);
            var follow = rect.gameObject.AddComponent<WorldAnchoredUI>();
            var so = new SerializedObject(follow);
            so.FindProperty("_target").objectReferenceValue = target;
            so.FindProperty("_worldOffset").vector3Value = worldOffset;
            so.FindProperty("_canvasOffset").vector2Value = canvasOffset;
            so.FindProperty("_canvasRect").objectReferenceValue = c.Ui.Canvas;
            so.FindProperty("_worldCamera").objectReferenceValue = c.Camera;
            so.ApplyModifiedPropertiesWithoutUndo();
        }

        private static void AnchorBy(RectTransform rect, Vector2 portrait, Vector2 landscape)
        {
            rect.anchorMin = rect.anchorMax = landscape;
            var anchor = rect.gameObject.AddComponent<AspectAnchor>();
            var so = new SerializedObject(anchor);
            so.FindProperty("_portrait").vector2Value = portrait;
            so.FindProperty("_landscape").vector2Value = landscape;
            so.ApplyModifiedPropertiesWithoutUndo();
        }
    }
}
