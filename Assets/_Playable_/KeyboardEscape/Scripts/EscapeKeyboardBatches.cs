using UnityEngine;

namespace Playable.KeyboardEscape
{
    [System.Serializable]
    public sealed class EscapeKeyChunk
    {
        public GameObject root;
#if UNITY_EDITOR
        public Bounds bounds;
#endif
        public Vector3 boundsCenter, boundsExtents;
        public Vector3[] keyCenters;
    }

    public sealed class EscapeKeyboardBatches : MonoBehaviour
    {
        public ScooterPlayer player;
        public Material material;
        public EscapeKeyChunk[] chunks;
        private int currentChunk = -1, currentKey = -1;
        private float nextSound, nextVisibility;
        private void Start() { RefreshVisibility(); }
        private void Update()
        {
            Vector3 position = player.transform.position;
            material.SetVector("_PressPoint", player.canMove ? new Vector4(position.x, position.y, position.z, 1) : new Vector4(0, -1000, 0, 0));
            if (Time.time >= nextVisibility) RefreshVisibility();
            if (!player.canMove)
            {
                currentChunk = currentKey = -1;
                return;
            }
            // Keep the last key through airborne / transient ungrounded frames.
            // Luna can briefly lose grounded contact even while standing still.
            if (!player.body.isGrounded) return;
            int nearestChunk = -1, nearestKey = -1;
            float nearestDistance = .9f;
            for (int i = 0; i < chunks.Length; i++)
            {
                if (DistanceSquared(chunks[i], position) > 4f) continue;
                var centers = chunks[i].keyCenters;
                for (int j = 0; j < centers.Length; j++)
                {
                    Vector3 delta = position - centers[j];
                    float distance = delta.x * delta.x + delta.z * delta.z;
                    if (Mathf.Abs(delta.y) > 1.4f || distance >= nearestDistance) continue;
                    nearestDistance = distance;
                    nearestChunk = i;
                    nearestKey = j;
                }
            }
            if (nearestChunk == currentChunk && nearestKey == currentKey) return;
            currentChunk = nearestChunk;
            currentKey = nearestKey;
            if (currentKey < 0) return;
            if (player.game.cupProgress) player.game.cupProgress.AddKeyboardCup();
            if (Time.time < nextSound) return;
            if (player.keySound && player.keyClips.Length > 0) player.keySound.PlayOneShot(player.keyClips[Random.Range(0, player.keyClips.Length)]);
            nextSound = Time.time + .2f;
        }
        public void RefreshVisibility()
        {
            nextVisibility = Time.time + .25f;
            Vector3 position = player.transform.position;
            for (int i = 0; i < chunks.Length; i++)
            {
                bool visible = DistanceSquared(chunks[i], position) < 32400f;
                if (chunks[i].root.activeSelf != visible) chunks[i].root.SetActive(visible);
            }
        }
        private static float DistanceSquared(EscapeKeyChunk chunk, Vector3 point)
        {
            Vector3 delta = point - chunk.boundsCenter;
            Vector3 extent = chunk.boundsExtents;
            float x = Mathf.Max(0, Mathf.Abs(delta.x) - extent.x);
            float y = Mathf.Max(0, Mathf.Abs(delta.y) - extent.y);
            float z = Mathf.Max(0, Mathf.Abs(delta.z) - extent.z);
            return x * x + y * y + z * z;
        }
        private void OnDisable() { if (material) material.SetVector("_PressPoint", new Vector4(0, -1000, 0, 0)); }
    }
}
