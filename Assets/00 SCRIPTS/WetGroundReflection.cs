using UnityEngine;
using System.Collections.Generic;

// Low-resolution planar reflection for the flat grass around the building.
// The camera/target/material are serialized assets (no runtime Shader.Find).
public class WetGroundReflection : MonoBehaviour
{
    public const string ReflectionLayer = "WetReflectionObjects";
    [SerializeField] private Camera viewCamera;
    [SerializeField] private Camera reflectionCamera;
    [SerializeField] private Material groundMaterial;
    [SerializeField] private float groundHeight;
    [SerializeField, Range(1, 4)] private int updateEveryFrames = 2;
    private int frame;
    private static bool lightsDirty = true;
    private PointLightReflectionExclusion[] sceneLights;
    private readonly List<Light> temporarilyDisabled = new List<Light>();

    public static void RefreshLightList() { lightsDirty = true; }

    public static void Include(GameObject root)
    {
        int layer = LayerMask.NameToLayer(ReflectionLayer);
        if (layer < 0 || root == null) return;
        foreach (Renderer r in root.GetComponentsInChildren<Renderer>(true)) r.gameObject.layer = layer;
        lightsDirty = true;
    }

    public static void Exclude(GameObject root)
    {
        if (root == null) return;
        int layer = LayerMask.NameToLayer(ReflectionLayer);
        foreach (Renderer r in root.GetComponentsInChildren<Renderer>(true))
            if (r.gameObject.layer == layer) r.gameObject.layer = 0;
        lightsDirty = true;
    }

    private void LateUpdate()
    {
        if (viewCamera == null || reflectionCamera == null || groundMaterial == null) return;
        bool update = frame++ % Mathf.Max(1, updateEveryFrames) == 0;
        // Manual capture scopes light changes strictly to this camera, never the main view.
        reflectionCamera.enabled = false;
        if (!update) return;
        if (viewCamera.transform.position.y <= groundHeight + .05f)
        {
            groundMaterial.SetFloat("_ReflectionReady", 0);
            return;
        }
        Capture();
    }

    public void Capture()
    {
        if (viewCamera == null || reflectionCamera == null || groundMaterial == null) return;
        reflectionCamera.enabled = false;
        UpdateView();
        if (sceneLights == null || lightsDirty)
        {
            sceneLights = Object.FindObjectsOfType<PointLightReflectionExclusion>();
            lightsDirty = false;
        }
        temporarilyDisabled.Clear();
        try
        {
            foreach (PointLightReflectionExclusion entry in sceneLights)
            {
                Light light = entry != null ? entry.source : null;
                if (light != null && light.enabled)
                {
                    temporarilyDisabled.Add(light);
                    light.enabled = false;
                }
            }
            reflectionCamera.Render();
        }
        finally
        {
            foreach (Light light in temporarilyDisabled)
                if (light != null) light.enabled = true;
            temporarilyDisabled.Clear();
        }
    }

    public void UpdateView()
    {
        if (viewCamera == null || reflectionCamera == null || groundMaterial == null) return;
        Vector3 position = viewCamera.transform.position;
        position.y = 2 * groundHeight - position.y;
        Vector3 forward = viewCamera.transform.forward; forward.y = -forward.y;
        Vector3 up = viewCamera.transform.up; up.y = -up.y;
        reflectionCamera.transform.SetPositionAndRotation(position, Quaternion.LookRotation(forward, up));
        reflectionCamera.fieldOfView = viewCamera.fieldOfView;
        reflectionCamera.aspect = viewCamera.aspect;
        reflectionCamera.orthographic = viewCamera.orthographic;
        reflectionCamera.orthographicSize = viewCamera.orthographicSize;
        // Project the same mirrored camera onto the surface; no inverted culling required.
        Matrix4x4 vp = GL.GetGPUProjectionMatrix(reflectionCamera.projectionMatrix, true) * reflectionCamera.worldToCameraMatrix;
        groundMaterial.SetMatrix("_ReflectionVP", vp);
        groundMaterial.SetFloat("_ReflectionHeight", groundHeight);
        groundMaterial.SetFloat("_ReflectionReady", 1);
    }

    private void OnDisable()
    {
        if (reflectionCamera != null) reflectionCamera.enabled = false;
        if (groundMaterial != null) groundMaterial.SetFloat("_ReflectionReady", 0);
    }
}
