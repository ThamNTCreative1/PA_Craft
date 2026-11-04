using System.Collections.Generic;
using System.Linq;
using Playable.MonsterArmy.Core;
using TMPro;
// GameManager và ResponsiveCanvasScaler nằm ở namespace Playable (Assembly-CSharp).
using UnityEditor;
using UnityEditor.SceneManagement;
using UnityEditor.U2D;
using UnityEngine;
using UnityEngine.EventSystems;
using UnityEngine.U2D;
using UnityEngine.UI;

namespace Playable.MonsterArmy.EditorTools
{
    /// <summary>
    /// Dựng toàn bộ playable Monster Army vào Assets/_Playable_/Scenes/Gameplay.unity.
    ///
    /// Theo quy ước repo (xem TempleRun/Editor/HideSeekSetup.cs): scene sinh ra từ code
    /// qua một menu item chứ không author tay, nên tái tạo lại được bất cứ lúc nào.
    ///
    /// Khác HideSeekSetup một điểm: nội dung cũ bị XOÁ HẲN chứ không SetActive(false).
    /// An toàn vì Gameplay.unity đã commit tại eb0aeb802 — khôi phục bằng
    /// `git checkout -- Assets/_Playable_/Scenes/Gameplay.unity`.
    ///
    /// Âm thanh dùng bản .ogg convert từ .webm của SSPGame (Unity không import .webm).
    /// </summary>
    public static class MonsterArmySetup
    {
        private const string Root = "Assets/_Playable_/MonsterArmy/";
        private const string Art = Root + "Art/";
        private const string Audio = Root + "Audio/";
        private const string LibraryPath = Root + "MonsterArtLibrary.asset";
        private const string AtlasPath = Root + "MonsterArmy.spriteatlasv2";



        private const string ScenePath = "Assets/_Playable_/Scenes/Gameplay.unity";
        private const string FontPath = "Assets/_Playable_/Font/Arial Rounded MT Bold Regular SDF.asset";
        private const string HandPath = "Assets/_Playable_/TempleRun/UI/Sprites/hand.png";

        [MenuItem("Tools/Monster Army/Setup Playable")]
        public static void Apply()
        {
            // Trong batchmode không có ai bấm nút, mà DisplayDialog thì tự trả về true —
            // hỏi ở đó vừa vô nghĩa vừa dễ hiểu nhầm là đã được xác nhận.
            if (!Application.isBatchMode && !EditorUtility.DisplayDialog("Monster Army",
                    "Xoá sạch nội dung hiện tại của Gameplay.unity rồi dựng lại playable Monster Army?\n\n" +
                    "Khôi phục được bằng: git checkout -- " + ScenePath,
                    "Dựng", "Huỷ"))
                return;

            SpriteSheetSlicer.SliceAll();
            MonsterArtLibrary art = BuildLibrary();

            UnityEngine.SceneManagement.Scene scene = EditorSceneManager.OpenScene(ScenePath);
            foreach (GameObject old in scene.GetRootGameObjects()) Object.DestroyImmediate(old);

            var root = new GameObject("MonsterArmyPlayable");
            CreateEventSystem(root.transform);
            CreateAudioManager(root.transform);

            CombatAudio audio = CreateAudio(root.transform);
            ArenaGrid grid = CreateArena(root.transform, art);
            VfxPool vfx = CreateVfxPool(root.transform, art);
            (Transform rig, Camera camera, ArenaCameraFitter fitter) = CreateCamera(root.transform, grid);

            BossUnit boss = CreateBoss(root.transform, art, vfx, audio);
            fitter.GetType();   // fitter được gán boss ở dưới sau khi boss tồn tại

            Canvas canvas = CreateCanvas(root.transform);
            Ui ui = BuildUi(canvas, art, audio);

            ChaosDirector chaos = root.AddComponent<ChaosDirector>();
            DragPlacer dragPlacer = root.AddComponent<DragPlacer>();
            TutorialDirector tutorial = root.AddComponent<TutorialDirector>();
            var controller = root.AddComponent<MonsterArmyController>();
            GameManager gameManager = CreateGameManager(root, ui);

            WireChaos(chaos, vfx, ui);
            WireDragPlacer(dragPlacer, camera, grid, art);
            WireTutorial(tutorial, ui, dragPlacer, grid, camera);
            WireFitter(fitter, rig, camera, grid, boss.transform, ui.Hotbar);
            WireController(controller, grid, ui, dragPlacer, tutorial, chaos, vfx, audio, boss, art, camera);
            WireBoss(boss, vfx, chaos, audio);

            EditorSceneManager.MarkSceneDirty(scene);
            EditorSceneManager.SaveScene(scene);
            Debug.Log("[MonsterArmy] Dựng xong playable. GameManager: endTime=" + gameManager.EndTime);
        }

        [MenuItem("Tools/Monster Army/Update Layout And Audio")]
        public static void UpdateLayoutAndAudio()
        {
            var scene = UnityEngine.SceneManagement.SceneManager.GetActiveScene();
            var root = scene.GetRootGameObjects().FirstOrDefault(go => go.GetComponent<MonsterArmyController>() != null);
            if (root == null) throw new System.InvalidOperationException("Open the Monster Army gameplay scene first.");
            Undo.RegisterFullObjectHierarchyUndo(root, "Update Monster Army layout and audio");
            var controller = new SerializedObject(root.GetComponent<MonsterArmyController>());
            var grid = (ArenaGrid)controller.FindProperty("_grid").objectReferenceValue;
            var art = (MonsterArtLibrary)controller.FindProperty("_art").objectReferenceValue;
            var gridSo = new SerializedObject(grid);
            gridSo.FindProperty("_columns").intValue = 5;
            gridSo.FindProperty("_rows").intValue = 5;
            gridSo.FindProperty("_cellSize").vector2Value = Vector2.one * 2.1f;
            gridSo.ApplyModifiedProperties();
            Transform markers = grid.transform.Find("Cell Markers");
            if (markers != null) Object.DestroyImmediate(markers.gameObject);
            CreateCellMarkers(grid, art);
            var dragPlacer = (DragPlacer)controller.FindProperty("_dragPlacer").objectReferenceValue;
            var dragSo = new SerializedObject(dragPlacer);
            var highlight = (SpriteRenderer)dragSo.FindProperty("_cellHighlight").objectReferenceValue;
            highlight.transform.localScale = FitScale(art.CellHighlight, grid.CellSize.x * 0.9f, grid.CellSize.y * 0.9f);
            var boss = (BossUnit)controller.FindProperty("_boss").objectReferenceValue;
            Vector3 bossPosition = boss.transform.position;
            bossPosition.y = grid.WorldBounds.max.y + 3f;
            boss.transform.position = bossPosition;
            var bossSo = new SerializedObject(boss);
            bossSo.FindProperty("_bossScale").floatValue = 4.5f;
            bossSo.ApplyModifiedProperties();
            var fitter = root.GetComponentInChildren<ArenaCameraFitter>(true);
            var fitterSo = new SerializedObject(fitter);
            fitterSo.FindProperty("_bossHalfHeight").floatValue = 2.55f;
            fitterSo.FindProperty("_floor").objectReferenceValue = grid.transform.Find("Floor").GetComponent<SpriteRenderer>();
            fitterSo.ApplyModifiedProperties();
            var audio = (CombatAudio)controller.FindProperty("_audio").objectReferenceValue;
            var audioSo = new SerializedObject(audio);
            Clip(audioSo, "_bossRoar", "MonsterRoar");
            Clip(audioSo, "_fireball", "Fireball");
            SetArray(audioSo, "_monsterVoices", new[] {
                AssetDatabase.LoadAssetAtPath<AudioClip>(Audio + "MonsterVoice1.ogg"),
                AssetDatabase.LoadAssetAtPath<AudioClip>(Audio + "MonsterVoice2.ogg"),
                AssetDatabase.LoadAssetAtPath<AudioClip>(Audio + "MonsterVoice3.ogg") });
            audioSo.ApplyModifiedProperties();
            var manager = new SerializedObject(root.GetComponent<GameManager>());
            manager.FindProperty("_backgroundMusic").objectReferenceValue = AssetDatabase.LoadAssetAtPath<AudioClip>(Audio + "BattleMusic.ogg");
            manager.ApplyModifiedProperties();
            var audioManager = new SerializedObject(root.GetComponentInChildren<Playable.AudioManager>(true));
            var musicSource = (AudioSource)audioManager.FindProperty("_audioMusic").objectReferenceValue;
            musicSource.volume = 0.22f;
            EditorUtility.SetDirty(musicSource);
            var hotbar = (MonsterHotbar)controller.FindProperty("_hotbar").objectReferenceValue;
            var hotbarSo = new SerializedObject(hotbar);
            hotbarSo.FindProperty("_portraitColumns").intValue = 4;
            hotbarSo.ApplyModifiedProperties();
            hotbar.Relayout();
            fitter.Fit();
            EditorSceneManager.MarkSceneDirty(scene);
            EditorSceneManager.SaveScene(scene);
        }

        private const string UiTextureFolder = "Assets/_Playable_/2D Texture/";

        private static Sprite LoadUiSprite(string file)
        {
            string path = UiTextureFolder + file;
            var importer = AssetImporter.GetAtPath(path) as TextureImporter;
            if (importer == null) throw new System.InvalidOperationException("Missing UI asset: " + path);
            if (importer.textureType != TextureImporterType.Sprite || importer.spriteImportMode != SpriteImportMode.Single
                || importer.mipmapEnabled)
            {
                importer.textureType = TextureImporterType.Sprite;
                importer.spriteImportMode = SpriteImportMode.Single;
                importer.mipmapEnabled = false;
                importer.alphaIsTransparency = true;
                importer.SaveAndReimport();
            }
            var sprite = AssetDatabase.LoadAssetAtPath<Sprite>(path);
            if (sprite == null) throw new System.InvalidOperationException("Cannot load UI sprite: " + path);
            return sprite;
        }

        private static void ConfigureEndcard(Button button)
        {
            Canvas canvas = button.GetComponentInParent<Canvas>();
            var rect = (RectTransform)button.transform;
            rect.SetParent(canvas.transform, false);
            rect.SetAsLastSibling();
            rect.anchorMin = Vector2.zero;
            rect.anchorMax = Vector2.one;
            rect.offsetMin = rect.offsetMax = Vector2.zero;
            rect.localScale = Vector3.one;
            Image background = button.GetComponent<Image>();
            background.sprite = null;
            background.color = Color.black;
            background.raycastTarget = true;
            button.targetGraphic = background;
            button.transition = Selectable.Transition.None;
            Transform existing = rect.Find("Build Your Army");
            Image title = existing != null ? existing.GetComponent<Image>()
                : Img("Build Your Army", rect, null, new Vector2(0.5f, 0.5f), Vector2.zero, Color.white);
            title.sprite = LoadUiSprite("build-your-army.png");
            title.color = Color.white;
            title.preserveAspect = true;
            title.raycastTarget = false;
            title.rectTransform.anchorMin = new Vector2(0.08f, 0.18f);
            title.rectTransform.anchorMax = new Vector2(0.92f, 0.82f);
            title.rectTransform.offsetMin = title.rectTransform.offsetMax = Vector2.zero;
            button.gameObject.SetActive(false);
            EditorUtility.SetDirty(button);
            EditorUtility.SetDirty(background);
            EditorUtility.SetDirty(title);
        }

        [MenuItem("Tools/Monster Army/Apply Endcard")]
        public static void ApplyEndcard()
        {
            var scene = UnityEngine.SceneManagement.SceneManager.GetActiveScene();
            var root = scene.GetRootGameObjects().FirstOrDefault(go => go.GetComponent<MonsterArmyController>() != null);
            if (root == null) throw new System.InvalidOperationException("Open the Monster Army scene first.");
            Undo.RegisterFullObjectHierarchyUndo(root, "Apply Build Your Army endcard");
            var manager = new SerializedObject(root.GetComponent<GameManager>());
            ConfigureEndcard((Button)manager.FindProperty("_btnBlock").objectReferenceValue);
            manager.FindProperty("_autoStoreAfterEndcard").boolValue = true;
            manager.ApplyModifiedProperties();
            EditorSceneManager.MarkSceneDirty(scene);
            EditorSceneManager.SaveScene(scene);
        }

        private static void SkinStartButton(Button button)
        {
            var image = button.GetComponent<Image>();
            image.sprite = LoadUiSprite("start-button.png");
            image.color = Color.white;
            image.type = Image.Type.Simple;
            image.preserveAspect = true;
            button.targetGraphic = image;
            Transform label = button.transform.Find("Label");
            if (label != null) label.gameObject.SetActive(false);
            EditorUtility.SetDirty(image);
        }

        private static void SkinHealthBar(BossHealthBar bar)
        {
            var back = bar.transform.Find("Back").GetComponent<Image>();
            back.sprite = LoadUiSprite("progressBar_HP_1.png");
            back.color = Color.white;
            back.type = Image.Type.Simple;
            var fill = bar.transform.Find("Fill").GetComponent<Image>();
            fill.sprite = LoadUiSprite("progressBar_HP_2_.png");
            fill.color = Color.white;
            fill.type = Image.Type.Filled;
            fill.fillMethod = Image.FillMethod.Horizontal;
            fill.fillOrigin = 0;
            fill.rectTransform.anchorMin = new Vector2(10f / 527f, 10f / 45f);
            fill.rectTransform.anchorMax = new Vector2(517f / 527f, 35f / 45f);
            fill.rectTransform.offsetMin = fill.rectTransform.offsetMax = Vector2.zero;
            EditorUtility.SetDirty(back);
            EditorUtility.SetDirty(fill);
        }

        [MenuItem("Tools/Monster Army/Apply Start And Health Sprites")]
        public static void ApplyRequestedUiSkin()
        {
            var scene = UnityEngine.SceneManagement.SceneManager.GetActiveScene();
            var root = scene.GetRootGameObjects().FirstOrDefault(go => go.GetComponent<MonsterArmyController>() != null);
            if (root == null) throw new System.InvalidOperationException("Open the Monster Army scene first.");
            Undo.RegisterFullObjectHierarchyUndo(root, "Apply Start and HP sprites");
            var controller = new SerializedObject(root.GetComponent<MonsterArmyController>());
            SkinStartButton((Button)controller.FindProperty("_startButton").objectReferenceValue);
            SkinHealthBar((BossHealthBar)controller.FindProperty("_bossHealthBar").objectReferenceValue);
            EditorSceneManager.MarkSceneDirty(scene);
            EditorSceneManager.SaveScene(scene);
        }

        // ---------------------------------------------------------------- art library

        private const string CharactersFolder = Art + "Characters/";
        private const string WeaponsFolder = CharactersFolder + "Weapons/";

        /// <summary>Mọi sprite trong một thư mục, sắp theo tên để thứ tự ổn định.</summary>
        private static Sprite[] LoadFolder(string folder)
        {
            string[] guids = AssetDatabase.FindAssets("t:Sprite", new[] { folder });
            var result = new List<Sprite>(guids.Length);

            foreach (string guid in guids)
            {
                var sprite = AssetDatabase.LoadAssetAtPath<Sprite>(AssetDatabase.GUIDToAssetPath(guid));
                if (sprite != null) result.Add(sprite);
            }

            result.Sort((a, b) => string.CompareOrdinal(a.name, b.name));
            if (result.Count == 0) Debug.LogError("[MonsterArmy] Thư mục rỗng: " + folder);
            return result.ToArray();
        }

        private const string VfxFolder = Art + "VFX/";

        /// <summary>
        /// Điền các clip VFX. Tốc độ khung và công dụng lấy theo README_VFX.md của bộ
        /// asset: nổ lớn 16–20fps, tia lửa 20fps, lửa đầu nòng 25fps một lần.
        /// </summary>
        private static void SetVfxClips(SerializedObject so)
        {
            // Thứ tự phải khớp enum VfxKind.
            //
            // Chiều cao lấy nhân vật (~1.3 đơn vị) làm mốc: vụ nổ lớn hơn một người
            // một chút là đủ ra sức nặng. Để 2.2 thì mỗi quả nổ phủ kín bốn ô lưới và
            // đội quân biến mất sau lửa.
            var clips = new[]
            {
                (frames: LoadFolder(VfxFolder + "NoLon_Explosion"), fps: 18f, height: 1.4f),
                (frames: LoadFolder(VfxFolder + "TiaLuaVaCham_1"), fps: 20f, height: 0.6f),
                (frames: LoadFolder(VfxFolder + "LuaDauNong_Anim"), fps: 25f, height: 0.4f),
                (frames: Single2(VfxFolder + "Single/NoNho_Fireball.png"), fps: 8f, height: 0.7f),
                (frames: Single2(VfxFolder + "Single/NoNho_Puff.png"), fps: 8f, height: 0.5f),
                (frames: Single2(VfxFolder + "Single/KhoiNho_Puff.png"), fps: 6f, height: 0.6f),
                (frames: Single2(VfxFolder + "Single/VetAxit_Xanh.png"), fps: 8f, height: 0.6f)
            };

            SerializedProperty byKind = so.FindProperty("_vfxByKind");
            byKind.arraySize = clips.Length;
            for (int i = 0; i < clips.Length; i++)
                WriteClip(byKind.GetArrayElementAtIndex(i), clips[i].frames, clips[i].fps, clips[i].height);

            // Bốn kiểu tia lửa, rút ngẫu nhiên cho mỗi cú đánh.
            SerializedProperty sparks = so.FindProperty("_sparkVariants");
            sparks.arraySize = 4;
            for (int i = 0; i < 4; i++)
                WriteClip(sparks.GetArrayElementAtIndex(i),
                    LoadFolder(VfxFolder + "TiaLuaVaCham_" + (i + 1)), 20f, 0.6f);
        }

        private static void WriteClip(SerializedProperty clip, Sprite[] frames, float fps, float height)
        {
            SerializedProperty array = clip.FindPropertyRelative("Frames");
            array.arraySize = frames.Length;
            for (int i = 0; i < frames.Length; i++)
                array.GetArrayElementAtIndex(i).objectReferenceValue = frames[i];

            clip.FindPropertyRelative("Fps").floatValue = fps;
            clip.FindPropertyRelative("Height").floatValue = height;
        }

        /// <summary>
        /// Sprite đơn đóng gói thành clip hai khung để nó còn hiện đủ lâu để nhìn thấy
        /// — clip một khung ở 8fps chỉ sống 0.12 giây.
        /// </summary>
        private static Sprite[] Single2(string path)
        {
            var sprite = AssetDatabase.LoadAssetAtPath<Sprite>(path);
            if (sprite == null)
            {
                Debug.LogError("[MonsterArmy] Thiếu VFX: " + path);
                return new Sprite[0];
            }

            return new[] { sprite, sprite };
        }

        /// <summary>
        /// Nạp bốn bộ phận của một nhân vật từ Art/Characters/{skin}/{part}/{base}_{part}.png.
        /// Mỗi file là một sprite đơn — không cắt sheet, không dò vùng alpha, không đoán
        /// chỉ số: tên file chính là khoá.
        /// </summary>
        private static CharacterParts LoadParts(string skinFolder, string baseKey)
        {
            return new CharacterParts
            {
                Head = LoadPart(skinFolder, baseKey, "Head"),
                Body = LoadPart(skinFolder, baseKey, "Body"),
                Arm = LoadPart(skinFolder, baseKey, "Arm"),
                Leg = LoadPart(skinFolder, baseKey, "Leg")
            };
        }

        /// <summary>
        /// Cấu hình import cho toàn bộ file trong Art/Characters.
        ///
        /// Tất cả dùng CHUNG một pixels-per-unit: bộ phận được vẽ ở cùng tỉ lệ pixel
        /// (chân luôn 66px) nên chỉ cần một con số là mọi nhân vật cao bằng nhau và
        /// giữ nguyên tỉ lệ riêng — con dê vẫn có sừng to, con cú vẫn có cánh rộng.
        /// </summary>
        private static void ImportCharacterParts()
        {
            const int pixelsPerUnit = 150;
            string[] guids = AssetDatabase.FindAssets("t:Texture2D",
                new[] { CharactersFolder.TrimEnd('/'), VfxFolder.TrimEnd('/') });

            foreach (string guid in guids)
            {
                string path = AssetDatabase.GUIDToAssetPath(guid);
                var importer = AssetImporter.GetAtPath(path) as TextureImporter;
                if (importer == null) continue;

                bool needsChange = importer.textureType != TextureImporterType.Sprite
                                   || importer.spriteImportMode != SpriteImportMode.Single
                                   || importer.filterMode != FilterMode.Point
                                   || importer.mipmapEnabled
                                   || !Mathf.Approximately(importer.spritePixelsPerUnit, pixelsPerUnit)
                                   || importer.textureCompression != TextureImporterCompression.Uncompressed;
                if (!needsChange) continue;

                importer.textureType = TextureImporterType.Sprite;
                importer.spriteImportMode = SpriteImportMode.Single;
                importer.filterMode = FilterMode.Point;
                importer.mipmapEnabled = false;
                importer.spritePixelsPerUnit = pixelsPerUnit;
                importer.textureCompression = TextureImporterCompression.Uncompressed;
                importer.maxTextureSize = 512;
                importer.SaveAndReimport();
            }

            Debug.Log("[MonsterArmy] Import " + guids.Length + " file bộ phận nhân vật + VFX.");
        }

        private static Sprite LoadPart(string skinFolder, string baseKey, string part)
        {
            string path = CharactersFolder + skinFolder + "/" + part + "/" + baseKey + "_" + part + ".png";
            var sprite = AssetDatabase.LoadAssetAtPath<Sprite>(path);
            if (sprite == null) Debug.LogError("[MonsterArmy] Thiếu bộ phận: " + path);
            return sprite;
        }

        private static void SetParts(SerializedObject so, string field, CharacterParts parts)
        {
            SerializedProperty property = so.FindProperty(field);
            property.FindPropertyRelative("Head").objectReferenceValue = parts.Head;
            property.FindPropertyRelative("Body").objectReferenceValue = parts.Body;
            property.FindPropertyRelative("Arm").objectReferenceValue = parts.Arm;
            property.FindPropertyRelative("Leg").objectReferenceValue = parts.Leg;
        }

        private static MonsterArtLibrary BuildLibrary()
        {
            var art = AssetDatabase.LoadAssetAtPath<MonsterArtLibrary>(LibraryPath);
            if (art == null)
            {
                art = ScriptableObject.CreateInstance<MonsterArtLibrary>();
                AssetDatabase.CreateAsset(art, LibraryPath);
            }

            ImportCharacterParts();

            var so = new SerializedObject(art);
            SetVfxClips(so);

            // Một bộ Head/Body/Arm/Leg cho mỗi loài, tra theo tên file trong kho SSPGame.
            SerializedProperty bySpecies = so.FindProperty("_partsBySpecies");
            bySpecies.arraySize = MonsterRoster.Count;
            for (int i = 0; i < MonsterRoster.Count; i++)
            {
                SpeciesInfo info = MonsterRoster.At(i);
                CharacterParts parts = LoadParts(info.SkinFolder, info.BaseKey);
                SerializedProperty element = bySpecies.GetArrayElementAtIndex(i);
                element.FindPropertyRelative("Head").objectReferenceValue = parts.Head;
                element.FindPropertyRelative("Body").objectReferenceValue = parts.Body;
                element.FindPropertyRelative("Arm").objectReferenceValue = parts.Arm;
                element.FindPropertyRelative("Leg").objectReferenceValue = parts.Leg;
            }

            SetParts(so, "_bossParts",
                LoadParts(MonsterRoster.BossSkinFolder, MonsterRoster.BossBaseKey));

            // Vũ khí là art gốc, mỗi món một file nền trong suốt — không còn phải cắt
            // khỏi icon giao diện rồi xoá nền nữa.
            SetSprites(so, "_meleeWeapons", LoadFolder(WeaponsFolder + "CanChien"));
            SetSprites(so, "_gunWeapons", LoadFolder(WeaponsFolder + "Sung"));
            SetSprites(so, "_explosiveWeapons", LoadFolder(WeaponsFolder + "ChatNo"));

            so.FindProperty("_groundTile").objectReferenceValue = Single("tiledbackground-sheet0");
            so.FindProperty("_cellHighlight").objectReferenceValue = Single("ground-sheet0");
            so.ApplyModifiedPropertiesWithoutUndo();

            EditorUtility.SetDirty(art);
            AssetDatabase.SaveAssets();

            BuildAtlas();
            return art;
        }

        /// <summary>
        /// Gộp mọi sprite thật sự được vẽ vào một Sprite Atlas.
        ///
        /// Hai lý do, đều đo đếm được:
        ///
        /// 1. Draw call. Mỗi con quái có 7-8 SpriteRenderer lấy từ 8 texture khác nhau, và
        ///    thứ tự vẽ sắp theo trục Y nên các bộ phận của những con khác nhau xen kẽ lẫn
        ///    nhau. Không có atlas thì gần như mỗi renderer là một lần đổi texture — 24 con
        ///    quái thành hơn 190 draw call. Gộp chung một texture thì cả đám batch được.
        ///
        /// 2. Dung lượng build. buttonitem-sheet0 là 1024x2048 nhưng ta chỉ dùng 10 trong
        ///    139 icon của nó. Đưa đúng 10 sprite đó vào atlas thì texture gốc không còn ai
        ///    tham chiếu trực tiếp và Luna không đóng gói nó nữa.
        /// </summary>
        private static void BuildAtlas()
        {
            // Project đang để Sprite Packer = Disabled, atlas sẽ không pack gì cả nếu
            // không bật. Đây là thiết lập toàn project — các playable khác không có atlas
            // nào nên không bị ảnh hưởng.
            if (EditorSettings.spritePackerMode != SpritePackerMode.SpriteAtlasV2)
            {
                EditorSettings.spritePackerMode = SpritePackerMode.SpriteAtlasV2;
                Debug.Log("[MonsterArmy] Đã bật Sprite Atlas V2 (trước đó: Disabled).");
            }

            var atlas = new SpriteAtlasAsset();
            var packables = new List<Object>();
            // Cả thư mục bộ phận nhân vật: 88 file nhỏ, gộp lại thành một texture nên
            // toàn bộ đội quân vẽ trong một batch.
            foreach (string folder in new[] { CharactersFolder, VfxFolder })
            {
                var asset = AssetDatabase.LoadAssetAtPath<Object>(folder.TrimEnd('/'));
                if (asset != null) packables.Add(asset);
            }


            atlas.Add(packables.ToArray());
            SpriteAtlasAsset.Save(atlas, AtlasPath);
            AssetDatabase.ImportAsset(AtlasPath, ImportAssetOptions.ForceUpdate);

            // Thiết lập nằm trên importer, không nằm trên asset — bản API trên asset đã
            // bị đánh dấu obsolete và sẽ bị gỡ.
            var importer = AssetImporter.GetAtPath(AtlasPath) as SpriteAtlasImporter;
            if (importer != null)
            {
                importer.includeInBuild = true;

                SpriteAtlasPackingSettings packing = importer.packingSettings;
                packing.enableRotation = false;
                packing.enableTightPacking = false;   // pixel art: giữ nguyên ô chữ nhật
                packing.padding = 4;
                importer.packingSettings = packing;

                SpriteAtlasTextureSettings texture = importer.textureSettings;
                texture.filterMode = FilterMode.Point;   // sắc cạnh, không nội suy
                texture.generateMipMaps = false;
                texture.readable = false;
                importer.textureSettings = texture;

                importer.SaveAndReimport();
            }

            var packed = AssetDatabase.LoadAssetAtPath<SpriteAtlas>(AtlasPath);
            if (packed == null)
            {
                Debug.LogError("[MonsterArmy] Không nạp được atlas sau khi lưu: " + AtlasPath);
                return;
            }

            SpriteAtlasUtility.PackAtlases(new[] { packed }, EditorUserBuildSettings.activeBuildTarget);
            Debug.Log("[MonsterArmy] Atlas: " + packables.Count + " mục, " + packed.spriteCount + " sprite.");
        }

        /// <summary>
        /// Scale để sprite phủ đúng kích thước world mong muốn, bất kể nó bao nhiêu pixel.
        /// </summary>
        private static Vector3 FitScale(Sprite sprite, float targetWidth, float targetHeight)
        {
            if (sprite == null) return Vector3.one;

            Vector2 size = sprite.bounds.size;
            float x = size.x > 0.0001f ? targetWidth / size.x : 1f;
            float y = size.y > 0.0001f ? targetHeight / size.y : 1f;
            return new Vector3(x, y, 1f);
        }

        private static void SetSprites(SerializedObject so, string field, Sprite[] values)
        {
            SerializedProperty property = so.FindProperty(field);
            property.arraySize = values.Length;
            for (int i = 0; i < values.Length; i++)
                property.GetArrayElementAtIndex(i).objectReferenceValue = values[i];
        }

        private static Sprite[] Sheet(string name)
        {
            return SheetAt(Art + name + ".png", name);
        }

        private static Sprite[] SheetAt(string path, string name)
        {
            return AssetDatabase.LoadAllAssetsAtPath(path)
                .OfType<Sprite>()
                .OrderBy(SpriteIndex)
                .ToArray();
        }

        /// <summary>Tên sprite là "<prefix>_<index>"; sắp theo số chứ không theo chuỗi.</summary>
        private static int SpriteIndex(Sprite sprite)
        {
            int underscore = sprite.name.LastIndexOf('_');
            if (underscore < 0) return 0;
            return int.TryParse(sprite.name.Substring(underscore + 1), out int index) ? index : 0;
        }

        private static Sprite Single(string name)
        {
            return AssetDatabase.LoadAssetAtPath<Sprite>(Art + name + ".png");
        }

        private static Sprite[] PickIndices(Sprite[] source, params int[] indices)
        {
            var result = new Sprite[indices.Length];
            for (int i = 0; i < indices.Length; i++) result[i] = MonsterArtLibrary.Pick(source, indices[i]);
            return result;
        }

        // ---------------------------------------------------------------- scene parts

        private static void CreateEventSystem(Transform parent)
        {
            var go = new GameObject("EventSystem", typeof(EventSystem), typeof(StandaloneInputModule));
            go.transform.SetParent(parent, false);
        }

        /// <summary>
        /// AudioManager dùng chung của repo. Playable này không tự phát nhạc nền, nhưng
        /// GameManager sẽ gọi AudioManager.Instance nếu bên vận hành gán Background Music
        /// qua Luna Playground — thiếu nó là null-ref ngay lúc Start.
        /// </summary>
        private static void CreateAudioManager(Transform parent)
        {
            var go = new GameObject("AudioManager");
            go.transform.SetParent(parent, false);

            var music = go.AddComponent<AudioSource>();
            music.playOnAwake = false;
            music.loop = true;
            music.volume = 0.22f;

            var sound = go.AddComponent<AudioSource>();
            sound.playOnAwake = false;

            // Chỉ rõ namespace: UnityEngine cũng có một type AudioManager internal.
            Playable.AudioManager manager = go.AddComponent<Playable.AudioManager>();
            var so = new SerializedObject(manager);
            so.FindProperty("_audioMusic").objectReferenceValue = music;
            so.FindProperty("_audioSound").objectReferenceValue = sound;
            so.ApplyModifiedPropertiesWithoutUndo();
        }

        private static CombatAudio CreateAudio(Transform parent)
        {
            var go = new GameObject("CombatAudio", typeof(AudioSource));
            go.transform.SetParent(parent, false);

            var source = go.GetComponent<AudioSource>();
            source.playOnAwake = false;

            CombatAudio audio = go.AddComponent<CombatAudio>();
            var so = new SerializedObject(audio);
            so.FindProperty("_source").objectReferenceValue = source;
            Clip(so, "_click", "ClickSound");
            Clip(so, "_addItem", "AddItem");
            Clip(so, "_gunshot", "Ak47Shoot");
            Clip(so, "_axeHit", "AxeHit");
            Clip(so, "_laser", "LaserGun");
            Clip(so, "_grenade", "Grinade");
            Clip(so, "_grenadeBoom", "GrinadeBoom1");
            Clip(so, "_monsterDeath", "EnemyGetDamage");
            Clip(so, "_bossStomp", "BoxDestroy");
            Clip(so, "_bossRoar", "MonsterRoar");
            Clip(so, "_fireball", "Fireball");
            SetArray(so, "_monsterVoices", new[] {
                AssetDatabase.LoadAssetAtPath<AudioClip>(Audio + "MonsterVoice1.ogg"),
                AssetDatabase.LoadAssetAtPath<AudioClip>(Audio + "MonsterVoice2.ogg"),
                AssetDatabase.LoadAssetAtPath<AudioClip>(Audio + "MonsterVoice3.ogg") });
            Clip(so, "_error", "Kick");
            so.ApplyModifiedPropertiesWithoutUndo();
            return audio;
        }

        private static void Clip(SerializedObject so, string field, string file)
        {
            so.FindProperty(field).objectReferenceValue =
                AssetDatabase.LoadAssetAtPath<AudioClip>(Audio + file + ".ogg");
        }

        private static ArenaGrid CreateArena(Transform parent, MonsterArtLibrary art)
        {
            var go = new GameObject("Arena");
            go.transform.SetParent(parent, false);
            ArenaGrid grid = go.AddComponent<ArenaGrid>();

            // Sàn lát tile, phủ rộng hơn lưới để không thấy mép ở màn hình rộng.
            var floor = new GameObject("Floor");
            floor.transform.SetParent(go.transform, false);
            var renderer = floor.AddComponent<SpriteRenderer>();
            renderer.sprite = art.GroundTile;
            renderer.drawMode = SpriteDrawMode.Tiled;
            renderer.size = new Vector2(30f, 18f);
            renderer.sortingOrder = -30000;
            floor.transform.position = new Vector3(0f, -2.4f, 0f);

            CreateCellMarkers(grid, art);
            return grid;
        }

        /// <summary>
        /// Vẽ mờ từng ô lưới. Yêu cầu của playable là "xếp quái lên map" — người chơi
        /// phải nhìn thấy có bao nhiêu chỗ và chúng nằm đâu, nếu không sàn đấu chỉ là
        /// một mảng xám trống và họ không biết kéo thả vào đâu.
        /// </summary>
        private static void CreateCellMarkers(ArenaGrid grid, MonsterArtLibrary art)
        {
            var root = new GameObject("Cell Markers");
            root.transform.SetParent(grid.transform, false);

            Vector3 scale = FitScale(art.CellHighlight,
                grid.CellSize.x * 0.92f, grid.CellSize.y * 0.92f);

            for (int column = 0; column < grid.Columns; column++)
            for (int row = 0; row < grid.Rows; row++)
            {
                var cell = new GameObject("Cell " + column + "," + row);
                cell.transform.SetParent(root.transform, false);
                cell.transform.position = grid.CellToWorld(column, row);
                cell.transform.localScale = scale;

                var marker = cell.AddComponent<SpriteRenderer>();
                marker.sprite = art.CellHighlight;
                // Đủ rõ để đọc được là "có ô ở đây", đủ mờ để không át nhân vật.
                marker.color = new Color(1f, 1f, 1f, 0.17f);
                marker.sortingOrder = -25000;
            }
        }

        private static VfxPool CreateVfxPool(Transform parent, MonsterArtLibrary art)
        {
            var go = new GameObject("VfxPool");
            go.transform.SetParent(parent, false);

            VfxPool pool = go.AddComponent<VfxPool>();
            var so = new SerializedObject(pool);
            so.FindProperty("_art").objectReferenceValue = art;
            so.FindProperty("_prewarmCount").intValue = ChaosTier.MaxConcurrentExplosionsCap;
            so.ApplyModifiedPropertiesWithoutUndo();
            return pool;
        }

        private static (Transform, Camera, ArenaCameraFitter) CreateCamera(Transform parent, ArenaGrid grid)
        {
            // Rig và camera tách rời: fitter di chuyển rig, ChaosDirector rung camera
            // quanh localPosition 0. Chung một transform thì hai bên ghi đè lẫn nhau.
            var rig = new GameObject("CameraRig");
            rig.transform.SetParent(parent, false);

            var go = new GameObject("Main Camera", typeof(Camera), typeof(AudioListener));
            go.tag = "MainCamera";
            go.transform.SetParent(rig.transform, false);
            go.transform.localPosition = new Vector3(0f, 0f, -10f);

            var camera = go.GetComponent<Camera>();
            camera.orthographic = true;
            camera.orthographicSize = 7f;
            camera.clearFlags = CameraClearFlags.SolidColor;
            camera.backgroundColor = new Color(0.07f, 0.09f, 0.12f);
            camera.nearClipPlane = 0.1f;
            camera.farClipPlane = 50f;

            ArenaCameraFitter fitter = rig.AddComponent<ArenaCameraFitter>();
            return (rig.transform, camera, fitter);
        }

        private static BossUnit CreateBoss(Transform parent, MonsterArtLibrary art,
            VfxPool vfx, CombatAudio audio)
        {
            var go = new GameObject("Boss");
            go.transform.SetParent(parent, false);
            // Ngay phía trên mép trên của lưới: đội quân tiến thẳng lên gặp boss.
            go.transform.position = new Vector3(0f, 6.65f, 0f);

            MonsterRig rig = go.AddComponent<MonsterRig>();

            // PHẢI đi qua SerializedObject. Gọi rig.SetLibrary(art) chỉ đổi giá trị trong
            // bộ nhớ, Unity không đánh dấu object dirty nên tham chiếu không được ghi vào
            // scene — vào Play thì _art là null, Build() thoát sớm và boss vô hình.
            var rigSo = new SerializedObject(rig);
            rigSo.FindProperty("_art").objectReferenceValue = art;
            rigSo.ApplyModifiedPropertiesWithoutUndo();

            var glowGo = new GameObject("TelegraphGlow");
            glowGo.transform.SetParent(go.transform, false);
            var glow = glowGo.AddComponent<SpriteRenderer>();
            glow.sprite = art.CellHighlight;
            glow.color = new Color(1f, 0.1f, 0.1f, 0f);
            glow.sortingOrder = 19000;
            // Boss cao khoảng 1 đơn vị trước khi nhân _bossScale; viền sáng bao quanh nó.
            glowGo.transform.localScale = FitScale(art.CellHighlight, 1.6f, 1.6f);

            BossUnit boss = go.AddComponent<BossUnit>();
            var so = new SerializedObject(boss);
            so.FindProperty("_rig").objectReferenceValue = rig;
            so.FindProperty("_telegraphGlow").objectReferenceValue = glow;
            so.ApplyModifiedPropertiesWithoutUndo();
            return boss;
        }

        private static Canvas CreateCanvas(Transform parent)
        {
            var go = new GameObject("UI Canvas", typeof(RectTransform), typeof(Canvas),
                typeof(CanvasScaler), typeof(GraphicRaycaster));
            go.transform.SetParent(parent, false);

            var canvas = go.GetComponent<Canvas>();
            canvas.renderMode = RenderMode.ScreenSpaceOverlay;

            var scaler = go.GetComponent<CanvasScaler>();
            scaler.uiScaleMode = CanvasScaler.ScaleMode.ScaleWithScreenSize;
            scaler.referenceResolution = new Vector2(1080f, 1920f);
            go.AddComponent<ResponsiveCanvasScaler>();

            return canvas;
        }

        // ---------------------------------------------------------------- ui

        private sealed class Ui
        {
            public MonsterHotbar Hotbar;
            public BossHealthBar HealthBar;
            public Button StartButton;
            public RectTransform StartButtonRect;
            public RectTransform Hand;
            public RectTransform HandRing;
            public TMP_Text Prompt;
            public Image ScreenFlash;
            public GameObject BurningBorder;
            public TMP_Text ComboText;
            public Button BlockButton;
        }

        private static Ui BuildUi(Canvas canvas, MonsterArtLibrary art, CombatAudio audio)
        {
            var ui = new Ui();
            Transform safe = Full("Safe Area", canvas.transform);

            ui.HealthBar = BuildHealthBar(safe);
            ui.Hotbar = BuildHotbar(safe, art, audio);
            (ui.StartButton, ui.StartButtonRect) = BuildStartButton(safe);

            ui.ScreenFlash = Stretch("Screen Flash", safe, null, Vector2.zero, Vector2.one,
                new Color(1f, 0.9f, 0.6f, 0f));
            ui.BurningBorder = BuildBurningBorder(safe);

            ui.ComboText = BuildComboText(safe);
            (ui.Hand, ui.HandRing, ui.Prompt) = BuildTutorialLayer(safe);
            ui.BlockButton = BuildBlockButton(safe);

            return ui;
        }

        private static BossHealthBar BuildHealthBar(Transform parent)
        {
            RectTransform root = Rect("Boss Health", parent, new Vector2(0.5f, 1f),
                new Vector2(860f, 70f), new Vector2(0f, -70f));

            Stretch("Back", root, null, Vector2.zero, Vector2.one, new Color(0.1f, 0.05f, 0.05f, 0.85f));
            Image fill = Stretch("Fill", root, null, Vector2.zero, Vector2.one,
                new Color(0.85f, 0.12f, 0.15f));
            fill.type = Image.Type.Filled;
            fill.fillMethod = Image.FillMethod.Horizontal;
            fill.fillAmount = 1f;

            TMP_Text label = Text("Percent", root, "100%", new Vector2(0.5f, 0.5f),
                new Vector2(200f, 60f), Vector2.zero, 38f);

            TMP_Text danger = Text("Danger", parent, "Almost! Need more monsters!",
                new Vector2(0.5f, 1f), new Vector2(980f, 110f), new Vector2(0f, -170f), 56f);
            danger.color = new Color(1f, 0.85f, 0.2f);
            danger.gameObject.SetActive(false);

            BossHealthBar bar = root.gameObject.AddComponent<BossHealthBar>();
            var so = new SerializedObject(bar);
            so.FindProperty("_fill").objectReferenceValue = fill;
            so.FindProperty("_shakeRoot").objectReferenceValue = root;
            so.FindProperty("_label").objectReferenceValue = label;
            so.FindProperty("_dangerText").objectReferenceValue = danger;
            so.ApplyModifiedPropertiesWithoutUndo();
            SkinHealthBar(bar);
            return bar;
        }

        private static MonsterHotbar BuildHotbar(Transform parent, MonsterArtLibrary art, CombatAudio audio)
        {
            // Vị trí từng ô do MonsterHotbar tự xếp lúc chạy (2 cột dọc / 4 cột ngang),
            // ở đây chỉ tạo đủ số ô và gán icon.
            const float pitch = 120f;
            int count = MonsterRoster.Count;

            RectTransform root = Rect("Hotbar", parent, new Vector2(0f, 0.5f),
                new Vector2(2 * pitch + 16f, 8 * pitch + 16f), new Vector2(136f, 0f));
            Stretch("Back", root, null, Vector2.zero, Vector2.one, new Color(0f, 0f, 0f, 0.55f));

            var slots = new HotbarSlot[count];
            for (int i = 0; i < count; i++)
            {
                RectTransform slot = Rect("Slot " + i, root, new Vector2(0.5f, 0.5f),
                    new Vector2(112f, 112f), Vector2.zero);

                Image background = slot.gameObject.AddComponent<Image>();
                background.color = new Color(0.16f, 0.17f, 0.2f, 0.95f);
                background.raycastTarget = true;

                Img("Icon", slot, art.Icon(MonsterHotbar.SpeciesAt(i)),
                    new Vector2(0.5f, 0.5f), new Vector2(98f, 98f), Color.white);

                slots[i] = slot.gameObject.AddComponent<HotbarSlot>();
            }

            MonsterHotbar hotbar = root.gameObject.AddComponent<MonsterHotbar>();
            var so = new SerializedObject(hotbar);
            so.FindProperty("_slotRoot").objectReferenceValue = root;
            so.FindProperty("_clipMaterial").objectReferenceValue = HotbarClipMaterial();
            so.FindProperty("_portraitColumns").intValue = 4;
            so.FindProperty("_audio").objectReferenceValue = audio;
            SetArray(so, "_slots", slots);
            so.ApplyModifiedPropertiesWithoutUndo();
            return hotbar;
        }

        private static (Button, RectTransform) BuildStartButton(Transform parent)
        {
            // Góc dưới phải, trên dòng chữ hướng dẫn. Chỉ hiện khi đã đủ quân nên
            // không cần né đội hình lúc đang xếp.
            RectTransform root = Rect("Start Button", parent, new Vector2(1f, 0f),
                new Vector2(360f, 140f), new Vector2(-210f, 250f));

            var background = root.gameObject.AddComponent<Image>();
            background.color = new Color(0.22f, 0.78f, 0.28f);

            Text("Label", root, "START", new Vector2(0.5f, 0.5f), new Vector2(360f, 120f), Vector2.zero, 64f);

            var button = root.gameObject.AddComponent<Button>();
            button.targetGraphic = background;
            SkinStartButton(button);
            return (button, root);
        }

        /// <summary>
        /// Bốn dải sáng ở bốn mép màn hình. Bật khi sàn đấu đông nhất.
        /// </summary>
        private static GameObject BuildBurningBorder(Transform parent)
        {
            Transform root = Full("Burning Border", parent);
            var colour = new Color(1f, 0.32f, 0.08f, 0.5f);
            const float thickness = 0.055f;

            Stretch("Top", root, null, new Vector2(0f, 1f - thickness), Vector2.one, colour);
            Stretch("Bottom", root, null, Vector2.zero, new Vector2(1f, thickness), colour);
            Stretch("Left", root, null, Vector2.zero, new Vector2(thickness * 0.5f, 1f), colour);
            Stretch("Right", root, null, new Vector2(1f - thickness * 0.5f, 0f), Vector2.one, colour);

            root.gameObject.SetActive(false);
            return root.gameObject;
        }

        private static TMP_Text BuildComboText(Transform parent)
        {
            // Dùng TMP như mọi chữ khác trong playable: Unity 6 đã gỡ Arial.ttf khỏi
            // built-in resources ("no longer a valid built in font").
            TMP_Text text = Text("Combo", parent, "", new Vector2(0.5f, 0f),
                new Vector2(700f, 90f), new Vector2(150f, 220f), 54f);
            text.color = new Color(1f, 0.75f, 0.2f);
            text.gameObject.SetActive(false);
            return text;
        }

        /// <summary>
        /// Lớp hướng dẫn: chỉ còn bàn tay, vòng sáng nhấn mạnh và một dòng chữ.
        ///
        /// Không còn bốn mảng che khoét lỗ — với một thao tác duy nhất thì lớp khoá chỉ
        /// tổ làm tối màn hình và chặn nhầm chính vùng sàn mà người chơi cần kéo tới.
        /// </summary>
        private static (RectTransform, RectTransform, TMP_Text) BuildTutorialLayer(Transform parent)
        {
            Transform root = Full("Tutorial", parent);

            var hand = (RectTransform)Img("Hand", root,
                AssetDatabase.LoadAssetAtPath<Sprite>(HandPath),
                new Vector2(0.5f, 0.5f), new Vector2(150f, 150f), Color.white).transform;
            hand.sizeDelta = new Vector2(150f, 150f);
            hand.gameObject.SetActive(false);

            return (hand, null, CreateTutorialPrompt(root));
        }

        private static TMP_Text CreateTutorialPrompt(Transform parent)
        {
            TMP_Text prompt = Text("Prompt", parent, "Tap to add, drag to place!", new Vector2(0.5f, 0.925f),
                new Vector2(900f, 90f), Vector2.zero, 54f);
            prompt.font = AssetDatabase.LoadAssetAtPath<TMP_FontAsset>("Assets/_Playable_/Font/Montserrat-Black SDF.asset");
            prompt.fontStyle = FontStyles.Bold;
            prompt.enableAutoSizing = true;
            prompt.fontSizeMin = 18f;
            prompt.fontSizeMax = 54f;
            prompt.outlineWidth = 0.15f;
            prompt.outlineColor = Color.black;
            return prompt;
        }

        private static Material HotbarClipMaterial()
        {
            const string path = "Assets/_Playable_/MonsterArmy/HotbarClip.mat";
            Material material = AssetDatabase.LoadAssetAtPath<Material>(path);
            if (material == null)
            {
                material = new Material(AssetDatabase.LoadAssetAtPath<Shader>("Assets/_Playable_/MonsterArmy/HotbarClip.shader"));
                AssetDatabase.CreateAsset(material, path);
            }
            return material;
        }

        public static void ApplyHotbarClip()
        {
            var root = GameObject.Find("MonsterArmyPlayable");
            var controller = new SerializedObject(root.GetComponent<MonsterArmyController>());
            var hotbar = (MonsterHotbar)controller.FindProperty("_hotbar").objectReferenceValue;
            var so = new SerializedObject(hotbar);
            so.FindProperty("_clipMaterial").objectReferenceValue = HotbarClipMaterial();
            so.ApplyModifiedPropertiesWithoutUndo();
            AssetDatabase.SaveAssets();
            EditorSceneManager.MarkSceneDirty(root.scene);
            EditorSceneManager.SaveScene(root.scene);
        }

        public static void ApplyTutorialText()
        {
            GameObject root = GameObject.Find("MonsterArmyPlayable");
            if (root == null) throw new System.InvalidOperationException("MonsterArmyPlayable is missing.");
            TutorialDirector tutorial = root.GetComponent<TutorialDirector>();
            var so = new SerializedObject(tutorial);
            var hand = so.FindProperty("_hand").objectReferenceValue as RectTransform;
            Transform tutorialRoot = hand.parent;
            Transform existing = tutorialRoot.Find("Prompt");
            TMP_Text prompt = existing != null ? existing.GetComponent<TMP_Text>() : CreateTutorialPrompt(tutorialRoot);
            prompt.font = AssetDatabase.LoadAssetAtPath<TMP_FontAsset>("Assets/_Playable_/Font/Montserrat-Black SDF.asset");
            prompt.fontStyle = FontStyles.Bold;
            prompt.enableAutoSizing = true;
            prompt.fontSizeMin = 18f;
            prompt.fontSizeMax = 54f;
            prompt.text = "Tap to add, drag to place!";
            prompt.raycastTarget = false;
            prompt.gameObject.SetActive(true);
            so.FindProperty("_prompt").objectReferenceValue = prompt;
            so.ApplyModifiedPropertiesWithoutUndo();
            EditorUtility.SetDirty(prompt);
            EditorSceneManager.MarkSceneDirty(root.scene);
            EditorSceneManager.SaveScene(root.scene);
        }

        private static Button BuildBlockButton(Transform parent)
        {
            Transform root = Full("CTA Block", parent);
            var image = root.gameObject.AddComponent<Image>();
            image.color = new Color(0f, 0f, 0f, 0f);
            image.raycastTarget = true;

            var button = root.gameObject.AddComponent<Button>();
            button.targetGraphic = image;
            ConfigureEndcard(button);
            root.gameObject.SetActive(false);
            return button;
        }

        // ---------------------------------------------------------------- wiring

        private static GameManager CreateGameManager(GameObject root, Ui ui)
        {
            GameManager manager = root.AddComponent<GameManager>();
            var so = new SerializedObject(manager);

            // Boss bất tử: không có WinPanel, không có FailPanel, không có retry.
            // Mọi lượt chơi kết thúc đúng một đường — hết _endTime thì CTA.
            so.FindProperty("_endTime").intValue = 30;
            so.FindProperty("_autoStoreAfterEndcard").boolValue = true;
            so.FindProperty("_backgroundMusic").objectReferenceValue = AssetDatabase.LoadAssetAtPath<AudioClip>(Audio + "BattleMusic.ogg");
            so.FindProperty("_tapToCtaMode").boolValue = false;
            so.FindProperty("_eggRaisingMode").boolValue = false;
            so.FindProperty("_totalEvent").intValue = 0;
            so.FindProperty("_btnBlock").objectReferenceValue = ui.BlockButton;
            so.ApplyModifiedPropertiesWithoutUndo();
            return manager;
        }

        private static void WireChaos(ChaosDirector chaos, VfxPool vfx, Ui ui)
        {
            var so = new SerializedObject(chaos);
            so.FindProperty("_vfx").objectReferenceValue = vfx;
            so.FindProperty("_screenFlash").objectReferenceValue = ui.ScreenFlash;
            so.FindProperty("_burningBorder").objectReferenceValue = ui.BurningBorder;
            so.FindProperty("_comboText").objectReferenceValue = ui.ComboText;
            so.ApplyModifiedPropertiesWithoutUndo();
        }

        private static void WireDragPlacer(DragPlacer placer, Camera camera, ArenaGrid grid,
            MonsterArtLibrary art)
        {
            var highlightGo = new GameObject("Cell Highlight");
            highlightGo.transform.SetParent(grid.transform, false);
            var highlight = highlightGo.AddComponent<SpriteRenderer>();
            highlight.sprite = art.CellHighlight;
            highlight.color = new Color(0.3f, 1f, 0.45f, 0.5f);
            highlight.sortingOrder = -20000;
            highlight.enabled = false;
            // Scale phải tính từ kích thước thật của sprite: ground-sheet0 là 250px, ở
            // 32 PPU thành 7.8 đơn vị, nhân thẳng cellSize sẽ ra ô to gấp bảy lần lưới.
            highlightGo.transform.localScale = FitScale(art.CellHighlight,
                grid.CellSize.x * 0.9f, grid.CellSize.y * 0.9f);

            var so = new SerializedObject(placer);
            so.FindProperty("_camera").objectReferenceValue = camera;
            so.FindProperty("_grid").objectReferenceValue = grid;
            so.FindProperty("_cellHighlight").objectReferenceValue = highlight;
            so.ApplyModifiedPropertiesWithoutUndo();
        }

        private static void WireTutorial(TutorialDirector tutorial, Ui ui, DragPlacer dragPlacer,
            ArenaGrid grid, Camera camera)
        {
            var so = new SerializedObject(tutorial);
            so.FindProperty("_hand").objectReferenceValue = ui.Hand;
            so.FindProperty("_handRing").objectReferenceValue = ui.HandRing;
            so.FindProperty("_prompt").objectReferenceValue = ui.Prompt;
            so.FindProperty("_hotbar").objectReferenceValue = ui.Hotbar;
            so.FindProperty("_dragPlacer").objectReferenceValue = dragPlacer;
            so.FindProperty("_grid").objectReferenceValue = grid;
            so.FindProperty("_worldCamera").objectReferenceValue = camera;
            so.ApplyModifiedPropertiesWithoutUndo();
        }

        private static void WireFitter(ArenaCameraFitter fitter, Transform rig, Camera camera,
            ArenaGrid grid, Transform boss, MonsterHotbar hotbar)
        {
            var so = new SerializedObject(fitter);
            so.FindProperty("_hotbar").objectReferenceValue = hotbar;
            so.FindProperty("_rig").objectReferenceValue = rig;
            so.FindProperty("_camera").objectReferenceValue = camera;
            so.FindProperty("_grid").objectReferenceValue = grid;
            so.FindProperty("_boss").objectReferenceValue = boss;
            so.FindProperty("_floor").objectReferenceValue = grid.transform.Find("Floor").GetComponent<SpriteRenderer>();
            so.ApplyModifiedPropertiesWithoutUndo();
        }

        private static void WireController(MonsterArmyController controller, ArenaGrid grid, Ui ui,
            DragPlacer dragPlacer, TutorialDirector tutorial, ChaosDirector chaos,
            VfxPool vfx, CombatAudio audio, BossUnit boss, MonsterArtLibrary art, Camera camera)
        {
            var so = new SerializedObject(controller);
            so.FindProperty("_grid").objectReferenceValue = grid;
            so.FindProperty("_hotbar").objectReferenceValue = ui.Hotbar;
            so.FindProperty("_dragPlacer").objectReferenceValue = dragPlacer;
            so.FindProperty("_tutorial").objectReferenceValue = tutorial;
            so.FindProperty("_chaos").objectReferenceValue = chaos;
            so.FindProperty("_vfx").objectReferenceValue = vfx;
            so.FindProperty("_audio").objectReferenceValue = audio;
            so.FindProperty("_boss").objectReferenceValue = boss;
            so.FindProperty("_bossHealthBar").objectReferenceValue = ui.HealthBar;
            so.FindProperty("_art").objectReferenceValue = art;
            so.FindProperty("_worldCamera").objectReferenceValue = camera;
            so.FindProperty("_startButton").objectReferenceValue = ui.StartButton;
            so.FindProperty("_startButtonRect").objectReferenceValue = ui.StartButtonRect;
            so.ApplyModifiedPropertiesWithoutUndo();
        }

        private static void WireBoss(BossUnit boss, VfxPool vfx, ChaosDirector chaos,
            CombatAudio audio)
        {
            var so = new SerializedObject(boss);
            so.FindProperty("_vfx").objectReferenceValue = vfx;
            so.FindProperty("_chaos").objectReferenceValue = chaos;
            so.FindProperty("_audio").objectReferenceValue = audio;
            so.ApplyModifiedPropertiesWithoutUndo();
        }

        private static void SetArray<T>(SerializedObject so, string field, IReadOnlyList<T> values)
            where T : Object
        {
            SerializedProperty property = so.FindProperty(field);
            property.arraySize = values.Count;
            for (int i = 0; i < values.Count; i++)
                property.GetArrayElementAtIndex(i).objectReferenceValue = values[i];
        }

        // ---------------------------------------------------------------- ui helpers

        private static RectTransform Rect(string name, Transform parent, Vector2 anchor,
            Vector2 size, Vector2 position)
        {
            var rect = new GameObject(name, typeof(RectTransform)).GetComponent<RectTransform>();
            rect.SetParent(parent, false);
            rect.anchorMin = rect.anchorMax = anchor;
            rect.sizeDelta = size;
            rect.anchoredPosition = position;
            return rect;
        }

        private static Transform Full(string name, Transform parent)
        {
            RectTransform rect = Rect(name, parent, Vector2.zero, Vector2.zero, Vector2.zero);
            rect.anchorMin = Vector2.zero;
            rect.anchorMax = Vector2.one;
            rect.offsetMin = rect.offsetMax = Vector2.zero;
            return rect;
        }

        /// <summary>Image căng theo anchor (dùng cho lớp phủ toàn màn và mảng che).</summary>
        private static Image Stretch(string name, Transform parent, Sprite sprite, Vector2 anchorMin,
            Vector2 anchorMax, Color colour)
        {
            RectTransform rect = Rect(name, parent, Vector2.zero, Vector2.zero, Vector2.zero);
            rect.anchorMin = anchorMin;
            rect.anchorMax = anchorMax;
            rect.offsetMin = rect.offsetMax = Vector2.zero;

            var image = rect.gameObject.AddComponent<Image>();
            image.sprite = sprite;
            image.color = colour;
            image.raycastTarget = false;
            return image;
        }

        /// <summary>Image kích thước cố định.</summary>
        private static Image Img(string name, Transform parent, Sprite sprite, Vector2 anchor,
            Vector2 size, Color colour)
        {
            RectTransform rect = Rect(name, parent, anchor, size, Vector2.zero);
            var image = rect.gameObject.AddComponent<Image>();
            image.sprite = sprite;
            image.color = colour;
            image.preserveAspect = true;
            image.raycastTarget = false;
            return image;
        }

        private static TMP_Text Text(string name, Transform parent, string value, Vector2 anchor,
            Vector2 size, Vector2 position, float fontSize)
        {
            RectTransform rect = Rect(name, parent, anchor, size, position);
            var text = rect.gameObject.AddComponent<TextMeshProUGUI>();
            text.font = AssetDatabase.LoadAssetAtPath<TMP_FontAsset>(FontPath);
            text.text = value;
            text.fontSize = fontSize;
            text.alignment = TextAlignmentOptions.Center;
            text.color = Color.white;
            text.raycastTarget = false;
            text.textWrappingMode = TextWrappingModes.NoWrap;
            return text;
        }
    }
}
