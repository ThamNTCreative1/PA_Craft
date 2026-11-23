namespace Playable.PetRescue
{
    /// Tutorial step state machine. Gameplay reports what happened; the view renders the visibility flags.
    /// Drag (joystick) → Jump (TAP TO JUMP) → FindPet → Free, plus a one-shot TNT/Jump hint.
    /// Camera swiping has no tutorial step (user request).
    public sealed class RescueTutorialFlow
    {
        public enum Step { Drag, Jump, FindPet, Free }
        public const float DragToComplete = .35f, MinStick = .25f, FindPetTimeout = 4, JumpTimeout = 4, IdleReprompt = 3, TntWarningTime = 2;
        private float _moveTime, _jumpTime, _findTime, _idle, _tntTime;
        private bool _tntWarned, _finished;

        public Step Current { get; private set; }
        public int TntIndex { get; private set; } = -1;
        public bool DragVisible { get { return !_finished && (Current == Step.Drag || (Current != Step.Jump && _idle >= IdleReprompt)); } }
        /// Hand tapping the Jump button + "TAP TO JUMP" above it.
        public bool JumpTapVisible { get { return !_finished && Current == Step.Jump; } }
        public bool TitleVisible { get { return !_finished && Current == Step.Drag; } }
        /// After the first steps the arrow keeps guiding to the nearest pet still to collect (the flow hides it when none are left).
        public bool PetPointerVisible { get { return !_finished && (Current == Step.FindPet || Current == Step.Free); } }
        public bool TntWarningVisible { get { return !_finished && _tntTime > 0; } }
        /// The Jump button pulses during the TAP TO JUMP step and together with the TNT warning.
        public bool JumpHintVisible { get { return JumpTapVisible || TntWarningVisible; } }

        public void Tick(float dt, bool moving, float stickMagnitude)
        {
            if (_finished) return;
            if (_tntTime > 0) _tntTime = System.Math.Max(0, _tntTime - dt);
            if (Current == Step.Drag)
            {
                if (moving && stickMagnitude >= MinStick) _moveTime += dt;
                if (_moveTime >= DragToComplete) { Current = Step.Jump; _jumpTime = 0; }
                return;
            }
            if (Current == Step.Jump)
            {
                // Fallback so a player who never taps still reaches the goal.
                _jumpTime += dt;
                if (_jumpTime >= JumpTimeout) { Current = Step.FindPet; _findTime = 0; }
                return;
            }
            _idle = moving ? 0 : _idle + dt;
            if (Current == Step.FindPet)
            {
                _findTime += dt;
                if (_findTime >= FindPetTimeout) Current = Step.Free;
            }
        }

        public void OnPetCollected()
        {
            if (_finished) return;
            if (Current == Step.FindPet) Current = Step.Free;
        }

        /// The TNT/Jump hint is shown once. A mere approach waits until the early steps are over
        /// (one new idea at a time); an actual hit always shows it.
        public void OnTntApproached(int index, bool hit)
        {
            if (_finished || _tntWarned || (!hit && Current != Step.Free)) return;
            _tntWarned = true; TntIndex = index; _tntTime = TntWarningTime;
        }

        /// Pressing Jump completes the TAP TO JUMP step and answers the TNT hint.
        public void OnJumped()
        {
            if (_finished) return;
            if (Current == Step.Jump) { Current = Step.FindPet; _findTime = 0; }
            if (_tntTime > 0) _tntTime = System.Math.Min(_tntTime, .4f);
        }

        public void Finish() { _finished = true; _tntTime = 0; }
    }
}
