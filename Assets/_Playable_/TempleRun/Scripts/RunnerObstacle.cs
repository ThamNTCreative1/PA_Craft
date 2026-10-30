using UnityEngine;

namespace Playable.TempleRun
{
    public enum ObstacleKind
    {
        Low = 0,      // jump over it
        Tall = 1,     // change lane
        Platform = 2  // jump on top and run on it
    }

    /// <summary>
    /// Obstacle collision is code-based (axis aligned box), no physics needed (Luna friendly).
    /// Pivot = bottom center of the box.
    /// </summary>
    public class RunnerObstacle : MonoBehaviour
    {
        public ObstacleKind kind;
        public Vector3 size = new Vector3(2.3f, 0.95f, 0.4f);

        [HideInInspector] public int poolIndex;

        public Vector3 Min
        {
            get
            {
                Vector3 p = transform.position;
                return new Vector3(p.x - size.x * 0.5f, p.y, p.z - size.z * 0.5f);
            }
        }

        public Vector3 Max
        {
            get
            {
                Vector3 p = transform.position;
                return new Vector3(p.x + size.x * 0.5f, p.y + size.y, p.z + size.z * 0.5f);
            }
        }

        private void OnDrawGizmosSelected()
        {
            Gizmos.color = Color.red;
            Gizmos.DrawWireCube(transform.position + Vector3.up * size.y * 0.5f, size);
        }
    }
}
