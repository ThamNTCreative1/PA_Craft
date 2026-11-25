using UnityEngine;
using UnityEngine.UI;
namespace CEBB.Playable
{
    // Luna playground fields (all in the default section) + end of game.
    // Time -> CTA, Count -> CTA (first tutorial tap = 1; every build tap, block-type tap, FLY tap and QUICK BUILD tap adds 1),
    // LAUNCH -> CTA. Ending shows a transparent full-screen button: GameEnded (once) + InstallFullGame on every tap.
    public sealed class RocketLuna:MonoBehaviour
    {
        [LunaPlaygroundField("Time limit (seconds)",0)] [Min(1)] public float timeLimit=60f;
        [LunaPlaygroundField("Clicks to end (0 = off)",1)] [Min(0)] public int clicksToEnd=0;
        [LunaPlaygroundField("Blocks before Quick Build",2)] [Min(1)] public int quickBuildAfter=5;
        [LunaPlaygroundField("Music on",3)] public bool musicOn=true;
        [LunaPlaygroundField("Quick Build goes to CTA (end game)",4)] public bool quickBuildToCta=false;
        // LaunchRocket scene only (no effect where the worlds / rocket choices are not set)
        [LunaPlaygroundField("Choose rocket goes to CTA",5)] public bool chooseToCta=false;
        [LunaPlaygroundField("Build done goes to CTA",6)] public bool buildToCta=false;
        [LunaPlaygroundField("Launch goes to CTA",7)] public bool launchToCta=true;
        [LunaPlaygroundField("Desert map (off = grass map)",8)] public bool desertMap=true;
        [LunaPlaygroundField("Music volume (BGM)",9)] [Range(0,1)] public float musicVolume=0.6f;
        [LunaPlaygroundAsset("End picture 1",10)] public Texture2D endImage1;
        [LunaPlaygroundAsset("End picture 2",11)] public Texture2D endImage2;
        [LunaPlaygroundAsset("End picture 3",12)] public Texture2D endImage3;
        [LunaPlaygroundAsset("End picture 4",13)] public Texture2D endImage4;
        [LunaPlaygroundField("End title (above the cards)",14)] public string endTitle="BUILD YOUR OWN ROCKET!";
        public Texture2D EndImage(int i){if(i==0)return endImage1;if(i==1)return endImage2;if(i==2)return endImage3;return endImage4;}
        public GameObject desertWorld,grassWorld;public Camera skyCamera;public Color desertSky=new Color(.97f,.79f,.62f),grassSky=new Color(.53f,.78f,.98f);
        [HideInInspector] public int grassWidth,grassDepth;[HideInInspector] public float grassOriginX,grassOriginZ;[HideInInspector] public int[] grassHeights;
        public RocketPlayable game;public Button ctaOverlay;public Text timerText;
        private bool started,ended,gameEndedSent;private float elapsed;private int lastSecond=-1,endedFrame=-1,lastCtaFrame=-1;
        public bool Ended {get{return ended;}}
        private void Awake()
        {
            if(ctaOverlay!=null){ctaOverlay.onClick.AddListener(OnCtaClicked);ctaOverlay.gameObject.SetActive(false);}
            if(desertWorld!=null&&grassWorld!=null)
            {
                desertWorld.SetActive(desertMap);grassWorld.SetActive(!desertMap);if(skyCamera!=null)skyCamera.backgroundColor=desertMap?desertSky:grassSky;
                var p=game!=null?game.player:null; /* walk on the grass map's ground */
                if(!desertMap&&p!=null&&grassHeights!=null&&grassHeights.Length>0){p.gridWidth=grassWidth;p.gridDepth=grassDepth;p.originX=grassOriginX;p.originZ=grassOriginZ;p.heights=grassHeights;}
            }
            ShowTime();
        }
        public void NotifyStarted(){if(started)return;started=true;Luna.Unity.LifeCycle.GameStarted();}
        public void NotifyClick(int total){if(clicksToEnd>0&&total>=clicksToEnd)EndGame();}
        private void Update()
        {
            if(!started||ended)return;elapsed+=Time.unscaledDeltaTime;ShowTime();
            if(elapsed>=timeLimit)EndGame();
        }
        private void ShowTime(){if(timerText==null)return;int s=Mathf.CeilToInt(Mathf.Max(0,timeLimit-elapsed));if(s!=lastSecond){lastSecond=s;timerText.text=s+"s";}}
        // Time / count reached: freeze and wait for a tap anywhere.
        public void EndGame()
        {
            if(ended)return;ended=true;endedFrame=Time.frameCount;
            if(game!=null)game.Freeze();
            if(ctaOverlay!=null){ctaOverlay.gameObject.SetActive(true);ctaOverlay.transform.SetAsLastSibling();}
        }
        // LAUNCH: end game + CTA right away.
        public void EndGameAndCta(){if(!ended){ended=true;endedFrame=-1;if(game!=null)game.Freeze();if(ctaOverlay!=null){ctaOverlay.gameObject.SetActive(true);ctaOverlay.transform.SetAsLastSibling();}}Cta();}
        public void OnCtaClicked(){if(!ended||Time.frameCount<=endedFrame)return;Cta();}
        private void Cta()
        {
            if(lastCtaFrame==Time.frameCount)return;lastCtaFrame=Time.frameCount;
            if(!gameEndedSent){gameEndedSent=true;Luna.Unity.LifeCycle.GameEnded();}
            Luna.Unity.Playable.InstallFullGame();
#if UNITY_EDITOR
            Debug.Log("[Rocket] GameEnded + InstallFullGame (Editor preview)");
#endif
        }
    }
}
