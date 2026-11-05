using UnityEngine;
using UnityEngine.EventSystems;

namespace Playable
{
    // A firing gesture keeps its original pointer even outside the button bounds.
    public sealed class PaintballFireButton : MonoBehaviour, IPointerDownHandler,
        IPointerUpHandler, IDragHandler, IInitializePotentialDragHandler, ICancelHandler
    {
        [SerializeField] private CameraController _camera;
        [SerializeField] private float _dragSensitivity = 1f;
        private int _pointer = int.MinValue;
        private Vector2 _lastPosition;
        public bool IsHeld => _pointer != int.MinValue;

        public void OnInitializePotentialDrag(PointerEventData data) { data.useDragThreshold = false; }
        public void OnPointerDown(PointerEventData data)
        {
            if (IsHeld || data.button != PointerEventData.InputButton.Left) return;
            _pointer = data.pointerId;
            _lastPosition = data.position;
        }
        public void OnDrag(PointerEventData data)
        {
            if (data.pointerId != _pointer) return;
            Vector2 delta = data.position - _lastPosition;
            _lastPosition = data.position;
            float referenceScale = 1080f / Mathf.Max(1f, Mathf.Min(Screen.width, Screen.height));
            if (_camera != null) _camera.AddLookInput(delta * (_dragSensitivity * referenceScale));
        }
        public void OnPointerUp(PointerEventData data) { if (data.pointerId == _pointer) Release(); }
        public void OnCancel(BaseEventData data) { Release(); }
        public void Release() { _pointer = int.MinValue; }
        private void OnDisable() { Release(); }
        private void OnApplicationFocus(bool focused) { if (!focused) Release(); }
        private void OnApplicationPause(bool paused) { if (paused) Release(); }
    }
}
