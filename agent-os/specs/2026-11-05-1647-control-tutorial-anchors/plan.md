# Control tutorial anchors v1

Status: APPROVED
Approved by: user (oke, 2026-11-05)
Approved scope: scene-only Control tutorial anchors v1.
Planner: Claude CLI

Exact scope only Assets/_Playable_/Scenes/Gameplay.unity. No C# edits, new classes/interfaces or assets.

- Reparent Swipe To Move (_moveCue) under Minimalist Joystick04 root, not base/knob. anchorMin=anchorMax(.5,1), pivot(.5,0), anchoredPosition(0,24), size380x80.
- Reparent Hint (_fireCue) under Fire. Same anchors/pivot/position, size300x70. Keep Fire Hand child pose/ScaleHandHint untouched.
- Cue graphics raycastfalse; retain references, active states, Look cue, all gameplay UI and controls.

No identified lifecycle conflict: Begin sets cues then enables controls; Cancel hides cues then controls; OnShot hides firecue. Before mutation check UltimateJoystick root fade/disable logic; if it conflicts during Move, report and request changed solution rather than modify code.

Verification: snapshot scene/current hierarchy, inspect control parents/refs. Check top gap24 in local UI units and screenshots in Move/Fire at landscape/portrait, Fire Hand alignment, joystick drag and firing, existing Look->Move->Fire->Completed, Cancel/outcome hide, Console errors. No compile needed for scene-only edits. Luna build/device/size unverified unless run.
