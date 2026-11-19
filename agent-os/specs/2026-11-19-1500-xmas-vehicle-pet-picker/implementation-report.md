# Implementation Report — Xmas Vehicle & Pet Picker

Ngày: 2026-11-19 · Thực hiện: Claude (theo yêu cầu user, plan rev 2)

## Đã làm
### Scene `Assets/_Playable_/Scenes/Gameplay.unity`
- Xoá: `Player`, `Missions`, `[Noel] Fishing Sea`, `[Noel] Skin Selector`, `Canvas/GamePanel`, `Canvas/MissionsJournalPanel`, `Canvas/Win_Panel`, `Canvas/Fail_Panel`.
- Giữ: `CityMap_Noel`, `[Noel] Snow City/Buildings/Extra`, `[Noel] Christmas Trees`, `[Noel] Roadside Gifts and Snowmen`, `[Noel] Snowfall` (target → `XmasPicker/LandPoint`), `GameController` (Luna field "Game Brightness").
- Camera: bỏ `CameraController`; cố định tại (-54.5, 19, -92), yaw -68, pitch 17, FOV 60 — nhìn nhà khung gỗ + cây thông Noel lớn + sân quà.
- Camera `clearFlags` Skybox → **SolidColor** (0.56, 0.82, 0.97). Lý do: với Skybox, pixel không được làm mới mỗi frame → nhà trắng bệch + vệt tuyết tích tụ (đã thí nghiệm: tắt tuyết/tắt layer tuyết không hết; đổi SolidColor thì hình đúng).
- `GameManager._endTime` 40 → 30.
- Root mới `XmasPicker`: `XmasPickerFlow`, `DropPresenter`, `AudioSource`, `LandPoint` (-70.0, 13.45, -88.5, yaw 155), `Bicycle_Display`, `Car_Display` (tắt), `FX_XmasLand`, `Decor` (2 cây thông nhỏ + 4 hộp quà nhân bản từ decor `[Noel]`).
- Canvas: `AnyTapCatcher` (full-screen, chỉ bật ở bước pet), `PickerPanel` (SafeArea, CanvasGroup, `ChoiceCardsView`, Title, CardLeft/Right, HandHint). `Button Block` giữ trên cùng.

### Code
- Mới: `Scripts/XmasPicker/{PickerOption, PickerStep, PickerSequence, ChoiceCard, ChoiceCardsView, PingPongHandHint, DropPresenter, XmasPickerFlow}.cs`, `Scripts/Editor/IconSnapshotTool.cs`.
- Sửa: `GameManager.EndGame()` thêm guard `_ended` + `StopAllCoroutines()` (timer và click không gọi store 2 lần).
- Test: thêm `PickerSequenceTests` (5), `XmasPickerSceneTests` (4); **xoá** `NoelMissionsSceneTests` (kiểm mission đã bị xoá theo yêu cầu).

### Asset
- Xe đạp: `bycicle.glb` → Blender 5.2 (headless, `--disable-autoexec`, không mở `.blend`) → join 56 khối thành 1 mesh, pivot đáy giữa → `3D Model/Vehicle/Bicycle/Bicycle.fbx` (640 tris, 37 KB) + `T_Bicycle.png` 64² + `M_Bicycle.mat` (Unlit Brightness).
- Prefab: `Prefabs/XmasPicker/{Bicycle_Display, Car_Display, FX_XmasLand}.prefab` (Car_Display = mesh `Car` của Playable Sports Car).
- Icon: `UI/XmasPicker/icon_{bicycle,car,dog,cat}.png` 256² (chụp model; dog1/cat3 không có texture → tô màu lit khi chụp), `card_bg.png`, `FredokaOne-Regular XmasRed Material.mat`.
- SFX tổng hợp bằng Python (fal chưa cấu hình key): `Sound/Xmas/sfx_xmas_bell|sfx_drop_whoosh|sfx_land_poof|sfx_cat_meow.wav` (mono, Vorbis 0.6). Dùng lại: nhạc Merry Christmas, `engine-sound`, `puppy-barks`, `yeah-kids`.

## Kiểm chứng
- EditMode: 16/16 pass (gồm FishingRulesTests cũ).
- Console: 0 error, 0 warning mới.
- Play mode (MCP): thẻ pop-in + bàn tay qua lại; click xe đạp/siêu xe → rơi + FX + SFX → "CHOOSE YOUR PET"; double-click bị chặn; chạm vùng trống ở bước pet → `AnyTapCatcher` → End Game; raycast vào thẻ trúng thẻ; timer 30 s → End Game đúng 1 lần, click pet sau đó không gọi lại.

## Rev 3 (feedback user 2026-11-19)
- Title font → `Assets/Game/Fonts/FFFFORWA SDF.asset` + `FFFFORWA Atlas Material Outline.mat` (xoá preset FredokaOne XmasRed).
- Xe rơi giữa lòng đường: `LandPoint` (-65.2, 13.45, -89.6). Camera (-51.5, 22, -95.5), yaw ≈ 293.7, pitch ≈ 27.4, FOV 68.
- 2 cây thông decor bị đổ (mất X=270 khi nhân bản) → dựng lại `Euler(270, yaw, 0)`.
- Lá thông xanh tươi: `Noel/Materials/T_SpruceLeaves_Bright.png` (tô lại từ `spruce_leaves_y`) + `M_SpruceLeaves_Bright.mat` (copy `spruce_leaves.mat`), gán cho 19 renderer cây thông (17 `[Noel] Christmas Trees` + 2 decor). Asset gốc không đổi.
- Nút như ảnh mẫu, không hiệu ứng: `card_bg.png` mới (viền trắng, nền chéo vàng→cam), bỏ Shadow, Button transition None; bỏ punch-scale (`ChoiceCard`), bỏ pop-in/out (`ChoiceCardsView` hiện/ẩn tức thì, bỏ field `_content`). Giữ bàn tay hướng dẫn.
- EditMode 16/16 pass; play mode: xe rơi giữa đường, thẻ pet hiện đúng.

## Rev 4
- `Bicycle_Display.prefab`: child xoay Y 90° → đầu xe đạp hướng +Z như ô tô.
- `LandPoint` + 2 display: yaw 180 → xe nằm thẳng theo đường (đường chạy N-S), đầu xe hướng về phía camera.
- Icon xe đạp + ô tô chụp lại cùng góc chéo `Euler(18, 215, 0)`.

## Chưa làm / cần user
- **Luna build + đo dung lượng 4.5 MB: chưa chạy.**
- Ô tô gốc màu trắng/bạc (ảnh mẫu đỏ) — chưa đổi màu.
- Icon chó/mèo là màu đơn sắc (model gốc không texture).
- SFX tổng hợp (đặc biệt tiếng mèo) cần user nghe duyệt.
- `Assets/SVC_Luna.asset`, `luna.json` bị Luna tự sửa khi chạy web server — không phải thay đổi của task.
