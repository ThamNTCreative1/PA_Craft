using UnityEngine;
namespace Playable.KeyboardEscape
{
    public sealed class EscapeGiant : MonoBehaviour
    {
        public EscapeGame game;
        public Animator animator;
        public float activateZ = 166f;
        public Vector3[] groundProfile;
        public float feetOffset;
        public float speed = 3f;
        public float stompDistance = 2.5f;
        private Vector3 origin;
        private Quaternion rotation;
        private Vector3 passDirection;
        private float passUntil;
        private void Awake() { origin = transform.position; rotation = transform.rotation; if (animator) { animator.applyRootMotion = false; animator.speed = 0; } }
        private void Update()
        {
            if (!game.IsRunning || game.player.transform.position.z < activateZ) { if (animator) animator.speed = 0; return; }
            if (animator) animator.speed = 1;
            if (Time.time < passUntil)
            {
                Move(passDirection);
                return;
            }
            Vector3 delta = game.player.transform.position - transform.position; delta.y = 0;
            if (delta.sqrMagnitude > 0.01f)
            {
                transform.rotation = Quaternion.RotateTowards(transform.rotation, Quaternion.LookRotation(delta), 90f * Time.deltaTime);
                Move(delta.normalized);
            }
            if (delta.sqrMagnitude < stompDistance * stompDistance)
            {
                passDirection = delta.sqrMagnitude > 0.01f ? delta.normalized : transform.forward;
                passUntil = Time.time + 2f;
                game.Hit();
            }
        }
        private void Move(Vector3 direction)
        {
            Vector3 position = transform.position + direction * speed * Time.deltaTime;
            if (groundProfile != null && groundProfile.Length > 0)
            {
                float height = groundProfile[groundProfile.Length - 1].y;
                if (position.z <= groundProfile[0].z) height = groundProfile[0].y;
                else for (int i = 1; i < groundProfile.Length; i++)
                    if (position.z <= groundProfile[i].z)
                    {
                        Vector3 a = groundProfile[i - 1], b = groundProfile[i];
                        height = Mathf.Lerp(a.y, b.y, Mathf.InverseLerp(a.z, b.z, position.z));
                        break;
                    }
                position.y = height + feetOffset;
            }
            transform.position = position;
        }
        public void ResetPosition() { passUntil = 0; transform.SetPositionAndRotation(origin, rotation); }
    }
}
