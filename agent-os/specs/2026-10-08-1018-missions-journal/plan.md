# Missions Journal — Implementation Plan

**Status: APPROVED — user approved this plan as written (including all Option-A defaults in section 5). Ready for Codex implementation per `agent-os/standards/ai-agent/roles-and-handoff.md`.**

This plan implements `shape.md` option **A** (defer missions 1/2) and the defaults listed there (repeating hand hint, no progress bar/reward icon, "Mission Button" HUD icon wired for reopen, end-timer untouched, name-only rows 1–2). Any change to those defaults changes file/asset list below and requires re-approval before implementation.

## 1. Objective and scope

**Desired outcome:** `Gameplay.unity` opens with a Missions Journal panel (3 fixed rows: Drive Car Distance / Fire Paintballs / Drive Motor Bike Distance, all "In progress" + GO). A hand hint cycles GO→GO→GO. Tapping mission 3's GO closes the journal and hands off into the existing, unmodified motorbike mount/tutorial flow. Tapping mission 1/2's GO is a no-op (deferred). The existing "Mission Button" HUD icon reopens the journal later, except while the player is riding.

**In scope:** New UI panel + 3 new C# scripts + scene wiring in `Gameplay.unity` + new visual assets copied/adapted from the confirmed source list in `references.md`.
**Out of scope:** Everything listed under "Out of scope" in `shape.md`; any edit to `GameController.cs`, `PlayerAction.cs`, `PlayerController.cs`, `CameraController.cs`, `MotorbikeController.cs`, `GameManager.cs`.
**Assumptions requiring your confirmation:** the 5 "Other open decisions" and the "Blocking open decision" in `shape.md`.

## 2. File and asset change list

### New files

| Path | Purpose |
|---|---|
| `Assets/_Playable_/Scripts/UI/MissionsJournal/MissionsJournalController.cs` | Orchestrates show/hide, input-lock, hand sequencing, GO routing, handoff to mission 3. |
| `Assets/_Playable_/Scripts/UI/MissionsJournal/MissionRowView.cs` | Binds one fixed row (name + "In progress" label + GO button); raises `GoPressed`. |
| `Assets/_Playable_/Scripts/UI/MissionsJournal/JournalHandSequencer.cs` | Moves a hand image between N target RectTransforms in order, repeating; stop-on-demand. |

No existing `.cs` file is modified.

### Scene changes — `Assets/_Playable_/Scenes/Gameplay.unity`

- Add `MissionsJournalPanel` (new `RectTransform`) as a child of the existing root `Canvas` (fileID `1156745256`), sibling to `GamePanel`, so it draws above all gameplay HUD without touching `GamePanel`'s hierarchy.
  - Child `Frame` (Image, adapted `popup_frame`/`mission_fr`/`tag_title` sprites) — visual shell only.
  - Child `Rows` with 3 `MissionRowView` instances (Name `TMP_Text`, "In progress" `TMP_Text`, GO `Button` + `Image`) — adapted from `MissionItemUI.prefab` visuals (`Btn_Blue`/`btn_buy_2` sprite, FredokaOne font/material), fixed data, no `Mission` asset binding.
  - Child `Hand` (Image, new or adapted small hand/pointer sprite) with `JournalHandSequencer`.
- Add `MissionsJournalController` component on `MissionsJournalPanel`, with serialized references (assigned in Inspector, no runtime `Find`):
  - `_rows` (3x `MissionRowView`, in fixed order).
  - `_handSequencer` (`JournalHandSequencer`).
  - `_playerAction` → existing `PlayerAction` component on `Player`.
  - `_playerController` → existing `PlayerController` component on `Player`.
  - `_startTutorial`, `_moveTutorial` → the same two GameObjects already referenced privately by `GameController` (`Panel`/`First Ride Tutorial`-family objects; exact objects confirmed against `GameController`'s Inspector values during implementation, not guessed).
- Add a `Button` component to the existing **"Mission Button"** HUD icon (GameObject fileID `5719810765228622297`, under `UIPlayer`) and wire its `onClick` to `MissionsJournalController.Show()`. No other change to that object.

### Asset additions (copied/adapted per `references.md`, Built-in Unlit / TMP only)

`popup_frame.png`, `mission_fr.png`, `tag_title.png`, `Btn_Blue.png`, `btn_buy_2.png` (if a second visual state is needed — otherwise drop), `FredokaOne-Regular SDF.asset` + the Orange/Green material variants already resolved in `references.md`. **Not imported** under default option (3) in `shape.md`: `SlideBack`/`SlideFill`/`Icon_ImageIcon_Glod01`/`square.psd` (progress bar + reward icon) — add only if you choose the fidelity alternative instead.

No project settings, packages, or build configuration changes.

## 3. Class design

### `MissionsJournalController` (MonoBehaviour) — `Assets/_Playable_/Scripts/UI/MissionsJournal/MissionsJournalController.cs`

- **Single responsibility:** show/hide the journal panel, gate background input while shown, drive the hand hint, route GO presses, hand off mission 3 to the existing gameplay/tutorial.
- **Serialized fields:** `_rows` (`MissionRowView[3]`), `_handSequencer` (`JournalHandSequencer`), `_playerAction` (`PlayerAction`), `_playerController` (`PlayerController`), `_startTutorial`/`_moveTutorial` (`GameObject`), `_missionButton` (`Button`, the HUD icon, optional per decision 3).
- **Public API:** `void Show()`, `void Hide()`.
- **Lifecycle:** `Awake()` subscribes each row's `GoPressed` event; `Start()` calls `Show()` (journal is the first thing shown at scene start); `OnDestroy()` unsubscribes.
- **Events consumed:** `MissionRowView.GoPressed(MissionRowView row)` from each of the 3 rows.
- **Events published:** none (leaf coordinator; no other system needs to react).
- **Behavior:**
  - `Show()`: `gameObject.SetActive(true)`; `_playerAction.enabled = false`; `_playerController.enabled = false`; `_startTutorial.SetActive(false)`; `_moveTutorial.SetActive(false)`; `_handSequencer.Begin(rows' GO RectTransforms)`.
  - On row `GoPressed`: `_handSequencer.Stop()`. If the row is mission 3 (Drive Motor Bike Distance): `Hide()` then re-enable `_playerAction`/`_playerController`, reactivate `_startTutorial`/`_moveTutorial` (hands off to the existing, unmodified tutorial/mount flow exactly as it runs today). If row is mission 1/2: no-op per `shape.md` option A (placeholder for a short, non-blocking visual acknowledgement only — no gameplay change).
  - `Hide()`: `gameObject.SetActive(false)`.
- **Called by:** nothing external except the HUD "Mission Button" `onClick` (reopen, decision 3) and its own `Start()`.
- **Calls:** `MissionRowView` (read-only `GoRect`), `JournalHandSequencer.Begin/Stop`, `PlayerAction`/`PlayerController` (`.enabled`), tutorial `GameObject.SetActive`.
- **Pattern:** none beyond composition — a single coordinating `MonoBehaviour` with explicit serialized dependencies. No interface: one implementation, no second expected, no test-isolation need identified. Rejected pattern: a generic "modal stack" system — no second modal exists in this project; would be speculative.

### `MissionRowView` (MonoBehaviour) — `Assets/_Playable_/Scripts/UI/MissionsJournal/MissionRowView.cs`

- **Single responsibility:** render one fixed row and expose its GO button as both a click source and a hand-hint target.
- **Serialized fields:** `_nameLabel` (`TMP_Text`), `_statusLabel` (`TMP_Text`, fixed to the localized "In progress" string), `_goButton` (`Button`), `[SerializeField] string _missionId` (e.g. `"drive_car_distance"` / `"fire_paintball"` / `"drive_motorbike_distance"` — plain data, not the source `Mission` asset).
- **Public API:** `event Action<MissionRowView> GoPressed`; `RectTransform GoRect => (RectTransform)_goButton.transform`; `bool IsMotorbikeMission => _missionId == "drive_motorbike_distance"`.
- **Lifecycle:** `Awake()` sets `_statusLabel.text` and subscribes `_goButton.onClick`; `OnDestroy()` unsubscribes.
- **Why a class instead of 3 copy-pasted inline bindings:** the hand sequencer and the controller both need a stable `GoRect`/`GoPressed` contract per row; one small view class avoids duplicating that wiring 3 times. This is the SRP split called for by `architecture-and-patterns.md` (presentation vs. coordination), not a speculative abstraction — there are exactly 3 fixed instances, no factory or data-driven list.

### `JournalHandSequencer` (MonoBehaviour) — `Assets/_Playable_/Scripts/UI/MissionsJournal/JournalHandSequencer.cs`

- **Single responsibility:** move its own `RectTransform` between a sequence of target `RectTransform`s, pausing briefly at each, looping until told to stop. Pure view/tween code; no gameplay knowledge.
- **Serialized fields:** `_moveDuration`, `_holdDuration` (seconds, small positive defaults).
- **Public API:** `void Begin(RectTransform[] targets)`, `void Stop()`.
- **Lifecycle:** `OnDisable()` kills any running tween (`DG.Tweening`, already a project dependency via `GameController`/`WinPanel` — no new package).
- **Why not reuse `SwipeHandHint`:** that script only oscillates around one fixed origin (confirmed by reading it in research); it has no concept of sequencing between N different targets. Reusing it would require changing its contract, which research explicitly flagged as not fitting. A new, small, single-purpose script is simpler than generalizing `SwipeHandHint` for one caller.
- **Pattern:** none. Direct `DOTween` sequence of `DOMove`/`DOLocalMove` calls driven by a plain loop — no state machine needed for 3 fixed stops.

## 4. Structure and data flow

```text
Assets/_Playable_/Scripts/UI/MissionsJournal/
  MissionsJournalController.cs
  MissionRowView.cs
  JournalHandSequencer.cs
```

```text
Scene start
   └─ MissionsJournalController.Start() → Show()
         ├─ disables PlayerAction, PlayerController (existing components, untouched source)
         ├─ deactivates _startTutorial / _moveTutorial (GameController.Update's tutorial-press
         │  branch becomes inert while these are inactive — no code in GameController.cs changes)
         └─ JournalHandSequencer.Begin([row1.GoRect, row2.GoRect, row3.GoRect]) (repeats)

Player taps a GO button (MissionRowView.GoPressed)
   └─ MissionsJournalController
         ├─ JournalHandSequencer.Stop()
         ├─ if row == mission 3 (motorbike):
         │     Hide() → re-enable PlayerAction/PlayerController → reactivate
         │     _startTutorial/_moveTutorial → existing GameController/PlayerAction/
         │     CameraController flow resumes exactly as today (untouched)
         └─ else (mission 1/2): no-op (deferred, shape.md option A)

HUD "Mission Button" (existing icon, new Button component) .onClick
   └─ MissionsJournalController.Show()  (reopen path, decision 3 — only while not riding)
```

Input flow: Legacy `Input`/EventSystem only (existing project convention); no new input code. While the journal is shown, the only reachable interactive elements are its own `Button`s — gameplay input is cut at the source (`PlayerAction`/`PlayerController` disabled, tutorial GameObjects inactive), not by relying on raycast occlusion alone.

## 5. Alternatives and recommendation

| Decision | Option A (recommended) | Option B |
|---|---|---|
| Missions 1/2 GO | No-op, rows shown as requested | GO visually disabled/dimmed |
| Progress bar/reward icon | Omit (smaller budget, no invented numbers) | Include placeholder fill + coin icon (closer to reference image, +4 assets) |
| Reopen via HUD icon | Wire existing "Mission Button" to reopen | Leave it unwired, startup-only journal |
| End-game timer | Leave `GameManager`'s 30s countdown untouched | Add pause/resume to `GameManager.cs` (new edit, new approval) |
| Background input block | Disable `PlayerAction`/`PlayerController` + deactivate tutorial objects (no source-script edits) | Add a small `InputLocked` guard inside `GameController.cs`/`PlayerAction.cs` (edits protected-adjacent gameplay scripts for no extra benefit) |

Recommendation is Option A column throughout: lowest file-change footprint, zero edits to existing gameplay scripts, smallest new-asset budget impact, and it matches the literal confirmed requirement ("all display In progress and GO") without inventing unconfirmed numbers.

## 6. Verification plan

**Acceptance criteria (traced to the confirmed scenario):**
- Exactly 3 rows, correct names/order, all "In progress", GO visible and tappable on all 3.
- Hand hint visits GO 1 → GO 2 → GO 3 → repeats, with no automatic selection.
- Tapping mission 3's GO closes the journal and the motorbike mount/tutorial proceeds exactly as it does today with the journal removed (manual before/after comparison).
- Tapping mission 1/2's GO does not mount the motorbike, does not move the player, and does not crash.
- While the journal is shown: no amount of mouse/touch input anywhere on screen mounts the motorbike or moves the player (regression check for the fall-through risk this plan specifically addresses).
- Reopening via "Mission Button" works post-close and is not offered while riding (decision 3).

**Editor checks:**
- Unity compiles with no new errors; Console clean after entering/exiting Play mode.
- No missing serialized references on `MissionsJournalController`/`MissionRowView`/`JournalHandSequencer` or on the new "Mission Button" `Button`.
- Confirm `_startTutorial`/`_moveTutorial` assigned on the new controller are the exact same GameObjects `GameController`'s private fields point to (verify via Inspector, not by inference) before wiring — if they differ in any way from what research assumed, stop and report per `approval-gates-and-change-control.md` rather than guessing.

**Manual/PlayMode checks:**
- Rapid repeated taps on GO (mission 3) do not double-fire the handoff.
- Tap-and-drag starting on a GO button does not fall through to `PlayerAction`.
- Device/touch simulation in addition to mouse (Legacy Input compatibility, per `runtime-compatibility.md`).

**Luna/build checks:**
- All materials used are Built-in Unlit/TMP (no custom shader) — scan new materials against the allowlist in `materials-built-in-unlit.md`.
- Measure `Gameplay` scene/build size after adding the new assets; confirm it stays within the 3.8 MB green target from `scene-budget-4_5mb.md` (record actual measured bytes, not an estimate).
- No `UnityEngine.InputSystem` introduced; `EventSystem`/`StandaloneInputModule` unchanged.
- Confirm no Luna-prohibited runtime lookup APIs added (`FindObjectOfType`, `GameObject.Find`, tag lookup) — this plan uses none.

**Rollback boundary:** all changes are additive (new scripts + new scene objects + a new `Button` on one existing object). Rollback = delete the new `MissionsJournalPanel` hierarchy, remove the `Button` component from "Mission Button", delete the 3 new scripts and the newly imported assets.

## Task order (for implementation, after approval)

1. Import/adapt the approved visual assets only (per section 5 decision).
2. Create `MissionRowView.cs`, wire 3 row prefabs/instances with fixed data.
3. Create `JournalHandSequencer.cs`, verify it cycles 3 placeholder targets in isolation.
4. Create `MissionsJournalController.cs`; wire serialized references in `Gameplay.unity`; verify `_startTutorial`/`_moveTutorial` identity against `GameController`'s actual Inspector values before assigning.
5. Add `Button` to "Mission Button" HUD icon; wire reopen.
6. Run full verification plan (section 6); produce `implementation-report.md` with evidence per `verification.md`/`luna-verification.md`.

**Đã phê duyệt.** Người dùng đã trả lời "APPROVAL" cho thiết kế và danh sách thay đổi trên, bao gồm các quyết định mặc định "Option A" ở mục 5 và cách xử lý mission 1/2 ở `shape.md` (không chọn phương án B/C nào khác). Codex có thể triển khai theo "Task order" ở trên; nếu thực tế codebase khác với giả định trong plan này (ví dụ `_startTutorial`/`_moveTutorial` không đúng như mô tả), phải dừng và xin duyệt lại theo `approval-gates-and-change-control.md`, không tự suy đoán.
