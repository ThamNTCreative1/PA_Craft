using UnityEngine;

namespace Playable
{
    public class NamePlayer : MonoBehaviour
    {
        [SerializeField] private Camera _targetCamera;
        [SerializeField] private bool _onlyRotateYAxis = true;

        private void Awake()
        {
            if (_targetCamera == null)
            {
                _targetCamera = Camera.main;
            }
        }

        private void LateUpdate()
        {
            if (_targetCamera == null)
            {
                _targetCamera = Camera.main;

                if (_targetCamera == null)
                {
                    return;
                }
            }

            Vector3 lookDirection = transform.position - _targetCamera.transform.position;

            if (_onlyRotateYAxis)
            {
                lookDirection.y = 0f;
            }

            if (lookDirection.sqrMagnitude <= 0.0001f)
            {
                return;
            }

            transform.rotation = Quaternion.LookRotation(lookDirection.normalized, Vector3.up);
        }
    }
}
