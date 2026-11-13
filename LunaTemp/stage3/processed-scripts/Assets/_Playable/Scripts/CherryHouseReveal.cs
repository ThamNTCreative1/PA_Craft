using System.Collections;
using UnityEngine;

namespace CEBB.Playable
{
    public sealed class CherryHouseReveal : MonoBehaviour
    {
        public BedroomPlayable game;
        public FirstPersonRoom player;
        public float revealSeconds = 2.5f;
        public Vector3 houseTarget = new Vector3(0, 2.8f, 0);
        private bool revealing;

        private void OnEnable()
        {
            foreach (var layout in GetComponentsInChildren<BedroomLayout>(true))
                if (layout.completedDemo != null) layout.completedDemo.gameObject.SetActive(true);
            game.onGameEnded.AddListener(Reveal);
        }
        private void OnDisable() { if (game != null) game.onGameEnded.RemoveListener(Reveal); }

        private void Reveal()
        {
            if (revealing) return;
            revealing = true;
            player.enabled = false;
            var camera = player.playerCamera;
            foreach (var layout in GetComponentsInChildren<BedroomLayout>(true))
            {
                layout.preserveCameraView = true;
                if (layout.completedDemo != null) layout.completedDemo.gameObject.SetActive(true);
            }
            if (player.movePad != null) player.movePad.gameObject.SetActive(false);
            if (player.reticle != null) player.reticle.gameObject.SetActive(false);
            if (game.inventory != null)
                foreach (var entry in game.inventory)
                    if (entry.button != null) entry.button.transform.parent.gameObject.SetActive(false);
            StartCoroutine(PullBack(camera));
        }

        private IEnumerator PullBack(Camera camera)
        {
            Vector3 start = camera.transform.position;
            Quaternion startRotation = camera.transform.rotation;
            float startFov = camera.fieldOfView;
            float elapsed = 0;
            while (elapsed < revealSeconds)
            {
                elapsed += Time.unscaledDeltaTime;
                float t = Mathf.SmoothStep(0, 1, Mathf.Clamp01(elapsed / Mathf.Max(.01f, revealSeconds)));
                float aspect = (float)Screen.width / Mathf.Max(1, Screen.height);
                float distance = Mathf.Max(36, 18 / Mathf.Max(.4f, aspect));
                Vector3 end = houseTarget + new Vector3(.42f, .32f, -.85f).normalized * distance;
                camera.transform.position = Vector3.Lerp(start, end, t);
                camera.transform.rotation = Quaternion.Slerp(startRotation, Quaternion.LookRotation(houseTarget - end), t);
                camera.fieldOfView = Mathf.Lerp(startFov, 50, t);
                yield return null;
            }
        }
    }
}
