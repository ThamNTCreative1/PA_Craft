# Shape — Mission Drive Car tự do

Status: PENDING APPROVAL
Dựa trên: `research.md`, `references.md` (cùng spec folder), `agent-os/product/mission.md`, `agent-os/product/tech-stack.md`.
Không đọc spec cũ. Không sửa project trong bước này.

## Bối cảnh đã xác nhận ở Gate nghiên cứu

- Scope nguồn: chỉ lấy hành vi lái xe cơ bản (tiến/lùi/trái/phải/phanh) từ nhánh Arcade + UI `UICarController`; loại toàn bộ Fuel/Coin/Tunning (widget + logic). Đã CONFIRMED BY USER ở `current.md`.
- Giữ UI điều khiển ô tô gốc (`Assets/Game/Resources/UI/UICarController.prefab` đã có trong target).
- Tutorial ô tô theo cấu trúc tutorial motorbike hiện có (opening tutorial dismiss bằng tap xe hoặc đi bộ; First Ride hint biến mất khi có input + dịch chuyển).
- Player bị tắt (SetActive(false) root) khi lái ô tô, bật lại khi Out — khác hành vi motorbike (motorbike giữ player active, parent vào seat).
- Không đổi timer/CTA/outcome flow hiện có (`GameManager`), không thêm Win/Lose/EndCard mới. `tech-stack.md` không khai báo outcome shape cụ thể khác — giữ nguyên CTA hiện tại.
- Không copy code nguồn Opsive/Biffe; chỉ viết lại hành vi mô tả, tránh rủi ro license.

## Vì sao cần một lớp trừu tượng vehicle (justification bắt buộc theo governance)

`CameraController.FollowVehicle` và luồng mount/exit trong `PlayerAction`/`MotorbikeController` hiện gắn cứng vào kiểu `MotorbikeController`. Thêm `CarController` tạo ra **implementation thứ hai được duyệt** cho đúng vai trò "vehicle người chơi lái được" — đây là trigger hợp lệ cho interface theo `luna-code-architecture` ("an approved variant exists"). Phương án đơn giản hơn (nhân đôi code camera/mount theo kiểu xe, hoặc if/else theo type) bị loại vì sẽ lặp lại logic follow/mount/exit mỗi khi thêm một vehicle và phá OCP ngay ở lần thêm thứ hai này.

→ Đề xuất `IDrivableVehicle` (xem `plan.md`), `MotorbikeController` implement không đổi hành vi, `CarController` implement mới.

## Vì sao input/Out phải sống ngoài subtree Player

Research đã nêu rủi ro: tắt player root sẽ dừng `Update`/`FixedUpdate` của mọi script trên player (bao gồm `PlayerAction`, `PlayerController`). Thiết kế đề xuất: `CarController` tự đọc input từ `DriveHoldButton` của riêng UI panel ô tô (không qua `PlayerController`), và nút Exit của UI ô tô gọi trực tiếp `CarController.RequestDismount()` (không qua `PlayerAction`). `CarController` sống trên GameObject của xe, không bị tắt khi player bị tắt, nên Update/FixedUpdate của nó không bị ảnh hưởng. Đây là khác biệt có chủ đích so với motorbike (motorbike đọc input qua rider vì rider vẫn active) — không phải sao chép máy móc pattern cũ.

## Scope rõ ràng

**Trong scope:**
- Lớp `IDrivableVehicle`, `CarController`, mở rộng `PlayerController`, `PlayerAction`, `CameraController`, `GameController`, routing GO cho mission ô tô trong `MissionsJournalController`/`MissionRowView`.
- Điều chỉnh prefab `UICarController` (xoá Fuel/Coin/Tunning, gắn lại `DriveHoldButton`, nút Exit) — thực hiện bởi Codex sau khi plan được duyệt, Claude chỉ thiết kế.
- Thêm một instance xe vào `Gameplay.unity` (chọn 1 trong các `Car_*.fbx` có sẵn), cấu hình collider/camera target/wheel visuals.
- Tutorial lái ô tô lần đầu, theo đúng cấu trúc First Ride Tutorial hiện có của motorbike.

**Ngoài scope (không làm, không giả định):**
- Fuel/Coin/Tunning dưới mọi hình thức.
- WheelCollider hoặc bất kỳ physics framework bên thứ ba (Opsive/Biffe) nguyên trạng.
- Thay đổi `GameManager` timer/CTA/EndCard hoặc tạo outcome mới.
- Mission 2 (paintball) — không đụng tới.
- New Input System.
- Giả định build đã đạt 4.5MB hoặc đã Luna-compatible trước khi đo.

## Quyết định mở cần người dùng chốt trước/khi duyệt plan

1. **Model xe cụ thể** trong số các `Car_*.fbx` sẵn có — Claude không có cách xem trực quan; đề xuất Codex chọn 1 model cỡ sedan hợp lý và xác nhận bằng screenshot khi implement, trừ khi người dùng đã có model chỉ định.
2. **Cấu trúc refactor tutorial UI** trong `GameController` (xem `plan.md` mục Class Design, phần GameController) — Option A (tách `RideUIState` để tái dùng logic first-ride giữa bike/car, khuyến nghị) vs Option B (nhân đôi method `SetRiding`→`SetDrivingCar`, đơn giản hơn nhưng lặp code).
3. **Cờ "đã xem tutorial lần đầu" theo từng loại xe hay chung** — đề xuất tách riêng theo loại xe (`_hasShownMotorbikeTutorial`, `_hasShownCarTutorial`) vì UI/control khác nhau đáng kể giữa hai loại xe.
4. **Cảm giác phanh tay (handbrake)**: hãm cứng không trượt (đơn giản, khuyến nghị cho scope "lái thoải mái") hay hãm có trượt ngang nhẹ (cảm giác arcade hơn, cần tinh chỉnh thêm). Không chốt công thức physics cuối cùng trước khi thử trong Luna.
5. **Collider thân xe**: BoxCollider (khớp hình hộp xe hơi, khuyến nghị) hay tái dùng CapsuleCollider như motorbike (đơn giản hoá code TryStep có sẵn nhưng khớp hình kém hơn với xe 4 bánh).
6. **Node `CarTouchpad` trong prefab UI gốc**: chưa rõ là vùng kéo lái (drag steering) hay chỉ vùng chặn input. Cần Codex kiểm tra tại thời điểm implement; nếu là vùng kéo lái thật, có thể thay cho 2 nút Left/Right rời — sẽ cần duyệt lại UI binding nếu khác giả định (2 nút rời).

Plan ở `plan.md` được viết theo phương án khuyến nghị (Option A, cờ tách riêng, hãm cứng, BoxCollider) nhưng mọi điểm trên có thể đổi khi người dùng duyệt mà không làm thay đổi kiến trúc tổng thể (file/class list không đổi, chỉ đổi field/constant).
