# Vehicle mission selection, guidance and smooth driving

Status: RESEARCH COMPLETE - CLAUDE PLAN REQUIRED

## Request

Activate only the vehicle for the selected car/bike mission. Give the car an arrow like the bike. Place each tutorial label on its corresponding button. Investigate and correct repeated hesitation/stopping while driving straight.

## Observed current implementation

- MissionsJournalController.OnGoPressed checks IsSupportedMission, then opens the shared gameplay UI without selecting vehicle activation. MissionRowView already exposes IsMotorbikeMission.
- PlayerAction has serialized car/bike arrays. FindNearest filters inactive objects. Bike calls supply _motorbikeArrow; car calls supply null, including nearest and mount paths. Arrow.SetTarget already supports a generic Transform.
- GameController owns separate RideUIState panels and first-ride hints. Hints disappear after driving input and 0.05 m planar travel. These state transitions can be retained.
- Gameplay.unity contains First Car Ride Tutorial with four labels (FORWARD, REVERSE, LEFT, RIGHT). They are children of a full-screen tutorial container with fixed offsets, rather than attached to their corresponding buttons. Their coordinates mirror bike labels despite the different car UI layout. No handbrake/Out labels exist in this group.
- CarController uses a frozen-rotation dynamic Rigidbody, a frictionless BoxCollider, two downward ground probes, ground-gated planar acceleration and bounded TryStep. TryStep directly lifts body.position after casts and clearance checks. Collision response changes the velocity used as the next frame's acceleration baseline.
- DriveHoldButton releases on pointer exit, so uninterrupted visual contact/input must be distinguished from a physical obstruction before changing driving logic.

## Smoothness: uncertainty and diagnostic requirement

The reported repeated stopping has not been reproduced in this research pass. Static inspection does not prove whether the cause is input loss, intermittent grounding, road seams/collisions, step rejection or a combination. Record throttle-held state, grounded state, planar speed, ground collider/normal and step outcome along the reported road before choosing a correction. Compare held keyboard input against held UI input and flat ground against the actual road. Do not simply increase acceleration, disable collision, or claim zero friction solves the report.

## Candidate affected files for Claude to finalize

- Scripts/UI/MissionsJournal/MissionsJournalController.cs: route mission selection before opening gameplay.
- Scripts/Controller/PlayerAction.cs: vehicle activation using existing arrays and car arrow lifecycle, including all mount routes and disable cleanup.
- Scripts/GameController.cs: only if label grouping/lifecycle requires adapting RideUIState.
- Scripts/Controller/CarController.cs: grounded motion/step correction after diagnosis.
- Scenes/Gameplay.unity: serialized bindings, car guide arrow using existing assets, per-button label placement.
- Game/Resources/UI/UICarController.prefab: only if labels are authored in the prefab instead of scene overrides. Choose one owner in the plan.
- DriveHoldButton.cs is an investigation dependency, not an automatically authorized change; it is shared with the bike.

Paths above are relative to Assets/_Playable_ except the explicitly named Game prefab. No new interface, package, shader, imported model or external source logic is needed for the first three requirements. Physics solution remains undecided.

## Verification to include in the implementation plan

- Each mission GO activates exactly its intended vehicle; switching missions while walking restores correct visibility and interaction. Hidden vehicles cannot be tapped/mounted.
- Car arrow points at the car before mount, hides on mount/disable, returns on Out, and never targets an inactive vehicle.
- Each label aligns with its own button in portrait and landscape, does not intercept pointer input, and retains first-ride lifecycle separately for car and bike.
- Sustained Forward on actual roads: capture speed/ground/input evidence through seams; verify reverse, steering, braking, walls, low steps, headroom and slopes after any physics adjustment.
- Compile/Console, motorbike regression, serialized references, old Input compatibility and scoped Luna API checks.
- Existing user-deferred Luna mount issue and size work are not authorization for new fixes in this request. Do not claim Luna runtime success without running it.

## Handoff

No runtime source, scene or prefab was modified. No old spec plan was read. Research artifacts and current.md are the only writes in this pass. Claude must produce the exact implementation and verification plan under the project workflow; user approval precedes implementation.
