using System;
using System.Collections;
using UnityEngine;
using UnityEngine.Events;
using UnityEngine.UI;
namespace CEBB.Playable
{
    public enum BedroomState { WaitingForStart, FirstBuild, GuidedBuild, FreeBuild, Completed, Ended }
    public enum RoomTutorialStage { PlaceBed, LookAround, Explore, Finished, Move }
    [Serializable] public sealed class FurnitureSlot
    {
        public FurnitureDefinition definition;
        public Transform anchor;
        public Vector3 localPosition,localEulerAngles;
        public Vector3 localScale=Vector3.one;
        public int buildOrder;
        public Button button;public Image frame;public GameObject builtBadge;
        [NonSerialized] public GameObject instance,ghost;
        [NonSerialized] public bool built;
        [NonSerialized] public BoxCollider targetCollider;
    }
    [Serializable] public sealed class FurnitureInventoryEntry
    {
        public FurnitureDefinition definition;public Button button;public Image frame,icon;public Text quantityText;public GameObject emptyBadge;
    }
    [DefaultExecutionOrder(-100)] public sealed class BedroomPlayable:MonoBehaviour
    {
        [Header("Each slot is one placement; definitions may repeat")]
        public FurnitureSlot[] slots;public FurnitureInventoryEntry[] inventory;public GameObject editorPreviewRoot;
        public bool aimToBuild=true;public Material ghostMaterial;public Material ghostOutlineMaterial;public Transform playerBody;public FirstPersonRoom playerController;
        [Header("End trigger: click threshold 0 disables the click limit")]
        [LunaPlaygroundField("Steps to end (0 = no limit)",1)] [Min(0)] public int ctaCountThreshold=0;
        public bool showCtaButton=false,startTapCounts=false;
        public GameObject endOverlayRoot;public Button endOverlayButton;
        public UnityEvent onEndCardRequested=new UnityEvent();
        [Header("Timer")]
        [LunaPlaygroundField("Time limit (seconds)",0)] [Min(.1f)] public float durationSeconds=30;
        public bool stopTimerOnCompletion=true,endOnTimeout=true;
        [Header("Tutorial + search hint")]
        public int firstBedSlot=0;
        public string firstPrompt="TAP THE BED GHOST";
        [Tooltip("After the move tutorial, point the hand at the ghost in view (or the nearest one) until the next build. One time only.")] public bool handAfterMove=false;
        [Min(1)] public int guidedBuildCount=2;
        [Min(5)] public float lookTutorialDegrees=35;
        [Min(.1f)] public float hintDelaySeconds=5;
        [Min(.01f)] public float revealSeconds=.3f;
        [Header("Placement audio")]
        public AudioSource placementAudio;public AudioClip placementSfx;
        [Range(0,1)] public float placementVolume=.65f;
        public UnityEvent onFurniturePlaced=new UnityEvent();
        [Header("UI")]
        public Button startSurface;public GameObject ctaRoot;public Button ctaButton;
        public Text promptText,timerText,countText,progressText;public Image progressFill,lookTutorialLoop;public RectTransform hand;
        public UnityEvent onGameStarted=new UnityEvent(),onGameEnded=new UnityEvent(),onCtaClicked=new UnityEvent();
        [Header("Move tutorial (after the look tutorial)")]
        [LunaPlaygroundField("Show move tutorial",2)] public bool moveTutorial=true;
        [Min(.1f)] public float moveTutorialDistance=1.2f;
        public RoomMovePad moveTutorialPad;public Text moveTutorialLabel;public string moveTutorialText="DRAG TO MOVE";
        [Header("Luna playground: music + logo")]
        public AudioSource bgmSource;
        [LunaPlaygroundAsset("Background music",3)] public AudioClip bgmClip;
        [LunaPlaygroundField("Music volume (0-1)",4)] [Range(0,1)] public float bgmVolume=1f;
        [LunaPlaygroundField("Music on",5)] public bool bgmEnabled=true;
        public Image logoImage;
        [LunaPlaygroundAsset("Game logo",6)] public Texture2D logoTexture;
        [SerializeField] private BedroomState state;
        [SerializeField] private RoomTutorialStage tutorialStage;
        [SerializeField] private int interactionCount,builtCount;
        [SerializeField] private float elapsedSeconds,lookProgress,searchElapsed,moveProgress;
        [SerializeField] private int hintIndex=-1,hintShownCount;
        private int lastInteractionFrame=-1,lastCtaFrame=-1,lastSecond=-1,aimedIndex=-1,selectedInventory=-1,overlayArmedFrame=-1;
        private bool moveGuide;
        private bool animating,started,timerRunning,endedSent,paused,endOverlayArmed,ctaDelivered;
        private Canvas guidanceCanvas;private RectTransform guidanceRect;
        public BedroomState State {get{return state;}}public RoomTutorialStage Tutorial {get{return tutorialStage;}}
        public int InteractionCount {get{return interactionCount;}}public int BuiltCount {get{return builtCount;}}
        public float ElapsedSeconds {get{return elapsedSeconds;}}public int AimedIndex {get{return aimedIndex;}}
        public int HintIndex {get{return hintIndex;}}public int HintShownCount {get{return hintShownCount;}}
        public bool EndOverlayArmed {get{return endOverlayArmed;}}
        public bool CanAim {get{return !animating&&!endOverlayArmed&&tutorialStage!=RoomTutorialStage.LookAround&&tutorialStage!=RoomTutorialStage.Move;}}
        public bool CanMove {get{return (tutorialStage==RoomTutorialStage.Explore||tutorialStage==RoomTutorialStage.Move)&&!endOverlayArmed&&!paused;}}
        public bool AllowLook {get{return tutorialStage!=RoomTutorialStage.PlaceBed&&!endOverlayArmed&&!paused;}}
        private void Awake()
        {
            if(editorPreviewRoot!=null)editorPreviewRoot.SetActive(false);
            ApplyPlaygroundSettings();
            state=BedroomState.WaitingForStart;tutorialStage=RoomTutorialStage.PlaceBed;
            if(promptText!=null){guidanceCanvas=promptText.canvas;guidanceRect=guidanceCanvas.GetComponent<RectTransform>();}
            for(int i=0;i<slots.Length;i++)
            {
                var s=slots[i];if(s.definition==null||s.definition.prefab==null||s.anchor==null){Debug.LogError("Invalid placement "+i,this);continue;}
                s.instance=Instantiate(s.definition.prefab,s.anchor,false);Place(s.instance,s);
                Bounds b=BoundsInAnchor(s.instance,s.anchor);
                s.targetCollider=s.anchor.gameObject.AddComponent<BoxCollider>();s.targetCollider.center=b.center;s.targetCollider.size=b.size;s.targetCollider.isTrigger=true;
                var target=s.anchor.gameObject.AddComponent<FurnitureTarget>();target.owner=this;target.slotIndex=i;
                s.ghost=Instantiate(s.definition.prefab,s.anchor,false);s.ghost.name="Aim preview — "+s.definition.displayName;Place(s.ghost,s);
                foreach(var r in s.ghost.GetComponentsInChildren<Renderer>()){var mats=r.sharedMaterials;for(int k=0;k<mats.Length;k++)mats[k]=ghostMaterial;r.sharedMaterials=mats;r.shadowCastingMode=UnityEngine.Rendering.ShadowCastingMode.Off;r.receiveShadows=false;}
                s.instance.SetActive(false);s.ghost.SetActive(false);
            }
            for(int i=0;i<inventory.Length;i++){int n=i;if(inventory[i].button!=null)inventory[i].button.onClick.AddListener(delegate{SelectInventory(n);});}
            if(startSurface!=null)startSurface.onClick.AddListener(BeginTutorial);if(ctaButton!=null)ctaButton.onClick.AddListener(OpenStore);
            if(endOverlayButton!=null)endOverlayButton.onClick.AddListener(OpenEndCardAndCta);if(endOverlayRoot!=null)endOverlayRoot.SetActive(false);
            if(hand!=null){hand.SetParent(guidanceRect,false);hand.anchorMin=hand.anchorMax=new Vector2(.5f,.5f);}
            SetAimedSlot(firstBedSlot);UpdateUi();
        }
        private void ApplyPlaygroundSettings()
        {
            if(bgmSource!=null)
            {
                bgmSource.playOnAwake=false;if(bgmClip!=null)bgmSource.clip=bgmClip;bgmSource.loop=true;bgmSource.volume=Mathf.Clamp01(bgmVolume);
                if(bgmEnabled&&bgmSource.clip!=null){if(!bgmSource.isPlaying)bgmSource.Play();}else bgmSource.Stop();
            }
            if(logoImage!=null&&logoTexture!=null){logoImage.sprite=Sprite.Create(logoTexture,new Rect(0,0,logoTexture.width,logoTexture.height),new Vector2(.5f,.5f),100f);logoImage.preserveAspect=true;}
        }
        private static void Place(GameObject go,FurnitureSlot s){go.transform.localPosition=s.localPosition;go.transform.localEulerAngles=s.localEulerAngles;go.transform.localScale=s.localScale;}
        private static Bounds BoundsInAnchor(GameObject instance,Transform anchor)
        {
            Bounds result=new Bounds();bool init=false;foreach(var r in instance.GetComponentsInChildren<Renderer>())for(int i=0;i<8;i++)
            {Bounds b=r.bounds;Vector3 p=anchor.InverseTransformPoint(new Vector3((i&1)==0?b.min.x:b.max.x,(i&2)==0?b.min.y:b.max.y,(i&4)==0?b.min.z:b.max.z));if(!init){result=new Bounds(p,Vector3.zero);init=true;}else result.Encapsulate(p);}
            Vector3 size=result.size;size.x=Mathf.Max(.08f,size.x);size.y=Mathf.Max(.08f,size.y);size.z=Mathf.Max(.08f,size.z);result.size=size;return result;
        }
        private void AddOutline(FurnitureSlot s,Bounds b)
        {
            var go=new GameObject("Ghost bounds");go.transform.SetParent(s.ghost.transform,false);var line=go.AddComponent<LineRenderer>();line.useWorldSpace=false;line.sharedMaterial=ghostOutlineMaterial!=null?ghostOutlineMaterial:ghostMaterial;line.startColor=line.endColor=Color.white;line.startWidth=line.endWidth=.04f;line.shadowCastingMode=UnityEngine.Rendering.ShadowCastingMode.Off;
            int[] edges={0,1,3,2,0,4,5,1,5,7,3,7,6,2,6,4};line.positionCount=edges.Length;
            for(int n=0;n<edges.Length;n++){int i=edges[n];Vector3 p=new Vector3((i&1)==0?b.min.x:b.max.x,(i&2)==0?b.min.y:b.max.y,(i&4)==0?b.min.z:b.max.z);line.SetPosition(n,s.ghost.transform.InverseTransformPoint(s.anchor.TransformPoint(p)));}
        }
        private void Update()
        {
            if(paused||endOverlayArmed)return;
            if(timerRunning){elapsedSeconds=Mathf.Min(durationSeconds,elapsedSeconds+Time.unscaledDeltaTime);int second=Mathf.CeilToInt(durationSeconds-elapsedSeconds);if(second!=lastSecond){lastSecond=second;timerText.text=second+"s";}if(elapsedSeconds>=durationSeconds){timerRunning=false;if(endOnTimeout){EndGame(false);return;}}}
            // one-time hand after the move tutorial: nothing in view -> highlight the nearest ghost right away
            if(moveGuide&&tutorialStage==RoomTutorialStage.Explore&&!animating&&aimedIndex<0&&hintIndex<0&&playerController!=null){int near=playerController.FindHintCandidate();if(near>=0)ShowHint(near);}
            if(tutorialStage==RoomTutorialStage.Explore&&!animating&&hintIndex<0)
            {
                if(aimedIndex>=0)searchElapsed=0;
                else{searchElapsed+=Time.unscaledDeltaTime;if(searchElapsed>=hintDelaySeconds){int index=playerController==null?-1:playerController.FindHintCandidate();if(index>=0)ShowHint(index);else searchElapsed=hintDelaySeconds-.5f;}}
            }
        }
        public void BeginTutorial()
        {
            if(state!=BedroomState.WaitingForStart)return;started=true;timerRunning=true;state=BedroomState.FirstBuild;if(startTapCounts)interactionCount++;
            if(startSurface!=null)startSurface.gameObject.SetActive(false);
            Luna.Unity.LifeCycle.GameStarted();
            onGameStarted.Invoke();UpdateUi();
        }
        public void NotifyLookMotion(float degrees)
        {
            if(tutorialStage!=RoomTutorialStage.LookAround||endOverlayArmed)return;
            lookProgress+=Mathf.Abs(degrees);if(lookProgress>=lookTutorialDegrees){if(moveTutorial){tutorialStage=RoomTutorialStage.Move;moveProgress=0;}else{tutorialStage=RoomTutorialStage.Explore;state=BedroomState.FreeBuild;searchElapsed=0;}UpdateUi();}
        }
        public void NotifyMoveDistance(float distance)
        {
            if(tutorialStage!=RoomTutorialStage.Move||endOverlayArmed)return;
            moveProgress+=Mathf.Abs(distance);if(moveProgress>=moveTutorialDistance){moveGuide=handAfterMove;tutorialStage=RoomTutorialStage.Explore;state=BedroomState.FreeBuild;searchElapsed=0;UpdateUi();}
        }
        public int Remaining(FurnitureDefinition definition){int n=0;for(int i=0;i<slots.Length;i++)if(slots[i].definition==definition&&!slots[i].built)n++;return n;}
        public void SelectInventory(int index){if(tutorialStage!=RoomTutorialStage.Explore||index<0||index>=inventory.Length||Remaining(inventory[index].definition)==0)return;selectedInventory=index;UpdateUi();}
        public void SetAimedSlot(int index)
        {
            if(CanAim&&tutorialStage==RoomTutorialStage.PlaceBed&&!slots[firstBedSlot].built)index=firstBedSlot;
            else if(index<0||index>=slots.Length||slots[index].built||!CanAim)index=-1;
            if(index==aimedIndex)return;if(aimedIndex>=0&&aimedIndex!=hintIndex)slots[aimedIndex].ghost.SetActive(false);aimedIndex=index;
            if(index>=0){slots[index].ghost.SetActive(true);if(hintIndex<0)searchElapsed=0;for(int i=0;i<inventory.Length;i++)if(inventory[i].definition==slots[index].definition){selectedInventory=i;break;}}
            UpdateUi();
        }
        private void ShowHint(int index)
        {if(hintIndex>=0||index<0||slots[index].built)return;hintIndex=index;hintShownCount++;slots[index].ghost.SetActive(true);if(playerController!=null)playerController.FocusOnHint(index);UpdateUi();}
        public bool TryBuildFromScreen(Vector2 point,Camera view)
        {
            if(endOverlayArmed||tutorialStage==RoomTutorialStage.LookAround||tutorialStage==RoomTutorialStage.Move)return false;
            RaycastHit hit;
            if(Physics.Raycast(view.ScreenPointToRay(point),out hit,playerController.buildReach,Physics.DefaultRaycastLayers,QueryTriggerInteraction.Collide))
            {
                int special=tutorialStage==RoomTutorialStage.PlaceBed?firstBedSlot:hintIndex;
                if(special>=0&&hit.collider==slots[special].targetCollider){SetAimedSlot(special);return TryBuild(special);}
            }
            bool central=Mathf.Abs(point.x/Screen.width-.5f)<.2f&&Mathf.Abs(point.y/Screen.height-.5f)<.2f;
            if(!central)return false;SetAimedSlot(playerController.FindAimedSlot());return TryBuildAimed();
        }
        public bool TryBuildAimed(){return TryBuild(aimedIndex);}
        public bool TryBuild(int index)
        {
            if(!started)BeginTutorial();
            if(!CanAim||paused||lastInteractionFrame==Time.frameCount||index<0||index>=slots.Length)return false;
            if(tutorialStage==RoomTutorialStage.PlaceBed&&index!=firstBedSlot)return false;
            var s=slots[index];if(s.built||s.instance==null||(aimToBuild&&index!=aimedIndex)||Remaining(s.definition)==0)return false;
            if(playerBody!=null&&!s.definition.walkableSurface){Bounds b=s.targetCollider.bounds;Vector3 p=playerBody.position;if(p.x>b.min.x-.25f&&p.x<b.max.x+.25f&&p.z>b.min.z-.25f&&p.z<b.max.z+.25f&&b.min.y<1.7f&&b.max.y>.1f){promptText.text="STEP BACK TO PLACE";return false;}}
            lastInteractionFrame=Time.frameCount;moveGuide=false;s.built=true;builtCount++;interactionCount++;animating=true;
            if(hintIndex==index){hintIndex=-1;searchElapsed=0;}
            s.ghost.SetActive(false);SetAimedSlot(-1);s.targetCollider.isTrigger=s.definition.walkableSurface;s.instance.SetActive(true);
            if(placementAudio!=null&&placementSfx!=null)placementAudio.PlayOneShot(placementSfx,placementVolume);onFurniturePlaced.Invoke();UpdateUi();StartCoroutine(Reveal(s,index));
            if(ctaCountThreshold>0&&interactionCount>=ctaCountThreshold)EndGame(false);
            return true;
        }
        private IEnumerator Reveal(FurnitureSlot s,int index)
        {
            float time=0;while(time<revealSeconds){time+=Time.unscaledDeltaTime;float t=Mathf.Clamp01(time/revealSeconds);s.instance.transform.localScale=s.localScale*Mathf.Max(.02f,1f+1.7f*Mathf.Pow(t-1f,3)+.7f*Mathf.Pow(t-1f,2));yield return null;}
            s.instance.transform.localScale=s.localScale;animating=false;if(endOverlayArmed)yield break;
            if(builtCount==slots.Length){EndGame(true);yield break;}
            if(index==firstBedSlot&&tutorialStage==RoomTutorialStage.PlaceBed){tutorialStage=RoomTutorialStage.LookAround;state=BedroomState.GuidedBuild;lookProgress=0;}
            else state=BedroomState.FreeBuild;UpdateUi();
        }
        public void UpdateGuidanceVisual(Camera view)
        {
            if(hand==null||guidanceRect==null)return;
            bool show=!animating&&!endOverlayArmed&&(tutorialStage==RoomTutorialStage.PlaceBed||tutorialStage==RoomTutorialStage.LookAround||hintIndex>=0||(moveGuide&&tutorialStage==RoomTutorialStage.Explore&&aimedIndex>=0));hand.gameObject.SetActive(show);if(lookTutorialLoop!=null)lookTutorialLoop.gameObject.SetActive(show&&tutorialStage==RoomTutorialStage.LookAround);if(!show)return;
            Camera ui=guidanceCanvas.renderMode==RenderMode.ScreenSpaceOverlay?null:guidanceCanvas.worldCamera;
            float screenWidth=view.pixelWidth,screenHeight=view.pixelHeight;bool lookStage=tutorialStage==RoomTutorialStage.LookAround;float lookPhase=Time.unscaledTime*1.35f;Vector2 screen;
            if(lookStage)screen=new Vector2(screenWidth*(.53f+.27f*Mathf.Sin(lookPhase)),screenHeight*(.57f+.05f*Mathf.Sin(lookPhase*2f)));
            else{int index=tutorialStage==RoomTutorialStage.PlaceBed?firstBedSlot:(moveGuide&&aimedIndex>=0?aimedIndex:hintIndex);Vector3 p=view.WorldToScreenPoint(slots[index].targetCollider.bounds.center);if(p.z<0){hand.gameObject.SetActive(false);return;}screen=new Vector2(Mathf.Clamp(p.x,screenWidth*.12f,screenWidth*.88f),Mathf.Clamp(p.y,screenHeight*.3f,screenHeight*.8f));}
            Vector2 local;
            if(RectTransformUtility.ScreenPointToLocalPointInRectangle(guidanceRect,screen,ui,out local))
            {
                if(lookStage){hand.anchoredPosition=local;hand.localScale=Vector3.one;hand.localEulerAngles=Vector3.zero;}
                else{float clickRate=tutorialStage==RoomTutorialStage.PlaceBed ? 0.65f : 1.1f;float pressWindow=tutorialStage==RoomTutorialStage.PlaceBed ? 0.27f : 0.18f;float cycle=(Time.unscaledTime*clickRate)%1f;float press=cycle<pressWindow ? Mathf.Sin(cycle/pressWindow*Mathf.PI) : 0f;hand.anchoredPosition=local+new Vector2(Mathf.Lerp(58,26,press),Mathf.Lerp(-54,-22,press));hand.localScale=Vector3.one*Mathf.Lerp(1f,.82f,press);hand.localEulerAngles=new Vector3(0,0,Mathf.Lerp(-14f,2f,press));}
            }
        }
        private void UpdateUi()
        {
            bool moveTip=tutorialStage==RoomTutorialStage.Move&&!endOverlayArmed;
            if(moveTutorialPad!=null)moveTutorialPad.demo=moveTip;
            if(moveTutorialLabel!=null){moveTutorialLabel.text=moveTutorialText;moveTutorialLabel.gameObject.SetActive(moveTip);}
            if(ctaRoot!=null)ctaRoot.SetActive(showCtaButton&&ctaCountThreshold>0&&interactionCount>=ctaCountThreshold);
            if(countText!=null)countText.text="BUILT "+builtCount+"/"+slots.Length;if(progressText!=null)progressText.text=builtCount+"/"+slots.Length;if(progressFill!=null)progressFill.fillAmount=slots.Length==0?0:(float)builtCount/slots.Length;
            if(!started&&timerText!=null)timerText.text=Mathf.CeilToInt(durationSeconds)+"s";
            if(promptText!=null){if(endOverlayArmed)promptText.text="TAP TO PLAY";else if(animating)promptText.text="BUILDING...";else if(tutorialStage==RoomTutorialStage.PlaceBed)promptText.text=firstPrompt;else if(tutorialStage==RoomTutorialStage.LookAround)promptText.text="DRAG TO LOOK AROUND";else if(tutorialStage==RoomTutorialStage.Move)promptText.text="";else if(aimedIndex>=0)promptText.text="TAP TO BUILD "+slots[aimedIndex].definition.displayName.ToUpperInvariant();else if(hintIndex>=0)promptText.text="TAP THE HIGHLIGHTED "+slots[hintIndex].definition.displayName.ToUpperInvariant();else promptText.text="MOVE + DRAG TO FIND A SPOT";}
            if(inventory==null)return;for(int i=0;i<inventory.Length;i++){var e=inventory[i];int n=Remaining(e.definition);bool empty=n==0;if(e.quantityText!=null)e.quantityText.text="x"+n;if(e.button!=null)e.button.interactable=!empty&&!endOverlayArmed&&tutorialStage==RoomTutorialStage.Explore;if(e.frame!=null)e.frame.color=empty?new Color(.23f,.25f,.23f):i==selectedInventory?new Color(1,.82f,.25f):new Color(.48f,.5f,.46f);if(e.icon!=null)e.icon.color=empty?new Color(.38f,.38f,.38f):Color.white;if(e.emptyBadge!=null)e.emptyBadge.SetActive(empty);}
        }
        private void EndGame(bool completed)
        {
            if(endOverlayArmed)return;endOverlayArmed=true;overlayArmedFrame=Time.frameCount;state=completed?BedroomState.Completed:BedroomState.Ended;tutorialStage=RoomTutorialStage.Finished;timerRunning=false;aimedIndex=-1;hintIndex=-1;
            foreach(var s in slots)if(s.ghost!=null)s.ghost.SetActive(false);if(hand!=null)hand.gameObject.SetActive(false);if(endOverlayRoot!=null){endOverlayRoot.SetActive(true);endOverlayRoot.transform.SetAsLastSibling();}SignalEnded();UpdateUi();
        }
        private void SignalEnded()
        {
            if(endedSent)return;endedSent=true;
            onGameEnded.Invoke();
        }
        // Transparent full-screen button shown when time runs out, the step limit is hit, or the room is complete.
        // First tap: end card (LifeCycle.GameEnded). Every tap: store CTA (Playable.InstallFullGame).
        public void OpenEndCardAndCta()
        {
            if(!endOverlayArmed||Time.frameCount<=overlayArmedFrame||lastCtaFrame==Time.frameCount)return;lastCtaFrame=Time.frameCount;
            if(!ctaDelivered)
            {
                ctaDelivered=true;
                Luna.Unity.LifeCycle.GameEnded();
                onEndCardRequested.Invoke();
            }
            Luna.Unity.Playable.InstallFullGame();
#if UNITY_EDITOR
            Debug.Log("[CEBB] End card + CTA (Editor preview)");
#endif
            onCtaClicked.Invoke();
        }
        public void OpenStore()
        {
            if(endOverlayArmed){OpenEndCardAndCta();return;}if(ctaRoot==null||!ctaRoot.activeSelf||lastCtaFrame==Time.frameCount)return;lastCtaFrame=Time.frameCount;
            Luna.Unity.Playable.InstallFullGame();
            onCtaClicked.Invoke();
        }
        private void OnApplicationPause(bool value){paused=value;}
    }
}
