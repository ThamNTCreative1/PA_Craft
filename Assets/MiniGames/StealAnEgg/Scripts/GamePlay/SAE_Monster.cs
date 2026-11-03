using Minigames.StealAnEgg.Data;
using Minigames.StealAnEgg.UI;
using System;
using UnityEngine;

namespace Minigames.StealAnEgg.GamePlay
{
    public class SAE_Monster : MonoBehaviour
    {
        [SerializeField] private string id = Guid.NewGuid().ToString();
        [SerializeField] private SAE_MonsterConfigDataSO config;
        [SerializeField] private SAE_MonsterRarityPresetSO rarityPreset;
        [SerializeField] private SAE_MonsterStatsBase baseStats;
        [SerializeField] private SAE_MonsterDisplayment displayment;
        [SerializeField] private AnimationHolder _animation;
        [SerializeField] private SAE_MonsterInfoDisplayment infoDisplayment;

        [HideInInspector] public string uniqueId;

        public SAE_MonsterConfigDataSO Config => config;
        public SAE_MonsterStatsBase BaseStats => baseStats;
        public SAE_MonsterDisplayment Displayment => displayment;
        public AnimationHolder Animation => _animation;
        public string Id => id;
        public double Income => CalculateIncome(SizeMultiplier);
        public double IncomeBase => baseStats.income;
        public SAE_MonsterRarityPresetSO RarityPreset => rarityPreset;

        public static float IncomeMultiplierBySize = 1.5f;

        [HideInInspector] public float SizeMultiplier = 1;
        [HideInInspector] public double calculatedIncome;

#if UNITY_EDITOR
        [ContextMenu("GenerateID")]
        public void GenerateID()
        {
            id = Guid.NewGuid().ToString();
        }
#endif

        [Serializable]
        public class AnimationHolder
        {
            public AnimationClip idle;
            public AnimationClip walk;
        }

        private void Start()
        {
            calculatedIncome = Income;
            calculatedIncome = (long)(calculatedIncome);
            if (calculatedIncome < 1) calculatedIncome = 1;
            if (infoDisplayment) infoDisplayment.SetValue(displayment.name, rarityPreset, calculatedIncome);
        }

        public RarityType RarityType => rarityPreset != null ? rarityPreset.RarityType : default(RarityType);

        public double CalculateIncome(float sizeMultiplier)
        {
            // Original used SAE_GameController.IncomeMultiplier (gameConfig.IncomeMultiplierBySize ^ size).
            return baseStats.income * Mathf.Pow(IncomeMultiplierBySize, sizeMultiplier);
        }
    }

    [Serializable]
    public class SAE_MonsterStatsBase
    {
        public double income;
        public float sellPrice;
        public float weight = 1;
    }

    [Serializable]
    public class SAE_MonsterDisplayment
    {
        public string name;
        public Sprite thumbnail;
    }

    public enum RarityType
    {
        Common = 0,
        Uncommon,
        Rare,
        Epic,
        Legendary,
        Mythic,
        Cosmic,
        Secret,
        Eternal,
        Divine,
        Hacked,
        OG,
        Celestial
    }
}


