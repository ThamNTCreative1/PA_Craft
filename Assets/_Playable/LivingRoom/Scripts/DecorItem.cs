using UnityEngine;
namespace CEBB.Playable
{
    public enum DecorMount { Floor, Wall }
    // One catalog item of the living room. Model pivot = bottom centre, front faces local -Z.
    [CreateAssetMenu(menuName="CEBB/Decor Item")]
    public sealed class DecorItem:ScriptableObject
    {
        public string itemId;
        public string displayName;
        public GameObject prefab;
        public Sprite icon;
        public DecorMount mount=DecorMount.Floor;
        [Tooltip("Rugs: the player walks over them and furniture can stand on them.")]
        public bool walkableSurface=false;
        [Tooltip("Other items can stand on top (table, TV stand).")]
        public bool topSurface=false;
        [Min(1)] public int quantity=2;
        [Tooltip("Model bounds in prefab space (pivot = bottom centre).")]
        public Vector3 boundsSize=Vector3.one;
    }
}
