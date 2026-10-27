using UnityEngine;
namespace Playable.KeyboardEscape
{
    public sealed class EscapePickup : MonoBehaviour
    {
        public EscapeGame game;
        public bool isCup;
        public Transform billboard;
        public float pickupRadius = 1.3f;
        public Vector3 pickupCenter;
        public Transform animatedVisual;
        private Vector3 visualOrigin;
        private Quaternion visualRotation;
        private void Awake()
        {
            if (!animatedVisual) return;
            visualOrigin = animatedVisual.localPosition;
            visualRotation = animatedVisual.localRotation;
        }
        private void LateUpdate()
        {
            if (animatedVisual && !isCup)
            {
                animatedVisual.localPosition = visualOrigin + Vector3.up * (.2f * Mathf.Sin(Time.time * 2.5f));
                animatedVisual.localRotation = visualRotation * Quaternion.Euler(0, Time.time * 65f, 0);
            }
            if (billboard && game.viewCamera) billboard.rotation = game.viewCamera.transform.rotation;
            if (!game.IsRunning) return;
            // Luna's CharacterController does not consistently send trigger callbacks.
            // Test the pickup sphere against the player's upright capsule directly.
            var body = game.player.body;
            Vector3 delta = transform.TransformPoint(pickupCenter) - body.transform.TransformPoint(body.center);
            float halfSegment = Mathf.Max(0, body.height * .5f - body.radius);
            float vertical = Mathf.Max(0, Mathf.Abs(delta.y) - halfSegment);
            Vector3 scale = transform.lossyScale;
            float radius = pickupRadius * Mathf.Max(Mathf.Abs(scale.x), Mathf.Max(Mathf.Abs(scale.y), Mathf.Abs(scale.z))) + body.radius;
            if (delta.x * delta.x + delta.z * delta.z + vertical * vertical > radius * radius) return;
            if (isCup) game.CollectCup(); else game.CollectHelmet(this);
        }
        private void OnTriggerEnter(Collider other)
        {
            if (!other.GetComponent<ScooterPlayer>()) return;
            if (isCup) game.CollectCup(); else game.CollectHelmet(this);
        }
    }
}
