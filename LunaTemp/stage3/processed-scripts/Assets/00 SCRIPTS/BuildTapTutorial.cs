using UnityEngine;

/// <summary>Animates existing scene tutorial UI; no runtime UI creation.</summary>
[DefaultExecutionOrder(100)]
public sealed class BuildTapTutorial : MonoBehaviour
{
    [SerializeField] private GameController controller;
    [SerializeField] private Camera view;
    [SerializeField] private RectTransform container,hand;
    [SerializeField] private CanvasGroup visuals;
    [SerializeField] private float idleSeconds=5f;
    [SerializeField] private BuildProgressUI progressUI;
    [SerializeField] private UnityEngine.UI.Text prompt;
    private string buildPrompt;
    private int buildFontSize;
    private bool wasChangeTutorial;
    private float lastInput,shownAt;
    private bool showing;
    private int lastPart=-1,lastBlock=-1;

    private void OnEnable()
    {
        if(prompt!=null && buildPrompt==null){buildPrompt=prompt.text;buildFontSize=prompt.fontSize;}
        lastInput=Time.unscaledTime-idleSeconds;shownAt=Time.unscaledTime;
        lastPart=lastBlock=-1;
        if(controller!=null)controller.GuideBuildAccepted+=OnGuideClicked;
    }
    private void OnGuideClicked()
    {
        lastInput=Time.unscaledTime;
        if(visuals!=null)SetVisible(false);
    }
    private void LateUpdate()
    {
        if(controller==null||view==null||container==null||hand==null||visuals==null)return;
        var slot=progressUI!=null?progressUI.ChangeBlockTutorialTarget:null;
        bool changing=slot!=null && !controller.IsComplete;
        if(wasChangeTutorial && !changing)lastInput=Time.unscaledTime;
        wasChangeTutorial=changing;
        if(prompt!=null)
        {
            prompt.text=changing?"Tap to Change Block":buildPrompt;
            prompt.fontSize=changing?Mathf.Min(buildFontSize,30):buildFontSize;
        }
        if(changing)
        {
            var canvas=slot.GetComponentInParent<Canvas>();
            var uiCamera=canvas!=null && canvas.renderMode!=RenderMode.ScreenSpaceOverlay?canvas.worldCamera:null;
            AnimateHand(RectTransformUtility.WorldToScreenPoint(uiCamera,slot.TransformPoint(slot.rect.center)));
            return;
        }
        bool targetChanged=lastPart!=controller.CurrentPartIndex||lastBlock!=controller.CurrentBlockIndex;
        if(targetChanged)
        {
            lastPart=controller.CurrentPartIndex;lastBlock=controller.CurrentBlockIndex;
            shownAt=Time.unscaledTime;
        }
        Vector3 target;
        bool visible=!controller.IsComplete&&Time.unscaledTime-lastInput>=idleSeconds
            &&controller.TryGetGuidePosition(out target);
        if(!visible){SetVisible(false);return;}
        controller.TryGetGuidePosition(out target);
        Vector3 screen=view.WorldToScreenPoint(target);
        if(screen.z<=0||screen.x<0||screen.x>Screen.width||screen.y<0||screen.y>Screen.height)
        {SetVisible(false);return;}
        AnimateHand(screen);
    }
    private void AnimateHand([Bridge.Ref] Vector2 screen)
    {
        SetVisible(true);
        Vector2 local;
        RectTransformUtility.ScreenPointToLocalPointInRectangle(container,screen,null,out local);
        float phase=Mathf.Repeat(Time.unscaledTime-shownAt,1.2f)/1.2f;
        float press=phase<.5f?1-Mathf.SmoothStep(0,1,phase*2):Mathf.SmoothStep(0,1,(phase-.5f)*2);
        hand.anchoredPosition=local+new Vector2(12,-16)*(1-press);
        hand.localScale=Vector3.one*Mathf.Lerp(1,.9f,press);
    }
    private void SetVisible(bool value)
    {
        if(value&&!showing)shownAt=Time.unscaledTime;
        showing=value;visuals.alpha=value?1:0;
    }
    private void OnDisable()
    {
        if(controller!=null)controller.GuideBuildAccepted-=OnGuideClicked;
        if(visuals!=null)visuals.alpha=0;showing=false;
    }
}
