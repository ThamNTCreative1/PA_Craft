using UnityEngine;

namespace Playable.CutRope
{
    /// <summary>
    /// Dây mô phỏng verlet: điểm đầu ghim vào xà (_top), điểm cuối ghim vào móc của vật treo (_bottom).
    /// Mỗi đoạn dây là 1 khối trụ (_segments) được kéo giãn giữa 2 điểm liên tiếp.
    /// Cut(i) bỏ ràng buộc giữa điểm i và i+1: nửa trên lủng lẳng ở xà, nửa dưới đi theo vật rơi.
    /// </summary>
    public sealed class RopeView : MonoBehaviour
    {
        [SerializeField] private Transform _top;
        [SerializeField] private Transform _bottom;
        [SerializeField] private Transform[] _segments;
        [SerializeField] private float _thickness = 0.09f;
        [SerializeField] private float _gravity = 14f;
        [SerializeField] private float _damping = 0.985f;
        [SerializeField] private int _iterations = 14;

        private Vector3[] _points;
        private Vector3[] _previous;
        private float _linkLength;
        private int _cutLink = -1;
        private bool _bottomPinned = true;

        public bool IsCut => _cutLink >= 0;
        public int LinkCount => _segments.Length;

        private void Awake()
        {
            Init();
        }

        private void Init()
        {
            if (_points != null) return;
            int count = _segments.Length + 1;
            _points = new Vector3[count];
            _previous = new Vector3[count];
            Vector3 a = _top.position;
            Vector3 b = _bottom.position;
            for (int i = 0; i < count; i++)
            {
                _points[i] = Vector3.Lerp(a, b, i / (float)(count - 1));
                _previous[i] = _points[i];
            }
            _linkLength = Vector3.Distance(a, b) / (count - 1);
            Render();
        }

        /// <summary>Thả nửa dưới khỏi vật treo (sau khi vật đã rơi chạm đất).</summary>
        public void ReleaseBottom()
        {
            _bottomPinned = false;
        }

        public void Cut(int link)
        {
            if (IsCut) return;
            _cutLink = Mathf.Clamp(link, 1, _segments.Length - 2);
            _segments[_cutLink].gameObject.SetActive(false);
            // Giật nhẹ 2 đầu vừa đứt cho có cảm giác dây bị bật ra.
            _previous[_cutLink] -= Vector3.right * 0.05f;
            _previous[_cutLink + 1] += Vector3.right * 0.05f;
        }

        private void LateUpdate()
        {
            Init();
            float dt = Mathf.Min(Time.deltaTime, 1f / 30f);
            Vector3 g = Vector3.down * (_gravity * dt * dt);
            int last = _points.Length - 1;

            for (int i = 1; i < last + 1; i++)
            {
                if (i == last && _bottomPinned) continue;
                Vector3 p = _points[i];
                _points[i] += (p - _previous[i]) * _damping + g;
                _previous[i] = p;
            }

            for (int k = 0; k < _iterations; k++)
            {
                _points[0] = _top.position;
                if (_bottomPinned) _points[last] = _bottom.position;
                for (int i = 0; i < last; i++)
                {
                    if (i == _cutLink) continue;
                    Vector3 delta = _points[i + 1] - _points[i];
                    float d = delta.magnitude;
                    if (d < 1e-5f) continue;
                    float diff = (d - _linkLength) / d;
                    bool fixA = i == 0;
                    bool fixB = i + 1 == last && _bottomPinned;
                    if (fixA && fixB) continue;
                    if (fixA) _points[i + 1] -= delta * diff;
                    else if (fixB) _points[i] += delta * diff;
                    else
                    {
                        _points[i] += delta * (diff * 0.5f);
                        _points[i + 1] -= delta * (diff * 0.5f);
                    }
                }
            }

            _points[0] = _top.position;
            if (_bottomPinned) _points[last] = _bottom.position;
            Render();
        }

        private void Render()
        {
            for (int i = 0; i < _segments.Length; i++)
            {
                Transform s = _segments[i];
                if (!s.gameObject.activeSelf) continue;
                Vector3 a = _points[i];
                Vector3 b = _points[i + 1];
                Vector3 dir = b - a;
                float len = dir.magnitude;
                s.position = (a + b) * 0.5f;
                if (len > 1e-5f) s.rotation = Quaternion.FromToRotation(Vector3.up, dir / len);
                // Mesh trụ mặc định cao 2 đơn vị; nối dài một chút để các khớp không hở.
                s.localScale = new Vector3(_thickness, len * 0.5f + _thickness * 0.25f, _thickness);
            }
        }

        /// <summary>Đường vuốt (màn hình) cắt qua đoạn dây nào? Trả về -1 nếu không cắt.</summary>
        public int HitBySwipe(Camera cam, Vector2 from, Vector2 to)
        {
            if (IsCut || (to - from).sqrMagnitude < 1f) return -1;
            Vector2 prev = Project(cam, 0);
            for (int i = 0; i < _segments.Length; i++)
            {
                Vector2 next = Project(cam, i + 1);
                if (SegmentsIntersect(from, to, prev, next)) return i;
                prev = next;
            }
            return -1;
        }

        /// <summary>Điểm chạm (màn hình) nằm sát dây trong bán kính radius pixel? Trả về đoạn gần nhất.</summary>
        public int HitByTap(Camera cam, Vector2 point, float radius)
        {
            if (IsCut) return -1;
            int best = -1;
            float bestDist = radius;
            Vector2 prev = Project(cam, 0);
            for (int i = 0; i < _segments.Length; i++)
            {
                Vector2 next = Project(cam, i + 1);
                float d = DistanceToSegment(point, prev, next);
                if (d <= bestDist)
                {
                    bestDist = d;
                    best = i;
                }
                prev = next;
            }
            return best;
        }

        /// <summary>Điểm giữa dây (thế giới) — chỗ đặt bàn tay hướng dẫn.</summary>
        public Vector3 PointAt(float t)
        {
            Init();
            float f = Mathf.Clamp01(t) * (_points.Length - 1);
            int i = Mathf.Min(Mathf.FloorToInt(f), _points.Length - 2);
            return Vector3.Lerp(_points[i], _points[i + 1], f - i);
        }

        private Vector2 Project(Camera cam, int index)
        {
            Vector3 s = cam.WorldToScreenPoint(_points[index]);
            return new Vector2(s.x, s.y);
        }

        private static float Cross(Vector2 a, Vector2 b)
        {
            return a.x * b.y - a.y * b.x;
        }

        private static bool SegmentsIntersect(Vector2 p1, Vector2 p2, Vector2 q1, Vector2 q2)
        {
            Vector2 r = p2 - p1;
            Vector2 s = q2 - q1;
            float denom = Cross(r, s);
            if (Mathf.Abs(denom) < 1e-6f) return false;
            Vector2 qp = q1 - p1;
            float t = Cross(qp, s) / denom;
            float u = Cross(qp, r) / denom;
            return t >= 0f && t <= 1f && u >= 0f && u <= 1f;
        }

        private static float DistanceToSegment(Vector2 p, Vector2 a, Vector2 b)
        {
            Vector2 ab = b - a;
            float len2 = ab.sqrMagnitude;
            float t = len2 > 1e-6f ? Mathf.Clamp01(Vector2.Dot(p - a, ab) / len2) : 0f;
            return Vector2.Distance(p, a + ab * t);
        }
    }
}
