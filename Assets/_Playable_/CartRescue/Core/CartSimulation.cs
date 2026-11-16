namespace Playable.CartRescue.Core
{
    /// <summary>
    /// Ghép chuyển động xe + góc nghiêng + nhân vật trên sàn thành một bước mô phỏng.
    /// Motion tính bằng đơn vị world; Tilt/Deck tính bằng đơn vị ô (1 ô = SlotUnit world).
    /// </summary>
    public sealed class CartSimulation
    {
        public CartMotion Motion { get; }
        public CartTiltModel Tilt { get; }
        public DeckSolver Deck { get; }
        public float SlotUnit { get; }

        public CartSimulation(MotionConfig motion, TiltConfig tilt, DeckConfig deck, float slotUnit, float startX)
        {
            Motion = new CartMotion(motion, startX);
            Tilt = new CartTiltModel(tilt);
            Deck = new DeckSolver(deck);
            SlotUnit = slotUnit;
        }

        public DeckEvent Step(float dt)
        {
            Motion.Step(dt);
            float accel = Motion.Accel / SlotUnit;
            Tilt.Step(Deck.LoadMoment, accel, dt);
            return Deck.Step(Tilt.Angle, accel, Motion.Speed / SlotUnit, dt);
        }
    }
}
