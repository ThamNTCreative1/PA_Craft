using UnityEngine;

namespace Playable
{
    public class TutorialLineIndicator : MonoBehaviour
    {
        [SerializeField] private LineRenderer lineRenderer;
        [SerializeField] private Vector3 offset;

        private readonly Vector3[] positionDraws = new Vector3[2];
        private Transform currentTarget;
        private Transform characterTrans;

        public void StartDraw(Transform target, Transform start)
        {
            if (lineRenderer == null) lineRenderer = GetComponent<LineRenderer>();
            if (lineRenderer == null || target == null || start == null)
            {
                StopDraw();
                return;
            }
            currentTarget = target;
            characterTrans = start;
            lineRenderer.useWorldSpace = true;
            lineRenderer.enabled = true;
            enabled = true;
            DrawLine();
        }

        private void LateUpdate()
        {
            DrawLine();
        }

        private void DrawLine()
        {
            if (lineRenderer == null || currentTarget == null || characterTrans == null)
            {
                StopDraw();
                return;
            }

            lineRenderer.positionCount = positionDraws.Length;
            Vector3 pos = characterTrans.position;
            Vector3 targetPos = currentTarget.position;
            // The flag's pivot can be high above the floor; keep the guide at the player's feet.
            targetPos.y = pos.y;
            positionDraws[0] = pos + offset;
            positionDraws[1] = targetPos + offset;
            lineRenderer.SetPositions(positionDraws);
        }

        public void StopDraw()
        {
            if (lineRenderer != null) lineRenderer.positionCount = 0;
            currentTarget = null;
            characterTrans = null;
            enabled = false;
        }

        private void OnDisable()
        {
            if (lineRenderer != null) lineRenderer.positionCount = 0;
        }
    }
}
