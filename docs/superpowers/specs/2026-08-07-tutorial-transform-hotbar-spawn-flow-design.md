# Thiết kế: Tutorial trỏ tay Transform → Hotbar → Spawn Point → Free Tap có giới hạn

**Ngày:** 2026-08-07
**File liên quan:** `Assets/_Playable_/Scripts/MapController.cs`, `Assets/_Playable_/Scripts/Controller/PlayerController.cs`,
`Assets/_Playable_/Scripts/HotbarItem.cs`, `Assets/_Playable_/Scripts/IMonsterSelector.cs`

## Bối cảnh
~~~~~~~~
Hiện tại `MapController` chỉ bắt đầu tutorial (trỏ tay tới các spawn point) sau khi player chọn quái lần đầu
(`SelectMonster` → `_tutorialStarted = true` → `BeginTutorial()`), rồi đi tuần tự qua toàn bộ `_spawnPoints`.
Player transform (cưỡi ngựa) và chọn hotbar không nằm trong chuỗi tutorial.

Yêu cầu mới: mở game là bắt đầu tutorial ngay, dẫn player qua đúng thứ tự:
Transform → Hotbar[0] → Spawn point[0] → Hotbar[1] → Spawn point[1] → free tap (có giới hạn tổng số quái).

## Luồng tutorial (state machine)

```csharp
private enum TutorialStep
{
    WaitTransform,  // trỏ tay vào nút Transform của player
    WaitHotbar0,    // trỏ tay vào hotbar[0]
    WaitSpawn0,     // trỏ tay vào spawn point[0]
    WaitHotbar1,    // trỏ tay vào hotbar[1]
    WaitSpawn1,     // trỏ tay vào spawn point[1]
    Done            // hết tutorial, vào free-tap
}
```

Chuỗi bước cố định (hardcode 2 vòng, không cấu hình N vòng):

```
Start
  → WaitTransform
      (player bấm nút Transform, _isTransformed: false → true)
  → WaitHotbar0
      (player chọn đúng hotbar[0])
  → WaitSpawn0
      (player tap trúng target ở spawn point[0] → spawn quái #1)
  → WaitHotbar1
      (player chọn đúng hotbar[1])
  → WaitSpawn1
      (player tap trúng target ở spawn point[1] → spawn quái #2)
  → Done → Phase.Gameplay (free tap, vẫn tính vào giới hạn tổng số quái)
```

**Điều kiện bỏ qua tutorial:** nếu thiếu bất kỳ điều kiện sau, `Start()` gọi `EnterGameplay()` ngay
(giữ đúng hành vi fallback "không kẹt tutorial" hiện có):
- `_spawnPoints.Count < 2`
- `_hotbarItems.Count < 2`
- `_transformButtonTarget == null`

**Sai thao tác không làm kẹt tutorial:** nếu player chọn hotbar sai (không phải hotbar được chỉ định ở step
hiện tại), quái đang chọn (`_prefabMonster`) vẫn đổi bình thường như ngoài tutorial, nhưng step không advance —
player vẫn phải bấm đúng hotbar đang được tay chỉ vào mới qua bước kế. Tap sai vị trí ở bước spawn point
(ngoài target + `_extraTapRadius`) thì không có gì xảy ra, giữ nguyên hành vi cũ.

## Thay đổi từng file

### `PlayerController.cs`

Thêm 1 event public, bắn đúng 1 lần khi transform chuyển ON:

```csharp
public event Action OnTransformedOn;
```

Gọi trong `ToggleTransform()`, nhánh `if (_isTransformed) { ... OnTransformedOn?.Invoke(); }` — đặt sau đoạn
setup horse hiện có. Nhánh `else` (untransform) không bắn event vì tutorial không quan tâm chuyển ngược lại.

### `IMonsterSelector.cs`

Đổi signature để `MapController` biết đúng hotbar nào vừa được bấm (cần để kiểm tra thứ tự
`WaitHotbar0`/`WaitHotbar1`):

```csharp
public interface IMonsterSelector
{
    void SelectMonster(Monster monster, HotbarItem source);
}
```

### `HotbarItem.cs`

- `OnClick()` đổi thành `_selector.SelectMonster(_prefab, this);`
- Thêm property lấy vị trí nút để `MapController` trỏ tay tới:

```csharp
public RectTransform ButtonRect => _button != null ? (RectTransform)_button.transform : null;
```

### `MapController.cs`

**Field mới (Inspector):**
```csharp
[Header("Tutorial UI")]
[SerializeField] private PlayerController _playerController; // để subscribe OnTransformedOn
[SerializeField] private RectTransform _transformButtonTarget; // RectTransform nút Transform, để trỏ tay

[Header("Free Spawn Limit")]
[Tooltip("Giới hạn TỔNG số quái spawn trong toàn game, tính cả 2 quái spawn lúc tutorial. " +
         "Phải >= 2 nếu muốn tutorial luôn hoàn thành được. 0 = không giới hạn.")]
[SerializeField] private int _maxTotalMonsters = 5;
```

**Field private mới:**
```csharp
private TutorialStep _tutorialStep;
private int _spawnedMonsterCount;
private bool _limitReachedNotified;
```

**Field/logic bị thay thế:** bỏ `_tutorialStarted` (bool) — thay bằng `_tutorialStep`. `BeginTutorial()`,
`AdvanceTutorial()` cũ (advance tuần tự toàn bộ `_spawnPoints`) được thay bằng các method điều hướng step:
`GoToTransformStep()`, `GoToHotbarStep(int index)`, `GoToSpawnStep(int index)`, `FinishTutorial()`.

**`Start()`:** thay đoạn "không có spawn point thì EnterGameplay" bằng kiểm tra điều kiện tutorial đầy đủ
(xem mục điều kiện bỏ qua ở trên). Nếu đủ điều kiện: subscribe `_playerController.OnTransformedOn`, gọi
`GoToTransformStep()`. Không còn chờ `SelectMonster` mới bắt đầu tutorial.

**`SelectMonster(Monster monster, HotbarItem source)`:** giữ hành vi đổi `_prefabMonster` + deselect indicator
các hotbar khác như cũ (áp dụng mọi lúc, cả trong và ngoài tutorial). Thêm: nếu đang ở `Phase.Tutorial`, so
`_hotbarItems.IndexOf(source)` với step hiện tại (`WaitHotbar0` → cần index 0, `WaitHotbar1` → cần index 1),
đúng thì `GoToSpawnStep(...)`.

**Trỏ tay vào nút (Transform/Hotbar) — method mới, không tái dùng `MoveTargetToPoint`:**
```csharp
private void ShowButtonPointer(RectTransform target)
{
    if (target == null) return;

    if (_targetImage != null) _targetImage.gameObject.SetActive(false);

    if (_tutorialPointer == null) return;

    var pointerRect = (RectTransform)_tutorialPointer.transform;
    pointerRect.position = target.position;

    if (_handOffset != Vector2.zero) pointerRect.anchoredPosition += _handOffset;

    _tutorialPointer.Show();
}
```
Không dùng ground raycast / VFX / blur / `_targetImage` — nút bấm nhận click qua `Button.onClick` (Unity UI
native), không qua `MapController.Update()` tap detection.

**Trỏ tay vào spawn point:** tái dùng nguyên `ShowTutorialPoint(int index)` hiện có (ground raycast + VFX +
`_targetImage` + blur), chỉ đổi phần "sau khi tap trúng, làm gì tiếp" (xem `HandleTutorialTap` dưới).

**`Update()`:** raw tap detection (`TryGetTapPosition` → `HandleTutorialTap`) chỉ cần chạy khi
`_tutorialStep` là `WaitSpawn0`/`WaitSpawn1`; các bước `WaitTransform`/`WaitHotbar0`/`WaitHotbar1` không cần
(Button tự xử lý click). Refresh VFX theo camera (`RefreshTutorialPointPosition`) cũng chỉ chạy ở 2 step spawn.

**`HandleTutorialTap`:**
```csharp
private void HandleTutorialTap(Vector2 screenPosition)
{
    if (_tutorialStep != TutorialStep.WaitSpawn0 && _tutorialStep != TutorialStep.WaitSpawn1) return;
    if (!IsTapOnTarget(screenPosition)) return;

    HideBlur(_currentSpawnIndex);

    if (!TrySpawnMonster(_posSpawnTutorial)) return; // false nếu đã chạm _maxTotalMonsters

    if (_tutorialStep == TutorialStep.WaitSpawn0) GoToHotbarStep(1);
    else FinishTutorial();
}
```

**Giới hạn tổng số quái + điểm mở rộng cho dev (yêu cầu rõ từ user — đây là chỗ tự thêm code):**
```csharp
private bool TrySpawnMonster(Vector3 worldPosition)
{
    if (_prefabMonster == null) return false;

    if (_maxTotalMonsters > 0 && _spawnedMonsterCount >= _maxTotalMonsters)
    {
        NotifyMonsterLimitReached();
        return false;
    }

    Monster monster = Instantiate(_prefabMonster, _monsterParent);
    monster.Spawn(worldPosition, _monsterWanderRadius);
    _spawnedMonsterCount++;

    return true;
}

// >>> ĐIỂM MỞ RỘNG: gọi đúng 1 lần khi vừa spawn đủ _maxTotalMonsters con <<<
private void NotifyMonsterLimitReached()
{
    if (_limitReachedNotified) return;
    _limitReachedNotified = true;

    // TODO: thêm logic của bạn ở đây (hiện popup, mở màn kế tiếp, khoá nút spawn, v.v.)
}
```
`TrySpawnMonster` dùng chung cho cả tap trong tutorial (`HandleTutorialTap`) và free tap sau tutorial
(`HandleGameplayTap`), vì giới hạn tính trên **tổng toàn game** theo lựa chọn của user.

**`OnDestroy()`:** thêm unsubscribe `_playerController.OnTransformedOn -= HandlePlayerTransformed;` (phòng
trường hợp object bị destroy trước khi transform xảy ra).

## Việc không đổi

- Ground raycast, VFX spawn, blur từng spawn point, camera-follow refresh: giữ nguyên logic cũ, chỉ đổi
  chỗ gọi.
- `HandleGameplayTap`, `TryGetGroundPoint`, `IsPointerOverUI`, v.v.: không đổi.
- `Monster.Spawn`: không đổi.

## Rủi ro / lưu ý khi cấu hình

- **Bắt buộc gán trong Inspector:** `_playerController`, `_transformButtonTarget`, và đảm bảo
  `_hotbarItems`/`_spawnPoints` có ít nhất 2 phần tử — thiếu 1 trong số này thì tutorial tự bỏ qua toàn bộ
  (vào `Gameplay` ngay), không báo lỗi ồn ào (giữ triết lý "không kẹt tutorial" của code gốc).
- **`_maxTotalMonsters` phải ≥ 2** nếu muốn tutorial luôn hoàn thành (vì 2 quái tutorial cũng tính vào giới
  hạn này). Nếu set nhỏ hơn 2, player sẽ bị kẹt ở bước `WaitSpawn0`/`WaitSpawn1` vì tap không còn spawn được
  quái nữa. Tooltip trong Inspector đã ghi rõ điều này.
- Đổi `IMonsterSelector.SelectMonster` signature là breaking change cho mọi implementer/caller hiện có —
  trong repo hiện chỉ có `MapController` (implement) và `HotbarItem` (gọi), nên an toàn để đổi cùng lúc.
