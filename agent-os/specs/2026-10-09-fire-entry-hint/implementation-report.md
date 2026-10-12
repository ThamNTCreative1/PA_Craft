# Paintball entry hint

User requested removal of the ammo counter shown in the screenshot and replacement with FIRE text below the firing button plus a scaling hand pointing at it.

- Gameplay.unity: Ammo object inactive; existing mission Hint text moved below Fire, changed to FIRE; existing icon_hand sprite reused in a new non-raycast Image. Previous top aiming instruction is replaced. Hand size 110 x 127, pivot near fingertip, anchored to Fire location.
- New Scripts/UI/ScaleHandHint.cs: DOScale 1 to 1.15 over 0.45 seconds, looping Yoyo; kill tween/reset scale on disable. Existing weapon hint lifecycle shows on Equip and hides after first emitted shot. No gameplay/input gating or outcome changes.
- Verified Play Mode: ammo hidden; actual firing hid hint; mission re-entry displayed hint again. Final screenshot inspected at Temp/FireHint/final-entry.png. Hand/text do not intercept pointer events. Unity Console zero errors.
- No new texture imported, no GameController change. Luna build not rerun for this UI-only change; prior vehicle API blocker remains.
