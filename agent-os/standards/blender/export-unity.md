# Blender Export to Unity and Luna

## Before export

- Lưu file `.blend` nguồn riêng; không xem FBX/glTF là source of truth.
- Xóa hoặc tắt export đối với camera, light, helper và collection không dùng.
- Apply transform phù hợp và kiểm tra pivot/origin.
- Triangulate có kiểm soát khi cần kết quả normal ổn định; kiểm tra lại shading sau triangulation.
- Loại bỏ material slot rỗng và material không được gán.

## Format selection

- Dùng FBX khi pipeline Unity cần Animator, rig hoặc workflow import FBX ổn định.
- Dùng glTF khi cần material/texture portability và pipeline đã được kiểm chứng trên Luna.
- Không chọn format chỉ vì file nguồn nhỏ hơn; đánh giá asset sau khi Unity import và sau Luna build.

## FBX guidance

- Export Selected Objects.
- Tắt Add Leaf Bones.
- Chỉ export deform bones đối với character rig nếu control bones không cần ở runtime.
- Bake animation chỉ cho clip thực sự sử dụng.
- Kiểm tra forward/up axis bằng một asset thử nghiệm trước khi chuẩn hóa pipeline.

## Materials and textures

- Bake procedural Blender materials thành texture phù hợp với shader Unity.
- Không kỳ vọng Unity tái tạo Blender node graph.
- Pack hoặc đặt texture theo convention của project; không tạo bản sao texture ngoài ý muốn.
- Giảm số material trước export để tránh tăng draw call.

## Unity import verification

- Kiểm tra scale, orientation, normals, tangents, pivot và bounds.
- Tắt Read/Write nếu không cần runtime access.
- Bật Optimize Mesh Data và compression phù hợp.
- Kiểm tra animation clip, avatar, bone count và material count.
- Tạo collider primitive trong Unity; không dùng render mesh làm MeshCollider mặc định.

## Re-export safety

- Re-export không được đổi tên object/bone đang được prefab, Animator hoặc code tham chiếu nếu chưa có migration.
- Sau re-export, kiểm tra prefab overrides, animation binding và serialized references.
