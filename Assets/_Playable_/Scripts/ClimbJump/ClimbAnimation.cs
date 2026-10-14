using UnityEngine;

namespace Playable
{
    public sealed class ClimbAnimation : MonoBehaviour
    {
        [SerializeField] private ClimbPlayer _player;
        [SerializeField] private Animator _animator;
        private const string Forward = "Forward";
        private const string Ground = "OnGround";
        private const string Jump = "Jump";
        private const string JumpLeg = "JumpLeg";
        private const string Climb = "Climb";
        private const string ClimbSpeed = "ClimbSpeed";
        private const string Falling = "Falling";
        private const string Landing = "Landing";
        private bool _wasDropping;
        private float _landingTime;
        private float _forwardValue;
        private float _climbSpeedValue;
        private float _jumpValue;
        private static float SmoothParameter(float current, float target, float duration)
        {
            return Mathf.Lerp(current, target, 1f - Mathf.Exp(-Time.deltaTime / duration));
        }
        private void Update()
        {
            if (_player == null || _animator == null) return;
            float forward = Mathf.InverseLerp(0f, _player.GetMaxSpeed(), _player.GetSpeed());
            bool grounded = _player.IsGrounded();
            // Luna's damped SetFloat overload references an undefined JavaScript variable.
            _forwardValue = SmoothParameter(_forwardValue, forward, 0.12f);
            _animator.SetFloat(Forward, _forwardValue);
            _animator.SetBool(Ground, grounded);
            _animator.SetBool(Climb, _player.IsClimbing);
            float verticalSpeed = _player.GetVelocity().y;
            bool climbPaused = _player.IsClimbing && Mathf.Abs(verticalSpeed) < 0.01f;
            _animator.speed = _player.IsClimbing
                ? (climbPaused ? 0f : Mathf.Clamp(Mathf.Abs(verticalSpeed) / 5f, 0.05f, 3f))
                : 1f;
            // Keep the selected climb clip and pose while stationary on the ladder.
            if (!climbPaused)
                _climbSpeedValue = SmoothParameter(_climbSpeedValue, Mathf.Clamp(verticalSpeed, -1f, 1f), 0.1f);
            _jumpValue = SmoothParameter(_jumpValue, verticalSpeed, 0.1f);
            _animator.SetFloat(ClimbSpeed, _climbSpeedValue);
            _animator.SetFloat(Jump, _jumpValue);
            var state = _animator.GetCurrentAnimatorStateInfo(0);
            float cycle = Mathf.Repeat(state.normalizedTime + 0.2f, 1f);
            if (grounded) _animator.SetFloat(JumpLeg, (cycle < 0.5f ? 0.8f : -0.8f) * forward);
            if (_wasDropping && grounded) _landingTime = 0.35f;
            _landingTime -= Time.deltaTime;
            _animator.SetBool(Falling, _player.IsDropping && !grounded);
            _animator.SetBool(Landing, _landingTime > 0f);
            _wasDropping = _player.IsDropping;
        }
    }
}
