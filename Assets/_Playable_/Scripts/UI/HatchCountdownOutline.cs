using UnityEngine;
using UnityEngine.UI;
namespace Playable
{
    [RequireComponent(typeof(CanvasRenderer))]
    public class HatchCountdownOutline : MaskableGraphic
    {
        [SerializeField] private float _thickness = 7f;
        private float _progress;
        public float Progress { get => _progress; set { _progress = Mathf.Clamp01(value); SetVerticesDirty(); } }
        protected override void OnPopulateMesh(VertexHelper vh)
        {
            vh.Clear();
            Rect r = rectTransform.rect;
            float remaining = (r.width + r.height) * 2f * _progress;
            Vector2[] points = { new Vector2(r.center.x, r.yMax), new Vector2(r.xMax, r.yMax),
                new Vector2(r.xMax, r.yMin), new Vector2(r.xMin, r.yMin), new Vector2(r.xMin, r.yMax), new Vector2(r.center.x, r.yMax) };
            for (int i = 0; i < 5 && remaining > 0; i++)
            {
                Vector2 a = points[i], direction = points[i + 1] - a;
                float distance = Mathf.Min(remaining, direction.magnitude);
                Vector2 b = a + direction.normalized * distance;
                Vector2 normal = new Vector2(-direction.y, direction.x).normalized * _thickness * .5f;
                int start = vh.currentVertCount;
                vh.AddVert(a - normal, color, Vector2.zero); vh.AddVert(a + normal, color, Vector2.zero);
                vh.AddVert(b + normal, color, Vector2.zero); vh.AddVert(b - normal, color, Vector2.zero);
                vh.AddTriangle(start, start + 1, start + 2); vh.AddTriangle(start, start + 2, start + 3);
                remaining -= distance;
            }
        }
    }
}
