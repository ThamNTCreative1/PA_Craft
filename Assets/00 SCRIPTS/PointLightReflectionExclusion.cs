using UnityEngine;

// Assigned in the Editor. Playworks does not expose Light.type at runtime.
public class PointLightReflectionExclusion : MonoBehaviour
{
    public Light source;

    private void OnEnable() { WetGroundReflection.RefreshLightList(); }
    private void OnDisable() { WetGroundReflection.RefreshLightList(); }
}
