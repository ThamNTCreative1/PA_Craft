# Source references (relative to D:/Source/party-craft/Assets)
Game/Prefabs/Characters/NPCs/NPC.prefab: AIAction_MoveRandomly, NPCCombat, movement tuning.
Game/Scripts/AI/NPC_AI/Action/AIAction_MoveRandomly.cs: Execute/Cancel.
Game/Scripts/Character/CharacterNPCMovement.cs: MoveToDestination/FixedUpdate/SetFollowTarget.
Game/Scripts/Traffic/TrafficPeopleManager.cs: TrafficPeopleSetup.CreatePeople/UpdatePeoplePosition.
Game/Scripts/Traffic/Traffic_People.cs: alternate roaming implementation, not selected reuse basis.
Game/Scripts/Character/Combat/NPCCombat.cs: OnGetDamaged/EnemyCharacter_OnDealthEvent.
Game/Scripts/AI/AIManager.cs: ActiveAISystem.
Game/Scripts/AI/NPC_AI/Action/AIAction_BodyAttack.cs and AIAction_ProjectileAttack.cs: HandleAttack/Cancel.
Game/Scripts/AI/NPC_AI/Conditions/AICondition_ProjectileAttack.cs: weapon and enemy eligibility.
Game/Scripts/Weapon/NPCWeaponShootable.cs: Use.
Game/Scripts/Weapon/Projectile.cs: MoveDirection/OnTriggerEnter; RecieveDamageObjector.cs: OnDamage.
Game/Scripts/Character/Inventory/PlayerInventoryHandler.cs: EquipWeapon/ActiveInventoryItem.
Game/Prefabs/Characters/Player/Player2.prefab; Game/Prefabs/Weapon/PlayerWeapon/Gun002.prefab, Gun004.prefab, ToxicGun.prefab.
Opsive/UltimateCharacterController/Scripts/Items/Actions/ShootableWeapon.cs: UseItem/Fire/ProjectileFire/HitscanFire.
Game/Scripts/Weapon/PaintBallMissionTracker.cs: OnEnable.
Target: Assets/_Playable_/Scripts/Controller/PlayerController.cs, PlayerAction.cs; Missions/PaintballMissionController.cs; Packages/manifest.json.
