using UnityEngine;

namespace Playable.KeyboardEscape
{
    // Kinematic character movement using the primitive queries supported by Luna.
    public sealed class EscapePlayerBody : MonoBehaviour
    {
        public Vector3 center = new Vector3(0, .9f, 0);
        public float height = 1.8f;
        public float radius = .38f;
        public bool isGrounded { get; private set; }
        public ScooterPlayer player;
        private const float Skin = .025f;

        public void Move(Vector3 motion)
        {
            Vector3 horizontal = new Vector3(motion.x, 0, motion.z);
            if (horizontal.sqrMagnitude > .00000001f) MoveHorizontal(horizontal);
            if (Mathf.Abs(motion.y) > .000001f) MoveVertical(motion.y);
        }
        private void MoveHorizontal(Vector3 motion)
        {
            float distance = motion.magnitude;
            Vector3 direction = motion / distance;
            Vector3 side = new Vector3(-direction.z, 0, direction.x);
            Vector3 origin = transform.position + center;
            float allowed = distance;
            // Sweep the front and sides at feet, torso and head heights.
            for (int y = -1; y <= 1; y++)
                for (int x = -1; x <= 1; x++)
                {
                    Vector3 sample = origin + side * (x * (radius - Skin)) + Vector3.up * (y * (height * .5f - Skin));
                    RaycastHit hit;
                    if (!Physics.Raycast(sample, direction, out hit, distance + radius + Skin, ~0, QueryTriggerInteraction.Ignore)) continue;
                    allowed = Mathf.Min(allowed, Mathf.Max(0, hit.distance - radius - Skin));
                    ReportSolidHazard(hit.collider);
                }
            transform.position += direction * allowed;
        }
        private void MoveVertical(float amount)
        {
            bool down = amount < 0;
            Vector3 direction = down ? Vector3.down : Vector3.up;
            Vector3 origin = transform.position + center;
            float halfHeight = height * .5f;
            float distance = Mathf.Abs(amount);
            float allowed = distance;
            bool grounded = false;
            for (int x = -1; x <= 1; x++)
                for (int z = -1; z <= 1; z++)
                {
                    Vector3 sample = origin + new Vector3(x * (radius - Skin), 0, z * (radius - Skin));
                    RaycastHit hit;
                    if (!Physics.Raycast(sample, direction, out hit, halfHeight + distance + Skin, ~0, QueryTriggerInteraction.Ignore)) continue;
                    allowed = Mathf.Min(allowed, Mathf.Max(0, hit.distance - halfHeight - Skin));
                    if (down && hit.normal.y > .5f) grounded = true;
                    ReportSolidHazard(hit.collider);
                }
            transform.position += direction * allowed;
            isGrounded = down && grounded;
        }
        private void ReportSolidHazard(Collider obstacle)
        {
            if (player && obstacle.GetComponent<EscapeHazard>()) player.game.Hit();
        }
        private void OnDisable() { isGrounded = false; }
    }
}
