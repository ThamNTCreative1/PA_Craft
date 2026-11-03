using UnityEngine;

namespace Playable
{
    [DisallowMultipleComponent]
    [RequireComponent(typeof(SphereCollider))]
    public class EggPickupTrigger : MonoBehaviour
    {
        private Egg _egg;
        private SphereCollider _trigger;

        public void Configure(Egg egg, float radius, Vector3 center)
        {
            _egg = egg;
            _trigger = GetComponent<SphereCollider>();
            if (_trigger == null) _trigger = gameObject.AddComponent<SphereCollider>();
            _trigger.isTrigger = true;
            _trigger.radius = Mathf.Max(0.01f, radius);
            _trigger.center = center;
        }

        public bool OverlapsBounds(Collider other)
        {
            return _trigger != null && _trigger.enabled && _trigger.bounds.Intersects(other.bounds);
        }

        private void OnTriggerEnter(Collider other)
        {
            if (_egg != null) _egg.EnterRange(other);
        }

        private void OnTriggerStay(Collider other)
        {
            if (_egg != null) _egg.EnterRange(other);
        }

        private void OnTriggerExit(Collider other)
        {
            if (_egg != null) _egg.ExitRange(other);
        }

        private void OnDisable()
        {
            if (_egg != null) _egg.ClearContacts();
        }
    }
}