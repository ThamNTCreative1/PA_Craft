# CẨM NANG CÁC LỖI THƯỜNG GẶP & CÁCH XỬ LÝ (COMMON ERRORS & TROUBLESHOOTING)

Tài liệu này tổng hợp các lỗi phổ biến nhất khi phát triển, build và chạy thử Playable Ads với Luna Plugin trong Unity, kèm giải pháp xử lý tức thì cho Agent.

---

## 1. LỖI BIÊN DỊCH C# SANG JS (LUNA BRIDGE COMPILATION ERRORS)

### ❌ Lỗi 1.1: `Method or Type not supported by Luna compiler`
- **Nguyên nhân**: Mã nguồn sử dụng tính năng .NET hoặc Unity API mà Luna Bridge chưa hỗ trợ (ví dụ: `System.Threading.Tasks`, `System.Reflection.Emit`, `Span<T>`, thư viện nén zip, file I/O).
- **Giải pháp**:
  - Loại bỏ các lệnh gọi unsupported API.
  - Thay thế bằng C# cơ bản hoặc dùng tiền xử lý `#if !LUNA ... #endif` nếu code đó chỉ dùng trong Unity Editor.

### ❌ Lỗi 1.2: `Assembly Definition reference missing / Unresolved Symbol`
- **Nguyên nhân**: Script nằm trong một Assembly Definition (asmdef) không được khai báo trong cấu hình của Luna (`luna.json`).
- **Giải pháp**:
  - Mở cửa sổ Luna Playable Settings > Code > kiểm tra danh sách Assemblies được include.
  - Đảm bảo các script dùng chung nằm trong Assembly hợp lệ hoặc gom vào Assembly chính.

---

## 2. LỖI MÀN HÌNH ĐEN HOẶC HỒNG (BLACK SCREEN / PINK SHADERS)

### ❌ Lỗi 2.1: Shader màu hồng (Magenta/Pink Material) trên Web
- **Nguyên nhân**: Shader sử dụng trong Editor là Standard Shader 3D hoặc Shader phức tạp không hỗ trợ WebGL/Luna. Luna không export được bytecode của Shader này.
- **Giải pháp**:
  - Chuyển Material sang Shader nhẹ: `UI/Default`, `Sprites/Default`, `Spine/SkeletonLit`, `Spine/SkeletonGraphicDefault`.
  - Trong Unity Editor: Thêm Shader vào danh sách **Always Included Shaders** (*Project Settings > Graphics*).

### ❌ Lỗi 2.2: Màn hình đen hoàn toàn khi vừa mở Playable
- **Nguyên nhân**:
  1. Camera `Clear Flags` chưa cấu hình đúng hoặc `Culling Mask` không nhìn thấy layer của vật thể.
  2. Canvas Render Mode đặt `Screen Space - Camera` nhưng trường `Render Camera` bị bỏ trống (`null`).
  3. Có Exception nghiêm trọng xảy ra ngay trong hàm `Awake()` hoặc `Start()` làm dừng luồng thực thi JS.
- **Giải pháp**:
  - Đặt Camera `Clear Flags` = `Solid Color` (màu nền game).
  - Kiểm tra Console trình duyệt (F12 > Console tab) để tìm `Uncaught TypeError` hoặc `NullReferenceException`.
  - Đảm bảo `Render Camera` được gán đầy đủ.

---

## 3. LỖI ÂM THANH KHÔNG PHÁT TRÊN MOBILE (AUDIO AUTOPLAY ISSUES)

### ❌ Lỗi 3.1: Âm thanh kêu trong Unity Editor nhưng im bặt trên iPhone/Android
- **Nguyên nhân**: Chính sách **Web Audio Autoplay Policy** của Apple WebKit và Google Chrome. Trình duyệt chặn phát âm thanh nếu người dùng chưa tương tác (chạm/click) vào trang web.
- **Giải pháp**:
  - Không phát BGM ngay lập tức trong `Awake()` khi mới load trang.
  - Đăng ký sự kiện: Ngay khi người dùng chạm lần đầu tiên (First Touch/PointerDown), kích hoạt `AudioListener.pause = false;` và bắt đầu phát nhạc nền.
  - Kiểm tra file âm thanh đã được tick `Force To Mono` chưa.

---

## 4. LỖI KÉO THẢ & TƯƠNG TÁC (DRAG & DROP / INPUT BUGS)

### ❌ Lỗi 4.1: Bấm không ăn hoặc kéo item bị lệch tọa độ khi xoay ngang
- **Nguyên nhân**:
  - Tính toán tọa độ kéo thả dùng trực tiếp `Input.mousePosition` mà không quy đổi qua Canvas/Camera.
  - CanvasScaler thay đổi tỉ lệ (Scale Factor) giữa Portrait và Landscape làm sai lệch khoảng cách pixel.
- **Giải pháp**:
  - Sử dụng giao diện chuẩn Unity UI Events: `IDragHandler`, `IBeginDragHandler`, `IEndDragHandler`.
  - Chuyển đổi tọa độ thông qua:
    ```csharp
    RectTransformUtility.ScreenPointToLocalPointInRectangle(canvasRect, eventData.position, eventData.pressEventCamera, out Vector2 localPoint);
    ```

### ❌ Lỗi 4.2: Không thể kéo thả vật phẩm do bị đè bởi UI khác
- **Nguyên nhân**: Một GameObject UI khác (như Image nền, khung viền, panel) có bật `Raycast Target = true` nằm đè lên trên vật thể tương tác.
- **Giải pháp**:
  - Tắt `Raycast Target` trên toàn bộ Image/Text không cần click.
  - Kiểm tra thứ tự Hierarchy: Đối tượng nhận click phải nằm dưới cùng trong danh sách con để được vẽ đè lên trên (hoặc dùng `Canvas.sortingOrder`).

---

## 5. LỖI HOẠT HỌA SPINE (SPINE ANIMATION GLITCHES)

### ❌ Lỗi 5.1: Nhân vật Spine bị giật, rách hình hoặc thiếu skin
- **Nguyên nhân**:
  1. Spine Skeleton Data sử dụng tính năng Clipping hoặc Mesh Deform quá phức tạp.
  2. Runtime Spine trong Unity không tương thích với phiên bản export từ Spine Editor.
  3. Lệnh đổi Skin trong C# gọi sai tên Skin hoặc gọi trước khi Skeleton được khởi tạo hoàn tất.
- **Giải pháp**:
  - Đảm bảo gọi `skeletonAnimation.Initialize(true);` trước khi can thiệp vào animation/skin.
  - Khi set animation: Luôn kiểm tra tên animation tồn tại bằng `skeletonDataAsset.GetSkeletonData(true).FindAnimation(animName) != null`.

---

## 6. LỖI DUNG LƯỢNG VƯỢT QUÁ QUY ĐỊNH (SIZE BUDGET EXCEEDED > 3-5 MB)

### ❌ Lỗi 6.1: File zip xuất ra từ Luna quá lớn
- **Nguyên nhân**:
  1. Texture kích thước gốc 2048x2048 hoặc 4096x4096 chưa nén.
  2. File âm thanh chất lượng Stereo với sample rate cao (44.1kHz).
  3. Luna đang đóng gói các asset không dùng (Unused Assets) vào bản build.
- **Giải pháp**:
  - Texture: Hạ Max Size xuống 1024x1024 hoặc 512x512. Bật Crunch Compression hoặc định dạng nén thích hợp.
  - Audio: Bật `Force To Mono`, hạ Quality xuống 60 - 70%.
  - Mở `luna.json`: Loại bỏ các Scene, Prefab hoặc thư viện không dùng khỏi mục asset inclusion.

---

## 7. LỖI NÚT CTA (CALL TO ACTION / ENDCARD CLICK)

### ❌ Lỗi 7.1: Bấm nút Install Full Game không chuyển sang Store
- **Nguyên nhân**:
  - Chưa gọi hàm `Luna.Unity.Playable.InstallFullGame()`.
  - Hoặc nút CTA bị che bởi một lớp Panel mờ (Overlay) có Raycast Target nhưng không có sự kiện click.
- **Giải pháp**:
  - Gắn sự kiện gọi `LunaPlayableBridge.Instance.OnCTAClicked();` vào `Button.onClick`.
  - Trên EndCard, hãy phủ một nút Button toàn màn hình trong suốt để người chơi chạm bất cứ đâu cũng chuyển tới Store.
