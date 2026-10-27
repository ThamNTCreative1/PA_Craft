using UnityEngine;
using UnityEngine.UI;

public sealed class SmoothChestOpening : MonoBehaviour
{
    [SerializeField] private Image currentImage;
    [SerializeField] private Sprite[] frames;
    [SerializeField] private float[] baselineOffsets;
    private float elapsed;
    private float duration;
    private bool playing;

    private void OnEnable()
    {
        playing = false;
        elapsed = 0f;
        Show(0);
    }

    public void Play(float seconds)
    {
        duration = Mathf.Max(0.01f, seconds);
        elapsed = 0f;
        playing = true;
        Show(0);
    }

    private void Update()
    {
        if (!playing) return;
        elapsed += Time.unscaledDeltaTime;
        float progress = Mathf.Clamp01(elapsed / duration);
        // Leave a short closed hold, then open monotonically and hold the final pose.
        float motion = Mathf.SmoothStep(0f, 1f, Mathf.InverseLerp(0.12f, 0.88f, progress));
        float frame = motion * (frames.Length - 1);
        int index = Mathf.FloorToInt(frame);
        Show(index);
        if (progress >= 1f) playing = false;
    }

    private void Show(int index)
    {
        if (currentImage == null || frames == null || frames.Length == 0) return;
        index = Mathf.Clamp(index, 0, frames.Length - 1);
        SetFrame(currentImage, index);
    }

    private void SetFrame(Image target, int index)
    {
        Sprite frame = frames[index];
        target.sprite = frame;
        target.rectTransform.sizeDelta = frame.rect.size;
        target.rectTransform.anchoredPosition = new Vector2(0f, baselineOffsets[index]);
    }
}
