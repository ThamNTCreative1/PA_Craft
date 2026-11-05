using System;
using UnityEngine;

namespace Playable
{
    public sealed class MonsterController : MonoBehaviour
    {
        private enum State { Dormant, Approach, Attack, Dying, Frozen }
        [SerializeField] private PaintballNpcMotor _motor;
        [SerializeField] private Animator _animator;
        [SerializeField] private WorldHealthBar _healthBar;
        [SerializeField] private Collider _collider;
        [SerializeField] private Transform _aimPoint;
        [SerializeField] private AudioSource _audio;
        [SerializeField] private AudioClip _attackSound, _hitSound, _deathSound;
        [SerializeField, Min(1f)] private float _maxHealth = 150f;
        [SerializeField, Min(0f)] private float _moveSpeed = 2.5f;
        [SerializeField, Min(0.1f)] private float _attackRange = 2.5f;
        [SerializeField, Min(1f)] private float _attackDamage = 20f;
        [SerializeField, Min(0f)] private float _attackHitTime = 0.3764471f;
        [SerializeField, Min(0.1f)] private float _attackDuration = 1.366667f;
        private Health _health;
        private PlayerHealth _target;
        private State _state;
        private float _attackTime;
        private bool _hitDelivered;
        public Transform AimPoint => _aimPoint;
        public event Action Defeated;

        private void Awake()
        {
            _health = new Health(_maxHealth);
            if (_motor == null || _animator == null || _collider == null || _aimPoint == null || _healthBar == null)
            {
                Debug.LogError("Monster needs motor, Animator, collider, aim point and health bar.", this);
                enabled = false;
                return;
            }
            _healthBar.SetValue(1f);
            _animator.Play("Idle", 0, 0f);
        }
        public void Activate(PlayerHealth target)
        {
            if (_state != State.Dormant || target == null || target.IsDead) return;
            _target = target;
            _state = State.Approach;
            _animator.Play("Run", 0, 0f);
        }
        private void FixedUpdate()
        {
            if (_state != State.Approach && _state != State.Attack) return;
            if (_target == null || _target.IsDead) { Freeze(); return; }
            Vector3 delta = _target.transform.position - transform.position;
            delta.y = 0f;
            if (_state == State.Approach)
            {
                if (delta.sqrMagnitude > _attackRange * _attackRange)
                    _motor.MoveTowards(_target.transform.position, _moveSpeed);
                else
                {
                    _motor.Stop();
                    _state = State.Attack;
                    _attackTime = 0f;
                    _hitDelivered = false;
                    _animator.Play("Attack", 0, 0f);
                    PlaySound(_attackSound);
                }
                return;
            }
            _motor.Stop();
            _motor.Face(_target.transform.position);
            _attackTime += Time.fixedDeltaTime;
            if (!_hitDelivered && _attackTime >= _attackHitTime) OnAnimationHit();
            if (_state != State.Attack) return;
            if (_attackTime >= _attackDuration)
            {
                _state = State.Approach;
                _animator.Play("Run", 0, 0f);
            }
        }
        public void OnAnimationHit()
        {
            if (_state != State.Attack || _hitDelivered || _target == null || _target.IsDead) return;
            _hitDelivered = true;
            Vector3 delta = _target.transform.position - transform.position;
            delta.y = 0f;
            if (delta.sqrMagnitude <= _attackRange * _attackRange) _target.TakeDamage(_attackDamage);
        }
        public void ReceiveHit(float damage)
        {
            if (_state == State.Dying || _state == State.Frozen || damage <= 0f || float.IsNaN(damage)) return;
            bool died = _health.ApplyDamage(damage);
            _healthBar.SetValue(_health.Normalized);
            PlaySound(died ? _deathSound : _hitSound);
            if (!died) return;
            _state = State.Dying;
            _motor.Stop();
            _collider.enabled = false;
            _animator.Play("Death", 0, 0f);
            Defeated?.Invoke();
        }
        public void AnimationEvent_DeathEnd() { }
        public void Freeze()
        {
            _state = State.Frozen;
            _motor.Stop();
            _animator.speed = 0f;
        }
        private void PlaySound(AudioClip clip)
        {
            if (_audio != null && clip != null) _audio.PlayOneShot(clip);
        }
    }
}
