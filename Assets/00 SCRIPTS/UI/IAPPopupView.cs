using UnityEngine;
using UnityEngine.UI;
using TMPro;

// The original IAP shop (SAE_IAPShop, Mecha Egg offer) used as a store CTA: both buy buttons open the store,
// the popup cannot be closed. The version picks the button labels and which button the tutorial hand points at.
public class IAPPopupView : MonoBehaviour
{
    public Button buy10, buy1;
    public TMP_Text label10, label1;
    [Tooltip("The '10 eggs' / '1 egg' captions above the buttons (hidden when the buttons themselves say it).")]
    public GameObject caption10, caption1;
    public TapHintView hint10, hint1;
    public string price10="$7.99", price1="$0.99", eggs10="10 eggs", eggs1="1 egg";
    [Tooltip("Same sounds as the game's other popups: opening (sae_PopupSound) and button press (SAE_ButtonSelected).")]
    public AudioSource sound;
    public AudioClip openSound, clickSound;

    // 1: prices, hand on the 10-egg button   2: prices, hand on the 1-egg button
    // 3: "10 eggs"/"1 egg" on the buttons, hand on 10 eggs   4: the same, hand on 1 egg
    public void Show(int version,UnityEngine.Events.UnityAction onBuy)
    {
        bool eggText=version>=3, handOn10=version==1 || version==3;
        if(label10)label10.text=eggText?eggs10:price10;
        if(label1)label1.text=eggText?eggs1:price1;
        if(caption10)caption10.SetActive(!eggText);
        if(caption1)caption1.SetActive(!eggText);
        if(hint10)hint10.gameObject.SetActive(handOn10);
        if(hint1)hint1.gameObject.SetActive(!handOn10);
        foreach(Button b in new[]{buy10,buy1})
        {
            if(!b)continue;
            b.onClick.RemoveAllListeners();
            b.onClick.AddListener(()=>{if(sound && clickSound)sound.PlayOneShot(clickSound);});
            b.onClick.AddListener(onBuy);
        }
        gameObject.SetActive(true);
        if(sound && openSound)sound.PlayOneShot(openSound);
    }
}
