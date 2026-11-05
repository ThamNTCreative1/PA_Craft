using System;
using UnityEngine;
using UnityEngine.UI;

namespace Playable
{
    public sealed class WeatherPresetController : MonoBehaviour
    {
        [Serializable]
        private struct WeatherPresetData
        {
            public Color SkyColor;
            public Color OverlayColor;
            public bool Rain;
        }

        [LunaPlaygroundField("Weather (0 Day, 1 Sunny, 2 Rain, 3 Night)")]
        [SerializeField, Range(0, 3)] private int _weather;
        [SerializeField] private Camera _camera;
        [SerializeField] private Image _overlay;
        [SerializeField] private ParticleSystem _rain;
        [SerializeField] private AudioSource _rainAudio;
        [SerializeField] private WeatherPresetData[] _presets;

        private void Start()
        {
            if (_camera == null || _overlay == null || _rain == null ||
                _rainAudio == null || _presets == null || _presets.Length != 4)
            {
                Debug.LogError("Weather needs camera, overlay, rain particles/audio and four presets.", this);
                enabled = false;
                return;
            }
            if (_weather < 0 || _weather >= _presets.Length)
            {
                Debug.LogWarning("Weather value must be 0-3; using Day.", this);
                _weather = 0;
            }
            WeatherPresetData preset = _presets[_weather];
            _camera.clearFlags = CameraClearFlags.SolidColor;
            _camera.backgroundColor = preset.SkyColor;
            _overlay.color = preset.OverlayColor;
            bool rain = _weather == (int)WeatherPreset.Rain && preset.Rain;
            if (rain)
            {
                _rain.Play();
                _rainAudio.Play();
            }
            else
            {
                _rain.Stop(true, ParticleSystemStopBehavior.StopEmittingAndClear);
                _rainAudio.Stop();
            }
        }

        private void OnDisable()
        {
            if (_rain != null) _rain.Stop(true, ParticleSystemStopBehavior.StopEmittingAndClear);
            if (_rainAudio != null) _rainAudio.Stop();
        }
    }
}
