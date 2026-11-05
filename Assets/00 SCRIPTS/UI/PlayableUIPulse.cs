using UnityEngine;

// The original DOTweenAnimation on the offer tag: scale to 1.1 over 0.6 s (OutQuad) and back, looping (Yoyo).
public class PlayableUIPulse : MonoBehaviour
{
    public float scale=1.1f, duration=.6f;
    private Vector3 baseScale;
    private void Awake(){baseScale=transform.localScale;}
    private void Update()
    {
        float t=Mathf.PingPong(Time.unscaledTime/duration,1);
        float eased=1-(1-t)*(1-t);  // OutQuad
        transform.localScale=baseScale*Mathf.Lerp(1,scale,eased);
    }
}
