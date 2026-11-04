namespace Playable.MonsterArmy.Core
{
    public enum TutorialStep
    {
        /// <summary>Kéo nhân vật từ thanh chọn xuống ô trên sàn.</summary>
        DragToPlace,

        /// <summary>Đã đủ quân, nút START hiện ra và bàn tay chỉ vào nó.</summary>
        PressStart,

        Done
    }

    /// <summary>Guides five successful UI drops, then waits for START input.</summary>
    public sealed class TutorialFlow
    {
        private readonly float _emphasisAfter;

        private float _timeInStep;

        public TutorialFlow(int requiredPlacements = 5, float emphasisAfter = 4f)
        {
            RequiredPlacements = requiredPlacements;
            _emphasisAfter = emphasisAfter;
        }

        public TutorialStep Current { get; private set; } = TutorialStep.DragToPlace;

        /// <summary>Số nhân vật người chơi đã kéo xuống sàn.</summary>
        public int PlacedCount { get; private set; }

        public int RequiredPlacements { get; }

        /// <summary>Nút START chỉ xuất hiện khi đội quân đã đủ đông.</summary>
        public bool ShowStartButton => PlacedCount >= RequiredPlacements;

        public bool IsLocked => Current != TutorialStep.Done;

        public bool IsEmphasised => IsLocked && _timeInStep >= _emphasisAfter;

        /// <summary>
        /// Người chơi đang kéo dở một nhân vật. Đồng hồ bỏ bê dừng lại — đang tương
        /// tác thì không phải đang kẹt, và không được giật nhân vật khỏi tay họ.
        /// </summary>
        public bool IsInteractionInProgress { get; set; }

        public void Tick(float deltaTime)
        {
            if (!IsLocked || IsInteractionInProgress || deltaTime <= 0f) return;

            _timeInStep += deltaTime;
            // Waiting only emphasises the hint; placement and START require player input.
        }

        /// <summary>Người chơi vừa làm gì đó có ý nghĩa. Đồng hồ bỏ bê quay về 0.</summary>
        public void NotifyActivity()
        {
            _timeInStep = 0f;
        }

        public void NotifyMonsterPlaced()
        {
            PlacedCount++;
            NotifyActivity();

            if (Current == TutorialStep.DragToPlace && PlacedCount >= RequiredPlacements)
                Advance();
        }

        public void NotifyStartPressed()
        {
            if (Current == TutorialStep.PressStart) Advance();
        }

        private void Advance()
        {
            if (Current == TutorialStep.Done) return;

            Current = (TutorialStep)((int)Current + 1);
            _timeInStep = 0f;
        }
    }
}
