using System.Collections.Generic;
using System.IO;
using UnityEditor;
using UnityEditor.SceneManagement;
using UnityEngine;
using UnityEngine.EventSystems;
using UnityEngine.Rendering;
using UnityEngine.UI;
using TMPro;

namespace Playable.TempleRun.EditorTools
{
    /// <summary>
    /// Builds the endless Temple Run map from the Steal an Egg map and sets up the Gameplay scene.
    /// Menu: Tools > Temple Run.
    /// </summary>
    public static class TempleRunSetup
    {
        private const string Root = "Assets/_Playable_/TempleRun";
        private const string DataPath = Root + "/Editor/Data/TempleRunSegments.bytes";
        private const string GenDir = Root + "/Generated";
        private const string MeshDir = GenDir + "/Meshes";
        private const string PrefabDir = GenDir + "/Prefabs";
        private const string MatDir = GenDir + "/Materials";
        private const string MapMatDir = "Assets/MiniGames/StealAnEgg/BuiltIn/Materials";
        private const string ScenePath = "Assets/_Playable_/Scenes/Gameplay.unity";
        // Base Player (same assets as steal-an-egg Commons/Prefabs/Base_Player)
        private const string CharacterPath = "Assets/Game/Models/BasePlayer/Base_Character.fbx";
        private const string BodyMaterialPath = "Assets/Game/Models/BasePlayer/Squid_Game.mat";
        private const string HairPath = "Assets/Game/Models/BasePlayer/Hair_Luxury.fbx";
        private const string HairMaterialPath = "Assets/Game/Models/BasePlayer/Hair.mat";
        private const string FallbackCharacterPath = "Assets/Game/Models/Player/BaseCharacter/S_Base_03.fbx";
        private const string FallbackAnimatorPath = "Assets/Game/Models/Player/Player_Anim.controller";
        private const string AnimDir = Root + "/Character/Animations";
        private const string AudioDir = Root + "/Audio";
        private const string PlayerControllerPath = GenDir + "/TR_Player.controller";
        private const string CoinDataPath = Root + "/Editor/Data/TempleRunCoin.bytes";
        private const string ChaserDir = Root + "/Character/Chaser";
        private const string ChaserFallbackPath = "Assets/_Playable_/EggRaising/Yeti.prefab";
        private const string ChaserControllerPath = GenDir + "/TR_Chaser.controller";
        private const string TmpFontPath = "Assets/TextMesh Pro/Fonts/FFFFORWA SDF.asset";
        private const string TmpOutlineMatPath = "Assets/Game/Fonts/FFFFORWA Atlas Material Outline.mat";
        private const string BodyTexturePath = "Assets/Game/Models/BasePlayer/SquidGame_321.png";
        private const string TralaleroDataPath = Root + "/Editor/Data/TempleRunTralalero.bytes";
        private const string TralaleroPalettePath = Root + "/Character/Tralalero/TR_Tralalero_Palette.png";
        private const string HandSpritePath = "Assets/Game/Textures/UI/Common/icon_hand.png";

        private const float LaneOffset = 2.6f;
        private const float CharacterHeight = 1.75f;

        private static readonly string[] KeepRoots = { "Directional Light", "EventSystem", "AudioManager" };
        private static readonly string[] FontCandidates =
        {
            "Assets/_Playable_/Font/LevelUp.ttf",
            "Assets/_Playable_/Font/Montserrat-Black.ttf"
        };

        // ------------------------------------------------------------------ menus

        [MenuItem("Tools/Temple Run/Setup Gameplay Scene (xoa game cu)")]
        public static void SetupGameplayScene()
        {
            if (!EditorUtility.DisplayDialog("Temple Run",
                    "Scene " + ScenePath + " se bi XOA toan bo game cu (giu lai Directional Light, EventSystem, AudioManager) " +
                    "va dung map Temple Run moi.\n\nTiep tuc?", "Lam di", "Huy"))
                return;

            if (!EditorSceneManager.SaveCurrentModifiedScenesIfUserWantsTo()) return;

            Assets assets = BuildAssets();
            if (assets == null) return;

            var scene = EditorSceneManager.OpenScene(ScenePath, OpenSceneMode.Single);

            // 1. remove the old game
            foreach (GameObject go in scene.GetRootGameObjects())
            {
                if (System.Array.IndexOf(KeepRoots, go.name) >= 0) continue;
                Object.DestroyImmediate(go);
            }

            // 2. lighting / fog (hides segments popping in far away)
            RenderSettings.ambientMode = UnityEngine.Rendering.AmbientMode.Flat;
            RenderSettings.ambientLight = new Color(0.72f, 0.76f, 0.82f);
            RenderSettings.fog = true;
            RenderSettings.fogMode = FogMode.Linear;
            RenderSettings.fogColor = new Color(0.68f, 0.85f, 0.98f);
            RenderSettings.fogStartDistance = 70f;
            RenderSettings.fogEndDistance = 145f;

            // 3. gameplay objects
            GameObject managerGo = new GameObject("TempleRun_GameManager");
            RunnerGameManager gm = managerGo.AddComponent<RunnerGameManager>();

            GameObject trackGo = new GameObject("TempleRun_Track");
            TrackGenerator track = trackGo.AddComponent<TrackGenerator>();
            track.segmentPrefabs = assets.segments;
            track.lowPrefab = assets.low;
            track.tallPrefab = assets.tall;
            track.platformPrefab = assets.platform;
            track.coinPrefab = assets.coin;
            track.laneOffset = LaneOffset;

            RunnerPlayer player = CreatePlayer();
            track.player = player;

            RunnerCamera cam = CreateCamera(player.transform);
            cam.player = player;
            track.runnerCamera = cam;

            RunnerChaser chaser = CreateChaser(player);
            track.chaser = chaser;

            RunnerUI ui = CreateUI();
            EnsureEventSystem();

            gm.player = player;
            gm.chaser = chaser;
            gm.track = track;
            gm.runnerCamera = cam;
            gm.ui = ui;
            AssignSounds(gm);

            // Preview: place the first segments in the scene view so the map is visible without pressing Play.
            CreateEditorPreview(assets.segments);

            EditorSceneManager.MarkSceneDirty(scene);
            EditorSceneManager.SaveScene(scene);
            Selection.activeGameObject = player.gameObject;
            Debug.Log("[TempleRun] Gameplay scene ready. Press Play: swipe left/right (A/D) then swipe up (Space) on the barrier.");
        }

        [MenuItem("Tools/Temple Run/Rebuild Map Assets Only")]
        public static void RebuildAssetsMenu()
        {
            if (BuildAssets() != null) Debug.Log("[TempleRun] Assets rebuilt in " + GenDir);
        }

        // ------------------------------------------------------------------ assets

        private class Assets
        {
            public TrackSegment[] segments;
            public RunnerObstacle low;
            public RunnerObstacle tall;
            public RunnerObstacle platform;
            public RunnerCoin coin;
        }

        private static Assets BuildAssets()
        {
            if (!File.Exists(DataPath))
            {
                EditorUtility.DisplayDialog("Temple Run", "Khong tim thay " + DataPath, "OK");
                return null;
            }

            EnsureFolder(MeshDir);
            EnsureFolder(PrefabDir);
            EnsureFolder(MatDir);

            Assets a = new Assets();
            a.segments = BuildSegments();
            BuildObstacles(a);
            AssetDatabase.SaveAssets();
            AssetDatabase.Refresh();
            return a;
        }

        private static TrackSegment[] BuildSegments()
        {
            byte[] bytes = File.ReadAllBytes(DataPath);
            List<TrackSegment> result = new List<TrackSegment>();
            try
            {
            using (BinaryReader br = new BinaryReader(new MemoryStream(bytes)))
            {
                int magic = br.ReadInt32();
                if (magic != 0x54525347) throw new IOException("Bad segment data file");
                br.ReadInt32(); // version
                int count = br.ReadInt32();
                float length = br.ReadSingle();
                Material fallback = AssetDatabase.GetBuiltinExtraResource<Material>("Default-Diffuse.mat");

                for (int s = 0; s < count; s++)
                {
                    EditorUtility.DisplayProgressBar("Temple Run", "Building map segment " + (s + 1) + "/" + count, (float)s / count);
                    int vc = br.ReadInt32();
                    int smc = br.ReadInt32();
                    string[] matNames = new string[smc];
                    int[] counts = new int[smc];
                    for (int m = 0; m < smc; m++)
                    {
                        int len = br.ReadInt32();
                        matNames[m] = System.Text.Encoding.UTF8.GetString(br.ReadBytes(len));
                        counts[m] = br.ReadInt32();
                    }

                    Vector3[] pos = new Vector3[vc];
                    Vector3[] nrm = new Vector3[vc];
                    Vector2[] uv = new Vector2[vc];
                    for (int v = 0; v < vc; v++)
                    {
                        pos[v] = new Vector3(br.ReadSingle(), br.ReadSingle(), br.ReadSingle());
                        nrm[v] = new Vector3(br.ReadSingle(), br.ReadSingle(), br.ReadSingle());
                        uv[v] = new Vector2(br.ReadSingle(), br.ReadSingle());
                    }

                    string name = "TR_Segment_" + s.ToString("00");
                    Mesh mesh = new Mesh();
                    mesh.name = name;
                    mesh.indexFormat = vc > 65000 ? IndexFormat.UInt32 : IndexFormat.UInt16;
                    mesh.vertices = pos;
                    mesh.normals = nrm;
                    mesh.uv = uv;
                    mesh.subMeshCount = smc;
                    for (int m = 0; m < smc; m++)
                    {
                        int[] tris = new int[counts[m]];
                        for (int i = 0; i < tris.Length; i++) tris[i] = (int)br.ReadUInt32();
                        mesh.SetTriangles(tris, m, false);
                    }

                    mesh.RecalculateBounds();
                    mesh = SaveMesh(mesh, MeshDir + "/" + name + ".asset");

                    Material[] mats = new Material[smc];
                    for (int m = 0; m < smc; m++)
                    {
                        mats[m] = AssetDatabase.LoadAssetAtPath<Material>(MapMatDir + "/" + matNames[m] + ".mat");
                        if (mats[m] == null)
                        {
                            Debug.LogWarning("[TempleRun] Missing material " + matNames[m] + " in " + MapMatDir);
                            mats[m] = fallback;
                        }
                    }

                    GameObject go = new GameObject(name);
                    go.AddComponent<MeshFilter>().sharedMesh = mesh;
                    MeshRenderer mr = go.AddComponent<MeshRenderer>();
                    mr.sharedMaterials = mats;
                    TrackSegment seg = go.AddComponent<TrackSegment>();
                    seg.length = length;
                    GameObject prefab = PrefabUtility.SaveAsPrefabAsset(go, PrefabDir + "/" + name + ".prefab");
                    Object.DestroyImmediate(go);
                    result.Add(prefab.GetComponent<TrackSegment>());
                }
            }
            }
            finally
            {
                EditorUtility.ClearProgressBar();
            }

            return result.ToArray();
        }

        private static Mesh SaveMesh(Mesh mesh, string path)
        {
            Mesh existing = AssetDatabase.LoadAssetAtPath<Mesh>(path);
            if (existing != null)
            {
                existing.Clear();
                EditorUtility.CopySerialized(mesh, existing);
                Object.DestroyImmediate(mesh);
                EditorUtility.SetDirty(existing);
                return existing;
            }

            AssetDatabase.CreateAsset(mesh, path);
            return mesh;
        }

        // ------------------------------------------------------------------ obstacles & coin

        private static void BuildObstacles(Assets a)
        {
            Material red = MakeMat("TR_Red", "Red Surface 1", Color.white);
            Material white = MakeMat("TR_White", "Snow 3", Color.white);
            Material stone = MakeMat("TR_Stone", "White Surface 3", new Color(0.62f, 0.62f, 0.64f));
            Material rock = MakeMat("TR_Rock", "Rock", new Color(0.45f, 0.45f, 0.47f));
            Material moss = MakeMat("TR_Moss", "Green Surface 2", Color.white);
            Material wood = MakeMat("TR_Wood", "Dirt Surface 4 Large", Color.white);
            Material yellow = MakeMat("TR_Yellow", null, new Color(1f, 0.82f, 0.1f));
            Material coinMat = MakeCoinMat();

            // LOW barrier (jump over) - red / white Roblox style fence
            {
                GameObject root = new GameObject("TR_Obstacle_Low");
                Cube(root.transform, "PostL", new Vector3(-1.0f, 0.475f, 0f), new Vector3(0.25f, 0.95f, 0.25f), white);
                Cube(root.transform, "PostR", new Vector3(1.0f, 0.475f, 0f), new Vector3(0.25f, 0.95f, 0.25f), white);
                Cube(root.transform, "FootL", new Vector3(-1.0f, 0.06f, 0f), new Vector3(0.5f, 0.12f, 0.5f), red);
                Cube(root.transform, "FootR", new Vector3(1.0f, 0.06f, 0f), new Vector3(0.5f, 0.12f, 0.5f), red);
                Cube(root.transform, "BarTop", new Vector3(0f, 0.8f, 0f), new Vector3(2.3f, 0.3f, 0.3f), red);
                Cube(root.transform, "BarMid", new Vector3(0f, 0.42f, 0f), new Vector3(2.0f, 0.16f, 0.16f), white);
                for (int i = -1; i <= 1; i++)
                    Cube(root.transform, "Stripe" + i, new Vector3(i * 0.7f, 0.8f, -0.155f), new Vector3(0.3f, 0.3f, 0.02f), white);
                RunnerObstacle ob = root.AddComponent<RunnerObstacle>();
                ob.kind = ObstacleKind.Low;
                ob.size = new Vector3(2.3f, 0.95f, 0.4f);
                a.low = SavePrefab(root, "TR_Obstacle_Low").GetComponent<RunnerObstacle>();
            }

            // TALL block (change lane) - mossy stone ruin block, matches the jungle walls
            {
                GameObject root = new GameObject("TR_Obstacle_Tall");
                Cube(root.transform, "Body", new Vector3(0f, 1.2f, 0f), new Vector3(2.3f, 2.4f, 1.2f), stone);
                Cube(root.transform, "Moss", new Vector3(0f, 2.7f, 0f), new Vector3(2.4f, 0.6f, 1.3f), moss);
                Cube(root.transform, "BrickA", new Vector3(-0.55f, 0.55f, -0.62f), new Vector3(0.9f, 0.45f, 0.06f), rock);
                Cube(root.transform, "BrickB", new Vector3(0.5f, 1.5f, -0.62f), new Vector3(0.8f, 0.45f, 0.06f), rock);
                Cube(root.transform, "Sign", new Vector3(0f, 1.05f, -0.63f), new Vector3(0.5f, 0.5f, 0.04f), yellow);
                RunnerObstacle ob = root.AddComponent<RunnerObstacle>();
                ob.kind = ObstacleKind.Tall;
                ob.size = new Vector3(2.3f, 3.0f, 1.2f);
                a.tall = SavePrefab(root, "TR_Obstacle_Tall").GetComponent<RunnerObstacle>();
            }

            // PLATFORM (jump on top and run on it) - long wooden crate block
            {
                GameObject root = new GameObject("TR_Obstacle_Platform");
                const float len = 7f;
                Cube(root.transform, "Body", new Vector3(0f, 0.55f, 0f), new Vector3(2.3f, 1.1f, len), wood);
                Cube(root.transform, "Top", new Vector3(0f, 1.15f, 0f), new Vector3(2.4f, 0.1f, len + 0.1f), moss);
                Cube(root.transform, "FrontStripe", new Vector3(0f, 0.6f, -len * 0.5f - 0.01f), new Vector3(2.0f, 0.25f, 0.04f), yellow);
                for (int i = 0; i < 3; i++)
                {
                    float z = -len * 0.5f + 1.2f + i * 2.3f;
                    Cube(root.transform, "BandL" + i, new Vector3(-1.16f, 0.55f, z), new Vector3(0.04f, 1.1f, 0.3f), rock);
                    Cube(root.transform, "BandR" + i, new Vector3(1.16f, 0.55f, z), new Vector3(0.04f, 1.1f, 0.3f), rock);
                }

                RunnerObstacle ob = root.AddComponent<RunnerObstacle>();
                ob.kind = ObstacleKind.Platform;
                ob.size = new Vector3(2.3f, 1.2f, len);
                a.platform = SavePrefab(root, "TR_Obstacle_Platform").GetComponent<RunnerObstacle>();
            }

            // COIN (model: "Coin" by chor64, Sketchfab, CC-BY-4.0)
            {
                GameObject root = new GameObject("TR_Coin");
                GameObject disc = new GameObject("Mesh");
                disc.transform.SetParent(root.transform, false);
                Mesh coinMesh = BuildCoinMesh();
                MeshRenderer mr;
                if (coinMesh != null)
                {
                    disc.AddComponent<MeshFilter>().sharedMesh = coinMesh;
                    mr = disc.AddComponent<MeshRenderer>();
                }
                else
                {
                    Object.DestroyImmediate(disc);
                    disc = GameObject.CreatePrimitive(PrimitiveType.Cylinder);
                    Object.DestroyImmediate(disc.GetComponent<Collider>());
                    disc.name = "Mesh";
                    disc.transform.SetParent(root.transform, false);
                    disc.transform.localRotation = Quaternion.Euler(90f, 0f, 0f);
                    disc.transform.localScale = new Vector3(0.7f, 0.05f, 0.7f);
                    mr = disc.GetComponent<MeshRenderer>();
                }

                mr.sharedMaterial = coinMat;
                mr.shadowCastingMode = ShadowCastingMode.Off;
                int coinLayer = LayerMask.NameToLayer("RunnerCoins");
                if (coinLayer >= 0)
                    foreach (Transform child in root.GetComponentsInChildren<Transform>(true))
                        child.gameObject.layer = coinLayer;
                root.AddComponent<RunnerCoin>();
                a.coin = SavePrefab(root, "TR_Coin").GetComponent<RunnerCoin>();
            }
        }

        private static Mesh BuildCoinMesh()
        {
            if (!File.Exists(CoinDataPath)) return null;
            using (BinaryReader br = new BinaryReader(new MemoryStream(File.ReadAllBytes(CoinDataPath))))
            {
                if (br.ReadInt32() != 0x54524349) return null;
                int vc = br.ReadInt32();
                int ic = br.ReadInt32();
                Vector3[] pos = new Vector3[vc];
                Vector3[] nrm = new Vector3[vc];
                Vector2[] uv = new Vector2[vc];
                for (int v = 0; v < vc; v++)
                {
                    pos[v] = new Vector3(br.ReadSingle(), br.ReadSingle(), br.ReadSingle());
                    nrm[v] = new Vector3(br.ReadSingle(), br.ReadSingle(), br.ReadSingle());
                    uv[v] = new Vector2(br.ReadSingle(), br.ReadSingle());
                }

                int[] tris = new int[ic];
                for (int i = 0; i < ic; i++) tris[i] = (int)br.ReadUInt32();
                Mesh m = new Mesh();
                m.name = "TR_CoinMesh";
                m.vertices = pos;
                m.normals = nrm;
                m.uv = uv;
                m.triangles = tris;
                m.RecalculateBounds();
                return SaveMesh(m, MeshDir + "/TR_CoinMesh.asset");
            }
        }

        private static GameObject Cube(Transform parent, string name, Vector3 center, Vector3 size, Material mat)
        {
            GameObject g = GameObject.CreatePrimitive(PrimitiveType.Cube);
            Object.DestroyImmediate(g.GetComponent<Collider>());
            g.name = name;
            g.transform.SetParent(parent, false);
            g.transform.localPosition = center;
            g.transform.localScale = size;
            g.GetComponent<MeshRenderer>().sharedMaterial = mat;
            return g;
        }

        private static GameObject SavePrefab(GameObject root, string name)
        {
            GameObject prefab = PrefabUtility.SaveAsPrefabAsset(root, PrefabDir + "/" + name + ".prefab");
            Object.DestroyImmediate(root);
            return prefab;
        }

        private static Material MakeMat(string name, string baseMapMaterial, Color color)
        {
            Material src = string.IsNullOrEmpty(baseMapMaterial)
                ? null
                : AssetDatabase.LoadAssetAtPath<Material>(MapMatDir + "/" + baseMapMaterial + ".mat");
            Material m = src != null ? new Material(src) : new Material(Shader.Find("Standard"));
            m.name = name;
            m.color = color;
            return SaveMaterial(m, MatDir + "/" + name + ".mat");
        }

        private static Material MakeCoinMat()
        {
            // Shared gold shading for Editor and Luna without scene-light variants.
            Material m = new Material(AssetDatabase.LoadAssetAtPath<Shader>(Root + "/CoinGold.shader"));
            m.name = "TR_Coin";
            m.color = new Color(1f, 0.78f, 0.16f);
            return SaveMaterial(m, MatDir + "/TR_Coin.mat");
        }

        private static Material SaveMaterial(Material m, string path)
        {
            Material existing = AssetDatabase.LoadAssetAtPath<Material>(path);
            if (existing != null)
            {
                EditorUtility.CopySerialized(m, existing);
                Object.DestroyImmediate(m);
                EditorUtility.SetDirty(existing);
                return existing;
            }

            AssetDatabase.CreateAsset(m, path);
            return m;
        }

        // ------------------------------------------------------------------ scene objects

        private static RunnerPlayer CreatePlayer()
        {
            GameObject playerGo = new GameObject("TempleRun_Player");
            RunnerPlayer rp = playerGo.AddComponent<RunnerPlayer>();
            rp.laneOffset = LaneOffset;

            bool isBasePlayer = true;
            GameObject modelAsset = AssetDatabase.LoadAssetAtPath<GameObject>(CharacterPath);
            if (modelAsset == null)
            {
                isBasePlayer = false;
                Debug.LogWarning("[TempleRun] " + CharacterPath + " not found, falling back to " + FallbackCharacterPath);
                modelAsset = AssetDatabase.LoadAssetAtPath<GameObject>(FallbackCharacterPath);
            }

            GameObject model;
            if (modelAsset != null)
            {
                model = (GameObject)PrefabUtility.InstantiatePrefab(modelAsset);
            }
            else
            {
                Debug.LogWarning("[TempleRun] No character model found, using a capsule.");
                model = GameObject.CreatePrimitive(PrimitiveType.Capsule);
                model.transform.localPosition = new Vector3(0f, 0.9f, 0f);
                model.transform.localScale = new Vector3(0.7f, 0.9f, 0.7f);
            }

            model.name = "Model";
            model.transform.SetParent(playerGo.transform, false);
            foreach (Collider c in model.GetComponentsInChildren<Collider>(true)) Object.DestroyImmediate(c);

            // body material (Squid Game outfit, same as Base_Player)
            if (isBasePlayer)
            {
                Material body = MakePlayerOutfit();
                if (body != null)
                {
                    foreach (Renderer r in model.GetComponentsInChildren<Renderer>(true))
                    {
                        Material[] mats = r.sharedMaterials;
                        for (int i = 0; i < mats.Length; i++) mats[i] = body;
                        r.sharedMaterials = mats;
                    }
                }
            }

            foreach (Renderer r in model.GetComponentsInChildren<Renderer>(true))
            {
                SkinnedMeshRenderer smr = r as SkinnedMeshRenderer;
                if (smr != null) smr.updateWhenOffscreen = true; // never culled while animating
            }

            // scale the character to ~1.75 m and put its feet on y = 0
            Bounds b;
            if (TryGetBounds(model, out b) && b.size.y > 0.01f)
            {
                float k = CharacterHeight / b.size.y;
                model.transform.localScale *= k;
                if (TryGetBounds(model, out b))
                    model.transform.localPosition += new Vector3(-b.center.x, -b.min.y, -b.center.z);
            }

            Animator anim = model.GetComponent<Animator>();
            if (anim == null) anim = model.AddComponent<Animator>();
            RuntimeAnimatorController ctrl = isBasePlayer ? BuildPlayerController() : null;
            if (ctrl == null) ctrl = AssetDatabase.LoadAssetAtPath<RuntimeAnimatorController>(FallbackAnimatorPath);
            if (ctrl != null) anim.runtimeAnimatorController = ctrl;
            else Debug.LogWarning("[TempleRun] No animator controller for the player.");
            anim.applyRootMotion = false;
            anim.cullingMode = AnimatorCullingMode.AlwaysAnimate;

            if (isBasePlayer) AttachHair(model, anim);

            rp.animator = anim;
            rp.model = model.transform;
            playerGo.transform.position = Vector3.zero;
            return rp;
        }

        /// <summary>
        /// Squid Game tracksuit (teal suit, white shoes, face) = SquidGame_321 texture on a built-in Standard
        /// material, so it renders the same in the Editor (Built-in RP) and in Luna.
        /// </summary>
        private static Material MakePlayerOutfit()
        {
            Texture tex = null;
            Material src = AssetDatabase.LoadAssetAtPath<Material>(BodyMaterialPath);
            if (src != null)
            {
                if (src.HasProperty("_BaseMap")) tex = src.GetTexture("_BaseMap");
                if (tex == null && src.HasProperty("_MainTex")) tex = src.GetTexture("_MainTex");
            }

            if (tex == null) tex = AssetDatabase.LoadAssetAtPath<Texture2D>(BodyTexturePath);
            if (tex == null)
            {
                Debug.LogWarning("[TempleRun] Outfit texture not found: " + BodyTexturePath);
                return null;
            }

            // 4096px is far too big for a playable: 1024 keeps the outfit sharp enough.
            TextureImporter ti = AssetImporter.GetAtPath(AssetDatabase.GetAssetPath(tex)) as TextureImporter;
            if (ti != null && ti.maxTextureSize > 1024)
            {
                ti.maxTextureSize = 1024;
                ti.SaveAndReimport();
            }

            Material m = new Material(Shader.Find("Standard"));
            m.name = "TR_PlayerBody";
            m.mainTexture = tex;
            m.color = Color.white;
            m.SetFloat("_Glossiness", 0.25f);
            m.SetFloat("_Metallic", 0f);
            return SaveMaterial(m, MatDir + "/TR_PlayerBody.mat");
        }

        // ------------------------------------------------------------------ hair

        private static void AttachHair(GameObject model, Animator anim)
        {
            GameObject hairAsset = AssetDatabase.LoadAssetAtPath<GameObject>(HairPath);
            if (hairAsset == null)
            {
                Debug.LogWarning("[TempleRun] Hair not found: " + HairPath);
                return;
            }

            Bounds body;
            if (!TryGetBounds(model, out body)) return;
            float h = body.size.y;

            Transform head = null;
            if (anim != null && anim.avatar != null && anim.isHuman) head = anim.GetBoneTransform(HumanBodyBones.Head);
            if (head == null) head = FindDeep(model.transform, "mixamorig:Head");
            if (head == null)
            {
                Debug.LogWarning("[TempleRun] Head bone not found, hair attached to the model root.");
                head = model.transform;
            }

            GameObject hair = (GameObject)PrefabUtility.InstantiatePrefab(hairAsset);
            hair.name = "Hair";
            foreach (Collider c in hair.GetComponentsInChildren<Collider>(true)) Object.DestroyImmediate(c);

            // The hair mesh is authored in the same space as Base_Character (feet at origin).
            // Place it under the model root like a second mesh of the character, try the usual
            // FBX axis/scale conversions and keep the one that sits on top of the head.
            hair.transform.SetParent(model.transform, false);
            Quaternion importRot = hair.transform.localRotation;
            Vector3 importScale = hair.transform.localScale;
            Quaternion[] rots = { importRot, Quaternion.Euler(-90f, 0f, 0f), Quaternion.identity, Quaternion.Euler(90f, 0f, 0f) };
            Vector3[] scales = { importScale, Vector3.one * 100f, Vector3.one, Vector3.one * 0.01f };
            float best = float.MaxValue;
            Quaternion bestRot = importRot;
            Vector3 bestScale = importScale;
            Vector3 headPos = head.position;
            for (int r = 0; r < rots.Length; r++)
            {
                for (int k = 0; k < scales.Length; k++)
                {
                    hair.transform.localPosition = Vector3.zero;
                    hair.transform.localRotation = rots[r];
                    hair.transform.localScale = scales[k];
                    Bounds hb;
                    if (!TryGetBounds(hair, out hb)) continue;
                    float score = Mathf.Abs(hb.center.y - (body.min.y + 0.97f * h)) / h
                                  + Mathf.Abs(hb.size.y - 0.28f * h) / h
                                  + (Mathf.Abs(hb.center.x - headPos.x) + Mathf.Abs(hb.center.z - headPos.z)) / h;
                    if (score < best)
                    {
                        best = score;
                        bestRot = rots[r];
                        bestScale = scales[k];
                    }
                }
            }

            hair.transform.localPosition = Vector3.zero;
            hair.transform.localRotation = bestRot;
            hair.transform.localScale = bestScale;
            // follow the head when the run / jump animations play
            hair.transform.SetParent(head, true);

            Material hairMat = LunaSafeMaterial(AssetDatabase.LoadAssetAtPath<Material>(HairMaterialPath), "TR_PlayerHair");
            foreach (Renderer r in hair.GetComponentsInChildren<Renderer>(true))
            {
                if (hairMat != null)
                {
                    Material[] mats = r.sharedMaterials;
                    for (int i = 0; i < mats.Length; i++) mats[i] = hairMat;
                    r.sharedMaterials = mats;
                }
            }

            Debug.Log("[TempleRun] Hair attached to " + head.name + " (fit score " + best.ToString("0.00") + ")");
        }

        private static Transform FindDeep(Transform root, string name)
        {
            if (root.name == name) return root;
            for (int i = 0; i < root.childCount; i++)
            {
                Transform t = FindDeep(root.GetChild(i), name);
                if (t != null) return t;
            }

            return null;
        }

        /// <summary>Luna only renders built-in shaders: keep the material if it already is, else make a Standard copy.</summary>
        private static Material LunaSafeMaterial(Material src, string name)
        {
            if (src == null) return null;
            Shader sh = src.shader;
            bool ok = sh != null && sh.isSupported && !sh.name.StartsWith("Hidden/") && !sh.name.Contains("Universal") &&
                      !sh.name.Contains("Shader Graphs") && !sh.name.Contains("URP");
            if (ok) return src;

            Texture tex = null;
            if (src.HasProperty("_MainTex")) tex = src.GetTexture("_MainTex");
            if (tex == null && src.HasProperty("_BaseMap")) tex = src.GetTexture("_BaseMap");
            Color col = Color.white;
            if (src.HasProperty("_Color")) col = src.GetColor("_Color");
            else if (src.HasProperty("_BaseColor")) col = src.GetColor("_BaseColor");

            Material m = new Material(Shader.Find("Standard"));
            m.name = name;
            m.mainTexture = tex;
            m.color = col;
            m.SetFloat("_Glossiness", 0.2f);
            Debug.Log("[TempleRun] " + src.name + " uses '" + (sh != null ? sh.name : "null") + "', made a Standard copy: " + name);
            return SaveMaterial(m, MatDir + "/" + name + ".mat");
        }

        // ------------------------------------------------------------------ animator

        private static AnimationClip LoadClip(string path, string clipName)
        {
            AnimationClip any = null;
            foreach (Object o in AssetDatabase.LoadAllAssetsAtPath(path))
            {
                AnimationClip c = o as AnimationClip;
                if (c == null || c.name.StartsWith("__preview__")) continue;
                if (c.name == clipName) return c;
                if (any == null) any = c;
            }

            return any;
        }

        private static RuntimeAnimatorController BuildPlayerController()
        {
            // clean in-place loops: no root drift, no height pop at the loop point
            FixLoopImport(AnimDir + "/TR_HumanoidRun.fbx");
            FixLoopImport(AnimDir + "/TR_Run.fbx");
            FixLoopImport(AnimDir + "/TR_Idle.fbx");
            AnimationClip idle = LoadClip(AnimDir + "/TR_Idle.fbx", "mixamo.com");
            AnimationClip run = LoadClip(AnimDir + "/Source_Run.fbx", "Armature|Run");
            if (run == null) run = LoadClip(AnimDir + "/TR_HumanoidRun.fbx", "HumanoidRun");
            if (run == null) run = LoadClip(AnimDir + "/TR_Run.fbx", "Standard Run");
            AnimationClip jumpUp = LoadClip(AnimDir + "/TR_Jump.fbx", "HumanoidJumpUp");
            AnimationClip midAir = LoadClip(AnimDir + "/TR_Jump.fbx", "HumanoidMidAir");
            AnimationClip fall = LoadClip(AnimDir + "/TR_Jump.fbx", "HumanoidFall");
            if (run == null)
            {
                Debug.LogWarning("[TempleRun] Run clip missing in " + AnimDir + ", using the old controller.");
                return null;
            }

            if (idle == null) idle = run;
            if (jumpUp == null) jumpUp = run;
            if (midAir == null) midAir = jumpUp;
            if (fall == null) fall = midAir;

            if (AssetDatabase.LoadAssetAtPath<Object>(PlayerControllerPath) != null) AssetDatabase.DeleteAsset(PlayerControllerPath);
            UnityEditor.Animations.AnimatorController ac =
                UnityEditor.Animations.AnimatorController.CreateAnimatorControllerAtPath(PlayerControllerPath);
            ac.AddParameter("Running", AnimatorControllerParameterType.Bool);
            ac.AddParameter("Grounded", AnimatorControllerParameterType.Bool);
            ac.AddParameter("VerticalSpeed", AnimatorControllerParameterType.Float);
            ac.AddParameter("RunSpeed", AnimatorControllerParameterType.Float);
            AnimatorControllerParameter[] ps = ac.parameters;
            for (int i = 0; i < ps.Length; i++)
            {
                if (ps[i].name == "Grounded") ps[i].defaultBool = true;
                if (ps[i].name == "RunSpeed") ps[i].defaultFloat = 1f;
            }

            ac.parameters = ps;

            UnityEditor.Animations.AnimatorStateMachine sm = ac.layers[0].stateMachine;
            UnityEditor.Animations.AnimatorState sIdle = sm.AddState("Idle", new Vector3(250f, 0f, 0f));
            sIdle.motion = idle;
            UnityEditor.Animations.AnimatorState sRun = sm.AddState("Run", new Vector3(250f, 120f, 0f));
            sRun.motion = run;
            // Keep state playback independent of speed-parameter support in Luna.
            sRun.iKOnFeet = false;

            // A direct clip avoids exporting a BlendTree for the airborne state.
            UnityEditor.Animations.AnimatorState sAir = sm.AddState("Jump", new Vector3(250f, 240f, 0f));
            sAir.motion = jumpUp;
            sm.defaultState = sIdle;

            Trans(sIdle, sRun, 0.15f, "Running", true, "Grounded", true);
            Trans(sRun, sIdle, 0.2f, "Running", false, null, false);
            Trans(sAir, sRun, 0.08f, "Grounded", true, "Running", true);
            Trans(sAir, sIdle, 0.15f, "Grounded", true, "Running", false);
            UnityEditor.Animations.AnimatorStateTransition toAir = sm.AddAnyStateTransition(sAir);
            toAir.hasExitTime = false;
            toAir.duration = 0.06f;
            toAir.canTransitionToSelf = false;
            toAir.AddCondition(UnityEditor.Animations.AnimatorConditionMode.IfNot, 0f, "Grounded");

            EditorUtility.SetDirty(ac);
            AssetDatabase.SaveAssets();
            return ac;
        }

        private static void FixLoopImport(string path)
        {
            ModelImporter mi = AssetImporter.GetAtPath(path) as ModelImporter;
            if (mi == null) return;
            ModelImporterClipAnimation[] clips = mi.clipAnimations;
            if (clips == null || clips.Length == 0) clips = mi.defaultClipAnimations;
            bool changed = false;
            for (int i = 0; i < clips.Length; i++)
            {
                ModelImporterClipAnimation c = clips[i];
                if (c.loopTime && c.loopPose && c.lockRootRotation && c.lockRootHeightY && c.lockRootPositionXZ &&
                    c.keepOriginalOrientation && c.keepOriginalPositionY && c.keepOriginalPositionXZ) continue;
                c.loopTime = true;
                c.loopPose = true;
                c.lockRootRotation = true;      // bake rotation into pose: no drifting/turning
                c.lockRootHeightY = true;       // bake Y: no sinking/popping
                c.lockRootPositionXZ = true;    // in place
                c.keepOriginalOrientation = true;
                c.keepOriginalPositionY = true;
                c.keepOriginalPositionXZ = true;
                c.heightFromFeet = false;
                changed = true;
            }

            if (!changed) return;
            mi.clipAnimations = clips;
            mi.SaveAndReimport();
        }

        private static void Trans(UnityEditor.Animations.AnimatorState from, UnityEditor.Animations.AnimatorState to, float duration,
            string p1, bool v1, string p2, bool v2)
        {
            UnityEditor.Animations.AnimatorStateTransition t = from.AddTransition(to);
            t.hasExitTime = false;
            t.duration = duration;
            t.AddCondition(v1 ? UnityEditor.Animations.AnimatorConditionMode.If : UnityEditor.Animations.AnimatorConditionMode.IfNot, 0f, p1);
            if (!string.IsNullOrEmpty(p2))
                t.AddCondition(v2 ? UnityEditor.Animations.AnimatorConditionMode.If : UnityEditor.Animations.AnimatorConditionMode.IfNot, 0f, p2);
        }

        // ------------------------------------------------------------------ audio

        private static void AssignSounds(RunnerGameManager gm)
        {
            SerializedObject so = new SerializedObject(gm);
            SetClip(so, "_backgroundMusic", "Assets/Sound/Epic-Chase(chosic.com).mp3");
            SetClip(so, "_monsterRoar", "Assets/_Playable_/Sound/505131__mitchanary__monster-roar_8.wav");
            SetClip(so, "_jumpSound", AudioDir + "/TR_Jump.wav");
            SetClip(so, "_failUiSound", AudioDir + "/TR_Fail.wav");
            SetClip(so, "_timeEndUiSound", AudioDir + "/TR_TimeEnd.wav");
            SetClip(so, "_runStepSound", AudioDir + "/TR_Step.wav");
            SetClip(so, "_landSound", AudioDir + "/TR_Land.wav");
            SetClip(so, "_crashSound", AudioDir + "/TR_Hit.mp3");
            SetClip(so, "_coinSound", AudioDir + "/TR_Coin.wav");
            so.ApplyModifiedPropertiesWithoutUndo();
        }

        private static void SetClip(SerializedObject so, string field, string path)
        {
            AudioClip clip = AssetDatabase.LoadAssetAtPath<AudioClip>(path);
            SerializedProperty p = so.FindProperty(field);
            if (clip != null && p != null && p.objectReferenceValue == null) p.objectReferenceValue = clip;
        }

        private static bool TryGetBounds(GameObject go, out Bounds bounds)
        {
            bounds = new Bounds();
            bool found = false;
            foreach (Renderer r in go.GetComponentsInChildren<Renderer>(true))
            {
                if (!found)
                {
                    bounds = r.bounds;
                    found = true;
                }
                else bounds.Encapsulate(r.bounds);
            }

            return found;
        }

        private static RunnerCamera CreateCamera(Transform target)
        {
            GameObject camGo = new GameObject("Main Camera");
            camGo.tag = "MainCamera";
            Camera cam = camGo.AddComponent<Camera>();
            cam.fieldOfView = 60f;
            cam.nearClipPlane = 0.3f;
            cam.farClipPlane = 220f;
            cam.clearFlags = CameraClearFlags.Skybox;
            camGo.AddComponent<AudioListener>();
            RunnerCamera rc = camGo.AddComponent<RunnerCamera>();
            rc.target = target;
            camGo.transform.position = new Vector3(0f, 3.4f, -6.2f);
            camGo.transform.rotation = Quaternion.LookRotation(new Vector3(0f, 1.2f, 6f) - camGo.transform.position);
            return rc;
        }

        private static void CreateEditorPreview(TrackSegment[] segments)
        {
            // Editor-only visual preview of the track; removed automatically when Play starts (EditorOnly tag).
            GameObject root = new GameObject("TempleRun_EditorPreview (EditorOnly)");
            root.tag = "EditorOnly";
            float z = -6f;
            for (int i = 0; i < segments.Length && i < 8; i++)
            {
                GameObject g = (GameObject)PrefabUtility.InstantiatePrefab(segments[i].gameObject);
                g.transform.SetParent(root.transform, false);
                g.transform.position = new Vector3(0f, 0f, z);
                z += segments[i].length;
            }

            root.AddComponent<EditorPreviewHider>();
        }

        // ------------------------------------------------------------------ chaser (monster)

        private static RunnerChaser CreateChaser(RunnerPlayer player)
        {
            // 1) a model/prefab dropped in TempleRun/Character/Chaser (e.g. Tralalero), 2) the Yeti of the project
            GameObject src = null;
            if (AssetDatabase.IsValidFolder(ChaserDir))
            {
                string[] guids = AssetDatabase.FindAssets("t:GameObject", new[] { ChaserDir });
                for (int i = 0; i < guids.Length && src == null; i++)
                    src = AssetDatabase.LoadAssetAtPath<GameObject>(AssetDatabase.GUIDToAssetPath(guids[i]));
            }

            if (src == null) src = BuildTralaleroPrefab();
            if (src == null) src = AssetDatabase.LoadAssetAtPath<GameObject>(ChaserFallbackPath);

            GameObject root = new GameObject("TempleRun_Chaser");
            RunnerChaser chaser = root.AddComponent<RunnerChaser>();
            chaser.player = player;
            chaser.biteBloodPrefab = AssetDatabase.LoadAssetAtPath<GameObject>(GenDir + "/Prefabs/TR_BiteBlood.prefab");
            if (src == null)
            {
                Debug.LogWarning("[TempleRun] No chaser model found (put one in " + ChaserDir + ").");
                return chaser;
            }

            GameObject model = (GameObject)PrefabUtility.InstantiatePrefab(src);
            if (PrefabUtility.IsPartOfPrefabInstance(model))
                PrefabUtility.UnpackPrefabInstance(model, PrefabUnpackMode.Completely, InteractionMode.AutomatedAction);
            model.name = "Model";
            model.transform.SetParent(root.transform, false);
            model.transform.localPosition = Vector3.zero;

            // keep only visuals + animator (no gameplay scripts, physics or colliders from the source game)
            foreach (Transform t in model.GetComponentsInChildren<Transform>(true))
                GameObjectUtility.RemoveMonoBehavioursWithMissingScript(t.gameObject);
            for (int pass = 0; pass < 5; pass++)
            {
                // reverse order + several passes so [RequireComponent] dependents go first
                MonoBehaviour[] mbs = model.GetComponentsInChildren<MonoBehaviour>(true);
                if (mbs.Length == 0) break;
                for (int i = mbs.Length - 1; i >= 0; i--)
                    if (mbs[i] != null) Object.DestroyImmediate(mbs[i]);
            }

            foreach (UnityEngine.AI.NavMeshAgent ag in model.GetComponentsInChildren<UnityEngine.AI.NavMeshAgent>(true)) Object.DestroyImmediate(ag);
            foreach (Collider c in model.GetComponentsInChildren<Collider>(true)) Object.DestroyImmediate(c);
            foreach (Rigidbody rb in model.GetComponentsInChildren<Rigidbody>(true)) Object.DestroyImmediate(rb);
            foreach (Renderer r in model.GetComponentsInChildren<Renderer>(true))
            {
                SkinnedMeshRenderer smr = r as SkinnedMeshRenderer;
                if (smr != null) smr.updateWhenOffscreen = true;
                Material[] mats = r.sharedMaterials;
                for (int i = 0; i < mats.Length; i++)
                    if (mats[i] != null) mats[i] = LunaSafeMaterial(mats[i], "TR_Chaser_" + mats[i].name.Replace("/", "_"));
                r.sharedMaterials = mats;
            }

            Bounds b;
            if (TryGetBounds(model, out b) && b.size.y > 0.01f)
            {
                model.transform.localScale *= (player.height * 2f) / b.size.y; // Twice the player height
                if (TryGetBounds(model, out b))
                    model.transform.localPosition += new Vector3(-b.center.x, -b.min.y, -b.center.z);
            }

            Animator anim = model.GetComponentInChildren<Animator>();
            bool addedAnimator = anim == null;
            if (anim == null) anim = model.AddComponent<Animator>();
            if (anim.runtimeAnimatorController == null)
            {
                // model without controller: loop its first animation clip
                AnimationClip clip = null;
                foreach (Object o in AssetDatabase.LoadAllAssetsAtPath(AssetDatabase.GetAssetPath(src)))
                {
                    AnimationClip c = o as AnimationClip;
                    if (c != null && !c.name.StartsWith("__preview__")) { clip = c; break; }
                }

                if (clip != null)
                {
                    if (AssetDatabase.LoadAssetAtPath<Object>(ChaserControllerPath) != null) AssetDatabase.DeleteAsset(ChaserControllerPath);
                    UnityEditor.Animations.AnimatorController ac =
                        UnityEditor.Animations.AnimatorController.CreateAnimatorControllerAtPath(ChaserControllerPath);
                    ac.layers[0].stateMachine.AddState("Run").motion = clip;
                    anim.runtimeAnimatorController = ac;
                }
            }

            if (anim.runtimeAnimatorController == null && addedAnimator)
            {
                // static model (e.g. Tralalero): RunnerChaser animates it procedurally
                Object.DestroyImmediate(anim);
                anim = null;
            }

            if (anim != null)
            {
                anim.applyRootMotion = false;
                anim.cullingMode = AnimatorCullingMode.AlwaysAnimate;
            }

            chaser.animator = anim;
            chaser.model = model.transform;
            root.transform.position = new Vector3(0f, 0f, -chaser.followDistance);
            Debug.Log("[TempleRun] Chaser model: " + AssetDatabase.GetAssetPath(src));
            return chaser;
        }

        /// <summary>
        /// Tralalero extracted from the animal hunt build: a static blocky mesh, split here into
        /// Body / Tail / 3 legs (each with its hip pivot) and animated with a generated run clip.
        /// The original texture is Crunch-compressed, so it is painted with a small palette.
        /// </summary>
        private static GameObject BuildTralaleroPrefab()
        {
            if (!File.Exists(TralaleroDataPath)) return null;

            TextureImporter ti = AssetImporter.GetAtPath(TralaleroPalettePath) as TextureImporter;
            if (ti != null)
            {
                ti.textureType = TextureImporterType.Default;
                ti.filterMode = FilterMode.Point;
                ti.mipmapEnabled = false;
                ti.wrapMode = TextureWrapMode.Clamp;
                ti.textureCompression = TextureImporterCompression.Uncompressed;
                ti.SaveAndReimport();
            }

            Material mat = new Material(Shader.Find("Standard"));
            mat.name = "TR_Tralalero";
            mat.mainTexture = AssetDatabase.LoadAssetAtPath<Texture2D>(TralaleroPalettePath);
            mat.SetFloat("_Glossiness", 0.35f);
            mat = SaveMaterial(mat, MatDir + "/TR_Tralalero.mat");

            GameObject root = new GameObject("TR_Tralalero");
            GameObject rig = new GameObject("Rig");
            rig.transform.SetParent(root.transform, false);
            float legLength = 1.62f;

            using (BinaryReader br = new BinaryReader(new MemoryStream(File.ReadAllBytes(TralaleroDataPath))))
            {
                if (br.ReadInt32() != 0x54525031)
                {
                    Object.DestroyImmediate(root);
                    return null;
                }

                int parts = br.ReadInt32();
                for (int k = 0; k < parts; k++)
                {
                    string name = System.Text.Encoding.UTF8.GetString(br.ReadBytes(br.ReadInt32()));
                    Vector3 pivot = new Vector3(br.ReadSingle(), br.ReadSingle(), br.ReadSingle());
                    int vc = br.ReadInt32();
                    int ic = br.ReadInt32();
                    Vector3[] pos = new Vector3[vc];
                    Vector3[] nrm = new Vector3[vc];
                    Vector2[] uv = new Vector2[vc];
                    for (int v = 0; v < vc; v++)
                    {
                        pos[v] = new Vector3(br.ReadSingle(), br.ReadSingle(), br.ReadSingle());
                        nrm[v] = new Vector3(br.ReadSingle(), br.ReadSingle(), br.ReadSingle());
                        uv[v] = new Vector2(br.ReadSingle(), br.ReadSingle());
                    }

                    int[] tris = new int[ic];
                    for (int i = 0; i < ic; i++) tris[i] = (int)br.ReadUInt32();
                    Mesh m = new Mesh();
                    m.name = "TR_Tralalero_" + name;
                    m.vertices = pos;
                    m.normals = nrm;
                    m.uv = uv;
                    m.triangles = tris;
                    m.RecalculateBounds();
                    m = SaveMesh(m, MeshDir + "/TR_Tralalero_" + name + ".asset");

                    GameObject go = new GameObject(name);
                    go.transform.SetParent(rig.transform, false);
                    go.transform.localPosition = pivot;
                    go.AddComponent<MeshFilter>().sharedMesh = m;
                    go.AddComponent<MeshRenderer>().sharedMaterial = mat;
                    if (name == "LegL") legLength = pivot.y;
                }
            }

            // ---- run cycle (2 steps): legs swing from the hips, body dips so the planted foot stays on the ground,
            // tail wags, small roll. Generic clip = works on any rig, Luna friendly.
            const float cycle = 0.5f;
            const int samples = 16;
            const float swing = 32f;
            AnimationClip clip = new AnimationClip();
            clip.name = "TR_Tralalero_Run";
            clip.frameRate = 30f;
            AnimationCurve[] legL = NewQuatCurves(), legR = NewQuatCurves(), legB = NewQuatCurves(), tail = NewQuatCurves(), rigRot = NewQuatCurves();
            AnimationCurve rigX = new AnimationCurve(), rigY = new AnimationCurve(), rigZ = new AnimationCurve();
            for (int i = 0; i <= samples; i++)
            {
                float t = i / (float)samples;
                float time = t * cycle;
                float sn = Mathf.Sin(t * Mathf.PI * 2f);
                float cs = Mathf.Cos(t * Mathf.PI * 2f);
                AddQuatKey(legL, time, Quaternion.Euler(swing * sn, 0f, 0f));
                AddQuatKey(legR, time, Quaternion.Euler(-swing * sn, 0f, 0f));
                AddQuatKey(legB, time, Quaternion.Euler(-swing * 0.85f * cs, 0f, 0f));
                AddQuatKey(tail, time, Quaternion.Euler(0f, 16f * Mathf.Sin(t * Mathf.PI * 2f - 0.8f), 0f));
                AddQuatKey(rigRot, time, Quaternion.Euler(3f * Mathf.Cos(t * Mathf.PI * 4f), 0f, 5f * sn));
                float legAngle = swing * Mathf.Abs(sn) * Mathf.Deg2Rad;
                float dip = legLength * (1f - Mathf.Cos(legAngle));
                float hop = 0.12f * Mathf.Abs(Mathf.Cos(t * Mathf.PI * 2f));
                rigX.AddKey(time, 0f);
                rigY.AddKey(time, hop - dip);
                rigZ.AddKey(time, 0f);
            }

            SetQuatCurves(clip, "Rig/LegL", legL);
            SetQuatCurves(clip, "Rig/LegR", legR);
            SetQuatCurves(clip, "Rig/LegB", legB);
            SetQuatCurves(clip, "Rig/Tail", tail);
            SetQuatCurves(clip, "Rig", rigRot);
            clip.SetCurve("Rig", typeof(Transform), "m_LocalPosition.x", rigX);
            clip.SetCurve("Rig", typeof(Transform), "m_LocalPosition.y", rigY);
            clip.SetCurve("Rig", typeof(Transform), "m_LocalPosition.z", rigZ);
            clip.EnsureQuaternionContinuity();
            AnimationClipSettings settings = AnimationUtility.GetAnimationClipSettings(clip);
            settings.loopTime = true;
            AnimationUtility.SetAnimationClipSettings(clip, settings);

            string clipPath = GenDir + "/TR_Tralalero_Run.anim";
            if (AssetDatabase.LoadAssetAtPath<Object>(clipPath) != null) AssetDatabase.DeleteAsset(clipPath);
            AssetDatabase.CreateAsset(clip, clipPath);

            string ctrlPath = GenDir + "/TR_Tralalero.controller";
            if (AssetDatabase.LoadAssetAtPath<Object>(ctrlPath) != null) AssetDatabase.DeleteAsset(ctrlPath);
            UnityEditor.Animations.AnimatorController ac = UnityEditor.Animations.AnimatorController.CreateAnimatorControllerAtPath(ctrlPath);
            ac.layers[0].stateMachine.AddState("Run").motion = clip;

            Animator anim = root.AddComponent<Animator>();
            anim.runtimeAnimatorController = ac;
            anim.applyRootMotion = false;
            return SavePrefab(root, "TR_Tralalero");
        }

        private static AnimationCurve[] NewQuatCurves()
        {
            return new[] { new AnimationCurve(), new AnimationCurve(), new AnimationCurve(), new AnimationCurve() };
        }

        private static void AddQuatKey(AnimationCurve[] c, float time, Quaternion q)
        {
            c[0].AddKey(time, q.x);
            c[1].AddKey(time, q.y);
            c[2].AddKey(time, q.z);
            c[3].AddKey(time, q.w);
        }

        private static void SetQuatCurves(AnimationClip clip, string path, AnimationCurve[] c)
        {
            for (int i = 0; i < c.Length; i++)
                for (int k = 0; k < c[i].length; k++)
                    c[i].SmoothTangents(k, 0f);
            clip.SetCurve(path, typeof(Transform), "m_LocalRotation.x", c[0]);
            clip.SetCurve(path, typeof(Transform), "m_LocalRotation.y", c[1]);
            clip.SetCurve(path, typeof(Transform), "m_LocalRotation.z", c[2]);
            clip.SetCurve(path, typeof(Transform), "m_LocalRotation.w", c[3]);
        }

        // ------------------------------------------------------------------ UI (TextMeshPro, FFFFORWA SDF)

        private static TMP_FontAsset _font;
        private static Material _fontOutline;

        private static RunnerUI CreateUI()
        {
            _font = AssetDatabase.LoadAssetAtPath<TMP_FontAsset>(TmpFontPath);
            if (_font == null) Debug.LogWarning("[TempleRun] TMP font not found: " + TmpFontPath);
            _fontOutline = AssetDatabase.LoadAssetAtPath<Material>(TmpOutlineMatPath);
            Sprite rounded = AssetDatabase.GetBuiltinExtraResource<Sprite>("UI/Skin/UISprite.psd");
            Sprite knob = AssetDatabase.GetBuiltinExtraResource<Sprite>("UI/Skin/Knob.psd");
            Sprite hand = AssetDatabase.LoadAssetAtPath<Sprite>(HandSpritePath);
            if (hand == null) hand = knob;

            GameObject canvasGo = new GameObject("TempleRun_Canvas", typeof(RectTransform), typeof(Canvas),
                typeof(CanvasScaler), typeof(GraphicRaycaster));
            Canvas canvas = canvasGo.GetComponent<Canvas>();
            canvas.renderMode = RenderMode.ScreenSpaceOverlay;
            canvas.sortingOrder = 10;
            CanvasScaler scaler = canvasGo.GetComponent<CanvasScaler>();
            scaler.uiScaleMode = CanvasScaler.ScaleMode.ScaleWithScreenSize;
            scaler.referenceResolution = new Vector2(1080f, 1920f);
            scaler.matchWidthOrHeight = 0.5f;

            RunnerUI ui = canvasGo.AddComponent<RunnerUI>();
            GameObject bloodPrefab = AssetDatabase.LoadAssetAtPath<GameObject>(GenDir + "/Prefabs/TR_BloodSplashUI.prefab");
            if (bloodPrefab != null)
            {
                GameObject blood = (GameObject)PrefabUtility.InstantiatePrefab(bloodPrefab, canvasGo.transform);
                ui.bloodSplash = blood.GetComponent<Image>();
                Transform tint = blood.transform.Find("ScreenTint");
                if (tint != null) ui.bloodScreenTint = tint.GetComponent<Image>();
                var spots = new System.Collections.Generic.List<Image>();
                foreach (Transform child in blood.transform)
                    if (child.name.StartsWith("BloodSpot")) spots.Add(child.GetComponent<Image>());
                ui.bloodSpots = spots.ToArray();
                blood.SetActive(false);
            }
            Transform root = canvasGo.transform;
            ui.distanceText = Label("DistanceText", root, "0 M", 40, Color.white, new Vector2(0.5f, 1f), new Vector2(0.5f, 1f));
            ui.distanceText.rectTransform.sizeDelta = new Vector2(260f, 70f);
            ui.distanceText.rectTransform.anchoredPosition = new Vector2(0f, -110f);

            // HUD: coin counter (top left)
            RectTransform hud = Rect("CoinCounter", root, new Vector2(0f, 1f), new Vector2(0f, 1f), new Vector2(230f, -110f), new Vector2(340f, 120f));
            Image hudBg = hud.gameObject.AddComponent<Image>();
            hudBg.sprite = rounded;
            hudBg.type = Image.Type.Sliced;
            hudBg.color = new Color(0f, 0f, 0f, 0.45f);
            hudBg.raycastTarget = false;
            RectTransform icon = Rect("CoinIcon", hud, new Vector2(0f, 0.5f), new Vector2(0f, 0.5f), new Vector2(65f, 0f), new Vector2(86f, 86f));
            Image iconImg = icon.gameObject.AddComponent<Image>();
            iconImg.sprite = knob;
            iconImg.color = new Color(1f, 0.75f, 0.1f);
            iconImg.raycastTarget = false;
            ui.coinIcon = icon;
            ui.coinText = Label("CoinText", hud, "0", 64, Color.white, new Vector2(0.3f, 0f), new Vector2(1f, 1f));

            // Countdown (top right)
            RectTransform cd = Rect("Countdown", root, new Vector2(1f, 1f), new Vector2(1f, 1f), new Vector2(-200f, -110f), new Vector2(300f, 120f));
            Image cdBg = cd.gameObject.AddComponent<Image>();
            cdBg.sprite = rounded;
            cdBg.type = Image.Type.Sliced;
            cdBg.color = new Color(0f, 0f, 0f, 0.45f);
            cdBg.raycastTarget = false;
            ui.countdownText = Label("CountdownText", cd, "0:15", 64, Color.white, Vector2.zero, Vector2.one);
            ui.countdownRoot = cd.gameObject;
            cd.gameObject.SetActive(false);

            // Tutorial 1: hand swiping left <-> right
            RectTransform move = Rect("TutMove", root, Vector2.zero, Vector2.one, Vector2.zero, Vector2.zero);
            Label("TutMoveText", move, "SWIPE LEFT OR RIGHT", 70, Color.white, new Vector2(0f, 0.36f), new Vector2(1f, 0.44f));
            ui.moveHand = HandImage("Hand", move, hand, new Vector2(0.5f, 0.24f));
            ui.moveHandRoot = move.gameObject;
            move.gameObject.SetActive(false);

            // Tutorial 2: hand swiping up
            RectTransform jump = Rect("TutJump", root, Vector2.zero, Vector2.one, Vector2.zero, Vector2.zero);
            Label("TutJumpText", jump, "SWIPE UP TO JUMP!", 70, new Color(1f, 0.9f, 0.25f), new Vector2(0f, 0.36f), new Vector2(1f, 0.44f));
            ui.jumpHand = HandImage("Hand", jump, hand, new Vector2(0.5f, 0.14f));
            ui.jumpHandRoot = jump.gameObject;
            jump.gameObject.SetActive(false);

            // End panel (full screen CTA)
            RectTransform end = Rect("EndPanel", root, Vector2.zero, Vector2.one, Vector2.zero, Vector2.zero);
            Image endBg = end.gameObject.AddComponent<Image>();
            endBg.color = new Color(0f, 0f, 0f, 0.65f);
            Button endBgButton = end.gameObject.AddComponent<Button>();
            endBgButton.targetGraphic = endBg;
            endBgButton.transition = Selectable.Transition.None;
            ui.endTitleText = Label("EndTitle", end, "GREAT RUN!", 110, new Color(1f, 0.85f, 0.2f), new Vector2(0f, 0.64f), new Vector2(1f, 0.78f));
            ui.endCoinsText = Label("EndCoins", end, "0", 100, Color.white, new Vector2(0f, 0.53f), new Vector2(1f, 0.63f));
            ui.endCtaButton = MakeButton("EndCtaButton", end, "PLAY NOW", rounded, new Color(1f, 0.55f, 0.1f),
                new Vector2(0.5f, 0.36f), new Vector2(720f, 200f));
            ui.endPanel = end.gameObject;
            ui.endBackgroundButton = endBgButton; // tapping anywhere on the end screen also opens the store
            end.gameObject.SetActive(false);

            return ui;
        }

        private static RectTransform HandImage(string name, Transform parent, Sprite sprite, Vector2 anchor)
        {
            RectTransform rt = Rect(name, parent, anchor, anchor, Vector2.zero, new Vector2(190f, 223f));
            rt.pivot = new Vector2(0.35f, 0.9f); // fingertip
            Image img = rt.gameObject.AddComponent<Image>();
            img.sprite = sprite;
            img.preserveAspect = true;
            img.raycastTarget = false;
            return rt;
        }

        private static RectTransform Rect(string name, Transform parent, Vector2 anchorMin, Vector2 anchorMax, Vector2 pos, Vector2 size)
        {
            GameObject go = new GameObject(name, typeof(RectTransform));
            RectTransform rt = go.GetComponent<RectTransform>();
            rt.SetParent(parent, false);
            rt.anchorMin = anchorMin;
            rt.anchorMax = anchorMax;
            rt.anchoredPosition = pos;
            rt.sizeDelta = size;
            return rt;
        }

        private static TextMeshProUGUI Label(string name, Transform parent, string text, float size, Color color,
            Vector2 anchorMin, Vector2 anchorMax)
        {
            RectTransform rt = Rect(name, parent, anchorMin, anchorMax, Vector2.zero, Vector2.zero);
            TextMeshProUGUI t = rt.gameObject.AddComponent<TextMeshProUGUI>();
            if (_font != null) t.font = _font;
            if (_font != null) t.fontSharedMaterial = AssetDatabase.LoadAssetAtPath<Material>("Assets/_Playable_/TempleRun/Generated/Materials/TR_FontLuna.mat") ?? _font.material;
            t.fontStyle = FontStyles.Bold;
            t.text = text;
            t.fontSize = size;
            t.enableAutoSizing = true;
            t.fontSizeMin = size * 0.45f;
            t.fontSizeMax = size;
            t.margin = new Vector4(24f, 4f, 24f, 4f);
            t.color = color;
            t.alignment = TextAlignmentOptions.Center;
            t.textWrappingMode = TextWrappingModes.NoWrap;
            t.overflowMode = TextOverflowModes.Overflow;
            t.raycastTarget = false;
            return t;
        }

        private static Button MakeButton(string name, Transform parent, string text, Sprite sprite, Color color,
            Vector2 anchor, Vector2 size)
        {
            RectTransform rt = Rect(name, parent, anchor, anchor, Vector2.zero, size);
            Image img = rt.gameObject.AddComponent<Image>();
            img.sprite = sprite;
            img.type = Image.Type.Sliced;
            img.color = color;
            Button b = rt.gameObject.AddComponent<Button>();
            b.targetGraphic = img;
            Label("Text", rt, text, 76, Color.white, Vector2.zero, Vector2.one);
            return b;
        }

        private static void EnsureEventSystem()
        {
            if (Object.FindFirstObjectByType<EventSystem>() != null) return;
            new GameObject("EventSystem", typeof(EventSystem), typeof(StandaloneInputModule));
        }

        // ------------------------------------------------------------------ utils

        private static void EnsureFolder(string path)
        {
            if (AssetDatabase.IsValidFolder(path)) return;
            string parent = Path.GetDirectoryName(path).Replace('\\', '/');
            string leaf = Path.GetFileName(path);
            EnsureFolder(parent);
            AssetDatabase.CreateFolder(parent, leaf);
        }
    }
}
