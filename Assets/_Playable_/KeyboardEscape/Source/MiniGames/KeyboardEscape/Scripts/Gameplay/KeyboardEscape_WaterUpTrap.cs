
using UnityEngine;
using UnityEngine.Audio;

namespace Minigames.KeyboardEscape.Gameplay
{
    public class KeyboardEscape_WaterUpTrap : MonoBehaviour
    {
        [SerializeField] private Vector3 localStart;
        [SerializeField] private Vector3 localEnd;
        [SerializeField] private GameObject obj;
        [SerializeField] private AudioSource audioSource;

        [Header("Setting")]
        [SerializeField] private float moveSpeed;
        [SerializeField] private float IdleTime;

        private MoveType moveType;
        private float executedIdleTime;
        private float moveT = 0;

        public enum MoveType
        {
            Idle,
            IdleUp,
            Up,
            Down,
        }

        private void Start()
        {
            audioSource.time = 0;
            audioSource.Stop();
            executedIdleTime = IdleTime;
        }

        private void FixedUpdate()
        {
            if (moveType == MoveType.Up)
            {
                moveT += Time.fixedDeltaTime * moveSpeed;
                obj.transform.localPosition = Vector3.Lerp(localStart, localEnd, moveT);
                if (moveT >= 1)
                {
                    moveType = MoveType.IdleUp;
                    executedIdleTime = IdleTime;
                    audioSource.Stop();
                }
            }
            else 
            if(moveType == MoveType.IdleUp)
            {
                executedIdleTime -= Time.fixedDeltaTime;
                if (executedIdleTime <= 0)
                {
                    moveType = MoveType.Down;
                    audioSource.time = 0;
                    if (1f > 0)
                        audioSource.Play();
                }
            }
            else
            if (moveType == MoveType.Down)
            {
                moveT -= Time.fixedDeltaTime * moveSpeed;
                obj.transform.localPosition = Vector3.Lerp(localStart, localEnd, moveT);
                if (moveT <= 0)
                {
                    moveType = MoveType.Idle;
                    executedIdleTime = IdleTime;
                    audioSource.Stop();
                }
            }
            else
            {
                executedIdleTime -= Time.fixedDeltaTime;
                if (executedIdleTime <= 0)
                {
                    moveT = 0;
                    moveType = MoveType.Up;
                    audioSource.time = 0;
                    if(1f > 0)
                        audioSource.Play();
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


