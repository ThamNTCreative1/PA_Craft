using UnityEngine;

namespace Minigames.Runtimes.Controls
{
    public class AutoLadderClimbAbility : MonoBehaviour
    {
        #region Constants
        private const float EXIT_TIME_INITIAL = -10f;
        #endregion

        #region Serialized Fields
        [Header("Auto Climb - Detection")]
        [SerializeField] private float detectionRadius = 1.5f;
        [SerializeField] private float angleThreshold = 45f;
        [SerializeField] private float minimumInputMagnitude = 0.3f;
        [SerializeField] private LayerMask ladderMask = 1;

        [Header("Auto Climb - Cooldown")]
        [SerializeField] private float exitCooldown = 1.0f;
        #endregion

        #region Cached References
        private ECM2.Character _character;
        private LadderClimbAbility _ladderClimbAbility;
        #endregion

        #region State
        private bool _autoClimbing;
        private float _lastExitTime = EXIT_TIME_INITIAL;
        private bool _wasClimbing;
        private Ladder _nearestLadder;
        #endregion

        #region Public API
        public void SetAutoClimbing(bool enabled)
        {
            _autoClimbing = enabled;
        }
        #endregion

        #region Unity Lifecycle
        private void Awake()
        {
            _character = GetComponent<ECM2.Character>();
            _ladderClimbAbility = GetComponent<LadderClimbAbility>();

            if (_ladderClimbAbility == null)
            {
                enabled = false;
            }
        }

        private void Update()
        {
            bool isClimbing = _ladderClimbAbility.IsClimbing();

            UpdateExitTimeTracking(isClimbing);
            _wasClimbing = isClimbing;

            if (isClimbing)
            {
                AutoClimb();
                return;
            }

            if (IsInExitCooldown())
                return;

            TryEnterLadderOrCheckInput();
        }
        #endregion

        #region Climbing State Logic
        private void UpdateExitTimeTracking(bool isClimbing)
        {
            if (_wasClimbing && !isClimbing)
                _lastExitTime = Time.time;
        }

        private void AutoClimb()
        {
            _ladderClimbAbility.SetAutoClimbMode(_autoClimbing);
        }

        private bool IsInExitCooldown()
        {
            return Time.time - _lastExitTime < exitCooldown;
        }

        private void TryEnterLadderOrCheckInput()
        {
            if (_autoClimbing)
                _ladderClimbAbility.AutoClimb();
            TryClimbFromInput();
        }

        private void TryClimbFromInput()
        {
            Vector3 movementDirection = _character.GetMovementDirection();
            _nearestLadder = FindNearestLadder();

            if (_nearestLadder == null) return;
            if (!ShouldAutoClimb(_nearestLadder, movementDirection)) return;

            _ladderClimbAbility.Climb();
        }
        #endregion

        #region Ladder Detection
        private Ladder FindNearestLadder()
        {
            Vector3 characterPosition = _character.GetPosition();

            // Tìm tất cả collider trong radius
            Collider[] colliders = Physics.OverlapSphere(characterPosition, detectionRadius, ladderMask);

            Ladder nearestLadder = null;
            float nearestDistance = float.MaxValue;

            foreach (var collider in colliders)
            {
                if (collider.TryGetComponent<Ladder>(out Ladder ladder))
                {
                    // Tính khoảng cách đến đường thang
                    Vector3 closestPoint = ladder.ClosestPointOnPath(characterPosition, out float pathPosition);
                    float distance = Vector3.Distance(characterPosition, closestPoint);

                    if (distance < nearestDistance)
                    {
                        nearestDistance = distance;
                        nearestLadder = ladder;
                    }
                }
            }

            return nearestLadder;
        }

        private bool ShouldAutoClimb(Ladder ladder, Vector3 movementDirection)
        {
            return movementDirection.magnitude > minimumInputMagnitude;
        }
        #endregion

        #region Debug
        private void OnDrawGizmosSelected()
        {
            if (!enabled) return;

            // Vẽ detection radius
            Gizmos.color = Color.green;
            Gizmos.DrawWireSphere(transform.position, detectionRadius);

            // Vẽ movement direction
            if (Application.isPlaying && _character != null)
            {
                Vector3 movementDir = _character.GetMovementDirection();
                if (movementDir.magnitude > 0.1f)
                {
                    Gizmos.color = Color.blue;
                    Gizmos.DrawRay(transform.position, movementDir * 2f);
                }
            }
        }
        #endregion
    }
}
