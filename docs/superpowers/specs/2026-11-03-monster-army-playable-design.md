# Thiết kế: Playable "Monster Army" (SSPGame)

Ngày: 2026-11-03
Repo: `D:\Source\PA_Craft` — nhánh `UAC_V82`
Nguồn asset: `D:\Exploitable Resources\SSPGame\SSPGame`

---

## 1. Ý đồ và lý do

Đây là một **playable ad cho SSPGame** — game pixel sinh tồn/sandbox. Playable
phải làm được một việc: khiến người xem muốn cài game, trong vòng 30 giây, trên
một màn hình họ không chủ động tìm đến.

Cơ chế được chọn là **xây đội quân rồi đánh boss**, mượn từ loop quảng cáo đã
được kiểm chứng (ảnh tham khảo người dùng cung cấp): tap để thêm quái → kéo thả
xếp đội hình → bấm Start → xem trận hỗn chiến. Lý do loop này hiệu quả là nó cho
người xem **quyền tác động và thấy ngay hệ quả**: thả thêm một con quái, màn hình
lập tức nổ nhiều hơn. Cảm giác "mình làm nó mạnh lên" là thứ bán được lượt cài.

Phần art **bắt buộc lấy từ SSPGame**, không phải từ ảnh tham khảo. Ảnh tham khảo
chỉ định nghĩa *luồng chơi*, không định nghĩa *diện mạo*. Người xem bấm cài phải
nhận được đúng game họ vừa nhìn thấy.

### Quyết định cốt lõi của người dùng

**Boss không bao giờ chết.** Playable không có trạng thái thắng. Mọi lượt chơi
kết thúc bằng đúng một đường: `_endTime` hết giờ → `EndGame()` → CTA.

Hệ quả thiết kế: vì người chơi không thể tự tạo ra điểm kết thúc, **nhịp phải tự
nó giữ chân**. Nếu thanh máu boss đứng im, người chơi nhận ra trò bịp trong
khoảng 10 giây và bỏ. Toàn bộ mục 4 tồn tại để giải quyết vấn đề này.

---

## 2. Goals, Non-goals, Anti-goals

### Goals

- Người xem hiểu phải làm gì **trong 3 giây đầu**, không cần đọc.
- Hoàn thành được chuỗi tap → kéo thả → Start mà không bị kẹt (tutorial có khoá).
- Mật độ hiệu ứng nổ tăng rõ rệt theo số quái đã thả — con thứ 10 phải "đã" hơn
  con thứ 3 một cách nhìn thấy được.
- Boss có 3 skill phân biệt được bằng mắt, mỗi skill có telegraph.
- Chạy tốt cả portrait lẫn landscape.
- CTA bật đúng tại `_endTime` (mặc định 30s), expose ra Luna Playground để A/B test.
- Build nhẹ, chạy mượt trên WebGL mobile tầm trung.

### Non-goals

- Không có màn hình thắng. `WinPanel` không dùng.
- Không có màn hình thua. `FailPanel` không dùng. Quái chết thì thả thêm, hết.
- Không có hệ thống cấp độ, tiền tệ, nâng cấp, hay nhiều màn.
- Không có pathfinding thật. Quái đi thẳng về phía boss theo làn.
- Không tái sử dụng VFX 3D có sẵn trong repo (Epic Toon FX, Polygon Arsenal,
  Pixel Arsenal). Lý do ở mục 5.3.

### Anti-goals — những thứ khiến playable này thất bại dù chạy đúng

- **Người xem nhận ra boss bất tử.** Nếu thanh máu hiển nhiên bị kẹt, cảm giác bị
  lừa sẽ triệt tiêu ý định cài đặt. Boss phải *trông như* sắp chết liên tục.
- **Màn hình chết lặng.** Khoảng thời gian nào không có gì nổ là khoảng thời gian
  người xem vuốt đi.
- **Tutorial làm người chơi kẹt.** Khoá quá chặt mà hitbox sai thì người chơi tap
  mà không có gì xảy ra → mất luôn.
- **Art lạc tông.** Trộn particle 3D bóng bẩy vào pixel art làm playable trông
  như quảng cáo cho một game khác.
- **Tụt khung hình khi đông quái.** Người chơi được khuyến khích thả thật nhiều
  quái; nếu thả nhiều làm game giật thì chính cơ chế giữ chân lại phá trải nghiệm.

---

## 3. Ràng buộc

### Kỹ thuật

- Unity **6000.0.60f1**, build qua **Luna Playground 7.2.0** (`luna.json`).
- Phải cắm vào `Playable.GameManager` có sẵn, không viết lại vòng đời kết thúc.
- Namespace `Playable.*`, đặt code dưới `Assets/_Playable_/MonsterArmy/`.
- Theo quy ước repo: **scene dựng bằng Editor script**, không author tay. Xem
  `Assets/_Playable_/TempleRun/Editor/HideSeekSetup.cs` làm mẫu — có sẵn bộ helper
  `Rect` / `Full` / `Img` / `Text` / `Button` và hàm `Sprite(path)` tự cấu hình
  `TextureImporter`. Nhờ vậy scene tái tạo được từ đầu bằng một menu item.
- **Scene đích là `Assets/_Playable_/Scenes/Gameplay.unity`** — đây là scene duy
  nhất Luna build, theo `luna.json` (`unity.scenes`).
- **Nội dung cũ của scene bị xoá hẳn** (người dùng chốt), không phải chỉ
  `SetActive(false)` như `HideSeekSetup` làm. Editor script sẽ dọn sạch mọi root
  rồi dựng lại từ đầu: `MonsterArmyPlayable`, `EventSystem`, `AudioManager`.
  An toàn vì scene đang sạch và đã commit tại `eb0aeb802` — khôi phục bằng
  `git checkout -- Assets/_Playable_/Scenes/Gameplay.unity` bất cứ lúc nào.
- **Không commit.** Người dùng tự quản lý git; công việc dừng ở chỗ code chạy được
  trong editor.
- Trường inspector khai báo **chỉ `[SerializeField]`**, không tự thêm `[TabGroup]`
  — người dùng tự sắp xếp tab.

### Hai vấn đề về asset phải xử lý trước khi code

**3.1 — Âm thanh `.webm` Unity không import được.**
79 file trong `SSPGame\media\` đều là `.webm`. Unity chỉ nhận `.ogg`, `.wav`,
`.mp3`, `.aiff`. `ffmpeg` hiện **không có trên PATH** của máy này.

Xử lý: bước chuẩn bị đầu tiên là cài `ffmpeg` (`winget install Gyan.FFmpeg`) và
chạy batch convert `.webm` → `.ogg` vào `Assets/_Playable_/MonsterArmy/Audio/`.
Chỉ convert khoảng 12 file thực sự dùng, không phải cả 79 — build size quan trọng.

Phương án dự phòng nếu không cài được ffmpeg: dùng các file `.wav`/`.mp3` đã có
sẵn trong `Assets/_Playable_/` (có `explosion.wav`, `monster-roar_8.wav`,
`earthquake-1-big.wav` — đủ cho nổ, gầm, giẫm). Chất lượng khớp tông kém hơn
nhưng không chặn tiến độ.

**3.2 — Sprite sheet không có metadata.**
Các `*-sheet0.png` là atlas đóng gói từ Construct, **không kèm file JSON/XML mô tả
vị trí frame**. Không thể đọc toạ độ sprite theo kiểu thông thường.

Xử lý: viết Editor script dùng `TextureImporter` với
`spriteImportMode = Multiple` và thuật toán slice tự động của Unity
(`SpriteEditorExtension` / grid cho sheet đều, auto-detect cho sheet lộn xộn).
Phân loại:
- `buttonitem-sheet0.png` — lưới đều, ô ~100px, 10 cột → slice theo grid.
- `head`, `zhead`, `body`, `zbody`, `armor`, `helmet`, `hand_*`, `foot_*` — đóng
  gói lộn xộn → auto-detect theo vùng alpha.
- `sprite17-sheet0.png` (nổ) — lưới đều 5 cột × ~1024px → slice theo grid, 15 frame.

### Vận hành

- `_endTime` mặc định **30 giây**, giữ nguyên `[LunaPlaygroundField]` để bên vận
  hành chỉnh được mà không cần build lại.
- Hướng màn hình: **portrait và landscape**, dùng `ResponsiveCanvasScaler` có sẵn.

---

## 4. Vòng lặp chơi

### 4.1 Luồng tổng thể

| Mốc | Diễn ra | Thời lượng |
|---|---|---|
| Intro | Một nhân vật người đứng giữa sàn, một hàng quái đứng chờ bên rìa. Boss lù lù phía xa. Chữ *"Choose your monsters!"* | ~1.5s |
| Tut 1 | Tay chỉ ô đầu thanh chọn quái. Chỉ ô đó nhận chạm. | đến khi tap |
| Tut 2 | Tay kéo từ khu chờ vào một ô lưới sáng. Chỉ ô đó hợp lệ. | đến khi thả |
| Tut 3 | Nút START nhấp nháy, tay chỉ vào. | đến khi tap |
| Trận | Đội quân tiến lên, va vào boss. Boss xoay vòng 3 skill. | liên tục |
| Vòng lặp | Quái chết dần → chữ lớn *"Need more monsters!"* → thanh chọn mở hết → người chơi thả thêm, chiến tiếp | đến hết giờ |
| Kết | `_endTime` về 0 → `EndGame()` → nút block phủ màn → `ShowCTA()` | — |

Sau tut 3, **không còn khoá gì nữa**. Người chơi tự do tap thêm quái và kéo thả
bất cứ lúc nào, kể cả giữa trận. Đây là điểm mấu chốt: không có pha "chờ" nào mà
người chơi không có việc để làm.

### 4.2 Giữ boss bất tử mà không lộ

Ba cơ chế xếp chồng:

1. **Sàn máu.** Máu boss tụt thật theo sát thương nhưng bị chặn ở
   `_minHealthPercent` (mặc định `0.10`). Sát thương bị nhân với hệ số giảm dần
   khi máu tiến gần sàn — về mặt cảm nhận là "boss càng yếu càng lì", một quy ước
   người chơi game đã quen và không thấy bất thường.

2. **Hồi máu gắn vào skill.** Đòn **Roar** của boss hút sinh lực từ xác quái, thanh
   máu nhích lên lại một đoạn kèm hiệu ứng hút màu đỏ. Đây là *lời giải thích
   trong game* cho việc máu không bao giờ cạn. Người chơi quy trách nhiệm cho skill
   của boss, không cho nhà phát triển.

3. **Đẩy ngược về hành động.** Mỗi lần máu chạm vùng đỏ: rung màn hình, thanh máu
   nháy, chữ lớn *"Almost! Need more monsters!"*, và thanh chọn quái phát sáng.
   Thông điệp người chơi nhận được là "thiếu quân", không phải "game gian lận".

### 4.3 Độ hoành tráng tăng theo số quái

`ChaosDirector` theo dõi số quái còn sống và điều chỉnh:

| Số quái sống | Biên độ rung camera | Nổ đồng thời tối đa | Khác |
|---|---|---|---|
| 1–4 | nhẹ | 6 | — |
| 5–9 | vừa | 14 | hiện combo text |
| 10–17 | mạnh | 24 | thêm screen flash khi nổ chùm |
| 18+ | mạnh, liên tục | 32 | viền màn hình rực lửa |

Trần 32 nổ đồng thời là **giới hạn cứng để bảo vệ khung hình** — vượt quá thì các
yêu cầu nổ mới bị gộp vào một vụ nổ lớn hơn thay vì sinh thêm object.

---

## 5. Các phần "làm thế nào" đã chốt

### 5.1 Dựng hình: camera 2D chính tả + Canvas overlay

Sàn đấu, quái, boss, VFX đều là `SpriteRenderer` dưới một camera **orthographic**.
HUD (thanh chọn quái, nút Start, thanh máu boss, lớp tutorial) nằm trên một
`Canvas` `ScreenSpaceOverlay` riêng.

Lý do không làm tất cả bằng UI `Image`: với vài chục unit cộng VFX, mỗi thay đổi
vị trí sẽ bắt Canvas rebuild batch — đúng kịch bản tụt khung hình mà anti-goal cấm.
`SpriteRenderer` không có vấn đề này.

Chiều sâu xử lý bằng **sắp xếp theo trục Y** (`sortingOrder = -round(y * 100)`),
quái đứng dưới che quái đứng trên — đúng phối cảnh 3/4 của ảnh tham khảo.

Kéo thả từ HUD vào sàn dùng `Camera.ScreenToWorldPoint`, tiêu chuẩn.

### 5.2 Quái: paper-doll lắp ghép, hoạt hoạ bằng code

Kho asset cho sẵn bộ phận rời: `head` / `zhead`, `body` / `zbody`, `hand_left`,
`hand_right`, `foot_left`, `armor`, `helmet`. Component `MonsterRig` ghép chúng
lúc chạy từ một `MonsterDefinition` (ScriptableObject).

Hoạt hoạ **viết bằng code, không dùng Animator và không có file `.anim`**:
- Đi: chân đung đưa theo sin, thân nhấp nhô lệch pha.
- Đánh: tween tay vung ra rồi về (DOTween, repo đã có sẵn).
- Chết: xoay ngã + mờ dần + văng mảnh.

Lý do: cần hàng chục biến thể quái nhưng chỉ có vài bộ phận. Hoán vị
đầu × thân × giáp cho ra đủ sự đa dạng thị giác, còn hoạt hoạ bằng code thì **một
lần viết dùng cho mọi biến thể** — không phải author clip cho từng con, và build
không phình thêm.

### 5.3 VFX: chỉ dùng pixel từ SSPGame

`sprite17-sheet0.png` có sẵn **15 frame nổ pixel** — từ quả cầu lửa vàng, cháy
thành than đỏ, rồi tan thành khói đen. `sprite32-sheet0.png` cho mảnh vỡ và máu
văng. `minifireworks-sheet0.png` cho pháo hoa.

Hệ thống nổ dùng **một pool `SpriteRenderer`** chạy qua chuỗi frame, không dùng
`ParticleSystem` cho vụ nổ chính (dùng particle cho mảnh vỡ bay thì được, với
texture pixel).

**Đây là lựa chọn của tôi, không phải điều người dùng yêu cầu**: không đụng tới
Epic Toon FX / Polygon Arsenal / Pixel Arsenal có sẵn trong repo, vì particle 3D
mượt mà đặt cạnh pixel art sẽ phá tông và làm playable trông như quảng cáo cho
game khác — đúng anti-goal đã nêu. Ngoài ra chúng kéo theo shader và texture nặng
không cần thiết.

### 5.4 Năm loại quái

Đúng yêu cầu "khác rõ về đòn đánh", và mỗi loại **nổ một kiểu khác nhau** để màn
hình đa dạng:

| Loại | Vũ khí (từ `buttonitem`) | Cách đánh | Hình nổ |
|---|---|---|---|
| **Brute** | rìu | cận chiến, nhịp nhanh | tia máu đỏ ngắn |
| **Gunner** | AK47 | bắn đạn thẳng tầm xa | chớp đầu nòng + nổ nhỏ khi trúng |
| **Bomber** | lựu đạn | ném vòng cung, sát thương lan | nổ cầu lửa to (chuỗi 15 frame đầy đủ) |
| **Laser** | súng laser | tia xuyên nhiều mục tiêu | vệt sáng + đốm cháy |
| **Tank** | chùy + giáp dày | máu cao, chậm, hút đòn của boss | khói xám khi trúng |

Tank hút đòn là cần thiết: nó giữ cho đội quân sống lâu hơn, nghĩa là màn hình
đông hơn, nghĩa là nổ nhiều hơn.

### 5.5 Boss và ba skill

Boss ghép từ cùng bộ paper-doll nhưng **phóng to ~4 lần**: đầu hươu-sọ từ
`zhead-sheet0`, thân `zbody` nặng nhất, giáp dày. Scale lớn làm nó đọc ra ngay là
"khác loại" mà không cần asset mới.

Chu kỳ skill lặp lại, mỗi đòn có **telegraph khoảng 0.6s** (boss khựng, viền đỏ
sáng dần, có âm báo) trước khi ra tay — để người xem kịp hiểu chuyện gì xảy ra
thay vì thấy quái chết không rõ lý do:

1. **Stomp** — giẫm xuống, sóng xung kích quét ngang hàng đầu. Rung màn hình mạnh.
2. **Fireball Rain** — bắn nhiều cầu lửa rơi xuống các điểm rải rác, mỗi điểm một
   vụ nổ. Đây là đòn tạo nhiều VFX đồng thời nhất.
3. **Roar** — hất tung quái văng ngược về sau, **và hút máu từ xác quái** (cơ chế
   ở mục 4.2.2).

### 5.6 Tutorial có khoá

Component `TutorialDirector` theo mô hình máy trạng thái, mỗi bước gồm: vùng được
phép chạm, bàn tay động, dòng chữ, và điều kiện hoàn thành.

Khoá thực hiện bằng một `Image` trong suốt phủ toàn màn chặn raycast, khoét một lỗ
đúng vùng hợp lệ — không phải bằng cách tắt `interactable` từng nút, vì cách đó
bỏ sót các vùng chạm trên sàn.

Bàn tay tái dùng `Assets/_Playable_/TempleRun/UI/Sprites/hand.png` và quy ước
tween đã có trong `HandTutorial.cs`.

Mỗi bước có **chốt chặn thời gian**: nếu người chơi không thao tác trong 4 giây,
gợi ý được nhấn mạnh thêm (tay to hơn, thêm vòng sáng). Nếu quá 8 giây, bước đó
**tự hoàn thành** và game đi tiếp. Lý do: với playable, kẹt đồng nghĩa với mất
người xem; thà chạy tiếp mà họ chưa hiểu hết còn hơn đứng im.

### 5.7 Cắm vào GameManager

| Trường | Giá trị | Lý do |
|---|---|---|
| `_endTime` | `30` | người dùng chốt |
| `_tapToCtaMode` | `false` | để `Start()` đăng ký `_btnBlock` và chạy đếm ngược |
| `_eggRaisingMode` | `false` | không liên quan |
| `_totalEvent` | `0` | không dùng CTA theo sự kiện; chỉ kết thúc bằng hết giờ |
| `_winPanel` | để trống | không có trạng thái thắng |
| `_failPanel` | để trống | không có trạng thái thua |
| `_gameController` | để trống | không có retry |

Không sửa `GameManager.cs`. Luồng kết thúc đi nguyên qua đường có sẵn:
`IECountdownEndGame()` → `EndGame()` → `_btnBlock` bật → `ShowCTA()` →
`Luna.Unity.Playable.InstallFullGame()`.

### 5.8 Ba điểm tôi tự quyết khi rà lại thiết kế

Những điểm này tài liệu ban đầu để hở, người thực hiện sẽ phải đoán. Tôi chốt ở
đây để không ai đoán sai; người dùng gạt đi được bất kỳ điểm nào.

**Tap thả thẳng xuống sàn, kéo để sắp lại.** Không có "khu chờ" trung gian. Tap
một ô trong thanh chọn → quái xuất hiện ngay tại ô lưới trống gần nhất, kèm hiệu
ứng rơi xuống. Kéo con đã đặt để đổi vị trí. Đây đúng là điều ảnh tham khảo số 2
mô tả — *"Tap to add, drag to place"* — và nó rút ngắn tutorial đi một bước so
với mô hình có khu chờ.

**Không giới hạn số lượng quái, không có chi phí.** Thả được bao nhiêu tuỳ số ô
lưới còn trống. Mọi cơ chế giới hạn (tiền, hồi chiêu, số lượt) đều đi ngược mục
tiêu "càng đông càng đã" và tạo ra khoảnh khắc người chơi bị chặn — thứ playable
không chịu nổi.

**Nhân vật người mở đầu là một unit chiến đấu và hồi sinh vô hạn.** Concept yêu
cầu mở đầu có đúng một nhân vật đứng giữa đám quái chờ. Nhân vật đó không chỉ để
trang trí: nó đánh như một Brute, và khi chết sẽ hồi sinh sau 2 giây. Lý do là
đảm bảo sàn đấu **không bao giờ trống trơn** — nếu người chơi ngừng thả quái và
đội quân bị quét sạch, màn hình chết lặng, đúng anti-goal cần tránh.

### 5.9 Bố cục responsive

Dùng `ResponsiveCanvasScaler` có sẵn, reference `1080×1920`.

- **Portrait**: thanh chọn quái dọc bên trái (như ảnh tham khảo 1–3), boss trên
  cùng, sàn đấu ở giữa, nút START dưới phải.
- **Landscape**: thanh chọn quái vẫn dọc bên trái nhưng ô nhỏ hơn và chia 2 cột,
  sàn đấu trải rộng, boss bên phải, thanh máu boss chạy ngang trên đỉnh.

Camera orthographic chỉnh `orthographicSize` theo tỉ lệ màn hình để sàn đấu luôn
lọt khung ở cả hai hướng.

---

## 6. Để lại cho người thực hiện

Những điểm sau cố tình không chốt trong tài liệu này, người làm tự quyết theo cảm
nhận khi chạy thử:

- Số lượng và vị trí chính xác của ô lưới đặt quái (gợi ý khởi điểm: 6 cột × 4
  hàng ở portrait).
- Chỉ số cụ thể của từng loại quái (máu, sát thương, tốc độ, tầm) — cân bằng bằng
  cách chơi thử, không bằng bảng tính. Tiêu chí: một đợt quái phải sống đủ lâu để
  gặm thấy rõ máu boss, nhưng chết đủ nhanh để người chơi phải thả thêm.
- Thời lượng và thứ tự chu kỳ skill của boss.
- Đường cong giảm sát thương khi máu boss gần sàn.
- Chọn chính xác icon nào trong `buttonitem-sheet0.png` cho từng loại quái.
- Bảng màu và font cho chữ HUD (ưu tiên font đã có trong `Assets/_Playable_/Font/`).
- Danh sách 12 hiệu ứng âm thanh cần convert.

---

## 7. Rủi ro

| Rủi ro | Mức | Xử lý |
|---|---|---|
| Không cài được ffmpeg | thấp | Phương án dự phòng ở mục 3.1 — dùng audio có sẵn trong repo |
| Auto-slice ra sprite sai | trung bình | Kiểm bằng mắt sau khi slice; sheet nào hỏng thì chỉnh tay trong Sprite Editor |
| Tụt khung hình khi đông quái | trung bình | Pool toàn bộ unit và VFX; trần 32 nổ đồng thời; đo bằng Luna profiler |
| Build vượt giới hạn mạng quảng cáo | trung bình | Chỉ import sprite thực dùng; audio mono, nén vorbis chất lượng thấp |
| Người xem vẫn nhận ra boss bất tử | thấp–trung bình | Ba cơ chế xếp chồng ở mục 4.2; nếu vẫn lộ thì hạ `_minHealthPercent` và tăng tần suất hồi máu từ Roar |
