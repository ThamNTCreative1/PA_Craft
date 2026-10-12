# Mission movement tutorial tap dismissal
Status: RESEARCH IN PROGRESS
User request: A screen tap should dismiss player-control tutorials in missions while other tutorials remain.

Observed facts:
- GameController owns _startTutorial and _moveTutorial before entering vehicles; HandleStartTutorialPress attempts mounting and leaves both hints if it misses. Walking calls DismissStartTutorial, which currently clears both.
- GameController.RideUIState owns separate first-ride hints for car and motorbike, dismissed after driving input and travel > 0.05 units.
- PaintballMovementTutorial independently owns movement and camera-look hints; movement currently requires joystick input and look requires camera angle change > 2 degrees.
- PlayerPaintballController owns the shooting hint and dismisses it on a projectile shot.
- MissionsJournalController activates opening hints for driving missions and pauses/hides tutorial presentation while the journal is open. Paintball Begin resets its own hints on each entry.
- A selection tap must not accidentally dismiss newly displayed guidance in the same frame due to script callback order.

Pending clarification: whether player-control guidance means movement only, movement + camera, or also vehicle-driving guidance. An asynchronous question was sent with those three options. No gameplay source mutation performed.

Verification needs after scope resolution: touch Began/mouse down, only selected hints dismissed, no simulated mouse double-processing, journal/paused state, mission entry tap versus next tap, re-entry reset, and existing vehicle mounting and shooting behavior. Compile and Console; Luna runtime explicitly required for full validation.

## Resolved scope
User confirmed movement + camera-look hints only; other tutorials keep their individual action-based dismissal. Implemented in the same work item.
