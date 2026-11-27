using UnityEngine;

namespace Playable.CannonLaunch
{
    /// <summary>
    /// Tường khối len. Collapse() cho từng khối bay văng theo hướng va chạm rồi rơi, nảy, nằm yên trên mặt đất.
    /// Tự mô phỏng (không dùng Rigidbody) để chạy giống hệt nhau trong Editor và trên Luna.
    /// </summary>
    public sealed class BrickWall : MonoBehaviour
    {
        [SerializeField] private Transform[] _bricks;
        [SerializeField] private float _brickSize = 1f;
        [SerializeField] private float _gravity = 22f;
        [SerializeField] private float _groundY;

        private Vector3[] _velocity;
        private Vector3[] _spin;
        private bool[] _resting;
        private bool _collapsed;
        private int _active;

        public bool Collapsed => _collapsed;

        /// <summary>Điểm giữa mặt trước của tường (nơi nhân vật đâm vào).</summary>
        public Vector3 FrontCenter
        {
            get
            {
                Bounds b = WallBounds();
                return new Vector3(b.center.x, b.center.y, b.min.z);
            }
        }

        public Bounds WallBounds()
        {
            Bounds b = new Bounds(_bricks[0].position, Vector3.zero);
            for (int i = 0; i < _bricks.Length; i++)
                b.Encapsulate(new Bounds(_bricks[i].position, Vector3.one * _brickSize));
            return b;
        }

        public void Collapse(Vector3 impact, float force)
        {
            if (_collapsed) return;
            _collapsed = true;
            int n = _bricks.Length;
            _velocity = new Vector3[n];
            _spin = new Vector3[n];
            _resting = new bool[n];
            _active = n;
            for (int i = 0; i < n; i++)
            {
                Vector3 p = _bricks[i].position;
                Vector3 away = p - impact;
                float d = away.magnitude;
                // Khối càng gần điểm va chạm càng bay mạnh; khối xa chỉ đổ theo.
                float k = Mathf.Clamp01(1.4f - d / 6f);
                Vector3 dir = new Vector3(away.x * 0.35f, 0.4f + Random.value * 0.6f, 1f).normalized;
                _velocity[i] = dir * (force * (0.35f + k)) + new Vector3(Random.Range(-1f, 1f), 0f, Random.Range(0f, 2f));
                _spin[i] = new Vector3(Random.Range(-360f, 360f), Random.Range(-200f, 200f), Random.Range(-360f, 360f)) * (0.4f + k);
            }
        }

        private void Update()
        {
            if (!_collapsed || _active == 0) return;
            float dt = Mathf.Min(Time.deltaTime, 1f / 30f);
            float floor = _groundY + _brickSize * 0.5f;
            for (int i = 0; i < _bricks.Length; i++)
            {
                if (_resting[i]) continue;
                Transform t = _bricks[i];
                Vector3 v = _velocity[i];
                v.y -= _gravity * dt;
                Vector3 p = t.position + v * dt;
                t.Rotate(_spin[i] * dt, Space.World);
                if (p.y < floor)
                {
                    p.y = floor;
                    if (v.y < -2f)
                    {
                        // Nảy: mất năng lượng mỗi lần chạm đất.
                        v.y = -v.y * 0.3f;
                        v.x *= 0.6f;
                        v.z *= 0.6f;
                        _spin[i] *= 0.5f;
                    }
                    else
                    {
                        v = Vector3.zero;
                        _resting[i] = true;
                        _active--;
                        // Đặt nằm phẳng theo trục gần nhất cho gọn.
                        Vector3 e = t.eulerAngles;
                        t.rotation = Quaternion.Euler(Mathf.Round(e.x / 90f) * 90f, e.y, Mathf.Round(e.z / 90f) * 90f);
                    }
                }
                _velocity[i] = v;
                t.position = p;
            }
        }
    }
}
