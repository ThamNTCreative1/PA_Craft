# Thiết kế: Playable "Cart Rescue" (Brainrot 3D: Animal Hunt)

Ngày: 2026-11-16
Repo: `D:\Source\PA_Craft`, nhánh `OBP_V08`
Nguồn asset: `D:\Exploitable Resources\com.brainrot3d.animalhunt` (Unity WebGL build, `assets/game/Build/*.data.br`)

---

## 1. Ý đồ và lý do

Đây là playable ad cho game **Brainrot 3D: Animal Hunt**. Các nhân vật Brainrot bị mắc kẹt, người chơi dùng một chiếc xe để chở họ ra ngoài. Hình tham khảo người dùng gửi chỉ quy định **luồng chơi** (kéo dây, kéo xe, bấm Start). Diện mạo phải lấy từ chính game: nhân vật voxel 3D, xe, trực thăng, thùng hàng. Người xem bấm cài phải nhận đúng game mà họ vừa thấy.

Cảm giác cần bán được: **"mình đang giữ thăng bằng cho cả đám"**. Xe lắc lư, nhân vật trượt, người chơi giật xe để cứu. Phần này phải vui và luôn có cách gỡ.

### Quyết định cốt lõi của người dùng

- **Không có trạng thái thua.** Nhân vật không bao giờ rơi khỏi xe. Xe chỉ nghiêng, nhân vật trượt, người chơi kéo xe để cân lại.
- **Vật lý tự viết bằng script (cách A)**, không dùng Rigidbody/Joint của Unity.
- **Cân xe bằng cách kéo xe trái/phải.** Gia tốc của xe tạo lực quán tính làm nhân vật trượt ngược chiều. Cùng một cử chỉ này dùng cho bước cuối là kéo xe sang phải.

---

## 2. Luồng chơi

```
[Mở]  Xe đứng giữa-trái màn hình, 3 nhân vật đứng giãn đều trên sàn xe (xe nằm ngang), còn chỗ cho 1 người.
      Trực thăng lơ lửng phía trên, treo nhân vật thứ 4 bằng dây.
      Bàn tay hướng dẫn: nắm nhân vật treo → kéo xuống ô trống.
  │
  ▼ Người chơi kéo nhân vật treo (dây căng theo ngón tay, nhân vật đung đưa)
  │  Thả gần sàn xe → nhân vật hút vào sàn tại vị trí thả (không nhất thiết đúng ô trống)
  │  Dây đứt/nhả, trực thăng bay lên khỏi màn hình
  ▼
[Mất cân bằng]  Tải lệch → xe nghiêng về phía nặng, nhân vật bắt đầu trượt
      Bàn tay hướng dẫn: kéo xe qua lại (mũi tên ↔)
  │
  ▼ Người chơi kéo xe trái/phải; quán tính đẩy nhân vật trượt ngược chiều
  │  Khi xe gần thăng bằng + đứng yên ~0.5s → mỗi nhân vật dạt vào ô trống gần nhất
  ▼
[Ổn định]  Hiện chữ/tay hướng dẫn: kéo xe sang phải
  │  Xe qua mốc X bên phải và vẫn ổn định → nút START bật ra (pop)
  ▼
[Start]  Xe tự chạy sang phải, bánh quay, camera bám theo, nhân vật nhún nhảy
  │  Đi gần hết màn → Win (âm Win + panel/chữ WIN) → GameManager.ShowWinPanel() → store
```

Nếu người chơi không làm gì: `GameManager._endTime` (mặc định 30s, cấu hình qua Luna Playground) vẫn kết thúc game theo luồng chuẩn của repo.

---

## 3. Goals, Non-goals, Anti-goals

### Goals
- Hiểu phải làm gì trong 3 giây đầu nhờ bàn tay hướng dẫn, không cần đọc chữ.
- Xe lắc và nhân vật trượt **thấy rõ, vui mắt**, nhưng người chơi luôn cân lại được trong vài giây.
- Chạy được cả màn dọc lẫn ngang trên Luna (WebGL mobile tầm trung).
- Toàn bộ scene sinh ra bằng script Editor qua menu, giống quy ước của BrainrotPlayground.

### Non-goals
- Không có ragdoll tay chân. Nhân vật là mesh tĩnh, chỉ đung đưa hoặc xoay nguyên khối.
- Không dùng Physics/Physics2D của Unity cho gameplay.
- Không có màn hình thua, không retry, không nhiều màn.
- Không có đạo cụ nổ (bom, lựu đạn trong hình tham khảo).

### Anti-goals (chạy đúng mà vẫn thất bại)
- Nhân vật chồng lên nhau, lọt qua sàn, hoặc văng khỏi xe. Vi phạm luật cứng.
- Xe lắc mãi không cân được, người chơi kẹt và bỏ.
- Xe cứng đờ, không có cảm giác lắc. Khi đó thử thách trở nên vô nghĩa.
- Trông giống bản sao của game trong hình tham khảo. Art phải là Brainrot voxel.

---

## 4. Ràng buộc

- Unity + Luna 7.2.0. Script trong `**/Editor/` bị loại khỏi build Luna.
- Scene đích: `Assets/_Playable_/Scenes/Gameplay.unity` (bị xoá sạch và dựng lại, khôi phục bằng `git checkout`).
- Dùng `GameManager` có sẵn (`ShowWinPanel`, `EndGame`, `ShowCTA`, `_endTime`) và `AudioManager`.
- DOTween có sẵn trong project và dùng được.
- Cách khai báo field: chỉ dùng `[SerializeField] private`. Người dùng tự sắp `[TabGroup]`.

---

## 5. Các cách đã cân nhắc

| Cách | Mô tả | Đánh đổi |
|---|---|---|
| **A. Vật lý tự viết (đã chọn)** | Góc nghiêng xe là lò xo có giảm chấn, phụ thuộc mô-men tải và gia tốc xe. Nhân vật trượt 1 chiều dọc sàn, có chặn hai đầu, đẩy nhau ra khi chạm. Dây là con lắc tự viết. | Kết quả ổn định, dễ chỉnh, chắc chạy trên Luna, đảm bảo được luật "không rơi" và "không chồng". Đổi lại phải chỉnh thông số để có cảm giác tự nhiên. |
| B. Physics2D + model 3D | Rigidbody2D, WheelJoint2D, DistanceJoint2D | Chuyển động tự nhiên hơn, nhưng dễ mất ổn định và phải chặn nhiều mới giữ được luật. Kết quả không lặp lại được. |
| C. Physics 3D khoá trục Z | Rigidbody + Joint 3D | Luna hỗ trợ joint 3D hạn chế, kém ổn định nhất. Loại. |

Cách cân xe: **kéo trái/phải (đã chọn)**, không dùng nắm một đầu để nghiêng (sẽ thành hai cử chỉ khác nhau và tutorial dài hơn).

---

## 6. Thiết kế chi tiết

### 6.1 Asset pipeline

1. Script Python (chạy ngoài Unity, dùng `brotli` + `UnityPy`) giải nén `.data.br`, xuất:
   - Mesh nhân vật đã chọn, xe, trực thăng và đạo cụ ra `.obj`. Texture tương ứng ra `.png`.
   - Sprite `TutorialFinger` và icon nhân vật nếu cần cho UI.
   - AudioClip: `Win`, `action_jump`, `Button`, `tralalelotheme` (BGM).
   - Đích: `Assets/_Playable_/CartRescue/Source/`. Script lưu tại `Assets/_Playable_/CartRescue/Tools~/extract_assets.py` (thư mục `~` để Unity không import).
2. Script Editor `CartRescueSetup.cs` (menu `Tools/Cart Rescue/Setup Playable`) tạo material, prefab và dựng scene, giống `BrainrotPlaygroundSetup`.

Asset dự kiến (tên mesh trong build):
- **Xe:** `golf-cart-base` + 4 bánh `golf-cart-wheel_*`. Dự phòng: `jeep-open-*`. Sàn chở người làm bằng `log`/`crate-supply` ghép thêm nếu thân xe không có mặt phẳng đủ rộng.
- **Drone:** `helicopter-base` + `helicopter-propeller-main` (quay liên tục).
- **Nhân vật (4):** Tralalelo, TaTaTaTaSahur, CappuccinoAssasino, BombardiroCrocodilo. Nhân vật treo là Tralalelo. Chọn lại được nếu mesh nào lỗi hoặc quá to/quá dị dạng.
- **Môi trường:** nền xám như hình tham khảo (2 mặt phẳng: sàn + tường), rải `crate-supply`, `barrel`, `package-box` dọc đường làm cảnh trang trí. Mốc đích bên phải: `fence-start` hoặc `flag-golf_red`.

### 6.2 Camera và hệ toạ độ
- Camera **trực giao**, nhìn ngang theo trục -Z, hơi chếch xuống khoảng 10° để thấy khối 3D. Mọi gameplay diễn ra trên mặt phẳng XY.
- Kích thước ortho tự chỉnh theo tỉ lệ màn hình sao cho xe và trực thăng luôn nằm gọn trong khung (theo kiểu `PlaygroundCamera`).
- Giai đoạn chạy: camera bám X của xe (lerp).

### 6.3 Mô hình vật lý tự viết (`CartBody`)
Trạng thái: `x`, `vx` (vị trí và vận tốc ngang của xe), `θ`, `ω` (góc nghiêng và vận tốc góc).

- **Kéo xe:** khi người chơi nắm xe, `x` bám theo ngón tay bằng lò xo cứng (`k_drag`) có giới hạn tốc độ. Thả tay thì xe trôi rồi dừng nhờ ma sát. `x` bị kẹp trong biên trái/phải của màn chơi.
- **Gia tốc xe:** `a = Δvx/Δt`, làm mượt qua low-pass.
- **Mô-men nghiêng:** `τ = Σ mᵢ·(sᵢ − pivot)·k_load − a·k_inertiaTilt − k_spring·θ − k_damp·ω`. Ở đây `sᵢ` là vị trí của nhân vật i dọc sàn. `θ` bị kẹp trong ±`maxTilt` (khoảng 18°), là xe nghiêng trên nhíp chứ không lật.
- **Khối lượng:** mọi nhân vật có cùng `m` (quyết định của người build, đơn giản hoá cân bằng).
- **Trạng thái đầu (thăng bằng):** 3 nhân vật đứng tại `s = −1, 0, +1` (đơn vị bằng bề rộng ô), không trùng tâm ô. Mô-men bằng 0, xe nằm ngang. Ma sát tĩnh giữ họ đứng yên.
- **4 ô đích** đặt đối xứng tại `s = −1.5, −0.5, +0.5, +1.5`. Đủ 4 nhân vật ở 4 ô thì tổng mô-men bằng 0, xe nằm ngang. Đó chính là trạng thái "đứng vững".
- **Vì sao có thử thách:** nhân vật thứ 4 thả xuống với vận tốc khiến xe nghiêng. Nhân vật trượt về phía thấp và **dồn cục ở một đầu**, mô-men lệch nên xe giữ nghiêng và **không tự cân lại**. Người chơi phải giật xe về phía thấp; quán tính đẩy cả nhóm trượt ngược lên và giãn ra. Khi xe gần nằm ngang thì gán ô (6.4). Nếu người chơi đứng im, tay hướng dẫn hiện lại sau 2s; không có cơ chế tự cân.

### 6.4 Nhân vật trên sàn (`DeckRider`)
- Mỗi nhân vật có toạ độ 1 chiều `s` dọc sàn, vận tốc `v` và nửa bề rộng `w`.
- `v += (g·sin θ − a·k_inertiaSlide) dt`, cộng thêm ma sát. Có ngưỡng ma sát tĩnh: khi `|θ|` nhỏ thì không trượt.
- **Chặn hai đầu sàn:** `s` bị kẹp trong `[deckMin + w, deckMax − w]`, chạm thành thì nảy nhẹ. Đây là bảo đảm "không rơi".
- **Không chồng nhau:** sau mỗi bước, sắp các nhân vật theo `s` và tách cặp chồng nhau (đẩy đều hai bên, triệt vận tốc tương đối). Sàn có 4 ô; tổng bề rộng nhân vật nhỏ hơn bề rộng sàn để luôn có lời giải.
- **Ổn định:** khi `|θ| < settleAngle` và `|vx|` nhỏ liên tục `settleTime` (0.5s), mỗi nhân vật được gán ô gần nhất (gán tham lam theo thứ tự trái sang phải, không trùng ô) rồi tween trượt vào tâm ô. Sau đó trạng thái chuyển thành "ổn định".
- **Khoá ô sau khi ổn định:** khi đã ổn định, mỗi nhân vật bám ô của mình bằng một ngưỡng ma sát tĩnh cao hơn. Chỉ khi gia tốc xe vượt `unlockAccel` (giật mạnh) thì nhân vật mới mở khoá và trượt lại, khi đó trạng thái lùi về `Balance`. Kéo xe sang phải một cách bình thường **luôn an toàn**.
- Hình ảnh: nhân vật nghiêng theo xe. Khi trượt nhanh thì lắc lư nhẹ (xoay Z theo vận tốc) và nhún.

### 6.5 Dây và trực thăng (`RopeHang`)
- Trực thăng lơ lửng, nhấp nhô nhẹ, cánh quạt quay.
- Dây vẽ bằng `LineRenderer` (hoặc chuỗi khối voxel) từ trực thăng đến nhân vật.
- Khi chưa nắm: nhân vật là con lắc tự viết, đung đưa nhẹ.
- Khi nắm (chạm trúng nhân vật treo hoặc dây): nhân vật bám theo ngón tay, độ dài dây kẹp tối đa `ropeMax` (dây giãn được tới sàn xe). Nhân vật xoay theo hướng dây.
- Khi thả: nếu điểm thả nằm trong vùng phía trên sàn xe, nhân vật tween rơi xuống sàn tại `s` gần nhất hợp lệ, tách khỏi dây và trở thành `DeckRider` có vận tốc ban đầu. Dây thu lên, trực thăng bay khỏi màn hình. Nếu thả ngoài vùng, nhân vật bật về vị trí treo.

### 6.6 Hướng dẫn (`TutorialHand`)
Dùng sprite `TutorialFinger` từ game. Tay lặp lại từng bước:
1. Từ nhân vật treo kéo xuống ô trống (kèm vệt mờ hoặc mũi tên).
2. Sau khi thả xuống, nếu xe chưa ổn định: tay kéo xe qua lại (↔).
3. Khi đã ổn định: tay kéo xe sang phải tới mốc.
4. Khi nút Start hiện: tay chạm nút Start.

Tay ẩn ngay khi người chơi chạm, và hiện lại sau khoảng 2s không có tương tác ở bước hiện tại.

### 6.7 Chạy và Win (`CartRescueController`)
- Bấm Start: khoá input, xe tự chạy sang phải với tốc độ tăng dần, bánh quay theo `vx`. Nhân vật vẫn chạy mô hình trượt, nhưng hệ số quán tính giảm để không trượt mạnh. Camera bám theo.
- Khi `x` qua mốc đích (khoảng 85% chiều dài đường): phát âm `Win`, hiện chữ WIN (pop-in), rồi gọi `GameManager.ShowWinPanel()` (hàm này tự `EndGame` và hẹn `ShowCTA`).

### 6.8 State machine
`HangDrop → Balance → PushRight → StartReady → Driving → Win`

- Tín hiệu mất ổn định duy nhất: một nhân vật mở khoá ô (6.4). Khi đó trạng thái lùi về `Balance` và nút Start (nếu đang hiện) ẩn đi.

### 6.8b Input
- Trong `HangDrop`: chỉ nhân vật treo và dây nhận chạm (vùng chạm nới rộng). Xe chưa kéo được, để tập trung vào bước hướng dẫn đầu tiên.
- Từ `Balance` trở đi: **kéo ở bất kỳ đâu trên màn hình** đều kéo xe (theo delta X của ngón tay), không cần chạm trúng xe. Lý do: xe nhỏ trên màn dọc.
- Trong `StartReady`: chạm vào nút Start thì bấm Start; kéo ở chỗ khác vẫn kéo xe.

### 6.8c Thời gian và CTA
- Giữ cơ chế `_endTime` của `GameManager` (đếm từ lúc load, cấu hình qua Luna). Mặc định đặt **40s**, vì 30s dễ cắt ngang người chơi đang làm.
- Khi bấm Start: gọi `GameManager.DeferCountdownUntilGameplay()` để huỷ đếm giờ. Đoạn chạy và Win luôn được diễn hết.
- Hết giờ thì dùng hành vi hiện có của GameManager (`_storeOnEndTime = true` như BrainrotPlayground).
- `StartReady` cần đủ ba điều kiện: đủ 4 nhân vật trên xe, xe ổn định, và `x ≥ startGateX`.
- (Cập nhật theo người dùng) Kéo xe qua mốc là nút START hiện ngay và **ở lại** kể cả khi xe trôi lùi sau mốc; chỉ ẩn khi nhân vật bật khỏi ô. Bước `PushRight` có bàn tay kéo sang phải + mũi tên lớn chỉ sang phải phía trên xe.

### 6.9 Thành phần (script runtime)
`Assets/_Playable_/CartRescue/Scripts/`
- `CartRescueController`: state machine, nối các phần, gọi GameManager.
- `CartBody`: xe, kéo xe, góc nghiêng, bánh.
- `DeckRider`: một nhân vật trên sàn.
- `DeckSolver`: tích phân trượt, chặn thành, tách chồng, gán ô.
- `RopeHang`: trực thăng, dây, nắm/thả.
- `TutorialHand`: tay hướng dẫn.
- `CartRescueCamera`: ortho fit + bám theo.
- `PointerInput`: gom chạm/chuột thành pointer world-space (raycast lên mặt phẳng Z=0).

Mọi thông số chỉnh tay (`k_*`, `maxTilt`, `settleAngle`, `startGateX`, `finishX`, tốc độ chạy) là `[SerializeField] private` trên component tương ứng.

`Assets/_Playable_/CartRescue/Editor/CartRescueSetup.cs`: dựng toàn bộ scene và gán reference.

---

## 7. Phần để lại cho người build
- Giá trị cụ thể của các hệ số vật lý: chỉnh trong Play Mode cho đến khi đạt các Goals.
- Tỉ lệ scale của từng mesh nhân vật so với sàn xe.
- Chi tiết bố trí UI (vị trí nút Start, chữ WIN), miễn là đúng ở cả màn dọc lẫn ngang.
- Có dùng `LineRenderer` hay chuỗi khối voxel cho dây.
- Thay xe hoặc nhân vật khác trong danh sách asset nếu mesh xuất ra bị lỗi.

## 8. Cách kiểm tra
- Play Mode trong Editor: đi hết luồng ở cả 16:9 dọc và ngang.
- Thử phá: giật xe hết tốc lực qua lại 10 giây. Không nhân vật nào được rời sàn hay chồng nhau.
- Thả nhân vật treo ở rìa sàn, giữa sàn, và ngoài vùng.
- Không làm gì 30s: GameManager vẫn kết thúc game.
- Build Luna không lỗi compile.
