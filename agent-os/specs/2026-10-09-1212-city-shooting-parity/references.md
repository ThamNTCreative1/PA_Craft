# Source references

Source root: D:/Source/party-craft/Assets

- Game/Scenes/City.unity — Main instance.
- Game/Prefabs/Main.prefab:637 — Combat camera view; nested Player2 prefab.
- Game/Prefabs/Characters/Player/Player2.prefab:4429 — PlayerAnimator override; :6262 Adventure movement; :7472 look/hand IK configuration.
- Game/Animation/PlayerAnimator.controller — Pistol states and blend-tree clip references.
- Game/Prefabs/Weapon/PlayerWeapon/Gun002.prefab:403 — AnimatorItemID 2; :682 use rate and animation event settings; subsequent projectile, recoil and reload configuration.
- Opsive/UltimateCharacterController/Scripts/Character/Abilities/Items/Use.cs:112 — animation-use event binding.
- Opsive/UltimateCharacterController/Scripts/Items/Actions/ShootableWeapon.cs:669 — UseItem; :735 Fire; :795 ProjectileFire; :1064 look direction; :1096 recoil.
- Opsive/UltimateCharacterController/Scripts/ThirdPersonController/Character/MovementTypes/Adventure.cs — OnAimStart, OnUseStart, GetDeltaYawRotation, GetInputVector.
- Opsive/UltimateCharacterController/Scripts/Character/CharacterIK.cs — source head, upper-arm and hand aiming.
- Opsive/UltimateCharacterController/Demo/Animations/Items/Shooter/Pistol/ — actual idle/aim/fire/reload clips referenced by PlayerAnimator.

Target: Assets/_Playable_/Scripts/Paintball/PlayerPaintballController.cs and Assets/_Playable_/Animations/Paintball/PlayerPaintball.controller.
