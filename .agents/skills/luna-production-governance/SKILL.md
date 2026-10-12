---
name: luna-production-governance
description: Govern planning, implementation, review and Blender-to-Unity asset work for Luna playable projects. Enforces user approval gates, pragmatic OOP/SOLID, justified design patterns, Luna runtime constraints and verification evidence.
---

# Luna Production Governance

Apply this skill to every feature, refactor, Unity scene/asset change, Blender operation and cross-project logic reuse in a Luna project.

## Authority and roles

- Codex performs read-only research first and later implements an explicitly approved plan.
- Claude creates the detailed plan from Codex research and the user's scenario; Claude does not implement.
- Blender MCP belongs to Codex only. Claude may plan Blender work but cannot execute it.
- No agent approves its own proposal. Only the user can approve or change scope.

## Required sequence

1. Research current behavior and relevant dependencies without mutation.
2. Produce a design listing classes, interfaces, files, Unity objects/assets, Blender operations, event flow, patterns and verification.
3. Mark the plan `PENDING APPROVAL` and stop.
4. Implement only after the user marks the exact plan/scope approved.
5. Stop and request renewed approval when reality requires a different class, file, dependency, pattern, asset operation or architecture.
6. Verify and produce an implementation report with evidence and remaining risk.

Never silently fix unrelated issues, broaden scope or treat a likely preference as approval.

## Design policy

- Apply OOP and SOLID to keep responsibilities and dependencies clear, not to maximize abstraction.
- Every proposed interface, base class, service or design pattern must solve a named problem and appear in the approved plan.
- Prefer composition and explicit serialized dependencies. Avoid runtime object searches and hidden global coupling.
- Do not create an interface for one stable implementation unless it forms a real boundary, enables testing or an approved second implementation is expected.
- Keep logic independent of `MonoBehaviour` when Unity lifecycle, serialization or component attachment is unnecessary.

Read [architecture-and-patterns.md](references/architecture-and-patterns.md) for design/planning/review. Read [coding-standard.md](references/coding-standard.md) before writing or reviewing C#. Read [verification.md](references/verification.md) before defining acceptance criteria or reporting completion. Read [blender-unity-pipeline.md](references/blender-unity-pipeline.md) for any Blender or imported 3D asset work.

## Specialized skill routing

Load only the skills relevant to the current task:

- Class/interface/pattern design: `luna-code-architecture`.
- Luna API/runtime/performance audit: `luna-runtime-compatibility`.
- Materials/textures/rendering: `luna-material-authoring`.
- Mouse/touch/drag/gesture: `luna-input-handling`.
- Tutorial/onboarding: `luna-tutorial-onboarding`.
- Build-size measurement/optimization: `luna-build-budget-audit`.
- Blender/3D/export: `luna-blender-optimization`.
- Git/branch/commit/handoff: `luna-git-workflow`.
- Tests/build/verification/report: `luna-test-and-verify`.
- Logic from another project: `luna-cross-project-reuse`.

Architecture and verification skills apply to every implementation plan. Other specialized skills apply only when their domain is in scope.

## Non-negotiable Luna constraints

- Old Input handling compatible with Luna.
- Built-in render pipeline; Unlit materials; no custom shader. Brightness/darkness must use an approved material/property approach.
- `LunaController` is the central Luna event facade; access follows the approved Service Locator design.
- Outcome flow is scenario-specific and approval-gated. Never assume Win, Lose, EndCard, CTA, restart or replay.
- Each approved outcome is a separate responsibility/flow; when both Win and Lose exist, keep them separate.
- No prohibited runtime search/query APIs from the Luna standards.
- Tutorial/onboarding is included when required by the product scenario.
- Total playable/scene budget target remains under 4.5 MB and must be measured, not assumed.

## Cross-project reuse

Extract only the smallest relevant logic. List source class/method, required dependencies, excluded unrelated behavior and adaptation needed for the target. Stop for the user's confirmation that the identified source logic is correct before designing or copying it.
