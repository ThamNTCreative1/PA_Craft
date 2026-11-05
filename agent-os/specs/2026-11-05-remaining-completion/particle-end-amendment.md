# End-of-game projectile particle compatibility
Status: APPROVED by user reply "oke hãy sửa đi" after presentation of exact one-file patch and verification.
Implementation: COMPLETE; fresh local packaged tests passed both orientations and all3outcomes with active projectile effects. Evidence/particle-end/browser-verification.json; no runtime injection or natural-expiry workaround.

Cause: fresh packaged test completing tutorial through actual mouse fire then immediately defeating monster throws TypeError n.Pause$1 is not a function from PaintballProjectile.PauseParticles. This aborts Flow.OnEnded and prevents GameManager.FinishEnd/CTA. Previous tests waited for effects to expire and missed this branch. Both Pause bindings absent in current package; no SDK modification proposed.

Exact file: Assets/_Playable_/Scripts/Paintball/PaintballProjectile.cs only. SetPaused keeps _paused assignment; when true, calls existing ClearParticles for flight and impact arrays. Remove PauseParticles helper. On false, no particle replay; Equip begins with an empty pool and Launch already restarts particles. Existing scenario has no replay/resume after outcome. ClearParticles uses already-proven Stop(false, StopEmittingAndClear). No trajectory, velocity, collision, damage, gun, camera, class/interface/dependency changes.

Visual effect: clears remaining projectile particles at game end rather than freezing them. Gameplay projectile physics stops as before. Verify actual shot -> immediate Win while effects are alive -> one GameEnded and one CTA >=1s; equivalent Lose/timeout with active effects; all three approved fixes stay passed; compile/Console and fresh local Luna build. No SDK/package edits.
