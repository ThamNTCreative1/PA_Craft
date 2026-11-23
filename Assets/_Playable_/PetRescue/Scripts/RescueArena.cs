using UnityEngine;

namespace Playable.PetRescue
{
    /// Read-only queries over the flat open field: rectangular XZ bounds plus solid wall/tree-trunk footprints.
    public sealed class RescueArena : MonoBehaviour
    {
        [SerializeField] private Vector2 _min = new Vector2(-14, -14), _max = new Vector2(14, 14);
        [SerializeField] private RescueWallObstacle[] _walls;

        public Vector2 Min { get { return _min; } }
        public Vector2 Max { get { return _max; } }

        public bool Contains(float x, float z, float radius)
        {
            return x - radius >= _min.x && x + radius <= _max.x && z - radius >= _min.y && z + radius <= _max.y;
        }
        public bool HitsWall(float x, float z, float radius)
        {
            if (_walls == null) return false;
            for (int i = 0; i < _walls.Length; i++)
                if (_walls[i] != null && _walls[i].Overlaps(x, z, radius)) return true;
            return false;
        }
        public bool IsFree(float x, float z, float radius) { return Contains(x, z, radius) && !HitsWall(x, z, radius); }
        public Vector3 ClampInside(Vector3 p, float radius)
        {
            p.x = Mathf.Clamp(p.x, _min.x + radius, _max.x - radius);
            p.z = Mathf.Clamp(p.z, _min.y + radius, _max.y - radius);
            return p;
        }
        /// Moves from `from` by `delta` on XZ, sliding along walls/bounds one axis at a time.
        public Vector3 Slide(Vector3 from, Vector3 delta, float radius)
        {
            Vector3 p = from;
            float x = Mathf.Clamp(p.x + delta.x, _min.x + radius, _max.x - radius);
            if (!HitsWall(x, p.z, radius)) p.x = x;
            float z = Mathf.Clamp(p.z + delta.z, _min.y + radius, _max.y - radius);
            if (!HitsWall(p.x, z, radius)) p.z = z;
            return p;
        }
    }
}
