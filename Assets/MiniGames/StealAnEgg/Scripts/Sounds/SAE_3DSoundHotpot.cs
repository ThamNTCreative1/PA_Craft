using UnityEngine;

namespace Minigames.StealAnEgg.Sounds
{
    public class SAE_3DSoundHotpot : MonoBehaviour
    {
        private AudioSource source;

        private void OnEnable()
        {
            if (source == null) source = GetComponent<AudioSource>();

            source.Play();
        }
    }

}

