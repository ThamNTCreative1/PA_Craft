using UnityEngine;

namespace Game.Common.Utilities
{
    public class Billboard : MonoBehaviour
    {
        private Transform trans_Camera;
        private float sqrDistance;

        [SerializeField] private float distanceToBillborad = 50;

        private void Start()
        {
            if (Camera.main != null)
                trans_Camera = Camera.main.transform;

            sqrDistance = distanceToBillborad * distanceToBillborad;
        }

        public void MultiplyDistance(float multiply)
        {
            distanceToBillborad *= multiply;
            sqrDistance = distanceToBillborad * distanceToBillborad;
        }

        protected virtual void Update()
        {
            if (trans_Camera == null && Camera.main != null)
            {
                trans_Camera = Camera.main.transform;
            }

            if (trans_Camera == null) return;

            if (Vector3.SqrMagnitude(transform.position - trans_Camera.position) <= sqrDistance)
            {
                Vector3 direction = transform.position - trans_Camera.position;
                transform.rotation = Quaternion.LookRotation(direction);
            }
        }
    }
}


