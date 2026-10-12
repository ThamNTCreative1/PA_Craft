# Unity Architecture for Luna Playables

## Layering

- **Data:** ScriptableObject hoặc POCO chứa config và state serializable.
- **Logic:** Pure C# khi không cần Unity lifecycle hoặc scene API.
- **View:** MonoBehaviour nối input, animation, rendering và Unity lifecycle với logic.

Không đặt input, business rules, save state và rendering vào cùng một MonoBehaviour.

## Dependencies

- Ưu tiên composition thay vì cây kế thừa MonoBehaviour sâu.
- Dependency phải được gán rõ ràng bằng Inspector hoặc bootstrapper.
- Chỉ tạo interface khi có nhiều implementation, cần test isolation, hoặc có boundary ổn định.
- Không áp dụng SOLID bằng cách tạo nhiều class/interface làm tăng độ phức tạp và kích thước IL2CPP mà không có lợi ích cụ thể.

## Lifecycle

- `Awake()`: thiết lập state nội bộ và validate reference của chính component.
- `Start()`: nối dependency cần object khác đã hoàn tất `Awake()`.
- Gameplay không được phụ thuộc vào Script Execution Order nếu có thể biểu diễn bằng bootstrap rõ ràng.
- Cleanup event/subscription trong `OnDisable()` hoặc `OnDestroy()` tương ứng với nơi đăng ký.

## Input and feedback

- Interaction đầu tiên phải sẵn sàng nhanh.
- Mỗi input hợp lệ cần feedback hình ảnh hoặc âm thanh ngay.
- Không khóa input bằng animation dài trừ khi có yêu cầu thiết kế rõ ràng.
- CTA và end card phải được tách khỏi gameplay logic để có thể kiểm thử độc lập.
