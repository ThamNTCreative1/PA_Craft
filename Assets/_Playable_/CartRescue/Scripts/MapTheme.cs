using UnityEngine;

namespace Playable.CartRescue
{
    /// <summary>
    /// Một bối cảnh (map) của màn chơi: object này chứa nền đất + đạo cụ của map; Apply bật nó lên và đặt màu trời
    /// (màu nền camera), ánh sáng và ánh sáng môi trường cho map (vd. Mansion là ban đêm).
    /// </summary>
    [DisallowMultipleComponent]
    public sealed class MapTheme : MonoBehaviour
    {
        [SerializeField] private string _label = "PLAYGROUND";
        [SerializeField] private Color _sky = new Color(0.55f, 0.78f, 0.98f);
        [SerializeField] private Color _ambient = new Color(0.62f, 0.62f, 0.66f);
        [SerializeField] private float _lightIntensity = 0.9f;

        public string Label => _label;

        public void Apply(Camera camera, Light light)
        {
            gameObject.SetActive(true);
            if (camera != null) camera.backgroundColor = _sky;
            if (light != null) light.intensity = _lightIntensity;
            RenderSettings.ambientLight = _ambient;
        }
    }
}
