using UnityEngine;
namespace CEBB.Playable
{
    [CreateAssetMenu(menuName="CEBB/Furniture")]
    public sealed class FurnitureDefinition:ScriptableObject
    {
        public string furnitureId;
        public string displayName;
        public GameObject prefab;
        public Sprite icon;
        [Tooltip("Built rugs remain triggers so the player can walk across them.")]
        public bool walkableSurface=false;
    }
}
