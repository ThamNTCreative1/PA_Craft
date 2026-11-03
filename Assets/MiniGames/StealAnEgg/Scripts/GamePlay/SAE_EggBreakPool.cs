using System.Collections.Generic;
using System.Linq;
using UnityEngine;

namespace Minigames.StealAnEgg.GamePlay
{
    public class SAE_EggBreakPool : MonoBehaviour
    {
        public static SAE_EggBreakPool instance;

        [SerializeField] private GameObject sample;
        [SerializeField] private GameObject eggCrackSoundSample;

        [Tooltip("Played when the pet comes out (original: SAE_GameController.eggOpenCompletedSound).")]
        [SerializeField] private AudioSource eggOpenCompletedSound;

        private List<GameObject> createdObjectList = new List<GameObject>();
        private List<GameObject> createdEggCrackSoundList = new List<GameObject>();

        private void Awake()
        {
            instance = this;
        }

        public GameObject GetAvailableObject()
        {
            GameObject availableObj = createdObjectList.FirstOrDefault(f => !f.activeSelf);
            if (availableObj == null)
            {
                availableObj = Instantiate(sample, transform);
                createdObjectList.Add(availableObj);
            }

            return availableObj;
        }

        public GameObject GetAvailableEggCrackSound()
        {
            GameObject availableObj = createdEggCrackSoundList.FirstOrDefault(f => !f.activeSelf);
            if (availableObj == null)
            {
                availableObj = Instantiate(eggCrackSoundSample, transform);
                createdEggCrackSoundList.Add(availableObj);
            }

            return availableObj;
        }

        public void PlayEggCompletedSound()
        {
            if (eggOpenCompletedSound) eggOpenCompletedSound.Play();
        }
    }
}
