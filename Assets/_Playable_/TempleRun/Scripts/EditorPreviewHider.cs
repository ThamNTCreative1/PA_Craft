using UnityEngine;

namespace Playable.TempleRun
{
    /// <summary>
    /// The setup tool drops a few map segments in the scene so the map is visible while editing.
    /// They are removed as soon as the game starts (the TrackGenerator spawns the real ones).
    /// </summary>
    public class EditorPreviewHider : MonoBehaviour
    {
        private void Awake()
        {
            Destroy(gameObject);
        }
    }
}
