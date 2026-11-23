# Implementation report — PetRescue feedback round 2

Approved by user 2026-11-23 with amendments (see plan.md "Approved decisions"). Applied directly to the current `PetRescue.unity` via the narrow patch; no scene rebuild, Canvas layout untouched (RectTransform count unchanged; only `RescueTutorialView._goalHint` reference added).

## Changes
- New runtime: `RescueCourse` (tile heightfield + wall queries), `RescueCrater` (per-TNT stepped crater, lower-only), `RescueWallObstacle` (XZ box footprint).
- `RescueHeroMotor`: gravity/jump, per-axis slide against course, stuck in pit = no move/steer, `TryJump` only in pit, jump air speed computed to land beyond the far rim, fixed 0.02 s sub-steps (fix found in Play Mode: at dt ≈ 0.33 s the arc skipped the rim check and fell back in).
- `RescuePetFollower`: waits while hero stuck, jumps with hero, follows terrain height and hops up terraces, slides on walls with 0.4 s unstick.
- `RescuePointerInput`: one swipe-up per upward stroke (≥ 6 % screen height, more vertical than horizontal; re-arms on down/sideways).
- `RescueGameFlow`: jump wiring (hero + all following pets), SWIPE UP hint while in pit, landing sound, course reference. Rules/timers/outcomes unchanged.
- `RescueTutorialView`: `ShowJump/HideJump` (vertical hand flick, "SWIPE UP!", arrows + goal hint hidden); steering no longer hides the jump hint.
- `RescueHudView`: 110-unit compensation applied in landscape too (root cause of the overlap) + 2 % landscape top margin.
- `RescueCameraFollow`: serialized look offset, focus follows half the hero depth. Final values chosen from screenshot comparison: offset (0, 4.5, -4.0), look (0, 0, 0.6), FOV 50; pet formation ×0.7.
- `RescueAudioView`: `PlayJump/PlayLand`.
- `RescueTntHazard.Explode` opens its crater.
- Editor: `RescueRound2Patch` (menu Playable/Pet Rescue/Patch Round 2) — builder `Build` calls it so a future rebuild matches. Re-running the menu re-randomizes walls.

## Scene result
- 9 craters, 10–13 tiles each (rx 2.6, rz 1.6; depths 0.5/1.0/1.5, dirt terraces, stone floor). Crater z-radius reduced from the planned 2.2 because TNTs are 7 m apart: walls need a landing gap behind each crater.
- 7 random cobblestone walls (z 3.5, 7, 15, 23, 37, 44, 50; widths 1–2). Rules: never on crater tiles, ≥ 1.5 m landing gap behind a crater, opening lane clear for z < 6, gate zone clear, free road width ≥ 1.6 m.

## Assets
Jump.ogg 4,777 B (from Assets/Sound/jump.wav), Land.ogg 6,626 B (from Assets/_Playable_/Sound/Xmas/sfx_land_poof.wav), cobblestone.png 845 B (vanilla pack), Cobblestone.mat (Unlit/Texture). Scene file 17,108,041 → 17,195,450 B (+87 KB serialized YAML, not build bytes).

## Verification
- Compile OK; Console errors 0.
- EditMode job 60a70f2c1c304f4d931a44ddc04453f2: 42 total, 40 pass, 2 fail. Both failures pre-existing and unrelated (Pig material shader is Particles/Standard Unlit; Swipe left/right TMP outline width 0).
- New/updated tests: swipe-up input (3), crater open/terraces/once, overlap never raises, hero sinks/stands still/jumps out for every TNT, jump escape at dt 0.05/0.1/0.333, pets wait and jump, walls block + steer frees + corridor + crater clearance, landscape/portrait top labels on-screen without overlap (960x540, 540x960, 2340x1080, 1080x2340), camera values, audio cue bindings.
- Play Mode: wall blocks hero at z 6.2; TNT 3 hit → hero sinks to -1.5 and stands still, SWIPE UP hint visible (game view screenshot Temp/round2/pit_gameview.png); swipe → hero lands on road and continues (z 40.5), all 6 pets followed out, hint hidden. Camera comparison Temp/round2/cam_compare.png.
- Not verified: real landscape overlay screenshot (Game view is portrait; landscape covered by layout test math), real-device touch swipe, Luna export/browser, build size.

## Follow-up (user, 2026-11-23): jump hint layout
User: the swipe-up tutorial must not replace the "LEAD THE HERD" headline; use small text like the goal hint, below the hand, with an up arrow.
- `RescueTutorialView.ShowJump` no longer touches the headline. It reuses the existing goal-hint label (same small font/outline, below the hand) with "SWIPE UP TO JUMP!" and the existing ">>" arrow rotated 90° to point up, placed above the hand's flick range (flick 0..70 units). `HideJump`/`Hide` restore the original goal text, arrow rotation and position.
- New test `JumpHintKeepsHeadlineAndShowsSmallTextBelowHandWithUpArrow`. EditMode job 81a46378e7204333a24ab674cca9e7c1: 43 total, 41 pass, same 2 pre-existing failures.
- Play Mode game-view capture Temp/round2/jump_hint_v2.png: no headline, small hint below the hand, up arrow above the hand. Console errors 0.

## Follow-up (user, 2026-11-23): exact camera transform
User supplied camera Position (0, 2.6, -4.5), Rotation (25, 0, 0).
- `RescueCameraFollow`: `_lookOffset`/LookAt replaced by serialized `_angles` (fixed pitch 25°). Position = hero focus + (0, 2.6, -4.5) exactly; the old narrow-portrait raise/pull-back compensation was removed so the in-game view matches the user's transform. Focus still follows hero x * 0.35 and half the crater depth. FOV stays 50.
- Patch constants and scene updated (camera only; walls/craters unchanged). Test `CameraUsesApprovedFixedOffsetAndPitch`.
- EditMode job ee34523a978d4149a71cc807ac62ffa6: 43 total, 41 pass, same 2 pre-existing failures. Play Mode: camera at (0, 2.6, -4.5) rot (25, 0, 0); capture Temp/round2/camera_user_angle.png.

## Follow-up (user, 2026-11-23): silent pit + delayed collapse
User: no running sound once in the pit; after the TNT blast let the hero run a little before dropping.
- `RescueAudioView.Tick(..., heroRunning)`: footsteps only while `RescueHeroMotor.RunningOnGround` (not stuck, blocked or airborne).
- `RescueTntHazard`: crater opens `_craterDelay` = 0.2 s after the blast (≈ 0.7 m of extra running), via `TickEffect`. 0.35 s was tried first and let the hero reach the far rim; rejected.
- `RescueHeroMotor`: a collapse under the feet starts the fall before horizontal movement, and a falling (not jumping) hero measures steps from the ground below, so a crater opening near its far rim can no longer be skipped.
- Tests: delayed open, hero runs briefly then sinks with RunningOnGround false, crater opening at the last spot before every rim still sinks the hero. EditMode job c77596c98f144521b90d281f42f83093: 45 total, 43 pass, same 2 pre-existing failures.
- Play Mode: hero from z 24 hits TNT 3, keeps running, sinks to y -1.5 at z 27.0, InPit, footsteps source silent.

## Follow-up (user, 2026-11-23): run along the pit floor
User clarified: on the blast the hero should drop and run a little along the bottom of the pit (not run on the surface first).
- `RescueTntHazard._craterDelay` default 0: ground collapses right after the blast (supersedes the 0.2 s delay above; mechanism kept, tunable per TNT).
- `RescueHeroMotor`: inside a pit the hero keeps running forward along the floor (steering disabled) until the next terrace/rim blocks him, then stands still; footsteps stop when blocked.
- Test `HeroDropsAtTheBlastAndRunsAlongThePitFloorUntilTheWall` replaces the delayed-collapse test. EditMode job 7fbe242415184032acad69b0831161da: 45 total, 43 pass, same 2 pre-existing failures.
- Play Mode: hero from z 24 hits TNT 3 (~z 25.35), drops to -1.5, runs on the floor to z 26.99, stops at the wall, InPit, footsteps silent.

## Follow-up (user, 2026-11-23): swipe-up tutorial once
- `RescueGameFlow`: the jump tutorial is shown only for the first pit of the run (`_jumpHintUsed`); later pits show no hint. Hint still hides when the hero leaves the pit.
- Test `SwipeUpTutorialAppearsOnlyForTheFirstPit` (two pits via the flow: first shows, second does not). EditMode job 6429d942d2304d649705fd8d71964b69: 46 total, 44 pass, same 2 pre-existing failures.

## Follow-up (user, 2026-11-23): run cycle in pit + green install button
- `RescueHeroMotor`: Animator `Running` stays on while the hero is in a pit (also when stopped at the crater wall). Footsteps use a separate "moving on ground" flag, so they stay silent at the wall (earlier request kept).
- Endcard INSTALL NOW button recolored green in the live scene (Image colors only): border (.10,.30,.07), bevel (.56,.86,.34), face (.30,.66,.17). Label unchanged (white, black outline). Builder `ConfigureEndcard` uses the same colors.
- Tests `HeroKeepsRunAnimationInThePitWithoutFootsteps`, `InstallButtonIsGreen`. EditMode job 427f35c9f31940a6a13391fe4b5bc2d5: 48 total, 46 pass, same 2 pre-existing failures. Play Mode endcard capture Temp/round2/endcard_green.png.

## Follow-up (user, 2026-11-23): run cycle against walls
- `RescueHeroMotor`: the Animator `Running` state stays on for the whole run (against a wall, in a pit, in the air). Footsteps still play only while actually moving.
- User hand-tuned the endcard in the scene (saved 14:16): face (.081,.906,.086) green, border/bevel back to neutral gray, and left the Endcard GameObject enabled. Scene was not modified by Claude. To keep gameplay safe, `RescueEndcardView.Initialize` now hides the card unless it has been shown. Builder colors and `InstallButtonIsGreen` (face only) follow the user's values.
- EditMode job ac219558dbd648c4b962dd040770c946: 48 total, 46 pass, same 2 pre-existing failures. Play Mode: endcard hidden at start; hero blocked by Wall 2 at z 6.19 with Animator in Run state, footsteps off.
