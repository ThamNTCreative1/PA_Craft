using System;
using System.Collections.Generic;
using System.IO;
using TMPro;
using UnityEditor;
using UnityEditor.Animations;
using UnityEditor.SceneManagement;
using UnityEngine;
using UnityEngine.EventSystems;
using UnityEngine.Rendering;
using UnityEngine.TextCore.LowLevel;
using UnityEngine.UI;
using Object = UnityEngine.Object;

namespace Playable.ChooseMonster.EditorTools
{
    /// <summary>
    /// Dựng playable "Choose Your Monster" (V83) vào Assets/_Playable_/Scenes/Gameplay.unity.
    ///
    /// Theo quy ước repo (xem MonsterArmy/Editor/MonsterArmySetup.cs): scene sinh ra từ code qua menu,
    /// nội dung cũ của Gameplay.unity bị XOÁ — khôi phục bằng
    /// `git checkout -- Assets/_Playable_/Scenes/Gameplay.unity`.
    ///
    /// Model .glb (glTFast) không có xương: mỗi khối lập phương được phân vào Đầu/Thân/Tay/Chân theo vị trí
    /// rồi gộp thành mesh từng khớp (asset riêng, material Standard dùng texture png gốc) để chạy clip
    /// Idle/Walk sinh bằng code. Boss chỉ cần thở nên gộp thành 1 mesh.
    /// </summary>
    public static class ChooseMonsterSetup
    {
        private const string Root = "Assets/_Playable_/ChooseMonster/";
        private const string Gen = Root + "Generated/";
        private const string UiDir = "Assets/_Playable_/2D Texture/V83 - Chooser your monster (Assets Playable) (ThuLH) (AnhNTN)/";
        private const string ModelDir = "Assets/_Playable_/3D Model/Monster/";
        private const string WeakModel = ModelDir + "MODHUB-2C3AE66F806BF2A919/goat-monster-wendigo-minecraft-blockbench-model.glb";
        private const string StrongModel = ModelDir + "MODHUB-47935C695969EAE2C2/wendigo-minecraft-model.glb";
        private const string BossModel = ModelDir + "MODHUB-05593C1263DD5BE796/minecraft-cerberus.glb";
        private const string ScenePath = "Assets/_Playable_/Scenes/Gameplay.unity";
        private const string FontSourcePath = "Assets/Game/Fonts/FFFFORWA.TTF";
        private const string HandPath = "Assets/_Playable_/TempleRun/UI/Sprites/hand.png";
        private const string PlayerPrefabPath = "Assets/Game/Resources/Models/Equipments/S_Base_03.prefab";
        private const string MonsterAudio = "Assets/_Playable_/MonsterArmy/Audio/";
        private const string FontChars =
            " !\"#$%&'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[]_abcdefghijklmnopqrstuvwxyz";

        // Toạ độ bố cục thế giới (trục +Z là hướng đi vào).
        private const float GateZ = 5.4f;
        private const float GateX = 1.9f;
        private const float OpeningWidth = 2.9f;
        private const float OpeningHeight = 5.2f;
        private static readonly Vector3 PlayerStart = new Vector3(0f, 0f, 0.6f);
        private static readonly Vector3 BattleSpot = new Vector3(0f, 0f, 24f);
        private static readonly Vector3 BossSpot = new Vector3(0f, 0f, 33.5f);

        private const float BarW = 594f, BarH = 149f;

        private static TMP_FontAsset _font;
        private static Material _fontOutline;

        /// <summary>Ngưỡng phân khớp cho model khối (toạ độ đã quay mặt về +Z, chưa dời gốc).</summary>
        private struct RigSpec
        {
            public float HeadY;   // khối có tâm cao hơn → Đầu
            public float ArmX;    // |x| lớn hơn → Tay
            public float LegTop;  // tâm thấp hơn (và lệch khỏi trục giữa) → Chân

            public RigSpec(float headY, float armX, float legTop)
            {
                HeadY = headY;
                ArmX = armX;
                LegTop = legTop;
            }
        }

        private static readonly RigSpec WeakRig = new RigSpec(2.65f, 0.5f, 1.45f);
        private static readonly RigSpec StrongRig = new RigSpec(2.88f, 0.45f, 1.45f);

        [MenuItem("Tools/Choose Monster/Setup Playable")]
        public static void Apply()
        {
            if (!Application.isBatchMode && !EditorUtility.DisplayDialog("Choose Your Monster",
                    "Xoá sạch nội dung hiện tại của Gameplay.unity rồi dựng lại playable Choose Your Monster?\n\n" +
                    "Khôi phục được bằng: git checkout -- " + ScenePath,
                    "Dựng", "Huỷ"))
                return;
            Build();
        }

        /// <summary>Bản không hỏi — gọi được từ script/MCP.</summary>
        public static void Build()
        {
            EnsureFolder(Root.TrimEnd('/'));
            EnsureFolder(Gen.TrimEnd('/'));
            TiledCache.Clear();

            Assets assets = BuildAssets();

            var scene = EditorSceneManager.OpenScene(ScenePath);
            foreach (GameObject old in scene.GetRootGameObjects()) Object.DestroyImmediate(old);
            ConfigureRenderSettings();

            var root = new GameObject("ChooseMonsterPlayable");
            CreateEventSystem(root.transform);
            CreateAudioManager(root.transform);
            ChooseAudio audio = CreateAudio(root.transform);
            CreateLight(root.transform);
            ShotCamera shot = CreateCamera(root.transform);
            BuildEnvironment(root.transform, assets);

            Transform player;
            Animator playerAnimator;
            CreatePlayer(root.transform, out player, out playerAnimator);

            MonsterGate weak = CreateGate(root.transform, "Gate Weak", -GateX, WeakModel, WeakRig, assets.WeakMaterial,
                2.9f, assets.BluePortal, assets.WeakPortrait, 3, assets);
            MonsterGate strong = CreateGate(root.transform, "Gate Strong", GateX, StrongModel, StrongRig, assets.StrongMaterial,
                3.6f, assets.OrangePortal, assets.StrongPortrait, 50, assets);
            FighterView boss = CreateAnimatedBoss(root.transform, BossModel, assets.BossMaterial, assets.Flash,
                5f, BossSpot, Quaternion.Euler(0f, 180f, 0f));
            var spot = new GameObject("Battle Spot").transform;
            spot.SetParent(root.transform, false);
            spot.position = BattleSpot;

            Ui ui = BuildUi(root.transform, shot.Camera, assets, new[] { weak, strong });

            var controller = root.AddComponent<ChooseMonsterController>();
            GameManager gameManager = CreateGameManager(root, ui);
            Wire(controller, gameManager, shot, audio, new[] { weak, strong }, player, playerAnimator, boss, spot, ui);

            EditorSceneManager.MarkSceneDirty(scene);
            EditorSceneManager.SaveScene(scene);
            AssetDatabase.SaveAssets();
            Debug.Log("[ChooseMonster] Dựng xong playable vào " + ScenePath);
        }

        // ================================================================== assets

        private sealed class PortalMaterials
        {
            public Material Backdrop, SwirlA, SwirlB, Core, Sparks, Glow;
        }

        private sealed class Assets
        {
            public Mesh WeakMesh, StrongMesh, BossMesh;
            public Material WeakMaterial, StrongMaterial, BossMaterial;
            public Material Flash;
            public PortalMaterials BluePortal, OrangePortal;
            public Material Stone, Brick, ArenaFloor, Lava, Torch;
            public Sprite WeakPortrait, StrongPortrait;
            public Sprite PlayerFrame, PlayerFill, BossFrame, BossFill;
            public RuntimeAnimatorController MonsterController;
        }

        private static Assets BuildAssets()
        {
            BuildFont();

            var a = new Assets();
            a.WeakMesh = BakeModel(WeakModel, "Mesh_Weak");
            a.StrongMesh = BakeModel(StrongModel, "Mesh_Strong");
            a.BossMesh = BakeModel(BossModel, "Mesh_Boss");
            a.WeakMaterial = ModelMaterial(WeakModel, "M_Weak");
            a.StrongMaterial = ModelMaterial(StrongModel, "M_Strong");
            a.BossMaterial = ModelMaterial(BossModel, "M_Boss");
            a.Flash = UnlitColor("M_Flash", Color.white);

            Texture2D spiral = SpiralTexture("T_PortalSpiral");
            Texture2D dot = SoftDotTexture("T_SoftDot");
            a.BluePortal = PortalSet("Blue", new Color(0.05f, 0.14f, 0.42f), new Color(0.4f, 0.85f, 1f), spiral, dot);
            a.OrangePortal = PortalSet("Orange", new Color(0.42f, 0.1f, 0.02f), new Color(1f, 0.62f, 0.15f), spiral, dot);

            a.Stone = LitPixel("M_Stone", PixelTexture("T_Stone", PixelKind.Stone));
            a.Brick = LitPixel("M_Brick", PixelTexture("T_Brick", PixelKind.Brick));
            a.ArenaFloor = LitPixel("M_ArenaFloor", PixelTexture("T_ArenaFloor", PixelKind.Arena));
            a.Lava = UnlitTexture("M_Lava", PixelTexture("T_Lava", PixelKind.Lava));
            a.Torch = UnlitColor("M_Torch", new Color(1f, 0.7f, 0.25f));

            a.WeakPortrait = RenderPortrait(a.WeakMesh, a.WeakMaterial, "Portrait_Weak");
            a.StrongPortrait = RenderPortrait(a.StrongMesh, a.StrongMaterial, "Portrait_Strong");

            BarSprites("pp.png", "Bar_Player", true, out a.PlayerFrame, out a.PlayerFill);
            BarSprites("boss.png", "Bar_Boss", false, out a.BossFrame, out a.BossFill);

            a.MonsterController = BuildMonsterAnimator();
            return a;
        }

        // ------------------------------------------------------------------ font

        /// <summary>
        /// FFFFORWA SDF.asset có sẵn là static nhưng chỉ chứa 35 ký tự (thiếu Y, H, T, K, !...),
        /// còn bản Dynamic thì phụ thuộc atlas tự lấp lúc chạy. Sinh một font asset STATIC riêng
        /// chứa đủ bộ ký tự ASCII từ FFFFORWA.TTF.
        /// </summary>
        private static void BuildFont()
        {
            string path = Gen + "FFFFORWA Static SDF.asset";
            string outlinePath = Gen + "FFFFORWA Static Outline.mat";
            var source = AssetDatabase.LoadAssetAtPath<Font>(FontSourcePath);
            if (source == null) throw new InvalidOperationException("Missing font: " + FontSourcePath);

            if (AssetDatabase.LoadAssetAtPath<TMP_FontAsset>(path) != null) AssetDatabase.DeleteAsset(path);
            TMP_FontAsset font = TMP_FontAsset.CreateFontAsset(source, 64, 8, GlyphRenderMode.SDFAA, 1024, 1024,
                AtlasPopulationMode.Dynamic, false);
            font.name = "FFFFORWA Static SDF";
            string missing;
            font.TryAddCharacters(FontChars, out missing);
            if (!string.IsNullOrEmpty(missing)) Debug.LogWarning("[ChooseMonster] Font thiếu ký tự: " + missing);
            AssetDatabase.CreateAsset(font, path);
            Texture2D atlas = font.atlasTextures[0];
            atlas.name = "FFFFORWA Static Atlas";
            AssetDatabase.AddObjectToAsset(atlas, font);
            font.material.name = "FFFFORWA Static Material";
            AssetDatabase.AddObjectToAsset(font.material, font);
            font.atlasPopulationMode = AtlasPopulationMode.Static;
            EditorUtility.SetDirty(font);
            AssetDatabase.SaveAssets();

            var outline = new Material(font.material) { name = "FFFFORWA Static Outline" };
            outline.EnableKeyword("OUTLINE_ON");
            outline.SetFloat("_OutlineWidth", 0.28f);
            outline.SetColor("_OutlineColor", new Color32(0x17, 0x27, 0x49, 0xFF));
            outline.SetFloat("_FaceDilate", 0.1f);
            if (AssetDatabase.LoadAssetAtPath<Material>(outlinePath) != null) AssetDatabase.DeleteAsset(outlinePath);
            AssetDatabase.CreateAsset(outline, outlinePath);

            _font = font;
            _fontOutline = outline;
        }

        // ------------------------------------------------------------------ models

        /// <summary>
        /// Gộp toàn bộ mesh con của model glTF thành 1 mesh: quay 180° để mặt hướng +Z,
        /// gốc toạ độ đặt ở giữa đáy (chân chạm y = 0).
        /// </summary>
        private static Mesh BakeModel(string glbPath, string name)
        {
            var parts = CollectCubes(glbPath);
            Vector3 offset = ModelOffset(parts);
            var all = new List<CubePart>(parts);
            Mesh mesh = CombineParts(all, Matrix4x4.Translate(offset), name);
            return SaveMesh(mesh, name);
        }

        private struct CubePart
        {
            public Mesh Mesh;
            public Matrix4x4 Matrix;   // vào không gian model đã quay 180°
            public Bounds Bounds;      // trong không gian đó
        }

        private static List<CubePart> CollectCubes(string glbPath)
        {
            var prefab = AssetDatabase.LoadAssetAtPath<GameObject>(glbPath);
            if (prefab == null) throw new InvalidOperationException("Missing model: " + glbPath);
            var instance = (GameObject)Object.Instantiate(prefab);
            var parts = new List<CubePart>();
            try
            {
                instance.transform.position = Vector3.zero;
                instance.transform.rotation = Quaternion.identity;
                instance.transform.localScale = Vector3.one;
                Matrix4x4 toRoot = Matrix4x4.Rotate(Quaternion.Euler(0f, 180f, 0f)) * instance.transform.worldToLocalMatrix;
                foreach (MeshFilter filter in instance.GetComponentsInChildren<MeshFilter>(true))
                {
                    if (filter.sharedMesh == null) continue;
                    Matrix4x4 m = toRoot * filter.transform.localToWorldMatrix;
                    parts.Add(new CubePart { Mesh = filter.sharedMesh, Matrix = m, Bounds = TransformBounds(filter.sharedMesh.bounds, m) });
                }
            }
            finally
            {
                Object.DestroyImmediate(instance);
            }
            return parts;
        }

        private static Vector3 ModelOffset(List<CubePart> parts)
        {
            Bounds b = parts[0].Bounds;
            foreach (CubePart p in parts) b.Encapsulate(p.Bounds);
            return new Vector3(-b.center.x, -b.min.y, -b.center.z);
        }

        private static Bounds TransformBounds(Bounds local, Matrix4x4 m)
        {
            Vector3 c = local.center, e = local.extents;
            var b = new Bounds(m.MultiplyPoint3x4(c), Vector3.zero);
            for (int x = -1; x <= 1; x += 2)
            for (int y = -1; y <= 1; y += 2)
            for (int z = -1; z <= 1; z += 2)
                b.Encapsulate(m.MultiplyPoint3x4(c + new Vector3(e.x * x, e.y * y, e.z * z)));
            return b;
        }

        private static Mesh CombineParts(List<CubePart> parts, Matrix4x4 post, string name)
        {
            var combine = new List<CombineInstance>();
            int vertexTotal = 0;
            foreach (CubePart p in parts)
            {
                vertexTotal += p.Mesh.vertexCount;
                for (int s = 0; s < p.Mesh.subMeshCount; s++)
                    combine.Add(new CombineInstance { mesh = p.Mesh, subMeshIndex = s, transform = post * p.Matrix });
            }
            var single = new Mesh { name = name };
            // Đặt indexFormat TRƯỚC khi có dữ liệu: đổi sau sẽ xoá index buffer.
            single.indexFormat = IndexFormat.UInt32;
            single.CombineMeshes(combine.ToArray(), true, true);
            return DoubleSided(single, name);
        }

        /// <summary>
        /// Material glTF gốc là doubleSided (nhiều mảng phẳng dày 0 như lông, tai, gai). Shader Standard
        /// luôn cull mặt sau, nên nhân đôi tam giác với winding + normal ngược để nhìn từ 2 phía đều thấy.
        /// </summary>
        private static Mesh DoubleSided(Mesh source, string name)
        {
            Vector3[] v = source.vertices;
            Vector3[] n = source.normals;
            Vector4[] t = source.tangents;
            Vector2[] uv = source.uv;
            int[] tri = source.triangles;
            int count = v.Length;
            var v2 = new Vector3[count * 2];
            var n2 = new Vector3[count * 2];
            var t2 = new Vector4[t.Length == count ? count * 2 : 0];
            var uv2 = new Vector2[count * 2];
            for (int i = 0; i < count; i++)
            {
                v2[i] = v2[i + count] = v[i];
                n2[i] = n.Length == count ? n[i] : Vector3.up;
                n2[i + count] = -n2[i];
                uv2[i] = uv2[i + count] = uv.Length == count ? uv[i] : Vector2.zero;
                if (t2.Length > 0)
                {
                    t2[i] = t[i];
                    t2[i + count] = new Vector4(-t[i].x, -t[i].y, -t[i].z, t[i].w);
                }
            }
            var tri2 = new int[tri.Length * 2];
            for (int i = 0; i < tri.Length; i += 3)
            {
                tri2[i] = tri[i];
                tri2[i + 1] = tri[i + 1];
                tri2[i + 2] = tri[i + 2];
                tri2[tri.Length + i] = tri[i] + count;
                tri2[tri.Length + i + 1] = tri[i + 2] + count;
                tri2[tri.Length + i + 2] = tri[i + 1] + count;
            }
            Object.DestroyImmediate(source);
            var mesh = new Mesh { name = name };
            mesh.indexFormat = count * 2 < 65000 ? IndexFormat.UInt16 : IndexFormat.UInt32;
            mesh.vertices = v2;
            mesh.normals = n2;
            if (t2.Length > 0) mesh.tangents = t2;
            mesh.uv = uv2;
            mesh.triangles = tri2;
            mesh.RecalculateBounds();
            return mesh;
        }

        private static Mesh SaveMesh(Mesh mesh, string name)
        {
            mesh.UploadMeshData(false);
            string path = Gen + name + ".asset";
            if (AssetDatabase.LoadAssetAtPath<Mesh>(path) != null) AssetDatabase.DeleteAsset(path);
            AssetDatabase.CreateAsset(mesh, path);
            return mesh;
        }

        /// <summary>
        /// Dựng con quái có khớp: Body(scale) → Bob → Hips → {Torso, Head, ArmL/R, LegL/R}.
        /// Mỗi khớp đặt pivot ở vai/hông/cổ để clip xoay quanh đúng điểm.
        /// </summary>
        private static MonsterActor CreateRiggedMonster(Transform parent, string name, string glbPath, RigSpec spec,
            Material material, Material flash, float height, RuntimeAnimatorController controller, Vector3 position, Quaternion rotation)
        {
            List<CubePart> cubes = CollectCubes(glbPath);
            Vector3 offset = ModelOffset(cubes);
            var groups = new Dictionary<string, List<CubePart>>();
            foreach (CubePart cube in cubes)
            {
                Vector3 c = cube.Bounds.center;
                string key;
                if (c.y > spec.HeadY) key = "Head";
                else if (Mathf.Abs(c.x) > spec.ArmX) key = c.x > 0f ? "ArmR" : "ArmL";
                else if (c.y < spec.LegTop && Mathf.Abs(c.x) > 0.08f) key = c.x > 0f ? "LegR" : "LegL";
                else key = "Torso";
                List<CubePart> list;
                if (!groups.TryGetValue(key, out list)) groups[key] = list = new List<CubePart>();
                list.Add(cube);
            }

            var rootGo = new GameObject(name);
            rootGo.transform.SetParent(parent, false);
            rootGo.transform.position = position;
            rootGo.transform.rotation = rotation;

            var body = new GameObject("Body").transform;
            body.SetParent(rootGo.transform, false);
            float rawHeight = -offset.y;
            Bounds all = cubes[0].Bounds;
            foreach (CubePart p in cubes) all.Encapsulate(p.Bounds);
            rawHeight = all.size.y;
            float scale = height / Mathf.Max(0.01f, rawHeight);
            body.localScale = Vector3.one * scale;

            var renderers = new List<Object>();
            var bob = new GameObject("Bob").transform;
            bob.SetParent(body, false);
            Vector3 hipsPivot = new Vector3(0f, spec.LegTop, 0f) + offset;
            var hips = new GameObject("Hips").transform;
            hips.SetParent(bob, false);
            hips.localPosition = hipsPivot;

            foreach (KeyValuePair<string, List<CubePart>> group in groups)
            {
                Bounds gb = group.Value[0].Bounds;
                foreach (CubePart p in group.Value) gb.Encapsulate(p.Bounds);
                gb.center += offset;
                Vector3 pivot;
                switch (group.Key)
                {
                    case "Head": pivot = new Vector3(0f, gb.min.y, gb.center.z); break;
                    case "ArmL":
                    case "ArmR": pivot = new Vector3(gb.center.x, gb.max.y - gb.size.y * 0.12f, gb.center.z); break;
                    case "LegL":
                    case "LegR": pivot = new Vector3(gb.center.x, gb.max.y, gb.center.z); break;
                    default: pivot = hipsPivot; break;
                }

                Transform joint;
                if (group.Key == "Torso") joint = hips;
                else
                {
                    joint = new GameObject(group.Key).transform;
                    joint.SetParent(hips, false);
                    joint.localPosition = pivot - hipsPivot;
                }

                Mesh mesh = CombineParts(group.Value, Matrix4x4.Translate(offset - pivot), "Rig_" + name.Replace(" ", "") + "_" + group.Key);
                mesh = SaveMesh(mesh, "Rig_" + Path.GetFileNameWithoutExtension(glbPath).Substring(0, 6) + "_" + group.Key);
                var meshGo = new GameObject(group.Key + " Mesh", typeof(MeshFilter), typeof(MeshRenderer));
                meshGo.transform.SetParent(joint, false);
                meshGo.GetComponent<MeshFilter>().sharedMesh = mesh;
                var renderer = meshGo.GetComponent<MeshRenderer>();
                renderer.sharedMaterial = material;
                renderer.shadowCastingMode = ShadowCastingMode.Off;
                renderers.Add(renderer);
            }

            Animator animator = rootGo.AddComponent<Animator>();
            animator.runtimeAnimatorController = controller;
            animator.cullingMode = AnimatorCullingMode.AlwaysAnimate;
            animator.applyRootMotion = false;

            MonsterActor actor = rootGo.AddComponent<MonsterActor>();
            var so = new SerializedObject(actor);
            so.FindProperty("_animator").objectReferenceValue = animator;
            SetArray(so, "_renderers", renderers);
            so.FindProperty("_flashMaterial").objectReferenceValue = flash;
            so.FindProperty("_height").floatValue = height;
            so.FindProperty("_reach").floatValue = all.size.z * scale * 0.5f;
            so.ApplyModifiedPropertiesWithoutUndo();
            return actor;
        }

        // ------------------------------------------------------------------ animation

        private const string HipsPath = "Body/Bob/Hips";

        /// <summary>Clip Idle/Walk dùng chung (cùng tên khớp) + controller bool "Walking".</summary>
        private static RuntimeAnimatorController BuildMonsterAnimator()
        {
            AnimationClip idle = BuildClip("Monster_Idle", 2.4f, 24, (t, k) =>
            {
                float s = Mathf.Sin(t * Mathf.PI * 2f);
                float c = Mathf.Cos(t * Mathf.PI * 2f);
                switch (k)
                {
                    case "Bob": return new Vector3(0f, -0.04f * (0.5f - 0.5f * c), 0f);
                    case "Hips": return new Vector3(s * 1.5f, 0f, 0f);
                    case "Head": return new Vector3(-4f * s, 3f * Mathf.Sin(t * Mathf.PI * 4f) * 0.5f, 0f);
                    case "ArmL": return new Vector3(5f * s, 0f, -3f - 3f * c);
                    case "ArmR": return new Vector3(5f * s, 0f, 3f + 3f * c);
                    default: return Vector3.zero;
                }
            });
            AnimationClip walk = BuildClip("Monster_Walk", 0.85f, 24, (t, k) =>
            {
                float s = Mathf.Sin(t * Mathf.PI * 2f);
                float c2 = Mathf.Cos(t * Mathf.PI * 4f);
                switch (k)
                {
                    case "Bob": return new Vector3(0f, 0.09f * (0.5f - 0.5f * c2), 0f);
                    case "Hips": return new Vector3(4f, 6f * s, 0f);
                    case "Head": return new Vector3(-3f * c2, -5f * s, 0f);
                    case "LegL": return new Vector3(-32f * s, 0f, 0f);
                    case "LegR": return new Vector3(32f * s, 0f, 0f);
                    case "ArmL": return new Vector3(28f * s, 0f, -6f);
                    case "ArmR": return new Vector3(-28f * s, 0f, 6f);
                    default: return Vector3.zero;
                }
            });

            string path = Gen + "MonsterAnim.controller";
            if (AssetDatabase.LoadAssetAtPath<AnimatorController>(path) != null) AssetDatabase.DeleteAsset(path);
            AnimatorController controller = AnimatorController.CreateAnimatorControllerAtPath(path);
            controller.AddParameter("Walking", AnimatorControllerParameterType.Bool);
            AnimatorStateMachine machine = controller.layers[0].stateMachine;
            AnimatorState idleState = machine.AddState("Idle");
            idleState.motion = idle;
            AnimatorState walkState = machine.AddState("Walk");
            walkState.motion = walk;
            machine.defaultState = idleState;
            AnimatorStateTransition toWalk = idleState.AddTransition(walkState);
            toWalk.AddCondition(AnimatorConditionMode.If, 0f, "Walking");
            toWalk.hasExitTime = false;
            toWalk.duration = 0.12f;
            AnimatorStateTransition toIdle = walkState.AddTransition(idleState);
            toIdle.AddCondition(AnimatorConditionMode.IfNot, 0f, "Walking");
            toIdle.hasExitTime = false;
            toIdle.duration = 0.2f;
            EditorUtility.SetDirty(controller);
            return controller;
        }

        /// <param name="pose">(pha 0..1, tên khớp) → Euler (khớp) hoặc độ dời (Bob).</param>
        private static AnimationClip BuildClip(string name, float length, int samples, Func<float, string, Vector3> pose)
        {
            var clip = new AnimationClip { name = name, frameRate = 30f };
            string[] joints = { "Hips", "Head", "ArmL", "ArmR", "LegL", "LegR" };
            foreach (string joint in joints)
            {
                string path = joint == "Hips" ? HipsPath : HipsPath + "/" + joint;
                var curves = new AnimationCurve[4];
                for (int i = 0; i < 4; i++) curves[i] = new AnimationCurve();
                Quaternion prev = Quaternion.identity;
                for (int i = 0; i <= samples; i++)
                {
                    float t = (float)i / samples;
                    Quaternion q = Quaternion.Euler(pose(t % 1f, joint));
                    if (Quaternion.Dot(prev, q) < 0f) q = new Quaternion(-q.x, -q.y, -q.z, -q.w);
                    prev = q;
                    curves[0].AddKey(t * length, q.x);
                    curves[1].AddKey(t * length, q.y);
                    curves[2].AddKey(t * length, q.z);
                    curves[3].AddKey(t * length, q.w);
                }
                clip.SetCurve(path, typeof(Transform), "localRotation.x", Smooth(curves[0]));
                clip.SetCurve(path, typeof(Transform), "localRotation.y", Smooth(curves[1]));
                clip.SetCurve(path, typeof(Transform), "localRotation.z", Smooth(curves[2]));
                clip.SetCurve(path, typeof(Transform), "localRotation.w", Smooth(curves[3]));
            }

            var bx = new AnimationCurve();
            var by = new AnimationCurve();
            var bz = new AnimationCurve();
            for (int i = 0; i <= samples; i++)
            {
                float t = (float)i / samples;
                Vector3 p = pose(t % 1f, "Bob");
                bx.AddKey(t * length, p.x);
                by.AddKey(t * length, p.y);
                bz.AddKey(t * length, p.z);
            }
            clip.SetCurve("Body/Bob", typeof(Transform), "localPosition.x", Smooth(bx));
            clip.SetCurve("Body/Bob", typeof(Transform), "localPosition.y", Smooth(by));
            clip.SetCurve("Body/Bob", typeof(Transform), "localPosition.z", Smooth(bz));

            AnimationClipSettings settings = AnimationUtility.GetAnimationClipSettings(clip);
            settings.loopTime = true;
            AnimationUtility.SetAnimationClipSettings(clip, settings);
            clip.EnsureQuaternionContinuity();

            string assetPath = Gen + name + ".anim";
            if (AssetDatabase.LoadAssetAtPath<AnimationClip>(assetPath) != null) AssetDatabase.DeleteAsset(assetPath);
            AssetDatabase.CreateAsset(clip, assetPath);
            return clip;
        }

        private static AnimationCurve Smooth(AnimationCurve curve)
        {
            for (int i = 0; i < curve.length; i++) curve.SmoothTangents(i, 0f);
            return curve;
        }

        // ------------------------------------------------------------------ materials

        private static Material ModelMaterial(string glbPath, string name)
        {
            string texPath = Path.GetDirectoryName(glbPath).Replace('\\', '/') + "/textures/gltf_embedded_0.png";
            var importer = AssetImporter.GetAtPath(texPath) as TextureImporter;
            if (importer != null && (importer.filterMode != FilterMode.Point || importer.mipmapEnabled
                                     || importer.textureCompression != TextureImporterCompression.Uncompressed))
            {
                importer.filterMode = FilterMode.Point;
                importer.mipmapEnabled = false;
                importer.textureCompression = TextureImporterCompression.Uncompressed;
                importer.maxTextureSize = 512;
                importer.SaveAndReimport();
            }
            var tex = AssetDatabase.LoadAssetAtPath<Texture2D>(texPath);
            var m = new Material(Shader.Find("Standard")) { name = name };
            m.mainTexture = tex;
            m.SetFloat("_Glossiness", 0.08f);
            m.SetFloat("_Metallic", 0f);
            // glTF alphaMode = MASK: texture có nhiều vùng trong suốt. Vẽ opaque thì vùng đó lộ màu RGB ẩn
            // (Luna đọc PNG khác Editor nên ra xanh) -> bật Cutout như material gốc.
            m.SetFloat("_Mode", 1f);
            m.SetOverrideTag("RenderType", "TransparentCutout");
            m.SetInt("_SrcBlend", (int)BlendMode.One);
            m.SetInt("_DstBlend", (int)BlendMode.Zero);
            m.SetInt("_ZWrite", 1);
            m.SetFloat("_Cutoff", 0.5f);
            m.EnableKeyword("_ALPHATEST_ON");
            m.DisableKeyword("_ALPHABLEND_ON");
            m.DisableKeyword("_ALPHAPREMULTIPLY_ON");
            m.renderQueue = (int)RenderQueue.AlphaTest;
            return SaveMaterial(m);
        }

        private static PortalMaterials PortalSet(string name, Color dark, Color light, Texture2D spiral, Texture2D dot)
        {
            var set = new PortalMaterials();
            // Mặt cổng mờ trong: mọi lớp đều trong suốt một phần để vẫn nhìn rõ con quái đứng phía sau.
            // (Legacy particle shader nhân _TintColor x2, nên 0.5 = giữ nguyên.)
            set.Backdrop = ParticleMaterial("M_Portal" + name + "_Backdrop", "Legacy Shaders/Particles/Alpha Blended", null,
                new Color(dark.r * 0.5f, dark.g * 0.5f, dark.b * 0.5f, 0.08f));
            set.Glow = UnlitColor("M_Portal" + name + "_Glow", light);
            set.SwirlA = ParticleMaterial("M_Portal" + name + "_SwirlA", "Legacy Shaders/Particles/Alpha Blended", spiral,
                new Color(light.r * 0.5f, light.g * 0.5f, light.b * 0.5f, 0.1f));
            set.SwirlB = ParticleMaterial("M_Portal" + name + "_SwirlB", "Legacy Shaders/Particles/Additive", spiral,
                new Color(light.r * 0.5f, light.g * 0.5f, light.b * 0.5f, 0.11f));
            set.Core = ParticleMaterial("M_Portal" + name + "_Core", "Legacy Shaders/Particles/Additive", dot,
                new Color(light.r * 0.5f, light.g * 0.5f, light.b * 0.5f, 0.06f));
            set.Sparks = ParticleMaterial("M_Portal" + name + "_Sparks", "Legacy Shaders/Particles/Additive", dot,
                new Color(0.5f, 0.5f, 0.5f, 0.5f));
            return set;
        }

        private static Material ParticleMaterial(string name, string shader, Texture2D texture, Color tint)
        {
            Shader s = Shader.Find(shader);
            if (s == null) throw new InvalidOperationException("Missing shader: " + shader);
            var m = new Material(s) { name = name };
            m.mainTexture = texture;
            m.SetColor("_TintColor", tint);
            return SaveMaterial(m);
        }

        private static Material UnlitColor(string name, Color color)
        {
            var m = new Material(Shader.Find("Unlit/Color")) { name = name };
            m.color = color;
            return SaveMaterial(m);
        }

        private static Material UnlitTexture(string name, Texture2D texture)
        {
            var m = new Material(Shader.Find("Unlit/Texture")) { name = name };
            m.mainTexture = texture;
            return SaveMaterial(m);
        }

        private static Material LitPixel(string name, Texture2D texture)
        {
            var m = new Material(Shader.Find("Standard")) { name = name };
            m.mainTexture = texture;
            m.SetFloat("_Glossiness", 0.05f);
            m.SetFloat("_Metallic", 0f);
            return SaveMaterial(m);
        }

        private static Material SaveMaterial(Material m)
        {
            string path = Gen + m.name + ".mat";
            var existing = AssetDatabase.LoadAssetAtPath<Material>(path);
            if (existing != null)
            {
                existing.shader = m.shader;
                existing.CopyPropertiesFromMaterial(m);
                EditorUtility.SetDirty(existing);
                return existing;
            }
            AssetDatabase.CreateAsset(m, path);
            return m;
        }

        /// <summary>Material có tiling riêng (cube scale lớn mà vẫn giữ 1 ô pixel / 1 đơn vị).</summary>
        private static readonly Dictionary<string, Material> TiledCache = new Dictionary<string, Material>();

        private static Material Tiled(Material source, Vector2 tiling)
        {
            string key = source.name + "_" + Mathf.RoundToInt(tiling.x) + "x" + Mathf.RoundToInt(tiling.y);
            Material cached;
            if (TiledCache.TryGetValue(key, out cached) && cached != null) return cached;
            var m = new Material(source) { name = key };
            m.mainTextureScale = tiling;
            cached = SaveMaterial(m);
            TiledCache[key] = cached;
            return cached;
        }

        // ------------------------------------------------------------------ textures

        private enum PixelKind { Stone, Brick, Arena, Lava }

        private static Texture2D PixelTexture(string name, PixelKind kind)
        {
            const int size = 16;
            var rng = new System.Random(name.GetHashCode());
            var tex = new Texture2D(size, size, TextureFormat.RGBA32, false);
            for (int y = 0; y < size; y++)
            for (int x = 0; x < size; x++)
            {
                float n = (float)rng.NextDouble();
                Color c;
                switch (kind)
                {
                    case PixelKind.Stone:
                    {
                        float v = 0.34f + n * 0.1f;
                        if (n > 0.93f) v -= 0.12f;
                        c = new Color(v * 0.95f, v * 0.92f, v * 1.02f);
                        break;
                    }
                    case PixelKind.Brick:
                    {
                        bool mortarRow = y % 4 == 0;
                        bool mortarCol = ((x + (y / 4 % 2) * 4) % 8) == 0;
                        float v = mortarRow || mortarCol ? 0.14f : 0.26f + n * 0.08f;
                        c = new Color(v * 0.95f, v * 0.88f, v * 1.05f);
                        break;
                    }
                    case PixelKind.Arena:
                    {
                        bool edge = x % 8 == 0 || y % 8 == 0;
                        float v = edge ? 0.2f : 0.3f + n * 0.08f;
                        c = new Color(v * 1.05f, v * 0.82f, v * 1.25f);
                        break;
                    }
                    default:
                        c = Color.Lerp(new Color(0.95f, 0.3f, 0.05f), new Color(1f, 0.82f, 0.25f), n * n);
                        break;
                }
                c.a = 1f;
                tex.SetPixel(x, y, c);
            }
            tex.Apply();
            return SaveTexture(tex, name, false, FilterMode.Point, TextureWrapMode.Repeat);
        }

        /// <summary>Xoáy ốc 3 nhánh, sáng dần vào tâm, mép mờ — tô màu qua _TintColor.</summary>
        private static Texture2D SpiralTexture(string name)
        {
            const int size = 256;
            var tex = new Texture2D(size, size, TextureFormat.RGBA32, false);
            for (int y = 0; y < size; y++)
            for (int x = 0; x < size; x++)
            {
                float u = (x + 0.5f) / size * 2f - 1f;
                float v = (y + 0.5f) / size * 2f - 1f;
                float r = Mathf.Sqrt(u * u + v * v);
                float a = Mathf.Atan2(v, u);
                float s = 0.5f + 0.5f * Mathf.Sin(3f * a + 11f * Mathf.Sqrt(r) * 2f);
                float s2 = 0.5f + 0.5f * Mathf.Sin(5f * a - 7f * r);
                float band = Mathf.Clamp01(s * 0.75f + s2 * 0.35f);
                float edge = Mathf.Clamp01((1f - r) / 0.14f);
                float core = Mathf.Clamp01(1f - r * 1.6f);
                float value = Mathf.Clamp01(0.35f + band * 0.65f + core * core * 0.8f);
                float alpha = edge * Mathf.Clamp01(0.3f + band * 0.7f + core);
                tex.SetPixel(x, y, new Color(value, value, value, alpha));
            }
            tex.Apply();
            return SaveTexture(tex, name, false, FilterMode.Bilinear, TextureWrapMode.Clamp);
        }

        private static Texture2D SoftDotTexture(string name)
        {
            const int size = 64;
            var tex = new Texture2D(size, size, TextureFormat.RGBA32, false);
            for (int y = 0; y < size; y++)
            for (int x = 0; x < size; x++)
            {
                float u = (x + 0.5f) / size * 2f - 1f;
                float v = (y + 0.5f) / size * 2f - 1f;
                float r = Mathf.Clamp01(Mathf.Sqrt(u * u + v * v));
                float a = (1f - r) * (1f - r);
                tex.SetPixel(x, y, new Color(1f, 1f, 1f, a));
            }
            tex.Apply();
            return SaveTexture(tex, name, false, FilterMode.Bilinear, TextureWrapMode.Clamp);
        }

        /// <summary>
        /// Tách pp.png / boss.png thành khung (phần fill nướng sẵn được tô thành nền trắng,
        /// tab "Lv.5" của thanh quái được bỏ hẳn) và dải fill co giãn được.
        /// </summary>
        private static void BarSprites(string file, string name, bool eraseTab, out Sprite frame, out Sprite fill)
        {
            var src = new Texture2D(2, 2, TextureFormat.RGBA32, false);
            src.LoadImage(File.ReadAllBytes(UiDir + file));
            int w = src.width, h = src.height;
            Color[] px = src.GetPixels();

            // Vùng fill: x 149..447, y (tính từ trên) 60..127. Cột 520 là nền trắng cùng hàng.
            for (int yt = 60; yt <= 127; yt++)
            {
                int y = h - 1 - yt;
                Color empty = px[y * w + 520];
                for (int x = 149; x <= 447; x++)
                {
                    Color c = px[y * w + x];
                    if (c.a > 0.5f && IsFillColour(c)) px[y * w + x] = empty;
                }
            }

            if (eraseTab)
            {
                // Bỏ hẳn tab "Lv.5" (x ≥ 138, phía trên viền thanh ở y = 48); giữ ô chân dung bên trái.
                for (int yt = 0; yt <= 47; yt++)
                for (int x = 138; x < w; x++)
                    px[(h - 1 - yt) * w + x] = Color.clear;
            }

            var frameTex = new Texture2D(w, h, TextureFormat.RGBA32, false);
            frameTex.SetPixels(px);
            frameTex.Apply();
            frame = SaveSprite(frameTex, name + "_Frame");

            // Lớp fill cùng kích thước sprite gốc, phủ đúng hình lòng thanh (bo tròn đầu phải, khử răng cưa
            // theo độ "xa navy" của từng điểm ảnh khung) — đầy 100% là kín cả cây, không bị góc vuông.
            // Màu lấy theo hàng ở cột 200 của ảnh gốc (2 tông sáng/tối). Vẽ bằng Image Filled ngang.
            Color navyRef = new Color32(0x17, 0x27, 0x49, 0xFF);
            float whiteDist = ColourDistance(Color.white, navyRef);
            var fillTex = new Texture2D(w, h, TextureFormat.RGBA32, false);
            var maskTex = new Texture2D(w, h, TextureFormat.RGBA32, false);
            var clearPx = new Color[w * h];
            fillTex.SetPixels(clearPx);
            maskTex.SetPixels(clearPx);
            for (int yt = 48; yt <= 140; yt++)
            {
                int y = h - 1 - yt;
                Color rowColour = src.GetPixel(200, h - 1 - Mathf.Clamp(yt, 60, 127));
                for (int x = 140; x < w; x++)
                {
                    Color c = px[y * w + x];
                    if (c.a < 0.05f) continue;
                    float weight = Mathf.Clamp01(ColourDistance(c, navyRef) / whiteDist) * c.a;
                    if (weight < 0.03f) continue;
                    fillTex.SetPixel(x, y, new Color(rowColour.r, rowColour.g, rowColour.b, weight));
                    maskTex.SetPixel(x, y, new Color(1f, 1f, 1f, weight));
                }
            }
            fillTex.Apply();
            maskTex.Apply();
            fill = SaveSprite(fillTex, name + "_Fill");
            SaveSprite(maskTex, name + "_Mask");
        }

        private static float ColourDistance(Color a, Color b)
        {
            float dr = a.r - b.r, dg = a.g - b.g, db = a.b - b.b;
            return Mathf.Sqrt(dr * dr + dg * dg + db * db);
        }

        private static bool IsFillColour(Color c)
        {
            bool white = c.r > 0.9f && c.g > 0.9f && c.b > 0.9f;
            bool navy = c.r < 0.15f && c.g < 0.2f && c.b < 0.33f;
            return !white && !navy;
        }

        private static Sprite RenderPortrait(Mesh mesh, Material material, string name)
        {
            const int size = 256;
            var root = new GameObject("__portrait");
            try
            {
                var model = new GameObject("model", typeof(MeshFilter), typeof(MeshRenderer));
                model.transform.SetParent(root.transform, false);
                model.transform.position = new Vector3(5000f, 0f, 0f);
                model.transform.rotation = Quaternion.Euler(0f, 160f, 0f);
                model.GetComponent<MeshFilter>().sharedMesh = mesh;
                model.GetComponent<MeshRenderer>().sharedMaterial = material;

                var lightGo = new GameObject("light");
                lightGo.transform.SetParent(root.transform, false);
                var light = lightGo.AddComponent<Light>();
                light.type = LightType.Directional;
                light.intensity = 1.2f;
                lightGo.transform.rotation = Quaternion.Euler(30f, 200f, 0f);

                var camGo = new GameObject("cam");
                camGo.transform.SetParent(root.transform, false);
                var cam = camGo.AddComponent<Camera>();
                cam.clearFlags = CameraClearFlags.SolidColor;
                cam.orthographic = true;
                float h = mesh.bounds.size.y;
                Vector3 focus = model.transform.position + Vector3.up * h * 0.72f;
                cam.orthographicSize = h * 0.3f;
                cam.transform.position = focus + Vector3.back * 20f;
                cam.transform.LookAt(focus);
                cam.nearClipPlane = 0.1f;
                cam.farClipPlane = 60f;

                // Alpha của camera không đáng tin (tuỳ rendering path), nên render 2 lần trên nền
                // đen và trắng rồi suy ra alpha = 1 - (trắng - đen).
                Color oldAmbient = RenderSettings.ambientLight;
                AmbientMode oldMode = RenderSettings.ambientMode;
                bool oldFog = RenderSettings.fog;
                RenderSettings.ambientMode = AmbientMode.Flat;
                RenderSettings.ambientLight = new Color(0.55f, 0.55f, 0.6f);
                RenderSettings.fog = false;
                Color[] black = RenderPixels(cam, size, Color.black);
                Color[] white = RenderPixels(cam, size, Color.white);
                RenderSettings.ambientLight = oldAmbient;
                RenderSettings.ambientMode = oldMode;
                RenderSettings.fog = oldFog;

                var result = new Color[black.Length];
                for (int i = 0; i < result.Length; i++)
                {
                    float alpha = Mathf.Clamp01(1f - (white[i].g - black[i].g));
                    Color c = alpha > 0.001f ? black[i] / alpha : Color.clear;
                    c.a = alpha;
                    result[i] = c;
                }
                var tex = new Texture2D(size, size, TextureFormat.RGBA32, false);
                tex.SetPixels(result);
                tex.Apply();
                return SaveSprite(tex, name);
            }
            finally
            {
                Object.DestroyImmediate(root);
            }
        }

        private static Color[] RenderPixels(Camera cam, int size, Color background)
        {
            var rt = RenderTexture.GetTemporary(size, size, 24, RenderTextureFormat.ARGB32, RenderTextureReadWrite.sRGB);
            cam.backgroundColor = background;
            cam.targetTexture = rt;
            cam.Render();
            RenderTexture.active = rt;
            var tex = new Texture2D(size, size, TextureFormat.RGBA32, false);
            tex.ReadPixels(new Rect(0, 0, size, size), 0, 0);
            tex.Apply();
            RenderTexture.active = null;
            cam.targetTexture = null;
            RenderTexture.ReleaseTemporary(rt);
            Color[] pixels = tex.GetPixels();
            Object.DestroyImmediate(tex);
            return pixels;
        }

        private static Texture2D SaveTexture(Texture2D tex, string name, bool sprite, FilterMode filter, TextureWrapMode wrap)
        {
            string path = Gen + name + ".png";
            File.WriteAllBytes(path, tex.EncodeToPNG());
            Object.DestroyImmediate(tex);
            AssetDatabase.ImportAsset(path, ImportAssetOptions.ForceUpdate);
            var importer = (TextureImporter)AssetImporter.GetAtPath(path);
            importer.textureType = sprite ? TextureImporterType.Sprite : TextureImporterType.Default;
            if (sprite) importer.spriteImportMode = SpriteImportMode.Single;
            importer.mipmapEnabled = false;
            importer.alphaIsTransparency = true;
            importer.filterMode = filter;
            importer.wrapMode = wrap;
            importer.textureCompression = TextureImporterCompression.Uncompressed;
            importer.SaveAndReimport();
            return AssetDatabase.LoadAssetAtPath<Texture2D>(path);
        }

        private static Sprite SaveSprite(Texture2D tex, string name)
        {
            SaveTexture(tex, name, true, FilterMode.Bilinear, TextureWrapMode.Clamp);
            return AssetDatabase.LoadAssetAtPath<Sprite>(Gen + name + ".png");
        }

        private static Sprite LoadSprite(string path)
        {
            var importer = AssetImporter.GetAtPath(path) as TextureImporter;
            if (importer == null) throw new InvalidOperationException("Missing sprite: " + path);
            if (importer.textureType != TextureImporterType.Sprite || importer.mipmapEnabled)
            {
                importer.textureType = TextureImporterType.Sprite;
                importer.spriteImportMode = SpriteImportMode.Single;
                importer.mipmapEnabled = false;
                importer.alphaIsTransparency = true;
                importer.SaveAndReimport();
            }
            return AssetDatabase.LoadAssetAtPath<Sprite>(path);
        }

        // ================================================================== scene

        private static void ConfigureRenderSettings()
        {
            Color bg = new Color(0.11f, 0.05f, 0.17f);
            RenderSettings.skybox = null;
            RenderSettings.ambientMode = AmbientMode.Flat;
            RenderSettings.ambientLight = new Color(0.5f, 0.42f, 0.6f);
            RenderSettings.fog = true;
            RenderSettings.fogMode = FogMode.Linear;
            RenderSettings.fogColor = bg;
            RenderSettings.fogStartDistance = 28f;
            RenderSettings.fogEndDistance = 70f;
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
            music.volume = 0.25f;
            var sound = go.AddComponent<AudioSource>();
            sound.playOnAwake = false;
            Playable.AudioManager manager = go.AddComponent<Playable.AudioManager>();
            var so = new SerializedObject(manager);
            so.FindProperty("_audioMusic").objectReferenceValue = music;
            so.FindProperty("_audioSound").objectReferenceValue = sound;
            so.ApplyModifiedPropertiesWithoutUndo();
        }

        private static ChooseAudio CreateAudio(Transform parent)
        {
            var go = new GameObject("ChooseAudio", typeof(AudioSource));
            go.transform.SetParent(parent, false);
            var source = go.GetComponent<AudioSource>();
            source.playOnAwake = false;
            ChooseAudio audio = go.AddComponent<ChooseAudio>();
            var so = new SerializedObject(audio);
            so.FindProperty("_source").objectReferenceValue = source;
            var stepSource = go.AddComponent<AudioSource>();
            stepSource.playOnAwake = false;
            so.FindProperty("_stepSource").objectReferenceValue = stepSource;
            Clip(so, "_playerStep", "Assets/_Playable_/TempleRun/Audio/TR_Step.wav");
            Clip(so, "_monsterStep", "Assets/SoundFX/sfx_step.ogg");
            Clip(so, "_possess", "Assets/Sound/GetBonus.mp3");
            Clip(so, "_possessVoice", MonsterAudio + "MonsterVoice1.ogg");
            Clip(so, "_click", MonsterAudio + "ClickSound.ogg");
            Clip(so, "_portal", MonsterAudio + "Erise.ogg");
            Clip(so, "_roar", MonsterAudio + "MonsterRoar.ogg");
            Clip(so, "_slam", MonsterAudio + "BoxDestroy.ogg");
            Clip(so, "_monsterHit", MonsterAudio + "AxeHit.ogg");
            Clip(so, "_bossHit", MonsterAudio + "Kick.ogg");
            Clip(so, "_victory", MonsterAudio + "FireWorks.ogg");
            Clip(so, "_defeat", "Assets/_Playable_/Sound/ohh-no (mp3cut.net).mp3");
            so.ApplyModifiedPropertiesWithoutUndo();
            return audio;
        }

        private static void Clip(SerializedObject so, string field, string path)
        {
            var clip = AssetDatabase.LoadAssetAtPath<AudioClip>(path);
            if (clip == null) Debug.LogWarning("[ChooseMonster] Missing audio: " + path);
            so.FindProperty(field).objectReferenceValue = clip;
        }

        private static void CreateLight(Transform parent)
        {
            var go = new GameObject("Directional Light");
            go.transform.SetParent(parent, false);
            go.transform.rotation = Quaternion.Euler(48f, -35f, 0f);
            var light = go.AddComponent<Light>();
            light.type = LightType.Directional;
            light.color = new Color(1f, 0.93f, 0.85f);
            light.intensity = 1.05f;
            light.shadows = LightShadows.None;
        }

        private static ShotCamera CreateCamera(Transform parent)
        {
            var go = new GameObject("Main Camera", typeof(Camera), typeof(AudioListener));
            go.tag = "MainCamera";
            go.transform.SetParent(parent, false);
            go.transform.position = new Vector3(0f, 6f, -12f);
            go.transform.rotation = Quaternion.Euler(24f, 0f, 0f);
            var cam = go.GetComponent<Camera>();
            cam.clearFlags = CameraClearFlags.SolidColor;
            cam.backgroundColor = new Color(0.11f, 0.05f, 0.17f);
            cam.fieldOfView = 42f;
            cam.nearClipPlane = 0.2f;
            cam.farClipPlane = 120f;
            var shot = go.AddComponent<ShotCamera>();
            var so = new SerializedObject(shot);
            so.FindProperty("_camera").objectReferenceValue = cam;
            so.ApplyModifiedPropertiesWithoutUndo();
            return shot;
        }

        private static void BuildEnvironment(Transform parent, Assets a)
        {
            var env = new GameObject("Environment").transform;
            env.SetParent(parent, false);

            // Hành lang: sàn đá, 2 dải dung nham, cột + tường gạch, đuốc. Dừng ở z = 11.
            Block(env, "Corridor Floor", new Vector3(0f, -0.5f, 0f), new Vector3(8f, 1f, 22f), a.Stone);
            Block(env, "Lava L", new Vector3(-5.25f, -0.62f, 0f), new Vector3(2.5f, 1f, 22f), a.Lava);
            Block(env, "Lava R", new Vector3(5.25f, -0.62f, 0f), new Vector3(2.5f, 1f, 22f), a.Lava);
            for (int i = 0; i < 5; i++)
            {
                float z = -9f + i * 4f;
                for (int side = -1; side <= 1; side += 2)
                {
                    float x = side * 7.1f;
                    Block(env, "Pillar", new Vector3(x, 2.5f, z), new Vector3(1.4f, 6f, 1.4f), a.Brick);
                    Block(env, "Wall", new Vector3(x + side * 0.3f, 1.5f, z + 2f), new Vector3(1f, 4f, 2.6f), a.Brick);
                    Block(env, "Torch", new Vector3(x - side * 0.8f, 3.6f, z), new Vector3(0.25f, 0.45f, 0.25f), a.Torch);
                    Block(env, "Lava Bank", new Vector3(side * 6.75f, -0.5f, z + 2f), new Vector3(0.5f, 1f, 4f), a.Stone);
                }
            }

            // Đấu trường rộng phía sau cổng: cột chỉ ở rìa xa (x = ±19) và tường sau.
            Block(env, "Arena Floor", new Vector3(0f, -0.5f, 31f), new Vector3(90f, 1f, 42f), a.ArenaFloor);
            Block(env, "Arena Step", new Vector3(0f, -0.45f, 11.5f), new Vector3(10f, 1f, 1f), a.Brick);
            float[] heights = { 8f, 11f, 7f, 12f, 9f, 10f };
            for (int i = 0; i < 6; i++)
            {
                float z = 15f + i * 6.5f;
                // Chỉ dựng cột phía -X: camera đối mặt boss nhìn ngang từ phía +X, cột bên đó sẽ chắn tầm nhìn.
                for (int side = -1; side < 0; side += 2)
                {
                    float hgt = heights[(i + (side > 0 ? 3 : 0)) % heights.Length];
                    Block(env, "Arena Pillar", new Vector3(side * 19f, hgt * 0.5f - 0.5f, z), new Vector3(2.4f, hgt, 2.4f), a.Brick);
                    Block(env, "Arena Pillar Cap", new Vector3(side * 19f, hgt - 0.3f, z), new Vector3(3f, 0.6f, 3f), a.Stone);
                    Block(env, "Arena Torch", new Vector3(side * 17.6f, 4f, z), new Vector3(0.35f, 0.6f, 0.35f), a.Torch);
                }
            }
            for (int i = 0; i < 11; i++)
            {
                float x = -20f + i * 4f;
                float hgt = 7f + (i * 37 % 6);
                Block(env, "Back Wall", new Vector3(x, hgt * 0.5f - 0.5f, 51f), new Vector3(4f, hgt, 2f), a.Brick);
            }
            Block(env, "Arena Lava L", new Vector3(-10f, -0.08f, 24f), new Vector3(4f, 0.2f, 7f), a.Lava);
            Block(env, "Arena Lava R", new Vector3(10f, -0.08f, 38f), new Vector3(4f, 0.2f, 7f), a.Lava);
            Block(env, "Arena Lava Back", new Vector3(-6f, -0.08f, 46f), new Vector3(8f, 0.2f, 3f), a.Lava);
        }

        private static GameObject Block(Transform parent, string name, Vector3 position, Vector3 size, Material material)
        {
            var go = GameObject.CreatePrimitive(PrimitiveType.Cube);
            go.name = name;
            Object.DestroyImmediate(go.GetComponent<Collider>());
            go.transform.SetParent(parent, false);
            go.transform.localPosition = position;
            go.transform.localScale = size;
            var renderer = go.GetComponent<MeshRenderer>();
            renderer.shadowCastingMode = ShadowCastingMode.Off;
            renderer.receiveShadows = false;
            bool textured = material.HasProperty("_MainTex") && material.mainTexture != null
                            && material.mainTexture.wrapMode == TextureWrapMode.Repeat;
            renderer.sharedMaterial = textured
                ? Tiled(material, new Vector2(Mathf.Max(1f, Mathf.Round(size.x)), Mathf.Max(1f, Mathf.Round(Mathf.Max(size.y, size.z)))))
                : material;
            return go;
        }

        private static void CreatePlayer(Transform parent, out Transform player, out Animator animator)
        {
            var playerGo = new GameObject("Player");
            playerGo.transform.SetParent(parent, false);
            playerGo.transform.position = PlayerStart;

            var asset = AssetDatabase.LoadAssetAtPath<GameObject>(PlayerPrefabPath);
            if (asset == null) throw new InvalidOperationException("Missing player prefab: " + PlayerPrefabPath);
            var model = (GameObject)PrefabUtility.InstantiatePrefab(asset);
            model.transform.SetParent(playerGo.transform, false);
            model.transform.localPosition = Vector3.zero;
            model.transform.localRotation = Quaternion.identity;
            foreach (Collider c in model.GetComponentsInChildren<Collider>(true)) Object.DestroyImmediate(c);
            foreach (Renderer r in model.GetComponentsInChildren<Renderer>(true))
            {
                r.shadowCastingMode = ShadowCastingMode.Off;
                var smr = r as SkinnedMeshRenderer;
                if (smr != null) smr.updateWhenOffscreen = true;
            }
            animator = model.GetComponent<Animator>();
            animator.applyRootMotion = false;
            animator.cullingMode = AnimatorCullingMode.AlwaysAnimate;
            player = playerGo.transform;
        }

        // ------------------------------------------------------------------ gates

        private static MonsterGate CreateGate(Transform parent, string name, float x, string glbPath, RigSpec rig,
            Material material, float height, PortalMaterials pm, Sprite portrait, int level, Assets a)
        {
            var gateGo = new GameObject(name);
            gateGo.transform.SetParent(parent, false);
            gateGo.transform.position = new Vector3(x, 0f, GateZ);
            Transform t = gateGo.transform;

            // Khung đá + viền sáng màu cổng.
            float halfW = OpeningWidth * 0.5f;
            float pillarW = 0.5f;
            float topY = OpeningHeight + 0.1f;
            Block(t, "Pillar L", new Vector3(-halfW - pillarW * 0.5f, (topY + 0.6f) * 0.5f, 0f), new Vector3(pillarW, topY + 0.6f, 0.9f), a.Brick);
            Block(t, "Pillar R", new Vector3(halfW + pillarW * 0.5f, (topY + 0.6f) * 0.5f, 0f), new Vector3(pillarW, topY + 0.6f, 0.9f), a.Brick);
            Block(t, "Lintel", new Vector3(0f, topY + 0.35f, 0f), new Vector3(OpeningWidth + pillarW * 2f + 0.4f, 0.7f, 1.1f), a.Stone);
            Block(t, "Glow L", new Vector3(-halfW - 0.04f, topY * 0.5f, -0.47f), new Vector3(0.14f, topY, 0.06f), pm.Glow);
            Block(t, "Glow R", new Vector3(halfW + 0.04f, topY * 0.5f, -0.47f), new Vector3(0.14f, topY, 0.06f), pm.Glow);
            Block(t, "Glow Top", new Vector3(0f, topY + 0.02f, -0.57f), new Vector3(OpeningWidth + 0.2f, 0.14f, 0.06f), pm.Glow);
            Block(t, "Gem", new Vector3(0f, topY + 0.35f, -0.57f), new Vector3(0.45f, 0.45f, 0.06f), pm.Glow);

            PortalView portal = CreatePortal(t, pm);

            var label = new GameObject("Label Anchor").transform;
            label.SetParent(t, false);
            label.localPosition = new Vector3(0f, topY + 1.3f, 0f);

            MonsterActor monster = CreateRiggedMonster(t, "Monster", glbPath, rig, material, a.Flash, height, a.MonsterController,
                new Vector3(x, 0f, GateZ + 1.3f), Quaternion.Euler(0f, 180f, 0f));

            MonsterGate gate = gateGo.AddComponent<MonsterGate>();
            var so = new SerializedObject(gate);
            so.FindProperty("_monster").objectReferenceValue = monster;
            so.FindProperty("_portal").objectReferenceValue = portal;
            so.FindProperty("_labelAnchor").objectReferenceValue = label;
            so.FindProperty("_portrait").objectReferenceValue = portrait;
            so.FindProperty("_level").intValue = level;
            so.ApplyModifiedPropertiesWithoutUndo();
            return gate;
        }

        /// <summary>
        /// Mặt cổng (nhìn từ phía -Z): nền đục che hậu cảnh → 2 lớp xoáy (alpha + additive) quay ngược
        /// chiều trong khung elip → lõi sáng → tia sáng bị hút vào tâm (con của lớp xoáy nên cũng xoay).
        /// </summary>
        private static PortalView CreatePortal(Transform gate, PortalMaterials pm)
        {
            var portalGo = new GameObject("Portal");
            portalGo.transform.SetParent(gate, false);
            portalGo.transform.localPosition = new Vector3(0f, 0.1f + OpeningHeight * 0.5f, 0f);

            var surface = new GameObject("Surface").transform;
            surface.SetParent(portalGo.transform, false);

            Quad(surface, "Backdrop", new Vector3(0f, 0f, 0.03f), new Vector3(OpeningWidth, OpeningHeight, 1f), pm.Backdrop);
            var ellipse = new GameObject("Ellipse").transform;
            ellipse.SetParent(surface, false);
            ellipse.localScale = new Vector3(1f, OpeningHeight / OpeningWidth, 1f);

            Transform swirlA = new GameObject("Swirl A").transform;
            swirlA.SetParent(ellipse, false);
            Quad(swirlA, "Layer", new Vector3(0f, 0f, 0f), Vector3.one * OpeningWidth * 1.02f, pm.SwirlA);
            Transform swirlB = new GameObject("Swirl B").transform;
            swirlB.SetParent(ellipse, false);
            swirlB.localRotation = Quaternion.Euler(0f, 0f, 60f);
            Quad(swirlB, "Layer", new Vector3(0f, 0f, -0.02f), new Vector3(-OpeningWidth * 0.92f, OpeningWidth * 0.92f, 1f), pm.SwirlB);
            Transform core = Quad(ellipse, "Core", new Vector3(0f, 0f, -0.04f), Vector3.one * OpeningWidth * 0.7f, pm.Core).transform;

            ParticleSystem sparks = CreateSparks(swirlA, pm.Sparks);

            PortalView view = portalGo.AddComponent<PortalView>();
            var so = new SerializedObject(view);
            so.FindProperty("_surface").objectReferenceValue = surface;
            so.FindProperty("_swirlA").objectReferenceValue = swirlA;
            so.FindProperty("_swirlB").objectReferenceValue = swirlB;
            so.FindProperty("_core").objectReferenceValue = core;
            so.FindProperty("_sparks").objectReferenceValue = sparks;
            so.ApplyModifiedPropertiesWithoutUndo();
            return view;
        }

        private static ParticleSystem CreateSparks(Transform parent, Material material)
        {
            var go = new GameObject("Sparks");
            go.transform.SetParent(parent, false);
            go.transform.localPosition = new Vector3(0f, 0f, -0.06f);
            var ps = go.AddComponent<ParticleSystem>();
            ps.Stop(true, ParticleSystemStopBehavior.StopEmittingAndClear);
            var main = ps.main;
            main.loop = true;
            main.playOnAwake = true;
            main.duration = 2f;
            main.startLifetime = new ParticleSystem.MinMaxCurve(0.7f, 1.1f);
            main.startSpeed = new ParticleSystem.MinMaxCurve(-1.6f, -0.9f);
            main.startSize = new ParticleSystem.MinMaxCurve(0.12f, 0.3f);
            main.startColor = new ParticleSystem.MinMaxGradient(Color.white, new Color(1f, 1f, 1f, 0.6f));
            main.simulationSpace = ParticleSystemSimulationSpace.Local;
            main.scalingMode = ParticleSystemScalingMode.Hierarchy;
            main.maxParticles = 150;
            var emission = ps.emission;
            emission.rateOverTime = 45f;
            var shape = ps.shape;
            shape.shapeType = ParticleSystemShapeType.Circle;
            shape.radius = OpeningWidth * 0.48f;
            shape.radiusThickness = 0f;
            var size = ps.sizeOverLifetime;
            size.enabled = true;
            size.size = new ParticleSystem.MinMaxCurve(1f, AnimationCurve.Linear(0f, 1f, 1f, 0f));
            var renderer = go.GetComponent<ParticleSystemRenderer>();
            renderer.sharedMaterial = material;
            renderer.renderMode = ParticleSystemRenderMode.Billboard;
            renderer.sortingFudge = -10f;
            return ps;
        }

        private static GameObject Quad(Transform parent, string name, Vector3 position, Vector3 scale, Material material)
        {
            var go = GameObject.CreatePrimitive(PrimitiveType.Quad);
            go.name = name;
            Object.DestroyImmediate(go.GetComponent<Collider>());
            go.transform.SetParent(parent, false);
            go.transform.localPosition = position;
            go.transform.localScale = scale;
            var r = go.GetComponent<MeshRenderer>();
            r.sharedMaterial = material;
            r.shadowCastingMode = ShadowCastingMode.Off;
            r.receiveShadows = false;
            return go;
        }

        /// <summary>
        /// Boss giữ nguyên cây node của glTF (chỉ những node có clip "idle" điều khiển + node cha của chúng),
        /// mesh con được gộp vào node điều khiển gần nhất -> ~12 mesh thay vì 178. Clip idle được copy ra
        /// .anim riêng (không phụ thuộc sub-asset của importer glTFast) và chạy qua Animator.
        /// </summary>
        private static FighterView CreateAnimatedBoss(Transform parent, string glbPath, Material material, Material flash,
            float height, Vector3 position, Quaternion rotation)
        {
            var prefab = AssetDatabase.LoadAssetAtPath<GameObject>(glbPath);
            AnimationClip source = null;
            foreach (Object o in AssetDatabase.LoadAllAssetsAtPath(glbPath))
                if (o is AnimationClip && o.name == "idle") source = (AnimationClip)o;
            if (source == null) throw new InvalidOperationException("Boss model has no 'idle' clip: " + glbPath);

            var temp = (GameObject)Object.Instantiate(prefab);
            temp.name = prefab.name;
            try
            {
                temp.transform.position = Vector3.zero;
                temp.transform.rotation = Quaternion.identity;
                temp.transform.localScale = Vector3.one;

                // Node được giữ lại = gốc + node có curve + mọi node cha của chúng.
                var keep = new HashSet<Transform> { temp.transform };
                foreach (EditorCurveBinding binding in AnimationUtility.GetCurveBindings(source))
                {
                    Transform node = temp.transform.Find(binding.path);
                    for (; node != null; node = node.parent) keep.Add(node);
                }

                var rootGo = new GameObject("Boss");
                rootGo.transform.SetParent(parent, false);
                rootGo.transform.position = position;
                rootGo.transform.rotation = rotation;
                var body = new GameObject("Body").transform;
                body.SetParent(rootGo.transform, false);

                var replica = new Dictionary<Transform, Transform>();
                Transform rig = Replicate(temp.transform, body, keep, replica);

                // Gộp mesh theo node giữ lại gần nhất.
                var groups = new Dictionary<Transform, List<CubePart>>();
                Bounds all = default(Bounds);
                bool init = false;
                foreach (MeshFilter filter in temp.GetComponentsInChildren<MeshFilter>(true))
                {
                    if (filter.sharedMesh == null) continue;
                    Transform owner = filter.transform;
                    while (!keep.Contains(owner)) owner = owner.parent;
                    Matrix4x4 m = owner.worldToLocalMatrix * filter.transform.localToWorldMatrix;
                    List<CubePart> list;
                    if (!groups.TryGetValue(owner, out list)) groups[owner] = list = new List<CubePart>();
                    list.Add(new CubePart { Mesh = filter.sharedMesh, Matrix = m });
                    Bounds wb = TransformBounds(filter.sharedMesh.bounds, filter.transform.localToWorldMatrix);
                    if (!init) { all = wb; init = true; } else all.Encapsulate(wb);
                }

                var renderers = new List<Object>();
                int index = 0;
                foreach (KeyValuePair<Transform, List<CubePart>> group in groups)
                {
                    Mesh mesh = SaveMesh(CombineParts(group.Value, Matrix4x4.identity, "Boss_Part" + index), "Boss_Part" + index);
                    index++;
                    var meshGo = new GameObject("Mesh", typeof(MeshFilter), typeof(MeshRenderer));
                    meshGo.transform.SetParent(replica[group.Key], false);
                    meshGo.GetComponent<MeshFilter>().sharedMesh = mesh;
                    var renderer = meshGo.GetComponent<MeshRenderer>();
                    renderer.sharedMaterial = material;
                    renderer.shadowCastingMode = ShadowCastingMode.Off;
                    renderers.Add(renderer);
                }

                // Quay 180 độ cho mặt hướng +Z (giống các model khác), scale theo chiều cao, chân chạm y = 0.
                float scale = height / Mathf.Max(0.01f, all.size.y);
                Quaternion turn = Quaternion.Euler(0f, 180f, 0f);
                body.localRotation = turn;
                body.localScale = Vector3.one * scale;
                body.localPosition = -(turn * (new Vector3(all.center.x, all.min.y, all.center.z) * scale));

                AnimationClip idle = Object.Instantiate(source);
                idle.name = "Boss_Idle";
                AnimationClipSettings settings = AnimationUtility.GetAnimationClipSettings(idle);
                settings.loopTime = true;
                AnimationUtility.SetAnimationClipSettings(idle, settings);
                string clipPath = Gen + "Boss_Idle.anim";
                if (AssetDatabase.LoadAssetAtPath<AnimationClip>(clipPath) != null) AssetDatabase.DeleteAsset(clipPath);
                AssetDatabase.CreateAsset(idle, clipPath);
                string controllerPath = Gen + "Boss.controller";
                if (AssetDatabase.LoadAssetAtPath<AnimatorController>(controllerPath) != null) AssetDatabase.DeleteAsset(controllerPath);
                AnimatorController controller = AnimatorController.CreateAnimatorControllerAtPath(controllerPath);
                AnimatorState state = controller.layers[0].stateMachine.AddState("Idle");
                state.motion = idle;
                controller.layers[0].stateMachine.defaultState = state;

                Animator animator = rig.gameObject.AddComponent<Animator>();
                animator.runtimeAnimatorController = controller;
                animator.cullingMode = AnimatorCullingMode.AlwaysAnimate;
                animator.applyRootMotion = false;

                FighterView fighter = rootGo.AddComponent<FighterView>();
                var so = new SerializedObject(fighter);
                so.FindProperty("_body").objectReferenceValue = body;
                SetArray(so, "_renderers", renderers);
                so.FindProperty("_flashMaterial").objectReferenceValue = flash;
                so.FindProperty("_height").floatValue = height;
                so.FindProperty("_reach").floatValue = all.size.z * scale * 0.5f;
                so.FindProperty("_proceduralIdle").boolValue = false;
                so.ApplyModifiedPropertiesWithoutUndo();
                return fighter;
            }
            finally
            {
                Object.DestroyImmediate(temp);
            }
        }

        private static Transform Replicate(Transform source, Transform parent, HashSet<Transform> keep,
            Dictionary<Transform, Transform> map)
        {
            var copy = new GameObject(source.name).transform;
            copy.SetParent(parent, false);
            copy.localPosition = source.localPosition;
            copy.localRotation = source.localRotation;
            copy.localScale = source.localScale;
            map[source] = copy;
            foreach (Transform child in source)
                if (keep.Contains(child)) Replicate(child, copy, keep, map);
            return copy;
        }

        private static FighterView CreateFighter(Transform parent, string name, Mesh mesh, Material material,
            Material flash, float height, Vector3 position, Quaternion rotation)
        {
            var rootGo = new GameObject(name);
            rootGo.transform.SetParent(parent, false);
            rootGo.transform.position = position;
            rootGo.transform.rotation = rotation;

            var body = new GameObject("Body", typeof(MeshFilter), typeof(MeshRenderer));
            body.transform.SetParent(rootGo.transform, false);
            body.GetComponent<MeshFilter>().sharedMesh = mesh;
            var renderer = body.GetComponent<MeshRenderer>();
            renderer.sharedMaterial = material;
            renderer.shadowCastingMode = ShadowCastingMode.Off;
            float scale = height / Mathf.Max(0.01f, mesh.bounds.size.y);
            body.transform.localScale = Vector3.one * scale;

            FighterView fighter = rootGo.AddComponent<FighterView>();
            var so = new SerializedObject(fighter);
            so.FindProperty("_body").objectReferenceValue = body.transform;
            SetArray(so, "_renderers", new Object[] { renderer });
            so.FindProperty("_flashMaterial").objectReferenceValue = flash;
            so.FindProperty("_height").floatValue = height;
            so.FindProperty("_reach").floatValue = mesh.bounds.size.z * scale * 0.5f;
            so.ApplyModifiedPropertiesWithoutUndo();
            return fighter;
        }

        // ================================================================== ui

        private sealed class Ui
        {
            public ChooseHudLayout Layout;
            public RectTransform Title;
            public Image Flash;
            public ScreenAnchor Hand;
            public HealthBarView MonsterBar, BossBar;
            public ScreenAnchor MonsterBarAnchor, BossBarAnchor;
            public Button FightButton;
        }

        private static Ui BuildUi(Transform parent, Camera camera, Assets a, MonsterGate[] gates)
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
            RectTransform layoutRoot = Full("Layout Root", canvasGo.transform);
            ui.Layout = layoutRoot.gameObject.AddComponent<ChooseHudLayout>();

            // Phần tử bám theo thế giới: thanh máu trên đầu, nhãn Lv., bàn tay.
            RectTransform world = Full("World Labels", layoutRoot);
            ui.BossBar = BuildBar(world, "Boss Bar", a.BossFrame, a.BossFill, false);
            ui.BossBarAnchor = ui.BossBar.gameObject.AddComponent<ScreenAnchor>();
            ui.MonsterBar = BuildBar(world, "Monster Bar", a.PlayerFrame, a.PlayerFill, true);
            ui.MonsterBarAnchor = ui.MonsterBar.gameObject.AddComponent<ScreenAnchor>();
            // Thanh máu không bị cắt mép / tai thỏ, và thanh boss tự né thanh quái nếu chồng nhau.
            var monsterAnchorSo = new SerializedObject(ui.MonsterBarAnchor);
            monsterAnchorSo.FindProperty("_clampInside").boolValue = true;
            monsterAnchorSo.ApplyModifiedPropertiesWithoutUndo();
            var bossAnchorSo = new SerializedObject(ui.BossBarAnchor);
            bossAnchorSo.FindProperty("_clampInside").boolValue = true;
            bossAnchorSo.FindProperty("_avoid").objectReferenceValue = ui.MonsterBar.transform;
            bossAnchorSo.ApplyModifiedPropertiesWithoutUndo();


            Sprite handSprite = LoadSprite(HandPath);
            Image hand = Img("Hand", world, handSprite);
            hand.rectTransform.pivot = new Vector2(0.3f, 0.97f);
            ui.Hand = hand.gameObject.AddComponent<ScreenAnchor>();
            hand.gameObject.SetActive(false);

            TMP_Text title = Text("Title", layoutRoot, "CHOOSE YOUR MONSTER!", 100f);
            AutoSize(title);
            title.color = new Color(1f, 0.95f, 0.4f);
            ui.Title = title.rectTransform;


            // Nút CTA "Fight!" = _btnBlock của GameManager: bấm là mở store.
            Image fight = Img("Fight Button", layoutRoot, LoadSprite(UiDir + "button.png"));
            fight.raycastTarget = true;
            ui.FightButton = fight.gameObject.AddComponent<Button>();
            ui.FightButton.targetGraphic = fight;
            ui.FightButton.transition = Selectable.Transition.None;
            // Vệt sáng trắng chéo chạy ngang nút, bị cắt theo hình nút (Mask dùng chính sprite nút).
            Mask mask = fight.gameObject.AddComponent<Mask>();
            mask.showMaskGraphic = true;
            Image shine = Img("Shine", fight.rectTransform, null);
            shine.preserveAspect = false;
            shine.color = new Color(1f, 1f, 1f, 0.7f);
            shine.rectTransform.anchorMin = new Vector2(-0.35f, -0.4f);
            shine.rectTransform.anchorMax = new Vector2(-0.25f, 1.4f);
            shine.rectTransform.offsetMin = shine.rectTransform.offsetMax = Vector2.zero;
            shine.rectTransform.localRotation = Quaternion.Euler(0f, 0f, -22f);
            Animator fightAnimator = fight.gameObject.AddComponent<Animator>();
            fightAnimator.runtimeAnimatorController = BuildFightButtonAnimator();
            fight.gameObject.SetActive(false);

            // Chớp sáng lúc nhập xác.
            RectTransform flash = Full("Flash", layoutRoot);
            ui.Flash = flash.gameObject.AddComponent<Image>();
            ui.Flash.color = Color.white;
            ui.Flash.raycastTarget = false;
            flash.gameObject.SetActive(false);

            var layoutSo = new SerializedObject(ui.Layout);
            layoutSo.FindProperty("_title").objectReferenceValue = ui.Title;
            layoutSo.FindProperty("_hand").objectReferenceValue = hand.rectTransform;
            SetArray(layoutSo, "_bars", new Object[] { ui.MonsterBar.transform, ui.BossBar.transform });
            layoutSo.FindProperty("_fightButton").objectReferenceValue = fight.rectTransform;
            layoutSo.ApplyModifiedPropertiesWithoutUndo();
            return ui;
        }

        /// <summary>
        /// Clip lặp của nút Fight: phóng to rồi về (0–0.6s), sau đó vệt sáng chéo quét từ trái sang phải
        /// (0.6–1.1s), nghỉ rồi chạy lại. Vệt sáng chạy theo anchor nên đúng mọi kích thước nút.
        /// Sửa trực tiếp trong cửa sổ Animation (Generated/FightButton_Idle.anim).
        /// </summary>
        private static RuntimeAnimatorController BuildFightButtonAnimator()
        {
            var clip = new AnimationClip { name = "FightButton_Idle", frameRate = 30f };
            var scale = new AnimationCurve(new Keyframe(0f, 1f), new Keyframe(0.3f, 1.08f), new Keyframe(0.6f, 1f),
                new Keyframe(1.5f, 1f));
            for (int i = 0; i < scale.length; i++) scale.SmoothTangents(i, 0f);
            clip.SetCurve("", typeof(RectTransform), "m_LocalScale.x", scale);
            clip.SetCurve("", typeof(RectTransform), "m_LocalScale.y", scale);
            clip.SetCurve("", typeof(RectTransform), "m_LocalScale.z", new AnimationCurve(new Keyframe(0f, 1f), new Keyframe(1.5f, 1f)));
            clip.SetCurve("Shine", typeof(RectTransform), "m_AnchorMin.x", LinearCurve(-0.35f, 1.25f));
            clip.SetCurve("Shine", typeof(RectTransform), "m_AnchorMax.x", LinearCurve(-0.25f, 1.35f));
            AnimationClipSettings settings = AnimationUtility.GetAnimationClipSettings(clip);
            settings.loopTime = true;
            AnimationUtility.SetAnimationClipSettings(clip, settings);
            string clipPath = Gen + "FightButton_Idle.anim";
            if (AssetDatabase.LoadAssetAtPath<AnimationClip>(clipPath) != null) AssetDatabase.DeleteAsset(clipPath);
            AssetDatabase.CreateAsset(clip, clipPath);

            string path = Gen + "FightButton.controller";
            if (AssetDatabase.LoadAssetAtPath<AnimatorController>(path) != null) AssetDatabase.DeleteAsset(path);
            AnimatorController controller = AnimatorController.CreateAnimatorControllerAtPath(path);
            AnimatorState state = controller.layers[0].stateMachine.AddState("Idle");
            state.motion = clip;
            controller.layers[0].stateMachine.defaultState = state;
            return controller;
        }

        /// <summary>Đứng yên tới 0.6s, quét tới 1.1s, đứng yên tới 1.5s.</summary>
        private static AnimationCurve LinearCurve(float from, float to)
        {
            var curve = new AnimationCurve(new Keyframe(0f, from), new Keyframe(0.6f, from),
                new Keyframe(1.1f, to), new Keyframe(1.5f, to));
            for (int i = 0; i < curve.length; i++)
            {
                AnimationUtility.SetKeyLeftTangentMode(curve, i, AnimationUtility.TangentMode.Linear);
                AnimationUtility.SetKeyRightTangentMode(curve, i, AnimationUtility.TangentMode.Linear);
            }
            return curve;
        }

        private static HealthBarView BuildBar(Transform parent, string name, Sprite frame, Sprite fill, bool player)
        {
            RectTransform root = Rect(name, parent);
            root.sizeDelta = new Vector2(BarW, BarH);
            Image frameImage = Img("Frame", root, frame);
            Stretch(frameImage.rectTransform, 0f, 0f, 1f, 1f);
            frameImage.preserveAspect = false;

            // Trail (vệt vàng tụt chậm) + Fill: cùng khung với sprite gốc, cắt bằng Image Filled ngang.
            string maskPath = AssetDatabase.GetAssetPath(fill).Replace("_Fill.png", "_Mask.png");
            Image trail = Img("Trail", root, AssetDatabase.LoadAssetAtPath<Sprite>(maskPath));
            trail.color = new Color(1f, 0.86f, 0.35f);
            Image fillImage = Img("Fill", root, fill);
            foreach (Image layer in new[] { trail, fillImage })
            {
                layer.preserveAspect = false;
                layer.type = Image.Type.Filled;
                layer.fillMethod = Image.FillMethod.Horizontal;
                layer.fillOrigin = (int)Image.OriginHorizontal.Left;
                layer.fillAmount = 1f;
                Stretch(layer.rectTransform, 0f, 0f, 1f, 1f);
            }

            Image portrait = null;
            TMP_Text level = null;
            if (player)
            {
                portrait = Img("Portrait", root, null);
                Stretch(portrait.rectTransform, 16f / BarW, (BarH - 133f) / BarH, 133f / BarW, (BarH - 16f) / BarH);
            }

            HealthBarView view = root.gameObject.AddComponent<HealthBarView>();
            var so = new SerializedObject(view);
            so.FindProperty("_fill").objectReferenceValue = fillImage;
            so.FindProperty("_trail").objectReferenceValue = trail;
            so.FindProperty("_fillStart").floatValue = 149f / BarW;
            so.FindProperty("_fillEnd").floatValue = 1f;
            so.FindProperty("_portrait").objectReferenceValue = portrait;
            so.FindProperty("_level").objectReferenceValue = level;
            so.ApplyModifiedPropertiesWithoutUndo();
            return view;
        }

        // ------------------------------------------------------------------ wiring

        private static GameManager CreateGameManager(GameObject root, Ui ui)
        {
            GameManager manager = root.AddComponent<GameManager>();
            var so = new SerializedObject(manager);
            // Field Luna "End Time": đếm từ Start, hết giờ thì mở store.
            so.FindProperty("_endTime").intValue = 30;
            so.FindProperty("_storeOnEndTime").boolValue = true;
            so.FindProperty("_autoStoreAfterEndcard").boolValue = false;
            so.FindProperty("_backgroundMusic").objectReferenceValue = AssetDatabase.LoadAssetAtPath<AudioClip>(MonsterAudio + "BattleMusic.ogg");
            so.FindProperty("_tapToCtaMode").boolValue = false;
            so.FindProperty("_eggRaisingMode").boolValue = false;
            so.FindProperty("_totalEvent").intValue = 0;
            so.FindProperty("_btnBlock").objectReferenceValue = ui.FightButton;
            so.ApplyModifiedPropertiesWithoutUndo();
            return manager;
        }

        private static void Wire(ChooseMonsterController controller, GameManager gameManager, ShotCamera shot,
            ChooseAudio audio, MonsterGate[] gates, Transform player, Animator playerAnimator, FighterView boss,
            Transform spot, Ui ui)
        {
            var so = new SerializedObject(controller);
            so.FindProperty("_gameManager").objectReferenceValue = gameManager;
            so.FindProperty("_shot").objectReferenceValue = shot;
            so.FindProperty("_audio").objectReferenceValue = audio;
            SetArray(so, "_gates", gates);
            so.FindProperty("_player").objectReferenceValue = player;
            so.FindProperty("_playerAnimator").objectReferenceValue = playerAnimator;
            so.FindProperty("_boss").objectReferenceValue = boss;
            so.FindProperty("_battleSpot").objectReferenceValue = spot;
            so.FindProperty("_title").objectReferenceValue = ui.Title;
            so.FindProperty("_flashOverlay").objectReferenceValue = ui.Flash;
            so.FindProperty("_hand").objectReferenceValue = ui.Hand;
            so.FindProperty("_monsterBar").objectReferenceValue = ui.MonsterBar;
            so.FindProperty("_monsterBarAnchor").objectReferenceValue = ui.MonsterBarAnchor;
            so.FindProperty("_bossBar").objectReferenceValue = ui.BossBar;
            so.FindProperty("_bossBarAnchor").objectReferenceValue = ui.BossBarAnchor;
            so.FindProperty("_fightButton").objectReferenceValue = ui.FightButton.transform;
            so.ApplyModifiedPropertiesWithoutUndo();
        }

        // ------------------------------------------------------------------ helpers

        private static void EnsureFolder(string path)
        {
            if (AssetDatabase.IsValidFolder(path)) return;
            string parent = Path.GetDirectoryName(path).Replace('\\', '/');
            EnsureFolder(parent);
            AssetDatabase.CreateFolder(parent, Path.GetFileName(path));
        }

        private static void SetArray(SerializedObject so, string field, IReadOnlyList<Object> values)
        {
            SerializedProperty property = so.FindProperty(field);
            property.arraySize = values.Count;
            for (int i = 0; i < values.Count; i++)
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

        private static TMP_Text Text(string name, Transform parent, string value, float size)
        {
            RectTransform rect = Rect(name, parent);
            rect.sizeDelta = new Vector2(900f, 200f);
            var text = rect.gameObject.AddComponent<TextMeshProUGUI>();
            text.font = _font;
            text.fontSharedMaterial = _fontOutline;
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
