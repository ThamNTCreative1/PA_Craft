using System.Collections.Generic;
using System.IO;
using TMPro;
using UnityEditor;
using UnityEditor.SceneManagement;
using UnityEngine;
using UnityEngine.SceneManagement;
using UnityEngine.UI;

namespace Playable.PetRescue.EditorTools
{
    /// Idempotent patch that turns the runner scene into the cr1 open-field "Pet Attract" layout.
    /// It edits only the objects listed in the approved plan and never rebuilds the Canvas.
    public static class RescueAttractPatch
    {
        private const string Root = "Assets/_Playable_/PetRescue/";
        public const string HeartSprite = Root + "Textures/UI/heart_pixel.png";
        public const string RingSprite = "Assets/_Playable_/2D Texture/UI/Joystick/AllAxis_Outline_Arrows.png";
        public const string KnobSprite = "Assets/_Playable_/2D Texture/UI/Joystick/AllAxis_Plain_Arrows.png";
        public const string ArrowSprite = Root + "Textures/UI/pointer_arrow.png";
        public const string JumpSprite = "Assets/Game/Textures/UI/Ingame/btn_jump.png";
        public const string GroundMaterial = Root + "Materials/AttractGround.mat";
        public const string WallMaterial = Root + "Materials/ArenaWall.mat";
        public const float ArenaHalf = 14, WallCenter = 15;

        public static readonly Vector3[] PetHomes =
        {
            new Vector3(-3, 0, 4), new Vector3(3.5f, 0, 5.5f), new Vector3(-7, 0, 1.5f),
            new Vector3(7, 0, 2), new Vector3(-2.5f, 0, 10), new Vector3(4.5f, 0, 11)
        };
        public static readonly Vector3[] TntSpots =
        {
            new Vector3(.8f, 0, 4), new Vector3(-5, 0, 6), new Vector3(5.5f, 0, 7.5f), new Vector3(-1, 0, 8.5f),
            new Vector3(1.5f, 0, 12.5f), new Vector3(-8.5f, 0, -2), new Vector3(8.5f, 0, -1), new Vector3(-4, 0, -6)
        };
        private static readonly Vector2[] InnerTrees = { new Vector2(-10, 8), new Vector2(10, 10), new Vector2(-9, -7), new Vector2(10, -6) };
        private static readonly Vector2[] OuterTrees =
        {
            new Vector2(-17.5f, -8), new Vector2(-18, 4), new Vector2(-17, 15), new Vector2(17.5f, -5),
            new Vector2(18, 7), new Vector2(16.5f, 17), new Vector2(-6, 17.5f), new Vector2(6.5f, 18.5f)
        };
        private static readonly Vector2[] Pillars = { new Vector2(-12, 2), new Vector2(12, 3), new Vector2(-5, -11), new Vector2(6, -11), new Vector2(-6, 13), new Vector2(9, 13.5f) };

        [MenuItem("Playable/Pet Rescue/Patch Attract (cr1)")]
        public static void PatchMenu()
        {
            var scene = SceneManager.GetActiveScene();
            if (scene.path != "Assets/_Playable_/Scenes/PetRescue.unity")
                throw new System.InvalidOperationException("Open Assets/_Playable_/Scenes/PetRescue.unity first.");
            Patch(scene);
            EditorSceneManager.MarkSceneDirty(scene);
            EditorSceneManager.SaveScene(scene);
            Debug.Log("Pet Rescue: Attract (cr1) patch applied.");
        }

        public static void Patch(Scene scene)
        {
            EnsureAssets();
            var roots = new Dictionary<string, GameObject>();
            foreach (var root in scene.GetRootGameObjects()) roots[root.name] = root;
            foreach (var root in scene.GetRootGameObjects()) RemoveMissing(root);

            var world = roots["World"].transform;
            ClearRunnerGeometry(world);
            if (roots.ContainsKey("Walls")) Object.DestroyImmediate(roots["Walls"]);
            EnsureGround(world);
            var walls = new List<RescueWallObstacle>();
            EnsureBorder(world, walls);
            ArrangeScenery(world.Find("Scenery"), walls);

            var arena = world.GetComponent<RescueArena>();
            var arenaSo = new SerializedObject(arena);
            arenaSo.FindProperty("_min").vector2Value = new Vector2(-ArenaHalf, -ArenaHalf);
            arenaSo.FindProperty("_max").vector2Value = new Vector2(ArenaHalf, ArenaHalf);
            SetArray(arenaSo, "_walls", walls.ToArray());
            arenaSo.ApplyModifiedPropertiesWithoutUndo();

            var hero = roots["Hero"].GetComponent<RescueHeroMotor>();
            hero.transform.SetPositionAndRotation(Vector3.zero, Quaternion.identity);
            var heroSo = new SerializedObject(hero); heroSo.FindProperty("_speed").floatValue = 4.5f; heroSo.ApplyModifiedPropertiesWithoutUndo();

            var pets = roots["Pets"].GetComponentsInChildren<RescuePetFollower>(true);
            var order = new[] { "Dog", "Duck", "Rabbit", "Pig", "Sheep", "Fox" };
            var sortedPets = new RescuePetFollower[order.Length];
            foreach (var pet in pets) sortedPets[System.Array.IndexOf(order, pet.name)] = pet;
            for (int i = 0; i < sortedPets.Length; i++) sortedPets[i].transform.position = PetHomes[i];

            var hazards = new List<RescueTntHazard>(roots["TNTs"].GetComponentsInChildren<RescueTntHazard>(true));
            hazards.Sort((a, b) => string.CompareOrdinal(a.name, b.name));
            while (hazards.Count > TntSpots.Length) { Object.DestroyImmediate(hazards[hazards.Count - 1].gameObject); hazards.RemoveAt(hazards.Count - 1); }
            for (int i = 0; i < hazards.Count; i++) hazards[i].transform.position = TntSpots[i];

            var camera = roots["Main Camera"].GetComponent<Camera>();
            var follow = new SerializedObject(roots["Main Camera"].GetComponent<RescueCameraFollow>());
            follow.FindProperty("_camera").objectReferenceValue = camera;
            follow.FindProperty("_portraitOffset").vector3Value = new Vector3(0, 4.2f, -5.6f); follow.FindProperty("_portraitAngles").vector3Value = new Vector3(27, 0, 0);
            follow.FindProperty("_landscapeOffset").vector3Value = new Vector3(0, 3.6f, -5.4f); follow.FindProperty("_landscapeAngles").vector3Value = new Vector3(22, 0, 0);
            follow.FindProperty("_portraitFieldOfView").floatValue = 64; follow.FindProperty("_landscapeFieldOfView").floatValue = 48;
            follow.ApplyModifiedPropertiesWithoutUndo();

            var canvas = roots["Canvas"];
            var hud = canvas.GetComponent<RescueHudView>();
            var tutorial = canvas.GetComponent<RescueTutorialView>();
            var feedback = PatchCanvas(canvas, camera, hud, tutorial);
            var controls = EnsureControls(canvas, tutorial);

            var flow = roots["RescueFlow"].GetComponent<RescueGameFlow>();
            var so = new SerializedObject(flow);
            so.FindProperty("_duration").floatValue = 15;
            so.FindProperty("_required").intValue = 5;
            so.FindProperty("_attractRadius").floatValue = 1.6f;
            so.FindProperty("_arena").objectReferenceValue = arena;
            so.FindProperty("_feedback").objectReferenceValue = feedback;
            so.FindProperty("_controls").objectReferenceValue = controls;
            so.FindProperty("_tutorial").objectReferenceValue = tutorial;
            so.FindProperty("_hud").objectReferenceValue = hud;
            SetArray(so, "_pets", sortedPets);
            SetArray(so, "_hazards", hazards.ToArray());
            so.ApplyModifiedPropertiesWithoutUndo();
        }

        // ---------- World ----------

        private static void ClearRunnerGeometry(Transform world)
        {
            var doomed = new List<GameObject>();
            foreach (Transform child in world)
                if (StartsWithAny(child.name, "Tile ", "Pit", "Boundary", "Fence", "Gate", "Safe")) doomed.Add(child.gameObject);
            var scenery = world.Find("Scenery");
            if (scenery != null) foreach (Transform child in scenery) if (child.name.StartsWith("Bank")) doomed.Add(child.gameObject);
            foreach (var go in doomed) Object.DestroyImmediate(go);
        }

        private static GameObject EnsureGround(Transform world)
        {
            var ground = world.Find("Ground");
            if (ground == null)
            {
                ground = new GameObject("Ground", typeof(MeshFilter), typeof(MeshRenderer)).transform;
                ground.SetParent(world, false);
            }
            ground.localPosition = Vector3.zero; ground.localRotation = Quaternion.Euler(90, 0, 0); ground.localScale = new Vector3(80, 80, 1);
            ground.GetComponent<MeshFilter>().sharedMesh = Resources.GetBuiltinResource<Mesh>("Quad.fbx");
            var renderer = ground.GetComponent<MeshRenderer>();
            renderer.sharedMaterial = AssetDatabase.LoadAssetAtPath<Material>(GroundMaterial);
            renderer.shadowCastingMode = UnityEngine.Rendering.ShadowCastingMode.Off; renderer.receiveShadows = false;
            return ground.gameObject;
        }

        private static void EnsureBorder(Transform world, List<RescueWallObstacle> walls)
        {
            var border = world.Find("Arena Border");
            if (border == null) { border = new GameObject("Arena Border").transform; border.SetParent(world, false); }
            var material = AssetDatabase.LoadAssetAtPath<Material>(WallMaterial);
            var specs = new[]
            {
                new { name = "Wall North", p = new Vector3(0, 1, WallCenter), s = new Vector3(31, 2, 1) },
                new { name = "Wall South", p = new Vector3(0, 1, -WallCenter), s = new Vector3(31, 2, 1) },
                new { name = "Wall East", p = new Vector3(WallCenter, 1, 0), s = new Vector3(1, 2, 31) },
                new { name = "Wall West", p = new Vector3(-WallCenter, 1, 0), s = new Vector3(1, 2, 31) },
            };
            foreach (var spec in specs)
            {
                var wall = border.Find(spec.name);
                if (wall == null)
                {
                    wall = new GameObject(spec.name, typeof(MeshFilter), typeof(MeshRenderer), typeof(RescueWallObstacle)).transform;
                    wall.SetParent(border, false);
                }
                wall.localPosition = spec.p; wall.localRotation = Quaternion.identity; wall.localScale = spec.s;
                wall.GetComponent<MeshFilter>().sharedMesh = Resources.GetBuiltinResource<Mesh>("Cube.fbx");
                var r = wall.GetComponent<MeshRenderer>(); r.sharedMaterial = material;
                r.shadowCastingMode = UnityEngine.Rendering.ShadowCastingMode.Off; r.receiveShadows = false;
                SetWall(wall.GetComponent<RescueWallObstacle>(), new Vector2(spec.s.x * .5f, spec.s.z * .5f), 2);
                walls.Add(wall.GetComponent<RescueWallObstacle>());
            }
        }

        private static void ArrangeScenery(Transform scenery, List<RescueWallObstacle> walls)
        {
            var trees = new List<Transform>(); var pillars = new List<Transform>();
            foreach (Transform child in scenery)
            {
                if (child.name.StartsWith("Tree ")) trees.Add(child);
                else if (child.name.StartsWith("Stone pillar ")) pillars.Add(child);
            }
            trees.Sort((a, b) => string.CompareOrdinal(a.name, b.name));
            pillars.Sort((a, b) => string.CompareOrdinal(a.name, b.name));
            for (int i = 0; i < trees.Count; i++)
            {
                bool inner = i < InnerTrees.Length;
                Vector2 spot = inner ? InnerTrees[i] : OuterTrees[(i - InnerTrees.Length) % OuterTrees.Length];
                trees[i].position = new Vector3(spot.x, 0, spot.y);
                var wall = trees[i].GetComponent<RescueWallObstacle>();
                if (inner)
                {
                    if (wall == null) wall = trees[i].gameObject.AddComponent<RescueWallObstacle>();
                    SetWall(wall, new Vector2(.5f, .5f), 4); walls.Add(wall);
                }
                else if (wall != null) Object.DestroyImmediate(wall);
            }
            for (int i = 0; i < pillars.Count; i++)
            {
                Vector2 spot = Pillars[i % Pillars.Length];
                pillars[i].position = new Vector3(spot.x, 0, spot.y);
                var wall = pillars[i].GetComponent<RescueWallObstacle>();
                if (wall == null) wall = pillars[i].gameObject.AddComponent<RescueWallObstacle>();
                SetWall(wall, new Vector2(.5f, .5f), 2.7f); walls.Add(wall);
            }
        }

        private static void SetWall(RescueWallObstacle wall, Vector2 half, float height)
        {
            var so = new SerializedObject(wall);
            so.FindProperty("_halfExtents").vector2Value = half; so.FindProperty("_height").floatValue = height;
            so.ApplyModifiedPropertiesWithoutUndo();
        }

        // ---------- Canvas ----------

        private static RescueHeartFeedback PatchCanvas(GameObject canvas, Camera camera, RescueHudView hud, RescueTutorialView tutorial)
        {
            var canvasRect = (RectTransform)canvas.transform;
            var responsive = canvas.GetComponent<ResponsiveCanvasScaler>();
            if (responsive == null) responsive = canvas.AddComponent<ResponsiveCanvasScaler>();
            var rs = new SerializedObject(responsive);
            rs.FindProperty("_referenceResolution").vector2Value = new Vector2(1080, 1920);
            rs.FindProperty("_portraitMatch").floatValue = 0; rs.FindProperty("_landscapeMatch").floatValue = 1; rs.FindProperty("_squareMatch").floatValue = .5f;
            rs.ApplyModifiedPropertiesWithoutUndo();

            var heart = AssetDatabase.LoadAssetAtPath<Sprite>(HeartSprite);
            var ring = AssetDatabase.LoadAssetAtPath<Sprite>(RingSprite);
            var knob = AssetDatabase.LoadAssetAtPath<Sprite>(KnobSprite);
            var arrow = AssetDatabase.LoadAssetAtPath<Sprite>(ArrowSprite);

            // --- HUD: centered timer, heart bar under it, "Collected!" toast below ---
            var top = (RectTransform)canvas.transform.Find("Top UI");
            var timer = Find<TMP_Text>(top, "Countdown");
            Place(timer.rectTransform, new Vector2(.5f, .9f), new Vector2(.5f, .97f), new Vector2(.5f, .5f), new Vector2(0, 112), new Vector2(300, 0));
            var bar = EnsureRect(top, "Heart bar");
            Place(bar, new Vector2(.5f, .835f), new Vector2(.5f, .895f), new Vector2(.5f, .5f), new Vector2(0, 112), new Vector2(432, 0));
            // The "x/5" counter text was removed at the user's request; the slots alone show progress.
            var counter = FindDeep<TMP_Text>(canvas.transform, "Rescue count");
            if (counter != null) Object.DestroyImmediate(counter.gameObject);
            var slots = new Image[5];
            for (int i = 0; i < slots.Length; i++)
            {
                slots[i] = EnsureImage(bar, "Heart slot " + (i + 1), heart);
                Place(slots[i].rectTransform, new Vector2(0, .5f), new Vector2(0, .5f), new Vector2(0, .5f), new Vector2(i * 88, 0), new Vector2(80, 80));
                slots[i].color = new Color(.12f, .12f, .12f, .55f);
            }
            var toast = FindDeep<TMP_Text>(canvas.transform, "Prompt");
            if (toast == null) toast = FindDeep<TMP_Text>(canvas.transform, "Collected toast");
            toast.name = "Collected toast"; toast.text = "Collected!"; toast.fontSize = 64;
            toast.color = new Color(1, .92f, .35f);
            // Fixed-width, centered box so the landscape scale-up never reaches the screen edges.
            Place(toast.rectTransform, new Vector2(.5f, .755f), new Vector2(.5f, .825f), new Vector2(.5f, .5f), new Vector2(0, 112), new Vector2(760, 0));
            toast.gameObject.SetActive(false);

            var hudSo = new SerializedObject(hud);
            hudSo.FindProperty("_timer").objectReferenceValue = timer;
            SetArray(hudSo, "_slots", slots);
            hudSo.ApplyModifiedPropertiesWithoutUndo();

            // --- Tutorial: ring + hand + DRAG TO MOVE + subline ---
            var group = (RectTransform)canvas.transform.Find("Tutorial");
            Place(group, new Vector2(0, .06f), new Vector2(1, .34f), new Vector2(.5f, .5f), Vector2.zero, Vector2.zero);
            foreach (var arrowName in new[] { "Swipe left", "Swipe right" }) { var a = group.Find(arrowName); if (a != null) Object.DestroyImmediate(a.gameObject); }
            var ringImage = EnsureImage(group, "Drag ring", ring);
            ringImage.color = new Color(1, 1, 1, .9f);
            Place(ringImage.rectTransform, new Vector2(.5f, .64f), new Vector2(.5f, .64f), new Vector2(.5f, .5f), Vector2.zero, new Vector2(230, 230));
            ringImage.transform.SetSiblingIndex(0);
            var knobImage = EnsureImage(group, "Drag knob", knob);
            knobImage.color = new Color(1, 1, 1, .9f);
            Place(knobImage.rectTransform, new Vector2(.5f, .64f), new Vector2(.5f, .64f), new Vector2(.5f, .5f), Vector2.zero, new Vector2(104, 104));
            knobImage.transform.SetSiblingIndex(1);
            var hand = group.Find("Swipe Hand") ?? group.Find("Drag hand");
            hand.name = "Drag hand"; hand.SetAsLastSibling();
            Place((RectTransform)hand, new Vector2(.5f, .64f), new Vector2(.5f, .64f), new Vector2(.3f, .85f), Vector2.zero, new Vector2(170, 170));
            var subline = Find<TMP_Text>(group, "Goal hint");
            subline.text = "Get close to pets to collect hearts!"; subline.fontSize = 34;
            Place(subline.rectTransform, new Vector2(.04f, 0), new Vector2(.96f, .14f), new Vector2(.5f, .5f), Vector2.zero, Vector2.zero);
            var title = EnsureText(group, "Drag title", subline);
            title.text = "DRAG TO MOVE"; title.fontSize = 64; title.enableAutoSizing = false; title.color = Color.white;
            Place(title.rectTransform, new Vector2(.04f, .15f), new Vector2(.96f, .32f), new Vector2(.5f, .5f), Vector2.zero, Vector2.zero);

            // --- Nearest-pet pointer and TNT warning (positioned at runtime from world points) ---
            var pointer = EnsureImage(canvas.transform, "Pet pointer", arrow);
            pointer.color = new Color(1, .86f, .15f);
            Place(pointer.rectTransform, new Vector2(.5f, .5f), new Vector2(.5f, .5f), new Vector2(.5f, 0), Vector2.zero, new Vector2(110, 128));
            pointer.gameObject.SetActive(false);
            var warning = EnsureRect(canvas.transform, "Tnt warning");
            Place(warning, new Vector2(.5f, .5f), new Vector2(.5f, .5f), new Vector2(.5f, 0), Vector2.zero, new Vector2(420, 190));
            var bang = EnsureText(warning, "Bang", subline);
            bang.text = "!"; bang.fontSize = 110; bang.color = new Color(1, .22f, .18f);
            Place(bang.rectTransform, new Vector2(0, .42f), new Vector2(1, 1), new Vector2(.5f, .5f), Vector2.zero, Vector2.zero);
            var avoid = EnsureText(warning, "Avoid label", subline);
            avoid.text = "JUMP OVER TNT!"; avoid.fontSize = 46; avoid.color = new Color(1, .3f, .25f);
            Place(avoid.rectTransform, new Vector2(0, 0), new Vector2(1, .42f), new Vector2(.5f, .5f), Vector2.zero, Vector2.zero);
            warning.gameObject.SetActive(false);

            var tutorialSo = new SerializedObject(tutorial);
            tutorialSo.FindProperty("_group").objectReferenceValue = group;
            tutorialSo.FindProperty("_ring").objectReferenceValue = ringImage.rectTransform;
            tutorialSo.FindProperty("_knob").objectReferenceValue = knobImage.rectTransform;
            tutorialSo.FindProperty("_hand").objectReferenceValue = hand;
            tutorialSo.FindProperty("_title").objectReferenceValue = title;
            tutorialSo.FindProperty("_petPointer").objectReferenceValue = pointer.rectTransform;
            tutorialSo.FindProperty("_tntWarning").objectReferenceValue = warning;
            tutorialSo.FindProperty("_canvasRect").objectReferenceValue = canvasRect;
            tutorialSo.FindProperty("_camera").objectReferenceValue = camera;
            tutorialSo.ApplyModifiedPropertiesWithoutUndo();

            // --- Heart feedback pool ---
            var feedbackRect = EnsureRect(canvas.transform, "Heart feedback");
            Place(feedbackRect, Vector2.zero, Vector2.one, new Vector2(.5f, .5f), Vector2.zero, Vector2.zero);
            var feedback = feedbackRect.GetComponent<RescueHeartFeedback>();
            if (feedback == null) feedback = feedbackRect.gameObject.AddComponent<RescueHeartFeedback>();
            var flyers = new Image[5]; var burst = new Image[6];
            for (int i = 0; i < flyers.Length; i++)
            {
                flyers[i] = EnsureImage(feedbackRect, "Flyer " + (i + 1), heart);
                Place(flyers[i].rectTransform, new Vector2(.5f, .5f), new Vector2(.5f, .5f), new Vector2(.5f, .5f), Vector2.zero, new Vector2(80, 80));
                flyers[i].gameObject.SetActive(false);
            }
            for (int i = 0; i < burst.Length; i++)
            {
                burst[i] = EnsureImage(feedbackRect, "Burst " + (i + 1), heart);
                Place(burst[i].rectTransform, new Vector2(.5f, .5f), new Vector2(.5f, .5f), new Vector2(.5f, .5f), Vector2.zero, new Vector2(64, 64));
                burst[i].gameObject.SetActive(false);
            }
            var fs = new SerializedObject(feedback);
            fs.FindProperty("_hud").objectReferenceValue = hud;
            fs.FindProperty("_camera").objectReferenceValue = camera;
            fs.FindProperty("_canvasRect").objectReferenceValue = canvasRect;
            fs.FindProperty("_toast").objectReferenceValue = toast;
            SetArray(fs, "_flyers", flyers); SetArray(fs, "_burst", burst);
            fs.ApplyModifiedPropertiesWithoutUndo();

            // Overlay order: feedback, pointer, warning, then the endcard on top (controls are added by EnsureControls).
            var endcard = canvas.transform.Find("Endcard");
            feedbackRect.SetSiblingIndex(endcard.GetSiblingIndex());
            pointer.transform.SetSiblingIndex(endcard.GetSiblingIndex());
            warning.SetSiblingIndex(endcard.GetSiblingIndex());
            endcard.SetAsLastSibling();
            var endcardSo = new SerializedObject(endcard.GetComponent<RescueEndcardView>());
            ((TMP_Text)endcardSo.FindProperty("_title").objectReferenceValue).text = RescueEndcardView.TimeUpTitle;
            ((TMP_Text)endcardSo.FindProperty("_message").objectReferenceValue).text = RescueEndcardView.TimeUpMessage;
            return feedback;
        }

        /// Bottom controls (fixed joystick left, Jump right, camera-swipe hint center) + tutorial targets/layout.
        /// Public so a live scene can get just this part without re-running the whole patch.
        public static RescueControlsView EnsureControls(GameObject canvas, RescueTutorialView tutorial)
        {
            var canvasRect = (RectTransform)canvas.transform;
            var old = canvas.transform.Find("Live joystick");
            if (old != null) Object.DestroyImmediate(old.gameObject);
            var root = EnsureRect(canvas.transform, "Controls");
            Place(root, Vector2.zero, Vector2.one, new Vector2(.5f, .5f), Vector2.zero, Vector2.zero);
            var stickBase = EnsureImage(root, "Stick base", AssetDatabase.LoadAssetAtPath<Sprite>(RingSprite));
            stickBase.color = new Color(1, 1, 1, .85f);
            Place(stickBase.rectTransform, Vector2.zero, Vector2.zero, new Vector2(.5f, .5f), new Vector2(215, 330), new Vector2(280, 280));
            var stickKnob = EnsureImage(root, "Stick knob", AssetDatabase.LoadAssetAtPath<Sprite>(KnobSprite));
            stickKnob.color = new Color(1, 1, 1, .9f);
            Place(stickKnob.rectTransform, Vector2.zero, Vector2.zero, new Vector2(.5f, .5f), new Vector2(215, 330), new Vector2(126, 126));
            var jump = EnsureImage(root, "Jump button", AssetDatabase.LoadAssetAtPath<Sprite>(JumpSprite));
            jump.color = Color.white;
            Place(jump.rectTransform, Vector2.right, Vector2.right, new Vector2(.5f, .5f), new Vector2(-190, 300), new Vector2(210, 210));
            // The camera-swipe hint (infinity) and its tutorial step were removed at the user's request.
            var hint = root.Find("Camera hint");
            if (hint != null) Object.DestroyImmediate(hint.gameObject);

            var controls = canvas.GetComponent<RescueControlsView>();
            if (controls == null) controls = canvas.AddComponent<RescueControlsView>();
            var cs = new SerializedObject(controls);
            cs.FindProperty("_root").objectReferenceValue = root;
            cs.FindProperty("_stickBase").objectReferenceValue = stickBase.rectTransform;
            cs.FindProperty("_stickKnob").objectReferenceValue = stickKnob.rectTransform;
            cs.FindProperty("_jumpButton").objectReferenceValue = jump.rectTransform;
            cs.FindProperty("_canvasRect").objectReferenceValue = canvasRect;
            cs.ApplyModifiedPropertiesWithoutUndo();

            // Tutorial: "SWIPE TO MOVE" right above the fixed joystick; RescueTutorialView keeps it there at runtime.
            var group = (RectTransform)canvas.transform.Find("Tutorial");
            Place(group, Vector2.zero, Vector2.zero, new Vector2(.5f, 0),
                new Vector2(Mathf.Max(215, RescueTutorialView.TextWidth * .5f + RescueTutorialView.EdgeMargin), 330 + 140 + RescueTutorialView.TextGap),
                new Vector2(RescueTutorialView.TextWidth, RescueTutorialView.TextHeight));
            var titleText = group.Find("Drag title").GetComponent<TMP_Text>();
            titleText.text = RescueTutorialView.DragText; titleText.enableAutoSizing = true; titleText.fontSizeMin = 30; titleText.fontSizeMax = 56;
            Place(titleText.rectTransform, Vector2.zero, Vector2.one, new Vector2(.5f, .5f), Vector2.zero, Vector2.zero);
            var goal = group.Find("Goal hint");   // kept only as a TMP style template; no longer shown
            if (goal != null) goal.gameObject.SetActive(false);
            foreach (var name in new[] { "Drag ring", "Drag knob", "Drag hand" }) { var t = group.Find(name); if (t != null) t.gameObject.SetActive(true); }
            // TAP TO JUMP step: a hand tapping the Jump button and the label right above it (RescueTutorialView lays them out).
            var jumpHint = EnsureRect(canvas.transform, "Jump hint");
            Place(jumpHint, Vector2.zero, Vector2.one, new Vector2(.5f, .5f), Vector2.zero, Vector2.zero);
            var jumpLabel = EnsureText(jumpHint, "Jump label", titleText);
            jumpLabel.text = RescueTutorialView.JumpText; jumpLabel.enableAutoSizing = true; jumpLabel.fontSizeMin = 30; jumpLabel.fontSizeMax = 52;
            jumpLabel.color = Color.white;
            Place(jumpLabel.rectTransform, Vector2.right, Vector2.right, new Vector2(.5f, 0), new Vector2(-216, 411), new Vector2(RescueTutorialView.JumpLabelWidth, RescueTutorialView.TextHeight));
            var jumpHand = EnsureImage(jumpHint, "Jump hand", AssetDatabase.LoadAssetAtPath<Sprite>("Assets/Game/Textures/UI/Common/icon_hand.png"));
            Place(jumpHand.rectTransform, Vector2.right, Vector2.right, new Vector2(.3f, .85f), new Vector2(-190, 300), new Vector2(170, 170));
            jumpHint.gameObject.SetActive(false);
            var ts = new SerializedObject(tutorial);
            ts.FindProperty("_stickTarget").objectReferenceValue = stickBase.rectTransform;
            ts.FindProperty("_jumpTarget").objectReferenceValue = jump.rectTransform;
            ts.FindProperty("_jumpHint").objectReferenceValue = jumpHint;
            ts.FindProperty("_jumpHand").objectReferenceValue = jumpHand.rectTransform;
            ts.FindProperty("_jumpLabel").objectReferenceValue = jumpLabel;
            ts.ApplyModifiedPropertiesWithoutUndo();
            // The jump hint draws above the controls but under the overlays/endcard.
            jumpHint.SetSiblingIndex(canvas.transform.Find("Tutorial").GetSiblingIndex() + 1);
            var avoid = canvas.transform.Find("Tnt warning/Avoid label");
            if (avoid != null) avoid.GetComponent<TMP_Text>().text = "JUMP OVER TNT!";

            // Controls sit under the tutorial, the overlays (pointer/warning/feedback) and the endcard.
            root.SetSiblingIndex(canvas.transform.Find("Tutorial").GetSiblingIndex());   // tutorial hand draws over the controls
            canvas.transform.Find("Endcard").SetAsLastSibling();
            return controls;
        }

        // ---------- Assets ----------

        public static void EnsureAssets()
        {
            Directory.CreateDirectory(Root + "Textures/UI");
            WriteSprite(HeartSprite, HeartPixels(), FilterMode.Point);
            LimitSprite(RingSprite, 256); LimitSprite(KnobSprite, 128);
            WriteSprite(ArrowSprite, ArrowPixels(64), FilterMode.Bilinear);
            EnsureTiledMaterial(GroundMaterial, Root + "Materials/Grass.mat", new Vector2(80, 80));
            EnsureTiledMaterial(WallMaterial, Root + "Materials/StoneBricks.mat", new Vector2(31, 2));
        }

        /// Shared joystick sprites: cap the import size to what the tutorial displays (Luna budget).
        private static void LimitSprite(string path, int maxSize)
        {
            var importer = (TextureImporter)AssetImporter.GetAtPath(path);
            if (importer == null) throw new System.InvalidOperationException("Missing sprite: " + path);
            if (importer.maxTextureSize == maxSize && !importer.mipmapEnabled) return;
            importer.maxTextureSize = maxSize; importer.mipmapEnabled = false;
            importer.SaveAndReimport();
        }

        private static void EnsureTiledMaterial(string path, string source, Vector2 tiling)
        {
            var material = AssetDatabase.LoadAssetAtPath<Material>(path);
            if (material == null)
            {
                material = new Material(AssetDatabase.LoadAssetAtPath<Material>(source));
                AssetDatabase.CreateAsset(material, path);
            }
            material.mainTextureScale = tiling;
            EditorUtility.SetDirty(material);
        }

        private static void WriteSprite(string path, Texture2D texture, FilterMode filter)
        {
            if (!File.Exists(path))
            {
                File.WriteAllBytes(path, texture.EncodeToPNG());
                AssetDatabase.ImportAsset(path, ImportAssetOptions.ForceSynchronousImport);
            }
            Object.DestroyImmediate(texture);
            var importer = (TextureImporter)AssetImporter.GetAtPath(path);
            bool changed = importer.textureType != TextureImporterType.Sprite || importer.filterMode != filter || importer.mipmapEnabled ||
                           importer.textureCompression != TextureImporterCompression.Uncompressed || importer.maxTextureSize != 128;
            if (!changed) return;
            importer.textureType = TextureImporterType.Sprite; importer.spriteImportMode = SpriteImportMode.Single;
            importer.filterMode = filter; importer.mipmapEnabled = false; importer.alphaIsTransparency = true;
            importer.textureCompression = TextureImporterCompression.Uncompressed; importer.maxTextureSize = 128;
            importer.SaveAndReimport();
        }

        public static Texture2D HeartPixels()
        {
            string[] rows =
            {
                "..KKK...KKK..",
                ".KRRRK.KRRRK.",
                "KRWWRRKRRRRDK",
                "KRWRRRRRRRRDK",
                "KRRRRRRRRRRDK",
                ".KRRRRRRRRDK.",
                "..KRRRRRRDK..",
                "...KRRRRDK...",
                "....KRRDK....",
                ".....KDK.....",
                "......K......",
            };
            var texture = new Texture2D(16, 16, TextureFormat.RGBA32, false);
            var clear = new Color32(0, 0, 0, 0);
            var pixels = new Color32[256];
            for (int i = 0; i < pixels.Length; i++) pixels[i] = clear;
            for (int y = 0; y < rows.Length; y++)
                for (int x = 0; x < rows[y].Length; x++)
                {
                    Color32 c;
                    switch (rows[y][x])
                    {
                        case 'K': c = new Color32(40, 8, 8, 255); break;
                        case 'R': c = new Color32(226, 32, 40, 255); break;
                        case 'D': c = new Color32(150, 14, 22, 255); break;
                        case 'W': c = new Color32(255, 200, 200, 255); break;
                        default: continue;
                    }
                    pixels[(15 - (y + 2)) * 16 + x + 1] = c;   // PNG rows are bottom-up
                }
            texture.SetPixels32(pixels); texture.Apply();
            return texture;
        }

        private static Texture2D ArrowPixels(int size)
        {
            // Down-pointing arrow (tip at the bottom center), white fill with a dark outline for tinting.
            var texture = new Texture2D(size, size, TextureFormat.RGBA32, false);
            var pixels = new Color32[size * size];
            for (int y = 0; y < size; y++)
                for (int x = 0; x < size; x++)
                {
                    float u = (x + .5f) / size, v = (y + .5f) / size;   // v = 0 bottom
                    float half = v * .5f;                                 // triangle widens upward
                    float inside = half - Mathf.Abs(u - .5f);
                    bool body = v > .02f && v < .98f && inside > 0;
                    if (!body) { pixels[y * size + x] = new Color32(0, 0, 0, 0); continue; }
                    bool outline = inside < .07f || v > .9f;
                    pixels[y * size + x] = outline ? new Color32(30, 20, 10, 255) : new Color32(255, 255, 255, 255);
                }
            texture.SetPixels32(pixels); texture.Apply();
            return texture;
        }

        // ---------- helpers ----------

        private static void RemoveMissing(GameObject root)
        {
            foreach (var t in root.GetComponentsInChildren<Transform>(true)) GameObjectUtility.RemoveMonoBehavioursWithMissingScript(t.gameObject);
        }

        private static bool StartsWithAny(string value, params string[] prefixes)
        {
            foreach (var p in prefixes) if (value.StartsWith(p)) return true;
            return false;
        }

        private static T Find<T>(Transform parent, string name) where T : Component
        {
            var child = parent.Find(name);
            if (child == null) throw new System.InvalidOperationException("Missing UI object: " + name);
            return child.GetComponent<T>();
        }

        private static T FindDeep<T>(Transform root, string name) where T : Component
        {
            foreach (var t in root.GetComponentsInChildren<Transform>(true)) if (t.name == name) return t.GetComponent<T>();
            return null;
        }

        private static RectTransform EnsureRect(Transform parent, string name)
        {
            var t = parent.Find(name);
            if (t == null) { t = new GameObject(name, typeof(RectTransform)).transform; t.SetParent(parent, false); }
            return (RectTransform)t;
        }

        private static Image EnsureImage(Transform parent, string name, Sprite sprite)
        {
            var rect = EnsureRect(parent, name);
            var image = rect.GetComponent<Image>();
            if (image == null) image = rect.gameObject.AddComponent<Image>();
            image.sprite = sprite; image.preserveAspect = true; image.raycastTarget = false;
            return image;
        }

        private static TMP_Text EnsureText(Transform parent, string name, TMP_Text template)
        {
            var t = parent.Find(name);
            if (t == null) { t = Object.Instantiate(template.gameObject, parent, false).transform; t.name = name; }
            var text = t.GetComponent<TMP_Text>(); text.raycastTarget = false; text.alignment = TextAlignmentOptions.Center;
            return text;
        }

        private static void Place(RectTransform rect, Vector2 min, Vector2 max, Vector2 pivot, Vector2 position, Vector2 size)
        {
            rect.anchorMin = min; rect.anchorMax = max; rect.pivot = pivot; rect.anchoredPosition = position; rect.sizeDelta = size;
            rect.localScale = Vector3.one; rect.localRotation = Quaternion.identity;
        }

        private static void SetArray(SerializedObject so, string name, Object[] values)
        {
            var property = so.FindProperty(name);
            property.arraySize = values.Length;
            for (int i = 0; i < values.Length; i++) property.GetArrayElementAtIndex(i).objectReferenceValue = values[i];
        }
    }
}
