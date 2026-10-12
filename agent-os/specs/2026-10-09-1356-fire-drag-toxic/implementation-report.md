# Fire drag and Toxic projectile correction

Implemented the user-requested correction after the diagnosed Fire gesture and projectile visual gaps.

## Changes

- Added `Assets/_Playable_/Scripts/Paintball/PaintballFireButton.cs`: one pointer owns the gesture from press to up/cancel. Drag uses displacement and the same screen normalization as TouchController, forwarding to the explicit camera reference. Leaving the button does not release it; foreign-pointer up cannot release it. Focus loss, application pause and disabling clear the gesture. Driving controls remain unchanged.
- `PlayerPaintballController.cs`: dedicated Fire reference replaces DriveHoldButton. Existing weapon/zoom/facing state consumes it.
- `PaintballProjectile.cs`: explicit particle references, flight restart, impact orientation, pause/resume and clear-on-pool-reset. Impact lasts two seconds. Swept collision and NPC hit logic retained.
- `PaintballProjectile.prefab`: original ammo.fbx mesh (100 triangles) with green core material, adapted source Archanor flight and ToxicBulletHit/Explosion visuals. Applied 48 source Toxic prefab overrides to the copied flight visual. No source runtime framework or lifecycle/audio scripts imported.
- `Prefabs/Paintball/Toxic/`: only selected visual prefabs, liquid mesh, drop texture and material adaptations. Two particle materials converted to Built-in Particles/Standard Unlit, core uses Unlit/Color. Transparent particle colors retained; custom/URP shaders not imported. Texture max size 256, mipmaps disabled. Particle caps bounded at 128 per system. The FBX importer also generated a small default material under Materials.
- `Gameplay.unity`: new Fire component/camera reference and 32 pooled Toxic projectiles. This covers up to four seconds of flight plus two seconds of impact at five shots/second. Existing player position and other missions retained.

## Verification

- Actual held-drag Editor test used one pointer through 49 shots and one reload: pointer exit retained Fire, foreign up was ignored, camera yaw changed 153.34 degrees and player yaw changed 152.19 degrees. Release stopped holding. Peak occupied pool slots were 12 in this test. `Temp/FireToxic/drag-fire.txt`.
- Visual screenshot `Temp/FireToxic/drag-fire.png`: moving player/camera aiming view, green Toxic projectile/trail and source-colored impact particles. This is source-derived VFX with converted shading, not a claim of identical source glow.
- Focus loss releases Fire; mission pause releases Fire and pauses flight particles. Thin 0.05-unit test wall triggered impact before crossing. Pool reset cleared all flight/impact particles and deactivated projectile. Car exit unequipped; Paintball re-entry was ready with 48 rounds. A Toxic projectile hit an NPC and produced Chase. `Temp/FireToxic/lifecycle.txt`.
- Final prefab renderer audit: all materials resolved to Unlit/Color or Particles/Standard Unlit; zero missing scripts. Unity Console error query returned zero.
- New selected visual folder was approximately 437 KB on disk before the small auto-generated FBX material; this is source asset size, not compressed output size. Core mesh 100 triangles. No GPU/frame-rate benchmark or physical two-finger device test was performed; pointer ownership was tested through Editor EventSystem data.
- Unity scene was stopped without saving runtime test changes, clean and ready; player position (-10.94,13.58,-93.34), pool 32.

## Luna build

Ran the real local Luna 7.2 project:build. It exported assets and reached C# compilation, then failed with one error: existing CarController.cs:103 Rigidbody.maxDepenetrationVelocity is unavailable. There were 118 warnings. No additional C# error was reported for the new input/particle code. Log: `Temp/FireToxic/luna-build.log`.

Full Luna runtime, particle rendering on web and the final 4.5 MB budget remain unverified. No vehicle API change was made. Unity-generated YAML trailing spaces were reported by the broad scene diff whitespace check; scene YAML was not reformatted manually.
