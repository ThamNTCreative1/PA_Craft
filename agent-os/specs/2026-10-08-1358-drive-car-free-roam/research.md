# Research — mission Drive Car tự do

Status: RESEARCH READY
Source logic confirmation: CONFIRMED BY USER - basic driving scope; Fuel/Coin/Tunning excluded
Implementation approval: NOT GRANTED
Date: 2026-10-08, Asia/Bangkok
Target: `D:/Source/PA_Craft`
Reference: `D:/Source/party-craft/Assets` (local, read-only)

## Phạm vi và quyền thực hiện

- Yêu cầu: mission ô tô cho lái tự do trên đường; giữ UI như game gốc; tutorial giống mission motorbike; player tạm disable khi lên ô tô và active lại khi Out.
- Chỉ khảo sát. Chỉ ghi hai tài liệu trong folder mới này và thay pointer `agent-os/specs/current.md` theo yêu cầu. Không sửa code, scene, prefab, package hoặc project tham khảo; không copy code, commit/push, chạy Editor/build hay checkout.
- Không đọc `current.md` cũ hoặc bất kỳ spec cũ nào. Kết luận dựa trên source hiện tại, product context, workflow và standards.
- Skills đã dùng: analyze-luna-project, luna-production-governance; router: luna-cross-project-reuse, luna-input-handling, luna-tutorial-onboarding, luna-runtime-compatibility. Chưa làm implementation plan; architecture và verification skills sẽ bắt buộc ở bước plan sau Gate A.
- Có thay đổi tồn tại trước khảo sát: GameController.cs, Gameplay.unity, DrivingPlayModeChecks.cs, SVC_Luna.asset, Packages/manifest.json, packages-lock.json, luna.json, IDE state và các thư mục untracked (gồm MissionsJournal/UI/agent-os). Không hoàn tác hoặc coi đó là thay đổi của research.

## Hiện trạng đã quan sát

1. Unity `6000.0.60f1`; scene duy nhất bật trong EditorBuildSettings là `Assets/_Playable_/Scenes/Gameplay.unity`.
2. `MissionsJournalController.OnGoPressed` dừng hand sequencer nhưng chỉ đóng journal/mở gameplay nếu `MissionRowView.IsMotorbikeMission` đúng. Mission ô tô `drive_car_distance` đã có trong scene, nhưng GO chưa có đích gameplay. Không tìm thấy controller lái ô tô trong `_Playable_/Scripts`.
3. `PlayerAction` dù đặt tên event `CarEntered` và property `IsInCar`, hiện chỉ quản lý `MotorbikeController`. Không được suy luận từ tên rằng ô tô đã hoạt động.
4. Motorbike hiện có: tìm xe gần trong danh sách serialized, tap với raycast/kiểm tra UI, mount, điều khiển tiến/lùi/trái/phải, camera follow, Out yêu cầu giảm tốc rồi tìm chỗ đứng an toàn. Player vẫn active và được parent vào rider seat; capsule tắt, Rigidbody kinematic. Đây không phải hành vi disable player root mà người dùng yêu cầu cho ô tô.
5. `GameController.SetRiding` chỉ bật/tắt `UIPlayer` (fileID 491263488) và `UI motobike` (539229847). `_drivingTutorial` là `First Ride Tutorial` (1307206192); `_moveTutorial` là Text (TMP), fileID 1694405947. `_startTutorial` tham chiếu 1944867691 (prefab/stripped reference cần giữ binding khi lập plan).
6. `CameraController.FollowVehicle` và field `_vehicle` chỉ nhận MotorbikeController. Offset lái, speed pullback và bỏ qua collider của xe đều phụ thuộc kiểu này. Chỉ gọi `SetFollowTarget` cho ô tô sẽ chưa có đầy đủ hành vi camera lái.
7. `Assets/Game/Resources/UI/UICarController.prefab` đã có trong target. SHA-256 giống hoàn toàn prefab cùng đường dẫn tương đối trong nguồn: `2f54149b576160b23ae415451a664fd140bc85cb5ecfcc0416b124978e418a64`. Đây là bằng chứng cấu trúc prefab giống nhau, chưa phải bằng chứng render/runtime giống nhau.
8. Prefab UI có Left, Right, Forward, Back, HandBreak, Exit, CarTouchpad và cả Tunning, Fuel, Coin. `changeSpeed: 10`; inputData GUID `2a485ca714c33f54f987927a53915bbc`. Script UICarController GUID `f45150b1c04e8034db26f3ab90760a30` không tìm thấy trong metadata target: prefab không thể được coi là controller đã hoạt động; cần audit/replace binding đã duyệt.
9. Target có model `Assets/GameAsset/Model/Cars/Car_*.fbx` và bánh xe; chưa chọn model, spawn pose hoặc cấu hình collider. Các prefab instance trực tiếp của Gameplay được resolve ra player, motorbike, map, joystick và UI; không thấy prefab ô tô lái riêng trong các instance đó. Không khẳng định map FBX không chứa hình xe trang trí.

## Tutorial motorbike cần đối chiếu chính xác

- Journal mở: disable PlayerAction/PlayerController, freeze Rigidbody, tắt start/move tutorial và GamePanel; hand sequencer trỏ các GO.
- GO motorbike: đóng journal, khôi phục constraints/components, bật start/move tutorial và GamePanel.
- Khi opening tutorial còn hiện, GameController nhận touch Began (ưu tiên touch) hoặc mouse down, thử mount ngay bằng `TryMountFromTutorial`. Có hit area mở rộng, kiểm tra xe nhìn thấy; cho phép bỏ giới hạn khoảng cách trong tutorial. Tap trượt không dismiss tutorial; đi bộ thật có thể dismiss.
- Khi mount: tắt opening tutorial, bật UI lái. Lần lái đầu mới hiện First Ride Tutorial (`_hasShownDrivingTutorial` hiện là cờ toàn cục theo instance).
- Hint chỉ tắt sau khi đã có drive input tuyệt đối >= 0.01 và dịch chuyển ngang > 0.05 đơn vị Unity. Code đo vị trí player, không phải xe; phải thích nghi khi player root bị tắt/không đi theo ô tô. Physics settling trước input không được tính.
- Out tắt hint. Vào lại hiện tại không tự phát lại hint lần đầu. Mission switching giữa ô tô/motorbike chưa có semantics cho cờ tutorial theo từng mission; cần chốt trong plan sau xác nhận nguồn.

## Nguồn tham khảo và behavior contract đề xuất xác nhận

Cập nhật người dùng: không lấy Fuel/Coin/Tunning, chỉ lấy logic lái xe bình thường. Loại cả widget và logic của ba phần này; giữ UI điều khiển còn lại, tutorial motorbike và tắt/bật player khi lên xe/Out. Xác nhận phạm vi nguồn không phải phê duyệt chi tiết vật lý hoặc triển khai.

Có hai nhánh nguồn: `CustomSkyCar + CustomCarUserControl + Opsive CarController` và `ArcadePlayerVehicle + ArcadeCarController + VehicleController + carController`. Cả hai tồn tại trong prefab nguồn; chưa chạy source để xác định xe nào đang được chọn ở scene gameplay nguồn. Đề xuất lấy lát cắt hành vi của nhánh Arcade và UI UICarController, không nhập framework vật lý/ability nguyên khối.

1. Preconditions: mission ô tô đã được chọn, xe khả dụng, player đang đi bộ; input UI không nhầm với thao tác chọn xe. Điều kiện lên xe/tutorial dùng semantics của target, không giữ ngưỡng 10m/hệ ability nguồn.
2. Lên xe: chuyển quyền lái sang ô tô, chuyển camera/HUD, tắt player GameObject theo yêu cầu. Việc tắt root là adaptation mới; nguồn Opsive chỉ có tùy chọn tắt SkinnedMeshRenderer, không chứng minh có SetActive(false) player root.
3. UI giữ nút: trái/phải tạo trục lái; tiến/lùi tạo trục ga; phanh riêng; nguồn ưu tiên trái khi trái+phải cùng giữ, ưu tiên tiến khi tiến+lùi cùng giữ. Hai trục được Lerp theo fixedDeltaTime với changeSpeed 10. OnDisable đưa trục và phanh về 0. Giữ thứ tự ưu tiên này nếu cần đúng nguồn, vì target motorbike hiện cộng trừ hai nút và cho kết quả 0 khi giữ đối nghịch.
4. `ArcadePlayerVehicle.FixedUpdate` đưa hai trục vào `SetInput`; LocalSteering đưa y vào motor, x vào steering. Phanh được gọi riêng qua `carController.Break`; `ArcadeCarController.SetHandbrake` rỗng, không phải điểm phanh thật.
5. Hành vi lái đề xuất giữ: tiến/lùi, tăng tốc có giới hạn, lái mượt, phanh, chống trượt ngang và hỗ trợ ổn định thân xe. `carController` nguồn dùng lực Rigidbody, WheelCollider, wheel grounded, turn-assist tăng dần theo thời gian giữ lái. Không hứa tái tạo chính xác thông số/vật lý nếu thay WheelCollider bằng collider/raycast tối giản cho Luna.
6. Out: reset input, dừng quyền điều khiển xe, tìm vị trí xuống hợp lệ, active player và trả camera/HUD đi bộ. Đề xuất dùng quy tắc Out target motorbike: giảm tốc trước, nếu không có chỗ đứng thì tiếp tục được lái và thử lại. Đây là adaptation đề xuất, chưa được duyệt.
7. Tutorial ô tô theo chuỗi motorbike ở trên nhưng theo dõi input và chuyển động ô tô; input/Out/camera phải tiếp tục hoạt động khi player root inactive.
8. Đọc “lái thoải mái mà không sao” theo giả định cần xác nhận: không thêm tiêu hao nhiên liệu, damage/death, mất bánh, fail hoặc điều kiện kết thúc theo quãng đường; vẫn có collision đường/tường. Không suy ra quyền xuyên tường, bỏ biên map hoặc bỏ timer CTA hiện có.

## Lát cắt giữ / thích nghi / loại bỏ

| Source element | Quyết định đề xuất | Dependency và cách thích nghi cần thiết |
|---|---|---|
| UICarController.FixedUpdate, OnDisable | Giữ behavior, thích nghi input | CustomVirtualButton/InputBase và VehicleUserInputData cần cho bản nguồn; target có DriveHoldButton/EventSystem, thay binding thay vì đem Opsive/HAVIGAME vào. Reset cả trạng thái hold/target smoothing khi đóng UI hoặc mất focus. |
| UIVehicleControllerBase fields, VehicleUserInputData | Giữ ý nghĩa dữ liệu | Trái/phải/tiến/lùi/Exit và horizontal/verticle/handbrake; không cần UIFrame/ScriptableObject singleton hay trường jump để giữ behavior. |
| ArcadePlayerVehicle.ReadInput, FixedUpdate, EnableDisableCar | Giữ chuyển input/quyền lái/reset | Nguồn cần GameManager, Rigidbody, ArcadeCarController, carController. Target cần reference tường minh và luồng input còn active khi player tắt; keyboard chỉ debug. |
| VehicleController.LocalSteering; ArcadeCarController.SetMotor/SetSteering | Giữ mapping x/y | Loại WorldSpaceSteering, WorldSpaceTurn, random handbrake, ThirdPersonInputActions, parking framework và wrapper dư. Prefab ArcadeCarBase có controlMode 0 = LocalSteering, inputSystemEnabled 0. |
| carController.carAcceleration, carBrake, carFric, ApplyTurnAssist, UpdateSteerHoldDuration, UpRight | Chỉ lấy quy tắc chuyển động/ổn định phù hợp | Bản nguyên cần Rigidbody, curves, force points, WheelCollider arrays và WheelController. Phương án phù hợp target là viết adaptation tối giản dựa trên primitives/grounding hiện có; phải thử Luna và được duyệt thay đổi feel. Không chốt class hoặc thuật toán thay thế ở Gate A. |
| carController.WheelCheck, wheelTurn; WheelController.FixedUpdate/IsGrounded | Thích nghi | Chỉ cần bám đường và hình bánh quay/lái. Không kéo wheel detach, skid smoke/trail/audio, dynamic AddComponent hoặc bộ wheel collision phức tạp. |
| ArcadePlayerVehicle.EnteredVehicle/ExitVehicle; UserVehicleManager.OnCharacterEnteredVehicle/OnCharacterExitedVehicle | Giữ ý nghĩa vào/ra + đổi HUD/camera | Loại UI stack/singletons, Traffic/Parked priority, tracker, analytics, fuel coroutine; dùng flow target sau plan. |
| UserCarInteractable.Execute; CustomDrive; Opsive Drive | Chỉ tham khảo điểm vào/ra | Loại ability framework, swim/ride checks riêng nguồn, outfit/pet/happy-loop. Player SetActive(false/true) là yêu cầu mới phải quản lý bên ngoài player. |
| UICarController.prefab hiện có ở target | Giữ layout/sprites/text theo yêu cầu UI | Không copy asset từ nguồn. Thay script binding sau duyệt. Nút Exit nguồn dùng virtual Action và BackToHomeButton.Hide; chỉ đổi UI là chưa thoát xe. |
| Tunning/Fuel/Coin trên UI | Loại theo xác nhận người dùng | Không lấy widget, binding, dữ liệu hoặc logic tương ứng. Chỉ giữ UI điều khiển lái xe; chưa sửa prefab trong research. |
| MobileTouchInput / CarView | Tham khảo gesture/chuyển camera, không nhập | Target đã có TouchController/CameraController; cần thích nghi car follow, collision ignore, input vùng camera mà giữ vị trí UI. |
| CustomCarUserControl/CustomSkyCar/Opsive CarController nhánh cũ | Không chọn để port | Thêm WheelCollider, Opsive locomotion/ability, traffic, attributes, tuning, fuel, tracking; không lợi cho phạm vi tối thiểu. |

## Rủi ro và điểm chưa quyết định

- **Input/Out chết theo player:** PlayerAction nằm trên player và quản lý mount/Out; GameController đọc input/vị trí player. Tắt root theo yêu cầu có thể dừng Update cần thiết; callback button vẫn có thể gọi method trên object inactive nhưng không nên dựa vào điều đó. Owner của session lái và Out phải sống bên ngoài subtree bị disable, chốt trong plan.
- **Source không đưa vào Luna nguyên trạng:** carController.Update truy cập Keyboard.current ngoài guard internalControl; VehicleController có ThirdPersonInputActions và import New Input System dù prefab tắt inputSystemEnabled. Không chỉ tắt checkbox là loại được dependency biên dịch. WheelCollider chưa có bằng chứng Luna runtime cho project này.
- **Khác biệt/giới hạn nguồn:** carAcceleration chỉ clamp vận tốc tiến (localVelocity.z > limitVelocity), chưa clamp lùi; turn-assist lấy dấu ga, chưa lấy vận tốc thực khi đang đổi chiều. Chọn sửa khi adapt hay giữ behavior phải được duyệt, không mặc định sửa nguồn.
- **UI:** prefab target giống byte nguồn nhưng nhiều script GUID/utility nguồn chưa có trong target. Cần kiểm tra Editor ở nhiều aspect ratio. Fuel/Coin/Tunning đã được loại khỏi phạm vi UI và logic; giữ giao diện phần điều khiển còn lại.
- **Xe/đường:** model xe có sẵn nhưng chưa chọn; chưa đo kích thước, pivot, material, clearance, collider tại lề đường/giao lộ/biên map. “Không sao” không phải bằng chứng xe sẽ không lật/kẹt. Không import model nguồn trong research.
- **Lifecycle:** phải lưu/khôi phục state player (active, parent, physics, camera, UI) và xử lý vào/ra lặp, Out khi xe đang chạy, blocked exit, disable xe hoặc outcome lúc đang lái. Không tạo reset/replay mới.
- **Tutorial:** cờ lần đầu hiện dùng chung; cần xác định khi đổi mission có tutorial riêng từng loại hay một lần chung. Không lấy tutorial từ project nguồn.
- **CTA tồn tại:** GameManager.Start chạy timer; EndGame gọi GameEnded và InstallFullGame trực tiếp. Chưa tìm thấy class LunaController/ServiceLocator trong Assets qua tìm source. Đây là khoảng cách với standard sẵn có, không tự mở rộng scope để refactor. Không thay outcome/timer bằng giả định free-roam vô hạn.
- **Material/size:** giữ Built-in/Unlit, không thêm custom shader; GameController hiện có global brightness override. Chưa đo build dưới 4.5 MB, chưa kiểm tra material từng model xe. Không tuyên bố đã đạt budget hoặc Luna-compatible.
- **Quyền code bên thứ ba:** Biffe/Opsive là dependency bên thứ ba; chưa xác minh giấy phép chuyển code/asset. Chỉ mô tả behavior; không copy code/asset. Nếu plan định chuyển implementation nguyên văn, phải giải quyết quyền trước.

## Bằng chứng và giới hạn xác minh

Đã đọc source C#, YAML scene/prefab, GUID metadata, product/standards; so hash prefab UI; kiểm tra Git status read-only và scene build list. Không mở Unity, chạy PlayMode/Console, compile hay build vì research không được gây mutation. Không dùng URL Git/checkout/credential; nguồn local truy cập được.

Các bằng chứng cần có ở plan/implementation sau duyệt: GO ô tô, toàn chuỗi tutorial với input thật, player inactive nhưng lái/Out/camera vẫn chạy, khôi phục player đúng chỗ, phanh/đổi chiều/giữ nút đồng thời/mất focus, collision/curb/slope/biên đường, Out bị chặn và vào lại, regression motorbike, đối chiếu UI portrait/landscape, Console/compile, Luna device và đo package <4.5 MB. Đây là checklist khoảng trống nghiên cứu, chưa phải verification plan được duyệt.

## Handoff sau xác nhận phạm vi nguồn

Người dùng xác nhận chỉ lấy lái xe bình thường và loại Fuel/Coin/Tunning. Lát cắt đã xác định: tiến/lùi/trái/phải/phanh và UI điều khiển tương ứng; tutorial theo motorbike target; player root tắt khi lái và bật khi Out. Model/spawn, chi tiết vật lý/Out và tutorial nhiều mission cần chốt ở plan. Không có yêu cầu thay đổi timer/CTA.

Chưa có plan, file/class/interface design, approval triển khai hoặc code nhập. Research sẵn sàng chuyển Claude lập plan với danh sách thay đổi cụ thể và verification để xin duyệt riêng. Lượt cập nhật này chỉ sửa tài liệu theo phản hồi.
