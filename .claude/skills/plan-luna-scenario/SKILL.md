---
name: plan-luna-scenario
description: Turn approved Unity/Luna research and a user scenario into a detailed class, file, event-flow and verification plan. Use after Codex research and before implementation.
---

# Plan Luna Scenario

Do not modify the project.

1. Read `agent-os/specs/current.md`, then use only the spec folder named there. Do not read artifacts from any other spec folder.
2. Read the user's scenario, product context, current `research.md`, current `references.md` and relevant Luna profile standards.
3. Apply `luna-production-governance`, especially its architecture/pattern guidance. Every pattern and abstraction must solve a named problem and be listed for user approval.
4. Read `agent-os/product/tech-stack.md` and determine the exact approved outcome shape. Do not assume the project has Win/Lose; it may use EndCard directly or another approved flow.
5. Verify only the source needed to resolve planning ambiguity.
6. Create `shape.md`, `plan.md` and `standards.md` under the current spec folder.
7. List every proposed class/interface, responsibility, public interaction, file path, scene/prefab/asset change, event flow and dependency order.
8. Include alternatives for material decisions and state the recommended trade-off without choosing on the user's behalf.
9. Include Editor tests, Luna/build checks and the 4.5 MB scene/build budget checks that apply.
10. Mark the plan `PENDING APPROVAL`, update `current.md` to `Status: PENDING APPROVAL`, summarize open decisions and stop for explicit user approval.

Never convert assumptions into approved requirements. Any later architectural or scope change requires renewed approval.
