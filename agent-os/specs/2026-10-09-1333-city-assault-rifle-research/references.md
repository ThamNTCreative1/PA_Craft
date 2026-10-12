# References

Source root: D:/Source/party-craft/Assets

- Game/Scenes/City.unity — Main prefab scene instance; no zoom-input overrides found.
- Game/Prefabs/Main.prefab:637 — selected ThirdPerson Combat camera; :821 Fire1 zoom and continuous mode.
- Game/Prefabs/Characters/Player/Player2.prefab:6976 — ToxicGun inventory reference.
- Game/Prefabs/Weapon/PlayerWeapon/ToxicGun.prefab:134 — AnimatorItemID 1; :360 third-person spawn transform; :396 use rate; :440 automatic fire; :480 magazine; :631 third-person sensitivity; :830 ThirdPersonAssaultRifle; :864 weapon animator; :1289 Guns_001 model.
- GameAsset/Model/Weapons/Pack/Gun.fbx — model asset; target copy SHA-256 matches.
- GameAsset/Model/Weapons/Pack/Full_Color_Roun.mat — source palette material.
- Game/Animation/PlayerAnimator.controller — Assault Rifle player states and blend trees.
- Opsive/UltimateCharacterController/Demo/Animator/Items/AssaultRifle.controller — separate weapon animator.
- Opsive/UltimateCharacterController/Demo/Animations/Items/Shooter/AssaultRifle/ — player animation family.
- Opsive/UltimateCharacterController/Scripts/Camera/CameraControllerHandler.cs:102 — held-input zoom handling.
- Opsive/UltimateCharacterController/Scripts/Camera/CameraController.cs:653 — TryZoom; :713 SetZoom/state switching.
- Opsive/UltimateCharacterController/Scripts/ThirdPersonController/Camera/ViewTypes/ThirdPerson.cs:423 — smooth look-offset movement and FOV handling.
- Opsive/UltimateCharacterController/Demo/Presets/Camera/ThirdPerson/ZoomThirdPersonCombatPreset.asset — Combat Zoom preset.

Read-only target Unity inspection: Guns_001 mesh bounds (0.92,0.73,0.27), 2,072 triangles; Guns_002 bounds (0.49,0.33,0.10), 1,738 triangles.
