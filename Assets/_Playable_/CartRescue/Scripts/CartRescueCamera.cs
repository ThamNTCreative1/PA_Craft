using UnityEngine;

namespace Playable.CartRescue
{
    /// <summary>
    /// Camera trực giao nhìn ngang (chếch xuống vài độ). Fit: chọn orthographicSize để vùng focus (mặt phẳng XY)
    /// lọt khung với lề, ở cả màn dọc lẫn ngang; tự Fit lại khi tỉ lệ màn hình đổi. Follow: bám X của một transform.
    /// </summary>
    [ExecuteAlways, DisallowMultipleComponent, RequireComponent(typeof(Camera))]
    public sealed class CartRescueCamera : MonoBehaviour
    {
        [SerializeField] private Rect _focus = new Rect(-7f, -1f, 18f, 12f);
        [SerializeField] private float _margin = 1.1f;
        [SerializeField] private float _distance = 30f;
        [SerializeField] private float _pitch = 10f;
        [SerializeField] private float _followRate = 3f;
        [SerializeField] private float _followLead = 3f;
        // Màn dọc: khung hẹp chỉ ôm xe + trực thăng và bám theo xe từ đầu (khung rộng sẽ làm xe quá nhỏ).
        [SerializeField] private Transform _portraitTarget;
        [SerializeField] private float _portraitWidth = 9f;

        private Camera _camera;
        private float _lastAspect = -1f;
        private Transform _follow;
        private Vector2 _center;
        private bool _holding;
        private float _holdX;

        private Camera Cam => _camera != null ? _camera : (_camera = GetComponent<Camera>());
        private bool Portrait => Cam.aspect < 1f;

        private void OnEnable()
        {
            _center = _focus.center;
            Refresh();
        }

        public void Fit(Rect focus)
        {
            _focus = focus;
            _center = focus.center;
            Refresh();
        }

        public void Follow(Transform target)
        {
            _follow = target;
            _holding = false;
        }

        /// <summary>Thôi bám xe, trượt về và đứng yên tại X (vd. cột cờ đích).</summary>
        public void HoldAt(float x)
        {
            _follow = null;
            _holding = true;
            _holdX = x;
        }

        private void LateUpdate()
        {
            if (!Mathf.Approximately(Cam.aspect, _lastAspect)) Refresh();
            if (_holding && Application.isPlaying)
            {
                _center.x = Mathf.Lerp(_center.x, _holdX, 1f - Mathf.Exp(-_followRate * Time.deltaTime));
                Place();
                return;
            }
            Transform target = _follow != null ? _follow : (Portrait ? _portraitTarget : null);
            if (target == null || !Application.isPlaying) return;
            float x = target.position.x + (_follow != null ? _followLead : 0f);
            _center.x = Mathf.Lerp(_center.x, x, 1f - Mathf.Exp(-_followRate * Time.deltaTime));
            Place();
        }

        private void Refresh()
        {
            Camera cam = Cam;
            _lastAspect = cam.aspect;
            cam.orthographic = true;
            // Nhìn chếch xuống _pitch độ làm chiều cao chiếu lên màn hình co lại theo cos(pitch).
            float halfH = _focus.height * 0.5f * Mathf.Cos(_pitch * Mathf.Deg2Rad);
            float width = Portrait ? Mathf.Min(_focus.width, _portraitWidth) : _focus.width;
            float halfW = width * 0.5f / Mathf.Max(0.01f, cam.aspect);
            if (_holding) { }
            else if (Portrait && _portraitTarget != null && _follow == null) _center.x = _portraitTarget.position.x;
            else if (!Portrait && _follow == null) _center.x = _focus.center.x;
            cam.orthographicSize = Mathf.Max(halfH, halfW) * _margin;
            Place();
        }

        private void Place()
        {
            Quaternion rot = Quaternion.Euler(_pitch, 0f, 0f);
            transform.SetPositionAndRotation(new Vector3(_center.x, _center.y, 0f) - rot * Vector3.forward * _distance, rot);
        }
    }
}
