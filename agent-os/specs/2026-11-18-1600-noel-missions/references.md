# References — Noel Missions

## Nguồn trong PA_Craft (hiện trạng, đã đọc 2026-11-18)

| Khu vực | File | Ghi chú |
|---|---|---|
| Mission base | `Assets/_Playable_/Scripts/Missions/MissionController.cs` | `_content`, `_player`, `_camera`, yaw/pitch; `Enter()` giữ nguyên vị trí player (dòng 33) |
| Mission manager | `Assets/_Playable_/Scripts/Missions/MissionManager.cs` | `TrySelect`, `[DefaultExecutionOrder(-200)]`, `_missions = [Car, Motorbike, Paintball]` |
| Car mission | `Assets/_Playable_/Scripts/Missions/CarMissionController.cs` | dùng `CarDriveTutorial` |
| Motorbike mission | `Assets/_Playable_/Scripts/Missions/MotorbikeMissionController.cs` | sẽ bị gỡ khỏi journal |
| Paintball mission | `Assets/_Playable_/Scripts/Missions/PaintballMissionController.cs` | yêu cầu đúng 5 NPC |
| Journal | `Assets/_Playable_/Scripts/UI/MissionsJournal/MissionsJournalController.cs` | hard-code 3 rows (dòng 31) |
| Row view | `Assets/_Playable_/Scripts/UI/MissionsJournal/MissionRowView.cs` | label/status/GO/`_mission` |
| Hand | `Assets/_Playable_/Scripts/UI/MissionsJournal/JournalHandSequencer.cs` | DOTween |
| Teleport API | `Assets/_Playable_/Scripts/Controller/PlayerController.cs:297-298` | `Teleport(Transform)` / `Teleport(pos, rot)` |
| End flow | `Assets/_Playable_/Scripts/Manager/GameManager.cs` | timer `_endTime` → `GameEnded` → CTA; **không đổi** |
| Journal frame sprite | `Assets/GameAsset/Sprites/UI/popup_frame.png` | Frame 1120×760 |
| Row sprite | `Assets/_Playable_/UI/MissionsJournal/mission_fr.png` | |
| Map hiện tại | `Assets/GameAsset/Model/Map/Map cropped/CityMap_Cropped.fbx` | 15 ref trong `Gameplay.unity` |

## Nguồn trong `C:\Users\Admin\OneDrive\Desktop\aa.unitypackage` (216 MB)

Package là bản của **cùng project** ở nhánh khác: 1262 asset, **1119 file trùng GUID với PA_Craft**, chỉ 143 file mới.
Các file trùng GUID nhưng **nội dung khác** (import sẽ ghi đè): ít nhất `GameManager.cs`, `GameController.cs`, `Scenes/Gameplay.unity` (đã diff xác nhận). Không được import nguyên package.

File mới cần lấy (đề xuất):

| Asset | Size (raw) | Dùng cho |
|---|---|---|
| `Assets/GameAsset/Model/Map/Map noel/CityMap_Noel.fbx` + `Material/*.mat` (64 mat) | 1.25 MB | map Noel |
| `Assets/GameAsset/Model/Map/Map noel/CityMap_Noel_Colliders.prefab` | 1.0 MB | collider map |
| `Assets/_Playable_/Noel/Models/NoelXmasTree_Giant.fbx` / `_Small.fbx` | 101 KB / 57 KB | cây thông công viên |
| `Assets/_Playable_/Noel/Models/Roadside/*.fbx` + `Full_Color.png` | ~160 KB | hộp quà, người tuyết, shop noel |
| `Assets/_Playable_/Noel/Prefabs/noel_snowfall.prefab` + `Scripts/NoelSnowfall.cs` | 118 KB | tuyết rơi |
| `Assets/_Playable_/Noel/Prefabs/noel_snow_city/buildings/extra.prefab` + `SnowGridChunk.cs`, `SnowGridManager.cs` | ~890 KB | lớp tuyết phủ (175 chunk) |
| `Assets/_Playable_/Noel/Materials/SnowBlock.shader`, `Snowflake.shader` | — | **custom shader – vi phạm standard** |
| `Assets/_Playable_/Noel/Scripts/NoelSkinSelector.cs` | 122 dòng | đổi mesh+material 6 bộ phận |
| `Assets/_Playable_/Noel/Skins/Imported/{noel_npc_santa, Winter_Puffer_Jacket, noel_outfit_elf}_*` + `Textures/*.png` | 80–460 KB/body | 3 skin nhân vật |
| `Assets/_Playable_/Scripts/UI/UIAlignY.cs` | — | chưa cần |

Phụ thuộc **thiếu** trong package: `SnowQuality`, `SnowTrailPainter` (được `NoelSnowfall`/`SnowGridChunk` dùng). Bản gốc ở
`D:\Source\party-craft\Assets\GameEvent\Noel\Scripts\Decor\SnowQuality.cs` (49 dòng) và `SnowTrailPainter.cs` (69 dòng).

Scene package dùng `CityMap_Noel` (15 ref) + 3 snow prefab (141 ref), có object `[Noel] Christmas Trees`, `[Noel] Roadside Gifts and Snowmen`, `[Noel] Skin Selector` — vị trí đặt cây/quà chỉ tồn tại trong scene đó.

### Map skin ↔ ảnh tham chiếu (đề xuất, chờ xác nhận)

| Ảnh | Skin trong package | Lý do |
|---|---|---|
| NV 1 (Santa râu trắng) | `noel_npc_santa` | texture đỏ + mặt râu trắng |
| NV 2 (mũ trùm đỏ, quần xám) | `Winter_Puffer_Jacket` | áo đỏ, hood, quần xám-xanh |
| NV 3 (áo len xanh, tay sọc kẹo, tóc đen) | `noel_outfit_elf` | thân xanh lá, sọc đỏ trắng |

## Nguồn câu cá `D:\Source\party-craft\Assets\MiniGames\Fishing\`

- `Scripts/Core/FishingController.cs` (1118 LOC): state machine None→Ready→Casting→Waiting→Fighting→Reeling; phụ thuộc Opsive, HAVIGAME, PrimeTween, Odin, Inventory, Album.
- `Scripts/Core/FishingConfigSO.cs` (475 LOC): rarity roll, FightProfile, timing (cast 1.2 s, castMin 2.5/castMax 7, wait 4–10 s, 0–2 nibble).
- `Scripts/UI/FishingHoldButton.cs` (42 LOC): IPointerDown/Up — port được gần nguyên trạng.
- `Scripts/UI/FishingReelBar.cs` (85 LOC): thanh tiến độ.
- Models: `Models/Fish/Fish_01..15_*.fbx` (~40 KB/cái), `Models/Rods/Rod_*.fbx` (~25 KB), `Prefabs/Gear/FishingRod.prefab`, `FishingBobber.prefab`.
- Audio `Audio/Fishing_*.wav` (~218 KB tổng).
- **Không có bục/dock câu cá** trong party-craft; câu ở mép `SwimmingArea` bất kỳ.
- Vật liệu đều URP → phải làm lại Built-in Unlit. Tránh `Models/Rods/Full_Color.png` (13.3 MB).
- Animation câu là Humanoid clip; code có fallback xoay pivot cần câu khi không có clip.

## Khảo sát map câu cá (2026-11-18, lần 2, read-only)
- party-craft `Game/Scripts/Systems/Map/TeleportManager.cs`: enum `TeleportLocationType { Shop, GarStation, Swimming, ChristmasTree, Fishing }`.
- `Game/Scenes/City.unity`: child của prefab TeleportManager (gốc 0,0,0): `Fishing` local (-61, 14, 105); `ChristmasTree` local (38, 14, 9).
- City party-craft dùng `GameAsset/Model/Map/CityMap.fbx` (3.1 MB, 201k tris, có cả trong PA_Craft) + `bobien.fbx` ("far ocean", 8 tris).
- PA_Craft `CityMap_Cropped` world bounds (-68, 10, -108)–(82, 45, 59): không chứa điểm Fishing. Raycast tại (-61, 80, 105) không trúng gì; tại (38, 80, 9) trúng `Structure 1,0` y=14 (khu ChristmasTree nằm trong map crop).
- Mesh `Water` (con của `CityMap_Cropped`): bounds (-51, 12, -108)–(82, 19.9, 30), material `water_still` / `Playable/Unlit Brightness`.
- `GameEvent/SnowIsland`: terrain + 8 mảnh biển + 17 nhà placeholder, folder Models 49 MB, không có dock.
