using System;
using UnityEngine;

namespace Playable
{
    [DefaultExecutionOrder(140)]
    public sealed class CombatTutorialController : MonoBehaviour
    {
        private enum Step { Inactive, Look, Move, Fire, Completed, Cancelled }
        [SerializeField] private TouchController _touch;
        [SerializeField] private PlayerController _player;
        [SerializeField] private UltimateJoystick _moveJoystick;
        [SerializeField] private PlayerPaintballController _weapon;
        [SerializeField] private GameObject _lookCue, _moveCue, _fireCue, _joystick, _fireButton;
        private Step _step;
        private PaintballFireButton _fireInput;
        private float _moveTime;
        private int _beginFrame = -1;
        public event Action Completed;
        private void OnEnable()
        {
            _touch.OnScreenPressed += HandleScreenPressed;
            _weapon.ShotFired += OnShot;
        }
        private void OnDisable()
        {
            _touch.OnScreenPressed -= HandleScreenPressed;
            _weapon.ShotFired -= OnShot;
        }
        public void Begin()
        {
            if (_fireInput == null && _fireButton != null)
                _fireInput = _fireButton.GetComponent<PaintballFireButton>();
            if (_fireInput == null)
            {
                Debug.LogError("Combat tutorial needs PaintballFireButton on the assigned fire button.", this);
                Cancel();
                return;
            }
            _fireInput.enabled = false;
            _moveTime = 0f;
            _beginFrame = Time.frameCount;
            _step = Step.Look;
            _touch.gameObject.SetActive(true);
            _player.IsWorking = false;
            SetCues(true, false, false);
            _joystick.SetActive(true);
            _fireButton.SetActive(true);
        }
        private void HandleScreenPressed()
        {
            if (_step != Step.Look || Time.frameCount <= _beginFrame) return;
            _step = Step.Move;
            SetCues(false, true, false);
            _joystick.SetActive(true);
            _player.IsWorking = true;
        }
        private void Update()
        {
            if (_step != Step.Move) return;
            _moveTime = _moveJoystick != null &&
                new Vector2(_moveJoystick.HorizontalAxis, _moveJoystick.VerticalAxis).sqrMagnitude > 0.01f
                ? _moveTime + Time.deltaTime : 0f;
            if (_moveTime < 0.25f) return;
            _step = Step.Fire;
            SetCues(false, false, true);
            _fireButton.SetActive(true);
            _fireInput.enabled = true;
        }
        private void OnShot()
        {
            if (_step != Step.Fire) return;
            _step = Step.Completed;
            SetCues(false, false, false);
            Completed?.Invoke();
        }
        public void Cancel()
        {
            _step = Step.Cancelled;
            SetCues(false, false, false);
            _joystick.SetActive(false);
            _fireButton.SetActive(false);
            if (_fireInput != null) _fireInput.enabled = true;
        }
        private void SetCues(bool look, bool move, bool fire)
        {
            _lookCue.SetActive(look);
            _moveCue.SetActive(move);
            _fireCue.SetActive(fire);
        }
    }
}
