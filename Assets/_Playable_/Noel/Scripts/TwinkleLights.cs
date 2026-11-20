using UnityEngine;

namespace Playable
{
    // Chase-blinks Christmas light groups: each group (one combined mesh per bulb colour)
    // gets its own runtime material copy, and groups light up one after another.
    // Blinks through _Color because _Brightness is overridden globally by GameController.
    public class TwinkleLights : MonoBehaviour
    {
        private static readonly int ColorId = Shader.PropertyToID("_Color");

        [SerializeField] private Renderer[] _groups;
        [SerializeField] private float _stepDuration = 0.35f;
        [SerializeField] private float _offIntensity = 0.3f;

        private Material[] _materials;
        private Color[] _onColors;
        private int _litIndex = -1;

        private void Awake()
        {
            _materials = new Material[_groups.Length];
            _onColors = new Color[_groups.Length];
            for (int i = 0; i < _groups.Length; i++)
            {
                // Copy so blinking never writes into the shared material asset.
                _materials[i] = new Material(_groups[i].sharedMaterial);
                _onColors[i] = _materials[i].GetColor(ColorId);
                _groups[i].sharedMaterial = _materials[i];
            }
        }

        private void Update()
        {
            if (_materials.Length == 0) return;
            int lit = (int)(Time.time / _stepDuration) % _materials.Length;
            if (lit == _litIndex) return;
            _litIndex = lit;
            for (int i = 0; i < _materials.Length; i++)
            {
                // Chase: the lit group and the one after it are bright, the rest dim.
                bool on = i == lit || i == (lit + 1) % _materials.Length;
                Color c = _onColors[i];
                if (!on) c = new Color(c.r * _offIntensity, c.g * _offIntensity, c.b * _offIntensity, c.a);
                _materials[i].SetColor(ColorId, c);
            }
        }

        private void OnDestroy()
        {
            if (_materials == null) return;
            foreach (var material in _materials) Destroy(material);
        }
    }
}
