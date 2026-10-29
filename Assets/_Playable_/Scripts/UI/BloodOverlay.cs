using DG.Tweening;
using UnityEngine;
using UnityEngine.UI;

namespace Playable
{
    public class BloodOverlay : MonoBehaviour
    {
        [SerializeField] private CanvasGroup _group;
        [SerializeField] private RectTransform[] _splashes;
        private Sequence _sequence;
        private static readonly Vector2[] SplashPositions =
        {
            Vector2.zero, new Vector2(-.4f, .35f), new Vector2(.4f, .35f),
            new Vector2(-.4f, -.35f), new Vector2(.4f, -.35f), new Vector2(0f, .45f)
        };

        private void Awake()
        {
            var wash = new GameObject("Fullscreen Blood Tint", typeof(RectTransform), typeof(Image));
            wash.layer = gameObject.layer;
            var rect = (RectTransform)wash.transform;
            rect.SetParent(transform, false);
            rect.SetAsFirstSibling();
            rect.anchorMin = Vector2.zero;
            rect.anchorMax = Vector2.one;
            rect.offsetMin = rect.offsetMax = Vector2.zero;
            var image = wash.GetComponent<Image>();
            image.color = new Color(.55f, 0f, .02f, .3f);
            image.raycastTarget = false;
        }

        public void Show()
        {
            Hide();
            gameObject.SetActive(true);
            Canvas.ForceUpdateCanvases();
            Vector2 screenSize = ((RectTransform)transform).rect.size;
            _group.alpha = 1f;
            _sequence = DOTween.Sequence();
            for (int i = 0; i < _splashes.Length; i++)
            {
                RectTransform splash = _splashes[i];
                Vector2 position = Vector2.Scale(SplashPositions[i % SplashPositions.Length], screenSize);
                float size = i == 0 ? Mathf.Max(screenSize.x, screenSize.y) * 1.2f
                    : Mathf.Min(screenSize.x, screenSize.y) * 1.1f;
                splash.sizeDelta = Vector2.one * size;
                splash.anchoredPosition = position * .35f;
                splash.localScale = Vector3.one * .2f;
                _sequence.Insert(0f, splash.DOScale(1f, .18f).SetEase(Ease.OutBack));
                _sequence.Insert(0f, splash.DOAnchorPos(position, .25f).SetEase(Ease.OutCubic));
            }
            _sequence.Insert(.35f, _group.DOFade(0f, .4f));
            _sequence.OnComplete(() => gameObject.SetActive(false));
        }

        public void Hide()
        {
            _sequence?.Kill();
            _sequence = null;
            gameObject.SetActive(false);
        }

        private void OnDisable()
        {
            _sequence?.Kill();
            _sequence = null;
        }
    }
}
