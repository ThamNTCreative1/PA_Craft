# Standards applied: Vehicle mission selection, guidance and smooth driving

Status: APPROVED

## Governance gates (per `luna-production-governance`)

- Claude (this document) performed planning only; no project file was modified while producing `shape.md`/`plan.md`/`standards.md`. Codex implements only now that this plan is approved.
- All 3 decisions in plan.md's "Decisions (resolved by user, 2026-10-08)" were surfaced as explicit options and resolved by the user directly, not decided by Claude.
- The user asked for an actual smoothness fix in this pass rather than diagnostics-only. Because research.md explicitly forbids guessing a `CarController` physics fix without reproduction, the approved fix is scoped to the one named, lowest-risk candidate (`DriveHoldButton` hit-area via scene-data `raycastPadding`, not code or physics) plus the diagnostic logging as a safety net. No change to `CarController`'s motion/step logic or to `DriveHoldButton.cs` itself is authorized by this plan — if the report persists after the hit-area change, the real fix still requires a renewed approval with evidence, per governance.

## OOP / SOLID review

- **SRP:** `PlayerAction` already owns "which vehicle can the player reach/mount/see an arrow for" — adding `ActivateVehicleForMission` and the `_carArrow` field extends that single existing responsibility; it does not give `PlayerAction` a second reason to change. `MissionsJournalController` keeps its existing responsibility ("translate a GO press into opening/closing the shared gameplay UI") and only gains one outgoing call, not new state. `CarController`'s diagnostic log is additive and does not change its existing "drive the car" responsibility; it is flagged as temporary precisely so it does not become a second permanent responsibility.
- **OCP/LSP:** no inheritance or interface change. `IDrivableVehicle` (already in the codebase, untracked from prior work) is consumed as-is; `CarController`/`MotorbikeController` continue to satisfy its contract unchanged.
- **ISP:** no interface changes at all in this plan.
- **DIP:** all new dependencies are serialized references (`_carArrow`) or calls on an already-injected dependency (`_playerAction` in `MissionsJournalController`) — no runtime lookup (`FindObjectOfType`/`GameObject.Find`) introduced anywhere.

## Pattern justification

No new design pattern is introduced.

- The car-arrow and mission-gating work are both pure reuse of the existing generic `FindNearest<T>`/`TryTapVehicle<T>`/`TryTutorialTapArea<T>` methods and the existing `Arrow.SetTarget` API — a direct method addition (`ActivateVehicleForMission`) was sufficient; a Strategy/Command/Factory abstraction was considered and rejected because there is exactly one activation rule (motorbike XOR car) with no second variant expected, and wrapping it would add IL2CPP size/indirection without benefit.
- The tutorial-label fix and the `DriveHoldButton` hit-area widening are both scene-data corrections (RectTransform anchors; `Image.raycastPadding`), not code-level concerns — no pattern applies, and `DriveHoldButton.cs`'s own release logic is untouched.
- The diagnostic logging is a temporary, flag-gated instrumentation addition, not a Strategy/State machine — it reads existing local variables and does not branch control flow.

## Luna/runtime constraints checked

- Old Input handling: unchanged; no new Input System usage anywhere in this plan.
- No `FindObjectOfType`, `GameObject.Find`, tag search, or prohibited Physics2D query API is introduced. `ActivateVehicleForMission` iterates the already-serialized `_cars`/`_motorbikes` arrays; the diagnostic log reads fields already computed in `FixedUpdate`.
- Built-in render pipeline / Unlit material policy: unaffected — the duplicated "Car Guide Arrow" reuses the existing arrow mesh/material guid verbatim; no new material or shader is created.
- `LunaController`/Service Locator: not touched; this feature has no Luna SDK/event surface.
- Outcome flow (Win/Lose/EndCard/CTA): not touched; this is pre-outcome gameplay/UI polish.
- Build/scene budget: the only size-relevant addition is one duplicated GameObject (`Arrow` + `MeshRenderer` referencing existing mesh/material) — negligible, but must still be measured against the 4.5 MB target per policy, not assumed.

## Verification ownership

Verification criteria are captured in `plan.md`'s "Verification plan" section per `luna-test-and-verify`: Console check after each script change, functional checks for mission gating / car arrow / tutorial label placement / driving regression, the diagnostic capture pass, and the Luna/runtime and build-size checks. `implementation-report.md` (produced after implementation, not by this planning pass) must state which of these were actually run and their results — no check may be reported as passed without having been executed.
