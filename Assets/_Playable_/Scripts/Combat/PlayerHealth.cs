using System;
using UnityEngine;

namespace Playable
{
    public sealed class PlayerHealth : MonoBehaviour
    {
        [SerializeField, Min(1f)] private float _maxHealth = 100f;
        [SerializeField] private PlayerPaintballController _weapon;
        private Health _health;
        private bool _invulnerable = true;
        public event Action Died;
        public bool IsDead => _health != null && _health.IsDead;
        private void Awake() { _health = new Health(_maxHealth); }
        public void SetInvulnerable(bool value) { _invulnerable = value; }
        public void TakeDamage(float damage)
        {
            if (_invulnerable || IsDead || damage <= 0f || float.IsNaN(damage)) return;
            bool died = _health.ApplyDamage(damage);
            if (_weapon != null) _weapon.ReceiveHit();
            if (died) Died?.Invoke();
        }
    }
}
