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
        _pulse?.Kill();
        _shine?.Kill();
        _pulse = _shine = null;
        if (_tryAgainButton != null) _tryAgainButton.localScale = Vector3.one;
    }
}
