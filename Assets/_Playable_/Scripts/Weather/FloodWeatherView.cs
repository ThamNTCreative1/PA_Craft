using DG.Tweening;
using UnityEngine;

namespace Playable
{
    public sealed class FloodWeatherView : MonoBehaviour
    {
        [SerializeField] private Transform _water;
        [SerializeField] private AudioSource _audio;
        [SerializeField] private AudioClip _sound;
        [SerializeField] private float _lowY = 12.5f;
        [SerializeField] private float _highY = 14.6f;
        [SerializeField, Min(0.01f)] private float _riseDuration = 2f;

        private bool _risen;
        private Tween _tween;

        public void BeginFlood()
        {
            if (_water == null || _audio == null || _sound == null ||
                _highY <= _lowY || float.IsNaN(_lowY) || float.IsNaN(_highY) ||
                float.IsInfinity(_lowY) || float.IsInfinity(_highY))
            {
                Debug.LogWarning("Flood needs water, audio, sound and finite rising water levels.", this);
                return;
            }
            if (_tween != null) { _tween.Kill(); _tween = null; }
            _water.gameObject.SetActive(true);
            SetHeight(_risen ? _highY : _lowY);
            if (_risen) return;

            _risen = true;
            _tween = _water.DOMoveY(_highY, Mathf.Max(0.01f, _riseDuration))
                .SetEase(Ease.OutQuad).SetUpdate(true);
            _audio.PlayOneShot(_sound);
        }

        public void HideFlood()
        {
            if (_tween != null) { _tween.Kill(); _tween = null; }
            if (_audio != null) _audio.Stop();
            if (_water == null) return;
            SetHeight(_lowY);
            _water.gameObject.SetActive(false);
        }

        private void SetHeight(float height)
        {
            Vector3 position = _water.position;
            position.y = height;
            _water.position = position;
        }

        private void OnDisable() { HideFlood(); }
        private void OnDestroy() { HideFlood(); }
    }
}
