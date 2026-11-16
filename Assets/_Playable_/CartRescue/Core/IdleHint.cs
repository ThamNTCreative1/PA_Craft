namespace Playable.CartRescue.Core
{
    /// <summary>Gợi ý (tay hướng dẫn) ẩn ngay khi người chơi chạm, hiện lại sau Delay giây không tương tác.</summary>
    public sealed class IdleHint
    {
        private readonly float _delay;
        private float _idle;

        public IdleHint(float delay = 2f)
        {
            _delay = delay;
            _idle = delay;
        }

        public bool Visible => _idle >= _delay;

        public void Touch() => _idle = 0f;

        public void Tick(float dt) => _idle += dt;
    }
}
