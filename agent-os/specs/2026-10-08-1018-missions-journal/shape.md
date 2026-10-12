# Missions Journal — Shape

Status: APPROVED (user replied "APPROVAL" to plan.md, which supersedes the options listed below with Option A everywhere)
Source: research.md + references.md (Gate A confirmed by user). This shape does not re-open Gate A.

## Goal

At `Gameplay.unity` start, show a Missions Journal panel that visually matches the source `MissionsPanel`/`MissionItemUI` (adapted, not imported) with exactly three fixed rows, in this order, all "In progress" with an enabled GO:

1. Drive Car Distance
2. Fire Paintballs
3. Drive Motor Bike Distance

A hand hint visits the three GO buttons in order at startup (guidance only, never auto-selects). Tapping a row's GO selects that mission. Only mission 3 (Drive Motor Bike Distance) has a confirmed destination: it hands off into the existing motorbike mount/tutorial flow in `Gameplay.unity`, unchanged. Missions 1 and 2 have no confirmed destination yet — see "Blocking open decision" below.

## Confirmed constraints (from Gate A)

- No real ads/tracking/analytics. No mission progression, completion, claim, reward, persistence, or Luna CTA/tracking is ported.
- `Assets/_Playable_/Scripts/Controller/CameraController.cs` must not be edited.
- Mission 3 enters the existing target motorbike gameplay; its existing tutorial (`GameController`'s start/move/driving tutorial flow, `PlayerAction.TryMountFromTutorial`) must run exactly as it does today — no bypass, auto-mount, or teleport.
- GO is the confirmed selection action (not a passive preview).

## What already exists in the target scene (verified by reading, not assumed)

- `Gameplay.unity` has a single root `Canvas` (`ScaleWithScreenSize`, 1920x1080) containing `GamePanel` → `UIPlayer` → an existing HUD icon GameObject named **"Mission Button"** (Image only, no `Button` component, top-right anchored, currently inert — matches the source's pattern of an unwired GO/journal entry point).
- `GameController.cs` drives: brightness, minimap countdown, and a **raw global tutorial-press handler** in `Update()` that calls `PlayerAction.TryMountFromTutorial(screen)` for *any* mouse-down/touch-begin while `_startTutorial`/`_moveTutorial` are `activeInHierarchy` — this check does **not** go through the UI EventSystem, so a full-screen journal panel alone would not stop it from reaching the bike.
- `PlayerAction.TryMountFromTutorial` → `TryTapBike(..., tutorialPress: true)` explicitly **skips** its own `IsOverControls` (UI-occlusion) check when called from the tutorial path. This is the exact fall-through risk research flagged ("GO also mounting a vehicle behind it").
- `PlayerController`'s move joystick (`UltimateJoystick`) and jump button are read every `Update()`/`FixedUpdate()` regardless of any UI drawn on top.
- No `LunaController`/Service Locator exists in the project. `GameManager.cs` calls `Luna.Unity.LifeCycle.GameEnded()` / `InstallFullGame()` directly and starts a 30s `CountdownEndGame()` in `Start()`, independent of any UI. Out of scope for this spec; not touched.
- No separate "car driving" or "paintball" gameplay exists anywhere in `Assets/_Playable_`. Only one playable vehicle mode exists (motorbike + on-foot `PlayerController`).

## Recommended integration approach (no edits to GameController.cs / PlayerAction.cs / PlayerController.cs / CameraController.cs)

Instead of modifying existing gameplay scripts (higher approval risk, more re-test surface), a new `MissionsJournalController` holds **direct serialized references** to the already-existing `PlayerAction` and `PlayerController` components on `Player`, and to the same `_startTutorial`/`_moveTutorial` GameObjects `GameController` already uses, and:

- On show: `playerAction.enabled = false; playerController.enabled = false;` and deactivates `_startTutorial`/`_moveTutorial` GameObjects (so `GameController.Update()`'s tutorial-press branch is skipped entirely — no world tap can reach the bike, no joystick/jump input runs).
- On mission-3 GO: re-activates `_startTutorial`/`_moveTutorial`, re-enables both components, hides the journal. The existing tutorial then runs exactly as it does today, untouched.

This was chosen over disabling `GameController` itself because `GameController.OnDisable()` resets the global `_PlayableBrightnessOverride` shader value — disabling it would visibly wash out the scene while the journal is open. Toggling only `PlayerAction`/`PlayerController`/the tutorial GameObjects has no such side effect (verified by reading both components' `OnDisable`).

## Blocking open decision — missions 1 and 2

There is no "Drive Car Distance" or "Fire Paintballs" gameplay anywhere in the target project. Options (pick one before plan.md can be approved for implementation):

**A. Defer (recommended).** Rows 1–2 render as "In progress" with a visually enabled GO, but GO is a no-op (or shows a short "coming soon" micro-feedback) until their target gameplay is specified in a future spec. Mission 3 is the only functional selection in this phase.
**B. Disable.** Rows 1–2 render with GO visually disabled/dimmed (can't be tapped), signalling "not yet available" instead of implying a working action.
**C. Scope cut.** Ship only mission 3 now; omit rows 1–2 from this spec entirely (contradicts the confirmed "exactly three rows" requirement, so not recommended unless the user wants to revise that requirement).

Trade-off: A preserves the exact requested visual (3x "In progress" + GO) but a tap on 1/2 does nothing, which can read as broken. B is honest about readiness but deviates from "all display In progress and GO" (GO would look disabled, not enabled). This plan proceeds on **A** pending your confirmation; say so explicitly if you want B or C instead.

## Other open decisions (non-blocking, defaults proposed in plan.md)

1. **Hand hint pass count** — one pass through the 3 GO buttons, or repeating until a selection is made. Default: repeats every few seconds until GO is pressed (keeps guidance visible if the player hesitates), stops immediately on any GO press.
2. **Progress bar / reward icon visuals** — reference image shows a fill bar and coin icon. Default: **omit** them (only Name + "In progress" label + GO) to avoid inventing fake progress/reward numbers and to keep the new-asset import list smaller for the 4.5 MB budget. Alternative: include static/placeholder fill + reward icon for closer visual fidelity, at the cost of importing `SlideBack`/`SlideFill`/`Icon_Gold` and specifying placeholder numbers nobody has confirmed.
3. **Reopen via the existing "Mission Button" HUD icon** — that icon already exists, unwired, in the HUD. Default: wire it to reopen the journal after the first close (matches source behavior of a reopenable panel) only while the player is not already riding the motorbike (uses `PlayerController.IsRiding`, read-only, no edit). Alternative: leave it unwired (startup-only journal, no reopen) — simpler, smaller, but leaves a dead HUD icon.
4. **End-timer interaction** — `GameManager`'s 30s `CountdownEndGame` keeps running while the journal is open. Default: leave it untouched (zero risk, zero edits). Alternative: pause/extend it while the journal is shown, which requires adding pause/resume to `GameManager.cs` (a new edit, separate approval).
5. **Exact wording/values on rows 1–2** ("Drive Car Distance", "Fire Paintballs" requirement/reward numbers) — research found no target-side values for these two. Default: name-only display, no progress numbers, since option A above makes their GO inert anyway.

## Out of scope (confirmed exclusions, not re-litigated)

Mission progression/completion/claim/reward, persistence, Luna tracking/CTA, HAVIGAME `CollectionView`/`UIFrame`, `MissionManager`/database/SaveData, `FeatureTracking`, ad prefabs, home navigation, `UICharacterCameraController`, editing `CameraController.cs`.
