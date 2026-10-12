# Assault Rifle and held-Fire zoom

Status: APPROVED
Approved by: user — "tôi duyệt rồi, bạn hãy thực hiện luo đi".
Source slice confirmed by user: "oke hãy thực hiện cho tôi đi".
The preceding report identified the source; this is the first exact file/asset and verification plan for this work item.

## Target files and responsibilities

1. Assets/_Playable_/Scripts/Paintball/PlayerPaintballController.cs
   Keep ownership of weapon state, animation events, ammunition, Fire input and pooled firing. Adapt defaults to ToxicGun: nominal 0.2-second cadence, 48-round magazine, unlimited reserve and 0.98 alignment threshold. Resolve source Aim/ThirdPerson preset overrides before finalizing timing. Forward held-Fire zoom intent to CameraController; clear it on pause, disable and mission exit. Retain explicit references and event-driven emission/refill. Do not import the Opsive framework.
2. Assets/_Playable_/Scripts/Controller/CameraController.cs
   Add SetPaintballZoom(bool) and serialized zoom FOV/offset/blend settings. Interpolate to an over-shoulder aiming view only while Paintball Fire is held. Respect existing camera collision. Restore pre-mission FOV and normal offset on release/exit; reset immediately when mission changes. Extract named source preset values first. Provisional target tuning if retargeting is necessary: FOV 60 degrees, distance 2 units, shoulder offset 1.3 units; these are proposed target settings, not yet verified source numbers. No changes to vehicle camera behavior.
3. Assets/_Playable_/Prefabs/Paintball/PaintballGun.prefab
   Replace visible Guns_002 with existing Guns_001 mesh at authored unit scale. Match source child transform, muzzle and flash placement; calibrate hand-relative socket for the current rig. Keep the existing Built-in Unlit palette material, checking it against the source texture. Reuse the source shot/reload audio already available locally.
4. Assets/_Playable_/Animations/Paintball/PlayerPaintball.controller
   Retain existing lower-body locomotion. Replace upper-body motions with AssaultRifle Idle, Aim, Fire, EquipFromIdle and ReloadHigh/Mid/Low. Keep source event times and remap only event receiver names to the target component. Keep mission exit immediate. No crouching or unrelated ability features.
5. Assets/_Playable_/Animations/Paintball/AssaultRifle{Idle,Aim,Fire,EquipFromIdle,ReloadHigh,ReloadMid,ReloadLow}.anim and their .meta files
   Create only these seven source-derived clips, using matching existing FBXs. Preserve existing Pistol assets for reversibility; disconnect their runtime references.
6. Assets/_Playable_/Prefabs/Paintball/PaintballProjectile.prefab
   Set projectile speed to 30 as in ToxicGun. Keep existing swept collision and NPC damage behavior.
7. Assets/_Playable_/Scenes/Gameplay.unity
   Wire the weapon, animator, audio and camera settings; recalibrate socket. Expand the serialized projectile pool to 24: at five shots/second and four-second lifetime, the existing 12-item pool can run out in open air. Set magazine to 48, reserve to -1, update initial ammo label. Preserve five NPCs and mission wiring.

No new runtime class/interface/package/shader is planned. Existing composition and projectile pooling remain sufficient. GameController.cs, vehicle physics, NPC AI and source project remain unchanged.

## Sequence and acceptance checks

1. Read and resolve source camera/weapon presets and exact animation events; stop if this requires a different architecture or additional files beyond this scope.
2. Change scripts, wait for compilation, check Console; then edit prefabs/animations/scene through Unity.
3. Inspect equipped idle, aiming high/low, Fire and Reload poses; verify correct model size, hand attachment and muzzle origin.
4. Hold Fire through at least 49 real-time shots and one automatic reload. Confirm unlimited reserve, expected cadence, no missing bullets from pool exhaustion and one projectile per animation event.
5. Check zoom on press, smooth return on release, no stuck zoom after pointer exit/focus loss, journal pause or mission change; test collision near a wall. Re-enter Paintball and verify full magazine and NPC reset.
6. Verify player hit -> NPC retaliation still works; verify vehicle mission camera is restored. Inspect Console and runtime code for prohibited APIs.
7. Record new asset sizes and mesh triangles. Luna/browser and final playable-size verification remain blocked by the existing CarController.maxDepenetrationVelocity incompatibility unless separately authorized for repair. Do not report Editor success as Luna success.

Deliver implementation-report.md with changed files, visual evidence, tests and unresolved limits.
