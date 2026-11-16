using System;

namespace Playable.CartRescue.Core
{
    /// <summary>Gán mỗi nhân vật vào một ô đứng, không trùng, giữ thứ tự trái→phải (không ai phải "đi xuyên" người khác).</summary>
    public static class SlotAssigner
    {
        /// <param name="positions">Toạ độ dọc sàn của từng nhân vật (thứ tự bất kỳ).</param>
        /// <param name="slots">Tâm các ô, tăng dần; số ô ≥ số nhân vật.</param>
        /// <returns>Chỉ số ô cho từng nhân vật, cùng thứ tự với <paramref name="positions"/>.</returns>
        public static int[] Assign(float[] positions, float[] slots)
        {
            int n = positions.Length, m = slots.Length;
            if (n > m) throw new ArgumentException("More riders than slots");
            var order = new int[n];
            for (int i = 0; i < n; i++) order[i] = i;
            Array.Sort(order, (a, b) => positions[a].CompareTo(positions[b]));

            // Quy hoạch động: cost[i, j] = tổng khoảng cách nhỏ nhất khi i nhân vật đầu (đã sắp) dùng các ô trong j ô đầu.
            var cost = new float[n + 1, m + 1];
            for (int i = 1; i <= n; i++) cost[i, 0] = float.MaxValue;
            for (int i = 1; i <= n; i++)
            for (int j = 1; j <= m; j++)
            {
                float skip = cost[i, j - 1];
                float prev = cost[i - 1, j - 1];
                float take = prev == float.MaxValue ? float.MaxValue : prev + Math.Abs(positions[order[i - 1]] - slots[j - 1]);
                cost[i, j] = Math.Min(skip, take);
            }

            var result = new int[n];
            for (int i = n, j = m; i > 0; j--)
            {
                if (cost[i, j] == cost[i, j - 1] && j - 1 >= i) continue;
                result[order[i - 1]] = j - 1;
                i--;
            }
            return result;
        }
    }
}
