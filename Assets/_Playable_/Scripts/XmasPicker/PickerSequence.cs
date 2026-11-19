namespace Playable
{
    // Plain step state: which screen is showing and whether a choice is already being resolved.
    public class PickerSequence
    {
        private readonly PickerStep[] _steps;
        private bool _chosen;

        public PickerSequence(PickerStep[] steps)
        {
            _steps = steps ?? new PickerStep[0];
        }

        public int Index { get; private set; }
        public bool IsFinished => Index >= _steps.Length;
        public PickerStep Current => IsFinished ? null : _steps[Index];

        public bool TryChoose(int side, out PickerOption option)
        {
            option = null;
            if (IsFinished || _chosen) return false;
            option = Current.Get(side);
            if (option == null) return false;
            _chosen = true;
            return true;
        }

        public void Advance()
        {
            if (IsFinished) return;
            Index++;
            _chosen = false;
        }
    }
}
