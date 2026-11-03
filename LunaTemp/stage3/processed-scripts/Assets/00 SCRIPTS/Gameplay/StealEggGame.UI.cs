using System;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UI;

// Original game UI (prefabs baked under originalUI, scripts stripped), driven through the scene references in StealEggGame.UIRefs.
public partial class StealEggGame
{
    private GameObject modal;
    private GameObject[] StationPanels {get{return new[]{coopUI.root,treadmillUI.root,fuseUI.root,shopUI.root,frogUI.root};}}
    private bool IsStationPanel(GameObject panel){return panel && Array.IndexOf(StationPanels,panel)>=0;}
    // Names the bake gives the full-game CTA content (features left to the full game).
    public const string LockedContent="[Locked] Full Game", LockedZone="[Locked] Zone", PlayNowButton="[Button] Play Now";
    // A station panel does not stop the player: walking out of the trigger closes it.
    private bool InputBlocked {get{return (modal!=null && !IsStationPanel(modal)) || (rewardUI.root && rewardUI.root.activeSelf);}}
    private Transform actionTarget;
    private Vector2 functionsHome;
    private readonly Dictionary<string,GameObject> actions=new Dictionary<string,GameObject>();
    private string currentAction="";
    private float speedPulse=-1;
    private readonly List<GameObject> rewardRows=new List<GameObject>();
    // Playable rule: no CanvasGroup. The zone banner fades through its graphics' own alpha.
    private Graphic[] zoneGraphics;private float[] zoneAlphas;
    private float dialogUntil, zoneClock=-1;
    private int zoneInside=-1;
    private class Popup { public Transform t; public Vector3 world; public float clock; public bool screen; }
    private readonly List<Popup> popups=new List<Popup>();
    private readonly bool[] insideStation=new bool[5];
    private static readonly Color[] rarityColors={new Color(.8f,.8f,.8f),new Color(.3f,.9f,.3f),new Color(.2f,.6f,1),new Color(.7f,.3f,1),new Color(1,.7f,.1f),new Color(1,.25f,.25f),new Color(1,.4f,.9f),new Color(.15f,.15f,.15f),new Color(.3f,1,1),new Color(1,1,.4f),new Color(.4f,1,.2f),new Color(.7f,.45f,.2f),new Color(.6f,.85f,1)};

    private void BindOriginalUI()
    {
        if(!hudUI.functions)throw new InvalidOperationException("Original UI references are missing. Run Steal Egg/Bind UI references in the Unity Editor.");
        functionsHome=hudUI.functions.anchoredPosition;
        foreach(GameObject button in hudUI.actionButtons)
        {
            string key=button.name;actions[key]=button;button.SetActive(false);
            PlayableHoldButton hold=button.GetComponent<PlayableHoldButton>();
            if(hold)hold.onHold=()=>DoAction(key);else Bind(button.GetComponent<Button>(),()=>DoAction(key));
        }
        Bind(hudUI.attack,Attack);Show(hudUI.attack,false);
        Bind(hudUI.settings,()=>OpenModal(settingsUI.root));
        Bind(hudUI.trailShop,OpenTrailShop);
        Bind(hudUI.index,OpenIndex);
        Bind(hudUI.speedMode,()=>{slowMode=!slowMode;RefreshSpeedToggle();});
        RefreshSpeedToggle();
        SetImage(hudUI.moneyIcon,moneyIcon);SetImage(hudUI.speedIcon,speedIcon);
        if(hudUI.zoneFrame)
        {
            zoneGraphics=hudUI.zoneFrame.GetComponentsInChildren<Graphic>(true);zoneAlphas=new float[zoneGraphics.Length];
            for(int i=0;i<zoneGraphics.Length;i++)zoneAlphas[i]=zoneGraphics[i].color.a;
        }
        Show(hudUI.zoneBanner,false);
        BindInventoryUI();
        Show(warningPanel,false);Show(dialogUI.root,false);
        Bind(rewardUI.close,()=>rewardUI.root.SetActive(false),true);
        Bind(rewardUI.tapToClose,()=>rewardUI.root.SetActive(false),true);
        Show(rewardUI.root,false);
        foreach(LockedPanelUI locked in new[]{settingsUI,coopUI,fuseUI,frogUI,shopUI,trailUI}){Bind(locked.close,CloseModal,true);Show(locked.root,false);}
        BindHomeUI();BindIndexUI();
        RefreshInventoryUI();
    }

    // ---- Tutorial hands (original Instruction: Spine "tab", the fingertip at the hand image's top corner) ----
    // Each hint's root sits on the fingertip; its "Hand" child is the hand image pivoted on the fingertip.
    private void UpdateTutorialHints()
    {
        bool free=!Blocked && !IsKnockedDown && !training;
        // Joystick: until the first move.
        bool drag=free && !firstInput && hintHand;
        if(hintHand && hintHand.gameObject.activeSelf!=drag)hintHand.gameObject.SetActive(drag);
        // The fingertip circles along the handle's path: the edge of the joystick background (size set in the scene).
        if(drag){float r=joystick.Radius;hintHand.anchoredPosition=new Vector2(Mathf.Sin(Time.time*2.5f)*r,Mathf.Cos(Time.time*2.5f)*r);}
        // Each hint follows as soon as the previous one is done: move -> turn the camera -> jump.
        bool swipe=free && cameraHint && firstInput && !cameraTurned;
        if(cameraHint && cameraHint.gameObject.activeSelf!=swipe)cameraHint.gameObject.SetActive(swipe);
        if(swipe)cameraHint.anchoredPosition=new Vector2(Mathf.Lerp(-160,160,Mathf.PingPong(Time.time*.8f,1)),0);
        bool jump=free && jumpHint && cameraTurned && !jumped;
        if(jumpHint && jumpHint.gameObject.activeSelf!=jump)jumpHint.gameObject.SetActive(jump);
        if(jump)AnimateTapHand(jumpHint);
        if(tutorialText)
        {
            // After the three control hints, "Steal An Egg" pulses until the first egg is taken (then never again).
            bool steal=free && jumped && !stoleEgg;
            string text=drag?"Use the joystick to move":swipe?"Swipe to turn the camera":jump?"Tap to jump":steal?"Steal An Egg":"";
            bool showText=text!="";
            if(tutorialText.gameObject.activeSelf!=showText)tutorialText.gameObject.SetActive(showText);
            if(showText)
            {
                if(tutorialText.text!=text)tutorialText.text=text;
                tutorialText.transform.localScale=Vector3.one*(steal?1+.12f*Mathf.Sin(Time.time*5):1);
            }
        }
        UpdateTapHint();
    }
    // Scene objects: a "Tap hint" child (Hand, Shine) placed under the Incubate, Hatch, Equip and Train buttons; code only shows and animates it.
    public const string TapHintName="Tap hint";
    private void UpdateTapHint()
    {
        UpdateTapHint(hudUI.incubateTapHint,TutorialStep.Incubate,"[Button] Incubate");
        UpdateTapHint(hudUI.hatchTapHint,TutorialStep.Hatch,"[Button] Hatch");
        UpdateTapHint(hudUI.equipTapHint,TutorialStep.Equip,"[Button] Equip Monster");
        UpdateTapHint(hudUI.trainTapHint,TutorialStep.Train,"[Button] Use Treadmil");
    }
    private void UpdateTapHint(TapHintView hint,TutorialStep step,string action)
    {
        if(!hint)return;
        bool show=!Blocked && !IsKnockedDown && Step==step && currentAction==action;
        Show(hint.gameObject,show);
        if(show)AnimateTapHand(hint);
    }
    // "tab" (0.67 s): the hand lifts, presses down onto the button, settles; the shine flashes as it presses.
    private static void AnimateTapHand(TapHintView hint)
    {
        float t=Mathf.Repeat(Time.time,.667f);
        float lift=t<.2f?t/.2f:t<.33f?1-(t-.2f)/.13f*1.5f:t<.667f?-.5f*(1-(t-.33f)/.337f):0;
        if(hint.hand)
        {
            hint.hand.localPosition=new Vector3(lift*10,lift*12,0);
            hint.hand.localRotation=Quaternion.Euler(0,0,8*Mathf.Max(0,lift));
        }
        if(hint.shine)
        {
            float flash=t>=.3f && t<.667f?1-Mathf.Abs((t-.467f)/.2f):0;
            if(hint.shineGraphic){Color c=hint.shineGraphic.color;c.a=Mathf.Clamp01(flash);hint.shineGraphic.color=c;}
            hint.shine.localScale=Vector3.one*(.6f+.6f*Mathf.Clamp01((t-.3f)/.37f));
        }
    }

    // ---- Context buttons above the target (SAE_GamePlayPanel.LockToTarget) ----
    private void UpdateInteraction()
    {
        if(IsCarrying && player.position.z<=safePoint.position.z)GatherEgg();
        string action="";Transform target=null;nearby=null;
        if(!Blocked && !training && !IsKnockedDown)
        {
            if(IsCarrying)action="[Button] DropStealingEgg";  // Original: shown whenever an egg is being stolen.
            else
            {
                Incubator ready=NearestIncubator(true);LuckyEgg lucky=NearestLuckyEgg();
                if(hand!=null && hand.kind==ItemKind.Egg && InsideMyCoop)action="[Button] Incubate";
                else if(hand!=null && hand.kind==ItemKind.Pet && InsideMyCoop)action="[Button] Equip Monster";
                else if(ready!=null){action="[Button] Hatch";target=ready.obj;}
                else if(lucky!=null){action="[Button] Open Lucky Egg";target=lucky.obj;}
                else if(NearTreadmill){action="[Button] Use Treadmil";target=MyHouse.TrainSlot;}
                else if(TutorialCompleted || Step==TutorialStep.Steal)
                {
                    float best=3.4f;
                    foreach(Egg egg in eggs)if(egg.Available){float d=FlatDistance(player.position,egg.transform.position);if(d<best){best=d;nearby=egg;}}
                    if(nearby!=null){action="[Button] Steal";target=nearby.transform;}
                }
            }
        }
        if(action!=currentAction)foreach(var pair in actions)pair.Value.SetActive(pair.Key==action);
        currentAction=action;actionTarget=target;
        if(!IsKnockedDown && !training)UpdateStations();
    }
    private void DoAction(string key)
    {
        if(Blocked || IsKnockedDown || key!=currentAction)return;
        if(key=="[Button] Steal" && nearby!=null && nearby.Available)TakeEgg(playerActor,nearby);
        else if(key=="[Button] DropStealingEgg")DropEgg();
        else if(key=="[Button] Incubate")IncubateHand();
        else if(key=="[Button] Equip Monster")EquipHandPet();
        else if(key=="[Button] Hatch")Hatch(NearestIncubator(true));
        else if(key=="[Button] Use Treadmil")BeginTraining();
        else if(key=="[Button] Open Lucky Egg")OpenLuckyEgg(NearestLuckyEgg());
    }
    private void PressPrimaryAction(){if(currentAction!="")DoAction(currentAction);}
    private void UpdateStations()
    {
        Station(0,MyHouse.coopPad,coopUI.root,null);
        Station(1,MyHouse.treadmillPad,treadmillUI.root,RefreshPads);
        Station(2,fuseMachine,fuseUI.root,null);
        Station(3,exchangeShop,shopUI.root,null);
        Station(4,luckyFrog,frogUI.root,null);
    }
    // Original trigger enter/exit: the panel opens when the player steps in and closes when they leave.
    private void Station(int index,Transform station,GameObject panel,Action onOpen)
    {
        if(!station || !panel)return;
        bool inside=NearStation(station);
        if(inside && !insideStation[index] && !Blocked){OpenModal(panel);if(onOpen!=null)onOpen();}
        if(!inside && insideStation[index] && modal==panel)CloseModal();
        insideStation[index]=inside;
    }
    private bool NearStation(Transform station)
    {
        Collider c=station.GetComponent<Collider>();Bounds b=new Bounds();
        if(c && !triggerBounds.TryGetValue(c,out b) && c.enabled)b=c.bounds;
        // Read-only test (no Expand): in Luna, Bounds is a reference type and expanding grew the stored station volume every frame.
        if(b.size!=Vector3.zero)
        {
            Vector3 p=player.position,min=b.min,max=b.max;
            return p.x>=min.x-.5f && p.x<=max.x+.5f && p.z>=min.z-.5f && p.z<=max.z+.5f;
        }
        return FlatDistance(player.position,station.position)<2.5f;
    }
    private void OpenModal(GameObject panel)
    {
        if(!panel)return;
        if(modal && modal!=panel)modal.SetActive(false);
        modal=panel;panel.SetActive(true);if(!IsStationPanel(panel))joystick.ResetInput();PlaySound(popupSound);
        Show(hudUI.right,panel!=petsUI.root && panel!=incubateUI.root);
    }
    private void CloseModal()
    {
        if(modal)modal.SetActive(false);
        modal=null;Show(hudUI.right,true);
    }

    // ---- HUD ----
    private void UpdateHud()
    {
        SetText(hudUI.money,"$"+Num(Money));
        SetText(hudUI.speed,Num(SpeedPower));
        if(hudUI.speedIcon)
        {
            float t=speedPulse<0?1:(Time.time-speedPulse)/.2f;
            hudUI.speedIcon.transform.localScale=Vector3.one*(t<1?1+.11f*Mathf.Sin(t*Mathf.PI):1);
        }
        // The day/night clock starts with the end of the tutorial; until then the label keeps its scene text.
        if(hudUI.time && TutorialCompleted)
        {
            int s=Mathf.CeilToInt(PhaseLeft),m=s/60;s%=60;
            SetText(hudUI.time,(m>0?m+"m":"")+s+"s");
        }
        SetImage(hudUI.timeIcon,night?dayIcon:nightIcon);
        Show(hudUI.indexHighlight,IndexClaimable);
        Show(hudUI.incubateHighlight,AnyIncubatorReady);
        if(dialogUI.root && dialogUI.root.activeSelf && Time.time>dialogUntil)dialogUI.root.SetActive(false);
        UpdateZoneBanner();
    }
    private void LateUpdateUI()
    {
        UpdatePetInfos();
        RectTransform container=hudUI.functions;
        if(actionTarget && currentAction!="")
        {
            Vector3 screen=gameCamera.WorldToScreenPoint(new Vector3(actionTarget.position.x,TopOf(actionTarget)+.25f,actionTarget.position.z));
            if(screen.z>0)container.position=screen;
        }
        else container.anchoredPosition=functionsHome;
        for(int i=popups.Count-1;i>=0;i--)
        {
            Popup p=popups[i];p.clock+=Time.deltaTime;
            if(p.clock>=1){p.t.gameObject.SetActive(false);if(!p.screen)Destroy(p.t.gameObject);popups.RemoveAt(i);continue;}
            if(p.screen)
            {
                Vector3 screen=gameCamera.WorldToScreenPoint(p.world);
                p.t.position=screen+Vector3.up*100*p.clock;p.t.gameObject.SetActive(screen.z>0);
            }
            else{p.t.position=p.world+Vector3.up*p.clock;p.t.rotation=gameCamera.transform.rotation;}
        }
    }
    private void RefreshSpeedToggle(){Show(hudUI.speedOn,slowMode);Show(hudUI.speedOff,!slowMode);}
    private void PulseSpeedIcon(){speedPulse=Time.time;}
    private void ShowWarning(bool on)
    {
        if(!warningPanel)return;
        if(on && !warningPanel.activeSelf)PlaySound(warningSound);
        warningPanel.SetActive(on);
    }
    private void ShowDialog(string message)
    {
        if(!dialogUI.root)return;
        SetText(dialogUI.message,message);
        dialogUI.root.SetActive(true);dialogUntil=Time.time+1;
    }
    private void UpdateZoneBanner()
    {
        int inside=-1;
        for(int i=0;i<zones.Length;i++)if(InZone(zones[i],player.position)){inside=i;break;}
        if(inside!=zoneInside && inside>=0)
        {
            SetText(hudUI.zoneName,zones[inside].name);
            Show(hudUI.zoneBanner,true);zoneClock=0;
        }
        zoneInside=inside;
        RectTransform zoneFrame=hudUI.zoneFrame;
        if(zoneClock<0 || !zoneFrame)return;
        zoneClock+=Time.deltaTime;
        float t=zoneClock;
        float alpha=t<.25f?t/.25f:t<.75f?1:Mathf.Clamp01((1-t)/.25f);
        for(int i=0;i<zoneGraphics.Length;i++){Color c=zoneGraphics[i].color;c.a=zoneAlphas[i]*alpha;zoneGraphics[i].color=c;}
        zoneFrame.anchoredPosition=new Vector2(zoneFrame.anchoredPosition.x,t<.25f?Mathf.Lerp(100,0,t/.25f):0);
        if(t>=1){zoneClock=-1;Show(hudUI.zoneBanner,false);}
    }
    private void ShowReward(string title,Sprite[] icons,string[] amounts)
    {
        if(!rewardUI.root)return;
        SetText(rewardUI.title,title);
        foreach(GameObject row in rewardRows)Destroy(row);rewardRows.Clear();
        for(int i=0;i<icons.Length;i++)
        {
            IconAmountView row=Instantiate(rewardUI.template,rewardUI.content,false);row.gameObject.SetActive(true);rewardRows.Add(row.gameObject);
            SetImage(row.icon,icons[i]);SetText(row.amount,i<amounts.Length?amounts[i]:"");
        }
        rewardUI.root.SetActive(true);joystick.ResetInput();PlaySound(rewardSound);
    }
    private void IncomePopup([Bridge.Ref] Vector3 world,double amount)
    {
        Transform incomeTemplate=hudUI.incomeTemplate;
        if(!incomeTemplate || FlatDistance(world,player.position)>50)return;
        if(Vector3.Dot(gameCamera.transform.forward,world-player.position)<=0)return;
        Popup popup=null;
        foreach(Transform t in incomeTemplate.parent)if(t!=incomeTemplate && t.name=="Income" && !t.gameObject.activeSelf){popup=new Popup();popup.t=t;break;}
        if(popup==null){popup=new Popup();popup.t=Instantiate(incomeTemplate.gameObject,incomeTemplate.parent,false).transform;popup.t.name="Income";}
        popup.world=world+Vector3.up*2;popup.screen=true;popup.clock=0;
        TMPro.TMP_Text label=popup.t.GetComponentInChildren<TMPro.TMP_Text>(true);if(label)label.text="+$"+Num(amount);
        popup.t.gameObject.SetActive(true);popups.Add(popup);
    }
    private void FloatText([Bridge.Ref] Vector3 world,string text,Sprite icon)
    {
        if(!floatingTextPrefab)return;
        GameObject obj=Instantiate(floatingTextPrefab,world,gameCamera.transform.rotation);
        TMPro.TMP_Text label=obj.GetComponentInChildren<TMPro.TMP_Text>(true);if(label)label.text=text;
        // World-space prefab (not scene UI): its icon is looked up on the spawned instance.
        Transform iconNode=obj.transform.Find("Canvas/Icon");if(iconNode)SetImage(iconNode.GetComponent<Image>(),icon);
        Canvas canvas=obj.GetComponentInChildren<Canvas>(true);if(canvas)canvas.worldCamera=gameCamera;
        Popup popup=new Popup();popup.t=obj.transform;popup.world=world;popups.Add(popup);
    }

    // ---- Helpers ----
    private void Bind(Button button,UnityEngine.Events.UnityAction action,bool close=false)
    {
        if(!button)return;
        button.onClick=new Button.ButtonClickedEvent();
        button.onClick.AddListener(()=>{PlaySound(close?closeSound:clickSound);action();});
    }
    private static void SetText(TMPro.TMP_Text label,string value){if(label && label.text!=value)label.text=value;}
    private static void SetImage(Image image,Sprite sprite){if(image && sprite)image.sprite=sprite;}
    private static void Show(GameObject obj,bool visible){if(obj && obj.activeSelf!=visible)obj.SetActive(visible);}
    private static void Show(Component c,bool visible){if(c)Show(c.gameObject,visible);}
    // Selection marks of the original prefabs ship with their Image disabled (the original toggles the component).
    private static void ShowMark(Graphic mark,bool visible){if(!mark)return;Show(mark.gameObject,visible);if(mark.enabled!=visible)mark.enabled=visible;}
    private string RarityName(int rarity){return RarityNames[Mathf.Clamp(rarity,0,RarityNames.Length-1)];}
    private Color RarityColor(int rarity){return rarityColors[Mathf.Clamp(rarity,0,rarityColors.Length-1)];}
    private void SetRarityText(TMPro.TMP_Text label,int rarity)
    {
        if(!label)return;
        label.text=RarityName(rarity);
        Material[] set=label is TMPro.TextMeshPro && rarityWorldMaterials!=null && rarityWorldMaterials.Length>0?rarityWorldMaterials:rarityMaterials;
        if(set!=null && rarity<set.Length && set[rarity])
        {
            if(rarityFont)label.font=rarityFont;
            label.fontSharedMaterial=set[rarity];
        }
    }
}
