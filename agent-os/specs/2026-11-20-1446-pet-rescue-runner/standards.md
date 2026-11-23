# Applicable standards - Pet Rescue v1
- Authority: AGENTS.md, agent-os/workflows/codex-claude-codex.md, agent-os/standards/index.yml. User requests Codex planning directly; planner role changes accordingly, v1 scope approved by the user with "oke".
- ai-agent/approval-gates-and-change-control, roles-and-handoff, safety-scope-and-verification, cross-project-logic-reuse: only current spec; no implementation before exact scope approval; source code not reused; preserve source and existing user changes.
- unity/architecture: composition, explicit initialization/serialized dependencies, pure rules, no speculative interfaces.
- unity/assets and materials-built-in-unlit: minimal visual-only animal dependencies, generic rigs, two clips each, allowed Unlit shaders, no new custom shader/material package. Existing custom shaders excluded by scene references.
- luna/runtime-compatibility: Legacy Input, mouse/touch arbitration, no runtime scene search, no blocked Physics2D APIs, no reflection/thread/dynamic allocation framework.
- luna/luna-controller: one facade plus typed locator, NotifyWin and NotifyLose separate, real GameEnded mapping, CTA uses InstallFullGame only after fresh click.
- luna/tutorial-and-onboarding: tap then drag cues, real input dismisses, no automatic start or forced store.
- luna/build-budget and scene-budget-4_5mb: actual final build measured below 4.5MB; source size is not build size. Record asset contributions and animation/texture costs.
- testing/luna-verification: rules/scene tests, compilation/Console, manual happy/failure/recovery paths and exported Luna/device checks. Explicitly report unavailable checks.
- git/repository-and-assets and branches-commits-and-review: paired .meta files, no unrelated reserialization or commits/push; old scene retained.
Skills applied to plan: luna-production-governance, luna-code-architecture, luna-test-and-verify, luna-input-handling, luna-tutorial-onboarding, luna-runtime-compatibility, luna-material-authoring, luna-build-budget-audit, unity-mcp-orchestrator. No Blender or external source logic extraction is proposed.
