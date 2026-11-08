using UnityEngine;

namespace Playable
{
    /// <summary>Frames the return home and walks the carrier to the nest using normal player physics.</summary>
    [DefaultExecutionOrder(100)]
    public sealed class NestArrivalSequence : MonoBehaviour
    {
        [SerializeField] private PlayerController _player;
        [SerializeField] private CameraController _cameraInput;
        [SerializeField] private Camera _view;
        [SerializeField] private Transform _nest;
        [SerializeField, Min(.1f)] private float _walkSpeed = 5f;
        [SerializeField, Min(.1f)] private float _stopDistance = 5f;
        private Vector3 _destination, _startCameraPosition;
        private Quaternion _startCameraRotation;
        private bool _active, _walking, _returning, _cameraWasEnabled;
        private float _blend, _walkElapsed;
        public bool IsWalking => _active && _walking;
        public bool IsActive => _active;

        public void Begin()
        {
            if (_active || _player == null || _view == null || _cameraInput == null || _nest == null) return;
            Vector3 side = _player.transform.position - _nest.position;
            side.y = 0f;
            if (side.sqrMagnitude < .01f) side = Vector3.forward;
            _destination = _nest.position + side.normalized * _stopDistance;
            _destination.y = _player.transform.position.y;
            _cameraWasEnabled = _cameraInput.enabled;
            _cameraInput.enabled = false;
            _startCameraPosition = _view.transform.position;
            _startCameraRotation = _view.transform.rotation;
            _blend = _walkElapsed = 0f;
            _active = _walking = true;
            _returning = false;
            _player.SetCinematicMovement(Vector3.zero);
        }

        private void Update()
        {
            if (!_active || !_walking || !_player.IsWorking) return;
            Vector3 delta = _destination - _player.transform.position;
            delta.y = 0f;
            _walkElapsed += Time.deltaTime;
            // A blocked approach yields control instead of trapping the player in a cutscene.
            if (delta.magnitude < .3f || _walkElapsed >= 7f)
            {
                _walking = false;
                _player.SetCinematicMovement(Vector3.zero);
                if (_walkElapsed >= 7f) Finish();
                return;
            }
            _player.SetCinematicMovement(delta.normalized * Mathf.Min(_walkSpeed, delta.magnitude / Mathf.Max(Time.fixedDeltaTime, .001f)));
        }

        private void LateUpdate()
        {
            if (_player != null && !_player.IsWorking)
            {
                _returning = false;
                return;
            }
            if (!_active && !_returning) return;
            _blend = Mathf.Clamp01(_blend + Time.deltaTime / .65f);
            float t = Mathf.SmoothStep(0f, 1f, _blend);
            if (_returning)
            {
                // The regular rig computes its destination before this late blend.
                _view.transform.SetPositionAndRotation(
                    Vector3.Lerp(_startCameraPosition, _view.transform.position, t),
                    Quaternion.Slerp(_startCameraRotation, _view.transform.rotation, t));
                if (_blend >= 1f) _returning = false;
                return;
            }
            Vector3 focus = Vector3.Lerp(_player.transform.position + Vector3.up * 1.6f, _nest.position, .45f);
            Vector3 position = focus + new Vector3(8f, 6.5f, 10f);
            Quaternion rotation = Quaternion.LookRotation(focus - position);
            _view.transform.SetPositionAndRotation(Vector3.Lerp(_startCameraPosition, position, t),
                Quaternion.Slerp(_startCameraRotation, rotation, t));
        }

        public void Finish()
        {
            if (!_active) return;
            _active = _walking = false;
            _player.EndCinematicMovement();
            _startCameraPosition = _view.transform.position;
            _startCameraRotation = _view.transform.rotation;
            _cameraInput.enabled = _cameraWasEnabled;
            if (_cameraWasEnabled) _cameraInput.SetTarget(_player);
            _view.transform.SetPositionAndRotation(_startCameraPosition, _startCameraRotation);
            _blend = 0f;
            _returning = _cameraWasEnabled;
        }

        public void ReleaseForDeparture()
        {
            Finish();
            _returning = false;
        }

        private void OnDisable()
        {
            if (_active) Finish();
            _returning = false;
        }
    }
}
