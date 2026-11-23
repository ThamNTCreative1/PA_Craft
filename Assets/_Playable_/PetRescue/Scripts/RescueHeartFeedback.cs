using UnityEngine;
using UnityEngine.UI;
using TMPro;
using DG.Tweening;

namespace Playable.PetRescue
{
    /// Collect feedback: "Collected!" toast, a small heart burst over the pet and one pooled heart flying into its HUD slot.
    public sealed class RescueHeartFeedback : MonoBehaviour
    {
        [SerializeField] private RescueHudView _hud;
        [SerializeField] private Camera _camera;
        [SerializeField] private RectTransform _canvasRect;
        [SerializeField] private TMP_Text _toast;
        [SerializeField] private Image[] _flyers, _burst;
        [SerializeField] private float _popTime = .18f, _flyTime = .5f;
        private const int BurstPerCollect = 3;
        private const float PetLift = 1.1f;
        private bool[] _pending;
        private int _burstCursor;
        private Sequence _toastSequence;

        public void Initialize()
        {
            if (_hud == null || _camera == null || _canvasRect == null || _toast == null || _flyers == null || _burst == null ||
                _flyers.Length < _hud.SlotCount || _burst.Length < BurstPerCollect)
                throw new System.InvalidOperationException("Pet Rescue heart feedback references are incomplete.");
            _pending = new bool[_flyers.Length];
            for (int i = 0; i < _flyers.Length; i++) _flyers[i].gameObject.SetActive(false);
            for (int i = 0; i < _burst.Length; i++) _burst[i].gameObject.SetActive(false);
            _toast.gameObject.SetActive(false);
        }

        public void Play(int slot, Vector3 petWorld)
        {
            if (slot < 0 || slot >= _flyers.Length || _pending[slot]) return;
            _pending[slot] = true;
            // EditMode previews (scene tests) skip the runtime-only tweens and fill the slot at once.
            if (!Application.isPlaying) { Land(slot); return; }
            Vector2 start = ToCanvas(petWorld + Vector3.up * PetLift);
            ShowToast();
            PlayBurst(start);
            var flyer = _flyers[slot].rectTransform;
            flyer.DOKill();
            flyer.gameObject.SetActive(true);
            flyer.anchoredPosition = start; flyer.localScale = Vector3.zero;
            Vector2 end = ToCanvasFromRect(_hud.SlotRect(slot));
            int index = slot;
            DOTween.Sequence().SetTarget(flyer).SetUpdate(true)
                .Append(flyer.DOScale(1.5f, _popTime).SetEase(Ease.OutBack))
                .Append(flyer.DOAnchorPos(end, _flyTime).SetEase(Ease.InCubic))
                .Join(flyer.DOScale(1, _flyTime))
                .OnComplete(() => Land(index));
        }

        /// Snaps every in-flight heart into its slot (used when gameplay ends on the final heart).
        public void Complete()
        {
            if (_pending == null) return;
            for (int i = 0; i < _flyers.Length; i++)
            {
                if (!_pending[i]) continue;
                _flyers[i].rectTransform.DOKill();
                Land(i);
            }
            for (int i = 0; i < _burst.Length; i++) { _burst[i].rectTransform.DOKill(); _burst[i].gameObject.SetActive(false); }
        }

        private void Land(int slot)
        {
            _pending[slot] = false;
            _flyers[slot].gameObject.SetActive(false);
            _hud.FillSlot(slot);
        }

        private void PlayBurst(Vector2 origin)
        {
            for (int i = 0; i < BurstPerCollect; i++)
            {
                var image = _burst[_burstCursor];
                var heart = image.rectTransform;
                _burstCursor = (_burstCursor + 1) % _burst.Length;
                heart.DOKill();
                heart.gameObject.SetActive(true);
                heart.anchoredPosition = origin; heart.localScale = Vector3.one * .4f;
                Vector2 drift = new Vector2((i - 1) * 70, 120 + (i % 2) * 40);
                image.color = Color.white;
                DOTween.Sequence().SetTarget(heart).SetUpdate(true)
                    .Append(heart.DOAnchorPos(origin + drift, .6f).SetEase(Ease.OutQuad))
                    .Join(heart.DOScale(1.1f, .25f).SetEase(Ease.OutBack))
                    .Insert(.35f, image.DOFade(0, .25f))
                    .OnComplete(() => heart.gameObject.SetActive(false));
            }
        }

        private void ShowToast()
        {
            if (_toastSequence != null) _toastSequence.Kill();
            _toast.gameObject.SetActive(true);
            _toast.alpha = 1;
            var rect = _toast.rectTransform; rect.localScale = Vector3.one * .6f;
            _toastSequence = DOTween.Sequence().SetUpdate(true)
                .Append(rect.DOScale(1, .2f).SetEase(Ease.OutBack))
                .AppendInterval(.6f)
                .Append(_toast.DOFade(0, .25f))
                .OnComplete(() => _toast.gameObject.SetActive(false));
        }

        private Vector2 ToCanvas(Vector3 world)
        {
            Vector2 local;
            RectTransformUtility.ScreenPointToLocalPointInRectangle(_canvasRect, _camera.WorldToScreenPoint(world), null, out local);
            return local;
        }

        private Vector2 ToCanvasFromRect(RectTransform target)
        {
            Vector2 local;
            RectTransformUtility.ScreenPointToLocalPointInRectangle(_canvasRect, RectTransformUtility.WorldToScreenPoint(null, target.position), null, out local);
            return local;
        }

        private void OnDisable()
        {
            if (_toastSequence != null) { _toastSequence.Kill(); _toastSequence = null; }
            if (_flyers != null) for (int i = 0; i < _flyers.Length; i++) if (_flyers[i] != null) _flyers[i].rectTransform.DOKill();
            if (_burst != null) for (int i = 0; i < _burst.Length; i++) if (_burst[i] != null) _burst[i].rectTransform.DOKill();
        }
    }
}
