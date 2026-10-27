using System.Collections.Generic;
using UnityEngine;

/// <summary>Ordered, layered blueprint for the open 2x2 dog shelter.</summary>
public static class SampleBuildingBlueprint
{
    public static List<BuildingPart> Create()
    {
        GameObject reference = Resources.Load<GameObject>("ReferenceHouseGameplay");
        if (reference != null) return ReferenceHouseBlueprint.Create(reference);
        var parts = new List<BuildingPart>();
        BuildingPart foundation = Part(parts, "Glowing foundation");
        foreach (float z in new[] { 0.5f, 1.5f })
            foreach (float x in new[] { -0.5f, 0.5f })
                Add(foundation, "Glow Base", x, 0, z);

        BuildingPart carpet = Part(parts, "Thin pink floor");
        foreach (float z in new[] { 0.5f, 1.5f })
            foreach (float x in new[] { -0.5f, 0.5f })
                Add(carpet, "Pink Carpet", x, 0, z);

        BuildingPart bases = Part(parts, "Smooth corner bases");
        foreach (float x in new[] { -1.5f, 1.5f })
            foreach (float z in new[] { -0.5f, 2.5f })
                Add(bases, "Pale Base", x, 0, z);

        BuildingPart fences = Part(parts, "Cherry fences");
        foreach (float z in new[] { 0.5f, 1.5f })
        {
            Add(fences, "Fence Z", -1.5f, 1, z);
            Add(fences, "Fence Z", 1.5f, 1, z);
        }
        foreach (float x in new[] { -0.5f, 0.5f }) Add(fences, "Fence X", x, 1, 2.5f);

        BuildingPart pillars = Part(parts, "Upper stone pillars");
        foreach (float x in new[] { -1.5f, 1.5f })
            foreach (float z in new[] { -0.5f, 2.5f })
                for (int y = 1; y <= 2; y++) Add(pillars, "Stone Column", x, y, z);

        BuildingPart glass = Part(parts, "Clear connected glass");
        foreach (float z in new[] { 0.5f, 1.5f })
        {
            Add(glass, "Glass Z", -1.5f, 2, z);
            Add(glass, "Glass Z", 1.5f, 2, z);
        }
        foreach (float x in new[] { -0.5f, 0.5f }) Add(glass, "Glass X", x, 2, 2.5f);

        BuildingPart innerRoof = Part(parts, "Pink roof pit");
        foreach (float z in new[] { 0.5f, 1.5f })
            foreach (float x in new[] { -0.5f, 0.5f })
                Add(innerRoof, "Pink Roof Panel", x, 3, z);

        BuildingPart rim = Part(parts, "White half-block roof rim");
        foreach (float z in new[] { -0.5f, 0.5f, 1.5f, 2.5f })
            foreach (float x in new[] { -1.5f, -0.5f, 0.5f, 1.5f })
            {
                bool inPit = Mathf.Abs(x) == 0.5f && (z == 0.5f || z == 1.5f);
                bool lastFrontBlocks = Mathf.Abs(x) == 0.5f && z == -0.5f;
                if (!inPit && !lastFrontBlocks) Add(rim, "White Roof Slab", x, 3, z);
            }
        BuildingPart frontRim = Part(parts, "Two front roof slabs");
        Add(frontRim, "White Roof Slab", -0.5f, 3, -0.5f);
        Add(frontRim, "White Roof Slab", 0.5f, 3, -0.5f);

        BuildingPart outerRoof = Part(parts, "Outer pink roof panels");
        foreach (float z in new[] { -0.5f, 0.5f, 1.5f, 2.5f })
        {
            Add(outerRoof, "Pink Roof Panel", -2.5f, 3, z);
            Add(outerRoof, "Pink Roof Panel", 2.5f, 3, z);
        }

        BuildingPart lamps = Part(parts, "Hanging lights");
        Add(lamps, "Lantern", -2.5f, 2.2f, -0.5f);
        Add(lamps, "Lantern", 2.5f, 2.2f, -0.5f);

        BuildingPart signBases = Part(parts, "Two roof sign bases");
        Add(signBases, "Sign Base", -0.5f, 3.65f, -0.53f);
        Add(signBases, "Sign Base", 0.5f, 3.65f, -0.53f);
        Add(Part(parts, "First diagonal bone"), "Bone Diagonal", 0.5f, 3.65f, -0.53f);
        Add(Part(parts, "Second horizontal bone"), "Bone Horizontal", -0.5f, 3.65f, -0.53f);

        Add(Part(parts, "Empty water basin"), "Water Basin", -2.5f, 0, -0.5f);
        Add(Part(parts, "Fill water basin"), "Water Fill", -2.5f, 0, -0.5f);

        for (int stage = 1; stage <= 4; stage++)
            Add(Part(parts, "Fire basin stage " + stage), "Fire Stage " + stage,
                2.5f, 0, -0.5f, "front-right-fire");

        BuildingPart surround = Part(parts, "Three pink fire surrounds");
        Add(surround, "Fire Panel Front", 2.5f, 0, -0.5f);
        Add(surround, "Fire Panel Right", 2.5f, 0, -0.5f);
        Add(surround, "Fire Panel Back", 2.5f, 0, -0.5f);
        return parts;
    }

    public static void CreateGround(Material material)
    {
        GameObject ground = GameObject.CreatePrimitive(PrimitiveType.Cube);
        ground.name = "Sample Ground";
        ground.transform.position = new Vector3(0f, -0.075f, 2f);
        ground.transform.localScale = new Vector3(24f, 0.15f, 24f);
        ground.GetComponent<Renderer>().sharedMaterial = material;
        ground.GetComponent<Collider>().enabled = false;
    }

    private static BuildingPart Part(List<BuildingPart> parts, string name)
    {
        BuildingPart part = new BuildingPart { name = name };
        parts.Add(part);
        return part;
    }

    private static void Add(BuildingPart part, string style, float x, float y, float z,
        string replacementKey = null)
    {
        part.blocks.Add(new BuildBlock
        {
            type = style,
            visualStyle = style,
            replacementKey = replacementKey,
            localPosition = new Vector3(x, y, z),
            color = Color.white
        });
    }
}
