---
name: setup-luna-controller
description: Design, create, or audit the shared LunaController and typed Service Locator for a Luna Unity project, requiring user approval before implementation.
---

# Setup LunaController

Use this workflow when a Luna project needs its shared controller created, adapted, or reviewed.

## Required standards

Read and follow:

- `agent-os/standards/luna/luna-controller.md`
- `agent-os/standards/luna/runtime-compatibility.md`
- `agent-os/standards/ai-agent/approval-gates-and-change-control.md`
- `agent-os/standards/unity/architecture.md`

## Inspect

Before proposing changes:

- Find existing Luna integration/API usage.
- Find existing controller, service locator, tutorial, gameplay, result and CTA classes.
- Identify initialization order and scene ownership.
- Identify direct Luna API calls that should be centralized.
- Do not modify files during inspection.

## Proposal

Present:

1. Existing implementation summary.
2. Class/file list to create or modify.
3. `LunaController` public function list.
4. Approved outcome flow: identify whether this project uses Win, Lose, direct EndCard, gameplay-complete → EndCard, CTA → EndCard/store, or another verified flow. Do not assume missing outcomes.
5. Separate functions/responsibilities for every approved outcome; if both Win and Lose exist, keep them separate.
6. Typed Service Locator design or reuse plan.
7. Exact mapping from controller functions to verified Luna APIs/events.
8. Table of consumer class, function called, trigger, repeat policy and failure behavior.
9. Registration, duplicate-instance, cleanup and replay/reset rules.
10. Tests and Luna verification.

End by asking the user to approve the proposal. Do not implement until approval is explicit.

## Implement

After approval:

- Implement only approved files, functions, consumers and mappings.
- Keep the locator typed and minimal; do not add reflection/generic service scanning.
- Keep scenario decisions in consumer classes, not in `LunaController`.
- Route all Luna API calls through `LunaController`.
- Stop and request re-approval if a new API, function, consumer or dependency is needed.

## Verify

- Compile and run relevant tests.
- Confirm one active controller.
- Confirm locator initialization before consumer calls.
- Confirm no direct Luna API calls remain outside approved locations.
- Confirm only approved outcome paths exist and they cannot double-fire or conflict in one run.
- Confirm EndCard/CTA timing and pointer-release guards when those paths are approved.
- Verify the approved scenario on a Luna build and report unverified items explicitly.
