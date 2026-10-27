using System;
using UnityEngine;

[Serializable]
public class BlockDef
{
    public string name;
    public string displayName;
    public GameObject prefab;
    public Sprite icon;
    public int heightCells = 1;      // cửa = 2 ô theo chiều cao
    public int lengthCells = 1;      // giường = 2 ô theo hướng nhìn
    public bool faceCamera;          // xoay theo hướng nhìn (cửa, giường)
}

// Đặt block tại ô mà tâm màn hình (crosshair) đang nhắm, khi bấm nút PLACE.
public class BlockPlacer : MonoBehaviour
{
    public Camera cam;
    public Transform player;
    public Transform blocksRoot;
    public Transform preview;        // khung viền ô sẽ đặt
    public HotbarUI hotbar;
    public BlockDef[] pinkBlocks;
    public BlockDef[] blueBlocks;
    public float reach = 10f;
    public float cell = 0.75f;
    public Vector3 gridOrigin = new Vector3(9.975f, -7.025f, -46.725f);
    public LayerMask placeMask = ~0;
    public AudioSource sfx;
    public ParticleSystem placeFx;
    public bool inputEnabled;

    public int PlacedCount { get; private set; }
    public bool HasSelection { get { return selected >= 0; } }
    public bool CanPlace { get { return inputEnabled && selected >= 0 && hasTarget; } }
    public BlockDef Selected { get { return selected >= 0 ? active[selected] : null; } }
    public event Action<int> OnPlaced;
    public event Action<int> OnSelected;

    BlockDef[] active;
    int selected = -1;
    bool hasTarget;
    Vector3 targetCell;
    Quaternion targetRot = Quaternion.identity;

    public void SetPalette(bool pink)
    {
        active = pink ? pinkBlocks : blueBlocks;
        hotbar.Setup(active, this);
        selected = -1;
    }

    public void Select(int i)
    {
        if (active == null || i < 0 || i >= active.Length) return;
        selected = i;
        Sfx.Click();
        hotbar.SetSelected(i);
        if (OnSelected != null) OnSelected(i);
    }

    public Vector3 Snap(Vector3 p)
    {
        Vector3 q = p - gridOrigin;
        q.x = Mathf.Round(q.x / cell) * cell; q.y = Mathf.Round(q.y / cell) * cell; q.z = Mathf.Round(q.z / cell) * cell;
        return gridOrigin + q;
    }

    void Update()
    {
        hasTarget = false;
        if (inputEnabled && selected >= 0 && cam != null)
        {
            Ray ray = cam.ViewportPointToRay(new Vector3(0.5f, 0.5f, 0f));
            RaycastHit h;
            if (Physics.Raycast(ray, out h, reach, placeMask))
            {
                Vector3 c = Snap(h.point + h.normal * cell * 0.5f);
                var def = active[selected];
                Quaternion r = Quaternion.identity;
                if (def.faceCamera) r = Quaternion.Euler(0f, Mathf.Round(cam.transform.eulerAngles.y / 90f) * 90f, 0f);
                if (IsFree(c, def.heightCells, def.lengthCells, r)) { hasTarget = true; targetCell = c; targetRot = r; }
            }
        }
        if (preview != null)
        {
            preview.gameObject.SetActive(hasTarget);
            if (hasTarget)
            {
                var def = active[selected];
                int hc = Mathf.Max(1, def.heightCells), lc = Mathf.Max(1, def.lengthCells);
                preview.rotation = targetRot;
                preview.position = targetCell + Vector3.up * cell * (hc - 1) * 0.5f + targetRot * Vector3.forward * cell * (lc - 1) * 0.5f;
                preview.localScale = new Vector3(1f, hc, lc);
            }
        }
    }

    bool IsFree([Bridge.Ref] Vector3 c, int heightCells, int lengthCells, [Bridge.Ref] Quaternion rot)
    {
        Vector3 pl = player.position;
        Vector3 fwd = rot * Vector3.forward;
        for (int l = 0; l < Mathf.Max(1, lengthCells); l++)
        for (int k = 0; k < Mathf.Max(1, heightCells); k++)
        {
            Vector3 ck = Snap(c + Vector3.up * cell * k + fwd * cell * l);
            if (Physics.CheckBox(ck, Vector3.one * cell * 0.45f, Quaternion.identity, placeMask)) return false;
            if (Mathf.Abs(ck.x - pl.x) < cell * 0.9f && Mathf.Abs(ck.z - pl.z) < cell * 0.9f && ck.y > pl.y - 0.2f && ck.y < pl.y + 1.6f) return false;
        }
        return true;
    }

    public bool PlaceAtTarget()
    {
        if (!CanPlace) return false;
        var go = Instantiate(active[selected].prefab, targetCell, targetRot, blocksRoot);
        var pop = go.AddComponent<PopIn>(); pop.duration = 0.18f;
        var rs = go.GetComponentsInChildren<Renderer>();
        for (int i = 0; i < rs.Length; i++) BrightnessApplier.Apply(rs[i]);
        if (placeFx != null) { placeFx.transform.position = targetCell; placeFx.Play(); }
        Sfx.Place();
        PlacedCount++;
        hasTarget = false;
        if (OnPlaced != null) OnPlaced(PlacedCount);
        return true;
    }
}
