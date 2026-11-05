# Shape — Playable Monster Hero (8 hero / 4 lựa chọn)

Spec: `agent-os/specs/2026-11-04-1710-monster-hero-playable/`
Plan status: **PENDING APPROVAL**. Claude chỉ đọc, không sửa file nào.

## 1. Mục tiêu
Đổi scene build `Assets/_Playable_/Scenes/Gameplay.unity` từ luồng journal chọn mission (car/paintball/motorbike) sang một luồng duy nhất:

1. Mở scene → timer `GameManager.EndTime = 30s` bắt đầu ngay (đã tính cả lúc chọn hero và tutorial).
2. Hiện panel "Choose your Hero to save the City" với đúng 4 ô hero, lấy từ 8 hero bằng 4 Luna field cấu hình được và không trùng nhau.
3. Hero được chọn cầm súng paintball hiện có. Camera nhìn về phía monster ngay từ đầu.
4. Tutorial chạy lần lượt: (1) vuốt camera theo hình vô cực → (2) joystick → (3) nút bắn có chữ "Tap to Fire".
5. Monster chỉ bắt đầu tiến tới và tấn công sau khi tutorial bước 3 hoàn tất bằng một viên đạn thật đã bắn ra.
6. Monster có thanh máu trên đầu. Dòng mục tiêu "Defeat the Monster!" nhấp nháy.
7. Ba trigger dẫn tới cùng một endcard hiện có, chỉ hiện một lần: monster chết, player chết, hoặc hết giờ (dù đang chọn hero, đang tutorial hay đang đánh). Sau 1 giây tự gọi CTA/install.
8. Thời tiết cố định qua Luna field: Day / Sunny / Rain / Night. Không có mưa ban đêm, Noel hay tuyết.
9. Map là công viên cùng các đường xung quanh, theo ảnh tham chiếu của user. Phải kiểm tra `CityMap_Cropped` hiện có trước khi tính đến chuyện thay.
10. Xóa UI/model/class không cần, nhưng chỉ theo danh sách đã quét dependency. Giữ pool đạn hiện đang nằm dưới `Missions`.
11. Build Luna đo thực tế phải < 4.5 MB. Không thêm custom shader mới. Mâu thuẫn với shader brightness đang có phải được user chọn cách xử lý.

## 2. Không làm (non-goals)
Không có shop, giá, unlock hay replay. Không tách Win/Lose riêng (đây là luồng EndCard trực tiếp có 3 trigger). Không thay camera hay logic súng. Không lấy nguyên framework weather, HAVIGAME audio, VFX Graph, LensFlare SRP hay wet shader từ party-craft. Không có NightRain, snow/Noel, không tự đổi thời tiết, không mưa ngẫu nhiên. Không thêm thanh máu cho player (user không yêu cầu). Không tạo âm thanh hay art thay thế khi chưa được duyệt.

## 3. Sự thật đã xác minh trong lần đọc này (Read/Grep, chưa chạy Unity)
- F1 `GameManager.cs`:
  - Timer chạy bằng `WaitForSeconds(_endTime)` trong `Start`.
  - Scene đang lưu `_endTime: 40` (code mặc định 30) → phải sửa giá trị scene thành 30.
  - Scene đang lưu `_isApplovin: 1`. `EndGame()` gọi `LifeCycle.GameEnded()`, nhưng chỉ gọi `ShowCta()` khi `!_isApplovin` → với scene hiện tại sẽ không có auto CTA.
  - `OnDestroy` gỡ nhầm listener (`EndGame` thay vì `ShowCta`).
  - Có 2 lời gọi Luna SDK trực tiếp: `Luna.Unity.LifeCycle.GameEnded()` và `Luna.Unity.Playable.InstallFullGame()`.
- F2 Panel kết thúc:
  - `Win_Panel` (con: Aura, Title, Button) và `Fail_Panel ` (con: Title, Button) đều inactive dưới Canvas.
  - Cả hai có `_button: {fileID: 0}` → `Show()` sẽ NullReference.
  - `Show()` gọi `AddListener` mỗi lần được gọi.
  - Scene có text "Collect" và "TRY AGAIN"; chưa xác minh text nào thuộc panel nào.
- F3 `Button Block` (Button full-screen, inactive, là `GameManager._btnBlock`) và `Background` (Image inactive, là `_background`) nằm dưới Canvas.
- F4 Shader brightness:
  - `Assets/GameAsset/Shaders/BrightUnlit.shader` (GUID 369f…) đang được 120 file `.mat` dùng: map (~114), `Player/C2.001.mat`, `Materials/FullColorUnlit.mat`, car/motor.
  - `Assets/SVC_Luna.asset` tham chiếu shader này 13 lần.
  - `GameController` set global `_PlayableBrightnessOverride` qua Luna field "Game Brightness".
- F5 Material của skin NPC (`Skin/Materials/NPC_5.mat`, `NPC_7.mat`, `C_26.mat`, `C_33.mat`…) dùng built-in shader fileID 211, không phải BrightUnlit. Tên shader chính xác cần xác minh trong Unity; có khả năng không nằm trong allowlist.
- F6 Rig:
  - `Player/Character.fbx` là Humanoid. Skeleton gồm `Armature.001/mixamorig:*`, tay chỉ có `RightShoulder/RightArm/RightForeArm`, 6 part `C2_*`.
  - `Skin/NPC_5|7|26|33.fbx` cũng là Humanoid, nhưng skeleton là `rig/mixamorig:Hips…`, tay là `ORG-shoulder/upper_arm/forearm/hand`, 6 part `NPC_x_*`.
  - **Tên xương tay khác nhau.**
- F7 Trên Luna, nhân vật chạy bằng clip Generic đã bake sẵn theo skeleton `Character.fbx` (`Editor/PaintballAnimationBaker.cs` → `Animations/Luna/`).
- F8 `PlayerPaintballController.IsReady` cần ≥ 24 projectile. Scene có hơn 24 instance `PaintballProjectile` (dưới `Missions/.../Projectiles`).
- F9 `PaintballProjectile` chỉ gây damage cho `PaintballNpcController`.
- F10 Dependency:
  - `CameraController` dùng `IDrivableVehicle`.
  - `PlayerController` dùng `DriveHoldButton`, `GameController`, `UltimateJoystick`.
  - `PaintballAnimationBaker` dùng `MotorbikeController`.
  - `DrivingPlayModeChecks` (Editor) dùng nhiều class mission/driving.
- F11 Có sẵn `Prefabs/InfinitySwipe.prefab` (Hand + Image + TMP), đang được dùng trong scene. Có `ScaleHandHint` (pulse bằng DOTween) và `SwipeHandHint`.
- F12 `NamePlayer`, `CameraFieldOfViewAdapter`, `MinimapPointMotion` không được scene hay prefab nào trong `_Playable_` tham chiếu.
- F13 `PlayerPaintballController` tự bật `_hint` khi Equip và tắt khi bắn phát đầu. Scene có `PaintballHUD/Hint` và `Fire Hand`.
- F14 Không thấy định nghĩa `LunaPlaygroundField` trong source (nằm trong package/DLL) → chưa biết field kiểu enum có được hỗ trợ không.
- F15 Camera dùng `m_ClearFlags: 1` (Skybox), material `Polygrade/Toon Skyboxes/Materials/Day01.mat` (built-in skybox shader fileID 103), fog tắt.
- F16 Không có `.asmdef` nào trong `_Playable_` (script nằm trong Assembly-CSharp).
- F17 Working tree đã có sẵn thay đổi ở `Packages/manifest.json`, `packages-lock.json` và file `.idea` bị xóa → không động vào.

## 4. Giả định (cần user xác nhận khi duyệt)
- A1 Map thời tiết: Day = DayMorning, Sunny = DayAfternoon, Rain = DayRain (mưa ban ngày, phủ lên DayMorning), Night = Night.
- A2 Bước camera hoàn tất khi tổng góc nhìn thật (|Δyaw| + |Δpitch| đo từ `CameraController`) ≥ 45°. Giá trị này serialize để chỉnh được. Không bắt người chơi vẽ đúng hình ∞.
- A3 Bước joystick hoàn tất khi move input > 0.1 giữ đủ 0.25 s.
- A4 Monster chết → endcard hiện khi animation chết kết thúc (event `AnimationEvent_DeathEnd`, có watchdog = độ dài clip + 0.1 s). Player chết → endcard hiện ngay, không có animation chết.
- A5 "Defeat the Monster!" hiện từ lúc combat bắt đầu (sau phát bắn đầu), không hiện trong lúc chọn hero hay tutorial.
- A6 Tên hiển thị trên 8 thẻ hero chưa có (ảnh tham chiếu không có trong invocation này) → để trong config, user cung cấp.
- A7 Chỉ số mặc định để tinh chỉnh: HP player 100, monster gây 25 damage/đòn; HP monster 400; damage đạn giữ 10, tốc bắn 0.2 s.

## 5. Quyết định cần user chọn khi duyệt (blocker theo task, không hỏi tương tác)
- **D1 Endcard nào là "endcard hiện có"?** `Win_Panel`, `Fail_Panel` hay `Background + Button Block`. Chưa có ảnh chụp nên không xác minh được nội dung. Đề xuất: dùng **một** panel cho cả 3 trigger, chọn sau bước P5 (chụp ảnh từng panel). Panel không được chọn sẽ bị xóa cùng class của nó. Nếu chữ trên panel mang nghĩa win/lose cụ thể ("TRY AGAIN" gợi ý replay) thì báo lại, không tự sửa art.
- **D2 Mâu thuẫn shader brightness** (chi tiết ở PLAN §6). Đề xuất **Phương án A**.
- **D3 Field Applovin và auto-CTA.** Yêu cầu là auto CTA sau 1 s, trong khi scene đang đặt `_isApplovin = 1` để chặn auto CTA (có thể vì policy của network). Đề xuất: giữ Luna field "Applovin" làm công tắc tuân thủ network; scene đặt mặc định `false` để auto CTA chạy đúng yêu cầu.
- **D4 Nhóm HUD trang trí** (Coin, Chest, HappyCard, ChatButton, Pet/Dance/Setting/Mission Button, ProfileItem, RightTop, MiniMap, FlyButton, Garbage, Home Btn, display name): đề xuất xóa. User cần tick riêng nhóm này.
- **D5 Map:** giữ nguyên `CityMap_Cropped` hay crop lại, quyết định sau P3.
- **D6 Âm thanh còn thiếu:** monster (gầm/đánh/trúng đạn/chết), click chọn hero, vòng lặp tiếng mưa. Lấy nguồn theo P7; không có thì user chọn bỏ hoặc tự cung cấp.
- **R-IP** Model monster lấy từ `minecraft/.../huggy_wuggy.fbx` là nhân vật thuộc IP bên thứ ba. User cần tự xác nhận quyền dùng cho quảng cáo. Code chỉ đặt tên chung là `Monster`.

## 6. Lựa chọn kiến trúc
- **LunaController (Facade) + LunaServices (typed Service Locator tối giản):** bắt buộc theo `luna-controller.md`. Hiện chưa có locator nào. Chỉ `GameManager` gọi tới.
- **GameManager giữ vai trò timer và end-sequence:** một `EndGame()` có guard, hiện endcard, gọi GameEnded, auto CTA sau 1 s. GameManager phát event `Ended` và không biết gì về gameplay.
- **MonsterHeroFlowController (State):** điều phối các phase HeroSelect → Tutorial → Combat → Ended bằng tham chiếu serialize. Là listener duy nhất của `GameManager.Ended`. Dùng event để hướng phụ thuộc đi một chiều: GameManager không phụ thuộc gameplay.
- **CombatTutorialController:** state machine enum nhỏ, tách khỏi gameplay. Chỉ quan sát tín hiệu thật: góc camera, move input, event `ShotFired`.
- **Skin trên skeleton dùng chung (đề xuất, chờ P1):** bind lại mesh của 7 skin vào skeleton `Character.fbx` ở edit-time. Runtime chỉ bật/tắt GameObject. Lý do: Luna chạy clip Generic đã bake theo skeleton player (F7); làm vậy thì clip, socket súng và animation event của súng không đổi, và không tốn thêm dung lượng animation. Nếu P1 không đạt điều kiện thì dừng và báo lại, không tự chọn hướng khác.
- **Health dạng pure C#**, dùng chung cho monster và player.
- **Không tạo interface:** mỗi đầu nhận chỉ có một implementation (projectile → `MonsterController`).
- **Tái dùng nguyên class có sẵn:** `PaintballNpcMotor` (di chuyển monster), `ScaleHandHint` (pulse objective), prefab `InfinitySwipe`, `CameraController`, `TouchController`, `PaintballFireButton`, `AudioManager`, `ResponsiveCanvasScaler`, `SafeAreaRectTransform`.
