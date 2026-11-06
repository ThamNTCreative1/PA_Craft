using System;
using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.Events;
using UnityEngine.UI;
namespace CEBB.Playable
{
    public enum LivingStage { SelectItem, LookAround, PressBuild, Move, Free, Ended }
    [Serializable] public sealed class DecorCatalogEntry
    {
        public DecorItem item;public Button button;public Image frame,icon;public Text quantityText,nameText;public GameObject emptyBadge;
    }
    // Living room decorating playable (build / remove flow modelled on the AutoBuildHalloween playable).
    // 1) "Tap to decor": hand on the Sofa slot, then on BUILD (wiggles "drag to find a clear spot" while the ghost is blocked).
    // 2) Hand on the Table slot, then the infinity-loop "drag to look around" guide until the camera turned, then BUILD.
    // 3) Trash tutorial: hand on the trash button until the player has removed something once.
    // 4) Move tutorial: the joystick demos itself (no hand) until the player walks a little. Then free building.
    // Trash = remove mode: ghost hidden, BUILD locked, trash pulses, hand points at the nearest visible item;
    // tapping an item removes it (refunded to the hotbar) and leaves remove mode.
    // Every catalog / BUILD / rotate / trash click and every tap that builds or removes adds to the click count.
    [DefaultExecutionOrder(-100)] public sealed class LivingRoomPlayable:MonoBehaviour
    {
        [Header("Catalog — one entry per hotbar slot")]
        public DecorCatalogEntry[] catalog;
        [Header("Tutorial")]
        [Tooltip("Catalog slot the hand points at first")] public int firstEntry=0;
        [Tooltip("Catalog slot the hand points at after the first build")] public int guideEntry=2;
        [Tooltip("Infinity-loop look guide (drawn by the setup script) and its half size in canvas units")] public RectTransform lookGuide;public Vector2 lookGuideRadius=new Vector2(170,62);
        [Min(5)] public float lookTutorialDegrees=40;
        [Min(.1f)] public float moveTutorialDistance=1.5f;
        [Header("Placement")]
        public Transform roomRoot,placedRoot;public Material ghostMaterial,ghostInvalidMaterial;public Transform deleteMarker,footprintMarker;
        public Vector2 roomMin=new Vector2(-4.85f,-4.35f),roomMax=new Vector2(4.85f,4.35f);public float roomHeight=4f;
        [Min(.05f)] public float snap=.25f;public float buildReach=9f;
        public LivingRoomPlayer player;
        [Header("End conditions + transparent CTA live in LunaController")]
        public LunaController luna;
        [Header("UI")]
        public Text promptText,countText,buildLabel;public RectTransform hand;public Button buildButton,trashButton,rotateButton,ctaButton;public Image trashImage,reticle,buildFill;
        public string firstPrompt="TAP TO DECOR LIVING ROOM",selectPrompt="CHOOSE A FURNITURE",lookPrompt="DRAG TO LOOK AROUND",movePrompt="MOVE WITH THE JOYSTICK",aimPrompt="DRAG TO FIND A CLEAR SPOT",buildPrompt="TAP BUILD TO PLACE IT",freePrompt="DECORATE YOUR LIVING ROOM";
        public string trashPrompt="TAP TRASH TO REMOVE AN ITEM",deletePrompt="TAP AN ITEM TO REMOVE IT",emptyPrompt="PICK ANOTHER FURNITURE";
        public string overlapPrompt="OVERLAPS ANOTHER ITEM",playerPrompt="TOO CLOSE TO YOU",wallPrompt="PLACE IT ON A WALL",heightPrompt="NOT ENOUGH ROOM HERE";
        [Min(.01f)] public float revealSeconds=.32f;
        [Header("Audio + Luna playground")]
        public AudioSource placementAudio;public AudioClip placementSfx;[Range(0,1)] public float placementVolume=.65f;
        public AudioSource bgmSource;
        [LunaPlaygroundAsset("Background music",3)] public AudioClip bgmClip;
        [LunaPlaygroundField("Music volume (0-1)",4)] [Range(0,1)] public float bgmVolume=1f;
        [LunaPlaygroundField("Music on",5)] public bool bgmEnabled=true;
        public UnityEvent onGameStarted=new UnityEvent(),onGameEnded=new UnityEvent(),onCtaClicked=new UnityEvent(),onFurniturePlaced=new UnityEvent();
        [SerializeField] private LivingStage stage;
        [SerializeField] private int interactionCount,builtCount,placementsTotal,selected=-1;

        private sealed class Piece { public int entry;public GameObject go;public BoxCollider box;public bool walkable; }
        private List<Piece>[] pool;private readonly List<Piece> placed=new List<Piece>();private readonly Dictionary<Collider,Piece> byCollider=new Dictionary<Collider,Piece>();
        private readonly List<Collider> roomSolids=new List<Collider>();
        private GameObject[] ghosts;private Renderer[][] ghostRenderers;private bool[] ghostRed;private Renderer footprintRenderer;
        private bool started,endOverlayArmed,deleteMode,poseValid,hasPose,paused,removedOnce,ignoreNextTap;private float lookProgress,moveProgress;
        private Vector3 posePosition;private float poseYaw,rotateOffset;private Piece aimedPiece,deleteHint;private string invalidReason;
        private int lastClickFrame=-1,lastCtaFrame=-1,animating;
        private float flashUntil;private string flashText;
        private Canvas guidanceCanvas;private RectTransform guidanceRect;
        // Button icons come from the reference playable: white = normal, grey = locked, green pulse = remove mode on.
        private static readonly Color buildNormal=Color.white,buildLocked=new Color(.5f,.5f,.5f,.85f),trashIdle=Color.white,trashActive=new Color(.7f,1f,.25f,1f);

        public LivingStage Stage {get{return stage;}}
        public int InteractionCount {get{return interactionCount;}}
        public int BuiltCount {get{return builtCount;}}
        public bool EndOverlayArmed {get{return endOverlayArmed;}}
        public bool IsDeleteMode {get{return deleteMode;}}
        public bool AllowLook {get{return !endOverlayArmed&&!paused;}}
        public bool CanMove {get{return AllowLook;}}

        private void Awake()
        {
            ApplyPlaygroundSettings();
            stage=LivingStage.SelectItem;
            if(promptText!=null){guidanceCanvas=promptText.canvas;guidanceRect=guidanceCanvas.GetComponent<RectTransform>();}
            if(roomRoot!=null)foreach(var c in roomRoot.GetComponentsInChildren<Collider>())if(!c.isTrigger)roomSolids.Add(c);
            pool=new List<Piece>[catalog.Length];ghosts=new GameObject[catalog.Length];ghostRenderers=new Renderer[catalog.Length][];ghostRed=new bool[catalog.Length];
            for(int e=0;e<catalog.Length;e++)
            {
                pool[e]=new List<Piece>();var item=catalog[e].item;if(item==null||item.prefab==null){Debug.LogError("Missing decor item "+e,this);continue;}
                Vector3 size=item.boundsSize;size.y=Mathf.Max(.03f,size.y);
                for(int q=0;q<item.quantity;q++)
                {
                    var go=Instantiate(item.prefab,placedRoot,false);go.name=item.displayName+" "+(q+1);
                    var box=go.AddComponent<BoxCollider>();box.center=new Vector3(0,size.y*.5f,0);box.size=size;box.isTrigger=item.walkableSurface;
                    var piece=new Piece{entry=e,go=go,box=box,walkable=item.walkableSurface};pool[e].Add(piece);byCollider[box]=piece;go.SetActive(false);
                }
                var ghost=Instantiate(item.prefab,transform,false);ghost.name="Ghost — "+item.displayName;ghosts[e]=ghost;
                ghostRenderers[e]=ghost.GetComponentsInChildren<Renderer>();SetGhostMaterial(e,false,true);ghost.SetActive(false);
                int n=e;if(catalog[e].button!=null)catalog[e].button.onClick.AddListener(delegate{SelectEntry(n);});
            }
            if(buildButton!=null)buildButton.onClick.AddListener(PressBuild);
            if(trashButton!=null)trashButton.onClick.AddListener(PressTrash);
            if(rotateButton!=null)rotateButton.onClick.AddListener(PressRotate);
            if(ctaButton!=null)ctaButton.onClick.AddListener(OpenStore);
            if(deleteMarker!=null)deleteMarker.gameObject.SetActive(false);
            if(footprintMarker!=null){footprintRenderer=footprintMarker.GetComponent<Renderer>();footprintMarker.gameObject.SetActive(false);}
            if(hand!=null&&guidanceRect!=null){hand.SetParent(guidanceRect,false);hand.anchorMin=hand.anchorMax=new Vector2(.5f,.5f);hand.SetAsLastSibling();}
            if(lookGuide!=null)lookGuide.gameObject.SetActive(false);
            UpdateUi();RefreshHud();
        }
        private void ApplyPlaygroundSettings()
        {
            if(bgmSource!=null){bgmSource.playOnAwake=false;if(bgmClip!=null)bgmSource.clip=bgmClip;bgmSource.loop=true;bgmSource.volume=Mathf.Clamp01(bgmVolume);bgmSource.Stop();}
        }
        private void SetGhostMaterial(int e,bool red,bool force)
        {
            if(!force&&ghostRed[e]==red)return;ghostRed[e]=red;var mat=red&&ghostInvalidMaterial!=null?ghostInvalidMaterial:ghostMaterial;
            var list=ghostRenderers[e];for(int i=0;i<list.Length;i++){var r=list[i];var mats=r.sharedMaterials;for(int k=0;k<mats.Length;k++)mats[k]=mat;r.sharedMaterials=mats;r.shadowCastingMode=UnityEngine.Rendering.ShadowCastingMode.Off;r.receiveShadows=false;}
        }

        // ---------- input ----------
        public void NotifyFirstInput()
        {
            if(started)return;started=true;
            if(bgmSource!=null&&bgmEnabled&&bgmSource.clip!=null)bgmSource.Play();
            if(luna!=null)luna.NotifyStarted();
            onGameStarted.Invoke();
        }
        // Short tap on the 3D view: builds at the ghost (same as BUILD), or removes the tapped item in remove mode.
        public void TapAt([Bridge.Ref] Vector2 screen)
        {
            if(endOverlayArmed||paused)return;NotifyFirstInput();
            if(ignoreNextTap){ignoreNextTap=false;return;}
            if(player==null)return;Ray ray=player.playerCamera.ScreenPointToRay(screen);
            if(deleteMode){Piece p=PieceUnder(ray);if(p!=null){Remove(p);Count();}return;}
            if(stage==LivingStage.SelectItem||selected<0||Remaining(selected)==0)return;
            // build exactly where the ghost is shown (crosshair), never at the raw touch point
            if(hasPose&&poseValid){Place(selected,posePosition,poseYaw);Count();}else Flash(hasPose?invalidReason:aimPrompt);
        }
        public void SelectEntry(int index)
        {
            if(endOverlayArmed||index<0||index>=catalog.Length||Frame())return;NotifyFirstInput();
            SetDeleteMode(false);
            if(Remaining(index)==0)Flash(emptyPrompt);
            else
            {
                if(selected>=0&&selected!=index&&ghosts[selected]!=null)ghosts[selected].SetActive(false);
                if(selected!=index)rotateOffset=0;
                selected=index;if(stage==LivingStage.SelectItem){if(builtCount==0)stage=LivingStage.PressBuild;else{stage=LivingStage.LookAround;lookProgress=0;}}
            }
            UpdateUi();Count();
        }
        public void PressBuild()
        {
            if(endOverlayArmed||paused||Frame())return;NotifyFirstInput();
            if(deleteMode)return; // BUILD is locked while removing
            if(stage==LivingStage.SelectItem)Flash(selectPrompt);
            else if(selected>=0)
            {
                if(Remaining(selected)==0)Flash(emptyPrompt);
                else if(hasPose&&poseValid)Place(selected,posePosition,poseYaw);
                else Flash(hasPose?invalidReason:aimPrompt);
            }
            Count();
        }
        public void PressTrash()
        {
            if(endOverlayArmed||paused||Frame())return;NotifyFirstInput();
            SetDeleteMode(!deleteMode&&placed.Count>0);Count();
        }
        public void PressRotate()
        {
            if(endOverlayArmed||paused||deleteMode||Frame())return;NotifyFirstInput();
            rotateOffset=Mathf.Repeat(rotateOffset-90f,360f);Count(); // icon turns left
        }
        private void SetDeleteMode(bool on)
        {
            if(deleteMode==on)return;deleteMode=on;aimedPiece=null;deleteHint=null;
            if(on){if(selected>=0&&ghosts[selected]!=null)ghosts[selected].SetActive(false);if(footprintMarker!=null)footprintMarker.gameObject.SetActive(false);hasPose=false;}
            else if(deleteMarker!=null)deleteMarker.gameObject.SetActive(false);
            UpdateUi();
        }
        private bool Frame(){if(lastClickFrame==Time.frameCount)return true;lastClickFrame=Time.frameCount;return false;}
        private void Count()
        {
            interactionCount++;
            if(luna!=null)luna.NotifyClick(interactionCount);
        }
        private void Flash(string text){if(string.IsNullOrEmpty(text))return;flashText=text;flashUntil=Time.unscaledTime+1.2f;UpdateUi();}

        // ---------- building ----------
        // Any touch on the 3D view ends the look-around tutorial straight away.
        public void NotifyScreenTouch()
        {
            if(stage==LivingStage.LookAround&&!endOverlayArmed){stage=LivingStage.PressBuild;ignoreNextTap=true;} // this touch only closes the guide
        }
        public void ClearIgnoredTap(){ignoreNextTap=false;}
        // Called by the player for every drag; finishes the look-around tutorial.
        public void NotifyLook(float degrees)
        {
            if(stage!=LivingStage.LookAround||endOverlayArmed)return;
            lookProgress+=Mathf.Abs(degrees);if(lookProgress>=lookTutorialDegrees)stage=LivingStage.PressBuild;
        }
        // Called by the player whenever it walks; finishes the move tutorial.
        public void NotifyMove(float distance)
        {
            if(stage!=LivingStage.Move||!removedOnce||endOverlayArmed)return; // trash tutorial comes first
            moveProgress+=Mathf.Abs(distance);if(moveProgress>=moveTutorialDistance)stage=LivingStage.Free;
        }
        public int Remaining(int entry){if(entry<0||entry>=catalog.Length)return 0;int n=0;var list=pool[entry];for(int i=0;i<list.Count;i++)if(!list[i].go.activeSelf)n++;return n;}
        private void Place(int entry,[Bridge.Ref] Vector3 position,float yaw)
        {
            Piece piece=null;var list=pool[entry];for(int i=0;i<list.Count;i++)if(!list[i].go.activeSelf){piece=list[i];break;}
            if(piece==null)return;
            piece.go.transform.position=position;piece.go.transform.rotation=Quaternion.Euler(0,yaw,0);piece.go.transform.localScale=Vector3.one;piece.go.SetActive(true);
            placed.Add(piece);builtCount++;placementsTotal++;
            if(placementAudio!=null&&placementSfx!=null)placementAudio.PlayOneShot(placementSfx,placementVolume);
            onFurniturePlaced.Invoke();
            if(stage==LivingStage.PressBuild||stage==LivingStage.LookAround){if(builtCount>=2){stage=LivingStage.Move;moveProgress=0;}else stage=LivingStage.SelectItem;}
            StartCoroutine(Reveal(piece,position));UpdateUi();
            if(luna!=null)luna.NotifyPlaced(placementsTotal);
        }
        private void Remove(Piece piece)
        {
            if(!placed.Contains(piece))return;placed.Remove(piece);piece.go.SetActive(false);builtCount--;removedOnce=true;
            SetDeleteMode(false);
            if(placementAudio!=null&&placementSfx!=null)placementAudio.PlayOneShot(placementSfx,placementVolume*.6f);
            UpdateUi();
        }
        // Back-ease pop (same curve as the reference playable), grown from the ghost spot without moving.
        private IEnumerator Reveal(Piece piece,[Bridge.Ref] Vector3 position)
        {
            animating++;float time=0;Transform t=piece.go.transform;
            while(time<revealSeconds)
            {
                time+=Time.unscaledDeltaTime;float k=Mathf.Clamp01(time/revealSeconds);
                t.localScale=Vector3.one*Mathf.Max(.01f,1f+2.70158f*Mathf.Pow(k-1f,3)+1.70158f*Mathf.Pow(k-1f,2));t.position=position; // pops in place, exactly where the ghost was
                yield return null;
            }
            t.localScale=Vector3.one;t.position=position;animating--;
        }
        private Piece PieceUnder([Bridge.Ref] Ray ray)
        {
            RaycastHit hit;if(!Physics.Raycast(ray,out hit,buildReach,Physics.DefaultRaycastLayers,QueryTriggerInteraction.Collide))return null;
            Piece p;return byCollider.TryGetValue(hit.collider,out p)?p:null;
        }
        private float Snap(float v){return Mathf.Round(v/snap)*snap;}
        // Pose for item `entry` from a view ray. Returns false when there is nothing to show (no hit / ceiling).
        // When the pose is not valid, invalidReason says why (shown in the prompt).
        private bool ComputePose([Bridge.Ref] Ray ray,int entry,out Vector3 pos,out float yaw,out bool valid)
        {
            pos=Vector3.zero;yaw=0;valid=false;invalidReason=null;var item=catalog[entry].item;RaycastHit hit;
            if(!Physics.Raycast(ray,out hit,buildReach,Physics.DefaultRaycastLayers,QueryTriggerInteraction.Collide))return false;
            if(hit.normal.y<-.5f)return false;
            Vector3 size=item.boundsSize;Piece under;byCollider.TryGetValue(hit.collider,out under);
            Vector3 wallNormal=Vector3.zero;
            if(item.mount==DecorMount.Wall)
            {
                Vector3 n=hit.normal;if(Mathf.Abs(n.y)>.5f){n=-ray.direction;n.y=0;if(n.sqrMagnitude<.01f)return false;n.Normalize();}
                n=Mathf.Abs(n.x)>Mathf.Abs(n.z)?new Vector3(Mathf.Sign(n.x),0,0):new Vector3(0,0,Mathf.Sign(n.z));
                yaw=Mathf.Atan2(-n.x,-n.z)*Mathf.Rad2Deg;wallNormal=n;
                var surface=hit.collider.GetComponent<PlacementSurface>();
                if(under!=null||surface==null||!surface.allowWallItems)invalidReason=wallPrompt;
                pos=hit.point+n*(size.z*.5f+.01f);
                if(n.x!=0)pos.z=Snap(pos.z);else pos.x=Snap(pos.x);
                pos.y=Mathf.Clamp(Snap(hit.point.y-size.y*.5f),.5f,roomHeight-size.y-.1f);
            }
            else
            {
                bool top=hit.normal.y>.7f;pos=hit.point;
                yaw=Mathf.Round(player.Yaw/90f)*90f+rotateOffset;
                if(!top){Vector3 n=hit.normal;n.y=0;if(n.sqrMagnitude<.01f)n=-ray.direction;n.y=0;n.Normalize();pos+=n*(Mathf.Max(size.x,size.z)*.5f+.05f);pos.y=0;}
                else if(under==null||under.walkable||item.walkableSurface||!CanStackOn(item,catalog[under.entry].item))pos.y=0; // only small items go on tables / counters
                else pos.y=under.box.bounds.max.y;
                pos.x=Snap(pos.x);pos.z=Snap(pos.z);
                if(item.walkableSurface)pos.y=.006f;
            }
            bool swap=Mathf.Abs(Mathf.Repeat(yaw,180f)-90f)<1f;float hx=(swap?size.z:size.x)*.5f,hz=(swap?size.x:size.z)*.5f;
            // wall items sit against the wall, so only clamp along the wall
            if(wallNormal.x==0)pos.x=Mathf.Clamp(pos.x,roomMin.x+hx,roomMax.x-hx);
            if(wallNormal.z==0)pos.z=Mathf.Clamp(pos.z,roomMin.y+hz,roomMax.y-hz);
            if(invalidReason==null&&pos.y+size.y>roomHeight-.02f)invalidReason=heightPrompt;
            if(invalidReason==null)invalidReason=BlockReason(pos,hx,hz,size.y,item);
            valid=invalidReason==null;
            return true;
        }
        // Small, low items (TV, plant, microwave...) may stand on a top-surface item; big furniture never stacks.
        private static bool CanStackOn(DecorItem item,DecorItem surface)
        {
            if(!surface.topSurface||item.boundsSize.y>1.05f)return false;
            return item.boundsSize.x*item.boundsSize.z<=.75f*surface.boundsSize.x*surface.boundsSize.z;
        }
        private string BlockReason([Bridge.Ref] Vector3 pos,float hx,float hz,float height,DecorItem item)
        {
            const float pad=.03f;float minX=pos.x-hx+pad,maxX=pos.x+hx-pad,minZ=pos.z-hz+pad,maxZ=pos.z+hz-pad,minY=pos.y,maxY=pos.y+Mathf.Max(.03f,height);
            for(int i=0;i<placed.Count;i++)
            {
                var p=placed[i];if(p.walkable!=item.walkableSurface)continue;Bounds b=p.box.bounds;
                if(maxX<=b.min.x||minX>=b.max.x||maxZ<=b.min.z||minZ>=b.max.z)continue;
                if(minY>=b.max.y-.05f||maxY<=b.min.y+.02f)continue;
                return overlapPrompt;
            }
            if(!item.walkableSurface&&item.mount==DecorMount.Floor&&player!=null)
            {
                Vector3 b=player.transform.position;float r=player.bodyRadius;
                if(b.x>minX-r&&b.x<maxX+r&&b.z>minZ-r&&b.z<maxZ+r&&minY<1.7f)return playerPrompt;
            }
            return null;
        }
        // Plain bounds test (no Physics.CheckCapsule) so movement behaves the same in Luna.
        public bool IsClear([Bridge.Ref] Vector3 p,float radius)
        {
            for(int i=0;i<roomSolids.Count;i++)if(Blocks(roomSolids[i].bounds,p,radius))return false;
            for(int i=0;i<placed.Count;i++)if(!placed[i].walkable&&Blocks(placed[i].box.bounds,p,radius))return false;
            return true;
        }
        private static bool Blocks([Bridge.Ref] Bounds b,[Bridge.Ref] Vector3 p,float r){if(b.max.y<.1f||b.min.y>1.6f)return false;return p.x>b.min.x-r&&p.x<b.max.x+r&&p.z>b.min.z-r&&p.z<b.max.z+r;}

        // ---------- per frame ----------
        private void Update()
        {
            if(paused||endOverlayArmed)return;
            if(flashText!=null&&Time.unscaledTime>flashUntil)flashText=null;
        }
        private void LateUpdate()
        {
            if(player==null||endOverlayArmed)return;Camera view=player.playerCamera;Ray ray=view.ViewportPointToRay(new Vector3(.5f,.5f,0));
            hasPose=false;aimedPiece=null;bool showFootprint=false;
            if(deleteMode)
            {
                if(placed.Count==0)SetDeleteMode(false);
                else
                {
                    aimedPiece=PieceUnder(ray);deleteHint=aimedPiece!=null?aimedPiece:NearestVisiblePiece(view);
                    if(deleteMarker!=null){deleteMarker.gameObject.SetActive(deleteHint!=null);if(deleteHint!=null){Bounds b=deleteHint.box.bounds;deleteMarker.position=b.center;deleteMarker.rotation=Quaternion.identity;deleteMarker.localScale=b.size+Vector3.one*.06f;}}
                }
            }
            if(!deleteMode)
            {
                deleteHint=null;
                if(deleteMarker!=null&&deleteMarker.gameObject.activeSelf)deleteMarker.gameObject.SetActive(false);
                if(stage!=LivingStage.SelectItem&&selected>=0&&Remaining(selected)>0&&animating==0)
                {
                    Vector3 pos;float yaw;bool valid;hasPose=ComputePose(ray,selected,out pos,out yaw,out valid);
                    if(hasPose)
                    {
                        posePosition=pos;poseYaw=yaw;poseValid=valid;var g=ghosts[selected];g.transform.position=pos;g.transform.rotation=Quaternion.Euler(0,yaw,0);SetGhostMaterial(selected,!valid,false);
                        var item=catalog[selected].item;
                        if(footprintMarker!=null&&item.mount==DecorMount.Floor)
                        {
                            showFootprint=true;Vector3 s=item.boundsSize;
                            footprintMarker.position=new Vector3(pos.x,pos.y+.012f,pos.z);footprintMarker.rotation=Quaternion.Euler(0,yaw,0);footprintMarker.localScale=new Vector3(s.x+.06f,.02f,s.z+.06f);
                            if(footprintRenderer!=null)footprintRenderer.sharedMaterial=valid?ghostMaterial:ghostInvalidMaterial;
                        }
                    }
                }
                if(selected>=0&&ghosts[selected]!=null&&ghosts[selected].activeSelf!=hasPose)ghosts[selected].SetActive(hasPose);
            }
            if(footprintMarker!=null&&footprintMarker.gameObject.activeSelf!=showFootprint)footprintMarker.gameObject.SetActive(showFootprint);
            if(reticle!=null)reticle.color=deleteMode?(aimedPiece!=null?new Color(1,.35f,.3f):Color.white):(hasPose&&poseValid?new Color(.35f,1,.9f):Color.white);
            RefreshHud();UpdateHand(view);
        }
        // Closest placed item to the player that is on screen (above the hotbar) and not hidden behind something.
        private Piece NearestVisiblePiece(Camera view)
        {
            Piece best=null;float bestDistance=float.MaxValue;Vector3 origin=player.transform.position;
            for(int i=0;i<placed.Count;i++)
            {
                var p=placed[i];Vector3 c=p.box.bounds.center;Vector3 v=view.WorldToViewportPoint(c);
                if(v.z<.3f||v.x<.08f||v.x>.92f||v.y<.28f||v.y>.85f)continue;
                if(PieceUnder(view.ViewportPointToRay(v))!=p)continue;
                float d=(c.x-origin.x)*(c.x-origin.x)+(c.z-origin.z)*(c.z-origin.z);if(d<bestDistance){bestDistance=d;best=p;}
            }
            return best;
        }
        private void UpdateHand(Camera view)
        {
            if(hand==null||guidanceRect==null)return;
            Camera ui=guidanceCanvas.renderMode==RenderMode.ScreenSpaceOverlay?null:guidanceCanvas.worldCamera;Vector2 screen=Vector2.zero;bool show=false,press=true,loop=false;
            if(!endOverlayArmed&&animating==0)
            {
                if(deleteMode)
                {
                    if(deleteHint!=null){Vector3 p=view.WorldToScreenPoint(deleteHint.box.bounds.center);if(p.z>0){screen=new Vector2(p.x,p.y);show=true;}}
                }
                else if(stage==LivingStage.SelectItem&&builtCount<2)show=UiPoint(catalog[builtCount==0?firstEntry:guideEntry].button,ui,out screen);
                else if(stage==LivingStage.LookAround){loop=true;show=true;}
                else if(stage==LivingStage.PressBuild&&builtCount==0) // hand on BUILD only for the first item
                {
                    if(hasPose&&poseValid)show=UiPoint(buildButton,ui,out screen);
                    else{screen=new Vector2(view.pixelWidth*.5f+view.pixelWidth*.06f*Mathf.Sin(Time.unscaledTime*3f),view.pixelHeight*.5f);show=true;press=false;}
                }
                else if(stage==LivingStage.Move&&!removedOnce)show=UiPoint(trashButton,ui,out screen,-.2f); // finger on the bin itself
            }
            if(lookGuide!=null&&lookGuide.gameObject.activeSelf!=loop)lookGuide.gameObject.SetActive(loop);
            if(loop)
            {
                // hand rides the infinity curve, like the reference "drag the screen" guide
                Vector2 centre;if(!RectTransformUtility.ScreenPointToLocalPointInRectangle(guidanceRect,new Vector2(view.pixelWidth*.5f,view.pixelHeight*.6f),ui,out centre))return;
                if(lookGuide!=null)lookGuide.anchoredPosition=centre;
                float a=Time.unscaledTime*2.7f;Vector2 p=centre+new Vector2(lookGuideRadius.x*Mathf.Sin(a),lookGuideRadius.y*Mathf.Sin(2f*a));
                if(!hand.gameObject.activeSelf)hand.gameObject.SetActive(true);
                hand.anchoredPosition=p+new Vector2(40,-48);hand.localScale=Vector3.one;hand.localEulerAngles=new Vector3(0,0,-8f);return;
            }
            if(hand.gameObject.activeSelf!=show)hand.gameObject.SetActive(show);if(!show)return;
            Vector2 local;
            if(RectTransformUtility.ScreenPointToLocalPointInRectangle(guidanceRect,screen,ui,out local))
            {
                float cycle=(Time.unscaledTime*.9f)%1f;float k=press&&cycle<.25f?Mathf.Sin(cycle/.25f*Mathf.PI):0f;
                hand.anchoredPosition=local+new Vector2(Mathf.Lerp(58,26,k),Mathf.Lerp(-54,-22,k));hand.localScale=Vector3.one*Mathf.Lerp(1f,.82f,k);hand.localEulerAngles=new Vector3(0,0,Mathf.Lerp(-14f,2f,k));
            }
        }
        // yOffset = fraction of the button height above (+) / below (-) its centre where the finger tip lands.
        private static bool UiPoint(Button button,Camera ui,out Vector2 screen,float yOffset=.22f)
        {
            screen=Vector2.zero;if(button==null||!button.gameObject.activeInHierarchy)return false;var rt=button.transform as RectTransform;
            screen=RectTransformUtility.WorldToScreenPoint(ui,rt.TransformPoint(rt.rect.center+new Vector2(0,rt.rect.height*yOffset)));return true;
        }
        // Per-frame HUD state: prompt, trash visibility + pulse, BUILD lock, rotate button.
        private void RefreshHud()
        {
            bool playing=!endOverlayArmed;
            if(player!=null&&player.movePad!=null)player.movePad.demo=playing&&stage==LivingStage.Move&&removedOnce&&!deleteMode; // joystick pulls itself up, no hand
            if(trashButton!=null){bool on=playing&&placed.Count>0;if(trashButton.gameObject.activeSelf!=on)trashButton.gameObject.SetActive(on);}
            if(trashImage!=null)trashImage.color=deleteMode?Color.Lerp(trashActive,Color.white,.25f+.2f*Mathf.Sin(5f*Time.unscaledTime)):trashIdle;
            if(buildButton!=null)buildButton.interactable=!endOverlayArmed&&!deleteMode;
            if(buildFill!=null)buildFill.color=deleteMode?buildLocked:buildNormal;
            if(rotateButton!=null)
            {
                bool on=playing&&!deleteMode&&stage!=LivingStage.SelectItem&&selected>=0&&Remaining(selected)>0&&catalog[selected].item.mount==DecorMount.Floor;
                if(rotateButton.gameObject.activeSelf!=on)rotateButton.gameObject.SetActive(on);
            }
            if(promptText!=null){string text=CurrentPrompt();if(promptText.text!=text)promptText.text=text;}
        }
        private string CurrentPrompt()
        {
            if(endOverlayArmed)return "TAP TO PLAY";
            if(flashText!=null)return flashText;
            if(deleteMode)return deletePrompt;
            if(stage==LivingStage.SelectItem)return builtCount==0?firstPrompt:selectPrompt;
            if(stage==LivingStage.LookAround)return lookPrompt;
            if(stage==LivingStage.PressBuild)return hasPose&&poseValid?buildPrompt:aimPrompt;
            if(hasPose&&!poseValid&&invalidReason!=null)return invalidReason;
            if(stage==LivingStage.Move)return removedOnce?movePrompt:trashPrompt;
            return freePrompt;
        }
        private void UpdateUi()
        {
            if(countText!=null)countText.text="BUILT "+builtCount;
            if(buildLabel!=null)buildLabel.text="BUILD";
            bool open=!endOverlayArmed;
            if(trashButton!=null)trashButton.interactable=open;
            for(int i=0;i<catalog.Length;i++)
            {
                var e=catalog[i];int n=Remaining(i);bool empty=n==0;
                if(e.quantityText!=null)e.quantityText.text="x"+n;
                if(e.button!=null)e.button.interactable=open;
                if(e.frame!=null)e.frame.color=empty?new Color(.23f,.25f,.23f):(i==selected&&!deleteMode)?new Color(1,.82f,.25f):new Color(.48f,.5f,.46f);
                if(e.icon!=null)e.icon.color=empty?new Color(.38f,.38f,.38f):Color.white;
                if(e.emptyBadge!=null)e.emptyBadge.SetActive(empty);
            }
            if(promptText!=null)promptText.text=CurrentPrompt();
        }

        // ---------- end + CTA ----------
        // Called by LunaController when time is up or enough items were placed: stop all gameplay input.
        public void Freeze()
        {
            if(endOverlayArmed)return;endOverlayArmed=true;stage=LivingStage.Ended;deleteMode=false;
            for(int i=0;i<ghosts.Length;i++)if(ghosts[i]!=null)ghosts[i].SetActive(false);
            if(deleteMarker!=null)deleteMarker.gameObject.SetActive(false);if(footprintMarker!=null)footprintMarker.gameObject.SetActive(false);if(hand!=null)hand.gameObject.SetActive(false);if(lookGuide!=null)lookGuide.gameObject.SetActive(false);
            if(player!=null&&player.movePad!=null)player.movePad.demo=false;
            onGameEnded.Invoke();UpdateUi();RefreshHud();
        }
        // Play Now button — always visible.
        public void OpenStore()
        {
            if(lastCtaFrame==Time.frameCount)return;lastCtaFrame=Time.frameCount;
            Luna.Unity.Playable.InstallFullGame();
#if UNITY_EDITOR
            Debug.Log("[CEBB] Play Now CTA (Editor preview)");
#endif
            onCtaClicked.Invoke();
        }
        private void OnApplicationPause(bool value){paused=value;}
    }
}
