using UnityEngine;

namespace Playable.CartRescue
{
    /// <summary>
    /// Bật một trong hai object con theo hướng màn hình (vd. chữ hướng dẫn: màn ngang 1 dòng, màn dọc 2 dòng).
    /// </summary>
    [ExecuteAlways, DisallowMultipleComponent]
    public sealed class AspectSwitch : MonoBehaviour
    {
        [SerializeField] private GameObject _portrait;
        [SerializeField] private GameObject _landscape;

        private bool? _wasPortrait;

        private void OnEnable() => Apply(true);

        private void Update() => Apply(false);

        private void Apply(bool force)
        {
            bool portrait = Screen.height >= Screen.width;
            if (!force && _wasPortrait == portrait) return;
            _wasPortrait = portrait;
            if (_portrait != null) _portrait.SetActive(portrait);
            if (_landscape != null) _landscape.SetActive(!portrait);
        }
    }
}
