using UnityEngine;
using UnityEngine.EventSystems;
using UnityEngine.UI;

// Original "[Button] Steal" behaviour: hold for a short time while the fill image grows.
public class PlayableHoldButton : MonoBehaviour, IPointerDownHandler, IPointerUpHandler, IPointerExitHandler
{
    public float duration=.6f;
    public Image fill;
    public System.Action onHold;
    private bool holding;
    private float clock;
    public void OnPointerDown(PointerEventData e){holding=true;clock=0;}
    public void OnPointerUp(PointerEventData e){Cancel();}
    public void OnPointerExit(PointerEventData e){Cancel();}
    public void Cancel(){holding=false;clock=0;if(fill)fill.fillAmount=0;}
    private void OnDisable(){Cancel();}
    private void Update()
    {
        if(!holding)return;
        clock+=Time.deltaTime;
        if(fill)fill.fillAmount=Mathf.Clamp01(clock/duration);
        if(clock>=duration){Cancel();if(onHold!=null)onHold();}
    }
}
