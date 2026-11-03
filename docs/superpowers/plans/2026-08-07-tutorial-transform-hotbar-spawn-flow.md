# Tutorial Transform → Hotbar → Spawn → Free-Tap Flow Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Chain the tutorial hand-pointer through Transform button → Hotbar[0] → Spawn point[0] → Hotbar[1] → Spawn point[1], then hand control to free tap-to-spawn with a total-monster-count limit.

**Architecture:** Replace `MapController`'s single `_tutorialStarted` bool with an explicit `TutorialStep` state machine. Add a `PlayerController.OnTransformedOn` event and change `IMonsterSelector.SelectMonster` to also pass the clicking `HotbarItem`, so `MapController` can tell exactly which step just completed and advance deterministically. Button steps (Transform, Hotbar) reuse Unity's native `Button.onClick`; only the two spawn-point steps keep the existing ground-raycast/VFX/blur/tap-detection machinery.

**Tech Stack:** Unity (C#), DOTween (existing `TutorialPointer`), Unity UI (`Button`, `RectTransform`).

**Spec:** `docs/superpowers/specs/2026-08-07-tutorial-transform-hotbar-spawn-flow-design.md`

## Global Constraints

- Hardcode exactly 2 tutorial rounds (hotbar[0]/spawn[0], hotbar[1]/spawn[1]) — do not add a configurable round count.
- `_maxTotalMonsters` limit applies to the **total** monster count across the whole game, including the 2 monsters spawned during the tutorial itself.
- Missing tutorial wiring (`_transformButtonTarget`, `_playerController`, or fewer than 2 hotbar items/spawn points) must fall back to `EnterGameplay()` immediately — never leave the player stuck in an unplayable tutorial state.
- Wrong-hotbar taps during tutorial still update `_prefabMonster` (existing free-selection behavior) but must not advance the tutorial step.
- No automated test framework exists in this Unity project (no `*.Tests.asmdef`, no NUnit references found under `Assets/`). Verification for every task in this plan is: open the project in the Unity Editor, let it recompile, and confirm the Console has no errors. Task 4 adds a manual Play Mode walkthrough of the full flow — this stands in for the "run the tests" step because there is no automated harness to run instead.

---

### Task 1: `PlayerController` — add `OnTransformedOn` event

**Files:**
- Modify: `Assets/_Playable_/Scripts/Controller/PlayerController.cs:133` (add event declaration)
- Modify: `Assets/_Playable_/Scripts/Controller/PlayerController.cs:735-762` (`ToggleTransform`, invoke the event)

**Interfaces:**
- Produces: `public event Action OnTransformedOn;` on `PlayerController` — fires exactly once per transform, only when `_isTransformed` flips `false → true`. `MapController` (Task 3) subscribes to this with `+=`/`-=`.

- [ ] **Step 1: Add the event field**

In `Assets/_Playable_/Scripts/Controller/PlayerController.cs`, find:
```csharp
        public bool IsGrounded => _isGrounded;
        public Vector3 Velocity { get; private set; }
```
Replace with:
```csharp
        public bool IsGrounded => _isGrounded;
        public Vector3 Velocity { get; private set; }

        /// <summary>Bắn đúng 1 lần khi player transform (cưỡi ngựa) chuyển từ tắt sang bật.</summary>
        public event Action OnTransformedOn;
```

- [ ] **Step 2: Invoke the event when transform turns on**

Find `ToggleTransform()`:
```csharp
        private void ToggleTransform()
        {
            _isTransformed = !_isTransformed;

            // Đổi animator đích -> ép đẩy lại toàn bộ param ở frame kế tiếp.
            _appliedSpeed = -1f;
            _appliedJump = !_appliedJump;

            RefreshTransformIcon();

            if (_isTransformed)
            {
                _horse.SetActive(true);
                _horse.transform.localPosition = Vector3.zero;

                _modelPlayer.SetParent(_mountPoint);

                _modelPlayer.localPosition = Vector3.zero;
                _modelPlayer.localRotation = Quaternion.identity;
            }
            else
            {
                _modelPlayer.SetParent(transform);
                _modelPlayer.localPosition = Vector3.zero;
                _modelPlayer.localRotation = Quaternion.identity;
                _horse.SetActive(false);
            }
        }
```
Replace the `if (_isTransformed)` branch body to invoke the event last:
```csharp
        private void ToggleTransform()
        {
            _isTransformed = !_isTransformed;

            // Đổi animator đích -> ép đẩy lại toàn bộ param ở frame kế tiếp.
            _appliedSpeed = -1f;
            _appliedJump = !_appliedJump;

            RefreshTransformIcon();

            if (_isTransformed)
            {
                _horse.SetActive(true);
                _horse.transform.localPosition = Vector3.zero;

                _modelPlayer.SetParent(_mountPoint);

                _modelPlayer.localPosition = Vector3.zero;
                _modelPlayer.localRotation = Quaternion.identity;

                OnTransformedOn?.Invoke();
            }
            else
            {
                _modelPlayer.SetParent(transform);
                _modelPlayer.localPosition = Vector3.zero;
                _modelPlayer.localRotation = Quaternion.identity;
                _horse.SetActive(false);
            }
        }
```

- [ ] **Step 3: Verify it compiles**

Open the project in Unity Editor (or let it finish an already-open session's recompile). Check the Console window: no errors mentioning `PlayerController.cs`. `System` is already imported at the top of this file, so `Action` resolves without adding a `using`.

- [ ] **Step 4: Commit**

```bash
git add "Assets/_Playable_/Scripts/Controller/PlayerController.cs"
git commit -m "feat: add PlayerController.OnTransformedOn event"
```

---

### Task 2: `IMonsterSelector` + `HotbarItem` — pass the clicking hotbar to the selector

**Files:**
- Modify: `Assets/_Playable_/Scripts/IMonsterSelector.cs` (full file rewrite)
- Modify: `Assets/_Playable_/Scripts/HotbarItem.cs:13` (add `ButtonRect` property) and `:25-29` (`OnClick`, pass `this`)

**Interfaces:**
- Consumes: nothing from Task 1.
- Produces: `IMonsterSelector.SelectMonster(Monster monster, HotbarItem source)`, `HotbarItem.ButtonRect` (`RectTransform`, get-only). `MapController` (Task 3) implements the former and reads the latter.

**Note:** After this task, `MapController.cs` still implements the *old* 1-argument `SelectMonster(Monster monster)` — the project will **not compile** until Task 3 is done. This is expected; continue straight to Task 3 in the same sitting before doing any Editor verification.

- [ ] **Step 1: Rewrite `IMonsterSelector.cs`**

Replace the entire file content:
```csharp
namespace Playable
{
    public interface IMonsterSelector
    {
        void SelectMonster(Monster monster, HotbarItem source);
    }
}
```

- [ ] **Step 2: Add `ButtonRect` to `HotbarItem`**

Find:
```csharp
        [SerializeField] private Monster _prefab;
        [SerializeField] private Button _button;
        [SerializeField] private GameObject _selectedIndicator;

        private IMonsterSelector _selector;
```
Replace with:
```csharp
        [SerializeField] private Monster _prefab;
        [SerializeField] private Button _button;
        [SerializeField] private GameObject _selectedIndicator;

        private IMonsterSelector _selector;

        /// <summary>RectTransform của nút, dùng để MapController trỏ tay tutorial tới.</summary>
        public RectTransform ButtonRect => _button != null ? (RectTransform)_button.transform : null;
```

- [ ] **Step 3: Pass `this` when clicking**

Find:
```csharp
        private void OnClick()
        {
            _selector.SelectMonster(_prefab);
            _selectedIndicator.SetActive(true);
        }
```
Replace with:
```csharp
        private void OnClick()
        {
            _selector.SelectMonster(_prefab, this);
            _selectedIndicator.SetActive(true);
        }
```

- [ ] **Step 4: Commit**

```bash
git add "Assets/_Playable_/Scripts/IMonsterSelector.cs" "Assets/_Playable_/Scripts/HotbarItem.cs"
git commit -m "feat: pass clicking HotbarItem through IMonsterSelector.SelectMonster"
```

(Do not verify compilation yet — proceed to Task 3, which is what makes `MapController` implement the new signature.)

---

### Task 3: `MapController` — tutorial step state machine + spawn limit

**Files:**
- Modify: `Assets/_Playable_/Scripts/MapController.cs` (full file rewrite)

**Interfaces:**
- Consumes: `PlayerController.OnTransformedOn` (Task 1); `IMonsterSelector.SelectMonster(Monster, HotbarItem)` and `HotbarItem.ButtonRect` (Task 2).
- Produces: nothing consumed by later code in this plan — Task 4 is manual verification only.

- [ ] **Step 1: Replace the entire file**

Replace the full contents of `Assets/_Playable_/Scripts/MapController.cs` with:

```csharp
using System.Collections.Generic;
using DG.Tweening;
using UnityEngine;
using UnityEngine.EventSystems;

namespace Playable
{
    public enum Phase
    {
        Tutorial,
        Gameplay
    }

    public class MapController : MonoBehaviour, IMonsterSelector
    {
        private enum TutorialStep
        {
            WaitTransform,
            WaitHotbar0,
            WaitSpawn0,
            WaitHotbar1,
            WaitSpawn1,
            Done
        }

        [SerializeField] private List<HotbarItem> _hotbarItems = new List<HotbarItem>();
        [SerializeField] private Monster _prefabMonster;

        [Header("Spawn Monster")] [SerializeField]
        private List<RectTransform> _spawnPoints = new List<RectTransform>();

        [SerializeField] private float _rayMaxDistance = 500f;
        [SerializeField] private LayerMask _groundMask = ~0;
        [SerializeField] private GameObject _vfxSpawn;

        [Tooltip("Camera dùng để raycast/quy đổi tọa độ UI -> ground. " +
                 "Bỏ trống sẽ lấy Camera.main (yêu cầu camera có tag MainCamera)")]
        [SerializeField]
        private Camera _worldCamera;

        [Tooltip("Cha của quái sau khi spawn. Bỏ trống thì spawn ra gốc scene")] [SerializeField]
        private Transform _monsterParent;

        [SerializeField] private float _monsterWanderRadius = 3f;

        [Header("Tutorial UI")]
        [Tooltip("Canvas chứa các spawn point. Bỏ trống sẽ tự tìm từ point đầu tiên")]
        [SerializeField]
        private Canvas _uiCanvas;

        [Tooltip("Image mục tiêu, di chuyển tới từng spawn point. Player phải tap trúng image này")]
        [SerializeField]
        private RectTransform _targetImage;

        [Tooltip("Component điều khiển animation bàn tay hướng dẫn (hand + efx)")] [SerializeField]
        private TutorialPointer _tutorialPointer;

        [Tooltip("Lệch vị trí bàn tay so với tâm image mục tiêu")] [SerializeField]
        private Vector2 _handOffset = Vector2.zero;

        [Tooltip("Bán kính tap phụ (pixel) ngoài image mục tiêu. 0 = chỉ nhận tap trong image")]
        [SerializeField]
        private float _extraTapRadius = 0f;

        [Tooltip("Ảnh blur/tối theo từng spawn point, index khớp với _spawnPoints. " +
                 "Bật khi tới point tương ứng, tắt ngay khi tap trúng")]
        [SerializeField]
        private List<GameObject> _tutorialBlurs = new List<GameObject>();

        [Tooltip("PlayerController của player, dùng để biết khi nào player transform xong")]
        [SerializeField]
        private PlayerController _playerController;

        [Tooltip("RectTransform của nút Transform trên player, để trỏ tay tutorial tới")]
        [SerializeField]
        private RectTransform _transformButtonTarget;

        [Header("Camera Follow")]
        [Tooltip("Camera bám player nên cùng điểm màn hình sẽ trỏ tới chỗ khác trên ground. " +
                 "Bật để VFX luôn nằm đúng chỗ quái sẽ rơi")]
        [SerializeField]
        private bool _refreshWhileCameraMoves = true;

        [SerializeField] private float _refreshInterval = 0.1f;

        [Header("Free Spawn Limit")]
        [Tooltip("Giới hạn TỔNG số quái spawn trong toàn game, tính cả 2 quái spawn lúc tutorial. " +
                 "Phải >= 2 nếu muốn tutorial luôn hoàn thành được. 0 = không giới hạn.")]
        [SerializeField]
        private int _maxTotalMonsters = 5;

        private readonly List<RaycastResult> _raycastResults = new List<RaycastResult>();

        private Phase _currentPhase = Phase.Tutorial;
        private TutorialStep _tutorialStep;
        private Plane _groundPlane;
        private Camera _uiCamera;
        private Transform _worldCameraTransform;
        private PointerEventData _pointerEventData;
        private int _currentSpawnIndex;
        private Vector3 _posSpawnTutorial;
        private float _refreshTime;
        private Vector3 _lastCameraPosition;
        private Quaternion _lastCameraRotation;
        private int _spawnedMonsterCount;
        private bool _limitReachedNotified;

        public Phase CurrentPhase => _currentPhase;

        private void Start()
        {
            foreach (var hotbarItem in _hotbarItems)
            {
                hotbarItem.Init(this);
            }

            // Ưu tiên camera gán tay trong Inspector. Scene có thể không gắn tag MainCamera
            // cho camera thật (vd. camera nằm trong prefab Player), nên Camera.main chỉ là fallback.
            if (_worldCamera == null)
            {
                _worldCamera = Camera.main;
            }

            if (_worldCamera != null)
            {
                _worldCameraTransform = _worldCamera.transform;
            }

            _groundPlane = new Plane(Vector3.up, Vector3.zero);

            ResolveUiCamera();

            ShowTutorialUI(false);

            // Thiếu 1 trong các điều kiện dưới thì không chạy được đủ chuỗi tutorial
            // (transform -> hotbar[0] -> spawn[0] -> hotbar[1] -> spawn[1]). Bỏ qua thẳng
            // vào gameplay, không kẹt tutorial.
            if (_spawnPoints.Count < 2 || _hotbarItems.Count < 2 || _transformButtonTarget == null)
            {
                EnterGameplay();
                return;
            }

            if (_playerController != null)
            {
                _playerController.OnTransformedOn += HandlePlayerTransformed;
            }

            GoToTransformStep();
        }

        private void Update()
        {
            if (_currentPhase == Phase.Tutorial && IsSpawnWaitStep())
            {
                RefreshTutorialPointPosition();
            }

            if (!TryGetTapPosition(out Vector2 screenPosition))
            {
                return;
            }

            if (_currentPhase == Phase.Tutorial)
            {
                HandleTutorialTap(screenPosition);
            }
            else
            {
                HandleGameplayTap(screenPosition);
            }
        }

        private void OnDestroy()
        {
            _tutorialPointer?.Stop();

            if (_playerController != null)
            {
                _playerController.OnTransformedOn -= HandlePlayerTransformed;
            }
        }

        public void SelectMonster(Monster monster, HotbarItem source)
        {
            _prefabMonster = monster;

            foreach (var hotbarItem in _hotbarItems)
            {
                hotbarItem.DeselectMonster();
            }

            if (_currentPhase != Phase.Tutorial)
            {
                return;
            }

            // Chỉ advance tutorial khi đúng hotbar đang được tay chỉ tới. Chọn sai hotbar vẫn
            // đổi _prefabMonster như bình thường, nhưng step không đi tiếp.
            int index = _hotbarItems.IndexOf(source);

            if (_tutorialStep == TutorialStep.WaitHotbar0 && index == 0)
            {
                GoToSpawnStep(0);
            }
            else if (_tutorialStep == TutorialStep.WaitHotbar1 && index == 1)
            {
                GoToSpawnStep(1);
            }
        }

        #region Tutorial

        private bool IsSpawnWaitStep()
        {
            return _tutorialStep == TutorialStep.WaitSpawn0 || _tutorialStep == TutorialStep.WaitSpawn1;
        }

        private void GoToTransformStep()
        {
            _tutorialStep = TutorialStep.WaitTransform;
            ShowButtonPointer(_transformButtonTarget);
        }

        private void HandlePlayerTransformed()
        {
            if (_tutorialStep != TutorialStep.WaitTransform)
            {
                return;
            }

            GoToHotbarStep(0);
        }

        private void GoToHotbarStep(int index)
        {
            HotbarItem hotbar = index >= 0 && index < _hotbarItems.Count ? _hotbarItems[index] : null;

            if (hotbar == null)
            {
                FinishTutorial();
                return;
            }

            _tutorialStep = index == 0 ? TutorialStep.WaitHotbar0 : TutorialStep.WaitHotbar1;
            ShowButtonPointer(hotbar.ButtonRect);
        }

        private void GoToSpawnStep(int index)
        {
            _tutorialStep = index == 0 ? TutorialStep.WaitSpawn0 : TutorialStep.WaitSpawn1;
            _currentSpawnIndex = index;
            ShowTutorialPoint(index);
        }

        private void FinishTutorial()
        {
            _tutorialStep = TutorialStep.Done;
            EnterGameplay();
        }

        /// <summary>
        /// Trỏ tay tutorial vào 1 nút UI (Transform / Hotbar). Nút tự nhận click qua Button.onClick
        /// của Unity, không cần target image / ground raycast / blur như spawn point.
        /// </summary>
        private void ShowButtonPointer(RectTransform target)
        {
            if (target == null)
            {
                return;
            }

            if (_targetImage != null && _targetImage.gameObject.activeSelf)
            {
                _targetImage.gameObject.SetActive(false);
            }

            if (_tutorialPointer == null)
            {
                return;
            }

            var pointerRect = (RectTransform)_tutorialPointer.transform;
            pointerRect.position = target.position;

            if (_handOffset != Vector2.zero)
            {
                pointerRect.anchoredPosition += _handOffset;
            }

            _tutorialPointer.Show();
        }

        /// <summary>
        /// Đưa image mục tiêu + bàn tay tới spawn point, đồng thời bắn raycast từ đúng vị trí đó
        /// trên màn hình xuống ground để đặt VFX ngay chỗ quái sẽ rơi.
        /// </summary>
        private void ShowTutorialPoint(int index)
        {
            RectTransform point = GetSpawnPoint(index);

            if (point == null)
            {
                AdvanceAfterSpawnFailure(index);
                return;
            }

            if (!TryGetGroundPoint(point, out _posSpawnTutorial))
            {
                // Không tìm được ground cho point này thì bỏ qua, không kẹt tutorial.
                Debug.LogWarning($"[MapController] Spawn point {index} không raycast được xuống ground");
                AdvanceAfterSpawnFailure(index);
                return;
            }

            ShowVfx(_posSpawnTutorial);
            MoveTargetToPoint(point);
            _tutorialPointer?.Show();
            ShowBlur(index);

            CacheCameraState();
            _refreshTime = Time.time + _refreshInterval;
        }

        private void AdvanceAfterSpawnFailure(int index)
        {
            if (index == 0)
            {
                GoToHotbarStep(1);
            }
            else
            {
                FinishTutorial();
            }
        }

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

        private void HandleTutorialTap(Vector2 screenPosition)
        {
            if (!IsSpawnWaitStep())
            {
                return;
            }

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

            if (_tutorialStep == TutorialStep.WaitSpawn0)
            {
                GoToHotbarStep(1);
            }
            else
            {
                FinishTutorial();
            }
        }

        /// <summary>
        /// Tap phải nằm trong image mục tiêu (hoặc trong bán kính phụ) mới tính.
        /// </summary>
        private bool IsTapOnTarget(Vector2 screenPosition)
        {
            RectTransform tapArea = _targetImage != null
                ? _targetImage
                : GetSpawnPoint(_currentSpawnIndex);

            if (tapArea == null)
            {
                return false;
            }

            if (RectTransformUtility.RectangleContainsScreenPoint(tapArea, screenPosition, _uiCamera))
            {
                return true;
            }

            if (_extraTapRadius <= 0f)
            {
                return false;
            }

            Vector2 center = RectTransformUtility.WorldToScreenPoint(_uiCamera, tapArea.position);

            return (center - screenPosition).sqrMagnitude <= _extraTapRadius * _extraTapRadius;
        }

        private void EnterGameplay()
        {
            _currentPhase = Phase.Gameplay;

            _tutorialPointer?.Stop();
            HideAllBlurs();

            ShowTutorialUI(false);
        }

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

        /// <summary>
        /// Player di chuyển -> camera đổi -> cùng điểm màn hình trỏ tới chỗ khác trên ground.
        /// Bắn lại raycast để VFX bám đúng chỗ. Camera đứng yên thì không tốn raycast nào.
        /// </summary>
        private void RefreshTutorialPointPosition()
        {
            if (!_refreshWhileCameraMoves || _refreshInterval <= 0f || Time.time < _refreshTime)
            {
                return;
            }

            _refreshTime = Time.time + _refreshInterval;

            if (_worldCameraTransform == null
                || (_worldCameraTransform.position == _lastCameraPosition
                    && _worldCameraTransform.rotation == _lastCameraRotation))
            {
                return;
            }

            CacheCameraState();

            RectTransform point = GetSpawnPoint(_currentSpawnIndex);

            if (point == null || !TryGetGroundPoint(point, out _posSpawnTutorial))
            {
                return;
            }

            ShowVfx(_posSpawnTutorial);
        }

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

        #region Gameplay

        private void HandleGameplayTap(Vector2 screenPosition)
        {
            // Chặn tap trúng hotbar / UI khác, tránh vừa chọn quái vừa spawn.
            if (IsPointerOverUI(screenPosition))
            {
                return;
            }

            if (!TryGetGroundPoint(screenPosition, out Vector3 worldPosition))
            {
                return;
            }

            TrySpawnMonster(worldPosition);
        }

        #endregion

        #region Spawn

        /// <summary>
        /// Spawn quái đang chọn tại vị trí world. Chưa chọn quái hoặc đã đạt _maxTotalMonsters
        /// thì không spawn.
        /// </summary>
        private bool TrySpawnMonster(Vector3 worldPosition)
        {
            if (_prefabMonster == null)
            {
                return false;
            }

            if (_maxTotalMonsters > 0 && _spawnedMonsterCount >= _maxTotalMonsters)
            {
                NotifyMonsterLimitReached();
                return false;
            }

            Monster monster = Instantiate(_prefabMonster, _monsterParent);
            monster.Spawn(worldPosition, _monsterWanderRadius);
            _spawnedMonsterCount++;

            return true;
        }

        /// <summary>
        /// Điểm mở rộng: gọi đúng 1 lần khi vừa spawn đủ số quái tối đa (_maxTotalMonsters).
        /// Thêm logic của bạn ở đây (hiện popup, mở màn kế tiếp, khoá nút spawn, v.v.)
        /// </summary>
        private void NotifyMonsterLimitReached()
        {
            if (_limitReachedNotified)
            {
                return;
            }

            _limitReachedNotified = true;

            // TODO: thêm logic của bạn ở đây.
        }

        private void ShowVfx(Vector3 worldPosition)
        {
            if (_vfxSpawn == null)
            {
                return;
            }

            _vfxSpawn.transform.position = worldPosition;

            if (!_vfxSpawn.activeSelf)
            {
                _vfxSpawn.SetActive(true);
            }
        }

        #endregion

        #region Input / Raycast

        private bool TryGetTapPosition(out Vector2 screenPosition)
        {
            screenPosition = Vector2.zero;

            if (Input.touchCount > 0)
            {
                Touch touch = Input.GetTouch(0);

                if (touch.phase != TouchPhase.Began)
                {
                    return false;
                }

                screenPosition = touch.position;
                return true;
            }

            if (Input.GetMouseButtonDown(0))
            {
                screenPosition = Input.mousePosition;
                return true;
            }

            return false;
        }

        private bool IsPointerOverUI(Vector2 screenPosition)
        {
            EventSystem eventSystem = EventSystem.current;

            if (eventSystem == null)
            {
                return false;
            }

            if (_pointerEventData == null)
            {
                _pointerEventData = new PointerEventData(eventSystem);
            }

            _pointerEventData.position = screenPosition;
            _raycastResults.Clear();
            eventSystem.RaycastAll(_pointerEventData, _raycastResults);

            return _raycastResults.Count > 0;
        }

        private void ResolveUiCamera()
        {
            if (_uiCanvas == null)
            {
                RectTransform reference = _targetImage != null ? _targetImage : GetSpawnPoint(0);

                if (reference != null)
                {
                    _uiCanvas = reference.GetComponentInParent<Canvas>();
                }
            }

            // Screen Space - Overlay bắt buộc truyền camera null cho RectTransformUtility.
            _uiCamera = _uiCanvas != null && _uiCanvas.renderMode != RenderMode.ScreenSpaceOverlay
                ? _uiCanvas.worldCamera
                : null;
        }

        private RectTransform GetSpawnPoint(int index)
        {
            return index >= 0 && index < _spawnPoints.Count ? _spawnPoints[index] : null;
        }

        private bool TryGetGroundPoint(RectTransform rect, out Vector3 worldPosition)
        {
            worldPosition = Vector3.zero;

            if (rect == null)
            {
                return false;
            }

            Vector2 screenPosition = RectTransformUtility.WorldToScreenPoint(_uiCamera, rect.position);

            return TryGetGroundPoint(screenPosition, out worldPosition);
        }

        private bool TryGetGroundPoint(Vector2 screenPosition, out Vector3 worldPosition)
        {
            worldPosition = Vector3.zero;

            if (_worldCamera == null)
            {
                return false;
            }

            Ray ray = _worldCamera.ScreenPointToRay(screenPosition);

            if (Physics.Raycast(
                    ray,
                    out RaycastHit hit,
                    _rayMaxDistance,
                    _groundMask,
                    QueryTriggerInteraction.Ignore))
            {
                worldPosition = hit.point;
                return true;
            }

            if (_groundPlane.Raycast(ray, out float distance))
            {
                worldPosition = ray.GetPoint(distance);
                return true;
            }

            return false;
        }

        #endregion
    }
}
```

- [ ] **Step 2: Verify it compiles**

Open the project in Unity Editor and let it recompile. Check the Console: no errors mentioning `MapController.cs`, `IMonsterSelector.cs`, `HotbarItem.cs`, or `PlayerController.cs`. If you see `CS1061` about `SelectMonster` or `ButtonRect`, re-check Task 2 was fully applied.

- [ ] **Step 3: Commit**

```bash
git add "Assets/_Playable_/Scripts/MapController.cs"
git commit -m "feat: tutorial state machine for transform->hotbar->spawn->free-tap flow"
```

---

### Task 4: Wire up Inspector references and manually verify the full flow

**Files:**
- Modify: whichever scene under `Assets/_Playable_/Scenes/` holds the `MapController` GameObject (check `Game.unity`, `Gameplay.unity`, or `New Scene.unity` — open each in the Editor and use the Hierarchy search for "MapController" if unsure which one).

**Interfaces:**
- Consumes: all of Tasks 1-3 (this task only wires existing fields in the Editor and plays the scene; no new code).

- [ ] **Step 1: Open the scene with `MapController` and select it in the Hierarchy**

Confirm in the Inspector that the `MapController` component now shows two new fields under **Tutorial UI** (`PlayerController`, `Transform Button Target`) and a new **Free Spawn Limit** section (`Max Total Monsters`, defaulting to `5`).

- [ ] **Step 2: Assign the new references**

- Drag the player GameObject (the one holding `PlayerController`) into the `Player Controller` field.
- Drag the RectTransform of the player's Transform button (the same UI object referenced by `PlayerController._btnTransform`) into the `Transform Button Target` field.
- Leave `Max Total Monsters` at `5` (already ≥ 2, satisfies the tutorial-completion constraint) unless you have a specific reason to change it.

- [ ] **Step 3: Enter Play Mode and verify step-by-step**

1. On entering Play Mode, the tutorial hand should immediately appear pointing at the Transform button (no monster selection needed first, unlike the old flow).
2. Press the Transform button → the hand should move to point at hotbar item `[0]`.
3. Click hotbar `[0]` → the hand should move to spawn point `[0]`, with the ground VFX appearing at the matching world position.
4. Tap inside the spawn-point-`[0]` target → a monster should spawn there, and the hand should move to point at hotbar item `[1]`.
5. Click hotbar `[1]` → the hand should move to spawn point `[1]`.
6. Tap inside the spawn-point-`[1]` target → a second monster should spawn, and all tutorial UI (hand, target image, blur, ground VFX) should disappear — you are now in free gameplay.
7. Tap anywhere else on the ground → monsters should keep spawning at the tap location until the total spawned count (tutorial's 2 + free-tap ones) reaches `Max Total Monsters` (5 by default); after that, tapping should silently do nothing (no crash, no extra monster).

- [ ] **Step 4: Save the scene and commit**

```bash
git add "Assets/_Playable_/Scenes/<the scene file you edited>"
git commit -m "chore: wire MapController tutorial fields for transform/hotbar/spawn flow"
```

## Self-Review Notes

- **Spec coverage:** every requirement in `docs/superpowers/specs/2026-08-07-tutorial-transform-hotbar-spawn-flow-design.md` maps to a task — `PlayerController` event (Task 1), `IMonsterSelector`/`HotbarItem` changes (Task 2), full `MapController` state machine + spawn limit + extension point (Task 3), Inspector wiring + end-to-end verification (Task 4).
- **No placeholders:** the only intentional `// TODO` is `NotifyMonsterLimitReached()` in Task 3, which is the extension point the user explicitly asked to keep empty for their own code — this is a deliberate design decision, not an unfinished plan step.
- **Type/signature consistency:** `IMonsterSelector.SelectMonster(Monster, HotbarItem)`, `HotbarItem.ButtonRect`, and `PlayerController.OnTransformedOn` are declared once (Tasks 1-2) and consumed with matching names/types in Task 3's `MapController` rewrite.
