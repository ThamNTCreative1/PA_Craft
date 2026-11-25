using System;
using System.Collections;
using UnityEngine;
using UnityEngine.UI;
namespace CEBB.Playable
{
    [Serializable] public sealed class RocketBlockType
    {
        public string name;public Material material;public Button button;public Image frame,icon;public Text countText,nameText;public GameObject emptyBadge;
    }
    // One rocket the player can pick before building (LaunchRocket scene). Empty choices = old single-rocket flow.
    [Serializable] public sealed class RocketChoice
    {
        public string name;public Transform root;public GameObject[] blocks;public int[] blockTypes;
        public string[] typeNames;public Sprite[] typeIcons;public Sprite blueprint;
        public Button button;public Image frame;
        [Tooltip("Parts left on the pad / removed at LAUNCH (e.g. the Nacho rocket's boarding ladder)")] public GameObject[] hideOnLaunch;
    }
    public enum RocketStage { Build, AutoBuild, Showcase, Launch, Ended }
    // Basic tutorials (same order as the other scenes): tap the first block -> drag to look -> joystick move -> free building.
    public enum RocketTutorial { FirstBlock, Look, Move, Done }
    // CC_Playable_AutoBuildRocket1
    // Tap the glowing guide block to build the rocket block by block (bottom-up). After N blocks a "QUICK BUILD" popup
    // appears (optional). When the rocket is complete the camera orbits it, then "LAUNCH" -> end game + CTA.
    [DefaultExecutionOrder(-100)] public sealed class RocketPlayable:MonoBehaviour
    {
        [Header("Rocket (baked by the scene setup)")]
        public Transform rocketRoot;public GameObject[] blocks;public int[] blockTypes;public RocketBlockType[] types;
        public Transform ghost;public float blockSize=1f;
        [Header("Refs")]
        public RocketPlayer player;public RocketLuna luna;
        public Text promptText,countText;public RectTransform hand;
        public Button quickBuildButton,launchButton,flyButton;public Image flyIcon;
        public RectTransform minimap,stats,playNow;public BedroomLayout layout;public GridLayoutGroup grid;public RectTransform catalog;
        public GameObject[] hideOnShowcase;
        [Header("Choose a rocket first (optional)")]
        public RocketChoice[] choices;public RocketBlockType[] slotPool;public RectTransform choicePanel;public GridLayoutGroup choiceGrid;public Image minimapPicture;
        public GameObject[] hideWhileChoosing;
        [Tooltip("LAUNCH plays a lift-off (flames, smoke, camera follows) instead of going straight to the CTA")] public bool launchFly;
        public Transform[] launchFlames=new Transform[0],launchSmoke=new Transform[0];public float flySeconds=3.4f;[Tooltip("The rocket keeps climbing (end card shows after flySeconds) until it is this high above the pad")] public float flyHeight=320f;
        [Tooltip("Seconds after LAUNCH before the transparent full-screen CTA appears (tap = end game + store)")] public float launchCtaDelay=1f;
        private int chosen=-1;
        [Tooltip("CONTINUE button shown this long after LAUNCH (tap = end game + store)")] public Button continueButton;public float continueDelay=3f;
        [Tooltip("Firework sparks (pooled coloured cubes) shown when the rocket is complete. No ParticleSystem: that module is excluded from the Luna build")] public Transform[] sparks=new Transform[0];
        private IEnumerator ShowContinue(float seconds)
        {
            yield return new WaitForSecondsRealtime(seconds);
            if(continueButton==null)yield break;
            continueButton.gameObject.SetActive(true);continueButton.interactable=true;continueButton.transform.SetAsLastSibling();StartCoroutine(PopUi(continueButton.transform));
        }
        private void PressContinue(){if(luna!=null)luna.EndGameAndCta();}
        [Header("End: smoke transition + 4 rocket pictures")]
        public RectTransform endPanel,endGrid;public RectTransform[] endCards=new RectTransform[0];public Image[] endPictures=new Image[0];public Button[] endButtons=new Button[0];public Image smokeCover;
        [Tooltip("Transition starts when the rocket is this high (it looks small) or after transitionMaxSeconds")] public float transitionHeight=110f,transitionMaxSeconds=4.5f;
        private bool endShown;
        private IEnumerator EndSequence()
        {
            float t=0f;
            while(!rocketGone&&t<transitionMaxSeconds){t+=Time.unscaledDeltaTime;yield return null;} /* cards once the rocket has vanished */
            /* no scene change: the 4 cards fly in over the live view (rocket still climbing through the smoke haze) */
            if(promptText!=null)promptText.gameObject.SetActive(false);if(stats!=null)stats.gameObject.SetActive(false);
            endPanel.gameObject.SetActive(true);endPanel.SetAsLastSibling();
            if(endTitle!=null){if(luna!=null&&!string.IsNullOrEmpty(luna.endTitle))endTitle.text=luna.endTitle;endTitle.gameObject.SetActive(true);StartCoroutine(PopUi(endTitle.transform));}
            for(int i=0;i<endCards.Length;i++)if(endCards[i]!=null)endCards[i].localScale=Vector3.zero;
            LayoutHud(lastAspect>0f ? lastAspect : (float)Screen.width/Mathf.Max(1,Screen.height));
            float d=0f;
            while(d<1.1f)
            {
                d+=Time.unscaledDeltaTime;
                for(int i=0;i<endCards.Length;i++)
                {
                    var c=endCards[i];if(c==null)continue;float k=Mathf.Clamp01((d-0.15f*i)/0.45f);
                    c.localScale=Vector3.one*EaseOutBack(k);c.localPosition=new Vector3(0f,-260f*(1f-k),0f);
                }
                yield return null;
            }
            for(int i=0;i<endCards.Length;i++)if(endCards[i]!=null){endCards[i].localScale=Vector3.one;endCards[i].localPosition=Vector3.zero;}
            /* CONTINUE under the cards (tap = end game + store); the hand keeps pointing at the cards */
            if(continueButton!=null){continueButton.gameObject.SetActive(true);continueButton.interactable=true;continueButton.transform.SetAsLastSibling();StartCoroutine(PopUi(continueButton.transform));}
            endShown=true;if(hand!=null)hand.SetAsLastSibling();
        }
        private void SetCover(float a){if(smokeCover!=null)smokeCover.color=new Color(1f,1f,1f,Mathf.Clamp01(a));}
        private static float EaseOutBack(float k){float c1=1.70158f,c3=c1+1f;float x=k-1f;return 1f+c3*x*x*x+c1*x*x;}
        private void PressEndCard(){if(luna!=null)luna.EndGameAndCta();}
        private Vector2 RectPoint(RectTransform rt)
        {
            rt.GetWorldCorners(uiCorners);Camera ui=canvas.renderMode==RenderMode.ScreenSpaceOverlay ? null : canvas.worldCamera;
            return RectTransformUtility.WorldToScreenPoint(ui,(uiCorners[0]+uiCorners[2])*0.5f);
        }
        private Vector3[] sparkVel;private float[] sparkLife;
        [Header("Launch / fireworks sound")] public AudioSource engineSource;public AudioClip engineSfx,fireworkSfx;
        [Tooltip("Short single bangs cut from the firework clip: one per burst, overlapping")] public AudioClip[] fireworkBangs=new AudioClip[0];
        [Range(0,1)] public float engineVolume=0.9f,fireworkVolume=0.8f;[Tooltip("Engine is silent once the rocket is this high")] public float engineFadeHeight=160f;
        [Tooltip("Smoke puff colour (alpha = start opacity) and lifetime")] public Color smokeTint=new Color(0.92f,0.9f,0.86f,0.6f);public float smokeLife=2.2f;[Tooltip("Lifetime of the ground smoke cloud around the pad (trail puffs use smokeLife)")] public float groundSmokeLife=7f;
        private Material[] smokeMats;private float[] smokeAge;private Transform camT;private float smokeRim=3f,smokeScale=1f;private bool[] smokeTrail;
        private Quaternion CamRotation(){return camT!=null ? camT.rotation : Quaternion.identity;}
        // turn around Y only (flames stay vertical) to face the camera
        private Quaternion FaceCameraY(Vector3 at)
        {
            if(camT==null)return Quaternion.identity;Vector3 d=camT.position-at;d.y=0f;
            if(d.sqrMagnitude<0.0001f)return Quaternion.identity;return Quaternion.LookRotation(-d);
        }
        private void PlayFireworks(){if(sparks.Length>0)StartCoroutine(Fireworks());}
        // 6 bursts around the rocket; each takes a third of the pooled spark cubes, they fly out, fall and shrink
        private IEnumerator Fireworks()
        {
            int n=sparks.Length,per=Mathf.Max(1,n/3),nextSpark=0,burst=0;float t=0f;
            float fs=Mathf.Max(1f,rocketSize.y/18f); /* bursts sized to the rocket (rockets are 30-45 blocks tall) */
            while(t<4f)
            {
                float dt=Time.unscaledDeltaTime;t+=dt;
                if(burst<6&&t>=burst*0.45f)
                {
                    float a=burst*2.4f;Vector3 c=rocketCentre+new Vector3(Mathf.Cos(a)*rocketSize.x*0.7f,rocketSize.y*(0.3f+0.12f*(burst%3)),Mathf.Sin(a)*rocketSize.z*0.7f);
                    for(int k=0;k<per;k++)
                    {
                        int i=nextSpark;nextSpark=(nextSpark+1)%n;var s=sparks[i];if(s==null)continue;
                        s.position=c;sparkVel[i]=UnityEngine.Random.onUnitSphere*UnityEngine.Random.Range(6f,10f)*fs;sparkLife[i]=UnityEngine.Random.Range(0.9f,1.4f);s.gameObject.SetActive(true);
                    }
                    burst++;
                    /* one short bang per burst; one-shots overlap like real fireworks and all end with the visuals */
                    if(placementAudio!=null)
                    {
                        if(fireworkBangs!=null&&fireworkBangs.Length>0){var bang=fireworkBangs[(burst-1)%fireworkBangs.Length];if(bang!=null)placementAudio.PlayOneShot(bang,fireworkVolume*UnityEngine.Random.Range(0.8f,1f));}
                        else if(burst==1&&fireworkSfx!=null)placementAudio.PlayOneShot(fireworkSfx,fireworkVolume);
                    }
                }
                for(int i=0;i<n;i++)
                {
                    var s=sparks[i];if(s==null||sparkLife[i]<=0f)continue;
                    sparkLife[i]-=dt;if(sparkLife[i]<=0f){s.gameObject.SetActive(false);continue;}
                    sparkVel[i].y-=6.5f*fs*dt;sparkVel[i]*=1f-0.9f*dt; /* gravity + air drag */s.position+=sparkVel[i]*dt;
                    /* glowing streak: faces the camera, stretched along its flight direction, shrinks as it burns out */
                    float k=Mathf.Clamp01(sparkLife[i]/1.2f);float speed=sparkVel[i].magnitude;
                    if(camT!=null&&speed>0.01f)s.rotation=Quaternion.LookRotation(camT.forward,sparkVel[i]);
                    float w=(0.9f*k+0.15f)*fs;s.localScale=new Vector3(w,w+speed*0.1f*k,1f);
                }
                yield return null;
            }
            for(int i=0;i<n;i++)if(sparks[i]!=null)sparks[i].gameObject.SetActive(false);
        }
        // LAUNCH: the rocket keeps flying; after a moment the invisible end-card button covers the screen, a tap goes to the store
        private IEnumerator EndCardAfter(float seconds){yield return new WaitForSecondsRealtime(seconds);if(luna!=null)luna.EndGame();}
        [Tooltip("Max camera shake at lift-off, in degrees (0 = off)")] public float liftoffShake=0.6f;
        [Tooltip("The camera rises with the rocket at most this much, then the rocket flies away until it is tiny")] public float camFollowMax=55f;
        [Tooltip("Title shown above the end cards (text comes from RocketLuna.endTitle)")] public Text endTitle;
        private bool rocketGone;
        private bool flying;private float shake;private Vector3 flyOffset;public Color choiceIdle=new Color(.16f,.17f,.19f),choiceSelected=new Color(1f,.8f,.2f);
        [Header("Tuning")]
        [Header("Basic tutorials")] public RectTransform lookGuide;public Vector2 lookGuideRadius=new Vector2(170,59.5f);public RoomMovePad movePad;
        [Min(5)] public float lookTutorialDegrees=40f;[Min(.1f)] public float moveTutorialDistance=1.5f;
        public string lookPrompt="DRAG TO LOOK AROUND",movePrompt="MOVE WITH THE JOYSTICK";
        public string firstPrompt="TAP TO BUILD ROCKET",buildPrompt="TAP THE GLOWING BLOCK",quickPrompt="TAP QUICK BUILD!",donePrompt="ROCKET COMPLETED!",launchPrompt="READY FOR LAUNCH!";
        [Min(1)] public int guidedHandBlocks=5;
        [Tooltip("A tap within this fraction of the screen height from the guide block builds it")] public float tapRadius=.14f;
        [Tooltip("QUICK BUILD moves to the top-left corner when it is not pressed within this time")] public float quickDockDelay=2.5f;
        public float lunaTextDrop=0.055f;
        public float revealSeconds=.22f,quickBuildSeconds=2.6f,orbitSeconds=5f,orbitRadius=17f,autoAimDelay=1.4f;
        [Header("Audio")]
        public AudioSource placementAudio;public AudioClip placementSfx;[Range(0,1)] public float placementVolume=.6f;
        public AudioSource bgmSource;

        [SerializeField] private RocketStage stage=RocketStage.Build;[SerializeField] private RocketTutorial tutorial=RocketTutorial.FirstBlock;private float lookProgress,moveProgress;
        private int next,clicks,lastFrame=-1;private bool started,frozen,quickShown,quickDocked;private float idle,orbitT;private int[] remaining;
        private Canvas canvas;private RectTransform canvasRect;private float lastAspect=-1;private Vector3 rocketCentre,rocketSize;
        public RocketStage Stage {get{return stage;}}
        public int Built {get{return next;}}public int Total {get{return blocks.Length;}}
        public int Clicks {get{return clicks;}}
        public bool Choosing {get{return choosing;}}
        private bool choosing;private readonly Vector3[] uiCorners=new Vector3[4];
        public bool CanMove {get{return !frozen&&!choosing&&tutorial>=RocketTutorial.Move&&(stage==RocketStage.Build||stage==RocketStage.AutoBuild);}}
        public RocketTutorial Tutorial {get{return tutorial;}}
        public bool CanLook {get{return !frozen&&!choosing&&(stage==RocketStage.Build||stage==RocketStage.AutoBuild);}}
        public bool Frozen {get{return frozen;}}

        private void Awake()
        {
            canvas=promptText.canvas;canvasRect=canvas.GetComponent<RectTransform>();
            var slots=slotPool!=null&&slotPool.Length>0?slotPool:types;
            for(int i=0;i<slots.Length;i++){int n=i;if(slots[i].button!=null)slots[i].button.onClick.AddListener(delegate{SelectType(n);});}
            if(choices!=null&&choices.Length>0)
            {
                choosing=true;
                for(int i=0;i<choices.Length;i++){int n=i;foreach(var go in choices[i].blocks)if(go!=null)go.SetActive(false);if(choices[i].button!=null)choices[i].button.onClick.AddListener(delegate{ChooseRocket(n);});}
                foreach(var g in hideWhileChoosing)if(g!=null)g.SetActive(false);
                if(choicePanel!=null)choicePanel.gameObject.SetActive(true);
            }
            CountBlocks();
            if(quickBuildButton!=null){quickBuildButton.onClick.AddListener(PressQuickBuild);quickBuildButton.gameObject.SetActive(false);}
            if(launchButton!=null){launchButton.onClick.AddListener(PressLaunch);launchButton.gameObject.SetActive(false);}
            if(continueButton!=null){continueButton.onClick.AddListener(PressContinue);continueButton.gameObject.SetActive(false);}
            if(endPanel!=null)endPanel.gameObject.SetActive(false);if(smokeCover!=null)smokeCover.gameObject.SetActive(false);
            foreach(var b in endButtons)if(b!=null)b.onClick.AddListener(PressEndCard);
            /* Luna playground can swap the 4 end pictures (Texture2D asset fields on RocketLuna) */
            if(luna!=null)for(int i=0;i<endPictures.Length&&i<4;i++){var tex=luna.EndImage(i);if(tex!=null&&endPictures[i]!=null)endPictures[i].sprite=Sprite.Create(tex,new Rect(0,0,tex.width,tex.height),new Vector2(0.5f,0.5f),100f);}
            sparkVel=new Vector3[sparks.Length];sparkLife=new float[sparks.Length];foreach(var s in sparks)if(s!=null)s.gameObject.SetActive(false);
            camT=player!=null&&player.playerCamera!=null ? player.playerCamera.transform : null;
            smokeAge=new float[launchSmoke.Length];smokeTrail=new bool[launchSmoke.Length];smokeMats=new Material[launchSmoke.Length];
            for(int i=0;i<launchSmoke.Length;i++){if(launchSmoke[i]==null)continue;var r=launchSmoke[i].GetComponent<Renderer>();if(r!=null)smokeMats[i]=r.material;launchSmoke[i].gameObject.SetActive(false);} /* own material per puff so each can fade */
            if(flyButton!=null)flyButton.onClick.AddListener(PressFly);
            if(hand!=null){hand.SetParent(canvasRect,false);hand.anchorMin=hand.anchorMax=new Vector2(.5f,.5f);hand.SetAsLastSibling();}
            PlaceGhost();UpdateUi();
        }
        private void Start(){if(player!=null)player.LookAt(GhostCentre(),false);}
        private void CountBlocks()
        {
            remaining=new int[types.Length];for(int i=0;i<blocks.Length;i++){remaining[blockTypes[i]]++;blocks[i].SetActive(false);}
            // rocket size from the block positions (renderer bounds of inactive blocks are not reliable in Luna)
            Bounds b=new Bounds(blocks[0].transform.position,Vector3.zero);for(int i=1;i<blocks.Length;i++)b.Encapsulate(blocks[i].transform.position);b.Expand(blockSize);rocketCentre=b.center;rocketSize=b.size;
        }
        // Rocket picked: swap in its blocks, block types (hotbar slots) and blueprint, then the normal building flow starts.
        public void ChooseRocket(int index)
        {
            NotifyFirstInput();if(!choosing||frozen||Frame())return;
            var c=choices[index];choosing=false;chosen=index;
            if(c.frame!=null)c.frame.color=choiceSelected;if(c.button!=null)StartCoroutine(PopUi(c.button.transform));
            rocketRoot=c.root;blocks=c.blocks;blockTypes=c.blockTypes;
            int n=Mathf.Min(c.typeNames.Length,slotPool.Length);types=new RocketBlockType[n];
            for(int i=0;i<slotPool.Length;i++)
            {
                var s=slotPool[i];bool on=i<n;if(s.button!=null)s.button.gameObject.SetActive(on);if(!on)continue;
                s.name=c.typeNames[i];if(s.icon!=null&&i<c.typeIcons.Length)s.icon.sprite=c.typeIcons[i];if(s.nameText!=null)s.nameText.text=s.name.ToUpperInvariant();types[i]=s;
            }
            CountBlocks();
            if(minimapPicture!=null&&c.blueprint!=null)minimapPicture.sprite=c.blueprint;
            if(player!=null){player.rocketMin=rocketCentre-rocketSize*.5f;player.rocketMax=rocketCentre+rocketSize*.5f;}
            orbitRadius=Mathf.Max(orbitRadius,rocketSize.y*1.05f);
            if(ghost!=null)ghost.SetParent(rocketRoot,true);
            if(choicePanel!=null)choicePanel.gameObject.SetActive(false);
            foreach(var g in hideWhileChoosing)if(g!=null)g.SetActive(true);
            PlaceGhost();UpdateUi();LayoutHud(lastAspect>0?lastAspect:(float)Screen.width/Mathf.Max(1,Screen.height));
            if(player!=null)player.LookAt(GhostCentre(),true);
            CountClick();
            if(luna!=null&&luna.chooseToCta)luna.EndGameAndCta();
        }
        // LAUNCH with launchFly: flames + smoke, the rocket lifts off and the camera follows it up.
        private IEnumerator FlyUp()
        {
            Vector3 start=rocketRoot.position;
            // flame sits under the middle of what actually lifts off (ladder etc. already hidden)
            bool any=false;Bounds fb=new Bounds(rocketCentre,Vector3.zero);
            for(int i=0;i<blocks.Length;i++){if(!blocks[i].activeSelf)continue;Vector3 p=blocks[i].transform.position;if(!any){fb=new Bounds(p,Vector3.zero);any=true;}else fb.Encapsulate(p);}
            fb.Expand(blockSize);
            // x/z = centre of the bottom layer (between the legs / engines), not of the whole outline (hatch, fins... are lopsided)
            bool lowAny=false;Bounds lb=new Bounds(fb.center,Vector3.zero);float lowY=fb.min.y+blockSize*3.5f; /* outline of the bottom 3 layers: legs are symmetric even when one starts a layer higher */
            for(int i=0;i<blocks.Length;i++){if(!blocks[i].activeSelf)continue;Vector3 p=blocks[i].transform.position;if(p.y>=lowY)continue;if(!lowAny){lb=new Bounds(p,Vector3.zero);lowAny=true;}else lb.Encapsulate(p);}
            Vector3 mid=lowAny?lb.center:fb.center;Vector3 baseP=new Vector3(mid.x,fb.min.y,mid.z);
            float fw=Mathf.Clamp(Mathf.Min(fb.size.x,fb.size.z)*.28f,1.6f,4.5f); // flame width follows the rocket
            smokeRim=Mathf.Max(lb.size.x,lb.size.z)*0.5f+1f;smokeScale=Mathf.Clamp(smokeRim/6f,1f,2f); // smoke cloud follows the base size
            foreach(var f in launchFlames)if(f!=null)f.gameObject.SetActive(true);
            float t=0,y=0,v=0;int smokeNext=0;
            bool endSent=false;
            while(t<flySeconds||y<flyHeight)
            {
                float dt=Time.unscaledDeltaTime;t+=dt;if(t>.45f){v+=dt*(6f+v*.7f);y+=v*dt;}
                /* end card once the rocket is high in the sky; it keeps climbing behind it */
                if(!endSent&&endPanel==null&&t>=flySeconds&&y>=flyHeight*.6f){endSent=true;if(luna!=null)luna.EndGame();} /* with the end panel, EndSequence ends the game */
                /* engine roar: swells in during ignition, loudest near the pad, fades as the rocket climbs away */
                if(engineSource!=null&&engineSource.isPlaying){float near=1f-Mathf.Clamp01(y/engineFadeHeight);engineSource.volume=engineVolume*Mathf.Clamp01(t/0.35f)*near*near;}
                rocketRoot.position=start+Vector3.up*y;flyOffset=Vector3.up*y;
                /* light screen shake (degrees): builds up during ignition, strongest right at lift-off, gone after ~3 s.
                   keep spaces + leading 0 in ternaries: Luna's compiler reads question-mark + dot + digit as the null-conditional operator */
                shake=t<0.45f ? liftoffShake*0.7f*(t/0.45f) : liftoffShake*Mathf.Clamp01(1f-(t-1.3f)/1.7f);
                /* thrust = glowing billboards (additive): [0] round glow at the nozzle, [1] long orange flame, [2] short hot white-yellow core.
                   Flame quads hang down from their top edge and turn around Y to face the camera */
                float grow=Mathf.Clamp01(t/0.6f);Vector3 nozzle=baseP+Vector3.up*(y+0.2f);
                for(int i=0;i<launchFlames.Length;i++)
                {
                    var f=launchFlames[i];if(f==null)continue;
                    float s=1f+0.15f*Mathf.Sin(Time.unscaledTime*41f+i*2.3f)+0.08f*Mathf.Sin(Time.unscaledTime*17f+i);
                    f.position=nozzle;
                    if(i==0){f.rotation=CamRotation();f.localScale=Vector3.one*fw*2.4f*s*(0.4f+0.6f*grow);}
                    else
                    {
                        float len=(i==1 ? fw*5.5f : fw*3f)*s*grow,w=(i==1 ? fw*1.5f : fw*0.85f)*(2f-s);
                        f.rotation=FaceCameraY(f.position);f.localScale=new Vector3(w,len,1f);
                    }
                }
                /* smoke: soft puffs roll out over the pad, grow and fade (each puff has its own material instance) */
                /* lots of smoke: even frames = ground cloud at the pad rim, odd frames = trail puff left behind the nozzle once airborne.
                   The camera looks up from below, so the trail ends up between it and the rocket */
                if(launchSmoke.Length>0)
                {
                    /* every 2nd frame: alternate a long-lived ground puff and a trail puff (trail only once airborne) */
                    int ph=Time.frameCount%4;bool trail=ph==2;
                    if(ph==0||(trail&&y>1.5f))
                    {
                        int i=smokeNext;smokeNext=(smokeNext+1)%launchSmoke.Length;var s=launchSmoke[i];
                        if(s!=null)
                        {
                            s.gameObject.SetActive(true);float a=UnityEngine.Random.value*Mathf.PI*2f;smokeAge[i]=0f;smokeTrail[i]=trail;
                            if(trail){float r=fw*UnityEngine.Random.Range(0f,0.6f);s.position=nozzle+new Vector3(Mathf.Cos(a)*r,-fw*UnityEngine.Random.Range(0.5f,2f),Mathf.Sin(a)*r);s.localScale=Vector3.one*fw*UnityEngine.Random.Range(1.6f,2.6f);}
                            else{float r=smokeRim*UnityEngine.Random.Range(0.7f,1.3f);s.position=baseP+new Vector3(Mathf.Cos(a)*r,1f,Mathf.Sin(a)*r);s.localScale=Vector3.one*UnityEngine.Random.Range(4f,7f)*smokeScale;} /* rim: inside the footprint the legs would hide it */
                        }
                    }
                }
                UpdateSmoke(dt,baseP,fw);
                yield return null;
            }
            /* far away and tiny: the rocket is gone */
            rocketRoot.gameObject.SetActive(false);rocketGone=true;
            if(engineSource!=null)engineSource.Stop();
            foreach(var f in launchFlames)if(f!=null)f.gameObject.SetActive(false);
            /* the smoke keeps drifting and fading after it (puffs would otherwise freeze in the air) */
            while(UpdateSmoke(Time.unscaledDeltaTime,baseP,fw))yield return null;
            shake=0;stage=RocketStage.Ended;if(luna!=null&&endPanel==null)luna.EndGame();
        }
        // moves / grows / fades every live smoke puff; returns true while any is still visible
        private bool UpdateSmoke(float dt,Vector3 baseP,float fw)
        {
            bool any=false;
            for(int i=0;i<launchSmoke.Length;i++)
            {
                var s=launchSmoke[i];if(s==null||!s.gameObject.activeSelf)continue;
                smokeAge[i]+=dt;float k=smokeAge[i]/(smokeTrail[i] ? smokeLife : groundSmokeLife);if(k>=1f){s.gameObject.SetActive(false);continue;}
                any=true;Vector3 d=s.position-baseP;d.y=0f;
                if(smokeTrail[i]){s.position+=(d.normalized*1.5f+Vector3.down*1.2f)*dt;s.localScale+=Vector3.one*fw*2.2f*dt;} /* trail puffs hang in the air and billow */
                else{s.position+=(d.normalized*(6f*(1f-k)+0.6f)+Vector3.up*1.1f)*smokeScale*dt;s.localScale+=Vector3.one*3f*smokeScale*dt;} /* ground cloud: rolls out, rises slowly, stays long */
                s.rotation=CamRotation();
                if(smokeMats!=null&&smokeMats[i]!=null)smokeMats[i].color=new Color(smokeTint.r,smokeTint.g,smokeTint.b,smokeTint.a*(1f-k)*Mathf.Clamp01(k*8f));
            }
            return any;
        }
        // BedroomLayout re-applies its own layout (also from the capture tool); put the rocket HUD on top of it every time.
        private void OnEnable(){BedroomLayout.Applied+=LayoutHud;}
        private void OnDisable(){BedroomLayout.Applied-=LayoutHud;}

        // ---------- input ----------
        public void NotifyFirstInput()
        {
            if(started)return;started=true;
            if(luna!=null)luna.NotifyStarted();
            if(bgmSource!=null&&bgmSource.clip!=null&&luna!=null&&luna.musicOn&&!bgmSource.isPlaying){bgmSource.volume=luna.musicVolume;bgmSource.Play();}
        }
        public void NotifyInput(){idle=0;}
        // Look tutorial: done after enough dragging, or as soon as the screen is touched.
        public void NotifyLook(float degrees){if(tutorial!=RocketTutorial.Look||frozen)return;lookProgress+=degrees;if(lookProgress>=lookTutorialDegrees)NextTutorial();}
        public void NotifyScreenTouch(){if(tutorial==RocketTutorial.Look&&!frozen)NextTutorial();}
        public void NotifyMove(float distance){if(tutorial!=RocketTutorial.Move||frozen)return;moveProgress+=distance;if(moveProgress>=moveTutorialDistance)NextTutorial();}
        private void NextTutorial()
        {
            if(tutorial==RocketTutorial.Look){tutorial=RocketTutorial.Move;moveProgress=0;}
            else if(tutorial==RocketTutorial.Move)
            {
                tutorial=RocketTutorial.Done;idle=0;
                /* turn back to the glowing block right away so the build hand shows at once */
                if(player!=null&&ghost!=null&&ghost.gameObject.activeSelf)player.LookAt(GhostCentre(),true);
            }
            UpdateUi();
        }
        private bool Frame(){if(lastFrame==Time.frameCount)return true;lastFrame=Time.frameCount;return false;}
        private void CountClick(){clicks++;if(luna!=null)luna.NotifyClick(clicks);}
        // Short tap on the 3D view: builds the guide block when the tap is on / near it.
        public void TapAt(Vector2 screen)
        {
            NotifyFirstInput();idle=0;
            if(choosing||frozen||stage!=RocketStage.Build||next>=blocks.Length)return;
            if(tutorial==RocketTutorial.Look||tutorial==RocketTutorial.Move)return; // finish the look / move tutorial first
            Vector3 p=player.playerCamera.WorldToScreenPoint(GhostCentre());
            /* tap missed the guide block (or it is behind the camera): turn the view toward it */
            if(p.z<=0||Vector2.Distance(screen,new Vector2(p.x,p.y))>tapRadius*Screen.height){if(ghost!=null&&ghost.gameObject.activeSelf)player.LookAt(GhostCentre(),true);return;}
            if(Frame())return;
            BuildNext(true);CountClick();
            /* follow the next guide block so the player keeps building */
            if(tutorial==RocketTutorial.Done&&stage==RocketStage.Build&&ghost!=null&&ghost.gameObject.activeSelf)player.LookAt(GhostCentre(),true);
        }
        public void SelectType(int index)
        {
            NotifyFirstInput();if(frozen||Frame())return;
            if(types[index].frame!=null)StartCoroutine(Blink(types[index].frame));
            CountClick();
        }
        public void PressFly()
        {
            NotifyFirstInput();if(frozen||Frame()||player==null)return;
            player.SetFly(!player.Flying);UpdateUi();CountClick();
        }
        public void PressQuickBuild()
        {
            NotifyFirstInput();if(frozen||Frame()||stage!=RocketStage.Build)return;
            CountClick();if(frozen)return;
            if(luna!=null&&luna.quickBuildToCta){luna.EndGameAndCta();return;} /* Luna option: QUICK BUILD = end game + store */
            stage=RocketStage.AutoBuild;if(quickBuildButton!=null)quickBuildButton.gameObject.SetActive(false);UpdateUi();StartCoroutine(AutoBuild());
        }
        public void PressLaunch()
        {
            if(Frame())return;
            if(launchFly)
            {
                if(flying||frozen)return;flying=true;if(launchButton!=null)launchButton.gameObject.SetActive(false);if(hand!=null)hand.gameObject.SetActive(false);
                /* hide the ladder BEFORE FlyUp: it measures the flame position from the blocks still showing */
                if(chosen>=0&&choices[chosen].hideOnLaunch!=null)foreach(var g in choices[chosen].hideOnLaunch)if(g!=null)g.SetActive(false);
                if(promptText!=null)promptText.text="";
                if(engineSource!=null&&engineSfx!=null){engineSource.clip=engineSfx;engineSource.loop=true;engineSource.volume=0f;engineSource.Play();}
                StartCoroutine(FlyUp());
                if(endPanel!=null)StartCoroutine(EndSequence()); /* smoke transition -> 4 rocket pictures -> CTA */
                if(luna!=null&&luna.launchToCta){luna.EndGameAndCta();return;} /* Luna option: LAUNCH = end game + store right away (rocket still flies behind) */
                return;
            }
            if(luna!=null)luna.EndGameAndCta();
        }
        public void Freeze(){frozen=true;if(hand!=null)hand.gameObject.SetActive(false);if(lookGuide!=null)lookGuide.gameObject.SetActive(false);if(movePad!=null)movePad.demo=false;if(quickBuildButton!=null)quickBuildButton.interactable=false;}

        // ---------- building ----------
        private Vector3 GhostCentre(){return ghost!=null?ghost.position:rocketCentre;}
        private void PlaceGhost()
        {
            if(ghost==null)return;bool show=!choosing&&next<blocks.Length&&stage==RocketStage.Build;ghost.gameObject.SetActive(show);
            if(show)ghost.position=blocks[next].transform.position;
        }
        private void BuildNext(bool sound)
        {
            if(next>=blocks.Length)return;var go=blocks[next];int t=blockTypes[next];next++;remaining[t]--;
            go.SetActive(true);StartCoroutine(Pop(go.transform));
            if(tutorial==RocketTutorial.FirstBlock&&stage==RocketStage.Build){tutorial=RocketTutorial.Look;lookProgress=0;}
            if(sound&&placementAudio!=null&&placementSfx!=null)placementAudio.PlayOneShot(placementSfx,placementVolume);
            if(!quickShown&&luna!=null&&next>=luna.quickBuildAfter&&next<blocks.Length&&stage==RocketStage.Build){quickShown=true;if(quickBuildButton!=null){quickBuildButton.gameObject.SetActive(true);StartCoroutine(PopUi(quickBuildButton.transform));StartCoroutine(DockQuickLater());}}
            PlaceGhost();UpdateUi();
            if(next>=blocks.Length&&stage==RocketStage.Build)StartCoroutine(Showcase());
        }
        // Not pressed in time: QUICK BUILD leaves the middle of the screen and waits in the top-left corner (old Play Now spot).
        private IEnumerator DockQuickLater()
        {
            yield return new WaitForSecondsRealtime(quickDockDelay);
            if(frozen||stage!=RocketStage.Build||quickBuildButton==null||!quickBuildButton.gameObject.activeSelf)yield break;
            quickDocked=true;LayoutHud((float)Screen.width/Mathf.Max(1,Screen.height));StartCoroutine(PopUi(quickBuildButton.transform));UpdateUi();
        }
        private IEnumerator Pop(Transform t)
        {
            Vector3 s=Vector3.one*blockSize;float time=0;
            while(time<revealSeconds){time+=Time.unscaledDeltaTime;float k=Mathf.Clamp01(time/revealSeconds);t.localScale=s*Mathf.Max(.01f,1f+2.70158f*Mathf.Pow(k-1f,3)+1.70158f*Mathf.Pow(k-1f,2));yield return null;}
            t.localScale=s;
        }
        private IEnumerator PopUi(Transform t)
        {
            float time=0;while(time<.3f){time+=Time.unscaledDeltaTime;float k=Mathf.Clamp01(time/.3f);t.localScale=Vector3.one*Mathf.Max(.01f,1f+2.70158f*Mathf.Pow(k-1f,3)+1.70158f*Mathf.Pow(k-1f,2));yield return null;}
            t.localScale=Vector3.one;
        }
        private IEnumerator Blink(Image frame)
        {
            Color c=frame.color;frame.color=new Color(1,.95f,.5f);yield return new WaitForSecondsRealtime(.15f);frame.color=c;UpdateUi();
        }
        // Distance at which the whole rocket fits on screen (portrait and landscape).
        private float FrameDistance()
        {
            Camera c=player.playerCamera;float vf=c.fieldOfView*.5f*Mathf.Deg2Rad,hf=Mathf.Atan(Mathf.Tan(vf)*c.aspect);
            float byHeight=(rocketSize.y*.5f+2f)/Mathf.Tan(vf),byWidth=(Mathf.Max(rocketSize.x,rocketSize.z)*.6f+1.5f)/Mathf.Tan(hf);
            return Mathf.Max(byHeight,byWidth)*1.08f+Mathf.Max(rocketSize.x,rocketSize.z)*.5f;
        }
        // QUICK BUILD: pull the camera back so the whole rocket is in view while it builds itself.
        private IEnumerator WideView()
        {
            if(player==null)yield break;player.enabled=false;
            Transform cam=player.playerCamera.transform;Vector3 p0=cam.position;Quaternion r0=cam.rotation;
            Vector3 dir=p0-rocketCentre;dir.y=0;if(dir.sqrMagnitude<.01f)dir=Vector3.back;dir.Normalize();
            Vector3 target=rocketCentre+dir*FrameDistance()+Vector3.up*1.5f;Quaternion look=Quaternion.LookRotation(rocketCentre-target);
            float t=0;while(t<1f){t=Mathf.Min(1f,t+Time.unscaledDeltaTime/.9f);float k=t*t*(3f-2f*t);cam.position=Vector3.Lerp(p0,target,k);cam.rotation=Quaternion.Slerp(r0,look,k);yield return null;}
        }
        private IEnumerator AutoBuild()
        {
            StartCoroutine(WideView());
            int left=blocks.Length-next;float step=Mathf.Max(.0005f,quickBuildSeconds/Mathf.Max(1,left)); /* many blocks per frame when needed: big rockets finish in quickBuildSeconds too */float acc=0;int sfxEvery=Mathf.Max(1,left/18),n=0;
            while(next<blocks.Length)
            {
                if(frozen)yield break;
                acc+=Time.unscaledDeltaTime;
                while(acc>=step&&next<blocks.Length){acc-=step;BuildNext(n++%sfxEvery==0);}
                yield return null;
            }
            StartCoroutine(Showcase());
        }
        private IEnumerator Showcase()
        {
            stage=RocketStage.Showcase;PlaceGhost();PlayFireworks();
            if(luna!=null&&luna.buildToCta){UpdateUi();luna.EndGameAndCta();yield break;}
            if(quickBuildButton!=null)quickBuildButton.gameObject.SetActive(false);
            foreach(var g in hideOnShowcase)if(g!=null)g.SetActive(false);
            UpdateUi();yield return new WaitForSecondsRealtime(.35f);
            if(player!=null)player.enabled=false;
            Transform cam=player.playerCamera.transform;Vector3 start=cam.position;
            Vector3 flat=start-rocketCentre;flat.y=0;float a0=Mathf.Atan2(flat.x,flat.z);float h=rocketCentre.y+1.5f;float radius=Mathf.Max(orbitRadius,FrameDistance());
            float time=0;bool launchShown=false;
            while(true)
            {
                if(frozen&&stage!=RocketStage.Launch)yield break;
                time+=Time.unscaledDeltaTime;orbitT=time;
                float blend=Mathf.Clamp01(time/.8f);blend=blend*blend*(3-2*blend);
                float a=a0+Mathf.PI*2f*Mathf.Min(1f,time/orbitSeconds)+(time>orbitSeconds?(time-orbitSeconds)*.25f:0f);
                /* camera rises with the rocket only up to camFollowMax, then it watches the rocket shrink into the sky */
                Vector3 orbit=rocketCentre+new Vector3(Mathf.Sin(a)*radius,h-rocketCentre.y,Mathf.Cos(a)*radius)+Vector3.up*Mathf.Min(flyOffset.y*0.7f,camFollowMax);
                cam.position=Vector3.Lerp(start,orbit,blend);
                Quaternion look=Quaternion.LookRotation(rocketCentre+flyOffset+Vector3.up*.5f-cam.position);cam.rotation=Quaternion.Slerp(cam.rotation,look,blend<1?blend:1);
                if(shake>0f)
                {
                    /* smooth (Perlin) jitter of the view angle, so it reads the same at any camera distance; applied on top of the look so it never accumulates */
                    float st=Time.unscaledTime*22f;
                    cam.rotation=cam.rotation*Quaternion.Euler((Mathf.PerlinNoise(st,0.3f)-0.5f)*2f*shake,(Mathf.PerlinNoise(0.7f,st)-0.5f)*2f*shake,(Mathf.PerlinNoise(st,5.1f)-0.5f)*shake);
                }
                if(!launchShown&&time>=orbitSeconds*.85f)
                {
                    launchShown=true;stage=RocketStage.Launch;
                    if(launchButton!=null){launchButton.gameObject.SetActive(true);launchButton.transform.SetAsLastSibling();StartCoroutine(PopUi(launchButton.transform));}
                    if(hand!=null)hand.SetAsLastSibling();UpdateUi();
                }
                yield return null;
            }
        }

        // ---------- per frame ----------
        private void Update()
        {
            if(stage==RocketStage.Build&&!frozen&&!choosing&&player!=null)
            {
                idle+=Time.unscaledDeltaTime;
                // guide block left the screen and nobody is touching -> turn back to it
                if((tutorial==RocketTutorial.Done||tutorial==RocketTutorial.FirstBlock)&&idle>autoAimDelay&&!InView(GhostCentre(),.12f)){player.LookAt(GhostCentre(),true);idle=0;}
            }
            if(movePad!=null){bool demo=!frozen&&stage==RocketStage.Build&&tutorial==RocketTutorial.Move;if(movePad.demo!=demo)movePad.demo=demo;}
            if(quickDocked&&stage==RocketStage.Build&&quickBuildButton!=null&&quickBuildButton.gameObject.activeSelf)quickBuildButton.transform.localScale=Vector3.one*(1f+.05f*Mathf.Sin(Time.unscaledTime*5f));
            if(ghost!=null&&ghost.gameObject.activeSelf){float s=1f+.06f*Mathf.Sin(Time.unscaledTime*6f);ghost.localScale=Vector3.one*blockSize*s;}
        }
        private void LateUpdate(){UpdateHand();float aspect=(float)Screen.width/Mathf.Max(1,Screen.height);if(Mathf.Abs(aspect-lastAspect)>.002f)LayoutHud(aspect);}
        private bool InView(Vector3 world,float margin)
        {
            Vector3 v=player.playerCamera.WorldToViewportPoint(world);
            return v.z>0&&v.x>margin&&v.x<1-margin&&v.y>margin+.12f&&v.y<1-margin;
        }
        private void UpdateHand()
        {
            if(hand==null)return;
            Camera ui=canvas.renderMode==RenderMode.ScreenSpaceOverlay?null:canvas.worldCamera;
            if(endShown&&endCards.Length>0)
            {
                /* end screen: hand glides from picture to picture, tapping each (the game is frozen, so ignore that flag) */
                if(!hand.gameObject.activeSelf)hand.gameObject.SetActive(true);
                int cn=endCards.Length;float u=Time.unscaledTime/1.1f;int idx=(int)u%cn;int nxt=(idx+1)%cn;
                float f=u-Mathf.Floor(u);float move=Mathf.SmoothStep(0f,1f,Mathf.Clamp01((f-0.45f)/0.55f));float press=f<0.35f ? Mathf.Sin(f/0.35f*Mathf.PI) : 0f;
                Vector2 sp=Vector2.Lerp(RectPoint(endCards[idx]),RectPoint(endCards[nxt]),move);Vector2 lp;
                if(!RectTransformUtility.ScreenPointToLocalPointInRectangle(canvasRect,sp,ui,out lp))return;
                hand.anchoredPosition=lp+new Vector2(Mathf.Lerp(52,24,press),Mathf.Lerp(-56,-24,press));hand.localScale=Vector3.one*Mathf.Lerp(1f,0.84f,press);hand.localEulerAngles=new Vector3(0,0,Mathf.Lerp(-12f,2f,press));
                return;
            }
            if(choosing)
            {
                // hand slides back and forth over the rocket options, tapping each one
                bool on=!frozen&&choices.Length>0;if(hand.gameObject.activeSelf!=on)hand.gameObject.SetActive(on);if(!on)return;
                int cn=choices.Length;float u=Time.unscaledTime/1.1f;int a=cn>1?(int)u%(2*cn-2):0;int idx=a<cn?a:2*cn-2-a;int nxt=cn<2?idx:a<cn-1?idx+1:idx-1;
                float f=u-Mathf.Floor(u);float move=Mathf.SmoothStep(0,1,Mathf.Clamp01((f-.45f)/.55f));float press=f<.35f?Mathf.Sin(f/.35f*Mathf.PI):0;
                Vector2 sp=Vector2.Lerp(ChoicePoint(idx),ChoicePoint(nxt),move);Vector2 lp;
                if(!RectTransformUtility.ScreenPointToLocalPointInRectangle(canvasRect,sp,ui,out lp))return;
                hand.anchoredPosition=lp+new Vector2(Mathf.Lerp(52,24,press),Mathf.Lerp(-56,-24,press));hand.localScale=Vector3.one*Mathf.Lerp(1f,.84f,press);hand.localEulerAngles=new Vector3(0,0,Mathf.Lerp(-12f,2f,press));
                return;
            }
            bool loop=!frozen&&stage==RocketStage.Build&&tutorial==RocketTutorial.Look;
            if(lookGuide!=null&&lookGuide.gameObject.activeSelf!=loop)lookGuide.gameObject.SetActive(loop);
            if(loop)
            {
                // hand rides the infinity curve: "drag the screen to look around"
                Vector2 centre;if(!RectTransformUtility.ScreenPointToLocalPointInRectangle(canvasRect,new Vector2(Screen.width*.5f,Screen.height*.56f),ui,out centre))return;
                if(lookGuide!=null)lookGuide.anchoredPosition=centre;
                float a=Time.unscaledTime*2.7f;Vector2 lp=centre+new Vector2(lookGuideRadius.x*Mathf.Sin(a),lookGuideRadius.y*Mathf.Sin(2f*a));
                if(!hand.gameObject.activeSelf)hand.gameObject.SetActive(true);
                hand.anchoredPosition=lp+new Vector2(40,-48);hand.localScale=Vector3.one;hand.localEulerAngles=new Vector3(0,0,-8f);return;
            }
            bool show=false;Vector2 screen=Vector2.zero;
            if(!frozen)
            {
                if(stage==RocketStage.Launch&&launchButton!=null&&launchButton.gameObject.activeSelf){show=true;screen=UiPoint((RectTransform)launchButton.transform,-.15f);}
                else if(stage==RocketStage.Build&&(tutorial==RocketTutorial.FirstBlock||(tutorial==RocketTutorial.Done&&next<guidedHandBlocks)))
                {
                    Vector3 p=player.playerCamera.WorldToScreenPoint(GhostCentre());
                    if(p.z>0){show=true;screen=new Vector2(p.x,p.y);}
                }
            }
            hand.gameObject.SetActive(show);if(!show)return;
            Vector2 local;
            if(!RectTransformUtility.ScreenPointToLocalPointInRectangle(canvasRect,screen,ui,out local))return;
            float cycle=(Time.unscaledTime*.9f)%1f;float k=cycle<.3f?Mathf.Sin(cycle/.3f*Mathf.PI):0f;
            hand.anchoredPosition=local+new Vector2(Mathf.Lerp(52,24,k),Mathf.Lerp(-56,-24,k));hand.localScale=Vector3.one*Mathf.Lerp(1f,.84f,k);hand.localEulerAngles=new Vector3(0,0,Mathf.Lerp(-12f,2f,k));
        }
        private Vector2 ChoicePoint(int i)
        {
            var rt=choices[i].button!=null?(RectTransform)choices[i].button.transform:null;if(rt==null)return Vector2.zero;
            rt.GetWorldCorners(uiCorners);Camera ui=canvas.renderMode==RenderMode.ScreenSpaceOverlay?null:canvas.worldCamera;
            return RectTransformUtility.WorldToScreenPoint(ui,(uiCorners[0]+uiCorners[2])*.5f);
        }
        private Vector2 UiPoint(RectTransform rt,float yOffset)
        {
            Vector3[] c=new Vector3[4];rt.GetWorldCorners(c);Camera ui=canvas.renderMode==RenderMode.ScreenSpaceOverlay?null:canvas.worldCamera;
            Vector3 centre=(c[0]+c[2])*.5f;centre+=(c[1]-c[0])*yOffset;return RectTransformUtility.WorldToScreenPoint(ui,centre);
        }
        private void UpdateUi()
        {
            if(promptText!=null)
            {
                string t;
                if(stage==RocketStage.Launch)t=launchPrompt;else if(stage==RocketStage.Showcase)t=donePrompt;else if(stage==RocketStage.AutoBuild)t="BUILDING...";
                else if(tutorial==RocketTutorial.Look)t=lookPrompt;else if(tutorial==RocketTutorial.Move)t=movePrompt;
                else if(next==0)t=firstPrompt;else t=buildPrompt;
                promptText.text=t;
            }
            if(countText!=null)countText.text="BUILT "+next+"/"+blocks.Length;
            int cur=next<blocks.Length?blockTypes[next]:-1;
            for(int i=0;i<types.Length;i++)
            {
                var e=types[i];bool empty=remaining[i]<=0;
                if(e.countText!=null)e.countText.text=remaining[i].ToString();
                if(e.frame!=null)e.frame.color=empty?new Color(.23f,.25f,.23f):i==cur?new Color(1,.82f,.25f):new Color(.48f,.5f,.46f);
                if(e.icon!=null)e.icon.color=empty?new Color(.45f,.45f,.45f):Color.white;
                if(e.emptyBadge!=null)e.emptyBadge.SetActive(false);
            }
            if(flyIcon!=null)flyIcon.color=player!=null&&player.Flying?new Color(.55f,1f,.6f):Color.white;
        }

        // ---------- responsive HUD (mini map top-right, stats under it, FLY on the right, popups in the middle) ----------
        public void LayoutHud(float aspect)
        {
            lastAspect=aspect;bool wide=aspect>=1.55f,tablet=aspect>1.05f&&!wide;
            Canvas.ForceUpdateCanvases();Vector2 size=canvasRect.rect.size;float unit=Mathf.Min(size.x,size.y);
            // top row: timer + built count top-left (where the game name was), blueprint mini map top-right
            float top=size.y*(wide? 0.035f:0.05f);
            if(minimap!=null){minimap.anchorMin=minimap.anchorMax=minimap.pivot=new Vector2(1,1);float m=unit*(wide? 0.27f:0.25f);minimap.sizeDelta=new Vector2(m,m);minimap.anchoredPosition=new Vector2(-unit*.035f,-top);}
            if(stats!=null){stats.anchorMin=stats.anchorMax=stats.pivot=new Vector2(0,1);stats.sizeDelta=new Vector2(unit*(wide? 0.3f:0.36f),unit*(wide? 0.13f:0.14f));stats.anchoredPosition=new Vector2(unit*.035f,-top);}
            if(flyButton!=null){var f=(RectTransform)flyButton.transform;f.anchorMin=f.anchorMax=f.pivot=new Vector2(1,0);float s=unit*(wide? 0.17f:0.2f);f.sizeDelta=new Vector2(s,s);f.anchoredPosition=new Vector2(-unit*.06f,size.y*(wide? 0.3f:tablet? 0.34f:0.17f));}
            foreach(var btn in new[]{quickBuildButton,launchButton})
            {
                if(btn==null)continue;var r=(RectTransform)btn.transform;
                bool docked=btn==quickBuildButton&&quickDocked&&stats!=null;
                Text label=null;foreach(var tx in btn.GetComponentsInChildren<Text>(true)){if(tx.GetComponent<RocketOutline>()!=null){label=tx;break;}if(label==null)label=tx;} /* skip the outline copies */
                /* docked button is small: give the label a tighter box so the text reads smaller */
                /* Luna's text renderer has no alignByGeometry and draws this pixel font ~8% of the button height too high: drop the box in builds */
                float drop=Application.isEditor?0f:lunaTextDrop;
                if(label!=null){var lr=label.rectTransform;lr.anchorMin=docked?new Vector2(.2f,.37f-drop):new Vector2(.1f,.28f-drop);lr.anchorMax=docked?new Vector2(.8f,.67f-drop):new Vector2(.9f,.76f-drop);lr.offsetMin=lr.offsetMax=Vector2.zero;}
                if(docked)
                {r.anchorMin=r.anchorMax=r.pivot=new Vector2(0,1);r.sizeDelta=new Vector2(stats.sizeDelta.x,unit*(wide? 0.1f:0.11f));r.anchoredPosition=stats.anchoredPosition-new Vector2(0,stats.sizeDelta.y+unit*.03f);continue;}
                r.anchorMin=r.anchorMax=r.pivot=new Vector2(.5f,.5f);
                // below the rocket, clear of the joystick / FLY button / hotbar
                r.sizeDelta=new Vector2(unit*(wide? 0.5f:0.5f),unit*(wide? 0.15f:0.16f));
                r.anchoredPosition=new Vector2(0,btn==launchButton?-size.y*(wide? 0.33f:0.3f):-size.y*(wide? 0.2f:0.14f));
            }
            if(playNow!=null){playNow.anchorMin=playNow.anchorMax=playNow.pivot=new Vector2(0,1);playNow.sizeDelta=new Vector2(unit*.3f,unit*.105f);playNow.anchoredPosition=new Vector2(unit*.04f,-size.y*(wide? 0.2f:0.165f));}
            if(promptText!=null){var pr=promptText.rectTransform;pr.anchorMin=wide?new Vector2(.28f,.7f):new Vector2(.04f,.655f);pr.anchorMax=wide?new Vector2(.72f,.78f):new Vector2(.96f,.705f);pr.offsetMin=pr.offsetMax=Vector2.zero;}
            if(layout!=null&&layout.movePad!=null)
            {
                var mp=layout.movePad;mp.anchorMin=mp.anchorMax=mp.pivot=new Vector2(0,0);float s=unit*(wide? 0.24f:0.3f);mp.sizeDelta=new Vector2(s,s);
                mp.anchoredPosition=new Vector2(unit*.05f,size.y*(wide? 0.24f:tablet? 0.3f:0.14f));
            }
            if(endGrid!=null)
            {
                /* end pictures: 2 x 2 grid in the middle, as big as fits */
                var eg=endGrid.GetComponent<GridLayoutGroup>();float cell=Mathf.Min(size.x*0.43f,size.y*(wide ? 0.27f : 0.28f)); /* title + 2x2 grid + CONTINUE must all fit the height */
                if(eg!=null){eg.cellSize=Vector2.one*cell;eg.spacing=Vector2.one*cell*0.07f;}endGrid.sizeDelta=new Vector2(cell*2.07f,cell*2.07f);
                endGrid.anchoredPosition=new Vector2(0f,unit*0.06f); /* a bit up: CONTINUE goes under it */
                if(endTitle!=null)
                {
                    var tr=endTitle.rectTransform;tr.anchorMin=tr.anchorMax=tr.pivot=new Vector2(0.5f,0.5f);
                    tr.sizeDelta=new Vector2(size.x*0.94f,unit*(wide ? 0.07f : 0.085f)); /* one line tall: best fit shrinks the text instead of wrapping it */
                    float ty=Mathf.Min(endGrid.anchoredPosition.y+cell*1.035f+unit*0.1f,size.y*0.5f-unit*0.11f); /* keep it (and its pop overshoot) inside the top edge */
                    tr.anchoredPosition=new Vector2(0f,ty);
                }
                if(continueButton!=null)
                {
                    var cr=(RectTransform)continueButton.transform;cr.anchorMin=cr.anchorMax=cr.pivot=new Vector2(0.5f,0.5f);
                    cr.sizeDelta=new Vector2(unit*0.5f,unit*0.15f);cr.anchoredPosition=new Vector2(0f,endGrid.anchoredPosition.y-cell*1.035f-unit*0.12f);
                }
            }
            if(choicePanel!=null&&choiceGrid!=null)
            {
                // rocket options: one row of big rounded cards where the hotbar will be
                choicePanel.anchorMin=new Vector2(wide? 0.27f:0.04f,wide? 0.04f:.03f);choicePanel.anchorMax=new Vector2(wide? 0.73f:0.96f,wide? 0.21f:0.14f);choicePanel.offsetMin=choicePanel.offsetMax=Vector2.zero;
                Canvas.ForceUpdateCanvases();int cn=Mathf.Max(1,choices.Length);choiceGrid.constraint=GridLayoutGroup.Constraint.FixedColumnCount;choiceGrid.constraintCount=cn;choiceGrid.childAlignment=TextAnchor.MiddleCenter;
                float cc=Mathf.Min((choicePanel.rect.width-(cn-1)*choiceGrid.spacing.x)/cn,choicePanel.rect.height);choiceGrid.cellSize=Vector2.one*Mathf.Max(30f,cc);
            }
            if(catalog!=null&&grid!=null)
            {
                // one row of block types
                catalog.anchorMin=new Vector2(wide? 0.2f:0.025f,.02f);catalog.anchorMax=new Vector2(wide? 0.8f:0.975f,wide? 0.17f:0.11f);catalog.offsetMin=catalog.offsetMax=Vector2.zero;
                Canvas.ForceUpdateCanvases();int n=types.Length;grid.constraintCount=n;
                float cell=Mathf.Min((catalog.rect.width-grid.padding.horizontal-(n-1)*grid.spacing.x)/n,catalog.rect.height-grid.padding.vertical);
                grid.cellSize=Vector2.one*Mathf.Max(30f,cell);
            }
        }
        private void OnApplicationPause(bool value){}
    }
}
