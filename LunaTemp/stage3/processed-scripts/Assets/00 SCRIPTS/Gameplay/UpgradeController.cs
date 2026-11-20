using UnityEngine;
using UnityEngine.UI;
using TMPro;

// Upgrade popup (source UpgradeManager + Canvas/Upgrade page): Speed and Jump height levels bought with coins.
// Price = level x priceMultiply (100, 200, 300...). Each level adds 'multiply' to the source base value
// (PLAYER_DEFAULT_MOVE_SPEED 1.5 / PLAYER_JUMP_STRENGTH 5), applied to the player's run speed / jump impulse.
public class UpgradeController : MonoBehaviour
{
    [SerializeField] private HuntGameController game;
    [SerializeField] private PlayerMotor motor;

    [Header("Popup")]
    [SerializeField] private GameObject panel;
    [SerializeField] private Button openButton;
    [SerializeField] private Button closeButton;

    [Header("Rows")]
    [SerializeField] private Button speedButton;
    [SerializeField] private TMP_Text speedTitle;
    [SerializeField] private TMP_Text speedPrice;
    [SerializeField] private Button jumpButton;
    [SerializeField] private TMP_Text jumpTitle;
    [SerializeField] private TMP_Text jumpPrice;
    [SerializeField] private string speedTitleFormat = "Speed:\n<color=#FFE100>Level {0}</color>";
    [SerializeField] private string jumpTitleFormat = "Jump height:\n<color=#FFE100>Level: {0}</color>";

    [Header("HUD")]
    [SerializeField] private TMP_Text hudSpeed;
    [SerializeField] private TMP_Text hudJump;
    [SerializeField] private string hudFormat = "Level {0}";
    [Tooltip("The red \"!\" on the Upgrade button: shown when an upgrade can be paid.")]
    [SerializeField] private GameObject canUpgradeIcon;
    [SerializeField] private ParticleSystem upgradeVfx;

    [Header("Source UpgradeManager values")]
    [SerializeField] private float speedMultiply = 0.4f;
    [SerializeField] private float baseSpeedFactor = 1.5f;
    [SerializeField] private float jumpMultiply = 0.4f;
    [SerializeField] private float baseJumpFactor = 5f;
    [SerializeField] private int priceMultiply = 100;

    [Header("Audio")]
    [SerializeField] private AudioSource sfx;
    [SerializeField] private AudioClip buyClip;
    [SerializeField] private AudioClip errorClip;
    [SerializeField] private AudioClip clickClip;

    private int speedLevel = 1;
    private int jumpLevel = 1;
    private float baseRunSpeed;
    private float baseJumpImpulse;
    private int shownCoins = -1;

    private void Start()
    {
        baseRunSpeed = motor.RunSpeed;
        baseJumpImpulse = motor.JumpImpulse;
        if (panel) panel.SetActive(false);
        if (openButton) openButton.onClick.AddListener(Open);
        if (closeButton) closeButton.onClick.AddListener(Close);
        if (speedButton) speedButton.onClick.AddListener(BuySpeed);
        if (jumpButton) jumpButton.onClick.AddListener(BuyJump);
        if (upgradeVfx) { upgradeVfx.gameObject.SetActive(true); upgradeVfx.Stop(); }
        Apply();
        Refresh();
    }

    private int SpeedPrice { get { return speedLevel * priceMultiply; } }
    private int JumpPrice { get { return jumpLevel * priceMultiply; } }

    public void Open()
    {
        Play(clickClip);
        Refresh();
        if (panel) panel.SetActive(true);
    }

    public void Close()
    {
        Play(clickClip);
        if (panel) panel.SetActive(false);
    }

    private void BuySpeed()
    {
        if (!game.TrySpend(SpeedPrice)) { Play(errorClip); return; }
        speedLevel++;
        Bought();
    }

    private void BuyJump()
    {
        if (!game.TrySpend(JumpPrice)) { Play(errorClip); return; }
        jumpLevel++;
        Bought();
    }

    private void Bought()
    {
        Play(buyClip);
        if (upgradeVfx) upgradeVfx.Play();
        Apply();
        Refresh();
    }

    private void Apply()
    {
        motor.RunSpeed = baseRunSpeed * (baseSpeedFactor + speedMultiply * (speedLevel - 1)) / baseSpeedFactor;
        motor.JumpImpulse = baseJumpImpulse * (baseJumpFactor + jumpMultiply * (jumpLevel - 1)) / baseJumpFactor;
    }

    private void Refresh()
    {
        if (speedTitle) speedTitle.text = string.Format(speedTitleFormat, speedLevel);
        if (jumpTitle) jumpTitle.text = string.Format(jumpTitleFormat, jumpLevel);
        if (speedPrice) speedPrice.text = SpeedPrice.ToString();
        if (jumpPrice) jumpPrice.text = JumpPrice.ToString();
        if (hudSpeed) hudSpeed.text = string.Format(hudFormat, speedLevel);
        if (hudJump) hudJump.text = string.Format(hudFormat, jumpLevel);
        shownCoins = game.Coins;
        if (canUpgradeIcon)
        {
            bool can = game.Coins >= Mathf.Min(SpeedPrice, JumpPrice);
            if (canUpgradeIcon.activeSelf != can) canUpgradeIcon.SetActive(can);
        }
    }

    private void Update()
    {
        if (game.Coins != shownCoins) Refresh();
    }

    private void Play(AudioClip clip)
    {
        if (sfx && clip) sfx.PlayOneShot(clip);
    }
}
