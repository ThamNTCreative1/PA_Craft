# Paintball camera yaw audit
Status: RESEARCH READY
Scope: read-only diagnosis; no gameplay, scene, settings or generated-build changes.

## Request
Player does not face camera direction while firing in the Luna paintball mission.

## Observed source facts
- GameController handles brightness and tutorial/ride UI; it does not implement paintball aiming.
- PlayerPaintballController.LateUpdate (133-140) sets camera-follow yaw while fire is held or aim/reload state is active.
- CameraController.UpdateCamera (253-257), invoked by LateUpdate, clears that same state unconditionally in third person.
- PlayerController.SetCameraYaw (289) stores state only. FixedUpdate (229-232) later consumes it to MoveRotation. Clearing the flag before the next physics step prevents stationary aiming rotation; movement instead rotates toward travel direction.
- CameraController declares DefaultExecutionOrder(100); PlayerPaintballController declares DefaultExecutionOrder(120). Unity semantics make camera run first and paintball restore the flag afterward (official reference: https://docs.unity.com/en-us/engine/6000.0/script-reference/unityengine/defaultexecutionorder).
- Gameplay.unity binds both controllers to player component 529199471 and camera component 3791338694420476026. Camera view mode is 0 (third person).
- Projectile direction is separately computed from the camera/crosshair ray; successful shooting does not prove player-facing rotation works.

## Local Luna export evidence
- Existing stage4 generated JS has timestamp 2026-10-09 17:40:42 (local filesystem time); it is not a new build and may differ from the user's deployed creative.
- stage4 UnityScriptsCompiler.js retains both conflicting state writers at lines 3811 and 7215, and the physics consumer at 6660.
- stage1 and stage2 assets/project-settings/-1.json data[0] contain six script execution-order entries, none for either Playable controller.
- stage4 engine/luna/script1.js initializes component order from this.scriptsExecutionOrder[t.code.$$fullname] || 0. _applyProjectSettings builds this map from exported scriptsExecutionOrder. The callback queue sorts by internalExecutionOrder then script order, using creation order as tie-breaker.
- DefaultExecutionOrder attributes remain in compiled metadata, but the inspected scheduler path uses the exported map. Merely retaining the attribute in JS does not establish the effective scheduler priority.

## Diagnosis and confidence
Confirmed: competing writers to the same aim-follow state and missing explicit priorities in the inspected Luna export. Strong candidate for the reported Luna-only failure: paintball executes before camera, camera clears the flag, and the next FixedUpdate sees false. Exact live callback order and flag values during the user's failing session have NOT been captured. Do not claim a browser reproduction or universal lack of DefaultExecutionOrder support across Luna versions.
Rigidbody FreezeRotation and Luna extrapolation are secondary checks if the follow flag is true in a live failing frame; no evidence yet justifies changing physics settings.

## Planning handoff (not an implementation plan)
Consider removing competing ownership of camera-follow state so paintball aiming cannot be cleared by normal third-person camera updates. Alternatively assess explicit exported script execution priorities as a narrow fix, with an export check. Claude must define the exact scope and verification before implementation approval. No new class, interface, asset or package is established by this research.

## Verification needed
Capture paintball LateUpdate -> camera LateUpdate ordering, follow flag, camera yaw and player Rigidbody yaw while stationary and holding/dragging fire. Repeat after a fresh full Luna export. Check walking + firing, release/aim timeout, first person, pause, mission switch and vehicle return. Compare Editor and Luna. Verify exported order entries if choosing an order-based fix.
No Unity compile, PlayMode, new Luna build, browser playback or size validation was performed in this diagnosis.
