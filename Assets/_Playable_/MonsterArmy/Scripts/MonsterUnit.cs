using System;
using Playable.MonsterArmy.Core;
using UnityEngine;

namespace Playable.MonsterArmy
{
    /// <summary>
    /// Một con quái trên sàn: tiến về boss, đánh khi tới tầm, chết thì báo về pool.
    /// Mỗi loại nổ một kiểu khác nhau để màn hình đa dạng (spec mục 5.4).
    /// </summary>
    [RequireComponent(typeof(MonsterRig))]
    public sealed class MonsterUnit : MonoBehaviour
    {
        public const float SpawnScale = 1.5f;
        private const float BattleHealthMultiplier = 2.5f;
        [SerializeField] private MonsterRig _rig;
        [SerializeField] private VfxPool _vfx;
        [SerializeField] private CombatAudio _audio;

        private MonsterStats _stats;
        private BossUnit _target;
        private float _health;
        private float _attackCooldown;
        private const float KnockbackDuration = 0.35f;
        private Vector3 _knockbackOffset;
        private float _knockbackRemaining;

        /// <summary>Tăng mỗi cú đánh để tia lửa đổi kiểu, không lặp lại một hình.</summary>
        private int _effectRoll;

        public MonsterKind Kind { get; private set; }
        public MonsterSpecies Species { get; private set; }
        public bool IsAlive { get; private set; }
        public Vector3 FeetPosition => _rig != null ? _rig.FeetPosition : transform.position;
        public Bounds VisualBounds => _rig != null ? _rig.WorldBounds : new Bounds(transform.position, Vector3.zero);

        /// <summary>
        /// Trước khi bấm START, quái đứng xếp hàng tại ô của mình. Controller bật cờ
        /// này cho toàn đội khi trận bắt đầu, và bật sẵn cho quái thả thêm giữa trận.
        /// </summary>
        public bool BattleActive { get; set; }

        /// <summary>Ô lưới con quái đang chiếm. Controller giữ đồng bộ với PlacementGrid.</summary>
        public int Column { get; set; } = -1;
        public int Row { get; set; } = -1;

        public event Action<MonsterUnit> OnDied;

        public void Configure(VfxPool vfx, CombatAudio audio)
        {
            _vfx = vfx;
            _audio = audio;
        }

        public void Spawn(MonsterSpecies species, int variantSeed, Vector3 position, BossUnit target)
        {
            if (_rig == null) _rig = GetComponent<MonsterRig>();

            SpeciesInfo info = MonsterRoster.Get(species);
            Species = species;
            Kind = info.Kind;
            _stats = MonsterStats.For(info.Kind);
            _target = target;
            _health = _stats.Health * BattleHealthMultiplier;
            _attackCooldown = 0f;
            _knockbackRemaining = 0f;
            _knockbackOffset = Vector3.zero;
            IsAlive = true;
            BattleActive = false;

            transform.position = position;
            transform.localScale = Vector3.one * SpawnScale;
            _rig.ResetForReuse();
            _rig.Build(species, variantSeed);
            gameObject.SetActive(true);
        }

        public void TakeDamage(float amount)
        {
            if (!IsAlive || amount <= 0f) return;

            _health -= amount;
            if (_health > 0f) return;

            Die();
        }

        public void Despawn()
        {
            IsAlive = false;
            BattleActive = false;
            _rig.ResetForReuse();
            _knockbackRemaining = 0f;
            gameObject.SetActive(false);
        }

        /// <summary>Kéo thả: đặt lại vị trí mà không đụng tới máu hay trạng thái chiến đấu.</summary>
        public void MoveTo(Vector3 position)
        {
            transform.position = position;
        }

        private void Update()
        {
            // Apply only this frame's displacement, so movement never teleports or
            // competes with normal navigation. Finish the slide even on a lethal hit.
            if (_knockbackRemaining > 0f)
            {
                float previous = _knockbackRemaining / KnockbackDuration;
                _knockbackRemaining = Mathf.Max(0f, _knockbackRemaining - Time.deltaTime);
                float current = _knockbackRemaining / KnockbackDuration;
                transform.position += _knockbackOffset * (previous * previous - current * current);
                _rig.SetWalking(false);
                return;
            }

            if (!IsAlive || _target == null) return;
            if (!BattleActive)
            {
                _rig.SetWalking(false);
                return;
            }

            Vector3 destination = _target.ApproachPosition(_rig.FeetPosition)
                + (transform.position - _rig.FeetPosition);
            float distance = Vector2.Distance(transform.position, destination);
            bool ranged = MonsterStats.CategoryFor(Kind) != WeaponCategory.Melee;
            float stoppingDistance = ranged ? _stats.AttackRange : 0.05f;
            if (distance > stoppingDistance)
            {
                Advance(destination);
                return;
            }

            // Keep shooters behind the front line even when the boss advances.
            if (ranged && distance < _stats.AttackRange * 0.6f)
            {
                Vector3 retreat = _target.RangedPosition(FeetPosition, _stats.AttackRange * 0.8f)
                    + (transform.position - FeetPosition);
                Advance(retreat);
                return;
            }

            _rig.SetWalking(false);
            _attackCooldown -= Time.deltaTime;
            if (_attackCooldown > 0f) return;

            _attackCooldown = _stats.AttackInterval;
            Attack();
        }

        private void LateUpdate()
        {
            // Quái đứng thấp hơn che quái đứng cao hơn — phối cảnh 3/4.
            // Preserve depth between monsters while keeping them in front of the boss.
            _rig.SetSortingOrder(Mathf.Clamp(-Mathf.RoundToInt(transform.position.y * 100f), -9000, 9000));
        }

        private void Advance(Vector3 destination)
        {
            _rig.SetWalking(true);
            transform.position = Vector3.MoveTowards(transform.position, destination, _stats.MoveSpeed * Time.deltaTime);
        }

        private void Attack()
        {
            _rig.PlayAttack();
            _target.TakeDamage(_stats.Damage);

            Vector3 impact = Vector3.Lerp(transform.position, _target.transform.position, 0.8f);
            SpawnHitEffect(impact);
        }

        /// <summary>
        /// Hiệu ứng khớp với thứ nhân vật đang cầm: cận chiến ra tia lửa va chạm, súng
        /// ra lửa đầu nòng rồi tia lửa ở đích, chất nổ ra vụ nổ lớn.
        /// </summary>
        private void SpawnHitEffect(Vector3 impact)
        {
            if (_vfx == null) return;

            int roll = _effectRoll++;

            switch (Kind)
            {
                case MonsterKind.Brute:
                case MonsterKind.Tank:
                    _vfx.TrySpawn(VfxKind.Spark, impact, Color.white, roll);
                    _audio?.PlayAxeHit();
                    break;

                case MonsterKind.Gunner:
                    SpawnMuzzleFlash();
                    _vfx.TrySpawn(VfxKind.Spark, impact, Color.white, roll);
                    _audio?.PlayGunshot();
                    break;

                case MonsterKind.Bomber:
                    _vfx.TrySpawn(VfxKind.BigExplosion, impact, Color.white);
                    _audio?.PlayGrenade();
                    break;

                case MonsterKind.Laser:
                    SpawnMuzzleFlash();
                    _vfx.TrySpawn(VfxKind.AcidSplat, impact, Color.white);
                    _audio?.PlayLaser();
                    break;
            }
        }

        /// <summary>Chớp lửa ngay ở đầu vũ khí, xoay theo hướng nhân vật đang nhắm.</summary>
        private void SpawnMuzzleFlash()
        {
            Transform anchor = _rig.WeaponAnchor;
            if (anchor == null) return;

            Vector3 toTarget = _target.transform.position - transform.position;
            float angle = Mathf.Atan2(toTarget.y, toTarget.x) * Mathf.Rad2Deg;
            _vfx.TrySpawn(VfxKind.MuzzleFlash, anchor.position, Color.white, 0, angle);
        }

        private void Die()
        {
            IsAlive = false;
            BattleActive = false;
            _rig.SetWalking(false);
            _vfx?.TrySpawn(VfxKind.Puff, transform.position, new Color(1f, 0.5f, 0.5f));
            _audio?.PlayMonsterDeath();

            _rig.PlayDeath(() =>
            {
                gameObject.SetActive(false);
            });
            // Release gameplay occupancy immediately; the visible corpse finishes separately.
            OnDied?.Invoke(this);
        }

        /// <summary>Roar của boss hất quái văng ngược về sau.</summary>
        public void Knockback(Vector3 direction, float distance)
        {
            if (!IsAlive) return;
            direction.z = 0f;
            float remaining = _knockbackRemaining / KnockbackDuration;
            _knockbackOffset = _knockbackOffset * (remaining * remaining)
                + direction.normalized * Mathf.Max(0f, distance);
            _knockbackRemaining = KnockbackDuration;
            _rig.StopAttack();
        }
    }
}
