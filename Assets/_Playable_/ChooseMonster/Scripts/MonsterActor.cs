using DG.Tweening;
using UnityEngine;

namespace Playable.ChooseMonster
{
    /// <summary>
    /// Con quái được chọn: model tách khớp (Hips/Head/Arm/Leg) chạy clip Idle/Walk qua Animator
    /// (bool "Walking"). Flash() nháy trắng toàn thân (dùng lúc player nhập xác) — không đổi scale.
    /// </summary>
    [DisallowMultipleComponent]
    public sealed class MonsterActor : MonoBehaviour
    {
        private static readonly int WalkingHash = Animator.StringToHash("Walking");

        [SerializeField] private Animator _animator;
        [SerializeField] private Renderer[] _renderers;
        [SerializeField] private Material _flashMaterial;
        [SerializeField] private float _height = 3f;
        [SerializeField] private float _reach = 0.5f;

        private Material[] _baseMaterials;
        private Tween _flash;

        public float Height => _height;
        public float Reach => _reach;

        public void SetWalking(bool walking)
        {
            if (_animator != null && _animator.isActiveAndEnabled) _animator.SetBool(WalkingHash, walking);
        }

        public void FaceTowards(Vector3 worldPoint, float duration)
        {
            Vector3 dir = worldPoint - transform.position;
            dir.y = 0f;
            if (dir.sqrMagnitude < 0.0001f) return;
            Quaternion rotation = Quaternion.LookRotation(dir);
            if (duration <= 0f) transform.rotation = rotation;
            else transform.DORotateQuaternion(rotation, duration).SetEase(Ease.InOutSine);
        }

        /// <summary>Nháy trắng vài nhịp rồi trả material gốc.</summary>
        public void Flash()
        {
            if (_flashMaterial == null || _renderers == null) return;
            if (_baseMaterials == null)
            {
                _baseMaterials = new Material[_renderers.Length];
                for (int i = 0; i < _renderers.Length; i++) _baseMaterials[i] = _renderers[i].sharedMaterial;
            }
            _flash?.Kill();
            int step = 0;
            SetFlash(true);
            _flash = DOVirtual.DelayedCall(0.07f, () =>
            {
                step++;
                SetFlash(step % 2 == 0 && step < 4);
            }, false).SetLoops(5).OnKill(() => SetFlash(false));
        }

        private void SetFlash(bool on)
        {
            if (_baseMaterials == null) return;
            for (int i = 0; i < _renderers.Length; i++)
                _renderers[i].sharedMaterial = on ? _flashMaterial : _baseMaterials[i];
        }

        private void OnDestroy()
        {
            _flash?.Kill();
            transform.DOKill();
        }
    }
}
