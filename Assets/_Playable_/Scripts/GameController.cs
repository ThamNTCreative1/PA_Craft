using UnityEngine;

namespace Playable
{
    [DefaultExecutionOrder(-100)]
    public class GameController : MonoBehaviour
    {
        [Header("Fixed Weather")]
        [LunaPlaygroundField("Weather (0 Day, 1 Sunny, 2 Rain, 3 Night, 4 Flood)", fieldOrder: 1, fieldSection: "Environment")]
        [SerializeField, Range(0, 4)] private int _weather;
        [SerializeField] private WeatherPresetController _weatherController;

        [Header("Game Brightness")]
        [LunaPlaygroundField("Game Brightness", fieldOrder: 2, fieldSection: "Environment")]
        [SerializeField, Range(0f, 1f),
         Tooltip("Unlit brightness: 0 = original map colors, 1 = brightest.")]
        private float _gameBrightness = 0f;

        private float _appliedBrightness = -1f;

        private void Start()
        {
            if (_weatherController == null)
            {
                Debug.LogError("GameController needs a WeatherPresetController reference.", this);
                return;
            }

            if (_weather < 0 || _weather > 4)
            {
                Debug.LogWarning("Weather value must be 0-4; using Day.", this);
                _weather = 0;
            }

            _weatherController.Initialize((WeatherPreset)_weather);
        }

        private void OnEnable()
        {
            ApplyBrightness();
        }

        private void OnDisable()
        {
            Shader.SetGlobalVector("_PlayableBrightnessOverride", Vector4.zero);
            _appliedBrightness = -1f;
        }

        private void ApplyBrightness()
        {
            _gameBrightness = Mathf.Clamp01(_gameBrightness);
            // A global override updates all bright Unlit materials without cloning or scanning them.
            Shader.SetGlobalVector("_PlayableBrightnessOverride", new Vector4(_gameBrightness, 1f, 0f, 0f));
            _appliedBrightness = _gameBrightness;
        }

        private void Update()
        {
            if (_appliedBrightness != _gameBrightness) ApplyBrightness();
        }
    }
}
