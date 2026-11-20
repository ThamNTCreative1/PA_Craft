using UnityEngine;
using UnityEngine.UI;

// Settings / Upgrade popups of the playable: only "Download To Play Full Version" + PLAY NOW (CTA in LunaController).
// Opens from its HUD button, closes with the X (or the background).
public class CtaPopup : MonoBehaviour
{
    [SerializeField] private GameObject panel;
    [SerializeField] private Button openButton;
    [SerializeField] private Button[] closeButtons;
    [SerializeField] private AudioSource sfx;
    [SerializeField] private AudioClip clickClip;

    private void Start()
    {
        if (panel) panel.SetActive(false);
        if (openButton) openButton.onClick.AddListener(Open);
        for (int i = 0; i < closeButtons.Length; i++) if (closeButtons[i]) closeButtons[i].onClick.AddListener(Close);
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
}
