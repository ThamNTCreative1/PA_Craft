# Paintball movement and camera tutorial

User requested the pictured SWIPE TO MOVE and infinity-hand SWIPE TO MOVE CAMERA tutorial alongside the existing FIRE tutorial.

- Added UI/PaintballMovementTutorial.cs with explicit player/camera and hint references. Begin resets both hints on mission entry; End hides on exit; pause hides cues without losing completed state. Joystick input completes move guidance; base camera yaw/pitch change over two degrees completes look guidance. Weapon recoil does not change these base angles. No input gating or new outcomes.
- PaintballMissionController forwards entry/exit/pause to the tutorial. CameraController exposes read-only Pitch alongside existing Yaw.
- Gameplay.unity contains independent copies of the existing movement text and InfinitySwipe UI/hand animation under Paintball HUD. Graphics are non-raycast. Existing FIRE hint and its lifecycle were not edited. GameController and original driving tutorials unchanged.
- Visual inspection: Temp/PaintballMovementTutorial/entry.png shows all three cues together in the requested arrangement.
- Editor checks: changing camera yaw hides only look guidance; injected joystick axis sampled by the tutorial hides move guidance while FIRE stays visible; pause/resume preserves completion; car exit hides this tutorial; re-entry shows move/look/FIRE. Evidence: Temp/PaintballMovementTutorial/verification.txt. Joystick check used an injected axis, not a physical touch-device test.
- Unity Console returned zero errors. Play Mode stopped without saving runtime state. No new textures/materials imported. Luna build not rerun for this tutorial change; previously reported vehicle API build blocker remains.
