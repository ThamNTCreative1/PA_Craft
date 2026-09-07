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
    [LunaPlaygroundField("Text")] public string Text = "BUILD YOUR NEXT HOUSE!";
    [LunaPlaygroundField("Text High")] public float TextHigh = 0f;
    [SerializeField] private TextMeshProUGUI title;

    [Header("--- Audio ---")]
    [LunaPlaygroundAsset("BackgroundMusic")] public AudioClip BackgroundMusic;
    [SerializeField] private AudioSource bgMusic;

    [Header("--- CTA & EndCard ---")]
    [SerializeField] private List<Button> CTA;
    [SerializeField] private GameObject endCard;

    public static LunaController Ins { get; private set; }

    public float _baseTitlePosY = 747f;

    private void Awake()
    {
        Ins = this;

        if (!title) title = GetComponentInChildren<TextMeshProUGUI>(true);
        if (title && _baseTitlePosY == 0) _baseTitlePosY = title.rectTransform.anchoredPosition.y;

        AutoFindCardReferences();

        CTA?.ForEach(b => { if (b) b.onClick.AddListener(ClickCTA); });
    }

    private void OnDestroy()
    {
        if (Ins == this) Ins = null;
    }

    private void Start()
    {
        try { InitPlaygroundSettings(); } catch (System.Exception e) { Debug.LogWarning("[Luna] InitPlaygroundSettings error: " + e.Message); }
        try { InitCardEvents(); } catch (System.Exception e) { Debug.LogWarning("[Luna] InitCardEvents error: " + e.Message); }
        try { SetupPlaygroundLiveBridge(); } catch (System.Exception e) { Debug.LogWarning("[Luna] SetupPlaygroundLiveBridge error: " + e.Message); }

        if (ShowEndCard) ShowEndCardView();
    }

    private void Update()
    {
        // 1. Cập nhật Playground (Live reload khi chỉnh sửa trong Playground)
        UpdatePlaygroundLiveSettings();

        // 2. Mở khóa phát nhạc khi người chơi chạm màn hình lần đầu (Web Audio policy)
        if (Input.GetMouseButtonDown(0))
        {
            if (bgMusic && !bgMusic.isPlaying && bgMusic.clip)
            {
                bgMusic.Play();
            }
        }
    }

#if UNITY_EDITOR
    private void OnValidate()
    {
        if (!title) title = GetComponentInChildren<TextMeshProUGUI>(true);
        if (title != null && _baseTitlePosY == 0) _baseTitlePosY = title.rectTransform.anchoredPosition.y;
        AutoFindCardReferences();
        UpdatePlaygroundLiveSettings();
    }
#endif

    private void AutoFindCardReferences()
    {
        if (!cardRect)
        {
            GameObject cardObj = GameObject.Find("Card");
            if (cardObj) cardRect = cardObj.GetComponent<RectTransform>();
        }

        if (cardRect && cardRect.childCount >= 4)
        {
            if (!card1) card1 = cardRect.GetChild(0).GetComponent<RawImage>();
            if (!card2) card2 = cardRect.GetChild(1).GetComponent<RawImage>();
            if (!card3) card3 = cardRect.GetChild(2).GetComponent<RawImage>();
            if (!card4) card4 = cardRect.GetChild(3).GetComponent<RawImage>();
        }
    }

    private void InitPlaygroundSettings()
    {
        // 1. Nền (Ảnh tĩnh hoặc Video tùy trường nhập vào)
        SetupBackground();

        // 2. Áp dụng toàn bộ cài đặt 4 cards, text và vị trí/chiều cao
        UpdatePlaygroundLiveSettings();

        // 3. Nhạc nền
        if (BackgroundMusic && bgMusic)
        {
            bgMusic.clip = BackgroundMusic;
            bgMusic.loop = true;
            bgMusic.Play();
        }
    }

    public void UpdatePlaygroundLiveSettings()
    {
        // 1. Ảnh 4 Card
        if (Card1Image && card1 && card1.texture != Card1Image) card1.texture = Card1Image;
        if (Card2Image && card2 && card2.texture != Card2Image) card2.texture = Card2Image;
        if (Card3Image && card3 && card3.texture != Card3Image) card3.texture = Card3Image;
        if (Card4Image && card4 && card4.texture != Card4Image) card4.texture = Card4Image;

        // 2. Nội dung Text
        if (title && Text != null && title.text != Text)
        {
            title.text = Text;
            title.SetVerticesDirty();
            title.SetLayoutDirty();
            title.ForceMeshUpdate();
        }

        // 3. Vị trí cao thấp Text (Text High)
        if (title)
        {
            float targetY = _baseTitlePosY;
            if (Mathf.Abs(TextHigh) > 0.001f)
            {
                // Nếu giá trị nhỏ (< 300) coi là offset so với vị trí gốc; nếu lớn coi là tọa độ Y tuyệt đối
                targetY = (Mathf.Abs(TextHigh) < 300f) ? (_baseTitlePosY + TextHigh) : TextHigh;
            }

            Vector2 pos = title.rectTransform.anchoredPosition;
            if (Mathf.Abs(pos.y - targetY) > 0.001f)
            {
                pos.y = targetY;
                title.rectTransform.anchoredPosition = pos;
            }
        }
    }

    private void SetupPlaygroundLiveBridge()
    {
#if !UNITY_EDITOR
        try
        {
            Application.ExternalEval(@"
                (function() {
                    var typeNames = ['string', 'single', 'float', 'double', 'int', 'int32', 'int64', 'boolean', 'composite'];

                    function getVal(v) {
                        if (v === undefined || v === null) return v;
                        while (Array.isArray(v)) {
                            if (v.length === 0) return '';
                            if (v.length > 1 && typeof v[0] === 'string' && typeNames.indexOf(v[0].toLowerCase()) !== -1) {
                                v = v.slice(1);
                                continue;
                            }
                            if (v.length > 1 && typeof v[0] === 'string' && v[0].length <= 3 && typeof v[1] === 'string') {
                                v = v[1];
                                break;
                            }
                            v = v[0];
                        }
                        if (typeof v === 'object' && v !== null) {
                            if (v.value !== undefined) return getVal(v.value);
                            if (v.en !== undefined) return getVal(v.en);
                            for (var k in v) {
                                if (typeof v[k] === 'string') return v[k];
                            }
                        }
                        return v;
                    }

                    function findVal(obj, k1, k2) {
                        if (!obj || typeof obj !== 'object') return undefined;
                        if (obj[k1] !== undefined) return getVal(obj[k1]);
                        if (k2 && obj[k2] !== undefined) return getVal(obj[k2]);
                        for (var k in obj) {
                            if (k.toLowerCase() === k1.toLowerCase() || (k2 && k.toLowerCase() === k2.toLowerCase())) {
                                return getVal(obj[k]);
                            }
                        }
                        return undefined;
                    }

                    function findOverride(name, altName) {
                        var targets = [];
                        if (window.playgroundOverrides) targets.push(window.playgroundOverrides);
                        try {
                            if (window.parent && window.parent.playgroundOverrides) targets.push(window.parent.playgroundOverrides);
                        } catch(e) {}
                        try {
                            if (window.top && window.top.playgroundOverrides) targets.push(window.top.playgroundOverrides);
                        } catch(e) {}

                        for (var i = 0; i < targets.length; i++) {
                            var o = targets[i];
                            if (!o || typeof o !== 'object') continue;
                            var v = findVal(o.LunaController, name, altName);
                            if (v !== undefined) return v;
                            v = findVal(o, name, altName);
                            if (v !== undefined) return v;
                            for (var k in o) {
                                var s = o[k];
                                v = findVal(s, name, altName);
                                if (v !== undefined) return v;
                            }
                        }
                        return undefined;
                    }

                    window.__applyLunaPlaygroundLive = function() {
                        try {
                            var ins = (typeof LunaController !== 'undefined' && LunaController.Ins) ? LunaController.Ins : null;
                            if (!ins) return;

                            var textVal = findOverride('Text', 'Text');
                            if (textVal !== undefined && textVal !== null) {
                                var strVal = String(textVal);
                                if (ins.Text !== strVal) {
                                    ins.Text = strVal;
                                }
                                if (ins.title) {
                                    if (ins.title.text !== strVal) {
                                        ins.title.text = strVal;
                                    }
                                    ins.title.m_havePropertiesChanged = true;
                                    if (ins.title.SetVerticesDirty) ins.title.SetVerticesDirty();
                                    if (ins.title.SetLayoutDirty) ins.title.SetLayoutDirty();
                                    if (ins.title.ForceMeshUpdate) ins.title.ForceMeshUpdate(true, true);
                                }
                            }

                            var highVal = findOverride('TextHigh', 'Text High');
                            if (highVal !== undefined && highVal !== null) {
                                var num = parseFloat(highVal);
                                if (!isNaN(num)) {
                                    ins.TextHigh = num;
                                    var baseY = ins._baseTitlePosY || 747;
                                    var targetY = (Math.abs(num) < 300) ? (baseY + num) : num;
                                    if (ins.title) {
                                        var rt = ins.title.rectTransform$1 || ins.title.rectTransform || (ins.title.get_rectTransform ? ins.title.get_rectTransform() : null);
                                        if (rt && rt.anchoredPosition) {
                                            var pos = rt.anchoredPosition.$clone ? rt.anchoredPosition.$clone() : { x: rt.anchoredPosition.x || 0, y: 0 };
                                            if (Math.abs((pos.y || 0) - targetY) > 0.001) {
                                                pos.y = targetY;
                                                rt.anchoredPosition = pos.$clone ? pos.$clone() : pos;
                                            }
                                        }
                                    }
                                }
                            }
                        } catch(e) {
                            console.warn('[PlaygroundLive] Error: ', e);
                        }
                    };

                    function handleMessage(e) {
                        try {
                            var msg = (typeof e.data === 'string') ? JSON.parse(e.data) : e.data;
                            if (msg && (msg.name === 'setPlaygroundOverrides' || msg.name === 'live:setPlaygroundOverrides' || (msg.name && msg.name.indexOf('setPlaygroundOverrides') !== -1)) && msg.data) {
                                var parsed = (typeof msg.data === 'string') ? JSON.parse(msg.data) : msg.data;
                                if (parsed) {
                                    if (!window.playgroundOverrides) window.playgroundOverrides = {};
                                    window.playgroundOverrides = Object.assign(window.playgroundOverrides, parsed);
                                    if (parsed.LunaController) {
                                        if (!window.playgroundOverrides.LunaController) window.playgroundOverrides.LunaController = {};
                                        window.playgroundOverrides.LunaController = Object.assign(window.playgroundOverrides.LunaController, parsed.LunaController);
                                    }
                                }
                            }
                        } catch(err) {}
                        window.__applyLunaPlaygroundLive();
                        setTimeout(window.__applyLunaPlaygroundLive, 20);
                        setTimeout(window.__applyLunaPlaygroundLive, 100);
                    }

                    window.removeEventListener('message', handleMessage);
                    window.addEventListener('message', handleMessage);

                    if (window.__lunaInterval) clearInterval(window.__lunaInterval);
                    window.__lunaInterval = setInterval(window.__applyLunaPlaygroundLive, 100);

                    window.__applyLunaPlaygroundLive();
                })();
            ");
        }
        catch (System.Exception e)
        {
            Debug.LogWarning("[PlaygroundLiveBridge] Error: " + e.Message);
        }
#endif
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
