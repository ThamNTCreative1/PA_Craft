# Cross-Project Logic Reuse

Áp dụng khi người dùng yêu cầu đọc một project nguồn và đưa một tính năng hoặc hành vi sang project đích. Mục tiêu là tái sử dụng **đúng behavior/logic cần thiết**, không sao chép nguyên subsystem cùng code, asset và dependency không liên quan.

## Authorization and boundaries

- Chỉ đọc project nguồn, đường dẫn và feature mà người dùng đã đặt trong phạm vi.
- Mặc định project nguồn là read-only; không sửa, format, migrate hoặc tạo file trong project nguồn.
- Không mở rộng sang project khác hoặc thư mục khác nếu chưa được cho phép.
- Không sao chép secret, credential, analytics key, campaign ID, client data hoặc machine-specific path.
- Kiểm tra license/ownership trước khi sao chép third-party code hoặc asset; nếu không rõ quyền tái sử dụng, báo cáo và dừng.

## Core rule

Không copy-paste class hoặc thư mục nguồn nguyên trạng. Trước hết phải tách:

```text
Behavior cần giữ
≠
Implementation và dependency riêng của project nguồn
```

Agent phải loại bỏ mọi dòng code, field, method, event, import, dependency, asset reference và configuration không góp phần trực tiếp vào behavior đã được người dùng xác nhận.

## Gate A — Source logic understanding

Trước khi viết hoặc lấy bất kỳ code nào, agent chỉ được khảo sát project nguồn và phải trình bày:

### Source inventory

- Project/path nguồn đã đọc.
- Entry point của feature.
- Class, method và file trực tiếp tham gia.
- Scene/prefab/GameObject/component liên quan.
- Data/config liên quan.
- Event/input/state transition.
- Asset/material/animation liên quan.
- Package hoặc utility mà logic phụ thuộc.

### Behavior contract

Mô tả logic bằng ngôn ngữ độc lập với source code:

- Input/precondition.
- Các bước xử lý theo thứ tự.
- State được đọc và thay đổi.
- Output/event/side effect.
- Success/failure/edge cases.
- Timing, coroutine/tween hoặc animation dependency.

### Logic extraction table

Agent phải phân loại từng phần quan trọng:

| Source element | Keep / Adapt / Remove | Reason |
|---|---|---|
| Class/method/field/dependency | lựa chọn | liên quan thế nào đến behavior |

Các nội dung thường phải loại bỏ nếu không thuộc behavior đã yêu cầu:

- Analytics, tracking và monetization.
- CTA/campaign ID riêng của project nguồn.
- Debug code, logging dư và editor-only helper.
- UI, VFX, audio hoặc animation không thuộc tính năng cần lấy.
- Save/load hoặc progression riêng.
- Singleton/service/global state không cần thiết.
- Scene name, tag, layer và resource path hard-coded.
- Runtime object lookup bị Luna cấm.
- New Input System; phải adapt về Legacy Input nếu feature cần input.
- Lit/custom/URP/HDRP material hoặc shader; phải adapt theo Built-in Unlit standard.
- Package, extension method hoặc generic framework chỉ dùng vì cấu trúc project nguồn.
- Code workaround chỉ phục vụ bug/kiến trúc cũ của project nguồn.

### Confirmation question

Agent phải dừng và hỏi rõ:

```text
Tôi hiểu logic cần lấy là: <behavior contract>.
Tôi sẽ giữ: <danh sách>.
Tôi sẽ loại bỏ hoặc thay thế: <danh sách và lý do>.
Bạn xác nhận tôi đã xác định đúng logic nguồn chưa?
```

Chỉ sau khi người dùng trả lời rõ “đúng”, “OK”, “đồng ý” hoặc sửa lại behavior contract, Gate A mới hoàn thành. Nếu người dùng sửa cách hiểu, agent phải cập nhật toàn bộ extraction table và xin xác nhận lại.

## Gate B — Target integration design

Sau khi Gate A được duyệt, agent mới được thiết kế cách tích hợp vào project đích. Proposal phải tuân thủ `approval-gates-and-change-control.md` và bao gồm:

- Project/path đích.
- Class/file mới và class/file sẽ sửa.
- Trách nhiệm, serialized fields, methods, events và lifecycle của từng class.
- Mapping từ source behavior sang target component.
- Dependency nguồn nào được bỏ, dependency đích nào được sử dụng.
- Cấu trúc Data → Logic → View.
- Input/touch adaptation.
- Tutorial/CTA integration nếu liên quan.
- Asset/material/animation adaptation.
- Luna compatibility và ảnh hưởng budget 4.5 MB.
- Acceptance criteria và verification plan.

Agent phải dừng lần hai và hỏi người dùng phê duyệt thiết kế tích hợp. Gate A không tự động phê duyệt Gate B.

## Implementation rules after both approvals

- Chỉ triển khai behavior contract đã duyệt và target design đã duyệt.
- Ưu tiên viết implementation tối giản phù hợp kiến trúc project đích thay vì giữ hình dạng class của project nguồn.
- Chỉ copy nguyên method/block khi toàn bộ block cần thiết, license cho phép và không mang dependency dư.
- Khi một block chứa cả logic cần giữ và code không liên quan, phải viết lại phần tối thiểu thay vì copy rồi để code chết.
- Không giữ unused field, method, namespace, package, event hoặc serialized reference.
- Không thêm compatibility wrapper chỉ để tránh loại dependency nguồn nếu viết logic trực tiếp đơn giản hơn.
- Không thay đổi project nguồn.

## Mandatory re-confirmation

Trong lúc triển khai, phải dừng và quay lại Gate A hoặc Gate B nếu phát hiện:

- Behavior thực tế khác behavior contract đã được duyệt.
- Có class/method quan trọng chưa được phân tích.
- Một phần bị đánh dấu Remove thực ra ảnh hưởng output.
- Cần lấy thêm feature hoặc subsystem từ project nguồn.
- Cần thêm dependency/package/asset ngoài proposal.
- Không thể giữ behavior nếu không thay đổi kiến trúc đích.
- Source logic chứa bug hoặc hành vi mơ hồ.

Không tự “sửa luôn” bug của source. Báo bug, tác động và các lựa chọn: giữ nguyên behavior, sửa khi port, hoặc loại bỏ.

## Verification

- So sánh target behavior với behavior contract, không chỉ so sánh code.
- Nếu có thể, tạo cùng input/state ở source và target rồi đối chiếu output/event.
- Test success, failure, cancel, repeated input và edge cases đã liệt kê.
- Xác minh target không còn dependency nguồn ngoài danh sách được duyệt.
- Quét unused code/import/serialized field và prohibited Luna API.
- Xác minh Legacy Input, Built-in Unlit, tutorial state và budget khi liên quan.

## Completion report

Báo cáo cuối phải gồm:

- Logic nguồn đã được người dùng xác nhận.
- Source element đã giữ/adapt/remove.
- Target files/classes đã tạo hoặc sửa.
- Dependency đã loại bỏ.
- Khác biệt behavior có chủ ý và phê duyệt tương ứng.
- Evidence xác minh behavior.
- Phần chưa thể xác minh.
