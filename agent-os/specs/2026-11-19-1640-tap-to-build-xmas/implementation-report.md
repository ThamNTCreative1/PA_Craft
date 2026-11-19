# Implementation Report — V89 Tap to build Xmas

Ngày: 2026-11-19 · Thực hiện: Claude theo yêu cầu trực tiếp của user (không qua plan riêng).
Quyết định user: thay nội dung `Gameplay.unity` (không commit màn chọn xe/pet trước); bấm ô vật liệu nào cũng ra store.

## Scene `Assets/_Playable_/Scenes/Gameplay.unity`
- Xoá: `CityMap_Noel`, `[Noel] Snow City/Buildings/Extra`, `[Noel] Christmas Trees`, `[Noel] Roadside Gifts and Snowmen`, `[Noel] Snowfall`, `XmasPicker`, `Canvas/AnyTapCatcher`, `Canvas/PickerPanel`; bỏ `OrientationCameraPose` khỏi Camera (camera giữ lại, cullingMask = Nothing, SolidColor).
- Còn: `Canvas`, `GameManager`, `EventSystem`, `AudioManager`, `GameController`, `Camera_Controller`.
- Canvas: `BG` (bg_cubes, `UICoverScaler`) → `Game` (SafeArea, `TapToBuildFlow`: TopTools, TopCurrency, HouseArea/HousePanel/TapToBuild, Slot1-4/Material1-4 Button, Material1/TapHint {Ring, Hand} `HandTapHint`) → `EndCard` (tắt; `EndCardView`, EndBG `UICoverScaler`, Content SafeArea {Logo, Download}) → `Button Block`.
- `OrientationLayout` trên Canvas: 9 entry anchor dọc/ngang (TopTools, TopCurrency, HouseArea, Slot1-4, Logo, Download). Ô vuông dùng `AspectRatioFitter FitInParent`.

## Code
- Mới: `Scripts/UI/OrientationLayout.cs`, `HandTapHint.cs`, `EndCardView.cs`, `TapToBuildFlow.cs`.
- `GameManager`: thêm `event Action Ended` (bắn 1 lần trong `EndGame`) → end card hiện cả khi bấm lẫn khi hết 30 s.
- Test: thêm `TapToBuildSceneTests` (5); xoá `XmasPickerSceneTests`. EditMode 17/17 pass.
- Script màn chọn xe/pet (`Scripts/XmasPicker/*`, `OrientationCameraPose`) vẫn còn trong project, không còn dùng trong scene.

## Asset `Assets/_Playable_/UI/TapToBuild/`
bg_cubes, endcard_bg (max 1024), house_panel, tap_to_build, top_tools, top_currency, mat_stone/grass/dirt/more, logo, btn_download (từ zip V89), tap_ring.png (tự tạo).

## Hiệu ứng tap (theo Ref_UAC1.mp4)
Tay đặt ở ô đá; chu kỳ ~0.9 s: nhấc lên (0.33 s) → giữ 0.12 s → nhấn xuống 0.12 s → vòng trắng mảnh từ đầu ngón 0.3× → 1.45× ô, mờ dần 0.38 s → nghỉ 0.3 s.

## Chưa làm
- Luna build + đo dung lượng 4.5 MB.
- Sprite bàn tay là `icon_hand.png` có sẵn (pixel), video dùng tay găng trắng cartoon — đổi nếu có sprite đúng.
