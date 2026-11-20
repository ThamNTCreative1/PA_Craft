using DG.Tweening;
using UnityEngine;

namespace Playable
{
    // Store end card: background and fixed-size logo; download button pulses.
    // Taps are caught by GameManager's Button Block (opens the store).
    public class EndCardView : MonoBehaviour
    {
        [SerializeField] private CanvasGroup _group;
        [SerializeField] private RectTransform _logo;
        [SerializeField] private RectTransform _button;
        [SerializeField] private float _fadeTime = 0.3f;

        // Starts inactive in the scene; Show() turns it on.
        public void Show()
        {
            if (gameObject.activeSelf) return;
            gameObject.SetActive(true);
            _group.alpha = 0f;
            _group.DOFade(1f, _fadeTime);

            _button.localScale = Vector3.zero;
            _button.DOScale(1f, 0.4f).SetDelay(0.45f).SetEase(Ease.OutBack)
                .OnComplete(() => _button.DOScale(1.08f, 0.5f).SetEase(Ease.InOutSine).SetLoops(-1, LoopType.Yoyo));
        }

        private void OnDestroy()
        {
            _group.DOKill();
            _logo.DOKill();
            _button.DOKill();
        }
    }
}
