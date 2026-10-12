# Journal Gameplay Visibility & Hand Pulse — Shape

Status: APPROVED (user replied "APPROVAL all" to plan.md, which supersedes the options listed below with every default taken)
Source: research.md + references.md in this folder only (no earlier spec artifact read). This is a follow-up change on top of the already-implemented Missions Journal feature (`MissionsJournalController`, `JournalHandSequencer`, `MissionRowView`, all now real code in the project).

## Goal

Three independent changes, all scoped to the already-shipped journal feature and `GameController.cs`:

1. **Stop MinimapPanel from ever appearing.** Today, `GameController.OnDrivingStarted()` starts `IEShowMap()`, which waits the scene's actual 10-second Inspector value, hides `GamePanel`, and shows `MinimapPanel` with a looping text pulse. This must no longer happen.
2. **Hide gameplay HUD at startup until a mission is entered.** Confirmed interpretation (your reply): hide only `Canvas/GamePanel` (the HUD — joystick, buttons, tutorials, motorbike UI) while the journal is shown; keep the 3D world, player and camera visible/active. The journal itself already lives as a sibling of `GamePanel` under `Canvas`, so hiding `GamePanel` does not hide the journal — no change needed there.
3. **Hand pulse feedback.** `JournalHandSequencer`'s hand should `DOScale` (a brief pulse) each time it arrives at a GO target, then return to its base scale, instead of staying at a fixed `(1,1,1)` the whole time.

## Verified current behavior (read-only, this pass)

- `_minimapPanel`/`_textMinimap`/`_timeToShowMap`/`_mapCountdownStarted`/`_gamePanel` are only read inside `GameController.OnDrivingStarted()`/`IEShowMap()` — no other method or class touches them. Safe to remove without side effects elsewhere.
- `MissionsJournalController.Show()` (called once from `Start()`, and again on HUD-icon reopen while not riding) already disables `PlayerAction`/`PlayerController`, freezes the player `Rigidbody`, and deactivates `_startTutorial`/`_moveTutorial` — it does **not** touch `GamePanel` today.
- `MissionsJournalController.OnGoPressed()` already reverses all of that for the motorbike mission (GO3) only; GO1/GO2 just stop the hand and leave the journal open (unchanged, out of scope here).
- `JournalHandSequencer.Begin()` builds one repeating DOTween `Sequence`: snap to target 0, then `(hold → move)` per target, looping forever; `localScale` is never touched.
- `GamePanel` is `activeSelf = true` in the saved scene. `MissionsJournalController.Start()`/`Show()` runs before the first rendered frame, so turning `GamePanel` off there produces no startup flash (same mechanism already used for `_startTutorial`/`_moveTutorial`).

## Recommended design (defaults — see plan.md for the exact edit)

- **Minimap:** delete the mechanism entirely from `GameController.cs` (fields, coroutine, the `StartCoroutine` call, the now-unused `DG.Tweening` import) rather than adding a feature flag to gate dead code. `MinimapPanel`'s scene GameObject is left in place, inactive, simply unreferenced — reversible, no asset/hierarchy deletion.
- **HUD visibility:** add a `_gamePanel` reference to `MissionsJournalController` (pointing at the same `Canvas/GamePanel` object `GameController` already references privately — two independent Inspector bindings to the same object, not a conflict). `Show()` deactivates it; the GO3/motorbike branch of `OnGoPressed()` reactivates it alongside the existing tutorial reactivation.
- **Hand pulse:** extend `JournalHandSequencer`'s existing sequence with a short scale-up/scale-down pulse at each arrival (including the very first target), sized to fit inside the existing 0.8s hold window, with an explicit scale reset on `Stop()`/`OnDisable()` so an interrupted pulse never leaves the hand enlarged or compounds on restart.

## Open decisions (defaults proposed, your confirmation needed)

1. **MinimapPanel scene object** — leave it inactive/orphaned in the scene (recommended, reversible, zero hierarchy risk) vs. delete the `MinimapPanel` GameObject and its `Text` child outright (marginally cleaner hierarchy, destructive/harder to undo, negligible build-size benefit). Default: **keep, orphaned**.
2. **Reopen visibility policy** — when the journal is reopened later via the existing "Mission Button" HUD icon (only offered while not riding), should `GamePanel` hide again exactly like at startup (same code path, same policy every `Show()`), or should the HUD stay visible on reopen since the player already knows the controls by then? Default: **same policy every `Show()`** (one code path, simplest to verify, no special-casing for "first time only").
3. **Hand pulse factor/timing** — default proposed: scale to **1.2x over 0.12s, back to 1.0x over 0.12s** (0.24s total, fits inside the 0.8s hold with room to spare), a single pulse-and-settle per arrival. Alternative: a continuous yoyo pulse for the whole hold duration (punchier, closer to `WinPanel`'s existing button-pulse style) at the cost of slightly more tween-lifecycle code to manage cleanly on interruption. Default: **single pulse-and-settle**, matching the literal request ("DOScale when it reaches... each GO target") rather than a continuous idle animation.

## Out of scope (not re-litigated)

GO1/GO2 behavior (still deferred/no-op per the already-approved Missions Journal spec), `GameManager`'s end timer, any new class/interface/package/shader/visual asset, `CameraController.cs`, cross-project source reuse (none requested here).
