using UnityEngine;

namespace Playable
{
    [DefaultExecutionOrder(-100)]
    public class GameController : MonoBehaviour
    {
        [Header("Game Brightness")]
        [LunaPlaygroundField("Game Brightness")]
        [SerializeField, Range(0f, 1f),
         Tooltip("Unlit brightness: 0 = original map colors, 1 = brightest.")]
        private float _gameBrightness = 0f;

        private float _appliedBrightness = -1f;

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
