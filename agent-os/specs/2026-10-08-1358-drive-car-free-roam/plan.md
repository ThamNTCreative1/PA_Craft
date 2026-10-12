
# Plan — Mission Drive Car tự do

Status: APPROVED
User-directed deferral (2026-10-08, final handoff): Skip the proposed CharacterJoint correction and remaining Luna runtime verification. Leave existing Player joints unchanged and record the confirmed car-mount runtime failure as unresolved in implementation-report.md. This does not constitute a Luna runtime acceptance pass.
Approved deviation (2026-10-08, budget): User explicitly waived the size-budget step and requested completion of remaining verification. Do not optimize assets/packages or treat the measured 5,865,051-byte archive as a passing 4.5 MB result.
Approved deviation (2026-10-08, step traversal): User approved bounded low-step traversal for the car BoxCollider in CarController, with forward/downward probes and box clearance checks, without changing map colliders or adding files/classes.
Approved deviation (2026-10-08, friction): User approved a cached zero-friction runtime PhysicsMaterial in CarController, assigned to the body collider in Awake and destroyed in OnDestroy; no new material asset.
Approved by: user
Approved scope: Toàn bộ plan hiện tại và 6 quyết định mặc định được ghi trong current.md.
Implementation approval: GRANTED — người dùng xác nhận cập nhật trạng thái và thực hiện ngày 2026-10-08.
Approved deviation (2026-10-08): CarTouchpad là vùng vuốt camera. User duyệt thay MobileTouchInput thiếu bằng TouchController hiện có, nối CameraController khi mount và khôi phục binding khi Out; giữ Left/Right đánh lái. Không thêm file/class cho việc này.
Đọc cùng `shape.md` (scope, lý do pattern, quyết định mở) và `standards.md` (checklist governance).

## 1. Danh sách file thay đổi

### File mới

| File | Loại |
|---|---|
| `Assets/_Playable_/Scripts/Controller/IDrivableVehicle.cs` | interface |
| `Assets/_Playable_/Scripts/Controller/CarController.cs` | MonoBehaviour |

### File sửa

| File | Thay đổi chính |
|---|---|
| `Assets/_Playable_/Scripts/GameController.cs` | thêm UI/tutorial xe hơi, `SetDrivingCar`, (Option A) nested `RideUIState` |
| `Assets/_Playable_/Scripts/Controller/MotorbikeController.cs` | implement `IDrivableVehicle` (không đổi hành vi) |
| `Assets/_Playable_/Scripts/Controller/CameraController.cs` | `_vehicle`/`FollowVehicle` dùng `IDrivableVehicle` thay vì `MotorbikeController` |
| `Assets/_Playable_/Scripts/Controller/PlayerAction.cs` | thêm mảng xe hơi, generic nearest/tap helper, đổi tên event, sửa `IsInCar` |
| `Assets/_Playable_/Scripts/Controller/PlayerController.cs` | thêm `BeginDrive()`/`EndDrive(Vector3, Quaternion)` |
| `Assets/_Playable_/Scripts/UI/MissionsJournal/MissionRowView.cs` | thêm `IsSupportedMission` |
| `Assets/_Playable_/Scripts/UI/MissionsJournal/MissionsJournalController.cs` | mở rộng guard `OnGoPressed` |

### Asset/scene (Codex thực hiện khi implement, không phải Claude)

| Asset | Thay đổi |
|---|---|
| `Assets/Game/Resources/UI/UICarController.prefab` | xoá node/logic Fuel, Coin, Tunning; xoá script `UICarController` chưa resolve; gắn `DriveHoldButton` cho Left/Right/Forward/Back/HandBreak; xác nhận lại vai trò `CarTouchpad` (xem `shape.md` mục 6); nút Exit trỏ `CarController.RequestDismount` |
| `Assets/_Playable_/Scenes/Gameplay.unity` | thêm 1 instance xe (chọn trong `Car_*.fbx`) với `CarController`, Rigidbody, collider thân xe, wheel transforms, camera target rỗng; gắn field mới trên `GameController`/`PlayerAction`/UI prefab instance |

Không file/class/pattern nào ngoài danh sách trên được thêm khi implement; phát sinh ngoài danh sách phải dừng và xin duyệt lại (theo governance mục 5).

## 2. Thiết kế từng type

### 2.1 `IDrivableVehicle` (mới)

- Path: `Assets/_Playable_/Scripts/Controller/IDrivableVehicle.cs`.
- Vấn đề giải quyết: cho `CameraController`/`PlayerAction` một boundary chung để follow/mount/exit bất kỳ vehicle nào, tránh nhân đôi logic khi có `CarController` là implementation thứ hai (xem `shape.md`).
- Phương án đơn giản hơn đã xét và loại: type-check/if-else theo `MotorbikeController`/`CarController` trong `CameraController` và `PlayerAction` — loại vì lặp lại ở mọi điểm dùng và không mở rộng được cho vehicle thứ ba.
- Thành viên:
  - `Transform transform { get; }` — bổ sung được user duyệt ngày 2026-10-08 để CameraController giữ kiểm tra collider thuộc xe; MonoBehaviour cung cấp implementation sẵn có.
  - `Transform CameraTarget { get; }`
  - `float Speed { get; }`
  - `float MaxSpeed { get; }`
  - `bool IsDriven { get; }`
  - `PlayerController Rider { get; }`
  - `bool TryMount(PlayerController player, bool ignoreDistance = false);`
  - `void RequestDismount();`
- Không có implementation mặc định, không MonoBehaviour (interface thuần).

### 2.2 `CarController` (mới)

- Path: `Assets/_Playable_/Scripts/Controller/CarController.cs`.
- Responsibility: vật lý lái xe hơi (tiến/lùi/trái/phải/phanh tay), grounding đơn giản (raycast, không WheelCollider), vòng đời mount/Out bao gồm ẩn/hiện player root, cập nhật camera/UI qua `GameController`.
- `[RequireComponent(typeof(Rigidbody))]`.
- Dependencies (SerializeField, không runtime lookup):
  - `Rigidbody` (tự GetComponent nếu null, theo pattern `MotorbikeController`).
  - `Collider _bodyCollider` (BoxCollider theo khuyến nghị — xem `shape.md` mục 5).
  - `Transform _cameraTarget`.
  - `Transform[] _wheels` (chỉ xoay visual).
  - `GameController _gameController` (để gọi `SetDrivingCar`).
  - `Button _exitButton` (từ UI prefab xe hơi).
  - `DriveHoldButton _forwardButton, _reverseButton, _leftButton, _rightButton, _handbrakeButton` (từ UI prefab xe hơi, KHÔNG đi qua `PlayerController`).
  - Các field tốc độ/gia tốc tương tự `MotorbikeController` (`_maxForwardSpeed`, `_maxReverseSpeed`, `_acceleration`, `_braking`, `_coastDeceleration`, `_grip`, `_lateralGrip`, `_wheelBase`, `_lowSpeedSteerAngle`, `_highSpeedSteerAngle`, `_steerSmoothTime`) — tái dùng đúng công thức đã chứng minh chạy được trong target, chỉ đổi hằng số cho xe 4 bánh.
  - `_handbrakeDeceleration` riêng cho phanh tay.
- Lifecycle:
  - `Awake`: cache Rigidbody, cấu hình `isKinematic = true` ban đầu (giống motorbike, chỉ bật vật lý khi có rider), đăng ký `_exitButton.onClick.AddListener(RequestDismount)`.
  - `OnDestroy`: gỡ listener.
  - `Update`: đọc input trực tiếp từ 5 `DriveHoldButton` của chính nó (không qua player) khi có rider và chưa yêu cầu exit; xử lý auto-dismount khi tốc độ thấp và đã `RequestDismount`.
  - `FixedUpdate`: áp dụng acceleration/braking/steering theo công thức mirror `MotorbikeController.FixedUpdate` (xem research mục carAcceleration/turn-assist), cộng thêm nhánh handbrake (ưu tiên cao nhất, decel mạnh, không drift theo khuyến nghị mặc định).
  - `LateUpdate`: xoay wheel visuals theo speed (giống motorbike).
- Public API: `TryMount`, `RequestDismount` (triển khai `IDrivableVehicle`); `CameraTarget`, `Speed`, `MaxSpeed`, `IsDriven`, `Rider` (properties).
- `TryMount(player, ignoreDistance)`:
  1. Guard: đã có rider, player null, player đang riding khác, `!player.IsWorking`, thiếu `_cameraTarget`/`_bodyCollider` → false.
  2. Guard khoảng cách (trừ khi `ignoreDistance`).
  3. `_rider = player;` `player.BeginDrive();` (mới, xem 2.4).
  4. `_body.isKinematic = false;`
  5. `if (player.CameraController != null) player.CameraController.FollowVehicle(this);`
  6. `_gameController.SetDrivingCar(true, player);`
  7. return true.
- `RequestDismount()`: set cờ nội bộ `_exitRequested = true` (không dismount ngay, giống motorbike chờ tốc độ thấp).
- Dismount thực tế (trong `Update`, khi `_exitRequested && Speed < ngưỡng`):
  1. Scan vị trí đứng an toàn quanh xe (offset trái/phải rộng hơn motorbike do xe to hơn) bằng raycast + `Rider.CanStandAt`.
  2. Nếu tìm được: `_rider.EndDrive(position, rotation);` `_rider.CameraController.FollowPlayer(_rider);` `_gameController.SetDrivingCar(false, _rider);` reset `_rider = null; _exitRequested = false; _body.isKinematic = true;`
  3. Nếu không tìm được: giữ `_exitRequested = true`, tiếp tục lái, không ép dừng (giống motorbike `TryDismount` trả về false và cho lái tiếp).
- `OnDisable`: nếu đang có rider, buộc trả rider (giống motorbike, tránh rider kẹt nếu xe bị tắt).

### 2.3 `MotorbikeController` (sửa)

- Chỉ thêm `: MonoBehaviour, IDrivableVehicle` vào class declaration. `Rider`, `CameraTarget`, `Speed`, `MaxSpeed`, `IsDriven`, `TryMount`, `RequestDismount` đã khớp interface nguyên trạng — không đổi logic, không đổi hành vi hiện có.

### 2.4 `PlayerController` (sửa)

- Thêm 2 method mới, không đổi method cũ:
  - `public void BeginDrive()`:
    - Guard `if (IsRiding) return;`
    - `_moveInput = Vector2.zero;`
    - `IsRiding = true;` (tái dùng flag hiện có — lý do: `MissionsJournalController.Show()` đã guard bằng `_playerController.IsRiding`, tái dùng giúp journal tự động không mở được khi đang lái ô tô, không cần thêm field/guard mới).
    - `gameObject.SetActive(false);`
  - `public void EndDrive(Vector3 position, Quaternion rotation)`:
    - `gameObject.SetActive(true);`
    - `IsRiding = false;`
    - `Teleport(position, rotation);` (method có sẵn, đặt lại Rigidbody/transform đúng vị trí Out).
- Không đổi `BeginRide`/`EndRide` (dành riêng cho motorbike, hành vi parent-vào-seat vẫn giữ nguyên).

### 2.5 `CameraController` (sửa)

- Đổi field `private MotorbikeController _vehicle;` → `private IDrivableVehicle _vehicle;`.
- Đổi signature `public void FollowVehicle(MotorbikeController vehicle)` → `public void FollowVehicle(IDrivableVehicle vehicle)`. Thân method không đổi logic (đã dùng đúng các property có trong interface: `CameraTarget`, `Speed`, `MaxSpeed`).
- `MotorbikeController.TryMount` gọi `player.CameraController.FollowVehicle(this)` — vẫn hợp lệ vì `this` implement interface. `CarController.TryMount` gọi tương tự.

### 2.6 `PlayerAction` (sửa)

- Đổi tên `public event Action CarEntered;` → `public event Action MotorbikeMounted;` (sửa tên sai nghĩa đã ghi nhận ở research — event này chỉ bắn khi lên **motorbike**, đặt tên `CarEntered` là bug tên gọi, không phải field mới).
- Thêm `public event Action CarMounted;` bắn khi lên **ô tô** thật.
- Sửa `IsInCar` — hiện sai (trả về trạng thái motorbike). Đổi thành đúng nghĩa: `public bool IsInCar => _mountedCar != null;` và thêm `public bool IsOnMotorbike => _mounted != null;` nếu cần nơi khác dùng (kiểm tra caller trước khi đổi — hiện chưa thấy nơi nào đọc `IsInCar`, an toàn để sửa nghĩa).
- Thêm field `[SerializeField] private CarController[] _cars;` và `_mountedCar` (giống `_mounted` cho motorbike).
- Thêm field `[SerializeField] private Arrow _carArrow;` (tuỳ chọn — nếu người dùng không yêu cầu mũi chỉ xe hơi, có thể bỏ, không bắt buộc cho hành vi lái; xác nhận ở approval).
- `Update()`: thêm nhánh tương tự motorbike cho `_mountedCar` (clear khi `Rider != _playerController`), gọi `FindNearestCar()` song song `FindNearestMotorbike()`, `_exitButton` KHÔNG dùng cho ô tô (ô tô có exit riêng trong UI xe hơi) — giữ `_exitButton` chỉ cho motorbike như hiện tại.
- `TryTapBike`/`FindNearestMotorbike`/`TryTutorialTapArea` giữ nguyên tên và hành vi cho motorbike (tránh phá vỡ binding/tutorial hiện có). Thêm bộ song song cho xe hơi bằng cách factor phần thân thuật toán thành private generic helper dùng chung:
  - `private void FindNearest<T>(T[] vehicles, Collider[] colliders, ref T nearest, Arrow arrow) where T : Component, IDrivableVehicle` — chứa đúng thuật toán hiện có trong `FindNearestMotorbike`, tham số hoá theo mảng/arrow.
  - `private bool TryTapVehicle<T>(T[] vehicles, Vector2 screen, ref T mounted, Arrow arrow, Action onMounted, bool ignoreDistance, bool tutorialPress) where T : Component, IDrivableVehicle` — chứa đúng thuật toán `TryTapBike`.
  - Motorbike và car đều gọi qua các helper này; không đổi hành vi motorbike, chỉ đổi nơi chứa code (refactor nội bộ, không đổi field/API public của PlayerAction ngoài phần đã liệt kê).
- `TryMountFromTutorial(screen)`: thử motorbike trước (giữ behavior cũ không đổi), nếu không mount được thử car bằng helper tương tự `TryTutorialTapArea` tham số hoá.
- `UseMotorbike()` giữ nguyên tên/behavior (chỉ cho motorbike, nút Exit vẫn gọi method này).

### 2.7 `GameController` (sửa)

Quyết định mở #2/#3 ở `shape.md` áp dụng ở đây. Plan viết theo Option A (khuyến nghị):

- Thêm nested `[Serializable] private class RideUIState` chứa `_panel` (GameObject UI), `_firstRideHint` (GameObject tutorial), cờ `_hasShownHint` riêng theo instance, `_hasInput`, `_rideStart`. Method `SetActive(bool riding, PlayerController player)` và `Tick(PlayerController player, Func<float> readDriveInput)` — xem mô tả thuật toán ở `shape.md`/research (threshold input ≥0.01 và dịch chuyển ngang >0.05 unit, y bị zero trước khi so sánh).
- Field mới: `[SerializeField] private RideUIState _motorbikeRide;` `[SerializeField] private RideUIState _carRide;` — thay cho `_motorbikeUI`/`_drivingTutorial`/`_hasShownDrivingTutorial` hiện tại (gộp vào `_motorbikeRide` để không lặp field, giữ `_playerUI` riêng vì dùng chung cho cả hai trạng thái không-riding).
- `SetRiding(bool riding)`: giữ tên/signature cũ (không phá binding Inspector hiện có cho motorbike), bên trong gọi `_playerUI.SetActive(!riding); _motorbikeRide.SetActive(riding, _player); if (riding) _carRide.SetActive(false, _player);` (đảm bảo loại trừ lẫn nhau, phòng trường hợp cả hai UI cùng hiện do lỗi khác).
- Thêm `public void SetDrivingCar(bool riding)`: `_playerUI.SetActive(!riding); _carRide.SetActive(riding, _player); if (riding) _motorbikeRide.SetActive(false, _player);`
- `Update()`: thay đoạn kiểm tra first-ride hiện tại bằng `_motorbikeRide.Tick(_player, _player.ReadDriveInput); _carRide.Tick(_player, _player.ReadDriveInput);` (đọc input vẫn qua `PlayerController.ReadDriveInput`, chỉ hợp lệ khi player active — với car, player đang inactive nên `_carRide.Tick` sẽ không có input mới trong lúc player ẩn; **đây là điểm cần xác nhận**: nếu muốn hint xe hơi biến mất dựa vào chuyển động XE thay vì player, cần đổi `Tick` nhận `Func<float> readInput` trỏ tới `CarController` của xe đang lái, không phải `PlayerController`. Plan mặc định dùng tốc độ/di chuyển của XE (gọi `_carRide.Tick` với vị trí xe, không phải player) — sửa lại chữ ký `Tick(Transform moveSubject, Func<float> readInput)` để nhận `CarController.transform`/`CarController` thay vì ép qua `PlayerController` khi ở trạng thái car. `GameController` cần tham chiếu tới `CarController` đang active; `SetDrivingCar(bool riding, CarController car)` nhận thêm tham số xe để lưu lại cho Tick dùng.
- Cập nhật lại `SetDrivingCar` thành `public void SetDrivingCar(bool riding, CarController car)` — lưu `_activeCar = car` khi `riding`, clear khi không. `CarController.TryMount`/dismount gọi với tham số này.

> Ghi chú minh bạch: mục này có 1 lần tự-sửa thiết kế ngay trong plan (nhận ra `_player` không di chuyển khi lái xe) — nêu rõ để người duyệt thấy lý do field `CarController` xuất hiện trong `GameController`, không phải scope creep.

### 2.8 `MissionRowView` (sửa)

- Thêm `public bool IsSupportedMission => _missionId == "drive_motorbike_distance" || _missionId == "drive_car_distance";` cạnh `IsMotorbikeMission` hiện có (không xoá `IsMotorbikeMission` — vẫn có thể cần phân biệt nơi khác). Lý do dùng property thay vì thêm `IsCarMission` riêng: `OnGoPressed` chỉ cần biết "mission này có mở sandbox lái xe hay không", hai mission (bike/car) mở y hệt một block — thêm bool thứ 3 (`IsCarMission`) sẽ buộc `OnGoPressed` kiểm tra OR hai bool giống hệt cách `IsSupportedMission` đã gộp, không có lợi thêm; được xem là alternative và loại vì thừa.

### 2.9 `MissionsJournalController` (sửa)

- `OnGoPressed`: đổi `if (!row.IsMotorbikeMission) return;` → `if (!row.IsSupportedMission) return;`. Toàn bộ block mở sandbox phía dưới (`Hide(); _playerAction.enabled = true; ...`) giữ nguyên nguyên văn — cả hai mission dùng chung đúng một lối mở, không tạo nhánh riêng (phù hợp quan sát hiện trạng: cả hai vehicle cùng tồn tại tự do trong scene, việc chọn mission nào chỉ là UI framing, không gate vehicle).

## 3. Event/Dependency flow (text diagram)

```
[Player đi bộ, PlayerAction.Update active]
  tap/tutorial-tap trên xe hơi
    → PlayerAction.TryTapVehicle<CarController>(...)
      → CarController.TryMount(playerController)
        → PlayerController.BeginDrive()        // SetActive(false) root
        → CameraController.FollowVehicle(this) // IDrivableVehicle
        → GameController.SetDrivingCar(true, this)
          → RideUIState(_carRide).SetActive(true, player) // UI panel car hiện, player UI/motor UI tắt
      → PlayerAction fires CarMounted (nếu còn observer cần, hiện GameController không cần nghe event này nữa vì TryMount gọi trực tiếp)

[Đang lái — Player root inactive, CarController.Update/FixedUpdate vẫn chạy]
  DriveHoldButton (forward/back/left/right/handbrake) → CarController đọc trực tiếp
  CarController.FixedUpdate → di chuyển Rigidbody xe
  GameController.Update → _carRide.Tick(...) dùng input/translation của XE để tắt hint lần đầu

[Nhấn Exit trên UI xe hơi]
  Button.onClick → CarController.RequestDismount() (listener gắn trong CarController.Awake, không qua PlayerAction)
    → _exitRequested = true
  CarController.Update (tốc độ thấp) → tìm vị trí đứng an toàn
    → PlayerController.EndDrive(position, rotation)   // SetActive(true), Teleport
    → CameraController.FollowPlayer(player)
    → GameController.SetDrivingCar(false, null)
      → RideUIState(_carRide).SetActive(false, player); _playerUI.SetActive(true)
    → CarController._rider = null; _body.isKinematic = true

[Journal mở lại] MissionsJournalController.Show() guard bằng player.IsRiding
  → trong lúc lái xe hơi, IsRiding == true (set bởi BeginDrive) → Show() tự chặn, không cần sửa MissionsJournalController.Show().
```

Motorbike flow giữ nguyên 100% (không trong diagram trên vì không đổi).

## 4. Thứ tự task khi implement (sau khi duyệt)

1. `IDrivableVehicle.cs` (không phụ thuộc gì).
2. `MotorbikeController.cs` implement interface — build/compile check, regression tay lái motorbike trước khi đụng gì khác.
3. `CameraController.cs` đổi kiểu `_vehicle`/`FollowVehicle` — compile + chạy lại regression motorbike (camera follow vẫn đúng).
4. `PlayerController.cs` thêm `BeginDrive`/`EndDrive` — không ai gọi còn, chỉ compile check.
5. `CarController.cs` — viết mới, chưa gắn vào scene, compile check.
6. `PlayerAction.cs` — thêm field/mảng car + helper generic, giữ motorbike path nguyên vẹn, regression motorbike lại lần nữa (nguy cơ refactor làm hỏng path cũ cao nhất ở bước này).
7. `GameController.cs` — `RideUIState`, `SetDrivingCar` — regression motorbike UI/tutorial.
8. `MissionRowView.cs`, `MissionsJournalController.cs` — mở guard GO cho mission ô tô.
9. Asset: chọn model xe, đặt instance trong `Gameplay.unity`, gắn `CarController` + collider + wheels + camera target.
10. Asset: sửa `UICarController.prefab` — xoá Fuel/Coin/Tunning, gắn `DriveHoldButton`×5, xác nhận `CarTouchpad`, gắn Exit.
11. Wiring cuối: gán tất cả serialized reference mới trong Inspector (CarController ↔ UI buttons/Exit, PlayerAction._cars, GameController._carRide/_carUI).
12. Full verification pass (mục 5).

Dừng giữa bước và xin duyệt lại nếu bước nào phát hiện cần file/class/dependency khác danh sách trên (ví dụ `CarTouchpad` hoá ra là touch-drag cần thêm class mới).

## 5. Verification plan

### EditMode
- Test thuần C# cho `RideUIState.Tick` (không cần MonoBehaviour thật — có thể test logic ngưỡng input/dịch chuyển bằng cách gọi trực tiếp nếu class được viết không phụ thuộc Unity lifecycle ngoài 2 GameObject field; nếu không tách được dễ, ghi nhận là "khó unit test, bù bằng PlayMode" chứ không ép interface giả.
- Test `MissionRowView.IsSupportedMission` cho các `_missionId` khác nhau (bike/car/paintball/không hợp lệ).

### PlayMode / Editor thủ công
- Regression motorbike đầy đủ: tap mount, tutorial mount, lái, Out (có chỗ đứng / không có chỗ đứng), journal không mở được khi đang lái.
- Car: tap mount từ xa trong tầm, tap mount trong opening tutorial, lái tiến/lùi/trái/phải, phanh tay, giữ 2 nút đối nghịch, va chạm lề đường/map, Out khi đang chạy nhanh (phải tiếp tục lái), Out khi đứng yên có chỗ trống, Out khi bị chặn (thử lại được), player ẩn đúng lúc mount và hiện đúng vị trí lúc Out, camera chuyển target đúng cả hai chiều.
- First Ride Tutorial xe hơi: hiện lần đầu, biến mất đúng ngưỡng, không tự hiện lại lần sau; xác nhận không đụng tới cờ/tutorial motorbike.
- Mission journal: GO ở cả hai mission (bike/car) đều mở sandbox; mission paintball (chưa có) vẫn bị guard chặn như hiện tại (không regress).
- Giao diện UI xe hơi ở ít nhất 2 tỉ lệ khung hình (portrait/landscape) — xác nhận không còn Fuel/Coin/Tunning hiển thị hoặc hoạt động.
- Unity Console sau mỗi bước compile — không có lỗi mới, review warning liên quan.

### Luna/runtime
- Grep lại code mới cho API cấm (`FindObjectOfType`, `GameObject.Find`, tag search, Physics2D bị cấm) — kỳ vọng không có (thiết kế dùng serialized reference xuyên suốt).
- Xác nhận `CarController` không dùng WheelCollider, không dùng New Input System.
- Build thử trên Luna/device nếu pipeline cho phép; nếu không, ghi rõ "chưa xác minh trên Luna runtime, chỉ Editor" trong implementation report — không tuyên bố đã verify Luna khi chưa chạy.

### Build/size
- Đo size scene/build sau khi thêm 1 car instance + sửa 1 prefab UI (không thêm asset mới ngoài việc dùng lại model có sẵn) — so với ngân sách 4.5MB, ghi lại số đo thật, không giả định.

### Rollback boundary
- Toàn bộ thay đổi nằm trong các file/asset liệt kê ở mục 1. Revert = `git checkout` đúng danh sách file đó; không có thay đổi gì ngoài danh sách (không đổi `GameManager`, không đổi scene ngoài thêm 1 object + rebind field, không xoá asset nguồn).

## 6. Điểm chưa xác minh / rủi ro còn lại khi approval

- Giả định "gọi method C# thông thường trên component của GameObject đang inactive vẫn thực thi được" (dùng cho `CarController` gọi `Rider.CanStandAt` lúc player ẩn) cần xác nhận bằng test PlayMode thật trong Luna, không chỉ suy luận theo tài liệu Unity.
- `CarTouchpad` trong UI gốc chưa rõ vai trò — có thể đổi binding khi Codex mở prefab.
- Model xe cụ thể và kích thước collider/offset Out chưa đo — cần hiệu chỉnh tay sau khi chọn model.
- Cờ tutorial tách riêng theo loại xe (quyết định #3 ở `shape.md`) mặc định YES trong plan — cần người dùng xác nhận hoặc yêu cầu đổi sang cờ chung trước khi Codex code.
