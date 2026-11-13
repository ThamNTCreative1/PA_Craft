using System;
using DG.Tweening;
using UnityEngine;

namespace Playable.ChooseMonster
{
    /// <summary>
    /// Hoạt ảnh thủ tục cho một con quái (model gộp 1 mesh, không có rig):
    /// thở/nhún khi đứng, nảy khi chạy, lao tới cắn khi tấn công, nháy trắng khi trúng đòn, ngã khi chết.
    /// Root (transform này) quay mặt về mục tiêu; mọi tween chỉ đụng tới _body để không lệch vị trí logic.
    /// </summary>
    [DisallowMultipleComponent]
    public sealed class FighterView : MonoBehaviour
    {
        [SerializeField] private Transform _body;
        [SerializeField] private Renderer[] _renderers;
        [SerializeField] private Material _flashMaterial;
        [SerializeField] private float _height = 2f;
        [SerializeField] private float _reach = 0.5f;
        [SerializeField] private float _idleSpeed = 2.4f;
        [SerializeField] private float _breath = 0.035f;
        [SerializeField] private float _runSpeed = 13f;
        [SerializeField] private float _runBounce = 0.12f;
        [SerializeField] private bool _proceduralIdle = true;

        private Material[][] _baseMaterials;
        private Vector3 _restPosition;
        private Vector3 _restScale;
        private Quaternion _restRotation;
        private Sequence _action;
        private Tween _flash;
        private bool _running;
        private bool _dead;
        private bool _busy;
        private float _phase;

        public float Height => _height;
        public float Reach => _reach;
        public bool IsBusy => _busy || _dead;
        public bool IsDead => _dead;

        private void Awake()
        {
            CacheRest();
            _phase = UnityEngine.Random.value * 10f;
        }

        private void CacheRest()
        {
            if (_baseMaterials != null || _body == null) return;
            _restPosition = _body.localPosition;
            _restScale = _body.localScale;
            _restRotation = _body.localRotation;
            _baseMaterials = new Material[_renderers.Length][];
            for (int i = 0; i < _renderers.Length; i++) _baseMaterials[i] = _renderers[i].sharedMaterials;
        }

        private void Update()
        {
            if (_body == null || _dead || _busy) return;
            // Model có clip Idle riêng (Animator) thì không chồng thêm nhịp thở thủ tục.
            if (!_proceduralIdle && !_running) return;
            if (_running)
            {
                _phase += Time.deltaTime * _runSpeed;
                float hop = Mathf.Abs(Mathf.Sin(_phase));
                _body.localPosition = _restPosition + Vector3.up * (hop * _runBounce * _height);
                _body.localRotation = _restRotation * Quaternion.Euler(8f, 0f, Mathf.Sin(_phase) * 7f);
                _body.localScale = _restScale;
            }
            else
            {
                _phase += Time.deltaTime * _idleSpeed;
                float s = Mathf.Sin(_phase);
                _body.localPosition = _restPosition;
                _body.localRotation = _restRotation * Quaternion.Euler(0f, 0f, Mathf.Sin(_phase * 0.5f) * 2f);
                _body.localScale = new Vector3(
                    _restScale.x * (1f - s * _breath * 0.5f),
                    _restScale.y * (1f + s * _breath),
                    _restScale.z * (1f - s * _breath * 0.5f));
            }
        }

        public void SetRunning(bool running)
        {
            _running = running;
        }

        public void FaceTowards(Vector3 worldPoint)
        {
            Vector3 dir = worldPoint - transform.position;
            dir.y = 0f;
            if (dir.sqrMagnitude > 0.0001f) transform.rotation = Quaternion.LookRotation(dir);
        }

        /// <summary>Lao tới mục tiêu, gọi onImpact lúc chạm, rồi lùi về.</summary>
        public void Attack(Vector3 targetPosition, float targetReach, Action onImpact)
        {
            if (IsBusy) return;
            CacheRest();
            FaceTowards(targetPosition);
            float distance = Vector3.Distance(Flat(transform.position), Flat(targetPosition));
            float lunge = Mathf.Max(0.2f, distance - targetReach - _reach * 0.6f);
            Vector3 local = _restPosition + Vector3.forward * (lunge / Mathf.Max(0.0001f, transform.lossyScale.z));

            BeginAction();
            _action.Append(_body.DOLocalRotateQuaternion(_restRotation * Quaternion.Euler(-14f, 0f, 0f), 0.12f).SetEase(Ease.OutQuad));
            _action.Join(_body.DOScale(new Vector3(_restScale.x * 1.08f, _restScale.y * 0.9f, _restScale.z * 1.08f), 0.12f));
            _action.Append(_body.DOLocalMove(local, 0.11f).SetEase(Ease.InQuad));
            _action.Join(_body.DOLocalRotateQuaternion(_restRotation * Quaternion.Euler(12f, 0f, 0f), 0.11f));
            _action.Join(_body.DOScale(new Vector3(_restScale.x * 0.94f, _restScale.y * 1.1f, _restScale.z * 0.94f), 0.11f));
            _action.AppendCallback(() => { if (onImpact != null) onImpact(); });
            _action.Append(_body.DOLocalMove(_restPosition, 0.26f).SetEase(Ease.OutQuad));
            _action.Join(_body.DOLocalRotateQuaternion(_restRotation, 0.26f));
            _action.Join(_body.DOScale(_restScale, 0.26f));
            _action.OnComplete(EndAction);
        }

        /// <summary>Trúng đòn: nháy trắng + giật lùi (chỉ giật khi không đang ra đòn).</summary>
        public void Hit()
        {
            if (_dead) return;
            CacheRest();
            Flash();
            if (_busy) return;
            BeginAction();
            _action.Append(_body.DOLocalRotateQuaternion(_restRotation * Quaternion.Euler(-10f, 0f, 6f), 0.07f));
            _action.Join(_body.DOScale(new Vector3(_restScale.x * 1.1f, _restScale.y * 0.88f, _restScale.z * 1.1f), 0.07f));
            _action.Append(_body.DOLocalRotateQuaternion(_restRotation, 0.18f).SetEase(Ease.OutBack));
            _action.Join(_body.DOScale(_restScale, 0.18f).SetEase(Ease.OutBack));
            _action.OnComplete(EndAction);
        }

        public void Roar()
        {
            if (_dead) return;
            CacheRest();
            BeginAction();
            _action.Append(_body.DOLocalMove(_restPosition + Vector3.up * (_height * 0.18f / Mathf.Max(0.0001f, transform.lossyScale.y)), 0.18f).SetEase(Ease.OutQuad));
            _action.Join(_body.DOScale(_restScale * 1.15f, 0.18f));
            _action.Append(_body.DOLocalMove(_restPosition, 0.16f).SetEase(Ease.InQuad));
            _action.Append(_body.DOScale(_restScale, 0.25f).SetEase(Ease.OutElastic));
            _action.OnComplete(EndAction);
        }

        public void Die()
        {
            if (_dead) return;
            CacheRest();
            Flash();
            _dead = true;
            _running = false;
            _action?.Kill();
            _busy = true;
            _action = DOTween.Sequence();
            _action.Append(_body.DOLocalRotateQuaternion(_restRotation * Quaternion.Euler(-80f, 0f, 0f), 0.5f).SetEase(Ease.InQuad));
            _action.Join(_body.DOLocalMove(_restPosition + Vector3.back * 0.3f, 0.5f));
            _action.Append(_body.DOScale(new Vector3(_restScale.x * 1.15f, _restScale.y * 0.7f, _restScale.z * 1.15f), 0.12f));
            _action.Append(_body.DOScale(_restScale, 0.2f));
        }

        public void ResetPose()
        {
            CacheRest();
            _action?.Kill();
            _flash?.Kill();
            RestoreMaterials();
            _dead = false;
            _busy = false;
            _running = false;
            _body.localPosition = _restPosition;
            _body.localRotation = _restRotation;
            _body.localScale = _restScale;
        }

        private void BeginAction()
        {
            _action?.Kill();
            _body.localPosition = _restPosition;
            _body.localRotation = _restRotation;
            _body.localScale = _restScale;
            _busy = true;
            _action = DOTween.Sequence();
        }

        private void EndAction()
        {
            _busy = false;
            _action = null;
        }

        private void Flash()
        {
            if (_flashMaterial == null) return;
            _flash?.Kill();
            for (int i = 0; i < _renderers.Length; i++)
            {
                Material[] mats = new Material[_baseMaterials[i].Length];
                for (int m = 0; m < mats.Length; m++) mats[m] = _flashMaterial;
                _renderers[i].sharedMaterials = mats;
            }
            _flash = DOVirtual.DelayedCall(0.08f, RestoreMaterials, false);
        }

        private void RestoreMaterials()
        {
            if (_baseMaterials == null) return;
            for (int i = 0; i < _renderers.Length; i++) _renderers[i].sharedMaterials = _baseMaterials[i];
        }

        private static Vector3 Flat(Vector3 v)
        {
            v.y = 0f;
            return v;
        }

        private void OnDestroy()
        {
            _action?.Kill();
            _flash?.Kill();
        }
    }
}
