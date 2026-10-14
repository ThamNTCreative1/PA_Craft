# Vehicle interaction reference repair
User approved repair in follow-up: "h?y ?a ?i cho t?i".
Changed implementation file: Assets/_Playable_/Scenes/Gameplay.unity only.
Restored seven PlayerAction fields: player controller, interaction camera, exit Button, bike/car arrows, motorbike array and car array. Restored five PlayerController fields: four DriveHoldButtons and GameController. Recreated the stripped MotorbikeController reference for the existing Playable Motobike 4 prefab instance.
Validation passed: referenced script GUIDs match field types; Camera and Button types match; motorbike source component exists in the actual prefab and references the expected script; prefab instance exists; no duplicate scene IDs; inverse byte comparison confirms all unrelated scene content preserved; saved bytes match.
No C# or prefab files changed. Existing interaction distance 4 and End Time 10 seconds preserved. Normal vehicle taps remain intentionally subject to end-game CTA blocking after timeout.
Unity MCP unavailable: Editor compilation/Console, PlayMode, touch/device and Luna build verification not performed. Runtime behavior must still be checked in Unity: choose each driving mission, tap vehicle before timeout, forward/reverse/steer, dismount, and verify hint/UI transitions.
