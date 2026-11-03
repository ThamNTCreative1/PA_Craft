using System;
using System.Collections.Generic;
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
            Returning,
            Fetching
        }

        [Header("Movement")]
        [SerializeField] private float _moveSpeed = 3.5f;
        [SerializeField] private float _rotationSpeed = 10f;
        [SerializeField] private float _attackDistance = 1.5f;
        [SerializeField, Min(0f)] private float _chaseDelay = 1f;

        [Header("Animation")]
        [SerializeField] private Animator _animator;
        [Tooltip("Animator state names (no Animator parameters: states are played directly with Animator.Play).")]
        [SerializeField] private string _idleState = "Idle";
        [SerializeField] private string _moveState = "Move";
        [Tooltip("Leave empty when the controller has no attack state.")]
        [SerializeField] private string _attackState = "";

        [Header("Guard Patrol")]
        [Tooltip("Idle monster visits a random guarded egg and stops this far around it.")]
        [SerializeField, Min(0f)] private float _patrolRadius = 2.5f;
        [Tooltip("Keep at least this distance from the egg so the monster never stands on it.")]
        [SerializeField, Min(0f)] private float _patrolMinDistance = 1.5f;
        [SerializeField, Min(0.1f)] private float _patrolSpeed = 1.5f;
        [SerializeField] private Vector2 _patrolWaitRange = new Vector2(3f, 6f);
        [Tooltip("Chance to rest after each patrol leg; otherwise it keeps walking.")]
        [SerializeField, Range(0f, 1f)] private float _patrolRestChance = 0.5f;
        [Tooltip("Longest single walk; far eggs are reached in several short legs with rests in between.")]
        [SerializeField, Min(0.5f)] private float _patrolMaxStep = 4f;

        private bool _guarding;
        private readonly List<Vector3> _guardPoints = new List<Vector3>();
        private int _lastGuardIndex = -1;
        private int _nextGuardIndex = -1;
        private Vector3 _patrolTarget;
        private bool _patrolMoving;
        private float _patrolWaitTimer;

        private Transform _target;
        private Vector3 _returnPosition;
        private Quaternion _returnRotation;
        private float _chaseDelayRemaining;
        private string _currentState;

        public MonsterState State { get; private set; } = MonsterState.Idle;
        public float AttackDistance => _attackDistance;
        /// <summary>Chase / return speed (patrol has its own speed).</summary>
        public float MoveSpeed { get => _moveSpeed; set => _moveSpeed = value; }
        public event Action OnPlayerReached;
        /// <summary>Raised when the monster gets back to its return point (after ReturnTo).</summary>
        public event Action OnReturned;

        private Action _fetchReached;

        private void Awake()
        {
            if (_animator == null)
            {
                _animator = GetComponentInChildren<Animator>();
            }

            if (_animator != null)
            {
                // Movement is driven by this controller, not animation root motion.
                _animator.applyRootMotion = false;
            }

            _currentState = null;
        }

        private void Update()
        {
            if (State == MonsterState.Idle)
            {
                if (_guarding) UpdatePatrol();
                return;
            }

            if (State == MonsterState.Returning)
            {
                UpdateReturning();
                return;
            }

            if (State == MonsterState.Fetching)
            {
                UpdateFetching();
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
            }

            if (State != MonsterState.Chasing || _target == null)
            {
                return;
            }

            Vector3 offset = _target.position - transform.position;
            offset.y = 0f;

            if (offset.sqrMagnitude <= _attackDistance * _attackDistance)
            {
                Attack();
                return;
            }

            Vector3 direction = offset.normalized;
            transform.position += direction * (_moveSpeed * Time.deltaTime);
            transform.rotation = Quaternion.Slerp(
                transform.rotation,
                Quaternion.LookRotation(direction),
                _rotationSpeed * Time.deltaTime);
        }

        /// <summary>While idle, the monster patrols between these points (the eggs).</summary>
        public void SetGuardPoints(IList<Vector3> points)
        {
            _guardPoints.Clear();
            if (points != null) _guardPoints.AddRange(points);
            _guarding = _guardPoints.Count > 0;
            _lastGuardIndex = -1;
            _nextGuardIndex = -1;
            _patrolWaitTimer = UnityEngine.Random.Range(_patrolWaitRange.x, _patrolWaitRange.y);
        }

        private void UpdatePatrol()
        {
            if (!_patrolMoving)
            {
                _patrolWaitTimer -= Time.deltaTime;
                if (_patrolWaitTimer > 0f) return;

                // Visit a different egg each time so every egg gets guarded.
                int index = _nextGuardIndex >= 0 ? _nextGuardIndex : UnityEngine.Random.Range(0, _guardPoints.Count);
                if (_nextGuardIndex < 0 && _guardPoints.Count > 1 && index == _lastGuardIndex)
                    index = (index + 1) % _guardPoints.Count;
                _nextGuardIndex = -1;
                _lastGuardIndex = index;

                Vector2 offset2 = UnityEngine.Random.insideUnitCircle.normalized *
                                  UnityEngine.Random.Range(_patrolMinDistance, Mathf.Max(_patrolMinDistance, _patrolRadius));
                Vector3 guardPoint = _guardPoints[index];
                _patrolTarget = new Vector3(guardPoint.x + offset2.x, transform.position.y, guardPoint.z + offset2.y);
                Vector3 leg = _patrolTarget - transform.position;
                leg.y = 0f;
                if (leg.magnitude > _patrolMaxStep)
                {
                    // Short leg towards the chosen egg; the same egg stays the goal for the next leg.
                    _patrolTarget = transform.position + leg.normalized * _patrolMaxStep;
                    _lastGuardIndex = -1;
                    _nextGuardIndex = index;
                }
                _patrolMoving = true;
                SetRunning(true);
                return;
            }

            Vector3 offset = _patrolTarget - transform.position;
            offset.y = 0f;
            float step = _patrolSpeed * Time.deltaTime;
            if (offset.sqrMagnitude <= step * step)
            {
                EndPatrolStep();
                if (UnityEngine.Random.value >= _patrolRestChance) _patrolWaitTimer = 0f;
                return;
            }

            Vector3 direction = offset.normalized;
            transform.position += direction * step;
            transform.rotation = Quaternion.Slerp(
                transform.rotation,
                Quaternion.LookRotation(direction),
                _rotationSpeed * Time.deltaTime);
        }

        private void EndPatrolStep()
        {
            _patrolWaitTimer = UnityEngine.Random.Range(_patrolWaitRange.x, _patrolWaitRange.y);
            if (!_patrolMoving) return;
            _patrolMoving = false;
            SetRunning(false);
        }

        public void StartChasing(Transform target)
        {
            EndPatrolStep();
            if (target == null)
            {
                Stop();
                return;
            }

            _target = target;
            _chaseDelayRemaining = Mathf.Max(0f, _chaseDelay);
            State = _chaseDelayRemaining > 0f ? MonsterState.WaitingToChase : MonsterState.Chasing;
            SetRunning(State == MonsterState.Chasing);
        }

        /// <summary>Gives up the chase and walks back to the egg spot, then idles facing the original direction.</summary>
        public void ReturnTo(Vector3 position, Quaternion rotation)
        {
            EndPatrolStep();
            if (State == MonsterState.Attacking) RebindAnimator();

            _target = null;
            _chaseDelayRemaining = 0f;
            _returnPosition = position;
            _returnRotation = rotation;
            State = MonsterState.Returning;
            SetRunning(true);
        }

        private void UpdateReturning()
        {
            Vector3 offset = _returnPosition - transform.position;
            offset.y = 0f;
            float step = _moveSpeed * Time.deltaTime;

            if (offset.sqrMagnitude <= step * step)
            {
                transform.SetPositionAndRotation(_returnPosition, _returnRotation);
                Stop();
                OnReturned?.Invoke();
                return;
            }

            Vector3 direction = offset.normalized;
            transform.position += direction * step;
            transform.rotation = Quaternion.Slerp(
                transform.rotation,
                Quaternion.LookRotation(direction),
                _rotationSpeed * Time.deltaTime);
        }

        /// <summary>Runs to the target (e.g. a dropped egg) without attacking; onReached fires on contact.</summary>
        public void Fetch(Transform target, Action onReached)
        {
            EndPatrolStep();
            if (State == MonsterState.Attacking) RebindAnimator();
            if (target == null)
            {
                Stop();
                return;
            }

            _target = target;
            _fetchReached = onReached;
            _chaseDelayRemaining = 0f;
            State = MonsterState.Fetching;
            SetRunning(true);
        }

        private void UpdateFetching()
        {
            if (_target == null)
            {
                Stop();
                return;
            }

            Vector3 offset = _target.position - transform.position;
            offset.y = 0f;
            float step = _moveSpeed * Time.deltaTime;
            if (offset.sqrMagnitude <= _attackDistance * _attackDistance || offset.sqrMagnitude <= step * step)
            {
                Action reached = _fetchReached;
                _fetchReached = null;
                Stop();
                reached?.Invoke();
                return;
            }

            Vector3 direction = offset.normalized;
            transform.position += direction * step;
            transform.rotation = Quaternion.Slerp(
                transform.rotation,
                Quaternion.LookRotation(direction),
                _rotationSpeed * Time.deltaTime);
        }

        public void Stop()
        {
            _fetchReached = null;
            EndPatrolStep();
            _target = null;
            _chaseDelayRemaining = 0f;
            State = MonsterState.Idle;
            SetRunning(false);
        }

        public void ResetMonster(Vector3 position, Quaternion rotation)
        {
            RebindAnimator();
            Stop();
            transform.SetPositionAndRotation(position, rotation);
        }

        private void RebindAnimator()
        {
            if (_animator == null || _animator.runtimeAnimatorController == null) return;
            // Attack may have no outgoing transition; restore the default state and parameters.
            _animator.Rebind();
            if (_animator.isActiveAndEnabled) _animator.Update(0f);
            _currentState = null;
        }

        private void Attack()
        {
            State = MonsterState.Attacking;
            SetRunning(false);
            PlayState(_attackState);

            OnPlayerReached?.Invoke();
        }

        private void SetRunning(bool isRunning)
        {
            PlayState(isRunning ? _moveState : _idleState);
        }

        private void PlayState(string state)
        {
            if (_animator == null || string.IsNullOrEmpty(state) || state == _currentState) return;
            _currentState = state;
            _animator.Play(state, 0, 0f);
        }

    }
}
