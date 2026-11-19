# Shape — Xmas Vehicle & Pet Picker

Status: **PENDING APPROVAL**
Ngày: 2026-11-19 · Nhánh: CCPW_V07 · Scene nguồn: `Assets/_Playable_/Scenes/Gameplay.unity`

## 1. Kịch bản user (nguyên văn rút gọn)
- Model xe đạp: `C:\Users\Admin\Downloads\MODHUB-FF3D4E0B457A9C9669.zip` (`bycicle.glb/.gltf/.blend` + 1 texture 2 KB).
- Ô tô: dùng model trong scene (`Missions/CarMission/Content/Playable Sports Car`).
- Ẩn mọi model không liên quan, **giữ** map, tuyết, decor trên map.
- Visual: góc cam như ảnh mẫu (portrait, cam ngang tầm người nhìn ngôi nhà + sân cỏ phía trước), nhà + sân vườn theme Xmas; dưới màn hình 2 thẻ chọn: xe đạp | siêu xe.
- Gameplay:
  1. Bàn tay hướng dẫn di chuyển qua lại giữa 2 thẻ.
  2. Click thẻ nào → vật đó rơi từ trên xuống sân + FX + SFX hợp theme Xmas.
  3. Build xong vehicle → hiện tiếp 2 thẻ chọn pet: chó | mèo.
  4. Click pet → pet rơi xuống (giống bước 2) → mở store.
- Âm thanh: lấy từ scene hiện tại.

## 2. Hiện trạng đã kiểm (MCP + source)
| Hạng mục | Kết quả |
|---|---|
| Map | `CityMap_Noel` (Base_Map, Grass, Road, Water, Colliders, Map Boundary) |
| Tuyết | `[Noel] Snow City`, `[Noel] Snow Buildings`, `[Noel] Snow Extra`, `[Noel] Snowfall` |
| Decor | `[Noel] Christmas Trees` (17), `[Noel] Roadside Gifts and Snowmen` (23) |
| Không liên quan | `Player`, `Missions/*` (NPC, xe, raft câu cá…), `[Noel] Fishing Sea`, `[Noel] Skin Selector`, Canvas `GamePanel` (joystick, HUD paintball/fishing/car, minimap…), `MissionsJournalPanel` |
| Camera | `Camera_Controller/Yaw_Pivot/Pitch_Pivot/Camera` (có `CameraController` bám player) |
| Ô tô | `Playable Sports Car` (Rigidbody, BoxCollider, CarController, AudioSource) — chỉ cần phần visual |
| Pet | `Assets/GameAsset/Model/Pets/dog1..4.fbx`, `cat3.fbx` (chưa kiểm tris/texture/anim) |
| Bàn tay | `Assets/Game/Textures/UI/Common/icon_hand.png`; `InfinitySwipe/Hand` có Animator |
| FX | `Epic Toon FX/Prefabs/Combat/Explosions/SparkleExplosion/*` (cần kiểm shader/size cho Luna) |
| Âm thanh có sẵn | `We Wish You a Merry Christmas Karaoke Instrumental.mp3` (nhạc nền), `engine-sound.wav`, `mixkit-happy-puppy-barks-741.wav`, `yeah-kids.mp3`, `victory.wav`, `dog-breathing-70540.mp3`. **Không có** tiếng mèo, tiếng chuông/whoosh/landing |
| Tween | DOTween đã có (`ScaleHandHint`) |
| glTF | `com.unity.cloud.gltfast 6.19.0` có trong manifest |
| Store | `GameManager.EndGame()` → `LifeCycle.GameEnded()` + `Playable.InstallFullGame()` (trừ khi `_isApplovin`); `ShowCta()` private |
| Timer | `GameManager` tự `EndGame()` sau `_endTime` (30 s mặc định) |

## 3. Quyết định cần user chọn

### D1 — Scene làm việc
- **A (khuyến nghị):** Duplicate `Gameplay.unity` → `Assets/_Playable_/Scenes/XmasPicker.unity`, ẩn/xoá object không liên quan trong bản copy. Gameplay CCPW_V07 cũ giữ nguyên, không đụng UI user chỉnh tay. Trade-off: 2 scene cùng tham chiếu asset; build Luna phải chọn đúng scene.
- B: Patch trực tiếp `Gameplay.unity` (SetActive false các object). Trade-off: một scene duy nhất nhưng phá phiên bản gameplay hiện tại; object ẩn vẫn bị Luna đóng gói → tốn dung lượng.

### D2 — Ẩn hay xoá object không liên quan
- **A (khuyến nghị nếu D1-A):** Xoá hẳn trong scene copy → giảm dung lượng build.
- B: Chỉ `SetActive(false)` → vẫn nằm trong build.

### D3 — Vị trí ngôi nhà + sân
Map hiện có nhiều nhà. Codex chụp 2–3 góc ứng viên (nhà có sân cỏ trước, gần cây thông/quà) → **user chọn**. Có thể bổ sung decor Xmas (cây thông nhỏ, hộp quà, người tuyết lấy từ `[Noel]` có sẵn) quanh sân nếu thiếu.

### D4 — Import xe đạp
- **A (khuyến nghị):** Import `bycicle.glb` qua glTFast trong Editor, rồi tạo prefab `Bicycle_Display.prefab` từ mesh đã import; material đổi sang `Playable/Unlit Brightness`. Kiểm Luna đọc được mesh sub-asset của glTFast.
- B: Codex mở `.blend` bằng Blender MCP, export FBX theo `blender/export-unity` → an toàn tuyệt đối cho Luna, thêm 1 bước.

### D5 — Pet
- Chó: `dog1.fbx` (khuyến nghị — kiểm trước) hoặc dog2/3/4. Mèo: `cat3.fbx` (duy nhất).
- Pet có/không animation idle: nếu FBX có clip → dùng Legacy/Generic (theo spec `luna-generic-animation`); nếu không → bob nhẹ bằng DOTween.

### D6 — Icon trên thẻ chọn
- **A (khuyến nghị):** Chụp model bằng camera Editor ra PNG nền trong suốt 256×256 (giống phong cách ảnh mẫu: icon 3D trên nền bo góc vàng).
- B: `generate_image` → phong cách có thể lệch model thật.

### D7 — SFX thiếu (mèo, whoosh rơi, chạm đất, chuông Xmas)
- A: `generate_audio` (Unity MCP) tạo `sfx_xmas_bell.wav`, `sfx_drop_whoosh.wav`, `sfx_land_poof.wav`, `sfx_cat_meow.wav` ngắn (≤1 s, mono, 22 kHz).
- B: Chỉ dùng âm có sẵn: rơi = `yeah-kids.mp3`, xe = `engine-sound.wav`, chó = `puppy-barks`, mèo = `yeah-kids` (không hợp).
- Khuyến nghị **A cho mèo + bell/land**, B cho phần còn lại; user nghe duyệt trước khi gắn.

### D8 — Thời điểm mở store
- **A (khuyến nghị):** Pet chạm đất + FX xong (~1.0 s) → `GameManager.EndGame()` (giữ `GameEnded` + InstallFullGame, tôn trọng cờ Applovin).
- B: Mở store ngay lúc click pet.

### D9 — Timer 30 s của GameManager
- **A (khuyến nghị):** Giữ timer làm fallback (người chơi idle vẫn ra store). Có thể tăng `End Time` qua Luna field.
- B: Tắt timer trong scene này.

### D10 — Click ngoài thẻ / chạm màn hình
- **A (khuyến nghị):** Chỉ 2 thẻ nhận click; cả màn hình không mở store.
- B: Bất kỳ chạm nào cũng mở store (Button Block).

## 4. Ngoài phạm vi
Không điều khiển xe, không gameplay paintball/fishing, không Win/Fail panel, không replay.
