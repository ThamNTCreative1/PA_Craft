using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UI;

public class LunaController : MonoBehaviour
{
    [LunaPlaygroundField("Fake Play?")] public bool FakePlay;
    [LunaPlaygroundField("Limit Time Play?")] public bool LimitTimePlay;
    [LunaPlaygroundField("Time Play")] public float TimePlay;
    [LunaPlaygroundAsset("BG Image 1920x1080")] public Texture2D BGTexture;
    [LunaPlaygroundAsset("Logo 512x210")] public Texture2D LogoTexture;
    [LunaPlaygroundField("Use BGM?")] public bool UseBGM;
    [LunaPlaygroundAsset("BGM")] public AudioClip BGM;

    [SerializeField] private AudioSource musicSource;
    [SerializeField] private RawImage BGImage;
    [SerializeField] private RawImage logoImage;
    [SerializeField] private Image mask;
    [SerializeField] private List<Button> CTA;
    [SerializeField] private GameObject endCard;
    [SerializeField] private Button openButton;

    private void Start()
    {
        BGImage.texture = BGTexture;
        logoImage.texture = LogoTexture;

        if (UseBGM)
        {
            musicSource.clip = BGM;
            musicSource.Play();
        }

        CTA.ForEach(b => b.onClick.AddListener(ClickCTA));
        if (FakePlay) openButton.onClick.AddListener(ClickCTA);
        StartCoroutine(EndGame());
    }
    private void ShowCTA()
    {
        endCard.SetActive(true);
    }
    private void ClickCTA()
    {
        Luna.Unity.Playable.InstallFullGame();
    }
    private IEnumerator EndGame()
    {
        yield return new WaitForSeconds(TimePlay);
        Luna.Unity.LifeCycle.GameEnded();
        if (LimitTimePlay) ShowCTA();
    }
}
