using UnityEngine;

namespace Minigames.StealAnEgg.FXs
{
    public class SAE_FXLifeCircle : MonoBehaviour
    {
        private void OnEnable()
        {
            ParticleSystem particle = GetComponent<ParticleSystem>();

            Invoke(nameof(Hide), particle.main.duration);
        }

        private void Hide()
        {
            gameObject.SetActive(false);
        }
    }
}


