using System;

namespace Playable
{
    public sealed class Health
    {
        private readonly float _maximum;

        public float Current { get; private set; }
        public float Normalized => Current / _maximum;
        public bool IsDead => Current <= 0f;

        public Health(float max)
        {
            if (max <= 0f || float.IsNaN(max) || float.IsInfinity(max))
                throw new ArgumentOutOfRangeException(nameof(max), "Maximum health must be finite and greater than zero.");

            _maximum = max;
            Current = max;
        }

        public bool ApplyDamage(float damage)
        {
            if (IsDead || damage <= 0f || float.IsNaN(damage)) return false;
            Current = Math.Max(0f, Current - damage);
            return IsDead;
        }
    }
}
