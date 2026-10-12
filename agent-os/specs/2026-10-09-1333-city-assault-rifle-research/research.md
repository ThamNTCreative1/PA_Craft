# City ThirdPersonAssaultRifle research

Status: RESEARCH ONLY — no gameplay changes authorized or made.

## Identification

The screenshot's ThirdPersonAssaultRifle transform matches Game/Prefabs/Weapon/PlayerWeapon/ToxicGun.prefab: local position (-0.054008223, 0.27900103, 0.022002878), Euler rotation (273.66986, 220.50085, 229.45493), unit spawn scale. The screenshot's negative Euler display is equivalent. City -> Main -> Player2 includes this prefab in its inventory (GUID 7e96464cd82115145ab186d3ff65f220, Player2 line 6976).

This is distinct from the Gun002/Pistol reference used by the currently implemented Paintball controller.

## Model feasibility

ThirdPersonAssaultRifle's visible child is Guns_001 (1), mesh Guns_001 from GameAsset/Model/Weapons/Pack/Gun.fbx (GUID 23729cbcb13bcad43b5aa8aae4e0d37b). Visible model rotation is yaw -90 degrees, position (0,-0.023,-0.287), scale 1.

The target already contains byte-identical Gun.fbx (SHA-256 compared). Read-only mesh inspection in target Unity reports Guns_001 local bounds (0.92,0.73,0.27) and 2,072 triangles; Guns_002 is (0.49,0.33,0.10), 1,738 triangles. Reuse the correct mesh at its authored scale instead of enlarging the pistol. Bounds are mesh-local dimensions, not a measurement of final screen coverage.

Source material is Full_Color_Roun.mat, texture GameAsset/Model/Cars/Materials/Full_Color.png. Source material includes URP metadata; target needs an appropriate Built-in Unlit material with the original palette, not a blind material copy. Weapon hand/socket alignment needs retargeting to the current player's rig.

## Animation and firing

The Animator visible in the screenshot uses Demo/Animator/Items/AssaultRifle.controller; this animates the weapon, not the player's whole body. Player2's PlayerAnimator.controller separately contains Assault Rifle states, selected by ToxicGun AnimatorItemID=1 (Pistol was 2).

Resolved source player clips include AssaultRifleIdle, Aim, Fire, EquipFromIdle/Aim, UnequipFromIdle/Aim, ReloadHigh/Mid/Low, plus crouching and other ability variants. Source CharacterIK and hand attachment coordinate player pose and weapon position. Merely assigning the weapon animator would not reproduce the player pose.

ToxicGun default ShootableWeapon settings: automatic fire, use rate 0.2 seconds (nominal five shots/second), one projectile, no spread, look-source direction, projectile speed 30, damage 10, clip size 48 and automatic reload. Third-person look sensitivity is 0.98. Aim/ThirdPerson state presets may override individual settings; these must be resolved for exact implementation timing. Preserve the user's requested infinite reserve in the target adaptation.

## Zoom — confirmed tied to firing input

Main.prefab camera selects ThirdPerson Combat. Its CameraControllerHandler explicitly sets ZoomInputName=Fire1 and ContinuousZoom=1. Handler.Update reads GetButton(Fire1), calling CameraController.TryZoom when held state changes. TryZoom applies availability/ability checks, then SetZoom toggles the Zoom state on camera and character. Thus camera zoom is tied to holding the firing input, not a separate required Fire2 press. No City scene override for these properties was found.

Combat's serialized state data references ZoomThirdPersonCombatPreset.asset. ThirdPerson view uses SmoothDamp for LookOffset and supports FieldOfView/FieldOfViewDamping. The preset contains binary-serialized values, so exact named FOV/offset values have not been independently decoded and are intentionally not asserted. The implementation should extract/verify them before claiming numerical camera parity.

## Feasibility and boundaries

All three requested parts are feasible: correctly sized Guns_001, Assault Rifle player animation, and hold-Fire zoom/release restore. Adapt the minimal source behavior into existing PlayerPaintballController, its animator/weapon assets and CameraController; retain infinite reserve and five-NPC mission. Do not import the entire Opsive inventory, ability framework, source scene or unrelated systems.

Before implementing, confirm this identified ToxicGun/ThirdPersonAssaultRifle source slice and define exact target files/assets plus tests. Verify hand grip, idle-to-fire/equip/reload transitions, zoom interpolation and restoration on release/pause/mission exit, projectile alignment and auto reload. No exact runtime visual parity or Luna build size claim is made by this static research. The existing Luna vehicle API blocker remains outside this research.
