using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UI;
using UnityEngine.Video;
using UnityEngine.EventSystems;
using TMPro;

public class LunaController : MonoBehaviour
{
    [Header("Bg")]
    [SerializeField] private bool isVideo = false;
    [LunaPlaygroundAsset("BackGround")] public Texture2D BackGround;
    [SerializeField] public VideoClip BackGroundVideo;
    [SerializeField] private RawImage bg;
    [SerializeField] private VideoPlayer bgVideo;
    [LunaPlaygroundAsset("BG Music")] public AudioClip BGM;
    [SerializeField] private AudioSource musicSource;

    [Header("card")]
    [LunaPlaygroundAsset("Card1Image")] public Texture2D card1image;
    [SerializeField] private RawImage card1;
    [LunaPlaygroundAsset("Card2Image")] public Texture2D card2image;
    [SerializeField] private RawImage card2;
    [LunaPlaygroundAsset("Card3Image")] public Texture2D card3image;
    [SerializeField] private RawImage card3;
    [LunaPlaygroundAsset("Card4Image")] public Texture2D card4image;
    [SerializeField] private RawImage card4;

    [Header("Text")]
    [LunaPlaygroundField("Text")] public string Text;
    [SerializeField] private TextMeshProUGUI text;
    [LunaPlaygroundField("Text High")] public float TextHigh = 0f;

    [Header("End Card / Timing")]
    [LunaPlaygroundField("Time Play")] public float TimePlay = 10f;
    [LunaPlaygroundField("Limit Time Play")] public bool LimitTimePlay = false;
    [SerializeField] private Button endCard;

    private string _lastText;
    private float _lastTextHigh = float.NaN;
    private bool _lastIsVideo;

    // Start is called once before the first execution of Update after the MonoBehaviour is created
    void Start()
    {
        StartCoroutine(EndGame());
        Init();
        endCard.onClick.AddListener(ClickCTA);
        if (musicSource) musicSource.Play();
    }

    private void Update()
    {
        // 1. Cập nhật Text thời gian thực khi sửa trên Playworks editor
        if (text && Text != _lastText)
        {
            _lastText = Text;
            text.text = Text;
        }

        // 2. Cập nhật TextHigh (posY) thời gian thực khi sửa trên Playworks editor
        if (text && TextHigh != _lastTextHigh)
        {
            _lastTextHigh = TextHigh;
            if (TextHigh != 0)
            {
                RectTransform rt = text.GetComponent<RectTransform>();
                if (rt)
                {
                    Vector2 pos = rt.anchoredPosition;
                    pos.y = TextHigh;
                    rt.anchoredPosition = pos;
                }
            }
        }

        // 3. Cập nhật chuyển đổi Video/Ảnh nền thời gian thực khi tích/bỏ tích trên Playworks editor
        if (isVideo != _lastIsVideo)
        {
            _lastIsVideo = isVideo;
            ApplyBackgroundMode();
        }

    }
    

    private void Init()
    {
        _lastText = Text;
        _lastTextHigh = TextHigh;
        _lastIsVideo = isVideo;

        ApplyBackgroundMode();

        if (musicSource && BGM) musicSource.clip = BGM;

        if (card1 && card1image) card1.texture = card1image;
        if (card2 && card2image) card2.texture = card2image;
        if (card3 && card3image) card3.texture = card3image;
        if (card4 && card4image) card4.texture = card4image;

        if (text)
        {
            text.text = Text;
            if (TextHigh != 0)
            {
                RectTransform rt = text.GetComponent<RectTransform>();
                if (rt)
                {
                    Vector2 pos = rt.anchoredPosition;
                    pos.y = TextHigh;
                    rt.anchoredPosition = pos;
                }
            }
        }
    }

    private void ApplyBackgroundMode()
    {
        try
        {
            if (isVideo)
            {
                if (bgVideo != null)
                {
                    if (bg != null && bg.gameObject != bgVideo.gameObject)
                    {
                        bg.gameObject.SetActive(false);
                    }
                    bgVideo.gameObject.SetActive(true);
                    bgVideo.enabled = true;
                    if (BackGroundVideo != null) bgVideo.clip = BackGroundVideo;
                    bgVideo.isLooping = true;
                    bgVideo.Play();
                }
            }
            else
            {
                if (bgVideo != null)
                {
                    if (bg != null && bgVideo.gameObject == bg.gameObject)
                    {
                        bgVideo.enabled = false;
                    }
                    else
                    {
                        bgVideo.gameObject.SetActive(false);
                    }
                }
                if (bg != null)
                {
                    bg.gameObject.SetActive(true);
                    bg.enabled = true;
                    bg.raycastTarget = false;
                    if (BackGround != null) bg.texture = BackGround;
                }
            }
        }
        catch (System.Exception e)
        {
            Debug.LogWarning("[ApplyBackgroundMode] " + e.Message);
        }
    }

    private void ClickCTA()
    {
        Debug.Log("ClickCTA");
        Luna.Unity.Playable.InstallFullGame();
    }

    private IEnumerator EndGame()
    {
        yield return new WaitForSeconds(TimePlay);
        Luna.Unity.LifeCycle.GameEnded();
        if (LimitTimePlay) ClickCTA();
    }
}

