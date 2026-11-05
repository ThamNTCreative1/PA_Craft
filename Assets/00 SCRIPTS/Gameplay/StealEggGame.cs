using System;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UI;

/// <summary>Steal an Egg gameplay ported from the original game; Luna Playworks concerns stay in LunaController.</summary>
public partial class StealEggGame : MonoBehaviour
{
    [Serializable] public class Zone
    {
        public string name;
        public Transform root, guardian;
        public Transform[] nests;
        public GameObject[] eggPrefabs, petPrefabs;
        public PlayableEggRules[] eggRules;
        public BoxCollider bounds;
        public Sprite thumbnail;
        public float attackDistance=3;
        public float guardianSpeed=7;
        [Tooltip("Guardian loops (original SAE_ProtectEggMonster): snoring while it stands still, running while it moves.")]
        public AudioSource sleepSound, runSound;
        [Tooltip("Played by the guardian when it catches a thief (original catchedSound).")]
        public AudioSource catchSound;
        [NonSerialized] public Vector3 guardianHome;
        [NonSerialized] public Quaternion guardianRotation;
        [NonSerialized] public Animator animator;
        [NonSerialized] public GameObject warningMark,sleepingEffect;
        [NonSerialized] public List<Actor> thieves;
        [NonSerialized] public List<Egg> revive;
        [NonSerialized] public Actor target,pending;
        [NonSerialized] public Egg fetching;
        [NonSerialized] public GuardState state;
        [NonSerialized] public float stateAt;
    }
    public enum GuardState { Idle, Wait, Chase, Fetch, Return }
    public enum TutorialStep { Steal, BringHome, Incubate, Hatch, Equip, Train, Done }
    public Zone[] zones;
    public Transform player, home, safePoint;
    [Tooltip("Original RightHandSlot as SAE_Player Variant sets it (under mixamorig:RightHand_end): the bat follows it so the swing turns it.")]
    public Transform rightHandSlot;
    public BoxCollider playerCoopArea;
    public Transform trainingPoint;
    public Camera gameCamera;
    public Animator playerAnimator;
    public PlayableRagdoll ragdoll;
    public Font uiFont;
    public Material guideMaterial;
    public Sprite roundedSprite, circleSprite;
    public Sprite moneyIcon,speedIcon;
    public AudioClip stealSound, deliverSound, hatchSound, caughtSound;
    public GameObject eggBreakEffect;
    public GameObject sourceHud;
    public int capturesForEndCard=3;
    public float moveSpeed=9, incubationSeconds=5;
    public float jumpHeight=2.5f, gravity=25f;
    public float baseMoveSpeed=8,speedPowerMultiplier=.05f,trainingPowerPerTick=10;
    public int startingMoney=100;
    public bool slowMode;
    public double Money {get; private set;}
    public double SpeedPower {get; private set;}
    public TutorialStep Step {get; private set;}
    public bool TutorialCompleted {get{return Step==TutorialStep.Done;}}
    public bool IsCarrying {get{return carried!=null;}}
    // The end card and the IAP popup (both LunaController) stop the game under them.
    public bool EndCardVisible {get{return LunaController.Instance && (LunaController.Instance.EndCardVisible || LunaController.Instance.IAPVisible);}}
    public class Egg
    {
        public Transform transform;
        public Vector3 origin, scale;
        public Quaternion rotation;
        public Zone zone;
        public int variant, nest;
        public float size=1;
        public Actor holder;
        public bool onGround, hidden, gone;
        public bool Available {get{return transform && !gone && !hidden && holder==null;}}
    }
    public class Actor
    {
        public bool isPlayer;
        public Transform root, model, stealSlot;
        public Animator animator;
        public Egg carried;
        public float speed;
        public int house, state;
        public float until, deadline, downUntil, downTotal;
        public Vector3 dest, downDirection, modelPosition;
        public Quaternion modelRotation;
        public Egg targetEgg;
        public bool Down {get{return downUntil>0;}}
    }
    private readonly List<Egg> eggs=new List<Egg>();
    private readonly Actor playerActor=new Actor();
    private Egg carried {get{return playerActor.carried;} set{playerActor.carried=value;}}
    private Egg nearby;
    public bool IsKnockedDown {get{return hitZone!=null || hitByBat;}}
    public float hitWindup=.25f, knockdownDuration=1.6f, getUpDuration=.5f;
    private Zone hitZone;
    private bool hitByBat;
    private float hitClock;
    private bool hitApplied;
    private Vector3 hitDirection,modelPosition;
    private Quaternion modelRotation,attackerRotation;
    private CharacterController motor;
    private Transform carryPoint;
    private Transform carryHand;
    private Vector3 spawn;
    private Quaternion spawnRotation;
    private float verticalSpeed,catchCooldown;
    private bool firstInput,training,endCardShown;
    private float trainingClock;
    // Baked into the scene (Luna cannot set colors on a LineRenderer created at runtime).
    public LineRenderer guide;
    [SerializeField] private Button jumpButton;
    [SerializeField] private RectTransform safeUI,hintHand;
    [Tooltip("Scene object (Playable UI/Safe area/Camera hint, child Hand): a hand swiping sideways until the player turns the camera.")]
    [SerializeField] private RectTransform cameraHint;
    [Tooltip("Scene object (child \"Jump hint\" of the jump button, children Hand and Shine): tap hand on the jump button until the first jump.")]
    [SerializeField] private TapHintView jumpHint;
    [Tooltip("Scene text (Playable UI/Safe area/Tutorial text): the instruction for the current hint, then \"Steal An Egg\" (pulsing) until the first egg is stolen.")]
    [SerializeField] private TMPro.TMP_Text tutorialText;
    private bool cameraTurned,jumped,stoleEgg;
    [SerializeField] private PlayableJoystick joystick;
    private AudioSource sound;

    private void Start()
    {
        DisableTriggers();
        spawn=player.position;spawnRotation=player.rotation;
        Money=startingMoney;
        sound=gameObject.AddComponent<AudioSource>();sound.playOnAwake=false;sound.volume=.65f;
        motor=player.GetComponent<CharacterController>();
        if(!motor)motor=player.gameObject.AddComponent<CharacterController>();
        motor.height=2;motor.radius=.4f;motor.center=Vector3.up;
        carryPoint=new GameObject("Carried egg").transform;carryPoint.SetParent(player,false);
        carryPoint.localPosition=new Vector3(0,1.5f,1.1f);
        if(playerAnimator && playerAnimator.isHuman)carryHand=playerAnimator.GetBoneTransform(HumanBodyBones.RightHand);
        // The weapon slot hangs under RightHand_end, which Luna leaves stale: drive it from the hand bone (see BoneFollower).
        if(rightHandSlot && carryHand){rightHandSlot.SetParent(player,true);FollowBone(rightHandSlot,carryHand,player);}
        playerActor.isPlayer=true;playerActor.root=player;playerActor.animator=playerAnimator;playerActor.stealSlot=carryPoint;
        foreach(Zone zone in zones)
        {
            zone.thieves=new List<Actor>();zone.revive=new List<Egg>();zone.state=GuardState.Idle;
            if(!zone.bounds && zone.root)zone.bounds=zone.root.GetComponent<BoxCollider>();
            if(zone.guardian){zone.guardianHome=zone.guardian.position;zone.guardianRotation=zone.guardian.rotation;zone.animator=zone.guardian.GetComponentInChildren<Animator>();}
            foreach(Transform t in zone.guardian.GetComponentsInChildren<Transform>(true))
            {if(t.name=="Exclamation_mark")zone.warningMark=t.gameObject;if(t.name=="[VFX] Sleeping")zone.sleepingEffect=t.gameObject;}
            foreach(TMPro.TMP_Text label in zone.root.GetComponentsInChildren<TMPro.TMP_Text>(true))
                if(label.name=="Text_Speed")label.text=Num(SpeedPowerFor(zone.guardianSpeed));
            for(int n=0;n<zone.nests.Length;n++)SpawnNestEgg(zone,n);
        }
        BindSceneUI();BindOriginalUI();
        StartHome();StartNpcs();StartWorld();StartOutfits();
        SetStep(TutorialStep.Steal);
    }
    // Triggers are only read as volumes here, but Luna's CharacterController collides with them (the safe line became a wall),
    // so keep their world bounds and switch them off. (Mesh colliders that Luna raycasts badly are baked to boxes.)
    private readonly Dictionary<Collider,Bounds> triggerBounds=new Dictionary<Collider,Bounds>();
    private void DisableTriggers()
    {
        foreach(GameObject root in gameObject.scene.GetRootGameObjects())
            foreach(Collider c in root.GetComponentsInChildren<Collider>(true))
            {
                if(!c.isTrigger)continue;
                // A copy: Luna's Bounds is a reference type and collider bounds are live objects.
                if(c.enabled && c.gameObject.activeInHierarchy)triggerBounds[c]=new Bounds(c.bounds.center,c.bounds.size);
                c.enabled=false;
            }
    }
    private void PlaySound(AudioClip clip,float volume=1){if(sound && clip)sound.PlayOneShot(clip,volume);}
    // Original SAE_FootStep on the player: one step each time 0.5 * min(speed, 30) units have been covered while walking.
    private float stepLeft=1, walked;
    private void UpdateFootsteps(float speed)
    {
        if(speed<=.01f){stepLeft=1;return;}
        stepLeft-=Mathf.Clamp(speed,0,30)*Time.deltaTime*.5f;
        if(stepLeft<=0){stepLeft=1;PlaySound(footstepSound,.8f);}
    }
    private static void SetLoop(AudioSource source,bool on)
    {
        if(!source)return;
        if(on && !source.isPlaying)source.Play();
        else if(!on && source.isPlaying)source.Stop();
    }
    private bool Blocked {get{return EndCardVisible || InputBlocked;}}
    public bool IsInputBlocked {get{return Blocked;}}
    public void NotifyCameraTurned(){cameraTurned=true;}
    private void Update()
    {
        if(!player || Time.timeScale==0)return;
        UpdateSafeArea();
        moveSpeed=slowMode?baseMoveSpeed:WalkSpeed(SpeedPower);playerActor.speed=moveSpeed;
        if(!Blocked)
        {
            if(IsKnockedDown)UpdateKnockdown();else if(training)UpdateTraining();else MovePlayer();
            if(Input.GetKeyDown(KeyCode.E))PressPrimaryAction();if(Input.GetKeyDown(KeyCode.Q))DropEgg();if(Input.GetKeyDown(KeyCode.F))Attack();
        }
        else
        {
            playerForward=0;
            // A popup over the joystick never sends its pointer up: drop the held input.
            if(EndCardVisible)joystick.ResetInput();
        }
        UpdatePlayerAnimation();
        UpdateInteraction();
        UpdateGuardians();UpdateNpcs();UpdateHome();UpdateWorld();UpdateCombat();UpdateGuide();UpdateHud();UpdateTutorialHints();
    }
    private void LateUpdate()
    {
        if(!player || Time.timeScale==0)return;
        UpdateBoneFollowers();UpdateHandVisual();
        LateUpdateUI();
    }
    private void MovePlayer()
    {
        if(Input.GetKeyDown(KeyCode.Space))Jump();
        Vector2 input=Vector2.ClampMagnitude(joystick.Value+new Vector2(Input.GetAxisRaw("Horizontal"),Input.GetAxisRaw("Vertical")),1);
        if(input.sqrMagnitude>.01f && !firstInput){firstInput=true;}
        Vector3 forward=gameCamera.transform.forward;forward.y=0;forward.Normalize();
        Vector3 right=gameCamera.transform.right;right.y=0;right.Normalize();
        Vector3 direction=forward*input.y+right*input.x;
        if(direction.sqrMagnitude>.01f)player.rotation=Quaternion.Slerp(player.rotation,Quaternion.LookRotation(direction),Time.deltaTime*14);
        if(motor.isGrounded && verticalSpeed<0)verticalSpeed=-2;
        verticalSpeed-=gravity*Time.deltaTime;
        // Ceiling check from the actual rise: Luna numbers CollisionFlags 0..3 (Below=3), so "& Above" held on the ground
        // and cancelled every jump on its first frame.
        Vector3 startPosition=player.position;float startY=startPosition.y;
        motor.Move((direction*moveSpeed+Vector3.up*verticalSpeed)*Time.deltaTime);
        if(verticalSpeed>0 && player.position.y-startY<verticalSpeed*Time.deltaTime*.5f)verticalSpeed=0;
        if(player.position.y< -12)Respawn();
        playerForward=input.magnitude;
        UpdateFootsteps(motor.isGrounded?direction.magnitude*moveSpeed:0);
        // Distance actually walked (horizontal), for LunaController's IAP popup.
        Vector3 step=player.position-startPosition;step.y=0;
        if(step.sqrMagnitude>0){walked+=step.magnitude;if(LunaController.Instance)LunaController.Instance.PlayerWalked(walked);}
    }
    public void Jump()
    {
        if(IsKnockedDown || training || Blocked)return;
        if(!motor || !motor.enabled || !motor.isGrounded || verticalSpeed>0)return;
        verticalSpeed=Mathf.Sqrt(2*Mathf.Max(.01f,gravity)*Mathf.Max(.1f,jumpHeight));jumped=true;
    }
    public float WalkSpeed(double power){return baseMoveSpeed+Mathf.Sqrt((float)power)*speedPowerMultiplier;}
    public double SpeedPowerFor(float speed){if(speed<=baseMoveSpeed)return 0;return Math.Pow((speed-baseMoveSpeed)/speedPowerMultiplier,2);}
    public void AddMoney(double amount){Money+=amount;}
    public void AddSpeedPower(double amount){SpeedPower+=amount;PulseSpeedIcon();}
    private bool SpendMoney(double price)
    {
        if(Money<price){ShowDialog("You do not have enough moneys");return false;}
        Money-=price;return true;
    }

    // ---- Eggs in the zones ----
    private void SpawnNestEgg(Zone zone,int n)
    {
        if(zone.eggPrefabs.Length==0)return;
        int variant=RollEgg(zone);
        GameObject obj=Instantiate(zone.eggPrefabs[variant],zone.nests[n].position,Quaternion.Euler(0,UnityEngine.Random.Range(0,180),0));
        obj.name=zone.name+" Egg "+(n+1);DisablePhysics(obj);
        Egg egg=new Egg();egg.transform=obj.transform;egg.origin=obj.transform.position;egg.rotation=obj.transform.rotation;egg.zone=zone;egg.variant=variant;egg.nest=n;
        PlayableEggRules rule=Rule(zone,variant);egg.size=rule!=null?rule.RollSize():1;obj.transform.localScale=Vector3.one*Mathf.Clamp(egg.size/5,1,6);
        egg.scale=obj.transform.localScale;eggs.Add(egg);
    }
    private void ResetZoneEggs()
    {
        for(int i=eggs.Count-1;i>=0;i--)
        {
            Egg egg=eggs[i];
            if(egg.holder!=null){if(egg.holder==playerActor)ClearStolenEggUI();egg.holder.carried=null;egg.holder=null;}
            if(egg.transform)Destroy(egg.transform.gameObject);
        }
        eggs.Clear();
        foreach(Zone zone in zones)
        {
            zone.thieves.Clear();zone.revive.Clear();zone.target=zone.pending=null;zone.fetching=null;zone.state=GuardState.Idle;
            if(zone.guardian){zone.guardian.position=zone.guardianHome;zone.guardian.rotation=zone.guardianRotation;}
            for(int n=0;n<zone.nests.Length;n++)SpawnNestEgg(zone,n);
        }
    }
    private float EggWeight(Egg egg){PlayableEggRules rule=egg!=null?Rule(egg.zone,egg.variant):null;return rule!=null?rule.incubationTime:10;}
    private bool InZone(Zone zone,Vector3 point)
    {
        if(!zone.bounds)return false;
        Vector3 local=zone.bounds.transform.InverseTransformPoint(point)-zone.bounds.center,half=zone.bounds.size*.5f;
        return Mathf.Abs(local.x)<=half.x && Mathf.Abs(local.z)<=half.z;
    }
    private void TakeEgg(Actor thief,Egg egg)
    {
        thief.carried=egg;egg.holder=thief;egg.onGround=false;
        egg.transform.SetParent(thief.stealSlot,false);egg.transform.localPosition=Vector3.zero;egg.transform.localRotation=Quaternion.identity;
        Zone zone=egg.zone;if(!zone.thieves.Contains(thief))zone.thieves.Add(thief);
        RetargetGuardian(zone,.75f);
        if(thief.isPlayer)
        {
            UnequipHand();ShowWarning(true);PlaySound(stealSound,.7f);stoleEgg=true;
            if(Step==TutorialStep.Steal)SetStep(TutorialStep.BringHome);
        }
    }
    // The thief lets go of the egg (manual drop, bat hit, guardian catch or night reset).
    private void ReleaseEgg(Actor thief,bool hideForRevive)
    {
        Egg egg=thief.carried;if(egg==null)return;
        thief.carried=null;egg.holder=null;egg.transform.SetParent(null);
        if(thief.isPlayer){ClearStolenEggUI();if(Step==TutorialStep.BringHome)SetStep(TutorialStep.Steal);}
        Zone zone=egg.zone;zone.thieves.Remove(thief);
        if(hideForRevive){HideForRevive(egg);RetargetGuardian(zone,.75f);return;}
        // A dropped egg (manual drop, bat hit) lands in front of the thief; the guardian leaves the thieves, walks to it,
        // picks it up (it disappears) and puts it back in its nest once home (UpdateGuardians).
        Vector3 point=thief.root.position+thief.root.forward*1.2f;RaycastHit hit;
        if(Physics.Raycast(point+Vector3.up*2,Vector3.down,out hit,10,~0,QueryTriggerInteraction.Ignore) && !hit.transform.IsChildOf(thief.root))point.y=hit.point.y;
        else point.y=thief.root.position.y;
        egg.transform.position=point;egg.transform.rotation=egg.rotation;egg.transform.localScale=egg.scale;
        egg.onGround=true;
        FetchNext(zone);
    }
    // The guardian fetches the next dropped egg of its zone, if any, before chasing again.
    private void FetchNext(Zone zone)
    {
        Egg next=null;float best=float.MaxValue;
        foreach(Egg e in eggs)
        {
            if(e.zone!=zone || !e.onGround || e.holder!=null || e.hidden)continue;
            float d=FlatDistance(zone.guardian.position,e.transform.position);if(d<best){best=d;next=e;}
        }
        if(next==null){zone.fetching=null;zone.state=GuardState.Return;RetargetGuardian(zone,0);return;}
        zone.fetching=next;zone.target=zone.pending=null;zone.state=GuardState.Fetch;
    }
    private static void ReturnToNest(Egg egg)
    {
        egg.hidden=false;egg.onGround=false;
        egg.transform.SetParent(null);egg.transform.position=egg.origin;egg.transform.rotation=egg.rotation;egg.transform.localScale=egg.scale;
        egg.transform.gameObject.SetActive(true);
    }
    private void HideForRevive(Egg egg){egg.hidden=true;egg.onGround=false;egg.transform.gameObject.SetActive(false);if(!egg.zone.revive.Contains(egg))egg.zone.revive.Add(egg);}
    // The egg crossed the safe line: it leaves the zone for good.
    private void LoseEgg(Actor thief)
    {
        Egg egg=thief.carried;if(egg==null)return;
        thief.carried=null;egg.holder=null;egg.gone=true;
        Zone zone=egg.zone;zone.thieves.Remove(thief);eggs.Remove(egg);
        if(egg.transform)Destroy(egg.transform.gameObject);
        RetargetGuardian(zone,1);
    }
    public void DropEgg()
    {
        if(!IsCarrying || Blocked)return;
        ReleaseEgg(playerActor,false);
    }
    private void GatherEgg()
    {
        Egg egg=carried;
        Item item=new Item();item.kind=ItemKind.Egg;item.zone=egg.zone;item.variant=egg.variant;item.size=egg.size;
        LoseEgg(playerActor);ClearStolenEggUI();
        AddItem(item,true);PlaySound(deliverSound);
        if(Step==TutorialStep.BringHome)SetStep(TutorialStep.Incubate);
    }
    private void ClearStolenEggUI(){ShowWarning(false);}

    // ---- Guardians ----
    private void RetargetGuardian(Zone zone,float delay)
    {
        Actor best=null;float weight=-1;
        foreach(Actor thief in zone.thieves){float w=EggWeight(thief.carried);if(w>weight){weight=w;best=thief;}}
        // A dropped egg comes first: the guardian picks it up before chasing anyone (FetchNext retargets after).
        if(zone.state==GuardState.Fetch)return;
        if(best==null){zone.target=zone.pending=null;zone.state=GuardState.Return;return;}
        zone.pending=best;zone.target=null;zone.stateAt=Time.time+delay;zone.state=GuardState.Wait;
    }
    private void UpdateGuardians()
    {
        foreach(Zone zone in zones)
        {
            if(!zone.guardian || hitZone==zone)continue;
            float maxSpeed=zone.guardianSpeed;Vector3 destination=zone.guardianHome;float speed=0;
            if(zone.state==GuardState.Wait && Time.time>=zone.stateAt)
            {
                if(zone.pending!=null && zone.thieves.Contains(zone.pending)){zone.target=zone.pending;zone.state=GuardState.Chase;}
                else RetargetGuardian(zone,0);
            }
            if(zone.state==GuardState.Chase)
            {
                Actor target=zone.target;
                if(target==null || target.carried==null || target.carried.zone!=zone || target.Down){RetargetGuardian(zone,.75f);continue;}
                destination=target.root.position;
                float distance=FlatDistance(zone.guardian.position,destination);
                speed=target.speed<maxSpeed || distance>zone.attackDistance*2.83f?maxSpeed*2:target.speed;
                if(distance<=zone.attackDistance && Time.time>catchCooldown){CatchThief(zone,target);continue;}
            }
            else if(zone.state==GuardState.Fetch)
            {
                Egg egg=zone.fetching;
                if(egg==null || !egg.onGround || egg.holder!=null){EndFetch(zone);continue;}
                destination=egg.transform.position;speed=maxSpeed*2;
                if(FlatDistance(zone.guardian.position,destination)<=1){HideForRevive(egg);EndFetch(zone);continue;}
            }
            else if(zone.state==GuardState.Return)
            {
                speed=maxSpeed*4;
                if(FlatDistance(zone.guardian.position,zone.guardianHome)<=.3f)
                {
                    zone.guardian.position=zone.guardianHome;zone.guardian.rotation=zone.guardianRotation;zone.state=GuardState.Idle;
                    foreach(Egg egg in zone.revive)if(egg.transform)ReturnToNest(egg);
                    zone.revive.Clear();speed=0;
                }
            }
            destination.y=zone.guardian.position.y;
            if(speed>0 && FlatDistance(zone.guardian.position,destination)>.05f)
            {
                zone.guardian.rotation=Quaternion.Slerp(zone.guardian.rotation,Quaternion.LookRotation(destination-zone.guardian.position),Time.deltaTime*6);
                zone.guardian.position=Vector3.MoveTowards(zone.guardian.position,destination,speed*Time.deltaTime);
            }
            else speed=0;
            if(zone.warningMark)zone.warningMark.SetActive(zone.state==GuardState.Chase);
            if(zone.sleepingEffect)zone.sleepingEffect.SetActive(zone.state==GuardState.Idle);
            if(zone.animator)SetAnimatorMovement(zone.animator,speed>0?Mathf.Clamp(speed/Mathf.Max(1,maxSpeed),.5f,4):0);
            SetLoop(zone.sleepSound,speed<=0);SetLoop(zone.runSound,speed>0);
        }
    }
    // After fetching (or losing) a dropped egg: chase the next thief, otherwise walk home.
    private void EndFetch(Zone zone){FetchNext(zone);}
    private void CatchThief(Zone zone,Actor thief)
    {
        bool revive=InZone(zone,thief.carried.transform.position) || !TutorialCompleted;
        Vector3 direction=thief.root.position-zone.guardian.position;direction.y=0;
        if(direction.sqrMagnitude<.01f)direction=zone.guardian.forward;
        Vector3 force=direction.normalized*Mathf.Clamp(zone.guardianSpeed,1,30)*50;
        ReleaseEgg(thief,revive);
        if(zone.catchSound)zone.catchSound.Play();
        // Original: only the player has a death sound.
        if(thief.isPlayer){BeginKnockdown(zone,force);PlaySound(caughtSound);}else KnockNpc(thief,force);
    }

    // ---- Player knockdown ----
    private void BeginKnockdown(Zone zone,Vector3 force)
    {
        hitZone=zone;hitByBat=false;hitClock=0;hitApplied=false;training=false;joystick.ResetInput();
        hitDirection=force;hitDirection.y=0;hitDirection.Normalize();
        zone.guardian.rotation=Quaternion.LookRotation(hitDirection);attackerRotation=zone.guardian.rotation;
        if(playerAnimator){modelPosition=playerAnimator.transform.localPosition;modelRotation=playerAnimator.transform.localRotation;}playerForward=0;
        playerActor.downUntil=1;
    }
    private void UpdateKnockdown()
    {
        hitClock+=Time.deltaTime;
        // The source guardian only has locomotion clips: use a short strike lean for the attack.
        float strike=Mathf.Sin(Mathf.Clamp01(hitClock/(hitWindup+.2f))*Mathf.PI)*24;
        if(hitZone!=null)hitZone.guardian.rotation=attackerRotation*Quaternion.Euler(strike,0,0);
        if(hitClock<hitWindup)return;
        if(!hitApplied)
        {
            hitApplied=true;
            if(ragdoll){motor.enabled=false;ragdoll.Begin(hitDirection*Mathf.Clamp(hitZone!=null?hitZone.guardianSpeed:6,1,30)*50);}
            if(playerAnimator)playerAnimator.enabled=false;
            verticalSpeed=3;
        }
        float elapsed=hitClock-hitWindup;
        if(ragdoll)
        {
            ragdoll.Follow();
            if(elapsed>=knockdownDuration){ragdoll.Recover();motor.enabled=true;EndKnockdown();}
            return;
        }
        float rise=Mathf.Clamp01((elapsed-knockdownDuration)/getUpDuration);
        float fall=Mathf.Clamp01(elapsed/.25f)*(1-rise);
        if(playerAnimator)
        {
            Vector3 localDirection=player.InverseTransformDirection(hitDirection);
            Vector3 axis=Vector3.Cross(Vector3.up,localDirection);
            playerAnimator.transform.localRotation=Quaternion.AngleAxis(85*fall,axis)*modelRotation;
            playerAnimator.transform.localPosition=modelPosition+Vector3.up*(.3f*fall);
        }
        if(motor.isGrounded && verticalSpeed<0)verticalSpeed=-2;
        verticalSpeed-=20*Time.deltaTime;
        motor.Move((hitDirection*(elapsed<.4f?5*(1-elapsed/.4f):0)+Vector3.up*verticalSpeed)*Time.deltaTime);
        if(rise>=1)
        {
            if(playerAnimator){playerAnimator.transform.localPosition=modelPosition;playerAnimator.transform.localRotation=modelRotation;playerAnimator.enabled=true;}
            EndKnockdown();
        }
    }
    private void EndKnockdown()
    {
        if(hitZone!=null)hitZone.guardian.rotation=attackerRotation;
        hitZone=null;hitByBat=false;playerActor.downUntil=0;catchCooldown=Time.time+2;verticalSpeed=0;
        // Preserve player position: recovering from a hit never teleports to spawn.
    }
    private void Respawn(){motor.enabled=false;player.position=spawn;player.rotation=spawnRotation;motor.enabled=true;verticalSpeed=0;if(IsCarrying)ReleaseEgg(playerActor,true);}
    private void TeleportPlayer(Vector3 point){motor.enabled=false;player.position=point;motor.enabled=true;verticalSpeed=0;}

    // ---- Tutorial (original: guide line only, gated features) ----
    private void SetStep(TutorialStep step)
    {
        bool completing=step==TutorialStep.Done && Step!=TutorialStep.Done;
        Step=step;
        if(completing)
        {
            Item bat=new Item();bat.kind=ItemKind.Bat;AddItem(bat,true);
            ShowReward("Tutorial Completed",new Sprite[]{batIcon},new string[]{"1"});
        }
    }
    private void UpdateGuide()
    {
        Vector3 target=player.position;bool show=!TutorialCompleted && !IsKnockedDown && !Blocked;
        if(Step==TutorialStep.Steal)
        {
            Egg first=null;
            foreach(Egg egg in eggs)if(egg.zone==zones[0] && egg.Available){first=egg;break;}
            if(first!=null)target=first.transform.position;else show=false;
        }
        // Lead past the safe line (the egg only counts once it is crossed) towards the player's coop.
        else if(Step==TutorialStep.BringHome)target=CoopCenter;
        else if(Step==TutorialStep.Incubate)target=CoopCenter;
        else if(Step==TutorialStep.Hatch)target=incubators.Count>0 && incubators[0].obj?incubators[0].obj.position:CoopCenter;
        else if(Step==TutorialStep.Equip)target=CoopCenter;
        else if(Step==TutorialStep.Train)target=MyHouse.TrainSlot.position;
        guide.enabled=show;
        guide.SetPosition(0,player.position+Vector3.up*.1f);guide.SetPosition(1,new Vector3(target.x,player.position.y+.1f,target.z));
    }

    // ---- Helpers ----
    private static float FlatDistance(Vector3 a,Vector3 b){a.y=0;b.y=0;return Vector3.Distance(a,b);}
    private PlayableEggRules Rule(Zone zone,int variant){return zone.eggRules!=null && variant<zone.eggRules.Length?zone.eggRules[variant]:null;}
    private int RollEgg(Zone zone)
    {
        if(zone.eggRules==null || zone.eggRules.Length==0)return UnityEngine.Random.Range(0,zone.eggPrefabs.Length);
        float[] weights=new float[zone.eggRules.Length];for(int i=0;i<weights.Length;i++)weights[i]=zone.eggRules[i].spawnWeight;
        return PlayableEggRules.Pick(weights,weights.Length);
    }
    public static string Num(double value)
    {
        string[] suffix={"","K","M","B","T","Qa","Qi","Sx"};int i=0;
        while(Math.Abs(value)>=1000 && i<suffix.Length-1){value/=1000;i++;}
        return Math.Round(value,1).ToString("0.#")+suffix[i];
    }
    public static string Clock(float seconds)
    {
        int s=Mathf.Max(0,Mathf.CeilToInt(seconds)),h=s/3600,m=s%3600/60;s%=60;
        if(h>0)return h+"h:"+m+"m";if(m>0)return m+"m:"+s+"s";return s+"s";
    }
    public static void DisablePhysics(GameObject obj)
    {
        foreach(Collider c in obj.GetComponentsInChildren<Collider>(true))c.enabled=false;
        foreach(Rigidbody body in obj.GetComponentsInChildren<Rigidbody>(true)){body.isKinematic=true;body.useGravity=false;}
        foreach(Transform t in obj.GetComponentsInChildren<Transform>(true))if(t.name.ToLowerInvariant().Contains("highlight"))t.gameObject.SetActive(false);
        foreach(TMPro.TMP_Text label in obj.GetComponentsInChildren<TMPro.TMP_Text>(true))label.gameObject.SetActive(false);
    }
    public static void SetVisualSize(GameObject obj,float height)
    {
        bool found=false;Bounds bounds=new Bounds();
        foreach(Renderer r in obj.GetComponentsInChildren<Renderer>())if(!(r is ParticleSystemRenderer) && !(r is LineRenderer))
        {if(!found){bounds=new Bounds(r.bounds.center,r.bounds.size);found=true;}else bounds.Encapsulate(r.bounds);}
        if(found && bounds.size.y>.01f)obj.transform.localScale*=height/bounds.size.y;
    }
    // Guardians and pets share the monster controllers, whose only parameter is "Forward". (Luna returns an empty
    // Animator.parameters, so the parameters are not looked up at runtime.)
    private static void SetAnimatorMovement(Animator a,float value)
    {
        if(a && a.isActiveAndEnabled && a.runtimeAnimatorController)a.SetFloat("Forward",value);
    }
    private static float TopOf(Transform t)
    {
        float top=t.position.y;
        foreach(Renderer r in t.GetComponentsInChildren<Renderer>())if(r.enabled && !(r is ParticleSystemRenderer) && !(r is LineRenderer))top=Mathf.Max(top,r.bounds.max.y);
        return top;
    }
    private static bool InsideBox(BoxCollider box,Vector3 point,float margin)
    {
        if(!box)return false;
        Vector3 local=box.transform.InverseTransformPoint(point)-box.center;
        Vector3 half=Vector3.Scale(box.size*.5f,Vector3.one);
        return Mathf.Abs(local.x)<half.x-margin && Mathf.Abs(local.z)<half.z-margin && Mathf.Abs(local.y)<=half.y+.2f;
    }
    private void UpdateSafeArea(){if(!safeUI || Screen.width==0 || Screen.height==0)return;UnityEngine.Rect s=Screen.safeArea;safeUI.anchorMin=new Vector2(s.xMin/Screen.width,s.yMin/Screen.height);safeUI.anchorMax=new Vector2(s.xMax/Screen.width,s.yMax/Screen.height);}
    private void BindSceneUI()
    {
        if(!safeUI || !joystick)
            throw new InvalidOperationException("Scene UI is missing. Bake the UI in the Unity Editor before playing.");
        if(jumpButton)BindSceneButton(jumpButton.transform,Jump);
        UpdateSafeArea();
    }
    private void BindSceneButton(Transform target,UnityEngine.Events.UnityAction action)
    {
        if(!target)return;
        Button button=target.GetComponent<Button>();
        if(!button)throw new InvalidOperationException("Missing scene Button: "+target.name);
        button.onClick.RemoveAllListeners();
        button.onClick.AddListener(action);
    }
}
