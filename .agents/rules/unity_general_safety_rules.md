# QUY TẮC KỶ LUẬT & AN TOÀN CHO AGENT KHI LÀM VIỆC VỚI UNITY
## (UNITY ENGINE AGENT SAFETY & DISCIPLINE RULES)

Tài liệu này đặt ra các ranh giới hành vi nghiêm ngặt cho AI Agent khi thao tác với **bất kỳ dự án Unity nào**. Mục tiêu cốt lõi: **Không gây hỏng project, không làm mất cấu hình Inspector của lập trình viên, và không thực thi tác vụ ngoài phạm vi yêu cầu.**

---

## 1. TUYỆT ĐỐI CẤM CAN THIỆP CÁC THƯ MỤC HỆ THỐNG (TOUCH-FREE DIRECTORIES)

Agent **CẤM** đọc, sửa, tạo hoặc xóa file trong các thư mục sau:
- ❌ `Library/`: Cache biên dịch và asset metadata của Unity. Tác động vào đây sẽ khiến Unity re-import toàn bộ dự án từ đầu (mất hàng giờ hoặc treo Editor).
- ❌ `Temp/`: Thư mục tạm thời của tiến trình Unity Editor đang mở.
- ❌ `UserSettings/`: Lưu trữ layout cửa sổ, vị trí camera Editor của cá nhân dev.
- ❌ `Logs/`: File nhật ký hệ thống.
- ❌ `obj/`, `.vs/`, `.idea/`: Cache của Visual Studio / Rider.
- ❌ `LunaTemp/`: Cache biên dịch riêng của plugin Luna.

> [!CAUTION]
> Phạm vi hoạt động an toàn của Agent CHỈ NẰM TRONG thư mục `Assets/` và `.agents/`.

---

## 2. BẢO TOÀN TUYỆT ĐỐI DỮ LIỆU SERIALIZE TRÊN INSPECTOR

Trong Unity, mọi dữ liệu kéo thả (Sprite, Audio, GameObject, Text, con số tinh chỉnh) được lưu dựa theo tên biến C#.
1. **CẤM tự ý đổi tên các trường Serialized**:
   - Các biến có `[SerializeField]` hoặc biến `public` đang tồn tại **CẤM KHÔNG ĐƯỢC TỰ Ý ĐỔI TÊN**.
   - Đổi tên biến mà không dùng attribute chuyển tiếp sẽ làm Unity **XÓA TRẮNG DỮ LIỆU** đã gán trên mọi Scene và Prefab!
2. **Nếu bắt buộc phải đổi tên biến**, BẮT BUỘC dùng `UnityEngine.Serialization.FormerlySerializedAs`:
   ```csharp
   // ĐÚNG: Giữ nguyên dữ liệu cũ của Inspector
   [FormerlySerializedAs("oldButtonName")]
   [SerializeField] private Button _newButtonName;

   // SAI: Làm mất toàn bộ reference đã kéo thả trong Editor!
   [SerializeField] private Button _newButtonName;
   ```
3. **Không thay đổi kiểu dữ liệu (Type) của trường Serialized** trừ khi được người dùng yêu cầu rõ ràng.

---

## 3. BẢO VỆ TÍNH TOÀN VẸN CỦA FILE `.META` VÀ GUID

Unity liên kết tất cả Asset (Scene, Prefab, Material, Texture, Script) thông qua chuỗi **GUID** lưu trong file `.meta`.
1. **Không tạo script mà quên file `.meta`**:
   - Khi Agent tạo một script mới, Unity Editor sẽ tự sinh file `.meta` tương ứng khi bạn quay lại cửa sổ Unity. Agent không tự ý bịa ra file `.meta` với GUID trùng lặp.
2. **Không tự ý di chuyển hoặc đổi tên file bên ngoài Unity**:
   - Di chuyển file mà không di chuyển file `.meta` đi kèm sẽ làm đứt gãy liên kết (Missing Reference / Missing Script trên GameObject).
3. **CẤM sửa nội dung file `.meta`** trừ khi có chỉ định rõ ràng của lập trình viên cao cấp.

---

## 4. KỶ LUẬT THỰC THI LỆNH (NO RUNNING WILD / NO UNNECESSARY ACTIONS)

1. **KHÔNG chạy lệnh tùy tiện (No Arbitrary Commands)**:
   - Không tự ý chạy các lệnh terminal nặng như: build full project, clean cache, chạy test toàn cục khi chưa được người dùng yêu cầu.
   - Không tự ý cài đặt package ngoài (npm, nuget, pip, git clone) vào project Unity.
2. **KHÔNG tạo file rác linh tinh (No Scratch Clutter)**:
   - Không tự ý tạo các file test, script tạm thời vứt bừa bãi trong thư mục `Assets/`.
   - Mọi file thử nghiệm nếu cần phải lưu trong thư mục scratch được chỉ định hoặc hỏi ý kiến người dùng trước.
3. **KHÔNG can thiệp ngoài phạm vi yêu cầu (Stay in Scope)**:
   - Người dùng yêu cầu sửa lỗi ở hàm A thì chỉ tập trung phân tích và xử lý hàm A.
   - Không tự ý "tiện tay" sửa hoặc format lại các class khác trong project mà người dùng không đề cập tới.
   - Tránh bệnh "Overengineering": Không tự vẽ thêm các design pattern rườm rà (DI container, phức tạp hóa architecture) khi bài toán chỉ cần một đoạn code đơn giản, thanh thoát.

---

## 5. TÔN TRỌNG CODE CONVENTION & LIFECYCLE UNITY

1. **Nắm rõ vòng đời MonoBehaviour**:
   - `Awake()`: Khởi tạo dữ liệu nội bộ, cache component.
   - `Start()`: Tương tác với dữ liệu của các object khác.
   - `OnEnable()` / `OnDisable()`: Đăng ký và hủy đăng ký sự kiện (Event / Action). **Luôn hủy đăng ký để chống Memory Leak**.
2. **Không lạm dụng `Update()`**:
   - Không đưa các phép tính nặng, tìm kiếm chuỗi, duyệt vòng lặp lớn, hay `FindObjectOfType`, `GetComponent`, `Camera.main` vào trong `Update()`.
3. **Tôn trọng phong cách code hiện có**:
   - Đọc trước các script xung quanh để tuân thủ phong cách: cách đặt tên biến (`_camelCase` hay `camelCase`), cách dùng namespace, cách tổ chức thư mục.
