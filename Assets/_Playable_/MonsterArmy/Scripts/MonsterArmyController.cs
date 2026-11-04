using System.Collections;
using System.Collections.Generic;
using Playable.MonsterArmy.Core;
using UnityEngine;
using UnityEngine.UI;

namespace Playable.MonsterArmy
{
    /// <summary>Coordinates placement, battle, death and playable lifetime.</summary>
    public sealed class MonsterArmyController : MonoBehaviour
    {
        private const int HeroVariantSeed = 777;

        [SerializeField] private ArenaGrid _grid;
        [SerializeField] private MonsterHotbar _hotbar;
        [SerializeField] private DragPlacer _dragPlacer;
        [SerializeField] private TutorialDirector _tutorial;
        [SerializeField] private ChaosDirector _chaos;
        [SerializeField] private VfxPool _vfx;
        [SerializeField] private CombatAudio _audio;
        [SerializeField] private BossUnit _boss;
        [SerializeField] private BossHealthBar _bossHealthBar;
        [SerializeField] private MonsterArtLibrary _art;
        [SerializeField] private Camera _worldCamera;

        [SerializeField] private Button _startButton;
        [SerializeField] private RectTransform _startButtonRect;
        [SerializeField] private float _bossMaxHealth = 9000f;
        [SerializeField] private int _poolSize = 40;

        private PlacementGrid _placement;
        private readonly List<MonsterUnit> _pool = new List<MonsterUnit>();
        private readonly List<MonsterUnit> _live = new List<MonsterUnit>();
        private int _corpseCount;
        private int _spawnCounter;
        private bool _battleStarted;
        private GameManager _gameManager;
        private ArenaCameraFitter _cameraFitter;
        private bool _ended;

        private void Awake()
        {
            // Unity TMP and Luna TMP use different UV channels for SDF scale.
            Canvas canvas = _hotbar != null ? _hotbar.GetComponentInParent<Canvas>() : null;
            if (canvas != null)
            {
                foreach (TMPro.TMP_Text label in canvas.GetComponentsInChildren<TMPro.TMP_Text>(true))
                {
                    Material material = label.fontSharedMaterial;
                    if (material == null || !material.HasProperty("_LunaLegacyUV")) continue;
#if TR_LUNA_TMP_UV
                    material.SetFloat("_LunaLegacyUV", 1f);
#else
                    material.SetFloat("_LunaLegacyUV", 0f);
#endif
                }
            }

            _gameManager = GetComponent<GameManager>();
            if (_gameManager == null) return;
            _gameManager.DeferCountdownUntilGameplay();
            _gameManager.GameEnded += HandleGameEnded;
        }

        private void HandleGameEnded()
        {
            _ended = true;
            StopAllCoroutines();
            _dragPlacer.CancelDrag();
            _dragPlacer.enabled = false;
            _hotbar.gameObject.SetActive(false);
            _tutorial.StopHints();
            _boss.StopBattle();
            _audio?.StopBattle();
            foreach (MonsterUnit unit in _live) unit.BattleActive = false;
            _startButton.gameObject.SetActive(false);
        }

        private void Start()
        {
            _cameraFitter = _worldCamera.GetComponentInParent<ArenaCameraFitter>();
            _placement = new PlacementGrid(_grid.Columns, _grid.Rows);
            UpdateBattleOrientation();

            BuildPool();

            _boss.Initialise(_bossMaxHealth, () => _live, () => _corpseCount);
            _bossHealthBar.Bind(_boss.Health, _boss, _worldCamera);
            _boss.OnReachedFloor += HandleBossReachedFloor;

            _dragPlacer.Initialise(_worldCamera, _grid, _placement, () => _live, _art);
            _dragPlacer.OnUnitMoved += HandleUnitMoved;
            _dragPlacer.OnSpeciesDropped += HandleSpeciesDropped;
            _dragPlacer.OnDropRejected += HandleDropRejected;

            _hotbar.OnSelectionTouched += _tutorial.NotifySelectionTouched;
            _hotbar.OnSlotDragBegin += HandleSlotDragBegin;
            _hotbar.OnSlotTapped += HandleSlotTapped;
            _startButton.onClick.AddListener(HandleStartPressed);

            // Nút START chỉ hiện khi đội quân đã đủ đông.
            _startButton.gameObject.SetActive(false);

            SpawnHero();
            _tutorial.Begin(_startButtonRect);
            RefreshChaos();
        }

        private void BuildPool()
        {
            for (int i = 0; i < _poolSize; i++)
            {
                var go = new GameObject("Monster " + i);
                go.transform.SetParent(transform, false);
                go.SetActive(false);

                MonsterRig rig = go.AddComponent<MonsterRig>();
                rig.SetLibrary(_art);

                MonsterUnit unit = go.AddComponent<MonsterUnit>();
                unit.Configure(_vfx, _audio);
                unit.OnDied += HandleUnitDied;

                _pool.Add(unit);
            }
        }

        /// <summary>Spawns the opening character once, without respawning after death.</summary>
        private void SpawnHero()
        {
            MonsterUnit unit = TakeFromPool();
            if (unit == null) return;

            int column = _grid.Columns / 2;
            int row = 0;
            if (!_placement.TryOccupy(column, row) &&
                !_placement.TryOccupyNearestFree(column, row, out column, out row))
                return;

            unit.Column = column;
            unit.Row = row;
            unit.Spawn(MonsterRoster.HeroSpecies, HeroVariantSeed, _grid.CellToWorld(column, row), _boss);
            unit.BattleActive = _battleStarted;

            _live.Add(unit);
            RefreshChaos();
        }

        /// <summary>Người chơi nhấn xuống một ô trong thanh chọn: bắt đầu kéo.</summary>
        private void HandleSlotDragBegin(MonsterSpecies species)
        {
            if (_ended || _battleStarted || _placement.IsFull)
            {
                _hotbar.RejectDrop();
                return;
            }

            _dragPlacer.BeginSpeciesDrag(species, _spawnCounter);
        }

        private void HandleSlotTapped(MonsterSpecies species)
        {
            if (_ended || _battleStarted) return;
            for (int row = 0; row < _grid.Rows; row++)
            for (int column = 0; column < _grid.Columns; column++)
            {
                if (_placement.IsOccupied(column, row)) continue;
                HandleSpeciesDropped(species, column, row);
                return;
            }
            _hotbar.RejectDrop();
        }

        private void HandleDropRejected()
        {
            _hotbar.RejectDrop();
        }

        /// <summary>Thả một ô từ thanh chọn xuống đúng ô lưới người chơi chỉ.</summary>
        private void HandleSpeciesDropped(MonsterSpecies species, int column, int row)
        {
            if (_ended || _battleStarted) return;
            if (!_placement.TryOccupy(column, row))
            {
                _hotbar.RejectDrop();
                return;
            }

            MonsterUnit unit = TakeFromPool();
            if (unit == null)
            {
                _placement.Release(column, row);
                _hotbar.RejectDrop();
                return;
            }

            unit.Column = column;
            unit.Row = row;
            unit.Spawn(species, _spawnCounter++, _grid.CellToWorld(column, row), _boss);
            // Quái thả thêm giữa trận phải xông lên ngay, không đứng chờ.
            unit.BattleActive = _battleStarted;

            _live.Add(unit);
            _audio?.PlayAddItem();
            _audio?.PlayMonsterVoice();

            // Thả quái là một thao tác có ý nghĩa: đồng hồ bỏ bê phải reset, nếu không
            // người chơi đang xếp đội hình sẽ bị chốt thời gian đẩy vào trận.
            _tutorial.NotifyMonsterPlaced();
            RefreshStartButton();
            RefreshChaos();
        }

        private void HandleUnitMoved(MonsterUnit unit, int column, int row)
        {
            // Đổi chỗ không tính là đặt thêm quân — chỉ reset đồng hồ chần chừ.
            _tutorial.NotifyActivity();
        }

        /// <summary>Nút START xuất hiện khi tutorial báo đã đủ quân.</summary>
        private void RefreshStartButton()
        {
            if (_startButton == null || _battleStarted) return;
            _startButton.gameObject.SetActive(_tutorial.ShowStartButton);
        }

        private void UpdateBattleOrientation()
        {
            bool landscape = Screen.width >= Screen.height;
            if (landscape == _grid.IsLandscape) return;
            _dragPlacer.CancelDrag();
            Vector3 center = _grid.Center;
            Vector3 delta = _boss.transform.position - center;
            _boss.transform.position = center + RotateLayout(delta, landscape);
            foreach (MonsterUnit unit in _pool)
            {
                if (unit == null || !unit.gameObject.activeSelf) continue;
                unit.transform.position = center + RotateLayout(unit.transform.position - center, landscape);
            }
            _grid.SetLandscape(landscape);
            _boss.SetBattleOrientation(landscape);
        }

        private static Vector3 RotateLayout(Vector3 offset, bool landscape)
        {
            return landscape ? new Vector3(offset.y, -offset.x, offset.z)
                : new Vector3(-offset.y, offset.x, offset.z);
        }

        // Visibility follows successful placements; battle starts only on player input.
        private void Update()
        {
            if (_ended) return;
            UpdateBattleOrientation();
            if (_battleStarted || _tutorial == null) return;

            RefreshStartButton();

        }

        private void HandleStartPressed()
        {
            if (_ended || _battleStarted || _tutorial == null || !_tutorial.ShowStartButton) return;
            _audio?.PlayClick();
            _tutorial.NotifyStartPressed();
            _battleStarted = true;
            _dragPlacer.CancelDrag();
            _dragPlacer.AllowPlacedUnitDrag = false;
            _dragPlacer.enabled = false;
            _hotbar.gameObject.SetActive(false);
            _tutorial.StopHints();
            _chaos?.HideOverlays();
            _cameraFitter?.BeginBattle();
            _gameManager?.BeginGameplayCountdown();
            _audio?.StartBattle();

            foreach (MonsterUnit unit in _live)
                if (unit != null)
                    unit.BattleActive = true;

            // Boss cũng lao xuống: hai bên xông vào nhau.
            if (_boss != null) _boss.BattleActive = true;

            if (_startButton != null) _startButton.gameObject.SetActive(false);
        }

        private void HandleUnitDied(MonsterUnit unit)
        {
            if (!_live.Remove(unit)) return;
            _corpseCount++;
            _placement.Release(unit.Column, unit.Row);
            unit.Column = -1;
            unit.Row = -1;
            RefreshChaos();

            if (_battleStarted && !_ended && _live.Count == 0)
            {
                // Cancel the timeout so it cannot cover the final death animation.
                _gameManager?.DeferCountdownUntilGameplay();
                HandleGameEnded();
                StartCoroutine(ShowDefeatEndcard());
            }
        }

        private IEnumerator ShowDefeatEndcard()
        {
            yield return new WaitForSecondsRealtime(2f);
            if (_gameManager != null) _gameManager.EndGame();
        }

        private void HandleBossReachedFloor()
        {
            if (!_battleStarted) _bossHealthBar.PlayDangerPulse();
            _chaos?.Shake(1.6f);
        }

        private void RefreshChaos()
        {
            _chaos?.SetLiveMonsterCount(_live.Count);
        }

        private MonsterUnit TakeFromPool()
        {
            foreach (MonsterUnit unit in _pool)
                if (!unit.IsAlive && !unit.gameObject.activeSelf)
                    return unit;

            return null;
        }

        private void OnDestroy()
        {
            if (_gameManager != null) _gameManager.GameEnded -= HandleGameEnded;
            if (_hotbar != null)
            {
                _hotbar.OnSlotDragBegin -= HandleSlotDragBegin;
                _hotbar.OnSlotTapped -= HandleSlotTapped;
                if (_tutorial != null) _hotbar.OnSelectionTouched -= _tutorial.NotifySelectionTouched;
            }
            if (_dragPlacer != null)
            {
                _dragPlacer.OnUnitMoved -= HandleUnitMoved;
                _dragPlacer.OnSpeciesDropped -= HandleSpeciesDropped;
                _dragPlacer.OnDropRejected -= HandleDropRejected;
            }
            if (_boss != null) _boss.OnReachedFloor -= HandleBossReachedFloor;
            if (_startButton != null) _startButton.onClick.RemoveListener(HandleStartPressed);

            foreach (MonsterUnit unit in _pool)
                if (unit != null)
                    unit.OnDied -= HandleUnitDied;
        }
    }
}
