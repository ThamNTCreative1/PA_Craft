using System;
using UnityEngine;

namespace Playable
{
    public sealed class WeatherPresetController : MonoBehaviour
    {
        [Serializable]
        private struct WeatherPresetData
        {
            public Material Skybox;
            public Color Tint;
            public float Exposure;
        }

        [SerializeField] private Camera _camera;
        [SerializeField] private ParticleSystem _rain;
        [SerializeField] private AudioSource _rainAudio;
        [SerializeField] private WeatherPresetData[] _presets;
        [SerializeField] private FloodWeatherView _flood;

        private bool _initialized;
        private WeatherPreset _selectedWeather;
        private Material _skyboxInstance;
        private Material _originalSkybox;
        private CameraClearFlags _originalClearFlags;

        public void Initialize(WeatherPreset weather)
        {
            if (_initialized)
            {
                Debug.LogWarning("Weather is fixed for this game; initialization was ignored.", this);
                return;
            }
            if (_camera == null || _rain == null || _rainAudio == null ||
                _flood == null || _presets == null || _presets.Length != 5)
            {
                Debug.LogError("Weather needs camera, rain particles/audio, flood view and five skybox presets.", this);
                enabled = false;
                return;
            }
            for (int i = 0; i < _presets.Length; i++)
            {
                Material material = _presets[i].Skybox;
                if (material == null || !material.HasProperty("_Tint") || !material.HasProperty("_Exposure"))
                {
                    Debug.LogError("Each weather preset needs a skybox with _Tint and _Exposure properties.", this);
                    enabled = false;
                    return;
                }
            }
            if ((int)weather < 0 || (int)weather >= _presets.Length)
            {
                Debug.LogWarning("Weather value must be 0-4; using Day.", this);
                weather = WeatherPreset.Day;
            }

            WeatherPresetData preset = _presets[(int)weather];
            _originalSkybox = RenderSettings.skybox;
            _originalClearFlags = _camera.clearFlags;
            _skyboxInstance = new Material(preset.Skybox);
            _skyboxInstance.name = preset.Skybox.name + " (Fixed Weather)";
            _skyboxInstance.SetColor("_Tint", preset.Tint);
            _skyboxInstance.SetFloat("_Exposure", preset.Exposure);
            RenderSettings.skybox = _skyboxInstance;
            _camera.clearFlags = CameraClearFlags.Skybox;
            _selectedWeather = weather;
            _initialized = true;
            ParticleSystem.MainModule main = _rain.main;
            main.loop = true;
            _rainAudio.loop = true;
            ApplyRain();
            ApplyFlood();
        }

        private void OnEnable()
        {
            if (!_initialized) return;
            ApplyRain();
            ApplyFlood();
        }

        private void ApplyFlood()
        {
            if (isActiveAndEnabled && _selectedWeather == WeatherPreset.Flood) _flood.BeginFlood();
            else _flood.HideFlood();
        }

        private void ApplyRain()
        {
            if (isActiveAndEnabled && _selectedWeather == WeatherPreset.Rain)
            {
                _rain.Play();
                _rainAudio.Play();
            }
            else StopRain();
        }

        private void StopRain()
        {
            if (_rain != null) _rain.Stop(true, ParticleSystemStopBehavior.StopEmittingAndClear);
            if (_rainAudio != null) _rainAudio.Stop();
        }

        private void OnDisable()
        {
            StopRain();
            if (_flood != null) _flood.HideFlood();
        }

        private void OnDestroy()
        {
            if (!_initialized) return;
            if (RenderSettings.skybox == _skyboxInstance) RenderSettings.skybox = _originalSkybox;
            if (_camera != null) _camera.clearFlags = _originalClearFlags;
            if (_skyboxInstance != null) Destroy(_skyboxInstance);
        }
    }
}
