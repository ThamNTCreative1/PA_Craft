using UnityEngine;

namespace Minigames.KeyboardEscape.Gameplay
{
    public class KeyboardEscape_DoubleWallTrap : MonoBehaviour
    {
        [SerializeField] private Transform wall1;
        [SerializeField] private Transform wall2;

        [Header("Setting")]
        [SerializeField] private Vector3 start;
        [SerializeField] private Vector3 end;
        [SerializeField] private float speed;
        [SerializeField] private float idleTime;

        private StateType state;
        private float moveT;
        private float executedIdleTime;

        public enum StateType
        {
            IdleIn,
            IdleOut,
            MoveIn,
            MoveOut
        }

        private void FixedUpdate()
        {
            if(state == StateType.MoveOut)
            {
                moveT += Time.fixedDeltaTime * speed;
                wall1.transform.localPosition = Vector3.Lerp(start, end, moveT);
                wall2.transform.localPosition = Vector3.Lerp(-start, -end, moveT);

                if (moveT >= 1)
                {
                    state = StateType.IdleIn;
                    executedIdleTime = idleTime;
                }
            }
            else if(state == StateType.IdleIn)
            {
                executedIdleTime -= Time.fixedDeltaTime;
                if(executedIdleTime <=0)
                {
                    state = StateType.MoveIn;
                }
            }
            else if (state == StateType.MoveIn)
            {
                moveT -= Time.fixedDeltaTime * speed;
                wall1.transform.localPosition = Vector3.Lerp(start, end, moveT);
                wall2.transform.localPosition = Vector3.Lerp(-start, -end, moveT);

                if (moveT <= 0)
                {
                    state = StateType.IdleOut;
                    executedIdleTime = idleTime;
                }
            }
            else if (state == StateType.IdleOut)
            {
                executedIdleTime -= Time.fixedDeltaTime;
                if (executedIdleTime <= 0)
                {
                    state = StateType.MoveOut;
                }
            }
        }
    }
}


