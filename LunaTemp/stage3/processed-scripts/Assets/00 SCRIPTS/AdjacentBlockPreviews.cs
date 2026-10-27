using System.Collections.Generic;
using UnityEngine;
using UnityEngine.Rendering;

/// <summary>Revealed neighbours stay visible until their blocks are built.</summary>
public class AdjacentBlockPreviews : MonoBehaviour
{
    [Range(0f, 1f)] [SerializeField] private float opacity = 0.38f;

    private sealed class PreviewEntry
    {
        public GameObject visual;
        public List<Material> materials;
    }
    private readonly Dictionary<BuildBlock, PreviewEntry> previews = new Dictionary<BuildBlock, PreviewEntry>();
    private readonly List<Material> previewMaterials = new List<Material>();

    public int VisibleCount => previews.Count;

    public void ShowAdjacent(IEnumerable<BuildingPart> parts, BuildBlock placedBlock, Transform origin)
    {
        RemovePreview(placedBlock);
        foreach (BuildingPart part in parts)
        foreach (BuildBlock block in part.blocks)
        {
            if (block.built)
            {
                RemovePreview(block);
                continue;
            }
            if (previews.ContainsKey(block) || !block.IsFaceNeighbourOf(placedBlock)) continue;
            int materialStart = previewMaterials.Count;
            GameObject preview = CreatePreview(block, origin);
            preview.name = $"Preview - {part.name} - {block.type}";
            previews.Add(block, new PreviewEntry {
                visual = preview,
                materials = previewMaterials.GetRange(materialStart, previewMaterials.Count - materialStart)
            });
        }
    }

    public void Clear()
    {
        foreach (PreviewEntry entry in previews.Values)
        {
            GameObject preview = entry.visual;
            if (preview == null) continue;
            preview.SetActive(false);
            Destroy(preview);
        }
        previews.Clear();
        foreach (Material material in previewMaterials)
            if (material != null) Destroy(material);
        previewMaterials.Clear();
    }

    private void RemovePreview(BuildBlock block)
    {
        if (!previews.TryGetValue(block, out PreviewEntry entry)) return;
        if (entry.visual != null)
        {
            entry.visual.SetActive(false);
            Destroy(entry.visual);
        }
        foreach (Material material in entry.materials)
        {
            previewMaterials.Remove(material);
            if (material != null) Destroy(material);
        }
        previews.Remove(block);
    }

    private GameObject CreatePreview(BuildBlock block, Transform origin)
    {
        if (!string.IsNullOrEmpty(block.visualStyle))
        {
            GameObject styled = SampleBlockVisuals.Create(block, true, previewMaterials, null, opacity);
            styled.transform.SetParent(transform);
            styled.transform.position = block.WorldPosition(origin);
            styled.transform.rotation = origin != null ? origin.rotation : Quaternion.identity;
            return styled;
        }
        GameObject root = new GameObject("Block Preview");
        root.transform.SetParent(transform);
        root.transform.position = block.WorldPosition(origin);
        root.transform.rotation = (origin != null ? origin.rotation : Quaternion.identity) * block.localRotation;

        bool hasPrefabVisual = false;
        if (block.prefab != null)
        {
            root.transform.localScale = block.prefab.transform.localScale;
            if (origin != null) root.transform.localScale = Vector3.Scale(root.transform.localScale, origin.lossyScale);
            hasPrefabVisual = CopyVisuals(block.prefab.transform, root.transform, block.color);
        }
        if (!hasPrefabVisual)
        {
            GameObject cube = GameObject.CreatePrimitive(PrimitiveType.Cube);
            cube.name = "Block Shape";
            cube.transform.SetParent(root.transform, false);
            cube.GetComponent<Collider>().enabled = false;
            cube.GetComponent<Renderer>().sharedMaterial = MakeTransparentMaterial(null, block.color);
        }
        return root;
    }

    private bool CopyVisuals(Transform source, Transform destination, [Bridge.Ref] Color fallbackColor)
    {
        bool copied = false;
        MeshFilter sourceMesh = source.GetComponent<MeshFilter>();
        MeshRenderer sourceRenderer = source.GetComponent<MeshRenderer>();
        if (sourceMesh != null && sourceRenderer != null && sourceMesh.sharedMesh != null)
        {
            destination.gameObject.AddComponent<MeshFilter>().sharedMesh = sourceMesh.sharedMesh;
            MeshRenderer targetRenderer = destination.gameObject.AddComponent<MeshRenderer>();
            Material[] originals = sourceRenderer.sharedMaterials;
            Material[] transparent = new Material[originals.Length];
            for (int i = 0; i < originals.Length; i++)
                transparent[i] = MakeTransparentMaterial(originals[i], fallbackColor);
            targetRenderer.sharedMaterials = transparent;
            copied = true;
        }

        foreach (Transform sourceChild in source)
        {
            GameObject child = new GameObject(sourceChild.name);
            child.transform.SetParent(destination, false);
            child.transform.localPosition = sourceChild.localPosition;
            child.transform.localRotation = sourceChild.localRotation;
            child.transform.localScale = sourceChild.localScale;
            copied |= CopyVisuals(sourceChild, child.transform, fallbackColor);
        }
        return copied;
    }

    private Material MakeTransparentMaterial(Material source, Color fallbackColor)
    {
        Material material = GameplayMaterials.Create(transparentSurface: true);
        material.name = "Transparent Block Preview";
        material.SetFloat("_Mode", 2f);
        material.SetInt("_SrcBlend", (int)BlendMode.SrcAlpha);
        material.SetInt("_DstBlend", (int)BlendMode.OneMinusSrcAlpha);
        material.SetInt("_ZWrite", 0);
        material.DisableKeyword("_ALPHATEST_ON");
        material.EnableKeyword("_ALPHABLEND_ON");
        material.DisableKeyword("_ALPHAPREMULTIPLY_ON");
        material.renderQueue = (int)RenderQueue.Transparent;
        Color color = source != null && (source.HasProperty("_BaseColor") || source.HasProperty("_Color")) ? source.color : fallbackColor;
        color.a = opacity;
        material.color = color;
        if (source != null && source.mainTexture != null)
        {
            material.mainTexture = source.mainTexture;
            material.mainTextureScale = source.mainTextureScale;
            material.mainTextureOffset = source.mainTextureOffset;
        }
        previewMaterials.Add(material);
        GameplayMaterials.ConfigureTransparency(material);
        return material;
    }

    private void OnDestroy()
    {
        Clear();
    }
}
