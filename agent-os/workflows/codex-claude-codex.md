# Codex → Claude → User Approval → Codex

## Mục tiêu

Tách khảo sát, thiết kế và triển khai thành các handoff có file bằng chứng. Không agent nào tự phê duyệt thay người dùng.

## Giai đoạn 1 — Codex khảo sát

Codex chỉ đọc code, scene metadata, prefab/asset liên quan và standards. Không sửa project.

Mỗi yêu cầu phải bắt đầu trong một chat Codex mới và một spec folder mới. Người dùng chỉ mô tả việc cần làm;
Codex tự tạo folder `YYYY-MM-DD-HHmm-<slug>` và cập nhật `agent-os/specs/current.md`. Research chỉ dùng product
context, standards, kịch bản hiện tại và source project; không đọc hoặc kế thừa artifact/assumption/approval từ
folder khác. "Reset" là cô lập context, không xóa lịch sử. Sửa feature cũ vẫn là một work item/spec mới dựa trên
code hiện tại; chỉ đọc plan cũ sau khi báo dependency cụ thể và được người dùng cho phép.

Đầu ra trong `agent-os/specs/<feature>/`:

- `research.md`: hiện trạng, luồng logic, dependencies, Luna risks và câu hỏi còn thiếu.
- `references.md`: file/class/method nguồn cùng lý do liên quan.

Nếu lấy logic từ project khác, Codex phải tách logic cần lấy khỏi phần phụ thuộc không liên quan và yêu cầu người dùng xác nhận logic nguồn trước khi chuyển sang thiết kế.

## Giai đoạn 2 — Claude thiết kế

Claude đọc `agent-os/specs/current.md`, rồi chỉ đọc `research.md`, `references.md` trong folder được trỏ tới,
product context và standards. Claude không sửa code và không kế thừa plan từ feature khác.

Đầu ra:

- `shape.md`: mục tiêu, non-goals, assumptions và lựa chọn kiến trúc.
- `plan.md`: danh sách class/interface/file/scene/prefab, trách nhiệm, quan hệ, event flow, task order và verification plan.
- `standards.md`: standards áp dụng và các giới hạn Luna cần kiểm tra.

Claude dừng lại, tóm tắt các quyết định và xin người dùng phê duyệt rõ ràng.

## Giai đoạn 3 — Cổng duyệt

Chỉ được chuyển sang triển khai khi người dùng xác nhận plan. Trạng thái duyệt được ghi ở đầu `plan.md`:

```text
Status: APPROVED
Approved by: user
Approved scope: <mô tả hoặc phiên bản plan>
```

Thay đổi phạm vi, kiến trúc, class/file list hoặc phương án xử lý blocker làm mất hiệu lực duyệt và cần xin duyệt lại.

## Giai đoạn 4 — Codex triển khai

Codex đối chiếu plan với code hiện tại rồi chỉ thực hiện đúng phạm vi đã duyệt. Mọi vấn đề phát sinh phải được báo cáo kèm nguyên nhân, ảnh hưởng và phương án; Codex chỉ tiếp tục sau khi người dùng chọn phương án nếu giải pháp làm lệch plan.

Đầu ra cuối:

- Code/assets đúng phạm vi.
- `implementation-report.md`: file thay đổi, test/build, kiểm tra Luna, sai lệch đã được duyệt và rủi ro còn lại.

## Quy tắc MCP và Unity

- Trong hai giai đoạn khảo sát và lập kế hoạch, chỉ dùng thao tác đọc/kiểm tra.
- Trước mọi thao tác thay đổi Unity Editor qua MCP, phải có plan được duyệt.
- Sau sửa script, chờ Unity compile xong và kiểm tra Console.
- Không để Claude và Codex cùng sửa scene, prefab hoặc file trong cùng working tree.
