using System;
using DG.Tweening;
using UnityEngine;

namespace Playable
{
    public sealed class HuntPlayer : MonoBehaviour
    {
        [SerializeField] private CharacterController _body;
        [SerializeField] private Transform _pitchPivot;
        [SerializeField] private Camera _camera;
        [SerializeField] private Joystick _joystick;
        [SerializeField] private float _moveSpeed = 3.5f;
        [SerializeField] private float _lookSensitivity = 110f;
        [SerializeField] private Vector2 _gridOrigin = new Vector2(-21f, -23f);
        [SerializeField] private int _gridWidth = 84;
        [SerializeField] private int _gridHeight = 92;
        [SerializeField] private float _cellSize = 0.5f;
        [SerializeField] private bool[] _dryLand;
        private float _yaw, _pitch;
        private Tween _turn;
        public bool CanLook { get; set; }
        public bool CanMove { get; set; }
        public event Action<float> Looked;
        public event Action Moved;
        public Camera ViewCamera => _camera;

        private void Awake()
        {
            _yaw = transform.eulerAngles.y;
            _pitch = Mathf.DeltaAngle(0f, _pitchPivot.localEulerAngles.x);
        }
        public void Look(Vector2 pixels)
        {
            if (!CanLook) return;
            Vector2 delta = pixels * (_lookSensitivity / Mathf.Max(1, Mathf.Min(Screen.width, Screen.height)));
            _yaw += delta.x;
            _pitch = Mathf.Clamp(_pitch - delta.y, -65f, 65f);
            ApplyRotation();
            Looked?.Invoke(delta.magnitude);
        }
        private void ApplyRotation()
        {
            transform.rotation = Quaternion.Euler(0, _yaw, 0);
            _pitchPivot.localRotation = Quaternion.Euler(_pitch, 0, 0);
        }
        public void AimAt(Vector3 point, float duration, Action complete = null)
        {
            _turn?.Kill();
            Vector3 euler = Quaternion.LookRotation(point - _camera.transform.position).eulerAngles;
            Vector2 from = new Vector2(_yaw, _pitch);
            Vector2 to = new Vector2(_yaw + Mathf.DeltaAngle(_yaw, euler.y), Mathf.DeltaAngle(0, euler.x));
            if (duration <= 0f) { _yaw = to.x; _pitch = to.y; ApplyRotation(); complete?.Invoke(); return; }
            _turn = DOVirtual.Float(0, 1, duration, t =>
            {
                _yaw = Mathf.Lerp(from.x, to.x, t); _pitch = Mathf.Lerp(from.y, to.y, t); ApplyRotation();
            }).SetEase(Ease.InOutSine).OnComplete(() => complete?.Invoke());
        }
        private void Update()
        {
            if (!CanMove) return;
            Vector2 input = _joystick.Direction;
#if UNITY_EDITOR
            Vector2 keys = new Vector2(Input.GetAxisRaw("Horizontal"), Input.GetAxisRaw("Vertical"));
            if (keys.sqrMagnitude > 0.01f) input = keys;
#endif
            if (input.sqrMagnitude < 0.015f) return;
            input = Vector2.ClampMagnitude(input, 1);
            Vector3 motion = (transform.right * input.x + transform.forward * input.y) * (_moveSpeed * Time.deltaTime);
            Vector3 before = transform.position;
            // Keep feet on the existing flat grass and out of the river; slide along its edge.
            if (CanStand(before + motion)) _body.Move(motion);
            else
            {
                Vector3 x = new Vector3(motion.x, 0, 0), z = new Vector3(0, 0, motion.z);
                if (CanStand(transform.position + x)) _body.Move(x);
                if (CanStand(transform.position + z)) _body.Move(z);
            }
            if ((transform.position - before).sqrMagnitude > 0.000001f) Moved?.Invoke();
        }
        public bool CanStand(Vector3 point)
        {
            const float radius = 0.28f;
            return IsLand(point.x - radius, point.z - radius) && IsLand(point.x + radius, point.z - radius)
                && IsLand(point.x - radius, point.z + radius) && IsLand(point.x + radius, point.z + radius);
        }
        private bool IsLand(float x, float z)
        {
            if (_dryLand == null || _cellSize <= 0f || _gridWidth <= 0 || _gridHeight <= 0) return false;
            int ix = Mathf.FloorToInt((x - _gridOrigin.x) / _cellSize);
            int iz = Mathf.FloorToInt((z - _gridOrigin.y) / _cellSize);
            return ix >= 0 && iz >= 0 && ix < _gridWidth && iz < _gridHeight
                && iz * _gridWidth + ix < _dryLand.Length && _dryLand[iz * _gridWidth + ix];
        }
        public void StopControls()
        {
            CanLook = CanMove = false;
            _turn?.Kill();
            if (_joystick != null) _joystick.enabled = false;
        }
        private void OnDestroy() { _turn?.Kill(); }
    }
}
