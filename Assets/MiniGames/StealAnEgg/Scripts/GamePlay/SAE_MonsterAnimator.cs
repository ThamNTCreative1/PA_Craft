using UnityEngine;

namespace Minigames.StealAnEgg.GamePlay
{
    /// <summary>
    /// Each pet has its own controller with Idle / Walk states holding its clips directly
    /// (no runtime AnimatorOverrideController: Luna strips the overridden base clips).
    /// </summary>
    public class SAE_MonsterAnimator : MonoBehaviour
    {
        private Animator _animator;

        // No Animator parameters: the Idle / Walk states are played directly.
        private const string IdleState = "Idle";
        private const string WalkState = "Walk";
        private const float WalkThreshold = 0.1f;
        private string _currentState;

        private void Awake()
        {
            _animator = GetComponent<Animator>();
        }

        public void UpdateAnimation(float forward)
        {
            if (_animator == null) return;
            string state = forward > WalkThreshold ? WalkState : IdleState;
            if (state == _currentState) return;
            _currentState = state;
            _animator.Play(state, 0, 0f);
        }
    }
}
