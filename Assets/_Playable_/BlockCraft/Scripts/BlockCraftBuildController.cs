using System.Collections;
using UnityEngine;
using UnityEngine.UI;

namespace Playable
{
    /// <summary>Tap a material to drop one seven-block row into the build area.</summary>
    public class BlockCraftBuildController : MonoBehaviour
    {
        [SerializeField] private GameManager _gameManager;
        [SerializeField] private Button[] _materialButtons;
        [SerializeField] private Image[] _cells;
        [SerializeField] private Sprite[] _frontTiles;
        [SerializeField] private Sprite[] _shadowTiles;
        [SerializeField] private RectTransform _tutorial;
        [SerializeField] private Button _download;
        [SerializeField] private AudioSource _buttonAudio;
        [SerializeField] private BlockCraftDetonation _detonation;
        [SerializeField, Range(0, 6)] private int _initialRows = 0;
        [SerializeField, Min(0.1f)] private float _dropDuration = 0.4f;
        [SerializeField, Min(0f)] private float _columnDelay = 0.045f;

        private int _builtRows;
        private bool _building;
        private readonly int[] _pendingMaterials = new int[6];
        private int _pendingCount;
        private bool _completed;
        private float _lastBuildTapTime = -1f;
        public int BuiltRows => _builtRows;
        public bool IsBuilding => _building;
        public bool IsComplete => _completed;
        private int BuildLimit => _detonation != null ? 6 : _cells.Length / 7;

        private void Start()
        {
            _builtRows = _initialRows;
            for (int i = 0; i < _cells.Length; i++)
            {
                _cells[i].gameObject.SetActive(i / 7 < _initialRows);
                _cells[i].rectTransform.anchoredPosition = CellPosition(i / 7, i % 7);
            }
            for (int i = 0; i < _materialButtons.Length; i++)
            {
                int material = i;
                _materialButtons[i].onClick.AddListener(() => BuildRow(material));
            }
            if (_download != null) _download.onClick.AddListener(Download);
            RefreshButtons();
        }

        private void Update()
        {
            if (_gameManager != null && _gameManager.HasEnded)
            {
                RefreshButtons();
                if (_tutorial != null) _tutorial.gameObject.SetActive(false);
                return;
            }
            if (_tutorial == null || _lastBuildTapTime < 0f) return;
            bool showTutorial = !_completed &&
                _builtRows + _pendingCount + (_building ? 1 : 0) < BuildLimit &&
                Time.unscaledTime - _lastBuildTapTime >= 2f;
            if (_tutorial.gameObject.activeSelf != showTutorial)
                _tutorial.gameObject.SetActive(showTutorial);
        }

        public void BuildRow(int material)
        {
            if (_completed || _builtRows + _pendingCount + (_building ? 1 : 0) >= BuildLimit ||
                material < 0 || material >= _frontTiles.Length ||
                (_gameManager != null && _gameManager.HasEnded)) return;
            if (_gameManager != null) _gameManager.BeginGameplay();
            if (_buttonAudio != null) _buttonAudio.PlayOneShot(_buttonAudio.clip);
            _lastBuildTapTime = Time.unscaledTime;
            if (_tutorial != null) _tutorial.gameObject.SetActive(false);
            _pendingMaterials[_pendingCount++] = material;
            if (!_building) StartCoroutine(BuildPendingRows());
            RefreshButtons();
        }

        private IEnumerator BuildPendingRows()
        {
            _building = true;
            while (_pendingCount > 0)
            {
                int material = _pendingMaterials[0];
                for (int i = 1; i < _pendingCount; i++)
                    _pendingMaterials[i - 1] = _pendingMaterials[i];
                _pendingCount--;
                // The sixth accepted tap builds TNT after the five material rows.
                if (_detonation != null && _builtRows == BuildLimit - 1)
                {
                    _pendingCount = 0;
                    _completed = true;
                    RefreshButtons();
                    yield return _detonation.Play(_cells, _builtRows);
                    break;
                }
                yield return DropRow(material);
                if (_gameManager != null && _gameManager.HasEnded)
                {
                    _pendingCount = 0;
                    break;
                }
            }
            _building = false;
            RefreshButtons();
        }

        private IEnumerator DropRow(int material)
        {
            RefreshButtons();
            int row = _builtRows;
            float elapsed = 0f;
            float duration = _dropDuration + 6f * _columnDelay;
            while (elapsed < duration)
            {
                if (_gameManager != null && _gameManager.HasEnded)
                {
                    for (int column = 0; column < 7; column++)
                        _cells[row * 7 + column].gameObject.SetActive(false);
                    yield break;
                }
                elapsed += Time.deltaTime;
                for (int column = 0; column < 7; column++)
                {
                    Image cell = _cells[row * 7 + column];
                    float t = Mathf.Clamp01((elapsed - column * _columnDelay) / _dropDuration);
                    cell.gameObject.SetActive(elapsed >= column * _columnDelay);
                    cell.sprite = column == 0 || column == 6 ? _frontTiles[material] : _shadowTiles[material];
                    cell.color = material == 3 && column > 0 && column < 6
                        ? new Color(0.6f, 0.6f, 0.6f) : Color.white;
                    cell.rectTransform.anchoredPosition = CellPosition(row, column) +
                        Vector2.up * (320f * (1f - t * t));
                }
                yield return null;
            }
            for (int column = 0; column < 7; column++)
            {
                Image cell = _cells[row * 7 + column];
                cell.rectTransform.anchoredPosition = CellPosition(row, column);
                cell.gameObject.SetActive(true);
            }
            _builtRows++;
        }

        public static Vector2 CellPosition(int row, int column)
        {
            return new Vector2(364f + column * 72f, -884f + (row + 1) * 72f);
        }

        private void RefreshButtons()
        {
            bool enabled = !_completed && _builtRows + _pendingCount + (_building ? 1 : 0) < BuildLimit &&
                (_gameManager == null || !_gameManager.HasEnded);
            for (int i = 0; i < _materialButtons.Length; i++)
                _materialButtons[i].interactable = enabled;
        }

        private void Download()
        {
            if (_gameManager != null) _gameManager.ShowCTA();
        }
    }
}
