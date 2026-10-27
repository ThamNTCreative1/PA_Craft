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
                // Underground foundation is selected using its exposed top face.
                if (name == "Foundation") bounds = new Bounds(new Vector3(0, 1.025f, 0), new Vector3(1, .05f, 1));
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
