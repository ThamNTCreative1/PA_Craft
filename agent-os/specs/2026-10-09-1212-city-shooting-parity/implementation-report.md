# City shooting adaptation — implementation report

Implemented the user-approved City Player2 / Gun002 / PlayerAnimator Pistol source slice. Infinite reserve and existing five-NPC mission remain intact.

## Changed

- `Assets/_Playable_/Scripts/Paintball/PlayerPaintballController.cs`: TryFire requests the Fire animation; remapped source events emit the projectile, refill the magazine and complete reload. Projectile emission occurs after the animated pose is evaluated. The source 0.97 look-alignment threshold prevents firing while facing away. Facing follows the camera during use/reload and returns to movement-directed behavior when idle. Pause freezes the animator; exit clears queued emission. No new runtime types, packages or interfaces.
- `Assets/_Playable_/Animations/Paintball/PlayerPaintball.controller`: pistol Idle/Aim/Equip/Fire and pitch-blended Reload replace simplified rifle states. Reload thresholds match source: High at -30, Mid at 0, Low at 30. Existing lower-body locomotion retained.
- Seven new `Pistol*.anim` clips: Idle, Aim, Fire, EquipFromIdle, ReloadHigh/Mid/Low, with metadata. All seven local FBX files were SHA-256 compared against party-craft originals and matched. Clones remap Opsive ExecuteEvent to OnPaintballAnimationEvent; source event times are retained. An equip-complete callback at 98% of the equip clip closes the target's equip state.
- `Assets/_Playable_/Scenes/Gameplay.unity`: explicit chest reference and hand-relative socket rotation calibrated from PistolAim. Gun stays attached to its animated hand instead of being rotated independently in world space.

GameController, vehicle controllers, NPC code, source project and shared imported FBXs were not changed in this work item.

## Verification

- Unity compilation succeeded; final Console error query returned zero entries.
- Real-time hold test: 37 shots, three automatic reloads, reserve remained -1. Approximately 0.6 seconds between shots; source Fire event occurs at 0.039666 seconds in the 0.208333-second clip. Evidence: `Temp/CityShooting/real-time.txt`.
- After adding the final alignment guard: immediate fire while facing away was rejected with ammo unchanged; holding Fire turned the player and produced 13 shots through one reload. Evidence: `Temp/CityShooting/final-checks.txt`.
- Paused pending animation did not emit a projectile. Resume emitted exactly once. After evaluating the newly requested Fire state at zero delta, its normalized time stayed frozen while paused. Initial exploratory baselines were taken before the pending Animator.Play state had evaluated and are explicitly not evidence of a failure to freeze.
- Exit ignored late use events; mission re-entry reset to 12 rounds and equipped successfully. An initial pause attempt was rejected by the alignment guard and did not test a pending shot; the later accepted-shot test supersedes it.
- Visual inspection: neutral, -25-degree high aim and 45-degree low aim retained hand-relative gun placement. Screenshots: `Temp/CityShooting/final-pistol-pose.png`, `aim-high.png`, `aim-low.png`.
- Runtime code scan found no new scene searches, framework imports or IK API dependencies. No materials, meshes or shaders changed. Seven new animation YAML assets total approximately 1.78 MB on disk; this is not a compressed playable build measurement.

## Limits and intentional adaptation

This is a target-native adaptation, not the full Opsive controller. Source pistol clips and key firing/reload rules are reused; full CharacterIK is replaced with a bounded upper-body rotation that moves both animated hands together. Source inventory, crouching, unrelated abilities and item-management infrastructure were not imported. Mission exit remains immediate rather than waiting for an unequip animation. Source camera presets were not replaced, and no side-by-side live source Editor comparison was performed; exact visual parity is not claimed.

Luna/browser behavior and final size remain unverified. The previously measured Luna 7.2 compilation blocker still exists in CarController.cs: Rigidbody.maxDepenetrationVelocity. No repeat build was run while that unchanged blocker remains. No vehicle compatibility change was included.
