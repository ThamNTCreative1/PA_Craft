# Monster Combat System (5 loại quái, skill riêng, data table chung) — Design

Date: 2026-08-26
Scope: `Assets/_Playable_/Scripts/Monster.cs` (tách nhỏ), file mới trong `Assets/_Playable_/Scripts/Combat/`,
`Assets/_Playable_/Data/` (ScriptableObject), prefab 5 loại quái trong `Assets/_Playable_/Prefabs/`.
Build target: playable ads (Luna/Playgama pipeline, `luna.json`) — chạy trong WebView, thiết bị yếu, ngân
sách CPU/GC chặt.

## Problem

`Monster.cs` hiện chỉ có 1 kiểu tấn công cận chiến chung chung (melee, trừ máu thẳng), không có:
- Đòn tầm xa (ném bom).
- Phản ứng khi trúng đòn (đẩy lùi, khoá tấn công tạm thời).
- Kỹ năng đặc biệt riêng cho từng loại quái (Enderman, Iron Golem, Creeper, Huggy, Shinsonic).
- Ưu tiên chọn mục tiêu (khác loại trước, cùng loại sau) và cơ chế trả đũa khi bị tấn công lúc đang rảnh.
- 1 bảng số liệu chung để chỉnh cân bằng (HP, damage, tốc độ, cooldown...) mà không phải sửa từng prefab.

## Goals

- Common actions cho mọi loại quái: idle, walk, melee attack, ném bom tầm xa, bị đẩy lùi + mất máu khi
  trúng đòn (khoá tấn công trong lúc bị đẩy).
- 5 skill đặc biệt, mỗi loại quái 1 bộ hành vi riêng (Enderman có 2 skill):
  - Enderman: (1) vươn tay VFX ~2s gây choáng đứng yên + damage; (2) teleport 2 lần quanh địch rồi áp sát
    tấn công.
  - Iron Golem: đập đất gây damage + hất tung địch lên rồi rơi xuống choáng.
  - Creeper: đòn đặc biệt gây độc bào máu theo thời gian (DOT), không stack.
  - Huggy: hồi máu bản thân theo thời gian, không cần đang giao chiến.
  - Shinsonic: biến hình 2 lần theo mốc % máu còn lại, mỗi lần tăng Max HP + damage.
- Target priority: ưu tiên quái khác loại > cùng loại; không đổi target tới khi target chết; trả đũa
  nguồn tấn công nếu đang rảnh (không giao chiến ai).
- 1 `MonsterStatsTable` (ScriptableObject) làm nguồn số liệu duy nhất cho cả 5 loại.
- Tối ưu để chạy mượt trong build Luna (playable ads): zero-alloc trong `Update`, pooling triệt để, không
  tăng thêm chi phí đáng kể so với hiện tại dù có thêm skill.

## Non-goals

- Không xây hệ thống ability tổng quát kiểu data-driven/DSL (over-engineering với chỉ 5 skill cố định) —
  xem approach C đã cân nhắc và loại ở bước brainstorm.
- Không đổi cơ chế wander/spawn/pooling hiện có của `Monster` (giữ nguyên `Spawn()`/`Despawn()`,
  `GameController` pooling).
- Không thêm spatial-partition/quadtree cho target-scan (giới hạn 12 quái đồng thời, O(n) hiện tại đủ rẻ).
- Không bắt buộc phải có animation clip đầy đủ ngay — mọi param animator mới đều optional, để trống thì
  fallback (vd Creeper poison không cần anim riêng, dùng lại attack).
- Không tự động test (không có hạ tầng test trong repo) — kiểm thử bằng playtest thủ công + debug helper.

## Design

### 1. Kiến trúc component

```
Monster (orchestrator — giữ state machine idle/wander/chase hiện có, nhẹ bớt phần combat)
 ├─ MonsterHealth      : HP, TakeDamage, Die, knockback/stagger/stun (CC dùng chung), poison, heal
 ├─ MonsterCombat      : target selection + ưu tiên + trả đũa, melee attack, bomb-throw scheduling
 ├─ MonsterProjectile  : (spawn riêng, pooled) quả bom bay thẳng + va chạm + nổ
 └─ IMonsterSkill[]    : 0..N skill component gắn thêm tuỳ loại quái, cache 1 lần ở Awake
      ├─ EndermanArmReachSkill      ├─ CreeperPoisonSkill
      ├─ EndermanTeleportSkill      ├─ HuggyRegenSkill
      ├─ IronGolemSlamSkill         └─ ShinsonicTransformSkill

MonsterStatsTable (ScriptableObject, 1 asset, list 5 entry theo MonsterType)
```

`Monster` vẫn sở hữu `Animator` + 2 helper `PlayTrigger(paramName)` / `SetBool(paramName, value)` (internal,
dùng lại đúng pattern `SafeSetAnimatorBool/Trigger` hiện có, cache hash 1 lần ở `Awake`) để mọi component
con gọi qua, không component nào tự giữ `Animator` riêng hay tự cache hash riêng.

`IMonsterSkill`:
```csharp
public interface IMonsterSkill
{
    bool IsChanneling { get; }
    void Tick(Monster self, Monster currentTarget);
}
```
`Monster` giữ `bool IsAnySkillChanneling` (true nếu bất kỳ skill nào trong mảng đang channel) — khi true,
`MonsterCombat` tạm dừng melee/bomb loop và các skill khác không được bắt đầu channel mới, tránh chồng hành
động. Skill IsChanneling cũng miễn nhiễm knockback/CC từ đòn đánh khác trong lúc đang channel (damage vẫn
trừ máu bình thường, chỉ phần đẩy lùi/khoá bị bỏ qua).

### 2. `MonsterStatsTable` — schema

`Assets/_Playable_/Data/MonsterStatsTable.asset`, 1 list `MonsterStatsEntry` theo `MonsterType` enum
(`Enderman, IronGolem, Creeper, Huggy, Shinsonic`). `Monster.Spawn()` tra bảng theo `MonsterType` gán sẵn
trên prefab để áp số liệu 1 lần, không giữ tham chiếu asset lâu dài (tránh sửa nhầm asset gốc runtime).

```csharp
public enum MonsterType { Enderman, IronGolem, Creeper, Huggy, Shinsonic }

[Serializable]
public class MonsterStatsEntry
{
    public MonsterType Type;

    [Header("Core")]
    public float MaxHealth;
    public float MoveSpeed;

    [Header("Melee Attack")]
    public float AttackDamage;
    public float AttackRange;
    public float AttackCooldown;

    [Header("Bomb (ranged)")]
    public float BombDamage;
    public float BombRange;        // > AttackRange
    public float BombCooldown;
    public float BombSpeed;
    public float BombKnockbackForce;

    [Header("Hit Reaction (chung mọi loại sát thương)")]
    public float KnockbackForce;
    public float KnockbackDuration;

    [Header("Enderman - Arm Reach")]
    public float ArmReachCooldown;
    public float ArmReachDamage;
    public float ArmReachDuration;      // ~2s
    public float ArmReachRange;
    public float ArmReachStunDuration;

    [Header("Enderman - Teleport")]
    public float TeleportCooldown;
    public float TeleportRadius;
    public float TeleportStepDelay;
    public float TeleportFinalAttackDamage;

    [Header("Iron Golem - Ground Slam")]
    public float SlamCooldown;
    public float SlamDamage;
    public float SlamLaunchHeight;
    public float SlamAirTime;
    public float SlamStunDuration;

    [Header("Creeper - Poison")]
    public float PoisonCooldown;
    public float PoisonDamagePerTick;
    public float PoisonTickInterval;
    public float PoisonDuration;        // refresh khi trúng lại, không stack

    [Header("Huggy - Regen")]
    public float RegenPerTick;
    public float RegenTickInterval;     // chạy liên tục từ lúc spawn, không cần enemy

    [Header("Shinsonic - Transform")]
    public float TransformStage1HpThreshold;   // vd 0.7 = còn 70% HP (so trên MaxHealth hiện tại)
    public float TransformStage2HpThreshold;   // vd 0.3, tính trên MaxHealth sau khi đã cộng Stage1
    public float TransformStage1BonusMaxHealth;
    public float TransformStage1BonusDamage;
    public float TransformStage2BonusMaxHealth;
    public float TransformStage2BonusDamage;
}
```

Field không áp dụng cho 1 loại quái cứ để 0/trống trong entry đó — chấp nhận dư field để giữ đúng "1 asset,
list 5 entry, sửa 1 chỗ" như đã chọn, thay vì tách 5 class riêng.

**Tách bạch data vs asset trình diễn**: bảng này chỉ chứa số liệu. Mọi prefab VFX/projectile (VFX tay dài,
VFX nổ bom, prefab quả bom, visual Phase 2/3/4 Shinsonic...) khai báo trực tiếp trên từng prefab quái
(giống `_spawnVfxPrefab` hiện có), không đưa vào ScriptableObject số liệu.

### 3. State machine — target priority, melee/bomb, knockback

**Target acquisition** (thay `TryFindNearestEnemy`):
```
if _currentEnemy != null && !_currentEnemy.IsDead:
    giữ nguyên (không quét lại, không đổi)
else:
    if có _pendingRetaliationTarget còn sống → _currentEnemy = nó, xoá pending
    else:
        quét _activeMonsters, tách nhóm "khác type" / "cùng type"
        ưu tiên chọn gần nhất trong nhóm khác-type; rỗng thì chọn gần nhất nhóm cùng-type
```

**Trả đũa**: trong `MonsterHealth.TakeDamage(amount, source)`, nếu nạn nhân **không** có `_currentEnemy`
(đang rảnh) → `_pendingRetaliationTarget = source`. Nếu đang giao chiến sẵn với ai đó, bị nguồn khác đánh
trúng (vd miểng bom) → bỏ qua, không đổi target.

**Melee vs Bomb** (trong lúc chase `_currentEnemy`):
```
distance = khoảng cách phẳng tới target
if distance <= AttackRange   → EnterMeleeAttack (như UpdateAttack hiện tại)
elif distance <= BombRange   → EnterBombStance: đứng yên, quay mặt, cứ BombCooldown giây ném 1 quả
else                          → UpdateChase (chạy tới, như hiện tại)
```
BombStance tự chuyển sang Melee nếu địch tiến vào `AttackRange`; tự quay lại Chase nếu địch lùi ra ngoài
`BombRange`.

**Knockback/Stagger** (`MonsterHealth`): `TakeDamage` gây damage không chết → đẩy lùi theo hướng ngược
nguồn damage, khoảng cách theo API `ApplyCrowdControl(knockbackDistance, duration)`, set `IsStaggered =
true` trong `duration`:
- `MonsterCombat` tạm dừng đếm cooldown / không vào đòn mới.
- `Monster` tạm dừng wander/chase.
- Hết `duration` → resume state trước đó, vẫn cùng target.
- Bỏ qua hoàn toàn nếu nạn nhân đang `IsAnySkillChanneling` (xem mục 1).

`ApplyCrowdControl` dùng chung cho cả knockback thường (`distance = KnockbackForce`) lẫn stun đứng yên của
skill (`distance = 0`).

### 4. Chi tiết 5 skill

Mỗi skill implement `IMonsterSkill`, đọc số liệu từ `MonsterStatsTable`, tự quản lý cooldown/điều kiện bên
trong nó — `Monster`/`MonsterCombat` không switch-case theo loại quái, chỉ lặp gọi `Tick()`.

`MonsterHealth` cần thêm API dùng chung: `ApplyCrowdControl(knockbackDistance, duration)`,
`ApplyPoison(dmgPerTick, tickInterval, duration)` (DOT, refresh không stack), `Heal(amount)`,
`IncreaseMaxHealth(amount, healSameAmount)`. `Monster` cần thêm `PlayKnockUp(height, duration)` (tween vị
trí thuần Update, không physic) để component khác (skill Golem) gọi lên target.

**Enderman — `EndermanArmReachSkill`**: hết `ArmReachCooldown` + target trong `ArmReachRange` + không skill
nào khác đang channel → channel `ArmReachDuration` (~2s), VFX tay dài hướng target. Giữa thời lượng (tay
duỗi hết cỡ) check target còn trong tầm/hướng → `ArmReachDamage` + `ApplyCrowdControl(0,
ArmReachStunDuration)`. Hết channel, reset cooldown.

**Enderman — `EndermanTeleportSkill`**: hết `TeleportCooldown` → channel: dịch chuyển tức thời 2 điểm ngẫu
nhiên quanh target (bán kính `TeleportRadius`, cách nhau `TeleportStepDelay`), rồi dịch chuyển lần 3 vào
`AttackRange`, quay mặt, gây `TeleportFinalAttackDamage` ngay. Trong lúc channel, state machine chính khoá.

**Iron Golem — `IronGolemSlamSkill`**: hết `SlamCooldown` + target trong `AttackRange` → channel: tại thời
điểm va chạm gây `SlamDamage`, gọi `target.PlayKnockUp(SlamLaunchHeight, SlamAirTime)`, đồng thời
`ApplyCrowdControl(0, SlamAirTime + SlamStunDuration)` trên target (khoá hành động suốt lúc bay + choáng
sau khi rơi).

**Creeper — `CreeperPoisonSkill`**: hết `PoisonCooldown` + target trong `AttackRange` → gọi
`target.ApplyPoison(PoisonDamagePerTick, PoisonTickInterval, PoisonDuration)`, không gây damage tức thời
riêng. Đòn melee thường của Creeper vẫn chạy song song theo cooldown riêng — skill là hành động cộng thêm,
không thay thế.

**Huggy — `HuggyRegenSkill`**: không cooldown/target/channel — mỗi `RegenTickInterval` giây tự
`Heal(RegenPerTick)`, chạy liên tục kể cả lúc idle/chase/bị stagger, dừng khi chết.

**Shinsonic — `ShinsonicTransformSkill`**: theo dõi `CurrentHealth / MaxHealth` mỗi frame. Lần đầu tụt ≤
`TransformStage1HpThreshold` (và chưa transform stage 1) → channel ngắn (CC-immune), `IncreaseMaxHealth
(TransformStage1BonusMaxHealth, true)` + cộng `TransformStage1BonusDamage` vào melee damage, đổi visual
Phase 2. Tụt tiếp ≤ `TransformStage2HpThreshold` (tính trên MaxHealth mới) → tương tự với bộ số Stage2, đổi
visual Phase 3/4. Mỗi mốc kích hoạt đúng 1 lần/trận.

### 5. Animator hook

Giữ đúng convention hiện tại: mỗi param animator = 1 string field + cờ `IsTrigger` trên đúng component sở
hữu hành động đó, cache hash ở `Awake`, set qua `SafeSetAnimatorBool/Trigger` (bọc try/catch). Mọi field
đều optional — để trống thì fallback dùng lại trigger Attack có sẵn (không bắt buộc có anim riêng ngay).

- `MonsterHealth`: `_hitReactTrigger` (bắn 1 lần lúc CC bắt đầu) + `_stunnedBool` (giữ true suốt
  `IsStaggered`, dùng chung cho cả knockback thường lẫn stun skill — khớp sẵn clip
  `animation.menderman.stunned` của Enderman).
- `MonsterCombat`: `_throwBombTrigger`.
- Từng skill: `_armReachTrigger`, `_teleportTrigger`, `_slamTrigger`, `_poisonTrigger` (để trống = im lặng,
  không cần anim riêng), `_transformStage1Trigger`, `_transformStage2Trigger`.

### 6. Error handling

- `MonsterStatsTable` thiếu entry đúng `MonsterType` → log lỗi, dùng 1 entry "default" an toàn dự phòng
  (giá trị hiện đang hardcode trong `Monster.cs`) thay vì NaN/crash.
- `MonsterProjectile` va chạm khi target đã chết/despawn giữa đường bay → bỏ qua damage, vẫn nổ VFX tại
  điểm va chạm, trả pool bình thường.
- Thiếu component skill trên prefab (vd Golem thiếu `IronGolemSlamSkill`) → không lỗi, quái đó đơn giản
  không có skill đó (mảng rỗng), common actions vẫn chạy đủ.
- Log tag riêng theo component: `[MONSTER COMBAT]`, `[MONSTER HEALTH]`, `[MONSTER SKILL]`,
  `[MONSTER PROJECTILE]` — nối tiếp style log hiện có.

### 7. Tối ưu hiệu năng cho build Luna (playable ads)

1. **Zero-alloc trong Update**: mọi cooldown/tick (skill, poison, regen, bomb) dùng `float` đếm lùi trong
   `Update()` như code hiện tại — không `StartCoroutine` cho tick lặp, không LINQ trong hot path.
2. **Knockback/launch lerp thủ công** (không DOTween) — xảy ra rất thường xuyên khi nhiều quái đánh nhau,
   tạo `Tween` mới mỗi lần sẽ dồn alloc. DOTween chỉ giữ cho hiệu ứng hiếm khi xảy ra (spawn scale, như
   hiện tại).
3. **Pooling triệt để, không `Instantiate`/`Destroy` runtime**: mở rộng pattern `_spawnVfxInstance` (tạo 1
   lần, `SetActive` + `Play()` lại) cho VFX tay dài, teleport puff, nổ bom, transform Sonic. Quả bom dùng 1
   pool dùng chung mọi loại quái (như `_vfxPool` trong `GameController`), không pool riêng theo từng con.
4. **Animator**: cache hash mọi param mới ở `Awake`, không gọi `SetTrigger/SetBool` bằng string trực tiếp ở
   runtime.
5. **`GetComponents<IMonsterSkill>()` chỉ gọi 1 lần ở `Awake`**, cache mảng, không query lại mỗi frame.
6. **Không thêm chi phí target-scan**: giữ nguyên quét O(n) trên `_activeMonsters` (giới hạn 12 quái qua
   `_maxMonster`), chỉ quét lại khi target chết — không cần spatial-partition.
7. **Giảm chi phí log ở build thật**: log debug chi tiết bọc qua `MonsterDebug.Log(...)` có check bool
   trước khi format string, tránh alloc string mỗi frame khi log tắt (thay vì rải `Debug.Log($"...")` trực
   tiếp như một số chỗ hiện tại).
8. **Khuyến nghị nội dung (ngoài code)**: VFX mới nên giới hạn số particle/độ dài để nhẹ khi chạy trong
   WebView — note lại cho bên làm VFX.

## Testing

Không có hạ tầng test tự động trong repo (không `Tests`/`.asmdef`) — kiểm thử bằng playtest thủ công:

- Thêm `[ContextMenu]` debug trên `Monster`/skill (vd "Force Trigger Skill", "Force Damage 10") để không
  phải chờ cooldown/HP tụt tự nhiên.
- Checklist: ưu tiên khác loại trước cùng loại; trả đũa đúng nguồn khi đang rảnh; không đổi target khi đang
  giao chiến dù bị nguồn khác đánh trúng; trúng đòn → đẩy lùi + khoá tấn công đúng `KnockbackDuration`;
  từng skill đúng hiệu ứng/cooldown; Shinsonic biến hình đúng 2 mốc, không lặp mốc đã qua; Huggy hồi máu
  liên tục kể cả lúc không đánh nhau; đổi số trong `MonsterStatsTable` ảnh hưởng ngay không cần sửa prefab.
