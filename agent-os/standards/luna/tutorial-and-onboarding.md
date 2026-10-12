# Luna Tutorial and Onboarding

Mọi playable phải có onboarding giúp người chơi hiểu core interaction trước khi đánh giá gameplay. Chi tiết tutorial của từng game nằm trong product/spec; standard này chỉ định nghĩa yêu cầu dùng chung.

## Experience goals

- Cho phép tương tác đầu tiên càng sớm càng tốt; target mặc định là prompt đầu tiên trong khoảng 1.5 giây và hành động thành công đầu tiên trong khoảng 3 giây sau khi playable sẵn sàng.
- Dạy bằng hành động và feedback trực quan thay vì đoạn text dài.
- Mỗi bước chỉ giới thiệu một input hoặc một mục tiêu mới.
- Tutorial phải dẫn trực tiếp vào core gameplay, không tạo một mode riêng không phản ánh trải nghiệm thật.
- Toàn bộ onboarding chính nên hoàn tất trong khoảng 3–8 giây, trừ khi spec có lý do khác.

Các mốc thời gian là default target, không phải hard-coded constant. Spec của project có thể thay đổi theo gameplay, campaign và yêu cầu creative.

## Required tutorial definition

Mỗi project/spec phải xác định:

- Core interaction cần dạy: tap, drag, swipe, hold hoặc lựa chọn.
- Gesture/pointer/highlight được hiển thị ở đâu.
- Điều kiện hoàn thành từng bước.
- Feedback khi người chơi thực hiện đúng.
- Hành vi khi người chơi thao tác sai.
- Timeout hoặc fallback nếu người chơi không tương tác.
- Khi nào tutorial nhường quyền cho gameplay chính.
- Mối quan hệ giữa tutorial và outcome flow đã duyệt (Win/Lose/EndCard/CTA nếu có).

Không mặc định khóa toàn bộ input ngoài vùng được hướng dẫn nếu spec không yêu cầu; người chơi có thể khám phá sớm miễn là không làm hỏng state.

## Architecture

- Dùng state machine hoặc sequence nhỏ, rõ ràng; tránh chuỗi boolean rải rác ở nhiều MonoBehaviour.
- Tutorial controller chỉ điều phối step và completion state, không chứa toàn bộ gameplay logic.
- Gameplay phát event/trạng thái có ý nghĩa như `ItemPicked`, `DragCompleted`, `CraftSucceeded`; tutorial quan sát chúng thay vì sao chép gameplay rule.
- Gán target, pointer, mask và feedback bằng `[SerializeField]` hoặc cấu hình data; không dùng `GameObject.Find`, tag lookup hoặc runtime object search.
- Hủy event subscription và coroutine/tween khi tutorial kết thúc, scene đổi hoặc object bị disable.
- Không tạo framework tutorial tổng quát quá mức nếu playable chỉ có vài step cố định.

## Visual guidance

- Pointer/hand phải không che mục tiêu và phải đọc được trên kích thước màn hình nhỏ.
- Highlight phải tương phản với background và không phụ thuộc duy nhất vào màu.
- Animation hướng dẫn phải loop nhẹ, dừng ngay khi người chơi bắt đầu thao tác hợp lệ.
- Text phải ngắn, có khả năng bỏ hoàn toàn nếu gesture và feedback đã đủ rõ.
- Không đưa texture/video tutorial lớn nếu có thể tạo bằng sprite atlas, tween hoặc UI đơn giản.

## Input and failure handling

- Tutorial phải hỗ trợ input thực tế của playable và không chỉ hoạt động với mouse trong Editor.
- Input sai phải có feedback hoặc được bỏ qua có chủ ý; không để state bị kẹt.
- Nếu người chơi không thao tác, tutorial có thể nhắc lại gesture sau delay thay vì tự động hoàn thành core action.
- Nếu target bị null, disabled hoặc unavailable, fail rõ ràng trong development và dùng fallback an toàn trong build nếu spec định nghĩa.
- Restart/replay phải đưa tutorial và gameplay về state xác định, không giữ subscription hoặc timer cũ.

## CTA boundary

- Tutorial không được kích hoạt CTA ngoài ý muốn khi người chơi đang học gesture.
- CTA không được che core interaction trước khi người chơi hiểu gameplay, trừ yêu cầu campaign được ghi trong spec.
- Nếu click/tap CTA dùng cùng vùng input với gameplay, phải có state gate rõ ràng.

## Verification

- Người thử lần đầu hiểu hành động cần làm mà không được giải thích ngoài playable.
- Tutorial hoàn thành bằng input thật trong Luna build.
- Thao tác sai, không thao tác, thao tác nhanh và thao tác lặp không làm kẹt state.
- Không có missing reference, event subscription dư hoặc coroutine/tween tiếp tục sau completion.
- Tutorial không thêm API Luna bị cấm và không đẩy build vượt budget.
- Implementation report ghi thời điểm prompt đầu tiên, thời điểm tương tác thành công đầu tiên và tổng thời lượng onboarding quan sát được.
