# Git Branches, Commits, and Review

## Branches

- Không triển khai feature trực tiếp trên nhánh ổn định nếu workflow của repository yêu cầu feature branch.
- Tên branch nên mô tả mục đích, ví dụ `feature/drag-crafting`, `fix/cta-input`, `asset/worker-rig`.
- Một branch nên có một mục tiêu chính; không trộn feature, asset overhaul và dependency upgrade không liên quan.

## Commits

- Commit phải nhỏ vừa đủ để review và phục hồi, nhưng không chia nhỏ đến mức project không compile giữa các commit khi có thể tránh.
- Message dùng động từ và mô tả outcome, ví dụ `Add cached references for drag targets`.
- Tách source-code change khỏi bulk binary asset import khi điều đó giúp review và rollback.
- Không amend, rebase, force-push hoặc xóa commit của người khác nếu chưa được cho phép.
- AI agent không tự commit, push, merge, tạo tag hoặc mở pull request nếu người dùng chưa yêu cầu.
- Phê duyệt implementation không mặc nhiên bao gồm phê duyệt commit/push/merge; các hành động Git thay đổi lịch sử hoặc remote cần được yêu cầu riêng.

## Before handoff

- Kiểm tra `git status` và phân biệt file do nhiệm vụ tạo với thay đổi có sẵn của người dùng.
- Không hoàn tác, ghi đè hoặc đưa thay đổi ngoài phạm vi vào commit.
- Review diff cho source, Unity YAML, `.meta`, package manifest và project settings.
- Báo cáo file chưa tracked, test/build đã chạy và thay đổi chưa được xác minh trên Luna.

## Merge safety

- Resolve scene/prefab conflicts bằng hiểu biết về object và GUID, không chọn toàn bộ một phía một cách máy móc.
- Sau conflict resolution, mở scene/prefab liên quan trong Unity và kiểm tra missing reference.
- Với binary conflict, chọn source of truth rõ ràng hoặc tái export từ `.blend`; không ghép binary thủ công.
