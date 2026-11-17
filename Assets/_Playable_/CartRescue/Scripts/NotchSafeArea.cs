using UnityEngine;

namespace Playable.CartRescue
{
    /// <summary>
    /// Đẩy một phần tử UI bám mép trên xuống dưới vùng tai thỏ (notch).
    /// - Nếu thiết bị báo Screen.safeArea thì dùng phần bị che phía trên của safeArea.
    /// - Nếu không (Luna/WebGL thường trả về toàn màn hình), với màn dọc dáng dài (cao/rộng ≥ _tallAspect, kiểu iPhone X
    ///   trở đi) thì chừa _fallbackTopInset × chiều cao màn hình (44/812 ≈ 5.4% như iPhone).
    /// Chỉ cộng thêm vào anchoredPosition gốc, không đổi anchor — dùng chung được với AspectAnchor.
    /// </summary>
    [DisallowMultipleComponent, RequireComponent(typeof(RectTransform))]
    public sealed class NotchSafeArea : MonoBehaviour
    {
        [SerializeField] private float _fallbackTopInset = 0.054f;
        [SerializeField] private float _tallAspect = 2f;

        private RectTransform _rect;
        private Canvas _canvas;
        private Vector2 _basePosition;
        private Vector2Int _lastScreen;
        private Rect _lastSafe;

        private void Awake()
        {
            _rect = (RectTransform)transform;
            _canvas = GetComponentInParent<Canvas>();
            _basePosition = _rect.anchoredPosition;
        }

        private void OnEnable() => Apply();

        private void LateUpdate()
        {
            if (Screen.width != _lastScreen.x || Screen.height != _lastScreen.y || Screen.safeArea != _lastSafe) Apply();
        }

        private void Apply()
        {
            if (_rect == null) Awake();
            _lastScreen = new Vector2Int(Screen.width, Screen.height);
            _lastSafe = Screen.safeArea;
            float insetPx = Mathf.Max(0f, Screen.height - Screen.safeArea.yMax);
            bool tallPortrait = Screen.height >= Screen.width * _tallAspect;
            if (insetPx < 1f && tallPortrait) insetPx = Screen.height * _fallbackTopInset;
            float scale = _canvas != null ? Mathf.Max(0.0001f, _canvas.rootCanvas.scaleFactor) : 1f;
            _rect.anchoredPosition = _basePosition - new Vector2(0f, insetPx / scale);
        }
    }
}
