# Plan — Noel Missions

Status: **APPROVED** by user 2026-11-18 (rev 3; O1-A, O2-A, O3-A, O4-A)
Viết theo các quyết định đã chốt C1–C5 và phương án khuyến nghị O1-A, O2-A, O3-A, O4-A trong `shape.md`. Nếu user chọn khác ở O1–O4, phần tương ứng được viết lại và trình duyệt lại.

## 0. Nguyên tắc
- Không import nguyên `aa.unitypackage`; không ghi đè `GameManager.cs`, `GameController.cs`, `Gameplay.unity`, `PlayerController.cs`.
- Patch trực tiếp object trong `Gameplay.unity`, không chạy Setup/rebuild (giữ UI user chỉnh tay).
- Field mới chỉ `[SerializeField]`, không `[TabGroup]`.
- Outcome giữ nguyên: timer `GameManager` → `GameEnded` → CTA/store.

## 1. Class / file

### Mới
| File | Class | Trách nhiệm | Public |
|---|---|---|---|
| `Assets/_Playable_/Scripts/Missions/FishingMissionController.cs` | `FishingMissionController : MissionController` | Enter/Exit/Pause → bật/tắt `FishingController` + `FishingHUD`; `UsesDrivingTutorial => false` | overrides |
| `Assets/_Playable_/Scripts/Fishing/FishingState.cs` | `enum FishingState` | None, Ready, Charging, Waiting, Fighting, Catching | — |
| `Assets/_Playable_/Scripts/Fishing/FishingRules.cs` | `FishingRules` (plain C#, `[Serializable]`) | Số liệu + công thức: cast distance theo charge, thời gian chờ, bước fight, chọn cá | `CastDistance(float)`, `RollWait(System.Random)`, `StepFight(float progress, float dt, int taps)`, `PickFishIndex(int, System.Random)` |
| `Assets/_Playable_/Scripts/Fishing/FishingController.cs` | `FishingController : MonoBehaviour` | State machine bằng coroutine (Hold→Cast→Wait→Bite→Tap reel→Catch→Ready), port tối giản từ party-craft | `Begin()`, `End()`, `SetPaused(bool)`, `OnHoldStart()`, `OnHoldEnd()`, `OnTap()`, `State`, `Progress`, `event Action<FishingState> StateChanged` |
| `Assets/_Playable_/Scripts/Fishing/FishingLineView.cs` | `FishingLineView : MonoBehaviour` | LineRenderer đầu cần→phao; phao bay arc (lerp tay), dip khi nibble, kéo về; cá bay lên đầu player | `Cast(Vector3, float)`, `Dip()`, `ReelIn(Transform fish, float)`, `Hide()` |
| `Assets/_Playable_/Scripts/Fishing/UI/FishingHoldButton.cs` | `FishingHoldButton` | Port gần nguyên party-craft (`IPointerDownHandler/IPointerUpHandler`) | `event Action Pressed/Released` |
| `Assets/_Playable_/Scripts/Fishing/UI/FishingHUD.cs` | `FishingHUD : MonoBehaviour` | Nút "CAST/REEL" theo state, thanh reel, hint TMP; nghe `StateChanged` | `Bind(FishingController)`, `Show(bool)` |
| `Assets/_Playable_/Noel/Scripts/NoelSkinSelector.cs` (từ package, sửa) | `NoelSkinSelector`, `NoelSkin`, `NoelSkinData` | **Luna dropdown "Character Skin"** đổi mesh+material 6 `SkinnedMeshRenderer` của player | `Apply()` |
| `Assets/_Playable_/Noel/Scripts/SnowGridChunk.cs` (từ package, sửa) | `SnowGridChunk` | Dựng mesh lớp tuyết từ `cellHeights` | giữ nguyên |
| `Assets/_Playable_/Noel/Scripts/NoelSnowfall.cs` (từ package, sửa) | `NoelSnowfall` | Tuyết rơi bám player | giữ nguyên |

### Sửa trên file từ package
| File | Sửa |
|---|---|
| `NoelSkinSelector.cs` | enum chỉ còn 3 giá trị theo O3-A (giữ số cũ: `ChristmasElf = 1`, `PufferJacket = 2`, `SantaClaus = 4`), mặc định `SantaClaus`; `_renderers` cache trong Awake từ `_player` serialize (giữ) |
| `SnowGridChunk.cs` | dòng 122 bỏ `SnowGridManager.Unqueue`; dòng 357 `Rebuild()` trực tiếp (O1-A) |
| `NoelSnowfall.cs` | bỏ `SnowQuality`, `SnowTrailPainter`, `FindObjectOfType`, `Camera.main`; `target` bắt buộc serialize, `snowRate` cố định |

### Sửa trong PA_Craft
| File | Sửa |
|---|---|
| `Scripts/Missions/MissionController.cs` | thêm `[SerializeField] Transform _spawnPoint;` — trong `Enter()` nếu khác null gọi `_player.Teleport(_spawnPoint)` (API có sẵn `PlayerController.cs:297`). Null = giữ hành vi cũ |

### Không lấy
`SnowGridManager.cs`, `SnowQuality`, `SnowTrailPainter`, `UIAlignY.cs`, `Gameplay.unity` của package, 3 skin không dùng, mọi file trùng GUID.

## 2. Pattern & OOP/SOLID — cần duyệt
| Quyết định | Vấn đề giải quyết | Thay thế đã xét |
|---|---|---|
| `FishingMissionController` kế thừa `MissionController` (Template Method sẵn có) | Dùng chung luồng Enter/Exit/Pause đã duyệt | Component ngoài manager → phá `MissionManager.TrySelect` |
| `_spawnPoint` ở base | Cả 3 mission cần teleport tới khu riêng | Lặp trong từng subclass |
| `FishingRules` plain C# | Test EditMode công thức không cần scene; tách số liệu khỏi lifecycle | Gộp vào controller → file 1000+ dòng như bản gốc |
| `StateChanged` event (Observer) | HUD phản ứng theo state, controller không biết UI | HUD poll mỗi frame |
| Dùng lại `NoelSkinSelector` (Luna field + `Update` so sánh) | User yêu cầu dropdown Luna; Playground đổi field lúc chạy nên cần kiểm mỗi frame (so sánh 1 enum, chi phí nhỏ) | Class mới `PlayerSkinApplier` → trùng chức năng |
| Không interface mới | Mỗi phần chỉ 1 implementation | — |

## 3. Asset & scene

### 3.1 Lấy asset từ package
1. Tạo project tạm `D:\Source\PA_Craft_NoelScratch` (cùng Unity version), import nguyên `aa.unitypackage`.
2. Mở `Assets/_Playable_/Scenes/Gameplay.unity` của package; gom các root môi trường (`CityMap_Noel`, `CityMap_Noel_Colliders`, 3 snow prefab instance, `[Noel] Christmas Trees`, `[Noel] Roadside Gifts and Snowmen`, `noel_snowfall`) vào prefab `Assets/_Playable_/Noel/Prefabs/NoelEnvironment.prefab` (giữ world transform). Ghi lại RenderSettings (skybox, fog, ambient) và Directional Light của scene package.
3. Export `noel_subset.unitypackage`: `NoelEnvironment.prefab` + dependency **chỉ là file mới** (Map noel/**, Noel/Models/**, Noel/Prefabs/**, Noel/Materials/**, Noel/Textures/T_Snowflake.png, Noel/Scripts/{SnowGridChunk, NoelSnowfall, NoelSkinSelector}.cs, Noel/Skins của 3 skin). Đối chiếu danh sách export với danh sách 143 file mới — không file trùng GUID.
4. Import vào PA_Craft; sửa 3 script (mục 1); Console sạch. Commit asset riêng.

### 3.2 Material
- Map noel `*.mat`, `M_RoadsideChristmas.mat`, 3 skin `.mat`: kiểm shader, đưa về `Playable/Unlit Brightness` (shader map hiện tại) nếu đang khác.
- `M_SnowBlock.mat` / `M_Snowflake.mat`: giữ shader package (O2-A).

### 3.3 Scene `Gameplay.unity` (patch)
| Object | Thay đổi |
|---|---|
| `CityMap_Cropped`, `CityMap_Cropped_Colliders` | **Xoá khỏi scene** (asset giữ trong project, không vào build) |
| `NoelEnvironment` | Thêm instance tại gốc |
| RenderSettings / Directional Light | Áp giá trị từ scene package |
| `noel_snowfall` (trong NoelEnvironment) | `target` = Player |
| `[Noel] Skin Selector` (mới) | `NoelSkinSelector`, `_player` = Player, `_skins` = 3 data |
| Xe, NPC, minimap point, arrow, `Rider Seat` | Raycast kiểm cao độ trên map Noel, dời nếu lệch |
| `Missions/PaintballMission` | `SpawnPoint` ở công viên cạnh cây thông lớn; dời 5 NPC vào công viên |
| `Missions/FishingMission` (mới) | `FishingMissionController`; `Content` gồm bục câu cá (block `spruce_planks`/`stripped_spruce_log` + mặt tuyết `M_SnowBlock` + rương/khối gỗ + `lantern` + `NoelXmasTree_Small`, theo ảnh mẫu) ở mép mesh nước, `FishingController`, `FishingLineView`, cần câu gắn tay phải, `SpawnPoint` trên bục |
| `Missions/CarMission` | `SpawnPoint` + dời xe sang đường shop noel cạnh market |
| `Missions/MotorbikeMission` | Tắt, bỏ khỏi `MissionManager._missions` |
| `MissionManager._missions` | `[Paintball, Fishing, Car]` |
| `Canvas/FishingHUD` (mới) | nút CAST/REEL (`FishingHoldButton`, giống ảnh mẫu), thanh reel, hint TMP (FredokaOne) — ẩn mặc định |
| `Canvas/MissionsJournalPanel` | Image nền = sprite cây thông generate; `Frame` thêm decor (dây đèn trên đỉnh, 2 hộp quà góc dưới, bông tuyết) `raycastTarget=false`; row1 "Fire Paintballs" (`fire_paintball`), row2 "Go Fishing" (`go_fishing` → FishingMission), row3 "Drive Car" (`drive_car_distance`) |

**Vị trí** công viên, đường shop cạnh market, mép nước đặt bục: Codex chụp screenshot ứng viên → **user duyệt trước khi chốt**.

### 3.4 Asset câu cá từ party-craft (`Assets/MiniGames/Fishing/`)
- 1 rod `Models/Rods/Rod_*.fbx`, 3–4 cá `Models/Fish/Fish_0x*.fbx` + albedo, `Prefabs/Gear/FishingBobber.prefab` (dựng lại), `Audio/Fishing_Cast|Bite|ReelTick|Catch_Common.wav`.
- Material làm lại `Playable/Unlit Brightness`. Không lấy `Full_Color.png` 13.3 MB, FX, album, shop, animation Humanoid (dùng xoay pivot cần).
- Logic port: state machine, cast/wait/nibble, công thức fight (tapPower/escapeRate/timeLimit), `FishingHoldButton`. Loại Opsive, HAVIGAME, PrimeTween, Odin, Inventory.

### 3.5 Ảnh generate (cần user duyệt)
- `Assets/_Playable_/UI/MissionsJournal/journal_bg_xmas_tree.png`: cây thông noel trang trí, nền tuyết đêm, phong cách voxel/blocky hợp game, 1024×1024 (hoặc 1024×2048 nếu user muốn portrait).
- Decor: `xmas_lights.png`, `xmas_gift.png`, `xmas_snowflake.png` (nền trong suốt, ≤256 px).
- Dùng `generate_image` (Unity MCP) ở bước implement; gửi preview cho user trước khi gắn vào scene.

## 4. Event flow
```
Awake: NoelSkinSelector.Apply()  (Luna "Character Skin" → mesh/material player; Update đổi lại nếu Playground đổi)
Start → MissionsJournalController.Show()                         (giữ nguyên)
GO row[i] → MissionManager.TrySelect(mission)
   → active.Exit() → mission.Enter()
       → _content on → _player.Teleport(_spawnPoint) [mới] → yaw/camera → OnEntered()
   → GameController.ShowStartTutorial(mission.UsesDrivingTutorial)

Fishing.OnEntered → FishingController.Begin(), FishingHUD.Show(true)
  Pressed  → Charging (0→1 trong 1.2 s)
  Released → LineView.Cast → Waiting (2–4 s, 0–2 Dip)
  hết giờ  → Fighting ("Tap REEL!")
  Tap      → FishingRules.StepFight → ≥1 Catching (cá bay lên đầu 1.5 s) → Ready
                                     → ≤0 / timeout → "Escaped" → Ready
Fishing.OnExited → End(), HUD ẩn, line ẩn ; SetPaused(true) khi journal mở

GameManager timer → GameEnded → CTA                               (không đổi)
```

## 5. Thứ tự task
1. Project tạm + `NoelEnvironment.prefab` + export subset (3.1).
2. Import vào PA_Craft, sửa `SnowGridChunk`, `NoelSnowfall`, `NoelSkinSelector` → compile sạch. Commit asset.
3. Thay map trong scene, áp lighting, snowfall, skin selector; kiểm cao độ object cũ.
4. `MissionController._spawnPoint` → compile.
5. Screenshot ứng viên vị trí (công viên, đường shop/market, mép nước) → **user duyệt**.
6. Paintball + Car: spawn, dời NPC/xe.
7. Fishing code (`FishingState`, `FishingRules`, `FishingLineView`, `FishingController`, `FishingHoldButton`, `FishingHUD`, `FishingMissionController`) → compile + EditMode test.
8. Bục câu cá + FishingMission + HUD; gỡ Motorbike khỏi manager/journal.
9. Generate nền + decor → **user duyệt** → gắn vào journal; đổi label.
10. Verification + đo size + implementation report.

## 6. Verification
**EditMode** (`Assets/_Playable_/Tests/Editor/`)
- `FishingRulesTests`: cast distance trong [min,max]; wait trong khoảng; đủ tap → progress 1; không tap → 0; `PickFishIndex` trong [0,count).
- `NoelMissionsSceneTests`: `MissionManager._missions` = Paintball/Fishing/Car; mỗi mission có `_spawnPoint`; 3 row trỏ đúng mission; Motorbike không trong list; scene không còn `CityMap_Cropped`; `NoelSkinSelector._skins` đủ 3 data, mỗi data đủ 6 mesh + material, `bindposes.Length` = số bone renderer player.

**Play / MCP**
- Console 0 error.
- Đổi `Character Skin` trong Inspector khi Play → skin đổi đúng, animation chạy.
- GO từng row: teleport đúng khu; Paintball 5 NPC hoạt động trong công viên; Car lái trên đường shop; Fishing hold→cast→bite→tap→catch 3 vòng liên tiếp; mở lại journal pause đúng.
- Lớp tuyết phủ hiện đủ (mesh dựng xong), tuyết rơi bám player cả khi lái xe.
- Screenshot journal portrait + landscape.

**Luna**
- Grep file mới/sửa: không `FindObjectOfType`, `GameObject.Find`, `Camera.main`, `Resources.Load`, namespace PrimeTween/Odin/Opsive/HAVIGAME.
- Luna build thành công; Luna Playground hiện dropdown "Character Skin" với 3 lựa chọn; chạy 3 mission + CTA cuối giờ.

**Budget**
- Đo build trước/sau, tổng < 4.5 MB, báo top 10 asset. Vượt → thay `CityMap_Noel_Colliders` MeshCollider bằng box collider, nén texture, bớt decor.

## 7. Cần user duyệt
1. Toàn bộ plan rev 3.
2. O1 (tuyết phủ), O2 (shader tuyết), O3 (3 hay 6 skin), O4 (vị trí row) — mặc định theo khuyến nghị nếu user duyệt không ghi chú.
