# AGENTS.MD - HƯỚNG DẪN DÀNH CHO AI AGENT KHI LÀM VIỆC VỚI UNITY & LUNA PLAYABLE ADS

Tài liệu này cung cấp toàn bộ ngữ cảnh chung, quy tắc phát triển, và kiến thức cốt lõi mà mọi AI Agent (Antigravity / Gemini) **BẮT BUỘC** phải tuân thủ khi thao tác với bất kỳ dự án Unity nào, đặc biệt là dự án Playable Ads sử dụng Luna Playable Plugin.

---

## 1. TỔNG QUAN NỀN TẢNG (PLATFORM OVERVIEW)
- **Nền tảng**: Unity WebGL Mini-app được biên dịch thông qua **Luna Playable Ads Plugin (v7.x - v8.x)**.
- **Mục tiêu sản phẩm**: Tạo ra quảng cáo tương tác siêu nhẹ (< 2 - 5 MB nén ZIP), tải tức thì dưới 2 giây, chạy mượt mà 60 FPS trên trình duyệt WebView di động (iOS / Android).
- **Kiến trúc Scene**: Duy nhất **1 Scene** hoạt động độc lập (`SampleScene.unity`). Toàn bộ luồng chơi diễn ra khép kín trong scene này.

---

## 2. NGUYÊN TẮC KỶ LUẬT KHI LÀM VIỆC VỚI UNITY ENGINE (UNITY DISCIPLINE & SAFETY)

> [!CAUTION]
> Tuân thủ nghiêm ngặt các ranh giới sau để **KHÔNG GÂY HỎNG PROJECT** và **KHÔNG LÀM MẤT CÔNG SỨC CỦA LẬP TRÌNH VIÊN**:

1. **CẤM TỰ Ý CHẠY LỆNH LINH TINH (NO ARBITRARY COMMANDS)**:
   - **Không tự ý chạy lệnh terminal/build nặng** (build player, clean cache, reimport toàn bộ) khi chưa được user yêu cầu.
   - **Không tự ý cài đặt package lạ** (npm, nuget, pip, git repo bên ngoài) vào thư mục project.
   - **Không tự ý tạo file rác/file test bừa bãi** trong thư mục `Assets/`.
2. **CẤM CAN THIỆP THƯ MỤC HỆ THỐNG CỦA UNITY (TOUCH-FREE ZONES)**:
   - **Tuyệt đối KHÔNG đọc, ghi, xóa hay tác động vào**: `Library/`, `Temp/`, `UserSettings/`, `Logs/`, `obj/`, `.vs/`, `.idea/`, `LunaTemp/`.
   - Mọi thao tác code chỉ được diễn ra trong `Assets/` và cấu hình trong `.agents/`.
3. **BẢO TOÀN DỮ LIỆU SERIALIZE TRÊN INSPECTOR (ZERO DATA-LOSS)**:
   - **CẤM tự ý đổi tên các biến `[SerializeField]` hoặc `public`** trong MonoBehaviour / ScriptableObject.
   - Nếu bắt buộc đổi tên, **BẮT BUỘC** dùng `[FormerlySerializedAs("oldName")]` để không làm mất các liên kết (references) mà dev đã kéo thả trong Editor.
4. **BẢO VỆ TÍNH TOÀN VẸN CỦA FILE `.META` VÀ GUID**:
   - Không tự ý xóa, di chuyển file `.meta`. Mất file `.meta` sẽ làm đứt gãy liên kết (Missing Reference / Missing Prefab) trong toàn bộ Scene.
5. **TẬP TRUNG ĐÚNG PHẠM VI YÊU CẦU (STAY IN SCOPE & NO OVERENGINEERING)**:
   - User yêu cầu sửa logic nào thì làm đúng logic đó, không tự tiện refactor các class khác xung quanh.
   - Không đưa vào các design pattern phức tạp không cần thiết (giữ code tối giản, dễ hiểu, dễ maintain).

---

## 3. QUY TẮC CỐT LÕI VỀ LUNA & WEBGL PLAYABLE

### 3.1. Giới hạn C# và Biên dịch Luna (Luna C# to JS Bridge Compiler)
> [!IMPORTANT]
> Luna chuyển mã C# sang JavaScript bằng Bridge Compiler. Không phải tính năng nào của C# / .NET / Unity cũng được hỗ trợ trên môi trường Web!
1. **TUYỆT ĐỐI KHÔNG DÙNG**:
   - `System.Reflection` (GetType, Activator, MethodInfo,... trừ trường hợp tối giản có sẵn).
   - `System.IO` / File read/write trực tiếp (không khả dụng trên Web / Ad Network sandboxed iframe).
   - `System.Threading` / `Thread` / `Task` / `async-await` phức tạp.
   - Các thư viện ngoài nặng: `Zenject`, `UniRx`, `UniTask`, `Odin Inspector (Sirenix)`, `Newtonsoft.Json` (dùng `JsonUtility` nếu cần).
   - `Box2D Physics` nặng hoặc 3D Rigidbody phức tạp (hãy ưu tiên Raycast UI / RectTransform bounds hoặc CircleCollider2D tối giản).
2. **ƯU TIÊN DÙNG**:
   - C# Coroutines chuẩn (`IEnumerator`, `WaitForSeconds`, `yield return null`).
   - Cấu trúc dữ liệu cơ bản: `List<T>`, `Dictionary<TKey, TValue>`, Array.
   - Tiền xử lý điều kiện: Luôn bọc gọi hàm Luna bằng `#if LUNA ... #else ... #endif`.

### 3.2. Hiệu Năng & Quản Lý Bộ Nhớ (Zero-GC Mindset)
- Trình duyệt di động rất nhạy cảm với Garbage Collection (GC Pause gây khựng hình).
- **Tuyệt đối tránh `new` object, `Instantiate()`, `Destroy()` liên tục trong `Update()`** hoặc trong quá trình người chơi đang tương tác.
- Cache toàn bộ `Transform`, `Camera.main`, `WaitForSeconds`, `Component` trong `Awake()` hoặc `Start()`.
- Sử dụng Object Pooling cho các hiệu ứng xuất hiện nhiều lần (vfx sao rơi, hạt bụi, text popup).

### 3.3. Quy Chuẩn Vòng Đời Luna Playable (Lifecycle & CTA)
- **Bắt đầu game**: Gọi `Luna.Unity.LifeCycle.GameStarted()` khi người chơi thực hiện tương tác đầu tiên (First Input) hoặc Scene đã nạp hoàn tất.
- **Kết thúc game**: Gọi `Luna.Unity.LifeCycle.GameEnded()` khi Win, Lose hoặc hết giờ chơi.
- **Kêu gọi cài đặt (CTA - Call To Action)**: Gọi `Luna.Unity.Playable.InstallFullGame()` khi bấm nút CTA, chạm vào EndCard, hoặc chạm màn hình sau khi game kết thúc.
- **Biến tùy biến Playground**: Khai báo bằng attribute `[LunaPlaygroundField("Tên field")]` cho các biến Creative/UA muốn tinh chỉnh (màu sắc, thời gian đếm ngược, số lượt chơi).

### 3.4. Đa Tỉ Lệ Màn Hình (Responsive: Portrait & Landscape)
- Playable Ads bắt buộc phải chạy ổn định ở cả 2 tỉ lệ:
  - **Portrait (9:16)**: Khách cầm máy dọc.
  - **Landscape (16:9 / 4:3)**: Khách cầm máy ngang hoặc màn hình iPad.
- Camera: 2D Orthographic hoặc 3D cố định. Canvas Render Mode chuẩn: `Screen Space - Camera` hoặc `Screen Space - Overlay` với `Canvas Scaler`: *Scale With Screen Size* (Reference Resolution: `1080 x 1920`, Match Width Or Height = `0.5`).

---

## 4. THƯ VIỆN TÀI LIỆU & SKILLS CHUNG TRONG DỰ ÁN

Mọi tài liệu và kỹ năng đã được chuẩn hóa để áp dụng cho **bất kỳ dự án Unity / Playable Ads nào**:

1. 🛡️ **Kỷ luật & An toàn Unity**: [`.agents/rules/unity_general_safety_rules.md`](.agents/rules/unity_general_safety_rules.md)
2. 📘 **Quy tắc & Chuẩn Lập Trình Luna**: [`.agents/rules/unity_luna_rules.md`](.agents/rules/unity_luna_rules.md)
3. ⚠️ **Tổng hợp lỗi thường gặp & Cách xử lý**: [`.agents/rules/common_errors_troubleshooting.md`](.agents/rules/common_errors_troubleshooting.md)
4. 🛠️ **Workflow Skill phát triển Playable**: [`.agents/skills/luna-playable-workflow/SKILL.md`](.agents/skills/luna-playable-workflow/SKILL.md)
5. 🩺 **Troubleshooting Skill sửa lỗi nhanh**: [`.agents/skills/luna-troubleshooting/SKILL.md`](.agents/skills/luna-troubleshooting/SKILL.md)
6. 👥 **Thông tin Ngữ cảnh & Phân vai**: [`.agents/context/project_context.md`](.agents/context/project_context.md)

## NHÌN SCENE

Không đoán bố cục: sau khi dựng/sửa bất cứ thứ gì nhìn thấy được, chạy menu Unity `Tools/Playable/Capture All` (MCP execute_menu_item) rồi Read `PlayableCaptures/portrait.png`, `landscape.png`, `tall.png` và `layout.txt` (vị trí % màn hình + sorting của từng object). So với ảnh tham chiếu, sửa, chụp lại.


---

<!-- LESSONS:BEGIN (tự sinh từ brain/, không sửa tay) -->
## LỖI THƯỜNG GẶP ĐÃ HỌC (brain/knowledge)

Các lỗi dưới đây đã xảy ra ở những lần build trước — bắt buộc tránh.

- [ISS-001] (compile, blocker, x1) Luna package phải có config.json nằm cạnh thư mục scripts/; không copy riêng scripts/.
- [ISS-002] (compile, blocker, x1) Luôn có com.unity.ugui trong manifest khi dùng Luna.
- [ISS-003] (luna-compat, blocker, x1) Không dùng Zenject, UniTask, Odin/Sirenix, VisualFlow trong project playable; dùng Coroutine.
- [KIT-001] (luna-compat, blocker, x1) Không dùng System.IO, dynamic, Newtonsoft.Json, UniRx trong code playable (dùng JsonUtility, Coroutine).
- [ISS-004] (luna-compat, major, x1) Không dùng System.Threading, System.Reflection, System.Net trong code runtime.
- [ISS-006] (sorting, major, x1) Item đang kéo luôn có sortingOrder 100; trả lại giá trị cũ khi thả.
- [ISS-007] (compile, major, x1) Sau khi dựng scene, gán đủ mọi field SerializeField và chạy Play mode thử trước khi kết thúc phase.
- [KIT-002] (lifecycle, major, x1) Mọi lệnh Luna.Unity.* (GameStarted, GameEnded, InstallFullGame) phải nằm trong #if LUNA.
- [KIT-004] (audio, major, x1) Không phát âm thanh trong Awake/Start; bắt đầu BGM sau lần chạm đầu tiên.
- [KIT-005] (responsive, major, x1) CanvasScaler: Scale With Screen Size, 1080x1920, Match 0.5; quy đổi toạ độ kéo thả bằng RectTransformUtility.
- [KIT-006] (scene, major, x1) Không đổi tên field [SerializeField]/public; nếu buộc phải đổi thì thêm [FormerlySerializedAs].
- [ISS-005] (asset-size, minor, x1) Mọi AudioClip phải Force To Mono, Vorbis quality ~0.7.
- [KIT-003] (asset-size, minor, x1) Tắt Generate Mip Maps cho mọi Sprite/UI texture.

- Ngữ cảnh riêng của project: [`.agents/context/AGENTS.md`](.agents/context/AGENTS.md)
<!-- LESSONS:END -->
