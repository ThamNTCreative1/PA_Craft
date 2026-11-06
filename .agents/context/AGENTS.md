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

1. 🛡️ **Kỷ luật & An toàn Unity**: [`.agents/rules/unity_general_safety_rules.md`](file:///E:/Tool/AI/.agents/rules/unity_general_safety_rules.md)
2. 📘 **Quy tắc & Chuẩn Lập Trình Luna**: [`.agents/rules/unity_luna_rules.md`](file:///E:/Tool/AI/.agents/rules/unity_luna_rules.md)
3. ⚠️ **Tổng hợp lỗi thường gặp & Cách xử lý**: [`.agents/rules/common_errors_troubleshooting.md`](file:///E:/Tool/AI/.agents/rules/common_errors_troubleshooting.md)
4. 🛠️ **Workflow Skill phát triển Playable**: [`.agents/skills/luna-playable-workflow/SKILL.md`](file:///E:/Tool/AI/.agents/skills/luna-playable-workflow/SKILL.md)
5. 🩺 **Troubleshooting Skill sửa lỗi nhanh**: [`.agents/skills/luna-troubleshooting/SKILL.md`](file:///E:/Tool/AI/.agents/skills/luna-troubleshooting/SKILL.md)
6. 👥 **Thông tin Ngữ cảnh & Phân vai**: [`.agents/context/project_context.md`](file:///E:/Tool/AI/.agents/context/project_context.md)
