using UnityEngine;
using UnityEngine.EventSystems;

namespace Playable
{
    public sealed class HuntLookInput : MonoBehaviour, IPointerDownHandler, IDragHandler, IPointerUpHandler
    {
        [SerializeField] private HuntPlayer _player;
        [SerializeField] private RectTransform _joystickArea, _fireArea;
        private int _finger = int.MinValue;
        private Vector2 _previous;
        public void OnPointerDown(PointerEventData data)
        {
#if !UNITY_LUNA
            if (_finger != int.MinValue || !_player.CanLook) return;
            _finger = data.pointerId; _previous = data.position;
#endif
        }
        public void OnDrag(PointerEventData data)
        {
#if !UNITY_LUNA
            if (data.pointerId != _finger) return;
            _player.Look(data.position - _previous); _previous = data.position;
#endif
        }
        public void OnPointerUp(PointerEventData data) { if (data.pointerId == _finger) _finger = int.MinValue; }
#if UNITY_LUNA
        private void Update()
        {
            Vector2 p = Input.mousePosition;
            if (Input.GetMouseButtonDown(0) && _player.CanLook &&
                !RectTransformUtility.RectangleContainsScreenPoint(_joystickArea, p) &&
                !RectTransformUtility.RectangleContainsScreenPoint(_fireArea, p))
            { _finger = -1; _previous = p; }
            if (_finger != -1) return;
            if (!Input.GetMouseButton(0)) { _finger = int.MinValue; return; }
            _player.Look(p - _previous); _previous = p;
        }
#endif
        private void OnDisable() { _finger = int.MinValue; }
        private void OnApplicationFocus(bool focus) { if (!focus) _finger = int.MinValue; }
    }
}
