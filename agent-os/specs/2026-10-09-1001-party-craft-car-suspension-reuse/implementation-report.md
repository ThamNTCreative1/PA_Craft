# Wheel suspension and curb assistance
Status: Implemented; all Editor regression checks passed. Luna runtime/build verification pending.
Approval: user confirmed source suspension slice, then explicitly approved adding per-wheel ledge assistance after pure suspension failed the high curb. Direct Codex implementation authorized; Claude step waived by user.

## Final changes
- CarController: source-style four-wheel suspension/contact, forces and torque for propulsion, physical pitch/roll, yaw steering, wheel graphics from GetWorldPose. Private per-wheel ledge support detects a valid top <=0.6 above supporting ground, checks whole-chassis upward clearance, and applies a bounded spring/damper support force at the affected wheel. Front/rear and left/right respond independently. No whole-body position teleport, no new class/interface, no new package.
- Assistance is target-native added logic, not claimed to exist in party-craft. Source wheel suspension/pose/force concepts are the confirmed reuse. Excludes source UI, traffic, fuel, analytics, Opsive, InputSystem, effects, audio and jumping.
- Gameplay: four wheel support children with WheelCollider and rounded SphereCollider contacts on Playable Car 8; adjusted chassis clearance. Source project unchanged. No mesh, texture, material asset or prefab imported.
- DrivingPlayModeChecks: opt-in Playable/Checks/Car Curbs, temporary fixtures, suspension settling, per-tick displacement/speed/uprightness, wheel pose and dismount checks. Manually steps real Rigidbody physics and CarController.FixedUpdate in Play Mode. Input is injected; this is not a pointer UI test.

## Verification
Unity 6000.0.60f1: compilation complete, zero Console errors. 16 PASS entries: mount; 13 physics scenarios; wheel visual positions; dismount cleanup. See verification.txt.
- 0.04, 0.2 and 0.54 curbs pass.
- 0.54 forward/reverse/diagonal pass. Slow target 2 retains minimum speeds 1.755/1.765/1.814 respectively.
- Starting at 13 retains minimum crossing speed 12.810, max upward movement per 0.02 tick 0.0442, max chassis origin elevation 0.614 above road.
- One-side 0.54 curb passes; min up.y=0.921, no rollover.
- 0.8 obstacle and low overhead clearance correctly block.
- Brake/release cancel the approach. A 2-unit drop lands grounded and settles below 0.2 speed with origin within 0.1 of road.
- Wheel graphic positions match GetWorldPose within 0.001; dismount clears assist state and restores player.
Editor returned to Edit Mode, clean scene, no compile in progress. Existing missing-script warnings for btnBackToHome remain outside scope.

## Compatibility and remaining limits
Local installed Luna 7.2.0 engine includes WheelCollider loader/adapter and spring/force integration/GetWorldPose implementation. Changed runtime code uses legacy input, explicit serialized references, NonAlloc queries and reusable buffers; no runtime scene search or package dependency introduced. This is not proof of Editor/Luna numerical parity. Luna build/device, touch-input regression, visual camera ride-through and final playable size were not run/measured. Original exact reported curb has not been identified, tests use controlled fixtures. Physics assistance intentionally anticipates a ledge according to speed and permits mild body pitch/roll.

## Scope evidence
Task-only implementation.diff compares with pre-source-suspension snapshots in Temp/DrivingSetup/BeforeSourceSuspension. Prior failed draft evidence is retained separately. Unrelated working-tree edits preserved, no commit made. No triangles/mesh changes; physics components and script bytes change build contribution, which remains unmeasured.

## Source byte sizes
- CarController.cs: 21351 -> 19943 source bytes; not build/download size.
- Gameplay.unity: 569454 -> 598371 source bytes; not build/download size.
- DrivingPlayModeChecks.cs: 28217 -> 30285 source bytes; not build/download size.
