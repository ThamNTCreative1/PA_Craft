using System;
using System.IO;
using TMPro;
using UnityEditor;
using UnityEditor.SceneManagement;
using UnityEngine;
using UnityEngine.EventSystems;
using UnityEngine.Rendering;
using UnityEngine.UI;
using Object = UnityEngine.Object;

namespace Playable.CutRope.EditorTools
{
    /// <summary>
    /// Dựng playable "Cut the rope!" vào Assets/_Playable_/Scenes/Gameplay.unity.
    ///
    /// Theo quy ước repo (xem ChooseMonster/Editor/ChooseMonsterSetup.cs): nội dung cũ của Gameplay.unity
    /// bị XOÁ — khôi phục bằng `git checkout -- Assets/_Playable_/Scenes/Gameplay.unity`.
    /// Sau khi đã chỉnh tay trong scene thì KHÔNG chạy lại menu này (sẽ mất chỉnh sửa).
    /// </summary>
    public static class CutRopeSetup
    {
        private const string Root = "Assets/_Playable_/CutRope/";
        private const string Gen = Root + "Generated/";
        private const string ScenePath = "Assets/_Playable_/Scenes/Gameplay.unity";
        private const string FontPath = "Assets/_Playable_/ChooseMonster/Generated/FFFFORWA Static SDF.asset";
        private const string FontOutlinePath = "Assets/_Playable_/ChooseMonster/Generated/FFFFORWA Static Outline.mat";
        private const string HandPath = "Assets/_Playable_/TempleRun/UI/Sprites/hand.png";
        private const string CharacterPath = "Assets/Game/Resources/Models/Equipments/S_Base_03.prefab";
        private const string FloorTexturePath = "Assets/stone-tile.png";
        private const string WallTexturePath =
            "Assets/Resources/Resource Packs/vanilla-1.21.4/assets/minecraft/textures/block/double_slab/double_slab_red_sandstone.png";
        private const string Fx = "Assets/Epic Toon FX/Prefabs/";
        private const string MonsterAudio = "Assets/_Playable_/MonsterArmy/Audio/";

        // Bố cục thế giới: camera nhìn theo +Z, nhân vật đứng ở gốc toạ độ.
        private const float BeamY = 7.6f;
        private const float HookY = 5.5f;
        private const float CharacterScale = 1.35f;
        private const int RopeSegments = 16;

        private static TMP_FontAsset _font;
        private static Material _fontOutline;

        private sealed class Mats
        {
            public Material Floor, Wall, SideWall, Beam, Mat, Rope, Anvil, AnvilTop, Hook, Shadow;
        }

        private sealed class Ui
        {
            public CutRopeHud Hud;
            public Button Download;
            public Button EndCard;
        }

        [MenuItem("Tools/Cut Rope/Setup Playable")]
        public static void Apply()
        {
            if (!Application.isBatchMode && !EditorUtility.DisplayDialog("Cut The Rope",
                    "Xoá sạch nội dung hiện tại của Gameplay.unity rồi dựng lại playable Cut The Rope?\n\n" +
                    "Khôi phục được bằng: git checkout -- " + ScenePath,
                    "Dựng", "Huỷ"))
                return;
            Build();
        }

        /// <summary>Bản không hỏi — gọi được từ script/MCP.</summary>
        public static void Build()
        {
            EnsureFolder(Gen.TrimEnd('/'));
            _font = AssetDatabase.LoadAssetAtPath<TMP_FontAsset>(FontPath);
            _fontOutline = AssetDatabase.LoadAssetAtPath<Material>(FontOutlinePath);
            if (_font == null) throw new InvalidOperationException("Missing font: " + FontPath);

            Mats m = BuildMaterials();
            Sprite button = ButtonSprite();

            var scene = EditorSceneManager.OpenScene(ScenePath);
            foreach (GameObject old in scene.GetRootGameObjects()) Object.DestroyImmediate(old);
            ConfigureRenderSettings();

            var root = new GameObject("CutRopePlayable");
            CreateEventSystem(root.transform);
            CreateAudioManager(root.transform);
            CreateLight(root.transform);
            CutRopeCamera cam = CreateCamera(root.transform);
            BuildRoom(root.transform, m);

            Transform ropeTop;
            Transform weight;
            Transform hook;
            BuildBeam(root.transform, m, out ropeTop);
            BuildAnvil(root.transform, m, out weight, out hook);
            RopeView rope = BuildRope(root.transform, m, ropeTop, hook);
            Transform shadow = BuildShadow(root.transform, m);

            Transform character, model;
            Animator animator;
            Renderer head;
            CreateCharacter(root.transform, out character, out model, out animator, out head);

            Ui ui = BuildUi(root.transform, button);

            GameManager gameManager = CreateGameManager(root, ui);
            var controller = root.AddComponent<CutRopeController>();
            var so = new SerializedObject(controller);
            so.FindProperty("_gameManager").objectReferenceValue = gameManager;
            so.FindProperty("_camera").objectReferenceValue = cam;
            so.FindProperty("_hud").objectReferenceValue = ui.Hud;
            so.FindProperty("_downloadButton").objectReferenceValue = ui.Download;
            so.FindProperty("_rope").objectReferenceValue = rope;
            so.FindProperty("_ropeTop").objectReferenceValue = ropeTop;
            so.FindProperty("_weight").objectReferenceValue = weight;
            so.FindProperty("_shadow").objectReferenceValue = shadow;
            so.FindProperty("_character").objectReferenceValue = character;
            so.FindProperty("_characterModel").objectReferenceValue = model;
            so.FindProperty("_characterAnimator").objectReferenceValue = animator;
            // Lưu sẵn độ cao đầu (local, chưa scale) — Luna không tính đúng bounds của SkinnedMeshRenderer.
            if (head != null)
            {
                Bounds hb = head.bounds;
                so.FindProperty("_headTopLocal").floatValue = character.InverseTransformPoint(new Vector3(0f, hb.max.y, 0f)).y;
                so.FindProperty("_headCenterLocal").floatValue = character.InverseTransformPoint(hb.center).y;
            }
            Ref(so, "_hitFx", Fx + "Combat/Brawling/RoundHit/RoundHitYellow.prefab");
            Ref(so, "_stunFx", Fx + "Combat/Brawling/Stun/StunnedCirclingStars.prefab");
            Ref(so, "_dustFx", Fx + "Environment/Dust/DustDirtyPoof.prefab");
            Ref(so, "_cutClip", "Assets/_Playable_/Sound/789389__modusmogulus__arrow-flyby.wav");
            Ref(so, "_impactClip", MonsterAudio + "Kick.ogg");
            Ref(so, "_landClip", MonsterAudio + "BoxDestroy.ogg");
            Ref(so, "_ohNoClip", "Assets/_Playable_/Sound/ohh-no (mp3cut.net).mp3");
            so.ApplyModifiedPropertiesWithoutUndo();

            EditorSceneManager.MarkSceneDirty(scene);
            EditorSceneManager.SaveScene(scene);
            AssetDatabase.SaveAssets();
            Debug.Log("[CutRope] Dựng xong playable vào " + ScenePath);
        }

        // ------------------------------------------------------------------ assets

        private static Mats BuildMaterials()
        {
            var m = new Mats();
            var stone = AssetDatabase.LoadAssetAtPath<Texture2D>(FloorTexturePath);
            m.Floor = Lit("M_Floor", new Color(0.62f, 0.64f, 0.68f), stone, new Vector2(5f, 7.5f));
            // Tường gạch sa thạch đỏ: 1 ô texture = 1 khối 1m (tường sau 16 x 17, tường bên sâu 20 x 17).
            // Tường bên + sàn kéo dài ra sau camera (z = -14) để màn ngang không thấy mép tường.
            var wallTex = AssetDatabase.LoadAssetAtPath<Texture2D>(WallTexturePath);
            m.Wall = Lit("M_Wall", Color.white, wallTex, new Vector2(16f, 17f));
            m.SideWall = Lit("M_SideWall", new Color(0.78f, 0.78f, 0.78f), wallTex, new Vector2(20f, 17f));
            m.Beam = Lit("M_Beam", new Color(1f, 0.74f, 0.1f), null, Vector2.one);
            m.Mat = Lit("M_Mat", new Color(1f, 0.82f, 0.12f), null, Vector2.one);
            m.Rope = Lit("M_Rope", new Color(0.86f, 0.17f, 0.12f), null, Vector2.one);
            m.Anvil = Lit("M_Anvil", new Color(0.36f, 0.37f, 0.42f), null, Vector2.one, 0.3f, 0.5f);
            m.AnvilTop = Lit("M_AnvilTop", new Color(0.6f, 0.62f, 0.68f), null, Vector2.one, 0.3f, 0.6f);
            m.Hook = Lit("M_Hook", new Color(0.7f, 0.72f, 0.76f), null, Vector2.one, 0.6f, 0.6f);

            var shadow = new Material(Shader.Find("Sprites/Default")) { name = "M_Shadow" };
            shadow.mainTexture = SoftDot("T_SoftDot");
            shadow.color = new Color(0f, 0f, 0f, 0.55f);
            m.Shadow = SaveMaterial(shadow);
            return m;
        }

        private static Material Lit(string name, Color color, Texture2D tex, Vector2 tiling, float metallic = 0f, float smooth = 0.15f)
        {
            var mat = new Material(Shader.Find("Standard")) { name = name };
            mat.color = color;
            if (tex != null)
            {
                mat.mainTexture = tex;
                mat.mainTextureScale = tiling;
            }
            mat.SetFloat("_Metallic", metallic);
            mat.SetFloat("_Glossiness", smooth);
            return SaveMaterial(mat);
        }

        private static Material SaveMaterial(Material m)
        {
            string path = Gen + m.name + ".mat";
            if (AssetDatabase.LoadAssetAtPath<Material>(path) != null) AssetDatabase.DeleteAsset(path);
            AssetDatabase.CreateAsset(m, path);
            return m;
        }

        private static Texture2D SoftDot(string name)
        {
            const int size = 128;
            var tex = new Texture2D(size, size, TextureFormat.RGBA32, false);
            for (int y = 0; y < size; y++)
            for (int x = 0; x < size; x++)
            {
                float dx = (x + 0.5f) / size * 2f - 1f;
                float dy = (y + 0.5f) / size * 2f - 1f;
                float d = Mathf.Sqrt(dx * dx + dy * dy);
                float a = Mathf.Clamp01(1f - Mathf.SmoothStep(0.45f, 1f, d));
                tex.SetPixel(x, y, new Color(1f, 1f, 1f, a));
            }
            tex.Apply();
            return SaveTexture(tex, name, false);
        }

        /// <summary>Nút xanh lá bo tròn, viền xanh rêu đậm, dải sáng phía trên (620 x 200).</summary>
        private static Sprite ButtonSprite()
        {
            const int w = 620, h = 200;
            const float radius = 96f, border = 10f;
            var tex = new Texture2D(w, h, TextureFormat.RGBA32, false);
            Color outline = new Color32(0x0B, 0x3A, 0x0E, 0xFF);
            Color top = new Color32(0x9C, 0xF2, 0x3A, 0xFF);
            Color bottom = new Color32(0x2E, 0xB8, 0x2A, 0xFF);
            Color lip = new Color32(0x17, 0x7A, 0x1C, 0xFF);
            for (int y = 0; y < h; y++)
            for (int x = 0; x < w; x++)
            {
                float d = RoundRectDistance(x + 0.5f, y + 0.5f, w, h, radius);
                float alpha = Mathf.Clamp01(0.5f - d);
                Color c;
                if (d > -border) c = outline;
                else
                {
                    float v = (y - border) / (h - border * 2f);
                    c = Color.Lerp(bottom, top, Mathf.SmoothStep(0f, 1f, v));
                    // Gờ tối dưới đáy tạo độ dày.
                    if (y < border + 18f) c = Color.Lerp(lip, c, (y - border) / 18f);
                    // Dải bóng phía trên.
                    float inner = RoundRectDistance(x + 0.5f, y + 0.5f, w, h, radius) + border;
                    if (v > 0.62f && v < 0.86f && inner < -18f) c = Color.Lerp(c, Color.white, 0.35f);
                }
                c.a = alpha;
                tex.SetPixel(x, y, c);
            }
            tex.Apply();
            SaveTexture(tex, "T_ButtonDownload", true);
            return AssetDatabase.LoadAssetAtPath<Sprite>(Gen + "T_ButtonDownload.png");
        }

        private static float RoundRectDistance(float x, float y, float w, float h, float r)
        {
            float qx = Mathf.Abs(x - w * 0.5f) - (w * 0.5f - r);
            float qy = Mathf.Abs(y - h * 0.5f) - (h * 0.5f - r);
            float outside = new Vector2(Mathf.Max(qx, 0f), Mathf.Max(qy, 0f)).magnitude;
            return outside + Mathf.Min(Mathf.Max(qx, qy), 0f) - r;
        }

        private static Texture2D SaveTexture(Texture2D tex, string name, bool sprite)
        {
            string path = Gen + name + ".png";
            File.WriteAllBytes(path, tex.EncodeToPNG());
            Object.DestroyImmediate(tex);
            AssetDatabase.ImportAsset(path, ImportAssetOptions.ForceUpdate);
            var importer = (TextureImporter)AssetImporter.GetAtPath(path);
            importer.textureType = sprite ? TextureImporterType.Sprite : TextureImporterType.Default;
            if (sprite) importer.spriteImportMode = SpriteImportMode.Single;
            importer.textureCompression = TextureImporterCompression.Uncompressed;
            importer.alphaIsTransparency = true;
            importer.mipmapEnabled = false;
            importer.wrapMode = TextureWrapMode.Clamp;
            importer.SaveAndReimport();
            return AssetDatabase.LoadAssetAtPath<Texture2D>(path);
        }

        // ------------------------------------------------------------------ scene

        private static void ConfigureRenderSettings()
        {
            RenderSettings.skybox = null;
            RenderSettings.ambientMode = AmbientMode.Flat;
            RenderSettings.ambientLight = new Color(0.56f, 0.6f, 0.7f);
            RenderSettings.fog = false;
        }

        private static void CreateEventSystem(Transform parent)
        {
            var go = new GameObject("EventSystem", typeof(EventSystem), typeof(StandaloneInputModule));
            go.transform.SetParent(parent, false);
        }

        private static void CreateAudioManager(Transform parent)
        {
            var go = new GameObject("AudioManager");
            go.transform.SetParent(parent, false);
            var music = go.AddComponent<AudioSource>();
            music.playOnAwake = false;
            music.loop = true;
            music.volume = 0.3f;
            var sound = go.AddComponent<AudioSource>();
            sound.playOnAwake = false;
            AudioManager manager = go.AddComponent<AudioManager>();
            var so = new SerializedObject(manager);
            so.FindProperty("_audioMusic").objectReferenceValue = music;
            so.FindProperty("_audioSound").objectReferenceValue = sound;
            so.ApplyModifiedPropertiesWithoutUndo();
        }

        private static void CreateLight(Transform parent)
        {
            var go = new GameObject("Directional Light");
            go.transform.SetParent(parent, false);
            go.transform.rotation = Quaternion.Euler(50f, -30f, 0f);
            var light = go.AddComponent<Light>();
            light.type = LightType.Directional;
            light.color = new Color(1f, 0.96f, 0.9f);
            light.intensity = 1.05f;
            light.shadows = LightShadows.None;
        }

        private static CutRopeCamera CreateCamera(Transform parent)
        {
            var go = new GameObject("Main Camera", typeof(Camera), typeof(AudioListener));
            go.tag = "MainCamera";
            go.transform.SetParent(parent, false);
            go.transform.position = new Vector3(0f, 4.6f, -12f);
            var cam = go.GetComponent<Camera>();
            // SolidColor (không dùng Skybox) — tránh lỗi vệt trắng khi build Luna.
            cam.clearFlags = CameraClearFlags.SolidColor;
            cam.backgroundColor = new Color(0.13f, 0.16f, 0.25f);
            cam.fieldOfView = 45f;
            cam.nearClipPlane = 0.3f;
            cam.farClipPlane = 60f;
            CutRopeCamera fit = go.AddComponent<CutRopeCamera>();
            go.transform.rotation = Quaternion.LookRotation(new Vector3(0f, 3.6f, 0f) - go.transform.position);
            var so = new SerializedObject(fit);
            so.FindProperty("_lookAt").vector3Value = new Vector3(0f, 3.6f, 0f);
            so.FindProperty("_frameHeight").floatValue = 9.6f;
            so.FindProperty("_frameWidth").floatValue = 6.4f;
            so.ApplyModifiedPropertiesWithoutUndo();
            return fit;
        }

        private static void BuildRoom(Transform parent, Mats m)
        {
            var env = new GameObject("Environment").transform;
            env.SetParent(parent, false);
            Block(env, "Floor", new Vector3(0f, -0.5f, -3f), new Vector3(16f, 1f, 24f), m.Floor);
            Block(env, "Back Wall", new Vector3(0f, 8f, 5.5f), new Vector3(16f, 17f, 1f), m.Wall);
            Block(env, "Left Wall", new Vector3(-5.5f, 8f, -4f), new Vector3(1f, 17f, 20f), m.SideWall);
            Block(env, "Right Wall", new Vector3(5.5f, 8f, -4f), new Vector3(1f, 17f, 20f), m.SideWall);
            GameObject mat = Block(env, "Mat", new Vector3(0.15f, 0.03f, 0.1f), new Vector3(2.9f, 0.06f, 1.4f), m.Mat);
            mat.transform.rotation = Quaternion.Euler(0f, -12f, 0f);
        }

        private static void BuildBeam(Transform parent, Mats m, out Transform ropeTop)
        {
            var beam = new GameObject("Beam").transform;
            beam.SetParent(parent, false);
            Block(beam, "Bar", new Vector3(0f, BeamY, 0f), new Vector3(10f, 0.4f, 0.55f), m.Beam);
            Block(beam, "Ring", new Vector3(0f, BeamY - 0.25f, 0f), new Vector3(0.22f, 0.14f, 0.22f), m.Hook);
            ropeTop = new GameObject("Rope Top").transform;
            ropeTop.SetParent(beam, false);
            ropeTop.position = new Vector3(0f, BeamY - 0.3f, 0f);
        }

        /// <summary>Đe sắt kiểu khối Minecraft, gốc ở giữa đáy, móc treo ở đỉnh.</summary>
        private static void BuildAnvil(Transform parent, Mats m, out Transform weight, out Transform hook)
        {
            weight = new GameObject("Anvil").transform;
            weight.SetParent(parent, false);
            weight.position = new Vector3(0f, HookY - 1.5f, 0f);
            Block(weight, "Base", new Vector3(0f, 0.15f, 0f), new Vector3(1.5f, 0.3f, 0.95f), m.Anvil);
            Block(weight, "Step", new Vector3(0f, 0.4f, 0f), new Vector3(1.05f, 0.2f, 0.75f), m.Anvil);
            Block(weight, "Waist", new Vector3(0f, 0.7f, 0f), new Vector3(0.6f, 0.42f, 0.55f), m.Anvil);
            Block(weight, "Face", new Vector3(0.1f, 1.1f, 0f), new Vector3(1.75f, 0.4f, 0.95f), m.AnvilTop);
            Block(weight, "Horn", new Vector3(-1.05f, 1.13f, 0f), new Vector3(0.42f, 0.28f, 0.62f), m.AnvilTop);
            Block(weight, "Horn Tip", new Vector3(-1.36f, 1.16f, 0f), new Vector3(0.22f, 0.18f, 0.36f), m.AnvilTop);
            Block(weight, "Hook", new Vector3(0f, 1.4f, 0f), new Vector3(0.2f, 0.2f, 0.2f), m.Hook);
            hook = new GameObject("Hook Point").transform;
            hook.SetParent(weight, false);
            hook.localPosition = new Vector3(0f, 1.48f, 0f);
        }

        private static RopeView BuildRope(Transform parent, Mats m, Transform top, Transform bottom)
        {
            var go = new GameObject("Rope");
            go.transform.SetParent(parent, false);
            var segments = new Transform[RopeSegments];
            for (int i = 0; i < RopeSegments; i++)
            {
                GameObject s = GameObject.CreatePrimitive(PrimitiveType.Cylinder);
                s.name = "Segment " + i;
                Object.DestroyImmediate(s.GetComponent<Collider>());
                s.transform.SetParent(go.transform, false);
                Renderer r = s.GetComponent<Renderer>();
                r.sharedMaterial = m.Rope;
                r.shadowCastingMode = ShadowCastingMode.Off;
                segments[i] = s.transform;
            }
            RopeView rope = go.AddComponent<RopeView>();
            var so = new SerializedObject(rope);
            so.FindProperty("_top").objectReferenceValue = top;
            so.FindProperty("_bottom").objectReferenceValue = bottom;
            SetArray(so, "_segments", segments);
            so.ApplyModifiedPropertiesWithoutUndo();

            // Đặt sẵn các đoạn thẳng hàng để scene trong Editor nhìn đúng trước khi Play.
            Vector3 a = top.position, b = bottom.position;
            for (int i = 0; i < RopeSegments; i++)
            {
                Vector3 p0 = Vector3.Lerp(a, b, i / (float)RopeSegments);
                Vector3 p1 = Vector3.Lerp(a, b, (i + 1) / (float)RopeSegments);
                segments[i].position = (p0 + p1) * 0.5f;
                segments[i].localScale = new Vector3(0.09f, Vector3.Distance(p0, p1) * 0.5f + 0.02f, 0.09f);
            }
            return rope;
        }

        private static Transform BuildShadow(Transform parent, Mats m)
        {
            GameObject q = GameObject.CreatePrimitive(PrimitiveType.Quad);
            q.name = "Anvil Shadow";
            Object.DestroyImmediate(q.GetComponent<Collider>());
            q.transform.SetParent(parent, false);
            q.transform.position = new Vector3(0f, 0.02f, 0f);
            q.transform.rotation = Quaternion.Euler(90f, 0f, 0f);
            q.transform.localScale = new Vector3(2.1f, 1.5f, 1f);
            Renderer r = q.GetComponent<Renderer>();
            r.sharedMaterial = m.Shadow;
            r.shadowCastingMode = ShadowCastingMode.Off;
            return q.transform;
        }

        private static void CreateCharacter(Transform parent, out Transform character, out Transform model,
            out Animator animator, out Renderer head)
        {
            var root = new GameObject("Character");
            root.transform.SetParent(parent, false);
            root.transform.position = Vector3.zero;
            root.transform.localScale = Vector3.one * CharacterScale;

            var asset = AssetDatabase.LoadAssetAtPath<GameObject>(CharacterPath);
            if (asset == null) throw new InvalidOperationException("Missing character prefab: " + CharacterPath);
            var go = (GameObject)PrefabUtility.InstantiatePrefab(asset);
            go.transform.SetParent(root.transform, false);
            go.transform.localPosition = Vector3.zero;
            go.transform.localRotation = Quaternion.Euler(0f, 180f, 0f);
            foreach (Collider c in go.GetComponentsInChildren<Collider>(true)) Object.DestroyImmediate(c);
            head = null;
            foreach (Renderer r in go.GetComponentsInChildren<Renderer>(true))
            {
                r.shadowCastingMode = ShadowCastingMode.Off;
                var smr = r as SkinnedMeshRenderer;
                if (smr != null) smr.updateWhenOffscreen = true;
                if (head == null && r.name.ToLowerInvariant().Contains("head")) head = r;
            }
            animator = go.GetComponent<Animator>();
            if (animator != null)
            {
                animator.applyRootMotion = false;
                animator.cullingMode = AnimatorCullingMode.AlwaysAnimate;
            }
            character = root.transform;
            model = go.transform;
        }

        // ------------------------------------------------------------------ UI

        private static Ui BuildUi(Transform parent, Sprite buttonSprite)
        {
            var canvasGo = new GameObject("UI Canvas", typeof(RectTransform), typeof(Canvas), typeof(CanvasScaler), typeof(GraphicRaycaster));
            canvasGo.transform.SetParent(parent, false);
            var canvas = canvasGo.GetComponent<Canvas>();
            canvas.renderMode = RenderMode.ScreenSpaceOverlay;
            var scaler = canvasGo.GetComponent<CanvasScaler>();
            scaler.uiScaleMode = CanvasScaler.ScaleMode.ScaleWithScreenSize;
            scaler.referenceResolution = new Vector2(1080f, 1920f);
            canvasGo.AddComponent<ResponsiveCanvasScaler>();

            var ui = new Ui();
            RectTransform layout = Full("Layout Root", canvasGo.transform);
            ui.Hud = layout.gameObject.AddComponent<CutRopeHud>();

            Image hand = Img("Hand", layout, AssetDatabase.LoadAssetAtPath<Sprite>(HandPath));
            hand.rectTransform.pivot = new Vector2(0.3f, 0.97f);
            hand.gameObject.SetActive(false);

            TMP_Text title = Text("Title", layout, "CUT THE ROPE!", 110f);
            AutoSize(title);

            ui.Download = MakeButton("Download Button", layout, buttonSprite, "DOWNLOAD");

            // End card = _btnBlock của GameManager: chạm bất kỳ đâu là mở store.
            RectTransform card = Full("End Card", layout);
            Image dim = card.gameObject.AddComponent<Image>();
            dim.color = new Color(0.05f, 0.06f, 0.13f, 0.6f);
            ui.EndCard = card.gameObject.AddComponent<Button>();
            ui.EndCard.targetGraphic = dim;
            ui.EndCard.transition = Selectable.Transition.None;
            CanvasGroup group = card.gameObject.AddComponent<CanvasGroup>();

            RectTransform content = Rect("Content", card);
            content.sizeDelta = new Vector2(1000f, 1500f);
            Image icon = Img("Game Icon", content, null);
            icon.rectTransform.sizeDelta = new Vector2(380f, 380f);
            icon.rectTransform.anchoredPosition = new Vector2(0f, 560f);
            TMP_Text cardTitle = Text("Title", content, "NICE CUT!", 150f);
            cardTitle.color = new Color(1f, 0.86f, 0.2f);
            cardTitle.rectTransform.sizeDelta = new Vector2(960f, 200f);
            cardTitle.rectTransform.anchoredPosition = new Vector2(0f, 280f);
            AutoSize(cardTitle);
            TMP_Text sub = Text("Subtitle", content, "CAN YOU PASS EVERY LEVEL?", 60f);
            sub.rectTransform.sizeDelta = new Vector2(960f, 100f);
            sub.rectTransform.anchoredPosition = new Vector2(0f, 130f);
            AutoSize(sub);
            Button cardButton = MakeButton("Download Button", content, buttonSprite, "DOWNLOAD");
            var cardButtonRect = (RectTransform)cardButton.transform;
            cardButtonRect.sizeDelta = new Vector2(680f, 680f / 3.1f);
            cardButtonRect.anchoredPosition = new Vector2(0f, -770f);
            // Nút trong end card chỉ là hình — cả end card là 1 nút.
            Object.DestroyImmediate(cardButton);
            cardButtonRect.GetComponent<Image>().raycastTarget = false;
            card.gameObject.SetActive(false);

            var so = new SerializedObject(ui.Hud);
            so.FindProperty("_title").objectReferenceValue = title;
            so.FindProperty("_downloadButton").objectReferenceValue = ui.Download.transform;
            so.FindProperty("_hand").objectReferenceValue = hand.rectTransform;
            so.FindProperty("_endCard").objectReferenceValue = card;
            so.FindProperty("_endCardContent").objectReferenceValue = content;
            so.FindProperty("_endCardButton").objectReferenceValue = cardButtonRect;
            so.FindProperty("_endCardGroup").objectReferenceValue = group;
            so.FindProperty("_endCardIcon").objectReferenceValue = icon;
            so.ApplyModifiedPropertiesWithoutUndo();
            return ui;
        }

        private static Button MakeButton(string name, Transform parent, Sprite sprite, string label)
        {
            Image img = Img(name, parent, sprite);
            img.preserveAspect = false;
            img.raycastTarget = true;
            img.rectTransform.sizeDelta = new Vector2(540f, 540f / 3.1f);
            var button = img.gameObject.AddComponent<Button>();
            button.targetGraphic = img;
            button.transition = Selectable.Transition.None;
            TMP_Text text = Text("Label", img.rectTransform, label, 80f);
            text.rectTransform.anchorMin = new Vector2(0.1f, 0.2f);
            text.rectTransform.anchorMax = new Vector2(0.9f, 0.85f);
            text.rectTransform.offsetMin = text.rectTransform.offsetMax = Vector2.zero;
            AutoSize(text);
            return button;
        }

        private static GameManager CreateGameManager(GameObject root, Ui ui)
        {
            GameManager manager = root.AddComponent<GameManager>();
            var so = new SerializedObject(manager);
            // Luna "End Time": hết giờ mà chưa cắt dây → bật end card, rồi mở store sau 1s.
            so.FindProperty("_endTime").intValue = 30;
            so.FindProperty("_storeOnEndTime").boolValue = false;
            so.FindProperty("_autoStoreAfterEndcard").boolValue = false;
            so.FindProperty("_tapToCtaMode").boolValue = false;
            so.FindProperty("_eggRaisingMode").boolValue = false;
            so.FindProperty("_totalEvent").intValue = 0;
            so.FindProperty("_btnBlock").objectReferenceValue = ui.EndCard;
            Ref(so, "_backgroundMusic", "Assets/Sound/Easy Parkour Music.mp3");
            so.ApplyModifiedPropertiesWithoutUndo();
            return manager;
        }

        // ------------------------------------------------------------------ helpers

        private static GameObject Block(Transform parent, string name, Vector3 position, Vector3 size, Material material)
        {
            GameObject go = GameObject.CreatePrimitive(PrimitiveType.Cube);
            go.name = name;
            Object.DestroyImmediate(go.GetComponent<Collider>());
            go.transform.SetParent(parent, false);
            go.transform.localPosition = position;
            go.transform.localScale = size;
            Renderer r = go.GetComponent<Renderer>();
            r.sharedMaterial = material;
            r.shadowCastingMode = ShadowCastingMode.Off;
            return go;
        }

        private static void Ref(SerializedObject so, string field, string path)
        {
            Object asset = AssetDatabase.LoadAssetAtPath<Object>(path);
            if (asset == null) Debug.LogWarning("[CutRope] Missing asset: " + path);
            so.FindProperty(field).objectReferenceValue = asset;
        }

        private static void EnsureFolder(string path)
        {
            if (AssetDatabase.IsValidFolder(path)) return;
            string parent = Path.GetDirectoryName(path).Replace('\\', '/');
            EnsureFolder(parent);
            AssetDatabase.CreateFolder(parent, Path.GetFileName(path));
        }

        private static void SetArray(SerializedObject so, string field, Object[] values)
        {
            SerializedProperty property = so.FindProperty(field);
            property.arraySize = values.Length;
            for (int i = 0; i < values.Length; i++)
                property.GetArrayElementAtIndex(i).objectReferenceValue = values[i];
        }

        private static RectTransform Rect(string name, Transform parent)
        {
            var rect = new GameObject(name, typeof(RectTransform)).GetComponent<RectTransform>();
            rect.SetParent(parent, false);
            rect.anchorMin = rect.anchorMax = rect.pivot = new Vector2(0.5f, 0.5f);
            return rect;
        }

        private static RectTransform Full(string name, Transform parent)
        {
            RectTransform rect = Rect(name, parent);
            rect.anchorMin = Vector2.zero;
            rect.anchorMax = Vector2.one;
            rect.offsetMin = rect.offsetMax = Vector2.zero;
            return rect;
        }

        private static Image Img(string name, Transform parent, Sprite sprite)
        {
            RectTransform rect = Rect(name, parent);
            rect.sizeDelta = new Vector2(200f, 200f);
            var image = rect.gameObject.AddComponent<Image>();
            image.sprite = sprite;
            image.preserveAspect = true;
            image.raycastTarget = false;
            return image;
        }

        private static TMP_Text Text(string name, Transform parent, string value, float size)
        {
            RectTransform rect = Rect(name, parent);
            rect.sizeDelta = new Vector2(900f, 200f);
            var text = rect.gameObject.AddComponent<TextMeshProUGUI>();
            text.font = _font;
            if (_fontOutline != null) text.fontSharedMaterial = _fontOutline;
            text.text = value;
            text.fontSize = size;
            text.alignment = TextAlignmentOptions.Center;
            text.color = Color.white;
            text.raycastTarget = false;
            text.textWrappingMode = TextWrappingModes.NoWrap;
            return text;
        }

        private static void AutoSize(TMP_Text text)
        {
            text.enableAutoSizing = true;
            text.fontSizeMin = 6f;
            text.fontSizeMax = 400f;
        }
    }
}
