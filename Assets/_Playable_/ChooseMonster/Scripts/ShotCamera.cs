using UnityEngine;

namespace Playable.ChooseMonster
{
    /// <summary>
    /// Camera tự đóng khung một vùng Bounds cho mọi tỉ lệ màn hình.
    /// Mỗi shot có 2 góc nhìn (dọc / ngang) và 2 bộ lề an toàn cho HUD; góc và lề được nội suy
    /// theo aspect, rồi khoảng cách + độ dịch ngang/dọc được giải sao cho toàn bộ 8 góc Bounds
    /// nằm trong phần màn hình không bị UI che.
    /// </summary>
    [DisallowMultipleComponent]
    public sealed class ShotCamera : MonoBehaviour
    {
        [System.Serializable]
        public struct Margins
        {
            public float Top;
            public float Bottom;
            public float Side;

            public Margins(float top, float bottom, float side)
            {
                Top = top;
                Bottom = bottom;
                Side = side;
            }

            public static Margins Lerp(Margins a, Margins b, float t)
            {
                return new Margins(Mathf.Lerp(a.Top, b.Top, t), Mathf.Lerp(a.Bottom, b.Bottom, t),
                    Mathf.Lerp(a.Side, b.Side, t));
            }
        }

        [SerializeField] private Camera _camera;
        [SerializeField] private float _smoothing = 3.5f;
        [SerializeField] private float _portraitAspect = 0.6f;
        [SerializeField] private float _landscapeAspect = 1.6f;

        private Bounds _bounds;
        private Bounds _landscapeBounds;
        private Bounds _activeBounds;
        private Vector2 _portraitAngles;
        private Vector2 _landscapeAngles;
        private Margins _portraitMargins;
        private Margins _landscapeMargins;
        private bool _hasShot;
        private bool _snap;
        private float _shake;
        private float _shakeDecay;
        private readonly Vector3[] _corners = new Vector3[8];

        public Camera Camera => _camera;

        private bool _lockZ;
        private float _lockedZ;

        /// <summary>Ghim trục Z của camera cho shot hiện tại (null = để solver tự tính). Shot mới sẽ bỏ ghim.</summary>
        public void LockZ(float? z)
        {
            _lockZ = z.HasValue;
            _lockedZ = z.HasValue ? z.Value : 0f;
        }

        /// <param name="portraitAngles">(pitch, yaw) khi màn hình dọc.</param>
        /// <param name="landscapeAngles">(pitch, yaw) khi màn hình ngang.</param>
        public void SetShot(Bounds bounds, Vector2 portraitAngles, Vector2 landscapeAngles,
            Margins portraitMargins, Margins landscapeMargins, bool snap)
        {
            SetShot(bounds, bounds, portraitAngles, landscapeAngles, portraitMargins, landscapeMargins, snap);
        }

        /// <summary>Như trên nhưng vùng cần đóng khung khác nhau giữa màn dọc và ngang (nội suy theo aspect).</summary>
        public void SetShot(Bounds portraitBounds, Bounds landscapeBounds, Vector2 portraitAngles, Vector2 landscapeAngles,
            Margins portraitMargins, Margins landscapeMargins, bool snap)
        {
            _bounds = portraitBounds;
            _landscapeBounds = landscapeBounds;
            _portraitAngles = portraitAngles;
            _landscapeAngles = landscapeAngles;
            _portraitMargins = portraitMargins;
            _landscapeMargins = landscapeMargins;
            _hasShot = true;
            _follow = null;
            _lockZ = false;
            _snap |= snap;
            if (snap) LateUpdate();
        }

        /// <summary>
        /// Bám theo một đối tượng từ phía sau. Đổi mục tiêu/offset được nội suy mượt từ vị trí
        /// camera hiện tại nên không giật khi hoán đổi player → monster.
        /// </summary>
        public void Follow(Transform target, Vector3 offset, float lookHeight, float lookAhead)
        {
            if (target == null || _camera == null) return;
            Vector3 current = _camera.transform.position - _lastShakeOffset;
            _followOffset = current - target.position;
            _followLookHeight = _follow != null ? _followLookHeight : lookHeight;
            _follow = target;
            _followOffsetTarget = offset;
            _followLookHeightTarget = lookHeight;
            _followLookAhead = lookAhead;
        }

        private Transform _follow;
        private Vector3 _followOffset;
        private Vector3 _followOffsetTarget;
        private float _followLookHeight;
        private float _followLookHeightTarget;
        private float _followLookAhead;

        public void Shake(float strength, float duration)
        {
            _shake = Mathf.Max(_shake, strength);
            _shakeDecay = _shake / Mathf.Max(0.01f, duration);
        }

        private void LateUpdate()
        {
            if (_camera == null || Screen.height <= 0) return;
            if (_follow != null)
            {
                UpdateFollow();
                return;
            }
            if (!_hasShot) return;

            float aspect = (float)Screen.width / Screen.height;
            float t = Mathf.InverseLerp(_portraitAspect, _landscapeAspect, aspect);
            t = t * t * (3f - 2f * t);
            Vector2 angles = Vector2.Lerp(_portraitAngles, _landscapeAngles, t);
            Margins margins = Margins.Lerp(_portraitMargins, _landscapeMargins, t);
            _activeBounds = new Bounds(Vector3.Lerp(_bounds.center, _landscapeBounds.center, t),
                Vector3.Lerp(_bounds.size, _landscapeBounds.size, t));

            Quaternion rotation = Quaternion.Euler(angles.x, angles.y, 0f);
            Vector3 position = Solve(rotation, aspect, margins);
            if (_lockZ) position.z = _lockedZ;

            float k = _snap ? 1f : 1f - Mathf.Exp(-_smoothing * Time.deltaTime);
            _snap = false;
            Transform tr = _camera.transform;
            tr.position = Vector3.Lerp(tr.position - _lastShakeOffset, position, k);
            tr.rotation = Quaternion.Slerp(tr.rotation, rotation, k);
            ApplyShake(tr);
        }

        private void UpdateFollow()
        {
            float dt = Time.deltaTime;
            float blend = 1f - Mathf.Exp(-_followBlend * dt);
            _followOffset = Vector3.Lerp(_followOffset, _followOffsetTarget, blend);
            _followLookHeight = Mathf.Lerp(_followLookHeight, _followLookHeightTarget, blend);

            Transform tr = _camera.transform;
            // Vị trí bám sát mục tiêu (không trễ) để camera đi xuyên đúng ô cửa của cổng.
            Vector3 position = _follow.position + _followOffset;
            Vector3 look = _follow.position + Vector3.up * _followLookHeight + Vector3.forward * _followLookAhead;
            Vector3 dir = look - position;
            Quaternion rotation = dir.sqrMagnitude > 0.0001f ? Quaternion.LookRotation(dir) : tr.rotation;
            tr.position = position;
            tr.rotation = Quaternion.Slerp(tr.rotation, rotation, 1f - Mathf.Exp(-6f * dt));
            _lastShakeOffset = Vector3.zero;
            ApplyShake(tr);
        }

        [SerializeField] private float _followBlend = 2.2f;

        private void ApplyShake(Transform tr)
        {
            _lastShakeOffset = Vector3.zero;
            if (_shake > 0f)
            {
                _lastShakeOffset = (tr.right * Random.Range(-1f, 1f) + tr.up * Random.Range(-1f, 1f)) * _shake;
                tr.position += _lastShakeOffset;
                _shake = Mathf.Max(0f, _shake - _shakeDecay * Time.deltaTime);
            }
        }

        private Vector3 _lastShakeOffset;

        private Vector3 Solve(Quaternion rotation, float aspect, Margins margins)
        {
            Vector3 right = rotation * Vector3.right;
            Vector3 up = rotation * Vector3.up;
            Vector3 forward = rotation * Vector3.forward;
            Vector3 c = _activeBounds.center;
            Vector3 e = _activeBounds.extents;
            int n = 0;
            for (int x = -1; x <= 1; x += 2)
            for (int y = -1; y <= 1; y += 2)
            for (int z = -1; z <= 1; z += 2)
                _corners[n++] = c + new Vector3(e.x * x, e.y * y, e.z * z);

            float tanV = Mathf.Tan(_camera.fieldOfView * 0.5f * Mathf.Deg2Rad);
            float tanH = tanV * aspect;

            // Vùng NDC (-1..1) còn trống sau khi trừ lề UI.
            float xMin = -1f + margins.Side * 2f;
            float xMax = 1f - margins.Side * 2f;
            float yMin = -1f + margins.Bottom * 2f;
            float yMax = 1f - margins.Top * 2f;
            float cx = (xMin + xMax) * 0.5f;
            float cy = (yMin + yMax) * 0.5f;

            float sx = 0f, sy = 0f, d = 1f;
            for (int iter = 0; iter < 4; iter++)
            {
                d = _camera.nearClipPlane + 0.5f;
                for (int i = 0; i < 8; i++)
                {
                    Vector3 v = _corners[i] - c;
                    float px = Vector3.Dot(v, right) - sx;
                    float py = Vector3.Dot(v, up) - sy;
                    float pz = Vector3.Dot(v, forward);
                    d = Mathf.Max(d, px > 0f ? px / (xMax * tanH) - pz : px / (xMin * tanH) - pz);
                    d = Mathf.Max(d, py > 0f ? py / (yMax * tanV) - pz : py / (yMin * tanV) - pz);
                }

                float minX = float.MaxValue, maxX = float.MinValue, minY = float.MaxValue, maxY = float.MinValue;
                for (int i = 0; i < 8; i++)
                {
                    Vector3 v = _corners[i] - c;
                    float depth = Vector3.Dot(v, forward) + d;
                    float nx = (Vector3.Dot(v, right) - sx) / (depth * tanH);
                    float ny = (Vector3.Dot(v, up) - sy) / (depth * tanV);
                    minX = Mathf.Min(minX, nx);
                    maxX = Mathf.Max(maxX, nx);
                    minY = Mathf.Min(minY, ny);
                    maxY = Mathf.Max(maxY, ny);
                }

                sx += ((minX + maxX) * 0.5f - cx) * tanH * d;
                sy += ((minY + maxY) * 0.5f - cy) * tanV * d;
            }

            return c - forward * d + right * sx + up * sy;
        }
    }
}
