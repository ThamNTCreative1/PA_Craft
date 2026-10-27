using UnityEngine;
using UnityEngine.UI;
using Minigames.KeyboardEscape.Gameplay;

namespace Playable.KeyboardEscape
{
    public sealed class ScooterPlayer : MonoBehaviour
    {
        public EscapeGame game;
        public EscapePlayerBody body;
        public EscapePlayerShatter shatter;
        public Transform visual, cameraYaw, frontWheel, rearWheel;
        public GameObject helmetIndicator;
        public Joystick joystick;
        public EscapePlayerInput controls;
        public Slider speedSlider;
        public AudioSource keySound;
        public AudioClip[] keyClips;
        public float maxSpeed = 5f;
        public float jumpHeight = 2.4f;
        public float stepHeight = .35f;
        public bool canMove;
        private float verticalVelocity, nextKeySound;
        private bool jumpRequested;
        private Vector3 lastPosition;
        private void Start()
        {
            maxSpeed = game.manager.PlayerSpeed;
            lastPosition = transform.position;
        }
        public void Jump() { if (canMove && body.isGrounded) jumpRequested = true; }
        private void Update()
        {
            Vector2 input = controls ? controls.Direction : (joystick ? joystick.Direction : Vector2.zero);
#if UNITY_EDITOR
            Vector2 keys = new Vector2(Input.GetAxisRaw("Horizontal"), Input.GetAxisRaw("Vertical"));
            if (keys.sqrMagnitude > 0.01f) input = keys;
            if (Input.GetKeyDown(KeyCode.Space)) Jump();
#endif
            if (input.sqrMagnitude > 0.04f) game.MovementSwiped();
            if (!canMove) { lastPosition = transform.position; return; }
            input = Vector2.ClampMagnitude(input, 1f);
            var forward = cameraYaw.forward; forward.y = 0; forward.Normalize();
            var right = cameraYaw.right; right.y = 0; right.Normalize();
            Vector3 direction = forward * input.y + right * input.x;
            float speed = maxSpeed * (speedSlider ? Mathf.Max(0.05f, speedSlider.value) : 1f);
            if (direction.sqrMagnitude > 0.01f)
                visual.rotation = Quaternion.RotateTowards(visual.rotation, Quaternion.LookRotation(-direction), 720f * Time.deltaTime);
            if (body.isGrounded && verticalVelocity < 0f) verticalVelocity = -2f;
            if (jumpRequested) { verticalVelocity = Mathf.Sqrt(jumpHeight * 2f * 25f); jumpRequested = false; }
            verticalVelocity -= 25f * Time.deltaTime;
            Vector3 horizontalMove = direction * speed * Time.deltaTime;
            if (body.isGrounded && verticalVelocity <= 0 && horizontalMove.sqrMagnitude > .000001f)
            {
                // Step over low ledges using explicit collision-aware movement.
                float beforeStep = transform.position.y;
                body.Move(Vector3.up * Mathf.Max(0f, stepHeight));
                float rise = Mathf.Max(0, transform.position.y - beforeStep);
                body.Move(horizontalMove);
                body.Move(Vector3.up * (verticalVelocity * Time.deltaTime - rise));
            }
            else body.Move(horizontalMove + Vector3.up * verticalVelocity * Time.deltaTime);
            Vector3 delta = transform.position - lastPosition; delta.y = 0;
            float angle = delta.magnitude / 0.265f * Mathf.Rad2Deg;
            if (frontWheel) frontWheel.Rotate(Vector3.right, -angle, Space.Self);
            if (rearWheel) rearWheel.Rotate(Vector3.right, -angle, Space.Self);
            lastPosition = transform.position;
            if (transform.position.y < -15f) game.Hit(true);
        }
        public void Teleport(Vector3 position, Quaternion rotation)
        {
            body.enabled = false;
            transform.SetPositionAndRotation(position, rotation);
            verticalVelocity = 0; jumpRequested = false; lastPosition = position;
            body.enabled = true;
        }
        private void OnTriggerEnter(Collider other)
        {
            var key = other.GetComponent<KeyNote>();
            if (!key) return;
            key.RunKeyDown(maxSpeed);
            if (keySound && keyClips.Length > 0 && Time.time >= nextKeySound)
            {
                keySound.PlayOneShot(keyClips[Random.Range(0, keyClips.Length)]);
                nextKeySound = Time.time + 0.2f;
            }
        }
        private void OnTriggerExit(Collider other)
        {
            var key = other.GetComponent<KeyNote>();
            if (key) key.RunKeyUp(10f);
        }
    }
}
