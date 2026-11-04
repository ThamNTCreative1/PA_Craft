using System;
using System.Collections;
using System.Collections.Generic;
using DG.Tweening;
using Playable.MonsterArmy.Core;
using UnityEngine;

namespace Playable.MonsterArmy
{
    public enum BossSkill
    {
        Stomp,
        FireballRain,
        Roar,
        EnergyBeam
    }

    /// <summary>
    /// Boss bất tử. Máu tụt thật nhưng bị chặn sàn, và đòn Roar hút sinh lực từ xác
    /// quái để đẩy thanh máu lên lại — người chơi quy trách nhiệm cho skill của boss
    /// chứ không cho nhà phát triển (spec mục 4.2).
    ///
    /// Ba skill xoay vòng, mỗi đòn có telegraph để người xem kịp hiểu chuyện gì xảy
    /// ra thay vì thấy quái chết không rõ lý do.
    /// </summary>
    public sealed class BossUnit : MonoBehaviour
    {
        private const float TelegraphSeconds = 0.6f;
        private const float SkillInterval = 3.2f;
        private const float HealthPerCorpse = 18f;

        [SerializeField] private MonsterRig _rig;
        [SerializeField] private SpriteRenderer _telegraphGlow;
        [SerializeField] private VfxPool _vfx;
        [SerializeField] private ChaosDirector _chaos;
        [SerializeField] private CombatAudio _audio;
        [SerializeField] private float _bossScale = 4.5f;
        [SerializeField] private float _chargeSpeed = 0.55f;
        [SerializeField] private float _chargeStopDistance = 1.8f;


        [SerializeField] private float _stompRadius = 3.5f;
        [SerializeField] private float _stompDamage = 45f;
        [SerializeField] private int _fireballCount = 6;
        [SerializeField] private float _fireballDamage = 38f;
        [SerializeField] private float _roarKnockback = 1.5f;
        [SerializeField] private float _roarDamage = 20f;
        [SerializeField] private float _beamDamage = 32f;
        private readonly List<SpriteRenderer> _beams = new List<SpriteRenderer>();
        private Sprite _beamSprite;

        private Func<IReadOnlyList<MonsterUnit>> _liveMonsters;
        private Func<int> _corpseCount;
        private Coroutine _skillLoop;
        private bool _wasAtFloor;
        private bool _casting;
        private bool _horizontalBattle;
        private readonly List<Tween> _pendingImpacts = new List<Tween>();

        public BossHealthModel Health { get; private set; }
        public Vector3 HeadTop => _rig != null ? _rig.HeadTop : transform.position + Vector3.up * 1.7f;

        /// <summary>
        /// Bật khi bấm START. Boss tiến xuống gặp đội quân thay vì đứng yên chịu đòn —
        /// hai bên lao vào nhau thì cú va chạm mới ra chuyện.
        /// </summary>
        public bool BattleActive { get; set; }

        public event Action<BossSkill> OnSkillTelegraphed;
        public event Action OnReachedFloor;

        public void Initialise(float maxHealth, Func<IReadOnlyList<MonsterUnit>> liveMonsters,
            Func<int> corpseCount)
        {
            Health = new BossHealthModel(maxHealth);
            _liveMonsters = liveMonsters;
            _corpseCount = corpseCount;
            _wasAtFloor = false;

            if (_rig == null) _rig = GetComponent<MonsterRig>();
            // Hươu tối màu, miệng há, mắt đỏ — bộ phận riêng, phóng to để đọc ra ngay
            // là "khác loại".
            _rig.BuildBoss(variantSeed: 9001);
            // Keep the boss behind every monster, including during overlapping attacks.
            _rig.SetSortingOrder(-10000);
            transform.localScale = Vector3.one * _bossScale;

            if (_telegraphGlow != null) _telegraphGlow.enabled = false;

            if (_skillLoop != null) StopCoroutine(_skillLoop);
            _skillLoop = StartCoroutine(SkillLoop());
        }

        // Compare feet rather than body pivots so small units never walk up into the boss.
        public Vector3 ApproachPosition(Vector3 unitFeet)
        {
            Vector3 feet = _rig.FeetPosition;
            if (_horizontalBattle) return feet + Vector3.left * 0.8f;
            float halfWidth = _rig.WorldBounds.extents.x * 0.65f;
            feet.x = Mathf.Clamp(unitFeet.x, feet.x - halfWidth, feet.x + halfWidth);
            return feet + Vector3.down * 0.35f;
        }

        public Vector3 RangedPosition(Vector3 unitFeet, float distance)
        {
            Vector3 back = _horizontalBattle ? Vector3.left : Vector3.down;
            return ApproachPosition(unitFeet) + back * distance;
        }

        public void TakeDamage(float amount)
        {
            if (Health == null) return;

            Health.ApplyDamage(amount);
            if (!Health.IsAtFloor || _wasAtFloor) return;

            _wasAtFloor = true;
            OnReachedFloor?.Invoke();
        }

        /// <summary>
        /// Tiến về phía con quái gần nhất cho tới khi vào tầm, rồi đứng lại đánh.
        /// Chậm hơn quái nhiều lần: boss là bức tường đang nhích tới, không phải
        /// thứ đuổi theo người chơi.
        /// </summary>
        private void Update()
        {
            if (!BattleActive || _casting) { _rig?.SetWalking(false); return; }

            MonsterUnit nearest = null;
            float nearestDistance = float.MaxValue;

            IReadOnlyList<MonsterUnit> source = _liveMonsters?.Invoke();
            if (source == null) return;

            for (int i = 0; i < source.Count; i++)
            {
                MonsterUnit unit = source[i];
                if (unit == null || !unit.IsAlive) continue;

                float distance = ((Vector2)(unit.FeetPosition - ApproachPosition(unit.FeetPosition))).sqrMagnitude;
                if (distance >= nearestDistance) continue;

                nearestDistance = distance;
                nearest = unit;
            }

            bool walking = nearest != null && nearestDistance > _chargeStopDistance * _chargeStopDistance;
            _rig.SetWalking(walking);
            if (!walking) return;

            Vector3 direction = (nearest.transform.position - transform.position).normalized;
            transform.position += direction * (_chargeSpeed * Time.deltaTime);
        }

        private IEnumerator SkillLoop()
        {
            var order = new[] { BossSkill.Stomp, BossSkill.EnergyBeam, BossSkill.FireballRain, BossSkill.Roar };
            int index = 0;

            while (true)
            {
                float remaining = SkillInterval;
                while (remaining > 0f)
                {
                    if (BattleActive) remaining -= Time.deltaTime;
                    yield return null;
                }
                if (!BattleActive) continue;

                BossSkill skill = order[index];
                index = (index + 1) % order.Length;
                // Keep pressure on the back line when there is nobody in blast range.
                if (skill != BossSkill.Roar && !Live().Exists(IsClose)) skill = BossSkill.EnergyBeam;

                _casting = true;
                _rig.PlayBossAttack(skill);
                yield return Telegraph(skill);
                if (BattleActive) Cast(skill);
                yield return new WaitForSeconds(0.4f);
                _casting = false;
            }
        }

        /// <summary>Boss khựng lại, viền đỏ sáng dần. Cho người xem 0.6s để đọc tình huống.</summary>
        private IEnumerator Telegraph(BossSkill skill)
        {
            OnSkillTelegraphed?.Invoke(skill);

            float elapsed = 0f;
            while (BattleActive && elapsed < TelegraphSeconds)
            {
                elapsed += Time.deltaTime;

                yield return null;
            }

            SetGlowAlpha(0f);
        }

        private void Cast(BossSkill skill)
        {
            switch (skill)
            {
                case BossSkill.Stomp: CastStomp(); break;
                case BossSkill.FireballRain: CastFireballRain(); break;
                case BossSkill.Roar: CastRoar(); break;
                case BossSkill.EnergyBeam: CastEnergyBeam(); break;
            }
        }

        /// <summary>Sóng xung kích quét hàng quái gần nhất.</summary>
        private void CastStomp()
        {
            _audio?.PlayBossStomp();
            _chaos?.Shake(1.5f);
            _vfx?.TrySpawn(VfxKind.BigExplosion, _rig.FeetPosition, new Color(1f, 0.7f, 0.3f));

            foreach (MonsterUnit unit in Live())
            {
                if (!IsClose(unit)) continue;
                _vfx?.TrySpawn(VfxKind.BigExplosion, unit.VisualBounds.center, new Color(1f, 0.7f, 0.3f));
                unit.TakeDamage(_stompDamage);
            }
        }

        /// <summary>Nhiều cầu lửa rơi rải rác — đòn sinh nhiều VFX đồng thời nhất.</summary>
        private void CastFireballRain()
        {
            _audio?.PlayFireball();
            _chaos?.Flash();
            _vfx?.TrySpawn(VfxKind.SmallFireball, transform.position + Vector3.up, new Color(1f, 0.5f, 0.2f));

            for (int i = 0; i < _fireballCount; i++)
            {
                int targetIndex = i;
                float delay = i * 0.12f;
                Tween impactTween = null;
                impactTween = DOVirtual.DelayedCall(delay, () =>
                {
                    _pendingImpacts.Remove(impactTween);
                    if (!BattleActive) return;
                    // Resolve the live target at impact time, after movement and earlier deaths.
                    List<MonsterUnit> targets = Live();
                    targets.RemoveAll(unit => !IsClose(unit));
                    if (targets.Count == 0) return;
                    MonsterUnit target = targets[targetIndex % targets.Count];
                    Vector3 impact = target.transform.position;
                    _vfx?.TrySpawn(VfxKind.BigExplosion, target.VisualBounds.center, Color.white);
                    _audio?.PlayGrenadeBoom();
                    _chaos?.Shake(1.1f);

                    foreach (MonsterUnit unit in targets)
                    {
                        if (unit == null || !unit.IsAlive) continue;
                        if (!IsClose(unit)) continue;
                        if (Vector2.Distance(unit.transform.position, impact) > 1.4f) continue;
                        unit.TakeDamage(_fireballDamage);
                    }
                }, false);
                _pendingImpacts.Add(impactTween);
            }
        }

        private bool IsClose(MonsterUnit unit)
        {
            return unit != null && unit.IsAlive &&
                Vector2.Distance(unit.FeetPosition, _rig.FeetPosition) <= _stompRadius;
        }

        private void CastEnergyBeam()
        {
            List<MonsterUnit> targets = Live();
            targets.RemoveAll(unit => IsClose(unit) ||
                MonsterStats.CategoryFor(unit.Kind) == WeaponCategory.Melee);
            targets.Sort((a, b) => Vector2.Distance(b.FeetPosition, _rig.FeetPosition)
                .CompareTo(Vector2.Distance(a.FeetPosition, _rig.FeetPosition)));
            if (targets.Count == 0) return;

            MonsterUnit target = targets[0];
            Vector3 impact = target.VisualBounds.center;
            SpriteRenderer left = GetBeam(0);
            SpriteRenderer right = GetBeam(1);
            PositionBeam(left, _rig.BossEyePosition(false), impact);
            PositionBeam(right, _rig.BossEyePosition(true), impact);
            left.enabled = right.enabled = true;
            _audio?.PlayLaser();
            _chaos?.Burn(target);
            Tween fade = null;
            fade = DOVirtual.DelayedCall(0.3f, () =>
            {
                _pendingImpacts.Remove(fade);
                left.enabled = right.enabled = false;
            }, false).OnUpdate(() =>
            {
                if (target != null && target.IsAlive) impact = target.VisualBounds.center;
                PositionBeam(left, _rig.BossEyePosition(false), impact);
                PositionBeam(right, _rig.BossEyePosition(true), impact);
            });
            _pendingImpacts.Add(fade);
            // Two visual rays form one attack, so damage is applied once.
            target.TakeDamage(_beamDamage);
        }

        private SpriteRenderer GetBeam(int index)
        {
            while (_beams.Count <= index)
            {
                if (_beamSprite == null)
                {
                    Texture2D texture = Texture2D.whiteTexture;
                    _beamSprite = Sprite.Create(texture, new Rect(0f, 0f, texture.width, texture.height),
                        new Vector2(0.5f, 0.5f), 1f);
                }
                var go = new GameObject("Boss Energy Beam");
                go.transform.SetParent(transform, false);
                // Sprite quads avoid Luna's runtime LineRenderer gradient/curve setters.
                var beam = go.AddComponent<SpriteRenderer>();
                beam.sprite = _beamSprite;
                beam.color = Color.red;
                beam.sortingOrder = 19999;
                beam.enabled = false;
                _beams.Add(beam);
            }
            return _beams[index];
        }

        private void PositionBeam(SpriteRenderer beam, Vector3 origin, Vector3 impact)
        {
            Vector3 direction = impact - origin;
            Transform beamTransform = beam.transform;
            beamTransform.position = (origin + impact) * 0.5f;
            beamTransform.rotation = Quaternion.Euler(0f, 0f,
                Mathf.Atan2(direction.y, direction.x) * Mathf.Rad2Deg);
            Vector3 parentScale = transform.lossyScale;
            Vector3 spriteSize = _beamSprite.bounds.size;
            beamTransform.localScale = new Vector3(
                direction.magnitude / (spriteSize.x * Mathf.Max(0.0001f, Mathf.Abs(parentScale.x))),
                0.045f / (spriteSize.y * Mathf.Max(0.0001f, Mathf.Abs(parentScale.y))), 1f);
        }

        /// <summary>
        /// Hất quái văng ngược VÀ hút sinh lực từ xác. Đây là cơ chế giữ boss bất tử:
        /// thanh máu nhích lên lại nhờ một đòn người chơi nhìn thấy, không phải nhờ
        /// một con số bị khoá ngầm.
        /// </summary>
        private void CastRoar()
        {
            _audio?.PlayBossRoar();
            _chaos?.Shake(1.3f);
            _vfx?.TrySpawn(VfxKind.Smoke, transform.position, new Color(1f, 0.25f, 0.3f));

            foreach (MonsterUnit unit in Live())
            {
                Vector3 away = unit.transform.position - transform.position;
                unit.Knockback(away, _roarKnockback);
                unit.TakeDamage(_roarDamage);
            }

            int corpses = _corpseCount?.Invoke() ?? 0;
            float healed = Health?.Drain(corpses, HealthPerCorpse) ?? 0f;
            if (healed <= 0f) return;

            // Hiệu ứng hút màu đỏ từ sàn về boss.
            for (int i = 0; i < 4; i++)
            {
                Vector3 from = transform.position + SkillOffset(new Vector3(
                    UnityEngine.Random.Range(-3f, 3f), UnityEngine.Random.Range(-4f, -1f), 0f));
                _vfx?.TrySpawn(VfxKind.Smoke, from, new Color(1f, 0.3f, 0.35f));
            }
        }

        /// <summary>
        /// Bản chụp danh sách quái sống. Phải là bản sao chứ không phải tham chiếu tới
        /// list của controller: FireballRain giữ nó qua nhiều frame (0.12s mỗi quả), mà
        /// list gốc thì thay đổi liên tục khi quái chết hoặc người chơi thả thêm.
        /// Người gọi vẫn phải kiểm IsAlive vì unit có thể chết trong lúc chờ.
        /// </summary>
        private List<MonsterUnit> Live()
        {
            var snapshot = new List<MonsterUnit>();
            IReadOnlyList<MonsterUnit> source = _liveMonsters?.Invoke();
            if (source == null) return snapshot;

            foreach (MonsterUnit unit in source)
                if (unit != null && unit.IsAlive)
                    snapshot.Add(unit);

            return snapshot;
        }

        private void SetGlowAlpha(float alpha)
        {
            if (_telegraphGlow == null) return;

            Color colour = _telegraphGlow.color;
            colour.a = 0f;
            _telegraphGlow.enabled = false;
            _telegraphGlow.color = colour;
        }

        private Vector3 SkillOffset(Vector3 offset)
        {
            return _horizontalBattle ? new Vector3(offset.y, -offset.x, offset.z) : offset;
        }

        public void SetBattleOrientation(bool horizontal)
        {
            _horizontalBattle = horizontal;
            if (Health == null) return;
            bool active = BattleActive;
            StopBattle();
            BattleActive = active;
            _skillLoop = StartCoroutine(SkillLoop());
        }

        public void StopBattle()
        {
            BattleActive = false;
            _casting = false;
            if (_skillLoop != null) StopCoroutine(_skillLoop);
            _skillLoop = null;
            foreach (Tween impact in _pendingImpacts) impact.Kill();
            _pendingImpacts.Clear();
            foreach (SpriteRenderer beam in _beams) beam.enabled = false;
            SetGlowAlpha(0f);
            _rig?.StopAttack();
        }

        private void OnDisable() => StopBattle();
        private void OnDestroy()
        {
            StopBattle();
            if (_beamSprite != null) Destroy(_beamSprite);
        }
    }
}
