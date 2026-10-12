using UnityEngine;

namespace Playable
{
    public sealed class CarDriveTutorial : MonoBehaviour
    {
        [SerializeField] private PlayerAction _playerAction;
        [SerializeField, Tooltip("Complete on mounting a motorbike instead of a car.")]
        private bool _isMotorbike;
        [SerializeField] private Camera _camera;
        [SerializeField] private Transform _visual;
        [SerializeField] private Transform _anchor;
        [SerializeField] private Vector3 _anchorOffset;
        [SerializeField] private RectTransform _canvasRect;
        private bool _active, _paused, _completed;

        private void OnEnable()
        {
            if (_playerAction != null)
            {
                if (_isMotorbike) _playerAction.MotorbikeMounted += Complete;
                else _playerAction.CarMounted += Complete;
            }
            Canvas.willRenderCanvases += UpdatePosition;
            Refresh();
        }

        private void OnDisable()
        {
            if (_playerAction != null)
            {
                if (_isMotorbike) _playerAction.MotorbikeMounted -= Complete;
                else _playerAction.CarMounted -= Complete;
            }
            Canvas.willRenderCanvases -= UpdatePosition;
            if (_visual != null) _visual.gameObject.SetActive(false);
        }

        public void Begin()
        {
            _active = true;
            _paused = false;
            _completed = _playerAction != null &&
                (_isMotorbike ? _playerAction.IsOnMotorbike : _playerAction.IsInCar);
            Refresh();
        }

        public void End()
        {
            _active = false;
            Refresh();
        }

        public void SetPaused(bool paused)
        {
            _paused = paused;
            Refresh();
        }

        private void Complete()
        {
            if (!_active) return;
            _completed = true;
            Refresh();
        }

        private void Refresh()
        {
            if (_visual == null) return;
            bool visible = isActiveAndEnabled && _active && !_paused && !_completed;
            _visual.gameObject.SetActive(visible);
            if (visible) UpdatePosition();
        }

        private void UpdatePosition()
        {
            if (_visual == null || _camera == null || _anchor == null || _canvasRect == null ||
                !_active || _paused || _completed || !isActiveAndEnabled) return;
            Vector3 screen = _camera.WorldToScreenPoint(_anchor.TransformPoint(_anchorOffset));
            _visual.gameObject.SetActive(screen.z > 0f);
            if (screen.z <= 0f) return;
            Vector2 local;
            if (RectTransformUtility.ScreenPointToLocalPointInRectangle(_canvasRect, screen, null, out local))
                _visual.localPosition = new Vector3(local.x, local.y, 0f);
        }
    }
}
