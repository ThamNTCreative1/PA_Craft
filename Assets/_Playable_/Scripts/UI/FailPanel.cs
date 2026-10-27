using DG.Tweening;
using UnityEngine;

public class FailPanel : MonoBehaviour
{
    [SerializeField] private RectTransform _tryAgainButton;
    [SerializeField] private RectTransform _shineLine;
    [SerializeField, Min(0.1f)] private float _pulseDuration = 0.5f;
    [SerializeField, Min(0.1f)] private float _shineDuration = 0.85f;
    private Tween _pulse;
    private Tween _shine;
    [SerializeField] private Playable.GameManager _manager;
    [SerializeField] private Canvas _canvas;
    private bool _pointerDown;
    private int _pointerId = -1;

    private bool Inside(Vector2 position)
    {
        return _tryAgainButton && RectTransformUtility.RectangleContainsScreenPoint(
            _tryAgainButton, position, _canvas && _canvas.renderMode != RenderMode.ScreenSpaceOverlay ? _canvas.worldCamera : null);
    }

    private void Update()
    {
        // Match the gameplay's raw pointer path for Luna's UI event limitations.
        if (Input.touchCount > 0)
        {
            for (int i = 0; i < Input.touchCount; i++)
            {
                var touch = Input.GetTouch(i);
                if (touch.phase == TouchPhase.Began && !_pointerDown && Inside(touch.position))
                { _pointerDown = true; _pointerId = touch.fingerId; }
                if (!_pointerDown || touch.fingerId != _pointerId) continue;
                if (touch.phase == TouchPhase.Ended || touch.phase == TouchPhase.Canceled)
                {
                    _pointerDown = false;
                    if (touch.phase == TouchPhase.Ended && Inside(touch.position) && _manager) _manager.TryAgain();
                }
            }
            return;
        }
        if (Input.GetMouseButtonDown(0)) { _pointerDown = Inside(Input.mousePosition); _pointerId = -1; }
        if (Input.GetMouseButtonUp(0))
        {
            bool click = _pointerDown && _pointerId == -1 && Inside(Input.mousePosition);
            _pointerDown = false;
            if (click && _manager) _manager.TryAgain();
        }
    }

    public void Show()
    {
        gameObject.SetActive(true);
    }

    private void OnEnable()
    {
        if (_tryAgainButton == null) return;
        _tryAgainButton.localScale = Vector3.one;
        _pulse = _tryAgainButton.DOScale(1.08f, _pulseDuration)
            .SetEase(Ease.InOutSine).SetLoops(-1, LoopType.Yoyo).SetUpdate(true);
        if (_shineLine == null) return;
        float edge = _tryAgainButton.rect.width * 0.5f + _shineLine.rect.width;
        _shineLine.anchoredPosition = new Vector2(-edge, 0);
        _shine = _shineLine.DOAnchorPosX(edge, _shineDuration)
            .SetEase(Ease.Linear).SetLoops(-1, LoopType.Restart).SetUpdate(true);
    }

    private void OnDisable()
    {
        _pointerDown = false;
        _pulse?.Kill();
        _shine?.Kill();
        _pulse = _shine = null;
        if (_tryAgainButton != null) _tryAgainButton.localScale = Vector3.one;
    }
}
