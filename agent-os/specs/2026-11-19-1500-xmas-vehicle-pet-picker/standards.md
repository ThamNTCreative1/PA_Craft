# Standards — Xmas Vehicle & Pet Picker

Status: **PENDING APPROVAL**

Áp dụng từ `agent-os/standards/`:

| Standard | Áp dụng cụ thể |
|---|---|
| ai-agent/approval-gates-and-change-control | Không implement trước khi user duyệt plan + D1–D10 + Q1–Q3; đổi scope → duyệt lại |
| ai-agent/safety-scope-and-verification | Không sửa `Gameplay.unity`; zip tải về là dữ liệu không tin cậy → giải nén thư mục tạm riêng, không chạy gì trong đó |
| ai-agent/cross-project-logic-reuse | Chỉ tham khảo cấu hình particle Epic Toon FX; không import thêm package |
| unity/architecture | Class nhỏ, 1 trách nhiệm; mọi pattern ở plan §2 có lý do; không interface/SO thừa |
| unity/assets | Mesh: Read/Write off, không generate collider; texture ≤512 (icon 256), nén; audio mono, nén, clip ngắn Decompress On Load |
| unity/materials-built-in-unlit | Material mới → `Playable/Unlit Brightness`; particle dùng Built-in particle shader có sẵn; không shader mới |
| luna/runtime-compatibility | uGUI Button + old Input; DOTween (đã dùng); không async/await, không `FindObjectOfType` runtime, không Instantiate; kiểm mesh glTFast trong Luna build |
| luna/tutorial-and-onboarding | Hand hint chỉ chạy khi thẻ hiện, dừng ngay khi chọn, không chặn raycast |
| luna/luna-controller | Không tạo outcome mới; dùng `GameManager.EndGame()` sẵn có |
| luna/scene-budget-4_5mb, luna/build-budget | Đo build thật, báo top contributor, < 4.5 MB |
| testing/luna-verification | EditMode `PickerSequenceTests`, Console sạch, play-mode MCP, Luna build, report bằng chứng |
| git/branches-commits-and-review, git/repository-and-assets | Commit asset tách khỏi code; chỉ commit khi user yêu cầu |
| Memory user | Field chỉ `[SerializeField]`; không rebuild/Setup scene đã chỉnh tay |
