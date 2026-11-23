# Plan amendment 1 — camera swipe, jump button, fixed left joystick

Status: APPROVED (2026-11-23). User answers recorded below. The TikTok joystick reference could not be opened; the standard mobile layout is assumed and flagged in the report.

## User decisions

| # | Decision |
|---|---|
| B1 | **Camera:** swiping anywhere that is not the joystick or the Jump button rotates the camera (yaw around the hero). A camera-swipe hint image sits at the bottom center. |
| B2 | **Joystick:** fixed at the bottom-left, using the reference style (Outline/Plain Arrows sprites). The joystick finger must start on the joystick. |
| B3 | **Jump button** at the bottom-right (`Game/Textures/UI/Ingame/btn_jump.png`). Jumping clears TNT: while the hero is in the air, TNT does not trigger. Collected pets hop too. There is no jump clip, so the hero shows the idle pose during the arc. |
| B4 | **Tutorial:** a short "SWIPE TO LOOK" step after DRAG TO MOVE. The first TNT shows "JUMP OVER TNT!" and the Jump button pulses. |
| — | This reverses A3 ("no jump button") at the user's request. |

## Design

- **`RescuePointerInput`** (same GUID) becomes a multi-touch router on the old Input Manager. A finger that begins on the stick zone drives the stick, and the stick is measured from the fixed center. A finger that begins on the Jump rect fires a one-shot jump. Any other finger is the camera finger and produces a horizontal delta. Each role has at most one finger. Mouse is the editor fallback with the same zones.
- **`RescueControlsView`** (new, replaces `RescueJoystickView`):
  - Lays out the fixed joystick (bottom-left), the Jump button (bottom-right) and the camera hint (bottom-center) for portrait and landscape.
  - Shows the knob and the jump press/pulse.
  - Exposes the screen-space zones to the input.
- **`RescueCameraFollow`:** adds a yaw that orbits the offset around the hero. Movement is camera-relative: the flow rotates the stick by the yaw.
- **`RescueHeroMotor`:** `TryJump()` with a vertical arc (apex about 1.1 m) and `Airborne`/`Height`. A TNT hit is ignored while the hero's feet are above 0.35 m.
- **`RescuePetFollower`:** `Hop()` gives collected pets a vertical hop.
- **`RescueTutorialFlow`:** the steps become `Drag → Look → FindPet → Free`, plus a one-shot jump hint on the first TNT.
- **`RescueTutorialView`:**
  - The drag hint sits on the fixed joystick.
  - The look hint swipes over the camera hint image.
  - The title text switches between DRAG TO MOVE and SWIPE TO LOOK.
- **No new interface, event or service.** One new view class.
