# Tutorial Pointer Effect Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Move the tutorial "guiding hand" animation out of `MapController` into a reusable `TutorialPointer` component that also pulses an `efx` child in sync, and make the tutorial blur/dim overlay toggle per spawn point instead of the old scale-pulse-only hand.

**Architecture:** `TutorialPointer` (new MonoBehaviour, lives on the `pointer` GameObject: `pointer > hand > efx`) owns a single DOTween `Sequence` that moves+pulses `hand` and, in parallel, scales `efx` 0→1 across the exact same duration as the hand's move+pulse sub-sequence, restarting together via `SetLoops(-1, Restart)`. `MapController` positions the `pointer` root at each spawn point and calls `Show()`/`Stop()` on it instead of running its own `Tween`. A new parallel list `_tutorialBlurs` (index-matched to `_spawnPoints`) is shown for the current point and hidden the instant the player taps correctly.

**Tech Stack:** Unity (C#), DOTween / DOTween Pro (already a project dependency, see `using DG.Tweening;` in `MapController.cs`), UGUI (`RectTransform`, `Canvas`).

## Global Constraints

- No automated test suite exists in this Unity project — verification is via Unity Editor "no console errors" compile check plus manual Play Mode steps described in each task (per spec's Testing section).
- Keep existing code style: 4-space indent, `_camelCase` private fields, `[SerializeField]` + `[Tooltip]` on inspector fields, `#region` blocks as already used in `MapController.cs`.
- Do not change the existing `_spawnPoints` (`List<RectTransform>`) structure — add a parallel list instead, so already-configured scene data isn't invalidated.
- `TutorialPointer.Show()` / `Stop()` / `IsPlaying` signatures must stay as originally provided by the user — only internals may change.
- Design source of truth: `docs/superpowers/specs/2026-08-07-tutorial-pointer-effect-design.md`.

---

### Task 1: Create `TutorialPointer.cs`

**Files:**
- Create: `Assets/_Playable_/Scripts/TutorialPointer.cs`

**Interfaces:**
- Consumes: nothing (leaf component).
- Produces (for Task 2/3 to consume):
  - `public class TutorialPointer : MonoBehaviour`
  - `public bool IsPlaying { get; }`
  - `public void Show()`
  - `public void Stop()`
  - Serialized fields `hand` (`RectTransform`) and `efx` (`RectTransform`) must be wired in the Unity Inspector on the `pointer` prefab/GameObject (`pointer > hand`, `hand > efx`) — this is a scene/prefab setup step outside source control that the user does manually after this task lands.

- [ ] **Step 1: Write `TutorialPointer.cs`**

```csharp
using DG.Tweening;
using UnityEngine;

namespace Playable
{
    /// <summary>
    /// Animation bàn tay hướng dẫn cho tutorial: hand di chuyển từ 1 offset về tâm rồi pulse
    /// scale+rotate liên tục, đồng thời efx (con của hand) scale 0→1 xuyên suốt 1 vòng lặp.
    /// Cả 2 nằm chung 1 Sequence nên khi loop Restart, efx tự đồng bộ lại với hand.
    /// </summary>
    public class TutorialPointer : MonoBehaviour
    {
        [SerializeField] private RectTransform hand;
        [SerializeField] private RectTransform efx;

        [Header("Hand Move")]
        [SerializeField] private Vector3 handStartOffset = new Vector3(25, -50, 0);
        [SerializeField] private float moveDuration = 0.7f;

        [Header("Hand Pulse")]
        [SerializeField] private float pulseScale = 0.85f;
        [SerializeField] private float pulseDuration = 0.4f;
        [SerializeField] private float pulseRotationZ = 7.5f;
        [SerializeField] private float delayBeforePulse = 0.5f;
        [SerializeField] private float holdAfterPulse = 1f;

        [Header("Efx")]
        [SerializeField] private float efxScaleFrom = 0f;
        [SerializeField] private float efxScaleTo = 1f;
        [SerializeField] private Ease efxEase = Ease.Linear;

        private Sequence animSequence;

        public bool IsPlaying => gameObject.activeSelf;

        public void Show()
        {
            gameObject.SetActive(true);

            animSequence?.Kill();
            animSequence = DOTween.Sequence();

            transform.localScale = Vector3.one;
            transform.localRotation = Quaternion.identity;
            hand.localPosition = handStartOffset;
            hand.localRotation = Quaternion.identity;
            hand.localScale = Vector3.one;

            Sequence handSequence = DOTween.Sequence();
            handSequence.Append(hand.DOLocalMove(Vector3.zero, moveDuration));
            handSequence.AppendInterval(delayBeforePulse).Append(hand.DOScale(pulseScale, pulseDuration));
            handSequence.Join(hand.DOLocalRotate(new Vector3(0, 0, pulseRotationZ), pulseDuration));
            handSequence.AppendInterval(holdAfterPulse);
            handSequence.Append(hand.DOScale(1f, pulseDuration));

            animSequence.Append(handSequence);

            if (efx != null)
            {
                efx.localScale = Vector3.one * efxScaleFrom;
                animSequence.Insert(
                    0,
                    efx.DOScale(efxScaleTo, handSequence.Duration())
                        .From(efxScaleFrom)
                        .SetEase(efxEase));
            }

            animSequence.SetLoops(-1, LoopType.Restart);
        }

        public void Stop()
        {
            animSequence?.Kill();
            animSequence = null;
            gameObject.SetActive(false);
        }
    }
}
```

- [ ] **Step 2: Verify it compiles**

Open Unity Editor (or run it in background if already open) and check the Console window shows zero compile errors for `TutorialPointer.cs`. If Unity isn't running, opening the project once is enough to trigger a compile pass.

- [ ] **Step 3: Commit**

```bash
git add Assets/_Playable_/Scripts/TutorialPointer.cs
git commit -m "feat: add TutorialPointer component with synced hand+efx animation"
```

---

### Task 2: Replace `MapController`'s inline hand-pulse logic with `TutorialPointer`

**Files:**
- Modify: `Assets/_Playable_/Scripts/MapController.cs`

**Interfaces:**
- Consumes: `TutorialPointer.Show()`, `TutorialPointer.Stop()`, `TutorialPointer.IsPlaying` from Task 1.
- Produces: `MapController` no longer has `_hand`, `_handPulseScale`, `_handPulseDuration`, `_handPulseEase`, `_handBaseScale`, `_handTween`, or `PlayHandPulse()`. Adds `[SerializeField] private TutorialPointer _tutorialPointer;`.

- [ ] **Step 1: Replace the `_hand` field and remove the `Hand Tween` header block**

Find (around line 45-59):

```csharp
        [Tooltip("Object bàn tay, hiện cạnh image mục tiêu")] [SerializeField]
        private RectTransform _hand;

        [Tooltip("Lệch vị trí bàn tay so với tâm image mục tiêu")] [SerializeField]
        private Vector2 _handOffset = Vector2.zero;

        [Tooltip("Bán kính tap phụ (pixel) ngoài image mục tiêu. 0 = chỉ nhận tap trong image")]
        [SerializeField]
        private float _extraTapRadius = 0f;

        [Header("Hand Tween")] [Tooltip("Tỉ lệ scale nhỏ nhất khi bàn tay nhấp")] [SerializeField]
        private float _handPulseScale = 0.75f;

        [SerializeField] private float _handPulseDuration = 0.5f;
        [SerializeField] private Ease _handPulseEase = Ease.InOutSine;
```

Replace with:

```csharp
        [Tooltip("Component điều khiển animation bàn tay hướng dẫn (hand + efx)")] [SerializeField]
        private TutorialPointer _tutorialPointer;

        [Tooltip("Lệch vị trí bàn tay so với tâm image mục tiêu")] [SerializeField]
        private Vector2 _handOffset = Vector2.zero;

        [Tooltip("Bán kính tap phụ (pixel) ngoài image mục tiêu. 0 = chỉ nhận tap trong image")]
        [SerializeField]
        private float _extraTapRadius = 0f;
```

- [ ] **Step 2: Remove the now-unused private fields**

Find (around line 76-83):

```csharp
        private int _currentSpawnIndex;
        private bool _tutorialStarted;
        private Vector3 _posSpawnTutorial;
        private Vector3 _handBaseScale = Vector3.one;
        private Tween _handTween;
        private float _refreshTime;
        private Vector3 _lastCameraPosition;
        private Quaternion _lastCameraRotation;
```

Replace with:

```csharp
        private int _currentSpawnIndex;
        private bool _tutorialStarted;
        private Vector3 _posSpawnTutorial;
        private float _refreshTime;
        private Vector3 _lastCameraPosition;
        private Quaternion _lastCameraRotation;
```

- [ ] **Step 3: Remove the `_handBaseScale` caching in `Start()`**

Find (around line 108-115):

```csharp
            ResolveUiCamera();

            if (_hand != null)
            {
                _handBaseScale = _hand.localScale;
            }

            ShowTutorialUI(false);
```

Replace with:

```csharp
            ResolveUiCamera();

            ShowTutorialUI(false);
```

- [ ] **Step 4: Update `OnDestroy` to stop `_tutorialPointer` instead of killing `_handTween`**

Find:

```csharp
        private void OnDestroy()
        {
            _handTween?.Kill();
        }
```

Replace with:

```csharp
        private void OnDestroy()
        {
            _tutorialPointer?.Stop();
        }
```

- [ ] **Step 5: Update `MoveTargetToPoint` to position `_tutorialPointer` instead of `_hand`**

Find:

```csharp
        private void MoveTargetToPoint(RectTransform point)
        {
            Vector3 pointPosition = point.position;

            if (_targetImage != null)
            {
                _targetImage.gameObject.SetActive(true);
                _targetImage.position = pointPosition;
                pointPosition = _targetImage.position;
            }

            if (_hand == null)
            {
                return;
            }

            _hand.gameObject.SetActive(true);
            _hand.position = pointPosition;

            if (_handOffset != Vector2.zero)
            {
                _hand.anchoredPosition += _handOffset;
            }
        }
```

Replace with:

```csharp
        private void MoveTargetToPoint(RectTransform point)
        {
            Vector3 pointPosition = point.position;

            if (_targetImage != null)
            {
                _targetImage.gameObject.SetActive(true);
                _targetImage.position = pointPosition;
                pointPosition = _targetImage.position;
            }

            if (_tutorialPointer == null)
            {
                return;
            }

            var pointerRect = (RectTransform)_tutorialPointer.transform;
            pointerRect.position = pointPosition;

            if (_handOffset != Vector2.zero)
            {
                pointerRect.anchoredPosition += _handOffset;
            }
        }
```

- [ ] **Step 6: Remove `PlayHandPulse()` and call `_tutorialPointer.Show()` from `ShowTutorialPoint` instead**

Find:

```csharp
            ShowVfx(_posSpawnTutorial);
            MoveTargetToPoint(point);
            PlayHandPulse();

            CacheCameraState();
            _refreshTime = Time.time + _refreshInterval;
        }

        private void MoveTargetToPoint(RectTransform point)
```

Replace with:

```csharp
            ShowVfx(_posSpawnTutorial);
            MoveTargetToPoint(point);
            _tutorialPointer?.Show();

            CacheCameraState();
            _refreshTime = Time.time + _refreshInterval;
        }

        private void MoveTargetToPoint(RectTransform point)
```

(Note: the `_tutorialPointer.Show()` call above still needs `pointerRect` from Task/Step 5 to have been applied first, since `Show()` resets `transform.localScale`/`localRotation` on the pointer root, not its position — position must already be set by `MoveTargetToPoint` before `Show()` runs, which this ordering preserves.)

Now find and delete the whole `PlayHandPulse` method:

```csharp
        /// <summary>
        /// Bàn tay scale to nhỏ liên tục để mời player tap.
        /// </summary>
        private void PlayHandPulse()
        {
            if (_hand == null)
            {
                return;
            }

            _handTween?.Kill();
            _hand.localScale = _handBaseScale;

            _handTween = _hand
                .DOScale(_handBaseScale * _handPulseScale, _handPulseDuration)
                .SetEase(_handPulseEase)
                .SetLoops(-1, LoopType.Yoyo);
        }
```

Delete it entirely (no replacement — `TutorialPointer.Show()` now owns this behavior).

- [ ] **Step 7: Update `EnterGameplay` to stop `_tutorialPointer`**

Find:

```csharp
        private void EnterGameplay()
        {
            _currentPhase = Phase.Gameplay;

            _handTween?.Kill();
            _handTween = null;

            ShowTutorialUI(false);
        }
```

Replace with:

```csharp
        private void EnterGameplay()
        {
            _currentPhase = Phase.Gameplay;

            _tutorialPointer?.Stop();

            ShowTutorialUI(false);
        }
```

- [ ] **Step 8: Update `ShowTutorialUI` to stop `_tutorialPointer` instead of toggling `_hand`**

Find:

```csharp
        private void ShowTutorialUI(bool show)
        {
            if (_targetImage != null && _targetImage.gameObject.activeSelf != show)
            {
                _targetImage.gameObject.SetActive(show);
            }

            if (_hand != null && _hand.gameObject.activeSelf != show)
            {
                _hand.gameObject.SetActive(show);
            }

            if (_vfxSpawn != null && _vfxSpawn.activeSelf != show)
            {
                _vfxSpawn.SetActive(show);
            }
        }
```

Replace with:

```csharp
        private void ShowTutorialUI(bool show)
        {
            if (_targetImage != null && _targetImage.gameObject.activeSelf != show)
            {
                _targetImage.gameObject.SetActive(show);
            }

            if (!show && _tutorialPointer != null && _tutorialPointer.IsPlaying)
            {
                _tutorialPointer.Stop();
            }

            if (_vfxSpawn != null && _vfxSpawn.activeSelf != show)
            {
                _vfxSpawn.SetActive(show);
            }
        }
```

- [ ] **Step 9: Verify it compiles**

Open Unity Editor and check the Console window shows zero compile errors in `MapController.cs`. Confirm no remaining references to `_hand`, `_handTween`, `_handBaseScale`, `_handPulseScale`, `_handPulseDuration`, `_handPulseEase`, or `PlayHandPulse` exist in the file (search the file for each name).

- [ ] **Step 10: Manual Play Mode check**

In the Unity Editor, open the scene containing `MapController` with tutorial spawn points configured, wire `_tutorialPointer` in the Inspector to the `pointer` GameObject (which must already have `TutorialPointer` from Task 1 attached, with its `hand`/`efx` fields wired). Enter Play Mode, select a monster to start the tutorial, and confirm:
- The hand moves from its offset to the target point, pulses (scale+rotate), pauses, then loops — matching the old pulse behavior but now driven by `TutorialPointer`.
- The `efx` child visibly scales up from 0 to 1 in sync with each loop iteration, restarting every loop.
- Tapping the target advances to the next spawn point and the hand re-positions and restarts its animation there.
- After the last spawn point, the hand and `efx` fully stop and hide (`pointer` GameObject inactive).

- [ ] **Step 11: Commit**

```bash
git add Assets/_Playable_/Scripts/MapController.cs
git commit -m "refactor: drive tutorial hand animation via TutorialPointer component"
```

---

### Task 3: Per-spawn-point blur overlay

**Files:**
- Modify: `Assets/_Playable_/Scripts/MapController.cs`

**Interfaces:**
- Consumes: `_spawnPoints` (`List<RectTransform>`, existing field), `_currentSpawnIndex` (existing field).
- Produces: `[SerializeField] private List<GameObject> _tutorialBlurs;` plus private helpers `GetBlur(int)`, `ShowBlur(int)`, `HideBlur(int)`, `HideAllBlurs()` — not consumed outside this file.

- [ ] **Step 1: Add the `_tutorialBlurs` field**

Find (this is the block Task 2 Step 1 already edited — the tail end of the `Tutorial UI` header group):

```csharp
        [Tooltip("Bán kính tap phụ (pixel) ngoài image mục tiêu. 0 = chỉ nhận tap trong image")]
        [SerializeField]
        private float _extraTapRadius = 0f;
```

Replace with:

```csharp
        [Tooltip("Bán kính tap phụ (pixel) ngoài image mục tiêu. 0 = chỉ nhận tap trong image")]
        [SerializeField]
        private float _extraTapRadius = 0f;

        [Tooltip("Ảnh blur/tối theo từng spawn point, index khớp với _spawnPoints. " +
                 "Bật khi tới point tương ứng, tắt ngay khi tap trúng")]
        [SerializeField]
        private List<GameObject> _tutorialBlurs = new List<GameObject>();
```

- [ ] **Step 2: Show the current point's blur in `ShowTutorialPoint`**

Find:

```csharp
            ShowVfx(_posSpawnTutorial);
            MoveTargetToPoint(point);
            _tutorialPointer?.Show();

            CacheCameraState();
            _refreshTime = Time.time + _refreshInterval;
        }
```

Replace with:

```csharp
            ShowVfx(_posSpawnTutorial);
            MoveTargetToPoint(point);
            _tutorialPointer?.Show();
            ShowBlur(index);

            CacheCameraState();
            _refreshTime = Time.time + _refreshInterval;
        }
```

- [ ] **Step 3: Hide the current point's blur the instant the player taps correctly**

Find:

```csharp
        private void HandleTutorialTap(Vector2 screenPosition)
        {
            if (!IsTapOnTarget(screenPosition))
            {
                return;
            }

            // Vị trí spawn lấy từ raycast đã tính sẵn cho point này, đúng chỗ VFX đang đứng.
            if (!TrySpawnMonster(_posSpawnTutorial))
            {
                return;
            }

            AdvanceTutorial();
        }
```

Replace with:

```csharp
        private void HandleTutorialTap(Vector2 screenPosition)
        {
            if (!IsTapOnTarget(screenPosition))
            {
                return;
            }

            HideBlur(_currentSpawnIndex);

            // Vị trí spawn lấy từ raycast đã tính sẵn cho point này, đúng chỗ VFX đang đứng.
            if (!TrySpawnMonster(_posSpawnTutorial))
            {
                return;
            }

            AdvanceTutorial();
        }
```

- [ ] **Step 4: Hide every blur when entering gameplay**

Find:

```csharp
        private void EnterGameplay()
        {
            _currentPhase = Phase.Gameplay;

            _tutorialPointer?.Stop();

            ShowTutorialUI(false);
        }
```

Replace with:

```csharp
        private void EnterGameplay()
        {
            _currentPhase = Phase.Gameplay;

            _tutorialPointer?.Stop();
            HideAllBlurs();

            ShowTutorialUI(false);
        }
```

- [ ] **Step 5: Add the blur helper methods**

Find (end of the `#region Tutorial` block):

```csharp
        private void CacheCameraState()
        {
            if (_worldCameraTransform == null)
            {
                return;
            }

            _lastCameraPosition = _worldCameraTransform.position;
            _lastCameraRotation = _worldCameraTransform.rotation;
        }

        #endregion
```

Replace with:

```csharp
        private void CacheCameraState()
        {
            if (_worldCameraTransform == null)
            {
                return;
            }

            _lastCameraPosition = _worldCameraTransform.position;
            _lastCameraRotation = _worldCameraTransform.rotation;
        }

        private void ShowBlur(int index)
        {
            GameObject blur = GetBlur(index);

            if (blur != null && !blur.activeSelf)
            {
                blur.SetActive(true);
            }
        }

        private void HideBlur(int index)
        {
            GameObject blur = GetBlur(index);

            if (blur != null && blur.activeSelf)
            {
                blur.SetActive(false);
            }
        }

        private void HideAllBlurs()
        {
            foreach (GameObject blur in _tutorialBlurs)
            {
                if (blur != null && blur.activeSelf)
                {
                    blur.SetActive(false);
                }
            }
        }

        private GameObject GetBlur(int index)
        {
            return index >= 0 && index < _tutorialBlurs.Count ? _tutorialBlurs[index] : null;
        }

        #endregion
```

- [ ] **Step 6: Verify it compiles**

Open Unity Editor and check the Console window shows zero compile errors in `MapController.cs`.

- [ ] **Step 7: Manual Play Mode check**

In the Unity Editor, populate `_tutorialBlurs` in the Inspector with one dim/blur `GameObject` per entry in `_spawnPoints` (same count, same order), each initially inactive in the scene. Enter Play Mode, select a monster to start the tutorial, and confirm:
- Only the blur for the current spawn point is active at any time — no two blurs active simultaneously.
- Tapping the correct target hides that point's blur immediately, before the next point's blur appears.
- Advancing to the next point shows that point's blur.
- After the last point, no blur remains active.
- If `_tutorialBlurs` is left shorter than `_spawnPoints` (or has a `null` entry), the tutorial still runs without exceptions — that point simply has no blur.

- [ ] **Step 8: Commit**

```bash
git add Assets/_Playable_/Scripts/MapController.cs
git commit -m "feat: show tutorial blur per spawn point instead of whole phase"
```
