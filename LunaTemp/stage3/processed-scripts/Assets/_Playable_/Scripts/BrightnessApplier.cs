using UnityEngine;

// Nhân màu tất cả material (unlit) theo PlayableConfig.brightness.
public static class BrightnessApplier
{
    static readonly int ColorId = Shader.PropertyToID("_Color");
    static readonly int BaseColorId = Shader.PropertyToID("_BaseColor");

    public static float Value { get { return PlayableConfig.I != null ? PlayableConfig.I.brightness : 1f; } }

    public static void ApplyAll()
    {
        var rs = Object.FindObjectsOfType<Renderer>(); // Luna không hỗ trợ overload có tham số
        for (int i = 0; i < rs.Length; i++) Apply(rs[i]);
    }

    public static void ApplyTo(GameObject go)
    {
        if (go == null) return;
        var rs = go.GetComponentsInChildren<Renderer>();
        for (int i = 0; i < rs.Length; i++) Apply(rs[i]);
    }

    public static void Apply(Renderer r)
    {
        if (r == null || r is ParticleSystemRenderer) return;
        float b = Value;
        if (Mathf.Approximately(b, 1f)) return;
        var mats = r.materials; // instance, không sửa asset
        for (int i = 0; i < mats.Length; i++)
        {
            var m = mats[i];
            if (m == null) continue;
            if (m.HasProperty(BaseColorId)) { var c = m.GetColor(BaseColorId); m.SetColor(BaseColorId, new Color(c.r * b, c.g * b, c.b * b, c.a)); }
            else if (m.HasProperty(ColorId)) { var c = m.GetColor(ColorId); m.SetColor(ColorId, new Color(c.r * b, c.g * b, c.b * b, c.a)); }
        }
    }
}
