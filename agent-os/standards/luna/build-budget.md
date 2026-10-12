# Luna Build Budget

Playable phải ưu tiên tải nhanh, phản hồi sớm và kích thước nhỏ.

Nếu project đặt hard limit 4.5 MB, áp dụng thêm `scene-budget-4_5mb.md`. Trong quá trình phát triển, target measured build không vượt 3.8 MB để giữ khoảng 0.7 MB headroom cho thay đổi cuối, metadata và sai số đóng gói.

## Script budget

- Theo dõi compiled script budget của Luna; coi khoảng 2 MB là giới hạn cần kiểm tra sớm, không phải đợi cuối dự án.
- Không import module Unity lớn chỉ để dùng một phần nhỏ.
- Tránh reflection, dynamic invocation và serialization framework nặng nếu có giải pháp tĩnh đơn giản.
- Hạn chế generic instantiation không cần thiết vì IL2CPP có thể sinh thêm code.
- Không thêm package hoặc SDK nếu chưa đánh giá phần thực sự được đưa vào build.

## Runtime budget

- Tránh allocation mỗi frame, LINQ trong hot path và tạo collection tạm trong `Update()`.
- Dùng object pooling khi đối tượng được tạo/hủy lặp lại đủ nhiều để có lợi.
- Ưu tiên state machine và component nhỏ, nhưng không tạo abstraction thừa.
- Giảm số lượng `Update()` bằng controller/manager khi điều đó làm luồng đơn giản hơn.

## Asset budget

- Chọn texture power-of-two và Max Size nhỏ nhất vẫn đạt chất lượng hình ảnh.
- Tắt alpha, mipmap, Read/Write và dữ liệu mesh không sử dụng khi không cần.
- Merge mesh tĩnh khi không cần animate riêng và khi merge thực sự giảm draw call.
- Theo dõi dung lượng sau import/build, không chỉ kích thước file nguồn.

## Completion evidence

Implementation report phải ghi lại package/module mới, asset lớn, thay đổi draw call đáng kể và rủi ro đối với script/build size.
