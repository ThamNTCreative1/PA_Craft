# GameController scene references
Status: RESEARCH COMPLETE; BLOCKED ON SCOPE / CLAUDE PLAN / USER APPROVAL

Request: populate all GameController fields in Gameplay; user linked GameManager.cs.
Scene: Assets/_Playable_/Scenes/Gameplay.unity. Read-only source inspection; no implementation changes.

## Findings
GameController component 726936418 has nine null object references. GameManager is a separate object; its UI references and music are assigned, while optional background texture is null.

Identified GameController candidates:
- _playerAction: PlayerAction component 529199470 on Player prefab instance 529199467.
- _player: PlayerController component 529199471 on same instance.
- _playerUI: Canvas/GamePanel/UIPlayer, GameObject 491263488.
- _motorbikeRide._panel: Canvas/GamePanel/UI motobike, GameObject 539229847.
- _motorbikeRide._firstRideHint: its First Ride Tutorial, GameObject 1307206192.
- _carRide._firstRideHint: root First Car Ride Tutorial, GameObject 527513978; inspect intended hierarchy before approval.
- _startTutorial: candidate 1944867691, also assigned to MissionsJournalController.
- _moveTutorial: candidate 1694405947, also assigned to MissionsJournalController.
- _carRide._panel: not identified; no explicitly named car UI panel found among serialized GameObjects. Do not substitute a shared bike panel without checking Awake/SetRiding/SetDrivingCar ordering, which can disable a shared panel.
- _gameBrightness already 0.6.

## Dependencies and risks
PlayerAction has null _playerController, _interactionCamera, _exitButton, _motorbikeArrow, _carArrow and empty _motorbikes/_cars. PlayerController has null driving buttons and _gameController. Filling only GameController does not repair these dependencies. Exact additional scope needs user decision.
GameController initializes riding panels and opening hints in Awake; subscribes to PlayerAction.MotorbikeMounted in Start; switches UI and dismisses hints for bike/car riding. Journal also controls opening tutorials, so preserve mission behavior.
Existing uncommitted changes: Gameplay.unity, GameManager.cs, Assets/SVC_Luna.asset, luna.json. Preserve them.
Unity MCP is unavailable in this session; no Editor, PlayMode or Luna build checks performed.

## Handoff
Claude must define exact scene-only mapping and any required hierarchy/dependency changes after scope clarification. No new class/interface/pattern is required for reference assignment. Proposed implementation file is Gameplay.unity; code/prefab changes require explicit scope approval.
Verification: resolve each fileID and component type, inspect minimal diff preserving existing edits, confirm no null references in approved fields, then Editor Console and PlayMode checks for journal/start hints, player UI, bike/car mount and dismount, first ride hint dismissal. Luna runtime and size remain unverified until built.
