# AI Agent Safety, Scope, and Verification

## Inspect before change

- Đọc instruction files, spec, code liên quan và trạng thái Git trước khi sửa.
- Không suy đoán Unity version, Luna capability, Blender export setting hoặc package API khi có thể kiểm tra từ project.
- Phân biệt thay đổi có sẵn của người dùng với thay đổi do nhiệm vụ hiện tại tạo ra.
- Trước mutation, lập proposal và chờ phê duyệt theo `approval-gates-and-change-control.md`.

## Scope

- Chỉ sửa file cần thiết cho yêu cầu và acceptance criteria.
- Không opportunistic refactor, đổi format toàn repository hoặc nâng package ngoài phạm vi.
- Không thay đổi product behavior, monetization, CTA hoặc tracking nếu spec chưa xác định.
- Khi phát hiện vấn đề ngoài phạm vi, báo cáo thay vì tự mở rộng nhiệm vụ.

## Destructive and external actions

- Không xóa asset, scene, prefab, branch, build hoặc dữ liệu nếu chưa xác định chính xác target và quyền thực hiện.
- Không chạy lệnh phá hủy Git như hard reset hoặc discard thay đổi của người dùng.
- Không commit, push, merge, publish Luna build, upload asset hoặc gửi dữ liệu ra dịch vụ ngoài nếu chưa được yêu cầu.
- Không đưa secret vào prompt, log, source hoặc implementation report.

## Verification

- Kết luận phải dựa trên evidence: compile result, test output, diff, Unity Console, asset inspection hoặc Luna build.
- Không tuyên bố “Luna-compatible” chỉ vì chạy được trong Editor.
- Nếu không thể chạy Luna build, ghi rõ là chưa xác minh và nêu bước kiểm tra còn thiếu.
- Sau Blender re-export, kiểm tra scale, orientation, pivot, material, animation binding, prefab reference và collider.
- Sau code change, quét API bị cấm, null reference, initialization order và ảnh hưởng build size.

## Stop conditions

Agent phải dừng và hỏi khi:

- Thiếu quyết định có thể thay đổi gameplay hoặc CTA.
- Có nguy cơ mất asset hoặc phá serialized reference.
- Cần credential, publish permission hoặc external access mới.
- Plan yêu cầu API/pipeline có khả năng không được Luna hỗ trợ.
- Có conflict với thay đổi chưa commit mà không thể tách an toàn.
- Bất kỳ vấn đề phát sinh nào yêu cầu thay đổi class design, file list, asset list, scope hoặc giải pháp đã được duyệt.
