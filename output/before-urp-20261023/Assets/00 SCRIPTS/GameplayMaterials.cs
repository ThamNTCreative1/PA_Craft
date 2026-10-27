using System;
using UnityEngine;

/// <summary>Serialized material dependencies keep runtime shaders in playable exports.</summary>
public sealed class GameplayMaterials : MonoBehaviour
{
    [SerializeField] private Material solid;
    [SerializeField] private Material transparent;
    [SerializeField] private Material unlit;
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
    private void OnDestroy() { if (active == this) active = null; }
}
