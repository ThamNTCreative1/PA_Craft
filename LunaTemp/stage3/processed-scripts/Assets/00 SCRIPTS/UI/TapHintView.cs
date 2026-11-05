using UnityEngine;
using UnityEngine.UI;

// Tutorial tap hand: while active, the hand presses down and the shine flashes under the fingertip
// (original Instruction Spine "tab", 0.67 s). Showing or hiding it is up to whoever owns the hint.
public class TapHintView : MonoBehaviour
{
    public RectTransform hand, shine;
    public Graphic shineGraphic;

    private void Update()
    {
        float t=Mathf.Repeat(Time.unscaledTime,.667f);
        float lift=t<.2f?t/.2f:t<.33f?1-(t-.2f)/.13f*1.5f:t<.667f?-.5f*(1-(t-.33f)/.337f):0;
        if(hand)
        {
            hand.localPosition=new Vector3(lift*10,lift*12,0);
            hand.localRotation=Quaternion.Euler(0,0,8*Mathf.Max(0,lift));
        }
        if(shine)
        {
            float flash=t>=.3f && t<.667f?1-Mathf.Abs((t-.467f)/.2f):0;
            if(shineGraphic){Color c=shineGraphic.color;c.a=Mathf.Clamp01(flash);shineGraphic.color=c;}
            shine.localScale=Vector3.one*(.6f+.6f*Mathf.Clamp01((t-.3f)/.37f));
        }
    }
}
