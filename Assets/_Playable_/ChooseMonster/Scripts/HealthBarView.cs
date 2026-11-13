using DG.Tweening;
using TMPro;
using UnityEngine;
using UnityEngine.UI;

namespace Playable.ChooseMonster
{
    /// <summary>
    /// Thanh máu dựng từ sprite pp.png / boss.png: khung (lòng thanh trắng) + lớp fill cùng kích thước
    /// đã bo đúng hình lòng thanh, cắt bằng Image Filled ngang. Giá trị 0..1 được map vào đoạn
    /// [_fillStart, _fillEnd] của fillAmount (bỏ qua phần ô chân dung bên trái).
    /// Lớp trail (vàng) tụt chậm phía sau để thấy rõ lượng máu mất.
    /// </summary>
    [DisallowMultipleComponent]
    public sealed class HealthBarView : MonoBehaviour
    {
        [SerializeField] private Image _fill;
        [SerializeField] private Image _trail;
        [SerializeField] private Image _portrait;
        [SerializeField] private TMP_Text _level;
        [SerializeField] private float _fillStart;
        [SerializeField] private float _fillEnd = 1f;

        private float _value = 1f;
        private Tween _trailTween;

        public void Setup(Sprite portrait, string level)
        {
            if (_portrait != null)
            {
                _portrait.sprite = portrait;
                _portrait.enabled = portrait != null;
            }
            if (_level != null) _level.text = level;
            SetInstant(1f);
        }

        public void SetInstant(float value)
        {
            _value = Mathf.Clamp01(value);
            _trailTween?.Kill();
            Apply(_fill, _value);
            Apply(_trail, _value);
        }

        public void Set(float value)
        {
            float old = _value;
            _value = Mathf.Clamp01(value);
            Apply(_fill, _value);
            _trailTween?.Kill();
            _trailTween = DOVirtual.Float(old, _value, 0.45f, v => Apply(_trail, v)).SetDelay(0.18f).SetEase(Ease.OutQuad);
        }

        private void Apply(Image image, float value)
        {
            if (image == null) return;
            image.fillAmount = value <= 0.001f ? 0f : Mathf.Lerp(_fillStart, _fillEnd, value);
        }

        private void OnDestroy()
        {
            _trailTween?.Kill();
        }
    }
}
