# QUY CHUẨN NGỮ CẢNH DỰ ÁN & ĐẦU MỐI KỸ THUẬT CHUNG
## (UNIVERSAL PROJECT CONTEXT & TEAM CONTACTS FOR LUNA PLAYABLE ADS)

Tài liệu này cung cấp khung ngữ cảnh chung (General Context), cấu trúc phân vai nhân sự (Team Contacts) và các quy ước kỹ thuật chuẩn áp dụng cho **mọi dự án Unity Playable Ads sử dụng Luna Plugin** (không phụ thuộc vào bất kỳ một tựa game hay thể loại cụ thể nào).

---

## 1. THÔNG SỐ KỸ THUẬT TIÊU CHUẨN (STANDARD PLAYABLE SPECIFICATIONS)

Bất kỳ dự án Playable Ads nào phát triển trên nền tảng Unity + Luna đều phải tuân theo các chỉ số tiêu chuẩn của ngành quảng cáo tương tác:

| Tiêu chí | Quy chuẩn chung | Ghi chú kỹ thuật |
| :--- | :--- | :--- |
| **Công nghệ nền tảng** | Unity (2020.3 LTS - 2022.3 LTS) + Luna Playable Plugin (v7.x - v8.x) | Biên dịch C# sang WebGL / JavaScript qua Luna Bridge |
| **Đích xuất bản (Networks)** | AppLovin, ironSource (Unity Ads), Mintegral, TikTok, Google Ads, Liftoff, Meta/Facebook | Yêu cầu 1 file đóng gói duy nhất (Single HTML hoặc Single ZIP) |
| **Giới hạn dung lượng (Size Budget)** | **Nén ZIP < 2 MB** (lý tưởng), tối đa **< 3 - 5 MB** (tùy mạng) | Vượt quá 5MB sẽ bị hầu hết các Ad Network từ chối phân phối |
| **Thời gian nạp (Load Time)** | **< 1.5 - 2 giây** trên mạng 3G/4G di động | Playable tải chậm quá 3s sẽ bị người dùng bấm bỏ qua (Drop-off) |
| **Tốc độ khung hình (FPS)** | Ổn định **60 FPS** trên thiết bị tầm trung (Mid-end mobile) | Hạn chế tối đa GC Spike gây đứng hình |
| **Tỉ lệ màn hình (Aspect Ratios)** | **Portrait (9:16)**, **Landscape (16:9)**, **Tablet (4:3 / 3:4)** | Phải tự động co giãn không bị che khuất nội dung cốt lõi |
| **Cấu trúc Scene** | Duy nhất **1 Scene** hoạt động độc lập | Không dùng `SceneManager.LoadScene` |

---

## 2. PHÂN VAI & ĐẦU MỐI KỸ THUẬT (ROLES & CONTACTS)

Trong quy trình sản xuất Playable Ads tiêu chuẩn, Agent cần hiểu rõ trách nhiệm và phạm vi của từng vai trò để phối hợp chính xác:

```text
┌───────────────────────────────────────────────────────────────┐
│                    CREATIVE LEAD / UA LEAD                    │
│   (Kịch bản 3-5s đầu, Điều kiện kích hoạt CTA, Playground)    │
└───────────────────────────────┬───────────────────────────────┘
                                │
        ┌───────────────────────┴───────────────────────┐
        ▼                                               ▼
┌───────────────────────────────┐       ┌───────────────────────────────┐
│   PLAYABLE ADS DEVELOPER      │       │     TECHNICAL ARTIST / 2D/3D  │
│  (Unity Logic, Luna Bridge,   │◄─────►│   (Tối ưu Texture, Spine Atlas│
│   Zero-GC, Scene Setup, CTA)  │       │    VFX, Audio Mono, Shaders)  │
└───────────────────────────────┘       └───────────────────────────────┘
```

### 2.1. Playable Ads Developer / Unity Engineer
- **Phạm vi phụ trách**:
  - Kiến trúc mã nguồn C# tuân thủ nghiêm ngặt giới hạn của Luna Bridge (không Reflection, không Thread, dùng Coroutine).
  - Quản lý vòng đời playable: Bắt đầu game (`GameStarted`), kết thúc game (`GameEnded`), và chuyển đổi Store (`InstallFullGame`).
  - Thiết lập Camera thích ứng đa tỉ lệ màn hình (Responsive Camera & UI Canvas Scaler).
  - Tối ưu hiệu năng Zero-GC: Tránh cấp phát bộ nhớ trong `Update()` và khi đang tương tác kéo thả.
- **Nguyên tắc khi làm việc với AI Agent**:
  - Yêu cầu Agent giữ mã nguồn độc lập, gọn nhẹ, có chú thích rõ ràng.
  - Luôn sử dụng tiền xử lý `#if LUNA` khi gọi các API đặc thù của Luna SDK.

### 2.2. Technical Artist / 2D & 3D Artist
- **Phạm vi phụ trách**:
  - Cung cấp Sprite Sheet, Spine Data, 3D Mesh với kích thước tối ưu nhất (Texture Max Size 1024 hoặc 512).
  - Đảm bảo Material chỉ sử dụng các Shader tương thích WebGL/Luna (Unlit, Mobile Sprites, SpineLit, SpineGraphicDefault).
  - Chuẩn hóa Audio: Ép toàn bộ SFX và Voice về **Mono**, nén Vorbis chất lượng 60% - 70%.
- **Nguyên tắc phối hợp**:
  - Không xuất atlas vượt quá 2048x2048.
  - Không sử dụng các Shader phức tạp (PBR nặng, Shader Graph chưa test trên Luna, Tessellation).

### 2.3. Creative Lead / User Acquisition (UA) Media Buyer
- **Phạm vi phụ trách**:
  - Định nghĩa **Gameplay Hook** (thao tác cuốn hút người xem trong 3 - 5 giây đầu).
  - Xác định quy luật hiện nút Kêu gọi hành động (CTA): Hiện sau X giây, hoặc sau Y bước tương tác, hoặc khi Win/Lose.
  - Liệt kê các tham số linh hoạt cần cấu hình trên web Luna Playground (`[LunaPlaygroundField]`) như: màu sắc nút CTA, thời gian đếm ngược, độ khó, link store.

---

## 3. CẤU TRÚC THƯ MỤC CHUẨN CHO MỌI DỰ ÁN PLAYABLE (GENERIC DIRECTORY CONVENTION)

Mọi dự án Playable Ads nên tuân thủ cấu trúc thư mục tiêu chuẩn sau để dễ dàng bảo trì và tự động hóa:

```text
Project_Root/
├── .agents/                      # Cấu hình, bộ quy tắc & kỹ năng cho AI Agent
│   ├── context/                  # Tài liệu ngữ cảnh chung & phân vai
│   ├── rules/                    # Quy chuẩn lập trình & cẩm nang sửa lỗi
│   └── skills/                   # Các quy trình công việc chuẩn (Workflows)
├── Assets/
│   ├── _Game/ (hoặc _Playable/)  # Toàn bộ tài nguyên phục vụ playable hiện tại
│   │   ├── Audio/                # Âm thanh Mono đã nén gọn
│   │   ├── Fonts/                # Font chữ tinh gọn
│   │   ├── Materials/            # Material dùng Shader WebGL tương thích
│   │   ├── Prefabs/              # Prefab tái sử dụng (Hand hint, CTA, UI)
│   │   ├── Scenes/
│   │   │   └── SampleScene.unity # 1 Scene duy nhất chứa toàn bộ màn chơi
│   │   ├── Scripts/              # Mã nguồn C# tối ưu
│   │   │   ├── Core/             # Audio, Event, State Machine, Timer
│   │   │   ├── Gameplay/         # Logic gameplay tương tác
│   │   │   ├── Luna/             # LunaPlayableBridge, Adapter
│   │   │   └── UI/               # Responsive Canvas, EndCard, CTA Button
│   │   └── Textures/             # Sprites, Atlas tối ưu kích thước
│   └── LunaTemp/                 # Thư mục tạm thời của Luna (không chỉnh sửa tay)
├── luna.json                     # File cấu hình xuất bản của Luna Plugin
└── AGENTS.md                     # File điều hướng ngữ cảnh cấp cao cho Agent
```

---

## 4. NGUYÊN TẮC PHỐI HỢP VỚI AGENT (PAIR PROGRAMMING RULES)
1. **Tính tổng quát (Project-Agnostic)**: Luôn xây dựng code và kiến trúc module hóa để có thể tái sử dụng cho các dự án playable khác.
2. **An toàn bản build (Build-Safe)**: Không thêm thư viện ngoài (Third-party packages) nếu không có sự đồng ý của kỹ thuật viên.
3. **Minh bạch thay đổi**: Khi sửa lỗi hoặc thêm tính năng, luôn giải thích rõ ràng lý do liên quan đến giới hạn của Luna WebGL.
