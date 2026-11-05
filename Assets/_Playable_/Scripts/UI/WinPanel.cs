using DG.Tweening;
using UnityEngine;
using UnityEngine.UI;

namespace Playable
{
    public class WinPanel : MonoBehaviour
    {
        [SerializeField] private Button _button;
        [SerializeField] private GameManager _gameManager;
        [SerializeField] private float _buttonPulseScale = 1.12f;
        [SerializeField] private float _buttonPulseDuration = 0.4f;

        private Tween _buttonTween;
        private bool _shown;
        private int _shownFrame;

        public void Show()
        {
            if (_shown) return;
            _shown = true;
            _shownFrame = Time.frameCount;
            gameObject.SetActive(true);
            if (_button != null) _button.interactable = false;
            PlayButtonPulse();
        }

        private void OnEnable()
        {
            if (_button != null) _button.onClick.AddListener(RequestInstall);
        }

        private void Update()
        {
            if (_shown && _button != null && Time.frameCount > _shownFrame)
                _button.interactable = true;
        }

        private void RequestInstall()
        {
            if (_shown && Time.frameCount > _shownFrame && _gameManager != null)
                _gameManager.RequestInstall();
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
            if (_button != null) _button.onClick.RemoveListener(RequestInstall);
            _buttonTween?.Kill();
            _buttonTween = null;
        }
    }
}
