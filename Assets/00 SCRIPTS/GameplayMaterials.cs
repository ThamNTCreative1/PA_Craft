using System;
using UnityEngine;

/// <summary>Serialized material dependencies keep runtime shaders in playable exports.</summary>
public sealed class GameplayMaterials : MonoBehaviour
{
    [SerializeField] private Material solid;
    [SerializeField] private Material transparent;
    [SerializeField] private Material unlit;
    [SerializeField] private Material guideOverlay;
    private static GameplayMaterials active;
    public void Initialize() { active = this; }
    public static Material Create(bool transparentSurface = false, bool unlitSurface = false)
    {
        if (active == null) throw new InvalidOperationException("GameplayMaterials is not initialized.");
        Material template = unlitSurface ? active.unlit : transparentSurface ? active.transparent : active.solid;
        if (template == null || template.shader == null)
            throw new InvalidOperationException("Missing exported gameplay material template. Check scene dependencies in Playworks.");
        return new Material(template);
    }
    public static Material CreateGuideOverlay()
    {
        if (active == null || active.guideOverlay == null)
            throw new InvalidOperationException("Missing guide overlay material on GameplayMaterials.");
        return new Material(active.guideOverlay);
    }

    public static void ConfigureTransparency(Material material)
    {
        if (!material.HasProperty("_Surface")) return;
        material.SetFloat("_Surface", 1); material.SetFloat("_Blend", 0);
        material.SetInt("_SrcBlend", 5); material.SetInt("_DstBlend", 10);
        material.SetInt("_ZWrite", 0);
        material.DisableKeyword("_ALPHABLEND_ON"); material.DisableKeyword("_ALPHAPREMULTIPLY_ON");
        material.EnableKeyword("_SURFACE_TYPE_TRANSPARENT"); material.renderQueue = 3000;
    }
    private void OnDestroy() { if (active == this) active = null; }
}
