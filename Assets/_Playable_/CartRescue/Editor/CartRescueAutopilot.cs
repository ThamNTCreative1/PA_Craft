using System.Reflection;
using Playable.CartRescue.Core;
using UnityEditor;
using UnityEngine;

namespace Playable.CartRescue.EditorTools
{
    /// <summary>
    /// Công cụ kiểm thử trong Play Mode (chỉ Editor): tự chơi hết luồng, hoặc giật xe ngẫu nhiên để thử phá.
    /// Ghi log từng mốc + vi phạm bất biến (rời sàn / chồng nhau). Không vào build Luna (thư mục Editor).
    /// </summary>
    public static class CartRescueAutopilot
    {
        private enum Step { Grab, Lower, Release, Balance, Start, Watch, Abuse, Done }

        private static Step _step;
        private static double _t0, _stepStart;
        private static float _finger;
        private static bool _dragging;
        private static System.Random _rng;
        private static int _violations;
        private static bool _abuse;
        private static CartPhase _lastPhase;

        [MenuItem("Tools/Cart Rescue/Autopilot: Play Through")]
        public static void PlayThrough() => Begin(false);

        [MenuItem("Tools/Cart Rescue/Autopilot: Abuse 10s")]
        public static void Abuse() => Begin(true);

        public static string Status => _step + " phase=" + _lastPhase + " violations=" + _violations + " t=" + (EditorApplication.timeSinceStartup - _t0).ToString("F1");

        private static void Begin(bool abuse)
        {
            if (!Application.isPlaying) { Debug.LogWarning("[Autopilot] Enter Play Mode first."); return; }
            _abuse = abuse;
            _step = Step.Grab;
            _t0 = _stepStart = EditorApplication.timeSinceStartup;
            _violations = 0;
            _dragging = false;
            _rng = new System.Random(7);
            EditorApplication.update -= Tick;
            EditorApplication.update += Tick;
            Debug.Log("[Autopilot] start " + (abuse ? "abuse" : "play-through"));
        }

        private static T Field<T>(object o, string name) =>
            (T)o.GetType().GetField(name, BindingFlags.NonPublic | BindingFlags.Instance).GetValue(o);

        private static void Next(Step s)
        {
            _step = s;
            _stepStart = EditorApplication.timeSinceStartup;
            Debug.Log("[Autopilot] " + s + " at " + (EditorApplication.timeSinceStartup - _t0).ToString("F2") + "s");
        }

        private static void Tick()
        {
            if (!Application.isPlaying) { EditorApplication.update -= Tick; return; }
            var ctrl = Object.FindFirstObjectByType<CartRescueController>();
            if (ctrl == null) return;
            var cart = Field<CartBody>(ctrl, "_cart");
            var rope = Field<RopeHangView>(ctrl, "_rope");
            var flow = Field<CartFlow>(ctrl, "_flow");
            if (flow == null) return;
            if (flow.Phase != _lastPhase) Debug.Log("[Autopilot] phase " + flow.Phase + " at " + (EditorApplication.timeSinceStartup - _t0).ToString("F2") + "s");
            _lastPhase = flow.Phase;
            CheckInvariants(cart);
            double inStep = EditorApplication.timeSinceStartup - _stepStart;
            float settle = DeckConfig.Default.SettleAngleRad;

            switch (_step)
            {
                case Step.Grab:
                    if (inStep < 1.0) return;
                    if (rope.TryGrab(rope.RiderCenter)) Next(Step.Lower);
                    break;
                case Step.Lower:
                {
                    // Ngón tay giữ ở giữa thân nhân vật → đưa tới ngay trên ô bên phải.
                    rope.DragTo(cart.DeckPointWorld(1.6f) + Vector3.up * 0.95f);
                    var rider = Field<DeckRiderView>(ctrl, "_hangRider");
                    Vector3 local = cart.DeckTransform.InverseTransformPoint(rider.transform.position);
                    if ((local.y < 0.6f && local.y > -0.3f && inStep > 0.5) || inStep > 6) Next(Step.Release);
                    break;
                }
                case Step.Release:
                    var drop = typeof(CartRescueController).GetMethod("Drop", BindingFlags.NonPublic | BindingFlags.Instance);
                    if (rope.Release(cart, cart.DeckHalfLength, 0.35f, out float s))
                    {
                        drop.Invoke(ctrl, new object[] { s });
                        Next(_abuse ? Step.Abuse : Step.Balance);
                    }
                    else
                    {
                        Debug.LogWarning("[Autopilot] release missed the deck, retrying");
                        Next(Step.Grab);
                    }
                    break;
                case Step.Balance:
                    if (inStep < 2.0) return; // để người xem thấy xe nghiêng
                    if (flow.Phase != CartPhase.Balance) { EndDrag(cart); Next(Step.Start); return; }
                    if (Mathf.Abs(cart.Tilt.Angle) > settle)
                    {
                        if (!_dragging) { _dragging = true; _finger = cart.X; cart.BeginDrag(_finger); }
                        _finger += Mathf.Sign(cart.Tilt.Angle) * 3f * Time.deltaTime;
                        cart.Drag(_finger);
                    }
                    else EndDrag(cart);
                    if (inStep > 20) { Debug.LogError("[Autopilot] could not balance in 18s"); Finish(); }
                    break;
                case Step.Start:
                    if (inStep < 1.0) return;
                    if (flow.PressStart()) Next(Step.Watch);
                    break;
                case Step.Watch:
                    if (flow.Phase == CartPhase.Win) { Debug.Log("[Autopilot] WIN"); Finish(); }
                    if (inStep > 15) { Debug.LogError("[Autopilot] no win after 15s"); Finish(); }
                    break;
                case Step.Abuse:
                    if (!_dragging) { _dragging = true; _finger = cart.X; cart.BeginDrag(_finger); }
                    _finger = cart.X + (float)(_rng.NextDouble() * 2 - 1) * 6f;
                    cart.Drag(_finger);
                    if (inStep > 10) { EndDrag(cart); Finish(); }
                    break;
            }
        }

        private static void EndDrag(CartBody cart)
        {
            if (!_dragging) return;
            _dragging = false;
            cart.EndDrag();
        }

        private static void Finish()
        {
            Debug.Log("[Autopilot] done, invariant violations=" + _violations);
            Next(Step.Done);
            EditorApplication.update -= Tick;
        }

        private static void CheckInvariants(CartBody cart)
        {
            DeckSolver d = cart.Deck;
            float half = cart.DeckHalfLength;
            for (int i = 0; i < d.Count; i++)
            {
                if (Mathf.Abs(d.Position(i)) + d.HalfWidth(i) > half + 1e-3f) Violation("rider " + i + " off deck at " + d.Position(i));
                for (int j = i + 1; j < d.Count; j++)
                    if (Mathf.Abs(d.Position(i) - d.Position(j)) < d.HalfWidth(i) + d.HalfWidth(j) - 1e-3f)
                        Violation("riders " + i + "/" + j + " overlap");
            }
        }

        private static void Violation(string msg)
        {
            if (_violations++ < 5) Debug.LogError("[Autopilot] " + msg);
        }
    }
}
