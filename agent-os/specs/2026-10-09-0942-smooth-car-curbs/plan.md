# Smooth car curbs
Status: APPROVED
Approved by: user
Approved scope: preceding chat proposal; user explicitly requests direct Codex implementation without Claude.

Files: CarController.cs, Gameplay.unity (Playable Car 8 only), DrivingPlayModeChecks.cs.
Class: existing CarController owns private step transition state, predictive detection, safe gradual lift and cancellation. Existing dependencies and public API retained. No new interface, prefab or pattern.
Behavior: detect ahead based on speed; validate top, vertical clearance and destination; raise using bounded physics velocity over multiple ticks; retain step target briefly across the edge; stop/cancel safely for reverse input, braking, dismount or obstruction. Set stepHeight=0.6 on the existing scene car. Tests extend existing editor-only check class.
Verification: compile/Console; opt-in temporary PlayMode fixtures for 0.04/0.2/0.54 curbs, forward/reverse, slow/fast, diagonal, excessive height, overhead obstruction, release/brake; inspect per-tick height and successful traversal. Editor changes/test fixtures must not persist. Luna runtime/build verification reported separately if unavailable.
