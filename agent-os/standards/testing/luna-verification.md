# Luna Verification

## Required checks

Trước khi hoàn thành một feature hoặc build:

1. Unity project compile không có error.
2. Không có missing serialized reference trong scene/prefab liên quan.
3. Không có API runtime lookup bị cấm trong code được đưa vào build.
4. Core interaction hoạt động từ trạng thái khởi động sạch.
5. Input, feedback, progression và CTA hoạt động theo spec.
6. Build Luna chạy được, không chỉ Unity Editor.
7. Console/build log không có exception hoặc warning lặp lại.
8. Asset mới đã được kiểm tra import settings và kích thước.
9. Nếu project có hard limit 4.5 MB, Luna build/package đo được không vượt 4.5 MB và development target không vượt 3.8 MB.
10. Tutorial được kiểm tra với người dùng mới hoặc test flow tương đương: prompt xuất hiện, input đúng/sai/timeout hoạt động và tutorial chuyển sang gameplay mà không kẹt state.
11. Input dùng Legacy Input Manager, hoạt động với mouse và touch trên Luna, không double-trigger, không giữ drag/hold sau cancel hoặc state transition, và Luna build path không chứa New Input System.
12. Tất cả material trong build dùng approved Built-in Unlit shader; không có custom shader, Shader Graph, URP/HDRP material, và brightness/tint đã được xác minh thực sự hoạt động trên Luna.
13. Có đúng một active `LunaController`; truy cập qua typed Service Locator, chỉ có outcome đã duyệt, mỗi outcome tách trách nhiệm, không double-fire/xung đột, và không có Luna API call trực tiếp ngoài controller hoặc vị trí đã được duyệt.

## Blender asset checks

- Scale, orientation và pivot đúng sau Unity import.
- Normal/shading không lỗi.
- Material/texture count nằm trong dự kiến.
- Không có mesh, bone, animation clip hoặc blend shape thừa.
- Collider dùng primitive/compound phù hợp, không mặc định dùng MeshCollider.
- Re-export không phá prefab, animation binding hoặc serialized reference.

## Implementation report

Báo cáo phải tách rõ:

- Đã xác minh trong Unity Editor.
- Đã xác minh trong Luna build.
- Chưa thể xác minh và lý do.
- Thay đổi ảnh hưởng script size, asset size, draw call hoặc startup time.
- Bảng phân bổ dung lượng thực tế theo scripts, textures, meshes, audio, animation và phần còn lại khi áp dụng budget 4.5 MB.
