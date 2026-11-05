using UnityEngine;
using UnityEngine.UI;

// Original SAE_UIImageArrayDisplayment (IAP featured pet): shows each sprite for showDuration, fading out and in
// over transitionDuration between them.
public class PlayableImageCycle : MonoBehaviour
{
    public Image image;
    public float transitionDuration=.25f, showDuration=1;
    public Sprite[] sprites;
    private int index;
    private float clock;

    private void OnEnable(){index=0;clock=0;if(image && sprites!=null && sprites.Length>0)image.sprite=sprites[0];SetAlpha(1);}
    private void Update()
    {
        if(!image || sprites==null || sprites.Length<2)return;
        clock+=Time.unscaledDeltaTime;
        float t=clock-showDuration;
        if(t<0){SetAlpha(1);return;}
        if(t<transitionDuration){SetAlpha(1-t/transitionDuration);return;}
        if(t<transitionDuration*2)
        {
            int next=(index+1)%sprites.Length;
            if(image.sprite!=sprites[next])image.sprite=sprites[next];
            SetAlpha((t-transitionDuration)/transitionDuration);return;
        }
        index=(index+1)%sprites.Length;clock=0;SetAlpha(1);
    }
    private void SetAlpha(float a){Color c=image.color;c.a=Mathf.Clamp01(a);image.color=c;}
}
