# Implementation report — Pet Attract (cr1)

Status: IMPLEMENTED - AWAITING USER REVIEW (2026-11-23)
Branch: `UAC_V87` (no commit made)

## Delivered (per approved plan)

| Area | Result |
|---|---|
| Scene | `PetRescue.unity` patched in place with `Playable/Pet Rescue/Patch Attract (cr1)`. The patch is idempotent: it was run 3 times with the same result. Runner tiles, banks, pit, fences, gate and corridor walls were removed. Added: an 80×80 m tiled grass ground, a 30×30 m stone-brick border, the 12 existing trees (4 inside the arena as obstacles), 6 stone pillars as obstacles, 6 pets around the hero and 8 TNT. |
| Input | Floating joystick (old Input Manager): press anywhere, drag to move. The anchor trails the finger. |
| Hero | 4.5 m/s free movement, turns to face the move direction. TNT gives a 2.5 m ease-out knockback, a 0.8 s stun with a wobble, and no heart loss. |
| Pets | Wander around their homes (roam 2.5 m, seeded) even before the first touch. Within 1.6 m the pet is collected and then trails the hero. A blast scatters wandering pets. |
| Outcome | 5 hearts → `NotifyWin` + `OpenStore` (immediate) → win endcard. 15 s → `NotifyLose` → time-up endcard; the store opens only on tap (D1). The global 30 s End Time → store is unchanged. |
| Endcard | Green `Install button` and `INSTALL NOW` label untouched. Titles: `PETS LOVE YOU!` / `TIME'S UP!`. |
| HUD | Timer centered at the top, `x/5` + 5 pixel-heart slots below it, and a `Collected!` toast (reuses the former `Prompt` text). Timer turns red and punches in the last 5 s. |
| Tutorial | T1 ring + hand + `DRAG TO MOVE` + subline. T2 arrow to the nearest pet (pinned to the screen edge when off-screen). T3 toast, heart burst and heart fly-in. T4 `AVOID TNT!` once. T5 idle 3 s → hand returns. T6 red timer. |
| Orientation | `ResponsiveCanvasScaler` added: portrait match width, landscape match height. Separate camera profiles for portrait and landscape. Tutorial group lifts and shrinks in landscape. Endcard scales 1.5× in landscape. |

## Deviations from plan (please confirm)

1. **Camera values tuned after screenshots.** Portrait (0, 4.2, −5.6) at 27°, FOV 64; landscape (0, 3.6, −5.4) at 22°, FOV 48. The planned 40°/35° pitch hid the horizon and made the pets tiny. The new framing is closer to the video (sky, trees and wall visible).
2. **TNT warning (T4) timing.** A plain approach now waits until the drag/find-pet steps are over (one new idea at a time). A real TNT hit always shows the warning.
3. **Endcard landscape scale.** Added a 1.5× card scale in landscape, because the landscape canvas is 1920 units tall and the card was small. Button colors and texts are unchanged.
4. **Unused audio methods removed.** `PlayJump`/`PlayLand` are gone, and the clips stay serialized. `PlayHit` reuses `Land.ogg`.

## Files

- **Modified:** `RescueGameFlow`, `RescuePointerInput`, `RescueHeroMotor`, `RescuePetFollower`, `RescueTntHazard`, `RescueCameraFollow`, `RescueHudView`, `RescueTutorialView`, `RescueEndcardView`, `RescueAudioView`.
- **Renamed:** `RescueCourse` → `RescueArena` (same GUID).
- **New:** `RescueTutorialFlow`, `RescueHeartFeedback`, `Editor/RescueAttractPatch`.
- **Deleted (D6):** `RescueCrater`, `Editor/RescueRound2Patch`, `Editor/RescueSceneBuilder`.
- **Assets:**
  - `Textures/UI/heart_pixel.png` (232 B), `joystick_ring.png` (3.7 KB), `pointer_arrow.png` (736 B).
  - `Materials/AttractGround.mat`, `Materials/ArenaWall.mat`.
- **Tests:**
  - `RescueInputTests` rewritten (6 tests; the swipe-up cases were removed with the feature).
  - `RescueSceneTests` rewritten (32 test cases). Removed runner tests: crater, pit, jump, gate, corridor walls, swipe tutorial, the old loss auto-store, the fixed runner camera, half speed, and the pet trailing clusters. Replaced: actors, flow refs, shaders, VFX, audio, hero animator, green button.
  - `RescueTutorialFlowTests` new (6). `RescueRulesTests` unchanged (8).

## Verification evidence

- **Compile:** 0 errors. Console during play: 0 errors; only the existing `WebGL1 InternalErrorShader` warnings.
- **EditMode tests:** job `9925a09699264be99b9c79f0ac418604`, **48/48 passed**.
- **Play Mode, portrait 9:20:**
  - Drag hint at start.
  - Pet pointer after moving.
  - Collect: toast, burst, fly-in, slot 1 filled.
  - Idle re-prompt.
  - Time-up endcard; win endcard 5/5.
- **Play Mode, landscape 20:9:** start layout, time-up endcard, win endcard.
- **Onboarding timing:**
  - First prompt is visible on the first frame.
  - The first successful action is the drag, about 0.35 s of movement.
  - The first heart takes about 2–4 s; the nearest pets are 3.8–5 m away at 4.5 m/s.
- **Budget:** scene YAML 17,195,663 → 6,046,461 bytes. New assets total about 6.5 KB.
- **Note:** one white-silhouette frame on pets right after entering Play was a first-frame texture load; it rendered correctly on the next capture.

## Not verified

- Luna export and the 4.5 MB build measurement (not run).
- Real device touch.
- The non-gesture `OpenStore` on the 5th heart, on ad networks (D7 accepted risk).

## Side notes

`Assets/SVC_Luna.asset` and `luna.json` show 1-line changes made by the Luna tooling when Play mode started. I did not edit them, so review them before committing.

## Follow-up (2026-11-23, user request)

- The `x/5` counter text was removed; the 5 heart slots alone show progress, and the heart bar is re-centered under the timer.
- `RescueHudView._counter` was removed. The live scene was patched directly (the `Rescue count` object deleted, the slots re-spaced). `RescueAttractPatch` was updated to match.
- EditMode tests: job `1fd236da94bd4f96b255f017463baa14`, 48/48 passed. A portrait screenshot was checked.

## Follow-up 2 (2026-11-23, user request): joystick sprites

- **Tutorial joystick base:** `2D Texture/UI/Joystick/AllAxis_Outline_Arrows.png`, 230 units.
- **New knob:** `AllAxis_Plain_Arrows.png`, 104 units, 90% alpha. It circles inside the base together with the hand (`RescueTutorialView._knob`).
- **Import settings:** both sprites are used only here, so their import max size is capped at 256 (base) and 128 (knob), with no mipmaps, to fit the Luna budget.
- **Removed:** the generated `Textures/UI/joystick_ring.png` and its generator in `RescueAttractPatch`. The patch now wires the base and knob.
- **Scene:** patched live (only `Drag ring` sprite + new `Drag knob`); saved.
- **Tests:** EditMode job `a2ae0966e4d84ddba3622e1d430d45b8`, 48/48 passed. A portrait Play screenshot was checked.

## Follow-up 3 (2026-11-23, user request): live joystick + persistent pet arrow

- **New `RescueJoystickView`** (Canvas → `Live joystick` with `Base`/`Knob`, same Outline/Plain Arrows sprites). While the finger is down, the base sits at the touch anchor and the knob follows the stick. It is sized from the real input radius (9% of the short screen side), hidden on release and at the outcome, and draws under the endcard.
- **Pet arrow:** it now stays visible after every collect and points to the nearest pet still uncollected. It is hidden only during the first DRAG TO MOVE hint, and automatically once no pet is left or the round ends (`RescueTutorialFlow.PetPointerVisible`).
- **Scene:** patched live (new `Live joystick` objects + component, flow `_joystick` wired); saved. `RescueAttractPatch` was updated to match.
- **Tests:** EditMode job `bf4757bfd1ab4ae794c12135744de45a`, **50/50 passed** (new: live joystick wiring/sprites, arrow after collect; updated: tutorial flow arrow rule).
- **Visual check:** in Play mode the arrow was still showing after the first heart. The joystick visual was checked by calling `Show` directly, because Play mode can't simulate holding a real finger or mouse. Real touch on a device has not been tested.

## Follow-up 4 (2026-11-23, user request): fixed joystick

- **Fixed position:** the joystick no longer follows the touch point. `RescueJoystickView` places the base at the tutorial `Drag ring` spot and size (`_anchorRef`), so portrait and landscape line up automatically.
- **Input:** the player still drags anywhere on screen (same floating input); the knob inside the fixed base shows the stick direction and returns to center on release.
- **When it shows:** throughout play. It is hidden while the DRAG TO MOVE / idle hint ring shows (same spot) and at the outcome.
- **Scene:** `_anchorRef` wired live; saved.
- **Tests:** EditMode job `bbf43e8c76a54ec28634a97a00e7651f`, 50/50 passed. Play mode screenshot after the drag step shows the fixed joystick at the bottom center.

## Follow-up 5 (2026-11-23, user request): camera swipe + Jump button + left joystick — see `plan-amendment-1.md`

- **Input:** `RescuePointerInput` is now a multi-touch router.
  - A finger that starts on the joystick (radius ×1.35) moves the hero; the stick is measured from the fixed joystick center.
  - A finger that starts on Jump jumps once.
  - Any other finger rotates the camera (200° per full screen-width swipe).
  - Two fingers (move + look) work at the same time. The mouse is the editor fallback.
- **New `RescueControlsView`** (replaces `RescueJoystickView`, which was deleted):
  - Joystick bottom-left (Outline/Plain Arrows), Jump bottom-right (`Game/Textures/UI/Ingame/btn_jump.png`), camera hint bottom-center (`ItemIcon_Camera_2` + ◀ ▶ arrows).
  - Separate portrait and landscape positions. Jump presses scale the button down; during the TNT hint the button pulses.
- **Camera:** `RescueCameraFollow` has an orbit yaw, and movement is camera-relative (`RescueGameFlow.ToWorld`).
- **Jump:**
  - `RescueHeroMotor.TryJump` gives an apex of about 1.1 m and a 0.64 s airtime, with the idle pose in the air (there is no jump clip).
  - TNT is ignored while the hero's feet are above 0.35 m, so jumping clears TNT.
  - Collected pets hop (`RescuePetFollower.Hop`) and the `Jump.ogg` cue plays.
- **Tutorial:**
  - Drag (ring/knob/hand drawn on the fixed joystick).
  - SWIPE TO LOOK (hand swipes over the camera hint; completes after a swipe of 15% of the screen width, or 4 s).
  - Find pet, then Free.
  - The first TNT shows "JUMP OVER TNT!" while the Jump button pulses; pressing Jump shortens it.
  - Title block moved above the controls (narrower in landscape).
- **Scene:** patched live with `RescueAttractPatch.EnsureControls` only (the old `Live joystick` object and the missing-script component were removed); saved.
- **Tests:** EditMode job `a11e40cf98b8435f9f6849ab5e541273`, **53/53 passed**:
  - New input tests: zones, two fingers, jump once, look delta.
  - New tutorial-flow tests: look step, jump hint.
  - New scene tests: control corners/sprites, camera-relative movement, jump over TNT + pet hop, controls in the 5-resolution layout test.
- **Play mode:** portrait (start, SWIPE TO LOOK, rotated camera) and landscape 20:9 (SWIPE TO LOOK) checked. Console errors = 0.
- **Not verified:**
  - Real multi-touch on a device.
  - The TikTok joystick reference (the page could not be opened).
  - Import size of the shared `btn_jump.png`/`ItemIcon_Camera_2.png`: left unchanged because other scenes may use them.

## Follow-up 6 (2026-11-23, user request): infinity icon

- **Icon swap:** the camera-swipe hint shows the white infinity symbol instead of the camera icon. The sprite is the existing `Assets/toppng.com-white-infinity-symbol-…-1024x441.png`, the same one used by the `InfinitySwipe` prefab; its import settings are untouched because the asset is shared.
- **Layout:** the icon is 150×65 and the ◀ ▶ arrows moved to ±118 to make room.
- **Scene:** patched live (`Camera icon` replaced by `Infinity icon`); saved. `RescueAttractPatch` was updated to match.
- **Tests:** EditMode job `4d76d1876ead494d94685d4970f4b24d`, 53/53 passed. Portrait Play screenshot checked.

## Follow-up 7 (2026-11-23, user request): infinity hint placement + hand path

- **Infinity hint:** stays centered and was raised a little above the joystick's height (portrait y 480, landscape y 560). The box is 300×70.
- **Swipe hand:** in the SWIPE TO LOOK step the fingertip traces the infinity sign around the icon (lemniscate, half-width 72) instead of swiping sideways.
- **Tutorial text:** the block sits right on top of the infinity hint, bottom edge = hint top + 4. The text closest to the hint touches it: in DRAG TO MOVE the subline sits directly on it with the title above; when the title is alone (SWIPE TO LOOK) it drops onto the hint.
- **Scene:** saved with the new hint/group placement; `RescueAttractPatch` was updated to match.
- **Layout test:** now checks that the text sits on the hint, the hint is above the joystick, and the hint is centered. It applies the controls layout before the tutorial layout, the same order as the game.
- **Tests:** EditMode job `bf3fab546000438fb73e1d2615fda4e4`, 53/53 passed. Portrait screenshots of DRAG TO MOVE and SWIPE TO LOOK checked.

## Follow-up 8 (2026-11-23, user request): camera-swipe tutorial removed, "SWIPE TO MOVE" above the joystick

- **Removed:**
  - The SWIPE TO LOOK step: `RescueTutorialFlow` is now Drag → FindPet → Free, plus the TNT/Jump hint.
  - The infinity camera-hint (`Controls/Camera hint` object, `RescueControlsView._cameraHint`, `RescueTutorialView._lookTarget`, and the lemniscate hand path).
  - Camera swiping itself still works (any touch outside the joystick/Jump); it just has no tutorial step.
- **Tutorial text:** now only "SWIPE TO MOVE", placed right above the fixed joystick: bottom edge = joystick top + 6, centered on the joystick but kept inside the screen edge, 460×80, autosize 30–56. It shows on the first step and is hidden for the hand-only idle re-prompt.
- **Subline hidden:** "Get close to pets to collect hearts!" is no longer shown (its object stays inactive as a TMP style template).
- **Scene:** patched live and saved; `RescueAttractPatch` was updated to match.
- **Tests:** EditMode job `bd9b7e881e2546dc98aa79d3e59eda5f`, 52/52 passed (the Look-step test was removed; the layout test now checks the text sits right above the joystick). Portrait Play screenshot checked.

## Follow-up 9 (2026-11-23, bug): joystick resets when dragging far

- **Symptom (user):** dragging far away from the joystick resets it.
- **Root cause:** the multi-touch router from follow-up 5 dropped the touch↔simulated-mouse handoff handling the original input had. When the runtime switches the contact source or sends a spurious Ended, the joystick finger is released and the next frame's contact counts as new. It starts outside the joystick, so it becomes a camera swipe and the stick resets. Second defect: a mouse-owned role was never released once real touches arrived.
- **Fix (`RescuePointerInput`):** handoff memory. A joystick/camera role released within the last 2 frames is re-taken by a contact that reappears within 3 stick radii of the release point; this does not count as a new press or jump. A mouse-owned role counts as gone when real touches are present.
- **Tests:** 4 new input regression tests:
  - far drag + touch→mouse handoff keeps steering;
  - mouse→touch handoff;
  - camera-swipe handoff;
  - a late or distant touch after a real release starts fresh.
  - One existing test now waits a few frames between release and the new touch.
- **Result:** EditMode job `6cd9128db16d403aba57c9ffe5b44e07`, **56/56 passed**.
- **Not verified:** the exact runtime the user saw it in (Editor vs Luna/device) is unknown; real-device multi-touch is not tested.

## Follow-up 10 (2026-11-23, user request): TAP TO JUMP step after the joystick tutorial

- **Tutorial order:** SWIPE TO MOVE (joystick) → **TAP TO JUMP** → pet arrow (FindPet/Free), plus the one-shot "JUMP OVER TNT!".
- **Visuals (`RescueTutorialView`):** a hand (`icon_hand.png`) taps the Jump button in a press-and-lift loop, and "TAP TO JUMP" sits right above the button. It is centered on the button but kept inside the right edge, 400×80, autosize 30–52. The Jump button pulses during the step.
- **Completion:** a successful jump ends the step; if the player never taps, a 4 s fallback ends it. A jump during the joystick step does not skip the joystick step, and there is no idle joystick re-prompt during the jump step.
- **Scene:** new `Canvas/Jump hint` (`Jump label` + `Jump hand`) added live and saved, drawn above the controls and under the overlays/endcard. `RescueAttractPatch.EnsureControls` was updated to match.
- **Tests:** EditMode job `a9268d44ae8b4d24869e8e197b020f73`, **58/58 passed** (new: TAP TO JUMP flow/timeout/no-skip, hint wiring + completion on jump, label right above the Jump button in the 5-resolution layout test). Portrait Play screenshot checked.

## Follow-up 11 (2026-11-23, bug): landscape UI hidden by the notch

- **Symptom (user screenshot):** in landscape on a notched phone, the notch covered "SWIPE TO MOVE" and the edge of the joystick.
- **Root cause:** the joystick, Jump button and their labels ignored the screen safe area, and only the top HUD handled it.
- **Fix:**
  - `RescueControlsView.ApplyScreenLayout(width, height, safeArea[, scaleFactor])` pushes the joystick and Jump inward by the safe-area insets (left/right/bottom, converted to canvas units).
  - In landscape both sides keep the larger inset, because the phone can be rotated either way, and at least 7% of the width (`LandscapeMinInset`), because Luna/web often reports no safe area.
  - `RescueTutorialView.ApplyScreenLayout` clamps "SWIPE TO MOVE" and "TAP TO JUMP" inside those insets.
  - `RescueGameFlow` passes `Screen.safeArea` and the insets each frame.
- **Tests:** the layout test now also runs notch cases 2532×1170 (141 px notch) and 2340×1080 (120 px), plus a no-safe-area 2400×1080 case. Every HUD/control/label box must stay outside the notch/fallback margin on both sides. EditMode job `c2f282bbbbde4a4a846280e3080ea352`, **61/61 passed**.
- **Checked:** landscape 20:9 Play screenshot (TAP TO JUMP step).
- **Not verified:** a real notched device or the Device Simulator.

## Follow-up 12 (2026-11-23, user request): larger landscape UI

- **Scale:** all landscape UI is drawn 1.25× larger (`RescueControlsView.LandscapeUiScale`, `UiScale(width, height)`). Portrait is unchanged.
  - Joystick and Jump sizes plus their corner offsets (safe-area insets still applied).
  - "SWIPE TO MOVE" and "TAP TO JUMP": the label scale and the edge clamps use the scaled width.
  - Tutorial hands, pet arrow and TNT warning.
  - HUD top cluster (timer, hearts, "Collected!" toast): `Top UI` now scales from a top-center pivot.
  - The endcard keeps its existing 1.5× landscape scale.
- **"Collected!" toast:** its box is now a fixed 760-unit width, centered. It used to stretch to 70% of the width, which crossed the edge margin once scaled; the text was unaffected.
- **Scene:** toast box patched live and saved; `RescueAttractPatch` was updated to match.
- **Tests:** the layout test maps the scaled HUD/labels and checks the larger landscape controls at all 8 resolutions, including the notch cases. EditMode job `877b0703245d4d72920a38c7a5b26fb6`, **61/61 passed**. Landscape 20:9 Play screenshot checked.

## Follow-up 13 (2026-11-23, bug): Luna build "this.HandleTimeUp is not a function" + no explosion sound

- **Root cause:** Luna's unused-method stripping. `luna.json` → `unity.unusedMethods` marked 34 PetRescue methods `"excluded": true`, which removes them from the production `scripts.js`. They were presumably flagged from a profiling session that never reached those paths. Gameplay ones:
  - `RescueGameFlow.HandleTimeUp` (time-up → the reported error every frame).
  - `RescueHeroMotor.Knockback`/`TickStun`/`EaseOut`, `RescueAudioView.PlayHit` (TNT hit → threw before `PlayExplosion` → **no explosion sound**).
  - `RescueTutorialFlow.OnJumped`, `RescuePetFollower.Hop`/`ScatterFrom`, the `OnDisable` cleanups.
  - The develop build (`LunaTemp/stage4/develop`) still contained them, which is why it only failed on the uploaded build.
- **Fix:**
  - `luna.json`: set `excluded` to false for all 34 PetRescue methods, and for 515 DOTween + `UnityEngine.Rect` methods. Those included overloads this code can reach: `Kill(true)`→`TweenManager.Complete`, `DOKill$1`, `DOFade` UI overloads, `SetUpdate$1`, `Rect.Contains$n`. Only `"excluded"` values changed (diff verified; backup taken before the edit).
  - Code: `RescueHudView` uses plain `Kill()`/`DOKill()` instead of the complete-on-kill overloads.
  - `RescueGameFlow.CheckHazards` plays the explosion/hit sounds right after `Explode()`, before the knockback.
- **Regression test:** `LunaUnusedCodeStrippingKeepsAllPetRescueAndDOTweenMethods` reads `luna.json` and fails if any PetRescue/DOTween/Rect method is excluded. The same check finds 549 stripped methods in the old file and 0 now. EditMode job `b5ed5c2a005748bd8e6f50023641b261`, **62/62 passed**.
- **Not verified:** a new Luna build/upload (the user needs to rebuild).
- **Note for the user:** if the Luna "unused methods" optimisation is re-run, play every path first (win, time-up, TNT hit, jump), or keep PetRescue/DOTween unchecked; the new test will flag any re-stripping.
