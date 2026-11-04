using System;
using System.Collections.Generic;
using Playable.MonsterArmy.Core;
using UnityEngine;
using UnityEngine.UI;

namespace Playable.MonsterArmy
{
    /// <summary>
    /// Kéo thả trên sàn đấu. Hai nguồn kéo:
    ///
    ///  - từ thanh chọn xuống: sinh nhân vật mới tại ô thả (thao tác chính, cũng là
    ///    thứ duy nhất tutorial phải dạy)
    ///  - từ một nhân vật đã đặt: đổi chỗ nó
    ///
    /// Nhặt nhân vật theo khoảng cách tới con gần nhất chứ không dùng Collider2D:
    /// vài chục unit thì quét tuyến tính rẻ hơn nhiều so với dựng cả hệ vật lý.
    /// </summary>
    [DefaultExecutionOrder(200)]
    public sealed class DragPlacer : MonoBehaviour
    {
        [SerializeField] private Camera _camera;
        [SerializeField] private ArenaGrid _grid;
        [SerializeField] private SpriteRenderer _cellHighlight;
        private MonsterRig _dragPreview;
        private GameObject _previewCanvas;
        private RectTransform _previewRoot;
        private SpriteRenderer[] _previewParts;
        private readonly List<Image> _previewImages = new List<Image>();
        [SerializeField] private float _pickRadius = 0.6f;

        private Func<IReadOnlyList<MonsterUnit>> _liveMonsters;
        private PlacementGrid _placement;
        private MonsterUnit _dragging;
        private MonsterSpecies _pendingSpecies;
        private bool _spawningFromHotbar;

        public bool AllowPlacedUnitDrag { get; set; } = true;
        public bool IsDragging => _dragging != null || _spawningFromHotbar;

        /// <summary>unit, cột mới, hàng mới — khi một nhân vật đã đặt được chuyển chỗ.</summary>
        public event Action<MonsterUnit, int, int> OnUnitMoved;

        /// <summary>loài, cột, hàng — khi người chơi thả một ô từ thanh chọn xuống sàn.</summary>
        public event Action<MonsterSpecies, int, int> OnSpeciesDropped;

        /// <summary>Thả ra ngoài lưới hoặc vào ô đã có người.</summary>
        public event Action OnDropRejected;

        public void Initialise(Camera camera, ArenaGrid grid, PlacementGrid placement,
            Func<IReadOnlyList<MonsterUnit>> liveMonsters, MonsterArtLibrary art)
        {
            _camera = camera;
            _grid = grid;
            _placement = placement;
            _liveMonsters = liveMonsters;
            if (_dragPreview == null)
            {
                var preview = new GameObject("Dragged Monster Preview");
                preview.transform.SetParent(transform, false);
                preview.SetActive(false);
                _dragPreview = preview.AddComponent<MonsterRig>();
            }
            _dragPreview.SetLibrary(art);
            CancelDrag();
        }

        /// <summary>Thanh chọn báo rằng người chơi vừa nhấn xuống một ô.</summary>
        public void BeginSpeciesDrag(MonsterSpecies species, int variantSeed)
        {
            if (_camera == null || _placement == null || _dragPreview == null) return;
            CancelDrag();
            _spawningFromHotbar = true;
            _pendingSpecies = species;
            _dragPreview.ResetForReuse();
            _dragPreview.Build(species, variantSeed);
            _dragPreview.transform.localScale = Vector3.one * MonsterUnit.SpawnScale;
            _dragPreview.SetSortingOrder(19000);
            _dragPreview.gameObject.SetActive(true);
            PrepareUiPreview();
            UpdateDragPosition(PointerWorld());
            SyncUiPreview();
        }

        private void PrepareUiPreview()
        {
            if (_previewCanvas == null)
            {
                _previewCanvas = new GameObject("Monster Drag Overlay", typeof(RectTransform), typeof(Canvas));
                _previewCanvas.transform.SetParent(transform, false);
                _previewRoot = (RectTransform)_previewCanvas.transform;
                Canvas canvas = _previewCanvas.GetComponent<Canvas>();
                canvas.renderMode = RenderMode.ScreenSpaceOverlay;
                canvas.sortingOrder = 32760;
                // No raycaster: the preview cannot intercept pointer events.
            }
            _previewParts = _dragPreview.GetComponentsInChildren<SpriteRenderer>(true);
            Array.Sort(_previewParts, (a, b) => a.sortingOrder.CompareTo(b.sortingOrder));
            while (_previewImages.Count < _previewParts.Length)
            {
                var part = new GameObject("Drag Part", typeof(RectTransform), typeof(CanvasRenderer), typeof(Image));
                part.transform.SetParent(_previewRoot, false);
                var image = part.GetComponent<Image>();
                image.raycastTarget = false;
                image.rectTransform.anchorMin = image.rectTransform.anchorMax = image.rectTransform.pivot = new Vector2(0.5f, 0.5f);
                _previewImages.Add(image);
            }
            for (int i = 0; i < _previewImages.Count; i++)
            {
                bool visible = i < _previewParts.Length;
                _previewImages[i].gameObject.SetActive(visible);
                if (!visible) continue;
                _previewImages[i].sprite = _previewParts[i].sprite;
                _previewImages[i].color = _previewParts[i].color;
                _previewParts[i].enabled = false;
            }
            _previewCanvas.SetActive(true);
            Canvas.ForceUpdateCanvases();
        }

        private void LateUpdate()
        {
            if (_spawningFromHotbar) SyncUiPreview();
        }

        private void SyncUiPreview()
        {
            if (_previewParts == null || _previewRoot == null || !_spawningFromHotbar) return;
            for (int i = 0; i < _previewParts.Length; i++)
            {
                SpriteRenderer part = _previewParts[i];
                if (part == null || part.sprite == null) continue;
                Bounds bounds = part.sprite.bounds;
                Vector3 center = part.transform.TransformPoint(bounds.center);
                Vector3 screen = _camera.WorldToScreenPoint(center);
                Vector3 right = _camera.WorldToScreenPoint(center + part.transform.TransformVector(Vector3.right * bounds.size.x));
                Vector3 up = _camera.WorldToScreenPoint(center + part.transform.TransformVector(Vector3.up * bounds.size.y));
                Vector2 local;
                if (!RectTransformUtility.ScreenPointToLocalPointInRectangle(_previewRoot, screen, null, out local)) continue;
                RectTransform rect = _previewImages[i].rectTransform;
                rect.anchoredPosition = local;
                rect.sizeDelta = new Vector2(Vector2.Distance(screen, right), Vector2.Distance(screen, up));
                rect.localRotation = Quaternion.Euler(0f, 0f, Mathf.Atan2(right.y - screen.y, right.x - screen.x) * Mathf.Rad2Deg);
            }
        }

        private void Update()
        {
            if (_camera == null || _grid == null || _placement == null) return;
            if (_dragging != null && !_dragging.IsAlive) CancelDrag();

            if (Input.GetMouseButtonDown(0) && !_spawningFromHotbar) TryPickPlacedUnit();
            else if (Input.GetMouseButton(0) && IsDragging) Drag();
            else if (Input.GetMouseButtonUp(0) && IsDragging) Drop();
        }

        private void TryPickPlacedUnit()
        {
            if (!AllowPlacedUnitDrag) return;
            if (UnityEngine.EventSystems.EventSystem.current != null &&
                UnityEngine.EventSystems.EventSystem.current.IsPointerOverGameObject()) return;
            Vector3 world = PointerWorld();
            MonsterUnit nearest = null;
            float nearestDistance = _pickRadius * _pickRadius;

            foreach (MonsterUnit unit in Live())
            {
                if (unit == null || !unit.IsAlive) continue;

                float distance = ((Vector2)(unit.transform.position - world)).sqrMagnitude;
                if (distance >= nearestDistance) continue;

                nearestDistance = distance;
                nearest = unit;
            }

            if (nearest == null) return;

            _dragging = nearest;
            UpdateDragPosition(world);
        }

        private void Drag()
        {
            UpdateDragPosition(PointerWorld());
        }

        private void UpdateDragPosition(Vector3 world)
        {
            world.z = 0f;
            if (_dragging != null) _dragging.MoveTo(world);
            else if (_dragPreview != null && _spawningFromHotbar) _dragPreview.transform.position = world;

            // Outside the map there is a character preview, but no highlighted edge cell.
            bool insideGrid = _grid.WorldToCell(world, out int column, out int row);
            ShowHighlight(insideGrid);
            if (!insideGrid || _cellHighlight == null) return;

            bool free = !_placement.IsOccupied(column, row)
                        || (_dragging != null && column == _dragging.Column && row == _dragging.Row);
            _cellHighlight.transform.position = _grid.CellToWorld(column, row);
            _cellHighlight.color = free
                ? new Color(1f, 0.93f, 0.25f, 0.95f)
                : new Color(1f, 0.3f, 0.22f, 0.8f);
        }

        private void Drop()
        {
            Vector3 world = PointerWorld();
            bool insideGrid = _grid.WorldToCell(world, out int column, out int row);

            MonsterUnit moved = _dragging;
            bool fromHotbar = _spawningFromHotbar;
            MonsterSpecies species = _pendingSpecies;

            _dragging = null;
            _spawningFromHotbar = false;
            if (_dragPreview != null) _dragPreview.gameObject.SetActive(false);
            if (_previewCanvas != null) _previewCanvas.SetActive(false);
            ShowHighlight(false);

            if (fromHotbar)
            {
                // Thả ngoài lưới hoặc vào ô đã có người thì không sinh gì cả.
                if (!insideGrid || _placement.IsOccupied(column, row))
                {
                    OnDropRejected?.Invoke();
                    return;
                }

                OnSpeciesDropped?.Invoke(species, column, row);
                return;
            }

            if (moved == null || !moved.IsAlive) return;

            if (!insideGrid || !_placement.TryMove(moved.Column, moved.Row, column, row))
            {
                // Thả không hợp lệ: bật về đúng ô cũ, không để unit lơ lửng giữa lưới.
                moved.MoveTo(_grid.CellToWorld(moved.Column, moved.Row));
                return;
            }

            moved.Column = column;
            moved.Row = row;
            moved.MoveTo(_grid.CellToWorld(column, row));
            OnUnitMoved?.Invoke(moved, column, row);
        }

        public void CancelDrag()
        {
            if (_dragging != null && _dragging.IsAlive && _dragging.Column >= 0)
                _dragging.MoveTo(_grid.CellToWorld(_dragging.Column, _dragging.Row));
            _dragging = null;
            _spawningFromHotbar = false;
            if (_dragPreview != null) _dragPreview.gameObject.SetActive(false);
            if (_previewCanvas != null) _previewCanvas.SetActive(false);
            ShowHighlight(false);
        }

        private void OnDisable() => CancelDrag();

        private void ShowHighlight(bool visible)
        {
            if (_cellHighlight != null) _cellHighlight.enabled = visible;
        }

        private Vector3 PointerWorld()
        {
            Vector3 screen = Input.mousePosition;
            screen.z = Mathf.Abs(_camera.transform.position.z);
            Vector3 world = _camera.ScreenToWorldPoint(screen);
            world.z = 0f;
            return world;
        }

        private IReadOnlyList<MonsterUnit> Live()
        {
            return _liveMonsters?.Invoke() ?? EmptyMonsters;
        }

        private static readonly IReadOnlyList<MonsterUnit> EmptyMonsters = new List<MonsterUnit>(0);
    }
}
