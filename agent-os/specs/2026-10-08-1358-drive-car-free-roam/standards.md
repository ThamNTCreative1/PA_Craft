# Standards checklist — Mission Drive Car tự do

Status: PENDING APPROVAL
Áp dụng `luna-production-governance`, `luna-code-architecture`, `luna-cross-project-reuse`, `luna-input-handling`, `luna-tutorial-onboarding`, `luna-runtime-compatibility`, `luna-test-and-verify` cho `plan.md`.

## OOP / SOLID review

- **SRP**: `CarController` chỉ lo vật lý+vòng đời xe hơi; UI toggling nằm ở `GameController`; mount-detection nằm ở `PlayerAction`; ẩn/hiện player nằm ở `PlayerController`. Không gộp input+rule+UI vào một class (khớp `luna-input-handling`: "Do not combine input, domain rules and rendering in one component" — `CarController` đọc input qua `DriveHoldButton.IsHeld`, không tự vẽ UI).
- **OCP**: `IDrivableVehicle` cho phép `CameraController`/`PlayerAction` mở rộng sang vehicle thứ hai không cần sửa logic follow/mount cũ. `MissionRowView.IsSupportedMission` cho phép mở sandbox cho N mission tương lai mà không nhân thêm bool mỗi lần (miễn các mission đó dùng chung lối mở).
- **LSP**: `CarController`/`MotorbikeController` đều thoả `IDrivableVehicle` với cùng ngữ nghĩa (`TryMount` trả true/false theo đúng điều kiện, `RequestDismount` không dismount ngay mà chờ tốc độ an toàn) — không class nào throw hoặc bỏ qua contract.
- **ISP**: `IDrivableVehicle` chỉ chứa đúng 6 thành viên mà `CameraController`/`PlayerAction` thực sự dùng, không kéo theo field nội bộ (acceleration, grip...) vào interface.
- **DIP**: mọi dependency qua `[SerializeField]` hoặc tham số method (`TryMount(PlayerController player, ...)`), không runtime lookup (`FindObjectOfType`, singleton tra cứu) — `CarController` lấy `GameController` qua serialized reference giống cách `PlayerController._gameController` đã làm, giữ nhất quán.

## Pattern justification (bắt buộc ghi lại mỗi pattern)

| Pattern | Vấn đề cụ thể | Alternative đơn giản hơn đã xét | Vì sao alternative bị loại |
|---|---|---|---|
| Interface (`IDrivableVehicle`) | `CameraController`/`PlayerAction` cần follow/mount 2 loại vehicle đã duyệt (bike + car) | type-check/if-else theo class cụ thể tại mỗi điểm dùng | lặp logic ở ≥2 nơi (camera, player action) ngay ở lần thêm thứ 2; không mở rộng được |
| Generic helper method (`FindNearest<T>`, `TryTapVehicle<T>`) trong `PlayerAction` | thuật toán tap/raycast/nearest giống nhau 100% giữa bike/car, chỉ khác mảng dữ liệu | copy-paste nguyên block cho car | trùng lặp y nguyên logic đã có, mọi sửa bug sau này phải sửa 2 nơi |
| Nested state class (`RideUIState`) trong `GameController` | block "toggle UI + hiện hint lần đầu + tắt hint theo ngưỡng input" sẽ bị lặp nguyên văn cho car nếu không tách | thêm method `SetDrivingCar`/`UpdateCarTutorial` copy từ `SetRiding`/`Update` hiện tại | lặp đúng đoạn threshold-detection, phải sửa song song mỗi khi tinh chỉnh ngưỡng — nêu rõ đây là Option A trong `plan.md`, Option B (copy) vẫn được liệt kê làm fallback nếu người dùng muốn ít file/API mới hơn |

Không pattern nào khác được thêm (không Service Locator mới, không Factory/Pool/Command — không có trigger tương ứng: không cần queue/undo/replay, không có allocation pressure đo được, không có construction phức tạp).

## Luna runtime constraints

- Input: tái dùng `DriveHoldButton` (old Input, EventSystem-based) — không thêm New Input System.
- Render: không thêm shader/material mới; UI car dùng lại Unlit prefab sẵn có, chỉ xoá node không dùng.
- Không prohibited API: tất cả lookup qua SerializeField; không `FindObjectOfType`/`GameObject.Find`/tag search/`Resources.FindObjectsOfTypeAll`; không Physics2D bị cấm.
- Collider: khuyến nghị `BoxCollider` đơn giản cho thân xe (không MeshCollider cho mesh import lớn), bánh xe chỉ xoay visual (`Transform`), không WheelCollider — khớp ghi nhận research "WheelCollider chưa có bằng chứng Luna runtime".
- `LunaController`/Service Locator: không chạm — feature này không gọi Luna SDK trực tiếp, không cần facade mới.
- Outcome flow: không thêm/đổi Win/Lose/EndCard/CTA; `GameManager` không nằm trong file thay đổi.

## Cross-project reuse compliance

- Chỉ lấy HÀNH VI (acceleration/brake/steer formula dạng "tiến tới target speed theo acceleration/brake rate", "yaw rate theo steer×speed") đã mirror đúng cấu trúc `MotorbikeController` hiện có trong target (không phải copy từ source Opsive/Biffe) — tránh rủi ro license đã ghi ở research.
- Không mang theo: WheelCollider, Opsive ability framework, Traffic/Parked manager, fuel/tuning/analytics, New Input System actions, `BackToHomeButton`/UIFrame stack.
- UI: giữ layout/sprite của `UICarController.prefab` có sẵn trong target (đã xác nhận cùng SHA-256 cấu trúc với nguồn), chỉ xoá 3 nhóm widget theo yêu cầu và thay script binding — không copy asset mới từ `party-craft`.

## Verification mapping (acceptance criteria → check)

| Acceptance criterion | Check |
|---|---|
| Lái tiến/lùi/trái/phải/phanh đúng input | PlayMode thủ công, giữ nút đơn/đối nghịch, bàn phím debug editor |
| Giữ UI gốc, loại Fuel/Coin/Tunning | So sánh trực quan UI trước/sau, kiểm tra không còn component/script liên quan 3 widget |
| Tutorial giống motorbike | So sánh chuỗi bước thủ công: opening tutorial dismiss bằng tap/đi bộ, First Ride hint hiện/tắt đúng ngưỡng |
| Disable player khi lái, active lại khi Out | Quan sát Hierarchy lúc PlayMode: player GameObject `inactive` trong lúc lái, `active` + đúng vị trí sau Out |
| Không phá motorbike hiện có | Full regression motorbike theo `plan.md` mục 5 trước khi coi car hoàn tất |
| Không vượt 4.5MB | Đo build/scene thật, ghi số liệu vào `implementation-report.md`, không giả định |
| Không lỗi Console mới | Đọc Console sau mỗi bước compile trong `plan.md` mục 4 |

## Điều kiện dừng và xin duyệt lại

Theo governance: nếu khi implement phát hiện `CarTouchpad` là input mechanism khác giả định (vd. drag-steering cần class mới), hoặc model xe cần thêm xử lý collider/scale ngoài BoxCollider đơn giản, hoặc cần đổi field/API ngoài danh sách `plan.md` mục 1 — dừng, báo cáo, chờ duyệt lại trước khi tiếp tục; không tự mở rộng scope.
