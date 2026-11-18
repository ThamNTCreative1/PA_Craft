using UnityEngine;

// Voxel extrusion side walls have zero-area UVs exactly on texel boundaries.
// Point sampling alternates opaque and transparent neighbours as the camera moves.
// Sample an opaque pixel centre for these walls; preserve all other UVs and geometry.
public static class NoelVoxelSurfaceCleaner
{
    public static Mesh Clean(Mesh source, Texture2D texture)
    {
        var input = source.vertices;
        var normals = source.normals;
        var uv = source.uv;
        var weights = source.boneWeights;
        var indices = source.triangles;
        var output = new Vector3[indices.Length];
        var outputNormals = new Vector3[indices.Length];
        var outputUv = new Vector2[indices.Length];
        var outputWeights = new BoneWeight[indices.Length];
        var outputIndices = new int[indices.Length];
        var pixels = texture.GetPixels32();
        for (int i = 0; i < indices.Length; i += 3)
        {
            var a = uv[indices[i]]; var b = uv[indices[i + 1]]; var c = uv[indices[i + 2]];
            float area = Mathf.Abs((b.x - a.x) * (c.y - a.y) - (b.y - a.y) * (c.x - a.x));
            bool degenerateUv = area < 0.00000001f;
            var center = (a + b + c) / 3f;
            var sample = center;
            if (degenerateUv)
            {
                int bestAlpha = -1;
                for (int y = -1; y <= 1; y += 2)
                    for (int x = -1; x <= 1; x += 2)
                    {
                        int px = Mathf.Clamp(Mathf.FloorToInt(center.x * texture.width + x * 0.25f), 0, texture.width - 1);
                        int py = Mathf.Clamp(Mathf.FloorToInt(center.y * texture.height + y * 0.25f), 0, texture.height - 1);
                        int alpha = pixels[py * texture.width + px].a;
                        if (alpha > bestAlpha)
                        {
                            bestAlpha = alpha;
                            sample = new Vector2((px + 0.5f) / texture.width, (py + 0.5f) / texture.height);
                        }
                    }
            }
            for (int j = 0; j < 3; j++)
            {
                int index = indices[i + j];
                output[i + j] = input[index];
                outputNormals[i + j] = normals[index];
                outputUv[i + j] = degenerateUv ? sample : uv[index];
                outputWeights[i + j] = weights[index];
                outputIndices[i + j] = i + j;
            }
        }
        var mesh = new Mesh { name = source.name + "_Surface" };
        mesh.vertices = output; mesh.normals = outputNormals; mesh.uv = outputUv;
        mesh.boneWeights = outputWeights; mesh.bindposes = source.bindposes;
        mesh.triangles = outputIndices; mesh.RecalculateBounds();
        return mesh;
    }
}
