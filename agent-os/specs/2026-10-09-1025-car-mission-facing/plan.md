# Scope
Direct implementation requested by user; existing session instruction permits Codex without Claude. Scope presented before edit.
Modify PlayerAction.cs only: private FaceMissionCar called for car mission, choose nearest active unoccupied serialized car, flatten direction to Y plane, preserve player position via existing Teleport. Synchronize first-person camera using existing LookAtPoint. Guard null player/no car/coincident horizontal positions/riding. No new classes/interfaces, scene/prefab edits or packages.
Verification: Unity compile/Console; actual mission GO path, unchanged position, forward dot toward car, repeated selection, motorcycle yaw unchanged, first-person facing persists across frames. Luna build not part of this small change.
