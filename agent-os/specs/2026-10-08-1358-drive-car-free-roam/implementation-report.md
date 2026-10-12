# Implementation report - Drive Car free roam

Date: 2026-10-08
Status: Handoff completed with user-deferred limitations. Editor checks passed; size-budget work waived. The confirmed Luna car-mount runtime failure remains unresolved.

## Final user-directed disposition

User requested skipping the proposed CharacterJoint correction and remaining Luna runtime verification. No joints were removed and no additional runtime or scene changes were made for this closeout. The implementation is handed off with Editor verification evidence; Luna car mount is known to fail and is not marked as accepted or passing. Physical-device verification remains unperformed. Size-budget work was separately waived; the measured archive still exceeds the target.

## Latest continuation: budget waived, packaged runtime tested

User explicitly requested skipping the size step and completing remaining work. No size optimization is required for this handoff, and no size-related changes were made. The archive measurement remains factual, not a passing budget result.

Extracted the current ZIP into Temp/DriveCarVerification/packaged and served it locally in headless Edge with software WebGL at 480x854. The Playground template requires its host protocol; sent the existing setPlaygroundAssetOverrides message with empty overrides to start it. Startup rendered the mission journal, and GO opened gameplay. Camera drag revealed the car. These checks ran packaged JavaScript, not Unity Editor.

Real mouse down/up separated by 150 ms reproduced a car-mount failure. State after tap: car.IsDriven=true and player.IsRiding=true, but GameController._riding=false, car UI inactive, and PlayerAction._mountedCar unset. Runtime error:

```text
TypeError: this.code.OnDisable is not a function
at S.onDisable (engine/scripts.js)
... hierarchy deactivation ...
at p.BeginDrive (engine/scripts.js)
```

The failing engine adapter is the physics-joint adapter: its onDisable calls code.OnDisable followed by _adapter.disableConstraint. Read-only Unity inspection found 10 CharacterJoint components under Player, on LeftUpLeg, LeftLeg, RightUpLeg, RightLeg, Spine, LeftArm, LeftForeArm, Head, RightArm and RightForeArm. Their source is Assets/Game/Prefabs/Characters/Player/Player.prefab. The current playable controllers contain no CharacterJoint/ragdoll references. Player root deactivation therefore reaches existing joint lifecycle code before CarController can complete the camera/UI transition.

Evidence: luna-car-interaction.json, luna-car-mounted.png, luna-car-driving.png, luna-car-out.png, luna-started.png and luna-car-go.png under Temp/DriveCarVerification. A separate in-memory served-script diagnostic added logging only and still reproduced the original exception; it did not patch the project or ZIP and is not an acceptance pass. Runtime also logged audio decode failure and Dynamic font/underline warnings, which remain separate unresolved observations.

Proposed correction, NOT APPLIED: remove the 10 CharacterJoint components as overrides on the Player instance in Gameplay.unity, leaving the source Player.prefab unchanged. This preserves the required SetActive(false/true) player lifecycle and does not add a class, runtime search or dependency. Rebuild and repeat car input/Out plus walking/motorbike regression. Ragdoll behavior would no longer be available on this scene instance; it is not part of this feature. Alternative: separately approve a Luna package/engine compatibility fix while preserving joints, with wider scope and verification requirements.

This would change existing Player components beyond the approved scene additions/rebinding, so no removal was performed. The user subsequently requested skipping this correction; the joint lifecycle error remains a known unresolved defect at handoff. Physical-device verification remains unperformed.

## Scope and approvals

Only the spec folder referenced by current.md was used. User approved this plan and the following additions during implementation:

- IDrivableVehicle.transform, required by existing camera collision exclusion.
- CarTouchpad uses existing TouchController; car mount/Out switches and restores camera input.
- Cached zero-friction runtime PhysicsMaterial in CarController, assigned in Awake and destroyed in OnDestroy; no material asset added.
- Bounded BoxCollider step traversal inside CarController with forward/downward probes, upward sweep and destination overlap checks; no map collider changes.

## Files changed

| File under Assets/ | Change |
|---|---|
| _Playable_/Scripts/Controller/IDrivableVehicle.cs (+ .meta) | Shared vehicle contract |
| _Playable_/Scripts/Controller/CarController.cs (+ .meta) | Driving, braking, grounding/step traversal, wheels, mount/Out, player/camera/input lifecycle |
| _Playable_/Scripts/Controller/MotorbikeController.cs | Interface declaration only |
| _Playable_/Scripts/Controller/CameraController.cs | Shared interface for vehicle field and FollowVehicle |
| _Playable_/Scripts/Controller/PlayerController.cs | BeginDrive/EndDrive hide and restore player |
| _Playable_/Scripts/Controller/PlayerAction.cs | Car registration, shared nearest/tap/tutorial helpers and separate mounted events |
| _Playable_/Scripts/GameController.cs | Nested RideUIState, independent first-ride hints, car movement/input subject and correct tutorial dispatch; brightness retained |
| _Playable_/Scripts/UI/MissionsJournal/MissionRowView.cs | Both driving IDs supported |
| _Playable_/Scripts/UI/MissionsJournal/MissionsJournalController.cs | GO routes both driving missions into existing free-roam flow |
| Game/Resources/UI/UICarController.prefab | Removed Fuel/Coin/Tunning and missing source components; five holds, Exit and TouchController |
| _Playable_/Scenes/Gameplay.unity | Car_8, Rigidbody/BoxCollider, camera target/four wheels, UI/hint instance, reference migration and wiring |

Approval annotations updated in plan.md; this report added. Pre-existing edits were retained. Other existing changes (DrivingPlayModeChecks, SVC_Luna, packages, luna.json, IDE state) were not authored or reverted. No commit/push/upload was requested or performed by the implementation workflow.

## Editor verification

Environment: Unity 6000.0.60f1, PA_Craft, Gameplay scene. Compiled/domain reloaded after script changes. Final pre-build Console error query: zero errors. Scene saved; runtime test objects were discarded when leaving Play Mode.

26 integration checks passed on the actual map after the friction and step corrections, using in-memory MCP code and synthetic PointerEventData:

- Car mission GO, paintball guard, opening-tutorial mount, player hidden/riding state.
- Camera interface target, first hint shown, settling does not dismiss, driving displacement dismisses.
- Forward/reverse movement, left/right steering, handbrake after motion, opposing throttle/steering cancellation, unrelated pointer release ignored.
- Pending Out while moving, Out after slowing, player restored, camera/walking touchpad restored.
- Repeat mount does not replay car hint; disabling car returns player.
- Motorbike mounts/exits after car use, camera follows it, its first hint remains independent.

Additional checks passed:

- Blocked Out retains rider, permits drive input, and succeeds after landing clearance becomes available.
- Camera changes yaw through TouchController OnPointerDown/OnDrag/OnPointerUp; journal Show is blocked while driving.
- Controlled step test accepts 0.15 m, lifts body to y=49.17 from y=49, rejects a 1.5 m wall, and rejects blocked headroom. These are direct method/physics checks, not a full collision endurance test.
- Landscape (743x418) and portrait (235x418) screenshots show car controls with excluded widgets absent. Original Game View aspect restored.
- No missing serialized CarController object references; no missing scripts or Fuel/Coin/Tunning nodes in car UI.
- New code scan found none of the searched prohibited lookup APIs, Physics2D, WheelCollider or New Input System.

Evidence (local project temporary artifacts):

- Temp/DriveCarVerification/map-step-checks.txt ? all 26 PASS.
- Temp/DriveCarVerification/edge-checks.txt ? blocked-Out checks PASS; initial low-step fixture overlapped the car and was corrected in the next test.
- Temp/DriveCarVerification/step-limits.txt ? corrected fixture, all three PASS.
- Temp/DriveCarVerification/car-model.png ? selected model/spawn.
- Temp/DriveCarVerification/car-ui-landscape-1.png and car-ui-portrait.png ? visible controls.
- Temp/DriveCarVerification/flat-checks.txt ? all 26 PASS on a temporary flat surface during diagnosis.
- Temp/DriveCarVerification/luna-build.log ? current local build attempt.

Earlier failed checks.txt results preceded the fixes. Default friction initially prevented movement; after that correction, a road collider seam (Floor -1,-6 near z=-83.99) blocked movement. The approved step correction resolved the map integration failures. Editor-only diagnostic probes also had two corrected API/property mistakes; they created no source files and are not runtime errors.

## Size, rendering and Luna

- Car_8: 2,827 triangles (2,075 body + four wheels at 188).
- FBX source: 148,156 bytes; Gameplay source: 537,033 bytes; UI prefab source: 34,779 bytes at measurement. Source sizes do not establish the 4.5 MB build budget.
- Car reuses existing Particles/Standard Unlit and Playable/Unlit Brightness materials. No shader/material asset was created or edited. The pre-existing custom shader does not satisfy the strict built-in allowlist; material-policy compliance is not claimed.
- Existing create-hub ZIP before this implementation measured 5,722,859 bytes, timestamp 2026-10-08 11:48 local. It is stale and cannot represent the current implementation or prove its budget.
- Local Luna 7.2.0 project:build completed all four logged stages and generated the develop output. That shell invocation returned exit code 1 despite stage success messages; no clean exit is claimed. A subsequent package:bundle with TARGET_PLATFORM=playground completed with exit code 0 and generated the current ZIP in stage4/create-hub. The interrupted first packaging attempt was restarted after the user requested continuation. An attempted target named create-hub had no installed template; playground is the supported template that generates that output folder.

## Limits and remaining acceptance

No physical-device validation or successful full Luna runtime test. A headless Edge smoke attempt on the develop iframe via a simple local HTTP server failed with missing local services/unsupported POST and an audio decode error; this setup does not establish a gameplay regression or a runtime pass. Evidence: luna-runtime-log.json and luna-runtime.png. Every city curb/slope/map boundary, long driving endurance and all focus/pause combinations remain unproven. Existing DrivingPlayModeChecks depends on old GameController private field names; it was not changed outside scope or presented as a passing suite.

Pre-existing warnings: ModelSwitcher obsolete FindObjectOfType and btnBackToHome missing scripts. No out-of-scope repair applied. Unity YAML serialization produces empty-value trailing whitespace; broad diff --check reports those lines, not C# compile failures.

Pending Out keeps car input responsive and exits only when slow, following the approved free-driving/blocked-exit behavior. Earlier plan wording about suppressing input while exit is pending conflicts with that behavior; the implemented behavior and tests are explicitly documented here.


## Final build, regression and budget result

- Additional motorbike regression: all 9 checks PASS on map, covering bike mission GO, tutorial-tap mount/public state, first hint, forward acceleration, movement dismissal, left steering, reverse, Out and no tutorial replay. Evidence: Temp/DriveCarVerification/motorbike-regression.txt.
- Final Editor Console error query: zero entries. Editor stopped in Edit Mode; transient test objects were not saved.
- Current artifact: LunaTemp/stage4/create-hub/CCPW_V02_AnhPP_HuyNQ_build.zip, generated 2026-10-08 15:11 local, 5,865,051 bytes, 185 ZIP entries. This is the Luna Playground build archive, not a separately measured ad-network single-HTML export.
- The measured archive exceeds the 4,500,000-byte target by 1,365,051 bytes. It also exceeds 4.5 MiB. No claim that the size budget is met.
- Previous archive was 5,722,859 bytes; observed difference is +142,192 bytes, but without a controlled baseline rebuild this is not an isolated attribution to the car feature.
- Package-size evidence: Temp/DriveCarVerification/package-size.json.

Compressed ZIP payload breakdown (central-directory/header overhead excluded):

| Category | Compressed bytes |
|---|---:|
| Scripts, including generated cache | 3,254,616 |
| Data/other, including mesh/animation blobs | 1,134,110 |
| Textures | 959,671 |
| Audio | 492,869 |

Largest individual entries: engine/scripts.js 1,494,279 bytes; cache/210/scripts.js 1,280,960; assets/bundles/-1/data.blob 865,245; assets/bundles/-1/47358.mp3 474,247; cache/210/blobs.js 365,293. Mesh and animation contributions are combined in generated blobs; no unsupported separate estimates are presented. Cache content is generated by the packaging pipeline and has not been assumed safe to delete.

Luna diagnostics contained 10 entries: unsupported Dynamic TMP atlas population (FFFFORWA, FredokaOne, LevelUp, LiberationSans fallback), missing default background playground asset, 14 Rigidbodies versus recommended 10, 162 files versus Facebook recommendation/limit of 100, unsupported Timeline package and no custom events. These were recorded without changing fonts, packages, background assets or analytics outside the approved list.

Final scope decision: the user requested handoff while skipping size-budget work and the proposed joint correction. No asset removal, compression change, package removal, joint removal or new shader/material work has been applied. Any future correction requires a separately approved scope; no further approval is pending for this handoff.
