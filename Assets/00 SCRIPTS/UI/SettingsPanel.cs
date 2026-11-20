using UnityEngine;
using UnityEngine.UI;

// Settings popup (source Canvas/Settings page): Mouse sensitivity, Total volume, Music volume sliders.
// Sensitivity 50..1000 scales the camera drag speed relative to the source default CAMERA_SENSITIVITY 200.
public class SettingsPanel : MonoBehaviour
{
    [SerializeField] private GameObject panel;
    [SerializeField] private Button openButton;
    [Tooltip("The X button and the dark full-screen background.")]
    [SerializeField] private Button[] closeButtons;
    [SerializeField] private Slider sensitivitySlider;
    [SerializeField] private Slider volumeSlider;
    [SerializeField] private Slider musicSlider;
    [SerializeField] private ThirdPersonCamera cameraRig;
    [SerializeField] private float defaultSensitivity = 200f;
    [Tooltip("Music sources (BGM, chase music) and their volume at Music volume = 1.")]
    [SerializeField] private AudioSource[] musicSources;
    [SerializeField] private float[] musicBaseVolumes;
    [SerializeField] private AudioSource sfx;
    [SerializeField] private AudioClip clickClip;

    private void Start()
    {
        if (panel) panel.SetActive(false);
        if (openButton) openButton.onClick.AddListener(Open);
        for (int i = 0; i < closeButtons.Length; i++) if (closeButtons[i]) closeButtons[i].onClick.AddListener(Close);
        if (sensitivitySlider) { sensitivitySlider.value = defaultSensitivity; sensitivitySlider.onValueChanged.AddListener(OnSensitivity); }
        if (volumeSlider) { volumeSlider.value = 1f; volumeSlider.onValueChanged.AddListener(OnVolume); }
        if (musicSlider) { musicSlider.value = 1f; musicSlider.onValueChanged.AddListener(OnMusic); }
    }

    public void Open()
    {
        if (sfx && clickClip) sfx.PlayOneShot(clickClip);
        if (panel) panel.SetActive(true);
    }

    public void Close()
    {
        if (sfx && clickClip) sfx.PlayOneShot(clickClip);
        if (panel) panel.SetActive(false);
    }

    private void OnSensitivity(float v)
    {
        if (cameraRig) cameraRig.SensitivityScale = v / Mathf.Max(1f, defaultSensitivity);
    }

    private void OnVolume(float v)
    {
        AudioListener.volume = v;
    }

    private void OnMusic(float v)
    {
        for (int i = 0; i < musicSources.Length; i++)
        {
            if (musicSources[i] == null) continue;
            float baseVolume = musicBaseVolumes != null && i < musicBaseVolumes.Length ? musicBaseVolumes[i] : 1f;
            musicSources[i].volume = baseVolume * v;
        }
    }
}
