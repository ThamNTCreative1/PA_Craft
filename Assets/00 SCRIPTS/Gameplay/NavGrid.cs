using System.Collections.Generic;
using UnityEngine;

// Path finding for monsters and bots (the source used NavMeshAgent, a no-op stub in Luna):
// A* over the baked walkable grid (8 neighbours, no corner cutting), then the path is shortened with grid line checks.
public class NavGrid : MonoBehaviour
{
    [SerializeField] private NavGridData data;
    [Tooltip("A* gives up after this many expanded cells and returns the path to the closest cell reached.")]
    [SerializeField] private int maxExpanded = 6000;

    private int sizeX, sizeZ, count;
    private float cell;
    private Vector3 origin;
    private float[] g;
    private int[] parent;
    private int[] seen;
    private int[] closed;
    private int stamp;
    private int[] heap;
    private float[] heapF;
    private int heapCount;
    private readonly List<int> cellPath = new List<int>();

    private static readonly int[] DX = { 1, -1, 0, 0, 1, 1, -1, -1 };
    private static readonly int[] DZ = { 0, 0, 1, -1, 1, -1, 1, -1 };

    public bool Ready { get { return count > 0; } }

    private void Awake()
    {
        if (data == null || data.walkable == null) return;
        sizeX = data.sizeX;
        sizeZ = data.sizeZ;
        count = sizeX * sizeZ;
        cell = data.cellSize;
        origin = data.origin;
        g = new float[count];
        parent = new int[count];
        seen = new int[count];
        closed = new int[count];
        heap = new int[count * 2 + 16];
        heapF = new float[count * 2 + 16];
    }

    // ---------- cells ----------
    private int CellX(float x) { return Mathf.FloorToInt((x - origin.x) / cell); }
    private int CellZ(float z) { return Mathf.FloorToInt((z - origin.z) / cell); }
    private bool Inside(int x, int z) { return x >= 0 && z >= 0 && x < sizeX && z < sizeZ; }
    private bool Walk(int x, int z) { return Inside(x, z) && data.walkable[z * sizeX + x] != 0; }

    private Vector3 Center(int index)
    {
        int x = index % sizeX, z = index / sizeX;
        return new Vector3(origin.x + (x + 0.5f) * cell, Height(index), origin.z + (z + 0.5f) * cell);
    }

    private float Height(int index)
    {
        int lo = data.heights[index * 2], hi = data.heights[index * 2 + 1];
        return data.minHeight + (lo | (hi << 8)) * data.heightStep;
    }

    public bool IsWalkable(Vector3 p) { return Ready && Walk(CellX(p.x), CellZ(p.z)); }

    // Ground height under p (the nearest walkable cell's height when p is off the grid).
    public float HeightAt(Vector3 p)
    {
        if (!Ready) return p.y;
        int x = CellX(p.x), z = CellZ(p.z);
        if (Walk(x, z)) return Height(z * sizeX + x);
        int n = NearestWalkable(x, z, 4);
        return n >= 0 ? Height(n) : p.y;
    }

    // Closest walkable cell within 'radius' cells (spiral rings), -1 if none.
    private int NearestWalkable(int x, int z, int radius)
    {
        if (Walk(x, z)) return z * sizeX + x;
        for (int r = 1; r <= radius; r++)
        {
            for (int i = -r; i <= r; i++)
            {
                if (Walk(x + i, z - r)) return (z - r) * sizeX + x + i;
                if (Walk(x + i, z + r)) return (z + r) * sizeX + x + i;
                if (Walk(x - r, z + i)) return (z + i) * sizeX + x - r;
                if (Walk(x + r, z + i)) return (z + i) * sizeX + x + r;
            }
        }
        return -1;
    }

    // Walkable point near p (p itself when walkable).
    public Vector3 ClosestWalkable(Vector3 p, int radiusCells)
    {
        if (!Ready) return p;
        int n = NearestWalkable(CellX(p.x), CellZ(p.z), radiusCells);
        if (n < 0) return p;
        if (n == CellZ(p.z) * sizeX + CellX(p.x)) return new Vector3(p.x, Height(n), p.z);
        return Center(n);
    }

    // Random walkable point within 'radius' metres of center (center when none found).
    public Vector3 RandomPointNear(Vector3 center, float radius)
    {
        for (int i = 0; i < 12; i++)
        {
            Vector2 r = Random.insideUnitCircle * radius;
            Vector3 p = new Vector3(center.x + r.x, center.y, center.z + r.y);
            if (IsWalkable(p)) return new Vector3(p.x, HeightAt(p), p.z);
        }
        return ClosestWalkable(center, 6);
    }

    // Straight walk from a to b stays on walkable cells (sampled every half cell).
    public bool LineWalkable(Vector3 a, Vector3 b)
    {
        Vector3 d = b - a; d.y = 0;
        float len = d.magnitude;
        int steps = Mathf.CeilToInt(len / (cell * 0.5f));
        for (int i = 0; i <= steps; i++)
        {
            Vector3 p = steps > 0 ? a + d * (i / (float)steps) : a;
            if (!Walk(CellX(p.x), CellZ(p.z))) return false;
        }
        return true;
    }

    // ---------- A* ----------
    private float H(int a, int b)
    {
        int ax = a % sizeX, az = a / sizeX, bx = b % sizeX, bz = b / sizeX;
        int dx = Mathf.Abs(ax - bx), dz = Mathf.Abs(az - bz);
        return dx > dz ? dx + 0.4142f * dz : dz + 0.4142f * dx;
    }

    private void Push(int i, float f)
    {
        if (heapCount >= heap.Length) return;
        int k = heapCount++;
        while (k > 0)
        {
            int p = (k - 1) >> 1;
            if (heapF[p] <= f) break;
            heap[k] = heap[p]; heapF[k] = heapF[p]; k = p;
        }
        heap[k] = i; heapF[k] = f;
    }

    private int Pop()
    {
        int top = heap[0];
        heapCount--;
        if (heapCount > 0)
        {
            int last = heap[heapCount]; float lf = heapF[heapCount];
            int k = 0;
            while (true)
            {
                int c = k * 2 + 1;
                if (c >= heapCount) break;
                if (c + 1 < heapCount && heapF[c + 1] < heapF[c]) c++;
                if (heapF[c] >= lf) break;
                heap[k] = heap[c]; heapF[k] = heapF[c]; k = c;
            }
            heap[k] = last; heapF[k] = lf;
        }
        return top;
    }

    // Fills 'path' with corner points from 'from' to 'to' (excluding the start). Returns false when no walkable
    // start/goal; when the goal can't be reached, the path leads to the closest cell found.
    public bool FindPath(Vector3 from, Vector3 to, List<Vector3> path)
    {
        path.Clear();
        if (!Ready) { path.Add(to); return true; }
        int s = NearestWalkable(CellX(from.x), CellZ(from.z), 6);
        int goal = NearestWalkable(CellX(to.x), CellZ(to.z), 8);
        if (s < 0 || goal < 0) return false;
        if (s == goal || LineWalkable(from, to)) { path.Add(new Vector3(to.x, HeightAt(to), to.z)); return true; }

        stamp++;
        heapCount = 0;
        g[s] = 0; parent[s] = -1; seen[s] = stamp;
        Push(s, H(s, goal));
        int best = s; float bestH = H(s, goal);
        int expanded = 0;
        bool found = false;
        while (heapCount > 0)
        {
            int cur = Pop();
            if (closed[cur] == stamp) continue;
            closed[cur] = stamp;
            if (cur == goal) { found = true; break; }
            float h = H(cur, goal);
            if (h < bestH) { bestH = h; best = cur; }
            if (++expanded > maxExpanded) break;
            int cx = cur % sizeX, cz = cur / sizeX;
            for (int k = 0; k < 8; k++)
            {
                int nx = cx + DX[k], nz = cz + DZ[k];
                if (!Walk(nx, nz)) continue;
                if (k >= 4 && (!Walk(cx + DX[k], cz) || !Walk(cx, cz + DZ[k]))) continue;
                int n = nz * sizeX + nx;
                if (closed[n] == stamp) continue;
                float ng = g[cur] + (k >= 4 ? 1.4142f : 1f);
                if (seen[n] != stamp || ng < g[n])
                {
                    seen[n] = stamp; g[n] = ng; parent[n] = cur;
                    Push(n, ng + H(n, goal));
                }
            }
        }
        int end = found ? goal : best;

        cellPath.Clear();
        for (int c = end; c >= 0; c = parent[c]) { cellPath.Add(c); if (c == s) break; }
        cellPath.Reverse();

        // String pulling: keep only the cells where the straight line breaks
        Vector3 anchor = from;
        for (int i = 1; i < cellPath.Count; i++)
        {
            Vector3 next = Center(cellPath[i]);
            if (!LineWalkable(anchor, next))
            {
                Vector3 corner = Center(cellPath[i - 1]);
                path.Add(corner);
                anchor = corner;
            }
        }
        Vector3 last = found && IsWalkable(to) ? new Vector3(to.x, HeightAt(to), to.z) : Center(end);
        path.Add(last);
        return true;
    }
}
