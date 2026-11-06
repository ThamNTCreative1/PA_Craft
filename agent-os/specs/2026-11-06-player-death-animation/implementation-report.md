# Implementation report
Approved by: user after the explicit player-death scope proposal.

Implementation:
- PlayerController.PlayDeath stops input and Rigidbody drift, locks movement, resumes only the player Animator at unscaled speed 1 and plays terminal Death. Duration is 1.2 seconds.
- MonsterHeroFlowController passes that duration to GameManager for player-death Lose and calls PlayDeath after the common end pause, so weapon.SetPaused no longer freezes the death animation.
- GameManager reserves the outcome and raises Ended immediately, preventing timer/Win/duplicate-loss races. Only Lose presentation waits for Death. Endcard sound, blocker, Luna GameEnded notification and Auto CTA countdown begin at presentation. Install is guarded until an endcard exists and the endcard frame has passed; this also preserves the input guard when Auto CTA Delay=0.
- Shared Player_Death.anim animates HeroSkins and the default hero's separate Armature.001. It hides the paused gun using scale curves to avoid leaving the weapon floating while the character falls.
- Added Death to all eight equipped skin controllers plus the existing on-foot controller. No rigs, meshes, materials, map or monster logic changed.

Verification:
- Unity compilation completed; Console error reads returned zero entries.
- All eight skins verified using their actual SkinnedMeshRenderer.rootBone, not just mesh wrappers: actual rig root rotation advanced about 90 degrees and stayed in Death.
- Lethal damage during equip (default hero and Gugugaga): input/player movement/physics and weapon pause immediately; Animator continues; Lose hidden before animation; CTA countdown inactive during death. Lose shown at 1.2117 / 1.2125 seconds, animation advanced, gun hidden. Results/screenshots: Temp/PlayerDeath/integration-result.txt, player-falling.png, lose-after-death.png, all-skins.txt.
- Fresh PlayMode Win test: Win panel shown immediately; no death delay. Timeout test: Timeout panel shown immediately, no Lose panel. Temp/PlayerDeath/win-regression.txt and timeout-regression.txt.
- git diff --check passed for the three edited scripts.
- Temporary preview objects removed and edit mode restored. Live scene not saved with test changes.

Unverified: fresh Luna export/browser behavior, actual CTA/store navigation and final package size. New shared animation is about 7.8 KB source YAML; no source meshes/textures changed. No claim is made about total playable size.
