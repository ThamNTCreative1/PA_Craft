using TMPro;
using UnityEngine;
using UnityEngine.UI;
namespace CEBB.Playable
{
    // Luna end-of-game controller. All playground fields stay in Luna's default section (no section name).
    // Ends when the time runs out or the player has placed enough items (or made enough clicks, if set).
    // Then a transparent full-screen CTA button appears: tapping it calls GameEnded (once) and InstallFullGame.
    public sealed class LunaController:MonoBehaviour
    {
        [LunaPlaygroundField("Time limit (seconds)",0)] [Min(1)] public float timeLimit=30f;
        [LunaPlaygroundField("Items placed to end (0 = off)",1)] [Min(0)] public int itemsToEnd=5;
        [LunaPlaygroundField("Clicks to end (0 = off)",2)] [Min(0)] public int clicksToEnd=0;
        [LunaPlaygroundAsset("Game logo",3)] public Texture2D gameLogo;
        public Image logoImage;
        public LivingRoomPlayable game;
        [Tooltip("Transparent full-screen button shown when the game ends")] public Button ctaOverlay;
        public TMP_Text timerText;
        private bool started,ended,gameEndedSent;private float elapsed;private int lastSecond=-1,endedFrame=-1,lastCtaFrame=-1;
        public bool Ended {get{return ended;}}
        public float TimeLeft {get{return Mathf.Max(0,timeLimit-elapsed);}}

        private void Awake()
        {
            // Playground logo: swap the sprite only when a different texture was supplied.
            if(logoImage!=null&&gameLogo!=null&&(logoImage.sprite==null||logoImage.sprite.texture!=gameLogo))
            {logoImage.sprite=Sprite.Create(gameLogo,new Rect(0,0,gameLogo.width,gameLogo.height),new Vector2(.5f,.5f),100f);logoImage.preserveAspect=true;}
            if(ctaOverlay!=null){ctaOverlay.onClick.AddListener(OnCtaClicked);ctaOverlay.gameObject.SetActive(false);}
            ShowTime();
        }
        // First interaction: start the timer.
        public void NotifyStarted()
        {
            if(started)return;started=true;
            Luna.Unity.LifeCycle.GameStarted();
        }
        public void NotifyPlaced(int totalPlaced){if(itemsToEnd>0&&totalPlaced>=itemsToEnd)EndGame();}
        public void NotifyClick(int totalClicks){if(clicksToEnd>0&&totalClicks>=clicksToEnd)EndGame();}
        private void Update()
        {
            if(!started||ended)return;
            elapsed+=Time.unscaledDeltaTime;ShowTime();
            if(elapsed>=timeLimit)EndGame();
        }
        private void ShowTime()
        {
            if(timerText==null)return;int s=Mathf.CeilToInt(TimeLeft);if(s!=lastSecond){lastSecond=s;timerText.text=s+"s";}
        }
        public void EndGame()
        {
            if(ended)return;ended=true;endedFrame=Time.frameCount;
            if(game!=null)game.Freeze();
            if(ctaOverlay!=null){ctaOverlay.gameObject.SetActive(true);ctaOverlay.transform.SetAsLastSibling();}
        }
        // Transparent CTA: end game (once) + store.
        public void OnCtaClicked()
        {
            if(!ended||Time.frameCount<=endedFrame||lastCtaFrame==Time.frameCount)return;lastCtaFrame=Time.frameCount;
            if(!gameEndedSent){gameEndedSent=true;Luna.Unity.LifeCycle.GameEnded();}
            Luna.Unity.Playable.InstallFullGame();
#if UNITY_EDITOR
            Debug.Log("[CEBB] Luna end: GameEnded + InstallFullGame (Editor preview)");
#endif
        }
    }
}
