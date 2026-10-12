# Blender Modeling and Topology for Luna

## Modeling target

- Thiết kế mesh theo kích thước hiển thị thực tế trong playable, không theo chất lượng cinematic.
- Giữ polygon ở silhouette, khớp chuyển động và vùng camera nhìn gần; giảm polygon ở mặt phẳng và vùng bị che.
- Xóa face bên trong, geometry trùng, vertex rời và modifier không cần thiết.
- Apply modifier chỉ sau khi giữ lại bản nguồn có thể chỉnh sửa khi cần.

## Object organization

- Merge các mesh tĩnh dùng cùng material và luôn di chuyển cùng nhau.
- Không merge object cần animation, bật/tắt độc lập, đổi material độc lập hoặc cần collider riêng.
- Dùng tên ASCII rõ ràng và ổn định, ví dụ `ENV_Table`, `CHR_Worker`, `PROP_Hammer`.
- Tránh hierarchy sâu và object rỗng không có mục đích export.

## Transform and scale

- Dùng metric units và kiểm tra scale phù hợp với Unity.
- Apply rotation và scale trước khi export, trừ trường hợp rig/animation yêu cầu giữ transform.
- Đặt origin theo pivot gameplay thực tế: chân nhân vật, bản lề cửa, tâm bánh xe hoặc điểm cầm.
- Kiểm tra normal orientation và sửa non-manifold geometry trước export.

## UV

- Dùng một UV set khi có thể; chỉ thêm UV2 khi lightmap hoặc pipeline thật sự cần.
- Pack UV chặt nhưng giữ padding phù hợp với độ phân giải texture.
- Dành nhiều texel density hơn cho vùng gần camera hoặc mang thông tin gameplay.
- Tránh overlap ngoài chủ ý; mirrored UV chỉ dùng khi không gây lỗi normal, text hoặc bất đối xứng.

## LOD

- Chỉ tạo LOD khi object xuất hiện ở nhiều khoảng cách đủ khác nhau.
- Với playable ngắn và camera cố định, một mesh tối ưu thường tốt hơn hệ LOD phức tạp.
- LOD thấp phải giữ silhouette và nhịp animation chính.
