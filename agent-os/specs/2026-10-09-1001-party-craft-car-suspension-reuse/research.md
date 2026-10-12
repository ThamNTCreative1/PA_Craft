# Party Craft car curb behavior ? source research
Status: RESEARCH READY ? awaiting source-logic confirmation
User asks to inspect D:/Source/party-craft/Assets and apply the relevant driving-over-curbs logic to PA_Craft CarController. Earlier user instruction waiving Claude remains respected; this source logic has not yet been explicitly confirmed.

## Observed source structure
Car_9 Variant.prefab inherits ArcadeCarBase.prefab (GUID 5e82ced41c6700f479bc651871cc1859). ArcadeCarBase contains carController (49ae9e23cc874b54e931069ed663a295), four WheelController references, and nested WheelBase prefabs (d27f84cd36018f4439e20c409e594532). Several other Car_N variants also reference this base.
WheelBase has enabled WheelCollider: radius 0.42, spring 35000, damper 4500, targetPosition 0.5, suspensionDistance 0.22, wheel mass 20. Individual car variants override radii (Car_9 includes roughly 0.30 WheelCollider and 0.27 sphere values). Values are reference configuration, not target-ready tuning.
WheelBase has an active SphereCollider object; its convex CylinderCollider object is inactive. Do not describe the cylinder as actively supporting these cars merely because the component is enabled.
ArcadeCarBase Rigidbody: mass serialized 1500, gravity enabled, interpolation enabled, constraints=0. carController.Awake sets mass=carWeight and maxDepenetrationVelocity=1; FixedUpdate does not freeze rotation or overwrite vertical velocity each frame as the target does.
carAcceleration uses AddForceAtPosition plus motorTorque on all wheel sets. WheelCheck uses WheelController.IsGrounded (WheelCollider.isGrounded). WheelController.FixedUpdate updates wheel graphics from GetWorldPose.
Other source routes exist: Opsive car implementation also uses WheelColliders/motorTorque/GetWorldPose. Scripts/wheels.cs contains SphereCast/Raycast spring/damping AddForceAtPosition, but its GUID occurs in reference car prefabs/demo, not the inspected ArcadeCarBase chain. Do not claim this custom SphereCast solver is the deployed arcade variant implementation.

## Smallest source slice to confirm
Per-wheel suspension/contact behavior from WheelBase, grounded gating and force-based propulsion from carController.FixedUpdate/carAcceleration/WheelCheck, wheel graphics synchronization from WheelController.FixedUpdate. Rounded wheel contacts and body clearance/configuration are essential dependencies, not a standalone TryStep method. Physical suspension permits front/rear/side response separately, whereas target currently raises the complete upright body.
Exclude Opsive character integration, traffic, fuel, mission tracking/analytics, input system, DOTween, sounds, skid/smoke, jumps, tuning UI and runtime object creation/search. No source files or assets copied.

## Target implications and uncertainty
PA_Craft presently has one low body BoxCollider, frozen body rotation, direct linearVelocity control and a synthetic whole-body TryStep/ApplyStep. Reusing the identified behavior requires more than substituting one method: wheel support/contact configuration, collider clearance, body pitch/roll policy and movement-force integration need a target-native plan after source confirmation. No implementation design or permission inferred yet.
WheelCollider support/performance on the installed Luna runtime is not verified. If unavailable, a per-wheel probe spring/damper implementation would be an adaptation rather than an exact copy and must be identified as such before implementation. Source spring/mass/radius settings cannot simply be transplanted to the smaller target vehicle.
Evidence is static source/prefab inspection, not a reproduction of the user's smooth-driving observation. No source project Editor was opened or mutated and no dynamic source ride-through was run. Scene/spawn binding for the exact car observed by the user remains unconfirmed.

## Follow-up acceptance scenarios
After logic confirmation and target plan: forward/reverse, low/full speed, straight/diagonal, one-wheel curb, small curbs and 0.54 ledge, tall wall, overhead obstruction, braking/releasing, fall/landing, mount/dismount. Measure vertical/angular jitter and speed retention; validate visual wheel contact and camera response. Verify Unity compile/Console and Luna runtime/build size separately.
