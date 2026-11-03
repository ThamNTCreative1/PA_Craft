using Minigames.StealAnEgg.GamePlay;
using UnityEngine;

namespace Minigames.StealAnEgg.Data
{
    [CreateAssetMenu(fileName = "SAE_MonsterRarityPreset", menuName = "Minigames/StealAnEgg/SAE_MonsterRarityPreset")]
    public class SAE_MonsterRarityPresetSO : ScriptableObject
    {
        [SerializeField] private RarityType rarityType;
        [SerializeField] private Material materialPreset;
        [SerializeField] private Sprite thumbnail2x2;

        public RarityType RarityType => rarityType;
        public Material MaterialPreset => materialPreset;
        public Sprite Thumbnail2x2 => thumbnail2x2;
    }
}


