# Plan — Monster Hero Playable
```text
Status: APPROVED
Approved by: user (repeated instruction to begin; explicit outcome and shader selections)
Approved scope: Foundation N1/N2/N3/N5/N9/N15, prerequisite checks, T2 outcomes and the user-confirmed proportion-preserving animation bake for NPC_33/NPC_26 via existing PaintballAnimationBaker.cs and enumerated per-hero outputs. Win/Lose/separate timeout, shader B and cache regeneration are confirmed. Runtime hero integration and map operations retain their separate gates. See amendments and latest research.
```


---
# Amendment 01: Monster Hero Playable

```text
Status: PENDING APPROVAL (riêng phần foundation ở mục C được làm theo chỉ thị "bắt đầu" của user)
Amends: plan.md (không thêm file ngoài plan hiện tại)
```

## A. ĐÃ XÁC NHẬN (user chọn rõ)

1. **D1:** Monster chết → `Win_Panel`. Player chết → `Fail_Panel`. Giữ cả `UI/WinPanel.cs` và `UI/FailPanel.cs`, mỗi class chỉ lo hiển thị panel của mình. Bỏ chúng và `UI/AuraUI.cs` khỏi danh sách xóa ở §5.
2. **D2 = B:** Giữ `BrightUnlit.shader` (`Playable/Unlit Brightness`) làm ngoại lệ ghi rõ trong spec. Bỏ N17 và phần bake/đổi ~115 material. `SVC_Luna.asset` giữ biến thể BrightUnlit. Giữ Luna field "Game Brightness".
3. **GameController.cs:** chỉ giữ phần brightness. Phần tutorial/ride/vehicle chỉ được xóa sau khi P8 xác nhận không còn tham chiếu.
4. **Auto CTA:** sau 1.0 s, chạy một lần cho mọi outcome, **không phụ thuộc `_isApplovin`**. Bỏ D3 ở mục auto CTA. Việc có giữ field `_isApplovin` hay không sẽ quyết theo kết quả P8, plan này không tự quyết.
5. **Timer 30 s** bắt đầu từ lúc mở scene (`GameManager.Start`) và tính cả thời gian chọn hero và tutorial.
6. **Không commit, không push.** Ranh giới rollback chuyển từ commit sang bản sao scene và file trước T2, T6, T8.

## B. ĐANG CHỜ USER (không triển khai)

- **Panel khi hết giờ:** PENDING USER ANSWER. Không chọn Win, Fail hay panel khác.
- **Delay animation chết:** chưa được duyệt. Outcome kích hoạt ngay khi `Health.ApplyDamage` trả `true`. Không chờ `AnimationEvent_DeathEnd`, không dùng watchdog delay.
- **Crop map (D5/T7):** Blender MCP đã kết nối được, nhưng chưa có bounds và danh sách thao tác được duyệt. **Không chạy crop.**
- D4, D6 và các điểm dừng P0–P10 vẫn giữ nguyên trạng thái chờ.

## C. FOUNDATION: được tiến hành (không phụ thuộc lựa chọn còn chờ)

T1: N1 `LunaController`, N2 `LunaServices`, N3 `HeroId`, N5 `HeroSlotResolver`, N9 `Health`, N15 `WeatherPreset`, N19 tests (Assembly-CSharp-Editor). Sau đó compile, đọc Console, chạy EditMode V1/V2. Ngoài ra chạy các prerequisite chỉ đọc P0–P10 (không crop, không xóa).

## D. Cập nhật API

**`Manager/GameManager.cs`**
```text
public event Action Ended;            // dùng chung, Flow dọn dẹp (tutorial/monster/input/HUD)
public bool IsEnded { get; }
public void EndWithWin();              // TryBeginEnd() → _winPanel.Show() → AfterEnd()
public void EndWithLose();             // TryBeginEnd() → _failPanel.Show() → AfterEnd()
public void RequestInstall();          // cho phép lặp → LunaServices.Controller.InstallFullGame()
private bool TryBeginEnd();            // guard terminal DUY NHẤT: _ended, dừng timer, phát Ended
private void AfterEnd();               // bật _btnBlock → NotifyGameEnded() → coroutine _autoCtaDelay=1f → InstallFullGame() (1 lần)
private void OnTimerExpired();         // PENDING: chưa có nhánh panel; không triển khai
[SerializeField] WinPanel _winPanel; [SerializeField] FailPanel _failPanel; [SerializeField] float _autoCtaDelay = 1f;
```
Controller chưa đăng ký thì `LogError` và vẫn hiện panel. GameManager không gọi `Luna.Unity.*` trực tiếp.

**`UI/WinPanel.cs`, `UI/FailPanel.cs`:** `Show()` idempotent. `_button` được subscribe một lần. Click gọi `GameManager.RequestInstall()` qua tham chiếu serialize. Button chỉ interactable từ frame sau `Show()`.

**`Flow/MonsterHeroFlowController.cs` (N14):** `MonsterController.Defeated` gọi `EndWithWin()`. `PlayerHealth.Died` gọi `EndWithLose()`. Flow subscribe `Ended` để chạy cleanup như cũ.

**`Luna/LunaController.cs`:** là nơi duy nhất gọi SDK thật (`LifeCycle.GameEnded`, `Playable.InstallFullGame`).

## E. File bị ảnh hưởng

`Manager/GameManager.cs`, `UI/WinPanel.cs`, `UI/FailPanel.cs`, `GameController.cs`, `Flow/MonsterHeroFlowController.cs`, `Luna/LunaController.cs`, scene `City.unity` (giữ cả hai panel; giữ `Background` nếu P8 cho thấy panel nào đó tham chiếu nó). Bỏ khỏi plan: N17 `Editor/UnlitBrightnessBakeWindow.cs`.

## F. Thay đổi Verification

| # | Mới |
|---|---|
| V8 | Monster chết → **chỉ** `Win_Panel`, một lần, không có delay animation |
| V9 | Player chết → **chỉ** `Fail_Panel`, một lần |
| V10 | Timer 30 s tính từ lúc mở scene (kiểm cả ở phase chọn hero và tutorial). Kiểm tra panel khi hết giờ **bị khóa**, chờ user |
| V11 | Monster và player chết cùng frame → chỉ outcome đầu tiên, một panel, một `GameEnded`, một auto install |
| V12 | Auto CTA 1.0 s ± 1 frame cho cả Win và Fail, với `_isApplovin` = true và false |
| V16 | Grep: `Luna.Unity.*` chỉ xuất hiện trong `LunaController.cs` |
| V17 | Allowlist cộng ngoại lệ BrightUnlit. SVC giữ biến thể này |
| V18 | Đo dung lượng có tính shader ngoại lệ |
| V19 | Thêm: P8 sạch trước khi rút gọn `GameController.cs` |
| V20 | `git log` không có commit mới, không có push |

Mục §7: T6 chỉ còn N16, overlay, mưa và âm thanh. T7 bị khóa cho đến khi bounds và danh sách thao tác crop được duyệt.

### Codex — đính chính đường dẫn và phạm vi
Scene đích là `Assets/_Playable_/Scenes/Gameplay.unity`. `City.unity` là scene nguồn, chỉ được đọc. Đường dẫn `City.unity` trong mục E của phụ lục là lỗi ghi đường dẫn, không phải quyền sửa project nguồn.

User instruction to begin applies to the already listed foundation classes N1/N2/N3/N5/N9/N15 and non-mutating prerequisite checks. Timeout-panel routing, crop operations, unresolved rig adaptation and cleanup remain pending; no choices are inferred. Do not add tests requiring a new assembly/package; run the pure-state checks in Unity EditMode through the existing MCP executor first.

## 0. Luồng sự kiện và dependency
```text
Scene load
 ├─ LunaController.Awake → LunaServices.Register(this)
 ├─ GameManager.Start → bắt đầu timer 30s, nhạc nền
 └─ MonsterHeroFlowController.Start  [DefaultExecutionOrder(150), chạy sau Camera(100) và Paintball(120)]
      ├─ HeroRoster.ResolveSlots() → HeroSlotResolver (4 hero duy nhất)
      ├─ tắt PlayerController, TouchController, joystick, nút bắn; HUD ẩn
      ├─ Player quay mặt về monster; CameraController.LookAtPoint(monster.AimPoint)
      └─ HeroSelectionPanel.Show(slots)
HeroSelectionPanel.HeroChosen(id) → Flow:
      PlayerSkinSwitcher.Apply(id) → PlayerPaintballController.Equip() → bật PlayerController/TouchController
      → CombatTutorialController.Begin()
Tutorial: Look ──(góc ≥ ngưỡng)──► Move ──(joystick)──► Fire ──(PlayerPaintballController.ShotFired)──► Completed
Tutorial.Completed → Flow: MonsterController.Activate(playerHealth) ; Objective bật (ScaleHandHint)
PaintballProjectile hit → MonsterController.ReceiveHit(dmg) → Health → WorldHealthBar.SetValue
Monster đòn đánh (OnAnimationHit/watchdog) → PlayerHealth.TakeDamage → PlayerPaintballController.ReceiveHit (feedback)
MonsterController.Defeated | PlayerHealth.Died → Flow → GameManager.EndGame()
GameManager timer hết ─────────────────────────────────────────────► GameManager.EndGame()
GameManager.EndGame() [guard _ended]
   → dừng timer → phát Ended → Flow.OnEnded: Tutorial.Cancel, Panel.Hide, Monster.Freeze,
     PlayerPaintballController.SetPaused(true), PlayerController.IsWorking=false, ẩn HUD/joystick/fire/objective
   → EndCard.Show() (panel chọn ở D1) ; bật Button Block
   → LunaServices.Controller.NotifyGameEnded()   (chỉ 1 lần)
   → sau 1.0s: LunaServices.Controller.InstallFullGame()  (auto, 1 lần; bỏ qua nếu Applovin=true theo D3)
EndCard button / Button Block click → GameManager.RequestInstall() → LunaController.InstallFullGame() (cho phép lặp)
```

## 1. Prerequisite tasks: chỉ kiểm tra, Codex làm, có điều kiện dừng
Mỗi task ghi kết quả vào `research.md` (phần addendum) trước khi làm task phụ thuộc vào nó.

| ID | Kiểm tra | Đầu ra | Điều kiện DỪNG (báo user, không tự làm hướng khác) |
|---|---|---|---|
| P0 | Build Luna từ trạng thái hiện tại để có baseline | Tổng MB + top contributor (mesh/texture/audio/script) | Không build được → báo lỗi |
| P1 | Rig 8 hero: `Character.fbx`, `Skin/NPC_7/33/26/5.fbx`, và `party-craft/.../Skin/Doctor/FireFighter/Police.fbx` (chưa import). Mỗi file kiểm tra: (a) mỗi part (Body/Head/Arms/Legs) có skin cứng vào một xương không; (b) kích thước part và vị trí khớp so với `C2_*` (sai số ≤ 2 cm); (c) mapping part → xương Character (Body→Spine*, Head→Head, Left/Right Arm→Left/RightArm…ForeArm, Leg→UpLeg/Leg); (d) material/texture (kích thước, alpha); (e) tris | Bảng rig/part/tris/texture cho 8 hero | Có skin dùng weight blend nhiều xương, lệch tỉ lệ vượt sai số, tay không map được tới socket súng, hoặc 3 FBX party-craft cần dependency khác ngoài FBX + texture |
| P2 | Monster `minecraft/.../huggy_wuggy.fbx`: kiểu rig (Generic/Humanoid), clip death/idle/move/run/attack (độ dài, loop), chữ ký các event `AnimationEvent_DeathEnd` / `OnAnimationEvent` / `OnAnimationHit` (tham số và thời điểm), material/texture, tris, đường dẫn xương đầu | Bảng rig/clip/event | Rig Humanoid mà muốn chạy được trên Luna phải bake; event có tham số kiểu Luna không hỗ trợ; dependency ngoài FBX + texture |
| P3 | Map: chụp top-down `CityMap_Cropped` trong scene, đặt cạnh ảnh công viên user cung cấp; đếm tris thật của Base_Map/Grass/Road/Water; liệt kê renderer → material; kiểm tra phạm vi `Map Boundary` | Ảnh so sánh + bảng tris/material | Luôn dừng để user chọn D5. Nếu crop lại: user đánh dấu bounds trên ảnh; Claude lập phụ lục Blender trước khi Codex làm |
| P4 | Weather nguồn (`party-craft WeatherController.cs` bản mới nhất, `WeatherController.prefab`, override trong `City.unity`): trích màu sky/ambient, cường độ light và `rain_DayLightReducePercent` cho DayMorning / DayAfternoon / Night / DayRain; đường dẫn clip mưa; tham số hạt mưa | Bảng giá trị (có ghi nguồn: prefab hay scene override) | Giá trị prefab và scene mâu thuẫn mà không biết cái nào được dùng thật |
| P5 | Endcard: chụp ảnh `Win_Panel`, `Fail_Panel`, `Background` khi bật lên ở 1920×1080 và 1080×1920; ghi text/sprite từng con | Ảnh + bảng nội dung | Luôn dừng để user chọn D1 |
| P6 | Luna Playground: xác minh từ package/docs đã cài rằng `LunaPlaygroundField` hỗ trợ enum | Có/không, kèm nguồn | Không hỗ trợ → dùng int 0–7 / 0–3, ghi mapping ngay trong tên field (cách này đã nằm trong plan, không cần duyệt lại) |
| P7 | Audio: liệt kê clip có sẵn trong target (`AudioManager`, nhạc `0cc907…`, `_shotSound`), trong thư mục monster nguồn và nguồn tiếng mưa party-craft | Danh sách clip + kích thước + nguồn | Thiếu clip → user quyết định D6 |
| P8 | Quét dependency trước khi xóa: toàn bộ Assets (scene/prefab/asset/code) cho từng mục ở §5 | Bảng mục → các tham chiếu | Một mục "xóa" còn bị đối tượng giữ lại tham chiếu → báo, không xóa |
| P9 | Shader audit: tên chính xác của built-in fileID 211 và 103; shader của particle prefab Toxic*/flash; shader của font TMP | Bảng shader → allowlist | Có shader ngoài allowlist mà D2 chưa bao phủ |
| P10 | `Assets/Editor/ModelToPNG_*`: có editor tool render model ra PNG không | Có/không, kèm cách dùng | Không có tool → portrait thành asset chưa giải quyết, user cung cấp |

## 2. Class/file mới (`Assets/_Playable_/Scripts/…`, namespace `Playable`)
Field chỉ khai báo `[SerializeField]`; user tự sắp `[TabGroup]`.

| # | File | Trách nhiệm | API / state | Dependency (cách cấp) | Lifecycle / event |
|---|---|---|---|---|---|
| N1 | `Luna/LunaController.cs` | Facade Luna SDK | `NotifyGameEnded()` → `Luna.Unity.LifeCycle.GameEnded()`, có guard chỉ 1 lần. `InstallFullGame()` → `Luna.Unity.Playable.InstallFullGame()`, cho phép lặp | Không có | `Awake`: Register. `OnDestroy`: Unregister nếu đang là instance được giữ. Không có timer, không có UI |
| N2 | `Luna/LunaServices.cs` | Typed locator tĩnh | `static LunaController Controller {get;}`, `Register(c)`, `Unregister(c)`. Đăng ký trùng → `Debug.LogError` và giữ instance đầu | — | Static state duy nhất được phép |
| N3 | `Heroes/HeroId.cs` | enum `Default, Npc7, Npc33, Npc26, Npc5, Doctor, FireFighter, Police` | — | — | — |
| N4 | `Heroes/HeroRoster.cs` | Data/config của 8 hero và 4 slot Luna | `[Serializable] HeroEntry{HeroId id; string displayName; Sprite portrait; GameObject skinRoot}` ×8. 4 field `[LunaPlaygroundField("Hero Slot 1..4")]` (enum hoặc int theo P6), mặc định Default/Npc7/Doctor/Police. `HeroId[] ResolveSlots()`, `HeroEntry Get(HeroId)` | Serialize | `Awake` validate: đủ 8 entry, id không trùng, `skinRoot` không null → nếu sai thì LogError |
| N5 | `Heroes/HeroSlotResolver.cs` | Pure static: luôn trả đúng 4 id hợp lệ, không trùng | `Resolve(int[] requested, int heroCount)`: giá trị ngoài khoảng hoặc trùng sẽ bị thay bằng hero chưa dùng đầu tiên theo thứ tự enum; trả về danh sách thay thế để log warning | — | EditMode test |
| N6 | `Heroes/HeroCardView.cs` | View của một thẻ hero | `Bind(HeroEntry)`, `event Action<HeroCardView> Clicked`, `HeroId Id` | Button, Image, TMP (serialize) | Subscribe trong `OnEnable`, gỡ trong `OnDisable` |
| N7 | `Heroes/HeroSelectionPanel.cs` | View panel chọn hero | `Show(HeroEntry[4])`, `Hide()`, `event Action<HeroId> HeroChosen`. Chỉ nhận click đầu tiên (guard). Bố cục: `GridLayoutGroup` 4 cột khi màn ngang, 2×2 khi màn dọc (`OnRectTransformDimensionsChange`) | 4 `HeroCardView`, title TMP, GridLayoutGroup | Subscribe/gỡ subscribe thẻ |
| N8 | `Heroes/PlayerSkinSwitcher.cs` | Adapter đổi skin trên scene | `Apply(HeroId)`: bật đúng `skinRoot` được chọn, tắt 7 cái còn lại | `HeroRoster` | Không có Find. Chỉ đổi active |
| N9 | `Combat/Health.cs` | Pure C# | `Health(float max)`, `Current`, `Normalized`, `IsDead`, `bool ApplyDamage(float)` (true đúng một lần khi chuyển sang chết; damage ≤ 0 hoặc đã chết thì bỏ qua) | — | EditMode test |
| N10 | `Combat/PlayerHealth.cs` | Adapter máu player | `TakeDamage(float)`, `event Action Died`, `SetInvulnerable(bool)` | `PlayerPaintballController` (để gọi `ReceiveHit` cho feedback) | Died phát một lần |
| N11 | `Monster/MonsterController.cs` | AI và combat của monster | State `Dormant → Approach → Attack → Dying → Frozen`. `Activate(PlayerHealth)`, `ReceiveHit(float)`, `Freeze()`, `Transform AimPoint`, `event Action Defeated`. Receiver animation event: `OnAnimationHit()`, `AnimationEvent_DeathEnd()` (chữ ký theo P2). Animation qua `Animator.Play("Idle"/"Run"/"Attack"/"Death")`, không dùng `Animator.parameters`. Có watchdog cho thời điểm đánh trúng và kết thúc animation chết | `PaintballNpcMotor`, `Animator`, `WorldHealthBar`, `Collider`, AudioSource riêng (serialize) | Component nằm cùng GameObject với Animator để nhận event. Lúc Dormant vẫn nhận damage (phát bắn đầu kích hoạt monster trước khi đạn tới) |
| N12 | `UI/WorldHealthBar.cs` | View thanh máu trên đầu | `SetValue(float normalized)`, billboard trong `LateUpdate` theo Camera serialize | Image (Filled), Camera | World-space Canvas. `raycastTarget` tắt |
| N13 | `Tutorial/CombatTutorialController.cs` | Chạy tutorial theo thứ tự | enum `Inactive, Look, Move, Fire, Completed, Cancelled`. `Begin()`, `Cancel()`, `event Action Completed`. Mỗi bước bật cue và control của bước đó (§4) | CameraController, PlayerController, PlayerPaintballController, các GameObject cue/control | Subscribe `ShotFired` lúc vào Fire, gỡ khi Completed/Cancel/OnDisable |
| N14 | `Flow/MonsterHeroFlowController.cs` | Chạy luồng scenario | Phase `HeroSelect, Tutorial, Combat, Ended` (chuyển phase tường minh) | HeroRoster, HeroSelectionPanel, PlayerSkinSwitcher, PlayerController, TouchController, PlayerPaintballController, CameraController, CombatTutorialController, MonsterController, PlayerHealth, GameManager, objective GameObject | `[DefaultExecutionOrder(150)]`. Subscribe trong `OnEnable`, gỡ trong `OnDisable` |
| N15 | `Weather/WeatherPreset.cs` | enum `Day, Sunny, Rain, Night` | — | — | — |
| N16 | `Weather/WeatherPresetController.cs` | Áp preset cố định một lần | `[LunaPlaygroundField("Weather")]`. `[Serializable] WeatherPresetData{Color skyColor; Color overlayColor; bool rain}` ×4 (giá trị từ P4). `Start`: đặt camera clear Solid Color + `backgroundColor`, `overlayImage.color`, bật/tắt rain ParticleSystem và rain AudioSource | Camera, Image overlay, ParticleSystem, AudioSource | Không có coroutine hay chu kỳ thời gian. Night không bao giờ bật rain (enum không có NightRain) |
| N17 (chỉ khi chọn D2-A) | `Editor/UnlitBrightnessBakeWindow.cs` | Công cụ Editor chạy một lần: bake đường cong `c + b·c·(1−c)` với b = 0.6 vào texture của material trong build path | — | — | Chỉ Editor, không vào build |
| N18 | `Animations/Monster/Monster.controller` (asset) | 4 state Idle/Run/Attack/Death, không có parameter | — | — | — |
| N19 | `Tests/Editor/HeroSlotResolverTests.cs`, `HealthTests.cs` (+ asmdef nếu cần) | EditMode test | Vì F16, cần thêm asmdef `Playable.Runtime` cho `_Playable_/Scripts`, hoặc đặt test trong `Assets/Editor` thuộc Assembly-CSharp-Editor. **Đề xuất: test trong Assembly-CSharp-Editor** để không phải đổi assembly | — | — |

Lý do dùng pattern: Facade + Service Locator (N1/N2) là bắt buộc theo standard. State (N11/N13/N14) vì có các phase hữu hạn với chuyển tiếp tường minh. Observer chỉ dùng ở `GameManager.Ended`, `Defeated`, `Died`, `HeroChosen`, `Completed`, `ShotFired`, đều có subscriber rõ ràng. Không dùng Factory, Pool mới hay Strategy. Pool đạn hiện có được giữ nguyên.

## 3. Class sửa
| File | Thay đổi |
|---|---|
| `Manager/GameManager.cs` | Bỏ `_totalEvent`, `CountEvent`, `_winPanel`, `_failPanel`, `ShowWinPanel`, `ShowFailPanel`, lời gọi Luna trực tiếp. Thêm `[SerializeField]` cho panel endcard (kiểu theo D1), `_autoCtaDelay = 1f`, `event Action Ended`, `bool IsEnded`, `EndGame()` có guard (dừng coroutine timer → Ended → `EndCard.Show()` → bật `_btnBlock` → `NotifyGameEnded` → coroutine 1 s → `InstallFullGame`, một lần, theo D3), `RequestInstall()`. Sửa lỗi `OnDestroy` gỡ nhầm listener. Giữ `EndTime`, nhạc nền, Luna field. Controller chưa đăng ký → LogError và vẫn hiện endcard |
| `UI/WinPanel.cs` **hoặc** `UI/FailPanel.cs` (theo D1) | Gán `_button`. Subscribe một lần (Awake/OnEnable). `Show()` không tạo tác dụng phụ khi gọi lại. Click → `GameManager.RequestInstall()` qua tham chiếu serialize (bỏ `GameManager.Instance` nếu được duyệt; nếu giữ Instance thì ghi lý do). Button chỉ interactable từ frame sau `Show()` (guard pointer-release) |
| `Paintball/PlayerPaintballController.cs` | Thêm `event Action ShotFired`, phát trong `FireProjectile()` sau `Launch`. Không đổi logic súng. Trong scene, bỏ gán `_hint` để tutorial quản lý cue |
| `Paintball/PaintballProjectile.cs` | Thay `GetComponentInParent<PaintballNpcController>()` bằng `GetComponentInParent<MonsterController>()` → `ReceiveHit(_damage)` |
| `Controller/PlayerController.cs` | Xóa phần lái xe: field `_forwardButton/_reverseButton/_leftButton/_rightButton`, `_gameController`, `ReadDriveInput`, `ReadSteerInput`, `SetDrivingControls`, `BeginDrive/EndDrive/BeginRide/EndRide`, `_originalParent/_onFootController/_originalScale`. Giữ `IsRiding` dạng hằng false hoặc bỏ cùng các chỗ dùng (`Velocity`, `SetOnFootAnimator`), Codex chọn cách ít diff nhất và ghi lại. Giữ jump (null-safe) |
| `Editor/PaintballAnimationBaker.cs` | Bỏ đoạn `MotorbikeController` (dòng 196 và khối liên quan) |
| `GameController.cs` | D2-A → **xóa file**. D2-B → chỉ giữ phần brightness, bỏ tutorial/ride |
| `CameraController.cs`, `TouchController.cs`, `PaintballFireButton.cs`, `PaintballNpcMotor.cs`, `AudioManager.cs` | **Không sửa** |

## 4. Trạng thái input/tutorial
| Phase/Bước | Control đang bật | Cue | Điều kiện hoàn tất | Input sai / không thao tác |
|---|---|---|---|---|
| HeroSelect | Chỉ panel (UI). PlayerController tắt, TouchController GameObject tắt, joystick, fire và HUD ẩn | Title + 4 thẻ | Click thẻ đầu tiên | Click lặp bị bỏ qua. Hết giờ → endcard |
| Look | TouchController bật. Joystick, fire ẩn | Instance `InfinitySwipe` hiện có ("Swipe To Move Camera", xác minh ở P8) | Tổng góc ≥ `_lookThresholdDegrees` (45). Recoil không được tính | Cue lặp. Không tự hoàn tất |
| Move | Thêm joystick | "Swipe To Move" hiện có | Move input > 0.1 giữ đủ 0.25 s | Như trên |
| Fire | Thêm `PaintballFireButton` | `PaintballHUD/Hint` + `Fire Hand`, TMP = "Tap to Fire" | `ShotFired` (đạn thật đã bắn). Bấm trong lúc animation Equip đang chạy thì không bắn → cue vẫn giữ | Như trên |
| Combat | Toàn bộ control | Objective "Defeat the Monster!" (TMP + `ScaleHandHint`) | Monster chết / player chết / hết giờ | — |
| Ended | Tắt hết. Chỉ endcard + Button Block | Endcard | — | Auto CTA sau 1 s |

Ghi chú: Touch và mouse đều đi qua EventSystem/`StandaloneInputModule` hiện có; không thêm `Input.*` thô. Multi-touch theo hành vi hiện có: TouchController và FireButton theo dõi pointer id riêng.

## 5. Scene / prefab / model / material (Codex làm sau khi được duyệt; mục xóa phải qua P8)
**Giữ / đổi parent:**
- `Missions/.../Projectiles` (toàn bộ instance) → đổi parent thành root `Projectiles` **trước** khi xóa `Missions`; giữ nguyên mảng `_projectiles` của PlayerPaintballController.
- Giữ: Camera_Controller, Player, PaintballWeaponSocket, EventSystem, AudioManager (Music/Sound), GameManager, Map Boundary, CityMap_Cropped (theo D5), PaintballHUD (Crosshair, Ammo, Fire, Hint, Fire Hand, Hit Feedback), UIPlayer/joystick, Touch, `Swipe To Move`, `Swipe To Move Camera`, panel endcard (D1), Button Block.

**Thêm:**
- `Flow` (N14), `LunaController` (N1), `Weather` (N16 + Canvas overlay Screen Space Overlay `sortingOrder` thấp hơn HUD, Image `UI/Default` full-screen, raycast tắt; rain ParticleSystem gắn theo camera; AudioSource mưa).
- `Monster` (prefab mới `Assets/_Playable_/Prefabs/Monster/Monster.prefab`: FBX root + Animator(N18) + Rigidbody kinematic + CapsuleCollider + PaintballNpcMotor + MonsterController + AudioSource + world-space Canvas HealthBar ở `HealthBarAnchor`).
- `Canvas/HeroSelectionPanel` (N6/N7) và text objective.
- Dưới Player: 7 GameObject skin bind vào skeleton chung (N8, theo P1).

**Import asset:**
- Doctor/FireFighter/Police FBX + texture → `Assets/GameAsset/Model/Character/Skin/` (cùng tên). Monster FBX + texture → `Assets/GameAsset/Model/Monster/` (đường dẫn đề xuất).
- Mỗi model: tắt import material (dùng material Unlit được duyệt), Read/Write tắt, mesh compression ở mức Medium, chỉ giữ các clip monster cần. Clip `OnAnimationEvent` bỏ khỏi danh sách event lúc import (giữ `OnAnimationHit` và `AnimationEvent_DeathEnd`).
- Material: skin dùng `Unlit/Texture` hoặc `Unlit/Transparent Cutout` (theo alpha ở P1/P9), một material cho mỗi skin.
- Texture: kích thước gốc nếu ≤ 128 px, nén. Portrait: một atlas ≤ 1024×512 nén (theo P10).

**Xóa trong scene (nhóm D1-func):**
- `MissionsJournalPanel`, `Missions` (CarMission/Playable Sports Car, MotorbikeMission, PaintballMission/NPCs/Routes) sau khi đã đổi parent pool đạn.
- Toàn bộ tutorial lái xe, Tap To Drive Canvas ×2, Car/Motorbike Guide Arrow, Car/Motorbike Center Hint, `UI motobike`, `[Button] Left/Right/Forward/Back/Exit`, Btn Jump, `Paintball Movement Tutorial`, `GameController` (khi chọn D2-A), panel endcard không được chọn ở D1 (và Background nếu không được chọn).
- Nhóm D4 nếu user tick.

**Xóa class** (thứ tự: scene trước, sau đó code, rồi compile):
- `Missions/MissionManager.cs`, `MissionController.cs`, `CarMissionController.cs`, `MotorbikeMissionController.cs`, `PaintballMissionController.cs`
- `UI/MissionsJournal/MissionsJournalController.cs`, `MissionRowView.cs`, `JournalHandSequencer.cs`
- `Controller/CarController.cs`, `MotorbikeController.cs`, `PlayerAction.cs`, `DriveHoldButton.cs`, `NamePlayer.cs`
- `Arrow.cs`, `CameraFieldOfViewAdapter.cs`, `UI/CarDriveTutorial.cs`, `UI/MinimapPointMotion.cs`, `UI/PaintballMovementTutorial.cs`, `Paintball/PaintballNpcController.cs`, `UI/FailPanel.cs` hoặc `UI/WinPanel.cs` (D1), `GameController.cs` (D2-A), `UI/AuraUI.cs` (chỉ khi D1 không chọn Win_Panel)
- `Editor/DrivingPlayModeChecks.cs`
- **Giữ có lý do:** `IDrivableVehicle.cs` (CameraController phụ thuộc, không sửa camera), `PaintballNpcMotor.cs` (monster dùng lại).

**Xóa asset bị bỏ rơi** (chỉ khi P8 xác nhận không còn tham chiếu): `Prefabs/Paintball/Npc.prefab`, `Animations/Paintball/NpcPaintball.controller`, `Animations/Luna/NpcPaintball.controller`, `Animations/MotorbikeRider.controller`, `Animations/Luna/MotorbikeRider.controller`. Không xóa thư mục model nguồn trong `GameAsset` (không vào build khi đã hết tham chiếu).

## 6. D2 — Shader brightness: phương án và chi phí
- **Phương án A (đề xuất):**
  - Chuyển mọi material trong build path đang dùng `Playable/Unlit Brightness` sang `Unlit/Texture` (opaque) hoặc `Unlit/Transparent Cutout` (material có `_ALPHATEST_ON`: lá, cỏ, kính, `C2.001`). Dùng `Editor/MaterialReplacerWindow.cs` có sẵn.
  - Bake đường cong 0.6 vào texture tương ứng bằng N17 để giữ nhìn như hiện tại.
  - Brightness/thời tiết lúc runtime chỉ còn: overlay `Graphic.color` (làm tối) + màu nền camera.
  - Cập nhật `SVC_Luna.asset`: bỏ biến thể BrightUnlit, thêm biến thể Unlit đang dùng.
  - Xóa `GameController.cs` và Luna field "Game Brightness".
  - Không xóa file `BrightUnlit.shader` vì material ngoài build vẫn dùng; chỉ xác minh nó vắng mặt trong build report.
  - Camera Skybox `Day01.mat` (fileID 103, ngoài allowlist) → Solid Color theo preset.
  - Chi phí: khoảng 115 material đổi shader. Bake N texture của map (kích thước texture không đổi → dung lượng xấp xỉ như cũ). Bỏ một custom shader và các biến thể fog/alpha. Bỏ texture skybox (giảm byte). Overlay thêm 1 lớp overdraw full-screen, không có texture.
  - Rủi ro: lệch màu nhẹ so với hiện tại; mất khả năng *làm sáng* lúc runtime qua Luna.
- **Phương án B:** giữ BrightUnlit như một ngoại lệ được ghi rõ trong spec. Gần như không tốn công, giữ Luna field "Game Brightness". Vi phạm standard `materials-built-in-unlit`, cần user phê duyệt ngoại lệ rõ ràng.
- Task T6 bị khóa cho tới khi user chọn A hoặc B.

## 7. Thứ tự task (sau khi APPROVED)
1. **T0** Chạy P0–P10 → dừng ở các điểm của D1/D5 (và những điểm dừng khác nếu có) → user xác nhận.
2. **T1** Thêm N1, N2, N3, N5, N9, N15 (logic thuần + facade) → compile → đọc Console → EditMode test N5/N9.
3. **T2** Sửa GameManager và panel endcard theo D1; scene: `_endTime = 30`, `_isApplovin` theo D3, gán `_button`, thêm GameObject LunaController.
4. **T3** Sửa PlayerPaintballController (`ShotFired`) và PaintballProjectile; thêm N10, N11, N12, N18; import monster theo P2; tạo Monster.prefab và đặt vào scene ở khoảng cách tinh chỉnh được trước mặt player.
5. **T4** Skin: import 3 FBX, bind lại 7 skin vào skeleton chung (theo P1), tạo material Unlit, thêm N4, N8, portrait (theo P10).
6. **T5** UI: N6, N7, panel chọn hero, objective, text "Tap to Fire", bố cục 2 chiều màn hình; N13, N14; nối các tham chiếu.
7. **T6** Theo D2: bake/chuyển material + SVC + Solid Color camera; N16 + overlay + mưa + âm thanh (theo P4/P7).
8. **T7** Map theo D5 (nếu crop lại thì cần phụ lục Blender được duyệt riêng).
9. **T8** Đổi parent pool đạn → xóa scene object → sửa PlayerController/Baker → xóa class/asset theo §5 → compile → Console.
10. **T9** Verification §8 + Luna build + đo dung lượng → `implementation-report.md`.

Ranh giới rollback: commit riêng cho từng task (T2, T3, T4, T6, T8). Trước T6 và T8 lưu bản sao scene.

## 8. Verification (ánh xạ tới acceptance criteria)
| # | Tiêu chí | Cách kiểm |
|---|---|---|
| V1 | Compile sạch, Console không có lỗi mới | Unity sau mỗi task |
| V2 | HeroSlotResolver xử lý slot trùng/ngoài khoảng/hợp lệ, luôn ra 4 hero duy nhất; Health chỉ chết một lần | EditMode |
| V3 | 8 hero × skin đúng, animation idle/run/equip/fire khớp, súng nằm đúng tay | PlayMode: lần lượt từng hero, cả trên Luna build |
| V4 | 4 slot Luna, gồm cả cấu hình trùng/sai | Playground/Editor với 3 bộ cấu hình |
| V5 | Camera nhìn monster ngay frame đầu | PlayMode, chụp ảnh |
| V6 | Tutorial đúng thứ tự; tap ngẫu nhiên hay recoil không làm qua bước; bấm nhanh hoặc multi-touch không kẹt | PlayMode mouse + touch simulation + thiết bị Luna |
| V7 | Monster đứng yên trước phát bắn đầu; kích hoạt đúng ở `ShotFired` | PlayMode |
| V8 | Đạn trúng → thanh máu giảm; monster chết → endcard một lần | PlayMode |
| V9 | Player chết → endcard một lần | PlayMode (cho monster damage cao) |
| V10 | Hết giờ ở cả 3 phase (chọn hero / tutorial / combat) → endcard một lần, tutorial bị hủy, không còn input | PlayMode với EndTime tạm 5 s; khôi phục 30 s và kiểm lại giá trị scene |
| V11 | Trigger đồng thời (monster chết cùng lúc hết giờ) → chỉ một endcard, một `GameEnded`, một auto install | PlayMode + log đếm lời gọi LunaController |
| V12 | Auto CTA đúng 1.0 s ± 1 frame; click endcard hoặc Button Block → install; pointer-release của phát bắn cuối không kích hoạt CTA | PlayMode + Luna build |
| V13 | 1920×1080 và 1080×1920: panel hero, HUD, cue, endcard đọc rõ, nằm trong safe area | Game view + Luna preview, chụp ảnh |
| V14 | Weather 4 preset: đúng màu, mưa chỉ có ở Rain, Night không mưa, không có snow/Noel | Đổi Luna field |
| V15 | Nhạc và SFX phát đúng; dừng khi kết thúc nếu được duyệt | PlayMode + Luna |
| V16 | Không còn `FindObjectOfType`/`GameObject.Find`/tag lookup/`UnityEngine.InputSystem` trong code build path; không còn lời gọi `Luna.Unity.*` ngoài LunaController | Grep |
| V17 | Shader trong build đều thuộc allowlist (hoặc ngoại lệ D2-B); SVC đã cập nhật | Build report + grep material |
| V18 | Luna build < 4.5 MB (mục tiêu ≤ 3.8 MB); bảng ledger asset | Build Luna thật, so với P0 |
| V19 | Không còn tham chiếu thiếu sau khi xóa (missing script/ref) | `MissingScriptCleanerWindow` ở chế độ chỉ báo cáo + Console |

Không có mục nào ở trên đã được chạy. Mọi kết quả phải được ghi trong `implementation-report.md` với bằng chứng thật.

---
## User decision update — timeout endcard
User settled the pending timeout requirement: at 30 seconds without a combat outcome, show a third, separate endcard. The user will arrange its UI later; only an empty container/reference is required. Do not reuse Win_Panel/Fail_Panel for timeout and do not invent art or text. Win remains monster defeat; Lose remains player death. The agreed one-second automatic CTA follows all three endcards. This supersedes the PENDING USER ANSWER label for timeout in Amendment 01; the SDK-error stop and remaining technical plan boundaries still apply. No additional implementation was performed in this update.


---
# Amendment 02: Kết quả trận, Timeout Panel, Auto CTA

**Trạng thái:** Các mục dưới đây đã được user **quyết định trực tiếp**. Không cần duyệt lại. Prerequisite map/rig vẫn tách riêng, không thuộc amendment này. Áp dụng trong phạm vi N1–N16 hiện có. Không thêm script, architecture hay interface mới. Không commit.

## Quyết định đã chốt
- Monster chết → `Win_Panel`.
- Player chết → `Fail_Panel`.
- Hết 30s tính từ lúc mở scene mà chưa có kết quả → panel timeout thứ ba, để trống, user tự layout sau. Áp dụng cả khi đang ở selection/tutorial.
- Sau **mọi** outcome, tự gọi CTA/install sau 1s. Người chơi có thể click để install sớm hơn.
- Chỉ có một lần auto call và một lần `GameEnded`.
- Bỏ gating Applovin auto cũ.
- Giữ nguyên shader B.

## `Manager/GameManager.cs`
Fields, chỉ dùng `[SerializeField]` theo quy ước, user tự xếp tab:
- `[SerializeField] float _endTime = 30f;`
- `[SerializeField] float _autoInstallDelay = 1f;`
- `[SerializeField] WinPanel _winPanel;`
- `[SerializeField] FailPanel _failPanel;`
- `[SerializeField] GameObject _timeoutPanel;`

State và API:
- `private bool _isEnded; private float _elapsed;`
- `public enum GameOutcome { Win, Lose, Timeout }` (nested, không tạo file mới)
- `public event Action<GameOutcome> Ended;`
- `public bool IsEnded => _isEnded;`
- `public void EndWithWin()`, `public void EndWithLose()`, `public void EndWithTimeout()`
- `private bool TryEnd(GameOutcome o)`:
  1. Nếu `_isEnded` thì return false; nếu chưa thì set `_isEnded = true`.
  2. Gọi `LunaServices.Controller?.NotifyGameEnded()` đúng một lần.
  3. Bật panel tương ứng.
  4. Phát `Ended?.Invoke(o)`.
  5. `StartCoroutine(AutoInstall())`.
- `private IEnumerator AutoInstall()`: `yield return new WaitForSecondsRealtime(_autoInstallDelay);` rồi gọi `LunaServices.Controller?.InstallFullGame()`.
- Timer trong `Update`: nếu chưa ended thì `_elapsed += Time.unscaledDeltaTime`. Khi `_elapsed >= _endTime` thì gọi `EndWithTimeout()`. Dùng unscaled để tutorial pause bằng timeScale không làm dừng timer.

Tương thích: `EndGame`, `ShowWinPanel`, `ShowFailPanel`, `CountdownEndGame` chỉ giữ lại nếu hiện đang được tham chiếu. Khi giữ thì chỉ forward sang `EndWith*`, không thêm hành vi khác. Nếu không có tham chiếu thì gỡ bỏ.

## `UI/WinPanel.cs` và `UI/FailPanel.cs`
Hai file dùng cùng một mẫu:
- `[SerializeField] Button _installButton;`
- `OnEnable`: `_installButton.onClick.AddListener(RequestInstall)`.
- `OnDisable`: `RemoveListener(RequestInstall)`.
- `public void RequestInstall() => LunaServices.Controller?.InstallFullGame();`

## Scene `Gameplay.unity`
- Thêm `Canvas/Timeout_Panel`:
  - Inactive.
  - Chỉ có `RectTransform` (stretch full) và `CanvasGroup`.
  - Không có art.
- Gán cho `GameManager`: `_winPanel`, `_failPanel`, `_timeoutPanel`, `_endTime = 30`.
- Gán `_installButton` bằng button hiện có trong Win/Fail.
- Thêm root GameObject `LunaController` gắn component `LunaController`.
- Giữ nguyên layout, art và shader B.
- **Không chỉnh `City.unity`.**

## Verification
1. Compile sạch, Console không có error. Lỗi JSON/postprocess của SDK cache đã được xác nhận hết.
2. Test từng outcome riêng:
   - Kill monster → chỉ Win.
   - Player chết → chỉ Fail.
   - Chờ 30s → chỉ Timeout, kể cả khi đang ở selection/tutorial.
3. Terminal guard: gọi outcome thứ hai sau outcome đầu (ví dụ Win rồi timeout) không đổi panel, `GameEnded` chỉ log một lần, `Ended` chỉ phát một lần.
4. Auto CTA: `InstallFullGame` được gọi lúc khoảng 1s sau outcome, đúng một lần auto. Click trước 1s vẫn install được ngay.
5. Pointer-release guard: nhấn chuột trước khi panel hiện rồi thả trên panel không được trigger install. Chỉ một lần press+release hoàn chỉnh trên button mới gọi `RequestInstall`.
6. Diff scene chỉ gồm `Timeout_Panel`, các reference đã gán và `LunaController`. `City.unity` không thay đổi.

**Còn tách riêng:** các prerequisite map/rig theo plan gốc.

### Implementation mapping to preserve existing approved boundaries
Retain existing private serialized `_button` field names in WinPanel/FailPanel and serialize their GameManager reference as specified in the original plan; clicks go through GameManager.RequestInstall so timing/phase policy stays centralized and Luna SDK consumers stay limited to GameManager. Retain original event `Action Ended` and separate EndWithWin/EndWithLose/EndWithTimeout methods; no extra GameOutcome type is needed. Preserve int EndTime serialization. These map the newly confirmed timeout choice onto the original approved class/API boundaries. Remove legacy methods only after code and serialized method-reference scan (done before integration). No source City.unity change.


---
# Amendment 03: Bake gun clips cho NPC_33 / NPC_26

**Spec:** `agent-os/specs/2026-11-04-1710-monster-hero-playable`
**Trạng thái:**
- Lựa chọn nguồn (giữ nguyên tỉ lệ NPC_33/NPC_26, bake gun animation riêng): **ĐÃ ĐƯỢC USER DUYỆT**.
- Technical scope bake: Codex trình bày trước khi chạy bake.
- Kiến trúc giai đoạn sau: **PENDING APPROVAL**. Amendment này không suy ra phê duyệt cho phần đó.

## 1. Bối cảnh đã chẩn đoán

| Rig | Arm L (upper/fore) | Arm R (upper/fore) |
|---|---|---|
| Default | 0.3925 / 0.3406 | 0.3725 / 0.3666 |
| NPC_33, NPC_26 | 0.3410 / 0.2959 | 0.3237 / 0.3184 |

- Importer đang để `animationType = Human`, nhưng nested Animator avatar có `isValid` mà `isHuman = false`.
- `humanDescription` trong `.meta` nguồn thiếu mapping.
- `BakeClip` hiện tại hardcode `AvatarPath` mặc định và lọc theo `mixamorig`/`Armature.001`, nên **không dùng nguyên trạng cho NPC**.

## 2. Phạm vi thay đổi

**Chỉ sửa:** `Assets/_Playable_/Scripts/Editor/PaintballAnimationBaker.cs`
- Thêm entry `public static void ExportHeroGunClips()` (kèm MenuItem editor).
- Mọi helper là `private static` nằm trong class static hiện có. Không thêm runtime class.

**Target:** chỉ `Assets/GameAsset/Model/Character/Skin/NPC_33.fbx` và `NPC_26.fbx`.

**Cấm:**
- Normalize, reshape hay rebind mesh.
- Sửa FBX, `.meta`, importer hoặc material.
- Dùng Blender, IK, root motion.
- Sửa runtime scene.
- Commit hoặc push.

## 3. Nguồn → Output

Tất cả sample ở 30fps. Base layer là locomotion. Upper layer dùng mask gồm torso/spine, chest, neck, head, hai tay và ngón tay.

| Output | Base (`Player city.controller`) | Upper (`PlayerPaintball.controller`) | Timing/loop/events lấy từ |
|---|---|---|---|
| Idle_Gun | idle | AssaultRifleIdle | idle |
| Run_Gun | run | AssaultRifleIdle | run |
| Jump_Gun | jump_start | AssaultRifleIdle | jump_start |
| Draw_Gun | idle | AssaultRifleEquipFromIdle | Equip |
| Fire_Gun | idle | AssaultRifleFire | Fire |
| Reload_Gun | idle | AssaultRifleReloadMid | ReloadMid |

**Đường dẫn output (chính xác):**
- `Assets/_Playable_/Animations/Luna/Heroes/NPC_33/{Idle_Gun,Run_Gun,Jump_Gun,Draw_Gun,Fire_Gun,Reload_Gun}.anim` + `PaintballHero.controller`
- Cùng tên file như trên dưới `Heroes/NPC_26/`.

**Controller:** copy `Luna/Standalone/PaintballStandalone.controller`. Giữ nguyên states Idle/Run/Jump/Equip/Fire/Reload, params `speed`/`isJump` và transitions. Chỉ thay motion.

## 4. Luồng bake (Editor, PreviewScene)

1. **Precheck:** ghi SHA-256 của FBX và `.meta` của 2 target cùng 4 clip nguồn. Ghi tris gốc (NPC_33 = 1820, NPC_26 = 894).
2. **Instantiate** target trong `PreviewScene` (`EditorSceneManager.NewPreviewScene`), giữ nguyên rest pose.
3. **Transient Avatar:** dựng `HumanDescription` từ hierarchy thực tế. Mapping bắt buộc theo `HumanTrait.RequiredBone`:
   - ORG: upper arm, lower arm, hand (L/R), shoulder nếu có.
   - `mixamorig`: Hips, Spine/Chest, Neck/Head, UpperLeg, LowerLeg, Foot.
   - `skeleton[]` lấy từ transform rest hiện tại, để giữ nguyên tỉ lệ.
   - Gọi `AvatarBuilder.BuildHumanAvatar`, kiểm tra `isValid && isHuman`. **Fail thì dừng.**
4. **Sampling:** dùng `PlayableGraph`, gắn Animator tạm trên instance với transient avatar, `applyRootMotion = false`. Cấu trúc gồm `AnimationLayerMixerPlayable` (input 0 = base, input 1 = upper với transient `AvatarMask` humanoid upper body). Gọi `Evaluate` theo từng frame `t = i/30`.
5. **Capture:** lấy local position/rotation/scale của mọi deform bone (SkinnedMeshRenderer.bones) cùng tất cả ancestor tới model root, gồm cả node ORG và rig. Dựa trên `localPosition` rest, chỉ ghi curve khi khác rest vượt tolerance. Scale được giữ nguyên.
6. **Curve path:** `HeroSkins/NPC_33/<relative path>` (hoặc `NPC_26`). Clip ở dạng Generic, chỉ có Transform curve, không có muscle curve.
7. **Hậu xử lý:** áp quaternion continuity (đảo dấu theo dot với key trước), rồi chạy Reduce hiện có với tolerance 0.0003. Copy loopTime, length và AnimationEvents từ clip nguồn xác định timing.
8. **Cleanup:** destroy graph, avatar, mask tạm và đóng PreviewScene. Không lưu asset tạm nào.

## 5. Kiểm chứng (bắt buộc trước khi báo xong)

- **Simulate hierarchy:** trong PreviewScene, dựng `Player/HeroSkins/NPC_x` (không có nested Animator), gắn một Animator duy nhất ở `Player` với `PaintballHero.controller`. Sample từng state rồi kiểm tra:
  - Mọi curve path resolve được, 0 missing binding.
  - Có chuyển động thật: Δrotation tối đa của tay và spine > ngưỡng, không đứng yên.
  - Bone length và rest geometry không đổi: chênh lệch khoảng cách parent→child ≤ 1e-4 so với rest, trừ Hips nếu có bob.
- **Hậu kiểm:** hash FBX/`.meta` trùng precheck. Tris output: NPC_33 = 1820, NPC_26 = 894.
- **Báo cáo:** theo từng clip gồm length, số curve, số key, số byte `.anim`.
- **Budget < 4.5MB:** chỉ đo trong Luna build thật ở giai đoạn sau. Không suy ra từ kích thước `.anim` nguồn.

## 6. Điều kiện dừng (báo cáo, không tự đổi phương pháp)

- Thiếu required mapping, hoặc avatar không `isHuman`.
- Clip output không có chuyển động.
- File nguồn bị thay đổi (hash lệch).
- Curve path hoặc binding không khớp hierarchy mô phỏng.
- Tris lệch hoặc bone length lệch quá ngưỡng.

## 7. Định hướng sau (chưa triển khai, chưa duyệt)

- Một Animator duy nhất ở `Player` root, sở hữu animation events và weapon watchdog như hiện tại (không đổi).
- Model instance dưới `Player/HeroSkins/NPC_x` sẽ bỏ nested Animator.
- `PlayerSkinSwitcher` (đã có trong plan gốc) chọn controller và weapon socket qua explicit refs. Chỉ làm sau khi verify tích hợp visual.
- Không thêm class relay cho animation event. Không dùng humanoid animation runtime riêng cho từng skin.

## 8. Ngoài phạm vi

Gameplay đầy đủ, monster, UI, map, skin switcher runtime, scene edit và đo Luna build. Hoàn thành amendment này **không có nghĩa playable đã hoàn chỉnh**.

---
**Cần user duyệt:** technical scope mục 2–6 (sau khi Codex trình bày) trước khi chạy bake.


## Authorization and preflight record (Codex)
User explicitly accepted the proportion-preserving retarget/bake proposal for NPC_33 and NPC_26 and instructed continuation. Technical file/output scope was presented before asset writes: edit only existing Editor/PaintballAnimationBaker.cs; generate six clips plus one controller per target in Animations/Luna/Heroes/NPC_33 and NPC_26. This is the concrete implementation of that approved bake operation, not approval for later runtime architecture or map edits. Temporary PreviewScene computation already validated both avatars: isValid=true, isHuman=true, 22 mapped bones; original FBX/meta unchanged. No new class, package, runtime scene change or Blender operation is authorized by this phase. Generated clips must cover animated properties consistently across states to avoid stale poses with writeDefaultValues=false; constant channels reduce to two keys. Validate local bone segment lengths and scale against source rest, not geometry re-authoring.

---
# Amendment 04 — Claude plan summary: remaining five skins and runtime binding
Status: APPROVED — user instructed continuation on 2026-11-05; exact Amendment04 scope below.

## Evidence requiring this amendment
Original P1 requires stopping before rigid shared-skeleton reuse when blended weights exist. Read-only FBX analysis: NPC_7 has 171 blended vertices (max2 influences), NPC_5 155 (max2), Doctor 279 (max3), FireFighter 280 (max3), Police 430 (max4). The two completed NPC_33/NPC_26 bakes passed. Proposed replacement for the original remaining-five rigid-rebind approach: retain all seven non-default source rigs/weights and bake Generic animations edit-time. Source model paths themselves have already been explicitly confirmed by user and are not being requested again.

## Exact files and assets for approval
- Modify existing `Assets/_Playable_/Scripts/Editor/PaintballAnimationBaker.cs` to extend the existing validated bake helper to NPC_7, NPC_5, Doctor, FireFighter, Police. Temporary root Animator/Avatar may be constructed when missing; no source mesh, FBX, meta, importer, rig rest pose or material modification. Retain completed two sets.
- Copy confirmed source `D:/Source/party-craft/Assets/GameAsset/Model/Character/Skin/{Doctor,FireFighter,Police}.fbx` byte-for-byte to target `Assets/GameAsset/Model/Character/Skin/`; create fresh target meta files, leaving source untouched.
- Copy verified albedos `D:/Source/party-craft/Assets/GameAsset/Sprites/SkinCharacter/Doctor.png`, `firefighter.png`, `Police.png` to target `Assets/GameAsset/Model/Character/Skin/Textures/` with the same names. Source Doctor/FireFighter materials map to the matching texture GUIDs; Police source material is `Skin/Materials/Node.002.mat`, whose texture GUID matches Police.png. No source URP shader/material copied.
- Create only three new target materials `Skin/Materials/{Doctor_Playable,FireFighter_Playable,Police_Playable}.mat`, built-in Unlit/Texture with those albedos. Existing shader B and existing materials remain untouched in this phase.
- Under `Assets/_Playable_/Animations/Luna/Heroes/{NPC_7,NPC_5,Doctor,FireFighter,Police}/`, generate `Idle_Gun.anim`, `Run_Gun.anim`, `Jump_Gun.anim`, `Draw_Gun.anim`, `Fire_Gun.anim`, `Reload_Gun.anim`, `PaintballHero.controller` per model. Same 30fps, source timing/events, speed/isJump parameters, transitions, no IK/root motion and Transform-only paths `HeroSkins/{model}/...` as verified for NPC_33/NPC_26.
- Create originally planned `Scripts/Heroes/HeroRoster.cs`: serialized HeroEntry data (id, displayName, portrait, skinRoot, controller, weaponSocket), four Luna slot fields using existing HeroSlotResolver, `TryGet(HeroId, out HeroEntry)` boundary. All references explicit.
- Create originally planned `Scripts/Heroes/PlayerSkinSwitcher.cs`: `Apply(HeroId)` before Equip, toggles renderer-only DefaultVisual versus exactly one of seven original rig roots, then calls weapon ConfigureHeroRig with selected controller/socket.
- Modify existing `Scripts/Paintball/PlayerPaintballController.cs`: add pre-Equip `ConfigureHeroRig(RuntimeAnimatorController, Transform)`; retain single Player-root Animator/event receiver and existing fire/equip/reload/watchdog/aim/projectile mechanics. Weapon stays one instance under Player root at its existing world size; immediately before firing in LateUpdate, copy calibrated socket world position/rotation, not rig scale. No new relay/follower class or interface.
- Target scene only `Assets/_Playable_/Scenes/Gameplay.unity`: preserve default `Armature.001` paths; group only six default C2 renderer nodes under DefaultVisual; add seven model instances under Player/HeroSkins/{model}, remove nested Animator only on instances; bind roster/controller/socket references. No source scene or source model edits. Preserve current outcomes, 30s/1s, map and shader B.

## Calibration and verification
PreviewScene calibration uses clone of existing Player+gun sampled at default Idle_Gun t=0, records real gun rotation and hand-relative offset, then creates equivalent socket under each selected rig's hand at its own Idle_Gun t=0. No arbitrary offset/fallback. Verify gun orientation/size/muzzle at idle/fire/equip/run, switching only before Equip, one root Animator and inactive unused visuals.
Keep source hashes/tris/local bone lengths/scales unchanged; zero missing bindings; actual Generic controller samples and full events/durations match source; compile and Console. New source models may lack Animator/valid avatar: construct transient components only if required mappings exist. Missing bones, geometry change, additional dependency or failed socket calibration means stop/report; no normalization, placeholder or shooting-logic replacement.
Actual Luna runtime/build budget remains a later required measurement. No budget claim from YAML bytes. No commits/push, source-project edits or Blender operations.

## Approval scope (single combined decision)
Approve the five-skin Generic-bake extension and the exact HeroRoster/PlayerSkinSwitcher/weapon-binding integration above together. Selection UI, Flow, monster, map and weather remain tasks of the original plan; this amendment does not itself implement those tasks.

## Amendment04 scene-instance authorization � APPROVED
User approved unpacking only Player instance in Gameplay to complete the six-mesh DefaultVisual grouping. Source Player.prefab remains untouched. Verification: six meshes, unchanged Armature.001 paths, eight exclusive skin selections, one Animator, socket/muzzle scale and reference checks; no CameraController changes.


## T3 continuation authorization
APPROVED by user instruction to continue after Amendment04. Scope: original T3 N10 PlayerHealth, N11 MonsterController, N12 WorldHealthBar, N18 Monster.controller; existing PlayerPaintballController ShotFired and projectile Monster hit adaptation; enumerated monster FBX/texture/material/prefab and Gameplay references. Preserve original camera/gun. Verify Generic rig/imported events, dormant/activate/damage/single death/health bar/compile and Console. UI/Flow/weather/map/cleanup still follow their prerequisites.


# Amendment05 � Initial aim alignment (actual Claude CLI plan)
Status: APPROVED — user explicitly requested this fix on2026-11-05.
Author: Claude CLI, planning-only invocation on2026-11-05. Codex review below.
Cause: LookAtPoint uses Player root as aim origin; actual rendered camera uses height/shoulder/distance and actual portrait reticle is offset. PlayMode screenshot evidence shows ray above monster.
Exact files: existing Paintball/PlayerPaintballController.cs and Flow/MonsterHeroFlowController.cs only. No CameraController changes, no new type/interface, no reticle/scene/prefab/gun-mechanics changes.
Weapon: expose public bool TryGetAimRay(out Ray ray) delegating to existing private GetAimRay with explicit camera/crosshair/Canvas guards.
Flow: private SolveInitialAim; force Canvas layout, read real reticle ray, compute desired direction from ray origin to AimPoint, iteratively correct yaw and signed pitch using public Camera.SetEntryAngles (max6 iterations, stop0.1degree). Shoulder-origin shift requires iteration. Invoke only at initial selection opening and after Equip before tutorial Begin baseline; no continuous aim correction. Report nonconvergence/clamp explicitly; do not relocate reticle or normalize offsets.
Acceptance: both1920x1080 and1080x1920 first-frame ray error<=1degree at selection/gameplay start; no false tutorial progress, manual drag works afterward; compile/Console and CameraController unchanged diff. Missing layout while inactive/camera constraints preventing convergence: report before changing solution.
Codex review: private cached crosshair state currently initializes only in Awake, active hierarchy is irrelevant to that weapon Awake. Portrait reticle layout/UpdateCrosshairScale runs in existing weapon Update, so verification must include first rendered frame after Equip as well as immediate solve. If later crosshair layout invalidates one-shot solve, do not silently add repeated/continuous autoaim; report the concrete finding.

# Amendment06 � Complete remaining work (actual Claude CLI, Codex reviewed)
Status: APPROVED by user reply "oke" on 2026-11-05 after presentation of exact Amendment06 map/prefab/cleanup/weather/audio/verification scope.
The user's request to finish all remaining tasks authorizes continued work within existing plan; original P8/T7 still explicitly stop on new retained-prefab dependencies and exact Blender operation list. No project mutation under this amendment yet. No commits/push or source-project edits.

## Scope and files
Keep CameraController.cs and existing shooting mechanics unchanged; preserve shaderB, all8 original rigs, three endcards, scene-open30s, CTA1s. No new interface/framework/package. Existing original T6-T9 responsibilities retained. This appendix concretizes remaining assets and newly identified prefab dependencies.

### Map � Codex only via Blender MCP
Source D:/Source/party-craft/Assets/GameAsset/Model/Map/CityMap.fbx. Import into isolated working collection, preserving other Blender objects. Verify fountain/park corner/intersection coordinates and scale against evidence/playmode/map-survey-square.png before crop. If source coordinate mapping differs, report exact transform before altering geometry.
Crop Base_Map/Grass/Road/Water and source geometry by vertical planes at Unity-world X=-22,82 and Z=-28,59, preserving allY. Convert planes consistently to Blender coordinates. Retain full park, trees, fountain, turquoise pool, walkways, four surrounding roads/crossings; remove neighboring blocks outside boundary. Preserve UVs, material slots, normals/heights, no decimation, no rig/material changes. Target<=25000triangles; if crop alone exceeds, report exact count before further reduction.
Outputs: Assets/GameAsset/Model/Map/Map cropped/CityMap_ParkRoads.fbx and Library/MonsterHeroArt/CityMap_ParkRoads.blend. Preserve original/source/current croppedFBX; new output freshmeta. Match target's existing material names/GUID mapping and shaderB; verify imported orientation/scale/tris, no silent substitutes.
Gameplay.unity: replace map renderer references after verification, keep suitable existing colliders; additional collider if required only simpleBox/Capsule (not largeMeshCollider). Player proposed(18,ground,0),monster(18,ground,18), confirm paved path/ground by raycast and collision, no arbitraryYoffset. Recheck actual crosshair initial alignment bothaspectratios after placement.

### Weather / sound � original N16
Only new runtime file Scripts/Weather/WeatherPresetController.cs, nested serializable WeatherPresetData (skyColor,overlayColor,rain) rather than an extra data file. Four serialized presets, Luna int0Day=DayAfternoon(.75intensity),1Sunny=DayMorning(1),2Rain=DayMorning*.8,3Night(.1). Source skycenter(.52156866,.75686276,.9137255) for day/sunny/rain; Night uses authoritative City scene override(0,.2990838,.6037736). Overlay blackalpha1-intensity, belowHUD/aboveworld and no raycast. Fixed startup only, no cycle/snow/Noel/nightRain.
Add Weather root, separate overlayCanvas/Image, camera-relative rainParticleSystem max400(source rainAmount400), existing compatible built-in unlit particle material. Existing BrightUnlit stays unchanged. Import only source GameAsset/SFX/Rain.wav to Assets/_Playable_/Sound/Rain.wav; preserve duration/stereo/sampleRate, importerVorbisquality0.4 compressed, no trim. Source bytes are not final budget. Keep existing backgroundmusic/gun/reload/hit clips; fill monster death with existing monsterroar rather than invented audio; verify volume/loop/lifecycle. No external audio framework.

### New-scope prefab component removal � user approval required
Before deleting legacy class files, remove only obsolete components and their serialized references from these four target-project prefabs, retaining model/UI art/transforms:
1 Assets/Game/Prefabs/Motors/Playable Motobike 4.prefab -> MotorbikeController.
2 Assets/_Playable_/Prefabs/Player.prefab -> PlayerAction.
3 Assets/Game/Resources/UI/UICarController.prefab -> DriveHoldButton components.
4 Assets/Game/Prefabs/Decoration/Gym/gym_Funiture_Pack_3.prefab -> Arrow.
Assets/Game/Prefabs/Characters/Player/Player.prefab remains unchanged (different asset). Re-scan all Assets and code before removal. If dependency is still used, stop with reference details. Alternative if declined: keep those scripts/prefabs outside playable, explicitly incomplete deletion scope.

### Cleanup � original deletion list, dependency gated
Gameplay: delete disabled Missions (projectile pool already preserved separately), MissionsJournalPanel, car/motor controls/tutorials; UIPlayer/{Btn Jump,ButtonTopRight,HappyCard,RightTop,Chest,ProfileItem,Pet Button,Garbage}. Keep joystick/Touch/real camera-move-fire cues/HUD/all3endcards/blankTimeout. Scan refs before removal; no missing saved refs. Keep Player rootAnimator and7original skin roots.
Modify PlayerController to remove only driving fields/methods, retaining walking/jump/animation API; GameController becomes brightness-only preserving Luna field; existing Editor/PaintballAnimationBaker drops vehicle-related legacy menus/dependencies but retains all validated hero bake helpers/assets. Existing PlayerPaintballController/PlayerController may receive minimal diagnosed inactiveAnimator teardown guard, without changing shooting behavior.
Delete exact files + metas under Scripts: Missions/{MissionManager,MissionController,CarMissionController,MotorbikeMissionController,PaintballMissionController}; UI/MissionsJournal/{MissionsJournalController,MissionRowView,JournalHandSequencer}; Controller/{CarController,MotorbikeController,PlayerAction,DriveHoldButton,NamePlayer}; Arrow; CameraFieldOfViewAdapter; UI/{CarDriveTutorial,MinimapPointMotion,PaintballMovementTutorial}; Paintball/PaintballNpcController; Editor/DrivingPlayModeChecks. Keep IDrivableVehicle,PaintballNpcMotor,WinPanel,FailPanel,AuraUI. Remove legacy serialized components before files; compile after each dependency-consistent batch.
Orphan assets only if0refs: Prefabs/Paintball/Npc.prefab; Animations/Paintball/NpcPaintball.controller; Animations/Luna/NpcPaintball.controller; Animations/MotorbikeRider.controller; Animations/Luna/MotorbikeRider.controller. No broad folder deletion. Further prefab/asset dependencies require report before broadening list.

## Verification / completion
Backups/hashes before scene/prefab/asset changes. Verify pre/post tris/materials/UV/normals/coordinate bounds, path/collision and aim. CompileConsole, missingScripts/references, prohibited APIs, shaders and source hashes. Actual PlayMode8heroes and4slotconfigvalidation, mouse/touch tutorial gating, real emitted firstshot, monsterattack/playerdeath/monsterdeath,30s timeout allphases, singleoutcome and exact1s autoCTA/clickguard, readable1920x1080/1080x1920, all4weather/audio/noNightRain. No replay added.
Diagnose current local Luna export stall before retry; preserve unsaved user state, no blind save/revert or SDK/package/config edits. Local SDK project:build only; no upload/deploy. Actual runnable Luna output<4500000bytes, contributor ledger; no source-size inference. Any additional compression/topology/API/config operation not listed requires report/approval. Report unverified device/runtime behavior honestly; not complete until required checks pass.


## User map substitution - APPROVED 2026-11-05
User explicitly supplied CityMap_Park.fbx from C:/Users/Admin/Documents/Codex/2026-11-05/d-source-party-craft-assets-gameasset/outputs and instructed use of their already-cropped map, no further cropping. Supersedes Codex Blender crop operation and pending 28114-triangle checkpoint. Copy FBX byte-for-byte to Assets/GameAsset/Model/Map/Map cropped/CityMap_Park.fbx with fresh meta; replace map in Gameplay.unity, reuse existing matching materials/colliders, validate bounds/orientation/tris/ground/scene references and screenshots. No new runtime class/interface or GameController change. Source output and original map stay intact. Actual user-map tris and final Luna budget must be measured.


## In-project map replacement - APPROVED by explicit user instruction
Use Assets/_Playable_/3D Model/Map/CityMap_Park.fbx (GUID dce4fb05060b48cdbf299bf0e0cb6db8), now verified imported with four meshes and matching existing materials. Supersedes failed external FBX. Update only Gameplay.unity existing Base_Map/Grass/Road/Water mesh, material and imported transform references, retain suitable colliders and existing scene references. Verify triangle count, materials, orientation, missing scripts/references, ground raycasts and top-down screenshot. No new class/interface/script/Blender crop operation. Backup evidence/before-inproject-map/Gameplay.unity.
