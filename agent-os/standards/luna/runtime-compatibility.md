# Luna Runtime Compatibility

Áp dụng cho code Unity chạy trong Luna Web/WebGL/IL2CPP. Không áp dụng máy móc cho Editor hoặc standalone build.

## Runtime references

- Không dùng `FindObjectOfType`, `FindObjectsOfType`, `GameObject.Find`, `GameObject.FindWithTag`, `FindGameObjectsWithTag` hoặc `Resources.FindObjectsOfTypeAll`.
- Gán dependency bằng `[SerializeField]`, constructor cho pure C#, hoặc registry/service locator tối giản được khởi tạo rõ ràng.
- Cache reference trong `Awake()`/`Start()`; không tìm object trong `Update()`, callback input hoặc loop gameplay.
- Reference bắt buộc phải có validation và thông báo lỗi rõ ràng. Fallback chỉ được dùng khi không che giấu lỗi cấu hình scene.

## Physics

- Không dựa vào Physics2D query bị Luna hạn chế như `Physics2D.Raycast`, `OverlapCircle` hoặc `Collider2D.OverlapPoint`.
- Với tương tác 2D đơn giản, dùng AABB dựa trên `SpriteRenderer.bounds` hoặc `Renderer.bounds`.
- Với 3D, ưu tiên `BoxCollider`, `SphereCollider` hoặc collider compound đơn giản.
- Tránh `MeshCollider`, đặc biệt với mesh lớn hoặc glTF đã merge.

## Input compatibility

- Bắt buộc dùng **Unity Legacy Input Manager** qua `UnityEngine.Input` cho gameplay chạy trên Luna.
- Không dùng package New Input System (`UnityEngine.InputSystem`), `PlayerInput`, `InputAction`, `InputActionAsset` hoặc `InputSystemUIInputModule` trong code/build Luna.
- Với UI EventSystem, dùng input module tương thích Legacy Input như `StandaloneInputModule`, trừ khi Luna pipeline của project đã chứng minh một module khác hoạt động.
- Input gameplay phải hỗ trợ cả mouse trong Editor/desktop và touch trên thiết bị/Luna bằng một luồng pointer thống nhất.

Các API Legacy Input được phép dùng khi phù hợp:

- Mouse: `Input.GetMouseButtonDown(0)`, `Input.GetMouseButton(0)`, `Input.GetMouseButtonUp(0)`, `Input.mousePosition`.
- Touch: `Input.touchCount`, `Input.GetTouch(index)`, `Touch.phase`, `Touch.position`, `Touch.fingerId`.
- Keyboard chỉ dành cho debug/Editor hoặc khi spec xác nhận Luna experience cần keyboard; gameplay chính không được phụ thuộc vào keyboard.

### Mouse and touch arbitration

- Không xử lý touch và simulated mouse trong cùng frame vì có thể phát sinh double tap/double drag.
- Nếu `Input.touchCount > 0`, xử lý touch và bỏ nhánh mouse trong frame đó; nếu không có touch mới xử lý mouse.
- Mặc định chỉ theo dõi một primary pointer/finger cho tap, drag, swipe hoặc hold; multi-touch chỉ được thêm khi spec yêu cầu.
- Khi bắt đầu gesture, lưu `fingerId` hoặc pointer ownership và chỉ nhận move/end từ pointer đó.
- `TouchPhase.Canceled`, mất focus, object disable hoặc chuyển gameplay state phải reset gesture an toàn.

### Pointer phases

Chuẩn hóa input thành ba phase độc lập với thiết bị:

```text
Pressed  = mouse down hoặc touch Began
Held     = mouse held hoặc touch Moved/Stationary
Released = mouse up hoặc touch Ended/Canceled
```

Gameplay logic nên nhận phase và screen position đã chuẩn hóa thay vì gọi `Input` rải rác ở nhiều component.

### Coordinate and hit testing

- Chuyển `screenPosition` bằng camera/reference đã serialize; không tìm camera bằng runtime lookup trong hot path.
- Với UI, dùng `RectTransformUtility` hoặc EventSystem-compatible UI callbacks khi phù hợp.
- Với object 2D, ưu tiên AABB/manual hit test qua `Renderer.bounds` theo quy tắc Physics của tài liệu này; không thay bằng `Physics2D.Raycast` hoặc overlap query bị hạn chế.
- Với 3D, chỉ dùng ray/collider path đã được project xác nhận tương thích Luna; ưu tiên hit area đơn giản và collider primitive.

### Input state gates

- Input phải được gate rõ ràng theo `Tutorial`, `Gameplay`, `Completed` và `CTA` state để một tap không kích hoạt nhiều hành động.
- Tutorial pointer chỉ hướng dẫn; completion phải dựa trên input/gameplay event thực, không tự hoàn thành vì animation pointer kết thúc.
- CTA không được nhận cùng pointer release vừa hoàn thành gameplay nếu spec không chủ ý cho phép.
- Disable input phải reset drag/hold state và release visual feedback.

### Verification

- Test mouse trong Unity Editor.
- Test touch hoặc touch simulation có kiểm soát, sau đó xác minh trên Luna/device thực tế.
- Kiểm tra tap, hold, drag, release ngoài target, cancel, thao tác nhanh, thao tác lặp và chuyển orientation/resolution nếu project hỗ trợ.
- Quét source và package để bảo đảm không còn `UnityEngine.InputSystem`, `PlayerInput` hoặc `InputSystemUIInputModule` trong Luna build path.

## Initialization

- Không phụ thuộc ngầm vào thứ tự `Awake()`/`Start()` của component khác.
- Service quan trọng phải có initialization contract rõ ràng.
- Thêm null guard cho serialized reference và trạng thái có thể chưa sẵn sàng.
- Kiểm tra riêng trên Luna build vì hành vi serialization và initialization có thể khác Editor.

## Review gate

Mọi review phải quét cả code project và third-party code được đưa vào build để tìm API bị cấm hoặc runtime lookup tốn kém.
