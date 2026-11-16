using System;

namespace Playable.CartRescue.Core
{
    [Serializable]
    public struct TiltConfig
    {
        public float LoadGain;     // mô-men từ tải lệch (Σ s) → gia tốc góc
        public float InertiaGain;  // gia tốc xe → gia tốc góc (tăng tốc sang phải thì đuôi trái chúi xuống)
        public float Spring;       // nhíp kéo xe về nằm ngang
        public float Damping;
        public float MaxTiltRad;

        public static TiltConfig Default => new TiltConfig
        {
            LoadGain = 1.8f,
            InertiaGain = 0.04f,
            Spring = 18f,
            Damping = 5f,
            MaxTiltRad = 18f * (float)Math.PI / 180f,
        };
    }

    /// <summary>
    /// Góc nghiêng của sàn xe: lò xo có giảm chấn. Angle dương = phía +s của sàn chúi xuống.
    /// Bị kẹp trong ±MaxTilt (xe nghiêng trên nhíp, không lật).
    /// </summary>
    public sealed class CartTiltModel
    {
        private readonly TiltConfig _c;

        public float Angle { get; private set; }
        public float AngularVelocity { get; private set; }

        public CartTiltModel(TiltConfig config) { _c = config; }

        public void Reset()
        {
            Angle = 0f;
            AngularVelocity = 0f;
        }

        public void Step(float loadMoment, float cartAccel, float dt)
        {
            float alpha = _c.LoadGain * loadMoment - _c.InertiaGain * cartAccel - _c.Spring * Angle - _c.Damping * AngularVelocity;
            AngularVelocity += alpha * dt;
            Angle += AngularVelocity * dt;
            if (Angle > _c.MaxTiltRad)
            {
                Angle = _c.MaxTiltRad;
                if (AngularVelocity > 0f) AngularVelocity = 0f;
            }
            else if (Angle < -_c.MaxTiltRad)
            {
                Angle = -_c.MaxTiltRad;
                if (AngularVelocity < 0f) AngularVelocity = 0f;
            }
        }
    }
}
