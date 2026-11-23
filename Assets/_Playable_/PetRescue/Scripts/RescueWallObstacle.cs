using UnityEngine;

namespace Playable.PetRescue
{
    /// Solid block footprint on the XZ plane, centered on this transform.
    public sealed class RescueWallObstacle : MonoBehaviour
    {
        [SerializeField] private Vector2 _halfExtents = new Vector2(.5f, .5f);
        [SerializeField] private float _height = 2;
        public float Top { get { return transform.position.y + _height; } }
        public Vector2 HalfExtents { get { return _halfExtents; } }
        public bool Overlaps(float x, float z, float radius)
        {
            Vector3 p = transform.position;
            float dx = Mathf.Max(0, Mathf.Abs(x - p.x) - _halfExtents.x);
            float dz = Mathf.Max(0, Mathf.Abs(z - p.z) - _halfExtents.y);
            return dx * dx + dz * dz < radius * radius;
        }
    }
}
