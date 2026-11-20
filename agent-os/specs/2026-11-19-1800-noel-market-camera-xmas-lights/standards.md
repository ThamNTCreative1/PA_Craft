# Standards — Noel: camera Market + đèn nháy + người tuyết

Status: **PENDING APPROVAL**

| Standard | Áp dụng cụ thể |
|---|---|
| ai-agent/approval-gates-and-change-control | Không implement trước khi user duyệt plan + D1–D4; đổi class/asset/pattern → duyệt lại |
| ai-agent/safety-scope-and-verification | Zip tải về chỉ giải nén vào `D:\tmp_modhub_inspect` để xem, không đưa vào project (user xác nhận gửi nhầm) |
| unity/architecture | 1 class `TwinkleLights`, không interface/base/service; field `[SerializeField]` only, không `[TabGroup]` |
| ai-agent/third-party-license | Snowman CC-BY-4.0 → giữ credit tác giả ounzi (D2a) |
| unity/assets | Mesh gộp theo màu, không collider, Read/Write off; snowman: 1 mesh, atlas 128×64 point filter, no mipmap |
| unity/materials-built-in-unlit | Mọi material mới dùng `Playable/Unlit Brightness`; nhấp nháy qua `_Brightness`; không Light thật, không shader mới |
| luna/runtime-compatibility | Chỉ `Time.time`, `Material.SetFloat`, `new Material(...)` ở Awake; không `Find*`/Instantiate/coroutine/async |
| luna/scene-budget-4_5mb | Đo build thật, báo phần tăng |
| testing/luna-verification | Console sạch, ảnh portrait + landscape, 2 frame chứng minh nháy, report bằng chứng |
| Memory user | Patch object live, không rebuild/Setup scene; camera clear giữ SolidColor (không Skybox) |
| git | Chỉ commit khi user yêu cầu |
