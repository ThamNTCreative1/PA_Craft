# Human Approval Gates and Change Control

Con người giữ quyền quyết định cuối cùng. AI agent không được tự chọn kiến trúc, tạo/sửa/xóa implementation hoặc xử lý vấn đề phát sinh nếu chưa trình bày và nhận được phê duyệt rõ ràng.

## Default operating mode

Trước khi được phê duyệt, agent chỉ được:

- Đọc instruction, standards, specs và source hiện tại.
- Kiểm tra Git status/diff theo cách read-only.
- Tìm kiếm code và dependency.
- Phân tích scene, prefab, asset và cấu hình theo cách không thay đổi dữ liệu.
- Chạy diagnostic/read-only check không tạo hoặc sửa artifact trong project.
- Viết đề xuất trong cuộc trò chuyện; không ghi implementation vào repository.

Agent không được mặc định coi yêu cầu “hãy làm tính năng X” là phê duyệt cho một thiết kế chưa được trình bày. Trình bày thiết kế trước, chờ người dùng xác nhận, sau đó mới triển khai.

## Mandatory design proposal

Trước mọi thay đổi code, scene, prefab, material, animation, asset import, project setting, package hoặc build configuration, agent phải trình proposal gồm:

Nếu nhiệm vụ lấy logic từ project khác, trước proposal này phải hoàn thành Gate A xác nhận cách hiểu source logic trong `cross-project-logic-reuse.md`. Sau đó proposal tích hợp là Gate B. Hai cổng duyệt độc lập.

### 1. Objective and scope

- Kết quả cần đạt.
- Hành vi hiện tại và hành vi mong muốn.
- In-scope và out-of-scope.
- Giả định cần người dùng xác nhận.

### 2. File and asset change list

Liệt kê chính xác theo nhóm:

- File/class mới.
- File/class sẽ sửa.
- File/class dự kiến xóa hoặc thay thế.
- Scene, prefab và GameObject/component thay đổi.
- Blender/model/texture/material/animation thay đổi.
- Project settings, package hoặc build configuration thay đổi.

Không dùng mô tả mơ hồ như “sửa các file liên quan”. Nếu chưa xác định được file, phải khảo sát thêm trước khi xin duyệt.

### 3. Class design

Với mỗi class mới hoặc sửa đáng kể, nêu:

- Tên class và file path.
- Trách nhiệm duy nhất.
- `MonoBehaviour`, `ScriptableObject`, POCO hoặc loại khác.
- Interface/base class nếu có và lý do thật sự cần.
- Serialized fields và dependency.
- Public API/method quan trọng.
- Event phát ra và event lắng nghe.
- Unity lifecycle method được dùng.
- Class/component nào gọi nó và nó gọi gì.
- Cách khởi tạo và cleanup.

Không tạo interface, manager, service hoặc abstraction chỉ vì “có thể cần sau này”.

### 4. Structure and data flow

Trình bày:

- Cây thư mục/file dự kiến.
- Quan hệ Data → Logic → View.
- Input flow từ Legacy Input đến gameplay.
- Tutorial/gameplay/CTA state transition nếu liên quan.
- Asset flow Blender → Unity → Luna nếu liên quan.
- Dữ liệu đi từ source đến destination như thế nào.

Dùng sơ đồ text ngắn khi có từ ba component phụ thuộc trở lên.

### 5. Alternatives and recommendation

- Nêu ít nhất các phương án thực sự khả thi khi có quyết định kiến trúc đáng kể.
- Với mỗi phương án, nêu trade-off về độ đơn giản, Luna compatibility, build size, maintainability và rủi ro.
- Đánh dấu phương án đề xuất và giải thích vì sao.
- Không tự chọn thay người dùng khi trade-off có thể thay đổi sản phẩm hoặc cấu trúc hệ thống.

### 6. Verification plan

- Test/compile/build sẽ chạy.
- Acceptance criteria.
- Kiểm tra trong Unity Editor.
- Kiểm tra Luna build.
- Kiểm tra API, input, material, tutorial và budget 4.5 MB khi liên quan.

## Approval requirement

Sau proposal, agent phải kết thúc bằng câu hỏi phê duyệt rõ ràng, ví dụ:

```text
Bạn có phê duyệt thiết kế và danh sách thay đổi trên để tôi bắt đầu triển khai không?
```

Chỉ phản hồi rõ ràng như “đồng ý”, “OK”, “approve”, hoặc chỉ định sửa proposal mới được coi là quyết định.

- Im lặng, câu hỏi tiếp theo hoặc thảo luận thêm không phải phê duyệt.
- Phê duyệt chỉ áp dụng cho scope, file và thiết kế đã trình bày.
- Nếu người dùng sửa proposal, agent phải phản ánh thay đổi và xin duyệt bản cuối trước khi implement.
- Không được chia nhỏ hành động để né approval gate.

## Implementation after approval

Sau khi được duyệt, agent được thực hiện đúng proposal và phải:

- Giữ thay đổi trong danh sách file/asset đã duyệt.
- Không tự thêm class, dependency, package, shader, material variant hoặc subsystem ngoài kế hoạch.
- Báo tiến độ dựa trên task đã duyệt.
- Chạy verification đã duyệt.
- Không commit, push, merge, publish hoặc upload nếu việc đó chưa được duyệt riêng.

## Mandatory re-approval

Agent phải dừng ngay và xin duyệt lại nếu phát hiện:

- Cần thêm, xóa hoặc đổi trách nhiệm class ngoài proposal.
- Cần sửa file, scene, prefab, material hoặc asset ngoài danh sách.
- Cần thay kiến trúc, data flow, public API hoặc dependency.
- Cần thêm package, custom tool, shader hoặc third-party asset.
- Spec mâu thuẫn code hiện tại.
- Test/build thất bại và cách sửa làm thay đổi thiết kế hoặc scope.
- Có nguy cơ mất serialized reference, GUID, asset hoặc dữ liệu.
- Giải pháp được duyệt không tương thích Luna hoặc vượt budget.
- Phát hiện yêu cầu sản phẩm chưa được quyết định.
- Khi tái sử dụng logic project khác: behavior nguồn, dependency cần giữ hoặc phạm vi logic khác với phần người dùng đã xác nhận.

Không được áp dụng “sửa nhỏ tiện thể” nếu nó chưa nằm trong proposal.

## Issue report format

Mọi vấn đề phát sinh phải báo theo cấu trúc:

```text
Vấn đề:
Bằng chứng:
Ảnh hưởng nếu không xử lý:
Phạm vi/file bị ảnh hưởng:

Phương án A:
- Cách làm
- Ưu điểm
- Nhược điểm/rủi ro

Phương án B:
- Cách làm
- Ưu điểm
- Nhược điểm/rủi ro

Đề xuất của agent:
Lý do:

Quyết định cần người dùng phê duyệt:
```

Agent có thể khuyến nghị, nhưng không được thực hiện phương án khuyến nghị cho đến khi người dùng đồng ý.

## Completion report

Khi hoàn thành, agent phải đối chiếu với proposal đã duyệt:

- Hạng mục đã thực hiện.
- File/class/asset đã thay đổi.
- Hạng mục không thực hiện và lý do.
- Mọi sai lệch đã được phê duyệt lại.
- Test/build và kết quả.
- Phần đã xác minh trong Editor/Luna.
- Vấn đề còn lại cần quyết định tiếp theo.
