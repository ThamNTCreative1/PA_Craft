using DG.Tweening;
using UnityEngine;

namespace Playable
{
    public class WinPanel : MonoBehaviour
    {
        [SerializeField] private GameObject _button;
        [SerializeField] private RectTransform _line;

        public void Show()
        {
            gameObject.SetActive(true);
            PlayButtonPulse();
        }

        private void PlayButtonPulse()
        {
            _button.transform.DOScale(new Vector3(1.2f, 1.2f, 1.2f), 0.5f).SetEase(Ease.Linear)
                .SetLoops(-1, LoopType.Yoyo);
            _line.DOAnchorPosX(460, 0.5f).SetEase(Ease.Linear).SetLoops(-1, LoopType.Restart);
        }
    }
}