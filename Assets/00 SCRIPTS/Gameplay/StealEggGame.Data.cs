using System;
using UnityEngine;

// Original game tables. Values come from the source ScriptableObjects (remote-config defaults).
public partial class StealEggGame
{
    public static readonly string[] RarityNames={"Common","Uncommon","Rare","Epic","Legendary","Mythic","Cosmic","Secret","Eternal","Divine","Hacked","OG","Celestial"};
    [Serializable] public class PetInfo { public string name; public int rarity, zone; public float income; public Sprite thumbnail; public GameObject prefab; }
    [Serializable] public class TrailInfo { public string name; public int rarity; public float multiplier; public double price; public Sprite thumbnail, frame; public GameObject prefab; }
    [Serializable] public class BoostInfo { public string name; public int type; public float value, duration, weight; public Sprite icon; }
    [Serializable] public class House
    {
        public Transform root, coopPad, treadmillPad, petContainer;
        public BoxCollider[] coopModels;
        public Transform[] treadmills;
        [NonSerialized] public int coopModel=1, treadmill=1;
        public BoxCollider Coop {get{foreach(BoxCollider c in coopModels)if(c && c.gameObject.activeSelf)return c;return coopModels[0];}}
        public Transform TrainSlot {get{Transform t=treadmills[Mathf.Clamp(treadmill-1,0,treadmills.Length-1)];Transform slot=t.Find("TrainSlot");return slot?slot:t;}}
    }
    [Header("Original data")]
    public PetInfo[] petCatalog;
    public TrailInfo[] trails;
    public BoostInfo[] luckyEggRewards;
    // Outfits (original GameItemDatabase: hair models, face/shirt/pants materials; wings left out).
    public GameObject playerHair;
    public GameObject[] outfitHairs;
    public Material[] outfitFaces, outfitShirts, outfitPants;
    public Material[] rarityMaterials;
    // Same gradients for world-space labels (depth-tested, front faces only).
    public Material[] rarityWorldMaterials;
    // The rarity gradient materials are built on this font's atlas; other fonts render them as garbage.
    public TMPro.TMP_FontAsset rarityFont;
    public Sprite[] rarityFrames;
    public Sprite batIcon, nightIcon, dayIcon, trainBoostIcon, incubateBoostIcon;
    public GameObject batPrefab, luckyEggPrefab, incubateTimerPrefab, floatingTextPrefab, npcTemplate;
    public AudioClip footstepSound, clickSound, closeSound, rewardSound, upgradeSound, trainSound, equipSound, fuseSound, frogSound, progressSound, warningSound, crackSound, popupSound;
    [Header("Original balance")]
    public double[] coopPrices={0,2000,21000,138000,1.4e6,1.25e7,1.66e8,2.7e9,3.3e10,2.95e11,3.4e12,2.22e13,3.1e14};
    public int[] coopModelByLevel={1,1,2,2,3,3,4,4,5,5,6,6,7};
    public int coopBaseSlots=4;
    public double[] treadmillPrices={0,15000,250000,5e6,1.2e8,3e9,7.5e10,3e12,5e13,1e18};
    public float[] treadmillTrainValues={2,5,12,30,80,100,200,500,1000,2000};
    [Tooltip("Scales every upgrade and shop price. 1 = original game.")]
    public float priceMultiplier=1;
    public float dayDuration=180, nightDuration=10, nightIncubateMultiplier=30, dayLightIntensity=1.1f, lightTransition=2;
    public float incomeMultiplierBySize=1.1f, sellPriceMultiplier=10, luckyFrogFeedMultiplier=3;
    public float trainTick=.5f, hatchDuration=3, luckyEggOpenDuration=3, fuseDuration=1.8f;
    public int npcCount=4;
    [Tooltip("NPC coops hold npcCoopSmallPets pets under npcCoopBigPetSize (model scale), except one random coop with a single pet at the largest size.")]
    public int npcCoopSmallPets=2;
    public float npcCoopBigPetSize=3.5f;
    public float npcMinSpeed=8, npcMaxSpeed=100, batCooldown=2, batForce=300;
    [Header("Original scene")]
    public House[] houses;
    public Transform fuseMachine, exchangeShop, luckyFrog, luckyEggSpawn, luckyEggTarget, teleportPoint, lobbyCenter, originalUI;
    public Vector3 lobbySize=new Vector3(60,20,60);
    public BoxCollider combatArea;
    public GameObject nightGraphic;
    public TMPro.TMP_Text nightText;
    public Light sun;
    public Transform[] npcModels;
}
