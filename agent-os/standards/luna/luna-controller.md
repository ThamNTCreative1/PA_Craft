# LunaController

Mọi Luna project phải có đúng một controller trung tâm cung cấp các chức năng Luna dùng chung. Các class của project gọi controller theo kịch bản đã được người dùng phê duyệt; controller không tự quyết định thứ tự tutorial, gameplay, Win, Lose, EndCard hoặc CTA.

## Required structure

Thiết kế mặc định đã được phê duyệt:

```text
Tutorial / Gameplay / Result / CTA / other approved classes
                         ↓
             Typed Service Locator
                         ↓
                  LunaController
                         ↓
               Actual Luna API/events
```

- Dùng Service Locator typed, tối giản.
- Không dùng generic service dictionary, reflection hoặc runtime assembly scanning chỉ để locate `LunaController`.
- Không dùng `FindObjectOfType`, `GameObject.Find`, tag lookup hoặc resource scan.
- Nếu project đã có Service Locator phù hợp, tích hợp vào locator đó thay vì tạo locator thứ hai.
- Nếu chưa có locator, proposal phải trình class locator mới và xin duyệt trước khi tạo.

## Responsibility

`LunaController`:

- Cung cấp public functions đã được duyệt để các class khác gọi.
- Map mỗi function sang Luna API/event thật trong project.
- Validate lời gọi và chống gửi event trùng khi cần.
- Giữ state/cờ tối thiểu chỉ để bảo vệ Luna event lifecycle.
- Có logging/diagnostic tối giản trong development nếu đã được duyệt.
- Reset các cờ được phép reset khi project hỗ trợ replay/restart.

`LunaController` không:

- Tự chạy kịch bản.
- Tự chuyển tutorial sang gameplay.
- Tự xác định điều kiện thắng/thua.
- Chứa drag, combat, crafting, animation, audio, UI hoặc VFX logic.
- Tự bật CTA theo timer nếu spec không yêu cầu.
- Tự tìm các class khác trong scene.

## Approved outcome functions

Không outcome function nào mặc định bắt buộc tồn tại. Agent phải đọc kịch bản và Luna integration thật, sau đó trình đúng các function cần dùng để người dùng duyệt. Các hình dạng hợp lệ gồm:

- Win.
- Lose.
- EndCard trực tiếp, không có Win/Lose.
- Gameplay completed rồi EndCard.
- CTA dẫn tới EndCard hoặc store theo integration thật.

Nếu kịch bản có cả Win và Lose, chúng phải là hai function riêng:

```text
NotifyWin()
NotifyLose()
```

Không gộp thành `NotifyGameResult(result)` trừ khi người dùng phê duyệt rõ ràng.

Nếu kịch bản có EndCard, function ví dụ có thể là `ShowEndCard()` hoặc tên phù hợp với API thật. Không tự bịa tên API hay tạo EndCard vì cho rằng playable nào cũng cần.

Mọi outcome function đã duyệt phải:

- Gọi Luna event/API tương ứng đã được xác minh từ integration thật.
- Chống double-fire và các outcome xung đột theo state machine/guard đã được duyệt.
- Không tự hiển thị UI, chạy animation hoặc mở CTA; class theo kịch bản chịu trách nhiệm gọi các function tiếp theo.

## Other functions

Các function khác không được mặc định tồn tại chỉ vì tên có vẻ hợp lý. Với mỗi project, agent phải kiểm tra Luna integration và trình danh sách function để người dùng duyệt, ví dụ chỉ khi API/use case thật sự tồn tại:

```text
Initialize()
NotifyPlayableReady()
NotifyTutorialStarted()
NotifyTutorialCompleted()
NotifyGameplayStarted()
NotifyGameplayCompleted()
RequestCta()
NotifyRestart()
```

Không tự bịa tên API Luna. Public function của controller có thể có tên ổn định, nhưng mapping bên trong phải dựa trên API thật được tìm thấy trong project/package/documentation được phép dùng.

## Consumer rules

Mỗi class sử dụng controller phải được liệt kê trong proposal với:

- Class/file path.
- Function LunaController sẽ gọi.
- Trigger và điều kiện gọi.
- Có được gọi lại hay chỉ một lần.
- Thứ tự với tutorial/gameplay/UI/CTA khác.
- Hành vi nếu controller chưa được đăng ký.

Consumer truy cập qua typed Service Locator, ví dụ về hình thức:

```text
LunaServices.Controller.NotifyWin()
```

Tên locator/property cuối cùng phải được trình và duyệt theo convention của project. Consumer không được gọi Luna SDK/API trực tiếp; mọi call đi qua `LunaController`.

## Lifecycle and registration

- Controller đăng ký vào typed Service Locator trong lifecycle đã được duyệt, thường là `Awake()`.
- Duplicate controller phải fail rõ ràng trong development; không âm thầm thay instance đang hoạt động.
- Controller unregister khi bị destroy nếu locator đang giữ đúng instance đó.
- Initialization order phải được xác minh; consumer không được gọi controller trước khi registration hoàn tất.
- Không tự dùng `DontDestroyOnLoad` nếu playable chỉ có một scene hoặc spec chưa yêu cầu.

## Approval gate

Trước khi tạo/sửa controller hoặc locator, agent phải trình:

1. Class/file list.
2. Public function list.
3. Mapping function → Luna API/event thật.
4. Consumer class → function → trigger table.
5. Duplicate-call policy.
6. Initialization/registration/cleanup.
7. Replay/reset behavior.
8. Outcome flow đã duyệt: Win/Lose/EndCard/CTA nào tồn tại, thứ tự và guard.
9. Verification plan.

Chỉ triển khai sau khi người dùng phê duyệt. Function, consumer hoặc mapping phát sinh ngoài proposal cần xin duyệt lại.

## Verification

- Project chỉ có một active `LunaController`.
- Service Locator trả đúng controller và không dùng runtime search/reflection.
- Không consumer nào gọi Luna API trực tiếp.
- Chỉ các outcome đã duyệt mới tồn tại; nếu có cả Win/Lose thì chúng tách riêng.
- EndCard/CTA chạy đúng thứ tự đã duyệt, không double-fire và không bị kích hoạt bởi cùng pointer release ngoài ý muốn.
- Mỗi function được gọi đúng trigger theo kịch bản đã duyệt.
- CTA không bị gọi bởi cùng pointer release vừa hoàn tất gameplay nếu không được duyệt.
- Restart/replay reset đúng các cờ đã duyệt.
- Kết quả được xác minh trên Luna build, không chỉ Unity Editor.
