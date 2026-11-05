using UnityEngine;

namespace Playable
{
    public abstract class MissionController : MonoBehaviour
    {
        [Header("Mission References")]
        [SerializeField] private GameObject _content;
        [SerializeField] private PlayerController _player;
        [SerializeField] private CameraController _camera;
        [Header("Entry Orientation")]
        [SerializeField] private bool _lookAtTarget;
        [SerializeField] private Transform _lookTarget;
        [SerializeField] private float _playerYaw;
        [SerializeField] private float _cameraYaw;
        [SerializeField, Range(-30f, 65f)] private float _cameraPitch = 12f;

        public virtual bool IsAvailable => true;
        public virtual bool UsesDrivingTutorial => true;
        public virtual void SetPaused(bool paused) { }
        protected virtual void OnEntered() { }
        protected virtual void OnExited() { }
        public bool CanEnter => IsAvailable && isActiveAndEnabled && _content != null &&
            _content != gameObject && _content.transform.IsChildOf(transform) &&
            _player != null && _camera != null && !_player.IsRiding &&
            (!_lookAtTarget || _lookTarget != null);

        public void Enter()
        {
            if (!CanEnter) return;
            _content.SetActive(true);
            Vector3 position = _player.transform.position;
            float yaw = _playerYaw;
            if (_lookAtTarget)
            {
                Vector3 direction = _lookTarget.position - position;
                direction.y = 0f;
                if (direction.sqrMagnitude > 0.001f)
                    yaw = Mathf.Atan2(direction.x, direction.z) * Mathf.Rad2Deg;
            }
            _player.StopFollowingCameraYaw();
            _player.Teleport(position, Quaternion.Euler(0f, yaw, 0f));
            _camera.FollowPlayer(_player);
            if (_lookAtTarget) _camera.LookAtPoint(_lookTarget.position);
            else _camera.SetEntryAngles(_cameraYaw, _cameraPitch);
            // First-person movement follows camera yaw, including on the entry frame.
            if (_camera.CurrentViewMode == CameraController.ViewMode.FirstPerson)
                _player.Teleport(position, Quaternion.Euler(0f, _camera.Yaw, 0f));
            OnEntered();
        }

        public void Exit()
        {
            OnExited();
            if (_content != null && _content != gameObject && _content.transform.IsChildOf(transform))
                _content.SetActive(false);
        }
    }
}
