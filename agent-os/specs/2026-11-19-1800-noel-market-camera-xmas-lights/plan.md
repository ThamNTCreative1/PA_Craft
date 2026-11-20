# Plan — Noel: camera chéo thấy Market + đèn nháy nhà + người tuyết

Status: **APPROVED** by user 2026-11-19 — Claude implement theo yêu cầu user.

## Quyết định user (ghi đè các mục bên dưới nếu mâu thuẫn)
- D1 (mới): giữ LandPoint, **scale to** `Bicycle_Display`/`Car_Display` cho rõ trong góc camera xa.
- D2: dùng `minecraft_snowman.zip`; D2a: **không ghi credit** (user quyết định).
- D3: 2 người tuyết (sân nhà + trước Market).
- D4-A: chase 4 nhóm màu.

## 0. Quyết định cần user duyệt
| # | Câu hỏi | Lựa chọn | Đề xuất |
|---|---|---|---|
| D1 | Camera thấy trọn Market làm xe rơi xuống LandPoint bị nhỏ/che bởi thẻ | **A.** Chỉ đổi 2 pose + dời `LandPoint` (và `Bicycle_Display`/`Car_Display`/`FX_XmasLand` đi theo) ra vỉa hè trước nhà, ở viewport y ≈ 0.4 (trên vùng thẻ), không sửa code · **B.** Giữ góc cũ lúc chọn xe, sau khi xe đáp camera tween lùi ra góc rộng thấy Market (thêm 1 script nhỏ) · **C.** Chỉ đổi pose, chấp nhận xe nhỏ | **A** |
| D2 | Người tuyết | **Đã chốt:** user cung cấp `minecraft_snowman.zip` (xem §3). Còn hỏi: **D2a** — giữ license CC-BY-4.0 thế nào: ghi credit trong `implementation-report.md` + `Assets/_Playable_/Noel/Models/XmasSnowman/CREDITS.txt` (đề xuất), hay user tự lo phần credit? | ghi CREDITS.txt |
| D3 | Số lượng người tuyết mới | 1 to ở sân trước nhà (cạnh cây thông lớn) · hoặc 2: thêm 1 trước Market | 2 |
| D4 | Kiểu nháy | **A.** Chase 4 nhóm màu đỏ/xanh lá/vàng/xanh dương sáng lần lượt · **B.** Twinkle ngẫu nhiên | **A** |

## 1. Camera (không sửa code)
`Camera_Controller/.../Camera` → `OrientationCameraPose` (sửa giá trị serialize trên object live, không rebuild scene):

| Pose | Position | Euler | FOV |
|---|---|---|---|
| Portrait | (-58, 54, -122) | (30.96, 339.44, 0) | 68 |
| Landscape | (-30, 42, -100) | (22, 316.17, 0) | 50 |

Tinh chỉnh ±vài đơn vị khi implement, nghiệm thu bằng ảnh Game view 1080×1920 và 1920×1080: thấy trọn biển MARKET + mặt tiền nhà + điểm xe đáp không bị thẻ che.
Nếu D1-A: dời `XmasPicker/LandPoint`, `Bicycle_Display`, `Car_Display`, `FX_XmasLand` (cùng offset) — chỉ đổi Transform.
Camera `Far Clip` kiểm ≥ 200 để Market không bị cắt.

## 2. Dây đèn nhấp nháy

### 2.1 Code mới
`Assets/_Playable_/Noel/Scripts/TwinkleLights.cs`

| Class | Trách nhiệm | Field (`[SerializeField]` only) |
|---|---|---|
| `TwinkleLights : MonoBehaviour` | Mỗi nhóm bulb dùng 1 material riêng (tạo bản copy runtime ở `Awake` để không sửa asset); `Update` tính phase theo `Time.time` và set `_Brightness` giữa `_offBrightness` ↔ `_onBrightness` | `Renderer[] _groups` (mỗi phần tử = 1 mesh gộp của 1 màu), `float _stepDuration = 0.35f`, `float _onBrightness = 1.6f`, `float _offBrightness = 0.35f`, `bool _randomTwinkle` (D4) |

- Không interface/base class: 1 hành vi, 1 implementation.
- Chỉ 4 lần `Material.SetFloat`/frame → rẻ, Luna hỗ trợ `Material.SetFloat` + `Time.time`; không `Find*`, không Instantiate, không coroutine.
- Event flow: không có — tự chạy độc lập, không phụ thuộc `XmasPickerFlow`/`LunaController`.

### 2.2 Asset
| Asset | Đường dẫn |
|---|---|
| 4 material bulb (`_Color` đỏ / xanh lá / vàng / xanh dương, shader `Playable/Unlit Brightness`) | `Assets/_Playable_/Noel/Materials/M_XmasBulb_Red/Green/Yellow/Blue.mat` |
| 1 material dây (xanh rêu đậm) | `M_XmasLightWire.mat` |
| Mesh gộp (mỗi màu 1 mesh, dây 1 mesh) | `Assets/_Playable_/Noel/Models/XmasLights/house_lights_<color>.asset`, `house_lights_wire.asset` |

### 2.3 Dựng trong scene (MCP, một lần, không để lại editor script)
- Root mới `[Noel] House Xmas Lights` (có `TwinkleLights`) → 5 con: `Bulbs_Red/Green/Yellow/Blue`, `Wire` (MeshFilter + MeshRenderer, không collider, cast/receive shadow off).
- Tuyến đèn (lấy toạ độ chính xác bằng raycast vào collider nhà khi implement):
  1. Mép mái tầng 1 & tầng 2 mặt tiền (+X) và cạnh mái hướng camera.
  2. Xà gỗ mái hiên (pergola) trước cửa.
  3. Bờ rào sân trước (viền đen quanh sân cỏ).
  4. Viền cửa sổ lớn mặt tiền.
- Bulb: cube 0.25 m, cách 0.6 m, dây võng nhẹ (sag 0.15 m) giữa các bulb; màu xoay vòng R→G→Y→B.
- Ước tính ~150–200 bulb → ~2.4–3.2k tris, 5 draw call.

## 3. Người tuyết (asset user cung cấp)
Nguồn: `C:\Users\Admin\Downloads\minecraft_snowman.zip` — đã giải nén vào thư mục cách ly `D:\tmp_snowman_inspect` để kiểm, chưa đưa vào project.

| Kiểm tra | Kết quả |
|---|---|
| Nội dung | `scene.gltf` + `scene.bin` (20 KB) + 2 texture 64×64 (`material_0/1_baseColor.png`, ~1–1.3 KB) + `license.txt` |
| Hình học | 22 mesh / 54 node, **264 tris**, 528 verts, không anim/skin; cao ~2.5 m, gốc ≈ đáy |
| Material | 2 material, `alphaMode: MASK` (cutout), sampler Point/Clamp (đúng chất voxel) |
| License | **CC-BY-4.0** — "[MINECRAFT] snowman" by ounzi (Sketchfab); thương mại OK, **bắt buộc ghi credit** (D2a) |

Pipeline (theo tiền lệ xe đạp ở spec `2026-11-19-1500`, Blender do Codex/được user cho phép chạy headless):
1. Blender headless `--disable-autoexec`: import `scene.gltf` từ thư mục cách ly → join 22 mesh thành **1 mesh**, áp transform, pivot đáy-giữa, trục Unity (Y-up, mặt quay +Z).
2. Gộp 2 texture thành 1 atlas **128×64** (remap UV) → 1 material, 1 draw call. (Nếu remap UV lỗi → giữ 2 material, báo lại.)
3. Export → `Assets/_Playable_/Noel/Models/XmasSnowman/Snowman.fbx` + `T_Snowman.png` (Point filter, no mipmap, nén) + `M_Snowman.mat` (`Playable/Unlit Brightness`, `_AlphaClip` bật, `_Cutoff` 0.5) + `CREDITS.txt` (D2a).
4. FBX import: Read/Write off, không generate collider, không import material/animation/camera/light.
5. Prefab `Assets/_Playable_/Noel/Prefabs/noel_snowman.prefab`; scale để cao ~3 m (to hơn 4 người tuyết cũ 2.1 m, nổi trong góc camera xa).
- Đặt dưới `[Noel] Roadside Gifts and Snowmen`: `Snowman_House` ở sân trước nhà (cạnh cây thông, không chắn LandPoint), (D3) `Snowman_Market` trước lối vào Market; xoay mặt về camera. Không collider.

## 4. Thứ tự thực hiện
1. User duyệt plan + D1–D4.
2. Tạo material + `TwinkleLights.cs` → `read_console` sạch.
3. Dựng mesh đèn (raycast lấy tuyến) → gộp mesh → lưu asset → gắn `TwinkleLights`.
4. Convert snowman qua Blender → FBX/atlas/material → prefab → đặt vào scene.
5. Sửa 2 pose camera (+ dời LandPoint nếu D1-A) trên object live.
6. Lưu scene, verify (§5), viết `implementation-report.md`.

## 5. Verification
- Console 0 error/warning mới sau compile và Play.
- Ảnh Game view portrait 1080×1920 + landscape 1920×1080: thấy trọn Market + nhà có đèn + người tuyết; xe rơi không bị thẻ che (Play, chọn cả 2 xe).
- Play ≥ 3 s: chụp 2 frame khác nhau chứng minh đèn đổi nhóm sáng.
- `Material` asset trên disk không đổi sau Play (git diff `.mat` trống).
- Đếm tris/draw call đèn + người tuyết; Luna build đo dung lượng < 4.5 MB, báo phần tăng thêm.
- Không đụng UI Canvas, không rerun Setup scene.

## 6. Ngoài phạm vi
Không sửa `XmasPickerFlow`, `DropPresenter`, UI, âm thanh; không dùng zip xe đạp; không Point Light thật (Unlit, Luna).
