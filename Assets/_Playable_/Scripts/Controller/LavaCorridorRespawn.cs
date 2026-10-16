using UnityEngine;

namespace Playable
{
    /// <summary>Returns the player to the first rack after falling into the lava.</summary>
    public class LavaCorridorRespawn : MonoBehaviour
    {
        public PlayerController player;
        public Vector3 spawn = new Vector3(0f, 0.08f, 0f);
        public float lavaHeight = -1.25f;

        private void Update()
        {
            if (player != null && player.transform.position.y < lavaHeight)
                player.ResetPlayer(spawn, Quaternion.identity);
        }
    }
}
