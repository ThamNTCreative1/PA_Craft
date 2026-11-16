using System;
using System.Collections.Generic;
using System.IO;
using TMPro;
using UnityEditor;
using UnityEditor.SceneManagement;
using UnityEngine;
using UnityEngine.EventSystems;
using UnityEngine.TextCore.LowLevel;
using UnityEngine.UI;
using Object = UnityEngine.Object;
using Random = System.Random;

namespace Playable.BrainrotPlayground.EditorTools
{
    /// <summary>
    /// Dựng playable "Brainrot Playground" (OBP) vào Assets/_Playable_/Scenes/Gameplay.unity.
    ///
    /// Theo quy ước repo: scene sinh ra từ code qua menu, nội dung cũ của Gameplay.unity bị XOÁ —
    /// khôi phục bằng `git checkout -- Assets/_Playable_/Scenes/Gameplay.unity`.
    ///
    /// Asset gốc lấy từ APK "Obby Brainrot Playground" (Construct 3): spritesheet chép vào Source/,
    /// toạ độ frame lấy từ assets/game/data.json (gốc trên-trái). Script cắt từng frame, bỏ viền trong suốt,
    /// lưu PNG riêng vào Generated/ (lọc Point cho đúng chất pixel-art).
    /// </summary>
    public static class BrainrotPlaygroundSetup
    {
        private const string Root = "Assets/_Playable_/BrainrotPlayground/";
        private const string Src = Root + "Source/";
        private const string Gen = Root + "Generated/";
        private const string ScenePath = "Assets/_Playable_/Scenes/Gameplay.unity";
        private const string HandPath = "Assets/_Playable_/TempleRun/UI/Sprites/hand.png";
        private const string ArrowPath = "Assets/_Playable_/TempleRun/UI/Sprites/arrow-left.png";
        private const string TitleFontSource = "Assets/Game/Fonts/FFFFORWA.TTF";
        private const string Audio = "Assets/_Playable_/MonsterArmy/Audio/";
        private const string BgmPath = Root + "Audio/BGM_Playground.mp3";

        private const string Icons = "sprite28-sheet0.png";
        private const string Tiles = "sprite10-sheet0.png";
        private const string Ui = "shared-1-sheet2.png";
        private const string Items = "buttonitem-sheet0.png";

        // Bản đồ: 28 x 18 ô, mỗi ô = 1 đơn vị thế giới, 32 px trong texture.
        private const int MapW = 28, MapH = 18, TilePx = 32;
        private const float CharacterPpu = 56f;   // icon 92px ≈ 1.6 ô
        private const float PropPpu = 64f;

        private static readonly RectInt[] SlotBrainrots =
        {
            new RectInt(377, 641, 92, 92), // cốc cappuccino
            new RectInt(565, 769, 92, 92), // 67
            new RectInt(847, 641, 92, 92), // cá mập (ô hướng dẫn)
            new RectInt(565, 641, 92, 92), // khỉ
            new RectInt(189, 769, 92, 92), // nấm hồng
            new RectInt(753, 641, 92, 92), // cá mập xanh
            new RectInt(471, 641, 92, 92), // gấu trúc
            new RectInt(659, 641, 92, 92), // ông già
        };

        // Chỉ số nhân vật (rig trong BrainrotRigData) ứng với từng ô của bảng chọn — cùng thứ tự với SlotBrainrots.
        private static readonly int[] SlotRigs = { 2, 14, 7, 4, 10, 6, 3, 5 };

        // Nhân vật đi lang thang trên sân + vũ khí cầm ở tay phải (-1 = tay không, 0 = gậy bóng chày, 1 = búa).
        private static readonly int[] WalkerRigs = { 1, 0, 9, 12, 13, 15, 8, 11, 2, 7 };
        private static readonly int[] WalkerWeapons = { 0, -1, 1, 0, -1, 0, -1, -1, -1, 1 };
        private static readonly RectInt[] WeaponRects = { new RectInt(753, 385, 92, 92), new RectInt(847, 385, 92, 92) };

        private const float RigPpu = 56f;   // nhân vật ~160px → cao ~2.9 ô

        private static readonly Vector2[] WalkerSpots =
        {
            new Vector2(-8f, 4f), new Vector2(-3f, 6f), new Vector2(4f, 5.5f), new Vector2(8f, 1f),
            new Vector2(-6f, -2f), new Vector2(2f, -4f), new Vector2(9f, -5f), new Vector2(-1f, 1f),
            new Vector2(5f, -1f), new Vector2(-10f, -5f),
        };

        private struct Prop
        {
            public string Name;
            public RectInt Rect;
            public Vector2 Position;

            public Prop(string name, int x, int y, Vector2 position)
            {
                Name = name;
                Rect = new RectInt(x, y, 92, 92);
                Position = position;
            }
        }

        private static readonly Prop[] Props =
        {
            new Prop("Crate", 1, 1409, new Vector2(-10.5f, -4.2f)),
            new Prop("Crate", 1, 1409, new Vector2(-9.4f, -4.4f)),
            new Prop("Crate", 1, 1409, new Vector2(-10f, -3.3f)),
            new Prop("Soccer Ball", 847, 1409, new Vector2(3.2f, 2.4f)),
            new Prop("Tire", 95, 1537, new Vector2(-4.5f, -5.6f)),
            new Prop("Balloon", 189, 1537, new Vector2(-12f, 6.5f)),
            new Prop("Duck", 283, 1537, new Vector2(9.2f, 3.6f)),
            new Prop("Cone", 377, 1537, new Vector2(6.4f, -0.2f)),
            new Prop("Cone", 377, 1537, new Vector2(8.6f, -0.2f)),
            new Prop("Barrier", 471, 1537, new Vector2(-1.5f, -0.4f)),
            new Prop("Trash", 565, 1537, new Vector2(12.2f, -3.8f)),
            new Prop("Pumpkin", 753, 1537, new Vector2(-6.8f, 3.2f)),
            new Prop("Watermelon", 95, 1665, new Vector2(1.4f, 6.8f)),
            new Prop("Flower", 189, 1665, new Vector2(-12.3f, 1.6f)),
            new Prop("Flower", 189, 1665, new Vector2(12.4f, 7.2f)),
            new Prop("TV", 377, 1665, new Vector2(10.8f, -6.2f)),
            new Prop("Gas Can", 1, 1537, new Vector2(-2.5f, -6.4f)),
        };

        [MenuItem("Tools/Brainrot Playground/Setup Playable")]
        public static void Apply()
        {
            if (!Application.isBatchMode && !EditorUtility.DisplayDialog("Brainrot Playground",
                    "Xoá sạch nội dung hiện tại của Gameplay.unity rồi dựng lại playable Brainrot Playground?\n\n" +
                    "Khôi phục được bằng: git checkout -- " + ScenePath,
                    "Dựng", "Huỷ"))
                return;
            Build();
        }

        /// <summary>Bản không hỏi — gọi được từ script/MCP.</summary>
        public static void Build()
        {
            EnsureFolder(Gen.TrimEnd('/'));
            Art art = BuildArt();

            var scene = EditorSceneManager.OpenScene(ScenePath);
            foreach (GameObject old in scene.GetRootGameObjects()) Object.DestroyImmediate(old);
            RenderSettings.skybox = null;

            var root = new GameObject("BrainrotPlayground");
            var es = new GameObject("EventSystem", typeof(EventSystem), typeof(StandaloneInputModule));
            es.transform.SetParent(root.transform, false);
            CreateAudioManager(root.transform);

            PlaygroundCamera cam = CreateCamera(root.transform);
            Transform world = new GameObject("World").transform;
            world.SetParent(root.transform, false);
            BuildWorld(world, art);
            Transform chosen = new GameObject("Chosen Brainrots").transform;
            chosen.SetParent(world, false);
            var spawns = new List<Object>();
            for (int i = 0; i < SlotRigs.Length; i++)
                spawns.Add(CreateWalker(chosen, "Chosen " + i, SlotRigs[i], -1, Vector2.zero, art, 100 + i));

            HudRefs hud = BuildHud(root.transform, art);

            var audioGo = new GameObject("Sfx", typeof(AudioSource));
            audioGo.transform.SetParent(root.transform, false);
            var source = audioGo.GetComponent<AudioSource>();
            source.playOnAwake = false;

            GameManager gameManager = root.AddComponent<GameManager>();
            var gm = new SerializedObject(gameManager);
            gm.FindProperty("_endTime").intValue = 30;
            gm.FindProperty("_storeOnEndTime").boolValue = true;
            gm.FindProperty("_autoStoreAfterEndcard").boolValue = false;
            gm.FindProperty("_tapToCtaMode").boolValue = false;
            gm.FindProperty("_eggRaisingMode").boolValue = false;
            gm.FindProperty("_totalEvent").intValue = 0;
            gm.FindProperty("_btnBlock").objectReferenceValue = hud.Blocker;
            // Nhạc nền lặp (field Luna "Background Music"): 32s cắt từ Assets/Sound/Easy Parkour Music.mp3, mono 64kbps.
            var bgm = AssetDatabase.LoadAssetAtPath<AudioClip>(BgmPath);
            if (bgm == null) Debug.LogWarning("[BrainrotPlayground] Missing BGM: " + BgmPath);
            gm.FindProperty("_backgroundMusic").objectReferenceValue = bgm;
            gm.ApplyModifiedPropertiesWithoutUndo();

            var controller = root.AddComponent<BrainrotPlaygroundController>();
            var so = new SerializedObject(controller);
            so.FindProperty("_gameManager").objectReferenceValue = gameManager;
            so.FindProperty("_camera").objectReferenceValue = cam;
            so.FindProperty("_layout").objectReferenceValue = hud.Layout;
            so.FindProperty("_tapCatcher").objectReferenceValue = hud.Catcher;
            SetArray(so, "_slots", hud.Slots.ConvertAll(s => (Object)s));
            SetArray(so, "_slotFrames", hud.SlotFrames.ConvertAll(s => (Object)s));
            so.FindProperty("_slotNormal").objectReferenceValue = art.SlotNormal;
            so.FindProperty("_slotSelected").objectReferenceValue = art.SlotSelected;
            so.FindProperty("_title").objectReferenceValue = hud.Title;
            so.FindProperty("_subtitle").objectReferenceValue = hud.Subtitle;
            so.FindProperty("_arrow").objectReferenceValue = hud.Arrow;
            so.FindProperty("_arrowBody").objectReferenceValue = hud.ArrowBody;
            so.FindProperty("_hand").objectReferenceValue = hud.Hand;
            so.FindProperty("_tapFx").objectReferenceValue = hud.TapFx;
            so.FindProperty("_tapRing").objectReferenceValue = hud.TapRing;
            SetArray(so, "_tapRays", hud.TapRays);
            SetArray(so, "_spawns", spawns);
            so.FindProperty("_audio").objectReferenceValue = source;
            so.FindProperty("_click").objectReferenceValue = AssetDatabase.LoadAssetAtPath<AudioClip>(Audio + "ClickSound.ogg");
            so.FindProperty("_spawnClip").objectReferenceValue = AssetDatabase.LoadAssetAtPath<AudioClip>(Audio + "AddItem.ogg");
            so.ApplyModifiedPropertiesWithoutUndo();

            EditorSceneManager.MarkSceneDirty(scene);
            EditorSceneManager.SaveScene(scene);
            AssetDatabase.SaveAssets();
            foreach (Texture2D t in art.SheetCache.Values) Object.DestroyImmediate(t);
            Debug.Log("[BrainrotPlayground] Dựng xong playable vào " + ScenePath);
        }

        // ================================================================== art

        private sealed class Art
        {
            public Sprite Map, Shadow, Panel, SlotNormal, SlotSelected, Hand, Arrow, TapRing, TapRay;
            public Sprite[] Slots, Tabs, Weapons;
            public Dictionary<string, Sprite> Props = new Dictionary<string, Sprite>();
            // Sprite bộ phận nhân vật, khoá = sheet + rect + origin (nhiều nhân vật dùng chung tay/chân).
            public Dictionary<string, Sprite> Parts = new Dictionary<string, Sprite>();
            public Func<string, Texture2D> Sheet;
            public Dictionary<string, Texture2D> SheetCache;
        }

        private static Art BuildArt()
        {
            var sheets = new Dictionary<string, Texture2D>();
            Func<string, Texture2D> sheet = file =>
            {
                Texture2D t;
                if (!sheets.TryGetValue(file, out t))
                {
                    t = new Texture2D(2, 2, TextureFormat.RGBA32, false);
                    t.LoadImage(File.ReadAllBytes(Src + file));
                    sheets[file] = t;
                }
                return t;
            };

            var art = new Art();
            art.Slots = new Sprite[SlotBrainrots.Length];
            for (int i = 0; i < SlotBrainrots.Length; i++)
                art.Slots[i] = Cut(sheet(Icons), SlotBrainrots[i], "Brainrot_Slot" + i, CharacterPpu, true);
            art.Weapons = new Sprite[WeaponRects.Length];
            for (int i = 0; i < WeaponRects.Length; i++)
                art.Weapons[i] = Cut(sheet(Icons), WeaponRects[i], "Weapon" + i, RigPpu, false, new Vector2(0.14f, 0.14f));
            art.Sheet = sheet;
            art.SheetCache = sheets;
            foreach (Prop p in Props)
                if (!art.Props.ContainsKey(p.Name))
                    art.Props[p.Name] = Cut(sheet(Icons), p.Rect, "Prop_" + p.Name.Replace(" ", ""), PropPpu, true);

            RectInt[] tabs =
            {
                new RectInt(125, 897, 72, 72), new RectInt(199, 769, 72, 72), new RectInt(51, 769, 72, 72),
                new RectInt(379, 769, 72, 72), new RectInt(305, 769, 72, 72),
            };
            art.Tabs = new Sprite[tabs.Length];
            for (int i = 0; i < tabs.Length; i++) art.Tabs[i] = Cut(sheet(Ui), tabs[i], "UI_Tab" + i, 100f, false);
            art.SlotNormal = Cut(sheet(Items), new RectInt(129, 1, 92, 92), "UI_Slot", 100f, false);
            art.SlotSelected = Cut(sheet(Items), new RectInt(1, 129, 96, 96), "UI_SlotSelected", 100f, false);

            art.Map = BuildMap(sheet(Tiles));
            art.Shadow = BuildShadow();
            art.Panel = BuildPanel();
            art.TapRing = BuildRing();
            art.TapRay = BuildRay();
            art.Hand = LoadSprite(HandPath);
            art.Arrow = LoadSprite(ArrowPath);

            return art;
        }

        /// <summary>Sprite 1 bộ phận nhân vật (không cắt viền), pivot = origin của frame gốc.</summary>
        private static Sprite PartSprite(Art art, BrainrotRigData.Part part)
        {
            string key = part.Sheet + part.Rect + part.Origin;
            Sprite sprite;
            if (art.Parts.TryGetValue(key, out sprite)) return sprite;
            Texture2D sheet = art.Sheet(part.Sheet);
            RectInt r = part.Rect;
            var tex = new Texture2D(r.width, r.height, TextureFormat.RGBA32, false);
            // Duyệt theo toạ độ frame gốc (y hướng xuống); frame xoay thì đọc vùng lưu đã quay 90° chiều kim đồng hồ.
            for (int y = 0; y < r.height; y++)
            for (int x = 0; x < r.width; x++)
            {
                int sx = part.Rotated ? r.x + (r.height - 1 - y) : r.x + x;
                int sy = part.Rotated ? r.y + x : r.y + y;
                tex.SetPixel(x, r.height - 1 - y, sheet.GetPixel(sx, sheet.height - 1 - sy));
            }
            tex.Apply();
            string name = "Part_" + Path.GetFileNameWithoutExtension(part.Sheet).Replace("-sheet0", "") + "_" + r.x + "_" + r.y
                          + "_" + Mathf.RoundToInt(part.Origin.y * 1000f);
            sprite = SaveSprite(tex, name, RigPpu, new Vector2(part.Origin.x, 1f - part.Origin.y), Vector4.zero);
            art.Parts[key] = sprite;
            return sprite;
        }

        /// <summary>Cắt 1 frame (toạ độ gốc trên-trái như data.json), bỏ viền trong suốt, lưu thành sprite riêng.</summary>
        private static Sprite Cut(Texture2D sheet, RectInt r, string name, float ppu, bool bottomPivot)
        {
            return Cut(sheet, r, name, ppu, bottomPivot, bottomPivot ? new Vector2(0.5f, 0f) : new Vector2(0.5f, 0.5f));
        }

        private static Sprite Cut(Texture2D sheet, RectInt r, string name, float ppu, bool unused, Vector2 pivot)
        {
            int y = sheet.height - r.y - r.height;
            Color32[] px = GetBlock(sheet, r.x, y, r.width, r.height);
            int minX = r.width, minY = r.height, maxX = -1, maxY = -1;
            for (int j = 0; j < r.height; j++)
            for (int i = 0; i < r.width; i++)
            {
                if (px[j * r.width + i].a < 8) continue;
                if (i < minX) minX = i;
                if (i > maxX) maxX = i;
                if (j < minY) minY = j;
                if (j > maxY) maxY = j;
            }
            if (maxX < 0) { minX = minY = 0; maxX = r.width - 1; maxY = r.height - 1; }
            int w = maxX - minX + 1, h = maxY - minY + 1;
            var tex = new Texture2D(w, h, TextureFormat.RGBA32, false);
            tex.SetPixels32(GetBlock(sheet, r.x + minX, y + minY, w, h));
            tex.Apply();
            return SaveSprite(tex, name, ppu, pivot, Vector4.zero);
        }

        private static Color32[] GetBlock(Texture2D sheet, int x, int y, int w, int h)
        {
            Color[] c = sheet.GetPixels(x, y, w, h);
            var result = new Color32[c.Length];
            for (int i = 0; i < c.Length; i++) result[i] = c[i];
            return result;
        }

        // ------------------------------------------------------------------ map

        private enum T { Grass, Leaves, Stone, Sand, Dirt, Plank, Log, Water, Brick, Navy, Brown, Mauve, Blue, White, Orange }

        private static readonly Dictionary<T, Vector2Int> TileSrc = new Dictionary<T, Vector2Int>
        {
            { T.Grass, new Vector2Int(265, 129) }, { T.Leaves, new Vector2Int(1, 129) },
            { T.Stone, new Vector2Int(67, 129) }, { T.Sand, new Vector2Int(397, 129) },
            { T.Dirt, new Vector2Int(331, 129) }, { T.Plank, new Vector2Int(67, 1) },
            { T.Log, new Vector2Int(133, 129) }, { T.Water, new Vector2Int(385, 1) },
            { T.Brick, new Vector2Int(133, 1) }, { T.Navy, new Vector2Int(331, 385) },
            { T.Brown, new Vector2Int(133, 385) }, { T.Mauve, new Vector2Int(199, 385) },
            { T.Blue, new Vector2Int(1, 385) }, { T.White, new Vector2Int(265, 385) },
            { T.Orange, new Vector2Int(397, 385) },
        };

        /// <summary>Bố cục bản đồ (x 0..27 trái→phải, y 0..17 dưới→trên).</summary>
        private static T TileAt(int x, int y, Random rng)
        {
            // Tường khối lego dọc mép dưới (giống ảnh mẫu).
            if (y <= 1)
            {
                T[] wall = { T.Navy, T.Brown, T.Mauve, T.Brown, T.Blue, T.Brown, T.Navy };
                return wall[(x / 3) % wall.Length];
            }
            // Hồ nước góc trên-phải, viền đá.
            if (x >= 22 && x <= 26 && y >= 11 && y <= 15) return T.Water;
            if (x >= 21 && x <= 27 && y >= 10 && y <= 16) return T.Stone;
            // Đường đá dọc + ngang.
            if (x >= 17 && x <= 19 && y >= 2) return T.Stone;
            if (y >= 7 && y <= 8) return T.Stone;
            // Quảng trường lego trắng bên phải.
            if (x >= 21 && y >= 2 && y <= 5) return T.White;
            // Lối cát từ trên xuống giữa bản đồ + bãi cát.
            if (x >= 9 && x <= 11 && y >= 9) return T.Sand;
            if (x >= 12 && x <= 15 && y >= 12 && y <= 16) return T.Sand;
            // Sàn gỗ bên trái dưới, viền gỗ cây.
            if (x >= 2 && x <= 8 && y >= 3 && y <= 5) return (x == 2 || x == 8 || y == 3) ? T.Log : T.Plank;
            // Mảng đất nâu sẫm trên-trái.
            if (x >= 3 && x <= 6 && y >= 11 && y <= 14) return T.Dirt;
            // Lối gạch nối sàn gỗ → đường ngang.
            if (x >= 11 && x <= 13 && y >= 2 && y <= 6) return T.Brick;
            return rng.NextDouble() < 0.12 ? T.Leaves : T.Grass;
        }

        private static Sprite BuildMap(Texture2D tiles)
        {
            var cache = new Dictionary<T, Color32[]>();
            var rng = new Random(7);
            var tex = new Texture2D(MapW * TilePx, MapH * TilePx, TextureFormat.RGBA32, false);
            for (int ty = 0; ty < MapH; ty++)
            for (int tx = 0; tx < MapW; tx++)
            {
                T kind = TileAt(tx, ty, rng);
                Color32[] block;
                if (!cache.TryGetValue(kind, out block))
                {
                    Vector2Int s = TileSrc[kind];
                    Color32[] full = GetBlock(tiles, s.x, tiles.height - s.y - 64, 64, 64);
                    block = new Color32[TilePx * TilePx];
                    int step = 64 / TilePx;
                    for (int j = 0; j < TilePx; j++)
                    for (int i = 0; i < TilePx; i++)
                    {
                        Color32 c = full[j * step * 64 + i * step];
                        c.a = 255;
                        block[j * TilePx + i] = c;
                    }
                    cache[kind] = block;
                }
                tex.SetPixels32(tx * TilePx, ty * TilePx, TilePx, TilePx, block);
            }
            tex.Apply();
            return SaveSprite(tex, "Map_Playground", TilePx, new Vector2(0.5f, 0.5f), Vector4.zero);
        }

        private static Sprite BuildShadow()
        {
            const int w = 48, h = 20;
            var tex = new Texture2D(w, h, TextureFormat.RGBA32, false);
            for (int y = 0; y < h; y++)
            for (int x = 0; x < w; x++)
            {
                float dx = (x + 0.5f - w * 0.5f) / (w * 0.5f);
                float dy = (y + 0.5f - h * 0.5f) / (h * 0.5f);
                float d = dx * dx + dy * dy;
                tex.SetPixel(x, y, new Color(0f, 0f, 0f, d < 1f ? 0.32f : 0f));
            }
            tex.Apply();
            return SaveSprite(tex, "Shadow", 32f, new Vector2(0.5f, 0.5f), Vector4.zero);
        }

        /// <summary>Khung bảng 9-slice kiểu pixel: viền nâu sẫm, mép sáng phía trên, nền cam (giống ảnh mẫu).</summary>
        private static Sprite BuildPanel()
        {
            const int s = 24;
            Color edge = new Color32(0x4A, 0x24, 0x12, 0xFF);
            Color light = new Color32(0xF6, 0xB2, 0x7A, 0xFF);
            Color fill = new Color32(0xDB, 0x83, 0x4C, 0xFF);
            Color dark = new Color32(0xB0, 0x5E, 0x30, 0xFF);
            var tex = new Texture2D(s, s, TextureFormat.RGBA32, false);
            for (int y = 0; y < s; y++)
            for (int x = 0; x < s; x++)
            {
                bool corner = (x < 2 || x >= s - 2) && (y < 2 || y >= s - 2);
                Color c;
                if (corner) c = Color.clear;
                else if (x < 3 || x >= s - 3 || y < 3 || y >= s - 3) c = edge;
                else if (y >= s - 6) c = light;
                else if (y < 6) c = dark;
                else c = fill;
                tex.SetPixel(x, y, c);
            }
            tex.Apply();
            return SaveSprite(tex, "UI_Panel", 100f, new Vector2(0.5f, 0.5f), new Vector4(8, 8, 8, 8));
        }

        /// <summary>Vòng sóng nhấn: vành tròn trắng, mép mềm (vẽ mịn, không theo pixel-art).</summary>
        private static Sprite BuildRing()
        {
            const int s = 128;
            var tex = new Texture2D(s, s, TextureFormat.RGBA32, false);
            for (int y = 0; y < s; y++)
            for (int x = 0; x < s; x++)
            {
                float d = new Vector2(x + 0.5f - s * 0.5f, y + 0.5f - s * 0.5f).magnitude / (s * 0.5f);
                float a = Mathf.Clamp01(1f - Mathf.Abs(d - 0.86f) / 0.1f);
                tex.SetPixel(x, y, new Color(1f, 1f, 1f, a * a * (3f - 2f * a)));
            }
            tex.Apply();
            return SaveSprite(tex, "FX_TapRing", 100f, new Vector2(0.5f, 0.5f), Vector4.zero, FilterMode.Bilinear);
        }

        /// <summary>Vạch sáng: thanh bo tròn 2 đầu (tô màu bằng Image.color).</summary>
        private static Sprite BuildRay()
        {
            const int w = 16, h = 64;
            var tex = new Texture2D(w, h, TextureFormat.RGBA32, false);
            float r = w * 0.5f;
            for (int y = 0; y < h; y++)
            for (int x = 0; x < w; x++)
            {
                float cy = Mathf.Clamp(y + 0.5f, r, h - r);
                float d = new Vector2(x + 0.5f - r, y + 0.5f - cy).magnitude;
                tex.SetPixel(x, y, new Color(1f, 1f, 1f, Mathf.Clamp01(r - d + 0.5f)));
            }
            tex.Apply();
            return SaveSprite(tex, "FX_TapRay", 100f, new Vector2(0.5f, 0f), Vector4.zero, FilterMode.Bilinear);
        }

        /// <summary>
        /// Font tiêu đề: FFFFORWA (font pixel của các playable khác), viền xanh-đen dày + bóng đổ phía dưới.
        /// Atlas tĩnh chỉ chứa ký tự cần dùng để nhẹ build.
        /// </summary>
        private static TMP_FontAsset BuildTitleFont(out Material outline)
        {
            string path = Gen + "Title SDF.asset";
            string outlinePath = Gen + "Title Outline.mat";
            var source = AssetDatabase.LoadAssetAtPath<Font>(TitleFontSource);
            if (source == null) throw new InvalidOperationException("Missing font: " + TitleFontSource);

            if (AssetDatabase.LoadAssetAtPath<TMP_FontAsset>(path) != null) AssetDatabase.DeleteAsset(path);
            TMP_FontAsset font = TMP_FontAsset.CreateFontAsset(source, 90, 12, GlyphRenderMode.SDFAA, 1024, 1024,
                AtlasPopulationMode.Dynamic, false);
            font.name = "Title SDF";
            string missing;
            font.TryAddCharacters(" !ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789", out missing);
            if (!string.IsNullOrEmpty(missing)) Debug.LogWarning("[BrainrotPlayground] Font tiêu đề thiếu ký tự: " + missing);
            AssetDatabase.CreateAsset(font, path);
            Texture2D atlas = font.atlasTextures[0];
            atlas.name = "Title Atlas";
            AssetDatabase.AddObjectToAsset(atlas, font);
            font.material.name = "Title Material";
            AssetDatabase.AddObjectToAsset(font.material, font);
            font.atlasPopulationMode = AtlasPopulationMode.Static;
            EditorUtility.SetDirty(font);
            AssetDatabase.SaveAssets();

            outline = new Material(font.material) { name = "Title Outline" };
            outline.EnableKeyword("OUTLINE_ON");
            outline.SetFloat("_OutlineWidth", 0.3f);
            outline.SetColor("_OutlineColor", new Color32(0x1A, 0x1A, 0x2E, 0xFF));
            outline.SetFloat("_FaceDilate", 0.15f);
            outline.EnableKeyword("UNDERLAY_ON");
            outline.SetColor("_UnderlayColor", new Color32(0x1A, 0x1A, 0x2E, 0xFF));
            outline.SetFloat("_UnderlayOffsetX", 0.15f);
            outline.SetFloat("_UnderlayOffsetY", -0.6f);
            outline.SetFloat("_UnderlayDilate", 0.45f);
            outline.SetFloat("_UnderlaySoftness", 0f);
            if (AssetDatabase.LoadAssetAtPath<Material>(outlinePath) != null) AssetDatabase.DeleteAsset(outlinePath);
            AssetDatabase.CreateAsset(outline, outlinePath);
            return font;
        }

        private static Sprite SaveSprite(Texture2D tex, string name, float ppu, Vector2 pivot, Vector4 border)
        {
            return SaveSprite(tex, name, ppu, pivot, border, FilterMode.Point);
        }

        private static Sprite SaveSprite(Texture2D tex, string name, float ppu, Vector2 pivot, Vector4 border, FilterMode filter)
        {
            string path = Gen + name + ".png";
            File.WriteAllBytes(path, tex.EncodeToPNG());
            Object.DestroyImmediate(tex);
            AssetDatabase.ImportAsset(path, ImportAssetOptions.ForceUpdate);
            var importer = (TextureImporter)AssetImporter.GetAtPath(path);
            importer.textureType = TextureImporterType.Sprite;
            importer.spriteImportMode = SpriteImportMode.Single;
            importer.spritePixelsPerUnit = ppu;
            var settings = new TextureImporterSettings();
            importer.ReadTextureSettings(settings);
            settings.spriteAlignment = (int)SpriteAlignment.Custom;
            settings.spritePivot = pivot;
            settings.spriteBorder = border;
            settings.spriteMeshType = SpriteMeshType.FullRect;
            importer.SetTextureSettings(settings);
            importer.mipmapEnabled = false;
            importer.alphaIsTransparency = true;
            importer.filterMode = filter;
            importer.wrapMode = TextureWrapMode.Clamp;
            importer.textureCompression = TextureImporterCompression.Uncompressed;
            importer.SaveAndReimport();
            return AssetDatabase.LoadAssetAtPath<Sprite>(path);
        }

        private static Sprite LoadSprite(string path)
        {
            var importer = AssetImporter.GetAtPath(path) as TextureImporter;
            if (importer == null) throw new InvalidOperationException("Missing sprite: " + path);
            if (importer.textureType != TextureImporterType.Sprite)
            {
                importer.textureType = TextureImporterType.Sprite;
                importer.spriteImportMode = SpriteImportMode.Single;
                importer.mipmapEnabled = false;
                importer.SaveAndReimport();
            }
            return AssetDatabase.LoadAssetAtPath<Sprite>(path);
        }

        // ================================================================== world

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
            Playable.AudioManager manager = go.AddComponent<Playable.AudioManager>();
            var so = new SerializedObject(manager);
            so.FindProperty("_audioMusic").objectReferenceValue = music;
            so.FindProperty("_audioSound").objectReferenceValue = sound;
            so.ApplyModifiedPropertiesWithoutUndo();
        }

        private static PlaygroundCamera CreateCamera(Transform parent)
        {
            var go = new GameObject("Main Camera", typeof(Camera), typeof(AudioListener));
            go.tag = "MainCamera";
            go.transform.SetParent(parent, false);
            go.transform.position = new Vector3(0f, 0f, -10f);
            var cam = go.GetComponent<Camera>();
            cam.orthographic = true;
            cam.clearFlags = CameraClearFlags.SolidColor;
            cam.backgroundColor = new Color32(0x3E, 0x8E, 0x2E, 0xFF);
            cam.nearClipPlane = 0.1f;
            cam.farClipPlane = 50f;
            var pc = go.AddComponent<PlaygroundCamera>();
            var so = new SerializedObject(pc);
            so.FindProperty("_map").rectValue = new Rect(-MapW * 0.5f, -MapH * 0.5f, MapW, MapH);
            so.FindProperty("_focus").vector2Value = new Vector2(0f, 0.5f);
            so.ApplyModifiedPropertiesWithoutUndo();
            return pc;
        }

        private static void BuildWorld(Transform world, Art art)
        {
            var map = new GameObject("Map", typeof(SpriteRenderer));
            map.transform.SetParent(world, false);
            var mr = map.GetComponent<SpriteRenderer>();
            mr.sprite = art.Map;
            mr.sortingOrder = -30000;

            Transform props = new GameObject("Props").transform;
            props.SetParent(world, false);
            foreach (Prop p in Props)
            {
                var go = new GameObject(p.Name, typeof(SpriteRenderer));
                go.transform.SetParent(props, false);
                go.transform.localPosition = p.Position;
                var r = go.GetComponent<SpriteRenderer>();
                r.sprite = art.Props[p.Name];
                // Cùng thang thứ tự với BrainrotWalker: (1000 - y*20) * 10.
                r.sortingOrder = (1000 - Mathf.RoundToInt(p.Position.y * 20f)) * 10 + 5;
                var shadow = new GameObject("Shadow", typeof(SpriteRenderer));
                shadow.transform.SetParent(go.transform, false);
                shadow.transform.localScale = new Vector3(0.9f, 0.9f, 1f);
                var sr = shadow.GetComponent<SpriteRenderer>();
                sr.sprite = art.Shadow;
                sr.sortingOrder = r.sortingOrder - 15;
            }

            Transform walkers = new GameObject("Brainrots").transform;
            walkers.SetParent(world, false);
            for (int i = 0; i < WalkerRigs.Length; i++)
                CreateWalker(walkers, "Brainrot " + WalkerRigs[i], WalkerRigs[i], WalkerWeapons[i],
                    WalkerSpots[i % WalkerSpots.Length], art, i + 1);
        }

        /// <summary>
        /// Ghép nhân vật đủ thân theo rig gốc: thân đặt tại gốc, đầu/tay/chân gắn vào image point của thân.
        /// Toạ độ pixel (y hướng lên) rồi chia RigPpu; cả người được nâng lên để đế chân chạm y = 0.
        /// Thứ tự vẽ: tay trái (sau) → chân → thân → đầu → vũ khí → tay phải (trước).
        /// </summary>
        private static BrainrotWalker CreateWalker(Transform parent, string name, int rigIndex, int weapon,
            Vector2 position, Art art, int seed)
        {
            BrainrotRigData.Rig rig = BrainrotRigData.Rigs[rigIndex];
            var go = new GameObject(name);
            go.transform.SetParent(parent, false);
            go.transform.localPosition = position;

            RectInt b = rig.Body.Rect;
            Func<Vector2, Vector2> bodyPoint = p => new Vector2(
                (p.x - rig.Body.Origin.x) * b.width, -(p.y - rig.Body.Origin.y) * b.height);
            Vector2 footL = bodyPoint(rig.FootLeftPoint);
            Vector2 footR = bodyPoint(rig.FootRightPoint);
            float lowL = footL.y - (1f - rig.FootLeft.Origin.y) * rig.FootLeft.Rect.height;
            float lowR = footR.y - (1f - rig.FootRight.Origin.y) * rig.FootRight.Rect.height;
            float lift = -Mathf.Min(lowL, lowR);

            var shadow = new GameObject("Shadow", typeof(SpriteRenderer));
            shadow.transform.SetParent(go.transform, false);
            var sr = shadow.GetComponent<SpriteRenderer>();
            sr.sprite = art.Shadow;
            float shadowW = Mathf.Max(b.width * 0.9f, Mathf.Abs(footR.x - footL.x) + 24f) / RigPpu;
            shadow.transform.localScale = new Vector3(shadowW / 1.5f, shadowW / 1.5f, 1f);
            shadow.transform.localPosition = Vector3.zero;

            Transform rigRoot = new GameObject("Rig").transform;
            rigRoot.SetParent(go.transform, false);
            Transform pivot = new GameObject("Pivot").transform;
            pivot.SetParent(rigRoot, false);
            pivot.localPosition = new Vector3(0f, lift / RigPpu, 0f);

            var parts = new List<Object>();
            var orders = new List<int>();
            Func<string, Vector2, float, Transform> joint = (n, px, angle) =>
            {
                Transform t = new GameObject(n).transform;
                t.SetParent(pivot, false);
                t.localPosition = px / RigPpu;
                t.localRotation = Quaternion.Euler(0f, 0f, angle);
                return t;
            };
            Func<Transform, BrainrotRigData.Part, bool, int, SpriteRenderer> sprite = (t, part, flip, order) =>
            {
                var r = new GameObject("Sprite", typeof(SpriteRenderer)).GetComponent<SpriteRenderer>();
                r.transform.SetParent(t, false);
                r.sprite = PartSprite(art, part);
                r.flipX = flip;
                parts.Add(r);
                orders.Add(order);
                return r;
            };

            Transform armL = joint("Arm Left", bodyPoint(rig.HandLeftPoint), -24f);
            sprite(armL, rig.HandLeft, false, 0);
            Transform legL = joint("Leg Left", footL, -3f);
            sprite(legL, rig.FootLeft, false, 1);
            Transform legR = joint("Leg Right", footR, 3f);
            sprite(legR, rig.FootRight, true, 1);
            sprite(joint("Torso", Vector2.zero, 0f), rig.Body, false, 2);
            sprite(joint("Head", bodyPoint(rig.HeadPoint), 0f), rig.Head, false, 3);
            Transform armR = joint("Arm Right", bodyPoint(rig.HandRightPoint), 24f);
            sprite(armR, rig.HandRight, false, 5);
            if (weapon >= 0 && weapon < art.Weapons.Length)
            {
                RectInt h = rig.HandRight.Rect;
                Vector2 wp = rig.WeaponRight == new Vector2(0.5f, 0.5f) ? new Vector2(0.5f, 0.9f) : rig.WeaponRight;
                var w = new GameObject("Weapon", typeof(SpriteRenderer)).GetComponent<SpriteRenderer>();
                w.transform.SetParent(armR, false);
                w.transform.localPosition = new Vector2((wp.x - rig.HandRight.Origin.x) * h.width,
                    -(Mathf.Min(wp.y, 1f) - rig.HandRight.Origin.y) * h.height) / RigPpu;
                // Icon vũ khí vẽ chéo 45°; xoay để gậy chĩa ra trước, hơi hướng lên.
                w.transform.localRotation = Quaternion.Euler(0f, 0f, -40f);
                w.sprite = art.Weapons[weapon];
                parts.Add(w);
                orders.Add(4);
            }

            var walker = go.AddComponent<BrainrotWalker>();
            var so = new SerializedObject(walker);
            so.FindProperty("_body").objectReferenceValue = rigRoot;
            SetArray(so, "_parts", parts);
            SerializedProperty orderProp = so.FindProperty("_partOrders");
            orderProp.arraySize = orders.Count;
            for (int i = 0; i < orders.Count; i++) orderProp.GetArrayElementAtIndex(i).intValue = orders[i];
            so.FindProperty("_armLeft").objectReferenceValue = armL;
            so.FindProperty("_armRight").objectReferenceValue = armR;
            so.FindProperty("_legLeft").objectReferenceValue = legL;
            so.FindProperty("_legRight").objectReferenceValue = legR;
            so.FindProperty("_shadow").objectReferenceValue = sr;
            so.FindProperty("_area").rectValue = new Rect(-12.6f, -6.4f, 25.2f, 14.6f);
            so.FindProperty("_speed").floatValue = 1.3f + (seed % 4) * 0.2f;
            so.FindProperty("_seed").intValue = seed;
            so.ApplyModifiedPropertiesWithoutUndo();
            return walker;
        }

        // ================================================================== HUD

        private sealed class HudRefs
        {
            public PlaygroundHudLayout Layout;
            public TapCatcher Catcher;
            public Button Blocker;
            public List<RectTransform> Slots = new List<RectTransform>();
            public List<Image> SlotFrames = new List<Image>();
            public RectTransform Title, Subtitle, Arrow, ArrowBody, Hand, TapFx;
            public Image TapRing;
            public List<Object> TapRays;
        }

        private static HudRefs BuildHud(Transform parent, Art art)
        {
            var canvasGo = new GameObject("UI Canvas", typeof(RectTransform), typeof(Canvas), typeof(CanvasScaler), typeof(GraphicRaycaster));
            canvasGo.transform.SetParent(parent, false);
            canvasGo.GetComponent<Canvas>().renderMode = RenderMode.ScreenSpaceOverlay;
            var scaler = canvasGo.GetComponent<CanvasScaler>();
            scaler.uiScaleMode = CanvasScaler.ScaleMode.ScaleWithScreenSize;
            scaler.referenceResolution = new Vector2(1080f, 1920f);
            canvasGo.AddComponent<ResponsiveCanvasScaler>();

            Material outline;
            TMP_FontAsset font = BuildTitleFont(out outline);

            var hud = new HudRefs();
            RectTransform layoutRoot = Full("Layout Root", canvasGo.transform);
            hud.Layout = layoutRoot.gameObject.AddComponent<PlaygroundHudLayout>();

            // Thanh tab.
            Image tabBar = Img("Tab Bar", layoutRoot, art.Panel);
            Sliced(tabBar);
            var tabs = new List<Object>();
            for (int i = 0; i < art.Tabs.Length; i++) tabs.Add(Img("Tab " + i, tabBar.rectTransform, art.Tabs[i]).rectTransform);

            // Bảng chọn nhân vật.
            Image panel = Img("Brainrot Panel", layoutRoot, art.Panel);
            Sliced(panel);
            for (int i = 0; i < art.Slots.Length; i++)
            {
                Image frame = Img("Slot " + i, panel.rectTransform, art.SlotNormal);
                frame.preserveAspect = false;
                Image icon = Img("Icon", frame.rectTransform, art.Slots[i]);
                Stretch(icon.rectTransform, 0.12f, 0.1f, 0.88f, 0.9f);
                hud.Slots.Add(frame.rectTransform);
                hud.SlotFrames.Add(frame);
            }

            // Tiêu đề + mũi tên + bàn tay.
            TMP_Text title = Text("Title", layoutRoot, "CHOOSE YOUR\nCREATURE!", font, outline);
            title.color = Color.white;
            title.lineSpacing = -12f;
            TMP_Text subtitle = Text("Subtitle", layoutRoot, "TAP HERE!", font, outline);
            subtitle.color = new Color32(0xFF, 0xD2, 0x1F, 0xFF);
            // Khung mũi tên (layout đặt vị trí + xoay) + ảnh con phủ kín khung (controller trượt ảnh vào bảng).
            RectTransform arrowFrame = Rect("Arrow", layoutRoot);
            Image arrowBody = Img("Arrow Image", arrowFrame, art.Arrow);
            Stretch(arrowBody.rectTransform, 0f, 0f, 1f, 1f);
            arrowBody.color = new Color32(0xFF, 0xD0, 0x2A, 0xFF);
            hud.ArrowBody = arrowBody.rectTransform;
            RectTransform handHolder = Rect("Hand Holder", layoutRoot);

            // Hiệu ứng nhấn (vẽ dưới bàn tay): khung vuông quanh đầu ngón tay (pivot 0.3, 0.97 của hand.png),
            // co giãn theo kích thước tay nên đúng mọi màn hình.
            RectTransform tapFx = Rect("Tap FX", handHolder);
            tapFx.anchorMin = new Vector2(0.3f - 0.62f, 0.97f - 0.52f);
            tapFx.anchorMax = new Vector2(0.3f + 0.62f, 0.97f + 0.52f);
            tapFx.offsetMin = tapFx.offsetMax = Vector2.zero;
            Image ring = Img("Ring", tapFx, art.TapRing);
            Stretch(ring.rectTransform, 0.1f, 0.1f, 0.9f, 0.9f);
            ring.color = new Color(1f, 1f, 1f, 0.9f);
            // Các vạch sáng vàng toả lên trên-trái đầu ngón tay (giống ảnh mẫu).
            float[] rayAngles = { -5f, 40f, 85f };
            var rays = new List<Object>();
            for (int i = 0; i < rayAngles.Length; i++)
            {
                RectTransform holder = Full("Ray " + i, tapFx);
                holder.localRotation = Quaternion.Euler(0f, 0f, rayAngles[i]);
                Image bar = Img("Bar", holder, art.TapRay);
                bar.preserveAspect = false;
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

            Image hand = Img("Hand", handHolder, art.Hand);
            hand.rectTransform.pivot = new Vector2(0.3f, 0.97f);
            Stretch(hand.rectTransform, 0f, 0f, 1f, 1f);
            hud.TapFx = tapFx;
            hud.TapRing = ring;
            hud.TapRays = rays;
            hud.Title = title.rectTransform;
            hud.Subtitle = subtitle.rectTransform;
            hud.Arrow = arrowFrame;
            hud.Hand = hand.rectTransform;

            // Bắt chạm toàn màn hình (lần chạm đầu) + nút chặn của GameManager (các lần sau / hết giờ).
            RectTransform catcher = Full("Tap Catcher", canvasGo.transform);
            var catcherImage = catcher.gameObject.AddComponent<Image>();
            catcherImage.color = new Color(0f, 0f, 0f, 0f);
            hud.Catcher = catcher.gameObject.AddComponent<TapCatcher>();

            RectTransform blocker = Full("CTA Blocker", canvasGo.transform);
            var blockerImage = blocker.gameObject.AddComponent<Image>();
            blockerImage.color = new Color(0f, 0f, 0f, 0f);
            hud.Blocker = blocker.gameObject.AddComponent<Button>();
            hud.Blocker.transition = Selectable.Transition.None;
            hud.Blocker.targetGraphic = blockerImage;

            var so = new SerializedObject(hud.Layout);
            so.FindProperty("_tabBar").objectReferenceValue = tabBar.rectTransform;
            SetArray(so, "_tabs", tabs);
            so.FindProperty("_panel").objectReferenceValue = panel.rectTransform;
            SetArray(so, "_slots", hud.Slots.ConvertAll(s => (Object)s));
            so.FindProperty("_title").objectReferenceValue = title.rectTransform;
            so.FindProperty("_subtitle").objectReferenceValue = subtitle.rectTransform;
            so.FindProperty("_arrow").objectReferenceValue = arrowFrame;
            so.FindProperty("_handHolder").objectReferenceValue = handHolder;
            so.FindProperty("_targetSlot").intValue = 2;
            so.ApplyModifiedPropertiesWithoutUndo();
            return hud;
        }

        // ------------------------------------------------------------------ helpers

        private static void Sliced(Image image)
        {
            image.type = Image.Type.Sliced;
            image.preserveAspect = false;
            image.pixelsPerUnitMultiplier = 0.25f;
        }

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
            rect.sizeDelta = new Vector2(120f, 120f);
            var image = rect.gameObject.AddComponent<Image>();
            image.sprite = sprite;
            image.preserveAspect = true;
            image.raycastTarget = false;
            return image;
        }

        private static TMP_Text Text(string name, Transform parent, string value, TMP_FontAsset font, Material material)
        {
            RectTransform rect = Rect(name, parent);
            rect.sizeDelta = new Vector2(900f, 150f);
            var text = rect.gameObject.AddComponent<TextMeshProUGUI>();
            if (font != null) text.font = font;
            if (material != null) text.fontSharedMaterial = material;
            text.text = value;
            text.alignment = TextAlignmentOptions.Center;
            text.raycastTarget = false;
            text.textWrappingMode = TextWrappingModes.NoWrap;
            text.enableAutoSizing = true;
            text.fontSizeMin = 6f;
            text.fontSizeMax = 400f;
            return text;
        }
    }
}
