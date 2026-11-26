using System;
using UnityEngine;
using UnityEngine.UI;
using TMPro;

// Scene references to the original UI (assigned in the Editor by Steal Egg/Bind UI references).
public partial class StealEggGame
{
    [Serializable] public class HudUI
    {
        public RectTransform functions;
        [Tooltip("Context buttons under functions; the GameObject name is the action key.")]
        public GameObject[] actionButtons;
        public TapHintView incubateTapHint, hatchTapHint, equipTapHint, trainTapHint;
        public Button attack, settings, trailShop, index, speedMode;
        public GameObject speedOn, speedOff;
        public TMP_Text money, speed, time;
        public Image moneyIcon, speedIcon, timeIcon;
        public GameObject indexHighlight, incubateHighlight, right;
        public Button equipMonster, incubateEgg;
        public Transform boostContainer;
        public IconAmountView boostTemplate;
        public GameObject zoneBanner;
        public RectTransform zoneFrame;
        public TMP_Text zoneName;
        public Transform incomeTemplate;
    }
    [Serializable] public class PetsPopupUI
    {
        public GameObject root;
        public Transform content;
        public PetRowView template;
        public Button close, equipBest, upgradeSlot;
        public TMP_Text slots, upgradePrice;
        public GameObject upgradeUnavailable;
    }
    [Serializable] public class IncubatePopupUI
    {
        public GameObject root;
        public Transform content;
        public IncubateRowView template;
        public Button close;
    }
    [Serializable] public class InventoryUI
    {
        public QuickSlotView[] quickSlots;
        public Button bag, bagClose;
        public GameObject bagPopup;
        public Transform bagContent;
        public BagCellView bagTemplate;
        public GameObject petInfo;
        public Image petThumbnail;
        public TMP_Text petName, petIncome, petRarity;
        public Button petEquip, petDrop;
        public GameObject eggInfo;
        public Image eggThumbnail;
        public TMP_Text eggName, eggWeight;
        public Button eggIncubate, eggDrop;
    }
    [Serializable] public class RewardUI
    {
        public GameObject root;
        public TMP_Text title;
        public Transform content;
        public IconAmountView template;
        public Button close, tapToClose;
    }
    [Serializable] public class DialogUI
    {
        public GameObject root;
        public TMP_Text message;
    }
    // Features left to the full game: the popup only holds its title, close button and the PLAY NOW CTA.
    [Serializable] public class LockedPanelUI
    {
        public GameObject root;
        public Button close;
    }
    [Serializable] public class TreadmillPanelUI
    {
        public GameObject root;
        public Button close, upgrade;
        public TMP_Text level, train, price;
        public GameObject max;
    }
    [Serializable] public class IndexUI
    {
        public GameObject root;
        public Button close, claim;
        public Transform zones;
        public IndexZoneView zoneTemplate;
        [Tooltip("Placeholder row for the zones of the full game, kept after the playable's zones.")]
        public Transform lockedZone;
        public Image progressFill;
        public TMP_Text progress;
        public GameObject information, rewardFrame, claimed;
        public Image infoImage;
        public TMP_Text infoName, infoIncome, infoRarity;
        public Transform rewardContent;
        public IconAmountView rewardTemplate;
    }

    [Header("Original UI (scene references)")]
    [SerializeField] private HudUI hudUI;
    [SerializeField] private PetsPopupUI petsUI;
    [SerializeField] private IncubatePopupUI incubateUI;
    [SerializeField] private InventoryUI inventoryUI;
    [SerializeField] private RewardUI rewardUI;
    [SerializeField] private DialogUI dialogUI;
    [SerializeField] private GameObject warningPanel;
    [SerializeField] private TreadmillPanelUI treadmillUI;
    [SerializeField] private IndexUI indexUI;
    [SerializeField] private LockedPanelUI settingsUI, coopUI, fuseUI, frogUI, shopUI, trailUI;
}
