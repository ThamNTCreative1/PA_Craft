using UnityEngine;
namespace Playable.KeyboardEscape
{
    public sealed class EscapeLookInput : MonoBehaviour
    {
        public EscapeGame game;
        public Transform yaw, pitch, target;
        public Camera viewCamera;
        public RectTransform[] inputBlockers;
        public TouchController touchController;
        private float pitchAngle = 20f;
        private Vector2 totalDrag;
        private bool portrait, layoutInitialized;
        public void ResetView()
        {
            totalDrag = Vector2.zero;
            pitchAngle = 20f;
            yaw.rotation = Quaternion.identity;
            pitch.localRotation = Quaternion.Euler(pitchAngle, 0, 0);
        }
        private void OnEnable() { if (touchController) touchController.OnLookDelta += ApplyDrag; }
        private void OnDisable() { if (touchController) touchController.OnLookDelta -= ApplyDrag; }
        private void ApplyDrag(Vector2 delta)
        {
            if (game.manager.HasEnded) return;
            totalDrag += delta;
            float sensitivity = 150f / Mathf.Max(1, Mathf.Min(Screen.width, Screen.height));
            yaw.Rotate(0, delta.x * sensitivity, 0, Space.World);
            pitchAngle = Mathf.Clamp(pitchAngle - delta.y * sensitivity, -5f, 65f);
            pitch.localRotation = Quaternion.Euler(pitchAngle, 0, 0);
            if (totalDrag.sqrMagnitude > 144f) game.CameraSwiped();
        }
        private void LateUpdate()
        {
            yaw.position = target.position + Vector3.up * 1.4f;
            bool nextPortrait = Screen.height > Screen.width;
            if (!layoutInitialized || nextPortrait != portrait)
            {
                portrait = nextPortrait;
                layoutInitialized = true;
                viewCamera.transform.localPosition = new Vector3(0, 0, portrait ? -7.5f : -6f);
            }
        }
    }
}
