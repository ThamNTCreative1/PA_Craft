using UnityEngine;
using UnityEngine.EventSystems;

namespace Playable.CartRescue
{
    /// <summary>Gom chuột/chạm (Luna map chạm đầu tiên thành chuột) thành con trỏ world-space trên mặt phẳng Z = 0.</summary>
    [DisallowMultipleComponent]
    public sealed class PointerInput : MonoBehaviour
    {
        [SerializeField] private Camera _camera;

        public bool Down { get; private set; }
        public bool Held { get; private set; }
        public bool Up { get; private set; }
        public bool OverUI { get; private set; }
        public Vector2 WorldPos { get; private set; }
        public Vector2 ScreenPos { get; private set; }

        public float OrthoSize => _camera.orthographicSize;

        public void Poll()
        {
            Down = Input.GetMouseButtonDown(0);
            Held = Input.GetMouseButton(0);
            Up = Input.GetMouseButtonUp(0);
            if (Down) OverUI = EventSystem.current != null && EventSystem.current.IsPointerOverGameObject();
            if (Down || Held || Up)
            {
                ScreenPos = Input.mousePosition;
                WorldPos = ScreenToPlane(Input.mousePosition);
            }
        }

        public Vector2 ScreenToPlane(Vector3 screen)
        {
            Ray ray = _camera.ScreenPointToRay(screen);
            if (Mathf.Abs(ray.direction.z) < 1e-5f) return ray.origin;
            float t = -ray.origin.z / ray.direction.z;
            return ray.origin + ray.direction * t;
        }
    }
}
