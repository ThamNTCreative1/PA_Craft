using UnityEngine;

/// <summary>Original sounds extracted from the user-provided Day 304 recording.</summary>
public sealed class CaseOpeningAudio : MonoBehaviour
{
    [SerializeField, Range(0f, 1f)] private float volume = 0.65f;
    [Tooltip("Assign the extracted WAV files directly in the Inspector.")]
    [SerializeField] private AudioClip unlockClip;
    [SerializeField] private AudioClip tickClip;
    [Tooltip("Optional. Empty means no extra sound at the stopping point.")]
    [SerializeField] private AudioClip stopClip;
    [SerializeField] private AudioClip rewardClip;
    [Tooltip("The source contains one gold reward. Empty reuses that recorded reward.")]
    [SerializeField] private AudioClip rareRewardClip;
    private AudioSource effects, ticks;

    public float UnlockDuration { get { return unlockClip != null ? unlockClip.length : 0f; } }

    private void Awake()
    {
        if (rareRewardClip == null) rareRewardClip = rewardClip;
        effects = gameObject.AddComponent<AudioSource>();
        ticks = gameObject.AddComponent<AudioSource>();
        foreach (AudioSource source in new[] { effects, ticks })
        {
            source.playOnAwake = false;
            // New AudioSources default to 2D; Luna does not support spatialBlend.
            source.loop = false;
            source.volume = volume;
        }
        if (unlockClip == null || tickClip == null || rewardClip == null)
            Debug.LogWarning("Assign Unlock, Tick and Reward clips in the CaseOpeningAudio Inspector.", this);
    }

    private void Update()
    {
        effects.volume = ticks.volume = volume;
    }

    public void Unlock(float playbackSpeed = 1f)
    {
        effects.Stop();
        ticks.Stop();
        effects.pitch = Mathf.Clamp(playbackSpeed, 0.01f, 3f);
        effects.volume = ticks.volume = volume;
        if (unlockClip != null) effects.PlayOneShot(unlockClip);
    }

    public void FinishUnlock()
    {
        effects.Stop();
        effects.pitch = 1f;
    }

    public void Tick()
    {
        // Retrigger one voice. Intervals follow card crossings; the natural
        // recorded tail becomes audible as the reel slows down.
        if (tickClip == null) return;
        ticks.clip = tickClip;
        ticks.Play();
    }

    public void StopReel()
    {
        effects.pitch = 1f;
        // Preserve the final tick's decay.
        if (stopClip != null) effects.PlayOneShot(stopClip, 0.7f);
    }

    public void Reward(bool rare)
    {
        effects.pitch = 1f;
        AudioClip clip = rare ? rareRewardClip : rewardClip;
        if (clip != null) effects.PlayOneShot(clip);
    }

    private void OnDisable()
    {
        if (effects != null) effects.Stop();
        if (ticks != null) ticks.Stop();
    }
}
