using Game.Common.Utilities;
using Minigames.StealAnEgg.Data;
using TMPro;
using UnityEngine;

namespace Minigames.StealAnEgg.UI
{
    public class SAE_MonsterInfoDisplayment : MonoBehaviour
    {
        [SerializeField] private Transform parent;
        [SerializeField] private TextMeshPro text_MonsterName;
        [SerializeField] private TextMeshPro text_Rarity;
        [SerializeField] private TextMeshPro text_Income;
        [SerializeField] private Billboard billBoard;

        private void Start()
        {
            billBoard.MultiplyDistance(parent.localScale.x/3 > 1? parent.localScale.x / 3:1);
        }

        private static string SimplifyNumberString(double value)
        {
            string[] suffixes = { "", "K", "M", "B", "T" };
            int i = 0;
            while (value >= 1000 && i < suffixes.Length - 1)
            {
                value /= 1000;
                i++;
            }

            return i == 0 ? value.ToString("0") : value.ToString("0.#") + suffixes[i];
        }

        public void SetValue(string monsterName, SAE_MonsterRarityPresetSO rarityPreset, double income)
        {
            text_Income.text = $"${SimplifyNumberString(income)}/s";
            if (rarityPreset != null)
            {
                text_Rarity.text = rarityPreset.RarityType.ToString();
                if (rarityPreset.MaterialPreset)
                    text_Rarity.fontSharedMaterial = rarityPreset.MaterialPreset;
            }
            text_MonsterName.text = monsterName.Replace("_"," ");
        }
    }
}


