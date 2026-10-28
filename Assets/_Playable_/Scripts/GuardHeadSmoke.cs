using UnityEngine;

namespace Playable
{
    public sealed class GuardHeadSmoke : MonoBehaviour
    {
        [SerializeField] private Transform _head;
        [SerializeField] private float _heightAboveHead = 2f;
        [SerializeField] private Transform _orientation;

        private void LateUpdate()
        {
            if (!_head) return;
            // Keep the smoke rising vertically while the animated head tilts.
            transform.SetPositionAndRotation(_head.position + Vector3.up * _heightAboveHead,
                _orientation ? _orientation.rotation : Quaternion.identity);
        }
    }
}
