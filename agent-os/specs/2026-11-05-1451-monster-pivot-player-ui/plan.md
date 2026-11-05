# Implementation plan
Status: APPROVED
Approved by: user
Approved scope: exact two-file monster alignment and tutorial control-visibility/input-gating plan; confirmation oke
Planner: Claude CLI, reviewed/refined by Codex.

## Exact files and objects
1. Assets/_Playable_/Scenes/Gameplay.unity: existing Monster Rigidbody/motor root world position ->(18,14,18); child huggy_wuggy local position ->zero. Preserve all rotations/scales/component references,750HP, health UI and other scene objects. Model current world position remains18,14,18. Ground at this position is y14. Prefab itself unchanged.
2. Assets/_Playable_/Scripts/Tutorial/CombatTutorialController.cs (Playable.CombatTutorialController, existing MonoBehaviour): show existing _joystick and _fireButton GameObjects in Begin. Cache existing PaintballFireButton from explicitly serialized _fireButton GameObject in new private nonserialized _fireInput field once. Disable pointer component before showing fire graphic, enable component at existing Move->Fire transition. Missing component: contextual error then Cancel and return (do not silently allow ungated fire). Cancel retains hiding cues/controls, then restores cached pointer component.enabled=true while GameObject inactive for consistent reuse. Existing OnDisable releases pointer. No PaintballFireButton code change or new serialized dependency.

## Responsibilities / event flow
Tutorial retains step ownership; pointer adapter retains pointer lifetime; MonsterController/ motor remain unchanged. No new abstraction/pattern. Public API Begin/Cancel and Completed event unchanged; OnEnable/OnDisable subscriptions unchanged. Begin remains called after hero choice, not during hero select.
Look shows only look cue; joystick and fire graphics are visible. Player.IsWorking remainsfalse until45deg look completed. Look->Move enables movement; .25s joystick hold ->Fire enables fire component and fire cue; first valid ShotFired completes tutorial once and existing Flow activates monster. Early shots blocked; cue sequence/thresholds and outcome transitions unchanged. Cancel hides and restores input component for subsequent use.

## Verification
Preserve current dirty Editor changes; backup before approved mutation, never save PlayMode state. Verify root/model alignment,groundhit,750HP,all references,projectile resolution. Compile/domain reload complete then Console before scene changes. In PlayMode verify visible controls after hero choice, pointer events ignored beforeFire,move/look early inputs do notskipcues,ordered Look->Move->Fire,completion exactlyonce,monsterRunapproach->Attack,nonlethal hits leave actor visible,playerdamage/death and existing Win/Lose/Ended cleanup. Hold/release/cancel fire no stuck input. Preserve recoveredHUD/joystick/camera. No unrelated changes. No claim disappearance was reproduced before fix: large pivot offset is confirmed structurally. Luna build/runtime/4.5MB measurement unverified unless run.

