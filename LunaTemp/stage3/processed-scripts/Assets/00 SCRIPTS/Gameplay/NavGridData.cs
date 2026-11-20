using UnityEngine;

// Walkable grid baked in the Editor from the scene's NavMesh (Luna has no NavMesh runtime: NavMeshAgent is a stub).
// walkable[i] = 1 when cell i is on the NavMesh; height[i] = ground height of cell i (2 bytes, heightStep units).
[CreateAssetMenu(menuName = "STSM/Nav Grid Data")]
public class NavGridData : ScriptableObject
{
    public Vector3 origin;
    public float cellSize = 1f;
    public int sizeX;
    public int sizeZ;
    public float minHeight;
    public float heightStep = 0.01f;
    public byte[] walkable;
    public byte[] heights;
}
