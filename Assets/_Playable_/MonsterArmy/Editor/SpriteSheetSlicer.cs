using System.Collections.Generic;
using UnityEditor;
using UnityEditor.U2D.Sprites;
using UnityEngine;

namespace Playable.MonsterArmy.EditorTools
{
    /// <summary>
    /// Cắt các sprite sheet của SSPGame thành sprite rời.
    ///
    /// Sheet gốc export từ Construct và KHÔNG kèm file JSON/XML mô tả vị trí frame,
    /// nên phải tự dò. Hai chế độ:
    ///   - Grid: dùng cho sheet mà một frame có thể gồm nhiều mảnh rời rạc (chuỗi nổ
    ///     tan thành bụi) — dò theo alpha sẽ xé một frame thành nhiều sprite.
    ///   - Auto: dò vùng liền nhau theo alpha, dùng cho sheet đóng gói lộn xộn.
    ///
    /// Tự implement phần dò thay vì gọi UnityEditorInternal.InternalSpriteUtility để
    /// không phụ thuộc API internal (đổi giữa các bản Unity mà không báo trước).
    /// </summary>
    public static class SpriteSheetSlicer
    {
        private const string ArtFolder = "Assets/_Playable_/MonsterArmy/Art/";
        private const int PixelsPerUnit = 32;

        /// <summary>Bỏ qua đốm nhỏ hơn mức này — nhiễu viền, không phải sprite.</summary>
        private const int MinBlobSize = 6;

        private const byte AlphaThreshold = 10;

        private readonly struct SheetConfig
        {
            public SheetConfig(string file, int gridColumns = 0, int gridRows = 0, bool single = false,
                int fixedCell = 0)
            {
                File = file;
                GridColumns = gridColumns;
                GridRows = gridRows;
                Single = single;
                FixedCell = fixedCell;
            }

            public string File { get; }
            public int GridColumns { get; }
            public int GridRows { get; }
            public bool Single { get; }

            /// <summary>Cạnh ô vuông cố định, cho sheet đóng gói không đều. 0 = tắt.</summary>
            public int FixedCell { get; }

            public bool IsGrid => GridColumns > 0 && GridRows > 0;
        }

        private static readonly SheetConfig[] Sheets =
        {
            // Không còn sprite17-sheet0: hiệu ứng nổ giờ lấy từ Art/VFX, mỗi khung một
            // file riêng nên không phải cắt sheet nào cả.
            //
            // Không còn buttonitem-sheet0: icon thanh chọn giờ là chính cái đầu của
            // nhân vật, còn vũ khí là art gốc nền trong suốt trong Art/Characters/Weapons.
            //
            // Không còn sheet bộ phận paper-doll: nhân vật giờ lấy từ thư mục
            // Art/Characters, mỗi bộ phận một file riêng đã khớp sẵn theo từng con.
            //
            // sprite32 (mảnh vỡ) và minifireworks cũng không có ở đây: không đoạn code
            // nào vẽ chúng, mà sprite được tham chiếu thì vẫn đi vào build Luna.

            // Tile nền: một ảnh một sprite, không cắt.
            new SheetConfig("tiledbackground-sheet0.png", single: true),
            new SheetConfig("ground-sheet0.png", single: true)
        };

        [MenuItem("Tools/Monster Army/Slice Sprite Sheets")]
        public static void SliceAll()
        {
            // KHÔNG bọc trong StartAssetEditing/StopAssetEditing: lớp bọc đó hoãn mọi
            // SaveAndReimport tới tận lúc Stop, nên texture vừa bật isReadable vẫn chưa
            // thực sự readable khi ta đọc pixel ngay sau đó -> GetPixels32 ném
            // "texture data is either not readable". Mỗi sheet phải reimport thật rồi
            // mới dò được. 15 texture thì không cần gom nhóm.
            foreach (SheetConfig sheet in Sheets) Slice(sheet);
            AssetDatabase.Refresh();

            Debug.Log("[MonsterArmy] Slice xong " + Sheets.Length + " sheet. Kiểm lại bằng Sprite Editor.");
        }

        /// <summary>
        /// Cắt một texture bất kỳ theo lưới đều. Dùng cho các texture sinh ra lúc chạy
        /// setup (ví dụ weapons.png) chứ không nằm trong bảng Sheets cố định.
        /// </summary>
        public static void SliceGrid(string assetPath, int columns, int rows)
        {
            var importer = AssetImporter.GetAtPath(assetPath) as TextureImporter;
            if (importer == null)
            {
                Debug.LogError("[MonsterArmy] Không tìm thấy texture: " + assetPath);
                return;
            }

            ApplyBaseSettings(importer, single: false);
            importer.isReadable = true;
            importer.SaveAndReimport();

            var texture = AssetDatabase.LoadAssetAtPath<Texture2D>(assetPath);
            if (texture == null || !texture.isReadable) return;

            string prefix = System.IO.Path.GetFileNameWithoutExtension(assetPath);
            WriteSpriteRects(importer, prefix, GridRects(texture, columns, rows));

            importer.isReadable = false;
            importer.SaveAndReimport();
        }

        private static void Slice(SheetConfig sheet)
        {
            string path = ArtFolder + sheet.File;
            var importer = AssetImporter.GetAtPath(path) as TextureImporter;
            if (importer == null)
            {
                Debug.LogError("[MonsterArmy] Không tìm thấy texture: " + path);
                return;
            }

            ApplyBaseSettings(importer, sheet.Single);
            if (sheet.Single)
            {
                importer.SaveAndReimport();
                return;
            }

            // Phải bật readable mới đọc được pixel để dò.
            bool wasReadable = importer.isReadable;
            importer.isReadable = true;
            importer.SaveAndReimport();

            var texture = AssetDatabase.LoadAssetAtPath<Texture2D>(path);
            if (texture == null || !texture.isReadable)
            {
                Debug.LogError("[MonsterArmy] " + sheet.File + " không readable sau khi reimport — bỏ qua. " +
                               "Kiểm tra texture có bị override cho platform hiện tại không.");
                importer.isReadable = wasReadable;
                importer.SaveAndReimport();
                return;
            }

            List<Rect> rects;
            if (sheet.IsGrid) rects = GridRects(texture, sheet.GridColumns, sheet.GridRows);
            else if (sheet.FixedCell > 0) rects = FixedCellRects(texture, sheet.FixedCell);
            else rects = DetectRects(texture);

            string prefix = sheet.File.Replace("-sheet0.png", string.Empty).Replace(".png", string.Empty);
            WriteSpriteRects(importer, prefix, rects);

            importer.isReadable = wasReadable;
            importer.SaveAndReimport();

            Debug.Log("[MonsterArmy] " + sheet.File + " -> " + rects.Count + " sprite");
        }

        /// <summary>
        /// Ghi danh sách sprite qua ISpriteEditorDataProvider.
        ///
        /// KHÔNG dùng TextureImporter.spritesheet: Unity đã gỡ bỏ hỗ trợ cho nó
        /// ("Support for accessing sprite meta data through spritesheet has been
        /// removed"), nên gán vào đó sẽ im lặng không có tác dụng ở Unity 6.
        /// </summary>
        private static void WriteSpriteRects(TextureImporter importer, string prefix, List<Rect> rects)
        {
            var factories = new SpriteDataProviderFactories();
            factories.Init();

            ISpriteEditorDataProvider provider = factories.GetSpriteEditorDataProviderFromObject(importer);
            if (provider == null)
            {
                Debug.LogError("[MonsterArmy] Không lấy được ISpriteEditorDataProvider cho " + importer.assetPath);
                return;
            }

            provider.InitSpriteEditorDataProvider();

            var spriteRects = new SpriteRect[rects.Count];
            for (int i = 0; i < rects.Count; i++)
            {
                spriteRects[i] = new SpriteRect
                {
                    name = prefix + "_" + i,
                    spriteID = GUID.Generate(),
                    rect = rects[i],
                    alignment = SpriteAlignment.Center,
                    pivot = new Vector2(0.5f, 0.5f),
                    border = Vector4.zero
                };
            }

            provider.SetSpriteRects(spriteRects);

            // Từ Unity 2021 trở đi, sprite con cần bảng ánh xạ tên -> fileId, nếu
            // thiếu thì tham chiếu tới sprite sẽ đứt sau mỗi lần reimport.
            var nameFileIdProvider = provider.GetDataProvider<ISpriteNameFileIdDataProvider>();
            if (nameFileIdProvider != null)
            {
                var pairs = new List<SpriteNameFileIdPair>(spriteRects.Length);
                foreach (SpriteRect spriteRect in spriteRects)
                    pairs.Add(new SpriteNameFileIdPair(spriteRect.name, spriteRect.spriteID));

                nameFileIdProvider.SetNameFileIdPairs(pairs);
            }

            provider.Apply();
        }

        private static void ApplyBaseSettings(TextureImporter importer, bool single)
        {
            importer.textureType = TextureImporterType.Sprite;
            importer.spriteImportMode = single ? SpriteImportMode.Single : SpriteImportMode.Multiple;
            importer.filterMode = FilterMode.Point;            // pixel art phải sắc cạnh
            importer.mipmapEnabled = false;
            importer.maxTextureSize = 2048;
            importer.spritePixelsPerUnit = PixelsPerUnit;
            importer.textureCompression = TextureImporterCompression.Uncompressed;
            importer.wrapMode = single ? TextureWrapMode.Repeat : TextureWrapMode.Clamp;

            // SpriteRenderer.drawMode = Tiled (sàn đấu) BẮT BUỘC sprite dựng bằng
            // FullRect. Với mesh Tight mặc định, Unity bỏ qua drawMode và sàn hiện
            // sai — một tile kéo giãn thay vì lát lặp.
            TextureImporterSettings settings = new TextureImporterSettings();
            importer.ReadTextureSettings(settings);
            settings.spriteMeshType = SpriteMeshType.FullRect;
            importer.SetTextureSettings(settings);
        }

        /// <summary>Chia đều thành lưới. Bỏ ô hoàn toàn trong suốt.</summary>
        private static List<Rect> GridRects(Texture2D texture, int columns, int rows)
        {
            var result = new List<Rect>();
            float cellWidth = (float)texture.width / columns;
            float cellHeight = (float)texture.height / rows;
            Color32[] pixels = texture.GetPixels32();

            // Đi từ trên xuống để thứ tự sprite khớp thứ tự frame người đọc thấy.
            for (int row = rows - 1; row >= 0; row--)
            for (int column = 0; column < columns; column++)
            {
                var rect = new Rect(column * cellWidth, row * cellHeight, cellWidth, cellHeight);
                if (IsCellEmpty(pixels, texture.width, texture.height, rect)) continue;
                result.Add(rect);
            }

            return result;
        }

        private static bool IsCellEmpty(Color32[] pixels, int width, int height, Rect rect)
        {
            int xStart = Mathf.Clamp(Mathf.FloorToInt(rect.x), 0, width - 1);
            int xEnd = Mathf.Clamp(Mathf.CeilToInt(rect.xMax), 0, width);
            int yStart = Mathf.Clamp(Mathf.FloorToInt(rect.y), 0, height - 1);
            int yEnd = Mathf.Clamp(Mathf.CeilToInt(rect.yMax), 0, height);

            for (int y = yStart; y < yEnd; y++)
            for (int x = xStart; x < xEnd; x++)
                if (pixels[y * width + x].a > AlphaThreshold)
                    return false;

            return true;
        }

        /// <summary>
        /// Cắt theo ô vuông cạnh <paramref name="cell"/> cho sheet đóng gói không đều.
        ///
        /// Tìm các dải hàng có pixel, rồi trong mỗi dải tìm các đoạn cột liền nhau và
        /// chia mỗi đoạn thành n ô bằng nhau với n = round(bề rộng / cell). Nhờ vậy một
        /// dãy icon dính sát nhau vẫn tách ra đúng từng icon, mà icon đứng lẻ cũng không
        /// bị cắt nhầm.
        /// </summary>
        private static List<Rect> FixedCellRects(Texture2D texture, int cell)
        {
            int width = texture.width;
            int height = texture.height;
            Color32[] pixels = texture.GetPixels32();
            var result = new List<Rect>();

            foreach ((int bandStart, int bandHeight) in OpaqueBands(
                         y => RowHasPixels(pixels, width, y), height))
            foreach ((int runStart, int runWidth) in OpaqueBands(
                         x => ColumnHasPixels(pixels, width, x, bandStart, bandHeight), width))
            {
                int count = Mathf.Max(1, Mathf.RoundToInt(runWidth / (float)cell));

                // Bo về biên pixel nguyên. Rect lẻ làm sampler lấy nửa pixel ở mép và
                // sprite pixel art sẽ bị rỉ màu của icon bên cạnh.
                for (int i = 0; i < count; i++)
                {
                    int x0 = runStart + Mathf.RoundToInt(i * runWidth / (float)count);
                    int x1 = runStart + Mathf.RoundToInt((i + 1) * runWidth / (float)count);
                    result.Add(new Rect(x0, bandStart, x1 - x0, bandHeight));
                }
            }

            // Trên xuống dưới, trái sang phải — Rect gốc toạ độ ở đáy nên y lớn đi trước.
            result.Sort((a, b) => Mathf.Abs(a.y - b.y) > 1f ? b.y.CompareTo(a.y) : a.x.CompareTo(b.x));
            return result;
        }

        /// <summary>Các đoạn liên tiếp mà <paramref name="hasPixels"/> trả về true.</summary>
        private static IEnumerable<(int Start, int Length)> OpaqueBands(System.Func<int, bool> hasPixels,
            int limit)
        {
            int start = -1;
            for (int i = 0; i < limit; i++)
            {
                bool opaque = hasPixels(i);
                if (opaque && start < 0) start = i;
                else if (!opaque && start >= 0)
                {
                    yield return (start, i - start);
                    start = -1;
                }
            }

            if (start >= 0) yield return (start, limit - start);
        }

        private static bool RowHasPixels(Color32[] pixels, int width, int y)
        {
            int offset = y * width;
            for (int x = 0; x < width; x++)
                if (pixels[offset + x].a > AlphaThreshold)
                    return true;

            return false;
        }

        private static bool ColumnHasPixels(Color32[] pixels, int width, int x, int yStart, int yCount)
        {
            for (int y = yStart; y < yStart + yCount; y++)
                if (pixels[y * width + x].a > AlphaThreshold)
                    return true;

            return false;
        }

        /// <summary>
        /// Dò vùng pixel liền nhau bằng flood fill 8 hướng, trả về bounding box của
        /// mỗi vùng. Sắp theo hàng từ trên xuống rồi trái sang phải để thứ tự ổn định
        /// giữa các lần chạy — tên sprite được tham chiếu bằng index nên không được đổi.
        /// </summary>
        private static List<Rect> DetectRects(Texture2D texture)
        {
            int width = texture.width;
            int height = texture.height;
            Color32[] pixels = texture.GetPixels32();
            var visited = new bool[width * height];
            var found = new List<RectInt>();
            var stack = new Stack<int>();

            for (int start = 0; start < pixels.Length; start++)
            {
                if (visited[start] || pixels[start].a <= AlphaThreshold) continue;

                int minX = int.MaxValue, maxX = int.MinValue;
                int minY = int.MaxValue, maxY = int.MinValue;

                stack.Push(start);
                visited[start] = true;

                while (stack.Count > 0)
                {
                    int index = stack.Pop();
                    int x = index % width;
                    int y = index / width;

                    if (x < minX) minX = x;
                    if (x > maxX) maxX = x;
                    if (y < minY) minY = y;
                    if (y > maxY) maxY = y;

                    for (int dy = -1; dy <= 1; dy++)
                    for (int dx = -1; dx <= 1; dx++)
                    {
                        if (dx == 0 && dy == 0) continue;
                        int nx = x + dx;
                        int ny = y + dy;
                        if (nx < 0 || nx >= width || ny < 0 || ny >= height) continue;

                        int neighbour = ny * width + nx;
                        if (visited[neighbour] || pixels[neighbour].a <= AlphaThreshold) continue;

                        visited[neighbour] = true;
                        stack.Push(neighbour);
                    }
                }

                int blobWidth = maxX - minX + 1;
                int blobHeight = maxY - minY + 1;
                if (blobWidth < MinBlobSize || blobHeight < MinBlobSize) continue;

                found.Add(new RectInt(minX, minY, blobWidth, blobHeight));
            }

            found.Sort(CompareReadingOrder);

            var result = new List<Rect>(found.Count);
            foreach (RectInt rect in found) result.Add(new Rect(rect.x, rect.y, rect.width, rect.height));
            return result;
        }

        /// <summary>
        /// Thứ tự đọc: trên xuống dưới, trái sang phải. Hai sprite coi là cùng hàng
        /// nếu tâm theo trục dọc lệch nhau dưới nửa chiều cao con cao hơn.
        /// </summary>
        private static int CompareReadingOrder(RectInt a, RectInt b)
        {
            float centreA = a.y + a.height * 0.5f;
            float centreB = b.y + b.height * 0.5f;
            float sameRowTolerance = Mathf.Max(a.height, b.height) * 0.5f;

            if (Mathf.Abs(centreA - centreB) > sameRowTolerance)
                return centreB.CompareTo(centreA);   // y lớn hơn = ở trên, đi trước

            return a.x.CompareTo(b.x);
        }
    }
}
