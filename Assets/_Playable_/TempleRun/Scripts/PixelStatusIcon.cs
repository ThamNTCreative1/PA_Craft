using UnityEngine;
using UnityEngine.UI;

namespace Playable.TempleRun
{
    [RequireComponent(typeof(CanvasRenderer))]
    public class PixelStatusIcon : MaskableGraphic
    {
        public bool armor;
        protected override void OnPopulateMesh(VertexHelper vh)
        {
            vh.Clear();
            string[] rows = armor
                ? new[] { ".##...##.", "#ss#.#ss#", "#sssssss#", ".#ss+ss#.", "..#sss#..", "..#sss#..", "..#####.." }
                : new[] { ".##.##...", "#rr#rr#..", "#r+rrr#..", "#rrrrr#..", ".#rrr#...", "..#r#....", "...#....." };
            float pixel = rectTransform.rect.width / 9f;
            for (int y = 0; y < rows.Length; y++) for (int x = 0; x < rows[y].Length; x++)
            {
                char c = rows[y][x]; if (c == '.') continue;
                Color32 tint = c == '#' ? new Color32(31, 22, 20, 255) : c == '+' ? new Color32(255, 255, 255, 255)
                    : armor ? new Color32(177, 187, 192, 255) : new Color32(239, 35, 43, 255);
                float px = (x - 4.5f) * pixel, py = (3.5f - y) * pixel;
                int n = vh.currentVertCount;
                vh.AddVert(new Vector3(px, py), tint, Vector2.zero);
                vh.AddVert(new Vector3(px, py + pixel), tint, Vector2.zero);
                vh.AddVert(new Vector3(px + pixel, py + pixel), tint, Vector2.zero);
                vh.AddVert(new Vector3(px + pixel, py), tint, Vector2.zero);
                vh.AddTriangle(n, n + 1, n + 2); vh.AddTriangle(n, n + 2, n + 3);
            }
        }
    }
}
