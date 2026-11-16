using System;

namespace Playable.CartRescue.Core
{
    [Serializable]
    public struct MotionConfig
    {
        public float DragStiffness;   // lò xo giảm chấn tới hạn bám ngón tay
        public float MaxSpeed;
        public float Friction;        // thả tay: vận tốc giảm theo tỉ lệ /s
        public float MinX;
        public float MaxX;            // giới hạn khi kéo (không áp dụng khi tự chạy)
        public float DriveAccel;
        public float AccelSmoothing;  // low-pass gia tốc mỗi bước
        public float MaxCoastDecel;   // trần giảm tốc khi thả tay / phanh trước biên (world/s²) — dưới ngưỡng bật khoá ô

        public static MotionConfig Default => new MotionConfig
        {
            DragStiffness = 40f,
            MaxSpeed = 14f,
            Friction = 3f,
            MinX = -4f,
            MaxX = 7.5f,
            DriveAccel = 6f,
            AccelSmoothing = 0.25f,
            MaxCoastDecel = 10f,
        };
    }

    /// <summary>Chuyển động ngang của xe: kéo theo ngón tay (giữ độ lệch lúc nắm), thả thì trôi chậm dần, hoặc tự chạy.</summary>
    public sealed class CartMotion
    {
        private readonly MotionConfig _c;
        private bool _dragging;
        private bool _driving;
        private float _grabOffset;
        private float _target;
        private float _driveSpeed;

        public float X { get; private set; }
        public float Speed { get; private set; }
        public float Accel { get; private set; }
        public bool Driving => _driving;

        public CartMotion(MotionConfig config, float startX)
        {
            _c = config;
            X = startX;
        }

        public void BeginDrag(float pointerX)
        {
            if (_driving) return;
            _dragging = true;
            _grabOffset = pointerX - X;
            _target = X;
        }

        // Kẹp đích trong biên: lò xo giảm chấn tới hạn tiến tới biên êm, không đâm vào rồi dừng đột ngột.
        public void Drag(float pointerX) => _target = Math.Max(_c.MinX, Math.Min(_c.MaxX, pointerX - _grabOffset));

        public void EndDrag() => _dragging = false;

        public void Drive(float targetSpeed)
        {
            _dragging = false;
            _driving = true;
            _driveSpeed = targetSpeed;
        }

        public void Step(float dt)
        {
            if (dt <= 0f) return;
            float prev = Speed;
            float v = Speed;
            if (_driving)
            {
                float d = _driveSpeed - v, max = _c.DriveAccel * dt;
                v += Math.Abs(d) <= max ? d : Math.Sign(d) * max;
            }
            else if (_dragging)
            {
                float k = _c.DragStiffness;
                v += (k * (_target - X) - 2f * (float)Math.Sqrt(k) * v) * dt;
                v = Math.Max(-_c.MaxSpeed, Math.Min(_c.MaxSpeed, v));
            }
            else
            {
                // Thả tay: giảm tốc theo ma sát nhưng không quá MaxCoastDecel, và phanh trước biên sao cho dừng đúng
                // tại biên với cùng trần giảm tốc → không có cú dừng gắt làm bật nhân vật khỏi ô.
                float decel = Math.Min(_c.Friction * Math.Abs(v), _c.MaxCoastDecel) * dt;
                v = Math.Abs(v) <= decel ? 0f : v - Math.Sign(v) * decel;
                float room = v > 0f ? _c.MaxX - X : X - _c.MinX;
                float allowed = (float)Math.Sqrt(2f * _c.MaxCoastDecel * Math.Max(0f, room));
                if (Math.Abs(v) > allowed) v = Math.Sign(v) * allowed;
            }

            float x = X + v * dt;
            float maxX = _driving ? float.MaxValue : _c.MaxX;
            if (x < _c.MinX || x > maxX)
            {
                x = Math.Max(_c.MinX, Math.Min(maxX, x));
                v = 0f;
            }
            X = x;
            Speed = v;
            Accel += ((v - prev) / dt - Accel) * _c.AccelSmoothing;
        }
    }
}
