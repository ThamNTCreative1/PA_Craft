# Minecraft Image Mesh Tool for Unity

Tool này nhận một ảnh `Texture2D` và sinh mesh voxel kiểu Minecraft trong Unity Editor.

## Cài đặt

Copy thư mục:

```text
MinecraftImageMeshTool/Assets/MinecraftImageMeshTool
```

vào thư mục `Assets/` của project Unity.

Sau đó mở Unity và dùng menu:

```text
Tools > Minecraft Mesh > Image To Mesh
```

## Cách dùng

1. Kéo ảnh vào ô `Source Image`.
2. Chọn `Max Image Dimension` để giới hạn số voxel theo chiều lớn nhất.
3. Chọn `Height Mode`:
   - `Flat`: mỗi pixel thành 1 khối.
   - `Brightness`: pixel sáng cao hơn pixel tối.
   - `Alpha`: alpha cao hơn thì cột voxel cao hơn.
4. Bấm `Generate Mesh`.

Tool sẽ tạo GameObject trong scene hiện tại. Nếu bật `Save Mesh Asset`, mesh và material sẽ được lưu vào:

```text
Assets/GeneratedMinecraftMeshes
```

## Ghi chú kỹ thuật

- Pixel có alpha thấp hơn `Alpha Threshold` sẽ bị bỏ qua.
- Mesh chỉ tạo các mặt ngoài của voxel, không tạo các mặt bị che bên trong.
- Màu được lưu bằng vertex colors, shader `MinecraftImageMesh/VertexColorLit` dùng để hiển thị đúng màu pixel.
- Nên giới hạn ảnh nhỏ, ví dụ 32-128 px chiều lớn nhất. Ảnh càng lớn thì mesh càng nặng.
