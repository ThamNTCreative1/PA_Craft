# Plan — Xmas Vehicle & Pet Picker

Status: **APPROVED rev 2** by user 2026-11-19 — Claude implement theo yêu cầu user.

## Rev 2 — quyết định user (ghi đè các mục bên dưới nếu mâu thuẫn)
- D1-B: làm trực tiếp trên `Assets/_Playable_/Scenes/Gameplay.unity` (không tạo `XmasPicker.unity`).
- D2-A: xoá hẳn object không liên quan trong `Gameplay.unity`.
- D3: Claude tự chọn nhà + góc cam.
- D4-B: xuất xe đạp sang FBX qua Blender (import `.glb`, export `.fbx`; không mở `.blend` gốc).
- D5: Claude tự chọn pet. D6-A: chụp icon từ model. D7-A: generate SFX còn thiếu.
- D8 (mới): bấm thẻ pet → `GameManager.EndGame()` → store ngay (không rơi pet).
- D9: `End Time` = 30 s tính từ Start → EndGame + store (giữ timer có sẵn).
- D10 (mới): ở bước pet, chạm bất kỳ đâu trên màn hình → EndGame + store (full-screen catcher).
- Q1-a: giữ `GameController` (đã kiểm null-safe) → giữ Luna field "Game Brightness".
- Q2: title "CHOOSE YOUR VEHICLE" / "CHOOSE YOUR PET".
- Q3: không logo, không nút Download.
- Bổ sung nhỏ: thêm guard `_ended` trong `GameManager.EndGame()` để timer + click không gọi `GameEnded`/`InstallFullGame` hai lần.

## 0. Nguyên tắc
- Không sửa `Gameplay.unity` (D1-A); làm trên `XmasPicker.unity`. Không chạy Setup/rebuild UI.
- Field mới chỉ `[SerializeField]`, không `[TabGroup]` (user tự sắp tab).
- Input: uGUI `Button` (Luna hỗ trợ), không Input System mới.
- Material: Built-in Unlit `Playable/Unlit Brightness`, không shader mới.
- Outcome: click pet → pet rơi xong → `GameManager.EndGame()` → store. Không tạo Win/Lose/replay.

## 1. Class / file mới
Thư mục: `Assets/_Playable_/Scripts/XmasPicker/`

| File | Class | Trách nhiệm | Public |
|---|---|---|---|
| `PickerOption.cs` | `[Serializable] PickerOption` | Dữ liệu 1 lựa chọn: `Sprite Icon`, `GameObject Display` (object đặt sẵn trong scene, tắt), `AudioClip LandSfx`, `AudioClip VoiceSfx` (tiếng xe/chó/mèo, có thể null) | getter read-only |
| `PickerStep.cs` | `[Serializable] PickerStep` | 1 bước: `string Title` ("CHOOSE YOUR RIDE" / "CHOOSE YOUR PET"), `PickerOption Left`, `Right` | `Get(int side)` |
| `PickerSequence.cs` | `PickerSequence` (plain C#) | Chỉ số bước, chặn chọn 2 lần, báo hoàn tất | `Index`, `Current`, `IsFinished`, `bool TryChoose(int side, out PickerOption)`, `void Advance()` |
| `ChoiceCard.cs` | `ChoiceCard : MonoBehaviour` | 1 thẻ: Button + Image icon, punch-scale khi bấm | `Bind(Sprite)`, `event Action Clicked`, `SetInteractable(bool)` |
| `ChoiceCardsView.cs` | `ChoiceCardsView : MonoBehaviour` | Panel dưới màn hình: title TMP + 2 `ChoiceCard`; pop-in/out bằng DOTween; điều khiển hand hint | `Show(PickerStep)`, `Hide(Action onHidden)`, `event Action<int> Chosen` |
| `PingPongHandHint.cs` | `PingPongHandHint : MonoBehaviour` | Bàn tay (`Assets/Game/Textures/UI/Common/icon_hand.png`) trượt trái↔phải giữa 2 thẻ, nhấn (scale 0.85) ở mỗi đầu, loop; tắt khi thẻ được chọn | `Play(RectTransform a, RectTransform b)`, `Stop()` |
| `DropPresenter.cs` | `DropPresenter : MonoBehaviour` | Bật `Display` ở điểm trên cao, DOTween rơi (`Ease.InQuad`, ~0.7 s) xuống land point, squash-bounce, bật FX tuyết + sparkle, phát SFX bằng `AudioSource` riêng (`PlayOneShot`) | `Drop(PickerOption, Transform landPoint, Action onLanded)` |
| `XmasPickerFlow.cs` | `XmasPickerFlow : MonoBehaviour` | Điều phối: Start → hiện bước 0 → Chosen → ẩn thẻ → Drop → landed → bước kế; hết bước → chờ `_endDelay` → `GameManager.Instance.EndGame()` | không (chỉ serialize `_steps[]`, `_landPoints[]`, `_cards`, `_drop`, `_clickSfx`, `_endDelay`) |
| `Editor/IconSnapshotTool.cs` | `IconSnapshotTool` (Editor-only) | Chụp prefab display ra PNG 256² nền trong suốt cho thẻ | MenuItem |

### Sửa file cũ
Không sửa script cũ. `GameManager.EndGame()` đã public. `AudioManager` giữ nguyên (chỉ phát nhạc nền qua `GameManager`).

> `DropPresenter` dùng `AudioSource` riêng vì `AudioManager.PlaySound` gọi `Stop()` trước khi phát → whoosh/land/voice sẽ cắt nhau.

## 2. Pattern & OOP/SOLID — cần duyệt
| Quyết định | Vấn đề giải quyết | Thay thế đã xét |
|---|---|---|
| `PickerSequence` plain C# | Test EditMode luồng 2 bước, chặn double-click, không cần scene | Gộp vào `XmasPickerFlow` → không test được |
| `PickerStep/PickerOption` serialize (data-driven) | Đổi lựa chọn chỉ trên Inspector; flow không biết "xe"/"pet" | Hard-code 2 bước riêng → lặp code |
| `ChoiceCardsView.Chosen` event (Observer) | View không biết flow/scene | Flow gắn trực tiếp `Button.onClick` của từng thẻ |
| Display object đặt sẵn trong scene (tắt) thay vì Instantiate | 4 object cố định; không Instantiate runtime; user chỉnh tay vị trí/scale dễ | Prefab + Instantiate |
| Không interface / ScriptableObject / Service Locator | Mỗi phần 1 implementation, scene nhỏ | `IDropEffect`, SO config → thừa |

## 3. Asset

### 3.1 Xe đạp (D4-A)
1. Giải nén zip vào thư mục tạm riêng (ngoài project), không chạy gì trong đó.
2. Copy `bycicle.glb` → `Assets/_Playable_/3D Model/Vehicle/Bicycle/bicycle.glb` (texture đã embed).
3. Kiểm tris, kích thước, pivot, trục → ghi vào report.
4. Material `M_Bicycle.mat` (`Playable/Unlit Brightness`).
5. Prefab `Assets/_Playable_/Prefabs/XmasPicker/Bicycle_Display.prefab` (chỉ MeshFilter/MeshRenderer). Nếu Luna không đọc mesh glTFast → chuyển D4-B và báo user.

### 3.2 Ô tô
Copy phần visual (mesh con) của `Playable Sports Car` → `Car_Display.prefab` (bỏ Rigidbody, BoxCollider, CarController, AudioSource).

### 3.3 Pet (D5)
`Dog_Display.prefab` (`Assets/GameAsset/Model/Pets/dog1.fbx`), `Cat_Display.prefab` (`cat3.fbx`); material → Unlit Brightness; idle bob DOTween nếu FBX không có anim. Kiểm tris/texture trước, báo nếu nặng.

### 3.4 Icon thẻ (D6-A)
`IconSnapshotTool` → `Assets/_Playable_/UI/XmasPicker/icon_bicycle.png`, `icon_car.png`, `icon_dog.png`, `icon_cat.png`. Nền thẻ `card_bg.png` bo góc (vàng, viền tuyết/kẹo gậy) — user duyệt.

### 3.5 FX
`Assets/_Playable_/Prefabs/XmasPicker/FX_XmasLand.prefab`: burst bụi tuyết (`T_Snowflake.png`) + sparkle đỏ/xanh/vàng (tham khảo cấu hình `SparkleExplosionYellow`, dùng Built-in particle shader). Không kéo cả Epic Toon FX.

### 3.6 Audio (D7)
| Dùng cho | Clip |
|---|---|
| Nhạc nền | `We Wish You a Merry Christmas Karaoke Instrumental.mp3` → `GameManager._backgroundMusic` |
| Click thẻ | `sfx_xmas_bell.wav` (generate) |
| Rơi | `sfx_drop_whoosh.wav` (generate) |
| Chạm đất | `sfx_land_poof.wav` (generate) + `yeah-kids.mp3` |
| Voice xe đạp | chuông (`sfx_xmas_bell`) |
| Voice siêu xe | `engine-sound.wav` |
| Voice chó | `mixkit-happy-puppy-barks-741.wav` |
| Voice mèo | `sfx_cat_meow.wav` (generate) |

Import: mono, nén chất lượng 50–70, clip < 2 s Decompress On Load.

## 4. Scene `Assets/_Playable_/Scenes/XmasPicker.unity`

| Object | Thay đổi |
|---|---|
| Scene | Duplicate từ `Gameplay.unity` |
| `Player`, `Missions`, `[Noel] Fishing Sea`, `[Noel] Skin Selector` | Xoá (D2-A) |
| `Canvas/GamePanel`, `MissionsJournalPanel`, `Win_Panel`, `Fail_Panel` | Xoá; giữ `Canvas`, `Background`, `Button Block` (GameManager cần) — nếu xoá Win/Fail cần kiểm GameManager null-safe |
| `GameController` | Xem **Q1** |
| `CityMap_Noel`, `[Noel] Snow City/Buildings/Extra`, `[Noel] Christmas Trees`, `[Noel] Roadside Gifts and Snowmen`, `[Noel] Snowfall` | Giữ nguyên; `Snowfall.target` = Camera |
| `Camera_Controller` | Bỏ `CameraController`; Camera cố định theo D3 (portrait, FOV ~60, cao ~3 m, nhìn xuống ~10°, nhà chiếm nửa trên, sân giữa khung) |
| `XmasPicker` (root mới) | `XmasPickerFlow`, `DropPresenter` (+AudioSource), `LandPoint_Vehicle`, `LandPoint_Pet` (cạnh xe), 4 display object tắt, `FX_XmasLand` |
| Decor sân (tuỳ D3) | Thêm cây thông nhỏ/quà/người tuyết từ asset `[Noel]` nếu sân trống |
| `Canvas/PickerPanel` (mới) | Neo đáy, `SafeAreaRectTransform`; Title TMP (FredokaOne, outline); `CardLeft`, `CardRight` (`ChoiceCard`, ~42% bề rộng, vuông bo góc như ảnh mẫu); `Hand` (`PingPongHandHint`, `raycastTarget=false`) |
| `GameManager` | `_backgroundMusic` = nhạc Xmas; `_endTime` giữ fallback (D9-A) |

**Góc cam + nhà:** Codex chụp 2–3 ứng viên → user chọn trước khi chốt.

## 5. Event flow
```
Start
 └ XmasPickerFlow.Start → seq = new PickerSequence(_steps) → cards.Show(step0)
      pop-in, "CHOOSE YOUR RIDE", hand ping-pong Left<->Right

Click Card → ChoiceCard.Clicked → ChoiceCardsView.Chosen(side)
 └ Flow.OnChosen(side)
     if !seq.TryChoose(side, out opt) return     // chặn double-click
     bell SFX, hand.Stop(), cards.Hide()
     drop.Drop(opt, _landPoints[seq.Index], OnLanded)
        Display bật tại land + up*12 → whoosh → rơi 0.7s
        → chạm: squash 0.15s + FX_XmasLand + LandSfx + VoiceSfx → OnLanded
 └ Flow.OnLanded → seq.Advance()
     chưa xong → delay 0.4s → cards.Show(step1 "CHOOSE YOUR PET")
     xong      → delay _endDelay (1.0s) → GameManager.Instance.EndGame()
                   → LifeCycle.GameEnded → InstallFullGame (nếu !Applovin)

Fallback: GameManager timer _endTime → EndGame (không đổi)
```

## 6. Thứ tự task
1. Duplicate scene → `XmasPicker.unity`; xoá object không liên quan; Console sạch.
2. Chụp ứng viên nhà/góc cam → **user chọn (D3)** → set camera, decor sân.
3. Import xe đạp (3.1); tạo 4 display prefab (3.2, 3.3); kiểm material/tris.
4. `PickerOption`, `PickerStep`, `PickerSequence` + EditMode tests → pass.
5. `ChoiceCard`, `ChoiceCardsView`, `PingPongHandHint`, `DropPresenter`, `XmasPickerFlow` → compile sạch.
6. `IconSnapshotTool` → 4 icon; card bg.
7. `FX_XmasLand`; generate SFX → **user nghe duyệt (D7)**; import settings audio.
8. Dựng `Canvas/PickerPanel`, root `XmasPicker`, wiring Inspector.
9. Play-mode toàn luồng; screenshot portrait so với ảnh mẫu.
10. Luna build + đo dung lượng.

## 7. Verification
### EditMode — `Assets/_Playable_/Tests/Editor/PickerSequenceTests.cs`
- 2 bước → `Current` = step0; `TryChoose(0)` true; gọi lại trước `Advance` → false.
- `Advance` sau bước cuối → `IsFinished`; `TryChoose` khi finished → false.
- side ngoài [0,1] → false.

### Play mode (MCP)
- Hand chạy qua lại 2 thẻ; click xe đạp → rơi + FX + SFX; thẻ ẩn khi rơi; double-click không Drop 2 lần.
- Thẻ pet hiện; click mèo → mèo rơi cạnh xe → ~1 s sau `EndGame` (log).
- Lặp với siêu xe + chó.
- Console: 0 error, 0 warning mới.
- Screenshot 1080×1920 và 1080×2340: thẻ không bị safe-area cắt; nhà, sân, tuyết, decor hiển thị; không còn player/NPC/HUD.

### Luna
- Build Luna scene `XmasPicker`; chạy browser + touch emulation; store mở.
- Mesh xe đạp (glTFast) hiển thị đúng.
- Dung lượng build **< 4.5 MB**; liệt kê top contributor (map, snow chunks, audio, texture pet). Vượt → báo user kèm phương án, không tự cắt.

## 8. Câu hỏi mở
- **Q1:** `GameController` set global brightness (Luna field "Game Brightness") nhưng gắn chặt Player/tutorial/riding. (a) giữ với tham chiếu null (cần kiểm null-safe — `Awake` gọi `ShowStartTutorial`, `SetRiding`), (b) chuyển brightness sang `XmasPickerFlow` (lặp logic), (c) bỏ field brightness ở scene này. Khuyến nghị (a) nếu kiểm null-safe ổn, nếu không thì (b).
- **Q2:** Title tiếng Anh "CHOOSE YOUR RIDE" / "CHOOSE YOUR PET" — đúng ý? Hay không cần title (ảnh mẫu không có)?
- **Q3:** Có cần logo "BLOCK CRAFT" + nút Download góc trên như ảnh mẫu không?
