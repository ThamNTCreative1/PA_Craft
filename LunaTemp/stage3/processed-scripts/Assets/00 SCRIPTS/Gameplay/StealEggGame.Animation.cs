using UnityEngine;

// Characters use one animator layer (playable rule). The original overlay layers (Stealing, OwnedCarry, Combat) are
// baked into full-body clips; two int parameters pick the state through state-to-state transitions timed like the original
// controller (no CrossFade calls in code):
//   Set:    plain / Carry (stolen egg, both hands) / Hold (owned item, right hand) / Fight (bat swing)
//   Motion: Idle / Walk / Run / Jump / Fall (a swing uses Idle or Run legs)
public partial class StealEggGame
{
    public const string AnimSet="Set", AnimMotion="Motion";
    public const int SetPlain=0, SetCarry=1, SetHold=2, SetFight=3;
    public const int MotionIdle=0, MotionWalk=1, MotionRun=2, MotionJump=3, MotionFall=4;
    private static readonly int SetId=Animator.StringToHash(AnimSet), MotionId=Animator.StringToHash(AnimMotion);
    private float playerForward;
    // Legs under the swing, chosen when it starts so running in or out of it does not restart the swing.
    private int fightMotion;

    private static int MotionFor(float forward,bool grounded,float vertical)
    {
        if(!grounded)return vertical>-4?MotionJump:MotionFall;
        return forward>.75f?MotionRun:forward>.15f?MotionWalk:MotionIdle;
    }
    private static void SetAnimatorState(Animator a,int set,int motion)
    {
        if(!a || !a.isActiveAndEnabled || !a.runtimeAnimatorController)return;
        a.SetInteger(SetId,set);a.SetInteger(MotionId,motion);
    }
    private void UpdatePlayerAnimation()
    {
        if(!playerAnimator || IsKnockedDown)return;
        if(FightActive){SetAnimatorState(playerAnimator,SetFight,fightMotion);return;}
        fightMotion=playerForward>.15f?MotionRun:MotionIdle;
        bool grounded=training || !motor || motor.isGrounded;
        int set=IsCarrying?SetCarry:hand!=null && hand.kind!=ItemKind.Bat?SetHold:SetPlain;
        SetAnimatorState(playerAnimator,set,MotionFor(playerForward,grounded,verticalSpeed));
    }
    private void SetNpcAnimation(Actor npc,float forward)
    {
        SetAnimatorState(npc.animator,npc.carried!=null?SetCarry:SetPlain,MotionFor(forward,true,0));
    }
}
