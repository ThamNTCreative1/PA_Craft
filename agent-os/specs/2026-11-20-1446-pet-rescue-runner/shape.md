# Pet Rescue Runner - Shape v1
Status: APPROVED
Planner: Codex, as requested by the user in the latest message.

## Confirmed behavior
First gameplay tap starts automatic forward running and a 15-second timer. User controls horizontal steering only. Pets follow. TNT removes pets inside the blast area; hero falls into the resulting pit, automatically jumps out, and continues. Rescue at least three pets through the gate before the deadline: Win -> endcard -> CTA. Timeout without a prior win: Lose -> endcard -> CTA.

## Proposed defaults included in v1 approval
- Six pets already following at start: two dogs, two ducks, two rabbits. No pickup subsystem.
- Continuous relative horizontal drag, not discrete lanes. Release stops steering, not forward running.
- Initial road: X [-3,3], hero center clamp [-2.5,2.5], Z from -8 to 82; gate Z=65, hero speed=7 units/s. Pet rows trail by 1.4/2.8/4.2 units, two pets per row. Values serialized for tuning.
- Nine TNT: positions (-1.8,12), (1.8,19), (0,26), (-1.8,33), (1.8,40), (0,47), (-1.8,54), (1.8,59), (0,62), in X/Z. Hero hit radius 0.65, blast radius 1.6; boundary inclusive. Explosion uses the current ground-plane positions of pets at that instant.
- Ground is authored from small tiles. Explosion disables tiles within its footprint; there is an actual visible cavity with dark floor/walls. Hero recovery is scripted: 0.35s fall to depth 3, 0.25s bottom pause, 0.65s automatic jump back onto the forward lip. Steering/forward movement pause during recovery; timer continues. Further blasts cannot retrigger during recovery.
- Surviving pets wait safely above the pit, then resume following; only pets inside the initial blast area are lost. Avoid adding continuous pit-fall mortality beyond the approved blast rule.
- Hero stops at Z=73 so trailing pets can cross the gate. If fewer than three survive, show failure only when timer reaches 15s; no new instant-loss rule.
- At exactly elapsed >=15, timeout takes priority over gate crossing in that update; rescuing three strictly before the deadline wins. Terminal outcome is immutable.
- Endcard displays rescued count, HERO SAVED! or HERO LOST!, and INSTALL NOW. Store opens only on a fresh explicit CTA click. No automatic store opening, full-screen click blocker, restart or replay.
- Tutorial: TAP TO RUN + horizontal hand/arrow cue. Tap starts immediately, cue switches to DRAG TO DODGE; a real horizontal movement dismisses it. Stop tutorial on either outcome. No input lock or auto start.
- New isolated scene becomes the enabled build entry; previous mission scene remains intact and disabled in build settings.

## Asset approach
Use only the visual FBX/texture dependencies of the specified animal prefabs. Do not copy source gameplay scripts, full prefabs, controllers, UI, audio, SDKs or VoxelPlay code. New target-native components implement the concept.
Hero uses existing Character.fbx and Base_Character.png with a new built-in Unlit material. TNT is a target-owned cube with red/white faces and readable TNT labels, based on the provided reference, without importing the source TNT shader or explosion subsystem. Road, pit and gate use primitive voxel shapes and shared built-in Unlit materials. No Blender, new shader or new package.

## Architecture choice
Prefer serialized scene wiring and small components over modifying mission PlayerController/GameManager. This avoids double timers, joystick/look input and automatic installs. Cost: a separate scene and scene builder. Alternative: retrofit old mission scene; rejected for v1 because it broadens migration and risks existing flows.
Pure C# rules own timer, pet status and terminal guards. Unity adapters own pointer input, transforms, camera, views and effects. No speculative interfaces, generic event bus, pooling or inheritance framework.
