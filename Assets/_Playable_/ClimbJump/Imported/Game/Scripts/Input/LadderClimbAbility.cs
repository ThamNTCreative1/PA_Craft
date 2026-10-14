using ECM2;
using UnityEngine;

namespace Minigames.Runtimes.Controls
{
    /// <summary>
    /// This example shows how to extend a Character (through composition) adding a custom movement mode.
    /// Here we implement a ladder climbing ability using a Climbing custom movement mode.
    /// </summary>

    public class LadderClimbAbility : MonoBehaviour
    {
        public enum CustomMovementMode
        {
            Climbing = 1
        }

        public enum ClimbingState
        {
            None,
            Grabbing,
            Grabbed,
            Releasing
        }

        public float climbingSpeed = 5.0f;
        public float grabbingTime = 0.25f;

        public LayerMask ladderMask;

        private Character _character;

        private Ladder _activeLadder;
        private float _ladderPathPosition;

        private Vector3 _ladderStartPosition;
        private Vector3 _ladderTargetPosition;

        private Quaternion _ladderStartRotation;
        private Quaternion _ladderTargetRotation;

        private float _ladderTime;

        public ClimbingState _climbingState;
        public ClimbingState CurrentClimbingState => _climbingState;

        private Character.RotationMode _previousRotationMode;
        private bool _exitedAtTop;
        private bool _isAutoClimbMode; // Khi true: tự leo lên không cần input
        public float LadderPathPosition => _ladderPathPosition;
        public bool ExitedAtTop => _exitedAtTop;

        public bool IsClimbing()
        {
            bool isClimbing = _character.movementMode == Character.MovementMode.Custom &&
                              _character.customMovementMode == (int)CustomMovementMode.Climbing;

            return isClimbing;
        }

        /// <summary>
        /// Trả về hướng leo lên (ladder forward) để dùng cho auto climb.
        /// </summary>
        public Vector3 GetClimbUpDirection()
        {
            if (_activeLadder == null) return Vector3.zero;
            return _activeLadder.transform.forward;
        }

        /// <summary>
        /// Determines if the Character is able to climb.
        /// </summary>

        private bool CanClimb()
        {
            // Do not allow to climb if crouching

            if (_character.IsCrouched())
                return false;

            // Attempt to find a ladder

            CharacterMovement characterMovement = _character.characterMovement;
            var overlappedColliders =
                characterMovement.OverlapTest(ladderMask, QueryTriggerInteraction.Collide, out int overlapCount);

            if (overlapCount == 0)
                return false;

            // Is a ladder ?

            if (!overlappedColliders[0].TryGetComponent(out Ladder ladder))
                return false;

            _activeLadder = ladder;
            return true;
        }

    
        public void SetAutoClimbMode(bool autoMode)
        {
            _isAutoClimbMode = autoMode;
        }

        public void Climb()
        {
            var canClimb = CanClimb();
            var isClimbing = IsClimbing();
            if (isClimbing || !canClimb)
            {
                return;
            }
            _exitedAtTop = false;
            _isAutoClimbMode = false;

            _character.SetMovementMode(Character.MovementMode.Custom, (int)CustomMovementMode.Climbing);

            _ladderStartPosition = _character.GetPosition();
            _ladderTargetPosition = _activeLadder.ClosestPointOnPath(_ladderStartPosition, out _ladderPathPosition);

            _ladderStartRotation = _character.GetRotation();
            _ladderTargetRotation = _activeLadder.transform.rotation;
        }
        public void AutoClimb()
        {
            if (IsClimbing())
                return;
            if (!CanClimb())
                return;

            _exitedAtTop = false;
            _isAutoClimbMode = true;

            _character.SetMovementMode(Character.MovementMode.Custom, (int)CustomMovementMode.Climbing);

            _ladderStartPosition = _character.GetPosition();
            _ladderTargetPosition = _activeLadder.ClosestPointOnPath(_ladderStartPosition, out _ladderPathPosition);

            _ladderStartRotation = _character.GetRotation();
            _ladderTargetRotation = _activeLadder.transform.rotation;
        }


        public void StopClimbing()
        {
            if (!IsClimbing() || _climbingState != ClimbingState.Grabbed)
                return;

            _climbingState = ClimbingState.Releasing;
            _ladderStartPosition = _character.GetPosition();
            _ladderStartRotation = _character.GetRotation();

            _ladderTargetPosition = _ladderStartPosition;
            _ladderTargetRotation = _activeLadder.BottomPoint.rotation;
        }

        /// <summary>
        /// Perform climbing movement.
        /// </summary>

        public void ClimbingMovementMode(float deltaTime)
        {
            Vector3 velocity = Vector3.zero;

            switch (_climbingState)
            {
                case ClimbingState.Grabbing:
                case ClimbingState.Releasing:
                    {
                        _ladderTime += deltaTime;

                        if (_ladderTime <= grabbingTime)
                        {
                            Vector3 interpolatedPosition = Vector3.Lerp(_ladderStartPosition, _ladderTargetPosition, _ladderTime / grabbingTime);

                            velocity = (interpolatedPosition - transform.position) / deltaTime;
                        }
                        else
                        {
                            // If target has been reached, change ladder phase

                            _ladderTime = 0.0f;

                            if (_climbingState == ClimbingState.Grabbing)
                            {
                                // Switch to ladder climb phase

                                _climbingState = ClimbingState.Grabbed;
                            }
                            else if (_climbingState == ClimbingState.Releasing)
                            {
                                // Exit climbing state (change to falling movement mode)

                                _character.SetMovementMode(Character.MovementMode.Falling);
                            }
                        }

                        break;
                    }

                case ClimbingState.Grabbed:
                    {
                        // Get the path position from character's current position

                        _activeLadder.ClosestPointOnPath(_character.GetPosition(), out _ladderPathPosition);

                        if (Mathf.Abs(_ladderPathPosition) < 0.05f)
                        {
                            Vector3 ladderDirection = _activeLadder.transform.up;

                            float climbInput;
                            if (_isAutoClimbMode)
                            {
                                // Auto climb: luôn leo lên, không cần input
                                climbInput = 1f;
                            }
                            else
                            {
                                // Manual climb: theo input
                                Vector3 movementInput = _character.GetMovementDirection();
                                Vector3 horizontalMovement = new Vector3(movementInput.x, 0, movementInput.z);
                                Vector3 ladderForward = _activeLadder.transform.forward;
                                climbInput = Vector3.Dot(horizontalMovement, ladderForward);
                            }

                            velocity = ladderDirection * (climbInput * climbingSpeed);
                        }
                        else
                        {

                            _climbingState = ClimbingState.Releasing;

                            _ladderStartPosition = _character.GetPosition();
                            _ladderStartRotation = _character.GetRotation();

                            if (_ladderPathPosition > 0.0f)
                            {
                                _exitedAtTop = true;

                                _ladderTargetPosition = _activeLadder.TopPoint.position;
                                _ladderTargetRotation = _activeLadder.TopPoint.rotation;
                            }
                            else if (_ladderPathPosition < 0.0f)
                            {
                                _exitedAtTop = false;

                                _ladderTargetPosition = _activeLadder.BottomPoint.position;
                                _ladderTargetRotation = _activeLadder.BottomPoint.rotation;
                            }
                        }

                        break;
                    }
            }

            // Update character's velocity
            _character.SetVelocity(velocity);
        }

        private void OnMovementModeChanged(Character.MovementMode prevMovementMode, int prevCustomMovementMode)
        {
            // Enter Climbing movement mode

            if (IsClimbing())
            {
                _climbingState = ClimbingState.Grabbing;

                _character.StopJumping();

                _character.EnableGroundConstraint(false);

                _previousRotationMode = _character.rotationMode;
                _character.SetRotationMode(Character.RotationMode.Custom);
            }

            // Exit Climbing movement mode

            bool wasClimbing = prevMovementMode == Character.MovementMode.Custom &&
                               prevCustomMovementMode == (int)CustomMovementMode.Climbing;

            if (wasClimbing)
            {
                _climbingState = ClimbingState.None;
                _isAutoClimbMode = false;

                _character.EnableGroundConstraint(true);
                _character.SetRotationMode(_previousRotationMode);
            }
        }

        private void OnCustomMovementModeUpdated(float deltaTime)
        {
            if (IsClimbing())
                ClimbingMovementMode(deltaTime);
        }

        private void OnCustomRotationModeUpdated(float deltaTime)
        {
            if (IsClimbing() && (_climbingState == ClimbingState.Grabbing || _climbingState == ClimbingState.Releasing))
            {
                Quaternion rotation =
                    Quaternion.Slerp(_ladderStartRotation, _ladderTargetRotation, _ladderTime / grabbingTime);

                _character.SetRotation(rotation);
            }
        }

        private void Awake()
        {
            _character = GetComponent<Character>();
        }

        private void OnEnable()
        {
            _character.MovementModeChanged += OnMovementModeChanged;
            _character.CustomMovementModeUpdated += OnCustomMovementModeUpdated;
            _character.CustomRotationModeUpdated += OnCustomRotationModeUpdated;
        }

        private void OnDisable()
        {
            _character.MovementModeChanged -= OnMovementModeChanged;
            _character.CustomMovementModeUpdated -= OnCustomMovementModeUpdated;
            _character.CustomRotationModeUpdated -= OnCustomRotationModeUpdated;
        }
    }
}
