using UnityEngine;
using UnityEngine.UI;

namespace CEBB.Playable
{
    public sealed class SakuraEndCardMotion : MonoBehaviour
    {
        public RectTransform playButton;
        public RectTransform shine;
        public Image shineImage;
        public GameObject[] gameplayUI;
        public float pulseSeconds = 1.25f;
        public float pulseScale = 1.045f;
        public float shineInterval = 2.4f;
        public float shineSeconds = .8f;
        private float elapsed;

        private void OnEnable()
        {
            elapsed = 0;
            Animate();
        }

        public void HideGameplayUI()
        {
            if (gameplayUI != null)
                foreach (var item in gameplayUI) if (item != null) item.SetActive(false);
        }

        private void Update()
        {
            elapsed += Time.unscaledDeltaTime;
            Animate();
        }

        private void Animate()
        {
            if (playButton == null) return;
            float pulse = .5f - .5f * Mathf.Cos(elapsed * Mathf.PI * 2 / Mathf.Max(.1f, pulseSeconds));
            playButton.localScale = Vector3.one * Mathf.Lerp(1, pulseScale, pulse);
            if (shine == null || shineImage == null) return;
            float phase = elapsed % Mathf.Max(.1f, shineInterval);
            float t = Mathf.Clamp01(phase / Mathf.Max(.1f, shineSeconds));
            float width = playButton.rect.width;
            shine.anchoredPosition = new Vector2(Mathf.Lerp(-width * .8f, width * .8f, t), 0);
            var color = Color.white;
            color.a = phase < shineSeconds ? .8f * Mathf.Sin(t * Mathf.PI) : 0;
            shineImage.color = color;
        }

        private void OnDisable()
        {
            if (playButton != null) playButton.localScale = Vector3.one;
        }
    }
}
