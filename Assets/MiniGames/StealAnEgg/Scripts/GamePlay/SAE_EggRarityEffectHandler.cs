using System;
using System.Linq;
using UnityEngine;

namespace Minigames.StealAnEgg.GamePlay
{
    public class SAE_EggRarityEffectHandler : MonoBehaviour
    {
        [SerializeField] private RarityEffectBinding[] bindings;
        [SerializeField] private SAE_Egg egg;

        private void Start()
        {
            var effectBinding = bindings.FirstOrDefault(f => f.rarity == egg.RarityType);
            if(effectBinding != null)
            {
                effectBinding.effectObj.SetActive(true);
            }
        }

        [Serializable]
        public class RarityEffectBinding
        {
            public RarityType rarity;
            public GameObject effectObj;
        }
    }


}

