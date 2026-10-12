# Unity Asset Import for Luna

## Mesh

- Bật Mesh Compression ở mức cao nhất không làm hỏng silhouette hoặc animation.
- Bật Optimize Mesh Data.
- Tắt Read/Write Enabled nếu runtime không sửa hoặc đọc mesh.
- Loại bỏ UV channel, color, blend shape và bone không dùng.
- Không sử dụng Unity Terrain; chuyển terrain thành mesh trước khi build.

## Texture

- Dùng kích thước power-of-two.
- Ưu tiên 512–1024 cho UI/sprite thông thường; chỉ dùng 2048+ khi có bằng chứng chất lượng cần thiết.
- Tắt mipmap cho UI và sprite không thu nhỏ theo khoảng cách.
- Không giữ alpha nếu texture không cần trong suốt.
- Dùng atlas cho nhiều sprite nhỏ nếu giúp giảm draw call.
- Spine atlas cho Luna phải export với PMA (Premultiplied Alpha) bằng `false`.

## Audio

- Cắt bỏ khoảng lặng và đoạn không được phát.
- Ưu tiên clip ngắn, mono khi stereo không mang lại giá trị.
- Không import nhiều biến thể âm thanh nếu playable chỉ sử dụng một biến thể.

## Materials

- Tuân thủ `materials-built-in-unlit.md`: chỉ Built-in Render Pipeline và approved built-in Unlit shaders; không custom shader, Shader Graph, URP hoặc HDRP.
- Giảm số material và shader variant.
- Tái sử dụng shared material; không tạo material riêng chỉ để đổi tint nếu SpriteRenderer/UI color hoặc property có sẵn giải quyết được.
- Kiểm tra material sau export từ Blender và thay material tự sinh bằng approved Unlit material; không giữ Blender node graph như runtime shader.
- Loại normal/metallic/roughness/emission map nếu shader được duyệt không sử dụng chúng.
