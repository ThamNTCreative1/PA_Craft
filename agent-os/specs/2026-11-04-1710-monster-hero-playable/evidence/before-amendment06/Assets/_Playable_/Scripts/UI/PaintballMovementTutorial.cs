using UnityEngine;

namespace Playable
{
    public sealed class PaintballMovementTutorial : MonoBehaviour
    {
        [SerializeField] private PlayerController _player;
        [SerializeField] private CameraController _camera;
        [SerializeField] private GameObject _moveHint;
        [SerializeField] private GameObject _lookHint;
        private bool _active, _paused, _moved, _looked;
        private float _startYaw, _startPitch;
        private int _shownFrame;

        public void Begin()
        {
            _active = true;
            _shownFrame = Time.frameCount;
            _paused = _moved = _looked = false;
            _startYaw = _camera.Yaw;
            _startPitch = _camera.Pitch;
            gameObject.SetActive(true);
            Refresh();
        }
        public void End()
        {
            _active = false;
            gameObject.SetActive(false);
        }
        public void SetPaused(bool paused)
        {
            _paused = paused;
            if (!paused) _shownFrame = Time.frameCount;
            Refresh();
        }
        private void Update()
        {
            if (!_active || _paused || !_player.enabled) return;
            if (Time.frameCount > _shownFrame && WasScreenPressed())
            {
                _moved = _looked = true;
                Refresh();
                return;
            }
            bool moved = _moved || _player.ReadMoveInput().sqrMagnitude > 0.001f;
            // Base camera angles exclude weapon recoil: firing alone must not dismiss look guidance.
            bool looked = _looked || Mathf.Abs(Mathf.DeltaAngle(_startYaw, _camera.Yaw)) > 2f ||
                Mathf.Abs(_startPitch - _camera.Pitch) > 2f;
            if (moved == _moved && looked == _looked) return;
            _moved = moved;
            _looked = looked;
            Refresh();
        }
        private void Refresh()
        {
            if (_moveHint != null) _moveHint.SetActive(_active && !_paused && !_moved);
            if (_lookHint != null) _lookHint.SetActive(_active && !_paused && !_looked);
        }

        private static bool WasScreenPressed()
        {
            if (Input.touchCount == 0) return Input.GetMouseButtonDown(0);
            for (int i = 0; i < Input.touchCount; i++)
                if (Input.GetTouch(i).phase == TouchPhase.Began) return true;
            return false;
        }
    }
}
