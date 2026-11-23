using UnityEngine;

namespace Playable.PetRescue
{
    /// Precomputed stepped crater for one TNT. Opening lowers road tiles once; overlaps only ever deepen.
    public sealed class RescueCrater : MonoBehaviour
    {
        [SerializeField] private RescueCourse _course;
        [SerializeField] private int[] _tiles;
        [SerializeField] private float[] _depths;
        [SerializeField] private Material _terrace, _floor;
        [SerializeField] private float _floorDepth = 1.5f;
        public bool IsOpen { get; private set; }
        public int TileCount { get { return _tiles == null ? 0 : _tiles.Length; } }
        public void Open()
        {
            if (IsOpen) return;
            IsOpen = true;
            for (int i = 0; i < _tiles.Length; i++)
            {
                Transform tile = _course.Tile(_tiles[i]);
                float y = -_depths[i];
                if (tile.position.y <= y) continue;
                Vector3 p = tile.position; p.y = y; tile.position = p;
                Transform top = tile.Find("Grass");
                if (top == null) continue;
                var renderer = top.GetComponent<Renderer>();
                if (renderer == null) continue;
                // The grass block has side/top/bottom sub-meshes; the whole exposed block becomes dirt or stone.
                Material material = _depths[i] >= _floorDepth - .01f ? _floor : _terrace;
                var slots = renderer.sharedMaterials;
                for (int s = 0; s < slots.Length; s++) slots[s] = material;
                renderer.sharedMaterials = slots;
            }
        }
    }
}
