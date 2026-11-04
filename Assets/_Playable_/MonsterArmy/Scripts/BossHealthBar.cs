using DG.Tweening;
using Playable.MonsterArmy.Core;
using TMPro;
using UnityEngine;
using UnityEngine.UI;

namespace Playable.MonsterArmy
{
    /// <summary>
    /// Thanh máu boss. Mỗi lần chạm vùng đỏ thì nháy, rung và hiện chữ lớn đẩy người
    /// chơi quay về thanh chọn quái — thông điệp là "thiếu quân", không phải "game
    /// gian lận" (spec mục 4.2.3).
    /// </summary>
    [DefaultExecutionOrder(150)]
    public sealed class BossHealthBar : MonoBehaviour
    {
        [SerializeField] private Image _fill;
        [SerializeField] private RectTransform _shakeRoot;
        [SerializeField] private TMP_Text _label;
        [SerializeField] private TMP_Text _dangerText;
        [SerializeField] private string _dangerMessage = "Almost! Need more monsters!";
        [SerializeField] private float _smoothing = 8f;

        private BossHealthModel _model;
        private BossUnit _boss;
        private Camera _worldCamera;
        private Canvas _canvas;
        private RectTransform _rect;
        private RectTransform _parent;
        private float _displayed = 1f;
        private Tween _pulse;

        public void Bind(BossHealthModel model, BossUnit boss, Camera worldCamera)
        {
            _model = model;
            _boss = boss;
            _worldCamera = worldCamera;
            _rect = (RectTransform)transform;
            _parent = _rect.parent as RectTransform;
            _canvas = GetComponentInParent<Canvas>();
            _rect.anchorMin = _rect.anchorMax = _rect.pivot = new Vector2(0.5f, 0.5f);
            if (_label != null) _label.gameObject.SetActive(false);
            foreach (Graphic graphic in GetComponentsInChildren<Graphic>(true)) graphic.raycastTarget = false;
            _displayed = model?.Percent ?? 1f;
            if (_fill != null) _fill.fillAmount = _displayed;
            if (_dangerText != null) _dangerText.gameObject.SetActive(false);
        }

        private void Update()
        {
            if (_model == null) return;

            // Nội suy để thanh máu trôi mượt thay vì giật từng nấc theo mỗi đòn đánh.
            _displayed = Mathf.Lerp(_displayed, _model.Percent, Time.deltaTime * _smoothing);
            if (_fill != null) _fill.fillAmount = _displayed;

        }

        private void LateUpdate()
        {
            if (_boss == null || _worldCamera == null || _canvas == null || _parent == null) return;
            Vector3 anchor = _boss.HeadTop + Vector3.up * 0.6f;
            Vector3 screen = _worldCamera.WorldToScreenPoint(anchor);
            Camera uiCamera = _canvas.renderMode == RenderMode.ScreenSpaceOverlay ? null : _canvas.worldCamera;
            Vector2 local;
            if (!RectTransformUtility.ScreenPointToLocalPointInRectangle(_parent, screen, uiCamera, out local)) return;
            _rect.anchoredPosition = local;
            float width = Mathf.Abs(_worldCamera.WorldToScreenPoint(anchor + Vector3.right * 5.6f).x - screen.x);
            float safeWidth = Screen.safeArea.width > 0f ? Screen.safeArea.width : Screen.width;
            float maxWidth = Mathf.Min(300f, safeWidth * 0.82f);
            width = Mathf.Clamp(width, Mathf.Min(140f, maxWidth), maxWidth);
            _rect.sizeDelta = new Vector2(width, width * (45f / 527f)) / Mathf.Max(0.001f, _canvas.scaleFactor);
        }

        public void PlayDangerPulse()
        {
            if (_dangerText != null)
            {
                _dangerText.text = _dangerMessage;
                _dangerText.gameObject.SetActive(true);
                _dangerText.transform.localScale = Vector3.one * 0.7f;
                _dangerText.transform.DOScale(1f, 0.25f).SetEase(Ease.OutBack);
                DOVirtual.DelayedCall(2f, () =>
                {
                    if (_dangerText != null) _dangerText.gameObject.SetActive(false);
                }, false);
            }

            if (_shakeRoot == null) return;

            _pulse?.Kill(true);
            _shakeRoot.localScale = Vector3.one;
            _pulse = _shakeRoot.DOScale(1.10f, 0.15f).SetEase(Ease.InOutSine).SetLoops(4, LoopType.Yoyo);
        }

        private void OnDestroy()
        {
            _pulse?.Kill();
        }
    }
}
