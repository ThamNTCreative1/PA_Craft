using UnityEngine;

namespace Playable.PetRescue
{
    public sealed class RescueCameraFollow : MonoBehaviour
    {
        [SerializeField] private Camera _camera;
        [SerializeField] private Vector3 _offset = new Vector3(0, 2.6f, -4.5f);
        [SerializeField] private Vector3 _angles = new Vector3(25, 0, 0);
        private Transform _hero;
        private float _focusY;
        public void Initialize(Transform hero) { _hero = hero; _focusY = hero.position.y * .5f; Tick(1); }
        public void Tick(float dt)
        {
            // Dip half of the hero's depth so a sunk hero stays framed inside the crater.
            _focusY = Mathf.Lerp(_focusY, _hero.position.y * .5f, 1 - Mathf.Exp(-6 * dt));
            Vector3 focus = new Vector3(_hero.position.x * .35f, _focusY, _hero.position.z);
            // Fixed user-approved framing: exact offset from the hero and a fixed pitch.
            transform.position = focus + _offset;
            transform.rotation = Quaternion.Euler(_angles);
        }
    }
}
