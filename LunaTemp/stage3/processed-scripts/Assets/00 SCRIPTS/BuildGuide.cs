using System.Collections.Generic;
using UnityEngine;
using UnityEngine.Rendering;

/// <summary>The single dashed target that the player can tap to build.</summary>
public class BuildGuide : MonoBehaviour
{
    private GameObject targetCube;
    private Collider targetCollider;
    private Material faceMaterial;
    private Material outlineMaterial;
    private Mesh outlineMesh;
    private BuildingPart currentPart;

    public int SelectedIndex { get; private set; } = -1;
    public int SelectedPartIndex { get; private set; } = -1;
    public bool Visible => SelectedIndex >= 0 && targetCube.activeSelf;
    public Vector3 TargetPosition => targetCube!=null?targetCube.transform.position:Vector3.zero;

    public void Initialize()
    {
        targetCube = GameObject.CreatePrimitive(PrimitiveType.Cube);
        targetCube.name = "Build Guide Target";
        targetCube.layer = 2; // Ignore Raycast: guide has its own direct collider hit test.
        targetCube.transform.SetParent(transform, false);
        targetCollider = targetCube.GetComponent<Collider>();
        faceMaterial = MakeFaceMaterial();
        targetCube.GetComponent<Renderer>().sharedMaterial = faceMaterial;

        GameObject outline = new GameObject("Dashed Outline");
        outline.transform.SetParent(targetCube.transform, false);
        outlineMesh = CreateDashedFrameMesh();
        outline.AddComponent<MeshFilter>().sharedMesh = outlineMesh;
        outlineMaterial = GameplayMaterials.CreateGuideOverlay();
        outlineMaterial.name = "Guide White Dashes";
        outlineMaterial.color = Color.white;
        outline.AddComponent<MeshRenderer>().sharedMaterial = outlineMaterial;
    }

    public bool TryGetBlockUnderPointer(Camera camera, [Bridge.Ref] Vector2 position, out int blockIndex)
    {
        blockIndex = -1;
        if (!Visible || !targetCollider.Raycast(camera.ScreenPointToRay(position), out RaycastHit hit, 100f))
            return false;
        blockIndex = SelectedIndex;
        return true;
    }

    public void Hide()
    {
        SelectedIndex = -1;
        SelectedPartIndex = -1;
        currentPart = null;
        if (targetCube != null) targetCube.SetActive(false);
    }

    public void ShowBest(List<BuildingPart> parts, Camera camera, Transform origin, bool force, string[] selectedTypes=null)
    {
        int bestIndex = -1;
        int bestPart = -1;
        float bestScore = float.NegativeInfinity;
        for(int p=0;p<parts.Count;p++)
        {
        BuildingPart part=parts[p];
        for (int i = 0; i < part.blocks.Count; i++)
        {
            BuildBlock block = part.blocks[i];
            if (block.built) continue;
            if(selectedTypes!=null && !MatchesType(block.type,selectedTypes))continue;
            Bounds bounds = SampleBlockVisuals.GetLocalBounds(block);
            Vector3 target = origin != null
                ? origin.TransformPoint(block.localPosition + bounds.center)
                : block.localPosition + bounds.center;
            Vector3 offset = target - camera.transform.position;
            float score = Vector3.Dot(camera.transform.forward, offset.normalized);
            if(score<=0 && selectedTypes==null)continue;
            Vector3 viewport = camera.WorldToViewportPoint(target);
            bool onScreen = viewport.z > 0f && viewport.x > 0.05f && viewport.x < 0.95f
                && viewport.y > 0.05f && viewport.y < 0.95f;
            // Prefer the gaze direction, then proximity; tiny hysteresis avoids flicker.
            score-=offset.magnitude*.001f;
            if (onScreen) score += 2f;
            if (!force && p==SelectedPartIndex && i == SelectedIndex) score += 0.002f;
            if (score <= bestScore) continue;
            bestScore = score;
            bestIndex = i;
            bestPart = p;
        }
        }

        if (bestIndex < 0)
        {
            Hide();
            return;
        }
        SelectedIndex = bestIndex;
        SelectedPartIndex = bestPart;
        currentPart=parts[bestPart];
        BuildBlock selected = currentPart.blocks[bestIndex];
        Bounds selectedBounds = SampleBlockVisuals.GetLocalBounds(selected);
        targetCube.transform.position = origin != null
            ? origin.TransformPoint(selected.localPosition + selectedBounds.center)
            : selected.localPosition + selectedBounds.center;
        targetCube.transform.rotation = origin != null ? origin.rotation : Quaternion.identity;
        Vector3 scale = origin != null ? origin.lossyScale : Vector3.one;
        targetCube.transform.localScale = Vector3.Scale(selectedBounds.size,
            new Vector3(Mathf.Abs(scale.x), Mathf.Abs(scale.y), Mathf.Abs(scale.z)));
        targetCube.SetActive(true);
    }

    private static bool MatchesType(string type,string[] types)
    {
        foreach(string candidate in types)if(candidate==type)return true;
        return false;
    }

    private static Material MakeFaceMaterial()
    {
        Material material = GameplayMaterials.Create(transparentSurface: true);
        material.name = "Guide Transparent Face";
        material.SetFloat("_Mode", 2f);
        material.SetInt("_SrcBlend", (int)BlendMode.SrcAlpha);
        material.SetInt("_DstBlend", (int)BlendMode.OneMinusSrcAlpha);
        material.SetInt("_ZWrite", 0);
        material.DisableKeyword("_ALPHATEST_ON");
        material.EnableKeyword("_ALPHABLEND_ON");
        material.DisableKeyword("_ALPHAPREMULTIPLY_ON");
        material.renderQueue = (int)RenderQueue.Transparent;
        material.color = new Color(0.35f, 0.9f, 1f, 0.22f);
        GameplayMaterials.ConfigureTransparency(material);
        return material;
    }

    private static Mesh CreateDashedFrameMesh()
    {
        Mesh mesh = new Mesh { name = "Guide Dashed Outline" };
        List<Vector3> vertices = new List<Vector3>();
        List<int> triangles = new List<int>();
        const float thickness = 0.028f;
        const float dashLength = 0.18f;
        const int dashCount = 4;
        float gap = (1f - dashCount * dashLength) / (dashCount - 1);
        for (int axis = 0; axis < 3; axis++)
            for (int sideA = -1; sideA <= 1; sideA += 2)
                for (int sideB = -1; sideB <= 1; sideB += 2)
                    for (int dash = 0; dash < dashCount; dash++)
                    {
                        float along = -0.5f + dash * (dashLength + gap) + dashLength * 0.5f;
                        Vector3 center = Vector3.zero;
                        Vector3 size = Vector3.one * thickness;
                        center[axis] = along;
                        center[(axis + 1) % 3] = sideA * 0.505f;
                        center[(axis + 2) % 3] = sideB * 0.505f;
                        size[axis] = dashLength;
                        AppendBox(vertices, triangles, center, size);
                    }
        mesh.SetVertices(vertices);
        mesh.SetTriangles(triangles, 0);
        mesh.RecalculateNormals();
        return mesh;
    }

    private static void AppendBox(List<Vector3> vertices, List<int> triangles, [Bridge.Ref] Vector3 center, [Bridge.Ref] Vector3 size)
    {
        Vector3 half = size * 0.5f;
        int first = vertices.Count;
        vertices.Add(center + new Vector3(-half.x, -half.y, -half.z));
        vertices.Add(center + new Vector3(half.x, -half.y, -half.z));
        vertices.Add(center + new Vector3(half.x, half.y, -half.z));
        vertices.Add(center + new Vector3(-half.x, half.y, -half.z));
        vertices.Add(center + new Vector3(-half.x, -half.y, half.z));
        vertices.Add(center + new Vector3(half.x, -half.y, half.z));
        vertices.Add(center + new Vector3(half.x, half.y, half.z));
        vertices.Add(center + new Vector3(-half.x, half.y, half.z));
        int[] faces = {
            0, 2, 1, 0, 3, 2, 4, 5, 6, 4, 6, 7,
            0, 4, 7, 0, 7, 3, 1, 2, 6, 1, 6, 5,
            0, 1, 5, 0, 5, 4, 3, 7, 6, 3, 6, 2
        };
        foreach (int index in faces) triangles.Add(first + index);
    }

    private void OnDestroy()
    {
        if (faceMaterial != null) Destroy(faceMaterial);
        if (outlineMaterial != null) Destroy(outlineMaterial);
        if (outlineMesh != null) Destroy(outlineMesh);
    }
}
