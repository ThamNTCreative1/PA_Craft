
using System.Collections;
using UnityEngine;

namespace Minigames.KeyboardEscape.Gameplay
{
    public class KeyboardEscape_TsunamiTrap : MonoBehaviour
    {
        [SerializeField] private Vector3 localStart;
        [SerializeField] private Vector3 localEnd;
        [SerializeField] private GameObject tsunamiObj;
        [SerializeField] private AudioSource audioSource;

        [Header("Setting")]
        [SerializeField] private float tsumamiSpeed;
        [SerializeField] private float intervalTime;
        [SerializeField] private float startDelayTime;

        private float moveT = 0;

        private void Start()
        {
            tsunamiObj.SetActive(false);
            if(startDelayTime > 0)
            {
                Invoke(nameof(GenerateTsunami), startDelayTime);
            }
            else
            {
                GenerateTsunami();
            }

            audioSource.volume = 1f;
        }

        private void GenerateTsunami()
        {
            moveT = 0;
            tsunamiObj.transform.localPosition = localStart;
            tsunamiObj.SetActive(true);

            audioSource.volume = 1f;
        }

        private void FixedUpdate()
        {
            if(tsunamiObj.activeSelf)
            {
                moveT += Time.fixedDeltaTime * tsumamiSpeed;
                tsunamiObj.transform.localPosition = Vector3.Lerp(localStart, localEnd, moveT);
                if(moveT >= 1)
                {
                    tsunamiObj.SetActive(false);
                    Invoke(nameof(GenerateTsunami), intervalTime);
                }
            }
        }

#if UNITY_EDITOR
        private void OnDrawGizmos()
        {
            Gizmos.color = Color.yellow;
            Gizmos.DrawLine(transform.position + localStart, transform.position + localEnd);
        }
#endif
    }
}


