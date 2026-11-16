# Cart Rescue Playable — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Dựng playable "Cart Rescue": kéo nhân vật treo dưới trực thăng xuống xe, giật xe trái/phải để cân, kéo xe sang phải, bấm Start, xe chạy rồi Win, sau đó mở store.

**Architecture:** Toàn bộ vật lý tự viết và máy trạng thái là C# thuần trong assembly `Playable.CartRescue.Core` (`noEngineReferences`), test được bằng EditMode. Lớp hiển thị (MonoBehaviour) trong Assembly-CSharp đọc Core rồi đặt transform. Asset 3D voxel được xuất từ bản WebGL bằng Python (UnityPy), scene được dựng bằng Editor script qua menu, giống `BrainrotPlaygroundSetup`.

**Tech Stack:** Unity 6000.0.60f1 · Luna 7.2.0 · DOTween · uGUI · Unity Test Framework · Python 3.14 + `brotli` + `UnityPy` 1.25.4 (đã cài ở user site, chạy bằng `python -P`)

**Spec:** `docs/superpowers/specs/2026-11-16-cart-rescue-playable-design.md`

---

## Global Constraints

- **Không commit.** Người dùng tự quản lý git. Mỗi task kết thúc bằng bước xác minh.
- Thư mục gốc: `Assets/_Playable_/CartRescue/`. Namespace: Core là `Playable.CartRescue.Core`, MonoBehaviour là `Playable.CartRescue`, Editor là `Playable.CartRescue.EditorTools`.
- Field inspector: **chỉ `[SerializeField] private`**, không `[TabGroup]`.
- **Không sửa** `Assets/_Playable_/Scripts/Manager/GameManager.cs` và `AudioManager.cs`.
- Scene đích: `Assets/_Playable_/Scenes/Gameplay.unity`. Xoá mọi root cũ rồi dựng lại. Khôi phục bằng `git checkout -- Assets/_Playable_/Scenes/Gameplay.unity`.
- Không dùng `Rigidbody`/`Rigidbody2D`/Joint/Collider cho gameplay.
- Giá trị chốt từ spec: 4 ô tại `s = −1.5, −0.5, +0.5, +1.5` (đơn vị ô). Nửa chiều dài sàn `2.0`. 3 nhân vật ban đầu tại `s = −1, 0, +1`. `maxTilt = 18°`. `settleTime = 0.5s`. Tay hướng dẫn hiện lại sau `2s` không tương tác. `_endTime = 40`, `_storeOnEndTime = true`. Mọi nhân vật cùng khối lượng.
- Nguồn asset: `D:\Exploitable Resources\com.brainrot3d.animalhunt\assets\game\Build\8dafcca318d83914cbc0f1676c3ec61d.data.br`. File giải nén tạm đặt ở `D:\Temp\animalhunt_extract\game.data` (đã có, tạo lại nếu thiếu).
- Luna: thư mục `Tools~` và `**/Editor/` không vào build.

### Cách chạy test
Ưu tiên Unity MCP: `run_tests` (EditMode, filter `Playable.CartRescue.Tests`) rồi `get_test_job`. Dự phòng: `Window > General > Test Runner > EditMode > Run All`. Sau mỗi lần sửa script, dùng `read_console` để kiểm lỗi compile.

---

## Review Focus

1. **Giật xe hết tốc lực qua lại liên tục.** Không nhân vật nào có `|s| + w > 2.0`, và không cặp nào chồng nhau (`s[i+1] − s[i] ≥ w[i] + w[i+1] − 1e-4`). Test thuộc Task 2: `Fuzz_RandomJerks_NeverLeavesDeckOrOverlaps`.
2. **Thả nhân vật treo ngay sát thành sàn hoặc đè lên một nhân vật đang đứng.** Phải được đẩy vào vị trí hợp lệ, không chồng nhau. Test thuộc Task 2: `AddRider_OnTopOfExisting_IsSeparated`, `AddRider_PastEdge_IsClamped`.
3. **Kéo xe sang phải nhẹ nhàng sau khi đã cân.** Không được mở khoá ô; chỉ giật vượt `unlockAccel` mới mở. Test thuộc Task 2: `Settled_GentleAccel_StaysLocked`, `Settled_HardJerk_Unlocks`.
4. **Đang `StartReady` mà nhân vật mở khoá.** Nút Start phải ẩn và trạng thái lùi về `Balance`. Bấm Start lúc đó phải bị bỏ qua. Test thuộc Task 4: `StartReady_Unlock_FallsBackToBalance`, `PressStart_OutsideStartReady_Ignored`.
5. **Tỉ lệ màn hình cực đoan** (dọc 9:21, ngang 21:9). Xe, trực thăng và nút Start phải nằm trong khung. Kiểm bằng mắt ở Task 8, bước chụp màn hình hai tỉ lệ.

---

## Cấu trúc file

```
Assets/_Playable_/CartRescue/
├── Tools~/extract_assets.py        xuất mesh/texture/sprite/audio từ game.data
├── Source/                         output của extract (obj, png, ogg/wav)
├── Core/  (asmdef Playable.CartRescue.Core, noEngineReferences)
│   ├── CartTiltModel.cs            góc nghiêng xe: lò xo + mô-men tải + quán tính
│   ├── DeckSolver.cs               trượt 1 chiều, chặn thành, tách chồng, gán/khoá ô
│   ├── SlotAssigner.cs             gán ô không trùng theo thứ tự trái→phải
│   ├── RopeModel.cs                con lắc dây, nắm/thả, kẹp độ dài
│   ├── CartFlow.cs                 máy trạng thái HangDrop→…→Win
│   └── IdleHint.cs                 đếm 2s không tương tác
├── Tests/ (asmdef Playable.CartRescue.Tests, Editor only)
├── Scripts/
│   ├── PointerInput.cs  CartBody.cs  DeckRiderView.cs  RopeHangView.cs
│   ├── TutorialHand.cs  CartRescueCamera.cs  CartRescueController.cs
├── Editor/CartRescueSetup.cs       menu Tools/Cart Rescue/Setup Playable
└── Generated/                      material, prefab do Setup sinh ra
```

---

### Task 1: Xuất asset từ bản WebGL

**Files:**
- Create: `Assets/_Playable_/CartRescue/Tools~/extract_assets.py`
- Create (output): `Assets/_Playable_/CartRescue/Source/`

**Interfaces:**
- Produces: các file `Source/Meshes/<MeshName>.obj`, `Source/Textures/<MeshName>.png` (texture chính của renderer dùng mesh đó), `Source/UI/TutorialFinger.png`, `Source/Audio/{Win,action_jump,Button,tralalelotheme}.<ext>`.

- [ ] **Step 1: Viết `extract_assets.py <game.data> <outDir>`**

Danh sách mesh cố định trong script: `Tralalelo`, `TaTaTaTaSahur`, `CappuccinoAssasino`, `BombardiroCrocodilo`, `golf-cart-base`, `golf-cart-wheel_BL`, `golf-cart-wheel_BR`, `golf-cart-wheel_FL`, `golf-cart-wheel_FR`, `helicopter-base`, `helicopter-propeller-main`, `crate-supply`, `barrel`, `package-box`, `log`, `flag-golf_red`, `jeep-open-base`, `jeep-open-wheel_FL` (dự phòng).
Để tìm texture: duyệt `MeshFilter` → `GameObject` → `MeshRenderer.m_Materials[0]` → `m_SavedProperties.m_TexEnvs["_MainTex"|"_BaseMap"]`. Nếu nhiều mesh dùng chung atlas (ví dụ `atlas-albedo-LPUP`) thì xuất atlas một lần và ghi `Source/manifest.json` dạng `{mesh: textureFile}`. Mesh xuất bằng `mesh.export()` (OBJ). Sprite `TutorialFinger` xuất bằng `.image.save`. AudioClip xuất bằng `clip.samples` (ghi ra đúng đuôi trả về).

- [ ] **Step 2: Chạy**

Run: `python -P "D:\Source\PA_Craft\Assets\_Playable_\CartRescue\Tools~\extract_assets.py" "D:\Temp\animalhunt_extract\game.data" "D:\Source\PA_Craft\Assets\_Playable_\CartRescue\Source"`
Expected: in ra `exported N meshes`, mỗi mesh trong danh sách có `.obj` khác rỗng, `manifest.json` có đủ key, có 4 file audio.

- [ ] **Step 3: Kiểm trong Unity**

`refresh_unity`, rồi kéo thử `Tralalelo.obj` và `golf-cart-base.obj` vào scene tạm, gán material Unlit/Texture với texture theo manifest. Chụp bằng `manage_camera` screenshot.
Expected: mesh đúng hình, texture khớp UV, không bị lật trái-phải. Nếu bị lật thì đổi dấu X trong script và ghi lý do vào comment đầu file. Mesh nào lỗi thì thay bằng dự phòng (jeep, nhân vật khác) và ghi lại.

---

### Task 2: Core — DeckSolver, SlotAssigner, CartTiltModel

**Files:**
- Create: `Core/Playable.CartRescue.Core.asmdef` (copy cấu hình `Playable.MonsterArmy.Core.asmdef`, đổi name/rootNamespace)
- Create: `Core/CartTiltModel.cs`, `Core/DeckSolver.cs`, `Core/SlotAssigner.cs`
- Create: `Tests/Playable.CartRescue.Tests.asmdef` (copy `Playable.MonsterArmy.Tests.asmdef`, reference `Playable.CartRescue.Core`)
- Test: `Tests/DeckSolverTests.cs`, `Tests/SlotAssignerTests.cs`, `Tests/CartTiltModelTests.cs`

**Interfaces:**
- Produces:
  - `struct TiltConfig { float LoadGain, InertiaGain, Spring, Damping, MaxTiltRad; static TiltConfig Default }`
  - `sealed class CartTiltModel(TiltConfig c)`: `float Angle {get;}` (rad, dương là nghiêng xuống phía +s), `float AngularVelocity {get;}`, `void Step(float loadMoment, float cartAccel, float dt)`, `void Reset()`.
  - `struct DeckConfig { float HalfLength=2f; float[] Slots={-1.5f,-0.5f,0.5f,1.5f}; float Gravity, InertiaSlide, KineticFriction, StaticAngleRad, WallBounce, UnlockAccel, SettleAngleRad, SettleCartSpeed, SettleTime=0.5f, SnapSpeed; static DeckConfig Default }`
  - `enum DeckEvent { None, Settled, Unlocked }`
  - `sealed class DeckSolver(DeckConfig c)`: `int Count`, `int Add(float s, float v, float halfWidth)`, `float Position(int i)`, `float Velocity(int i)`, `int Slot(int i)` (−1 nếu chưa khoá), `bool IsSettled`, `float LoadMoment` (= Σ s, cùng khối lượng), `DeckEvent Step(float tiltRad, float cartAccel, float cartSpeed, float dt)`.
  - `static class SlotAssigner`: `int[] Assign(float[] positions, float[] slots)` trả về chỉ số ô cho từng rider (cùng thứ tự `positions`), không trùng.

- [ ] **Step 1: Viết test fail**

`SlotAssignerTests`:
- `FourRidersFourSlots_SortedMapping`: `Assign({0.9f,-1.2f,0.1f,-0.4f}, Slots)` → `{3,0,2,1}`.
- `ThreeRiders_NearestWithoutDuplicates`: `Assign({-1.4f,-1.3f,1.6f}, Slots)` → `{0,1,3}`.

`CartTiltModelTests`:
- `ZeroLoadZeroAccel_StaysLevel`: chạy 200 bước dt=1/60, `Angle == 0`.
- `PositiveLoad_TiltsPositiveAndClamped`: loadMoment=+10 lớn, sau 300 bước `0 < Angle ≤ MaxTiltRad + 1e-5`.
- `AccelRight_TiltsNegative`: load=0, accel=+20 trong 10 bước → `Angle < 0`.
- `ReleasedFromTilt_ReturnsToLevel`: đặt load để nghiêng rồi load=0 chạy 600 bước → `|Angle| < 0.005`.

`DeckSolverTests` (dùng `DeckConfig.Default`, halfWidth `0.45f`):
- `InitialThree_Level_StayPut`: Add tại −1,0,1; Step(tilt=0, accel=0, speed=0) 120 bước → vị trí không đổi (±1e-4), `LoadMoment ≈ 0`.
- `Tilted_RidersSlideDownhill_AndPileAgainstWall`: Add 4 rider; Step(tilt=+12°) 600 bước → mọi `Position` tăng, rider ngoài cùng `≈ 2.0 − 0.45`, liền kề cách nhau `≈ 0.9`.
- `AccelTowardLowSide_PushesRidersBack`: sau khi dồn về +s, Step(tilt=+12°, accel=+25) 30 bước → `Position(max)` giảm.
- `AddRider_OnTopOfExisting_IsSeparated`: Add tại 0 khi đã có rider tại 0, Step 1 bước → khoảng cách ≥ 0.9 − 1e-4.
- `AddRider_PastEdge_IsClamped`: Add tại 3.0, Step 1 bước → `Position ≤ 1.55 + 1e-4`.
- `LevelAndStill_ForSettleTime_SnapsToSlots`: 4 rider rải gần ô, Step(tilt=0, speed=0) đến khi trả `Settled` (trong ≤ 0.5s + 2 frame), tiếp tục thêm 60 bước → `Position(i) ≈ Slots[Slot(i)]` (±0.01), các `Slot` khác nhau.
- `Settled_GentleAccel_StaysLocked`: sau khi settle, accel = `0.5·UnlockAccel` trong 60 bước, không trả `Unlocked`, `IsSettled` vẫn true.
- `Settled_HardJerk_Unlocks`: accel = `1.5·UnlockAccel` → trả `Unlocked` đúng 1 lần, `Slot(i) == -1`.
- `Fuzz_RandomJerks_NeverLeavesDeckOrOverlaps`: `System.Random(1234)`, 4 rider, 5000 bước, tilt ngẫu nhiên trong ±18°, accel ±60 → sau **mỗi** bước, mọi rider `|s| + w ≤ 2.0 + 1e-4` và cặp liền kề không chồng.

- [ ] **Step 2: Chạy test, xác nhận fail (thiếu type)**

- [ ] **Step 3: Cài đặt**

`DeckSolver.Step` theo thứ tự: (a) nếu đã settled, kiểm `|cartAccel| > UnlockAccel` thì mở khoá, phát `Unlocked`, còn không thì kéo `s` về tâm ô với `SnapSpeed` và return. (b) Tích phân `v += (Gravity·sin(tilt) − InertiaSlide·cartAccel)·dt`; ma sát tĩnh: nếu `|tilt| < StaticAngleRad` và `|v|` nhỏ thì `v = 0`, nếu không thì trừ ma sát động. (c) `s += v·dt`. (d) Chặn hai thành: kẹp `s`, `v = −v·WallBounce`. (e) Tách chồng: sắp theo `s`, lặp 4 lượt đẩy từng cặp ra đều hai bên rồi kẹp thành lại. Lượt cuối là quét trái→phải rồi phải→trái để đảm bảo bất biến. Vận tốc cặp chạm nhau gán bằng trung bình. (f) Bộ đếm settle: `|tilt| < SettleAngleRad && |cartSpeed| < SettleCartSpeed && Count == Slots.Length` liên tục ≥ `SettleTime` thì `SlotAssigner.Assign`, set settled, phát `Settled`.
Giá trị `Default` ban đầu là giá trị hợp lý để test qua; giá trị cảm giác sẽ chỉnh ở Task 8.

- [ ] **Step 4: Chạy test, toàn bộ PASS**

---

### Task 3: Core — RopeModel và IdleHint

**Files:**
- Create: `Core/RopeModel.cs`, `Core/IdleHint.cs`
- Test: `Tests/RopeModelTests.cs`, `Tests/IdleHintTests.cs`

**Interfaces:**
- Produces:
  - `sealed class RopeModel(float restLength, float maxLength, float gravity, float damping)`: `float X, Y {get;}` (vị trí nhân vật, world XY), `bool Grabbed`, `void Grab()`, `void Release()`, `void Step(float anchorX, float anchorY, float targetX, float targetY, float dt)` (khi Grabbed thì bám target, kẹp `distance ≤ maxLength`; khi không thì con lắc độ dài `restLength`), `float SwingAngle` (rad so với phương thẳng đứng).
  - `sealed class IdleHint(float delay = 2f)`: `void Touch()`, `void Tick(float dt)`, `bool Visible`. Ban đầu `Visible = true`.

- [ ] **Step 1: Viết test fail**
- `Rope_Ungrabbed_HangsBelowAnchorAtRestLength`: sau 600 bước, `X ≈ anchorX` (±0.01), `anchorY − Y ≈ restLength` (±0.01).
- `Rope_Grabbed_FollowsTargetWithinMax`: target cách anchor `0.5·max` → vị trí ≈ target.
- `Rope_Grabbed_TargetBeyondMax_ClampedOnLine`: target cách `3·max` → khoảng cách = max (±1e-3), nằm trên đường anchor–target.
- `Rope_ReleaseAfterSideways_Swings`: kéo ngang rồi Release, sau vài bước `SwingAngle` đổi dấu ít nhất 1 lần trong 300 bước.
- `IdleHint_HidesOnTouch_ReappearsAfterDelay`: Touch → `!Visible`; Tick 1.9s → `!Visible`; Tick thêm 0.2s → `Visible`.

- [ ] **Step 2: Chạy → fail. Step 3: Cài đặt. Step 4: Chạy → PASS**

---

### Task 4: Core — CartFlow

**Files:**
- Create: `Core/CartFlow.cs`
- Test: `Tests/CartFlowTests.cs`

**Interfaces:**
- Produces:
  - `enum CartPhase { HangDrop, Balance, PushRight, StartReady, Driving, Win }`
  - `sealed class CartFlow(float startGateX, float finishX)`: `CartPhase Phase`, `event Action<CartPhase> Changed`, `void OnDropped()`, `void Tick(bool deckSettled, bool deckUnlocked, float cartX)`, `bool PressStart()`, và `bool CartDraggable` (false ở `HangDrop`, `Driving`, `Win`).

Chuyển trạng thái: `HangDrop --OnDropped--> Balance --settled--> PushRight --cartX≥gate && settled--> StartReady --PressStart--> Driving --cartX≥finish--> Win`. `deckUnlocked` ở `PushRight` hoặc `StartReady` thì về `Balance`. Nếu đang `PushRight` mà `cartX` lùi dưới gate thì ở yên, còn `StartReady` khi lùi dưới gate thì về `PushRight`.

- [ ] **Step 1: Viết test fail**
- `HappyPath_ReachesWin`: chuỗi gọi đúng thứ tự → các Phase lần lượt như sơ đồ, `Changed` bắn 5 lần.
- `StartReady_Unlock_FallsBackToBalance`.
- `PressStart_OutsideStartReady_Ignored`: ở `PushRight`, `PressStart()` trả false, Phase giữ nguyên.
- `StartReady_CartBackBelowGate_ReturnsToPushRight`.
- `Driving_IgnoresUnlock`: ở `Driving`, `Tick(…, deckUnlocked:true, …)` không đổi Phase.
- `CartDraggable_FalseInHangDropAndDriving`.

- [ ] **Step 2: Chạy → fail. Step 3: Cài đặt. Step 4: Chạy → PASS**

---

### Task 5: Lớp hiển thị — xe, nhân vật trên sàn, input

**Files:**
- Create: `Scripts/PointerInput.cs`, `Scripts/CartBody.cs`, `Scripts/DeckRiderView.cs`

**Interfaces:**
- Consumes: `CartTiltModel`, `DeckSolver` (Task 2).
- Produces:
  - `PointerInput : MonoBehaviour`: `bool Down, Held, Up` (frame này), `Vector2 WorldPos` (raycast camera lên mặt phẳng Z=0), `bool OverUI` (qua `EventSystem.current.IsPointerOverGameObject`). Gộp mouse và touch đầu tiên.
  - `CartBody : MonoBehaviour`: field `[SerializeField] Transform _chassis, _deck; Transform[] _wheels; float _dragStiffness, _maxSpeed, _friction, _minX, _maxX, _wheelRadius, _slotUnit` (đơn vị world của 1 ô); `TiltConfig`/`DeckConfig` dạng field serializable. API: `float X, Speed, Accel`, `DeckSolver Deck`, `CartTiltModel Tilt`, `void BeginDrag(float pointerX)`, `void Drag(float pointerX)`, `void EndDrag()`, `void Drive(float targetSpeed)`, `DeckEvent Simulate(float dt)` (bước Core, đặt rotation Z của `_chassis` = `Tilt.Angle`, quay bánh theo `Speed/_wheelRadius`), `Vector3 DeckPointWorld(float s)`, `float WorldToDeckS(Vector3 world)`.
  - `DeckRiderView : MonoBehaviour`: `void Bind(CartBody cart, int riderIndex)`. Trong `LateUpdate` đặt vị trí tại `cart.DeckPointWorld(s)`, nghiêng theo xe, lắc Z theo `Velocity` (±12°) và nhún.

- [ ] **Step 1: Cài đặt 3 script.** `Accel` lấy từ `Δvx/dt` qua low-pass (hệ số 0.25/frame). Kéo: `vx += (pointerX − grabOffset − x)·_dragStiffness·dt`, kẹp `_maxSpeed`; khi thả thì `vx *= (1 − _friction·dt)`.
- [ ] **Step 2: `read_console` không có lỗi compile.**
- [ ] **Step 3: Scene thử nghiệm tối giản** (không lưu): tạo CartBody từ mesh xe và 4 khối cube làm rider, cho DeckSolver nghiêng tay. Play và kéo chuột → xe chạy theo, cube trượt và dồn về thành, không lọt. Chụp màn hình bằng MCP.

---

### Task 6: Lớp hiển thị — dây/trực thăng, tay hướng dẫn, camera

**Files:**
- Create: `Scripts/RopeHangView.cs`, `Scripts/TutorialHand.cs`, `Scripts/CartRescueCamera.cs`

**Interfaces:**
- Consumes: `RopeModel`, `IdleHint` (Task 3), `CartBody` (Task 5).
- Produces:
  - `RopeHangView`: field `_heli, _propeller, _rider (Transform), _rope (LineRenderer), _grabRadius, _restLength, _maxLength, _dropZoneHeight`. API: `bool TryGrab(Vector2 world)`, `void DragTo(Vector2 world)`, `bool Release(CartBody cart, out float s, out float vDown)`: true nếu điểm thả nằm trong `[deck −2, +2] × [deckY, deckY + _dropZoneHeight]`; nếu thả ngoài vùng thì tween về chỗ treo. `void FlyAway()`: thu dây, trực thăng bay lên khỏi màn hình (DOTween 1.2s) rồi tắt.
  - `TutorialHand` (uGUI Image `TutorialFinger`): `void ShowDrag(Vector3 fromWorld, Vector3 toWorld)` lặp; `void ShowSwipe(Vector3 centerWorld, float halfWidthWorld)` lặp ↔; `void ShowTap(RectTransform target)`; `void Hide()`. Bên trong dùng `IdleHint`: `Touch()` ẩn ngay, hiện lại sau 2s với animation hiện tại.
  - `CartRescueCamera`: ortho. `void Fit(Bounds focus)` chọn `orthographicSize` để `focus` lọt khung với lề 10% theo cả aspect dọc lẫn ngang. `void Follow(Transform t)` lerp X. Tự gọi lại `Fit` khi aspect đổi.

- [ ] **Step 1: Cài đặt 3 script.** Step 2: `read_console` sạch.

---

### Task 7: Controller và script dựng scene

**Files:**
- Create: `Scripts/CartRescueController.cs`, `Editor/CartRescueSetup.cs`
- Modify: `Assets/_Playable_/Scenes/Gameplay.unity` (do script sinh)

**Interfaces:**
- Consumes: mọi thứ ở Task 2–6; `GameManager.ShowWinPanel()`, `GameManager.DeferCountdownUntilGameplay()`, `AudioManager`.
- Produces: menu `Tools/Cart Rescue/Setup Playable` (có hộp thoại xác nhận) và `CartRescueSetup.Build()` (không hỏi, gọi được từ MCP).

`CartRescueController` mỗi frame: đọc `PointerInput`. Ở `HangDrop` thì chuyển chạm cho `RopeHangView`; khi Release thành công thì `cart.Deck.Add(s, 0, w)`, bật `DeckRiderView` của nhân vật thứ 4, gọi `rope.FlyAway()` và `flow.OnDropped()`. Khi `flow.CartDraggable` thì drag ở bất kỳ đâu (trừ khi `OverUI`) thì gọi `cart.BeginDrag/Drag/EndDrag`. Gọi `cart.Simulate(dt)` rồi `flow.Tick(...)`. Theo `flow.Changed`:
- `Balance`: hand `ShowSwipe` quanh xe.
- `PushRight`: hand `ShowDrag` xe tới gate, hiện mốc gate (mũi tên).
- `StartReady`: pop nút Start, hand `ShowTap`.
- `Driving`: ẩn hand và nút, `DeferCountdownUntilGameplay()`, `cart.Drive(tăng dần tới driveSpeed)`, camera `Follow`, giảm `InertiaSlide` xuống 30%.
- `Win`: chữ WIN pop-in, âm `Win`, `GameManager.ShowWinPanel()`.
Âm `action_jump` khi nhân vật chạm sàn, `Button` khi bấm Start.

`CartRescueSetup.Build()`: import setting cho `Source/` (obj scale, texture Point/không mipmap), tạo material Unlit/Texture vào `Generated/`, xoá root cũ của `Gameplay.unity`, dựng `CartRescue` root gồm Camera (ortho, chếch 10°), Directional Light, nền (sàn và tường xám dạng 2 quad), đạo cụ trang trí dọc đường dài khoảng 40 đơn vị, cờ đích tại `finishX`, xe với 3 rider tại `s = −1, 0, +1`, trực thăng treo Tralalelo, Canvas (CanvasScaler 1080×1920, match 0.5) chứa TutorialHand, nút Start, chữ WIN, `_btnBlock` toàn màn hình. Thêm `GameManager` (`_endTime=40`, `_storeOnEndTime=true`, `_autoStoreAfterEndcard=false`, `_tapToCtaMode=false`, `_eggRaisingMode=false`, `_totalEvent=0`, `_backgroundMusic=tralalelotheme`), `AudioManager`, EventSystem. Gán reference bằng `SerializedObject` như `BrainrotPlaygroundSetup`. Lưu scene.

- [ ] **Step 1: Cài đặt controller.** Step 2: Cài đặt setup. Step 3: `read_console` sạch.
- [ ] **Step 4: Chạy `CartRescueSetup.Build()` qua MCP `execute_code`.** Expected: không lỗi, scene có root `CartRescue`, `find_gameobjects` thấy `GameManager`, `CartBody`, 4 `DeckRiderView`, `RopeHangView`.

---

### Task 8: Chỉnh cảm giác và xác minh toàn luồng

**Files:**
- Modify: giá trị `Default` trong `Core/CartTiltModel.cs`, `Core/DeckSolver.cs` và field trong `CartRescueSetup.cs`.

- [ ] **Step 1: Play Mode, đi hết luồng ở màn dọc 1080×1920.** Chụp 5 ảnh: lúc mở, đang kéo dây, xe nghiêng sau khi thả, StartReady, Win.
Mục tiêu chỉnh: thả nhân vật thứ 4 thì xe nghiêng rõ (≥ 10°) và cả nhóm dồn về một đầu; 2–3 cú giật là cân được; kéo sang phải nhẹ nhàng không mở khoá.
- [ ] **Step 2: Thử phá:** giật xe tối đa qua lại 10s (bằng script test trong Play Mode cấp `Drag` ngẫu nhiên) → không rơi, không chồng. Thả nhân vật ở rìa sàn, giữa sàn, ngoài vùng (bật về).
- [ ] **Step 3: Tỉ lệ cực đoan:** chụp ở 1080×2520 (dọc) và 2520×1080 (ngang) → xe, trực thăng và nút Start nằm trong khung.
- [ ] **Step 4: Không làm gì 40s** → store mở (log `Show CTA`).
- [ ] **Step 5: Chạy lại toàn bộ test EditMode → PASS. `read_console` không có error.**
- [ ] **Step 6: Báo người dùng build Luna** (người dùng tự build qua Luna). Đưa danh sách ảnh chụp và thông số đã chỉnh.
