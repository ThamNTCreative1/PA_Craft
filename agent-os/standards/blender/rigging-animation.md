# Blender Rigging and Animation for Luna

## Rig scope

- Chỉ giữ bone có ảnh hưởng đến deformation hoặc runtime attachment cần thiết.
- Loại control rig, helper bone và constraint không cần sau khi bake.
- Giảm bone influence trên mỗi vertex khi chất lượng cho phép.
- Tránh rig phức tạp cho object chỉ cần transform animation đơn giản.

## Animation clips

- Chỉ export action/clip thực sự dùng trong playable.
- Cắt frame thừa và bảo đảm loop boundary sạch.
- Bake constraint/IK cần thiết trước export.
- Giảm keyframe bằng tolerance phù hợp nhưng kiểm tra lỗi ở khớp và silhouette.
- Không dùng root motion nếu gameplay không cần; chọn rõ root-motion hoặc in-place cho toàn pipeline.

## Blend shapes

- Chỉ giữ blend shape xuất hiện trong playable.
- Xóa shape thử nghiệm hoặc corrective shape không được sử dụng.
- Cân nhắc animation bằng bone hoặc sprite nếu blend shape làm tăng asset quá nhiều.

## Unity verification

- Kiểm tra avatar/rig mapping, clip range, loop pose và root transform.
- Kiểm tra animation trong build Luna, không chỉ Preview hoặc Editor.
- Theo dõi skinned mesh count, bone count và material count.
- Với nhiều character giống nhau, tái sử dụng rig/clip khi pipeline cho phép thay vì duplicate dữ liệu.
