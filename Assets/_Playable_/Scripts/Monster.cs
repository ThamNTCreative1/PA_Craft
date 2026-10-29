using System;
using UnityEngine;

namespace Playable
{
    public class Monster : MonoBehaviour
    {
        public enum MonsterState
        {
            Idle,
            Chasing,
            Attacking,
            WaitingToChase,
            Patrolling,
            PatrolResting
        }

        [Header("Movement")] [LunaPlaygroundField("Monster Speed", 2, "Gameplay")] [SerializeField, Min(0f)]
        private float _moveSpeed = 3.5f;

        [SerializeField] private float _rotationSpeed = 10f;
        [SerializeField] private float _attackDistance = 1.5f;
        [SerializeField, Min(0f)] private float _attackContactPadding = .75f;
        private Collider _bodyCollider;
        private Collider _targetCollider;
        [SerializeField, Min(0f)] private float _chaseDelay = 1f;

        [Header("Safe Area")]
        [Tooltip("Stop chasing when the player enters this courtyard's XZ bounds.")]
        [SerializeField] private Renderer _grassCourtyard;

        [Header("Nest Patrol")] [SerializeField]
        private Transform _patrolCenter;
        [SerializeField] private bool _sleepUntilEggTaken = true;

        [Header("Sound")]
        [SerializeField] private AudioSource _voiceSource;
        [SerializeField] private AudioClip _chaseRoar;
        [SerializeField] private AudioClip _biteSound;

        [SerializeField] private Vector2 _patrolRadii = new Vector2(18f, 22f);
        [SerializeField, Min(0f)] private float _patrolSpeed = 8f;
        [SerializeField, Min(0f)] private float _patrolAnimationSpeed = .6f;
        private float _patrolAngle;
        private float _patrolHeight;
        [SerializeField] private Vector2 _patrolWalkDuration = new Vector2(3f, 6f);
        [SerializeField] private Vector2 _patrolRestDuration = new Vector2(1.5f, 3f);
        private float _patrolPhaseRemaining;

        [Header("Animation")] [SerializeField] private Animator _animator;
        [SerializeField] private string _isRunningParam = "IsRun";
        [SerializeField] private string _isWalkingParam = "";
        [SerializeField] private string _idleState = "Idle";
        [SerializeField] private string _sleepState = "Sleep";
        [SerializeField] private float _sleepHeightOffset;
        [SerializeField] private Transform _sleepLookTarget;
        private Vector3 _modelLocalPosition;
        private Quaternion _modelLocalRotation;

        private Transform _target;
        private float _chaseDelayRemaining;
        private int _isRunningHash;
        private bool _hasRunParameter;
        private int _isWalkingHash;
        private bool _hasWalkParameter;

        public MonsterState State { get; private set; } = MonsterState.Idle;
        public float AttackDistance => _attackDistance;
        public event Action OnPlayerReached;

        private void Awake()
        {
            _bodyCollider = GetComponent<Collider>();
            if (_animator == null)
            {
                _animator = GetComponentInChildren<Animator>();
            }

            if (_animator != null)
            {
                // Movement is driven by this controller, not animation root motion.
                _animator.applyRootMotion = false;
                _modelLocalPosition = _animator.transform.localPosition;
                _modelLocalRotation = _animator.transform.localRotation;
            }

            _isRunningHash = Animator.StringToHash(_isRunningParam);
            // Luna returns an empty array for Animator.parameters. Use the configured
            // parameter names instead so animation commands are not silently skipped.
            _hasRunParameter = _animator != null && !string.IsNullOrEmpty(_isRunningParam);
            _hasWalkParameter = _animator != null && !string.IsNullOrEmpty(_isWalkingParam);
            if (_hasWalkParameter) _isWalkingHash = Animator.StringToHash(_isWalkingParam);
        }

        private void Update()
        {
            if ((State == MonsterState.WaitingToChase || State == MonsterState.Chasing) &&
                IsTargetInCourtyard())
            {
                Stop();
                return;
            }

            if (State == MonsterState.PatrolResting)
            {
                _patrolPhaseRemaining -= Time.deltaTime;
                if (_patrolPhaseRemaining <= 0f)
                {
                    State = MonsterState.Patrolling;
                    _patrolPhaseRemaining = RandomDuration(_patrolWalkDuration);
                    SetRunning(_patrolSpeed > 0f);
                }
                return;
            }

            if (State == MonsterState.Patrolling)
            {
                _patrolPhaseRemaining -= Time.deltaTime;
                if (_patrolPhaseRemaining <= 0f)
                {
                    State = MonsterState.PatrolResting;
                    _patrolPhaseRemaining = RandomDuration(_patrolRestDuration);
                    SetRunning(false);
                    return;
                }
                UpdatePatrol(Time.deltaTime);
                return;
            }

            if (State == MonsterState.WaitingToChase)
            {
                if (_target == null)
                {
                    Stop();
                    return;
                }

                _chaseDelayRemaining = Mathf.Max(0f, _chaseDelayRemaining - Time.deltaTime);
                if (_chaseDelayRemaining > 0f) return;

                State = MonsterState.Chasing;
                SetRunning(true);
                PlayVoice(_chaseRoar);
            }

            if (State != MonsterState.Chasing || _target == null)
            {
                return;
            }

            Vector3 targetCenter = _targetCollider != null ? _targetCollider.bounds.center : _target.position;
            Vector3 bodyCenter = _bodyCollider != null ? _bodyCollider.bounds.center : transform.position;
            Vector3 offset = targetCenter - bodyCenter;
            offset.y = 0f;
            // Resolve contact from both collider sizes, including this frame's movement below.
            Vector3 bodyExtents = _bodyCollider != null ? _bodyCollider.bounds.extents : Vector3.zero;
            Vector3 targetExtents = _targetCollider != null ? _targetCollider.bounds.extents : Vector3.zero;
            float bodyRadius = Mathf.Max(bodyExtents.x, bodyExtents.z);
            float targetRadius = Mathf.Max(targetExtents.x, targetExtents.z);
            float contactDistance = Mathf.Max(_attackDistance,
                bodyRadius + targetRadius + _attackContactPadding);
            float distance = offset.magnitude;
            float travel = Mathf.Max(0f, _moveSpeed) * Time.deltaTime;

            // Resolve contact in this frame, including the distance covered by the lunge.
            if (distance <= contactDistance + travel)
            {
                transform.position += offset.normalized * Mathf.Max(0f, distance - contactDistance);
                Attack();
                return;
            }

            Vector3 direction = offset.normalized;
            transform.position += direction * travel;
            transform.rotation = Quaternion.Slerp(
                transform.rotation,
                Quaternion.LookRotation(direction),
                _rotationSpeed * Time.deltaTime);
        }

        private bool IsTargetInCourtyard()
        {
            if (_target == null || _grassCourtyard == null) return false;
            Bounds bounds = _grassCourtyard.bounds;
            Vector3 position = _target.position;
            // Ignore height so jumping into the courtyard also ends the chase.
            return position.x >= bounds.min.x && position.x <= bounds.max.x &&
                   position.z >= bounds.min.z && position.z <= bounds.max.z;
        }

        public void StartChasing(Transform target)
        {
            if (target == null)
            {
                Stop();
                return;
            }

            _target = target;
            _targetCollider = target.GetComponent<Collider>();
            SetSleeping(false);
            _chaseDelayRemaining = Mathf.Max(0f, _chaseDelay);
            State = _chaseDelayRemaining > 0f ? MonsterState.WaitingToChase : MonsterState.Chasing;
            SetRunning(State == MonsterState.Chasing);
            if (State == MonsterState.Chasing) PlayVoice(_chaseRoar);
        }

        public void Stop()
        {
            if (_voiceSource != null) _voiceSource.Stop();
            _patrolPhaseRemaining = 0f;
            _target = null;
            _targetCollider = null;
            _chaseDelayRemaining = 0f;
            State = MonsterState.Idle;
            SetRunning(false);
            SetSleeping(false);
        }

        public void ResetMonster(Vector3 position, Quaternion rotation)
        {
            if (_animator != null && _animator.runtimeAnimatorController != null)
            {
                // Attack may have no outgoing transition; restore the default state and parameters.
                _animator.Rebind();
                if (_animator.isActiveAndEnabled) _animator.Update(0f);
            }

            Stop();
            transform.SetPositionAndRotation(position, rotation);
            StartPatrolling();
        }

        public void StartPatrolling()
        {
            if (_sleepUntilEggTaken)
            {
                Stop();
                SetSleeping(true);
                return;
            }
            if (_patrolCenter == null) return;
            _target = null;
            _patrolHeight = transform.position.y;
            Vector3 offset = transform.position - _patrolCenter.position;
            _patrolAngle = Mathf.Atan2(offset.z / Mathf.Max(.1f, _patrolRadii.y),
                offset.x / Mathf.Max(.1f, _patrolRadii.x));
            State = MonsterState.Patrolling;
            _patrolPhaseRemaining = RandomDuration(_patrolWalkDuration);
            SetRunning(_patrolSpeed > 0f);
        }

        private static float RandomDuration(Vector2 range)
        {
            float minimum = Mathf.Max(.1f, range.x);
            return UnityEngine.Random.Range(minimum, Mathf.Max(minimum, range.y));
        }

        private void UpdatePatrol(float deltaTime)
        {
            if (_patrolCenter == null)
            {
                Stop();
                return;
            }

            float rx = Mathf.Max(.1f, _patrolRadii.x);
            float rz = Mathf.Max(.1f, _patrolRadii.y);
            float sin = Mathf.Sin(_patrolAngle);
            float cos = Mathf.Cos(_patrolAngle);
            float tangentLength = Mathf.Sqrt(rx * rx * sin * sin + rz * rz * cos * cos);
            _patrolAngle = Mathf.Repeat(_patrolAngle + Mathf.Max(0f, _patrolSpeed) * deltaTime /
                Mathf.Max(.1f, tangentLength), Mathf.PI * 2f);
            Vector3 position = _patrolCenter.position +
                               new Vector3(rx * Mathf.Cos(_patrolAngle), 0f, rz * Mathf.Sin(_patrolAngle));
            position.y = _patrolHeight;
            Vector3 direction = position - transform.position;
            transform.position = position;
            if (direction.sqrMagnitude > .0001f)
                transform.rotation = Quaternion.Slerp(transform.rotation,
                    Quaternion.LookRotation(direction), _rotationSpeed * deltaTime);
        }

        private void Attack()
        {
            State = MonsterState.Attacking;
            SetRunning(false);
            PlayVoice(_biteSound);

            SetSleeping(false);

            OnPlayerReached?.Invoke();
        }

        private void SetSleeping(bool sleeping)
        {
            if (_animator == null) return;
            if (sleeping && _sleepLookTarget != null)
            {
                Vector3 direction = _sleepLookTarget.position - transform.position;
                direction.y = 0f;
                if (direction.sqrMagnitude > .0001f)
                    transform.rotation = Quaternion.LookRotation(direction);
            }
            _animator.transform.localPosition = _modelLocalPosition +
                (sleeping ? Vector3.up * _sleepHeightOffset : Vector3.zero);
            _animator.transform.localRotation = sleeping
                ? _modelLocalRotation * Quaternion.Euler(0f, 0f, -90f)
                : _modelLocalRotation;
            _animator.Play(sleeping ? _sleepState : _idleState, 0, 0f);
        }

        private void PlayVoice(AudioClip clip)
        {
            if (_voiceSource == null || clip == null) return;
            _voiceSource.Stop();
            _voiceSource.PlayOneShot(clip);
        }

        private void SetRunning(bool isRunning)
        {
            if (_animator != null)
                _animator.speed = isRunning && State == MonsterState.Patrolling ? _patrolAnimationSpeed : 1f;
            if (_hasRunParameter)
            {
                _animator.SetBool(_isRunningHash, isRunning && (!_hasWalkParameter || State != MonsterState.Patrolling));
            }
            if (_hasWalkParameter)
                _animator.SetBool(_isWalkingHash, isRunning && State == MonsterState.Patrolling);
        }
    }
}
