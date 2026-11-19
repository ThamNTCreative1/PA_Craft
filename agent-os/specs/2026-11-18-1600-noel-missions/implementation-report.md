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

## Cập nhật 2026-11-18 (sau CCPW_V07)
- Nền journal thay bằng ảnh user cung cấp `Artboard 1.png` (1920×1080) → `Assets/_Playable_/UI/MissionsJournal/journal_bg_artboard.png` (Sprite, max 1024, compressed). `XmasBackground` dùng `AspectRatioFitter` EnvelopeParent, tỉ lệ 16:9: màn ngang hiện trọn ảnh, màn dọc cắt hai bên, cây thông giữ ở giữa. Đã xoá ảnh nền render trước đó (`journal_bg_xmas_tree.png`, không còn tham chiếu).
- Nhạc nền: party-craft không có nhạc Noel; user chọn bản ở nhánh `CPC_V06` của repo → `Assets/_Playable_/Sound/We Wish You a Merry Christmas Karaoke Instrumental.mp3` (giữ GUID gốc, 1.85 MB, 115.7 s), gán `GameManager._backgroundMusic` (Luna Playground asset "Background Music"). Play: Music source phát đúng clip, loop, console sạch. File nhạc đua xe cũ vẫn để trong project nhưng scene không còn tham chiếu.

## Cập nhật 2026-11-18 (UI câu cá + nền 1920×1080)
- HUD câu cá dựng lại theo `party-craft/Assets/MiniGames/Fishing/Prefabs/UI/FishingHUD.prefab`, dùng sprite gốc (chép kèm GUID vào `Assets/_Playable_/Fishing/Sprites/fishing_*.png`): nút tròn `FishAction` (Shadow, Ring radial = lực quăng, Fill xanh CAST / cam REEL, Icon cá/tay, Label, "!" khi cá cắn), `ReelBar` (fishing_rounded + fill fishing_line_dot + icon cá), `FightPrompt` "TAP FASTER!", `Hint`. Không lấy album, catch popup, fight tutorial card.
- Text hướng dẫn (`Hint`, `FightPrompt`) dùng font `Assets/Game/Fonts/FFFFORWA SDF.asset`.
- `FishingHUD.cs`: thêm `_actionIcon`, `_actionFill`, `_chargeRing`, `_bang`, `_castIcon/_reelIcon`, `_castColor/_reelColor`, `_fightPrompt`; bỏ `_chargeBar/_chargeFill`.
- `XmasBackground`: size cố định 1920×1080, bỏ AspectRatioFitter; thêm `Scripts/UI/UICoverScaler.cs` (mới) scale đều để phủ kín parent (dọc: ×2.6, ngang: hiện trọn). Lý do: giữ đúng size 1920×1080 theo yêu cầu mà vẫn tối ưu ngang/dọc.

## Cập nhật 2026-11-18 (anim câu cá, sửa lái xe, căn UI)
### Lỗi không lái được xe — nguyên nhân & sửa
- 6 tham chiếu trong scene bị rỗng ở commit `CCPW_V07` (so với `1e9212ab5`): `PlayerAction._cars` (rỗng), `PlayerAction._carArrow`, `GameController._carRide._panel/_firstRideHint`, `_motorbikeRide._panel/_firstRideHint`. Không tìm thấy code tự xoá; khả năng cao bị mất trong lúc chỉnh scene của lần implement trước. Đã khôi phục đúng object cũ (đối chiếu fileID). Quét toàn bộ field tham chiếu so với `1e9212ab5`: không còn field nào bị mất.
- `CameraController.FollowVehicle`: yaw ban đầu lấy theo hướng xe (trước đây cố định 0 → xe quay hướng đông thì camera nhìn ngang hông).
- Kiểm chứng Play: tap qua `GameController` → lên xe, `UICarController` hiện, giữ Forward 1.5 s xe đi ~3 m, camera sau xe.
- Test mới `NoelMissionsSceneTests.CarMission_VehicleReferencesAreWired`.

### Anim câu cá
- Player dùng Generic animation (Luna), không dùng được clip Humanoid của party-craft → thêm `Scripts/Fishing/FishingPoseAnimator.cs` (mới): sau Animator, xoay tay phải/trái, nghiêng Spine1 và đặt cần theo state: lấy đà (Charging), vung cần (Casting), cầm cần + nhấp nhẹ (Waiting), ngả người giật cần (Fighting), giơ cần (Catching). Có cơ chế trả xương về tư thế gốc nếu Animator không ghi đè (tránh cộng dồn).
- `FishingController`: thêm `StateTime`, `CastDuration`; bỏ tham chiếu `_rodPivot` trong scene (pose mới điều khiển cần).

### Căn joystick / Jump / tut move cùng trục Y
- Lấy `UIAlignY.cs` từ package (GUID gốc), thêm `_offsets` tuỳ chọn. Gắn trên `UIPlayer`: reference = `Joystick Base`; targets cùng trục: `Btn Jump`, `InfinitySwipe`, `PaintballHUD/.../Swipe To Move Camera`; giữ bố cục cũ phía trên nút Jump: `Fire` +200, `PaintballHUD/Hint` +332, `FishAction` +200, `FightPrompt` +453.
- Play: tâm Y joystick = Jump = InfinitySwipe (127.15).

Tests: EditMode 14/14 pass (FishingRules 7, NoelMissionsScene 7).

## Cập nhật 2026-11-19 (popup bị cắt ở 20:9)
- Nguyên nhân: màn ngang 20:9 (vd. 2400×1080) với match 0.5 cho canvas cao ~966, popup (Title + Frame + quà góc) cao ~1100.
- Sửa: gom `Title`, `Frame`, `Hand` vào `MissionsJournalPanel/Content` (1260×1220) + `Scripts/UI/UIFitScaler.cs` (mới): chỉ thu nhỏ đều để vừa parent, không phóng to. 20:9 → scale 0.79; 16:9 và màn dọc → 1 (không đổi). Hand vẫn chỉ đúng nút GO (DOMove theo world position).
- Play 20:9: popup hiện trọn, console sạch. EditMode NoelMissionsSceneTests 7/7 pass.

## Cập nhật 2026-11-19 (cần Samurai, HUD gốc, 1 loại cá)
- Cần câu: dựng theo `party-craft/.../Prefabs/Gear/SamuraiRod.prefab` — mesh `Fishing_Rob_Samurai` trong `Premium_Fishing_Rob.fbx` (chép kèm GUID vào `_Playable_/Fishing/Models/`), Model rotation/offset và `RodTip` (0, 1.188, 0) như prefab. Material mới `M_FishingRodSamurai` (`Playable/Unlit Brightness`) dùng lại `Noel/Models/Roadside/Full_Color.png` (md5 trùng file palette của party-craft, không thêm texture). Không lấy FX aura (`FX_RodAura_Samurai`, 860 KB, material URP) và script `FishingRodView`.
- HUD: `FishingHUD.cs` theo `ActionVisual` của party-craft (cast/wait/fight/hurry): CAST = `Ellipse 6.png` + icon `Sprites/Icons/Rod.png`; WAIT = `Ellipse 5.png` + `fishing_icon_wait`; TAP! = cam + `fishing_icon_tap`; FASTER! = đỏ (tension ≥ 0.65). Ring: đầy theo lực khi giữ CAST, chớp xanh khi tap, đỏ khi hurry. Sprite chép kèm GUID vào `_Playable_/Fishing/Sprites/`.
- Cá: chỉ còn `Fish_01_Bluegill`. Đã xoá khỏi scene và project: cá 02–04 (fbx, albedo, mat), cần tre `Rod_Bamboo.fbx`, `Rod_Palette.png`, `M_FishingRod.mat` (đã kiểm tra không còn tham chiếu).
- Dời cây thông + hộp quà trên bè sang mép trước để không che camera ở màn ngang.
- Play: CAST → WAIT → TAP!/FASTER! hiển thị đúng; EditMode 14/14 pass.

## Cập nhật 2026-11-19 (dùng prefab FishingHUD gốc)
- Chép `party-craft/Assets/MiniGames/Fishing/Prefabs/UI/FishingHUD.prefab` (giữ GUID) → `Assets/_Playable_/Fishing/Prefabs/FishingHUD.prefab` + `Materials/UI/FishingOutline.mat`, `Sprites/fish_bluegill.png`. Sprite/font còn lại đã có sẵn cùng GUID.
- Trong prefab: xoá `FishAlbumButton`, `FishAlbum` (cần inventory), gỡ 4 component thiếu script (FishingHUD/FishingHoldButton/FishingReelBar/FishingFightTutorial của party-craft) và `Button` trên FishAction; thêm `FishingHoldButton` + `FishingHUD` của project.
- `FishingHUD.cs` viết lại để điều khiển các phần tử gốc: FishAction (CAST/WAIT/TAP!/FASTER!, ring, "!"), ReelBar bám phao (WorldToScreen, canvas Overlay), FightTutorial (lần kéo đầu, pause controller, "Tap to start" → tiếp tục), CatchPopup (Bluegill, COMMON, "+1 fish", NEW! lần đầu), Message ("The fish got away!"), Hint, FightPrompt.
- Text hướng dẫn (Hint, FightPrompt, thẻ FightTutorial) đổi sang `FFFFORWA SDF`.
- Bố cục theo project: FishAction (-390, 517) + UIAlignY (+200 trên Jump), FightPrompt +453, Hint neo trên (0, -240).
- HUD dựng tay trước đó đã xoá khỏi scene; dọn 17 sprite album/khác không còn tham chiếu.
- Play: Ready → Charging → Casting → Waiting → Fighting (thẻ tutorial hiện + pause) → Catching (popup hiện) → Ready. EditMode 14/14 pass.

## Cập nhật 2026-11-19 (bỏ tutorial kéo cá)
- Xoá `FightTutorial` ("Reel it in!") khỏi prefab `_Playable_/Fishing/Prefabs/FishingHUD.prefab`; HUD không còn pause khi kéo lần đầu.
- Hint lúc Fighting để trống (bỏ "Tap fast to fill the bar!").
- Play: Fighting hiển thị ngay nút TAP!, "!", "TAP FASTER!", thanh kéo; console sạch.

## Cập nhật 2026-11-19 (bỏ dấu "!")
- Xoá `Content/FishAction/Bang` ("!" vàng phía trên nút) khỏi prefab FishingHUD. Play: Fighting không còn "!", console sạch. Icon nhỏ `ReelBar/Fish/SurgeBadge` (fishing_icon_surge) vẫn giữ.

## Cập nhật 2026-11-19 (TAP FASTER sát nút, tối ưu dọc/ngang)
- `UIAlignY` offset của `FightPrompt`: +453 → +335 (ngay trên mép nút FishAction, chỗ trống của "!" đã xoá).
- Phát hiện `Canvas/ResponsiveCanvasScaler._portraitMatch` = 1 (commit CCPW_V07: 0.304) làm toàn bộ UI màn dọc phóng to ×2 và đè nhau. User chọn trả về **0.304**.
- Hint FishingHUD neo trên (0, -310) để không chạm thanh trên ở 9:20.
- Kiểm tra Play (Game view đặt bằng `PlayModeWindow.SetCustomRenderingResolution`, đã khôi phục 854×384): 1920×1080, 2400×1080, 1080×1920, 1080×2400 — nút TAP, "TAP FASTER!", thanh kéo, hint không chồng nhau; console sạch.

## Cập nhật 2026-11-19 (bỏ CatchPopup)
- Xoá `Content/CatchPopup` khỏi prefab FishingHUD; gỡ `_fishIcon` và xoá `Sprites/fish_bluegill.png` (không còn tham chiếu). HUD bỏ qua popup khi null.
- Play: Waiting → Fighting → Catching → Ready, không popup, console sạch.

## Cập nhật 2026-11-19 (hand journal lệch nút GO)
- Nguyên nhân: `JournalHandSequencer.Begin` lưu world position của nút GO rồi `DOMove`; `UIFitScaler` (popup 20:9) / đổi hướng màn hình làm thay đổi scale sau đó nên tay lệch.
- Sửa: tính vị trí theo local space của parent của Hand (`InverseTransformPoint`) và dùng `DOLocalMove` — không phụ thuộc scale của Content/canvas.
- Play: 2400×1080 tay trùng tâm GO (1521.34, 580.72); đổi sang 1080×1920 khi đang chạy vẫn chỉ đúng GO; console sạch. Game view đã khôi phục 854×384.

## Cập nhật 2026-11-19 (vị trí xe)
- Theo ảnh user: xe đặt ở đường giữa x≈-66, giữa chỗ rẽ trái (z≈5) và vạch qua đường (z≈-16), hai bên cặp cây thông+quà z≈-3. Xe (-64.2, 13.5, -8) yaw 0 (hướng bắc, làn phải); SpawnPoint (-61.14, 13.5, -13.34), yaw -35 (giữ bố cục tương đối cũ); CarMission _playerYaw/_cameraYaw -35.
- Play: tap lên xe OK, UI lái hiện, camera sau xe, giữ Forward xe chạy; console sạch.

## Cập nhật 2026-11-19 (xe trước trạm Gas, quay ngược)
- Xe (-67.8, 13.5, 32) yaw 180 (hướng nam, làn sát trạm Gas) trên đường giữa trước trạm Gas; SpawnPoint (-70.86, 13.5, 37.34) yaw 145; CarMission _playerYaw/_cameraYaw 145.
- Play: tap lên xe OK, camera sau xe, giữ Forward xe chạy về hướng nam; console sạch.

## Cập nhật 2026-11-19 (xoá motorbike khỏi scene)
- Xoá `Missions/MotorbikeMission` (xe Playable Motobike 4, Motorbike Guide Arrow, Motorbike Tap To Drive Tutorial) và `Canvas/GamePanel/UI motobike` (nút Forward/Back/Left/Right/Exit, First Ride Tutorial).
- Gỡ tham chiếu trước khi xoá: `PlayerController._forward/_reverse/_left/_rightButton`, `PlayerAction._exitButton/_motorbikeArrow/_motorbikes` (rỗng), `GameController._motorbikeRide._panel/_firstRideHint`; `Car Guide Arrow._targetPosition` → xe ô tô. Code đều null-safe. Quét scene: 0 tham chiếu hỏng, 0 object moto/bike.
- Asset motorbike (model, controller, script) giữ nguyên trong project (chỉ xoá trên scene).
- Test: thay kiểm tra `_motorbikeRide` bằng `MotorbikeRemovedFromScene`; EditMode 15/15 pass. Play: GO Paintball, chuyển Fishing/Car/Paintball OK, lên xe ô tô OK, console sạch.

## Cập nhật 2026-11-19 (Luna field thứ tự mission)
- `MissionsJournalController`: thêm enum `MissionOrder` (6 hoán vị) + `[LunaPlaygroundField("Mission Order")] _missionOrder` (mặc định `Paintball_Fishing_Car`). `ApplyMissionOrder()` trong Awake: lấy vị trí 3 row hiện có làm slot (trên → dưới), đặt row theo thứ tự chọn và sắp lại target của Hand. Yêu cầu `_rows` = [Paintball, Fishing, Car] (đã đúng trong scene).
- Play với `Car_Fishing_Paintball`: popup hiển thị Drive Car / Go Fishing / Fire Paintballs, GO dòng trên → CarMission; đã trả về mặc định. NoelMissionsSceneTests pass.

## Cập nhật 2026-11-19 (thứ tự mission = 3 field số)
- Thay enum `MissionOrder` bằng 3 Luna field: `Fire Paintballs Order` (=1), `Go Fishing Order` (=2), `Drive Car Order` (=3); 1 = trên cùng. Sắp xếp ổn định: trùng/sai số giữ thứ tự mặc định Paintball, Fishing, Car.
- Play với 3/2/1: Drive Car / Go Fishing / Fire Paintballs; đã lưu lại 1/2/3. Console sạch.

## Cập nhật 2026-11-19 (tutorial joystick + vuốt camera cho câu cá)
- `FishingMissionController`: bỏ override `UsesDrivingTutorial => false` → dùng chung tutorial bắt đầu như Paintball/Car (joystick "SWIPE TO MOVE" + InfinitySwipe "SWIPE TO MOVE CAMERA").
- Play: GO câu cá hiện cả 2 tutorial; chạm CAST lần đầu tắt tutorial, câu bình thường (state rời Ready), không lên xe nhầm; console sạch.

## Cập nhật 2026-11-19 (sắp xếp Luna Playground)
- Dùng `LunaPlaygroundSection(title, order)` + tham số `fieldOrder`/`fieldSection` của `LunaPlaygroundField`/`LunaPlaygroundAsset`:
  1. Game Settings (GameManager): End Time 1, Total Event For CTA 2, Game Brightness 3 (GameController), Background Music 4, Applovin 5.
  2. Character (NoelSkinSelector): Character Skin 1.
  3. Mission Order (MissionsJournalController): Fire Paintballs 1, Go Fishing 2, Drive Car 3.
- Compile sạch; reflection xác nhận section/order. Hiển thị thực tế trên Playground cần build Luna để kiểm.

## Cập nhật 2026-11-19 (hint câu cá giữa biển)
- `FishingHUD/Content/Hint`: neo theo tỉ lệ màn hình anchor (0.5, 0.68), pivot giữa, offset 0 → nằm giữa vùng biển ở cả dọc và ngang.
- Play: 1080×1920, 1920×1080, 2400×1080 đều nằm trên biển giữa thanh trên và bè. Game view khôi phục 303×674.
