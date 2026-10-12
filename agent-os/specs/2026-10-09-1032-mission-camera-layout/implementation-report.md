# Mission camera and row alignment
User directly requested camera face car and repair mission row alignment, continuing the direct implementation workflow.
Research: PlayerAction.FaceMissionCar gated camera LookAtPoint to first person. Rows were sibling of Frame, top edge257.5 above frame inner area; size175 and pitch195.
Presented scope: PlayerAction.cs camera call in both views; Gameplay.unity Rows parent/position and three row sizes/positions. No new classes/interfaces/prefabs/dependencies.
Implementation: camera LookAtPoint in both views. Rows parent Frame; center(0,-45), size980x535; three rows980x165, centers185,0,-185. Equal20 gaps. Existing text/GO offsets preserved.
Verification: Unity compile Console0 errors; actual GO onClick third person positionDelta0, playerDot1, cameraYawError0, journalClosedTrue. First-person reselect cameraYawError0. Captured and visually inspected Temp/DrivingSetup/mission-layout-fixed.png; aligned rows inside frame, GO column consistent. Car-camera screenshot and viewport verification x.50 y.43 z10.42. Stopped Play Mode. No Luna build run.
