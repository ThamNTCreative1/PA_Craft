# Journal Gameplay Visibility & Hand Pulse — Standards Applied

Status: APPROVED (tied to plan.md, which the user approved; not independently actionable)

## ai-agent/approval-gates-and-change-control.md
Plan presented in full (objective/scope, exact file diff list, class-level design, data flow, alternatives, verification) and marked PENDING APPROVAL before any implementation. No code/scene/asset change made while writing shape.md/plan.md/standards.md. Both edited scripts (`GameController.cs`, `MissionsJournalController.cs`, `JournalHandSequencer.cs`) are explicitly listed with the exact lines added/removed, per "không dùng mô tả mơ hồ".

## ai-agent/roles-and-handoff.md
This document is Claude's planning output only. Codex is the implementer; this folder's research.md already states the handoff ("Codex then implements the approved plan"). No runtime source, scene, or asset mutation performed while producing shape.md/plan.md/standards.md.

## ai-agent/safety-scope-and-verification.md
Scope is limited to the 3 files listed in plan.md section 2 plus one Inspector reference; `MissionRowView.cs`, `PlayerAction.cs`, `PlayerController.cs`, `CameraController.cs`, `MotorbikeController.cs`, `GameManager.cs` are explicitly out of scope and unmodified. The `GameController.cs` deletion is scoped strictly to the minimap mechanism — confirmed (this research pass) that `_timeToShowMap`/`_minimapPanel`/`_textMinimap`/`_mapCountdownStarted`/`_gamePanel` are read nowhere else in the class, so no opportunistic/unrelated refactor is introduced alongside it.

## unity/architecture.md
No new class, no new interface, no new pattern. Both behavior additions (`_gamePanel` visibility, hand pulse) extend the single existing responsibility each class already owns (`MissionsJournalController` already owns "what's visible while the journal is shown"; `JournalHandSequencer` already owns "how the hand moves") rather than introducing a new coordinating type. Dependencies remain explicit `[SerializeField]` references assigned in the Inspector; no `FindObjectOfType`/`GameObject.Find` added.

## luna/runtime-compatibility.md
No new input path. The HUD-hide/reveal and hand-pulse changes are pure visual/state toggles on objects already driven by the existing Legacy-Input-based flow; no `UnityEngine.InputSystem` touched.

## luna/tutorial-and-onboarding.md
The existing motorbike start/move/driving tutorial is reactivated exactly as it already was (only the parent `GamePanel`'s own active state is added to the reveal step) — its own internal behavior is untouched. The hand pulse is arrival feedback only, consistent with this standard's "feedback khi người chơi thực hiện đúng" guidance, and is explicitly required to clean up (`KillSequence` resets scale) so no stuck/compounding animation survives interruption, matching the standard's cleanup requirement.

## luna/scene-budget-4_5mb.md, luna/build-budget.md
Net code change is a deletion (one coroutine + 5 fields + one `using`) plus small additions (2 float fields on an existing script, 1 object reference) — expected to slightly reduce compiled-script size, not increase it. No new asset/package. Verification plan requires a re-measured build size, not an estimate, per plan.md section 6.

## testing/luna-verification.md, luna-production-governance verification.md
Verification plan separates Editor checks, manual/PlayMode checks, and Luna/build checks, and defines a rollback boundary, matching the structure required for `implementation-report.md` once this plan is approved and executed. Explicitly calls out that this is a regression-sensitive change (must not alter GO3's existing handoff behavior) and lists the specific repeat-cycle/orphan-tween checks the research flagged as risks.
