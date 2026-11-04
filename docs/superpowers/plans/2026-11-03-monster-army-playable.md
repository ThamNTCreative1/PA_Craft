# Monster Army Playable — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Dựng playable ad "Monster Army" cho SSPGame — tap thêm quái, kéo thả xếp đội hình, đánh boss bất tử, hết 30 giây thì hiện CTA.

**Architecture:** Logic thuần C# (sàn máu boss, lưới đặt quái, bậc hỗn loạn, máy trạng thái tutorial) nằm trong assembly riêng `Playable.MonsterArmy.Core` — không phụ thuộc MonoBehaviour nên unit test được bằng EditMode. Tầng trình diễn (MonoBehaviour, UI, VFX) nằm trong `Assembly-CSharp` và tự động tham chiếu được Core. Scene dựng hoàn toàn bằng Editor script qua menu item, theo đúng quy ước `HideSeekSetup.cs` đã có trong repo.

**Tech Stack:** Unity 6000.0.60f1 · Luna Playground 7.2.0 · DOTween · TextMeshPro · Unity Test Framework 1.6.0 · SpriteRenderer (orthographic 2D) + uGUI overlay

**Spec:** `docs/superpowers/specs/2026-11-03-monster-army-playable-design.md`

---

## Global Constraints

- Unity **6000.0.60f1**. Editor tại `C:\Program Files\Unity Hub\6000.0.60f1\Editor\Unity.exe`.
- **Không commit.** Người dùng tự quản lý git. Mọi task kết thúc bằng bước xác minh, không phải `git commit`.
- Namespace: logic thuần → `Playable.MonsterArmy.Core`; MonoBehaviour → `Playable.MonsterArmy`; Editor → `Playable.MonsterArmy.EditorTools`.
- Thư mục gốc: `Assets/_Playable_/MonsterArmy/`.
- Trường inspector khai báo **chỉ `[SerializeField]`** — không thêm `[TabGroup]`, người dùng tự sắp xếp tab.
- **Không sửa `Assets/_Playable_/Scripts/Manager/GameManager.cs`.**
- Scene đích: `Assets/_Playable_/Scenes/Gameplay.unity` — **dọn sạch mọi root cũ** rồi dựng lại. Khôi phục được bằng `git checkout -- Assets/_Playable_/Scenes/Gameplay.unity` (đã commit tại `eb0aeb802`).
- Giá trị chốt từ spec: `_endTime = 30`, `_tapToCtaMode = false`, `_minHealthPercent = 0.10f`, telegraph skill boss `0.6s`, trần nổ đồng thời `32`, tutorial nhấn mạnh sau `4s` và tự hoàn thành sau `8s`, hero hồi sinh sau `2s`.
- Nguồn asset: `D:\Exploitable Resources\SSPGame\SSPGame`. **Không** dùng Epic Toon FX / Polygon Arsenal / Pixel Arsenal.
- 5 loại quái: `Brute`, `Gunner`, `Bomber`, `Laser`, `Tank`.
- Bậc hỗn loạn theo số quái sống: `1–4` / `5–9` / `10–17` / `18+`.

### Cách chạy test

Unity Editor **đang mở** và giữ lockfile `Temp/UnityLockfile`. Hai cách, chọn một:

- **Trong Editor** (ưu tiên khi Editor đang mở): `Window > General > Test Runner > EditMode > Run All`.
- **CLI** (phải đóng Editor trước):
  ```
  "C:\Program Files\Unity Hub\6000.0.60f1\Editor\Unity.exe" -batchmode -projectPath "D:\Source\PA_Craft" -runTests -testPlatform EditMode -testResults "D:\Source\PA_Craft\Temp\TestResults.xml" -logFile -
  ```
  Kết quả đọc trong `Temp/TestResults.xml` (`<test-run ... failed="0">`).

Mỗi bước "Run test" dưới đây ghi tên test; dùng một trong hai cách trên.

---

## Review Focus

Năm tình huống spec hàm ý nhưng không mô tả trực tiếp, dễ gây lỗi cho người chơi thật. Mỗi dòng đã được gắn test vào task sở hữu đoạn code đó.

1. **Lưới đầy, người chơi vẫn tap thêm quái.** Phải bỏ qua và báo hiệu, không được chồng hai unit lên một ô hay ném exception. → Task 2.
2. **Boss đã ở sàn máu, tiếp tục nhận sát thương.** Máu không bao giờ xuống dưới sàn, không âm, thanh máu không nháy về 0. → Task 3.
3. **Roar hút máu khi không có xác quái nào.** Hồi 0, không NaN, không vượt máu tối đa. → Task 3.
4. **Tutorial hết giờ tự hoàn thành đúng lúc người chơi đang kéo dở một con quái.** Không được giật unit khỏi tay người chơi. → Task 5.
5. **Tỉ lệ màn hình cực đoan** (landscape rất rộng hoặc portrait rất cao). Toàn bộ lưới đặt quái và boss phải nằm trong khung nhìn. → Task 11.

---

## Cấu trúc file

```
Assets/_Playable_/MonsterArmy/
├── Core/                                  ← asmdef riêng, unit test được
│   ├── Playable.MonsterArmy.Core.asmdef
│   ├── PlacementGrid.cs       ô lưới, chiếm chỗ, tìm ô trống gần nhất
│   ├── BossHealthModel.cs     sàn máu, giảm sát thương, hút máu
│   ├── ChaosTier.cs           bậc hỗn loạn theo số quái sống
│   ├── MonsterKind.cs         enum 5 loại + bảng chỉ số
│   └── TutorialFlow.cs        máy trạng thái 3 bước + chốt thời gian
├── Tests/
│   ├── Playable.MonsterArmy.Tests.asmdef
│   ├── PlacementGridTests.cs
│   ├── BossHealthModelTests.cs
│   ├── ChaosTierTests.cs
│   └── TutorialFlowTests.cs
├── Scripts/                               ← Assembly-CSharp
│   ├── MonsterArmyController.cs  nhạc trưởng, nối Core với scene và GameManager
│   ├── MonsterRig.cs             ghép paper-doll + hoạt hoạ bằng code
│   ├── MonsterUnit.cs            máu, tiến lên, đánh, chết
│   ├── BossUnit.cs               boss + 3 skill có telegraph
│   ├── ExplosionPool.cs          pool SpriteRenderer chạy chuỗi frame
│   ├── ChaosDirector.cs          rung camera + ngân sách VFX theo bậc
│   ├── MonsterHotbar.cs          thanh chọn quái, tap để thả
│   ├── DragPlacer.cs             kéo để sắp lại vị trí
│   ├── TutorialDirector.cs       lớp khoá + bàn tay, chạy TutorialFlow
│   └── BossHealthBar.cs          thanh máu boss
├── Editor/
│   ├── SpriteSheetSlicer.cs      auto-slice sprite sheet
│   └── MonsterArmySetup.cs       dựng toàn bộ scene
├── Art/                                   ← sprite đã slice
└── Audio/                                 ← .ogg đã convert
```

---

### Task 1: Chuẩn bị asset — slice sprite và convert audio

Không có task nào chạy được nếu chưa có sprite và âm thanh ở định dạng Unity đọc được. Spec mục 3.1 và 3.2.

**Files:**
- Create: `Assets/_Playable_/MonsterArmy/Editor/SpriteSheetSlicer.cs`
- Create: `Assets/_Playable_/MonsterArmy/Art/` (sprite copy từ nguồn)
- Create: `Assets/_Playable_/MonsterArmy/Audio/` (ogg đã convert)

**Interfaces:**
- Produces: menu item `Tools/Monster Army/Slice Sprite Sheets`; sprite đặt tên `<sheet>_<index>` truy cập được qua `AssetDatabase.LoadAllAssetsAtPath`.

- [ ] **Step 1: Copy sprite sheet cần dùng vào `Art/`**

Từ `D:\Exploitable Resources\SSPGame\SSPGame\images\`: `buttonitem-sheet0.png`, `head-sheet0.png`, `zhead-sheet0.png`, `body-sheet0.png`, `zbody-sheet0.png`, `armor-sheet0.png`, `helmet-sheet0.png`, `hand_left-sheet0.png`, `hand_right-sheet0.png`, `foot_left-sheet0.png`, `sprite17-sheet0.png`, `sprite32-sheet0.png`, `minifireworks-sheet0.png`, `tiledbackground-sheet0.png`, `ground-sheet0.png`.

- [ ] **Step 2: Viết `SpriteSheetSlicer.cs`**

Menu item `[MenuItem("Tools/Monster Army/Slice Sprite Sheets")]`. Với mỗi sheet, đặt `TextureImporter`: `textureType = Sprite`, `spriteImportMode = Multiple`, `filterMode = Point`, `mipmapEnabled = false`, `maxTextureSize = 2048`, `spritePixelsPerUnit = 32`.

Hai chế độ slice, chọn theo sheet:
- **Grid**: `buttonitem-sheet0` (ô 100×100, 10 cột), `sprite17-sheet0` (ô 205×205, 5 cột).
- **Auto-detect vùng alpha**: tất cả sheet bộ phận nhân vật. Dùng `InternalSpriteUtility.GenerateAutomaticSpriteRectangles(texture, minSize: 4, extrude: 0)`, lọc bỏ rect nhỏ hơn 6×6 px (nhiễu), sắp xếp theo `y` giảm dần rồi `x` tăng dần để thứ tự ổn định giữa các lần chạy.

Ghi rect vào `importer.spritesheet` và gọi `SaveAndReimport()`.

- [ ] **Step 3: Chạy slice và kiểm bằng mắt**

Run: menu `Tools/Monster Army/Slice Sprite Sheets`
Expected: `buttonitem-sheet0` ra đúng 100+ sprite icon rời; `sprite17-sheet0` ra 15 frame nổ liên tục; các sheet bộ phận ra từng mảnh rời không dính nhau.

Mở từng sheet trong Sprite Editor xem lại. Sheet nào sai thì chỉnh tay và ghi lại trong bình luận đầu file sheet đó bị loại khỏi auto-slice.

- [ ] **Step 4: Convert âm thanh**

Cài ffmpeg nếu chưa có: `winget install Gyan.FFmpeg`

Convert 12 file từ `D:\Exploitable Resources\SSPGame\SSPGame\media\` sang `Audio/` dạng `.ogg` mono:
`ClickSound`, `AddItem`, `Ak47Shoot`, `AxeHit`, `LaserGun`, `Grinade`, `GrinadeBoom1`, `EnemyGetDamage`, `BoxDestroy`, `Kick`, `FireWorks`, `Erise`

```
ffmpeg -i "<src>.webm" -vn -ac 1 -c:a libvorbis -q:a 3 "<dst>.ogg"
```

Nếu không cài được ffmpeg: dùng phương án dự phòng ở spec mục 3.1 — `explosion.wav`, `monster-roar_8.wav`, `earthquake-1-big.wav` đã có trong `Assets/_Playable_/`. Ghi rõ lựa chọn đã dùng vào đầu `MonsterArmySetup.cs`.

- [ ] **Step 5: Xác minh**

Expected: `Assets/_Playable_/MonsterArmy/Audio/` chứa file Unity import được (Inspector hiện waveform, không báo lỗi); Console không có lỗi import.

---

### Task 2: `PlacementGrid` — lưới đặt quái

**Files:**
- Create: `Assets/_Playable_/MonsterArmy/Core/Playable.MonsterArmy.Core.asmdef`
- Create: `Assets/_Playable_/MonsterArmy/Core/PlacementGrid.cs`
- Create: `Assets/_Playable_/MonsterArmy/Tests/Playable.MonsterArmy.Tests.asmdef`
- Test: `Assets/_Playable_/MonsterArmy/Tests/PlacementGridTests.cs`

**Interfaces:**
- Produces:
  ```csharp
  namespace Playable.MonsterArmy.Core
  {
      public sealed class PlacementGrid
      {
          public PlacementGrid(int columns, int rows);
          public int Columns { get; }
          public int Rows { get; }
          public int OccupiedCount { get; }
          public bool IsFull { get; }
          public bool TryOccupyNearestFree(int preferredColumn, int preferredRow, out int column, out int row);
          public bool TryOccupy(int column, int row);
          public void Release(int column, int row);
          public bool IsOccupied(int column, int row);
          public bool TryMove(int fromColumn, int fromRow, int toColumn, int toRow);
      }
  }
  ```

- [ ] **Step 1: Tạo hai asmdef**

`Playable.MonsterArmy.Core.asmdef`: `"name": "Playable.MonsterArmy.Core"`, `"autoReferenced": true` (để `Assembly-CSharp` dùng được), không có reference nào.

`Playable.MonsterArmy.Tests.asmdef`: `"name": "Playable.MonsterArmy.Tests"`, `"references": ["Playable.MonsterArmy.Core"]`, `"includePlatforms": ["Editor"]`, `"precompiledReferences": ["nunit.framework.dll"]`, `"overrideReferences": true`, `"defineConstraints": ["UNITY_INCLUDE_TESTS"]`.

- [ ] **Step 2: Viết test thất bại**

```csharp
[Test] public void NewGrid_HasNothingOccupied()
[Test] public void TryOccupy_MarksCellOccupied()
[Test] public void TryOccupy_SameCellTwice_ReturnsFalse()
[Test] public void TryOccupyNearestFree_PreferredCellFree_ReturnsPreferred()
[Test] public void TryOccupyNearestFree_PreferredCellTaken_ReturnsAdjacentCell()
[Test] public void Release_MakesCellAvailableAgain()
[Test] public void TryMove_ToFreeCell_MovesOccupancy()
[Test] public void TryMove_ToOccupiedCell_ReturnsFalseAndLeavesBothUnchanged()

// Review Focus #1 — lưới đầy
[Test] public void TryOccupyNearestFree_OnFullGrid_ReturnsFalseAndDoesNotThrow()
[Test] public void IsFull_AfterOccupyingEveryCell_IsTrue()
[Test] public void TryOccupy_OutOfRangeIndex_ReturnsFalse()
```

Lưới dùng trong test: `new PlacementGrid(6, 4)` → 24 ô, khớp gợi ý spec mục 6.

"Ô trống gần nhất" đo bằng khoảng cách Chebyshev từ ô mong muốn, hoà thì ưu tiên hàng nhỏ hơn rồi cột nhỏ hơn — cố định thứ tự để test ổn định.

- [ ] **Step 3: Chạy test, xác nhận thất bại**

Run: EditMode `PlacementGridTests`
Expected: FAIL — `PlacementGrid` chưa tồn tại

- [ ] **Step 4: Implement `PlacementGrid`**

Lưu chiếm chỗ bằng `bool[,]`. `TryOccupyNearestFree` quét vòng xoắn ốc mở rộng từ ô mong muốn.

- [ ] **Step 5: Chạy test, xác nhận đạt**

Run: EditMode `PlacementGridTests`
Expected: PASS, 11/11

---

### Task 3: `BossHealthModel` — sàn máu và hút máu

Trái tim của yêu cầu "boss không bao giờ chết". Spec mục 4.2.

**Files:**
- Create: `Assets/_Playable_/MonsterArmy/Core/BossHealthModel.cs`
- Test: `Assets/_Playable_/MonsterArmy/Tests/BossHealthModelTests.cs`

**Interfaces:**
- Produces:
  ```csharp
  namespace Playable.MonsterArmy.Core
  {
      public sealed class BossHealthModel
      {
          public BossHealthModel(float maxHealth, float minHealthPercent = 0.10f);
          public float MaxHealth { get; }
          public float Current { get; }
          public float Percent { get; }          // 0..1
          public float FloorPercent { get; }
          public bool IsAtFloor { get; }          // Percent <= FloorPercent + epsilon
          public float ApplyDamage(float rawDamage);     // trả về sát thương thực sự trừ
          public float Drain(int corpseCount, float healthPerCorpse);  // trả về lượng hồi thực tế
      }
  }
  ```

- [ ] **Step 1: Viết test thất bại**

```csharp
[Test] public void FreshBoss_IsAtFullHealth()
[Test] public void ApplyDamage_AboveFloor_SubtractsFullAmount()
[Test] public void ApplyDamage_NearFloor_SubtractsLessThanRaw()
[Test] public void ApplyDamage_ReturnsAmountActuallySubtracted()

// Review Focus #2 — đã ở sàn mà vẫn ăn đòn
[Test] public void ApplyDamage_AtFloor_NeverDropsBelowFloor()
[Test] public void ApplyDamage_AtFloor_CurrentStaysPositive()
[Test] public void ApplyDamage_HugeAmount_ClampsToFloorNotZero()
[Test] public void ApplyDamage_NegativeAmount_IsIgnored()

// Review Focus #3 — hút máu không có xác
[Test] public void Drain_WithZeroCorpses_HealsNothing()
[Test] public void Drain_WithZeroCorpses_LeavesCurrentFinite()
[Test] public void Drain_CannotExceedMaxHealth()
[Test] public void Drain_AfterDamage_RaisesPercent()
```

Đường cong giảm sát thương (spec mục 6 để hở, chốt ở đây để test xác định được): sát thương thực = `rawDamage * headroom` với `headroom = (Percent - FloorPercent) / (1 - FloorPercent)`, kẹp trong `[0.05, 1]`. Sàn 0.05 giữ cho thanh máu vẫn nhúc nhích ở cực hạn, tránh cảm giác đứng hình.

- [ ] **Step 2: Chạy test, xác nhận thất bại**

Run: EditMode `BossHealthModelTests`
Expected: FAIL — `BossHealthModel` chưa tồn tại

- [ ] **Step 3: Implement `BossHealthModel`**

- [ ] **Step 4: Chạy test, xác nhận đạt**

Run: EditMode `BossHealthModelTests`
Expected: PASS, 12/12

---

### Task 4: `ChaosTier` và `MonsterKind`

**Files:**
- Create: `Assets/_Playable_/MonsterArmy/Core/ChaosTier.cs`
- Create: `Assets/_Playable_/MonsterArmy/Core/MonsterKind.cs`
- Test: `Assets/_Playable_/MonsterArmy/Tests/ChaosTierTests.cs`

**Interfaces:**
- Produces:
  ```csharp
  namespace Playable.MonsterArmy.Core
  {
      public enum MonsterKind { Brute, Gunner, Bomber, Laser, Tank }

      public readonly struct MonsterStats
      {
          public MonsterStats(float health, float damage, float moveSpeed, float attackRange, float attackInterval);
          public float Health { get; } public float Damage { get; }
          public float MoveSpeed { get; } public float AttackRange { get; }
          public float AttackInterval { get; }
          public static MonsterStats For(MonsterKind kind);
      }

      public readonly struct ChaosLevel
      {
          public float ShakeAmplitude { get; }
          public int MaxConcurrentExplosions { get; }
          public bool ShowComboText { get; }
          public bool ScreenFlash { get; }
          public bool BurningBorder { get; }
      }

      public static class ChaosTier
      {
          public const int MaxConcurrentExplosionsCap = 32;
          public static ChaosLevel ForLiveMonsters(int liveCount);
      }
  }
  ```

- [ ] **Step 1: Viết test thất bại**

```csharp
[TestCase(0)] [TestCase(1)] [TestCase(4)]
public void Tier1_HasSixExplosionsAndNoComboText(int live)
[TestCase(5)] [TestCase(9)]  public void Tier2_HasFourteenExplosionsAndComboText(int live)
[TestCase(10)] [TestCase(17)] public void Tier3_HasTwentyFourExplosionsAndFlash(int live)
[TestCase(18)] [TestCase(500)] public void Tier4_HasBurningBorder(int live)
[Test] public void ExplosionBudget_NeverExceedsCap()
[Test] public void ShakeAmplitude_IncreasesMonotonicallyWithLiveCount()
[Test] public void ForLiveMonsters_NegativeCount_ReturnsTier1()
[Test] public void MonsterStats_EveryKindHasPositiveHealthAndDamage()
[Test] public void MonsterStats_TankHasHighestHealth()
[Test] public void MonsterStats_GunnerOutrangesBrute()
```

Giá trị lấy nguyên từ bảng spec mục 4.3: nổ đồng thời `6 / 14 / 24 / 32`.

- [ ] **Step 2: Chạy test, xác nhận thất bại**

Run: EditMode `ChaosTierTests`
Expected: FAIL

- [ ] **Step 3: Implement `ChaosTier` và `MonsterKind`**

Chỉ số khởi điểm (spec mục 6 cho phép chỉnh khi chơi thử — tiêu chí: một đợt quái sống đủ lâu để gặm thấy rõ máu boss nhưng chết đủ nhanh để phải thả thêm):

| Kind | Health | Damage | MoveSpeed | AttackRange | AttackInterval |
|---|---|---|---|---|---|
| Brute | 60 | 12 | 2.2 | 0.8 | 0.6 |
| Gunner | 35 | 7 | 1.8 | 5.0 | 0.4 |
| Bomber | 40 | 22 | 1.6 | 3.5 | 1.4 |
| Laser | 30 | 9 | 1.7 | 6.5 | 0.9 |
| Tank | 180 | 5 | 1.2 | 0.9 | 1.0 |

- [ ] **Step 4: Chạy test, xác nhận đạt**

Run: EditMode `ChaosTierTests`
Expected: PASS, 15/15

---

### Task 5: `TutorialFlow` — máy trạng thái 3 bước

**Files:**
- Create: `Assets/_Playable_/MonsterArmy/Core/TutorialFlow.cs`
- Test: `Assets/_Playable_/MonsterArmy/Tests/TutorialFlowTests.cs`

**Interfaces:**
- Produces:
  ```csharp
  namespace Playable.MonsterArmy.Core
  {
      public enum TutorialStep { Intro, TapToAdd, DragToPlace, PressStart, Done }

      public sealed class TutorialFlow
      {
          public TutorialFlow(float introSeconds = 1.5f, float emphasisAfter = 4f, float autoCompleteAfter = 8f);
          public TutorialStep Current { get; }
          public bool IsEmphasised { get; }
          public bool IsLocked { get; }            // false khi Current == Done
          public bool IsInteractionInProgress { get; set; }
          public void Tick(float deltaTime);
          public void NotifyMonsterAdded();
          public void NotifyMonsterPlaced();
          public void NotifyStartPressed();
      }
  }
  ```

- [ ] **Step 1: Viết test thất bại**

```csharp
[Test] public void StartsAtIntro()
[Test] public void Intro_AdvancesToTapAfterIntroSeconds()
[Test] public void TapToAdd_AdvancesOnMonsterAdded()
[Test] public void DragToPlace_AdvancesOnMonsterPlaced()
[Test] public void PressStart_AdvancesToDoneOnStartPressed()
[Test] public void Done_IsNotLocked()
[Test] public void Emphasis_TurnsOnAfterFourSecondsIdle()
[Test] public void Emphasis_ResetsWhenStepAdvances()
[Test] public void Step_AutoCompletesAfterEightSeconds()
[Test] public void NotifyOutOfOrder_DoesNotSkipSteps()

// Review Focus #4 — hết giờ đúng lúc đang kéo
[Test] public void AutoComplete_DoesNotFireWhileInteractionInProgress()
[Test] public void AutoComplete_FiresOnceInteractionEnds()
```

- [ ] **Step 2: Chạy test, xác nhận thất bại**

Run: EditMode `TutorialFlowTests`
Expected: FAIL

- [ ] **Step 3: Implement `TutorialFlow`**

`Tick` cộng dồn thời gian trong bước hiện tại. Khi `IsInteractionInProgress == true` thì **ngừng cộng** — người chơi đang kéo dở là đang tương tác, không được tính là bỏ bê.

- [ ] **Step 4: Chạy test, xác nhận đạt**

Run: EditMode `TutorialFlowTests`
Expected: PASS, 12/12

---

### Task 6: `MonsterRig` — ghép paper-doll và hoạt hoạ bằng code

Từ đây là tầng trình diễn, xác minh bằng mắt chứ không bằng unit test. Spec mục 5.2.

**Files:**
- Create: `Assets/_Playable_/MonsterArmy/Scripts/MonsterRig.cs`

**Interfaces:**
- Consumes: `MonsterKind` (Task 4); sprite đã slice (Task 1)
- Produces:
  ```csharp
  namespace Playable.MonsterArmy
  {
      public sealed class MonsterRig : MonoBehaviour
      {
          public void Build(MonsterKind kind, int variantSeed, bool isMonsterSkin);
          public void SetWalking(bool walking);
          public void PlayAttack();
          public void PlayDeath(System.Action onComplete);
          public void SetSortingOrder(int order);
          public Transform WeaponAnchor { get; }
      }
  }
  ```

- [ ] **Step 1: Implement `MonsterRig`**

`Build` sinh cây `SpriteRenderer` con: `Body`, `Head`, `Armor`, `HandLeft`, `HandRight`, `FootLeft`, `FootRight` (chân phải là `FootLeft` lật trục X), `Weapon` gắn vào `WeaponAnchor`.

`isMonsterSkin == true` → lấy từ `zhead`/`zbody`, ngược lại `head`/`body`. `variantSeed` chọn chỉ số sprite bằng `new System.Random(variantSeed)` để cùng seed luôn ra cùng ngoại hình.

Hoạt hoạ **không dùng Animator, không tạo file `.anim`**:
- Đi: chân xoay `±18°` theo `Mathf.Sin(Time.time * 9f + phase)`, thân dịch dọc `±0.03` lệch pha nửa chu kỳ.
- Đánh: `PlayAttack` tween `WeaponAnchor` xoay `-70°` rồi về, tổng `0.18s`, `Ease.OutBack` (DOTween).
- Chết: xoay `90°` + mờ alpha về 0 trong `0.4s`, xong gọi `onComplete`.

`SetSortingOrder` gán cho mọi renderer con với độ lệch cố định theo lớp (chân 0, thân 1, giáp 2, tay 3, đầu 4, vũ khí 5) để thứ tự trong một con quái luôn đúng.

- [ ] **Step 2: Xác minh bằng mắt**

Tạo một scene nháp, gọi `Build` với cả 5 `MonsterKind` × 4 `variantSeed`, bật `SetWalking(true)`.
Expected: 20 con quái khác ngoại hình rõ rệt, chân đung đưa tự nhiên, không mảnh nào lệch khớp hay đè sai lớp. Gọi `PlayAttack` thấy vung vũ khí; `PlayDeath` thấy ngã và mờ dần.

Xoá scene nháp sau khi kiểm xong.

---

### Task 7: `MonsterUnit` — hành vi chiến đấu

**Files:**
- Create: `Assets/_Playable_/MonsterArmy/Scripts/MonsterUnit.cs`

**Interfaces:**
- Consumes: `MonsterStats.For(kind)` (Task 4), `MonsterRig` (Task 6)
- Produces:
  ```csharp
  namespace Playable.MonsterArmy
  {
      public sealed class MonsterUnit : MonoBehaviour
      {
          public MonsterKind Kind { get; }
          public bool IsAlive { get; }
          public event System.Action<MonsterUnit> OnDied;
          public void Spawn(MonsterKind kind, int variantSeed, Vector3 position, BossUnit target);
          public void TakeDamage(float amount);
          public void Despawn();
      }
  }
  ```

- [ ] **Step 1: Implement `MonsterUnit`**

Mỗi frame: nếu khoảng cách tới boss `> AttackRange` thì tiến về boss với `MoveSpeed` và `_rig.SetWalking(true)`; ngược lại dừng, và cứ mỗi `AttackInterval` thì `_rig.PlayAttack()` + gây `Damage` lên boss + sinh VFX theo loại (bảng spec mục 5.4).

`sortingOrder = -Mathf.RoundToInt(transform.position.y * 100f)` cập nhật trong `LateUpdate` (spec mục 5.1).

Chết: `_rig.PlayDeath` rồi bắn `OnDied`, đẩy về pool.

- [ ] **Step 2: Xác minh bằng mắt**

Đặt 5 con, mỗi loại một con, trước một boss giả có thanh máu debug.
Expected: Gunner và Laser dừng xa hơn Brute và Tank; Bomber ném theo vòng cung; thanh máu boss giả tụt; quái đứng dưới che quái đứng trên.

---

### Task 8: `ExplosionPool` và `ChaosDirector`

Spec mục 4.3 và 5.3.

**Files:**
- Create: `Assets/_Playable_/MonsterArmy/Scripts/ExplosionPool.cs`
- Create: `Assets/_Playable_/MonsterArmy/Scripts/ChaosDirector.cs`

**Interfaces:**
- Consumes: `ChaosTier.ForLiveMonsters` (Task 4); sprite `sprite17-sheet0` 15 frame (Task 1)
- Produces:
  ```csharp
  namespace Playable.MonsterArmy
  {
      public enum ExplosionSize { Small, Medium, Large }

      public sealed class ExplosionPool : MonoBehaviour
      {
          public void Prewarm(int count);
          public bool TrySpawn(Vector3 position, ExplosionSize size, Color tint);
          public int ActiveCount { get; }
          public int Budget { get; set; }
      }

      public sealed class ChaosDirector : MonoBehaviour
      {
          public void SetLiveMonsterCount(int count);
          public void Shake(float multiplier);
          public void Flash();
      }
  }
  ```

- [ ] **Step 1: Implement `ExplosionPool`**

Pool `SpriteRenderer`, mỗi cái chạy 15 frame ở `18 fps` rồi tự trả về pool. `TrySpawn` trả `false` khi `ActiveCount >= Budget`; **khi đó gộp vào vụ nổ đang hoạt động gần nhất bằng cách phóng to nó lên 1.3×**, không sinh thêm object — đây là cách giữ trần 32 mà không làm mất cảm giác hoành tráng (spec mục 4.3).

`ExplosionSize` ánh xạ sang scale `0.5 / 1.0 / 1.8`.

- [ ] **Step 2: Implement `ChaosDirector`**

`SetLiveMonsterCount` gọi `ChaosTier.ForLiveMonsters` rồi áp `ShakeAmplitude` cho rung camera, gán `_explosionPool.Budget = level.MaxConcurrentExplosions`, bật/tắt combo text, screen flash, viền lửa theo cờ trả về.

Rung camera: dịch `transform.localPosition` theo nhiễu Perlin, tự tắt dần, **không bao giờ tích luỹ sai lệch** — lưu vị trí gốc lúc `Awake` và luôn cộng từ đó.

- [ ] **Step 3: Xác minh bằng mắt và bằng số**

Chạy scene nháp, ép `SetLiveMonsterCount` qua `0 → 5 → 12 → 25`, bắn liên tục 100 `TrySpawn` mỗi giây.
Expected: `ActiveCount` không bao giờ vượt `Budget` của bậc hiện tại; ở bậc 4 không vượt 32; khung hình giữ trên 50fps trong Game view; camera trở về đúng vị trí gốc khi ngừng rung.

---

### Task 9: `BossUnit` — boss và ba skill

Spec mục 5.5.

**Files:**
- Create: `Assets/_Playable_/MonsterArmy/Scripts/BossUnit.cs`
- Create: `Assets/_Playable_/MonsterArmy/Scripts/BossHealthBar.cs`

**Interfaces:**
- Consumes: `BossHealthModel` (Task 3), `MonsterRig` (Task 6), `ExplosionPool` + `ChaosDirector` (Task 8)
- Produces:
  ```csharp
  namespace Playable.MonsterArmy
  {
      public enum BossSkill { Stomp, FireballRain, Roar }

      public sealed class BossUnit : MonoBehaviour
      {
          public BossHealthModel Health { get; }
          public event System.Action<BossSkill> OnSkillTelegraphed;
          public event System.Action OnReachedFloor;
          public void Initialise(float maxHealth, System.Func<IReadOnlyList<MonsterUnit>> liveMonsters, System.Func<int> corpseCount);
          public void TakeDamage(float amount);
      }

      public sealed class BossHealthBar : MonoBehaviour
      {
          public void Bind(BossHealthModel model);
          public void PlayDangerPulse();
      }
  }
  ```

- [ ] **Step 1: Implement `BossUnit`**

Dựng bằng `MonsterRig` với `isMonsterSkin: true`, `localScale = 4f`.

Chu kỳ skill lặp `Stomp → FireballRain → Roar`, mỗi đòn có **telegraph 0.6s**: rig khựng lại, một `SpriteRenderer` viền đỏ sáng dần từ alpha 0 lên 1, phát âm báo, bắn `OnSkillTelegraphed`.

- **Stomp**: sóng xung kích quét ngang hàng quái gần nhất, `ChaosDirector.Shake(1.5f)`, nổ `Medium` rải theo đường sóng.
- **FireballRain**: 6 điểm rơi ngẫu nhiên trong vùng lưới, mỗi điểm nổ `Large` lệch pha `0.12s` — đòn sinh nhiều VFX nhất.
- **Roar**: hất quái văng ngược `1.5` đơn vị, **và gọi `Health.Drain(corpseCount(), healthPerCorpse)`** rồi phát hiệu ứng hút màu đỏ từ xác về boss. Đây là cơ chế giữ boss bất tử ở spec mục 4.2.2. `corpseCount` là delegate vì số xác thay đổi liên tục trong trận.

`TakeDamage` gọi `Health.ApplyDamage`; nếu `Health.IsAtFloor` thì bắn `OnReachedFloor`.

- [ ] **Step 2: Implement `BossHealthBar`**

`Bind` theo dõi `model.Percent` mỗi frame. `PlayDangerPulse` nháy thanh máu + rung + hiện chữ lớn *"Almost! Need more monsters!"* (spec mục 4.2.3).

- [ ] **Step 3: Xác minh bằng mắt**

Chạy với 10 quái tấn công liên tục trong 60 giây.
Expected: ba skill nhận ra được bằng mắt và khác nhau rõ; telegraph đủ lâu để kịp phản ứng; thanh máu tụt xuống vùng đỏ rồi **nhích lên lại sau mỗi Roar**; không bao giờ chạm 0; chữ "Almost!" hiện mỗi lần chạm sàn.

---

### Task 10: `MonsterHotbar`, `DragPlacer`, `TutorialDirector`

Spec mục 5.6 và 5.8.

**Files:**
- Create: `Assets/_Playable_/MonsterArmy/Scripts/MonsterHotbar.cs`
- Create: `Assets/_Playable_/MonsterArmy/Scripts/DragPlacer.cs`
- Create: `Assets/_Playable_/MonsterArmy/Scripts/TutorialDirector.cs`

**Interfaces:**
- Consumes: `PlacementGrid` (Task 2), `TutorialFlow` (Task 5), `MonsterUnit` (Task 7)
- Produces:
  ```csharp
  namespace Playable.MonsterArmy
  {
      public sealed class MonsterHotbar : MonoBehaviour
      {
          public event System.Action<MonsterKind> OnKindTapped;
          public void SetUnlockedSlots(int count);   // tutorial khoá còn 1 slot
          public void PulseSlot(int index, bool on);
      }

      public sealed class DragPlacer : MonoBehaviour
      {
          public event System.Action<MonsterUnit, int, int> OnUnitMoved;   // unit, column, row
          public bool IsDragging { get; }
          public void SetAllowedCell(int column, int row);   // (-1,-1) = mọi ô
      }

      public sealed class TutorialDirector : MonoBehaviour
      {
          public void Begin();
          public bool IsFinished { get; }
      }
  }
  ```

- [ ] **Step 1: Implement `MonsterHotbar`**

Thanh dọc các nút, icon lấy từ `buttonitem-sheet0` đã slice. Tap bắn `OnKindTapped`. `SetUnlockedSlots(1)` làm mờ và tắt raycast các slot còn lại.

- [ ] **Step 2: Implement `DragPlacer`**

Nhấn giữ một `MonsterUnit` trên sàn rồi kéo → unit bám theo `Camera.ScreenToWorldPoint`, ô lưới dưới ngón tay sáng lên. Thả → `PlacementGrid.TryMove`; nếu thất bại thì unit bật về chỗ cũ. `SetAllowedCell` khác `(-1,-1)` thì chỉ ô đó sáng và nhận thả.

`IsDragging` nối vào `TutorialFlow.IsInteractionInProgress`.

- [ ] **Step 3: Implement `TutorialDirector`**

Chạy `TutorialFlow`, gọi `Tick(Time.deltaTime)` mỗi frame và gán `_flow.IsInteractionInProgress = _dragPlacer.IsDragging`.

Khoá bằng **một `Image` trong suốt phủ toàn màn chặn raycast, khoét lỗ đúng vùng hợp lệ** — không dùng cách tắt `interactable` từng nút (spec mục 5.6 nói rõ lý do: cách đó bỏ sót vùng chạm trên sàn). Khoét lỗ bằng 4 `Image` con ghép thành khung chữ nhật quanh vùng cho phép.

Bàn tay dùng `Assets/_Playable_/TempleRun/UI/Sprites/hand.png` và quy ước tween trong `HandTutorial.cs`.

Chữ mỗi bước: Intro *"Choose your monsters!"* · TapToAdd *"Tap to add!"* · DragToPlace *"Drag to place!"* · PressStart *"Press Start and Fight!"*

Khi `IsEmphasised` → tay to lên 1.25× và thêm vòng sáng. Khi `Current == Done` → tắt toàn bộ lớp khoá.

- [ ] **Step 4: Xác minh bằng tay**

Chơi thử trong Game view.
Expected: ba bước chạy đúng thứ tự, chạm ngoài vùng cho phép thì không có gì xảy ra; đứng im 4 giây thì gợi ý to lên; đứng im 8 giây thì tự qua bước; **kéo dở một con quái quá 8 giây thì không bị giật mất** (Review Focus #4); sau bước 3 thì mọi slot mở và không còn lớp khoá.

---

### Task 11: `MonsterArmyController` và `MonsterArmySetup` — ráp scene

Spec mục 3 (scene), 5.7 (GameManager), 5.9 (responsive).

**Files:**
- Create: `Assets/_Playable_/MonsterArmy/Scripts/MonsterArmyController.cs`
- Create: `Assets/_Playable_/MonsterArmy/Editor/MonsterArmySetup.cs`
- Modify: `Assets/_Playable_/Scenes/Gameplay.unity` (dọn sạch rồi dựng lại)

**Interfaces:**
- Consumes: mọi thứ từ Task 2–10
- Produces: menu item `Tools/Monster Army/Setup Playable`

- [ ] **Step 1: Implement `MonsterArmyController`**

Nhạc trưởng: giữ `PlacementGrid`, pool `MonsterUnit`, `BossUnit`, `ChaosDirector`, `TutorialDirector`.

- `OnKindTapped` → `grid.TryOccupyNearestFree` → lấy unit từ pool → thả xuống ô đó → `tutorialFlow.NotifyMonsterAdded()`. **Nếu `TryOccupy` trả `false` (lưới đầy): không sinh unit, rung nhẹ thanh hotbar và phát âm `error`** — Review Focus #1.
- `OnUnitMoved` → `tutorialFlow.NotifyMonsterPlaced()`.
- Nút START → `tutorialFlow.NotifyStartPressed()` → đội quân bắt đầu tiến.
- Mỗi khi số quái sống đổi → `chaosDirector.SetLiveMonsterCount(...)`.
- Hero mở đầu: một `MonsterUnit` loại `Brute` với `isMonsterSkin: false`, **hồi sinh sau 2 giây mỗi lần chết, vô hạn** (spec mục 5.8).

**Không gọi gì tới `GameManager` ngoài việc để nó tự chạy.** Kết thúc đi qua đường có sẵn của `GameManager`.

- [ ] **Step 2: Implement `MonsterArmySetup`**

`[MenuItem("Tools/Monster Army/Setup Playable")]`. Theo khuôn `HideSeekSetup.cs`: tái dùng bộ helper `Rect` / `Full` / `Img` / `Text` / `Button` và hàm `Sprite(path)`.

Khác một điểm so với `HideSeekSetup`: **dọn sạch mọi root cũ** (`Object.DestroyImmediate`), không phải `SetActive(false)` — người dùng đã chốt.

Dựng: `MonsterArmyPlayable` root · `EventSystem` · `AudioManager` · camera orthographic · sàn đấu ghép từ tile · boss · hero · `Canvas` + `ResponsiveCanvasScaler` (reference `1080×1920`) · hotbar · nút START · thanh máu boss · lớp tutorial.

Gắn `Playable.GameManager` lên root và đặt qua `SerializedObject`:

| Trường | Giá trị |
|---|---|
| `_endTime` | `30` |
| `_tapToCtaMode` | `false` |
| `_eggRaisingMode` | `false` |
| `_totalEvent` | `0` |
| `_winPanel` | để trống |
| `_failPanel` | để trống |
| `_gameController` | để trống |
| `_btnBlock` | nút phủ toàn màn, mặc định tắt |

- [ ] **Step 3: Xử lý responsive**

Camera chỉnh `orthographicSize` theo tỉ lệ màn hình sao cho **toàn bộ lưới 6×4 và boss luôn nằm trong khung nhìn** ở mọi tỉ lệ — Review Focus #5.

Portrait: hotbar dọc trái, boss trên, sàn giữa, START dưới phải.
Landscape: hotbar trái chia 2 cột ô nhỏ hơn, sàn trải rộng, boss phải, thanh máu ngang trên đỉnh.

- [ ] **Step 4: Chạy setup và xác minh**

Run: menu `Tools/Monster Army/Setup Playable`, rồi Play.
Expected: Console không lỗi; scene chạy được từ đầu đến CTA.

Đổi Game view qua các tỉ lệ `1080×1920`, `1920×1080`, `1125×2436`, `2688×1242`, `1024×768`.
Expected ở **mọi** tỉ lệ: lưới và boss nằm trọn trong khung, hotbar không đè lên sàn đấu, nút START chạm được.

---

### Task 12: Chạy trọn vòng và kiểm hiệu năng

**Files:**
- Modify: các file từ Task 1–11 theo kết quả chơi thử

- [ ] **Step 1: Chạy trọn 30 giây, ít nhất 3 lượt**

Expected mỗi lượt:
- Tutorial xong trong ~8 giây đầu.
- Máu boss tụt thấy rõ rồi nhích lên sau mỗi Roar, **không bao giờ chạm 0**.
- Đúng tại giây 30: `_btnBlock` bật, rồi `ShowCTA()` chạy sau 1 giây (`Debug.Log("End Game")` rồi `Debug.Log("Show CTA")` trong Console).
- Không có giây nào màn hình đứng im không có gì nổ.

- [ ] **Step 2: Kiểm hiệu năng khi đông quái**

Thả đầy 24 ô, để trận chạy 20 giây, mở Profiler.
Expected: trên 50fps; `ExplosionPool.ActiveCount` không vượt 32; không có cấp phát GC tăng đều theo thời gian (pool hoạt động đúng).

- [ ] **Step 3: Chạy lại toàn bộ EditMode test**

Run: Test Runner > EditMode > Run All
Expected: PASS toàn bộ 50 test từ Task 2–5.

- [ ] **Step 4: Kiểm Luna build**

Run: `Window > Luna > Playground`, build creative.
Expected: build thành công; kích thước nằm trong giới hạn mạng quảng cáo; chạy được trong Luna preview và CTA bấm được.

---

## Tổng kết công việc

| Task | Nội dung | Có unit test |
|---|---|---|
| 1 | Slice sprite, convert audio | không (kiểm bằng mắt) |
| 2 | `PlacementGrid` | 11 test |
| 3 | `BossHealthModel` | 12 test |
| 4 | `ChaosTier`, `MonsterKind` | 15 test |
| 5 | `TutorialFlow` | 12 test |
| 6 | `MonsterRig` | không (kiểm bằng mắt) |
| 7 | `MonsterUnit` | không (kiểm bằng mắt) |
| 8 | `ExplosionPool`, `ChaosDirector` | không (kiểm bằng số trong Profiler) |
| 9 | `BossUnit`, `BossHealthBar` | không (kiểm bằng mắt) |
| 10 | Hotbar, DragPlacer, TutorialDirector | không (chơi thử) |
| 11 | Controller + dựng scene | không (chơi thử + đa tỉ lệ) |
| 12 | Chạy trọn vòng, hiệu năng, Luna build | chạy lại toàn bộ 50 test |

Toàn bộ logic quyết định hành vi — sàn máu boss, lưới, bậc hỗn loạn, tutorial — đều có test. Tầng trình diễn xác minh bằng chạy thử, vì không có cách kiểm tự động nào có ý nghĩa cho "màn hình trông đã mắt".
