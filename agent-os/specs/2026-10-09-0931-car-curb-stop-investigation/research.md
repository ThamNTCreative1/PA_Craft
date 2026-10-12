# Car stops at curbs — research
Status: RESEARCH READY
Scope: read-only diagnosis. No implementation approved or performed.

## Findings
- GameController manages ride UI/tutorial/brightness. SetDrivingCar does not implement car movement or terrain collision.
- CarController.FixedUpdate implements movement; TryStep (lines 187–239) is the explicit step-climbing path.
- Gameplay scene: Playable Car 8, stepHeight=0.3, groundMask=all layers, diagnostics disabled. Body BoxCollider size=(1.7,1.18,3.65), center=(0,0.59,0.09), scale=1; bottom at transform Y.
- Awake freezes body rotation; wheel transforms rotate visually only. No wheel suspension/climbing is implemented here. If TryStep rejects an obstacle, the body remains blocked by its vertical face.
- TryStep samples down from feetY+0.36 with length 0.38 and rejects rise >0.3 or <0.005. It also rejects obstructed upward casts and destination overlaps. Thus raising acceleration does not remove the geometric obstruction.
- Live read-only Unity inspection: Ground Flat top Y=13.46; nearby lower surfaces top Y=13.5; several Structure colliders top Y=14.0. The corresponding height differences are 0.04 and 0.5–0.54. Taller structures reach Y=16 and must not be confused with climbable curbs.
- Read-only hypothetical cast at feet=(-17.07,13.47,-88), facing west, using the car dimensions: wall at X=-19, top=13.5, rise=0.03. Upward sweep 0.05 and destination overlap were clear. This is a physics-query check, not a driving reproduction.
- Another query near X=-23 hit a tall wall with top Y=16, demonstrating that adjacent tall geometry can block independently of a nearby low ledge. The exact obstacle reported by the user remains unidentified.

## Conclusion and confidence
Confirmed: current controller only supports steps <=0.3; the scene includes larger height changes which it cannot climb through this path. The stopping behavior is consistent with body collision plus TryStep rejection, not a stop command in GameController.
Unconfirmed: which TryStep branch rejects at the user's exact curb. Do not claim all low curbs fail or that increasing stepHeight alone resolves the reported incident.

## Verification performed and limits
Read source, serialized active build scene and live Editor geometry via in-memory read-only queries. Unity PA_Craft 6000.0.60f1 is in Edit Mode, Gameplay active, car unmounted at (-14,13.5,-88). No Car drive console entries. Did not enter Play Mode, move objects, invoke TryStep, alter diagnostics, change code/assets, run tests or build Luna.
Existing DrivingPlayModeChecks has a 20cm motorcycle curb case, not proof for the car.

## Follow-up for planning
Identify the exact curb/contact location and distinguish allowed low steps from walls. At reproduction, inspect throttle, grounded, step eligibility, wall/top collider and height, and lift/destination rejection. Then choose controller/collider/height policy based on evidence. Verify forward/reverse, slow/fast, diagonal approach, allowed curb, excessive curb, overhead/adjacent obstacles, Editor and Luna. This document is research, not an implementation plan or approval.
