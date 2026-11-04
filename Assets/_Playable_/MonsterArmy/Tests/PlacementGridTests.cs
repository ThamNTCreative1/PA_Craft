using NUnit.Framework;
using Playable.MonsterArmy.Core;

namespace Playable.MonsterArmy.Tests
{
    public class PlacementGridTests
    {
        // 6x4 = 24 cells, the starting layout from the spec.
        private static PlacementGrid NewGrid() => new PlacementGrid(6, 4);

        private static PlacementGrid FullGrid()
        {
            PlacementGrid grid = NewGrid();
            for (int column = 0; column < grid.Columns; column++)
            for (int row = 0; row < grid.Rows; row++)
                grid.TryOccupy(column, row);
            return grid;
        }

        [Test]
        public void NewGrid_HasNothingOccupied()
        {
            PlacementGrid grid = NewGrid();

            Assert.AreEqual(0, grid.OccupiedCount);
            Assert.IsFalse(grid.IsFull);
            Assert.IsFalse(grid.IsOccupied(0, 0));
        }

        [Test]
        public void TryOccupy_MarksCellOccupied()
        {
            PlacementGrid grid = NewGrid();

            Assert.IsTrue(grid.TryOccupy(2, 1));

            Assert.IsTrue(grid.IsOccupied(2, 1));
            Assert.AreEqual(1, grid.OccupiedCount);
        }

        [Test]
        public void TryOccupy_SameCellTwice_ReturnsFalse()
        {
            PlacementGrid grid = NewGrid();
            grid.TryOccupy(2, 1);

            Assert.IsFalse(grid.TryOccupy(2, 1));
            Assert.AreEqual(1, grid.OccupiedCount);
        }

        [Test]
        public void TryOccupyNearestFree_PreferredCellFree_ReturnsPreferred()
        {
            PlacementGrid grid = NewGrid();

            Assert.IsTrue(grid.TryOccupyNearestFree(3, 2, out int column, out int row));

            Assert.AreEqual(3, column);
            Assert.AreEqual(2, row);
        }

        [Test]
        public void TryOccupyNearestFree_PreferredCellTaken_ReturnsAdjacentCell()
        {
            PlacementGrid grid = NewGrid();
            grid.TryOccupy(3, 2);

            Assert.IsTrue(grid.TryOccupyNearestFree(3, 2, out int column, out int row));

            Assert.IsFalse(column == 3 && row == 2, "must not hand out the occupied cell");
            int distance = System.Math.Max(System.Math.Abs(column - 3), System.Math.Abs(row - 2));
            Assert.AreEqual(1, distance, "nearest free cell is one ring out");
            Assert.AreEqual(2, grid.OccupiedCount);
        }

        [Test]
        public void Release_MakesCellAvailableAgain()
        {
            PlacementGrid grid = NewGrid();
            grid.TryOccupy(4, 3);

            grid.Release(4, 3);

            Assert.IsFalse(grid.IsOccupied(4, 3));
            Assert.AreEqual(0, grid.OccupiedCount);
            Assert.IsTrue(grid.TryOccupy(4, 3));
        }

        [Test]
        public void TryMove_ToFreeCell_MovesOccupancy()
        {
            PlacementGrid grid = NewGrid();
            grid.TryOccupy(1, 1);

            Assert.IsTrue(grid.TryMove(1, 1, 5, 0));

            Assert.IsFalse(grid.IsOccupied(1, 1));
            Assert.IsTrue(grid.IsOccupied(5, 0));
            Assert.AreEqual(1, grid.OccupiedCount);
        }

        [Test]
        public void TryMove_ToOccupiedCell_ReturnsFalseAndLeavesBothUnchanged()
        {
            PlacementGrid grid = NewGrid();
            grid.TryOccupy(1, 1);
            grid.TryOccupy(5, 0);

            Assert.IsFalse(grid.TryMove(1, 1, 5, 0));

            Assert.IsTrue(grid.IsOccupied(1, 1));
            Assert.IsTrue(grid.IsOccupied(5, 0));
            Assert.AreEqual(2, grid.OccupiedCount);
        }

        // --- Review Focus #1: player keeps tapping once the grid is full ---

        [Test]
        public void TryOccupyNearestFree_OnFullGrid_ReturnsFalseAndDoesNotThrow()
        {
            PlacementGrid grid = FullGrid();

            bool placed = false;
            Assert.DoesNotThrow(() => placed = grid.TryOccupyNearestFree(3, 2, out _, out _));

            Assert.IsFalse(placed);
            Assert.AreEqual(grid.Columns * grid.Rows, grid.OccupiedCount,
                "a refused placement must not change occupancy");
        }

        [Test]
        public void IsFull_AfterOccupyingEveryCell_IsTrue()
        {
            PlacementGrid grid = FullGrid();

            Assert.IsTrue(grid.IsFull);
            Assert.AreEqual(24, grid.OccupiedCount);
        }

        [Test]
        public void TryOccupy_OutOfRangeIndex_ReturnsFalse()
        {
            PlacementGrid grid = NewGrid();

            Assert.IsFalse(grid.TryOccupy(-1, 0));
            Assert.IsFalse(grid.TryOccupy(0, -1));
            Assert.IsFalse(grid.TryOccupy(6, 0));
            Assert.IsFalse(grid.TryOccupy(0, 4));
            Assert.IsFalse(grid.IsOccupied(99, 99));
            Assert.AreEqual(0, grid.OccupiedCount);
        }
    }
}
