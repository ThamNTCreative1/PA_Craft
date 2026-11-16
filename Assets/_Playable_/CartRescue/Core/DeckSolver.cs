using System;
using System.Collections.Generic;

namespace Playable.CartRescue.Core
{
    [Serializable]
    public struct DeckConfig
    {
        public float HalfLength;       // nửa chiều dài sàn (đơn vị ô)
        public float[] Slots;          // tâm các ô đứng, tăng dần
        public float Gravity;          // g theo đơn vị ô/s²
        public float InertiaSlide;     // gia tốc xe → lực quán tính lên nhân vật (ngược chiều)
        public float VelocitySlide;    // vận tốc xe → lực trôi ngược chiều (xe chạy về phía thấp thì nhóm trôi lên dốc)
        public float Viscosity;        // cản tỉ lệ vận tốc trượt (/s): cú giật đẩy một đoạn có kiểm soát, không trượt quá đà
        public float KineticFriction;  // giảm tốc khi đang trượt (ô/s²)
        public float StaticAngleRad;   // lực đẩy tương đương góc này trở xuống thì nhân vật đứng yên
        public float WallBounce;       // hệ số nảy khi chạm thành
        public float UnlockAccel;      // gia tốc xe vượt ngưỡng này thì nhân vật đã vào ô bị bật ra
        public float SettleAngleRad;
        public float SettleCartSpeed;
        public float SettleRiderSpeed;
        public float SettleTime;
        public float SnapSpeed;        // tốc độ trượt vào tâm ô sau khi ổn định (ô/s)

        public static DeckConfig Default => new DeckConfig
        {
            HalfLength = 2f,
            Slots = new[] { -1.5f, -0.5f, 0.5f, 1.5f },
            Gravity = 10f,
            InertiaSlide = 1f,
            VelocitySlide = 2f,
            Viscosity = 8f,
            KineticFriction = 0.3f,
            // Ma sát tĩnh > góc ổn định: trong vùng gần thăng bằng nhân vật đứng yên → người chơi "giữ" được cân bằng.
            StaticAngleRad = 10f * (float)Math.PI / 180f,
            WallBounce = 0.2f,
            UnlockAccel = 22f,
            SettleAngleRad = 7f * (float)Math.PI / 180f,
            SettleCartSpeed = 0.5f,
            SettleRiderSpeed = 0.3f,
            SettleTime = 0.5f,
            SnapSpeed = 3f,
        };
    }

    public enum DeckEvent { None, Settled, Unlocked }

    /// <summary>
    /// Các nhân vật đứng trên sàn xe, mô phỏng 1 chiều dọc sàn (s ∈ [−HalfLength, HalfLength]).
    /// Bất biến sau mỗi Step: không ai rời sàn, không cặp nào chồng nhau (khoảng cách tâm ≥ tổng nửa bề rộng).
    /// Xe gần thăng bằng + đứng yên đủ lâu → mỗi nhân vật vào một ô và bị "khoá" cho tới khi xe bị giật mạnh.
    /// </summary>
    public sealed class DeckSolver
    {
        private readonly DeckConfig _c;
        private readonly List<float> _s = new List<float>();
        private readonly List<float> _v = new List<float>();
        private readonly List<float> _w = new List<float>();
        private readonly List<int> _slot = new List<int>();
        private int[] _order = new int[0];
        private float _settleTimer;

        public DeckSolver(DeckConfig config) { _c = config; }

        public int Count => _s.Count;
        public bool IsSettled { get; private set; }
        public float Position(int i) => _s[i];
        public float Velocity(int i) => _v[i];
        public float HalfWidth(int i) => _w[i];
        public int Slot(int i) => _slot[i];

        /// <summary>Tổng mô-men tải (mọi nhân vật cùng khối lượng).</summary>
        public float LoadMoment
        {
            get
            {
                float m = 0f;
                for (int i = 0; i < _s.Count; i++) m += _s[i];
                return m;
            }
        }

        public int Add(float s, float v, float halfWidth)
        {
            _s.Add(s);
            _v.Add(v);
            _w.Add(halfWidth);
            _slot.Add(-1);
            _order = new int[_s.Count];
            for (int i = 0; i < _order.Length; i++) _order[i] = i;
            Unlock();
            Separate(); // giữ bất biến ngay cả trước Step kế tiếp
            return _s.Count - 1;
        }

        public DeckEvent Step(float tiltRad, float cartAccel, float cartSpeed, float dt)
        {
            DeckEvent evt = DeckEvent.None;
            if (IsSettled)
            {
                if (Math.Abs(cartAccel) <= _c.UnlockAccel)
                {
                    SnapToSlots(dt);
                    return DeckEvent.None;
                }
                Unlock();
                evt = DeckEvent.Unlocked;
            }

            Integrate(tiltRad, cartAccel, cartSpeed, dt);
            Separate();

            if (evt == DeckEvent.None && UpdateSettle(tiltRad, cartSpeed, dt)) evt = DeckEvent.Settled;
            return evt;
        }

        private void Integrate(float tilt, float accel, float cartSpeed, float dt)
        {
            float drive = _c.Gravity * (float)Math.Sin(tilt) - _c.InertiaSlide * accel - _c.VelocitySlide * cartSpeed;
            float damp = (float)Math.Exp(-_c.Viscosity * dt);
            float staticLimit = _c.Gravity * (float)Math.Sin(_c.StaticAngleRad);
            for (int i = 0; i < _s.Count; i++)
            {
                float v = _v[i];
                if (Math.Abs(drive) <= staticLimit && Math.Abs(v) < 0.05f)
                {
                    _v[i] = 0f;
                    continue;
                }
                v = (v + drive * dt) * damp;
                float f = _c.KineticFriction * dt;
                v = Math.Abs(v) <= f ? 0f : v - Math.Sign(v) * f;
                _v[i] = v;
                _s[i] += v * dt;
            }
        }

        /// <summary>
        /// Đẩy nhân vật ra khỏi thành và khỏi nhau. Quét trái→phải rồi phải→trái: với tổng bề rộng ≤ chiều dài sàn,
        /// hai lượt quét luôn cho cấu hình hợp lệ.
        /// </summary>
        private void Separate()
        {
            int n = _s.Count;
            if (n == 0) return;
            Array.Sort(_order, (a, b) => _s[a].CompareTo(_s[b]));

            // Chạm nhau khi đang lao vào nhau → hai bên cùng vận tốc (va chạm mềm).
            for (int k = 1; k < n; k++)
            {
                int a = _order[k - 1], b = _order[k];
                if (_s[b] - _s[a] < _w[a] + _w[b] && _v[a] > _v[b])
                {
                    float avg = (_v[a] + _v[b]) * 0.5f;
                    _v[a] = avg;
                    _v[b] = avg;
                }
            }

            float lo = -_c.HalfLength;
            for (int k = 0; k < n; k++)
            {
                int i = _order[k];
                float min = lo + _w[i];
                if (_s[i] < min)
                {
                    _s[i] = min;
                    if (k == 0 && _v[i] < 0f) _v[i] = -_v[i] * _c.WallBounce;
                }
                lo = _s[i] + _w[i];
            }

            float hi = _c.HalfLength;
            for (int k = n - 1; k >= 0; k--)
            {
                int i = _order[k];
                float max = hi - _w[i];
                if (_s[i] > max)
                {
                    _s[i] = max;
                    if (k == n - 1 && _v[i] > 0f) _v[i] = -_v[i] * _c.WallBounce;
                }
                hi = _s[i] - _w[i];
            }
        }

        private bool UpdateSettle(float tilt, float cartSpeed, float dt)
        {
            bool still = _s.Count == _c.Slots.Length
                         && Math.Abs(tilt) < _c.SettleAngleRad
                         && Math.Abs(cartSpeed) < _c.SettleCartSpeed;
            for (int i = 0; still && i < _v.Count; i++) still = Math.Abs(_v[i]) < _c.SettleRiderSpeed;
            if (!still)
            {
                _settleTimer = 0f;
                return false;
            }
            _settleTimer += dt;
            if (_settleTimer + 1e-5f < _c.SettleTime) return false;

            int[] slots = SlotAssigner.Assign(_s.ToArray(), _c.Slots);
            for (int i = 0; i < _s.Count; i++)
            {
                _slot[i] = slots[i];
                _v[i] = 0f;
            }
            IsSettled = true;
            return true;
        }

        private void SnapToSlots(float dt)
        {
            float step = _c.SnapSpeed * dt;
            for (int i = 0; i < _s.Count; i++)
            {
                float target = _c.Slots[_slot[i]];
                float d = target - _s[i];
                _s[i] = Math.Abs(d) <= step ? target : _s[i] + Math.Sign(d) * step;
            }
        }

        private void Unlock()
        {
            IsSettled = false;
            _settleTimer = 0f;
            for (int i = 0; i < _slot.Count; i++) _slot[i] = -1;
        }
    }
}
