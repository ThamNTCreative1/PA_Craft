using DG.Tweening;
using UnityEngine;

namespace Playable
{
    [DefaultExecutionOrder(-50)]
    public sealed class GameController : MonoBehaviour
    {
        public enum GameState { ApproachingTower, Climbing, Dropping, Completed }
        [Header("Climb Jump")]
        [LunaPlaygroundField("Climb Speed Multiplier")]
        [SerializeField, Min(0f)] private float _climbSpeedMultiplier = 1f;
        [LunaPlaygroundField("Target Climb Progress")]
        [SerializeField, Range(0f, 1f)] private float _targetClimbProgress = 1f;
        [SerializeField, Min(0f)] private float _towerTopCtaDelay = 1f;
        [SerializeField] private ClimbPlayer _player;
        [SerializeField] private ClimbCup _cup;
        [SerializeField] private ClimbHud _hud;
        [SerializeField] private Transform _ladderFoot;
        [SerializeField] private GameObject _jumpHeadline;
        [SerializeField] private TMPro.TMP_Text _instructionText;
        [SerializeField] private HandTutorial _handTutorial;
        [SerializeField] private TutorialLineIndicator _tutorialLineIndicator;
        [SerializeField] private GameManager _gameManager;
        [SerializeField, Min(0.1f)] private float _climbTutorialDistance = 3f;
        [SerializeField] private GameObject _jumpButtonLabel;
        private bool _climbTutorialShown;
        private bool _waitingForClimbSwipe;
        private bool _climbSwipeArmed;
        private bool _hasClimbed;
        private bool _ctaRequested;
        private Tween _ctaTween;
        private Tween _instructionTween;
        private Vector3 _instructionScale;
        private bool _instructionScaleCached;
        public GameState State { get; private set; }

        private void OnEnable()
        {
            if (_player != null)
            {
                _player.ClimbStarted += OnClimbStarted;
                _player.JumpedFromLadder += OnJumpedFromLadder;
            }
            if (_cup != null) _cup.CollectedCup += OnCupCollected;
            if (_gameManager != null)
            {
                _gameManager.GameEnded += OnGameEnded;
                if (_gameManager.HasEnded) OnGameEnded();
            }
        }
        private void Start()
        {
            if (_gameManager != null && _gameManager.HasEnded) return;
            State = GameState.ApproachingTower;
            if (_jumpButtonLabel != null) _jumpButtonLabel.SetActive(false);
            _player.SetClimbSpeedMultiplier(_climbSpeedMultiplier);
            _handTutorial.SetStealHintVisible(false);
            _handTutorial.ShowMovementTutorial();
            ShowInstruction("Move to tower");
            _tutorialLineIndicator.StartDraw(_ladderFoot, _player.transform);
        }
        private void OnClimbStarted()
        {
            if (_ctaRequested) return;
            _hasClimbed = true;
            State = GameState.Climbing;
            ShowInstruction("Jump now");
            _handTutorial.HideMovementTutorial();
            _handTutorial.SetStealHintVisible(true);
            _tutorialLineIndicator.StopDraw();
        }
        private void ShowInstruction(string message)
        {
            if (_instructionText != null) _instructionText.text = message;
            if (_jumpHeadline != null) _jumpHeadline.SetActive(true);
            if (_instructionText == null) return;
            var target = _instructionText.transform;
            if (!_instructionScaleCached)
            {
                _instructionScale = target.localScale;
                _instructionScaleCached = true;
            }
            _instructionTween?.Kill();
            target.localScale = _instructionScale;
            _instructionTween = target.DOScale(_instructionScale * 1.12f, 0.5f)
                .SetEase(Ease.InOutSine).SetLoops(-1, LoopType.Yoyo);
        }
        private void HideInstruction()
        {
            _instructionTween?.Kill();
            _instructionTween = null;
            if (_instructionText != null && _instructionScaleCached)
                _instructionText.transform.localScale = _instructionScale;
            if (_jumpHeadline != null) _jumpHeadline.SetActive(false);
        }
        private void Update()
        {
            if (_jumpButtonLabel != null)
                _jumpButtonLabel.SetActive(!_ctaRequested && _player.IsClimbing);
            if (!_ctaRequested && !_hasClimbed) UpdateClimbTutorial();
            if (!_hasClimbed || _ctaRequested) return;
            float target = Mathf.Clamp01(_targetClimbProgress);
            // Allow a small height rounding tolerance; reaching the summit must
            // not depend on a physics trigger or a grounded frame after climbing.
            if (target >= 1f && _player.Progress >= 0.9999f && !_player.IsDropping)
            {
                RequestCTA(_towerTopCtaDelay);
                if (_cup != null) _cup.Collect();
            }
            else if (target < 1f && _player.IsClimbing && _player.Progress >= target)
                RequestCTA(0f);
        }
        private void UpdateClimbTutorial()
        {
            if (!_climbTutorialShown && _ladderFoot != null && !_player.IsClimbing)
            {
                Vector3 offset = _player.transform.position - _ladderFoot.position;
                offset.y = 0f;
                if (offset.sqrMagnitude <= _climbTutorialDistance * _climbTutorialDistance)
                {
                    _climbTutorialShown = true;
                    _waitingForClimbSwipe = true;
                    _climbSwipeArmed = false;
                    _player.SetTutorialPaused(true);
                    HideInstruction();
                    _handTutorial.ShowClimbTutorial();
                }
            }
            if (!_waitingForClimbSwipe) return;
            if (!_climbSwipeArmed)
            {
                if (!Input.GetMouseButton(0) && Input.touchCount == 0)
                    _climbSwipeArmed = true;
                return;
            }
            if (_player.JoystickDirection.sqrMagnitude < 0.09f) return;
            _waitingForClimbSwipe = false;
            _player.SetTutorialPaused(false);
            _handTutorial.HideMovementTutorial();
        }
        private void LateUpdate()
        {
            if (_hasClimbed && _player.Progress >= 1f)
            {
                HideInstruction();
                _handTutorial.SetStealHintVisible(false);
            }
        }
        private void OnJumpedFromLadder()
        {
            if (_ctaRequested) return;
            _hasClimbed = true;
            State = GameState.Dropping;
            _handTutorial.SetStealHintVisible(false);
            RequestCTA(1f);
        }
        private void OnCupCollected(int amount)
        {
            _hud.AddCup(amount);
            if (_ctaRequested) return;
            if (_jumpHeadline != null) _jumpHeadline.SetActive(false);
            _handTutorial.SetStealHintVisible(false);
            RequestCTA(_towerTopCtaDelay);
        }
        private void RequestCTA(float delay)
        {
            if (_ctaRequested) return;
            _ctaRequested = true;
            if (_jumpButtonLabel != null) _jumpButtonLabel.SetActive(false);
            HideInstruction();
            _handTutorial.HideAll();
            _tutorialLineIndicator.StopDraw();
            _ctaTween = DOVirtual.DelayedCall(Mathf.Max(0f, delay), CompleteCTA, true);
        }
        private void CompleteCTA()
        {
            // EndGame invokes OnGameEnded synchronously. Clear the reference
            // first so cleanup does not kill the tween executing this callback.
            _ctaTween = null;
            _gameManager.EndGame();
            if (!_gameManager.IsApplovin) _gameManager.ShowCTA();
        }
        private void CancelCTADelay()
        {
            _ctaTween?.Kill();
            _ctaTween = null;
        }
        private void OnGameEnded()
        {
            CancelCTADelay();
            _waitingForClimbSwipe = false;
            if (_player != null) _player.SetTutorialPaused(false);
            if (_jumpButtonLabel != null) _jumpButtonLabel.SetActive(false);
            _ctaRequested = true;
            StopAllCoroutines();
            State = GameState.Completed;
            if (_player != null) _player.InputEnabled = false;
            HideInstruction();
            if (_handTutorial != null) _handTutorial.HideAll();
            if (_tutorialLineIndicator != null) _tutorialLineIndicator.StopDraw();
        }
        private void OnDisable()
        {
            CancelCTADelay();
            if (_player != null) _player.SetTutorialPaused(false);
            if (_jumpButtonLabel != null) _jumpButtonLabel.SetActive(false);
            HideInstruction();
            StopAllCoroutines();
            if (_player != null)
            {
                _player.ClimbStarted -= OnClimbStarted;
                _player.JumpedFromLadder -= OnJumpedFromLadder;
            }
            if (_cup != null) _cup.CollectedCup -= OnCupCollected;
            if (_gameManager != null) _gameManager.GameEnded -= OnGameEnded;
        }
    }
}
