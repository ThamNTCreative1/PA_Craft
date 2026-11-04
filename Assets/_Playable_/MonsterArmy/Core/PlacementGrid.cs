using System;

namespace Playable.MonsterArmy.Core
{
    /// <summary>
    /// Ô lưới đặt quái trên sàn đấu. Thuần C#, không phụ thuộc UnityEngine.
    /// </summary>
    public sealed class PlacementGrid
    {
        private readonly bool[,] _occupied;

        public PlacementGrid(int columns, int rows)
        {
            if (columns <= 0) throw new ArgumentOutOfRangeException(nameof(columns));
            if (rows <= 0) throw new ArgumentOutOfRangeException(nameof(rows));

            Columns = columns;
            Rows = rows;
            _occupied = new bool[columns, rows];
        }

        public int Columns { get; }
        public int Rows { get; }
        public int OccupiedCount { get; private set; }
        public bool IsFull => OccupiedCount >= Columns * Rows;

        public bool IsOccupied(int column, int row)
        {
            return InBounds(column, row) && _occupied[column, row];
        }

        public bool TryOccupy(int column, int row)
        {
            if (!InBounds(column, row) || _occupied[column, row]) return false;

            _occupied[column, row] = true;
            OccupiedCount++;
            return true;
        }

        public void Release(int column, int row)
        {
            if (!InBounds(column, row) || !_occupied[column, row]) return;

            _occupied[column, row] = false;
            OccupiedCount--;
        }

        /// <summary>
        /// Chiếm ô trống gần ô mong muốn nhất, đo bằng khoảng cách Chebyshev.
        /// Hoà thì ưu tiên hàng nhỏ hơn rồi cột nhỏ hơn — thứ tự cố định để kết quả
        /// lặp lại được giữa các lần chạy.
        /// </summary>
        public bool TryOccupyNearestFree(int preferredColumn, int preferredRow, out int column, out int row)
        {
            column = -1;
            row = -1;
            if (IsFull) return false;

            int maxRing = Math.Max(
                Math.Max(preferredColumn, Columns - 1 - preferredColumn),
                Math.Max(preferredRow, Rows - 1 - preferredRow));

            for (int ring = 0; ring <= maxRing; ring++)
            {
                for (int r = preferredRow - ring; r <= preferredRow + ring; r++)
                for (int c = preferredColumn - ring; c <= preferredColumn + ring; c++)
                {
                    // Chỉ xét viền của vòng hiện tại; phần bên trong đã quét ở vòng trước.
                    bool onRing = Math.Max(Math.Abs(c - preferredColumn), Math.Abs(r - preferredRow)) == ring;
                    if (!onRing || !TryOccupy(c, r)) continue;

                    column = c;
                    row = r;
                    return true;
                }
            }

            return false;
        }

        public bool TryMove(int fromColumn, int fromRow, int toColumn, int toRow)
        {
            if (!IsOccupied(fromColumn, fromRow)) return false;
            if (fromColumn == toColumn && fromRow == toRow) return true;
            if (!InBounds(toColumn, toRow) || _occupied[toColumn, toRow]) return false;

            _occupied[fromColumn, fromRow] = false;
            _occupied[toColumn, toRow] = true;
            return true;
        }

        private bool InBounds(int column, int row)
        {
            return column >= 0 && column < Columns && row >= 0 && row < Rows;
        }
    }
}
