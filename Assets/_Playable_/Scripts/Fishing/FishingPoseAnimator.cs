using UnityEngine;

namespace Playable
{
    /// <summary>
    /// Procedural fishing animation (Luna-safe, no Humanoid clips): after the Animator, aims both arms, leans the spine
    /// and orients the rod per FishingState — wind-up while charging, a fast swing on cast, holding the rod while waiting,
    /// jerky reeling while fighting and lifting the rod on a catch. Directions are in player space (x right, y up, z fwd).
    /// </summary>
    public sealed class FishingPoseAnimator : MonoBehaviour
    {
        [SerializeField] private FishingController _controller;
        [SerializeField] private Transform _player;
        [SerializeField] private Transform _spine;
        [SerializeField] private Transform _rightArm;
        [SerializeField] private Transform _rightArmTip;
        [Tooltip("Grip point of the rod (visible hand); the arm tip bone runs past the hand mesh.")]
        [SerializeField] private Transform _rightHand;
        [SerializeField] private Transform _leftArm;
        [SerializeField] private Transform _leftArmTip;
        [SerializeField] private Transform _rodSocket;
        [SerializeField] private float _blendSpeed = 14f;

        private struct Pose
        {
            public Vector3 rightArm;
            public Vector3 rod;
            public float lean;

            public Pose(Vector3 rightArm, Vector3 rod, float lean)
            {
                this.rightArm = rightArm.normalized;
                this.rod = rod.normalized;
                this.lean = lean;
            }

            public static Pose Lerp(Pose a, Pose b, float t)
            {
                return new Pose(Vector3.Slerp(a.rightArm, b.rightArm, t), Vector3.Slerp(a.rod, b.rod, t), Mathf.Lerp(a.lean, b.lean, t));
            }
        }

        private static readonly Pose Hold = new Pose(new Vector3(0.1f, -0.35f, 0.93f), new Vector3(0.05f, 0.6f, 0.8f), 4f);
        private static readonly Pose WindUp = new Pose(new Vector3(0.15f, 0.95f, -0.25f), new Vector3(0.05f, 0.55f, -0.83f), -12f);
        private static readonly Pose Thrown = new Pose(new Vector3(0.05f, 0f, 1f), new Vector3(0f, 0.25f, 0.97f), 18f);
        private static readonly Pose Reel = new Pose(new Vector3(0.1f, -0.15f, 0.98f), new Vector3(0f, 0.8f, 0.6f), -14f);
        private static readonly Pose Lift = new Pose(new Vector3(0.1f, 0.9f, 0.4f), new Vector3(0f, 0.97f, 0.25f), -6f);

        private Pose _current = Hold;
        private bool _active;
        private Transform[] _bones;
        private Quaternion[] _rest;
        private Quaternion[] _written;

        private void Awake()
        {
            _bones = new[] { _spine, _rightArm, _leftArm };
            _rest = new Quaternion[_bones.Length];
            _written = new Quaternion[_bones.Length];
            for (int i = 0; i < _bones.Length; i++)
                if (_bones[i] != null) _rest[i] = _written[i] = _bones[i].localRotation;
        }

        private void LateUpdate()
        {
            if (_controller == null || _player == null || _rightArm == null || _rightArmTip == null) return;
            // Bones the Animator does not drive keep last frame's offset: put them back to rest so offsets never stack.
            RestoreUndrivenBones();
            FishingState state = _controller.State;
            if (state == FishingState.None)
            {
                _active = false;
                return;
            }

            Pose target = TargetPose(state);
            bool snap = !_active || state == FishingState.Casting;
            _current = snap ? target : Pose.Lerp(_current, target, 1f - Mathf.Exp(-_blendSpeed * Time.deltaTime));
            _active = true;
            Apply(_current);
            for (int i = 0; i < _bones.Length; i++)
                if (_bones[i] != null) _written[i] = _bones[i].localRotation;
        }

        private void RestoreUndrivenBones()
        {
            if (_bones == null) return;
            for (int i = 0; i < _bones.Length; i++)
            {
                Transform b = _bones[i];
                if (b != null && b.localRotation == _written[i]) b.localRotation = _rest[i];
            }
        }

        private Pose TargetPose(FishingState state)
        {
            switch (state)
            {
                case FishingState.Charging:
                    return Pose.Lerp(Hold, WindUp, Mathf.SmoothStep(0f, 1f, _controller.Charge01));
                case FishingState.Casting:
                {
                    float t = Mathf.Clamp01(_controller.StateTime / Mathf.Max(0.05f, _controller.CastDuration));
                    if (t < 0.35f) return Pose.Lerp(WindUp, Thrown, Mathf.SmoothStep(0f, 1f, t / 0.35f));
                    return Pose.Lerp(Thrown, Hold, Mathf.SmoothStep(0f, 1f, (t - 0.35f) / 0.65f));
                }
                case FishingState.Waiting:
                {
                    Pose p = Hold;
                    p.rod = (p.rod + new Vector3(0f, Mathf.Sin(Time.time * 2.2f) * 0.04f, 0f)).normalized;
                    return p;
                }
                case FishingState.Fighting:
                {
                    Pose p = Reel;
                    float jerk = Mathf.Sin(Time.time * 18f) * 0.12f;
                    p.rightArm = (p.rightArm + new Vector3(0f, jerk, 0f)).normalized;
                    p.rod = (p.rod + new Vector3(0f, jerk * 0.6f, -jerk * 0.4f)).normalized;
                    return p;
                }
                case FishingState.Catching:
                    return Lift;
                default:
                    return Hold;
            }
        }

        private void Apply(Pose pose)
        {
            Quaternion space = _player.rotation;
            if (_spine != null)
                _spine.rotation = Quaternion.AngleAxis(pose.lean, _player.right) * _spine.rotation;

            Aim(_rightArm, _rightArmTip, space * pose.rightArm);
            Transform hand = _rightHand != null ? _rightHand : _rightArmTip;

            // The left hand supports the rod just below the right hand.
            if (_leftArm != null && _leftArmTip != null)
            {
                Vector3 grip = hand.position - _player.right * 0.12f - _player.up * 0.05f;
                Aim(_leftArm, _leftArmTip, grip - _leftArm.position);
            }

            if (_rodSocket != null)
            {
                Vector3 rodDir = space * pose.rod;
                Vector3 forward = Vector3.ProjectOnPlane(_player.forward, rodDir);
                if (forward.sqrMagnitude < 0.0001f) forward = Vector3.ProjectOnPlane(-_player.up, rodDir);
                _rodSocket.SetPositionAndRotation(hand.position,Quaternion.LookRotation(forward.normalized, rodDir));
            }
        }

        private static void Aim(Transform bone, Transform tip, Vector3 worldDirection)
        {
            Vector3 current = tip.position - bone.position;
            if (current.sqrMagnitude < 0.000001f || worldDirection.sqrMagnitude < 0.000001f) return;
            bone.rotation = Quaternion.FromToRotation(current, worldDirection) * bone.rotation;
        }
    }
}
