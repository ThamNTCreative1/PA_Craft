using UnityEngine;

namespace Playable.CartRescue
{
    /// <summary>
    /// Đặt một phần tử UI (Canvas Screen Space Overlay) bám theo một điểm world mỗi frame, cộng độ lệch theo đơn vị
    /// canvas (vd. khung chú thích "DRAG HIM INTO THE CART!" cạnh nhân vật treo, "MOVE THE CART TO THE GOAL!" cạnh cổng).
    /// Màn dọc có thể dùng độ lệch riêng (_usePortraitOffset) vì cảnh hẹp, dễ đè lên nhân vật.
    /// Tuỳ chọn bám sát (_snapRenderersRoot + _tip): đặt X sao cho đầu mũi tên (_tip, mũi chỉ sang trái) nằm cách mép phải
    /// thật của nhân vật đúng _tipGap (đơn vị canvas) — sát nhân vật mà không đè, ở mọi tỉ lệ màn hình, kể cả khi nhân vật
    /// đung đưa theo dây.
    /// </summary>
    [DisallowMultipleComponent]
    public sealed class WorldAnchoredUI : MonoBehaviour
    {
        [SerializeField] private Transform _target;
        [SerializeField] private Vector3 _worldOffset;
        [SerializeField] private Vector2 _canvasOffset;
        [SerializeField] private bool _usePortraitOffset;
        [SerializeField] private Vector3 _portraitWorldOffset;
        [SerializeField] private Vector2 _portraitCanvasOffset;
        [SerializeField] private RectTransform _canvasRect;
        [SerializeField] private Camera _worldCamera;
        [SerializeField] private Transform _snapRenderersRoot;
        [SerializeField] private RectTransform _tip;
        [SerializeField] private float _tipGap = 6f;
        // Phần trong suốt ở phía đầu mũi trong ảnh mũi tên (đơn vị canvas) — trừ ra để khe tính từ đầu mũi thật.
        [SerializeField] private float _tipInset;

        private RectTransform _rect;
        private Renderer[] _snapRenderers;
        private readonly Vector3[] _corners = new Vector3[4];

        private void LateUpdate()
        {
            if (_target == null || _worldCamera == null) return;
            if (_rect == null) _rect = (RectTransform)transform;
            bool portrait = _usePortraitOffset && Screen.height >= Screen.width;
            Vector3 world = _target.position + (portrait ? _portraitWorldOffset : _worldOffset);
            Vector2 screen = _worldCamera.WorldToScreenPoint(world);
            RectTransformUtility.ScreenPointToLocalPointInRectangle(_canvasRect, screen, null, out Vector2 local);
            _rect.anchoredPosition = local + (portrait ? _portraitCanvasOffset : _canvasOffset);
            if (_snapRenderersRoot != null && _tip != null) SnapTip();
        }

        private void SnapTip()
        {
            if (_snapRenderers == null) _snapRenderers = _snapRenderersRoot.GetComponentsInChildren<Renderer>();
            float right = float.MinValue;
            foreach (Renderer r in _snapRenderers)
            {
                if (r == null || !r.enabled) continue;
                Bounds b = r.bounds;
                for (int i = 0; i < 8; i++)
                {
                    var p = new Vector3((i & 1) == 0 ? b.min.x : b.max.x, (i & 2) == 0 ? b.min.y : b.max.y, (i & 4) == 0 ? b.min.z : b.max.z);
                    right = Mathf.Max(right, _worldCamera.WorldToScreenPoint(p).x);
                }
            }
            if (right == float.MinValue) return;
            RectTransformUtility.ScreenPointToLocalPointInRectangle(_canvasRect, new Vector2(right, 0f), null, out Vector2 riderRight);

            // Đầu mũi tên = mép trái của khung mũi tên (đã lật chỉ sang trái), quy về toạ độ canvas.
            _tip.GetWorldCorners(_corners);
            float tipScreen = Mathf.Min(Mathf.Min(_corners[0].x, _corners[1].x), Mathf.Min(_corners[2].x, _corners[3].x));
            RectTransformUtility.ScreenPointToLocalPointInRectangle(_canvasRect, new Vector2(tipScreen, 0f), null, out Vector2 tipLocal);
            float tipFromBox = tipLocal.x - _rect.anchoredPosition.x + _tipInset;

            Vector2 pos = _rect.anchoredPosition;
            pos.x = riderRight.x + _tipGap - tipFromBox;
            _rect.anchoredPosition = pos;
        }
    }
}
