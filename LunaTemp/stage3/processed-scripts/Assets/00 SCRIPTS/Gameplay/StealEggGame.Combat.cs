using UnityEngine;

// Original SAE_CharacterCombat: the Ballbat (tutorial reward) knocks stealers down inside the zone corridor.
public partial class StealEggGame
{
    private float attackReadyAt, attackHitAt=-1, attackHitEnd, swingStart=-1, fightStart=-1;
    // Action_fight (1.83 s) at the original state speed 1.5, played to the end (transitions are instant:
    // with the original 0.25 s blend-out it would hand back at 90%, the original Fight -> Exit time).
    private const float FightDuration=1.22f;

    public void Attack()
    {
        if(hand==null || hand.kind!=ItemKind.Bat || IsCarrying || IsKnockedDown || training || Blocked)return;
        if(Time.time<attackReadyAt)return;
        attackReadyAt=Time.time+batCooldown;attackHitAt=Time.time+.3f;attackHitEnd=Time.time+.5f;
        if(playerAnimator && playerAnimator.runtimeAnimatorController){fightStart=Time.time;}
        else swingStart=Time.time;
    }
    // The swing state (FightIdle/FightRun, see StealEggGame.Animation) holds until the original exit time.
    private bool FightActive
    {
        get
        {
            if(fightStart>=0 && Time.time-fightStart>=FightDuration)fightStart=-1;
            return fightStart>=0;
        }
    }
    private void UpdateCombat()
    {
        if(attackHitAt<0 || Time.time<attackHitAt)return;
        Vector3 center=player.position+player.forward*1.2f+Vector3.up;
        foreach(Actor npc in npcs)
        {
            if(npc.Down || Vector3.Distance(center,npc.root.position+Vector3.up)>1.6f)continue;
            if(combatArea && !InsideBox(combatArea,npc.root.position,0))continue;
            Vector3 force=(npc.root.position-player.position+Vector3.up).normalized*batForce;
            if(npc.carried!=null)ReleaseEgg(npc,false);
            KnockNpc(npc,force);
        }
        if(Time.time>=attackHitEnd)attackHitAt=-1;
    }
    // Fallback swing when the animator has no "Fight" trigger.
    private void ApplyBatSwing()
    {
        if(swingStart<0 || !carryPoint)return;
        float t=(Time.time-swingStart)/.5f;
        if(t>=1){swingStart=-1;return;}
        carryPoint.rotation=carryPoint.rotation*Quaternion.Euler(-110*Mathf.Sin(t*Mathf.PI),0,0);
    }
}
