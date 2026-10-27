using UnityEngine;

// Đổi màu lùm cây theo màu người chơi chọn.
public class TreeRecolor : MonoBehaviour
{
    public Renderer[] leafRenderers;
    public Material pinkLeaves;
    public Material blueLeaves;
    public ParticleSystem burstFx;

    public void Apply(bool pink)
    {
        var m = pink ? pinkLeaves : blueLeaves;
        for (int i = 0; i < leafRenderers.Length; i++)
        {
            if (leafRenderers[i] == null) continue;
            var arr = leafRenderers[i].sharedMaterials;
            for (int k = 0; k < arr.Length; k++) arr[k] = m;
            leafRenderers[i].sharedMaterials = arr;
            BrightnessApplier.Apply(leafRenderers[i]);
        }
        if (burstFx != null)
        {
            var main = burstFx.main;
            main.startColor = pink ? new Color(1f, 0.6f, 0.8f) : new Color(0.55f, 0.8f, 1f);
            burstFx.Play();
        }
    }
}
