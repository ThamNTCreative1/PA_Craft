using UnityEngine;

namespace Playable
{
    public class NamePlayer : MonoBehaviour
    {
        [SerializeField] private Camera _targetCamera;
        [SerializeField] private bool _onlyRotateYAxis = true;

        private Transform _transform;
        private Transform _cameraTransform;

        private void Awake()
        {
            _transform = transform;

            if (_targetCamera == null)
            {
                _targetCamera = Camera.main;
            }

            if (_targetCamera != null)
            {
                _cameraTransform = _targetCamera.transform;
            }
        }

        private void LateUpdate()
        {
            // Camera.main quét theo tag, không được gọi mỗi frame -> không có camera thì tắt luôn component.
            if (_cameraTransform == null)
            {
                enabled = false;
                return;
            }

            Vector3 lookDirection = _transform.position - _cameraTransform.position;

            if (_onlyRotateYAxis)
            {
                lookDirection.y = 0f;
            }

            if (lookDirection.sqrMagnitude <= 0.0001f)
            {
                return;
            }

            _transform.rotation = Quaternion.LookRotation(lookDirection, Vector3.up);
        }
    }
}
