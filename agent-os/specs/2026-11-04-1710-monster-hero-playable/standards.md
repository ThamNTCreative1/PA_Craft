# Standards áp dụng

## Governance và quy trình
- `ai-agent/approval-gates-and-change-control`, `roles-and-handoff`, `safety-scope-and-verification`: chỉ triển khai khi plan đã APPROVED. Mỗi điểm dừng của P0–P10, D1–D6 hay bất kỳ lệch class/file/asset nào → dừng, báo nguyên nhân, ảnh hưởng và phương án.
- `ai-agent/cross-project-logic-reuse` + skill `luna-cross-project-reuse`: từ party-craft chỉ lấy *giá trị preset* và quy tắc giảm sáng khi mưa (`GetRainLightIntensity`). Không copy `WeatherController`, WeatherUI, GameManager nguồn, VisualEffect, LensFlare hay wet shader. Asset FBX (3 skin, monster) user đã xác nhận nguồn; monster có rủi ro IP (R-IP).
- Skill `luna-production-governance`, `luna-code-architecture`, `luna-test-and-verify` (bắt buộc); `luna-tutorial-onboarding`, `luna-input-handling`, `luna-material-authoring`, `setup-luna-controller`, `luna-build-budget-audit`, `luna-runtime-compatibility`; `luna-blender-optimization` chỉ khi D5 = crop lại.

## Kiến trúc (`unity/architecture`)
- Data (`HeroRoster`, `WeatherPresetData`), Logic (`Health`, `HeroSlotResolver`), View/Adapter (panel, card, health bar, skin switcher, monster).
- Dependency đi qua `[SerializeField]` (chỉ khai báo SerializeField, user tự sắp TabGroup). Không dùng runtime Find.
- Static mutable chỉ có ở `LunaServices`. `GameManager.Instance`/`AudioManager.Instance` là code cũ; chỉ thêm chỗ dùng mới nếu được duyệt.
- Thứ tự khởi tạo: Flow dùng `[DefaultExecutionOrder(150)]` để chạy sau Camera(100) và Paintball(120). LunaServices chỉ được gọi lúc EndGame, sau khi mọi Awake đã chạy xong.
- Hủy subscription trong `OnDisable`/`OnDestroy` ở đúng nơi đã đăng ký.

## LunaController (`luna/luna-controller`)
- Đúng 1 controller. Hàm public: `NotifyGameEnded()` (một lần) và `InstallFullGame()` (cho phép lặp).
- Map thật: `Luna.Unity.LifeCycle.GameEnded()`, `Luna.Unity.Playable.InstallFullGame()` (đã thấy trong `GameManager.cs` hiện tại).
- Consumer duy nhất: `GameManager` (EndGame → NotifyGameEnded một lần; auto sau 1 s → InstallFullGame một lần; click → InstallFullGame lặp). Controller chưa đăng ký → LogError, endcard vẫn hiện.
- Controller không tự hẹn giờ CTA và không chứa UI. Không replay, không reset cờ.

## Runtime compatibility (`luna/runtime-compatibility`)
- Cấm `FindObjectOfType`/`FindObjectsOfType`/`GameObject.Find*`/`FindWithTag`/`Resources.FindObjectsOfTypeAll`.
- Input Legacy + `StandaloneInputModule`; không dùng New Input System. UI pointer qua EventSystem; một pointer cho mỗi control.
- Không dùng `Animator.parameters` khi `UNITY_LUNA`; monster dùng `Animator.Play`. Animation event có watchdog dự phòng.
- Physics 3D với collider primitive (Capsule cho monster); không dùng MeshCollider mới. `GetComponentInParent` được phép.
- Tutorial và CTA có gate rõ ràng; CTA không nhận cùng pointer-release của gameplay.

## Tutorial (`luna/tutorial-and-onboarding`)
- Cue đầu tiên (panel hero) hiện trong ~1.5 s. Tutorial 3 bước, mỗi bước dạy một input, hoàn tất bằng input thật, không tự hoàn tất.
- Mọi outcome đều hủy tutorial.
- Report ghi: thời điểm cue đầu, thời điểm tương tác thành công đầu, tổng thời lượng onboarding.

## Material (`unity/materials-built-in-unlit`)
- Allowlist: `Unlit/Texture`, `Unlit/Transparent Cutout`, `Unlit/Color`, `UI/Default`, `Sprites/Default`, shader particle built-in mà project đang dùng (xác minh ở P9).
- Không thêm custom shader. BrightUnlit hiện có xử lý theo D2 (đề xuất A).
- Skybox fileID 103 và shader fileID 211 phải được audit (P9).
- Brightness/thời tiết qua `Graphic.color` overlay + `Camera.backgroundColor`. Không dùng realtime light, post-processing hay fog để bù.
- Không gọi `renderer.material` lặp lại; không tạo material lúc runtime.

## Asset và Blender (`unity/assets`, `blender/*`)
- Import: tắt material tự sinh; Read/Write tắt; mesh compression; texture nhỏ nhất có thể và nén; chỉ giữ clip cần.
- Bind skin vào skeleton chung chỉ khi P1 đạt điều kiện.
- Crop map chỉ khi D5 chọn crop và có phụ lục Blender được duyệt (bounds, danh sách object, ngân sách tris, đường dẫn output).
- Rig/animation: không thêm skeleton hay clip bake mới cho hero.

## Budget (`luna/scene-budget-4_5mb`, `luna/build-budget`)
- Mốc: ≤ 3.8 MB Green, 3.8–4.2 Warning, 4.2–4.5 Critical, > 4.5 Fail. Chỉ dùng BuildBytes đo thật.
- Đo ở P0 (baseline), sau T3/T4 (nhân vật, monster), sau T6/T7 (material/map/audio), và ở build cuối.
- Ledger theo cột chuẩn. Map 120k vertex (Base_Map) và nhạc là nghi vấn lớn nhất; vượt Warning thì phải nêu asset sẽ cắt.

## Verification (`testing/luna-verification`)
- Sau mỗi lần sửa script: chờ compile, đọc Console.
- Kiểm happy path, cả 3 trigger endcard, trigger đồng thời, guard, input mouse/touch, tham chiếu thiếu, subscription trùng.
- Audit API cấm, shader, package. Build Luna thật.
- Không báo PASS cho mục chưa chạy; ghi rõ mục chưa xác minh.

## Git (`git/*`)
- Branch hiện tại `CCPW_V03`. Commit tách theo task.
- Không động vào thay đổi có sẵn trong `Packages/*` và `.idea`.
- Không xóa nguyên thư mục; chỉ xóa file đã qua P8. 
