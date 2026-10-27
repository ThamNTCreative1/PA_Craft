# QUY TẮC PHÁT TRIỂN UNITY CHO LUNA PLAYABLE ADS (LUNA PLAYABLE RULES)

Tài liệu này định nghĩa các quy tắc bất biến khi viết code C# và thiết lập Scene Unity để biên dịch mượt mà qua trình biên dịch của **Luna Playable Ads (v7.x)**.

---

## 1. QUY TẮC MÃ NGUỒN C# (C# CODING CONSTRAINTS)

### 1.1. Các tính năng C# KHÔNG ĐƯỢC PHÉP DÙNG
1. **Reflection**:
   - CẤM: `System.Reflection`, `Type.GetType()`, `typeof(...).GetMethod()`, `Activator.CreateInstance()`.
   - *Lý do*: Luna chuyển đổi C# sang JS, metadata của Reflection bị lược bỏ hoặc gây crash khi chạy Web.
2. **File I/O & Lưu trữ cục bộ**:
   - CẤM: `System.IO.File`, `Directory`, `BinaryFormatter`, `PlayerPrefs` phức tạp.
   - *Lý do*: Playable Ads chạy trong iframe sandbox của mạng quảng cáo, không có quyền truy cập hệ thống file.
3. **Multi-threading & Asynchronous nâng cao**:
   - CẤM: `System.Threading.Thread`, `Task.Run()`, `ThreadPool`, `async/await` với `UniTask`.
   - *Giải pháp*: Toàn bộ luồng thời gian, delay, animation sequences **BẮT BUỘC dùng Unity Coroutine (`IEnumerator`)**.
4. **Third-party Heavy Frameworks**:
   - CẤM: `Zenject` (DI container), `UniRx`, `Odin Inspector Serializer`.
   - Tất cả tham chiếu cần được gán qua `[SerializeField]` trên Inspector hoặc tìm kiếm 1 lần duy nhất trong `Awake()`.
5. **Dynamic & DLR**:
   - CẤM từ khóa `dynamic`. Mọi kiểu dữ liệu phải được định kiểu tường minh.

---

## 2. QUẢN LÝ BỘ NHỚ VÀ HIỆU NĂNG (ZERO-GC ALLOCATION)

> [!WARNING]
> Mọi lệnh cấp phát bộ nhớ (allocation) trên heap đều kích hoạt Garbage Collection trong JS. Trên các thiết bị di động cấu hình yếu, GC Spike sẽ gây giật khung hình từ 60fps xuống < 20fps.

1. **Tuyệt đối không cấp phát trong `Update()`**:
   - KHÔNG gọi `new List<T>()`, `new WaitForSeconds()`, `new Vector3()`.
   - KHÔNG dùng string concatenation: `"Score: " + score` trong mỗi frame.
2. **Cache Yield Instructions**:
   - Khai báo biến `WaitForSeconds` dùng lại ở cấp class nếu lặp lại nhiều lần:
   ```csharp
   private static readonly WaitForSeconds WaitHalfSecond = new WaitForSeconds(0.5f);
   ```
3. **Cache Components & Cameras**:
   - CẤM gọi `Camera.main` trong `Update()` (hàm này duyệt toàn bộ hierarchy tìm tag "MainCamera").
   - Hãy cache `private Camera _mainCamera;` trong `Awake()`.
4. **Tránh Boxing / Unboxing**:
   - Tránh truyền `enum` vào `Dictionary` không dùng custom comparer trong các phiên bản Unity cũ.
   - Tránh ép kiểu sang `object`.

---

## 3. QUY TRÌNH TƯƠNG TÁC LUNA SDK (LUNA API STANDARDS)

### 3.1. Bắt buộc dùng tiền xử lý `#if LUNA`
Mọi lệnh gọi đến namespace `Luna.Unity` phải được bọc trong directive `#if LUNA`:
```csharp
public static void TriggerWin()
{
#if LUNA
    Luna.Unity.LifeCycle.GameEnded();
#else
    Debug.Log("[Game] OnWin - Luna GameEnded called");
#endif
}

public static void TriggerCTA()
{
#if LUNA
    Luna.Unity.Playable.InstallFullGame();
#else
    Debug.Log("[Game] TriggerCTA - Luna InstallFullGame called");
#endif
}
```

### 3.2. Quy chuẩn biến tùy biến Playground (`[LunaPlaygroundField]`)
1. Đặt thuộc tính trên các field `public`:
   ```csharp
   [LunaPlaygroundField("Countdown Duration")]
   public float countdownTime = 15f;

   [LunaPlaygroundField("Primary BG Color")]
   public Color backgroundColor = Color.white;
   ```
2. Chỉ dùng các kiểu dữ liệu cơ bản: `float`, `int`, `bool`, `string`, `Color`. Không gắn attribute này vào các `GameObject`, `ScriptableObject`, hoặc struct phức tạp.

---

## 4. QUY CHUẨN ĐỒ HỌA & SPINE ANIMATION

1. **Spine Runtime**:
   - Đảm bảo phiên bản Spine Runtime khớp với phiên bản xuất từ Spine Editor (thường là Spine 3.8 hoặc 4.1 tùy dự án).
   - Ưu tiên dùng `SkeletonGraphic` nếu nhân vật nằm hoàn toàn trong UI Canvas. Dùng `SkeletonAnimation` nếu nhân vật nằm trong World 2D.
   - **Shader**: Chỉ sử dụng Spine Shaders hỗ trợ WebGL/Luna (`Spine/SkeletonLit`, `Spine/SkeletonGraphicDefault`, hoặc `Spine/Special/Skeleton`). Cấm dùng Shader có tính năng Tessellation hoặc Compute Shader.
2. **Texture Import Settings**:
   - Texture Type: `Sprite (2D and UI)`.
   - Generate Mip Maps: **OFF** (Playable 2D không cần Mipmaps, bật sẽ tăng 33% dung lượng bộ nhớ).
   - Max Size: 1024x1024 hoặc tối đa 2048x2048 cho Spine Atlas.
   - Compression: Format thích hợp (Crunch Compression hoặc WebGL ASTC/ETC2 tùy cài đặt của Luna).

---

## 5. QUY CHUẨN ÂM THANH (AUDIO GUIDELINES)

1. **Quy tắc Web Audio**:
   - Trình duyệt Safari (iOS) và Chrome (Android) **chặn phát âm thanh tự động** (Autoplay Policy) cho đến khi người dùng chạm vào màn hình lần đầu tiên (First User Interaction).
   - Agent phải đảm bảo hệ thống âm thanh khởi động hoặc mở khóa sau cái chạm đầu tiên (First Touch).
2. **Audio Compression**:
   - Luôn bật **Force To Mono** cho tất cả SFX và Voice over.
   - Compression Format: `Vorbis` với Quality `60% - 70%` hoặc `ADPCM`.
   - Load Type: `Decompress On Load` cho các SFX cực ngắn (< 1s), `Compressed In Memory` cho BGM và Voice dài.

---

## 6. QUY CHUẨN GIAO DIỆN & RESPONSIVE (UI & CAMERA)

1. **Hỗ trợ đa màn hình**:
   - Thiết lập `CanvasScaler`:
     - UI Scale Mode: `Scale With Screen Size`.
     - Reference Resolution: `1080 x 1920` (chuẩn dọc).
     - Match: `0.5` (hoặc `0` nếu muốn fit theo chiều rộng).
2. **Camera Fit Script**:
   - Cần có script điều chỉnh Orthographic Size của Camera khi tỉ lệ màn hình thay đổi giữa Portrait và Landscape (ví dụ: tăng Orhographic size khi xoay ngang để không bị crop 2 bên nhân vật).
3. **Sorting Order & Raycasting**:
   - Chỉ bật `Raycast Target` trên các Image/Text thật sự cần click. Tắt toàn bộ `Raycast Target` trên ảnh nền, icon trang trí để tối ưu hiệu năng tính toán raycast của GraphicRaycaster.
