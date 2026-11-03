using System;
using UnityEngine;

namespace Minigames.StealAnEgg.Data
{
    [CreateAssetMenu(fileName = "SAE_MonsterSizeDataSO", menuName = "Minigames/StealAnEgg/SAE_MonsterSizeDataSO")]
    public class SAE_MonsterSizeDataSO : ScriptableObject
    {
        [SerializeField] private SizeDataSlot[] sizeDataSlots;

        public float GetSizeRandomly()
        {
            float totalRate = 0;
            foreach (SizeDataSlot data in sizeDataSlots)
            {
                totalRate += data.rate;
            }

            float randNum = UnityEngine.Random.Range(0f, totalRate);
            float current = 0;
            for (int i = 0; i < sizeDataSlots.Length; i++)
            {
                current += sizeDataSlots[i].rate;
                if (randNum <= current)
                {
                    return UnityEngine.Random.Range(sizeDataSlots[i].sizeRange.x, sizeDataSlots[i].sizeRange.y);
                }
            }

            return 1;
        }

        [Serializable]
        public class SizeDataSlot
        {
            public Vector2 sizeRange;
            public float rate;
        }
    }
}


