using System;
using UnityEngine;

namespace Playable.CannonLaunch
{
    /// <summary>
    /// Lưu 2 bộ vị trí do NGƯỜI DỰNG tự đặt cho một phần tử UI (màn dọc / màn ngang) và chỉ chuyển qua lại
    /// giữa 2 bộ đó khi hướng màn đổi — không tự tính bố cục.
    ///
    /// Cách chỉnh trong Editor: kéo phần tử tới chỗ muốn → chuột phải component → "Capture Portrait" hoặc
    /// "Capture Landscape". "Preview Portrait/Landscape" để xem lại từng bộ.
    /// </summary>
    [DisallowMultipleComponent]
    public sealed class OrientationLayout : MonoBehaviour
    {
        [Serializable]
        public sealed class Slot
        {
            public Vector2 AnchorMin = new Vector2(0.5f, 0.5f);
            public Vector2 AnchorMax = new Vector2(0.5f, 0.5f);
            public Vector2 Pivot = new Vector2(0.5f, 0.5f);
            public Vector2 Position;
            public Vector2 Size = new Vector2(100f, 100f);
        }

        [Tooltip("Tắt nếu vị trí phần tử do script khác điều khiển lúc chạy (vd. bàn tay hướng dẫn) — chỉ đổi kích thước.")]
        [SerializeField] private bool _applyPosition = true;
        [SerializeField] private Slot _portrait = new Slot();
        [SerializeField] private Slot _landscape = new Slot();

        private RectTransform _rect;
        private int _applied = -1;

        private void Awake()
        {
            _rect = (RectTransform)transform;
            Apply(true);
        }

        private void OnEnable()
        {
            if (_rect == null) _rect = (RectTransform)transform;
            Apply(true);
        }

        private void LateUpdate()
        {
            Apply(false);
        }

        private void Apply(bool force)
        {
            if (Screen.height <= 0) return;
            int landscape = Screen.width > Screen.height ? 1 : 0;
            if (!force && landscape == _applied) return;
            _applied = landscape;
            Write(landscape == 1 ? _landscape : _portrait);
        }

        private void Write(Slot s)
        {
            if (_applyPosition)
            {
                _rect.anchorMin = s.AnchorMin;
                _rect.anchorMax = s.AnchorMax;
                _rect.pivot = s.Pivot;
                _rect.anchoredPosition = s.Position;
            }
            _rect.sizeDelta = s.Size;
        }

        private Slot Read()
        {
            var r = (RectTransform)transform;
            return new Slot
            {
                AnchorMin = r.anchorMin, AnchorMax = r.anchorMax, Pivot = r.pivot,
                Position = r.anchoredPosition, Size = r.sizeDelta
            };
        }

#if UNITY_EDITOR
        public void SetSlots(Slot portrait, Slot landscape)
        {
            _portrait = portrait;
            _landscape = landscape;
        }

        public Slot CurrentAsSlot()
        {
            return Read();
        }

        [ContextMenu("Capture Portrait (từ vị trí hiện tại)")]
        private void CapturePortrait()
        {
            UnityEditor.Undo.RecordObject(this, "Capture Portrait");
            _portrait = Read();
            UnityEditor.EditorUtility.SetDirty(this);
        }

        [ContextMenu("Capture Landscape (từ vị trí hiện tại)")]
        private void CaptureLandscape()
        {
            UnityEditor.Undo.RecordObject(this, "Capture Landscape");
            _landscape = Read();
            UnityEditor.EditorUtility.SetDirty(this);
        }

        [ContextMenu("Preview Portrait")]
        private void PreviewPortrait()
        {
            _rect = (RectTransform)transform;
            UnityEditor.Undo.RecordObject(_rect, "Preview Portrait");
            Write(_portrait);
        }

        [ContextMenu("Preview Landscape")]
        private void PreviewLandscape()
        {
            _rect = (RectTransform)transform;
            UnityEditor.Undo.RecordObject(_rect, "Preview Landscape");
            Write(_landscape);
        }
#endif
    }
}
