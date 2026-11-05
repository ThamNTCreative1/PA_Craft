using UnityEngine;
using UnityEngine.UI;

// The original Lucky_ui UI particles (yellow VFX_Blick_5 stars, 20/s, 0.5 s life, grow then shrink while turning),
// replayed with Images (sprites) placed in the scene: Luna does not draw ParticleSystems on an overlay canvas, nor
// RawImages with these textures.
// Each star is reused: when its life ends it reappears somewhere else inside the radius.
// Sizes go through localScale over the fixed rect saved in the scene.
public class PlayableUISparkle : MonoBehaviour
{
    public Image[] stars;
    [Tooltip("Optional sun rays (Lucky child, SunShines4): fade in and out, turned at random each cycle.")]
    public Image[] rays;
    public Color color=new Color(1,.93f,.1f,1);
    public float radius=60, minSize=20, maxSize=50, minLife=.25f, maxLife=.5f, spin=180;
    public float rayLife=2.5f, raySize=260;

    private float[] age, life, size, turn;
    private float[] rayAge;

    private void OnEnable()
    {
        int n=stars!=null?stars.Length:0;
        foreach(Image star in stars??new Image[0])if(star)star.rectTransform.sizeDelta=new Vector2(maxSize,maxSize);
        foreach(Image ray in rays??new Image[0])if(ray)ray.rectTransform.sizeDelta=new Vector2(raySize,raySize);
        age=new float[n];life=new float[n];size=new float[n];turn=new float[n];
        // Spread the first births so the stars do not all pop together.
        for(int i=0;i<n;i++){Respawn(i);age[i]=-Random.Range(0,maxLife);}
        int r=rays!=null?rays.Length:0;rayAge=new float[r];
        for(int i=0;i<r;i++){rayAge[i]=rayLife*i/Mathf.Max(1,r);RespawnRay(i);}
    }
    private void Respawn(int i)
    {
        age[i]=0;life[i]=Random.Range(minLife,maxLife);size[i]=Random.Range(minSize,maxSize);turn[i]=Random.Range(-spin,spin);
        RectTransform t=stars[i].rectTransform;
        t.anchoredPosition=Random.insideUnitCircle*radius;t.localRotation=Quaternion.Euler(0,0,Random.Range(0,360f));
    }
    private void RespawnRay(int i){rays[i].rectTransform.localRotation=Quaternion.Euler(0,0,Random.Range(0,360f));}
    private void Update()
    {
        float dt=Time.unscaledDeltaTime;
        for(int i=0;i<age.Length;i++)
        {
            Image star=stars[i];if(!star)continue;
            age[i]+=dt;
            if(age[i]<0){Set(star,0,0);continue;}
            if(age[i]>=life[i])Respawn(i);
            float k=age[i]/life[i];
            // Size over lifetime: up to full size at the middle of its life, back to nothing at the end.
            Set(star,size[i]/maxSize*Mathf.Sin(k*Mathf.PI),1);
            star.rectTransform.localRotation*=Quaternion.Euler(0,0,turn[i]*dt);
        }
        for(int i=0;i<rayAge.Length;i++)
        {
            Image ray=rays[i];if(!ray)continue;
            rayAge[i]+=dt;if(rayAge[i]>=rayLife){rayAge[i]-=rayLife;RespawnRay(i);}
            float k=rayAge[i]/rayLife;
            Set(ray,.8f+.2f*k,Mathf.Sin(k*Mathf.PI)*.8f);
        }
    }
    private void Set(Image image,float scale,float alpha)
    {
        image.rectTransform.localScale=new Vector3(scale,scale,1);
        Color c=color;c.a*=alpha;image.color=c;
    }
}
