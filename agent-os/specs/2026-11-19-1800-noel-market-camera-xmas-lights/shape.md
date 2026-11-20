# Shape — Noel: camera chéo thấy Market + đèn nháy nhà + người tuyết

Status: **PENDING APPROVAL**
Ngày: 2026-11-19 · Nhánh: UAC_V90 · Scene: `Assets/_Playable_/Scenes/Gameplay.unity`

## 1. Yêu cầu user
1. Chỉnh camera góc chéo để thấy **trọn Market** (toà tường đỏ/hồng biển chữ xanh "MARKET").
2. Decor **ngôi nhà gỗ** (nhà có 2 cây thông + quà phía trước) bằng **dây đèn nhấp nháy** cho không khí Giáng sinh.
3. Thêm **người tuyết**.
- Zip `MODHUB-FF3D4E0B457A9C9669.zip` → user xác nhận **gửi nhầm** (chỉ là xe đạp voxel đã dùng ở spec picker). Không dùng.
- Asset đèn: user chọn **dựng voxel bằng cube** (Unlit). Người tuyết: user cung cấp `minecraft_snowman.zip` (264 tris, CC-BY-4.0).
- Market = toà đỏ; nhà treo đèn = nhà gỗ ở giữa ảnh camera hiện tại.

## 2. Hiện trạng đã kiểm (MCP, không sửa gì)
| Hạng mục | Kết quả |
|---|---|
| Camera | `Camera_Controller/Yaw_Pivot/Pitch_Pivot/Camera` + `OrientationCameraPose` (2 pose serialize, không cần sửa code) |
| Pose hiện tại | Portrait: pos (-51.5, 22, -95.5), euler (27.42, 293.75, 0), FOV 68 · Landscape: pos (-55, 19.5, -105), euler (13.92, 330.66, 0), FOV 50 |
| Nhà gỗ | Nằm trong mesh gộp `CityMap_Noel/Base_Map` (không phải object riêng). Collider vùng `Buildings -3,-3` ≈ x -109…-73, z -95…-56, đỉnh y 40.5; mặt tiền hướng +X ra đường |
| Market | Trong `Base_Map`; vùng `Buildings -3,-1` ≈ x -97…-74, z -36…1; biển hiệu hướng +X |
| Picker | `XmasPicker/LandPoint` (-63.5, 13.45, -89.9) — xe rơi xuống đây; thẻ chọn chiếm ~25% đáy màn hình |
| Người tuyết có sẵn | `noel_deco_snowman.fbx` (1723 tris, cao 2.1 m, `M_RoadsideChristmas`) × 4 trong `[Noel] Roadside Gifts and Snowmen`; 2 con đứng 2 bên Market (-76.1, -37.3) & (-76.1, -2.3) — rất nhỏ trong khung hình |
| Shader | `Playable/Unlit Brightness` (`Assets/GameAsset/Shaders/BrightUnlit.shader`): `_MainTex`, `_Color`, `_Brightness`, blend props |
| Script nhấp nháy | Không có sẵn (grep Blink/Twinkle/Flicker = 0) |

## 3. Phát hiện cần user quyết (xem plan §0)
- **Xung đột camera ↔ picker:** để thấy trọn Market + nhà, camera phải lùi xa (~38–47 m tới LandPoint, hiện tại 14 m). Xe rơi sẽ **rất nhỏ** (~3% chiều cao màn hình) và ở portrait LandPoint rơi vào vùng thẻ chọn (viewport y 0.22).
- Đã có snowman FBX sẵn — có thể tái dùng phóng to thay vì dựng voxel mới.

## 4. Preview (render tạm, không lưu scene)
- `previews/current_portrait.png` — hiện tại
- `previews/landscape_candidate.png` — pos (-30, 42, -100), euler (22, 316.17, 0), FOV 50
- `previews/portrait_candidate.png` — pos (-58, 54, -122), euler (30.96, 339.44, 0), FOV 68
