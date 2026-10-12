# Fire gesture and Toxic visuals correction

Status: APPROVED
Approved scope: user requested "hãy sửa đi cho tôi" after the two diagnosed gaps and correction approach.

Concrete implementation scope presented before edits:
- New PaintballFireButton.cs: explicit camera reference, press/drag/release/cancel ownership; forward normalized pointer displacement, retain held state outside bounds; clear on focus loss/pause/disable. No change to DriveHoldButton.
- PlayerPaintballController.cs: change Fire reference to dedicated component; existing facing/shoot/zoom lifecycle consumes its held state.
- PaintballProjectile.cs: explicit serialized flight/impact ParticleSystem arrays, restart/pause/clear with pool lifecycle, orient impact to collision surface; retain collision/damage logic.
- PaintballProjectile.prefab and Gameplay.unity: Toxic mesh and visuals, dedicated Fire binding and 32 pool instances. The two-second source impact lifetime adds up to ten occupied slots at five shots per second; 32 covers the four-second flight plus impact lifetime. Source visual assets under Prefabs/Paintball/Toxic/: Archanor flight/explosion prefabs, stripped ToxicBulletHit wrapper, liquid mesh and drop texture, two converted Built-in particle Unlit materials and green core Unlit material. No Opsive source runtime scripts.

Materials: source custom/URP particle shaders replaced by Built-in Particles/Standard Unlit, transparency and vertex-color tint retained; core ammo uses Unlit/Color with source green tint. Shared materials, no per-shot clones, no custom shaders. Source drop texture retained with bounded import size. Source visual data retained; no claim of identical lighting/glow after shader conversion.

Verification: compile/Console; press-drag outside-up, foreign-pointer exclusion and focus cancellation; actual held-drag firing/player yaw; particle launch/impact/pause/reset; thin-wall/NPC collision; mission exit/reentry and pool readiness. Inspect visual screenshots and assets. Luna runtime/size remain unverified behind existing vehicle build blocker.
