using UnityEngine;

// Âm thanh hiệu ứng (lấy từ ref HTML): click UI, đặt block (2 biến thể), hiệu ứng phụ.
public class Sfx : MonoBehaviour
{
    public static Sfx I;
    public AudioSource source;
    public AudioClip click;
    public AudioClip[] place;
    public AudioClip extra;
    int lastPlace = -1;

    void Awake() { I = this; if (source == null) source = GetComponent<AudioSource>(); }

    static bool SfxEnabled { get { return PlayableConfig.I == null || PlayableConfig.I.sfxOn; } }
    static float Vol { get { return PlayableConfig.I != null ? PlayableConfig.I.sfxVolume : 1f; } }

    static void Play(AudioClip c, float pitch = 1f)
    {
        if (I == null || c == null || !SfxEnabled) return;
        I.source.pitch = pitch;
        I.source.PlayOneShot(c, Vol);
    }

    public static void Click() { if (I != null) Play(I.click); }
    public static void Extra() { if (I != null) Play(I.extra); }
    public static void Place()
    {
        if (I == null || I.place == null || I.place.Length == 0) return;
        int i = Random.Range(0, I.place.Length);
        if (I.place.Length > 1 && i == I.lastPlace) i = (i + 1) % I.place.Length;
        I.lastPlace = i;
        Play(I.place[i], Random.Range(0.95f, 1.05f));
    }
}
