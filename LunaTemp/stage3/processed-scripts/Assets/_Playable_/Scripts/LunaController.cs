using UnityEngine;

// Các biến cho Luna Playground (đều nằm ở section mặc định).
// Giá trị ở đây ghi đè lên PlayableConfig khi game khởi động.
[RequireComponent(typeof(PlayableConfig))]
public class LunaController : MonoBehaviour
{
    [LunaPlaygroundField("Choose color text", 0)]
    public string chooseText = "CHOOSE YOUR FAVOURITE COLOR";

    [LunaPlaygroundField("Number of blocks to place", 1)]
    public int placeCount = 8;

    [LunaPlaygroundField("Time to store (seconds, 0 = off)", 2)]
    public float timeToStore = 40f;

    [LunaPlaygroundAsset("Background music", 3)]
    public AudioClip bgm;

    public Sprite pinkCardImage;

    public Sprite blueCardImage;

    [LunaPlaygroundAsset("Pink card image", 4)]
    public Texture2D pinkCardTexture;

    [LunaPlaygroundAsset("Blue card image", 5)]
    public Texture2D blueCardTexture;

    public UnityEngine.UI.RawImage pinkCardTextureTarget;
    public UnityEngine.UI.RawImage blueCardTextureTarget;

    public UnityEngine.UI.Image pinkCardTarget;
    public UnityEngine.UI.Image blueCardTarget;

    void ApplyTexture(UnityEngine.UI.RawImage target, Texture2D texture)
    {
        if (target == null || texture == null) return;
        target.texture = texture;
        var fit = target.transform.parent.GetComponent<UnityEngine.UI.AspectRatioFitter>();
        if (fit != null) fit.aspectRatio = (float)texture.width / Mathf.Max(1, texture.height);
    }

    void ApplyCard(UnityEngine.UI.Image target, Sprite sprite)
    {
        if (target == null || sprite == null) return;
        target.sprite = sprite;
        var fit = target.GetComponent<UnityEngine.UI.AspectRatioFitter>();
        if (fit != null) fit.aspectRatio = sprite.rect.width / sprite.rect.height;
    }

    void Awake()
    {
        ApplyCard(pinkCardTarget, pinkCardImage);
        ApplyCard(blueCardTarget, blueCardImage);
        ApplyTexture(pinkCardTextureTarget, pinkCardTexture);
        ApplyTexture(blueCardTextureTarget, blueCardTexture);
        var cfg = GetComponent<PlayableConfig>();
        if (cfg == null) return;
        if (!string.IsNullOrEmpty(chooseText)) cfg.chooseText = chooseText;
        cfg.placeCountToEnd = placeCount;
        cfg.timeToStore = timeToStore;
        if (bgm != null) cfg.bgmClip = bgm;
    }
}
