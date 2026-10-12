# Luna Generic animation implementation

Status: IMPLEMENTED; Editor and export verified; browser playback awaiting verification.
Authorization: user requested implementing the alternative to runtime rig IK after reviewing the Generic bake proposal.

## Change
- Added Assets/_Playable_/Scripts/Editor/PaintballAnimationBaker.cs. Editor-only retargeting through a manual PlayableGraph, foot/playable IK disabled. Samples at 30 Hz into local position/quaternion Transform curves, reduces per-channel error to 0.0003, retains clip durations, looping and events. Generated controllers retain transitions and use Generic blend trees. Upper-body mask uses bone paths. Orphan copied blend trees are removed only from generated controllers. Re-running updates generated clip assets without replacing their GUIDs.
- Assets/_Playable_/Animations/Luna/: 14 clips, 4 controllers, one transform mask and Unity metadata.
- Gameplay.unity: player and five NPC Animator avatars cleared and references assigned to baked controllers; motorbike rider controller reference replaced too. Original rig, mesh, clips and controllers retained.
- PlayerPaintballController.cs: restore a positive playback speed on equip; event watchdogs use source clip event times and a 0.06 s grace period, pause with animation speed and reset for each action. Existing guards prevent duplicate shot/refill after fallback. Unlimited reserve and 48-round magazine retained.
- DrivingPlayModeChecks.cs: update old Humanoid-only assertion and hips lookup for the Generic rig. Full legacy driving suite not rerun.
- No runtime GetBoneTransform/OnAnimatorIK/SetIK dependency remains in playable scripts. No new runtime class, package or interface. PlayerController and MissionsJournalController did not require changes.

## Verification
- Unity compilation and final Console: zero errors; final Editor stopped and scene clean.
- bake.txt: each moving clip has varying curves; short idle/aim/rider clips intentionally hold a pose.
- bone-motion.txt: manual Animator advancement changes leg rotation by 46.91969 degrees for player and all five NPCs; none use a Humanoid avatar.
- npc-movement.txt: all five NPCs changed position during PlayMode (0.038 to 1.835 units over the sampled interval).
- magazine-check.txt: controlled Animator stepping, pool reset between shots: 48 accepted shots consume magazine, reload events refill to 48, shot 49 succeeds. This is a deterministic component-level check, not a real-time browser input test.
- weapon-check.txt: initial rapid stepping hit pool/event timing limits (24 shots), superseded by controlled magazine test; also verified pause speed 0/resume 1 and missing-event watchdog followed by a late event yields one shot.
- lifecycle.txt: Generic seated motorbike controller works, returning to Paintball equips successfully; journal pause/resume restores speed.
- paintball.png: rendered Generic player/NPC appearance inspected in Editor.
- Luna local project:build completed Stage1 export, Stage2 asset processing, Stage3 compilation, Stage4 develop packaging. PowerShell process reported exit 1 despite successful stage messages; newest diagnostics EarliestFatalError=0. See luna-build.log.
- export-audit.json: 14 character clips contain 210/252 Transform curves, no Humanoid data blob; exported avatar directory empty. Equip/fire each retain 2 events, reload clips each retain 4.
- Stage2 animation directory (including UI clip and metadata): 904,973 bytes. This is uncompressed intermediate data, not final ad size. Release under-4.5-MB budget not certified.

## Limits
Browser control was unavailable in this session, so actual Luna rendered playback and touch behavior are not claimed verified. Existing audio decode/font warnings from user screenshot are separate and were not modified. Remaining build diagnostics concern custom events, component counts, shader variants, Facebook file count and Timeline package.

Evidence: Temp/LunaGenericAnimation/.
