using UnityEngine;

namespace Playable.CartRescue
{
    /// <summary>
    /// Đặt anchor của một phần tử UI theo hướng màn hình: màn dọc dùng _portrait, màn ngang dùng _landscape
    /// (vd. nút START: màn dọc nằm trên phần sàn bên dưới, màn ngang lên vùng tường trống phía trên để không đè lên xe).
    /// </summary>
    [ExecuteAlways, DisallowMultipleComponent, RequireComponent(typeof(RectTransform))]
    public sealed class AspectAnchor : MonoBehaviour
    {
        [SerializeField] private Vector2 _portrait = new Vector2(0.5f, 0.16f);
        [SerializeField] private Vector2 _landscape = new Vector2(0.5f, 0.72f);

        private RectTransform _rect;
        private bool? _wasPortrait;

        private void OnEnable() => Apply(true);

        private void Update() => Apply(false);

        private void Apply(bool force)
        {
            bool portrait = Screen.height >= Screen.width;
            if (!force && _wasPortrait == portrait) return;
            _wasPortrait = portrait;
            if (_rect == null) _rect = (RectTransform)transform;
            Vector2 a = portrait ? _portrait : _landscape;
            _rect.anchorMin = a;
            _rect.anchorMax = a;
        }
    }
}
