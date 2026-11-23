using UnityEngine;

namespace Playable.PetRescue
{
    /// Read-only ground/wall queries over the road tile grid. Tiles are row-major (row = z, column = x).
    public sealed class RescueCourse : MonoBehaviour
    {
        public const float StepHeight = .25f;
        [SerializeField] private Transform[] _tiles;
        [SerializeField] private int _columns = 6;
        [SerializeField] private float _minX = -3, _minZ = -8;
        [SerializeField] private RescueWallObstacle[] _walls;

        public int TileIndex(float x, float z)
        {
            int column = Mathf.FloorToInt(x - _minX), row = Mathf.FloorToInt(z - _minZ);
            if (_tiles == null || column < 0 || column >= _columns || row < 0) return -1;
            int index = row * _columns + column;
            return index < _tiles.Length ? index : -1;
        }
        public Transform Tile(int index) { return _tiles[index]; }
        public float HeightAt(float x, float z)
        {
            int index = TileIndex(x, z);
            return index < 0 ? 0 : _tiles[index].position.y;
        }
        public bool HitsWall(float x, float z, float radius)
        {
            if (_walls == null) return false;
            for (int i = 0; i < _walls.Length; i++)
                if (_walls[i] != null && _walls[i].Overlaps(x, z, radius)) return true;
            return false;
        }
        public bool IsBlocked(float x, float z, float feetY, float radius)
        {
            return HeightAt(x, z) > feetY + StepHeight || HitsWall(x, z, radius);
        }
    }
}
