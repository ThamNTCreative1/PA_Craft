# Applicable standards
- User AGENTS.md and agent-os/workflows/codex-claude-codex.md: user waived Claude planning only; exact implementation plan approval still required.
- ai-agent/approval-gates-and-change-control.md and safety-scope-and-verification.md: no implementation before approval; stop on scope changes; preserve user work.
- unity/architecture.md: direct serialized static colliders; no unnecessary classes/interfaces/patterns.
- unity/assets.md and luna/runtime-compatibility.md: primitive colliders; no runtime object searches introduced; no mesh/import/material changes.
- testing/luna-verification.md and luna/scene-budget-4_5mb.md: Console, reference, Editor gameplay and Luna runtime evidence; measure actual build size below 4.5 MB.
- Governance, luna-code-architecture and luna-test-and-verify skills applied. Existing old Input, Built-in/Unlit rendering and LunaController outcome flow are outside change scope and must not gain changes.
