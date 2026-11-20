# Implementation report — Noel: camera Market + đèn nháy + người tuyết

Ngày: 2026-11-19 · Nhánh: UAC_V90 · Scope: plan APPROVED (D1 scale xe, D2 zip user, D2a không credit, D3 = 2, D4-A)

## Thay đổi
| Hạng mục | Chi tiết |
|---|---|
| Camera (`OrientationCameraPose`) | Portrait: pos (-36, 60, -114), euler (34.61, 319.76, 0), FOV 70 · Landscape: pos (-28, 46, -108), euler (25.70, 313.78, 0), FOV 50. Không sửa code |
| Xe (D1) | `Bicycle_Display` scale 3 → 5.4, `Car_Display` 1.7 → 3.06 (×1.8). `DropPresenter` squash dùng `localScale` gốc nên vẫn đúng |
| Đèn | Root `[Noel] House Xmas Lights` + `TwinkleLights`; 248 bóng, 5 tuyến (mép mái tầng 1, mái nhỏ tầng 2, mái lớn tầng 2 — mặt tiền + hông Nam; xà pergola; tường rào sân). Mesh: 4 × 744 tris (bóng) + 2916 tris (dây) = **5 892 tris, 5 draw call** |
| Script | `Assets/_Playable_/Noel/Scripts/TwinkleLights.cs` — chase 4 nhóm, 2 nhóm kề nhau sáng, step 0.35 s |
| Người tuyết | `minecraft_snowman.zip` → Blender 5.2 headless (`--disable-autoexec --factory-startup`) join 22 mesh → 1 mesh 264 tris, atlas 128×64 → `Models/XmasSnowman/Snowman.fbx` + `T_Snowman.png` + `M_Snowman.mat` (Unlit Brightness, alpha clip) → `Prefabs/noel_snowman.prefab` (model scale 2, cao ~4.5 m). Đặt `Snowman_House` (-76.5, 13.45, -80) và `Snowman_Market` (-70.5, 13.45, -22) dưới `[Noel] Roadside Gifts and Snowmen` |
| Material mới | `M_XmasBulb_Red/Green/Yellow/Blue.mat`, `M_XmasLightWire.mat` (`Playable/Unlit Brightness`) |

## Lệch so với plan (cần user biết)
1. **Nháy qua `_Color` thay vì `_Brightness`**: shader `BrightUnlit` lấy `_Brightness` theo `_PlayableBrightnessOverride` toàn cục của `GameController` → nếu override bật thì đèn sẽ không nháy. `_Color` không bị override. Cùng class/file/pattern.
2. Pose camera chỉnh lại so với preview trong plan để điểm xe đáp nằm trên vùng thẻ chọn (viewport y: portrait 0.28, landscape 0.22).
3. Model zip có **một nhân vật trẻ em Minecraft đứng cạnh người tuyết** (một phần của model gốc). Đang giữ nguyên, xoay để thấy cả người tuyết lẫn nhân vật.
4. Người tuyết cao ~4.5 m (plan ~3 m) để thấy rõ từ góc camera xa.
5. Đã trả `CanvasScaler.m_MatchWidthOrHeight` (0.304) và cỡ chữ Title (85.1) về giá trị cũ — Unity tự ghi lại khi đổi kích thước Game view, không phải chỉnh sửa có chủ ý.

## Verification
| Kiểm tra | Kết quả |
|---|---|
| Compile / Console | 0 error; chỉ log có sẵn ("Unable to allocate new scene culling mask", Account API) |
| Play mode nháy | t=0: Đỏ+Xanh lá sáng, Vàng+Xanh dương mờ (×0.3); sau khi đổi step runtime: Xanh dương+Đỏ sáng, Xanh lá+Vàng mờ → các nhóm đổi trạng thái |
| Material asset không bị sửa khi Play | `M_XmasBulb_Yellow.mat` vẫn `_Color (1, 0.85, 0.15)`; renderer dùng bản copy runtime |
| Khung hình | Preview portrait 540×960 và landscape 960×540: thấy biển MARKET, mặt tiền nhà có đèn, 2 người tuyết, xe đạp/ô tô sau khi scale |
| Scene diff | Chỉ: object mới, pose camera, scale 2 display, 2 instance người tuyết |
| Luna build / dung lượng | **Chưa đo** — cần chạy Luna build. Ước tính tăng < 50 KB (mesh ~9k verts, 1 texture 128×64, FBX 28 KB) |

## Rủi ro còn lại
- Chưa chạy Luna build thật.
- License CC-BY-4.0 của model người tuyết yêu cầu ghi credit; user chọn không ghi (D2a).
- Ở landscape, thẻ chọn pet có thể che một phần đáy xe sau khi đáp (viewport y 0.22).
- File tạm ngoài project: `D:\tmp_modhub_inspect`, `D:\tmp_snowman_inspect`, `D:\tmp_snowman_out`, `D:\tmp_scripts` (có thể xoá).

## Rev 2 — user chỉnh tay góc camera màn ngang (2026-11-19)
- User chỉnh Camera trong Play mode (local pos (15.6, 1.9, 14.2), rot (-28.64, 29.2, -17.2), FOV 67.1). Đã quy đổi sang world rồi ghi vào `_landscape`: pos (-57.555, 17.147, -75.792), euler (355.836, 319.173, 355.819), FOV 67.1. Portrait giữ nguyên. Scene đã lưu.
- Verify Play 1920×1080: camera world pose khớp đúng giá trị trên.
- **Lưu ý:** với góc này, `LandPoint` (-62.45, 14.5, -89.89) nằm **sau camera** (viewport z = -7.64) → ở màn ngang người chơi không thấy xe rơi/đáp. Chưa sửa, chờ user quyết.

## Rev 3 — user chỉnh lại góc camera màn ngang
- Local (theo `Pitch_Pivot`) pos (11.51, 1.3, 12.18), rot (-14.47, 40.72, -10.3) → world `_landscape`: pos (-57.308, 17.545, -80.369), euler (6.672, 333.242, 7.307), FOV 67.1 (giữ). Scene đã lưu.
- Verify Play (Game view ngang): camera world/local khớp đúng giá trị user nhập.
- `LandPoint` vẫn nằm **sau camera** (viewport z = -5.79) → màn ngang chưa thấy xe rơi. Chờ user quyết (A dời LandPoint / B LandPoint riêng cho landscape / C giữ nguyên).
- **Quyết định user: C** — giữ nguyên LandPoint; chấp nhận màn ngang không thấy xe rơi/đáp.

## Rev 4 — user chỉnh góc camera màn dọc
- Local (theo `Pitch_Pivot`) pos (8.4, 1.300368, 8.3), rot (-14.47, 40.72, -16.45) → world `_portrait`: pos (-55.409, 19.332, -84.603), euler (6.672, 333.242, 1.157), FOV 70 (giữ). Transform Camera trong edit mode cũng đặt theo pose này. Scene đã lưu.
- `LandPoint` cũng nằm sau camera ở màn dọc (viewport z = -0.98) → **cả 2 hướng màn hình đều không thấy xe rơi/đáp**.

## Rev 5 — VFX rơi xe to hơn
- `XmasPicker/FX_XmasLand` (instance prefab, Scaling Mode = Hierarchy) scale 1 → 2.5 (override trên scene, prefab gốc không đổi) → kích thước hạt, tốc độ bung, bán kính shape đều ×2.5. Dùng chung cho xe đạp & ô tô.
- Verify: simulate 0.35 s trong editor tại LandPoint kèm `Car_Display` → tuyết + sparkle phủ quanh xe; đã Clear hạt sau khi chụp, scene sạch.

## Rev 6 — user chỉnh lại góc camera màn ngang
- Local (theo `Pitch_Pivot`) pos (4.5, 0.1, 8.9), rot (-14.47, 40.72, -18.38) → world `_landscape`: pos (-56.961, 17.990, -88.181), euler (6.672, 333.242, 359.227), FOV 67.1 (giữ). Kiểm tra ngược world→local khớp (4.50, 0.10, 8.90). Scene đã lưu.

## Rev 7 — đổi icon pet
- `XmasPickerFlow._steps[1]`: icon chó `icon_dog` → `icon_dog_voxel`, mèo `icon_cat` → `icon_cat_voxel` (`Assets/_Playable_/UI/XmasPicker/`, 400×400, Sprite). Scene đã lưu.
- Verify Play: chọn xe đạp → bước "CHOOSE YOUR PET" hiện `CardLeft/Icon = icon_dog_voxel`, `CardRight/Icon = icon_cat_voxel`; Console 0 error.
- `icon_dog.png` / `icon_cat.png` cũ không còn được scene tham chiếu (chưa xoá).

## Rev 8 — user chỉnh lại góc camera màn dọc
- Local (theo `Pitch_Pivot`) pos (2.5, 0.9, 6.1), rot (-14.47, 40.72, -16.45) → world `_portrait`: pos (-55.829, 19.990, -90.864), euler (6.672, 333.242, 1.157), FOV 70 (giữ). Transform Camera edit mode đặt theo pose này; kiểm ngược local khớp. Scene đã lưu.
