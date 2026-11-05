# Selection roar and equip movement lock v1
Status: APPROVED by user (oke), 2026-11-05
Planner: Claude CLI (four-file design and Option B tutorial amendment), consolidated by Codex.

## Exact scope
1. Assets/_Playable_/Scripts/Monster/MonsterController.cs: remove Start audio; private once flag, public PlayStartRoar calls existing audio once.
2. Assets/_Playable_/Scripts/Flow/MonsterHeroFlowController.cs: after successful selection guard/skin apply and phase Tutorial, call PlayStartRoar. No roar before select or rejected selection.
3. Assets/_Playable_/Scripts/Controller/PlayerController.cs: private movement lock, public IsMovementLocked getter and SetMovementLocked(bool). Compose with IsWorking, never override tutorial permission. Lock immediately zeros planar velocity preserving vertical and clears queued jump. FixedUpdate blocks planar movement, stepping and jumping while locked; keep gravity, ground probe, camera/aim rotation. Jump handler ignores locked input without buffering. Null/kinematic guards for velocity setter.
4. Assets/_Playable_/Scripts/Paintball/PlayerPaintballController.cs: Equip locks once it begins successfully; authoritative equip-complete event clears lock guarded by _equipping. Existing animation-speed-aware watchdog uses same event path; paused events ignored. Unequip/OnDisable cleanup unlocks. No lock writes from pause/flow/tutorial.
5. Assets/_Playable_/Scripts/Tutorial/CombatTutorialController.cs: Move-step time counts only when !IsMovementLocked and existing joystick-input condition; otherwise resets0. Preserve .25s threshold and cue sequence.

No new classes/interfaces/patterns, serialized fields, scenes, prefabs, assets or packages. HeroSelectionPanel unchanged. Existing references/dependency flow retained. Weapon owns equip lifecycle, player owns locomotion gate, tutorial reads gate and owns tutorial permissions, flow controls roar timing and monster owns audio.

## Verification
Compile/domain reload and Console. Selection idle silent; successful selection roar once, rejected/repeated callbacks no replay. Hold joystick/WASD/jump while draw: XZ stationary, no jump buffer, gravity/look/UI retained. Equip animation completion and watchdog unlock only movement lock, respecting Look permission. Move tutorial cannot progress during equip; after unlock valid .25s input progresses. Pause retains lock; resume continues; Unequip/disable cleanup. End remains disabled. Check prohibited API additions. No asset/tris changes; browser/Luna/build size unverified unless actually measured.

