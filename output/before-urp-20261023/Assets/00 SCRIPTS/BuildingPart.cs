using System;
using System.Collections.Generic;
using UnityEngine;

[Serializable]
public class BuildBlock
{
    public string type = "Wood";
    public Vector3 localPosition;
    public GameObject prefab;
    public Quaternion localRotation = Quaternion.identity;
    public bool hasCustomBounds;
    public Bounds customBounds;
    public string visualStyle;
    public string replacementKey;
    public Color color = Color.white;
    [NonSerialized] public bool built;

    public Vector3 WorldPosition(Transform origin)
    {
        return origin != null ? origin.TransformPoint(localPosition) : localPosition;
    }

    public bool IsFaceNeighbourOf(BuildBlock other)
    {
        Vector3 delta = localPosition - other.localPosition;
        const float tolerance = 0.01f;
        int unitAxes = 0;
        for (int axis = 0; axis < 3; axis++)
        {
            float distance = Mathf.Abs(delta[axis]);
            if (Mathf.Abs(distance - 1f) < tolerance) unitAxes++;
            else if (distance >= tolerance) return false;
        }
        return unitAxes == 1;
    }
}

[Serializable]
public class BuildingPart
{
    public string name = "New Part";
    public List<BuildBlock> blocks = new List<BuildBlock>();
}
