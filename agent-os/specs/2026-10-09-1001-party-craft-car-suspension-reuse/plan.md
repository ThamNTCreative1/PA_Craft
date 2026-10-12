# Apply source wheel suspension
Status: APPROVED
Approved by: user
Approved scope: source wheel/suspension slice presented in preceding turn; user said to fix it directly. Earlier Claude waiver remains in force.

Existing CarController only: serialize four WheelColliders and four rounded wheel contact colliders; own physics configuration, force-based throttle, braking, steer yaw while retaining pitch/roll, ground sensing from wheels, graphic wheel poses. Preserve public vehicle/mount/input/UI API. Remove whole-body TryStep/ApplyStep; suspension/contact takes over.
Gameplay scene: existing Playable Car 8 gains four wheel support child objects with WheelCollider + SphereCollider; existing body BoxCollider shortened vertically for ground clearance. No new prefab/assets/packages or class/interface.
DrivingPlayModeChecks: adapt car fixtures to suspension settling, spring travel and pitch/roll; forward/reverse, small/high curbs, diagonal, one-wheel curb, high speed, tall wall, ceiling, braking/release and landing. Record physical limits rather than claim arbitrary step height. Validate compile/Console, scene references and temporary test cleanup.
Luna local runtime 7.2.0 has WheelCollider component loader/physics adapter and wheel spring/force integration/GetWorldPose, found in physics3d-1.js, script1.js and LunaCompiler/bin/UnityEngine.js. This is API implementation evidence only; final Luna runtime parity requires build verification.

## Approved continuation
User explicitly authorized continuing with bounded per-wheel ledge assistance after the failed 0.54 curb tests. Keep source suspension, apply damped vertical support forces at affected wheel positions, validate ledge top/height and body overhead clearance, cancel on brake/release/reverse/dismount. CarController and existing car check file only; no new classes/dependencies. Verify previously failing cases plus single-wheel/landing and state cleanup.
