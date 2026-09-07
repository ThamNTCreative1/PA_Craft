using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UI;
using TMPro;

public class LunaController : MonoBehaviour
{
    [Header("--- Playground ---")]
    [LunaPlaygroundField("Show End Card")] public bool ShowEndCard;

    [Header("--- Background ---")]
    [LunaPlaygroundField("Is Video Background?")] public bool isVideoBackground;
    [LunaPlaygroundAsset("BackgroundImage")] public Texture2D backgroundImage;
    [LunaPlaygroundAsset("BackgroundVideo")] public UnityEngine.Video.VideoClip backgroundVideo;

    [Space(5)]
    [Tooltip("RawImage hiển thị hình nền ảnh tĩnh hoặc nhận RenderTexture từ Video (Khuyên dùng)")]
    [SerializeField] private RawImage bg;
    [Tooltip("Image hiển thị ảnh nền (Dự phòng nếu GameObject đang dùng Image thay vì RawImage)")]
    [SerializeField] private Image bgImage;
    [Tooltip("Component VideoPlayer phát video nền")]
    [SerializeField] private UnityEngine.Video.VideoPlayer bgVideo;
    [Tooltip("RenderTexture trung gian cho video (nếu để trống, script sẽ tự lấy từ VideoPlayer hoặc tự tạo)")]
    [SerializeField] private RenderTexture bgRenderTexture;
    [Tooltip("Tự động cân đối tỷ lệ hiển thị tránh méo hình ảnh/video")]
    [SerializeField] private AspectRatioFitter bgAspectFitter;

    [Header("--- 4 Cards ---")]
    [LunaPlaygroundAsset("Card1Image")] public Texture2D Card1Image;
    [LunaPlaygroundAsset("Card2Image")] public Texture2D Card2Image;
    [LunaPlaygroundAsset("Card3Image")] public Texture2D Card3Image;
    [LunaPlaygroundAsset("Card4Image")] public Texture2D Card4Image;
    [SerializeField] private RawImage card1;
    [SerializeField] private RawImage card2;
    [SerializeField] private RawImage card3;
    [SerializeField] private RawImage card4;
    [SerializeField] private RectTransform cardRect;

    [Header("--- Title Text ---")]
    [LunaPlaygroundField("Text")] public string Text;
    [LunaPlaygroundField("Text High")] public float TextHigh;
    [SerializeField] private TextMeshProUGUI title;

    [Header("--- Audio ---")]
    [LunaPlaygroundAsset("BackgroundMusic")] public AudioClip BackgroundMusic;
    [SerializeField] private AudioSource bgMusic;

    [Header("--- CTA & EndCard ---")]
    [SerializeField] private List<Button> CTA;
    [SerializeField] private GameObject endCard;

    public static LunaController Ins { get; private set; }

    private void CreateIns()
    {
        if (Ins && Ins != this)
        {
            Destroy(gameObject);
            return;
        }
        Ins = this;
        DontDestroyOnLoad(gameObject);
    }

    private void Awake()
    {
        CreateIns();
        CTA?.ForEach(b => { if (b) b.onClick.AddListener(ClickCTA); });
    }

    private void Start()
    {
        InitPlaygroundSettings();
        InitCardEvents();

        if (ShowEndCard) ShowEndCardView();
    }

    private void Update()
    {
        // Mở khóa phát nhạc khi người chơi chạm màn hình lần đầu (Web Audio policy)
        if (Input.GetMouseButtonDown(0))
        {
            if (bgMusic && !bgMusic.isPlaying && bgMusic.clip)
            {
                bgMusic.Play();
            }
        }
    }

    private void InitPlaygroundSettings()
    {
        // 1. Nền (Ảnh tĩnh hoặc Video tùy trường nhập vào)
        SetupBackground();

        // 2. Ảnh 4 Card
        if (Card1Image && card1) card1.texture = Card1Image;
        if (Card2Image && card2) card2.texture = Card2Image;
        if (Card3Image && card3) card3.texture = Card3Image;
        if (Card4Image && card4) card4.texture = Card4Image;

        // 3. Nội dung Text & Vị trí cao thấp (Text High)
        if (title)
        {
            if (!string.IsNullOrEmpty(Text)) title.text = Text;
            if (TextHigh != 0)
            {
                Vector2 pos = title.rectTransform.anchoredPosition;
                pos.y = TextHigh;
                title.rectTransform.anchoredPosition = pos;
            }
        }

        // 4. Nhạc nền
        if (BackgroundMusic && bgMusic)
        {
            bgMusic.clip = BackgroundMusic;
            bgMusic.loop = true;
            bgMusic.Play();
        }
    }

    private void SetupBackground()
    {
        // 1. Tự động tìm component nếu chưa gán thủ công trên Inspector
        if (!bg && !bgImage)
        {
            bg = GetComponentInChildren<RawImage>();
            if (!bg) bgImage = GetComponentInChildren<Image>();
        }
        if (!bgVideo)
        {
            bgVideo = GetComponentInChildren<UnityEngine.Video.VideoPlayer>(true);
        }
        if (!bgAspectFitter)
        {
            if (bg) bgAspectFitter = bg.GetComponent<AspectRatioFitter>();
            else if (bgImage) bgAspectFitter = bgImage.GetComponent<AspectRatioFitter>();
        }

        // 2. Tự động nhận diện chế độ dựa trên Playground hoặc trường nhập vào
        bool shouldPlayVideo = isVideoBackground || (backgroundVideo != null && backgroundImage == null);

        if (shouldPlayVideo && bgVideo != null)
        {
            SetupVideoBackground();
        }
        else
        {
            SetupImageBackground();
        }
    }

    private void SetupVideoBackground()
    {
        if (!bgVideo) return;

        // Bật GameObject chứa VideoPlayer
        bgVideo.gameObject.SetActive(true);

        // Gán clip từ Playground nếu có
        if (backgroundVideo != null)
        {
            bgVideo.clip = backgroundVideo;
        }

        // Cấu hình phát video tối ưu cho WebGL / Luna
        bgVideo.isLooping = true;
        // Lưu ý: Đặt Audio Output Mode = None trực tiếp trên Inspector của VideoPlayer để tránh bị chặn autoplay

        // Xử lý hiển thị lên UI thông qua RenderTexture & RawImage
        if (bgVideo.renderMode == UnityEngine.Video.VideoRenderMode.RenderTexture)
        {
            if (bgVideo.targetTexture == null)
            {
                if (bgRenderTexture != null)
                {
                    bgVideo.targetTexture = bgRenderTexture;
                }
                else
                {
                    // Tự động khởi tạo RenderTexture kích thước màn hình
                    int width = Screen.width > 0 ? Screen.width : 1080;
                    int height = Screen.height > 0 ? Screen.height : 1920;
                    bgRenderTexture = new RenderTexture(width, height, 0);
                    bgVideo.targetTexture = bgRenderTexture;
                }
            }

            if (bg)
            {
                bg.gameObject.SetActive(true);
                bg.texture = bgVideo.targetTexture;
            }
        }

        // Tắt component Image tĩnh dự phòng nếu ở GameObject riêng biệt
        if (bgImage && (!bg || bgImage.gameObject != bg.gameObject))
        {
            bgImage.gameObject.SetActive(false);
        }

        // Cập nhật AspectRatioFitter theo tỷ lệ video
        if (bgAspectFitter && backgroundVideo != null && backgroundVideo.height > 0)
        {
            bgAspectFitter.aspectRatio = (float)backgroundVideo.width / backgroundVideo.height;
        }

        bgVideo.Play();
    }

    private void SetupImageBackground()
    {
        // Dừng video nếu đang chạy
        if (bgVideo)
        {
            bgVideo.Stop();
            // Chỉ tắt GameObject nếu bgVideo là đối tượng riêng biệt (tránh tắt nhầm GameObject chứa bg)
            if ((!bg || bgVideo.gameObject != bg.gameObject) && (!bgImage || bgVideo.gameObject != bgImage.gameObject))
            {
                bgVideo.gameObject.SetActive(false);
            }
        }

        // Hiển thị ảnh tĩnh lên RawImage (Ưu tiên)
        if (bg)
        {
            bg.gameObject.SetActive(true);
            if (backgroundImage != null)
            {
                bg.texture = backgroundImage;
            }
        }
        // Hoặc hiển thị lên Image dự phòng (nếu dùng component Image thông thường)
        else if (bgImage)
        {
            bgImage.gameObject.SetActive(true);
            if (backgroundImage != null)
            {
                bgImage.sprite = Sprite.Create(
                    backgroundImage,
                    new Rect(0, 0, backgroundImage.width, backgroundImage.height),
                    new Vector2(0.5f, 0.5f)
                );
            }
        }

        // Cập nhật AspectRatioFitter theo tỷ lệ ảnh
        if (bgAspectFitter && backgroundImage != null && backgroundImage.height > 0)
        {
            bgAspectFitter.aspectRatio = (float)backgroundImage.width / backgroundImage.height;
        }
    }

    private void InitCardEvents()
    {
        BindCard(card1, 0);
        BindCard(card2, 1);
        BindCard(card3, 2);
        BindCard(card4, 3);
    }

    private void BindCard(RawImage card, int index)
    {
        if (!card) return;

        CardUIItem item = card.GetComponent<CardUIItem>();
        if (!item) item = card.gameObject.AddComponent<CardUIItem>();

        item.CardId = index;
        if (item.onCardClicked == null) item.onCardClicked = new UnityEngine.Events.UnityEvent<int>();
        item.onCardClicked.RemoveListener(OnCardClicked);
        item.onCardClicked.AddListener(OnCardClicked);
    }

    public void OnCardClicked(int cardId)
    {
        if (HandTutorialUI.Instance) HandTutorialUI.Instance.HideTutorial();
        StartCoroutine(EndGame());
    }

    public void ShowEndCardView()
    {
        if (endCard && !endCard.activeSelf) endCard.SetActive(true);
    }

    public void ClickCTA()
    {
        Luna.Unity.Playable.InstallFullGame();
    }

    private IEnumerator EndGame()
    {
        yield return new WaitForSeconds(1.2f);
        Luna.Unity.LifeCycle.GameEnded();
        ShowEndCardView();

    }
}
