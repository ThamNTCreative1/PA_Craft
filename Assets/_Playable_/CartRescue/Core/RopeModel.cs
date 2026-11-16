using System;

namespace Playable.CartRescue.Core
{
    /// <summary>
    /// Nhân vật treo dưới trực thăng bằng dây (mặt phẳng XY). Dây chỉ căng chứ không đẩy: khoảng cách tới điểm treo
    /// ≤ độ dài hiện tại. Đang nắm: nhân vật bám theo ngón tay, dây giãn tối đa MaxLength. Thả ra: con lắc, dây thu
    /// dần về RestLength.
    /// </summary>
    public sealed class RopeModel
    {
        private const float FollowRate = 20f;
        private const float RetractSpeed = 3f;

        private readonly float _rest;
        private readonly float _max;
        private readonly float _gravity;
        private readonly float _damping;
        private float _length;
        private float _vx, _vy;
        private bool _initialized;

        public float X { get; private set; }
        public float Y { get; private set; }
        public bool Grabbed { get; private set; }
        /// <summary>Góc của dây so với phương thẳng đứng (rad), dương khi nhân vật lệch sang +X.</summary>
        public float SwingAngle { get; private set; }
        public float VelocityX => _vx;
        public float VelocityY => _vy;

        public RopeModel(float restLength, float maxLength, float gravity, float damping)
        {
            _rest = restLength;
            _max = maxLength;
            _gravity = gravity;
            _damping = damping;
            _length = restLength;
        }

        public void Grab() => Grabbed = true;
        public void Release() => Grabbed = false;

        /// <summary>targetX/Y chỉ dùng khi đang nắm.</summary>
        public void Step(float anchorX, float anchorY, float targetX, float targetY, float dt)
        {
            if (!_initialized)
            {
                X = anchorX;
                Y = anchorY - _rest;
                _initialized = true;
            }
            float px = X, py = Y;

            if (Grabbed)
            {
                _length = _max;
                float k = 1f - (float)Math.Exp(-FollowRate * dt);
                X += (targetX - X) * k;
                Y += (targetY - Y) * k;
            }
            else
            {
                _length = Math.Max(_rest, _length - RetractSpeed * dt);
                float drag = Math.Max(0f, 1f - _damping * dt);
                _vy -= _gravity * dt;
                _vx *= drag;
                _vy *= drag;
                X += _vx * dt;
                Y += _vy * dt;
            }

            float dx = X - anchorX, dy = Y - anchorY;
            float d = (float)Math.Sqrt(dx * dx + dy * dy);
            if (d > _length && d > 1e-6f)
            {
                X = anchorX + dx / d * _length;
                Y = anchorY + dy / d * _length;
            }
            if (dt > 0f)
            {
                _vx = (X - px) / dt;
                _vy = (Y - py) / dt;
            }
            SwingAngle = (float)Math.Atan2(X - anchorX, anchorY - Y);
        }
    }
}
