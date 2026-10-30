using DG.Tweening;
using UnityEngine;
using UnityEngine.UI;

public class FailPanel : MonoBehaviour
{
    [SerializeField] private Button _retryButton;
    [SerializeField] private RectTransform _line;
    [SerializeField] private RectTransform _lineArea;
    [SerializeField] private bool _installOnClick;
    private Tween _scaleTween;
    private Tween _lineTween;
    private Vector3 _baseScale;

    private void Awake()
    {
        if (_retryButton != null) _baseScale = _retryButton.transform.localScale;
    }

    private void OnEnable()
    {
        if (_retryButton != null)
        {
            _retryButton.onClick.AddListener(Retry);
            _scaleTween = _retryButton.transform.DOScale(_baseScale * 1.08f, .5f)
                .SetEase(Ease.InOutSine).SetLoops(-1, LoopType.Yoyo);
        }
        if (_line != null && _lineArea != null)
        {
            Canvas.ForceUpdateCanvases();
            float distance = (_lineArea.rect.width + _line.rect.width) * .5f;
            _line.anchoredPosition = new Vector2(-distance, _line.anchoredPosition.y);
            _lineTween = _line.DOAnchorPosX(distance, 1.2f).SetEase(Ease.Linear)
                .SetLoops(-1, LoopType.Restart);
        }
    }

    private void Retry()
    {
        if (_installOnClick)
        {
            if (Playable.GameManager.Instance != null) Playable.GameManager.Instance.ShowCTA();
            return;
        }
        if (Playable.GameManager.Instance != null) Playable.GameManager.Instance.RetryGame();
    }

    private void OnDisable()
    {
        _scaleTween?.Kill();
        _lineTween?.Kill();
        if (_retryButton == null) return;
        _retryButton.onClick.RemoveListener(Retry);
        _retryButton.transform.localScale = _baseScale;
    }

    public void Show()
    {
        gameObject.SetActive(true);
    }
}
