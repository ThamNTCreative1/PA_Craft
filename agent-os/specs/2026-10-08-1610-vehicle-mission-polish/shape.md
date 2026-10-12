# Shape: Vehicle mission selection, guidance and smooth driving

Status: APPROVED

## Problem restated

1. Both the car and the motorbike are interactable regardless of which mission the player picked in the Missions Journal. Only the vehicle matching the selected mission should be active/tappable.
2. The motorbike has a guide arrow (`Arrow` + `PlayerAction._motorbikeArrow`); the car has no equivalent, even though `PlayerAction` already mounts cars through the same generic path.
3. `Gameplay.unity` has a "First Car Ride Tutorial" group whose four labels (FORWARD/REVERSE/LEFT/RIGHT) were authored with the exact same anchors/offsets as the bike's "First Ride Tutorial" labels. The car's own button layout (`UICarController.prefab`, "Car Controller/Horizontal" for Left/Right, "Car Controller/Rights" for Forward/Back/HandBreak) is structurally different from the bike's layout ("UI motobike", flat children anchored bottom-left/bottom-right paddles), so the copied coordinates land in the wrong place for the car.
4. Reported repeated hesitation/stopping while driving straight has not been reproduced by static reading. `CarController.FixedUpdate`/`TryStep` and `DriveHoldButton` (releases on pointer-exit) are candidate causes, but none is confirmed. Research explicitly says not to guess a fix.

## Confirmed current-source facts (read this pass, no project files modified)

- `PlayerAction` (`Assets/_Playable_/Scripts/Controller/PlayerAction.cs`) already has a type-generic `FindNearest<T>`, `TryTapVehicle<T>`, `TryTutorialTapArea<T>` (`T : Component, IDrivableVehicle`) that take an `Arrow` parameter. The car call sites (`Update()`, `TryMountFromTutorial`) all pass `null` for that parameter today — the generic plumbing for a car arrow already exists, only the car-specific wiring is missing.
- Scene (`Gameplay.unity`) has exactly one car (`fileID 1210184722`, `CarController`) and one motorbike (`fileID 1229354662`) bound to `PlayerAction._cars`/`_motorbikes`.
- `PlayerAction` (component fileID `529199470` in the scene) currently has `_motorbikeArrow: {fileID: 1028224197}` (the "Motorbike Guide Arrow" GameObject, `fileID 1028224196`, a root-level scene object, `m_Father: {fileID: 0}`) and no car-arrow field.
- `MissionRowView.IsMotorbikeMission` already exists and is unused by `MissionsJournalController.OnGoPressed`, which currently only checks `IsSupportedMission` and opens the shared gameplay UI — it never tells `PlayerAction` which vehicle the player picked.
- "First Car Ride Tutorial" (`fileID 527513978`) is parented under the stripped root RectTransform of the `UICarController.prefab` instance (`fileID 1390740564`, prefab guid `d8bac3c70b131c1408eec1a486dc1bf8`). Its 4 labels are plain scene GameObjects (not prefab content) added as overrides on that instance — mirrors exactly how the bike's own "First Ride Tutorial" (`fileID 1307206192`) is a plain scene GameObject parented under "UI motobike" (`fileID 539229847`), which is itself not a prefab instance at all.
- Verified by direct YAML inspection that the **bike** labels are correctly placed (same anchor + ~100px offset as their own button): FORWARD label (anchor `(0,0.5)`, pos `(217,-65)`) sits above the bike's own Forward button (anchor `(0,0.5)`, pos `(217,-163)`); REVERSE sits below the Reverse button; LEFT/RIGHT sit above their respective side-paddle buttons. The bug is isolated to the **car** labels.
- Car button layout (`UICarController.prefab`), relative to "Car Controller" root (which is coordinate-equivalent to the tutorial container's parent, since every ancestor in between stretches 0,0→1,1 with zero size delta):
  - "Horizontal" group, anchor `(0,0)`, pos `(366,380)`, size `100×100` → children anchor `(0.5,0.5)`: `[Button] Left` at local `(-123,0)`, `[Button] Right` at local `(119,0)`.
  - "Rights" group, anchor `(1,0)`, pos `(-276,347)`, size `100×100` → children anchor `(0.5,0.5)`: `[Button] Forward` at local `(-44,232)`, `[Button] Back` (reverse) at local `(-46,-58)`, `[Button] HandBreak` at local `(-46,90)`.
  - This means the car's Left/Right buttons are bottom-**center-left** (anchor family `(0,0)`), and Forward/Back/HandBreak are bottom-**right** (anchor family `(1,0)`) — a different anchor family on both axes than the bike's labels (`(0,0.5)` and `(1,0.5)`), which is exactly why a value copy cannot produce correct placement; each car label needs new anchors derived from its own button's group, not adjusted numbers from the bike.
  - No HandBreak tutorial label exists today (car or bike) and none is requested — out of scope.

## Scope boundary

In scope: `PlayerAction.cs`, `MissionsJournalController.cs`, `Gameplay.unity` (vehicle activation, car arrow GameObject + wiring, car tutorial label anchors, `DriveHoldButton` `raycastPadding` widening on both vehicles), `CarController.cs` (diagnostic instrumentation only — no physics fix). `UICarController.prefab` is read-only research; it is not modified (scene-only overrides stay the ownership, per the resolved decision in plan.md).

Out of scope / explicitly deferred: any change to `CarController`'s motion/step physics (acceleration, grip, `TryStep`, ground probing) — not authorized by this plan even though a smoothness mitigation is included, because it was never reproduced; any change to `DriveHoldButton.cs`'s own event-handling code (only its scene-serialized `raycastPadding` data changes); handbrake tutorial label (not requested); any new interface/pattern beyond what already exists (`IDrivableVehicle` already supports this work unchanged).
