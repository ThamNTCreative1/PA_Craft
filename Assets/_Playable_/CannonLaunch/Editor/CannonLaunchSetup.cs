using System;
using System.Collections.Generic;
using System.IO;
using TMPro;
using UnityEditor;
using UnityEditor.SceneManagement;
using UnityEngine;
using UnityEngine.EventSystems;
using UnityEngine.Rendering;
using UnityEngine.UI;
using Object = UnityEngine.Object;
using Random = System.Random;

namespace Playable.CannonLaunch.EditorTools
{
    /// <summary>
    /// Dựng playable "Cannon Launch" vào Assets/_Playable_/Scenes/Gameplay.unity.
    ///
    /// Theo quy ước repo: nội dung cũ của Gameplay.unity bị XOÁ — khôi phục bằng git. Bản Cut The Rope đã
    /// được sao lưu ở Assets/_Playable_/Scenes/CutRope.unity.
    /// Sau khi đã chỉnh tay trong scene thì KHÔNG chạy lại menu này (sẽ mất chỉnh sửa).
    /// </summary>
    public static class CannonLaunchSetup
    {
        private const string Root = "Assets/_Playable_/CannonLaunch/";
        private const string Gen = Root + "Generated/";
        private const string ScenePath = "Assets/_Playable_/Scenes/Gameplay.unity";
        private const string FontPath = "Assets/_Playable_/ChooseMonster/Generated/FFFFORWA Static SDF.asset";
        private const string FontOutlinePath = "Assets/_Playable_/ChooseMonster/Generated/FFFFORWA Static Outline.mat";
        private const string HandPath = "Assets/_Playable_/TempleRun/UI/Sprites/hand.png";
        private const string CharacterPath = "Assets/Game/Resources/Models/Equipments/S_Base_03.prefab";
        private const string Blocks = "Assets/Texture/vanilla-1.21.4/assets/minecraft/textures/block/";
        private const string Fx = "Assets/Epic Toon FX/Prefabs/";
        private const string MonsterAudio = "Assets/_Playable_/MonsterArmy/Audio/";

        private const float CharacterScale = 1.35f;
        private const float FortTop = 3f;
        private const float WallZ = 52f;
        private const int WallColumns = 12;
        private const int WallRows = 8;
        private static readonly Vector3 BarrelPivot = new Vector3(0f, FortTop + 1.15f, 0f);
        private const float BarrelPitch = -28f;

        private static TMP_FontAsset _font;
        private static Material _fontOutline;

        private sealed class Mats
        {
            public Material Road, Line, Curb, Grass, Leaves, Fort, FortTop, Barrel, CannonBase, Dark;
            public Material[] Wool;
        }

        private sealed class Sprites
        {
            public Sprite Green, Red, Card, Boom, Cash, Hand;
        }

        private sealed class Ui
        {
            public CannonHud Hud;
            public Button Download, Fire, EndCard;
            public Button[] Cards;
        }

        [MenuItem("Tools/Cannon Launch/Setup Playable")]
        public static void Apply()
        {
            if (!Application.isBatchMode && !EditorUtility.DisplayDialog("Cannon Launch",
                    "Xoá sạch nội dung hiện tại của Gameplay.unity rồi dựng lại playable Cannon Launch?",
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
            Sprites sp = BuildSprites();

            var scene = EditorSceneManager.OpenScene(ScenePath);
            foreach (GameObject old in scene.GetRootGameObjects()) Object.DestroyImmediate(old);
            ConfigureRenderSettings();

            var root = new GameObject("CannonLaunchPlayable");
            CreateEventSystem(root.transform);
            CreateAudioManager(root.transform);
            CreateLight(root.transform);
            BuildGround(root.transform, m);
            BuildFort(root.transform, m);
            Transform barrel, muzzle;
            BuildCannon(root.transform, m, out barrel, out muzzle);
            BrickWall wall = BuildWall(root.transform, m);

            Transform character, model;
            Animator animator;
            CreateCharacter(root.transform, barrel, out character, out model, out animator);
            var focus = new GameObject("Flight Focus").transform;
            focus.SetParent(root.transform, false);

            CannonCamera cam = CreateCamera(root.transform);
            Ui ui = BuildUi(root.transform, sp);
            GameManager gameManager = CreateGameManager(root, ui);

            var controller = root.AddComponent<CannonController>();
            var so = new SerializedObject(controller);
            so.FindProperty("_gameManager").objectReferenceValue = gameManager;
            so.FindProperty("_camera").objectReferenceValue = cam;
            so.FindProperty("_hud").objectReferenceValue = ui.Hud;
            so.FindProperty("_fireButton").objectReferenceValue = ui.Fire;
            SetArray(so, "_cardButtons", ui.Cards);
            so.FindProperty("_downloadButton").objectReferenceValue = ui.Download;
            so.FindProperty("_barrel").objectReferenceValue = barrel;
            so.FindProperty("_muzzle").objectReferenceValue = muzzle;
            so.FindProperty("_character").objectReferenceValue = character;
            so.FindProperty("_characterModel").objectReferenceValue = model;
            so.FindProperty("_characterAnimator").objectReferenceValue = animator;
            so.FindProperty("_flightFocus").objectReferenceValue = focus;
            so.FindProperty("_wall").objectReferenceValue = wall;
            so.FindProperty("_characterHalfHeight").floatValue = 0.86f * CharacterScale;
            Ref(so, "_muzzleFx", Fx + "Combat/Explosions/SmallExplosion/SmallExplosionFire.prefab");
            Ref(so, "_landFx", Fx + "Environment/Dust/DustDirtyPoof.prefab");
            Ref(so, "_wallHitFx", Fx + "Combat/Explosions/GrenadeExplosion/GrenadeExplosionFire.prefab");
            Ref(so, "_moneyFx", Fx + "Interactive/Money/Bills/DollarbillBlast.prefab");
            Ref(so, "_fireClip", MonsterAudio + "GrinadeBoom1.ogg");
            Ref(so, "_whooshClip", "Assets/_Playable_/Sound/789389__modusmogulus__arrow-flyby.wav");
            Ref(so, "_landClip", MonsterAudio + "Kick.ogg");
            Ref(so, "_coinClip", "Assets/Sound/GetBonus.mp3");
            Ref(so, "_buyClip", "Assets/Sound/BuySound.mp3");
            Ref(so, "_wallClip", MonsterAudio + "BoxDestroy.ogg");
            Ref(so, "_denyClip", MonsterAudio + "ClickSound.ogg");
            Ref(so, "_failClip", "Assets/_Playable_/Sound/ohh-no (mp3cut.net).mp3");
            Ref(so, "_collapseClip", "Assets/_Playable_/Sound/446625__idkmrgarcia__explosion.wav");
            so.ApplyModifiedPropertiesWithoutUndo();

            EditorSceneManager.MarkSceneDirty(scene);
            EditorSceneManager.SaveScene(scene);
            AssetDatabase.SaveAssets();
            Debug.Log("[CannonLaunch] Dựng xong playable vào " + ScenePath);
        }

        // ------------------------------------------------------------------ materials

        private static Mats BuildMaterials()
        {
            var m = new Mats();
            m.Road = Lit("M_Road", new Color(0.3f, 0.31f, 0.35f), Tex("smooth_stone"), new Vector2(4f, 35f));
            m.Line = Lit("M_Line", new Color(0.97f, 0.97f, 0.97f), null, Vector2.one);
            m.Curb = Lit("M_Curb", new Color(1f, 0.85f, 0.1f), null, Vector2.one);
            m.Grass = Lit("M_Grass", new Color(0.55f, 0.85f, 0.42f), Tex("grass_block_top"), new Vector2(60f, 110f));
            m.Leaves = Lit("M_Leaves", new Color(0.45f, 0.72f, 0.35f), Tex("oak_leaves"), Vector2.one);
            m.Fort = Lit("M_Fort", Color.white, Tex("cobblestone"), new Vector2(8f, 3f));
            m.FortTop = Lit("M_FortTop", Color.white, Tex("stone_bricks"), Vector2.one);
            m.Barrel = Lit("M_Barrel", new Color(0.24f, 0.26f, 0.3f), null, Vector2.one, 0.35f, 0.55f);
            m.CannonBase = Lit("M_CannonBase", new Color(0.52f, 0.58f, 0.98f), null, Vector2.one, 0f, 0.35f);
            m.Dark = Lit("M_Dark", new Color(0.12f, 0.12f, 0.14f), null, Vector2.one);
            // Tường: màu phẳng tươi như demo (texture len nhìn từ xa bị tối và rối).
            Color[] colors =
            {
                new Color32(0x3C, 0xC8, 0x5A, 0xFF), new Color32(0xF0, 0x3C, 0x3C, 0xFF), new Color32(0xFF, 0xC8, 0x28, 0xFF),
                new Color32(0x3C, 0x9C, 0xF0, 0xFF), new Color32(0xFF, 0x8C, 0x28, 0xFF)
            };
            m.Wool = new Material[colors.Length];
            for (int i = 0; i < colors.Length; i++) m.Wool[i] = Lit("M_Brick" + i, colors[i], null, Vector2.one, 0f, 0.25f);
            return m;
        }

        private static Texture2D Tex(string name)
        {
            var t = AssetDatabase.LoadAssetAtPath<Texture2D>(Blocks + name + ".png");
            if (t == null) Debug.LogWarning("[CannonLaunch] Missing texture: " + name);
            return t;
        }

        private static Material Lit(string name, Color color, Texture2D tex, Vector2 tiling, float metallic = 0f, float smooth = 0.1f)
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
            string path = Gen + name + ".mat";
            if (AssetDatabase.LoadAssetAtPath<Material>(path) != null) AssetDatabase.DeleteAsset(path);
            AssetDatabase.CreateAsset(mat, path);
            return mat;
        }

        // ------------------------------------------------------------------ sprites

        private static Sprites BuildSprites()
        {
            var s = new Sprites();
            s.Green = Pill("T_ButtonGreen", 620, 200, new Color32(0x9C, 0xF2, 0x3A, 0xFF), new Color32(0x2E, 0xB8, 0x2A, 0xFF),
                new Color32(0x17, 0x7A, 0x1C, 0xFF), new Color32(0x0B, 0x3A, 0x0E, 0xFF), 96f);
            s.Red = Pill("T_ButtonFire", 580, 200, new Color32(0xFF, 0x5A, 0x2E, 0xFF), new Color32(0xF0, 0x2A, 0x10, 0xFF),
                new Color32(0xA8, 0x14, 0x08, 0xFF), new Color32(0x1E, 0x08, 0x06, 0xFF), 56f);
            s.Card = Card("T_Card");
            s.Boom = Boom("T_IconBoom");
            s.Cash = Cash("T_IconCash");
            s.Hand = AssetDatabase.LoadAssetAtPath<Sprite>(HandPath);
            return s;
        }

        /// <summary>Nút bo tròn có gradient, gờ tối dưới đáy, viền đậm, dải bóng phía trên.</summary>
        private static Sprite Pill(string name, int w, int h, Color top, Color bottom, Color lip, Color outline, float radius)
        {
            const float border = 10f;
            var tex = new Texture2D(w, h, TextureFormat.RGBA32, false);
            for (int y = 0; y < h; y++)
            for (int x = 0; x < w; x++)
            {
                float d = RoundRect(x + 0.5f, y + 0.5f, w, h, radius);
                Color c;
                if (d > -border) c = outline;
                else
                {
                    float v = (y - border) / (h - border * 2f);
                    c = Color.Lerp(bottom, top, Mathf.SmoothStep(0f, 1f, v));
                    if (y < border + 18f) c = Color.Lerp(lip, c, (y - border) / 18f);
                    if (v > 0.62f && v < 0.86f && d + border < -18f) c = Color.Lerp(c, Color.white, 0.3f);
                }
                c.a = Mathf.Clamp01(0.5f - d);
                tex.SetPixel(x, y, c);
            }
            return SaveSprite(tex, name);
        }

        /// <summary>Thẻ trắng bo góc, viền đen dày (đúng kiểu thẻ Upgrade trong demo).</summary>
        private static Sprite Card(string name)
        {
            const int w = 300, h = 286;
            const float radius = 46f, border = 9f;
            var tex = new Texture2D(w, h, TextureFormat.RGBA32, false);
            Color outline = new Color32(0x16, 0x16, 0x1C, 0xFF);
            Color fill = Color.white;
            Color shade = new Color32(0xDD, 0xE0, 0xE8, 0xFF);
            for (int y = 0; y < h; y++)
            for (int x = 0; x < w; x++)
            {
                float d = RoundRect(x + 0.5f, y + 0.5f, w, h, radius);
                Color c = d > -border ? outline : (y < border + 14f ? shade : fill);
                c.a = Mathf.Clamp01(0.5f - d);
                tex.SetPixel(x, y, c);
            }
            return SaveSprite(tex, name);
        }

        /// <summary>Biểu tượng vụ nổ: sao nhiều cánh đỏ, lõi vàng, viền tối.</summary>
        private static Sprite Boom(string name)
        {
            const int size = 256;
            var tex = new Texture2D(size, size, TextureFormat.RGBA32, false);
            Color outline = new Color32(0x2A, 0x0A, 0x0A, 0xFF);
            Color red = new Color32(0xE8, 0x26, 0x3A, 0xFF);
            Color yellow = new Color32(0xFF, 0xD4, 0x2A, 0xFF);
            const int spikes = 9;
            for (int y = 0; y < size; y++)
            for (int x = 0; x < size; x++)
            {
                float dx = (x + 0.5f) / size * 2f - 1f;
                float dy = (y + 0.5f) / size * 2f - 1f;
                float r = Mathf.Sqrt(dx * dx + dy * dy);
                float a = Mathf.Atan2(dy, dx) + 0.3f;
                float f = Mathf.Repeat(a / (Mathf.PI * 2f) * spikes, 1f);
                float tri = 1f - Mathf.Abs(f * 2f - 1f);
                float edge = Mathf.Lerp(0.55f, 0.95f, tri);
                Color c = new Color(0f, 0f, 0f, 0f);
                if (r < edge) c = outline;
                if (r < edge - 0.07f) c = red;
                if (r < (edge - 0.07f) * 0.55f) c = yellow;
                tex.SetPixel(x, y, c);
            }
            return SaveSprite(tex, name);
        }

        /// <summary>Biểu tượng xấp tiền: 2 tờ xanh lá xếp chéo, dải cam ở giữa.</summary>
        private static Sprite Cash(string name)
        {
            const int w = 256, h = 200;
            var tex = new Texture2D(w, h, TextureFormat.RGBA32, false);
            Color clear = new Color(0f, 0f, 0f, 0f);
            for (int y = 0; y < h; y++)
            for (int x = 0; x < w; x++) tex.SetPixel(x, y, clear);
            DrawBill(tex, 56, 30, new Color32(0x1E, 0x8C, 0x3C, 0xFF));
            DrawBill(tex, 20, 70, new Color32(0x3C, 0xC0, 0x55, 0xFF));
            return SaveSprite(tex, name);
        }

        private static void DrawBill(Texture2D tex, int ox, int oy, Color fill)
        {
            const int bw = 180, bh = 100;
            Color outline = new Color32(0x0E, 0x2A, 0x14, 0xFF);
            Color band = new Color32(0xFF, 0x9A, 0x1E, 0xFF);
            Color light = Color.Lerp(fill, Color.white, 0.45f);
            for (int y = 0; y < bh; y++)
            for (int x = 0; x < bw; x++)
            {
                float d = RoundRect(x + 0.5f, y + 0.5f, bw, bh, 14f);
                if (d > 0.5f) continue;
                Color c;
                if (d > -8f) c = outline;
                else if (x > bw * 0.42f && x < bw * 0.58f) c = band;
                else
                {
                    float ex = (x - bw * 0.25f) / 22f, ey = (y - bh * 0.5f) / 22f;
                    c = ex * ex + ey * ey < 1f ? light : fill;
                }
                int px = ox + x, py = oy + y;
                if (px < tex.width && py < tex.height) tex.SetPixel(px, py, c);
            }
        }

        private static float RoundRect(float x, float y, float w, float h, float r)
        {
            float qx = Mathf.Abs(x - w * 0.5f) - (w * 0.5f - r);
            float qy = Mathf.Abs(y - h * 0.5f) - (h * 0.5f - r);
            float outside = new Vector2(Mathf.Max(qx, 0f), Mathf.Max(qy, 0f)).magnitude;
            return outside + Mathf.Min(Mathf.Max(qx, qy), 0f) - r;
        }

        private static Sprite SaveSprite(Texture2D tex, string name)
        {
            tex.Apply();
            string path = Gen + name + ".png";
            File.WriteAllBytes(path, tex.EncodeToPNG());
            Object.DestroyImmediate(tex);
            AssetDatabase.ImportAsset(path, ImportAssetOptions.ForceUpdate);
            var importer = (TextureImporter)AssetImporter.GetAtPath(path);
            importer.textureType = TextureImporterType.Sprite;
            importer.spriteImportMode = SpriteImportMode.Single;
            importer.alphaIsTransparency = true;
            importer.mipmapEnabled = false;
            importer.wrapMode = TextureWrapMode.Clamp;
            importer.textureCompression = TextureImporterCompression.Uncompressed;
            importer.SaveAndReimport();
            return AssetDatabase.LoadAssetAtPath<Sprite>(path);
        }

        // ------------------------------------------------------------------ scene

        private static void ConfigureRenderSettings()
        {
            RenderSettings.skybox = null;
            RenderSettings.ambientMode = AmbientMode.Flat;
            RenderSettings.ambientLight = new Color(0.64f, 0.68f, 0.74f);
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
            go.transform.rotation = Quaternion.Euler(52f, -35f, 0f);
            var light = go.AddComponent<Light>();
            light.type = LightType.Directional;
            light.color = new Color(1f, 0.97f, 0.92f);
            light.intensity = 1.05f;
            light.shadows = LightShadows.None;
        }

        private static CannonCamera CreateCamera(Transform parent)
        {
            var home = new GameObject("Camera Home").transform;
            home.SetParent(parent, false);
            // Đứng sau, lệch phải pháo: pháo nằm góc trái dưới, đường + tường ở giữa/phải (giống demo).
            home.position = new Vector3(3.4f, FortTop + 5.4f, -9.5f);
            home.rotation = Quaternion.LookRotation(new Vector3(-0.3f, 1.6f, 22f) - home.position);

            var go = new GameObject("Main Camera", typeof(Camera), typeof(AudioListener));
            go.tag = "MainCamera";
            go.transform.SetParent(parent, false);
            go.transform.position = home.position;
            go.transform.rotation = home.rotation;
            var cam = go.GetComponent<Camera>();
            // SolidColor (không dùng Skybox) — tránh lỗi vệt trắng khi build Luna.
            cam.clearFlags = CameraClearFlags.SolidColor;
            cam.backgroundColor = new Color(0.66f, 0.87f, 0.97f);
            cam.fieldOfView = 60f;
            cam.nearClipPlane = 0.3f;
            cam.farClipPlane = 150f;
            CannonCamera c = go.AddComponent<CannonCamera>();
            var so = new SerializedObject(c);
            so.FindProperty("_home").objectReferenceValue = home;
            // Bám theo từ phía sau-bên phải, cùng phía với góc pháo nên lúc chuyển cảnh không cắt ngang nòng.
            so.FindProperty("_followOffset").vector3Value = new Vector3(3f, 3.2f, -8.5f);
            so.ApplyModifiedPropertiesWithoutUndo();
            return c;
        }

        private static void BuildGround(Transform parent, Mats m)
        {
            var env = new GameObject("Environment").transform;
            env.SetParent(parent, false);
            Block(env, "Grass", new Vector3(0f, -0.2f, 35f), new Vector3(60f, 0.3f, 110f), m.Grass);
            Block(env, "Road", new Vector3(0f, -0.1f, 32f), new Vector3(8f, 0.2f, 56f), m.Road);
            Block(env, "Curb L", new Vector3(-4.2f, 0.1f, 32f), new Vector3(0.4f, 0.3f, 56f), m.Curb);
            Block(env, "Curb R", new Vector3(4.2f, 0.1f, 32f), new Vector3(0.4f, 0.3f, 56f), m.Curb);
            for (float z = 6f; z < 58f; z += 5f)
            {
                Block(env, "Line", new Vector3(-1.35f, 0.01f, z), new Vector3(0.22f, 0.02f, 2.6f), m.Line);
                Block(env, "Line", new Vector3(1.35f, 0.01f, z), new Vector3(0.22f, 0.02f, 2.6f), m.Line);
            }

            // Cột lá cây hai bên đường (bố trí cố định để lần nào dựng cũng giống nhau).
            var rng = new Random(7);
            for (float z = 2f; z < 70f; z += 6.5f)
            for (int side = -1; side <= 1; side += 2)
            {
                float x = side * (6.5f + (float)rng.NextDouble() * 7f);
                float hgt = 1f + rng.Next(0, 3);
                float s = 1.4f + (float)rng.NextDouble() * 0.8f;
                Block(env, "Bush", new Vector3(x, hgt * 0.5f - 0.05f, z + (float)rng.NextDouble() * 3f), new Vector3(s, hgt, s), m.Leaves);
            }
        }

        /// <summary>Pháo đài đá cuội, có lỗ châu mai; mặt trước để trống chỗ nòng pháo.</summary>
        private static void BuildFort(Transform parent, Mats m)
        {
            var fort = new GameObject("Fort").transform;
            fort.SetParent(parent, false);
            Block(fort, "Body", new Vector3(0f, FortTop * 0.5f - 0.05f, 0f), new Vector3(8f, FortTop, 8f), m.Fort);
            BuildMerlons(fort, m.FortTop);
        }

        /// <summary>
        /// Lỗ châu mai đều cả 4 mặt: mỗi mặt MerlonsPerSide cột chia đều, có cột ở 4 góc (góc dùng chung giữa 2 mặt),
        /// đối xứng quanh tâm. Nòng pháo chĩa cao hơn đỉnh cột nên không cần chừa khe ở mặt trước.
        /// </summary>
        public static void BuildMerlons(Transform fort, Material material)
        {
            const int merlonsPerSide = 4;
            const float half = 3.5f;
            float step = half * 2f / (merlonsPerSide - 1);
            float y = FortTop + 0.5f;
            for (int i = 0; i < merlonsPerSide; i++)
            {
                float c = -half + i * step;
                Block(fort, "Merlon", new Vector3(c, y, half), Vector3.one, material);
                Block(fort, "Merlon", new Vector3(c, y, -half), Vector3.one, material);
                // Hai mặt bên bỏ 2 góc (đã có ở mặt trước/sau).
                if (i == 0 || i == merlonsPerSide - 1) continue;
                Block(fort, "Merlon", new Vector3(-half, y, c), Vector3.one, material);
                Block(fort, "Merlon", new Vector3(half, y, c), Vector3.one, material);
            }
        }

        private static void BuildCannon(Transform parent, Mats m, out Transform barrel, out Transform muzzle)
        {
            var cannon = new GameObject("Cannon").transform;
            cannon.SetParent(parent, false);
            cannon.position = new Vector3(0f, FortTop, 0f);
            Block(cannon, "Base", new Vector3(0f, 0.2f, 0.2f), new Vector3(2.8f, 0.4f, 3f), m.CannonBase);
            Block(cannon, "Cheek L", new Vector3(-1.05f, 1f, 0f), new Vector3(0.4f, 1.3f, 1.9f), m.CannonBase);
            Block(cannon, "Cheek R", new Vector3(1.05f, 1f, 0f), new Vector3(0.4f, 1.3f, 1.9f), m.CannonBase);
            Prim(cannon, PrimitiveType.Cylinder, "Axle", new Vector3(0f, 1.15f, 0f), Quaternion.Euler(0f, 0f, 90f), new Vector3(0.35f, 1.35f, 0.35f), m.Dark);

            barrel = new GameObject("Barrel").transform;
            barrel.SetParent(cannon, false);
            barrel.position = BarrelPivot;
            barrel.rotation = Quaternion.Euler(BarrelPitch, 0f, 0f);
            Quaternion along = Quaternion.Euler(90f, 0f, 0f);
            Prim(barrel, PrimitiveType.Cylinder, "Tube", new Vector3(0f, 0f, 0.7f), along, new Vector3(1.5f, 1.7f, 1.5f), m.Barrel);
            Prim(barrel, PrimitiveType.Cylinder, "Muzzle Ring", new Vector3(0f, 0f, 2.3f), along, new Vector3(1.75f, 0.18f, 1.75f), m.Barrel);
            Prim(barrel, PrimitiveType.Cylinder, "Bore", new Vector3(0f, 0f, 2.42f), along, new Vector3(1.2f, 0.03f, 1.2f), m.Dark);
            Prim(barrel, PrimitiveType.Sphere, "Breech", new Vector3(0f, 0f, -1f), Quaternion.identity, new Vector3(1.5f, 1.5f, 1.2f), m.Barrel);
            muzzle = new GameObject("Muzzle").transform;
            muzzle.SetParent(barrel, false);
            muzzle.localPosition = new Vector3(0f, 0f, 2.6f);
        }

        private static BrickWall BuildWall(Transform parent, Mats m)
        {
            var go = new GameObject("Brick Wall");
            go.transform.SetParent(parent, false);
            var bricks = new List<Transform>();
            var rng = new Random(11);
            for (int row = 0; row < WallRows; row++)
            for (int col = 0; col < WallColumns; col++)
            {
                float x = -WallColumns * 0.5f + 0.5f + col;
                Material mat = m.Wool[rng.Next(m.Wool.Length)];
                GameObject b = Block(go.transform, "Brick", new Vector3(x, 0.5f + row, WallZ), Vector3.one, mat);
                bricks.Add(b.transform);
            }
            BrickWall wall = go.AddComponent<BrickWall>();
            var so = new SerializedObject(wall);
            SetArray(so, "_bricks", bricks.ToArray());
            so.ApplyModifiedPropertiesWithoutUndo();
            return wall;
        }

        /// <summary>Nhân vật S_Base_03 (player đang dùng) nằm trong nòng pháo, chỉ ló đầu ra.</summary>
        private static void CreateCharacter(Transform parent, Transform barrel, out Transform character, out Transform model,
            out Animator animator)
        {
            var root = new GameObject("Character");
            root.transform.SetParent(parent, false);
            root.transform.localScale = Vector3.one * CharacterScale;
            Vector3 axis = barrel.forward;
            float height = 1.72f * CharacterScale;
            Vector3 mouth = barrel.position + axis * 2.45f;
            // Đầu (≈0.6m) ló hẳn ra khỏi miệng nòng.
            root.transform.position = mouth - axis * (height - 1.05f);
            root.transform.rotation = barrel.rotation * Quaternion.Euler(90f, 0f, 0f);

            var asset = AssetDatabase.LoadAssetAtPath<GameObject>(CharacterPath);
            if (asset == null) throw new InvalidOperationException("Missing character prefab: " + CharacterPath);
            var go = (GameObject)PrefabUtility.InstantiatePrefab(asset);
            go.transform.SetParent(root.transform, false);
            go.transform.localPosition = Vector3.zero;
            go.transform.localRotation = Quaternion.Euler(0f, 180f, 0f);
            foreach (Collider c in go.GetComponentsInChildren<Collider>(true)) Object.DestroyImmediate(c);
            foreach (Renderer r in go.GetComponentsInChildren<Renderer>(true))
            {
                r.shadowCastingMode = ShadowCastingMode.Off;
                var smr = r as SkinnedMeshRenderer;
                if (smr != null) smr.updateWhenOffscreen = true;
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

        private static Ui BuildUi(Transform parent, Sprites sp)
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
            ui.Hud = layout.gameObject.AddComponent<CannonHud>();

            // Tiền: icon + số.
            RectTransform money = Rect("Money", layout);
            money.sizeDelta = new Vector2(360f, 100f);
            Image cashIcon = Img("Icon", money, sp.Cash);
            cashIcon.rectTransform.anchorMin = new Vector2(0f, 0f);
            cashIcon.rectTransform.anchorMax = new Vector2(0.32f, 1f);
            cashIcon.rectTransform.offsetMin = cashIcon.rectTransform.offsetMax = Vector2.zero;
            TMP_Text moneyText = Text("Value", money, "$0", 80f, true);
            moneyText.alignment = TextAlignmentOptions.Left;
            moneyText.rectTransform.anchorMin = new Vector2(0.36f, 0f);
            moneyText.rectTransform.anchorMax = new Vector2(1f, 1f);
            moneyText.rectTransform.offsetMin = moneyText.rectTransform.offsetMax = Vector2.zero;
            AutoSize(moneyText);

            ui.Download = MakeButton("Download Button", layout, sp.Green, "DOWNLOAD", 3.1f);
            ui.Fire = MakeButton("Fire Button", layout, sp.Red, "FIRE!", 2.9f);

            // 2 thẻ Upgrade: Power (nổ) và Income (tiền).
            ui.Cards = new Button[2];
            var cardRects = new RectTransform[2];
            var prices = new TMP_Text[2];
            var groups = new CanvasGroup[2];
            Sprite[] icons = { sp.Boom, sp.Cash };
            string[] names = { "Card Power", "Card Income" };
            for (int i = 0; i < 2; i++)
            {
                Image bg = Img(names[i], layout, sp.Card);
                bg.preserveAspect = false;
                bg.raycastTarget = true;
                RectTransform card = bg.rectTransform;
                card.sizeDelta = new Vector2(300f, 286f);
                ui.Cards[i] = bg.gameObject.AddComponent<Button>();
                ui.Cards[i].targetGraphic = bg;
                ui.Cards[i].transition = Selectable.Transition.None;
                groups[i] = bg.gameObject.AddComponent<CanvasGroup>();

                TMP_Text label = Text("Label", card, "Upgrade", 48f, false);
                label.color = new Color(0.08f, 0.08f, 0.1f);
                Stretch(label.rectTransform, 0.08f, 0.72f, 0.92f, 0.94f);
                AutoSize(label);
                Image icon = Img("Icon", card, icons[i]);
                Stretch(icon.rectTransform, 0.24f, 0.3f, 0.76f, 0.72f);
                prices[i] = Text("Price", card, "$0", 64f, false);
                prices[i].color = new Color(0.08f, 0.08f, 0.1f);
                Stretch(prices[i].rectTransform, 0.1f, 0.06f, 0.9f, 0.3f);
                AutoSize(prices[i]);
                cardRects[i] = card;
                card.gameObject.SetActive(false);
            }

            TMP_Text popup = Text("Reward Popup", layout, "+$135", 120f, true);
            popup.color = new Color(0.55f, 1f, 0.35f);
            AutoSize(popup);
            popup.gameObject.SetActive(false);

            Image hand = Img("Hand", layout, sp.Hand);
            hand.rectTransform.pivot = new Vector2(0.36f, 0.97f); // đầu ngón trỏ trong hand.png
            hand.gameObject.SetActive(false);

            // End card = _btnBlock của GameManager: chạm bất kỳ đâu là mở store.
            RectTransform card2 = Full("End Card", layout);
            Image dim = card2.gameObject.AddComponent<Image>();
            dim.color = new Color(0.05f, 0.06f, 0.13f, 0.6f);
            ui.EndCard = card2.gameObject.AddComponent<Button>();
            ui.EndCard.targetGraphic = dim;
            ui.EndCard.transition = Selectable.Transition.None;
            CanvasGroup group = card2.gameObject.AddComponent<CanvasGroup>();
            RectTransform content = Rect("Content", card2);
            content.sizeDelta = new Vector2(1000f, 1500f);
            TMP_Text title = Text("Title", content, "WALL DESTROYED!", 150f, true);
            title.color = new Color(1f, 0.86f, 0.2f);
            title.rectTransform.sizeDelta = new Vector2(980f, 200f);
            title.rectTransform.anchoredPosition = new Vector2(0f, 280f);
            AutoSize(title);
            TMP_Text sub = Text("Subtitle", content, "CAN YOU BREAK THEM ALL?", 60f, true);
            sub.rectTransform.sizeDelta = new Vector2(960f, 100f);
            sub.rectTransform.anchoredPosition = new Vector2(0f, 130f);
            AutoSize(sub);
            Button endButton = MakeButton("Download Button", content, sp.Green, "DOWNLOAD", 3.1f);
            var endButtonRect = (RectTransform)endButton.transform;
            endButtonRect.sizeDelta = new Vector2(680f, 680f / 3.1f);
            endButtonRect.anchoredPosition = new Vector2(0f, -770f);
            Object.DestroyImmediate(endButton);
            endButtonRect.GetComponent<Image>().raycastTarget = false;
            card2.gameObject.SetActive(false);

            var so = new SerializedObject(ui.Hud);
            so.FindProperty("_money").objectReferenceValue = money;
            so.FindProperty("_moneyText").objectReferenceValue = moneyText;
            so.FindProperty("_downloadButton").objectReferenceValue = ui.Download.transform;
            so.FindProperty("_fireButton").objectReferenceValue = ui.Fire.transform;
            SetArray(so, "_cards", cardRects);
            SetArray(so, "_cardPrices", prices);
            SetArray(so, "_cardGroups", groups);
            so.FindProperty("_hand").objectReferenceValue = hand.rectTransform;
            so.FindProperty("_popup").objectReferenceValue = popup;
            so.FindProperty("_endCard").objectReferenceValue = card2;
            so.FindProperty("_endCardContent").objectReferenceValue = content;
            so.FindProperty("_endCardButton").objectReferenceValue = endButtonRect;
            so.FindProperty("_endCardGroup").objectReferenceValue = group;
            so.ApplyModifiedPropertiesWithoutUndo();
            ApplyDefaultLayout(ui.Hud);
            return ui;
        }

        /// <summary>
        /// Bố cục khởi đầu, đặt MỘT LẦN trong scene (không có code xếp lại lúc chạy) — sau đó người dựng tự chỉnh tay.
        /// Canvas khớp theo chiều cao ở mọi hướng (match = 1) nên chiều cao canvas luôn = 1920: cùng một bố cục
        /// neo góc giữ đúng tỉ lệ so với chiều cao màn ở cả dọc lẫn ngang.
        /// </summary>
        public static void ApplyDefaultLayout(CannonHud hud)
        {
            var scaler = hud.GetComponentInParent<ResponsiveCanvasScaler>();
            if (scaler != null)
            {
                var sso = new SerializedObject(scaler);
                sso.FindProperty("_portraitMatch").floatValue = 1f;
                sso.FindProperty("_landscapeMatch").floatValue = 1f;
                sso.FindProperty("_squareMatch").floatValue = 1f;
                sso.ApplyModifiedPropertiesWithoutUndo();
            }

            var so = new SerializedObject(hud);
            Func<string, RectTransform> get = n => (RectTransform)so.FindProperty(n).objectReferenceValue;
            // Tiền: góc trên trái. Download: góc trên phải. Cách mép trên 110 để né tai thỏ ở màn dọc.
            Anchor(get("_money"), new Vector2(0f, 1f), new Vector2(0f, 1f), new Vector2(40f, -110f), new Vector2(380f, 105f));
            Anchor(get("_downloadButton"), new Vector2(1f, 1f), new Vector2(1f, 1f), new Vector2(-40f, -110f), new Vector2(360f, 116f));
            // FIRE!: giữa đáy. 2 thẻ: hàng trên FIRE!, chừa khe để bàn tay (chĩa xuống từ góc dưới-phải thẻ) không đè chữ FIRE!.
            Anchor(get("_fireButton"), new Vector2(0.5f, 0f), new Vector2(0.5f, 0.5f), new Vector2(0f, 200f), new Vector2(480f, 166f));
            SerializedProperty cards = so.FindProperty("_cards");
            for (int i = 0; i < cards.arraySize; i++)
            {
                var card = (RectTransform)cards.GetArrayElementAtIndex(i).objectReferenceValue;
                float x = i == 0 ? -165f : 165f;
                Anchor(card, new Vector2(0.5f, 0f), new Vector2(0.5f, 0.5f), new Vector2(x, 540f), new Vector2(300f, 286f));
            }
            var popup = (TMP_Text)so.FindProperty("_popup").objectReferenceValue;
            if (popup != null)
                Anchor(popup.rectTransform, new Vector2(0.5f, 0.5f), new Vector2(0.5f, 0.5f), new Vector2(0f, 250f), new Vector2(700f, 160f));
            RectTransform hand = get("_hand");
            if (hand != null) hand.sizeDelta = new Vector2(170f, 170f);
            // End card: nội dung phủ cả màn. Tiêu đề / dòng phụ rộng 90% màn, chữ auto-size: màn ngang (rộng) thì
            // chữ to theo chiều cao khung, màn dọc (hẹp) thì co theo bề ngang → không tràn. Nút neo theo mép đáy.
            RectTransform content = get("_endCardContent");
            content.localScale = Vector3.one;
            content.anchorMin = Vector2.zero;
            content.anchorMax = Vector2.one;
            content.pivot = new Vector2(0.5f, 0.5f);
            content.offsetMin = content.offsetMax = Vector2.zero;
            EditorUtility.SetDirty(content);
            StretchRow(content.Find("Title") as RectTransform, 300f, 260f);
            // Dòng phụ hẹp hơn (66% màn) để ở màn dọc (co theo bề ngang) chữ trắng luôn nhỏ hơn tiêu đề vàng.
            StretchRow(content.Find("Subtitle") as RectTransform, 110f, 120f, 0.17f);
            Anchor(get("_endCardButton"), new Vector2(0.5f, 0f), new Vector2(0.5f, 0.5f), new Vector2(0f, 300f), new Vector2(680f, 219f));
            EditorUtility.SetDirty(hud);
            ApplyOrientationLayouts(hud);
        }

        /// <summary>
        /// Gắn OrientationLayout: bộ DỌC = vị trí đang có trong scene (giữ nguyên chỉnh tay của người dựng),
        /// bộ NGANG = giá trị khởi đầu: nút to hơn, FIRE! và 2 thẻ dàn ngang trên cùng một hàng.
        /// Chạy một lần trong Editor; sau đó người dựng chỉnh + "Capture" lại trên từng component.
        /// </summary>
        public static void ApplyOrientationLayouts(CannonHud hud)
        {
            var so = new SerializedObject(hud);
            Func<string, RectTransform> get = n => (RectTransform)so.FindProperty(n).objectReferenceValue;
            // Màn ngang: canvas cao 1920 (match height), rộng ~3400–4300. Hàng nút giữa đáy, tâm y = 420
            // (đủ cao để bàn tay chĩa xuống từ góc dưới-phải thẻ không bị khuất dưới mép màn).
            const float rowY = 420f;
            Orient(get("_money"), true, Slot(new Vector2(0f, 1f), new Vector2(0f, 1f), new Vector2(50f, -50f), new Vector2(540f, 150f)));
            Orient(get("_downloadButton"), true, Slot(new Vector2(1f, 1f), new Vector2(1f, 1f), new Vector2(-50f, -50f), new Vector2(520f, 168f)));
            Orient(get("_fireButton"), true, Slot(new Vector2(0.5f, 0f), new Vector2(0.5f, 0.5f), new Vector2(0f, rowY), new Vector2(760f, 262f)));
            SerializedProperty cards = so.FindProperty("_cards");
            for (int i = 0; i < cards.arraySize; i++)
            {
                var card = (RectTransform)cards.GetArrayElementAtIndex(i).objectReferenceValue;
                float x = (i == 0 ? -1f : 1f) * (760f * 0.5f + 70f + 470f * 0.5f);
                Orient(card, true, Slot(new Vector2(0.5f, 0f), new Vector2(0.5f, 0.5f), new Vector2(x, rowY), new Vector2(470f, 448f)));
            }
            // Bàn tay: vị trí do CannonHud bám theo nút/thẻ, ở đây chỉ đổi kích thước.
            RectTransform hand = get("_hand");
            if (hand != null)
            {
                OrientationLayout.Slot landscapeHand = Slot(hand.anchorMin, hand.pivot, hand.anchoredPosition, new Vector2(260f, 260f));
                Orient(hand, false, landscapeHand);
            }
        }

        private static OrientationLayout.Slot Slot(Vector2 anchor, Vector2 pivot, Vector2 position, Vector2 size)
        {
            return new OrientationLayout.Slot { AnchorMin = anchor, AnchorMax = anchor, Pivot = pivot, Position = position, Size = size };
        }

        private static void Orient(RectTransform rect, bool applyPosition, OrientationLayout.Slot landscape)
        {
            if (rect == null) return;
            OrientationLayout layout = rect.GetComponent<OrientationLayout>();
            if (layout == null) layout = rect.gameObject.AddComponent<OrientationLayout>();
            layout.SetSlots(layout.CurrentAsSlot(), landscape);
            var lso = new SerializedObject(layout);
            lso.FindProperty("_applyPosition").boolValue = applyPosition;
            lso.ApplyModifiedPropertiesWithoutUndo();
            EditorUtility.SetDirty(layout);
        }

        /// <summary>Hàng ngang chừa lề margin mỗi bên (mặc định 5% → rộng 90% cha), cao height, tâm cách giữa cha y đơn vị.</summary>
        private static void StretchRow(RectTransform rect, float y, float height, float margin = 0.05f)
        {
            if (rect == null) return;
            rect.anchorMin = new Vector2(margin, 0.5f);
            rect.anchorMax = new Vector2(1f - margin, 0.5f);
            rect.pivot = new Vector2(0.5f, 0.5f);
            rect.sizeDelta = new Vector2(0f, height);
            rect.anchoredPosition = new Vector2(0f, y);
            EditorUtility.SetDirty(rect);
        }

        private static void Anchor(RectTransform rect, Vector2 anchor, Vector2 pivot, Vector2 position, Vector2 size)
        {
            if (rect == null) return;
            rect.anchorMin = rect.anchorMax = anchor;
            rect.pivot = pivot;
            rect.sizeDelta = size;
            rect.anchoredPosition = position;
            EditorUtility.SetDirty(rect);
        }

        private static Button MakeButton(string name, Transform parent, Sprite sprite, string label, float aspect)
        {
            Image img = Img(name, parent, sprite);
            img.preserveAspect = false;
            img.raycastTarget = true;
            img.rectTransform.sizeDelta = new Vector2(540f, 540f / aspect);
            var button = img.gameObject.AddComponent<Button>();
            button.targetGraphic = img;
            button.transition = Selectable.Transition.None;
            TMP_Text text = Text("Label", img.rectTransform, label, 80f, true);
            Stretch(text.rectTransform, 0.1f, 0.2f, 0.9f, 0.85f);
            AutoSize(text);
            return button;
        }

        private static GameManager CreateGameManager(GameObject root, Ui ui)
        {
            GameManager manager = root.AddComponent<GameManager>();
            var so = new SerializedObject(manager);
            // Luna "End Time": hết giờ mà chưa phá tường → bật end card, rồi mở store sau 1s.
            so.FindProperty("_endTime").intValue = 60;
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
            return Prim(parent, PrimitiveType.Cube, name, position, Quaternion.identity, size, material);
        }

        private static GameObject Prim(Transform parent, PrimitiveType type, string name, Vector3 localPosition,
            Quaternion localRotation, Vector3 scale, Material material)
        {
            GameObject go = GameObject.CreatePrimitive(type);
            go.name = name;
            Object.DestroyImmediate(go.GetComponent<Collider>());
            go.transform.SetParent(parent, false);
            go.transform.localPosition = localPosition;
            go.transform.localRotation = localRotation;
            go.transform.localScale = scale;
            Renderer r = go.GetComponent<Renderer>();
            r.sharedMaterial = material;
            r.shadowCastingMode = ShadowCastingMode.Off;
            return go;
        }

        private static void Ref(SerializedObject so, string field, string path)
        {
            Object asset = AssetDatabase.LoadAssetAtPath<Object>(path);
            if (asset == null) Debug.LogWarning("[CannonLaunch] Missing asset: " + path);
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
            Stretch(rect, 0f, 0f, 1f, 1f);
            return rect;
        }

        private static void Stretch(RectTransform rect, float xMin, float yMin, float xMax, float yMax)
        {
            rect.anchorMin = new Vector2(xMin, yMin);
            rect.anchorMax = new Vector2(xMax, yMax);
            rect.offsetMin = rect.offsetMax = Vector2.zero;
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

        private static TMP_Text Text(string name, Transform parent, string value, float size, bool outline)
        {
            RectTransform rect = Rect(name, parent);
            rect.sizeDelta = new Vector2(900f, 200f);
            var text = rect.gameObject.AddComponent<TextMeshProUGUI>();
            text.font = _font;
            if (outline && _fontOutline != null) text.fontSharedMaterial = _fontOutline;
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
