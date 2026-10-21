using DG.Tweening;
using UnityEngine;

namespace Playable
{
    public sealed class HuntWeapon : MonoBehaviour
    {
        [SerializeField] private Transform _recoilPivot;
        [SerializeField] private Camera _viewCamera;
        [SerializeField] private AudioSource _shotSource;
        [SerializeField] private AudioClip _shotSound;
        [SerializeField] private Vector3 _landscapePosition = new Vector3(0.2f, -0.24f, 0.42f);
        [SerializeField] private Vector3 _portraitPosition = new Vector3(0.1f, -0.27f, 0.55f);
        private Sequence _recoil;
        private bool _portrait;
        private void Start() { ApplyAspect(); }
        private void Update() { if (_portrait != (Screen.height > Screen.width)) ApplyAspect(); }
        private void ApplyAspect()
        {
            _portrait = Screen.height > Screen.width;
            transform.localPosition = _portrait ? _portraitPosition : _landscapePosition;
            if (_viewCamera) _viewCamera.fieldOfView = _portrait ? 85f : 70f;
        }
        public void Fire()
        {
            if (_shotSource != null && _shotSound != null) _shotSource.PlayOneShot(_shotSound);
            _recoil?.Kill();
            _recoilPivot.localPosition = Vector3.zero;
            _recoilPivot.localRotation = Quaternion.identity;
            _recoil = DOTween.Sequence()
                .Append(_recoilPivot.DOLocalMove(new Vector3(0, 0.018f, -0.055f), 0.055f))
                .Join(_recoilPivot.DOLocalRotate(new Vector3(-5, 0, 0), 0.055f))
                .Append(_recoilPivot.DOLocalMove(Vector3.zero, 0.12f))
                .Join(_recoilPivot.DOLocalRotate(Vector3.zero, 0.12f));
        }
        private void OnDestroy() { _recoil?.Kill(); }
    }
}
