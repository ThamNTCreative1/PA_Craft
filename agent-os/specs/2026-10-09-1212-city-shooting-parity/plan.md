# City shooting adaptation

Status: APPROVED
Approved by: user — "hãy thực hiện đi cho tôi" after the identified City source slice.

Implementation scope presented before edits: PlayerPaintballController, Paintball animation assets/controller and Gameplay weapon socket. No new interface or runtime framework. Existing player movement API supplies source-style movement versus use facing.

- PlayerPaintballController owns equipped/animation pending/reload/paused state. TryFire starts Fire; cloned source clip events route through OnPaintballAnimationEvent to emission/refill/completion. LateUpdate emits after pose evaluation. Explicit serialized chest reference adjusts the animated upper body, keeping both hands and gun together; no independent weapon world rotation. Uses existing player/camera/input/projectile references. Unequip cancels pending events and restores animator, pose and input; pause freezes animation too.
- PlayerPaintball.controller retains target locomotion, replaces upper-body states with source pistol Idle, Aim, Equip, Fire and Reload. Reload blends low/mid/high at source pitch thresholds -30/0/30. Clone only needed local source-equivalent clips and remap events; no Opsive event bus.
- Gameplay scene: serialize chest reference and calibrated hand-relative weapon socket. Preserve NPCs, HUD, infinite reserve, vehicles and mission wiring.
- Verification: compile and Console; actual animation-driven emission; held fire across automatic reload; infinite reserve; pending-event cancellation on exit, pause and re-entry; inspect neutral/high/low aiming screenshots. Luna runtime and size remain subject to the previously reported CarController compatibility blocker.

Adaptation boundary: source CharacterIK's full ability framework is replaced by explicit upper-body transform aiming on the existing humanoid. No new IK API dependency. This requires visual comparison; do not claim exact runtime parity without source-side runtime comparison.
