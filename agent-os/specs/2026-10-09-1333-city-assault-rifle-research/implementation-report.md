# Assault Rifle implementation

Implemented the approved plan: Guns_001, Assault Rifle player clips, held-Fire zoom and infinite reserve.

## Changes

- PlayerPaintballController: ToxicGun defaults (0.2-second cadence, 48 rounds, 0.98 look threshold), held-input zoom forwarding, 24-projectile readiness requirement and pause reset.
- CameraController: serialized aiming FOV/distance/shoulder/blend rate; zoom intent from Fire, smooth return and immediate FOV restoration on mission/vehicle exit or camera disable. Existing obstruction cast retained.
- PaintballGun.prefab: Guns_001 mesh (2,072 triangles), source model child transform and muzzle position. Existing Unlit palette material retained.
- PlayerPaintball.controller plus seven AssaultRifle*.anim clips: Idle, Aim, Fire, EquipFromIdle, ReloadHigh/Mid/Low. Existing event receiver reused with source event times. All seven source FBXs hash-match party-craft. Old Pistol clips remain disconnected for reversibility.
- PaintballProjectile.prefab: speed 30. Gameplay.unity: calibrated hand socket, 24 pooled projectiles, 48-round magazine, reserve -1, source AssaultRifleSingleShot/AssaultRifleReload audio and initial ammo label.
- GameController, NPC AI, vehicle physics and source project unchanged.

## Evidence

- Unity compilation succeeded; final Console query returned zero errors.
- Actual held Fire: 49 shots, 1 automatic reload. Shot 48 at 9.589 seconds, shot 49 at 14.185 seconds; approximately 0.2-second cadence. Ammo after reload/shot was 47. `Temp/AssaultRifle/held-fire.txt`.
- Held camera FOV 60, normal FOV 80; release returned to 80. Screenshot `Temp/AssaultRifle/firing-zoom.png` shows the larger gun and aiming view.
- Controlled input check: pointer exit restored FOV 80; temporary wall 0.8 units behind aiming origin shortened camera distance to 0.465, before the wall. `Temp/AssaultRifle/camera-controlled.txt`.
- An asynchronous integration attempt lost held input because of Editor focus; its FOV=80 and failed wall assertion were invalid test setup, superseded by the controlled test above. Remaining integration results: pause released input/restored FOV; car mission exit unequipped and restored FOV; Paintball re-entry equipped with 48 rounds; launched projectile hit NPC and triggered Chase. `Temp/AssaultRifle/integration.txt`.
- High/low weapon poses inspected: `high-clean.png`, `low.png`. An earlier high screenshot was obstructed by a retaliating NPC and replaced by a reset-scene capture. Existing chest aiming adapter retained; full source IK framework is not imported.
- Seven new animation YAML assets total 2,152,892 bytes on disk. This is not compressed Luna build size. No new meshes/textures/shaders/packages imported.

## Limits

Camera uses approved target tuning: FOV 60, distance 2, shoulder 1.3 and configurable blend rate. The binary source camera preset's named numeric fields were not independently decoded; exact numerical source parity remains unverified. ThirdPerson weapon preset is empty; Aim preset contains serialized recoil data, while the base ToxicGun cadence is used.

Luna/browser behavior and final 4.5 MB budget remain unverified due to the previously reported unchanged CarController.maxDepenetrationVelocity build blocker. No new build was run while that blocker remains. Source-side live visual comparison and full CharacterIK equivalence are not claimed.
