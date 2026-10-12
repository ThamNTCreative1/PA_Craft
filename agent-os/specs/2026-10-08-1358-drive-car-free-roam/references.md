# References — Drive Car research

Status: RESEARCH READY - user confirmed basic driving scope; Fuel/Coin/Tunning excluded

Đường dẫn `T/` dưới đây tương đối với `D:/Source/PA_Craft/`; `S/` tương đối với `D:/Source/party-craft/Assets/`. Chỉ đọc file hiện tại; không tham chiếu spec cũ. Method names là locator chính; line number là snapshot lúc research.

## Target: entry points và dependencies

| File | Class / method / dữ liệu | Vai trò |
|---|---|---|
| T/Assets/_Playable_/Scripts/GameController.cs | GameController.Awake, Update, HandleStartTutorialPress, DismissStartTutorial, SetRiding | UI đi bộ/motorbike, tutorial lần đầu, input và ngưỡng chuyển động. |
| T/Assets/_Playable_/Scripts/UI/MissionsJournal/MissionsJournalController.cs | Awake, Show, Hide, OnGoPressed | Journal đang chỉ route motorbike; freeze player và bật/tắt tutorial. |
| T/Assets/_Playable_/Scripts/UI/MissionsJournal/MissionRowView.cs | IsMotorbikeMission, Awake, OnGoPressed | MissionId chỉ expose kiểm tra drive_motorbike_distance; status In progress. |
| T/Assets/_Playable_/Scripts/Controller/PlayerAction.cs | Awake, Update, UseMotorbike, TryMountFromTutorial, TryTutorialTapArea, IsTutorialBikeVisible, TryTapBike, ReadTap, OnDisable | Tap/UI exclusion, motorbike registration, event CarEntered thực ra cho bike, Out button. |
| T/Assets/_Playable_/Scripts/Controller/PlayerController.cs | ReadDriveInput, ReadSteerInput, SetDrivingControls, BeginRide, EndRide, CanStandAt, Teleport | Input nút hiện gắn player; parent/physics/rider; vị trí xuống xe. |
| T/Assets/_Playable_/Scripts/Controller/MotorbikeController.cs | Update, FixedUpdate, GroundAt, TryStep, TryMount, RequestDismount, TryDismount, ReleaseRider, OnDisable | Baseline lái/grounding/exit; Rigidbody + CapsuleCollider + seat + camera target + wheels. |
| T/Assets/_Playable_/Scripts/Controller/DriveHoldButton.cs | OnPointerDown/Up/Exit, Release, OnDisable, OnApplicationFocus/Pause | Hold đa pointer cho ga/lái, reset khi cancel. |
| T/Assets/_Playable_/Scripts/Controller/CameraController.cs | FollowVehicle, FollowPlayer, SetFollowTarget, GetAnchor, UpdateCamera | Follow vehicle typed motorbike, speed pullback, collision exclusion. |
| T/Assets/_Playable_/Scripts/Controller/TouchController.cs | RefreshLayout, OnPointerDown, OnDrag, OnPointerUp, OnDisable | Legacy EventSystem look input và vùng nửa phải. |
| T/Assets/_Playable_/Scripts/Manager/GameManager.cs | Start, CountdownEndGame, IECountdownEndGame, EndGame (53–54) | Timer/CTA hiện có, gọi SDK trực tiếp; ngoài phạm vi sửa. |
| T/ProjectSettings/EditorBuildSettings.asset; ProjectVersion.txt | Gameplay scene; Unity 6000.0.60f1 | Cấu hình đọc từ project. |
| T/Assets/_Playable_/Scenes/Gameplay.unity | 2909–2910 bike registry; 3775–3779 UI/tutorial refs; 14916 motorbike ID; 15170 car ID; 16070 car label | Evidence serialized mission/UI chưa có luồng ô tô riêng trong code. |
| T/Assets/Game/Prefabs/Motors/Playable Motobike 4.prefab | GUID c15f9da04f5cbf04bb25f4b3b07daead | Prefab motorbike scene đang tham chiếu. |
| T/Assets/Game/Prefabs/Characters/Player/Player.prefab | GUID 065775e2ae00e86419898e7634934246 | Player prefab scene đang tham chiếu. |
| T/Assets/GameAsset/Model/Map/Map cropped/CityMap_Cropped_Colliders.prefab | GUID 4844d8f399a50fb47adef2c062811a61 | Collision map trong scene; chưa chạy test đường. |
| T/Assets/GameAsset/Model/Map/Map cropped/CityMap_Cropped.fbx | GUID 41a703ca40c2b3e4e99255e5d83c89d8 | Map scene; chưa audit geometry bên trong. |
| T/Assets/Game/Resources/UI/UICarController.prefab | 467–474 controls/config; 1295 Exit; 1739 HandBreak; 1953 CarTouchpad | UI có sẵn, SHA256 bằng nguồn, cần thay dependency binding theo plan. |
| T/Assets/GameAsset/Model/Cars/Car_*.fbx; Wheels/*.fbx | Asset inventory, chưa chọn một xe | Có thể dùng asset sẵn, không cần copy xe từ nguồn để nghiên cứu logic. |

## Source: exact file / class / method

| File nguồn | Class / methods | Dependency bắt buộc của bản nguồn và phạm vi lấy |
|---|---|---|
| S/Game/Scripts/Vehicles/UI/UICarController.cs | Game.Vehicles.UI.UICarController.FixedUpdate, OnDisable | UI vehicle base, CustomVirtualButton, Opsive InputBase, VehicleUserInputData. Lấy ưu tiên nút, smoothing, phanh/reset. |
| S/Game/Scripts/Vehicles/UI/UIVehicleControllerBase.cs | UIVehicleControllerBase, serialized button_Left/Right/Forward/Back/Exit, inputData | HAVIGAME.UI.UIFrame. Chỉ giữ ý nghĩa binding, bỏ framework. |
| S/Game/Scripts/Vehicles/VehicleUserInputData.cs | VehicleUserInputData.horizontal, verticle, handbrake, jump | ScriptableObject; chỉ cần ba giá trị trục/phanh, không jump. |
| S/Game/Scripts/Vehicles/ArcadePlayerVehicle.cs | ArcadePlayerVehicle.ReadInput, FixedUpdate, EnableDisableCar, EnteredVehicle, ExitVehicle, SetDrivingPaused | SkyCar, Rigidbody, ArcadeCarController, carController, Traffic_Car, VehicleAttributeManager, UserVehicleManager, Camera/CarView, EventDispatcher, tracker và tracking. Chỉ lấy input/session transition. |
| S/Biffe Arcade Vehicle Physics PRO/Example/VehicleController.cs | VehicleController.SetInput, LocalSteering | Abstract motor/steer; input actions trong class là dependency cần bỏ, không lấy class nguyên. |
| S/Biffe Arcade Vehicle Physics PRO/Example/ArcadeCarController.cs | ArcadeCarController.SetMotor, SetSteering, SetHandbrake | Rigidbody và carController; SetHandbrake rỗng, phanh thật gọi trực tiếp Break. |
| S/Biffe Arcade Vehicle Physics PRO/Example/carController.cs | carController.FixedUpdate (127), UpRight (162), carAcceleration (176), ApplyTurnAssist (244), UpdateSteerHoldDuration (265), carBrake (283), carFric (296), WheelCheck (351), wheelTurn (368) | Rigidbody, curves, bodyCenter/frictionPoint/CentreOfMass, WheelCollider arrays, WheelController; audio phụ. Chỉ ứng viên quy tắc lái và ổn định; không xác nhận WheelCollider Luna. |
| S/Biffe Arcade Vehicle Physics PRO/Example/WheelController.cs | WheelController.FixedUpdate, IsGrounded, Free, skidControls, StopDrift | WheelCollider, wheelModel, colliders, Rigidbody, trail/particle/audio. Chỉ tham khảo wheel pose/ground contact; Free/skid effects loại. |
| S/Game/Scripts/Vehicles/UserVehicleManager.cs | OnCharacterEnteredVehicle, OnCharacterExitedVehicle | UIManager.Pop/Push<UICarController>, GameplayPanel, TrafficCarManager, PakedCarManager. Giữ đổi HUD/session, bỏ managers. |
| S/Game/Scripts/Traffic/UserCarInteractable.cs | UserCarInteractable.Start, Execute | IPointOver/IDriveSource, GameManager, GameplayPanel, UltimateCharacterLocomotion, CustomDrive. Guard khoảng cách 10m; không nhập framework. |
| S/Game/Scripts/OpsiveCustom/Character/CustomDrive.cs | CustomDrive.CanStartAbility, SetValue, AbilityStarted, AbilityStopped | Opsive Drive; outfit, PetManager, PrimeTween Sequence, GameData.Happy. Loại dependencies ngoài lái xe. |
| S/Opsive/UltimateCharacterController/Scripts/Character/Abilities/Drive.cs | Drive.OnEnteredVehicle (234), OnExitedVehicle (396), AbilityStopped (429) | Locomotion/animation/IDriveSource; tùy chọn m_DisableMeshRenderers chỉ ẩn renderer (253), không disable root. |
| S/Opsive/UltimateCharacterController/Demo/Scripts/Car/SkyCar.cs | SkyCar.EnableDisableCar, EnteredVehicle, ExitVehicle | Base nguồn cho lifecycle xe; không cần mang Opsive vào target. |
| S/Game/Scripts/OpsiveCustom/Car/CustomCarUserControl.cs | CustomCarUserControl.FixedUpdate, OnEnable | Nhánh cũ: CarUserControl + VehicleUserInputData -> m_Car.Move(h,v,v,handbrake). Không chọn port. |
| S/Game/Scripts/OpsiveCustom/Car/CustomSkyCar.cs | EnteredVehicle, ExitVehicle, EnterTrafficVehicle/EnterNonTrafficVehicle, ExitTrafficVehicle/ExitNonTrafficVehicle, ConsumeFuel, OnAttributeChanged | Nhánh cũ có fuel/tuning/traffic/analytics; loại. |
| S/Opsive/UltimateCharacterController/Demo/Scripts/Car/CarController.cs | CarController.Move, ApplyDrive, CapSpeed, SteerHelper, AddDownForce, TractionControl | Xác định nhánh cũ phụ thuộc WheelCollider; không lấy subsystem. |
| S/Game/Scripts/UI/Vehicle/UICarControl.cs | UICarControl.OnShow, OnHide | Chỉ wrapper gọi base UIFrame; không phải controller input cần lấy. |
| S/Game/Scripts/Utility/BackToHomeButton.cs | BackToHomeButton.Start, Hide, OnDestroy | Nút Exit prefab có component này; chỉ Pop UI và delay 0.3s Push GameplayPanel, không đủ để xử lý Out vật lý. |
| S/Game/Scripts/Gameplay/MobileInput/MobileTouchInput.cs | MobileTouchInput.Start, OnEnable, DetectSwipe, IsValidSwipeZone | VirtualAxis, CustomVirtualControlsManager, settings/tracking; target dùng TouchController, không nhập chuỗi này. |

## Source prefab và UI evidence

- `S/Game/Resources/UI/UICarController.prefab`: controller GUID `f45150b1c04e8034db26f3ab90760a30`, changeSpeed 10. Exit tại khoảng 1368 có `m_ButtonName: Action` và CustomVirtualButton, kèm BackToHomeButton; không có persistent onClick trực tiếp thoát xe. Một số script GUID cũ không resolve qua tìm metadata source; không khẳng định prefab nguồn chạy sạch.
- `S/Game/Prefabs/Cars/Arcade/CarArcadeBase.prefab`: tham chiếu ArcadePlayerVehicle GUID `6f0232f2f0951154593abba8ef57a160`, fields arcadeController/driveController. Prefab nguồn là evidence, không sao chép.
- `S/Game/Prefabs/Cars/ArcadeCarBase.prefab`: controlMode 0 (LocalSteering), inputSystemEnabled 0; có controller chain Arcade. Không suy ra New Input System đã được loại khỏi assembly.
- `S/Game/Prefabs/Cars/Car demo Original.prefab`: kết quả truy GUID nhánh CustomSkyCar `05ef93f10a07cb24892b18b3cdf50052`; chỉ dùng để chứng minh nhánh cũ vẫn tồn tại, chưa audit toàn prefab.
- Layout prefab gốc có Fuel, Coin, Tunning. Người dùng xác nhận không lấy cả widget và logic của ba phần này; giữ UI điều khiển lái xe cơ bản. Research chưa sửa prefab.

## Authority / standards đã đọc

- `T/AGENTS.md`; `T/agent-os/workflows/codex-claude-codex.md`.
- Product context trong `T/agent-os/product/` (mission, tech stack, roadmap; không sửa).
- `T/agent-os/standards/index.yml`; ai-agent approval-gates-and-change-control, cross-project-logic-reuse, roles-and-handoff, safety-scope-and-verification.
- Luna runtime-compatibility, luna-controller, tutorial-and-onboarding, scene-budget-4_5mb, build-budget.
- `.agents/skills/analyze-luna-project/SKILL.md`, `luna-production-governance/SKILL.md`, `luna-cross-project-reuse/SKILL.md`, `luna-input-handling/SKILL.md`, `luna-tutorial-onboarding/SKILL.md`, `luna-runtime-compatibility/SKILL.md`; governance `references/verification.md`.

Research không dùng web, Git URL, spec cũ hoặc kiến thức approval từ work item khác. Không copy source code. Người dùng xác nhận phạm vi lái xe cơ bản và loại Fuel/Coin/Tunning; chi tiết adaptation phải được duyệt trong plan trước implementation.
