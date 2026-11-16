using DG.Tweening;
using Playable.CartRescue.Core;
using UnityEngine;

namespace Playable.CartRescue
{
    /// <summary>
    /// Drone lơ lửng treo một nhân vật bằng dây (RopeModel). Người chơi nắm nhân vật/dây kéo xuống xe;
    /// thả trên sàn xe thì nhân vật rời dây, drone thu dây và bay khỏi màn hình. Thả ngoài vùng thì nhân vật
    /// đung đưa trở lại dưới drone.
    /// Gốc của _rider đặt ở chân; dây buộc vào đỉnh đầu (cao _hookHeight).
    /// </summary>
    [DisallowMultipleComponent]
    public sealed class RopeHangView : MonoBehaviour
    {
        [SerializeField] private Transform _heli;
        [SerializeField] private Transform[] _propellers;
        [SerializeField] private Transform _anchor;
        [SerializeField] private Transform _rider;
        [SerializeField] private LineRenderer _rope;
        [SerializeField] private float _hookHeight = 1.6f;
        [SerializeField] private float _restLength = 1.8f;
        [SerializeField] private float _maxLength = 9f;
        [SerializeField] private float _gravity = 20f;
        [SerializeField] private float _damping = 0.6f;
        [SerializeField] private float _grabRadius = 1.6f;
        [SerializeField] private float _dropZoneHeight = 3.5f;
        [SerializeField] private float _dropMarginSlots = 0.8f;
        [SerializeField] private float _hoverAmplitude = 0.15f;
        [SerializeField] private float _hoverRate = 1.6f;
        [SerializeField] private float _propellerSpeed = 1440f;
        [SerializeField] private float _flyAwayHeight = 14f;

        private RopeModel _model;
        private Vector3 _heliBase;
        private Vector2 _target;
        private Vector2 _grabOffset;
        private bool _attached = true;
        private float _time;

        public bool Grabbed => _model != null && _model.Grabbed;
        public bool Attached => _attached;
        /// <summary>Điểm giữa thân nhân vật treo (để tay hướng dẫn chỉ vào).</summary>
        public Vector3 RiderCenter => _rider.position + _rider.up * (_hookHeight * 0.5f);

        private void Awake()
        {
            _model = new RopeModel(_restLength, _maxLength, _gravity, _damping);
            _heliBase = _heli.position;
        }

        private void Update()
        {
            _time += Time.deltaTime;
            if (_propellers != null)
                for (int i = 0; i < _propellers.Length; i++)
                    if (_propellers[i] != null) _propellers[i].Rotate(0f, (i % 2 == 0 ? 1f : -1f) * _propellerSpeed * Time.deltaTime, 0f, Space.Self);
            if (!_attached) return;

            _heli.position = _heliBase + new Vector3(0f, Mathf.Sin(_time * _hoverRate) * _hoverAmplitude, 0f);
            Vector3 a = _anchor.position;
            _model.Step(a.x, a.y, _target.x, _target.y, Time.deltaTime);

            // Nhân vật thẳng theo phương dây, treo từ đỉnh đầu.
            Quaternion rot = Quaternion.Euler(0f, 0f, _model.SwingAngle * Mathf.Rad2Deg);
            Vector3 hook = new Vector3(_model.X, _model.Y, _rider.position.z);
            _rider.SetPositionAndRotation(hook - rot * new Vector3(0f, _hookHeight, 0f), rot);
            SetRope(a, hook);
        }

        /// <summary>Nắm nếu chạm gần nhân vật hoặc dây.</summary>
        public bool TryGrab(Vector2 world)
        {
            if (!_attached) return false;
            Vector2 a = _anchor.position;
            Vector2 hook = new Vector2(_model.X, _model.Y);
            bool hitRider = Vector2.Distance(world, RiderCenter) <= _grabRadius;
            bool hitRope = DistanceToSegment(world, a, hook) <= _grabRadius * 0.5f;
            if (!hitRider && !hitRope) return false;
            // Giữ nguyên độ lệch giữa ngón tay và đầu dây để nhân vật không giật về dưới ngón tay.
            _grabOffset = hook - world;
            _target = hook;
            _model.Grab();
            return true;
        }

        public void DragTo(Vector2 world) => _target = world + _grabOffset;

        /// <summary>
        /// Thả tay. Trả true nếu nhân vật đang ở vùng xe: ngang trong phạm vi xe (nới _dropMarginSlots mỗi bên), dọc
        /// thấp hơn mặt sàn + _dropZoneHeight — kéo xuống thấp hơn mặt xe (ngang bánh, sát đất) vẫn nhận. Khi đó nhân
        /// vật rời dây, <paramref name="s"/> là toạ độ dọc sàn đã kẹp vào trong thành.
        /// </summary>
        public bool Release(CartBody cart, float halfLength, float halfWidth, out float s)
        {
            _model.Release();
            s = 0f;
            if (!_attached) return false;
            Vector3 local = cart.DeckTransform.InverseTransformPoint(_rider.position);
            float ds = local.x / cart.SlotUnit;
            if (local.y > _dropZoneHeight || Mathf.Abs(ds) > halfLength + _dropMarginSlots) return false;
            s = Mathf.Clamp(ds, -halfLength + halfWidth, halfLength - halfWidth);
            _attached = false;
            return true;
        }

        /// <summary>Thu dây rồi bay lên khỏi màn hình.</summary>
        public void FlyAway()
        {
            _attached = false;
            Vector3 start = new Vector3(_model.X, _model.Y, _rider.position.z);
            float t = 0f;
            DOTween.To(() => t, v =>
            {
                t = v;
                Vector3 a = _anchor.position;
                SetRope(a, Vector3.Lerp(start, a, t));
            }, 1f, 0.3f).OnComplete(() => _rope.enabled = false);
            _heli.DOMoveY(_heli.position.y + _flyAwayHeight, 1.4f).SetDelay(0.25f).SetEase(Ease.InQuad)
                .OnComplete(() => _heli.gameObject.SetActive(false));
        }

        private void SetRope(Vector3 a, Vector3 b)
        {
            _rope.positionCount = 2;
            _rope.SetPosition(0, a);
            _rope.SetPosition(1, b);
        }

        private static float DistanceToSegment(Vector2 p, Vector2 a, Vector2 b)
        {
            Vector2 ab = b - a;
            float t = ab.sqrMagnitude < 1e-6f ? 0f : Mathf.Clamp01(Vector2.Dot(p - a, ab) / ab.sqrMagnitude);
            return Vector2.Distance(p, a + ab * t);
        }
    }
}
