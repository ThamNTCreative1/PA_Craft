using Playable.CartRescue.Core;
using UnityEngine;

namespace Playable.CartRescue
{
    /// <summary>
    /// Xe chở nhân vật (lớp hiển thị của CartSimulation). Gốc (transform này) chạy ngang theo X, bánh xe gắn vào gốc;
    /// khung + sàn (_chassis) nghiêng trên nhíp. Nhân vật trên sàn tính bằng đơn vị ô (1 ô = _slotUnit world).
    /// Angle dương của Core = phía +s (bên phải) chúi xuống = quay Z âm trong Unity.
    /// </summary>
    [DisallowMultipleComponent]
    public sealed class CartBody : MonoBehaviour
    {
        [SerializeField] private Transform _chassis;
        [SerializeField] private Transform _deck;
        [SerializeField] private Transform[] _wheels;
        [SerializeField] private float _wheelRadius = 0.6f;
        [SerializeField] private float _slotUnit = 1.3f;
        [SerializeField] private MotionConfig _motion = MotionConfig.Default;
        [SerializeField] private TiltConfig _tilt = TiltConfig.Default;
        [SerializeField] private DeckConfig _deckConfig = DeckConfig.Default;

        private CartSimulation _sim;
        private float _wheelAngle;

        public CartSimulation Sim => _sim ?? (_sim = new CartSimulation(_motion, _tilt, _deckConfig, _slotUnit, transform.position.x));
        public DeckSolver Deck => Sim.Deck;
        public CartTiltModel Tilt => Sim.Tilt;
        public float X => transform.position.x;
        public float Speed => Sim.Motion.Speed;
        public float SlotUnit => _slotUnit;
        public Transform DeckTransform => _deck;
        public float DeckHalfLength => _deckConfig.HalfLength;

        public void BeginDrag(float pointerX) => Sim.Motion.BeginDrag(pointerX);
        public void Drag(float pointerX) => Sim.Motion.Drag(pointerX);
        public void EndDrag() => Sim.Motion.EndDrag();
        public void Drive(float targetSpeed) => Sim.Motion.Drive(targetSpeed);

        private const float FixedStep = 1f / 60f;
        private const int MaxStepsPerFrame = 8;
        private float _accumulator;

        /// <summary>
        /// Bước mô phỏng (bước cố định 1/60s để chạy y hệt test dù FPS dao động) rồi đặt transform.
        /// Trả về sự kiện của sàn trong frame này (Unlocked ưu tiên hơn Settled).
        /// </summary>
        public DeckEvent Simulate(float dt)
        {
            if (dt <= 0f) return DeckEvent.None;
            _accumulator = Mathf.Min(_accumulator + dt, FixedStep * MaxStepsPerFrame);
            DeckEvent evt = DeckEvent.None;
            while (_accumulator >= FixedStep)
            {
                _accumulator -= FixedStep;
                DeckEvent e = Sim.Step(FixedStep);
                if (e == DeckEvent.Unlocked || evt == DeckEvent.None) evt = e == DeckEvent.None ? evt : e;
            }

            Vector3 p = transform.position;
            p.x = Sim.Motion.X;
            transform.position = p;
            if (_chassis != null) _chassis.localRotation = Quaternion.Euler(0f, 0f, -Sim.Tilt.Angle * Mathf.Rad2Deg);
            _wheelAngle -= Sim.Motion.Speed * dt / Mathf.Max(0.01f, _wheelRadius) * Mathf.Rad2Deg;
            if (_wheels != null)
                foreach (Transform w in _wheels)
                    if (w != null) w.localRotation = Quaternion.Euler(0f, 0f, _wheelAngle);
            return evt;
        }

        public Vector3 DeckPointWorld(float s) => _deck.TransformPoint(new Vector3(s * _slotUnit, 0f, 0f));
    }
}
