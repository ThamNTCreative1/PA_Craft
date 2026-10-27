using System.Collections.Generic;
using UnityEngine;

/// <summary>Creates completed blocks and shares their materials.</summary>
public class BuildBlockPlacer : MonoBehaviour
{
    [SerializeField] private Material placementFlash;
    private GameObject placedRoot;
    private readonly Dictionary<string, GameObject> replacedBlocks = new Dictionary<string, GameObject>();
    private readonly Dictionary<Color, Material> blockMaterials = new Dictionary<Color, Material>();
    private readonly Dictionary<Texture, Material> texturedMaterials = new Dictionary<Texture, Material>();
    private readonly List<Material> generatedMaterials = new List<Material>();

    public void Initialize()
    {
        if (placedRoot == null) placedRoot = new GameObject("Placed Blocks");
    }

    public void Place(BuildBlock block, Transform origin, string partName)
    {
        if (!string.IsNullOrEmpty(block.replacementKey) &&
            replacedBlocks.TryGetValue(block.replacementKey, out GameObject previous) && previous != null)
        {
            previous.SetActive(false);
            Destroy(previous);
        }
        GameObject placed;
        if (!string.IsNullOrEmpty(block.visualStyle))
        {
            placed = SampleBlockVisuals.Create(block, false, generatedMaterials, GetTexturedMaterial);
            placed.transform.SetParent(placedRoot.transform);
            placed.transform.position = block.WorldPosition(origin);
            placed.transform.rotation = origin != null ? origin.rotation : Quaternion.identity;
        }
        else if (block.prefab != null)
            placed = Instantiate(block.prefab, block.WorldPosition(origin),
                (origin != null ? origin.rotation : Quaternion.identity) * block.localRotation, placedRoot.transform);
        else
        {
            placed = GameObject.CreatePrimitive(PrimitiveType.Cube);
            placed.transform.SetParent(placedRoot.transform);
            placed.transform.position = block.WorldPosition(origin);
            placed.GetComponent<Renderer>().sharedMaterial = GetMaterial(block.color);
        }
        placed.name = $"{partName} - {block.type}";
        if (origin != null) placed.transform.localScale = Vector3.Scale(placed.transform.localScale, origin.lossyScale);
        Collider[] colliders=placed.GetComponentsInChildren<Collider>();
        foreach (Collider collider in colliders){collider.enabled=true;collider.isTrigger=false;}
        if(colliders.Length==0)
            foreach(var filter in placed.GetComponentsInChildren<MeshFilter>())
                if(filter.sharedMesh!=null)
                {
                    var box=filter.gameObject.AddComponent<BoxCollider>();
                    box.center=filter.sharedMesh.bounds.center;box.size=filter.sharedMesh.bounds.size;
                }
        if (partName == "Foundation" || partName == "Glowing foundation")
            WetGroundReflection.Exclude(placed);
        else
            WetGroundReflection.Include(placed);
        if (!string.IsNullOrEmpty(block.replacementKey))
            replacedBlocks[block.replacementKey] = placed;
        if(BuildCollisionWorld.Active!=null)BuildCollisionWorld.Active.Register(placed);
        placed.AddComponent<BlockPlacementEffect>().Play(placementFlash);
    }

    public Material GetMaterial([Bridge.Ref] Color color)
    {
        if (blockMaterials.TryGetValue(color, out Material material)) return material;
        material = GameplayMaterials.Create();
        material.color = color;
        blockMaterials.Add(color, material);
        return material;
    }

    private Material GetTexturedMaterial([Bridge.Ref] Color color, Texture texture)
    {
        if (texture == null) return GetMaterial(color);
        if (texturedMaterials.TryGetValue(texture, out Material material)) return material;
        material = GameplayMaterials.Create();
        material.name = texture.name + " Block Material";
        material.color = Color.white;
        material.mainTexture = texture;
        texturedMaterials.Add(texture, material);
        return material;
    }

    private void OnDestroy()
    {
        foreach (Material material in blockMaterials.Values)
            if (material != null) Destroy(material);
        foreach (Material material in texturedMaterials.Values)
            if (material != null) Destroy(material);
        foreach (Material material in generatedMaterials)
            if (material != null) Destroy(material);
    }
}
