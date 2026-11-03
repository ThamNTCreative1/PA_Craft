# Monster Combat System Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Cho 5 loại quái (Enderman, Iron Golem, Creeper, Huggy, Shinsonic) chiến đấu với common actions
(idle/walk/attack/ném bom/knockback) + 1 skill đặc biệt riêng mỗi loại, điều khiển bằng 1 bảng data chung.

**Architecture:** Tách `Monster.cs` (orchestrator, giữ nguyên state machine wander hiện có) thành component
composition: `MonsterHealth` (HP/CC/poison/heal), `MonsterCombat` (target priority/melee/bomb), `MonsterProjectile`
(bom, pooled), và `IMonsterSkill` + 6 skill component riêng (Enderman có 2). Số liệu đọc từ 1
`MonsterStatsTable` ScriptableObject dùng chung.

**Tech Stack:** Unity 6000.0.60 (C# 9, Mono), DOTween (chỉ dùng cho spawn-scale, không dùng cho combat vì lý
do hiệu năng), không có Unity Test Framework asmdef trong repo.

**Spec:** `docs/superpowers/specs/2026-08-26-monster-combat-system-design.md`

## Global Constraints

- Zero-alloc trong `Update()`: không `StartCoroutine` cho tick lặp, không LINQ trong hot path (từ spec §7.1).
- Knockback/launch dùng lerp thủ công trong `Update()`, **không** tạo `DOTween.Tween` mới (từ spec §7.2) - DOTween
  chỉ giữ lại cho spawn-scale (hiếm khi chạy).
- VFX/projectile pooling triệt để: tạo instance 1 lần, `SetActive`/`Play()` lại, không `Instantiate`/`Destroy` sau
  lúc warm-up (từ spec §7.3).
- Mọi Animator param mới cache hash 1 lần (`Animator.StringToHash` trong `Awake`), không set bằng string trực
  tiếp lúc runtime (từ spec §7.4).
- `GetComponents<IMonsterSkill>()` chỉ gọi 1 lần ở `Monster.Awake()`, cache mảng (từ spec §7.5).
- Log debug chi tiết phải tự guard `if (MonsterDebug.VerboseLoggingEnabled)` **trước** khi gọi
  `MonsterDebug.Log(...)` với string nội suy - tham số được C# evaluate trước khi vào hàm nên guard nội bộ
  trong `Log()` không đủ để tránh alloc (từ spec §7.7).
- Bảng số liệu (`MonsterStatsTable`) chỉ chứa số, không chứa asset VFX/prefab - asset trình diễn khai báo trực
  tiếp trên từng component/prefab (từ spec §2).
- File mới đặt trong `Assets/_Playable_/Scripts/Combat/` (skill trong `Assets/_Playable_/Scripts/Combat/Skills/`),
  namespace `Playable`.
- **Verify build:** Repo không có Unity Test Framework asmdef nên không chạy được unit test. Dùng
  `Assembly-CSharp.csproj` (đã có sẵn ở gốc repo, sinh ra từ lần mở Unity Editor gần nhất, bị gitignore) làm
  compile-check thay thế: `dotnet build Assembly-CSharp.csproj` phải ra `0 Error(s)`. File csproj này liệt kê
  từng `.cs` tường minh (không wildcard) và Unity Editor không tự regenerate trong môi trường này - **mỗi file
  `.cs` mới phải được thêm 1 dòng `<Compile Include="...">` vào `Assembly-CSharp.csproj` trước khi build**, nếu
  không `dotnet build` sẽ "pass" giả (không thực sự biên dịch file mới). Thêm dòng này ngay sau dòng
  `<Compile Include="Assets\_Playable_\Scripts\Monster.cs" />` đã có sẵn trong file.

---

## Task 1: Foundation types — `MonsterType`, `MonsterDebug`, `MonsterStatsTable`, `IMonsterSkill`

**Files:**
- Create: `Assets/_Playable_/Scripts/Combat/MonsterType.cs`
- Create: `Assets/_Playable_/Scripts/Combat/MonsterDebug.cs`
- Create: `Assets/_Playable_/Scripts/Combat/MonsterStatsTable.cs`
- Create: `Assets/_Playable_/Scripts/Combat/IMonsterSkill.cs`
- Modify: `Assembly-CSharp.csproj` (thêm 4 dòng `<Compile Include>`)

**Interfaces:**
- Produces: `enum MonsterType { Enderman, IronGolem, Creeper, Huggy, Shinsonic }`; `static class MonsterDebug`
  với `bool VerboseLoggingEnabled`, `void Log(string tag, string message)`, `void LogWarning(string tag, string
  message)`, `void LogError(string tag, string message)`; `class MonsterStatsEntry` (public fields, xem Bước 3);
  `class MonsterStatsTable : ScriptableObject` với `MonsterStatsEntry GetEntry(MonsterType type)`; `interface
  IMonsterSkill` với `bool IsChanneling { get; }`, `void Init(Monster self, MonsterStatsEntry stats)`, `void
  Tick(Monster target)`.

- [ ] **Step 1: Tạo `MonsterType.cs`**

```csharp
namespace Playable
{
    public enum MonsterType
    {
        Enderman,
        IronGolem,
        Creeper,
        Huggy,
        Shinsonic
    }
}
```

- [ ] **Step 2: Tạo `MonsterDebug.cs`**

```csharp
using UnityEngine;

namespace Playable
{
    /// <summary>
    /// Log helper cho hệ combat, tách riêng khỏi Debug.Log rải rác để bật/tắt log chi tiết 1 chỗ khi build
    /// Luna (playable ads). QUAN TRỌNG: string nội suy ($"...") được C# evaluate TRƯỚC khi gọi Log(), nên
    /// caller phải tự guard "if (MonsterDebug.VerboseLoggingEnabled)" trước khi gọi Log() với string nội
    /// suy - check bên trong Log() chỉ chặn Debug.Log thực thi, không tránh được alloc string ở call site.
    /// </summary>
    public static class MonsterDebug
    {
        public static bool VerboseLoggingEnabled = false;

        public static void Log(string tag, string message)
        {
            if (!VerboseLoggingEnabled)
            {
                return;
            }

            Debug.Log("[" + tag + "] " + message);
        }

        public static void LogWarning(string tag, string message)
        {
            Debug.LogWarning("[" + tag + "] " + message);
        }

        public static void LogError(string tag, string message)
        {
            Debug.LogError("[" + tag + "] " + message);
        }
    }
}
```

- [ ] **Step 3: Tạo `MonsterStatsTable.cs`**

```csharp
using System;
using System.Collections.Generic;
using UnityEngine;

namespace Playable
{
    [Serializable]
    public class MonsterStatsEntry
    {
        public MonsterType Type;

        [Header("Core")]
        public float MaxHealth = 100f;
        public float MoveSpeed = 1.5f;

        [Header("Melee Attack")]
        public float AttackDamage = 20f;
        public float AttackRange = 1.5f;
        public float AttackCooldown = 1.5f;

        [Header("Bomb (ranged)")]
        public float BombDamage = 15f;
        public float BombRange = 5f;
        public float BombCooldown = 3f;
        public float BombSpeed = 8f;
        public float BombKnockbackForce = 0.5f;

        [Header("Hit Reaction (chung mọi loại sát thương)")]
        public float KnockbackForce = 0.4f;
        public float KnockbackDuration = 0.35f;

        [Header("Enderman - Arm Reach")]
        public float ArmReachCooldown = 8f;
        public float ArmReachDamage = 15f;
        public float ArmReachDuration = 2f;
        public float ArmReachRange = 3f;
        public float ArmReachStunDuration = 1f;

        [Header("Enderman - Teleport")]
        public float TeleportCooldown = 10f;
        public float TeleportRadius = 3f;
        public float TeleportStepDelay = 0.3f;
        public float TeleportFinalAttackDamage = 20f;

        [Header("Iron Golem - Ground Slam")]
        public float SlamCooldown = 8f;
        public float SlamDamage = 25f;
        public float SlamLaunchHeight = 2f;
        public float SlamAirTime = 1f;
        public float SlamStunDuration = 1f;

        [Header("Creeper - Poison")]
        public float PoisonCooldown = 6f;
        public float PoisonDamagePerTick = 3f;
        public float PoisonTickInterval = 1f;
        public float PoisonDuration = 5f;

        [Header("Huggy - Regen")]
        public float RegenPerTick = 2f;
        public float RegenTickInterval = 1f;

        [Header("Shinsonic - Transform")]
        public float TransformStage1HpThreshold = 0.7f;
        public float TransformStage2HpThreshold = 0.3f;
        public float TransformStage1BonusMaxHealth = 50f;
        public float TransformStage1BonusDamage = 10f;
        public float TransformStage2BonusMaxHealth = 100f;
        public float TransformStage2BonusDamage = 20f;
    }

    [CreateAssetMenu(fileName = "MonsterStatsTable", menuName = "Playable/Monster Stats Table")]
    public class MonsterStatsTable : ScriptableObject
    {
        [SerializeField] private List<MonsterStatsEntry> _entries = new List<MonsterStatsEntry>();

        private static readonly MonsterStatsEntry _fallbackEntry = new MonsterStatsEntry();

        public MonsterStatsEntry GetEntry(MonsterType type)
        {
            for (int i = 0; i < _entries.Count; i++)
            {
                if (_entries[i] != null && _entries[i].Type == type)
                {
                    return _entries[i];
                }
            }

            MonsterDebug.LogError(
                "MONSTER STATS",
                "Không tìm thấy MonsterStatsEntry cho loại " + type + " trong bảng - dùng giá trị mặc định.");

            return _fallbackEntry;
        }
    }
}
```

- [ ] **Step 4: Tạo `IMonsterSkill.cs`**

```csharp
namespace Playable
{
    /// <summary>
    /// Mọi skill đặc biệt của quái implement interface này. Monster gọi Tick() mỗi frame lúc đang spawn
    /// (kể cả khi target null - Huggy/Shinsonic không cần target); skill tự quản lý cooldown/điều kiện
    /// kích hoạt riêng bên trong nó, Monster không switch-case theo loại quái.
    /// </summary>
    public interface IMonsterSkill
    {
        /// <summary>Đang thi triển skill (channel) - CC-immune trong lúc này, các skill khác trên cùng
        /// quái không được bắt đầu channel song song.</summary>
        bool IsChanneling { get; }

        /// <summary>Gọi 1 lần lúc Monster.Spawn() để cache tham chiếu + số liệu.</summary>
        void Init(Monster self, MonsterStatsEntry stats);

        /// <summary>Gọi mỗi frame. target có thể null nếu quái đang không giao chiến ai.</summary>
        void Tick(Monster target);
    }
}
```

- [ ] **Step 5: Thêm 4 file mới vào `Assembly-CSharp.csproj`**

Mở `Assembly-CSharp.csproj`, tìm dòng `<Compile Include="Assets\_Playable_\Scripts\Monster.cs" />` và thêm ngay
sau nó:

```xml
    <Compile Include="Assets\_Playable_\Scripts\Combat\MonsterType.cs" />
    <Compile Include="Assets\_Playable_\Scripts\Combat\MonsterDebug.cs" />
    <Compile Include="Assets\_Playable_\Scripts\Combat\MonsterStatsTable.cs" />
    <Compile Include="Assets\_Playable_\Scripts\Combat\IMonsterSkill.cs" />
```

- [ ] **Step 6: Build-check**

Run: `dotnet build Assembly-CSharp.csproj -v:q`
Expected: `0 Error(s)`

- [ ] **Step 7: Commit**

```bash
git add Assets/_Playable_/Scripts/Combat/MonsterType.cs Assets/_Playable_/Scripts/Combat/MonsterDebug.cs Assets/_Playable_/Scripts/Combat/MonsterStatsTable.cs Assets/_Playable_/Scripts/Combat/IMonsterSkill.cs
git commit -m "feat: monster combat foundation types (MonsterType, MonsterStatsTable, IMonsterSkill, MonsterDebug)"
```

(Không add `Assembly-CSharp.csproj` - file này bị gitignore, chỉnh sửa cục bộ để build-check, Unity Editor sẽ
tự regenerate đúng lại khi mở project.)

---

## Task 2: Combat core — `MonsterHealth`, `MonsterCombat`, `MonsterProjectile`, refactor `Monster.cs`

Đây là 1 task duy nhất vì 4 file phụ thuộc vòng lẫn nhau (Monster cần biết `MonsterHealth`/`MonsterCombat`,
`MonsterCombat` cần gọi `MonsterHealth`/`MonsterProjectile`/`Monster`) - không thể build-check từng file riêng
lẻ, chỉ build-check được sau khi cả 4 file cùng tồn tại.

**Files:**
- Create: `Assets/_Playable_/Scripts/Combat/MonsterHealth.cs`
- Create: `Assets/_Playable_/Scripts/Combat/MonsterProjectile.cs`
- Create: `Assets/_Playable_/Scripts/Combat/MonsterCombat.cs`
- Modify (rewrite toàn bộ): `Assets/_Playable_/Scripts/Monster.cs`
- Modify: `Assembly-CSharp.csproj`

**Interfaces:**
- Consumes: `MonsterType`, `MonsterStatsEntry`, `MonsterStatsTable.GetEntry`, `IMonsterSkill` (Task 1).
- Produces (dùng bởi Task 3-9):
  - `Monster.Health` (`MonsterHealth`), `Monster.Combat` (`MonsterCombat`), `Monster.Position` (`Vector3`),
    `Monster.IsDead` (`bool`), `Monster.IsAnySkillChanneling` (`bool`), `Monster.HasAnimator` (`bool`),
    `Monster.ChaseTowards(Vector3)`, `Monster.FaceTowards(Vector3)`, `Monster.TeleportTo(Vector3, bool)`,
    `Monster.PlayAnimatorTrigger(int, string)`, `Monster.SetAnimatorBool(int, string, bool)`.
  - `MonsterHealth.CurrentHealth`/`MaxHealth` (`float`), `IsDead`/`IsStaggered` (`bool`), `Damaged` (`event
    Action<Monster, float>`), `Died` (`event Action`), `TakeDamage(Monster, float)`, `Heal(float)`,
    `IncreaseMaxHealth(float, bool)`, `ApplyCrowdControl(Vector3, float, float)`, `ApplyPoison(float, float,
    float)`, `PlayLaunch(float, float)`.
  - `MonsterCombat.CurrentEnemy` (`Monster`), `AddAttackDamageBonus(float)`.

- [ ] **Step 1: Tạo `MonsterHealth.cs`**

```csharp
using System;
using UnityEngine;

namespace Playable
{
    /// <summary>
    /// HP, sát thương, hồi máu, và mọi hiệu ứng crowd-control (đẩy lùi/choáng/hất bay) + độc (DOT).
    /// Dùng lerp thủ công trong Update cho knockback/launch thay vì DOTween - hành động này xảy ra rất
    /// thường xuyên khi nhiều quái đánh nhau, tránh tạo Tween mới mỗi lần (GC alloc dồn dập trên build Luna).
    /// </summary>
    [DisallowMultipleComponent]
    public class MonsterHealth : MonoBehaviour
    {
        public event Action<Monster, float> Damaged;
        public event Action Died;

        private Monster _monster;
        private Transform _transform;

        private float _maxHealth;
        private float _currentHealth;
        private bool _isDead;

        private float _knockbackTimer;
        private float _knockbackDuration;
        private Vector3 _knockbackStartPosition;
        private Vector3 _knockbackTargetPosition;

        private bool _isPoisoned;
        private float _poisonDamagePerTick;
        private float _poisonTickTimer;
        private float _poisonTickInterval;
        private float _poisonDurationRemaining;

        private float _launchTimer;
        private float _launchDuration;
        private float _launchHeight;
        private Vector3 _launchGroundPosition;

        public float CurrentHealth => _currentHealth;
        public float MaxHealth => _maxHealth;
        public bool IsDead => _isDead;
        public bool IsStaggered => _knockbackTimer > 0f || _launchTimer > 0f;

        private void Awake()
        {
            _monster = GetComponent<Monster>();
            _transform = transform;
        }

        private void Update()
        {
            UpdateKnockback();
            UpdateLaunch();
            UpdatePoison();
        }

        /// <summary>Gọi từ Monster.Spawn() để reset máu về đầu trận.</summary>
        public void Init(float maxHealth)
        {
            _maxHealth = maxHealth;
            _currentHealth = maxHealth;
            _isDead = false;
            _knockbackTimer = 0f;
            _launchTimer = 0f;
            _isPoisoned = false;
            _poisonDurationRemaining = 0f;
        }

        public void TakeDamage(Monster attacker, float amount)
        {
            if (_isDead || amount <= 0f)
            {
                return;
            }

            _currentHealth -= amount;
            Damaged?.Invoke(attacker, amount);

            if (_currentHealth <= 0f)
            {
                Die();
            }
        }

        public void Heal(float amount)
        {
            if (_isDead || amount <= 0f)
            {
                return;
            }

            _currentHealth = Mathf.Min(_currentHealth + amount, _maxHealth);
        }

        public void IncreaseMaxHealth(float amount, bool healSameAmount)
        {
            if (_isDead || amount <= 0f)
            {
                return;
            }

            _maxHealth += amount;

            if (healSameAmount)
            {
                _currentHealth = Mathf.Min(_currentHealth + amount, _maxHealth);
            }
        }

        /// <summary>
        /// Đẩy lùi (knockbackDistance > 0) hoặc đứng yên tại chỗ (knockbackDistance = 0, dùng cho stun của
        /// skill) trong "duration" giây. Bỏ qua nếu đã chết hoặc đang channel skill (CC-immune lúc channel).
        /// </summary>
        public void ApplyCrowdControl(Vector3 sourcePosition, float knockbackDistance, float duration)
        {
            if (_isDead || duration <= 0f || (_monster != null && _monster.IsAnySkillChanneling))
            {
                return;
            }

            _knockbackDuration = duration;
            _knockbackTimer = duration;

            if (knockbackDistance <= 0f)
            {
                _knockbackStartPosition = _transform.position;
                _knockbackTargetPosition = _transform.position;
                return;
            }

            Vector3 position = _transform.position;
            Vector3 away = position - sourcePosition;
            away.y = 0f;

            Vector3 direction = away.sqrMagnitude > 0.0001f
                ? away.normalized
                : -_transform.forward;

            _knockbackStartPosition = position;
            _knockbackTargetPosition = position + direction * knockbackDistance;
        }

        public void ApplyPoison(float damagePerTick, float tickInterval, float duration)
        {
            if (_isDead || duration <= 0f || tickInterval <= 0f)
            {
                return;
            }

            _isPoisoned = true;
            _poisonDamagePerTick = damagePerTick;
            _poisonTickInterval = tickInterval;
            _poisonDurationRemaining = duration;
            _poisonTickTimer = tickInterval;
        }

        /// <summary>Hất bay lên rồi rơi xuống thuần vị trí (không physics) - dùng cho Iron Golem slam.</summary>
        public void PlayLaunch(float height, float duration)
        {
            if (_isDead || duration <= 0f)
            {
                return;
            }

            _launchGroundPosition = _transform.position;
            _launchHeight = height;
            _launchDuration = duration;
            _launchTimer = duration;
        }

        private void UpdateKnockback()
        {
            if (_knockbackTimer <= 0f)
            {
                return;
            }

            _knockbackTimer -= Time.deltaTime;

            if (_knockbackTargetPosition == _knockbackStartPosition)
            {
                return;
            }

            float progress = 1f - Mathf.Clamp01(_knockbackTimer / _knockbackDuration);
            _transform.position = Vector3.Lerp(_knockbackStartPosition, _knockbackTargetPosition, progress);
        }

        private void UpdateLaunch()
        {
            if (_launchTimer <= 0f)
            {
                return;
            }

            _launchTimer -= Time.deltaTime;

            float progress = 1f - Mathf.Clamp01(_launchTimer / _launchDuration);
            float heightOffset = Mathf.Sin(progress * Mathf.PI) * _launchHeight;

            Vector3 position = _launchGroundPosition;
            position.y += heightOffset;
            _transform.position = position;
        }

        private void UpdatePoison()
        {
            if (!_isPoisoned)
            {
                return;
            }

            _poisonDurationRemaining -= Time.deltaTime;
            _poisonTickTimer -= Time.deltaTime;

            if (_poisonTickTimer <= 0f)
            {
                _poisonTickTimer = _poisonTickInterval;
                TakeDamage(null, _poisonDamagePerTick);
            }

            if (_poisonDurationRemaining <= 0f)
            {
                _isPoisoned = false;
            }
        }

        private void Die()
        {
            if (_isDead)
            {
                return;
            }

            _isDead = true;
            _knockbackTimer = 0f;
            _launchTimer = 0f;
            _isPoisoned = false;

            Died?.Invoke();
        }
    }
}
```

- [ ] **Step 2: Tạo `MonsterProjectile.cs`**

```csharp
using System.Collections.Generic;
using UnityEngine;

namespace Playable
{
    /// <summary>
    /// Quả bom bay thẳng tới vị trí đối thủ lúc ném (không homing - nếu đối thủ né ra khỏi bán kính va
    /// chạm thì bay hụt, không gây damage). Pool theo prefab (mỗi loại quái có thể dùng model bom khác
    /// nhau) - không Instantiate/Destroy khi đang chơi sau lần đầu warm-up mỗi loại prefab.
    /// </summary>
    [DisallowMultipleComponent]
    public class MonsterProjectile : MonoBehaviour
    {
        private static readonly Dictionary<GameObject, List<MonsterProjectile>> _pools =
            new Dictionary<GameObject, List<MonsterProjectile>>();

        [SerializeField] private GameObject _explosionVfxPrefab;
        [SerializeField] private float _explosionVfxLifeTime = 1.5f;
        [SerializeField] private float _hitRadius = 0.4f;
        [SerializeField] private float _maxLifeTime = 4f;

        private Transform _transform;
        private GameObject _sourcePrefab;
        private Monster _owner;
        private Monster _target;
        private Vector3 _targetPosition;
        private Vector3 _direction;
        private float _speed;
        private float _damage;
        private float _knockbackForce;
        private float _knockbackDuration;
        private float _lifeTimer;
        private bool _isFlying;
        private GameObject _explosionVfxInstance;
        private ParticleSystem[] _explosionVfxParticles;
        private float _explosionHideTime;

        /// <summary>Ném 1 quả bom từ origin bay thẳng tới target. prefab phải có (hoặc sẽ được gắn thêm)
        /// component MonsterProjectile.</summary>
        public static void Spawn(
            GameObject prefab,
            Vector3 origin,
            Monster owner,
            Monster target,
            float damage,
            float speed,
            float knockbackForce,
            float knockbackDuration)
        {
            if (prefab == null || target == null)
            {
                return;
            }

            MonsterProjectile projectile = GetFromPool(prefab);
            projectile.Launch(origin, owner, target, damage, speed, knockbackForce, knockbackDuration);
        }

        private static MonsterProjectile GetFromPool(GameObject prefab)
        {
            if (!_pools.TryGetValue(prefab, out List<MonsterProjectile> pool))
            {
                pool = new List<MonsterProjectile>();
                _pools[prefab] = pool;
            }

            while (pool.Count > 0)
            {
                int lastIndex = pool.Count - 1;
                MonsterProjectile candidate = pool[lastIndex];
                pool.RemoveAt(lastIndex);

                if (candidate == null)
                {
                    continue;
                }

                candidate.gameObject.SetActive(true);
                return candidate;
            }

            GameObject instance = Instantiate(prefab);
            MonsterProjectile projectile = instance.GetComponent<MonsterProjectile>();

            if (projectile == null)
            {
                projectile = instance.AddComponent<MonsterProjectile>();
            }

            projectile._sourcePrefab = prefab;
            return projectile;
        }

        private void Awake()
        {
            _transform = transform;
        }

        private void Launch(
            Vector3 origin,
            Monster owner,
            Monster target,
            float damage,
            float speed,
            float knockbackForce,
            float knockbackDuration)
        {
            _transform.position = origin;
            _owner = owner;
            _target = target;
            _targetPosition = target.Position;
            _damage = damage;
            _speed = Mathf.Max(speed, 0.01f);
            _knockbackForce = knockbackForce;
            _knockbackDuration = knockbackDuration;
            _lifeTimer = _maxLifeTime;

            Vector3 toTarget = _targetPosition - origin;
            _direction = toTarget.sqrMagnitude > 0.0001f ? toTarget.normalized : Vector3.forward;
            _transform.rotation = Quaternion.LookRotation(_direction, Vector3.up);

            _isFlying = true;
        }

        private void Update()
        {
            if (_explosionHideTime > 0f && Time.time >= _explosionHideTime)
            {
                _explosionHideTime = 0f;

                if (_explosionVfxInstance != null)
                {
                    _explosionVfxInstance.SetActive(false);
                }
            }

            if (!_isFlying)
            {
                return;
            }

            _lifeTimer -= Time.deltaTime;

            if (_lifeTimer <= 0f)
            {
                Despawn();
                return;
            }

            Vector3 position = _transform.position;
            float step = _speed * Time.deltaTime;
            float remainingDistance = Vector3.Distance(position, _targetPosition);

            if (remainingDistance <= step)
            {
                Explode();
                return;
            }

            _transform.position = position + _direction * step;
        }

        private void Explode()
        {
            _isFlying = false;

            if (_target != null && !_target.IsDead)
            {
                float distanceSqr = (_target.Position - _transform.position).sqrMagnitude;

                if (distanceSqr <= _hitRadius * _hitRadius)
                {
                    _target.Health.TakeDamage(_owner, _damage);
                    _target.Health.ApplyCrowdControl(_transform.position, _knockbackForce, _knockbackDuration);
                }
            }

            PlayExplosionVfx();
            Despawn();
        }

        private void PlayExplosionVfx()
        {
            if (_explosionVfxPrefab == null)
            {
                return;
            }

            if (_explosionVfxInstance == null)
            {
                _explosionVfxInstance = Instantiate(_explosionVfxPrefab, _transform.position, Quaternion.identity);
                _explosionVfxParticles = _explosionVfxInstance.GetComponentsInChildren<ParticleSystem>(true);
            }
            else
            {
                _explosionVfxInstance.transform.position = _transform.position;
                _explosionVfxInstance.SetActive(true);
            }

            for (int i = 0; i < _explosionVfxParticles.Length; i++)
            {
                _explosionVfxParticles[i].Clear();
                _explosionVfxParticles[i].Play();
            }

            _explosionHideTime = Time.time + _explosionVfxLifeTime;
        }

        private void Despawn()
        {
            _isFlying = false;
            _owner = null;
            _target = null;
            gameObject.SetActive(false);

            if (_sourcePrefab == null)
            {
                return;
            }

            if (!_pools.TryGetValue(_sourcePrefab, out List<MonsterProjectile> pool))
            {
                pool = new List<MonsterProjectile>();
                _pools[_sourcePrefab] = pool;
            }

            pool.Add(this);
        }
    }
}
```

- [ ] **Step 3: Tạo `MonsterCombat.cs`**

```csharp
using System.Collections.Generic;
using UnityEngine;

namespace Playable
{
    /// <summary>
    /// Target selection (ưu tiên khác loại > cùng loại, không đổi target tới khi chết, trả đũa khi rảnh),
    /// đánh cận chiến, và ném bom tầm xa khi đối thủ ngoài AttackRange nhưng trong BombRange.
    /// </summary>
    [DisallowMultipleComponent]
    [RequireComponent(typeof(MonsterHealth))]
    public class MonsterCombat : MonoBehaviour
    {
        private const string Tag = "MONSTER COMBAT";

        private static readonly List<MonsterCombat> _activeCombats = new List<MonsterCombat>();

        [Header("Animator - Melee Attack")]
        [Tooltip("Tên param tấn công trong Animator. Asset hiện không đồng nhất giữa các prefab quái - " +
                 "Spider dùng Bool \"IsAttack\", Zombie/Golem dùng Trigger \"Attack\" - chỉnh đúng theo prefab.")]
        [SerializeField]
        private string _attackTriggerParam = "IsAttack";

        [SerializeField] private bool _attackParamIsTrigger = false;

        [Header("Animator - Bomb Throw (optional)")]
        [SerializeField] private string _throwBombTriggerParam = "";
        [SerializeField] private bool _throwBombParamIsTrigger = true;

        [Header("Bomb Visual (optional)")]
        [Tooltip("Prefab quả bom (phải có/tự động được gắn component MonsterProjectile). Để trống = quái " +
                 "này không ném bom, chỉ đánh cận chiến.")]
        [SerializeField]
        private GameObject _bombProjectilePrefab;

        [Tooltip("Đuổi cùng 1 địch quá lâu mà chưa vào được AttackRange (thường do collider 2 con chạm " +
                 "nhau chặn vật lý) thì ép dừng lại đánh luôn, không đứng chạy tại chỗ vô thời hạn.")]
        [SerializeField]
        private float _maxChaseDuration = 2.5f;

        private Monster _monster;
        private MonsterHealth _health;
        private Transform _transform;

        private MonsterType _type;
        private float _attackDamage;
        private float _attackRange;
        private float _attackCooldown;
        private float _bombDamage;
        private float _bombRange;
        private float _bombCooldown;
        private float _bombSpeed;
        private float _bombKnockbackForce;
        private float _knockbackForce;
        private float _knockbackDuration;

        private int _attackParamHash;
        private int _throwBombParamHash;
        private bool _resetAttackBool;

        private Monster _currentEnemy;
        private Monster _pendingRetaliationTarget;
        private float _attackTimer;
        private float _bombTimer;
        private bool _isAttacking;
        private bool _isThrowingBomb;
        private float _chaseStartTime;

        public Monster CurrentEnemy => _currentEnemy;

        private void Awake()
        {
            _monster = GetComponent<Monster>();
            _health = GetComponent<MonsterHealth>();
            _transform = transform;

            _attackParamHash = Animator.StringToHash(_attackTriggerParam);
            _throwBombParamHash = Animator.StringToHash(_throwBombTriggerParam);

            _health.Damaged += OnDamaged;
        }

        private void OnDestroy()
        {
            _health.Damaged -= OnDamaged;
            _activeCombats.Remove(this);
        }

        public void Init(MonsterStatsEntry stats)
        {
            _type = stats.Type;
            _attackDamage = stats.AttackDamage;
            _attackRange = stats.AttackRange;
            _attackCooldown = stats.AttackCooldown;
            _bombDamage = stats.BombDamage;
            _bombRange = Mathf.Max(stats.BombRange, stats.AttackRange);
            _bombCooldown = stats.BombCooldown;
            _bombSpeed = stats.BombSpeed;
            _bombKnockbackForce = stats.BombKnockbackForce;
            _knockbackForce = stats.KnockbackForce;
            _knockbackDuration = stats.KnockbackDuration;

            _currentEnemy = null;
            _pendingRetaliationTarget = null;
            _attackTimer = 0f;
            _bombTimer = 0f;
            _isAttacking = false;
            _isThrowingBomb = false;
            _resetAttackBool = false;

            if (!_activeCombats.Contains(this))
            {
                _activeCombats.Add(this);
            }
        }

        /// <summary>Gọi từ Monster.Despawn()/OnDestroy()/lúc chết - gỡ khỏi registry target-scan, reset
        /// state để lần Spawn() tiếp theo (pooled) không dính target cũ.</summary>
        public void OnRemovedFromPlay()
        {
            _activeCombats.Remove(this);
            _currentEnemy = null;
            _pendingRetaliationTarget = null;
            _isAttacking = false;
            _isThrowingBomb = false;
        }

        /// <summary>Cộng thêm damage cận chiến vĩnh viễn trong trận (dùng bởi Shinsonic lúc biến hình).</summary>
        public void AddAttackDamageBonus(float amount)
        {
            _attackDamage += amount;
        }

        private void OnDamaged(Monster attacker, float amount)
        {
            if (attacker == null || attacker.IsDead || _currentEnemy != null)
            {
                return;
            }

            _pendingRetaliationTarget = attacker;
        }

        /// <summary>Gọi mỗi frame từ Monster.Update() khi quái đã spawn, chưa chết và không skill nào đang
        /// channel. Trả về true nếu đang có target (đang chase/melee/bomb) - Monster không wander nữa.</summary>
        public bool TryUpdateCombat()
        {
            if (_resetAttackBool)
            {
                _resetAttackBool = false;
                _monster.SetAnimatorBool(_attackParamHash, _attackTriggerParam, false);
            }

            if (_health.IsStaggered)
            {
                return _currentEnemy != null;
            }

            if (!TryAcquireTarget())
            {
                _isAttacking = false;
                _isThrowingBomb = false;
                return false;
            }

            float distanceSqr = FlatDistanceSqr(_transform.position, _currentEnemy.Position);

            if (distanceSqr <= _attackRange * _attackRange)
            {
                _isThrowingBomb = false;
                UpdateMeleeAttack();
            }
            else if (_bombProjectilePrefab != null && distanceSqr <= _bombRange * _bombRange)
            {
                _isAttacking = false;
                UpdateBombStance();
            }
            else
            {
                _isAttacking = false;
                _isThrowingBomb = false;
                UpdateChaseTarget();
            }

            return true;
        }

        private bool TryAcquireTarget()
        {
            if (_currentEnemy != null && !_currentEnemy.IsDead)
            {
                return true;
            }

            Monster previous = _currentEnemy;
            _currentEnemy = null;

            if (_pendingRetaliationTarget != null && !_pendingRetaliationTarget.IsDead)
            {
                _currentEnemy = _pendingRetaliationTarget;
            }

            _pendingRetaliationTarget = null;

            if (_currentEnemy == null)
            {
                _currentEnemy = FindPriorityTarget();
            }

            if (_currentEnemy != null && _currentEnemy != previous)
            {
                _chaseStartTime = Time.time;
            }

            return _currentEnemy != null;
        }

        private Monster FindPriorityTarget()
        {
            Monster nearestDifferentType = null;
            float nearestDifferentTypeSqr = float.MaxValue;
            Monster nearestSameType = null;
            float nearestSameTypeSqr = float.MaxValue;

            Vector3 position = _transform.position;

            for (int i = 0; i < _activeCombats.Count; i++)
            {
                MonsterCombat other = _activeCombats[i];

                if (other == this || other == null || other._health.IsDead)
                {
                    continue;
                }

                float distanceSqr = FlatDistanceSqr(position, other._transform.position);

                if (other._type != _type)
                {
                    if (distanceSqr < nearestDifferentTypeSqr)
                    {
                        nearestDifferentTypeSqr = distanceSqr;
                        nearestDifferentType = other._monster;
                    }
                }
                else if (distanceSqr < nearestSameTypeSqr)
                {
                    nearestSameTypeSqr = distanceSqr;
                    nearestSameType = other._monster;
                }
            }

            return nearestDifferentType != null ? nearestDifferentType : nearestSameType;
        }

        private void UpdateChaseTarget()
        {
            if (Time.time - _chaseStartTime >= _maxChaseDuration)
            {
                if (MonsterDebug.VerboseLoggingEnabled)
                {
                    MonsterDebug.Log(Tag, name + " đuổi " + _currentEnemy.name + " quá " + _maxChaseDuration +
                        "s chưa vào tầm đánh - ép tấn công.");
                }

                UpdateMeleeAttack();
                return;
            }

            _monster.ChaseTowards(_currentEnemy.Position);
        }

        private void UpdateMeleeAttack()
        {
            _monster.FaceTowards(_currentEnemy.Position);
            _monster.SetRunning(false);

            if (!_isAttacking)
            {
                _isAttacking = true;
                _attackTimer = 0f;
            }

            _attackTimer -= Time.deltaTime;

            if (_attackTimer > 0f)
            {
                return;
            }

            _attackTimer = _attackCooldown;
            PlayAttackAnim();
            _currentEnemy.Health.TakeDamage(_monster, _attackDamage);
            _currentEnemy.Health.ApplyCrowdControl(_transform.position, _knockbackForce, _knockbackDuration);
        }

        private void UpdateBombStance()
        {
            _monster.FaceTowards(_currentEnemy.Position);
            _monster.SetRunning(false);

            if (!_isThrowingBomb)
            {
                _isThrowingBomb = true;
                _bombTimer = 0f;
            }

            _bombTimer -= Time.deltaTime;

            if (_bombTimer > 0f)
            {
                return;
            }

            _bombTimer = _bombCooldown;
            PlayThrowBombAnim();

            MonsterProjectile.Spawn(
                _bombProjectilePrefab,
                _transform.position,
                _monster,
                _currentEnemy,
                _bombDamage,
                _bombSpeed,
                _bombKnockbackForce,
                _knockbackDuration);
        }

        private void PlayAttackAnim()
        {
            if (!_monster.HasAnimator)
            {
                return;
            }

            if (_attackParamIsTrigger)
            {
                _monster.PlayAnimatorTrigger(_attackParamHash, _attackTriggerParam);
            }
            else
            {
                _monster.SetAnimatorBool(_attackParamHash, _attackTriggerParam, true);
                _resetAttackBool = true;
            }
        }

        private void PlayThrowBombAnim()
        {
            if (!_monster.HasAnimator || string.IsNullOrEmpty(_throwBombTriggerParam))
            {
                return;
            }

            if (_throwBombParamIsTrigger)
            {
                _monster.PlayAnimatorTrigger(_throwBombParamHash, _throwBombTriggerParam);
            }
            else
            {
                _monster.SetAnimatorBool(_throwBombParamHash, _throwBombTriggerParam, true);
            }
        }

        private static float FlatDistanceSqr(Vector3 a, Vector3 b)
        {
            float dx = a.x - b.x;
            float dz = a.z - b.z;
            return dx * dx + dz * dz;
        }
    }
}
```

- [ ] **Step 4: Viết lại toàn bộ `Monster.cs`**

Đọc file hiện tại (`Assets/_Playable_/Scripts/Monster.cs`) trước để đối chiếu, sau đó ghi đè toàn bộ nội dung
bằng:

```csharp
using DG.Tweening;
using UnityEngine;

namespace Playable
{
    [DisallowMultipleComponent]
    public class Monster : MonoBehaviour
    {
        [Header("References")] [SerializeField]
        private Animator _animator;

        [Header("Type & Data")]
        [Tooltip("Loại quái - dùng để tra MonsterStatsTable và tự gắn đúng skill component lúc Awake.")]
        [SerializeField]
        private MonsterType _monsterType;

        [Tooltip("Bảng số liệu chung (HP, damage, tốc độ, skill...) cho cả 5 loại quái.")] [SerializeField]
        private MonsterStatsTable _statsTable;

        [Header("Animation")] [SerializeField] private string _isRunParam = "IsRun";

        [Tooltip("Tên param chết trong Animator. Spider dùng Bool \"IsDeath\", Zombie dùng Trigger \"Dead\".")]
        [SerializeField]
        private string _isDeathParam = "IsDeath";

        [SerializeField] private bool _deathParamIsTrigger = false;

        [Tooltip("Phát anim death xong đợi ngần này rồi Destroy hẳn khỏi map")] [SerializeField]
        private float _deathDespawnDelay = 1.5f;

        [Header("Wander")] [SerializeField] private float _moveSpeed = 1.5f;
        [SerializeField] private float _rotationSmooth = 8f;
        [SerializeField] private float _wanderRadius = 3f;
        [SerializeField] private Vector2 _idleDurationRange = new Vector2(0.8f, 2.5f);
        [SerializeField] private float _arriveDistance = 0.2f;
        [SerializeField] private float _moveTimeout = 6f;
        [SerializeField] private int _maxSamplePerTarget = 8;

        [Header("Ground")] [SerializeField] private LayerMask _groundMask = ~0;
        [SerializeField] private float _groundRayHeight = 5f;
        [SerializeField] private float _groundRayLength = 20f;

        [Tooltip("Bật: raycast mỗi frame khi đi (địa hình dốc). Tắt: nội suy độ cao 2 đầu quãng đường - nhẹ hơn nhiều")]
        [SerializeField]
        private bool _raycastWhileMoving = false;

        [Header("Spawn")] [SerializeField] private float _spawnScaleDuration = 0.35f;
        [SerializeField] private Ease _spawnScaleEase = Ease.OutBack;

        [Header("Spawn VFX")] [SerializeField] private GameObject _spawnVfxPrefab;
        [SerializeField] private Vector3 _spawnVfxOffset = Vector3.zero;
        [SerializeField] private float _spawnVfxLifeTime = 2f;
        [SerializeField] private bool _spawnVfxFollowMonster = false;

        [Tooltip("Chỉ bật khi prefab VFX tắt Play On Awake - tốn thêm 1 lần quét component")] [SerializeField]
        private bool _restartParticlesOnSpawn = false;

        private Transform _transform;
        private Vector3 _homePosition;
        private Vector3 _targetPosition;
        private Vector3 _baseScale;
        private float _arriveDistanceSqr;
        private float _moveStartHeight;
        private float _moveFlatDistance;
        private float _idleTimer;
        private float _moveTimer;
        private bool _isMoving;
        private bool _isSpawned;
        private bool _hasAnimator;
        private bool _isRunApplied;
        private int _isRunParamHash;
        private int _isDeathParamHash;
        private Tween _spawnTween;
        private GameObject _spawnVfxInstance;
        private ParticleSystem[] _spawnVfxParticles;
        private float _spawnVfxHideTime;

        private MonsterHealth _health;
        private MonsterCombat _combat;
        private IMonsterSkill[] _skills = new IMonsterSkill[0];

        private float _deathDestroyTime;
        private int _stateBeforeDeathHash;
        private bool _deathAnimationStarted;

        public bool IsMoving => _isMoving;
        public bool IsDead => _health != null && _health.IsDead;
        public bool IsAnySkillChanneling { get; private set; }

        public MonsterHealth Health => _health;
        public MonsterCombat Combat => _combat;
        public Vector3 Position => _transform.position;

        private void Awake()
        {
            _transform = transform;

            if (_animator == null)
            {
                _animator = GetComponentInChildren<Animator>();
            }

            _hasAnimator = _animator != null;

            if (_hasAnimator)
            {
                _isRunParamHash = Animator.StringToHash(_isRunParam);
                _isDeathParamHash = Animator.StringToHash(_isDeathParam);
            }

            _baseScale = _transform.localScale;
            _arriveDistanceSqr = _arriveDistance * _arriveDistance;

            _health = GetComponent<MonsterHealth>();
            if (_health == null)
            {
                _health = gameObject.AddComponent<MonsterHealth>();
            }

            _combat = GetComponent<MonsterCombat>();
            if (_combat == null)
            {
                _combat = gameObject.AddComponent<MonsterCombat>();
            }

            _skills = GetComponents<IMonsterSkill>();

            _health.Died += OnHealthDied;
        }

        private void Update()
        {
            if (_spawnVfxHideTime > 0f && Time.time >= _spawnVfxHideTime)
            {
                _spawnVfxHideTime = 0f;

                if (_spawnVfxInstance != null)
                {
                    _spawnVfxInstance.SetActive(false);
                }
            }

            if (_health.IsDead)
            {
                UpdateDeath();
                return;
            }

            if (!_isSpawned)
            {
                return;
            }

            Monster currentEnemy = _combat.CurrentEnemy;
            bool anyChanneling = false;

            for (int i = 0; i < _skills.Length; i++)
            {
                _skills[i].Tick(currentEnemy);
                anyChanneling = anyChanneling || _skills[i].IsChanneling;
            }

            IsAnySkillChanneling = anyChanneling;

            if (IsAnySkillChanneling)
            {
                return;
            }

            if (_combat.TryUpdateCombat())
            {
                return;
            }

            if (_isMoving)
            {
                UpdateMove();
            }
            else
            {
                UpdateIdle();
            }
        }

        private void OnDestroy()
        {
            _spawnTween?.Kill();

            if (_health != null)
            {
                _health.Died -= OnHealthDied;
            }

            if (_combat != null)
            {
                _combat.OnRemovedFromPlay();
            }

            if (_spawnVfxInstance != null && !_spawnVfxFollowMonster)
            {
                Destroy(_spawnVfxInstance);
            }
        }

        /// <summary>
        /// Đặt quái xuống map tại vị trí world tương ứng với điểm player tap trên màn hình.
        /// </summary>
        public void Spawn(Vector3 worldPosition, float wanderRadiusOverride = -1f)
        {
            if (wanderRadiusOverride > 0f)
            {
                _wanderRadius = wanderRadiusOverride;
            }

            _transform.position = SnapToGround(worldPosition);
            _transform.rotation = Quaternion.Euler(0f, Random.Range(0f, 360f), 0f);

            _homePosition = _transform.position;
            _isSpawned = true;

            MonsterStatsEntry stats = _statsTable != null
                ? _statsTable.GetEntry(_monsterType)
                : new MonsterStatsEntry();

            _moveSpeed = stats.MoveSpeed;

            _health.Init(stats.MaxHealth);
            _combat.Init(stats);

            for (int i = 0; i < _skills.Length; i++)
            {
                _skills[i].Init(this, stats);
            }

            IsAnySkillChanneling = false;

            // EnterIdle();
            // PlaySpawnScale();
            // PlaySpawnVfx();
        }

        /// <summary>
        /// Tắt quái để trả về pool. GameController giữ lại instance thay vì Destroy.
        /// </summary>
        public void Despawn()
        {
            _isSpawned = false;
            _isMoving = false;
            _spawnTween?.Kill();
            _transform.localScale = _baseScale;

            _combat.OnRemovedFromPlay();

            if (_spawnVfxInstance != null)
            {
                _spawnVfxHideTime = 0f;
                _spawnVfxInstance.SetActive(false);
            }

            gameObject.SetActive(false);
        }

        private void PlaySpawnScale()
        {
            if (_spawnScaleDuration <= 0f)
            {
                return;
            }

            _spawnTween?.Kill();
            _transform.localScale = Vector3.zero;
            _spawnTween = _transform
                .DOScale(_baseScale, _spawnScaleDuration)
                .SetEase(_spawnScaleEase);
        }

        /// <summary>
        /// Bật VFX spawn ngay dưới chân quái (vị trí chân = điểm đã snap xuống ground).
        /// Instance được tạo 1 lần rồi tái sử dụng, không Instantiate/Destroy mỗi lần spawn.
        /// </summary>
        private void PlaySpawnVfx()
        {
            if (_spawnVfxPrefab == null)
            {
                return;
            }

            if (_spawnVfxInstance == null)
            {
                _spawnVfxInstance = Instantiate(
                    _spawnVfxPrefab,
                    _transform.position + _spawnVfxOffset,
                    Quaternion.identity,
                    _spawnVfxFollowMonster ? _transform : null);

                if (_restartParticlesOnSpawn)
                {
                    _spawnVfxParticles = _spawnVfxInstance.GetComponentsInChildren<ParticleSystem>(true);
                }
            }
            else
            {
                _spawnVfxInstance.SetActive(false);
                _spawnVfxInstance.transform.position = _transform.position + _spawnVfxOffset;
            }

            _spawnVfxInstance.SetActive(true);

            if (_spawnVfxParticles != null)
            {
                for (int i = 0; i < _spawnVfxParticles.Length; i++)
                {
                    _spawnVfxParticles[i].Play();
                }
            }

            _spawnVfxHideTime = _spawnVfxLifeTime > 0f ? Time.time + _spawnVfxLifeTime : 0f;
        }

        private void EnterIdle()
        {
            SetRunning(false);
            _idleTimer = Random.Range(_idleDurationRange.x, _idleDurationRange.y);
        }

        private void UpdateIdle()
        {
            _idleTimer -= Time.deltaTime;

            if (_idleTimer > 0f)
            {
                return;
            }

            if (!TryPickWanderTarget(out _targetPosition))
            {
                EnterIdle();
                return;
            }

            Vector3 position = _transform.position;
            Vector3 flatDelta = _targetPosition - position;
            flatDelta.y = 0f;

            _moveStartHeight = position.y;
            _moveFlatDistance = flatDelta.magnitude;
            _moveTimer = _moveTimeout;

            SetRunning(true);
        }

        private void UpdateMove()
        {
            float deltaTime = Time.deltaTime;
            _moveTimer -= deltaTime;

            Vector3 position = _transform.position;
            Vector3 toTarget = _targetPosition - position;
            toTarget.y = 0f;

            float flatDistanceSqr = toTarget.sqrMagnitude;

            if (flatDistanceSqr <= _arriveDistanceSqr || _moveTimer <= 0f)
            {
                EnterIdle();
                return;
            }

            float flatDistance = Mathf.Sqrt(flatDistanceSqr);
            Vector3 direction = toTarget / flatDistance;
            float step = _moveSpeed * deltaTime;

            RotateTowards(direction);

            Vector3 nextPosition = position + direction * step;

            if (_raycastWhileMoving)
            {
                nextPosition = SnapToGround(nextPosition);
            }
            else if (_moveFlatDistance > 0.0001f)
            {
                float progress = 1f - Mathf.Max(flatDistance - step, 0f) / _moveFlatDistance;
                nextPosition.y = Mathf.Lerp(_moveStartHeight, _targetPosition.y, progress);
            }

            _transform.position = nextPosition;
        }

        private void RotateTowards(Vector3 direction)
        {
            Quaternion targetRotation = Quaternion.LookRotation(direction, Vector3.up);

            _transform.rotation = Quaternion.Slerp(
                _transform.rotation,
                targetRotation,
                Time.deltaTime * _rotationSmooth);
        }

        private bool TryPickWanderTarget(out Vector3 target)
        {
            Vector3 position = _transform.position;

            for (int i = 0; i < _maxSamplePerTarget; i++)
            {
                Vector2 offset = Random.insideUnitCircle * _wanderRadius;
                Vector3 candidate = _homePosition + new Vector3(offset.x, 0f, offset.y);

                if (!TryGetGroundPoint(candidate, out Vector3 groundPoint))
                {
                    continue;
                }

                float flatX = groundPoint.x - position.x;
                float flatZ = groundPoint.z - position.z;

                if (flatX * flatX + flatZ * flatZ < _arriveDistanceSqr)
                {
                    continue;
                }

                target = groundPoint;
                return true;
            }

            target = position;
            return false;
        }

        private Vector3 SnapToGround(Vector3 position)
        {
            return TryGetGroundPoint(position, out Vector3 groundPoint)
                ? groundPoint
                : position;
        }

        private bool TryGetGroundPoint(Vector3 position, out Vector3 groundPoint)
        {
            Vector3 origin = position;
            origin.y += _groundRayHeight;

            if (Physics.Raycast(
                    origin,
                    Vector3.down,
                    out RaycastHit hit,
                    _groundRayLength,
                    _groundMask,
                    QueryTriggerInteraction.Ignore))
            {
                groundPoint = hit.point;
                return true;
            }

            groundPoint = position;
            return false;
        }

        internal void SetRunning(bool isRunning)
        {
            _isMoving = isRunning;

            if (!_hasAnimator || _isRunApplied == isRunning)
            {
                return;
            }

            SetAnimatorBool(_isRunParamHash, _isRunParam, isRunning);
            _isRunApplied = isRunning;
        }

        #region Combat helpers (dùng bởi MonsterCombat / MonsterHealth / IMonsterSkill)

        /// <summary>1 bước di chuyển thẳng tới targetPosition, bám đất, xoay hướng - dùng khi đang chase.</summary>
        internal void ChaseTowards(Vector3 targetPosition)
        {
            SetRunning(true);

            Vector3 position = _transform.position;
            Vector3 toTarget = targetPosition - position;
            toTarget.y = 0f;

            float distance = toTarget.magnitude;

            if (distance <= 0.0001f)
            {
                return;
            }

            Vector3 direction = toTarget / distance;
            RotateTowards(direction);

            Vector3 nextPosition = position + direction * (_moveSpeed * Time.deltaTime);
            _transform.position = SnapToGround(nextPosition);
        }

        /// <summary>Chỉ xoay mặt về hướng targetPosition, không di chuyển - dùng lúc đứng đánh/ném bom.</summary>
        internal void FaceTowards(Vector3 targetPosition)
        {
            Vector3 toTarget = targetPosition - _transform.position;
            toTarget.y = 0f;

            if (toTarget.sqrMagnitude > 0.0001f)
            {
                RotateTowards(toTarget.normalized);
            }
        }

        /// <summary>Dịch chuyển tức thời tới worldPosition (bám đất) - dùng cho skill teleport Enderman.</summary>
        internal void TeleportTo(Vector3 worldPosition, bool faceDirectionOfTravel)
        {
            Vector3 grounded = SnapToGround(worldPosition);

            if (faceDirectionOfTravel)
            {
                Vector3 direction = grounded - _transform.position;
                direction.y = 0f;

                if (direction.sqrMagnitude > 0.0001f)
                {
                    _transform.rotation = Quaternion.LookRotation(direction, Vector3.up);
                }
            }

            _transform.position = grounded;
        }

        internal bool HasAnimator => _hasAnimator;

        /// <summary>
        /// [COMBAT DEBUG] Bọc try/catch quanh SetTrigger - nếu Inspector cấu hình sai kiểu param (vd để
        /// IsTrigger = true nhưng param thật trong Animator Controller lại là Bool), Unity ném
        /// AnimatorControllerParameterException. Dùng chung cho mọi component (Health/Combat/Skill) để
        /// không lặp lại logic cache-hash + try/catch ở từng file.
        /// </summary>
        internal void PlayAnimatorTrigger(int paramHash, string paramName)
        {
            if (!_hasAnimator)
            {
                return;
            }

            try
            {
                _animator.SetTrigger(paramHash);
            }
            catch (System.Exception e)
            {
                Debug.LogError(
                    "[MONSTER COMBAT] " + name + ": SetTrigger(\"" + paramName + "\") lỗi - param này trong " +
                    "Animator Controller thật có thể là Bool chứ không phải Trigger. Chi tiết: " + e.Message);
            }
        }

        internal void SetAnimatorBool(int paramHash, string paramName, bool value)
        {
            if (!_hasAnimator)
            {
                return;
            }

            try
            {
                _animator.SetBool(paramHash, value);
            }
            catch (System.Exception e)
            {
                Debug.LogError(
                    "[MONSTER COMBAT] " + name + ": SetBool(\"" + paramName + "\") lỗi - param này trong " +
                    "Animator Controller thật có thể là Trigger chứ không phải Bool. Chi tiết: " + e.Message);
            }
        }

        #endregion

        #region Death

        private void OnHealthDied()
        {
            _isMoving = false;
            _combat.OnRemovedFromPlay();

            if (_hasAnimator)
            {
                _stateBeforeDeathHash = _animator.GetCurrentAnimatorStateInfo(0).fullPathHash;
                _deathAnimationStarted = false;

                if (_deathParamIsTrigger) PlayAnimatorTrigger(_isDeathParamHash, _isDeathParam);
                else SetAnimatorBool(_isDeathParamHash, _isDeathParam, true);
            }

            _deathDestroyTime = Time.time + _deathDespawnDelay;
        }

        private void UpdateDeath()
        {
            if (Time.time >= _deathDestroyTime)
            {
                DeactivateAfterDeath();
                return;
            }

            if (!_hasAnimator)
            {
                return;
            }

            AnimatorStateInfo stateInfo = _animator.GetCurrentAnimatorStateInfo(0);

            if (!_deathAnimationStarted)
            {
                if (_animator.IsInTransition(0) || stateInfo.fullPathHash == _stateBeforeDeathHash)
                {
                    return;
                }

                _deathAnimationStarted = true;
            }

            if (!_animator.IsInTransition(0) && stateInfo.normalizedTime >= 1f)
            {
                DeactivateAfterDeath();
            }
        }

        private void DeactivateAfterDeath()
        {
            _isSpawned = false;
            _isMoving = false;
            gameObject.SetActive(false);
        }

        #endregion

#if UNITY_EDITOR
        private void OnValidate()
        {
            _arriveDistanceSqr = _arriveDistance * _arriveDistance;
        }

        private void OnDrawGizmosSelected()
        {
            Gizmos.color = new Color(1f, 0.5f, 0f, 0.35f);
            Vector3 center = Application.isPlaying ? _homePosition : transform.position;
            Gizmos.DrawWireSphere(center, _wanderRadius);
        }
#endif
    }
}
```

- [ ] **Step 5: Thêm 3 file mới vào `Assembly-CSharp.csproj`**

Thêm ngay sau dòng `<Compile Include="Assets\_Playable_\Scripts\Combat\IMonsterSkill.cs" />` (thêm ở Task 1):

```xml
    <Compile Include="Assets\_Playable_\Scripts\Combat\MonsterHealth.cs" />
    <Compile Include="Assets\_Playable_\Scripts\Combat\MonsterProjectile.cs" />
    <Compile Include="Assets\_Playable_\Scripts\Combat\MonsterCombat.cs" />
```

- [ ] **Step 6: Build-check**

Run: `dotnet build Assembly-CSharp.csproj -v:q`
Expected: `0 Error(s)`

- [ ] **Step 7: Commit**

```bash
git add Assets/_Playable_/Scripts/Combat/MonsterHealth.cs Assets/_Playable_/Scripts/Combat/MonsterProjectile.cs Assets/_Playable_/Scripts/Combat/MonsterCombat.cs Assets/_Playable_/Scripts/Monster.cs
git commit -m "feat: monster combat core (health/CC/poison, target priority, melee, bomb projectile)"
```

---

## Task 3: `EndermanArmReachSkill`

**Files:**
- Create: `Assets/_Playable_/Scripts/Combat/Skills/EndermanArmReachSkill.cs`
- Modify: `Assembly-CSharp.csproj`

**Interfaces:**
- Consumes: `Monster` (`Position`, `HasAnimator`, `FaceTowards`, `PlayAnimatorTrigger`, `IsAnySkillChanneling`,
  `Health`), `MonsterHealth.TakeDamage`/`ApplyCrowdControl`, `MonsterStatsEntry` (`ArmReachCooldown`,
  `ArmReachDamage`, `ArmReachDuration`, `ArmReachRange`, `ArmReachStunDuration`), `IMonsterSkill` (Task 1).
- Produces: `class EndermanArmReachSkill : MonoBehaviour, IMonsterSkill` - vươn tay VFX ~2s, giữa thời lượng
  gây damage + đứng yên (stun) nếu target còn trong tầm.

- [ ] **Step 1: Tạo `EndermanArmReachSkill.cs`**

```csharp
using UnityEngine;

namespace Playable
{
    /// <summary>
    /// Enderman vươn tay dài ra phía trước trong ArmReachDuration giây (VFX). Giữa thời lượng (tay duỗi
    /// hết cỡ), nếu target còn trong ArmReachRange thì gây ArmReachDamage + đứng yên (stun) đúng
    /// ArmReachStunDuration giây.
    /// </summary>
    [DisallowMultipleComponent]
    public class EndermanArmReachSkill : MonoBehaviour, IMonsterSkill
    {
        [Header("Animator (optional)")]
        [SerializeField] private string _armReachTriggerParam = "";

        [Header("VFX (optional)")]
        [SerializeField] private GameObject _armVfxPrefab;
        [SerializeField] private Vector3 _armVfxOffset = Vector3.zero;

        private Monster _self;
        private MonsterStatsEntry _stats;
        private int _armReachTriggerHash;

        private float _cooldownTimer;
        private bool _isChanneling;
        private float _channelTimer;
        private bool _hasAppliedHit;
        private GameObject _armVfxInstance;
        private Monster _channelTarget;

        public bool IsChanneling => _isChanneling;

        private void Awake()
        {
            _armReachTriggerHash = Animator.StringToHash(_armReachTriggerParam);
        }

        public void Init(Monster self, MonsterStatsEntry stats)
        {
            _self = self;
            _stats = stats;
            _cooldownTimer = stats.ArmReachCooldown;
            _isChanneling = false;
        }

        public void Tick(Monster target)
        {
            if (_isChanneling)
            {
                UpdateChannel();
                return;
            }

            _cooldownTimer -= Time.deltaTime;

            if (_cooldownTimer > 0f || target == null || target.IsDead || _self.IsAnySkillChanneling)
            {
                return;
            }

            float distanceSqr = (target.Position - _self.Position).sqrMagnitude;

            if (distanceSqr > _stats.ArmReachRange * _stats.ArmReachRange)
            {
                return;
            }

            StartChannel(target);
        }

        private void StartChannel(Monster target)
        {
            _isChanneling = true;
            _channelTimer = _stats.ArmReachDuration;
            _hasAppliedHit = false;
            _channelTarget = target;

            _self.FaceTowards(target.Position);

            if (!string.IsNullOrEmpty(_armReachTriggerParam) && _self.HasAnimator)
            {
                _self.PlayAnimatorTrigger(_armReachTriggerHash, _armReachTriggerParam);
            }

            if (_armVfxPrefab == null)
            {
                return;
            }

            if (_armVfxInstance == null)
            {
                _armVfxInstance = Instantiate(
                    _armVfxPrefab, _self.Position + _armVfxOffset, _self.transform.rotation, _self.transform);
            }
            else
            {
                _armVfxInstance.transform.localPosition = _armVfxOffset;
                _armVfxInstance.SetActive(true);
            }
        }

        private void UpdateChannel()
        {
            _channelTimer -= Time.deltaTime;

            float halfDuration = _stats.ArmReachDuration * 0.5f;

            if (!_hasAppliedHit && _channelTimer <= halfDuration)
            {
                _hasAppliedHit = true;
                ApplyHit();
            }

            if (_channelTimer > 0f)
            {
                return;
            }

            _isChanneling = false;
            _cooldownTimer = _stats.ArmReachCooldown;

            if (_armVfxInstance != null)
            {
                _armVfxInstance.SetActive(false);
            }
        }

        private void ApplyHit()
        {
            if (_channelTarget == null || _channelTarget.IsDead)
            {
                return;
            }

            float distanceSqr = (_channelTarget.Position - _self.Position).sqrMagnitude;

            if (distanceSqr > _stats.ArmReachRange * _stats.ArmReachRange)
            {
                return;
            }

            _channelTarget.Health.TakeDamage(_self, _stats.ArmReachDamage);
            _channelTarget.Health.ApplyCrowdControl(_self.Position, 0f, _stats.ArmReachStunDuration);
        }
    }
}
```

- [ ] **Step 2: Thêm vào `Assembly-CSharp.csproj`**

Thêm ngay sau dòng `<Compile Include="Assets\_Playable_\Scripts\Combat\MonsterCombat.cs" />`:

```xml
    <Compile Include="Assets\_Playable_\Scripts\Combat\Skills\EndermanArmReachSkill.cs" />
```

- [ ] **Step 3: Build-check**

Run: `dotnet build Assembly-CSharp.csproj -v:q`
Expected: `0 Error(s)`

- [ ] **Step 4: Commit**

```bash
git add Assets/_Playable_/Scripts/Combat/Skills/EndermanArmReachSkill.cs
git commit -m "feat: Enderman arm-reach skill (stun + damage)"
```

---

## Task 4: `EndermanTeleportSkill`

**Files:**
- Create: `Assets/_Playable_/Scripts/Combat/Skills/EndermanTeleportSkill.cs`
- Modify: `Assembly-CSharp.csproj`

**Interfaces:**
- Consumes: `Monster` (`Position`, `HasAnimator`, `FaceTowards`, `TeleportTo`, `PlayAnimatorTrigger`,
  `IsAnySkillChanneling`, `Health`), `MonsterHealth.TakeDamage`, `MonsterStatsEntry` (`TeleportCooldown`,
  `TeleportRadius`, `TeleportStepDelay`, `TeleportFinalAttackDamage`, `AttackRange`), `IMonsterSkill` (Task 1).
- Produces: `class EndermanTeleportSkill : MonoBehaviour, IMonsterSkill` - dịch chuyển 2 lần ngẫu nhiên quanh
  target rồi áp sát tấn công.

- [ ] **Step 1: Tạo `EndermanTeleportSkill.cs`**

```csharp
using UnityEngine;

namespace Playable
{
    /// <summary>
    /// Enderman dịch chuyển tức thời 2 lần tới điểm ngẫu nhiên quanh target (bán kính TeleportRadius,
    /// cách nhau TeleportStepDelay giây), rồi dịch chuyển lần 3 vào tầm melee, quay mặt và gây
    /// TeleportFinalAttackDamage ngay lập tức.
    /// </summary>
    [DisallowMultipleComponent]
    public class EndermanTeleportSkill : MonoBehaviour, IMonsterSkill
    {
        [Header("Animator (optional)")]
        [SerializeField] private string _teleportTriggerParam = "";

        [Header("VFX (optional)")]
        [SerializeField] private GameObject _teleportVfxPrefab;

        private Monster _self;
        private MonsterStatsEntry _stats;
        private int _teleportTriggerHash;

        private float _cooldownTimer;
        private bool _isChanneling;
        private int _hopIndex;
        private float _stepTimer;
        private Monster _channelTarget;

        private readonly GameObject[] _puffPool = new GameObject[2];
        private readonly ParticleSystem[][] _puffParticles = new ParticleSystem[2][];
        private int _puffIndex;

        public bool IsChanneling => _isChanneling;

        private void Awake()
        {
            _teleportTriggerHash = Animator.StringToHash(_teleportTriggerParam);
        }

        public void Init(Monster self, MonsterStatsEntry stats)
        {
            _self = self;
            _stats = stats;
            _cooldownTimer = stats.TeleportCooldown;
            _isChanneling = false;
        }

        public void Tick(Monster target)
        {
            if (_isChanneling)
            {
                UpdateChannel();
                return;
            }

            _cooldownTimer -= Time.deltaTime;

            if (_cooldownTimer > 0f || target == null || target.IsDead || _self.IsAnySkillChanneling)
            {
                return;
            }

            StartChannel(target);
        }

        private void StartChannel(Monster target)
        {
            _isChanneling = true;
            _hopIndex = 0;
            _stepTimer = 0f;
            _channelTarget = target;
        }

        private void UpdateChannel()
        {
            if (_channelTarget == null || _channelTarget.IsDead)
            {
                EndChannel();
                return;
            }

            _stepTimer -= Time.deltaTime;

            if (_stepTimer > 0f)
            {
                return;
            }

            if (_hopIndex < 2)
            {
                Vector2 offset = Random.insideUnitCircle.normalized * _stats.TeleportRadius;
                Vector3 hopPosition = _channelTarget.Position + new Vector3(offset.x, 0f, offset.y);
                TeleportSelf(hopPosition, false);

                _hopIndex++;
                _stepTimer = _stats.TeleportStepDelay;
                return;
            }

            Vector3 finalOffset = _self.Position - _channelTarget.Position;
            finalOffset.y = 0f;

            Vector3 direction = finalOffset.sqrMagnitude > 0.0001f
                ? finalOffset.normalized
                : Vector3.forward;

            float approachDistance = Mathf.Max(_stats.AttackRange * 0.8f, 0.5f);
            Vector3 finalPosition = _channelTarget.Position + direction * approachDistance;

            TeleportSelf(finalPosition, true);
            _channelTarget.Health.TakeDamage(_self, _stats.TeleportFinalAttackDamage);

            EndChannel();
        }

        private void TeleportSelf(Vector3 worldPosition, bool faceTargetAfter)
        {
            PlayTeleportPuff(_self.Position);
            _self.TeleportTo(worldPosition, false);
            PlayTeleportPuff(_self.Position);

            if (faceTargetAfter && _channelTarget != null)
            {
                _self.FaceTowards(_channelTarget.Position);
            }

            if (!string.IsNullOrEmpty(_teleportTriggerParam) && _self.HasAnimator)
            {
                _self.PlayAnimatorTrigger(_teleportTriggerHash, _teleportTriggerParam);
            }
        }

        private void PlayTeleportPuff(Vector3 position)
        {
            if (_teleportVfxPrefab == null)
            {
                return;
            }

            int slot = _puffIndex;
            _puffIndex = (_puffIndex + 1) % _puffPool.Length;

            GameObject puff = _puffPool[slot];

            if (puff == null)
            {
                puff = Instantiate(_teleportVfxPrefab, position, Quaternion.identity);
                _puffPool[slot] = puff;
                _puffParticles[slot] = puff.GetComponentsInChildren<ParticleSystem>(true);
            }
            else
            {
                puff.transform.position = position;
                puff.SetActive(true);
            }

            ParticleSystem[] particles = _puffParticles[slot];

            for (int i = 0; i < particles.Length; i++)
            {
                particles[i].Clear();
                particles[i].Play();
            }
        }

        private void EndChannel()
        {
            _isChanneling = false;
            _cooldownTimer = _stats.TeleportCooldown;
            _channelTarget = null;
        }
    }
}
```

- [ ] **Step 2: Thêm vào `Assembly-CSharp.csproj`**

```xml
    <Compile Include="Assets\_Playable_\Scripts\Combat\Skills\EndermanTeleportSkill.cs" />
```

- [ ] **Step 3: Build-check**

Run: `dotnet build Assembly-CSharp.csproj -v:q`
Expected: `0 Error(s)`

- [ ] **Step 4: Commit**

```bash
git add Assets/_Playable_/Scripts/Combat/Skills/EndermanTeleportSkill.cs
git commit -m "feat: Enderman teleport skill (2 hops around target + close-range strike)"
```

---

## Task 5: `IronGolemSlamSkill`

**Files:**
- Create: `Assets/_Playable_/Scripts/Combat/Skills/IronGolemSlamSkill.cs`
- Modify: `Assembly-CSharp.csproj`

**Interfaces:**
- Consumes: `Monster` (`Position`, `HasAnimator`, `FaceTowards`, `PlayAnimatorTrigger`, `IsAnySkillChanneling`,
  `Health`), `MonsterHealth.TakeDamage`/`PlayLaunch`/`ApplyCrowdControl`, `MonsterStatsEntry` (`SlamCooldown`,
  `SlamDamage`, `SlamLaunchHeight`, `SlamAirTime`, `SlamStunDuration`, `AttackRange`), `IMonsterSkill` (Task 1).
- Produces: `class IronGolemSlamSkill : MonoBehaviour, IMonsterSkill` - đập đất gây damage + hất bay + choáng.

- [ ] **Step 1: Tạo `IronGolemSlamSkill.cs`**

```csharp
using UnityEngine;

namespace Playable
{
    /// <summary>
    /// Iron Golem đập xuống chân đối thủ (phải trong AttackRange, dùng lại tầm melee). Sau thời gian vung
    /// tay (ChannelDuration) gây SlamDamage, hất target bay lên SlamLaunchHeight rồi rơi xuống trong
    /// SlamAirTime giây, cộng thêm SlamStunDuration giây choáng sau khi rơi.
    /// </summary>
    [DisallowMultipleComponent]
    public class IronGolemSlamSkill : MonoBehaviour, IMonsterSkill
    {
        private const float ChannelDuration = 0.6f;

        [Header("Animator (optional)")]
        [SerializeField] private string _slamTriggerParam = "";

        [Header("VFX (optional)")]
        [SerializeField] private GameObject _slamVfxPrefab;

        private Monster _self;
        private MonsterStatsEntry _stats;
        private int _slamTriggerHash;

        private float _cooldownTimer;
        private bool _isChanneling;
        private float _channelTimer;
        private bool _hasAppliedHit;
        private Monster _channelTarget;
        private GameObject _slamVfxInstance;
        private ParticleSystem[] _slamVfxParticles;

        public bool IsChanneling => _isChanneling;

        private void Awake()
        {
            _slamTriggerHash = Animator.StringToHash(_slamTriggerParam);
        }

        public void Init(Monster self, MonsterStatsEntry stats)
        {
            _self = self;
            _stats = stats;
            _cooldownTimer = stats.SlamCooldown;
            _isChanneling = false;
        }

        public void Tick(Monster target)
        {
            if (_isChanneling)
            {
                UpdateChannel();
                return;
            }

            _cooldownTimer -= Time.deltaTime;

            if (_cooldownTimer > 0f || target == null || target.IsDead || _self.IsAnySkillChanneling)
            {
                return;
            }

            float distanceSqr = (target.Position - _self.Position).sqrMagnitude;

            if (distanceSqr > _stats.AttackRange * _stats.AttackRange)
            {
                return;
            }

            StartChannel(target);
        }

        private void StartChannel(Monster target)
        {
            _isChanneling = true;
            _channelTimer = ChannelDuration;
            _hasAppliedHit = false;
            _channelTarget = target;

            _self.FaceTowards(target.Position);

            if (!string.IsNullOrEmpty(_slamTriggerParam) && _self.HasAnimator)
            {
                _self.PlayAnimatorTrigger(_slamTriggerHash, _slamTriggerParam);
            }
        }

        private void UpdateChannel()
        {
            _channelTimer -= Time.deltaTime;

            if (!_hasAppliedHit && _channelTimer <= 0f)
            {
                _hasAppliedHit = true;
                ApplyHit();
            }

            if (_channelTimer > 0f)
            {
                return;
            }

            _isChanneling = false;
            _cooldownTimer = _stats.SlamCooldown;
        }

        private void ApplyHit()
        {
            PlaySlamVfx();

            if (_channelTarget == null || _channelTarget.IsDead)
            {
                return;
            }

            float distanceSqr = (_channelTarget.Position - _self.Position).sqrMagnitude;

            if (distanceSqr > _stats.AttackRange * _stats.AttackRange)
            {
                return;
            }

            _channelTarget.Health.TakeDamage(_self, _stats.SlamDamage);
            _channelTarget.Health.PlayLaunch(_stats.SlamLaunchHeight, _stats.SlamAirTime);
            _channelTarget.Health.ApplyCrowdControl(
                _self.Position, 0f, _stats.SlamAirTime + _stats.SlamStunDuration);
        }

        private void PlaySlamVfx()
        {
            if (_slamVfxPrefab == null)
            {
                return;
            }

            if (_slamVfxInstance == null)
            {
                _slamVfxInstance = Instantiate(_slamVfxPrefab, _self.Position, Quaternion.identity);
                _slamVfxParticles = _slamVfxInstance.GetComponentsInChildren<ParticleSystem>(true);
            }
            else
            {
                _slamVfxInstance.transform.position = _self.Position;
                _slamVfxInstance.SetActive(true);
            }

            for (int i = 0; i < _slamVfxParticles.Length; i++)
            {
                _slamVfxParticles[i].Clear();
                _slamVfxParticles[i].Play();
            }
        }
    }
}
```

- [ ] **Step 2: Thêm vào `Assembly-CSharp.csproj`**

```xml
    <Compile Include="Assets\_Playable_\Scripts\Combat\Skills\IronGolemSlamSkill.cs" />
```

- [ ] **Step 3: Build-check**

Run: `dotnet build Assembly-CSharp.csproj -v:q`
Expected: `0 Error(s)`

- [ ] **Step 4: Commit**

```bash
git add Assets/_Playable_/Scripts/Combat/Skills/IronGolemSlamSkill.cs
git commit -m "feat: Iron Golem ground-slam skill (launch + stun)"
```

---

## Task 6: `CreeperPoisonSkill`

**Files:**
- Create: `Assets/_Playable_/Scripts/Combat/Skills/CreeperPoisonSkill.cs`
- Modify: `Assembly-CSharp.csproj`

**Interfaces:**
- Consumes: `Monster` (`Position`, `HasAnimator`, `PlayAnimatorTrigger`, `Health`), `MonsterHealth.ApplyPoison`,
  `MonsterStatsEntry` (`PoisonCooldown`, `PoisonDamagePerTick`, `PoisonTickInterval`, `PoisonDuration`,
  `AttackRange`), `IMonsterSkill` (Task 1).
- Produces: `class CreeperPoisonSkill : MonoBehaviour, IMonsterSkill` - áp độc DOT, không channel, chạy song
  song với đòn melee thường (không thay thế).

- [ ] **Step 1: Tạo `CreeperPoisonSkill.cs`**

```csharp
using UnityEngine;

namespace Playable
{
    /// <summary>
    /// Creeper hết PoisonCooldown + target trong AttackRange thì áp độc DOT lên target (không gây damage
    /// tức thời riêng - chỉ bào máu theo tick). Không channel, chạy song song với đòn melee thường của
    /// MonsterCombat (là hành động cộng thêm, không thay thế đòn đánh).
    /// </summary>
    [DisallowMultipleComponent]
    public class CreeperPoisonSkill : MonoBehaviour, IMonsterSkill
    {
        [Header("Animator (optional, để trống = dùng lại anim đánh thường)")]
        [SerializeField] private string _poisonTriggerParam = "";

        private Monster _self;
        private MonsterStatsEntry _stats;
        private int _poisonTriggerHash;

        private float _cooldownTimer;

        public bool IsChanneling => false;

        private void Awake()
        {
            _poisonTriggerHash = Animator.StringToHash(_poisonTriggerParam);
        }

        public void Init(Monster self, MonsterStatsEntry stats)
        {
            _self = self;
            _stats = stats;
            _cooldownTimer = stats.PoisonCooldown;
        }

        public void Tick(Monster target)
        {
            _cooldownTimer -= Time.deltaTime;

            if (_cooldownTimer > 0f || target == null || target.IsDead)
            {
                return;
            }

            float distanceSqr = (target.Position - _self.Position).sqrMagnitude;

            if (distanceSqr > _stats.AttackRange * _stats.AttackRange)
            {
                return;
            }

            _cooldownTimer = _stats.PoisonCooldown;

            if (!string.IsNullOrEmpty(_poisonTriggerParam) && _self.HasAnimator)
            {
                _self.PlayAnimatorTrigger(_poisonTriggerHash, _poisonTriggerParam);
            }

            target.Health.ApplyPoison(_stats.PoisonDamagePerTick, _stats.PoisonTickInterval, _stats.PoisonDuration);
        }
    }
}
```

- [ ] **Step 2: Thêm vào `Assembly-CSharp.csproj`**

```xml
    <Compile Include="Assets\_Playable_\Scripts\Combat\Skills\CreeperPoisonSkill.cs" />
```

- [ ] **Step 3: Build-check**

Run: `dotnet build Assembly-CSharp.csproj -v:q`
Expected: `0 Error(s)`

- [ ] **Step 4: Commit**

```bash
git add Assets/_Playable_/Scripts/Combat/Skills/CreeperPoisonSkill.cs
git commit -m "feat: Creeper poison skill (DOT proc, no stack)"
```

---

## Task 7: `HuggyRegenSkill`

**Files:**
- Create: `Assets/_Playable_/Scripts/Combat/Skills/HuggyRegenSkill.cs`
- Modify: `Assembly-CSharp.csproj`

**Interfaces:**
- Consumes: `Monster.Health`, `MonsterHealth.Heal`/`IsDead`, `MonsterStatsEntry` (`RegenPerTick`,
  `RegenTickInterval`), `IMonsterSkill` (Task 1).
- Produces: `class HuggyRegenSkill : MonoBehaviour, IMonsterSkill` - hồi máu bản thân liên tục, không cần target.

- [ ] **Step 1: Tạo `HuggyRegenSkill.cs`**

```csharp
using UnityEngine;

namespace Playable
{
    /// <summary>
    /// Huggy tự hồi máu RegenPerTick mỗi RegenTickInterval giây, chạy liên tục từ lúc spawn kể cả lúc
    /// idle/chase/bị stagger, không cần target, không cooldown, không channel. Dừng khi chết.
    /// </summary>
    [DisallowMultipleComponent]
    public class HuggyRegenSkill : MonoBehaviour, IMonsterSkill
    {
        private MonsterHealth _health;
        private MonsterStatsEntry _stats;
        private float _tickTimer;

        public bool IsChanneling => false;

        public void Init(Monster self, MonsterStatsEntry stats)
        {
            _health = self.Health;
            _stats = stats;
            _tickTimer = stats.RegenTickInterval;
        }

        public void Tick(Monster target)
        {
            if (_health == null || _health.IsDead)
            {
                return;
            }

            _tickTimer -= Time.deltaTime;

            if (_tickTimer > 0f)
            {
                return;
            }

            _tickTimer = _stats.RegenTickInterval;
            _health.Heal(_stats.RegenPerTick);
        }
    }
}
```

- [ ] **Step 2: Thêm vào `Assembly-CSharp.csproj`**

```xml
    <Compile Include="Assets\_Playable_\Scripts\Combat\Skills\HuggyRegenSkill.cs" />
```

- [ ] **Step 3: Build-check**

Run: `dotnet build Assembly-CSharp.csproj -v:q`
Expected: `0 Error(s)`

- [ ] **Step 4: Commit**

```bash
git add Assets/_Playable_/Scripts/Combat/Skills/HuggyRegenSkill.cs
git commit -m "feat: Huggy passive regen skill"
```

---

## Task 8: `ShinsonicTransformSkill`

**Files:**
- Create: `Assets/_Playable_/Scripts/Combat/Skills/ShinsonicTransformSkill.cs`
- Modify: `Assembly-CSharp.csproj`

**Interfaces:**
- Consumes: `Monster` (`Health`, `HasAnimator`, `PlayAnimatorTrigger`, `Combat`), `MonsterHealth`
  (`CurrentHealth`, `MaxHealth`, `IsDead`, `IncreaseMaxHealth`), `MonsterCombat.AddAttackDamageBonus`,
  `MonsterStatsEntry` (`TransformStage1HpThreshold`, `TransformStage2HpThreshold`,
  `TransformStage1BonusMaxHealth`, `TransformStage1BonusDamage`, `TransformStage2BonusMaxHealth`,
  `TransformStage2BonusDamage`), `IMonsterSkill` (Task 1).
- Produces: `class ShinsonicTransformSkill : MonoBehaviour, IMonsterSkill` - biến hình 2 lần theo mốc % máu,
  mỗi lần tăng Max HP + damage.

- [ ] **Step 1: Tạo `ShinsonicTransformSkill.cs`**

```csharp
using UnityEngine;

namespace Playable
{
    /// <summary>
    /// Shinsonic theo dõi CurrentHealth/MaxHealth mỗi frame. Lần đầu tụt xuống ≤
    /// TransformStage1HpThreshold thì biến hình 1 (tăng Max HP + damage theo bộ số Stage1, đổi visual).
    /// Tụt tiếp ≤ TransformStage2HpThreshold (tính trên MaxHealth mới) thì biến hình 2. Mỗi mốc chỉ kích
    /// hoạt đúng 1 lần/trận.
    /// </summary>
    [DisallowMultipleComponent]
    public class ShinsonicTransformSkill : MonoBehaviour, IMonsterSkill
    {
        private const float TransformChannelDuration = 0.5f;

        [Header("Animator (optional)")]
        [SerializeField] private string _stage1TriggerParam = "";
        [SerializeField] private string _stage2TriggerParam = "";

        [Header("Visual đổi model theo stage (optional)")]
        [SerializeField] private GameObject _baseVisual;
        [SerializeField] private GameObject _stage1Visual;
        [SerializeField] private GameObject _stage2Visual;

        private Monster _self;
        private MonsterHealth _health;
        private MonsterStatsEntry _stats;
        private int _stage1TriggerHash;
        private int _stage2TriggerHash;

        private bool _hasTransformedStage1;
        private bool _hasTransformedStage2;
        private bool _isChanneling;
        private float _channelTimer;

        public bool IsChanneling => _isChanneling;

        private void Awake()
        {
            _stage1TriggerHash = Animator.StringToHash(_stage1TriggerParam);
            _stage2TriggerHash = Animator.StringToHash(_stage2TriggerParam);
        }

        public void Init(Monster self, MonsterStatsEntry stats)
        {
            _self = self;
            _health = self.Health;
            _stats = stats;
            _hasTransformedStage1 = false;
            _hasTransformedStage2 = false;
            _isChanneling = false;

            SetVisual(_baseVisual);
        }

        public void Tick(Monster target)
        {
            if (_isChanneling)
            {
                _channelTimer -= Time.deltaTime;

                if (_channelTimer <= 0f)
                {
                    _isChanneling = false;
                }

                return;
            }

            if (_health == null || _health.IsDead || _health.MaxHealth <= 0f)
            {
                return;
            }

            float ratio = _health.CurrentHealth / _health.MaxHealth;

            if (!_hasTransformedStage1 && ratio <= _stats.TransformStage1HpThreshold)
            {
                TransformTo(
                    true,
                    _stats.TransformStage1BonusMaxHealth,
                    _stats.TransformStage1BonusDamage,
                    _stage1TriggerHash,
                    _stage1TriggerParam,
                    _stage1Visual);
                return;
            }

            if (_hasTransformedStage1 && !_hasTransformedStage2 && ratio <= _stats.TransformStage2HpThreshold)
            {
                TransformTo(
                    false,
                    _stats.TransformStage2BonusMaxHealth,
                    _stats.TransformStage2BonusDamage,
                    _stage2TriggerHash,
                    _stage2TriggerParam,
                    _stage2Visual);
            }
        }

        private void TransformTo(
            bool isStage1,
            float bonusMaxHealth,
            float bonusDamage,
            int triggerHash,
            string triggerParam,
            GameObject visual)
        {
            if (isStage1)
            {
                _hasTransformedStage1 = true;
            }
            else
            {
                _hasTransformedStage2 = true;
            }

            _isChanneling = true;
            _channelTimer = TransformChannelDuration;

            _health.IncreaseMaxHealth(bonusMaxHealth, true);
            _self.Combat.AddAttackDamageBonus(bonusDamage);

            if (!string.IsNullOrEmpty(triggerParam) && _self.HasAnimator)
            {
                _self.PlayAnimatorTrigger(triggerHash, triggerParam);
            }

            SetVisual(visual);
        }

        private void SetVisual(GameObject activeVisual)
        {
            if (_baseVisual != null) _baseVisual.SetActive(_baseVisual == activeVisual);
            if (_stage1Visual != null) _stage1Visual.SetActive(_stage1Visual == activeVisual);
            if (_stage2Visual != null) _stage2Visual.SetActive(_stage2Visual == activeVisual);
        }
    }
}
```

- [ ] **Step 2: Thêm vào `Assembly-CSharp.csproj`**

```xml
    <Compile Include="Assets\_Playable_\Scripts\Combat\Skills\ShinsonicTransformSkill.cs" />
```

- [ ] **Step 3: Build-check**

Run: `dotnet build Assembly-CSharp.csproj -v:q`
Expected: `0 Error(s)`

- [ ] **Step 4: Commit**

```bash
git add Assets/_Playable_/Scripts/Combat/Skills/ShinsonicTransformSkill.cs
git commit -m "feat: Shinsonic 2-stage transform skill (HP threshold based)"
```

---

## Task 9: Auto-attach skill wiring + Unity Editor setup

**Files:**
- Modify: `Assets/_Playable_/Scripts/Monster.cs`
- Modify: `Assembly-CSharp.csproj` (không cần thêm dòng mới - không tạo file mới)

**Interfaces:**
- Consumes: cả 6 class skill (Task 3-8), `MonsterType` (Task 1).
- Produces: `Monster` tự gắn đúng skill component theo `_monsterType` lúc `Awake()` - không cần add tay từng
  skill component lên prefab trong Editor, chỉ cần set đúng dropdown `_monsterType`.

- [ ] **Step 1: Thêm `AutoAttachSkills()` vào `Monster.cs`**

Trong `Assets/_Playable_/Scripts/Monster.cs`, sửa `Awake()` - thêm lời gọi `AutoAttachSkills();` ngay TRƯỚC
dòng `_skills = GetComponents<IMonsterSkill>();`:

```csharp
            AutoAttachSkills();
            _skills = GetComponents<IMonsterSkill>();
```

(dòng `_skills = GetComponents<IMonsterSkill>();` đã có sẵn từ Task 2, chỉ thêm dòng `AutoAttachSkills();`
ngay trước nó.)

Thêm 2 method mới vào `Monster.cs` (đặt ngay trước method `Spawn`):

```csharp
        /// <summary>
        /// Tự gắn đúng skill component theo _monsterType nếu prefab chưa gắn sẵn trong Editor - không cần
        /// chỉnh tay từng prefab, chỉ cần đặt đúng _monsterType.
        /// </summary>
        private void AutoAttachSkills()
        {
            switch (_monsterType)
            {
                case MonsterType.Enderman:
                    EnsureSkill<EndermanArmReachSkill>();
                    EnsureSkill<EndermanTeleportSkill>();
                    break;

                case MonsterType.IronGolem:
                    EnsureSkill<IronGolemSlamSkill>();
                    break;

                case MonsterType.Creeper:
                    EnsureSkill<CreeperPoisonSkill>();
                    break;

                case MonsterType.Huggy:
                    EnsureSkill<HuggyRegenSkill>();
                    break;

                case MonsterType.Shinsonic:
                    EnsureSkill<ShinsonicTransformSkill>();
                    break;
            }
        }

        private void EnsureSkill<T>() where T : Component
        {
            if (GetComponent<T>() == null)
            {
                gameObject.AddComponent<T>();
            }
        }
```

- [ ] **Step 2: Build-check**

Run: `dotnet build Assembly-CSharp.csproj -v:q`
Expected: `0 Error(s)`

- [ ] **Step 3: Commit**

```bash
git add Assets/_Playable_/Scripts/Monster.cs
git commit -m "feat: auto-attach monster skill component by MonsterType"
```

- [ ] **Step 4: Checklist thiết lập trong Unity Editor (thao tác tay, ngoài phạm vi code)**

Không thể thao tác trong môi trường này (không có Unity Editor GUI) - thực hiện khi mở project:

1. **Tạo asset data**: `Assets > Create > Playable > Monster Stats Table`, lưu tại
   `Assets/_Playable_/Data/MonsterStatsTable.asset`. Mở Inspector, thêm 5 phần tử vào `_entries`, mỗi phần tử
   set đúng `Type` (Enderman/IronGolem/Creeper/Huggy/Shinsonic) - giá trị mặc định trong code đã điền sẵn số
   hợp lý để chơi thử ngay, tinh chỉnh sau.
2. **Gán vào 5 prefab quái** (`Assets/_Playable_/Prefabs/Mutant Enderman.prefab`, `Mutan Iron Golem.prefab`,
   `Mutan Creeper.prefab`, `Mutan Huggy.prefab`, `Mutan Sonic.prefab`): mở từng prefab, trên component
   `Monster`, set đúng dropdown `Monster Type` khớp tên prefab, kéo asset `MonsterStatsTable.asset` vừa tạo vào
   field `Stats Table`.
3. **Bomb visual (tuỳ chọn, để trống nếu chưa có model bom)**: tạo prefab quả bom (mesh/particle tuỳ ý) rồi gắn
   component `MonsterProjectile` (Add Component thủ công hoặc code sẽ tự `AddComponent` lúc runtime nếu thiếu),
   set `Explosion Vfx Prefab` nếu có. Kéo prefab này vào field `Bomb Projectile Prefab` trên component
   `MonsterCombat` của từng prefab quái muốn ném bom.
4. **Animator param cho hành động mới** (tuỳ chọn, để trống thì fallback dùng lại đòn đánh thường - xem spec
   §5): trên từng prefab, điền tên param thật trong Animator Controller vào các field tương ứng - `MonsterCombat`
   (`Attack Trigger Param`, `Throw Bomb Trigger Param`), `MonsterHealth` không có param (chưa cần theo scope
   plan này - hit-react/stunned bool sẽ thêm ở phase sau nếu cần), và field riêng từng skill (`Arm Reach Trigger
   Param`, `Teleport Trigger Param`, `Slam Trigger Param`, `Poison Trigger Param`, `Stage1/2 Trigger Param`).
5. **VFX riêng từng skill** (tuỳ chọn): kéo prefab VFX vào `Arm Vfx Prefab` (Enderman arm-reach), `Teleport Vfx
   Prefab` (Enderman teleport), `Slam Vfx Prefab` (Iron Golem).
6. **Shinsonic visual 2 stage** (tuỳ chọn): kéo model/GameObject con tương ứng Phase 1/2/3 (đã có sẵn trong
   `Assets/Game/Models/Mobs/shin_sonic/`) vào `Base Visual`/`Stage1 Visual`/`Stage2 Visual` trên
   `ShinsonicTransformSkill` nếu muốn đổi model lúc biến hình.
7. **Playtest theo checklist ở spec §Testing**: mở scene test, bật `MonsterDebug.VerboseLoggingEnabled = true`
   tạm thời (sửa trực tiếp trong code hoặc thêm 1 dòng gọi lúc debug) để xem log combat, spawn đủ 5 loại quái
   và chạy qua từng mục checklist.

---

## Self-review

**Spec coverage:**
- Common actions (idle/walk/attack/bomb/knockback) → Task 2.
- Target priority + trả đũa + không đổi target tới khi chết → Task 2 (`MonsterCombat`).
- 5 skill riêng (6 class, Enderman có 2) → Task 3-8.
- `MonsterStatsTable` → Task 1.
- Animator hook optional + fallback → toàn bộ Task 2-8 (mọi field `Param` để trống = fallback, không lỗi).
- Error handling (stats entry thiếu, projectile target chết giữa đường, thiếu skill component) → Task 1
  (`MonsterStatsTable.GetEntry` fallback), Task 2 (`MonsterProjectile.Explode` null-check target).
- Tối ưu Luna (zero-alloc, lerp thủ công, pooling, cache hash, gọi GetComponents 1 lần, log guard) → Global
  Constraints áp dụng xuyên suốt Task 1-9, cụ thể hoá trong từng file (`MonsterHealth`/`MonsterProjectile` lerp
  thủ công không DOTween, VFX reuse instance, `MonsterDebug` guard pattern).
- Testing (không có hạ tầng tự động, playtest checklist) → Task 9 Step 4.

**Placeholder scan:** không còn "TBD"/"implement later" trong bất kỳ step nào - mọi step code đều có nội dung
đầy đủ.

**Type consistency:** đã rà lại toàn bộ chữ ký được dùng chéo task - `MonsterStatsEntry` field name khớp giữa
Task 1 (định nghĩa) và Task 3-8 (sử dụng); `Monster.Health`/`Combat`/`Position`/`IsDead`/`IsAnySkillChanneling`/
`HasAnimator`/`ChaseTowards`/`FaceTowards`/`TeleportTo`/`PlayAnimatorTrigger`/`SetAnimatorBool` định nghĩa ở
Task 2 khớp với mọi lời gọi ở Task 3-9; `MonsterHealth.TakeDamage`/`ApplyCrowdControl`/`ApplyPoison`/`Heal`/
`IncreaseMaxHealth`/`PlayLaunch` khớp giữa Task 2 và Task 3-8; `MonsterCombat.CurrentEnemy`/
`AddAttackDamageBonus` khớp giữa Task 2 và Task 8.
