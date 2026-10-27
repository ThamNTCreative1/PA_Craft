using UnityEngine;

/// <summary>Input/state only; all controls are authored and saved in the scene.</summary>
public sealed class BuildTouchControls : MonoBehaviour
{
    public event System.Action FlyClicked;
    public Vector2 Movement { get; private set; }
    public float Vertical => (upId!=-99?1:0)-(downId!=-99?1:0);
    public bool Flying { get; private set; }
    public bool ThirdPerson { get; private set; }
    public bool JustLanded { get; private set; }
    int stickId=-99,upId=-99,downId=-99;
    [SerializeField] RectTransform stick,knob,fly,up,down,exit;
    [SerializeField] RectTransform viewButton;
    public void Initialize()
    {
        if(stick==null||knob==null||fly==null||up==null||down==null||exit==null)
        {Debug.LogError("Assign saved UI controls in the scene.",this);enabled=false;return;}
        ThirdPerson=false;
        ResetInput();SetFlight(false);
    }
    void Update(){if(knob!=null&&stick!=null)knob.anchoredPosition=Movement*(stick.rect.width*.3f);}
    public bool Begin(int id,Vector2 p)
    {
        if(CraftHudStyle.Hit(viewButton,p)){ThirdPerson=!ThirdPerson;return true;}
        if(CraftHudStyle.Hit(stick,p)){if(stickId==-99){stickId=id;Move(id,p);}return true;}
        if(CraftHudStyle.Hit(fly,p)){SetFlight(true);FlyClicked?.Invoke();return true;}
        if(CraftHudStyle.Hit(exit,p)){SetFlight(false);JustLanded=true;return true;}
        if(CraftHudStyle.Hit(up,p)){if(upId==-99)upId=id;return true;}
        if(CraftHudStyle.Hit(down,p)){if(downId==-99)downId=id;return true;}
        return false;
    }
    public void Move(int id,Vector2 p)
    {
        if(id!=stickId)return;
        Vector2 local;
        if(RectTransformUtility.ScreenPointToLocalPointInRectangle(stick,p,null,out local))
            Movement=Vector2.ClampMagnitude((local-stick.rect.center)/(stick.rect.width*.3f),1);
    }
    public void End(int id){if(id==stickId){stickId=-99;Movement=Vector2.zero;}if(id==upId)upId=-99;if(id==downId)downId=-99;}
    void SetFlight(bool value){Flying=value;upId=downId=-99;fly.gameObject.SetActive(!value);up.gameObject.SetActive(value);down.gameObject.SetActive(value);exit.gameObject.SetActive(value);}
    public void ResetInput(){stickId=upId=downId=-99;Movement=Vector2.zero;JustLanded=false;}
    public void AcknowledgeLanding(){JustLanded=false;}
}
