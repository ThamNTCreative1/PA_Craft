using UnityEngine;
using UnityEngine.UI;

namespace Playable
{
    public sealed class WorldHealthBar : MonoBehaviour
    {
        [SerializeField] private Image _fill;
        [SerializeField] private Camera _camera;
        public void SetValue(float normalized)
        {
            if (_fill != null) _fill.fillAmount = Mathf.Clamp01(normalized);
        }
        private void LateUpdate()
        {
            if (_camera != null) transform.rotation = _camera.transform.rotation;
        }
    }
}
