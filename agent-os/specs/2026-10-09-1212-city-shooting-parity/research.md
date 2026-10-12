# City shooting and animation parity

Status: RESEARCHED — SOURCE SLICE PENDING CONFIRMATION

User requests shooting behavior and animations from party-craft City, matching the supplied screenshot. Infinite reserve remains required. This work item changes the behavioral reference from the previous simplified adaptation to the actual City player chain.

## Verified source chain

City.unity instantiates Main.prefab (GUID 222e4681bd5c9a041badb412cd95208a). Main contains Player2.prefab and configures the camera view type as ThirdPersonController.Camera.ViewTypes.Combat. Player2 overrides its character animator to Game/Animation/PlayerAnimator.controller (GUID a08e9b9aec5b6c24c8f3a670c964280e).

Player2's default movement type is Adventure, not Combat. Adventure follows movement direction normally; while Aim or a FaceTarget Use is active, its input allows strafing/backward movement. Gun002 sets FaceTarget=1. Therefore always forcing character yaw to camera yaw while equipped is not equivalent to this source behavior.

Gun002's AnimatorItemID is 2, its use substate is 2, and it waits for an animation use event. Use.cs registers OnAnimatorItemUse and invokes item use through that lifecycle. ShootableWeapon.UseItem/Fire/ProjectileFire handle firing and recoil. Gun settings: automatic, 0.6-second use rate, one projectile, no spread, look-source direction, projectile speed 40, damage 10.

PlayerAnimator's Pistol states resolve through blend trees to PistolIdle, PistolAim, PistolFire and PistolReloadLow/Mid/High, with crouched counterparts. CharacterIK supplies look/head/upper-arm/hand adjustment; Player2 configures upper-arm and hand weights to 1. These are material parts of the source pose, not merely camera placement.

## Target differences

PlayerPaintballController currently fires immediately in TryFire, plays simplified upper-body states, then forcibly aligns weapon world rotation with camera forward in LateUpdate. Existing Hold/Fire use rifle clips from the earlier adaptation. This misses the source's pistol animation selection, animation-triggered fire lifecycle and coordinated hand/upper-body aiming.

## Proposed source slice for confirmation

Use the City Player2 + PlayerAnimator Pistol/ItemID2 + Gun002 behavior: idle/equip/aim/fire/reload transitions, aim-height blends, coordinated weapon/hand pose, movement versus firing facing rules, source shot timing and recoil. Keep infinite reserve and the five-NPC mission. Adapt only those rules into target-native code; exclude Opsive inventory/framework, unrelated abilities, economy, ads and NPC systems.

Screenshot alone does not prove the selected runtime item. Gun002 is the established weapon reference in this conversation; final pose equivalence needs side-by-side runtime verification. Exact camera presets/serialized view data, item socket offsets, layer masks and all reachable animator transitions need extraction during the detailed design before changes.

No gameplay scripts, scene or prefab were changed during this research. Next: confirm this precise source slice, then prepare target file/asset and verification scope under the project approval workflow. User previously waived Claude; that preference remains respected.
