# Missions Journal — Standards Applied

Status: APPROVED (tied to plan.md, which the user approved; not independently actionable)

## ai-agent/approval-gates-and-change-control.md
Plan is presented in full (objective/scope, file list, class design, data flow, alternatives, verification) and marked PENDING APPROVAL before any implementation. No code/scene/asset change made while writing shape.md/plan.md/standards.md.

## ai-agent/cross-project-logic-reuse.md
Gate A (source understanding) was already confirmed by the user in research.md before this planning pass. This plan only performs Gate B (target integration design): new files are written from scratch per `MissionRowView`/`MissionsJournalController`, not copy-pasted from `MissionItemView.cs`/`MissionsPanel.cs`; no HAVIGAME, `Mission`/`MissionDatabase`, `GameButton`, or DOTween-audio dependencies are carried over. Only visual assets explicitly listed in references.md's "Resolved direct visual dependencies" table are proposed for import, and only the subset needed for the no-progress-bar default (see plan.md section 2).

## ai-agent/safety-scope-and-verification.md
No destructive action proposed. Scope is limited to the files/assets/scene objects listed in plan.md section 2; `GameController.cs`, `PlayerAction.cs`, `PlayerController.cs`, `CameraController.cs`, `MotorbikeController.cs`, `GameManager.cs` are read-only inputs, not edit targets. The input-fallthrough risk found while reading `GameController.Update`/`PlayerAction.TryMountFromTutorial` is reported in shape.md/plan.md with a chosen mitigation (disable components, not edit them) rather than silently fixed.

## unity/architecture.md, luna-production-governance architecture-and-patterns.md
Data/Logic/View kept separate: `MissionRowView` is pure view/binding, `MissionsJournalController` is the only coordinator, `JournalHandSequencer` is pure tween/view with no gameplay knowledge. No interface introduced (one implementation each, no second expected). No Service Locator/Facade/State/Strategy/Command/Factory/Pool/Repository/Template Method pattern used — none of their triggers are present (single controller, fixed 3 rows, no queueing/undo/pooling/variant-algorithm need). Dependencies are explicit `[SerializeField]` references assigned in the Inspector; no `FindObjectOfType`/`GameObject.Find`.

## luna/luna-controller.md
Not applicable to this spec: no Luna outcome call (`Win`/`Lose`/`EndCard`/CTA) is added, changed, or routed through. `GameManager`'s existing direct Luna calls are left untouched (plan.md section 5, "End-game timer" row). The project's lack of a `LunaController`/Service Locator is a pre-existing standards gap noted in research.md but is explicitly out of scope for this spec — not something this plan introduces or silently fixes.

## luna/runtime-compatibility.md
All new input handling (GO buttons, "Mission Button" reopen) goes through the existing `EventSystem`/`StandaloneInputModule` + `UnityEngine.UI.Button`, which is already how the project's other buttons (`WinPanel`, `_exitButton`, `_btnJump`) work. No `UnityEngine.InputSystem` introduced. No `FindObjectOfType`/`GameObject.Find`/tag lookup/`Resources.FindObjectsOfTypeAll`. No `Physics2D` restricted query added. The background-input mitigation (plan.md section 3/4) exists specifically to prevent exactly the kind of same-pointer-release fall-through this standard warns about.

## unity/materials-built-in-unlit.md
Only Built-in Unlit (`UI/Default` via `Image`, TMP SDF material) assets are proposed; no custom shader, no Shader Graph, no URP/HDRP material. Font materials reused from the already-resolved `references.md` list (`FredokaOne-*` SDF/materials), not newly authored.

## luna/scene-budget-4_5mb.md, luna/build-budget.md
New asset list in plan.md section 2 is deliberately minimized (progress bar/reward icon assets excluded by default) specifically to protect the 3.8 MB green target. Verification plan (plan.md section 6) requires a measured build-size check after import, not an estimate-only sign-off.

## luna/tutorial-and-onboarding.md
The existing motorbike start/move/driving tutorial is explicitly preserved unchanged (handed back control, not re-implemented). The new hand hint is guidance-only (never auto-completes a selection), stops on real input (a GO press), and is cleaned up (`OnDisable` kills its tween) — consistent with this standard's input/failure-handling and cleanup requirements. The journal itself is not framed as a second "mode"; it is a pre-gameplay selection screen that hands off into the real, unmodified gameplay.

## testing/luna-verification.md, luna-production-governance verification.md
Verification plan (plan.md section 6) separates Editor checks, manual/PlayMode checks, and Luna/build checks, and defines the rollback boundary, matching the required structure for `implementation-report.md` once implementation is approved and executed.
