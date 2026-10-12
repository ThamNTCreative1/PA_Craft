# Journal Gameplay Visibility & Hand Pulse — Implementation Plan

**Status: APPROVED — user replied "APPROVAL all" to this plan as written, including every default in section 5. Ready for Codex implementation per `agent-os/standards/ai-agent/roles-and-handoff.md`.**

Implements `shape.md` with all three defaults (minimap deleted outright, same hide/reveal policy on every `Show()`, single pulse-and-settle at 1.2x/0.12s+0.12s). Any change to these defaults changes the diff below and requires re-approval.

## 1. Objective and scope

**Desired outcome:** (1) `MinimapPanel` never appears again; (2) `Canvas/GamePanel` (HUD) is hidden whenever the journal is shown (startup and reopen) and revealed only when the motorbike mission (GO3) is entered; (3) the journal hand pulses via `DOScale` on arrival at each GO target.

**In scope:** `GameController.cs`, `MissionsJournalController.cs`, `JournalHandSequencer.cs`, one new Inspector reference in `Gameplay.unity`.
**Out of scope:** `MissionRowView.cs`, `PlayerAction.cs`, `PlayerController.cs`, `CameraController.cs`, `MotorbikeController.cs`, `GameManager.cs`, GO1/GO2 behavior, any new asset/package/shader.
**Assumptions requiring your confirmation:** the 3 numbered items in `shape.md`'s "Open decisions".

## 2. File and asset change list

### Modified files

| Path | Change |
|---|---|
| `Assets/_Playable_/Scripts/GameController.cs` | Remove `_timeToShowMap`, `_minimapPanel`, `_textMinimap`, `_mapCountdownStarted`, `_gamePanel` fields; remove `IEShowMap()`; remove the countdown-start block and `StartCoroutine(IEShowMap())` call in `OnDrivingStarted()`; remove the `_minimapPanel.SetActive(false)` line in `Start()`; remove the now-unused `using DG.Tweening;` import. |
| `Assets/_Playable_/Scripts/UI/MissionsJournal/MissionsJournalController.cs` | Add `[SerializeField] private GameObject _gamePanel;` (with null-check in `Awake()` alongside the existing required-reference checks); deactivate it in `Show()`; reactivate it in `OnGoPressed()`'s motorbike branch. |
| `Assets/_Playable_/Scripts/UI/MissionsJournal/JournalHandSequencer.cs` | Add `[SerializeField, Min(0f)] private float _pulseScale = 1.2f;` and `[SerializeField, Min(0.01f)] private float _pulseDuration = 0.12f;`; insert a scale-up/scale-down pair into the sequence at every arrival (target 0 through N-1, including the initial snap); reset `transform.localScale = Vector3.one` in `KillSequence()`. |

### Scene changes — `Gameplay.unity`

- Assign `MissionsJournalController._gamePanel` → the existing `Canvas/GamePanel` object (fileID `2754030885986225168`, the same object `GameController`'s private `_gamePanel` field already pointed to before this edit — two independent Inspector references to one object, no duplication).
- No new GameObjects. `Canvas (1)/MinimapPanel` is left in place, inactive, now unreferenced by any script (per `shape.md` open decision 1 default: keep, don't delete).
- After the `GameController.cs` edit, Unity will show "data loss" for the removed serialized fields (`_timeToShowMap`, `_minimapPanel`, `_textMinimap`) on that component the first time the scene is opened/saved — expected and harmless; confirm no other GameObject's Inspector shows a warning from this.

No new assets, packages, shaders, or project settings changes.

## 3. Class design (changes only)

### `GameController` (existing MonoBehaviour)

- **Removed responsibility:** "switch HUD to minimap after a delay." Nothing replaces it — the delayed-minimap behavior is deleted, not relocated.
- `OnDrivingStarted()` becomes exactly:
  ```csharp
  private void OnDrivingStarted()
  {
      SetRiding(true);
  }
  ```
- No change to `SetRiding`, `Update`, `HandleStartTutorialPress`, `DismissStartTutorial`, brightness handling, or any other method.
- Pattern: none — pure deletion of a now-unwanted feature, no replacement abstraction.

### `MissionsJournalController` (existing MonoBehaviour)

- **Added responsibility (extends existing one):** own HUD visibility for the duration the journal is shown, in addition to its existing input/Rigidbody lock and tutorial-object visibility ownership. This is the same "owns journal-and-handoff visibility" responsibility it already has — `GamePanel` is one more object in that same set, not a new concern requiring a new class.
- `Show()` gains one line: `_gamePanel.SetActive(false);` (placed alongside the existing `_startTutorial.SetActive(false); _moveTutorial.SetActive(false);`).
- `OnGoPressed()`'s motorbike branch gains one line: `_gamePanel.SetActive(true);` (placed alongside the existing `_startTutorial.SetActive(true); _moveTutorial.SetActive(true);`, after `Hide()`).
- `Awake()`'s existing required-reference guard gains `_gamePanel == null` to the `||` chain, consistent with how every other required reference is already validated there.
- No change to the GO1/GO2 no-op branch, `Hide()`'s Rigidbody-constraint restore, or event wiring.
- Pattern: none — same composition-only design as already approved for this class; `GamePanel` is simply one more explicit `[SerializeField]` dependency.

### `JournalHandSequencer` (existing MonoBehaviour)

- **Added responsibility (extends existing one):** play a brief arrival pulse on the same `RectTransform` it already moves, in addition to its existing move/hold/loop responsibility.
- `Begin()`'s loop changes from `AppendInterval(hold) → DOMove(...)` per target to, per target `i`:
  ```csharp
  _sequence.Append(transform.DOScale(_pulseScale, _pulseDuration).SetEase(Ease.OutQuad));
  _sequence.Append(transform.DOScale(Vector3.one, _pulseDuration).SetEase(Ease.InQuad));
  float remainingHold = Mathf.Max(0f, _holdDuration - 2f * _pulseDuration);
  if (remainingHold > 0f) _sequence.AppendInterval(remainingHold);
  _sequence.Append(transform.DOMove(targets[(i + 1) % targets.Length].position, _moveDuration).SetEase(Ease.InOutSine));
  ```
  and `transform.localScale = Vector3.one;` is set alongside the existing `transform.position = targets[0].position;` snap before the sequence starts, so the very first arrival also pulses from a known base scale.
- `KillSequence()` gains `transform.localScale = Vector3.one;` after `_sequence.Kill()`, so `Stop()` (called on any GO press) and `OnDisable()` can never leave the hand mid-pulse or compound scale across a restart.
- No change to `Stop()`'s `gameObject.SetActive(false)` call or the public `Begin(RectTransform[])`/`Stop()` signatures.
- Pattern: none — extends the existing single `DOTween.Sequence()`; no new state machine needed for a fixed append-only timeline.

## 4. Structure and data flow

No new files, no new classes. Data/event flow is unchanged from the already-approved Missions Journal spec, with two additions:

```text
MissionsJournalController.Show()           (Start(), or HUD icon reopen while !IsRiding)
   ├─ existing: disable PlayerAction/PlayerController, freeze Rigidbody,
   │             deactivate _startTutorial/_moveTutorial
   └─ NEW:      deactivate _gamePanel   (HUD hidden; 3D world/player/camera untouched)

MissionsJournalController.OnGoPressed(row)  (any GO press)
   ├─ _handSequencer.Stop()  →  JournalHandSequencer.KillSequence() resets localScale to 1
   └─ if row.IsMotorbikeMission:
         Hide() → restore Rigidbody constraints
         re-enable PlayerAction/PlayerController
         reactivate _startTutorial/_moveTutorial
         NEW: reactivate _gamePanel   (HUD now visible for real gameplay)

GameController.OnDrivingStarted()           (PlayerAction.CarEntered event)
   └─ SetRiding(true)   — minimap branch deleted, nothing else changes

JournalHandSequencer.Begin(targets)
   └─ per target: pulse (scale 1 → 1.2 → 1), hold remainder, move to next — repeats forever until Stop()
```

No new input path, no new Luna call, no new runtime lookup.

## 5. Alternatives and recommendation

| Decision | Recommended (implemented by this plan) | Alternative |
|---|---|---|
| MinimapPanel scene object | Keep, inactive, orphaned | Delete `MinimapPanel` + `Text` child from `Gameplay.unity` |
| Reopen visibility policy | Same hide/reveal policy every `Show()` | Only hide `GamePanel` at first startup; leave HUD visible on later reopen |
| Hand pulse style | Single pulse-and-settle, 1.2x over 0.12s+0.12s | Continuous yoyo pulse for the full hold (needs extra kill/reset handling, closer to `WinPanel`'s button-pulse style) |
| Minimap removal method | Delete fields/coroutine outright | Keep fields/coroutine, gate with a new `_minimapEnabled = false` flag (leaves effectively-dead code; not recommended) |

Recommendation column is implemented below; say so explicitly before approval if you want any right-column alternative instead.

## 6. Verification plan

**Acceptance criteria:**
- Mount the motorbike and wait well past 10 seconds (and past repeat mount/dismount cycles): `MinimapPanel` never activates, `GamePanel` never force-hides via that old path.
- At scene start: HUD (`GamePanel` and everything under it — joystick, buttons, Mission Button icon) is not visible on the very first rendered frame; the 3D world, player model and camera are visible behind/around the journal.
- Pressing GO on mission 3: HUD reappears, existing tutorial resumes exactly as before this change (regression check against the already-approved Missions Journal behavior).
- Reopening the journal later via the HUD icon (while not riding) re-hides `GamePanel` per the chosen reopen policy; dismissing it again reveals it.
- Hand visibly pulses once on arrival at each of the 3 GO targets, including the very first one at startup; pulsing never leaves the hand scaled up after a GO press, `Stop()`, or component disable; restarting the sequence (reopen) does not compound scale.

**Editor checks:**
- Unity compiles with no new errors after the `GameController.cs` deletions; Console shows the one-time serialized-field data-loss notice and nothing else new.
- No missing/null reference errors on `MissionsJournalController` after adding `_gamePanel` (must be assigned before Play).
- Confirm no other script references the removed `GameController` fields/method (`_timeToShowMap`, `_minimapPanel`, `_textMinimap`, `_mapCountdownStarted`, `IEShowMap`) before deleting them.

**Manual/PlayMode checks:**
- Full mount → drive → dismount → remount cycle with the minimap path removed: no exception, no leftover coroutine.
- Repeated rapid GO presses and repeated journal reopen/close: hand sequence restarts cleanly each time, no orphaned tweens (check `DOTween`'s active tween count in the Editor if available, or visually confirm no runaway scale).
- Mouse and touch-simulated input both exercise the GO press → HUD reveal path (Legacy Input, per `runtime-compatibility.md`).

**Luna/build checks:**
- No new material/shader/package introduced; existing Built-in Unlit/TMP/DOTween usage only.
- Re-measure `Gameplay` scene/build size after the `GameController.cs` reduction (expected to shrink slightly, not grow); confirm still within the 3.8 MB green target per `scene-budget-4_5mb.md`.
- No new `FindObjectOfType`/`GameObject.Find`/tag lookup introduced.

**Rollback boundary:** all edits are to 2 existing scripts plus one new Inspector reference on an existing component; reverting is a straightforward diff revert with no asset deletion.

## Task order

1. Edit `GameController.cs` (remove minimap mechanism); verify it still compiles and `OnDrivingStarted`/`SetRiding` behavior is otherwise identical.
2. Edit `MissionsJournalController.cs` (add `_gamePanel`, hide/reveal calls); assign the Inspector reference in `Gameplay.unity`.
3. Edit `JournalHandSequencer.cs` (pulse + scale reset).
4. Run the full verification plan (section 6); produce/extend `implementation-report.md` with evidence per `verification.md`/`luna-verification.md`, explicitly noting this is a follow-up pass on the already-implemented Missions Journal feature.

**Đã phê duyệt.** Người dùng đã trả lời "APPROVAL all" cho thiết kế và danh sách thay đổi trên, bao gồm toàn bộ mặc định ở mục 5 (xoá hẳn minimap, cùng một policy ẩn/hiện HUD cho mọi lần Show(), pulse đơn 1.2x/0.12s+0.12s). Codex có thể triển khai theo "Task order" ở trên; nếu codebase thực tế khác giả định trong plan (ví dụ field names/paths đã đổi), phải dừng và xin duyệt lại theo `approval-gates-and-change-control.md`.
