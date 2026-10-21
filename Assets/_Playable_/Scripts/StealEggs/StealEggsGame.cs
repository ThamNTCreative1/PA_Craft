using DG.Tweening;
using UnityEngine;
using UnityEngine.UI;

namespace Playable
{
    public sealed class StealEggsGame : MonoBehaviour
    {
        public GameManager Manager;
        public Button EggButton;
        public Button EndCardButton;
        public GameObject EndCard;
        public RectTransform Tutorial;
        public RectTransform Hand;
        public RectTransform PlayNow;
        public RectTransform Shine;
        private Sequence _handLoop, _shineLoop;
        private Tween _playLoop;
        private void Awake()
        {
            Manager.CountdownExpired += ShowEndCard;
            EggButton.onClick.AddListener(Steal);
            EndCardButton.onClick.AddListener(Manager.ShowCTA);
            EndCard.SetActive(false);
        }
        private void Start()
        {
            Vector2 origin = Hand.anchoredPosition;
            _handLoop = DOTween.Sequence()
                .Append(Hand.DOAnchorPos(origin + new Vector2(-28, 38), .45f).SetEase(Ease.OutSine))
                .Append(Hand.DOScale(.82f, .16f))
                .Append(Hand.DOScale(1f, .2f))
                .Append(Hand.DOAnchorPos(origin, .35f).SetEase(Ease.InOutSine))
                .AppendInterval(.35f).SetLoops(-1).SetUpdate(true);
        }
        private void Steal()
        {
            ShowEndCard();
            Manager.ShowCTA();
        }
        public void ShowEndCard()
        {
            if (EndCard.activeSelf) return;
            Manager.EndGame();
            _handLoop?.Kill();
            Tutorial.gameObject.SetActive(false);
            EggButton.interactable = false;
            EndCard.SetActive(true);
            _playLoop = PlayNow.DOScale(PlayNow.localScale * 1.08f, .65f).SetEase(Ease.InOutSine).SetLoops(-1, LoopType.Yoyo).SetUpdate(true);
            _shineLoop = DOTween.Sequence().Append(Shine.DOAnchorPosX(420, .85f).SetEase(Ease.Linear))
                .AppendInterval(1.1f).SetLoops(-1, LoopType.Restart).SetUpdate(true);
        }
        private void OnDestroy()
        {
            _handLoop?.Kill(); _shineLoop?.Kill(); _playLoop?.Kill();
            if (Manager != null) Manager.CountdownExpired -= ShowEndCard;
            if (EggButton != null) EggButton.onClick.RemoveListener(Steal);
            if (EndCardButton != null && Manager != null) EndCardButton.onClick.RemoveListener(Manager.ShowCTA);
        }
    }
}

