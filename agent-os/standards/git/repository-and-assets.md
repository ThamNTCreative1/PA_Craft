# Git Repository and Asset Management

## Unity repository

- Commit `Assets/`, `Packages/`, `ProjectSettings/` và toàn bộ file `.meta` tương ứng.
- Không commit `Library/`, `Temp/`, `Obj/`, `Logs/`, `Build/`, `Builds/` hoặc cache do Unity sinh ra.
- Không xóa, tái tạo hoặc đổi GUID trong `.meta` nếu chưa đánh giá prefab, scene, material và animation reference liên quan.
- Khi di chuyển asset, ưu tiên di chuyển trong Unity Editor để giữ GUID và reference.
- Trước khi thay đổi hàng loạt scene, prefab hoặc serialized asset, tạo checkpoint commit có thể quay lại.

## Blender and binary assets

- File `.blend` là source asset; FBX/glTF là artifact export trừ khi project quy định khác.
- Không commit backup tự động như `.blend1`, `.blend2`, file autosave hoặc render thử không dùng.
- Dùng Git LFS cho `.blend`, FBX, texture, audio hoặc binary lớn khi repository đã cấu hình LFS.
- Không tự ý bật Git LFS giữa project nếu chưa xác nhận với nhóm và migration plan.
- Tránh re-export hoặc recompress toàn bộ asset nếu nhiệm vụ chỉ thay đổi một model.

## Secrets and generated output

- Không commit token, API key, signing credential, cookie, private MCP config hoặc dữ liệu khách hàng.
- Không commit Luna build output trừ khi repository có quy trình release artifact rõ ràng.
- File cấu hình chứa đường dẫn máy cá nhân phải được đưa vào ignore hoặc template hóa.

## Change discipline

- Giữ diff đúng phạm vi; không format hoặc reserialize file không liên quan.
- Với Unity YAML, kiểm tra diff scene/prefab trước commit để phát hiện object bị mất, GUID đổi hoặc override ngoài ý muốn.
- Nếu Unity tự động nâng version/serialize nhiều file, tách thay đổi đó khỏi feature hoặc xin xác nhận trước.
