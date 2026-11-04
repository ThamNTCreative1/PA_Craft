using UnityEngine;

namespace Playable.MonsterArmy
{
    [DefaultExecutionOrder(50)]
    public sealed class ArenaCameraFitter : MonoBehaviour
    {
        [SerializeField] private Transform _rig;
        [SerializeField] private Camera _camera;
        [SerializeField] private ArenaGrid _grid;
        [SerializeField] private Transform _boss;
        [SerializeField] private SpriteRenderer _floor;
        [SerializeField] private float _bossHalfHeight = 2.55f;
        [SerializeField] private MonsterHotbar _hotbar;
        [SerializeField] private float _hotbarWidthFraction = 0.24f;
        [SerializeField] private float _minSize = 3f;
        private bool _battleView;
        private Vector3 _battleBossOffset, _battleBossVisualOffset, _battleBossSize;
        private bool _battleLandscape;
        private Vector2 _screen;

        public void BeginBattle()
        {
            if (_boss == null || _grid == null) return;
            Vector3 offset = _boss.position - _grid.Center;
            _battleBossOffset = _grid.IsLandscape ? new Vector3(-offset.y, offset.x, offset.z) : offset;
            var rig = _boss.GetComponent<MonsterRig>();
            Bounds bossBounds = rig != null ? rig.WorldBounds : new Bounds(_boss.position, Vector3.one * _bossHalfHeight * 2f);
            _battleBossVisualOffset = bossBounds.center - _boss.position;
            _battleBossSize = bossBounds.size;
            _battleView = true;
            FitBattle();
        }
        private Rect _safeArea;
        private float _lastHotbarWidth = -1f, _lastHotbarTop = -1f;

        private void Awake()
        {
            if (_camera == null) _camera = GetComponentInChildren<Camera>();
            if (_rig == null) _rig = transform;
            if (_camera != null) _camera.orthographic = true;
        }

        private void LateUpdate()
        {
            if (_battleView)
            {
                if (_screen != new Vector2(Screen.width, Screen.height) || _safeArea != Screen.safeArea
                    || _battleLandscape != _grid.IsLandscape) FitBattle();
                return;
            }
            if (_hotbar != null) _hotbar.Relayout();
            Vector2 screen = new Vector2(Screen.width, Screen.height);
            float width = _hotbar != null ? _hotbar.WidthFraction : _hotbarWidthFraction;
            float top = _hotbar != null ? _hotbar.TopFraction : 0f;
            if (_screen == screen && _safeArea == Screen.safeArea
                && Mathf.Abs(width - _lastHotbarWidth) < 0.001f
                && Mathf.Abs(top - _lastHotbarTop) < 0.001f) return;
            _screen = screen;
            _safeArea = Screen.safeArea;
            _lastHotbarWidth = width;
            _lastHotbarTop = top;
            Fit();
        }

        private void FitBattle()
        {
            if (_camera == null || _boss == null || Screen.width <= 0 || Screen.height <= 0) return;
            // Snapshot the deployment area, so combat movement and deaths never change zoom.
            Vector3 bossOffset = _grid.IsLandscape
                ? new Vector3(_battleBossOffset.y, -_battleBossOffset.x, _battleBossOffset.z)
                : _battleBossOffset;
            Bounds content = _grid.WorldBounds;
            content.Encapsulate(new Bounds(_grid.Center + bossOffset + _battleBossVisualOffset, _battleBossSize));
            content.Expand(0.8f);
            Rect safe = Screen.safeArea;
            if (safe.width <= 0 || safe.height <= 0) safe = new Rect(0, 0, Screen.width, Screen.height);
            float aspect = (float)Screen.width / Screen.height;
            float width = Mathf.Max(0.1f, safe.width / Screen.width * 0.94f);
            float height = Mathf.Max(0.1f, safe.height / Screen.height * 0.94f);
            float size = Mathf.Max(_minSize, content.size.y * 0.5f / height,
                content.size.x * 0.5f / (aspect * width));
            _camera.orthographicSize = size;
            Vector3 position = _rig.position;
            float x = content.center.x - (safe.center.x / Screen.width * 2f - 1f) * size * aspect;
            float y = content.center.y - (safe.center.y / Screen.height * 2f - 1f) * size;
            position = new Vector3(x, y, position.z);
            _screen = new Vector2(Screen.width, Screen.height);
            _safeArea = Screen.safeArea;
            _battleLandscape = _grid.IsLandscape;
            _rig.position = position;
            if (_floor != null)
            {
                _floor.size = new Vector2(_camera.orthographicSize * aspect * 2f + 4f,
                    _camera.orthographicSize * 2f + 4f);
                Vector3 floorPosition = _floor.transform.position;
                _floor.transform.position = new Vector3(position.x, position.y, floorPosition.z);
            }
        }

        public void Fit()
        {
            if (_battleView) { FitBattle(); return; }
            if (_camera == null || _grid == null || Screen.width <= 0 || Screen.height <= 0) return;
            if (_hotbar != null) _hotbar.Relayout();
            Bounds content = _grid.WorldBounds;
            if (_boss != null)
            {
                content.Encapsulate(_boss.position + Vector3.up * _bossHalfHeight);
                content.Encapsulate(_boss.position - Vector3.up * _bossHalfHeight);
                content.Encapsulate(_boss.position + Vector3.right * _bossHalfHeight);
                content.Encapsulate(_boss.position - Vector3.right * _bossHalfHeight);
            }
            content.Expand(0.4f);
            Rect safe = Screen.safeArea;
            if (safe.width <= 0 || safe.height <= 0) safe = new Rect(0, 0, Screen.width, Screen.height);
            bool portrait = Screen.height > Screen.width;
            float left = safe.xMin / Screen.width + 0.02f;
            float right = safe.xMax / Screen.width - 0.02f;
            float bottom = (safe.yMin + safe.height * (portrait ? 0.12f : 0.02f)) / Screen.height;
            float top = (safe.yMin + safe.height * (portrait ? 0.80f : 0.85f)) / Screen.height;
            if (portrait)
                bottom = Mathf.Max(bottom, (_hotbar != null ? _hotbar.TopFraction : 0.28f) + 0.02f);
            else
                left = Mathf.Max(left, (_hotbar != null ? _hotbar.WidthFraction : _hotbarWidthFraction) + 0.02f);
            float aspect = (float)Screen.width / Screen.height;
            float sizeForHeight = content.size.y * 0.5f / Mathf.Max(0.1f, top - bottom);
            float sizeForWidth = content.size.x * 0.5f / (aspect * Mathf.Max(0.1f, right - left));
            _camera.orthographicSize = Mathf.Max(_minSize, sizeForHeight, sizeForWidth);
            Vector3 position = _rig.position;
            position.x = content.center.x - (left + right - 1f) * _camera.orthographicSize * aspect;
            position.y = content.center.y - (bottom + top - 1f) * _camera.orthographicSize;
            _rig.position = position;
            if (_floor != null)
            {
                _floor.drawMode = SpriteDrawMode.Tiled;
                _floor.size = new Vector2(_camera.orthographicSize * aspect * 2f + 4f,
                    _camera.orthographicSize * 2f + 4f);
                Vector3 floorPosition = _floor.transform.position;
                floorPosition.x = position.x;
                floorPosition.y = position.y;
                _floor.transform.position = floorPosition;
            }
        }
    }
}
