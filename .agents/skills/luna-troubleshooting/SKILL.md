---
name: luna-troubleshooting
description: >-
  Use this skill to diagnose, debug, and fix build failures, JavaScript runtime exceptions, black/pink screen issues, audio problems, or size budget warnings in Unity projects using the Luna Playable Plugin.
---

# LUNA PLAYABLE ADS TROUBLESHOOTING & REPAIR RUNBOOK

Skill này cung cấp các bước chẩn đoán nhanh và hướng dẫn sửa lỗi khi xảy ra sự cố với Luna Playable Ads.

---

## BẢNG CHẨN ĐOÁN NHANH THEO TRIỆU CHỨNG (QUICK SYMPTOM MATRIX)

| Triệu chứng | Khả năng cao nhất | Tài liệu / Hành động khắc phục |
| :--- | :--- | :--- |
| **Lỗi biên dịch Luna Bridge** | Dùng API C# không hỗ trợ (Reflection, LINQ, Tasks) | Xem Mục 1: Kiểm tra Unsupported C# |
| **Màn hình đen / Không load** | Exception trong `Awake()` hoặc Camera null | Xem Mục 2: Kiểm tra Console F12 |
| **Vật thể màu hồng (Pink)** | Shader không tương thích WebGL/Luna | Xem Mục 3: Đổi Shader nhẹ |
| **Âm thanh im bặt trên di động** | Autoplay policy chặn phát web audio | Xem Mục 4: Trì hoãn phát nhạc đến First Touch |
| **Kéo thả lệch vị trí** | Tính tọa độ sai khi đổi tỉ lệ ngang dọc | Xem Mục 5: Chuẩn hóa Canvas & ScreenPoint |
| **Dung lượng zip quá lớn (>3MB)** | Texture 2048 chưa nén hoặc Audio Stereo | Xem Mục 6: Nén Texture & ép Mono |

---

## 1. XỬ LÝ LỖI BIÊN DỊCH C# CỦA LUNA (COMPILATION ISSUES)

### Các bước kiểm tra:
1. Đọc kỹ dòng báo lỗi trong Console của Unity hoặc tab Build của Luna:
   - Tìm tên file C# và số dòng (ví dụ: `MyScript.cs:42`).
2. Kiểm tra xem dòng đó có chứa các phần tử cấm sau không:
   - `System.Reflection`
   - `System.Threading.Tasks` / `UniTask`
   - `dynamic`
   - `System.IO`
3. Nếu đó là mã dùng cho Editor, bọc lại bằng:
   ```csharp
   #if UNITY_EDITOR && !LUNA
   // Code chỉ chạy trong Unity Editor
   #endif
   ```
4. Nếu mã dùng cho game, viết lại bằng Coroutine (`IEnumerator`) hoặc các giải thuật C# cơ bản.

---

## 2. XỬ LÝ LỖI MÀN HÌNH ĐEN & CRASH TRÊN TRÌNH DUYỆT (BROWSER RUNTIME CRASH)

### Các bước kiểm tra:
1. Mở cửa sổ Developer Tools trên trình duyệt test (`F12` hoặc chuột phải chọn `Inspect` > tab `Console`).
2. Tìm dòng lỗi màu đỏ đầu tiên (First Red Error):
   - Nếu là `NullReferenceException`: Kiểm tra biến nào chưa được gán trên Inspector trong Unity.
   - Nếu là `Cannot read property of undefined`: Một tham chiếu GameObject hoặc Component bị null khi khởi tạo.
3. Kiểm tra Camera trong Scene:
   - Camera `Clear Flags` có đang là `Solid Color` không?
   - `Canvas` có trường `Render Camera` bị trống (`None`) không? Nếu có, hãy kéo Main Camera vào.

---

## 3. XỬ LÝ LỖI SHADER MÀU HỒNG (PINK MATERIAL)

### Các bước kiểm tra:
1. Kiểm tra Material của Sprite hoặc Spine:
   - Tránh dùng Standard PBR, Universal RP Shader nếu Luna chưa cấu hình URP.
2. Đổi Shader về các loại tương thích cao:
   - Đối với Spine 2D: Đổi về `Spine/SkeletonLit` hoặc `Spine/SkeletonGraphicDefault`.
   - Đối với 2D Sprite: Đổi về `Sprites/Default`.
   - Đối với UI: Đổi về `UI/Default`.
3. Vào **Edit > Project Settings > Graphics** > Thêm các Shader trên vào danh sách **Always Included Shaders**.

---

## 4. XỬ LÝ LỖI ÂM THANH BỊ CHẶN (AUDIO PLAYBACK FIX)

### Các bước kiểm tra:
1. Trình duyệt di động (Safari / Chrome) mặc định chặn âm thanh tự động:
   - Không được gọi `audioSource.Play()` trong `Awake()` hoặc `Start()`.
2. Đăng ký phát âm thanh sau cái chạm đầu tiên (First Interaction):
   ```csharp
   private bool _hasInteracted = false;

   private void Update()
   {
       if (!_hasInteracted && (Input.GetMouseButtonDown(0) || Input.touchCount > 0))
       {
           _hasInteracted = true;
           SoundManager.Instance?.PlayBGM();
       }
   }
   ```
3. Kiểm tra file âm thanh trong Unity:
   - Đảm bảo đã tick chọn **Force To Mono**.

---

## 5. XỬ LÝ LỖI KÍCH THƯỚC BẢN BUILD (SIZE BUDGET OPTIMIZATION)

### Checklist giảm dung lượng khẩn cấp:
- [ ] **Texture**:
  - Chuyển toàn bộ Texture `Max Size` về `1024` hoặc `512`.
  - Tắt **Generate Mip Maps**.
- [ ] **Audio**:
  - Bật **Force To Mono**.
  - Đặt Quality Vorbis ở mức **60%**.
- [ ] **Cấu hình `luna.json`**:
  - Kiểm tra các Asset, Font, Scene không dùng tới xem có bị include vào manifest hay không. Xóa bỏ các file không thuộc level hiện hành.
