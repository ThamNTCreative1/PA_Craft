using UnityEngine;

namespace Playable.PetRescue
{
    /// Third-person orbit follow: the player swipes to change the yaw; pitch/offset are fixed per orientation.
    public sealed class RescueCameraFollow : MonoBehaviour
    {
        [SerializeField] private Camera _camera;
        [SerializeField] private Vector3 _portraitOffset = new Vector3(0, 4.2f, -5.6f), _portraitAngles = new Vector3(27, 0, 0);
        [SerializeField] private Vector3 _landscapeOffset = new Vector3(0, 3.6f, -5.4f), _landscapeAngles = new Vector3(22, 0, 0);
        [SerializeField] private float _portraitFieldOfView = 64, _landscapeFieldOfView = 48, _sharpness = 8;
        private Transform _hero;
        private Vector3 _focus;
        private float _yaw;
        public float Yaw { get { return _yaw; } }
        public void AddYaw(float degrees) { _yaw = Mathf.Repeat(_yaw + degrees, 360); }

        public void Initialize(Transform hero) { _hero = hero; _focus = hero.position; Tick(0); }

        public static bool IsLandscape(float width, float height) { return width > height; }

        public void Tick(float dt)
        {
            _focus = dt <= 0 ? _hero.position : Vector3.Lerp(_focus, _hero.position, 1 - Mathf.Exp(-_sharpness * dt));
            bool landscape = IsLandscape(Screen.width, Screen.height);
            Quaternion orbit = Quaternion.Euler(0, _yaw, 0);
            transform.position = _focus + orbit * (landscape ? _landscapeOffset : _portraitOffset);
            Vector3 angles = landscape ? _landscapeAngles : _portraitAngles;
            transform.rotation = Quaternion.Euler(angles.x, angles.y + _yaw, angles.z);
            if (_camera != null) _camera.fieldOfView = landscape ? _landscapeFieldOfView : _portraitFieldOfView;
        }
    }
}
