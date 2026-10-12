# AI Agent Roles and Handoff

## Default roles

- Claude là planner/architect: làm rõ yêu cầu, khảo sát code, xác định Luna constraints và tạo specification.
- Codex là implementer/verifier: đọc specification, triển khai, chạy kiểm tra và viết implementation report.
- Blender MCP chỉ được cấu hình cho Codex. Claude có thể lập kế hoạch Blender/asset nhưng không trực tiếp thao tác Blender.
- Codex chỉ được thay đổi model, topology, material, modifier, rig, animation hoặc export qua Blender MCP sau khi plan tương ứng được người dùng duyệt.
- Vai trò có thể thay đổi khi người dùng yêu cầu rõ ràng; không coi phân vai mặc định là quyền mở rộng phạm vi.
- Cả planner và implementer phải tuân thủ `approval-gates-and-change-control.md`; không agent nào được tự duyệt proposal của agent khác thay cho người dùng.
- Khi lấy tính năng từ project khác, cả hai phải tuân thủ `cross-project-logic-reuse.md`: xác nhận đúng logic nguồn trước, sau đó mới xin duyệt thiết kế tích hợp đích.

## Planning handoff

Feature đủ lớn phải có thư mục trong `agent-os/specs/` với tối thiểu:

- Mục tiêu và non-goals.
- Hành vi hiện tại và mong muốn.
- Quyết định đã được người dùng xác nhận.
- Luna/Unity/Blender standards liên quan.
- Component và asset dự kiến thay đổi.
- Task theo dependency order.
- Acceptance criteria.
- Cách kiểm tra trong Editor và Luna build.

Planner không được biến giả định sản phẩm quan trọng thành quyết định ngầm.

## Implementation handoff

Trước khi sửa, implementer phải:

1. Đọc `AGENTS.md`, product context và toàn bộ spec được chọn.
2. Đọc `standards.md` hoặc `agent-os/standards/index.yml` để tải đúng standard.
3. Đối chiếu plan với codebase hiện tại.
4. Báo blocker nếu spec mâu thuẫn code, thiếu quyết định quan trọng hoặc vi phạm giới hạn Luna.

Sau khi sửa, implementer phải ghi:

- File đã thay đổi.
- Task đã hoàn thành.
- Test/build đã chạy và kết quả.
- Phần chỉ kiểm tra trong Editor, phần đã kiểm tra trên Luna.
- Sai lệch so với plan và lý do.
- Rủi ro còn lại.

Implementer chỉ bắt đầu sau khi người dùng phê duyệt rõ ràng class design, cấu trúc, file/asset change list và verification plan. Nếu implementation cần lệch khỏi plan, phải dừng và xin duyệt lại.

## Parallel work

- Không để hai agent sửa cùng file hoặc cùng Unity scene/prefab trong một working tree tại cùng thời điểm.
- Khi chạy song song, dùng branch/worktree riêng và xác định ownership theo file hoặc subsystem.
- Handoff dựa trên file, diff và test evidence; không dựa vào trí nhớ hội thoại của agent khác.
