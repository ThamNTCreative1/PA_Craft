using UnityEngine;

public class AudioController : MonoBehaviour
{
    [SerializeField] private AudioSource placementSource;
    [SerializeField] private AudioClip placementClip;
    [SerializeField, Range(0f, 1f)] private float placementVolume = .85f;

    public void PlayBlockPlaced()
    {
        if (placementSource == null || placementClip == null) return;
        placementSource.clip = placementClip;
        placementSource.volume = placementVolume;
        placementSource.Play();
    }
}
