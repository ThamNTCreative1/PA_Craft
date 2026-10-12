# Car tutorial implementation scope
Status: PENDING APPROVAL
Prepared by Codex as a concrete proposal from research; not a completed Claude planning pass.

Files/types:
1. NEW Assets/_Playable_/Scripts/UI/CarDriveTutorial.cs (+ Unity .meta): owns active/paused/completed cue state and camera-facing orientation. Serialized references to PlayerAction, Camera and visual root. Begin resets completion for mission entry; End hides; SetPaused hides/restores unfinished guidance. Subscribe/unsubscribe to CarMounted in matching lifecycle; mount completes the cue. No global lookup, new interface or service. Direct composition is sufficient.
2. EDIT Assets/_Playable_/Scripts/Missions/CarMissionController.cs: serialized tutorial reference and forward OnEntered/OnExited/SetPaused. Other mission behavior stays as inherited.
3. EDIT Assets/_Playable_/Scenes/Gameplay.unity: add Car Tap To Drive Tutorial controller and world-space Canvas visual anchored above Playable Sports Car. Child Hand reuses icon_hand.png and ScaleHandHint; child TMP label reads TAP TO DRIVE. Label does not pulse. Use existing font/material; disable UI raycast targets and do not add colliders. Set serialized references. Keep existing car arrow intact.
Existing ScaleHandHint and GameController require no code changes. No prefab changes, imported image, package, shader or gameplay input changes.

Lifecycle:
Car mission enter -> Begin -> cue visible above car, hand pulses. Camera moves -> world anchor stays on car and visual faces camera. Random screen tap -> cue remains. Successful CarMounted -> complete and hide. Journal pause/mission exit -> hide. Resume before completion -> show. Re-enter car mission -> reset cue.

Verification:
Compile/domain reload and Console. Inspect scene references and raycast flags. PlayMode/screenshot: front, side and behind camera, portrait/landscape; finger/text readable and anchored. Verify mount hides, unrelated tap retains, journal pause/resume, mission switch and re-entry; car/bike/fire hints unaffected. Verify existing ray-based mounting through the cue. Luna build/device and measured output under 4.5 MB required for full verification; do not claim them unless performed. Back up current scene before mutation and preserve all existing user changes.
