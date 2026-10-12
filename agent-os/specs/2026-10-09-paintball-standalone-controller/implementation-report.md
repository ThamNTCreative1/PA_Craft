# Standalone Paintball controller

Status: implemented; Editor verified. User authorized assigning exported full-body clips to Paintball.

Changes:
- PaintballAnimationBaker.cs: added standalone controller creation/assignment; export full-body Fire_Gun, Reload_Gun and Jump_Gun alongside existing Idle_Gun, Run_Gun, Draw_Gun.
- Animations/Luna/Standalone/PaintballStandalone.controller: one layer, no AvatarMask, IK or BlendTree. Idle/Run/Jump driven by speed/isJump; Equip/Fire/Reload return to locomotion after clip completion.
- PlayerPaintballController.cs: play Equip/Fire/Reload on layer 0; remove Aiming/Pitch parameter updates.
- Gameplay.unity: _armedAnimator references PaintballStandalone. Other missions/controllers unchanged.

Verification (Temp/StandaloneGunClips/mission-check.txt):
- Equipping completes via clip events.
- Runtime layerCount=1; speed=3 reaches Run; speed=0 reaches Idle.
- Run leg rotation changes 42.29747 degrees with manual Animator stepping.
- Controlled stepping and projectile pool reset: 48 shots, ammo 0, reload finishes at ammo 48.
- Pause speed=0, resume speed=1.
- Unity Console zero errors. Editor stopped.

Not verified: no new Luna build/browser playback in this change. During full-body Fire/Reload the action clip replaces the running pose; movement logic remains active.
