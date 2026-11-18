# Standards áp dụng — Noel Missions

Status: **APPROVED** by user 2026-11-18 (rev 3; O1-A, O2-A, O3-A, O4-A)

| Standard | File | Áp dụng cụ thể |
|---|---|---|
| Approval gates | `agent-os/standards/ai-agent/approval-gates-and-change-control.md` | Không implement trước khi user duyệt D1–D7; đổi class/file/asset ngoài plan → xin duyệt lại |
| Cross-project reuse | `agent-os/standards/ai-agent/cross-project-logic-reuse.md` | Câu cá: chỉ lấy state machine, cast/wait/fight math, `FishingHoldButton`; loại Opsive, HAVIGAME, PrimeTween, Odin, Inventory, Album, Shop, FX, Editor tools. Package: chỉ file mới, không file trùng GUID |
| Runtime compatibility | `agent-os/standards/luna/runtime-compatibility.md` | Cấm `FindObjectOfType` (sửa `NoelSnowfall`), `GameObject.Find`, `Resources.Load`, `[RuntimeInitializeOnLoadMethod]`; old Input; coroutine thay tween lib |
| Materials | `agent-os/standards/unity/materials-built-in-unlit.md` | Map Noel, skin, cá, cần: `Playable/Unlit Brightness`. Tuyết: `Playable/Noel/SnowBlock` + `Playable/Noel/Snowflake` (Built-in, unlit) là **ngoại lệ cần user duyệt** (O2-A); nếu không duyệt → O2-B |
| Architecture | `agent-os/standards/unity/architecture.md` | Dependency serialize tường minh; logic thuần (`FishingRules`) tách khỏi MonoBehaviour; không interface thừa |
| Assets | `agent-os/standards/unity/assets.md` | Asset mới nằm dưới `_Playable_/Noel`, `_Playable_/Fishing`; giữ GUID gốc khi import |
| Scene budget | `agent-os/standards/luna/scene-budget-4_5mb.md`, `build-budget.md` | Đo build trước/sau; < 4.5 MB |
| Tutorial | `agent-os/standards/luna/tutorial-and-onboarding.md` | Fishing dùng hint text HUD ("Hold to cast" / "Tap fast!"), không dùng driving tutorial |
| LunaController | `agent-os/standards/luna/luna-controller.md` | Không đổi outcome; `GameManager` end flow giữ nguyên |
| Git | `agent-os/standards/git/repository-and-assets.md` | Commit asset import tách riêng với code; không commit project scratch |

## Quy ước dự án (memory)
- Chỉ khai báo `[SerializeField]`, không thêm `[TabGroup]` — user tự sắp.
- Không chạy Setup/rebuild scene; patch object trực tiếp để giữ UI user chỉnh tay.
