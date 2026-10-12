# Journal gameplay visibility and hand pulse — research

Status: RESEARCH READY — gameplay visibility clarification pending; no implementation approval/design for this new work item.
Date: 2026-10-08

## Current request

- MinimapPanel must no longer appear.
- Gameplay starts hidden and becomes visible when entering a mission.
- Journal tutorial hand should DOScale when it reaches/moves to each GO button.
- User linked Assets/_Playable_/Scripts/GameController.cs.

Research uses only the current request, current source, current Unity scene, instructions, product context and applicable standards. No prior spec artifacts were read for this work item. Existing project changes were left intact.

## Observed current behavior

GameController has DefaultExecutionOrder(-100). Awake activates both opening tutorial objects and calls SetRiding(false). Start deactivates _minimapPanel and subscribes to PlayerAction.CarEntered. OnDrivingStarted calls SetRiding(true), then starts IEShowMap once. The coroutine waits _timeToShowMap, hides _gamePanel, enables _minimapPanel and loops a text scale tween. Source default delay is 8 seconds, but the actual scene Inspector value is **10 seconds**. A source search of Assets/_Playable_/Scripts found this as the relevant minimap activation path.

Actual serialized paths, verified read-only in Unity Editor:

- _gamePanel: Canvas/GamePanel (activeSelf=true), fileID 2754030885986225168.
- _minimapPanel: Canvas (1)/MinimapPanel (activeSelf=false), fileID 1650919544.
- _textMinimap: Canvas (1)/MinimapPanel/Panel/Text (TMP).
- _playerUI: Canvas/GamePanel/UIPlayer.
- _motorbikeUI: Canvas/GamePanel/UI motobike.
- _startTutorial: Canvas/GamePanel/UIPlayer/InfinitySwipe.
- _moveTutorial: Canvas/GamePanel/UIPlayer/Minimalist Joystick 04/Text (TMP).
- _drivingTutorial: Canvas/GamePanel/UI motobike/First Ride Tutorial.
- Journal: Canvas/MissionsJournalPanel, sibling of GamePanel.

Scene roots also include Camera_Controller, CityMap_Cropped, Playable Motobike 4, Player, Motorbike Guide Arrow, GameManager, GameController, AudioManager and EventSystem. There is no single observed root containing all gameplay objects and HUD.

MissionsJournalController.Start calls Show. Show disables PlayerAction/PlayerController, saves Rigidbody constraints, clears dynamic-body velocities and sets FreezeAll, deactivates the two opening tutorial objects, and starts the hand sequence. It does not hide GamePanel or the world. GO1/GO2 currently stop the hand but leave the journal visible. GO3 hides the journal, restores Rigidbody constraints, enables player components and activates both opening tutorials. HUD button reopens the journal when not riding. These are observations of source, not decisions granting scope to add gameplay for other missions.

JournalHandSequencer.Begin builds a repeating DOTween sequence: hold at target, DOMove to next target. Actual timings: move=0.4 seconds, hold=0.8 seconds. Hand localScale=(1,1,1). Stop/OnDisable kill the sequence; there is no scale animation or scale restoration.

PlayerController.Awake configures Rigidbody/references. Start calls SetDrivingControls(false). GameController also initializes UI/tutorial state in Awake. Deactivating the Player root before its first Awake/Start would affect initialization ordering; a world-hide design must explicitly handle this rather than merely toggle arbitrary roots.

GameManager independently starts its end timer. The current request does not specify timer changes.

## Clarification sent

“Ẩn gameplay khi start” means either:

A. Hide only HUD/GamePanel while the journal is shown; keep the 3D world visible behind it.
B. Hide world, player and HUD; only journal is visible.

No response has been recorded yet. Do not treat either option as approved. Also specify in the final plan whether hiding applies again when the journal is reopened; applying the same visibility policy on every Show is a candidate recommendation, not an approved decision.

Interpretation to present in planning: suppress minimap activation and its countdown entirely while retaining the inactive scene object unless the user explicitly wants asset/hierarchy deletion. For the hand, a pulse at each arrival followed by restoration to its initial scale is a candidate; exact factor/timing must be stated in the proposed plan.

## Planning surface (not an approved change list)

Likely relevant files/classes for Claude to evaluate:

- GameController.cs: minimap countdown/activation, unused minimap fields/imports if removed, existing tutorial/riding behavior.
- MissionsJournalController.cs: explicit gameplay visibility references and journal-to-mission transition; preserve input/Rigidbody ownership.
- JournalHandSequencer.cs: add scale to the existing sequence and reset scale when interrupted/restarted.
- Gameplay.unity: exact references and initial visibility matching the selected interpretation.

No new class/interface, copied source logic, package, shader or visual asset has been justified by this request. CameraController is a dependency to inspect only if world visibility requires it; no change is established by the current research. Avoid treating the GameController attachment as a request for unrelated changes.

## Risks and verification required in the plan

- No minimap or GamePanel disappearance after mounting and waiting beyond the actual 10-second scene delay; check repeat mount/dismount.
- Journal visible at the first rendered frame; intended gameplay scope hidden with no startup flash.
- GO1/GO2 current no-op does not reveal gameplay accidentally; GO3 reveals intended roots/HUD and resumes the existing tutorial without auto-mount.
- Reopen behavior and Rigidbody/input lock must remain consistent with the selected visibility scope.
- Hand travels 1 -> 2 -> 3 -> repeats; scale pulse is visible at each button; Stop/disable/selection/reopen restore base scale without accumulated multiplication or orphan tweens.
- Compile/domain reload, Console, serialized-reference and mouse/touch checks, Unity and Luna rendering, measured package size. Do not claim compliance from source size or Editor-only results.
- Use old Input handling, explicit references, existing DOTween, Built-in/UI/TMP materials; no runtime search in production code.

## Handoff

Visibility is now confirmed as UI-only. Claude prepares shape.md, plan.md and standards.md in this folder. User approves exact files/classes/objects, behavior and verification. Codex then implements the approved plan. This pass writes research/references/current pointer only; no runtime source, scene or asset mutation.
