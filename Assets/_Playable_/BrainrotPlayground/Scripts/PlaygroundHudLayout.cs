using UnityEngine;

namespace Playable.BrainrotPlayground
{
    /// <summary>
    /// Bố cục HUD kiểu game sandbox, tính theo vùng an toàn + hướng màn hình (không phụ thuộc match của CanvasScaler).
    ///  - Ngang: thanh tab trên-trái, bảng chọn nhân vật 2 cột dọc mép trái (lùi vào khỏi mép tai thỏ / bo góc);
    ///    mũi tên chỉ sang ô được hướng dẫn, cụm "CHOOSE YOUR / CREATURE! / TAP HERE!" nằm sát ngay bên phải mũi tên.
    ///  - Dọc: bảng chọn 4 cột ở dưới, thanh tab nằm ngay dưới bảng; mũi tên chỉ xuống ô được hướng dẫn,
    ///    cụm tiêu đề nằm sát ngay phía trên mũi tên.
    /// </summary>
    [ExecuteAlways, DisallowMultipleComponent]
    public sealed class PlaygroundHudLayout : MonoBehaviour
    {
        [SerializeField] private RectTransform _tabBar;
        [SerializeField] private RectTransform[] _tabs;
        [SerializeField] private RectTransform _panel;
        [SerializeField] private RectTransform[] _slots;
        [SerializeField] private RectTransform _title;
        [SerializeField] private RectTransform _subtitle;
        [SerializeField] private RectTransform _arrow;
        [SerializeField] private RectTransform _handHolder;
        [SerializeField] private int _targetSlot = 2;
        // Màn ngang: lùi HUD vào khỏi 2 mép trái/phải (tỉ lệ chiều rộng) — tai thỏ / bo góc nằm ở cạnh bên,
        // và nhiều webview quảng cáo không báo Screen.safeArea.
        [SerializeField] private float _landscapeSideInset = 0.04f;
        // Màn dọc: chừa mép trên cho tai thỏ khi tính vùng trống đặt tiêu đề.
        [SerializeField] private float _portraitNotch = 0.06f;
        // Tỉ lệ khung tiêu đề 2 dòng (rộng / cao) — font FFFFORWA rộng nên khung dẹt — và góc nghiêng (0 = thẳng).
        [SerializeField] private float _titleAspect = 3f;
        // Màn ngang: Pos Y (anchoredPosition.y, đơn vị canvas) của tiêu đề "CHOOSE YOUR / CREATURE!".
        [SerializeField] private float _landscapeTitleY = 50f;
        // Khoảng hở giữa cụm chữ và mũi tên (tỉ lệ kích thước mũi tên).
        [SerializeField] private float _arrowGap = 0.1f;
        [SerializeField] private float _titleTilt;

        private RectTransform _root;
        private Rect _lastRect;
        private Rect _lastSafe;

        public bool IsPortrait { get; private set; }
        public int TargetSlot => _targetSlot;

        /// <summary>Tâm vùng chơi còn trống (không bị HUD che), toạ độ viewport 0..1.</summary>
        public Vector2 PlayViewportCenter { get; private set; } = new Vector2(0.5f, 0.5f);

        private void OnEnable()
        {
            _root = (RectTransform)transform;
            _lastRect = default;
            Refresh();
        }

        private void LateUpdate()
        {
            if (_root == null) _root = (RectTransform)transform;
            if (_root.rect != _lastRect || Screen.safeArea != _lastSafe) Refresh();
        }

        public void Refresh()
        {
            if (_root == null || Screen.width <= 0 || Screen.height <= 0) return;
            _lastRect = _root.rect;
            _lastSafe = Screen.safeArea;

            Rect safe = _lastSafe;
            if (safe.width <= 0f || safe.height <= 0f) safe = new Rect(0f, 0f, Screen.width, Screen.height);
            float w = _lastRect.width * safe.width / Screen.width;
            float h = _lastRect.height * safe.height / Screen.height;
            Vector2 c = new Vector2(
                (safe.center.x / Screen.width - 0.5f) * _lastRect.width,
                (safe.center.y / Screen.height - 0.5f) * _lastRect.height);

            bool portrait = h >= w;
            IsPortrait = portrait;
            float shortSide = Mathf.Min(w, h);
            float m = shortSide * 0.025f;
            float side = portrait ? 0f : w * _landscapeSideInset;
            float left = c.x - w * 0.5f + m + side;
            float right = c.x + w * 0.5f - m - side;
            float top = c.y + h * 0.5f - m;
            float bottom = c.y - h * 0.5f + m;

            int count = _slots != null ? _slots.Length : 0;
            int cols = portrait ? 4 : 2;
            int rows = Mathf.Max(1, Mathf.CeilToInt(count / (float)cols));
            const float gapK = 0.12f;

            int tabCount = _tabs != null ? _tabs.Length : 0;
            float tab = portrait ? Mathf.Min(w * 0.13f, h * 0.07f) : Mathf.Min(h * 0.115f, w * 0.065f);
            float tabPad = tab * 0.12f;
            float tabBarW = tabCount * tab + (tabCount + 1) * tabPad;
            float tabBarH = tab + tabPad * 2f;

            float slot;
            Rect panel;
            if (portrait)
            {
                // Thanh tab sát đáy, bảng chọn ngay phía trên.
                PlaceTopLeft(_tabBar, new Vector2(c.x - tabBarW * 0.5f, bottom + tabBarH), tabBarW, tabBarH);
                float maxW = w - m * 2f;
                slot = Mathf.Min(maxW / (cols + (cols + 1) * gapK), h * 0.1f);
                float pw = slot * (cols + (cols + 1) * gapK);
                float ph = slot * (rows + (rows + 1) * gapK);
                panel = new Rect(c.x - pw * 0.5f, bottom + tabBarH + m * 0.5f, pw, ph);
            }
            else
            {
                PlaceTopLeft(_tabBar, new Vector2(left, top), tabBarW, tabBarH);
                float panelTop = top - tabBarH - m * 0.6f;
                float availH = panelTop - bottom;
                slot = Mathf.Min(availH / (rows + (rows + 1) * gapK), w * 0.11f);
                float pw = slot * (cols + (cols + 1) * gapK);
                float ph = slot * (rows + (rows + 1) * gapK);
                panel = new Rect(left, panelTop - ph, pw, ph);
            }
            for (int i = 0; i < tabCount; i++)
                Place(_tabs[i], new Vector2(-tabBarW * 0.5f + tabPad + tab * 0.5f + i * (tab + tabPad), 0f), tab, tab);

            Place(_panel, panel.center, panel.width, panel.height);
            float gap = slot * gapK;
            for (int i = 0; i < count; i++)
            {
                int col = i % cols;
                int row = i / cols;
                Vector2 local = new Vector2(
                    -panel.width * 0.5f + gap + slot * 0.5f + col * (slot + gap),
                    panel.height * 0.5f - gap - slot * 0.5f - row * (slot + gap));
                Place(_slots[i], local, slot, slot);
            }

            Vector2 target = panel.center;
            if (_targetSlot >= 0 && _targetSlot < count) target = panel.center + _slots[_targetSlot].anchoredPosition;

            float arrowSize = slot * 0.85f;
            float arrowH = arrowSize * 100f / 130f;
            if (portrait)
            {
                float arrowY = panel.yMax + arrowSize * 0.5f;
                PlaceRotated(_arrow, new Vector2(target.x, arrowY), arrowSize, arrowH, 90f);
                // Cụm chữ đặt sát ngay trên mũi tên (đáy cụm = đỉnh mũi tên), căn theo mũi tên nhưng không tràn mép.
                float areaTop = c.y + h * 0.5f - h * _portraitNotch;
                float bottomY = arrowY + arrowSize * (0.5f + _arrowGap);
                float titleW = Mathf.Min(w * 0.9f, (areaTop - bottomY) * 0.8f * _titleAspect / TitleGroupK);
                float cx = Mathf.Clamp(target.x, left + titleW * 0.5f, right - titleW * 0.5f);
                float groupH = titleW / _titleAspect * TitleGroupK;
                PlaceTitle(new Vector2(cx, bottomY + groupH * 0.5f), titleW);
                PlayViewportCenter = new Vector2(0.5f, ToViewportY((bottomY + groupH + areaTop) * 0.5f));
            }
            else
            {
                float arrowX = panel.xMax + arrowSize * 0.65f;
                PlaceRotated(_arrow, new Vector2(arrowX, target.y), arrowSize, arrowH, 0f);
                // Cụm chữ đặt sát ngay bên phải mũi tên; tiêu đề có Pos Y = _landscapeTitleY, "TAP HERE!" bám ngay dưới
                // (cả cụm vẫn bị kẹp trong màn hình).
                float areaL = arrowX + arrowSize * (0.5f + _arrowGap);
                float titleW = Mathf.Min((right - areaL) * 0.75f, h * 0.3f * _titleAspect);
                float titleH = titleW / _titleAspect;
                float groupH = titleH * TitleGroupK;
                float cy = _landscapeTitleY - (groupH - titleH) * 0.5f;
                cy = Mathf.Clamp(cy, bottom + groupH * 0.5f, top - groupH * 0.5f);
                PlaceTitle(new Vector2(areaL + titleW * 0.5f, cy), titleW);
                PlayViewportCenter = new Vector2(ToViewportX((areaL + titleW + right) * 0.5f), ToViewportY(c.y - h * 0.2f));
            }

            // Đầu ngón tay (pivot 0.3, 0.97 của ảnh hand.png) đặt hơi lệch xuống-phải tâm ô hướng dẫn.
            float handW = slot * 0.95f;
            float handH = handW * 190f / 160f;
            Vector2 tip = target + new Vector2(slot * 0.08f, -slot * 0.05f);
            Place(_handHolder, tip + new Vector2(handW * 0.2f, -handH * 0.47f), handW, handH);
        }

        // Chiều cao cả cụm = chiều cao tiêu đề * TitleGroupK (tiêu đề + "TAP HERE!" sát ngay dưới).
        private const float SubtitleK = 0.42f;
        private const float TitleGroupK = 1f + SubtitleK * 0.9f;

        /// <summary>"CHOOSE YOUR / CREATURE!" (2 dòng) + "TAP HERE!" sát ngay dưới, cả cụm có tâm tại center.</summary>
        private void PlaceTitle(Vector2 center, float width)
        {
            float titleH = width / _titleAspect;
            float subH = titleH * SubtitleK;
            float top = center.y + titleH * TitleGroupK * 0.5f;
            PlaceRotated(_title, new Vector2(center.x, top - titleH * 0.5f), width, titleH, _titleTilt);
            // Chồng nhẹ lên phần đệm dưới của tiêu đề để 2 dòng chữ dính sát nhau.
            PlaceRotated(_subtitle, new Vector2(center.x, top - titleH - subH * 0.4f), width * 0.7f, subH, _titleTilt);
        }

        private float ToViewportX(float x) => x / Mathf.Max(1f, _lastRect.width) + 0.5f;
        private float ToViewportY(float y) => y / Mathf.Max(1f, _lastRect.height) + 0.5f;

        private static void Place(RectTransform rect, Vector2 position, float width, float height)
        {
            if (rect == null) return;
            rect.anchorMin = rect.anchorMax = rect.pivot = new Vector2(0.5f, 0.5f);
            rect.sizeDelta = new Vector2(width, height);
            rect.anchoredPosition = position;
        }

        private static void PlaceRotated(RectTransform rect, Vector2 position, float width, float height, float angle)
        {
            Place(rect, position, width, height);
            if (rect != null) rect.localRotation = Quaternion.Euler(0f, 0f, angle);
        }

        private static void PlaceTopLeft(RectTransform rect, Vector2 corner, float width, float height)
        {
            Place(rect, corner + new Vector2(width * 0.5f, -height * 0.5f), width, height);
        }
    }
}
