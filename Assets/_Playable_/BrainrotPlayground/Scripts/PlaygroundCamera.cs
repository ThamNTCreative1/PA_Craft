using UnityEngine;

namespace Playable.BrainrotPlayground
{
    /// <summary>
    /// Camera trực giao nhìn từ trên xuống, luôn lấp kín màn hình bằng bản đồ (không lộ viền) ở cả màn dọc và ngang.
    /// Zoom &lt; 1 là phóng gần hơn; tâm camera bị kẹp để khung nhìn không vượt ra ngoài bản đồ.
    /// </summary>
    [ExecuteAlways, DisallowMultipleComponent, RequireComponent(typeof(Camera))]
    public sealed class PlaygroundCamera : MonoBehaviour
    {
        [SerializeField] private Rect _map = new Rect(-14f, -9f, 28f, 18f);
        [SerializeField] private Vector2 _focus;
        [SerializeField] private float _portraitZoom = 0.8f;
        [SerializeField] private float _landscapeZoom = 1f;

        private Camera _camera;
        private float _lastAspect = -1f;

        public Camera Camera
        {
            get
            {
                if (_camera == null) _camera = GetComponent<Camera>();
                return _camera;
            }
        }

        public bool IsPortrait => Camera.aspect < 1f;

        private void OnEnable()
        {
            _lastAspect = -1f;
            Refresh();
        }

        private void LateUpdate()
        {
            if (!Mathf.Approximately(Camera.aspect, _lastAspect)) Refresh();
        }

        public void Refresh()
        {
            Camera cam = Camera;
            float aspect = Mathf.Max(0.01f, cam.aspect);
            _lastAspect = cam.aspect;
            // Kích thước lớn nhất mà vẫn nằm trọn trong bản đồ theo cả 2 trục.
            float cover = Mathf.Min(_map.height * 0.5f, _map.width * 0.5f / aspect);
            float size = cover * (aspect < 1f ? _portraitZoom : _landscapeZoom);
            cam.orthographic = true;
            cam.orthographicSize = size;

            float halfW = size * aspect;
            float x = Mathf.Clamp(_focus.x, _map.xMin + halfW, _map.xMax - halfW);
            float y = Mathf.Clamp(_focus.y, _map.yMin + size, _map.yMax - size);
            transform.position = new Vector3(x, y, -10f);
        }
    }
}
