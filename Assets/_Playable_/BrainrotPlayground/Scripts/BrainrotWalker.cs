using UnityEngine;

namespace Playable.BrainrotPlayground
{
    /// <summary>
    /// Nhân vật Brainrot (ghép Đầu/Thân/Tay/Chân) đi lang thang trên bản đồ top-down: chọn điểm ngẫu nhiên trong
    /// vùng cho phép, đi tới đó (vung tay, bước chân, nhún người), nghỉ rồi chọn điểm khác.
    /// Thứ tự vẽ theo trục Y (ở dưới vẽ đè lên); mỗi bộ phận giữ độ lệch thứ tự riêng (_partOrders).
    /// </summary>
    [DisallowMultipleComponent]
    public sealed class BrainrotWalker : MonoBehaviour
    {
        [SerializeField] private Transform _body;
        [SerializeField] private SpriteRenderer[] _parts;
        [SerializeField] private int[] _partOrders;
        [SerializeField] private SpriteRenderer _shadow;
        [SerializeField] private Transform _armLeft;
        [SerializeField] private Transform _armRight;
        [SerializeField] private Transform _legLeft;
        [SerializeField] private Transform _legRight;
        [SerializeField] private Rect _area = new Rect(-12f, -7f, 24f, 14f);
        [SerializeField] private float _speed = 1.6f;
        [SerializeField] private Vector2 _idleRange = new Vector2(0.4f, 1.6f);
        [SerializeField] private float _bobHeight = 0.08f;
        [SerializeField] private float _stepRate = 9f;
        [SerializeField] private float _legSwing = 28f;
        [SerializeField] private float _armSwing = 32f;
        [SerializeField] private int _seed;

        private Vector2 _target;
        private float _idle;
        private float _phase;
        private bool _moving;
        private float _dropTime = -1f;
        private Vector3 _baseScale = Vector3.one;
        private float _facing = 1f;
        private float _armLeftBase, _armRightBase, _legLeftBase, _legRightBase;

        private void Awake()
        {
            if (_body != null) _baseScale = _body.localScale;
            if (_seed == 0) _seed = GetInstanceID();
            _phase = Mathf.Abs(_seed % 100) * 0.13f;
            _idle = Mathf.Abs(_seed % 7) * 0.2f;
            _target = transform.position;
            _armLeftBase = Angle(_armLeft);
            _armRightBase = Angle(_armRight);
            _legLeftBase = Angle(_legLeft);
            _legRightBase = Angle(_legRight);
        }

        /// <summary>Rơi từ trên xuống + nảy (dùng khi người chơi chọn nhân vật).</summary>
        public void PlayDrop()
        {
            _dropTime = 0f;
            _idle = 1.2f;
            _moving = false;
            _target = transform.position;
            // Áp tư thế đầu (đang ở trên cao, bóng nhỏ) ngay lập tức: object vừa bật trong lúc xử lý chạm thì
            // Update của nó chỉ chạy từ frame sau, nếu không frame đầu sẽ vẽ nhân vật đứng sẵn dưới đất rồi mới
            // bật lên cao để rơi — trông như bị nháy.
            UpdateDrop(0f);
            UpdateSorting();
        }

        private void Update()
        {
            float dt = Time.deltaTime;
            if (_dropTime >= 0f)
            {
                UpdateDrop(dt);
                UpdateSorting();
                return;
            }

            Vector2 position = transform.position;
            if (!_moving)
            {
                _idle -= dt;
                if (_idle <= 0f) PickTarget(position);
            }
            else
            {
                Vector2 next = Vector2.MoveTowards(position, _target, _speed * dt);
                if (Mathf.Abs(_target.x - position.x) > 0.05f) _facing = _target.x < position.x ? -1f : 1f;
                transform.position = new Vector3(next.x, next.y, transform.position.z);
                if ((next - _target).sqrMagnitude < 0.0025f)
                {
                    _moving = false;
                    _idle = Random.Range(_idleRange.x, _idleRange.y);
                }
            }

            Animate(dt);
            UpdateSorting();
        }

        private void PickTarget(Vector2 from)
        {
            for (int i = 0; i < 6; i++)
            {
                Vector2 candidate = from + Random.insideUnitCircle * 4f;
                if (_area.Contains(candidate))
                {
                    _target = candidate;
                    _moving = true;
                    return;
                }
            }
            _target = _area.center + Vector2.Scale(Random.insideUnitCircle, _area.size * 0.4f);
            _moving = true;
        }

        private void Animate(float dt)
        {
            if (_body == null) return;
            if (_moving) _phase += dt * _stepRate;
            else _phase = Mathf.MoveTowards(_phase, Mathf.Round(_phase / Mathf.PI) * Mathf.PI, dt * _stepRate * 0.5f);
            float s = Mathf.Sin(_phase);
            float breathe = _moving ? 0f : Mathf.Sin(Time.time * 2.4f + _seed) * 0.02f;
            _body.localPosition = new Vector3(0f, Mathf.Abs(s) * _bobHeight, 0f);
            _body.localScale = new Vector3(_baseScale.x * _facing * (1f - breathe), _baseScale.y * (1f + breathe), _baseScale.z);
            SetAngle(_legLeft, _legLeftBase + s * _legSwing);
            SetAngle(_legRight, _legRightBase - s * _legSwing);
            SetAngle(_armLeft, _armLeftBase - s * _armSwing);
            SetAngle(_armRight, _armRightBase + s * _armSwing * 0.6f);
            if (_shadow != null) _shadow.transform.localScale = Vector3.one * (1f - Mathf.Abs(s) * 0.08f);
        }

        private void UpdateDrop(float dt)
        {
            _dropTime += dt;
            const float fall = 0.35f;
            const float settle = 0.45f;
            float t = _dropTime;
            Vector3 facing = new Vector3(_facing, 1f, 1f);
            if (t < fall)
            {
                float k = t / fall;
                _body.localPosition = new Vector3(0f, (1f - k * k) * 4f, 0f);
                _body.localScale = Vector3.Scale(Vector3.Scale(_baseScale, facing), new Vector3(0.85f, 1.2f, 1f));
                SetAngle(_armLeft, _armLeftBase - 60f);
                SetAngle(_armRight, _armRightBase + 60f);
                if (_shadow != null) _shadow.transform.localScale = Vector3.one * Mathf.Lerp(0.3f, 1f, k);
            }
            else if (t < fall + settle)
            {
                float k = (t - fall) / settle;
                float squash = Mathf.Sin(k * Mathf.PI * 2f) * (1f - k) * 0.25f;
                _body.localPosition = Vector3.zero;
                _body.localScale = Vector3.Scale(Vector3.Scale(_baseScale, facing), new Vector3(1f + squash, 1f - squash, 1f));
                SetAngle(_armLeft, Mathf.Lerp(_armLeftBase - 60f, _armLeftBase, k));
                SetAngle(_armRight, Mathf.Lerp(_armRightBase + 60f, _armRightBase, k));
                if (_shadow != null) _shadow.transform.localScale = Vector3.one;
            }
            else
            {
                _body.localScale = Vector3.Scale(_baseScale, facing);
                _dropTime = -1f;
            }
        }

        private void UpdateSorting()
        {
            int order = (1000 - Mathf.RoundToInt(transform.position.y * 20f)) * 10;
            if (_shadow != null) _shadow.sortingOrder = order - 10;
            if (_parts == null) return;
            for (int i = 0; i < _parts.Length; i++)
                if (_parts[i] != null)
                    _parts[i].sortingOrder = order + (_partOrders != null && i < _partOrders.Length ? _partOrders[i] : 0);
        }

        private static float Angle(Transform t)
        {
            return t != null ? t.localEulerAngles.z : 0f;
        }

        private static void SetAngle(Transform t, float angle)
        {
            if (t != null) t.localRotation = Quaternion.Euler(0f, 0f, angle);
        }
    }
}
