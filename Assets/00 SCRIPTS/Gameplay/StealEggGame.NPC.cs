using System.Collections.Generic;
using UnityEngine;

// Original SAE_CharacterNPC + AIBrain: rest, wander, train at home and steal eggs from zones they can outrun.
public partial class StealEggGame
{
    private const int NpcRest=0, NpcWander=1, NpcGoTrain=2, NpcTrain=3, NpcGoEgg=4, NpcTakeEgg=5, NpcGoHome=6;
    private readonly List<Actor> npcs=new List<Actor>();

    private void StartNpcs()
    {
        if(npcModels==null)return;
        for(int i=0;i<npcModels.Length;i++)
        {
            Transform root=npcModels[i];if(!root)continue;
            Actor npc=new Actor();npc.root=root;npc.animator=root.GetComponentInChildren<Animator>();npc.model=npc.animator?npc.animator.transform:root;
            npc.house=Mathf.Clamp(i+1,0,houses.Length-1);npc.speed=Random.Range(npcMinSpeed,npcMaxSpeed);
            npc.stealSlot=new GameObject("Steal slot").transform;npc.stealSlot.SetParent(root,false);npc.stealSlot.localPosition=new Vector3(0,1.5f,1.1f);
            Transform house=houses[npc.house].root;
            root.position=GroundAt(house.position+house.forward*3);root.rotation=house.rotation;
            if(trails!=null && trails.Length>0)
            {
                TrailInfo trail=trails[Random.Range(0,trails.Length)];
                if(trail.prefab){GameObject t=Instantiate(trail.prefab,root,false);t.transform.localPosition=Vector3.up*.2f;}
            }
            npc.state=NpcRest;npc.until=Time.time+Random.Range(2f,6f);
            npcs.Add(npc);
        }
    }
    private Vector3 GroundAt(Vector3 point)
    {
        RaycastHit hit;
        if(Physics.Raycast(point+Vector3.up*1.5f,Vector3.down,out hit,8,~0,QueryTriggerInteraction.Ignore))point.y=hit.point.y;
        return point;
    }
    private void UpdateNpcs()
    {
        foreach(Actor npc in npcs)
        {
            if(npc.Down){UpdateNpcDown(npc);continue;}
            switch(npc.state)
            {
                case NpcRest:SetNpcMove(npc,0,1);if(Time.time>=npc.until)ThinkNpc(npc);break;
                case NpcWander:if(MoveNpc(npc,npc.dest,1) || Time.time>=npc.deadline)ThinkNpc(npc);break;
                case NpcGoTrain:
                {
                    Transform slot=houses[npc.house].TrainSlot;
                    if(MoveNpc(npc,slot.position,.3f)){npc.root.position=slot.position;npc.root.rotation=slot.rotation;npc.state=NpcTrain;npc.until=Time.time+Random.Range(10f,20f);}
                    else if(Time.time>=npc.deadline)ThinkNpc(npc);
                    break;
                }
                case NpcTrain:SetNpcMove(npc,1,Mathf.Clamp(npc.speed/baseMoveSpeed,1,10));if(Time.time>=npc.until || Time.time>=npc.deadline)ThinkNpc(npc);break;
                case NpcGoEgg:
                    if(npc.targetEgg==null || !npc.targetEgg.Available || npc.targetEgg.onGround){ThinkNpc(npc);break;}
                    if(MoveNpc(npc,npc.targetEgg.transform.position,.3f)){npc.state=NpcTakeEgg;npc.until=Time.time+.5f;}
                    break;
                case NpcTakeEgg:
                    SetNpcMove(npc,0,1);
                    if(Time.time<npc.until)break;
                    if(npc.targetEgg!=null && npc.targetEgg.Available && !npc.targetEgg.onGround){TakeEgg(npc,npc.targetEgg);npc.state=NpcGoHome;}
                    else ThinkNpc(npc);
                    break;
                case NpcGoHome:
                    if(npc.carried!=null && npc.root.position.z<=safePoint.position.z){LoseEgg(npc);npc.targetEgg=null;}
                    if(npc.carried==null && npc.targetEgg!=null){ThinkNpc(npc);break;}
                    if(MoveNpc(npc,houses[npc.house].root.position,1.5f))ThinkNpc(npc);
                    break;
            }
        }
    }
    private void ThinkNpc(Actor npc)
    {
        npc.targetEgg=null;
        float roll=Random.value;
        if(TutorialCompleted && roll<.09f && TryStartSteal(npc))return;
        if(roll<.15f){npc.state=NpcGoTrain;npc.deadline=Time.time+30;return;}
        if(roll<.4f)
        {
            Vector3 offset=new Vector3(Random.Range(-30f,30f),0,Random.Range(-30f,30f));
            RaycastHit hit;
            if(Physics.Raycast(npc.root.position+offset+Vector3.up,Vector3.down,out hit,2,~0,QueryTriggerInteraction.Ignore))
            {npc.dest=hit.point;npc.state=NpcWander;npc.deadline=Time.time+10;return;}
        }
        npc.state=NpcRest;npc.until=Time.time+Random.Range(2f,6f);
    }
    private bool TryStartSteal(Actor npc)
    {
        List<Zone> reachable=new List<Zone>();
        foreach(Zone zone in zones)if(zone.guardianSpeed<npc.speed)reachable.Add(zone);
        if(reachable.Count==0)return false;
        Zone target=reachable[Random.Range(0,reachable.Count)];
        List<Egg> available=new List<Egg>();
        foreach(Egg egg in eggs)if(egg.zone==target && egg.Available && !egg.onGround)available.Add(egg);
        if(available.Count==0)return false;
        npc.targetEgg=available[Random.Range(0,available.Count)];npc.state=NpcGoEgg;
        return true;
    }
    private bool MoveNpc(Actor npc,Vector3 target,float stop)
    {
        Vector3 position=npc.root.position,to=target-position;to.y=0;float distance=to.magnitude;
        if(distance<=stop){SetNpcMove(npc,0,1);return true;}
        Vector3 next=position+to/distance*Mathf.Min(distance,npc.speed*Time.deltaTime);
        RaycastHit hit;
        if(Physics.Raycast(next+Vector3.up*1.5f,Vector3.down,out hit,6,~0,QueryTriggerInteraction.Ignore))next.y=hit.point.y;
        npc.root.position=next;npc.root.rotation=Quaternion.Slerp(npc.root.rotation,Quaternion.LookRotation(to),Time.deltaTime*10);
        SetNpcMove(npc,1,Mathf.Clamp(npc.speed/baseMoveSpeed,1,10));
        return false;
    }
    private void SetNpcMove(Actor npc,float forward,float speed)
    {
        SetNpcAnimation(npc,forward);
    }
    // Original OnBeAttacked: knocked over for |force|/100 seconds, then gets up where it fell.
    private void KnockNpc(Actor npc,Vector3 force)
    {
        if(npc.Down)return;
        npc.downTotal=Mathf.Max(.8f,force.magnitude/100);npc.downUntil=Time.time+npc.downTotal;
        npc.downDirection=force;npc.downDirection.y=0;if(npc.downDirection.sqrMagnitude<.01f)npc.downDirection=-npc.root.forward;npc.downDirection.Normalize();
        npc.modelPosition=npc.model.localPosition;npc.modelRotation=npc.model.localRotation;
        npc.targetEgg=null;npc.state=NpcRest;SetNpcMove(npc,0,1);
    }
    private void UpdateNpcDown(Actor npc)
    {
        float elapsed=npc.downTotal-(npc.downUntil-Time.time);
        float rise=Mathf.Clamp01((elapsed-(npc.downTotal-.5f))/.5f);
        float fall=Mathf.Clamp01(elapsed/.25f)*(1-rise);
        Vector3 axis=Vector3.Cross(Vector3.up,npc.root.InverseTransformDirection(npc.downDirection));
        npc.model.localRotation=Quaternion.AngleAxis(85*fall,axis)*npc.modelRotation;
        npc.model.localPosition=npc.modelPosition+Vector3.up*(.3f*fall);
        if(elapsed<.4f)npc.root.position=GroundAt(npc.root.position+npc.downDirection*5*(1-elapsed/.4f)*Time.deltaTime);
        if(Time.time<npc.downUntil)return;
        npc.model.localRotation=npc.modelRotation;npc.model.localPosition=npc.modelPosition;npc.downUntil=0;
        npc.state=NpcRest;npc.until=Time.time+Random.Range(.5f,2f);
    }
    private bool InLobby(Vector3 point)
    {
        if(!lobbyCenter)return true;
        Vector3 c=lobbyCenter.position;
        return point.x>=c.x-lobbySize.x/2 && point.x<=c.x+lobbySize.x/2 && point.z>=c.z-lobbySize.z/2 && point.z<=c.z+lobbySize.z/2;
    }
    private Vector3 LobbyTeleport(){Vector3 p=teleportPoint?teleportPoint.position:spawn;p.x+=Random.Range(-10f,10f);return GroundAt(p);}
    // Night start: everyone outside the lobby is revived and sent back (SAE_CharacterManager.BackToLobbyAllCharacter).
    private void SendEveryoneToLobby()
    {
        foreach(Actor npc in npcs)
        {
            if(npc.Down){npc.model.localRotation=npc.modelRotation;npc.model.localPosition=npc.modelPosition;npc.downUntil=0;}
            if(!InLobby(npc.root.position))npc.root.position=LobbyTeleport();
            npc.targetEgg=null;npc.state=NpcRest;npc.until=Time.time+Random.Range(2f,6f);
        }
        if(!InLobby(player.position))
        {
            if(IsKnockedDown && ragdoll){ragdoll.Recover();motor.enabled=true;}
            if(IsKnockedDown && playerAnimator){playerAnimator.transform.localPosition=modelPosition;playerAnimator.transform.localRotation=modelRotation;playerAnimator.enabled=true;}
            if(IsKnockedDown)EndKnockdown();
            training=false;TeleportPlayer(LobbyTeleport());
        }
    }
}
