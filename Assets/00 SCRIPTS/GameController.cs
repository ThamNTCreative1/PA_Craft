using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UI;

/// <summary>A weighted case-opening screen with a preselected, exact reel result.</summary>
public sealed class GameController : MonoBehaviour
{
    private enum Rarity { Common, Uncommon, Rare, Epic, UltraRare }

    private sealed class Prize
    {
        public readonly string Name, Description;
        public readonly float Weight;
        public readonly Rarity Rarity;
        public readonly Sprite Sprite;

        public Prize(string name, string description, float weight, Rarity rarity, Sprite sprite)
        {
            Name = name; Description = description; Weight = weight; Rarity = rarity; Sprite = sprite;
        }
    }

    private readonly List<Prize> prizes = new List<Prize>();
    [System.Serializable]
    private sealed class ReelCardView
    {
        public Image icon;
        public Image rarityStrip;
        public Text label;

        public bool IsAssigned { get { return icon != null && rarityStrip != null && label != null; } }
    }

    [Header("Scene UI")]
    [SerializeField] private GameObject title;
    [SerializeField] private GameObject chestIntro;
    [SerializeField] private SmoothChestOpening chestOpening;
    [SerializeField] private GameObject reelPanel;
    [SerializeField] private GameObject spin;
    [SerializeField] private GameObject backgroundDim;
    [SerializeField] private RectTransform reel;
    [SerializeField] private RectTransform lensReel;
    [SerializeField] private RectTransform lensViewport;
    [SerializeField] private Button openButton;
    [SerializeField] private GameObject resultPanel;
    [SerializeField] private Image resultImage;
    [SerializeField] private Text resultRarity;
    [SerializeField] private Text resultName;
    [SerializeField] private ReelCardView[] reelCards;
    [SerializeField] private ReelCardView[] lensCards;
    [Header("UI Materials")]
    [SerializeField] private Material lensMaterialTemplate;
    [SerializeField] private Material outsideBlurMaterialTemplate;
    [SerializeField] private Graphic[] lensGraphics;
    [SerializeField] private Graphic[] outsideGraphics;
    private Material lensMaterial;
    private Material outsideBlurMaterial;
    private bool isOpening;
    [Header("Scene References")]
    [SerializeField] private CaseOpeningAudio caseAudio;
    [Header("Prize Sprites")]
    [SerializeField] private Sprite speedX2Sprite;
    [SerializeField] private Sprite treadmillX50Sprite;
    [SerializeField] private Sprite cupX2Sprite;
    [SerializeField] private Sprite expX2Sprite;
    [SerializeField] private Sprite treadmillX100Sprite;

    private const int CardCount = 112;
    private const int WinnerIndex = 96;
    private const int GuaranteedPrizeIndex = 4; // Rainbow Treadmill: speed boost x100.
    private const float CardWidth = 216f;
    private const float CardGap = 30f;
    [Header("Magnifier")]
    [SerializeField, Min(1f)]
    [Tooltip("Magnifier radius in canvas units (1920 x 1080 reference). Can be changed during Play Mode.")]
    private float lensRadius = 215f;
    [SerializeField, Min(0f)]
    [Tooltip("Soft transition width at the lens edge in canvas units. Updates during Play Mode.")]
    private float lensEdgeSoftness = 6f;
    [SerializeField, Range(0f, 12f)]
    [Tooltip("Blur radius of the normal reel outside the magnifier, in canvas units. Zero disables blur.")]
    private float outsideBlurStrength = 4f;

    private float LensDiameter => Mathf.Max(1f, lensRadius) * 2f;
    private const float LensZoom = 1.8f;

    private void Awake()
    {
        if (title == null || chestIntro == null || chestOpening == null || reelPanel == null ||
            caseAudio == null || reel == null || lensReel == null ||
            lensViewport == null || openButton == null ||
            resultPanel == null || resultImage == null || resultRarity == null ||
            resultName == null || lensMaterialTemplate == null ||
            outsideBlurMaterialTemplate == null || speedX2Sprite == null || treadmillX50Sprite == null ||
            cupX2Sprite == null || expX2Sprite == null || treadmillX100Sprite == null ||
            !ValidCards(reelCards) || !ValidCards(lensCards))
        {
            Debug.LogError("Assign the baked scene UI and assets in the GameController Inspector.", this);
            enabled = false;
            return;
        }
        // Only material instances are created; all UI objects already exist in the scene.
        lensMaterial = new Material(lensMaterialTemplate);
        outsideBlurMaterial = new Material(outsideBlurMaterialTemplate);
        foreach (Graphic graphic in lensGraphics) if (graphic != null) graphic.material = lensMaterial;
        foreach (Graphic graphic in outsideGraphics) if (graphic != null) graphic.material = outsideBlurMaterial;
        LoadPrizes();
        resultPanel.SetActive(false);
        backgroundDim.SetActive(false);
        chestIntro.SetActive(true);
        reelPanel.SetActive(false);
        openButton.interactable = true;
        openButton.onClick.AddListener(BeginOpening);
        PopulateReel(null);
    }

    private static bool ValidCards(ReelCardView[] cards)
    {
        if (cards == null || cards.Length != CardCount) return false;
        foreach (ReelCardView card in cards) if (card == null || !card.IsAssigned) return false;
        return true;
    }

    private void LoadPrizes()
    {
        prizes.Add(new Prize("Speed Shoes", "Speed boost x2", 63.70f, Rarity.Common, speedX2Sprite));
        prizes.Add(new Prize("Orange Treadmill", "Speed boost x50", 22.50f, Rarity.Uncommon, treadmillX50Sprite));
        prizes.Add(new Prize("Victory Trophy", "Trophies x2", 10.00f, Rarity.Rare, cupX2Sprite));
        prizes.Add(new Prize("Energy Potion", "Experience x2", 3.20f, Rarity.Epic, expX2Sprite));
        prizes.Add(new Prize("Rainbow Treadmill", "Speed boost x100", 0.60f, Rarity.UltraRare, treadmillX100Sprite));
    }

    private void PopulateReel(Prize guaranteedWinner)
    {
        for (int i = 0; i < CardCount; i++)
        {
            Prize prize = i == WinnerIndex && guaranteedWinner != null ? guaranteedWinner : SelectWeightedPrize();
            UpdateCard(reelCards[i], prize);
            UpdateCard(lensCards[i], prize);
        }
        UpdateCardFocusEffects();
    }

    private static void UpdateCard(ReelCardView view, Prize prize)
    {
        view.icon.sprite = prize.Sprite;
        view.rarityStrip.color = RarityColor(prize.Rarity);
        view.label.text = prize.Name;
    }

    private void BeginOpening() { if (!isOpening) StartCoroutine(OpenRoutine()); }

    private IEnumerator OpenRoutine()
    {
        isOpening = true; openButton.interactable = false;
        backgroundDim.SetActive(false);
        reelPanel.SetActive(false);
        chestIntro.SetActive(true);
        const float openingSpeed = 4f;
        float unlockDuration = Mathf.Max(0.01f, (caseAudio.UnlockDuration > 0f ? caseAudio.UnlockDuration : 1.2f) / openingSpeed);
        chestOpening.Play(unlockDuration);
        caseAudio.Unlock(openingSpeed);
        // Play the recorded latch/opening sequence before starting the reel.
        yield return new WaitForSecondsRealtime(unlockDuration - 0.405f);
        caseAudio.FinishUnlock();
        title.SetActive(false);
        openButton.gameObject.SetActive(false);
        //chestIntro.SetActive(false);
        reelPanel.SetActive(true);
        backgroundDim.SetActive(true);
        spin.SetActive(true);
        // Every opening awards the x100 treadmill; surrounding cards remain varied.
        Prize winner = prizes[GuaranteedPrizeIndex];
        PopulateReel(winner);
        float viewportWidth = ((RectTransform)reel.parent).rect.width;
        float cardCenter = WinnerIndex * (CardWidth + CardGap) + CardWidth * 0.5f;
        float targetX = viewportWidth * 0.5f - cardCenter;
        float startX = viewportWidth * 0.5f - CardWidth * 0.5f;
        reel.anchoredPosition = new Vector2(startX, 0);
        const float duration = 7.2f;
        float elapsed = 0;
        int previousCard = 0;
        while (elapsed < duration)
        {
            elapsed += Time.unscaledDeltaTime;
            float t = Mathf.Clamp01(elapsed / duration);
            float eased = 1f - Mathf.Pow(1f - t, 4.2f);
            reel.anchoredPosition = new Vector2(Mathf.LerpUnclamped(startX, targetX, eased), 0);
            int currentCard = Mathf.FloorToInt((viewportWidth * 0.5f - reel.anchoredPosition.x + CardGap * 0.5f) / (CardWidth + CardGap));
            if (currentCard != previousCard)
            {
                caseAudio.Tick();
                previousCard = currentCard;
            }
            yield return null;
        }
        reel.anchoredPosition = new Vector2(targetX, 0);
        caseAudio.StopReel();
        yield return new WaitForSecondsRealtime(0.45f);
        ShowResult(winner);
        isOpening = false; openButton.interactable = true;
    }

    private Prize SelectWeightedPrize()
    {
        float total = 0; foreach (Prize prize in prizes) total += Mathf.Max(0, prize.Weight);
        float roll = Random.value * total;
        foreach (Prize prize in prizes) { roll -= Mathf.Max(0, prize.Weight); if (roll <= 0) return prize; }
        return prizes[prizes.Count - 1];
    }

    private void ShowResult(Prize prize)
    {
        caseAudio.Reward(prize.Rarity == Rarity.Epic || prize.Rarity == Rarity.UltraRare);
        Color rarity = RarityColor(prize.Rarity);
        resultImage.sprite = prize.Sprite;
        resultRarity.text = RarityName(prize.Rarity).ToUpperInvariant();
        resultRarity.color = rarity; resultName.text = prize.Name;
        resultPanel.SetActive(true); StartCoroutine(PopResult());
    }

    private IEnumerator PopResult()
    {
        float elapsed = 0;
        while (elapsed < 0.28f)
        {
            elapsed += Time.unscaledDeltaTime;
            float t = Mathf.Clamp01(elapsed / 0.28f);
            resultPanel.transform.localScale = Vector3.one * (1f + Mathf.Sin(t * Mathf.PI) * 0.08f);
            yield return null;
        }
        resultPanel.transform.localScale = Vector3.one;
    }

    private void CloseResultAndOpen() { resultPanel.SetActive(false); BeginOpening(); }

    private void Update()
    {
        if (Input.GetKeyDown(KeyCode.Space)) { if (resultPanel.activeSelf) CloseResultAndOpen(); else BeginOpening(); }
        if (Input.GetKeyDown(KeyCode.Escape) && resultPanel.activeSelf) resultPanel.SetActive(false);
    }

    private void LateUpdate()
    {
        UpdateCardFocusEffects();
    }

    private void UpdateCardFocusEffects()
    {
        if (reel == null || reel.parent == null) return;

        if (lensReel == null || lensViewport == null) return;
        lensReel.localScale = Vector3.one * LensZoom;
        Vector2 lensSize = Vector2.one * LensDiameter;
        if (lensViewport.sizeDelta != lensSize)
            lensViewport.sizeDelta = lensSize;
        float mainCenter = ((RectTransform)reel.parent).rect.width * 0.5f;
        float lensCenter = lensViewport.rect.width * 0.5f;
        float zoomedX = lensCenter + (reel.anchoredPosition.x - mainCenter) * LensZoom;
        lensReel.anchoredPosition = new Vector2(zoomedX, 0f);
        if (lensMaterial != null)
        {
            Vector2 center = RectTransformUtility.WorldToScreenPoint(null, lensViewport.position);
            float scale = Mathf.Abs(lensViewport.lossyScale.x);
            lensMaterial.SetVector("_LensCenter", new Vector4(center.x / Screen.width, center.y / Screen.height, 0f, 0f));
            lensMaterial.SetFloat("_LensRadius", LensDiameter * 0.5f * scale);
            lensMaterial.SetFloat("_LensSoftness", Mathf.Clamp(lensEdgeSoftness, 0f, LensDiameter * 0.5f) * scale);
            if (outsideBlurMaterial != null)
            {
                outsideBlurMaterial.SetVector("_LensCenter", new Vector4(center.x / Screen.width, center.y / Screen.height, 0f, 0f));
                outsideBlurMaterial.SetFloat("_LensRadius", LensDiameter * 0.5f * scale);
                outsideBlurMaterial.SetFloat("_LensSoftness", Mathf.Clamp(lensEdgeSoftness, 0f, LensDiameter * 0.5f) * scale);
                outsideBlurMaterial.SetFloat("_BlurRadius", Mathf.Clamp(outsideBlurStrength, 0f, 12f) * scale);
            }
        }
    }

    private void OnDestroy()
    {
        if (openButton != null) openButton.onClick.RemoveListener(BeginOpening);
        if (lensMaterial != null) Destroy(lensMaterial);
        if (outsideBlurMaterial != null) Destroy(outsideBlurMaterial);
    }

    private static Color RarityColor(Rarity rarity)
    {
        switch (rarity)
        {
            case Rarity.Common: return new Color(0.25f, 0.55f, 0.95f);
            case Rarity.Uncommon: return new Color(0.48f, 0.3f, 0.95f);
            case Rarity.Rare: return new Color(0.82f, 0.22f, 0.86f);
            case Rarity.Epic: return new Color(0.95f, 0.19f, 0.37f);
            default: return new Color(1f, 0.72f, 0.08f);
        }
    }

    private static string RarityName(Rarity rarity)
    {
        switch (rarity)
        {
            case Rarity.Common: return "Mil-Spec Grade";
            case Rarity.Uncommon: return "Restricted";
            case Rarity.Rare: return "Classified";
            case Rarity.Epic: return "Covert";
            default: return "Ultra Rare";
        }
    }

}
