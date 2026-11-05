using UnityEngine;
using UnityEngine.EventSystems;

namespace Playable
{
    // Each driving button owns its pointer so throttle, steering and camera look can be held independently.
    public class DriveHoldButton : MonoBehaviour, IPointerDownHandler, IPointerUpHandler, IPointerExitHandler
    {
        private int _pointer = int.MinValue;
        public bool IsHeld => _pointer != int.MinValue;
        public void OnPointerDown(PointerEventData data)
        {
            if (!IsHeld && data.button == PointerEventData.InputButton.Left) _pointer = data.pointerId;
        }
        public void OnPointerUp(PointerEventData data) { if (_pointer == data.pointerId) Release(); }
        public void OnPointerExit(PointerEventData data) { if (_pointer == data.pointerId) Release(); }
        public void Release() { _pointer = int.MinValue; }
        private void OnDisable() { Release(); }
        private void OnApplicationFocus(bool focused) { if (!focused) Release(); }
        private void OnApplicationPause(bool paused) { if (paused) Release(); }
    }
}
