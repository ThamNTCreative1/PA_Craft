using System;

namespace Playable.CartRescue.Core
{
    public enum CartPhase { HangDrop, Balance, StartReady, Driving, Win }

    /// <summary>
    /// Máy trạng thái của playable: HangDrop → Balance → StartReady → Driving → Win.
    /// Cân xong (mỗi người một ô) là nút START hiện ngay; nhân vật bật khỏi ô (deckUnlocked) lúc StartReady thì lùi về
    /// Balance. Mỗi Tick chuyển tối đa 1 bước.
    /// </summary>
    public sealed class CartFlow
    {
        private readonly float _finishX;

        public CartPhase Phase { get; private set; } = CartPhase.HangDrop;
        public event Action<CartPhase> Changed;

        public CartFlow(float finishX)
        {
            _finishX = finishX;
        }

        public bool CartDraggable => Phase == CartPhase.Balance || Phase == CartPhase.StartReady;

        public void OnDropped()
        {
            if (Phase == CartPhase.HangDrop) Set(CartPhase.Balance);
        }

        public void Tick(bool deckSettled, bool deckUnlocked, float cartX)
        {
            switch (Phase)
            {
                case CartPhase.Balance:
                    if (deckSettled) Set(CartPhase.StartReady);
                    break;
                case CartPhase.StartReady:
                    if (deckUnlocked || !deckSettled) Set(CartPhase.Balance);
                    break;
                case CartPhase.Driving:
                    if (cartX >= _finishX) Set(CartPhase.Win);
                    break;
            }
        }

        public bool PressStart()
        {
            if (Phase != CartPhase.StartReady) return false;
            Set(CartPhase.Driving);
            return true;
        }

        private void Set(CartPhase phase)
        {
            Phase = phase;
            Changed?.Invoke(phase);
        }
    }
}
