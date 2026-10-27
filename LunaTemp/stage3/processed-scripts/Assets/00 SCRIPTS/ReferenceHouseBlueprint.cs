using System.Collections.Generic;
using UnityEngine;

/// <summary>Build the approved house from its actual prefab pieces, not procedural substitutes.</summary>
public static class ReferenceHouseBlueprint
{
    static readonly string[] Order = {
        "Foundation", "Pink Carpet", "Corner Base", "Side Fence", "Rear Fence",
        "Stone Pillar", "Side Glass", "Rear Glass", "Pink Lattice Roof", "Ivory Roof Rim",
        "Side Canopy", "Ivory Sign Backing", "Bone Sign", "Water Basin", "Purple Decor", "Hanging Lantern"
    };

    public static List<BuildingPart> Create(GameObject reference)
    {
        var result = new List<BuildingPart>();
        foreach (string name in Order)
        {
            var part = new BuildingPart { name = name };
            foreach (Transform piece in reference.transform)
            {
                if (piece.name != name) continue;
                Bounds bounds = PieceBounds(piece, reference.transform);
                if (name == "Side Fence" || name == "Rear Fence")
                {
                    // Fence is offset within its cell; the guide covers one full cube in height.
                    Vector3 size = bounds.size;
                    Vector3 center = bounds.center;
                    size.y = 1f;
                    center.y = .5f;
                    bounds = new Bounds(center, size);
                }
                // Use the actual model bounds, including the full underground foundation.
                // The dashed overlay remains visible through the surrounding terrain.
                part.blocks.Add(new BuildBlock {
                    type = name, prefab = piece.gameObject, localPosition = piece.localPosition,
                    localRotation = piece.localRotation, hasCustomBounds = true, customBounds = bounds
                });
            }
            if (part.blocks.Count > 0) result.Add(part);
        }
        return result;
    }

    static Bounds PieceBounds(Transform piece, Transform root)
    {
        Bounds result = new Bounds(); bool first = true;
        foreach (MeshFilter filter in piece.GetComponentsInChildren<MeshFilter>(true))
        {
            if (filter.sharedMesh == null) continue;
            Bounds b = filter.sharedMesh.bounds;
            Matrix4x4 matrix = root.worldToLocalMatrix * filter.transform.localToWorldMatrix;
            for (int i = 0; i < 8; i++)
            {
                Vector3 corner = b.center + Vector3.Scale(b.extents, new Vector3((i & 1) == 0 ? -1 : 1, (i & 2) == 0 ? -1 : 1, (i & 4) == 0 ? -1 : 1));
                Vector3 p = matrix.MultiplyPoint3x4(corner) - piece.localPosition;
                if (first) { result = new Bounds(p, Vector3.zero); first = false; } else result.Encapsulate(p);
            }
        }
        return result;
    }
}
