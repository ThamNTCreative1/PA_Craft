using UnityEngine;
using UnityEngine.UI;

/// <summary>Texture-free joystick and flight buttons, polled by the camera input router.</summary>
public sealed class BuildTouchControls : MonoBehaviour
{
    public Vector2 Movement { get; private set; }
    public float Vertical => (upId != -99 ? 1 : 0) - (downId != -99 ? 1 : 0);
    public bool Flying { get; private set; }
    public bool JustLanded { get; private set; }
    int stickId=-99, upId=-99, downId=-99;
    RectTransform stick, knob, fly, up, down, exit;
    float size;
    public void Initialize(Font font)
    {
        var canvas=gameObject.AddComponent<Canvas>(); canvas.renderMode=RenderMode.ScreenSpaceOverlay; canvas.sortingOrder=10;
        stick=Panel("Joystick",new Color(.1f,.16f,.22f,.5f));
        knob=Panel("Joystick Handle",new Color(.7f,.9f,1,.8f));
        fly=Button("FLY",font); up=Button("UP",font); down=Button("DOWN",font); exit=Button("EXIT FLY",font);
        Layout(); SetFlight(false);
    }
    RectTransform Panel(string name,Color color)
    {
        var o=new GameObject(name,typeof(RectTransform),typeof(Image)); o.transform.SetParent(transform,false);
        o.GetComponent<Image>().color=color; o.GetComponent<Image>().raycastTarget=false;
        var r=o.GetComponent<RectTransform>(); r.anchorMin=r.anchorMax=Vector2.zero; r.pivot=Vector2.zero; return r;
    }
    RectTransform Button(string text,Font font)
    {
        var r=Panel(text,new Color(.08f,.15f,.23f,.8f));
        var o=new GameObject("Label",typeof(RectTransform),typeof(Text)); o.transform.SetParent(r,false);
        var rt=o.GetComponent<RectTransform>(); rt.anchorMin=Vector2.zero; rt.anchorMax=Vector2.one; rt.offsetMin=rt.offsetMax=Vector2.zero;
        var label=o.GetComponent<Text>(); label.font=font; label.text=text; label.alignment=TextAnchor.MiddleCenter; label.resizeTextForBestFit=true; label.resizeTextMinSize=12; label.resizeTextMaxSize=30; label.raycastTarget=false;
        return r;
    }
    void Update() { Layout(); }
    void Layout()
    {
        size=Mathf.Clamp(Mathf.Min(Screen.width,Screen.height)*.23f,100,200);
        Place(stick,24,24,size,size);
        Place(knob,24+size*.32f+Movement.x*size*.3f,24+size*.32f+Movement.y*size*.3f,size*.36f,size*.36f);
        float x=Screen.width-size-24;
        Place(fly,x,24,size,size*.45f); Place(exit,x,24,size,size*.45f);
        Place(down,x,36+size*.45f,size,size*.45f); Place(up,x,48+size*.9f,size,size*.45f);
    }
    static void Place(RectTransform r,float x,float y,float w,float h) { r.anchoredPosition=new Vector2(x,y); r.sizeDelta=new Vector2(w,h); }
    static bool Hit(RectTransform r,Vector2 p) { return r.gameObject.activeSelf && new Rect(r.anchoredPosition,r.sizeDelta).Contains(p); }
    public bool Begin(int id,Vector2 p)
    {
        if(Hit(stick,p)) { if(stickId==-99) {stickId=id; Move(id,p);} return true; }
        if(Hit(fly,p)) { SetFlight(true); return true; }
        if(Hit(exit,p)) { SetFlight(false); JustLanded=true; return true; }
        if(Hit(up,p)) { if(upId==-99) upId=id; return true; }
        if(Hit(down,p)) { if(downId==-99) downId=id; return true; }
        return false;
    }
    public void Move(int id,Vector2 p) { if(id==stickId) Movement=Vector2.ClampMagnitude((p-stick.anchoredPosition-Vector2.one*size*.5f)/(size*.3f),1); }
    public void End(int id) { if(id==stickId){stickId=-99;Movement=Vector2.zero;} if(id==upId)upId=-99; if(id==downId)downId=-99; }
    void SetFlight(bool value) { Flying=value; upId=downId=-99; fly.gameObject.SetActive(!value); up.gameObject.SetActive(value); down.gameObject.SetActive(value); exit.gameObject.SetActive(value); }
    public void ResetInput() { stickId=upId=downId=-99; Movement=Vector2.zero; JustLanded=false; }
    public void AcknowledgeLanding() { JustLanded=false; }
}
