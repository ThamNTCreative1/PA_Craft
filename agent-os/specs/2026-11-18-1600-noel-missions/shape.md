# Shape — Noel Missions

Status: **APPROVED** by user 2026-11-18 (rev 3; O1-A, O2-A, O3-A, O4-A)

## Yêu cầu user

Lần 1: chuyển 3 mission thành
1. **Fire paintballs** — bắn quái ở công viên có cây thông noel.
2. **Câu cá** — đưa user ra bục câu cá như ảnh mẫu.
3. **Lái xe** — đường nhiều shop noel cạnh market.

+ nền "Select the mission" là ảnh cây thông noel, thêm element giáng sinh vào khung; map + thời tiết noel/tuyết; chỉnh được vị trí mission trên khung; nhân vật Noel; asset map/nhân vật từ `aa.unitypackage`, câu cá từ `D:\Source\party-craft`.

Lần 2: bỏ map hiện tại, dùng map trong package; tìm map câu cá.

Lần 3 (chốt):
- Bục câu cá: **phương án A** (dựng trong map Noel, ở mép nước) — theo ảnh mẫu: bè gỗ phủ tuyết nổi trên nước, có rương/khối gỗ, đèn, cây thông nhỏ; người chơi cầm cần câu, nút "REEL".
- "v021": bỏ qua — chỉ dùng đúng nội dung package user gửi.
- Nhân vật: **1 dropdown Luna Playground** để chọn nhân vật chơi.
- Ảnh nền journal: **tự generate**.
- Map phần bắn súng và lái xe = **map trong scene Gameplay của package** (giữ nguyên dàn dựng: map Noel, lớp tuyết phủ, cây thông, quà, người tuyết, tuyết rơi).

## Quyết định đã chốt

| # | Quyết định |
|---|---|
| C1 | Xoá `CityMap_Cropped` + `CityMap_Cropped_Colliders` khỏi scene; dùng môi trường từ scene `Gameplay.unity` của package |
| C2 | Bục câu cá dựng bằng block trong map Noel, ở mép mesh nước, theo ảnh mẫu |
| C3 | Skin chọn bằng 1 Luna dropdown (thay cho gán skin cố định theo mission) |
| C4 | Ảnh nền journal generate, user duyệt hình trước khi gắn |
| C5 | Không import nguyên package (ghi đè `GameManager.cs`, `GameController.cs`, `Gameplay.unity`) — chỉ lấy asset mới qua project tạm |

## Phạm vi

Trong phạm vi:
- Journal 3 row: Fire Paintballs / Go Fishing / Drive Car. Motorbike gỡ khỏi journal và `MissionManager` (code giữ nguyên).
- Spawn point mỗi mission (teleport khi GO): Paintball → công viên cây thông; Fishing → bục câu cá; Car → đường shop noel cạnh market.
- Môi trường Noel từ scene package + tuyết rơi.
- Mission câu cá tối giản (port logic party-craft).
- Journal: nền cây thông generate, decor giáng sinh, vị trí row chỉnh được trong Editor.
- Luna dropdown "Character Skin".

Ngoài phạm vi: win/lose/complete mission, phần thưởng, album/shop/inventory cá, đổi end flow `GameManager`, xoá code Motorbike, đổi skin NPC paintball, vệt chân trên tuyết.

## Quyết định còn mở (cần user chọn khi duyệt)

### O1. Lớp tuyết phủ (snow cover) trong scene package
Phát hiện: `noel_snow_city/buildings/extra.prefab` (54+ khối) **không chứa mesh** — mesh được dựng lúc chạy bởi `SnowGridChunk` từ `cellHeights`. Package thiếu `SnowQuality`, `SnowTrailPainter` (được `SnowGridManager`, `NoelSnowfall` dùng) → import nguyên sẽ lỗi compile. Scene package **không đặt** `SnowGridManager`.
- **A (khuyến nghị):** Giữ `SnowGridChunk` (dựng mesh 1 lần ở Awake), sửa 2 dòng gọi `SnowGridManager` thành `Rebuild()` trực tiếp; không import `SnowGridManager`, không port `SnowQuality`/`SnowTrailPainter`. `NoelSnowfall` bỏ nhánh `SnowQuality`, bỏ `FindObjectOfType`, target serialize. Không cần code từ party-craft.
- **B:** Port `SnowQuality` + `SnowTrailPainter` từ party-craft để giữ nguyên 100% code package (refill + vệt chân). Nhiều code hơn, `SystemInfo.systemMemorySize` cần kiểm Luna.

### O2. Shader của tuyết
Package dùng 2 shader nhỏ Built-in Unlit: `Playable/Noel/SnowBlock` (trắng + AO theo vertex color) và `Playable/Noel/Snowflake` (alpha blend). Standard yêu cầu "no custom shader", nhưng project đã dùng shader custom `Playable/Unlit Brightness` cho map.
- **A (khuyến nghị):** Giữ 2 shader này như ngoại lệ được duyệt (cùng họ `Playable/*`, unlit, không ánh sáng) — hình giống hệt package.
- **B:** Đổi khối tuyết sang `Playable/Unlit Brightness` màu trắng (mất AO cạnh khối, tuyết trông phẳng), bông tuyết sang `Particles/Standard Unlit`.

### O3. Số skin trong dropdown
- **A (khuyến nghị):** 3 skin như ảnh tham chiếu: Santa (`noel_npc_santa`), Puffer Jacket (`Winter_Puffer_Jacket`), Elf (`noel_outfit_elf`). Mặc định: Santa.
- **B:** Cả 6 skin package (thêm Reindeer, Santa Suit, Sweater) — tăng size (~+800 KB mesh YAML trước nén).

### O4. Tùy chỉnh vị trí mission trên khung
- **A (khuyến nghị):** Kéo RectTransform từng row trong Editor (không code).
- **B:** Thêm Luna dropdown "Mission Order" (6 hoán vị) + component `MissionRowLayout` đặt row theo slot.

## Rủi ro
- Size: map Noel ~1.25 MB fbx + colliders 1 MB + decor + skin + cá/cần. Phải đo build < 4.5 MB; nếu vượt: thay MeshCollider bằng box collider, giảm decor.
- Điểm spawn công viên/cây thông, đường shop cạnh market, mép nước đặt bục: xác định trên map Noel sau import; Codex gửi screenshot để user duyệt.
- Paintball cần đúng 5 NPC; dời khu bắn sang công viên phải giữ vùng di chuyển NPC hợp lệ.
- Object hiện đặt theo map cũ (xe, NPC, minimap point, arrow) có thể lệch cao độ.
