using System;
using System.Collections.Generic;
using System.Linq;
using TMPro;
using UnityEditor;
using UnityEditor.SceneManagement;
using UnityEngine;
using UnityEngine.EventSystems;
using UnityEngine.Rendering;
using UnityEngine.UI;
using Object = UnityEngine.Object;

namespace Playable.Editor
{
    // Editor-only authoring: all models, references and target placements are saved in Gameplay.
    public static class HiddenHuntSceneSetup
    {
        private const string Art = "Assets/_Playable_/HiddenHunt";
        private const string Models = "Assets/Game/Models/Player/BaseCharacter/";
        private static TMP_FontAsset Font => AssetDatabase.LoadAssetAtPath<TMP_FontAsset>("Assets/TextMesh Pro/Fonts/FFFFORWA SDF.asset");

        [MenuItem("Tools/Playable/Build Hidden Hunt in Gameplay")]
        public static void Build()
        {
            var scene = EditorSceneManager.GetActiveScene();
            if (scene.path != "Assets/_Playable_/Scenes/Gameplay.unity" || Application.isPlaying)
                throw new InvalidOperationException("Open Gameplay in Edit mode first.");
            if (GameObject.Find("HiddenHunt")) throw new InvalidOperationException("HiddenHunt already exists. Edit the authored scene instead of rebuilding it.");
            if (!AssetDatabase.IsValidFolder(Art)) AssetDatabase.CreateFolder("Assets/_Playable_", "HiddenHunt");
            var root = new GameObject("HiddenHunt");
            Undo.RegisterCreatedObjectUndo(root, "Build hidden hunt");
            var manager = GameObject.Find("GameManager").GetComponent<GameManager>();
            var playerObject = Child("FPS Player", root.transform);
            playerObject.layer = 2;
            playerObject.transform.position = new Vector3(-6, 7.02f, 1);
            var body = playerObject.AddComponent<CharacterController>();
            body.height = 1.7f; body.radius = 0.25f; body.center = new Vector3(0, 0.87f, 0);
            body.stepOffset = 0.15f; body.skinWidth = 0.025f; body.minMoveDistance = 0;
            var player = playerObject.AddComponent<HuntPlayer>();
            var pitch = Child("View Pitch", playerObject.transform).transform;
            pitch.localPosition = new Vector3(0, 1.65f, 0);
            var camera = GameObject.Find("Camera").GetComponent<Camera>();
            Undo.RecordObject(camera.transform, "Set FPS camera");
            camera.transform.SetParent(pitch, false);
            camera.transform.localPosition = Vector3.zero; camera.transform.localRotation = Quaternion.identity;
            camera.tag = "MainCamera"; camera.fieldOfView = 65; camera.nearClipPlane = 0.04f; camera.farClipPlane = 100;
            camera.cullingMask &= ~(1 << 30);
            var weapon = BuildWeapon(camera.transform);
            var view = Child("Weapon Camera", camera.transform).AddComponent<Camera>();
            view.CopyFrom(camera); view.cullingMask = 1 << 30; view.clearFlags = CameraClearFlags.Depth;
            view.depth = camera.depth + 1; view.nearClipPlane = 0.01f; view.farClipPlane = 4;
            view.fieldOfView = 65; view.enabled = true;
            Set(weapon, "_viewCamera", view);
            Set(player, "_body", body); Set(player, "_pitchPivot", pitch); Set(player, "_camera", camera);
            BakeEnvironment(root.transform, player);
            var targets = BuildTargets(root.transform, playerObject.transform.position);
            var hud = BuildUI(root.transform, player, manager, out var fire, out var joystick);
            Set(player, "_joystick", joystick);
            var game = root.AddComponent<HiddenHuntGame>();
            Set(game, "_manager", manager); Set(game, "_player", player); Set(game, "_weapon", weapon);
            Set(game, "_hud", hud); Set(game, "_fireButton", fire); SetArray(game, "_targets", targets);
            var mask = new SerializedObject(game); mask.FindProperty("_shotMask").intValue = ~(1 << 2 | 1 << 30); mask.ApplyModifiedPropertiesWithoutUndo();
            Set(manager, "_countdownText", null);
            player.AimAt(targets[0].AimPoint, 0);
            hud.RefreshLayout();
            AssetDatabase.SaveAssets(); EditorSceneManager.MarkSceneDirty(scene); EditorSceneManager.SaveScene(scene);
            Selection.activeGameObject = root;
            Debug.Log("Hidden Hunt authored: five targets, FPS, tutorials, responsive UI; CTA threshold remains GameManager.TotalEvent.");
        }

        private static HuntWeapon BuildWeapon(Transform camera)
        {
            var mount = Child("Weapon View", camera);
            mount.transform.localPosition = new Vector3(0.16f, -0.18f, 0.38f);
            var weapon = mount.AddComponent<HuntWeapon>();
            var shotSource = mount.AddComponent<AudioSource>();
            shotSource.playOnAwake = false;
            shotSource.loop = false;
            shotSource.spatialBlend = 0f;
            Set(weapon, "_shotSource", shotSource);
            Set(weapon, "_shotSound", AssetDatabase.LoadAssetAtPath<AudioClip>("Assets/_Playable_/Sound/787784_ronconi56_heavy-fire-escape-door (mp3cut.net) (1).wav"));
            var recoil = Child("Recoil", mount.transform).transform;
            Set(weapon, "_recoilPivot", recoil);
            var gun = (GameObject)PrefabUtility.InstantiatePrefab(AssetDatabase.LoadAssetAtPath<GameObject>(Models + "S6_gun.fbx"));
            gun.name = "S6 Gun"; gun.transform.SetParent(recoil, false);
            gun.transform.localPosition = new Vector3(0, -.13f, .15f);
            gun.transform.localRotation = Quaternion.Euler(180, 0, 0);
            gun.transform.localScale = Vector3.one * 0.55f;

            // Keep the original left-arm skin and bones; only this renderer is visible.
            var character = Object.Instantiate(AssetDatabase.LoadAssetAtPath<GameObject>(Models + "S_Base_03.fbx"));
            character.name = "Left Arm Rig";
            character.transform.SetParent(recoil, false);
            character.transform.localScale = Vector3.one * 0.6f;
            foreach (var animator in character.GetComponentsInChildren<Animator>()) animator.enabled = false;
            var transforms = character.GetComponentsInChildren<Transform>();
            var upper = transforms.First(t => t.name == "upper_arm.L");
            var fore = transforms.First(t => t.name == "forearm.L");
            var hand = transforms.First(t => t.name == "HandL");
            var shoulder = recoil.TransformPoint(new Vector3(-0.15f, -0.25f, 0.2f));
            character.transform.position += shoulder - upper.position;
            var elbow = recoil.TransformPoint(new Vector3(-0.12f, -0.2f, 0.38f));
            upper.rotation = Quaternion.FromToRotation(fore.position - upper.position, elbow - upper.position) * upper.rotation;
            var grip = recoil.TransformPoint(new Vector3(0, -0.12f, 0.48f));
            fore.rotation = Quaternion.FromToRotation(hand.position - fore.position, grip - fore.position) * fore.rotation;
            foreach (var r in character.GetComponentsInChildren<Renderer>()) r.enabled = r.name == "Base_03_shirtL";
            foreach (var t in mount.GetComponentsInChildren<Transform>()) t.gameObject.layer = 30;
            foreach (var r in mount.GetComponentsInChildren<Renderer>())
            { r.shadowCastingMode = ShadowCastingMode.Off; r.receiveShadows = false; }
            return weapon;
        }

        private static HiddenHuntTarget[] BuildTargets(Transform parent, Vector3 playerPosition)
        {
            var group = Child("Hidden Targets - Hand Placed", parent).transform;
            var source = Object.Instantiate(AssetDatabase.LoadAssetAtPath<GameObject>("Assets/_Playable_/3D Model/Map/MinecraftPlayer/PlayerSkinny.fbx"));
            foreach (var animator in source.GetComponentsInChildren<Animator>()) animator.enabled = false;
            var meshes = new List<Mesh>(); var combine = new List<CombineInstance>();
            foreach (var r in source.GetComponentsInChildren<SkinnedMeshRenderer>())
            {
                if (r.name.EndsWith("Out")) continue;
                var m = new Mesh(); r.BakeMesh(m); meshes.Add(m);
                combine.Add(new CombineInstance { mesh = m, transform = HiddenPose(r) });
            }
            var mesh = new Mesh { name = "PlayerSkinny_Hidden" };
            mesh.CombineMeshes(combine.ToArray(), true, true);
            var b = mesh.bounds; var vertices = mesh.vertices;
            var rotation = Quaternion.Euler(0, -90, 0);
            for (int i = 0; i < vertices.Length; i++) vertices[i] = rotation * ((vertices[i] - new Vector3(b.center.x, b.min.y, b.center.z)) / b.size.y);
            mesh.vertices = vertices; mesh.RecalculateNormals(); mesh.RecalculateBounds();
            AssetDatabase.CreateAsset(mesh, Art + "/HiddenMesh.asset");
            foreach (var m in meshes) Object.DestroyImmediate(m);
            Object.DestroyImmediate(source);
            var material = new Material(Shader.Find("Unlit/Color")) { name = "Hidden Bright Red", color = new Color(1, 0.025f, 0.015f) };
            AssetDatabase.CreateAsset(material, Art + "/HiddenRed.mat");
            var particleMaterial = new Material(Shader.Find("Legacy Shaders/Particles/Alpha Blended")) { name = "Square Fireworks" };
            AssetDatabase.CreateAsset(particleMaterial, Art + "/SquareFireworks.mat");
            var points = new[] { new Vector3(-5, 7, 5.2f), new Vector3(3, 7, 5), new Vector3(-12, 7, -5), new Vector3(6, 7, 14), new Vector3(-7, 7, -9) };
            var heights = new[] { 1.65f, 1.2f, 2.05f, 0.9f, 1.45f };
            var targets = new HiddenHuntTarget[5];
            for (int i = 0; i < targets.Length; i++)
            {
                var go = Child("Hidden 0" + (i + 1), group);
                go.transform.position = points[i];
                go.transform.rotation = Quaternion.LookRotation(new Vector3(playerPosition.x - points[i].x, 0, playerPosition.z - points[i].z));
                var visual = Child("MinecraftPlayer", go.transform);
                visual.transform.localScale = Vector3.one * heights[i];
                visual.AddComponent<MeshFilter>().sharedMesh = mesh;
                var renderer = visual.AddComponent<MeshRenderer>(); renderer.sharedMaterial = material;
                var collider = go.AddComponent<BoxCollider>();
                collider.center = mesh.bounds.center * heights[i]; collider.size = mesh.bounds.size * heights[i];
                var target = go.AddComponent<HiddenHuntTarget>();
                targets[i] = target;
                Set(target, "_visual", renderer); Set(target, "_hitCollider", collider);
                Vector(target, "_aimOffset", new Vector3(0, heights[i] * 0.62f, 0));
                Float(target, "_blinkPhase", i * 0.17f);
                var fx = Child("Square Fireworks", go.transform);
                fx.transform.localPosition = new Vector3(0, heights[i] * 0.55f, 0);
                var particles = fx.AddComponent<ParticleSystem>(); particles.Stop(true, ParticleSystemStopBehavior.StopEmittingAndClear);
                var main = particles.main; main.loop = false; main.playOnAwake = false; main.duration = 1.1f;
                main.startLifetime = new ParticleSystem.MinMaxCurve(0.45f, 0.9f); main.startSpeed = new ParticleSystem.MinMaxCurve(1.5f, 4f);
                main.startSize = new ParticleSystem.MinMaxCurve(0.045f, 0.11f); main.gravityModifier = 0.6f;
                main.maxParticles = 70; main.simulationSpace = ParticleSystemSimulationSpace.World;
                var gradient = new Gradient(); gradient.SetKeys(new[] {
                    new GradientColorKey(Color.yellow, 0), new GradientColorKey(Color.cyan, .2f), new GradientColorKey(Color.magenta, .4f),
                    new GradientColorKey(Color.green, .6f), new GradientColorKey(new Color(1,.35f,0), .8f), new GradientColorKey(Color.white, 1)
                }, new[] { new GradientAlphaKey(1, 0), new GradientAlphaKey(1, 1) });
                main.startColor = new ParticleSystem.MinMaxGradient(gradient) { mode = ParticleSystemGradientMode.RandomColor };
                var emission = particles.emission; emission.rateOverTime = 0; emission.SetBursts(new[] { new ParticleSystem.Burst(0, 55) });
                var shape = particles.shape; shape.shapeType = ParticleSystemShapeType.Sphere; shape.radius = 0.16f;
                var size = particles.sizeOverLifetime; size.enabled = true; size.size = new ParticleSystem.MinMaxCurve(1, AnimationCurve.Linear(0, 1, 1, 0.15f));
                particles.GetComponent<ParticleSystemRenderer>().sharedMaterial = particleMaterial;
                Set(target, "_burst", particles);
            }
            return targets;
        }

        internal static Matrix4x4 HiddenPose(SkinnedMeshRenderer renderer)
        {
            Matrix4x4 matrix = Matrix4x4.TRS(renderer.transform.position, renderer.transform.rotation, Vector3.one);
            float angle = renderer.name == "LArm" ? 22 : renderer.name == "RArm" ? -22 : renderer.name == "LLeg" ? 5 : renderer.name == "RLeg" ? -5 : 0;
            if (angle == 0) return matrix;
            Vector3 pivot = renderer.transform.position + Vector3.up * 1.1f;
            return Matrix4x4.Translate(pivot) * Matrix4x4.Rotate(Quaternion.Euler(angle, 0, 0)) * Matrix4x4.Translate(-pivot) * matrix;
        }

        private static void BakeEnvironment(Transform root, HuntPlayer player)
        {
            var collision = Child("Map Collision", root).transform;
            var forest = GameObject.Find("Forest");
            var filters = forest.GetComponentsInChildren<MeshFilter>();
            var grass = filters.First(m => m.name == "Grass_Block");
            var probe = Child("Terrain Probe", null);
            probe.transform.SetPositionAndRotation(grass.transform.position, grass.transform.rotation);
            probe.transform.localScale = grass.transform.lossyScale;
            var mc = probe.AddComponent<MeshCollider>(); mc.sharedMesh = grass.sharedMesh;
            var data = new bool[84 * 92];
            for (int z = 0; z < 92; z++) for (int x = 0; x < 84; x++)
            {
                RaycastHit hit;
                data[z * 84 + x] = mc.Raycast(new Ray(new Vector3(-21 + (x + .5f) * .5f, 30, -23 + (z + .5f) * .5f), Vector3.down), out hit, 40) && hit.point.y > 6.9f;
            }
            Object.DestroyImmediate(probe);
            var so = new SerializedObject(player); var array = so.FindProperty("_dryLand"); array.arraySize = data.Length;
            for (int i = 0; i < data.Length; i++) array.GetArrayElementAtIndex(i).boolValue = data[i];
            so.ApplyModifiedPropertiesWithoutUndo();
            // One box per occupied half-block column; no runtime mesh collision or terrain queries.
            foreach (var mf in filters.Where(m => m.name == "Oak_Log" || m.name == "Birch_Log"))
            {
                var cells = new Dictionary<Vector2Int, float>(); var vs = mf.sharedMesh.vertices; var ts = mf.sharedMesh.triangles;
                for (int i = 0; i < ts.Length; i += 3)
                {
                    Vector3 a = mf.transform.TransformPoint(vs[ts[i]]), b = mf.transform.TransformPoint(vs[ts[i + 1]]), c = mf.transform.TransformPoint(vs[ts[i + 2]]);
                    if (Mathf.Abs(a.y - b.y) > .001f || Mathf.Abs(a.y - c.y) > .001f || a.y < 7.1f) continue;
                    var mid = (a + b + c) / 3; var key = new Vector2Int(Mathf.FloorToInt(mid.x * 2), Mathf.FloorToInt(mid.z * 2));
                    if (!cells.ContainsKey(key) || cells[key] < mid.y) cells[key] = mid.y;
                }
                foreach (var cell in cells)
                {
                    var go = Child(mf.name + " Collider", collision);
                    go.transform.position = new Vector3(cell.Key.x * .5f + .25f, (7 + cell.Value) / 2, cell.Key.y * .5f + .25f);
                    go.AddComponent<BoxCollider>().size = new Vector3(.5f, cell.Value - 7, .5f);
                }
            }
            foreach (Transform house in GameObject.Find("HiddenVillage").transform)
            {
                if (!house.name.StartsWith("VillageHouse")) continue;
                var rs = house.GetComponentsInChildren<Renderer>(); var bounds = rs[0].bounds;
                foreach (var r in rs) bounds.Encapsulate(r.bounds);
                foreach (var c in house.GetComponentsInChildren<MeshCollider>()) Undo.DestroyObjectImmediate(c);
                var obstacle = Child(house.name + " Collider", collision);
                obstacle.transform.position = bounds.center;
                obstacle.AddComponent<BoxCollider>().size = bounds.size;
            }
        }

        private static HuntHUD BuildUI(Transform parent, HuntPlayer player, GameManager manager, out Button fireButton, out Joystick joystick)
        {
            var canvasGO = new GameObject("Hunt Canvas", typeof(RectTransform), typeof(Canvas), typeof(CanvasScaler), typeof(GraphicRaycaster));
            canvasGO.transform.SetParent(parent, false);
            canvasGO.GetComponent<Canvas>().renderMode = RenderMode.ScreenSpaceOverlay;
            var scaler = canvasGO.GetComponent<CanvasScaler>(); scaler.uiScaleMode = CanvasScaler.ScaleMode.ScaleWithScreenSize;
            scaler.referenceResolution = new Vector2(1920, 1080); scaler.matchWidthOrHeight = 1;
            var hud = canvasGO.AddComponent<HuntHUD>();
            var look = Rect("Full Screen Look", canvasGO.transform, Vector2.zero, Vector2.zero, Vector2.zero);
            Stretch(look); var lookImage = look.gameObject.AddComponent<Image>(); lookImage.color = Color.clear;
            var lookInput = look.gameObject.AddComponent<HuntLookInput>(); Set(lookInput, "_player", player);
            var safe = Rect("Safe Area", canvasGO.transform, Vector2.zero, Vector2.zero, Vector2.zero); Stretch(safe);
            var banner = Picture("Tutorial Banner", safe, "Assets/Texture/buttonRect.png", new Color(1, .96f, .8f), new Vector2(.5f, 1), new Vector2(0, -140), new Vector2(700, 108));
            var red = Picture("Red Tab", banner, "Assets/Texture/buttonRect.png", new Color(.95f, .28f, .17f), new Vector2(0, .5f), new Vector2(26, 0), new Vector2(52, 108));
            banner.GetComponent<Image>().enabled = false;
            red.gameObject.SetActive(false);
            var instruction = Text("Instruction", banner, "Tap to Shoot!", 42, new Vector2(.5f, .5f), new Vector2(18, 0), new Vector2(620, 86));
            var counter = Picture("Kill Counter", safe, "Assets/Texture/buttonRect.png", new Color(0, .42f, 1), new Vector2(1, 1), new Vector2(-60, -180), new Vector2(220, 135));
            counter.pivot = new Vector2(1, 1);
            Picture("White Inset", counter, "Assets/Texture/buttonRect.png", new Color(.97f, .98f, 1), new Vector2(.5f, .5f), Vector2.zero, new Vector2(180, 94));
            var count = Text("Count", counter, "0/5", 42, new Vector2(.5f, .5f), Vector2.zero, new Vector2(170, 88));
            count.color = Color.black;
            var cross = Picture("Crosshair", canvasGO.transform, "Assets/Game/Textures/UI/Ingame/crosshair.png", Color.white, new Vector2(.5f, .5f), Vector2.zero, new Vector2(54, 54));
            var joyGO = (GameObject)PrefabUtility.InstantiatePrefab(AssetDatabase.LoadAssetAtPath<GameObject>("Assets/Joystick Pack/Prefabs/Fixed Joystick.prefab"));
            joyGO.name = "Move Joystick"; joyGO.transform.SetParent(safe, false);
            var joyRect = (RectTransform)joyGO.transform; joyRect.anchorMin = joyRect.anchorMax = Vector2.zero; joyRect.anchoredPosition = new Vector2(250,280); joyRect.sizeDelta = new Vector2(230,230);
            joystick = joyGO.GetComponent<Joystick>(); joystick.DeadZone = .08f;
            joyGO.GetComponent<Image>().sprite = SpriteAt("Assets/Game/Textures/UI/Ingame/joystick_frame.png");
            joyGO.GetComponent<Image>().color = new Color(1,1,1,.65f);
            var handle = joyGO.GetComponentsInChildren<Image>().First(i => i.gameObject != joyGO);
            handle.sprite = SpriteAt("Assets/Game/Textures/UI/Ingame/joystick_handle.png"); handle.color = new Color(1,1,1,.8f);
            var fire = Picture("Fire", safe, "Assets/Texture/buttonCircle.png", new Color(.12f,.1f,.07f,.4f), new Vector2(1,0), new Vector2(-250,280), new Vector2(230,230));
            fire.GetComponent<Image>().raycastTarget = true;
            fireButton = fire.gameObject.AddComponent<Button>(); fireButton.transition = Selectable.Transition.ColorTint;
            Picture("Fire Reticle", fire, "Assets/Game/Textures/UI/Ingame/btn_aim.png", Color.white, new Vector2(.5f,.5f), Vector2.zero, new Vector2(160,160));
            var fireHand = Picture("Tap Hand", fire, "Assets/Game/Textures/UI/Common/icon_hand.png", Color.white, new Vector2(.5f,.5f), new Vector2(65,-65), new Vector2(150,180));
            var moveHand = Picture("Move Hand", joyRect, "Assets/Game/Textures/UI/Common/icon_hand.png", Color.white, new Vector2(.5f,.5f), new Vector2(25,-40), new Vector2(75,90));
            var infinity = Picture("Infinity Swipe", safe, "Assets/toppng.com-white-infinity-symbol-png-white-infinity-logo-abstract-backgrounds-1024x441.png", new Color(1,1,1,.85f), new Vector2(.5f,0), new Vector2(0,280), new Vector2(330,142));
            var lookHand = Picture("Look Hand", infinity, "Assets/Game/Textures/UI/Common/icon_hand.png", Color.white, new Vector2(.5f,.5f), new Vector2(0,-20), new Vector2(60,75));
            moveHand.gameObject.SetActive(false); infinity.gameObject.SetActive(false);
            var block = Rect("Endgame Full Screen Block", canvasGO.transform, Vector2.zero, Vector2.zero, Vector2.zero); Stretch(block);
            var blockImage = block.gameObject.AddComponent<Image>(); blockImage.color = Color.clear; blockImage.raycastTarget = true;
            var blockButton = block.gameObject.AddComponent<Button>(); blockButton.transition = Selectable.Transition.None;
            Set(manager, "_btnBlock", blockButton); block.gameObject.SetActive(false);
            Set(hud, "_scaler", scaler); Set(hud, "_safeArea", safe); Set(hud, "_banner", banner); Set(hud, "_counter", counter);
            Set(hud, "_joystick", joyRect); Set(hud, "_fire", fire); Set(hud, "_instruction", instruction); Set(hud, "_count", count);
            Set(hud, "_fireHand", fireHand); Set(hud, "_moveHand", moveHand); Set(hud, "_infinity", infinity); Set(hud, "_lookHand", lookHand);
            Set(lookInput, "_joystickArea", joyRect); Set(lookInput, "_fireArea", fire);
            SetArray(joystick, "inputBlockers", new Object[] { block });
            var es = Child("EventSystem", parent); es.AddComponent<EventSystem>(); es.AddComponent<StandaloneInputModule>();
            return hud;
        }

        private static Sprite SpriteAt(string path)
        {
            var sprite = AssetDatabase.LoadAssetAtPath<Sprite>(path);
            if (sprite) return sprite;
            var importer = (TextureImporter)AssetImporter.GetAtPath(path);
            importer.textureType = TextureImporterType.Sprite; importer.spriteImportMode = SpriteImportMode.Single;
            importer.mipmapEnabled = false; importer.SaveAndReimport();
            return AssetDatabase.LoadAssetAtPath<Sprite>(path);
        }
        private static GameObject Child(string name, Transform parent)
        { var go = new GameObject(name); if (parent) go.transform.SetParent(parent, false); return go; }
        private static RectTransform Rect(string name, Transform parent, Vector2 anchor, Vector2 position, Vector2 size)
        {
            var rect = new GameObject(name, typeof(RectTransform)).GetComponent<RectTransform>();
            rect.SetParent(parent, false); rect.anchorMin = rect.anchorMax = anchor; rect.anchoredPosition = position; rect.sizeDelta = size; return rect;
        }
        private static void Stretch(RectTransform rect)
        { rect.anchorMin = Vector2.zero; rect.anchorMax = Vector2.one; rect.offsetMin = rect.offsetMax = Vector2.zero; }
        private static RectTransform Picture(string name, Transform parent, string path, Color color, Vector2 anchor, Vector2 pos, Vector2 size)
        {
            var rect = Rect(name, parent, anchor, pos, size); var image = rect.gameObject.AddComponent<Image>();
            image.sprite = path == "Assets/Texture/buttonRect.png" ? AssetDatabase.GetBuiltinExtraResource<Sprite>("UI/Skin/UISprite.psd") : SpriteAt(path);
            image.color = color; image.raycastTarget = false;
            image.type = path == "Assets/Texture/buttonRect.png" ? Image.Type.Sliced : Image.Type.Simple; return rect;
        }
        private static TMP_Text Text(string name, Transform parent, string value, int size, Vector2 anchor, Vector2 pos, Vector2 dimensions)
        {
            var rect = Rect(name, parent, anchor, pos, dimensions); var text = rect.gameObject.AddComponent<TextMeshProUGUI>();
            text.font = Font; text.fontSharedMaterial = Font.material; text.text = value; text.fontSize = size;
            text.color = Color.white; text.alignment = TextAlignmentOptions.Center; text.raycastTarget = false;
            return text;
        }
        internal static void Set(Object obj, string field, Object value)
        { var so = new SerializedObject(obj); so.FindProperty(field).objectReferenceValue = value; so.ApplyModifiedPropertiesWithoutUndo(); }
        internal static void Vector(Object obj, string field, Vector3 value)
        { var so = new SerializedObject(obj); so.FindProperty(field).vector3Value = value; so.ApplyModifiedPropertiesWithoutUndo(); }
        internal static void Float(Object obj, string field, float value)
        { var so = new SerializedObject(obj); so.FindProperty(field).floatValue = value; so.ApplyModifiedPropertiesWithoutUndo(); }
        private static void SetArray(Object obj, string field, Object[] values)
        {
            var so = new SerializedObject(obj); var array = so.FindProperty(field); array.arraySize = values.Length;
            for (int i = 0; i < values.Length; i++) array.GetArrayElementAtIndex(i).objectReferenceValue = values[i];
            so.ApplyModifiedPropertiesWithoutUndo();
        }
    }
}
