using UnityEngine;

namespace Playable.TempleRun
{
    /// <summary>
    /// One tile of the endless track (a slice of the Steal an Egg map).
    /// Pivot is at the start of the tile; the tile extends along +Z for <see cref="length"/> meters.
    /// </summary>
    public class TrackSegment : MonoBehaviour
    {
        public float length = 16f;

        [HideInInspector] public int poolIndex;

        public float StartZ => transform.position.z;
        public float EndZ => transform.position.z + length;
    }
}
