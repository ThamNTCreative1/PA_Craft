using UnityEngine;

namespace Playable.MonsterArmy
{
    /// <summary>
    /// Hình học của lưới đặt quái: đổi qua lại giữa chỉ số ô và toạ độ thế giới.
    /// Tách riêng khỏi PlacementGrid (thuần C#, lo việc ô nào đang bị chiếm) để
    /// phần logic vẫn unit test được mà không kéo theo UnityEngine.
    /// </summary>
    public sealed class ArenaGrid : MonoBehaviour
    {
        // Lưới cao và hẹp, không bè ngang. Màn hình quảng cáo chủ yếu là portrait
        // (tỉ lệ ~0.56), nên một lưới rộng buộc camera phải lùi rất xa để lọt bề
        // ngang, và để lộ một khoảng trống mênh mông phía trên dưới.
        [SerializeField] private int _columns = 5;
        [SerializeField] private int _rows = 5;

        // Ô phải cao hơn nhân vật (khoảng 1.3 đơn vị ở PPU 150), nếu không hàng dưới
        // thò đầu lên che hàng trên và đội hình nhìn như một đống chồng chất.
        [SerializeField] private Vector2 _cellSize = new Vector2(2.1f, 2.1f);
        [SerializeField] private Vector2 _originOffset = new Vector2(0f, -1.6f);

        public int Columns => _columns;
        public int Rows => _rows;
        public Vector2 CellSize => _cellSize;

        /// <summary>Tâm ô (0,0) trong toạ độ thế giới — ô dưới cùng bên trái.</summary>
        public bool IsLandscape { get; private set; }
        public Vector3 Center => transform.position + (Vector3)_originOffset;
        public Vector3 Origin => CellToWorld(0, 0);

        public void SetLandscape(bool landscape)
        {
            IsLandscape = landscape;
            Transform markers = transform.Find("Cell Markers");
            if (markers == null) return;
            for (int column = 0; column < _columns; column++)
            for (int row = 0; row < _rows; row++)
            {
                Transform marker = markers.Find("Cell " + column + "," + row);
                if (marker != null) marker.position = CellToWorld(column, row);
            }
        }

        public Vector3 CellToWorld(int column, int row)
        {
            Vector3 offset = new Vector3((column - (_columns - 1) * 0.5f) * _cellSize.x,
                (row - (_rows - 1) * 0.5f) * _cellSize.y, 0f);
            if (IsLandscape) offset = new Vector3(offset.y, -offset.x, 0f);
            return Center + offset;
        }

        public bool WorldToCell(Vector3 world, out int column, out int row)
        {
            Vector3 local = world - Center;
            if (IsLandscape) local = new Vector3(-local.y, local.x, 0f);
            column = Mathf.RoundToInt(local.x / _cellSize.x + (_columns - 1) * 0.5f);
            row = Mathf.RoundToInt(local.y / _cellSize.y + (_rows - 1) * 0.5f);
            return column >= 0 && column < _columns && row >= 0 && row < _rows;
        }

        /// <summary>Ô hợp lệ gần nhất, kể cả khi ngón tay thả ra ngoài rìa lưới.</summary>
        public void ClampToCell(Vector3 world, out int column, out int row)
        {
            WorldToCell(world, out column, out row);
            column = Mathf.Clamp(column, 0, _columns - 1);
            row = Mathf.Clamp(row, 0, _rows - 1);
        }

        /// <summary>
        /// Vùng toàn bộ lưới chiếm, cộng nửa ô đệm mỗi phía. Camera dùng cái này để
        /// bảo đảm lưới luôn nằm trong khung nhìn ở mọi tỉ lệ màn hình.
        /// </summary>
        public Bounds WorldBounds
        {
            get
            {
                Vector3 size = IsLandscape
                    ? new Vector3(_rows * _cellSize.y, _columns * _cellSize.x, 0f)
                    : new Vector3(_columns * _cellSize.x, _rows * _cellSize.y, 0f);
                var bounds = new Bounds(Center, size);
                return bounds;
            }
        }

        private void OnDrawGizmosSelected()
        {
            Gizmos.color = new Color(0.2f, 0.9f, 0.4f, 0.5f);
            for (int column = 0; column < _columns; column++)
            for (int row = 0; row < _rows; row++)
                Gizmos.DrawWireCube(CellToWorld(column, row), new Vector3(_cellSize.x, _cellSize.y, 0.01f));
        }
    }
}
