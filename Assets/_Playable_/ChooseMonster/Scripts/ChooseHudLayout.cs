using UnityEngine;

namespace Playable.ChooseMonster
{
    /// <summary>
    /// Bố cục UI theo vùng an toàn + hướng màn hình.
    ///  - Tiêu đề trên cùng; nút Fight (CTA) giữa đáy màn hình.
    ///  - Thanh máu / nhãn Lv. / bàn tay bám theo thế giới 3D (ScreenAnchor) — ở đây chỉ đặt kích thước.
    /// Kích thước tính theo tỉ lệ vùng an toàn nên không phụ thuộc match của CanvasScaler.
    /// </summary>
    [ExecuteAlways, DisallowMultipleComponent]
    public sealed class ChooseHudLayout : MonoBehaviour
    {
        private const float BarAspect = 594f / 149f;
        private const float FightButtonAspect = 361f / 113f;

        [SerializeField] private RectTransform _title;
        [SerializeField] private RectTransform _hand;
        [SerializeField] private RectTransform[] _bars;
        [SerializeField] private RectTransform _fightButton;
        [SerializeField] private float _portraitTitleY = 750f;

        private RectTransform _root;
        private Rect _lastRect;
        private Rect _lastSafe;

        public bool IsPortrait { get; private set; } = true;

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
            float m = shortSide * 0.035f;
            float top = c.y + h * 0.5f - m;
            float bottom = c.y - h * 0.5f + m;

            float titleH = portrait ? Mathf.Min(h * 0.075f, w * 0.13f) : Mathf.Min(h * 0.11f, w * 0.06f);
            // Màn dọc: đặt tâm tiêu đề ở y = _portraitTitleY (canvas dọc luôn cao 1920 vì match height)
            // để tránh tai thỏ; màn ngang tai thỏ nằm ở cạnh bên nên giữ sát mép trên.
            float titleY = portrait ? Mathf.Min(_portraitTitleY, top - titleH * 0.5f) : top - titleH * 0.5f;
            Place(_title, w * (portrait ? 0.86f : 0.6f), titleH, new Vector2(c.x, titleY));

            float buttonW = portrait ? Mathf.Min(w * 0.62f, h * 0.11f * FightButtonAspect)
                : Mathf.Min(w * 0.3f, h * 0.2f * FightButtonAspect);
            float buttonH = buttonW / FightButtonAspect;
            Place(_fightButton, buttonW, buttonH,
                new Vector2(c.x, bottom + buttonH * 0.5f + h * (portrait ? 0.05f : 0.03f)));

            float handSize = shortSide * (portrait ? 0.2f : 0.18f);
            Size(_hand, handSize, handSize);


            float barW = portrait ? w * 0.46f : Mathf.Min(w * 0.24f, h * 0.42f);
            if (_bars != null)
                for (int i = 0; i < _bars.Length; i++)
                    Size(_bars[i], barW, barW / BarAspect);
        }

        private static void Place(RectTransform rect, float width, float height, Vector2 position)
        {
            if (rect == null) return;
            rect.anchorMin = rect.anchorMax = rect.pivot = new Vector2(0.5f, 0.5f);
            rect.sizeDelta = new Vector2(width, height);
            rect.anchoredPosition = position;
        }

        private static void Size(RectTransform rect, float width, float height)
        {
            if (rect == null) return;
            rect.sizeDelta = new Vector2(width, height);
        }
    }
}
