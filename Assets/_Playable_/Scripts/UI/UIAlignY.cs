using UnityEngine;

namespace Playable
{
    /// <summary>
    /// Giữ các UI (nút Jump, tut move...) cùng trục Y với tâm của _reference (joystick) ở cả màn dọc và màn ngang.
    /// Joystick (Ultimate Joystick) tự đặt vị trí theo % kích thước canvas, nên các UI khác bám theo nó mỗi frame
    /// thay vì đặt cứng toạ độ (đổi hướng màn hình là canvas đổi kích thước).
    /// Chỉ đổi Y, giữ nguyên X của từng target. _offsets (tuỳ chọn, đơn vị canvas) đặt target cao hơn trục chung,
    /// vd. nút Fire nằm trên nút Jump.
    /// </summary>
    public class UIAlignY : MonoBehaviour
    {
        [SerializeField] private RectTransform _reference;
        [SerializeField] private RectTransform[] _targets;
        [SerializeField] private float[] _offsets;

        private void LateUpdate()
        {
            if (_reference == null || _targets == null) return;
            float y = GetCenterY(_reference);
            for (int i = 0; i < _targets.Length; i++)
            {
                RectTransform t = _targets[i];
                if (t == null) continue;
                float offset = _offsets != null && i < _offsets.Length ? _offsets[i] * t.lossyScale.y : 0f;
                float delta = y + offset - GetCenterY(t);
                if (Mathf.Abs(delta) < 0.01f) continue;
                Vector3 p = t.position;
                p.y += delta;
                t.position = p;
            }
        }

        /// <summary>Toạ độ Y (world) của tâm hình chữ nhật, không phụ thuộc pivot.</summary>
        private static float GetCenterY(RectTransform rt)
        {
            Rect r = rt.rect;
            return rt.TransformPoint(new Vector3(r.center.x, r.center.y, 0f)).y;
        }
    }
}
