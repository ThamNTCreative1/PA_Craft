# Implementation Report — Noel Missions

Date: 2026-11-18 · Implementer: Claude (user asked Claude to implement instead of Codex) · Plan: rev 3 APPROVED (O1-A, O2-A, O3-A, O4-A)

## Đã làm

### Asset từ `aa.unitypackage`
- Lấy đúng **114 file mới** (giữ GUID gốc) bằng cách giải nén theo GUID. Không file nào trùng GUID với PA_Craft bị ghi đè.
- Loại: `SnowGridManager.cs`, `UIAlignY.cs`, 3 skin không dùng (reindeer, santa outfit, sweater).
- Giữ: Map noel (fbx, colliders, 64 mat), Noel/Models, Noel/Prefabs, Noel/Materials (2 shader snow, O2-A), Noel/Textures, 3 skin (santa npc, puffer jacket, elf) + Source/Textures PNG.

### Script
| File | Thay đổi |
|---|---|
| `Noel/Scripts/SnowGridChunk.cs` | bỏ phụ thuộc `SnowGridManager` → `Rebuild()` trực tiếp (O1-A) |
| `Noel/Scripts/NoelSnowfall.cs` | bỏ `SnowQuality`, `SnowTrailPainter`, `FindObjectOfType`, `Camera.main`; `target` serialize |
| `Noel/Scripts/NoelSkinSelector.cs` | enum còn 3 giá trị (Elf=1, PufferJacket=2, SantaClaus=4), mặc định Santa; sửa comment lỗi encoding |
| `Scripts/Missions/MissionController.cs` | `[SerializeField] Transform _spawnPoint` → teleport khi Enter (null = hành vi cũ) |
| `Scripts/Missions/FishingMissionController.cs` | mới |
| `Scripts/Fishing/FishingState.cs`, `FishingRules.cs`, `FishingController.cs`, `FishingLineView.cs`, `UI/FishingHoldButton.cs`, `UI/FishingHUD.cs` | mới (port tối giản party-craft) |
| `Tests/Editor/FishingRulesTests.cs`, `Tests/Editor/NoelMissionsSceneTests.cs` | mới |

### Scene `Gameplay.unity`
- Xoá `CityMap_Cropped` (gồm colliders). Thêm từ scene package: `CityMap_Noel`, `[Noel] Snow City/Buildings/Extra`, `[Noel] Christmas Trees`, `[Noel] Roadside Gifts and Snowmen`, `[Noel] Snowfall` (target = Player), `[Noel] Skin Selector` (Luna dropdown "Character Skin", 3 skin).
- RenderSettings hai scene giống hệt nhau → không đổi.
- Paintball (cập nhật theo yêu cầu user, đoạn Market–Gas): SpawnPoint (-80, 13.5, 11.5), yaw -90 (nhìn ra biển); 5 NPC tại (-90,7), (-91,16), (-95,11.5), (-100,6.5), (-100,16) + route dời theo.
- Car (cập nhật theo yêu cầu user, đoạn Market–Gas): xe (-108, 13.5, 12.5) yaw 90 cạnh trụ bơm Gas; SpawnPoint (-113.3, 13.5, 9.4), yaw 55.
- Khu Market–Gas: khoảng trống x -120..-76, z 4..18 giữa trạm Gas (bắc, z ≥ 20) và Market + bãi đỗ (nam, z ≤ 2).
- Fishing (mới): `[Noel] Fishing Sea` (quad biển dùng texture `water_still`) ở rìa tây map; bè gỗ phủ tuyết (sàn gỗ, khúc gỗ, rương, đèn lồng, cây thông nhỏ, hộp quà) tại (-137, 11, -30); SpawnPoint trên bè, yaw -90 (nhìn ra biển), camera pitch 32; cần câu `Rod_Bamboo` gắn `Player/FishingRodSocket`; 4 cá; HUD `Canvas/GamePanel/FishingHUD` (nút CAST/REEL, thanh lực, thanh kéo, hint).
- `MissionManager._missions` = [Paintball, Fishing, Car]; MotorbikeMission tắt (code giữ nguyên).
- Journal: row1 "Fire Paintballs" / row2 "Go Fishing" / row3 "Drive Car"; nền `XmasBackground` (AspectRatioFitter Envelope) + decor trên Frame: `XmasLights`, `XmasGiftRed`, `XmasGiftGreen`, `XmasSnowflakeL/R` (raycastTarget off).

### Asset mới khác
- `_Playable_/Fishing/`: Rod_Bamboo, Fish_01..04 (fbx + albedo), Rod_Palette, 4 wav (Cast, Bite, ReelTick, Catch_Common), 13 material `Playable/Unlit Brightness`.
- `_Playable_/UI/MissionsJournal/`: `journal_bg_xmas_tree.png` (render trong engine, 1080×1920, max 1024), `xmas_gift_red/green.png` (render model), `xmas_lights.png`, `xmas_snowflake.png` (vẽ bằng code).
- `Full_Color.png` (palette 4096² dùng cho quà/người tuyết): max size 2048 → **256** (so ảnh: không khác biệt).

## Lệch so với plan (cần user biết)
1. **Không dùng project tạm**: giải nén trực tiếp 114 file mới theo GUID và chuyển object môi trường từ bản sao tạm của scene package (đã xoá). Kết quả như plan (chỉ file mới, không ghi đè), nhưng **không tạo `NoelEnvironment.prefab`** — các root môi trường nằm trực tiếp trong scene như trong package.
2. Gỡ component thiếu script (`SnowGridManager`) khỏi `noel_snow_city.prefab`.
3. Map Noel **không có mặt biển** ở rìa (chỉ là khoảng trống sau tường) → thêm 1 quad biển `[Noel] Fishing Sea` để giống ảnh mẫu.
4. Cần câu gắn vào thân Player (không theo xương tay) để hướng cần ổn định khi animation idle.
5. Ảnh nền/decor: tool AI image (fal/openrouter) **chưa cấu hình key** → tạo trong engine bằng render cảnh Noel + vẽ code.
6. Đổi max size `Full_Color.png` (biện pháp budget trong plan).

## Verification
- Compile: 0 error (1 warning cũ `Assets/_Scripts/ModelSwitcher.cs` CS0618, không thuộc phạm vi).
- EditMode: `FishingRulesTests` 7/7 pass; `NoelMissionsSceneTests` 6/6 pass.
- Play mode (MCP): Console 0 error/warning. GO từng mission: teleport đúng khu; Paintball 5 NPC quanh cây thông; Car "Tap to drive" trên đường shop; Fishing chạy đủ Charging → Casting → Waiting → Fighting → Catching → Ready (cá bay lên đầu, "Nice catch!"); đổi `Character Skin` lúc chạy → skin đổi đúng (Santa/Elf kiểm bằng ảnh trước/sau).
- Grep file mới/sửa: không `FindObjectOfType`, `GameObject.Find`, `Camera.main`, `Resources.Load`, `RuntimeInitializeOnLoadMethod`, PrimeTween/Odin/Opsive/HAVIGAME.

## Chưa làm / rủi ro còn lại
- **Chưa build Luna, chưa đo dung lượng** so với 4.5 MB. Đóng góp lớn dự kiến: `CityMap_Noel.fbx` (1.25 MB), `CityMap_Noel_Colliders.prefab` (1 MB MeshCollider), 3 body mesh skin (100–380 KB YAML), ảnh nền journal.
- Chưa test cảm ứng thật / Luna Playground dropdown trên web.
- **User cần duyệt** (theo plan): vị trí 3 khu (screenshot trong `Temp/NoelShots/`) và ảnh nền/decor.
- Vị trí player lúc mở game (trước khi chọn mission) giữ như cũ (-10.9, 13.6, -93.3) — nằm ở rìa đông map Noel, bị journal che.
- `GameManager.cs` có thay đổi 1 khoảng trắng từ trước (16:48), không phải do lần implement này.
- `Assets/SVC_Luna.asset` version 1080→1085 do Luna plugin tự cập nhật.
