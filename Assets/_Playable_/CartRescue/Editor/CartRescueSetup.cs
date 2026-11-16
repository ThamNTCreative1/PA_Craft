using System.Collections.Generic;
using TMPro;
using UnityEditor;
using UnityEditor.SceneManagement;
using UnityEngine;
using UnityEngine.EventSystems;
using UnityEngine.TextCore.LowLevel;
using UnityEngine.UI;
using Object = UnityEngine.Object;

namespace Playable.CartRescue.EditorTools
{
    /// <summary>
    /// Dựng playable "Cart Rescue" (OBP) vào Assets/_Playable_/Scenes/Gameplay.unity.
    ///
    /// Theo quy ước repo: scene sinh ra từ code qua menu, nội dung cũ của Gameplay.unity bị XOÁ —
    /// khôi phục bằng `git checkout -- Assets/_Playable_/Scenes/Gameplay.unity`.
    ///
    /// Asset lấy từ bản WebGL "Brainrot 3D: Animal Hunt" qua Tools~/extract_assets.py → Source/,
    /// mesh/material dựng lại bằng CartRescueArt → Generated/.
    /// Gameplay diễn ra trên mặt phẳng XY (Z = 0), camera nhìn theo +Z.
    /// </summary>
    public static class CartRescueSetup
    {
        private const string ScenePath = "Assets/_Playable_/Scenes/Gameplay.unity";
        private const string Root = CartRescueArt.Root;
        private const string Src = Root + "Source/";
        private const string Gen = Root + "Generated/";
        private const string HintFontPath = "Assets/Game/Fonts/FFFFORWA.TTF";
        private const string HandPath = "Assets/_Playable_/TempleRun/UI/Sprites/hand.png";
        private const string ArrowPath = "Assets/_Playable_/TempleRun/UI/Sprites/arrow-right.png";
        private const string StartButtonPath = "Assets/_Playable_/2D Texture/button_start.png";
        private const string PlayNowPath = "Assets/_Playable_/2D Texture/UI/Button Play Now.png";
        private const string WinImagePath = "Assets/_Playable_/2D Texture/UI/exec-db281e07-02a8-4aab-add2-57149ddf0221.png";

        // Toạ độ thế giới.
        private const float SlotUnit = 1.45f;       // 1 ô sàn = 1.45 đơn vị world → sàn dài 4 ô = 5.8
        private const float WheelScale = 1.5f;      // bánh jeep đường kính 0.84 → 1.26
        private const float RiderHeight = 1.75f;
        private const float RiderYaw = 180f;        // mặt nhân vật hướng về camera
        private const float CartMaxX = 7.5f;        // giới hạn kéo xe (trước khi bấm START)
        private const float FinishX = 40f;
        private const float RoadEndX = 52f;

        private static readonly string[] DeckRiders = { "TaTaTaTaSahur", "CappuccinoAssasino", "Chimpanzini" };
        private const string HangRiderName = "BrrBrrPatapim";

        [MenuItem("Tools/Cart Rescue/Setup Playable")]
        public static void Apply()
        {
            if (!Application.isBatchMode && !EditorUtility.DisplayDialog("Cart Rescue",
                    "Xoá sạch nội dung hiện tại của Gameplay.unity rồi dựng lại playable Cart Rescue?\n\n" +
                    "Khôi phục được bằng: git checkout -- " + ScenePath,
                    "Dựng", "Huỷ"))
                return;
            Build();
        }

        /// <summary>Bản không hỏi — gọi được từ script/MCP.</summary>
        public static void Build()
        {
            CartRescueArt.BuildAll();
            ConfigureAudio();

            var scene = EditorSceneManager.OpenScene(ScenePath);
            foreach (GameObject old in scene.GetRootGameObjects()) Object.DestroyImmediate(old);
            RenderSettings.skybox = null;
            RenderSettings.ambientMode = UnityEngine.Rendering.AmbientMode.Flat;
            RenderSettings.ambientLight = new Color(0.62f, 0.62f, 0.66f);

            var root = new GameObject("CartRescue");
            new GameObject("EventSystem", typeof(EventSystem), typeof(StandaloneInputModule)).transform.SetParent(root.transform, false);
            CreateAudioManager(root.transform);

            Camera cam = CreateCamera(root.transform, out CartRescueCamera camFit);
            CreateLight(root.transform);
            Transform world = new GameObject("World").transform;
            world.SetParent(root.transform, false);
            BuildEnvironment(world);

            CartRefs cart = BuildCart(world);
            var riders = new List<Object>();
            for (int i = 0; i < DeckRiders.Length; i++)
                riders.Add(CreateRider(world, DeckRiders[i], i % 2 == 0 ? -0.2f : 0.2f));
            DeckRiderView hangRider = CreateRider(world, HangRiderName, 0f);
            // Đặt sẵn lên sàn để xem trước trong Editor (lúc chạy CartRescueController đặt lại từ DeckSolver).
            float[] initial = { -1f, 0f, 1f };
            for (int i = 0; i < riders.Count; i++)
                ((DeckRiderView)riders[i]).transform.position = cart.Body.DeckPointWorld(initial[i]);
            RopeHangView rope = BuildHelicopter(world, hangRider);

            UiRefs ui = BuildUi(root.transform, cam);
            SetRef(camFit, "_portraitTarget", cart.Body.transform);

            var input = root.AddComponent<PointerInput>();
            SetRef(input, "_camera", cam);

            var sfx = new GameObject("Sfx", typeof(AudioSource)).GetComponent<AudioSource>();
            sfx.transform.SetParent(root.transform, false);
            sfx.playOnAwake = false;

            GameManager gameManager = root.AddComponent<GameManager>();
            var gm = new SerializedObject(gameManager);
            gm.FindProperty("_endTime").intValue = 40;
            gm.FindProperty("_storeOnEndTime").boolValue = true;
            gm.FindProperty("_autoStoreAfterEndcard").boolValue = false;
            gm.FindProperty("_tapToCtaMode").boolValue = false;
            gm.FindProperty("_eggRaisingMode").boolValue = false;
            gm.FindProperty("_totalEvent").intValue = 0;
            gm.FindProperty("_btnBlock").objectReferenceValue = ui.Blocker;
            gm.FindProperty("_backgroundMusic").objectReferenceValue = Clip("BGM_CartRescue");
            gm.ApplyModifiedPropertiesWithoutUndo();

            var controller = root.AddComponent<CartRescueController>();
            var so = new SerializedObject(controller);
            so.FindProperty("_gameManager").objectReferenceValue = gameManager;
            so.FindProperty("_input").objectReferenceValue = input;
            so.FindProperty("_cart").objectReferenceValue = cart.Body;
            SetArray(so, "_riders", riders);
            so.FindProperty("_hangRider").objectReferenceValue = hangRider;
            so.FindProperty("_rope").objectReferenceValue = rope;
            so.FindProperty("_hand").objectReferenceValue = ui.Hand;
            so.FindProperty("_pushArrow").objectReferenceValue = ui.Arrow;
            so.FindProperty("_ropeHint").objectReferenceValue = ui.Hint;
            so.FindProperty("_balanceHint").objectReferenceValue = ui.BalanceHint;
            so.FindProperty("_ropeArrow").objectReferenceValue = ui.Pointer;
            so.FindProperty("_camera").objectReferenceValue = camFit;
            so.FindProperty("_startButton").objectReferenceValue = ui.Start;
            so.FindProperty("_winText").objectReferenceValue = ui.Win;
            so.FindProperty("_winOverlay").objectReferenceValue = ui.WinOverlay;
            so.FindProperty("_playNow").objectReferenceValue = ui.PlayNow;
            so.FindProperty("_playNowShine").objectReferenceValue = ui.PlayNowShine;
            so.FindProperty("_engine").objectReferenceValue = cart.Body.GetComponent<CartEngineAudio>();
            so.FindProperty("_finishFlagX").floatValue = FinishX + 3.2f;
            so.FindProperty("_finishX").floatValue = FinishX;
            so.FindProperty("_sfx").objectReferenceValue = sfx;
            so.FindProperty("_landClip").objectReferenceValue = Clip("action_jump");
            so.FindProperty("_buttonClip").objectReferenceValue = Clip("Button");
            so.FindProperty("_winClip").objectReferenceValue = Clip("Win");
            so.ApplyModifiedPropertiesWithoutUndo();

            EditorSceneManager.MarkSceneDirty(scene);
            EditorSceneManager.SaveScene(scene);
            Debug.Log("[CartRescue] Scene built: " + ScenePath);
        }

        // ───────────────────────────── Môi trường ─────────────────────────────

        private static void BuildEnvironment(Transform parent)
        {
            // Phòng kín kiểu sandbox như hình demo: tường xám sáng lưới ô vuông mờ, sàn xám đậm phẳng, mép sàn sáng hơn.
            // Dùng shader Unlit cho màu phẳng, không bị ánh sáng làm loang.
            float width = RoadEndX + 40f, centerX = (RoadEndX - 20f) * 0.5f;
            Material ground = UnlitColorMaterial("Env_Ground", WallFloorColor);
            Material lip = UnlitColorMaterial("Env_GroundLip", new Color(0.33f, 0.33f, 0.34f));
            Material wall = GridMaterial("Env_Wall", width, 40f);

            Cube(parent, "Ground", new Vector3(centerX, -20f, 3f), new Vector3(width, 40f, 12f), ground);
            Cube(parent, "GroundLip", new Vector3(centerX, -0.06f, -2.9f), new Vector3(width, 0.12f, 0.2f), lip);
            var wallGo = GameObject.CreatePrimitive(PrimitiveType.Quad);
            Object.DestroyImmediate(wallGo.GetComponent<Collider>());
            wallGo.name = "Wall";
            wallGo.transform.SetParent(parent, false);
            wallGo.transform.localPosition = new Vector3(centerX, 18f, 6.5f);
            wallGo.transform.localScale = new Vector3(width, 40f, 1f);
            wallGo.GetComponent<MeshRenderer>().sharedMaterial = wall;

            BuildBombPiles(parent);

            // Đích: hai cờ.
            Model(parent, "flag-golf_red", new Vector3(FinishX + 3.2f, 0f, 1.4f), 0f, 1.6f, groundAlign: true);
            Model(parent, "flag-golf_red", new Vector3(FinishX + 3.2f, 0f, -2.2f), 0f, 1.6f, groundAlign: true);
        }

        // ───────────────────────────── Bom, lựu đạn, pháo hoa (trang trí như demo) ─────────────────────────────
        // Game gốc không có mesh lựu đạn / bom hẹn giờ / pháo hoa → dựng bằng khối hộp kiểu voxel; bom tròn dùng cannonball.

        private enum Prop { Grenade, TimeBomb, Rocket, RoundBomb }

        private static void BuildBombPiles(Transform parent)
        {
            var root = new GameObject("BombPiles").transform;
            root.SetParent(parent, false);
            // (loại, x, y chồng, z, yaw) — z > 1.3 nằm sau xe, z < −1.3 nằm trước xe (chỉ đặt ở chỗ xe không che).
            var items = new (Prop kind, float x, float y, float z, float yaw)[]
            {
                // Đống chính sát góc dưới trái, trước xe (giống demo) — trong khung cả màn dọc lẫn ngang lúc mở game.
                (Prop.TimeBomb, -3.5f, 0f, -2.1f, 8f), (Prop.TimeBomb, -2.3f, 0f, -2.3f, -6f), (Prop.TimeBomb, -2.9f, 0.62f, -2.2f, 3f),
                (Prop.Grenade, -4.4f, 0f, -1.9f, 20f), (Prop.Grenade, -1.3f, 0f, -2.4f, -25f), (Prop.Grenade, -1.9f, 0.62f, -2.3f, 40f),
                (Prop.RoundBomb, -4.2f, 0f, 2f, 30f), (Prop.Grenade, -3.3f, 0f, 2.3f, 0f),
                // Sau xe bên phải: pháo hoa dựng sát tường + vài quả.
                (Prop.Rocket, 3.6f, 0f, 2.6f, 0f), (Prop.Rocket, 4.1f, 0f, 2.9f, 0f), (Prop.Rocket, 4.6f, 0f, 2.6f, 0f),
                (Prop.TimeBomb, 3.9f, 0f, 1.9f, -10f), (Prop.Grenade, 4.9f, 0f, 1.8f, 15f),
                // Dọc đường chạy.
                (Prop.RoundBomb, 12f, 0f, 2.2f, 0f), (Prop.Grenade, 13f, 0f, 1.9f, 30f), (Prop.TimeBomb, 14.2f, 0f, -2.2f, 5f),
                (Prop.Grenade, 20f, 0f, 2f, 0f), (Prop.Grenade, 20.7f, 0f, 2.4f, 60f), (Prop.TimeBomb, 24f, 0f, 2.1f, 5f),
                (Prop.RoundBomb, 27f, 0f, 2.2f, 0f), (Prop.Rocket, 30f, 0f, 2.3f, 0f), (Prop.Rocket, 30.6f, 0f, 2.1f, 0f),
                (Prop.TimeBomb, 33.5f, 0f, 2f, -5f), (Prop.TimeBomb, 34.2f, 0.62f, 2.1f, 8f), (Prop.Grenade, 35.2f, 0f, -2.2f, 30f),
                (Prop.RoundBomb, 38f, 0f, 2.3f, 0f), (Prop.Grenade, 47f, 0f, 2f, 0f), (Prop.TimeBomb, 48.5f, 0f, -2.2f, 10f),
            };
            for (int i = 0; i < items.Length; i++)
            {
                var it = items[i];
                Transform t = new GameObject(it.kind + "_" + i).transform;
                t.SetParent(root, false);
                const float propScale = 1.3f;
                t.localPosition = new Vector3(it.x, it.y * propScale, it.z);
                t.localRotation = Quaternion.Euler(0f, it.yaw, 0f);
                t.localScale = Vector3.one * propScale;
                switch (it.kind)
                {
                    case Prop.Grenade: BuildGrenade(t); break;
                    case Prop.TimeBomb: BuildTimeBomb(t); break;
                    case Prop.Rocket: BuildRocket(t, i % 2 == 0); break;
                    case Prop.RoundBomb: BuildRoundBomb(t); break;
                }
            }
        }

        /// <summary>Lựu đạn: thân xanh rêu có rãnh, nắp xám + cần gạt + khoen. Cao ~0.62.</summary>
        private static void BuildGrenade(Transform t)
        {
            Material body = ColorMaterial("Bomb_GrenadeGreen", new Color(0.36f, 0.5f, 0.2f));
            Material groove = ColorMaterial("Bomb_GrenadeDark", new Color(0.22f, 0.32f, 0.12f));
            Material metal = ColorMaterial("Bomb_Metal", new Color(0.62f, 0.63f, 0.65f));
            Box(t, "Body", new Vector3(0f, 0.25f, 0f), new Vector3(0.42f, 0.46f, 0.42f), body);
            Box(t, "Groove1", new Vector3(0f, 0.18f, 0f), new Vector3(0.44f, 0.04f, 0.44f), groove);
            Box(t, "Groove2", new Vector3(0f, 0.32f, 0f), new Vector3(0.44f, 0.04f, 0.44f), groove);
            Box(t, "GrooveV", new Vector3(0f, 0.25f, 0f), new Vector3(0.04f, 0.47f, 0.44f), groove);
            Box(t, "Cap", new Vector3(0f, 0.51f, 0f), new Vector3(0.2f, 0.1f, 0.2f), metal);
            Box(t, "Lever", new Vector3(0.14f, 0.42f, 0f), new Vector3(0.06f, 0.26f, 0.12f), metal, Quaternion.Euler(0f, 0f, -12f));
            Box(t, "Ring", new Vector3(-0.13f, 0.56f, 0f), new Vector3(0.12f, 0.12f, 0.03f), metal);
        }

        /// <summary>Bom hẹn giờ: 3 thỏi thuốc nổ đỏ nằm ngang, băng keo đen, mặt đồng hồ trắng phía trước. Cao ~0.62.</summary>
        private static void BuildTimeBomb(Transform t)
        {
            Material red = ColorMaterial("Bomb_DynamiteRed", new Color(0.78f, 0.12f, 0.1f));
            Material tape = ColorMaterial("Bomb_Tape", new Color(0.12f, 0.12f, 0.13f));
            Material face = ColorMaterial("Bomb_ClockFace", new Color(0.95f, 0.95f, 0.92f));
            Material hand = ColorMaterial("Bomb_ClockHand", new Color(0.1f, 0.1f, 0.1f));
            Material wire = ColorMaterial("Bomb_WireYellow", new Color(0.95f, 0.8f, 0.15f));
            for (int i = 0; i < 3; i++)
            {
                float z = (i - 1) * 0.2f;
                Box(t, "Stick" + i, new Vector3(0f, 0.11f + (i == 1 ? 0.17f : 0f), z + (i == 1 ? 0.0f : 0f)), new Vector3(0.9f, 0.19f, 0.19f), red);
            }
            Box(t, "TapeL", new Vector3(-0.28f, 0.2f, 0f), new Vector3(0.08f, 0.42f, 0.62f), tape);
            Box(t, "TapeR", new Vector3(0.28f, 0.2f, 0f), new Vector3(0.08f, 0.42f, 0.62f), tape);
            Box(t, "ClockBack", new Vector3(0f, 0.3f, -0.33f), new Vector3(0.36f, 0.36f, 0.06f), tape);
            Box(t, "ClockFace", new Vector3(0f, 0.3f, -0.365f), new Vector3(0.28f, 0.28f, 0.02f), face);
            Box(t, "HandH", new Vector3(0f, 0.34f, -0.38f), new Vector3(0.03f, 0.1f, 0.01f), hand);
            Box(t, "HandM", new Vector3(0.04f, 0.3f, -0.38f), new Vector3(0.1f, 0.03f, 0.01f), hand);
            Box(t, "Wire", new Vector3(0.2f, 0.47f, -0.15f), new Vector3(0.3f, 0.03f, 0.03f), wire, Quaternion.Euler(0f, 0f, 25f));
        }

        /// <summary>Pháo hoa: thân đỏ hoặc xanh có sọc trắng, chóp vàng, que gỗ. Cao ~1.3.</summary>
        private static void BuildRocket(Transform t, bool red)
        {
            Material body = ColorMaterial(red ? "Bomb_RocketRed" : "Bomb_RocketBlue", red ? new Color(0.85f, 0.15f, 0.12f) : new Color(0.15f, 0.35f, 0.85f));
            Material stripe = ColorMaterial("Bomb_RocketStripe", new Color(0.96f, 0.96f, 0.96f));
            Material tip = ColorMaterial("Bomb_RocketTip", new Color(0.98f, 0.78f, 0.12f));
            Material stick = ColorMaterial("Bomb_Stick", new Color(0.55f, 0.38f, 0.2f));
            Box(t, "Stick", new Vector3(0f, 0.25f, 0f), new Vector3(0.06f, 0.5f, 0.06f), stick);
            Box(t, "Body", new Vector3(0f, 0.78f, 0f), new Vector3(0.24f, 0.6f, 0.24f), body);
            Box(t, "Stripe", new Vector3(0f, 0.86f, 0f), new Vector3(0.25f, 0.08f, 0.25f), stripe);
            Box(t, "Tip1", new Vector3(0f, 1.13f, 0f), new Vector3(0.18f, 0.1f, 0.18f), tip);
            Box(t, "Tip2", new Vector3(0f, 1.22f, 0f), new Vector3(0.1f, 0.08f, 0.1f), tip);
        }

        /// <summary>Bom tròn: cannonball của game + ngòi + tia lửa.</summary>
        private static void BuildRoundBomb(Transform t)
        {
            GameObject ball = Model(t, "cannonball", Vector3.zero, 0f, 1f, groundAlign: false);
            Bounds b = ball.GetComponent<MeshRenderer>().bounds;
            float scale = 0.65f / Mathf.Max(0.01f, b.size.y);
            ball.transform.localScale = Vector3.one * scale;
            b = ball.GetComponent<MeshRenderer>().bounds;
            ball.transform.position += new Vector3(t.position.x - b.center.x, t.position.y - b.min.y, t.position.z - b.center.z);
            Material fuse = ColorMaterial("Bomb_Fuse", new Color(0.45f, 0.32f, 0.18f));
            Material spark = ColorMaterial("Bomb_Spark", new Color(1f, 0.85f, 0.2f));
            Box(t, "Neck", new Vector3(0f, 0.66f, 0f), new Vector3(0.16f, 0.06f, 0.16f), ColorMaterial("Bomb_Tape", new Color(0.12f, 0.12f, 0.13f)));
            Box(t, "Fuse", new Vector3(0.05f, 0.76f, 0f), new Vector3(0.04f, 0.18f, 0.04f), fuse, Quaternion.Euler(0f, 0f, -20f));
            Box(t, "Spark", new Vector3(0.09f, 0.87f, 0f), new Vector3(0.08f, 0.08f, 0.08f), spark, Quaternion.Euler(0f, 45f, 45f));
        }

        private static void Box(Transform parent, string name, Vector3 pos, Vector3 size, Material mat, Quaternion? rot = null)
        {
            var go = GameObject.CreatePrimitive(PrimitiveType.Cube);
            Object.DestroyImmediate(go.GetComponent<Collider>());
            go.name = name;
            go.transform.SetParent(parent, false);
            go.transform.localPosition = pos;
            go.transform.localRotation = rot ?? Quaternion.identity;
            go.transform.localScale = size;
            var r = go.GetComponent<MeshRenderer>();
            r.sharedMaterial = mat;
            r.shadowCastingMode = UnityEngine.Rendering.ShadowCastingMode.Off;
            r.receiveShadows = false;
        }

        // ───────────────────────────── Xe ─────────────────────────────

        private struct CartRefs { public CartBody Body; }

        private static CartRefs BuildCart(Transform parent)
        {
            CartRescueArt.Model wheelModel = CartRescueArt.Get("jeep-open-wheel_FL");
            float wheelR = wheelModel.Mesh.bounds.extents.z * WheelScale;
            float halfDeck = 2f * SlotUnit;

            var cart = new GameObject("Cart");
            cart.transform.SetParent(parent, false);

            var wheels = new List<Transform>();
            foreach (float x in new[] { -halfDeck + 0.8f, halfDeck - 0.8f })
            foreach (float z in new[] { -0.75f, 0.75f })
            {
                var pivot = new GameObject("Wheel").transform;
                pivot.SetParent(cart.transform, false);
                pivot.localPosition = new Vector3(x, wheelR, z);
                GameObject w = Model(pivot, "jeep-open-wheel_FL", Vector3.zero, 90f, WheelScale, groundAlign: false);
                Vector3 c = Vector3.Scale(wheelModel.Mesh.bounds.center, Vector3.one * WheelScale);
                w.transform.localPosition = -(Quaternion.Euler(0f, 90f, 0f) * c);
                wheels.Add(pivot);
            }

            var chassis = new GameObject("Chassis").transform;
            chassis.SetParent(cart.transform, false);
            chassis.localPosition = new Vector3(0f, wheelR, 0f);

            // Trục + dầm dọc.
            CartRescueArt.Model log = CartRescueArt.Get("log");
            float logLen = log.Mesh.bounds.size.z, logW = log.Mesh.bounds.size.x, logH = log.Mesh.bounds.size.y;
            foreach (float z in new[] { -0.75f, 0.75f })
            {
                GameObject beam = Model(chassis, "log", Vector3.zero, 90f, 1f, groundAlign: false);
                beam.transform.localScale = new Vector3(1f, 1f, (2f * halfDeck + 0.4f) / logLen);
                beam.transform.localPosition = new Vector3(0f, 0.05f, z);
            }

            // Ván sàn: các khúc gỗ nằm theo chiều sâu, xếp dọc theo X.
            float plankScaleZ = 2.2f / logLen;
            int planks = Mathf.CeilToInt(2f * halfDeck / logW);
            float span = planks * logW;
            float plankBottom = 0.05f + log.Mesh.bounds.max.y;   // nằm trên dầm
            for (int i = 0; i < planks; i++)
            {
                GameObject plank = Model(chassis, "log", Vector3.zero, 0f, 1f, groundAlign: false);
                plank.transform.localScale = new Vector3(1f, 1f, plankScaleZ);
                plank.transform.localPosition = new Vector3(-span * 0.5f + logW * (i + 0.5f), plankBottom - log.Mesh.bounds.min.y, 0f);
            }
            float deckY = plankBottom + logH;

            // Cọc chặn hai đầu (thành sàn).
            foreach (float x in new[] { -halfDeck - 0.2f, halfDeck + 0.2f })
            foreach (float z in new[] { -0.9f, 0.9f })
            {
                GameObject post = Model(chassis, "log", Vector3.zero, 0f, 1f, groundAlign: false);
                post.transform.localRotation = Quaternion.Euler(-90f, 0f, 0f);
                post.transform.localScale = new Vector3(1f, 1f, 0.9f);
                post.transform.localPosition = new Vector3(x, deckY - 0.2f, z);
            }

            var deck = new GameObject("Deck").transform;
            deck.SetParent(chassis, false);
            deck.localPosition = new Vector3(0f, deckY, 0f);

            var body = cart.AddComponent<CartBody>();
            var so = new SerializedObject(body);
            so.FindProperty("_chassis").objectReferenceValue = chassis;
            so.FindProperty("_deck").objectReferenceValue = deck;
            SetArray(so, "_wheels", wheels.ConvertAll(t => (Object)t));
            so.FindProperty("_wheelRadius").floatValue = wheelR;
            so.FindProperty("_slotUnit").floatValue = SlotUnit;
            so.FindProperty("_motion.MinX").floatValue = -1.5f;   // mép trái xe (−1.5 − 2.9) vẫn trong khung ở 4:3 / 1:1
            so.FindProperty("_motion.MaxX").floatValue = CartMaxX;
            so.ApplyModifiedPropertiesWithoutUndo();

            // Tiếng động cơ (Tools~/gen_engine.py sinh Engine_Loop.wav).
            var engineSource = cart.AddComponent<AudioSource>();
            engineSource.playOnAwake = false;
            engineSource.loop = true;
            engineSource.spatialBlend = 0f;
            engineSource.volume = 0f;
            engineSource.clip = AssetDatabase.LoadAssetAtPath<AudioClip>(Src + "Audio/Engine_Loop.wav");
            if (engineSource.clip == null) Debug.LogWarning("[CartRescue] Missing audio: Engine_Loop.wav");
            var engine = cart.AddComponent<CartEngineAudio>();
            var eso = new SerializedObject(engine);
            eso.FindProperty("_cart").objectReferenceValue = body;
            eso.FindProperty("_source").objectReferenceValue = engineSource;
            eso.ApplyModifiedPropertiesWithoutUndo();
            return new CartRefs { Body = body };
        }

        // ───────────────────────────── Nhân vật ─────────────────────────────

        private static DeckRiderView CreateRider(Transform parent, string mesh, float zOffset)
        {
            var go = new GameObject("Rider_" + mesh);
            go.transform.SetParent(parent, false);
            var visual = new GameObject("Visual").transform;
            visual.SetParent(go.transform, false);
            visual.localPosition = new Vector3(0f, 0f, zOffset);

            CartRescueArt.Model m = CartRescueArt.Get(mesh);
            float scale = RiderHeight / m.Mesh.bounds.size.y;
            GameObject model = Model(visual, mesh, Vector3.zero, RiderYaw, scale, groundAlign: false);
            // Đặt chân ở gốc và tâm ngang ở x = 0.
            Bounds b = model.GetComponent<MeshRenderer>().bounds;
            Vector3 shift = new Vector3(-b.center.x + visual.position.x, -b.min.y + visual.position.y, 0f);
            model.transform.localPosition += shift;

            var view = go.AddComponent<DeckRiderView>();
            SetRef(view, "_visual", visual);
            return view;
        }

        /// <summary>
        /// Drone voxel tự dựng (game gốc không có drone): thân xám đen, đèn đỏ, camera trước, 2 tay đòn gắn motor +
        /// cánh quạt quay ngược chiều nhau, chân đáp, tời móc dây bên dưới. Kích thước ~3.4 x 1.4 world.
        /// </summary>
        private static RopeHangView BuildHelicopter(Transform parent, DeckRiderView rider)
        {
            var heli = new GameObject("Drone").transform;
            heli.SetParent(parent, false);
            heli.position = new Vector3(1.6f, 9.3f, 0.6f);
            var body = new GameObject("Body").transform;
            body.SetParent(heli, false);
            body.localScale = Vector3.one * 1.1f;

            Material dark = ColorMaterial("Drone_Dark", new Color(0.16f, 0.16f, 0.18f));
            Material grey = ColorMaterial("Drone_Grey", new Color(0.45f, 0.46f, 0.5f));
            Material light = ColorMaterial("Drone_Light", new Color(0.78f, 0.79f, 0.82f));
            Material red = ColorMaterial("Drone_Red", new Color(0.86f, 0.13f, 0.1f));
            Material blade = ColorMaterial("Drone_Blade", new Color(0.1f, 0.1f, 0.11f));
            Material yellow = ColorMaterial("Bomb_WireYellow", new Color(0.95f, 0.8f, 0.15f));

            // Thân.
            Box(body, "Hull", new Vector3(0f, 0f, 0f), new Vector3(1.3f, 0.42f, 0.9f), dark);
            Box(body, "Shell", new Vector3(0f, 0.27f, 0f), new Vector3(1.0f, 0.14f, 0.7f), grey);
            Box(body, "PanelL", new Vector3(-0.45f, 0f, -0.46f), new Vector3(0.3f, 0.24f, 0.04f), red);
            Box(body, "PanelR", new Vector3(0.45f, 0f, -0.46f), new Vector3(0.3f, 0.24f, 0.04f), red);
            Box(body, "Camera", new Vector3(0f, -0.04f, -0.47f), new Vector3(0.24f, 0.24f, 0.04f), light);
            Box(body, "Lens", new Vector3(0f, -0.04f, -0.495f), new Vector3(0.11f, 0.11f, 0.02f), dark);

            // Tay đòn + motor + cánh quạt.
            var rotors = new List<Object>();
            foreach (float side in new[] { -1f, 1f })
            {
                Box(body, "Arm", new Vector3(side * 1.0f, 0.1f, 0f), new Vector3(0.9f, 0.12f, 0.16f), grey);
                Box(body, "Motor", new Vector3(side * 1.45f, 0.18f, 0f), new Vector3(0.26f, 0.3f, 0.26f), dark);
                Box(body, "MotorRing", new Vector3(side * 1.45f, 0.08f, 0f), new Vector3(0.29f, 0.06f, 0.29f), red);
                var rotor = new GameObject("Rotor").transform;
                rotor.SetParent(body, false);
                rotor.localPosition = new Vector3(side * 1.45f, 0.37f, 0f);
                rotor.localRotation = Quaternion.Euler(0f, side * 30f, 0f);
                Box(rotor, "Hub", Vector3.zero, new Vector3(0.12f, 0.07f, 0.12f), light);
                Box(rotor, "Blade", new Vector3(0f, 0.02f, 0f), new Vector3(1.3f, 0.03f, 0.14f), blade);
                Box(rotor, "TipA", new Vector3(0.6f, 0.02f, 0f), new Vector3(0.1f, 0.035f, 0.15f), red);
                Box(rotor, "TipB", new Vector3(-0.6f, 0.02f, 0f), new Vector3(0.1f, 0.035f, 0.15f), red);
                rotors.Add(rotor);
            }

            // Chân đáp.
            foreach (float side in new[] { -1f, 1f })
            {
                Box(body, "Strut", new Vector3(side * 0.45f, -0.33f, 0f), new Vector3(0.08f, 0.26f, 0.08f), grey);
                Box(body, "Skid", new Vector3(side * 0.45f, -0.48f, 0f), new Vector3(0.1f, 0.06f, 0.9f), light);
            }

            // Tời + móc dây.
            Box(body, "Winch", new Vector3(0f, -0.32f, 0f), new Vector3(0.34f, 0.22f, 0.34f), grey);
            Box(body, "WinchBand", new Vector3(0f, -0.32f, 0f), new Vector3(0.36f, 0.06f, 0.36f), yellow);
            var anchor = new GameObject("RopeAnchor").transform;
            anchor.SetParent(body, false);
            anchor.localPosition = new Vector3(0f, -0.45f, 0f);
            anchor.position = new Vector3(anchor.position.x, anchor.position.y, 0f);

            var ropeGo = new GameObject("Rope", typeof(LineRenderer));
            ropeGo.transform.SetParent(parent, false);
            var line = ropeGo.GetComponent<LineRenderer>();
            line.sharedMaterial = SpriteMaterial("Rope", new Color(0.35f, 0.24f, 0.12f));
            line.widthMultiplier = 0.08f;
            line.positionCount = 2;
            line.useWorldSpace = true;
            line.shadowCastingMode = UnityEngine.Rendering.ShadowCastingMode.Off;

            rider.transform.position = anchor.position - new Vector3(0f, 1.8f + RiderHeight, 0f);
            var view = heli.gameObject.AddComponent<RopeHangView>();
            var so = new SerializedObject(view);
            so.FindProperty("_heli").objectReferenceValue = heli;
            SetArray(so, "_propellers", rotors);
            so.FindProperty("_anchor").objectReferenceValue = anchor;
            so.FindProperty("_rider").objectReferenceValue = rider.transform;
            so.FindProperty("_rope").objectReferenceValue = line;
            so.FindProperty("_hookHeight").floatValue = RiderHeight;
            so.ApplyModifiedPropertiesWithoutUndo();
            return view;
        }

        // ───────────────────────────── Camera / ánh sáng ─────────────────────────────

        private static Camera CreateCamera(Transform parent, out CartRescueCamera fit)
        {
            var go = new GameObject("Main Camera", typeof(Camera), typeof(AudioListener));
            go.tag = "MainCamera";
            go.transform.SetParent(parent, false);
            var cam = go.GetComponent<Camera>();
            cam.orthographic = true;
            cam.clearFlags = CameraClearFlags.SolidColor;
            cam.backgroundColor = WallColor;
            cam.nearClipPlane = 0.1f;
            cam.farClipPlane = 100f;
            fit = go.AddComponent<CartRescueCamera>();
            var so = new SerializedObject(fit);
            so.FindProperty("_focus").rectValue = new Rect(-4.5f, -0.5f, 15f, 12.5f);
            so.ApplyModifiedPropertiesWithoutUndo();
            return cam;
        }

        private static void CreateLight(Transform parent)
        {
            var go = new GameObject("Directional Light", typeof(Light));
            go.transform.SetParent(parent, false);
            go.transform.rotation = Quaternion.Euler(45f, -35f, 0f);
            var light = go.GetComponent<Light>();
            light.type = LightType.Directional;
            light.intensity = 0.9f;
            light.shadows = LightShadows.None;
        }

        private static void CreateAudioManager(Transform parent)
        {
            var go = new GameObject("AudioManager");
            go.transform.SetParent(parent, false);
            var music = go.AddComponent<AudioSource>();
            music.playOnAwake = false;
            music.loop = true;
            music.volume = 0.45f;
            var sound = go.AddComponent<AudioSource>();
            sound.playOnAwake = false;
            var manager = go.AddComponent<Playable.AudioManager>();
            var so = new SerializedObject(manager);
            so.FindProperty("_audioMusic").objectReferenceValue = music;
            so.FindProperty("_audioSound").objectReferenceValue = sound;
            so.ApplyModifiedPropertiesWithoutUndo();
        }

        // ───────────────────────────── UI ─────────────────────────────

        private struct UiRefs
        {
            public TutorialHand Hand;
            public WorldArrow Arrow;
            public Image WinOverlay;
            public Button PlayNow;
            public RectTransform PlayNowShine;
            public RectTransform Hint;
            public RectTransform BalanceHint;
            public PointerArrow Pointer;
            public Button Start;
            public RectTransform Win;
            public Button Blocker;
        }

        private static UiRefs BuildUi(Transform parent, Camera cam)
        {
            var canvasGo = new GameObject("Canvas", typeof(Canvas), typeof(CanvasScaler), typeof(GraphicRaycaster));
            canvasGo.transform.SetParent(parent, false);
            var canvas = canvasGo.GetComponent<Canvas>();
            canvas.renderMode = RenderMode.ScreenSpaceOverlay;
            var scaler = canvasGo.GetComponent<CanvasScaler>();
            scaler.uiScaleMode = CanvasScaler.ScaleMode.ScaleWithScreenSize;
            scaler.referenceResolution = new Vector2(1080f, 1920f);
            scaler.matchWidthOrHeight = 0.5f;
            var canvasRect = (RectTransform)canvasGo.transform;

            // Nút START: ảnh có sẵn chữ (button_start.png 2170x725).
            var startGo = new GameObject("StartButton", typeof(RectTransform), typeof(Image), typeof(Button));
            startGo.transform.SetParent(canvasGo.transform, false);
            var startRect = (RectTransform)startGo.transform;
            startRect.anchorMin = startRect.anchorMax = new Vector2(0.5f, 0.16f);
            startRect.sizeDelta = new Vector2(560f, 187f);
            var startImg = startGo.GetComponent<Image>();
            startImg.sprite = UiSprite(StartButtonPath, 1024);
            startImg.preserveAspect = true;
            startGo.AddComponent<AspectAnchor>();

            // Nền đen màn Win (alpha 0.7 do controller fade lên) — nằm dưới chữ WIN, không chặn chạm.
            var overlayGo = new GameObject("WinOverlay", typeof(RectTransform), typeof(Image));
            overlayGo.transform.SetParent(canvasGo.transform, false);
            var overlayRect = (RectTransform)overlayGo.transform;
            overlayRect.anchorMin = Vector2.zero;
            overlayRect.anchorMax = Vector2.one;
            overlayRect.offsetMin = overlayRect.offsetMax = Vector2.zero;
            var overlayImg = overlayGo.GetComponent<Image>();
            overlayImg.color = new Color(0f, 0f, 0f, 0f);
            overlayImg.raycastTarget = false;
            overlayGo.SetActive(false);

            // Chữ WIN: ảnh (1774x887).
            var winGo = new GameObject("WinText", typeof(RectTransform), typeof(Image));
            winGo.transform.SetParent(canvasGo.transform, false);
            var winRect = (RectTransform)winGo.transform;
            winRect.anchorMin = winRect.anchorMax = new Vector2(0.5f, 0.62f);
            winRect.sizeDelta = new Vector2(860f, 430f);
            var winImg = winGo.GetComponent<Image>();
            winImg.sprite = UiSprite(WinImagePath, 1024);
            winImg.preserveAspect = true;
            winImg.raycastTarget = false;

            // Nút PLAY NOW (1879x589) ở màn Win. Mask theo chính hình nút để vệt sáng chéo chỉ hiện bên trong nút.
            var playGo = new GameObject("PlayNowButton", typeof(RectTransform), typeof(Image), typeof(Button), typeof(Mask));
            playGo.transform.SetParent(canvasGo.transform, false);
            var playRect = (RectTransform)playGo.transform;
            playRect.anchorMin = playRect.anchorMax = new Vector2(0.5f, 0.3f);
            playRect.sizeDelta = new Vector2(560f, 175f);
            var playImg = playGo.GetComponent<Image>();
            playImg.sprite = UiSprite(PlayNowPath, 1024);
            playGo.GetComponent<Mask>().showMaskGraphic = true;
            // Màn dọc: sát ngay dưới chữ WIN; màn ngang: thấp hơn (chữ WIN chiếm nhiều chiều cao).
            var playAnchor = playGo.AddComponent<AspectAnchor>();
            var paso = new SerializedObject(playAnchor);
            paso.FindProperty("_portrait").vector2Value = new Vector2(0.5f, 0.455f);
            paso.FindProperty("_landscape").vector2Value = new Vector2(0.5f, 0.3f);
            paso.ApplyModifiedPropertiesWithoutUndo();
            var playNow = playGo.GetComponent<Button>();
            // Vệt sáng chéo: dựng sẵn trong scene (không sinh bằng code lúc chạy); controller chỉ tween vị trí X.
            var shineGo = new GameObject("Shine", typeof(RectTransform), typeof(Image));
            shineGo.transform.SetParent(playRect, false);
            var shineRect = (RectTransform)shineGo.transform;
            shineRect.anchorMin = shineRect.anchorMax = new Vector2(0.5f, 0.5f);
            shineRect.sizeDelta = new Vector2(60f, 360f);
            shineRect.localRotation = Quaternion.Euler(0f, 0f, -25f);
            shineRect.anchoredPosition = new Vector2(-400f, 0f);
            var shineImg = shineGo.GetComponent<Image>();
            shineImg.color = new Color(1f, 1f, 1f, 0.6f);
            shineImg.raycastTarget = false;
            var shineThin = new GameObject("ShineThin", typeof(RectTransform), typeof(Image));
            shineThin.transform.SetParent(shineRect, false);
            var thinRect = (RectTransform)shineThin.transform;
            thinRect.anchorMin = thinRect.anchorMax = new Vector2(0.5f, 0.5f);
            thinRect.sizeDelta = new Vector2(18f, 360f);
            thinRect.anchoredPosition = new Vector2(55f, 0f);
            var thinImg = shineThin.GetComponent<Image>();
            thinImg.color = new Color(1f, 1f, 1f, 0.45f);
            thinImg.raycastTarget = false;
            playGo.SetActive(false);

            // Chữ hướng dẫn bước kéo dây (2 dòng: trắng / vàng, viền đen dày, nghiêng nhẹ).
            var hintGo = new GameObject("RopeHint", typeof(RectTransform));
            hintGo.transform.SetParent(canvasGo.transform, false);
            var hintRect = (RectTransform)hintGo.transform;
            hintRect.anchorMin = hintRect.anchorMax = new Vector2(0.5f, 0.86f);
            hintRect.sizeDelta = new Vector2(900f, 260f);
            hintRect.localRotation = Quaternion.Euler(0f, 0f, 4f);
            // Màn dọc: giữa, trên drone. Màn ngang: bên phải drone (như demo) để không đè lên drone.
            var hintAnchor = hintGo.AddComponent<AspectAnchor>();
            var haso = new SerializedObject(hintAnchor);
            haso.FindProperty("_portrait").vector2Value = new Vector2(0.5f, 0.88f);
            haso.FindProperty("_landscape").vector2Value = new Vector2(0.76f, 0.8f);
            haso.ApplyModifiedPropertiesWithoutUndo();
            TMP_FontAsset hintFont = BuildHintFont(out Material hintMaterial);
            HintLine(hintRect, "DRAG THE ROPE", hintFont, hintMaterial, Color.white, 50f);
            HintLine(hintRect, "TO THE CART!", hintFont, hintMaterial, new Color(1f, 0.86f, 0.1f), -50f);

            // Chữ hướng dẫn bước cân xe (sau khi thả nhân vật; drone đã bay đi nên đặt giữa phía trên).
            var balanceGo = new GameObject("BalanceHint", typeof(RectTransform));
            balanceGo.transform.SetParent(canvasGo.transform, false);
            var balanceRect = (RectTransform)balanceGo.transform;
            balanceRect.sizeDelta = new Vector2(900f, 260f);
            var balanceAnchor = balanceGo.AddComponent<AspectAnchor>();
            var baso = new SerializedObject(balanceAnchor);
            baso.FindProperty("_portrait").vector2Value = new Vector2(0.5f, 0.84f);
            baso.FindProperty("_landscape").vector2Value = new Vector2(0.5f, 0.82f);
            baso.ApplyModifiedPropertiesWithoutUndo();
            // Màn dọc 2 dòng, màn ngang 1 dòng (cùng màu: "KEEP YOUR" trắng, "BALANCE!" vàng).
            var twoLines = new GameObject("TwoLines", typeof(RectTransform)).GetComponent<RectTransform>();
            twoLines.SetParent(balanceRect, false);
            HintLine(twoLines, "KEEP YOUR", hintFont, hintMaterial, Color.white, 50f);
            HintLine(twoLines, "BALANCE!", hintFont, hintMaterial, new Color(1f, 0.86f, 0.1f), -50f);
            var oneLine = new GameObject("OneLine", typeof(RectTransform)).GetComponent<RectTransform>();
            oneLine.SetParent(balanceRect, false);
            HintLine(oneLine, "KEEP YOUR <color=#FFDB1A>BALANCE!</color>", hintFont, hintMaterial, Color.white, 0f, 1500f);
            var balanceSwitch = balanceGo.AddComponent<AspectSwitch>();
            var bsso = new SerializedObject(balanceSwitch);
            bsso.FindProperty("_portrait").objectReferenceValue = twoLines.gameObject;
            bsso.FindProperty("_landscape").objectReferenceValue = oneLine.gameObject;
            bsso.ApplyModifiedPropertiesWithoutUndo();
            balanceGo.SetActive(false);

            // Mũi tên vàng chỉ từ chữ vào nhân vật treo (ảnh arrow-right, pivot ở mũi để đặt đúng đầu mũi tên).
            var pointerGo = new GameObject("RopeArrow", typeof(RectTransform), typeof(CanvasGroup));
            pointerGo.transform.SetParent(canvasGo.transform, false);
            var pointerGroup = pointerGo.GetComponent<CanvasGroup>();
            pointerGroup.blocksRaycasts = false;
            var pointerImg = UiImage("Arrow", pointerGo.transform, UiSprite(ArrowPath));
            var pointerRect = pointerImg.rectTransform;
            pointerRect.anchorMin = pointerRect.anchorMax = new Vector2(0.5f, 0.5f);
            pointerRect.pivot = new Vector2(1f, 0.5f);
            pointerRect.sizeDelta = new Vector2(170f, 130f);
            pointerImg.preserveAspect = true;
            pointerImg.color = new Color(1f, 0.84f, 0.1f);
            var pointer = pointerGo.AddComponent<PointerArrow>();
            var pso = new SerializedObject(pointer);
            pso.FindProperty("_arrow").objectReferenceValue = pointerRect;
            pso.FindProperty("_group").objectReferenceValue = pointerGroup;
            pso.FindProperty("_from").objectReferenceValue = hintRect;
            pso.FindProperty("_canvasRect").objectReferenceValue = canvasRect;
            pso.FindProperty("_worldCamera").objectReferenceValue = cam;
            pso.FindProperty("_gap").floatValue = 70f;
            pso.ApplyModifiedPropertiesWithoutUndo();

            // Mũi tên hướng kéo (bước cân xe) — dưới bàn tay.
            var arrowGo = new GameObject("PushArrow", typeof(RectTransform), typeof(Image), typeof(CanvasGroup));
            arrowGo.transform.SetParent(canvasGo.transform, false);
            var arrowRect = (RectTransform)arrowGo.transform;
            arrowRect.anchorMin = arrowRect.anchorMax = new Vector2(0.5f, 0.5f);
            arrowRect.sizeDelta = new Vector2(260f, 200f);
            var arrowImg = arrowGo.GetComponent<Image>();
            arrowImg.sprite = UiSprite(ArrowPath);
            arrowImg.preserveAspect = true;
            arrowImg.raycastTarget = false;
            var arrowGroup = arrowGo.GetComponent<CanvasGroup>();
            arrowGroup.blocksRaycasts = false;
            arrowGroup.interactable = false;
            var arrow = arrowGo.AddComponent<WorldArrow>();
            var aso = new SerializedObject(arrow);
            aso.FindProperty("_arrow").objectReferenceValue = arrowRect;
            aso.FindProperty("_group").objectReferenceValue = arrowGroup;
            aso.FindProperty("_canvasRect").objectReferenceValue = canvasRect;
            aso.FindProperty("_worldCamera").objectReferenceValue = cam;
            aso.ApplyModifiedPropertiesWithoutUndo();

            // Bàn tay hướng dẫn (hand.png + hiệu ứng nhấn như Brainrot Playground). Khung "Hand" có pivot = đầu ngón tay
            // (0.3, 0.97 của hand.png) để TutorialHand đặt thẳng vị trí đầu ngón tay.
            var handGo = new GameObject("Hand", typeof(RectTransform), typeof(CanvasGroup));
            handGo.transform.SetParent(canvasGo.transform, false);
            var handRect = (RectTransform)handGo.transform;
            handRect.anchorMin = handRect.anchorMax = new Vector2(0.5f, 0.5f);
            handRect.pivot = new Vector2(0.3f, 0.97f);
            handRect.sizeDelta = new Vector2(168f, 200f);
            var group = handGo.GetComponent<CanvasGroup>();
            group.blocksRaycasts = false;
            group.interactable = false;

            // Hiệu ứng nhấn (vẽ dưới bàn tay): vòng sóng + 3 tia sáng vàng quanh đầu ngón tay.
            var tapFx = new GameObject("Tap FX", typeof(RectTransform)).GetComponent<RectTransform>();
            tapFx.SetParent(handRect, false);
            tapFx.anchorMin = new Vector2(0.3f - 0.62f, 0.97f - 0.52f);
            tapFx.anchorMax = new Vector2(0.3f + 0.62f, 0.97f + 0.52f);
            tapFx.offsetMin = tapFx.offsetMax = Vector2.zero;
            Image ring = UiImage("Ring", tapFx, UiSprite(Src + "UI/FX_TapRing.png"));
            ring.rectTransform.anchorMin = new Vector2(0.1f, 0.1f);
            ring.rectTransform.anchorMax = new Vector2(0.9f, 0.9f);
            ring.color = new Color(1f, 1f, 1f, 0.9f);
            Sprite raySprite = UiSprite(Src + "UI/FX_TapRay.png");
            float[] rayAngles = { -5f, 40f, 85f };
            var rays = new List<Object>();
            for (int i = 0; i < rayAngles.Length; i++)
            {
                var holder = new GameObject("Ray " + i, typeof(RectTransform)).GetComponent<RectTransform>();
                holder.SetParent(tapFx, false);
                holder.anchorMin = Vector2.zero;
                holder.anchorMax = Vector2.one;
                holder.offsetMin = holder.offsetMax = Vector2.zero;
                holder.localRotation = Quaternion.Euler(0f, 0f, rayAngles[i]);
                Image bar = UiImage("Bar", holder, raySprite);
                bar.color = new Color32(0xFF, 0xD2, 0x1F, 0xFF);
                bar.rectTransform.pivot = new Vector2(0.5f, 0f);
                bar.rectTransform.anchorMin = new Vector2(0.455f, 0.72f);
                bar.rectTransform.anchorMax = new Vector2(0.545f, 0.99f);
                bar.rectTransform.offsetMin = bar.rectTransform.offsetMax = Vector2.zero;
                var edge = bar.gameObject.AddComponent<UnityEngine.UI.Outline>();
                edge.effectColor = new Color32(0x1A, 0x1A, 0x2E, 0xFF);
                edge.effectDistance = new Vector2(3f, -3f);
                rays.Add(bar);
            }
            tapFx.gameObject.SetActive(false);

            Image handImg = UiImage("Hand Image", handRect, UiSprite(HandPath));
            handImg.rectTransform.pivot = new Vector2(0.3f, 0.97f);

            var hand = handGo.AddComponent<TutorialHand>();
            var hso = new SerializedObject(hand);
            hso.FindProperty("_hand").objectReferenceValue = handRect;
            hso.FindProperty("_group").objectReferenceValue = group;
            hso.FindProperty("_canvasRect").objectReferenceValue = canvasRect;
            hso.FindProperty("_worldCamera").objectReferenceValue = cam;
            hso.FindProperty("_tapFx").objectReferenceValue = tapFx;
            hso.FindProperty("_tapRing").objectReferenceValue = ring;
            SetArray(hso, "_tapRays", rays);
            hso.ApplyModifiedPropertiesWithoutUndo();

            // Nút chặn toàn màn hình của GameManager (CTA sau khi kết thúc) — trên cùng.
            var blockGo = new GameObject("Blocker", typeof(RectTransform), typeof(Image), typeof(Button));
            blockGo.transform.SetParent(canvasGo.transform, false);
            var blockRect = (RectTransform)blockGo.transform;
            blockRect.anchorMin = Vector2.zero;
            blockRect.anchorMax = Vector2.one;
            blockRect.sizeDelta = Vector2.zero;
            blockGo.GetComponent<Image>().color = new Color(0f, 0f, 0f, 0f);
            blockGo.SetActive(false);

            return new UiRefs { BalanceHint = balanceRect, PlayNow = playNow, PlayNowShine = shineRect, WinOverlay = overlayImg, Pointer = pointer, Hint = hintRect, Arrow = arrow, Hand = hand, Start = startGo.GetComponent<Button>(), Win = winRect, Blocker = blockGo.GetComponent<Button>() };
        }

        /// <param name="maxSize">Giới hạn kích thước texture khi build (0 = giữ nguyên) — ảnh UI gốc rất lớn, playable cần nhẹ.</param>
        private static Image UiImage(string name, Transform parent, Sprite sprite)
        {
            var go = new GameObject(name, typeof(RectTransform), typeof(Image));
            go.transform.SetParent(parent, false);
            var rt = (RectTransform)go.transform;
            rt.anchorMin = Vector2.zero;
            rt.anchorMax = Vector2.one;
            rt.offsetMin = rt.offsetMax = Vector2.zero;
            var img = go.GetComponent<Image>();
            img.sprite = sprite;
            img.raycastTarget = false;
            return img;
        }

        /// <summary>Một dòng chữ hướng dẫn TMP (FFFFORWA Bold, viền đen dày + bóng đổ từ material).</summary>
        private static void HintLine(RectTransform parent, string text, TMP_FontAsset font, Material material, Color color, float y, float width = 1000f)
        {
            // Tạo ở trạng thái tắt rồi mới thêm TMP: tránh TMP tìm font mặc định (LiberationSans) trước khi gán font.
            var go = new GameObject(System.Text.RegularExpressions.Regex.Replace(text, "<[^>]+>", ""), typeof(RectTransform));
            go.SetActive(false);
            go.AddComponent<TextMeshProUGUI>();
            go.transform.SetParent(parent, false);
            var rt = (RectTransform)go.transform;
            rt.anchoredPosition = new Vector2(0f, y);
            rt.sizeDelta = new Vector2(width, 110f);
            var t = go.GetComponent<TextMeshProUGUI>();
            t.font = font;
            t.fontSharedMaterial = material;
            t.text = text;
            t.fontSize = 72f;
            t.fontStyle = FontStyles.Bold;
            t.color = color;
            t.alignment = TextAlignmentOptions.Center;
            t.textWrappingMode = TextWrappingModes.NoWrap;
            t.overflowMode = TextOverflowModes.Overflow;
            t.raycastTarget = false;
            go.SetActive(true);
        }

        /// <summary>
        /// TMP font asset từ FFFFORWA.TTF (SDF, atlas tĩnh chỉ chứa ký tự cần dùng để nhẹ build) + material viền đen
        /// dày và bóng đổ (giống chữ hướng dẫn trong demo).
        /// </summary>
        private static TMP_FontAsset BuildHintFont(out Material outline)
        {
            string path = Gen + "Hint SDF.asset";
            string outlinePath = Gen + "Hint Outline.mat";
            var source = AssetDatabase.LoadAssetAtPath<Font>(HintFontPath);
            if (AssetDatabase.LoadAssetAtPath<TMP_FontAsset>(path) != null) AssetDatabase.DeleteAsset(path);
            TMP_FontAsset font = TMP_FontAsset.CreateFontAsset(source, 90, 12, GlyphRenderMode.SDFAA, 1024, 1024,
                AtlasPopulationMode.Dynamic, false);
            font.name = "Hint SDF";
            font.TryAddCharacters(" !?.,ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789", out string missing);
            if (!string.IsNullOrEmpty(missing)) Debug.LogWarning("[CartRescue] Font hướng dẫn thiếu ký tự: " + missing);
            AssetDatabase.CreateAsset(font, path);
            Texture2D atlas = font.atlasTextures[0];
            atlas.name = "Hint Atlas";
            AssetDatabase.AddObjectToAsset(atlas, font);
            font.material.name = "Hint Material";
            AssetDatabase.AddObjectToAsset(font.material, font);
            font.atlasPopulationMode = AtlasPopulationMode.Static;
            EditorUtility.SetDirty(font);
            AssetDatabase.SaveAssets();

            outline = new Material(font.material) { name = "Hint Outline" };
            outline.EnableKeyword("OUTLINE_ON");
            outline.SetFloat("_OutlineWidth", 0.3f);
            outline.SetColor("_OutlineColor", new Color32(0x14, 0x14, 0x1A, 0xFF));
            outline.SetFloat("_FaceDilate", 0.15f);
            outline.EnableKeyword("UNDERLAY_ON");
            outline.SetColor("_UnderlayColor", new Color32(0x14, 0x14, 0x1A, 0xFF));
            outline.SetFloat("_UnderlayOffsetX", 0.1f);
            outline.SetFloat("_UnderlayOffsetY", -0.6f);
            outline.SetFloat("_UnderlayDilate", 0.45f);
            outline.SetFloat("_UnderlaySoftness", 0f);
            if (AssetDatabase.LoadAssetAtPath<Material>(outlinePath) != null) AssetDatabase.DeleteAsset(outlinePath);
            AssetDatabase.CreateAsset(outline, outlinePath);
            return font;
        }

        private static Sprite UiSprite(string path, int maxSize = 0)
        {
            var imp = (TextureImporter)AssetImporter.GetAtPath(path);
            if (imp != null && (imp.textureType != TextureImporterType.Sprite || (maxSize > 0 && imp.maxTextureSize != maxSize)))
            {
                imp.textureType = TextureImporterType.Sprite;
                imp.spriteImportMode = SpriteImportMode.Single;
                if (maxSize > 0) imp.maxTextureSize = maxSize;
                imp.SaveAndReimport();
            }
            Sprite sprite = AssetDatabase.LoadAssetAtPath<Sprite>(path);
            if (sprite == null) Debug.LogWarning("[CartRescue] Missing sprite: " + path);
            return sprite;
        }

        // ───────────────────────────── Tiện ích ─────────────────────────────

        /// <summary>Tạo GameObject hiển thị một model đã xuất; groundAlign = đặt đáy model chạm y của position.</summary>
        private static GameObject Model(Transform parent, string mesh, Vector3 position, float yaw, float scale, bool groundAlign)
        {
            CartRescueArt.Model m = CartRescueArt.Get(mesh);
            var go = new GameObject(mesh);
            go.transform.SetParent(parent, false);
            go.AddComponent<MeshFilter>().sharedMesh = m.Mesh;
            var r = go.AddComponent<MeshRenderer>();
            r.sharedMaterials = m.Materials;
            r.shadowCastingMode = UnityEngine.Rendering.ShadowCastingMode.Off;
            r.receiveShadows = false;
            go.transform.localRotation = Quaternion.Euler(0f, yaw, 0f);
            go.transform.localScale = Vector3.one * scale;
            go.transform.localPosition = position;
            if (groundAlign)
            {
                Bounds b = r.bounds;
                go.transform.position += new Vector3(position.x - b.center.x, position.y - b.min.y, position.z - b.center.z);
            }
            return go;
        }

        private static void Cube(Transform parent, string name, Vector3 pos, Vector3 size, Material mat)
        {
            var go = GameObject.CreatePrimitive(PrimitiveType.Cube);
            Object.DestroyImmediate(go.GetComponent<Collider>());
            go.name = name;
            go.transform.SetParent(parent, false);
            go.transform.localPosition = pos;
            go.transform.localScale = size;
            go.GetComponent<MeshRenderer>().sharedMaterial = mat;
        }

        private static readonly Color WallFloorColor = new Color(0.24f, 0.24f, 0.25f);
        private static readonly Color WallColor = new Color(0.76f, 0.76f, 0.76f);
        private static readonly Color WallLineColor = new Color(0.72f, 0.72f, 0.72f);

        private static Material UnlitColorMaterial(string name, Color color)
        {
            string path = Gen + "Materials/" + name + ".mat";
            var mat = AssetDatabase.LoadAssetAtPath<Material>(path);
            if (mat == null)
            {
                mat = new Material(Shader.Find("Unlit/Color"));
                AssetDatabase.CreateAsset(mat, path);
            }
            mat.shader = Shader.Find("Unlit/Color");
            mat.color = color;
            EditorUtility.SetDirty(mat);
            return mat;
        }

        /// <summary>Tường: texture ô vuông 1 đơn vị world, viền mờ — sinh ra file PNG trong Generated/.</summary>
        private static Material GridMaterial(string name, float width, float height)
        {
            const int size = 64, line = 2;
            string texPath = Gen + "Textures/Env_Grid.png";
            CartRescueArt.EnsureFolder(Gen + "Textures");
            var tex = new Texture2D(size, size, TextureFormat.RGB24, false);
            for (int y = 0; y < size; y++)
            for (int x = 0; x < size; x++)
                tex.SetPixel(x, y, x < line || y < line ? WallLineColor : WallColor);
            System.IO.File.WriteAllBytes(texPath, tex.EncodeToPNG());
            Object.DestroyImmediate(tex);
            AssetDatabase.ImportAsset(texPath);
            var imp = (TextureImporter)AssetImporter.GetAtPath(texPath);
            imp.wrapMode = TextureWrapMode.Repeat;
            imp.mipmapEnabled = true;
            imp.filterMode = FilterMode.Bilinear;
            imp.SaveAndReimport();

            string path = Gen + "Materials/" + name + ".mat";
            var mat = AssetDatabase.LoadAssetAtPath<Material>(path);
            if (mat == null)
            {
                mat = new Material(Shader.Find("Unlit/Texture"));
                AssetDatabase.CreateAsset(mat, path);
            }
            mat.shader = Shader.Find("Unlit/Texture");
            mat.mainTexture = AssetDatabase.LoadAssetAtPath<Texture2D>(texPath);
            const float tile = 1.5f; // cạnh ô vuông (world)
            mat.mainTextureScale = new Vector2(width / tile, height / tile);
            EditorUtility.SetDirty(mat);
            return mat;
        }

        private static Material ColorMaterial(string name, Color color)
        {
            string path = Gen + "Materials/" + name + ".mat";
            var mat = AssetDatabase.LoadAssetAtPath<Material>(path);
            if (mat == null)
            {
                mat = new Material(Shader.Find("Legacy Shaders/Diffuse"));
                AssetDatabase.CreateAsset(mat, path);
            }
            mat.color = color;
            EditorUtility.SetDirty(mat);
            return mat;
        }

        private static Material SpriteMaterial(string name, Color color)
        {
            string path = Gen + "Materials/" + name + ".mat";
            var mat = AssetDatabase.LoadAssetAtPath<Material>(path);
            if (mat == null)
            {
                mat = new Material(Shader.Find("Sprites/Default"));
                AssetDatabase.CreateAsset(mat, path);
            }
            mat.color = color;
            EditorUtility.SetDirty(mat);
            return mat;
        }

        private static void ConfigureAudio()
        {
            foreach (string name in new[] { "Win", "action_jump", "Button" })
            {
                var imp = (AudioImporter)AssetImporter.GetAtPath(Src + "Audio/" + name + ".mp3");
                if (imp == null) continue;
                AudioImporterSampleSettings s = imp.defaultSampleSettings;
                if (s.loadType == AudioClipLoadType.DecompressOnLoad) continue;
                s.loadType = AudioClipLoadType.DecompressOnLoad;
                imp.defaultSampleSettings = s;
                imp.SaveAndReimport();
            }
        }

        private static AudioClip Clip(string name)
        {
            var clip = AssetDatabase.LoadAssetAtPath<AudioClip>(Src + "Audio/" + name + ".mp3");
            if (clip == null) Debug.LogWarning("[CartRescue] Missing audio: " + name);
            return clip;
        }

        private static void SetRef(Object target, string field, Object value)
        {
            var so = new SerializedObject(target);
            so.FindProperty(field).objectReferenceValue = value;
            so.ApplyModifiedPropertiesWithoutUndo();
        }

        private static void SetArray(SerializedObject so, string field, IReadOnlyList<Object> values)
        {
            SerializedProperty p = so.FindProperty(field);
            p.arraySize = values.Count;
            for (int i = 0; i < values.Count; i++) p.GetArrayElementAtIndex(i).objectReferenceValue = values[i];
        }
    }
}
