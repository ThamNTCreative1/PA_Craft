using System.Collections.Generic;
using TMPro;
using UnityEngine;
using UnityEngine.EventSystems;
using UnityEngine.UI;

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

        [Header("Spawn Monster")]
        [Tooltip("2 vị trí cố định (đặt sẵn trong Editor) để hand tutorial trỏ tới và player tap vào để spawn")]
        [SerializeField]
        private List<RectTransform> _spawnPoints = new List<RectTransform>();

        [SerializeField] private float _rayMaxDistance = 500f;
        [SerializeField] private LayerMask _groundMask = ~0;
        [SerializeField] private GameObject _vfxSpawn;

        [Tooltip("Ngón tay/chuột di chuyển quá khoảng cách này (pixel) trước khi nhấc lên thì tính là vuốt " +
                 "(look/swipe), không spawn quái")]
        [SerializeField]
        private float _swipeThreshold = 30f;

        [Tooltip("Camera dùng để raycast/quy đổi tọa độ UI -> ground. " +
                 "Bỏ trống sẽ lấy Camera.main (yêu cầu camera có tag MainCamera)")]
        [SerializeField]
        private Camera _worldCamera;

        [SerializeField] private float _monsterWanderRadius = 3f;

        [Header("Tutorial UI")]
        [Tooltip("Canvas chứa các spawn point. Bỏ trống sẽ tự tìm từ spawn point đầu tiên")]
        [SerializeField]
        private Canvas _uiCanvas;

        [Tooltip("Màn blur - bật 1 lần lúc bắt đầu tutorial, tắt 1 lần lúc tutorial xong")] [SerializeField]
        private GameObject _blur;

        [Tooltip("Component điều khiển animation bàn tay hướng dẫn (hand + efx)")] [SerializeField]
        private TutorialPointer _tutorialPointer;

        [Tooltip("Lệch vị trí bàn tay so với tâm target")] [SerializeField]
        private Vector2 _handOffset = Vector2.zero;

        [Tooltip("Bán kính tap phụ (pixel) ngoài vùng spawn point. 0 = chỉ nhận tap trong RectTransform")]
        [SerializeField]
        private float _extraTapRadius = 150f;

        [Tooltip("PlayerController của player, dùng để biết khi nào player transform xong")] [SerializeField]
        private PlayerController _playerController;


        [Tooltip("RectTransform của nút Transform trên player, để trỏ tay tutorial tới")] [SerializeField]
        private RectTransform _transformButtonTarget;

        [Tooltip("Canvas của nút Transform - chỉnh sortingOrder để nút nổi lên trên màn blur. " +
                 "Canvas phải để sẵn overrideSorting = true.")]
        [SerializeField]
        private Canvas _transformButtonCanvas;

        [Tooltip("SortingOrder khi nút Transform được highlight. Lúc không highlight thì về lại 0.")] [SerializeField]
        private int _transformButtonHighlightSortingOrder = 3;

        [Header("Tutorial Hint Text")]
        [Tooltip("Chỉ dùng trong tutorial - text gợi ý hiện phía trên nút hotbar/spawn point")]
        [SerializeField]
        private TMP_Text _hintText;

        [Tooltip("Text hiện khi tay trỏ tới nút hotbar (bước chọn quái)")] [SerializeField]
        private string _selectHotbarHintText = "Select another monster to summon";

        [Tooltip("Màu tên quái trong text \"Tap to spawn <tên quái>\" (chữ nghiêng)")] [SerializeField]
        private Color _monsterNameHintColor = Color.yellow;

        [Header("Camera Follow")]
        [Tooltip("Camera bám player nên cùng điểm màn hình sẽ trỏ tới chỗ khác trên ground. " +
                 "Bật để VFX luôn nằm đúng chỗ quái sẽ rơi")]
        [SerializeField]
        private bool _refreshWhileCameraMoves = true;

        [SerializeField] private float _refreshInterval = 0.1f;


        private readonly List<RaycastResult> _raycastResults = new List<RaycastResult>();

        private HotbarItem _selectedHotbarItem;
        private RectTransform _currentHandTarget;
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

        private Vector2 _pointerDownPosition;
        private bool _isPointerDown;
        private bool _isSwipe;

        // --- [SCALE DEBUG] tạm thời, xoá sau khi xác định xong nguyên nhân ---
        private float _screenSizeLogUntil;
        private int _lastLoggedScreenWidth = -1;
        private int _lastLoggedScreenHeight = -1;
        // -----------------------------------------------------------------

        public Phase CurrentPhase => _currentPhase;

        private void Start()
        {
            // [SCALE DEBUG] theo dõi Screen.width/height trong 5s đầu xem có ổn định ngay không
            _screenSizeLogUntil = Time.time + 5f;
            LogScreenSizeIfChanged();

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

            // Thiếu 1 trong các điều kiện dưới thì không chạy được đủ chuỗi tutorial
            // (hotbar[0] -> spawn[0] -> hotbar[1] -> spawn[1]). Bỏ qua thẳng
            // vào gameplay, không kẹt tutorial.
            if (_spawnPoints.Count < 2 || _hotbarItems.Count < 2)
            {
                EnterGameplay();
                return;
            }

            if (_blur != null)
            {
                _blur.SetActive(true);
            }

            GoToHotbarStep(0);
        }

        private void Update()
        {
            // [SCALE DEBUG] log mỗi khi Screen size đổi trong 5s đầu
            if (Time.time <= _screenSizeLogUntil)
            {
                LogScreenSizeIfChanged();
            }

            if (_currentPhase == Phase.Tutorial)
            {
                // Bám vị trí target mỗi frame - bù resize màn hình (xem giải thích ở ShowHandAt).
                RefreshHandPosition();

                if (IsSpawnWaitStep())
                {
                    RefreshTutorialPointPosition();
                }
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
                HandleTap(screenPosition);
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
            // Bấm lại đúng hotbar đang chọn -> bỏ chọn, không còn quái nào để spawn cho tới khi chọn
            // lại 1 hotbar khác.
            if (_selectedHotbarItem == source)
            {
                _selectedHotbarItem = null;
                _prefabMonster = null;
                source.SetSelected(false);
                return;
            }

            _prefabMonster = monster;
            _selectedHotbarItem = source;

            foreach (var hotbarItem in _hotbarItems)
            {
                hotbarItem.SetSelected(hotbarItem == source);
            }

            GameManager.Instance.CountEvent();

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
            SetHotbarHighlighted(-1);
            _tutorialStep = TutorialStep.WaitTransform;
            SetTransformButtonHighlighted(true);
            ShowHandAt(_transformButtonTarget);
            HideHintText();
        }

        private void HandlePlayerTransformed()
        {
            if (_tutorialStep != TutorialStep.WaitTransform)
            {
                return;
            }

            SetTransformButtonHighlighted(false);
            GoToHotbarStep(0);
        }

        private void SetTransformButtonHighlighted(bool active)
        {
            if (_transformButtonCanvas != null)
            {
                _transformButtonCanvas.sortingOrder = active ? _transformButtonHighlightSortingOrder : 0;
            }
        }

        private void GoToHotbarStep(int index)
        {
            HotbarItem hotbar = index >= 0 && index < _hotbarItems.Count ? _hotbarItems[index] : null;

            if (hotbar == null)
            {
                FinishTutorial();
                return;
            }

            SetHotbarHighlighted(index);

            _tutorialStep = index == 0 ? TutorialStep.WaitHotbar0 : TutorialStep.WaitHotbar1;
            ShowHandAt(hotbar.ButtonRect);
            ShowHintText(_selectHotbarHintText);
        }

        private void GoToSpawnStep(int index)
        {
            SetHotbarHighlighted(-1);
            _tutorialStep = index == 0 ? TutorialStep.WaitSpawn0 : TutorialStep.WaitSpawn1;
            _currentSpawnIndex = index;

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
            ShowHandAt(point);
            ShowSpawnHintText();

            CacheCameraState();
            _refreshTime = Time.time + _refreshInterval;
        }

        private void SetHotbarHighlighted(int index)
        {
            for (int i = 0; i < _hotbarItems.Count; i++)
            {
                _hotbarItems[i].TurnOnCanvas(i == index);
            }
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

        private void FinishTutorial()
        {
            _tutorialStep = TutorialStep.Done;
            EnterGameplay();
        }

        /// <summary>
        /// Di chuyển bàn tay tutorial tới đúng vị trí 1 RectTransform (nút Transform, nút hotbar,
        /// hoặc spawn point cố định) rồi hiện lên.
        /// </summary>
        private void ShowHandAt(RectTransform target)
        {
            if (target == null || _tutorialPointer == null)
            {
                return;
            }

            // Lưu lại target để Update() tự bám vị trí mỗi frame (xem RefreshHandPosition) - vị trí
            // world của target có thể đổi ngay cả khi RectTransform của nó không di chuyển gì (vd.
            // resize màn hình làm Canvas reflow lại anchor), nếu chỉ set 1 lần ở đây thì bàn tay sẽ
            // đứng yên tại chỗ cũ trong khi nút/spawn point đã dời sang vị trí khác.
            _currentHandTarget = target;
            RefreshHandPosition();

            _tutorialPointer.Show();
        }

        /// <summary>
        /// Đặt lại vị trí bàn tay theo đúng _currentHandTarget - gọi mỗi frame trong Update() lúc tutorial
        /// đang chạy, để bàn tay luôn bám đúng nút/spawn point kể cả khi màn hình đổi kích thước.
        /// </summary>
        private void RefreshHandPosition()
        {
            if (_currentHandTarget == null || _tutorialPointer == null)
            {
                return;
            }

            var pointerRect = (RectTransform)_tutorialPointer.transform;
            pointerRect.position = _currentHandTarget.position;

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

            // Vị trí spawn lấy từ raycast đã tính sẵn cho point này, đúng chỗ VFX đang đứng.
            if (!TrySpawnMonster(_posSpawnTutorial))
            {
                return;
            }

            HideVfx();
            HideHintText();

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
        /// Text "Select another monster to summon" - hiện lúc tay trỏ vào nút hotbar.
        /// </summary>
        private void ShowHintText(string text)
        {
            if (_hintText == null)
            {
                return;
            }

            _hintText.text = text;

            if (!_hintText.gameObject.activeSelf)
            {
                _hintText.gameObject.SetActive(true);
            }
        }

        /// <summary>
        /// Text "Tap to spawn &lt;tên quái&gt;" (tên quái tô màu + nghiêng) - hiện lúc tay trỏ tới spawn
        /// point, dùng đúng quái đang chọn (_prefabMonster, đã set khi player bấm hotbar).
        /// </summary>
        private void ShowSpawnHintText()
        {
            if (_prefabMonster == null)
            {
                return;
            }

            string colorHex = ColorUtility.ToHtmlStringRGB(_monsterNameHintColor);

            ShowHintText($"Tap to spawn <color=#{colorHex}><i>{_prefabMonster.name}</i></color>");
        }

        private void HideHintText()
        {
            if (_hintText != null && _hintText.gameObject.activeSelf)
            {
                _hintText.gameObject.SetActive(false);
            }
        }

        /// <summary>
        /// Tap phải nằm trong RectTransform của spawn point hiện tại (hoặc trong bán kính phụ) mới tính.
        /// </summary>
        private bool IsTapOnTarget(Vector2 screenPosition)
        {
            RectTransform tapArea = GetSpawnPoint(_currentSpawnIndex);

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
            SetHotbarHighlighted(-1);
            _currentPhase = Phase.Gameplay;

            _tutorialPointer?.Stop();

            if (_blur != null)
            {
                _blur.SetActive(false);
            }

            HideVfx();
            HideHintText();
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

        #endregion

        #region Gameplay

        /// <summary>
        /// Tap trúng widget tương tác thật (Button...) thì bỏ qua (tránh vừa bấm UI vừa spawn). Tap
        /// trúng map thì bắn raycast từ điểm tap xuống ground, spawn quái đang chọn đúng tại điểm chạm.
        /// </summary>
        private void HandleTap(Vector2 screenPosition)
        {
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

            Monster monster = Instantiate(_prefabMonster);
            monster.Spawn(worldPosition, _monsterWanderRadius);
            _spawnedMonsterCount++;
            GameManager.Instance.CountEvent();

            return true;
        }

        /// <summary>
        /// Điểm mở rộng: gọi đúng 1 lần khi vừa spawn đủ số quái tối đa (_maxTotalMonsters).
        /// Thêm logic của bạn ở đây (hiện popup, mở màn kế tiếp, khoá nút spawn, v.v.)
        /// </summary>
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

        private void HideVfx()
        {
            if (_vfxSpawn != null && _vfxSpawn.activeSelf)
            {
                _vfxSpawn.SetActive(false);
            }
        }

        #endregion

        #region Input / Raycast

        /// <summary>
        /// Tap chỉ được tính khi nhấc tay lên (Ended/mouse up) VÀ trong lúc chạm không di chuyển quá
        /// _swipeThreshold. Nếu di chuyển quá ngưỡng thì coi là vuốt (look/swipe qua TouchController) -
        /// không spawn quái. Không thể quyết định ngay lúc chạm xuống vì lúc đó chưa biết ngón tay có
        /// vuốt hay không.
        /// </summary>
        private bool TryGetTapPosition(out Vector2 screenPosition)
        {
            screenPosition = Vector2.zero;

            if (Input.touchCount > 0)
            {
                Touch touch = Input.GetTouch(0);

                switch (touch.phase)
                {
                    case TouchPhase.Began:
                        BeginPointerTracking(touch.position);
                        return false;

                    case TouchPhase.Ended:
                        return EndPointerTracking(touch.position, out screenPosition);

                    case TouchPhase.Canceled:
                        _isPointerDown = false;
                        _isSwipe = false;
                        return false;

                    default:
                        UpdateSwipeState(touch.position);
                        return false;
                }
            }

            if (Input.GetMouseButtonDown(0))
            {
                BeginPointerTracking(Input.mousePosition);
                return false;
            }

            if (Input.GetMouseButtonUp(0))
            {
                return EndPointerTracking(Input.mousePosition, out screenPosition);
            }

            if (_isPointerDown && Input.GetMouseButton(0))
            {
                UpdateSwipeState(Input.mousePosition);
            }

            return false;
        }

        private void BeginPointerTracking(Vector2 position)
        {
            _pointerDownPosition = position;
            _isPointerDown = true;
            _isSwipe = false;
        }

        private void UpdateSwipeState(Vector2 currentPosition)
        {
            if (!_isPointerDown || _isSwipe)
            {
                return;
            }

            _isSwipe = (currentPosition - _pointerDownPosition).sqrMagnitude
                       > _swipeThreshold * _swipeThreshold;
        }

        private bool EndPointerTracking(Vector2 position, out Vector2 screenPosition)
        {
            screenPosition = Vector2.zero;

            if (!_isPointerDown)
            {
                return false;
            }

            UpdateSwipeState(position);

            bool wasSwipe = _isSwipe;
            _isPointerDown = false;
            _isSwipe = false;

            if (wasSwipe)
            {
                return false;
            }

            screenPosition = position;
            return true;
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

            for (int i = 0; i < _raycastResults.Count; i++)
            {
                GameObject hitObject = _raycastResults[i].gameObject;

                if (hitObject.GetComponentInParent<Selectable>() != null)
                {
                    return true;
                }

                GameObject pointerDownHandler = ExecuteEvents.GetEventHandler<IPointerDownHandler>(hitObject);
                GameObject dragHandler = ExecuteEvents.GetEventHandler<IDragHandler>(hitObject);
                GameObject clickHandler = ExecuteEvents.GetEventHandler<IPointerClickHandler>(hitObject);

                if (IsBlockedUiHandler(pointerDownHandler) ||
                    IsBlockedUiHandler(dragHandler) ||
                    IsBlockedUiHandler(clickHandler))
                {
                    return true;
                }
            }

            return false;
        }

        private static bool IsBlockedUiHandler(GameObject handlerObject)
        {
            return handlerObject != null && handlerObject.GetComponent<TouchController>() == null;
        }

        private void ResolveUiCamera()
        {
            if (_uiCanvas == null)
            {
                RectTransform reference = GetSpawnPoint(0);

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

            bool hitCollider = Physics.Raycast(
                ray,
                out RaycastHit hit,
                _rayMaxDistance,
                _groundMask,
                QueryTriggerInteraction.Ignore);

            bool hitPlane = false;

            if (hitCollider)
            {
                worldPosition = hit.point;
            }
            else
            {
                hitPlane = _groundPlane.Raycast(ray, out float distance);

                if (hitPlane)
                {
                    worldPosition = ray.GetPoint(distance);
                }
            }


            return hitCollider || hitPlane;
        }

        // [SCALE DEBUG] tạm thời, xoá sau khi xác định xong nguyên nhân
        private void LogScreenSizeIfChanged()
        {
            if (Screen.width == _lastLoggedScreenWidth && Screen.height == _lastLoggedScreenHeight)
            {
                return;
            }

            _lastLoggedScreenWidth = Screen.width;
            _lastLoggedScreenHeight = Screen.height;
        }

        #endregion
    }
}
