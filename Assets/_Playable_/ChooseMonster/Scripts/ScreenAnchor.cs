using UnityEngine;

namespace Playable.ChooseMonster
{
    /// <summary>Giữ một phần tử UI (canvas Overlay) bám theo một điểm trong thế giới 3D.</summary>
    [DisallowMultipleComponent]
    public sealed class ScreenAnchor : MonoBehaviour
    {
        [SerializeField] private Camera _camera;
        [SerializeField] private Transform _target;
        [SerializeField] private Vector3 _worldOffset;
        [SerializeField] private Vector2 _screenOffset;
        [SerializeField] private bool _clampInside;
        [SerializeField] private RectTransform _avoid;

        private RectTransform _rect;
        private RectTransform _parent;

        public Transform Target
        {
            get => _target;
            set => _target = value;
        }

        public Vector3 WorldOffset
        {
            get => _worldOffset;
            set => _worldOffset = value;
        }

        public void Bind(Camera camera, Transform target, Vector3 worldOffset)
        {
            _camera = camera;
            _target = target;
            _worldOffset = worldOffset;
            Refresh();
        }

        private void OnEnable()
        {
            Refresh();
        }

        private void LateUpdate()
        {
            Refresh();
        }

        public void Refresh()
        {
            if (_camera == null || _target == null) return;
            if (_rect == null) _rect = (RectTransform)transform;
            if (_parent == null) _parent = _rect.parent as RectTransform;
            if (_parent == null) return;
            Vector3 screen = _camera.WorldToScreenPoint(_target.position + _worldOffset);
            if (screen.z < 0f) return;
            Vector2 local;
            if (RectTransformUtility.ScreenPointToLocalPointInRectangle(_parent, screen, null, out local))
            {
                _rect.anchorMin = _rect.anchorMax = new Vector2(0.5f, 0.5f);
                Vector2 position = local + _parent.rect.center * -1f + _screenOffset * Scale();
                if (_clampInside) position = Clamp(position);
                if (_avoid != null && _avoid.gameObject.activeInHierarchy) position = Avoid(position);
                _rect.anchoredPosition = position;
            }
        }

        /// <summary>Giữ toàn bộ phần tử nằm trong vùng an toàn của màn hình (không bị cắt mép / tai thỏ).</summary>
        private Vector2 Clamp(Vector2 position)
        {
            Rect area = SafeArea();
            Vector2 half = HalfSize(_rect);
            Vector2 pivotOffset = (_rect.pivot - new Vector2(0.5f, 0.5f)) * half * 2f;
            Vector2 centre = position - pivotOffset;
            centre.x = Mathf.Clamp(centre.x, area.xMin + half.x, Mathf.Max(area.xMin + half.x, area.xMax - half.x));
            centre.y = Mathf.Clamp(centre.y, area.yMin + half.y, Mathf.Max(area.yMin + half.y, area.yMax - half.y));
            return centre + pivotOffset;
        }

        /// <summary>Nếu chồng lên phần tử _avoid thì đẩy lên trên nó (hết chỗ thì đẩy xuống dưới).</summary>
        private Vector2 Avoid(Vector2 position)
        {
            Vector2 half = HalfSize(_rect);
            Vector2 otherHalf = HalfSize(_avoid);
            Vector2 other = _avoid.anchoredPosition;
            float gap = Mathf.Min(_parent.rect.width, _parent.rect.height) * 0.01f;
            if (Mathf.Abs(position.x - other.x) >= half.x + otherHalf.x + gap) return position;
            if (Mathf.Abs(position.y - other.y) >= half.y + otherHalf.y + gap) return position;
            Rect area = SafeArea();
            float above = other.y + otherHalf.y + gap + half.y;
            float below = other.y - otherHalf.y - gap - half.y;
            position.y = above + half.y <= area.yMax || !_clampInside ? above : below;
            return position;
        }

        private Rect SafeArea()
        {
            Rect r = _parent.rect;
            Rect safe = Screen.safeArea;
            if (Screen.width <= 0 || Screen.height <= 0 || safe.width <= 0f || safe.height <= 0f)
                safe = new Rect(0f, 0f, Screen.width, Screen.height);
            float sx = r.width / Mathf.Max(1, Screen.width);
            float sy = r.height / Mathf.Max(1, Screen.height);
            float margin = Mathf.Min(r.width, r.height) * 0.02f;
            return new Rect(
                r.xMin - r.center.x + safe.xMin * sx + margin,
                r.yMin - r.center.y + safe.yMin * sy + margin,
                safe.width * sx - margin * 2f,
                safe.height * sy - margin * 2f);
        }

        private static Vector2 HalfSize(RectTransform rect)
        {
            Vector3 s = rect.localScale;
            return new Vector2(rect.rect.width * Mathf.Abs(s.x), rect.rect.height * Mathf.Abs(s.y)) * 0.5f;
        }

        private float Scale()
        {
            Rect r = _parent.rect;
            return Mathf.Min(r.width, r.height) / 1080f;
        }
    }
}
