# Car tap-to-drive hand
Status: RESEARCH READY
Request: Add pulsing hand over the mission car, label below reading TAP TO DRIVE, anchored to the car while camera moves. Existing action-specific tutorials must retain completion semantics.

Observed:
- CarMissionController currently inherits MissionController with no overrides. Base exposes OnEntered, OnExited and SetPaused.
- PlayerAction exposes CarMounted and IsInCar, and controls the existing Car Guide Arrow independently.
- ScaleHandHint already provides 1 -> 1.15 scale pulse, 0.45 seconds each direction, and kills the tween on disable.
- Existing hand sprite Assets/Game/Textures/UI/Common/icon_hand.png is used by Fire Hand and journal hands. It can be reused without importing an image.
- Gameplay.unity contains Playable Sports Car and Car Guide Arrow. The current arrow is a 3D mesh; Arrow updates world position and yaw-facing. A separate world-space UI cue can be parented to the car and billboard toward the camera without relying on screen-coordinate projection order.
- Live Editor scene was not dirty when inspected. No gameplay/scene mutations made for this request.

Open verification: roof offset and UI size require camera-view screenshots in portrait and landscape, plus Luna device verification.
