using UnityEngine;

namespace Minigames.StealAnEgg.Data
{
    [CreateAssetMenu(fileName = "SAE_MonsterConfig", menuName = "Minigames/StealAnEgg/SAE_MonsterConfig")]
    public class SAE_MonsterConfigDataSO : ScriptableObject
    {
        [SerializeField] private float incomePerWeightMultiply = 1;
        [SerializeField] private float scalePerWeight;

        public float IncomePerWeightMultiply => incomePerWeightMultiply;
        public float ScalePerWeight => scalePerWeight;
    }
}


