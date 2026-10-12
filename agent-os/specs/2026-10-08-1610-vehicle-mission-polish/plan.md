# Plan: Vehicle mission selection, guidance and smooth driving

Status: APPROVED

Approved scope extension (user, 2026-10-09): replace the map's Floor ground BoxColliders in Gameplay.unity with one flat BoxCollider covering their combined X/Z extent, top Y=13.460. User accepted filling lower ground and gaps. Preserve building/wall/obstacle colliders and source prefab assets. No CarController.TryStep or other runtime code change. Verify car straight driving over the reproduced road, bike and walking, Console and ground coverage; append evidence to implementation-report.md.

Approved clarification (user, 2026-10-08, option 1): preserve existing bike-style guidance outside interaction distance for the car as well. `FindNearest<T>` stays unchanged; interaction distance limits ordinary mounting, not guide visibility.

Decisions resolved by user (2026-10-08): both vehicles start inactive until a mission is picked; tutorial labels stay scene-only; smoothness gets a first-pass mitigation (DriveHoldButton raycastPadding) in addition to diagnostics, not a CarController physics change. See "Decisions requiring your approval" below for the resolved detail.

## Design record

### 1. `PlayerAction` (existing type, `Assets/_Playable_/Scripts/Controller/PlayerAction.cs`) — extended responsibility

- **Responsibility added:** own which vehicle type is reachable/tappable for the currently selected mission, and own the car's guide arrow lifecycle (it already owns the bike's).
- **New serialized field:** `[SerializeField] private Arrow _carArrow;` — same role as the existing `_motorbikeArrow`, assigned to a new "Car Guide Arrow" scene object.
- **New public method:** `public void ActivateVehicleForMission(bool motorbikeMission)`
  - Inputs: `motorbikeMission` (true = activate `_motorbikes`, deactivate `_cars`; false = the reverse).
  - Body: `SetActive(true/false)` on every non-null entry of `_motorbikes` and `_cars` per the flag, then force both `_motorbikeArrow` and `_carArrow` GameObjects inactive (avoids a one-frame stale arrow from the previous mission).
  - No return value; no exceptions — null entries are skipped, matching the existing defensive style in `Awake()`.
  - Called once per mission selection; idempotent, safe to call repeatedly.
- **`Awake()` change (approved):** after building `_tutorialCarColliders`/`_tutorialBikeColliders`, deactivate every entry in both `_cars` and `_motorbikes` so neither vehicle is interactable before a mission is chosen.
- **Existing generic plumbing reused, not rewritten:** the four call sites in `Update()` and `TryMountFromTutorial()` that currently pass `null` for the car's `Arrow` argument (`FindNearest(_cars, _tutorialCarColliders, ref _nearestCar, null)`, the `TryTapVehicle(_cars, screen, ref _mountedCar, null, CarMounted, false, false)` call in `Update()`, and the two car calls inside `TryMountFromTutorial`) change their `null` argument to `_carArrow`. `FindNearest<T>`, `TryTapVehicle<T>`, `TryTutorialTapArea<T>` are unchanged — they are already vehicle-type-agnostic through `IDrivableVehicle`.
- **`OnDisable()` change:** also deactivate `_carArrow.gameObject` (mirrors the existing `_motorbikeArrow` line) for symmetric cleanup.
- **No new interface/pattern.** `IDrivableVehicle` already exists (untracked file from prior work) and already generalizes `FindNearest`/`TryTapVehicle`/`TryTutorialTapArea` over both vehicle types — the car arrow and mission-gating work are both additive uses of that existing generic surface, not a new abstraction.

### 2. `MissionsJournalController` (existing type) — one new call

- `OnGoPressed(MissionRowView row)`: once `row.IsSupportedMission` is confirmed true, call `_playerAction.ActivateVehicleForMission(row.IsMotorbikeMission);` before `Hide()`. `MissionRowView.IsMotorbikeMission` already exists and is otherwise unused — no change to `MissionRowView`.
- No new field, no new method signature change — `_playerAction` is already a serialized dependency of this controller.

### 3. `CarController` (existing type) — temporary diagnostic instrumentation only

- **Responsibility added (temporary):** surface the data the research step says is required before a physics fix can be chosen — throttle/held-input source, grounded state, forward speed, ground normal, and `TryStep` outcome — without changing any driving behavior.
- **New serialized field:** `[SerializeField] private bool _logDriveDiagnostics;` (defaults `false`, inspector-only toggle; never shipped enabled).
- **New private field:** `private float _nextDiagnosticLogTime;` (throttles logging to a fixed interval, e.g. every 0.25s, to avoid Console spam).
- **`FixedUpdate()` change:** when `_logDriveDiagnostics` is true and `Time.time >= _nextDiagnosticLogTime`, `Debug.Log` the already-computed `_input.y`, `IsGrounded`, `current` (forward speed), `_groundNormal`, and the boolean result of the `TryStep` call that already executes this frame; advance `_nextDiagnosticLogTime`. No new Physics calls, no behavior change to the motion/step logic itself.
- This instrumentation is the only sanctioned change to `CarController`'s driving behavior in this plan. No change to `CarController`'s motion/step logic (acceleration, grip, `TryStep`, ground probing) is authorized by this plan — per research.md's explicit instruction not to guess a physics fix without evidence. The approved first-pass mitigation for the smoothness report targets the UI input layer instead (see scene change 4 below), not the vehicle physics.

## Unity scene/asset changes

All in `Assets/_Playable_/Scenes/Gameplay.unity` unless noted.

1. **Car guide arrow:** duplicate the existing "Motorbike Guide Arrow" GameObject (root-level, `Arrow` + `MeshRenderer` + `MeshFilter`, `_targetCamera` already pointed at the shared interaction camera, `_startHeight 2.5` / `_endHeight 2.9` / `_moveDuration 0.8` / `_yawOffset 90`, material guid `67de50b0bd4d02043a0844aba4fed164`). Rename the duplicate "Car Guide Arrow". Leave `_targetPosition` as whatever the duplicate carries — `PlayerAction.ActivateVehicleForMission`/`FindNearest` overwrite it via `Arrow.SetTarget` before it is ever shown. No new mesh/material asset — zero build-size impact beyond one extra GameObject.
2. **Wire the new arrow:** on the `PlayerAction` component in the scene, assign the new "Car Guide Arrow" to the new `_carArrow` field.
3. **Car tutorial labels:** re-anchor the 4 children of "First Car Ride Tutorial" (`FORWARD`/`REVERSE`/`LEFT`/`RIGHT Tutorial Label`) so each sits next to its own button, instead of copying the bike's anchors/offsets:
   - `LEFT`/`RIGHT Tutorial Label` → re-anchor to the same anchor family as "Car Controller/Horizontal" (anchor `(0,0)`, i.e. bottom-left-relative), positioned beside `[Button] Left` (local `(-123,0)` inside Horizontal) and `[Button] Right` (local `(119,0)`) respectively, offset outward/upward by a small margin so the label does not sit on top of the button's tap area.
   - `FORWARD`/`REVERSE Tutorial Label` → re-anchor to the same anchor family as "Car Controller/Rights" (anchor `(1,0)`, bottom-right-relative), positioned beside `[Button] Forward` (local `(-44,232)`) and `[Button] Back` (local `(-46,-58)`) respectively, same outward-offset approach.
   - Keep all 4 labels as children of "First Car Ride Tutorial" (do **not** reparent them under the buttons themselves) — `GameController`'s `RideUIState._firstRideHint` toggles this single container's `SetActive`; reparenting under the always-visible driving buttons would make labels appear for the whole ride instead of only the first one.
   - Exact pixel values are finalized in the Unity Editor (Scene + Game view, previewed at both a portrait and a landscape aspect ratio) rather than hand-computed further in this document, because nested-anchor math is resolution-dependent and the Editor is the reliable source of truth for "does this actually sit next to the button." The fileIDs/hierarchy paths above are sufficient to locate every object without additional search.
   - No change to the bike's "First Ride Tutorial" labels — they were independently verified correct (see shape.md) and are a pure regression check, not a target of this edit.
4. **Driving smoothness — approved first-pass mitigation (hit-area, not physics):** research.md flags `DriveHoldButton`'s `OnPointerExit` → `Release()` as the one concrete, named risk — a finger that drifts slightly off a held button's rect while driving straight releases it, producing exactly the reported coast-then-reaccelerate hesitation, for both car and motorbike (shared component). Rather than guess at `CarController` physics (explicitly rejected — see above), widen the tap tolerance on every `DriveHoldButton`'s `Image.raycastPadding` to a small negative value on all four sides (e.g. `{-30,-30,-30,-30}`; exact value tuned in-Editor against the actual button sizes, which range `70–250px`) so the pointer has to drift further outside the visible button before `OnPointerExit` fires. This is scene/prefab data only:
   - Car buttons: `[Button] Forward`, `[Button] Back`, `[Button] HandBreak`, `[Button] Left`, `[Button] Right` inside the `UICarController.prefab` instance (fileIDs `1390740571/570/567/569/568` in the scene's `CarController` bindings).
   - Bike buttons: the `PlayerController`-bound forward/reverse/left/right `DriveHoldButton`s under "UI motobike" (fileIDs `6340560853437529477`/`8099028185718309901`/`9000000000000105`/`9000000000000205`).
   - No change to `DriveHoldButton.cs` itself (its release-on-exit logic is unchanged) and no change to `CarController.cs`/`MotorbikeController.cs` physics. This is a pure data widening of the existing, already-serialized `m_RaycastPadding` field — fully reversible by resetting the four values to `0`.
   - This is a best-supported hypothesis, not a confirmed fix (the issue was never reproduced). The diagnostic logging in `CarController` (item 3 above) stays in the plan specifically so that, if the report persists after this change, there is already instrumentation to find the real cause without guessing again.

## Event / dependency flow

```
MissionRowView.GoPressed(row)
  -> MissionsJournalController.OnGoPressed(row)
       [row.IsSupportedMission confirmed]
       -> PlayerAction.ActivateVehicleForMission(row.IsMotorbikeMission)
            -> SetActive(true/false) on each _motorbikes[]/_cars[] entry
            -> _motorbikeArrow / _carArrow forced inactive
       -> Hide() / enable gameplay UI (unchanged)

PlayerAction.Update() [every frame, vehicle-agnostic via IDrivableVehicle]
  -> FindNearest(_motorbikes, ..., _motorbikeArrow)   // unchanged
  -> FindNearest(_cars, ..., _carArrow)                // _carArrow replaces null
       -> Arrow.SetTarget(guideOrNull, camera) -> Arrow.gameObject.SetActive(guide != null)
  -> TryTapVehicle(...) on tap, same pattern, mounts via CarController.TryMount/MotorbikeController.TryMount
       -> on mount: arrow.gameObject.SetActive(false) (generic, already existing)
```

No new events are introduced; `MotorbikeMounted`/`CarMounted` on `PlayerAction` are unchanged.

## Decisions (resolved by user, 2026-10-08)

1. **Initial vehicle visibility — approved: hide both at start.** Both vehicles start inactive in `PlayerAction.Awake()`; only `ActivateVehicleForMission` (first called from the first `OnGoPressed`) makes one visible/interactable.
2. **Tutorial label ownership — approved: scene-only.** The car tutorial labels stay as scene-only overrides on the `UICarController.prefab` instance, matching how the bike's equivalent labels are also plain scene content, not baked into any reusable button prefab.
3. **Smoothness fix — approved: hit-area mitigation + diagnostics, not a `CarController` physics change.** User confirmed wanting an actual fix this pass rather than diagnostics-only. Given research.md's explicit "do not guess a physics fix" constraint, the approved fix targets the one named, lowest-risk, evidence-adjacent candidate (`DriveHoldButton` pointer-exit sensitivity) via scene-data widening of `raycastPadding` (scene change 4 above), not `CarController`'s acceleration/grip/step code. The diagnostic logging in `CarController` remains in the plan as a safety net in case the report persists after this change.

## Task order

1. `PlayerAction.cs`: add `_carArrow` field, add `ActivateVehicleForMission`, rewire the 4 car call sites from `null` to `_carArrow`, update `OnDisable()`, update `Awake()` to deactivate both vehicle arrays.
2. `MissionsJournalController.cs`: add the one-line `ActivateVehicleForMission` call in `OnGoPressed`.
3. Wait for Unity compilation/domain reload; read Console for errors before touching the scene.
4. `Gameplay.unity`: duplicate+rename "Car Guide Arrow", wire it to `PlayerAction._carArrow`.
5. `Gameplay.unity`: re-anchor the 4 car tutorial labels per button, verified visually in the Editor at portrait and landscape preview.
6. `Gameplay.unity`: widen `raycastPadding` on the 5 car `DriveHoldButton`s and the 4 bike `DriveHoldButton`s (negative values on all sides), tuned against each button's actual size in-Editor.
7. `CarController.cs`: add the gated diagnostic logging block only (no physics change).
8. Manual drive pass on the actual reported road with the widened hit areas in place and `_logDriveDiagnostics` on; confirm whether the hesitation still reproduces; capture Console evidence either way; report back before any further change (especially any `CarController` physics change) is proposed.

## Verification plan

- **Compile/Console:** after each script change, wait for domain reload, confirm zero new Console errors; review warnings.
- **Mission gating (new):** from a fresh play, confirm neither vehicle is active until a mission GO is pressed; pressing the motorbike GO activates only the motorbike and deactivates the car (and vice versa); reopening the Missions Journal (on foot only, matching the existing `IsRiding` guard in `Show()`) and picking the other mission correctly flips activation both ways; a hidden vehicle cannot be hit by `TryTapVehicle`'s `Physics.RaycastAll` or counted by `FindNearest` (already guaranteed by the existing `activeInHierarchy` checks once `SetActive(false)` is applied).
- **Car arrow:** arrow appears pointing at the car while on foot with `IsWorking` true and the car active/undriven, including outside interaction distance (user-approved option 1); hides on mount, on disable, and reappears correctly after `RequestDismount`/Out; never targets an inactive car (mirrors the existing bike-arrow behavior, same code path).
- **Tutorial labels:** in both a portrait and a landscape Game-view preview, each of the 4 car labels visually sits next to its own button and does not overlap/intercept the button's pointer input (manual Editor check, since `DriveHoldButton`'s raycast target is the button's own graphic, not the label); bike labels remain visually unchanged (regression check only).
- **Driving regression:** forward, reverse, left/right steering, handbrake, walls, low steps, headroom and slope behavior are unchanged after the diagnostic-only `CarController` edit (it must not alter `TryStep`/`FixedUpdate` control flow, only add a log call) — confirm by diffing the method bodies, not just by play-testing.
- **Hit-area mitigation:** after widening `raycastPadding`, confirm each `DriveHoldButton` still releases correctly on a genuine `OnPointerUp` (lift) and does not start overlapping an adjacent button's hit area (no two buttons simultaneously "held" from one touch point); then drive the reported road segment and record whether the hesitation still reproduces.
- **Diagnostic capture:** with `_logDriveDiagnostics` enabled, drive the reported road segment through at least one seam/collision point; confirm the Console captures throttle-held state (and whether it originated from keyboard or the UI hold button), grounded state, forward speed and `TryStep` result across the stop event, per research.md's explicit instruction. Only claim the smoothness issue is fixed if the hesitation no longer reproduces after the hit-area change; if it still reproduces, report the captured evidence back instead of guessing a second mitigation.
- **Luna/runtime scope:** no `FindObjectOfType`/`GameObject.Find`/tag search/prohibited Physics2D query API introduced; old Input handling only; no new package/shader/material policy change; the duplicated arrow GameObject and one new serialized reference have no measurable build-size impact, but record the build size after this change per the 4.5 MB budget policy.
- **Luna mount issue / size work carve-out:** per research.md, any previously deferred Luna mount issue or size work remains out of scope and is not touched or claimed fixed by this work item.

## Rollback boundary

All scene/prefab edits in this plan are additive and reversible (one new GameObject, four re-anchored RectTransforms, one new serialized field assignment). No existing GameObject is deleted or reparented across containers. If any step fails verification, the specific sub-step can be reverted independently (e.g. revert label anchors without reverting the arrow wiring) since they touch disjoint objects.
