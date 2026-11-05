using DG.Tweening;
using Playable;
using UnityEngine;
using UnityEngine.UI;

public class FailPanel : MonoBehaviour
{
    [SerializeField] private Button _button;
    [SerializeField] private float _buttonPulseScale = 1.12f;
    [SerializeField] private float _buttonPulseDuration = 0.4f;

    private Tween _titleTween;
    private Tween _buttonTween;

    public void Show()
    {
        gameObject.SetActive(true);
        PlayButtonPulse();
        _button.onClick.AddListener(() => { GameManager.Instance.EndGame(); });
    }


    private void PlayButtonPulse()
    {
        if (_button == null)
        {
            return;
        }

        _buttonTween?.Kill();
        _button.transform.localScale = Vector3.one;
        _buttonTween = _button.transform
            .DOScale(_buttonPulseScale, _buttonPulseDuration)
            .SetEase(Ease.InOutSine)
            .SetLoops(-1, LoopType.Yoyo)
            .OnKill(() => _buttonTween = null);
    }

    private void OnDisable()
    {
        _titleTween?.Kill();
        _titleTween = null;
        _buttonTween?.Kill();
        _buttonTween = null;
    }
}