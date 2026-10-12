---
name: implement-approved-luna-plan
description: Implement and verify an explicitly approved Unity/Luna plan without expanding scope. Use only after the user approves the exact class, file, asset and verification plan.
---

# Implement Approved Luna Plan

1. Read `agent-os/specs/current.md`, then read the complete spec from only the folder named there, applicable standards, `AGENTS.md` and product context.
2. Apply `luna-production-governance` and read its coding/verification reference plus Blender reference when relevant.
3. Implement only the outcome paths named in the approved plan. Do not add Win, Lose, EndCard, CTA, restart or replay as an inferred convention.
4. Confirm the current folder's `plan.md` is explicitly marked `APPROVED` and identifies the approved scope. If not, stop. Do not search another spec folder for an approved plan.
5. Reconcile the plan with current code. Report any drift before editing.
6. Implement only approved files, classes, scenes, prefabs and assets.
7. If a blocker requires a different class, dependency, API, asset or architecture, stop and report cause, impact and solution options. Resume only after user approval.
8. Preserve Luna constraints: old Input handling, Built-in/Unlit materials, runtime-compatible APIs, size/triangle budgets and centralized `LunaController` events through the approved Service Locator.
9. After script edits, wait for Unity compilation and inspect Console. Run the approved tests/build checks.
10. Write `implementation-report.md` with changed files, evidence, unverified items, approved deviations and remaining risks.

Do not silently fix unrelated issues or import unrelated source-project code.
